# Home

## Objetivo

Página única que apresenta Guilherme Rudio em sete blocos: Hero, Sobre, Projetos selecionados, Experiência, Stack, Contato e Footer (este no layout). Redesign v2, fase 3 ([docs/redesign-v2/PLANO.md](../redesign-v2/PLANO.md)).

## Onde está

| Bloco | Arquivo | Âncora | Textos |
| --- | --- | --- | --- |
| Hero | `src/app/page.tsx`, `src/app/page.module.css` | — | `hero.*`, `home.portraitAlt`, `home.cta.resume` |
| Sobre | `src/components/About.tsx` | `#sobre` | `about.*` |
| Projetos selecionados | `src/components/FeaturedProjects.tsx` | `#projetos` | `featured.*`, `projects.items.<key>.*` |
| Experiência | `src/components/Experience.tsx`, `src/data/experiencia.ts` | `#experiencia` | `experience.*` |
| Stack | `src/components/Stack.tsx`, `src/data/stack.ts` | `#stack` | `stack.*` |
| Contato | `src/components/ContactSection.tsx` | `#contato` | `contactSection.*` |
| Footer | `src/components/Footer.tsx`, incluído em `layout.tsx` | — | `footer.*` |

- Cabeçalho das seções: `src/components/SectionHeading.tsx` (número `01`–`05` em mono e `h2`).
- Utilitários globais em `globals.css`: `.container`, `.section`, `.sectionGrid`. Também `scroll-margin-top: 112px` em `section[id]` e `article[id]`.
- Foto: `public/guilherme-rudio.png`. Currículo: `public/curriculo/Curriculo - Rudio.pdf`.

## Fluxo

Todos os blocos são Client Components. Não buscam API. O texto vem de `t()`.

- **Hero:**
  - faixa superior com `hero.label` e o link do GitHub;
  - placa `hero.plate`, filete lima e `about.facts.role`;
  - nome em maiúsculas com tinta em degradê: o primeiro nome claro, o sobrenome lima;
  - linha mono de stack, frase, dois CTAs e o link do currículo;
  - à direita, `HeroArt`: um mostrador SVG com o retrato ao centro e os nós UI, API, DB e Cloud em órbita;
  - embaixo, o canhoto `hero.facts`. Os valores vêm do código: 2022, `projetos.length`, `experiencias.length` e a empresa atual.
  - por fim, o indicador de rolagem.
- **Projetos selecionados:** filtra `projetos` por `destaque === true` (hoje AgroPulse, AG Clinical e VAE Mobility, na ordem do array). Cada case mostra:
  - imagem, número, `category`, título e descrição
  - `features`, uma string com itens separados por `\n`
  - os blocos opcionais `problem`, `role` e `results`
  - as tecnologias e os links de demo e GitHub

  O link “ver todos” leva a `/projetos`.
- **Experiência:** lista de `experiencias` com período, cargo, empresa, local e descrição. Item com `end: null` mostra `experience.present` e um marcador lima.
- **Stack:** cinco linhas, uma por categoria. O nome fica à esquerda e as tecnologias em chips à direita, todas alinhadas na mesma coluna. Sem nível, porcentagem nem logo.
- **Contato:** e-mail (`mailto:`), LinkedIn, GitHub e currículo, mais um botão que abre o `ContactModal` com estado próprio.

## Regras

- **Campo opcional vazio não renderiza.** Vale para `problem`, `role`, `results` e `features`. Esses campos só recebem conteúdo informado pelo autor. Não inventar texto.
- **Fontes dos dados:**
  - Experiência e stack vêm do currículo em PDF.
  - As funcionalidades dos cases vêm do que os sites publicados mostram.
  - A trilha de cada informação está em [docs/redesign-v2/CONTEUDO.md](../redesign-v2/CONTEUDO.md).
- **Imagens:** a foto do hero usa `priority`. As imagens dos cases são lazy (padrão do `next/image`).
- **Entrada do hero:** animação CSS uma vez, em grupos (rótulo, nome, frase, CTAs, faixa e foto). `prefers-reduced-motion` zera tudo em `globals.css`. O reveal das seções é da fase 4.
- **Imagem dos cases:** fica numa janela de navegador com o domínio do link de demo, sobre um palco escuro com grade e brilho lima. `imagemFoco` (object-position) e `imagemZoom` (escala) em `projetos.ts` recortam a captura. Hoje AgroPulse (1.7) e AG Clinical (1.5) mostram só o painel escuro da marca, sem a metade branca do login.
- **Fundo contínuo:** `Atmosphere` (no `layout.tsx`) é uma camada fixa atrás de tudo, com brilho lima no alto, violeta embaixo, raios, grade, névoa, vinheta e grão. Toda seção vive na mesma luz.
- **Seções:** `.section` não tem luz nem degradê próprio. Só o filete com losango lima entre uma seção e a próxima (`::after`). A única luz é a da atmosfera fixa.
- **Cabeçalho:** `SectionHeading` mostra a placa `§ NN`, o número fantasma em contorno, o título em maiúsculas e o filete. Ocupa a largura toda; o conteúdo vem recuado na coluna larga.
- **Molduras:** cases, painel da Stack, fichas da Experiência e painel do Contato têm canto chanfrado. A Experiência tem um trilho vertical com losangos; o cargo atual brilha.
- **Parallax curto da foto:** igual à versão anterior, via `animation-timeline: view()`, só no desktop com ponteiro fino.
- **Metadata:** fica em `layout.tsx`, sem mudança nesta fase.

## Persistência e API

Nenhuma além do contato, que segue [contato.md](contato.md).

## Erros

Chave ausente faz `t()` devolver `''`.

## Observações

- As chaves antigas `home.title`, `home.subtitle`, `home.eyebrow`, `home.work`, `home.description`, `home.objective` e `home.cta.projects` não são mais lidas. Continuam nos JSON.
- `public/img-rudio.png` e `public/logos/*.svg` não são referenciados. Não remover sem pedido.
