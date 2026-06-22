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
  Briefcase as BriefcaseIcon,
  Paperclip
} from 'lucide-react'

const MessagesScreen=({user,data,setData,lang,setSub,setSelConv})=>{
  const t=T[lang]
  const isMobile=useIsMobile()
  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
      <PgHdr title={t.messages}/>
      <div style={{flex:1,overflowY:'auto',padding:'16px 24px',maxWidth:860,width:'100%',margin:'0 auto',alignSelf:'center'}}>
        {data.convs.length===0
          ?<div style={{textAlign:'center',padding:60,color:C.textMid,fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'Aucune conversation':'No conversations yet'}</div>
          :data.convs.map(conv=>{
            const fl=data.freelancers.find(f=>f.id===conv.flId)||{nom:'Freelance',av:'FL',title:'',dispo:false}
            return(
              <div key={conv.id} onClick={()=>{setSelConv({...conv,fl});setSub('chat')}}
                style={{background:C.white,borderRadius:14,padding:'16px 18px',marginBottom:8,cursor:'pointer',
                  border:`1.5px solid ${conv.unread>0?C.brand:C.border}`,transition:'all .15s',
                  display:'flex',gap:14,alignItems:'center'}}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 4px 14px rgba(0,0,0,.07)'}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow='none'}}>
                <div style={{position:'relative'}}>
                  <Av code={fl.av} size={50}/>
                  {fl.dispo&&<div style={{position:'absolute',bottom:1,right:1,width:12,height:12,borderRadius:6,background:C.brand,border:`2px solid ${C.white}`}}/>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:3}}>
                    <span style={{fontWeight:700,fontSize:14,color:C.text,fontFamily:'Outfit,sans-serif'}}>{fl.nom}</span>
                    <span style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif'}}>{conv.time}</span>
                  </div>
                  <div style={{fontSize:12,color:conv.unread?C.text:C.textLt,fontFamily:'Inter,sans-serif',fontWeight:conv.unread?600:400,
                    whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{conv.lastMsg||fl.title}</div>
                </div>
                {conv.unread>0&&(
                  <div style={{width:20,height:20,borderRadius:10,background:C.brand,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <span style={{fontSize:10,fontWeight:800,color:'#fff'}}>{conv.unread}</span>
                  </div>
                )}
              </div>
            )
          })
        }
        {isMobile&&<div style={{height:72}}/>}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// CHAT SCREEN
// ══════════════════════════════════════════════════
const FAKE_FILES=[
  {name:'Devis_EasyJob.pdf',type:'pdf'},
  {name:'Cahier_des_charges.pdf',type:'pdf'},
  {name:'Contrat_mission.pdf',type:'pdf'},
  {name:'Portfolio_design.pdf',type:'pdf'},
  {name:'Brief_projet.docx',type:'doc'},
  {name:'Maquettes_UI.fig',type:'fig'},
  {name:'Photo_reference.jpg',type:'img'},
  {name:'Presentation.pptx',type:'doc'},
]

const ChatScreen=({conv,onBack,user,data,setData,lang})=>{
  const[input,setInput]=useState('')
  const[attachment,setAttachment]=useState(null)
  const endRef=useRef(null)
  const fl=conv.fl||data.freelancers.find(f=>f.id===conv.flId)||{nom:'Freelance',av:'FL',dispo:false}

  const REPLIES_FR=["Je regarde ça maintenant !","D'accord, je m'en occupe.","Pouvez-vous envoyer plus de détails ?",
    "Parfait, nous pouvons commencer.","Je vous envoie un devis dans 1h.","Merci pour votre confiance !"]
  const REPLIES_EN=["Looking at this now!","Sure, I'll handle it.","Can you send more details?",
    "Great, we can get started.","I'll send you a quote within 1h.","Thank you for your trust!"]

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'})},[conv.msgs])

  const simulateFileSelect=()=>{
    const f=FAKE_FILES[Math.floor(Math.random()*FAKE_FILES.length)]
    setAttachment(f)
  }

  const send=()=>{
    if(!input.trim()&&!attachment)return
    const now=new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})
    const newMsg={from:'client',msg:input.trim(),t:now,file:attachment||null}
    const updated=[...conv.msgs,newMsg]
    setData(d=>({...d,convs:d.convs.map(c=>c.id===conv.id?{...c,msgs:updated,lastMsg:attachment?`📎 ${attachment.name}`:newMsg.msg,unread:0}:c)}))
    setInput('')
    setAttachment(null)
    setTimeout(()=>{
      const replyPool=lang==='fr'?REPLIES_FR:REPLIES_EN
      const reply={from:'fl',msg:replyPool[Math.floor(Math.random()*replyPool.length)],
        t:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}
      setData(d=>({...d,convs:d.convs.map(c=>c.id===conv.id?{...c,msgs:[...c.msgs,reply],lastMsg:reply.msg}:c)}))
    },1200)
  }

  const isMobile=useIsMobile()
  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
      {/* Header */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:'0 20px',height:60,
        display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
        <button onClick={onBack} style={{width:34,height:34,borderRadius:9,background:C.bg,
          border:`1px solid ${C.border}`,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <ChevronLeft size={17} color={C.textMid}/>
        </button>
        <div style={{position:'relative'}}><Av code={fl.av} size={38}/>
          {fl.dispo&&<div style={{position:'absolute',bottom:0,right:0,width:10,height:10,borderRadius:5,background:C.brand,border:`2px solid ${C.white}`}}/>}
        </div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:14,color:C.text,fontFamily:'Outfit,sans-serif'}}>{fl.nom}</div>
          <div style={{fontSize:11,color:fl.dispo?C.brand:C.textLt,fontFamily:'Inter,sans-serif'}}>
            {fl.dispo?(lang==='fr'?'En ligne':'Online'):(lang==='fr'?'Hors ligne':'Offline')}
          </div>
        </div>
        <div style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif',display:'flex',alignItems:'center',gap:4}}>
          <Shield size={11} color={C.brand}/>{lang==='fr'?'Échanges sécurisés':'Secure chat'}
        </div>
      </div>

      {/* Messages */}
      <div style={{flex:1,overflowY:'auto',padding:'16px 20px',display:'flex',flexDirection:'column',gap:10}}>
        {conv.msgs.map((msg,i)=>{
          const isMe=msg.from==='client'
          return(
            <div key={i} style={{display:'flex',justifyContent:isMe?'flex-end':'flex-start',alignItems:'flex-end',gap:8}}>
              {!isMe&&<Av code={fl.av} size={28}/>}
              <div>
                {msg.file&&(
                  <div style={{maxWidth:260,marginBottom:msg.msg?6:0,
                    padding:'10px 13px',borderRadius:isMe?'14px 14px 4px 14px':'14px 14px 14px 4px',
                    background:isMe?`${C.brand}dd`:C.white,
                    border:isMe?'none':`1px solid ${C.border}`,
                    boxShadow:'0 2px 8px rgba(0,0,0,.07)',
                    display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:36,height:36,borderRadius:8,
                      background:isMe?'rgba(255,255,255,.15)':C.bg,
                      display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <FileText size={18} color={isMe?'#fff':C.brand}/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:600,fontSize:12,color:isMe?'#fff':C.text,
                        fontFamily:'Inter,sans-serif',
                        whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{msg.file.name}</div>
                      <div style={{fontSize:10,color:isMe?'rgba(255,255,255,.7)':C.textLt,
                        fontFamily:'Inter,sans-serif',marginTop:1}}>
                        {lang==='fr'?'Pièce jointe':'Attachment'}
                      </div>
                    </div>
                    <button onClick={()=>toast.info(lang==='fr'?'Téléchargement — bientôt disponible':'Download coming soon')}
                      style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex',flexShrink:0}}>
                      <Download size={14} color={isMe?'rgba(255,255,255,.8)':C.textMid}/>
                    </button>
                  </div>
                )}
                {msg.msg&&(
                  <div style={{maxWidth:320,padding:'11px 15px',borderRadius:isMe?'14px 14px 4px 14px':'14px 14px 14px 4px',
                    background:isMe?C.brand:C.white,color:isMe?'#fff':C.text,
                    fontSize:13,lineHeight:1.6,fontFamily:'Inter,sans-serif',
                    boxShadow:'0 2px 8px rgba(0,0,0,.07)',border:isMe?'none':`1px solid ${C.border}`}}>
                    {msg.msg}
                  </div>
                )}
                <div style={{fontSize:10,color:C.textLt,marginTop:3,textAlign:isMe?'right':'left',fontFamily:'Inter,sans-serif'}}>{msg.t}</div>
              </div>
            </div>
          )
        })}
        <div ref={endRef}/>
      </div>

      {/* Input */}
      <div style={{background:C.white,borderTop:`1px solid ${C.border}`,padding:'10px 16px',flexShrink:0,
        paddingBottom:`calc(10px + env(safe-area-inset-bottom))`}}>
        {/* Attachment preview */}
        {attachment&&(
          <div style={{display:'flex',alignItems:'center',gap:8,background:C.brandLt,
            borderRadius:10,padding:'8px 12px',marginBottom:8,border:`1px solid ${C.brand}30`}}>
            <FileText size={15} color={C.brand} style={{flexShrink:0}}/>
            <span style={{flex:1,fontSize:12,fontWeight:600,color:C.brand,fontFamily:'Inter,sans-serif',
              whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
              {attachment.name}
            </span>
            <button onClick={()=>setAttachment(null)} style={{background:'none',border:'none',cursor:'pointer',padding:2,display:'flex',flexShrink:0}}>
              <X size={13} color={C.textMid}/>
            </button>
          </div>
        )}
        <div style={{display:'flex',gap:8,alignItems:'center',background:C.bg,
          border:`1.5px solid ${C.border}`,borderRadius:24,padding:'6px 6px 6px 12px'}}>
          <button onClick={simulateFileSelect}
            style={{width:32,height:32,borderRadius:16,background:'none',border:'none',
              cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <Paperclip size={17} color={attachment?C.brand:C.textMid}/>
          </button>
          <input value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&send()}
            placeholder={lang==='fr'?'Écrire un message...':'Write a message...'}
            style={{flex:1,border:'none',background:'transparent',fontSize:14,color:C.text,
              fontFamily:'Inter,sans-serif',outline:'none'}}/>
          <button onClick={send} disabled={!input.trim()&&!attachment}
            style={{width:36,height:36,borderRadius:18,
              background:(input.trim()||attachment)?C.brand:C.borderDk,
              border:'none',cursor:(input.trim()||attachment)?'pointer':'default',
              display:'flex',alignItems:'center',justifyContent:'center',transition:'background .15s'}}>
            <Send size={15} color="#fff"/>
          </button>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// POST JOB — 3 étapes
// ══════════════════════════════════════════════════

export { MessagesScreen, ChatScreen }
