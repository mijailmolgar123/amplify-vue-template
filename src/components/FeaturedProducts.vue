<template>
  <section id="destacados" class="featured-section">
    <div class="container">
      <header class="featured-header">
        <div>
          <p class="section-kicker">LOS MÁS SOLICITADOS</p>
          <h2 class="section-heading">EPP para trabajar seguro.</h2>
        </div>
        <RouterLink to="/productos" class="catalog-link">
          Ver catálogo completo
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </RouterLink>
      </header>

      <div class="featured-grid">
        <article v-for="product in products" :key="product.id" class="featured-card">
          <div class="product-figure">
            <span v-if="product.status" class="product-badge">{{ product.status }}</span>
            <img :src="product.image" :alt="product.name" loading="lazy" />
          </div>
          <div class="featured-card__body">
            <span class="product-brand">{{ product.brand }}</span>
            <h3>{{ product.name }}</h3>
            <p>{{ product.excerpt }}</p>
            <div class="product-status">
              <span><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Disponible</span>
            </div>
            <button class="add-quote" type="button" @click="addProduct(product)">
              <i class="fa-solid fa-plus" aria-hidden="true"></i>
              Agregar a cotización
            </button>
          </div>
        </article>
      </div>
    </div>

    <Transition name="added">
      <button v-if="lastAddedName" class="added-feedback" type="button" @click="openCart">
        <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
        <span><strong>Agregado</strong>{{ lastAddedName }}</span>
        <span>{{ itemCount }} {{ itemCount === 1 ? 'unidad' : 'unidades' }} · Ver lista</span>
      </button>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { catalogProducts, type CatalogProduct } from '@/data/catalog'
import { useQuoteCart } from '@/composables/useQuoteCart'

const { addItem, itemCount, lastAddedName, openCart } = useQuoteCart()
const products = catalogProducts.filter((product) => product.featured).slice(0, 6)

function addProduct(product: CatalogProduct) {
  addItem({
    id: product.id,
    name: product.name,
    brand: product.brand,
    detail: product.excerpt,
    image: product.image,
  })
}
</script>

<style scoped>
.featured-section { position: relative; padding: clamp(4.5rem, 8vw, 8rem) 0; background: var(--brand-ivory); }
.featured-header { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2.6rem; }
.section-heading { margin: 0; }
.catalog-link { display: inline-flex; align-items: center; gap: .65rem; padding-bottom: .35rem; border-bottom: 2px solid var(--brand-yellow); color: var(--brand-ink); font-weight: 850; text-decoration: none; }
.featured-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
.featured-card { display: grid; grid-template-columns: 44% 56%; min-height: 286px; overflow: hidden; border: 1px solid rgba(8,43,29,.09); border-radius: 14px; background: #fff; transition: transform .22s ease, box-shadow .22s ease; }
.featured-card:hover { transform: translateY(-5px); box-shadow: 0 20px 45px rgba(8,43,29,.1); }
.product-figure { position: relative; display: grid; place-items: center; min-width: 0; padding: 1rem; overflow: hidden; background: #edf3ee; }
.product-figure img { width: 100%; height: 100%; max-height: 230px; object-fit: contain; transition: transform .28s ease; }
.featured-card:hover img { transform: scale(1.045); }
.product-badge { position: absolute; z-index: 1; top: .75rem; left: .75rem; padding: .35rem .55rem; border-radius: 5px; color: var(--brand-ink); background: var(--brand-yellow); font-size: .67rem; font-weight: 900; }
.featured-card__body { display: flex; flex-direction: column; min-width: 0; padding: 1.3rem; }
.product-brand { color: var(--brand-green); font-size: .7rem; font-weight: 900; letter-spacing: .13em; text-transform: uppercase; }
.featured-card h3 { margin: .4rem 0 .55rem; color: var(--brand-ink); font-size: 1.18rem; line-height: 1.22; }
.featured-card p { margin: 0; color: #68736c; font-size: .9rem; line-height: 1.5; }
.product-status { margin-top: auto; padding: 1rem 0 .75rem; color: var(--brand-green); font-size: .8rem; font-weight: 800; }
.add-quote { min-height: 45px; display: inline-flex; align-items: center; justify-content: center; gap: .55rem; border: 0; border-radius: 7px; color: var(--brand-ink); background: var(--brand-yellow); font-size: .83rem; font-weight: 900; transition: background .2s ease, transform .2s ease; }
.add-quote:hover { background: #e8b92e; transform: translateY(-1px); }
.added-feedback { position: fixed; z-index: 2200; right: 6rem; bottom: 6.4rem; max-width: min(410px, calc(100vw - 2rem)); display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .8rem; padding: .8rem 1rem; border: 0; border-radius: 10px; color: #fff; background: var(--brand-forest); box-shadow: 0 18px 45px rgba(4,29,19,.28); text-align: left; }
.added-feedback > i { color: #4ade80; }
.added-feedback span { display: grid; font-size: .78rem; }
.added-feedback span:last-child { color: var(--brand-yellow); font-weight: 850; }
.added-enter-active, .added-leave-active { transition: opacity .2s ease, transform .2s ease; }
.added-enter-from, .added-leave-to { opacity: 0; transform: translateY(12px); }
@media (max-width: 1199.98px) { .featured-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 767.98px) {
  .featured-section { padding: 4.2rem 0; }
  .featured-header { align-items: start; flex-direction: column; margin-bottom: 2rem; }
  .featured-grid { grid-template-columns: 1fr; }
  .featured-card { grid-template-columns: 42% 58%; min-height: 245px; }
  .featured-card__body { padding: 1rem; }
  .featured-card h3 { font-size: 1.02rem; }
  .featured-card p { font-size: .82rem; }
  .added-feedback { right: 1rem; bottom: calc(6.2rem + env(safe-area-inset-bottom)); }
}
@media (max-width: 430px) {
  .featured-card { grid-template-columns: 1fr; }
  .product-figure { min-height: 190px; }
  .product-figure img { max-height: 175px; }
}
</style>
