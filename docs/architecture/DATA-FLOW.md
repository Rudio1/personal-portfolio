# Fluxos de dados

## Idioma

1. O layout monta `TranslationProvider` em volta de toda a árvore.
2. No primeiro render o locale é `pt` e `t()` já lê os JSON importados. `isLoading` permanece `false`.
3. No primeiro efeito, o provider lê `localStorage.getItem('locale')`. Se o valor for `en` ou `pt`, atualiza o estado. Outro valor é ignorado.
4. Outro efeito define `document.documentElement.lang` com o locale. O HTML inicial do servidor continua `lang="pt"`.
5. `t(key)` divide a chave por `.` e desce no objeto do locale ativo. Se o caminho não existir ou o valor não for string, devolve `''`.
6. `changeLocale` só grava `pt` ou `en`. Não troca a URL.

Chaves usadas pelas telas (grupos de topo): `navigation`, `a11y`, `home`, `projects`, `contact`. O grupo `language` está nos JSON. Nenhum componente chama `t('language....')`.

## Home

`src/app/page.tsx` não recebe props de servidor nem busca dados.

- Título: `t('home.title')`, quebrado por `\n` em saudação e nome.
- Parágrafo: `home.subtitle`. `home.description` e `home.objective` só renderizam se o trim não for vazio.
- Logos: uma lista no JSX, arquivos em `public/logos/`, sem duplicar o markup.
- Ações: `next/link` para `/projetos`, PDF do currículo, e três links para âncoras de case.

## Projetos

1. `src/data/projetos.ts` exporta o array `projetos`, tipado por `ProjetoData`.
2. A página mapeia o array. A `key` React é `projeto.id`. A chave de tradução é `projeto.key`.
3. Textos passados ao card: `projects.items.<key>.title`, `projects.items.<key>.description`, `projects.types.<tipo>`, `projects.buttons.*`. O badge de destaque não é passado.
4. O card renderiza imagem `projeto.imagem` exceto em `vegeta`, tags `tecnologias` (texto cru, sem tradução), links `github`, `githubBackend` e `demo` quando não são `null`. O `id` do article é `projeto.key`.
5. `tipo === 'backend'` muda ícone e rótulo do primeiro link. `githubBackend` acrescenta um segundo link com rótulo de backend.
6. O CTA da página abre estado local `isContactModalOpen`. Esse estado não é o mesmo do Header.

Campos de `ProjetoData`: `id`, `key`, `tecnologias`, `imagem`, `github`, `githubBackend` opcional, `demo`, `destaque`, `tipo` (`backend` | `frontend` | `fullstack`), `icone` (`database` | `globe` | `monitor`).

## Contato

Dois donos de estado instanciam `ContactModal`: `Header.tsx` e `src/app/projetos/page.tsx`. Cada um tem o próprio `isOpen`. Abrir o modal no header não altera o da página de projetos.

### Cliente

Campos: `name`, `telephone`.

Validação em `validateForm` antes do `fetch`:

- Nome, após `trim`: obrigatório e com pelo menos 2 caracteres.
- Telefone, após remover não dígitos: 10 ou 11 dígitos e casar `/^(\d{2})?(\d{4,5})(\d{4})$/`.
- Mensagens vêm de `contact.errors.*`.
- O botão de envio também fica desabilitado se nome ou telefone, após `trim`, estiver vazio.
- Inputs nativos têm `required`.

Envio:

```http
POST /api/contact
Content-Type: application/json

{ "name": "<trim>", "telephone": "<trim>" }
```

- HTTP ok: status visual `success`, limpa o formulário, fecha o modal após 2000 ms.
- HTTP não ok ou exceção de rede: status `error` e texto `contact.error`. O corpo de erro da route não é exibido. `console.error` registra status e texto no caso HTTP, e o erro no `catch`.

### Servidor

`POST` em `src/app/api/contact/route.ts`:

1. Lê JSON. Se `name` ou `telephone` forem falsy, responde `400` com `{ error: 'Nome e telefone são obrigatórios' }`.
2. Faz `fetch(process.env.API_URL || '', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.API_KEY || '' }, body: JSON.stringify({ name: trim, telephone: trim }) })`.
3. Se a resposta externa for ok, devolve o JSON dela com status `200`.
4. Se não for ok, registra `console.error` com status e texto e responde `{ error: 'Erro ao enviar contato para a API externa' }` com o status da API externa.
5. Exceção: `console.error` e `{ error: 'Erro interno do servidor' }` com status `500`.

Não há outro método exportado nessa route. O middleware não intercepta `/api/*`.

O que a API externa persiste, se exige mais campos, e o formato exato do JSON de sucesso: NÃO IDENTIFICADO.

## O que não atravessa o sistema

Não há fila, cache de servidor, banco, sessão, cookie de auth nem revalidação de dados. O único estado persistido no browser é `localStorage.locale`. O cache de traduções vive na memória do módulo client e some quando a página é recarregada por completo; aí os JSON são importados de novo.
