# HubFi Design System

Contrato visual da plataforma HubFi. Use **somente** estes tokens, componentes e regras. Não invente cor, fonte, raio ou sombra. Se faltar um valor, pergunte — não improvise.

Produto: antecipação de recebíveis B2B (fintech). Público: operações, crédito e clientes PJ. Tom: claro, preciso, sem floreio.

Fonte canônica: Figma [DS · Components](https://www.figma.com/design/XGEdsV9rlBKYZLz3UwoqYV) + [DS · Foundations](https://www.figma.com/design/oeQ6gsy0oaYES95JjT4q9Q). Código: `css/tokens.css` + `css/hf.css`.

---

## Obrigatório

- Fonte: **Outfit** (400 / 500 / 600). Nunca Inter, Geist, Sora, Plus Jakarta, serif ou mono.
- Marca: teal **#00A396**. CTA primário sempre neste teal, texto branco.
- Fundo da app: branco `#FFFFFF` ou cinza `#F5F5F5` / `#FCFCFC`. Nunca cream, off-white quente, dark mode.
- Cantos: 8 / 10 / 12 / 16 px. Botão 8px. Card 12px. Chip/badge pílula.
- Sem gradiente. Sem glassmorphism. Sem sombra pesada. Sem numbered markers 01/02/03.
- Copy em português do Brasil, sentence case. Botão descreve a ação: "Salvar", "Abrir operação".

---

## Cores

Use o hex abaixo. Não derive tons novos.

### Primary (marca)

| Token | Hex | Uso |
|---|---|---|
| `--primary-50` | `#ECFBF9` | fundo success / badge success |
| `--primary-subtle` | `#D9F5F1` | botão secondary, highlights leves |
| `--primary-lighter` | `#EBFFFD` | fundos muito claros |
| `--primary-400` | `#2FC0B1` | hover de borda, borda success |
| `--primary-brand` | `#00A396` | CTA, focus ring, marca |
| `--primary-default` | `#00A395` | equivalente de marca em componentes |
| `--primary-hover` | `#008A7E` | hover do primary, texto do secondary |
| `--primary-800` | `#005C54` | texto teal escuro |
| `--primary-900` | `#003D38` | raríssimo |

### Neutral / superfície

| Token | Hex | Uso |
|---|---|---|
| `--neutral-0` / `--background-default` | `#FFFFFF` | cards, campos, header |
| `--background-subtle` | `#F5F5F5` | fundo de página, hover ghost |
| `--studio` | `#F3F4F4` | canvas / área de trabalho |
| `--neutral-150` | `#EAECEC` | item ativo da sidebar, switch off |
| `--neutral-100` | `#E0E1E1` | borda ghost, disabled bg |
| `--border-default` / `--border-field` | `#E3E3E3` | borda de card, input, chip |
| `--border-subtle` | `#F5F5F5` | divisores leves |
| `--neutral-300` | `#B6B9B9` | placeholder |
| `--neutral-400` | `#A1A5A5` | ícone muted |
| `--neutral-500` | `#808080` | apoio |
| `--neutral-600` | `#5C5C5C` | texto terciário |
| `--neutral-800` | `#282A2A` | texto em ghost/outline |
| `--neutral-900` | `#141515` | botão dark |

### Texto

| Token | Hex | Uso |
|---|---|---|
| `--text-primary` | `#141414` | títulos e corpo |
| `--text-secondary` | `#A8A8A8` | descrição, meta |
| `--text-muted` | `#CCCCCC` | suffix, disabled copy |
| `--text-inverse` | `#FFFFFF` | texto em teal/dark |
| `--text-error` | `#DE3535` | erro |
| `--text-required` | `#FB2C36` | asterisco de obrigatório |

### Feedback

| Token | Hex | Uso |
|---|---|---|
| `--success` | `#0DAF9F` | sucesso (próximo do teal) |
| `--success-subtle` | `#CCF5EF` | fundo success |
| `--warning` | `#E7B008` | alerta |
| `--warning-subtle` | `#FFF8DB` | fundo warning |
| `--error` | `#DE3535` | erro |
| `--error-dark` | `#AF1D1D` | erro hover |
| `--error-subtle` | `#FAE0E0` | fundo error |
| `--info` | `#3672E2` | informação |
| `--info-subtle` | `#E4ECFB` | fundo info |

---

## Tipografia

Família: `"Outfit", system-ui, sans-serif`.

| Estilo | Size / line / weight | Uso |
|---|---|---|
| Display | 36 / 1.15 / 500, tracking −0.03em | hero de tela, raríssimo |
| Title | 24 / 1.5 / 600 | título de página |
| Heading | 18 / 1.3 / 500 | seção |
| Body 16 | 16 / 1.5 / 400 | lead, card title |
| Body 14 | 14 / 1.45 / 400 | corpo padrão |
| Label | 14 / 1.45 / 500 | label de campo, botão |
| Caption | 12 / 1.5 / 400 | helper, meta, badge |

Botão: 14px / 600 (lg) ou 12px / 600 (sm, xs).

---

## Geometria

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 8px | botão, checkbox, slot interno |
| `--radius-md` | 10px | search, input control |
| `--radius-lg` | 12px | card, card-select, modal |
| `--radius-xl` | 16px | sheets / containers grandes |
| `--radius-full` | 999px | switch, avatar, pílula |

Espaçamento: escala de 4px. Gaps comuns: 4, 8, 12, 16, 24.

Elevação: card = `inset 0 0 0 1px #E3E3E3` + `0 1px 1.5px rgba(0,0,0,0.05)`. Nada além disso. Sem drop-shadow 24px, sem glow teal.

Focus: outline 2px solid `#00A396`, offset 2px.

---

## Layout de produto

App desktop, não landing.

- **Header** branco, 56–64px, logo à esquerda, ações à direita (ghost + primary).
- **Sidebar** ~240px, fundo branco; item ativo em `--neutral-150`. Ícone 20px + label 14px.
- **Content** fundo `--neutral-50` / `#FCFCFC` ou `--background-subtle`. Cards brancos em cima.
- **Hero / top da tela** branco, breadcrumb 14px, título 24 Semibold, ações à direita.
- Densidade alta: tabelas, filtros, KPIs. Não use hero full-bleed nem ilustração decorativa.
- Grid: conteúdo ~1200–1440, padding de página 24.

---

## Componentes

Nomeie pelo DS. Não recrie com outro visual.

### Button

Variantes: `primary` · `secondary` · `ghost`/`outline` · `dark`.
Tamanhos: `lg` 36× padding 8/16 · `sm` 34 · `xs` 24 · `icon` 40×40.
Primary: bg `#00A396`, texto branco, hover `#008A7E`, radius 8, weight 600.
Secondary: bg `#D9F5F1`, borda `#008A7E`, texto `#008A7E`. Hover vira primary.
Ghost: branco, borda `#E0E1E1`, texto `#282A2A`. Hover bg `#F5F5F5`.
Disabled: opacity 0.24.
Máximo 1 primary por grupo de ações.

### Field (input / textarea / select)

Label 14 Medium + asterisco `#FB2C36` se obrigatório.
Control: height ~40, radius 10, borda `#E3E3E3`, fundo branco.
Focus: borda `#00A396`. Placeholder `#B6B9B9`. Error: borda `#EB8484`.
Helper 12 abaixo do campo. Gap label→control: 8.

### Search

Height 40, radius 10, ícone 16 à esquerda, borda `#E3E3E3`, focus teal.

### Card

Radius 12, padding 24, gap 16, fundo branco, borda inset `#E3E3E3`. Título 16/600, corpo 14 cinza `#A8A8A8`.

### Badge / Chip

Height 26 (small 20), pílula, 12 Medium. Success = teal claro, não verde genérico. Warning = amarelo, error = vermelho, info = azul `#3672E2`.

### Table

Header sortável 14 Medium. Células: texto, avatar+nome, contato 1/2 linhas, status badge, ação icon. Empty state com ícone + copy + CTA. Paginação no rodapé.

### Alert / Toast

Fundo subtle da cor semântica + ícone + texto 14. Sem barra lateral grossa estilo Material.

### Modal / Dialog / Sheet

Overlay leve, painel branco radius 12–16, header com título + X, footer ghost à esquerda / primary à direita.

### Tabs, Stepper, Accordion, Breadcrumb, Pagination, Sidebar, Header, Avatar, Switch, Checkbox, Radio, Tooltip, Progress, Skeleton, Dropdown, Popover, Slider, Upload, List item, Separator

Existem no DS. Reproduza o padrão HubFi (leve, 8–12 radius, teal só no ativo/CTA), não o de outro kit.

---

## Proibido (o Claude Design cai nisto)

- Inter, Geist, Sora, Plus Jakarta Sans, serif display, mono.
- Cream `#F4F1EA`, terracotta, acid green, fundo preto com um neon.
- Gradiente no botão ou no hero.
- Border-radius 0 (jornal) ou 24px+ (app consumer).
- Sombras grandes, blur, glass, noise, mesh gradient.
- Numeração 01 / 02 / 03 como decoração.
- Verde "success" diferente do teal HubFi (`#22C55E` etc.).
- Dark mode, a menos que o brief peça explicitamente.
- Inglês na UI. Landing de marketing no lugar de tela de produto.

---

## Prompt de sessão

Cole no início de cada projeto no Claude Design:

> Siga o HubFi Design System anexado (DESIGN.md). Toda tela é produto B2B, Outfit, teal #00A396, cards brancos radius 12, botões radius 8. Não invente tokens. Se precisar de um componente, use os nomes do DS (Button primary/ghost, Field, Card, Table, Badge, Sidebar, Header).
