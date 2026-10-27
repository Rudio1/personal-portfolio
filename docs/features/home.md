# Home

## Objetivo

Apresentar Guilherme Rudio, o parágrafo de full stack, a fileira de tecnologias, dois atalhos (projetos e PDF) e três links para cases em `/projetos`.

## Onde está

- `src/app/page.tsx`
- `src/app/page.module.css`
- Botões: `src/components/button.module.css`
- Textos: `home` em `messages/pt.json` e `messages/en.json`
- Foto: `public/guilherme-rudio.png`
- Logos: `public/logos/` (`azure.svg`, `dotnet.svg`, `sql.svg`, `react.svg`, `next.svg`, `csharp.svg`, `php.svg`)
- Currículo: `public/curriculo/Curriculo - Rudio.pdf`

## Fluxo

A página é Client Component. Não busca API. O texto vem de `t()` no primeiro render.

`home.title` quebra no `\n`: a primeira linha é a saudação, o restante é o `h1`.

`home.description` e `home.objective` só entram no DOM se, depois do trim, não forem vazios.

A faixa Trabalho liga para `/projetos#agropulse`, `/projetos#vae-mobility` e `/projetos#ag-clinical`. Os títulos vêm de `projects.items.<key>.title`.

## Entradas

Nenhuma entrada de formulário. Locale vem do contexto.

## Saídas

- `next/link` para `/projetos` no CTA primário
- PDF em nova aba
- Três âncoras na página de projetos

## Regras

- Cada logo aparece uma vez. Não há carrossel.
- A foto não usa `priority`. O nome é o candidato a LCP.
- Entrada do hero é animação CSS, uma vez, em cinco grupos no desktop: rótulo, identidade (saudação antes do nome), frase, ação (CTAs e depois os logos) e foto por último. A faixa Trabalho entra junto com a foto, com 8px e 480ms. Abaixo de 768px são quatro batidas, 8px e 560ms. `prefers-reduced-motion` zera duração e atraso em `globals.css`.
- A troca de rota usa `src/app/template.tsx`. A primeira carga não anima. A navegação seguinte só muda a opacidade em 220ms.
- No desktop com ponteiro fino, a foto desloca 8px ao longo da própria passagem pela tela (`translateY(4px)` até `-4px`), via `animation-timeline: view()`. Sem listener de scroll. Mobile, toque e reduced motion ficam parados. Navegador sem suporte à timeline não anima.
- Metadata fica em `layout.tsx`: título `Rudio - Desenvolvedor Full Stack`, description `Portfólio de Guilherme Rudio, desenvolvedor full stack.`

## Persistência e API

Nenhuma.

## Erros

Chave ausente faz `t()` devolver `''`.

## Observações

`public/img-rudio.png` não é referenciado. Não remover sem pedido.
