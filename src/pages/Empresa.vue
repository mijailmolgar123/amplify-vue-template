<template>
  <main class="page page-empresa">
    <section class="empresa-hero text-white">
      <div class="container">
        <div class="row g-4 align-items-center">
          <div class="col-lg-7">
            <p class="eyebrow text-uppercase mb-2">Sobre Segurimax</p>
            <h1 class="display-5 fw-bold mb-3">Soluciones confiables para operaciones críticas</h1>
            <p class="lead text-white-50 mb-4">
              Somos un aliado integral para las industrias que no pueden detenerse. Integramos
              experiencia operativa, ingeniería comercial y un portafolio completo en seguridad,
              protección personal y soporte logístico en todo el país.
            </p>
            <div class="hero-stats d-flex flex-wrap gap-4">
              <div v-for="stat in heroStats" :key="stat.label">
                <span class="stat-value">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="hero-panel shadow-lg">
              <h2 class="h4 fw-bold text-white mb-3">Nuestra promesa</h2>
              <p class="text-white-50 mb-4">
                Entregamos proyectos llave en mano, inventario disponible y soporte técnico
                especializado para minería, construcción, energía, industria y sector público.
              </p>
              <ul class="list-unstyled text-white-50 small mb-4">
                <li>• Consultoría y especificación según normativa.</li>
                <li>• Integración con programas de SST y ESG.</li>
                <li>• Cobertura nacional y logística just-in-time.</li>
              </ul>
              <button class="btn btn-cta" @click="goToContact">Conversemos</button>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-overlay" aria-hidden="true"></div>
    </section>

    <section class="empresa-sectors" id="sectores">
      <div class="container">
        <header class="section-header text-center mb-4">
          <p class="eyebrow text-white text-uppercase mb-2">Sectores que atendemos</p>
          <h2 class="fw-bold text-white">Expertos en las industrias más exigentes</h2>
          <p class="text-white-50 mb-0">
            Adaptamos nuestras líneas de producto y servicios al contexto operativo y normativo de
            cada sector.
          </p>
        </header>
        <div class="row g-4 justify-content-center">
          <div v-for="sector in sectors" :key="sector.id" class="col-6 col-lg-2 col-md-4">
            <div class="sector-card text-center">
              <span class="sector-icon" v-html="sectorIcons[sector.icon]" aria-hidden="true"></span>
              <h3 class="sector-title">{{ sector.title }}</h3>
              <p class="sector-desc">{{ sector.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="empresa-values">
      <div class="container">
        <div class="row g-4">
          <article v-for="value in values" :key="value.title" class="col-12 col-md-4">
            <div class="value-card h-100">
              <div class="value-icon">{{ value.icon }}</div>
              <h3 class="h5 fw-semibold mb-2 text-white">{{ value.title }}</h3>
              <p class="text-white-50 mb-0">{{ value.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const heroStats = [
  { label: 'Años atendiendo operaciones críticas', value: '15+' },
  { label: 'Cobertura nacional', value: '24/7' },
  { label: 'Líneas de producto', value: '10+' },
]

const sectors = [
  { id: 'mineria', title: 'Minería', description: 'Operaciones a tajo abierto y socavón.', icon: 'mining' },
  { id: 'construccion', title: 'Construcción', description: 'Obras civiles, EPC y campamentos.', icon: 'construction' },
  { id: 'energia', title: 'Energía', description: 'Generación, transmisión y utilities.', icon: 'energy' },
  { id: 'industria', title: 'Industria', description: 'Procesos, manufactura y logística.', icon: 'industry' },
  { id: 'estado', title: 'Estado', description: 'Instituciones públicas y defensa civil.', icon: 'state' },
]

const values = [
  {
    icon: '🛡️',
    title: 'Compromiso con la seguridad',
    description: 'Nos alineamos con los planes de SST para garantizar cumplimiento legal y estándares internacionales.',
  },
  {
    icon: '🤝',
    title: 'Acompañamiento consultivo',
    description: 'Integración con tus equipos de compras, logística y operaciones para asegurar continuidad.',
  },
  {
    icon: '🚚',
    title: 'Logística ágil',
    description: 'Inventario disponible y entregas inmediatas gracias a nuestra red en Lima y provincias.',
  },
]

const sectorIcons: Record<string, string> = {
  mining: `<svg viewBox="0 0 64 64" role="presentation"><rect x="4" y="32" width="40" height="18" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="3"/><rect x="10" y="26" width="30" height="10" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="14" cy="54" r="6" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="42" cy="54" r="6" fill="none" stroke="currentColor" stroke-width="3"/><path d="M44 38h14l6 8v4H44z" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
  construction: `<svg viewBox="0 0 64 64" role="presentation"><rect x="4" y="26" width="22" height="30" fill="none" stroke="currentColor" stroke-width="3"/><rect x="12" y="12" width="10" height="14" fill="none" stroke="currentColor" stroke-width="3"/><path d="M28 38h32v18H28z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M44 18v20" stroke="currentColor" stroke-width="3"/><path d="M52 14l-8-6-8 6" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
  energy: `<svg viewBox="0 0 64 64" role="presentation"><circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" stroke-width="3"/><path d="M36 8 20 34h10l-6 22 20-30H32z" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
  industry: `<svg viewBox="0 0 64 64" role="presentation"><rect x="6" y="32" width="14" height="22" fill="none" stroke="currentColor" stroke-width="3"/><path d="M20 32l10-8v8l10-8v30H20z" fill="none" stroke="currentColor" stroke-width="3"/><rect x="40" y="28" width="18" height="26" fill="none" stroke="currentColor" stroke-width="3"/><path d="M14 18h6v10h-6zM44 14h6v12h-6z" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
  state: `<svg viewBox="0 0 64 64" role="presentation"><rect x="8" y="28" width="48" height="24" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="3"/><path d="M4 52h56" stroke="currentColor" stroke-width="3"/><path d="M20 28V16h24v12" fill="none" stroke="currentColor" stroke-width="3"/><path d="M28 12h8l2-6h-12z" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
}

function goToContact() {
  router.push('/contacto')
}
</script>

<style scoped>
:global(body) {
  background-color: #04100b;
}
.page-empresa {
  background: #04100b;
  color: #dfeee6;
}
.eyebrow {
  letter-spacing: 0.18em;
  font-size: 0.78rem;
}
.empresa-hero {
  position: relative;
  padding: 4.5rem 0 3rem;
  background: linear-gradient(135deg, #031208, #0a2c1b);
  overflow: hidden;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(79, 239, 177, 0.2), transparent 60%);
}
.hero-stats .stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #8fffd1;
  display: block;
}
.hero-stats .stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  display: block;
}
.hero-panel {
  background: rgba(5, 22, 15, 0.85);
  border-radius: 1.5rem;
  padding: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.btn-cta {
  background: linear-gradient(120deg, #4de894, #7cfcc0);
  color: #052313;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.8rem;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(77, 232, 148, 0.35);
}
.empresa-sectors {
  padding: 4rem 0;
  background: #060d0a;
}
.section-header h2 {
  font-family: 'Montserrat', 'Segoe UI', sans-serif;
  letter-spacing: 0.01em;
}
.sector-card {
  background: #0d1511;
  padding: 1.5rem 1rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  height: 100%;
}
.sector-icon {
  display: inline-flex;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 0.85rem;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(79, 239, 177, 0.2), rgba(79, 239, 177, 0.04));
  align-items: center;
  justify-content: center;
}
.sector-icon svg {
  width: 42px;
  height: 42px;
}
.sector-title {
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
  color: #eaf4ee;
  letter-spacing: 0.05em;
  margin-bottom: 0.35rem;
}
.sector-desc {
  font-size: 0.9rem;
  color: #b8cac0;
}
.empresa-values {
  background: linear-gradient(135deg, #05140d, #0b2418);
  padding: 4rem 0;
}
.value-card {
  background: rgba(7, 24, 16, 0.95);
  border-radius: 1.25rem;
  padding: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
}
.value-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}
@media (max-width: 767.98px) {
  .sector-card {
    text-align: left;
  }
}
</style>
