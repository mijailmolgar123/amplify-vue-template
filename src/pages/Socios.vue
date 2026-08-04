<template>
  <main class="marcas-page">
    <section class="marcas-hero">
      <div class="container marcas-hero__inner">
        <div>
          <p class="section-kicker">MARCAS EN SEGURIMAX</p>
          <h1>Encuentra la marca que ya usa tu operación.</h1>
        </div>
        <p>Explora los productos publicados o consulta directamente la disponibilidad de una marca.</p>
      </div>
    </section>

    <section class="marcas-list" id="marcas">
      <div class="container">
        <header class="marcas-heading">
          <div>
            <p class="section-kicker">CATÁLOGO MULTIMARCA</p>
            <h2>Marcas destacadas.</h2>
          </div>
          <p>La disponibilidad se confirma al momento de cotizar.</p>
        </header>

        <div class="brand-grid">
          <article v-for="brand in brands" :key="brand.id" class="brand-item">
            <div class="brand-logo">
              <img :src="brand.logo" :alt="brand.name" loading="lazy" />
            </div>
            <div class="brand-copy">
              <div>
                <h3>{{ brand.name }}</h3>
                <p v-if="brand.productCount">
                  {{ brand.productCount }} {{ brand.productCount === 1 ? 'producto publicado' : 'productos publicados' }}
                </p>
                <p v-else>Consulta modelos y disponibilidad con ventas.</p>
              </div>
              <RouterLink
                v-if="brand.productCount"
                :to="{ path: '/productos', query: { marca: brand.id } }"
              >
                Ver productos <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </RouterLink>
              <a v-else :href="brand.whatsAppUrl" target="_blank" rel="noopener noreferrer">
                Consultar marca <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="marcas-note">
      <div class="container marcas-note__inner">
        <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
        <p>
          Los logotipos identifican marcas consultables en Segurimax. La disponibilidad, modelo y documentación de cada producto se confirman en la cotización.
        </p>
      </div>
    </section>

    <section class="marcas-cta">
      <div class="container marcas-cta__inner">
        <div>
          <p class="section-kicker">¿NO VES LA MARCA QUE BUSCAS?</p>
          <h2>Envíanos el modelo o una foto.</h2>
        </div>
        <a
          class="btn btn-pill btn-pill-primary"
          href="https://wa.me/51996665221?text=Hola%20Segurimax%2C%20deseo%20consultar%20la%20disponibilidad%20de%20una%20marca%20o%20modelo."
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { catalogBrands, getBrandProductCount } from '@/data/catalog'

const brands = catalogBrands.map((brand) => {
  const productCount = getBrandProductCount(brand.id)
  const message = encodeURIComponent(`Hola Segurimax, deseo consultar productos de la marca ${brand.name}.`)
  return {
    ...brand,
    productCount,
    whatsAppUrl: `https://wa.me/51996665221?text=${message}`,
  }
})
</script>

<style scoped>
.marcas-page { color: var(--brand-ink); background: #fff; }
.marcas-hero { padding: clamp(4.5rem, 9vw, 8rem) 0; color: #fff; background: var(--brand-forest-deep); }
.marcas-hero__inner { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(300px, .65fr); align-items: end; gap: clamp(3rem, 9vw, 9rem); }
.marcas-hero h1 { max-width: 880px; margin: .5rem 0 0; color: #fff; font-family: var(--font-heading); font-size: clamp(2.8rem, 6vw, 5.3rem); font-weight: 620; letter-spacing: -.035em; line-height: 1.02; }
.marcas-hero__inner > p { margin: 0 0 .5rem; color: rgba(255,255,255,.7); font-size: 1.05rem; line-height: 1.6; }
.marcas-list { padding: clamp(4.5rem, 8vw, 7.5rem) 0; }
.marcas-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2.5rem; }
.marcas-heading h2 { margin: .4rem 0 0; color: var(--brand-ink); font-family: var(--font-heading); font-size: clamp(2.2rem, 4.5vw, 3.8rem); font-weight: 620; letter-spacing: -.03em; }
.marcas-heading > p { max-width: 320px; margin: 0; color: #68736c; }
.brand-grid { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid rgba(8,43,29,.14); border-left: 1px solid rgba(8,43,29,.14); }
.brand-item { min-height: 235px; display: grid; grid-template-columns: 42% 58%; border-right: 1px solid rgba(8,43,29,.14); border-bottom: 1px solid rgba(8,43,29,.14); background: #fff; }
.brand-logo { display: grid; place-items: center; min-width: 0; padding: 2rem; background: #f5f7f4; }
.brand-logo img { width: 100%; height: 115px; object-fit: contain; filter: grayscale(1); transition: filter .2s ease, transform .2s ease; }
.brand-item:hover .brand-logo img { filter: grayscale(0); transform: scale(1.035); }
.brand-copy { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; padding: 1.6rem; }
.brand-copy h3 { margin: 0 0 .45rem; color: var(--brand-ink); font-size: 1.25rem; }
.brand-copy p { margin: 0; color: #6e7972; font-size: .88rem; }
.brand-copy a { display: inline-flex; align-items: center; gap: .55rem; padding-bottom: .2rem; border-bottom: 2px solid var(--brand-yellow); color: var(--brand-ink); font-size: .85rem; font-weight: 850; text-decoration: none; }
.brand-copy a .fa-whatsapp { color: var(--brand-green); font-size: 1rem; }
.marcas-note { padding: 1.5rem 0; background: var(--brand-sage); }
.marcas-note__inner { display: flex; align-items: flex-start; gap: .8rem; }
.marcas-note i { margin-top: .25rem; color: var(--brand-green); }
.marcas-note p { max-width: 900px; margin: 0; color: #526057; font-size: .86rem; }
.marcas-cta { padding: 3.5rem 0; color: #fff; background: var(--brand-forest); }
.marcas-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
.marcas-cta h2 { margin: .35rem 0 0; color: #fff; font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 620; }
@media (max-width: 991.98px) {
  .marcas-hero__inner { grid-template-columns: 1fr; }
}
@media (max-width: 767.98px) {
  .marcas-heading, .marcas-cta__inner { align-items: flex-start; flex-direction: column; }
  .brand-grid { grid-template-columns: 1fr; }
  .marcas-cta__inner .btn { width: 100%; }
}
@media (max-width: 480px) {
  .brand-item { grid-template-columns: 38% 62%; min-height: 205px; }
  .brand-logo { padding: 1rem; }
  .brand-logo img { height: 90px; }
  .brand-copy { padding: 1.1rem; }
}
</style>
