<template>
  <main class="empresa-page">
    <section class="empresa-hero">
      <div class="container empresa-hero__inner">
        <div>
          <p class="section-kicker">SEGURIMAX PERÚ</p>
          <h1>Abastecimiento industrial, sin vueltas.</h1>
          <p>
            Reunimos EPP, protección colectiva y suministros operativos en una sola solicitud.
          </p>
          <div class="empresa-actions">
            <RouterLink to="/productos" class="btn btn-pill btn-pill-primary">Ver productos</RouterLink>
            <RouterLink to="/contacto" class="text-link">Hablar con ventas <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></RouterLink>
          </div>
        </div>
        <dl class="catalog-facts" aria-label="Información del catálogo">
          <div>
            <dt>{{ catalogProducts.length }}</dt>
            <dd>productos publicados</dd>
          </div>
          <div>
            <dt>{{ catalogBrands.length }}</dt>
            <dd>marcas destacadas</dd>
          </div>
          <div>
            <dt>2</dt>
            <dd>canales de cotización</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="empresa-service">
      <div class="container service-layout">
        <div class="service-intro">
          <p class="section-kicker">CÓMO TE ATENDEMOS</p>
          <h2>Una lista clara para compras y operaciones.</h2>
          <p>El catálogo concentra la información necesaria para preparar un requerimiento inicial.</p>
        </div>
        <ol class="service-steps">
          <li v-for="(step, index) in serviceSteps" :key="step.title">
            <span>0{{ index + 1 }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="empresa-lines">
      <div class="container">
        <header class="section-heading-row">
          <div>
            <p class="section-kicker">LO QUE PUEDES COTIZAR</p>
            <h2>Líneas publicadas en el catálogo.</h2>
          </div>
          <RouterLink to="/productos">Explorar catálogo <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></RouterLink>
        </header>
        <div class="line-list">
          <RouterLink
            v-for="line in mainLines"
            :key="line.id"
            :to="line.to"
            class="line-item"
          >
            <i :class="line.icon" aria-hidden="true"></i>
            <span>
              <strong>{{ line.title }}</strong>
              <small>{{ line.text }}</small>
            </span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="empresa-docs">
      <div class="container docs-layout">
        <div>
          <p class="section-kicker">DOCUMENTACIÓN DISPONIBLE</p>
          <h2>Homologaciones mostradas por Segurimax.</h2>
          <p>Consulta con ventas el alcance y vigencia aplicable antes de incorporarlas a tu proceso.</p>
        </div>
        <div class="docs-logos">
          <figure v-for="document in documents" :key="document.alt">
            <img :src="document.src" :alt="document.alt" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <section class="empresa-cta">
      <div class="container empresa-cta__inner">
        <div>
          <p class="section-kicker">EMPECEMOS</p>
          <h2>Cuéntanos qué necesita tu operación.</h2>
        </div>
        <RouterLink to="/contacto" class="btn btn-pill btn-pill-primary">Contactar a ventas</RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { catalogBrands, catalogProducts } from '@/data/catalog'
import sgsLogo from '@/assets/logo_sgs-2.jpg'
import hodelpeLogo from '@/assets/LOGOTIPO_DE_HOMOLOGADO_-_CORPORACION_HODELPE_SAC.jpg'

const serviceSteps = [
  { title: 'Explora', text: 'Filtra por tipo de protección, categoría o marca.' },
  { title: 'Agrupa', text: 'Agrega productos y define cantidades u observaciones.' },
  { title: 'Envía', text: 'Comparte la solicitud por WhatsApp o correo.' },
]

const mainLines = [
  { id: 'epp', title: 'Protección personal', text: 'Cabeza, manos, respiración, vista y oído.', icon: 'fa-solid fa-helmet-safety', to: { path: '/productos', query: { categoria: 'epps' } } },
  { id: 'ropa', title: 'Ropa industrial', text: 'Prendas para campo y alta visibilidad.', icon: 'fa-solid fa-shirt', to: { path: '/productos', query: { categoria: 'ropa-industrial' } } },
  { id: 'colectiva', title: 'Protección colectiva', text: 'Señalización y control de áreas.', icon: 'fa-solid fa-road-barrier', to: { path: '/productos', query: { categoria: 'epcs' } } },
]

const documents = [
  { src: sgsLogo, alt: 'Documento de homologación SGS' },
  { src: hodelpeLogo, alt: 'Documento de homologación Corporación Hodelpe' },
]
</script>

<style scoped>
.empresa-page { color: var(--brand-ink); background: #fff; }
.empresa-hero { padding: clamp(4.5rem, 9vw, 8.5rem) 0; color: #fff; background: linear-gradient(115deg, rgba(4,29,19,.96), rgba(8,43,29,.82)), url('@/assets/fondo-clean.png') center / cover; }
.empresa-hero__inner { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(320px, .65fr); align-items: end; gap: clamp(3rem, 8vw, 8rem); }
.empresa-hero h1 { max-width: 800px; margin: .5rem 0 1rem; color: #fff; font-family: var(--font-heading); font-size: clamp(2.7rem, 6vw, 5.5rem); font-weight: 620; letter-spacing: -.035em; line-height: 1.02; }
.empresa-hero__inner > div > p:last-of-type { max-width: 620px; color: rgba(255,255,255,.74); font-size: 1.08rem; }
.empresa-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1.3rem; margin-top: 2rem; }
.text-link { display: inline-flex; align-items: center; gap: .55rem; color: #fff; font-weight: 800; text-decoration: none; }
.catalog-facts { display: grid; margin: 0; border-top: 1px solid rgba(255,255,255,.24); }
.catalog-facts div { display: grid; grid-template-columns: 88px 1fr; align-items: baseline; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,.16); }
.catalog-facts dt { color: var(--brand-yellow); font-size: 2rem; font-weight: 800; }
.catalog-facts dd { margin: 0; color: rgba(255,255,255,.7); }
.empresa-service { padding: clamp(4.5rem, 8vw, 8rem) 0; background: var(--brand-ivory); }
.service-layout { display: grid; grid-template-columns: minmax(0, .8fr) minmax(420px, 1.2fr); gap: clamp(3rem, 9vw, 9rem); }
.service-intro h2, .section-heading-row h2, .empresa-docs h2 { margin: .45rem 0 1rem; color: var(--brand-ink); font-family: var(--font-heading); font-size: clamp(2rem, 4.5vw, 3.8rem); font-weight: 620; letter-spacing: -.03em; line-height: 1.05; }
.service-intro > p:last-child, .empresa-docs p:last-child { color: #657168; }
.service-steps { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(8,43,29,.16); }
.service-steps li { display: grid; grid-template-columns: 52px 1fr; gap: 1.2rem; padding: 1.35rem 0; border-bottom: 1px solid rgba(8,43,29,.16); }
.service-steps > li > span { color: var(--brand-green); font-size: .75rem; font-weight: 900; letter-spacing: .1em; }
.service-steps h3 { margin: 0 0 .25rem; color: var(--brand-ink); font-size: 1.05rem; }
.service-steps p { margin: 0; color: #6a756e; }
.empresa-lines { padding: clamp(4.5rem, 8vw, 7rem) 0; }
.section-heading-row { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2.2rem; }
.section-heading-row h2 { margin-bottom: 0; }
.section-heading-row > a { display: inline-flex; align-items: center; gap: .55rem; padding-bottom: .25rem; border-bottom: 2px solid var(--brand-yellow); color: var(--brand-ink); font-weight: 800; text-decoration: none; white-space: nowrap; }
.line-list { display: grid; border-top: 1px solid rgba(8,43,29,.15); }
.line-item { display: grid; grid-template-columns: 54px 1fr auto; align-items: center; gap: 1rem; min-height: 105px; padding: 1rem; border-bottom: 1px solid rgba(8,43,29,.15); color: var(--brand-ink); text-decoration: none; transition: color .2s ease, background .2s ease; }
.line-item:hover { color: #fff; background: var(--brand-forest); }
.line-item > i:first-child { color: var(--brand-green); font-size: 1.35rem; }
.line-item:hover > i { color: var(--brand-yellow); }
.line-item span { display: grid; }
.line-item strong { font-size: 1.05rem; }
.line-item small { color: #748078; }
.line-item:hover small { color: rgba(255,255,255,.65); }
.empresa-docs { padding: clamp(4.5rem, 8vw, 7rem) 0; background: var(--brand-sage); }
.docs-layout { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: clamp(3rem, 8vw, 8rem); }
.docs-logos { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.docs-logos figure { min-height: 190px; display: grid; place-items: center; margin: 0; padding: 1.2rem; border-radius: 12px; background: #fff; }
.docs-logos img { width: 100%; height: 150px; object-fit: contain; }
.empresa-cta { padding: 3.5rem 0; color: #fff; background: var(--brand-forest-deep); }
.empresa-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
.empresa-cta h2 { margin: .35rem 0 0; color: #fff; font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 620; }
@media (max-width: 991.98px) {
  .empresa-hero__inner, .service-layout, .docs-layout { grid-template-columns: 1fr; }
  .catalog-facts { max-width: 520px; }
}
@media (max-width: 767.98px) {
  .section-heading-row, .empresa-cta__inner { align-items: flex-start; flex-direction: column; }
  .docs-logos { grid-template-columns: 1fr; }
  .empresa-cta__inner .btn { width: 100%; }
}
</style>
