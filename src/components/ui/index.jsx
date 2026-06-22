import { useState, useEffect } from 'react'
import { C } from '../../utils/tokens'
import { Star, ChevronDown, X } from 'lucide-react'

const AV_G={
  AT:'linear-gradient(135deg,#FF6B35,#E5551F)', MC:'linear-gradient(135deg,#3B82F6,#1D4ED8)',
  FD:'linear-gradient(135deg,#8B5CF6,#7C3AED)', KA:'linear-gradient(135deg,#EAB308,#CA8A04)',
  AS:'linear-gradient(135deg,#EC4899,#DB2777)', IB:'linear-gradient(135deg,#6B7280,#374151)',
  MK:'linear-gradient(135deg,#22C55E,#16A34A)', OD:'linear-gradient(135deg,#06B6D4,#0891B2)',
  SC:'linear-gradient(135deg,#FF6B35,#FFD700)', RD:'linear-gradient(135deg,#1DBF73,#059669)',
  BM:'linear-gradient(135deg,#6366F1,#4F46E5)', JK:'linear-gradient(135deg,#F59E0B,#D97706)',
  AB:'linear-gradient(135deg,#EC4899,#BE185D)', DM:'linear-gradient(135deg,#10B981,#059669)',
  ST:'linear-gradient(135deg,#8B5CF6,#6D28D9)', CO:'linear-gradient(135deg,#EF4444,#DC2626)',
  FG:'linear-gradient(135deg,#F97316,#EA580C)', KS:'linear-gradient(135deg,#0EA5E9,#0284C7)',
  AK:'linear-gradient(135deg,#A855F7,#9333EA)', NB:'linear-gradient(135deg,#F43F5E,#E11D48)',
  AD:'linear-gradient(135deg,#34D399,#10B981)',
}

// ══════════════════════════════════════════════════
// ATOM: Av — Avatar
// ══════════════════════════════════════════════════
const Av=({code,size=40})=>(
  <div style={{width:size,height:size,borderRadius:size/2,flexShrink:0,
    background:AV_G[code]||`linear-gradient(135deg,${C.brand},${C.dark})`,
    display:'flex',alignItems:'center',justifyContent:'center',
    color:'#fff',fontWeight:800,fontSize:size*.32,fontFamily:'Outfit,sans-serif',letterSpacing:'-.5px'}}>
    {code?.slice(0,2)}
  </div>
)

// ══════════════════════════════════════════════════
// ATOM: Stars
// ══════════════════════════════════════════════════
const Stars=({note,sz=12})=>(
  <span style={{display:'inline-flex',alignItems:'center',gap:1}}>
    {[1,2,3,4,5].map(i=>(
      <Star key={i} size={sz} fill={i<=Math.round(note)?C.gold:'none'} color={i<=Math.round(note)?C.gold:'#D4D4CC'}/>
    ))}
    <span style={{fontSize:sz,fontWeight:700,color:C.text,marginLeft:4}}>{note}</span>
  </span>
)

// ══════════════════════════════════════════════════
// ATOM: Badge
// ══════════════════════════════════════════════════
const Badge=({type,children,sm})=>{
  const S={
    top:{bg:'#FFF8E6',c:'#B45309',b:'#FDE68A'},premium:{bg:'#F5F3FF',c:'#7C3AED',b:'#DDD6FE'},
    verified:{bg:'#E8FBF2',c:'#065F46',b:'#6EE7B7'},urgent:{bg:'#FFF1F2',c:'#BE123C',b:'#FECDD3'},
    ouverte:{bg:'#ECFDF5',c:'#065F46',b:'#A7F3D0'},en_cours:{bg:'#FFF7ED',c:'#C2410C',b:'#FED7AA'},
    terminee:{bg:'#F9FAFB',c:'#6B7280',b:'#E5E7EB'},acceptee:{bg:'#ECFDF5',c:'#065F46',b:'#A7F3D0'},
    refusee:{bg:'#FFF1F2',c:'#BE123C',b:'#FECDD3'},en_attente:{bg:'#FFFBEB',c:'#92400E',b:'#FDE68A'},
    default:{bg:'#F9FAFB',c:'#374151',b:'#E5E7EB'},
  }
  const s=S[type]||S.default
  return(
    <span style={{padding:sm?'2px 8px':'4px 12px',borderRadius:20,fontSize:sm?10:12,fontWeight:700,
      background:s.bg,color:s.c,border:`1px solid ${s.b}`,whiteSpace:'nowrap',fontFamily:'Inter,sans-serif'}}>
      {children||type}
    </span>
  )
}

// ══════════════════════════════════════════════════
// ATOM: Btn — bouton universel
// ══════════════════════════════════════════════════
const Btn=({children,v='brand',sz='md',onClick,disabled,full,icon:Icon,style:sx={}})=>{
  const[h,sH]=useState(false),[p,sP]=useState(false)
  const V={
    brand:   {bg:C.safran,   bgH:C.safranDk, c:'#fff',brd:'transparent'},
    green:   {bg:C.brand,    bgH:C.brandDk,  c:'#fff',brd:'transparent'},
    orange:  {bg:C.orange,   bgH:C.orangeDk, c:'#fff',brd:'transparent'},
    dark:    {bg:C.dark,     bgH:C.darkMid,  c:'#fff',brd:'transparent'},
    outline: {bg:'transparent',bgH:C.bg,     c:C.text,brd:C.border},
    outlineW:{bg:'transparent',bgH:'rgba(255,255,255,.1)',c:'#fff',brd:'rgba(255,255,255,.25)'},
    ghost:   {bg:'transparent',bgH:C.brandLt,c:C.brand,brd:'transparent'},
    ghostDk: {bg:'rgba(255,255,255,.07)',bgH:'rgba(255,255,255,.14)',c:'rgba(255,255,255,.8)',brd:'transparent'},
    soft:    {bg:C.bg,       bgH:C.bgDk,     c:C.textMid,brd:C.border},
    danger:  {bg:C.danger,   bgH:'#E03040',  c:'#fff',brd:'transparent'},
    success: {bg:C.brand,    bgH:C.brandDk,  c:'#fff',brd:'transparent'},
    gold:    {bg:C.gold,     bgH:'#E09400',  c:'#1A1A2E',brd:'transparent'},
  }
  const SZ={xs:[4,11,8],sm:[8,13,10],md:[11,14,12],lg:[14,15,13],xl:[18,16,14]}
  const vr=V[v]||V.brand,s=SZ[sz]||SZ.md
  const bg=disabled?C.borderDk:(p||h)?vr.bgH:vr.bg
  const col=disabled?C.textLt:vr.c
  return(
    <button onClick={!disabled?onClick:undefined}
      onMouseEnter={()=>!disabled&&sH(true)} onMouseLeave={()=>{sH(false);sP(false)}}
      onMouseDown={()=>!disabled&&sP(true)} onMouseUp={()=>sP(false)}
      style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:7,
        fontFamily:'Inter,sans-serif',fontWeight:600,userSelect:'none',whiteSpace:'nowrap',cursor:disabled?'not-allowed':'pointer',
        padding:`${s[0]}px ${s[0]*2.4}px`,fontSize:s[1],borderRadius:s[2],
        background:bg,color:col,border:`1.5px solid ${disabled?C.borderDk:vr.brd||'transparent'}`,
        transition:'all .14s cubic-bezier(.4,0,.2,1)',
        transform:disabled?'none':p?'translateY(1px) scale(.98)':h?'translateY(-1px)':'none',
        boxShadow:(!disabled&&h&&['brand','green','orange','dark','danger','gold'].includes(v))?`0 6px 20px ${vr.bg}55`:'none',
        width:full?'100%':'auto',...sx}}>
      {Icon&&<Icon size={s[1]+1}/>}
      {children}
    </button>
  )
}

// ══════════════════════════════════════════════════
// ATOM: Inp
// ══════════════════════════════════════════════════
const Inp=({label,type='text',value,onChange,placeholder,req,hint,err,suffix,rows,icon:Icon,autoFocus,onKeyDown})=>{
  const[f,sF]=useState(false)
  const bd=err?C.danger:f?C.brand:C.border
  const base={width:'100%',border:`1.5px solid ${bd}`,borderRadius:10,fontSize:15,color:C.text,
    background:C.white,outline:'none',transition:'border-color .15s',fontFamily:'Inter,sans-serif',lineHeight:1.5}
  return(
    <div style={{marginBottom:20}}>
      {label&&<label style={{display:'block',fontSize:13,fontWeight:600,color:C.textMid,marginBottom:6,fontFamily:'Inter,sans-serif'}}>
        {label}{req&&<span style={{color:C.danger}}> *</span>}
      </label>}
      <div style={{position:'relative',display:'flex',alignItems:'center'}}>
        {Icon&&<Icon size={16} color={f?C.brand:C.textLt} style={{position:'absolute',left:14,pointerEvents:'none',zIndex:1}}/>}
        {rows
          ?<textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} autoFocus={autoFocus}
              onFocus={()=>sF(true)} onBlur={()=>sF(false)}
              style={{...base,padding:'13px 16px',resize:'vertical'}}/>
          :<input type={type} value={value} onChange={onChange} placeholder={placeholder}
              onFocus={()=>sF(true)} onBlur={()=>sF(false)} autoFocus={autoFocus} onKeyDown={onKeyDown}
              style={{...base,padding:Icon?'13px 16px 13px 44px':'13px 16px',paddingRight:suffix?'52px':'16px'}}/>
        }
        {suffix&&<span style={{position:'absolute',right:14,fontSize:13,fontWeight:600,color:C.textLt,pointerEvents:'none'}}>{suffix}</span>}
      </div>
      {err&&<p style={{fontSize:12,color:C.danger,marginTop:5}}>{err}</p>}
      {hint&&<p style={{fontSize:12,color:C.textLt,marginTop:5,lineHeight:1.5}}>{hint}</p>}
    </div>
  )
}

// ══════════════════════════════════════════════════
// ATOM: Sel
// ══════════════════════════════════════════════════
const Sel=({label,value,onChange,options,children,req,hint})=>{
  const[f,sF]=useState(false)
  return(
    <div style={{marginBottom:20}}>
      {label&&<label style={{display:'block',fontSize:13,fontWeight:600,color:C.textMid,marginBottom:6}}>{label}{req&&<span style={{color:C.danger}}> *</span>}</label>}
      <div style={{position:'relative'}}>
        <select value={value} onChange={onChange} onFocus={()=>sF(true)} onBlur={()=>sF(false)}
          style={{width:'100%',padding:'13px 40px 13px 16px',border:`1.5px solid ${f?C.brand:C.border}`,
            borderRadius:10,fontSize:15,color:value?C.text:C.textLt,background:C.white,
            cursor:'pointer',fontFamily:'Inter,sans-serif',outline:'none',transition:'border-color .15s'}}>
          {children||options?.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
        <ChevronDown size={16} color={C.textLt} style={{position:'absolute',right:13,top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
      </div>
      {hint&&<p style={{fontSize:12,color:C.textLt,marginTop:5}}>{hint}</p>}
    </div>
  )
}

// ══════════════════════════════════════════════════
// ATOM: Modal bottom-sheet
// ══════════════════════════════════════════════════
const Modal=({open,onClose,title,children,wide})=>{
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open])
  if(!open)return null
  return(
    <div className="anim-fadeIn" onClick={onClose}
      style={{position:'fixed',inset:0,background:'rgba(10,11,20,.8)',backdropFilter:'blur(8px)',zIndex:400,
        display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
      <div className="anim-slideUp" onClick={e=>e.stopPropagation()}
        style={{background:C.white,borderRadius:'20px 20px 0 0',width:'100%',maxWidth:wide?700:520,maxHeight:'92vh',overflowY:'auto'}}>
        <div style={{display:'flex',justifyContent:'center',padding:'14px 0 6px'}}>
          <div style={{width:40,height:4,background:C.border,borderRadius:2}}/>
        </div>
        {title&&(
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 24px 20px'}}>
            <h2 style={{fontSize:20,fontWeight:700,color:C.text,margin:0,fontFamily:'Outfit,sans-serif'}}>{title}</h2>
            <button onClick={onClose} style={{background:C.bg,border:'none',borderRadius:8,padding:8,cursor:'pointer',display:'flex'}}>
              <X size={18} color={C.textMid}/>
            </button>
          </div>
        )}
        <div style={{padding:'0 24px 40px'}}>{children}</div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// ATOM: Toggle
// ══════════════════════════════════════════════════
const Toggle=({on,onChange})=>(
  <div onClick={onChange} style={{width:44,height:24,borderRadius:12,cursor:'pointer',position:'relative',
    background:on?C.brand:C.borderDk,transition:'background .2s',flexShrink:0}}>
    <div style={{position:'absolute',top:3,left:on?21:3,width:18,height:18,borderRadius:9,
      background:'#fff',transition:'left .2s',boxShadow:'0 1px 4px rgba(0,0,0,.2)'}}/>
  </div>
)

// ══════════════════════════════════════════════════
// LANDING PAGE — Full screen, Upwork-style
// ══════════════════════════════════════════════════

export { Av, Stars, Badge, Btn, Inp, Sel, Modal, Toggle }
