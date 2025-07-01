<!-- src/components/FeaturedProducts.vue -->
<template>
  <section id="destacados" class="py-5 bg-white">
    <div class="container">
      <h2 class="text-center fw-bold mb-4">Productos Destacados</h2>
      <p class="text-center text-secondary mb-5">
        Nuestra selección premium para las necesidades más exigentes.
      </p>

      <div class="row g-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-sm-6 col-md-4 col-lg-3"
        >
          <div class="card h-100 shadow-sm border-0">
            <img
              :src="product.image"
              class="card-img-top"
              :alt="product.title"
              style="object-fit: cover; height: 200px;"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold">{{ product.title }}</h5>
              <p class="card-text text-muted mb-4">{{ product.subtitle }}</p>
              <a
                :href="product.link"
                class="mt-auto btn btn-success"
              >
                Ver Detalles
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Importa tus imágenes como módulos ES
import cascoImg from '@/assets/product-casco.png'
import gafasImg from '@/assets/product-gafas.png'
import guantesImg from '@/assets/product-guantes.png'
import señalizacionImg from '@/assets/product-senalizacion.png'

interface Product {
  id: number
  title: string
  subtitle: string
  image: string
  link: string
}

const products = ref<Product[]>([
  {
    id: 1,
    title: 'Casco Industrial X200',
    subtitle: 'ANSI Z89.1 | Alta resistencia',
    image: cascoImg,
    link: '#'
  },
  {
    id: 2,
    title: 'Gafas Protectoras G-Visor',
    subtitle: 'Anti-empañante | UV 99%',
    image: gafasImg,
    link: '#'
  },
  {
    id: 3,
    title: 'Guantes UltraGrip',
    subtitle: 'Agarre superior | Talla única',
    image: guantesImg,
    link: '#'
  },
  {
    id: 4,
    title: 'Señalización Reflectante',
    subtitle: 'Alta visibilidad | Varios tamaños',
    image: señalizacionImg,
    link: '#'
  }
])
</script>

<style scoped>
/* Opcional: efecto “lift” al pasar el ratón */
.card:hover {
  transform: translateY(-5px);
  transition: transform 0.2s ease-in-out;
}
</style>
