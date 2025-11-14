<!-- src/components/FooterComponent.vue -->
<template>
  <footer class="mt-auto parallax-footer text-white py-4">
    <div class="container">
      <div class="row gy-3">
        <div class="col-md-3">
          <h6 class="fw-bold">Segurimax</h6>
          <p class="small text-secondary">
            Líderes en implementos de seguridad industrial con compromiso hacia la excelencia y la protección.
          </p>
        </div>
        <div class="col-md-3">
          <h6 class="fw-semibold">Productos</h6>
          <ul class="list-unstyled small">
            <li><a href="#" class="text-white text-decoration-none">Cascos de Seguridad</a></li>
            <li><a href="#" class="text-white text-decoration-none">Protección Visual</a></li>
            <li><a href="#" class="text-white text-decoration-none">Equipos EPP</a></li>
            <li><a href="#" class="text-white text-decoration-none">Señalización</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h6 class="fw-semibold">Servicios</h6>
          <ul class="list-unstyled small">
            <li><a href="#" class="text-white text-decoration-none">Asesoría Técnica</a></li>
            <li><a href="#" class="text-white text-decoration-none">Capacitación</a></li>
            <li><a href="#" class="text-white text-decoration-none">Mantenimiento</a></li>
            <li><a href="#" class="text-white text-decoration-none">Soporte 24/7</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h6 class="fw-semibold">Empresa</h6>
          <ul class="list-unstyled small">
            <li><a href="#" class="text-white text-decoration-none">Sobre Nosotros</a></li>
            <li><a href="#" class="text-white text-decoration-none">Certificaciones</a></li>
            <li><a href="#" class="text-white text-decoration-none">Noticias</a></li>
            <li><a href="#" class="text-white text-decoration-none">Contacto</a></li>
          </ul>
        </div>
      </div>
      <hr class="border-secondary mt-4" />
      <p class="text-center small mb-0">&copy; 2024 Segurimax. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Este componente es estático y no necesita lógica adicional
</script>

<style scoped>
footer {
  width: 100%;
}
.parallax-footer {
  position: relative;
  background:
    linear-gradient(120deg, rgba(1, 19, 8, 0.9), rgba(3, 43, 24, 0.85)),
    url('@/assets/fondo.png') center/cover fixed;
}
.parallax-footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  pointer-events: none;
}
.parallax-footer > .container,
.parallax-footer h6,
.parallax-footer p,
.parallax-footer a,
.parallax-footer ul,
.parallax-footer hr {
  position: relative;
  z-index: 1;
}
footer a:hover {
  text-decoration: underline;
}
</style>
