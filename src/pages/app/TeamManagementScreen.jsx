import { useState } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Inp, Badge, Av } from '../../components/ui'
import { toast, useIsMobile } from '../../utils/utils.jsx'
import {
  Users, Plus, Trash2, Edit2, Mail, Shield, Eye, MoreVertical,
  Clock, CheckCircle, AlertCircle, Send, ChevronDown
} from 'lucide-react'

const TeamManagementScreen=({lang,onBack})=>{
  const t=T[lang], isMobile=useIsMobile()
  const[showInvite,setShowInvite]=useState(false)
  const[inviteEmail,setInviteEmail]=useState('')
  const[inviteRole,setInviteRole]=useState('viewer') // viewer, editor, admin

  const[teamMembers,setTeamMembers]=useState([
    {id:1,name:'Vous',email:'user@easyjob.com',av:'U',role:'owner',joinDate:'2024-01-01',status:'active',lastActive:'Now'},
    {id:2,name:'Marie Dupont',email:'marie@company.com',av:'MD',role:'admin',joinDate:'2024-01-15',status:'active',lastActive:'2h ago'},
    {id:3,name:'Jean Martin',email:'jean@company.com',av:'JM',role:'editor',joinDate:'2024-01-20',status:'active',lastActive:'4h ago'},
    {id:4,name:'Sophie Leclerc',email:'sophie@company.com',av:'SL',role:'viewer',joinDate:'2024-02-01',status:'inactive',lastActive:'2d ago'},
  ])

  const[invitations,setInvitations]=useState([
    {id:1,email:'newuser@company.com',role:'editor',sentDate:'2024-02-05',status:'pending'},
    {id:2,email:'testuser@company.com',role:'viewer',sentDate:'2024-02-03',status:'pending'},
  ])

  const handleInvite=()=>{
    if(!inviteEmail){
      toast.error(lang==='fr'?'Email requis':'Email required')
      return
    }
    setInvitations([...invitations,{id:Date.now(),email:inviteEmail,role:inviteRole,sentDate:new Date().toISOString().split('T')[0],status:'pending'}])
    toast.success(lang==='fr'?'Invitation envoyée':'Invitation sent')
    setInviteEmail('')
    setShowInvite(false)
  }

  const handleRemoveMember=id=>{
    setTeamMembers(teamMembers.filter(m=>m.id!==id))
    toast.success(lang==='fr'?'Membre supprimé':'Member removed')
  }

  const handleCancelInvite=id=>{
    setInvitations(invitations.filter(i=>i.id!==id))
    toast.success(lang==='fr'?'Invitation annulée':'Invitation cancelled')
  }

  const getRoleLabel=role=>{
    if(role==='owner')return{label:lang==='fr'?'Propriétaire':'Owner',color:'#8B5CF6'}
    if(role==='admin')return{label:lang==='fr'?'Administrateur':'Admin',color:'#FF6B35'}
    if(role==='editor')return{label:lang==='fr'?'Éditeur':'Editor',color:'#3B82F6'}
    return{label:lang==='fr'?'Spectateur':'Viewer',color:'#6B7280'}
  }

  return(
    <div style={{minHeight:'100%',background:C.bg,padding:isMobile?'80px 16px 40px':'16px 24px',paddingTop:isMobile?80:16}}>
      {/* HEADER */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <div>
          <h1 style={{fontSize:isMobile?24:32,fontWeight:800,color:C.text,margin:0,fontFamily:'Outfit,sans-serif'}}>
            {lang==='fr'?'Gestion d\'équipe':'Team Management'}
          </h1>
          <p style={{fontSize:13,color:C.textMid,margin:'8px 0 0',fontFamily:'Inter,sans-serif'}}>
            {lang==='fr'?'Gérez les accès et collaborateurs':'Manage access and team members'}
          </p>
        </div>
        <Btn v="brand" icon={Plus} onClick={()=>setShowInvite(true)}>
          {lang==='fr'?'Inviter':'Invite'}
        </Btn>
      </div>

      {/* INVITE MODAL */}
      {showInvite&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:300}}>
          <div style={{background:C.white,borderRadius:12,padding:24,maxWidth:400,width:'90%',boxShadow:'0 20px 60px rgba(0,0,0,.3)'}}>
            <h2 style={{fontSize:18,fontWeight:700,color:C.text,margin:'0 0 16px'}}>{lang==='fr'?'Inviter un membre':'Invite member'}</h2>
            
            <Inp type="email" placeholder={lang==='fr'?'Email':'Email'} value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} style={{marginBottom:12}}/>
            
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:C.textMid,fontWeight:600,display:'block',marginBottom:6}}>
                {lang==='fr'?'Rôle':'Role'}
              </label>
              <select value={inviteRole} onChange={e=>setInviteRole(e.target.value)}
                style={{width:'100%',padding:'8px 12px',borderRadius:6,border:`1px solid ${C.border}`,fontSize:13,outline:'none'}}>
                <option value="viewer">{lang==='fr'?'Spectateur':'Viewer'}</option>
                <option value="editor">{lang==='fr'?'Éditeur':'Editor'}</option>
                <option value="admin">{lang==='fr'?'Administrateur':'Admin'}</option>
              </select>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <Btn v="secondary" onClick={()=>setShowInvite(false)}>
                {lang==='fr'?'Annuler':'Cancel'}
              </Btn>
              <Btn v="brand" onClick={handleInvite} icon={Send}>
                {lang==='fr'?'Envoyer':'Send'}
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE MEMBERS */}
      <div style={{marginBottom:32}}>
        <h2 style={{fontSize:16,fontWeight:700,color:C.text,margin:'0 0 16px',display:'flex',gap:8,alignItems:'center'}}>
          <Users size={18} color={C.brand}/>
          {lang==='fr'?'Membres actifs':'Active members'} ({teamMembers.length})
        </h2>

        <div style={{display:'grid',gap:12}}>
          {teamMembers.map(member=>{
            const role=getRoleLabel(member.role)
            return(
              <div key={member.id} style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,padding:16,display:'flex',alignItems:'center',gap:12}}>
                <Av code={member.av} size={44}/>
                
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                    <h3 style={{fontSize:14,fontWeight:700,color:C.text,margin:0}}>{member.name}</h3>
                    <Badge type={member.role==='owner'?'premium':member.role==='admin'?'top':'verified'}>
                      {role.label}
                    </Badge>
                  </div>
                  <div style={{fontSize:12,color:C.textMid}}>{member.email}</div>
                  <div style={{fontSize:11,color:C.textLt,marginTop:4}}>
                    {member.status==='active'?'🟢 Active':'🔴 Inactive'} • {lang==='fr'?'Actif':'Last seen'}: {member.lastActive}
                  </div>
                </div>

                {member.role!=='owner'&&(
                  <div style={{display:'flex',gap:6}}>
                    <button style={{width:32,height:32,borderRadius:6,border:`1px solid ${C.border}`,background:C.white,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Edit2 size={14} color={C.textMid}/>
                    </button>
                    <button onClick={()=>handleRemoveMember(member.id)} style={{width:32,height:32,borderRadius:6,border:`1px solid ${C.border}`,background:C.white,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Trash2 size={14} color="#FF6B35"/>
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* PENDING INVITATIONS */}
      {invitations.length>0&&(
        <div>
          <h2 style={{fontSize:16,fontWeight:700,color:C.text,margin:'0 0 16px',display:'flex',gap:8,alignItems:'center'}}>
            <Clock size={18} color={C.brand}/>
            {lang==='fr'?'Invitations en attente':'Pending invitations'} ({invitations.length})
          </h2>

          <div style={{display:'grid',gap:12}}>
            {invitations.map(inv=>(
              <div key={inv.id} style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,padding:16,display:'flex',alignItems:'center',gap:12,opacity:.7}}>
                <div style={{width:44,height:44,borderRadius:8,background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>
                  ✉️
                </div>
                
                <div style={{flex:1}}>
                  <h3 style={{fontSize:14,fontWeight:700,color:C.text,margin:'0 0 4px'}}>{inv.email}</h3>
                  <div style={{fontSize:12,color:C.textMid}}>
                    {getRoleLabel(inv.role).label} • {lang==='fr'?'Envoyé':'Sent'}: {inv.sentDate}
                  </div>
                </div>

                <Badge type="en_attente">{lang==='fr'?'En attente':'Pending'}</Badge>
                <button onClick={()=>handleCancelInvite(inv.id)} style={{width:32,height:32,borderRadius:6,border:`1px solid ${C.border}`,background:C.white,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Trash2 size={14} color="#FF6B35"/>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PERMISSIONS INFO */}
      <div style={{marginTop:32,padding:16,borderRadius:12,background:'#EFF6FF',border:'1px solid #BFDBFE'}}>
        <h3 style={{fontSize:13,fontWeight:700,color:'#1E40AF',margin:'0 0 12px',display:'flex',gap:8,alignItems:'center'}}>
          <Shield size={16}/>
          {lang==='fr'?'Permissions':'Permissions'}
        </h3>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:12,fontSize:12}}>
          <div>
            <div style={{fontWeight:600,color:'#1E40AF'}}>{lang==='fr'?'Propriétaire':'Owner'}</div>
            <div style={{color:'#3730A3',marginTop:4}}>Accès complet et gestion d'équipe</div>
          </div>
          <div>
            <div style={{fontWeight:600,color:'#1E40AF'}}>{lang==='fr'?'Administrateur':'Admin'}</div>
            <div style={{color:'#3730A3',marginTop:4}}>Lecture/écriture sur tout</div>
          </div>
          <div>
            <div style={{fontWeight:600,color:'#1E40AF'}}>{lang==='fr'?'Éditeur/Spectateur':'Editor/Viewer'}</div>
            <div style={{color:'#3730A3',marginTop:4}}>Accès restreint selon les droits</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamManagementScreen
