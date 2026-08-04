<!-- src/App.vue -->
<script setup lang="ts">
import SegurimaxHeader from '@/components/SegurimaxHeader.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'
import QuoteCartDrawer from '@/components/QuoteCartDrawer.vue'
import QuoteCartBar from '@/components/QuoteCartBar.vue'
</script>

<template>
  <SegurimaxHeader />
  <router-view />
  <FooterComponent />
  <WhatsAppFloat />
  <QuoteCartBar />
  <QuoteCartDrawer />
</template>

<style>
html {
  scroll-padding-top: 5rem;
  scroll-behavior: smooth;
}
body.quote-open {
  overflow: hidden;
}
</style>
