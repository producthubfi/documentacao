# HubFi DS · Componentes

Documentação viva do design system HubFi, puxada do Figma [DS · Components](https://www.figma.com/design/XGEdsV9rlBKYZLz3UwoqYV).

## Abrir

Com o XAMPP ligado:

[http://localhost/hubfi-components/](http://localhost/hubfi-components/)

Navegação por hash, por exemplo `/hubfi-components/#/button`.

## O que está em código

Todos os componentes do arquivo Figma, com variantes:

Search, Input, Textarea, Select, Checkbox, Radio, Switch, Label, Upload, Button, Chip, Select Button, Alert, Badge, Toast, Tooltip, Progress, Skeleton, Accordion, Breadcrumb, Tabs, Pagination, Header, Sidebar, Stepper, Dropdown Menu, Modal, Dialog, Popover, Sheet, Avatar, Card, Card Select, Card File, Table, List Item, Separator, Slider, Operations, Section, Rich Text Editor.

Tokens em `css/tokens.css`. Componentes em `css/hf.css`. Docs em `css/docs.css` + `js/catalog.js`.

### Sync recente (Figma → código)

- **Badge** — tamanho `small` (20px, 10px Medium) além do default 26px. Cores de success e alert nos tokens (`--primary-50` / `--warning-subtle`).
- **Table** — átomos alinhados ao Figma (Avatar, Text ± ícone, Contact 1/2 linhas, Header ± sort, Action, Status Badge). Tabela Default com 6 colunas + ação, Empresa como texto, coluna “Conteúdo”, empty state e paginação.
- **Detalhes da operação** — sidebar, header/timeline e content no mesmo fundo `--neutral/50` (`#fcfcfc`). Cards continuam brancos.

Ver `/#/badge`, `/#/table` e `/#/detalhes-operacao`.

## Conta Figma usada

`lucasaugusto@hubfi.com.br` (time Hubfi, seat Full).
