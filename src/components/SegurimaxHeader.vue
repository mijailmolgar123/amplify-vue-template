<template>
  <header class="segurimax-header">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a
          class="navbar-brand d-flex align-items-center text-white"
          href="#inicio"
          @click.prevent="goTo('#inicio')"
        >
          <img src="@/assets/logo-segurimax.png" alt="Logo Segurimax" class="logo me-2" />
          <div class="brand-copy">
            <span class="fw-bold fs-4">Segurimax Peru</span>
            <small class="text-uppercase">Soluciones integrales para tu operación</small>
          </div>
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainMenu"
          aria-controls="mainMenu"
          aria-expanded="false"
          aria-label="Abrir navegación"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainMenu">
          <ul class="navbar-nav mx-auto mb-3 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#inicio" @click.prevent="goTo('#inicio')">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#destacados" @click.prevent="goTo('#destacados')">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#empresa" @click.prevent="goTo('#empresa')">Empresa</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#clientes" @click.prevent="goTo('#clientes')">Clientes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contacto" @click.prevent="goTo('#contacto')">Contacto</a>
            </li>
          </ul>

          <button class="btn btn-cta ms-lg-3" @click.prevent="goTo('#contacto')">
            Solicitar Cotización
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
function goTo(hash: string) {
  const target = document.querySelector(hash) as HTMLElement | null
  if (!target) return

  const collapse = document.getElementById('mainMenu')
  if (collapse?.classList.contains('show')) {
    const toggler = document.querySelector<HTMLButtonElement>('[data-bs-target="#mainMenu"]')
    toggler?.click()
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250)
    return
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.segurimax-header {
  position: sticky;
  top: 0;
  z-index: 1100;
  isolation: isolate;
}
.segurimax-header::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(120deg, rgba(1, 19, 8, 0.92), rgba(3, 43, 24, 0.78)),
    url('@/assets/fondo.png') center/cover no-repeat;
  background-attachment: fixed;
  filter: brightness(0.9);
}
.navbar {
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
  background: transparent;
}
.navbar-brand small {
  display: block;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.7);
}
.navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
}
.navbar-nav .nav-link:hover,
.navbar-nav .nav-link:focus {
  color: var(--brand-green, #4de894);
}
.btn-cta {
  font-weight: 700;
  color: #042413;
  background: linear-gradient(120deg, #c1ff8c, #5ff0ae);
  border-radius: 999px;
  padding: 0.55rem 1.8rem;
  border: none;
  box-shadow: 0 12px 30px rgba(79, 239, 177, 0.35);
}
.btn-cta:hover {
  color: #02160b;
  box-shadow: 0 14px 35px rgba(79, 239, 177, 0.45);
  transform: translateY(-1px);
}
.logo {
  width: 52px;
  height: auto;
  display: block;
}
:global(section[id]) {
  scroll-margin-top: 90px;
}
</style>
