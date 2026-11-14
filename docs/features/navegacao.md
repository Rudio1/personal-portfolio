# Navegação

## Objetivo

Header fixo com marca, links, contato e idioma, nas variantes desktop e mobile.

## Onde está

- `src/components/Header.tsx`
- `src/components/Header.module.css`
- Inclusão global: `src/app/layout.tsx`
- Compensação do header fixo: `body { padding-top: 104px }` no desktop e `80px` abaixo de 768px, em `src/app/globals.css`.

## Fluxo

`menuItems` é um array local:

| `key` | `href` | Texto |
| --- | --- | --- |
| `aboutMe` | `/#sobre` | `navigation.aboutMe` |
| `projects` | `/#projetos` | `navigation.projects` |
| `experience` | `/#experiencia` | `navigation.experience` |
| `stack` | `/#stack` | `navigation.stack` |

Os links levam às seções da home. Em `/projetos`, o mesmo link volta para a home na seção certa.

O botão de contato não é item desse array. Usa `navigation.contact` e abre o modal.

Desktop usa `next/link`. O currículo não está no menu; está nos CTAs da home e de projetos.

Só “Projetos” fica ativo (`aria-current="page"` e sublinhado), e só em `/projetos`. A marcação da seção visível na home é da fase 4. O Header usa `usePathname`.

Mobile repete os mesmos itens, fecha o menu ao navegar ou ao abrir o contato, e troca idioma na própria lista. Ao abrir, o foco vai para o primeiro link do painel.

Há um skip link para `#conteudo` antes do header.

## Comportamento de interação

- Menu mobile aberto: `Escape` fecha menu e dropdown. `document.body.style.overflow` fica `hidden` enquanto o menu está aberto e não há diálogo. Ao fechar o menu para abrir o contato, o overflow não é zerado por cima do modal.
- Overlay clique fecha o menu.
- Dropdown de idioma: clique fora do elemento com a classe `languageDropdown` fecha o painel. A dependência do efeito é só `isLanguageDropdownOpen`.
- Troca de idioma chama `changeLocale` e fecha o dropdown. No mobile, também fecha o menu.
- Logo `Rudio` aponta para `/` com `next/link`. `navigation.about` (Início / Home) não é mais usado no menu e continua nos JSON.
- Um sentinela `#scroll-sentinel` no layout sai do viewport no scroll. O header observa isso e deixa o fundo mais opaco, sem mudar a altura de 64px e sem listener de `scroll`. No mobile o `backdrop-filter` continua desligado.

## Entradas e saídas

Entrada: cliques, Tab e tecla Escape. Saída: navegação client-side, modal de contato, `localStorage.locale`.

O link de projetos fica marcado em `/projetos`.

## Dependências

`TranslationContext`, `ContactModal`, `lucide-react` (`Menu`, `X`, `ChevronDown`), imagens das bandeiras.

## Observações

O Header é Client Component importado por um Server Component (`layout.tsx`). Esse arranjo já é o do Next.js para componentes com estado e deve permanecer: o provider e o Header ficam no layout para existirem em todas as rotas.
