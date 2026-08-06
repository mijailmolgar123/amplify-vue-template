<template>
  <Teleport to="body">
    <Transition name="quote-fade">
      <div v-if="isOpen" class="quote-overlay" @click.self="closeCart">
        <aside ref="drawer" class="quote-drawer" role="dialog" aria-modal="true" aria-labelledby="quote-title" tabindex="-1">
          <header class="quote-header">
            <div>
              <p class="quote-eyebrow">ABASTECIMIENTO B2B</p>
              <h2 id="quote-title">Mi requerimiento</h2>
              <p>{{ items.length }} {{ items.length === 1 ? 'partida' : 'partidas' }} · {{ itemCount }} {{ itemCount === 1 ? 'unidad' : 'unidades' }}</p>
            </div>
            <button ref="closeButton" class="quote-close" type="button" aria-label="Cerrar requerimiento" @click="closeCart">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </header>

          <div class="quote-body">
            <section class="manual-request" :class="{ 'manual-request--open': manualFormOpen }">
              <button class="manual-request__toggle" type="button" :aria-expanded="manualFormOpen" @click="manualFormOpen = !manualFormOpen">
                <span>
                  <i class="fa-solid fa-plus" aria-hidden="true"></i>
                  <strong>Agregar producto fuera del catálogo</strong>
                  <small>Describe, pega un código o solicita una marca.</small>
                </span>
                <i :class="manualFormOpen ? 'fa-solid fa-minus' : 'fa-solid fa-chevron-down'" aria-hidden="true"></i>
              </button>

              <form v-if="manualFormOpen" class="manual-request__form" @submit.prevent="addManualProduct">
                <label class="manual-request__wide">
                  Producto, descripción o código *
                  <textarea v-model="manualDraft.name" rows="2" placeholder="Ej. Taladro inalámbrico 20 V, modelo o código de referencia"></textarea>
                </label>
                <label>
                  Marca requerida
                  <input v-model="manualDraft.brand" type="text" placeholder="Opcional" />
                </label>
                <label>
                  Cantidad
                  <input v-model.number="manualDraft.quantity" type="number" min="1" max="999" />
                </label>
                <label>
                  Unidad
                  <select v-model="manualDraft.unit">
                    <option>unidad</option>
                    <option>par</option>
                    <option>caja</option>
                    <option>paquete</option>
                    <option>rollo</option>
                    <option>juego</option>
                    <option>servicio</option>
                  </select>
                </label>
                <label class="manual-request__wide">
                  Especificaciones o certificaciones
                  <input v-model="manualDraft.specifications" type="text" placeholder="Medida, material, norma, aplicación u otra condición" />
                </label>
                <label class="manual-equivalent manual-request__wide">
                  <input v-model="manualDraft.allowEquivalent" type="checkbox" />
                  Acepto marcas o modelos técnicamente equivalentes
                </label>
                <p v-if="manualError" class="manual-error" role="alert">{{ manualError }}</p>
                <button class="manual-add" type="submit">
                  <i class="fa-solid fa-plus" aria-hidden="true"></i>
                  Agregar al requerimiento
                </button>
              </form>
            </section>

            <div v-if="items.length" class="quote-items">
              <article v-for="item in items" :key="item.id" class="quote-item">
                <div class="quote-item__media">
                  <img v-if="item.image" :src="item.image" :alt="item.name" />
                  <i v-else class="fa-solid fa-helmet-safety" aria-hidden="true"></i>
                </div>
                <div class="quote-item__content">
                  <span v-if="item.brand" class="quote-item__brand">{{ item.brand }}</span>
                  <h3>{{ item.name }}</h3>
                  <span v-if="item.sku" class="quote-item__sku">Código {{ item.sku }}</span>
                  <p v-if="item.detail">{{ item.detail }}</p>
                  <div class="quote-item__controls">
                    <label :for="`quantity-${item.id}`">Cantidad</label>
                    <div class="quantity-control">
                      <button type="button" aria-label="Reducir cantidad" @click="updateQuantity(item.id, item.quantity - 1)">−</button>
                      <input
                        :id="`quantity-${item.id}`"
                        :value="item.quantity"
                        type="number"
                        min="1"
                        max="999"
                        @input="updateQuantity(item.id, Number(($event.target as HTMLInputElement).value))"
                      />
                      <button type="button" aria-label="Aumentar cantidad" @click="updateQuantity(item.id, item.quantity + 1)">+</button>
                    </div>
                  </div>
                  <div class="quote-item__details">
                    <select v-model="item.unit" class="quote-input" aria-label="Unidad de medida">
                      <option>unidad</option><option>par</option><option>caja</option><option>paquete</option><option>rollo</option><option>juego</option><option>servicio</option>
                    </select>
                    <input v-model="item.option" class="quote-input" type="text" placeholder="Talla, color o modelo" />
                  </div>
                  <input v-model="item.note" class="quote-input" type="text" placeholder="Especificación u observación" />
                  <label class="item-equivalent">
                    <input v-model="item.allowEquivalent" type="checkbox" />
                    Acepto alternativa equivalente
                  </label>
                </div>
                <button class="quote-remove" type="button" :aria-label="`Eliminar ${item.name}`" @click="removeItem(item.id)">
                  <i class="fa-regular fa-trash-can" aria-hidden="true"></i>
                </button>
              </article>

              <button class="quote-clear" type="button" @click="clearItems">Vaciar lista</button>
            </div>

            <div v-else class="quote-empty">
              <i class="fa-solid fa-list-check" aria-hidden="true"></i>
              <h3>Empieza tu requerimiento</h3>
              <p>Agrega productos del catálogo o describe arriba cualquier producto, equipo, insumo o servicio que necesites gestionar.</p>
              <button class="quote-primary quote-primary--dark" type="button" @click="goToProducts">
                Explorar catálogo referencial
              </button>
            </div>

            <form v-if="items.length" class="quote-contact" @submit.prevent>
              <div class="quote-section-title">
                <span>Datos de contacto</span>
                <small>Para responderte con precisión</small>
              </div>
              <div class="quote-contact__grid">
                <label>
                  Nombre
                  <input v-model="contact.name" type="text" autocomplete="name" placeholder="Tu nombre" />
                </label>
                <label>
                  Empresa
                  <input v-model="contact.company" type="text" autocomplete="organization" placeholder="Razón social" />
                </label>
                <label>
                  RUC
                  <input v-model="contact.ruc" type="text" inputmode="numeric" placeholder="11 dígitos" />
                </label>
                <label>
                  Área / cargo
                  <input v-model="contact.area" type="text" placeholder="Compras, operaciones..." />
                </label>
                <label>
                  Teléfono
                  <input v-model="contact.phone" type="tel" autocomplete="tel" placeholder="999 999 999" />
                </label>
                <label>
                  Correo
                  <input v-model="contact.email" type="email" autocomplete="email" placeholder="compras@empresa.com" />
                </label>
                <label class="quote-contact__wide">
                  Lugar de entrega
                  <input v-model="contact.city" type="text" autocomplete="address-level2" placeholder="Lima, Arequipa, operación minera..." />
                </label>
                <label>
                  Fecha requerida
                  <input v-model="contact.requiredDate" type="date" />
                </label>
                <label class="quote-contact__wide">
                  Observaciones generales
                  <textarea v-model="contact.generalNotes" rows="3" placeholder="Condiciones de entrega, aplicación o información adicional"></textarea>
                </label>
                <label class="quote-contact__wide attachment-field">
                  Fotografías, PDF, Excel o ficha técnica
                  <input type="file" multiple accept="image/*,.pdf,.xls,.xlsx,.csv" @change="handleFiles" />
                  <small>Por seguridad del navegador, los archivos se adjuntan manualmente después de abrir WhatsApp o correo.</small>
                  <span v-if="selectedFileNames.length">{{ selectedFileNames.join(' · ') }}</span>
                </label>
              </div>
              <p class="quote-assurance">Segurimax validará la información, buscará alternativas y te contactará para completar la cotización.</p>
            </form>
          </div>

          <footer v-if="items.length" class="quote-footer">
            <button class="quote-primary quote-primary--whatsapp" type="button" @click="sendWhatsApp">
              <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
              Enviar requerimiento
            </button>
            <button class="quote-primary quote-primary--email" type="button" @click="sendEmail">
              <i class="fa-regular fa-envelope" aria-hidden="true"></i>
              Preparar correo
            </button>
          </footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuoteCart } from '@/composables/useQuoteCart'

const WHATSAPP_PHONE = '51996665221'
const EMAIL_TO = 'ventas@segurimax-peru.com'
const router = useRouter()
const { items, isOpen, itemCount, manualDraftSeed, manualRequestNonce, addItem, removeItem, updateQuantity, clearItems, closeCart, buildQuoteText } = useQuoteCart()
const drawer = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
const manualFormOpen = ref(false)
const manualError = ref('')
const selectedFileNames = ref<string[]>([])
let previouslyFocused: HTMLElement | null = null

const manualDraft = reactive({
  name: '',
  brand: '',
  quantity: 1,
  unit: 'unidad',
  specifications: '',
  allowEquivalent: true,
})

const contact = reactive({
  name: '',
  company: '',
  phone: '',
  email: '',
  city: '',
  ruc: '',
  area: '',
  requiredDate: '',
  generalNotes: '',
})

function addManualProduct() {
  const name = manualDraft.name.trim()
  if (!name) {
    manualError.value = 'Describe el producto o ingresa un código para continuar.'
    return
  }

  addItem({
    id: `manual-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    brand: manualDraft.brand.trim() || undefined,
    detail: manualDraft.specifications.trim() || 'Producto solicitado fuera del catálogo referencial.',
    unit: manualDraft.unit,
    source: 'manual',
    allowEquivalent: manualDraft.allowEquivalent,
  })
  const added = items.value.at(-1)
  if (added) added.quantity = Math.max(1, Math.min(999, Number(manualDraft.quantity) || 1))
  Object.assign(manualDraft, { name: '', brand: '', quantity: 1, unit: 'unidad', specifications: '', allowEquivalent: true })
  manualError.value = ''
  manualFormOpen.value = false
}

function handleFiles(event: Event) {
  const files = Array.from((event.target as HTMLInputElement).files ?? [])
  selectedFileNames.value = files.map((file) => file.name)
}

function quotePayload() {
  return buildQuoteText({ ...contact, attachmentNames: selectedFileNames.value })
}

function sendWhatsApp() {
  const message = quotePayload()
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
}

function sendEmail() {
  const subject = `Requerimiento de abastecimiento Segurimax — ${contact.company || contact.name || 'Web'}`
  const body = quotePayload()
  window.location.href = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function goToProducts() {
  closeCart()
  router.push('/productos')
}

function handleKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return
  if (event.key === 'Escape') {
    closeCart()
    return
  }
  if (event.key !== 'Tab' || !drawer.value) return

  const focusable = Array.from(
    drawer.value.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'),
  )
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(isOpen, (open) => {
  document.body.classList.toggle('quote-open', open)
  if (open) {
    previouslyFocused = document.activeElement as HTMLElement | null
    nextTick(() => closeButton.value?.focus())
  } else {
    previouslyFocused?.focus()
    previouslyFocused = null
  }
})

watch(manualRequestNonce, () => {
  manualDraft.name = manualDraftSeed.value
  manualFormOpen.value = true
  manualDraftSeed.value = ''
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('quote-open')
})
</script>

<style scoped>
.quote-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  justify-content: flex-end;
  background: rgba(3, 18, 11, 0.62);
  backdrop-filter: blur(5px);
}
.quote-drawer {
  width: min(100%, 560px);
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f7f5ef;
  color: #17231c;
  box-shadow: -24px 0 70px rgba(3, 18, 11, 0.28);
}
.quote-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.6rem 1.75rem;
  color: #fff;
  background: #082b1d;
}
.quote-header h2 {
  margin: 0.15rem 0;
  font-size: clamp(1.8rem, 4vw, 2.35rem);
}
.quote-header p { margin: 0; color: rgba(255,255,255,.68); }
.quote-eyebrow { font-size: .72rem; font-weight: 800; letter-spacing: .2em; color: #f5c84c !important; }
.quote-close {
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 50%;
  background: transparent;
  color: #fff;
}
.quote-body { flex: 1; overflow-y: auto; padding: 1.5rem 1.75rem; }
.manual-request { margin-bottom: 1.25rem; border: 1px solid rgba(8,43,29,.14); border-radius: 12px; background: #fff; overflow: hidden; }
.manual-request--open { border-color: rgba(24,120,71,.35); }
.manual-request__toggle { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem; border: 0; color: var(--brand-ink); background: #fff; text-align: left; }
.manual-request__toggle > span { display: grid; grid-template-columns: 24px 1fr; align-items: center; gap: .12rem .55rem; }
.manual-request__toggle > span > i { grid-row: 1 / 3; width: 24px; height: 24px; display: grid; place-items: center; border-radius: 5px; color: var(--brand-ink); background: var(--brand-yellow); font-size: .7rem; }
.manual-request__toggle strong { font-size: .9rem; }
.manual-request__toggle small { color: #718078; font-size: .75rem; }
.manual-request__form { display: grid; grid-template-columns: 1fr 110px 110px; gap: .75rem; padding: 1rem; border-top: 1px solid rgba(8,43,29,.1); background: #f7faf7; }
.manual-request__form label { display: grid; align-content: start; gap: .35rem; color: #405047; font-size: .76rem; font-weight: 750; }
.manual-request__form input:not([type='checkbox']), .manual-request__form select, .manual-request__form textarea { width: 100%; min-height: 42px; padding: .58rem .65rem; border: 1px solid #d5ddd7; border-radius: 8px; background: #fff; font: inherit; }
.manual-request__wide { grid-column: 1 / -1; }
.manual-equivalent { display: flex !important; grid-template-columns: auto 1fr; align-items: center !important; justify-content: flex-start; flex-direction: row; }
.manual-equivalent input, .item-equivalent input { accent-color: var(--brand-green); }
.manual-add { grid-column: 1 / -1; min-height: 44px; border: 0; border-radius: 8px; color: #fff; background: var(--brand-forest); font-weight: 850; }
.manual-add i { margin-right: .4rem; color: var(--brand-yellow); }
.manual-error { grid-column: 1 / -1; margin: 0; color: #a02921; font-size: .78rem; }
.quote-items { display: grid; gap: 1rem; }
.quote-item {
  position: relative;
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr) 30px;
  gap: .9rem;
  padding: 1rem;
  border: 1px solid rgba(8,43,29,.1);
  border-radius: 14px;
  background: #fff;
}
.quote-item__media {
  width: 78px;
  height: 78px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 10px;
  color: #187847;
  background: #edf3ee;
}
.quote-item__media img { width: 100%; height: 100%; object-fit: contain; }
.quote-item__brand { display: block; color: #187847; font-size: .72rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.quote-item h3 { margin: .15rem 0; font-family: var(--font-body); font-size: 1rem; font-weight: 800; line-height: 1.25; }
.quote-item__sku { display: block; margin: 0 0 .35rem; color: #7b857f; font-size: .7rem; font-weight: 750; letter-spacing: .04em; }
.quote-item p { margin: 0 0 .65rem; color: #68736c; font-size: .82rem; }
.quote-remove { border: 0; background: transparent; color: #8b948e; }
.quote-item__controls { display: flex; align-items: center; justify-content: space-between; gap: .75rem; margin: .7rem 0; }
.quote-item__controls label { color: #59645d; font-size: .8rem; font-weight: 700; }
.quantity-control { display: grid; grid-template-columns: 32px 46px 32px; border: 1px solid #dbe1dc; border-radius: 8px; overflow: hidden; }
.quantity-control button, .quantity-control input { height: 32px; border: 0; background: #fff; text-align: center; }
.quantity-control button { font-weight: 800; color: #082b1d; background: #edf3ee; }
.quantity-control input { width: 46px; appearance: textfield; }
.quote-input {
  width: 100%;
  min-height: 38px;
  margin-top: .45rem;
  padding: .5rem .65rem;
  border: 1px solid #dbe1dc;
  border-radius: 8px;
  font-size: .86rem;
}
.quote-item__details { display: grid; grid-template-columns: 105px 1fr; gap: .45rem; }
.item-equivalent { display: flex; align-items: center; gap: .45rem; margin-top: .6rem; color: #66736b; font-size: .74rem; }
.quote-clear { justify-self: end; border: 0; background: transparent; color: #68736c; font-size: .85rem; text-decoration: underline; }
.quote-contact { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(8,43,29,.12); }
.quote-section-title { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
.quote-section-title span { font-weight: 900; }
.quote-section-title small { color: #7a857e; }
.quote-contact__grid { display: grid; grid-template-columns: 1fr 1fr; gap: .9rem; }
.quote-contact label { display: grid; gap: .35rem; color: #334139; font-size: .82rem; font-weight: 700; }
.quote-contact input, .quote-contact textarea { min-height: 44px; padding: .65rem .75rem; border: 1px solid #d5ddd7; border-radius: 9px; background: #fff; font: inherit; }
.quote-contact__wide { grid-column: 1 / -1; }
.attachment-field input { padding: .55rem; }
.attachment-field small { color: #7a857e; font-weight: 500; line-height: 1.4; }
.attachment-field span { color: var(--brand-green); font-size: .75rem; }
.quote-assurance { margin: 1rem 0 0; padding: .8rem; border-left: 3px solid var(--brand-yellow); color: #5c6961; background: #f1f5f1; font-size: .8rem; }
.quote-empty { min-height: 55vh; display: grid; place-items: center; align-content: center; gap: .8rem; text-align: center; }
.quote-empty > i { font-size: 2.5rem; color: #187847; }
.quote-empty h3 { margin: .5rem 0 0; }
.quote-empty p { max-width: 360px; color: #68736c; }
.quote-footer { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; padding: 1rem 1.75rem; border-top: 1px solid rgba(8,43,29,.12); background: #fff; }
.quote-primary { min-height: 52px; display: inline-flex; align-items: center; justify-content: center; gap: .65rem; padding: .8rem 1rem; border: 0; border-radius: 9px; font-weight: 900; }
.quote-primary--whatsapp { color: #fff; background: #187847; }
.quote-primary--email { color: #17231c; background: #f5c84c; }
.quote-primary--dark { color: #fff; background: #082b1d; }
.quote-fade-enter-active, .quote-fade-leave-active { transition: opacity .22s ease; }
.quote-fade-enter-active .quote-drawer, .quote-fade-leave-active .quote-drawer { transition: transform .28s ease; }
.quote-fade-enter-from, .quote-fade-leave-to { opacity: 0; }
.quote-fade-enter-from .quote-drawer, .quote-fade-leave-to .quote-drawer { transform: translateX(100%); }
@media (max-width: 575.98px) {
  .quote-header, .quote-body, .quote-footer { padding-left: 1rem; padding-right: 1rem; }
  .quote-item { grid-template-columns: 64px minmax(0, 1fr) 24px; padding: .8rem; }
  .quote-item__media { width: 64px; height: 64px; }
  .quote-contact__grid, .quote-footer { grid-template-columns: 1fr; }
  .manual-request__form { grid-template-columns: 1fr 1fr; }
  .manual-request__form label:first-child, .manual-request__form label:nth-child(2), .manual-request__wide, .manual-add, .manual-error { grid-column: 1 / -1; }
  .quote-item__details { grid-template-columns: 1fr; }
}
</style>
