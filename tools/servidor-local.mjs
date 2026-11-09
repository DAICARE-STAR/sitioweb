// Servidor local de solo lectura: sirve sitio/ con las cabeceras de netlify.toml,
// para ver el sitio y la CSP como en producción. Uso: node tools/servidor-local.mjs [puerto]
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cabecerasDe } from './cabeceras.mjs'

const RAIZ = resolve(fileURLToPath(new URL('../sitio/', import.meta.url)))
const PUERTO = Number(process.argv[2] ?? 5560)
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}
const cabeceras = cabecerasDe(await readFile(new URL('../netlify.toml', import.meta.url), 'utf8'))

createServer(async (req, res) => {
  const ruta = decodeURIComponent(new URL(req.url, 'http://local').pathname)
  let archivo = normalize(join(RAIZ, ruta.endsWith('/') ? ruta + 'index.html' : ruta))
  let estado = 200
  if (!archivo.startsWith(RAIZ)) archivo = join(RAIZ, '404.html')
  try {
    if (!(await stat(archivo)).isFile()) throw new Error('no es archivo')
  } catch {
    archivo = join(RAIZ, '404.html')
    estado = 404
  }
  res.writeHead(estado, { 'Content-Type': TIPOS[extname(archivo)] ?? 'application/octet-stream', ...cabeceras('/' + ruta.replace(/^\//, '')) })
  res.end(await readFile(archivo))
}).listen(PUERTO, () => console.log(`Sitio en http://localhost:${PUERTO}`))
