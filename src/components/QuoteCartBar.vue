<template>
  <Teleport to="body">
    <Transition name="quote-bar">
      <button
        v-if="itemCount > 0"
        class="quote-cart-bar"
        type="button"
        :aria-label="`Ver mi requerimiento: ${items.length} partidas, ${itemCount} unidades`"
        @click="openCart"
      >
        <span class="quote-cart-bar__icon" aria-hidden="true">
          <i class="fa-solid fa-list-check"></i>
          <strong>{{ itemCount }}</strong>
        </span>
        <span class="quote-cart-bar__copy" aria-live="polite">
          <strong>{{ displayName }}</strong>
          <small>{{ summary }}</small>
        </span>
        <span class="quote-cart-bar__action">
          Ver requerimiento
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </span>
      </button>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { useQuoteCart } from '@/composables/useQuoteCart'

const { items, itemCount, lastAddedName, openCart } = useQuoteCart()

const displayName = computed(() => lastAddedName.value || items.value.at(-1)?.name || 'Mi requerimiento')
const summary = computed(() => {
  const products = `${items.value.length} ${items.value.length === 1 ? 'partida' : 'partidas'}`
  const units = `${itemCount.value} ${itemCount.value === 1 ? 'unidad' : 'unidades'}`
  return `${products} · ${units}`
})

watch(
  itemCount,
  (count) => document.body.classList.toggle('cart-has-items', count > 0),
  { immediate: true },
)

onBeforeUnmount(() => document.body.classList.remove('cart-has-items'))
</script>

<style scoped>
.quote-cart-bar { position: fixed; z-index: 2050; right: 90px; bottom: max(18px, env(safe-area-inset-bottom)); width: min(430px, calc(100vw - 120px)); display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: .8rem; min-height: 70px; padding: .75rem .85rem; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; color: #fff; background: var(--brand-forest-deep); box-shadow: 0 20px 55px rgba(3,22,14,.32); text-align: left; }
.quote-cart-bar__icon { position: relative; width: 44px; height: 44px; display: grid; place-items: center; border-radius: 8px; color: var(--brand-ink); background: var(--brand-yellow); }
.quote-cart-bar__icon strong { position: absolute; top: -7px; right: -7px; min-width: 21px; height: 21px; display: grid; place-items: center; padding: 0 .25rem; border-radius: 5px; color: #fff; background: var(--brand-green); font-size: .66rem; }
.quote-cart-bar__copy { min-width: 0; display: grid; gap: .08rem; }
.quote-cart-bar__copy strong { overflow: hidden; color: #fff; font-size: .84rem; text-overflow: ellipsis; white-space: nowrap; }
.quote-cart-bar__copy small { color: rgba(255,255,255,.62); font-size: .73rem; }
.quote-cart-bar__action { display: inline-flex; align-items: center; gap: .45rem; color: var(--brand-yellow); font-size: .77rem; font-weight: 850; white-space: nowrap; }
.quote-cart-bar:hover .quote-cart-bar__action i { transform: translateX(3px); }
.quote-cart-bar__action i { transition: transform .2s ease; }
.quote-bar-enter-active, .quote-bar-leave-active { transition: opacity .22s ease, transform .22s ease; }
.quote-bar-enter-from, .quote-bar-leave-to { opacity: 0; transform: translateY(18px); }
@media (max-width: 767.98px) {
  .quote-cart-bar { right: 0; bottom: 0; width: 100%; min-height: 76px; padding: .75rem 1rem calc(.75rem + env(safe-area-inset-bottom)); border-width: 1px 0 0; border-radius: 0; }
  .quote-cart-bar__action { font-size: 0; }
  .quote-cart-bar__action i { font-size: .9rem; }
  :global(body.cart-has-items) { padding-bottom: calc(76px + env(safe-area-inset-bottom)); }
  :global(body.cart-has-items .whatsapp-fab) { bottom: calc(88px + env(safe-area-inset-bottom)); }
}
@media (prefers-reduced-motion: reduce) {
  .quote-bar-enter-active, .quote-bar-leave-active, .quote-cart-bar__action i { transition: none; }
}
</style>
