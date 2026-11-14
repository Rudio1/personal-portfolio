# Estilo com CSS Modules e tokens globais

## Contexto

As telas têm layout próprio, header fixo e um tema com poucas cores compartilhadas.

## Decisão

Cada tela ou componente relevante tem um CSS Module importado como `styles`. Tokens de cor e a fonte do `body` ficam em `src/app/globals.css`. Ícones vêm de `lucide-react`. Não há Tailwind, CSS-in-JS nem biblioteca de componentes no `package.json`.

As famílias são Space Grotesk (títulos), Inter (texto) e JetBrains Mono (rótulos), via tokens `--font-display`, `--font-body` e `--font-mono`. O carregamento é `next/font` em `layout.tsx`. Não há `@import` do Google Fonts. Ver [0007-modern-editorial-engineering.md](0007-modern-editorial-engineering.md).

O tema é escuro e fixo. A decisão está em [0006-tema-escuro-e-geist.md](0006-tema-escuro-e-geist.md).

## Motivo

NÃO IDENTIFICADO no commit original. A troca de Montserrat por Geist e o fim da inversão de cor estão em [0006-tema-escuro-e-geist.md](0006-tema-escuro-e-geist.md).

## Alternativas consideradas

NÃO IDENTIFICADO.

## Consequências

- Estilo novo vai para o CSS Module do arquivo dono daquela tela ou daquele componente.
- Cor compartilhada nova usa variável em `:root` somente se mais de um CSS precisar dela. Caso contrário, fica no module.
- Não introduzir Tailwind, styled-components ou outra lib de estilo sem pedido.
- Não reintroduzir Montserrat nem Geist, nem inverter cor em `prefers-color-scheme`. Ver [0006-tema-escuro-e-geist.md](0006-tema-escuro-e-geist.md).
- `ProjetoCard` continua estilizado por `projetos.module.css`.
