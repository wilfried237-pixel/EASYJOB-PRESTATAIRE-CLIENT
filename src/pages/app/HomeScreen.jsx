import { useState, useEffect, useRef, useCallback } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Inp, Sel, Modal, Av, Stars, Badge, Toggle } from '../../components/ui'
import { toast, useIsMobile, fmt, fmtN } from '../../utils/utils.jsx'
import { buildWhatsAppUrl } from '../../utils/links'
import { missionsAPI } from '../../api/client'
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
  Heart, Map, ThumbsUp, Navigation
} from 'lucide-react'

// ── Mini-composant : badge quartier ──
const QBadge=({count,lang,pulse=false})=>(
  <div style={{display:'inline-flex',alignItems:'center',gap:4,
    background:C.voisinLt,border:`1px solid ${C.voisin}25`,
    borderRadius:20,padding:'3px 8px',
    animation:pulse?'vtPulse 2s infinite ease-in-out':undefined}}>
    <span style={{fontSize:10}}>🏘️</span>
    <span style={{fontSize:10,fontWeight:700,color:C.voisin,fontFamily:'Inter,sans-serif'}}>
      {lang==='fr'?`${count} voisin${count>1?'s':''}`:`${count} nbr`}
    </span>
  </div>
)

// ── Faux pins sur la carte ──
const MAP_PINS=[
  {id:1,top:'22%',left:'18%',cat:'🔧',catColor:C.brand, nom:'Moussa C.',metier:'Plombier',district:'Abobo',    note:4.8,voisins:12,av:'MC',dispo:true},
  {id:2,top:'48%',left:'62%',cat:'✂️',catColor:C.safran,nom:'Aïssata K.',metier:'Coiffure',district:'Cocody',  note:5.0,voisins:8, av:'AS',dispo:true},
  {id:3,top:'18%',left:'72%',cat:'📚',catColor:C.terre,  nom:'Yao E.',   metier:'Cours part.',district:'Plateau',note:4.9,voisins:5, av:'KA',dispo:true},
  {id:4,top:'68%',left:'28%',cat:'🍳',catColor:C.brand, nom:'Aminata S.',metier:'Cuisine',district:'Marcory',  note:5.0,voisins:19,av:'AT',dispo:true},
  {id:5,top:'35%',left:'45%',cat:'🧹',catColor:'#009688',nom:'Geneviève O.',metier:'Ménage',district:'Yopougon',note:4.7,voisins:7,av:'OD',dispo:false},
  {id:6,top:'72%',left:'70%',cat:'⚡',catColor:'#FFC107',nom:'Ibrahim H.', metier:'Électricité',district:'Maarif',note:4.9,voisins:11,av:'IB',dispo:true},
]

// ── Modal tâche éclair ──
const EclairModal=({onClose,lang})=>{
  const t=T[lang]
  const[step,setStep]=useState(1)
  const[form,setForm]=useState({titre:'',categorie:'',rayon:'2',dispo:'now'})

  const handleSubmit=()=>{
    if(!form.titre.trim()){toast.error(lang==='fr'?'Décris ta tâche':'Describe the task');return}
    setStep(2)
    setTimeout(()=>{toast.success(lang==='fr'?'Tâche diffusée ! 3 prestataires notifiés ⚡':'Task broadcast! 3 providers notified ⚡');onClose()},1800)
  }

  return(
    <div style={{position:'fixed',inset:0,zIndex:500,background:'rgba(26,18,8,.6)',backdropFilter:'blur(4px)',
      display:'flex',alignItems:'flex-end',justifyContent:'center'}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}
        style={{width:'100%',maxWidth:520,background:C.white,borderRadius:'20px 20px 0 0',
          padding:'24px 24px 36px',boxShadow:'0 -20px 60px rgba(26,18,8,.2)'}}>

        {/* Handle */}
        <div style={{width:36,height:4,background:C.borderDk,borderRadius:2,margin:'0 auto 20px'}}/>

        {step===1?(
          <>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
              <div style={{width:38,height:38,borderRadius:12,background:G.safran,
                display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Zap size={18} color="#fff" fill="#fff"/>
              </div>
              <div>
                <h3 style={{fontSize:17,fontWeight:800,color:C.text,margin:0,fontFamily:'Outfit,sans-serif'}}>
                  {t.eclairTask||'Tâche éclair'}
                </h3>
                <p style={{fontSize:12,color:C.textLt,margin:0,fontFamily:'Inter,sans-serif'}}>
                  {lang==='fr'?'Diffusée aux prestataires proches':'Broadcast to nearby providers'}
                </p>
              </div>
            </div>

            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,fontWeight:700,color:C.textMid,fontFamily:'Inter,sans-serif',
                display:'block',marginBottom:6}}>
                {lang==='fr'?'J\'ai besoin de…':'I need…'}
              </label>
              <input value={form.titre} onChange={e=>setForm(f=>({...f,titre:e.target.value}))}
                placeholder={lang==='fr'?'Ex : Monter un meuble, réparer une fuite…':'E.g. Assemble furniture, fix a leak…'}
                style={{width:'100%',padding:'12px 14px',borderRadius:10,border:`1.5px solid ${C.border}`,
                  fontSize:14,color:C.text,fontFamily:'Inter,sans-serif',outline:'none',boxSizing:'border-box',
                  background:C.sable}}/>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
              <div>
                <label style={{fontSize:12,fontWeight:700,color:C.textMid,fontFamily:'Inter,sans-serif',
                  display:'block',marginBottom:6}}>{lang==='fr'?'Rayon':'Radius'}</label>
                <select value={form.rayon} onChange={e=>setForm(f=>({...f,rayon:e.target.value}))}
                  style={{width:'100%',padding:'10px 12px',borderRadius:10,border:`1.5px solid ${C.border}`,
                    fontSize:13,color:C.text,fontFamily:'Inter,sans-serif',background:C.white,cursor:'pointer'}}>
                  <option value="1">1 km</option>
                  <option value="2">2 km</option>
                  <option value="5">5 km</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:12,fontWeight:700,color:C.textMid,fontFamily:'Inter,sans-serif',
                  display:'block',marginBottom:6}}>{lang==='fr'?'Disponibilité':'Availability'}</label>
                <select value={form.dispo} onChange={e=>setForm(f=>({...f,dispo:e.target.value}))}
                  style={{width:'100%',padding:'10px 12px',borderRadius:10,border:`1.5px solid ${C.border}`,
                    fontSize:13,color:C.text,fontFamily:'Inter,sans-serif',background:C.white,cursor:'pointer'}}>
                  <option value="now">{lang==='fr'?'Maintenant':'Right now'}</option>
                  <option value="today">{lang==='fr'?'Aujourd\'hui':'Today'}</option>
                  <option value="week">{lang==='fr'?'Cette semaine':'This week'}</option>
                </select>
              </div>
            </div>

            <button onClick={handleSubmit}
              style={{width:'100%',padding:'14px',borderRadius:12,background:G.safran,
                border:'none',cursor:'pointer',fontSize:15,fontWeight:800,color:'#fff',
                fontFamily:'Outfit,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
              <Zap size={16} fill="#fff"/>
              {lang==='fr'?'Diffuser la tâche':'Broadcast task'}
            </button>
          </>
        ):(
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{fontSize:48,marginBottom:16}}>⚡</div>
            <h3 style={{fontSize:18,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif',marginBottom:8}}>
              {lang==='fr'?'Tâche diffusée !':'Task broadcast!'}
            </h3>
            <p style={{fontSize:14,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Notification envoyée aux prestataires proches…':'Notifying nearby providers…'}
            </p>
            <div style={{display:'flex',gap:4,justifyContent:'center',marginTop:16}}>
              {[0,1,2].map(i=>(
                <div key={i} style={{width:8,height:8,borderRadius:4,background:C.safran,
                  animation:`vtDot 1s ${i*0.2}s infinite ease-in-out alternate`}}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Vue Prestataire (tableau de bord missions) ──
const FreelancerHome=({user,data,lang,setSub,setSelM,setPage})=>{
  const t=T[lang]
  const isMobile=useIsMobile()
  const hour=new Date().getHours()
  const greeting=lang==='fr'?(hour<12?'Bonjour':'Bonsoir'):(hour<12?'Good morning':'Good evening')
  const[catFilter,setCatFilter]=useState(0)

  const cats=[
    {id:0,emoji:'🌟',fr:'Tout',en:'All'},
    {id:1,emoji:'💻',fr:'Dev',en:'Dev'},
    {id:2,emoji:'🎨',fr:'Design',en:'Design'},
    {id:4,emoji:'📱',fr:'Marketing',en:'Marketing'},
    {id:5,emoji:'✂️',fr:'Coiffure',en:'Beauty'},
    {id:6,emoji:'🪡',fr:'Couture',en:'Tailoring'},
    {id:7,emoji:'🔧',fr:'Artisan',en:'Trades'},
    {id:10,emoji:'🍳',fr:'Cuisine',en:'Catering'},
    {id:14,emoji:'📚',fr:'Cours',en:'Tutoring'},
  ]

  const missions=data.missions||MISSIONS
  const filtered=catFilter===0?missions:missions.filter(m=>m.catId===catFilter)

  const stats=[
    {v:filtered.length, l:lang==='fr'?'Missions dispo':'Available missions', icon:Briefcase, color:C.brand},
    {v:data.proposals?.length||0, l:lang==='fr'?'Candidatures':'Applications', icon:Send, color:C.safran},
    {v:user.note||'—', l:lang==='fr'?'Ma note':'My rating', icon:Star, color:C.gold},
  ]

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.sable,overflow:'hidden'}}>

      {/* Header */}
      <div style={{background:C.nuit,padding:isMobile?'14px 16px':'14px 24px',flexShrink:0,
        borderBottom:'1px solid rgba(255,255,255,.06)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          {isMobile&&(
            <div style={{display:'flex',alignItems:'center',gap:7}}>
              <div style={{width:28,height:28,borderRadius:8,background:G.safran,
                display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Briefcase size={14} color="#fff"/>
              </div>
              <span style={{fontSize:15,fontWeight:800,color:'#fff',fontFamily:'Outfit,sans-serif'}}>
                Easy<span style={{color:C.brand}}>Job</span>
              </span>
            </div>
          )}
          <div style={{flex:1}}>
            <div style={{fontSize:12,color:'rgba(255,255,255,.4)',fontFamily:'Inter,sans-serif'}}>
              {greeting}
            </div>
            <div style={{fontSize:15,fontWeight:700,color:'#fff',fontFamily:'Outfit,sans-serif'}}>
              {user.nom} <span style={{fontSize:12,color:C.brand,fontWeight:600}}>· {lang==='fr'?'Prestataire':'Provider'}</span>
            </div>
          </div>
        </div>

        {/* Mini stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:14}}>
          {stats.map((s,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.08)',
              borderRadius:12,padding:'10px 12px',textAlign:'center'}}>
              <s.icon size={14} color={s.color} style={{marginBottom:4}}/>
              <div style={{fontSize:17,fontWeight:800,color:'#fff',fontFamily:'Outfit,sans-serif'}}>{s.v}</div>
              <div style={{fontSize:10,color:'rgba(255,255,255,.35)',fontFamily:'Inter,sans-serif',lineHeight:1.3}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtres catégories */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,flexShrink:0,
        padding:'10px 16px',overflowX:'auto',display:'flex',gap:8,scrollbarWidth:'none'}}>
        {cats.map(c=>(
          <button key={c.id} onClick={()=>setCatFilter(c.id)}
            style={{display:'flex',alignItems:'center',gap:5,padding:'6px 12px',borderRadius:20,
              whiteSpace:'nowrap',border:'none',cursor:'pointer',transition:'all .15s',fontSize:12,fontWeight:600,
              fontFamily:'Inter,sans-serif',
              background:catFilter===c.id?C.nuit:'transparent',
              color:catFilter===c.id?'#fff':C.textMid}}>
            <span style={{fontSize:13}}>{c.emoji}</span>
            {lang==='fr'?c.fr:c.en}
          </button>
        ))}
      </div>

      {/* Liste des missions */}
      <div style={{flex:1,overflowY:'auto',padding:isMobile?'12px 12px 80px':'16px 20px'}}>
        {filtered.length===0?(
          <div style={{textAlign:'center',padding:'60px 20px',color:C.textMid}}>
            <Briefcase size={40} style={{opacity:.2,margin:'0 auto 12px',display:'block'}}/>
            <div style={{fontFamily:'Inter,sans-serif',fontSize:14}}>{t.noResults}</div>
          </div>
        ):filtered.map(m=>{
          const isUrgent=m.urgent
          return(
            <div key={m.id} onClick={()=>{setSelM(m);setSub('mission')}}
              style={{background:C.white,borderRadius:16,padding:'16px',marginBottom:12,
                border:`1px solid ${isUrgent?C.safran+'50':C.border}`,cursor:'pointer',
                boxShadow:'0 2px 8px rgba(26,18,8,.04)',transition:'all .15s'}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 6px 20px rgba(26,18,8,.1)';e.currentTarget.style.borderColor=C.brand+'50'}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 2px 8px rgba(26,18,8,.04)';e.currentTarget.style.borderColor=isUrgent?C.safran+'50':C.border}}>

              {/* Top row */}
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8,marginBottom:8}}>
                <div style={{flex:1}}>
                  {isUrgent&&(
                    <span style={{display:'inline-flex',alignItems:'center',gap:3,
                      background:C.safranLt,color:C.safranDk,fontSize:10,fontWeight:700,
                      padding:'2px 8px',borderRadius:10,fontFamily:'Inter,sans-serif',marginBottom:5}}>
                      <Zap size={9} fill={C.safranDk}/>{lang==='fr'?'URGENT':'URGENT'}
                    </span>
                  )}
                  <div style={{fontSize:14,fontWeight:700,color:C.text,fontFamily:'Outfit,sans-serif',lineHeight:1.3}}>
                    {lang==='fr'?m.titreF||m.titre:m.titre}
                  </div>
                </div>
                <div style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif',flexShrink:0,marginTop:2}}>
                  {m.postedAt}
                </div>
              </div>

              <p style={{fontSize:12,color:C.textMid,fontFamily:'Inter,sans-serif',lineHeight:1.6,
                margin:'0 0 10px',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                {m.desc}
              </p>

              {/* Footer */}
              <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                <div style={{display:'flex',alignItems:'center',gap:4,
                  background:C.bg,borderRadius:20,padding:'3px 10px',fontSize:11,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                  <MapPin size={10} color={C.safran}/>{m.city}{m.country?`, ${m.country}`:''}
                </div>
                <div style={{display:'flex',alignItems:'center',gap:4,
                  background:C.bg,borderRadius:20,padding:'3px 10px',fontSize:11,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                  <Users size={10} color={C.brand}/>{m.props||0} {lang==='fr'?'candidat(s)':'applicant(s)'}
                </div>
                {m.deadline&&(
                  <div style={{display:'flex',alignItems:'center',gap:4,
                    background:C.bg,borderRadius:20,padding:'3px 10px',fontSize:11,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                    <Calendar size={10} color={C.textLt}/>{m.deadline}
                  </div>
                )}
                <div style={{flex:1}}/>
                <button onClick={e=>{e.stopPropagation();setSelM(m);setSub('mission')}}
                  style={{background:G.safran,border:'none',borderRadius:10,padding:'6px 14px',
                    cursor:'pointer',fontSize:12,fontWeight:700,color:'#fff',fontFamily:'Inter,sans-serif',
                    display:'flex',alignItems:'center',gap:5}}>
                  {lang==='fr'?'Voir':'View'} <ArrowRight size={11}/>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── HomeScreen ──
const HomeScreen=({user,data,setData,lang,setSub,setSelFL,setSelM,setPage,addLog})=>{
  const t=T[lang]
  const isFL=user.role==='freelancer'
  const isMobile=useIsMobile()
  const hour=new Date().getHours()
  const greeting=lang==='fr'?(hour<12?'Bonjour':'Bonsoir'):(hour<12?'Good morning':'Good evening')

  const[selectedPin,setSelectedPin]=useState(null)
  const[radius,setRadius]=useState(2)
  const[showEclair,setShowEclair]=useState(false)
  const[mapReady,setMapReady]=useState(false)

  useEffect(()=>{const id=setTimeout(()=>setMapReady(true),400);return()=>clearTimeout(id)},[])

  const handleViewProfil=(fl)=>{
    const found=data.freelancers.find(f=>f.id===fl.id)||data.freelancers[0]
    setSelFL(found);setSub('freelancer');setSelectedPin(null)
  }

  if(isFL) return <FreelancerHome user={user} data={data} lang={lang} setSub={setSub} setSelM={setSelM} setPage={setPage}/>

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.sable,overflow:'hidden'}}>

      {/* ── BARRE SUPÉRIEURE ── */}
      <div style={{background:C.nuit,padding:isMobile?'14px 16px':'14px 24px',
        display:'flex',alignItems:'center',gap:12,flexShrink:0,
        borderBottom:'1px solid rgba(255,255,255,.06)'}}>

        {/* Logo (mobile seulement) */}
        {isMobile&&(
          <div style={{display:'flex',alignItems:'center',gap:7}}>
            <div style={{width:28,height:28,borderRadius:8,background:G.safran,
              display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Zap size={14} color="#fff" fill="#fff"/>
            </div>
            <span style={{fontSize:15,fontWeight:800,color:'#fff',fontFamily:'Outfit,sans-serif'}}>
              Easy<span style={{color:C.brand}}>Job</span>
            </span>
          </div>
        )}

        {/* Barre de recherche */}
        <button onClick={()=>setSub('search')}
          style={{flex:1,display:'flex',alignItems:'center',gap:10,height:40,
            background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.1)',
            borderRadius:10,padding:'0 14px',cursor:'pointer',textAlign:'left'}}>
          <Search size={14} color="rgba(255,255,255,.4)"/>
          <span style={{fontSize:13,color:'rgba(255,255,255,.35)',fontFamily:'Inter,sans-serif'}}>
            {t.searchPh}
          </span>
        </button>

        {/* Localisation */}
        <div style={{display:'flex',alignItems:'center',gap:5,
          background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.1)',
          borderRadius:10,padding:'8px 12px',cursor:'pointer',flexShrink:0}}>
          <MapPin size={13} color={C.safran}/>
          <span style={{fontSize:12,color:'rgba(255,255,255,.6)',fontFamily:'Inter,sans-serif',fontWeight:600}}>
            {user.district||user.city||(lang==='fr'?'Quartier':'District')}
          </span>
        </div>

      </div>

      {/* ── CARTE (simulée) ── */}
      <div style={{flex:1,position:'relative',overflow:'hidden'}}>

        {/* Fond carte */}
        <div style={{position:'absolute',inset:0,
          background:`linear-gradient(160deg,#e8e0cc 0%,#d5c9a8 40%,#c8ba8e 100%)`}}>

          {/* Grille de rues simulée */}
          <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.3}}>
            {/* Rues horizontales */}
            {[15,28,42,55,68,80].map(y=>(
              <line key={`h${y}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                stroke="#8B7355" strokeWidth="1.5"/>
            ))}
            {/* Rues verticales */}
            {[12,25,38,50,62,75,88].map(x=>(
              <line key={`v${x}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                stroke="#8B7355" strokeWidth="1.5"/>
            ))}
            {/* Axe principal (diagonale) */}
            <line x1="0%" y1="60%" x2="100%" y2="30%"
              stroke="#7A6040" strokeWidth="5" strokeLinecap="round"/>
            <line x1="20%" y1="0%" x2="80%" y2="100%"
              stroke="#7A6040" strokeWidth="3" strokeLinecap="round"/>
          </svg>

          {/* Zone verte (parc) */}
          <div style={{position:'absolute',top:'30%',left:'40%',width:80,height:55,
            borderRadius:16,background:'rgba(45,140,95,.25)',
            border:'1px solid rgba(45,140,95,.3)'}}/>

          {/* Skeletons de chargement */}
          {!mapReady&&[...Array(4)].map((_,i)=>(
            <div key={i} style={{position:'absolute',
              top:`${20+i*18}%`,left:`${15+i*20}%`,
              width:28,height:28,borderRadius:14,
              background:'rgba(139,115,85,.3)',
              animation:'vtPulseMap .9s infinite ease-in-out alternate'}}/>
          ))}

          {/* Épingles */}
          {mapReady&&MAP_PINS.map(pin=>{
            const active=selectedPin?.id===pin.id
            return(
              <button key={pin.id} onClick={()=>setSelectedPin(active?null:pin)}
                style={{position:'absolute',top:pin.top,left:pin.left,
                  display:'flex',flexDirection:'column',alignItems:'center',
                  background:'transparent',border:'none',cursor:'pointer',
                  transform:active?'scale(1.25)':'scale(1)',
                  transition:'transform .2s',zIndex:active?10:5}}>
                <div style={{width:36,height:36,borderRadius:18,background:pin.catColor,
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,
                  boxShadow:`0 4px 14px ${pin.catColor}80`,
                  border:active?`3px solid ${C.white}`:`2px solid ${pin.catColor}`,
                  filter:!pin.dispo?'grayscale(.6)':undefined}}>
                  {pin.cat}
                </div>
                <div style={{width:0,height:0,
                  borderLeft:'5px solid transparent',borderRight:'5px solid transparent',
                  borderTop:`7px solid ${pin.catColor}`}}/>
                {/* Mini badge voisins */}
                {pin.voisins>=5&&(
                  <div style={{position:'absolute',top:-4,right:-4,
                    background:C.voisin,borderRadius:8,padding:'1px 5px',
                    fontSize:9,fontWeight:700,color:'#fff',fontFamily:'Inter,sans-serif',
                    border:`2px solid ${C.white}`}}>
                    {pin.voisins}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* ── SLIDER RAYON ── */}
        <div style={{position:'absolute',bottom:selectedPin?220:20,left:'50%',
          transform:'translateX(-50%)',
          background:C.nuit,borderRadius:20,padding:'8px 16px',
          display:'flex',alignItems:'center',gap:10,
          boxShadow:'0 4px 20px rgba(26,18,8,.3)',zIndex:20,
          backdropFilter:'blur(8px)',transition:'bottom .3s'}}>
          <Navigation size={13} color={C.safran}/>
          <input type="range" min={0.5} max={5} step={0.5} value={radius}
            onChange={e=>setRadius(Number(e.target.value))}
            style={{width:100,accentColor:C.safran,cursor:'pointer'}}/>
          <span style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,.7)',
            fontFamily:'Inter,sans-serif',minWidth:36}}>
            {radius} km
          </span>
        </div>

        {/* ── BOTTOM SHEET (pin sélectionné) ── */}
        {selectedPin&&(
          <div style={{position:'absolute',bottom:0,left:0,right:0,
            background:C.white,borderRadius:'20px 20px 0 0',padding:'20px 20px 28px',
            boxShadow:'0 -8px 40px rgba(26,18,8,.15)',zIndex:30,
            animation:'vtSlideUp .25s ease-out'}}>

            {/* Handle */}
            <div style={{width:32,height:4,background:C.borderDk,borderRadius:2,margin:'0 auto 16px'}}/>

            <div style={{display:'flex',gap:12,alignItems:'flex-start',marginBottom:14}}>
              <div style={{position:'relative'}}>
                <Av code={selectedPin.av} size={52}/>
                {selectedPin.dispo&&(
                  <div style={{position:'absolute',bottom:1,right:1,width:13,height:13,
                    borderRadius:7,background:C.brand,border:`2px solid ${C.white}`}}/>
                )}
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:16,color:C.text,fontFamily:'Outfit,sans-serif'}}>
                      {selectedPin.nom}
                    </div>
                    <div style={{fontSize:13,color:C.textMid,marginTop:2,fontFamily:'Inter,sans-serif'}}>
                      {selectedPin.metier} · {selectedPin.district}
                    </div>
                  </div>
                  <QBadge count={selectedPin.voisins} lang={lang} pulse/>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:10,marginTop:8}}>
                  <Stars note={selectedPin.note} sz={11}/>
                  {selectedPin.dispo
                    ?<span style={{fontSize:11,fontWeight:700,color:C.brand,fontFamily:'Inter,sans-serif'}}>
                        ● {lang==='fr'?'Disponible':'Available'}
                      </span>
                    :<span style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif'}}>
                        {lang==='fr'?'Indisponible':'Unavailable'}
                      </span>
                  }
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
              <button onClick={()=>handleViewProfil(selectedPin)}
                style={{padding:'11px 8px',borderRadius:12,background:G.safran,
                  border:'none',cursor:'pointer',fontSize:12,fontWeight:700,
                  color:'#fff',fontFamily:'Inter,sans-serif',
                  display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <User size={14} color="#fff"/>
                {lang==='fr'?'Voir profil':'Profile'}
              </button>
              <button onClick={()=>{
                  const profile=data.freelancers.find(f=>f.av===selectedPin.av || f.nom===selectedPin.nom)
                  const message=lang==='fr'
                    ?`Bonjour ${profile?.nom || selectedPin.nom}, je souhaite vous contacter via EasyJob.`
                    :`Hello ${profile?.nom || selectedPin.nom}, I would like to contact you via EasyJob.`
                  window.open(buildWhatsAppUrl(profile?.whatsapp, message), '_blank', 'noopener,noreferrer')
                  setSelectedPin(null)
                }}
                style={{padding:'11px 8px',borderRadius:12,background:C.sable,
                  border:`1.5px solid ${C.border}`,cursor:'pointer',fontSize:12,fontWeight:700,
                  color:C.text,fontFamily:'Inter,sans-serif',
                  display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <MessageSquare size={14} color={C.textMid}/>
                {t.contact}
              </button>
              <button onClick={()=>{handleViewProfil(selectedPin)}}
                style={{padding:'11px 8px',borderRadius:12,background:C.safranLt,
                  border:`1.5px solid ${C.safran}30`,cursor:'pointer',fontSize:12,fontWeight:700,
                  color:C.safranDk,fontFamily:'Inter,sans-serif',
                  display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <Calendar size={14} color={C.safranDk}/>
                {lang==='fr'?'RDV':'Book'}
              </button>
            </div>
          </div>
        )}

        {/* ── BOUTON TÂCHE ÉCLAIR ── */}
        <button onClick={()=>setShowEclair(true)}
          style={{position:'absolute',bottom:selectedPin?240:80,right:20,
            width:52,height:52,borderRadius:26,background:G.safran,
            border:'none',cursor:'pointer',zIndex:25,
            display:'flex',alignItems:'center',justifyContent:'center',
            boxShadow:`0 6px 24px ${C.safran}66`,transition:'bottom .3s',
            animation:'vtPulseBtn 2.5s infinite ease-in-out'}}>
          <Zap size={22} color="#fff" fill="#fff"/>
        </button>

        {/* Légende */}
        {!isMobile&&!selectedPin&&(
          <div style={{position:'absolute',top:16,right:16,
            background:`${C.nuit}E0`,backdropFilter:'blur(12px)',
            borderRadius:14,padding:'12px 14px',zIndex:20,
            border:'1px solid rgba(255,255,255,.08)'}}>
            <div style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,.35)',
              fontFamily:'Inter,sans-serif',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:8}}>
              {lang==='fr'?'Catégories':'Categories'}
            </div>
            {[{cat:'🔧',label:'Artisanat',c:C.brand},{cat:'✂️',label:'Beauté',c:C.safran},
              {cat:'📚',label:'Formation',c:C.terre},{cat:'⚡',label:'Électricité',c:'#FFC107'}].map((l,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:7,marginBottom:5}}>
                <div style={{width:10,height:10,borderRadius:5,background:l.c}}/>
                <span style={{fontSize:11,color:'rgba(255,255,255,.5)',fontFamily:'Inter,sans-serif'}}>{l.cat} {l.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Vide state */}
        {mapReady&&MAP_PINS.length===0&&(
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
            background:C.white,borderRadius:20,padding:'28px 32px',textAlign:'center',
            boxShadow:'0 8px 40px rgba(26,18,8,.12)',maxWidth:300}}>
            <div style={{fontSize:40,marginBottom:12}}>🗺️</div>
            <h3 style={{fontSize:16,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif',marginBottom:8}}>
              {t.noPrestataire}
            </h3>
            <p style={{fontSize:13,color:C.textMid,fontFamily:'Inter,sans-serif',marginBottom:16,lineHeight:1.6}}>
              {t.firstToRecommend}
            </p>
            <Btn v="safran" sz="sm" onClick={()=>setSub('mes-missions')}>
              🤝 {t.sponsorTalent}
            </Btn>
          </div>
        )}
      </div>

      {/* ── STYLES ANIMATIONS ── */}
      <style>{`
        @keyframes vtPulse { 0%,100%{box-shadow:0 0 0 0 ${C.voisin}40} 50%{box-shadow:0 0 0 6px ${C.voisin}00} }
        @keyframes vtPulseMap { 0%{opacity:.2} 100%{opacity:.6} }
        @keyframes vtPulseBtn { 0%,100%{box-shadow:0 6px 24px ${C.safran}66} 50%{box-shadow:0 8px 32px ${C.safran}99} }
        @keyframes vtSlideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes vtDot { from{opacity:.3;transform:scale(.8)} to{opacity:1;transform:scale(1.1)} }
      `}</style>

      {isMobile&&<div style={{height:72}}/>}
    </div>
  )
}

export default HomeScreen
