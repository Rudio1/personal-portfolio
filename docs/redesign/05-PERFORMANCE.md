# 05 — Performance

Metas deste site. Ele é quase estático: um texto, uma foto, sete imagens de projeto, um proxy que só roda no envio do formulário. As metas são mais apertadas que o limiar genérico de “bom” do Core Web Vitals porque não há feed, anúncio nem app autenticado.

Medir no Chrome, throttling Slow 4G, CPU 4× slowdown, janela anônima, contra `npm run build` e `npm start` (produção). `npm run dev` serve para achar skeleton e layout, não para cravar o número.

| Métrica | Meta | O que conta como falha |
| --- | --- | --- |
| LCP | inferior a 2,0 s | O LCP é o skeleton, ou a foto com `priority` dividida com os sete cases, ou o H1 vazio até o `useEffect` |
| CLS | inferior a 0,05 | Skeleton que troca de altura pelo texto; foto sem caixa; fonte que empurra o título |
| INP | inferior a 150 ms | Listener de scroll ou de mouse global; lib de animação no caminho do clique |

Não perseguir LCP inferior a 2,5 s como se fosse o alvo. 2,5 s seria folga demais para esta página. Não prometer menos de 1,0 s sem medir a foto no dispositivo real.

## JavaScript

- Não adicionar GSAP, Lenis, Framer Motion, Motion nem Three.
- `lucide-react`: import nomeado, como hoje. Não importar o pacote inteiro.
- Os dois JSON de idioma entram no bundle do client por import estático. O tamanho deles é aceitável. Não voltar ao `import()` dinâmico que atrasa o texto.
- Header, modal e páginas continuam client por causa de `t()` e de estado. Não “otimizar” transformando tudo em Server Component nesta rodada, e não transformar o layout em client.
- `next-intl` não deve passar a ser importado. Se um ensaio mostrar que ele entra no bundle sem import em `src/`, não remover a dependência por conta própria: registrar em `docs/architecture/GAPS.md`.

## Fontes

Geist e Geist Mono via `next/font`, com `subsets: ["latin"]`. Sem `@import` do Google Fonts (bloqueia a renderização e pede Montserrat em vários pesos). Sem peso que o CSS não use. Display 500 e corpo 400 precisam existir no arquivo da fonte variável; Geist variável cobre. Não baixar Montserrat “por garantia”.

## Imagens

`next/image` com o otimizador padrão. Sem loader externo. Sem commit de conversão manual dos PNG órfãos.

| Imagem | `priority` | `sizes` | Loading |
| --- | --- | --- | --- |
| `guilherme-rudio.png` | sim, só esta | `(max-width: 767px) 280px, (max-width: 1023px) 320px, 420px` | eager por causa do priority |
| Cases com screenshot | não | `(max-width: 1023px) 100vw, 640px` | lazy |
| Logos SVG | não | 28px | lazy, fora da primeira linha se empurrarem o LCP; na home ficam abaixo do título, então lazy é aceitável |
| Vegeta | não | no máximo 160px se a imagem permanecer | lazy |

`alt` do case usa o título traduzido, não a `key`.

PNG de origem grande (`psi-amanda.png` cerca de 1,2 MB, foto cerca de 630 KB) é problema do arquivo em `public/`. O otimizador entrega um derivado menor no browser. Não substituir o arquivo por outro crop sem pedido. Não marcar `unoptimized`.

Assets não referenciados (`cybergallery.png` cerca de 4,4 MB e os outros listados na auditoria) não entram na página. Não passar a usá-los para “aproveitar”. Eles aumentam o upload do `public/` no deploy; apagar é decisão do autor, fora das fases.

## Hidratação

O texto do H1 existe no HTML do primeiro render do client (import estático, `isLoading` falso). Não há skeleton de título. A troca `pt` → `en` depois do `useEffect` pode alterar uma string; as chaves têm comprimento parecido. Se o QA vir salto, reservar a altura do display com `min-height` equivalente a duas linhas do clamp, não voltar ao skeleton.

## Code splitting

Não criar `dynamic()` em volta do modal a menos que a fase 9 meça que o modal domina o JS da home e o atraso seja visível. Default: modal estático, como hoje, porque o Header já é client e o formulário é pequeno. Não quebrar a página em dez chunks.

## Animações e thread

Ver a tabela em [03-MOTION-SYSTEM.md](03-MOTION-SYSTEM.md). Resumo operacional:

- Só `transform` e `opacity` em movimento de posição.
- Observer desconecta depois de revelar.
- Nenhum listener de `scroll` ou `mousemove`.
- `will-change` não fica permanente.
- Timeout de 2s do modal é limpo no unmount (fase 5).
- Carrossel infinito sai. Ele ocupava compositor o tempo todo e duplicava nós.

`contain: paint` no case só permanece se não cortar o anel de foco.

## O que não fazer em nome de performance

- Trocar CSS Modules por Tailwind.
- Inline de todo o CSS no layout.
- Remover `TranslationProvider`.
- Servir a foto em tamanho fixo de 200px no desktop (o layout pede até 420).
- Adiar o H1 com `content-visibility` a ponto de esconder o LCP.

## Como verificar na fase 9

1. `npm run build` e `npm start`.
2. Lighthouse ou o painel Performance do Chrome em `/` e em `/projetos`, mobile e desktop, Slow 4G.
3. Anotar LCP, CLS e INP no relatório da fase (pode ser o próprio changelog, em uma frase). Não colar relatório enorme.
4. Confirmar no Coverage ou no Network que não há pedido a `fonts.googleapis.com`.
5. Confirmar que só a foto da home tem `priority` no HTML (preload de uma imagem, não de sete).

Se LCP passar de 2,0 s por causa da foto e o texto do H1 não for o LCP, tirar `priority` da foto e deixar o H1 como LCP. A foto lazy abaixo da dobra no mobile (ela vem depois dos CTAs) não deve ser `priority` no mobile. `priority` é booleano no `next/image`: se a foto estiver abaixo da dobra no mobile e na dobra no desktop, **não** usar `priority`. O H1 é o LCP nos dois. A foto usa lazy. Isso revisa a tabela acima quando a ordem mobile empurra a foto para baixo: `priority` fica desligado. A spec do hero em [08-VISUAL-DIRECTION.md](08-VISUAL-DIRECTION.md) pede `priority`; a medição manda mais. Se o lab mostrar a foto como LCP no desktop e abaixo de 2,0 s, `priority` pode ficar. Default seguro: sem `priority` na foto enquanto ela não estiver no topo do mobile. Registrar o que foi medido.
