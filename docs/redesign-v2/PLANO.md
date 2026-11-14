# Redesign v2 — Modern Editorial Engineering

Diagnóstico técnico e plano de implementação. Escrito em 2026-11-14, antes de qualquer alteração em `src/`.

**Aprovado pelo autor em 2026-11-14**, com animação em CSS + `IntersectionObserver` (D2 recomendado). Substitui o pacote `docs/redesign/` (v1, de 2026-10-27).

| Fase | Estado |
| --- | --- |
| 1 — Auditoria | Concluída |
| 2 — Design system | Concluída em 2026-11-14 (ADR 0007) |
| 3 — Estrutura e componentes | Concluída em 2026-11-14 |
| 4 a 6 | Pendentes |

---

## 1. Diagnóstico técnico

### 1.1 Stack e estrutura

| Item | Estado atual |
| --- | --- |
| Framework | Next.js 15.5.14, App Router, código em `src/` |
| UI | React 19.1, TypeScript, CSS Modules, `lucide-react` |
| Fontes | Geist e Geist Mono via `next/font/google` |
| Animação | CSS (transições e keyframes) + `IntersectionObserver` no `ProjetoCard`. Nenhuma biblioteca |
| i18n | `TranslationContext` próprio, `messages/pt.json` e `messages/en.json`, locale em `localStorage` |
| Rotas | `/` (home), `/projetos` (lista), `POST /api/contact` (proxy) |
| Sem uso | `next-intl` (no `package.json`, sem import) |
| Qualidade | `npm run lint` e `npm run build`. Sem testes, sem CI |

### 1.2 Componentes que existem e o que fazem

| Arquivo | Função | Destino no v2 |
| --- | --- | --- |
| `src/app/layout.tsx` | Metadata, fontes, `TranslationProvider`, `Header`, sentinela de scroll | Fica. Troca as fontes e ganha o `Footer` |
| `src/app/page.tsx` | Hero com nome, subtítulo, CTAs, logos, retrato e lista “Trabalho” | Reescrito como página única com seções |
| `src/app/projetos/page.tsx` | Lista dos 7 projetos + CTA de contato com modal próprio | Fica como arquivo completo dos projetos, com o visual novo |
| `src/components/Header.tsx` | Menu desktop/mobile, idioma, modal de contato, estado “scrolled” | Fica. Links passam a apontar para âncoras da home |
| `src/components/ContactModal.tsx` | Formulário nome + telefone, validação, envio a `/api/contact` | Fica sem mudança de contrato. Só o visual muda |
| `src/components/ProjetoCard.tsx` | Card do case com reveal por observer | Fica para `/projetos`. A home ganha um case editorial maior |
| `src/components/button.module.css` | Botões primário e secundário | Fica com os tokens novos |
| `src/app/template.tsx` | Fade de 220ms entre rotas | Fica |
| `src/components/LoadingSkeleton.tsx` | Skeleton (sem uso no primeiro render desde o v1) | Não mexer |

### 1.3 Recursos disponíveis

- **Projetos (7):** título e descrição em pt/en, tecnologias, uma imagem e links. Os três pedidos (AgroPulse, VAE Mobility, AG Clinical) têm imagem e link de demo.
- **Currículo (`public/curriculo/Curriculo - Rudio.pdf`):** é a fonte verificável para experiência, stack, e-mail e LinkedIn.
  - Grupo Águia Branca — Full Stack, 03/2025 até hoje
  - Trinks — Full Stack Jr, 06/2023 a 03/2025
  - Code and App — estágio backend, 08/2022 a 06/2023
  - Universidade Centro Leste — mentor de programação, 08/2022 a 12/2022
  - Grupo Coutinho — estágio de sistemas, 12/2021 a 08/2022
  - Formação: UCL (2024), KNN Inglês (2023)
- **Stack citada no currículo:**
  - Linguagens e web: React, Next.js, Vue.js, JavaScript, .NET/C#, PHP/Laravel
  - APIs: REST, JWT, OAuth
  - Bancos: SQL Server, MySQL, PostgreSQL, Redis
  - Cloud: Azure (App Services, DevOps), AWS (S3, Lambda)
  - Ferramentas: GitHub Actions, Azure DevOps, Git/Git Flow, Scrum, UiPath
- **Imagens:** retrato ilustrado `guilherme-rudio.png`, 7 logos SVG e 5 screenshots sem uso (`brunelly`, `cecis`, `cybergallery`, `refeicoes`, `tarefas`). Várias PNG passam de 1 MB (`cybergallery` tem 4,3 MB; o `favicon.ico` tem 1 MB).

### 1.4 O que precisa ser preservado

1. A troca pt/en, o locale em `localStorage` e o padrão `pt`.
2. O contrato `POST /api/contact` com `{ name, telephone }`, a validação no cliente (formato) e no servidor (presença), e `API_URL`/`API_KEY` só no servidor.
3. A rota `/projetos` e as âncoras `/projetos#<key>`, que podem estar em links externos.
4. O link do currículo em PDF.
5. O skip link, o `:focus-visible`, o comportamento de `prefers-reduced-motion`, o foco no menu mobile e no modal.
6. A metadata e a imagem Open Graph.

### 1.5 Lacunas em relação ao pedido

- A home não tem Sobre, Experiência, Stack, Contato nem Footer.
- Os cases só têm descrição. Faltam **problema, funcionalidades, responsabilidade e resultados**. Esses campos não existem em nenhum arquivo do repositório e não podem ser inventados.
- O perfil do GitHub não aparece no site. O único indício é `github.com/Rudio1/website_AG-Custom`, em `projetos.ts`.
- A stack de alguns projetos parece incompleta. AG Clinical, por exemplo, está como `fullstack` com só “Vue, Vite”.
- As imagens são pesadas. O `next/image` otimiza na entrega, mas o `next.config.ts` não define formatos.

### 1.6 Conflitos com decisões registradas

O pedido é uma revisão explícita do autor. Mesmo assim, cada conflito vira registro, não “correção” silenciosa:

| Decisão atual | Pedido v2 | Encaminhamento |
| --- | --- | --- |
| ADR 0006: Geist + acento laranja `#ff7a1a` | Space Grotesk / Inter / JetBrains Mono + paleta nova com lima `#B8F36B` | ADR 0007 substitui a 0006. A 0005 ganha nota |
| `docs/redesign/08`: nenhuma família além de Geist | Três famílias | v1 marcado como substituído |
| `docs/redesign/03`: sem Framer Motion | “Framer Motion ou equivalente” | Ver decisão D2 |
| Home com hero + lista; projetos em outra rota | Sete seções na página | Ver decisão D1 |

---

## 2. Decisões propostas (precisam de aprovação)

### D1 — Home de página única, `/projetos` mantida

- `/` passa a ter, nesta ordem: Hero → Sobre → Projetos selecionados (3) → Experiência → Stack → Contato. O Footer fica no layout e aparece nas duas rotas.
- `/projetos` continua com os 7 projetos, no visual novo. A seção da home termina com “ver todos os projetos”.
- No Header, os links viram âncoras (`/#sobre`, `/#projetos`, `/#experiencia`, `/#stack`, `/#contato`). Com o Header em `/projetos`, o mesmo link leva à home na seção certa.
- **Por quê:** atende às sete seções sem quebrar URL publicada nem os quatro projetos que não estão em destaque.

### D2 — Animação sem nova dependência (recomendado)

Tudo o que o pedido lista dá para fazer com CSS + `IntersectionObserver`, padrão que o `ProjetoCard` já usa: fade-in, reveal de texto, deslocamento vertical, hover, zoom em imagem, transição de link, indicador de seção e gatilho por scroll.

- **Proposta:** um componente `src/components/Reveal.tsx` (observer + classe CSS, delay por prop) e tokens de movimento em `globals.css`. Zero KB de biblioteca, sem conflito com o modal que trava `overflow` e com `prefers-reduced-motion` já tratado globalmente.
- **Alternativa:** pacote `motion` (Framer Motion) com `LazyMotion` + `domAnimation`, só nas seções da home. Custa algumas dezenas de KB de JS no cliente e não traz um efeito que o CSS não cubra.
- GSAP: não. O pedido não tem pin, scrub nem timeline.

### D3 — Fontes

`next/font/google` com `Space_Grotesk` (títulos), `Inter` (texto) e `JetBrains_Mono` (rótulos técnicos), `subsets: ['latin']`, `display: 'swap'` e variáveis CSS. Geist sai do `layout.tsx`.

### D4 — Paleta como tokens, com os mesmos nomes

Os valores mudam em `:root`. Os nomes atuais (`--bg`, `--fg`, `--accent`…) ficam, para os CSS Modules continuarem funcionando:

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#0B0D0F` | Fundo principal |
| `--bg-raised` | `#121619` | Seções alternadas, header com scroll |
| `--card` (novo) | `#181D20` | Cards, modal |
| `--fg` | `#F3F4F2` | Texto principal |
| `--fg-muted` | `#929A9B` | Texto secundário (contraste ~6,5:1 no `--bg`) |
| `--accent` | `#B8F36B` | Foco, indicador ativo, um detalhe por seção |
| `--accent-ink` | `#0B0D0F` | Texto sobre o lima |
| `--line` | `#282F30` | Bordas |

Regra do lima: foco, item ativo, marcador de seção, CTA principal do hero e do contato. Nunca em parágrafo nem em bloco grande.

### D5 — Conteúdo novo segue o padrão projetos.ts + JSON

- **Projetos:** os textos novos entram em `projects.items.<key>` nos dois JSON: `problem`, `features`, `role` e `results`. Listas vão como string separada por `\n`, o mesmo recurso que `home.title` já usa. Campo vazio não renderiza o bloco. É assim que se evita inventar conteúdo.
- **Destaque:** o campo `destaque` de `ProjetoData` existe e não é lido. Passa a valer `true` só para AgroPulse, VAE Mobility e AG Clinical, e a home filtra por ele. Os outros quatro ficam `false`.
- **Experiência:** `src/data/experiencia.ts` com `key`, período e local. Cargo e descrição em `experience.items.<key>` nos JSON. Fonte: o currículo.
- **Stack:** `src/data/stack.ts` com as categorias e os nomes das tecnologias, que não se traduzem. Os rótulos das categorias ficam nos JSON. Fonte: o currículo e as tecnologias dos projetos. Sem barra de porcentagem.

### D6 — Contato

A seção Contato traz e-mail (`mailto:`), LinkedIn, GitHub, currículo e um botão que abre o `ContactModal` existente, com instância própria, como já acontece em `/projetos`. O contrato da API não muda e não entra estado global novo.

---

## 3. Fases

Cada fase termina com `npm run lint` e uma checagem visual no dev server: screenshots em 1440, 1024, 768 e 390 px, com troca de idioma e abertura do modal. A fase seguinte só começa depois do seu “ok”.

Para a checagem visual, crio `.claude/launch.json` com `npm run dev`. Esse é o único arquivo de ferramenta novo.

### FASE 1 — Auditoria ✅

Este documento. Saída pendente: as respostas da seção 4.

### FASE 2 — Design system ✅

| | |
| --- | --- |
| Arquivos | `src/app/globals.css`, `src/app/layout.tsx`, `src/components/button.module.css`, os CSS Modules que usem cor fixa, `docs/decisions/0007-*.md`, nota em 0005/0006, `docs/README.md` |
| Entregas | Tokens de cor, tipo (escala fluida com `clamp`), espaço (escala de 4 px), raio, borda, z-index e movimento. Três fontes. Botões novos. Container e grid de 12 colunas como classes utilitárias mínimas em `globals.css` |
| Aceite | As páginas atuais rodam com o visual novo, sem mudança de layout ou texto. Sem layout shift de fonte |

### FASE 3 — Estrutura e componentes ✅

Desvios em relação ao plano: o `Reveal.tsx` ficou para a fase 4 (é animação). Os logos saíram da Stack (ficavam ilegíveis no fundo escuro). `/projetos` só herdou os tokens; o visual próprio dela fica para a fase 6.

| | |
| --- | --- |
| Novos | `src/components/Reveal.tsx`, `About`, `FeaturedProjects` (case editorial), `Experience`, `Stack`, `ContactSection` e `Footer`, cada um com o seu `.module.css` em `src/components/`. `src/data/experiencia.ts` e `src/data/stack.ts` |
| Alterados | `src/app/page.tsx` e `page.module.css` (hero + composição), `layout.tsx` (Footer), `Header.tsx` (âncoras e item ativo), `projetos/page.tsx` e `projetos.module.css`, `src/data/projetos.ts` (`destaque`), `messages/pt.json` e `messages/en.json` |
| Hero | Rótulo mono (“Full Stack Developer · Vitória/ES”), nome em Space Grotesk na escala máxima, frase de posicionamento, CTA “Ver projetos” (lima) e “Contato” (secundário), indicador de rolagem. O retrato ilustrado fica como peça secundária, se você aprovar |
| Case editorial | Imagem grande à esquerda e texto à direita, alternando a cada case. Índice `01/02/03` em mono. Blocos Problema / Funcionalidades / Papel / Resultado e as tags de stack. Links de demo e repositório |
| Experiência | Linha do tempo vertical com o período em mono à esquerda e cargo, empresa e descrição curta à direita |
| Stack | Cinco colunas (Backend, Frontend, Banco, Cloud, Ferramentas) com lista tipográfica e os logos SVG que existem |
| Aceite | As sete seções navegáveis por âncora e por teclado. `/projetos` e o modal funcionam. `npm run build` passa |

### FASE 4 — Animações e microinterações

- Hero: o nome entra linha a linha (máscara + `translateY`), depois o subtítulo e os CTAs (~700 ms no total).
- Seções: `Reveal` com fade + 16 px vertical, uma vez, 60 ms entre filhos.
- Cases: no hover, zoom de 1.03 na imagem e borda em `--line` → `--fg-muted`. Só com `(hover: hover)`.
- Links: sublinhado que cresce da esquerda. As setas dos CTAs andam 2 px.
- Header: indicador da seção ativa (observer) e fundo mais opaco fora do topo, que já existe.
- Indicador de rolagem do hero com pulso lento, que some após o primeiro scroll.
- `prefers-reduced-motion`: sem deslocamento, só opacidade instantânea. Sem scroll suave artificial, sem cursor custom e sem 3D.
- Aceite: animação só em `transform`/`opacity`, sem layout shift e sem listener de `scroll`.

### FASE 5 — Conteúdo e imagens dos projetos

- Preencher `problem`, `features`, `role` e `results` com as suas respostas, em pt e en. O que você não informar fica vazio e não aparece.
- `next.config.ts`: `images.formats: ['image/avif', 'image/webp']`.
- `sizes` corretos por breakpoint, `priority` só no retrato do hero e lazy loading no resto (padrão do `next/image`).
- Alt texts descritivos nos dois idiomas.
- Screenshots extras, se você enviar, entram em `public/projetos/<key>/`. Nenhum asset atual é apagado.

### FASE 6 — Responsividade, acessibilidade e otimização

- **Breakpoints:** 1440+, 1280, 1024, 768, 390 e 360. O mobile tem um desenho próprio:
  - hero com o nome quebrado em duas linhas e retrato abaixo ou oculto
  - cases com a imagem primeiro e os blocos colapsáveis
  - linha do tempo com o período acima do cargo
  - stack em acordeão ou duas colunas
  - menu mobile em tela cheia com as âncoras
- **A11y:** um `h1`, `h2` por seção, `section[aria-labelledby]`, `nav` e `footer` semânticos, foco visível com o lima, alvos de 44 px, contraste AA verificado e o modal com foco preso, como já é hoje.
- **SEO:**
  - metadata e description revisadas
  - Open Graph
  - `src/app/sitemap.ts` e `src/app/robots.ts` (arquivos novos do App Router)
  - JSON-LD `Person` com nome, cargo e links
- **Performance:** só as fontes e pesos usados e nenhum JS novo além do `Reveal`. Lighthouse mobile ≥ 90 em Performance, A11y e SEO, sem erros no console.
- **Fechamento:** `npm run lint`, `npm run build`, `docs/features/*`, `docs/changelog/CHANGELOG.md` e o v1 marcado como substituído.

---

## 4. O que preciso de você antes da Fase 3

Rascunho a partir do currículo e dos sites publicados: [CONTEUDO.md](CONTEUDO.md).

1. **AgroPulse, VAE Mobility e AG Clinical.** Para cada um:
   - problema resolvido
   - 3 a 5 funcionalidades
   - o seu papel (sozinho ou em time, front, back ou tudo)
   - resultados verificáveis (se não houver, o bloco não aparece)
   - stack completa
   - outros links e screenshots
2. **GitHub:** o perfil é `https://github.com/Rudio1`?
3. **E-mail público:** usar o do currículo?
4. **Sobre e frase do hero:** escrevo um rascunho a partir do currículo para você aprovar, ou você prefere mandar o texto?
5. **Retrato:** manter o avatar ilustrado no hero, usar outra foto ou nenhuma?
6. **Experiência:** entram as cinco do currículo, ou só as três de desenvolvimento? Formação entra?
7. **D2:** CSS + observer (recomendado) ou Framer Motion?

## 5. Riscos

- **Conteúdo raso nos cases:** sem as respostas do item 4, os cases ficam bonitos e vazios. O design não compensa isso.
- **Três famílias de fonte:** mais bytes. Mitigação: só os pesos usados e `display: swap`.
- **SEO em inglês:** o servidor renderiza em pt e o en vem depois, no cliente. Isso já é assim e continua. Mudar exigiria rota `/en`, que está fora deste plano.
- **Âncoras com header fixo:** precisam de `scroll-margin-top`.

## 6. Fora deste plano

- Tema claro
- Blog
- CMS
- Rotas `/pt` e `/en`
- `next-intl`
- Mudança no contrato de contato
- Testes automatizados
- Remover imagens ou chaves sem uso
