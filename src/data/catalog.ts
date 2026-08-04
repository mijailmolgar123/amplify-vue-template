export type CatalogCategoryId = 'epps' | 'epcs' | 'ropa-industrial' | 'oficina' | 'kitchenette'

export type ProtectionTypeId =
  | 'cabeza'
  | 'manos'
  | 'respiratoria'
  | 'visual'
  | 'auditiva'
  | 'ropa'
  | 'altura'
  | 'colectiva'
  | 'limpieza'

export type CatalogCategory = {
  id: CatalogCategoryId
  label: string
  shortLabel: string
  description: string
}

export type ProtectionType = {
  id: ProtectionTypeId
  label: string
  description: string
  icon: string
}

export type CatalogBrand = {
  id: string
  name: string
  logo?: string
}

export type CatalogProduct = {
  id: number
  sku?: string
  name: string
  category: CatalogCategoryId
  protectionTypes: ProtectionTypeId[]
  brand?: string
  brandSlug?: string
  excerpt: string
  tags: string[]
  availability: 'stock' | 'preorder'
  featured: boolean
  status?: string
  image: string
}

const catalogAssets = import.meta.glob(
  ['../assets/products/*/*.{png,jpg,jpeg,webp}', '../assets/socios/*.{png,jpg,jpeg,webp}'],
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const asset = (path: string) => {
  const url = catalogAssets[path]
  if (!url) throw new Error(`No se encontró el recurso del catálogo: ${path}`)
  return url
}

export const catalogCategories: CatalogCategory[] = [
  {
    id: 'epps',
    label: 'Equipos de Protección Personal (EPP)',
    shortLabel: 'EPP',
    description: 'Protección personal para riesgos industriales.',
  },
  {
    id: 'epcs',
    label: 'Protección colectiva y señalización',
    shortLabel: 'Protección colectiva',
    description: 'Elementos para delimitar, señalizar y proteger áreas de trabajo.',
  },
  {
    id: 'ropa-industrial',
    label: 'Ropa industrial',
    shortLabel: 'Ropa industrial',
    description: 'Prendas de trabajo y alta visibilidad.',
  },
  {
    id: 'oficina',
    label: 'Limpieza industrial',
    shortLabel: 'Limpieza industrial',
    description: 'Paños técnicos para mantenimiento y operación.',
  },
  {
    id: 'kitchenette',
    label: 'Manejo de residuos',
    shortLabel: 'Manejo de residuos',
    description: 'Consumibles para residuos internos y áreas operativas.',
  },
]

export const protectionTypes: ProtectionType[] = [
  { id: 'cabeza', label: 'Protección de cabeza', description: 'Cascos y accesorios', icon: 'fa-solid fa-helmet-safety' },
  { id: 'manos', label: 'Protección de manos', description: 'Guantes por nivel de riesgo', icon: 'fa-solid fa-mitten' },
  { id: 'respiratoria', label: 'Protección respiratoria', description: 'Respiradores y filtros', icon: 'fa-solid fa-mask-face' },
  { id: 'visual', label: 'Protección visual', description: 'Lentes y protección ocular', icon: 'fa-solid fa-glasses' },
  { id: 'auditiva', label: 'Protección auditiva', description: 'Orejeras y atenuación de ruido', icon: 'fa-solid fa-headphones' },
  { id: 'ropa', label: 'Ropa industrial', description: 'Alta visibilidad y trabajo de campo', icon: 'fa-solid fa-shirt' },
  { id: 'altura', label: 'Trabajo en altura', description: 'Protección para labores elevadas', icon: 'fa-solid fa-person-falling' },
  { id: 'colectiva', label: 'Protección colectiva', description: 'Señalización y control de áreas', icon: 'fa-solid fa-road-barrier' },
  { id: 'limpieza', label: 'Limpieza y residuos', description: 'Suministros para mantenimiento', icon: 'fa-solid fa-broom' },
]

export const catalogBrands: CatalogBrand[] = [
  { id: '3m', name: '3M', logo: asset('../assets/socios/3m-logo.png') },
  { id: 'msa', name: 'MSA', logo: asset('../assets/socios/msa-logo.png') },
  { id: 'steelpro', name: 'Steelpro', logo: asset('../assets/socios/steelpro-logo.png') },
  { id: 'clute', name: 'Clute', logo: asset('../assets/socios/clute-logo.png') },
  { id: 'delta-plus', name: 'Delta Plus', logo: asset('../assets/socios/delta-plus-logo.png') },
  { id: 'ansell', name: 'Ansell', logo: asset('../assets/socios/ansell-logo.png') },
]

export const catalogProducts: CatalogProduct[] = [
  {
    id: 1,
    name: 'Guante Multiflex Cut-5 Steelpro',
    category: 'epps', protectionTypes: ['manos'], brand: 'Steelpro', brandSlug: 'steelpro',
    excerpt: 'Protección anticorte nivel 5 con fibra de vidrio y máximo agarre.',
    tags: ['Protección personal', 'Industrial'], availability: 'stock', featured: true, status: 'Top venta',
    image: asset('../assets/products/epps/guante_multiflex_cut5_steelpro.png'),
  },
  {
    id: 2,
    name: 'Lente Steelpro Top Gun',
    category: 'epps', protectionTypes: ['visual'], brand: 'Steelpro', brandSlug: 'steelpro',
    excerpt: 'Antiempañante con protección UV y patillas regulables.',
    tags: ['Protección personal'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/lente_steelpro_top_gun.png'),
  },
  {
    id: 3,
    sku: 'P000012',
    name: 'Lente claro Turbine Steelpro',
    category: 'epps', protectionTypes: ['visual'], brand: 'Steelpro', brandSlug: 'steelpro',
    excerpt: 'Lente claro envolvente con inserto de PVC y barra antiimpacto.',
    tags: ['Protección personal'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/lente_steelpro_turbine_claro.jpg'),
  },
  {
    id: 4,
    name: 'Lente Steelpro Spy Flex',
    category: 'epps', protectionTypes: ['visual'], brand: 'Steelpro', brandSlug: 'steelpro',
    excerpt: 'Protección ocular flexible con resistencia a impactos.',
    tags: ['Protección personal'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/lente_steelpro_spy_flex.png'),
  },
  {
    id: 5,
    name: 'Guante VE713 Delta Plus',
    category: 'epps', protectionTypes: ['manos'], brand: 'Delta Plus', brandSlug: 'delta-plus',
    excerpt: 'Guante multirriesgo con recubrimiento de nitrilo para trabajos con aceites.',
    tags: ['Protección personal', 'Industrial'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/guante_ve713_deltaplus.jpg'),
  },
  {
    id: 6,
    name: 'Orejera Peltor H10A con banda 30 dB 3M',
    category: 'epps', protectionTypes: ['auditiva'], brand: '3M', brandSlug: '3m',
    excerpt: 'Atenuación de 30 dB con almohadillas de doble copa.',
    tags: ['Protección personal'], availability: 'stock', featured: true,
    image: asset('../assets/products/epps/orejera_peltor_h10a_30db_3m.jpg'),
  },
  {
    id: 7,
    name: 'Respirador media cara 7503 / 37083 3M',
    category: 'epps', protectionTypes: ['respiratoria'], brand: '3M', brandSlug: '3m',
    excerpt: 'Silicona suave y puertos tipo bayoneta para cartuchos dobles.',
    tags: ['Protección personal'], availability: 'stock', featured: true, status: 'Certificado NIOSH',
    image: asset('../assets/products/epps/respirador_media_cara_7503_3m.jpg'),
  },
  {
    id: 8,
    name: 'Respirador media cara 6300 / 07026 3M',
    category: 'epps', protectionTypes: ['respiratoria'], brand: '3M', brandSlug: '3m',
    excerpt: 'Modelo liviano con arnés ajustable para jornadas prolongadas.',
    tags: ['Protección personal'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/respirador_media_cara_6300_3m.jpg'),
  },
  {
    id: 9,
    name: 'Casco blanco MSA Jockey',
    category: 'epps', protectionTypes: ['cabeza'], brand: 'MSA', brandSlug: 'msa',
    excerpt: 'Casco dieléctrico tipo jockey con ranuras para accesorios.',
    tags: ['Protección personal'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/casco_blanco_msa_jockey_generated.png'),
  },
  {
    id: 10,
    name: 'Casco blanco MSA Sombrero',
    category: 'epps', protectionTypes: ['cabeza'], brand: 'MSA', brandSlug: 'msa',
    excerpt: 'Versión de ala ancha para supervisión y trabajos a la intemperie.',
    tags: ['Protección personal'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/casco_blanco_msa_sombrero_generated.png'),
  },
  {
    id: 11,
    name: 'Casco blanco 3M Jockey',
    category: 'epps', protectionTypes: ['cabeza'], brand: '3M', brandSlug: '3m',
    excerpt: 'Casco ligero ABS compatible con protectores auditivos.',
    tags: ['Protección personal'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/casco_blanco_3m_jockey.jpg'),
  },
  {
    id: 12,
    name: 'Casco blanco Portwest PS53 Rapel',
    category: 'epps', protectionTypes: ['cabeza', 'altura'], brand: 'Portwest', brandSlug: 'portwest',
    excerpt: 'Casco tipo escalada con barboquejo y ventilación lateral.',
    tags: ['Protección personal', 'Trabajo en altura'], availability: 'stock', featured: true,
    image: asset('../assets/products/epps/casco_blanco_portwest_ps53_rapel.jpg'),
  },
  {
    id: 13,
    name: 'Casco amarillo Masthers Jockey',
    category: 'epps', protectionTypes: ['cabeza'], brand: 'Masthers', brandSlug: 'masthers',
    excerpt: 'Color de alta visibilidad para cuadrillas y visitantes.',
    tags: ['Protección personal'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/casco_amarillo_masthers_jockey.jpg'),
  },
  {
    id: 14,
    name: 'Casco azul Forte Steelpro Jockey',
    category: 'epps', protectionTypes: ['cabeza'], brand: 'Steelpro', brandSlug: 'steelpro',
    excerpt: 'Facilita la identificación por áreas y roles.',
    tags: ['Protección personal'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/casco_azul_forte_steelpro_jockey.jpg'),
  },
  {
    id: 15,
    name: 'Guante de hilo con puntos PVC Clute',
    category: 'epps', protectionTypes: ['manos'], brand: 'Clute', brandSlug: 'clute',
    excerpt: 'Guante tejido con puntos PVC para tareas de agarre ligero.',
    tags: ['Protección personal'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/guante_hilo_pvc_clute.jpg'),
  },
  {
    id: 16,
    name: 'Guante G-40 Nitrilo Kleenguard',
    category: 'epps', protectionTypes: ['manos'], brand: 'Kleenguard', brandSlug: 'kleenguard',
    excerpt: 'Resistencia química intermedia para procesos industriales.',
    tags: ['Protección personal', 'Industrial'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/guante_nitrilo_g40_kleenguard.png'),
  },
  {
    id: 17,
    name: 'Guante G-60 Nitrilo Kleenguard',
    category: 'epps', protectionTypes: ['manos'], brand: 'Kleenguard', brandSlug: 'kleenguard',
    excerpt: 'Protección alta contra cortes y abrasión.',
    tags: ['Protección personal', 'Industrial'], availability: 'stock', featured: false,
    image: asset('../assets/products/epps/guante_nitrilo_g60_kleenguard.jpg'),
  },
  {
    id: 18,
    name: 'Casaca térmica naranja/plomo Termoflex',
    category: 'ropa-industrial', protectionTypes: ['ropa'], brand: 'Termoflex', brandSlug: 'termoflex',
    excerpt: 'Casaca térmica con cintas reflectivas para alta visibilidad.',
    tags: ['Ropa industrial', 'Alta visibilidad'], availability: 'stock', featured: true,
    image: asset('../assets/products/ropa-industrial/casaca_termica_naranja_plomo_termoferlex_reflectiva.jpg'),
  },
  {
    id: 19,
    name: 'Uniforme drill naranja/plomo con cinta reflectiva',
    category: 'ropa-industrial', protectionTypes: ['ropa'],
    excerpt: 'Camisa y pantalón drill para operaciones en campo.',
    tags: ['Ropa industrial', 'Alta visibilidad'], availability: 'stock', featured: false,
    image: asset('../assets/products/ropa-industrial/uniforme_drill_naranja_plomo_reflectivo.jpg'),
  },
  {
    id: 20,
    name: 'Barril de seguridad naranja',
    category: 'epcs', protectionTypes: ['colectiva'],
    excerpt: 'Elemento vial con cinta reflectiva para canalizar el tránsito.',
    tags: ['Protección colectiva'], availability: 'stock', featured: true,
    image: asset('../assets/products/epcs/barril_seguridad_naranja_reflectivo.jpg'),
  },
  {
    id: 21,
    name: 'Cono naranja de 90 cm con cinta reflectiva',
    category: 'epcs', protectionTypes: ['colectiva'],
    excerpt: 'Cono de alto tránsito para obras y desvíos.',
    tags: ['Protección colectiva'], availability: 'stock', featured: false,
    image: asset('../assets/products/epcs/cono_seguridad_naranja_90cm.jpg'),
  },
  {
    id: 22,
    name: 'Barra retráctil amarillo/negro Clute',
    category: 'epcs', protectionTypes: ['colectiva'], brand: 'Clute', brandSlug: 'clute',
    excerpt: 'Barra extensible para señalización temporal de pasillos.',
    tags: ['Protección colectiva'], availability: 'stock', featured: false,
    image: asset('../assets/products/epcs/barra_retractil_amarillo_negro.png'),
  },
  {
    id: 23,
    name: 'Barra retráctil rojo/blanco',
    category: 'epcs', protectionTypes: ['colectiva'],
    excerpt: 'Alternativa ligera para accesos y áreas restringidas.',
    tags: ['Protección colectiva'], availability: 'stock', featured: false,
    image: asset('../assets/products/epcs/barra_retractil_rojo_blanco.jpg'),
  },
  {
    id: 24,
    name: 'Paño Wypall X75 Plus industrial azul',
    category: 'oficina', protectionTypes: ['limpieza'], brand: 'Wypall', brandSlug: 'wypall',
    excerpt: 'Paño absorbente de larga duración para mantenimiento.',
    tags: ['Limpieza industrial'], availability: 'stock', featured: false,
    image: asset('../assets/products/oficina/pano_wypall_x75_industrial.jpg'),
  },
  {
    id: 25,
    name: 'Paño Wypall X80 Power Pockets blanco',
    category: 'oficina', protectionTypes: ['limpieza'], brand: 'Wypall', brandSlug: 'wypall',
    excerpt: 'Paño reforzado para tareas exigentes y reutilización prolongada.',
    tags: ['Limpieza industrial'], availability: 'stock', featured: false,
    image: asset('../assets/products/oficina/pano_wypall_x80_power.jpg'),
  },
  {
    id: 26,
    name: 'Bolsa para residuos 140×2 negra',
    category: 'kitchenette', protectionTypes: ['limpieza'],
    excerpt: 'Bolsa reforzada para cilindros de residuos internos.',
    tags: ['Manejo de residuos'], availability: 'stock', featured: false,
    image: asset('../assets/products/kitchenette/bolsa_basura_cilindro_140x2_negro.jpg'),
  },
  {
    id: 27,
    name: 'Bolsa para residuos 220×2 negra',
    category: 'kitchenette', protectionTypes: ['limpieza'],
    excerpt: 'Formato extra grande para patios, almacenes o zonas de comedor.',
    tags: ['Manejo de residuos'], availability: 'stock', featured: false,
    image: asset('../assets/products/kitchenette/bolsa220negrolitros.jpg'),
  },
  {
    id: 28,
    sku: 'P000226',
    name: 'Barbiquejo universal MSA V-Gard de 4 puntos',
    category: 'epps', protectionTypes: ['cabeza', 'altura'], brand: 'MSA', brandSlug: 'msa',
    excerpt: 'Barboquejo ajustable GA90047, sin partes metálicas y compatible con cascos MSA V-Gard.',
    tags: ['Accesorio para casco', 'Trabajo en altura'], availability: 'preorder', featured: false,
    image: asset('../assets/products/epps/barbiquejo_msa_4_puntos_ga90047.jpg'),
  },
  {
    id: 29,
    sku: 'P0004',
    name: 'Tapón de oído reutilizable con estuche Steelpro',
    category: 'epps', protectionTypes: ['auditiva'], brand: 'Steelpro', brandSlug: 'steelpro',
    excerpt: 'Tapones de triple reborde con cordón y estuche individual para almacenamiento higiénico.',
    tags: ['Protección auditiva', 'Reutilizable'], availability: 'preorder', featured: false,
    image: asset('../assets/products/epps/tapon_oido_estuche_steelpro.jpg'),
  },
  {
    id: 30,
    sku: 'P000552',
    name: 'Respirador media cara 7502 / 37082 3M',
    category: 'epps', protectionTypes: ['respiratoria'], brand: '3M', brandSlug: '3m',
    excerpt: 'Respirador reutilizable mediano de silicona con válvula Cool Flow y conexión tipo bayoneta.',
    tags: ['Protección respiratoria', 'Talla mediana'], availability: 'preorder', featured: false,
    image: asset('../assets/products/epps/respirador_media_cara_7502_3m.jpg'),
  },
  {
    id: 31,
    sku: 'P000013',
    name: 'Lente oscuro Turbine Steelpro',
    category: 'epps', protectionTypes: ['visual'], brand: 'Steelpro', brandSlug: 'steelpro',
    excerpt: 'Lente gris oscuro envolvente con inserto de PVC y barra antiimpacto.',
    tags: ['Protección visual', 'Lente oscuro'], availability: 'preorder', featured: false,
    image: asset('../assets/products/epps/lente_steelpro_turbine_oscuro.jpg'),
  },
  {
    id: 32,
    sku: 'P000576',
    name: 'Filtro 2097 / 07184 P100 magenta 3M',
    category: 'epps', protectionTypes: ['respiratoria'], brand: '3M', brandSlug: '3m',
    excerpt: 'Filtro P100 para partículas con alivio contra niveles molestos de vapores orgánicos.',
    tags: ['Filtro P100', 'Código NIOSH magenta'], availability: 'preorder', featured: false,
    image: asset('../assets/products/epps/filtro_2097_07184_p100_3m.jpg'),
  },
  {
    id: 33,
    sku: 'CM3000',
    name: 'Orejera para casco CM3000 Steelpro',
    category: 'epps', protectionTypes: ['auditiva', 'cabeza'], brand: 'Steelpro', brandSlug: 'steelpro',
    excerpt: 'Orejera amarilla adaptable a casco con copas ABS, brazos metálicos y atenuación NRR de 22 dB.',
    tags: ['Protección auditiva', 'Adaptable a casco'], availability: 'preorder', featured: false,
    image: asset('../assets/products/epps/orejera_cm3000_steelpro.jpg'),
  },
  {
    id: 34,
    sku: 'P00222',
    name: 'Chaleco drill Fortec naranja con cinta reflectiva',
    category: 'ropa-industrial', protectionTypes: ['ropa'],
    excerpt: 'Chaleco naranja de drill poliéster con cierre, bolsillos utilitarios y cinta reflectiva 3M.',
    tags: ['Alta visibilidad', 'Talla M'], availability: 'preorder', featured: false,
    image: asset('../assets/products/ropa-industrial/chaleco_drill_fortec_naranja_reflectivo.jpg'),
  },
  {
    id: 35,
    sku: 'SGP-00003',
    name: 'Pantalón drill naranja/plomo con cinta reflectiva',
    category: 'ropa-industrial', protectionTypes: ['ropa'],
    excerpt: 'Pantalón industrial bicolor con bolsillos cargo, refuerzos plomo y bandas reflectivas.',
    tags: ['Alta visibilidad', 'Talla L'], availability: 'preorder', featured: false,
    image: asset('../assets/products/ropa-industrial/pantalon_drill_naranja_plomo_reflectivo.jpg'),
  },
]

export const catalogBrandFilters = Array.from(
  new Map(
    catalogProducts
      .filter((product) => product.brand && product.brandSlug)
      .map((product) => [product.brandSlug!, { id: product.brandSlug!, name: product.brand! }]),
  ).values(),
).sort((a, b) => a.name.localeCompare(b.name, 'es'))

export function getCategory(id: string) {
  return catalogCategories.find((category) => category.id === id)
}

export function getProtectionType(id: string) {
  return protectionTypes.find((type) => type.id === id)
}

export function getBrandProductCount(brandId: string) {
  return catalogProducts.filter((product) => product.brandSlug === brandId).length
}
