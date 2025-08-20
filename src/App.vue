<!-- src/App.vue -->
<script setup lang="ts">
import SegurimaxHeader from '@/components/SegurimaxHeader.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'
</script>

<template>
  <SegurimaxHeader />
  <router-view />
  <FooterComponent />
  <WhatsAppFloat />
</template>

<style>
html {
  scroll-padding-top: 5rem; /* Ajusta según la altura real del header */
  scroll-behavior: smooth;  /* (opcional) para desplazamiento suave */
}
</style>
