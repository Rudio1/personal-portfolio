# Não inventar

Norma para agentes. O resumo executável está em [AGENTS.md](../../AGENTS.md).

Antes de criar classe, componente, contexto, rota, campo, variável de ambiente, biblioteca ou padrão de pasta, procurar no repositório se o equivalente já existe.

## O que procurar

| Intenção | Onde olhar | Se já existir |
| --- | --- | --- |
| Texto na UI | `messages/pt.json`, `messages/en.json` e chamadas `t(` | Reusar a chave ou acrescentar a chave irmã nos dois arquivos |
| Projeto na grade | `src/data/projetos.ts` | Novo objeto no array existente |
| Modal de contato | `ContactModal.tsx` | Reusar o componente; não criar segundo formulário |
| Loading | `LoadingSkeleton.tsx` | Reusar os três exports |
| Ícone | `lucide-react`, já usado | Importar o ícone necessário dessa biblioteca |
| Chamada externa de contato | `src/app/api/contact/route.ts` | Estender essa route se o pedido for o mesmo fluxo |
| Estado global | `src/contexts/` | Só existe tradução. Outro contexto exige pedido explícito |
| Estilo | CSS Module do dono da tela | Não criar sistema de design paralelo |

## Se não existir

Criar no formato descrito em [NEW-FEATURE.md](../development/NEW-FEATURE.md) e [CONVENTIONS.md](../development/CONVENTIONS.md).

Estes artefatos não existem e não devem ser criados para “completar” a arquitetura: `services/`, `repositories/`, `entities/`, `dto/`, `hooks/` como camada, ORM, banco, autenticação, suíte de testes, configuração do `next-intl`.

## Dúvida que interrompe a implementação

Parar e perguntar quando o pedido:

- exigir persistência, login ou área administrativa;
- exigir campo novo no POST para a API externa, porque o contrato externo além de `name` e `telephone` é NÃO IDENTIFICADO;
- exigir nova biblioteca;
- exigir mover arquivos, unificar os dois modais ou trocar o mecanismo de idioma;
- puder ser lido de dois modos incompatíveis com o código atual.

A pergunta descreve o que foi encontrado no código e qual decisão falta. Não inclui uma implementação provisória da opção estrutural.
