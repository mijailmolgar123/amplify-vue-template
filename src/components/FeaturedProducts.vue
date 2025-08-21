<!-- src/components/FeaturedProducts.vue -->
<template>
  <section id="destacados" class="py-5 bg-white">
    <div class="container">
      <h2 class="text-center fw-bold mb-3">Productos Destacados</h2>
      <p class="text-center text-secondary mb-5">
        Nuestra selección premium para las necesidades más exigentes.
      </p>

      <div class="row g-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-6 col-sm-6 col-md-4 col-lg-3"
        >
          <div class="card h-100 shadow-sm border-0">
            <div class="product-figure">
              <img
                :src="product.image"
                :alt="product.title"
                class="img-fluid"
                loading="lazy"
              />
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold">{{ product.title }}</h5>
              <p class="card-text text-muted mb-4">{{ product.subtitle }}</p>
              <a :href="product.link" class="mt-auto btn btn-success">
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

interface Product {
  id: number
  title: string
  subtitle: string
  image: string
  link: string
}

// Imagenes desde /src/assets/products (con .href para convertir a string)
const imgBotiquin = new URL('@/assets/products/Botiquin.png', import.meta.url).href
const imgCanoa    = new URL('@/assets/products/Camilla de Rescate tipo canoa.jpg', import.meta.url).href
const imgGuantes  = new URL('@/assets/products/Guantes de seguridad multiflex.png', import.meta.url).href
const imgAntid    = new URL('@/assets/products/Kit antiderrame implementado.png', import.meta.url).href
const imgLavaojos = new URL('@/assets/products/Lavaojos portatil Haws Avlis LP075.jpg', import.meta.url).href
const imgLente    = new URL('@/assets/products/Lente de seguridad Sierra Elite - MSA.jpg', import.meta.url).href
const imgResp     = new URL('@/assets/products/Respirador de media cara de silicona serie 7500 - 3M.png', import.meta.url).href
const imgTyvek    = new URL('@/assets/products/Traje de seguridad desechable tipo TYVECK - Clute.jpg', import.meta.url).href

const products = ref<Product[]>([
  {
    id: 1,
    title: 'Botiquín de Primeros Auxilios',
    subtitle: 'Kit implementado | Suministros esenciales para emergencias',
    image: imgBotiquin,
    link: '#contacto'
  },
  {
    id: 2,
    title: 'Camilla de Rescate Tipo Canoa',
    subtitle: 'Alta rigidez | Transporte seguro en rescates',
    image: imgCanoa,
    link: '#contacto'
  },
  {
    id: 3,
    title: 'Guantes Multiflex CUT5 (Steelpro)',
    subtitle: 'Nivel de corte C/5 | Agarre superior',
    image: imgGuantes,
    link: '#contacto'
  },
  {
    id: 4,
    title: 'Kit Antiderrame Implementado',
    subtitle: 'Contención rápida | Mantenimiento limpio y seguro',
    image: imgAntid,
    link: '#contacto'
  },
  {
    id: 5,
    title: 'Lavaojos Portátil Haws Avlis LP075',
    subtitle: 'Respuesta inmediata | Cumplimiento normativo',
    image: imgLavaojos,
    link: '#contacto'
  },
  {
    id: 6,
    title: 'Lente de Seguridad Sierra Elite (MSA)',
    subtitle: 'Protección UV | Antiempañante',
    image: imgLente,
    link: '#contacto'
  },
  {
    id: 7,
    title: 'Respirador Media Cara 7500 (3M)',
    subtitle: 'Silicona suave | Compatible con filtros 3M',
    image: imgResp,
    link: '#contacto'
  },
  {
    id: 8,
    title: 'Traje Desechable Tipo Tyvek (Clute)',
    subtitle: 'Barrera particulada | Trabajo en ambientes críticos',
    image: imgTyvek,
    link: '#contacto'
  }
])
</script>

<style scoped>
/* Contenedor de la imagen: mismo alto para todas, imagen centrada y sin recorte */
.product-figure{
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 12px;
}
.product-figure img{
  max-height: 100%;
  width: auto;
  object-fit: contain;
}

/* Hover sutil */
.card:hover{
  transform: translateY(-4px);
  transition: transform .2s ease-in-out;
}
</style>
