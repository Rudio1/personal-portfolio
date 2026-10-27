# Tema escuro fixo e Geist visível

## Contexto

O CSS aplicava Montserrat via Google Fonts e invertia as cores dentro de `prefers-color-scheme: dark`: sistema escuro via o site claro, sistema claro via o site escuro. O layout já carregava Geist e Geist Mono sem uso. O pacote `docs/redesign/` pediu um tema único e a fonte que já estava no projeto.

## Decisão

O tema visível é escuro e fixo. Tokens em `:root` de `src/app/globals.css`. Não há override de cor em `prefers-color-scheme`. `color-scheme: dark` acompanha esse tema.

A família visível é Geist (`--font-geist-sans` no `body`). Rótulos usam Geist Mono. Montserrat e o `@import` do Google Fonts saíram.

## Motivo

O pedido de redesign aprovado em `docs/redesign/`. Um acento laranja só funciona se o fundo não trocar sozinho com o sistema operacional. Geist já era carregado por `next/font` e dispensa o pedido bloqueante ao Google Fonts.

## Alternativas consideradas

- Manter a inversão do media query. Rejeitada: o header e os cards não tinham um tema claro desenhado.
- Tema claro e tema escuro, os dois desenhados. Fora desta rodada.
- Outra família de display além de Geist. Rejeitada no `docs/redesign/08-VISUAL-DIRECTION.md`.

## Consequências

- Cor nova compartilhada entra como token em `:root`.
- Não reintroduzir `@import` de fonte nem o bloco que pinta o fundo de branco no modo escuro do sistema.
- `docs/decisions/0005-css-modules.md` continua valendo para CSS Modules. A frase que proibia inverter o media query fica substituída por esta decisão.
- `prefers-reduced-motion` segue em `globals.css` e não é um tema de cor.
