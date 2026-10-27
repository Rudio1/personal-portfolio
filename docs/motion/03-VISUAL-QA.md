# 03 — Visual QA

Conferido em `http://localhost:3000` depois do código. Desktop largo (a janela passou de 1400) e 390×844. O hover do case não foi filmado com o ponteiro; a regra foi lida no CSS e o lift antigo saiu.

## Hero

ANTES
Saudação e nome no mesmo atraso. Foto aos 120ms, antes da frase. Tudo com o mesmo `rise`.

DEPOIS
No desktop o nome espera 120ms e a foto 580ms, ambos a 700ms. Em 390 o nome espera 80ms, a duração é 560ms e a curva é a de 8px. O subtítulo espera 160ms.

MOTIVO
O nome passa a ter peso e a foto apresenta, em vez de interromper a frase.

RISCO
A primeira carga soma essa sequência. Por isso o fade de rota não roda nesse frame.

RESULTADO
Aprovado.

## Faixa Trabalho

ANTES
Parada enquanto o hero se mexia. O corte entre as duas regiões era seco.

DEPOIS
Entra com 8px e 480ms no mesmo instante da foto. No mobile, aos 260ms, junto da foto.

MOTIVO
A seção seguinte continua o hero em vez de já estar morta.

RISCO
Em telas muito baixas a faixa anima fora da vista. O conteúdo não fica invisível: a animação termina em opacidade 1.

RESULTADO
Aprovado.

## Cases

ANTES
Sete fades iguais. Hover com lift, scale 1.03, borda e tag ao mesmo tempo. Uma regra de `transform: none` abaixo de 1024px podia brigar com o reveal.

DEPOIS
O observer continua uma vez só. No desktop o lado direito espera 60ms. Vegeta não espera. O card não sobe. A imagem vai a `scale(1.02)`. A borda esquenta. Em 390 o reveal é um bloco de 8px.

MOTIVO
Um gesto por peça, e um intervalo curto entre imagem e texto, sem parecer outro site a cada case.

RISCO
1.02 é o piso da faixa. Numa captura estática some. No quadro de cerca de 640px são cerca de 13px de crescimento, o bastante agora que o card não salta. Não subi para 1.03.

RESULTADO
Aprovado.

## Header

ANTES
O mesmo fundo no topo e no meio da página.

DEPOIS
Com scroll, a classe de estado entra e o fundo vai a `rgba(9, 9, 9, 0.92)`. A altura segue 64px. Ao abrir `/projetos` no topo, o estado some de novo.

MOTIVO
A barra responde sem virar animação.

RISCO
O sentinela é absoluto no topo. Um scroll mínimo já troca o fundo. A troca é só cor, em 200ms.

RESULTADO
Aprovado.

## Rota

ANTES
`/` virava `/projetos` no corte.

DEPOIS
O clique client chegou em `/projetos`. O template não anima a primeira carga. A ida seguinte usa 220ms de opacidade, sem translate, para não somar com o reveal.

MOTIVO
Chegada curta, sem tela de espera e sem saída falsa.

RISCO
Não há animação de saída. O App Router desmonta a página antiga no clique.

RESULTADO
Aprovado.

## Modal e microinterações

ANTES
Botões e links já trocavam cor. A borda do input não transicionava. O modal já abria em 240ms.

DEPOIS
Tag e input usam 160ms na borda. Botão e link seguem em 200ms. Nada ganhou translate.

MOTIVO
Resposta imediata sem um segundo gesto.

RISCO
Baixo. O foco visível continua o anel accent.

RESULTADO
Aprovado.

## Reduced motion

O bloco global segue zerando duração e atraso. O reveal só ganha classe de deslocamento se o media query permitir. O parallax da foto e o fade de rota também. O conteúdo não fica em opacidade 0.

RESULTADO
Aprovado.

## Notas

| Critério | Nota |
| --- | --- |
| Fluidez | 8 |
| Hierarquia de movimento | 8 |
| Timing | 8 |
| Easing | 8 |
| Continuidade entre seções | 8 |
| Microinterações | 8 |
| Qualidade do hover | 8 |
| Experiência mobile | 8 |
| Performance | 8 |
| Acessibilidade | 8 |

Performance aqui é o custo do motion: sem biblioteca, sem listener de scroll, sem `will-change`, só `transform` e `opacity` mais cor em alvos pequenos. LCP, CLS e INP de laboratório não foram medidos nesta passagem.

Nenhum critério ficou abaixo de 8. Não houve segunda rodada e não houve pedido de biblioteca.

## O que não entrou

GSAP, Lenis, Motion, parallax nos cases, blur, cursor, pin, scroll horizontal, encolhimento do header, animação de saída de rota.

## Próximos microajustes, se um dia a fluidez pedir mais

- Subir o scale do case para 1.025 se, com o mouse em cima, 1.02 passar despercebido.
- Medir LCP, CLS e INP em produção antes de afirmar os números de laboratório.
- Só então, e só se a fluidez cair abaixo de 8, abrir um documento separado sobre biblioteca. Nesta passagem CSS e o observer chegaram no gate.
