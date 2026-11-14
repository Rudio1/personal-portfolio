# Claude Code — Portfólio Rudio

O contrato de desenvolvimento deste repositório está em `AGENTS.md` e vale integralmente para o Claude Code. Ele é importado abaixo.

@AGENTS.md

## Regras por área

Regras com escopo de arquivo ficam em `.claude/rules/` e carregam quando o Claude trabalha nos caminhos indicados em `paths`:

- `.claude/rules/ui.md` — páginas, componentes e CSS em `src/`
- `.claude/rules/i18n.md` — `messages/`, `TranslationContext` e `Header`
- `.claude/rules/contato.md` — `ContactModal` e `src/app/api/`

As mesmas regras existem em `.cursor/rules/` (histórico do Cursor). Ao mudar uma regra, mudar as duas cópias ou registrar a divergência em `docs/architecture/GAPS.md`.

## Lembretes rápidos

- Responder e documentar em português.
- Validar com `npm run lint`; `npm run build` quando tipos, rotas, API ou imports mudarem. Não há testes.
- Não ler nem exibir `.env*`. `API_URL` e `API_KEY` só em `src/app/api/contact/route.ts`.
- Mudança de comportamento, contrato ou conteúdo: atualizar `docs/features/` e `docs/changelog/CHANGELOG.md`.
