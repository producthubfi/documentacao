(function () {
  var ICO = "../assets/icons/";
  var ASM = "assets/";
  var screen = "a1";
  var selected = ["2211", "3307"];
  var sheetOpen = false;
  var confirmOpen = false;
  var filters = {
    grupo: "Todos",
    admin: "Todas",
    status: "Todos",
    periodo: "Próx. 30 dias",
  };

  var GROUPS = [
    { id: "1054", name: "Grupo 1054", admin: "Turn2C · CNP Consórcio", date: "25/10/2026", when: "Em 4 dias", soon: true, cotas: "2 cotas", lances: "4 lances", valor: "R$ 240.000,00", status: "pendente", action: "publish" },
    { id: "9001", name: "Grupo 9001", admin: "Turn2C · Embracon", date: "25/10/2026", when: "Em 4 dias", soon: true, cotas: "3 cotas", lances: "5 lances", valor: "R$ 310.000,00", status: "pendente", action: "publish" },
    { id: "0101", name: "Grupo 0101", admin: "Consórcio Maggi · Ademicon", date: "25/10/2026", when: "Em 4 dias", soon: true, cotas: "1 cota", lances: "2 lances", valor: "R$ 80.000,00", status: "pendente", action: "publish" },
    { id: "1053", name: "Grupo 1053", admin: "Turn2C · CNP Consórcio", date: "16/10/2026", when: "Há 5 dias", cotas: "1 cota", lances: "2 lances", valor: "R$ 120.000,00", status: "publicada", action: "view" },
    { id: "1051", name: "Grupo 1051", admin: "Turn2C · CNP Consórcio", date: "15/10/2026", when: "Há 6 dias", cotas: "4 cotas", lances: "6 lances", valor: "R$ 450.000,00", status: "publicada", action: "view" },
    { id: "1010", name: "Grupo 1010", admin: "Embracon · Embracon", date: "15/10/2026", when: "Há 6 dias", cotas: "0 cota", lances: "0 lance", valor: "R$ 0,00", status: "sem", action: "details" },
  ];

  var LANCES = [
    { cliente: "Mauricio Lima CPF", doc: "11354446410", cota: "2211", tipo: "Lance fixo", valor: "R$ 60.000,00", data: "27/09/2026" },
    { cliente: "Mauricio Lima CPF", doc: "11354446410", cota: "2211", tipo: "Lance fixo", valor: "R$ 60.000,00", data: "24/09/2026" },
    { cliente: "Mauricio Lima CPF", doc: "11354446410", cota: "4954", tipo: "Lance fixo", valor: "R$ 60.000,00", data: "23/09/2026" },
    { cliente: "Raniele Karolina", doc: "13062079470", cota: "3307", tipo: "Lance livre", valor: "R$ 60.000,00", data: "22/09/2026" },
  ];

  var COTAS = [
    { id: "2211", cliente: "Mauricio Lima CPF", credito: "R$ 120.000,00", lances: "2 lances" },
    { id: "4954", cliente: "Mauricio Lima CPF", credito: "R$ 60.000,00", lances: "1 lance" },
    { id: "3307", cliente: "Raniele Karolina", credito: "R$ 60.000,00", lances: "Lance livre" },
    { id: "4001", cliente: "Sem lance nesta assembleia", credito: "—", lances: "" },
  ];

  var HIST = [
    { data: "27/09/2026", tipo: "Lance fixo", valor: "R$ 60.000,00", status: "Contemplado", assembleia: "25/10/2026" },
    { data: "24/09/2026", tipo: "Lance fixo", valor: "R$ 60.000,00", status: "Substituído", assembleia: "25/10/2026" },
    { data: "12/08/2026", tipo: "Lance livre", valor: "R$ 40.000,00", status: "Não contemplado", assembleia: "20/08/2026" },
  ];

  var SELECTS = {
    grupo: ["Todos", "Grupo 1054", "Grupo 9001", "Grupo 0101", "Grupo 1053", "Grupo 1051", "Grupo 1010"],
    admin: ["Todas", "Turn2C · CNP Consórcio", "Turn2C · Embracon", "Consórcio Maggi · Ademicon", "Embracon · Embracon"],
    status: ["Todos", "Pendente", "Publicada", "Sem lances"],
    periodo: ["Próx. 7 dias", "Próx. 30 dias", "Últimos 30 dias", "Últimos 90 dias", "Todo o período"],
  };

  function ico(name) {
    var paths = {
      dash: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>',
      wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8"/><path d="M18 12h.01"/>',
      calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
      bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
      hash: '<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>',
      clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      left: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
      check: '<path d="M20 6 9 17l-5-5"/>',
      chevron: '<path d="m6 9 6 6 6-6"/>',
    };
    return (
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (paths[name] || "") +
      "</svg>"
    );
  }

  function badge(status, withIcon) {
    var type = "secondary";
    var label = status;
    if (status === "pendente") {
      type = "alert";
      label = "Pendente";
    } else if (status === "publicada") {
      type = "published";
      label = "Publicada";
    } else if (status === "sem") {
      type = "secondary";
      label = "Sem lances";
    } else if (status === "aguarda") {
      type = "alert";
      label = "Aguardando assembleia";
    } else if (status === "sera") {
      type = "published";
      label = "Será contemplado";
      withIcon = true;
    } else if (status === "nao") {
      type = "secondary";
      label = "Não contemplado";
    } else if (status === "cont") {
      type = "published";
      label = "Contemplado";
      withIcon = true;
    } else if (status === "sub") {
      type = "secondary";
      label = "Substituído";
    } else if (status === "lances") {
      type = "alert";
      label = "4 lances aguardando";
    } else if (status === "atualizados") {
      type = "published";
      label = "4 lances atualizados";
    }
    var ico =
      withIcon && type === "published"
        ? '<span class="hf-badge__ico" aria-hidden="true"><img src="' + ASM + 'icon-trophy.svg" alt=""></span>'
        : "";
    return '<span class="hf-badge asm-badge hf-badge--' + type + '">' + ico + label + "</span>";
  }

  function btn(label, opts) {
    opts = opts || {};
    var cls = "hf-btn " + (opts.variant || "hf-btn--primary");
    if (opts.size) cls += " " + opts.size;
    if (opts.action) cls += " asm-btn-action";
    if (opts.foot) cls += " asm-btn-foot";
    var attrs = ' class="' + cls + '" type="button"';
    if (opts.go) attrs += ' data-go="' + opts.go + '"';
    if (opts.toast) attrs += ' data-toast="' + opts.toast + '"';
    if (opts.extra) attrs += " " + opts.extra;
    if (opts.disabled) attrs += " disabled";
    var icon = opts.icon
      ? '<img class="asm-btn-ico" src="' + ASM + opts.icon + '" alt="" width="16" height="16">'
      : "";
    return "<button" + attrs + ">" + icon + label + "</button>";
  }

  function publishBtn(opts) {
    opts = opts || {};
    return btn("Publicar resultado", {
      variant: "hf-btn--primary",
      foot: true,
      icon: "icon-send.svg",
      go: opts.go,
      extra: opts.extra,
      disabled: opts.disabled,
    });
  }

  function impactSummary() {
    var contemplados = LANCES.filter(function (l) {
      return selected.indexOf(l.cota) >= 0;
    }).length;
    var nao = LANCES.length - contemplados;
    return (
      '<div class="impact-summary">' +
      "<p class=\"impact-summary__title\">O que acontece ao publicar</p>" +
      '<div class="impact-summary__stats">' +
      '<div class="impact-stat impact-stat--ok"><p class="impact-stat__n">' +
      selected.length +
      '</p><p class="impact-stat__l">Cotas contempladas</p></div>' +
      '<div class="impact-stat impact-stat--ok"><p class="impact-stat__n">' +
      contemplados +
      '</p><p class="impact-stat__l">Lances contemplados</p></div>' +
      '<div class="impact-stat impact-stat--info"><p class="impact-stat__n">' +
      nao +
      '</p><p class="impact-stat__l">Lances não contemplados</p></div>' +
      "</div>" +
      '<div class="impact-summary__note"><img src="' +
      ASM +
      'icon-clock.svg" alt="" width="14" height="14"><span>Os lances aguardando esta assembleia serão atualizados juntos</span></div>' +
      "</div>"
    );
  }

  function multiselectDropdown() {
    return (
      '<div class="ms-dd" role="listbox" aria-label="Cotas do grupo">' +
      '<div class="ms-dd__search"><img src="' +
      ICO +
      'search.svg" alt="" width="16" height="16"><input type="search" placeholder="Buscar cota ou cliente..." data-ms-search aria-label="Buscar cota ou cliente"></div>' +
      COTAS.map(function (c) {
        var on = selected.indexOf(c.id) >= 0;
        return (
          '<button class="ms-opt' +
          (on ? " is-on" : "") +
          '" type="button" role="option" aria-selected="' +
          (on ? "true" : "false") +
          '" data-toggle-cota="' +
          c.id +
          '" data-ms-label="Cota ' +
          c.id +
          " " +
          c.cliente +
          '">' +
          '<span class="ms-check" aria-hidden="true">' +
          (on ? '<img src="' + ICO + 'select-check.svg" alt="" width="10" height="8">' : "") +
          "</span>" +
          '<span class="ms-opt__main"><strong>Cota ' +
          c.id +
          "</strong><span>" +
          c.cliente +
          " · Grupo 1054</span></span>" +
          '<span class="ms-opt__side"><strong>' +
          c.credito +
          "</strong><span>" +
          (c.lances || "") +
          "</span></span></button>"
        );
      }).join("") +
      '<div class="ms-dd__foot"><span>' +
      selected.length +
      ' cotas selecionadas</span><button type="button" class="ms-dd__clear" data-clear-cotas>Limpar seleção</button></div></div>'
    );
  }

  function actionBtn(g) {
    if (g.action === "publish") {
      return btn("Publicar resultado", {
        variant: "hf-btn--dark",
        action: true,
        go: "a2",
        extra: 'data-group="' + g.id + '"',
      });
    }
    if (g.action === "view") {
      return btn("Ver resultado", {
        variant: "hf-btn--ghost",
        action: true,
        toast: "Resultado já publicado. Abra pelo grupo 1054 no fluxo feliz.",
      });
    }
    return btn("Ver detalhes", {
      variant: "hf-btn--ghost",
      action: true,
      toast: "Sem lances neste grupo.",
    });
  }

  function searchField(placeholder) {
    return (
      '<label class="hf-search"><span class="hf-search__icon" aria-hidden="true"><img src="' +
      ICO +
      'search.svg" width="14" height="14" alt=""></span><input class="hf-search__field" type="search" placeholder="' +
      placeholder +
      '"></label>'
    );
  }

  function selectItem(label, active) {
    return (
      '<div class="hf-select-menu__item' +
      (active ? " is-active" : "") +
      '" role="option" tabindex="-1" data-label="' +
      label +
      '" aria-selected="' +
      (active ? "true" : "false") +
      '">' +
      label +
      "</div>"
    );
  }

  function selectField(id, label, value, options) {
    var items = options
      .map(function (opt) {
        return selectItem(opt, opt === value);
      })
      .join("");
    return (
      '<div class="hf-field hf-field--select" data-select data-select-id="' +
      id +
      '" data-select-type="default">' +
      '<div class="hf-field__header"><span class="hf-field__label">' +
      label +
      "</span></div>" +
      '<button class="hf-field__control" type="button" role="combobox" aria-haspopup="listbox" aria-expanded="false">' +
      '<span class="hf-field__value">' +
      value +
      '</span><span class="hf-field__chevron"><img src="' +
      ICO +
      'select-chevron.svg" alt=""></span></button>' +
      '<div class="hf-select-menu" role="listbox">' +
      '<div class="hf-select-menu__search">' +
      searchField("Buscar...") +
      "</div>" +
      items +
      "</div></div>"
    );
  }

  function tabs(active) {
    var items = [
      ["Dashboard", ASM + "tab-dashboard.svg"],
      ["Clientes", ASM + "tab-users.svg"],
      ["Grupos", ASM + "tab-layers.svg"],
      ["Cotas", ASM + "tab-wallet.svg"],
      ["Assembleias", ASM + "tab-calendar.svg"],
      ["Lembretes", ASM + "tab-bell.svg"],
    ];
    return (
      '<div class="hf-tabs asm-tabs" data-tabs role="tablist">' +
      items
        .map(function (it) {
          var on = it[0] === active;
          var src = on ? ASM + "tab-icon.svg" : it[1];
          if (on && it[0] === "Assembleias") src = ASM + "tab-calendar.svg";
          return (
            '<button class="hf-tab' +
            (on ? " is-active" : "") +
            '" type="button" role="tab" aria-selected="' +
            (on ? "true" : "false") +
            '"><span class="hf-tab__ico"><img src="' +
            src +
            '" alt=""></span>' +
            it[0] +
            "</button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function shell(inner) {
    return (
      '<aside class="sidebar">' +
      '<div class="side-pad"><div class="logo"><img src="' +
      ASM +
      '04b4c.svg" alt="hubfi" width="109" height="27"></div>' +
      '<button class="ctx" type="button"><span class="ctx-ico">TE</span><span class="ctx-copy"><span class="ctx-k">Contexto da Empresa</span><span class="ctx-v">Todas as empresas</span></span><img src="' +
      ASM +
      '517ff.svg" alt="" width="16" height="16"></button></div>' +
      '<div class="group-label">Rotina</div><div class="nav-list">' +
      '<button class="nav-btn" type="button">' +
      ico("dash") +
      "Dashboard</button>" +
      '<button class="nav-btn" type="button">' +
      ico("users") +
      "Clientes</button>" +
      '</div><div class="group-label">Gestão</div><div class="nav-list">' +
      '<button class="nav-btn is-on" type="button">' +
      ico("layers") +
      "Gestão de Consórcio</button>" +
      '</div><div class="group-label">Administração interna</div><div class="nav-list">' +
      '<button class="nav-btn" type="button">' +
      ico("users") +
      "Usuários</button>" +
      '<button class="nav-btn" type="button">' +
      ico("layers") +
      "Backoffice</button>" +
      "</div>" +
      '<button class="user" type="button"><span class="avatar">LA</span><span class="user-copy"><b>Lucas Augusto</b><span>lucasaugusto@hubfi.com.br</span></span></button>' +
      '</aside><main class="page">' +
      inner +
      "</main>"
    );
  }

  function listTable(headCols, rowsHtml) {
    return (
      '<div class="table-wrap"><div class="asm-list">' +
      '<div class="asm-list__head">' +
      headCols +
      "</div>" +
      rowsHtml +
      "</div></div>"
    );
  }

  function a1() {
    var head =
      '<span class="asm-col-grupo">Grupo</span>' +
      '<span class="asm-col-data">Data da assembleia</span>' +
      '<span class="asm-col-cotas">Cotas com lance</span>' +
      '<span class="asm-col-lances">Lances aguardando</span>' +
      '<span class="asm-col-valor">Valor dos lances</span>' +
      '<span class="asm-col-status">Status</span>' +
      '<span class="asm-col-acoes">Ações</span>';
    var rows = GROUPS.map(function (g) {
      return (
        '<div class="asm-list__row">' +
        '<div class="asm-col-grupo"><div class="cell-stack"><strong>' +
        g.name +
        "</strong><span>" +
        g.admin +
        "</span></div></div>" +
        '<div class="asm-col-data"><div class="cell-stack"><strong>' +
        g.date +
        '</strong><span class="' +
        (g.soon ? "when-soon" : "when-past") +
        '">' +
        g.when +
        "</span></div></div>" +
        '<div class="asm-col-cotas">' +
        g.cotas +
        "</div>" +
        '<div class="asm-col-lances">' +
        g.lances +
        "</div>" +
        '<div class="asm-col-valor">' +
        g.valor +
        "</div>" +
        '<div class="asm-col-status">' +
        badge(g.status) +
        "</div>" +
        '<div class="asm-col-acoes">' +
        actionBtn(g) +
        "</div></div>"
      );
    }).join("");

    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> <b>Assembleias</b></div>' +
        '<div class="page-head"><h1>Assembleias</h1><p>Publique o resultado oficial uma vez e atualize cotas e lances juntos</p></div>' +
        tabs("Assembleias") +
        '<div class="kpis">' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Assembleias pendentes</p><span class="kpi-ico">' +
        ico("hash") +
        '</span></div><p class="value">3</p></div>' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Lances aguardando resultado</p><span class="kpi-ico">' +
        ico("wallet") +
        '</span></div><p class="value">11</p></div>' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Próxima assembleia</p><span class="kpi-ico warn">' +
        ico("calendar") +
        '</span></div><p class="value" style="font-size:22px">25/10/2026</p></div>' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Publicadas no mês</p><span class="kpi-ico hot">' +
        ico("clock") +
        '</span></div><p class="value">4</p></div>' +
        "</div>" +
        '<div class="filters">' +
        searchField("Buscar por grupo ou administradora...") +
        selectField("grupo", "Grupo", filters.grupo, SELECTS.grupo) +
        selectField("admin", "Administradora", filters.admin, SELECTS.admin) +
        selectField("status", "Status", filters.status, SELECTS.status) +
        selectField("periodo", "Período", filters.periodo, SELECTS.periodo) +
        "</div>" +
        listTable(head, rows)
    );
  }

  function detailChrome(extraCard, lancesStatusMode) {
    var chips = selected
      .map(function (id) {
        return (
          '<span class="chip">Cota ' +
          id +
          '<button type="button" class="chip__x" data-remove-cota="' +
          id +
          '" aria-label="Remover cota ' +
          id +
          '"><img src="' +
          ASM +
          'icon-x.svg" alt="" width="12" height="12"></button></span>'
        );
      })
      .join("");

    var head =
      '<span class="asm-col-grupo">Cliente</span>' +
      '<span class="asm-col-cota">Cota</span>' +
      '<span class="asm-col-tipo">Tipo de lance</span>' +
      '<span class="asm-col-vlance">Valor do lance</span>' +
      '<span class="asm-col-reg">Registrado em</span>' +
      '<span class="asm-col-comp">Comprovante</span>' +
      '<span class="asm-col-status-lg">Status</span>';
    var rows = LANCES.map(function (l) {
      var st = "aguarda";
      if (lancesStatusMode === "preview") st = selected.indexOf(l.cota) >= 0 ? "sera" : "nao";
      if (lancesStatusMode === "done") st = selected.indexOf(l.cota) >= 0 ? "cont" : "nao";
      var highlight = st === "sera" || st === "cont" ? " is-highlight" : "";
      return (
        '<div class="asm-list__row' +
        highlight +
        '">' +
        '<div class="asm-col-grupo"><div class="cell-stack"><strong>' +
        l.cliente +
        "</strong><span>" +
        l.doc +
        "</span></div></div>" +
        '<div class="asm-col-cota"><strong>' +
        l.cota +
        "</strong></div>" +
        '<div class="asm-col-tipo">' +
        l.tipo +
        "</div>" +
        '<div class="asm-col-vlance">' +
        l.valor +
        "</div>" +
        '<div class="asm-col-reg">' +
        l.data +
        "</div>" +
        '<div class="asm-col-comp"><button class="linkish" type="button" data-toast="Comprovante ilustrativo.">Ver comprovante <img src="' +
        ASM +
        'icon-eye.svg" alt="" width="14" height="14"></button></div>' +
        '<div class="asm-col-status-lg">' +
        badge(st) +
        "</div></div>"
      );
    }).join("");

    var msWide = extraCard ? " ms--wide" : "";
    return (
      '<button class="back" type="button" data-go="a1">' +
      ico("left") +
      "Voltar para Assembleias</button>" +
      '<div class="meta">' +
      badge(screen === "a6" ? "publicada" : "pendente") +
      '<span class="meta-item">' +
      ico("calendar") +
      "Assembleia em 25/10/2026</span>" +
      '<span class="meta-item">' +
      ico("layers") +
      "Turn2C · CNP Consórcio</span>" +
      '<span class="meta-item">' +
      ico("users") +
      "3 cotas com lance</span>" +
      '<span class="meta-item">' +
      ico("wallet") +
      "4 lances · R$ 240.000,00</span>" +
      "</div>" +
      '<div class="card">' +
      "<h2>Resultado oficial</h2>" +
      '<p class="lead">Informe as cotas do grupo contempladas nesta assembleia. Os lances dessas cotas serão marcados como contemplados.</p>' +
      '<div class="ms' +
      msWide +
      (sheetOpen ? " is-open" : "") +
      '" data-ms>' +
      '<p class="ms-label">Cotas contempladas</p>' +
      '<button class="ms-box" type="button" data-ms-toggle aria-expanded="' +
      (sheetOpen ? "true" : "false") +
      '">' +
      (selected.length
        ? '<span class="chips">' + chips + "</span>"
        : '<span class="placeholder">Selecione as cotas contempladas</span>') +
      '<img class="ms-chevron" src="' +
      ICO +
      'select-chevron.svg" alt="" width="16" height="16">' +
      "</button>" +
      (sheetOpen ? multiselectDropdown() : "") +
      '<p class="ms-help">Apenas cotas cadastradas no grupo 1054</p>' +
      "</div>" +
      (extraCard || "") +
      "</div>" +
      '<div class="section-head"><h3>Lances aguardando esta assembleia</h3>' +
      badge(screen === "a6" ? "atualizados" : "lances") +
      "</div>" +
      listTable(head, rows)
    );
  }

  function footBar(copy, actions) {
    return (
      '<div class="foot"><p class="foot-copy">' +
      copy +
      '</p><div class="foot-actions">' +
      actions +
      "</div></div>"
    );
  }

  function a2() {
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Assembleias <span>/</span> <b>Grupo 1054</b></div>' +
        '<div class="page-head"><h1>Grupo 1054</h1><p>Resultado oficial da assembleia de 25/10/2026</p></div>' +
        detailChrome("", "wait") +
        footBar(
          "Selecione as cotas contempladas para liberar a publicação do resultado.",
          btn("Cancelar", { variant: "hf-btn--ghost", foot: true, go: "a1" }) +
            publishBtn({ disabled: true })
        )
    );
  }

  function a3() {
    sheetOpen = true;
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Assembleias <span>/</span> <b>Grupo 1054</b></div>' +
        '<div class="page-head"><h1>Grupo 1054</h1><p>Resultado oficial da assembleia de 25/10/2026</p></div>' +
        detailChrome("", "wait") +
        footBar(
          "Selecione as cotas contempladas para liberar a publicação do resultado.",
          btn("Cancelar", { variant: "hf-btn--ghost", foot: true, go: "a1" }) +
            publishBtn({
              disabled: !selected.length,
              go: selected.length ? "a4" : undefined,
            })
        )
    );
  }

  function a4() {
    sheetOpen = false;
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Assembleias <span>/</span> <b>Grupo 1054</b></div>' +
        '<div class="page-head"><h1>Grupo 1054</h1><p>Resultado oficial da assembleia de 25/10/2026</p></div>' +
        detailChrome(impactSummary(), "preview") +
        footBar(
          "Revise o resumo antes de publicar. O resultado não é republicado por cima.",
          btn("Cancelar", { variant: "hf-btn--ghost", foot: true, go: "a1" }) +
            publishBtn({ extra: 'data-confirm="1"' })
        )
    );
  }

  function a5() {
    confirmOpen = true;
    sheetOpen = false;
    return a4() + confirmHtml();
  }

  function a6() {
    confirmOpen = false;
    sheetOpen = false;
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Assembleias <span>/</span> <b>Grupo 1054</b></div>' +
        '<div class="alert">' +
        ico("check") +
        "<span>Resultado publicado em 16/11/2026 às 10:12. Cotas e lances foram atualizados.</span></div>" +
        '<div class="page-head"><h1>Grupo 1054</h1><p>Resultado oficial da assembleia de 25/10/2026</p></div>' +
        detailChrome(impactSummary(), "done") +
        footBar(
          "Abra a ficha do cliente contemplado para ver a cota atualizada.",
          btn("Voltar para lista", { variant: "hf-btn--ghost", foot: true, go: "a1" }) +
            btn("Abrir ficha do cliente", { variant: "hf-btn--primary", foot: true, go: "a7" })
        )
    );
  }

  function a7() {
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Clientes <span>/</span> <b>Mauricio Lima</b></div>' +
        '<button class="back" type="button" data-go="a6">' +
        ico("left") +
        "Voltar para resultado</button>" +
        '<div class="page-head"><h1>Mauricio Lima</h1><p>Ficha do cliente com a cota contemplada nesta assembleia</p></div>' +
        '<div class="profile">' +
        '<div class="profile-card">' +
        '<p class="name">Mauricio Lima</p><p class="sub">CPF 113.544.464-10</p>' +
        '<div class="kv">' +
        '<div class="kv-row"><span>Telefone</span><b>(11) 98888-2211</b></div>' +
        '<div class="kv-row"><span>E-mail</span><b>mauricio@email.com</b></div>' +
        '<div class="kv-row"><span>Grupo</span><b>1054</b></div>' +
        '<div class="kv-row"><span>Cota</span><b>2211</b></div>' +
        '<div class="kv-row"><span>Status da cota</span><b>Contemplada</b></div>' +
        "</div></div>" +
        "<div>" +
        '<div class="alert">' +
        ico("check") +
        "<span>Cota 2211 contemplada na assembleia de 25/10/2026 por lance fixo de R$ 60.000,00.</span></div>" +
        '<div class="card">' +
        "<h2>Cota 2211</h2>" +
        '<p class="lead">Crédito de R$ 180.000,00 · Turn2C · CNP Consórcio</p>' +
        '<div class="impact" style="margin-top:16px">' +
        '<div class="impact-item"><p class="k">Forma de contemplação</p><p class="v" style="font-size:15px">Lance fixo</p></div>' +
        '<div class="impact-item"><p class="k">Valor do lance</p><p class="v" style="font-size:15px">R$ 60.000,00</p></div>' +
        '<div class="impact-item"><p class="k">Assembleia</p><p class="v" style="font-size:15px">25/10/2026</p></div>' +
        "</div>" +
        '<div style="margin-top:16px">' +
        btn("Ver histórico de lances", { variant: "hf-btn--ghost", go: "a8" }) +
        "</div></div></div></div>"
    );
  }

  function a8() {
    var head =
      '<span class="asm-col-data">Registrado em</span>' +
      '<span class="asm-col-tipo">Tipo</span>' +
      '<span class="asm-col-vlance">Valor</span>' +
      '<span class="asm-col-reg">Assembleia</span>' +
      '<span class="asm-col-status-lg">Status</span>';
    var rows = HIST.map(function (h) {
      var st = h.status === "Contemplado" ? "cont" : h.status === "Substituído" ? "sub" : "nao";
      return (
        '<div class="asm-list__row">' +
        '<div class="asm-col-data">' +
        h.data +
        '</div><div class="asm-col-tipo">' +
        h.tipo +
        '</div><div class="asm-col-vlance">' +
        h.valor +
        '</div><div class="asm-col-reg">' +
        h.assembleia +
        '</div><div class="asm-col-status-lg">' +
        badge(st) +
        "</div></div>"
      );
    }).join("");
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Clientes <span>/</span> Mauricio Lima <span>/</span> <b>Histórico de lances</b></div>' +
        '<button class="back" type="button" data-go="a7">' +
        ico("left") +
        "Voltar para ficha</button>" +
        '<div class="page-head"><h1>Histórico de lances</h1><p>Cota 2211 · Grupo 1054 · Mauricio Lima</p></div>' +
        listTable(head, rows) +
        '<div class="foot"><p class="foot-copy">Fluxo feliz concluído: da lista até o histórico da cota contemplada.</p>' +
        '<div class="foot-actions">' +
        btn("Voltar ao início", { variant: "hf-btn--primary", go: "a1" }) +
        "</div></div>"
    );
  }

  function confirmHtml() {
    return (
      '<div class="overlay" id="confirm">' +
      '<div class="dialog" role="dialog" aria-modal="true" aria-label="Confirmar publicação">' +
      '<div class="dialog-top"><div><h2>Confirmar publicação do resultado</h2><p>Essa ação atualiza cotas e lances ao mesmo tempo.</p></div>' +
      '<button class="x" type="button" data-close-confirm aria-label="Fechar">✕</button></div>' +
      '<div class="dialog-body">' +
      "<p>Você está publicando o resultado oficial da assembleia do <b>Grupo 1054</b> em <b>25/10/2026</b>.</p>" +
      '<ul class="dialog-list">' +
      "<li>" +
      selected.length +
      " cotas serão marcadas como contempladas</li>" +
      "<li>3 lances serão marcados como contemplados</li>" +
      "<li>1 lance permanecerá como não contemplado nesta assembleia</li>" +
      "</ul>" +
      "<p>Depois de publicar, o status da assembleia muda para Publicada.</p>" +
      "</div>" +
      '<div class="dialog-actions">' +
      btn("Cancelar", { variant: "hf-btn--ghost", extra: "data-close-confirm" }) +
      btn("Confirmar publicação", { variant: "hf-btn--primary", go: "a6" }) +
      "</div></div></div>"
    );
  }

  function closeSelects(except) {
    document.querySelectorAll("[data-select].is-open").forEach(function (field) {
      if (field === except) return;
      field.classList.remove("is-open");
      var trigger = field.querySelector(".hf-field__control");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  function wireSelect(field) {
    var trigger = field.querySelector(".hf-field__control");
    var value = field.querySelector(".hf-field__value");
    var menu = field.querySelector(".hf-select-menu");
    if (!trigger || !menu || !value) return;
    var items = Array.prototype.slice.call(menu.querySelectorAll(".hf-select-menu__item"));
    var search = menu.querySelector(".hf-search__field");
    var id = field.getAttribute("data-select-id");

    function itemLabel(item) {
      return item.getAttribute("data-label") || item.textContent.trim();
    }

    function open() {
      closeSelects(field);
      menu.style.top = trigger.offsetTop + trigger.offsetHeight + 4 + "px";
      field.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      if (search) {
        search.value = "";
        items.forEach(function (item) {
          item.hidden = false;
        });
        search.focus();
      }
    }

    function close(refocus) {
      field.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      if (refocus) trigger.focus();
    }

    function choose(item) {
      items.forEach(function (other) {
        other.classList.remove("is-active");
        other.setAttribute("aria-selected", "false");
      });
      item.classList.add("is-active");
      item.setAttribute("aria-selected", "true");
      var text = itemLabel(item);
      value.textContent = text;
      if (id && filters[id] !== undefined) filters[id] = text;
      close(true);
    }

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      if (field.classList.contains("is-open")) close(false);
      else open();
    });

    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    if (search) {
      search.addEventListener("click", function (event) {
        event.stopPropagation();
      });
      search.addEventListener("input", function () {
        var q = search.value.toLowerCase();
        items.forEach(function (item) {
          var text = itemLabel(item).toLowerCase();
          item.hidden = !!(q && text.indexOf(q) === -1);
        });
      });
    }

    items.forEach(function (item) {
      item.addEventListener("click", function (event) {
        event.stopPropagation();
        choose(item);
      });
    });
  }

  function wireAll() {
    document.querySelectorAll("[data-select]").forEach(wireSelect);
    var msSearch = document.querySelector("[data-ms-search]");
    if (msSearch) {
      msSearch.addEventListener("input", function () {
        var q = msSearch.value.toLowerCase();
        document.querySelectorAll(".ms-opt").forEach(function (opt) {
          var text = (opt.getAttribute("data-ms-label") || "").toLowerCase();
          opt.hidden = !!(q && text.indexOf(q) === -1);
        });
      });
      msSearch.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    }
  }

  function paint() {
    sheetOpen = screen === "a3";
    confirmOpen = screen === "a5";
    var map = { a1: a1, a2: a2, a3: a3, a4: a4, a5: a5, a6: a6, a7: a7, a8: a8 };
    document.getElementById("app").innerHTML = (map[screen] || a1)();
    document.querySelectorAll(".proto button").forEach(function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-jump") === screen);
    });
    if (location.hash !== "#" + screen) history.replaceState(null, "", "#" + screen);
    wireAll();
  }

  function go(next) {
    screen = next;
    paint();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove("is-on");
    }, 2600);
  }

  function closeMsDropdown() {
    if (screen === "a3") go(selected.length ? "a4" : "a2");
  }

  document.addEventListener("click", function (e) {
    closeSelects(null);
    if (screen === "a3" && !e.target.closest("[data-ms]")) closeMsDropdown();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSelects(null);
      closeMsDropdown();
    }
  });

  document.getElementById("app").addEventListener("click", function (e) {
    var jump = e.target.closest("[data-go]");
    var msToggle = e.target.closest("[data-ms-toggle]");
    var removeCota = e.target.closest("[data-remove-cota]");
    var clearCotas = e.target.closest("[data-clear-cotas]");
    var toggle = e.target.closest("[data-toggle-cota]");
    var conf = e.target.closest("[data-confirm]");
    var closeConf = e.target.closest("[data-close-confirm]");
    var tip = e.target.closest("[data-toast]");

    if (e.target.closest("[data-ms]")) e.stopPropagation();

    if (e.target.id === "confirm" || closeConf) {
      go("a4");
      return;
    }
    if (removeCota) {
      e.stopPropagation();
      var rid = removeCota.getAttribute("data-remove-cota");
      selected = selected.filter(function (x) {
        return x !== rid;
      });
      paint();
      return;
    }
    if (clearCotas) {
      e.stopPropagation();
      selected = [];
      paint();
      return;
    }
    if (toggle) {
      e.stopPropagation();
      var id = toggle.getAttribute("data-toggle-cota");
      if (selected.indexOf(id) >= 0) selected = selected.filter(function (x) {
        return x !== id;
      });
      else selected = selected.concat([id]);
      if (screen !== "a3") screen = "a3";
      paint();
      return;
    }
    if (msToggle) {
      e.stopPropagation();
      if (e.target.closest("[data-remove-cota]")) return;
      if (screen === "a3") go(selected.length ? "a4" : "a2");
      else go("a3");
      return;
    }
    if (conf) {
      go("a5");
      return;
    }
    if (jump) {
      go(jump.getAttribute("data-go"));
      return;
    }
    if (tip) toast(tip.getAttribute("data-toast"));
  });

  document.querySelectorAll(".proto button").forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.getAttribute("data-jump") === "a3" || b.getAttribute("data-jump") === "a4" || b.getAttribute("data-jump") === "a5" || b.getAttribute("data-jump") === "a6") {
        selected = ["2211", "3307"];
      }
      if (b.getAttribute("data-jump") === "a2") selected = [];
      go(b.getAttribute("data-jump"));
    });
  });

  var start = (location.hash || "#a1").slice(1);
  if (["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"].indexOf(start) === -1) start = "a1";
  if (start === "a3" || start === "a4" || start === "a5" || start === "a6") selected = ["2211", "3307"];
  if (start === "a2") selected = [];
  go(start);
})();
