import { useState } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Btn, Av, Stars, Badge } from '../../components/ui'
import { toast, useIsMobile, fmt } from '../../utils/utils.jsx'
import {
  Star, MessageCircle, ThumbsUp, Flag, Filter, ChevronDown,
  Award, Zap, TrendingUp, Eye, Share2, Download
} from 'lucide-react'

const ReviewsScreen=({user,lang,onBack})=>{
  const t=T[lang], isMobile=useIsMobile()
  const[filter,setFilter]=useState('all') // all, positive, neutral, negative

  const reviews=[
    {
      id:1,
      author:'Fatou Diallo',av:'FD',
      rating:5.0,
      date:'2024-01-15',
      project:'Design System UI',
      text:'Excellent travail! Très professionnel et livré avant la deadline. Je recommande vivement!',
      helpful:12,
      verified:true,
      deliverySpeed:'On time',
      communication:'Very responsive'
    },
    {
      id:2,
      author:'Moussa Coulibaly',av:'MC',
      rating:4.8,
      date:'2024-01-10',
      project:'API REST Development',
      text:'Très bon développeur. Code de qualité, good practices, excellente documentation.',
      helpful:8,
      verified:true,
      deliverySpeed:'On time',
      communication:'Responsive'
    },
    {
      id:3,
      author:'Ibrahima Ba',av:'IB',
      rating:4.5,
      date:'2024-01-05',
      project:'Mobile App - Frontend',
      text:'Bon travail dans l\'ensemble. Petits ajustements demandés mais résolu rapidement.',
      helpful:5,
      verified:true,
      deliverySpeed:'Delayed',
      communication:'Responsive'
    },
    {
      id:4,
      author:'Amara Sow',av:'AS',
      rating:5.0,
      date:'2023-12-20',
      project:'Consulting - Web Strategy',
      text:'Insights très pertinents. Vraiment aidé à clarifier notre stratégie digitale. 10/10',
      helpful:15,
      verified:true,
      deliverySpeed:'On time',
      communication:'Very responsive'
    },
  ]

  const stats={
    avgRating:4.82,
    totalReviews:47,
    positiveCount:45,
    neutral:1,
    negative:1,
    ratingDist:{5:42,4:4,3:1,2:0,1:0}
  }

  const filteredReviews=reviews.filter(r=>{
    if(filter==='all')return true
    if(filter==='positive')return r.rating>=4.5
    if(filter==='neutral')return r.rating>=3.5&&r.rating<4.5
    if(filter==='negative')return r.rating<3.5
    return true
  })

  return(
    <div style={{minHeight:'100%',background:C.bg,padding:isMobile?'80px 16px 40px':'16px 24px',paddingTop:isMobile?80:16}}>
      {/* HEADER */}
      <div style={{marginBottom:28}}>
        <h1 style={{fontSize:isMobile?24:32,fontWeight:800,color:C.text,margin:0,fontFamily:'Outfit,sans-serif'}}>
          {lang==='fr'?'Avis & Évaluations':'Reviews & Ratings'}
        </h1>
      </div>

      {/* OVERALL RATING CARD */}
      <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,padding:24,marginBottom:24}}>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:24}}>
          {/* Left - Overall */}
          <div>
            <h3 style={{fontSize:14,color:C.textMid,fontWeight:600,margin:'0 0 16px'}}>{lang==='fr'?'Note globale':'Overall Rating'}</h3>
            <div style={{display:'flex',alignItems:'flex-end',gap:16}}>
              <div style={{flex:1}}>
                <div style={{fontSize:48,fontWeight:900,color:C.brand,fontFamily:'Outfit,sans-serif',lineHeight:1}}>
                  {stats.avgRating}
                </div>
                <Stars note={stats.avgRating} sz={14}/>
                <div style={{fontSize:13,color:C.textMid,marginTop:8}}>
                  {stats.totalReviews} {lang==='fr'?'avis':'reviews'}
                </div>
              </div>
              <div style={{width:80,height:80,borderRadius:12,background:G.brand,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:28,flexShrink:0}}>
                {stats.positiveCount===stats.totalReviews?'😍':stats.positiveCount>stats.totalReviews-5?'😊':'😐'}
              </div>
            </div>
          </div>

          {/* Right - Distribution */}
          <div>
            <h3 style={{fontSize:14,color:C.textMid,fontWeight:600,margin:'0 0 16px'}}>{lang==='fr'?'Distribution':'Distribution'}</h3>
            {[5,4,3,2,1].map(r=>(
              <div key={r} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                <div style={{display:'flex',gap:2}}>
                  {Array(r).fill(0).map((_,i)=>(
                    <Star key={i} size={12} fill={C.gold} color={C.gold}/>
                  ))}
                </div>
                <div style={{width:80,height:6,borderRadius:3,background:C.border,position:'relative',overflow:'hidden'}}>
                  <div style={{width:`${(stats.ratingDist[r]/stats.totalReviews)*100}%`,height:'100%',background:C.brand,borderRadius:3}}/>
                </div>
                <div style={{fontSize:12,color:C.textMid,minWidth:30}}>{stats.ratingDist[r]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER & ACTIONS */}
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20,overflowX:'auto',paddingBottom:8}}>
        <button onClick={()=>setFilter('all')} 
          style={{padding:'6px 12px',borderRadius:8,border:`1px solid ${filter==='all'?C.brand:C.border}`,
            background:filter==='all'?C.brand:'transparent',color:filter==='all'?'#fff':C.text,cursor:'pointer',
            fontSize:13,fontWeight:500,whiteSpace:'nowrap'}}>
          {lang==='fr'?'Tous':'All'}
        </button>
        <button onClick={()=>setFilter('positive')}
          style={{padding:'6px 12px',borderRadius:8,border:`1px solid ${filter==='positive'?'#1DBF73':C.border}`,
            background:filter==='positive'?'#1DBF7318':'transparent',color:filter==='positive'?'#1DBF73':C.text,cursor:'pointer',
            fontSize:13,fontWeight:500,whiteSpace:'nowrap'}}>
          😊 {lang==='fr'?'Positif':'Positive'}
        </button>
        <button onClick={()=>setFilter('neutral')}
          style={{padding:'6px 12px',borderRadius:8,border:`1px solid ${filter==='neutral'?'#FFB000':C.border}`,
            background:filter==='neutral'?'#FFB00018':'transparent',color:filter==='neutral'?'#FFB000':C.text,cursor:'pointer',
            fontSize:13,fontWeight:500,whiteSpace:'nowrap'}}>
          😐 {lang==='fr'?'Neutre':'Neutral'}
        </button>
      </div>

      {/* REVIEWS LIST */}
      <div style={{display:'grid',gap:16}}>
        {filteredReviews.map(review=>(
          <div key={review.id} style={{background:C.white,borderRadius:12,border:`1px solid ${C.border}`,padding:20}}>
            {/* Header */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
              <div style={{display:'flex',gap:12}}>
                <Av code={review.av} size={44}/>
                <div>
                  <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:4}}>
                    <div style={{fontWeight:700,color:C.text}}>{review.author}</div>
                    {review.verified&&<Badge type="verified" sm>{lang==='fr'?'Acheté':'Verified'}</Badge>}
                  </div>
                  <Stars note={review.rating} sz={12}/>
                  <div style={{fontSize:12,color:C.textMid,marginTop:4}}>
                    {review.project} • {review.date}
                  </div>
                </div>
              </div>
              <div style={{display:'flex',gap:4}}>
                <button style={{width:32,height:32,borderRadius:6,border:`1px solid ${C.border}`,background:C.white,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Share2 size={14} color={C.textMid}/>
                </button>
                <button style={{width:32,height:32,borderRadius:6,border:`1px solid ${C.border}`,background:C.white,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Flag size={14} color={C.textMid}/>
                </button>
              </div>
            </div>

            {/* Review text */}
            <p style={{fontSize:14,color:C.text,lineHeight:1.6,marginBottom:12,fontStyle:'italic'}}>
              "{review.text}"
            </p>

            {/* Attributes */}
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(2,1fr)',gap:12,marginBottom:12}}>
              <div style={{fontSize:13,color:C.textMid}}>
                <span style={{fontWeight:600}}>⚡ {lang==='fr'?'Vitesse':'Speed'}:</span> {review.deliverySpeed}
              </div>
              <div style={{fontSize:13,color:C.textMid}}>
                <span style={{fontWeight:600}}>💬 {lang==='fr'?'Communication':'Communication'}:</span> {review.communication}
              </div>
            </div>

            {/* Helpful */}
            <div style={{display:'flex',gap:12,paddingTop:12,borderTop:`1px solid ${C.border}`,fontSize:13}}>
              <button style={{background:'none',border:'none',cursor:'pointer',color:C.textMid,display:'flex',gap:4,alignItems:'center'}}>
                <ThumbsUp size={14}/>
                <span>{lang==='fr'?'Utile':'Helpful'} ({review.helpful})</span>
              </button>
              <button style={{background:'none',border:'none',cursor:'pointer',color:C.textMid,display:'flex',gap:4,alignItems:'center'}}>
                <MessageCircle size={14}/>
                <span>{lang==='fr'?'Répondre':'Reply'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EXPORT */}
      <div style={{marginTop:32,textAlign:'center'}}>
        <Btn v="secondary" icon={Download}>
          {lang==='fr'?'Exporter les avis':'Export reviews'}
        </Btn>
      </div>
    </div>
  )
}

export default ReviewsScreen
