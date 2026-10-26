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

Cada item do array é um projeto exibido na grade, na ordem do array.

- `destaque: true` aplica a classe `destaque`, o badge `projects.badges.destaque` e `priority` na imagem. Os demais usam `loading="lazy"`.
- `tipo` escolhe o rótulo traduzido (`projects.types`) e o ícone via `icone`.
- `tecnologias` são rótulos literais.
- Link de `github`: se `tipo` é `backend`, o botão usa ícone de banco e o texto `projects.buttons.backend`; caso contrário, ícone GitHub e `projects.buttons.frontend`.
- `githubBackend` não nulo adiciona um segundo botão de backend.
- `demo` não nulo adiciona botão `projects.buttons.demo`.
- `null` omite o botão. Não há botão desabilitado.

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

- Tipo `ProjetoData` definido no card e importado pelos dados.
- CSS do card mora no module da página. Mudança de classe nesse CSS afeta página e card.
- Ícones de tipo: `database` → `Database`, `globe` → `Globe`, `monitor` → `Monitor`, todos de `lucide-react`.

## Persistência e API

Nenhuma. Incluir um projeto é mudança de código e de arquivo estático, não de banco.

## Casos de erro

- `key` sem par em `projects.items.<key>`: `t()` devolve `''` e o card mostra título e descrição vazios.
- `icone` fora de `ICONE_MAP`: o tipo TypeScript não permite; em execução o componente do ícone ficaria indefinido. Não há guarda em runtime.
- Imagem ausente em `public/`: comportamento do `next/image` para arquivo inexistente. Tratamento específico no projeto: NÃO IDENTIFICADO.

## Observações

Não há filtro, busca, ordenação por destaque nem página de detalhe. Destaque é só visual. Os sete itens atuais estão com `destaque: true`.
