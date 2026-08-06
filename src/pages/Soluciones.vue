<template>
  <main class="solutions-page">
    <section class="solutions-hero">
      <div class="container solutions-hero__inner">
        <p class="section-kicker">SOLUCIONES DE ABASTECIMIENTO</p>
        <h1>Una necesidad operativa no siempre empieza con un producto exacto.</h1>
        <p>Segurimax recibe el requerimiento, ordena la información y gestiona alternativas para que compras y operaciones puedan avanzar.</p>
        <div class="solutions-actions">
          <button class="btn btn-pill btn-pill-primary" type="button" @click="openManualRequest()">Enviar requerimiento</button>
          <RouterLink to="/productos">Explorar catálogo <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></RouterLink>
        </div>
      </div>
    </section>

    <section class="capabilities-section">
      <div class="container capabilities-layout">
        <header>
          <p class="section-kicker">QUÉ PODEMOS GESTIONAR</p>
          <h2>Del EPP al insumo especial.</h2>
          <p>Estas líneas describen capacidades de búsqueda y abastecimiento; el catálogo muestra solo una parte de las referencias.</p>
        </header>
        <div class="capability-list">
          <article v-for="(capability, index) in capabilities" :id="capability.id" :key="capability.title">
            <span>0{{ index + 1 }}</span>
            <i :class="capability.icon" aria-hidden="true"></i>
            <div><h3>{{ capability.title }}</h3><p>{{ capability.text }}</p></div>
            <button type="button" :aria-label="`Consultar ${capability.title}`" @click="openManualRequest(capability.title)"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
          </article>
        </div>
      </div>
    </section>

    <section class="sectors-section">
      <div class="container sectors-layout">
        <div>
          <p class="section-kicker">OPERACIONES QUE ATENDEMOS</p>
          <h2>Requerimientos para entornos exigentes.</h2>
        </div>
        <ul>
          <li v-for="sector in sectors" :key="sector"><i class="fa-solid fa-check" aria-hidden="true"></i>{{ sector }}</li>
        </ul>
      </div>
    </section>

    <section id="especiales" class="special-solution">
      <div class="container special-solution__inner">
        <div>
          <p class="section-kicker">FUERA DE CATÁLOGO</p>
          <h2>Una foto, un código o una necesidad pueden ser suficientes para empezar.</h2>
        </div>
        <div>
          <p>Incluye cantidades, aplicación, marca, certificaciones y entrega cuando las conozcas. También puedes indicar si aceptas alternativas equivalentes.</p>
          <button type="button" @click="openManualRequest()">Describir lo que necesito <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useQuoteCart } from '@/composables/useQuoteCart'
const { openManualRequest } = useQuoteCart()

const capabilities = [
  { id: 'seguridad', title: 'Seguridad industrial y EPP', text: 'Protección de cabeza, manos, vista, respiración, oído y trabajo en altura.', icon: 'fa-solid fa-helmet-safety' },
  { id: 'ropa', title: 'Ropa de trabajo', text: 'Prendas industriales, alta visibilidad y condiciones especiales de operación.', icon: 'fa-solid fa-shirt' },
  { id: 'herramientas', title: 'Herramientas y equipos', text: 'Búsqueda por marca, modelo, aplicación o especificación técnica.', icon: 'fa-solid fa-screwdriver-wrench' },
  { id: 'mantenimiento', title: 'Limpieza y mantenimiento', text: 'Consumibles e insumos para continuidad y cuidado de instalaciones.', icon: 'fa-solid fa-broom' },
  { id: 'colectiva', title: 'Señalización y protección colectiva', text: 'Elementos para delimitar, señalizar y controlar áreas de trabajo.', icon: 'fa-solid fa-road-barrier' },
  { id: 'operativos', title: 'Insumos operativos diversos', text: 'Referencias especiales que compras u operaciones necesitan consolidar.', icon: 'fa-solid fa-boxes-stacked' },
  { id: 'busqueda', title: 'Búsqueda de productos especiales', text: 'Procura a partir de códigos, fichas, fotografías o descripciones.', icon: 'fa-solid fa-magnifying-glass-plus' },
  { id: 'consolidacion', title: 'Consolidación de compras', text: 'Varias partidas organizadas en un solo requerimiento comercial.', icon: 'fa-solid fa-file-invoice' },
]

const sectors = ['Minería', 'Construcción', 'Mantenimiento', 'Industria', 'Contratistas y servicios operativos']
</script>

<style scoped>
.solutions-page { color: var(--brand-ink); background: #fff; }
.solutions-hero { padding: clamp(5rem, 10vw, 9rem) 0; color: #fff; background: linear-gradient(105deg, rgba(4,29,19,.98), rgba(4,29,19,.74)), url('@/assets/fondo-clean.png') center / cover; }
.solutions-hero__inner { max-width: 1050px; margin-left: max(0px, calc((100vw - 1320px) / 2)); }
.solutions-hero .section-kicker { color: var(--brand-yellow); }
.solutions-hero h1 { max-width: 1000px; margin: .55rem 0 1.2rem; color: #fff; font-family: var(--font-display); font-size: clamp(2.6rem, 6vw, 5.4rem); font-weight: 400; line-height: 1.02; text-wrap: balance; }
.solutions-hero__inner > p:not(.section-kicker) { max-width: 720px; color: rgba(255,255,255,.76); font-size: 1.08rem; }
.solutions-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1.2rem; margin-top: 2rem; }
.solutions-actions a { display: inline-flex; align-items: center; gap: .5rem; padding-bottom: .3rem; border-bottom: 2px solid rgba(255,255,255,.4); color: #fff; font-weight: 850; text-decoration: none; }
.capabilities-section { padding: clamp(5rem, 9vw, 8rem) 0; }
.capabilities-layout { display: grid; grid-template-columns: minmax(280px, .75fr) minmax(0, 1.25fr); gap: clamp(3rem, 8vw, 8rem); }
.capabilities-layout > header { position: sticky; top: 115px; align-self: start; }
.capabilities-layout h2, .sectors-layout h2, .special-solution h2 { margin: .45rem 0 1rem; font-size: clamp(2.2rem, 4.5vw, 4rem); line-height: 1.04; }
.capabilities-layout header > p:last-child { color: #66736b; }
.capability-list { border-top: 1px solid rgba(8,43,29,.16); }
.capability-list article { display: grid; grid-template-columns: 38px 46px 1fr auto; align-items: center; gap: 1rem; min-height: 116px; padding: 1.1rem 0; border-bottom: 1px solid rgba(8,43,29,.16); scroll-margin-top: 110px; }
.capability-list article > span { color: var(--brand-green); font-size: .7rem; font-weight: 900; }
.capability-list article > i { color: var(--brand-green); font-size: 1.25rem; }
.capability-list h3 { margin: 0 0 .25rem; font-size: 1.08rem; }
.capability-list p { margin: 0; color: #68746c; font-size: .88rem; }
.capability-list button { width: 38px; height: 38px; border: 1px solid rgba(8,43,29,.2); border-radius: 50%; color: var(--brand-ink); background: transparent; }
.capability-list article:hover button { border-color: var(--brand-yellow); background: var(--brand-yellow); }
.sectors-section { padding: clamp(4.5rem, 8vw, 7rem) 0; background: var(--brand-sage); }
.sectors-layout { display: grid; grid-template-columns: 1fr 1fr; align-items: end; gap: clamp(3rem, 8vw, 8rem); }
.sectors-layout ul { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(8,43,29,.16); }
.sectors-layout li { display: flex; align-items: center; gap: .75rem; padding: 1rem 0; border-bottom: 1px solid rgba(8,43,29,.16); font-weight: 800; }
.sectors-layout i { color: var(--brand-green); }
.special-solution { padding: clamp(4.5rem, 8vw, 7rem) 0; color: #fff; background: var(--brand-forest-deep); }
.special-solution__inner { display: grid; grid-template-columns: 1.2fr .8fr; align-items: end; gap: clamp(3rem, 8vw, 8rem); }
.special-solution .section-kicker { color: var(--brand-yellow); }
.special-solution h2 { color: #fff; }
.special-solution__inner > div:last-child p { color: rgba(255,255,255,.68); }
.special-solution button { min-height: 52px; display: inline-flex; align-items: center; gap: .6rem; margin-top: 1rem; padding: .75rem 1rem; border: 0; border-radius: 7px; color: var(--brand-ink); background: var(--brand-yellow); font-weight: 900; }
@media (max-width: 991.98px) { .capabilities-layout, .sectors-layout, .special-solution__inner { grid-template-columns: 1fr; } .capabilities-layout > header { position: static; } }
@media (max-width: 575.98px) { .solutions-actions, .solutions-actions .btn { width: 100%; } .solutions-actions a { justify-content: center; width: 100%; min-height: 48px; } .capability-list article { grid-template-columns: 28px 34px 1fr; } .capability-list article > button { display: none; } }
</style>
