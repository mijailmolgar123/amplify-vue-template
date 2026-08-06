<template>
  <main class="home-page">
    <HeroSection />

    <section class="open-request-strip">
      <div class="container open-request-strip__inner">
        <i class="fa-solid fa-file-circle-plus" aria-hidden="true"></i>
        <div>
          <strong>¿No encuentras el producto en el catálogo?</strong>
          <p>Envíanos una descripción, código, fotografía, ficha técnica o lista de materiales.</p>
        </div>
        <button type="button" @click="openManualRequest()">Cotizar algo especial <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
      </div>
    </section>

    <section id="soluciones" class="category-section">
      <div class="container">
        <header class="category-header">
          <div>
            <p class="section-kicker">SOLUCIONES DE ABASTECIMIENTO</p>
            <h2 class="section-heading">Más que un catálogo.</h2>
          </div>
          <p>Gestionamos líneas publicadas y requerimientos especiales para compras y operaciones.</p>
        </header>

        <div class="category-list">
          <RouterLink
            v-for="solution in solutions"
            :key="solution.title"
            :to="solution.to"
            class="category-item"
          >
            <span class="category-icon"><i :class="solution.icon" aria-hidden="true"></i></span>
            <span class="category-copy">
              <strong>{{ solution.title }}</strong>
              <small>{{ solution.subtitle }}</small>
            </span>
            <i class="fa-solid fa-arrow-right category-arrow" aria-hidden="true"></i>
          </RouterLink>
        </div>
      </div>
    </section>

    <FeaturedProducts />

    <section class="quote-process">
      <div class="container process-layout">
        <div class="process-intro">
          <p class="section-kicker">CÓMO TRABAJAMOS</p>
          <h2>Del requerimiento<br />a una propuesta clara.</h2>
          <p>No necesitas conocer el proveedor exacto. Revisamos tu necesidad y organizamos la información para cotizar.</p>
          <button class="btn btn-pill btn-pill-primary" type="button" @click="openCart">
            Abrir mi requerimiento
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
        <ol class="process-steps">
          <li v-for="(step, index) in processSteps" :key="step.title">
            <span>0{{ index + 1 }}</span>
            <div>
              <i :class="step.icon" aria-hidden="true"></i>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="brand-section">
      <div class="container">
        <div class="brand-heading">
          <div>
            <p class="section-kicker">MARCAS RECONOCIDAS</p>
            <h2>Respaldo para cada operación.</h2>
          </div>
          <RouterLink to="/marcas">Conocer nuestras marcas <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></RouterLink>
        </div>
        <div class="brand-rail" aria-label="Marcas comercializadas">
          <img v-for="brand in brands" :key="brand.name" :src="brand.src" :alt="brand.name" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="trust-section">
      <div class="container trust-layout">
        <div class="trust-copy">
          <p class="section-kicker">COMPRA CON CONFIANZA</p>
          <h2>Seguridad que se puede comprobar.</h2>
          <p>La seguridad industrial sigue siendo nuestro núcleo técnico, respaldado por marcas reconocidas y atención directa.</p>
          <RouterLink to="/empresa" class="trust-link">Conocer Segurimax <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></RouterLink>
        </div>
        <div class="certification-list">
          <figure v-for="certification in certifications" :key="certification.alt">
            <img :src="certification.src" :alt="certification.alt" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <section class="final-cta">
      <div class="container final-cta__inner">
        <div>
          <p class="section-kicker">CATÁLOGO O REQUERIMIENTO ABIERTO</p>
          <h2>Cuéntanos qué necesita tu operación.</h2>
        </div>
        <div class="final-actions">
          <button class="btn btn-pill btn-pill-primary" type="button" @click="openManualRequest()">Enviar requerimiento</button>
          <a href="https://wa.me/51996665221" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            Hablar con ventas
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import HeroSection from '@/components/HeroSection.vue'
import { useQuoteCart } from '@/composables/useQuoteCart'
import { catalogBrands } from '@/data/catalog'

import sgsLogo from '@/assets/logo_sgs-2.jpg'
import hodelpeLogo from '@/assets/LOGOTIPO_DE_HOMOLOGADO_-_CORPORACION_HODELPE_SAC.jpg'

const { openCart, openManualRequest } = useQuoteCart()

const solutions = [
  { title: 'Seguridad industrial y EPP', subtitle: 'Protección personal para distintos riesgos.', icon: 'fa-solid fa-helmet-safety', to: { path: '/productos', query: { categoria: 'epps' } } },
  { title: 'Ropa de trabajo', subtitle: 'Prendas industriales y alta visibilidad.', icon: 'fa-solid fa-shirt', to: { path: '/productos', query: { categoria: 'ropa-industrial' } } },
  { title: 'Herramientas y equipos', subtitle: 'Búsqueda por marca, modelo o aplicación.', icon: 'fa-solid fa-screwdriver-wrench', to: '/soluciones#herramientas' },
  { title: 'Limpieza y mantenimiento', subtitle: 'Insumos para continuidad operativa.', icon: 'fa-solid fa-broom', to: { path: '/productos', query: { categoria: 'kitchenette' } } },
  { title: 'Protección colectiva', subtitle: 'Señalización y control de áreas.', icon: 'fa-solid fa-road-barrier', to: { path: '/productos', query: { categoria: 'epcs' } } },
  { title: 'Productos especiales', subtitle: 'Procura de referencias fuera de catálogo.', icon: 'fa-solid fa-magnifying-glass-plus', to: '/soluciones#especiales' },
]

const processSteps = [
  { title: 'Recibimos el requerimiento', text: 'Catálogo, lista, fotografía, código o ficha técnica.', icon: 'fa-solid fa-inbox' },
  { title: 'Validamos la necesidad', text: 'Revisamos cantidades, aplicación, marca y entrega.', icon: 'fa-solid fa-clipboard-check' },
  { title: 'Buscamos alternativas', text: 'Evaluamos opciones técnicas y comerciales.', icon: 'fa-solid fa-magnifying-glass' },
  { title: 'Consolidamos la propuesta', text: 'Ordenamos todo en una sola cotización.', icon: 'fa-solid fa-file-invoice' },
  { title: 'Coordinamos la entrega', text: 'Alineamos destino y condiciones acordadas.', icon: 'fa-solid fa-truck' },
]

const brands = catalogBrands
  .filter((brand) => Boolean(brand.logo))
  .map((brand) => ({ name: brand.name, src: brand.logo! }))

const certifications = [
  { src: sgsLogo, alt: 'Homologación SGS' },
  { src: hodelpeLogo, alt: 'Homologación Corporación Hodelpe' },
]
</script>

<style scoped>
.home-page { background: var(--brand-ivory); }
.open-request-strip { color: #fff; background: var(--brand-green); }
.open-request-strip__inner { min-height: 112px; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 1.2rem; padding-top: 1.15rem; padding-bottom: 1.15rem; }
.open-request-strip__inner > i { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; color: var(--brand-ink); background: var(--brand-yellow); font-size: 1.1rem; }
.open-request-strip strong { font-size: 1.05rem; }
.open-request-strip p { margin: .2rem 0 0; color: rgba(255,255,255,.72); font-size: .88rem; }
.open-request-strip button { min-height: 46px; display: inline-flex; align-items: center; gap: .55rem; padding: .65rem 1rem; border: 1px solid rgba(255,255,255,.35); border-radius: 7px; color: #fff; background: transparent; font-weight: 850; white-space: nowrap; }
.open-request-strip button:hover { color: var(--brand-ink); background: var(--brand-yellow); border-color: var(--brand-yellow); }
.category-section { padding: clamp(4.5rem, 8vw, 7.5rem) 0; background: #fff; }
.category-header { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2.5rem; }
.category-header h2 { margin: 0; }
.category-header > p { max-width: 330px; margin: 0; color: #6a756e; font-size: 1rem; }
.category-list { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid rgba(8,43,29,.12); border-left: 1px solid rgba(8,43,29,.12); }
.category-item { min-height: 140px; display: grid; grid-template-columns: 52px 1fr auto; align-items: center; gap: 1rem; padding: 1.4rem; border-right: 1px solid rgba(8,43,29,.12); border-bottom: 1px solid rgba(8,43,29,.12); color: var(--brand-ink); text-decoration: none; transition: color .2s ease, background .2s ease; }
.category-item:hover { color: #fff; background: var(--brand-forest); }
.category-icon { width: 50px; height: 50px; display: grid; place-items: center; border-radius: 10px; color: var(--brand-green); background: var(--brand-sage); font-size: 1.3rem; transition: color .2s ease, background .2s ease; }
.category-item:hover .category-icon { color: var(--brand-ink); background: var(--brand-yellow); }
.category-copy { display: grid; gap: .25rem; }
.category-copy strong { font-size: 1.02rem; }
.category-copy small { color: #7a857e; }
.category-item:hover small { color: rgba(255,255,255,.65); }
.category-arrow { color: #9aa29d; font-size: .78rem; }
.category-item:hover .category-arrow { color: var(--brand-yellow); }
.quote-process { padding: clamp(5rem, 9vw, 9rem) 0; color: #fff; background: var(--brand-forest); }
.process-layout { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(3rem, 7vw, 8rem); align-items: center; }
.process-intro .section-kicker { color: var(--brand-yellow); }
.process-intro h2 { margin-bottom: 1.2rem; color: #fff; font-size: clamp(2.4rem, 5vw, 4.6rem); line-height: 1.03; }
.process-intro > p:not(.section-kicker) { max-width: 480px; margin-bottom: 2rem; color: rgba(255,255,255,.68); font-size: 1.08rem; }
.process-intro .btn { gap: .75rem; }
.process-steps { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(255,255,255,.15); }
.process-steps li { display: grid; grid-template-columns: 54px 1fr; gap: 1.2rem; padding: 1.5rem 0; border-bottom: 1px solid rgba(255,255,255,.15); }
.process-steps li > span { color: var(--brand-yellow); font-size: .75rem; font-weight: 900; letter-spacing: .1em; }
.process-steps i { margin-bottom: .7rem; color: #a9d8b9; font-size: 1.3rem; }
.process-steps h3 { margin: 0 0 .35rem; color: #fff; font-size: 1.15rem; }
.process-steps p { margin: 0; color: rgba(255,255,255,.6); }
.brand-section { padding: clamp(4.5rem, 8vw, 7rem) 0; background: #fff; }
.brand-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2.5rem; }
.brand-heading h2 { margin: 0; color: var(--brand-ink); font-size: clamp(2rem, 4vw, 3.25rem); }
.brand-heading a, .trust-link { display: inline-flex; align-items: center; gap: .6rem; padding-bottom: .3rem; border-bottom: 2px solid var(--brand-yellow); color: var(--brand-ink); font-weight: 850; text-decoration: none; }
.brand-rail { display: grid; grid-template-columns: repeat(6, 1fr); align-items: center; border-top: 1px solid rgba(8,43,29,.1); border-bottom: 1px solid rgba(8,43,29,.1); }
.brand-rail img { width: 100%; height: 115px; padding: 1.6rem; object-fit: contain; filter: grayscale(1); opacity: .68; transition: filter .2s ease, opacity .2s ease; }
.brand-rail img:hover { filter: grayscale(0); opacity: 1; }
.trust-section { padding: clamp(4.5rem, 8vw, 7.5rem) 0; background: var(--brand-sage); }
.trust-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, .9fr); align-items: center; gap: clamp(3rem, 7vw, 7rem); }
.trust-copy h2 { max-width: 680px; margin-bottom: 1.2rem; color: var(--brand-ink); font-size: clamp(2.3rem, 5vw, 4.4rem); line-height: 1.03; }
.trust-copy > p:not(.section-kicker) { max-width: 580px; margin-bottom: 2rem; color: #5f6c64; font-size: 1.05rem; }
.certification-list { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.certification-list figure { min-height: 210px; display: grid; place-items: center; margin: 0; padding: 1.2rem; border-radius: 14px; background: #fff; }
.certification-list img { width: 100%; height: 170px; object-fit: contain; }
.final-cta { padding: 4rem 0; color: #fff; background: var(--brand-forest-deep); }
.final-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
.final-cta .section-kicker { color: var(--brand-yellow); }
.final-cta h2 { margin: 0; color: #fff; font-size: clamp(2rem, 4.5vw, 3.5rem); }
.final-actions { display: flex; align-items: center; gap: 1.4rem; }
.final-actions > a { display: inline-flex; align-items: center; gap: .55rem; color: #fff; font-weight: 850; text-decoration: none; white-space: nowrap; }
.final-actions > a i { color: #4ade80; font-size: 1.2rem; }
@media (max-width: 991.98px) {
  .category-list { grid-template-columns: repeat(2, 1fr); }
  .process-layout, .trust-layout { grid-template-columns: 1fr; }
  .brand-rail { grid-template-columns: repeat(3, 1fr); }
  .final-cta__inner { align-items: flex-start; flex-direction: column; }
  .open-request-strip__inner { grid-template-columns: auto 1fr; }
  .open-request-strip button { grid-column: 2; justify-self: start; }
}
@media (max-width: 575.98px) {
  .open-request-strip__inner { grid-template-columns: 1fr; padding-top: 1.5rem; padding-bottom: 1.5rem; }
  .open-request-strip__inner > i { display: none; }
  .open-request-strip button { grid-column: 1; width: 100%; justify-content: center; }
  .category-header, .brand-heading { align-items: flex-start; flex-direction: column; }
  .category-list { grid-template-columns: 1fr; }
  .category-item { min-height: 108px; }
  .brand-rail { grid-template-columns: repeat(2, 1fr); }
  .brand-rail img { height: 95px; padding: 1.25rem; }
  .certification-list { grid-template-columns: 1fr; }
  .final-actions { width: 100%; align-items: stretch; flex-direction: column; }
  .final-actions .btn { width: 100%; }
  .final-actions > a { justify-content: center; min-height: 48px; }
}
</style>
