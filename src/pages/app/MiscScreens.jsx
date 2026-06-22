import { useState, useEffect, useRef, useCallback } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Inp, Sel, Modal, Av, Stars, Badge, Toggle } from '../../components/ui'
import { PgHdr } from '../../components/layout'
import { toast, useIsMobile, fmt, fmtN } from '../../utils/utils.jsx'
import { missionsAPI, messagesAPI, authAPI } from '../../api/client'
import { FLS, MISSIONS, CATS, AFRICA, SKILLS, QUIZ } from '../../data/mockData'
import {
  Search, MapPin, Star, Bell, MessageSquare, Briefcase, Zap,
  Plus, Send, LogOut, ChevronRight, ArrowRight,
  Lock, CheckCircle, Clock, User, Home, Check, X, Filter,
  Upload, Edit3, Phone, DollarSign, Calendar, BarChart2,
  Shield, RefreshCw, Download, ChevronDown, ChevronLeft,
  Settings, Share2, Info, TrendingUp, Award, FileText, Camera,
  Grid, List, MoreVertical, Eye, EyeOff, Trash2, Activity,
  Users, Sparkles, LogIn, Languages, Globe, Menu, AlignLeft,
  Code, Scissors, Wrench, Car, Utensils, Shirt, Music, Video,
  BookOpen, Cpu, Package, Hash, Image, ArrowLeft, PenLine,
  CheckCircle2, AlertCircle, Building, GraduationCap,
  Briefcase as BriefcaseIcon
} from 'lucide-react'

const LOG_TYPES={
  auth:       {icon:'🔑',fr:'Auth',       en:'Auth',       color:C.brand},
  navigation: {icon:'🗺️',fr:'Navigation', en:'Navigation', color:C.indigo},
  action:     {icon:'⚡',fr:'Action',     en:'Action',     color:C.safran},
  system:     {icon:'⚙️',fr:'Système',    en:'System',     color:C.textLt},
}

const NotificationsScreen=({onBack,data,setData,lang})=>{
  const t=T[lang]
  const markAll=()=>setData(d=>({...d,notifs:d.notifs.map(n=>({...n,read:true}))}))
  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
      <PgHdr title={t.notifications} onBack={onBack||undefined}
        right={<button onClick={markAll} style={{fontSize:12,color:C.brand,fontWeight:600,background:'none',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
          {lang==='fr'?'Tout lire':'Mark all read'}
        </button>}/>
      <div style={{flex:1,overflowY:'auto',padding:'12px 24px',maxWidth:800,margin:'0 auto',width:'100%'}}>
        {data.notifs.map(n=>(
          <div key={n.id} style={{display:'flex',gap:12,padding:'14px',borderRadius:14,marginBottom:8,cursor:'pointer',
            background:n.read?C.white:`${C.brand}08`,border:`1px solid ${n.read?C.border:C.brand+'33'}`,transition:'all .15s'}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 14px rgba(0,0,0,.06)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
            <div style={{width:38,height:38,borderRadius:10,background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>
              {n.icon}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:n.read?400:600,color:C.text,fontFamily:'Inter,sans-serif',lineHeight:1.5}}>{n.msg}</div>
              <div style={{fontSize:11,color:C.textLt,marginTop:3,fontFamily:'Inter,sans-serif'}}>{n.t}</div>
            </div>
            {!n.read&&<div style={{width:8,height:8,borderRadius:4,background:C.brand,flexShrink:0,marginTop:5}}/>}
          </div>
        ))}
        <div style={{height:72}}/>
      </div>
    </div>
  )
}

const JournalScreen=({logs,lang,setLogs,onBack})=>{
  const t=T[lang]
  const[filter,setFilter]=useState('all')
  const[q,setQ]=useState('')
  const filtered=logs.filter(l=>(filter==='all'||l.type===filter)&&(!q||(l.fr+l.en).toLowerCase().includes(q.toLowerCase())))
  const exportLogs=()=>{
    const txt=filtered.map(l=>`[${l.ts}] [${l.type.toUpperCase()}] ${lang==='fr'?l.fr:l.en}`).join('\n')
    const a=document.createElement('a');a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(txt);a.download='easyjob_logs.txt';a.click()
    toast.success(lang==='fr'?`${filtered.length} logs exportés`:`${filtered.length} logs exported`)
  }
  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
      <PgHdr title={t.journalTitle} onBack={onBack||undefined}
        right={<div style={{display:'flex',gap:6}}>
          <Btn v="soft" sz="xs" onClick={exportLogs}><Download size={12}/>{t.exportLogs}</Btn>
          <Btn v="danger" sz="xs" onClick={()=>{setLogs([]);toast.success(lang==='fr'?'Journal vidé':'Log cleared')}}>
            <Trash2 size={12}/>{t.clearLogs}
          </Btn>
        </div>}/>
      <div style={{padding:'12px 24px',borderBottom:`1px solid ${C.border}`,background:C.white,flexShrink:0}}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
          <div style={{display:'flex',alignItems:'center',gap:8,flex:1,background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:'7px 12px',minWidth:150}}>
            <Search size={13} color={C.textLt}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder={lang==='fr'?'Rechercher...':'Search...'}
              style={{border:'none',background:'transparent',fontSize:13,color:C.text,fontFamily:'Inter,sans-serif',outline:'none',flex:1}}/>
          </div>
        </div>
        <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
          {['all',...Object.keys(LOG_TYPES)].map(lt=>(
            <button key={lt} onClick={()=>setFilter(lt)}
              style={{padding:'4px 10px',borderRadius:20,fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif',
                background:filter===lt?C.dark:C.bg,color:filter===lt?'#fff':C.textMid,border:`1px solid ${filter===lt?C.dark:C.border}`,transition:'all .12s'}}>
              {lt==='all'?`${t.allLogs} (${logs.length})`:
                `${LOG_TYPES[lt].icon} ${lang==='fr'?LOG_TYPES[lt].fr:LOG_TYPES[lt].en}`}
            </button>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'12px 24px'}}>
        {filtered.length===0
          ?<div style={{textAlign:'center',padding:60,color:C.textMid,fontFamily:'Inter,sans-serif'}}>{t.noResults}</div>
          :filtered.map(l=>{
            const lt=LOG_TYPES[l.type]||LOG_TYPES.system
            return(
              <div key={l.id} style={{display:'flex',gap:12,padding:'10px 12px',marginBottom:4,borderRadius:10,background:C.white,border:`1px solid ${C.border}`}}>
                <div style={{width:28,height:28,borderRadius:7,background:lt.color+'18',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,flexShrink:0}}>{lt.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:600,color:C.text,fontFamily:'Inter,sans-serif'}}>{lang==='fr'?l.fr:l.en}</div>
                  <div style={{fontSize:10,color:C.textLt,marginTop:2,fontFamily:'Inter,sans-serif'}}>{new Date(l.ts).toLocaleString(lang==='fr'?'fr-FR':'en-US')}</div>
                </div>
                <span style={{background:lt.color+'18',color:lt.color,padding:'2px 7px',borderRadius:10,fontSize:10,fontWeight:700,alignSelf:'flex-start',fontFamily:'Inter,sans-serif',flexShrink:0}}>{l.type}</span>
              </div>
            )
          })
        }
        <div style={{height:72}}/>
      </div>
    </div>
  )
}

const SettingsScreen=({onBack,lang,setLang,user})=>{
  const t=T[lang]
  const[notifEmail,setNE]=useState(true),[notifPush,setNP]=useState(true)
  const[profPublic,setPP]=useState(true),[showOnline,setSO]=useState(true),[allowLoc,setAL]=useState(false)
  const[currency,setCur]=useState('FCFA'),[radius,setRadius]=useState('10 km')
  const[showDelConfirm,setSDC]=useState(false)

  const Section=({title,children})=>(
    <div style={{marginBottom:20}}>
      <div style={{fontSize:11,fontWeight:700,color:C.textLt,fontFamily:'Inter,sans-serif',
        textTransform:'uppercase',letterSpacing:'.1em',marginBottom:8,paddingLeft:4}}>
        {title}
      </div>
      <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,overflow:'hidden'}}>
        {children}
      </div>
    </div>
  )
  const Row=({label,right,last})=>(
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 16px',
      borderBottom:last?'none':`1px solid ${C.border}`}}>
      <span style={{fontSize:14,color:C.text,fontFamily:'Inter,sans-serif',fontWeight:500}}>{label}</span>
      {right}
    </div>
  )

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
      <PgHdr title={t.settings} onBack={onBack||undefined}/>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px',maxWidth:700,margin:'0 auto',width:'100%'}}>

        {/* Notifications */}
        <Section title={lang==='fr'?'Notifications':'Notifications'}>
          <Row label={lang==='fr'?'Notifications email':'Email notifications'} right={<Toggle on={notifEmail} onChange={()=>setNE(v=>!v)}/>}/>
          <Row label={lang==='fr'?'Notifications push':'Push notifications'} right={<Toggle on={notifPush} onChange={()=>setNP(v=>!v)}/>} last/>
        </Section>

        {/* Langue */}
        <Section title={lang==='fr'?'Langue':'Language'}>
          <Row label={lang==='fr'?'Langue / Language':'Language / Langue'} last right={
            <div style={{display:'flex',gap:6}}>
              {['fr','en'].map(l=>(
                <button key={l} onClick={()=>setLang(l)} style={{padding:'6px 14px',borderRadius:20,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif',
                  background:lang===l?C.dark:'transparent',color:lang===l?'#fff':C.textMid,
                  border:`1.5px solid ${lang===l?C.dark:C.border}`,transition:'all .15s'}}>
                  {l==='fr'?'🇫🇷 FR':'🇬🇧 EN'}
                </button>
              ))}
            </div>
          }/>
        </Section>

        {/* Mon compte */}
        <Section title={lang==='fr'?'Mon compte':'My account'}>
          <Row label={lang==='fr'?'Adresse email':'Email address'} right={
            <span style={{fontSize:13,color:C.textMid,fontFamily:'Inter,sans-serif',display:'flex',alignItems:'center',gap:5}}>
              <Lock size={11} color={C.textLt}/>{user?.email||'—'}
            </span>
          }/>
          <Row label={lang==='fr'?'Mot de passe':'Password'} right={
            <button onClick={()=>toast.info(lang==='fr'?'Bientôt disponible':'Coming soon')}
              style={{fontSize:12,color:C.brand,fontWeight:600,background:'none',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Modifier':'Change'}
            </button>
          }/>
          <Row label={lang==='fr'?'Supprimer le compte':'Delete account'} last right={
            showDelConfirm
              ?<div style={{display:'flex',gap:6}}>
                <button onClick={()=>setSDC(false)} style={{fontSize:12,color:C.textMid,background:'none',border:`1px solid ${C.border}`,borderRadius:8,padding:'4px 10px',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
                  {lang==='fr'?'Annuler':'Cancel'}
                </button>
                <button onClick={()=>toast.error(lang==='fr'?'Suppression désactivée en démo':'Deletion disabled in demo')}
                  style={{fontSize:12,color:'#fff',background:C.danger,border:'none',borderRadius:8,padding:'4px 10px',cursor:'pointer',fontFamily:'Inter,sans-serif',fontWeight:700}}>
                  {lang==='fr'?'Confirmer':'Confirm'}
                </button>
              </div>
              :<button onClick={()=>setSDC(true)}
                style={{fontSize:12,color:C.danger,fontWeight:600,background:'none',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Supprimer':'Delete'}
              </button>
          }/>
        </Section>

        {/* Confidentialité */}
        <Section title={lang==='fr'?'Confidentialité':'Privacy'}>
          <Row label={lang==='fr'?'Profil public':'Public profile'} right={<Toggle on={profPublic} onChange={()=>setPP(v=>!v)}/>}/>
          <Row label={lang==='fr'?'Afficher statut en ligne':'Show online status'} right={<Toggle on={showOnline} onChange={()=>setSO(v=>!v)}/>}/>
          <Row label={lang==='fr'?'Autoriser la localisation':'Allow location'} right={<Toggle on={allowLoc} onChange={()=>setAL(v=>!v)}/>} last/>
        </Section>

        {/* Préférences */}
        <Section title={lang==='fr'?'Préférences':'Preferences'}>
          <Row label={lang==='fr'?'Mode sombre':'Dark mode'} right={
            <Toggle on={false} onChange={()=>toast.info(lang==='fr'?'Bientôt disponible':'Coming soon')}/>
          }/>
          <Row label={lang==='fr'?'Unité monétaire':'Currency unit'} right={
            <select value={currency} onChange={e=>setCur(e.target.value)}
              style={{border:`1px solid ${C.border}`,borderRadius:8,padding:'5px 10px',fontSize:12,
                fontFamily:'Inter,sans-serif',color:C.text,background:C.white,cursor:'pointer'}}>
              {['FCFA','USD','EUR'].map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          }/>
          <Row label={lang==='fr'?'Rayon de recherche':'Search radius'} last right={
            <select value={radius} onChange={e=>setRadius(e.target.value)}
              style={{border:`1px solid ${C.border}`,borderRadius:8,padding:'5px 10px',fontSize:12,
                fontFamily:'Inter,sans-serif',color:C.text,background:C.white,cursor:'pointer'}}>
              {['5 km','10 km','25 km','50 km'].map(r=><option key={r} value={r}>{r}</option>)}
            </select>
          }/>
        </Section>

        <div style={{height:72}}/>
      </div>
    </div>
  )
}

const AideScreen=({onBack,lang})=>{
  const[open,setOpen]=useState(null)
  const FAQs=[
    {fr:'Comment obtenir le badge Vérifié ?',en:'How to get the Verified badge?',
     repFr:"Uploadez votre pièce d'identité valide (CNI ou passeport) + une photo professionnelle + réussissez le quiz plateforme avec 80%+. La vérification prend 24 à 48h maximum.",
     repEn:'Upload valid ID (national ID or passport) + a professional photo + pass the platform quiz with 80%+. Verification takes 24 to 48 hours maximum.'},
    {fr:'Pourquoi choisir uniquement des profils vérifiés ?',en:'Why only hire verified profiles?',
     repFr:"Les profils vérifiés ont prouvé leur identité et leurs compétences. EasyJob met en avant ces profils en priorité dans les résultats de recherche. Cela garantit des échanges de qualité et une relation de confiance.",
     repEn:'Verified profiles have proven their identity and skills. EasyJob prioritizes these profiles in search results, ensuring quality interactions and trustworthy relationships.'},
    {fr:'Comment ouvrir un signalement ?',en:'How to open a report?',
     repFr:"Allez dans la section Signalements (icône bouclier dans le menu). Notre équipe vous contacte dans 24h ouvrées. Préparez vos preuves (messages, fichiers, captures d'écran).",
     repEn:"Go to the Reports section (shield icon in the menu). Our team will contact you within 24 business hours. Prepare evidence (messages, files, screenshots)."},
    {fr:'Quelles sont les règles de la plateforme ?',en:'What are the platform rules?',
     repFr:"Ne partagez jamais votre numéro WhatsApp ou email en dehors de la plateforme. Toutes les communications et échanges de fichiers doivent rester dans l'app EasyJob pour votre sécurité.",
     repEn:"Never share your WhatsApp number or email outside the platform. All communications and file exchanges must stay within the EasyJob app for your security."},
    {fr:'Comment contacter le support EasyJob ?',en:'How to contact EasyJob support?',
     repFr:"Via WhatsApp +225 07 XX XX XX (8h–20h GMT), email support@easyjob.africa, ou le chat en direct dans l'app.",
     repEn:'Via WhatsApp +225 07 XX XX XX (8am–8pm GMT), email support@easyjob.africa, or in-app live chat.'},
  ]
  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
      <PgHdr title={lang==='fr'?'Aide & Support':'Help & Support'} onBack={onBack||undefined}/>
      <div style={{flex:1,overflowY:'auto',padding:'16px 24px',maxWidth:800,margin:'0 auto',width:'100%'}}>
        <div style={{background:G.safran,borderRadius:16,padding:'20px',marginBottom:16,display:'flex',gap:16,alignItems:'center'}}>
          <div style={{fontSize:36}}>🤝</div>
          <div>
            <div style={{fontWeight:800,fontSize:16,color:'#fff',fontFamily:'Outfit,sans-serif',marginBottom:4}}>
              {lang==='fr'?'Besoin d\'aide ?':'Need help?'}
            </div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <Btn v="dark" sz="sm" onClick={()=>toast.info('WhatsApp → +225 07 XX XX XX')}>💬 WhatsApp</Btn>
              <Btn v="outlineW" sz="sm" onClick={()=>toast.info('support@easyjob.africa')}>📧 Email</Btn>
            </div>
          </div>
        </div>
        <h3 style={{fontSize:15,fontWeight:700,color:C.text,margin:'0 0 12px',fontFamily:'Outfit,sans-serif'}}>FAQ</h3>
        {FAQs.map((f,i)=>(
          <div key={i} style={{background:C.white,borderRadius:12,marginBottom:8,border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <button onClick={()=>setOpen(open===i?null:i)}
              style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',
                padding:'14px 16px',background:'none',border:'none',cursor:'pointer',textAlign:'left'}}>
              <span style={{fontSize:13,fontWeight:600,color:C.text,fontFamily:'Inter,sans-serif',lineHeight:1.4,flex:1}}>{lang==='fr'?f.fr:f.en}</span>
              <ChevronDown size={16} color={C.textLt} style={{flexShrink:0,marginLeft:10,transform:open===i?'rotate(180deg)':'none',transition:'transform .2s'}}/>
            </button>
            {open===i&&<div style={{padding:'0 16px 14px',fontSize:13,color:C.textMid,lineHeight:1.75,fontFamily:'Inter,sans-serif',borderTop:`1px solid ${C.border}`}}>
              {lang==='fr'?f.repFr:f.repEn}
            </div>}
          </div>
        ))}
        <div style={{height:72}}/>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// FREELANCER DETAIL (sub-page)
// ══════════════════════════════════════════════════

export { NotificationsScreen, JournalScreen, SettingsScreen, AideScreen }
