import { useState, useEffect, useRef, useCallback } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Inp, Sel, Modal, Av, Stars, Badge, Toggle } from '../../components/ui'
import { toast, useIsMobile, fmt, fmtN } from '../../utils/utils.jsx'
import { buildWhatsAppUrl } from '../../utils/links'
import { missionsAPI, messagesAPI, authAPI } from '../../api/client'
import { FLS, MISSIONS, CATS, AFRICA, SKILLS, QUIZ, INIT_DATA } from '../../data/mockData'
import { PgHdr } from '../../components/layout'
import {
  Search, MapPin, Star, Bell, MessageSquare, Briefcase, Zap,
  Plus, Send, LogOut, ChevronRight, ArrowRight,
  Lock, CheckCircle, Clock, User, Home, Check, X, Filter,
  Upload, Edit3, Phone, Calendar, BarChart2,
  Shield, RefreshCw, Download, ChevronDown, ChevronLeft,
  Settings, Share2, Info, TrendingUp, Award, FileText, Camera,
  Grid, List, MoreVertical, Eye, EyeOff, Trash2, Activity,
  Users, Sparkles, LogIn, Languages, Globe, Menu, AlignLeft,
  Code, Scissors, Wrench, Car, Utensils, Shirt, Music, Video,
  BookOpen, Cpu, Package, Hash, Image, ArrowLeft, PenLine,
  CheckCircle2, AlertCircle, Building, GraduationCap,
  Briefcase as BriefcaseIcon
} from 'lucide-react'

const FreelancerDetail=({fl,onBack,lang,user,data,setData,setSub,setSelConv})=>{
  const[tab,setTab]=useState('info')
  const country=AFRICA.find(a=>a.code===fl.country)
  const isMobile=useIsMobile()
  const portfolio=[
    {title:lang==='fr'?'Projet client livré':'Delivered client project',type:lang==='fr'?'Réalisation':'Work sample',desc:fl.reviews?.[0]?.text||fl.bio,tag:fl.skills?.[0]||fl.title},
    {title:lang==='fr'?'Méthode de travail':'Work method',type:lang==='fr'?'Process':'Process',desc:lang==='fr'?'Brief, estimation, validation, livraison et suivi direct avec le client.':'Brief, estimate, validation, delivery and direct follow-up with the client.',tag:lang==='fr'?'Fiabilité':'Reliability'},
    {title:lang==='fr'?'Preuves & expérience':'Proofs & experience',type:lang==='fr'?'Confiance':'Trust',desc:fl.work?.[0]?.company?`${fl.work[0].role} · ${fl.work[0].company}`:fl.title,tag:fl.verifie?(lang==='fr'?'Vérifié':'Verified'):(lang==='fr'?'À vérifier':'To verify')},
  ]
  const services=[
    {name:lang==='fr'?'Diagnostic rapide':'Quick diagnosis',delay:lang==='fr'?'Même jour':'Same day',desc:lang==='fr'?'Analyse du besoin et recommandation claire avant de commencer.':'Need analysis and clear recommendation before starting.'},
    {name:lang==='fr'?'Prestation complète':'Full service',delay:lang==='fr'?'Selon mission':'Depends on job',desc:lang==='fr'?'Réalisation du service avec points de validation réguliers.':'Service delivery with regular validation checkpoints.'},
    {name:lang==='fr'?'Suivi après livraison':'After-delivery follow-up',delay:'24-48h',desc:lang==='fr'?'Petites corrections et conseils après la fin de la mission.':'Small fixes and advice after the job is done.'},
  ]

  const mediaProofs=[
    {kind:'image',title:lang==='fr'?'Avant / aprÃ¨s client':'Client before / after',meta:fl.skills?.[0]||fl.title},
    {kind:'video',title:lang==='fr'?'VidÃ©o courte de rÃ©alisation':'Short work video',meta:'30 sec'},
    {kind:'image',title:lang==='fr'?'Livrable final':'Final delivery',meta:fl.skills?.[1]||fl.city},
  ]
  const documentProofs=[
    ...(fl.education||[]).map(e=>({title:e.degree,meta:e.school,type:lang==='fr'?'DiplÃ´me':'Diploma'})),
    ...(fl.work||[]).map(w=>({title:w.role,meta:w.company,type:lang==='fr'?'ExpÃ©rience':'Experience'})),
    {title:lang==='fr'?'PiÃ¨ce dâ€™identitÃ© vÃ©rifiÃ©e':'Verified identity document',meta:fl.verifie?(lang==='fr'?'ValidÃ©':'Approved'):(lang==='fr'?'En attente':'Pending'),type:lang==='fr'?'IdentitÃ©':'Identity'},
  ]
  const trustScore=Math.min(98,Math.round((fl.note||4)*18+(fl.verifie?12:0)+(fl.reviews?.length||1)*3+(fl.dispo?5:0)))

  const contactFl=()=>{
    const message=lang==='fr'
      ?`Bonjour ${fl.nom}, je viens de votre profil EasyJob et je souhaite vous contacter.`
      :`Hello ${fl.nom}, I found your EasyJob profile and I would like to contact you.`
    const url=buildWhatsAppUrl(fl.whatsapp || fl.tel, message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return(
    <div style={{height:'100%',overflowY:'auto',background:C.bg}}>
      {/* Hero */}
      <div style={{background:G.hero,padding:isMobile?'0 0 40px':'0 0 48px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:`radial-gradient(${C.brand} 1px,transparent 1px)`,backgroundSize:'28px 28px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',padding:'14px 20px',position:'relative'}}>
          <button onClick={onBack} style={{background:'rgba(255,255,255,.1)',border:'none',borderRadius:10,padding:8,cursor:'pointer',display:'flex'}}>
            <ChevronLeft size={20} color="#fff"/>
          </button>
          <button onClick={async()=>{
            const link=window.location.href
            try{
              await navigator.clipboard.writeText(link)
              toast.success(lang==='fr'?'Lien du profil copié':'Profile link copied')
            }catch{
              toast.info(link)
            }
          }} style={{background:'rgba(255,255,255,.1)',border:'none',borderRadius:10,padding:8,cursor:'pointer',display:'flex'}}>
            <Share2 size={17} color="#fff"/>
          </button>
        </div>
        <div style={{textAlign:'center',padding:'0 24px',position:'relative'}}>
          <div style={{position:'relative',display:'inline-block',marginBottom:12}}>
            <Av code={fl.av} size={84}/>
            {fl.dispo&&<div style={{position:'absolute',bottom:3,right:3,width:18,height:18,borderRadius:9,background:C.brand,border:`3px solid transparent`}}/>}
          </div>
          <h1 style={{fontSize:26,fontWeight:900,color:'#fff',margin:'0 0 3px',fontFamily:'Outfit,sans-serif'}}>{fl.nom}</h1>
          <div style={{fontSize:13,color:C.brand,fontWeight:700,marginBottom:10}}>{fl.title}</div>
          <div style={{display:'flex',justifyContent:'center',gap:10,flexWrap:'wrap',marginBottom:14}}>
            <Stars note={fl.note} sz={13}/>
            <span style={{color:'rgba(255,255,255,.4)',fontSize:12}}>({fl.avis} {lang==='fr'?'avis':'reviews'})</span>
            {fl.verifie&&<Badge type="verified">✓ {lang==='fr'?'Vérifié':'Verified'}</Badge>}
            {fl.badge&&<Badge type={fl.badge}>{fl.badge==='top'?'🔥 Top':'⭐ Pro'}</Badge>}
          </div>
          <div style={{display:'flex',justifyContent:'center',gap:18,fontSize:12,color:'rgba(255,255,255,.4)'}}>
            <span><MapPin size={11} color={C.brand} style={{verticalAlign:'middle'}}/> {country?.flag} {fl.city}</span>
            <span>🎯 {fl.missions} missions</span>
            <span style={{color:fl.dispo?C.brand:'rgba(255,255,255,.3)'}}>{fl.dispo?'● Online':'○ Offline'}</span>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div style={{padding:'0 20px',marginTop:-18,display:'flex',gap:10,marginBottom:18,position:'relative',zIndex:2}}>
        <Btn v="brand" sz="lg" full onClick={contactFl}><MessageSquare size={15}/>{lang==='fr'?'Contacter':'Contact'}</Btn>
        {user.role==='client'&&<Btn v="dark" sz="lg" onClick={()=>toast.success(`${lang==='fr'?'Demande envoyée à':'Request sent to'} ${fl.nom}`)}>
          <Briefcase size={15}/>{lang==='fr'?'Recruter':'Hire'}
        </Btn>}
      </div>

      {/* Stats rapides */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,padding:'0 20px',marginBottom:18}}>
        {[[fl.missions,lang==='fr'?'Missions':'Jobs'],[fl.note+'⭐','Note'],[fl.dispo?(lang==='fr'?'Dispo':'Avail.'):(lang==='fr'?'Occupé':'Busy'),lang==='fr'?'Statut':'Status']].map(([v,l])=>(
          <div key={l} style={{background:C.white,borderRadius:12,padding:14,textAlign:'center',border:`1px solid ${C.border}`}}>
            <div style={{fontSize:18,fontWeight:900,color:C.text,fontFamily:'Outfit,sans-serif'}}>{v}</div>
            <div style={{fontSize:11,color:C.textLt,marginTop:3,fontFamily:'Inter,sans-serif'}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{background:C.white,margin:'0 20px',borderRadius:14,overflow:'hidden',border:`1px solid ${C.border}`,marginBottom:20}}>
        <div style={{display:'flex',borderBottom:`1px solid ${C.border}`}}>
          {[{v:'info',l:lang==='fr'?'À propos':'About'},{v:'portfolio',l:'Portfolio'},{v:'services',l:lang==='fr'?'Services':'Services'},{v:'skills',l:lang==='fr'?'Compétences':'Skills'},{v:'avis',l:lang==='fr'?'Avis':'Reviews'}].map(o=>(
            <button key={o.v} onClick={()=>setTab(o.v)} style={{flex:1,padding:'13px 0',border:'none',background:'none',fontSize:13,fontWeight:700,cursor:'pointer',
              color:tab===o.v?C.brand:C.textMid,borderBottom:`3px solid ${tab===o.v?C.brand:'transparent'}`,transition:'all .2s'}}>
              {o.l}
            </button>
          ))}
        </div>
        <div style={{padding:20}}>
          {tab==='info'&&<div>
            <p style={{fontSize:13,color:C.textMid,lineHeight:1.8,marginBottom:18,fontFamily:'Inter,sans-serif'}}>{fl.bio}</p>
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:10,marginBottom:18}}>
              {[
                [lang==='fr'?'Réponse':'Reply',lang==='fr'?'Moins de 2h':'Under 2h'],
                [lang==='fr'?'Statut':'Status',fl.dispo?(lang==='fr'?'Disponible':'Available'):(lang==='fr'?'Occupé':'Busy')],
                [lang==='fr'?'Zone':'Area',`${country?.flag||''} ${fl.city}`],
              ].map(([l,v])=>(
                <div key={l} style={{background:C.bg,borderRadius:10,padding:12,border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:10,color:C.textLt,fontFamily:'Inter,sans-serif'}}>{l}</div>
                  <div style={{fontSize:13,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif',marginTop:3}}>{v}</div>
                </div>
              ))}
            </div>
            {fl.education?.length>0&&<>
              <div style={{fontWeight:700,fontSize:13,color:C.text,marginBottom:10,fontFamily:'Outfit,sans-serif'}}>🎓 {lang==='fr'?'Formation':'Education'}</div>
              {fl.education.map((e,i)=>(
                <div key={i} style={{background:C.bg,borderRadius:10,padding:12,marginBottom:8,border:`1px solid ${C.border}`}}>
                  <div style={{fontWeight:600,fontSize:13,color:C.text,fontFamily:'Inter,sans-serif'}}>{e.school}</div>
                  <div style={{fontSize:12,color:C.textMid,marginTop:2}}>{e.degree} · {e.year}</div>
                </div>
              ))}
            </>}
            {fl.work?.length>0&&<>
              <div style={{fontWeight:700,fontSize:13,color:C.text,margin:'14px 0 10px',fontFamily:'Outfit,sans-serif'}}>💼 {lang==='fr'?'Expérience':'Experience'}</div>
              {fl.work.map((w,i)=>(
                <div key={i} style={{background:C.bg,borderRadius:10,padding:12,marginBottom:8,border:`1px solid ${C.border}`}}>
                  <div style={{fontWeight:600,fontSize:13,color:C.text,fontFamily:'Inter,sans-serif'}}>{w.company}</div>
                  <div style={{fontSize:12,color:C.textMid,marginTop:2}}>{w.role} · {w.period}</div>
                </div>
              ))}
            </>}
          </div>}
          {tab==='portfolio'&&<div style={{display:'grid',gap:10}}>
            <div style={{background:C.brandLt,border:`1px solid ${C.brand}30`,borderRadius:12,padding:14}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10}}>
                <div>
                  <div style={{fontSize:11,color:C.brand,fontWeight:800,fontFamily:'Inter,sans-serif',textTransform:'uppercase'}}>
                    {lang==='fr'?'Score de confiance IA':'AI trust score'}
                  </div>
                  <div style={{fontSize:14,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif',marginTop:3}}>
                    {lang==='fr'?'Score de confiance local':'Local trust score'}
                  </div>
                </div>
                <div style={{fontSize:24,fontWeight:900,color:C.brand,fontFamily:'Outfit,sans-serif'}}>{trustScore}%</div>
              </div>
              <p style={{fontSize:12,color:C.textMid,lineHeight:1.6,margin:'8px 0 0',fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Base sur les avis, la verification, la disponibilite, le quartier et les preuves du profil.':'Based on reviews, verification, availability, district and profile proof.'}
              </p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:10}}>
              {mediaProofs.map((m,i)=>(
                <div key={i} style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,overflow:'hidden'}}>
                  <div style={{height:92,background:i===0?C.safranLt:i===1?C.indigoLt:C.voisinLt,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28}}>
                    {m.kind==='video'?'▶':'▧'}
                  </div>
                  <div style={{padding:12}}>
                    <div style={{fontSize:13,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif'}}>{m.title}</div>
                    <div style={{fontSize:11,color:C.textLt,marginTop:4,fontFamily:'Inter,sans-serif'}}>{m.meta}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gap:8}}>
              <div style={{fontSize:12,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif'}}>
                {lang==='fr'?'Documents & preuves':'Documents & proof'}
              </div>
              {documentProofs.map((d,i)=>(
                <div key={i} style={{display:'flex',gap:10,alignItems:'center',background:C.bg,borderRadius:10,padding:12,border:`1px solid ${C.border}`}}>
                  <div style={{width:34,height:34,borderRadius:9,background:C.white,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>▣</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:'Inter,sans-serif'}}>{d.title}</div>
                    <div style={{fontSize:11,color:C.textLt,marginTop:2,fontFamily:'Inter,sans-serif'}}>{d.type} · {d.meta}</div>
                  </div>
                  <Badge type="verified" sm>{lang==='fr'?'Visible':'Visible'}</Badge>
                </div>
              ))}
            </div>
            {portfolio.map((p,i)=>(
              <div key={i} style={{background:C.bg,borderRadius:12,padding:14,border:`1px solid ${C.border}`}}>
                <div style={{display:'flex',justifyContent:'space-between',gap:10,marginBottom:8}}>
                  <div>
                    <div style={{fontSize:11,color:C.safranDk,fontWeight:800,fontFamily:'Inter,sans-serif',textTransform:'uppercase'}}>{p.type}</div>
                    <div style={{fontSize:14,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif',marginTop:3}}>{p.title}</div>
                  </div>
                  <Badge type={fl.verifie?'verified':'default'} sm>{p.tag}</Badge>
                </div>
                <p style={{fontSize:13,color:C.textMid,lineHeight:1.7,margin:0,fontFamily:'Inter,sans-serif'}}>{p.desc}</p>
              </div>
            ))}
          </div>}
          {tab==='services'&&<div style={{display:'grid',gap:10}}>
            {services.map((s,i)=>(
              <div key={i} style={{background:C.bg,borderRadius:12,padding:14,border:`1px solid ${C.border}`}}>
                <div style={{display:'flex',justifyContent:'space-between',gap:10,alignItems:'flex-start'}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif'}}>{s.name}</div>
                    <p style={{fontSize:13,color:C.textMid,lineHeight:1.6,margin:'6px 0 0',fontFamily:'Inter,sans-serif'}}>{s.desc}</p>
                  </div>
                  <Badge type="ouverte" sm>{s.delay}</Badge>
                </div>
              </div>
            ))}
            <div style={{background:C.brandLt,border:`1px solid ${C.brand}30`,borderRadius:12,padding:14,fontSize:12,color:C.textMid,lineHeight:1.6,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Conseil client : envoyez un message clair avec besoin, lieu, délai et budget indicatif pour obtenir une réponse rapide.':'Client tip: send a clear message with need, location, timing and indicative budget for a faster reply.'}
            </div>
          </div>}
          {tab==='skills'&&<div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {fl.skills.map(s=>(
              <span key={s} style={{padding:'8px 16px',borderRadius:20,background:C.brandLt,color:C.brand,fontSize:13,fontWeight:700,border:`1.5px solid ${C.brand}33`,fontFamily:'Inter,sans-serif'}}>{s}</span>
            ))}
          </div>}
          {tab==='avis'&&<div>
            {fl.reviews?.map((r,i)=>(
              <div key={i} style={{background:C.bg,borderRadius:12,padding:14,marginBottom:10,border:`1px solid ${C.border}`}}>
                <div style={{display:'flex',gap:10,marginBottom:8,alignItems:'center'}}>
                  <Av code={r.av} size={34}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,fontFamily:'Inter,sans-serif'}}>{r.auteur}</div>
                    <Stars note={r.note} sz={11}/>
                  </div>
                  <div style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif'}}>{r.date}</div>
                </div>
                <p style={{fontSize:13,color:C.textMid,lineHeight:1.6,margin:0,fontFamily:'Inter,sans-serif'}}>{r.text}</p>
              </div>
            ))||<div style={{textAlign:'center',padding:30,color:C.textLt,fontFamily:'Inter,sans-serif',fontSize:13}}>{lang==='fr'?'Aucun avis pour le moment':'No reviews yet'}</div>}
          </div>}
        </div>
      </div>
      <div style={{height:isMobile?72:24}}/>
    </div>
  )
}

// ══════════════════════════════════════════════════
// MISSION DETAIL
// ══════════════════════════════════════════════════
const MissionDetail=({m,onBack,lang,user,data,setData,addLog})=>{
  const t=T[lang]
  if(!m)return null
  const client=m.client||{nom:'Client',av:'CL',note:0}
  const country=AFRICA.find(a=>a.code===m.country)
  const cat=CATS.find(c=>c.id===m.catId)
  const[showApply,setShowApply]=useState(false)
  const[delai,setDelai]=useState(''),[lettre,setLettre]=useState('')
  const sent=data.proposals?.some(p=>p.missionId===m.id)
  const isMobile=useIsMobile()
  const deadlineStr=m.deadline?new Date(m.deadline).toLocaleDateString(lang==='fr'?'fr-FR':'en-US'):'—'

  const apply=()=>{
    if(!delai||!lettre){toast.error(lang==='fr'?'Remplissez tous les champs':'Fill all fields');return}
    const p={id:Date.now(),missionId:m.id,delai,lettre,statut:'en_attente',date:lang==='fr'?"À l'instant":'Just now'}
    setData(d=>({...d,proposals:[...(d.proposals||[]),p]}))
    addLog('action',`Proposition envoyée: ${m.titreF||m.titre}`,`Proposal sent: ${m.titre}`,user.nom,{missionId:m.id})
    toast.success(lang==='fr'?'✅ Proposition envoyée !':'✅ Proposal sent!')
    setShowApply(false)
  }

  return(
    <div style={{height:'100%',overflowY:'auto',background:C.bg}}>
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:'0 20px',height:60,
        display:'flex',alignItems:'center',gap:12,flexShrink:0,position:'sticky',top:0,zIndex:40}}>
        <button onClick={onBack} style={{width:34,height:34,borderRadius:9,background:C.bg,border:`1px solid ${C.border}`,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <ChevronLeft size={17} color={C.textMid}/>
        </button>
        <h1 style={{flex:1,fontSize:17,fontWeight:700,color:C.text,margin:0,fontFamily:'Outfit,sans-serif'}}>Mission</h1>
        {m.urgent&&<Badge type="urgent">🔥 Urgent</Badge>}
      </div>
      <div style={{padding:'20px',maxWidth:800,margin:'0 auto'}}>
        <div style={{background:C.white,borderRadius:20,padding:22,border:`2px solid ${C.border}`,marginBottom:14}}>
          <div style={{display:'flex',gap:6,marginBottom:12,flexWrap:'wrap'}}>
            <span style={{background:C.bg,border:`1px solid ${C.border}`,color:C.textMid,padding:'4px 12px',borderRadius:20,fontSize:12,fontWeight:600,fontFamily:'Inter,sans-serif'}}>
              {cat?.emoji} {lang==='fr'?cat?.fr:cat?.en}
            </span>
            <Badge type="ouverte">{lang==='fr'?'Ouverte':'Open'}</Badge>
          </div>
          <h2 style={{fontSize:22,fontWeight:900,color:C.text,margin:'0 0 14px',fontFamily:'Outfit,sans-serif',lineHeight:1.3}}>
            {lang==='fr'?m.titreF||m.titre:m.titre}
          </h2>
          <p style={{fontSize:14,color:C.textMid,lineHeight:1.8,marginBottom:20,fontFamily:'Inter,sans-serif'}}>{m.desc}</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {[
              {icon:Calendar,  l:t.deadline,v:deadlineStr,c:C.teal},
              {icon:MapPin,    l:lang==='fr'?'Lieu':'Location',v:`${country?.flag} ${m.city}`,c:C.indigo},
              {icon:Users,     l:lang==='fr'?'Propositions':'Proposals',v:`${m.props} reçue${m.props>1?'s':''}`,c:C.warning},
            ].map((s,i)=>(
              <div key={i} style={{background:C.bg,borderRadius:10,padding:12,display:'flex',gap:10,alignItems:'center',border:`1px solid ${C.border}`}}>
                <div style={{width:32,height:32,borderRadius:8,background:s.c+'18',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><s.icon size={15} color={s.c}/></div>
                <div><div style={{fontSize:10,color:C.textLt,marginBottom:1,fontFamily:'Inter,sans-serif'}}>{s.l}</div>
                  <div style={{fontSize:12,fontWeight:700,color:C.text,fontFamily:'Outfit,sans-serif'}}>{s.v}</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Client */}
        <div style={{background:C.white,borderRadius:14,padding:14,border:`1px solid ${C.border}`,marginBottom:14,display:'flex',gap:12,alignItems:'center'}}>
          <Av code={client.av} size={46}/>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:13,color:C.text,fontFamily:'Outfit,sans-serif'}}>{client.nom}</div>
            <Stars note={client.note} sz={11}/>
          </div>
          <div style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif'}}>{m.postedAt}</div>
        </div>

        {user.role==='freelancer'&&(
          sent
            ?<div style={{background:C.brandLt,border:`2px solid ${C.brand}`,borderRadius:14,padding:16,textAlign:'center'}}>
              <div style={{fontSize:24,marginBottom:4}}>✅</div>
              <div style={{fontWeight:700,color:C.brand,fontSize:14,fontFamily:'Outfit,sans-serif'}}>{lang==='fr'?'Proposition déjà envoyée':'Proposal already sent'}</div>
            </div>
            :<Btn v="brand" sz="xl" full onClick={()=>setShowApply(true)}><Send size={15}/>{lang==='fr'?'Envoyer une proposition':'Send a proposal'}</Btn>
        )}
      </div>

      <Modal open={showApply} onClose={()=>setShowApply(false)} title={lang==='fr'?'Ma proposition':'My proposal'} wide>
        <Inp label={lang==='fr'?'Délai de livraison':'Delivery time'} value={delai} onChange={e=>setDelai(e.target.value)} placeholder={lang==='fr'?'Ex: 7 jours':'e.g. 7 days'} req/>
        <Inp label={lang==='fr'?'Lettre de motivation':'Cover letter'} value={lettre} onChange={e=>setLettre(e.target.value)}
          placeholder={lang==='fr'?'Pourquoi êtes-vous le bon choix ?':'Why are you the right choice?'} rows={5} req/>
        <Btn v="brand" sz="lg" full onClick={apply}><Send size={14}/>{lang==='fr'?'Envoyer':'Send'}</Btn>
      </Modal>
      <div style={{height:isMobile?72:24}}/>
    </div>
  )
}

const MesMissionsScreen=({onBack,user,data,lang})=>{
  const isFL=user.role==='freelancer'
  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
      <PgHdr title={lang==='fr'?isFL?'Mes propositions':'Mes missions':isFL?'My proposals':'My jobs'} onBack={onBack||undefined}/>
      <div style={{flex:1,overflowY:'auto',padding:'12px 24px',maxWidth:800,margin:'0 auto',width:'100%'}}>
        {isFL
          ?(data.proposals?.length===0
            ?<div style={{textAlign:'center',padding:60,color:C.textMid,fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'Aucune proposition envoyée':'No proposals sent'}</div>
            :data.proposals.map(p=>{
                const m=[...data.missions,...MISSIONS].find(ms=>ms.id===p.missionId)
                if(!m)return null
                return(
                  <div key={p.id} style={{background:'#fff',borderRadius:14,padding:16,marginBottom:10,border:`1.5px solid ${C.border}`}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                      <div style={{fontWeight:700,fontSize:14,color:C.text,fontFamily:'Outfit,sans-serif',flex:1,marginRight:10}}>{lang==='fr'?m.titreF||m.titre:m.titre}</div>
                      <Badge type={p.statut}/>
                    </div>
                    <div style={{display:'flex',gap:14,fontSize:12,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                      <span>⏱ {p.delai}</span><span>{p.date}</span>
                    </div>
                  </div>
                )
              })
          )
          :(data.myJobs.length===0
            ?<div style={{textAlign:'center',padding:60,color:C.textMid,fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'Aucune mission publiée':'No jobs posted'}</div>
            :data.myJobs.map(j=>(
                <div key={j.id} style={{background:C.white,borderRadius:14,padding:16,marginBottom:10,border:`1.5px solid ${C.border}`,display:'flex',gap:12,alignItems:'center'}}>
                  <div style={{width:42,height:42,borderRadius:10,background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{j.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.text,fontFamily:'Outfit,sans-serif'}}>{j.title}</div>
                    <div style={{fontSize:11,color:C.textMid,marginTop:2,fontFamily:'Inter,sans-serif'}}>{j.date}</div>
                  </div>
                  <Badge type={j.status}/>
                </div>
              ))
          )
        }
        <div style={{height:72}}/>
      </div>
    </div>
  )
}

const EditProfilScreen=({onBack,user,setUser,lang})=>{
  const t=T[lang]
  const isFL=user.role==='freelancer'
  const[tab,setTab]=useState('info')
  const[form,setForm]=useState({
    nom:user.nom||'',
    tel:user.tel||'',
    country:user.country||'CI',
    bio:user.bio||'',
    title:user.title||'',
    city:user.city||'',
    district:user.district||'',
    address:user.address||'',
    idType:user.idType||'',
    idNumber:user.idNumber||'',
    skills:(user.skills||[]).join(', '),
  })
  const[portfolioLinks,setPortfolioLinks]=useState(['',''])
  const[docs,setDocs]=useState({diploma:null,certif:null,work:null})

  const scoreFields=[form.nom,form.tel,form.bio,form.title,form.city,form.skills]
  const pct=Math.round(scoreFields.filter(f=>f&&f.trim().length>0).length/scoreFields.length*100)

  const save=()=>{
    const skills=form.skills.split(',').map(s=>s.trim()).filter(Boolean)
    setUser(u=>({...u,...form,skills}))
    toast.success(lang==='fr'?'Profil mis à jour !':'Profile updated!')
    onBack()
  }

  if(!isFL){
    const cities=AFRICA.find(a=>a.code===form.country)?.cities||[]
    const districts=cities.find(c=>c.name===form.city)?.d||[]
    const clientFields=[form.nom,form.tel,form.country,form.city,form.address,form.idType,form.idNumber]
    const clientPct=Math.round(clientFields.filter(Boolean).length/clientFields.length*100)
    const clientReady=Boolean(form.idType&&form.idNumber&&docs.id&&docs.selfie)
    const saveClient=()=>{
      if(!docs.id||!docs.selfie){
        toast.error(lang==='fr'?'Ajoutez votre piece et votre selfie':'Upload your ID and selfie')
        return
      }
      setUser(u=>({...u,...form,verificationStatus:'pending',verificationEta:'24h',verifie:false,idDoc:docs.id,selfieDoc:docs.selfie}))
      toast.success(lang==='fr'?'Profil client envoye pour verification':'Client profile sent for verification')
      onBack()
    }

    return(
      <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
        <PgHdr title={lang==='fr'?'Informations client':'Client details'} onBack={onBack||undefined}/>
        <div style={{flex:1,overflowY:'auto',padding:'16px 20px',maxWidth:640,margin:'0 auto',width:'100%'}}>
          <div style={{background:C.white,borderRadius:16,padding:'16px 20px',marginBottom:14,border:`1px solid ${C.border}`}}>
            <div style={{display:'flex',gap:14,alignItems:'center'}}>
              <Av code={user.initials} size={64}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:15,color:C.text,fontFamily:'Outfit,sans-serif'}}>{user.nom}</div>
                <div style={{fontSize:12,fontWeight:600,color:clientPct===100?C.brand:clientPct>=60?C.warning:C.danger,marginTop:4}}>
                  {lang==='fr'?`Profil client complete a ${clientPct}%`:`Client profile ${clientPct}% complete`}
                </div>
                <div style={{height:7,background:C.bg,borderRadius:4,overflow:'hidden',marginTop:8,border:`1px solid ${C.border}`}}>
                  <div style={{height:'100%',width:`${clientPct}%`,borderRadius:4,background:clientPct===100?C.brand:clientPct>=60?C.warning:C.danger}}/>
                </div>
              </div>
            </div>
          </div>

          <div style={{background:C.white,borderRadius:14,padding:'16px 18px',marginBottom:10,border:`1px solid ${C.border}`}}>
            <div style={{fontSize:10,fontWeight:700,color:C.textLt,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:14,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Identite':'Identity'}
            </div>
            <Inp label={lang==='fr'?'Nom complet':'Full name'} value={form.nom}
              onChange={e=>setForm(f=>({...f,nom:e.target.value.replace(/[^a-zA-ZÀ-ÿ\s\-']/g,'')}))}
              placeholder={lang==='fr'?'Votre nom complet':'Your full name'} req/>
            <Inp label={lang==='fr'?'Telephone':'Phone'} value={form.tel}
              onChange={e=>setForm(f=>({...f,tel:e.target.value.replace(/[^0-9+\s\-]/g,'')}))}
              placeholder="+225 XX XX XX XX" req/>
            <Sel label={lang==='fr'?'Type de piece':'Document type'} value={form.idType}
              onChange={e=>setForm(f=>({...f,idType:e.target.value}))}
              options={[
                {v:'',l:lang==='fr'?'Choisir':'Choose'},
                {v:'Carte nationale',l:lang==='fr'?'Carte nationale':'National ID'},
                {v:'Passeport',l:lang==='fr'?'Passeport':'Passport'},
                {v:'Permis de conduire',l:lang==='fr'?'Permis de conduire':'Driver license'},
              ]}/>
            <Inp label={lang==='fr'?'Numero de piece':'Document number'} value={form.idNumber}
              onChange={e=>setForm(f=>({...f,idNumber:e.target.value.toUpperCase()}))}
              placeholder={lang==='fr'?'Ex: CI123456':'e.g. CI123456'}/>
          </div>

          <div style={{background:C.white,borderRadius:14,padding:'16px 18px',marginBottom:10,border:`1px solid ${C.border}`}}>
            <div style={{fontSize:10,fontWeight:700,color:C.textLt,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:14,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Pieces a verifier':'Verification files'}
            </div>
            <div style={{display:'grid',gap:10}}>
              {[
                {key:'id',label:lang==='fr'?'Carte d\'identite / passeport':'ID card / passport',hint:lang==='fr'?'Recto ou document principal':'Front or main document'},
                {key:'selfie',label:lang==='fr'?'Selfie de confirmation':'Confirmation selfie',hint:lang==='fr'?'Visage clairement visible':'Face clearly visible'},
              ].map(item=>(
                <label key={item.key} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,padding:'12px 14px',borderRadius:12,border:`1px solid ${C.border}`,background:C.bg,cursor:'pointer'}}>
                  <div style={{minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:'Inter,sans-serif'}}>{item.label}</div>
                    <div style={{fontSize:11,color:C.textLt,marginTop:3,fontFamily:'Inter,sans-serif'}}>{item.hint}</div>
                  </div>
                  <div style={{fontSize:11,fontWeight:700,color:docs[item.key]?C.brand:C.textLt,fontFamily:'Inter,sans-serif'}}>
                    {docs[item.key]||'+ Upload'}
                  </div>
                  <input type="file" accept="image/*,.pdf" style={{display:'none'}} onChange={e=>{
                    const file=e.target.files?.[0]
                    if(!file)return
                    setDocs(d=>({...d,[item.key]:file.name}))
                    toast.success(`📎 ${file.name} ${lang==='fr'?'ajoute':'added'} ✓`)
                  }}/>
                </label>
              ))}
            </div>
            <div style={{marginTop:12,fontSize:12,color:C.textMid,fontFamily:'Inter,sans-serif',lineHeight:1.6}}>
              {lang==='fr'
                ?'Nous verifions votre compte client apres envoi des pieces, comme pour un prestataire.'
                :'We verify your client account after file submission, just like a freelancer.'}
            </div>
          </div>

          <div style={{background:C.white,borderRadius:14,padding:'16px 18px',marginBottom:16,border:`1px solid ${C.border}`}}>
            <div style={{fontSize:10,fontWeight:700,color:C.textLt,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:14,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Localisation':'Location'}
            </div>
            <Sel label={lang==='fr'?'Pays':'Country'} value={form.country}
              onChange={e=>setForm(f=>({...f,country:e.target.value,city:AFRICA.find(a=>a.code===e.target.value)?.cities[0]?.name||'',district:''}))}
              options={AFRICA.map(a=>({v:a.code,l:`${a.flag} ${lang==='fr'?a.fr:a.en}`}))}/>
            <Sel label={lang==='fr'?'Ville':'City'} value={form.city}
              onChange={e=>setForm(f=>({...f,city:e.target.value,district:''}))}
              options={cities.map(c=>({v:c.name,l:c.name}))}/>
            {districts.length>0&&<Sel label={lang==='fr'?'Quartier':'District'} value={form.district}
              onChange={e=>setForm(f=>({...f,district:e.target.value}))}
              options={[{v:'',l:lang==='fr'?'Choisir un quartier':'Choose a district'},...districts.map(d=>({v:d,l:d}))]}/>}
            <Inp label={lang==='fr'?'Adresse precise':'Full address'} value={form.address}
              onChange={e=>setForm(f=>({...f,address:e.target.value}))}
              placeholder={lang==='fr'?'Rue, repere, immeuble...':'Street, landmark, building...'} rows={3}/>
          </div>

          <Btn v="brand" sz="lg" full onClick={saveClient}><Check size={14}/>{clientReady?t.save:(lang==='fr'?'Verifier et enregistrer':'Verify and save')}</Btn>
          <div style={{height:72}}/>
        </div>
      </div>
    )
  }

  const fakeUpload=(key,filename)=>{
    setDocs(d=>({...d,[key]:filename}))
    toast.success(`📎 ${filename} ${lang==='fr'?'importé':'uploaded'} ✓`)
  }

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
      <PgHdr title={lang==='fr'?'Mon profil':'My Profile'} onBack={onBack||undefined}/>
      <div style={{flex:1,overflowY:'auto',padding:'16px 20px',maxWidth:640,margin:'0 auto',width:'100%'}}>

        {/* Carte completion */}
        <div style={{background:C.white,borderRadius:16,padding:'16px 20px',marginBottom:14,border:`1px solid ${C.border}`}}>
          <div style={{display:'flex',gap:14,alignItems:'center',marginBottom:12}}>
            <div style={{position:'relative',flexShrink:0}}>
              <Av code={user.initials} size={68}/>
              <button onClick={()=>toast.info(lang==='fr'?'Upload photo — bientôt disponible':'Photo upload coming soon')}
                style={{position:'absolute',bottom:0,right:0,width:22,height:22,borderRadius:11,
                  background:C.brand,border:`2px solid ${C.white}`,cursor:'pointer',
                  display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Camera size={10} color="#fff"/>
              </button>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15,color:C.text,fontFamily:'Outfit,sans-serif',marginBottom:2}}>{user.nom}</div>
              <div style={{fontSize:12,fontWeight:600,fontFamily:'Inter,sans-serif',
                color:pct===100?C.brand:pct>=60?C.warning:C.danger}}>
                {pct===100?(lang==='fr'?'✅ Profil complet !':'✅ Profile complete!')
                  :(lang==='fr'?`Profil complété à ${pct}%`:`Profile ${pct}% complete`)}
              </div>
              <div style={{height:7,background:C.bg,borderRadius:4,overflow:'hidden',marginTop:8,border:`1px solid ${C.border}`}}>
                <div style={{height:'100%',width:`${pct}%`,borderRadius:4,transition:'width .5s cubic-bezier(.16,1,.3,1)',
                  background:pct===100?C.brand:pct>=60?C.warning:C.danger}}/>
              </div>
            </div>
          </div>
          {pct<100&&(
            <div style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif',lineHeight:1.5}}>
              💡 {lang==='fr'?'Un profil complet est affiché en priorité dans les résultats de recherche.':'A complete profile is shown first in search results.'}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{display:'flex',background:C.white,borderRadius:12,padding:4,marginBottom:14,border:`1px solid ${C.border}`,gap:4}}>
          {[
            {v:'info',emoji:'👤',fr:'Infos personnelles',en:'Personal Info'},
            {v:'portfolio',emoji:'📂',fr:'Portfolio & Preuves',en:'Portfolio & Proofs'},
          ].map(o=>(
            <button key={o.v} onClick={()=>setTab(o.v)}
              style={{flex:1,padding:'10px 6px',borderRadius:9,border:'none',cursor:'pointer',
                fontWeight:600,fontSize:13,fontFamily:'Inter,sans-serif',transition:'all .2s',
                background:tab===o.v?C.brand:'transparent',
                color:tab===o.v?'#fff':C.textMid}}>
              {o.emoji} {lang==='fr'?o.fr:o.en}
            </button>
          ))}
        </div>

        {/* ── TAB INFOS ── */}
        {tab==='info'&&(
          <>
            <div style={{background:C.white,borderRadius:14,padding:'16px 18px',marginBottom:10,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,fontWeight:700,color:C.textLt,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:14,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Identité':'Identity'}
              </div>
              <Inp label={lang==='fr'?'Nom complet':'Full name'} value={form.nom}
                onChange={e=>setForm(f=>({...f,nom:e.target.value.replace(/[^a-zA-ZÀ-ÿ\s\-']/g,'')}))}
                placeholder={lang==='fr'?'Votre nom complet':'Your full name'}/>
              <Inp label={lang==='fr'?'Téléphone':'Phone'} value={form.tel}
                onChange={e=>setForm(f=>({...f,tel:e.target.value.replace(/[^0-9+\s\-]/g,'')}))}
                placeholder="+225 XX XX XX XX"/>
              <Inp label={lang==='fr'?'Ville':'City'} value={form.city}
                onChange={e=>setForm(f=>({...f,city:e.target.value}))}
                placeholder={lang==='fr'?'Abidjan, Dakar...':'Abidjan, Dakar...'}/>
            </div>
            <div style={{background:C.white,borderRadius:14,padding:'16px 18px',marginBottom:16,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,fontWeight:700,color:C.textLt,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:14,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Profil professionnel':'Professional profile'}
              </div>
              <Inp label={lang==='fr'?'Titre professionnel':'Professional title'} value={form.title}
                onChange={e=>setForm(f=>({...f,title:e.target.value}))}
                placeholder={lang==='fr'?'Ex: Développeur React | Coiffeuse professionnelle':'e.g. React Dev | Professional Hairdresser'}
                hint={lang==='fr'?'C\'est la première chose que les clients voient.':'This is the first thing clients see.'}/>
              <Inp label={lang==='fr'?'Compétences (séparées par virgule)':'Skills (comma-separated)'} value={form.skills}
                onChange={e=>setForm(f=>({...f,skills:e.target.value}))}
                placeholder={lang==='fr'?'React, Design, Couture wax...':'React, Design, Wax tailoring...'}/>
              <Inp label="Bio" value={form.bio}
                onChange={e=>setForm(f=>({...f,bio:e.target.value}))} rows={4}
                placeholder={lang==='fr'?'Décrivez votre expérience et vos réalisations...':'Describe your experience and achievements...'}/>
            </div>
            <Btn v="brand" sz="lg" full onClick={save}><Check size={14}/>{t.save}</Btn>
            <div style={{height:72}}/>
          </>
        )}

        {/* ── TAB PORTFOLIO ── */}
        {tab==='portfolio'&&(
          <>
            {/* Liens */}
            <div style={{background:C.white,borderRadius:14,padding:'16px 18px',marginBottom:10,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,fontWeight:700,color:C.textLt,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:8,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Liens portfolio':'Portfolio links'}
              </div>
              <div style={{fontSize:12,color:C.textMid,marginBottom:12,fontFamily:'Inter,sans-serif',lineHeight:1.5}}>
                {lang==='fr'?'Site web, Behance, GitHub, Instagram, YouTube, TikTok, Dribbble...':'Website, Behance, GitHub, Instagram, YouTube, TikTok, Dribbble...'}
              </div>
              {portfolioLinks.map((link,i)=>(
                <div key={i} style={{display:'flex',gap:8,marginBottom:8,alignItems:'center'}}>
                  <span style={{fontSize:14,flexShrink:0}}>🔗</span>
                  <input value={link} onChange={e=>{const l=[...portfolioLinks];l[i]=e.target.value;setPortfolioLinks(l)}}
                    placeholder="https://..."
                    style={{flex:1,padding:'10px 12px',borderRadius:9,border:`1.5px solid ${C.border}`,
                      fontSize:13,fontFamily:'Inter,sans-serif',outline:'none',color:C.text,background:C.bg}}
                    onFocus={e=>e.target.style.borderColor=C.brand}
                    onBlur={e=>e.target.style.borderColor=C.border}/>
                  {portfolioLinks.length>2&&(
                    <button onClick={()=>setPortfolioLinks(portfolioLinks.filter((_,j)=>j!==i))}
                      style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}>
                      <X size={13} color={C.textLt}/>
                    </button>
                  )}
                </div>
              ))}
              <button onClick={()=>setPortfolioLinks([...portfolioLinks,''])}
                style={{display:'flex',alignItems:'center',gap:6,background:'none',
                  border:`1px dashed ${C.border}`,borderRadius:9,padding:'9px 14px',
                  cursor:'pointer',fontSize:12,color:C.textMid,fontFamily:'Inter,sans-serif',
                  width:'100%',justifyContent:'center',marginTop:4}}>
                <Plus size={12}/>{lang==='fr'?'Ajouter un lien':'Add a link'}
              </button>
            </div>

            {/* Médias */}
            <div style={{background:C.white,borderRadius:14,padding:'16px 18px',marginBottom:10,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,fontWeight:700,color:C.textLt,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:8,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Photos & Vidéos de vos créations':'Photos & Videos of your work'}
              </div>
              <button onClick={()=>toast.info(lang==='fr'?'Upload médias — bientôt disponible':'Media upload — coming soon')}
                style={{width:'100%',border:`2px dashed ${C.border}`,borderRadius:12,padding:'24px 16px',
                  background:C.bg,cursor:'pointer',textAlign:'center',display:'block',boxSizing:'border-box'}}>
                <div style={{fontSize:28,marginBottom:8}}>📷</div>
                <div style={{fontSize:13,fontWeight:600,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                  {lang==='fr'?'Glissez ou cliquez pour importer':'Drag or click to upload'}
                </div>
                <div style={{fontSize:11,color:C.textLt,marginTop:4,fontFamily:'Inter,sans-serif'}}>
                  {lang==='fr'?'Photos, vidéos, PDF — max 10MB':'Photos, videos, PDF — max 10MB'}
                </div>
                <div style={{marginTop:8,fontSize:11,color:C.brand,fontWeight:600,fontFamily:'Inter,sans-serif'}}>✨ Bientôt disponible</div>
              </button>
            </div>

            {/* Documents officiels */}
            <div style={{background:C.white,borderRadius:14,padding:'16px 18px',marginBottom:12,border:`1px solid ${C.border}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                <div style={{fontSize:10,fontWeight:700,color:C.textLt,textTransform:'uppercase',letterSpacing:'.12em',fontFamily:'Inter,sans-serif'}}>
                  {lang==='fr'?'Documents officiels':'Official documents'}
                </div>
                {user.verifie
                  ?<span style={{background:C.brandLt,color:C.brand,fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:10,fontFamily:'Inter,sans-serif'}}>✓ {lang==='fr'?'Vérifié':'Verified'}</span>
                  :<span style={{background:C.warningLt,color:C.warning,fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:10,fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'En attente':'Pending'}</span>
                }
              </div>
              <div style={{fontSize:12,color:C.textMid,marginBottom:12,fontFamily:'Inter,sans-serif',lineHeight:1.5}}>
                {lang==='fr'?'Importez vos preuves de formation et d\'expérience.':'Upload your education and work experience proof.'}
              </div>

              {/* Badge délai vérification */}
              <div style={{background:`${C.indigo}12`,border:`1px solid ${C.indigo}28`,borderRadius:10,
                padding:'10px 14px',marginBottom:14,display:'flex',gap:8,alignItems:'center'}}>
                <Clock size={14} color={C.indigo} style={{flexShrink:0}}/>
                <div style={{fontSize:12,color:C.indigo,fontFamily:'Inter,sans-serif',fontWeight:600}}>
                  {lang==='fr'?'⏱ Délai de vérification : 24 à 48h maximum':'⏱ Verification delay: 24 to 48 hours max'}
                </div>
              </div>

              {[
                {key:'diploma',icon:'🎓',fr:'Diplômes & Attestations de formation',en:'Diplomas & Training certificates',file:'Diplome.pdf'},
                {key:'certif', icon:'🏆',fr:'Certifications professionnelles',en:'Professional certifications',file:'Certification.pdf'},
                {key:'work',   icon:'💼',fr:'Attestations d\'expérience (contrat, lettre entreprise...)',en:'Work experience (contract, company letter...)',file:'Attestation_emploi.pdf'},
              ].map(doc=>(
                <div key={doc.key} style={{border:`1.5px dashed ${docs[doc.key]?C.brand:C.border}`,
                  borderRadius:12,padding:'12px 14px',marginBottom:8,
                  background:docs[doc.key]?C.brandLt:'transparent',transition:'all .2s',
                  display:'flex',alignItems:'center',gap:12}}>
                  <div style={{fontSize:22,flexShrink:0}}>{doc.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:13,color:C.text,fontFamily:'Inter,sans-serif',lineHeight:1.3}}>
                      {lang==='fr'?doc.fr:doc.en}
                    </div>
                    {docs[doc.key]&&<div style={{fontSize:11,color:C.brand,marginTop:3,fontFamily:'Inter,sans-serif'}}>✓ {docs[doc.key]}</div>}
                  </div>
                  {docs[doc.key]
                    ?<button onClick={()=>setDocs(d=>({...d,[doc.key]:null}))}
                       style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex',flexShrink:0}}>
                       <X size={13} color={C.textLt}/>
                     </button>
                    :<button onClick={()=>fakeUpload(doc.key,doc.file)}
                       style={{display:'flex',alignItems:'center',gap:5,padding:'7px 10px',
                         borderRadius:8,background:C.bg,border:`1px solid ${C.border}`,
                         cursor:'pointer',fontSize:12,color:C.textMid,fontFamily:'Inter,sans-serif',flexShrink:0}}>
                       <Upload size={12}/>{lang==='fr'?'Importer':'Upload'}
                     </button>
                  }
                </div>
              ))}
            </div>
            <div style={{height:72}}/>
          </>
        )}
      </div>
    </div>
  )
}



export { FreelancerDetail, MissionDetail, MesMissionsScreen, EditProfilScreen }
