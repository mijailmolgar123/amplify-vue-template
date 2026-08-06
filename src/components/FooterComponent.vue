<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="@/assets/logo-segurimax.png" alt="Segurimax Perú" />
        <div>
          <strong>Segurimax Perú</strong>
          <p>Abastecimiento B2B especializado en seguridad industrial, equipamiento e insumos para operaciones.</p>
        </div>
      </div>

      <nav aria-label="Soluciones">
        <h2>Abastecimiento</h2>
        <RouterLink to="/soluciones">Soluciones</RouterLink>
        <RouterLink to="/productos">Catálogo referencial</RouterLink>
        <RouterLink to="/como-trabajamos">Cómo trabajamos</RouterLink>
        <RouterLink to="/contacto">Enviar requerimiento</RouterLink>
      </nav>

      <nav aria-label="Empresa">
        <h2>Segurimax</h2>
        <RouterLink to="/empresa">Nuestra empresa</RouterLink>
        <RouterLink to="/marcas">Marcas</RouterLink>
        <RouterLink to="/contacto">Contacto comercial</RouterLink>
      </nav>

      <div class="footer-contact">
        <h2>Ventas</h2>
        <a href="tel:+51996665221"><i class="fa-solid fa-phone" aria-hidden="true"></i> +51 996 665 221</a>
        <a href="mailto:ventas@segurimax-peru.com"><i class="fa-regular fa-envelope" aria-hidden="true"></i> ventas@segurimax-peru.com</a>
        <a href="https://wa.me/51996665221" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp ventas</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© {{ currentYear }} Segurimax Perú</span>
      <span>Requerimientos industriales, gestionados en una sola atención.</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.site-footer { padding: 4rem 0 1.5rem; color: #fff; background: #03170f; }
.footer-grid { display: grid; grid-template-columns: 1.5fr 1fr .8fr 1.25fr; gap: 3rem; }
.footer-brand { display: flex; align-items: flex-start; gap: 1rem; }
.footer-brand img { width: 58px; height: 58px; object-fit: contain; }
.footer-brand strong { font-family: var(--font-display); font-size: 1.22rem; font-weight: 400; }
.footer-brand p { max-width: 300px; margin: .65rem 0 0; color: rgba(255,255,255,.53); font-size: .9rem; }
.site-footer h2 { margin: 0 0 1rem; color: #fff; font-family: var(--font-body); font-size: .8rem; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
.site-footer nav, .footer-contact { display: flex; flex-direction: column; align-items: flex-start; gap: .55rem; }
.site-footer a { color: rgba(255,255,255,.65); font-size: .88rem; text-decoration: none; }
.site-footer a:hover { color: var(--brand-yellow); }
.footer-contact a { display: inline-flex; align-items: center; gap: .55rem; }
.footer-contact i { width: 18px; color: #a9d8b9; }
.footer-bottom { display: flex; justify-content: space-between; gap: 1rem; margin-top: 3rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.4); font-size: .78rem; }
@media (max-width: 991.98px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 575.98px) {
  .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
  .footer-bottom { align-items: flex-start; flex-direction: column; }
}
</style>
