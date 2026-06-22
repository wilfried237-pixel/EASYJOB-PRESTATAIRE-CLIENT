import { useState, useEffect, useRef, useCallback } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Inp, Sel, Modal, Av, Stars, Badge, Toggle } from '../../components/ui'
import { toast, useIsMobile, fmt, fmtN } from '../../utils/utils.jsx'
import { missionsAPI, messagesAPI, authAPI } from '../../api/client'
import { FLS, MISSIONS, CATS, AFRICA, SKILLS, QUIZ } from '../../data/mockData'
import {
  Search, MapPin, Star, Bell, MessageSquare, Briefcase, Zap,
  Plus, Send, LogOut, ChevronRight, ArrowRight,
  Lock, CheckCircle, Clock, User, Home, Check, X, Filter,
  Upload, Edit3, Phone, DollarSign, Calendar, BarChart2,
  Shield, RefreshCw, Download, ChevronDown, ChevronLeft,
  Settings, Share2, Info, TrendingUp, Award, FileText, Camera,
  Grid, List, MoreVertical, Eye, EyeOff, Trash2, Activity,
  Users, Sparkles, LogIn, Languages, Globe, Menu, AlignLeft,
  Code, Scissors, Wrench, Car, Utensils, Shirt, Music, Video,
  BookOpen, Cpu, Package, Hash, Image, ArrowLeft, PenLine,
  CheckCircle2, AlertCircle, Building, GraduationCap,
  Heart, Leaf, Map, ThumbsUp, SlidersHorizontal
} from 'lucide-react'

// ── Badge quartier compact ──
const QBadge=({count,lang,sm,sameQ=false})=>(
  <div style={{display:'inline-flex',alignItems:'center',gap:sm?3:4,
    background:sameQ?`${C.brand}12`:C.voisinLt,
    border:`1px solid ${sameQ?C.brand+'30':C.voisin+'25'}`,
    borderRadius:20,padding:sm?'2px 7px':'3px 9px'}}>
    <span style={{fontSize:sm?9:11}}>{sameQ?'🏡':'🏘️'}</span>
    <span style={{fontSize:sm?9:11,fontWeight:700,
      color:sameQ?C.brand:C.voisin,fontFamily:'Inter,sans-serif'}}>
      {lang==='fr'
        ?`${count} voisin${count>1?'s':''}`
        :`${count} nbr`}
    </span>
  </div>
)

// ── Skeleton card ──
const SkeletonCard=()=>(
  <div style={{background:C.white,borderRadius:16,padding:'18px 20px',
    border:`1px solid ${C.border}`,marginBottom:10}}>
    <div style={{display:'flex',gap:14,alignItems:'center'}}>
      <div style={{width:52,height:52,borderRadius:14,background:C.sableDk,flexShrink:0,
        animation:'vtSkel .9s infinite ease-in-out alternate'}}/>
      <div style={{flex:1}}>
        <div style={{height:14,background:C.sableDk,borderRadius:6,width:'60%',marginBottom:8,
          animation:'vtSkel .9s infinite ease-in-out alternate'}}/>
        <div style={{height:11,background:C.sableDk,borderRadius:5,width:'40%',
          animation:'vtSkel .9s .15s infinite ease-in-out alternate'}}/>
      </div>
    </div>
  </div>
)

const ExploreScreen=({user,data,lang,setSub,setSelFL,setSelM,setSelConv})=>{
  const t=T[lang]
  const isMobile=useIsMobile()
  const[tab,setTab]=useState('prestataires')
  const[q,setQ]=useState('')
  const[catF,setCatF]=useState(null)
  const[countryF,setCountryF]=useState('')
  const[viewMode,setViewMode]=useState('list')
  const[showFilters,setShowFilters]=useState(false)
  const[onlyVoisin,setOnlyVoisin]=useState(false)
  const[onlyDispo,setOnlyDispo]=useState(false)
  const[loading,setLoading]=useState(true)

  useEffect(()=>{const id=setTimeout(()=>setLoading(false),600);return()=>clearTimeout(id)},[])

  // Catégories de Voisin'Talents (artisans + services de proximité)
  const VOISIN_CATS=[
    {id:null, emoji:'🌟',fr:'Populaires',en:'Popular'},
    {id:7,   emoji:'🔧',fr:'Plomberie',en:'Plumbing'},
    {id:8,   emoji:'⚡',fr:'Électricité',en:'Electrical'},
    {id:5,   emoji:'✂️',fr:'Coiffure',en:'Hair & Beauty'},
    {id:14,  emoji:'📚',fr:'Cours',en:'Tutoring'},
    {id:11,  emoji:'🧹',fr:'Ménage',en:'Cleaning'},
    {id:9,   emoji:'🚗',fr:'Mécanique',en:'Mechanic'},
    {id:10,  emoji:'🍳',fr:'Cuisine',en:'Catering'},
    {id:12,  emoji:'📷',fr:'Photo',en:'Photo'},
  ]

  // Enrichissement des FLS avec les champs voisin (simulation)
  const enrichedFLS=data.freelancers.map((f,i)=>({
    ...f,
    voisins: [12,8,5,19,7,11,3,6,14,9,4,17,2,8][i%14],
    confirme: [12,8,5,19,7,11,3][i%7]>=3,
    sameQuartier: i%3===0,
    lastAvis: lang==='fr'
      ?`"${['Super prestataire, très pro !','Disponible et efficace.','Je recommande vivement !'][i%3]}"`
      :`"${['Great provider, very professional!','Available and efficient.','Highly recommended!'][i%3]}"`,
  }))

  const trustPassport={
    zone:user.district||user.city||(lang==='fr'?'Quartier non renseigne':'District not set'),
    verified:(data.freelancers||[]).filter(f=>f.verifie).length,
    proofVault:(data.freelancers||[]).reduce((sum,f)=>sum+(f.education?.length||0)+(f.work?.length||0)+(f.reviews?.length||0),0),
  }

  const fls=enrichedFLS.filter(f=>
    (!q||(f.nom+f.title+(f.skills||[]).join(' ')).toLowerCase().includes(q.toLowerCase()))&&
    (!catF||f.catId===catF)&&
    (!countryF||f.country===countryF)&&
    (!onlyVoisin||f.confirme)&&
    (!onlyDispo||f.dispo))

  const ms=data.missions.filter(m=>
    (!q||(m.titre+(m.titreF||'')+(m.desc||'')).toLowerCase().includes(q.toLowerCase()))&&
    (!catF||m.catId===catF)&&
    (!countryF||m.country===countryF))

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.sable}}>

      {/* ── EN-TÊTE RECHERCHE ── */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,
        padding:'14px 20px',flexShrink:0}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>

          {/* Barre de recherche + boutons */}
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            <div style={{flex:1,display:'flex',alignItems:'center',gap:10,
              background:C.sable,border:`1.5px solid ${C.border}`,
              borderRadius:10,padding:'0 14px',height:42}}>
              <Search size={15} color={C.textLt}/>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.searchPh}
                style={{flex:1,border:'none',background:'transparent',fontSize:14,
                  color:C.text,fontFamily:'Inter,sans-serif',outline:'none'}}/>
              {q&&<button onClick={()=>setQ('')} style={{background:'none',border:'none',cursor:'pointer',display:'flex'}}>
                <X size={13} color={C.textLt}/></button>}
            </div>

            <button onClick={()=>setShowFilters(v=>!v)}
              style={{height:42,padding:'0 14px',borderRadius:10,
                background:showFilters?C.safranLt:C.sable,
                border:`1.5px solid ${showFilters?C.safran:C.border}`,cursor:'pointer',
                display:'flex',alignItems:'center',gap:6,
                color:showFilters?C.safranDk:C.textMid,
                fontSize:13,fontWeight:600,fontFamily:'Inter,sans-serif'}}>
              <SlidersHorizontal size={14}/>
              {!isMobile&&t.filterResults}
            </button>

            {!isMobile&&(
              <div style={{display:'flex',gap:3,background:C.sable,
                border:`1.5px solid ${C.border}`,borderRadius:10,padding:3}}>
                {[{v:'list',icon:List},{v:'grid',icon:Grid}].map(vm=>(
                  <button key={vm.v} onClick={()=>setViewMode(vm.v)}
                    style={{width:34,height:34,borderRadius:7,border:'none',cursor:'pointer',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      background:viewMode===vm.v?C.white:'transparent',
                      boxShadow:viewMode===vm.v?'0 1px 4px rgba(26,18,8,.08)':'none'}}>
                    <vm.icon size={14} color={viewMode===vm.v?C.safran:C.textLt}/>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtres expandables */}
          {showFilters&&(
            <div style={{display:'flex',gap:8,flexWrap:'wrap',
              paddingTop:12,borderTop:`1px solid ${C.border}`,marginBottom:10}}>

              <select value={catF||''} onChange={e=>setCatF(e.target.value?Number(e.target.value):null)}
                style={{padding:'7px 12px',borderRadius:8,border:`1px solid ${C.border}`,
                  fontSize:12,background:C.white,cursor:'pointer',fontFamily:'Inter,sans-serif',color:C.textMid}}>
                <option value="">{lang==='fr'?'Toutes catégories':'All categories'}</option>
                {CATS.map(c=><option key={c.id} value={c.id}>{c.emoji} {lang==='fr'?c.fr:c.en}</option>)}
              </select>

              <select value={countryF} onChange={e=>setCountryF(e.target.value)}
                style={{padding:'7px 12px',borderRadius:8,border:`1px solid ${C.border}`,
                  fontSize:12,background:C.white,cursor:'pointer',fontFamily:'Inter,sans-serif',color:C.textMid}}>
                <option value="">{lang==='fr'?'Tous les pays':'All countries'}</option>
                {AFRICA.map(a=><option key={a.code} value={a.code}>{a.flag} {lang==='fr'?a.fr:a.en}</option>)}
              </select>

              {/* Toggle "Confirmé quartier" */}
              <button onClick={()=>setOnlyVoisin(v=>!v)}
                style={{display:'flex',alignItems:'center',gap:6,padding:'7px 12px',
                  borderRadius:8,border:`1px solid ${onlyVoisin?C.voisin+'40':C.border}`,
                  background:onlyVoisin?C.voisinLt:C.white,cursor:'pointer',
                  fontSize:12,fontWeight:600,color:onlyVoisin?C.voisin:C.textMid,
                  fontFamily:'Inter,sans-serif'}}>
                <span>🏘️</span>
                {lang==='fr'?'Confirmé quartier':'Neighbourhood verified'}
              </button>

              {/* Toggle "Disponible" */}
              <button onClick={()=>setOnlyDispo(v=>!v)}
                style={{display:'flex',alignItems:'center',gap:6,padding:'7px 12px',
                  borderRadius:8,border:`1px solid ${onlyDispo?C.brand+'40':C.border}`,
                  background:onlyDispo?C.brandLt:C.white,cursor:'pointer',
                  fontSize:12,fontWeight:600,color:onlyDispo?C.brand:C.textMid,
                  fontFamily:'Inter,sans-serif'}}>
                <span style={{width:7,height:7,borderRadius:4,
                  background:C.brand,display:'inline-block'}}/>
                {lang==='fr'?'Disponible':'Available'}
              </button>

              {(catF||countryF||onlyVoisin||onlyDispo)&&(
                <button onClick={()=>{setCatF(null);setCountryF('');setOnlyVoisin(false);setOnlyDispo(false)}}
                  style={{display:'flex',alignItems:'center',gap:4,padding:'7px 12px',
                    borderRadius:8,border:`1px solid ${C.border}`,background:'none',
                    cursor:'pointer',fontSize:12,fontWeight:600,color:C.terre,fontFamily:'Inter,sans-serif'}}>
                  <X size={11}/>{lang==='fr'?'Réinitialiser':'Reset'}
                </button>
              )}
            </div>
          )}

          {/* Tabs catégories horizontales */}
          <div style={{display:'flex',gap:0,overflowX:'auto',paddingBottom:2,
            scrollbarWidth:'none',msOverflowStyle:'none'}}>
            {VOISIN_CATS.map(cat=>{
              const active=catF===cat.id
              return(
                <button key={cat.id??'all'} onClick={()=>setCatF(cat.id)}
                  style={{display:'flex',alignItems:'center',gap:6,padding:'8px 14px',
                    borderRadius:20,border:`1.5px solid ${active?C.safran:C.border}`,
                    background:active?C.safranLt:C.white,cursor:'pointer',
                    fontSize:12,fontWeight:active?700:500,
                    color:active?C.safranDk:C.textMid,fontFamily:'Inter,sans-serif',
                    whiteSpace:'nowrap',marginRight:6,flexShrink:0,
                    transition:'all .15s'}}>
                  <span>{cat.emoji}</span>
                  {lang==='fr'?cat.fr:cat.en}
                </button>
              )
            })}
          </div>

          <div style={{marginTop:14,background:G.hero,borderRadius:18,padding:16,border:`1px solid ${C.border}`}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10,flexWrap:'wrap'}}>
              <div>
                <div style={{fontSize:11,fontWeight:800,color:C.safranDk,fontFamily:'Inter,sans-serif',textTransform:'uppercase'}}>
                  {lang==='fr'?'Passeport confiance Afrique':'Africa trust passport'}
                </div>
                <div style={{fontSize:18,fontWeight:900,color:C.text,fontFamily:'Outfit,sans-serif',marginTop:4}}>
                  {lang==='fr'?'Verifier avant de choisir':'Verify before choosing'}
                </div>
                <div style={{fontSize:12,color:C.textMid,marginTop:6,fontFamily:'Inter,sans-serif',lineHeight:1.5,maxWidth:720}}>
                  {lang==='fr'
                    ?"Le client voit l'identite, le quartier, les preuves et les avis avant de contacter."
                    :'Clients see identity, district, proof and reviews before contacting.'}
                </div>
              </div>
              <Badge type="verified" sm>{lang==='fr'?'Confiance locale':'Local trust'}</Badge>
            </div>
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:10,marginTop:14}}>
              {[
                {icon:MapPin,label:lang==='fr'?'Quartier':'District',value:trustPassport.zone},
                {icon:Shield,label:lang==='fr'?'Prestataires verifies':'Verified providers',value:String(trustPassport.verified)},
                {icon:Camera,label:lang==='fr'?'Preuves visibles':'Visible proofs',value:String(trustPassport.proofVault)},
              ].map(item=>(
                <div key={item.label} style={{background:C.white,borderRadius:14,padding:'12px 14px',border:`1px solid ${C.border}`}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                    <item.icon size={14} color={C.safran}/>
                    <div style={{fontSize:11,fontWeight:700,color:C.textLt,fontFamily:'Inter,sans-serif',textTransform:'uppercase'}}>
                      {item.label}
                    </div>
                  </div>
                  <div style={{fontSize:15,fontWeight:800,color:C.text,fontFamily:'Outfit,sans-serif'}}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ONGLETS Prestataires / Tâches ── */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,
        padding:'0 20px',flexShrink:0}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',gap:0}}>
          {[
            {v:'prestataires',l:`👤 ${lang==='fr'?'Prestataires':'Providers'} (${fls.length})`},
            {v:'taches',l:`📋 ${lang==='fr'?'Tâches':'Tasks'} (${ms.length})`},
          ].map(tb=>(
            <button key={tb.v} onClick={()=>setTab(tb.v)}
              style={{padding:'12px 18px',border:'none',background:'none',cursor:'pointer',
                fontSize:13,fontWeight:tab===tb.v?700:500,
                color:tab===tb.v?C.safranDk:C.textMid,fontFamily:'Inter,sans-serif',
                borderBottom:tab===tb.v?`2.5px solid ${C.safran}`:'2.5px solid transparent',
                transition:'all .15s'}}>
              {tb.l}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div style={{flex:1,overflowY:'auto',padding:isMobile?'16px':'20px 24px'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>

          {/* Compteur résultats */}
          <div style={{marginBottom:14,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span style={{fontSize:13,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
              {tab==='prestataires'
                ?`${fls.length} ${lang==='fr'?'prestataire'+((fls.length!==1)?'s':''):'provider'+((fls.length!==1)?'s':'')}`
                :`${ms.length} ${lang==='fr'?'tâche'+((ms.length!==1)?'s':''):'task'+((ms.length!==1)?'s':'')}`}
            </span>
            {onlyVoisin&&(
              <div style={{display:'flex',alignItems:'center',gap:5,
                background:C.voisinLt,borderRadius:20,padding:'4px 10px',
                border:`1px solid ${C.voisin}25`}}>
                <span style={{fontSize:11}}>🏘️</span>
                <span style={{fontSize:11,fontWeight:700,color:C.voisin,fontFamily:'Inter,sans-serif'}}>
                  {lang==='fr'?'Confirmés quartier seulement':'Neighbourhood verified only'}
                </span>
              </div>
            )}
          </div>

          {loading&&[1,2,3,4].map(i=><SkeletonCard key={i}/>)}

          {/* ── LISTE PRESTATAIRES ── */}
          {!loading&&tab==='prestataires'&&(
            viewMode==='grid'&&!isMobile
              ?(
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
                  {fls.length===0
                    ?<div style={{gridColumn:'1/-1',textAlign:'center',padding:'60px 0'}}>
                        <div style={{fontSize:48,marginBottom:12}}>🔍</div>
                        <p style={{fontSize:15,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                          {t.noResults}
                        </p>
                      </div>
                    :fls.map(fl=>{
                        const country=AFRICA.find(a=>a.code===fl.country)
                        return(
                          <div key={fl.id} onClick={()=>{setSelFL(fl);setSub('freelancer')}}
                            style={{background:C.white,borderRadius:18,padding:'20px',
                              border:`1px solid ${C.border}`,cursor:'pointer',transition:'all .18s'}}
                            onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 8px 24px ${C.safran}18`;e.currentTarget.style.borderColor=C.safran+'40'}}
                            onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor=C.border}}>
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                              <div style={{position:'relative'}}>
                                <Av code={fl.av} size={52}/>
                                {fl.dispo&&<div style={{position:'absolute',bottom:1,right:1,width:12,height:12,
                                  borderRadius:6,background:C.brand,border:`2px solid ${C.white}`}}/>}
                              </div>
                              {fl.confirme&&<QBadge count={fl.voisins} lang={lang} sameQ={fl.sameQuartier}/>}
                            </div>
                            <div style={{fontWeight:700,fontSize:14,color:C.text,fontFamily:'Outfit,sans-serif',marginBottom:3}}>
                              {fl.nom}
                            </div>
                            <div style={{fontSize:12,color:C.textMid,marginBottom:8,fontFamily:'Inter,sans-serif',lineHeight:1.4}}>
                              {fl.title.split('&')[0].split('—')[0].trim()}
                            </div>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                              <Stars note={fl.note} sz={10}/>
                              <span style={{fontSize:11,color:C.textLt,fontFamily:'Inter,sans-serif'}}>
                                {country?.flag} {fl.city}
                              </span>
                            </div>
                            {fl.lastAvis&&(
                              <div style={{marginTop:10,fontSize:11,color:C.textMid,fontFamily:'Inter,sans-serif',
                                fontStyle:'italic',lineHeight:1.5,
                                borderTop:`1px solid ${C.border}`,paddingTop:8}}>
                                {fl.lastAvis}
                              </div>
                            )}
                          </div>
                        )
                      })
                  }
                </div>
              ):(
                <div>
                  {fls.length===0
                    ?<div style={{textAlign:'center',padding:'60px 0'}}>
                        <div style={{fontSize:48,marginBottom:12}}>🔍</div>
                        <p style={{fontSize:15,color:C.textMid,fontFamily:'Inter,sans-serif',marginBottom:8}}>
                          {t.noResults}
                        </p>
                        <p style={{fontSize:13,color:C.textLt,fontFamily:'Inter,sans-serif'}}>
                          {lang==='fr'?'Essaie une autre catégorie ou élargis ton rayon.':'Try another category or broaden your area.'}
                        </p>
                      </div>
                    :fls.map(fl=>{
                        const country=AFRICA.find(a=>a.code===fl.country)
                        return(
                          <div key={fl.id} onClick={()=>{setSelFL(fl);setSub('freelancer')}}
                            style={{background:C.white,borderRadius:16,padding:'16px 18px',
                              marginBottom:10,border:`1px solid ${C.border}`,cursor:'pointer',
                              transition:'all .18s',display:'flex',gap:14,alignItems:'center'}}
                            onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 6px 20px ${C.safran}14`;e.currentTarget.style.borderColor=C.safran+'40'}}
                            onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor=C.border}}>

                            <div style={{position:'relative',flexShrink:0}}>
                              <Av code={fl.av} size={50}/>
                              {fl.dispo&&<div style={{position:'absolute',bottom:1,right:1,width:12,height:12,
                                borderRadius:6,background:C.brand,border:`2px solid ${C.white}`}}/>}
                            </div>

                            <div style={{flex:1,minWidth:0}}>
                              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:3}}>
                                <div style={{fontWeight:700,fontSize:14,color:C.text,fontFamily:'Outfit,sans-serif'}}>
                                  {fl.nom}
                                </div>
                                <div style={{display:'flex',gap:5,alignItems:'center',flexShrink:0}}>
                                  {fl.confirme&&<QBadge count={fl.voisins} lang={lang} sm sameQ={fl.sameQuartier}/>}
                                  {fl.badge&&<Badge type={fl.badge} sm>{fl.badge==='top'?'🔥':'⭐'}</Badge>}
                                </div>
                              </div>
                              <div style={{fontSize:12,color:C.textMid,marginBottom:6,fontFamily:'Inter,sans-serif',
                                whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                {fl.title.split('&')[0].split('—')[0].trim()}
                              </div>
                              <div style={{display:'flex',gap:12,fontSize:11,color:C.textLt,flexWrap:'wrap'}}>
                                <Stars note={fl.note} sz={10}/>
                                <span>{country?.flag} {fl.city}{fl.district?`, ${fl.district}`:''}</span>
                                {fl.dispo&&<span style={{color:C.brand,fontWeight:600}}>
                                  ● {lang==='fr'?'Disponible':'Available'}
                                </span>}
                              </div>
                              {fl.lastAvis&&(
                                <div style={{marginTop:6,fontSize:11,color:C.textMid,fontStyle:'italic',
                                  fontFamily:'Inter,sans-serif',lineHeight:1.4,
                                  whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                  {fl.lastAvis}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })
                  }
                </div>
              )
          )}

          {/* ── LISTE TÂCHES ── */}
          {!loading&&tab==='taches'&&(
            <div>
              {ms.length===0
                ?<div style={{textAlign:'center',padding:'60px 0'}}>
                    <div style={{fontSize:48,marginBottom:12}}>📋</div>
                    <p style={{fontSize:15,color:C.textMid,fontFamily:'Inter,sans-serif'}}>
                      {t.noResults}
                    </p>
                  </div>
                :ms.map(m=>{
                    const cat=CATS.find(c=>c.id===m.catId)
                    const country=AFRICA.find(a=>a.code===m.country)
                    return(
                      <div key={m.id} onClick={()=>{setSelM(m);setSub('mission')}}
                        style={{background:C.white,borderRadius:16,padding:'16px 18px',
                          marginBottom:10,border:`1px solid ${C.border}`,cursor:'pointer',
                          transition:'all .18s',display:'flex',gap:14,alignItems:'flex-start'}}
                        onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 6px 20px ${C.safran}14`;e.currentTarget.style.borderColor=C.safran+'40'}}
                        onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor=C.border}}>
                        <div style={{width:46,height:46,borderRadius:12,
                          background:(cat?.color||C.safran)+'18',
                          display:'flex',alignItems:'center',justifyContent:'center',
                          fontSize:22,flexShrink:0}}>
                          {cat?.emoji||'📋'}
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8}}>
                            <div style={{fontWeight:700,fontSize:14,color:C.text,
                              fontFamily:'Outfit,sans-serif',lineHeight:1.3}}>
                              {lang==='fr'?m.titreF||m.titre:m.titre}
                            </div>
                            {m.urgent&&<Badge type="urgent" sm>🔥</Badge>}
                          </div>
                          <div style={{fontSize:12,color:C.textLt,marginTop:4,
                            display:'flex',gap:12,flexWrap:'wrap',fontFamily:'Inter,sans-serif'}}>
                            <span style={{color:C.safranDk,fontWeight:700}}>
                              {m.budget?.type==='fixed'?fmt(m.budget.min):`${fmt(m.budget?.min)}–${fmt(m.budget?.max)}`}
                            </span>
                            <span>{country?.flag} {m.city}</span>
                            <span>⏰ {m.postedAt}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })
              }
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes vtSkel { from{opacity:.4} to{opacity:.9} }
      `}</style>

      {isMobile&&<div style={{height:72}}/>}
    </div>
  )
}

export default ExploreScreen
