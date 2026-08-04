import { computed, ref, watch } from 'vue'

export type QuoteProduct = {
  id: string | number
  name: string
  image?: string
  brand?: string
  detail?: string
}

export type QuoteItem = QuoteProduct & {
  quantity: number
  option: string
  note: string
}

export type QuoteContact = {
  name: string
  company: string
  phone: string
  email: string
  city: string
}

const STORAGE_KEY = 'segurimax-quote-items'
const items = ref<QuoteItem[]>([])
const isOpen = ref(false)
const lastAddedName = ref('')
let initialized = false
let feedbackTimer: ReturnType<typeof setTimeout> | undefined

function initialize() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) items.value = JSON.parse(saved) as QuoteItem[]
  } catch {
    items.value = []
  }

  watch(
    items,
    (value) => window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value)),
    { deep: true },
  )
}

function addItem(product: QuoteProduct) {
  initialize()
  const existing = items.value.find((item) => String(item.id) === String(product.id))

  if (existing) {
    existing.quantity += 1
  } else {
    items.value.push({ ...product, quantity: 1, option: '', note: '' })
  }

  lastAddedName.value = product.name
  if (feedbackTimer) clearTimeout(feedbackTimer)
  feedbackTimer = setTimeout(() => {
    lastAddedName.value = ''
  }, 2400)
}

function removeItem(id: string | number) {
  items.value = items.value.filter((item) => String(item.id) !== String(id))
}

function updateQuantity(id: string | number, quantity: number) {
  const item = items.value.find((entry) => String(entry.id) === String(id))
  if (!item) return
  item.quantity = Math.max(1, Math.min(999, quantity || 1))
}

function clearItems() {
  items.value = []
}

function openCart() {
  initialize()
  isOpen.value = true
}

function closeCart() {
  isOpen.value = false
}

function buildQuoteText(contact: QuoteContact) {
  const productLines = items.value.flatMap((item, index) => {
    const detail = [item.option, item.note].filter(Boolean).join(' · ')
    return [`${index + 1}. ${item.quantity} × ${item.name}${detail ? ` — ${detail}` : ''}`]
  })

  return [
    'Hola Segurimax, deseo solicitar una cotización:',
    '',
    ...productLines,
    '',
    `Contacto: ${contact.name || '-'}`,
    `Empresa: ${contact.company || '-'}`,
    `Teléfono: ${contact.phone || '-'}`,
    `Correo: ${contact.email || '-'}`,
    `Ciudad / entrega: ${contact.city || '-'}`,
  ].join('\n')
}

export function useQuoteCart() {
  initialize()

  return {
    items,
    isOpen,
    lastAddedName,
    itemCount: computed(() => items.value.reduce((total, item) => total + item.quantity, 0)),
    addItem,
    removeItem,
    updateQuantity,
    clearItems,
    openCart,
    closeCart,
    buildQuoteText,
  }
}
