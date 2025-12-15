<template>
  <main class="page page-contacto">
    <section class="contacto-hero text-center text-white">
      <div class="container">
        <p class="eyebrow text-uppercase mb-2">Hablemos de tu próximo proyecto</p>
        <h1 class="fw-bold mb-3">Contáctanos</h1>
        <p class="text-white-50 mb-0">
          Elige el medio que prefieras y te responderemos a la brevedad.
        </p>
      </div>
      <div class="hero-overlay" aria-hidden="true"></div>
    </section>

    <section class="contacto-form-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="contacto-card shadow-lg">
              <form @submit.prevent>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="nombre" class="form-label">Nombre *</label>
                    <input v-model="form.nombre" type="text" id="nombre" class="form-control" />
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
                    <textarea
                      v-model="form.productos"
                      id="productos"
                      rows="4"
                      class="form-control"
                      placeholder="Cuéntanos qué necesitas..."
                    ></textarea>
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
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const WHATSAPP_PHONE = '51996665221'
const EMAIL_TO = 'ventas@segurimax-peru.com'

const form = reactive({
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  productos: '',
})

function buildPlainText() {
  return [
    `Nombre: ${form.nombre || '-'}`,
    `Empresa: ${form.empresa || '-'}`,
    `Email: ${form.email || '-'}`,
    `Teléfono: ${form.telefono || '-'}`,
    '',
    `Mensaje: ${form.productos || 'Interesado en productos Segurimax.'}`,
  ].join('\n')
}

function sendWhatsApp() {
  const texto = buildPlainText()
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(texto)}`
  window.open(url, '_blank', 'noopener')
}

function sendEmailGmail() {
  const subject = `Consulta web – ${form.nombre || 'interesado'}`
  const body = buildPlainText()
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_TO)}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`
  window.open(url, '_blank', 'noopener')
}

const mailtoHref = computed(() => {
  const subject = `Consulta web – ${form.nombre || 'interesado'}`
  const body = buildPlainText()
  return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})
</script>

<style scoped>
.page-contacto {
  background: #f5faf7;
}
.eyebrow {
  letter-spacing: 0.15em;
  font-size: 0.78rem;
}
.contacto-hero {
  position: relative;
  padding: 4rem 0 3rem;
  background: linear-gradient(135deg, #031a0f, #08422b);
  overflow: hidden;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(79, 239, 177, 0.25), transparent 55%);
}
.contacto-form-section {
  padding: 3rem 0 4rem;
}
.contacto-card {
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(4, 18, 11, 0.07);
}
.form-control {
  border-radius: 0.8rem;
  border-color: rgba(9, 36, 22, 0.2);
  min-height: 46px;
}
.form-label {
  font-weight: 600;
  color: #0b2617;
}
.btn-pill {
  border-radius: 999px;
  padding: 0.65rem 1.8rem;
  font-weight: 600;
  min-width: 210px;
}
.btn-pill-primary {
  background: linear-gradient(120deg, #1c8f41, #0f5e2b);
  color: #ffffff;
  border: none;
  box-shadow: 0 12px 30px rgba(7, 64, 32, 0.25);
}
.btn-pill-primary:hover {
  color: #ffffff;
  box-shadow: 0 15px 35px rgba(7, 64, 32, 0.3);
}
@media (max-width: 767.98px) {
  .contacto-card {
    padding: 1.5rem;
  }
  .btn-pill {
    width: 100%;
  }
}
</style>
