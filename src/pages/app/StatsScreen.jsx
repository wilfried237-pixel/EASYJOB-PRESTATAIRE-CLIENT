import { useState } from 'react'
import { C, G, T } from '../../utils/tokens'
import { useIsMobile } from '../../utils/utils.jsx'
import { PgHdr } from '../../components/layout'
import {
  TrendingUp, Users, Briefcase, MessageSquare, Eye,
  BarChart2, PieChart, ArrowUp, Download, Star, CheckCircle, Send
} from 'lucide-react'

const StatsScreen=({data,lang,onBack})=>{
  const t=T[lang], isMobile=useIsMobile()
  const[period,setPeriod]=useState('month')

  const stats={
    profileViews: 84,
    applications: data.proposals?.length||7,
    responseRate: 92,
    contactsInitiated: 31,
    completedProjects: 18,
    avgResponseTime: '< 2h',
  }

  const monthlyData=[
    {month:'Jan',contacts:4,  applications:2},
    {month:'Fév',contacts:7,  applications:4},
    {month:'Mar',contacts:11, applications:6},
    {month:'Avr',contacts:9,  applications:5},
    {month:'Mai',contacts:16, applications:8},
    {month:'Jun',contacts:21, applications:11},
    {month:'Jul',contacts:28, applications:15},
    {month:'Aoû',contacts:19, applications:9},
  ]

  const catData=[
    {name:lang==='fr'?'Développement':'Development', percent:38, color:C.brand},
    {name:lang==='fr'?'Design':'Design',              percent:24, color:C.safran},
    {name:lang==='fr'?'Marketing':'Marketing',        percent:18, color:C.orange},
    {name:lang==='fr'?'Coiffure / Beauté':'Hair & Beauty', percent:12, color:'#E91E63'},
    {name:lang==='fr'?'Autre':'Other',                percent:8,  color:C.textLt},
  ]

  const maxVal=Math.max(...monthlyData.map(d=>d.contacts))

  return(
    <div style={{minHeight:'100%',background:C.bg}}>
      <PgHdr title={lang==='fr'?'Statistiques':'Statistics'} onBack={onBack}
        right={
          <button style={{padding:'6px 12px',borderRadius:8,border:`1px solid ${C.border}`,
            background:C.white,cursor:'pointer',display:'flex',alignItems:'center',gap:6,fontSize:12,
            color:C.textMid,fontFamily:'Inter,sans-serif'}}>
            <Download size={13}/>{lang==='fr'?'Exporter':'Export'}
          </button>
        }/>

      <div style={{padding:isMobile?'16px':'20px 24px'}}>
        <p style={{fontSize:13,color:C.textMid,margin:'0 0 20px',fontFamily:'Inter,sans-serif'}}>
          {lang==='fr'?'Vos activités et performances EasyJob':'Your EasyJob activity & performance'}
        </p>

        {/* Period selector */}
        <div style={{display:'flex',gap:6,marginBottom:24,background:C.white,
          border:`1px solid ${C.border}`,borderRadius:10,padding:4,width:'fit-content'}}>
          {['week','month','year'].map(p=>(
            <button key={p} onClick={()=>setPeriod(p)}
              style={{padding:'6px 14px',borderRadius:7,border:'none',cursor:'pointer',
                fontSize:12,fontWeight:600,fontFamily:'Inter,sans-serif',transition:'all .15s',
                background:period===p?C.nuit:'transparent',
                color:period===p?'#fff':C.textMid}}>
              {lang==='fr'?p==='week'?'Semaine':p==='month'?'Mois':'Année'
                          :p==='week'?'Week':p==='month'?'Month':'Year'}
            </button>
          ))}
        </div>

        {/* KPI cards */}
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr 1fr':'repeat(3,1fr)',gap:14,marginBottom:28}}>
          {[
            {icon:Eye,       label:lang==='fr'?'Profils consultés':'Profile views',
             value:stats.profileViews, sub:'+12% '+( lang==='fr'?'cette semaine':'this week'), color:C.brand},
            {icon:Send,      label:lang==='fr'?'Candidatures envoyées':'Applications sent',
             value:stats.applications, sub:lang==='fr'?'missions postulées':'missions applied', color:C.safran},
            {icon:CheckCircle,label:lang==='fr'?'Taux de réponse':'Response rate',
             value:`${stats.responseRate}%`, sub:lang==='fr'?'messages répondus':'messages answered', color:C.voisin},
          ].map((k,i)=>(
            <div key={i} style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,padding:18}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <div style={{fontSize:11,color:C.textMid,fontWeight:600,fontFamily:'Inter,sans-serif',marginBottom:8}}>
                    {k.label}
                  </div>
                  <div style={{fontSize:28,fontWeight:800,color:k.color,fontFamily:'Outfit,sans-serif'}}>
                    {k.value}
                  </div>
                  <div style={{fontSize:11,color:C.textLt,marginTop:6,fontFamily:'Inter,sans-serif'}}>
                    {k.sub}
                  </div>
                </div>
                <k.icon size={22} color={k.color} style={{opacity:.25}}/>
              </div>
            </div>
          ))}
        </div>

        {/* Charts grid */}
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'2fr 1fr',gap:18,marginBottom:24}}>

          {/* Activity chart */}
          <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,padding:22}}>
            <h3 style={{fontSize:14,fontWeight:700,color:C.text,margin:'0 0 18px',
              display:'flex',gap:8,alignItems:'center',fontFamily:'Outfit,sans-serif'}}>
              <BarChart2 size={15} color={C.brand}/>
              {lang==='fr'?'Activité mensuelle':'Monthly activity'}
            </h3>

            <div style={{display:'flex',alignItems:'flex-end',gap:5,height:160,marginBottom:14}}>
              {monthlyData.map((d,i)=>{
                const h=(d.contacts/maxVal)*140
                const ha=(d.applications/maxVal)*140
                return(
                  <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                    <div style={{width:'100%',display:'flex',gap:2,alignItems:'flex-end',height:140}}>
                      <div style={{flex:1,height:h,background:C.brand,borderRadius:'3px 3px 0 0',opacity:.7}}/>
                      <div style={{flex:1,height:ha,background:C.safran,borderRadius:'3px 3px 0 0',opacity:.7}}/>
                    </div>
                    <div style={{fontSize:9,color:C.textLt,fontFamily:'Inter,sans-serif'}}>
                      {d.month.slice(0,3)}
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{display:'flex',gap:16,paddingTop:12,borderTop:`1px solid ${C.border}`,fontSize:11}}>
              <div style={{display:'flex',alignItems:'center',gap:5}}>
                <div style={{width:10,height:10,borderRadius:2,background:C.brand,opacity:.7}}/>
                <span style={{color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                  {lang==='fr'?'Contacts':'Contacts'}
                </span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:5}}>
                <div style={{width:10,height:10,borderRadius:2,background:C.safran,opacity:.7}}/>
                <span style={{color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                  {lang==='fr'?'Candidatures':'Applications'}
                </span>
              </div>
              <div style={{flex:1,textAlign:'right',color:C.textLt,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Moy. contacts/mois :':'Avg. contacts/mo:'}{' '}
                <strong style={{color:C.text}}>
                  {Math.round(monthlyData.reduce((s,d)=>s+d.contacts,0)/monthlyData.length)}
                </strong>
              </div>
            </div>
          </div>

          {/* Category breakdown */}
          <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,padding:22}}>
            <h3 style={{fontSize:14,fontWeight:700,color:C.text,margin:'0 0 18px',
              display:'flex',gap:8,alignItems:'center',fontFamily:'Outfit,sans-serif'}}>
              <PieChart size={15} color={C.brand}/>
              {lang==='fr'?'Catégories recherchées':'Top categories'}
            </h3>

            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {catData.map((c,i)=>(
                <div key={i}>
                  <div style={{display:'flex',justifyContent:'space-between',
                    fontSize:12,marginBottom:5,fontFamily:'Inter,sans-serif'}}>
                    <span style={{color:C.text,fontWeight:500}}>{c.name}</span>
                    <span style={{color:C.textMid,fontWeight:600}}>{c.percent}%</span>
                  </div>
                  <div style={{width:'100%',height:6,borderRadius:3,background:C.border}}>
                    <div style={{width:`${c.percent}%`,height:'100%',background:c.color,borderRadius:3}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent contacts */}
        <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,padding:22}}>
          <h3 style={{fontSize:14,fontWeight:700,color:C.text,margin:'0 0 16px',fontFamily:'Outfit,sans-serif'}}>
            {lang==='fr'?'Prestataires récemment contactés':'Recently contacted providers'}
          </h3>
          <div style={{display:'grid',gap:10}}>
            {[
              {nom:'Fatou Diallo',   metier:lang==='fr'?'UX/UI Designer':'UX/UI Designer',  note:5.0, av:'FD'},
              {nom:'Moussa Coulibaly',metier:lang==='fr'?'Plombier':'Plumber',               note:4.8, av:'MC'},
              {nom:'Awa Traoré',     metier:lang==='fr'?'Dev Full-Stack':'Full-Stack Dev',   note:4.9, av:'AT'},
            ].map((f,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',
                alignItems:'center',padding:'10px 14px',background:C.bg,borderRadius:10}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:34,height:34,borderRadius:17,background:C.brand,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:13,fontWeight:700,color:'#fff',fontFamily:'Outfit,sans-serif'}}>
                    {f.av}
                  </div>
                  <div>
                    <div style={{fontWeight:600,color:C.text,fontSize:13,fontFamily:'Outfit,sans-serif'}}>{f.nom}</div>
                    <div style={{fontSize:11,color:C.textMid,fontFamily:'Inter,sans-serif'}}>{f.metier}</div>
                  </div>
                </div>
                <div style={{fontSize:13,fontWeight:700,color:C.gold}}>{f.note}⭐</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsScreen
