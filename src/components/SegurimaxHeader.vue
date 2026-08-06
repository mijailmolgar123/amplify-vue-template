<template>
  <header class="segurimax-header">
    <nav class="navbar navbar-dark">
      <div class="container header-inner">
        <a class="navbar-brand" href="/" @click.prevent="goTo('/')">
          <img src="@/assets/logo-segurimax.png" alt="Segurimax Perú" class="logo" />
          <div class="brand-copy">
            <strong>Segurimax Perú</strong>
            <small>Abastecimiento B2B</small>
          </div>
        </a>

        <div class="primary-nav d-none d-lg-flex">
          <RouterLink v-for="link in navLinks" :key="link.path" class="nav-link" :to="link.path">
            {{ link.label }}
          </RouterLink>
        </div>

        <div class="header-actions">
          <button class="search-action d-none d-lg-inline-flex" type="button" aria-label="Buscar productos" @click="goTo('/productos')">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </button>
          <button
            class="quote-action"
            type="button"
            :aria-label="`Abrir mi requerimiento. ${itemCount} unidades seleccionadas`"
            @click="openCart"
          >
            <i class="fa-solid fa-list-check" aria-hidden="true"></i>
            <span class="quote-action__label">Mi requerimiento</span>
            <span class="quote-count" aria-label="Productos seleccionados">{{ itemCount }}</span>
          </button>
          <button
            class="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#menuOffcanvas"
            aria-controls="menuOffcanvas"
            aria-label="Abrir menú"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>

    <div
      class="offcanvas offcanvas-end mobile-menu"
      tabindex="-1"
      id="menuOffcanvas"
      aria-labelledby="menuOffcanvasLabel"
    >
      <div class="offcanvas-header">
        <div>
          <small>SEGURIMAX PERÚ</small>
          <h2 class="offcanvas-title" id="menuOffcanvasLabel">Menú</h2>
        </div>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
      </div>
      <div class="offcanvas-body">
        <nav class="mobile-nav" aria-label="Navegación móvil">
          <RouterLink v-for="link in navLinks" :key="`mobile-${link.path}`" :to="link.path" @click="closeOffcanvas">
            <span>{{ link.label }}</span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </RouterLink>
        </nav>
        <button class="mobile-quote" type="button" @click="openCartFromMenu">
          <i class="fa-solid fa-list-check" aria-hidden="true"></i>
          Abrir mi requerimiento
          <span>{{ itemCount }}</span>
        </button>
        <a class="mobile-whatsapp" href="https://wa.me/51996665221" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
          Hablar con un asesor
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuoteCart } from '@/composables/useQuoteCart'

const router = useRouter()
const { itemCount, openCart } = useQuoteCart()

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Soluciones', path: '/soluciones' },
  { label: 'Productos', path: '/productos' },
  { label: 'Cómo trabajamos', path: '/como-trabajamos' },
  { label: 'Empresa', path: '/empresa' },
  { label: 'Contacto', path: '/contacto' },
]

function goTo(path: string) {
  closeOffcanvas()
  router.push(path)
}

function openCartFromMenu() {
  closeOffcanvas()
  window.setTimeout(openCart, 180)
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
  color: #fff;
  background: rgba(4, 29, 19, .96);
  border-bottom: 1px solid rgba(255,255,255,.09);
  backdrop-filter: blur(18px);
}
.navbar { min-height: 82px; padding: .55rem 0; }
.header-inner { display: flex; align-items: center; gap: 1.5rem; }
.navbar-brand { display: inline-flex; align-items: center; gap: .7rem; margin: 0; color: #fff; }
.logo { width: 48px; height: 48px; object-fit: contain; }
.brand-copy { display: grid; line-height: 1.05; }
.brand-copy strong { font-family: var(--font-display); font-size: 1.22rem; font-weight: 400; letter-spacing: -.01em; white-space: nowrap; }
.brand-copy small { margin-top: .36rem; color: rgba(255,255,255,.56); font-size: .62rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
.primary-nav { flex: 1; align-items: center; justify-content: center; gap: .15rem; }
.primary-nav .nav-link { position: relative; padding: .6rem .78rem; color: rgba(255,255,255,.75); font-size: .84rem; font-weight: 750; }
.primary-nav .nav-link::after { content: ''; position: absolute; left: .78rem; right: .78rem; bottom: .24rem; height: 2px; background: var(--brand-yellow); transform: scaleX(0); transition: transform .2s ease; }
.primary-nav .nav-link:hover, .primary-nav .router-link-active { color: #fff; }
.primary-nav .nav-link:hover::after, .primary-nav .router-link-active::after { transform: scaleX(1); }
.header-actions { display: flex; align-items: center; gap: .55rem; margin-left: auto; }
.search-action { width: 44px; height: 44px; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,.18); border-radius: 8px; color: #fff; background: transparent; }
.quote-action { min-height: 48px; display: inline-flex; align-items: center; gap: .58rem; padding: .65rem .75rem .65rem 1rem; border: 0; border-radius: 8px; color: var(--brand-ink); background: var(--brand-yellow); font-size: .86rem; font-weight: 900; }
.quote-count { min-width: 27px; height: 27px; display: grid; place-items: center; padding: 0 .35rem; border-radius: 6px; color: #fff; background: var(--brand-forest); font-size: .75rem; }
.navbar-toggler { width: 46px; height: 46px; padding: .45rem; border-color: rgba(255,255,255,.25); }
.mobile-menu {
  --bs-offcanvas-width: min(88vw, 390px);
  height: 100vh;
  height: 100svh;
  overflow-y: auto;
  color: #fff;
  background: var(--brand-forest);
}
.offcanvas-header { padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,.1); }
.offcanvas-header small { color: var(--brand-yellow); font-size: .68rem; font-weight: 900; letter-spacing: .18em; }
.offcanvas-title { margin-top: .35rem; color: #fff; font-size: 2rem; }
.offcanvas-body { display: flex; flex-direction: column; padding: 1.25rem 1.5rem 1.5rem; }
.mobile-nav { display: grid; }
.mobile-nav a { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,.1); color: #fff; font-size: 1.08rem; font-weight: 800; text-decoration: none; }
.mobile-nav i { color: var(--brand-yellow); font-size: .8rem; }
.mobile-quote, .mobile-whatsapp { min-height: 54px; display: flex; align-items: center; justify-content: center; gap: .65rem; margin-top: 1.4rem; border: 0; border-radius: 8px; font-weight: 900; text-decoration: none; }
.mobile-quote { color: var(--brand-ink); background: var(--brand-yellow); }
.mobile-quote span { min-width: 26px; height: 26px; display: grid; place-items: center; border-radius: 5px; color: #fff; background: var(--brand-forest); }
.mobile-whatsapp { margin-top: .7rem; color: #fff; background: rgba(255,255,255,.09); }
:global(section[id]) { scroll-margin-top: 90px; }
@media (max-width: 1199.98px) {
  .primary-nav .nav-link { padding-inline: .55rem; font-size: .8rem; }
  .quote-action__label { display: none; }
  .quote-action { padding-inline: .8rem; }
}
@media (max-width: 575.98px) {
  .navbar { min-height: 74px; }
  .logo { width: 43px; height: 43px; }
  .brand-copy strong { font-size: 1.02rem; }
  .brand-copy small { font-size: .52rem; }
  .quote-action { min-width: 44px; min-height: 44px; padding: .55rem; }
  .quote-action > i { display: none; }
  .header-actions { gap: .4rem; }
}
</style>
