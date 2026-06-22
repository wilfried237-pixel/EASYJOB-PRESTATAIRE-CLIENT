import { useState } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Av, Badge, Stars, Modal } from '../../components/ui'
import { useIsMobile, fmt, toast } from '../../utils/utils.jsx'
import { buildWhatsAppUrl } from '../../utils/links'
import { CATS } from '../../data/mockData'
import {
  ChevronLeft, CheckCircle, X, Clock, MessageSquare,
  DollarSign, Calendar, ChevronDown, ChevronUp, User,
  Briefcase, Filter, Star, Eye, Check, AlertCircle
} from 'lucide-react'

const MOCK_PROPOSALS = [
  {id:1,missionId:1,missionTitle:'Site e-commerce avec Mobile Money',
   fl:{nom:'Awa Traoré',av:'AT',note:4.9,missions:47,verifie:true,titre:'Développeuse Full-Stack React/Node'},
   montant:950000,delai:'21 jours',lettre:'Bonjour ! J\'ai exactement l\'expertise qu\'il faut pour ce projet. J\'ai déjà intégré MTN et Orange Money sur 3 projets similaires. Je peux commencer immédiatement.',
   date:'Il y a 30 min',statut:'en_attente'},
  {id:2,missionId:1,missionTitle:'Site e-commerce avec Mobile Money',
   fl:{nom:'Moussa Coulibaly',av:'MC',note:4.7,missions:28,verifie:true,titre:'Développeur Backend Node.js'},
   montant:780000,delai:'28 jours',lettre:'Bonjour, je propose une solution robuste avec Node.js + Prisma et intégration complète des APIs Mobile Money. Portfolio disponible sur demande.',
   date:'Il y a 2h',statut:'en_attente'},
  {id:3,missionId:2,missionTitle:'Logo + Brand Identity restaurant',
   fl:{nom:'Fatou Diallo',av:'FD',note:5.0,missions:62,verifie:true,titre:'Designer Graphique — Branding'},
   montant:180000,delai:'7 jours',lettre:'Spécialisée en branding africain depuis 5 ans. Je propose 3 concepts logo + charte graphique complète + fichiers sources. Satisfaction garantie.',
   date:'Il y a 1h',statut:'acceptee'},
  {id:4,missionId:2,missionTitle:'Logo + Brand Identity restaurant',
   fl:{nom:'Ibrahima Ba',av:'IB',note:4.5,missions:15,verifie:false,titre:'Designer Freelance'},
   montant:120000,delai:'10 jours',lettre:'Je peux créer un logo moderne et professionnel pour votre restaurant. J\'ai déjà travaillé pour plusieurs restaurants à Dakar.',
   date:'Il y a 3h',statut:'refusee'},
]

const ProposalsScreen=({onBack,user,data,setData,lang,addLog,setSub,setSelConv})=>{
  const t=T[lang]
  const isMobile=useIsMobile()
  const[filter,setFilter]=useState('all')
  const[expanded,setExpanded]=useState(null)
  const[confirmModal,setConfirmModal]=useState(null)

  const allMissions=[...data.myJobs.filter(j=>j.status==='ouverte'),
    {id:1,title:'Site e-commerce avec Mobile Money',status:'ouverte'},
    {id:2,title:'Logo + Brand Identity restaurant',status:'ouverte'}]

  const filtered=MOCK_PROPOSALS.filter(p=>{
    if(filter==='all') return true
    return p.statut===filter
  })

  const handleAccept=(proposal)=>{
    setConfirmModal({type:'accept',proposal})
  }
  const handleRefuse=(proposal)=>{
    setConfirmModal({type:'refuse',proposal})
  }
  const confirmAction=()=>{
    if(!confirmModal) return
    const{type,proposal}=confirmModal
    if(type==='accept'){
      addLog('mission',
        `Proposition acceptée — ${proposal.fl.nom} pour "${proposal.missionTitle}"`,
        `Proposal accepted — ${proposal.fl.nom} for "${proposal.missionTitle}"`
      )
      toast.success(lang==='fr'?`Proposition de ${proposal.fl.nom} acceptée !`:`${proposal.fl.nom}'s proposal accepted!`)
    } else {
      addLog('mission',
        `Proposition refusée — ${proposal.fl.nom}`,
        `Proposal refused — ${proposal.fl.nom}`
      )
      toast.success(lang==='fr'?'Proposition refusée.':'Proposal refused.')
    }
    setConfirmModal(null)
  }

  const missionGroups=[...new Set(filtered.map(p=>p.missionId))].map(mid=>{
    const props=filtered.filter(p=>p.missionId===mid)
    const title=props[0]?.missionTitle||''
    return{missionId:mid,title,proposals:props}
  })

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg,overflowY:'hidden'}}>
      {/* Header */}
      <div style={{background:G.dark,padding:isMobile?'20px 16px':'24px 32px'}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:12}}>
          <button onClick={onBack} style={{background:'rgba(255,255,255,.1)',border:'none',borderRadius:8,
            width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
            <ChevronLeft size={18} color="#fff"/>
          </button>
          <div>
            <h1 style={{fontSize:20,fontWeight:800,color:'#fff',margin:0,fontFamily:'Outfit,sans-serif'}}>
              {lang==='fr'?'Propositions reçues':'Received Proposals'}
            </h1>
            <p style={{fontSize:12,color:'rgba(255,255,255,.4)',margin:'2px 0 0',fontFamily:'Inter,sans-serif'}}>
              {MOCK_PROPOSALS.filter(p=>p.statut==='en_attente').length} {lang==='fr'?'en attente':'pending'}
            </p>
          </div>
        </div>
        <div style={{display:'flex',gap:8,overflowX:'auto'}}>
          {[
            {id:'all',fr:'Toutes',en:'All'},
            {id:'en_attente',fr:'En attente',en:'Pending'},
            {id:'acceptee',fr:'Acceptées',en:'Accepted'},
            {id:'refusee',fr:'Refusées',en:'Refused'},
          ].map(f=>(
            <button key={f.id} onClick={()=>setFilter(f.id)}
              style={{padding:'6px 14px',borderRadius:20,border:`1.5px solid ${filter===f.id?C.brand:'rgba(255,255,255,.2)'}`,
                background:filter===f.id?C.brand:'rgba(255,255,255,.08)',cursor:'pointer',whiteSpace:'nowrap',
                fontSize:12,fontWeight:600,color:filter===f.id?'#fff':'rgba(255,255,255,.6)',fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?f.fr:f.en}
            </button>
          ))}
        </div>
      </div>

      <div style={{flex:1,overflowY:'auto',padding:isMobile?12:20}}>
        {missionGroups.length===0?(
          <div style={{textAlign:'center',padding:48}}>
            <div style={{fontSize:40,marginBottom:12}}>📭</div>
            <p style={{fontSize:14,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Aucune proposition dans cette catégorie.':'No proposals in this category.'}
            </p>
          </div>
        ):(
          missionGroups.map(group=>(
            <div key={group.missionId} style={{marginBottom:24}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                <Briefcase size={14} color={C.brand}/>
                <span style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:'Outfit,sans-serif'}}>
                  {group.title}
                </span>
                <span style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif'}}>
                  ({group.proposals.length} {lang==='fr'?'proposition':'proposal'}{group.proposals.length>1?'s':''})
                </span>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {group.proposals.map(p=>{
                  const isOpen=expanded===p.id
                  return(
                    <div key={p.id} style={{background:C.white,borderRadius:14,
                      border:`1.5px solid ${p.statut==='acceptee'?C.brand:p.statut==='refusee'?C.borderDk:C.border}`,
                      overflow:'hidden',transition:'all .2s'}}>
                      <div style={{padding:'14px 16px'}}>
                        <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                          <Av code={p.fl.av} size={44}/>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:2}}>
                              <span style={{fontSize:14,fontWeight:700,color:C.text,fontFamily:'Outfit,sans-serif'}}>{p.fl.nom}</span>
                              {p.fl.verifie&&<CheckCircle size={13} color={C.brand}/>}
                              <Badge type={p.statut==='acceptee'?'acceptee':p.statut==='refusee'?'refusee':'en_attente'} sm>
                                {p.statut==='acceptee'?(lang==='fr'?'Acceptée':'Accepted'):
                                 p.statut==='refusee'?(lang==='fr'?'Refusée':'Refused'):
                                 (lang==='fr'?'En attente':'Pending')}
                              </Badge>
                            </div>
                            <p style={{fontSize:12,color:C.textMid,margin:'0 0 8px',fontFamily:'Inter,sans-serif'}}>{p.fl.titre}</p>
                            <div style={{display:'flex',gap:12,fontSize:11,color:C.textLt,flexWrap:'wrap'}}>
                              <Stars note={p.fl.note} sz={10}/>
                              <span>· {p.fl.missions} {lang==='fr'?'missions':'missions'}</span>
                            </div>
                          </div>
                          <div style={{textAlign:'right',flexShrink:0}}>
                            <div style={{fontSize:18,fontWeight:900,color:C.brand,fontFamily:'Outfit,sans-serif',letterSpacing:'-.5px'}}>
                              {fmt(p.montant)}
                            </div>
                            <div style={{fontSize:10,color:C.textLt,fontFamily:'Inter,sans-serif'}}>FCFA</div>
                            <div style={{display:'flex',alignItems:'center',gap:4,marginTop:4,justifyContent:'flex-end'}}>
                              <Calendar size={10} color={C.textLt}/>
                              <span style={{fontSize:10,color:C.textLt,fontFamily:'Inter,sans-serif'}}>{p.delai}</span>
                            </div>
                          </div>
                        </div>

                        <button onClick={()=>setExpanded(isOpen?null:p.id)}
                          style={{display:'flex',alignItems:'center',gap:6,marginTop:10,background:'none',
                            border:'none',cursor:'pointer',padding:0,color:C.brand}}>
                          {isOpen?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
                          <span style={{fontSize:12,fontWeight:600,fontFamily:'Inter,sans-serif'}}>
                            {lang==='fr'?'Lettre de motivation':'Cover letter'}
                          </span>
                        </button>

                        {isOpen&&(
                          <div style={{marginTop:10,padding:'12px 14px',background:C.bg,borderRadius:10,
                            border:`1px solid ${C.border}`}}>
                            <p style={{fontSize:13,color:C.text,margin:0,lineHeight:1.7,fontFamily:'Inter,sans-serif'}}>
                              {p.lettre}
                            </p>
                          </div>
                        )}
                      </div>

                      {p.statut==='en_attente'&&(
                        <div style={{display:'flex',gap:8,padding:'0 16px 14px'}}>
                          <Btn v="outline" sz="sm" full onClick={()=>handleRefuse(p)}>
                            <X size={13}/> {lang==='fr'?'Refuser':'Refuse'}
                          </Btn>
                          <Btn v="brand" sz="sm" full onClick={()=>handleAccept(p)}>
                            <Check size={13}/> {lang==='fr'?'Accepter':'Accept'}
                          </Btn>
                        </div>
                      )}
                      {p.statut==='acceptee'&&(
                        <div style={{padding:'0 16px 14px'}}>
                          <Btn v="ghost" sz="sm" full onClick={()=>{
                            const profile=data.freelancers?.find(f=>f.av===p.fl.av || f.nom===p.fl.nom)
                            const message=lang==='fr'
                              ?`Bonjour ${p.fl.nom}, votre proposition pour "${p.missionTitle}" a été acceptée.`
                              :`Hello ${p.fl.nom}, your proposal for "${p.missionTitle}" has been accepted.`
                            window.open(buildWhatsAppUrl(profile?.whatsapp, message), '_blank', 'noopener,noreferrer')
                          }}>
                            <MessageSquare size={13}/> {lang==='fr'?'Contacter le freelance':'Contact freelancer'}
                          </Btn>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {confirmModal&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',
          alignItems:'center',justifyContent:'center',zIndex:999,padding:20}}>
          <div style={{background:C.white,borderRadius:20,padding:28,maxWidth:340,width:'100%',
            boxShadow:'0 24px 60px rgba(0,0,0,.2)'}}>
            <div style={{textAlign:'center',marginBottom:20}}>
              <div style={{fontSize:40,marginBottom:8}}>{confirmModal.type==='accept'?'✅':'❌'}</div>
              <h3 style={{fontSize:17,fontWeight:800,color:C.text,margin:'0 0 8px',fontFamily:'Outfit,sans-serif'}}>
                {confirmModal.type==='accept'
                  ?(lang==='fr'?'Accepter cette proposition ?':'Accept this proposal?')
                  :(lang==='fr'?'Refuser cette proposition ?':'Refuse this proposal?')}
              </h3>
              <p style={{fontSize:13,color:C.textMid,margin:0,fontFamily:'Inter,sans-serif',lineHeight:1.6}}>
                {confirmModal.type==='accept'
                  ?(lang==='fr'?`Vous allez accepter la proposition de ${confirmModal.proposal.fl.nom}.`
                    :`You are about to accept ${confirmModal.proposal.fl.nom}'s proposal.`)
                  :(lang==='fr'?`${confirmModal.proposal.fl.nom} sera notifié(e) du refus.`
                    :`${confirmModal.proposal.fl.nom} will be notified of the refusal.`)}
              </p>
            </div>
            <div style={{display:'flex',gap:10}}>
              <Btn v="soft" sz="md" full onClick={()=>setConfirmModal(null)}>
                {lang==='fr'?'Annuler':'Cancel'}
              </Btn>
              <Btn v={confirmModal.type==='accept'?'brand':'danger'} sz="md" full onClick={confirmAction}>
                {confirmModal.type==='accept'?(lang==='fr'?'Confirmer':'Confirm'):(lang==='fr'?'Refuser':'Refuse')}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProposalsScreen
