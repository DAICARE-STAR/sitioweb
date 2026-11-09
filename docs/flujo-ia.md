# Flujo de trabajo con IA en daicare-sitioweb

## Roles

| IA | Rol | Entrega | Dónde |
|---|---|---|---|
| Claude (Claude Code, este repo) | Diseño, documentación, planificación, código, verificación | Código, `docs/`, prompts para otras IA | este repo |
| Codex / Cursor | Implementación sobre el mismo `AGENTS.md` | Código | este repo |
| Gemini | Imágenes de referencia, segunda opinión | Imágenes | `referencias/gemini/<área>/` |
| ChatGPT | Lluvia de ideas, nombres, crítica | Ideas resumidas | `ideas/` |

Borrar las filas que no apliquen.

## Ciclo

1. La IA de ideas propone; lo útil se pega en `ideas/<fecha>-<tema>.md`.
2. Claude filtra, integra en los documentos del proyecto y genera prompts nuevos en `prompts/<ia>/`.
3. La IA de imágenes genera con esos prompts; lo aprobado va a `referencias/<ia>/<área>/`.
4. Las tareas pendientes para cada IA viven en `docs/tareas-ia.md`, por rondas.

## Nombres de archivo de resultados

`<id-prompt>-<descripcion>-v<n>.<ext>`, por ejemplo `02A-portada-v1.png`, para saber siempre qué prompt lo generó.

## Contexto para pegar al inicio de cada chat externo

```
Contexto: estoy trabajando en daicare-sitioweb.
- Qué es: Sitio público de DAI CARE Integral (daicareintegral.com): página estática con servicios y contacto
- (completar en 5 a 10 líneas: objetivo, público, estilo, restricciones firmes, tecnología)
Sé concreto, propón opciones variadas y señala riesgos y problemas de alcance. Responde en español.
```
