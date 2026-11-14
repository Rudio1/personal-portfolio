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

## Consequências

- Não reintroduzir Geist, o laranja `#ff7a1a` nem `@import` de fonte.
- Cor compartilhada nova entra como token em `:root`, como antes.
- Variável de fonte nova vai no `<html>`, não no `body`.
- A 0006 continua válida para tema escuro fixo e para o fim da inversão de cor.
