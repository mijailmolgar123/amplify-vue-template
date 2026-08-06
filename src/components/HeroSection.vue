<template>
  <section id="inicio" class="hero-section">
    <div class="hero-shade" aria-hidden="true"></div>
    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="hero-eyebrow">ABASTECIMIENTO B2B PARA OPERACIONES</p>
        <h1>Resolvemos requerimientos para tu operación.</h1>
        <p class="hero-description">Gestionamos EPP, ropa de trabajo, herramientas, equipos e insumos. Buscamos alternativas y consolidamos tu compra en una sola atención.</p>
        <div class="hero-actions">
          <button class="btn btn-pill btn-pill-primary" type="button" @click="openManualRequest()">
            Enviar mi requerimiento
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
          <RouterLink to="/productos" class="hero-catalog">Explorar productos</RouterLink>
        </div>
        <a class="hero-whatsapp" href="https://wa.me/51996665221?text=Hola%20Segurimax%2C%20necesito%20asesor%C3%ADa%20para%20un%20requerimiento." target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
          Hablar con un asesor
        </a>
        <div class="hero-proof" aria-label="Capacidades de abastecimiento Segurimax">
          <span><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> Búsqueda de productos</span>
          <span><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i> Alternativas comparadas</span>
          <span><i class="fa-solid fa-boxes-stacked" aria-hidden="true"></i> Compra consolidada</span>
        </div>
      </div>
    </div>
    <a href="#soluciones" class="hero-scroll" aria-label="Ver soluciones">
      <span>Explorar</span>
      <i class="fa-solid fa-arrow-down" aria-hidden="true"></i>
    </a>
  </section>
</template>

<script setup lang="ts">
import { useQuoteCart } from '@/composables/useQuoteCart'

const { openManualRequest } = useQuoteCart()
</script>

<style scoped>
.hero-section { position: relative; min-height: calc(100svh - 82px); display: flex; align-items: center; overflow: hidden; color: #fff; background: url('@/assets/fondo-clean.png') 42% center / cover no-repeat; }
.hero-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(3,24,15,.78) 0%, rgba(3,24,15,.58) 42%, rgba(3,24,15,.22) 74%, rgba(3,24,15,.08) 100%), linear-gradient(0deg, rgba(3,24,15,.36), transparent 48%); }
.hero-inner { position: relative; z-index: 1; }
.hero-copy { max-width: 780px; padding: 4.5rem 0 5.5rem; animation: hero-rise .65s ease both; }
.hero-eyebrow { margin: 0 0 1.15rem; color: var(--brand-yellow); font-size: .74rem; font-weight: 800; letter-spacing: .19em; }
h1 { max-width: 760px; margin: 0; color: #fff; font-family: var(--font-display); font-size: clamp(2.65rem, 5vw, 4.65rem); font-weight: 400; letter-spacing: -.018em; line-height: 1.04; text-wrap: balance; }
.hero-description { max-width: 670px; margin: 1.35rem 0 1.8rem; color: rgba(255,255,255,.86); font-size: clamp(1rem, 2vw, 1.16rem); line-height: 1.58; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1rem 1.4rem; }
.hero-actions .btn { min-height: 56px; gap: .7rem; text-decoration: none; }
.hero-catalog { display: inline-flex; align-items: center; min-height: 54px; padding: 0 .2rem .15rem; border-bottom: 2px solid rgba(255,255,255,.45); color: #fff; font-weight: 850; text-decoration: none; }
.hero-whatsapp { display: inline-flex; align-items: center; gap: .6rem; margin-top: 1.2rem; color: #fff; font-weight: 800; text-decoration: none; }
.hero-whatsapp i { color: #4ade80; font-size: 1.2rem; }
.hero-whatsapp:hover { color: var(--brand-yellow); }
.hero-proof { display: flex; flex-wrap: wrap; gap: .75rem 1.4rem; margin-top: 2.4rem; color: rgba(255,255,255,.76); font-size: .82rem; font-weight: 700; }
.hero-proof span { display: inline-flex; align-items: center; gap: .45rem; }
.hero-proof i { color: #a9d8b9; }
.hero-scroll { position: absolute; z-index: 1; right: 3rem; bottom: 2rem; display: flex; align-items: center; gap: .65rem; color: rgba(255,255,255,.64); font-size: .7rem; font-weight: 800; letter-spacing: .15em; text-decoration: none; text-transform: uppercase; }
.hero-scroll i { animation: scroll-bob 1.6s ease-in-out infinite; }
@keyframes hero-rise { from { opacity: 0; transform: translateY(18px); } }
@keyframes scroll-bob { 50% { transform: translateY(5px); } }
@media (max-width: 767.98px) {
  .hero-section { min-height: calc(100svh - 74px); background-position: 48% center; }
  .hero-shade { background: linear-gradient(0deg, rgba(3,24,15,.82) 0%, rgba(3,24,15,.52) 62%, rgba(3,24,15,.18) 100%); }
  .hero-copy { padding: 4rem 0 3.5rem; }
  h1 { font-size: clamp(2.25rem, 10.2vw, 3.2rem); }
  .hero-actions { align-items: stretch; }
  .hero-actions .btn { width: 100%; }
  .hero-catalog { justify-content: center; }
  .hero-whatsapp { justify-content: flex-start; }
  .hero-proof { gap: .65rem 1rem; margin-top: 1.7rem; }
  .hero-proof span { width: calc(50% - .5rem); font-size: .74rem; }
  .hero-proof span:last-child { width: 100%; }
  .hero-scroll { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-scroll i, .hero-copy { animation: none; }
}
</style>
