(function (global) {
  var ICON = "assets/icons/search.svg";
  var FIGMA = "https://www.figma.com/design/XGEdsV9rlBKYZLz3UwoqYV?node-id=";

  function ico(name, size) {
    return window.hfIcon ? window.hfIcon(name, size || 20) : "";
  }

  function card(title, desc, inner) {
    if (title === "Especificação") return "";
    var usage = title === "Exemplo de uso";
    return (
      '<section class="' +
      (usage ? "docs-usage" : "docs-board") +
      '"><div class="docs-board__copy">' +
      (usage ? '<span class="docs-usage__kicker">Plataforma</span>' : "") +
      '<h2 class="docs-h2">' +
      title +
      "</h2>" +
      (desc ? '<p class="docs-board__desc">' + desc + "</p>" : "") +
      "</div>" +
      inner +
      "</section>"
    );
  }

  function preview(html, extra) {
    return '<div class="docs-preview' + (extra ? " " + extra : "") + '">' + html + "</div>";
  }

  function cell(label, html) {
    return '<div class="docs-cell"><p class="docs-meta">' + label + "</p>" + html + "</div>";
  }

  function spec(rows) {
    return (
      '<table class="docs-table"><thead><tr><th>Token / regra</th><th>Valor</th></tr></thead><tbody>' +
      rows
        .map(function (r) {
          return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>";
        })
        .join("") +
      "</tbody></table>"
    );
  }

  function searchField(value, placeholder) {
    var extra = value
      ? ' value="' + value + '"'
      : ' placeholder="' + (placeholder || "Procurar por clientes...") + '"';
    return (
      '<label class="hf-search"><span class="hf-search__icon" aria-hidden="true"><img src="' +
      ICON +
      '" width="13.333" height="13.333" alt=""></span><input class="hf-search__field" type="search"' +
      extra +
      "></label>"
    );
  }

  function slider(value) {
    return (
      '<input class="hf-slider" type="range" min="0" max="100" value="' +
      value +
      '" style="--hf-slider-fill:' +
      value +
      '%">'
    );
  }

  function tblSort(label, sortable) {
    if (sortable === false) {
      return '<span class="hf-sort hf-sort--plain">' + label + "</span>";
    }
    return (
      '<button class="hf-sort" type="button">' +
      label +
      '<img src="assets/icons/tbl-sort.svg" alt=""></button>'
    );
  }

  function tblText(text, withIcon) {
    if (withIcon) {
      return (
        '<span class="hf-cell hf-cell--text"><i class="hf-cell__ico" aria-hidden="true"></i>' +
        '<span class="hf-cell__text">' +
        text +
        "</span></span>"
      );
    }
    return '<span class="hf-cell__text">' + text + "</span>";
  }

  function tblStatus(variant, label) {
    return (
      '<span class="hf-tbl-status hf-tbl-status--' +
      variant +
      '"><i class="hf-tbl-status__dot" aria-hidden="true"></i>' +
      label +
      "</span>"
    );
  }

  function tblUser(name, role) {
    return (
      '<div class="hf-cell"><span class="hf-avatar hf-avatar--sm"></span>' +
      '<span class="hf-cell__stack"><span class="hf-cell__name">' +
      name +
      "</span>" +
      (role ? '<span class="hf-cell__sub">' + role + "</span>" : "") +
      "</span></div>"
    );
  }

  function tblContact(phone, email) {
    var lines = "";
    if (phone) {
      lines += '<span class="hf-cell__line"><i></i>' + phone + "</span>";
    }
    if (email) {
      lines += '<span class="hf-cell__line"><i></i>' + email + "</span>";
    }
    var one = !(phone && email);
    return (
      '<div class="hf-cell hf-cell--contact' +
      (one ? " hf-cell--contact-one" : "") +
      '">' +
      lines +
      "</div>"
    );
  }

  function tblCompany(name, sub) {
    return (
      '<div class="hf-cell hf-cell--company"><span class="hf-cell__name">' +
      name +
      '</span><span class="hf-cell__hint">' +
      sub +
      "</span></div>"
    );
  }

  function tblTrend(value, pct, desc) {
    return (
      '<div class="hf-cell hf-cell--trend"><span class="hf-cell--trend__row"><span class="hf-cell__name">' +
      value +
      "</span>" +
      badge("success", pct, true) +
      '</span><span class="hf-cell__hint">' +
      desc +
      "</span></div>"
    );
  }

  function tblBank(name, desc) {
    return (
      '<div class="hf-cell hf-cell--bank"><span class="hf-cell--bank__row"><img class="hf-cell--bank__ico" src="assets/icons/tbl-bank.svg" width="24" height="24" alt="">' +
      '<span class="hf-cell__name">' +
      name +
      '</span></span><span class="hf-cell__hint">' +
      desc +
      "</span></div>"
    );
  }

  function tblAct(style) {
    if (style === "text") {
      return '<button class="hf-table__act hf-table__act--text" type="button">Ação</button>';
    }
    if (style === "icon-text") {
      return '<button class="hf-table__act hf-table__act--icon-text" type="button"><i class="hf-table__act-ico" aria-hidden="true"></i>Ação</button>';
    }
    return '<button class="hf-table__act" type="button" aria-label="Mais ações"><img src="assets/icons/tbl-dots.svg" alt=""></button>';
  }

  function tblPagerBtn(name, label, disabled) {
    return (
      '<button type="button"' +
      (disabled ? " disabled" : "") +
      ' aria-label="' +
      label +
      '"><img src="assets/icons/tbl-page-' +
      name +
      '.svg" width="16" height="16" alt=""></button>'
    );
  }

  function tblToolbar(placeholder) {
    return (
      '<div class="hf-table-toolbar">' +
      searchField("", placeholder || "Procurar por usuários...") +
      '<button class="hf-table-toolbar__filter" type="button" aria-label="Filtrar"><img src="assets/icons/tbl-filter.svg" width="16" height="16" alt=""></button></div>'
    );
  }

  function tblFoot(page, pages, perPage) {
    var empty = pages === 0;
    return (
      '<div class="hf-table-foot"><span class="hf-table-foot__group">Itens por página' +
      '<span class="hf-table-foot__select">' +
      perPage +
      '<img src="assets/icons/select-chevron-16.svg" alt=""></span></span>' +
      '<span class="hf-table-foot__group">Página ' +
      page +
      " de " +
      pages +
      '<span class="hf-pager hf-pager--arrows">' +
      tblPagerBtn("first", "Primeira", empty || page <= 1) +
      tblPagerBtn("prev", "Anterior", empty || page <= 1) +
      tblPagerBtn("next", "Próxima", empty || page >= pages) +
      tblPagerBtn("last", "Última", empty || page >= pages) +
      "</span></span></div>"
    );
  }

  function tblHead() {
    return (
      "<thead><tr><th>" +
      tblSort("Usuário") +
      "</th><th>" +
      tblSort("Contato") +
      "</th><th>" +
      tblSort("Empresa") +
      "</th><th>" +
      tblSort("Data de criação") +
      "</th><th>" +
      tblSort("Último acesso") +
      "</th><th>" +
      tblSort("Coluna") +
      '</th><th class="hf-table__act-col"></th></tr></thead>'
    );
  }

  function usersTable() {
    var rows = [
      ["testinhonildo@gmail.com QA", "Convidado da Empresa", "11999998888", "testinhonildo@gmail.com", "Tech Finance", "21/07/2026 17:51", "Nunca acessou"],
      ["T", "Convidado da Empresa", "+5511999999999", "t@t.com", "Tech Finance", "21/07/2026 17:50", "Nunca acessou"],
      ["Marina Spíndola", "Administrador da Empresa", "(81) 99115-6938", "marinaspindola@gmail.com", "Barão Select", "20/07/2026 14:29", "Nunca acessou"],
      ["Teste 2", "Personal Finance", "(81) 99999-9999", "teste2@email.com", "Tech Finance", "02/07/2026 10:15", "Nunca acessou"],
      ["João Victor", "Administrador da Empresa", "(81) 99757-1429", "joao.leao@empreenderdinheiro.com.br", "Tech Finance", "25/06/2026 15:24", "21/07/2026 17:35"],
      ["Lucas Andrade", "Administrador da Empresa", "(81) 99815-4710", "lab@empreenderdinheiro.com.br", "Tech Finance", "25/06/2026 15:24", "25/06/2026 15:28"],
      ["Maurício Personal", "Personal Finance", "(81) 98593-9388", "jmauriciolm38@gmail.com", "Tech Finance", "20/04/2026 14:58", "23/07/2026 15:22"],
    ];
    var body = rows
      .map(function (r) {
        return (
          "<tr><td>" +
          tblUser(r[0], r[1]) +
          "</td><td>" +
          tblContact(r[2], r[3]) +
          "</td><td>" +
          tblText(r[4]) +
          "</td><td>" +
          tblText(r[5]) +
          "</td><td>" +
          tblText(r[6]) +
          "</td><td>" +
          tblText("Conteúdo") +
          '</td><td class="hf-table__act-col">' +
          tblAct() +
          "</td></tr>"
        );
      })
      .join("");
    return (
      '<div class="hf-table-wrap">' +
      tblToolbar() +
      '<div class="hf-table-body"><table class="hf-table">' +
      tblHead() +
      "<tbody>" +
      body +
      "</tbody></table></div>" +
      tblFoot(1, 78, 10) +
      "</div>"
    );
  }

  function tableEmpty() {
    return (
      '<div class="hf-table-wrap">' +
      tblToolbar() +
      '<div class="hf-table-body"><table class="hf-table">' +
      tblHead() +
      "</table>" +
      '<div class="hf-table-empty"><span class="hf-table-empty__icon"><img src="assets/icons/tbl-empty.svg" width="40" height="40" alt=""></span>' +
      '<div class="hf-table-empty__copy"><p class="hf-table-empty__title">Nenhum resultado encontrado</p>' +
      '<p class="hf-table-empty__desc">Tente ajustar os filtros ou termos de busca para encontrar o que procura.</p></div>' +
      '<button class="hf-btn hf-btn--lg hf-btn--outline" type="button">Limpar filtros</button></div></div>' +
      tblFoot(0, 0, 0) +
      "</div>"
    );
  }

  function field(opts) {
    opts = opts || {};
    var cls = "hf-field" + (opts.mod ? " " + opts.mod : "");
    var req = opts.req ? '<span class="hf-field__req">*</span>' : "";
    var err = opts.error ? '<p class="hf-field__error">' + opts.error + "</p>" : "";
    var dis = opts.disabled ? " disabled" : "";
    var val = opts.value != null ? ' value="' + opts.value + '"' : "";
    var ph = opts.placeholder ? ' placeholder="' + opts.placeholder + '"' : "";
    var suffix = opts.suffix ? '<span class="hf-field__suffix">' + opts.suffix + "</span>" : "";
    var copy = opts.copy
      ? '<button class="hf-field__copy" type="button" aria-label="Copiar"><img src="assets/icons/field-copy.svg" width="18" height="18" alt=""></button>'
      : "";
    var control =
      '<div class="hf-field__control"><input class="hf-field__input" type="text"' +
      ph +
      val +
      dis +
      ">" +
      suffix +
      copy +
      "</div>";
    // Nos estados hover e selected o Figma envolve o campo num anel de foco.
    if (opts.ring) control = '<div class="hf-field__ring">' + control + "</div>";
    var badge = opts.badge ? '<span class="hf-field__badge">' + opts.badge + "</span>" : "";
    var info = opts.info
      ? '<img class="hf-field__info" src="assets/icons/field-info.svg" width="16" height="16" alt="">'
      : "";
    return (
      '<div class="' +
      cls +
      '"><div class="hf-field__header"><div class="hf-field__labelrow"><span class="hf-field__label">' +
      (opts.label || "Label") +
      "</span>" +
      badge +
      "</div>" +
      info +
      req +
      "</div>" +
      control +
      err +
      "</div>"
    );
  }

  function chev(style) {
    var file = style === "primary" ? "chevron-white" : style === "secondary" || style === "dark" ? "chevron-teal" : "chevron-dark";
    return (
      '<span class="hf-btn__ico"><img src="assets/icons/' +
      file +
      '.svg" alt=""></span>'
    );
  }

  function btn(size, style, label, extra) {
    extra = extra || "";
    var inner = label;
    var cls = "";
    if (extra === "both") inner = chev(style) + label + chev(style);
    else if (extra === "left") inner = chev(style) + label;
    else if (extra === "right") inner = label + chev(style);
    else if (extra === "only") {
      inner = chev(style);
      cls = " hf-btn--icon";
    }
    return (
      '<button class="hf-btn hf-btn--' +
      size +
      " hf-btn--" +
      style +
      cls +
      '" type="button">' +
      inner +
      "</button>"
    );
  }

  function chipX() {
    return '<span class="hf-chip__x" aria-hidden="true"><img src="assets/icons/chip-x.svg" alt=""><img src="assets/icons/chip-x2.svg" alt=""></span>';
  }

  // O espaçamento entre rótulo e X vem do gap do flex; texto solto no markup
  // acrescentaria um espaço extra e a largura sairia do padrão do Figma.
  function chip(label, selected) {
    return (
      '<button class="hf-chip' +
      (selected ? " hf-chip--selected" : "") +
      '" type="button" data-chip><span class="hf-chip__label">' +
      label +
      "</span>" +
      chipX() +
      "</button>"
    );
  }

  function crumb() {
    return (
      '<nav class="hf-crumb">' +
      '<span class="hf-crumb__home"><img src="assets/icons/crumb-home.svg" width="20" height="20" alt=""></span>' +
      '<span class="hf-crumb__div"></span>' +
      "<span>Usuários</span>" +
      '<span class="hf-crumb__chev"><img src="assets/icons/crumb-chevron.svg" alt=""></span>' +
      "<span>Usuários</span>" +
      "</nav>"
    );
  }

  function tabBtn(label, active) {
    var src = active ? "tab-icon.svg" : "tab-icon-off.svg";
    return (
      '<button class="hf-tab' +
      (active ? " is-active" : "") +
      '" type="button"><span class="hf-tab__ico"><img src="assets/icons/' +
      src +
      '" alt=""></span>' +
      label +
      "</button>"
    );
  }

  // Cada variante tem o check numa cor: branco sobre o círculo cheio do default,
  // teal escuro no sucesso e vermelho no erro.
  function toastBox(mod, msg) {
    var variant = "";
    var text = "Toast message here.";
    if (mod === "success" || mod === "error" || mod === "default") {
      variant = mod === "default" ? "" : mod;
      if (msg) text = msg;
    } else if (mod) {
      text = mod;
    }
    return (
      '<div class="hf-toast' +
      (variant ? " hf-toast--" + variant : "") +
      '"><span class="hf-toast__ico">' +
      (window.hfIcon ? window.hfIcon("check", 16) : "") +
      '</span><span class="hf-toast__msg">' +
      text +
      "</span>" +
      '<button class="hf-toast__close" type="button" data-alert-close aria-label="Fechar">' +
      (window.hfIcon ? window.hfIcon("x", 10) : "") +
      "</button></div>"
    );
  }

  // O estado visual sai do input nativo (:checked / :indeterminate), então a
  // caixa acompanha o clique do usuário em vez de ficar presa ao HTML inicial.
  function checkBox(state, label) {
    var native = state === "checked" ? " checked" : state === "indeterminate" ? " data-indeterminate" : "";
    var box =
      '<input type="checkbox"' +
      native +
      '><span class="hf-check-box"><img class="hf-check-box__mark" src="assets/icons/select-check.svg" width="10" height="8" alt=""></span>';
    return label
      ? '<label class="hf-check">' + box + "<span>" + label + "</span></label>"
      : '<label class="hf-check" aria-label="' + state + '">' + box + "</label>";
  }

  function radioBtn(name, label, selected) {
    return (
      '<label class="hf-radio"><input type="radio" name="' +
      name +
      '"' +
      (selected ? " checked" : "") +
      '><span class="hf-radio-box"><img class="hf-radio-box__off" src="assets/icons/select-radio.svg" width="18" height="18" alt=""><img class="hf-radio-box__on" src="assets/icons/select-radio-on.svg" width="18" height="18" alt=""></span><span>' +
      label +
      "</span></label>"
    );
  }

  function selectBtnIco() {
    return (
      '<span class="hf-select-btn__icon" aria-hidden="true"><span class="hf-select-btn__glyph">' +
      '<img class="hf-select-btn__p1" src="assets/icons/select-btn-1.svg" alt="">' +
      '<img class="hf-select-btn__p2" src="assets/icons/select-btn-2.svg" alt="">' +
      '<img class="hf-select-btn__p3" src="assets/icons/select-btn-3.svg" alt="">' +
      "</span></span>"
    );
  }

  function selectBtn(sel) {
    return (
      '<button class="hf-select-btn' +
      (sel ? " is-selected" : "") +
      '" type="button" data-select-btn>' +
      selectBtnIco() +
      "Câmbio</button>"
    );
  }

  function accordion(open) {
    return (
      '<div class="hf-accordion" data-accordion><div class="hf-accordion__item' +
      (open ? " is-open" : "") +
      '"><button class="hf-accordion__trigger" type="button" aria-expanded="' +
      (open ? "true" : "false") +
      '">Accordion item<span class="hf-accordion__spacer"></span><span class="hf-accordion__caret" aria-hidden="true"></span></button><div class="hf-accordion__panel"><p class="hf-accordion__body">Accordion content goes here. This can contain any text or nested components.</p></div></div></div>'
    );
  }

  function alertBox(type, opts) {
    opts = opts || {};
    var icon = opts.noIcon
      ? ""
      : '<img class="hf-alert__icon" src="assets/icons/alert-' + type + '.svg?v=87" width="20" height="20" alt="">';
    var desc = opts.noDesc
      ? ""
      : '<p class="hf-alert__desc">' + (opts.desc || "Alert description message here.") + "</p>";
    var close = opts.noClose
      ? ""
      : '<button class="hf-alert__close" type="button" data-alert-close aria-label="Fechar">✕</button>';
    return (
      '<div class="hf-alert hf-alert--' +
      type +
      '" role="alert">' +
      icon +
      '<div class="hf-alert__body"><p class="hf-alert__title">' +
      (opts.title || "Alert title") +
      "</p>" +
      desc +
      "</div>" +
      close +
      "</div>"
    );
  }

  function badge(type, text, withIcon, size) {
    var sm = size === "sm" || size === "small";
    var ico = withIcon
      ? '<span class="hf-badge__ico"><img src="assets/icons/badge-info-' + type + '.svg" alt=""></span>'
      : "";
    var cls =
      "hf-badge hf-badge--" +
      type +
      (sm ? " hf-badge--sm" : "") +
      (text ? "" : " hf-badge--dot");
    if (!text) {
      return '<span class="' + cls + '"></span>';
    }
    return '<span class="' + cls + '">' + text + ico + "</span>";
  }

  var SELECT_OPTIONS = [
    "Backoffice de Empresa",
    "Gestor de Empresa",
    "Administrador",
    "Backoffice",
    "Administrador de Empresa",
    "Personal Finance",
    "Convidado da Empresa",
  ];

  var selectRadioSeq = 0;

  function selectSearch() {
    return '<div class="hf-select-menu__search">' + searchField() + "</div>";
  }

  function selectSep() {
    return '<hr class="hf-select-menu__sep">';
  }

  function selectItemText(label, selected) {
    return (
      '<div class="hf-select-menu__item' +
      (selected ? " is-active" : "") +
      '" role="option" tabindex="-1" data-label="' +
      label +
      '" aria-selected="' +
      (selected ? "true" : "false") +
      '">' +
      label +
      "</div>"
    );
  }

  function selectItemCheck(label, selected) {
    return (
      '<div class="hf-select-menu__item hf-select-menu__item--check' +
      (selected ? " is-active" : "") +
      '" role="option" tabindex="-1" data-label="' +
      label +
      '" aria-selected="' +
      (selected ? "true" : "false") +
      '"><input type="checkbox"' +
      (selected ? " checked" : "") +
      '><span class="hf-select-menu__box" aria-hidden="true"><img src="assets/icons/select-check.svg" width="10" height="8" alt=""></span><span class="hf-select-menu__text">' +
      label +
      "</span></div>"
    );
  }

  function selectItemRadio(label, selected, name) {
    return (
      '<div class="hf-select-menu__item hf-select-menu__item--radio' +
      (selected ? " is-active" : "") +
      '" role="option" tabindex="-1" data-label="' +
      label +
      '" aria-selected="' +
      (selected ? "true" : "false") +
      '"><input type="radio" name="' +
      name +
      '"' +
      (selected ? " checked" : "") +
      '><span class="hf-select-menu__dot" aria-hidden="true"><img class="hf-select-menu__dot-off" src="assets/icons/select-radio.svg" width="18" height="18" alt=""><img class="hf-select-menu__dot-on" src="assets/icons/select-radio-on.svg" width="18" height="18" alt=""></span><span class="hf-select-menu__text">' +
      label +
      "</span></div>"
    );
  }

  function selectMenu(opts) {
    opts = typeof opts === "string" ? { selected: opts } : opts || {};
    var type = opts.type || "default";
    var selected = opts.selected || "";
    var html =
      '<div class="hf-select-menu' +
      (type === "dropdown" ? " hf-select-menu--static" : "") +
      '" role="listbox">' +
      selectSearch();
    if (type === "dropdown") {
      return (
        html +
        selectItemText("Opção", false) +
        selectItemText("Opção", false) +
        selectItemText("Opção", false) +
        selectSep() +
        selectItemCheck("Opção", true) +
        selectItemCheck("Opção", false) +
        selectSep() +
        selectItemRadio("Opção", true, "dd-radio") +
        selectItemRadio("Opção", false, "dd-radio") +
        "</div>"
      );
    }
    var name = "sel-" + type + "-" + ++selectRadioSeq;
    for (var i = 0; i < SELECT_OPTIONS.length; i++) {
      var isOn =
        type === "checkbox"
          ? !!opts.filled && i === 0
          : selected
            ? SELECT_OPTIONS[i] === selected
            : type === "default" && i === 0;
      if (type === "checkbox") html += selectItemCheck(SELECT_OPTIONS[i], isOn);
      else if (type === "radio") html += selectItemRadio(SELECT_OPTIONS[i], isOn, name);
      else html += selectItemText(SELECT_OPTIONS[i], isOn);
    }
    return html + "</div>";
  }

  // O select do Figma não é o <select> nativo: o campo é um gatilho e a lista é
  // um popover próprio. A variante Open da documentação fica congelada, com a
  // lista no fluxo, exatamente como o frame de spec.
  function selectField(opts) {
    opts = opts || {};
    var type = opts.type || "default";
    var cls = "hf-field hf-field--select" + (opts.mod ? " " + opts.mod : "");
    var value = opts.filled ? "Estado Civil" : "Selecione";
    var valueCls = "hf-field__value" + (opts.filled ? "" : " hf-field__value--placeholder");
    return (
      '<div class="' +
      cls +
      '"' +
      (opts.open || opts.frozen ? "" : " data-select") +
      ' data-select-type="' +
      type +
      '"><div class="hf-field__header"><span class="hf-field__label">' +
      (opts.label || "Label inicial") +
      '</span><span class="hf-field__req">*</span></div>' +
      '<button class="hf-field__control" type="button" role="combobox" aria-haspopup="listbox" aria-expanded="' +
      (opts.open ? "true" : "false") +
      '"' +
      (opts.disabled ? " disabled" : "") +
      '><span class="' +
      valueCls +
      '">' +
      value +
      '</span><span class="hf-field__chevron"><img src="assets/icons/select-chevron.svg" alt=""></span></button>' +
      (opts.error ? '<p class="hf-field__error">Campo obrigatório</p>' : "") +
      selectMenu({
        type: type,
        selected: opts.filled && type === "default" ? "Estado Civil" : "",
        filled: opts.filled,
      }) +
      "</div>"
    );
  }

  function textArea(opts) {
    opts = opts || {};
    return (
      '<div class="hf-field hf-field--area' +
      (opts.disabled ? " hf-field--disabled" : "") +
      '"><div class="hf-field__header"><span class="hf-field__label">' +
      (opts.label || "Label") +
      '</span></div><div class="hf-field__control hf-field__control--area"><textarea class="hf-field__area" placeholder="Digite um texto..."' +
      (opts.disabled ? " disabled" : "") +
      ">" +
      (opts.value || "") +
      "</textarea></div></div>"
    );
  }

  function dropzone(state) {
    state = state || "default";
    var copy = {
      default: ["Clique para enviar ou arraste e solte", "PDF, DOC, PNG ou JPG · até 10MB"],
      hover: ["Clique para enviar ou arraste e solte", "PDF, DOC, PNG ou JPG · até 10MB"],
      dragover: ["Solte para enviar", "PDF, DOC, PNG ou JPG · até 10MB"],
      uploading: ["Enviando arquivo…", "Aguarde, isso pode levar alguns segundos."],
      success: ["Arquivo enviado com sucesso", "Clique para enviar outro arquivo."],
      error: ["Falha no envio do arquivo", "Tente novamente ou escolha outro arquivo."],
      disabled: ["Upload indisponível", "Esse campo está bloqueado no momento."],
    }[state];
    // default, hover, dragover e disabled compartilham a seta; os demais estados
    // trocam o glifo. A seta vem em duas cores para o hover funcionar em CSS.
    var glyph = {
      uploading: '<img src="assets/icons/up-loader.svg" width="20" height="20" alt="">',
      success: '<img src="assets/icons/up-check.svg" width="20" height="20" alt="">',
      error: '<img src="assets/icons/up-alert.svg" width="20" height="20" alt="">',
      disabled: '<img src="assets/icons/up-arrow-off.svg" width="20" height="20" alt="">',
    }[state] ||
      '<img class="hf-dropzone__ico-off" src="assets/icons/up-arrow.svg" width="20" height="20" alt="">' +
        '<img class="hf-dropzone__ico-on" src="assets/icons/up-arrow-on.svg" width="20" height="20" alt="">';

    return (
      '<button class="hf-dropzone" type="button" data-state="' +
      state +
      '"' +
      (state === "disabled" ? " disabled" : "") +
      '><span class="hf-dropzone__icon">' +
      glyph +
      '</span><span class="hf-dropzone__text"><span class="hf-dropzone__title">' +
      copy[0] +
      '</span><span class="hf-dropzone__hint">' +
      copy[1] +
      "</span></span></button>"
    );
  }

  function fileItem(state) {
    state = state || "uploading";
    var name = state === "upload" ? "Clique para enviar ou arraste e solte" : "relatorio-financeiro-q3-2025.pdf";
    var meta = {
      uploading: "2.4 MB de 5.2 MB · 45%",
      success: "5.2 MB · Enviado",
      error: "Falha no envio · Arquivo excede 10MB",
      upload: "PDF, DOC, PNG ou JPG · até 10MB",
    }[state];
    var glyph = {
      uploading: "up-file",
      success: "up-file-ok",
      error: "up-item-alert",
      upload: "up-cloud",
    }[state];
    var bar = state === "uploading" ? '<span class="hf-file__bar"><span style="width:45%"></span></span>' : "";
    var action =
      state === "upload"
        ? ""
        : '<button class="hf-file__act" type="button" aria-label="' +
          (state === "error" ? "Tentar novamente" : "Remover arquivo") +
          '"><img src="assets/icons/' +
          (state === "error" ? "up-retry" : "up-close") +
          '.svg" width="16" height="16" alt=""></button>';

    return (
      '<div class="hf-file" data-state="' +
      state +
      '"><span class="hf-file__icon"><img src="assets/icons/' +
      glyph +
      '.svg" width="20" height="20" alt=""></span>' +
      '<span class="hf-file__info"><span class="hf-file__name">' +
      name +
      '</span><span class="hf-file__meta">' +
      meta +
      "</span>" +
      bar +
      "</span>" +
      action +
      "</div>"
    );
  }

  function closeX(cls) {
    return (
      '<button class="' +
      (cls || "hf-modal__close") +
      '" type="button" data-modal-close aria-label="Fechar">✕</button>'
    );
  }

  function importIco() {
    return '<span class="hf-btn__glyph"><img src="assets/icons/header-import.svg" alt=""></span>';
  }

  function plusIco() {
    return (
      '<span class="hf-btn__plus" aria-hidden="true"><img src="assets/icons/plus-h.svg" alt=""><img src="assets/icons/plus-v.svg" alt=""></span>'
    );
  }

  function cardFile(state, name, opts) {
    opts = opts || {};
    name = name || "extrato_jan.pdf";
    var showAlert = opts.showAlert !== false;
    var badge =
      state === "default" || showAlert
        ? '<span class="hf-card-file__badge" aria-hidden="true"><i class="hf-card-file__mark"></i></span>'
        : "";
    var act =
      state === "default"
        ? ""
        : '<button class="hf-card-file__act" type="button" aria-label="Abrir"><i class="hf-card-file__act-ico"></i></button>';
    return (
      '<div class="hf-card-file hf-card-file--' +
      state +
      '"><i class="hf-card-file__ico" aria-hidden="true"></i>' +
      '<span class="hf-card-file__info"><span class="hf-card-file__name">' +
      name +
      '</span><span class="hf-card-file__meta">5MB - 13/04/2026 09:35</span></span>' +
      badge +
      act +
      "</div>"
    );
  }

  function cardComments(opts) {
    opts = opts || {};
    var variant = opts.variant || "public";
    var populated = variant === "populated" || !!opts.value;
    var value = opts.value || (populated ? "Olá! Preciso revisar este ponto antes de publicar." : "");
    var channel = variant === "hubfi" ? "lock" : "globe";
    var hoverIcon = variant === "hover-icon";
    var visIcon = hoverIcon
      ? '<span class="hf-card-comments__vis-slot" aria-hidden="true"></span>'
      : ico(channel, variant === "hubfi" ? 16 : 18);
    return (
      '<div class="hf-card-comments hf-card-comments--' +
      variant +
      (populated ? " is-filled" : "") +
      '">' +
      '<button class="hf-card-comments__help" type="button" aria-label="Como formatar comentários">' +
      ico("circle-question-mark", 20) +
      "</button>" +
      '<div class="hf-card-comments__box">' +
      '<span class="hf-card-comments__msg" aria-hidden="true">' +
      ico("message-square", 20) +
      "</span>" +
      '<input class="hf-card-comments__field" type="text" placeholder="Adicionar novo comentário"' +
      (value ? ' value="' + value + '"' : "") +
      ' aria-label="Comentário">' +
      '<button class="hf-card-comments__vis" type="button" aria-label="Visibilidade">' +
      visIcon +
      ico("chevron-down", 16) +
      "</button>" +
      '<button class="hf-card-comments__send" type="button" aria-label="Enviar" disabled>' +
      ico("send", 16) +
      "</button></div>" +
      '<div class="hf-card-comments__privacy">' +
      ico("message-square", 16) +
      '<button class="hf-switch" type="button" data-switch aria-pressed="false" aria-label="Comentário interno"></button>' +
      ico("lock", 16) +
      "</div></div>"
    );
  }

  function navIco(name) {
    return '<img src="assets/icons/' + name + '.svg" width="18" height="18" alt="">';
  }

  function navItem(icon, label, opts) {
    opts = opts || {};
    return (
      '<a class="hf-app-nav__item' +
      (opts.active ? " is-active" : "") +
      '" href="#">' +
      navIco(icon) +
      "<span>" +
      label +
      "</span>" +
      (opts.more
        ? '<span class="hf-app-nav__more"><img src="assets/icons/nav-chevron.svg" width="18" height="18" alt=""></span>'
        : "") +
      "</a>"
    );
  }

  function navGroup(label, items) {
    return (
      '<div class="hf-app-nav__group"><p class="hf-app-nav__group-label">' +
      label +
      '</p><div class="hf-app-nav__list">' +
      items.join("") +
      "</div></div>"
    );
  }

  function appSidebar(variant, mod) {
    var backoffice = variant === "backoffice";
    var nova = variant === "nova";
    var clientes = variant === "clientes";
    return (
      '<div class="hf-app-nav' +
      (mod ? " hf-app-nav--" + mod : "") +
      '"><nav class="hf-app-nav__panel">' +
      '<div class="hf-app-nav__brand">' +
      '<div class="hf-app-nav__logo"><img src="assets/logos/h-color-light.svg" width="109" height="27" alt="hubfi"></div>' +
      '<div class="hf-app-nav__ctx">' +
      '<span class="hf-app-nav__ctx-ico"><img src="assets/icons/nav-company.svg" width="20" height="20" alt=""></span>' +
      '<span class="hf-app-nav__ctx-text"><small>Contexto da Empresa</small><strong>Todas as empresas</strong></span>' +
      '<img src="assets/icons/nav-swap.svg" width="16" height="16" alt="">' +
      "</div></div>" +
      '<div class="hf-app-nav__scroll">' +
      navGroup("Rotina", [
        navItem("nav-plus", "Nova Operação", { active: nova }),
        navItem("nav-ops", "Operações", { active: !backoffice && !nova && !clientes }),
        navItem("nav-panel", "Painel de Produtos")
      ]) +
      navGroup("Gestão", [
        navItem("nav-clients", "Clientes", { active: clientes }),
        navItem("nav-users", "Usuários", { more: true })
      ]) +
      navGroup("Administração Interna", [
        navItem("nav-grid", "Backoffice", { active: backoffice }),
        navItem("nav-products", "Gestão de Produtos", { more: true }),
        navItem("nav-building", "Empresas")
      ]) +
      '<div class="hf-app-nav__promo-wrap"><div class="hf-app-nav__promo">' +
      "<p>Portal do<br>Personal Finance</p>" +
      "</div></div></div>" +
      '<div class="hf-app-nav__foot"><div class="hf-app-nav__user">' +
      '<span class="hf-app-nav__avatar"><span>LA</span></span>' +
      '<span class="hf-app-nav__who"><strong>Lucas Augusto</strong><span>lucasaugusto@hubfi.com.br</span></span>' +
      '<img src="assets/icons/nav-user-swap.svg" width="16" height="16" alt="">' +
      "</div></div></nav></div>"
    );
  }

  function headerDefault(opts) {
    opts = opts || {};
    var actions = "";
    if (!opts.noLine) {
      actions +=
        '<button class="hf-btn hf-btn--lg hf-btn--ghost" type="button">' +
        importIco() +
        "Importar Usuários</button>";
    }
    if (!opts.noPrimary) {
      actions +=
        '<button class="hf-btn hf-btn--lg hf-btn--primary" type="button">' +
        plusIco() +
        "Novo Usuário</button>";
    }
    return (
      '<header class="hf-header"><div class="hf-header__titles">' +
      '<h1 class="hf-header__title">Usuários</h1>' +
      '<p class="hf-header__sub">Gerencie seus usuários e suas permissões</p></div>' +
      '<div class="hf-header__actions">' +
      actions +
      "</div></header>"
    );
  }

  function metaBlock(icon, label, extraIcon) {
    return (
      '<div class="hf-header__meta">' +
      '<span class="hf-header__ico"><img src="assets/icons/' + icon + '.svg" alt=""></span>' +
      "<span" +
      (icon === "hd-money" ? ' class="is-value"' : "") +
      ">" +
      label +
      "</span>" +
      (extraIcon
        ? '<span class="hf-header__ico"><img src="assets/icons/' + extraIcon + '.svg" alt=""></span>'
        : "") +
      "</div>"
    );
  }

  function miniBtn(icon, label, extra) {
    return (
      '<button class="hf-btn hf-header__act' +
      (extra ? " " + extra : "") +
      '" type="button">' +
      '<span class="hf-btn__glyph"><img src="assets/icons/' +
      icon +
      '.svg?v=89" width="16" height="16" alt=""></span>' +
      label +
      "</button>"
    );
  }

  function headerInterna() {
    return (
      '<header class="hf-header hf-header--tall">' +
      '<div class="hf-header__line"><div class="hf-header__op">' +
      '<span class="hf-header__op-kind">Financiamento Imobiliário - Portabilidade</span>' +
      '<i class="hf-header__rule" style="height:20px"></i>' +
      '<span class="hf-header__op-id">OP-002939</span>' +
      '<img src="assets/icons/hd-copy.svg" alt="Copiar código">' +
      "</div>" +
      '<div class="hf-header__actions">' +
      '<div class="hf-header__group">' +
      miniBtn("hd-check", "Ganho") +
      miniBtn("hd-x", "Perdido") +
      "</div>" +
      '<i class="hf-header__rule" style="height:20px"></i>' +
      miniBtn("hd-info", "Mais informações", "hf-header__act--more") +
      "</div></div>" +
      '<h1 class="hf-header__title">Teste Daily</h1>' +
      '<div class="hf-header__chips">' +
      metaBlock("hd-money", "R$ 0,00") +
      '<i class="hf-header__rule" style="height:24px"></i>' +
      metaBlock("hd-user", "Maurício Lima", "hd-chat") +
      '<i class="hf-header__rule" style="height:24px"></i>' +
      metaBlock("hd-building", "Minha Empresa LTDA") +
      '<i class="hf-header__rule" style="height:24px"></i>' +
      metaBlock("hd-bell", "Time Hubfi Automatizado") +
      "</div></header>"
    );
  }

  function step(status, label, opts) {
    opts = opts || {};
    var time =
      opts.time != null
        ? opts.time
        : status === "current"
          ? "21h 54m"
          : status === "done"
            ? "<1m"
            : "99d 99h";
    var mark =
      status === "done"
        ? '<img class="hf-step__check" src="assets/icons/step-check.svg" width="18" height="18" alt="">'
        : '<span class="hf-step__dot"></span>';
    return (
      '<div class="hf-step is-' +
      status +
      '"><span class="hf-step__time">' +
      time +
      '</span><span class="hf-step__track"><i class="hf-step__line hf-step__line--before"></i>' +
      '<span class="hf-step__mark">' +
      mark +
      '</span><i class="hf-step__line hf-step__line--after"></i></span>' +
      '<span class="hf-step__label">' +
      label +
      "</span></div>"
    );
  }

  var STEPPER_V2 = [
    ["Simulação de Crédito", "done", "<1m"],
    ["Formulário Proposta", "done", "2m"],
    ["Análise de Crédito", "done", "41d 6h"],
    ["Proposta de Crédito", "done", "99d 99h"],
    ["Escolha da Instituição", "current", "21h 54m"],
    ["Documentação das Partes", "todo", "99d 99h"],
    ["Avaliação do Imóvel", "todo", "99d 99h"],
    ["Análise Jurídica", "todo", "99d 99h"],
    ["Elaboração Contrato", "todo", "99d 99h"],
    ["Assinatura Contrato", "todo", "99d 99h"],
    ["Registro Cartório", "todo", "99d 99h"],
    ["Liberação Recurso", "todo", "99d 99h"],
  ];

  function stepper(activeIndex, labels) {
    var items = labels || [
      "Perfil do cliente",
      "Mapa de Operações",
      "Produto",
      "Comunicação",
      "Informações",
    ];
    var active = activeIndex === undefined ? 0 : activeIndex;
    return (
      '<div class="hf-stepper">' +
      items
        .map(function (label, i) {
          return step(i === active ? "current" : i < active ? "done" : "todo", label);
        })
        .join("") +
      "</div>"
    );
  }

  function stepSimple(status, label) {
    return (
      '<div class="hf-step-s is-' +
      status +
      '"><span class="hf-step-s__track"><i class="hf-step-s__line hf-step-s__line--before"></i>' +
      '<span class="hf-step-s__dot"></span>' +
      '<i class="hf-step-s__line hf-step-s__line--after"></i></span>' +
      '<span class="hf-step-s__label">' +
      label +
      "</span></div>"
    );
  }

  function stepperSimple(activeIndex) {
    var items = [
      "Perfil do cliente",
      "Mapa de Operações",
      "Produto",
      "Comunicação",
      "Informações",
    ];
    var active = activeIndex === undefined ? 0 : activeIndex;
    return (
      '<div class="hf-stepper-s">' +
      items
        .map(function (label, i) {
          return stepSimple(
            i === active ? "current" : i < active ? "done" : "todo",
            label
          );
        })
        .join("") +
      "</div>"
    );
  }

  function stepperV2() {
    return (
      '<div class="hf-stepper">' +
      STEPPER_V2.map(function (row) {
        return step(row[1], row[0], { time: row[2] });
      }).join("") +
      "</div>"
    );
  }

  function dropdownMenu() {
    return (
      '<div class="hf-dropdown"><button type="button">Editar</button><button type="button">Duplicar</button>' +
      '<button type="button">Favoritar</button><hr class="hf-dropdown__sep">' +
      '<button class="hf-dropdown__danger" type="button">Excluir</button></div>'
    );
  }

  function modalBox(opts) {
    opts = opts || {};
    var close = opts.noClose ? "" : closeX("hf-modal__close");
    var desc = opts.noDesc
      ? ""
      : '<p class="hf-modal__desc">' + (opts.desc || "Modal description or instructions.") + "</p>";
    // A variante de confirmação alinha os botões à direita e dispensa o divisor do topo.
    var confirm = !!opts.confirm;
    var foot = opts.noFooter
      ? ""
      : '<div class="hf-modal__foot' +
        (confirm ? " hf-modal__foot--end" : "") +
        '">' +
        btn("lg", "ghost", opts.cancel || "Label") +
        btn("lg", "primary", opts.ok || "Label") +
        "</div>";
    return (
      '<div class="hf-modal' +
      (opts.lg ? " hf-modal--lg" : "") +
      '"><div class="hf-modal__head">' +
      (opts.icon ? '<span class="hf-modal__icon"><img src="assets/icons/' + opts.icon + '.svg" alt=""></span>' : "") +
      '<div class="hf-modal__text"><div class="hf-modal__row"><h3 class="hf-modal__title">' +
      (opts.title || "Modal title") +
      "</h3>" +
      close +
      "</div>" +
      desc +
      "</div></div>" +
      (confirm ? "" : '<hr class="hf-modal__div">') +
      '<div class="hf-modal__body"></div><hr class="hf-modal__div">' +
      foot +
      "</div>"
    );
  }

  function dialogBox() {
    return (
      '<div class="hf-dialog"><div class="hf-dialog__head"><h3 class="hf-dialog__title">Dialog Title</h3>' +
      closeX("hf-dialog__close") +
      '</div><p class="hf-dialog__desc">Dialog description text goes here.</p>' +
      '<div class="hf-dialog__slot">Content slot</div><hr class="hf-dialog__div">' +
      '<div class="hf-dialog__foot">' +
      btn("lg", "ghost", "Cancelar") +
      btn("lg", "primary", "Confirmar") +
      "</div></div>"
    );
  }

  function sheetBox(side) {
    return (
      '<aside class="hf-sheet hf-sheet--' +
      side +
      '"><div class="hf-sheet__head"><h3>Sheet title</h3><span class="hf-sheet__spacer"></span>' +
      closeX("hf-sheet__close") +
      "</div><p>Sheet description or form content.</p>" +
      '<div class="hf-sheet__slot">Content</div></aside>'
    );
  }

  function opCard(mod) {
    return (
      '<article class="hf-op hf-op--' +
      mod +
      '"><div class="hf-op__top"><div class="hf-op__id"><i class="hf-op__dot"></i>OP-002939</div>' +
      '<i class="hf-op__trend"></i></div>' +
      '<p class="hf-op__cat">Financiamento Imobiliário - Portabilidade</p>' +
      '<p class="hf-op__title">Teste Daily</p>' +
      '<div class="hf-op__foot"><p class="hf-op__value">R$ 0,00</p>' +
      '<div class="hf-op__meta"><span class="hf-tag">ML<img src="assets/icons/tag-x.svg" alt=""></span>1h</div>' +
      "</div></article>"
    );
  }

  function opColumn(name, count, sum) {
    return (
      '<div class="hf-op-col"><div class="hf-op-col__top">' +
      '<span class="hf-op-col__name">' +
      name +
      '</span><span class="hf-op-col__count">' +
      count +
      "</span></div>" +
      '<p class="hf-op-col__sum">' +
      sum +
      "</p></div>"
    );
  }

  var groups = [
    {
      id: "form",
      label: "Formulário",
      icon: "text-cursor-input",
      blurb: "Campos, seleção e upload — a base dos fluxos HubFi.",
      items: [
        ["search", "Search"],
        ["input", "Input"],
        ["textarea", "Textarea"],
        ["select", "Select"],
        ["checkbox", "Checkbox"],
        ["radio", "Radio"],
        ["switch", "Switch"],
        ["label", "Label"],
        ["upload", "Upload"],
      ],
    },
    {
      id: "actions",
      label: "Ações",
      icon: "mouse-pointer-click",
      blurb: "Botões e seletores para disparar e confirmar ações.",
      items: [
        ["button", "Button"],
        ["chip", "Chip"],
        ["select-button", "Select Button"],
      ],
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: "message-square",
      blurb: "Alertas, badges e estados para comunicar o que aconteceu.",
      items: [
        ["alert", "Alert"],
        ["badge", "Badge"],
        ["toast", "Toast"],
        ["tooltip", "Tooltip"],
        ["progress", "Progress"],
        ["skeleton", "Skeleton"],
      ],
    },
    {
      id: "nav",
      label: "Navegação",
      icon: "panel-left",
      blurb: "Estrutura da aplicação: header, tabs, sidebar e paginação.",
      items: [
        ["accordion", "Accordion"],
        ["breadcrumb", "Breadcrumb"],
        ["tabs", "Tabs"],
        ["pagination", "Pagination"],
        ["header", "Header"],
        ["sidebar", "Sidebar"],
        ["stepper", "Stepper"],
        ["dropdown-menu", "Dropdown Menu"],
      ],
    },
    {
      id: "overlay",
      label: "Overlay",
      icon: "layers-2",
      blurb: "Modais, dialogs e painéis que ficam acima da página.",
      items: [
        ["modal", "Modal"],
        ["dialog", "Dialog"],
        ["popover", "Popover"],
        ["sheet", "Sheet"],
      ],
    },
    {
      id: "data",
      label: "Dados e layout",
      icon: "table-2",
      blurb: "Cards, tabelas e blocos para organizar conteúdo.",
      items: [
        ["avatar", "Avatar"],
        ["card", "Card"],
        ["card-select", "Card Select"],
        ["card-file", "Card File"],
        ["card-comments", "Card Comments"],
        ["table", "Table"],
        ["list-item", "List Item"],
        ["separator", "Separator"],
        ["slider", "Slider"],
        ["operations", "Operations"],
        ["section", "Section"],
        ["rich-text", "Rich Text Editor"],
      ],
    },
  ];

  var pages = {
    search: {
      title: "Search",
      lead: "Campo de busca com ícone. Variantes default e populated.",
      node: "89-937",
      html: function () {
        return (
          card("Partes de componentes", "Componentes base e átomos de Search", preview(cell("state=default", searchField()) + cell("state=populated", searchField("Caloi Bike Store")))) +
          card("Componente completo e suas variações", "Campo de busca com ícone e ações.", preview(searchField())) +
          card("Exemplo de uso", "Search em uma barra de listagem de clientes.", preview("<strong>Clientes</strong>" + searchField(), "docs-preview--stack")) +
          card("Especificação", "", spec([
            ["Altura", "40px"],
            ["Padding", "16px"],
            ["Gap ícone–texto", "8px"],
            ["Radius", "10px"],
            ["Ícone", "caixa 16×16 · glifo 13.33"],
            ["Fonte", "Outfit Regular 14 / 1.45"],
            ["Placeholder", "<code>--neutral-400 #a1a5a5</code>"],
            ["Borda", "<code>--border-subtle #f5f5f5</code>"],
          ]))
        );
      },
    },
    button: {
      title: "Button",
      lead: "Primary, Ghost, Outline, Secondary, Dark · Large / Small / XSmall · Default, Hover, Disabled, Icon Only. Chevrons sempre apontam para a direita.",
      node: "1-5",
      html: function () {
        return (
          card("Estilos", "", preview(
            cell("Primary", btn("lg", "primary", "Label") + btn("sm", "primary", "Label")) +
            cell("Secondary", btn("lg", "secondary", "Label", "both") + btn("sm", "secondary", "Label", "both")) +
            cell("Ghost", btn("lg", "ghost", "Label") + btn("sm", "ghost", "Label")) +
            cell("Outline", btn("lg", "outline", "Label") + btn("sm", "outline", "Label"))
          )) +
          card("Estados", "", preview(
            cell("Default", btn("lg", "primary", "Label")) +
            cell("Hover", '<button class="hf-btn hf-btn--lg hf-btn--primary" type="button" style="background:#008a7e">Label</button>') +
            cell("Disabled", '<button class="hf-btn hf-btn--lg hf-btn--primary" type="button" disabled>Label</button>') +
            cell("Icon Only", btn("lg", "primary", "", "only"))
          )) +
          card("Tamanhos", "", preview(
            cell("Large", btn("lg", "primary", "Label")) +
            cell("Small", btn("sm", "primary", "Label")) +
            cell("XSmall", btn("xs", "primary", "Label"))
          )) +
          card("Ícones", "", preview(
            cell("Sem ícone", btn("lg", "primary", "Label")) +
            cell("Ícone à esquerda", btn("lg", "primary", "Label", "left")) +
            cell("Ícone à direita", btn("lg", "primary", "Label", "right")) +
            cell("Ambos", btn("lg", "primary", "Label", "both") + btn("lg", "ghost", "Label", "both") + btn("lg", "outline", "Label", "both")) +
            cell("Somente ícone", btn("lg", "primary", "", "only") + btn("lg", "ghost", "", "only") + btn("lg", "outline", "", "only") + btn("sm", "primary", "", "only"))
          )) +
          card("Dark", "", preview(btn("lg", "dark", "Label", "both"))) +
          card("Exemplo de uso", "Ações do header na listagem de clientes.", preview(
            '<div class="docs-scene"><div class="docs-scene__head"><h3>Clientes</h3><div class="hf-header__actions">' +
            btn("lg", "ghost", "Importar") +
            btn("lg", "primary", "Novo cliente", "left") +
            "</div></div></div>"
          ))
        );
      },
    },
    accordion: {
      title: "Accordion",
      lead: "Seções expansíveis. Variantes closed e open. Largura 420px.",
      node: "294-2433",
      html: function () {
        return (
          card("Partes de componentes", "Átomos closed / open", preview(cell("closed", accordion(false)) + cell("open", accordion(true)))) +
          card("Variantes", "Clique para abrir e fechar.", preview(
            cell("closed", accordion(false)) + cell("open", accordion(true))
          )) +
          card("Exemplo de uso", "FAQ ou detalhes de um contrato.", preview("<strong>Perguntas frequentes</strong>" + accordion(false), "docs-preview--stack"))
        );
      },
    },
    input: {
      title: "Input",
      lead: "Campo de texto com label. Default, populated, disabled e error. Selected e hover com anel teal. Campo 38px.",
      node: "5-508",
      html: function () {
        var parts =
          cell("Default", field({ req: true, placeholder: "Placeholder" })) +
          cell("populated", field({ value: "value" })) +
          cell("disabled", field({ value: "value", disabled: true, mod: "hf-field--disabled" })) +
          cell("error", field({ value: "value", mod: "hf-field--error", error: "Texto informando erro" })) +
          cell("selected", field({ value: "value", ring: true })) +
          cell("hover", field({ value: "value", ring: true }));
        var variants =
          cell("Default", field({ req: true, placeholder: "Placeholder" })) +
          cell("populated", field({ value: "value" })) +
          cell("disabled", field({ value: "value", disabled: true, mod: "hf-field--disabled" })) +
          cell("error", field({ value: "value", mod: "hf-field--error", error: "Texto informando erro" }));
        return (
          card("Partes de componentes", "Átomos de Input Text.", preview(parts)) +
          card("Variantes", "As quatro variantes do componente completo.", preview(variants)) +
          card(
            "Opções de visibilidade",
            "Padrão com asterisco de obrigatório. Sem info esconde o ícone ao lado do rótulo.",
            preview(
              cell("Padrão", field({ req: true, placeholder: "Placeholder" })) +
              cell("Sem info", field({ req: true, placeholder: "Placeholder" }))
            )
          ) +
          card("Exemplo de uso", "Input Text em contexto.", preview(field({ req: true, placeholder: "Placeholder" }), "docs-preview--stack"))
        );
      },
    },
    textarea: {
      title: "Textarea",
      lead: "Campo multilinha. 415×131, placeholder Digite um texto...",
      node: "272-265",
      html: function () {
        return (
          card("Partes de componentes", "Átomo de Textarea.", preview(textArea(), "docs-preview--stack")) +
          card("Componente", "Campo de texto multilinha para entrada de texto longo.", preview(textArea(), "docs-preview--stack")) +
          card("Exemplo de uso", "Textarea em contexto.", preview(textArea(), "docs-preview--stack"))
        );
      },
    },
    select: {
      title: "Select",
      lead: "Tipos default, checkbox e radiobutton. Estados Default / Hover / Focus / Disabled / Error / Open × filled. Largura 330px.",
      node: "5-511",
      html: function () {
        var states = function (filled, type) {
          return (
            cell("Default", selectField({ filled: filled, type: type })) +
            cell("Hover", selectField({ filled: filled, type: type, mod: "hf-field--hover" })) +
            cell("Focus", selectField({ filled: filled, type: type, mod: "hf-field--focus" })) +
            cell("Disabled", selectField({ filled: filled, type: type, disabled: true, mod: "hf-field--disabled" })) +
            cell("Error", selectField({ filled: filled, type: type, mod: "hf-field--error", error: true })) +
            cell("Open", selectField({ filled: filled, type: type, open: true, mod: "hf-field--open" }))
          );
        };
        return (
          card("Partes de componentes", "Átomos de Select.", preview(
            cell("Label", '<span class="hf-select-label">Label<span class="hf-select-label__req">*</span></span>') +
            cell(
              "Select Box",
              '<div class="hf-select-box">Selecione<img src="assets/icons/select-chevron-16.svg" width="16" height="16" alt=""></div>'
            ) +
            cell("Helper Text", '<p class="hf-select-helper">Campo obrigatório</p>') +
            cell("Dropdown Item", '<div style="width:298px">' + selectItemText("Opção", false) + selectItemText("Opção", true) + "</div>") +
            cell("Checkbox Item", '<div style="width:298px">' + selectItemCheck("Opção", false) + selectItemCheck("Opção", true) + "</div>") +
            cell("Radio Item", '<div style="width:298px">' + selectItemRadio("Opção", false, "atom-radio") + selectItemRadio("Opção", true, "atom-radio") + "</div>") +
            cell("Separator", '<div style="width:298px">' + selectSep() + "</div>") +
            cell("Search", '<div class="hf-select-menu__search" style="width:298px">' + searchField() + "</div>") +
            cell("Dropdown", selectMenu({ type: "dropdown" }))
          )) +
          card("Type default · filled=false", "Lista com busca e itens de texto.", preview(states(false, "default"))) +
          card("Type default · filled=true", "", preview(states(true, "default"))) +
          card("Type checkbox · filled=false", "Lista com busca e seleção múltipla.", preview(states(false, "checkbox"))) +
          card("Type checkbox · filled=true", "", preview(states(true, "checkbox"))) +
          card("Type radiobutton · filled=false", "Lista com busca e seleção única.", preview(states(false, "radio"))) +
          card("Type radiobutton · filled=true", "", preview(states(true, "radio"))) +
          card("Exemplo de uso", "Select em contexto, aberto.", preview(selectField({ open: true, mod: "hf-field--open" }), "docs-preview--stack"))
        );
      },
    },
    checkbox: {
      title: "Checkbox",
      lead: "unchecked / checked / indeterminate. Caixa 18×18.",
      node: "5-510",
      html: function () {
        return (
          card("Partes de componentes", "Átomos de Checkbox", preview(
            cell("unchecked", checkBox("unchecked")) +
            cell("checked", checkBox("checked")) +
            cell("indeterminate", checkBox("indeterminate"))
          )) +
          card("Variantes", "Clique para marcar e desmarcar.", preview(
            cell("unchecked", checkBox("unchecked", "Label")) +
            cell("checked", checkBox("checked", "Label")) +
            cell("indeterminate", checkBox("indeterminate", "Label"))
          )) +
          card("Exemplo de uso", "Filtro de status na listagem de clientes.", preview(
            '<div class="docs-scene"><p class="docs-scene__label">Exibir</p>' +
            checkBox("checked", "Ativos") +
            checkBox("unchecked", "Inativos") +
            "</div>"
          ))
        );
      },
    },
    radio: {
      title: "Radio",
      lead: "default / selected. ~69×20 com label.",
      node: "294-2426",
      html: function () {
        return (
          card("Partes de componentes", "Átomos de Radio — 69×20 com o rótulo do Figma.", preview(
            cell("default", radioBtn("r1", "Opção", false)) +
            cell("selected", radioBtn("r2", "Opção", true))
          )) +
          card("Variantes", "Clique para selecionar.", preview(
            cell("default", radioBtn("plan", "Anual", false)) +
            cell("selected", radioBtn("plan", "Mensal", true))
          )) +
          card("Exemplo de uso", "Escolha de tipo de cliente no cadastro.", preview(
            '<div class="docs-scene"><p class="docs-scene__label">Tipo</p>' +
            radioBtn("ctype", "Pessoa jurídica", true) +
            radioBtn("ctype", "Pessoa física", false) +
            "</div>"
          ))
        );
      },
    },
    switch: {
      title: "Switch",
      lead: "off #eaecec / on #00a395. 44×24, thumb 20px.",
      node: "294-2425",
      html: function () {
        return (
          card("Partes de componentes", "Átomos de Switch", preview(
            cell("off", '<button class="hf-switch" type="button" data-switch aria-pressed="false" aria-label="Desligado"></button>') +
            cell("on", '<button class="hf-switch is-on" type="button" data-switch aria-pressed="true" aria-label="Ligado"></button>')
          )) +
          card("Variantes", "Clique para alternar.", preview(
            cell("off", '<button class="hf-switch" type="button" data-switch aria-pressed="false" aria-label="Desligado"></button>') +
            cell("on", '<button class="hf-switch is-on" type="button" data-switch aria-pressed="true" aria-label="Ligado"></button>')
          )) +
          card("Exemplo de uso", "Ativar notificações.", preview(
            '<div style="display:flex;align-items:center;gap:12px"><span>Notificações</span><button class="hf-switch is-on" type="button" data-switch aria-pressed="true"></button></div>'
          ))
        );
      },
    },
    label: {
      title: "Label",
      lead: "Rótulo de formulário. 35×100 no Figma (empilhado).",
      node: "294-2430",
      html: function () {
        return (
          card("Partes de componentes", "Átomo de Label", preview('<span class="hf-label">Label</span>')) +
          card("Variantes", "", preview(
            cell("Padrão", '<span class="hf-label">Label</span>') +
            cell("Obrigatório", '<span class="hf-label">Label <span class="hf-field__req">*</span></span>')
          )) +
          card("Exemplo de uso", "Acima de um input.", preview(field({ req: true, placeholder: "Placeholder" }), "docs-preview--stack"))
        );
      },
    },
    upload: {
      title: "Upload",
      lead: "Dropzone 480×150: default, hover, dragover, uploading, success, error, disabled. Item: uploading, success, error, upload.",
      node: "393-586",
      html: function () {
        return (
          card("file-upload-dropzone", "7 estados da área de envio — 480×150. O estado default também reage ao ponteiro.", preview(
            cell("default", dropzone("default")) +
            cell("hover", dropzone("hover")) +
            cell("dragover", dropzone("dragover")) +
            cell("uploading", dropzone("uploading")) +
            cell("success", dropzone("success")) +
            cell("error", dropzone("error")) +
            cell("disabled", dropzone("disabled"))
          )) +
          card("file-upload-item", "Estados do arquivo na lista — 480 de largura.", preview(
            cell("uploading", fileItem("uploading")) +
            cell("success", fileItem("success")) +
            cell("error", fileItem("error")) +
            cell("upload", fileItem("upload"))
          )) +
          card("Exemplo de uso", "Anexos do contrato em um formulário de operação.", preview(
            '<div class="docs-upload">' +
            dropzone("default") +
            '<div class="docs-upload__list">' +
            fileItem("success") +
            fileItem("uploading") +
            fileItem("error") +
            "</div></div>",
            "docs-preview--stack"
          ))
        );
      },
    },
    chip: {
      title: "Chip",
      lead: "default (borda #e3e3e3, texto #141414) / selected (teal, texto branco). 91×40.",
      node: "294-2099",
      html: function () {
        return (
          card("Partes de componentes", "Átomos de Chip", preview(
            cell("default", chip("Label", false)) + cell("selected", chip("Label", true))
          )) +
          card("Variantes", "Clique para selecionar.", preview(
            cell("default", chip("Label", false)) + cell("selected", chip("Label", true))
          )) +
          card("Exemplo de uso", "Filtros rápidos na listagem de clientes.", preview(
            '<div class="docs-scene"><p class="docs-scene__label">Segmento</p>' +
            chip("Ativos", true) +
            chip("PJ", false) +
            chip("SP", false) +
            "</div>"
          ))
        );
      },
    },
    "select-button": {
      title: "Select Button",
      lead: "default / selected. 141×64. Ícone + label Câmbio.",
      node: "586-2769",
      html: function () {
        var item = function (sel) {
          return selectBtn(sel);
        };
        return (
          card("Partes de componentes", "Átomos de Select Button", preview(cell("default", item(false)) + cell("selected", item(true)))) +
          card("Variantes", "Clique para selecionar.", preview(
            cell("default", item(false)) + cell("selected", item(true))
          )) +
          card("Exemplo de uso", "Escolha de produto.", preview(item(true) + item(false)))
        );
      },
    },
    alert: {
      title: "Alert",
      lead: "info, success, warning, error. Fundo sutil, borda 1px no tom 200. Na jornada, entra dentro do card branco (hf-match) com padding 16px.",
      node: "460-892",
      html: function () {
        return (
          card("Tipos", "Cores semânticas do Figma.", preview(
            cell("info", alertBox("info")) +
            cell("success", alertBox("success")) +
            cell("warning", alertBox("warning")) +
            cell("error", alertBox("error"))
          )) +
          card("Opções de visibilidade", "Completo, sem descrição, sem fechar, sem ícone.", preview(
            cell("Completo", alertBox("info")) +
            cell("Sem descrição", alertBox("info", { noDesc: true })) +
            cell("Sem botão fechar", alertBox("success", { noClose: true })) +
            cell("Sem ícone", alertBox("warning", { noIcon: true }))
          )) +
          card("Exemplo de uso", "Na abertura de operação o Alert do DS fica dentro do card branco, com 16px de padding.", preview(
            '<div class="hf-match hf-match--warning">' +
            alertBox("warning", {
              noClose: true,
              title: "Este cliente já possui uma operação em andamento",
              desc: "Mesmo produto na sua imobiliária. Não crie outra. Abra a existente.",
            }) +
            '<div class="hf-match__facts"><div class="hf-kv"><span class="hf-kv__label">Operação</span><span class="hf-kv__value">OP-000000</span></div><div class="hf-kv"><span class="hf-kv__label">Responsável</span><span class="hf-kv__value">Camila Souza</span></div></div>' +
            '<div class="hf-match__acts"><button class="hf-btn hf-btn--sm hf-btn--primary" type="button">Abrir operação</button></div></div>',
            "docs-preview--stack"
          ))
        );
      },
    },
    badge: {
      title: "Badge",
      lead: "primary, secondary, warning, alert, success, outline, information. Default 26px ou small 20px. Dot 20px. Ícone info 12px opcional no tamanho default.",
      node: "294-2650",
      html: function () {
        var types = ["primary", "secondary", "warning", "alert", "success", "outline", "information"];
        return (
          card("Variantes", "Tamanho default, 26px.", preview(types.map(function (t) { return cell(t, badge(t, "Badge")); }).join(""))) +
          card("Small", "Tamanho small, 20px · 10px Medium.", preview(types.map(function (t) { return cell(t, badge(t, "Badge", false, "sm")); }).join(""))) +
          card("Com ícone", "Ícone só no tamanho default.", preview(types.map(function (t) { return cell(t, badge(t, "Badge", true)); }).join(""))) +
          card("Só indicador", "", preview(types.map(function (t) { return cell(t, badge(t)); }).join(""))) +
          card("Exemplo de uso", "Status do cliente na tabela.", preview(
            '<div class="docs-scene docs-scene--row"><span>Caloi Bike Store</span>' +
            badge("success", "Ativo") +
            badge("success", "Ativo", false, "sm") +
            "</div>"
          ))
        );
      },
    },
    toast: {
      title: "Toast",
      lead: "default / success / error. 400×52 (default) e 400×54 (success e error).",
      node: "294-2431",
      html: function () {
        return (
          card("Partes de componentes", "Átomo default, com o fechar no canto.", preview(toastBox())) +
          card("Variantes", "Notificação temporária de feedback. 3 variantes.", preview(
            cell("default", toastBox("default")) +
            cell("success", toastBox("success")) +
            cell("error", toastBox("error")),
            "docs-preview--stack"
          )) +
          card("Exemplo de uso", "Confirmação depois de salvar um cliente.", preview(toastBox("success", "Dados salvos com sucesso.")))
        );
      },
    },
    tooltip: {
      title: "Tooltip",
      lead: "212×34. Fundo #141515, texto branco.",
      node: "5-509",
      html: function () {
        return (
          card("Partes de componentes", "Átomo de Tooltip", preview('<span class="hf-tooltip">Texto do tooltip</span>')) +
          card("Variantes", "", preview('<span class="hf-tooltip">Salvar alterações</span>')) +
          card("Exemplo de uso", "Dica sobre um botão ícone.", preview(btn("icon", "ghost", "?") + '<span class="hf-tooltip">Ajuda</span>'))
        );
      },
    },
    progress: {
      title: "Progress",
      lead: "25 / 50 / 75 / 100. 300×6.",
      node: "294-2102",
      html: function () {
        var bar = function (n) {
          return '<div class="hf-progress" aria-valuenow="' + n + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + n + '%"></span></div>';
        };
        return (
          card("Partes de componentes", "Átomo de Progress", preview(bar(50), "docs-preview--stack")) +
          card("Variantes", "", preview(cell("25%", bar(25)) + cell("50%", bar(50)) + cell("75%", bar(75)) + cell("100%", bar(100)), "docs-preview--stack")) +
          card("Exemplo de uso", "Upload em andamento.", preview(bar(64), "docs-preview--stack"))
        );
      },
    },
    skeleton: {
      title: "Skeleton",
      lead: "text 200×16 / circle 40 / rectangle 300×120.",
      node: "294-2429",
      html: function () {
        return (
          card("Partes de componentes", "Átomos de Skeleton", preview(
            cell("text", '<div class="hf-skel hf-skel--text"></div>') +
            cell("circle", '<div class="hf-skel hf-skel--circle"></div>') +
            cell("rectangle", '<div class="hf-skel hf-skel--rect"></div>')
          )) +
          card("Exemplo de uso", "Placeholder de um card de cliente.", preview(
            '<div class="hf-skel hf-skel--circle"></div><div class="hf-skel hf-skel--text"></div><div class="hf-skel hf-skel--rect"></div>',
            "docs-preview--stack"
          ))
        );
      },
    },
    breadcrumb: {
      title: "Breadcrumb",
      lead: "Ícone home (painel) + divisor + Usuários + chevron + Usuários. Não usa barra /.",
      node: "89-877",
      html: function () {
        var crumbNav = crumb();
        return (
          card("Componente", "", preview(crumbNav)) +
          card("Exemplo de uso", "Navegação no topo da tela de clientes.", preview(
            '<div class="docs-scene">' + crumbNav + "<h3>Usuários</h3></div>"
          ))
        );
      },
    },
    tabs: {
      title: "Tabs",
      lead: "Trigger active/inactive 86×32. Conjuntos de 2 a 5 abas.",
      node: "290-542",
      html: function () {
        function tabs(n, active) {
          var html = '<div class="hf-tabs" data-tabs>';
          for (var i = 0; i < n; i++) {
            html += tabBtn("Tab " + (i + 1), i === active);
          }
          return html + "</div>";
        }
        return (
          card("tabs-trigger", "Átomo da aba — 86×32.", preview(cell("active", tabBtn("Label", true)) + cell("inactive", tabBtn("Label", false)))) +
          card("Componente completo e suas variações", "Conjuntos de 2 a 5 abas.", preview(
            cell("2", tabs(2, 0)) + cell("3", tabs(3, 0)) + cell("4", tabs(4, 0)) + cell("5", tabs(5, 0)),
            "docs-preview--stack"
          )) +
          card("Exemplo de uso", "Abas da ficha do cliente.", preview(tabs(3, 0)))
        );
      },
    },
    pagination: {
      title: "Pagination",
      lead: "Controle de páginas. 248×100 no Figma.",
      node: "294-2432",
      html: function () {
        var pager = '<div class="hf-pager" data-pager><button type="button">‹</button><button class="is-current" type="button">1</button><button type="button">2</button><button type="button">3</button><button type="button">...</button><button type="button">10</button><button type="button">›</button></div>';
        return (
          card("Componente", "", preview(pager)) +
          card("Exemplo de uso", "Rodapé da tabela de clientes.", preview(
            '<div class="docs-scene"><p class="docs-scene__label">124 clientes</p>' + pager + "</div>"
          ))
        );
      },
    },
    header: {
      title: "Header",
      lead: "Default 1123×52 / internas 1123×122. Título teal, ações Importar e Novo Usuário.",
      node: "89-895",
      html: function () {
        var simple = headerDefault();
        var tall = headerInterna();
        var noPrimary =
          '<header class="hf-header"><div><h1 class="hf-header__title">Usuários</h1>' +
          '<p class="hf-header__sub">Gerencie seus usuários e suas permissões</p></div>' +
          '<div class="hf-header__actions"><button class="hf-btn hf-btn--lg hf-btn--ghost" type="button">' +
          importIco() +
          "Importar Usuários</button></div></header>";
        return (
          card("Default", "", preview(simple, "docs-preview--wide")) +
          card("Interna", "", preview(tall, "docs-preview--wide")) +
          card("Sem primary", "", preview(noPrimary, "docs-preview--wide")) +
          card("Exemplo de uso", "Topo da tela de clientes na plataforma.", preview(simple, "docs-preview--wide"))
        );
      },
    },
    sidebar: {
      title: "Sidebar",
      lead: "Navegação lateral do app: frame de 256×1134 com painel interno de 240px recuado 8px. Grupos Rotina, Gestão e Administração Interna.",
      node: "89-216",
      html: function () {
        return (
          card("Operações", "Item ativo em Rotina › Operações.", preview(appSidebar("operacoes"))) +
          card("Backoffice", "Item ativo em Administração Interna › Backoffice.", preview(appSidebar("backoffice"))) +
          card(
            "Exemplo de uso",
            "Shell da plataforma: navegação fixa à esquerda e conteúdo da operação à direita.",
            preview(
              '<div class="docs-appshell">' +
                appSidebar("operacoes", "fit") +
                '<div class="docs-appshell__body">' +
                headerInterna() +
                '<div class="docs-appshell__cards">' +
                opCard("analise") +
                opCard("proposta") +
                "</div></div></div>",
              "docs-preview--wide"
            )
          )
        );
      },
    },
    stepper: {
      title: "Stepper",
      lead: "Trilha simples (5 passos, 120px) e V2 com tempo (12 etapas, 108px).",
      node: "463-1820",
      html: function () {
        return (
          card("Componente", "Passo ativo em teal, demais em cinza. 120px por etapa.", preview(stepperSimple(0), "docs-preview--wide")) +
          card("Estados", "Atual e não iniciado.", preview(
            cell("Atual", stepSimple("current", "Perfil do cliente")) +
            cell("Não iniciado", stepSimple("todo", "Mapa de Operações"))
          )) +
          card("Exemplo de uso", "Onboarding da empresa, no primeiro passo.", preview(
            '<div class="docs-scene"><h3>Cadastro de Minha Empresa LTDA</h3>' +
              stepperSimple(0) +
              "</div>",
            "docs-preview--wide"
          )) +
          card("Stepper V2", "Átomo step-v2: tempo, trilha e rótulo em 108×68.", preview(
            cell("Concluído", step("done", "Simulação de Crédito", { time: "<1m" })) +
            cell("Atual", step("current", "Escolha da Instituição", { time: "21h 54m" })) +
            cell("Não iniciado", step("todo", "Documentação das Partes", { time: "99d 99h" }))
          )) +
          card("Trilha V2", "12 passos de operação com tempo decorrido.", preview(stepperV2(), "docs-preview--wide"))
        );
      },
    },
    "dropdown-menu": {
      title: "Dropdown Menu",
      lead: "Menu de ações. 200×209. Excluir em vermelho.",
      node: "294-2434",
      html: function () {
        return (
          card("Componente", "", preview(dropdownMenu())) +
          card("Exemplo de uso", "Menu de ações na linha da tabela de clientes.", preview(
            '<div class="docs-scene docs-scene--row"><span>Caloi Bike Store</span>' +
            dropdownMenu() +
            "</div>"
          ))
        );
      },
    },
    modal: {
      title: "Modal",
      lead: "size default / large / confirmação. Overlay escuro + dialog ~521px.",
      node: "294-2652",
      html: function () {
        return (
          card("Default", "", preview(modalBox(), "docs-preview--dark")) +
          card("Large", "", preview(modalBox({ lg: true, title: "Modal title" }), "docs-preview--dark")) +
          card("Confirmação", "", preview(
            modalBox({
              confirm: true,
              title: "Dialog Title",
              desc: "Dialog description text goes here.",
              cancel: "Cancelar",
              ok: "Confirmar",
            }),
            "docs-preview--dark"
          )) +
          card("Sem footer", "", preview(modalBox({ noFooter: true }), "docs-preview--dark")) +
          card("Sem fechar", "", preview(modalBox({ noClose: true }), "docs-preview--dark")) +
          card("Exemplo de uso", "Confirmação de ação destrutiva sobre a listagem de operações.", preview(
            modalBox({
              confirm: true,
              title: "Excluir operação OP-002939?",
              desc: "Essa ação não pode ser desfeita.",
              cancel: "Cancelar",
              ok: "Excluir",
            }),
            "docs-preview--dark"
          ))
        );
      },
    },
    dialog: {
      title: "Dialog",
      lead: "Caixa de diálogo 520×293. Header, description, body slot, footer com dois botões.",
      node: "294-2651",
      html: function () {
        return (
          card("Componente", "", preview(dialogBox(), "docs-preview--dark")) +
          card("Exemplo de uso", "Confirmação exibida antes de descartar o cadastro de um cliente.", preview(
            '<div class="hf-dialog"><div class="hf-dialog__head"><h3 class="hf-dialog__title">Descartar cadastro?</h3>' +
              closeX("hf-dialog__close") +
              '</div><p class="hf-dialog__desc">As informações preenchidas de Minha Empresa LTDA serão perdidas.</p>' +
              '<div class="hf-dialog__slot">Resumo do cadastro</div><hr class="hf-dialog__div">' +
              '<div class="hf-dialog__foot">' +
              btn("lg", "ghost", "Voltar") +
              btn("lg", "primary", "Descartar") +
              "</div></div>",
            "docs-preview--dark"
          ))
        );
      },
    },
    popover: {
      title: "Popover",
      lead: "Balão flutuante com título e conteúdo auxiliar. Padding 16, gap 12, raio 8.",
      node: "294-2435",
      html: function () {
        var pop =
          '<div class="hf-popover"><strong>Popover title</strong>' +
          "<p>Popover content with additional information or form fields.</p></div>";
        return (
          card("Componente", "", preview(pop)) +
          card("Exemplo de uso", "Explicação do filtro exibida ao lado da busca de clientes.", preview(
            '<div class="docs-scene">' +
              searchField() +
              '<div class="hf-popover"><strong>Como funciona a busca</strong>' +
              "<p>Busque por nome, CNPJ ou código da operação.</p></div>" +
              "</div>"
          ))
        );
      },
    },
    sheet: {
      title: "Sheet",
      lead: "Painel lateral 400×600 com header, descrição e slot de 200px. Variantes right e left.",
      node: "294-2436",
      html: function () {
        return (
          card("Right", "", preview(sheetBox("right"))) +
          card("Left", "", preview(sheetBox("left"))) +
          card("Exemplo de uso", "Painel de filtros aberto sobre a listagem de operações.", preview(
            '<div class="docs-sheetscene">' +
              '<div class="docs-sheetscene__page">' +
              opCard("analise") +
              opCard("proposta") +
              "</div>" +
              '<aside class="hf-sheet hf-sheet--right"><div class="hf-sheet__head"><h3>Filtros</h3>' +
              '<span class="hf-sheet__spacer"></span>' +
              closeX("hf-sheet__close") +
              "</div><p>Refine a listagem de operações.</p>" +
              '<div class="hf-sheet__slot">Status, responsável e período</div></aside>' +
              "</div>",
            "docs-preview--wide"
          ))
        );
      },
    },
    avatar: {
      title: "Avatar",
      lead: "sm 32 / md 40 / lg 48.",
      node: "294-2101",
      html: function () {
        return (
          card("Partes de componentes", "Átomos de Avatar", preview(
            cell("sm 32", '<span class="hf-avatar hf-avatar--sm">CA</span>') +
            cell("md 40", '<span class="hf-avatar hf-avatar--md">CA</span>') +
            cell("lg 48", '<span class="hf-avatar hf-avatar--lg">CA</span>')
          )) +
          card("Variantes", "", preview(
            cell("sm 32", '<span class="hf-avatar hf-avatar--sm">CA</span>') +
            cell("md 40", '<span class="hf-avatar hf-avatar--md">CA</span>') +
            cell("lg 48", '<span class="hf-avatar hf-avatar--lg">CA</span>')
          )) +
          card("Exemplo de uso", "Identidade do usuário no header.", preview('<span class="hf-avatar hf-avatar--md">LA</span><span>Lucas Augusto</span>'))
        );
      },
    },
    card: {
      title: "Card",
      lead: "Container 380×204.",
      node: "294-2428",
      html: function () {
        var box = function (title, body, slot) {
          return (
            '<article class="hf-card"><h3 class="hf-card__title">' +
            title +
            '</h3><p class="hf-card__body">' +
            body +
            '</p><div class="hf-card__slot">' +
            slot +
            "</div></article>"
          );
        };
        var c = box("Card Title", "Card description with supporting text.", "Content slot");
        return (
          card("Partes de componentes", "Átomo de Card — 380×204, padding 24, gap 16.", preview(c)) +
          card("Componente completo", "", preview(c)) +
          card("Exemplo de uso", "Resumo de um cliente.", preview(
            box("Caloi Bike Store", "12 contratos ativos · R$ 18.400 em aberto.", "Gráfico de faturamento")
          ))
        );
      },
    },
    "card-select": {
      title: "Card Select",
      lead: "default / selected. 200×126.",
      node: "294-2098",
      html: function () {
        var item = function (sel, t, d) {
          return '<button class="hf-card-select' + (sel ? " is-selected" : "") + '" type="button" data-card-select><strong>' + t + "</strong><span>" + d + "</span></button>";
        };
        return (
          card("Partes de componentes", "Átomos de Card Select", preview(cell("default", item(false, "Plano A", "Até 20 usuários")) + cell("selected", item(true, "Plano B", "Ilimitado")))) +
          card("Variantes", "Clique para selecionar.", preview(
            cell("default", item(false, "Mensal", "Cobrança recorrente")) +
            cell("selected", item(true, "Anual", "2 meses grátis"))
          )) +
          card("Exemplo de uso", "Escolha de produto.", preview(item(true, "Antecipação", "Receba agora") + item(false, "Cobrança", "A prazo")))
        );
      },
    },
    "card-file": {
      title: "Card File",
      lead: "Default, parcial, Error, hover, sucesso. 284×50. O cartão é branco; o estado aparece no selo (info, warning, error, primary).",
      node: "571-808",
      html: function () {
        var variants =
          cell("Default", cardFile("default")) +
          cell("parcial", cardFile("parcial")) +
          cell("Error", cardFile("error")) +
          cell("hover", cardFile("hover")) +
          cell("sucesso", cardFile("success"));
        return (
          card(
            "Variantes",
            "Selo de recarregar (info), atenção (warning), erro e concluído (primary). O Default não traz o botão de ação. Hover troca a borda para primary/400.",
            preview(variants)
          ) +
          card(
            "Opções de visibilidade",
            "showAlert esconde o selo em parcial, error, hover e sucesso. No Default o selo permanece.",
            preview(
              cell("showAlert=true", cardFile("error")) +
              cell("showAlert=false", cardFile("error", "extrato_jan.pdf", { showAlert: false })) +
              cell("sucesso sem selo", cardFile("success", "extrato_jan.pdf", { showAlert: false }))
            )
          ) +
          card("Exemplo de uso", "Documentos anexados na ficha do cliente.", preview(
            cardFile("success", "contrato.pdf") + cardFile("default", "extrato_jan.pdf"),
            "docs-preview--stack"
          ))
        );
      },
    },
    "card-comments": {
      title: "Card Comments",
      lead: "Composer de comentário no rodapé da operação. 700×58. Variantes public, hubfi, hover-icon, hover-componente e populated.",
      node: "748-107",
      html: function () {
        return (
          card(
            "Variantes",
            "Public (globo), HubFi (cadeado), hover do ícone de visibilidade, hover do componente e campo preenchido.",
            preview(
              cell("public", cardComments({ variant: "public" })) +
              cell("hubfi", cardComments({ variant: "hubfi" })) +
              cell("hover-icon", cardComments({ variant: "hover-icon" })) +
              cell("hover-componente", cardComments({ variant: "hover-componente" })) +
              cell("populated", cardComments({ variant: "populated" })),
              "docs-preview--wide"
            )
          ) +
          card(
            "Exemplo de uso",
            "Rodapé da tela de detalhes da operação.",
            preview(cardComments({ variant: "populated" }), "docs-preview--wide")
          )
        );
      },
    },
    table: {
      title: "Table",
      lead: "Células Avatar, Text, Contact, Header, Action e Status Badge. Tabela completa com busca, empty state e paginação. Empresa, Tendência e Banco são células extras.",
      node: "119-709",
      html: function () {
        return (
          card("Partes de componentes", "Átomos da Table no Figma: Avatar, Text, Contact, Header, Action e Status Badge.", preview(
            cell("Avatar + subtítulo", tblUser("Nome do Usuário", "Cargo ou função")) +
            cell("Avatar", tblUser("Nome do Usuário", "")) +
            cell("Text", tblText("Conteúdo da célula")) +
            cell("Text + ícone", tblText("Conteúdo da célula", true)) +
            cell("Contact 2 linhas", tblContact("(00) 00000-0000", "email@exemplo.com")) +
            cell("Contact 1 linha", tblContact("", "email@exemplo.com")) +
            cell("Header sortable", tblSort("Coluna")) +
            cell("Header", tblSort("Coluna", false)) +
            cell("Action icon", tblAct()) +
            cell("Action text", tblAct("text")) +
            cell("Action icon+text", tblAct("icon-text")) +
            cell("Status Badge", '<div class="hf-tbl-status-row">' +
              tblStatus("neutral", "Pendente") +
              tblStatus("success", "Ativo") +
              tblStatus("error", "Inativo") +
              tblStatus("warning", "Alerta") +
              "</div>")
          )) +
          card("Células extras", "Empresa, Tendência e Banco — não entram na tabela Default de usuários.", preview(
            cell("Empresa", tblCompany("Nome da Empresa", "Subtítulo")) +
            cell("Tendência", tblTrend("3.742", "+8%", "Descrição")) +
            cell("Banco", tblBank("Nome do Banco", "Descrição"))
          )) +
          card("Componente completo", "Busca fora da tabela, 6 colunas ordenáveis, texto na Empresa, coluna Conteúdo e ação sem header.", preview(usersTable(), "docs-preview--stack")) +
          card("Empty state", "Nenhum resultado encontrado, com ação para limpar filtros.", preview(tableEmpty(), "docs-preview--stack")) +
          card("Exemplo de uso", "Listagem de usuários da plataforma.", preview(usersTable(), "docs-preview--stack"))
        );
      },
    },
    "list-item": {
      title: "List Item",
      lead: "Item de lista 330×52. Ícone à esquerda, label, chevron à direita.",
      node: "585-2760",
      html: function () {
        function listItem(label, mod) {
          return (
            '<div class="hf-list-item' +
            (mod ? " hf-list-item--" + mod : "") +
            '"><img class="hf-list-item__ico" src="assets/icons/list-cube.svg" width="20" height="20" alt="">' +
            '<span class="hf-list-item__label">' +
            (label || "Label") +
            '</span><span class="hf-list-item__chev"><img src="assets/icons/list-chevron.svg" alt=""></span></div>'
          );
        }
        return (
          card("Partes de componentes", "Átomo de List Item — 330×52.", preview(listItem())) +
          card("Componente completo e suas variações", "", preview(
            cell("default", listItem()) + cell("hover", listItem("Label", "hover")) + cell("active", listItem("Label", "active"))
          )) +
          card("Exemplo de uso", "Lista de atalhos na ficha do cliente.", preview(
            '<div class="docs-list">' +
            listItem("Dados cadastrais") +
            listItem("Documentos", "active") +
            listItem("Operações") +
            listItem("Histórico") +
            "</div>",
            "docs-preview--stack"
          ))
        );
      },
    },
    separator: {
      title: "Separator",
      lead: "Linha 300×1.",
      node: "294-2427",
      html: function () {
        return (
          card("Partes de componentes", "Átomo de Separator", preview('<hr class="hf-sep">', "docs-preview--stack")) +
          card("Exemplo de uso", "Divisão entre seções de um card.", preview('<p>Acima</p><hr class="hf-sep"><p>Abaixo</p>', "docs-preview--stack"))
        );
      },
    },
    slider: {
      title: "Slider",
      lead: "Controle 300×20.",
      node: "294-2437",
      html: function () {
        return (
          card("Partes de componentes", "Átomo de Slider — 300×20, trilho 6px.", preview(slider(50), "docs-preview--stack")) +
          card("Componente completo e suas variações", "", preview(
            cell("25%", slider(25)) + cell("50%", slider(50)) + cell("75%", slider(75)),
            "docs-preview--stack"
          )) +
          card("Exemplo de uso", "Limite de crédito na simulação da operação.", preview(
            '<div class="docs-notes"><h4 class="docs-notes__title">Limite de crédito</h4>' + slider(60) + "</div>",
            "docs-preview--stack"
          ))
        );
      },
    },
    operations: {
      title: "Operations",
      lead: "Card de operação 280×120. Status: Finalizado, Pré-Cadastro, Em Análise, Proposta, Formalização.",
      node: "582-288",
      html: function () {
        var columns = [
          ["Pré-Cadastro", "1241", "R$ 100.846.566.688,23", "pre"],
          ["Em Análise", "318", "R$ 24.912.400,00", "analise"],
          ["Proposta", "97", "R$ 8.145.900,00", "proposta"],
        ];
        return (
          card("Column header", "Cabeçalho de coluna do kanban (280×60).", preview(
            opColumn("Pré-Cadastro", "1241", "R$ 100.846.566.688,23")
          )) +
          card("Status", "Card de operação em cada etapa do funil.", preview(
            cell("Finalizado", opCard("finalizado")) +
            cell("Pré-Cadastro", opCard("pre")) +
            cell("Em Análise", opCard("analise")) +
            cell("Proposta", opCard("proposta")) +
            cell("Formalização", opCard("formalizacao"))
          )) +
          card("Exemplo de uso", "Kanban de operações: cada coluna soma o valor da etapa.", preview(
            '<div class="docs-kanban">' +
              columns
                .map(function (c) {
                  return (
                    '<div class="docs-kanban__col">' +
                    opColumn(c[0], c[1], c[2]) +
                    opCard(c[3]) +
                    opCard(c[3]) +
                    "</div>"
                  );
                })
                .join("") +
              "</div>",
            "docs-preview--wide"
          ))
        );
      },
    },
    section: {
      title: "Section",
      lead: "Título teal 18 SemiBold + slot de conteúdo. 520×68.",
      node: "584-2713",
      html: function () {
        var s = '<div class="hf-section"><h3>INFORMAÇÕES</h3><p>Conteúdo da seção</p></div>';
        var usage =
          '<div class="hf-section"><h3>INFORMAÇÕES</h3><div class="docs-formgrid">' +
          field({ label: "Razão social", value: "Tech Finance LTDA" }) +
          field({ label: "CNPJ", value: "12.345.678/0001-90" }) +
          field({ label: "E-mail", value: "contato@techfinance.com" }) +
          field({ label: "Telefone", value: "(81) 99115-6938" }) +
          "</div></div>";
        return (
          card("Partes de componentes", "Átomo de Section — 520 de largura, gap 20.", preview(s, "docs-preview--stack")) +
          card("Exemplo de uso", "Bloco de dados cadastrais na ficha da empresa.", preview(usage, "docs-preview--stack"))
        );
      },
    },
    "rich-text": {
      title: "Rich Text Editor",
      lead: "Editor 520×180 com toolbar (estilo, B/I/U/link, listas).",
      node: "587-2873",
      html: function () {
        function tool(icon, label) {
          return (
            '<button class="hf-rte__btn" type="button" aria-label="' +
            label +
            '"><img src="assets/icons/rte-' +
            icon +
            '.svg" width="20" height="20" alt=""></button>'
          );
        }
        var rte =
          '<div class="hf-rte"><div class="hf-rte__bar">' +
          '<button class="hf-rte__style" type="button">Normal<img src="assets/icons/rte-chevrons.svg" width="20" height="20" alt=""></button>' +
          '<span class="hf-rte__div"></span><span class="hf-rte__group">' +
          tool("bold", "Negrito") +
          tool("italic", "Itálico") +
          tool("underline", "Sublinhado") +
          tool("link", "Link") +
          '</span><span class="hf-rte__div"></span><span class="hf-rte__group">' +
          tool("list-ordered", "Lista numerada") +
          tool("list", "Lista") +
          tool("clear", "Limpar formatação") +
          '</span></div><div class="hf-rte__body" contenteditable="true" data-placeholder="Adicione notas internas sobre esta empresa..."></div></div>';
        return (
          card("Partes de componentes", "Átomo de Rich Text Editor — 520×180.", preview(rte, "docs-preview--stack")) +
          card("Exemplo de uso", "Notas internas na ficha da empresa.", preview(
            '<div class="docs-notes"><h4 class="docs-notes__title">Notas internas</h4>' + rte + "</div>",
            "docs-preview--stack"
          ))
        );
      },
    },
  };

  function thumb(slug) {
    var map = {
      search: searchField(),
      button: btn("lg", "primary", "Label", "both") + btn("lg", "ghost", "Label"),
      checkbox: checkBox("checked", "Label"),
      chip: chip("Label", false) + chip("Label", true),
      toast: toastBox("Dados salvos com sucesso."),
      breadcrumb: crumb(),
      tabs: '<div class="hf-tabs">' + tabBtn("Tab 1", true) + tabBtn("Tab 2", false) + "</div>",
      pagination: '<div class="hf-pager"><button type="button">‹</button><button class="is-current" type="button">1</button><button type="button">2</button><button type="button">›</button></div>',
      accordion: accordion(false),
      input: field({ placeholder: "Placeholder" }),
      textarea: '<div class="hf-field hf-field--area" style="width:240px"><div class="hf-field__control hf-field__control--area"><textarea class="hf-field__area" placeholder="Digite um texto..."></textarea></div></div>',
      select: selectField({ frozen: true }),
      radio: radioBtn("home-radio", "Label", true),
      switch: '<button class="hf-switch is-on" type="button"></button>',
      label: '<span class="hf-label">Label <span class="hf-field__req">*</span></span>',
      upload: dropzone("default"),
      "select-button": selectBtn(true),
      alert: alertBox("info", { noClose: true }),
      badge: badge("primary", "Badge") + badge("success", "Badge"),
      tooltip: '<span class="hf-tooltip">Texto do tooltip</span>',
      progress: '<div class="hf-progress" style="width:180px"><span style="width:60%"></span></div>',
      skeleton: '<div class="hf-skel hf-skel--text"></div>',
      header: '<header class="hf-header" style="width:240px"><h1 class="hf-header__title" style="font-size:16px">Usuarios</h1></header>',
      sidebar: appSidebar("operacoes"),
      stepper: stepperSimple(0),
      "dropdown-menu": dropdownMenu(),
      modal: modalBox(),
      dialog: dialogBox(),
      popover: '<div class="hf-popover" style="width:200px;min-height:auto"><strong>Popover Title</strong><p>Conteudo</p></div>',
      sheet: sheetBox("right"),
      avatar: '<span class="hf-avatar hf-avatar--md">CA</span><span class="hf-avatar hf-avatar--lg">LA</span>',
      card: '<article class="hf-card" style="max-width:220px;padding:16px"><h3 class="hf-card__title">Título</h3><p class="hf-card__body">Descrição</p></article>',
      "card-select": '<button class="hf-card-select is-selected" type="button" style="width:160px;min-height:80px"><strong>Plano B</strong><span>Ilimitado</span></button>',
      "card-file": cardFile("success", "contrato.pdf"),
      "card-comments": cardComments({ variant: "public" }),
      table: '<table class="hf-table" style="width:220px"><thead><tr><th>Cliente</th><th>Status</th></tr></thead><tbody><tr><td>Caloi</td><td>' + badge("success", "Ativo") + "</td></tr></tbody></table>",
      "list-item": '<div class="hf-list-item" style="width:240px"><img src="assets/icons/list-cube.svg" width="20" height="20" alt=""><span>Label</span><span class="hf-list-item__chev"><img src="assets/icons/crumb-chevron.svg" alt=""></span></div>',
      separator: '<hr class="hf-sep" style="width:180px">',
      slider: '<input class="hf-slider" type="range" value="40" style="width:180px">',
      operations: opCard("finalizado"),
      section: '<div class="hf-section"><h3>INFORMAÇÕES</h3><p>Conteúdo da seção</p></div>',
      "rich-text": '<div class="hf-rte" style="height:100px;max-width:240px"><div class="hf-rte__bar"><span class="hf-rte__style">Normal</span></div><div class="hf-rte__body">Notas…</div></div>',
      "abertura-operacao": '<div class="docs-screen-thumb"><strong>Nova operação</strong><span>Documento · ficha da empresa</span></div>',
      "cadastro-cliente": '<div class="docs-screen-thumb"><strong>Novo cliente</strong><span>Bloqueio · importar ficha</span></div>',
      "edicao-cliente": '<div class="docs-screen-thumb"><strong>Editar cliente</strong><span>Trava · verificação · auditoria</span></div>',
      "link-publico": '<div class="docs-screen-thumb"><strong>Link público</strong><span>Documento · canal · OTP</span></div>',
      "operacao-outro-canal": '<div class="docs-screen-thumb"><strong>OP encerrada</strong><span>Motivo só no backoffice</span></div>',
      "detalhes-operacao": '<div class="docs-screen-thumb"><strong>OP-000000</strong><span>Nome cliente</span></div>',
      "dashboard-operacoes": '<div class="docs-screen-thumb"><strong>Dashboard</strong><span>Visão estratégica</span></div>',
    };
    return map[slug] || "";
  }

  function homeHtml() {
    return groups
      .map(function (g) {
        var tiles = g.items
          .map(function (item) {
            var page = pages[item[0]];
            var meta = page && page.lead ? page.lead.split(".")[0] : "Componente";
            return (
              '<a class="docs-cover" href="#/' +
              item[0] +
              '"><div class="docs-cover__preview">' +
              thumb(item[0]) +
              '</div><div class="docs-cover__meta"><strong>' +
              item[1] +
              "</strong><span>" +
              meta +
              "</span></div></a>"
            );
          })
          .join("");
        return (
          '<section class="docs-gallery"><div class="docs-gallery__head">' +
          (window.hfIconBox ? window.hfIconBox(g.icon) : "") +
          '<div class="docs-gallery__copy"><h2 class="docs-h2">' +
          g.label +
          "</h2>" +
          (g.blurb ? '<p class="docs-section-copy">' + g.blurb + "</p>" : "") +
          '</div></div><div class="docs-grid">' +
          tiles +
          "</div></section>"
        );
      })
      .join("");
  }

  global.HF_CATALOG = {
    groups: groups,
    pages: pages,
    home: {
      title: "Componentes HubFi",
      kicker: "",
      lead: "Catálogo vivo dos componentes HubFi. Abra um item na barra ao lado ou no grid abaixo.",
      node: null,
      html: homeHtml,
    },
    figmaBase: FIGMA,
    ui: {
      appSidebar: appSidebar,
      cardFile: cardFile,
      cardComments: cardComments,
      badge: badge,
      stepper: stepper,
      stepperSimple: stepperSimple,
      step: step,
      toast: toastBox,
    },
  };
})(window);
