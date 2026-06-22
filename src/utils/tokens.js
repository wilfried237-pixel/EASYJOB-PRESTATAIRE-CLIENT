// ══════════════════════════════════════════════════
// DESIGN TOKENS
// ══════════════════════════════════════════════════
const C = {
  // Brand
  brand:     '#1DBF73',
  brandDk:   '#17A863',
  brandLt:   '#E8FBF2',
  brandMid:  '#C8F5E0',
  orange:    '#FF6B35',
  orangeDk:  '#E5551F',
  orangeLt:  '#FFF3EE',
  gold:      '#F5A623',
  goldLt:    '#FFF8EC',
  // Dark
  dark:      '#0A0B14',
  darkMid:   '#13152A',
  darkLt:    '#1E2240',
  darkSoft:  '#2A2E50',
  // Neutral
  bg:        '#F5F5F0',
  bgDk:      '#EEEEE8',
  white:     '#FFFFFF',
  border:    '#E8E8E0',
  borderDk:  '#D4D4CC',
  // Text
  text:      '#1A1A2E',
  textMid:   '#4A4A5C',
  textLt:    '#8A8A9A',
  // Semantic
  success:   '#1DBF73',
  danger:    '#FF4757',
  dangerLt:  '#FFF1F2',
  warning:   '#F5A623',
  warningLt: '#FFF8EC',
  indigo:    '#5C6BC0',
  indigoLt:  '#EEF0FF',
  teal:      '#00BFA5',
  tealLt:    '#E0FAF6',
  // Voisin'Talents — palette chaude africaine
  sable:     '#FAF3E3',   // fond sableux chaud (arrière-plan principal)
  sableDk:   '#F0E4C8',
  nuit:      '#1A120A',   // brun nuit profond (topbar sombre)
  nuitMid:   '#2D2015',
  nuitLt:    '#3D3020',
  safran:    '#E8920A',   // safran/orange doré (accent vif)
  safranDk:  '#B87008',
  safranLt:  '#FFF3DC',
  terre:     '#7A5530',   // terre de couleur (accent chaleureux)
  voisin:    '#4A9B65',   // vert feuillage (badge voisinage / communauté)
  voisinLt:  '#E6F5EC',
}

const G = {
  brand:   `linear-gradient(135deg,${C.brand},${C.brandDk})`,
  orange:  `linear-gradient(135deg,${C.orange},${C.orangeDk})`,
  dark:    `linear-gradient(160deg,${C.dark} 0%,${C.darkMid} 60%,${C.darkLt} 100%)`,
  hero:    `linear-gradient(160deg,${C.dark} 0%,#0F1122 50%,${C.darkMid} 100%)`,
  sunset:  `linear-gradient(135deg,${C.orange},${C.gold})`,
  aurora:  `linear-gradient(135deg,${C.brand},${C.teal})`,
  card:    `linear-gradient(135deg,${C.darkLt},${C.darkSoft})`,
  safran:  `linear-gradient(135deg,${C.safran},${C.safranDk})`,
  nuit:    `linear-gradient(160deg,${C.nuit} 0%,${C.nuitMid} 60%,${C.nuitLt} 100%)`,
  terre:   `linear-gradient(135deg,${C.terre},#5A3A18)`,
}

// ══════════════════════════════════════════════════
// TRANSLATIONS FR / EN
// ══════════════════════════════════════════════════
const T = {
  fr: {
    // Nav
    home:'Accueil', explore:'Explorer', postJob:'Publier', messages:'Messages',
    profile:'Profil', journal:'Journal', notifications:'Notifications',
    settings:'Paramètres', missions:'Missions',
    // Auth
    login:'Se connecter', register:"S'inscrire", logout:'Déconnexion',
    email:'Adresse email', password:'Mot de passe', confirmPwd:'Confirmer le mot de passe',
    forgotPwd:'Mot de passe oublié ?', noAccount:'Pas de compte ?', haveAccount:'Déjà inscrit ?',
    iAmClient:'Je cherche un freelance', iAmFreelancer:'Je suis freelance',
    next:'Continuer', back:'Retour', finish:'Terminer', save:'Enregistrer',
    step:'Étape', of:'sur',
    // Misc
    available:'Disponible', unavailable:'Indisponible', verified:'Vérifié',
    reviews:'avis', from:'À partir de', perHour:'/h',
    apply:'Postuler', contact:'Contacter', hire:'Recruter',
    budget:'Budget', deadline:'Délai',
    noResults:'Aucun résultat', loading:'Chargement...',
    history:'Historique',
    searchPh:'Chercher un service, compétence, freelance...',
    filterResults:'Filtrer',
    allLogs:'Tous', clearLogs:'Vider', exportLogs:'Exporter',
    journalTitle:'Journal d\'activité',
  },
  en: {
    home:'Home', explore:'Explore', postJob:'Post Job', messages:'Messages',
    profile:'Profile', journal:'Activity Log', notifications:'Notifications',
    settings:'Settings', missions:'Missions',
    login:'Log In', register:'Sign Up', logout:'Log Out',
    email:'Email address', password:'Password', confirmPwd:'Confirm password',
    forgotPwd:'Forgot password?', noAccount:'No account?', haveAccount:'Already registered?',
    iAmClient:'I need a freelancer', iAmFreelancer:'I am a freelancer',
    next:'Continue', back:'Back', finish:'Finish', save:'Save',
    step:'Step', of:'of',
    available:'Available', unavailable:'Unavailable', verified:'Verified',
    reviews:'reviews', from:'From', perHour:'/h',
    apply:'Apply', contact:'Contact', hire:'Hire',
    budget:'Budget', deadline:'Deadline',
    noResults:'No results', loading:'Loading...',
    history:'History',
    searchPh:'Search a service, skill, freelancer...',
    filterResults:'Filter',
    allLogs:'All', clearLogs:'Clear', exportLogs:'Export',
    journalTitle:'Activity Log',
  }
}

// ══════════════════════════════════════════════════
// AFRICA — 20 pays, 60+ villes, quartiers
// ══════════════════════════════════════════════════

export { C, G, T }
