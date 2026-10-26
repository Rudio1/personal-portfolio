# Contato por route handler que faz proxy

## Contexto

O visitante envia nome e telefone. O commit `22d2575` registra o modal e a API externa.

## Decisão

O browser envia `POST /api/contact` com `{ name, telephone }`. `src/app/api/contact/route.ts` valida a presença dos dois campos e repete o POST para `process.env.API_URL`, com o header `x-api-key` igual a `process.env.API_KEY`. A validação de formato do telefone e do tamanho do nome fica no `ContactModal`.

Não há página de contato. O modal é aberto pelo Header e pela página de projetos, cada um com seu estado.

## Motivo

A route existe para falar com a API externa fora do browser. O código não explica por que a validação de formato não se repete no servidor. Esse fato deve ser preservado até pedido de mudança: o servidor não replica `validatePhone`.

## Alternativas consideradas

NÃO IDENTIFICADO. Não há SDK de e-mail, banco de mensagens nem chamada direta do modal para `API_URL`.

## Consequências

- Segredo permanece só na route, via ambiente.
- Mudança de campo obrigatório mexe no modal, na route e nos JSON de texto juntos.
- Campo extra só segue para a API externa quando o contrato externo for conhecido. Hoje esse contrato, além de `name` e `telephone`, está como NÃO IDENTIFICADO.
- Não unir os dois modais num estado global sem pedido. São instâncias separadas de propósito observável no código; se a separação foi acidental, isso não está escrito. Não “consertar” no meio de outra tarefa.
