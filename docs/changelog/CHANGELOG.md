# Changelog

Registro de mudanças de comportamento, contrato, conteúdo publicado ou estrutura de desenvolvimento. A entrada mais recente fica no topo.

Não usar uma linha solta do tipo "bug corrigido". Cada entrada precisa dizer o que mudou, por quê, onde e qual o efeito.

## 2026-10-27 — Motion da home, dos cases e da troca de rota

### Alteração

A entrada do hero deixou de ser um fade único. No desktop o nome espera a saudação, a foto entra por último e a faixa Trabalho chega com um gesto menor no mesmo instante da foto. No mobile são quatro batidas, mais curtas. Cada case revela imagem e texto com 60ms de diferença no desktop. O hover do case só escala a imagem em 1.02 e aquece a borda. O header fica mais opaco fora do topo. A navegação entre `/` e `/projetos` faz um fade de 220ms a partir da segunda tela.

### Motivação

O movimento existia, mas era o mesmo gesto repetido. A auditoria em `docs/motion/01-MOTION-AUDIT.md` pediu hierarquia e continuidade, sem biblioteca nova.

### Arquivos/Módulos afetados

- `src/app/page.tsx`, `src/app/page.module.css`, `src/app/globals.css`, `src/app/layout.tsx`
- `src/app/template.tsx`, `src/app/template.module.css`
- `src/app/projetos/projetos.module.css`
- `src/components/Header.tsx`, `src/components/Header.module.css`
- `src/components/ContactModal.module.css`
- `docs/motion/01-MOTION-AUDIT.md`, `docs/motion/02-MOTION-SYSTEM.md`
- `docs/features/home.md`, `docs/features/projetos.md`, `docs/features/navegacao.md`

### Impacto

Cores, textos, projetos, rotas e o contrato `POST /api/contact` permanecem. `prefers-reduced-motion` continua sem deslocamento. A primeira carga não faz o fade de rota, para a sequência do hero aparecer sozinha. Não há GSAP, Lenis nem Motion.

### Banco de dados

Não há banco neste repositório. Nenhuma alteração.

### Breaking changes

Nenhuma.

## 2026-10-27 — Parallax curto na foto da home

### Alteração

A foto do hero, no desktop com ponteiro fino, desloca 8px enquanto atravessa a tela. O movimento é CSS (`animation-timeline: view()`), de `translateY(4px)` a `translateY(-4px)`.

### Motivação

O autor reabriu a fase 8 e pediu a opção mais recomendada. O documento de motion só deixa passar o parallax de 8px na foto. WebGL, GSAP, Lenis, scroll horizontal, pin e cursor customizado continuam de fora: brigam com âncora, teclado, modal ou com o custo de uma biblioteca.

### Arquivos/Módulos afetados

- `src/app/page.module.css`
- `docs/features/home.md`
- `docs/redesign/03-MOTION-SYSTEM.md`
- `docs/redesign/09-IMPLEMENTATION-PLAN.md`

### Impacto

Mobile, toque e `prefers-reduced-motion` não deslocam a foto. Navegador sem `animation-timeline` mostra a foto parada. Não há dependência nova nem listener de scroll. Âncoras, teclado e o modal permanecem como estavam.

### Banco de dados

Não há banco neste repositório. Nenhuma alteração.

### Breaking changes

Nenhuma.

## 2026-10-27 — Redesign visual do portfólio

### Alteração

A home, a navegação, a lista de projetos e o modal de contato passaram ao tema escuro fixo descrito em `docs/redesign/`. A fonte visível é Geist. O primeiro render já traz o texto em português, sem skeleton. `/projetos` é uma lista de cases, sem badge de destaque. O menu diz Início / Home. O modal prende o foco e fecha com Esc.

### Motivação

O site invertia a cor com o sistema operacional, esperava JavaScript para mostrar o nome e tratava os sete trabalhos como cards iguais. O pacote `docs/redesign/` define o alvo. As fases 1 a 7, 9, 10 e 12 estão fechadas no código. A fase 8 (WebGL, GSAP, Lenis, cursor) não entra. A fase 11, que percorre o site no navegador, foi dispensada pelo autor, junto com a medição de laboratório da fase 9.

### Arquivos/Módulos afetados

- `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/page.module.css`
- `src/app/projetos/page.tsx`, `src/app/projetos/projetos.module.css`
- `src/components/Header.tsx`, `src/components/Header.module.css`
- `src/components/ContactModal.tsx`, `src/components/ContactModal.module.css`
- `src/components/ProjetoCard.tsx`, `src/components/button.module.css`
- `src/contexts/TranslationContext.tsx`
- `messages/pt.json`, `messages/en.json`
- `docs/decisions/0006-tema-escuro-e-geist.md` e ajustes em 0002 e 0005
- `docs/features/`, `docs/architecture/`, `docs/development/`

### Impacto

Rotas `/` e `/projetos` e o contrato `POST /api/contact` com `{ name, telephone }` permanecem. Quem usa o sistema em escuro deixa de ver o site claro. Quem salvou inglês pode ver português por um instante. Vegeta não mostra a miniatura. Três links na home apontam para AgroPulse, VAE Mobility e AG Clinical. Não há biblioteca nova de animação.

A fase 9 fica no default seguro do documento de performance: a foto da home não usa `priority`, os cases também não, os `sizes` estão no markup e o CSS não pede fonte do Google. LCP, CLS e INP não foram medidos. O autor dispensou essa medição e a fase 11. A tabela abaixo fecha a fase 12 a partir do código.

Os 35 itens de micro-polish da auditoria, conferidos no código:

| # | Estado |
| --- | --- |
| 1–2 | Feitos na fase 2. Sem margem negativa e sem carrossel; sete logos, uma vez. |
| 3–5 | Feitos na fase 2. Display em Geist 500 com line-height 0,92; subtítulo flui; parágrafos vazios não entram no DOM. |
| 6–10 | Feitos nas fases 1 e 4. Sem filtro vermelho, sem sombra `rgba(var(--hex))`, botão único, hover do menu em `--accent`. |
| 11–15 | Feitos nas fases 1 e 3. Logo do header 1,25rem, barra 64px, padding simétrico, botão 48px e raio 999. |
| 16 | Feito na fase 1. O primeiro render não usa skeleton. `LoadingSkeleton.tsx` continua no repositório e não é importado. |
| 17–19 | Feitos na fase 2. `.highlight` saiu, o gap do main é regra ativa, logos não duplicam. |
| 20–24 | Feitos nas fases 2, 4 e 9. Alt da foto e do case usam o título; sem `priority` nos cases; sem `!important` na foto; ícone do currículo sem style inline. |
| 25–29 | Feitos nas fases 1 e 3. Texto muted por token; sem `pre-line`; overlay do menu 0,6; z-index pelos tokens. |
| 30–32 | Feitos nas fases 4 e 5. Timeout do modal é cancelado; `responseData` saiu; badge Destaque não renderiza. |
| 33–35 | Feitos nas fases 2 e 10. A foto não tem min-height 400px; o carrossel saiu e o reduced motion está no CSS global; a description não é mais "Portoflio digital". |

### Banco de dados

Não há banco neste repositório. Nenhuma alteração.

### Breaking changes

Nenhuma rota nova ou removida. A aparência muda. `navigation.about` passa a significar Início / Home, no mesmo href `/`.

## 2026-10-09 — Grade de projetos alinhada aos sites publicados

### Alteração

A aba de projetos passou a listar o Vegeta e seis sites publicados: AgroPulse, AG Clinical, VAE Mobility, Psicóloga Amanda Rudio, Alexandre Baiocco (gestão de tráfego) e AG Custom. Saíram Cyber Gallery, Ceci's, refeições, tarefas e Brunelly.

### Motivação

A grade ainda mostrava trabalhos antigos. Os sites que devem aparecer são os que estão no ar, mantendo a API Vegeta.

### Arquivos/Módulos afetados

- `src/data/projetos.ts`
- `messages/pt.json`
- `messages/en.json`
- `public/agropulse.png`
- `public/ag-clinical.png`
- `public/vae-mobility.png`
- `public/trafego.png`
- `public/ag-custom.png`
- `public/psi-amanda.png`
- `docs/features/projetos.md`

### Impacto

A home, o Header, o formulário de contato e a API Vegeta permanecem. O link de demonstração da AG Custom passa a ser `https://www.agcustom.com.br/`. O da psicóloga Amanda continua `https://psi-amanda.rudio1.com.br/`.

### Banco de dados

Não há banco neste repositório. Nenhuma alteração.

### Breaking changes

Nenhuma rota nova ou removida. Alguns projetos deixam de aparecer na grade `/projetos`.

### Migrações

Nenhuma.

## 2026-10-09 — Contrato de documentação para desenvolvimento com IA

### Alteração

Criada a documentação do estado atual do portfólio e as regras para agentes: `AGENTS.md`, `docs/` e `.cursor/rules/`.

### Motivação

O repositório passou a ser mantido com auxílio de IA. As regras e o mapa da arquitetura precisam refletir o código existente para evitar camadas, bibliotecas e fluxos que o projeto não usa.

### Arquivos/Módulos afetados

- `AGENTS.md`
- `docs/architecture/`
- `docs/development/`
- `docs/features/`
- `docs/decisions/`
- `docs/changelog/`
- `docs/guides/`
- `docs/rules/`
- `.cursor/rules/`

### Impacto

Nenhuma alteração em páginas, componentes, dados, traduções, API, estilo ou dependências. O comportamento do site permanece o mesmo.

### Banco de dados

Não há banco neste repositório. Nenhuma alteração.

### Breaking changes

Nenhuma.

### Migrações

Nenhuma.
