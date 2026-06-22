import { useState, useEffect, useRef } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Inp, Sel, Modal, Av, Stars, Badge, Toggle } from '../../components/ui'
import { toast, useIsMobile, fmt } from '../../utils/utils.jsx'
import { authAPI } from '../../api/client'
import { AFRICA, CATS, SKILLS, QUIZ } from '../../data/mockData'
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
  CheckCircle2, AlertCircle, Building, GraduationCap
} from 'lucide-react'

const AuthLayout=({children,lang,setLang,side})=>{
  const isMobile=useIsMobile()
  return(
    <div style={{height:'100%',display:'flex',overflow:'hidden'}}>
      {/* LEFT — Hero visuel (masqué sur mobile) */}
      {!isMobile&&(
        <div style={{flex:'0 0 48%',background:G.hero,display:'flex',flexDirection:'column',
          justifyContent:'center',padding:'60px 56px',position:'relative',overflow:'hidden'}}>
          {/* BG pattern */}
          <div style={{position:'absolute',inset:0,opacity:.05,
            backgroundImage:`radial-gradient(${C.brand} 1px,transparent 1px)`,
            backgroundSize:'28px 28px'}}/>
          <div style={{position:'absolute',top:'20%',left:'-10%',width:500,height:500,borderRadius:'50%',
            background:`radial-gradient(circle,${C.brand}18,transparent 70%)`,filter:'blur(80px)'}}/>

          {/* Logo */}
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:64}}>
            <div style={{width:36,height:36,borderRadius:10,background:C.safran,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 4px 14px ${C.safran}55`}}>
              <Zap size={20} color="#fff" fill="#fff"/>
            </div>
            <span style={{fontSize:24,fontWeight:800,color:'#fff',fontFamily:'Outfit,sans-serif'}}>
              Easy<span style={{color:C.brand}}>Job</span>
            </span>
          </div>

          {/* Side content */}
          {side||(
            <>
              <h2 style={{fontSize:44,fontWeight:900,color:'#fff',lineHeight:1.1,marginBottom:24,
                fontFamily:'Outfit,sans-serif',letterSpacing:'-1.5px'}}>
                {lang==='fr'?<>Le talent africain,<br/><span style={{color:C.safran}}>à portée de main</span></>
                  :<>African talent,<br/><span style={{color:C.safran}}>at your fingertips</span></>}
              </h2>
              <p style={{fontSize:16,color:'rgba(255,255,255,.5)',lineHeight:1.8,marginBottom:40,fontFamily:'Inter,sans-serif',maxWidth:380}}>
                {lang==='fr'?'50 000+ freelances vérifiés dans 20 pays africains. Mise en relation rapide et sécurisée.'
                  :'50,000+ verified freelancers across 20 African countries. Fast and secure matchmaking.'}
              </p>
              {/* Testimonial */}
              <div style={{background:'rgba(255,255,255,.06)',borderRadius:16,padding:'20px 22px',
                border:'1px solid rgba(255,255,255,.08)',backdropFilter:'blur(10px)',maxWidth:380}}>
                <div style={{display:'flex',gap:12,alignItems:'flex-start',marginBottom:12}}>
                  <Av code="FD" size={44}/>
                  <div>
                    <div style={{fontWeight:700,color:'#fff',fontSize:14,fontFamily:'Outfit,sans-serif'}}>Fatou Diallo</div>
                    <div style={{fontSize:12,color:'rgba(255,255,255,.4)',marginTop:2}}>Designer • Dakar, Sénégal</div>
                    <Stars note={5.0} sz={11}/>
                  </div>
                </div>
                <p style={{fontSize:13,color:'rgba(255,255,255,.65)',lineHeight:1.7,margin:0,fontStyle:'italic',fontFamily:'Inter,sans-serif'}}>
                  {lang==='fr'
                    ?'"EasyJob m\'a permis de doubler mes revenus en 6 mois. Les clients africains ont enfin une plateforme fiable."'
                    :'"EasyJob helped me double my income in 6 months. African clients finally have a reliable platform."'}
                </p>
              </div>
              {/* Country flags */}
              <div style={{display:'flex',gap:8,marginTop:28,flexWrap:'wrap'}}>
                {AFRICA.slice(0,10).map(a=>(
                  <span key={a.code} style={{fontSize:22}}>{a.flag}</span>
                ))}
                <span style={{fontSize:13,color:'rgba(255,255,255,.3)',alignSelf:'center',marginLeft:4}}>+10 pays</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* RIGHT — Formulaire, scrollable, pleine hauteur */}
      <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',background:C.white,position:'relative'}}>
        {/* Top bar */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',
          padding:'20px 32px',flexShrink:0,borderBottom:`1px solid ${C.border}`}}>
          {isMobile&&(
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:28,height:28,borderRadius:8,background:C.safran,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 3px 10px ${C.safran}55`}}>
                <Zap size={15} color="#fff" fill="#fff"/>
              </div>
              <span style={{fontSize:18,fontWeight:800,color:C.nuit,fontFamily:'Outfit,sans-serif'}}>Easy<span style={{color:C.brand}}>Job</span></span>
            </div>
          )}
          {!isMobile&&<div/>}
          <button onClick={()=>setLang(lang==='fr'?'en':'fr')}
            style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:'6px 12px',
              cursor:'pointer',color:C.textMid,fontSize:13,display:'flex',alignItems:'center',gap:6,fontFamily:'Inter,sans-serif'}}>
            <Globe size={13}/>{lang==='fr'?'EN':'FR'}
          </button>
        </div>
        {/* Form content */}
        <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',
          padding:'32px',maxWidth:480,width:'100%',margin:'0 auto',alignSelf:'center'}}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// LOGIN — Upwork-style full screen
// ══════════════════════════════════════════════════
const Login=({onLogin,onRegister,onBack,lang,setLang})=>{
  const t=T[lang]
  const[form,sF]=useState({email:'',pass:''})
  const[role,sR]=useState('client')
  const[show,sS]=useState(false)
  const[loading,sL]=useState(false)
  const sf=(k,v)=>sF(f=>({...f,[k]:v}))

  const go=()=>{
    if(!form.email||!form.pass){toast.error(lang==='fr'?'Remplissez tous les champs':'Fill all fields');return}
    sL(true)
    setTimeout(()=>{
      sL(false)
      onLogin({nom:role==='client'?'Marie Koné':'Awa Traoré',initials:role==='client'?'MK':'AT',
        role,verifie:true,email:form.email,tel:'',
        country:'CI',city:'Abidjan',district:role==='client'?'Cocody':'Cocody'})
    },1000)
  }

  return(
    <AuthLayout lang={lang} setLang={setLang}>
      <div>
        {onBack&&(
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:C.bg,border:`1px solid ${C.border}`,
            borderRadius:20,padding:'6px 14px',cursor:'pointer',color:C.textMid,fontSize:12,fontFamily:'Inter,sans-serif',
            fontWeight:500,marginBottom:24}}>
            <ArrowLeft size={13}/>{lang==='fr'?'Accueil':'Home'}
          </button>
        )}
        <h1 style={{fontSize:32,fontWeight:800,color:C.nuit,margin:'0 0 6px',fontFamily:'Outfit,sans-serif',letterSpacing:'-.5px'}}>
          {lang==='fr'?'Bon retour 👋':'Welcome back 👋'}
        </h1>
        <p style={{fontSize:15,color:C.textMid,margin:'0 0 32px',fontFamily:'Inter,sans-serif'}}>
          {lang==='fr'?'Connectez-vous à votre compte EasyJob.':'Sign in to your EasyJob account.'}
        </p>

        {/* Role toggle — Upwork style */}
        <div style={{display:'flex',background:C.bg,borderRadius:12,padding:4,marginBottom:28,border:`1px solid ${C.border}`}}>
          {[{v:'client',l:`👤 ${lang==='fr'?'Client':'Client'}`},{v:'freelancer',l:`💼 ${lang==='fr'?'Freelance':'Freelancer'}`}].map(r=>(
            <button key={r.v} onClick={()=>sR(r.v)} style={{flex:1,padding:'11px 0',borderRadius:9,border:'none',cursor:'pointer',
              fontWeight:600,fontSize:14,fontFamily:'Inter,sans-serif',transition:'all .2s',
              background:role===r.v?C.white:'transparent',color:role===r.v?C.brand:C.textMid,
              boxShadow:role===r.v?'0 2px 8px rgba(0,0,0,.08)':'none'}}>
              {r.l}
            </button>
          ))}
        </div>

        <Inp label={t.email} type="email" value={form.email} onChange={e=>sf('email',e.target.value)}
          placeholder="vous@email.com" req icon={User}/>
        <div style={{position:'relative'}}>
          <Inp label={t.password} type={show?'text':'password'} value={form.pass} onChange={e=>sf('pass',e.target.value)}
            placeholder="••••••••" req icon={Lock}/>
          <button onClick={()=>sS(s=>!s)} style={{position:'absolute',right:14,top:36,background:'none',border:'none',cursor:'pointer',display:'flex'}}>
            {show?<EyeOff size={16} color={C.textLt}/>:<Eye size={16} color={C.textLt}/>}
          </button>
        </div>
        <div style={{display:'flex',justifyContent:'flex-end',marginTop:-10,marginBottom:24}}>
          <button style={{fontSize:13,color:C.brand,background:'none',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif',fontWeight:500}}>
            {t.forgotPwd}
          </button>
        </div>

        <Btn v="brand" sz="lg" full onClick={go} disabled={loading}>
          {loading?<><RefreshCw size={15} style={{animation:'spin 1s linear infinite'}}/>{lang==='fr'?'Connexion...':'Signing in...'}</>
            :<><LogIn size={15}/>{t.login}</>}
        </Btn>

        <div style={{textAlign:'center',marginTop:24,fontSize:14,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
          {t.noAccount}{' '}
          <button onClick={onRegister} style={{color:C.brand,fontWeight:700,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:14}}>
            {t.register}
          </button>
        </div>

        <div style={{marginTop:28,padding:14,background:C.bg,borderRadius:12,fontSize:12,color:C.textLt,
          textAlign:'center',border:`1px solid ${C.border}`,fontFamily:'Inter,sans-serif'}}>
          💡 {lang==='fr'?'Démo : entrez n\'importe quel email et mot de passe':'Demo: enter any email and password'}
        </div>
      </div>
    </AuthLayout>
  )
}

// ══════════════════════════════════════════════════
// CHOOSE ROLE — Première page d'inscription (Upwork)
// ══════════════════════════════════════════════════
const ChooseRole=({onChoose,onLogin,onBack,lang,setLang})=>{
  const t=T[lang]
  return(
    <AuthLayout lang={lang} setLang={setLang}>
      <div>
        {onBack&&(
          <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,background:C.bg,border:`1px solid ${C.border}`,
            borderRadius:20,padding:'6px 14px',cursor:'pointer',color:C.textMid,fontSize:12,fontFamily:'Inter,sans-serif',
            fontWeight:500,marginBottom:24}}>
            <ArrowLeft size={13}/>{lang==='fr'?'Accueil':'Home'}
          </button>
        )}
        <h1 style={{fontSize:30,fontWeight:800,color:C.nuit,margin:'0 0 6px',fontFamily:'Outfit,sans-serif',letterSpacing:'-.5px'}}>
          {lang==='fr'?'Rejoindre EasyJob':'Join EasyJob'}
        </h1>
        <p style={{fontSize:15,color:C.textMid,margin:'0 0 32px',fontFamily:'Inter,sans-serif'}}>
          {lang==='fr'?'Quel est votre profil ?':'What best describes you?'}
        </p>

        <div style={{display:'flex',flexDirection:'column',gap:14,marginBottom:32}}>
          {[
            {role:'client',   icon:'👤',fr:'Je cherche un freelance',  en:'I need a freelancer',
             descFr:'Publiez vos projets et trouvez les meilleurs talents africains.',
             descEn:'Post your projects and find the best African talent.'},
            {role:'freelancer',icon:'💼',fr:'Je suis freelance',       en:'I am a freelancer',
             descFr:'Vendez vos compétences à des clients dans toute l\'Afrique.',
             descEn:'Sell your skills to clients across Africa.'},
          ].map(r=>(
            <button key={r.role} onClick={()=>onChoose(r.role)}
              style={{display:'flex',alignItems:'center',gap:16,padding:'22px 20px',
                borderRadius:14,border:`2px solid ${C.border}`,background:C.white,cursor:'pointer',
                textAlign:'left',transition:'all .18s',width:'100%'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.brand;e.currentTarget.style.background=C.brandLt}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.white}}>
              <div style={{width:52,height:52,borderRadius:14,background:C.bg,border:`1.5px solid ${C.border}`,
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0}}>
                {r.icon}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:16,color:C.text,marginBottom:4,fontFamily:'Outfit,sans-serif'}}>{lang==='fr'?r.fr:r.en}</div>
                <div style={{fontSize:13,color:C.textMid,lineHeight:1.5,fontFamily:'Inter,sans-serif'}}>{lang==='fr'?r.descFr:r.descEn}</div>
              </div>
              <ArrowRight size={18} color={C.textLt} style={{flexShrink:0}}/>
            </button>
          ))}
        </div>

        <div style={{textAlign:'center',fontSize:14,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
          {t.haveAccount}{' '}
          <button onClick={onLogin} style={{color:C.brand,fontWeight:700,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:14}}>
            {t.login}
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}

// ══════════════════════════════════════════════════
// REGISTER CLIENT — One question per screen (Upwork)
// ══════════════════════════════════════════════════
const RegisterClient=({onLogin,onBack,lang,setLang})=>{
  const t=T[lang]
  const STEPS=5
  const[step,sStep]=useState(1)
  const[form,sForm]=useState({nom:'',email:'',pass:'',country:'CI',city:'Abidjan',district:'',cats:[],cgu:false})
  const[docs,setDocs]=useState({id:null,selfie:null})
  const sf=(k,v)=>sForm(f=>({...f,[k]:v}))
  const selCat=id=>sf('cats',form.cats.includes(id)?form.cats.filter(c=>c!==id):[...form.cats,id])
  const cities=AFRICA.find(a=>a.code===form.country)?.cities||[]
  const districts=cities.find(c=>c.name===form.city)?.d||[]
  const[quizA,sQA]=useState({})
  const[quizR,sQR]=useState(null)

  const checkQuiz=()=>{
    const correct=QUIZ.filter((_,i)=>quizA[i]===QUIZ[i].correct).length
    const score=Math.round(correct/QUIZ.length*100)
    sQR({score,correct,ok:score>=80})
  }

  const uploadClientDoc=(key,file)=>{
    if(!file)return
    setDocs(d=>({...d,[key]:file.name}))
    toast.success(`📎 ${file.name} ${lang==='fr'?'ajoute':'added'} ✓`)
  }

  const done=()=>{
    onLogin({nom:form.nom||'Nouveau Client',initials:(form.nom||'NC').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(),
      role:'client',verifie:false,verificationStatus:'pending',verificationEta:'24h',
      email:form.email,tel:'',country:form.country,city:form.city,district:form.district,
      idDoc:docs.id,selfieDoc:docs.selfie})
  }

  const ProgressBar=()=>(
    <div style={{marginBottom:36}}>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:C.textLt,marginBottom:8,fontFamily:'Inter,sans-serif'}}>
        <span>{t.step} {step} {t.of} {STEPS}</span>
        <span>{Math.round(step/STEPS*100)}%</span>
      </div>
      <div style={{height:4,background:C.bg,borderRadius:2,overflow:'hidden',border:`1px solid ${C.border}`}}>
        <div style={{height:'100%',background:G.safran,borderRadius:2,width:`${step/STEPS*100}%`,transition:'width .4s cubic-bezier(.16,1,.3,1)'}}/>
      </div>
    </div>
  )

  return(
    <AuthLayout lang={lang} setLang={setLang}>
      <div>
        {step>1&&(
          <button onClick={()=>sStep(s=>s-1)} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',
            cursor:'pointer',color:C.textMid,fontSize:13,fontFamily:'Inter,sans-serif',marginBottom:20,padding:0}}>
            <ChevronLeft size={16}/>{t.back}
          </button>
        )}
        <ProgressBar/>

        {/* STEP 1 */}
        {step===1&&<div className="anim-fadeUp">
          <h1 style={{fontSize:28,fontWeight:800,color:C.nuit,margin:'0 0 6px',fontFamily:'Outfit,sans-serif',letterSpacing:'-.3px'}}>
            {lang==='fr'?'Créer votre compte':'Create your account'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 28px',fontFamily:'Inter,sans-serif',lineHeight:1.6}}>
            {lang==='fr'?'Trouvez les meilleurs freelances africains en quelques minutes.':'Find the best African freelancers in minutes.'}
          </p>
          <Inp label={lang==='fr'?'Nom complet':'Full name'} value={form.nom} onChange={e=>sf('nom',e.target.value.replace(/[^a-zA-ZÀ-ÿ\s\-']/g,''))}
            placeholder={lang==='fr'?'Ex: Marie Koné':'e.g. Marie Koné'} req autoFocus/>
          <Inp label={t.email} type="email" value={form.email} onChange={e=>sf('email',e.target.value)}
            placeholder="vous@email.com" req/>
          <Inp label={t.password} type="password" value={form.pass} onChange={e=>sf('pass',e.target.value)}
            placeholder={lang==='fr'?'Minimum 8 caractères':'Minimum 8 characters'} req
            hint={lang==='fr'?'Lettres, chiffres et symboles recommandés':'Letters, numbers and symbols recommended'}/>
          <Btn v="brand" sz="lg" full onClick={()=>{if(!form.nom||!form.email||!form.pass){toast.error(lang==='fr'?'Champs obligatoires':'Required fields');return}sStep(2)}}>
            {t.next} <ArrowRight size={15}/>
          </Btn>
          <div style={{textAlign:'center',marginTop:20,fontSize:13,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
            {t.haveAccount}{' '}
            <button onClick={onBack} style={{color:C.brand,fontWeight:600,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:13}}>{t.login}</button>
          </div>
        </div>}

        {/* STEP 2 */}
        {step===2&&<div className="anim-fadeUp">
          <h1 style={{fontSize:28,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif',letterSpacing:'-.3px'}}>
            📍 {lang==='fr'?'Où êtes-vous ?':'Where are you?'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 28px',fontFamily:'Inter,sans-serif'}}>
            {lang==='fr'?'Pour trouver des freelances près de chez vous.':'To find freelancers near you.'}
          </p>
          <Sel label={lang==='fr'?'Pays':'Country'} value={form.country}
            onChange={e=>{sf('country',e.target.value);sf('city',AFRICA.find(a=>a.code===e.target.value)?.cities[0]?.name||'');sf('district','')}}
            req options={AFRICA.map(a=>({v:a.code,l:`${a.flag} ${lang==='fr'?a.fr:a.en}`}))}/>
          <Sel label={lang==='fr'?'Ville':'City'} value={form.city}
            onChange={e=>{sf('city',e.target.value);sf('district','')}} req
            options={cities.map(c=>({v:c.name,l:c.name}))}/>
          {districts.length>0&&(
            <Sel label={lang==='fr'?'Quartier (optionnel)':'District (optional)'} value={form.district}
              onChange={e=>sf('district',e.target.value)}
              options={[{v:'',l:lang==='fr'?'Choisir un quartier':'Choose a district'},...districts.map(d=>({v:d,l:d}))]}/>
          )}
          <Btn v="brand" sz="lg" full onClick={()=>sStep(3)}>{t.next} <ArrowRight size={15}/></Btn>
        </div>}

        {/* STEP 3 */}
        {step===3&&<div className="anim-fadeUp">
          <h1 style={{fontSize:28,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif',letterSpacing:'-.3px'}}>
            🎯 {lang==='fr'?'Que cherchez-vous ?':'What are you looking for?'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif'}}>
            {lang==='fr'?'Sélectionnez vos domaines d\'intérêt.':'Select your areas of interest.'}
          </p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:28}}>
            {CATS.map(cat=>(
              <button key={cat.id} onClick={()=>selCat(cat.id)}
                style={{display:'flex',alignItems:'center',gap:10,padding:'13px 14px',borderRadius:12,cursor:'pointer',
                  border:`2px solid ${form.cats.includes(cat.id)?C.brand:C.border}`,
                  background:form.cats.includes(cat.id)?C.brandLt:C.white,transition:'all .15s',textAlign:'left'}}>
                <span style={{fontSize:20}}>{cat.emoji}</span>
                <span style={{fontSize:12,fontWeight:600,color:form.cats.includes(cat.id)?C.brand:C.text,
                  lineHeight:1.3,fontFamily:'Inter,sans-serif',flex:1}}>
                  {lang==='fr'?cat.fr.split(' ').slice(0,2).join(' '):cat.en.split(' ').slice(0,2).join(' ')}
                </span>
                {form.cats.includes(cat.id)&&<Check size={14} color={C.brand}/>}
              </button>
            ))}
          </div>
          <Btn v="brand" sz="lg" full onClick={()=>sStep(4)}>{t.next} <ArrowRight size={15}/></Btn>
        </div>}

        {/* STEP 4 */}
        {step===4&&<div className="anim-fadeUp">
          <h1 style={{fontSize:28,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif',letterSpacing:'-.3px'}}>
            {lang==='fr'?'Dernière étape 🎉':'Last step 🎉'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 28px',fontFamily:'Inter,sans-serif'}}>
            {lang==='fr'?'Acceptez nos conditions pour activer votre compte.':'Accept our terms to activate your account.'}
          </p>
          {/* Summary */}
          <div style={{background:C.bg,borderRadius:14,padding:18,marginBottom:24,border:`1px solid ${C.border}`}}>
            <div style={{fontSize:13,fontWeight:700,color:C.textMid,marginBottom:14,fontFamily:'Outfit,sans-serif',textTransform:'uppercase',letterSpacing:'.05em'}}>
              {lang==='fr'?'Récapitulatif':'Summary'}
            </div>
            {[['👤',lang==='fr'?'Nom':'Name',form.nom],
              ['📧','Email',form.email],
              ['📍',lang==='fr'?'Ville':'City',`${AFRICA.find(a=>a.code===form.country)?.flag||''} ${form.city}`],
              ['🎯',lang==='fr'?'Catégories':'Categories',form.cats.length+' '+((lang==='fr'?'sélectionnée':'selected')+(form.cats.length>1?'s':''))]
            ].map(([ic,l,v])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',
                borderBottom:`1px solid ${C.border}`,fontSize:13}}>
                <span style={{color:C.textLt,fontFamily:'Inter,sans-serif'}}>{ic} {l}</span>
                <span style={{fontWeight:600,color:C.text,fontFamily:'Inter,sans-serif'}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{background:C.white,borderRadius:14,padding:18,marginBottom:24,border:`1px solid ${C.border}`}}>
            <div style={{fontSize:13,fontWeight:700,color:C.textMid,marginBottom:14,fontFamily:'Outfit,sans-serif',textTransform:'uppercase',letterSpacing:'.05em'}}>
              {lang==='fr'?'Pieces a verifier':'Verification files'}
            </div>
            <div style={{display:'grid',gap:10}}>
              {[
                {key:'id',label:lang==='fr'?'Carte d\'identite / passeport':'ID card / passport'},
                {key:'selfie',label:lang==='fr'?'Selfie de confirmation':'Confirmation selfie'},
              ].map(item=>(
                <label key={item.key} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,padding:'12px 14px',borderRadius:12,border:`1px solid ${C.border}`,background:C.bg,cursor:'pointer'}}>
                  <div style={{minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:'Inter,sans-serif'}}>{item.label}</div>
                    <div style={{fontSize:11,color:C.textLt,marginTop:3,fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'Obligatoire pour la verification client':'Required for client verification'}</div>
                  </div>
                  <div style={{fontSize:11,fontWeight:700,color:docs[item.key]?C.brand:C.textLt,fontFamily:'Inter,sans-serif'}}>
                    {docs[item.key]||'+ Upload'}
                  </div>
                  <input type="file" accept="image/*,.pdf" style={{display:'none'}} onChange={e=>uploadClientDoc(item.key,e.target.files?.[0])}/>
                </label>
              ))}
            </div>
            <div style={{marginTop:12,fontSize:12,color:C.textMid,fontFamily:'Inter,sans-serif',lineHeight:1.6}}>
              {lang==='fr'
                ?'Apres envoi des pieces, votre compte client passe en verification sous 24h.'
                :'After file submission, your client account goes to 24h review.'}
            </div>
          </div>
          <label style={{display:'flex',gap:12,alignItems:'flex-start',marginBottom:28,cursor:'pointer'}}>
            <input type="checkbox" checked={form.cgu} onChange={e=>sf('cgu',e.target.checked)} style={{marginTop:2,accentColor:C.brand,width:16,height:16}}/>
            <span style={{fontSize:13,color:C.textMid,lineHeight:1.7,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?<>J'accepte les <span style={{color:C.brand,fontWeight:600}}>Conditions d'utilisation</span> et la <span style={{color:C.brand,fontWeight:600}}>Politique de confidentialité</span> d'EasyJob.</>
                :<>I accept EasyJob's <span style={{color:C.brand,fontWeight:600}}>Terms of Service</span> and <span style={{color:C.brand,fontWeight:600}}>Privacy Policy</span>.</>}
            </span>
          </label>
          <Btn v="brand" sz="lg" full onClick={()=>{if(!form.cgu){toast.error(lang==='fr'?'Acceptez les conditions':'Accept the terms');return}if(!docs.id||!docs.selfie){toast.error(lang==='fr'?'Ajoutez la piece et le selfie':'Add ID and selfie');return}sStep(5)}}>
            {t.next} <ArrowRight size={15}/>
          </Btn>
        </div>}

        {/* STEP 5 — Quiz */}
        {step===5&&<div className="anim-fadeUp">
          {!quizR?<>
            <h1 style={{fontSize:26,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif',letterSpacing:'-.3px'}}>
              📝 {lang==='fr'?'Quiz de la plateforme':'Platform Quiz'}
            </h1>
            <p style={{fontSize:13,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif',lineHeight:1.6}}>
              {lang==='fr'?'Quelques règles importantes à connaître avant de commencer.':'A few important rules to know before you start.'}
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:18,marginBottom:24}}>
              {QUIZ.map((q,i)=>(
                <div key={i} style={{background:C.white,borderRadius:14,padding:16,border:`1px solid ${C.border}`}}>
                  <p style={{fontSize:13,fontWeight:700,color:C.text,margin:'0 0 12px',fontFamily:'Inter,sans-serif',lineHeight:1.5}}>
                    <span style={{color:C.brand,fontWeight:800}}>Q{i+1}/{QUIZ.length}</span> · {q.q[lang]}
                  </p>
                  <div style={{display:'flex',flexDirection:'column',gap:7}}>
                    {q.opts[lang].map((opt,j)=>(
                      <label key={j} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',borderRadius:9,cursor:'pointer',
                        background:quizA[i]===j?C.brandLt:C.bg,
                        border:`1.5px solid ${quizA[i]===j?C.brand:C.border}`,transition:'all .15s'}}>
                        <input type="radio" name={`cq${i}`} checked={quizA[i]===j} onChange={()=>sQA(r=>({...r,[i]:j}))}
                          style={{accentColor:C.brand,flexShrink:0}}/>
                        <span style={{fontSize:12,color:quizA[i]===j?C.brand:C.text,fontFamily:'Inter,sans-serif',fontWeight:quizA[i]===j?600:400}}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Btn v="brand" sz="lg" full onClick={()=>{
              if(Object.keys(quizA).length<QUIZ.length){toast.error(lang==='fr'?`Répondez aux ${QUIZ.length} questions`:`Answer all ${QUIZ.length} questions`);return}
              checkQuiz()
            }}>
              {lang==='fr'?'Valider le quiz':'Submit Quiz'}
            </Btn>
          </>:<>
            <div style={{textAlign:'center',padding:'12px 0 24px'}}>
              <div style={{fontSize:56,marginBottom:12}}>{quizR.ok?'🎉':'😞'}</div>
              <div style={{fontSize:48,fontWeight:900,color:quizR.ok?C.brand:C.danger,fontFamily:'Outfit,sans-serif',letterSpacing:'-2px'}}>{quizR.score}%</div>
              <p style={{fontSize:14,color:C.textMid,margin:'6px 0 0',fontFamily:'Inter,sans-serif'}}>
                {quizR.correct}/{QUIZ.length} {lang==='fr'?'bonnes réponses':'correct answers'}
              </p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:24}}>
              {QUIZ.map((q,i)=>{
                const ok=quizA[i]===q.correct
                return(
                  <div key={i} style={{padding:'10px 14px',borderRadius:10,
                    background:ok?C.brandLt:C.dangerLt,border:`1px solid ${ok?C.brand:C.danger}`}}>
                    <div style={{fontSize:12,fontWeight:700,color:ok?C.brand:C.danger,fontFamily:'Inter,sans-serif',marginBottom:2}}>
                      {ok?'✓':'✗'} Q{i+1} — {q.q[lang]}
                    </div>
                    {!ok&&<div style={{fontSize:11,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                      ✅ {q.opts[lang][q.correct]}
                    </div>}
                  </div>
                )
              })}
            </div>
            {quizR.ok
              ?<Btn v="brand" sz="lg" full onClick={done}>🚀 {lang==='fr'?'Créer mon compte':'Create my account'}</Btn>
              :<div style={{textAlign:'center'}}>
                <p style={{fontSize:13,color:C.danger,marginBottom:16,fontFamily:'Inter,sans-serif'}}>
                  ❌ {lang==='fr'?`Score insuffisant. Il vous faut au moins 80% (${Math.ceil(QUIZ.length*.8)}/${QUIZ.length} bonnes réponses).`:`Score too low. You need at least 80% (${Math.ceil(QUIZ.length*.8)}/${QUIZ.length} correct).`}
                </p>
                <Btn v="outline" sz="md" onClick={()=>{sQR(null);sQA({})}}>
                  <RefreshCw size={14}/>{lang==='fr'?'Recommencer le quiz':'Retry the quiz'}
                </Btn>
              </div>
            }
          </>}
        </div>}
      </div>
    </AuthLayout>
  )
}


// ══════════════════════════════════════════════════
// REGISTER FREELANCER — 8 étapes (Malt + Upwork)
// ══════════════════════════════════════════════════
const RegisterFreelancer=({onLogin,onBack,lang,setLang})=>{
  const t=T[lang]
  const STEPS=8
  const[step,sStep]=useState(1)
  const[form,sForm]=useState({
    nom:'',email:'',pass:'',
    country:'CI',city:'Abidjan',district:'',
    catId:null,title:'',bio:'',xp:'intermediate',
    skills:[],rateH:'',currency:'FCFA',
    education:[{school:'',degree:'',year:''}],
    work:[{company:'',role:'',period:'',current:false}],
    langs:[],
    docs:{id:null,diploma:null,certif:null,photo:null},
    cgu:false,
  })
  const sf=(k,v)=>sForm(f=>({...f,[k]:v}))
  const[skillQ,sSQ]=useState('')
  const[skillSug,sSS]=useState([])
  const[quizA,sQA]=useState({})
  const[quizR,sQR]=useState(null)

  const cities=AFRICA.find(a=>a.code===form.country)?.cities||[]
  const districts=cities.find(c=>c.name===form.city)?.d||[]

  const addSkill=s=>{if(!form.skills.includes(s)&&form.skills.length<15)sf('skills',[...form.skills,s]);sSQ('');sSS([])}
  const rmSkill=s=>sf('skills',form.skills.filter(x=>x!==s))
  const handleSQ=v=>{sSQ(v);sSS(v.length>1?SKILLS.filter(s=>s.toLowerCase().includes(v.toLowerCase())&&!form.skills.includes(s)).slice(0,6):[])}

  const fakeUpload=(key,name)=>{sf('docs',{...form.docs,[key]:{name,done:true}});toast.success(`📎 ${name} ${lang==='fr'?'téléchargé':'uploaded'} ✓`)}

  const checkQuiz=()=>{
    const correct=QUIZ.filter((_,i)=>quizA[i]===QUIZ[i].correct).length
    const score=Math.round(correct/QUIZ.length*100)
    sQR({score,ok:score>=80,correct})
  }

  const done=()=>{
    const nom = form.nom.trim() || 'Nouveau Freelance'
    const initials = nom.split(' ').map(w=>w[0]).filter(Boolean).join('').slice(0,2).toUpperCase() || 'NF'
    toast.success(lang==='fr'?'🎉 Profil freelance créé ! Bienvenue !':'🎉 Freelancer profile created! Welcome!')
    onLogin({
      nom, initials,
      role:'freelancer',
      verifie:false,
      email: form.email,
      tel: '',
      // Données profil pour l'affichage local
      bio: form.bio,
      skills: form.skills,
      catId: form.catId,
      title: form.title,
      xp: form.xp,
      city: form.city,
      country: form.country,
      district: form.district,
      quiz_valide: true,
    })
  }

  const STEP_TITLES=[
    {fr:'Informations de base',en:'Basic Information'},
    {fr:'Localisation',en:'Location'},
    {fr:'Votre domaine',en:'Your domain'},
    {fr:'Titre & Présentation',en:'Title & Bio'},
    {fr:'Compétences & Tarif',en:'Skills & Rate'},
    {fr:'Parcours professionnel',en:'Work history'},
    {fr:'Documents officiels',en:'Official Documents'},
    {fr:'Quiz de la plateforme',en:'Platform Quiz'},
  ]

  const ProgressBar=()=>(
    <div style={{marginBottom:36}}>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:C.textLt,marginBottom:8,fontFamily:'Inter,sans-serif'}}>
        <span style={{fontWeight:600,color:C.textMid}}>{STEP_TITLES[step-1][lang]}</span>
        <span>{step}/{STEPS}</span>
      </div>
      <div style={{height:4,background:C.bg,borderRadius:2,overflow:'hidden',border:`1px solid ${C.border}`,display:'flex',gap:2}}>
        {Array.from({length:STEPS}).map((_,i)=>(
          <div key={i} style={{flex:1,height:'100%',background:i<step?C.brand:C.bg,transition:'background .3s',borderRadius:2}}/>
        ))}
      </div>
    </div>
  )

  const Next=({onClick,label,disabled:dis})=>(
    <Btn v="brand" sz="lg" full disabled={dis} onClick={onClick}>{label||t.next} <ArrowRight size={15}/></Btn>
  )
  const Prev=()=>(
    <button onClick={()=>{sStep(s=>s-1);sQR(null)}} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',
      cursor:'pointer',color:C.textMid,fontSize:13,fontFamily:'Inter,sans-serif',marginBottom:20,padding:0}}>
      <ChevronLeft size={16}/>{t.back}
    </button>
  )

  return(
    <AuthLayout lang={lang} setLang={setLang}
      side={
        <div>
          <h2 style={{fontSize:36,fontWeight:900,color:'#fff',lineHeight:1.1,marginBottom:16,fontFamily:'Outfit,sans-serif',letterSpacing:'-1px'}}>
            {lang==='fr'?<>Lancez votre<br/><span style={{color:C.brand}}>carrière freelance</span></>
              :<>Launch your<br/><span style={{color:C.brand}}>freelance career</span></>}
          </h2>
          <p style={{fontSize:15,color:'rgba(255,255,255,.5)',marginBottom:36,fontFamily:'Inter,sans-serif',lineHeight:1.75}}>
            {lang==='fr'?'Rejoignez 50 000+ freelances qui gagnent leur vie avec EasyJob en Afrique.':'Join 50,000+ freelancers earning with EasyJob across Africa.'}
          </p>
          {/* Steps preview */}
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {STEP_TITLES.map((s,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:28,height:28,borderRadius:14,flexShrink:0,
                  background:i<step?C.brand:i===step-1?'rgba(29,191,115,.3)':'rgba(255,255,255,.07)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  border:i===step-1?`1px solid ${C.brand}`:'none'}}>
                  {i<step?<Check size={13} color="#fff" strokeWidth={3}/>
                    :<span style={{fontSize:11,fontWeight:700,color:i===step-1?C.brand:'rgba(255,255,255,.3)'}}>{i+1}</span>}
                </div>
                <span style={{fontSize:13,color:i<step?'rgba(255,255,255,.7)':i===step-1?'rgba(255,255,255,.9)':'rgba(255,255,255,.3)',
                  fontFamily:'Inter,sans-serif',fontWeight:i===step-1?600:400}}>
                  {lang==='fr'?s.fr:s.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      }>

      <div>
        {step>1&&<Prev/>}
        <ProgressBar/>

        {/* ── STEP 1 : Infos ── */}
        {step===1&&<div className="anim-fadeUp">
          <h1 style={{fontSize:26,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
            💼 {lang==='fr'?'Devenez freelance':'Become a freelancer'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif'}}>
            {lang==='fr'?'Vendez vos compétences partout en Afrique.':'Sell your skills across Africa.'}
          </p>
          <Inp label={lang==='fr'?'Nom complet':'Full name'} value={form.nom} onChange={e=>sf('nom',e.target.value.replace(/[^a-zA-ZÀ-ÿ\s\-']/g,''))} placeholder="Awa Traoré" req autoFocus/>
          <Inp label={t.email} type="email" value={form.email} onChange={e=>sf('email',e.target.value)} placeholder="vous@email.com" req/>
          <Inp label={t.password} type="password" value={form.pass} onChange={e=>sf('pass',e.target.value)} placeholder={lang==='fr'?'Min. 8 caractères':'Min. 8 characters'} req/>
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontSize:13,fontWeight:600,color:C.textMid,marginBottom:10,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Langues parlées':'Spoken languages'}
            </label>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {[{v:'fr',l:'🇫🇷 Français'},{v:'en',l:'🇬🇧 English'},{v:'ar',l:'🇸🇦 العربية'},{v:'pt',l:'🇵🇹 Português'},{v:'sw',l:'🇰🇪 Kiswahili'}].map(lng=>(
                <button key={lng.v} onClick={()=>{const a=form.langs.includes(lng.v)?form.langs.filter(x=>x!==lng.v):[...form.langs,lng.v];sf('langs',a)}}
                  style={{padding:'7px 14px',borderRadius:20,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif',
                    background:form.langs.includes(lng.v)?C.brandLt:'transparent',color:form.langs.includes(lng.v)?C.brand:C.textMid,
                    border:`1.5px solid ${form.langs.includes(lng.v)?C.brand:C.border}`,transition:'all .15s'}}>
                  {lng.l}
                </button>
              ))}
            </div>
          </div>
          <Next onClick={()=>{if(!form.nom||!form.email||!form.pass){toast.error(lang==='fr'?'Champs requis':'Required fields');return}sStep(2)}}/>
          <div style={{textAlign:'center',marginTop:16,fontSize:13,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
            {t.haveAccount}{' '}
            <button onClick={onBack} style={{color:C.brand,fontWeight:600,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:13}}>{t.login}</button>
          </div>
        </div>}

        {/* ── STEP 2 : Localisation ── */}
        {step===2&&<div className="anim-fadeUp">
          <h1 style={{fontSize:26,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
            📍 {lang==='fr'?'Votre localisation':'Your location'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif'}}>
            {lang==='fr'?'Les clients vous trouvent par ville et quartier.':'Clients find you by city and district.'}
          </p>
          <Sel label={lang==='fr'?'Pays':'Country'} value={form.country} req
            onChange={e=>{sf('country',e.target.value);sf('city',AFRICA.find(a=>a.code===e.target.value)?.cities[0]?.name||'');sf('district','')}}
            options={AFRICA.map(a=>({v:a.code,l:`${a.flag} ${lang==='fr'?a.fr:a.en}`}))}/>
          <Sel label={lang==='fr'?'Ville':'City'} value={form.city} req
            onChange={e=>{sf('city',e.target.value);sf('district','')}}
            options={cities.map(c=>({v:c.name,l:c.name}))}/>
          {districts.length>0&&<Sel label={lang==='fr'?'Quartier':'District'} value={form.district}
            onChange={e=>sf('district',e.target.value)}
            options={[{v:'',l:lang==='fr'?'Sélectionner':'Select'},...districts.map(d=>({v:d,l:d}))]}/>}
          <Next onClick={()=>sStep(3)}/>
        </div>}

        {/* ── STEP 3 : Domaine ── */}
        {step===3&&<div className="anim-fadeUp">
          <h1 style={{fontSize:26,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
            🎯 {lang==='fr'?'Votre domaine principal':'Your main domain'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif'}}>
            {lang==='fr'?'Dans quelle catégorie proposez-vous vos services ?':'In which category do you offer your services?'}
          </p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:24}}>
            {CATS.map(cat=>(
              <button key={cat.id} onClick={()=>sf('catId',cat.id)}
                style={{display:'flex',alignItems:'center',gap:10,padding:'14px',borderRadius:12,cursor:'pointer',
                  border:`2px solid ${form.catId===cat.id?C.brand:C.border}`,
                  background:form.catId===cat.id?C.brandLt:C.white,transition:'all .15s',textAlign:'left'}}>
                <span style={{fontSize:24}}>{cat.emoji}</span>
                <span style={{fontSize:12,fontWeight:600,color:form.catId===cat.id?C.brand:C.text,lineHeight:1.3,fontFamily:'Inter,sans-serif',flex:1}}>
                  {lang==='fr'?cat.fr.split('&')[0].trim():cat.en.split('&')[0].trim()}
                </span>
                {form.catId===cat.id&&<Check size={14} color={C.brand}/>}
              </button>
            ))}
          </div>
          <Next onClick={()=>{if(!form.catId){toast.error(lang==='fr'?'Choisissez un domaine':'Choose a domain');return}sStep(4)}}/>
        </div>}

        {/* ── STEP 4 : Titre + Bio ── */}
        {step===4&&<div className="anim-fadeUp">
          <h1 style={{fontSize:26,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
            ✨ {lang==='fr'?'Votre profil professionnel':'Your professional profile'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif'}}>
            {lang==='fr'?'Votre titre et bio sont votre première impression.':'Your title and bio are your first impression.'}
          </p>
          <Inp label={lang==='fr'?'Titre professionnel':'Professional title'} value={form.title}
            onChange={e=>sf('title',e.target.value)} req
            placeholder={lang==='fr'?'Ex: Développeur React Senior | Expert UI/UX':'e.g. Senior React Developer | UI/UX Expert'}
            hint={lang==='fr'?'Court, précis, mémorable.':'Short, precise, memorable.'}/>
          <Inp label={lang==='fr'?'Présentation professionnelle':'Professional bio'} value={form.bio}
            onChange={e=>sf('bio',e.target.value)} rows={5} req
            placeholder={lang==='fr'?'Décrivez votre expérience, vos réalisations, ce qui vous rend unique...':'Describe your experience, achievements, what makes you unique...'}
            hint={`${form.bio.length}/600 chars`}/>
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontSize:13,fontWeight:600,color:C.textMid,marginBottom:10,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Niveau d\'expérience':'Experience level'}
            </label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
              {[{v:'entry',fr:'Débutant',en:'Entry',desc:'< 1 an'},
                {v:'intermediate',fr:'Intermédiaire',en:'Intermediate',desc:'1–3 ans'},
                {v:'expert',fr:'Expert',en:'Expert',desc:'3+ ans'}].map(lv=>(
                <button key={lv.v} onClick={()=>sf('xp',lv.v)} style={{padding:'12px 8px',borderRadius:10,cursor:'pointer',textAlign:'center',
                  border:`2px solid ${form.xp===lv.v?C.brand:C.border}`,background:form.xp===lv.v?C.brandLt:C.white,transition:'all .15s'}}>
                  <div style={{fontWeight:700,fontSize:13,color:form.xp===lv.v?C.brand:C.text,fontFamily:'Inter,sans-serif'}}>{lang==='fr'?lv.fr:lv.en}</div>
                  <div style={{fontSize:11,color:C.textLt,marginTop:2}}>{lv.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <Next onClick={()=>{if(!form.title||!form.bio){toast.error(lang==='fr'?'Titre et bio requis':'Title and bio required');return}sStep(5)}}/>
        </div>}

        {/* ── STEP 5 : Compétences + Tarif ── */}
        {step===5&&<div className="anim-fadeUp">
          <h1 style={{fontSize:26,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
            🛠️ {lang==='fr'?'Compétences & Tarif':'Skills & Rate'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif'}}>
            {lang==='fr'?'Ajoutez vos compétences clés (max 15).':'Add your key skills (max 15).'}
          </p>
          {/* Skills autocomplete */}
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontSize:13,fontWeight:600,color:C.textMid,marginBottom:8,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Compétences *':'Skills *'}
            </label>
            <div style={{position:'relative'}}>
              <input value={skillQ} onChange={e=>handleSQ(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&skillQ.trim())addSkill(skillQ.trim())}}
                placeholder={lang==='fr'?'Taper une compétence, puis Entrée...':'Type a skill, then Enter...'}
                style={{width:'100%',border:`1.5px solid ${C.border}`,borderRadius:10,padding:'13px 16px',
                  fontSize:14,fontFamily:'Inter,sans-serif',outline:'none',transition:'border-color .15s'}}
                onFocus={e=>e.target.style.borderColor=C.brand} onBlur={e=>e.target.style.borderColor=C.border}/>
              {skillSug.length>0&&(
                <div style={{position:'absolute',top:'100%',left:0,right:0,background:C.white,
                  border:`1.5px solid ${C.border}`,borderRadius:10,zIndex:10,boxShadow:'0 8px 24px rgba(0,0,0,.1)',marginTop:4}}>
                  {skillSug.map(s=>(
                    <button key={s} onClick={()=>addSkill(s)} style={{display:'block',width:'100%',padding:'11px 16px',
                      background:'none',border:'none',cursor:'pointer',textAlign:'left',fontSize:14,color:C.text,fontFamily:'Inter,sans-serif'}}
                      onMouseEnter={e=>e.target.style.background=C.bg} onMouseLeave={e=>e.target.style.background='none'}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {form.skills.length>0&&(
              <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:10}}>
                {form.skills.map(s=>(
                  <span key={s} style={{display:'flex',alignItems:'center',gap:6,background:C.brandLt,
                    color:C.brand,padding:'5px 12px',borderRadius:20,fontSize:12,fontWeight:600,fontFamily:'Inter,sans-serif'}}>
                    {s}
                    <button onClick={()=>rmSkill(s)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',padding:0,color:C.brand}}>
                      <X size={12}/>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Tarif */}
          <div style={{background:C.bg,borderRadius:14,padding:16,marginBottom:20,border:`1px solid ${C.border}`}}>
            <label style={{display:'block',fontSize:13,fontWeight:600,color:C.textMid,marginBottom:12,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Taux horaire':'Hourly rate'}
            </label>
            <div style={{display:'flex',gap:8,alignItems:'flex-end'}}>
              <div style={{flex:1}}>
                <Inp label="" value={form.rateH} onChange={e=>sf('rateH',e.target.value.replace(/[^0-9]/g,''))} placeholder={lang==='fr'?'Ex: 15000':'e.g. 15000'}/>
              </div>
              <div style={{display:'flex',gap:6,marginBottom:20,flexShrink:0}}>
                {['FCFA','USD','EUR'].map(cur=>(
                  <button key={cur} onClick={()=>sf('currency',cur)} style={{padding:'8px 12px',borderRadius:8,fontSize:12,fontWeight:700,cursor:'pointer',
                    background:form.currency===cur?C.brand:C.white,color:form.currency===cur?'#fff':C.textMid,
                    border:`1.5px solid ${form.currency===cur?C.brand:C.border}`,fontFamily:'Inter,sans-serif',transition:'all .15s'}}>
                    {cur}
                  </button>
                ))}
              </div>
            </div>
            <div style={{fontSize:12,color:C.textLt,marginTop:-12,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Votre tarif est librement fixé par vous.':'Your rate is freely set by you.'}
            </div>
          </div>
          <Next onClick={()=>{if(form.skills.length<2){toast.error(lang==='fr'?'Minimum 2 compétences':'Min. 2 skills');return}sStep(6)}}/>
        </div>}

        {/* ── STEP 6 : Parcours ── */}
        {step===6&&<div className="anim-fadeUp">
          <h1 style={{fontSize:26,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
            🎓 {lang==='fr'?'Votre parcours':'Your background'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 24px',fontFamily:'Inter,sans-serif'}}>
            {lang==='fr'?'Formation et expériences professionnelles.':'Education and work experience.'}
          </p>
          {/* Formation */}
          <div style={{marginBottom:20}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <label style={{fontSize:13,fontWeight:600,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Formation':'Education'}
              </label>
              <Btn v="ghost" sz="xs" onClick={()=>sf('education',[...form.education,{school:'',degree:'',year:''}])}>
                <Plus size={12}/>{lang==='fr'?'Ajouter':'Add'}
              </Btn>
            </div>
            {form.education.map((e,i)=>(
              <div key={i} style={{background:C.bg,borderRadius:12,padding:14,marginBottom:10,border:`1px solid ${C.border}`,position:'relative'}}>
                {form.education.length>1&&<button onClick={()=>sf('education',form.education.filter((_,j)=>j!==i))}
                  style={{position:'absolute',top:10,right:10,background:'none',border:'none',cursor:'pointer',display:'flex'}}>
                  <Trash2 size={13} color={C.danger}/></button>}
                <Inp label={lang==='fr'?'École / Université':'School / University'} value={e.school}
                  onChange={ev=>{const d=[...form.education];d[i]={...d[i],school:ev.target.value};sf('education',d)}}
                  placeholder={lang==='fr'?'Ex: ESMT Dakar':'e.g. University of Lagos'}/>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  <Inp label={lang==='fr'?'Diplôme':'Degree'} value={e.degree}
                    onChange={ev=>{const d=[...form.education];d[i]={...d[i],degree:ev.target.value};sf('education',d)}}
                    placeholder="Master, BTS, Licence..."/>
                  <Inp label={lang==='fr'?'Année':'Year'} value={e.year}
                    onChange={ev=>{const d=[...form.education];d[i]={...d[i],year:ev.target.value.replace(/[^0-9]/g,'')};sf('education',d)}}
                    placeholder="2020"/>
                </div>
              </div>
            ))}
          </div>
          {/* Expérience */}
          <div style={{marginBottom:24}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <label style={{fontSize:13,fontWeight:600,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Expérience professionnelle':'Work experience'}
              </label>
              <Btn v="ghost" sz="xs" onClick={()=>sf('work',[...form.work,{company:'',role:'',period:'',current:false}])}>
                <Plus size={12}/>{lang==='fr'?'Ajouter':'Add'}
              </Btn>
            </div>
            {form.work.map((w,i)=>(
              <div key={i} style={{background:C.bg,borderRadius:12,padding:14,marginBottom:10,border:`1px solid ${C.border}`,position:'relative'}}>
                {form.work.length>1&&<button onClick={()=>sf('work',form.work.filter((_,j)=>j!==i))}
                  style={{position:'absolute',top:10,right:10,background:'none',border:'none',cursor:'pointer',display:'flex'}}>
                  <Trash2 size={13} color={C.danger}/></button>}
                <Inp label={lang==='fr'?'Entreprise / Client':'Company / Client'} value={w.company}
                  onChange={ev=>{const d=[...form.work];d[i]={...d[i],company:ev.target.value};sf('work',d)}}
                  placeholder="Orange Digital Center, Freelance..."/>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  <Inp label={lang==='fr'?'Poste':'Role'} value={w.role}
                    onChange={ev=>{const d=[...form.work];d[i]={...d[i],role:ev.target.value};sf('work',d)}}
                    placeholder="Lead Developer..."/>
                  <Inp label={lang==='fr'?'Période':'Period'} value={w.period}
                    onChange={ev=>{const d=[...form.work];d[i]={...d[i],period:ev.target.value};sf('work',d)}}
                    placeholder="2020–2023"/>
                </div>
              </div>
            ))}
          </div>
          <Next onClick={()=>sStep(7)}/>
        </div>}

        {/* ── STEP 7 : Documents ── */}
        {step===7&&<div className="anim-fadeUp">
          <h1 style={{fontSize:26,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
            🛡️ {lang==='fr'?'Documents de vérification':'Verification documents'}
          </h1>
          <p style={{fontSize:14,color:C.textMid,margin:'0 0 8px',fontFamily:'Inter,sans-serif',lineHeight:1.6}}>
            {lang==='fr'?'Comme Malt et Upwork, nous vérifions l\'identité de tous les freelances. Vos données sont chiffrées.':'Like Malt and Upwork, we verify all freelancers\' identities. Your data is encrypted.'}
          </p>
          <div style={{background:C.indigoLt,border:'1px solid #C7D2FE',borderRadius:12,padding:12,marginBottom:20,display:'flex',gap:10}}>
            <Shield size={16} color={C.indigo} style={{flexShrink:0,marginTop:1}}/>
            <div style={{fontSize:12,color:'#3730A3',lineHeight:1.6,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Documents jamais partagés. Supprimés si votre candidature est refusée. Conforme RGPD.':'Documents never shared. Deleted if application rejected. GDPR compliant.'}
            </div>
          </div>
          {[
            {key:'id',   icon:'🪪',req:true,  fr:'Pièce d\'identité (CNI ou Passeport)',en:'ID Card or Passport',note:lang==='fr'?'Obligatoire — JPG, PNG, PDF max 5MB':'Required — JPG, PNG, PDF max 5MB'},
            {key:'photo',icon:'🤳',req:true,  fr:'Photo professionnelle (selfie net)',en:'Professional photo (clear selfie)',note:lang==='fr'?'Obligatoire — votre visage clairement visible':'Required — face clearly visible'},
            {key:'diploma',icon:'🎓',req:false,fr:'Diplômes ou certifications',en:'Diplomas or certifications',note:lang==='fr'?'Optionnel — augmente votre crédibilité':'Optional — increases your credibility'},
            {key:'certif',icon:'🏆',req:false,fr:'Certifications professionnelles',en:'Professional certifications',note:lang==='fr'?'Optionnel — Google, Microsoft, Coursera...':'Optional — Google, Microsoft, Coursera...'},
          ].map(doc=>(
            <div key={doc.key} style={{border:`2px dashed ${form.docs[doc.key]?C.brand:C.border}`,borderRadius:14,padding:16,marginBottom:10,
              background:form.docs[doc.key]?C.brandLt:'transparent',transition:'all .2s'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{fontSize:28,flexShrink:0}}>{doc.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14,color:C.text,fontFamily:'Inter,sans-serif'}}>
                    {lang==='fr'?doc.fr:doc.en}{doc.req&&<span style={{color:C.danger}}> *</span>}
                  </div>
                  <div style={{fontSize:11,color:form.docs[doc.key]?C.brand:C.textLt,marginTop:3,fontFamily:'Inter,sans-serif'}}>
                    {form.docs[doc.key]?`✓ ${form.docs[doc.key].name}`:doc.note}
                  </div>
                </div>
                {form.docs[doc.key]
                  ?<Btn v="soft" sz="sm" onClick={()=>sf('docs',{...form.docs,[doc.key]:null})}><X size={12}/></Btn>
                  :<Btn v="outline" sz="sm" onClick={()=>fakeUpload(doc.key,
                    doc.key==='id'?'CNI_recto.jpg':doc.key==='photo'?'Photo_pro.jpg':doc.key==='diploma'?'Diplome.pdf':'Certification.pdf')}>
                    <Upload size={13}/>{lang==='fr'?'Uploader':'Upload'}
                  </Btn>
                }
              </div>
            </div>
          ))}
          <div style={{marginTop:16}}>
            <Next onClick={()=>{
              if(!form.docs.id||!form.docs.photo){toast.error(lang==='fr'?'CNI et photo obligatoires':'ID and photo required');return}
              sStep(8)
            }} label={lang==='fr'?'Continuer vers le quiz':'Continue to quiz'}/>
          </div>
        </div>}

        {/* ── STEP 8 : Quiz 7 questions ── */}
        {step===8&&<div className="anim-fadeUp">
          {!quizR?<>
            <h1 style={{fontSize:26,fontWeight:800,color:C.text,margin:'0 0 6px',fontFamily:'Outfit,sans-serif'}}>
              📝 {lang==='fr'?'Quiz de la plateforme':'Platform Quiz'}
            </h1>
            <p style={{fontSize:14,color:C.textMid,margin:'0 0 6px',fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'7 questions importantes. Score minimum : 80% (5/7 bonnes réponses).':'7 important questions. Minimum score: 80% (5/7 correct).'}
            </p>
            <div style={{display:'flex',gap:6,marginBottom:24,flexWrap:'wrap'}}>
              {['✅ Vérification','⏱ Délais','🤝 Qualité','📋 Règles','🔒 Sécurité','📈 Visibilité','🏆 Excellence'].map((tag,i)=>(
                <span key={i} style={{padding:'3px 10px',borderRadius:20,fontSize:11,fontWeight:600,fontFamily:'Inter,sans-serif',
                  background:C.bg,color:C.textLt,border:`1px solid ${C.border}`}}>{tag}</span>
              ))}
            </div>
            {QUIZ.map((q,i)=>(
              <div key={i} style={{marginBottom:22,padding:16,background:C.bg,borderRadius:14,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:12,fontFamily:'Inter,sans-serif',lineHeight:1.5}}>
                  <span style={{color:C.brand,fontWeight:800}}>Q{i+1}/{QUIZ.length}</span> · {q.q[lang]}
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {q.opts[lang].map((opt,j)=>(
                    <label key={j} style={{display:'flex',gap:10,padding:'10px 14px',borderRadius:10,cursor:'pointer',
                      background:quizA[i]===j?C.brandLt:C.white,
                      border:`1.5px solid ${quizA[i]===j?C.brand:C.border}`,transition:'all .15s'}}>
                      <input type="radio" name={`q${i}`} checked={quizA[i]===j} onChange={()=>sQA(r=>({...r,[i]:j}))}
                        style={{marginTop:1,accentColor:C.brand,flexShrink:0}}/>
                      <span style={{fontSize:13,color:C.text,lineHeight:1.5,fontFamily:'Inter,sans-serif'}}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <label style={{display:'flex',gap:12,alignItems:'flex-start',marginBottom:20,cursor:'pointer'}}>
              <input type="checkbox" checked={form.cgu} onChange={e=>sf('cgu',e.target.checked)} style={{marginTop:2,accentColor:C.brand,width:16,height:16}}/>
              <span style={{fontSize:13,color:C.textMid,lineHeight:1.7,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?<>J'accepte les <span style={{color:C.brand,fontWeight:600}}>CGU</span> et la <span style={{color:C.brand,fontWeight:600}}>Politique de confidentialité</span> d'EasyJob.</>
                  :<>I accept EasyJob's <span style={{color:C.brand,fontWeight:600}}>Terms of Service</span> and <span style={{color:C.brand,fontWeight:600}}>Privacy Policy</span>.</>}
              </span>
            </label>
            <Btn v="brand" sz="lg" full onClick={()=>{
              if(Object.keys(quizA).length<QUIZ.length){toast.error(lang==='fr'?`Répondez aux ${QUIZ.length} questions`:`Answer all ${QUIZ.length} questions`);return}
              if(!form.cgu){toast.error(lang==='fr'?'Acceptez les CGU':'Accept Terms');return}
              checkQuiz()
            }}><CheckCircle2 size={15}/>{lang==='fr'?'Valider mes réponses':'Submit my answers'}</Btn>
          </>
          :<div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{fontSize:64,marginBottom:16}}>{quizR.ok?'🎉':'😞'}</div>
            <div style={{fontSize:52,fontWeight:900,color:quizR.ok?C.brand:C.danger,fontFamily:'Outfit,sans-serif',letterSpacing:'-2px'}}>{quizR.score}%</div>
            <div style={{fontSize:15,color:C.textMid,marginTop:6,fontFamily:'Inter,sans-serif'}}>
              {quizR.correct}/{QUIZ.length} {lang==='fr'?'bonnes réponses':'correct answers'}
            </div>
            {/* Détail par question */}
            <div style={{textAlign:'left',marginTop:20,marginBottom:24}}>
              {QUIZ.map((q,i)=>{
                const ok=quizA[i]===q.correct
                return(
                  <div key={i} style={{display:'flex',gap:10,padding:'8px 0',borderBottom:`1px solid ${C.border}`,alignItems:'flex-start'}}>
                    <div style={{width:20,height:20,borderRadius:10,background:ok?C.brandLt:C.dangerLt,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2}}>
                      {ok?<Check size={11} color={C.brand} strokeWidth={3}/>:<X size={11} color={C.danger} strokeWidth={3}/>}
                    </div>
                    <div>
                      <div style={{fontSize:12,fontWeight:600,color:C.text,fontFamily:'Inter,sans-serif'}}>{q.q[lang]}</div>
                      {!ok&&<div style={{fontSize:11,color:C.brand,marginTop:2,fontFamily:'Inter,sans-serif'}}>✓ {q.opts[lang][q.correct]}</div>}
                    </div>
                  </div>
                )
              })}
            </div>
            {quizR.ok
              ?<Btn v="brand" sz="lg" full onClick={done}>🚀 {lang==='fr'?'Créer mon profil freelance':'Create my freelancer profile'}</Btn>
              :<div>
                <div style={{background:C.dangerLt,border:`1px solid #FECDD3`,borderRadius:12,padding:12,marginBottom:16,fontSize:13,color:C.danger,fontFamily:'Inter,sans-serif',fontWeight:600}}>
                  ❌ {lang==='fr'?`Score insuffisant. Il vous faut au moins 80% (${Math.ceil(QUIZ.length*.8)}/${QUIZ.length} bonnes réponses).`:`Score too low. You need at least 80% (${Math.ceil(QUIZ.length*.8)}/${QUIZ.length} correct).`}
                </div>
                <Btn v="outline" sz="lg" full onClick={()=>{sQA({});sQR(null)}}>
                  <RefreshCw size={14}/>{lang==='fr'?'Recommencer le quiz':'Retry the quiz'}
                </Btn>
              </div>
            }
          </div>}
        </div>}
      </div>
    </AuthLayout>
  )
}


// ══════════════════════════════════════════════════
// SIDEBAR — Desktop 240px (Upwork-style)
// ══════════════════════════════════════════════════

export { AuthLayout, Login, ChooseRole, RegisterClient, RegisterFreelancer }
