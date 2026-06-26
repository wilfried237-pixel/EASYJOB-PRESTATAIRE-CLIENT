import { useEffect, useMemo, useState } from 'react'
import { C, G, T } from '../../utils/tokens'
import { Av, Badge, Btn, Modal, Stars, Inp } from '../../components/ui'
import { toast, useIsMobile, fmt } from '../../utils/utils.jsx'
import { buildWhatsAppUrl } from '../../utils/links'
import { ChevronLeft, Copy, Edit3, MessageCircle, Phone, Send, Share2, Star, Trash2, Award, Briefcase, MapPin, CheckCircle2, User, Shield } from 'lucide-react'

const profileLink = fl => `${window.location.origin}/artisans/${encodeURIComponent(`${(fl?.nom || 'profil').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${fl?.id || '0'}`)}`

const missionLabel = (m, lang) => m?.titreF || m?.titre || (lang === 'fr' ? 'Mission' : 'Job')

const buildBudgetLabel = mission => {
  if (!mission?.budget) return mission?.amount ? fmt(mission.amount) : '-'
  if (mission.budget.type === 'fixed') return fmt(mission.budget.min || 0)
  return `${fmt(mission.budget.min || 0)} - ${fmt(mission.budget.max || 0)}`
}

const initials = value =>
  String(value || '??')
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

function ActionBtn({ icon: Icon, children, onClick, v = 'outline', full = false }) {
  return (
    <Btn v={v} onClick={onClick} full={full}>
      <Icon size={15} />
      {children}
    </Btn>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, padding: 18, marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 12, fontFamily: 'Outfit,sans-serif' }}>{title}</div>
      {children}
    </div>
  )
}

function ContactCard({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 13, color: C.textLt, fontFamily: 'Inter,sans-serif' }}>{label}</span>
      <span style={{ fontSize: 13, color: C.text, fontWeight: 600, textAlign: 'right', fontFamily: 'Inter,sans-serif' }}>{value || '-'}</span>
    </div>
  )
}

export function FreelancerDetail({ fl, onBack, lang, user, data, setData }) {
  const isMobile = useIsMobile()
  const t = T[lang]
  const [reviewOpen, setReviewOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [recommendations, setRecommendations] = useState(fl?.recommendations || 0)

  useEffect(() => {
    setRecommendations(fl?.recommendations || 0)
    setReviewOpen(false)
    setComment('')
    setRating(5)
  }, [fl?.id, fl?.recommendations])

  if (!fl) return null

  const openWhatsApp = () => {
    const url = buildWhatsAppUrl(fl.whatsapp, lang === 'fr'
      ? `Bonjour ${fl.nom}, je souhaite vous contacter via EasyJob.`
      : `Hello ${fl.nom}, I would like to contact you via EasyJob.`)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const copyProfile = async () => {
    const url = profileLink(fl)
    try {
      await navigator.clipboard.writeText(url)
      toast.success(lang === 'fr' ? 'Lien copie' : 'Link copied')
    } catch {
      toast.error(lang === 'fr' ? 'Impossible de copier' : 'Unable to copy')
    }
  }

  const recommend = () => {
    setRecommendations(current => current + 1)
    setData(current => ({
      ...current,
      freelancers: current.freelancers.map(item =>
        item.id === fl.id
          ? { ...item, recommendations: (item.recommendations || 0) + 1 }
          : item,
      ),
    }))
    toast.success(lang === 'fr' ? 'Prestataire recommande' : 'Provider recommended')
  }

  const submitReview = () => {
    if (!user?.role || user.role !== 'client') {
      toast.info(lang === 'fr' ? 'Connecte-toi comme client pour noter' : 'Log in as a client to rate')
      return
    }
    if (!comment.trim()) {
      toast.error(lang === 'fr' ? 'Ajoute un avis' : 'Add a review')
      return
    }

    setData(current => {
      const nextFreelancers = current.freelancers.map(item => {
        if (item.id !== fl.id) return item
        const nextCount = (item.avis || 0) + 1
        const currentNote = Number(item.note || 0)
        const nextNote = ((currentNote * (nextCount - 1)) + rating) / nextCount
        const nextReview = {
          av: initials(user.nom),
          auteur: user.nom || 'Client',
          note: rating,
          text: comment.trim(),
          date: lang === 'fr' ? 'A l instant' : 'Just now',
        }
        return {
          ...item,
          note: Number(nextNote.toFixed(1)),
          avis: nextCount,
          reviews: [nextReview, ...(item.reviews || [])],
        }
      })

      return { ...current, freelancers: nextFreelancers }
    })

    toast.success(lang === 'fr' ? 'Avis ajoute' : 'Review added')
    setReviewOpen(false)
    setComment('')
    setRating(5)
  }

  return (
    <div style={{ minHeight: '100%', background: C.sable }}>
      <div style={{ background: G.hero, color: '#fff', padding: isMobile ? '16px 16px 28px' : '18px 28px 36px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 0, fontFamily: 'Inter,sans-serif' }}>
            <ChevronLeft size={18} />
            {lang === 'fr' ? 'Retour' : 'Back'}
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr .9fr', gap: 18, marginTop: 18 }}>
            <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 24, padding: 22 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <Av code={fl.av} size={74} />
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <h1 style={{ margin: 0, fontSize: isMobile ? 26 : 32, fontWeight: 900, fontFamily: 'Outfit,sans-serif' }}>{fl.nom}</h1>
                    {fl.verifie && <Badge type="verified" sm>{lang === 'fr' ? 'Verifie' : 'Verified'}</Badge>}
                    {fl.badge && <Badge type={fl.badge}>{fl.badge === 'top' ? 'Top' : 'Pro'}</Badge>}
                  </div>
                  <div style={{ marginTop: 6, fontSize: 14, color: 'rgba(255,255,255,.7)', fontFamily: 'Inter,sans-serif' }}>
                    {fl.title}
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 12, color: 'rgba(255,255,255,.7)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><MapPin size={13} />{fl.city}, {fl.district}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Star size={13} />{fl.note} ({fl.avis})</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Briefcase size={13} />{fl.missions} {lang === 'fr' ? 'missions' : 'jobs'}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
                <ActionBtn icon={Phone} v="gold" onClick={openWhatsApp}>{lang === 'fr' ? 'Contacter' : 'Contact'}</ActionBtn>
                <ActionBtn icon={Share2} v="outlineW" onClick={copyProfile}>{lang === 'fr' ? 'Partager' : 'Share'}</ActionBtn>
                <ActionBtn icon={Award} v="outlineW" onClick={recommend}>{lang === 'fr' ? 'Recommander' : 'Recommend'}</ActionBtn>
                <ActionBtn icon={Star} v="outlineW" onClick={() => setReviewOpen(true)}>{lang === 'fr' ? 'Noter' : 'Rate'}</ActionBtn>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 24, padding: 22 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { v: fl.note, l: lang === 'fr' ? 'Note' : 'Rating' },
                  { v: fl.avis, l: lang === 'fr' ? 'Avis' : 'Reviews' },
                  { v: recommendations, l: lang === 'fr' ? 'Recommandations' : 'Recommendations' },
                ].map(item => (
                  <div key={item.l} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'Outfit,sans-serif' }}>{item.v}</div>
                    <div style={{ fontSize: 11, opacity: .7 }}>{item.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,.78)' }}>
                {fl.bio}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '-18px auto 0', padding: '0 16px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
          <Section title={lang === 'fr' ? 'Competences' : 'Skills'}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(fl.skills || []).map(skill => (
                <span key={skill} style={{ background: C.brandLt, color: C.brandDk, borderRadius: 18, padding: '6px 10px', fontSize: 12, fontWeight: 700 }}>
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          <Section title={lang === 'fr' ? 'Infos rapides' : 'Quick info'}>
            <ContactCard label={lang === 'fr' ? 'Telephone' : 'Phone'} value={fl.whatsapp || '-'} />
            <ContactCard label={lang === 'fr' ? 'Pays' : 'Country'} value={fl.country || '-'} />
            <ContactCard label={lang === 'fr' ? 'Ville' : 'City'} value={fl.city || '-'} />
            <ContactCard label={lang === 'fr' ? 'Quartier' : 'District'} value={fl.district || '-'} />
          </Section>
        </div>

        <Section title={lang === 'fr' ? 'Parcours' : 'Background'}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.textLt, textTransform: 'uppercase', marginBottom: 8 }}>{lang === 'fr' ? 'Formation' : 'Education'}</div>
              {(fl.education || []).length ? fl.education.map(item => (
                <div key={`${item.school}-${item.year}`} style={{ padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontWeight: 700, color: C.text }}>{item.degree}</div>
                  <div style={{ fontSize: 13, color: C.textMid }}>{item.school} - {item.year}</div>
                </div>
              )) : <div style={{ color: C.textLt, fontSize: 13 }}>{lang === 'fr' ? 'Aucune information' : 'No information'}</div>}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.textLt, textTransform: 'uppercase', marginBottom: 8 }}>{lang === 'fr' ? 'Experience' : 'Experience'}</div>
              {(fl.work || []).length ? fl.work.map(item => (
                <div key={`${item.company}-${item.period}`} style={{ padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontWeight: 700, color: C.text }}>{item.role}</div>
                  <div style={{ fontSize: 13, color: C.textMid }}>{item.company} - {item.period}</div>
                </div>
              )) : <div style={{ color: C.textLt, fontSize: 13 }}>{lang === 'fr' ? 'Aucune information' : 'No information'}</div>}
            </div>
          </div>
        </Section>

        <Section title={lang === 'fr' ? 'Avis recents' : 'Recent reviews'}>
          <div style={{ display: 'grid', gap: 10 }}>
            {(fl.reviews || []).slice(0, 4).map((review, index) => (
              <div key={`${review.auteur}-${index}`} style={{ background: C.sable, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: C.text }}>{review.auteur}</div>
                    <div style={{ fontSize: 12, color: C.textLt }}>{review.date}</div>
                  </div>
                  <Stars note={review.note} sz={11} />
                </div>
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: C.textMid }}>{review.text}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Modal open={reviewOpen} onClose={() => setReviewOpen(false)} title={lang === 'fr' ? 'Noter le prestataire' : 'Rate the provider'}>
        <div style={{ display: 'grid', gap: 14 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.textMid, marginBottom: 8 }}>{lang === 'fr' ? 'Note' : 'Rating'}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 5].map(value => (
                <button key={value} onClick={() => setRating(value)} style={{ width: 42, height: 42, borderRadius: 12, border: `1px solid ${rating === value ? C.gold : C.border}`, background: rating === value ? C.gold : C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={18} fill={rating === value ? '#1A1A2E' : 'none'} color={rating === value ? '#1A1A2E' : C.textLt} />
                </button>
              ))}
            </div>
          </div>
          <Inp label={lang === 'fr' ? 'Votre avis' : 'Your review'} value={comment} onChange={e => setComment(e.target.value)} rows={4} placeholder={lang === 'fr' ? 'Expliquez votre experience' : 'Share your experience'} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Btn v="outline" onClick={() => setReviewOpen(false)}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</Btn>
            <Btn v="brand" onClick={submitReview}>{lang === 'fr' ? 'Publier' : 'Submit'}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export function MesMissionsScreen({ user, data, setData, lang, onBack, setSelM, setSub }) {
  const isMobile = useIsMobile()
  const t = T[lang]
  const isFreelancer = user?.role === 'freelancer'
  const list = isFreelancer ? (data.missions || []) : (data.myJobs || [])
  const [editJob, setEditJob] = useState(null)
  const [form, setForm] = useState({ title: '', amount: '', status: 'ouverte' })

  useEffect(() => {
    if (!editJob) return
    setForm({
      title: editJob.title || editJob.titre || '',
      amount: editJob.amount ?? editJob.budget?.min ?? '',
      status: editJob.status || editJob.statut || 'ouverte',
    })
  }, [editJob])

  const saveEdit = () => {
    if (!editJob) return
    const nextTitle = form.title.trim()
    if (!nextTitle) {
      toast.error(lang === 'fr' ? 'Titre requis' : 'Title required')
      return
    }

    const amount = Number(form.amount || 0)

    setData(current => {
      const nextMyJobs = (current.myJobs || []).map(job => {
        const sameJob = job.id === editJob.id || job.missionId === editJob.missionId || job.title === editJob.title
        if (!sameJob) return job
        return {
          ...job,
          title: nextTitle,
          amount,
          status: form.status,
          date: job.date,
        }
      })

      const nextMissions = (current.missions || []).map(mission => {
        const sameMission =
          mission.id === editJob.missionId ||
          mission.titre === editJob.title ||
          mission.titreF === editJob.title

        if (!sameMission) return mission
        return {
          ...mission,
          titre: nextTitle,
          titreF: nextTitle,
          statut: form.status,
          budget: mission.budget?.type
            ? { ...mission.budget, min: amount || mission.budget.min }
            : mission.budget,
        }
      })

      return { ...current, myJobs: nextMyJobs, missions: nextMissions }
    })

    toast.success(lang === 'fr' ? 'Demande modifiee' : 'Request updated')
    setEditJob(null)
  }

  const removeJob = job => {
    setData(current => ({
      ...current,
      myJobs: (current.myJobs || []).filter(item => item.id !== job.id && item.missionId !== job.missionId),
      missions: (current.missions || []).filter(item =>
        item.id !== job.missionId &&
        item.titre !== job.title &&
        item.titreF !== job.title,
      ),
    }))
    toast.success(lang === 'fr' ? 'Demande supprimee' : 'Request deleted')
  }

  return (
    <div style={{ minHeight: '100%', background: C.sable, padding: isMobile ? '16px 14px 30px' : '22px 24px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: C.text, padding: 0, fontFamily: 'Inter,sans-serif', fontWeight: 600 }}>
            <ChevronLeft size={18} />
            {lang === 'fr' ? 'Retour' : 'Back'}
          </button>
          <div style={{ fontSize: 13, color: C.textLt }}>{isFreelancer ? (lang === 'fr' ? 'Demandes a consulter' : 'Requests to review') : (lang === 'fr' ? 'Demandes publiees' : 'Posted requests')}</div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {list.length === 0 ? (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, padding: 28, textAlign: 'center' }}>
              <Briefcase size={38} color={C.textLt} style={{ opacity: .35 }} />
              <div style={{ marginTop: 12, fontWeight: 700, color: C.text }}>{lang === 'fr' ? 'Aucune demande' : 'No requests'}</div>
            </div>
          ) : list.map((item, index) => {
            const isMission = Boolean(item.titre || item.titreF)
            const title = isMission ? missionLabel(item, lang) : (item.title || item.titre || '-')
            const status = item.statut || item.status || 'ouverte'
            const key = item.id ?? index

            return (
              <div key={key} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, padding: 18, boxShadow: '0 4px 16px rgba(0,0,0,.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <div style={{ width: 42, height: 42, borderRadius: 14, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: C.text }}>{item.emoji || '•'}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: C.text, fontFamily: 'Outfit,sans-serif' }}>{title}</div>
                        <div style={{ fontSize: 12, color: C.textLt, marginTop: 2 }}>
                          {item.city || ''}{item.country ? `, ${item.country}` : ''} {item.postedAt ? `- ${item.postedAt}` : ''}
                        </div>
                      </div>
                    </div>
                    {isMission && <div style={{ marginTop: 10, fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{item.desc}</div>}
                    {!isMission && <div style={{ marginTop: 10, fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{item.date || '-'}</div>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                    <Badge type={status}>{status}</Badge>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{buildBudgetLabel(item)}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
                  {isFreelancer ? (
                    <ActionBtn icon={MessageCircle} v="green" onClick={() => {
                      if (!item.client?.whatsapp) {
                        toast.info(lang === 'fr' ? 'Client sans WhatsApp' : 'No WhatsApp for client')
                        return
                      }
                      window.open(buildWhatsAppUrl(item.client.whatsapp, lang === 'fr'
                        ? `Bonjour ${item.client.nom}, je souhaite repondre a votre demande.`
                        : `Hello ${item.client.nom}, I would like to respond to your request.`), '_blank', 'noopener,noreferrer')
                    }}>{lang === 'fr' ? 'Contacter client' : 'Contact client'}</ActionBtn>
                  ) : (
                    <>
                      <ActionBtn icon={Edit3} v="brand" onClick={() => setEditJob(item)}>{lang === 'fr' ? 'Modifier' : 'Edit'}</ActionBtn>
                      <ActionBtn icon={Trash2} v="danger" onClick={() => removeJob(item)}>{lang === 'fr' ? 'Supprimer' : 'Delete'}</ActionBtn>
                    </>
                  )}
                  {!isFreelancer && (
                    <ActionBtn icon={Share2} v="outline" onClick={() => {
                      navigator.clipboard.writeText(window.location.href).then(() => toast.success(lang === 'fr' ? 'Lien copie' : 'Link copied')).catch(() => {})
                    }}>{lang === 'fr' ? 'Partager' : 'Share'}</ActionBtn>
                  )}
                  {isFreelancer && setSelM && (
                    <ActionBtn icon={Send} v="outline" onClick={() => {
                      setSelM(item)
                      setSub?.('mission')
                    }}>{lang === 'fr' ? 'Ouvrir' : 'Open'}</ActionBtn>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Modal open={Boolean(editJob)} onClose={() => setEditJob(null)} title={lang === 'fr' ? 'Modifier la demande' : 'Edit request'}>
        <div style={{ display: 'grid', gap: 10 }}>
          <Inp label={lang === 'fr' ? 'Titre' : 'Title'} value={form.title} onChange={e => setForm(current => ({ ...current, title: e.target.value }))} />
          <Inp label={lang === 'fr' ? 'Montant' : 'Amount'} value={form.amount} onChange={e => setForm(current => ({ ...current, amount: e.target.value }))} suffix="FCFA" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.textMid, marginBottom: 8 }}>{lang === 'fr' ? 'Statut' : 'Status'}</div>
            <select value={form.status} onChange={e => setForm(current => ({ ...current, status: e.target.value }))} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: `1px solid ${C.border}`, background: C.white }}>
              <option value="ouverte">{lang === 'fr' ? 'Ouverte' : 'Open'}</option>
              <option value="en_cours">{lang === 'fr' ? 'En cours' : 'In progress'}</option>
              <option value="terminee">{lang === 'fr' ? 'Terminee' : 'Done'}</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Btn v="outline" onClick={() => setEditJob(null)}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</Btn>
            <Btn v="brand" onClick={saveEdit}>{lang === 'fr' ? 'Sauvegarder' : 'Save'}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export function MissionDetail({ m, onBack, lang, user, setData }) {
  const isMobile = useIsMobile()
  const title = missionLabel(m, lang)

  const contactClient = () => {
    if (!m?.client?.whatsapp) {
      toast.info(lang === 'fr' ? 'Client sans WhatsApp' : 'No WhatsApp for client')
      return
    }
    const url = buildWhatsAppUrl(m.client.whatsapp, lang === 'fr'
      ? `Bonjour ${m.client.nom}, je reponds a votre demande "${title}".`
      : `Hello ${m.client.nom}, I am replying to your request "${title}".`)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{ minHeight: '100%', background: C.sable, padding: isMobile ? '16px' : '24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: C.text, padding: 0, marginBottom: 16 }}>
          <ChevronLeft size={18} />
          {lang === 'fr' ? 'Retour' : 'Back'}
        </button>

        <div style={{ background: C.white, borderRadius: 22, border: `1px solid ${C.border}`, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <Badge type={m?.urgent ? 'urgent' : 'ouverte'}>{m?.urgent ? (lang === 'fr' ? 'Urgente' : 'Urgent') : (lang === 'fr' ? 'Ouverte' : 'Open')}</Badge>
              <h1 style={{ margin: '12px 0 8px', fontSize: 28, fontWeight: 900, color: C.text, fontFamily: 'Outfit,sans-serif' }}>{title}</h1>
              <div style={{ color: C.textMid, fontSize: 14 }}>{m?.desc}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.text }}>{buildBudgetLabel(m)}</div>
              <div style={{ fontSize: 13, color: C.textLt }}>{m?.city}{m?.country ? `, ${m.country}` : ''}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14, marginTop: 18 }}>
            <Section title={lang === 'fr' ? 'Details' : 'Details'}>
              <ContactCard label={lang === 'fr' ? 'Categorie' : 'Category'} value={m?.catId || '-'} />
              <ContactCard label={lang === 'fr' ? 'Ville' : 'City'} value={m?.city || '-'} />
              <ContactCard label={lang === 'fr' ? 'Quartier' : 'District'} value={m?.district || '-'} />
              <ContactCard label={lang === 'fr' ? 'Echeance' : 'Deadline'} value={m?.deadline || '-'} />
            </Section>

            <Section title={lang === 'fr' ? 'Client' : 'Client'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Av code={m?.client?.av || 'CL'} size={46} />
                <div>
                  <div style={{ fontWeight: 800, color: C.text }}>{m?.client?.nom || '-'}</div>
                  <div style={{ fontSize: 13, color: C.textLt }}>{lang === 'fr' ? 'Demandeur' : 'Requester'}</div>
                </div>
              </div>
              <ContactCard label={lang === 'fr' ? 'Note' : 'Rating'} value={m?.client?.note || '-'} />
              <ContactCard label={lang === 'fr' ? 'WhatsApp' : 'WhatsApp'} value={m?.client?.whatsapp || '-'} />
            </Section>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
            <ActionBtn icon={MessageCircle} v="green" onClick={contactClient}>{lang === 'fr' ? 'Contacter le client' : 'Contact client'}</ActionBtn>
            <ActionBtn icon={Share2} v="outline" onClick={() => navigator.clipboard.writeText(window.location.href).then(() => toast.success(lang === 'fr' ? 'Lien copie' : 'Link copied')).catch(() => {})}>{lang === 'fr' ? 'Partager' : 'Share'}</ActionBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EditProfilScreen({ user, onBack, setUser, lang }) {
  const isMobile = useIsMobile()
  const [form, setForm] = useState({
    nom: user?.nom || '',
    email: user?.email || '',
    tel: user?.tel || '',
    whatsapp: user?.whatsapp || '',
    city: user?.city || '',
    district: user?.district || '',
    address: user?.address || '',
    bio: user?.bio || '',
    title: user?.title || '',
    idType: user?.idType || '',
    idNumber: user?.idNumber || '',
  })

  useEffect(() => {
    setForm({
      nom: user?.nom || '',
      email: user?.email || '',
      tel: user?.tel || '',
      whatsapp: user?.whatsapp || '',
      city: user?.city || '',
      district: user?.district || '',
      address: user?.address || '',
      bio: user?.bio || '',
      title: user?.title || '',
      idType: user?.idType || '',
      idNumber: user?.idNumber || '',
    })
  }, [user])

  const save = () => {
    setUser(current => ({
      ...current,
      ...form,
      initials: initials(form.nom || current?.nom),
    }))
    toast.success(lang === 'fr' ? 'Profil mis a jour' : 'Profile updated')
    onBack?.()
  }

  return (
    <div style={{ minHeight: '100%', background: C.sable, padding: isMobile ? '16px' : '24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: C.text, padding: 0, marginBottom: 16 }}>
          <ChevronLeft size={18} />
          {lang === 'fr' ? 'Retour' : 'Back'}
        </button>

        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 22, padding: 22 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 18, fontFamily: 'Outfit,sans-serif' }}>
            {lang === 'fr' ? 'Modifier le profil' : 'Edit profile'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
            <Inp label={lang === 'fr' ? 'Nom' : 'Name'} value={form.nom} onChange={e => setForm(current => ({ ...current, nom: e.target.value }))} />
            <Inp label={lang === 'fr' ? 'Email' : 'Email'} value={form.email} onChange={e => setForm(current => ({ ...current, email: e.target.value }))} />
            <Inp label={lang === 'fr' ? 'Telephone' : 'Phone'} value={form.tel} onChange={e => setForm(current => ({ ...current, tel: e.target.value }))} />
            <Inp label="WhatsApp" value={form.whatsapp} onChange={e => setForm(current => ({ ...current, whatsapp: e.target.value }))} />
            <Inp label={lang === 'fr' ? 'Ville' : 'City'} value={form.city} onChange={e => setForm(current => ({ ...current, city: e.target.value }))} />
            <Inp label={lang === 'fr' ? 'Quartier' : 'District'} value={form.district} onChange={e => setForm(current => ({ ...current, district: e.target.value }))} />
          </div>

          <Inp label={lang === 'fr' ? 'Adresse' : 'Address'} value={form.address} onChange={e => setForm(current => ({ ...current, address: e.target.value }))} />
          <Inp label={lang === 'fr' ? 'Titre / metier' : 'Title / trade'} value={form.title} onChange={e => setForm(current => ({ ...current, title: e.target.value }))} />
          <Inp label={lang === 'fr' ? 'Bio' : 'Bio'} value={form.bio} onChange={e => setForm(current => ({ ...current, bio: e.target.value }))} rows={4} />

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
            <Btn v="outline" onClick={onBack}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</Btn>
            <Btn v="brand" onClick={save}>{lang === 'fr' ? 'Sauvegarder' : 'Save'}</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}
