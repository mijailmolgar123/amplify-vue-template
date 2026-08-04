<template>
  <main class="page page-productos">
    <section class="productos-hero">
      <div class="container productos-hero__inner">
        <p class="eyebrow">CATÁLOGO SEGURIMAX</p>
        <h1>Encuentra. Agrega. Cotiza.</h1>
        <p>Filtra por riesgo o marca y envía un solo requerimiento a ventas.</p>
      </div>
      <div class="hero-grid-overlay" aria-hidden="true"></div>
    </section>

    <section class="productos-controls" id="buscador">
      <div class="container">
        <div class="filters-card">
          <label class="filter-field filter-field--search">
            <span>Buscar producto</span>
            <span class="search-input">
              <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              <input
                v-model="searchQuery"
                type="search"
                placeholder="Guantes, cascos, respiradores..."
              />
            </span>
          </label>

          <label class="filter-field">
            <span>Categoría</span>
            <select v-model="selectedCategory">
              <option v-for="category in categoryFilters" :key="category.id" :value="category.id">
                {{ category.label }}
              </option>
            </select>
          </label>

          <label class="filter-field">
            <span>Tipo de protección</span>
            <select v-model="selectedProtectionType">
              <option v-for="type in protectionTypeFilters" :key="type.id" :value="type.id">
                {{ type.label }}
              </option>
            </select>
          </label>

          <label class="filter-field">
            <span>Marca</span>
            <select v-model="selectedBrand">
              <option value="all">Todas las marcas</option>
              <option v-for="brand in catalogBrandFilters" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </option>
            </select>
          </label>

          <label class="filter-field">
            <span>Disponibilidad</span>
            <select v-model="availabilityFilter">
              <option value="all">Todas</option>
              <option value="stock">Disponible</option>
              <option value="preorder">Bajo pedido</option>
            </select>
          </label>

          <label class="filter-field">
            <span>Ordenar</span>
            <select v-model="sortMode">
              <option value="featured">Destacados</option>
              <option value="name">Nombre A–Z</option>
            </select>
          </label>
        </div>
      </div>
    </section>

    <section class="products-grid-section" id="resultados">
      <div class="container">
        <header class="results-header">
          <div>
            <p class="eyebrow eyebrow--green">RESULTADOS</p>
            <h2>{{ resultsTitle }}</h2>
            <p>Mostrando {{ filteredProducts.length }} de {{ catalogProducts.length }} productos.</p>
          </div>
          <div class="results-meta">
            <span>{{ activeFiltersLabel }}</span>
            <button type="button" @click="resetFilters">Limpiar filtros</button>
          </div>
        </header>

        <div v-if="filteredProducts.length" class="product-grid">
          <article v-for="product in filteredProducts" :key="product.id" class="product-card">
            <div v-if="product.status" class="product-card__badge">{{ product.status }}</div>
            <div class="product-card__media">
              <img :src="product.image" :alt="product.name" loading="lazy" />
            </div>
            <div class="product-card__body">
              <p class="product-card__category">{{ getProductClassification(product) }}</p>
              <h3>{{ product.name }}</h3>
              <p v-if="product.sku" class="product-card__sku">Código {{ product.sku }}</p>
              <p class="product-card__excerpt">{{ product.excerpt }}</p>
              <ul class="product-features" aria-label="Características">
                <li v-for="tag in product.tags" :key="tag">{{ tag }}</li>
              </ul>
              <div class="product-meta">
                <span class="availability" :class="`state-${product.availability}`">
                  <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                  {{ product.availability === 'stock' ? 'Disponible' : 'Bajo pedido' }}
                </span>
                <span v-if="product.brand" class="product-brand">{{ product.brand }}</span>
              </div>
            </div>
            <button class="add-product" type="button" @click="addProductToQuote(product)">
              <i class="fa-solid fa-plus" aria-hidden="true"></i>
              Agregar a cotización
            </button>
          </article>
        </div>

        <div v-else class="empty-state">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <h2>No encontramos productos con esos filtros.</h2>
          <p>Prueba otra categoría o limpia los filtros para volver al catálogo.</p>
          <button type="button" @click="resetFilters">Ver todo el catálogo</button>
        </div>
      </div>
    </section>

    <section class="productos-cta">
      <div class="container productos-cta__inner">
        <div>
          <p class="eyebrow">TU REQUERIMIENTO EN UN SOLO LUGAR</p>
          <h2>¿Ya elegiste tus productos?</h2>
        </div>
        <div class="productos-cta__actions">
          <button type="button" @click="openCart">Abrir mi cotización</button>
          <RouterLink to="/contacto">Hablar con ventas</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  catalogBrandFilters,
  catalogCategories,
  catalogProducts,
  getCategory,
  getProtectionType,
  protectionTypes,
  type CatalogProduct,
} from '@/data/catalog'
import { useQuoteCart } from '@/composables/useQuoteCart'

const route = useRoute()
const { addItem, openCart } = useQuoteCart()

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedProtectionType = ref('all')
const selectedBrand = ref('all')
const sortMode = ref<'featured' | 'name'>('featured')
const availabilityFilter = ref<'all' | 'stock' | 'preorder'>('all')

const categoryFilters = computed(() => [
  { id: 'all', label: 'Todas las categorías' },
  ...catalogCategories
    .filter((category) => catalogProducts.some((product) => product.category === category.id))
    .map((category) => ({ id: category.id, label: category.label })),
])

const protectionTypeFilters = computed(() => [
  { id: 'all', label: 'Todos los tipos' },
  ...protectionTypes
    .filter((type) => catalogProducts.some((product) => product.protectionTypes.includes(type.id)))
    .map((type) => ({ id: type.id, label: type.label })),
])

watch(
  () => route.query,
  (query) => {
    const category = typeof query.categoria === 'string' ? query.categoria : 'all'
    const type = typeof query.tipo === 'string' ? query.tipo : 'all'
    const brand = typeof query.marca === 'string' ? query.marca : 'all'

    selectedCategory.value = catalogCategories.some((item) => item.id === category) ? category : 'all'
    selectedProtectionType.value = protectionTypes.some((item) => item.id === type) ? type : 'all'
    selectedBrand.value = catalogBrandFilters.some((item) => item.id === brand) ? brand : 'all'
  },
  { immediate: true },
)

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('es')

  return catalogProducts
    .filter((product) => {
      const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value
      const matchesType = selectedProtectionType.value === 'all' || product.protectionTypes.includes(selectedProtectionType.value as never)
      const matchesBrand = selectedBrand.value === 'all' || product.brandSlug === selectedBrand.value
      const matchesAvailability = availabilityFilter.value === 'all' || product.availability === availabilityFilter.value
      const haystack = [product.sku ?? '', product.name, product.excerpt, product.brand ?? '', ...product.tags].join(' ').toLocaleLowerCase('es')
      return matchesCategory && matchesType && matchesBrand && matchesAvailability && (!query || haystack.includes(query))
    })
    .sort((a, b) => {
      if (sortMode.value === 'name') return a.name.localeCompare(b.name, 'es')
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return a.id - b.id
    })
})

const activeFiltersLabel = computed(() => {
  const labels: string[] = []
  if (selectedCategory.value !== 'all') labels.push(getCategory(selectedCategory.value)?.shortLabel ?? '')
  if (selectedProtectionType.value !== 'all') labels.push(getProtectionType(selectedProtectionType.value)?.label ?? '')
  if (selectedBrand.value !== 'all') labels.push(catalogBrandFilters.find((brand) => brand.id === selectedBrand.value)?.name ?? '')
  return labels.filter(Boolean).join(' · ') || 'Sin filtros aplicados'
})

const resultsTitle = computed(() => {
  if (selectedProtectionType.value !== 'all') return getProtectionType(selectedProtectionType.value)?.label ?? 'Productos disponibles'
  if (selectedBrand.value !== 'all') return `Productos ${catalogBrandFilters.find((brand) => brand.id === selectedBrand.value)?.name ?? ''}`
  return 'Productos disponibles'
})

function getProductClassification(product: CatalogProduct) {
  const category = getCategory(product.category)?.shortLabel ?? 'Producto'
  const activeType = product.protectionTypes.includes(selectedProtectionType.value as never)
    ? selectedProtectionType.value
    : product.protectionTypes[0]
  const type = getProtectionType(activeType)?.label
  return [category, type].filter(Boolean).join(' · ')
}

function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  selectedProtectionType.value = 'all'
  selectedBrand.value = 'all'
  availabilityFilter.value = 'all'
  sortMode.value = 'featured'
}

function addProductToQuote(product: CatalogProduct) {
  addItem({
    id: product.id,
    name: product.name,
    sku: product.sku,
    detail: product.excerpt,
    image: product.image,
    brand: product.brand,
  })
}
</script>

<style scoped>
.page-productos { color: var(--brand-ink); background: var(--brand-ivory); }
.productos-hero { position: relative; overflow: hidden; padding: clamp(3.5rem, 7vw, 6.5rem) 0; color: #fff; background: var(--brand-forest-deep); }
.productos-hero__inner { position: relative; z-index: 1; }
.productos-hero h1 { max-width: 850px; margin: .25rem 0 .75rem; color: #fff; font-family: var(--font-heading); font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 620; letter-spacing: -.03em; line-height: 1; }
.productos-hero p:last-child { max-width: 560px; margin: 0; color: rgba(255,255,255,.7); font-size: 1.05rem; }
.hero-grid-overlay { position: absolute; inset: 0; opacity: .22; background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px); background-size: 44px 44px; mask-image: linear-gradient(90deg, transparent 20%, #000); }
.eyebrow { margin: 0; color: var(--brand-yellow); font-size: .72rem; font-weight: 850; letter-spacing: .2em; }
.eyebrow--green { color: var(--brand-green); }
.productos-controls { position: relative; z-index: 3; margin-top: -1.6rem; }
.filters-card { display: grid; grid-template-columns: minmax(230px, 2fr) repeat(5, minmax(128px, 1fr)); gap: .8rem; padding: 1.15rem; border: 1px solid rgba(8,43,29,.1); border-radius: 12px; background: #fff; box-shadow: 0 18px 50px rgba(8,43,29,.1); }
.filter-field { display: grid; align-content: end; gap: .45rem; min-width: 0; }
.filter-field > span:first-child { color: #66736b; font-size: .72rem; font-weight: 800; }
.filter-field select, .filter-field input { width: 100%; min-height: 46px; border: 1px solid #d8dfda; border-radius: 8px; color: var(--brand-ink); background: #fff; font: inherit; }
.filter-field select { padding: .65rem .7rem; }
.search-input { position: relative; display: block; }
.search-input i { position: absolute; left: .9rem; top: 50%; color: #87928b; transform: translateY(-50%); }
.search-input input { padding: .7rem .8rem .7rem 2.6rem; }
.products-grid-section { padding: clamp(4rem, 7vw, 7rem) 0; }
.results-header { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2rem; }
.results-header h2 { margin: .35rem 0 .25rem; color: var(--brand-ink); font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 620; letter-spacing: -.025em; }
.results-header p:last-child { margin: 0; color: #6b766f; }
.results-meta { display: flex; align-items: center; gap: 1rem; color: #66736b; font-size: .82rem; }
.results-meta span { padding: .45rem .65rem; border-radius: 6px; background: var(--brand-sage); }
.results-meta button { padding: 0 0 .2rem; border: 0; border-bottom: 1px solid currentColor; color: var(--brand-green); background: transparent; font-weight: 800; }
.product-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.2rem; }
.product-card { position: relative; display: flex; flex-direction: column; min-width: 0; overflow: hidden; border: 1px solid rgba(8,43,29,.12); border-radius: 12px; background: #fff; transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
.product-card:hover { border-color: rgba(24,120,71,.35); box-shadow: 0 20px 42px rgba(8,43,29,.1); transform: translateY(-3px); }
.product-card__badge { position: absolute; z-index: 2; top: .8rem; left: .8rem; padding: .35rem .55rem; border-radius: 5px; color: var(--brand-ink); background: var(--brand-yellow); font-size: .65rem; font-weight: 900; text-transform: uppercase; }
.product-card__media { height: 250px; padding: 1.3rem; background: #fff; }
.product-card__media img { width: 100%; height: 100%; object-fit: contain; transition: transform .28s ease; }
.product-card:hover .product-card__media img { transform: scale(1.035); }
.product-card__body { display: flex; flex: 1; flex-direction: column; padding: 1.3rem 1.3rem 1rem; border-top: 1px solid rgba(8,43,29,.08); }
.product-card__category { margin: 0 0 .55rem; color: var(--brand-green); font-size: .68rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
.product-card h3 { margin: 0 0 .55rem; color: var(--brand-ink); font-size: 1.08rem; line-height: 1.25; }
.product-card__sku { margin: -.25rem 0 .6rem; color: #7b857f; font-size: .7rem; font-weight: 750; letter-spacing: .04em; }
.product-card__excerpt { margin: 0 0 1rem; color: #68736c; font-size: .88rem; line-height: 1.55; }
.product-features { display: flex; flex-wrap: wrap; gap: .4rem; margin: auto 0 1rem; padding: 0; list-style: none; }
.product-features li { padding: .3rem .45rem; border-radius: 5px; color: #536058; background: #f2f5f2; font-size: .7rem; }
.product-meta { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-top: .8rem; border-top: 1px solid rgba(8,43,29,.08); }
.availability { display: inline-flex; align-items: center; gap: .4rem; color: var(--brand-green); font-size: .78rem; font-weight: 800; }
.product-brand { color: #77827b; font-size: .73rem; font-weight: 800; }
.add-product { min-height: 50px; margin: 0 1.3rem 1.3rem; border: 0; border-radius: 8px; color: var(--brand-ink); background: var(--brand-yellow); font-weight: 900; transition: background .2s ease, transform .2s ease; }
.add-product:hover { background: #e8b92e; transform: translateY(-1px); }
.add-product i { margin-right: .45rem; }
.empty-state { min-height: 360px; display: grid; place-items: center; align-content: center; gap: .7rem; text-align: center; }
.empty-state > i { color: var(--brand-green); font-size: 2.4rem; }
.empty-state h2 { margin: .5rem 0 0; color: var(--brand-ink); font-family: var(--font-heading); font-size: 1.5rem; }
.empty-state p { margin: 0; color: #68736c; }
.empty-state button { min-height: 48px; margin-top: .8rem; padding: .7rem 1.2rem; border: 0; border-radius: 7px; color: #fff; background: var(--brand-forest); font-weight: 850; }
.productos-cta { padding: 3.5rem 0; color: #fff; background: var(--brand-forest-deep); }
.productos-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
.productos-cta h2 { margin: .35rem 0 0; color: #fff; font-family: var(--font-heading); font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 620; }
.productos-cta__actions { display: flex; gap: .75rem; }
.productos-cta__actions button, .productos-cta__actions a { min-height: 50px; display: inline-flex; align-items: center; justify-content: center; padding: .75rem 1.1rem; border: 1px solid rgba(255,255,255,.35); border-radius: 7px; color: #fff; background: transparent; font-weight: 850; text-decoration: none; }
.productos-cta__actions button { border-color: var(--brand-yellow); color: var(--brand-ink); background: var(--brand-yellow); }
@media (max-width: 1199.98px) {
  .filters-card { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .filter-field--search { grid-column: span 2; }
}
@media (max-width: 991.98px) {
  .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 767.98px) {
  .productos-controls { margin-top: 0; padding-top: 1rem; }
  .filters-card { grid-template-columns: 1fr 1fr; padding: 1rem; box-shadow: none; }
  .filter-field--search { grid-column: 1 / -1; }
  .results-header, .productos-cta__inner { align-items: flex-start; flex-direction: column; }
  .results-meta { align-items: flex-start; flex-direction: column; gap: .65rem; }
}
@media (max-width: 575.98px) {
  .productos-hero { padding: 3.25rem 0; }
  .filters-card, .product-grid { grid-template-columns: 1fr; }
  .filter-field--search { grid-column: auto; }
  .product-card__media { height: 225px; }
  .productos-cta__actions { width: 100%; flex-direction: column; }
}
</style>
