# Fluxos de dados

## Idioma

1. O layout monta `TranslationProvider` em volta de toda a árvore.
2. No primeiro efeito, o provider lê `localStorage.getItem('locale')`. Se não houver valor, usa `pt`.
3. Se o cache de módulo `translationsCache` estiver vazio, importa `messages/pt.json` e `messages/en.json` em paralelo e guarda `default` de cada um.
4. `isLoading` passa a `false`. Falha no import gera `console.error` e também encerra o loading. Não há mensagem de erro na tela.
5. `t(key)` divide a chave por `.` e desce no objeto do locale ativo. Se o caminho não existir ou o valor não for string, devolve `''`.
6. `changeLocale` grava `localStorage` e atualiza o estado. Não troca a URL e não altera `<html lang>`. O layout fixa `lang="pt"`.
7. Locales com arquivo carregado: `pt` e `en`. Outro valor em `locale` faz `t()` devolver string vazia.

Chaves usadas pelas telas (grupos de topo): `navigation`, `home`, `projects`, `contact`. O grupo `language` está nos JSON. Nenhum componente chama `t('language....')`.

## Home

`src/app/page.tsx` não recebe props de servidor nem busca dados.

- Título: `t('home.title')`, quebrado por `\n`.
- Parágrafos: `home.subtitle`, `home.description`, `home.objective`. No JSON atual, `description` e `objective` são strings vazias; os `<p>` ainda são renderizados.
- Logos: lista fixa no JSX, arquivos em `public/logos/`, duplicada no markup para o carrossel contínuo.
- Ações: link interno `/projetos` e link para `/curriculo/Curriculo - Rudio.pdf`.

## Projetos

1. `src/data/projetos.ts` exporta o array `projetos`, tipado por `ProjetoData`.
2. A página mapeia o array. A `key` React é `projeto.id`. A chave de tradução é `projeto.key`.
3. Textos passados ao card: `projects.items.<key>.title`, `projects.items.<key>.description`, `projects.types.<tipo>`, `projects.badges.destaque`, `projects.buttons.*`.
4. O card renderiza imagem `projeto.imagem`, tags `tecnologias` (texto cru, sem tradução), links `github`, `githubBackend` e `demo` quando não são `null`.
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
