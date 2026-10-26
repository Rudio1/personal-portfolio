# Desenvolvimento local

Comandos definidos em `package.json`:

```bash
npm run dev
npm run lint
npm run build
npm start
```

`npm run dev` sobe o Next.js. A home fica em `/` e os projetos em `/projetos`. Porta padrão do Next.js: a que o CLI imprimir. O README da raiz cita `http://localhost:3000`; isso é texto do `create-next-app`, não uma configuração própria em `next.config.ts`.

## Ambiente do formulário de contato

A route lê `API_URL` e `API_KEY`. Não há `.env.example` no Git. Os nomes estão apenas em `src/app/api/contact/route.ts`.

Sem essas variáveis, o restante do site (home, projetos, idioma) não depende delas. O envio do formulário depende. Não inventar URL ou chave para testar.

Não colocar valores reais neste guia nem em outro arquivo versionado.

## O que conferir depois de uma mudança de UI

1. `/` com textos em pt e, depois da troca no Header, em en.
2. `/projetos`: grade, links e abertura do modal.
3. Header desktop e largura estreita: menu mobile, Escape, overlay.
4. Formulário: validação de nome curto e telefone com quantidade errada de dígitos, sem precisar da API. O POST real só com ambiente configurado.

## Ferramentas que o repositório não tem

Script `test`, CI, Dockerfile, `middleware` com regra ativa, banco e seed: não existem. Não criá-los como parte de subir o ambiente local.
