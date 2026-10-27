# 09 — Plano de implementação

Cada fase de código espera o pedido “implementar fase N”. A fase 0 é este pacote de documentação. A fase 8 não começa.

Ordem de execução depois da fase 0:

1 → 2 → 3 → 4 → 5 → 9 → 10 → 6 → 7 → 11 → 12

A fase 8 fica registrada como rejeitada, fora dessa fila.

Antes de qualquer fase de código, ler [AGENTS.md](../../AGENTS.md), [10-AI-DLC.md](10-AI-DLC.md) e os docs desta pasta citados no prompt. Não inventar decisão que estes arquivos já tenham tomado.

Prioridade, impacto, complexidade e risco estão na [01-AUDIT.md](01-AUDIT.md).

## Fase 0 — Preparação

Documentação em `docs/redesign/`. Zero alteração em `src/`. Sem changelog de produto.

Aceite: os dez arquivos existem e `docs/README.md` aponta para eles.

## Fase 1 — Design system

Impacto 9, complexidade 3, risco 6, P0. O risco é a mudança de aparência para quem usa o sistema em escuro (hoje vê o site claro).

### Prompt

```
Objetivo
Aplicar o tema escuro fixo, Geist visível e o botão compartilhado. Tirar o skeleton do primeiro render. Não redesenhar a composição da home nem do header.

Arquivos que podem ser modificados
- src/app/globals.css
- src/app/layout.tsx (só a família no body; as fontes Geist já são carregadas)
- src/contexts/TranslationContext.tsx
- src/components/button.module.css (novo)
- CSS Modules que ainda declarem Montserrat ou a cor antiga de botão, apenas para apontar para o token ou para o module do botão, sem mover layout
- docs/decisions/ (ADR novo da decisão de tema e fonte; ajuste da frase em 0005 que proíbe inverter o media query)
- docs/features/ da home, projetos, navegação e i18n, no que o tema e o loading mudarem
- docs/changelog/CHANGELOG.md

Arquivos que não devem ser modificados
- src/app/api/contact/route.ts
- src/middleware.ts
- src/data/projetos.ts
- messages/ (não há texto novo nesta fase)
- package.json
- public/
- next.config.ts

Regras
- Ler docs/redesign/02-DESIGN-SYSTEM.md e docs/redesign/04-ARCHITECTURE.md.
- Não usar Tailwind, next-intl, GSAP, Framer nem Three.
- Não inverter prefers-color-scheme. Remover o bloco que pinta o fundo de branco.
- Remover o @import do Google Fonts.
- body usa var(--font-geist-sans).
- Import estático de messages/pt.json e messages/en.json. isLoading inicial false. t() funciona no primeiro render em pt. useEffect só troca para en se localStorage for en ou pt.
- changeLocale só aceita pt ou en.
- Botão primário e secundário conforme o design system, altura 48, raio 999.
- :focus-visible com outline accent.
- Bloco prefers-reduced-motion como em docs/redesign/03-MOTION-SYSTEM.md.
- Não apagar next-intl, middleware nem assets.
- Header pode continuar visualmente antigo nesta fase. Não “adiantar” a fase 3.
- Registrar ADR e changelog porque a cor visível muda.

Critérios de aceitação
- Com o sistema operacional em escuro e em claro, o fundo da página é #090909 e o texto é #F3F0EA.
- Não há pedido de rede para fonts.googleapis.com.
- Recarregar a home mostra o título em português imediatamente, sem skeleton de título.
- Se localStorage.locale for en, o texto troca para inglês depois da hidratação, sem ficar vazio.
- Tab mostra anel laranja.
- npm run lint sem erro novo. npm run build porque o provider e o layout mudam.

Como testar
- npm run dev. Abrir / e /projetos.
- DevTools, Rendering, prefers-color-scheme dark e light.
- Application, localStorage, locale=en e locale=pt, recarregar.
- Network, filtrar font e css, confirmar ausência do Google Fonts.

Visual QA
- Screenshot de / em 1440 e 390, tema do SO escuro e claro. O fundo da página é escuro nos dois. O header ainda pode ser a pílula clara: isso não é falha desta fase.
- Screenshot de /projetos. Cards podem continuar feios até a fase 4; não podem voltar ao fundo branco.
- Build verde não encerra. Se o título piscar vazio, a fase não passou.
```

## Fase 2 — Hero

Impacto 9, complexidade 4, risco 3, P0.

### Prompt

```
Objetivo
Recompor a home conforme docs/redesign/08-VISUAL-DIRECTION.md: hero assimétrico, logos estáticos, CTAs, foto, faixa Trabalho com três links. Sem animação de entrada (isso é a fase 6).

Arquivos que podem ser modificados
- src/app/page.tsx
- src/app/page.module.css
- messages/pt.json
- messages/en.json
- src/components/button.module.css, só se o CTA ainda não conseguir usar as classes da fase 1
- docs/features/home.md
- docs/changelog/CHANGELOG.md

Chaves novas permitidas, nos dois JSON, e só estas:
- home.eyebrow = "Full stack" / "Full stack"
- home.work = "Trabalho" / "Work"
- home.portraitAlt = "Guilherme Rudio" / "Guilherme Rudio"
- a11y.skip se o skip link for marcado nesta fase; senão deixar para a fase 3

Arquivos que não devem ser modificados
- src/data/projetos.ts
- src/app/projetos/**
- src/components/Header.tsx (fase 3), salvo um id no main desta página
- src/app/api/contact/route.ts
- src/components/ContactModal.tsx
- public/ (não trocar a foto, não usar PNG órfão)
- package.json

Regras
- Seguir 08-VISUAL-DIRECTION.md e 07-RESPONSIVE.md.
- main com id="conteudo".
- Não renderizar home.description nem home.objective quando o trim for vazio. Não apagar as chaves.
- Subtítulo flui, sem white-space: pre-line.
- Logos uma vez no DOM. Sem @keyframes scroll. Sem a segunda cópia.
- Sem margin negativa. Sem !important na foto. Sem style inline no ícone.
- CTA interno com next/link para /projetos. Currículo continua o PDF em nova aba.
- Faixa com links para /projetos#agropulse, /projetos#vae-mobility, /projetos#ag-clinical. Título do link = projects.items.<key>.title. As âncoras passam a existir na fase 4; até lá o link abre /projetos.
- Não inventar métrica, cargo ou descrição.
- Altura do botão 48 nos dois breakpoints. Raio 999.
- priority da foto: default sem priority, como em docs/redesign/05-PERFORMANCE.md, porque no mobile a foto fica abaixo dos CTAs.

Critérios de aceitação
- Em 1440: texto à esquerda, foto à direita com no máximo 420px, nome em display, saudação menor e muted.
- Em 390: coluna única na ordem eyebrow, título, texto, CTAs, logos, foto, faixa. Sem scroll horizontal.
- Sete logos, não quatorze.
- Nenhum parágrafo vazio no DOM.
- npm run lint. npm run build se os tipos dos JSON ou imports mudarem.

Como testar
- / em pt e en.
- Clicar em Ver Projetos (navegação cliente, documento não recarrega por completo).
- Clicar no currículo (nova aba, PDF).
- Clicar num trabalho da faixa (vai para /projetos).
- Reduzir a janela a 375, 768 e 1024.

Visual QA
- Screenshots 1440 e 390, pt. Comparar com a spec do hero: sem carrossel, sem margem que encoste a foto no CTA, logos legíveis, nome não cortado.
- Repetir em en e ver se o display quebra de forma ilegível. Se quebrar, ajustar o clamp no mobile como a spec permite, sem mudar a string.
- Build verde não encerra.
```

## Fase 3 — Navegação

Impacto 7, complexidade 3, risco 2, P1.

### Prompt

```
Objetivo
Header na linguagem escura do design system, rótulo Início, skip link, alvo de idioma com 44px, CTA da home em next/link se a fase 2 não tiver feito.

Arquivos que podem ser modificados
- src/components/Header.tsx
- src/components/Header.module.css
- src/app/globals.css (só token de header ou z-index que falte)
- src/app/page.tsx e src/app/projetos/page.tsx só para id="conteudo" e next/link
- messages/pt.json e messages/en.json: navigation.about passa a "Início" / "Home"; a11y.skip
- docs/features/navegacao.md
- docs/changelog/CHANGELOG.md

Arquivos que não devem ser modificados
- src/components/ContactModal.tsx (fase 5)
- src/app/api/contact/route.ts
- src/middleware.ts
- src/data/projetos.ts
- package.json

Regras
- docs/redesign/02-DESIGN-SYSTEM.md seção Header e docs/redesign/06-ACCESSIBILITY.md.
- Não criar rota /sobre.
- Hover e ativo em --accent, nunca #3b82f6.
- Menu mobile fundo --bg, texto --fg.
- Overlay do menu rgba(0,0,0,0.6).
- Logo do header 1.25rem, não 2.5rem.
- Altura da barra 64px. padding do conteúdo não deixa o H1 debaixo da barra.
- Skip link primeiro focável, visível no foco, leva a #conteudo.
- z-index pelos tokens --z-header, --z-overlay, --z-menu, --z-skip.
- Não unificar modais. O botão Contato continua abrindo o modal do Header.

Critérios de aceitação
- Barra escura e legível sobre o fundo escuro, desktop flutuante e mobile full-bleed.
- Menu "Início" vai para /. "Projetos" vai para /projetos. "Contato" abre o modal.
- Tab a partir do topo cai no skip link.
- Idioma com altura pelo menos 44px. Esc fecha menu e dropdown.
- npm run lint.

Como testar
- Desktop 1440: hover nos links, rota ativa, dropdown de idioma, modal abre.
- 390: menu abre, fecha no overlay, no Esc e num link. Fundo do painel escuro.
- Teclado do início ao conteúdo, sem rato.

Visual QA
- Screenshot do header em 1440 e do menu aberto em 390.
- Confirmar que o H1 da home não fica escondido.
- Build verde não encerra.
```

## Fase 4 — Projetos

Impacto 9, complexidade 5, risco 3, P0.

### Prompt

```
Objetivo
Trocar a grade de cards iguais por uma lista de cases. Tirar o badge Destaque da UI enquanto todos os itens forem destaque. Vegeta não depende da miniatura de 12 KB.

Arquivos que podem ser modificados
- src/app/projetos/page.tsx
- src/app/projetos/projetos.module.css
- src/components/ProjetoCard.tsx
- docs/features/projetos.md
- docs/changelog/CHANGELOG.md

Arquivos que não devem ser modificados
- messages/ (títulos e descrições permanecem)
- src/data/projetos.ts, salvo leitura. Não mudar links, tipos nem acrescentar projeto. Não é obrigatório mudar destaque no dado
- src/app/api/contact/route.ts
- public/
- package.json
- Header, exceto se o id="conteudo" da página ainda não existir

Regras
- docs/redesign/08-VISUAL-DIRECTION.md seção /projetos e docs/redesign/07-RESPONSIVE.md.
- article com id igual à key (agropulse, vae-mobility, ag-clinical, e as outras).
- h1 da página = projects.title. h2 = título do projeto.
- Imagem com alt = título traduzido. sizes conforme docs/redesign/05-PERFORMANCE.md. Sem priority.
- Sem badge projects.badges.destaque na renderização. Não apagar a chave.
- Tipo do projeto como meta, não como pílula colorida em azul ou verde.
- Links usam os rótulos projects.buttons.*. Um estilo só, o botão secundário. Ícone aria-hidden se o texto já nomeia a ação.
- Vegeta: bloco textual. Imagem pequena ou ausente. Não esticar vegeta.png.
- CTA final existente, botões do design system.
- Padding simétrico. Sem margem negativa.
- Hover de imagem e lift só em (hover: hover) and (pointer: fine), translateY(-4px), scale(1.03). Isso pode entrar aqui porque é CSS do case; a fase 7 não precisa repetir.

Critérios de aceitação
- Sete trabalhos, os mesmos de sempre, em lista. Em 1440 a imagem e o texto ficam lado a lado, alternando. Em 390 a imagem fica em cima.
- /projetos#vae-mobility rola até o case.
- Nenhum card com borda laranja de "todos são destaque".
- Nenhum botão azul ou verde.
- npm run lint e npm run build.

Como testar
- Abrir cada demo e cada GitHub que o dado tiver. Vegeta só GitHub. Os outros demos, mais GitHub de agcustom.
- Trocar idioma e ver títulos.
- 375, 768, 1024, 1440.

Visual QA
- Screenshot do primeiro case e de Vegeta em 1440 e 390.
- Confirmar que a imagem não estoura e que o parágrafo é o texto já existente, não um case study inventado.
- Build verde não encerra.
```

## Fase 5 — Modal

Impacto 7, complexidade 4, risco 3, P1.

### Prompt

```
Objetivo
Modal no visual do design system e com o comportamento de diálogo acessível, nas duas instâncias, sem unificar estado e sem mudar o contrato.

Arquivos que podem ser modificados
- src/components/ContactModal.tsx
- src/components/ContactModal.module.css
- src/components/Header.tsx e src/app/projetos/page.tsx só para devolver o foco ao botão que abriu
- messages/pt.json e messages/en.json só para contact.close se for preciso ("Fechar" / "Close")
- docs/features/contato.md
- docs/changelog/CHANGELOG.md

Arquivos que não devem ser modificados
- src/app/api/contact/route.ts
- O payload { name, telephone }
- A regex de telefone e o mínimo de 2 caracteres no nome
- package.json

Regras
- docs/redesign/06-ACCESSIBILITY.md seção Modal e docs/redesign/02-DESIGN-SYSTEM.md.
- role="dialog", aria-modal, aria-labelledby.
- Foco no nome ao abrir. Ciclo de Tab. Esc fecha. Foco volta ao botão de origem.
- aria-invalid e aria-describedby. Sucesso e erro em aria-live="polite".
- autoComplete name e tel.
- Limpar o setTimeout no unmount. Não guardar responseData sem uso.
- Cores: painel --bg-raised, erro --danger, sucesso --success. Sem azul de botão.
- Não acrescentar campo. Não enviar e-mail. Não chamar API_URL no cliente.

Critérios de aceitação
- Abrir pelo header e pela página de projetos. Cada um tem o próprio estado.
- Envio continua POST /api/contact com name e telephone.
- Teclado: Tab não escapa do diálogo enquanto aberto. Esc fecha.
- Nome vazio e telefone inválido mostram as mensagens já traduzidas.
- npm run lint. npm run build porque o modal e os call sites mudam.

Como testar
- Fluxo feliz só se API_URL estiver configurada no ambiente. Se não estiver, testar a validação e um erro de rede sem expor chave. Não inventar .env. Não logar API_KEY.
- Repetir abertura nos dois botões de contato.

Visual QA
- Screenshot do modal aberto em 1440 e 390, com um erro visível e com o estado vazio.
- Confirmar contraste do rótulo e do input.
- Build verde não encerra.
```

## Fase 6 — Motion

Impacto 5, complexidade 3, risco 2, P2. Só depois das fases 9 e 10, para não animar uma UI que ainda vai ser corrigida. Se o pedido vier antes, recusar e apontar a ordem.

### Prompt

```
Objetivo
Entrada única do hero e reveal único dos cases. Parar se prefers-reduced-motion não estiver coberto.

Arquivos que podem ser modificados
- src/components/Reveal.tsx (novo, só se home e projetos compartilharem o observer)
- src/app/page.tsx
- src/app/page.module.css
- src/components/ProjetoCard.tsx ou src/app/projetos/page.tsx
- src/app/projetos/projetos.module.css
- src/app/globals.css só se o bloco de reduced motion da fase 1 estiver incompleto
- docs/features/home.md e docs/features/projetos.md
- docs/changelog/CHANGELOG.md

Arquivos que não devem ser modificados
- package.json (nenhuma dependência)
- src/app/api/contact/route.ts
- messages/, salvo correção de chave quebrada pela marcação

Regras
- docs/redesign/03-MOTION-SYSTEM.md. Sem GSAP, Lenis, Framer, Motion, Three.
- Propriedades: transform e opacity. 700ms, ease-out do doc, 12px, stagger 80ms, no máximo 4 no hero. Mobile: 8px e no máximo 2 atrasos.
- threshold 0.2. unobserve depois. Sem listener de scroll.
- Sem parallax, a menos que sobre tempo e o reduced motion esteja desligado nesse efeito. Não é aceite obrigatório.
- Com prefers-reduced-motion: reduce, o conteúdo aparece no lugar, sem translate.
- A página é legível se o JavaScript do observer falhar: estado inicial no CSS não pode deixar opacity: 0 permanente. Preferir animar a partir de uma classe .is-visible adicionada, com o padrão visível, e só esconder quando JS confirmar que o movimento é permitido. Se isso for complicado, não esconder.

Critérios de aceitação
- Recarregar / mostra o hero assentar uma vez, sem loop.
- Rolar /projetos revela cada case uma vez.
- Emulação de reduced motion: sem deslocamento.
- Nenhum pacote novo no package.json.
- npm run lint.

Como testar
- Chrome, Rendering, prefers-reduced-motion reduce e no-preference.
- 1440 e 390.

Visual QA
- Observar a entrada, não só o frame final. Screenshot do frame final em 1440 tem de coincidir com a fase 2 (nada pode ficar invisível).
- Build verde não encerra.
```

## Fase 7 — Microinterações

Verificação do que [03-MOTION-SYSTEM.md](03-MOTION-SYSTEM.md) marca como P0 e P1. Sem cursor.

### Prompt

```
Objetivo
Completar hover de botão, underline da nav, scale do case, tag, modal e opacidade do logo se alguma fase anterior tiver deixado passar. Não adicionar efeito fora da lista.

Arquivos que podem ser modificados
- CSS Modules das peças acima
- docs/changelog/CHANGELOG.md só se houver mudança visível

Arquivos que não devem ser modificados
- package.json
- Qualquer coisa de WebGL, cursor, scroll horizontal ou pin
- Contrato de contato
- messages/, salvo chave quebrada

Regras
- Se o comportamento já existir, não refatorar. A fase pode terminar sem diff.
- Hover só em (hover: hover) and (pointer: fine).
- Sem magnetic button, sem tilt, sem máscara de texto.

Critérios de aceitação
- Lista P0 e P1 do motion system ou está no CSS ou está explicitamente já coberta por fase anterior no relatório.
- Reduced motion não reintroduz o carrossel.
- npm run lint se houver diff.

Como testar
- Hover com mouse em 1440. Sem mouse, em 390, confirmar que nada depende de hover para ser usável.

Visual QA
- Um hover de case e um hover de nav, descritos no relatório. Screenshot opcional do estado de hover.
- Build verde não encerra a checagem visual.
```

## Fase 8 — Efeitos avançados

Não executar.

Motivo, fechado: WebGL não recomendado, Lenis não, GSAP não, scroll horizontal não, pin não, cursor customizado não. Impacto 2, complexidade 8, risco 8, P3.

Não há prompt de implementação. Um agente que receber “fase 8” responde com o ponteiro para esta seção e para [03-MOTION-SYSTEM.md](03-MOTION-SYSTEM.md) e não instala biblioteca.

O autor reabriu a fase em 2026-10-27 e pediu só a peça mais recomendada. Essa peça é o parallax opcional de 8px na foto, já no CSS da home. WebGL, GSAP, Lenis, scroll horizontal, pin e cursor continuam fora.

## Fase 9 — Performance

Impacto 8, complexidade 2, risco 2, P1. Na fila, depois da fase 5 e antes da fase 6.

### Prompt

```
Objetivo
Cumprir as metas de docs/redesign/05-PERFORMANCE.md: LCP do texto, uma imagem prioritária no máximo, sizes corretos, sem Google Fonts.

Arquivos que podem ser modificados
- src/app/page.tsx
- src/components/ProjetoCard.tsx
- src/app/page.module.css e projetos.module.css se !important ou caixa da imagem causar CLS
- next.config.ts só com opção justificada e citada no changelog
- docs/changelog/CHANGELOG.md com os números medidos em uma frase
- docs/features/home.md e projetos.md se o loading da imagem mudar

Arquivos que não devem ser modificados
- package.json para adicionar lib de animação ou de imagem
- public/ arquivos órfãos (não apagar, não referenciar)
- API de contato
- Traduções de conteúdo

Regras
- Medir com build de produção, Slow 4G, CPU 4x.
- Meta: LCP < 2,0 s, CLS < 0,05, INP < 150 ms.
- Default: foto da home sem priority se estiver abaixo dos CTAs no mobile.
- Cases sem priority, com sizes.
- Não unoptimized.

Critérios de aceitação
- Relatório curto com os três números de / e de /projetos.
- Network sem fonts.googleapis.com.
- HTML com no máximo um preload de imagem de conteúdo, e só se a medição tiver mantido priority.

Como testar
- npm run build && npm start.
- Lighthouse ou Performance panel.

Visual QA
- Confirmar que tirar priority ou ajustar sizes não deixou a foto estourada nem minúscula em 1440 e 390.
- Build verde sozinho não é o aceite. Os números são.
```

## Fase 10 — Acessibilidade restante

Impacto 8 no conjunto, complexidade 2, risco 2. Fecha o que a fase 5 e a fase 3 não tiverem fechado: lang, aria que faltou, contraste medido, metadata.

### Prompt

```
Objetivo
lang no html conforme o locale, metadata sem o typo, Open Graph com a foto existente, contraste do rótulo mono se a medição falhar.

Arquivos que podem ser modificados
- src/contexts/TranslationContext.tsx (documentElement.lang)
- src/app/layout.tsx (metadata e openGraph; não tornar o layout client)
- src/components/ContactModal.tsx se aria tiver ficado incompleto
- CSS de um rótulo, só se a medição de 12px falhar
- messages/ só para string de acessibilidade que ainda esteja hardcoded
- docs/features/i18n.md e contato.md
- docs/changelog/CHANGELOG.md

Arquivos que não devem ser modificados
- Contrato da API
- package.json
- Conteúdo de projetos
- public/ (não criar og.png novo; usar /guilherme-rudio.png)

Regras
- docs/redesign/06-ACCESSIBILITY.md.
- description da metadata deixa de ser "Portoflio digital". Escrever uma frase a partir do subtítulo que já existe, nos dois sentidos se o metadata for único: o metadata do App Router é estático no layout. Uma description em português é o padrão do produto (locale inicial pt). Não montar metadata dinâmico com next-intl. Texto sugerido, fiel ao conteúdo: "Portfólio de Guilherme Rudio, desenvolvedor full stack."
- title pode permanecer "Rudio - Desenvolvedor Full Stack" se ainda for verdadeiro. É verdadeiro.
- openGraph images: a foto existente. Sem ilustração nova.
- Medir contraste do meta 12px no browser. Se passar, não clarear a cor.

Critérios de aceitação
- Trocar idioma altera document.documentElement.lang entre pt e en.
- View source ou elemento html mostra a description nova.
- Tab no modal e o skip link continuam corretos (não regredir a fase 3 e a 5).
- npm run lint e npm run build.

Como testar
- Locale en e pt. Inspecionar lang.
- Compartilhamento: a tag og:image aponta para a foto, sem 404.

Visual QA
- A metadata não muda layout. Abrir / e /projetos mesmo assim e confirmar que o provider não pisca o texto ao setar lang.
- Build verde não encerra.
```

## Fase 11 — Visual QA

Sem feature. Correção do que divergir dos docs.

### Prompt

```
Objetivo
Percorrer o site como usuário e corrigir divergências em relação a docs/redesign/08-VISUAL-DIRECTION.md, 02-DESIGN-SYSTEM.md e 07-RESPONSIVE.md.

Arquivos que podem ser modificados
- CSS e marcação das páginas e componentes já tocados pelas fases anteriores
- docs/changelog/CHANGELOG.md se a correção mudar comportamento visível

Arquivos que não devem ser modificados
- package.json para nova lib
- Textos de projeto e biografia inventada
- API de contato
- Fase 8 (não introduzir efeito avançado para “resolver” um problema visual)

Regras
- npm run dev. Abrir / e /projetos.
- Capturar 1440 e 390, pt e en, menu aberto, modal aberto, hover de case no desktop.
- Lista de problemas com arquivo e o que a spec dizia.
- Corrigir. Capturar de novo. Parar quando a lista fechar ou quando o item for problema de conteúdo (falta texto do autor), não de CSS.
- npm run build verde não substitui a captura.

Critérios de aceitação
- Lista de QA com cada item fechado ou adiado com motivo.
- Sem scroll horizontal em 375.
- Nome legível. Cases com o texto real.

Como testar
- Fluxo: home, troca de idioma, projetos, âncora, modal, teclado, reduced motion.

Visual QA
- Esta fase é o visual QA. O relatório final descreve o que foi visto, não só os arquivos.
```

## Fase 12 — Polish

### Prompt

```
Objetivo
Fechar itens da lista numerada em docs/redesign/01-AUDIT.md seção Micro-polish que ainda estiverem no código depois das fases 1 a 11.

Arquivos que podem ser modificados
- Os arquivos onde o item ainda existir
- docs/changelog/CHANGELOG.md

Arquivos que não devem ser modificados
- Itens já resolvidos (não reformatar o arquivo)
- Contrato, projetos novos, libs novas
- Assets órfãos (não apagar)

Regras
- Percorrer a lista de 35 itens. Para cada um: feito em fase anterior, feito agora, ou não aplicável.
- Não abrir refatoração de aspas, alias @/ ou unificação de modais.
- Não adicionar comentário em código óbvio.

Critérios de aceitação
- Tabela curta no changelog ou no relatório da tarefa com os 35 números e o estado.
- npm run lint.

Como testar
- Repetir home, projetos, modal, 390 e 1440 só nas peças tocadas nesta fase.

Visual QA
- Screenshot só da peça alterada nesta fase, nos dois breakpoints se ela for visível.
- Build verde não encerra.
```
