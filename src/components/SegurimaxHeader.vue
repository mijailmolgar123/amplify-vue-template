<template>
  <nav class="navbar navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="#inicio">
        <img src="@/assets/logo-segurimax.png" alt="Logo" width="40" height="40" class="me-2 rounded-circle" />
        <span class="fw-bold fs-4 text-white">Segurimax Peru</span>
      </a>

      <!-- Botón hamburguesa -->
      <button class="navbar-toggler" type="button"
              data-bs-toggle="offcanvas" data-bs-target="#mainMenu"
              aria-controls="mainMenu" aria-label="Abrir menú">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menú lateral -->
      <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="mainMenu" aria-labelledby="mainMenuLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="mainMenuLabel">Menú</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link text-white" href="#inicio"       @click.prevent="goTo('#inicio')">Inicio</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="#destacados"   @click.prevent="goTo('#destacados')">Productos destacados</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="#empresa"      @click.prevent="goTo('#empresa')">Empresa</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="#clientes"     @click.prevent="goTo('#clientes')">Clientes</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="#contacto"     @click.prevent="goTo('#contacto')">Contacto</a></li>
           </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
function goTo(hash: string) {
  const target = document.querySelector(hash) as HTMLElement | null
  if (!target) return

  const off = document.getElementById('mainMenu') // tu offcanvas
  // si el offcanvas está abierto, espera a que se esconda para scrollear
  if (off?.classList.contains('show')) {
    // dispara el cierre
    ;(off.querySelector('[data-bs-dismiss="offcanvas"]') as HTMLElement)?.click()
    // da tiempo a que Bootstrap libere el body-scroll
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.nav-link { font-weight: 500; transition: color .2s; }
.nav-link:hover { color: #47d462; }
nav.navbar { z-index: 1050; } /* un poco más que el default */
:global(section[id]) { scroll-margin-top: 76px; }
</style>
