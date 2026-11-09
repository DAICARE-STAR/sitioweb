# daicare-sitioweb

Instrucciones para cualquier IA (Claude, Codex, Cursor, Gemini) que trabaje en este proyecto. Claude las carga desde `CLAUDE.md`; las demás leen este archivo directamente.

- Área: clientes · Tipo: web · Creado: 2026-11-09
- Qué es: Sitio público de DAI CARE Integral (daicareintegral.com): página estática con servicios y contacto

## Reglas generales

Rigen las reglas personales de `C:\Users\enzov\IA\AGENTS.md` (idioma, tono, secretos, Windows) y las decisiones de `C:\Users\enzov\IA\estandares\decisiones-cerradas.md`. Si una regla de este archivo contradice un estándar, manda este archivo dentro del proyecto y se anota por qué en «Decisiones del proyecto».

## Estándares que aplican

Leer antes de programar el archivo que corresponda a la tarea (`C:\Users\enzov\IA\estandares\INDICE.md` dice cuál):

- `C:\Users\enzov\IA\estandares\00-principios.md` — siempre
- `C:\Users\enzov\IA\estandares\decisiones-cerradas.md` — siempre
- `C:\Users\enzov\IA\estandares\flujo-trabajo.md` — commits, versionado, deploy, handoffs
- `C:\Users\enzov\IA\estandares\verificacion.md` — qué comprobar antes y después de cada cambio
- `C:\Users\enzov\IA\estandares\codificacion.md` — código, base de datos, pruebas
- `C:\Users\enzov\IA\estandares\seguridad.md` — secretos, autorización, entradas, CSP
- `C:\Users\enzov\IA\estandares\ui.md` — interfaz, accesibilidad, SEO
- Secciones [P: sitio] de cada estándar si publica en Netlify

## Proyecto

- Stack: HTML y CSS estáticos en `sitio/`, sin build ni JavaScript. Logos SVG en `marca/` (fuente) y `sitio/img/` (los que se publican).
- Cómo correrlo en local: `node tools/servidor-local.mjs` (puerto 5560, con las cabeceras de `netlify.toml`); en Claude, `preview_start daicare-sitioweb`.
- Verificación mínima antes de commitear: `node --test "tests/*.test.mjs"` (en PowerShell `tests/` a secas falla: Node lo toma como archivo) y recorrido a 1280 y 375 px sin errores de consola.
- Deploy: Netlify publica `sitio/` desde `main` de `github.com/DAICARE-STAR/sitioweb`. Un push a `main` publica: solo con orden explícita del usuario, después de que el cliente apruebe textos, colores y logo. Registros DNS en `docs/dns.md`.
- Cuenta de GitHub: `valdrighilorenzo-star` (fijada con `credential.https://github.com.username`).

## Documentos del proyecto

| Archivo | Para qué |
|---|---|
| `README.md` | Qué es y cómo se corre |
| `CHANGELOG.md` | Pasos `Mayor.Fase.Paso` con hash |
| `HANDOFF.md` | Estado vigente para la próxima sesión (uno solo; los viejos van a `docs/handoffs/`) |
| `docs/glosario.md` | Términos canónicos y qué no decir |
| `docs/flujo-ia.md` | Qué hace cada IA en este proyecto y dónde deja sus resultados |

## Decisiones del proyecto

Formato: `DCW-DEC-NN — fecha — decisión — qué la reabriría`.

- DCW-DEC-01 — 2026-11-09 — Sitio de una página sin JavaScript, con CSP `default-src 'none'` y sin fuentes externas (pila del sistema: Georgia para títulos, system-ui para el cuerpo) — que el cliente pida formularios, analítica o su tipografía de marca.
- DCW-DEC-02 — 2026-11-09 — Colores tomados de la publicidad del cliente: verde `#1F5F33`, verde profundo `#174A28`, dorado `#C8A24B` (solo gráfico), crema `#F6F2E8`. El dorado nunca va como texto sobre claro — que el cliente entregue un manual de marca.
- DCW-DEC-03 — 2026-11-09 — Logos redibujados en SVG por la IA a partir de la publicidad (no había archivo original); el texto del logo usa fuentes del sistema, así que puede variar un poco entre equipos — que el cliente apruebe una versión con el texto convertido a trazos o entregue el original.
- DCW-DEC-04 — 2026-11-09 — Contacto solo por WhatsApp (302 350 7907) y redes (@somosdaicare); sin correo ni razón social hasta que el cliente los confirme — dato del cliente.
- DCW-DEC-05 — 2026-11-09 — `www` redirige a `daicareintegral.com` (301); el CRM vivirá en `app.daicareintegral.com` — decisión del usuario.
