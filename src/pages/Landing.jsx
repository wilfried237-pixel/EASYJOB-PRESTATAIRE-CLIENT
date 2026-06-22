import { useState, useEffect, useRef } from 'react'
import { C, G, T } from '../utils/tokens'
import { Btn, Inp, Sel, Modal, Av, Stars, Badge, Toggle } from '../components/ui'
import { toast, useIsMobile, fmt } from '../utils/utils.jsx'
import { authAPI } from '../api/client'
import { buildWhatsAppUrl } from '../utils/links'
import { AFRICA, CATS, SKILLS, FLS } from '../data/mockData'
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
  Heart, Map, ThumbsUp
} from 'lucide-react'

// ── Badge "Confirmé par le quartier" ──
const NeighbourhoodBadge=({count,lang,sm})=>(
  <div style={{display:'inline-flex',alignItems:'center',gap:sm?4:5,
    background:C.voisinLt,border:`1px solid ${C.voisin}30`,
    borderRadius:20,padding:sm?'3px 8px':'4px 10px'}}>
    <span style={{fontSize:sm?10:12}}>🏘️</span>
    <span style={{fontSize:sm?10:12,fontWeight:700,color:C.voisin,fontFamily:'Inter,sans-serif'}}>
      {lang==='fr'?`${count} voisin${count>1?'s':''}`:`${count} neighbour${count>1?'s':''}`}
    </span>
  </div>
)

const Landing=({onLogin,onRegister,lang,setLang})=>{
  const t=T[lang], isMobile=useIsMobile()
  const[searchVal,setSearchVal]=useState('')
  const[activeTestimonial,setActiveTestimonial]=useState(0)

  // Rotation témoignages
  useEffect(()=>{
    const id=setInterval(()=>setActiveTestimonial(p=>(p+1)%3),4000)
    return()=>clearInterval(id)
  },[])

  const TESTIMONIALS=[
    {av:'AT',nom:'Awa T.',quartier:'Cocody, Abidjan',txt:lang==='fr'
      ?`Mon plombier de quartier m'a été recommandé par 14 voisins. Intervention en 2h. Je fais confiance au badge.`
      :`My neighbourhood plumber was endorsed by 14 neighbours. Came within 2h. I trust the badge.`,note:5},
    {av:'MC',nom:'Moussa C.',quartier:'Yoff, Dakar',txt:lang==='fr'
      ?`En tant que prestataire, les 3 premiers coups de pouce de mes voisins m'ont suffi pour décrocher mes 20 premiers clients.`
      :`As a provider, the first 3 endorsements from my neighbours were enough to land my first 20 clients.`,note:5},
    {av:'FD',nom:'Fatou D.',quartier:'Ngaliema, Kinshasa',txt:lang==='fr'
      ?`L'esprit du quartier : j'ai diffusé une tâche éclair pour du déménagement, 4 prestataires ont répondu en 10 minutes.`
      :`The neighbourhood spirit: I posted an express task for moving, 4 providers replied in 10 minutes.`,note:5},
  ]

  const FEATURES=[
    {emoji:'🏘️',
     titleFr:'Validation par le quartier',titleEn:'Neighbourhood validation',
     descFr:'Un prestataire n\'est visible qu\'après 3 "coups de pouce" de vrais voisins. Le badge parle pour lui.',
     descEn:'A provider is only visible after 3 endorsements from real neighbours. The badge speaks for itself.'},
    {emoji:'⚡',
     titleFr:'Tâche éclair géolocalisée',titleEn:'Geolocated express task',
     descFr:'Besoin immédiat ? Diffuse ta demande aux prestataires dans un rayon de 2 km. Réponse en minutes.',
     descEn:'Need something now? Broadcast your request to providers within 2 km. Reply in minutes.'},
    {emoji:'🗺️',
     titleFr:'Carte des talents proches',titleEn:'Map of nearby talents',
     descFr:'Chaque épingle sur la carte est un talent validé par ses voisins. Trouve le bon en un coup d\'œil.',
     descEn:'Every pin on the map is a talent endorsed by neighbours. Find the right person at a glance.'},
  ]

  const CATS_DISPLAY=[
    {emoji:'🔧',labelFr:'Plomberie',labelEn:'Plumbing',count:445},
    {emoji:'⚡',labelFr:'Électricité',labelEn:'Electrical',count:388},
    {emoji:'✂️',labelFr:'Coiffure',labelEn:'Hair & Beauty',count:892},
    {emoji:'📚',labelFr:'Cours particuliers',labelEn:'Tutoring',count:847},
    {emoji:'🧹',labelFr:'Ménage',labelEn:'Cleaning',count:612},
    {emoji:'🍳',labelFr:'Cuisine',labelEn:'Catering',count:378},
    {emoji:'📷',labelFr:'Photo & Vidéo',labelEn:'Photo & Video',count:463},
    {emoji:'🚗',labelFr:'Mécanique',labelEn:'Auto Repair',count:521},
  ]

  const PRO_IMAGES=[
    {
      title:lang==='fr'?'Menuisier':'Carpenter',
      desc:lang==='fr'?'Fabrication et montage sur mesure':'Custom fabrication and fitting',
      image:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    },
    {
      title:lang==='fr'?'Plombier':'Plumber',
      desc:lang==='fr'?'Intervention rapide à domicile':'Fast on-site intervention',
      image:'https://images.unsplash.com/photo-1558618666-fbd0e6f3c0f0?auto=format&fit=crop&w=900&q=80',
    },
    {
      title:lang==='fr'?'Électricien':'Electrician',
      desc:lang==='fr'?'Câblage, sécurité, dépannage':'Wiring, safety, repairs',
      image:'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    },
    {
      title:lang==='fr'?'Peintre':'Painter',
      desc:lang==='fr'?'Finitions propres et durables':'Clean, durable finishes',
      image:'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=900&q=80',
    },
  ]

  return(
    <div style={{height:'100%',overflowY:'auto',background:C.sable,
      fontFamily:'Inter,sans-serif'}}>

      {/* ── NAVBAR ── */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,
        background:`${C.nuit}F5`,backdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(255,255,255,.06)',height:64,
        display:'flex',alignItems:'center',padding:'0 32px',gap:16}}>

        {/* Logo */}
        <div style={{flex:1,display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:34,height:34,borderRadius:10,background:G.safran,
            display:'flex',alignItems:'center',justifyContent:'center',
            boxShadow:`0 4px 12px ${C.safran}50`}}>
            <Zap size={18} color="#fff" fill="#fff"/>
          </div>
          <span style={{fontSize:18,fontWeight:800,color:'#fff',
            fontFamily:'Outfit,sans-serif',letterSpacing:'-.2px'}}>
            Easy<span style={{color:C.brand}}>Job</span>
          </span>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <button onClick={()=>setLang(lang==='fr'?'en':'fr')}
            style={{background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.12)',
              borderRadius:8,padding:'6px 12px',cursor:'pointer',color:'rgba(255,255,255,.6)',
              fontSize:12,display:'flex',alignItems:'center',gap:5,fontFamily:'Inter,sans-serif',fontWeight:500}}>
            <Globe size={13}/>{lang==='fr'?'EN':'FR'}
          </button>
          <Btn v="outlineW" sz="sm" onClick={onLogin}>{t.login}</Btn>
          <Btn v="gold" sz="sm" onClick={onRegister}>{t.register}</Btn>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{minHeight:'100vh',background:G.hero,display:'flex',
        paddingTop:64,position:'relative',overflow:'hidden'}}>

        {/* Pattern pointillé sable */}
        <div style={{position:'absolute',inset:0,opacity:.04,
          backgroundImage:`radial-gradient(${C.safran} 1px,transparent 1px)`,
          backgroundSize:'32px 32px',pointerEvents:'none'}}/>

        {/* Glow safran */}
        <div style={{position:'absolute',top:'10%',right:'5%',width:500,height:500,
          borderRadius:'50%',background:`radial-gradient(circle,${C.safran}18,transparent 70%)`,
          filter:'blur(80px)',pointerEvents:'none'}}/>

        {/* Glow vert */}
        <div style={{position:'absolute',bottom:'15%',left:'5%',width:400,height:400,
          borderRadius:'50%',background:`radial-gradient(circle,${C.brand}14,transparent 70%)`,
          filter:'blur(80px)',pointerEvents:'none'}}/>

        <div style={{flex:1,display:'flex',flexDirection:isMobile?'column':'row',
          alignItems:'center',maxWidth:1200,margin:'0 auto',
          padding:isMobile?'40px 24px 60px':'0 60px',gap:isMobile?40:60}}>

          {/* Texte */}
          <div style={{flex:1,zIndex:1}}>
            {/* Eyebrow */}
            <div style={{display:'inline-flex',alignItems:'center',gap:8,
              background:`${C.safran}18`,border:`1px solid ${C.safran}30`,
              borderRadius:20,padding:'6px 14px',marginBottom:24}}>
              <span style={{fontSize:13}}>🌍</span>
              <span style={{fontSize:12,fontWeight:700,color:C.safran,
                fontFamily:'Inter,sans-serif',letterSpacing:'.04em'}}>
                {lang==='fr'?'Confiance & Voisinage':'Trust & Neighbourhood'}
              </span>
            </div>

            <h1 style={{fontSize:isMobile?36:52,fontWeight:900,color:'#fff',
              margin:'0 0 16px',fontFamily:'Outfit,sans-serif',lineHeight:1.1,letterSpacing:'-.5px'}}>
              {lang==='fr'?(<>Le talent est<br/>
                <span style={{color:C.safran}}>dans ton quartier</span>
              </>):(<>Talent lives<br/>
                <span style={{color:C.safran}}>in your neighbourhood</span>
              </>)}
            </h1>

            <p style={{fontSize:isMobile?15:17,color:'rgba(255,255,255,.55)',
              lineHeight:1.7,margin:'0 0 36px',maxWidth:480,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'
                ?`Trouve des prestataires validés par tes voisins. Plombier, coiffeur, cours particuliers, ménage — contact direct, en confiance.`
                :`Find service providers endorsed by your neighbours. Plumber, hairdresser, tutor, cleaning — direct contact, trusted.`}
            </p>

            {/* Search bar */}
            <div style={{display:'flex',gap:0,marginBottom:20,
              background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.12)',
              borderRadius:14,padding:6,maxWidth:480,backdropFilter:'blur(8px)'}}>
              <div style={{flex:1,display:'flex',alignItems:'center',gap:10,padding:'0 12px'}}>
                <Search size={16} color="rgba(255,255,255,.4)"/>
                <input value={searchVal} onChange={e=>setSearchVal(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&onRegister()}
                  placeholder={t.searchPh}
                  style={{flex:1,background:'transparent',border:'none',outline:'none',
                    fontSize:14,color:'#fff',fontFamily:'Inter,sans-serif'}}/>
              </div>
              <button onClick={onRegister}
                style={{background:G.safran,border:'none',borderRadius:10,padding:'12px 20px',
                  cursor:'pointer',fontSize:13,fontWeight:700,color:'#fff',
                  fontFamily:'Outfit,sans-serif',whiteSpace:'nowrap',
                  display:'flex',alignItems:'center',gap:6}}>
                <MapPin size={14}/>{lang==='fr'?'Chercher':'Search'}
              </button>
            </div>

            {/* CTA */}
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <Btn v="gold" sz="lg" onClick={onRegister}>
                {lang==='fr'?'Je cherche un talent':'Find a talent'}
              </Btn>
              <Btn v="ghostDk" sz="lg" onClick={onRegister}>
                {lang==='fr'?'Je propose mes services':'Offer my services'}
              </Btn>
            </div>

            {/* Mini stats */}
            <div style={{display:'flex',gap:28,marginTop:36,flexWrap:'wrap'}}>
              {[
                {v:'12 400+',l:lang==='fr'?'Talents validés':'Validated talents'},
                {v:'38 000+',l:lang==='fr'?'Coups de pouce':'Endorsements'},
                {v:'20',l:lang==='fr'?'Pays africains':'African countries'},
              ].map((s,i)=>(
                <div key={i}>
                  <div style={{fontSize:22,fontWeight:900,color:'#fff',fontFamily:'Outfit,sans-serif',letterSpacing:'-.3px'}}>{s.v}</div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,.35)',marginTop:2,fontFamily:'Inter,sans-serif'}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Carte-preview flottante */}
          {!isMobile&&(
            <div style={{flex:'0 0 400px',zIndex:1}}>
              <div style={{background:'rgba(255,255,255,.06)',backdropFilter:'blur(20px)',
                border:'1px solid rgba(255,255,255,.1)',borderRadius:24,
                padding:24,boxShadow:`0 40px 80px ${C.nuit}CC`}}>

                {/* Faux fond de carte */}
                <div style={{borderRadius:16,overflow:'hidden',height:220,position:'relative',
                  background:`linear-gradient(135deg,${C.nuitMid},${C.nuitLt})`,marginBottom:16}}>
                  <div style={{position:'absolute',inset:0,opacity:.15,
                    backgroundImage:`linear-gradient(${C.safran}30 1px,transparent 1px),linear-gradient(90deg,${C.safran}30 1px,transparent 1px)`,
                    backgroundSize:'30px 30px'}}/>
                  {/* Épingles simulées */}
                  {[
                    {top:'30%',left:'25%',cat:'🔧',voisins:12,nom:'Moussa C.',color:C.brand},
                    {top:'55%',left:'60%',cat:'✂️',voisins:8, nom:'Aïssata K.',color:C.safran},
                    {top:'20%',left:'70%',cat:'📚',voisins:5, nom:'Yao E.',color:C.terre},
                    {top:'70%',left:'30%',cat:'🍳',voisins:19,nom:'Aminata S.',color:C.brand},
                  ].map((p,i)=>(
                    <div key={i} style={{position:'absolute',top:p.top,left:p.left,
                      display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer'}}>
                      <div style={{width:32,height:32,borderRadius:16,background:p.color,
                        display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,
                        boxShadow:`0 4px 12px ${p.color}66`,
                        animation:i===0?'pulse 2s infinite ease-in-out':undefined}}>
                        {p.cat}
                      </div>
                      <div style={{width:0,height:0,borderLeft:'5px solid transparent',
                        borderRight:'5px solid transparent',borderTop:`6px solid ${p.color}`}}/>
                    </div>
                  ))}
                  {/* Label carte */}
                  <div style={{position:'absolute',top:10,left:10,
                    background:'rgba(26,18,8,.7)',backdropFilter:'blur(8px)',
                    borderRadius:8,padding:'4px 10px',fontSize:11,color:'rgba(255,255,255,.7)',
                    fontFamily:'Inter,sans-serif',fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
                    <MapPin size={10} color={C.safran}/>
                    {lang==='fr'?'Cocody, Abidjan':'Cocody, Abidjan'}
                  </div>
                </div>

                {/* Bottom sheet simulée */}
                <div style={{background:'rgba(255,255,255,.05)',borderRadius:14,padding:'14px 16px',
                  border:'1px solid rgba(255,255,255,.06)'}}>
                  <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:10}}>
                    <Av code="MC" size={38}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,color:'#fff',fontSize:13,fontFamily:'Outfit,sans-serif'}}>Moussa C.</div>
                      <div style={{fontSize:11,color:'rgba(255,255,255,.4)',fontFamily:'Inter,sans-serif'}}>
                        {lang==='fr'?'Plombier · Abobo':'Plumber · Abobo'}
                      </div>
                    </div>
                    <NeighbourhoodBadge count={12} lang={lang} sm/>
                  </div>
                  <div style={{display:'flex',gap:6}}>
                    <button onClick={()=>{
                      const plumber=FLS.find(f=>f.id===2)
                      const text=lang==='fr'
                        ?`Bonjour ${plumber?.nom || ''}, je souhaite vous contacter via EasyJob.`
                        :`Hello ${plumber?.nom || ''}, I would like to contact you via EasyJob.`
                      window.open(buildWhatsAppUrl(plumber?.whatsapp, text), '_blank', 'noopener,noreferrer')
                    }} style={{flex:1,background:G.brand,border:'none',borderRadius:8,
                      padding:'8px 0',cursor:'pointer',fontSize:12,fontWeight:700,color:'#fff',
                      fontFamily:'Inter,sans-serif'}}>
                      {t.contact}
                    </button>
                    <button style={{flex:1,background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.1)',
                      borderRadius:8,padding:'8px 0',cursor:'pointer',fontSize:12,fontWeight:600,
                      color:'rgba(255,255,255,.7)',fontFamily:'Inter,sans-serif'}}>
                      {t.bookAppt}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section style={{padding:isMobile?'52px 24px':'72px 60px',background:C.white}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:16,marginBottom:24}}>
            <div>
              <div style={{display:'inline-flex',alignItems:'center',gap:6,background:C.brandLt,
                border:`1px solid ${C.brand}22`,borderRadius:20,padding:'5px 12px',marginBottom:14}}>
                <Image size={12} color={C.brand}/>
                <span style={{fontSize:12,fontWeight:700,color:C.brand,fontFamily:'Inter,sans-serif'}}>
                  {lang==='fr'?'Des pros en action':'Pros in action'}
                </span>
              </div>
              <h2 style={{fontSize:isMobile?26:34,fontWeight:900,color:C.text,margin:0,fontFamily:'Outfit,sans-serif',letterSpacing:'-.4px'}}>
                {lang==='fr'?'Des visuels concrets de métiers recherchés':'Concrete visuals of in-demand trades'}
              </h2>
            </div>
            <button onClick={onRegister} style={{background:'none',border:`1px solid ${C.border}`,borderRadius:14,padding:'10px 14px',
              cursor:'pointer',color:C.textMid,fontWeight:700,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Voir tous les profils':'See all profiles'}
            </button>
          </div>

          <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)',gap:16}}>
            {PRO_IMAGES.map(card=>(
              <div key={card.title} style={{position:'relative',borderRadius:20,overflow:'hidden',
                minHeight:isMobile?220:300,border:`1px solid ${C.border}`,boxShadow:'0 12px 28px rgba(26,18,8,.06)'}}>
                <img src={card.image} alt={card.title} loading="lazy"
                  style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 20%, rgba(0,0,0,.7) 100%)'}}/>
                <div style={{position:'absolute',left:16,right:16,bottom:16,color:'#fff'}}>
                  <div style={{fontSize:17,fontWeight:800,fontFamily:'Outfit,sans-serif',marginBottom:4}}>{card.title}</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,.75)',lineHeight:1.5,fontFamily:'Inter,sans-serif'}}>{card.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{padding:isMobile?'60px 24px':'80px 60px',background:C.sable,maxWidth:1200,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:52}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,
            background:C.brandLt,border:`1px solid ${C.brand}30`,
            borderRadius:20,padding:'5px 14px',marginBottom:16}}>
            <Sparkles size={12} color={C.brand}/>
            <span style={{fontSize:12,fontWeight:700,color:C.brand,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Ce qui nous différencie':'What sets us apart'}
            </span>
          </div>
          <h2 style={{fontSize:isMobile?28:38,fontWeight:900,color:C.text,margin:'0 0 12px',
            fontFamily:'Outfit,sans-serif',letterSpacing:'-.3px'}}>
            {lang==='fr'?'L\'esprit du quartier, en numérique':'The neighbourhood spirit, digitised'}
          </h2>
          <p style={{fontSize:16,color:C.textMid,maxWidth:540,margin:'0 auto',lineHeight:1.7}}>
            {lang==='fr'
              ?'Une app de mise en relation. Juste la confiance bâtie par le voisinage réel.'
              :'A connection app. Just trust built by real neighbours.'}
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:24}}>
          {FEATURES.map((f,i)=>(
            <div key={i} style={{background:C.white,borderRadius:20,padding:'28px 24px',
              border:`1px solid ${C.border}`,transition:'all .2s',boxShadow:'0 2px 12px rgba(26,18,8,.04)'}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 12px 32px ${C.safran}18`;e.currentTarget.style.borderColor=C.safran+'40'}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 2px 12px rgba(26,18,8,.04)';e.currentTarget.style.borderColor=C.border}}>
              <div style={{width:52,height:52,borderRadius:16,background:C.safranLt,
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,marginBottom:16}}>
                {f.emoji}
              </div>
              <h3 style={{fontSize:17,fontWeight:800,color:C.text,margin:'0 0 10px',
                fontFamily:'Outfit,sans-serif'}}>
                {lang==='fr'?f.titleFr:f.titleEn}
              </h3>
              <p style={{fontSize:14,color:C.textMid,lineHeight:1.7,margin:0}}>
                {lang==='fr'?f.descFr:f.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section style={{padding:isMobile?'40px 24px':'60px 60px',
        background:C.sableDk,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <h2 style={{fontSize:isMobile?24:32,fontWeight:800,color:C.text,margin:'0 0 28px',
            fontFamily:'Outfit,sans-serif',textAlign:'center'}}>
            {lang==='fr'?'Tous les services de ton quartier':'All services in your neighbourhood'}
          </h2>
          <div style={{display:'grid',gridTemplateColumns:isMobile?'repeat(4,1fr)':'repeat(8,1fr)',gap:12}}>
            {CATS_DISPLAY.map((cat,i)=>(
              <button key={i} onClick={onRegister}
                style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,
                  padding:'16px 8px',borderRadius:16,background:C.white,
                  border:`1px solid ${C.border}`,cursor:'pointer',transition:'all .18s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.safran;e.currentTarget.style.background=C.safranLt}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.white}}>
                <span style={{fontSize:24}}>{cat.emoji}</span>
                <span style={{fontSize:11,fontWeight:600,color:C.textMid,textAlign:'center',
                  fontFamily:'Inter,sans-serif',lineHeight:1.3}}>
                  {lang==='fr'?cat.labelFr:cat.labelEn}
                </span>
                <span style={{fontSize:10,color:C.textLt,fontFamily:'Inter,sans-serif'}}>
                  {cat.count}+
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section style={{padding:isMobile?'60px 24px':'80px 60px',background:C.sable}}>
        <div style={{maxWidth:720,margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:isMobile?24:32,fontWeight:800,color:C.text,margin:'0 0 8px',
            fontFamily:'Outfit,sans-serif'}}>
            {lang==='fr'?'Ce que disent les voisins':'What neighbours say'}
          </h2>
          <p style={{fontSize:15,color:C.textMid,margin:'0 0 40px'}}>
            {lang==='fr'?'De vrais retours de vraies communautés':'Real feedback from real communities'}
          </p>

          {/* Carousel */}
          <div style={{background:C.white,borderRadius:20,padding:'32px',
            border:`1px solid ${C.border}`,boxShadow:'0 4px 20px rgba(26,18,8,.06)',
            minHeight:160,transition:'opacity .3s'}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
              <Stars note={TESTIMONIALS[activeTestimonial].note} sz={14}/>
            </div>
            <p style={{fontSize:15,color:C.textMid,lineHeight:1.7,margin:'0 0 20px',
              fontStyle:'italic'}}>
              "{TESTIMONIALS[activeTestimonial].txt}"
            </p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
              <Av code={TESTIMONIALS[activeTestimonial].av} size={36}/>
              <div style={{textAlign:'left'}}>
                <div style={{fontWeight:700,color:C.text,fontSize:13,fontFamily:'Outfit,sans-serif'}}>
                  {TESTIMONIALS[activeTestimonial].nom}
                </div>
                <div style={{fontSize:11,color:C.textLt,display:'flex',alignItems:'center',gap:4}}>
                  <MapPin size={9} color={C.safran}/>
                  {TESTIMONIALS[activeTestimonial].quartier}
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{display:'flex',gap:6,justifyContent:'center',marginTop:16}}>
            {TESTIMONIALS.map((_,i)=>(
              <button key={i} onClick={()=>setActiveTestimonial(i)}
                style={{width:i===activeTestimonial?20:7,height:7,borderRadius:4,border:'none',
                  cursor:'pointer',transition:'all .3s',
                  background:i===activeTestimonial?C.safran:C.borderDk}}/>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{background:G.hero,padding:isMobile?'60px 24px':'80px 60px',textAlign:'center',
        position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,opacity:.04,
          backgroundImage:`radial-gradient(${C.safran} 1px,transparent 1px)`,
          backgroundSize:'28px 28px',pointerEvents:'none'}}/>
        <div style={{position:'relative',maxWidth:600,margin:'0 auto'}}>
          <div style={{fontSize:40,marginBottom:16}}>🌍</div>
          <h2 style={{fontSize:isMobile?28:40,fontWeight:900,color:'#fff',margin:'0 0 14px',
            fontFamily:'Outfit,sans-serif',letterSpacing:'-.4px'}}>
            {lang==='fr'
              ?(<>Rejoins ta communauté<br/><span style={{color:C.safran}}>de talents</span></>)
              :(<>Join your community<br/><span style={{color:C.safran}}>of talents</span></>)}
          </h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,.5)',margin:'0 0 36px',lineHeight:1.7}}>
            {lang==='fr'
              ?'Publie ton besoin, compare les profils et contacte directement le bon prestataire.'
              :'Post your need, compare profiles and contact the right provider directly.'}
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Btn v="gold" sz="lg" onClick={onRegister}>
              {lang==='fr'?'Rejoindre gratuitement':'Join for free'}
            </Btn>
            <Btn v="ghostDk" sz="lg" onClick={onLogin}>
              {lang==='fr'?'J\'ai déjà un compte':'I already have an account'}
            </Btn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:C.nuit,padding:'28px 40px',textAlign:'center',
        borderTop:'1px solid rgba(255,255,255,.06)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:10}}>
          <div style={{width:24,height:24,borderRadius:7,background:G.safran,
            display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Zap size={13} color="#fff" fill="#fff"/>
          </div>
          <span style={{fontSize:14,fontWeight:700,color:'rgba(255,255,255,.6)',fontFamily:'Outfit,sans-serif'}}>
            Easy<span style={{color:C.brand}}>Job</span>
          </span>
        </div>
        <p style={{fontSize:12,color:'rgba(255,255,255,.2)',margin:0,fontFamily:'Inter,sans-serif'}}>
          {lang==='fr'
            ?'Le talent est dans ton quartier · Afrique francophone & anglophone'
            :'Talent lives in your neighbourhood · French & English-speaking Africa'}
        </p>
      </footer>
    </div>
  )
}

export default Landing
