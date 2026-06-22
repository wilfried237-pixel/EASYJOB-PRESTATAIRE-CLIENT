import { useCallback, useEffect, useMemo, useState } from 'react'
import { C } from './utils/tokens'
import { toast, Toaster, useIsMobile, mkLog } from './utils/utils.jsx'
import { INIT_DATA, FLS, MISSIONS } from './data/mockData'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from './router'
import { clearSession, createMockJwt, loadSession, saveSession } from './utils/session'
import { slugify } from './utils/links'
import Landing from './pages/Landing'
import { Login, ChooseRole, RegisterClient, RegisterFreelancer } from './pages/auth'
import { Sidebar, BottomNav } from './components/layout'
import HomeScreen from './pages/app/HomeScreen'
import ExploreScreen from './pages/app/ExploreScreen'
import PostJobScreen from './pages/app/PostJobScreen'
import { ProfilScreen } from './pages/app/ProfilScreen'
import { FreelancerDetail, MissionDetail, MesMissionsScreen, EditProfilScreen } from './pages/app/DetailScreens'
import LitigesScreen from './pages/app/LitigesScreen'
import ReviewsScreen from './pages/app/ReviewsScreen'
import SearchScreen from './pages/app/SearchScreen'

const APP_PAGES = new Set(['home', 'explore', 'missions', 'postjob', 'profil'])

const INITIAL_STATE = {
  freelancers: FLS,
  missions: MISSIONS,
  convs: INIT_DATA.convs,
  notifs: INIT_DATA.notifs,
  myJobs: INIT_DATA.myJobs,
  proposals: [],
  txns: INIT_DATA.txns || [],
}

const loadState = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

const profileSlug = fl => `${slugify(fl.nom)}-${fl.id}`

const findFreelancerBySlug = (slug, freelancers) => {
  if (!slug) return null
  const byId = slug.match(/-(\d+)$/)
  if (byId) {
    const found = freelancers.find(f => String(f.id) === byId[1])
    if (found) return found
  }

  const normalized = slugify(slug.replace(/-\d+$/, ''))
  return freelancers.find(f => slugify(f.nom) === normalized) || null
}

const getAppPage = pathname => {
  const next = pathname.split('/')[2] || 'home'
  return APP_PAGES.has(next) ? next : 'home'
}

const makeSession = user => {
  const token =
    user?.token ||
    createMockJwt({
      sub: user?.email || user?.nom || 'user',
      role: user?.role || 'client',
    })

  return { token, user }
}

function AppRouter() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const isMobile = useIsMobile()

  const [session, setSession] = useState(() => loadSession())
  const [data, setData] = useState(() => {
    const stored = loadState('vt_data', INITIAL_STATE)
    if (!stored?.freelancers || !stored?.missions || !stored?.convs) return INITIAL_STATE
    return stored
  })
  const [logs, setLogs] = useState(() => loadState('vt_logs', []))
  const [lang, setLang] = useState(() => loadState('vt_lang', 'fr'))
  const [sub, setSubState] = useState(null)
  const [selFL, setSelFLState] = useState(null)
  const [selM, setSelMState] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('vt_data', JSON.stringify(data))
    } catch {}
  }, [data])

  useEffect(() => {
    try {
      localStorage.setItem('vt_logs', JSON.stringify(logs.slice(0, 200)))
    } catch {}
  }, [logs])

  useEffect(() => {
    try {
      localStorage.setItem('vt_lang', lang)
    } catch {}
  }, [lang])

  useEffect(() => {
    if (session) saveSession(session)
  }, [session])

  const addLog = useCallback((type, fr, en, uid = null, meta = {}) => {
    setLogs(current => [mkLog(type, fr, en, uid, meta), ...current].slice(0, 200))
  }, [])

  const handleAuthSuccess = useCallback(
    userData => {
      const nextSession = makeSession(userData)
      setSession(nextSession)
      addLog(
        'auth',
        `Connexion - ${userData.nom} (${userData.role})`,
        `Login - ${userData.nom} (${userData.role})`,
        userData.nom,
      )
      toast.success(lang === 'fr' ? `Bienvenue ${userData.nom}` : `Welcome ${userData.nom}`)
      navigate('/app/home', { replace: true })
    },
    [addLog, lang, navigate],
  )

  const handleLogout = useCallback(() => {
    addLog('auth', `Déconnexion - ${session?.user?.nom}`, `Logout - ${session?.user?.nom}`, session?.user?.nom)
    clearSession()
    setSession(null)
    setSubState(null)
    setSelFLState(null)
    setSelMState(null)
    toast.success(lang === 'fr' ? 'Déconnecté' : 'Logged out')
    navigate('/', { replace: true })
  }, [addLog, lang, navigate, session?.user?.nom])

  const updateUser = useCallback(updater => {
    setSession(current => {
      const nextUser = typeof updater === 'function' ? updater(current?.user || null) : updater
      if (!nextUser) return current
      const nextSession = makeSession({
        ...current?.user,
        ...nextUser,
      })
      saveSession(nextSession)
      return nextSession
    })
  }, [])

  const handleSetPage = useCallback(
    page => {
      addLog('navigation', `Navigation -> ${page}`, `Navigate -> ${page}`, session?.user?.nom)
      setSubState(null)
      navigate(`/app/${page || 'home'}`)
    },
    [addLog, navigate, session?.user?.nom],
  )

  const handleSetSub = useCallback(subPage => {
    if (subPage === 'freelancer') return
    setSubState(subPage)
  }, [])

  const handleSelectFreelancer = useCallback(
    freelancer => {
      if (!freelancer) return
      setSelFLState(freelancer)
      setSubState(null)
      navigate(`/artisans/${profileSlug(freelancer)}`)
    },
    [navigate],
  )

  const handleSelectMission = useCallback(mission => {
    setSelMState(mission)
    setSubState('mission')
  }, [])

  const unreadMsg = data.convs.reduce((sum, conv) => sum + (conv.unread || 0), 0)
  const unreadNotif = data.notifs.filter(n => !n.read).length

  const linkedFreelancer = useMemo(() => {
    if (session?.user?.role !== 'freelancer') return null
    return (
      data.freelancers.find(f => f.av === session.user.initials) ||
      data.freelancers.find(f => slugify(f.nom) === slugify(session.user.nom)) ||
      null
    )
  }, [data.freelancers, session?.user?.initials, session?.user?.nom, session?.user?.role])

  const displayUser = useMemo(() => {
    if (!session?.user) return null
    if (!linkedFreelancer) return session.user
    return {
      ...linkedFreelancer,
      ...session.user,
      av: session.user.initials || linkedFreelancer.av,
      initials: session.user.initials || linkedFreelancer.av,
      whatsapp: session.user.whatsapp || linkedFreelancer.whatsapp,
      country: session.user.country || linkedFreelancer.country,
      city: session.user.city || linkedFreelancer.city,
      district: session.user.district || linkedFreelancer.district,
    }
  }, [linkedFreelancer, session?.user])

  const appPage = getAppPage(location.pathname)

  const subProps = {
    user: displayUser,
    data,
    setData,
    lang,
    addLog,
  }

  const pageProps = {
    user: displayUser,
    data,
    setData,
    lang,
    addLog,
    setSub: handleSetSub,
    setSelFL: handleSelectFreelancer,
    setSelM: handleSelectMission,
    setPage: handleSetPage,
  }

  const renderOverlay = () => {
    if (!sub) return null

    const wrap = {
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: C.sable,
      overflowY: 'auto',
      ...(!isMobile ? { left: 240 } : {}),
    }

    if (sub === 'litiges') return <div style={wrap}><LitigesScreen onBack={() => handleSetSub(null)} {...subProps} /></div>
    if (sub === 'mes-missions') return <div style={wrap}><MesMissionsScreen onBack={() => handleSetSub(null)} setData={setData} {...subProps} /></div>
    if (sub === 'mission' && selM) return <div style={wrap}><MissionDetail m={selM} onBack={() => handleSetSub(null)} {...subProps} /></div>
    if (sub === 'edit-profil') return <div style={wrap}><EditProfilScreen onBack={() => handleSetSub(null)} setUser={updateUser} {...subProps} /></div>
    if (sub === 'reviews') return <div style={wrap}><ReviewsScreen user={displayUser} lang={lang} onBack={() => handleSetSub(null)} /></div>
    if (sub === 'search') return <div style={wrap}><SearchScreen data={data} lang={lang} onBack={() => handleSetSub(null)} onSelectFL={handleSelectFreelancer} onSelectM={handleSelectMission} /></div>

    return null
  }

  const renderPage = () => {
    switch (appPage) {
      case 'home':
        return <HomeScreen {...pageProps} />
      case 'explore':
        return <ExploreScreen {...pageProps} />
      case 'missions':
        return <MesMissionsScreen user={displayUser} data={data} setData={setData} lang={lang} addLog={addLog} />
      case 'postjob':
        return <PostJobScreen {...pageProps} />
      case 'profil':
        return <ProfilScreen {...pageProps} setUser={updateUser} onLogout={handleLogout} />
      default:
        return <HomeScreen {...pageProps} />
    }
  }

  if (!session?.user) {
    return (
      <>
        <Toaster />
        <Routes>
          <Route path="/" element={<Landing onLogin={() => navigate('/login')} onRegister={() => navigate('/register')} lang={lang} setLang={setLang} />} />
          <Route path="/login" element={<Login onLogin={handleAuthSuccess} onRegister={() => navigate('/register')} onBack={() => navigate('/')} lang={lang} setLang={setLang} />} />
          <Route path="/register" element={<ChooseRole onChoose={role => navigate(`/register/${role}`)} onLogin={() => navigate('/login')} onBack={() => navigate('/')} lang={lang} setLang={setLang} />} />
          <Route path="/register/client" element={<RegisterClient onLogin={handleAuthSuccess} onBack={() => navigate('/register')} lang={lang} setLang={setLang} />} />
          <Route path="/register/freelancer" element={<RegisterFreelancer onLogin={handleAuthSuccess} onBack={() => navigate('/register')} lang={lang} setLang={setLang} />} />
          <Route path="/artisans/:slug" element={<PublicProfile onBack={() => navigate(-1)} data={data} lang={lang} user={displayUser} onSelectFreelancer={handleSelectFreelancer} />} />
          <Route path="/app/*" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    )
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/app/home" replace />} />
        <Route path="/login" element={<Navigate to="/app/home" replace />} />
        <Route path="/register" element={<Navigate to="/app/home" replace />} />
        <Route path="/register/client" element={<Navigate to="/app/home" replace />} />
        <Route path="/register/freelancer" element={<Navigate to="/app/home" replace />} />
        <Route path="/artisans/:slug" element={<PublicProfile onBack={() => navigate(-1)} data={data} lang={lang} user={displayUser || { role: 'client', nom: 'Visiteur', initials: 'VI' }} onSelectFreelancer={handleSelectFreelancer} />} />
        <Route path="/app" element={<Navigate to="/app/home" replace />} />
        <Route path="/app/:page" element={<AppShell page={appPage} renderPage={renderPage} renderOverlay={renderOverlay} pageProps={pageProps} unreadMsg={unreadMsg} unreadNotif={unreadNotif} user={displayUser} lang={lang} isMobile={isMobile} setPage={handleSetPage} setSub={handleSetSub} setLang={setLang} />} />
        <Route path="*" element={<Navigate to="/app/home" replace />} />
      </Routes>
    </>
  )
}

function PublicProfile({ onBack, data, lang, user, onSelectFreelancer }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const target = findFreelancerBySlug(slug, data.freelancers)

  if (!target) return <Navigate to="/" replace />

  return (
    <FreelancerDetail
      fl={target}
      onBack={onBack || (() => navigate(-1))}
      lang={lang}
      user={user || { role: 'client', nom: 'Visiteur', initials: 'VI' }}
      data={data}
      setData={() => {}}
      setSub={() => {}}
      setSelConv={() => {}}
      setSelFL={onSelectFreelancer}
    />
  )
}

function AppShell({
  renderPage,
  renderOverlay,
  pageProps,
  unreadMsg,
  unreadNotif,
  user,
  lang,
  isMobile,
  setPage,
  setSub,
}) {
  const currentPage = getAppPage(window.location.pathname)

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: C.sable }}>
      {!isMobile && (
        <Sidebar page={currentPage} setPage={setPage} user={user} lang={lang} unreadMsg={unreadMsg} unreadNotif={unreadNotif} setSub={setSub} />
      )}
      <div style={{ flex: 1, minWidth: 0, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </div>
      {isMobile && <BottomNav page={currentPage} setPage={setPage} user={user} lang={lang} unreadMsg={unreadMsg} />}
      {renderOverlay()}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
