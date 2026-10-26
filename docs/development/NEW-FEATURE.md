# Como criar uma funcionalidade

Leia [AGENTS.md](../../AGENTS.md) e a feature parecida em [docs/features/](../features/) antes de criar arquivo. Este projeto não tem services, repositories, entidades ou DTOs. Os passos abaixo só incluem artefatos que já existem.

## 1. Analisar o pedido

Classifique a mudança em um destes tipos, que são os que o código suporta hoje:

| Pedido | Módulo a abrir primeiro |
| --- | --- |
| Texto, título, descrição, rótulo | `messages/pt.json` e `messages/en.json`, depois quem chama `t(...)` |
| Mais um trabalho na grade | `src/data/projetos.ts` e `projects.items` nos JSON |
| Nova página | `src/app/`, `src/components/Header.tsx` se entrar no menu |
| Formulário de contato | `src/components/ContactModal.tsx` e `src/app/api/contact/route.ts` |
| Idioma, locale, loading de texto | `src/contexts/TranslationContext.tsx` |
| Aparência | CSS Module do componente ou da página, e `globals.css` se o token for global |

Se o pedido não couber nessa lista (conta de usuário, painel, banco, CMS), pare e descreva a dúvida. Não crie a estrutura por analogia com outro sistema.

## 2. Onde criar cada arquivo

- Página: `src/app/<segmento>/page.tsx`. Segmentos atuais: raiz (`page.tsx`) e `projetos`. URLs atuais: `/` e `/projetos`.
- Estilo da página: CSS Module na mesma pasta.
- Componente usado em mais de uma tela, ou o card/modal/header: `src/components/<Nome>.tsx` e, se o estilo for dele, `<Nome>.module.css`. Exceção já existente: `ProjetoCard.tsx` usa `src/app/projetos/projetos.module.css`.
- Dado estático de projeto: o array em `src/data/projetos.ts`. Não criar outro arquivo de dados se o item é um projeto.
- Tradução: as duas árvores JSON. A chave nova entra nos dois com a mesma estrutura.
- Imagem ou PDF: `public/`, caminho público começando com `/`.
- Endpoint HTTP: `src/app/api/<nome>/route.ts`, somente se o pedido exigir borda de servidor. Hoje o único caso é o proxy de contato.

## 3. Nomes

Seguir [CONVENTIONS.md](CONVENTIONS.md).

- Arquivo de componente: PascalCase igual ao componente.
- Função de página: a home exporta `Home`; a de projetos exporta `Projetos`.
- Método interno: verbo em camelCase já usado (`handleSubmit`, `validateForm`, `changeLocale`, `toggleMenu`).
- Chave de projeto: string estável, única, igual no array e em `projects.items`.
- Não renomear `telephone` para `phone` no JSON enviado. O rótulo traduzido usa `contact.phone`; o campo do payload usa `telephone`.

## 4. Página

Modelo real: `src/app/projetos/page.tsx`.

- `'use client'` quando houver hook.
- `const { t, isLoading } = useTranslations()`.
- Enquanto `isLoading`, usar `LoadingSkeleton` ou `LoadingSkeletonInline`.
- Import do CSS: `import styles from './<arquivo>.module.css'`.
- Link interno de navegação no Header usa `next/link`. A home usa `<a href="/projetos">` para o CTA. Ao editar um arquivo, manter o tipo de link que ele já usa, salvo pedido para trocar.

## 5. Projeto na grade

1. Incluir objeto em `projetos` com todos os campos de `ProjetoData`. `id` numérico segue a sequência já usada no arquivo. `github`, `demo` e `githubBackend` usam `null` quando não há URL.
2. `icone` só pode ser chave de `ICONE_MAP` em `ProjetoCard.tsx`: `database`, `globe`, `monitor`.
3. `tipo` só pode ser `backend`, `frontend` ou `fullstack`.
4. Criar `projects.items.<key>.title` e `.description` em `pt.json` e `en.json`.
5. Colocar a imagem em `public/` e apontar `imagem` para esse caminho.
6. Tecnologias são strings exibidas como foram escritas, sem tradução.

## 6. Textos

`t` só devolve string. Não colocar objeto ou número no valor que a UI lê com `t`. Interpolação com variáveis: NÃO IDENTIFICADO. O código não formata parâmetros dentro de `t`.

Quebra de linha no título da home é o caractere `\n` dentro da string JSON, partido no componente com `split('\n')`.

## 7. Formulário e API

Não existe DTO em arquivo. O corpo é um objeto literal `{ name, telephone }` nos dois lados.

Validação nova de formato fica em `ContactModal.tsx`, no mesmo estilo de `validateForm` / `validatePhone`, com mensagem em `contact.errors` nos dois idiomas.

A route permanece o único lugar que conhece `API_URL` e `API_KEY`. Alinhar presença do campo no `if (!body.name || !body.telephone)` se o campo novo for obrigatório. Sem evidência do contrato externo, não acrescentar propriedade ao `JSON.stringify` enviado para `API_URL`.

## 8. Testes

Não há suíte. Não criar infraestrutura de teste como parte de uma feature visual ou de conteúdo, a menos que o pedido peça testes.

Validação do repositório:

- `npm run lint`
- `npm run build` se tipos, rotas ou a API mudarem
- Fluxo manual no browser quando a UI mudar: `/`, `/projetos`, troca de idioma, abrir e enviar o modal só se houver ambiente com `API_URL` e `API_KEY`. Sem essas variáveis, o comportamento do proxy contra a API externa não é verificável daqui.

## 9. Documentação da mudança

- Mudou regra, fluxo, campo ou contrato: atualizar o arquivo em `docs/features/`.
- Mudou comportamento, conteúdo de projeto, contrato ou configuração: entrada em `docs/changelog/CHANGELOG.md`.
- Decisão nova de estrutura: ADR em `docs/decisions/`. Só criar ADR se a escolha for estrutural e tiver sido pedida ou confirmada. Não abrir ADR para cada ajuste visual.

## Checklist

### Funcionalidade neste portfólio

- [ ] Entender o requisito e escrever o que fica de fora.
- [ ] Abrir o módulo correspondente e a feature em `docs/features/`.
- [ ] Procurar componente, chave, rota e dado que já resolvam o caso.
- [ ] Listar arquivos que serão tocados.
- [ ] Implementar no padrão do arquivo vizinho.
- [ ] Se houver texto, atualizar `pt.json` e `en.json`.
- [ ] Se houver projeto, atualizar `projetos.ts`, as chaves e o arquivo em `public/`.
- [ ] Se houver contato, manter modal e `route.ts` coerentes e a chave só no servidor.
- [ ] Rodar `npm run lint` e, quando couber, `npm run build`.
- [ ] Conferir a UI no browser quando a tela mudar.
- [ ] Atualizar `docs/features/` se a regra mudou.
- [ ] Atualizar o changelog se comportamento, contrato ou conteúdo mudou.
- [ ] Reportar o que foi alterado e o que não foi possível verificar.
