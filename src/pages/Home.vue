<template>
    <div class="d-flex flex-column min-vh-100 bg-white">

        <!-- Hero Section -->
        <HeroSection />

        <FeaturedProducts />

        <!-- Empresa Section -->
        <section id="empresa" class="py-5 bg-light">
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
                                <h5 class="card-title fw-bold">Empresas Clientes</h5>
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

        <section id="clientes" class="py-5 bg-white">
            <!-- Nuestros Clientes (con fondo gris y ancho completo) -->
             <div class="container">
             <!-- fondo gris claro -->
                <div class="container-fluid"> <!-- ocupa todo el ancho -->
                <div class="text-center mb-4">
                    <h2 class="fw-bold">Nuestros Clientes</h2>
                </div>

                <!-- Grid responsivo que llena el ancho y centra vertical/horizontal -->
                <div class="row row-cols-3 g-4 align-items-center">
                    <div v-for="(cli, i) in clientes" :key="'cli-'+i"
                        :class="['col d-flex justify-content-center', {
                        'highlight-logo': cli.name === 'TECHINT SAC' || cli.name === 'REPSOL' || cli.name === 'ANLGO AMERICAN'
                        }]">
                    <img :src="cli.src" :alt="cli.name" class="img-fluid cliente-logo" loading="lazy" />
                    </div>
                </div>
                </div>
            </div>
        </section>

        <section id="certificados" class="py-5 bg-white">
            <div class="bg-light py-5">
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
                        <button type="button" class="btn btn-success btn-lg px-4" @click="sendWhatsApp">
                        Enviar por WhatsApp
                        </button>
                        <button type="button" class="btn btn-primary btn-lg px-4" @click="sendEmailGmail">
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

import techintLogo from '@/assets/clients/techint.png'
import komatsuLogo from '@/assets/clients/komatsu.png'
import ferreyrosLogo from '@/assets/clients/ferreyros.jpg'
import zamineLogo from '@/assets/clients/zamine.png'
import repsolLogo from '@/assets/clients/repsol.jpg'
import angloamericanLogo from '@/assets/clients/angloamerican.png'

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

const clientes = [
  { name: 'TECHINT SAC', src: techintLogo },
  { name: 'KOMATSU - MITSUI', src: komatsuLogo },
  { name: 'REPSOL SAC', src: repsolLogo },
  { name: 'FERREYROS', src: ferreyrosLogo },
  { name: 'ZAMINE', src: zamineLogo },
  { name: 'ANGLO AMERICAN', src: angloamericanLogo }
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
  const subject = `Consulta web – ${form.nombre || 'Cliente'}`
  const body = buildPlainText()
  // Gmail web compose
  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(EMAIL_TO)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  window.open(gmailUrl, '_blank')
}

// Fallback: cliente de correo por defecto (Outlook/Apple Mail/etc.)
const mailtoHref = computed(() => {
  const subject = `Consulta web – ${form.nombre || 'Cliente'}`
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
/* Homologaciones: un poco más grandes */
.homogen-logo {
  height: 200px;
  max-width: 120%;
  object-fit: contain;
}

/* Clientes: tamaño mayor + responsive */
.cliente-logo {
  height: 72px;
  max-width: 100%;
  object-fit: contain;
  /* opcional: un look más uniforme
  filter: grayscale(10%);
  opacity: 0.95;
  */
}
@media (min-width: 992px) { /* lg */
  .cliente-logo { height: 84px; }
}
/* estilo destacado para Techint y repsol */
.highlight-logo .cliente-logo {
  height: 200px; /* más alto que los demás (72px por ejemplo) */
}
/* Botones del CTA */
.btn-lg { min-width: 220px; }

</style>
