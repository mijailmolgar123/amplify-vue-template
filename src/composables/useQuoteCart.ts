import { computed, ref, watch } from 'vue'

export type QuoteProduct = {
  id: string | number
  sku?: string
  name: string
  image?: string
  brand?: string
  detail?: string
  unit?: string
  source?: 'catalog' | 'manual'
  allowEquivalent?: boolean
}

export type QuoteItem = QuoteProduct & {
  quantity: number
  option: string
  note: string
  unit: string
  source: 'catalog' | 'manual'
  allowEquivalent: boolean
}

export type QuoteContact = {
  name: string
  company: string
  phone: string
  email: string
  city: string
  ruc?: string
  area?: string
  requiredDate?: string
  generalNotes?: string
  attachmentNames?: string[]
}

const STORAGE_KEY = 'segurimax-quote-items'
const items = ref<QuoteItem[]>([])
const isOpen = ref(false)
const lastAddedName = ref('')
const manualDraftSeed = ref('')
const manualRequestNonce = ref(0)
let initialized = false
let feedbackTimer: ReturnType<typeof setTimeout> | undefined

function initialize() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<QuoteItem>[]
      items.value = parsed.map((item) => ({
        id: item.id ?? `restored-${Date.now()}`,
        name: item.name ?? 'Producto por confirmar',
        sku: item.sku,
        image: item.image,
        brand: item.brand,
        detail: item.detail,
        quantity: item.quantity ?? 1,
        option: item.option ?? '',
        note: item.note ?? '',
        unit: item.unit ?? 'unidad',
        source: item.source ?? 'catalog',
        allowEquivalent: item.allowEquivalent ?? false,
      }))
    }
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
    items.value.push({
      ...product,
      quantity: 1,
      option: '',
      note: '',
      unit: product.unit ?? 'unidad',
      source: product.source ?? 'catalog',
      allowEquivalent: product.allowEquivalent ?? false,
    })
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

function openManualRequest(seed = '') {
  initialize()
  manualDraftSeed.value = seed
  manualRequestNonce.value += 1
  isOpen.value = true
}

function closeCart() {
  isOpen.value = false
}

function buildQuoteText(contact: QuoteContact) {
  const productLines = items.value.flatMap((item, index) => {
    const detail = [item.option, item.note].filter(Boolean).join(' · ')
    const sku = item.sku ? ` [${item.sku}]` : ''
    const source = item.source === 'manual' ? 'Fuera de catálogo' : 'Catálogo'
    const equivalent = item.allowEquivalent ? ' · acepta marca equivalente' : ''
    return [`${index + 1}. ${item.quantity} ${item.unit || 'unidad'} × ${item.name}${sku}${detail ? ` — ${detail}` : ''} [${source}${equivalent}]`]
  })

  return [
    'Hola Segurimax, deseo enviar el siguiente requerimiento:',
    '',
    ...productLines,
    '',
    `Contacto: ${contact.name || '-'}`,
    `Empresa: ${contact.company || '-'}`,
    `RUC: ${contact.ruc || '-'}`,
    `Área / cargo: ${contact.area || '-'}`,
    `Teléfono: ${contact.phone || '-'}`,
    `Correo: ${contact.email || '-'}`,
    `Lugar de entrega: ${contact.city || '-'}`,
    `Fecha requerida: ${contact.requiredDate || '-'}`,
    `Observaciones generales: ${contact.generalNotes || '-'}`,
    contact.attachmentNames?.length ? `Archivos para adjuntar: ${contact.attachmentNames.join(', ')}` : '',
    '',
    'Segurimax validará la información y se pondrá en contacto para completar la cotización.',
  ].filter((line) => line !== '').join('\n')
}

export function useQuoteCart() {
  initialize()

  return {
    items,
    isOpen,
    lastAddedName,
    manualDraftSeed,
    manualRequestNonce,
    itemCount: computed(() => items.value.reduce((total, item) => total + item.quantity, 0)),
    addItem,
    removeItem,
    updateQuantity,
    clearItems,
    openCart,
    openManualRequest,
    closeCart,
    buildQuoteText,
  }
}
