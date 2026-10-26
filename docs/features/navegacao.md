# Navegação

## Objetivo

Header fixo com marca, links, contato e idioma, nas variantes desktop e mobile.

## Onde está

- `src/components/Header.tsx`
- `src/components/Header.module.css`
- Inclusão global: `src/app/layout.tsx`
- Compensação do header fixo: `body { padding-top: 70px }` em `src/app/globals.css`

## Fluxo

`menuItems` é um array local:

| `key` | `href` | Texto |
| --- | --- | --- |
| `about` | `/` | `navigation.about` |
| `projects` | `/projetos` | `navigation.projects` |

O botão de contato não é item desse array. Usa `navigation.contact` e abre o modal.

Desktop usa `next/link` para href sem `.pdf`. Há um ramo `item.href.includes('.pdf')` que renderiza `<a target="_blank">`. Nenhum item atual contém `.pdf`. O currículo não está no menu; está nos CTAs da home e de projetos.

Mobile repete os mesmos itens, fecha o menu ao navegar ou ao abrir o contato, e troca idioma na própria lista.

## Comportamento de interação

- Menu mobile aberto: `Escape` fecha menu e dropdown; `document.body.style.overflow` fica `hidden`. Ao fechar, volta para `unset`.
- Overlay clique fecha o menu.
- Dropdown de idioma: clique fora do elemento com a classe `languageDropdown` fecha o painel. A dependência do efeito é só `isLanguageDropdownOpen`.
- Troca de idioma chama `changeLocale` e fecha o dropdown. No mobile, também fecha o menu.
- Logo `Rudio` aponta para `/` com `next/link`.

## Entradas e saídas

Entrada: cliques e tecla Escape. Saída: navegação client-side, modal de contato, `localStorage.locale`.

Não há indicação de rota ativa no código do Header. NÃO IDENTIFICADO se alguma classe CSS marca o link atual; o TSX não usa `usePathname`.

## Dependências

`TranslationContext`, `ContactModal`, `lucide-react` (`Menu`, `X`, `ChevronDown`), imagens das bandeiras.

## Observações

O Header é Client Component importado por um Server Component (`layout.tsx`). Esse arranjo já é o do Next.js para componentes com estado e deve permanecer: o provider e o Header ficam no layout para existirem em todas as rotas.
