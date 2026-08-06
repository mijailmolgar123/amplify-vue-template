import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getProductSlug, readCatalogProducts } from './catalog-seo-data.mjs'

const siteUrl = 'https://segurimax-peru.com'
const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const distDir = path.join(projectRoot, 'dist')
const assetsDir = path.join(distDir, 'assets')
const template = readFileSync(path.join(distDir, 'index.html'), 'utf8')
const assetFiles = readdirSync(assetsDir)

const staticPages = [
  {
    path: '/',
    title: 'Abastecimiento industrial y EPP para empresas | Segurimax Perú',
    description: 'Gestionamos EPP, ropa de trabajo, herramientas, equipos e insumos industriales. Envía tu requerimiento y consolida tu compra con Segurimax Perú.',
    heading: 'Requerimientos de abastecimiento para empresas',
    body: 'Búsqueda de productos, alternativas y compras consolidadas para operaciones empresariales.',
  },
  {
    path: '/soluciones',
    title: 'Soluciones de abastecimiento industrial | Segurimax Perú',
    description: 'Procura de EPP, ropa, herramientas, equipos, insumos operativos y productos industriales bajo pedido para empresas en Perú.',
    heading: 'Soluciones de abastecimiento industrial',
    body: 'Seguridad industrial, herramientas, equipos, insumos y búsqueda de productos especiales.',
  },
  {
    path: '/productos',
    title: 'Abastecimiento industrial, EPP y equipos para empresas | Segurimax Perú',
    description: 'Explora el catálogo referencial de Segurimax o solicita productos industriales, EPP, herramientas e insumos especiales bajo pedido.',
    heading: 'Productos y soluciones para tu operación',
    body: 'Catálogo referencial y gestión de productos especiales bajo pedido.',
  },
  {
    path: '/como-trabajamos',
    title: 'Cómo gestionamos requerimientos empresariales | Segurimax Perú',
    description: 'Conoce el proceso de Segurimax para recibir, validar, buscar alternativas, consolidar propuestas y coordinar requerimientos B2B.',
    heading: 'Cómo trabajamos los requerimientos B2B',
    body: 'Del requerimiento inicial a una propuesta consolidada y coordinada.',
  },
  {
    path: '/empresa',
    title: 'Empresa | Segurimax Perú',
    description: 'Conoce cómo Segurimax atiende y consolida requerimientos de seguridad industrial para empresas en Perú.',
    heading: 'Segurimax Perú',
    body: 'Atención directa, catálogo multimarca y cotizaciones consolidadas para requerimientos empresariales.',
  },
  {
    path: '/marcas',
    title: 'Marcas de seguridad industrial | Segurimax Perú',
    description: 'Consulta productos 3M, MSA, Steelpro, Delta Plus, Ansell, Clute, Victor y otras marcas de seguridad industrial.',
    heading: 'Marcas disponibles en Segurimax',
    body: 'Encuentra productos publicados por marca o consulta disponibilidad directamente con ventas.',
  },
  {
    path: '/contacto',
    title: 'Enviar requerimiento de abastecimiento | Segurimax Perú',
    description: 'Solicita EPP, herramientas, equipos, insumos industriales o productos especiales por WhatsApp o correo con Segurimax Perú.',
    heading: 'Envía tu requerimiento a Segurimax Perú',
    body: 'Comparte una lista, fotografía, código o ficha técnica para iniciar la gestión.',
  },
]

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function absoluteUrl(route) {
  return new URL(route, siteUrl).toString()
}

function replaceMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`, 'i')
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}">`
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function resolveProductImage(sourcePath) {
  if (typeof sourcePath !== 'string') return undefined
  const sourceName = path.basename(sourcePath, path.extname(sourcePath))
  const builtName = assetFiles.find((file) => file.startsWith(`${sourceName}-`))
  return builtName ? absoluteUrl(`/assets/${builtName}`) : undefined
}

function renderPage({ route, title, description, heading, body, image, jsonLd, details = '' }) {
  const canonical = absoluteUrl(route)
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>\s*/gi, '')

  html = replaceMeta(html, 'name', 'description', description)
  html = replaceMeta(html, 'name', 'robots', 'index,follow')
  html = replaceMeta(html, 'property', 'og:type', image ? 'product' : 'website')
  html = replaceMeta(html, 'property', 'og:url', canonical)
  html = replaceMeta(html, 'property', 'og:title', title)
  html = replaceMeta(html, 'property', 'og:description', description)
  html = replaceMeta(html, 'name', 'twitter:card', image ? 'summary_large_image' : 'summary')
  html = replaceMeta(html, 'name', 'twitter:title', title)
  html = replaceMeta(html, 'name', 'twitter:description', description)
  if (image) {
    html = replaceMeta(html, 'property', 'og:image', image)
    html = replaceMeta(html, 'name', 'twitter:image', image)
  }

  const canonicalTag = `<link rel="canonical" href="${canonical}">`
  const structuredData = jsonLd
    ? `<script type="application/ld+json" data-seo-prerender>${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`
    : ''
  html = html.replace('</head>', `    ${canonicalTag}\n    ${structuredData}\n  </head>`)

  const visibleContent = `<div id="app"><main data-seo-prerender><nav><a href="/">Inicio</a> · <a href="/productos">Productos</a></nav><article><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(body)}</p>${details}</article></main></div>`
  html = html.replace('<div id="app"></div>', visibleContent)
  return html
}

function writeRoute(route, html) {
  if (route === '/') {
    writeFileSync(path.join(distDir, 'index.html'), html)
    return
  }
  const cleanPath = route.replace(/^\//, '')
  const extensionPath = path.join(distDir, `${cleanPath}.html`)
  mkdirSync(path.dirname(extensionPath), { recursive: true })
  writeFileSync(extensionPath, html)

  const directory = path.join(distDir, cleanPath)
  mkdirSync(directory, { recursive: true })
  writeFileSync(path.join(directory, 'index.html'), html)
}

for (const page of staticPages) {
  writeRoute(page.path, renderPage({ route: page.path, ...page }))
}

const products = readCatalogProducts()
for (const product of products) {
  const route = `/productos/${getProductSlug(product)}`
  const image = resolveProductImage(product.image)
  const title = `${product.name} | Segurimax Perú`
  const description = `${product.excerpt} Consulta disponibilidad y cotiza con Segurimax Perú.`
  const productUrl = absoluteUrl(route)
  const tags = Array.isArray(product.tags) ? product.tags : []
  const details = [
    product.sku ? `<p><strong>Código:</strong> ${escapeHtml(product.sku)}</p>` : '',
    product.brand ? `<p><strong>Marca:</strong> ${escapeHtml(product.brand)}</p>` : '',
    tags.length ? `<ul>${tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>` : '',
    '<p><a href="/contacto">Solicitar cotización</a></p>',
  ].join('')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: product.name,
        description: product.excerpt,
        url: productUrl,
        ...(image ? { image: [image] } : {}),
        ...(product.sku ? { sku: product.sku } : {}),
        ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Productos', item: absoluteUrl('/productos') },
          { '@type': 'ListItem', position: 3, name: product.name, item: productUrl },
        ],
      },
    ],
  }

  writeRoute(route, renderPage({
    route,
    title,
    description,
    heading: product.name,
    body: product.excerpt,
    image,
    jsonLd,
    details,
  }))
}

console.log(`HTML SEO generado para ${staticPages.length} páginas y ${products.length} productos.`)
