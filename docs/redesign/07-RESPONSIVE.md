# 07 — Responsivo

A experiência muda de composição. Não é o mesmo layout espremido. Breakpoints do código:

| Nome | Largura | Query |
| --- | --- | --- |
| Mobile | 375, 390, 430 | `max-width: 767px` |
| Tablet | 768 e o miolo até 1023 | `min-width: 768px` e `max-width: 1023px` |
| Desktop compacto | 1024 | `min-width: 1024px` |
| Desktop | 1440 | herda desktop; coluna continua 1120 |
| Largo | 1920 e ultrawide | herda desktop; sem layout novo |

Não criar um CSS diferente para 375, 390 e 430. O intervalo mobile cobre os três. Verificar os três na fase 11 porque a foto, o display e os CTAs quebram fácil em 375.

Hover de lift, scale de imagem e opacidade de logo só dentro de:

```css
@media (hover: hover) and (pointer: fine) { }
```

## Desktop — 1440, 1920, ultrawide

- Conteúdo `max-width: 1120px` centrado.
- Display no teto: 6,5rem. Não cresce em ultrawide.
- Hero em duas colunas. Foto no máximo 420px. Gap 64px.
- Cases em 7/5 colunas, imagem e texto alternando o lado a cada item.
- Header flutuante, 64px de altura, `top: 16px`.
- Respiro de seção 96px.
- Reveal da fase 6 com 12px, se essa fase já tiver sido pedida.
- Sem pin, sem scroll horizontal, sem cursor especial.

Ultrawide: as margens laterais crescem. A coluna não.

## Tablet — 768 e 1024

### 1024 até 1279

- Hero ainda em duas colunas. Gap 48px.
- Display pelo `clamp` (menor que 6,5rem nessa largura).
- Cases ainda em 7/5 se a coluna de texto não ficar abaixo de cerca de 280px. Se ficar apertado no QA, a quebra da lista para uma coluna começa em 1100px, não em 768. Default: quebra da lista em `max-width: 1023px`.
- Header flutuante como no desktop, se a nav couber. Se “Início / Projetos / Contato / idioma” quebrar linha, o menu mobile começa em 1023px em vez de 767px. Default do código atual é 768. Manter 767px como corte do menu e checar no QA de 1024 se a nav cabe com logo 1,25rem e gap 24px. Se não couber, subir o corte do menu para 900px e registrar no CSS com um comentário de uma linha. Não esconder itens.

### 768 até 1023

- Hero em uma coluna. Ordem: eyebrow, título, subtítulo, CTAs, logos, foto, faixa de trabalho.
- Foto máxima 320px neste intervalo (280px só abaixo de 768).
- Cases em uma coluna: imagem em cima, texto embaixo, sem alternância.
- Menu: o drawer que já existe, com fundo `--bg` e texto `--fg`. Hover azul sai.
- Respiro de seção 64px.
- CTAs ainda podem ficar em linha se os dois couberem; se não, empilhar. Default: empilhar abaixo de 600px, em linha de 600 a 1023, cada um altura 48.

## Mobile — 375, 390, 430

- Padding lateral 20px.
- Header full-bleed, `top: 0`, altura 64px, raio 0.
- Display pelo `clamp`, com piso 3,25rem. Em 375px, 7vw é cerca de 26px, então o piso de 3,25rem (52px) manda. Se o nome quebrar em três linhas, baixar o piso só neste breakpoint para `clamp(2.5rem, 12vw, 3.25rem)` dentro do media query mobile. Não usar `!important`.
- CTAs em coluna, largura 100%, `max-width: 20rem`, altura 48, raio 999. Gap 12px.
- Logos em fileira com `flex-wrap: wrap`, gap 16px, centrados ou alinhados ao início da coluna (alinhados ao início, como o texto).
- Foto máxima 280px, depois dos logos.
- Tags quebram linha (`flex-wrap`).
- Links do case empilhados, largura 100%.
- Sem scale de imagem, sem `translateY` de hover.
- Reveal, se a fase 6 existir: deslocamento máximo 8px, no máximo dois atrasos no hero.
- Alvos de toque ≥ 44px (botões 48, item de menu com padding vertical que feche 44, idioma 44).
- Overlay do menu `rgba(0, 0, 0, 0.6)`, não 0,3.

## O que existe no desktop e não no mobile

| Efeito | Desktop | Mobile |
| --- | --- | --- |
| Hover de lift do case | sim | não |
| Scale 1,03 da imagem | sim | não |
| Header flutuante com raio | sim | não (barra no topo) |
| Alternância esquerda/direita dos cases | sim, ≥ 1024 | não |
| Stagger de 4 passos no hero | fase 6 | no máximo 2 |
| Parallax opcional da foto | só se a fase 6 incluir, e só com ponteiro fino | não |
| Carrossel | não existe em nenhum | não existe |

## Ordem de leitura

A ordem do DOM é a ordem mobile (texto antes da foto). No desktop, grid posiciona a foto na segunda coluna sem mudar o DOM, para o leitor de tela encontrar o nome antes da imagem. Não duplicar a foto.

## Checklist por largura (fase 11)

- 375: nome não estoura a viewport, sem scroll horizontal, CTAs não cortados, menu abre e fecha.
- 390 e 430: o mesmo, foto não empurra os CTAs para fora da primeira dobra de forma a esconder o nome. O nome fica no topo.
- 768: uma coluna, menu ainda usável, cases sem alternância.
- 1024: duas colunas no hero, nav desktop sem quebra feia.
- 1440: coluna 1120, foto ≤ 420, display ≤ 6,5rem.
- 1920: iguais a 1440 no miolo, margens maiores. Sem elemento esticado até a borda.
