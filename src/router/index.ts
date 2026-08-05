import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import Home from '@/pages/Home.vue'
import { catalogProducts, getCategory, getProtectionType } from '@/data/catalog'
import { getProductSlug } from '@/utils/productSlug'
import { absoluteSiteUrl, applySeo, type SeoConfig } from '@/utils/seo'

const routes = [
  {
    path: '/', name: 'home', component: Home,
    meta: { seo: { title: 'Segurimax Perú | EPP y seguridad industrial para empresas', description: 'Cotiza equipos de protección personal, ropa industrial, señalización y suministros para empresas en Perú.', path: '/' } },
  },
  {
    path: '/productos', name: 'productos', component: () => import('@/pages/Productos.vue'),
    meta: { seo: { title: 'Catálogo de EPP y seguridad industrial', description: 'Explora cascos, guantes, respiradores, lentes, protección auditiva, trabajo en altura, ropa industrial y equipos de oxicorte.', path: '/productos' } },
  },
  {
    path: '/productos/:slug',
    name: 'producto',
    component: () => import('@/pages/ProductoDetalle.vue'),
    beforeEnter: (to: RouteLocationNormalized) => catalogProducts.some((product) => getProductSlug(product) === to.params.slug) || { name: 'not-found' },
  },
  {
    path: '/empresa', name: 'empresa', component: () => import('@/pages/Empresa.vue'),
    meta: { seo: { title: 'Empresa', description: 'Conoce cómo Segurimax atiende y consolida requerimientos de seguridad industrial para empresas en Perú.', path: '/empresa' } },
  },
  {
    path: '/marcas', name: 'marcas', component: () => import('@/pages/Socios.vue'),
    meta: { seo: { title: 'Marcas de seguridad industrial', description: 'Consulta productos 3M, MSA, Steelpro, Delta Plus, Ansell, Clute, Victor y otras marcas de seguridad industrial.', path: '/marcas' } },
  },
  { path: '/socios',     redirect: '/marcas' },
  {
    path: '/contacto', name: 'contacto', component: () => import('@/pages/Contacto.vue'),
    meta: { seo: { title: 'Contacto y cotizaciones', description: 'Solicita una cotización de EPP, seguridad industrial y suministros empresariales por WhatsApp o correo.', path: '/contacto' } },
  },
  {
    path: '/404', name: 'not-found', component: () => import('@/pages/NotFound.vue'),
    meta: { seo: { title: 'Página no encontrada', description: 'La página solicitada no existe.', path: '/404', robots: 'noindex,nofollow' } },
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
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

router.afterEach((to) => {
  if (to.name === 'producto') {
    const product = catalogProducts.find((item) => getProductSlug(item) === to.params.slug)
    if (!product) return

    const productPath = `/productos/${getProductSlug(product)}`
    const category = getCategory(product.category)?.label
    const protection = getProtectionType(product.protectionTypes[0])?.label
    const classification = [category, protection].filter(Boolean).join(' · ')
    const productUrl = absoluteSiteUrl(productPath)
    const productImage = absoluteSiteUrl(product.image)

    applySeo({
      title: product.name,
      description: `${product.excerpt} Consulta disponibilidad y cotiza con Segurimax Perú.`,
      path: productPath,
      image: product.image,
      type: 'product',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            '@id': `${productUrl}#product`,
            name: product.name,
            description: product.excerpt,
            image: [productImage],
            url: productUrl,
            ...(product.sku ? { sku: product.sku } : {}),
            ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
            ...(classification ? { category: classification } : {}),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteSiteUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Productos', item: absoluteSiteUrl('/productos') },
              { '@type': 'ListItem', position: 3, name: product.name, item: productUrl },
            ],
          },
        ],
      },
    })
    return
  }

  const seo = to.meta.seo as SeoConfig | undefined
  if (seo) applySeo(seo)
})

export default router
