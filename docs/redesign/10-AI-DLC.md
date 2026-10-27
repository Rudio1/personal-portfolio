# 10 — AI-DLC

Como uma IA trabalha neste repositório a partir deste pacote. O ciclo vale para cada fase de [09-IMPLEMENTATION-PLAN.md](09-IMPLEMENTATION-PLAN.md). Papéis são modos do mesmo agente, em sequência. Não lançar agentes em paralelo editando os mesmos arquivos.

O site não ganha uma seção que descreva este ciclo. O ciclo fica aqui.

## Ciclo

```text
RESEARCH
  → ANALYSIS
  → PLANNING
  → IMPLEMENTATION
  → BUILD
  → TEST
  → VISUAL QA
  → PERFORMANCE QA
  → ACCESSIBILITY QA
  → REVIEW
  → DOCUMENTATION
  → COMMIT
```

COMMIT só se o autor pedir. Não fazer commit no fim da fase por iniciativa própria.

## RESEARCH

Ler, nesta ordem:

1. `AGENTS.md`
2. O prompt da fase em [09-IMPLEMENTATION-PLAN.md](09-IMPLEMENTATION-PLAN.md)
3. O doc de redesign citado nesse prompt
4. A feature em `docs/features/`
5. O ADR em `docs/decisions/` se a fase tocar CSS, i18n, projetos ou contato
6. `docs/architecture/GAPS.md` se a tentação for “limpar” código que parece morto

Não começar pelo efeito visual. Não abrir GSAP, Awwwards ou WebGL como se a fase 8 estivesse autorizada.

## ANALYSIS

Escrever, para si, antes de editar:

- O que o código faz hoje no arquivo que a fase cita.
- O que a spec manda.
- A diferença, em lista curta.
- O que é problema de conteúdo (texto que o autor não escreveu). Isso não se resolve com cópia inventada.

Se a spec e o código divergirem e a fase não mandar alinhar, o código atual ganha e a divergência fica em `docs/architecture/GAPS.md`. Dentro de uma fase pedida, a spec de `docs/redesign/` é o alvo daquela fase. `GAPS.md` descreve o legado até o código mudar. A frase antiga que manda não inverter `prefers-color-scheme` não bloqueia a fase 1: este pacote é o pedido. A fase 1 registra o ADR.

## PLANNING

Lista fechada de arquivos, copiada do prompt da fase. Arquivo fora da lista não entra. Se faltar um arquivo para o aceite, parar e dizer qual, em vez de alargar o diff.

Incluir docs de feature e changelog só quando o comportamento visível mudar.

## IMPLEMENTATION

- Só a lista.
- Padrão do arquivo vizinho: CSS Module, import relativo, `'use client'` quando houver `useTranslations` ou estado.
- Texto novo nos dois JSON, mesma chave.
- Sem camada nova, sem dependência nova, sem comentário em código óbvio.
- Preservar URLs, o contrato `{ name, telephone }`, os projetos existentes e o que a fase marcar como intocado.
- Mudança pequena o bastante para a fase seguinte entender.

## BUILD

- `npm run lint` em toda fase que editar `src/`.
- `npm run build` quando mudar tipo, rota, import de página, layout, provider ou a API.
- Lint ou build com falha: corrigir antes do QA. Não seguir com a fase “quase”.

Build verde não significa UI correta. Não encerrar aqui.

## TEST

Fluxo manual, o que a fase tocar:

- `/` carrega com texto, não com skeleton de título.
- `/projetos` lista os sete trabalhos.
- Troca PT/EN e recarrega (o valor em `localStorage` permanece).
- Modal abre, valida nome e telefone, fecha por Esc e pelo overlay.
- CTA de projetos não perde a rota. PDF abre em nova aba.
- Âncora `/projetos#agropulse` (depois da fase 4).

Não há script de teste no repositório. Não adicionar Jest, Vitest nem Testing Library.

## VISUAL QA

Obrigatório em toda fase que altere UI. Build não substitui.

1. Subir o projeto (`npm run dev` para layout; produção na fase 9).
2. Abrir as páginas da fase.
3. Capturar screenshot em 1440 e em 390. Na fase 11, também 375, 768, 1024 e 1920, pt e en.
4. Comparar com [08-VISUAL-DIRECTION.md](08-VISUAL-DIRECTION.md), [02-DESIGN-SYSTEM.md](02-DESIGN-SYSTEM.md) e [07-RESPONSIVE.md](07-RESPONSIVE.md). Olhar a imagem, não só a árvore de acessibilidade.
5. Listar o que diverge: hierarquia, alinhamento, cor fora do token, texto cortado, scroll horizontal, elemento encostado, estado vazio, hover que não existe no touch.
6. Corrigir dentro dos arquivos da fase.
7. Capturar de novo.
8. Repetir até o aceite da fase, ou até o item ser problema de conteúdo.

Não considerar a fase pronta com um único screenshot do estado feliz no desktop.

## PERFORMANCE QA

Em toda fase que mude fonte, imagem, provider ou animação. Na fase 9, com número.

- O H1 não espera rede nem `useEffect` para existir.
- Não há pedido a `fonts.googleapis.com`.
- Não entrou dependência de animação.
- `priority` não está nos sete cases.
- Reduced motion não foi a desculpa para um loop infinito.

Metas: [05-PERFORMANCE.md](05-PERFORMANCE.md).

## ACCESSIBILITY QA

Em toda fase que mude header, modal, botão ou movimento.

- Tab do início ao conteúdo.
- Foco visível.
- Modal prende o foco e devolve ao botão.
- `prefers-reduced-motion: reduce` não deixa conteúdo em opacity 0.
- Texto novo está nos dois idiomas.
- Contraste do par que a fase introduziu, contra a tabela do design system.

## REVIEW

Um passo final, ainda no mesmo agente, com outra pergunta:

- Isto melhora a leitura ou só adiciona efeito?
- O texto existia antes?
- A URL e o contrato continuam?
- Algum arquivo fora da lista mudou?
- A fase 8 entrou disfarçada (cursor, pin, shader, smooth scroll)?
- Dá para manter sem a biblioteca nova? Se a biblioteca não estava autorizada, remover.

## DOCUMENTATION

Se a fase mudou comportamento, aparência ou contrato visível:

- `docs/features/` da feature.
- Topo de `docs/changelog/CHANGELOG.md`.
- ADR na fase 1, como [04-ARCHITECTURE.md](04-ARCHITECTURE.md) descreve.

Não copiar este ciclo para dentro da feature. A feature guarda a regra de produto. Este arquivo guarda o processo.

A fase 0 não atualiza o changelog: o site não mudou.

## COMMIT

Só com pedido explícito do autor. Mensagem curta, no motivo da fase, sem `git config`, sem `--no-verify`, sem force push.

## Papéis

Trabalham em sequência sobre a mesma árvore. O próximo não redefine a decisão do doc.

| Papel | Quando | Faz | Não faz |
| --- | --- | --- | --- |
| Architect | Início da fase, e de novo se a implementação quiser arquivo novo | Confere a lista de arquivos, tokens, o que é intocado (proxy, URLs, `ProjetoData`, JSON de conteúdo) | Não escolhe GSAP “porque fica mais fácil” |
| UI Designer | Fases 1 a 5 | Aplica [02-DESIGN-SYSTEM.md](02-DESIGN-SYSTEM.md) e [08-VISUAL-DIRECTION.md](08-VISUAL-DIRECTION.md) | Não inventa seção nem paleta paralela |
| Motion Designer | Fase 6, e só se a UI das fases anteriores está estável | Aplica [03-MOTION-SYSTEM.md](03-MOTION-SYSTEM.md) | Não antecipa movimento na fase 2. Não executa a fase 8 |
| Frontend Engineer | Implementação | Escreve o diff da lista | Não cria `services` nem unifica os dois modais |
| Performance Engineer | Antes de dar a fase por fechada, obrigatório na fase 9 | Confere imagem, fonte, JS e as metas | Não troca a arquitetura de i18n por `next-intl` |
| Accessibility Reviewer | Fases 3, 5, 6 e 10 | Teclado, foco, modal, reduced motion, contraste | Não remove o anel de foco para a captura ficar “limpa” |
| Visual QA | Depois do build da fase, e a fase 11 inteira | Screenshots e a lista de divergências | Não aceita build verde como prova |
| Final Reviewer | Último | Texto inventado, dependência nova, arquivo fora da lista, fase 8 disfarçada | Não abre polish fora da fase 12 |

## Perguntas que bloqueiam a fase

Se a resposta for sim, não implementar esse pedaço:

- Isto piora a performance de forma visível (listener global, lib pesada, sete `priority`)?
- Isto aumenta complexidade sem mudar a leitura?
- Existe um caminho com CSS que já está no doc?
- Esta animação precisa existir para o conteúdo fazer sentido?
- O texto foi inventado?

## Problema de conteúdo

Marcar no relatório e parar esse pedaço:

- About, trajetória, cargo, cidade, anos, e-mail, métrica, desafio, solução, resultado.
- PNG em `public/` sem entrada em `src/data/projetos.ts`.
- `vegeta.png` como se fosse uma screenshot de case.

O autor escreve os dois JSON primeiro. A IA não preenche.

## O que já está decidido

Não reabrir na implementação:

- Tema escuro fixo. Sem tema claro nesta rodada.
- Geist, não Montserrat, não uma terceira família.
- CSS Modules.
- Sem WebGL, sem Lenis, sem GSAP, sem cursor customizado.
- Duas rotas. Cases em lista. Três links na home: AgroPulse, VAE Mobility, AG Clinical.
- Nav “Início” / “Home” para `/`.
- Contrato de contato intocado. Dois modais.
- `next-intl` sem uso e sem remoção.
