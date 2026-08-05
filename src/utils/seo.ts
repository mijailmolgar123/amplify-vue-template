const SITE_URL = 'https://segurimax-peru.com'
const SITE_NAME = 'Segurimax Perú'

export type SeoConfig = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'product'
  robots?: 'index,follow' | 'noindex,nofollow'
  structuredData?: Record<string, unknown>
}

function upsertMeta(attribute: 'name' | 'property', key: string, content?: string) {
  const selector = `meta[${attribute}="${key}"]`
  const existing = document.head.querySelector<HTMLMetaElement>(selector)

  if (!content) {
    existing?.remove()
    return
  }

  const element = existing ?? document.createElement('meta')
  element.setAttribute(attribute, key)
  element.content = content
  if (!existing) document.head.appendChild(element)
}

function upsertCanonical(url: string) {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  const element = existing ?? document.createElement('link')
  element.rel = 'canonical'
  element.href = url
  if (!existing) document.head.appendChild(element)
}

export function absoluteSiteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export function applySeo(config: SeoConfig) {
  const canonicalUrl = absoluteSiteUrl(config.path)
  const fullTitle = config.title.includes(SITE_NAME) ? config.title : `${config.title} | ${SITE_NAME}`
  const imageUrl = config.image ? absoluteSiteUrl(config.image) : undefined

  document.title = fullTitle
  upsertCanonical(canonicalUrl)
  upsertMeta('name', 'description', config.description)
  upsertMeta('name', 'robots', config.robots ?? 'index,follow')
  upsertMeta('property', 'og:locale', 'es_PE')
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:type', config.type ?? 'website')
  upsertMeta('property', 'og:url', canonicalUrl)
  upsertMeta('property', 'og:title', fullTitle)
  upsertMeta('property', 'og:description', config.description)
  upsertMeta('property', 'og:image', imageUrl)
  upsertMeta('name', 'twitter:card', imageUrl ? 'summary_large_image' : 'summary')
  upsertMeta('name', 'twitter:title', fullTitle)
  upsertMeta('name', 'twitter:description', config.description)
  upsertMeta('name', 'twitter:image', imageUrl)

  document.head.querySelector('script[data-seo-jsonld]')?.remove()
  if (config.structuredData) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seoJsonld = 'true'
    script.textContent = JSON.stringify(config.structuredData)
    document.head.appendChild(script)
  }
}
