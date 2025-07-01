// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'        // ya carga todo el JS de Bootstrap

import '@/assets/main.css'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'

Amplify.configure(outputs)

const app = createApp(App)
app.use(router)
app.mount('#app')
