# Home

## Objetivo

Apresentar Guilherme Rudio, um resumo em texto, logos de tecnologias e dois atalhos: a página de projetos e o PDF do currículo.

## Onde está

- `src/app/page.tsx`
- `src/app/page.module.css`
- Textos: `home` em `messages/pt.json` e `messages/en.json`
- Foto: `public/guilherme-rudio.png`
- Logos: `public/logos/` (`azure.svg`, `dotnet.svg`, `sql.svg`, `react.svg`, `next.svg`, `csharp.svg`, `php.svg`)
- Currículo: `public/curriculo/Curriculo - Rudio.pdf`

## Fluxo

A página é Client Component. Não busca API. Com `isLoading`, o título usa `LoadingText`, o bloco de texto usa `LoadingSkeleton` com 3 linhas e os botões são placeholders. Sem loading, renderiza as traduções e os links.

O título quebra em linhas pelo `\n` de `home.title`.

## Entradas

Nenhuma entrada do usuário. Locale vem do contexto.

## Saídas

HTML estático de apresentação mais links:

- `/projetos` no CTA primário (`<a>`, não `next/link`)
- PDF em nova aba

## Regras

- A lista de logos está duplicada no JSX de propósito, comentário no arquivo: efeito de carrossel infinito. Alterar a lista exige alterar as duas metades.
- `home.description` e `home.objective` existem e são renderizados mesmo vazios.
- Metadata da aba do browser não vem desta página. Está em `layout.tsx`: título `Rudio - Desenvolvedor Full Stack`, description `Portoflio digital` (grafia presente no código).

## Persistência e API

Nenhuma.

## Erros

Não há estado de erro próprio. Falha ao carregar traduções deixa os textos vazios depois do loading. Ver [i18n.md](i18n.md).

## Observações

`public/img-rudio.png` não é referenciado por `page.tsx` nem por outro arquivo em `src/`. Não remover sem pedido.
