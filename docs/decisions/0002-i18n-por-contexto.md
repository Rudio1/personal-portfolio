# Idioma por contexto, JSON e localStorage

## Contexto

A interface tem textos em português e inglês. O commit `ac15f04` descreve a inclusão de um contexto de tradução e de JSON.

## Decisão

`TranslationProvider` importa `messages/pt.json` e `messages/en.json` de forma estática e expõe `locale`, `changeLocale`, `t` e `isLoading` (sempre `false`). A escolha fica em `localStorage` na chave `locale`. O padrão no primeiro render é `pt`. Um efeito aplica `en` se o valor salvo for `en` ou `pt`. `changeLocale` ignora outro valor. Não há prefixo de rota.

No cliente, `document.documentElement.lang` acompanha o locale. O HTML do servidor continua `lang="pt"`.

`next-intl` está declarado em `package.json` e não é importado pela aplicação.

## Motivo

O commit cita o contexto e o JSON “to avoid errors”. Não há no repositório um texto que explique a rejeição de `next-intl` ou de rotas localizadas. Tratar a biblioteca instalada como plano futuro seria inventar.

## Alternativas consideradas

NÃO IDENTIFICADO.

## Consequências

- Texto novo entra nos dois JSON, na mesma estrutura, e é lido com `t('chave.aninhada')`.
- Não configurar `next-intl`, plugin no `next.config.ts` nem middleware de locale sem pedido explícito.
- Não remover `next-intl` do `package.json` só porque está sem uso, sem pedido explícito.
- `<html lang>` no servidor é `pt`. Depois da hidratação, o provider ajusta `lang` para `pt` ou `en`.
