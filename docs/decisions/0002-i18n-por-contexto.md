# Idioma por contexto, JSON e localStorage

## Contexto

A interface tem textos em português e inglês. O commit `ac15f04` descreve a inclusão de um contexto de tradução e de JSON.

## Decisão

`TranslationProvider` carrega `messages/pt.json` e `messages/en.json` com `import()` dinâmico, guarda um cache de módulo e expõe `locale`, `changeLocale`, `t` e `isLoading`. A escolha fica em `localStorage` na chave `locale`. O padrão é `pt`. Não há prefixo de rota.

`next-intl` está declarado em `package.json` e não é importado pela aplicação.

## Motivo

O commit cita o contexto e o JSON “to avoid errors”. Não há no repositório um texto que explique a rejeição de `next-intl` ou de rotas localizadas. Tratar a biblioteca instalada como plano futuro seria inventar.

## Alternativas consideradas

NÃO IDENTIFICADO.

## Consequências

- Texto novo entra nos dois JSON, na mesma estrutura, e é lido com `t('chave.aninhada')`.
- Não configurar `next-intl`, plugin no `next.config.ts` nem middleware de locale sem pedido explícito.
- Não remover `next-intl` do `package.json` só porque está sem uso, sem pedido explícito.
- `<html lang="pt">` é o comportamento atual do layout.
