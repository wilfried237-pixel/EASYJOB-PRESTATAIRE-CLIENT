import { useState } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Av, Badge } from '../../components/ui'
import { toast, useIsMobile } from '../../utils/utils.jsx'
import { PgHdr } from '../../components/layout'
import {
  FileText, CheckCircle, Clock, Download, MessageSquare, Calendar, Layers
} from 'lucide-react'

const ContractScreen=({user,data,lang,onBack})=>{
  const t=T[lang], isMobile=useIsMobile()
  const[tab,setTab]=useState('active')

  const projects=[
    {
      id:1,
      title:'Design System - Complete Overhaul',
      partner:'Fatou Diallo', av:'FD',
      status:'active',
      startDate:'2024-01-10',
      endDate:'2024-02-10',
      milestone:lang==='fr'?'Phase 1 : Composants':'Phase 1: Components',
      progress:65,
      deliverables:lang==='fr'?'UI Kit, Tokens, Documentation':'UI Kit, Tokens, Documentation',
    },
    {
      id:2,
      title:'API Development - REST',
      partner:'Moussa K.', av:'MC',
      status:'active',
      startDate:'2024-01-05',
      endDate:'2024-02-05',
      milestone:lang==='fr'?'Infrastructure backend':'Backend infrastructure',
      progress:45,
      deliverables:lang==='fr'?'Documentation API, Code source':'API Docs, Source code',
    },
    {
      id:3,
      title:'Website Redesign',
      partner:'Ibrahima Ba', av:'IB',
      status:'completed',
      startDate:'2023-12-01',
      endDate:'2024-01-15',
      milestone:lang==='fr'?'Tout livré':'All delivered',
      progress:100,
      deliverables:lang==='fr'?'5 pages, responsive mobile':'5 pages, mobile responsive',
    },
    {
      id:4,
      title:'Mobile App Frontend',
      partner:'Amara Sow', av:'AS',
      status:'completed',
      startDate:'2023-11-15',
      endDate:'2024-01-10',
      milestone:lang==='fr'?'MVP terminé':'MVP completed',
      progress:100,
      deliverables:'React Native app',
    },
  ]

  const filtered=projects.filter(p=>p.status===tab)

  const statusInfo=s=>{
    if(s==='active')    return {label:lang==='fr'?'En cours':'Active',    bg:'#1DBF7318',color:C.brand}
    if(s==='completed') return {label:lang==='fr'?'Terminé':'Completed',  bg:'#10B98118',color:'#10B981'}
    return                     {label:lang==='fr'?'Archivé':'Archived',   bg:'#FFB00018',color:'#FFB000'}
  }

  return(
    <div style={{minHeight:'100%',background:C.bg}}>
      <PgHdr title={lang==='fr'?'Projets en cours':'My Projects'} onBack={onBack}/>

      <div style={{padding:isMobile?'16px':'20px 24px'}}>
        <p style={{fontSize:13,color:C.textMid,margin:'0 0 20px',fontFamily:'Inter,sans-serif'}}>
          {lang==='fr'?'Suivi de vos collaborations en cours':'Track your ongoing collaborations'}
        </p>

        {/* Tabs */}
        <div style={{display:'flex',gap:6,marginBottom:24,background:C.white,
          border:`1px solid ${C.border}`,borderRadius:10,padding:4,width:'fit-content'}}>
          {[
            {id:'active',   label:lang==='fr'?'En cours':'Active'},
            {id:'completed',label:lang==='fr'?'Terminés':'Completed'},
            {id:'archived', label:lang==='fr'?'Archivés':'Archived'},
          ].map(tb=>(
            <button key={tb.id} onClick={()=>setTab(tb.id)}
              style={{padding:'7px 16px',borderRadius:7,border:'none',cursor:'pointer',
                fontSize:12,fontWeight:600,fontFamily:'Inter,sans-serif',transition:'all .15s',
                background:tab===tb.id?C.nuit:'transparent',
                color:tab===tb.id?'#fff':C.textMid}}>
              {tb.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{display:'grid',gap:14}}>
          {filtered.map(p=>{
            const si=statusInfo(p.status)
            return(
              <div key={p.id} style={{background:C.white,borderRadius:16,
                border:`1px solid ${C.border}`,overflow:'hidden',
                boxShadow:'0 2px 8px rgba(26,18,8,.04)'}}>

                {/* Top */}
                <div style={{padding:20,borderBottom:`1px solid ${C.border}`}}>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                    <Av code={p.av} size={44}/>
                    <div style={{flex:1}}>
                      <h3 style={{fontSize:15,fontWeight:700,color:C.text,margin:'0 0 4px',fontFamily:'Outfit,sans-serif'}}>
                        {p.title}
                      </h3>
                      <div style={{fontSize:12,color:C.textMid,marginBottom:8,fontFamily:'Inter,sans-serif'}}>
                        {lang==='fr'?'Avec':'With'} {p.partner}
                      </div>
                      <span style={{display:'inline-block',padding:'3px 10px',borderRadius:20,fontSize:11,
                        fontWeight:700,fontFamily:'Inter,sans-serif',
                        background:si.bg,color:si.color}}>
                        {si.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div style={{padding:'16px 20px',display:'grid',
                  gridTemplateColumns:isMobile?'1fr':'repeat(2,1fr)',
                  gap:14,borderBottom:`1px solid ${C.border}`}}>
                  <div>
                    <div style={{fontSize:11,color:C.textMid,fontWeight:700,fontFamily:'Inter,sans-serif',
                      textTransform:'uppercase',letterSpacing:'.06em',marginBottom:4}}>
                      {lang==='fr'?'Durée':'Duration'}
                    </div>
                    <div style={{fontSize:13,color:C.text,fontFamily:'Inter,sans-serif',
                      display:'flex',alignItems:'center',gap:5}}>
                      <Calendar size={11} color={C.safran}/>
                      {p.startDate} → {p.endDate}
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize:11,color:C.textMid,fontWeight:700,fontFamily:'Inter,sans-serif',
                      textTransform:'uppercase',letterSpacing:'.06em',marginBottom:4}}>
                      {lang==='fr'?'Étape actuelle':'Current milestone'}
                    </div>
                    <div style={{fontSize:13,color:C.text,fontFamily:'Inter,sans-serif',
                      display:'flex',alignItems:'center',gap:5}}>
                      <Layers size={11} color={C.brand}/>
                      {p.milestone}
                    </div>
                  </div>
                  <div style={{gridColumn:isMobile?undefined:'1/-1'}}>
                    <div style={{fontSize:11,color:C.textMid,fontWeight:700,fontFamily:'Inter,sans-serif',
                      textTransform:'uppercase',letterSpacing:'.06em',marginBottom:4}}>
                      {lang==='fr'?'Livrables':'Deliverables'}
                    </div>
                    <div style={{fontSize:13,color:C.text,fontFamily:'Inter,sans-serif'}}>
                      {p.deliverables}
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div style={{padding:'14px 20px',borderBottom:`1px solid ${C.border}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:12,fontFamily:'Inter,sans-serif'}}>
                    <span style={{color:C.textMid,fontWeight:600}}>
                      {lang==='fr'?'Avancement':'Progress'}
                    </span>
                    <span style={{color:p.progress===100?C.voisin:C.brand,fontWeight:700}}>
                      {p.progress}%
                    </span>
                  </div>
                  <div style={{width:'100%',height:7,borderRadius:4,background:C.border,overflow:'hidden'}}>
                    <div style={{width:`${p.progress}%`,height:'100%',borderRadius:4,transition:'all .4s',
                      background:p.progress===100?C.voisin:C.brand}}/>
                  </div>
                </div>

                {/* Actions */}
                <div style={{padding:'12px 16px',display:'flex',gap:8,
                  justifyContent:'flex-end',flexWrap:'wrap'}}>
                  {[
                    {icon:FileText,     label:lang==='fr'?'Voir':'View'},
                    {icon:MessageSquare,label:lang==='fr'?'Message':'Message'},
                    {icon:Download,     label:lang==='fr'?'Télécharger':'Download'},
                  ].map((a,i)=>(
                    <button key={i} onClick={()=>toast.success(a.label)}
                      style={{padding:'7px 12px',borderRadius:8,
                        border:`1px solid ${C.border}`,background:C.white,
                        cursor:'pointer',display:'flex',alignItems:'center',gap:6,
                        fontSize:12,color:C.textMid,fontFamily:'Inter,sans-serif',fontWeight:500}}>
                      <a.icon size={13}/>{a.label}
                    </button>
                  ))}
                  {p.status==='active'&&(
                    <button onClick={()=>toast.success(lang==='fr'?'Avancement mis à jour':'Progress updated')}
                      style={{padding:'7px 14px',borderRadius:8,background:G.brand,border:'none',
                        cursor:'pointer',display:'flex',alignItems:'center',gap:6,
                        fontSize:12,fontWeight:700,color:'#fff',fontFamily:'Inter,sans-serif'}}>
                      <CheckCircle size={13}/>{lang==='fr'?'Mettre à jour':'Update'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length===0&&(
          <div style={{textAlign:'center',padding:'60px 20px',color:C.textMid}}>
            <FileText size={40} style={{opacity:.2,margin:'0 auto 12px',display:'block'}}/>
            <div style={{fontFamily:'Inter,sans-serif',fontSize:14}}>
              {lang==='fr'?'Aucun projet dans cet onglet':'No projects in this tab'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContractScreen
