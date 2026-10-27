# 02 — Design system

Alvo do redesign. Tokens vivem em `:root` de `src/app/globals.css`. Componente visual continua em CSS Module ao lado da página ou do componente. Sem Tailwind, sem CSS-in-JS, sem biblioteca de UI.

Contraste medido com a fórmula WCAG (luminância relativa), par sobre `#090909` salvo indicação:

| Par | Razão |
| --- | --- |
| `--fg` sobre `--bg` | 17,51:1 |
| `--fg-muted` `#A39E96` sobre `--bg` | 7,48:1 |
| `--accent` sobre `--bg` | 7,63:1 |
| `--accent-ink` sobre `--accent` | 7,26:1 |
| `--fg` sobre `--accent` | 2,29:1 — não usar |
| `--danger` sobre `--bg` | 5,46:1 |
| `--success` sobre `--bg` | 10,63:1 |

`#A39E96` passa corpo de texto. Não clarear para `#B7B1A8` salvo uma medição posterior no browser mostrar falha (antialiasing, opacidade por cima, texto menor que 16px em peso 400). Texto de meta em 12px uppercase deve usar `--fg-muted` ou mais claro; se a fase 10 medir falha em 12px, esse rótulo sobe para `--fg` com opacidade 1, não para um cinza novo.

## Cor

Tema único. Não declarar override em `prefers-color-scheme`. Não definir `color-scheme: dark` num bloco que pinte o fundo de branco.

```css
:root {
  --bg: #090909;
  --bg-raised: #121212;
  --fg: #F3F0EA;
  --fg-muted: #A39E96;
  --line: rgba(243, 240, 234, 0.12);
  --line-strong: rgba(243, 240, 234, 0.28);
  --accent: #FF7A1A;
  --accent-hover: #FF8F3D;
  --accent-ink: #1A0E06;
  --accent-soft: rgba(255, 122, 26, 0.14);
  --danger: #E15A4A;
  --success: #7DCEA0;
  --shadow-modal: 0 24px 80px rgba(0, 0, 0, 0.45);
  --header-bg: rgba(9, 9, 9, 0.72);
  --z-header: 1000;
  --z-overlay: 1010;
  --z-menu: 1020;
  --z-modal: 1100;
  --z-skip: 1200;
}
```

Uso:

| Token | Uso |
| --- | --- |
| `--bg` | Fundo da página |
| `--bg-raised` | Superfície de case, dropdown, modal, faixa |
| `--fg` | Título e texto principal. Também fundo do botão primário |
| `--fg-muted` | Subtítulo, saudação, texto secundário. Sem `opacity: 0.8` no parágrafo |
| `--line` | Borda de botão secundário, divisor, card em repouso |
| `--line-strong` | Borda em hover quando não for accent |
| `--accent` | Eyebrow, foco, underline da nav, borda de case em hover, tag |
| `--accent-hover` | Hover de superfície que já é accent |
| `--accent-ink` | Texto sobre fundo accent |
| `--accent-soft` | Fundo de tag |
| `--danger` | Erro de formulário. Não é cor de botão de projeto |
| `--success` | Mensagem de sucesso do contato. Não é cor de botão de demo |
| `--shadow-modal` | Só o modal |

Aposentados, não reintroduzir: `--header-color: #ff8800`, `--button-primary-hover: #c0012a`, `--button-secondary-hover: #ffb300`, azul `#3b82f6`, verde `#10b981`, gradiente `#ff701e → #9c2801`.

Durante a migração, se algum CSS antigo ainda ler `--background` e `--foreground`, apontar esses nomes para `--bg` e `--fg` na mesma fase que trocar o tema, e parar de usá-los em código novo.

`color-scheme: dark` em `html` pode existir junto com o tema escuro fixo, para controles nativos. Não pode vir acompanhado de fundo branco.

## Tipo

Carregamento: `next/font` em `src/app/layout.tsx` (Geist e Geist Mono já estão lá). Aplicar no `body`:

```css
font-family: var(--font-geist-sans), sans-serif;
```

Rótulos mono:

```css
font-family: var(--font-geist-mono), ui-monospace, monospace;
```

Remover o `@import` do Google Fonts e qualquer `font-family: 'Montserrat'`.

| Papel | Tamanho | Peso | Line-height | Tracking | Cor |
| --- | --- | --- | --- | --- | --- |
| Display (nome) | `clamp(3.25rem, 7vw, 6.5rem)` | 500 | 0.92 | -0.045em | `--fg` |
| H1 de página | `clamp(2.5rem, 4vw, 3.5rem)` | 500 | 1.05 | -0.03em | `--fg` |
| H2 de case | `clamp(1.5rem, 2vw, 2rem)` | 500 | 1.15 | -0.02em | `--fg` |
| Saudação | 1.25rem | 400 | 1.4 | 0 | `--fg-muted` |
| Body | 1.0625rem | 400 | 1.6 | 0 | `--fg` ou `--fg-muted` no hero |
| UI / botão | 1rem | 500 | 1.25 | 0 | conforme o botão |
| Meta / mono | 0.75rem | 500 | 1.3 | 0.08em | `--accent` ou `--fg-muted` |
| Logo do header | 1.25rem | 600 | 1 | -0.03em | `--fg` |

Medida de parágrafo: `max-width: 38rem`. Não justificar texto.

Suavização: manter `-webkit-font-smoothing: antialiased` no `body`.

## Espaço

Base 4. Escala permitida: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Valor fora da escala só com motivo no CSS (por exemplo 20px de padding lateral no mobile, que é 16+4 e está na escala; 20 está na lista do responsivo e é exceção nomeada de página, não de componente).

| Nome | px | Uso |
| --- | --- | --- |
| 3xs | 4 | Ajuste fino de ícone |
| 2xs | 8 | Gap de tag, gap de ícone e texto |
| xs | 12 | Gap de botões empilhados |
| sm | 16 | Padding interno compacto |
| md | 24 | Padding de bloco de texto |
| lg | 32 | Gap do grid de case, padding de case |
| xl | 48 | Respiro de seção no mobile |
| 2xl | 64 | Gap do hero desktop; respiro de seção no tablet |
| 3xl | 96 | Respiro de seção no desktop |
| 4xl | 128 | Só se uma seção ficar colada em 96 e a leitura pedir mais. Não é o padrão |

Conteúdo: `max-width: 1120px`, margin inline auto, padding inline 20px abaixo de 768px e 32px daí até o teto.

Sem `margin` negativa para compensar layout.

## Grid

Home, desktop ≥ 1024px: duas colunas, texto `minmax(0, 1fr)`, foto `minmax(280px, 420px)`, gap 64px (48px em 1024–1279).

Cases, desktop ≥ 1024px: 12 colunas. Imagem ocupa 7, texto 5, gap 32px. A alternância é a ordem visual (imagem na coluna 1–7 ou 6–12), não um componente diferente.

Abaixo de 1024px: uma coluna, gap 24px entre imagem e texto.

## Raio

| Elemento | Raio |
| --- | --- |
| Botão | 999px |
| Case e foto do hero | 12px na imagem do case; 16px na foto do hero |
| Modal | 16px |
| Tag | 999px |
| Header desktop | 16px |
| Header mobile | 0 (full-bleed) |
| Input | 10px |

Não alternar o raio do mesmo botão entre breakpoints.

## Sombra

Só `--shadow-modal` no painel do modal. Case em repouso não tem sombra. Hover do case não anima `box-shadow`.

Header: borda `--line` e `backdrop-filter: blur(16px)` sobre `--header-bg`. Sem sombra larga.

## Borda

1px solid `var(--line)` em repouso. Hover de case: `border-color: rgba(255, 122, 26, 0.4)` (accent a 40%). Transição só de `border-color` e `transform`, 200ms.

## Componentes

Não criar biblioteca. Onde o mesmo botão aparecer em mais de um CSS Module, extrair `src/components/button.module.css` com duas classes: primário e secundário. Home, página de projetos e, se a marcação permitir sem reescrever o formulário, o modal importam esse module. Se o modal precisar de botão de perigo/cancelar, a classe secundária cobre o cancelar. O enviar usa a primária.

### Botão primário

Fundo `--fg`, texto `--bg`, altura 48px, padding `0 20px`, peso 500, raio 999. Hover em ponteiro fino: fundo `--fg-muted` não — o primário escurece pouco: fundo `#E4E0D8` (derivado de `--fg`, um passo mais escuro). Como não há token para isso, declarar `--fg-hover: #E4E0D8` junto dos outros tokens na fase 1. Contraste de `#090909` sobre `#E4E0D8` permanece alto. Transição de `background-color` 200ms.

### Botão secundário

Fundo transparente, texto `--fg`, borda `--line`, mesma altura e padding. Hover: borda `--line-strong`, fundo `--bg-raised`.

### Botão de link do case (demo, GitHub)

Mesma forma do secundário. Não colorir por tipo (frontend laranja, backend azul, demo verde). O ícone Lucide permanece (Github, Globe, Database) a 16px, gap 8px. Um case pode ter os dois links; eles ficam lado a lado no desktop e empilhados abaixo de 768px, cada um com altura 48.

### Tag

Fundo `--accent-soft`, texto `--accent`, borda 1px solid `rgba(255, 122, 26, 0.28)`, padding `4px 10px`, raio 999, mono ou sans 0,8125rem, peso 500. Hover: borda `--accent`, sem `translate`.

### Case

Artigo. Superfície `--bg-raised` ou transparente com borda `--line`. Raio 12 no conjunto, `overflow: hidden` na imagem. Conteúdo com padding 32px (24px abaixo de 768px). Sem badge de destaque. Badge de tipo (`projects.types.*`) pode permanecer como meta mono, sem caixa preta flutuante sobre a imagem: fica acima do título, junto das tags ou no lugar do eyebrow do case.

### Header

Fundo `--header-bg`, texto `--fg`, borda `--line`, blur 16px. Desktop: flutuante, `top: 16px`, largura `calc(100% - 32px)`, `max-width: 1120px`, centrado, altura 64px, raio 16px. O `padding-top` do `body` ou da página precisa cobrir 16+64 mais 24px de respiro (104px no mínimo). Não deixar o H1 debaixo do header.

Logo 1,25rem, peso 600. Link de nav 1rem, peso 500. Underline no hover, 2px, `--accent`, largura de 0 a 100% em 300ms. Item ativo (rota atual) pode deixar o underline em 100% sem hover. Cor de hover do texto: `--accent`. Nunca azul.

Mobile ≤ 767px: barra full-bleed no topo, altura 64px, raio 0, `top: 0`. Menu em painel `--bg`, não branco.

### Idioma

Alvo mínimo 44px de altura. Bandeira 20×14 como hoje. Chevron 14px. Menu: fundo `--bg-raised`, borda `--line`, raio 12, padding 8px, item com padding 12px 16px. Sombra não é obrigatória; a borda basta.

### Modal

Fundo do painel `--bg-raised`, texto `--fg`, raio 16, sombra `--shadow-modal`, borda `--line`. Overlay `rgba(0, 0, 0, 0.6)`. Largura máxima 28rem. Input fundo `--bg`, borda `--line`, texto `--fg`, raio 10, altura 48. Erro: borda `--danger`, texto `--danger`. Sucesso: texto `--success`.

### Skip link

Fora da tela até o foco. No foco: posição fixa, `z-index: var(--z-skip)`, fundo `--fg`, texto `--bg`, padding 12px 16px.

### Footer

Se existir: borda superior `--line`, padding 32px, texto `--fg-muted`, links com o mesmo underline da nav. Sem coluna de newsletter.

## Estados

| Estado | Tratamento |
| --- | --- |
| Repouso | Token de superfície e borda `--line` |
| Hover (ponteiro fino) | Ver botão, tag, case, nav. Sem hover em touch |
| Foco visível | `outline: 2px solid var(--accent); outline-offset: 3px`. Não remover outline no clique sem substituir por esse anel |
| Ativo (nav) | Underline presente |
| Desabilitado | Opacidade 0,45, `cursor: not-allowed`, sem hover |
| Erro de campo | Borda e mensagem `--danger`, `aria-invalid` |
| Sucesso | Mensagem `--success`, região `aria-live="polite"` |
| Loading de envio | Texto `contact.sending` e o spinner que já existe. Não skeleton de página |
| Reduced motion | Ver [03-MOTION-SYSTEM.md](03-MOTION-SYSTEM.md) |

## O que não entra no sistema

Cursor desenhado, gradiente de texto, sombra colorida no card, badge “Destaque” universal, três cores de ação, Montserrat, escala de z-index solta (1000/1001/1002/1003).
