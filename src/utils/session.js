const STORAGE_KEY = 'easyjob_auth'

const base64UrlEncode = input => {
  const json = typeof input === 'string' ? input : JSON.stringify(input)
  const bytes = new TextEncoder().encode(json)
  let binary = ''
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

const base64UrlDecode = segment => {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function createMockJwt(payload = {}) {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'HS256', typ: 'JWT' }
  const body = {
    iat: now,
    exp: now + 60 * 60 * 24 * 30,
    ...payload,
  }

  return `${base64UrlEncode(header)}.${base64UrlEncode(body)}.easyjob`
}

export function decodeJwtPayload(token) {
  try {
    if (!token) return null
    const [, payload] = String(token).split('.')
    if (!payload) return null
    return JSON.parse(base64UrlDecode(payload))
  } catch {
    return null
  }
}

export function isJwtExpired(token) {
  const payload = decodeJwtPayload(token)
  if (!payload?.exp) return false
  return payload.exp <= Math.floor(Date.now() / 1000)
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const session = JSON.parse(raw)
    if (!session?.token || !session?.user) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }

    if (isJwtExpired(session.token)) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }

    return session
  } catch {
    return null
  }
}

export function saveSession(session) {
  try {
    if (!session?.token || !session?.user) {
      clearSession()
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {}
}

export function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}
