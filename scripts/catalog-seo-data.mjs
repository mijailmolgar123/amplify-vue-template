import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const catalogPath = fileURLToPath(new URL('../src/data/catalog.ts', import.meta.url))

export function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\+/g, ' plus ')
    .replace(/×/g, ' x ')
    .toLocaleLowerCase('es')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getProductSlug(product) {
  return `${slugify(product.name)}-${product.id}`
}

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text
  return undefined
}

function literalValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literalValue).filter((value) => value !== undefined)
  if (ts.isCallExpression(node) && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) return node.arguments[0].text
  return undefined
}

export function readCatalogProducts() {
  const source = readFileSync(catalogPath, 'utf8')
  const file = ts.createSourceFile(catalogPath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'catalogProducts') continue
      if (!declaration.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) continue

      return declaration.initializer.elements
        .filter(ts.isObjectLiteralExpression)
        .map((element) => {
          const product = {}
          for (const property of element.properties) {
            if (!ts.isPropertyAssignment(property)) continue
            const name = propertyName(property.name)
            if (!name) continue
            product[name] = literalValue(property.initializer)
          }
          return product
        })
        .filter((product) => Number.isInteger(product.id) && typeof product.name === 'string')
    }
  }

  throw new Error('No se pudo leer catalogProducts para generar el SEO.')
}
