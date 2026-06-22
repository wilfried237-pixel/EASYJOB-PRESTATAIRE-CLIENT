import { Children, createContext, isValidElement, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext(null)
const ParamsContext = createContext({})

const trimSlashes = value => String(value || '').replace(/^\/+|\/+$/g, '')

const splitPath = value => trimSlashes(value).split('/').filter(Boolean)

const matchPath = (pattern, pathname) => {
  if (pattern === '*') return { params: {} }

  const patternParts = splitPath(pattern)
  const pathParts = splitPath(pathname)

  let params = {}
  let i = 0
  let j = 0

  while (i < patternParts.length) {
    const part = patternParts[i]

    if (part === '*') {
      return { params }
    }

    if (part.startsWith(':')) {
      if (j >= pathParts.length) return null
      params[part.slice(1)] = decodeURIComponent(pathParts[j])
      i += 1
      j += 1
      continue
    }

    if (pathParts[j] !== part) return null

    i += 1
    j += 1
  }

  if (j !== pathParts.length) return null

  return { params }
}

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }))

  useEffect(() => {
    const sync = () => {
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      })
    }

    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const navigate = useMemo(() => {
    return (to, opts = {}) => {
      if (typeof to === 'number') {
        window.history.go(to)
        return
      }

      const target = new URL(String(to || '/'), window.location.origin)
      const nextUrl = `${target.pathname}${target.search}${target.hash}`

      if (opts.replace) window.history.replaceState({}, '', nextUrl)
      else window.history.pushState({}, '', nextUrl)

      setLocation({
        pathname: target.pathname,
        search: target.search,
        hash: target.hash,
      })

      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    }
  }, [])

  const value = useMemo(() => ({ location, navigate }), [location, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useLocation() {
  const ctx = useContext(RouterContext)
  return ctx?.location || { pathname: '/', search: '', hash: '' }
}

export function useNavigate() {
  const ctx = useContext(RouterContext)
  return ctx?.navigate || (() => {})
}

export function useParams() {
  return useContext(ParamsContext)
}

export function Link({ to, replace = false, onClick, children, ...props }) {
  const navigate = useNavigate()

  return (
    <a
      href={typeof to === 'string' ? to : '#'}
      onClick={event => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
        event.preventDefault()
        navigate(to, { replace })
      }}
      {...props}
    >
      {children}
    </a>
  )
}

export function NavLink({ to, end = false, children, className, style, ...props }) {
  const { pathname } = useLocation()
  const active = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`)

  return (
    <Link
      to={to}
      className={typeof className === 'function' ? className({ isActive: active }) : className}
      style={typeof style === 'function' ? style({ isActive: active }) : style}
      {...props}
    >
      {typeof children === 'function' ? children({ isActive: active }) : children}
    </Link>
  )
}

export function Route() {
  return null
}

export function Routes({ children }) {
  const { pathname } = useLocation()
  let match = null

  Children.forEach(children, child => {
    if (match || !isValidElement(child) || child.type !== Route) return

    const { path = '*', element = null } = child.props
    const result = matchPath(path, pathname)
    if (result) match = { element, params: result.params }
  })

  if (!match) return null

  return <ParamsContext.Provider value={match.params}>{match.element}</ParamsContext.Provider>
}

export function Navigate({ to, replace = true }) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(to, { replace })
  }, [navigate, replace, to])

  return null
}
