# Redesign v2 — Rascunho de conteúdo

Rascunho escrito em 2026-11-14.

**Currículo atualizado (2026-11-14):** o autor está na Autoglass desde 10/2025 (Full Stack, Vitória/ES: Angular, C#, .NET, SQL, migração de versões .NET). A Águia Branca vai de 03/2025 a 10/2025. O PDF em `public/curriculo/` foi trocado por essa versão, e a seção 3 abaixo ficou desatualizada: valem `src/data/experiencia.ts` e `messages/`.

**Decisões do autor (2026-11-14):** frase do hero A; Sobre aprovado, sem citar a AG Custom e sem o curso; só as três experiências de desenvolvimento; TypeScript na stack; GitHub `Rudio1`. Isso já entrou em `messages/`. Os campos ⚠ “Problema” e ✍ “Papel” e “Resultados” dos projetos **não** entraram: aguardam o autor.

**Fontes usadas:**
- **[CV]**: `public/curriculo/Curriculo - Rudio.pdf`
- **[JSON]**: os textos atuais de `messages/pt.json`
- **[DATA]**: `src/data/projetos.ts`
- **[SITE]**: o que os sites publicados mostram, visto em 2026-11-14

**Marcações:**
- **⚠ CONFIRMAR**: inferência minha ou dado que nenhuma fonte traz. Só entra no site com o seu ok.
- **✍ PREENCHER**: só você sabe. Se ficar em branco, o bloco não aparece no site.

---

## 1. Hero

| Campo | PT | EN |
| --- | --- | --- |
| Rótulo (mono) | Full Stack Developer · Espírito Santo, Brasil | Full Stack Developer · Espírito Santo, Brazil |
| Nome | Guilherme Rudio | Guilherme Rudio |
| CTA 1 | Ver projetos | View projects |
| CTA 2 | Entrar em contato | Get in touch |
| Indicador de rolagem | Rolar | Scroll |

**Frase de posicionamento.** Escolha uma das três:

- **A (recomendada)**
  - PT: Desenvolvo sistemas web de ponta a ponta: da modelagem do banco à interface, passando por APIs, integrações e deploy.
  - EN: I build web systems end to end: from database modeling to the interface, through APIs, integrations and deployment.
- **B**
  - PT: Construo APIs, interfaces e integrações para sistemas que rodam em produção, com React, Next.js, .NET e PHP.
  - EN: I build APIs, interfaces and integrations for systems that run in production, with React, Next.js, .NET and PHP.
- **C**
  - PT: Full stack com foco no que sustenta o produto: APIs seguras, dados bem modelados e interfaces claras.
  - EN: Full stack developer focused on what keeps a product running: secure APIs, well-modeled data and clear interfaces.

Base: o resumo de skills do [CV].

---

## 2. Sobre

**Título:** Sobre / About

**PT**

> Trabalho com desenvolvimento de software desde 2022, quando comecei como estagiário backend em PHP e Laravel. Hoje sou desenvolvedor full stack no Grupo Águia Branca, em Vitória, onde desenvolvo e mantenho sistemas com React, Next.js, PHP e C#.
>
> Meu trabalho fica entre a interface e o dado: APIs REST versionadas, autenticação com OAuth e JWT, controle de permissões, integração com serviços de terceiros, queries otimizadas e pipelines de CI/CD que levam tudo isso para produção.
>
> Passei também pela sustentação (N3), atendendo chamados de sistemas em uso. Foi ali que aprendi a escrever código pensando em quem vai mantê-lo depois.

**EN**

> I've been working in software development since 2022, when I started as a backend intern with PHP and Laravel. Today I'm a full stack developer at Grupo Águia Branca, in Vitória, Brazil, where I build and maintain systems with React, Next.js, PHP and C#.
>
> My work sits between the interface and the data: versioned REST APIs, OAuth and JWT authentication, permission control, third-party integrations, optimized queries and CI/CD pipelines that take all of it to production.
>
> I also worked on N3 support, handling tickets for systems in use. That's where I learned to write code with the next maintainer in mind.

**Fatos rápidos (linha mono abaixo do texto):**

| PT | EN |
| --- | --- |
| Desde 2022 | Since 2022 |
| Full Stack · Grupo Águia Branca | Full Stack · Grupo Águia Branca |
| Formação · Universidade Centro Leste, 2024 | Education · Universidade Centro Leste, 2024 |
| Inglês · KNN Idiomas | English · KNN Idiomas |

- ⚠ CONFIRMAR: o currículo não diz o curso feito na UCL. Qual é?
- ⚠ CONFIRMAR: quer citar a relação com a AG Custom (os domínios `agcustom.com.br` e `clinical.agcustom.com.br` sugerem uma)? Se sim, em uma frase.

---

## 3. Experiência

Todas as entradas vêm do [CV]. Proposta de layout: as três de desenvolvimento em destaque e as duas primeiras compactas, sob “Início”.

### Grupo Águia Branca — Desenvolvedor Full Stack
**03/2025 — atual · Vitória/ES**

- **PT:** Desenvolvimento e manutenção de sistemas com React, Next.js, PHP e C#. APIs REST, integração entre sistemas internos e externos, autenticação (OAuth, JWT), controle de permissões e versionamento de APIs. Code review, Git Flow e CI/CD com Azure DevOps. Landing pages responsivas e acessíveis.
- **EN:** Building and maintaining systems with React, Next.js, PHP and C#. REST APIs, internal and external system integration, authentication (OAuth, JWT), permission control and API versioning. Code review, Git Flow and CI/CD with Azure DevOps. Responsive, accessible landing pages.

### Trinks — Desenvolvedor Full Stack Jr
**06/2023 — 03/2025 · Remoto / Remote**

- **PT:** Novas funcionalidades e manutenção de aplicações em produção com JavaScript e .NET. Construção e evolução de APIs REST, extração de dados e otimização de queries. Code review, merge, CI/CD e Git Flow no time.
- **EN:** New features and maintenance of production applications with JavaScript and .NET. Building and evolving REST APIs, data extraction and query optimization. Code review, merges, CI/CD and Git Flow within the team.

### Code and App — Estagiário Backend / Backend Intern
**08/2022 — 06/2023 · Vitória/ES**

- **PT:** Funcionalidades e manutenção em PHP e Laravel com bancos SQL. Sustentação N3: atendimento e resolução de chamados técnicos. Time ágil com Scrum.
- **EN:** Features and maintenance in PHP and Laravel with SQL databases. N3 support: handling and resolving technical tickets. Agile team using Scrum.

### Universidade Centro Leste — Mentor de Programação / Programming Mentor
**08/2022 — 12/2022 · Serra/ES**

- **PT:** Apoio a alunos em lógica de programação.
- **EN:** Supported students with programming logic.

### Grupo Coutinho — Estagiário de Sistemas / Systems Intern
**12/2021 — 08/2022 · Serra/ES**

- **PT:** Levantamento de requisitos, documentação de projetos, protótipos e fluxogramas. Automação de processos com UiPath.
- **EN:** Requirements analysis, project documentation, prototypes and flowcharts. Process automation with UiPath.

⚠ CONFIRMAR: entram as cinco (recomendado, com as duas últimas compactas) ou só as três de desenvolvimento?

---

## 4. Stack

Sem porcentagem e sem nível. Os nomes das tecnologias não se traduzem; só os títulos das categorias.

| Categoria (PT / EN) | Tecnologias | Fonte |
| --- | --- | --- |
| Backend | C# / .NET, PHP / Laravel, APIs REST, OAuth, JWT | [CV] |
| Frontend | React, Next.js, Vue.js, JavaScript, TypeScript, CSS | [CV], [DATA], este repositório (TypeScript) |
| Banco de dados / Databases | SQL Server, MySQL, PostgreSQL, Redis | [CV] |
| Cloud | Azure App Service, Azure DevOps, AWS S3, AWS Lambda | [CV] |
| Ferramentas e infra / Tools & infra | Git, Git Flow, GitHub Actions, CI/CD, Vite, Scrum | [CV], [DATA] |

- ⚠ CONFIRMAR: TypeScript não aparece no currículo, mas este portfólio é escrito nele. Mantenho?
- UiPath ficou fora (é de 2021/22). Volta se você quiser.

---

## 5. Projetos selecionados

**Achado:** as imagens atuais de AgroPulse e AG Clinical (`public/agropulse.png`, `public/ag-clinical.png`) são **telas de login**, e os dois sites publicados também abrem no login. Para um case de destaque, o ideal são 1 ou 2 capturas de telas internas, com dados fictícios ou borrados. ✍ PREENCHER se for possível.

### 01 · AgroPulse

| Campo | PT | EN |
| --- | --- | --- |
| Tipo | Sistema web · Gestão agrícola | Web system · Farm management |
| Descrição [JSON] | Sistema de gestão agrícola integrada. Reúne empresas, unidades e operações, com indicadores para decisão no dia a dia do campo. | Integrated farm management system. Brings companies, units and operations together, with indicators for day-to-day decisions in the field. |
| Problema ⚠ | Operações com várias empresas e unidades tendem a ter dados espalhados. O AgroPulse concentra tudo em um só lugar para apoiar a decisão. | Operations spread across several companies and units tend to have scattered data. AgroPulse brings it into one place to support decisions. |
| Funcionalidades [SITE] | Gestão integrada de empresas, unidades e operações · Indicadores para decisão · Fluxos pensados para a rotina do campo | Integrated management of companies, units and operations · Decision indicators · Workflows designed for field routines |
| Papel ✍ | | |
| Resultados ✍ | | |
| Stack ⚠ | Hoje em [DATA]: Next.js, React, CSS, JavaScript. É um sistema com login: qual é o backend e o banco? | |
| Link | agropulse.net.br (abre no login) | |

O problema ⚠ é derivado do texto do produto (“do campo à decisão, dados confiáveis, em um só lugar”). Confirme ou reescreva.

### 02 · VAE Mobility

| Campo | PT | EN |
| --- | --- | --- |
| Tipo | Site institucional e catálogo | Company website and catalog |
| Descrição [JSON] | Site da VAE Mobility para apresentar motocicletas e triciclos elétricos, com catálogo de modelos e atendimento pelo WhatsApp. | VAE Mobility website presenting electric motorcycles and tricycles, with a model catalog and WhatsApp support. |
| Problema ⚠ | A VAE precisava apresentar a linha de veículos elétricos e levar quem tem interesse direto ao atendimento. | VAE needed to present its electric vehicle line and take interested buyers straight to a sales conversation. |
| Funcionalidades [SITE] | Catálogo por categoria (motocicletas e triciclos) · Modelos em destaque com preço ou “consulte” · Ficha técnica por modelo (motor, bateria, autonomia) · Pedido de orçamento e contato pelo WhatsApp · Perguntas frequentes | Catalog by category (motorcycles and tricycles) · Featured models with price or “on request” · Spec sheet per model (motor, battery, range) · Quote requests and WhatsApp contact · FAQ |
| Papel ✍ | | |
| Resultados ✍ | | |
| Stack ⚠ | Hoje em [DATA]: Next.js, React, .NET Core, SQL Server. O catálogo vem de uma API .NET? Existe painel administrativo? | |
| Link | vaemobility.com.br | |

### 03 · AG Clinical

| Campo | PT | EN |
| --- | --- | --- |
| Tipo | Plataforma SaaS · Gestão de clínicas | SaaS platform · Clinic management |
| Descrição [JSON] | Plataforma para gerenciar a clínica, com agenda, prontuário eletrônico do paciente e financeiro ligado à operação. | Clinic management platform with scheduling, electronic patient records and finances tied to operations. |
| Problema ⚠ | Clínicas costumam dividir agenda, prontuário e financeiro entre ferramentas diferentes. A plataforma junta os três. | Clinics often split scheduling, records and finances across different tools. The platform brings the three together. |
| Funcionalidades [SITE] | Agenda e agendamentos integrados · Prontuário eletrônico do paciente · Financeiro conectado à operação · Cadastro aberto e convite de membros por e-mail | Integrated scheduling · Electronic patient records · Finances tied to operations · Open sign-up and member invites by email |
| Papel ✍ | | |
| Resultados ✍ | | |
| Stack ⚠ | Hoje em [DATA]: Vue, Vite (tipo `fullstack`). Qual é o backend e o banco? | |
| Link | clinical.agcustom.com.br (abre no login) | |

**Para cada projeto, o “Papel” precisa responder:**
- foi sozinho ou em time?
- o que foi seu: front, back, banco, infra, design?
- foi projeto para cliente, produto próprio ou da AG Custom?

**Exemplos de “Resultado” que valem, se forem verdadeiros:**
- “em produção desde 2025”
- “usado por N clínicas”
- “substituiu planilhas em X unidades”

Se não houver número verificável, o bloco não aparece.

---

## 6. Contato

| Campo | PT | EN |
| --- | --- | --- |
| Rótulo | Contato | Contact |
| Título | Vamos construir algo que funcione de verdade. | Let's build something that actually works. |
| Texto | Tem um sistema para tirar do papel, uma API para integrar ou uma vaga para alguém full stack? Me chame por um dos canais abaixo ou deixe seu telefone que eu retorno. | Have a system to get off the ground, an API to integrate or a full stack role to fill? Reach me through one of the channels below, or leave your phone number and I'll get back to you. |
| Botão do formulário | Deixar meu telefone | Leave my phone number |

**Canais:**

| Canal | Valor | Fonte |
| --- | --- | --- |
| E-mail | guilhermerudio6@gmail.com | [CV] |
| LinkedIn | linkedin.com/in/guilherme-rudio-790939164 | [CV] |
| GitHub | github.com/Rudio1 | ⚠ CONFIRMAR (deduzido de um link em [DATA]) |
| Currículo | `/curriculo/Curriculo - Rudio.pdf` | já existe |

---

## 7. Footer

| PT | EN |
| --- | --- |
| © 2026 Guilherme Rudio | © 2026 Guilherme Rudio |
| Feito com Next.js e TypeScript | Built with Next.js and TypeScript |
| Voltar ao topo | Back to top |

O ano é calculado no código, não fica escrito no texto.

---

## Resumo do que preciso de você

1. Qual frase do hero: A, B ou C (ou ajustes)?
2. Ok nos textos do Sobre? Qual curso na UCL? Cita a AG Custom?
3. Cinco experiências ou três?
4. TypeScript na stack?
5. GitHub: `Rudio1`?
6. Para os três projetos: papel, resultados, stack completa e, se possível, capturas internas. Confirme também os campos “Problema” ⚠.

Os itens 1 a 5 bastam para começar a Fase 3. Os cases podem entrar com Descrição e Funcionalidades e ganhar Papel e Resultados quando você mandar.
