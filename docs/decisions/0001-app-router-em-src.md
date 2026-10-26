# Next.js App Router com código em `src/`

## Contexto

O site é um frontend React com poucas rotas e uma rota HTTP.

## Decisão

O projeto usa Next.js 15 com App Router. Páginas, layout e a rota de API ficam em `src/app/`. Componentes ficam em `src/components/`. O `tsconfig.json` inclui o alias `@/*`, e o código importa por caminho relativo.

`layout.tsx` é Server Component. As páginas atuais são Client Components porque usam `useTranslations` e, em projetos, `useState`.

## Motivo

O formato é o do App Router do Next.js e o do primeiro commit que sobe o app (`feat: up new repository nextjs`). Motivo registrado para preferir `src/` em vez da pasta `app/` na raiz, e para manter páginas como client: NÃO IDENTIFICADO além da necessidade prática dos hooks.

## Alternativas consideradas

NÃO IDENTIFICADO. O repositório não documenta Pages Router, pasta `app/` na raiz nem Server Components nas páginas.

## Consequências

- Rota nova segue `src/app/<segmento>/page.tsx`.
- Endpoint novo, se for realmente necessário, segue `src/app/api/<nome>/route.ts`.
- Não mover a árvore para fora de `src/` e não converter as páginas atuais em Server Components só para alinhar a um modelo genérico.
- Imports novos em arquivos que já usam caminho relativo continuam relativos.
