# 03 — Motion system

Movimento confirma hierarquia e estado. Não cria uma segunda página por cima do conteúdo. Nenhuma biblioteca nova.

## Decisão por técnica

| Técnica | Decisão | Motivo |
| --- | --- | --- |
| CSS transition em hover, foco e modal | Usar | Barato. `transform` e `opacity` na GPU. `background-color` e `border-color` só em alvos pequenos (botão, tag, link) |
| CSS scroll-driven (`animation-timeline: view()`) | Não usar | O efeito desejado é aparecer uma vez. Suporte irregular |
| Intersection Observer | Usar na fase 6 | Reveal único. Sem dependência. Desconectar depois de revelar |
| Motion / Framer Motion | Não | Não há layout animation nem gesto que pague o JavaScript |
| GSAP e ScrollTrigger | Não | Não há pin, scrub nem sequência |
| Lenis | Não | Scroll suave briga com âncora, com o teclado e com o modal que trava `overflow` |
| WebGL / Three.js | Não recomendado | Não há produto 3D, marca generativa nem transição que a foto não resolva. Custa bundle, GPU no celular e manutenção. O fundo é `--bg` sólido. Reavaliar só se existir uma peça visual própria, fora deste pacote |
| Listener de `scroll` ou `mousemove` | Não | Não há cursor seguidor nem parallax obrigatório |
| `requestAnimationFrame` manual | Não | CSS e um observer cobrem os casos |

**WebGL: não recomendado.**

## Tokens de tempo

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --duration-hover: 200ms;
  --duration-nav: 300ms;
  --duration-enter: 700ms;
  --duration-modal: 240ms;
  --duration-overlay: 200ms;
  --distance-enter: 12px;
  --stagger: 80ms;
}
```

| Situação | Duração | Easing | Distância | Atraso |
| --- | --- | --- | --- | --- |
| Entrada do hero | 700ms | `--ease-out` | 12px no eixo Y, para cima (de 12px até 0) | stagger 80ms, no máximo 4 elementos. Foto +120ms em relação ao eyebrow |
| Hover | 200ms | `--ease-standard` | case `-4px` em Y; imagem `scale(1.03)`; logo só opacidade | 0 |
| Underline da nav | 300ms | `--ease-standard` | largura de 0 a 100%, da esquerda | 0 |
| Overlay do modal | 200ms | linear na opacidade | nenhuma | 0 |
| Painel do modal | 240ms | `--ease-out` | 8px em Y | 0 |
| Reveal de case | 700ms | `--ease-out` | 12px em Y | 0. Sem stagger entre cases: cada um anima ao entrar, sozinho |

Propriedades animadas: `transform`, `opacity`. Underline anima `width` num pseudo-elemento absoluto (já é o padrão do header; não anima layout do documento). Cor e borda em botão e tag.

Não animar `top`, `height`, `margin`, `padding` nem `box-shadow` em lista.

`will-change: transform` só na classe enquanto a entrada não terminou. Remover no `transitionend` ou não declarar `will-change` permanente. Preferir não declarar: 12px e opacidade não precisam de hint.

## Classificação

### Essencial

| Elemento | Comportamento | Quando | Implementação |
| --- | --- | --- | --- |
| Botão | Fundo ou borda troca | hover em ponteiro fino | CSS 200ms |
| Link de nav e contato | Underline cresce da esquerda; texto vai a `--accent` | hover e item ativo | CSS 300ms. Já existe a estrutura; trocar a cor |
| Foco | Anel accent | `:focus-visible` | CSS, sem duração longa (o anel aparece imediato) |
| Modal | Overlay aparece; painel sobe 8px e fica opaco | abrir e fechar | CSS. Fechar pode ser instantâneo se o componente desmontar sem estado de saída. Não adicionar lib só para exit |

### Recomendada (fase 6)

| Elemento | Comportamento | Relação |
| --- | --- | --- |
| Hero | Opacidade 0→1 e `translateY(12px)`→0, uma vez no mount | Ordem: eyebrow, título, texto, ações. Foto com +120ms. Sem relação com scroll depois disso. Sem mouse |
| Case | A mesma entrada, uma vez, quando 20% do artigo cruza o viewport | Observer com `threshold: 0.2`. `unobserve` depois. Sem loop |

No mobile, o hero usa no máximo dois passos de atraso (bloco de texto junto; foto no segundo passo) para não atrasar a leitura. Deslocamento máximo 8px abaixo de 768px.

### Opcional

Parallax de 8px na foto, só desktop, só com `hover: hover` e reduced motion desligado. Adotado na home em `page.module.css`, com `animation-timeline: view()` e sem listener de scroll. Mobile, toque e reduced motion não deslocam a foto.

### Desnecessária — não implementar

Carrossel infinito de logos. Cursor que segue o mouse. Botão magnético. Blur de entrada. Texto revelado por máscara linha a linha. Clip-path entre seções. Scroll horizontal. Seção pinned. Morphing. Loading de página com shader. Tilt 3D do card. Escala de página inteira no scroll.

## Microinterações

| Elemento | Comportamento | Implementação | Biblioteca | Custo | Prioridade |
| --- | --- | --- | --- | --- | --- |
| Botão | Fundo ou borda em 200ms | CSS | nenhuma | baixo | P0 |
| Nav | Underline da esquerda | CSS | nenhuma | baixo | P0 |
| Case | Imagem `scale(1.03)` no hover; artigo `translateY(-4px)` | CSS, `overflow: hidden` na imagem, só `(hover: hover) and (pointer: fine)` | nenhuma | baixo | P1 |
| Tag | Borda vai a `--accent`, sem salto | CSS | nenhuma | baixo | P1 |
| Modal | Fade do overlay e 8px do painel | CSS | nenhuma | baixo | P1 |
| Logo da stack | Opacidade 0,7 → 1 | CSS | nenhuma | baixo | P1 |
| Hero | Fade e 12px, uma vez | Classe no mount ou observer | nenhuma | baixo | P2, fase 6 |
| Case no scroll | Fade e 12px, uma vez | Intersection Observer | nenhuma | baixo | P2, fase 6 |

Não fazer: cursor custom, magnetic, tilt, máscara de texto.

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Além do atalho global:

- Não aplicar `transform` de entrada. Opacidade final imediata.
- Carrossel não existe. Não recriar “versão estática animada”.
- Hover de cor pode permanecer (não é deslocamento). Se o atalho acima zerar a transição de cor, o estado final do hover ainda precisa aparecer. Testar teclado e hover com reduced motion ligado.
- Observer da fase 6 não adiciona classe de deslocamento quando `window.matchMedia('(prefers-reduced-motion: reduce)').matches` for verdadeiro.

O `!important` desse bloco é a exceção aceita. Não usar `!important` para largura de foto ou para ganhar de outro módulo.

## Performance do movimento

| Animação | Propriedade | GPU | Layout | Jank | Frequência | Throttle | rAF | will-change | Cleanup |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hover de case | `transform` | sim | não | baixo | só no hover | não | não | não | n/a (CSS) |
| Scale da imagem | `transform` | sim | não | baixo | hover | não | não | não | n/a |
| Entrada | `transform`, `opacity` | sim | não | baixo | uma vez | não | não | evitar permanente | remover classe ou desconectar observer |
| Underline | `width` do pseudo | não é a melhor, é local e curta | só o pseudo | baixo | hover | não | não | não | n/a |
| Modal | `opacity`, `transform` | sim | não | baixo | abrir/fechar | não | não | não | cancelar timeout de sucesso no unmount |
| Cor de botão | `background-color` | não | não | baixo em área pequena | hover | não | não | não | n/a |

Nenhum handler de scroll. Nenhum handler de mouse global. `contain: paint` no case pode permanecer se não cortar outline de foco; se cortar, tirar o `contain`.

## Page transition

Não há transição entre `/` e `/projetos` além da navegação do App Router. Não envolver o `children` do layout num animador. O Header permanece montado.

## Relação com scroll, mouse e outros elementos

- Scroll: só dispara o reveal, uma vez, e só na fase 6. Não prende a seção. Não move o fundo.
- Mouse: hover local no elemento. Sem follower. Sem campo magnético.
- Elementos entre si: stagger só dentro do hero, no mount. Cases não esperam uns aos outros.
- Sensação: a página assenta. Não “chega”.
