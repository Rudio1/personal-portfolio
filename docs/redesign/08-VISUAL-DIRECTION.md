# 08 — Direção visual

Alvo aprovado. Implementar só na fase correspondente de [09-IMPLEMENTATION-PLAN.md](09-IMPLEMENTATION-PLAN.md).

## Nome

**Prova editorial escura.**

Fundo profundo, tipo grande, um laranja, imagens dos trabalhos em tamanho de leitura. A pessoa lê o nome, entende o ofício e vê o trabalho.

Não é brutalismo, não é site de agência cinematográfica, não é futurismo de partículas. O portfólio mostra sistemas e sites publicados. O próprio site é a prova de ofício: hierarquia, ritmo, contraste e movimento curto.

Sensação: preciso, quente, quieto.

## O que extrair de referências

[LevelHard](https://levelhard.com.br/) não é um site de shader. O que serve daquele tipo de peça, e de portfólios premiados em geral:

- Uma frase de identidade na primeira dobra, não um bloco de template.
- Trabalho publicado como evidência, em tamanho que dê para ler a imagem.
- Ritmo de seções com respiro, numeração discreta se ajudar a leitura, sem enfeite.
- Movimento que confirma a leitura (entrada única, hover de link) e para quando o sistema pede menos movimento.
- O craft da página é o argumento. Não um efeito ao lado do argumento.

O que não copiar:

- WebGL, onda em sequência de frames, scroll horizontal, pin, cursor que segue o mouse, paleta trocando a cada painel.
- Estrutura de laboratório, ciclo de produto, “level 01”, ano de fundação, cidade ou métrica que este repositório não tem.
- Gradiente no nome, carrossel infinito de logos, três cores de botão “para diferenciar stack”.

Comparação de estilos e a escolha:

| Estilo | Por que não é o caminho, ou por que é |
| --- | --- |
| Editorial | É o caminho: tipo, margem, imagem grande, pouco chrome |
| Minimalista | Acompanha o editorial. O mínimo aqui é o conteúdo real, não uma página vazia de agência |
| Developer portfolio genérico | É o estado atual (grade, badges, carrossel). Sai |
| Brutalist | O conteúdo é comercial e calmo. Bloco cru brigaria com as screenshots |
| Futuristic | Não há peça generativa nem produto 3D |
| Cinematic | Sete parágrafos não sustentam pin nem scrub |
| Creative agency | O autor não se apresenta como estúdio. Copiar agência mente o conteúdo |
| Experimental | Manutenção e acessibilidade pioram sem ganho de leitura |

## Cor

Tema único, escuro. Ignorar `prefers-color-scheme` para cor até existir um tema claro desenhado de verdade. Não inverter tokens.

Valores, uso e estados: [02-DESIGN-SYSTEM.md](02-DESIGN-SYSTEM.md).

Sem gradiente no título. A classe `.highlight` e o gradiente `#ff701e → #9c2801` saem do caminho visual. Acento sólido.

Botão primário: fundo `--fg`, texto `--bg`. Botão secundário: transparente, borda `--line`, texto `--fg`. Laranja é acento de rótulo, foco e borda de hover. Texto `--fg` sobre `--accent` não passa contraste (cerca de 2,3:1). Texto sobre laranja, se um botão laranja existir, usa `--accent-ink`.

## Tipo

Geist para interface e títulos. Geist Mono para rótulos. Montserrat sai. Não adicionar Fraunces, Syne nem outra família nesta rodada: Geist em escala de display já separa o site do template. Outra família seria enfeite.

Escala completa: [02-DESIGN-SYSTEM.md](02-DESIGN-SYSTEM.md).

## Estrutura das páginas

Rotas atuais. Sem página nova.

### Home `/`

1. Hero, especificação abaixo.
2. Faixa “Trabalho” com três links para `/projetos#agropulse`, `/projetos#vae-mobility` e `/projetos#ag-clinical`. São os três com screenshot utilizável e demo. Isso é ordem de leitura, não badge e não número inventado. Os outros quatro permanecem na lista completa, inclusive Vegeta.
3. Sem About, Skills, Experience ou Timeline.

O heading da faixa precisa de chave nos dois JSON (`home.work`: “Trabalho” / “Work”). Os títulos dos três links vêm de `projects.items.<key>.title`. Não escrever título novo.

### `/projetos`

- Título e subtítulo atuais (`projects.title`, `projects.subtitle`).
- Lista vertical. Não grade `auto-fit`.
- Cada case: no desktop, imagem 7 colunas e texto 5, gap 32px, alternando o lado da imagem. No tablet e no mobile, imagem em cima e texto embaixo, sem alternância.
- Conteúdo do texto: título, parágrafo que já existe, tags, link Demo ou GitHub com os rótulos que já existem (`projects.buttons.*`).
- `id` do case = `key` do projeto, para a âncora da home.
- Vegeta: não depender de `vegeta.png` como imagem hero. Bloco de texto. A imagem, se permanecer, fica pequena e não define a altura do case.
- CTA final que já existe: texto `projects.cta.text`, contato e currículo.
- Sem scroll horizontal, sem pin, sem seção sticky. Sete parágrafos não sustentam isso.
- Badge “Destaque” não renderiza enquanto todos os itens forem `destaque: true`. Não apagar a chave `projects.badges.destaque` dos JSON.

Não criar campos de desafio, solução ou resultado.

### Navegação

- Marca “Rudio” em tamanho de logo de header, não de display (ver design system). Continua link para `/`.
- Itens: Início (`/`), Projetos (`/projetos`), Contato (abre o modal). Idioma como hoje, PT/EN.
- Chave `navigation.about` passa a “Início” / “Home”. Não criar rota `/sobre`.
- Skip link como primeiro elemento focável. Texto nos dois JSON.

### Footer

P2, só se a fase que o incluir for pedida. Uma linha com os mesmos destinos: projetos, currículo, contato. Sem biografia nova. Sem rede social que o conteúdo não tenha.

## Hero — especificação

Desktop a partir de 1024px. Conteúdo dentro de `max-width: 1120px`. Duas colunas. Texto à esquerda, foto à direita. Gap 64px. Sem margem negativa.

### Eyebrow

Rótulo mono, uppercase, `--accent`, 0,75rem, letter-spacing `0.08em`.

Chave nova, única, nos dois JSON: `home.eyebrow`. Valor “Full stack” nos dois idiomas (a palavra já está no subtítulo pt e en). Não hardcodar no JSX.

### Título

`home.title` continua com `\n` separando saudação e nome.

- Primeira linha (“Olá, me chamo” / “Hello, I'm”): corpo, `--fg-muted`, peso 400, cerca de 1,25rem, line-height 1,4. Não é display.
- Segunda linha (“Guilherme Rudio”): display. `clamp(3.25rem, 7vw, 6.5rem)`, peso 500, line-height 0,92, letter-spacing `-0.045em`, cor `--fg`.

### Subtítulo

`home.subtitle` em `--fg-muted`, 1,0625rem, line-height 1,6, `max-width: 38rem`.

Default de apresentação: o parágrafo flui. Não usar `white-space: pre-line` para obedecer os `\n` do meio da frase. Os `\n` da string podem permanecer no JSON; o CSS não os trata como quebra forçada. Isso não é texto novo.

Não renderizar `home.description` nem `home.objective` enquanto o valor, depois do trim, for vazio. As chaves permanecem nos JSON.

### Logos

Uma fileira, cada logo uma vez. 28px de altura, opacidade 0,7, hover 1 em `(hover: hover) and (pointer: fine)`. Sem segunda cópia no DOM. Sem `@keyframes scroll`. `alt` continua o nome da tecnologia (Azure, .NET, SQL Server, React, Next.js, C#, PHP).

### CTAs

- Primário: `home.cta.projects`. Fundo `--fg`, texto `--bg`. `next/link` para `/projetos`.
- Secundário: `home.cta.resume`. Borda `--line`, texto `--fg`. Continua abrindo o PDF em nova aba com `rel="noopener noreferrer"`.
- Altura 48px, padding horizontal 20px, raio 999px, nos dois breakpoints. No mobile, largura 100% e no máximo 20rem, empilhados, gap 12px. Não passar a 56px nem a raio 12.
- Ícone do currículo 16px, gap 8px via CSS. Sem `style` inline.

### Foto

Coluna direita, largura máxima 420px. `border-radius: 16px`. `priority`. `sizes` coerente com a coluna (por exemplo `(max-width: 1023px) 280px, 420px`).

`object-fit: cover` se o enquadramento da arte não cortar o rosto de forma ruim; se cortar, `contain` sobre `--bg-raised`, sem `min-height: 400px` vazio. Sem círculo, sem halo, sem blur de entrada. Sem `!important`.

`priority` só se a medição da fase 9 mostrar a foto como LCP no desktop dentro da meta. No mobile a foto vem depois dos CTAs, então o default seguro é lazy e o H1 como LCP. Detalhe em [05-PERFORMANCE.md](05-PERFORMANCE.md).

`alt`: “Guilherme Rudio” / equivalente estável nos dois idiomas via chave `home.portraitAlt` (“Guilherme Rudio”). Não usar só “Foto de perfil”.

### Entrada

Especificada em [03-MOTION-SYSTEM.md](03-MOTION-SYSTEM.md). Não implementar na fase 2. A fase 2 entrega o hero estático, já no lugar certo, sem depender da animação para ser legível. A fase 6 acrescenta a entrada.

### Mobile até 767px

Uma coluna, nesta ordem: eyebrow, título, subtítulo, CTAs, logos, foto, faixa de trabalho.

Foto com largura máxima 280px, centrada. Padding lateral 20px. Stagger de entrada, quando a fase 6 existir, no máximo dois passos.

### 1024px

Duas colunas permanecem. Gap 48px. Display um degrau abaixo do teto (`clamp` já faz isso). Foto não passa de 420px.

### 1440px, 1920px e ultrawide

Coluna de 1120px centrada. Display no teto da escala (6,5rem). Foto não estica. Sem layout extra de ultrawide.

## O que a página não ganha

- Cursor customizado, follower, magnético ou contextual. Cursor nativo `pointer` em link e botão.
- Fundo generativo, partícula, shader, distorção de imagem, ambiente 3D.
- Transição de página com clip-path, máscara ou morphing.
- Loading com skeleton como estado inicial. Skeleton só se um fetch real ainda não tiver texto, o que deixa de ser o caso dos JSON estáticos.
- Seção cujo texto não exista nos JSON.

## Relação com o LevelHard

O princípio usado: a primeira dobra declara quem é, o trabalho aparece como prova, o processo de construir (neste repositório, o ciclo em [10-AI-DLC.md](10-AI-DLC.md)) fica na documentação, não desenhado no site como se fosse biografia do autor.

O site do autor não descreve um laboratório de IA, um sistema operacional nem um ciclo de lojas. Descreve um desenvolvedor full stack e sete trabalhos já escritos.
