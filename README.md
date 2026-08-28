# HubFi DS · Componentes

Documentação viva do design system HubFi, puxada do Figma [DS · Components](https://www.figma.com/design/XGEdsV9rlBKYZLz3UwoqYV).

## Abrir

Com o XAMPP ligado:

[http://localhost/hubfi-components/](http://localhost/hubfi-components/)

Navegação por hash, por exemplo `/hubfi-components/#/button`.

Protótipo da extensão (Itaú + spec dos 5 bancos):

- [http://localhost/hubfi-components/extensao/](http://localhost/hubfi-components/extensao/)
- [http://localhost/hubfi-components/extensao/spec.html](http://localhost/hubfi-components/extensao/spec.html)

## O que está em código

Todos os componentes do arquivo Figma, com variantes:

Search, Input, Textarea, Select, Checkbox, Radio, Switch, Label, Upload, Button, Chip, Select Button, Alert, Badge, Toast, Tooltip, Progress, Skeleton, Accordion, Breadcrumb, Tabs, Pagination, Header, Sidebar, Stepper, Dropdown Menu, Modal, Dialog, Popover, Sheet, Avatar, Card, Card Select, Card File, Table, List Item, Separator, Slider, Operations, Section, Rich Text Editor.

Tokens em `css/tokens.css`. Componentes em `css/hf.css`. Docs em `css/docs.css` + `js/catalog.js`.

### Sync recente (Figma → código)

- **Badge** — tamanho `small` (20px, 10px Medium) além do default 26px. Cores de success e alert nos tokens (`--primary-50` / `--warning-subtle`).
- **Table** — átomos alinhados ao Figma (Avatar, Text ± ícone, Contact 1/2 linhas, Header ± sort, Action, Status Badge). Tabela Default com 6 colunas + ação, Empresa como texto, coluna “Conteúdo”, empty state e paginação.
- **Detalhes da operação** — sidebar e content em `--neutral/50` (`#fcfcfc`). Hero (`.docs-screen__top`) branco. Cards brancos.
- **Dashboard de operações** — tela executiva com filtros, KPIs, funil de etapas, conversão e gráficos.
- **Abertura de operação** — documento como identidade, ficha única por empresa, reaproveitamento entre colegas. Ver também `/#/cadastro-cliente`, `/#/edicao-cliente` e `/#/link-publico`.
- **Unicidade de cliente** — cadastro bloqueia e importa ficha da empresa; edição com trava após formalização e auditoria; link público pede documento primeiro.

Ver `/#/badge`, `/#/table`, `/#/abertura-operacao`, `/#/cadastro-cliente`, `/#/edicao-cliente`, `/#/link-publico`, `/#/detalhes-operacao` e `/#/dashboard-operacoes`.

## Conta Figma usada

`lucasaugusto@hubfi.com.br` (time Hubfi, seat Full).
