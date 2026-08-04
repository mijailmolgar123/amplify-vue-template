<template>
  <section id="inicio" class="hero-section">
    <div class="hero-shade" aria-hidden="true"></div>
    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="hero-eyebrow">SEGURIDAD INDUSTRIAL PARA EMPRESAS</p>
        <h1>
          <span>EPP para</span>
          <span class="typed-line" aria-hidden="true">
            <span class="typed-text">{{ typedText }}</span><span class="typed-cursor">|</span>
          </span>
          <span class="visually-hidden">&nbsp;minería, construcción e industria</span>
        </h1>
        <p class="hero-description">Elige productos, indica cantidades y envía una sola solicitud.</p>
        <div class="hero-actions">
          <RouterLink to="/productos" class="btn btn-pill btn-pill-primary">
            Armar mi cotización
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </RouterLink>
          <a
            class="hero-whatsapp"
            href="https://wa.me/51996665221?text=Hola%20Segurimax%2C%20necesito%20asesor%C3%ADa%20para%20elegir%20EPP."
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            Hablar con ventas
          </a>
        </div>
        <div class="hero-proof" aria-label="Ventajas de la cotización Segurimax">
          <span><i class="fa-solid fa-tags" aria-hidden="true"></i> Catálogo multimarcas</span>
          <span><i class="fa-solid fa-list-check" aria-hidden="true"></i> Una sola solicitud</span>
          <span><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> WhatsApp o correo</span>
        </div>
      </div>
    </div>
    <a href="#categorias" class="hero-scroll" aria-label="Ver categorías">
      <span>Explorar</span>
      <i class="fa-solid fa-arrow-down" aria-hidden="true"></i>
    </a>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const phrases = ['minería', 'construcción', 'industria']
const typedText = ref(phrases[0])
let phraseIndex = 0
let charIndex = phrases[0].length
let deleting = true
let timer: number | undefined
let motionQuery: MediaQueryList | undefined

function typeLoop() {
  const phrase = phrases[phraseIndex]

  if (deleting) {
    charIndex -= 1
    typedText.value = phrase.slice(0, Math.max(0, charIndex))
    if (charIndex <= 0) {
      deleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      timer = window.setTimeout(typeLoop, 260)
      return
    }
  } else {
    const nextPhrase = phrases[phraseIndex]
    charIndex += 1
    typedText.value = nextPhrase.slice(0, charIndex)
    if (charIndex >= nextPhrase.length) {
      deleting = true
      timer = window.setTimeout(typeLoop, 1500)
      return
    }
  }

  timer = window.setTimeout(typeLoop, deleting ? 55 : 95)
}

function configureMotion() {
  if (timer) window.clearTimeout(timer)
  if (motionQuery?.matches) {
    typedText.value = 'industria'
    return
  }

  phraseIndex = 0
  charIndex = phrases[0].length
  deleting = true
  typedText.value = phrases[0]
  timer = window.setTimeout(typeLoop, 1500)
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  configureMotion()
  motionQuery.addEventListener('change', configureMotion)
})

onBeforeUnmount(() => {
  if (timer) window.clearTimeout(timer)
  motionQuery?.removeEventListener('change', configureMotion)
})
</script>

<style scoped>
.hero-section { position: relative; min-height: calc(100svh - 82px); display: flex; align-items: center; overflow: hidden; color: #fff; background: url('@/assets/fondo.png') 42% center / cover no-repeat; }
.hero-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(3,24,15,.78) 0%, rgba(3,24,15,.58) 42%, rgba(3,24,15,.22) 74%, rgba(3,24,15,.08) 100%), linear-gradient(0deg, rgba(3,24,15,.36), transparent 48%); }
.hero-inner { position: relative; z-index: 1; }
.hero-copy { max-width: 720px; padding: 4.5rem 0 5.5rem; }
.hero-eyebrow { margin: 0 0 1.15rem; color: var(--brand-yellow); font-size: .74rem; font-weight: 800; letter-spacing: .19em; }
h1 { min-height: 2.08em; margin: 0; color: #fff; font-family: var(--font-heading); font-size: clamp(2.9rem, 5.5vw, 5rem); font-weight: 620; font-stretch: 88%; letter-spacing: -.038em; line-height: 1.02; text-wrap: balance; }
h1 > span:first-child, .typed-line { display: block; }
.typed-line { min-height: 1.02em; color: #a9d8b9; }
.typed-text { display: inline; }
.typed-cursor { display: inline-block; margin-left: .08em; color: var(--brand-yellow); font-weight: 450; animation: blink .9s steps(2, start) infinite; }
.hero-description { max-width: 520px; margin: 1.35rem 0 1.8rem; color: rgba(255,255,255,.86); font-size: clamp(1rem, 2vw, 1.18rem); line-height: 1.55; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1rem 1.4rem; }
.hero-actions .btn { min-height: 56px; gap: .7rem; text-decoration: none; }
.hero-whatsapp { display: inline-flex; align-items: center; gap: .6rem; min-height: 48px; color: #fff; font-weight: 800; text-decoration: none; }
.hero-whatsapp i { color: #4ade80; font-size: 1.2rem; }
.hero-whatsapp:hover { color: var(--brand-yellow); }
.hero-proof { display: flex; flex-wrap: wrap; gap: .75rem 1.4rem; margin-top: 2.4rem; color: rgba(255,255,255,.76); font-size: .82rem; font-weight: 700; }
.hero-proof span { display: inline-flex; align-items: center; gap: .45rem; }
.hero-proof i { color: #a9d8b9; }
.hero-scroll { position: absolute; z-index: 1; right: 3rem; bottom: 2rem; display: flex; align-items: center; gap: .65rem; color: rgba(255,255,255,.64); font-size: .7rem; font-weight: 800; letter-spacing: .15em; text-decoration: none; text-transform: uppercase; }
.hero-scroll i { animation: scroll-bob 1.6s ease-in-out infinite; }
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
@keyframes scroll-bob { 50% { transform: translateY(5px); } }
@media (max-width: 767.98px) {
  .hero-section { min-height: calc(100svh - 74px); background-position: 48% center; }
  .hero-shade { background: linear-gradient(0deg, rgba(3,24,15,.82) 0%, rgba(3,24,15,.52) 62%, rgba(3,24,15,.18) 100%); }
  .hero-copy { padding: 4rem 0 3.5rem; }
  h1 { min-height: 2.15em; font-size: clamp(2.65rem, 11.5vw, 3.7rem); }
  .hero-actions { align-items: stretch; }
  .hero-actions .btn { width: 100%; }
  .hero-whatsapp { justify-content: center; }
  .hero-proof { gap: .65rem 1rem; margin-top: 1.7rem; }
  .hero-proof span { width: calc(50% - .5rem); font-size: .74rem; }
  .hero-proof span:last-child { width: 100%; }
  .hero-scroll { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-scroll i, .typed-cursor { animation: none; }
  .typed-cursor { display: none; }
}
</style>
