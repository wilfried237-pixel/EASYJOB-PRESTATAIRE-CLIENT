import { C } from '../../utils/tokens'
import { Btn, Badge } from '../../components/ui'
import { useIsMobile } from '../../utils/utils.jsx'
import {
  ArrowLeft, Briefcase, CheckCircle, Eye, MessageSquare, Star, TrendingUp, Zap
} from 'lucide-react'

const StatCard=({icon:Icon,label,value,sub,color})=>(
  <div style={{background:C.white,borderRadius:12,padding:20,border:`1px solid ${C.border}`}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
      <div>
        <div style={{fontSize:13,color:C.textMid,fontWeight:600,marginBottom:6}}>{label}</div>
        <div style={{fontSize:28,fontWeight:800,color,fontFamily:'Outfit,sans-serif'}}>{value}</div>
      </div>
      <div style={{width:40,height:40,borderRadius:8,background:color+'18',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Icon size={20} color={color}/>
      </div>
    </div>
    <div style={{fontSize:12,color:C.textMid}}>{sub}</div>
  </div>
)

const DashboardScreen=({user,data,lang,onBack,setSub,setPage})=>{
  const isMobile=useIsMobile()
  const isFreelancer=user?.role==='freelancer'
  const jobs=data?.myJobs||[]
  const proposals=data?.proposals||[]
  const convs=data?.convs||[]

  const clientStats=[
    {icon:Briefcase,label:lang==='fr'?'Missions publiees':'Jobs posted',value:jobs.length,sub:lang==='fr'?'besoins crees':'needs created',color:C.brand},
    {icon:Zap,label:lang==='fr'?'Missions ouvertes':'Open jobs',value:jobs.filter(j=>j.status==='ouverte').length,sub:lang==='fr'?'visibles aux prestataires':'visible to providers',color:C.safran},
    {icon:TrendingUp,label:lang==='fr'?'Propositions recues':'Received proposals',value:proposals.length,sub:lang==='fr'?'a comparer':'to compare',color:C.orange},
    {icon:MessageSquare,label:'Messages',value:convs.length,sub:lang==='fr'?'conversations ouvertes':'open conversations',color:C.voisin},
  ]

  const freelancerStats=[
    {icon:Eye,label:lang==='fr'?'Profil consulte':'Profile views',value:142,sub:'+12% '+(lang==='fr'?'ce mois':'this month'),color:C.brand},
    {icon:Briefcase,label:'Missions',value:18,sub:lang==='fr'?'3 en attente':'3 pending',color:C.safran},
    {icon:Star,label:lang==='fr'?'Note':'Rating',value:'4.9',sub:'23 '+(lang==='fr'?'avis':'reviews'),color:C.gold},
    {icon:MessageSquare,label:'Messages',value:7,sub:lang==='fr'?'3 non lus':'3 unread',color:C.voisin},
  ]

  const stats=isFreelancer?freelancerStats:clientStats
  const activities=isFreelancer?[
    {icon:Briefcase,title:lang==='fr'?'Nouvelle mission disponible':'New job available',desc:'Design UI/UX pour app mobile'},
    {icon:MessageSquare,title:'Message',desc:'Un client vous a envoye un message'},
    {icon:CheckCircle,title:lang==='fr'?'Mission terminee':'Job completed',desc:lang==='fr'?'Livrable confirme':'Delivery confirmed'},
  ]:[
    {icon:Zap,title:lang==='fr'?'Mission publiee':'Job posted',desc:lang==='fr'?'Votre besoin est visible par les prestataires':'Your need is visible to providers'},
    {icon:TrendingUp,title:lang==='fr'?'Proposition recue':'Proposal received',desc:lang==='fr'?'Comparez profil, avis et delai':'Compare profile, reviews and timing'},
    {icon:CheckCircle,title:lang==='fr'?'Profil client verifie':'Client profile verified',desc:lang==='fr'?'Vos informations client sont confirmees':'Your client details are confirmed'},
  ]

  return(
    <div style={{minHeight:'100%',background:C.bg,padding:isMobile?'80px 16px 40px':'16px 24px',paddingTop:isMobile?80:16}}>
      <div style={{marginBottom:28}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
          {onBack&&<button onClick={onBack} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>
            <ArrowLeft size={16} color={C.textMid}/>
          </button>}
          <h1 style={{fontSize:isMobile?24:32,fontWeight:800,color:C.text,margin:0,fontFamily:'Outfit,sans-serif'}}>
            Dashboard
          </h1>
        </div>
        <p style={{fontSize:14,color:C.textMid,margin:'0 0 0 '+(onBack?'46px':'0'),fontFamily:'Inter,sans-serif'}}>
          {isFreelancer
            ?(lang==='fr'?`Suivi de votre activite prestataire, ${user?.nom}.`:`Provider activity for ${user?.nom}.`)
            :(lang==='fr'?`Suivi de vos demandes client, ${user?.nom}.`:`Client requests overview for ${user?.nom}.`)}
        </p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(4,1fr)',gap:16,marginBottom:28}}>
        {stats.map(s=><StatCard key={s.label} {...s}/>)}
      </div>

      <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,padding:24,marginBottom:24}}>
        <h2 style={{fontSize:18,fontWeight:700,color:C.text,margin:'0 0 16px',fontFamily:'Outfit,sans-serif'}}>
          {lang==='fr'?'Activite recente':'Recent activity'}
        </h2>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {activities.map((item,i)=>(
            <div key={i} style={{display:'flex',gap:12,padding:12,borderRadius:8,background:C.bg}}>
              <div style={{width:40,height:40,borderRadius:8,background:i===0?C.safran:i===1?C.brand:C.voisin,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <item.icon size={18} color="#fff"/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,color:C.text,fontSize:14}}>{item.title}</div>
                <div style={{fontSize:12,color:C.textMid,marginTop:2}}>{item.desc}</div>
              </div>
              <div style={{fontSize:12,color:C.textLt,whiteSpace:'nowrap'}}>{i===0?'2h':'1j'}</div>
            </div>
          ))}
        </div>
      </div>

      {isFreelancer?(
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(2,1fr)',gap:12}}>
          <Btn v="brand" full onClick={()=>setSub?.('mes-missions')}>{lang==='fr'?'Voir mes missions':'View my jobs'}</Btn>
          <Btn v="outline" full onClick={()=>setSub?.('edit-profil')}>{lang==='fr'?'Editer profil':'Edit profile'}</Btn>
        </div>
      ):(
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:12}}>
          <Btn v="brand" full onClick={()=>setPage?.('postjob')}>{lang==='fr'?'Publier une mission':'Post a job'}</Btn>
          <Btn v="outline" full onClick={()=>setSub?.('proposals')}>{lang==='fr'?'Voir les propositions':'View proposals'}</Btn>
          <Btn v="outline" full onClick={()=>setSub?.('aide')}>{lang==='fr'?'Aide':'Help'}</Btn>
        </div>
      )}

      <div style={{marginTop:18}}>
        <Badge type="ouverte">{isFreelancer?(lang==='fr'?'Mode prestataire':'Provider mode'):(lang==='fr'?'Mode client: mise en relation uniquement':'Client mode: connection only')}</Badge>
      </div>
    </div>
  )
}

export default DashboardScreen
