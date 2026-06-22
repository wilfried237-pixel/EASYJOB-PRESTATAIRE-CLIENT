import { useState, useEffect } from 'react'
import { C } from './tokens'

const LOG_TYPES = {
  auth:       {fr:'Authentification',en:'Authentication',color:'#5C6BC0',icon:'🔐'},
  navigation: {fr:'Navigation',en:'Navigation',color:'#1DBF73',icon:'🧭'},
  action:     {fr:'Action',en:'Action',color:'#FF6B35',icon:'⚡'},
  mission:    {fr:'Mission',en:'Mission',color:'#F5A623',icon:'💼'},
  litige:     {fr:'Litige',en:'Dispute',color:'#FF4757',icon:'⚖️'},
  error:      {fr:'Erreur',en:'Error',color:'#FF4757',icon:'❌'},
  system:     {fr:'Système',en:'System',color:'#8A8A9A',icon:'⚙️'},
}

const mkLog = (type,fr,en,uid=null,meta={}) => ({
  id:`L${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
  type,fr,en,uid,meta,ts:new Date().toISOString()
})

let _toast=null
const toast={
  success:m=>_toast?.({m,t:'success'}),
  error:  m=>_toast?.({m,t:'error'}),
  info:   m=>_toast?.({m,t:'info'}),
  warning:m=>_toast?.({m,t:'warning'}),
}

function Toaster(){
  const [list,setList]=useState([])
  useEffect(()=>{
    _toast=({m,t})=>{
      const id=Date.now()
      setList(p=>[...p.slice(-4),{id,m,t}])
      setTimeout(()=>setList(p=>p.filter(x=>x.id!==id)),3800)
    }
    return()=>{_toast=null}
  },[])
  const cfg={success:{bg:C.brand,icon:'✓'},error:{bg:C.danger,icon:'✕'},info:{bg:C.indigo,icon:'i'},warning:{bg:C.gold,icon:'!'}}
  return(
    <div style={{position:'fixed',top:20,right:20,zIndex:9999,display:'flex',flexDirection:'column',gap:10,pointerEvents:'none'}}>
      {list.map(x=>{
        const c=cfg[x.t]||cfg.info
        return(
          <div key={x.id} className="anim-slideRight"
            style={{background:C.dark,color:'#fff',padding:'14px 18px',borderRadius:12,fontSize:14,
              fontWeight:500,boxShadow:'0 8px 32px rgba(0,0,0,.5)',display:'flex',alignItems:'center',
              gap:12,borderLeft:`4px solid ${c.bg}`,maxWidth:340,backdropFilter:'blur(12px)'}}>
            <div style={{width:22,height:22,borderRadius:11,background:c.bg,display:'flex',alignItems:'center',
              justifyContent:'center',fontSize:11,fontWeight:800,flexShrink:0}}>{c.icon}</div>
            <span style={{fontFamily:'Inter,sans-serif'}}>{x.m}</span>
          </div>
        )
      })}
    </div>
  )
}

const useIsMobile=()=>{
  const [m,setM]=useState(window.innerWidth<768)
  useEffect(()=>{
    const h=()=>setM(window.innerWidth<768)
    window.addEventListener('resize',h)
    return()=>window.removeEventListener('resize',h)
  },[])
  return m
}

const fmt  = n=>Number(n).toLocaleString('fr-FR')+' FCFA'
const fmtN = n=>Number(n).toLocaleString('fr-FR')

export { LOG_TYPES, mkLog, toast, Toaster, useIsMobile, fmt, fmtN }
