# Projetos

## Objetivo

Listar trabalhos com imagem, tipo, tecnologias, links de código e demo, e um CTA para contato ou currículo.

## Onde está

- Página: `src/app/projetos/page.tsx`
- Estilo da página e do card: `src/app/projetos/projetos.module.css`
- Card: `src/components/ProjetoCard.tsx`
- Dados: `src/data/projetos.ts`
- Textos: `projects` nos dois JSON
- Imagens: arquivos em `public/` apontados por `imagem`

## Regra de negócio

Cada item do array é um case na lista, na ordem do array.

- O campo `destaque` escolhe os cases da seção “Projetos selecionados” da home (hoje `agropulse`, `ag-clinical`, `vae-mobility`). Em `/projetos` ele não muda nada: a página lista os sete e não mostra o badge `projects.badges.destaque`.
- `projects.items.<key>` pode ter `category`, `features` (itens separados por `
`), `problem`, `role` e `results`. A home lê esses campos. Campo vazio não aparece.
- `tipo` escolhe o rótulo traduzido (`projects.types`), exibido como meta acima do título. O campo `icone` continua no dado e não escolhe mais um ícone sobre a imagem.
- `tecnologias` são rótulos literais.
- Link de `github`: se `tipo` é `backend`, o link usa ícone de banco e o texto `projects.buttons.backend`; caso contrário, ícone GitHub e `projects.buttons.frontend`.
- `githubBackend` não nulo adiciona um segundo link de backend.
- `demo` não nulo adiciona o link `projects.buttons.demo`.
- `null` omite o link.
- O `id` do `<article>` é a `key`, para âncoras da home.
- `vegeta` não renderiza a imagem. Os outros cases mostram a screenshot com `sizes` e sem `priority`.

Itens atuais e `key`, nesta ordem: `vegeta`, `agropulse`, `ag-clinical`, `vae-mobility`, `psi-amanda`, `trafego`, `agcustom`. Os ids vão de 1 a 7.

## Fluxo

1. A página lê `projetos` e `useTranslations`.
2. Para cada item, resolve título, descrição, tipo e rótulos dos botões.
3. `ProjetoCard` é `memo`. As props de texto vêm de fora; o card não chama `t()`.
4. O CTA “contato” abre `ContactModal` com estado local da página.
5. O CTA de currículo aponta para o mesmo PDF da home.

## Entradas

Nenhuma além do clique nos links e no botão de contato.

## Saídas

Links externos (`target="_blank"`, `rel="noopener noreferrer"`) e o modal de contato.

## Dependências

- Tipo `ProjetoData` definido no card e importado pelos dados. `icone` aceita `database`, `globe` ou `monitor`.
- CSS do card mora no module da página. Mudança de classe nesse CSS afeta página e card.

## Persistência e API

Nenhuma. Incluir um projeto é mudança de código e de arquivo estático, não de banco.

## Casos de erro

- `key` sem par em `projects.items.<key>`: `t()` devolve `''` e o card mostra título e descrição vazios.
- Imagem ausente em `public/`: comportamento do `next/image` para arquivo inexistente. Tratamento específico no projeto: NÃO IDENTIFICADO.

## Observações

Não há filtro, busca nem página de detalhe. O badge de destaque não é renderizado. Três itens têm `destaque: true`.

O reveal é uma vez por case, com `IntersectionObserver`. No desktop a imagem e o texto não partem no mesmo frame: o lado esquerdo sai primeiro e o outro espera 60ms. Vegeta não espera. No hover com ponteiro fino a imagem vai a `scale(1.02)` e a borda do case esquenta. O card não se desloca.
