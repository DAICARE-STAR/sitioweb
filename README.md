# daicare-sitioweb

Sitio público de DAI CARE Integral (daicareintegral.com): página estática con servicios y contacto

## Cómo correrlo

`node tools/servidor-local.mjs` y abrir http://localhost:5560 (sirve `sitio/` con las cabeceras de `netlify.toml`). Pruebas: `node --test "tests/*.test.mjs"`.

## Estructura

| Ruta | Qué contiene |
|---|---|
| `sitio/` | Lo que publica Netlify: `index.html`, `404.html`, `estilos.css`, `img/`, `robots.txt`, `sitemap.xml` |
| `marca/` | Logos SVG fuente (monograma, casa, versiones de un color, favicon), pendientes de aprobación del cliente |
| `tools/` | Servidor local y lector de cabeceras de `netlify.toml` |
| `tests/` | Contraste AA, sin scripts ni estilos en línea, enlaces, CSP y cabeceras |
| `docs/` | Documentación, DNS (`dns.md`), glosario y flujo entre IA |

## Estado

Creado el 2026-11-09 en el área clientes. El estado vigente está en `HANDOFF.md` y la historia en `CHANGELOG.md`.
