<template>
    <div class="d-flex flex-column min-vh-100 bg-white">

        <!-- Hero Section -->
        <HeroSection />

        <FeaturedProducts />

        <!-- Empresa Section -->
        <section id="empresa" class="py-5 bg-light">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="fw-bold">Nuestra Empresa</h2>
                    <p class="text-secondary">
                        Comprometidos con la seguridad industrial desde 2008, ofrecemos soluciones integrales
                        para la protección de trabajadores en diversos sectores industriales.
                    </p>
                </div>
                <div class="row g-4 text-center">
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body">
                                <div class="bg-success text-white rounded-circle mx-auto mb-3"
                                    style="width:4rem; height:4rem; display:flex; align-items:center; justify-content:center;">
                                    <span class="fs-4 fw-bold">15+</span>
                                </div>
                                <h5 class="card-title fw-bold">Años de Experiencia</h5>
                                <p class="card-text text-secondary">Liderando el mercado de seguridad industrial</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body">
                                <div class="bg-success text-white rounded-circle mx-auto mb-3"
                                    style="width:4rem; height:4rem; display:flex; align-items:center; justify-content:center;">
                                    <span class="fs-4 fw-bold">500+</span>
                                </div>
                                <h5 class="card-title fw-bold">Empresas Clientes</h5>
                                <p class="card-text text-secondary">Confían en nuestros productos y servicios</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body">
                                <div class="bg-success text-white rounded-circle mx-auto mb-3"
                                    style="width:4rem; height:4rem; display:flex; align-items:center; justify-content:center;">
                                    <span class="fw-bold">ISO</span>
                                </div>
                                <h5 class="card-title fw-bold">Certificación ISO</h5>
                                <p class="card-text text-secondary">Calidad garantizada internacionalmente</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contacto Section -->
        <section id="contacto" class="py-5">
            <div class="container">
                <h3 class="text-center fw-bold mb-4">Contáctanos</h3>
                <p class="text-center text-secondary mb-5">...</p>
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <form ref="formContacto" @submit.prevent="handleSubmit" novalidate>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="nombre" class="form-label">Nombre *</label>
                                    <input v-model="form.nombre" type="text" id="nombre" class="form-control"
                                        required />
                                </div>
                                <!-- Resto de campos igual -->
                            </div>
                            <div class="text-center mt-4">
                                <button type="submit" class="btn btn-success btn-lg px-5">
                                    Enviar Solicitud
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>


        <!-- Footer -->
        <footer class="mt-auto bg-dark text-white py-4">
            <div class="container">
                <div class="row gy-3">
                    <div class="col-md-3">
                        <h6 class="fw-bold">Segurimax</h6>
                        <p class="small text-secondary">
                            Líderes en implementos de seguridad industrial con compromiso hacia la excelencia y la
                            protección.
                        </p>
                    </div>
                    <div class="col-md-3">
                        <h6 class="fw-semibold">Productos</h6>
                        <ul class="list-unstyled small">
                            <li><a href="#" class="text-white text-decoration-none">Cascos de Seguridad</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Protección Visual</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Equipos EPP</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Señalización</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3">
                        <h6 class="fw-semibold">Servicios</h6>
                        <ul class="list-unstyled small">
                            <li><a href="#" class="text-white text-decoration-none">Asesoría Técnica</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Capacitación</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Mantenimiento</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Soporte 24/7</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3">
                        <h6 class="fw-semibold">Empresa</h6>
                        <ul class="list-unstyled small">
                            <li><a href="#" class="text-white text-decoration-none">Sobre Nosotros</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Certificaciones</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Noticias</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Contacto</a></li>
                        </ul>
                    </div>
                </div>
                <hr class="border-secondary" />
                <p class="text-center small mb-0">&copy; 2024 Segurimax. Todos los derechos reservados.</p>
            </div>
        </footer>

    </div>
</template>

<script setup lang="ts">
import SegurimaxHeader from '@/components/SegurimaxHeader.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import HeroSection from '@/components/HeroSection.vue'
import { reactive, toRefs } from 'vue'

// estado reactivo del formulario
const form = reactive({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    productos: '',
})

function handleSubmit() {
    alert('¡Gracias por tu solicitud! Te contactaremos pronto.')
    // resetear campos
    Object.assign(form, {
        nombre: '',
        empresa: '',
        email: '',
        telefono: '',
        productos: '',
    })
}

</script>

<style scoped>
.navbar-brand img {
    object-fit: cover;
    border-radius: 50%;
}

.nav-link {
    font-weight: 500;
    transition: color 0.2s;
}

.nav-link:hover {
    color: #047857;
    /* verde Segurimax */
}
</style>
