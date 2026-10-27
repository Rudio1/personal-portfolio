# 01 — Auditoria

Estado do código na data desta auditoria. Este arquivo descreve o que existe. O alvo visual e técnico está nos outros arquivos de `docs/redesign/`. Nada aqui autoriza editar `src/` sem o pedido explícito de uma fase em [09-IMPLEMENTATION-PLAN.md](09-IMPLEMENTATION-PLAN.md).

Índice do pacote:

| Arquivo | Função |
| --- | --- |
| [01-AUDIT.md](01-AUDIT.md) | Diagnóstico do código atual |
| [02-DESIGN-SYSTEM.md](02-DESIGN-SYSTEM.md) | Tokens, tipo, espaço, componentes |
| [03-MOTION-SYSTEM.md](03-MOTION-SYSTEM.md) | Movimento, o que entra e o que fica de fora |
| [04-ARCHITECTURE.md](04-ARCHITECTURE.md) | O que permanece e arquivos por fase |
| [05-PERFORMANCE.md](05-PERFORMANCE.md) | Metas e regras de custo |
| [06-ACCESSIBILITY.md](06-ACCESSIBILITY.md) | Teclado, contraste, modal, motion |
| [07-RESPONSIVE.md](07-RESPONSIVE.md) | Comportamento por largura |
| [08-VISUAL-DIRECTION.md](08-VISUAL-DIRECTION.md) | Direção e especificação do hero |
| [09-IMPLEMENTATION-PLAN.md](09-IMPLEMENTATION-PLAN.md) | Fases e prompts |
| [10-AI-DLC.md](10-AI-DLC.md) | Ciclo de trabalho para IA |

## 1. Arquitetura atual

Next.js 15 (App Router), React 19, TypeScript. Duas rotas de página e um proxy. Não há banco, auth, services, testes nem CI.

| Peça | Onde | Papel |
| --- | --- | --- |
| Layout | `src/app/layout.tsx` | Único Server Component de UI. Metadata, Geist e Geist Mono via `next/font`, `TranslationProvider`, `Header` |
| Home | `src/app/page.tsx`, `src/app/page.module.css` | Client Component. Apresentação, logos, dois CTAs |
| Projetos | `src/app/projetos/page.tsx`, `src/app/projetos/projetos.module.css` | Client Component. Grade de cards |
| Dados | `src/data/projetos.ts` | Sete projetos. Título e descrição ficam em `messages/` |
| Nav | `src/components/Header.tsx` | Menu, idioma, abertura do contato |
| Contato | `src/components/ContactModal.tsx`, `src/app/api/contact/route.ts` | Formulário e `POST` externo |
| Idioma | `src/contexts/TranslationContext.tsx`, `messages/pt.json`, `messages/en.json` | Contexto próprio. Locale em `localStorage`, chave `locale`, padrão `pt` |
| Estilo | CSS Modules + `src/app/globals.css` | Sem Tailwind. Decisão em `docs/decisions/0005-css-modules.md` |
| Middleware | `src/middleware.ts` | Devolve `NextResponse.next()`. Não alterar sem pedido |

`next-intl` está em `package.json` e não é importado. Não ligar e não remover.

`ProjetoCard` importa o CSS de `src/app/projetos/projetos.module.css`. `src/data/projetos.ts` importa o tipo `ProjetoData` do componente. Essas duas dependências permanecem. Não criar pasta `domain` para “corrigir”.

Alias `@/*` existe no `tsconfig.json` e não é usado. Imports novos em arquivo existente continuam relativos.

## 2. Experiência atual

Home é uma dobra: saudação, um parágrafo, carrossel de logos, foto e dois links (projetos e PDF). Não há About, experiência, cargos, empresas, anos nem métricas.

O item de menu “Sobre” aponta para `/`. Não existe seção correspondente.

`/projetos` é uma grade `auto-fit` de cards iguais. Cada card tem imagem, badge de tipo, badge “Destaque”, título, um parágrafo, tags e link de demo ou GitHub.

Contato é um modal (nome e telefone). Há uma instância no Header e outra na página de projetos, com estado separado. O contrato é `{ name, telephone }` em `POST /api/contact`.

Idioma: PT/EN, sem prefixo de URL. Enquanto `isLoading` é verdadeiro, a UI mostra skeleton. `t()` devolve string vazia nesse intervalo.

A única animação de produto é o carrossel infinito de logos (`scroll` 20s linear), com a lista duplicada no JSX.

## 3. Conteúdo real

Só isto pode aparecer na interface. Não inventar experiência, empresa, cargo, cidade, ano, e-mail, métrica, desafio, solução ou resultado.

- Nome: Guilherme Rudio. Marca visível: Rudio.
- `home.title`: “Olá, me chamo\nGuilherme Rudio” / “Hello, I'm\nGuilherme Rudio”.
- `home.subtitle`: parágrafo de full stack (aplicações escaláveis, APIs, cloud, código limpo, foco no usuário).
- `home.description` e `home.objective`: string vazia, e a home ainda renderiza os `<p>`.
- CTAs: “Ver Projetos” / “View Projects” e “Currículo” / “Resume”. PDF em `public/curriculo/Curriculo - Rudio.pdf`.
- Stack mostrada nos logos: Azure, .NET, SQL Server, React, Next.js, C#, PHP.
- Projetos em `src/data/projetos.ts`, textos em `projects.items.<key>`:

| key | O que o texto diz | Demo | GitHub | Imagem |
| --- | --- | --- | --- | --- |
| vegeta | API Laravel de app de pedais | não | sim | `vegeta.png`, cerca de 12 KB |
| agropulse | Gestão agrícola | sim | não | PNG grande |
| ag-clinical | Plataforma de clínica | sim | não | PNG grande |
| vae-mobility | Site de motos e triciclos elétricos | sim | não | PNG grande |
| psi-amanda | Site de psicoterapia | sim | não | cerca de 1,2 MB |
| trafego | Site de gestão de tráfego | sim | não | PNG |
| agcustom | Site da AG Custom | sim | sim | PNG |

Os sete itens têm `destaque: true`. O badge não distingue nada.

Assets em `public/` que nenhum arquivo em `src/` referencia: `brunelly.png` (cerca de 1,6 MB), `cecis.png` (cerca de 2,5 MB), `cybergallery.png` (cerca de 4,4 MB), `refeicoes.png`, `tarefas.png`, `img-rudio.png`. Não entram no site e não são apagados sem pedido explícito.

Foto usada na home: `public/guilherme-rudio.png` (cerca de 630 KB).

## 4. Problemas

### Tema invertido

Em `src/app/globals.css`, `:root` é fundo `#000000` e texto `#ffffff`. O bloco `@media (prefers-color-scheme: dark)` troca para fundo branco e texto preto e marca `color-scheme: dark`. Sistema escuro mostra o site claro. Sistema claro mostra o site escuro.

O header é sempre pílula branca (`rgba(255,255,255,0.8)`) com texto `#171717`. Cards usam borda `rgba(255,255,255,0.1)`, que desaparece no fundo branco.

Está em `docs/architecture/GAPS.md` como intenção não identificada. A revisão dessa inversão é decisão deste pacote (`docs/redesign/`), não um conserto solto no meio de outra tarefa. O código só muda na fase 1, quando essa fase for pedida.

### Cor sem sistema

Laranja `#ff8800` no header. Hover do botão primário `#c0012a`. Hover secundário `#ffb300`. Botões de projeto: laranja, azul `#3b82f6`, verde `#10b981`. Hover do menu mobile em azul. Três famílias de acento.

### CSS que não faz o que parece

- `filter: red(10%)` em `src/app/page.module.css` não é filtro CSS válido.
- `box-shadow: rgba(var(--button-secondary-hover), 0.2)` espera canais RGB. A variável é hex. A sombra do hover do card não funciona.
- `.highlight` existe em `page.module.css` e `projetos.module.css` e não é usada no TSX.
- `gap: 24px` está comentado em `.main` da home.

### Hierarquia falsa e LCP

Todos os projetos têm `destaque: true` e `priority` na imagem. Sete imagens competem com o LCP. Não há `sizes` útil.

### Primeira pintura espera JavaScript

`TranslationProvider` importa os JSON no `useEffect` e começa com `isLoading: true`. Título, parágrafo e botões nascem skeleton. O texto já está no repositório.

### Hero sem composição

Coluna de texto a 50%. Foto com `margin-bottom: -80px`. CTAs com `margin-top: -10px`. Carrossel com `width: 50%` dentro dessa coluna. Título 3,5rem, line-height 1,2, peso 700, Montserrat. No mobile a foto usa `!important`.

### SEO

`metadata.description` é `Portoflio digital`. `<html lang="pt">` não acompanha o locale. Sem Open Graph. O CTA da home é `<a href="/projetos">`. O Header usa `next/link`.

### Acessibilidade

Não há `prefers-reduced-motion`. O carrossel roda sempre e os logos duplicados são anunciados duas vezes. Modal sem `role="dialog"`, sem foco preso, sem Esc. `aria-label` do fechar está fixo em português. Erros do formulário sem `aria-live`. Botão de idioma abaixo de 44px. “Sobre” não leva a um sobre.

### Mídia

PNGs de projeto entre centenas de KB e cerca de 1,2 MB. `next.config.ts` não declara opções. O otimizador padrão de `next/image` ajuda em runtime; `priority` em todos os destaques anula a prioridade da foto da home.

### Header e respiro

Logo do header a 2,5rem. Header `top: 20px` e altura 80px contra `body { padding-top: 70px }`. Página de projetos com padding `80px 80px 80px 120px`. Raio 128 no botão desktop e 12 no mobile. Altura 48 no desktop e 56 no mobile. Skeleton em cinza `#f0f0f0`, pensado para fundo claro.

### Modal

`setTimeout` de 2 segundos que fecha o modal não é cancelado no unmount. `responseData` é lido e não usado. Dois modais não devem ser unificados sem pedido.

## 5. O que não é problema para “corrigir” por iniciativa

Registrar e deixar quieto, salvo a fase que o plano nomeia:

- `next-intl` instalado e sem uso.
- `src/middleware.ts` pass-through.
- Alias `@/` sem uso.
- Dois `ContactModal`.
- `ProjetoCard` sem CSS Module próprio.
- Tipo `ProjetoData` exportado pelo componente.
- Ramo de PDF em `menuItems` que nenhum item usa.
- Grupo JSON `language` não lido pelo Header.
- Assets órfãos em `public/`.
- Aspas simples na maior parte dos arquivos e duplas em `layout.tsx`.

## 6. Oportunidades priorizadas

Impacto, complexidade e risco de 1 a 10. Prioridade P0–P3.

| Mudança | Imp. | Comp. | Risco | Pri. |
| --- | --- | --- | --- | --- |
| Tema escuro desenhado; aposentar a inversão do media query | 9 | 3 | 6 | P0 |
| Import estático dos JSON; skeleton deixa de ser o estado inicial | 9 | 3 | 4 | P0 |
| Geist no lugar do `@import` de Montserrat | 8 | 3 | 3 | P0 |
| Hero assimétrico com a cópia existente e logos estáticos | 9 | 4 | 3 | P0 |
| `/projetos` como lista de cases; badge “Destaque” sai enquanto todos forem destaque | 9 | 5 | 3 | P0 |
| Uma rampa de laranja; links de projeto deixam de ser azul e verde | 7 | 2 | 2 | P0 |
| `prefers-reduced-motion` em toda transição | 8 | 2 | 1 | P0 |
| `sizes`; `priority` só na foto da home | 8 | 2 | 2 | P1 |
| Header na mesma linguagem do fundo | 7 | 3 | 2 | P1 |
| Metadata, `lang` com o locale, `next/link` na home | 6 | 2 | 2 | P1 |
| Modal com foco, Esc e `aria-modal`, nos dois call sites | 7 | 4 | 3 | P1 |
| Footer mínimo com os destinos que já existem | 4 | 2 | 1 | P2 |
| Reveal com Intersection Observer, uma vez | 5 | 3 | 2 | P2 |
| Open Graph com a foto existente | 4 | 2 | 2 | P2 |
| Cursor customizado, GSAP, Lenis, scroll horizontal, pin, WebGL | 2 | 8 | 8 | P3 |

P3 está rejeitado. Ver [03-MOTION-SYSTEM.md](03-MOTION-SYSTEM.md).

## 7. Micro-polish já visível no código

1. `margin-bottom: -80px` na foto e `margin-top: -10px` nos CTAs.
2. Carrossel a 50% dentro de uma coluna a 50%.
3. Line-height 1,2 no título com Montserrat 700. O alvo do display em Geist 500 é 0,92, com a saudação fora desse display.
4. `\n` manuais no subtítulo.
5. Dois `<p>` vazios (`description`, `objective`).
6. `filter: red(10%)`.
7. Sombra com `rgba(var(--hex))`.
8. Hover primário vermelho contra marca laranja.
9. Três cores de botão no card.
10. Hover azul no menu mobile.
11. Logo do header a 2,5rem competindo com o H1.
12. Header `top: 20px` e altura 80px contra `padding-top: 70px` no `body`.
13. Padding assimétrico em projetos: `80px 80px 80px 120px`.
14. Raio 128 no desktop e 12 no mobile no mesmo botão.
15. Altura 48 no desktop e 56 no mobile.
16. Skeleton `#f0f0f0` em tema que passa a ser escuro.
17. Classe `.highlight` sem uso nos dois CSS.
18. `gap: 24px` comentado em `.main`.
19. Sete logos duplicados no DOM.
20. `alt` da foto pouco específico; `alt` do projeto usa a `key` (`vegeta`) em vez do título.
21. Todos os cards com a mesma borda laranja de destaque.
22. `priority` em todas as imagens de projeto.
23. `!important` na largura da foto no mobile.
24. Ícone do currículo com `style={{ marginLeft: '8px' }}`.
25. Opacidade 0,8 no texto em vez de token de cor.
26. `white-space: pre-line` segurando quebra artificial.
27. Dropdown de idioma apertado e sem sombra coerente com o header.
28. Overlay do menu `rgba(0,0,0,0.3)`, fraco sobre o conteúdo.
29. `z-index` 1000, 1001, 1002 e 1003 sem escala nomeada.
30. Timeout de fechar o modal sem cancelar no unmount.
31. `responseData` lido e ignorado.
32. Gradiente do badge “Destaque” em todos os cards.
33. Foto com `object-fit: contain` e `min-height: 400px`, sobra vazio.
34. Carrossel sem `prefers-reduced-motion`.
35. Metadata com typo e description genérica.

A fase 12 só mexe no que ainda restar depois das fases anteriores. Não reabrir item já coberto.

## 8. Decisões já tomadas por este pacote

Válidas para as fases de código. O código atual permanece até a fase correspondente ser pedida.

- Tema escuro fixo. `prefers-color-scheme` deixa de inverter cor. Tema claro fica fora até existir um desenho próprio.
- Nenhuma biblioteca nova de motion, scroll ou 3D.
- Geist e Geist Mono no lugar de Montserrat.
- Rotas `/` e `/projetos` preservadas. Cases no lugar da grade. Sem seções About, Skills, Experience ou Timeline.
- Rótulo `navigation.about`: “Início” / “Home”. O `href` continua `/`.
- Faixa de trabalho na home: AgroPulse, VAE Mobility, AG Clinical. Sem a palavra Destaque. Curadoria de ordem, não métrica.
- `next-intl`, middleware, assets não referenciados, contrato `{ name, telephone }` e os dois modais separados permanecem.
- CSS Modules continuam. `docs/decisions/0005-css-modules.md` segue válido. A frase dessa decisão que manda não inverter o media query fica revista por este pacote quando a fase 1 for implementada; o ADR dessa revisão entra nessa fase, não antes.

## 9. Riscos

- Usuários com sistema escuro veem o site claro hoje. O tema fixo muda essa aparência. É intencional.
- Import estático dos JSON pode mostrar português por um instante para quem salvou `en`. É preferível ao skeleton para todo mundo.
- Um agente pode completar biografia, números ou os PNG órfãos. Isso é proibido. Ver [10-AI-DLC.md](10-AI-DLC.md).
- Changelog de produto e `docs/features/` só mudam quando o código mudar. Esta auditoria não altera comportamento.

## 10. Problema de conteúdo

Não há sobre, trajetória, cargo, cidade, anos, e-mail visível nem métricas. O site possível com o material atual é curto. Texto novo de About ou de case (desafio, solução, resultado, número) só entra se o autor escrever os dois JSON antes da fase que for usar esse texto.

Imagens soltas em `public/` não viram projeto até o autor dizer o que são.

`vegeta.png` não sustenta um case visual. O bloco de Vegeta é textual, com a imagem opcional e pequena.
