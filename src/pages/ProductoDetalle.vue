<template>
  <main v-if="product" class="product-page">
    <nav class="container breadcrumbs" aria-label="Migas de pan">
      <RouterLink to="/">Inicio</RouterLink>
      <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
      <RouterLink to="/productos">Productos</RouterLink>
      <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
      <span aria-current="page">{{ product.name }}</span>
    </nav>

    <section class="product-hero">
      <div class="container product-layout">
        <figure class="product-visual">
          <img :src="product.image" :alt="product.name" />
        </figure>

        <div class="product-copy">
          <p class="product-kicker">{{ classification }}</p>
          <h1>{{ product.name }}</h1>
          <p v-if="product.sku" class="product-sku">Código {{ product.sku }}</p>
          <p class="product-description">{{ product.excerpt }}</p>

          <ul class="product-tags" aria-label="Características">
            <li v-for="tag in product.tags" :key="tag">{{ tag }}</li>
          </ul>

          <dl class="product-facts">
            <div>
              <dt>Disponibilidad</dt>
              <dd><i class="fa-solid fa-circle-check" aria-hidden="true"></i>{{ availabilityLabel }}</dd>
            </div>
            <div v-if="product.brand">
              <dt>Marca</dt>
              <dd>{{ product.brand }}</dd>
            </div>
            <div>
              <dt>Categoría</dt>
              <dd>{{ categoryLabel }}</dd>
            </div>
          </dl>

          <div class="product-actions">
            <button type="button" @click="addToQuote">
              <i class="fa-solid fa-plus" aria-hidden="true"></i>
              Agregar a cotización
            </button>
            <a :href="whatsAppUrl" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
              Consultar disponibilidad
            </a>
          </div>

          <p class="product-note">La presentación, documentación y disponibilidad final se confirman al cotizar.</p>
        </div>
      </div>
    </section>

    <section v-if="relatedProducts.length" class="related-section">
      <div class="container">
        <header class="related-heading">
          <div>
            <p class="section-kicker">TAMBIÉN PUEDE SERVIRTE</p>
            <h2>Productos relacionados.</h2>
          </div>
          <RouterLink to="/productos">Ver catálogo completo <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></RouterLink>
        </header>

        <div class="related-grid">
          <RouterLink
            v-for="related in relatedProducts"
            :key="related.id"
            :to="`/productos/${getProductSlug(related)}`"
            class="related-product"
          >
            <img :src="related.image" :alt="related.name" loading="lazy" />
            <span>
              <small>{{ related.brand || getCategory(related.category)?.shortLabel }}</small>
              <strong>{{ related.name }}</strong>
            </span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { catalogProducts, getCategory, getProtectionType } from '@/data/catalog'
import { useQuoteCart } from '@/composables/useQuoteCart'
import { getProductSlug } from '@/utils/productSlug'

const route = useRoute()
const { addItem, openCart } = useQuoteCart()

const product = computed(() => catalogProducts.find((item) => getProductSlug(item) === route.params.slug))
const categoryLabel = computed(() => product.value ? getCategory(product.value.category)?.label ?? 'Producto industrial' : '')
const protectionLabel = computed(() => product.value ? getProtectionType(product.value.protectionTypes[0])?.label ?? '' : '')
const classification = computed(() => [categoryLabel.value, protectionLabel.value].filter(Boolean).join(' · '))
const availabilityLabel = computed(() => product.value?.availability === 'stock' ? 'Disponible' : 'Bajo pedido')
const relatedProducts = computed(() => {
  if (!product.value) return []
  const primaryType = product.value.protectionTypes[0]
  if (!primaryType) return []

  const sameProtection = catalogProducts.filter(
    (item) => item.id !== product.value?.id && item.protectionTypes.includes(primaryType),
  )
  const fallbackCategory = catalogProducts.filter(
    (item) => item.id !== product.value?.id && item.category === product.value?.category && !sameProtection.some((related) => related.id === item.id),
  )
  return [...sameProtection, ...fallbackCategory].slice(0, 3)
})
const whatsAppUrl = computed(() => {
  const message = encodeURIComponent(`Hola Segurimax, deseo consultar disponibilidad y cotizar: ${product.value?.name ?? ''}${product.value?.sku ? ` (${product.value.sku})` : ''}.`)
  return `https://wa.me/51996665221?text=${message}`
})

function addToQuote() {
  if (!product.value) return
  addItem({
    id: product.value.id,
    name: product.value.name,
    sku: product.value.sku,
    brand: product.value.brand,
    detail: product.value.excerpt,
    image: product.value.image,
  })
  openCart()
}
</script>

<style scoped>
.product-page { color: var(--brand-ink); background: var(--brand-ivory); }
.breadcrumbs { min-height: 62px; display: flex; align-items: center; gap: .65rem; overflow: hidden; color: #748078; font-size: .76rem; white-space: nowrap; }
.breadcrumbs a { color: var(--brand-green); font-weight: 800; text-decoration: none; }
.breadcrumbs i { font-size: .55rem; }
.breadcrumbs span { overflow: hidden; text-overflow: ellipsis; }
.product-hero { padding: clamp(1.5rem, 4vw, 4rem) 0 clamp(4.5rem, 8vw, 7.5rem); background: linear-gradient(110deg, #eef3ed 0 48%, #fff 48%); }
.product-layout { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(420px, .95fr); align-items: center; gap: clamp(3rem, 8vw, 8rem); }
.product-visual { min-height: min(610px, 68vh); display: grid; place-items: center; margin: 0; padding: clamp(1.5rem, 4vw, 3.5rem); }
.product-visual img { width: 100%; height: 100%; max-height: 560px; object-fit: contain; filter: drop-shadow(0 28px 34px rgba(8,43,29,.13)); animation: product-enter .55s ease both; transition: transform .35s ease; }
.product-visual:hover img { transform: scale(1.025); }
.product-copy { max-width: 650px; padding: 2rem 0; animation: copy-enter .5s .08s ease both; }
.product-kicker { margin: 0 0 1rem; color: var(--brand-green); font-size: .7rem; font-weight: 900; letter-spacing: .13em; text-transform: uppercase; }
.product-copy h1 { margin: 0; color: var(--brand-ink); font-family: var(--font-heading); font-size: clamp(2.5rem, 5vw, 4.8rem); font-weight: 650; letter-spacing: -.045em; line-height: .98; }
.product-sku { margin: 1rem 0 0; color: #78837c; font-size: .78rem; font-weight: 800; letter-spacing: .05em; }
.product-description { max-width: 620px; margin: 1.4rem 0; color: #5f6c64; font-size: clamp(1rem, 1.5vw, 1.16rem); line-height: 1.7; }
.product-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin: 0 0 1.8rem; padding: 0; list-style: none; }
.product-tags li { padding: .45rem .65rem; border-radius: 5px; color: #526057; background: var(--brand-sage); font-size: .75rem; }
.product-facts { display: grid; grid-template-columns: repeat(3, 1fr); margin: 0 0 2rem; border-top: 1px solid rgba(8,43,29,.13); border-bottom: 1px solid rgba(8,43,29,.13); }
.product-facts div { min-width: 0; padding: 1rem .9rem 1rem 0; }
.product-facts div + div { padding-left: .9rem; border-left: 1px solid rgba(8,43,29,.13); }
.product-facts dt { margin-bottom: .3rem; color: #7b867f; font-size: .68rem; font-weight: 800; text-transform: uppercase; }
.product-facts dd { margin: 0; overflow-wrap: anywhere; color: var(--brand-ink); font-size: .85rem; font-weight: 850; }
.product-facts dd i { margin-right: .4rem; color: var(--brand-green); }
.product-actions { display: flex; align-items: center; gap: 1rem; }
.product-actions button, .product-actions a { min-height: 54px; display: inline-flex; align-items: center; justify-content: center; gap: .65rem; padding: .85rem 1.25rem; border-radius: 8px; font-size: .85rem; font-weight: 900; text-decoration: none; }
.product-actions button { border: 0; color: var(--brand-ink); background: var(--brand-yellow); }
.product-actions a { border: 1px solid rgba(8,43,29,.24); color: var(--brand-ink); background: transparent; }
.product-actions a i { color: #16a34a; font-size: 1.05rem; }
.product-note { margin: 1rem 0 0; color: #7b867f; font-size: .74rem; }
.related-section { padding: clamp(4rem, 7vw, 7rem) 0; background: #fff; }
.related-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2.2rem; }
.related-heading h2 { margin: .4rem 0 0; font-size: clamp(2rem, 4vw, 3.3rem); }
.related-heading > a { display: inline-flex; align-items: center; gap: .55rem; padding-bottom: .25rem; border-bottom: 2px solid var(--brand-yellow); color: var(--brand-ink); font-size: .85rem; font-weight: 850; text-decoration: none; }
.related-grid { border-top: 1px solid rgba(8,43,29,.13); }
.related-product { min-height: 135px; display: grid; grid-template-columns: 110px 1fr auto; align-items: center; gap: 1.4rem; padding: 1rem 0; border-bottom: 1px solid rgba(8,43,29,.13); color: var(--brand-ink); text-decoration: none; }
.related-product img { width: 110px; height: 105px; object-fit: contain; }
.related-product span { display: grid; gap: .35rem; }
.related-product small { color: var(--brand-green); font-size: .66rem; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
.related-product strong { font-size: 1.08rem; }
.related-product > i { margin-right: .5rem; color: var(--brand-green); transition: transform .2s ease; }
.related-product:hover > i { transform: translateX(5px); }
@keyframes product-enter { from { opacity: 0; transform: translateY(18px) scale(.98); } }
@keyframes copy-enter { from { opacity: 0; transform: translateX(18px); } }
@media (max-width: 991.98px) {
  .product-hero { background: linear-gradient(#eef3ed 0 42%, #fff 42%); }
  .product-layout { grid-template-columns: 1fr; gap: 1rem; }
  .product-visual { min-height: 420px; }
  .product-copy { max-width: none; }
}
@media (max-width: 575.98px) {
  .product-visual { min-height: 320px; padding: 1rem; }
  .product-facts { grid-template-columns: 1fr; }
  .product-facts div + div { padding-left: 0; border-top: 1px solid rgba(8,43,29,.13); border-left: 0; }
  .product-actions { align-items: stretch; flex-direction: column; }
  .related-heading { align-items: flex-start; flex-direction: column; }
  .related-product { grid-template-columns: 82px 1fr auto; gap: .8rem; }
  .related-product img { width: 82px; height: 82px; }
}
@media (prefers-reduced-motion: reduce) {
  .product-visual img, .product-copy { animation: none; }
  .product-visual img, .related-product > i { transition: none; }
}
</style>
