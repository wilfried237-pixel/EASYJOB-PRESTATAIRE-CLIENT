import { useState, useEffect, useRef, useCallback } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Inp, Sel, Modal, Av, Stars, Badge, Toggle } from '../../components/ui'
import { toast, useIsMobile, fmt, fmtN } from '../../utils/utils.jsx'
import { missionsAPI, messagesAPI, authAPI } from '../../api/client'
import { FLS, MISSIONS, CATS, AFRICA, SKILLS, QUIZ } from '../../data/mockData'
import { PgHdr } from '../../components/layout'
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

const PostJobScreen=({user,data,setData,lang,setPage,addLog})=>{
  const t=T[lang]
  const[step,sStep]=useState(1)
  const[form,sForm]=useState({catId:null,title:'',desc:'',budgetType:'range',budgetMin:'',budgetMax:'',
    country:'CI',city:'Abidjan',district:'',deadline:'',urgent:false})
  const sf=(k,v)=>sForm(f=>({...f,[k]:v}))
  const cities=AFRICA.find(a=>a.code===form.country)?.cities||[]
  const districts=cities.find(c=>c.name===form.city)?.d||[]
  const isMobile=useIsMobile()

  const publish=()=>{
    const cat=CATS.find(c=>c.id===form.catId)
    const newMission={
      id:Date.now(),titre:form.title,titreF:form.title,desc:form.desc,
      budget:{type:form.budgetType,min:Number(form.budgetMin),max:Number(form.budgetMax||0)},
      catId:form.catId,country:form.country,city:form.city,district:form.district,
      urgent:form.urgent,deadline:form.deadline||new Date(Date.now()+30*86400000).toISOString().split('T')[0],
      props:0,statut:'ouverte',postedAt:'À l\'instant',client:{nom:user.nom,av:user.initials,note:5.0},
    }
    const newJob={id:Date.now()+1,title:form.title,flId:null,status:'ouverte',amount:0,date:"À l'instant",emoji:cat?.emoji||'📋'}
    newJob.missionId = newMission.id
    setData(d=>({...d,missions:[newMission,...d.missions],myJobs:[newJob,...d.myJobs]}))
    addLog('data',`Mission publiée: ${form.title}`,`Job posted: ${form.title}`,user.nom)
    toast.success(lang==='fr'?'✅ Mission publiée !':'✅ Job posted!')
    setPage('home')
  }

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
      <PgHdr title={lang==='fr'?'Publier une mission':'Post a job'} onBack={step>1?()=>sStep(s=>s-1):()=>setPage('home')}/>
      <div style={{flex:1,overflowY:'auto',padding:isMobile?'20px 16px':'28px 40px'}}>
        <div style={{maxWidth:700,margin:'0 auto'}}>
          {/* Progress */}
          <div style={{display:'flex',gap:4,marginBottom:32}}>
            {[1,2,3].map(s=>(
              <div key={s} style={{flex:1,height:4,borderRadius:2,
                background:s<=step?C.brand:C.bg,border:`1px solid ${C.border}`,transition:'background .3s'}}/>
            ))}
          </div>

          {/* STEP 1 — Catégorie */}
          {step===1&&<div className="anim-fadeUp">
            <h2 style={{fontSize:24,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
              {lang==='fr'?'Quelle catégorie ?':'What category?'}
            </h2>
            <p style={{fontSize:14,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Choisissez le domaine de votre mission.':'Choose the domain of your job.'}
            </p>
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr 1fr':'1fr 1fr 1fr',gap:10,marginBottom:24}}>
              {CATS.map(cat=>(
                <button key={cat.id} onClick={()=>sf('catId',cat.id)}
                  style={{display:'flex',alignItems:'center',gap:10,padding:'14px',borderRadius:12,cursor:'pointer',
                    border:`2px solid ${form.catId===cat.id?C.brand:C.border}`,
                    background:form.catId===cat.id?C.brandLt:C.white,transition:'all .15s'}}>
                  <span style={{fontSize:22}}>{cat.emoji}</span>
                  <div style={{textAlign:'left'}}>
                    <div style={{fontSize:12,fontWeight:700,color:form.catId===cat.id?C.brand:C.text,fontFamily:'Inter,sans-serif',lineHeight:1.3}}>
                      {lang==='fr'?cat.fr.split(' ').slice(0,2).join(' '):cat.en.split(' ').slice(0,2).join(' ')}
                    </div>
                    <div style={{fontSize:10,color:C.textLt}}>{cat.count.toLocaleString()}</div>
                  </div>
                  {form.catId===cat.id&&<Check size={14} color={C.brand} style={{marginLeft:'auto',flexShrink:0}}/>}
                </button>
              ))}
            </div>
            <Btn v="brand" sz="lg" full onClick={()=>{if(!form.catId){toast.error(lang==='fr'?'Choisissez une catégorie':'Choose a category');return}sStep(2)}}>
              {t.next} <ArrowRight size={15}/>
            </Btn>
          </div>}

          {/* STEP 2 — Description */}
          {step===2&&<div className="anim-fadeUp">
            <h2 style={{fontSize:24,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
              {lang==='fr'?'Décrivez votre besoin':'Describe your need'}
            </h2>
            <p style={{fontSize:14,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Plus vous êtes précis, plus les propositions seront pertinentes.':'The more precise you are, the more relevant the proposals.'}
            </p>
            <Inp label={lang==='fr'?'Titre de la mission':'Job title'} value={form.title} onChange={e=>sf('title',e.target.value)}
              placeholder={lang==='fr'?'Ex: Créer un site e-commerce responsive':'e.g. Build a responsive e-commerce site'} req/>
            <Inp label={lang==='fr'?'Description détaillée':'Detailed description'} value={form.desc}
              onChange={e=>sf('desc',e.target.value)} rows={5} req
              placeholder={lang==='fr'?'Fonctionnalités requises, contraintes, deadline, livrables attendus...':'Required features, constraints, deadline, expected deliverables...'}/>
            {/* Budget */}
            <div style={{background:C.bg,borderRadius:14,padding:'16px',border:`1px solid ${C.border}`,marginBottom:20}}>
              <label style={{display:'block',fontSize:13,fontWeight:600,color:C.textMid,marginBottom:12,fontFamily:'Inter,sans-serif'}}>{t.budget} *</label>
              <div style={{display:'flex',gap:8,marginBottom:12}}>
                {[{v:'range',fr:'Fourchette',en:'Range'},{v:'fixed',fr:'Fixe',en:'Fixed'}].map(bt=>(
                  <button key={bt.v} onClick={()=>sf('budgetType',bt.v)} style={{flex:1,padding:'9px',borderRadius:8,cursor:'pointer',fontWeight:600,fontSize:13,fontFamily:'Inter,sans-serif',
                    background:form.budgetType===bt.v?C.brand:C.white,color:form.budgetType===bt.v?'#fff':C.textMid,
                    border:`1.5px solid ${form.budgetType===bt.v?C.brand:C.border}`,transition:'all .15s'}}>
                    {lang==='fr'?bt.fr:bt.en}
                  </button>
                ))}
              </div>
              <div style={{display:'grid',gridTemplateColumns:form.budgetType==='range'?'1fr 1fr':'1fr',gap:10}}>
                <Inp label={form.budgetType==='range'?(lang==='fr'?'Budget min':'Min budget'):(lang==='fr'?'Budget fixe':'Fixed budget')} value={form.budgetMin}
                  onChange={e=>sf('budgetMin',e.target.value)} placeholder="150000" suffix="FCFA" req/>
                {form.budgetType==='range'&&<Inp label={lang==='fr'?'Budget max':'Max budget'} value={form.budgetMax}
                  onChange={e=>sf('budgetMax',e.target.value)} placeholder="500000" suffix="FCFA"/>}
              </div>
            </div>
            <Btn v="brand" sz="lg" full onClick={()=>{if(!form.title||!form.desc||!form.budgetMin){toast.error(lang==='fr'?'Remplissez tous les champs requis':'Fill all required fields');return}sStep(3)}}>
              {t.next} <ArrowRight size={15}/>
            </Btn>
          </div>}

          {/* STEP 3 — Localisation + Récap */}
          {step===3&&<div className="anim-fadeUp">
            <h2 style={{fontSize:24,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
              {lang==='fr'?'Localisation & Récapitulatif':'Location & Summary'}
            </h2>
            <p style={{fontSize:14,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Vérifiez et publiez votre mission.':'Review and publish your job.'}
            </p>
            <Sel label={lang==='fr'?'Pays':'Country'} value={form.country} req
              onChange={e=>{sf('country',e.target.value);sf('city',AFRICA.find(a=>a.code===e.target.value)?.cities[0]?.name||'')}}
              options={AFRICA.map(a=>({v:a.code,l:`${a.flag} ${lang==='fr'?a.fr:a.en}`}))}/>
            <Sel label={lang==='fr'?'Ville':'City'} value={form.city} req
              onChange={e=>{sf('city',e.target.value);sf('district','')}}
              options={cities.map(c=>({v:c.name,l:c.name}))}/>
            {/* Urgent toggle */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 16px',
              background:C.bg,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:20}}>
              <div>
                <div style={{fontWeight:600,fontSize:14,color:C.text,fontFamily:'Inter,sans-serif'}}>
                  🔥 {lang==='fr'?'Mission urgente':'Urgent job'}
                </div>
                <div style={{fontSize:12,color:C.textLt,marginTop:2}}>
                  {lang==='fr'?'+50% de visibilité, badge rouge':'+50% visibility, red badge'}
                </div>
              </div>
              <Toggle on={form.urgent} onChange={()=>sf('urgent',!form.urgent)}/>
            </div>
            {/* Récap card */}
            <div style={{background:C.white,borderRadius:14,padding:18,border:`2px solid ${C.brand}`,marginBottom:20}}>
              <div style={{fontSize:12,fontWeight:700,color:C.brand,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:14,fontFamily:'Inter,sans-serif'}}>
                📋 {lang==='fr'?'Récapitulatif':'Summary'}
              </div>
              {[
                ['🏷️',lang==='fr'?'Catégorie':'Category',CATS.find(c=>c.id===form.catId)?.emoji+' '+(lang==='fr'?CATS.find(c=>c.id===form.catId)?.fr:CATS.find(c=>c.id===form.catId)?.en)||''],
                ['📝',lang==='fr'?'Titre':'Title',form.title],
                ['💰',t.budget,form.budgetType==='fixed'?`${fmt(Number(form.budgetMin))}`:`${fmt(Number(form.budgetMin))} – ${fmt(Number(form.budgetMax))}`],
                ['📍',lang==='fr'?'Lieu':'Location',`${AFRICA.find(a=>a.code===form.country)?.flag} ${form.city}`],
              ].map(([ic,l,v])=>(
                <div key={l} style={{display:'flex',gap:10,padding:'8px 0',borderBottom:`1px solid ${C.border}`,fontSize:13}}>
                  <span>{ic}</span>
                  <span style={{color:C.textLt,fontFamily:'Inter,sans-serif',minWidth:80}}>{l}</span>
                  <span style={{fontWeight:600,color:C.text,fontFamily:'Inter,sans-serif',flex:1}}>{v}</span>
                </div>
              ))}
            </div>
            <Btn v="brand" sz="xl" full onClick={publish}><Send size={15}/>{lang==='fr'?'🚀 Publier ma mission':'🚀 Publish my job'}</Btn>
          </div>}
        </div>
        {isMobile&&<div style={{height:72}}/>}
      </div>
    </div>
  )
}


// ══════════════════════════════════════════════════
// PROFIL SCREEN
// ══════════════════════════════════════════════════

export default PostJobScreen
