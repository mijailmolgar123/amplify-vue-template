<template>
  <section id="inicio" class="hero-section">
    <div class="overlay"></div>
    <div class="hero-content container text-center">
      <h1 class="display-4 fw-bold mb-3">
        Protección Industrial de<br />
        <span class="highlight">Clase Mundial</span>
      </h1>
      <p class="lead mb-4">
        Segurimax es líder en implementos de seguridad industrial con más de 5 años de experiencia.
      </p>
      <div class="d-flex flex-wrap justify-content-center gap-3">
        <a href="#destacados" class="btn btn-primary btn-lg">Ver Catálogo</a>
        <button class="btn btn-outline-light btn-lg"
                @click="scrollToContacto">
          Solicitar Cotización
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
function scrollToContacto() {
  const el = document.getElementById('contacto')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* IMPORTA UNA FUENTE MÁS PROFESIONAL */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.hero-section {
  position: relative;
  /* 1. imagen de fondo */
  background: url('@/assets/fondo.png') center/cover no-repeat;
  padding: 6rem 0;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}
.hero-section .overlay {
  /* 2. overlay semitransparente */
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.hero-section .hero-content {
  /* 3. contenido por encima */
  position: relative;
  z-index: 2;
}
.hero-section h1 {
  font-size: 3rem;
}
.hero-section .highlight {
  color: #3acaf4; /* un azul más vibrante */
}
.hero-section .btn {
  /* botones más grandes y nítidos */
  font-weight: 600;
  padding: 0.85rem 2rem;
  border-radius: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}
.hero-section .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}
</style>
