# 02 — Motion system

Refina o que `docs/redesign/03-MOTION-SYSTEM.md` já tinha. Não substitui a proibição de GSAP, Lenis, Motion, cursor, pin e scroll horizontal. Os números abaixo são os que o audit escolheu para este site, não uma tabela genérica.

## Por que estes valores

O easing de entrada `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`) chega rápido e assenta sem bounce. É a curva de algo que se apresenta. O easing de hover `--ease-standard` (`cubic-bezier(0.2, 0, 0, 1)`) é mais seco, porque hover é resposta, não entrada. Os dois já estão em `src/app/globals.css`.

700ms no nome e nos cases dá presença sem virar espera. 480ms na faixa Trabalho é o mesmo desenho, mais curto, para a seção seguinte não competir com o hero. 220ms na troca de rota é o bastante para não parecer corte e pouco para não atrasar o conteúdo. 160–200ms em cor e borda é o tempo em que a mão ainda sente que o controle obedeceu.

Distância de 12px no desktop é o deslocamento que se percebe numa tela grande sem o texto “voar”. 8px abaixo de 768px é o mesmo gesto em menos espaço. Opacidade inicial dos reveals é 0, só depois que o JavaScript confirma que o movimento é permitido. Se o observer não rodar, o conteúdo fica visível.

Escala de hover começa em 1.02. O intervalo permitido é 1.015–1.03. Acima disso a imagem parece zoom de template.

## Durações

| Categoria | Duração | Easing | Uso |
| --- | --- | --- | --- |
| Micro | 160ms | `--ease-standard` | Borda de tag e de input |
| Fast | 200ms | `--ease-standard` | Botão, link, fundo do header |
| Normal | 480ms | `--ease-out` | Faixa Trabalho |
| Slow | 700ms | `--ease-out` | Hero no desktop e reveal de case. No mobile o hero usa 560ms |
| Modal | 240ms no painel, 200ms no overlay | `--ease-out` no painel, linear no overlay | Abrir o contato. Fechar desmonta |
| Page | 220ms | `--ease-out` | Opacidade do miolo só na navegação seguinte |

## Hierarquia

1. Hero. Maior distância, foto por último, nome com atraso próprio.
2. Seções. A faixa Trabalho anda menos e dura menos.
3. Projetos. Cada case revela uma vez. No desktop, imagem e texto não partem no mesmo frame: 60ms entre eles. O lado esquerdo sai primeiro.
4. Microinterações. Só cor ou borda. Sem translate de botão.
5. Secundários. Header não entra. Só o fundo fica mais opaco fora do topo. Logos não têm movimento além da opacidade no hover.

## Sequência do hero

Desktop:

- 0 eyebrow
- 40ms saudação
- 120ms nome
- 260ms subtítulo
- 380ms CTAs
- 460ms logos
- 580ms foto e faixa Trabalho

Mobile, abaixo de 768px:

- 0 eyebrow e saudação
- 80ms nome
- 160ms subtítulo, CTAs e logos
- 260ms foto e faixa Trabalho
- 8px, 560ms

## Cases

Reveal no artigo, uma vez, `threshold: 0.2`, sem listener de scroll. Desktop: 12px. O child da esquerda não espera. O da direita espera 60ms. Vegeta, sem imagem, não espera. Mobile: o bloco inteiro, 8px, sem atraso interno.

Hover, só `(hover: hover) and (pointer: fine)`: imagem `scale(1.02)`, borda do case em `--line-strong` com um toque do accent. O card não translada.

## Header

Sentinela no topo do documento. `IntersectionObserver`. Fora do topo, o fundo vai de `rgba(9, 9, 9, 0.72)` para `rgba(9, 9, 9, 0.92)` em 200ms. Altura 64px. No mobile o `backdrop-filter` continua `none`.

## Rota

`src/app/template.tsx` remonta a cada navegação. Uma variável de módulo marca a primeira carga e não anima esse frame, para a sequência do hero aparecer sozinha. A ida seguinte é só opacidade, 220ms. Sem translate, para não somar com o reveal. Sem animação de saída.

## Reduced motion

O bloco global em `globals.css` zera duração, atraso e transição. Parallax, reveal e a troca de rota só são aplicados em `prefers-reduced-motion: no-preference`, ou o observer recusa quando `reduce` está ativo. O conteúdo não fica em opacidade 0.

## Fora

Blur, clip, scale no título, parallax nos cases, cursor, pin, scroll horizontal, sticky, listener de `scroll` ou `mousemove`, `will-change` permanente, biblioteca nova.
