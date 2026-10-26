# Estilo com CSS Modules e tokens globais

## Contexto

As telas têm layout próprio, header fixo e um tema com poucas cores compartilhadas.

## Decisão

Cada tela ou componente relevante tem um CSS Module importado como `styles`. Tokens de cor e a fonte do `body` ficam em `src/app/globals.css`. Ícones vêm de `lucide-react`. Não há Tailwind, CSS-in-JS nem biblioteca de componentes no `package.json`.

A família visível é Montserrat, carregada por `@import` do Google Fonts em `globals.css`. O layout também carrega Geist e Geist Mono com `next/font` e grava as variáveis no `className` do `body`. Nenhum seletor CSS usa `--font-geist-sans` ou `--font-geist-mono`.

`globals.css` define fundo preto e texto branco em `:root`. Dentro de `@media (prefers-color-scheme: dark)`, troca para fundo branco e texto preto, e define `color-scheme: dark` em `html`.

## Motivo

NÃO IDENTIFICADO. É o que está implementado. O README gerado pelo framework menciona Geist; o CSS da aplicação aplica Montserrat.

## Alternativas consideradas

NÃO IDENTIFICADO.

## Consequências

- Estilo novo vai para o CSS Module do arquivo dono daquela tela ou daquele componente.
- Cor compartilhada nova usa variável em `:root` somente se mais de um CSS precisar dela. Caso contrário, fica no module.
- Não introduzir Tailwind, styled-components ou outra lib de estilo sem pedido.
- Não remover Geist nem inverter o bloco `prefers-color-scheme` sem pedido. O efeito atual do media query está descrito em [GAPS.md](../architecture/GAPS.md) como ponto de cuidado, não como correção autorizada.
- `ProjetoCard` continua estilizado por `projetos.module.css` até revisão explícita.
