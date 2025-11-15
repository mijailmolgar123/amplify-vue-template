<template>
  <section id="inicio" class="hero-section">
    <div class="container position-relative">
      <div class="hero-copy mx-auto text-center">
        <p class="hero-eyebrow text-uppercase">Confianza operativa para tu equipo de trabajo</p>
        <h1 class="hero-title fw-bold">
          Protección Industrial de
          <span class="typed-text">{{ typedText }}</span>
          <span class="typed-cursor">|</span>
        </h1>
        <p class="lead hero-description">
          Segurimax es líder en implementos de seguridad industrial con más de 5 años de experiencia.
        </p>
        <div class="hero-buttons d-flex flex-wrap justify-content-center gap-3">
          <a href="#destacados" class="btn btn-pill btn-pill-primary">Ver Catálogo</a>
          <button class="btn btn-pill btn-pill-outline-light" @click="scrollToContacto">Solicitar Cotización</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const typedText = ref('Clase Mundial')
const phrases = ['Clase Mundial', 'Calidad Certificada', 'Máxima Confianza']
let charIndex = 0
let phraseIndex = 0
let typing = true
let timer: ReturnType<typeof setTimeout> | undefined

function typeLoop() {
  const phrase = phrases[phraseIndex]

  if (typing) {
    typedText.value = phrase.slice(0, charIndex + 1)
    charIndex++
    if (charIndex === phrase.length) {
      typing = false
      timer = setTimeout(typeLoop, 1500)
      return
    }
  } else {
    typedText.value = phrase.slice(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      typing = true
      phraseIndex = (phraseIndex + 1) % phrases.length
    }
  }

  const delay = typing ? 110 : 60
  timer = setTimeout(typeLoop, delay)
}

function scrollToContacto() {
  const el = document.getElementById('contacto')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  typeLoop()
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: var(--font-body, 'Wix Madefor Text', sans-serif);
  color: #fff;
  background:
    linear-gradient(120deg, rgba(1, 19, 8, 0.8), rgba(3, 43, 24, 0.6)),
    url('@/assets/fondo.png') center/cover no-repeat;
  background-attachment: scroll, fixed;
}
.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.8));
  mix-blend-mode: lighten;
  pointer-events: none;
}
.hero-copy {
  position: relative;
  z-index: 1;
  max-width: 720px;
  padding: 4rem 1rem 3rem;
}
.hero-eyebrow {
  letter-spacing: 0.3em;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 1rem;
}
.hero-title {
  font-size: clamp(2.5rem, 7vw, 3.8rem);
  line-height: 1.2;
  font-family: var(--font-heading, 'Alfa Slab One', serif);
}
.typed-text {
  color: var(--brand-green, #47f48a);
  display: inline-block;
  min-width: 8ch;
}
.typed-cursor {
  display: inline-block;
  margin-left: 0.2rem;
  animation: blink 1s steps(2, start) infinite;
}
.hero-description {
  color: rgba(255, 255, 255, 0.86);
  font-size: 1.1rem;
  margin: 1.5rem auto 2.5rem;
}
.hero-buttons .btn {
  font-weight: 600;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@media (max-width: 991.98px) {
  .hero-section {
    padding-top: 4rem;
    background-attachment: scroll, scroll;
  }
  .hero-copy {
    padding-top: 5rem;
  }
}
</style>
