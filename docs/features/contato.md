# Contato

## Objetivo

Receber nome e telefone e encaminhá-los a uma API externa sem expor a chave no browser.

## Onde está

- UI: `src/components/ContactModal.tsx`, `src/components/ContactModal.module.css`
- Quem abre o modal: `src/components/Header.tsx` e `src/app/projetos/page.tsx`
- Proxy: `src/app/api/contact/route.ts`
- Textos: objeto `contact` nos dois JSON

Não há página `/contato`.

## Fluxo

1. Botão de contato no Header (desktop ou mobile) ou o CTA em `/projetos` põe `isOpen` em true na sua própria instância.
2. Com `isOpen === false` o modal retorna `null`.
3. Clique no overlay (alvo igual ao currentTarget) ou no X chama `onClose`. O Header fecha também no ESC o menu e o dropdown de idioma; o ESC não está ligado ao modal.
4. Submit chama `validateForm`. Se falhar, não há `fetch`.
5. `POST /api/contact` com `{ name, telephone }` já com `trim`.
6. Sucesso: mensagem `contact.success`, formulário limpo, `onClose` depois de 2 segundos.
7. Falha: mensagem `contact.error`.

Há duas instâncias independentes. Estado de uma não sincroniza com a outra.

## Entradas

| Campo | UI | Payload | Regra no cliente | Regra no servidor |
| --- | --- | --- | --- | --- |
| Nome | `contact.name` | `name` | obrigatório após trim; mínimo 2 caracteres | obrigatório (`!body.name` → 400) |
| Telefone | `contact.phone` | `telephone` | obrigatório; 10 ou 11 dígitos depois de remover não dígitos; regex `/^(\d{2})?(\d{4,5})(\d{4})$/` | obrigatório (`!body.telephone` → 400). Formato não é revalidado |

O placeholder e a mensagem de telefone inválido citam `(11) 99999-9999` nos dois idiomas. A validação não exige máscara, parênteses ou DDD 11; exige a quantidade de dígitos.

Durante o envio, os inputs e o botão cancelar ficam `disabled`. O submit também fica desabilitado com nome ou telefone vazio após trim.

## Saídas

| Situação | Resposta da route | UI |
| --- | --- | --- |
| Falta nome ou telefone | `400`, `{ error: 'Nome e telefone são obrigatórios' }` | texto genérico `contact.error` |
| API externa ok | `200` e o JSON devolvido por ela | `contact.success` |
| API externa não ok | mesmo status da externa, `{ error: 'Erro ao enviar contato para a API externa' }` | `contact.error` |
| Exceção, JSON inválido ou falha de rede no servidor | `500`, `{ error: 'Erro interno do servidor' }` | `contact.error` |

As strings de erro da route estão fixas em português. A UI não as mostra.

## Integração

```http
POST <API_URL>
Content-Type: application/json
x-api-key: <API_KEY>

{ "name": "...", "telephone": "..." }
```

`API_URL` ou `API_KEY` ausentes viram string vazia no código (`|| ''`). Efeito contra a API real nesse caso: NÃO IDENTIFICADO. Não substituir esse fallback por outro comportamento sem pedido.

Provedor, autenticação além do header `x-api-key` e schema de resposta: NÃO IDENTIFICADO.

## Regras especiais

- A chave não pode ir para componente, JSON de mensagem, log ou repositório.
- O client continua chamando só `/api/contact`.
- Não há honeypot, rate limit, CSRF token nem captcha no código.
- `responseData` no sucesso do modal é lido e não é usado na UI.

## Casos de erro já tratados

- Validação local com mensagem por campo e limpeza do erro daquele campo ao digitar.
- `console.error` no modal (status e corpo, ou a exceção) e na route (status e texto da externa, ou a exceção). Não há log do payload.
