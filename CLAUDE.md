@AGENTS.md
@~/IA/estandares/flujo-trabajo.md
@~/IA/estandares/verificacion.md

## Solo para Claude

- Los servidores de desarrollo se levantan con `preview_start` y el nombre de `.claude/launch.json`; nunca con la shell.
- El guardarraíl de `.claude/hooks/block-dangerous-git.sh` bloquea git destructivo. No se esquiva.
- Al cerrar un bloque de trabajo, actualizar la memoria de este proyecto con fecha absoluta y hash de commit.
