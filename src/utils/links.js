export const DEFAULT_WHATSAPP = '225070000000'

export function slugify(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'profil'
}

export function normalizeWhatsAppNumber(value) {
  const digits = String(value || '').replace(/\D/g, '')
  if (!digits) return DEFAULT_WHATSAPP
  if (digits.startsWith('00')) return digits.slice(2)
  return digits
}

export function buildWhatsAppUrl(number, message = '') {
  const phone = normalizeWhatsAppNumber(number)
  const url = new URL(`https://wa.me/${phone}`)
  if (message) url.searchParams.set('text', message)
  return url.toString()
}
