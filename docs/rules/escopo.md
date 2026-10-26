# Escopo

Norma para agentes. Complementa [CODE-CHANGES.md](../development/CODE-CHANGES.md).

O pedido autoriza o menor conjunto de edições que o torna verdadeiro no código atual.

Um pedido para acrescentar um campo, um projeto, um texto ou um ajuste visual não autoriza, no mesmo passo:

- refatorar o módulo;
- renomear componente, chave JSON ou arquivo;
- extrair tipo `ProjetoData` para outro arquivo;
- mover o CSS do `ProjetoCard`;
- trocar `<a>` por `next/link` ou o inverso na home;
- adotar `@/` no lugar dos imports relativos;
- passar a usar `next-intl`;
- editar `middleware.ts` ou `next.config.ts`;
- remover dependência, asset ou chave aparentemente sem uso;
- reformatar arquivos não tocados pela regra pedida;
- alterar cópia de outro idioma além do necessário para manter a mesma estrutura de chaves;
- “corrigir” o media query de `globals.css`, o `lang` do HTML ou a fonte Geist.

Melhoria percebida fora desse conjunto vai para o relatório, sob o título **Sugestão fora do escopo**, e fica sem código.

Se o pedido em si for uma refatoração, ela se limita aos arquivos e ao resultado que o pedido nomear.
