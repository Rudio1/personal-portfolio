---
paths:
  - "src/app/api/**/*.ts"
  - "src/components/ContactModal.tsx"
---

# Contato

Cliente: `ContactModal` valida nome (trim, mínimo 2) e telefone (10 ou 11 dígitos) e envia:

```json
{ "name": "...", "telephone": "..." }
```

para `POST /api/contact`. Servidor: `src/app/api/contact/route.ts` exige os dois campos e repassa a `API_URL` com header `x-api-key`.

- Não chamar `API_URL` no componente.
- Não gravar a chave no código, no log ou na resposta.
- Não renomear `telephone` para `phone` no payload.
- Não acrescentar campo no POST externo: o contrato além desses dois campos é desconhecido.
- Manter as duas validações. O servidor não replica a regex do telefone; não “completar” isso sem pedido.
- Há um modal no Header e outro em `/projetos`, com estado separado. Não unificar sem pedido.
