<template>
  <main class="not-found">
    <div class="container not-found__inner">
      <p>ERROR 404</p>
      <h1>Esta página no existe.</h1>
      <span>Revisa la dirección o vuelve al catálogo de Segurimax.</span>
      <RouterLink to="/productos">Ver productos <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></RouterLink>
    </div>
  </main>
</template>

<style scoped>
.not-found { min-height: 68vh; display: grid; place-items: center; color: #fff; background: var(--brand-forest-deep); }
.not-found__inner { padding-block: 5rem; text-align: center; }
.not-found p { margin: 0 0 .8rem; color: var(--brand-yellow); font-size: .72rem; font-weight: 900; letter-spacing: .2em; }
.not-found h1 { margin: 0; color: #fff; font-size: clamp(2.8rem, 7vw, 6rem); }
.not-found span { display: block; margin: 1rem auto 2rem; color: rgba(255,255,255,.68); }
.not-found a { display: inline-flex; align-items: center; gap: .7rem; padding: .9rem 1.2rem; border-radius: 8px; color: var(--brand-ink); background: var(--brand-yellow); font-weight: 900; text-decoration: none; }
</style>
