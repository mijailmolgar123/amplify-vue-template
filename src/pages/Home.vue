<template>
    <div class="d-flex flex-column min-vh-100 bg-white">

        <!-- Hero Section -->
        <HeroSection />

        <FeaturedProducts />

        <!-- Empresa Section -->
        <section id="empresa" class="py-5 section-bg">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="fw-bold">Nuestra Empresa</h2>
                    <p class="text-secondary">
                        Comprometidos con la seguridad industrial desde 2008, ofrecemos soluciones integrales
                        para la protección de trabajadores en diversos sectores industriales.
                    </p>
                </div>
                <div class="row g-4 text-center">
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body">
                                <div class="bg-success text-white rounded-circle mx-auto mb-3"
                                    style="width:4rem; height:4rem; display:flex; align-items:center; justify-content:center;">
                                    <span class="fs-4 fw-bold">5+</span>
                                </div>
                                <h5 class="card-title fw-bold">Años de Experiencia</h5>
                                <p class="card-text text-secondary">Liderando el mercado de seguridad industrial</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body">
                                <div class="bg-success text-white rounded-circle mx-auto mb-3"
                                    style="width:4rem; height:4rem; display:flex; align-items:center; justify-content:center;">
                                    <span class="fs-4 fw-bold">100+</span>
                                </div>
                                <h5 class="card-title fw-bold">Empresas Socias</h5>
                                <p class="card-text text-secondary">Confían en nuestros productos y servicios</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body">
                                <div class="bg-success text-white rounded-circle mx-auto mb-3"
                                    style="width:4rem; height:4rem; display:flex; align-items:center; justify-content:center;">
                                    <span class="fw-bold">ISO</span>
                                </div>
                                <h5 class="card-title fw-bold">Certificación ISO</h5>
                                <p class="card-text text-secondary">Calidad garantizada internacionalmente</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="socios" class="py-5 bg-white">
            <!-- Nuestros Socios (con fondo gris y ancho completo) -->
             <div class="container">
             <!-- fondo gris claro -->
                <div class="container-fluid"> <!-- ocupa todo el ancho -->
                <div class="text-center mb-4">
                    <h2 class="fw-bold">Nuestros Socios</h2>
                </div>

                <!-- Grid responsivo que llena el ancho y centra vertical/horizontal -->
                <div class="row row-cols-3 g-4 align-items-center">
                    <div v-for="(cli, i) in socios" :key="'cli-'+i"
                        class="col d-flex justify-content-center">
                    <img :src="cli.src" :alt="cli.name"
                         class="img-fluid socio-logo"
                         :class="`socio-logo--${cli.size ?? 'md'}`"
                         loading="lazy" />
                    </div>
                </div>
                </div>
            </div>
        </section>

        <section id="certificados" class="py-5 section-bg">
            <div class="py-5">
                <!-- Certificados -->
                <div class="text-center mb-4">
                <h2 class="fw-bold">Certificados</h2>
                </div>
                <div class="row justify-content-center align-items-center g-4 mb-5">
                <div class="col-auto" v-for="(hom, i) in homologaciones" :key="'hom-'+i">
                    <img :src="hom.src" :alt="hom.alt" class="img-fluid homogen-logo" loading="lazy" />
                </div>
                </div>
            </div>

        </section>

        <!-- Contacto Section -->
        <section id="contacto" class="py-5">
            <div class="container">
                <h3 class="text-center fw-bold mb-4">Contáctanos</h3>
                <p class="text-center text-secondary mb-5">
                Elige el medio que prefieras y te responderemos a la brevedad.
                </p>

                <div class="row justify-content-center">
                <div class="col-lg-8">
                    <form ref="formContacto" @submit.prevent novalidate>
                    <div class="row g-3">
                        <div class="col-md-6">
                        <label for="nombre" class="form-label">Nombre *</label>
                        <input v-model="form.nombre" type="text" id="nombre" class="form-control" required />
                        </div>
                        <div class="col-md-6">
                        <label for="empresa" class="form-label">Empresa</label>
                        <input v-model="form.empresa" type="text" id="empresa" class="form-control" />
                        </div>
                        <div class="col-md-6">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="form.email" type="email" id="email" class="form-control" />
                        </div>
                        <div class="col-md-6">
                        <label for="telefono" class="form-label">Teléfono</label>
                        <input v-model="form.telefono" type="tel" id="telefono" class="form-control" />
                        </div>
                        <div class="col-12">
                        <label for="productos" class="form-label">Mensaje / Productos de interés</label>
                        <textarea v-model="form.productos" id="productos" rows="4" class="form-control"
                                    placeholder="Cuéntanos qué necesitas..."></textarea>
                        </div>
                    </div>

                    <div class="text-center mt-4 d-flex flex-wrap gap-2 justify-content-center">
                        <button type="button" class="btn btn-pill btn-pill-primary" @click="sendWhatsApp">
                        Enviar por WhatsApp
                        </button>
                        <button type="button" class="btn btn-pill btn-pill-primary" @click="sendEmailGmail">
                        Enviar por Gmail
                        </button>
                    </div>

                    <p class="text-center mt-2">
                        <a :href="mailtoHref" class="small text-muted">Usar cliente de correo (mailto)</a>
                    </p>
                    </form>
                </div>
                </div>
            </div>
        </section>


    </div>
</template>

<script setup lang="ts">
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import HeroSection from '@/components/HeroSection.vue'
import { reactive, computed } from 'vue'
import sgsLogo from '@/assets/logo_sgs-2.jpg'
import hodelpeLogo from '@/assets/LOGOTIPO_DE_HOMOLOGADO_-_CORPORACION_HODELPE_SAC.jpg'

import threeMLogo from '@/assets/socios/3m-logo.png'
import ansellLogo from '@/assets/socios/ansell-logo.png'
import cluteLogo from '@/assets/socios/clute-logo.png'
import deltaPlusLogo from '@/assets/socios/delta-plus-logo.png'
import msaLogo from '@/assets/socios/msa-logo.png'
import steelproLogo from '@/assets/socios/steelpro-logo.png'

const EMAIL_TO = 'segurimaxperu1@gmail.com'
const WHATSAPP_PHONE = '51996665221'

// estado reactivo del formulario
const form = reactive({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    productos: '',
})

function handleSubmit() {
    alert('¡Gracias por tu solicitud! Te contactaremos pronto.')
    // resetear campos
    Object.assign(form, {
        nombre: '',
        empresa: '',
        email: '',
        telefono: '',
        productos: '',
    })
}

// Imágenes en assets importadas correctamente
const homologaciones = [
  { src: sgsLogo, alt: 'Homologado SGS' },
  { src: hodelpeLogo, alt: 'Homologado HODELPE' }
]

type SocioLogoSize = 'sm' | 'md' | 'lg' | 'xl'

type Socio = {
  name: string
  src: string
  size?: SocioLogoSize
}

const socios: Socio[] = [
  { name: '3M', src: threeMLogo, size: 'sm' },
  { name: 'Ansell', src: ansellLogo, size: 'sm' },
  { name: 'Clute', src: cluteLogo, size: 'sm' },
  { name: 'Delta Plus', src: deltaPlusLogo, size: 'md' },
  { name: 'MSA', src: msaLogo, size: 'md' },
  { name: 'Steelpro', src: steelproLogo, size: 'md' }
]

function buildPlainText() {
  // cuerpo legible con CRLF como recomienda RFC 6068
  const line = (k: string, v?: string) => `${k}: ${v ?? ''}`
  const body = [
    'Nueva consulta desde segurimax-peru.com',
    '',
    line('Nombre', form.nombre),
    line('Empresa', form.empresa),
    line('Email', form.email),
    line('Teléfono', form.telefono),
    '',
    'Mensaje / Productos:',
    form.productos || '',
  ].join('\r\n')
  return body
}

function sendWhatsApp() {
  const msg = buildPlainText()
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`
  window.open(url, '_blank')
}

function sendEmailGmail() {
  const subject = `Consulta web – ${form.nombre || 'Socio'}`
  const body = buildPlainText()
  // Gmail web compose
  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(EMAIL_TO)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  window.open(gmailUrl, '_blank')
}

// Fallback: Socio de correo por defecto (Outlook/Apple Mail/etc.)
const mailtoHref = computed(() => {
  const subject = `Consulta web – ${form.nombre || 'Socio'}`
  const body = buildPlainText()
  return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

</script>

<style scoped>
.navbar-brand img {
    object-fit: cover;
    border-radius: 50%;
}

.nav-link {
    font-weight: 500;
    transition: color 0.2s;
}

.nav-link:hover {
    color: #047857;
    /* verde Segurimax */
}

.section-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('@/assets/fondo.png') center/cover no-repeat;
  background-attachment: scroll, fixed;
  color: #fff;
}
.section-bg h2,
.section-bg h3,
.section-bg h5,
.section-bg p {
  color: #fff;
}
.section-bg .text-secondary {
  color: rgba(255, 255, 255, 0.8) !important;
}
.section-bg .card {
  background-color: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
}
.section-bg .bg-success {
  background-color: var(--brand-green) !important;
}
@media (max-width: 991.98px) {
  .section-bg {
    background-attachment: scroll, scroll;
  }
}
/* Homologaciones: un poco más grandes */
.homogen-logo {
  height: 200px;
  max-width: 120%;
  object-fit: contain;
}

/* Socios: tamaños diferenciados + responsive */
.socio-logo {
  max-width: 100%;
  object-fit: contain;
}
.socio-logo--sm { height: 60px; }
.socio-logo--md { height: 80px; }
.socio-logo--lg { height: 100px; }
.socio-logo--xl { height: 120px; }

@media (min-width: 992px) {
  .socio-logo--sm { height: 70px; }
  .socio-logo--md { height: 95px; }
  .socio-logo--lg { height: 120px; }
  .socio-logo--xl { height: 150px; }
}
/* Botones del CTA */
.btn-lg { min-width: 220px; }

</style>
