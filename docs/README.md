# Índice da documentação

Fonte de verdade para agentes: [AGENTS.md](../AGENTS.md). Comece por ele. Esta página só diz onde está cada assunto.

## Ordem de leitura

1. [AGENTS.md](../AGENTS.md) — o que o projeto é, o que é proibido e o fluxo de trabalho.
2. [architecture/OVERVIEW.md](architecture/OVERVIEW.md) — pastas, responsabilidades e dependências.
3. [architecture/DATA-FLOW.md](architecture/DATA-FLOW.md) — idioma, home, projetos e contato.
4. A feature que a tarefa toca, em [features/](features/).
5. Decisões em [decisions/README.md](decisions/README.md) se a tarefa encostar em i18n, projetos, contato, CSS ou estrutura de pastas.
6. [architecture/GAPS.md](architecture/GAPS.md) antes de “limpar” código que pareça inconsistente.
7. [redesign/01-AUDIT.md](redesign/01-AUDIT.md) se a tarefa for o redesign visual. As fases só entram no código com pedido explícito. O índice delas está em [redesign/09-IMPLEMENTATION-PLAN.md](redesign/09-IMPLEMENTATION-PLAN.md).

## Onde encontrar

| Assunto | Documento |
| --- | --- |
| Regras globais do agente | [AGENTS.md](../AGENTS.md) |
| Arquitetura e dependências | [architecture/OVERVIEW.md](architecture/OVERVIEW.md) |
| Fluxos | [architecture/DATA-FLOW.md](architecture/DATA-FLOW.md) |
| Pontos frágeis e fatos sem explicação | [architecture/GAPS.md](architecture/GAPS.md) |
| Nomes e organização de arquivos | [development/CONVENTIONS.md](development/CONVENTIONS.md) |
| Criar funcionalidade | [development/NEW-FEATURE.md](development/NEW-FEATURE.md) |
| Alterar código | [development/CODE-CHANGES.md](development/CODE-CHANGES.md) |
| Não inventar artefato | [rules/nao-inventar.md](rules/nao-inventar.md) |
| Limite do pedido | [rules/escopo.md](rules/escopo.md) |
| Segredos e proxy | [rules/seguranca.md](rules/seguranca.md) |
| Subir o projeto | [guides/desenvolvimento-local.md](guides/desenvolvimento-local.md) |
| Home | [features/home.md](features/home.md) |
| Grade de projetos | [features/projetos.md](features/projetos.md) |
| Formulário e API | [features/contato.md](features/contato.md) |
| Tradução | [features/i18n.md](features/i18n.md) |
| Header | [features/navegacao.md](features/navegacao.md) |
| Decisões | [decisions/README.md](decisions/README.md) |
| Histórico | [changelog/CHANGELOG.md](changelog/CHANGELOG.md) |
| Redesign (alvo visual, ainda sem obrigar o código) | [redesign/01-AUDIT.md](redesign/01-AUDIT.md) |
| Regras do Cursor | `.cursor/rules/*.mdc` |

## Onde registrar

| Tipo | Lugar |
| --- | --- |
| Decisão estrutural nova, já confirmada | Próximo arquivo em `docs/decisions/` e a linha no índice dessa pasta |
| Regra de uma feature que mudou | O markdown correspondente em `docs/features/` |
| Feature ainda sem documento | Novo arquivo em `docs/features/`, no mesmo formato das existentes, e uma linha na tabela deste índice |
| Mudança de comportamento, contrato ou conteúdo | Topo de `docs/changelog/CHANGELOG.md` |
| Inconsistência encontrada e não corrigida | `docs/architecture/GAPS.md` |
| Fase do redesign visual | O prompt em `docs/redesign/09-IMPLEMENTATION-PLAN.md`. Não implementar fase sem pedido. Changelog de produto só quando o código mudar |
| Regra que todo agente deve obedecer | `AGENTS.md`; detalhe operacional em `docs/rules/` ou `docs/development/` |

Não copiar a mesma regra longa em dois lugares. `AGENTS.md` manda no comportamento do agente. Os outros arquivos detalham arquitetura, feature, decisão ou histórico.

## Hierarquia

```
AGENTS.md                 contrato do agente
docs/rules/               limites: invenção, escopo, segurança
docs/decisions/           escolhas estruturais já feitas
docs/architecture/        mapa do código
docs/features/            regras de cada fluxo
docs/development/         como implementar dentro desse mapa
docs/changelog/           por que uma alteração entrou
docs/guides/              como rodar
docs/redesign/            alvo do redesign visual; o código só muda na fase pedida
.cursor/rules/            atalhos curtos para o Cursor apontando para os documentos acima
```

O `README.md` da raiz do repositório continua o texto do `create-next-app`. Ele não descreve este portfólio. Não tratá-lo como especificação.
