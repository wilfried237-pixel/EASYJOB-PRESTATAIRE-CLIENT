import { useState, useMemo } from 'react'
import { C, T } from '../../utils/tokens'
import { Btn, Sel, Badge, Av, Stars } from '../../components/ui'
import { useIsMobile, fmtN } from '../../utils/utils.jsx'
import { PgHdr } from '../../components/layout'
import { FLS, MISSIONS, CATS, AFRICA } from '../../data/mockData'
import {
  Search, X, MapPin,
  Zap, SlidersHorizontal, Eye
} from 'lucide-react'

const SearchScreen=({data,lang,onSelectFL,onSelectM,onBack})=>{
  const t=T[lang], isMobile=useIsMobile()
  const[searchType,setSearchType]=useState('missions')
  const[query,setQuery]=useState('')
  const[filters,setFilters]=useState({
    category:'',country:'',xp:'',
    rateMin:0,verified:false,sorting:'relevance'
  })
  const[showFilters,setShowFilters]=useState(!isMobile)

  const missions=data?.missions||MISSIONS
  const freelancers=data?.freelancers||FLS

  const filtered=useMemo(()=>{
    if(searchType==='missions'){
      return missions.filter(m=>{
        const title=lang==='fr'?m.titreF||m.titre:m.titre
        const q=query.toLowerCase()
        if(query&&!title?.toLowerCase().includes(q)&&!m.desc?.toLowerCase().includes(q))return false
        if(filters.category){
          const cat=CATS.find(c=>c.id===m.catId)
          if(!cat?.fr.toLowerCase().includes(filters.category.toLowerCase())&&
             !cat?.en.toLowerCase().includes(filters.category.toLowerCase()))return false
        }
        if(filters.country&&m.country!==filters.country)return false
        return true
      })
    }else{
      return freelancers.filter(f=>{
        const q=query.toLowerCase()
        if(query&&!f.nom?.toLowerCase().includes(q)&&!f.title?.toLowerCase().includes(q))return false
        if(filters.country&&f.country!==filters.country)return false
        if(filters.xp&&f.xp!==filters.xp)return false
        if((f.note||0)<filters.rateMin)return false
        if(filters.verified&&!f.verifie)return false
        return true
      })
    }
  },[searchType,query,filters,missions,freelancers,lang])

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:C.bg}}>
    <PgHdr title={lang==='fr'?'Recherche avancée':'Advanced Search'} onBack={onBack}/>
    <div style={{flex:1,display:'flex',flexDirection:isMobile?'column':'row',overflow:'hidden'}}>

      {/* SIDEBAR — Filtres */}
      {showFilters&&(
        <div style={{
          flex:isMobile?'none':'0 0 260px',
          background:C.white,
          borderRight:!isMobile?`1px solid ${C.border}`:undefined,
          borderBottom:isMobile?`1px solid ${C.border}`:undefined,
          padding:20,
          overflowY:'auto',
          maxHeight:isMobile?'none':'100%',
        }}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h3 style={{fontSize:13,fontWeight:700,color:C.text,margin:0,fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'Filtres':'Filters'}</h3>
            {isMobile&&<button onClick={()=>setShowFilters(false)} style={{background:'none',border:'none',cursor:'pointer'}}><X size={18}/></button>}
          </div>

          <div style={{display:'grid',gap:14}}>
            {/* Type toggle */}
            <div>
              <div style={{fontSize:11,color:C.textMid,fontWeight:600,marginBottom:6,textTransform:'uppercase',fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'Type':'Type'}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                {[{v:'missions',fr:'Missions',en:'Jobs'},{v:'freelancers',fr:'Freelances',en:'Freelancers'}].map(o=>(
                  <button key={o.v} onClick={()=>setSearchType(o.v)}
                    style={{padding:'8px 4px',borderRadius:8,border:`2px solid ${searchType===o.v?C.brand:C.border}`,
                      background:searchType===o.v?C.brandLt:C.bg,color:searchType===o.v?C.brand:C.text,
                      cursor:'pointer',fontWeight:600,fontSize:12,fontFamily:'Inter,sans-serif'}}>
                    {lang==='fr'?o.fr:o.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Catégorie — missions only */}
            {searchType==='missions'&&(
              <div>
                <div style={{fontSize:11,color:C.textMid,fontWeight:600,marginBottom:6,textTransform:'uppercase',fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'Catégorie':'Category'}</div>
                <Sel value={filters.category} onChange={e=>setFilters(f=>({...f,category:e.target.value}))}>
                  <option value="">{lang==='fr'?'Toutes':'All'}</option>
                  {CATS.slice(0,8).map(c=>(
                    <option key={c.id} value={lang==='fr'?c.fr:c.en}>{c.emoji} {lang==='fr'?c.fr:c.en}</option>
                  ))}
                </Sel>
              </div>
            )}

            {/* XP — freelancers only */}
            {searchType==='freelancers'&&(
              <>
                <div>
                  <div style={{fontSize:11,color:C.textMid,fontWeight:600,marginBottom:6,textTransform:'uppercase',fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'Niveau':'Level'}</div>
                  <Sel value={filters.xp} onChange={e=>setFilters(f=>({...f,xp:e.target.value}))}>
                    <option value="">{lang==='fr'?'Tous':'All'}</option>
                    <option value="entry">{lang==='fr'?'Débutant':'Entry'}</option>
                    <option value="intermediate">{lang==='fr'?'Intermédiaire':'Intermediate'}</option>
                    <option value="expert">Expert</option>
                  </Sel>
                </div>
                <div>
                  <div style={{fontSize:11,color:C.textMid,fontWeight:600,marginBottom:6,textTransform:'uppercase',fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'Note minimale':'Min Rating'}</div>
                  <Sel value={filters.rateMin} onChange={e=>setFilters(f=>({...f,rateMin:parseFloat(e.target.value)}))}>
                    <option value="0">{lang==='fr'?'Toutes':'All'}</option>
                    <option value="4">4+ ⭐</option>
                    <option value="4.5">4.5+ ⭐</option>
                  </Sel>
                </div>
                <label style={{display:'flex',gap:8,alignItems:'center',cursor:'pointer'}}>
                  <input type="checkbox" checked={filters.verified} onChange={e=>setFilters(f=>({...f,verified:e.target.checked}))} style={{width:15,height:15,accentColor:C.brand}}/>
                  <span style={{fontSize:13,color:C.text,fontFamily:'Inter,sans-serif'}}>✓ {lang==='fr'?'Vérifiés seulement':'Verified only'}</span>
                </label>
              </>
            )}

            {/* Pays */}
            <div>
              <div style={{fontSize:11,color:C.textMid,fontWeight:600,marginBottom:6,textTransform:'uppercase',fontFamily:'Inter,sans-serif'}}>{lang==='fr'?'Pays':'Country'}</div>
              <Sel value={filters.country} onChange={e=>setFilters(f=>({...f,country:e.target.value}))}>
                <option value="">{lang==='fr'?'Tous':'All'}</option>
                {AFRICA.slice(0,10).map(a=>(
                  <option key={a.code} value={a.code}>{a.flag} {lang==='fr'?a.fr:a.en}</option>
                ))}
              </Sel>
            </div>

            <Btn v="secondary" full onClick={()=>setFilters({category:'',country:'',xp:'',rateMin:0,verified:false,sorting:'relevance'})}>
              {lang==='fr'?'Réinitialiser':'Reset'}
            </Btn>
          </div>
        </div>
      )}

      {/* CONTENU PRINCIPAL */}
      <div style={{flex:1,padding:'16px 20px',overflowY:'auto'}}>
        {/* Barre de recherche */}
        <div style={{marginBottom:20,display:'flex',gap:10}}>
          <div style={{flex:1,position:'relative'}}>
            <Search size={16} color={C.textMid} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
            <input type="text" placeholder={lang==='fr'?'Rechercher missions, freelances...':'Search missions, freelancers...'}
              value={query} onChange={e=>setQuery(e.target.value)}
              style={{width:'100%',padding:'11px 14px 11px 38px',borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:14,outline:'none',fontFamily:'Inter,sans-serif',boxSizing:'border-box',background:C.white}}
              onFocus={e=>e.target.style.borderColor=C.brand}
              onBlur={e=>e.target.style.borderColor=C.border}/>
          </div>
          <button onClick={()=>setShowFilters(!showFilters)}
            style={{width:44,height:44,borderRadius:10,border:`1.5px solid ${showFilters?C.brand:C.border}`,
              background:showFilters?C.brandLt:C.white,cursor:'pointer',
              display:'flex',alignItems:'center',justifyContent:'center',color:showFilters?C.brand:C.textMid}}>
            <SlidersHorizontal size={17}/>
          </button>
        </div>

        <div style={{fontSize:12,color:C.textMid,marginBottom:12,fontFamily:'Inter,sans-serif'}}>
          {filtered.length} {lang==='fr'?(searchType==='missions'?'mission(s)':'freelance(s)'):(searchType==='missions'?'job(s)':'freelancer(s)')}
          {query&&` ${lang==='fr'?'pour':'for'} "${query}"`}
        </div>

        {/* Résultats */}
        <div style={{display:'grid',gap:10}}>
          {filtered.length===0?(
            <div style={{textAlign:'center',padding:'60px 20px',color:C.textMid}}>
              <Eye size={40} style={{margin:'0 auto 14px',opacity:.2,display:'block'}}/>
              <div style={{fontFamily:'Inter,sans-serif',fontSize:14,fontWeight:600}}>{lang==='fr'?'Aucun résultat':'No results found'}</div>
              <div style={{fontFamily:'Inter,sans-serif',fontSize:12,marginTop:6,color:C.textLt}}>
                {lang==='fr'?'Essayez d\'autres mots-clés ou retirez les filtres.':'Try different keywords or remove filters.'}
              </div>
            </div>
          ):filtered.map(item=>{
            if(searchType==='missions'){
              const title=lang==='fr'?item.titreF||item.titre:item.titre
              const cat=CATS.find(c=>c.id===item.catId)
              const country=AFRICA.find(a=>a.code===item.country)
              return(
                <div key={item.id} style={{background:C.white,borderRadius:14,border:`1.5px solid ${item.urgent?C.safran+'40':C.border}`,
                  padding:'14px 16px',cursor:'pointer',transition:'all .2s'}}
                  onClick={()=>onSelectM&&onSelectM(item)}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.brand+'60';e.currentTarget.style.boxShadow='0 4px 14px rgba(0,0,0,.07)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=item.urgent?C.safran+'40':C.border;e.currentTarget.style.boxShadow='none'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8,gap:8}}>
                    <div style={{flex:1}}>
                      {item.urgent&&<div style={{display:'inline-flex',alignItems:'center',gap:3,background:C.safranLt,color:C.safranDk,fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:9,marginBottom:5,fontFamily:'Inter,sans-serif'}}><Zap size={9} fill={C.safranDk}/>URGENT</div>}
                      <h3 style={{fontSize:14,fontWeight:700,color:C.text,margin:0,fontFamily:'Outfit,sans-serif',lineHeight:1.3}}>{title}</h3>
                      <p style={{fontSize:12,color:C.textMid,margin:'4px 0 0',fontFamily:'Inter,sans-serif',lineHeight:1.5,
                        display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{item.desc}</p>
                    </div>
                    <Badge type="ouverte">{item.budget?.min?fmtN(item.budget.min)+' FCFA':'—'}</Badge>
                  </div>
                  <div style={{display:'flex',gap:10,fontSize:11,color:C.textMid,flexWrap:'wrap',fontFamily:'Inter,sans-serif'}}>
                    {cat&&<span>{cat.emoji} {lang==='fr'?cat.fr:cat.en}</span>}
                    <span><MapPin size={10} color={C.safran} style={{verticalAlign:'middle'}}/> {country?.flag} {item.city}</span>
                    <span>👥 {item.props||0} {lang==='fr'?'propositions':'proposals'}</span>
                    {item.client?.nom&&<span>👤 {item.client.nom}</span>}
                  </div>
                </div>
              )
            }else{
              const country=AFRICA.find(a=>a.code===item.country)
              return(
                <div key={item.id} style={{background:C.white,borderRadius:14,border:`1.5px solid ${C.border}`,
                  padding:'14px 16px',cursor:'pointer',transition:'all .2s'}}
                  onClick={()=>onSelectFL&&onSelectFL(item)}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.brand+'60';e.currentTarget.style.boxShadow='0 4px 14px rgba(0,0,0,.07)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow='none'}}>
                  <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                    <div style={{position:'relative',flexShrink:0}}>
                      <Av code={item.av} size={50}/>
                      {item.dispo&&<div style={{position:'absolute',bottom:1,right:1,width:12,height:12,borderRadius:6,background:C.brand,border:`2px solid ${C.white}`}}/>}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
                        <h3 style={{fontSize:14,fontWeight:700,color:C.text,margin:0,fontFamily:'Outfit,sans-serif'}}>{item.nom}</h3>
                        {item.verifie&&<span style={{background:C.brandLt,color:C.brand,fontSize:9,fontWeight:700,padding:'1px 5px',borderRadius:6,fontFamily:'Inter,sans-serif'}}>✓</span>}
                      </div>
                      <p style={{fontSize:12,color:C.textMid,margin:'0 0 5px',fontFamily:'Inter,sans-serif'}}>{item.title}</p>
                      <Stars note={item.note||0} sz={11}/>
                      <div style={{display:'flex',gap:10,fontSize:11,color:C.textMid,marginTop:6,flexWrap:'wrap',fontFamily:'Inter,sans-serif'}}>
                        <span><MapPin size={10} color={C.safran} style={{verticalAlign:'middle'}}/> {country?.flag} {item.city}</span>
                        <span>{item.xp}</span>
                        <span>{item.avis||0} {lang==='fr'?'avis':'reviews'}</span>
                      </div>
                    </div>
                    <div style={{textAlign:'right',flexShrink:0}}>
                      <div style={{fontSize:15,fontWeight:800,color:C.brand,fontFamily:'Outfit,sans-serif'}}>{fmtN(item.tarifH||0)}</div>
                      <div style={{fontSize:10,color:C.textLt,fontFamily:'Inter,sans-serif'}}>FCFA/h</div>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
        <div style={{height:isMobile?80:24}}/>
      </div>
    </div>
    </div>
  )
}

export default SearchScreen
