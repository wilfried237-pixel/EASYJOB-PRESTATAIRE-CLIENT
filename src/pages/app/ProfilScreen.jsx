import { C, G, T } from '../../utils/tokens'
import { Av, Badge } from '../../components/ui'
import { useIsMobile } from '../../utils/utils.jsx'
import {
  Activity, Bell, Briefcase, ChevronRight, Edit3, FileText,
  Flag, HelpCircle, Info, LogOut, MapPin, MessageSquare,
  Settings, Shield, Star, User
} from 'lucide-react'

const ProfilScreen=({user,data,lang,setSub,onLogout})=>{
  const t=T[lang]
  const isFL=user.role==='freelancer'
  const isMobile=useIsMobile()
  const flData=isFL?data.freelancers.find(f=>f.av===user.initials):null

  const clientScore=[
    user.nom,
    user.tel,
    user.email,
    user.country||user.city,
    user.address,
    user.idNumber,
  ].filter(Boolean).length

  const stats=isFL?[
    [flData?.missions||0,lang==='fr'?'Missions':'Jobs'],
    [flData?.note||'-',lang==='fr'?'Note':'Rating'],
    [flData?.avis||0,lang==='fr'?'Avis':'Reviews'],
  ]:[
    [data.myJobs.length,lang==='fr'?'Missions':'Jobs'],
    [data.convs.length,lang==='fr'?'Contacts':'Contacts'],
    [`${Math.round(clientScore/6*100)}%`,lang==='fr'?'Identite':'Identity'],
  ]

  const menuItems=isFL?[
    {icon:Edit3,fr:'Editer le profil',en:'Edit profile',action:()=>setSub('edit-profil')},
    {icon:Briefcase,fr:'Mes missions',en:'My jobs',action:()=>setSub('mes-missions')},
    {icon:Flag,fr:'Signalements',en:'Reports',action:()=>setSub('litiges')},
    {icon:Star,fr:'Mes avis',en:'My reviews',action:()=>setSub('reviews')},
  ]:[
    {icon:Edit3,fr:'Editer mes informations',en:'Edit my details',action:()=>setSub('edit-profil')},
    {icon:FileText,fr:'Mes missions publiees',en:'My posted jobs',action:()=>setSub('mes-missions')},
    {icon:Shield,fr:'Verification identite',en:'Identity verification',action:()=>setSub('edit-profil')},
    {icon:Flag,fr:'Signalements',en:'Reports',action:()=>setSub('litiges')},
    {icon:Star,fr:'Mes avis',en:'My reviews',action:()=>setSub('reviews')},
  ]

  return(
    <div style={{height:'100%',overflowY:'auto',background:C.bg}}>
      <div style={{background:G.hero,padding:isMobile?'28px 20px 48px':'36px 40px 56px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:`radial-gradient(${C.brand} 1px,transparent 1px)`,backgroundSize:'28px 28px'}}/>
        <div style={{maxWidth:900,margin:'0 auto',position:'relative'}}>
          <div style={{display:'flex',gap:20,alignItems:'center',flexWrap:'wrap'}}>
            <Av code={user.initials||user.av} size={80}/>
            <div style={{flex:1}}>
              <h1 style={{fontSize:28,fontWeight:900,color:'#fff',margin:'0 0 4px',fontFamily:'Outfit,sans-serif'}}>{user.nom}</h1>
              <div style={{fontSize:14,color:'rgba(255,255,255,.55)',marginBottom:8,fontFamily:'Inter,sans-serif'}}>
                {isFL?(lang==='fr'?'Prestataire':'Provider'):'Client'} · {user.email}
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {user.verifie
                  ?<span style={{background:'rgba(29,191,115,.18)',color:C.brand,fontSize:12,fontWeight:700,padding:'4px 10px',borderRadius:20,fontFamily:'Inter,sans-serif'}}>✓ {t.verified}</span>
                  :<span style={{background:'rgba(245,166,35,.18)',color:C.gold,fontSize:12,fontWeight:700,padding:'4px 10px',borderRadius:20,fontFamily:'Inter,sans-serif'}}>
                    {user.verificationStatus==='pending'
                      ?(lang==='fr'?'Piece recue, verification 24h':'File received, 24h review')
                      :(lang==='fr'?'Verification en attente':'Verification pending')}
                  </span>}
                {flData?.badge&&<Badge type={flData.badge}>{flData.badge==='top'?'Top':'Pro'}</Badge>}
              </div>
            </div>
          </div>

          {!isFL&&(
            <div style={{marginTop:22,background:'rgba(255,255,255,.06)',borderRadius:14,padding:'14px 18px',border:'1px solid rgba(255,255,255,.08)'}}>
              <div style={{display:'flex',alignItems:'center',gap:8,color:'rgba(255,255,255,.7)',fontSize:13,fontFamily:'Inter,sans-serif'}}>
                <MapPin size={14} color={C.safran}/>
                {user.district||user.city||(lang==='fr'?'Quartier non renseigne':'District not set')}
              </div>
              <div style={{height:6,background:'rgba(255,255,255,.1)',borderRadius:3,overflow:'hidden',marginTop:10}}>
                <div style={{width:`${Math.round(clientScore/6*100)}%`,height:'100%',background:G.safran,borderRadius:3}}/>
              </div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.35)',marginTop:6,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Completez vos infos pour rassurer les prestataires.':'Complete your details to reassure providers.'}
              </div>
            </div>
          )}
          {!isFL&&(
            <div style={{marginTop:14,background:C.white,borderRadius:16,padding:16,border:`1px solid ${C.border}`,boxShadow:'0 4px 14px rgba(0,0,0,.04)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10,flexWrap:'wrap'}}>
                <div>
                  <div style={{fontSize:11,fontWeight:800,color:C.safranDk,fontFamily:'Inter,sans-serif',textTransform:'uppercase'}}>
                    {lang==='fr'?'Passeport confiance Afrique':'Africa trust passport'}
                  </div>
                  <div style={{fontSize:16,fontWeight:900,color:C.text,fontFamily:'Outfit,sans-serif',marginTop:4}}>
                    {lang==='fr'?'Votre profil de confiance':'Your trust profile'}
                  </div>
                </div>
                <Badge type={user.verifie?'verified':'default'} sm>{user.verifie?(lang==='fr'?'Verifie':'Verified'):(lang==='fr'?'A completer':'To complete')}</Badge>
              </div>
              <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:10,marginTop:14}}>
                {[
                  {label:lang==='fr'?'Identite':'Identity',value:user.idType||'-'},
                  {label:lang==='fr'?'Quartier':'District',value:user.district||user.city||'-'},
                  {label:lang==='fr'?'Preuves':'Proofs',value:[user.idNumber,user.address].filter(Boolean).length.toString()},
                ].map(item=>(
                  <div key={item.label} style={{background:C.bg,borderRadius:12,padding:'12px 14px',border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.textLt,fontFamily:'Inter,sans-serif',textTransform:'uppercase'}}>
                      {item.label}
                    </div>
                    <div style={{fontSize:15,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif',marginTop:6}}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:12,fontSize:12,color:C.textMid,fontFamily:'Inter,sans-serif',lineHeight:1.6}}>
                {lang==='fr'
                  ?"Le client montre ce qu'il est: identite, quartier, adresse et pieces."
                  :'The client shows who they are: identity, district, address and documents.'}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{maxWidth:900,margin:'-20px auto 0',padding:'0 20px',position:'relative',zIndex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:20}}>
          {stats.map(([v,l])=>(
            <div key={l} style={{background:C.white,borderRadius:14,padding:'16px 12px',textAlign:'center',border:`1px solid ${C.border}`,boxShadow:'0 4px 16px rgba(0,0,0,.04)'}}>
              <div style={{fontSize:22,fontWeight:900,color:C.text,fontFamily:'Outfit,sans-serif'}}>{v}</div>
              <div style={{fontSize:11,color:C.textLt,marginTop:3,fontFamily:'Inter,sans-serif'}}>{l}</div>
            </div>
          ))}
        </div>

        {!isFL&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,padding:16,marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif',marginBottom:10}}>
              {lang==='fr'?'Infos client importantes':'Important client details'}
            </div>
            {[
              [lang==='fr'?'Telephone':'Phone',user.tel||'-'],
              [lang==='fr'?'Ville / quartier':'City / district',[user.city,user.district].filter(Boolean).join(', ')||'-'],
              [lang==='fr'?'Adresse':'Address',user.address||'-'],
              [lang==='fr'?'Piece':'ID document',user.idDoc
                ?`${user.idType||'-'} · ${lang==='fr'?'reçue':'received'}`
                :(user.idType||'-')],
            ].map(([label,value])=>(
              <div key={label} style={{display:'flex',justifyContent:'space-between',gap:12,padding:'8px 0',borderBottom:`1px solid ${C.border}`,fontSize:13}}>
                <span style={{color:C.textLt}}>{label}</span>
                <span style={{fontWeight:600,color:C.text,textAlign:'right'}}>{value}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:16}}>
          {menuItems.map((item,i)=>(
            <button key={item.fr} onClick={item.action}
              style={{display:'flex',alignItems:'center',gap:14,width:'100%',padding:'15px 18px',
                border:'none',borderBottom:i<menuItems.length-1?`1px solid ${C.border}`:'none',
                background:C.white,cursor:'pointer',textAlign:'left',transition:'background .12s'}}
              onMouseEnter={e=>e.currentTarget.style.background=C.bg}
              onMouseLeave={e=>e.currentTarget.style.background=C.white}>
              <div style={{width:36,height:36,borderRadius:10,background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <item.icon size={16} color={C.textMid}/>
              </div>
              <span style={{flex:1,fontSize:14,fontWeight:500,color:C.text,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?item.fr:item.en}
              </span>
              <ChevronRight size={15} color={C.textLt}/>
            </button>
          ))}
        </div>

        <button onClick={onLogout} style={{display:'flex',alignItems:'center',gap:12,width:'100%',
          padding:'14px 18px',borderRadius:14,border:`1px solid ${C.danger}22`,
          background:C.dangerLt,cursor:'pointer',marginBottom:24,
          fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:14,color:C.danger}}>
          <LogOut size={17} color={C.danger}/>
          {t.logout}
        </button>
        {isMobile&&<div style={{height:72}}/>}
      </div>
    </div>
  )
}

export { ProfilScreen }
