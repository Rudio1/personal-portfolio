# Como alterar o código

Ordem obrigatória para um agente. O contrato resumido está em [AGENTS.md](../../AGENTS.md).

## Antes de alterar

1. Entender o pedido, incluindo o que ele não pede.
2. Identificar o módulo: home, projetos, navegação, contato, idioma, CSS global ou asset.
3. Ler a feature em `docs/features/` e a visão em `docs/architecture/OVERVIEW.md`.
4. Ler os ADR em `docs/decisions/` ligados a esse módulo.
5. Abrir o código que já implementa o fluxo. Buscar o símbolo, a chave `t('...')` e os imports.
6. Listar quem importa o arquivo e quais chaves JSON, assets e env vars entram no fluxo.
7. Avaliar impacto em `/`, `/projetos`, no Header e no `POST /api/contact` quando o arquivo compartilhado for contexto, layout, Header, modal ou `globals.css`.

Se a lista de arquivos for maior do que o pedido, cortar até o mínimo ou registrar o restante como sugestão fora do escopo.

## Durante a alteração

1. Copiar o padrão do arquivo que já resolve um caso parecido: Client Component, CSS Module, `t()`, array `projetos`.
2. Reutilizar `LoadingSkeleton`, `ContactModal`, `ProjetoCard` e `useTranslations` quando o caso for o mesmo.
3. Não duplicar catálogo de textos nem a lista de projetos em outro formato.
4. Não introduzir hook, contexto ou helper novo se a função couber no arquivo que já é dono daquele fluxo.
5. Editar só as linhas necessárias.
6. Não formatar o arquivo inteiro, não trocar aspas e não mover CSS do `ProjetoCard` para outro arquivo.
7. Não acrescentar dependência em `package.json` sem pedido. `next-intl` já instalado não é autorização para adotá-lo.
8. Não alterar `next.config.ts`, `middleware.ts` nem `.gitignore` sem pedido.

## Depois da alteração

1. `npm run lint`.
2. `npm run build` quando a mudança envolver TypeScript exportado, rotas, `route.ts` ou JSON importado como módulo.
3. Revisar regressão nos fluxos que compartilham o arquivo. Contexto e layout afetam todas as páginas. `projetos.module.css` afeta a página e o `ProjetoCard`.
4. Atualizar `docs/features/<feature>.md` quando a regra documentada deixar de ser verdade.
5. Acrescentar entrada no topo de `docs/changelog/CHANGELOG.md` quando houver mudança de comportamento, contrato, conteúdo publicado ou configuração. Ajuste interno sem efeito visível e sem mudança de contrato pode ficar sem entrada; diga isso no relatório.
6. Informar arquivos, comportamento, comandos e limites da verificação.

Formato do changelog: ver o próprio [CHANGELOG.md](../changelog/CHANGELOG.md).

## Sugestão fora do escopo

Quando aparecer melhoria real que o pedido não inclui, o relatório leva:

```markdown
## Sugestão fora do escopo

- Observação objetiva do que foi visto no código.
- Por que não foi feito agora.
```

Não implementar a sugestão no mesmo passo.
