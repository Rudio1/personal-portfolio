# Gaps e pontos de cuidado

Segunda leitura depois de escrita a documentação, confrontada com o código em `src/`, `messages/`, `public/` (via arquivos versionados), `package.json` e o histórico Git. Nada disto foi corrigido. Um agente não trata um item daqui como tarefa implícita.

## Regras que o código segue e que não estavam escritas antes

Passam a estar em `AGENTS.md`, `docs/architecture/` e `docs/features/`. Incluem: separação entre `projetos.ts` e `projects.items`, proxy único de contato, locale em `localStorage`, páginas como Client Components.

## Código que foge do padrão mais frequente

- Imports relativos em todo `src/`, com alias `@/*` configurado e sem uso.
- Home usa `page.module.css` e `<a>` no CTA. `/projetos` usa `projetos.module.css` e `next/link` não aparece nessa página; o Header usa `next/link`.
- `ProjetoCard.tsx` não tem CSS Module próprio. Importa `src/app/projetos/projetos.module.css`.
- `src/data/projetos.ts` depende de um tipo exportado por um componente visual.
- Aspas simples na maior parte dos componentes e aspas duplas em `layout.tsx`.
- Aria-labels do Header e do modal estão fixos em português ou inglês, fora dos JSON. O restante da UI passa por `t()`.
- Erros HTTP de `route.ts` estão em português fixo. A UI ignora esse corpo e mostra `contact.error`.

## Arquitetura inconsistente ou fácil de “consertar” sem pedido

- `next-intl` está em `dependencies` e não há import em `src/` nem opção em `next.config.ts`. Motivo: NÃO IDENTIFICADO.
- `src/middleware.ts` não altera a requisição. Motivo de existir: NÃO IDENTIFICADO.
- `layout.tsx` carrega Geist e Geist Mono. `globals.css` aplica Montserrat. As variáveis `--font-geist-sans` e `--font-geist-mono` não aparecem em nenhum CSS.
- Em `globals.css`, `:root` é fundo preto e texto branco. O bloco `@media (prefers-color-scheme: dark)` inverte para fundo branco e texto preto e ainda marca `color-scheme: dark`. Intenção: NÃO IDENTIFICADO. Não inverter isso numa tarefa de conteúdo.
- `<html lang="pt">` não acompanha o locale.
- `changeLocale` não restringe o argumento a `pt` | `en`.
- Validação de formato do telefone e tamanho mínimo do nome existem só no modal. A route só exige presença.
- Dois `ContactModal` com estado separado (Header e página de projetos). Não há contexto de UI.
- `Header.tsx` tem ramo para `href` contendo `.pdf`, e `menuItems` não tem PDF.
- O grupo JSON `language` não é lido. `home.description` e `home.objective` são strings vazias e a home ainda renderiza os parágrafos.
- `public/img-rudio.png` não é referenciado em `src/`. A home usa `public/guilherme-rudio.png`.
- Classes `.highlight` em `page.module.css` e `projetos.module.css` não aparecem no TSX pesquisado.
- `ContactModal` guarda `responseData` no sucesso e não usa o valor. O `setTimeout` de 2 segundos que fecha o modal não é limpo no unmount do efeito; não há efeito para isso, o timeout está no submit.

## Dependências e módulos sem documentação de produto

- Provedor, URL e schema da API externa, fora do que `route.ts` envia: NÃO IDENTIFICADO.
- Onde o site está publicado: NÃO IDENTIFICADO. `README.md` é o modelo do `create-next-app` (inclui “Deploy on Vercel” e o caminho `app/page.tsx`, que neste repo é `src/app/page.tsx`).
- Não há CI, Dockerfile, testes, `.env.example` nem ADR anterior a 2026-10-09.
- `.gitignore` lista `.cursorrules`. Regras versionadas deste esforço ficam em `.cursor/rules/`, formato atual de regras do Cursor, que esse ignore não cita.

## Features cobertas

Home, projetos, contato, i18n e navegação têm arquivo em `docs/features/`. Não há outra feature de produto no código.

## Onde uma IA tende a errar

1. Introduzir `services`, `repositories`, DTO ou banco para um site sem persistência.
2. Ligar `next-intl` ou apagar a dependência por conta própria.
3. Colocar `API_KEY` no client ou trocar o proxy por `fetch` direto no modal.
4. Unificar validação, modais, CSS do card ou imports para `@/` no meio de um pedido pequeno.
5. Corrigir grafia de `metadata.description` (`Portoflio digital`), o `lang`, o media query de cor ou a fonte Geist como se fossem bugs já aceitos para mudança.
6. Remover middleware, chave JSON, classe CSS ou imagem não referenciada.
7. Assumir que existe teste e inventar Jest.
8. Documentar a API externa com campos que `route.ts` não envia.
9. Tratar `README.md` como especificação do portfólio.

## Decisões importantes já registradas

Ver `docs/decisions/`. O que continua sem motivo escrito pelo autor está marcado como NÃO IDENTIFICADO dentro de cada ADR. Não completar esses motivos com suposição.
