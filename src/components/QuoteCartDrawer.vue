<template>
  <Teleport to="body">
    <Transition name="quote-fade">
      <div v-if="isOpen" class="quote-overlay" @click.self="closeCart">
        <aside ref="drawer" class="quote-drawer" role="dialog" aria-modal="true" aria-labelledby="quote-title" tabindex="-1">
          <header class="quote-header">
            <div>
              <p class="quote-eyebrow">SOLICITUD B2B</p>
              <h2 id="quote-title">Mi cotización</h2>
              <p>{{ items.length }} {{ items.length === 1 ? 'producto' : 'productos' }} · {{ itemCount }} {{ itemCount === 1 ? 'unidad' : 'unidades' }}</p>
            </div>
            <button ref="closeButton" class="quote-close" type="button" aria-label="Cerrar cotización" @click="closeCart">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </header>

          <div class="quote-body">
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
                  <input v-model="item.option" class="quote-input" type="text" placeholder="Talla, color o modelo" />
                  <input v-model="item.note" class="quote-input" type="text" placeholder="Observación opcional" />
                </div>
                <button class="quote-remove" type="button" :aria-label="`Eliminar ${item.name}`" @click="removeItem(item.id)">
                  <i class="fa-regular fa-trash-can" aria-hidden="true"></i>
                </button>
              </article>

              <button class="quote-clear" type="button" @click="clearItems">Vaciar lista</button>
            </div>

            <div v-else class="quote-empty">
              <i class="fa-solid fa-list-check" aria-hidden="true"></i>
              <h3>Tu lista está vacía</h3>
              <p>Agrega los EPP que necesitas y envía todo en una sola solicitud.</p>
              <button class="quote-primary quote-primary--dark" type="button" @click="goToProducts">
                Explorar productos
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
                  Teléfono
                  <input v-model="contact.phone" type="tel" autocomplete="tel" placeholder="999 999 999" />
                </label>
                <label>
                  Correo
                  <input v-model="contact.email" type="email" autocomplete="email" placeholder="compras@empresa.com" />
                </label>
                <label class="quote-contact__wide">
                  Ciudad o lugar de entrega
                  <input v-model="contact.city" type="text" autocomplete="address-level2" placeholder="Lima, Arequipa, operación minera..." />
                </label>
              </div>
            </form>
          </div>

          <footer v-if="items.length" class="quote-footer">
            <button class="quote-primary quote-primary--whatsapp" type="button" @click="sendWhatsApp">
              <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
              Enviar por WhatsApp
            </button>
            <button class="quote-primary quote-primary--email" type="button" @click="sendEmail">
              <i class="fa-regular fa-envelope" aria-hidden="true"></i>
              Enviar por correo
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
const { items, isOpen, itemCount, removeItem, updateQuantity, clearItems, closeCart, buildQuoteText } = useQuoteCart()
const drawer = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const contact = reactive({
  name: '',
  company: '',
  phone: '',
  email: '',
  city: '',
})

function sendWhatsApp() {
  const message = buildQuoteText(contact)
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
}

function sendEmail() {
  const subject = `Solicitud de cotización Segurimax — ${contact.company || contact.name || 'Web'}`
  const body = buildQuoteText(contact)
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
.quote-clear { justify-self: end; border: 0; background: transparent; color: #68736c; font-size: .85rem; text-decoration: underline; }
.quote-contact { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(8,43,29,.12); }
.quote-section-title { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
.quote-section-title span { font-weight: 900; }
.quote-section-title small { color: #7a857e; }
.quote-contact__grid { display: grid; grid-template-columns: 1fr 1fr; gap: .9rem; }
.quote-contact label { display: grid; gap: .35rem; color: #334139; font-size: .82rem; font-weight: 700; }
.quote-contact input { min-height: 44px; padding: .65rem .75rem; border: 1px solid #d5ddd7; border-radius: 9px; background: #fff; }
.quote-contact__wide { grid-column: 1 / -1; }
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
}
</style>
