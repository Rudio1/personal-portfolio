# Gaps e pontos de cuidado

Segunda leitura confrontada com o código. Itens abaixo continuam abertos. O que o redesign de 2026-10-27 fechou (tema, fonte, skeleton, badge universal, aria fixo do modal) saiu desta lista. Um agente não trata um item daqui como tarefa implícita.

## Regras que o código segue e que não estavam escritas antes

Passam a estar em `AGENTS.md`, `docs/architecture/` e `docs/features/`. Incluem: separação entre `projetos.ts` e `projects.items`, proxy único de contato, locale em `localStorage`, páginas como Client Components.

## Código que foge do padrão mais frequente

- Imports relativos em todo `src/`, com alias `@/*` configurado e sem uso.
- Home e `/projetos` usam `next/link` nos destinos internos. O PDF continua `<a target="_blank">`.
- `ProjetoCard.tsx` não tem CSS Module próprio. Importa `src/app/projetos/projetos.module.css`.
- `src/data/projetos.ts` depende de um tipo exportado por um componente visual.
- Aspas simples na maior parte dos componentes e aspas duplas em `layout.tsx`.
- Aria de menu, idioma, skip e fechar do modal vêm dos JSON. O Header ainda escreve “Português”, “English” e “Idioma / Language” no JSX.
- Erros HTTP de `route.ts` estão em português fixo. A UI ignora esse corpo e mostra `contact.error`.

## Arquitetura inconsistente ou fácil de “consertar” sem pedido

- `next-intl` está em `dependencies` e não há import em `src/` nem opção em `next.config.ts`. Motivo: NÃO IDENTIFICADO.
- `src/middleware.ts` não altera a requisição. Motivo de existir: NÃO IDENTIFICADO.
- `<html lang>` no servidor é `pt`. O provider ajusta `lang` no cliente depois da hidratação.
- Validação de formato do telefone e tamanho mínimo do nome existem só no modal. A route só exige presença.
- Dois `ContactModal` com estado separado (Header e página de projetos). Não há contexto de UI.
- O grupo JSON `language` não é lido. `home.description` e `home.objective` são strings vazias e a home não renderiza o parágrafo nesse caso.
- `public/img-rudio.png` não é referenciado em `src/`. A home usa `public/guilherme-rudio.png`.
- Imagens em `public/` sem entrada em `projetos.ts` (`brunelly.png`, `cecis.png`, `cybergallery.png`, `refeicoes.png`, `tarefas.png`) não entram no site. Não apagar sem pedido.

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
5. Reverter o tema escuro, a fonte Geist, o `lang` no cliente ou a description do metadata. Isso foi fechado no redesign de 2026-10-27, não é bug pendente.
6. Remover middleware, chave JSON, classe CSS ou imagem não referenciada.
7. Assumir que existe teste e inventar Jest.
8. Documentar a API externa com campos que `route.ts` não envia.
9. Tratar `README.md` como especificação do portfólio.

## Decisões importantes já registradas

Ver `docs/decisions/`. O que continua sem motivo escrito pelo autor está marcado como NÃO IDENTIFICADO dentro de cada ADR. Não completar esses motivos com suposição.
