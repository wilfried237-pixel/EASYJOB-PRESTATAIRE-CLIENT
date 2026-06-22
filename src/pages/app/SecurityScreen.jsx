import { useState } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Inp, Toggle } from '../../components/ui'
import { toast, useIsMobile } from '../../utils/utils.jsx'
import {
  Lock, Shield, Smartphone, Laptop, AlertTriangle, CheckCircle,
  Eye, EyeOff, Download, LogOut, Trash2, Plus, ChevronRight
} from 'lucide-react'

const SecurityScreen=({user,lang,onBack})=>{
  const t=T[lang], isMobile=useIsMobile()
  const[showPass,setShowPass]=useState(false)
  const[tab,setTab]=useState('account') // account, sessions, backup, privacy

  const[formPass,setFormPass]=useState({current:'',new:'',confirm:''})
  const[twoFA,setTwoFA]=useState(false)
  const[backup,setBackup]=useState(false)
  const[emailNotif,setEmailNotif]=useState(true)
  const[smsNotif,setSmsNotif]=useState(false)

  const sessions=[
    {id:1,device:'iPhone 14 Pro',os:'iOS 17.2',lastActive:'Now',location:'Dakar, Senegal',current:true},
    {id:2,device:'MacBook Pro',os:'macOS 14.1',lastActive:'2 hours ago',location:'Dakar, Senegal',current:false},
    {id:3,device:'Samsung Galaxy S23',os:'Android 13',lastActive:'1 day ago',location:'Abidjan, Ivory Coast',current:false},
  ]

  const handlePassChange=()=>{
    if(!formPass.current||!formPass.new||!formPass.confirm){
      toast.error(lang==='fr'?'Tous les champs sont requis':'All fields required')
      return
    }
    if(formPass.new!==formPass.confirm){
      toast.error(lang==='fr'?'Les mots de passe ne correspondent pas':'Passwords do not match')
      return
    }
    toast.success(lang==='fr'?'Mot de passe changé avec succès':'Password changed successfully')
    setFormPass({current:'',new:'',confirm:''})
  }

  const handle2FA=()=>{
    setTwoFA(!twoFA)
    toast.success(lang==='fr'?`2FA ${twoFA?'désactivé':'activé'}`:`2FA ${twoFA?'disabled':'enabled'}`)
  }

  const handleLogoutAll=()=>{
    toast.success(lang==='fr'?'Tous les appareils déconnectés':'All devices logged out')
  }

  const handleDownloadBackup=()=>{
    toast.success(lang==='fr'?'Sauvegarde téléchargée':'Backup downloaded')
  }

  return(
    <div style={{minHeight:'100%',background:C.bg,padding:isMobile?'80px 16px 40px':'16px 24px',paddingTop:isMobile?80:16}}>
      {/* HEADER */}
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:isMobile?24:32,fontWeight:800,color:C.text,margin:0,fontFamily:'Outfit,sans-serif'}}>
          {lang==='fr'?'Sécurité':'Security'}
        </h1>
        <p style={{fontSize:13,color:C.textMid,margin:'8px 0 0',fontFamily:'Inter,sans-serif'}}>
          {lang==='fr'?'Protégez votre compte':'Protect your account'}
        </p>
      </div>

      {/* TABS */}
      <div style={{display:'flex',gap:8,marginBottom:24,borderBottom:`1px solid ${C.border}`,overflowX:'auto',paddingBottom:12}}>
        {[
          {id:'account',label:lang==='fr'?'Compte':'Account'},
          {id:'sessions',label:lang==='fr'?'Sessions':'Sessions'},
          {id:'backup',label:lang==='fr'?'Sauvegarde':'Backup'},
          {id:'privacy',label:lang==='fr'?'Vie privée':'Privacy'},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{padding:'8px 16px',borderRadius:8,border:'none',background:tab===t.id?C.brand:'transparent',
              color:tab===t.id?'#fff':C.text,fontWeight:tab===t.id?700:500,cursor:'pointer',fontSize:14,whiteSpace:'nowrap'}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ACCOUNT TAB */}
      {tab==='account'&&(
        <div style={{display:'grid',gap:24}}>
          {/* Password Change */}
          <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,padding:24}}>
            <h2 style={{fontSize:16,fontWeight:700,color:C.text,margin:'0 0 16px',display:'flex',gap:8,alignItems:'center'}}>
              <Lock size={18} color={C.brand}/>
              {lang==='fr'?'Changer le mot de passe':'Change password'}
            </h2>
            <div style={{display:'grid',gap:12}}>
              <Inp type="password" placeholder={lang==='fr'?'Mot de passe actuel':'Current password'}
                value={formPass.current} onChange={e=>setFormPass({...formPass,current:e.target.value})}/>
              <Inp type="password" placeholder={lang==='fr'?'Nouveau mot de passe':'New password'}
                value={formPass.new} onChange={e=>setFormPass({...formPass,new:e.target.value})}/>
              <Inp type="password" placeholder={lang==='fr'?'Confirmer le mot de passe':'Confirm password'}
                value={formPass.confirm} onChange={e=>setFormPass({...formPass,confirm:e.target.value})}/>
              <Btn v="brand" onClick={handlePassChange}>{lang==='fr'?'Mettre à jour':'Update'}</Btn>
            </div>
          </div>

          {/* 2FA */}
          <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,padding:24}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <h2 style={{fontSize:16,fontWeight:700,color:C.text,margin:0,display:'flex',gap:8,alignItems:'center'}}>
                <Smartphone size={18} color={C.brand}/>
                {lang==='fr'?'Authentification à 2 facteurs':'Two-Factor Authentication'}
              </h2>
              <Toggle checked={twoFA} onChange={handle2FA}/>
            </div>
            <p style={{fontSize:13,color:C.textMid,margin:0}}>
              {lang==='fr'
                ?'Ajoutez une couche de sécurité supplémentaire à votre compte'
                :'Add an extra layer of security to your account'}
            </p>
            {twoFA&&(
              <div style={{background:C.bg,borderRadius:8,padding:12,marginTop:12,fontSize:12,color:C.textMid}}>
                ✓ {lang==='fr'?'2FA activé':'2FA enabled'} • {lang==='fr'?'Code généré':'Code generated'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SESSIONS TAB */}
      {tab==='sessions'&&(
        <div style={{display:'grid',gap:12}}>
          {sessions.map(session=>(
            <div key={session.id} style={{background:C.white,borderRadius:12,border:`1px solid ${session.current?C.brand:C.border}`,padding:16,position:'relative'}}>
              {session.current&&(
                <div style={{position:'absolute',top:12,right:12,background:'#1DBF73',color:'#fff',padding:'2px 8px',borderRadius:4,fontSize:11,fontWeight:700}}>
                  {lang==='fr'?'Actuel':'Current'}
                </div>
              )}
              <div style={{display:'flex',gap:12}}>
                <div style={{width:44,height:44,borderRadius:8,background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>
                  {session.device.includes('iPhone')?'📱':session.device.includes('MacBook')?'💻':'🖥️'}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,color:C.text}}>{session.device}</div>
                  <div style={{fontSize:12,color:C.textMid,marginTop:2}}>{session.os}</div>
                  <div style={{fontSize:12,color:C.textMid}}>📍 {session.location}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:12,color:C.textMid}}>{session.lastActive}</div>
                  {!session.current&&(
                    <button style={{background:'none',border:'none',cursor:'pointer',color:'#FF6B35',fontWeight:600,fontSize:12,marginTop:8}}>
                      {lang==='fr'?'Déconnecter':'Sign out'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Btn v="secondary" icon={LogOut} onClick={handleLogoutAll}>
            {lang==='fr'?'Déconnecter tous les appareils':'Sign out all devices'}
          </Btn>
        </div>
      )}

      {/* BACKUP TAB */}
      {tab==='backup'&&(
        <div style={{display:'grid',gap:24}}>
          <div style={{background:'#FFF8E6',borderRadius:12,border:'1px solid #FDE68A',padding:16,display:'flex',gap:12}}>
            <AlertTriangle size={20} color="#B45309" style={{flexShrink:0}}/>
            <div>
              <div style={{fontWeight:600,color:'#B45309'}}>{lang==='fr'?'Sauvegardez vos données':'Backup your data'}</div>
              <p style={{fontSize:12,color:'#92400E',margin:'4px 0 0'}}>
                {lang==='fr'
                  ?'Téléchargez une copie complète de vos données personnelles'
                  :'Download a complete copy of your personal data'}
              </p>
            </div>
          </div>
          <Btn v="secondary" icon={Download} onClick={handleDownloadBackup}>
            {lang==='fr'?'Télécharger la sauvegarde':'Download backup'}
          </Btn>
          <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,padding:16}}>
            <div style={{fontSize:12,color:C.textMid}}>
              {lang==='fr'
                ?'Dernière sauvegarde: 5 jours'
                :'Last backup: 5 days ago'}
            </div>
          </div>
        </div>
      )}

      {/* PRIVACY TAB */}
      {tab==='privacy'&&(
        <div style={{display:'grid',gap:12}}>
          <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600,color:C.text}}>{lang==='fr'?'Notifications email':'Email notifications'}</div>
              <div style={{fontSize:12,color:C.textMid,marginTop:2}}>
                {lang==='fr'?'Recevoir les alertes par email':'Receive alerts by email'}
              </div>
            </div>
            <Toggle checked={emailNotif} onChange={()=>setEmailNotif(!emailNotif)}/>
          </div>
          <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600,color:C.text}}>{lang==='fr'?'Notifications SMS':'SMS notifications'}</div>
              <div style={{fontSize:12,color:C.textMid,marginTop:2}}>
                {lang==='fr'?'Recevoir les alertes par SMS':'Receive alerts by SMS'}
              </div>
            </div>
            <Toggle checked={smsNotif} onChange={()=>setSmsNotif(!smsNotif)}/>
          </div>

          <div style={{background:'#FFF1F2',borderRadius:12,border:'1px solid #FECDD3',padding:16,marginTop:12}}>
            <div style={{display:'flex',gap:8,alignItems:'flex-start'}}>
              <AlertTriangle size={18} color="#BE123C" style={{flexShrink:0}}/>
              <div>
                <div style={{fontWeight:600,color:'#BE123C',fontSize:14}}>
                  {lang==='fr'?'Zone de danger':'Danger zone'}
                </div>
                <p style={{fontSize:12,color:'#9F1239',margin:'8px 0 0'}}>
                  {lang==='fr'
                    ?'Les actions ci-dessous sont irréversibles'
                    :'The actions below are irreversible'}
                </p>
                <Btn v="danger" icon={Trash2} full style={{marginTop:12}}>
                  {lang==='fr'?'Supprimer le compte':'Delete account'}
                </Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SecurityScreen
