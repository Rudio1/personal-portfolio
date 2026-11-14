# Contrato de desenvolvimento para IA

Este arquivo é a fonte de verdade para agentes que alteram este repositório. Leia-o antes de modificar código. O índice da documentação está em [docs/README.md](docs/README.md).

Se este arquivo divergir de um código existente, o código descreve o comportamento atual. A divergência deve ser registrada em [docs/architecture/GAPS.md](docs/architecture/GAPS.md), não corrigida por iniciativa própria.

## 1. Sobre o projeto

Portfólio pessoal de Guilherme Rudio (marca visível: **Rudio**). Site público em Next.js que apresenta o perfil, uma lista estática de projetos e um formulário de contato.

Objetivo do sistema: exibir o portfólio em português e inglês e encaminhar pedidos de contato a uma API externa.

Módulos existentes:

| Módulo | Onde vive | Função |
| --- | --- | --- |
| Home | `src/app/page.tsx` | Apresentação, logos e atalhos |
| Projetos | `src/app/projetos/page.tsx`, `src/data/projetos.ts` | Grade de projetos |
| Navegação | `src/components/Header.tsx` | Menu, idioma e abertura do contato |
| Contato | `src/components/ContactModal.tsx`, `src/app/api/contact/route.ts` | Formulário e proxy HTTP |
| Idioma | `src/contexts/TranslationContext.tsx`, `messages/pt.json`, `messages/en.json` | Textos pt/en |
| Estáticos | `public/` | Imagens, logos, currículo em PDF, bandeiras |

Tecnologias usadas no código e em `package.json`:

- Next.js 15 (App Router), React 19, TypeScript
- CSS Modules e CSS global
- `lucide-react` para ícones
- `next/font` carrega Space Grotesk, Inter e JetBrains Mono no layout (classes no `<html>`)
- Inter é a família do `body`; Space Grotesk nos títulos (`h1`–`h4`); JetBrains Mono nos rótulos técnicos
- Variáveis de ambiente `API_URL` e `API_KEY`, lidas somente na rota de contato

`next-intl` está em `package.json` e não é importado em `src/`. O idioma em uso é o contexto próprio. Não passe a usar `next-intl` sem pedido explícito.

Não existem: banco de dados, ORM, migrations, autenticação, autorização, camada de serviços, repositórios, pasta de DTOs, testes automatizados, CI e CMS.

## 2. Arquitetura

Não há arquitetura em camadas do tipo Presentation → Application → Domain → Infrastructure. O projeto é um frontend Next.js com uma rota de API que faz proxy.

```
src/app/layout.tsx          Server Component: metadata, fontes, Header, TranslationProvider
src/app/page.tsx            Client Component: home
src/app/projetos/page.tsx   Client Component: lista de projetos
src/app/api/contact/route.ts  Route Handler POST: proxy para API externa
src/components/             UI client
src/contexts/               Estado de idioma no cliente
src/data/                   Conteúdo estático dos projetos
messages/                   Textos pt e en
public/                     Arquivos servidos como estão
src/middleware.ts           Pass-through; não altera a requisição
```

### Responsabilidades

- **Rotas de página** (`src/app/**/page.tsx`): composição da tela. Leem traduções e, na página de projetos, o array estático.
- **Route Handler** (`src/app/api/contact/route.ts`): única borda de servidor com efeito externo. Valida presença de `name` e `telephone` e repassa o POST.
- **Componentes**: markup, interação e validação do formulário de contato.
- **Contexto**: locale, carga dos JSON e função `t(chave)`.
- **Dados**: metadados dos projetos (links, tecnologias, imagem, tipo). Título e descrição ficam nos JSON.
- **CSS**: aparência. Tokens globais em `src/app/globals.css`. Estilo de tela em CSS Module ao lado da página ou do componente.

### Fluxo de dados

Textos: `messages/{pt,en}.json` → import dinâmico no `TranslationProvider` → `t('grupo.chave')` nos componentes.

Projetos: `src/data/projetos.ts` → `page.tsx` combina cada item com `t('projects.items.<key>.*')` → `ProjetoCard`.

Contato: `ContactModal` valida no cliente → `POST /api/contact` com `{ name, telephone }` → route handler → `POST` em `API_URL` com header `x-api-key`. O browser não fala com a API externa.

Idioma escolhido: `localStorage` chave `locale`. Valor inicial no código: `pt`.

Detalhamento: [docs/architecture/OVERVIEW.md](docs/architecture/OVERVIEW.md) e [docs/architecture/DATA-FLOW.md](docs/architecture/DATA-FLOW.md).

### Dependências permitidas

- Páginas podem importar componentes, contexto, dados e CSS Module da própria pasta.
- Componentes podem importar contexto, outros componentes e CSS.
- `src/data/projetos.ts` importa o tipo `ProjetoData` de `src/components/ProjetoCard.tsx`. Isso já existe. Não inverta essa relação nem crie uma pasta `domain` para “corrigir”.
- `ProjetoCard` importa o CSS Module de `src/app/projetos/projetos.module.css`. Isso já existe.
- Somente `src/app/api/contact/route.ts` lê `API_URL` e `API_KEY`.
- Componentes client não importam a route handler. Chamam `/api/contact` por `fetch`.

### Dependências proibidas sem pedido explícito

- Nova camada (`services`, `repositories`, `domain`, `dto`, `hooks` globais) quando o recurso cabe no padrão atual.
- Acesso do client a `API_URL` ou `API_KEY`.
- Banco de dados, ORM ou persistência local dos contatos.
- Trocar o contexto de tradução por `next-intl` ou por roteamento `/pt` e `/en`.
- Fazer páginas ou componentes importarem `messages/*.json` direto, fora do `TranslationProvider`.

## 3. Regras obrigatórias

1. Alterar somente o que o pedido exige.
2. Procurar implementação equivalente antes de criar arquivo, tipo, rota, campo ou dependência. Regra completa: [docs/rules/nao-inventar.md](docs/rules/nao-inventar.md).
3. Manter o comportamento atual quando o pedido não pede mudança de comportamento.
4. Não criar camada, pasta de arquitetura ou abstração que este repositório não usa.
5. Não mover arquivo sem mapear quem o importa.
6. Não duplicar texto de interface: a chave entra em `messages/pt.json` e `messages/en.json`.
7. Não colocar chamada à API externa dentro de componente. O proxy é `src/app/api/contact/route.ts`.
8. Não validar o formulário só no servidor ou só no cliente. Os dois pontos já validam; o cliente valida formato, o servidor valida presença.
9. Não mudar o contrato `POST /api/contact` (`name`, `telephone`) sem pedido explícito e sem atualizar modal e route juntos.
10. Não adicionar biblioteca para algo já coberto por React, Next.js ou CSS Module.
11. Não refatorar arquivo vizinho, unificar estilo de aspas, renomear pastas ou “corrigir” decisões listadas em `docs/decisions/`.
12. Não apagar asset, chave de tradução, classe CSS ou dependência só porque parece sem uso. Registrar em `docs/architecture/GAPS.md` se o pedido for documentar.
13. Imports existentes são relativos (`../components/...`). O alias `@/*` existe no `tsconfig.json` e não é usado. Em arquivo existente, continuar com import relativo.
14. Páginas que usam `useTranslations` são Client Components (`'use client'`). O `layout.tsx` é Server Component e deve continuar envolvendo `TranslationProvider` e `Header`.
15. Dúvida estrutural (nova rota de API, novo estado global, nova dependência, mudança de i18n ou do contrato de contato): parar e descrever a dúvida antes de implementar.

Escopo: [docs/rules/escopo.md](docs/rules/escopo.md). Segurança: [docs/rules/seguranca.md](docs/rules/seguranca.md). Como alterar: [docs/development/CODE-CHANGES.md](docs/development/CODE-CHANGES.md).

## 4. Padrão para funcionalidade nova

Processo e checklist: [docs/development/NEW-FEATURE.md](docs/development/NEW-FEATURE.md).

Atalhos do que o código faz hoje:

- Texto novo: mesma árvore de chaves nos dois JSON; leitura com `t('a.b.c')`.
- Projeto novo: objeto em `src/data/projetos.ts` no formato `ProjetoData`, chaves `projects.items.<key>` nos dois idiomas, imagem em `public/`.
- Página nova: `src/app/<segmento>/page.tsx`. Se precisar de `useTranslations` ou estado, a página leva `'use client'`. CSS Module na mesma pasta. Link novo no array `menuItems` de `Header.tsx` somente se a navegação pedir.
- Campo novo de contato: estado e validação em `ContactModal.tsx`, checagem correspondente em `route.ts`, textos em `contact` nos dois JSON. Não enviar o campo à API externa sem confirmar o contrato. O schema completo da API externa está como NÃO IDENTIFICADO além de `{ name, telephone }`.
- Este repositório não tem entidade, service, repository nem DTO em arquivo separado. Não criar esses artefatos para imitar outro projeto.

## 5. Decisões que não devem ser “corrigidas”

Registradas em [docs/decisions/](docs/decisions/README.md):

- App Router com código em `src/`
- i18n por contexto e JSON, com locale em `localStorage`
- Projetos como array estático, textos separados dos metadados
- Contato via route handler proxy
- Estilo com CSS Modules e variáveis em `:root`

Uma decisão registrada vale até revisão explícita do autor do projeto.

## 6. Changelog e features

- Alteração relevante de comportamento, contrato, conteúdo de projeto ou fluxo: [docs/changelog/CHANGELOG.md](docs/changelog/CHANGELOG.md).
- Regra de negócio de uma feature: [docs/features/](docs/features/).
- Correção só de documentação não exige entrada de feature. A criação deste contrato está registrada no changelog.

## 7. AI Development Workflow

1. Ler este arquivo.
2. Entender o pedido e o limite do escopo.
3. Identificar o módulo: home, projetos, navegação, contato, idioma, estáticos ou estilo global.
4. Ler a arquitetura em `docs/architecture/` e a feature em `docs/features/`.
5. Ler decisões em `docs/decisions/` que toquem o módulo.
6. Buscar no código a implementação atual antes de criar arquivo.
7. Se a mudança alterar estrutura, contrato público ou dependência e o pedido não deixar isso claro, parar e perguntar.
8. Planejar o menor conjunto de arquivos.
9. Implementar só esse conjunto, no padrão do arquivo vizinho.
10. Validar com o que o repositório oferece: `npm run lint`. Usar `npm run build` quando a mudança afetar tipos, rotas, a API ou imports. Não existe script de teste.
11. Em mudança de UI, percorrer o fluxo no navegador (home, `/projetos`, troca de idioma, modal de contato) quando houver como subir o app.
12. Atualizar `docs/features/` se a regra mudou, e `docs/changelog/CHANGELOG.md` se o comportamento, o contrato ou o conteúdo mudou.
13. Reportar arquivos alterados, o que passou a acontecer e o que não foi verificado.

## 8. Validação disponível

| Comando | Função |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run lint` | ESLint (`next/core-web-vitals`, `next/typescript`) |
| `npm run build` | Build de produção do Next.js |
| `npm start` | Serve o build |

Testes automatizados: NÃO IDENTIFICADO. Não há `*.test.*`, `*.spec.*` nem script `test`. Não adicionar Jest, Vitest ou Testing Library sem pedido explícito.

## 9. O que informar ao terminar

- Arquivos criados e alterados.
- Comportamento que mudou.
- Comandos executados e o resultado.
- Documentação e changelog atualizados, ou a frase objetiva de que não houve mudança de regra ou comportamento que exigisse isso.
- Sugestão fora do escopo, se existir, sem tê-la implementado.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
