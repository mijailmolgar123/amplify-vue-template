<template>
  <main class="contact-page">
    <section class="contact-hero">
      <div class="container contact-hero__inner">
        <div>
          <p class="section-kicker">ENVÍA TU REQUERIMIENTO</p>
          <h1>No necesitas tener todo resuelto para consultarnos.</h1>
        </div>
        <p>Comparte lo que conoces: descripción, código, marca, fotografía, ficha técnica o una lista. Nosotros validamos la información contigo.</p>
      </div>
    </section>

    <section class="request-section">
      <div class="container request-layout">
        <aside class="request-aside">
          <p class="section-kicker">DOS FORMAS DE EMPEZAR</p>
          <h2>Catálogo o necesidad abierta.</h2>
          <p>Si ya identificaste productos, agrégalos a Mi requerimiento. Si buscas algo especial, descríbelo en este formulario.</p>
          <button type="button" @click="openCart">
            <i class="fa-solid fa-list-check" aria-hidden="true"></i>
            Ver mi requerimiento
          </button>
          <div class="direct-contact">
            <span>Atención directa</span>
            <a href="tel:+51996665221">+51 996 665 221</a>
            <a href="mailto:ventas@segurimax-peru.com">ventas@segurimax-peru.com</a>
          </div>
        </aside>

        <form class="request-form" @submit.prevent="sendWhatsApp">
          <header>
            <span>Solicitud B2B</span>
            <h2>Datos del requerimiento</h2>
            <p>Completa lo disponible. Los campos con * son necesarios para preparar el mensaje.</p>
          </header>

          <div class="form-grid">
            <label>Nombre *<input v-model="form.nombre" type="text" autocomplete="name" placeholder="Nombre del solicitante" /></label>
            <label>Empresa<input v-model="form.empresa" type="text" autocomplete="organization" placeholder="Razón social" /></label>
            <label>RUC<input v-model="form.ruc" type="text" inputmode="numeric" placeholder="11 dígitos" /></label>
            <label>Área / cargo<input v-model="form.area" type="text" placeholder="Compras, mantenimiento..." /></label>
            <label>Email<input v-model="form.email" type="email" autocomplete="email" placeholder="compras@empresa.com" /></label>
            <label>Teléfono<input v-model="form.telefono" type="tel" autocomplete="tel" placeholder="999 999 999" /></label>
            <label class="wide">Producto, servicio o necesidad *<textarea v-model="form.descripcion" rows="4" placeholder="Describe qué necesitas, para qué aplicación o pega una lista de productos"></textarea></label>
            <label>Código o modelo<input v-model="form.codigo" type="text" placeholder="Si lo conoces" /></label>
            <label>Marca requerida<input v-model="form.marca" type="text" placeholder="Opcional" /></label>
            <label>Cantidad<input v-model.number="form.cantidad" type="number" min="1" /></label>
            <label>Unidad
              <select v-model="form.unidad"><option>unidad</option><option>par</option><option>caja</option><option>paquete</option><option>rollo</option><option>juego</option><option>servicio</option></select>
            </label>
            <label class="wide checkbox-field"><input v-model="form.equivalentes" type="checkbox" /> Acepto marcas o modelos técnicamente equivalentes</label>
            <label class="wide">Especificaciones o certificaciones<textarea v-model="form.especificaciones" rows="3" placeholder="Norma, medida, material, presentación o condición técnica"></textarea></label>
            <label>Fecha requerida<input v-model="form.fecha" type="date" /></label>
            <label>Lugar de entrega<input v-model="form.lugar" type="text" placeholder="Ciudad, almacén u operación" /></label>
            <label class="wide file-field">Fotografías, PDF, Excel o ficha técnica
              <input type="file" multiple accept="image/*,.pdf,.xls,.xlsx,.csv" @change="handleFiles" />
              <small>Los archivos seleccionados se adjuntan manualmente cuando se abra WhatsApp o correo.</small>
              <span v-if="fileNames.length">{{ fileNames.join(' · ') }}</span>
            </label>
          </div>

          <p v-if="formError" class="form-error" role="alert">{{ formError }}</p>
          <p class="form-assurance">Segurimax revisará cantidades, especificaciones, alternativas y condiciones de entrega antes de completar la cotización.</p>

          <div class="form-actions">
            <button type="submit" class="send-primary"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Enviar por WhatsApp</button>
            <button type="button" class="send-secondary" @click="sendEmail"><i class="fa-regular fa-envelope" aria-hidden="true"></i> Preparar correo</button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useQuoteCart } from '@/composables/useQuoteCart'

const WHATSAPP_PHONE = '51996665221'
const EMAIL_TO = 'ventas@segurimax-peru.com'
const { openCart } = useQuoteCart()
const fileNames = ref<string[]>([])
const formError = ref('')

const form = reactive({
  nombre: '', empresa: '', ruc: '', area: '', email: '', telefono: '', descripcion: '', codigo: '', marca: '',
  equivalentes: true, cantidad: 1, unidad: 'unidad', especificaciones: '', fecha: '', lugar: '',
})

function handleFiles(event: Event) {
  fileNames.value = Array.from((event.target as HTMLInputElement).files ?? []).map((file) => file.name)
}

function buildPlainText() {
  return [
    'Hola Segurimax, deseo enviar un requerimiento de abastecimiento:', '',
    `Nombre: ${form.nombre || '-'}`, `Empresa: ${form.empresa || '-'}`, `RUC: ${form.ruc || '-'}`,
    `Área / cargo: ${form.area || '-'}`, `Email: ${form.email || '-'}`, `Teléfono: ${form.telefono || '-'}`, '',
    `Producto o necesidad: ${form.descripcion || '-'}`, `Código / modelo: ${form.codigo || '-'}`, `Marca: ${form.marca || '-'}`,
    `Cantidad: ${form.cantidad || 1} ${form.unidad}`, `Acepta equivalentes: ${form.equivalentes ? 'Sí' : 'No'}`,
    `Especificaciones: ${form.especificaciones || '-'}`, `Fecha requerida: ${form.fecha || '-'}`, `Lugar de entrega: ${form.lugar || '-'}`,
    fileNames.value.length ? `Archivos para adjuntar: ${fileNames.value.join(', ')}` : '', '',
    'Solicito validar alternativas y contactarme para completar la cotización.',
  ].filter((line) => line !== '').join('\n')
}

function validate() {
  if (!form.nombre.trim() || !form.descripcion.trim()) {
    formError.value = 'Ingresa tu nombre y una descripción del requerimiento.'
    return false
  }
  formError.value = ''
  return true
}

function sendWhatsApp() {
  if (!validate()) return
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(buildPlainText())}`, '_blank', 'noopener')
}

function sendEmail() {
  if (!validate()) return
  const subject = `Requerimiento de abastecimiento — ${form.empresa || form.nombre}`
  window.location.href = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildPlainText())}`
}
</script>

<style scoped>
.contact-page { color: var(--brand-ink); background: var(--brand-ivory); }
.contact-hero { padding: clamp(4rem, 8vw, 7rem) 0; color: #fff; background: var(--brand-forest-deep); }
.contact-hero__inner { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(320px, .8fr); align-items: end; gap: clamp(2rem, 7vw, 7rem); }
.contact-hero .section-kicker { color: var(--brand-yellow); }
.contact-hero h1 { max-width: 850px; margin: .45rem 0 0; color: #fff; font-family: var(--font-display); font-size: clamp(2.5rem, 5.7vw, 5rem); font-weight: 400; line-height: 1.04; }
.contact-hero__inner > p { margin: 0; color: rgba(255,255,255,.7); font-size: 1.05rem; }
.request-section { padding: clamp(4rem, 8vw, 7rem) 0; }
.request-layout { display: grid; grid-template-columns: minmax(260px, .65fr) minmax(0, 1.35fr); gap: clamp(2.5rem, 7vw, 7rem); align-items: start; }
.request-aside { position: sticky; top: 110px; }
.request-aside h2 { margin: .4rem 0 1rem; font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1.05; }
.request-aside > p:not(.section-kicker) { color: #657168; }
.request-aside > button { min-height: 50px; display: inline-flex; align-items: center; gap: .6rem; margin-top: 1rem; padding: .7rem 1rem; border: 0; border-radius: 7px; color: var(--brand-ink); background: var(--brand-yellow); font-weight: 850; }
.direct-contact { display: grid; gap: .35rem; margin-top: 2rem; padding-top: 1.3rem; border-top: 1px solid rgba(8,43,29,.14); }
.direct-contact span { color: #78837c; font-size: .7rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
.direct-contact a { color: var(--brand-ink); font-weight: 750; text-decoration: none; }
.request-form { padding: clamp(1.25rem, 3vw, 2.3rem); border: 1px solid rgba(8,43,29,.12); border-radius: 14px; background: #fff; box-shadow: 0 24px 60px rgba(8,43,29,.08); }
.request-form header { margin-bottom: 1.5rem; }
.request-form header span { color: var(--brand-green); font-size: .7rem; font-weight: 900; letter-spacing: .15em; }
.request-form h2 { margin: .3rem 0; font-size: clamp(1.6rem, 3vw, 2.25rem); }
.request-form header p { margin: 0; color: #77827b; font-size: .86rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .9rem; }
.form-grid label { display: grid; align-content: start; gap: .38rem; color: #3f4d45; font-size: .8rem; font-weight: 750; }
.form-grid input:not([type='checkbox']), .form-grid select, .form-grid textarea { width: 100%; min-height: 46px; padding: .65rem .75rem; border: 1px solid #d6ddd8; border-radius: 8px; background: #fff; font: inherit; }
.form-grid textarea { resize: vertical; }
.wide { grid-column: 1 / -1; }
.checkbox-field { display: flex !important; align-items: center; flex-direction: row; }
.checkbox-field input { accent-color: var(--brand-green); }
.file-field small { color: #7b857f; font-weight: 500; }
.file-field span { color: var(--brand-green); font-size: .75rem; }
.form-assurance { margin: 1.2rem 0; padding: .9rem 1rem; border-left: 3px solid var(--brand-yellow); color: #5d6962; background: #f2f6f2; font-size: .82rem; }
.form-error { margin: 1rem 0 0; color: #a02b24; font-weight: 700; }
.form-actions { display: flex; flex-wrap: wrap; gap: .75rem; }
.form-actions button { min-height: 50px; display: inline-flex; align-items: center; justify-content: center; gap: .55rem; padding: .7rem 1rem; border-radius: 7px; font-weight: 850; }
.send-primary { border: 0; color: #fff; background: var(--brand-green); }
.send-secondary { border: 1px solid rgba(8,43,29,.2); color: var(--brand-ink); background: #fff; }
@media (max-width: 991.98px) { .contact-hero__inner, .request-layout { grid-template-columns: 1fr; } .request-aside { position: static; } }
@media (max-width: 575.98px) { .form-grid { grid-template-columns: 1fr; } .wide { grid-column: 1; } .form-actions, .form-actions button { width: 100%; } }
</style>
