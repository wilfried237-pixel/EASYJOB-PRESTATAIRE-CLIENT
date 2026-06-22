// ══════════════════════════════════════════════════
// EasyJob — API Mock (localStorage)
// Toutes les fonctions retournent des Promises pour
// être compatibles avec le vrai backend quand il sera prêt.
// Le dev backend n'a qu'à remplacer ce fichier.
// ══════════════════════════════════════════════════

const delay = (ms=150) => new Promise(r=>setTimeout(r,ms))
const ls = {
  get: k => { try{ const v=localStorage.getItem(k); return v?JSON.parse(v):null }catch{return null} },
  set: (k,v) => { try{ localStorage.setItem(k,JSON.stringify(v)) }catch{} },
}

export const setToken   = t => localStorage.setItem('ej_token', t)
export const getToken   = () => localStorage.getItem('ej_token')
export const clearToken = () => localStorage.removeItem('ej_token')

export const authAPI = {
  register : async (data) => { await delay(); return { user: data, token: 'mock_token' } },
  login    : async (data) => { await delay(); return { user: data, token: 'mock_token' } },
  me       : async ()     => { await delay(); return ls.get('ej_user') },
  logout   : async ()     => { await delay(); clearToken(); return null },
}

export const usersAPI = {
  list          : async () => { await delay(); return [] },
  getById       : async () => { await delay(); return null },
  updateProfile : async (data) => { await delay(); return data },
}

export const missionsAPI = {
  liste    : async () => { await delay(); return ls.get('ej_data')?.missions || [] },
  detail   : async (id) => { await delay(); return (ls.get('ej_data')?.missions||[]).find(m=>m.id===id) },
  creer    : async (data) => { await delay(); return { ...data, id: Date.now() } },
  postuler : async (id, data) => { await delay(); return { missionId: id, ...data } },
}

export const messagesAPI = {
  conversations : async ()         => { await delay(); return ls.get('ej_data')?.convs || [] },
  messages      : async (convId)   => { await delay(); return [] },
  envoyer       : async (convId,m) => { await delay(); return { id: Date.now(), content: m } },
}
