import type { CatalogProduct } from '@/data/catalog'

export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\+/g, ' plus ')
    .replace(/×/g, ' x ')
    .toLocaleLowerCase('es')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getProductSlug(product: Pick<CatalogProduct, 'id' | 'name'>) {
  return `${slugify(product.name)}-${product.id}`
}
