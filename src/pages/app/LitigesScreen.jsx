import { useState } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Av } from '../../components/ui'
import { useIsMobile, toast } from '../../utils/utils.jsx'
import { PgHdr } from '../../components/layout'
import {
  AlertTriangle, Plus, Upload, CheckCircle, MessageSquare,
  Shield, ChevronDown, ChevronUp, Send, Flag, Users
} from 'lucide-react'

const MOCK_SIGNALEMENTS=[
  {id:1,
   sujet:'Site e-commerce — Awa Traoré',
   personne:{nom:'Awa Traoré',av:'AT'},
   date:'Il y a 2h',
   motif:'travail_non_conforme',
   description:'La livraison ne correspond pas à ce qui était convenu lors de nos échanges.',
   statut:'ouvert',
   timeline:[
     {t:'Il y a 2h',ev:{fr:'Signalement ouvert',en:'Report opened'},icon:'🔴'},
     {t:'Il y a 1h',ev:{fr:'Notifié à l\'équipe EasyJob',en:'EasyJob team notified'},icon:'📨'},
   ]},
  {id:2,
   sujet:'Logo + Brand Identity restaurant',
   personne:{nom:'Fatou Diallo',av:'FD'},
   date:'Il y a 5j',
   motif:'communication',
   description:'Aucune réponse depuis 5 jours malgré plusieurs relances.',
   statut:'en_traitement',
   timeline:[
     {t:'Il y a 5j',ev:{fr:'Signalement ouvert',en:'Report opened'},icon:'🔴'},
     {t:'Il y a 4j',ev:{fr:'Prestataire informé',en:'Provider notified'},icon:'💬'},
     {t:'Il y a 2j',ev:{fr:'Équipe EasyJob en charge',en:'EasyJob team handling'},icon:'🛡️'},
   ]},
]

const MOTIFS=[
  {id:'travail_non_conforme', fr:'Prestation non conforme',    en:'Work not as agreed'},
  {id:'communication',        fr:'Problème de communication',  en:'Communication issue'},
  {id:'comportement',         fr:'Comportement inapproprié',   en:'Inappropriate behaviour'},
  {id:'securite',             fr:'Problème de sécurité',       en:'Safety concern'},
  {id:'arnaque',              fr:'Tentative d\'arnaque',        en:'Suspected scam'},
  {id:'autre',                fr:'Autre motif',                en:'Other reason'},
]

const LitigesScreen=({onBack,user,data,lang,addLog})=>{
  const isMobile=useIsMobile()
  const[openForm,setOpenForm]=useState(false)
  const[expanded,setExpanded]=useState(null)
  const[form,setForm]=useState({sujet:'',motif:'',description:''})
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}))

  const submit=()=>{
    if(!form.sujet||!form.motif||!form.description){
      toast.error(lang==='fr'?'Remplissez tous les champs':'Fill all fields')
      return
    }
    addLog?.('action',
      `Signalement envoyé — ${form.sujet}`,
      `Report sent — ${form.sujet}`
    )
    toast.success(lang==='fr'
      ?'Signalement envoyé. L\'équipe EasyJob va examiner votre demande sous 48h.'
      :'Report sent. EasyJob team will review your request within 48h.')
    setOpenForm(false)
    setForm({sujet:'',motif:'',description:''})
  }

  const statusColor={ouvert:C.danger, en_traitement:C.orange, resolu:C.voisin, rejete:C.textLt}
  const statusLabel={
    ouvert:       {fr:'Ouvert',        en:'Open'},
    en_traitement:{fr:'En traitement', en:'In review'},
    resolu:       {fr:'Résolu',        en:'Resolved'},
    rejete:       {fr:'Rejeté',        en:'Rejected'},
  }

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
      <PgHdr title={lang==='fr'?'Signalements':'Reports'} onBack={onBack}
        right={
          <button onClick={()=>setOpenForm(v=>!v)}
            style={{display:'flex',alignItems:'center',gap:6,padding:'7px 14px',
              borderRadius:9,background:G.safran,border:'none',cursor:'pointer',
              fontSize:12,fontWeight:700,color:'#fff',fontFamily:'Inter,sans-serif'}}>
            <Plus size={13}/>{lang==='fr'?'Signaler':'Report'}
          </button>
        }/>

      <div style={{flex:1,overflowY:'auto',padding:isMobile?'12px':'16px 20px'}}>

        {/* Info banner */}
        <div style={{background:C.voisinLt,border:`1px solid ${C.voisin}30`,borderRadius:12,
          padding:'12px 16px',marginBottom:16,display:'flex',gap:10,alignItems:'flex-start'}}>
          <Shield size={15} color={C.voisin} style={{flexShrink:0,marginTop:1}}/>
          <p style={{fontSize:12,color:C.voisin,margin:0,fontFamily:'Inter,sans-serif',lineHeight:1.6,fontWeight:500}}>
            {lang==='fr'
              ?'Vos signalements sont traités par l\'équipe EasyJob sous 48h. La communauté EasyJob se base sur la confiance mutuelle.'
              :'Your reports are handled by the EasyJob team within 48h. The EasyJob community is built on mutual trust.'}
          </p>
        </div>

        {/* Formulaire */}
        {openForm&&(
          <div style={{background:C.white,borderRadius:14,padding:20,marginBottom:20,
            border:`2px solid ${C.safran}`,boxShadow:`0 4px 20px ${C.safran}18`}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
              <Flag size={15} color={C.safranDk}/>
              <span style={{fontSize:14,fontWeight:700,color:C.text,fontFamily:'Outfit,sans-serif'}}>
                {lang==='fr'?'Nouveau signalement':'New Report'}
              </span>
            </div>

            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,fontWeight:600,color:C.textMid,fontFamily:'Inter,sans-serif',
                display:'block',marginBottom:6}}>
                {lang==='fr'?'Personne ou mission concernée':'Person or mission concerned'} *
              </label>
              <input value={form.sujet} onChange={e=>sf('sujet',e.target.value)}
                placeholder={lang==='fr'?'Nom du prestataire ou titre de la mission…':'Provider name or mission title…'}
                style={{width:'100%',padding:'10px 12px',borderRadius:9,border:`1.5px solid ${C.border}`,
                  fontFamily:'Inter,sans-serif',fontSize:13,color:C.text,background:C.white,
                  outline:'none',boxSizing:'border-box'}}/>
            </div>

            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,fontWeight:600,color:C.textMid,fontFamily:'Inter,sans-serif',
                display:'block',marginBottom:6}}>
                {lang==='fr'?'Motif du signalement':'Reason for report'} *
              </label>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {MOTIFS.map(m=>(
                  <label key={m.id} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',
                    borderRadius:9,cursor:'pointer',transition:'all .15s',
                    border:`1.5px solid ${form.motif===m.id?C.safran:C.border}`,
                    background:form.motif===m.id?C.safranLt:C.bg}}>
                    <input type="radio" name="motif" value={m.id} checked={form.motif===m.id}
                      onChange={()=>sf('motif',m.id)} style={{accentColor:C.safran}}/>
                    <span style={{fontSize:12,fontFamily:'Inter,sans-serif',
                      color:form.motif===m.id?C.safranDk:C.text,
                      fontWeight:form.motif===m.id?600:400}}>
                      {lang==='fr'?m.fr:m.en}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,fontWeight:600,color:C.textMid,fontFamily:'Inter,sans-serif',
                display:'block',marginBottom:6}}>
                {lang==='fr'?'Description':'Description'} *
              </label>
              <textarea value={form.description} onChange={e=>sf('description',e.target.value)}
                placeholder={lang==='fr'?'Décrivez précisément le problème…':'Describe the issue precisely…'}
                rows={4}
                style={{width:'100%',padding:'10px 12px',borderRadius:9,border:`1.5px solid ${C.border}`,
                  fontFamily:'Inter,sans-serif',fontSize:13,color:C.text,background:C.white,
                  outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
            </div>

            <div style={{marginBottom:20}}>
              <label style={{fontSize:12,fontWeight:600,color:C.textMid,fontFamily:'Inter,sans-serif',
                display:'block',marginBottom:6}}>
                {lang==='fr'?'Captures d\'écran ou preuves (optionnel)':'Screenshots or evidence (optional)'}
              </label>
              <button onClick={()=>toast.success(lang==='fr'?'Upload disponible dans la version finale':'Upload in final version')}
                style={{display:'flex',alignItems:'center',gap:8,padding:'10px 16px',
                  border:`1.5px dashed ${C.border}`,borderRadius:9,background:C.bg,
                  cursor:'pointer',color:C.textMid,fontFamily:'Inter,sans-serif',fontSize:12,
                  width:'100%',justifyContent:'center'}}>
                <Upload size={14}/>{lang==='fr'?'Ajouter une capture':'Add screenshot'}
              </button>
            </div>

            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setOpenForm(false)}
                style={{flex:1,padding:'10px',borderRadius:9,border:`1.5px solid ${C.border}`,
                  background:C.white,cursor:'pointer',fontSize:13,fontWeight:600,
                  color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                {lang==='fr'?'Annuler':'Cancel'}
              </button>
              <button onClick={submit}
                style={{flex:1,padding:'10px',borderRadius:9,background:G.safran,border:'none',
                  cursor:'pointer',fontSize:13,fontWeight:700,color:'#fff',fontFamily:'Inter,sans-serif',
                  display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
                <Send size={13}/>{lang==='fr'?'Envoyer':'Send'}
              </button>
            </div>
          </div>
        )}

        {/* Liste */}
        {MOCK_SIGNALEMENTS.length===0?(
          <div style={{textAlign:'center',padding:48}}>
            <div style={{fontSize:40,marginBottom:12}}>🕊️</div>
            <p style={{fontSize:14,fontWeight:600,color:C.text,fontFamily:'Outfit,sans-serif',marginBottom:4}}>
              {lang==='fr'?'Aucun signalement':'No reports'}
            </p>
            <p style={{fontSize:13,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
              {lang==='fr'?'Tout se passe bien !':'All clear!'}
            </p>
          </div>
        ):(
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {MOCK_SIGNALEMENTS.map(s=>{
              const isOpen=expanded===s.id
              const sc=statusColor[s.statut]||C.textLt
              const sl=statusLabel[s.statut]||{fr:s.statut,en:s.statut}
              return(
                <div key={s.id} style={{background:C.white,borderRadius:14,overflow:'hidden',
                  border:`1.5px solid ${s.statut==='ouvert'?C.safran:s.statut==='en_traitement'?C.orange:C.border}`}}>
                  <div style={{padding:16}}>
                    <div style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:10}}>
                      <div style={{width:9,height:9,borderRadius:'50%',marginTop:5,flexShrink:0,background:sc}}/>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:4}}>
                          <span style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:'Inter,sans-serif'}}>
                            {s.sujet}
                          </span>
                          <span style={{fontSize:10,fontWeight:700,color:sc,fontFamily:'Inter,sans-serif',
                            background:`${sc}15`,padding:'2px 8px',borderRadius:20,whiteSpace:'nowrap'}}>
                            {lang==='fr'?sl.fr:sl.en}
                          </span>
                        </div>
                        <p style={{fontSize:12,color:C.textMid,margin:'0 0 8px',fontFamily:'Inter,sans-serif',lineHeight:1.5}}>
                          {s.description}
                        </p>
                        <div style={{display:'flex',gap:14,fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif',flexWrap:'wrap'}}>
                          <span>🕒 {s.date}</span>
                          <span><Users size={10} style={{verticalAlign:'middle'}}/> {s.personne.nom}</span>
                        </div>
                      </div>
                    </div>

                    <button onClick={()=>setExpanded(isOpen?null:s.id)}
                      style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',
                        cursor:'pointer',color:C.brand,padding:0}}>
                      {isOpen?<ChevronUp size={13}/>:<ChevronDown size={13}/>}
                      <span style={{fontSize:12,fontWeight:600,fontFamily:'Inter,sans-serif'}}>
                        {lang==='fr'?'Historique':'Timeline'}
                      </span>
                    </button>

                    {isOpen&&(
                      <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
                        {s.timeline.map((ev,i)=>(
                          <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',
                            paddingBottom:i<s.timeline.length-1?10:0}}>
                            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                              <span style={{fontSize:14}}>{ev.icon}</span>
                              {i<s.timeline.length-1&&(
                                <div style={{width:1,flex:1,minHeight:14,background:C.border,marginTop:3}}/>
                              )}
                            </div>
                            <div style={{flex:1}}>
                              <span style={{fontSize:12,fontWeight:600,color:C.text,fontFamily:'Inter,sans-serif'}}>
                                {lang==='fr'?ev.ev.fr:ev.ev.en}
                              </span>
                              <span style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif',marginLeft:8}}>
                                {ev.t}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {s.statut==='ouvert'&&(
                    <div style={{padding:'0 16px 14px'}}>
                      <button onClick={()=>toast.success(lang==='fr'?'Chat admin ouvert':'Admin chat opened')}
                        style={{display:'flex',alignItems:'center',gap:6,padding:'7px 14px',borderRadius:8,
                          border:`1px solid ${C.border}`,background:C.white,cursor:'pointer',
                          fontSize:12,color:C.textMid,fontFamily:'Inter,sans-serif',fontWeight:500,width:'100%',justifyContent:'center'}}>
                        <MessageSquare size={13}/>{lang==='fr'?'Contacter l\'équipe EasyJob':'Contact EasyJob team'}
                      </button>
                    </div>
                  )}
                  {s.statut==='resolu'&&(
                    <div style={{margin:'0 16px 14px',padding:'10px 14px',background:C.voisinLt,
                      borderRadius:9,display:'flex',gap:8,alignItems:'center'}}>
                      <CheckCircle size={14} color={C.voisin}/>
                      <span style={{fontSize:12,color:C.voisin,fontFamily:'Inter,sans-serif',fontWeight:600}}>
                        {lang==='fr'?'Signalement résolu par EasyJob':'Report resolved by EasyJob'}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default LitigesScreen
