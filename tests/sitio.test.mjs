// Pruebas del sitio estático: node --test tests/
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { cabecerasDe } from '../tools/cabeceras.mjs'

const leer = (ruta) => readFileSync(new URL('../' + ruta, import.meta.url), 'utf8')
const PAGINAS = ['sitio/index.html', 'sitio/404.html']
const TOML = leer('netlify.toml')

// Contraste WCAG 2.1
function luminancia(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function contraste(a, b) {
  const [x, y] = [luminancia(a), luminancia(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

test('pares de texto y fondo pasan AA (4,5:1)', () => {
  const pares = [
    ['#1E2A22', '#F6F2E8', 'texto sobre crema'],
    ['#45534A', '#F6F2E8', 'texto suave sobre crema'],
    ['#45534A', '#FFFFFF', 'texto suave sobre blanco'],
    ['#174A28', '#F6F2E8', 'títulos sobre crema'],
    ['#174A28', '#FFFFFF', 'títulos y botón claro sobre blanco'],
    ['#FFFFFF', '#1F5F33', 'texto blanco sobre verde'],
    ['#FFFFFF', '#174A28', 'botón verde al pasar'],
  ]
  for (const [t, f, nombre] of pares) assert.ok(contraste(t, f) >= 4.5, `${nombre}: ${contraste(t, f).toFixed(2)}`)
})

test('el dorado no se usa como color de texto', () => {
  const css = leer('sitio/estilos.css')
  assert.doesNotMatch(css, /(^|[;{\s])color:\s*var\(--dorado\)/m)
})

test('las páginas no llevan scripts, manejadores en línea ni estilos en línea', () => {
  for (const p of PAGINAS) {
    const html = leer(p)
    assert.doesNotMatch(html, /<script/i, p)
    assert.doesNotMatch(html, /\son[a-z]+=/i, p)
    assert.doesNotMatch(html, /\sstyle=/i, p)
  }
})

test('cada imagen tiene alt y cada página un solo h1, idioma y título', () => {
  for (const p of PAGINAS) {
    const html = leer(p)
    for (const img of html.match(/<img\b[^>]*>/g) ?? []) assert.match(img, /\salt="/, `${p}: ${img}`)
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, p)
    assert.match(html, /<html lang="es-CO">/, p)
    assert.match(html, /<title>[^<]+<\/title>/, p)
  }
})

test('sin emojis en textos', () => {
  const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u
  for (const p of [...PAGINAS, 'sitio/estilos.css']) assert.doesNotMatch(leer(p), emoji, p)
})

test('las rutas locales que se enlazan existen', () => {
  const html = leer('sitio/index.html')
  const archivos = new Set(['/', ...readdirSync(new URL('../sitio/', import.meta.url)).map((f) => '/' + f),
    ...readdirSync(new URL('../sitio/img/', import.meta.url)).map((f) => '/img/' + f)])
  for (const [, ruta] of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) assert.ok(archivos.has(ruta), ruta)
})

test('los enlaces externos son https y apuntan a los canales del cliente', () => {
  const html = leer('sitio/index.html')
  const externos = [...html.matchAll(/href="(https?:[^"]+)"/g)].map((m) => m[1])
  for (const u of externos) assert.match(u, /^https:\/\//, u)
  assert.ok(externos.includes('https://wa.me/573023507907'))
})

test('netlify.toml: CSP sin scripts y cabeceras de seguridad', () => {
  const h = cabecerasDe(TOML)('/')
  const csp = h['Content-Security-Policy']
  assert.match(csp, /default-src 'none'/)
  assert.doesNotMatch(csp, /script-src/)
  assert.doesNotMatch(csp, /unsafe-inline|unsafe-eval/)
  assert.match(csp, /frame-ancestors 'none'/)
  for (const c of ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy', 'Strict-Transport-Security']) assert.ok(h[c], c)
  assert.match(TOML, /publish = "sitio"/)
})
