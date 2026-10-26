# Projetos em módulo estático e textos nos JSON

## Contexto

A página de projetos precisa de uma lista estável de trabalhos, com links e imagens, e com título e descrição nos dois idiomas.

## Decisão

Metadados vivem no array `projetos` em `src/data/projetos.ts`, tipado por `ProjetoData` exportado de `ProjetoCard.tsx`. Título e descrição vivem em `projects.items.<key>` nos JSON. A página junta as duas fontes e passa strings prontas ao card.

## Motivo

É o desenho presente desde a página de projetos. Motivo escrito para separar metadados e textos, e para o tipo morar no componente: NÃO IDENTIFICADO.

## Alternativas consideradas

NÃO IDENTIFICADO. Não há CMS, MDX, banco nem rota de API de projetos.

## Consequências

- Novo projeto edita o array, os dois JSON e o arquivo de imagem. Não cria endpoint.
- A dependência `data` → tipo do componente permanece até uma revisão explícita desta decisão.
- `key` é o vínculo entre o array e o JSON. `id` é a chave de lista React e não substitui `key`.
