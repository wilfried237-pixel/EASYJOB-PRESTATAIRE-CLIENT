import { useState } from 'react'
import { C } from '../../utils/tokens'
import { Av } from '../../components/ui'
import { useIsMobile } from '../../utils/utils.jsx'
import {
  Bell, MessageCircle, Briefcase, AlertCircle, CheckCircle, X
} from 'lucide-react'

const NotificationCenterScreen=({lang,onBack})=>{
  const isMobile=useIsMobile()
  const[filter,setFilter]=useState('all')
  const[notifications,setNotifications]=useState([
    {id:1,type:'message',title:'Fatou Diallo vous a envoye un message',desc:'Concernant votre mission Design System',time:'5 min',read:false,av:'FD',icon:MessageCircle},
    {id:2,type:'mission',title:'Nouvelle proposition recue',desc:'Moussa Coulibaly a soumis une proposition',time:'2h',read:false,av:'MC',icon:Briefcase},
    {id:3,type:'mission',title:'Mission urgente diffusee',desc:'Recherche des prestataires disponibles autour de vous',time:'4h',read:true,av:null,icon:AlertCircle,color:'#FFB000'},
    {id:4,type:'message',title:'Moussa K. vous a envoye un message',desc:'Question sur les specifications de la mission',time:'6h',read:true,av:'MC',icon:MessageCircle},
    {id:5,type:'system',title:'Votre profil a ete verifie',desc:'Votre identite client est confirmee',time:'1j',read:true,av:null,icon:CheckCircle,color:'#10B981'},
    {id:6,type:'system',title:'Conseil securite',desc:'Verifiez toujours le profil avant de confirmer une mission',time:'2j',read:true,av:null,icon:CheckCircle,color:'#10B981'},
  ])

  const filtered=notifications.filter(n=>{
    if(filter==='all')return true
    if(filter==='unread')return !n.read
    if(filter==='messages')return n.type==='message'
    if(filter==='missions')return n.type==='mission'
    if(filter==='system')return n.type==='system'
    return true
  })

  const unreadCount=notifications.filter(n=>!n.read).length
  const markRead=id=>setNotifications(list=>list.map(n=>n.id===id?{...n,read:true}:n))
  const remove=id=>setNotifications(list=>list.filter(n=>n.id!==id))
  const markAll=()=>setNotifications(list=>list.map(n=>({...n,read:true})))
  const iconColor=n=>n.color||({message:C.brand,mission:C.safran,system:C.voisin}[n.type]||C.textMid)

  return(
    <div style={{minHeight:'100%',background:C.bg,padding:isMobile?'80px 16px 40px':'16px 24px',paddingTop:isMobile?80:16}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <h1 style={{fontSize:isMobile?24:32,fontWeight:800,color:C.text,margin:0,fontFamily:'Outfit,sans-serif'}}>
          {lang==='fr'?'Notifications':'Notifications'}
          {unreadCount>0&&<span style={{background:C.brand,color:'#fff',borderRadius:12,padding:'2px 8px',fontSize:12,marginLeft:8,fontWeight:700}}>{unreadCount}</span>}
        </h1>
        {unreadCount>0&&(
          <button onClick={markAll} style={{padding:'8px 12px',borderRadius:6,border:`1px solid ${C.border}`,background:C.white,cursor:'pointer',fontSize:12,fontWeight:600}}>
            {lang==='fr'?'Tout marquer':'Mark all'}
          </button>
        )}
      </div>

      <div style={{display:'flex',gap:8,marginBottom:24,overflowX:'auto',paddingBottom:8}}>
        {[
          {id:'all',label:lang==='fr'?'Tous':'All'},
          {id:'unread',label:lang==='fr'?'Non lus':'Unread'},
          {id:'messages',label:'Messages'},
          {id:'missions',label:lang==='fr'?'Missions':'Jobs'},
          {id:'system',label:lang==='fr'?'Systeme':'System'},
        ].map(f=>(
          <button key={f.id} onClick={()=>setFilter(f.id)}
            style={{padding:'6px 12px',borderRadius:6,border:`2px solid ${filter===f.id?C.brand:C.border}`,
              background:filter===f.id?C.brandLt:'transparent',color:filter===f.id?C.brand:C.text,
              cursor:'pointer',fontSize:12,fontWeight:500,whiteSpace:'nowrap'}}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={{display:'grid',gap:12}}>
        {filtered.length===0?(
          <div style={{textAlign:'center',padding:60,color:C.textMid}}>
            <Bell size={48} style={{margin:'0 auto 16px',opacity:.2}}/>
            <div>{lang==='fr'?'Aucune notification':'No notifications'}</div>
          </div>
        ):filtered.map(notif=>(
          <div key={notif.id} style={{background:C.white,borderRadius:12,border:`1px solid ${!notif.read?C.brand:C.border}`,
            padding:16,display:'flex',gap:12,alignItems:'flex-start',opacity:notif.read?0.7:1}}>
            <div style={{width:44,height:44,borderRadius:10,background:iconColor(notif)+'18',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              {notif.av?<Av code={notif.av} size={44}/>:<notif.icon size={20} color={iconColor(notif)}/>}
            </div>
            <div style={{flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',gap:8,marginBottom:4}}>
                <h3 style={{fontSize:14,fontWeight:700,color:C.text,margin:0}}>
                  {notif.title}
                  {!notif.read&&<span style={{display:'inline-block',width:8,height:8,background:C.brand,borderRadius:'50%',marginLeft:8}}/>}
                </h3>
                <span style={{fontSize:11,color:C.textMid,whiteSpace:'nowrap'}}>{notif.time}</span>
              </div>
              <p style={{fontSize:13,color:C.textMid,margin:'0 0 8px'}}>{notif.desc}</p>
              {!notif.read&&(
                <button onClick={()=>markRead(notif.id)} style={{background:'none',border:'none',color:C.brand,cursor:'pointer',fontWeight:600,fontSize:12,padding:0}}>
                  {lang==='fr'?'Marquer comme lu':'Mark as read'}
                </button>
              )}
            </div>
            <button onClick={()=>remove(notif.id)} style={{background:'none',border:'none',cursor:'pointer',color:C.textMid,padding:4}}>
              <X size={16}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationCenterScreen
