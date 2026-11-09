# DNS de daicareintegral.com

Los registros los cambia el usuario en el proveedor donde se compró el dominio. Antes de tocarlos, el sitio debe existir en Netlify (creado desde el repo `DAICARE-STAR/sitioweb`) y tener añadidos los dominios `daicareintegral.com` y `www.daicareintegral.com` en Site configuration → Domain management.

## Opción A (recomendada): DNS en el proveedor actual

| Tipo | Nombre | Valor | Para qué |
|---|---|---|---|
| A | `@` (daicareintegral.com) | `75.2.60.5` | Dominio raíz → balanceador de Netlify |
| CNAME | `www` | `<nombre-del-sitio>.netlify.app` | `www` → el sitio (Netlify redirige a la raíz, ver `netlify.toml`) |
| CNAME | `app` | `<nombre-del-sitio-del-crm>.netlify.app` | CRM de TailorSuite; se crea cuando exista ese sitio, no antes |

- `<nombre-del-sitio>` es el subdominio que Netlify asigna al sitio (Site configuration → Site details). Comprobar en Domain management el valor exacto que Netlify muestra para el registro A: si muestra otro, manda el de Netlify.
- Quitar cualquier otro registro A o AAAA de `@` y cualquier otro CNAME de `www` (los del proveedor o de un aparcamiento de dominio).
- No tocar registros MX ni TXT de correo si el dominio ya tiene correo.

## Opción B: DNS de Netlify

En Netlify → Domains → Add or register domain → `daicareintegral.com` → «Set up Netlify DNS». Netlify da cuatro servidores de nombres (`dns1.p0X.nsone.net` y similares); se ponen en el proveedor del dominio en lugar de los actuales. Antes, copiar a Netlify DNS los registros de correo que existan (MX, TXT de SPF, DKIM, DMARC), o el correo deja de funcionar.

## Después

1. En Netlify, Domain management → HTTPS → «Verify DNS configuration» y esperar el certificado (unos minutos tras la propagación).
2. Comprobar desde una terminal:

```bash
curl -sI https://daicareintegral.com/
```

```bash
curl -sI https://www.daicareintegral.com/
```

La primera debe dar `200`, `content-type: text/html` y la cabecera `content-security-policy`; la segunda, `301` hacia `https://daicareintegral.com/`.
