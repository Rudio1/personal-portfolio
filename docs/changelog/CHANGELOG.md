# Changelog

Registro de mudanças de comportamento, contrato, conteúdo publicado ou estrutura de desenvolvimento. A entrada mais recente fica no topo.

Não usar uma linha solta do tipo "bug corrigido". Cada entrada precisa dizer o que mudou, por quê, onde e qual o efeito.

## 2026-10-09 — Grade de projetos alinhada aos sites publicados

### Alteração

A aba de projetos passou a listar o Vegeta e seis sites publicados: AgroPulse, AG Clinical, VAE Mobility, Psicóloga Amanda Rudio, Alexandre Baiocco (gestão de tráfego) e AG Custom. Saíram Cyber Gallery, Ceci's, refeições, tarefas e Brunelly.

### Motivação

A grade ainda mostrava trabalhos antigos. Os sites que devem aparecer são os que estão no ar, mantendo a API Vegeta.

### Arquivos/Módulos afetados

- `src/data/projetos.ts`
- `messages/pt.json`
- `messages/en.json`
- `public/agropulse.png`
- `public/ag-clinical.png`
- `public/vae-mobility.png`
- `public/trafego.png`
- `public/ag-custom.png`
- `public/psi-amanda.png`
- `docs/features/projetos.md`

### Impacto

A home, o Header, o formulário de contato e a API Vegeta permanecem. O link de demonstração da AG Custom passa a ser `https://www.agcustom.com.br/`. O da psicóloga Amanda continua `https://psi-amanda.rudio1.com.br/`.

### Banco de dados

Não há banco neste repositório. Nenhuma alteração.

### Breaking changes

Nenhuma rota nova ou removida. Alguns projetos deixam de aparecer na grade `/projetos`.

### Migrações

Nenhuma.

## 2026-10-09 — Contrato de documentação para desenvolvimento com IA

### Alteração

Criada a documentação do estado atual do portfólio e as regras para agentes: `AGENTS.md`, `docs/` e `.cursor/rules/`.

### Motivação

O repositório passou a ser mantido com auxílio de IA. As regras e o mapa da arquitetura precisam refletir o código existente para evitar camadas, bibliotecas e fluxos que o projeto não usa.

### Arquivos/Módulos afetados

- `AGENTS.md`
- `docs/architecture/`
- `docs/development/`
- `docs/features/`
- `docs/decisions/`
- `docs/changelog/`
- `docs/guides/`
- `docs/rules/`
- `.cursor/rules/`

### Impacto

Nenhuma alteração em páginas, componentes, dados, traduções, API, estilo ou dependências. O comportamento do site permanece o mesmo.

### Banco de dados

Não há banco neste repositório. Nenhuma alteração.

### Breaking changes

Nenhuma.

### Migrações

Nenhuma.
