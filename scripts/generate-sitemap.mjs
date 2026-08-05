import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { getProductSlug, readCatalogProducts } from './catalog-seo-data.mjs'

const siteUrl = 'https://segurimax-peru.com'
const outputPath = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url))
const staticRoutes = ['/', '/productos', '/empresa', '/marcas', '/contacto']
const productRoutes = readCatalogProducts().map((product) => `/productos/${getProductSlug(product)}`)

const urls = [...staticRoutes, ...productRoutes]
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')}
</urlset>
`

writeFileSync(outputPath, xml)
console.log(`Sitemap generado con ${urls.length} URLs indexables.`)
