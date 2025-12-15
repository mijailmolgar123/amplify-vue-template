import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const routes = [
  { path: '/',           name: 'home',      component: Home },
  { path: '/productos',  name: 'productos', component: () => import('@/pages/Productos.vue') },
  { path: '/empresa',    name: 'empresa',   component: () => import('@/pages/Empresa.vue') },
  { path: '/socios',     name: 'socios',    component: () => import('@/pages/Socios.vue') },
  { path: '/contacto',   name: 'contacto',  component: () => import('@/pages/Contacto.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;  
