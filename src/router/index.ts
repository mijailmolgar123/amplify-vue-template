import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const routes = [
  { path: '/',           name: 'home',      component: Home },
  { path: '/productos',  name: 'productos', component: () => import('@/pages/Productos.vue') },
  { path: '/empresa',    name: 'empresa',   component: () => import('@/pages/Empresa.vue') },
  { path: '/marcas',     name: 'marcas',    component: () => import('@/pages/Socios.vue') },
  { path: '/socios',     redirect: '/marcas' },
  { path: '/contacto',   name: 'contacto',  component: () => import('@/pages/Contacto.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})
export default router
