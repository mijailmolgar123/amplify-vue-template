<template>
  <main class="workflow-page">
    <section class="workflow-hero">
      <div class="container">
        <p class="section-kicker">CÓMO TRABAJAMOS</p>
        <h1>Convertimos información dispersa en un requerimiento cotizable.</h1>
        <p>Puedes comenzar con productos exactos o con una necesidad todavía abierta. El proceso organiza la información técnica y comercial antes de la propuesta.</p>
      </div>
    </section>

    <section class="workflow-steps">
      <div class="container">
        <article v-for="(step, index) in steps" :key="step.title">
          <span>0{{ index + 1 }}</span>
          <div class="step-icon"><i :class="step.icon" aria-hidden="true"></i></div>
          <div><h2>{{ step.title }}</h2><p>{{ step.text }}</p></div>
        </article>
      </div>
    </section>

    <section class="input-section">
      <div class="container input-layout">
        <div>
          <p class="section-kicker">INFORMACIÓN ÚTIL</p>
          <h2>Envíanos lo que ya tengas.</h2>
          <p>No todos los requerimientos llegan completos. Estos elementos ayudan a validar y buscar con mayor precisión.</p>
        </div>
        <ul>
          <li v-for="input in inputs" :key="input"><i class="fa-solid fa-check" aria-hidden="true"></i>{{ input }}</li>
        </ul>
      </div>
    </section>

    <section class="workflow-cta">
      <div class="container workflow-cta__inner">
        <div><p class="section-kicker">EMPECEMOS</p><h2>Catálogo y partidas manuales, en una sola solicitud.</h2></div>
        <button class="btn btn-pill btn-pill-primary" type="button" @click="openManualRequest()">Crear mi requerimiento</button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useQuoteCart } from '@/composables/useQuoteCart'
const { openManualRequest } = useQuoteCart()

const steps = [
  { title: 'Recibimos el requerimiento', text: 'Selecciona referencias del catálogo o envía una lista, fotografía, código o ficha técnica.', icon: 'fa-solid fa-inbox' },
  { title: 'Validamos la necesidad', text: 'Revisamos cantidades, aplicación, marca, especificaciones y condiciones de entrega.', icon: 'fa-solid fa-clipboard-check' },
  { title: 'Buscamos y comparamos alternativas', text: 'Consultamos opciones y organizamos la información técnica y comercial disponible.', icon: 'fa-solid fa-scale-balanced' },
  { title: 'Consolidamos la propuesta', text: 'Agrupamos las partidas en una sola cotización para facilitar la revisión de compras.', icon: 'fa-solid fa-file-invoice' },
  { title: 'Coordinamos la entrega', text: 'Alineamos el despacho según el destino y las condiciones que hayan sido acordadas.', icon: 'fa-solid fa-truck' },
]

const inputs = ['Descripción o aplicación', 'Código, modelo o marca', 'Cantidad y unidad de medida', 'Fotografía o ficha técnica', 'Norma o certificación requerida', 'Fecha y lugar de entrega', 'Autorización para evaluar equivalentes']
</script>

<style scoped>
.workflow-page { color: var(--brand-ink); background: var(--brand-ivory); }
.workflow-hero { padding: clamp(5rem, 10vw, 9rem) 0; color: #fff; background: var(--brand-forest-deep); }
.workflow-hero .section-kicker { color: var(--brand-yellow); }
.workflow-hero h1 { max-width: 1100px; margin: .5rem 0 1.2rem; color: #fff; font-family: var(--font-display); font-size: clamp(2.7rem, 6vw, 5.5rem); font-weight: 400; line-height: 1.02; text-wrap: balance; }
.workflow-hero p:last-child { max-width: 720px; margin: 0; color: rgba(255,255,255,.72); font-size: 1.06rem; }
.workflow-steps { padding: clamp(4rem, 8vw, 7rem) 0; background: #fff; }
.workflow-steps .container { border-top: 1px solid rgba(8,43,29,.16); }
.workflow-steps article { display: grid; grid-template-columns: 50px 64px 1fr; align-items: start; gap: 1.4rem; padding: clamp(1.5rem, 4vw, 2.5rem) 0; border-bottom: 1px solid rgba(8,43,29,.16); }
.workflow-steps article > span { color: var(--brand-green); font-size: .72rem; font-weight: 900; letter-spacing: .1em; }
.step-icon { width: 52px; height: 52px; display: grid; place-items: center; border-radius: 50%; color: var(--brand-green); background: var(--brand-sage); font-size: 1.15rem; }
.workflow-steps h2 { margin: 0 0 .45rem; font-size: clamp(1.35rem, 2.5vw, 2rem); }
.workflow-steps p { max-width: 720px; margin: 0; color: #66736b; }
.input-section { padding: clamp(4.5rem, 8vw, 7rem) 0; background: var(--brand-sage); }
.input-layout { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(3rem, 8vw, 8rem); }
.input-layout h2 { margin: .4rem 0 1rem; font-size: clamp(2.2rem, 4.5vw, 4rem); line-height: 1.04; }
.input-layout > div > p:last-child { color: #627067; }
.input-layout ul { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(8,43,29,.16); }
.input-layout li { display: flex; align-items: center; gap: .75rem; padding: .9rem 0; border-bottom: 1px solid rgba(8,43,29,.16); font-weight: 800; }
.input-layout i { color: var(--brand-green); }
.workflow-cta { padding: 4rem 0; color: #fff; background: var(--brand-forest); }
.workflow-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
.workflow-cta .section-kicker { color: var(--brand-yellow); }
.workflow-cta h2 { max-width: 760px; margin: .3rem 0 0; color: #fff; font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1.04; }
@media (max-width: 991.98px) { .input-layout { grid-template-columns: 1fr; } .workflow-cta__inner { align-items: flex-start; flex-direction: column; } }
@media (max-width: 575.98px) { .workflow-steps article { grid-template-columns: 30px 1fr; gap: .8rem; } .step-icon { grid-column: 2; grid-row: 1; width: 42px; height: 42px; } .workflow-steps article > div:last-child { grid-column: 2; } .workflow-cta .btn { width: 100%; } }
</style>
