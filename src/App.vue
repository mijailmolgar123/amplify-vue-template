<!-- src/App.vue -->
<script setup lang="ts">
import SegurimaxHeader from '@/components/SegurimaxHeader.vue'
import Home from '@/components/Home.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <SegurimaxHeader />
  <router-view />
  <FooterComponent />
</template>
