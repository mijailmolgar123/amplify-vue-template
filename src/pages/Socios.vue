<template>
  <main class="page page-socios">
    <section class="socios-hero text-white">
      <div class="container">
        <div class="row g-4 align-items-center">
          <div class="col-lg-7">
            <p class="eyebrow text-uppercase mb-2">Alianzas que potencian resultados</p>
            <h1 class="display-5 fw-bold mb-3">Socios estratégicos para cada industria</h1>
            <p class="lead text-white-50 mb-4">
              Trabajamos junto a fabricantes líderes en seguridad industrial, protección
              personal, detección y herramientas certificadas. Estas alianzas garantizan
              disponibilidad inmediata, soporte especializado y cumplimiento normativo en los
              sectores más exigentes del país.
            </p>
            <div class="hero-actions d-flex flex-wrap gap-3">
              <button class="btn btn-cta" @click="goToContact">Hablar con un asesor</button>
              <a class="btn btn-outline-light" href="#partners">Ver marcas aliadas</a>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="hero-panel shadow-lg">
              <p class="text-uppercase text-white-50 mb-2">Indicadores clave</p>
              <ul class="hero-stats list-unstyled mb-0">
                <li v-for="stat in heroStats" :key="stat.label">
                  <span class="label">{{ stat.label }}</span>
                  <span class="value">{{ stat.value }}</span>
                </li>
              </ul>
              <div class="badge-soft mt-3">
                Certificaciones EN, NFPA, ANSI & soluciones listas para ESG.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-overlay" aria-hidden="true"></div>
    </section>

    <section class="socios-partners" id="partners">
      <div class="container">
        <div class="row g-4 align-items-center">
          <div class="col-lg-6">
            <h2 class="fw-bold mb-3 text-white">Nuestros socios estratégicos</h2>
            <p class="text-white-50 mb-4">
              Colaboramos con marcas reconocidas a nivel nacional e internacional. Juntas nos
              permiten entregar productos certificados, soporte técnico especializado y proyectos
              llave en mano para minería, industria, energía, construcción y sector público.
            </p>
            <ul class="list-unstyled text-white-50 small mb-4">
              <li>&bull; Cumplimiento normativo y documentación actualizada.</li>
              <li>&bull; Soporte de ingeniería y capacitaciones de marca.</li>
              <li>&bull; Inventario local y logística ágil en todo el país.</li>
            </ul>
            <button class="btn btn-outline-light" @click="goToContact">Solicitar catálogo</button>
          </div>
          <div class="col-lg-6">
            <div class="partner-grid">
              <div
                v-for="logo in partnerLogos"
                :key="logo.name"
                class="partner-card d-flex align-items-center justify-content-center"
              >
                <img :src="logo.src" :alt="logo.name" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="socios-cta text-center text-white">
      <div class="container">
        <h2 class="fw-bold mb-3">¿Listo para sumar tu marca al ecosistema Segurimax?</h2>
        <p class="text-white-50 mb-4">
          Diseñamos planes conjuntos de introducción, marketing y servicio técnico para que tu
          tecnología llegue a más operaciones críticas.
        </p>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <button class="btn btn-light text-dark" @click="goToContact">Unirme como socio</button>
          <a class="btn btn-outline-light" href="mailto:ventas@segurimax-peru.com">
            Escribir a alianzas
          </a>
        </div>
      </div>
      <div class="cta-overlay" aria-hidden="true"></div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const partnerLogos = [
  { name: '3M', src: new URL('../assets/socios/3m-logo.png', import.meta.url).href },
  { name: 'MSA', src: new URL('../assets/socios/msa-logo.png', import.meta.url).href },
  { name: 'Steelpro', src: new URL('../assets/socios/steelpro-logo.png', import.meta.url).href },
  { name: 'Clute', src: new URL('../assets/socios/clute-logo.png', import.meta.url).href },
  { name: 'Delta Plus', src: new URL('../assets/socios/delta-plus-logo.png', import.meta.url).href },
  { name: 'Ansell', src: new URL('../assets/socios/ansell-logo.png', import.meta.url).href },
]

const heroStats = [
  { label: 'Marcas homologadas', value: `${partnerLogos.length}+` },
  { label: 'Años de alianzas', value: '15+' },
  { label: 'Certificaciones internacionales', value: '10+' },
]

function goToContact() {
  router.push('/contacto')
}
</script>

<style scoped>
:global(body) {
  background: #050907;
}
.page-socios {
  background: #050907;
  color: #d9e7df;
}
.eyebrow {
  letter-spacing: 0.15em;
  font-size: 0.78rem;
}
.socios-hero {
  position: relative;
  padding: 4.5rem 0 3rem;
  background: linear-gradient(135deg, #03150b, #0a2c1b);
  overflow: hidden;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(79, 239, 177, 0.25), transparent 55%);
}
.hero-panel {
  background: rgba(5, 28, 18, 0.85);
  border-radius: 1.5rem;
  padding: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}
.hero-stats li {
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.hero-stats li:last-child {
  border-bottom: none;
}
.hero-stats .label {
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.65);
}
.hero-stats .value {
  font-size: 1.5rem;
  font-weight: 700;
}
.badge-soft {
  background: rgba(79, 239, 177, 0.15);
  color: #bafedb;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
}
.btn-cta {
  background: linear-gradient(120deg, #4de894, #7cfcc0);
  color: #04170d;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  padding: 0.65rem 1.9rem;
  box-shadow: 0 12px 35px rgba(77, 232, 148, 0.35);
}
.socios-partners {
  padding: 4rem 0;
  background: linear-gradient(135deg, #030907, #041b11);
}
.partner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  background: rgba(15, 25, 19, 0.85);
  border-radius: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.partner-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 0.75rem;
  min-height: 90px;
}
.partner-card img {
  max-width: 90%;
  opacity: 0.95;
}
.socios-cta {
  position: relative;
  padding: 4rem 0;
  background: linear-gradient(135deg, #062916, #0c3e26);
  overflow: hidden;
}
.cta-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.15), transparent 45%);
}
.socios-cta .btn {
  border-radius: 999px;
  min-width: 220px;
  font-weight: 600;
}
@media (max-width: 991.98px) {
  .hero-panel {
    margin-top: 1rem;
  }
}
@media (max-width: 767.98px) {
  .hero-panel {
    margin-top: 2rem;
  }
}
</style>
