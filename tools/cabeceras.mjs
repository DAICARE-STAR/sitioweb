// Lector mínimo de los bloques [[headers]] de netlify.toml (solo la forma que
// usa este repo: for = "..." y pares clave = "valor" en [headers.values]).
export function leerReglas(toml) {
  const reglas = []
  let actual = null
  for (const linea of toml.split(/\r?\n/).map((l) => l.trim())) {
    if (linea === '[[headers]]') { actual = { para: null, valores: {} }; reglas.push(actual); continue }
    if (linea.startsWith('[[') || (linea.startsWith('[') && linea !== '[headers.values]')) { actual = null; continue }
    if (!actual) continue
    const m = /^([A-Za-z-]+|for)\s*=\s*"(.*)"$/.exec(linea)
    if (!m) continue
    if (m[1] === 'for') actual.para = m[2]
    else actual.valores[m[1]] = m[2]
  }
  return reglas
}

function coincide(patron, ruta) {
  const re = new RegExp('^' + patron.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$')
  return re.test(ruta)
}

// Devuelve una función ruta → cabeceras, sumando las de todas las reglas que coinciden.
export function cabecerasDe(toml) {
  const reglas = leerReglas(toml)
  return (ruta) => Object.assign({}, ...reglas.filter((r) => r.para && coincide(r.para, ruta)).map((r) => r.valores))
}
