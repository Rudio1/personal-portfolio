# Decisões arquiteturais

Uma decisão desta pasta permanece em vigor até o autor do projeto pedir revisão. Agente não substitui uma decisão registrada por outra abordagem que considere melhor.

O repositório não tinha ADR antes desta documentação. Os registros abaixo descrevem decisões **observadas no código**. Onde o motivo não foi escrito pelo autor, o campo diz NÃO IDENTIFICADO. Isso não autoriza refazer a escolha.

## Índice

| ID | Título |
| --- | --- |
| [0001](0001-app-router-em-src.md) | Next.js App Router com código em `src/` |
| [0002](0002-i18n-por-contexto.md) | Idioma por contexto, JSON e `localStorage` |
| [0003](0003-projetos-estaticos.md) | Projetos em módulo estático e textos nos JSON |
| [0004](0004-proxy-de-contato.md) | Contato por route handler que faz proxy |
| [0005](0005-css-modules.md) | Estilo com CSS Modules e tokens globais |
| [0006](0006-tema-escuro-e-geist.md) | Tema escuro fixo e Geist visível |

## Novo ADR

Criar `docs/decisions/NNNN-titulo-curto.md` com o próximo número e acrescentar a linha neste índice.

```markdown
# Título

## Contexto

## Decisão

## Motivo

## Alternativas consideradas

## Consequências
```

Só abrir ADR para escolha estrutural confirmada. Ajuste de cópia, estilo ou um projeto a mais na grade não é ADR.
