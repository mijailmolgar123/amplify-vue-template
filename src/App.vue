<!-- src/App.vue -->
<script setup lang="ts">
import SegurimaxHeader from '@/components/SegurimaxHeader.vue'
import Home from '@/components/Home.vue'
</script>

<template>
  <SegurimaxHeader />
  <router-view />
  <Home /> <!-- Home ya sólo renderiza hero, productos, etc. -->
</template>
