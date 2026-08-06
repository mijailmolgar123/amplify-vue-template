// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'        // ya carga todo el JS de Bootstrap
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'

import '@/assets/base.css'
import '@/assets/main.css'

createApp(App).use(router).mount('#app')
