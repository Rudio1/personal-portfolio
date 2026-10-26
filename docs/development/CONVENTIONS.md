# Convenções observadas no código

Isto descreve o que o repositório faz. Onde o código varia, a variação está registrada. Não há guia de estilo escrito além do ESLint do Next.js.

## Pastas

- Rotas e route handlers: `src/app/`, convenção do App Router (`page.tsx`, `route.ts`, `layout.tsx`).
- UI reutilizável ou compartilhada entre telas: `src/components/`.
- Estado de cliente usado pela árvore inteira: `src/contexts/`. Existe um único contexto.
- Conteúdo estático tipado: `src/data/`. Existe um único arquivo.
- Textos: `messages/<locale>.json` na raiz, não dentro de `src/`.
- Mídia: `public/`, referenciada por caminho absoluto (`/vegeta.png`, `/logos/react.svg`).

Nomes de pasta de domínio visível ao usuário estão em português (`projetos`, `messages` é inglês porque é o nome da pasta de catálogo). Pastas técnicas estão em inglês (`components`, `contexts`, `data`, `api`).

## Arquivos

| Tipo | Padrão encontrado | Exemplo |
| --- | --- | --- |
| Componente | PascalCase, um componente principal por arquivo | `Header.tsx`, `ContactModal.tsx` |
| CSS Module | mesmo nome do componente, ou nome da rota | `Header.module.css`, `projetos.module.css` |
| CSS da home | `page.module.css` ao lado de `page.tsx` | `src/app/page.module.css` |
| Dados | minúsculo, português, export nomeado | `projetos` em `projetos.ts` |
| Contexto | PascalCase + sufixo `Context` | `TranslationContext.tsx` |
| Route handler | `route.ts` | `src/app/api/contact/route.ts` |

A home usa `page.module.css`. A rota `/projetos` usa `projetos.module.css`. Os dois padrões coexistem. Ao criar outra rota, coloque o CSS Module na pasta da rota e importe-o como `styles`. Não renomeie os arquivos atuais para unificar.

## Exports

- Páginas, `Header`, `ContactModal` e `TranslationProvider`: `export default function`.
- `useTranslations`: export nomeado.
- Skeletons: `LoadingSkeleton`, `LoadingSkeletonInline`, `LoadingText`, todos nomeados no mesmo arquivo.
- `ProjetoCard`: função interna `ProjetoCardComponent` embrulhada em `memo`, export nomeado `ProjetoCard`. O tipo `ProjetoData` é exportado do mesmo arquivo.

## Símbolos

- Componentes e tipos: PascalCase (`ProjetoData`, `ContactModalProps`).
- Funções e variáveis: camelCase (`changeLocale`, `handleSubmit`, `menuItems`).
- Campos de projeto e várias classes CSS: português (`destaque`, `tecnologias`, `projetoCard`, `imagem`).
- Campos do formulário e do JSON enviado: inglês (`name`, `telephone`).
- Chaves de tradução: inglês, aninhadas (`projects.buttons.demo`).
- `key` do projeto: identificador estável em inglês ou kebab-case (`ag-clinical`, `psi-amanda`), igual nos dois JSON e em `projetos.ts`.

## Imports e aspas

Imports são relativos. Nenhum arquivo usa `@/`.

Aspas simples predominam nos componentes. `layout.tsx`, `next.config.ts` e `tsconfig` usam aspas duplas. Ao editar um arquivo, manter o estilo desse arquivo.

## Componentes client

Arquivos com `'use client'`: páginas, Header, ContactModal, LoadingSkeleton, TranslationContext, ProjetoCard. `layout.tsx` e `route.ts` não têm essa diretiva.

Comentários existentes estão em português e só em trechos de fluxo (menu, validação, proxy). Não acrescentar comentário em declaração simples.

## CSS

- Tokens em `:root` de `globals.css`: `--background`, `--foreground`, `--header-color`, `--button-primary-hover`, `--button-secondary-hover`.
- Fonte aplicada: `'Montserrat', 'Montserrat Fallback', sans-serif`.
- Classes em camelCase no CSS Module (`.projetoCard`, `.ctaButton`).
- Estado visual por classe composta no `className`, como `` `${styles.projetoCard} ${projeto.destaque ? styles.destaque : ''}` ``.
- Ícones: componentes de `lucide-react` com prop `size`.

## Endpoints

Só existe `POST /api/contact`. Não há cliente HTTP compartilhado, interceptor ou tipo de resposta da API externa.

## Como uma funcionalidade foi acrescentada até aqui

Pelo histórico do Git e pelo formato do código, uma tela nova entrou como `page.tsx` client, CSS Module ao lado, textos nos dois JSON e, quando precisou de lista, um módulo em `src/data` mais um componente. O contato entrou como modal client mais `route.ts`. Não há gerador, template interno nem pasta `__tests__`.
