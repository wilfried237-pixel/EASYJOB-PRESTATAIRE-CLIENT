import { useState } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Av, Badge } from '../../components/ui'
import { useIsMobile, fmt } from '../../utils/utils.jsx'
import { FLS, MISSIONS, CATS } from '../../data/mockData'
import {
  ChevronLeft, Users, Briefcase, MessageSquare, Shield,
  TrendingUp, CheckCircle, Clock, AlertTriangle, Search,
  BarChart2, Eye, X, Check, Flag, Activity, DollarSign,
  ChevronRight, Filter, MoreVertical, UserCheck, Star
} from 'lucide-react'

const MOCK_LITIGES = [
  {id:1,missionTitle:'Site e-commerce Mobile Money',client:{nom:'StartupCI',av:'SC'},fl:{nom:'Awa Traoré',av:'AT'},
   montant:850000,date:'Il y a 2h',motif:'Travail non conforme au cahier des charges',statut:'ouvert',priority:'high'},
  {id:2,missionTitle:'Logo Restaurant Dakar',client:{nom:'Resto Dakar',av:'RD'},fl:{nom:'Fatou Diallo',av:'FD'},
   montant:150000,date:'Il y a 1j',motif:'Délai non respecté, prestataire injoignable',statut:'en_traitement',priority:'medium'},
  {id:3,missionTitle:'Gestion réseaux sociaux 3 mois',client:{nom:'BrandMa',av:'BM'},fl:{nom:'Kofi Asante',av:'KA'},
   montant:300000,date:'Il y a 3j',motif:'Résultats non satisfaisants, métriques non atteintes',statut:'resolu',priority:'low'},
]

const MOCK_USERS = [
  ...FLS.slice(0,6).map(f=>({...f,role:'freelancer',email:`${f.nom.toLowerCase().replace(' ','.')}@email.com`,joinDate:'Mars 2026',statut:'actif'})),
  {id:101,nom:'Marie Koné',av:'MK',role:'client',email:'marie.kone@startup.ci',joinDate:'Avril 2026',statut:'actif',note:4.9},
  {id:102,nom:'Resto Dakar',av:'RD',role:'client',email:'contact@restodakar.sn',joinDate:'Avril 2026',statut:'actif',note:4.7},
  {id:103,nom:'BrandMa',av:'BM',role:'client',email:'info@brandma.ma',joinDate:'Mai 2026',statut:'suspendu',note:4.8},
]

const STATS=[
  {label:{fr:'Utilisateurs',en:'Users'},val:'1 247',sub:{fr:'+23 cette semaine',en:'+23 this week'},icon:Users,color:C.brand,bg:C.brandLt},
  {label:{fr:'Missions actives',en:'Active missions'},val:'384',sub:{fr:'8 urgentes',en:'8 urgent'},icon:Briefcase,color:C.orange,bg:C.orangeLt},
  {label:{fr:'Litiges ouverts',en:'Open disputes'},val:'12',sub:{fr:'3 prioritaires',en:'3 priority'},icon:AlertTriangle,color:C.danger,bg:C.dangerLt},
  {label:{fr:'Revenus (30j)',en:'Revenue (30d)'},val:'4.2M FCFA',sub:{fr:'Commissions 10%',en:'10% commissions'},icon:TrendingUp,color:C.indigo,bg:C.indigoLt},
]

const AdminScreen=({onBack,lang,data,setData,addLog})=>{
  const t=T[lang]
  const isMobile=useIsMobile()
  const[tab,setTab]=useState('dashboard')
  const[search,setSearch]=useState('')
  const[selLitige,setSelLitige]=useState(null)
  const[userFilter,setUserFilter]=useState('all')

  const tabs=[
    {id:'dashboard',fr:'Dashboard',en:'Dashboard',icon:BarChart2},
    {id:'missions',fr:'Missions',en:'Missions',icon:Briefcase},
    {id:'users',fr:'Utilisateurs',en:'Users',icon:Users},
    {id:'litiges',fr:'Litiges',en:'Disputes',icon:Flag},
  ]

  const resolveLitige=(id,decision)=>{
    setData(d=>({...d}))
    addLog('admin',`Litige #${id} résolu — ${decision}`,`Dispute #${id} resolved — ${decision}`)
    setSelLitige(null)
  }

  const filteredMissions=MISSIONS.filter(m=>
    !search||(m.titreF+m.titre).toLowerCase().includes(search.toLowerCase())
  )
  const filteredUsers=MOCK_USERS.filter(u=>{
    const matchSearch=!search||u.nom.toLowerCase().includes(search.toLowerCase())
    const matchRole=userFilter==='all'||u.role===userFilter
    return matchSearch&&matchRole
  })

  const Header=()=>(
    <div style={{background:G.dark,padding:isMobile?'20px 16px':'24px 32px',display:'flex',alignItems:'center',gap:16}}>
      <button onClick={onBack} style={{background:'rgba(255,255,255,.1)',border:'none',borderRadius:8,
        width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>
        <ChevronLeft size={18} color="#fff"/>
      </button>
      <div style={{flex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <Shield size={18} color={C.brand}/>
          <span style={{fontSize:18,fontWeight:800,color:'#fff',fontFamily:'Outfit,sans-serif'}}>
            Admin {lang==='fr'?'— Espace modération':'— Moderation Panel'}
          </span>
        </div>
        <p style={{fontSize:12,color:'rgba(255,255,255,.4)',margin:'2px 0 0',fontFamily:'Inter,sans-serif'}}>
          EasyJob Control Center
        </p>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(255,77,87,.15)',
        border:'1px solid rgba(255,77,87,.3)',borderRadius:8,padding:'6px 12px'}}>
        <div style={{width:7,height:7,borderRadius:'50%',background:C.danger,boxShadow:`0 0 6px ${C.danger}`}}/>
        <span style={{fontSize:11,fontWeight:700,color:C.danger,fontFamily:'Inter,sans-serif'}}>
          {lang==='fr'?'12 litiges':'12 disputes'}
        </span>
      </div>
    </div>
  )

  const Tabs=()=>(
    <div style={{display:'flex',gap:4,padding:'12px 16px',background:C.white,
      borderBottom:`1px solid ${C.border}`,overflowX:'auto'}}>
      {tabs.map(tb=>{
        const Icon=tb.icon
        const active=tab===tb.id
        return(
          <button key={tb.id} onClick={()=>setTab(tb.id)}
            style={{display:'flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:8,
              background:active?C.brandLt:'transparent',border:`1.5px solid ${active?C.brand:'transparent'}`,
              cursor:'pointer',whiteSpace:'nowrap',transition:'all .15s'}}>
            <Icon size={14} color={active?C.brand:C.textLt}/>
            <span style={{fontSize:13,fontWeight:600,color:active?C.brand:C.textMid,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?tb.fr:tb.en}
            </span>
          </button>
        )
      })}
    </div>
  )

  const renderDashboard=()=>(
    <div style={{padding:isMobile?16:24}}>
      <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)',gap:12,marginBottom:24}}>
        {STATS.map((s,i)=>{
          const Icon=s.icon
          return(
            <div key={i} style={{background:C.white,borderRadius:14,padding:'18px 16px',
              border:`1px solid ${C.border}`,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div style={{width:38,height:38,borderRadius:10,background:s.bg,
                  display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Icon size={18} color={s.color}/>
                </div>
                <ChevronRight size={14} color={C.textLt}/>
              </div>
              <div>
                <div style={{fontSize:24,fontWeight:900,color:C.text,fontFamily:'Outfit,sans-serif',letterSpacing:'-.5px'}}>{s.val}</div>
                <div style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif',marginTop:2}}>{lang==='fr'?s.label.fr:s.label.en}</div>
              </div>
              <div style={{fontSize:11,color:s.color,fontWeight:600,fontFamily:'Inter,sans-serif'}}>{lang==='fr'?s.sub.fr:s.sub.en}</div>
            </div>
          )
        })}
      </div>

      <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:16}}>
        <div style={{background:C.white,borderRadius:14,padding:20,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:16,fontFamily:'Outfit,sans-serif',
            display:'flex',alignItems:'center',gap:8}}>
            <Flag size={15} color={C.danger}/> {lang==='fr'?'Litiges prioritaires':'Priority Disputes'}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {MOCK_LITIGES.filter(l=>l.statut!=='resolu').map(l=>(
              <div key={l.id} onClick={()=>setSelLitige(l)}
                style={{display:'flex',gap:12,alignItems:'center',padding:'10px 12px',
                  borderRadius:10,border:`1px solid ${C.border}`,cursor:'pointer',
                  background:C.bg,transition:'all .15s'}}>
                <div style={{width:8,height:8,borderRadius:'50%',flexShrink:0,
                  background:l.priority==='high'?C.danger:l.priority==='medium'?C.orange:C.brand}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.text,fontFamily:'Inter,sans-serif',
                    overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{l.missionTitle}</div>
                  <div style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif',marginTop:1}}>
                    {fmt(l.montant)} FCFA · {l.date}
                  </div>
                </div>
                <Badge type={l.statut==='ouvert'?'urgent':'en_attente'} sm>{lang==='fr'?l.statut.replace('_',' '):l.statut}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:C.white,borderRadius:14,padding:20,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:16,fontFamily:'Outfit,sans-serif',
            display:'flex',alignItems:'center',gap:8}}>
            <Activity size={15} color={C.brand}/> {lang==='fr'?'Missions récentes':'Recent Missions'}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {MISSIONS.slice(0,4).map(m=>{
              const cat=CATS.find(c=>c.id===m.catId)
              return(
                <div key={m.id} style={{display:'flex',gap:10,alignItems:'center',padding:'8px 0',
                  borderBottom:`1px solid ${C.border}`}}>
                  <span style={{fontSize:20}}>{cat?.emoji||'💼'}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:600,color:C.text,fontFamily:'Inter,sans-serif',
                      overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.titreF}</div>
                    <div style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif'}}>{m.props} propositions</div>
                  </div>
                  <Badge type={m.urgent?'urgent':'ouverte'} sm>{m.urgent?'Urgente':'Ouverte'}</Badge>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  const renderMissions=()=>(
    <div style={{padding:isMobile?16:24}}>
      <div style={{display:'flex',gap:10,marginBottom:16}}>
        <div style={{flex:1,display:'flex',alignItems:'center',gap:8,background:C.white,
          borderRadius:10,padding:'0 14px',border:`1px solid ${C.border}`}}>
          <Search size={14} color={C.textLt}/>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder={lang==='fr'?'Rechercher une mission...':'Search missions...'}
            style={{flex:1,border:'none',outline:'none',fontSize:13,fontFamily:'Inter,sans-serif',
              color:C.text,background:'transparent',padding:'10px 0'}}/>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {filteredMissions.map(m=>{
          const cat=CATS.find(c=>c.id===m.catId)
          return(
            <div key={m.id} style={{background:C.white,borderRadius:12,padding:'14px 16px',
              border:`1px solid ${C.border}`,display:'flex',gap:12,alignItems:'center'}}>
              <span style={{fontSize:24,flexShrink:0}}>{cat?.emoji||'💼'}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:4}}>
                  <span style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:'Inter,sans-serif'}}>{m.titreF}</span>
                  {m.urgent&&<Badge type="urgent" sm>Urgent</Badge>}
                </div>
                <div style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif'}}>
                  {m.client.nom} · {m.props} propositions · {m.postedAt}
                </div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{fontSize:12,fontWeight:700,color:C.brand,fontFamily:'Outfit,sans-serif'}}>
                  {m.budget.type==='fixed'?fmt(m.budget.min):`${fmt(m.budget.min)}–${fmt(m.budget.max)}`}
                </div>
                <div style={{fontSize:10,color:C.textLt,fontFamily:'Inter,sans-serif'}}>FCFA</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderUsers=()=>(
    <div style={{padding:isMobile?16:24}}>
      <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:200,display:'flex',alignItems:'center',gap:8,background:C.white,
          borderRadius:10,padding:'0 14px',border:`1px solid ${C.border}`}}>
          <Search size={14} color={C.textLt}/>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder={lang==='fr'?'Rechercher un utilisateur...':'Search users...'}
            style={{flex:1,border:'none',outline:'none',fontSize:13,fontFamily:'Inter,sans-serif',
              color:C.text,background:'transparent',padding:'10px 0'}}/>
        </div>
        {['all','client','freelancer'].map(f=>(
          <button key={f} onClick={()=>setUserFilter(f)}
            style={{padding:'8px 14px',borderRadius:8,border:`1.5px solid ${userFilter===f?C.brand:C.border}`,
              background:userFilter===f?C.brandLt:C.white,cursor:'pointer',
              fontSize:12,fontWeight:600,color:userFilter===f?C.brand:C.textMid,fontFamily:'Inter,sans-serif'}}>
            {f==='all'?(lang==='fr'?'Tous':'All'):f==='client'?'Clients':(lang==='fr'?'Freelances':'Freelancers')}
          </button>
        ))}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {filteredUsers.map(u=>(
          <div key={u.id} style={{background:C.white,borderRadius:12,padding:'12px 16px',
            border:`1px solid ${C.border}`,display:'flex',gap:12,alignItems:'center'}}>
            <Av code={u.av||u.initials} size={40}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:2}}>
                <span style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:'Inter,sans-serif'}}>{u.nom}</span>
                {u.verifie&&<CheckCircle size={12} color={C.brand}/>}
              </div>
              <div style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif'}}>
                {u.email||'—'} · {lang==='fr'?'Inscrit':'Joined'} {u.joinDate}
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6}}>
              <Badge type={u.role==='freelancer'?'ouverte':'en_cours'} sm>
                {u.role==='freelancer'?(lang==='fr'?'Freelance':'Freelancer'):'Client'}
              </Badge>
              {u.statut==='suspendu'&&<Badge type="refusee" sm>Suspendu</Badge>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderLitiges=()=>(
    <div style={{padding:isMobile?16:24}}>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {MOCK_LITIGES.map(l=>(
          <div key={l.id} style={{background:C.white,borderRadius:14,padding:'16px',
            border:`1px solid ${l.statut==='ouvert'?C.danger:l.statut==='en_traitement'?C.orange:C.border}`}}>
            <div style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:12}}>
              <div style={{width:10,height:10,borderRadius:'50%',marginTop:4,flexShrink:0,
                background:l.priority==='high'?C.danger:l.priority==='medium'?C.orange:C.success}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:'Inter,sans-serif',marginBottom:4}}>
                  {l.missionTitle}
                </div>
                <div style={{fontSize:12,color:C.textMid,fontFamily:'Inter,sans-serif',lineHeight:1.5,marginBottom:8}}>
                  {l.motif}
                </div>
                <div style={{display:'flex',gap:16,fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif',flexWrap:'wrap'}}>
                  <span>💰 {fmt(l.montant)} FCFA</span>
                  <span>🕒 {l.date}</span>
                </div>
              </div>
              <Badge type={l.statut==='ouvert'?'urgent':l.statut==='resolu'?'terminee':'en_attente'} sm>
                {l.statut.replace('_',' ')}
              </Badge>
            </div>
            <div style={{display:'flex',gap:10,alignItems:'center',padding:'10px 0 0',
              borderTop:`1px solid ${C.border}`}}>
              <div style={{flex:1,display:'flex',gap:10,alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <Av code={l.client.av} size={24}/>
                  <span style={{fontSize:11,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                    {lang==='fr'?'Client:':'Client:'} <strong>{l.client.nom}</strong>
                  </span>
                </div>
                <span style={{color:C.textLt,fontSize:11}}>vs</span>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <Av code={l.fl.av} size={24}/>
                  <span style={{fontSize:11,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                    <strong>{l.fl.nom}</strong>
                  </span>
                </div>
              </div>
              {l.statut!=='resolu'&&(
                <div style={{display:'flex',gap:8}}>
                  <Btn v="danger" sz="xs" onClick={()=>resolveLitige(l.id,'remboursement_client')}>
                    <X size={12}/> {lang==='fr'?'Client':'Client'}
                  </Btn>
                  <Btn v="brand" sz="xs" onClick={()=>resolveLitige(l.id,'resolution_prestataire')}>
                    <Check size={12}/> {lang==='fr'?'Freelance':'Freelancer'}
                  </Btn>
                </div>
              )}
              {l.statut==='resolu'&&(
                <Badge type="terminee" sm>✓ {lang==='fr'?'Résolu':'Resolved'}</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg,overflowY:'hidden'}}>
      <Header/>
      <Tabs/>
      <div style={{flex:1,overflowY:'auto'}}>
        {tab==='dashboard'&&renderDashboard()}
        {tab==='missions'&&renderMissions()}
        {tab==='users'&&renderUsers()}
        {tab==='litiges'&&renderLitiges()}
      </div>
    </div>
  )
}

export default AdminScreen
