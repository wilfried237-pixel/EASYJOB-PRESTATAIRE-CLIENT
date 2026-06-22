import { useState } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Inp, Sel, Modal, Av, Stars, Badge, Toggle } from '../../components/ui'
import { toast, useIsMobile, fmt } from '../../utils/utils.jsx'
import { authAPI } from '../../api/client'
import { AFRICA, CATS, SKILLS } from '../../data/mockData'
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
  Heart, Map
} from 'lucide-react'

// ══════════════════════════════════════════════════
// SIDEBAR — Desktop — Voisin'Talents palette nuit/terre
// ══════════════════════════════════════════════════
const Sidebar=({page,setPage,user,lang,unreadMsg,unreadNotif,setSub})=>{
  const t=T[lang]
  const isFL=user.role==='freelancer'
  const neighbourhood=user.district||user.city||(lang==='fr'?'Quartier non renseigne':'District not set')

  const mainNav=isFL?[
    {id:'home',    icon:Map,          label:t.home},
    {id:'explore', icon:Search,       label:t.explore},
    {id:'missions',icon:Briefcase,    label:t.missions},
    {id:'messages',icon:MessageSquare,label:t.messages, badge:unreadMsg},
    {id:'profil',  icon:User,         label:t.profile},
  ]:[
    {id:'home',    icon:Map,          label:t.home},
    {id:'explore', icon:Search,       label:lang==='fr'?'Trouver un prestataire':'Find a provider'},
    {id:'postjob', icon:Zap,          label:lang==='fr'?'Publier une mission':'Post a job'},
    {id:'missions',icon:Briefcase,    label:lang==='fr'?'Mes missions':'My jobs'},
    {id:'messages',icon:MessageSquare,label:t.messages, badge:unreadMsg},
    {id:'profil',  icon:User,         label:t.profile},
  ]
  const toolsNav=[
    {id:'search',       icon:Search,    label:lang==='fr'?'Recherche avancée':'Advanced Search', action:()=>setSub('search')},
    {id:'stats',        icon:BarChart2, label:lang==='fr'?'Statistiques':'Stats',                action:()=>setSub('stats')},
    ...(isFL?[
      {id:'dashboard',  icon:Grid,      label:'Dashboard',                                        action:()=>setSub('dashboard')},
      {id:'contracts',  icon:FileText,  label:lang==='fr'?'Projets':'Projects',                   action:()=>setSub('contracts')},
      {id:'reviews',    icon:Star,      label:lang==='fr'?'Avis':'Reviews',                       action:()=>setSub('reviews')},
    ]:[
      {id:'dashboard',  icon:Grid,      label:'Dashboard',                                        action:()=>setSub('dashboard')},
      {id:'proposals',  icon:TrendingUp,label:lang==='fr'?'Propositions reçues':'Received proposals', action:()=>setSub('proposals')},
      {id:'reviews',    icon:Star,      label:lang==='fr'?'Avis donnés':'Reviews given',          action:()=>setSub('reviews')},
    ]),
    {id:'litiges',      icon:Shield,    label:lang==='fr'?'Signalements':'Reports',               action:()=>setSub('litiges')},
    {id:'notif-center', icon:Bell,      label:t.notifications, badge:unreadNotif,                action:()=>setSub('notif-center')},
    {id:'security',     icon:Lock,      label:lang==='fr'?'Sécurité':'Security',                  action:()=>setSub('security')},
    {id:'settings',     icon:Settings,  label:t.settings,                                         action:()=>setSub('settings')},
    {id:'aide',         icon:Info,      label:lang==='fr'?'Aide':'Help',                          action:()=>setSub('aide')},
  ]

  return(
    <aside style={{width:240,height:'100vh',background:C.nuit,display:'flex',flexDirection:'column',
      flexShrink:0,borderRight:'1px solid rgba(255,255,255,.05)',overflow:'hidden',position:'sticky',top:0}}>

      {/* Logo Voisin'Talents */}
      <div style={{padding:'22px 20px 16px',borderBottom:'1px solid rgba(255,255,255,.06)',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:34,height:34,borderRadius:10,background:G.safran,display:'flex',alignItems:'center',
            justifyContent:'center',flexShrink:0,boxShadow:`0 4px 12px ${C.safran}55`}}>
            <Zap size={17} color="#fff" fill="#fff"/>
          </div>
          <div style={{lineHeight:1}}>
            <span style={{fontSize:16,fontWeight:800,color:'#fff',fontFamily:'Outfit,sans-serif',letterSpacing:'-.2px'}}>
              Easy
            </span>
            <span style={{fontSize:16,fontWeight:800,color:C.brand,fontFamily:'Outfit,sans-serif',letterSpacing:'-.2px'}}>
              Job
            </span>
          </div>
        </div>
      </div>

      {/* User card */}
      <div style={{padding:'14px 16px',borderBottom:'1px solid rgba(255,255,255,.06)',flexShrink:0}}>
        <div style={{display:'flex',gap:10,alignItems:'center',padding:'10px 12px',
          borderRadius:12,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.04)'}}>
          <div style={{position:'relative'}}>
            <Av code={user.initials||user.av} size={38}/>
            <div style={{position:'absolute',bottom:0,right:0,width:10,height:10,
              borderRadius:5,background:C.brand,border:`2px solid ${C.nuit}`}}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,color:'#fff',fontSize:13,fontFamily:'Outfit,sans-serif',
              whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{user.nom}</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,.35)',marginTop:1,display:'flex',alignItems:'center',gap:5}}>
              {user.role==='client'
                ?(lang==='fr'?'Client':'Client')
                :(lang==='fr'?'Prestataire':'Provider')}
              {user.verifie&&(
                <span style={{background:`${C.brand}30`,color:C.brand,fontSize:9,fontWeight:700,
                  padding:'1px 5px',borderRadius:6}}>✓</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav style={{flex:1,padding:'10px',overflowY:'auto'}}>
        <div style={{marginBottom:6,padding:'6px 10px',fontSize:10,fontWeight:700,
          color:'rgba(255,255,255,.2)',letterSpacing:'.12em',fontFamily:'Inter,sans-serif',textTransform:'uppercase'}}>
          {lang==='fr'?'Navigation':'Navigation'}
        </div>
        {mainNav.map(item=>{
          const active=page===item.id
          return(
            <button key={item.id} onClick={()=>setPage(item.id)}
              style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'10px 12px',
                borderRadius:10,border:'none',cursor:'pointer',marginBottom:2,textAlign:'left',
                background:active?`${C.safran}1A`:'transparent',
                transition:'background .15s'}}>
              <item.icon size={16} color={active?C.safran:'rgba(255,255,255,.35)'}/>
              <span style={{flex:1,fontSize:13,fontWeight:active?700:500,
                color:active?C.safran:'rgba(255,255,255,.55)',fontFamily:'Inter,sans-serif'}}>
                {item.label}
              </span>
              {item.badge>0&&(
                <span style={{background:C.terre,color:'#fff',borderRadius:10,
                  padding:'1px 6px',fontSize:10,fontWeight:700,fontFamily:'Inter,sans-serif'}}>
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}

        <div style={{marginTop:16,marginBottom:6,padding:'6px 10px',fontSize:10,fontWeight:700,
          color:'rgba(255,255,255,.2)',letterSpacing:'.12em',fontFamily:'Inter,sans-serif',textTransform:'uppercase'}}>
          {lang==='fr'?'Outils':'Tools'}
        </div>
        {toolsNav.map(item=>(
          <button key={item.id} onClick={item.action}
            style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'10px 12px',
              borderRadius:10,border:'none',cursor:'pointer',marginBottom:2,textAlign:'left',
              background:'transparent',transition:'background .15s'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.04)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <item.icon size={16} color="rgba(255,255,255,.32)"/>
            <span style={{flex:1,fontSize:13,fontWeight:500,
              color:'rgba(255,255,255,.42)',fontFamily:'Inter,sans-serif'}}>{item.label}</span>
            {item.badge>0&&(
              <span style={{background:C.terre,color:'#fff',borderRadius:10,
                padding:'1px 6px',fontSize:10,fontWeight:700}}>{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Quartier badge */}
      <div style={{padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,.06)',flexShrink:0}}>
        <div style={{background:`${C.safran}12`,border:`1px solid ${C.safran}25`,
          borderRadius:12,padding:'12px 14px'}}>
          <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:4}}>
            <span style={{fontSize:14}}>🏘️</span>
            <span style={{fontSize:10,color:'rgba(255,255,255,.35)',fontWeight:600,
              fontFamily:'Inter,sans-serif',textTransform:'uppercase',letterSpacing:'.1em'}}>
              {lang==='fr'?'Mon quartier':'My neighbourhood'}
            </span>
          </div>
          <div style={{fontSize:12,fontWeight:600,color:'rgba(255,255,255,.5)',fontFamily:'Inter,sans-serif'}}>
            {neighbourhood}
          </div>
        </div>
      </div>
    </aside>
  )
}

// ══════════════════════════════════════════════════
// BOTTOM NAV — Mobile — Voisin'Talents
// ══════════════════════════════════════════════════
const BottomNav=({page,setPage,user,lang,unreadMsg})=>{
  const t=T[lang]
  const isFL=user.role==='freelancer'
  const items=isFL?[
    {id:'home',    icon:Map,           label:t.home},
    {id:'explore', icon:Search,        label:t.explore},
    {id:'missions',icon:Briefcase,     label:t.missions},
    {id:'messages',icon:MessageSquare, label:t.messages, badge:unreadMsg},
    {id:'profil',  icon:User,          label:t.profile},
  ]:[
    {id:'home',    icon:Map,           label:t.home},
    {id:'explore', icon:Search,        label:lang==='fr'?'Trouver':'Find'},
    {id:'postjob', icon:Zap,           label:t.postJob, fab:true},
    {id:'messages',icon:MessageSquare, label:t.messages, badge:unreadMsg},
    {id:'profil',  icon:User,          label:t.profile},
  ]
  return(
    <nav style={{position:'fixed',bottom:0,left:0,right:0,height:64,background:C.white,
      borderTop:`1px solid ${C.border}`,zIndex:100,display:'flex',alignItems:'center',
      paddingBottom:'env(safe-area-inset-bottom)',boxShadow:'0 -4px 24px rgba(26,18,8,.08)'}}>
      {items.map(item=>{
        const active=page===item.id
        if(item.fab) return(
          <div key={item.id} style={{flex:1,display:'flex',justifyContent:'center'}}>
            <button onClick={()=>setPage(item.id)}
              style={{width:50,height:50,borderRadius:25,background:G.safran,border:'none',cursor:'pointer',
                display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16,
                boxShadow:`0 6px 20px ${C.safran}55`,transform:'translateY(-8px)',transition:'all .15s'}}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-10px) scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(-8px)'}>
              <Zap size={20} color="#fff" fill="#fff"/>
            </button>
          </div>
        )
        return(
          <button key={item.id} onClick={()=>setPage(item.id)}
            style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
              gap:4,border:'none',background:'none',cursor:'pointer',padding:'8px 0',position:'relative'}}>
            <item.icon size={20} color={active?C.safran:C.textLt} strokeWidth={active?2.5:1.5}/>
            <span style={{fontSize:10,fontWeight:active?700:500,
              color:active?C.safran:C.textLt,fontFamily:'Inter,sans-serif'}}>{item.label}</span>
            {item.badge>0&&(
              <span style={{position:'absolute',top:6,right:'50%',transform:'translateX(8px)',
                background:C.terre,color:'#fff',borderRadius:8,padding:'1px 5px',fontSize:9,fontWeight:700}}>
                {item.badge}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}

// ══════════════════════════════════════════════════
// PAGE HEADER — sous-pages
// ══════════════════════════════════════════════════
const PgHdr=({title,onBack,right})=>(
  <div style={{display:'flex',alignItems:'center',gap:12,padding:'0 24px',height:60,
    background:C.white,borderBottom:`1px solid ${C.border}`,flexShrink:0,
    position:'sticky',top:0,zIndex:40}}>
    {onBack&&(
      <button onClick={onBack} style={{width:36,height:36,borderRadius:10,background:C.sable,
        border:`1px solid ${C.border}`,cursor:'pointer',display:'flex',alignItems:'center',
        justifyContent:'center',flexShrink:0}}>
        <ChevronLeft size={18} color={C.textMid}/>
      </button>
    )}
    <h1 style={{flex:1,fontSize:17,fontWeight:700,color:C.text,margin:0,
      fontFamily:'Outfit,sans-serif'}}>{title}</h1>
    {right}
  </div>
)

export { Sidebar, BottomNav, PgHdr }
