# Segurança

Norma para agentes, aplicada ao que este repositório realmente tem. Não há autenticação para desligar. O risco concreto é o proxy de contato e os segredos de ambiente.

## Segredos

- `API_URL` e `API_KEY` só são lidos em `src/app/api/contact/route.ts`, via `process.env`.
- Não copiar valores para código, JSON, teste, documentação, log ou resposta HTTP.
- Não criar arquivo `.env` commitado. `.gitignore` ignora `.env*`.
- Não imprimir `API_KEY`, o header `x-api-key` nem o corpo com telefone. O `console.error` atual registra status e texto de erro da API externa, ou o objeto de exceção. Não ampliar isso com o payload.
- Não mover o `fetch` da API externa para `ContactModal` ou outro Client Component. Isso colocaria a chave no browser se alguém a lesse no client, e o desenho atual evita esse caminho.

## Contrato e validação

- Não remover `validateForm` nem a checagem `!body.name || !body.telephone`.
- Não tornar a route aberta a outros métodos sem pedido.
- Não descrever a API externa com dados inventados. O header usado é `x-api-key`. Outro esquema de auth: NÃO IDENTIFICADO.
- Mensagens de erro da route são genéricas. Manter isso; não devolver stack, corpo cru da API externa nem o valor dos campos na resposta JSON.

## Configuração e produção

- Não alterar variável de ambiente de produção, `next.config.ts` de deploy ou domínio. Provedor de hospedagem efetivo: NÃO IDENTIFICADO. O README cita Vercel apenas como texto padrão do `create-next-app`.
- Não enfraquecer links externos que já usam `rel="noopener noreferrer"`.
- Não engolir erro com `catch` vazio. O padrão existente é `console.error` e resposta ou estado de erro visível.

## O que não inventar em nome da segurança

Rate limit, captcha, CSRF, login e criptografia adicional não estão no código. Sugerir é permitido no relatório. Implementar exige pedido explícito.
