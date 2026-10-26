# Arquitetura

O portfólio é uma aplicação Next.js 15 com App Router. O código da interface fica em `src/`. Não há backend de domínio, banco ou autenticação dentro deste repositório.

## Árvore relevante

```
messages/
  pt.json
  en.json
public/                 imagens, logos, bandeiras, PDF do currículo
src/
  middleware.ts         devolve NextResponse.next()
  app/
    layout.tsx          Server Component raiz
    page.tsx            home
    page.module.css
    globals.css
    favicon.ico
    projetos/
      page.tsx
      projetos.module.css
    api/contact/
      route.ts          POST
  components/
    Header.tsx + Header.module.css
    ContactModal.tsx + ContactModal.module.css
    ProjetoCard.tsx     sem CSS próprio; usa o module de projetos
    LoadingSkeleton.tsx + LoadingSkeleton.module.css
  contexts/
    TranslationContext.tsx
  data/
    projetos.ts
```

Arquivos de configuração na raiz: `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.gitignore`. `next.config.ts` exporta um objeto vazio de opções. O alias TypeScript `@/*` → `./src/*` está configurado e nenhum arquivo em `src/` o importa.

## Como uma tela chega ao browser

1. `src/app/layout.tsx` define `metadata`, aplica as classes das fontes Geist no `body`, renderiza `TranslationProvider`, `Header` e `children`.
2. `TranslationProvider` é client. No mount lê `localStorage.locale` (fallback `pt`) e importa os dois JSON.
3. A página (`page.tsx` ou `projetos/page.tsx`) também é client e chama `useTranslations()`.
4. Enquanto `isLoading` é verdadeiro, a UI mostra skeletons. `t()` devolve string vazia nesse intervalo.
5. Não há layout específico em `src/app/projetos/`. A página herda só o layout raiz.

## Onde cada tipo de regra fica

| Assunto | Lugar real | Não existe em |
| --- | --- | --- |
| Texto visível | `messages/pt.json`, `messages/en.json` | componentes, salvo aria-labels fixos no Header e no modal |
| Metadados de projeto | `src/data/projetos.ts` | banco, CMS |
| Título e descrição de projeto | `messages/*.json` em `projects.items.<key>` | `projetos.ts` |
| Validação de nome e telefone (formato) | `ContactModal.tsx` | schema compartilhado |
| Validação de presença no servidor | `src/app/api/contact/route.ts` | a mesma função do modal |
| Integração externa | somente a route de contato | client |
| Aparência | CSS Modules + `globals.css` | biblioteca de UI |
| Sessão, login, papel | NÃO IDENTIFICADO | — |

## Quem depende de quem

```
layout.tsx
  → Header, TranslationProvider, globals.css, next/font

page.tsx (home)
  → TranslationContext, LoadingSkeleton, page.module.css, next/image, lucide-react

projetos/page.tsx
  → TranslationContext, LoadingSkeleton, ContactModal, ProjetoCard, data/projetos, projetos.module.css

Header.tsx
  → TranslationContext, ContactModal, Header.module.css, next/link, next/image, lucide-react

ContactModal.tsx
  → TranslationContext, ContactModal.module.css, fetch('/api/contact')

ProjetoCard.tsx
  → projetos.module.css, LoadingSkeleton, next/image, lucide-react

data/projetos.ts
  → tipo ProjetoData exportado por ProjetoCard.tsx

TranslationContext.tsx
  → import dinâmico de messages/pt.json e messages/en.json

api/contact/route.ts
  → process.env.API_URL, process.env.API_KEY, fetch nativo
```

Não há pasta `services`, `repositories`, `models`, `entities` ou `dto`. Interfaces ficam no arquivo do componente que as usa (`ProjetoData`, `ProjetoCardProps`, `ContactModalProps`, props dos skeletons).

## Middleware

`src/middleware.ts` retorna `NextResponse.next()` sem ler cookies, headers ou locale. O `matcher` ignora `api`, `_next`, `_vercel` e caminhos com extensão de arquivo. Efeito observado: nenhum. Motivo de o arquivo existir: NÃO IDENTIFICADO. Não adicionar lógica nele sem pedido explícito.

## Integrações externas

| Integração | Onde | Observação |
| --- | --- | --- |
| API de contato | `POST API_URL`, header `x-api-key: API_KEY` | URL e chave não estão no código. Contrato além de `{ name, telephone }`: NÃO IDENTIFICADO |
| Google Fonts | `@import` em `globals.css` | Montserrat |
| Geist | `next/font/google` em `layout.tsx` | Variáveis CSS `--font-geist-sans` e `--font-geist-mono` no `body`. Nenhum CSS consulta essas variáveis |
| Links de projetos, GitHub e currículo | `href` nos componentes e em `projetos.ts` | Abrem em nova aba com `rel="noopener noreferrer"` quando o código usa `<a target="_blank">` |

## Banco, auth, logs, testes

- Banco de dados: não há.
- Migrations: não há.
- Autenticação e autorização: não há. O `POST /api/contact` é público.
- Logs: `console.error` no contexto de tradução, no modal e na route. Não há biblioteca de log.
- Testes e CI: não há.

## Configuração de ambiente

`.gitignore` ignora `.env*`. Não há `.env.example` versionado. Nomes lidos pelo código:

- `API_URL`
- `API_KEY`

Valores, provedor da API e ambiente de deploy: NÃO IDENTIFICADO. `README.md` ainda é o texto gerado pelo `create-next-app` e cita deploy na Vercel como documentação genérica do framework; não há arquivo de projeto que confirme o provedor usado hoje.
