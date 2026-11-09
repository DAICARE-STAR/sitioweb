#!/bin/bash
# Bloquea comandos git destructivos antes de que Claude los ejecute.
# git push normal esta permitido. Si en este proyecto el push publica, igual se confirma aparte.
# Plantilla del sistema IA (C:\Users\enzov\IA\plantillas\proyecto). Origen: team-portal, 2026-09.

INPUT=$(cat)
# node siempre está en este proyecto (python puede faltar en la nube). Si no
# se puede leer el comando, se bloquea: fallar abierto dejaría pasar todo.
COMMAND=$(printf '%s' "$INPUT" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const j=JSON.parse(s);process.stdout.write(String((j.tool_input||{}).command||''))})" 2>/dev/null) || {
  echo "BLOCKED: no se pudo leer el comando para revisarlo (falta node o la entrada no es JSON)." >&2
  exit 2
}

[ -z "$COMMAND" ] && exit 0

DANGEROUS_PATTERNS=(
  "push --force"
  "push -f"
  "push .*--force-with-lease"
  "push .*--mirror"
  "push .*--all"
  "push .*--delete"
  "push .* \+[^ ]"
  "push [^ ]+ :[^ ]"
  "push [^;|&]*--force"
  "push [^;|&]* -f([ ;|&]|$)"
  "git reset --hard"
  "reset --hard"
  "git clean -f"
  "clean -[a-zA-Z]*f"
  "clean [^;|&]*(-[a-zA-Z]*f|--force)"
  "git branch -D"
  "git checkout \."
  "checkout -- \."
  "checkout [^;|&]*-- \.([ ;|&]|$)"
  "git restore \."
  "restore --staged \."
  "restore [^;|&]*\.([ ;|&]|$)"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    echo "BLOCKED: '$COMMAND' matches dangerous pattern '$pattern'. The user has prevented you from doing this." >&2
    exit 2
  fi
done

exit 0
