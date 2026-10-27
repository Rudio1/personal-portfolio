# 01 — Motion audit

Olhado em `http://localhost:3000/` e `/projetos` com o dev server já no ar, desktop. O frame final da home está editorial e legível. O problema não é o desenho. É o tempo.

O movimento existe, mas é o mesmo gesto repetido: opacidade e um `translateY` igual, no mesmo easing, para peças que deveriam ter peso diferente.

## Hero

Em `src/app/page.tsx` e `src/app/page.module.css`:

| Peça | Atraso atual | O que se vê |
| --- | --- | --- |
| Eyebrow | 0 | Entra com o mesmo `rise` de 12px e 700ms |
| Saudação | 80ms (`d1`) | Anda junto com o nome |
| Nome | 80ms (`d1`) | Não tem presença própria. É gêmeo da saudação |
| Subtítulo | 160ms (`d2`) | Mesmo gesto, só mais tarde |
| CTAs | 240ms (`d3`) | Mesmo instante dos logos |
| Logos | 240ms (`d3`) | Não são cauda da ação. São outro fade igual |
| Foto | 120ms | Chega antes do subtítulo. A pessoa aparece no meio da frase |

Não há hierarquia. Não há “materializar, organizar, apresentar”. Há uma lista de fades. A faixa Trabalho, logo abaixo, não se move. O hero termina e a seção seguinte já estava parada. A continuidade quebra aí.

A foto ainda tem parallax de 8px no desktop (`animation-timeline: view()`). É pouco e só existe se o navegador souber a timeline. Não é o problema. Também não deve crescer.

## Header

A barra já nasce flutuante, escura, 64px, em `Header.module.css`. Hover e ativo usam `--accent`. O sublinhado cresce em 300ms. Isso está certo e é local.

Não há estado de scroll. No topo e no meio da página a barra é a mesma. No mobile o painel cobre a tela e o `backdrop-filter` fica desligado de propósito, para o painel não ficar preso na barra. Qualquer estado de scroll não pode religar esse filtro no mobile.

Entrada do header seria um segundo herói. Não entra.

## Projetos

Os sete cases usam o mesmo reveal: 700ms, 12px, uma vez, via `IntersectionObserver` em `ProjetoCard.tsx`. O screenshot de `/projetos` pegou o Vegeta no meio desse fade, já com o título da página parado. O título chega de uma vez e os cases pingam iguais. Não há ritmo entre um trabalho e o outro, nem entre imagem e texto.

O hover empilha quatro respostas ao mesmo tempo: o card sobe 4px, a imagem vai a `scale(1.03)`, a borda esquenta e a tag muda a borda. Abaixo de 1024px uma regra `.case:hover { transform: none }` ainda pode brigar com o `transform` do reveal.

Vegeta não tem imagem. O reveal dele é só texto, mas com o mesmo tempo dos outros.

## Modal

Overlay em 200ms e painel em 240ms com 8px, em `ContactModal.module.css`. Abrir tem presença. Fechar desmonta na hora. Isso permanece: uma lib só para a saída não se paga. Foco, Esc e retorno de foco já existem e não são problema de motion. Inputs não transicionam a borda.

## Navegação

`/` para `/projetos` troca o miolo na hora. Não há `template.tsx`. O header fica montado, o que é o certo. A página nova não tem chegada.

Saída animada não cabe limpa no App Router: a página antiga desmonta no clique. Documentado aqui para não inventar arquitetura.

## Mobile

Abaixo de 768px os atrasos `d1`–`d3` zeram. Só a foto espera 80ms, ainda com o mesmo tipo de subida, só que 8px. É o desktop desligado, não um ritmo de tela pequena. Hover não deve ser o que carrega a fluidez no toque.

## Decisão desta auditoria

Cinco grupos no desktop, não sete fades e não um número fechado antes de olhar:

1. Rótulo. Eyebrow em 0.
2. Identidade. Saudação em 40ms, nome em 120ms. O nome é o peso.
3. Frase. Subtítulo em 260ms.
4. Ação. CTAs em 380ms, logos em 460ms, como cauda, não como outro ato.
5. Presença. Foto em 580ms, por último.

A faixa Trabalho entra com gesto menor (8px, 480ms) no mesmo instante da foto, para a seção seguinte não estar morta quando o hero acaba.

No mobile, quatro batidas e 8px: eyebrow com a saudação em 0, nome em 80ms, frase com ações e logos em 160ms, foto e faixa em 260ms. Duração 560ms, mais curta que os 700ms do desktop.

Hover do case vira um gesto. A imagem começa em `scale(1.02)` e a borda aquece. O card não sobe. Se 1.02 sumir na imagem, o teto é 1.03. Tags e links não se deslocam.

Header só troca a opacidade do fundo quando um sentinela sai do topo. Altura fica 64px. Sem listener de `scroll`.

Troca de rota: opacidade de 220ms só depois da primeira carga, para não cobrir a entrada do hero. Sem tela de loading.

Parallax continua só na foto, 8px, desktop, ponteiro fino. Cases não ganham parallax.

Nenhuma biblioteca nesta etapa.
