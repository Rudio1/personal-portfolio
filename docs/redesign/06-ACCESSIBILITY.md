# 06 — Acessibilidade

Estratégia do alvo. O código de hoje falha nos pontos da [01-AUDIT.md](01-AUDIT.md). As fases 1, 3, 5 e 10 fecham o que está abaixo. Nenhuma animação entra sem o fallback de reduced motion.

## Teclado

Ordem: skip link, logo, itens da nav (Início, Projetos, Contato), idioma, conteúdo da página, CTAs, links dos cases, footer se existir.

- Skip link é o primeiro focável. Destino: `id="conteudo"` no `<main>` da home e de `/projetos`. Texto em `messages/` (`a11y.skip`: “Ir para o conteúdo” / “Skip to content”).
- Menu mobile: o botão tem `aria-expanded` e `aria-controls` (já existem). Esc fecha, como hoje. Foco vai para o primeiro link do painel ao abrir e volta ao botão ao fechar.
- Dropdown de idioma: Esc fecha (já fecha junto com o menu). Setas não são obrigatórias nesta rodada; Tab percorre as opções quando aberto. `aria-expanded` permanece.
- Modal: ver abaixo.
- Nenhum alvo depende de hover para ser alcançado. Demo e GitHub são links reais.

## Foco

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
```

Não desenhar cursor customizado. O anel nativo com essa cor é o indicador. Não usar `outline: none` sem substituir. O header hoje tem outline em alguns botões e não em todos os links; o bloco global cobre o resto.

## Contraste

Medido na fórmula WCAG, registrado em [02-DESIGN-SYSTEM.md](02-DESIGN-SYSTEM.md).

- Corpo e título sobre `#090909` passam.
- `--fg-muted` passa para texto de 17px.
- Texto `--fg` sobre botão laranja não passa (2,29:1). Não usar esse par.
- Texto sobre laranja usa `--accent-ink`.
- Placeholder do input não pode ser mais escuro que `--fg-muted`. Se o contraste do placeholder falhar na fase 10, usar `--fg-muted` explícito.
- Fase 10 mede no browser, com a fonte real, o rótulo mono de 12px. Se falhar, o rótulo usa `--fg`, não um cinza novo.

## Semântica

- Um `h1` por página. Na home, o `h1` é o nome. A saudação pode ser um `p` ou a primeira linha dentro do `h1`; preferir `h1` só com o nome e a saudação como `p` anterior, para o leitor de tela ouvir o nome como título. As duas linhas continuam vindo de `home.title` partido por `\n`.
- Cases são `article` com `h2` (o título do projeto). A página de projetos usa `h1` em `projects.title`.
- Nav em `<nav>`. Lista em `<ul>`.
- Botão de contato é `<button>`. Link de projetos é `<a>` via `next/link`.
- Não usar `div` clicável.

## Modal

Cada instância (Header e `/projetos`) implementa o mesmo comportamento. Os estados não se unificam.

- `role="dialog"` e `aria-modal="true"` no painel.
- `aria-labelledby` apontando para o `h2` do título.
- Ao abrir, foco no campo nome.
- Tab e Shift+Tab ciclam dentro do painel.
- Esc fecha.
- Clique no overlay fecha (já existe).
- Ao fechar, foco volta ao botão que abriu. Cada call site guarda esse botão (`useRef` no Header e na página).
- Fundo não rola: `overflow: hidden` no `body` enquanto aberto, restaurado no cleanup.
- `aria-label` de fechar vem de chave (`contact.close`: “Fechar” / “Close”), não de string fixa em português.
- Campo com erro: `aria-invalid="true"` e `aria-describedby` no texto do erro.
- Sucesso e erro de envio dentro de um elemento `aria-live="polite"`.
- Timeout de sucesso cancelado no unmount.

## Idioma

- `document.documentElement.lang` acompanha `pt` ou `en` (fase 10).
- Não há página só em um idioma. Todo texto visível novo entra nos dois JSON.

## Reduced motion

Estratégia completa em [03-MOTION-SYSTEM.md](03-MOTION-SYSTEM.md).

Fallback: com `prefers-reduced-motion: reduce`, não há deslocamento, não há carrossel, a opacidade final é imediata, hover de cor ainda mostra o estado final. Testar no sistema operacional ou na emulação do Chrome em `/`, `/projetos` e no modal.

## Alvos

Altura mínima 44px. Botões do sistema têm 48. O controle de idioma, o fechar do modal e o botão do menu mobile entram nessa altura. Não reduzir o padding do menu mobile a ponto de o link ficar só na altura da fonte.

## Formulário

Regras de validação não mudam: nome com trim e mínimo 2 caracteres; telefone com 10 ou 11 dígitos; servidor exige presença. Mensagens continuam as chaves `contact.errors.*`.

Autocomplete: `autoComplete="name"` e `autoComplete="tel"` nos campos. Não adicionar e-mail. O contrato não tem e-mail.

## Leitor de tela

- Logos da stack: um `alt` cada, uma vez no DOM.
- Foto: `alt` “Guilherme Rudio”.
- Imagem do case: `alt` com o título traduzido. Vegeta, se a miniatura sair, não deixa um `alt` de arquivo vazio anunciando “vegeta”.
- Badge “Destaque” não é anunciado enquanto a UI não o mostrar.
- Ícones decorativos de botão (seta, globo) com `aria-hidden` quando o texto do botão já diz a ação.
- Menu fechado permanece `aria-hidden` quando estiver fora da tela (já existe no painel mobile).

## O que não fazer

- Cursor que substitui o ponteiro do sistema.
- Animação essencial para entender o conteúdo.
- Captcha, armadilha de teclado, foco que salta para o topo a cada seção.
- `aria-label` em inglês fixo num botão cujo restante da UI está traduzido, ou o inverso. O botão de idioma pode manter um rótulo bilingue curto se a chave existir nos dois arquivos com o mesmo sentido (“Selecionar idioma” / “Select language”).
