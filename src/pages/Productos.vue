<template>
  <main class="page page-productos">
    <section class="productos-hero text-white">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <p class="eyebrow text-uppercase mb-2">Portafolio integral de seguridad</p>
            <h1 class="display-5 fw-bold mb-3">
              Explora nuestras soluciones y arma tu ecosistema de seguridad
            </h1>
            <p class="lead text-white-50 mb-4">
              Plantilla pensada para destacar tus líneas de productos, con buscador inteligente,
              filtros por categoría y módulos listos para ampliar con tu catálogo real.
            </p>
            <div class="hero-actions d-flex flex-wrap gap-2">
              <button class="btn btn-cta" @click="scrollToResultados">Ver catálogo</button>
              <button class="btn btn-outline-light" @click="resetFilters">
                Restablecer filtros
              </button>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="hero-panel shadow-lg">
              <div class="hero-panel__header">
                <p class="mb-0 fw-semibold">Continuidad operacional</p>
                <small class="text-white-50">Actualizado {{ currentPeriod }}</small>
              </div>
              <ul class="list-unstyled hero-panel__list">
                <li v-for="stat in heroStats" :key="stat.label">
                  <span class="label text-white-50">{{ stat.label }}</span>
                  <span class="value">{{ stat.value }}</span>
                </li>
              </ul>
              <div class="d-flex align-items-center gap-3 mt-3">
                <div class="badge-soft">Plantilla dinámica</div>
                <small class="text-white-50"
                  >Diseñada para responsive + contenido CMS o API.</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-grid-overlay" aria-hidden="true"></div>
    </section>

    <section class="productos-controls" id="buscador">
      <div class="container">
        <div class="filters-card shadow-sm">
          <div class="row g-3 align-items-center">
            <div class="col-12 col-lg-5">
              <label class="form-label fw-semibold text-muted">Buscar producto</label>
              <div class="search-input">
                <span class="search-icon" aria-hidden="true">🔍</span>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control"
                  placeholder="CCTV, detectores, control de acceso..."
                />
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <label class="form-label fw-semibold text-muted">Etiquetas</label>
              <select v-model="selectedTag" class="form-select">
                <option v-for="tag in tagFilters" :key="tag.id" :value="tag.id">
                  {{ tag.label }}
                </option>
              </select>
            </div>
            <div class="col-6 col-lg-2">
              <label class="form-label fw-semibold text-muted">Disponibilidad</label>
              <select v-model="availabilityFilter" class="form-select">
                <option value="all">Todas</option>
                <option value="stock">En stock</option>
                <option value="preorder">Bajo pedido</option>
              </select>
            </div>
            <div class="col-12 col-lg-2">
              <label class="form-label fw-semibold text-muted">Ordenar</label>
              <select v-model="sortMode" class="form-select">
                <option value="featured">Destacados primero</option>
                <option value="recent">Más recientes</option>
              </select>
            </div>
          </div>

          <div class="category-pills mt-4">
            <button
              v-for="category in categoryFilters"
              :key="category.id"
              class="pill"
              :class="{ active: selectedCategory === category.id }"
              type="button"
              @click="selectCategory(category.id)"
            >
              <span class="pill__label">{{ category.label }}</span>
              <small class="pill__desc">{{ category.description }}</small>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="products-grid-section" id="resultados">
      <div class="container">
        <header
          class="section-header d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3"
        >
          <div>
            <p class="eyebrow text-uppercase text-muted mb-1">Catálogo dinámico</p>
            <h2 class="fw-bold mb-1">Resultados del buscador</h2>
            <small class="text-muted"
              >Mostrando {{ filteredProducts.length }} de {{ products.length }} soluciones.</small
            >
          </div>
          <div class="d-flex gap-2">
            <span class="badge-outline">{{ activeFiltersLabel }}</span>
            <button class="btn btn-link p-0 text-decoration-none" @click="resetFilters">
              Limpiar filtros
            </button>
          </div>
        </header>

        <div v-if="filteredProducts.length" class="product-grid mt-4">
          <article
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
            :class="{ 'is-featured': product.featured }"
          >
            <div class="product-card__badge" v-if="product.status">
              {{ product.status }}
            </div>
            <div
              class="product-card__media"
              :class="{ 'has-image': !!product.image }"
              :style="product.image ? undefined : { background: product.coverGradient }"
            >
              <img
                v-if="product.image"
                :src="product.image"
                class="product-card__image"
                :alt="`Imagen de ${product.name}`"
                loading="lazy"
              />
              <span v-else class="media-icon">{{ product.icon }}</span>
            </div>
            <div class="product-card__body">
              <p class="product-card__category">
                {{ getCategoryLabel(product.category) }} · SLA {{ product.slaHours }}h
              </p>
              <h3 class="product-title h5 mb-2">{{ product.name }}</h3>
              <p class="text-muted mb-3">{{ product.excerpt }}</p>
              <ul class="product-features list-inline small mb-3">
                <li v-for="feature in product.tags" :key="feature" class="list-inline-item">
                  {{ formatTag(feature) }}
                </li>
              </ul>
              <div class="product-meta">
                <span class="availability" :class="`state-${product.availability}`">
                  {{ product.availability === 'stock' ? 'En stock' : 'Bajo pedido' }}
                </span>
                <span class="rating">★ {{ product.rating.toFixed(1) }}</span>
              </div>
            </div>
            <div class="product-card__actions">
              <small class="text-muted">Implementación estimada {{ product.leadTime }}</small>
              <div class="d-flex gap-2 mt-2">
                <button class="btn btn-outline-success btn-sm flex-grow-1">Ver ficha</button>
                <button
                  class="btn btn-success btn-sm flex-grow-1"
                  type="button"
                  @click="contactViaWhatsApp(product)"
                >
                  Solicitar cotización
                </button>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="empty-state text-center">
          <div class="empty-state__badge">Sin coincidencias</div>
          <p class="h5 fw-semibold my-3">
            Ajusta el buscador para descubrir más soluciones.
          </p>
          <p class="text-muted mb-4">
            Puedes volver a mostrar todas las líneas limpiando filtros o cambiando la categoría.
          </p>
          <button class="btn btn-dark" @click="resetFilters">Volver a ver el catálogo</button>
        </div>
      </div>
    </section>

    <section class="solution-highlights">
      <div class="container">
        <div class="row g-4">
          <article class="col-12 col-md-4" v-for="highlight in solutionHighlights" :key="highlight.title">
            <div class="highlight-card h-100">
              <div class="highlight-icon">{{ highlight.icon }}</div>
              <h3 class="h5 fw-semibold mb-2">{{ highlight.title }}</h3>
              <p class="text-muted">{{ highlight.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="productos-cta text-center text-white">
      <div class="container">
        <p class="eyebrow text-uppercase mb-2">¿Listo para avanzar?</p>
        <h2 class="fw-bold mb-3">Integra toda tu operación con Segurimax</h2>
        <p class="text-white-50 mb-4">
          Usa esta plantilla como base y agrega tus productos reales, fichas técnicas y formularios
          de contacto para convertir visitantes en oportunidades comerciales.
        </p>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <button class="btn btn-light text-dark">Hablar con un especialista</button>
          <button class="btn btn-outline-light">Descargar catálogo PDF</button>
        </div>
      </div>
      <div class="cta-overlay" aria-hidden="true"></div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type ProductCategory = {
  id: string
  label: string
  description: string
  highlights: string[]
  gradient: string
  tone: string
  icon: string
}

type ProductCard = {
  id: number
  name: string
  category: string
  excerpt: string
  tags: string[]
  availability: 'stock' | 'preorder'
  featured: boolean
  status?: string
  rating: number
  leadTime: string
  releaseDate: string
  coverGradient: string
  icon: string
  slaHours: number
  image?: string
}

const searchQuery = ref('')
const selectedCategory = ref<'all' | string>('all')
const selectedTag = ref<'all' | string>('all')
const sortMode = ref<'featured' | 'recent'>('featured')
const availabilityFilter = ref<'all' | 'stock' | 'preorder'>('all')
const whatsappPhone = '51996665221'
const whatsappTemplate =
  'Hola, estoy interesado en recibir una cotización. Por favor, contáctenme respecto a:'

const productCategories: ProductCategory[] = [
  {
    id: 'epps',
    label: 'Equipos de Protección Personal (EPPs)',
    description: 'Cascos, guantes y respiradores certificados para riesgos industriales.',
    highlights: ['Norma ANSI/EN', 'Tallas escalables', 'Mantenimiento programado'],
    gradient: 'linear-gradient(135deg, #112b16, #23592e)',
    tone: '#b2ffc9',
    icon: '🧤',
  },
  {
    id: 'epcs',
    label: 'Equipos de Protección Comunitario (EPCs)',
    description: 'Barreras, señalización y sistemas colectivos de mitigación.',
    highlights: ['Señalética fotoluminiscente', 'Barandas modulares', 'Monitoreo continuo'],
    gradient: 'linear-gradient(135deg, #0f1f43, #1a3c7d)',
    tone: '#b9d8ff',
    icon: '🛑',
  },
  {
    id: 'especializados',
    label: 'Equipos Especializados',
    description: 'Tecnologías de intervención y soporte para entornos críticos.',
    highlights: ['Herramientas dieléctricas', 'Robots de inspección', 'Telemetría IoT'],
    gradient: 'linear-gradient(135deg, #1b0f3e, #3b1a73)',
    tone: '#dec0ff',
    icon: '⚙️',
  },
  {
    id: 'anticaidas',
    label: 'Equipos Anticaidas',
    description: 'Arneses, retráctiles y líneas de vida para trabajos en altura.',
    highlights: ['Certificación OSHA', 'Anclajes modulares', 'Capacitación onsite'],
    gradient: 'linear-gradient(135deg, #2e1007, #5a1f12)',
    tone: '#ffb5a2',
    icon: '🪢',
  },
  {
    id: 'ropa-industrial',
    label: 'Ropa Industrial',
    description: 'Uniformes ignífugos y antiestáticos personalizados por industria.',
    highlights: ['Tejidos FR', 'Bordado corporativo', 'Logística nacional'],
    gradient: 'linear-gradient(135deg, #221f05, #4e430b)',
    tone: '#ffe49a',
    icon: '👷',
  },
  {
    id: 'extintores',
    label: 'Extintores',
    description: 'Líneas portátiles y rodantes con recarga y certificación vigente.',
    highlights: ['Agentes ABC/K', 'Supervisión IoT', 'Servicio 24/7'],
    gradient: 'linear-gradient(135deg, #400a0a, #9a1b1b)',
    tone: '#ffc0c0',
    icon: '🧯',
  },
  {
    id: 'bioseguridad',
    label: 'Bioseguridad',
    description: 'Soluciones para ambientes clínicos, laboratorios y espacios corporativos.',
    highlights: ['Cabinas de flujo laminar', 'Purificación UV-C', 'Protocolos BSL'],
    gradient: 'linear-gradient(135deg, #0f3f3d, #17716c)',
    tone: '#a8fff3',
    icon: '🧪',
  },
  {
    id: 'herramientas',
    label: 'Herramientas',
    description: 'Kits industriales, dieléctricos y multipropósito para campo.',
    highlights: ['Torque calibrado', 'Acero grado naval', 'Maletas IP67'],
    gradient: 'linear-gradient(135deg, #1e1e1e, #3f3f3f)',
    tone: '#f5f5f5',
    icon: '🛠️',
  },
  {
    id: 'consumibles',
    label: 'Consumibles',
    description: 'Cartuchos, abrasivos, filtros y suministros de rotación continua.',
    highlights: ['Stock crítico asegurado', 'Picking inteligente', 'Reportes de consumo'],
    gradient: 'linear-gradient(135deg, #07231f, #126c5e)',
    tone: '#9fffe5',
    icon: '♻️',
  },
  {
    id: 'computo',
    label: 'Cómputo',
    description: 'Workstations, tablets robustas y periféricos para campo.',
    highlights: ['Grado militar', 'Soporte remoto', 'Garantía extendida'],
    gradient: 'linear-gradient(135deg, #041727, #0a3052)',
    tone: '#9fd4ff',
    icon: '💻',
  },
  {
    id: 'oficina',
    label: 'Útiles de Escritorio',
    description: 'Papelería y suministros corporativos optimizados por centro de costo.',
    highlights: ['Catálogo digital', 'Entregas 24h Lima', 'Kits por perfil'],
    gradient: 'linear-gradient(135deg, #23201c, #5b3f1d)',
    tone: '#ffdcb0',
    icon: '📝',
  },
  {
    id: 'kitchenette',
    label: 'Insumos kitchenette',
    description: 'Bebidas, descartables y utensilios para áreas de staff.',
    highlights: ['Suscripciones automáticas', 'Marcas premium', 'Gestión de inventario'],
    gradient: 'linear-gradient(135deg, #2a1307, #53240f)',
    tone: '#ffc89f',
    icon: '☕',
  },
  {
    id: 'alarmas',
    label: 'Alarmas & IoT',
    description: 'Sensores ambientales, intrusión y automatización para sitios críticos.',
    highlights: ['Sensores LoRaWAN', 'Alertas multicanal', 'Automatización HVAC'],
    gradient: 'linear-gradient(135deg, #3d0b1c, #69123a)',
    tone: '#ffc1d8',
    icon: '🚨',
  },
  {
    id: 'video-vigilancia',
    label: 'Video vigilancia 4K',
    description: 'CCTV inteligente con analítica IA, visión nocturna y monitoreo remoto.',
    highlights: ['Analítica de comportamiento', 'Integración con SOC', 'Audio disuasivo'],
    gradient: 'linear-gradient(135deg, #072716, #0b3d24)',
    tone: '#7ff5bf',
    icon: '📹',
  },
]

const tagFilters = [
  { id: 'all', label: 'Todas las etiquetas' },
  { id: 'ppe', label: 'Protección personal' },
  { id: 'colectivo', label: 'Protección colectiva' },
  { id: 'anticaidas', label: 'Líneas de vida' },
  { id: 'especializado', label: 'Uso especializado' },
  { id: 'iot', label: 'IoT / Sensores' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'cloud', label: 'Cloud / Híbrido' },
  { id: 'logistica', label: 'Logística' },
  { id: 'oficina', label: 'Oficina' },
]

// Para agregar imágenes reales (src/assets/products/<categoria>/archivo.jpg) usa:
// image: new URL('../assets/products/epps/guante-multiflex.jpg', import.meta.url).href
const products: ProductCard[] = [
  {
    id: 1,
    name: 'Guante Multiflex Cut-5 Steelpro',
    category: 'epps',
    excerpt: 'Protección anticorte nivel 5 con fibra de vidrio y máximo agarre.',
    tags: ['ppe', 'industrial'],
    availability: 'stock',
    featured: true,
    status: 'Top Venta',
    rating: 4.9,
    leadTime: '2 semanas',
    releaseDate: '2024-12-10',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '🧤',
    slaHours: 36,
    image: new URL('../assets/products/epps/guante_multiflex_cut5_steelpro.png', import.meta.url).href,
  },
  {
    id: 2,
    name: 'Lente Steelpro Top Gun',
    category: 'epps',
    excerpt: 'Antiempañante con protección UV y patillas regulables.',
    tags: ['ppe'],
    availability: 'stock',
    featured: false,
    rating: 4.6,
    leadTime: '1 semana',
    releaseDate: '2024-10-05',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '🕶️',
    slaHours: 32,
    image: new URL('../assets/products/epps/lente_steelpro_top_gun.png', import.meta.url).href,
  },
  {
    id: 3,
    name: 'Lente Steelpro Turbine',
    category: 'epps',
    excerpt: 'Diseño envolvente para maniobras en campo y laboratorios.',
    tags: ['ppe'],
    availability: 'stock',
    featured: false,
    rating: 4.5,
    leadTime: '1 semana',
    releaseDate: '2024-09-12',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '🕶️',
    slaHours: 32,
    image: new URL('../assets/products/epps/lente_steelpro_turbine.jpeg', import.meta.url).href,
  },
  {
    id: 4,
    name: 'Lente Steelpro Spy Flex',
    category: 'epps',
    excerpt: 'Protección ocular flexible con resistencia a impactos.',
    tags: ['ppe'],
    availability: 'stock',
    featured: false,
    rating: 4.4,
    leadTime: '1 semana',
    releaseDate: '2024-09-02',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '🕶️',
    slaHours: 32,
    image: new URL('../assets/products/epps/lente_steelpro_spy_flex.png', import.meta.url).href,
  },
  {
    id: 5,
    name: 'Guante VE713 Deltaplus',
    category: 'epps',
    excerpt: 'Guante multi riesgo con recubrimiento nitrilo para aceites.',
    tags: ['ppe', 'industrial'],
    availability: 'stock',
    featured: false,
    rating: 4.7,
    leadTime: '2 semanas',
    releaseDate: '2024-11-15',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '🧤',
    slaHours: 34,
    image: new URL('../assets/products/epps/guante_ve713_deltaplus.jpeg', import.meta.url).href,
  },
  {
    id: 6,
    name: 'Orejera Peltor H10A con banda 30dB 3M',
    category: 'epps',
    excerpt: 'Atenuación 30 dB con almohadillas de doble copa.',
    tags: ['ppe'],
    availability: 'stock',
    featured: true,
    rating: 4.8,
    leadTime: '2 semanas',
    releaseDate: '2024-08-22',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '🎧',
    slaHours: 30,
    image: new URL('../assets/products/epps/orejera_peltor_h10a_30db_3m.jpeg', import.meta.url).href,
  },
  {
    id: 7,
    name: 'Respirador media cara 7503 / 37083 3M',
    category: 'epps',
    excerpt: 'Silicona suave y puertos bayoneta para cartuchos dobles.',
    tags: ['ppe'],
    availability: 'stock',
    featured: true,
    status: 'Certificado NIOSH',
    rating: 4.9,
    leadTime: '2 semanas',
    releaseDate: '2025-01-05',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '😷',
    slaHours: 28,
    image: new URL('../assets/products/epps/respirador_media_cara_7503_3m.jpeg', import.meta.url).href,
  },
  {
    id: 8,
    name: 'Respirador media cara 6300 / 07026 3M',
    category: 'epps',
    excerpt: 'Modelo liviano con harness ajustable para jornadas largas.',
    tags: ['ppe'],
    availability: 'stock',
    featured: false,
    rating: 4.6,
    leadTime: '2 semanas',
    releaseDate: '2024-11-02',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '😷',
    slaHours: 28,
    image: new URL('../assets/products/epps/respirador_media_cara_6300_3m.jpeg', import.meta.url).href,
  },
  {
    id: 9,
    name: 'Casco c/blanco MSA Jockey',
    category: 'epps',
    excerpt: 'Casco dieléctrico tipo jockey con ranuras para accesorios.',
    tags: ['ppe'],
    availability: 'stock',
    featured: false,
    rating: 4.5,
    leadTime: '1 semana',
    releaseDate: '2024-10-20',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '⛑️',
    slaHours: 26,
    image: new URL('../assets/products/epps/casco_blanco_msa_jockey.jpeg', import.meta.url).href,
  },
  {
    id: 10,
    name: 'Casco c/blanco MSA Sombrero',
    category: 'epps',
    excerpt: 'Versión ala ancha para supervisión y trabajos a la intemperie.',
    tags: ['ppe'],
    availability: 'stock',
    featured: false,
    rating: 4.4,
    leadTime: '1 semana',
    releaseDate: '2024-10-05',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '⛑️',
    slaHours: 26,
    image: new URL('../assets/products/epps/casco_blanco_msa_sombrero.png', import.meta.url).href,
  },
  {
    id: 11,
    name: 'Casco c/blanco 3M Jockey',
    category: 'epps',
    excerpt: 'Casco ligero ABS compatible con protectores auditivos.',
    tags: ['ppe'],
    availability: 'stock',
    featured: false,
    rating: 4.5,
    leadTime: '1 semana',
    releaseDate: '2024-09-15',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '⛑️',
    slaHours: 26,
    image: new URL('../assets/products/epps/casco_blanco_3m_jockey.jpeg', import.meta.url).href,
  },
  {
    id: 12,
    name: 'Casco c/blanco Portwest PS53 Rapel',
    category: 'epps',
    excerpt: 'Casco tipo escalada con barboquejo y ventilación lateral.',
    tags: ['ppe', 'anticaidas'],
    availability: 'stock',
    featured: true,
    rating: 4.7,
    leadTime: '2 semanas',
    releaseDate: '2024-08-08',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '🪖',
    slaHours: 30,
    image: new URL('../assets/products/epps/casco_blanco_portwest_ps53_rapel.jpg', import.meta.url).href,
  },
  {
    id: 13,
    name: 'Casco c/amarillo Masthers Jockey',
    category: 'epps',
    excerpt: 'Color alta visibilidad para cuadrillas y visitantes.',
    tags: ['ppe'],
    availability: 'stock',
    featured: false,
    rating: 4.3,
    leadTime: '1 semana',
    releaseDate: '2024-09-28',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '⛑️',
    slaHours: 26,
    image: new URL('../assets/products/epps/casco_amarillo_masthers_jockey.jpg', import.meta.url).href,
  },
  {
    id: 14,
    name: 'Casco c/azul Forte Steelpro Jockey',
    category: 'epps',
    excerpt: 'Favorece identificación por áreas y roles.',
    tags: ['ppe'],
    availability: 'stock',
    featured: false,
    rating: 4.3,
    leadTime: '1 semana',
    releaseDate: '2024-09-25',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '⛑️',
    slaHours: 26,
    image: new URL('../assets/products/epps/casco_azul_forte_steelpro_jockey.jpeg', import.meta.url).href,
  },
  {
    id: 15,
    name: 'Guante hilo puntos PVC Clute estándar',
    category: 'epps',
    excerpt: 'Guante tejido con puntos PVC para agarre ligero.',
    tags: ['ppe'],
    availability: 'stock',
    featured: false,
    rating: 4.2,
    leadTime: '1 semana',
    releaseDate: '2024-07-30',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '🧤',
    slaHours: 24,
    image: new URL('../assets/products/epps/guante_hilo_pvc_clute.jpg', import.meta.url).href,
  },
  {
    id: 16,
    name: 'Guante G-40 Nitrilo Kleenguard',
    category: 'epps',
    excerpt: 'Resistencia química intermedia para procesos industriales.',
    tags: ['ppe', 'industrial'],
    availability: 'stock',
    featured: false,
    rating: 4.6,
    leadTime: '2 semanas',
    releaseDate: '2024-08-18',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '🧤',
    slaHours: 30,
    image: new URL('../assets/products/epps/guante_nitrilo_g40_kleenguard.png', import.meta.url).href,
  },
  {
    id: 17,
    name: 'Guante G-60 Nitrilo Kleenguard',
    category: 'epps',
    excerpt: 'Protección alta contra cortes y abrasión.',
    tags: ['ppe', 'industrial'],
    availability: 'stock',
    featured: false,
    rating: 4.6,
    leadTime: '2 semanas',
    releaseDate: '2024-08-12',
    coverGradient: 'linear-gradient(135deg, #112b16, #23592e)',
    icon: '🧤',
    slaHours: 30,
    image: new URL('../assets/products/epps/guante_nitrilo_g60_kleenguard.jpeg', import.meta.url).href,
  },
  {
    id: 18,
    name: 'Casaca térmica naranja/plomo Termoflex',
    category: 'ropa-industrial',
    excerpt: 'Casaca térmica con cintas reflectivas 3M para alta visibilidad.',
    tags: ['industrial'],
    availability: 'stock',
    featured: true,
    rating: 4.7,
    leadTime: '3 semanas',
    releaseDate: '2024-11-28',
    coverGradient: 'linear-gradient(135deg, #221f05, #4e430b)',
    icon: '👷',
    slaHours: 40,
    image: new URL('../assets/products/ropa-industrial/casaca_termica_naranja_plomo_termoferlex_reflectiva.jpeg', import.meta.url).href,
  },
  {
    id: 19,
    name: 'Uniforme drill naranja/plomo c/cinta 3M',
    category: 'ropa-industrial',
    excerpt: 'Camisa y pantalón drill para operaciones en campo.',
    tags: ['industrial'],
    availability: 'stock',
    featured: false,
    rating: 4.5,
    leadTime: '3 semanas',
    releaseDate: '2024-10-30',
    coverGradient: 'linear-gradient(135deg, #221f05, #4e430b)',
    icon: '👷',
    slaHours: 40,
    image: new URL('../assets/products/ropa-industrial/uniforme_drill_naranja_plomo_reflectivo.jpeg', import.meta.url).href,
  },
  {
    id: 20,
    name: 'Barril/cilindro seguridad naranja',
    category: 'epcs',
    excerpt: 'Elementos viales con cinta reflectiva para canalizar tránsito.',
    tags: ['colectivo'],
    availability: 'stock',
    featured: true,
    rating: 4.8,
    leadTime: '2 semanas',
    releaseDate: '2024-09-05',
    coverGradient: 'linear-gradient(135deg, #0f1f43, #1a3c7d)',
    icon: '🛑',
    slaHours: 34,
    image: new URL('../assets/products/epcs/barril_seguridad_naranja_reflectivo.jpeg', import.meta.url).href,
  },
  {
    id: 21,
    name: 'Cono naranja 90 cm c/cinta reflectiva',
    category: 'epcs',
    excerpt: 'Cono de alto tráfico para obras y desvíos.',
    tags: ['colectivo'],
    availability: 'stock',
    featured: false,
    rating: 4.5,
    leadTime: '2 semanas',
    releaseDate: '2024-08-25',
    coverGradient: 'linear-gradient(135deg, #0f1f43, #1a3c7d)',
    icon: '🚧',
    slaHours: 34,
    image: new URL('../assets/products/epcs/cono_seguridad_naranja_90cm.webp', import.meta.url).href,
  },
  {
    id: 22,
    name: 'Barra retráctil amarillo/negro Clute',
    category: 'epcs',
    excerpt: 'Barra extensible para señalización temporal de pasillos.',
    tags: ['colectivo'],
    availability: 'stock',
    featured: false,
    rating: 4.4,
    leadTime: '2 semanas',
    releaseDate: '2024-07-10',
    coverGradient: 'linear-gradient(135deg, #0f1f43, #1a3c7d)',
    icon: '🚧',
    slaHours: 32,
    image: new URL('../assets/products/epcs/barra_retractil_amarillo_negro.png', import.meta.url).href,
  },
  {
    id: 23,
    name: 'Barra retráctil rojo/blanco plástico',
    category: 'epcs',
    excerpt: 'Alternativa ligera para eventos, accesos y áreas restringidas.',
    tags: ['colectivo'],
    availability: 'stock',
    featured: false,
    rating: 4.3,
    leadTime: '2 semanas',
    releaseDate: '2024-07-05',
    coverGradient: 'linear-gradient(135deg, #0f1f43, #1a3c7d)',
    icon: '🚧',
    slaHours: 32,
    image: new URL('../assets/products/epcs/barra_retractil_rojo_blanco.webp', import.meta.url).href,
  },
  {
    id: 24,
    name: 'Paño Wypall X75 Plus industrial azul',
    category: 'oficina',
    excerpt: 'Paños absorbentes de larga duración para mantenimiento.',
    tags: ['oficina', 'logistica'],
    availability: 'stock',
    featured: false,
    rating: 4.4,
    leadTime: '1 semana',
    releaseDate: '2024-06-12',
    coverGradient: 'linear-gradient(135deg, #3a2f20, #6f4a1f)',
    icon: '🧻',
    slaHours: 24,
    image: new URL('../assets/products/oficina/pano_wypall_x75_industrial.jpg', import.meta.url).href,
  },
  {
    id: 25,
    name: 'Paño Wypall X80 Power Pockets blanco',
    category: 'oficina',
    excerpt: 'Paño reforzado para tareas exigentes y reutilización prolongada.',
    tags: ['oficina'],
    availability: 'stock',
    featured: false,
    rating: 4.4,
    leadTime: '1 semana',
    releaseDate: '2024-06-10',
    coverGradient: 'linear-gradient(135deg, #3a2f20, #6f4a1f)',
    icon: '🧻',
    slaHours: 24,
    image: new URL('../assets/products/oficina/pano_wypall_x80_power.jpeg', import.meta.url).href,
  },
  {
    id: 26,
    name: 'Bolsa basura poliestileno 140×2 negro',
    category: 'kitchenette',
    excerpt: 'Bolsas reforzadas para cilindros de residuos internos.',
    tags: ['logistica'],
    availability: 'stock',
    featured: false,
    rating: 4.2,
    leadTime: '1 semana',
    releaseDate: '2024-05-30',
    coverGradient: 'linear-gradient(135deg, #2a1307, #53240f)',
    icon: '🗑️',
    slaHours: 20,
    image: new URL('../assets/products/kitchenette/bolsa_basura_cilindro_140x2_negro.jpg', import.meta.url).href,
  },
  {
    id: 27,
    name: 'Bolsa basura poliestileno 220×2 negro',
    category: 'kitchenette',
    excerpt: 'Formato extra grande para patios, almacenes o zonas de comedor.',
    tags: ['logistica'],
    availability: 'stock',
    featured: false,
    rating: 4.2,
    leadTime: '1 semana',
    releaseDate: '2024-05-30',
    coverGradient: 'linear-gradient(135deg, #2a1307, #53240f)',
    icon: '🗑️',
    slaHours: 20,
    image: new URL('../assets/products/kitchenette/bolsa_basura_cilindro_220x2_negro.webp', import.meta.url).href,
  },
]

const solutionHighlights = [
  {
    icon: '⚡',
    title: 'Integración inmediata',
    description: 'Compatible con SCADA, BMS y plataformas cloud mediante APIs abiertas.',
  },
  {
    icon: '📊',
    title: 'Insights accionables',
    description: 'Dashboard en tiempo real para monitorear salud de equipos y SLAs.',
  },
  {
    icon: '🤝',
    title: 'Soporte consultivo',
    description: 'Plantilla lista para sumar casos de uso, fichas técnicas y testimonios.',
  },
]

const currentPeriod = new Date().toLocaleDateString('es-PE', {
  month: 'long',
  year: 'numeric',
})

const categoryFilters = computed(() => [
  {
    id: 'all',
    label: 'Todas las categorías',
    description: 'Explora el catálogo completo',
  },
  ...productCategories.map((category) => ({
    id: category.id,
    label: category.label,
    description: category.description,
  })),
])

const heroStats = computed(() => {
  const categories = new Set(products.map((product) => product.category)).size
  const stock = products.filter((product) => product.availability === 'stock').length
  const featured = products.filter((product) => product.featured).length
  return [
    { label: 'Soluciones activas', value: `${products.length}+` },
    { label: 'Segmentos cubiertos', value: `${categories}` },
    { label: 'Equipos en stock', value: `${stock}` },
    { label: 'Destacados curados', value: `${featured}` },
  ]
})

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return products
    .filter((product) => {
      const matchesCategory =
        selectedCategory.value === 'all' || product.category === selectedCategory.value
      const matchesAvailability =
        availabilityFilter.value === 'all' || product.availability === availabilityFilter.value
      const matchesTag =
        selectedTag.value === 'all' || product.tags.includes(selectedTag.value)
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.excerpt.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.includes(query))
      return matchesCategory && matchesAvailability && matchesTag && matchesQuery
    })
    .sort((a, b) => {
      if (sortMode.value === 'recent') {
        return (
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        )
      }
      if (a.featured === b.featured) {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      }
      return a.featured ? -1 : 1
    })
})

const activeFiltersLabel = computed(() => {
  const filters: string[] = []
  if (selectedCategory.value !== 'all') filters.push(getCategoryLabel(selectedCategory.value))
  if (selectedTag.value !== 'all') filters.push(formatTag(selectedTag.value))
  if (availabilityFilter.value !== 'all') {
    filters.push(availabilityFilter.value === 'stock' ? 'En stock' : 'Bajo pedido')
  }
  if (!filters.length) return 'Sin filtros aplicados'
  return filters.join(' · ')
})

function formatTag(tag: string) {
  const found = tagFilters.find((item) => item.id === tag)
  return found ? found.label : tag
}

function getCategoryLabel(id: string) {
  return productCategories.find((category) => category.id === id)?.label ?? 'Categoría'
}

function selectCategory(id: string) {
  selectedCategory.value = id as typeof selectedCategory.value
}

function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  selectedTag.value = 'all'
  sortMode.value = 'featured'
  availabilityFilter.value = 'all'
}

function scrollToResultados() {
  document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function contactViaWhatsApp(product: ProductCard) {
  const message = encodeURIComponent(`${whatsappTemplate}\n${product.name}`)
  const url = `https://wa.me/${whatsappPhone}?text=${message}`
  window.open(url, '_blank', 'noopener')
}

</script>

<style scoped>
:global(body) {
  background-color: #f6f9f7;
}
.page-productos {
  background-color: #f6f9f7;
  color: #15241e;
}
.productos-hero {
  position: relative;
  padding: 4.5rem 0 3rem;
  background: radial-gradient(circle at top, rgba(79, 239, 177, 0.25), transparent 55%),
    linear-gradient(120deg, #04110a, #0d2818);
  overflow: hidden;
}
.productos-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      circle at 1px 1px,
      rgba(255, 255, 255, 0.35) 1px,
      transparent 0
    ),
    radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0);
  background-size: 40px 40px, 20px 20px;
  opacity: 0.18;
}
.hero-grid-overlay {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 0,
    rgba(255, 255, 255, 0.04) 1px,
    transparent 1px,
    transparent 40px
  );
}
.eyebrow {
  letter-spacing: 0.2em;
  font-size: 0.8rem;
}
.hero-panel {
  background: rgba(10, 34, 24, 0.9);
  border-radius: 1.25rem;
  padding: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}
.hero-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
.hero-panel__list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.hero-panel__list li:last-child {
  border-bottom: none;
}
.hero-panel__list .value {
  font-size: 1.35rem;
  font-weight: 700;
  color: #caffc1;
}
.badge-soft {
  background: rgba(79, 239, 177, 0.12);
  color: #7cffc5;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
}
.productos-controls {
  margin-top: -2.5rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
}
.filters-card {
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(6, 62, 39, 0.08);
}
.search-input {
  position: relative;
}
.search-icon {
  position: absolute;
  left: 0.95rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  opacity: 0.7;
}
.search-input input {
  padding-left: 2.5rem;
  border-radius: 999px;
  border: 1px solid rgba(6, 62, 39, 0.2);
}
.form-select {
  border-radius: 999px;
}
.category-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.pill {
  border: 1px solid rgba(6, 62, 39, 0.12);
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  background: #f9fbf8;
  text-align: left;
  flex: 1 1 260px;
  min-width: 220px;
  transition: all 0.2s ease;
}
.pill.active {
  border-color: rgba(79, 239, 177, 0.8);
  background: rgba(79, 239, 177, 0.12);
  box-shadow: 0 10px 20px rgba(59, 183, 117, 0.15);
}
.pill__label {
  display: block;
  font-weight: 600;
}
.pill__desc {
  color: #5f7067;
}
.products-grid-section {
  padding: 2rem 0 3rem;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.product-card {
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid rgba(6, 62, 39, 0.08);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  position: relative;
  overflow: hidden;
}
.product-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid transparent;
  pointer-events: none;
}
.product-card.is-featured::after {
  border-color: rgba(79, 239, 177, 0.8);
  box-shadow: 0 12px 30px rgba(33, 98, 64, 0.12);
}
.product-card__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #132f20;
  color: #8ef9c6;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
}
.product-card__media {
  height: 150px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 2.5rem;
}
.product-card__media.has-image {
  padding: 0;
  background: transparent;
}
.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.product-card__category {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #5f7067;
}
.product-title {
  font-weight: 500;
  font-family: 'Montserrat', 'Segoe UI', 'Noto Sans', sans-serif;
  color: #0c2117;
  letter-spacing: 0.01em;
}
.product-features li {
  background: rgba(6, 62, 39, 0.08);
  border-radius: 999px;
  padding: 0.25rem 0.65rem;
  margin: 0.2rem 0.2rem 0.2rem 0;
}
.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}
.availability {
  font-weight: 600;
}
.availability.state-stock {
  color: #0f7f45;
}
.availability.state-preorder {
  color: #b45309;
}
.rating {
  font-weight: 600;
  color: #052c1b;
}
.product-card__actions {
  border-top: 1px dashed rgba(6, 62, 39, 0.1);
  padding-top: 0.75rem;
}
.badge-outline {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  background: rgba(79, 239, 177, 0.15);
  color: #0f3b23;
  font-weight: 600;
}
.btn-success {
  background: linear-gradient(120deg, #3fe0a8, #4ef7b5);
  border: none;
}
.btn-outline-success {
  border-color: rgba(63, 224, 168, 0.6);
  color: #0d3b26;
}
.empty-state {
  background: #ffffff;
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  border: 1px dashed rgba(6, 62, 39, 0.2);
}
.empty-state__badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  background: rgba(255, 87, 34, 0.1);
  color: #c94a1c;
  font-weight: 600;
}
.solution-highlights {
  padding: 2rem 0 4rem;
}
.highlight-card {
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 1.5rem;
  border: 1px solid rgba(6, 62, 39, 0.08);
}
.highlight-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.productos-cta {
  position: relative;
  padding: 4rem 0;
  background: linear-gradient(120deg, #0c2c1c, #184e32);
  overflow: hidden;
}
.cta-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent 50%);
}
.productos-cta .btn {
  min-width: 230px;
  border-radius: 999px;
}
@media (max-width: 991.98px) {
  .hero-panel {
    margin-top: 1.5rem;
  }
}
@media (max-width: 767.98px) {
  .productos-hero {
    padding-top: 3.5rem;
  }
  .filters-card {
    padding: 1.25rem;
  }
  .product-card__media {
    height: 120px;
  }
  .category-pills {
    flex-direction: column;
  }
}
</style>

