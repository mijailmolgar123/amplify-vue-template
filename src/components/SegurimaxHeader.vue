<template>
  <header class="segurimax-header">
    <nav class="navbar navbar-dark">
      <div class="container align-items-center">
        <a
          class="navbar-brand d-flex align-items-center text-white"
          href="/"
          @click.prevent="goTo('/')"
        >
          <img src="@/assets/logo-segurimax.png" alt="Logo Segurimax" class="logo me-2" />
          <div class="brand-copy">
            <span class="fw-bold fs-4">Segurimax Peru</span>
            <small class="text-uppercase">Soluciones integrales</small>
          </div>
        </a>

        <div class="primary-nav d-none d-xl-flex align-items-center ms-4 flex-grow-1">
          <ul class="navbar-nav mb-0 flex-row gap-3">
            <li class="nav-item" v-for="link in navLinks" :key="link.path">
              <RouterLink class="nav-link" :to="link.path" @click="handleNavClick">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="header-actions ms-auto d-flex align-items-center gap-2">
          <button class="btn btn-cta d-none d-lg-inline-flex" @click.prevent="goTo('/contacto')">
            Solicitar Cotizacion
          </button>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#menuOffcanvas"
            aria-controls="menuOffcanvas"
            aria-label="Abrir menu"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>

    <div
      class="offcanvas offcanvas-end text-bg-dark"
      tabindex="-1"
      id="menuOffcanvas"
      aria-labelledby="menuOffcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="menuOffcanvasLabel">Menu</h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar"
        ></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="link in navLinks" :key="`offcanvas-${link.path}`">
            <RouterLink class="nav-link text-white" :to="link.path" @click="handleNavClick">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
        <button class="btn btn-cta w-100 mt-4" @click.prevent="goTo('/contacto')">
          Solicitar Cotizacion
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navLinks = [
  { label: 'Inicio',     path: '/' },
  { label: 'Productos',  path: '/productos' },
  { label: 'Empresa',    path: '/empresa' },
  { label: 'Socios',     path: '/socios' },
  { label: 'Contacto',   path: '/contacto' }
]

function goTo(path: string) {
  closeOffcanvas()
  router.push(path)
}

function handleNavClick() {
  closeOffcanvas()
}

function closeOffcanvas() {
  const offcanvas = document.getElementById('menuOffcanvas')
  if (offcanvas?.classList.contains('show')) {
    ;(offcanvas.querySelector('[data-bs-dismiss="offcanvas"]') as HTMLElement)?.click()
  }
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
  background-attachment: scroll, fixed;
  filter: brightness(0.9);
}
.navbar {
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
  background: transparent;
}
.primary-nav .navbar-nav {
  margin-left: auto;
  margin-right: auto;
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
.header-actions .navbar-toggler {
  border-color: rgba(255, 255, 255, 0.4);
  border-width: 1px;
}
.logo {
  width: 52px;
  height: auto;
  display: block;
}
:global(section[id]) {
  scroll-margin-top: 90px;
}
@media (max-width: 991.98px) {
  .segurimax-header::before {
    background-attachment: scroll, scroll;
  }
  .primary-nav {
    display: none !important;
  }
}
</style>
