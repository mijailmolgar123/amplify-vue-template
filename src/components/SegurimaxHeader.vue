<!-- src/components/SegurimaxHeader.vue -->
<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="@/assets/logo-segurimax.png" alt="Logo" width="40" height="40" class="me-2 rounded-circle" />
                <span class="fw-bold fs-4 text-white">Segurimax</span>
            </a>
            <div class="navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link text-white" href="#inicio">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#empresa">Empresa</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#productos">Productos</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#destacados">Destacados</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#clientes">Clientes</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#contacto">Contacto</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
// No requiere lógica adicional
</script>

<style scoped>
.nav-link {
    font-weight: 500;
    transition: color 0.2s;
}

.nav-link:hover {
    color: #47d462;
    /* un verde vivo al pasar */
}

nav.navbar {
    z-index: 1000;
}
</style>
