# Modern Editorial Engineering: paleta lima e três famílias

Substitui a parte de cor e fonte de [0006-tema-escuro-e-geist.md](0006-tema-escuro-e-geist.md).

## Contexto

O autor pediu o redesign v2 em 2026-11-14 ([docs/redesign-v2/PLANO.md](../redesign-v2/PLANO.md)), com uma direção chamada Modern Editorial Engineering, paleta e famílias definidas no pedido.

## Decisão

- Tema escuro e fixo, como na 0006. Sem inversão em `prefers-color-scheme`.
- Paleta em `:root` de `src/app/globals.css`. Fundo `#0B0D0F`, fundo secundário `#121619`, card `#181D20`, texto `#F3F4F2`, texto secundário `#929A9B`, acento `#B8F36B`, borda `#282F30`. Os nomes de token anteriores (`--bg`, `--fg`, `--accent`, `--line`…) ficam, com os valores novos.
- Fontes por `next/font/google` em `layout.tsx`: Space Grotesk (títulos, `--font-display`), Inter (texto, `--font-body`) e JetBrains Mono (rótulos técnicos, `--font-mono`). As classes de variável ficam no `<html>`, porque os tokens de `:root` dependem delas.
- `h1` a `h4` usam `--font-display` por regra global.
- Botão primário é lima com texto `--accent-ink`. O lima é seletivo: foco, item ativo, marcador e CTA principal.
- Escala de tipo, espaço, raio e movimento como tokens em `:root`.

## Motivo

Pedido explícito do autor no redesign v2.

## Alternativas consideradas

- Manter Geist e só trocar a paleta. Rejeitada: o pedido define as três famílias.
- Biblioteca de animação (Framer Motion). Fora desta ADR: o plano aprovado segue com CSS + `IntersectionObserver`.

## Revisão de 2026-11-14: atmosfera viva

O autor achou o resultado plano e pediu algo “vivo”, usando como referência o projeto `copasogo` dele. Entraram:

- **Segundo tom violeta (`--violet: #9d8cff`):** só na luz de fundo, no halo da arte do hero e na luz local da Experiência. O lima continua sendo o único acento de interface.
- **Atmosfera fixa (`src/components/Atmosphere.tsx` + classes em `globals.css`):**
  - brilhos radiais, raios cônicos, grade larga, névoa, vinheta e grão;
  - fica atrás de todas as seções, por isso o `body` é transparente e o `html` leva `--bg`.
- **Molduras chanfradas** (`clip-path` + diagonal em `::after`), placa (`.plate`), filete com losango (`.rule`) e fecho entre seções (`.section::after`).
- **Tipografia dos títulos:** Space Grotesk em maiúsculas, peso 700. A família não mudou.
- **Animações de cena** (`.sceneRise`, `.sceneRule`, `.sceneIdentity`, `.sceneFade`), todas desligadas com `prefers-reduced-motion`.

## Consequências

- Não reintroduzir Geist, o laranja `#ff7a1a` nem `@import` de fonte.
- Cor compartilhada nova entra como token em `:root`, como antes.
- Variável de fonte nova vai no `<html>`, não no `body`.
- A 0006 continua válida para tema escuro fixo e para o fim da inversão de cor.
- Elemento chanfrado não usa `outline` no foco, porque o `clip-path` o cortaria. O foco é uma borda interna (`box-shadow: inset`).
- Violeta não vira cor de texto, botão nem link.
- Degradê só na atmosfera fixa e na arte do hero. Seções, palcos de imagem e o painel de contato usam fundo chapado: o autor reprovou a luz local por seção em 2026-11-14.
