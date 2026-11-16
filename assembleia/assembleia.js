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

  function impactSummary(opts) {
    opts = opts || {};
    var contemplados = LANCES.filter(function (l) {
      return selected.indexOf(l.cota) >= 0;
    }).length;
    var nao = LANCES.length - contemplados;
    var title = opts.published ? "Resultado publicado" : "O que acontece ao publicar";
    var note = opts.published
      ? '<div class="impact-summary__note"><img src="' +
        ASM +
        'icon-circle-check.svg" alt="" width="14" height="14"><span>Publicado por Lucas Augusto em 25/10/2026 às 16:42</span></div>'
      : '<div class="impact-summary__note"><img src="' +
        ASM +
        'icon-clock.svg" alt="" width="14" height="14"><span>Os lances aguardando esta assembleia serão atualizados juntos</span></div>';
    return (
      '<div class="impact-summary' +
      (opts.boxed ? " impact-summary--boxed" : "") +
      '">' +
      '<p class="impact-summary__title">' +
      title +
      "</p>" +
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
      note +
      "</div>"
    );
  }

  function detailHead() {
    return (
      '<div class="crumb">Gestão de Consórcio</div>' +
      '<div class="page-head"><h1>Grupo 1054</h1><p>Resultado oficial da assembleia de 25/10/2026</p></div>'
    );
  }

  function publishedCard() {
    var tags = selected
      .map(function (id) {
        return (
          '<span class="hf-badge asm-badge hf-badge--published"><span class="hf-badge__ico"><img src="' +
          ASM +
          'icon-trophy.svg" alt=""></span>Cota ' +
          id +
          "</span>"
        );
      })
      .join("");
    return (
      '<div class="card card--published">' +
      '<div class="card-header"><h2>Resultado publicado</h2>' +
      '<p class="lead">Publicado por Lucas Augusto em 25/10/2026 às 16:42. O resultado não pode ser republicado por cima.</p></div>' +
      '<div class="published-row">' +
      '<div class="published-left">' +
      '<p class="ms-label">Cotas contempladas</p>' +
      '<div class="published-tags">' +
      tags +
      "</div>" +
      '<div class="published-actions">' +
      btn("Ajustar resultado", {
        variant: "hf-btn--ghost",
        foot: true,
        icon: "icon-pencil.svg",
        toast: "Ajuste ilustrativo neste protótipo.",
      }) +
      btn("Ver histórico de alterações", {
        variant: "hf-btn--ghost",
        foot: true,
        icon: "icon-history.svg",
        toast: "Histórico ilustrativo neste protótipo.",
      }) +
      "</div></div>" +
      impactSummary({ published: true, boxed: true }) +
      "</div></div>"
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

  function lancesTable(lancesStatusMode) {
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
    return listTable(head, rows);
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

    var msWide = extraCard ? " ms--wide" : "";
    var cardBlock =
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
      "</div>";

    var sectionTitle =
      lancesStatusMode === "done" ? "Lances desta assembleia" : "Lances aguardando esta assembleia";

    return (
      '<button class="back" type="button" data-go="a1">' +
      ico("left") +
      "Voltar para Assembleias</button>" +
      '<div class="meta">' +
      badge(lancesStatusMode === "done" ? "publicada" : "pendente") +
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
      cardBlock +
      '<div class="section-head"><h3>' +
      sectionTitle +
      "</h3>" +
      badge(lancesStatusMode === "done" ? "atualizados" : "lances") +
      "</div>" +
      lancesTable(lancesStatusMode)
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
      detailHead() +
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
      detailHead() +
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
      detailHead() +
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
    return (
      shell(
        detailHead() +
          '<button class="back" type="button" data-go="a1">' +
          ico("left") +
          "Voltar para Assembleias</button>" +
          '<div class="meta">' +
          badge("publicada") +
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
          publishedCard() +
          '<div class="section-head"><h3>Lances desta assembleia</h3>' +
          badge("atualizados") +
          "</div>" +
          lancesTable("done") +
          '<div class="next-step">' +
          '<p>Próximo passo no fluxo feliz: abrir a ficha do cliente contemplado.</p>' +
          btn("Abrir ficha do cliente", {
            variant: "hf-btn--primary",
            foot: true,
            icon: "icon-arrow-right.svg",
            go: "a7",
          }) +
          "</div>"
      ) +
      '<div class="asm-toast" id="pub-toast" role="status">' +
      '<img src="' +
      ASM +
      'icon-circle-check.svg" alt="" width="20" height="20">' +
      '<div class="asm-toast__text"><strong>Resultado publicado</strong><span>2 cotas contempladas e 4 lances atualizados.</span></div>' +
      '<button type="button" class="asm-toast__x" data-close-toast aria-label="Fechar"><img src="' +
      ASM +
      'icon-x-gray.svg" alt="" width="14" height="14"></button></div>'
    );
  }

  function a7() {
    var cotasRows = [
      { cota: "2211", grupo: "1054", admin: "Turn2C", sim: true, credito: "R$ 120.000,00", menu: true },
      { cota: "4954", grupo: "1054", admin: "Turn2C", sim: false, credito: "R$ 60.000,00", menu: false },
      { cota: "3307", grupo: "1021", admin: "Turn2C", sim: false, credito: "R$ 90.000,00", menu: false },
    ]
      .map(function (r) {
        var contemplada = r.sim
          ? '<span class="hf-badge asm-badge hf-badge--published"><span class="hf-badge__ico"><img src="' +
            ASM +
            'icon-trophy.svg" alt=""></span>Sim</span>'
          : '<span class="hf-badge asm-badge hf-badge--secondary">Não</span>';
        var actions =
          '<div class="row-menu' +
          (r.menu ? " is-open" : "") +
          '">' +
          '<button class="row-menu__btn" type="button" data-toggle-menu aria-label="Ações">' +
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>' +
          (r.menu
            ? '<div class="row-menu__dd" role="menu">' +
              '<button type="button" role="menuitem" data-toast="Cota ilustrativa neste protótipo."><img src="' +
              ASM +
              'icon-eye.svg" alt="" width="14" height="14">Ver cota</button>' +
              '<button type="button" role="menuitem" class="is-on" data-go="a8"><img src="' +
              ASM +
              'icon-history.svg" alt="" width="14" height="14">Histórico de lances</button>' +
              '<button type="button" role="menuitem" data-toast="Edição ilustrativa neste protótipo."><img src="' +
              ASM +
              'icon-pencil.svg" alt="" width="14" height="14">Editar cota</button></div>'
            : "") +
          "</div>";
        return (
          '<div class="asm-list__row">' +
          '<div class="asm-col-cota"><strong>' +
          r.cota +
          "</strong></div>" +
          '<div class="asm-col-data">' +
          r.grupo +
          "</div>" +
          '<div class="asm-col-admin">' +
          r.admin +
          "</div>" +
          '<div class="asm-col-comp">' +
          contemplada +
          "</div>" +
          '<div class="asm-col-credito">' +
          r.credito +
          "</div>" +
          '<div class="asm-col-status">' +
          '<span class="hf-badge asm-badge hf-badge--published">Ativa</span></div>' +
          '<div class="asm-col-menu">' +
          actions +
          "</div></div>"
        );
      })
      .join("");

    var head =
      '<span class="asm-col-cota">Cota</span>' +
      '<span class="asm-col-data">Grupo</span>' +
      '<span class="asm-col-admin">Administradora</span>' +
      '<span class="asm-col-comp">Contemplada</span>' +
      '<span class="asm-col-credito">Crédito</span>' +
      '<span class="asm-col-status">Status</span>' +
      '<span class="asm-col-menu">Ações</span>';

    return shell(
      '<div class="crumb">Gestão de Consórcio</div>' +
        '<div class="page-head"><h1>Mauricio Lima CPF</h1><p>Ficha do cliente · 11354444410</p></div>' +
        '<button class="back" type="button" data-go="a6">' +
        ico("left") +
        "Voltar para Clientes</button>" +
        '<div class="kpis">' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Cotas ativas</p><span class="kpi-ico">' +
        ico("hash") +
        '</span></div><p class="value">3</p></div>' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Cotas contempladas</p><span class="kpi-ico ok">' +
        ico("wallet") +
        '</span></div><p class="value">1</p></div>' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Lances aguardando</p><span class="kpi-ico warn">' +
        ico("calendar") +
        '</span></div><p class="value">1</p></div>' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Total em lances</p><span class="kpi-ico hot">' +
        ico("clock") +
        '</span></div><p class="value" style="font-size:22px">R$ 180.000,00</p></div>' +
        "</div>" +
        '<div class="alert-info">' +
        '<img src="' +
        ASM +
        'icon-trophy.svg" alt="" width="20" height="20">' +
        '<div><strong>Cota 2211 contemplada na assembleia de 25/10/2026</strong>' +
        "<span>Os lances vinculados foram atualizados automaticamente pelo resultado publicado.</span></div></div>" +
        '<div class="filters">' +
        searchField("Buscar por cota ou grupo") +
        selectField("grupo", "Grupo", "Todos", ["Todos", "1054", "1021"]) +
        selectField("contemplada", "Contemplada", "Todas", ["Todas", "Sim", "Não"]) +
        "</div>" +
        listTable(head, cotasRows)
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
      '<div class="crumb">Gestão de Consórcio</div>' +
        '<div class="page-head"><h1>Mauricio Lima CPF</h1><p>Ficha do cliente · 11354444410</p></div>' +
        '<button class="back" type="button" data-go="a7">' +
        ico("left") +
        "Voltar para Clientes</button>" +
        '<div class="alert-info">' +
        '<img src="' +
        ASM +
        'icon-trophy.svg" alt="" width="20" height="20">' +
        '<div><strong>Histórico de lances · Cota 2211</strong>' +
        "<span>Grupo 1054 · Turn2C · Contemplada na assembleia de 25/10/2026</span></div></div>" +
        listTable(head, rows) +
        '<div class="next-step">' +
        '<p>Fluxo feliz concluído: da lista até o histórico da cota contemplada.</p>' +
        btn("Voltar ao início", { variant: "hf-btn--primary", foot: true, go: "a1" }) +
        "</div>"
    );
  }

  function confirmHtml() {
    var cotasLabel = selected.join(" e ");
    var contemplados = LANCES.filter(function (l) {
      return selected.indexOf(l.cota) >= 0;
    }).length;
    var nao = LANCES.length - contemplados;
    return (
      '<div class="overlay" id="confirm">' +
      '<div class="dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title">' +
      '<div class="dialog-top">' +
      '<div class="dialog-titles"><h2 id="confirm-title">Publicar resultado da assembleia?</h2>' +
      "<p>Grupo 1054 · Assembleia de 25/10/2026</p></div>" +
      '<button class="x" type="button" data-close-confirm aria-label="Fechar"><img src="' +
      ASM +
      'icon-x-gray.svg" alt="" width="16" height="16"></button></div>' +
      '<div class="dialog-body">' +
      '<div class="dialog-item"><img src="' +
      ASM +
      'icon-circle-check.svg" alt="" width="18" height="18"><p>' +
      selected.length +
      " cotas passam para Contemplada: " +
      cotasLabel +
      ".</p></div>" +
      '<div class="dialog-item"><img src="' +
      ASM +
      'icon-circle-check.svg" alt="" width="18" height="18"><p>' +
      contemplados +
      " lances passam para Contemplado e " +
      nao +
      " lance passa para Não contemplado.</p></div>" +
      '<div class="dialog-item"><img src="' +
      ASM +
      'icon-alert.svg" alt="" width="18" height="18"><p>Depois de publicado, o resultado não é republicado por cima. Correções entram por Ajustar resultado, com registro de quem alterou.</p></div>' +
      "</div>" +
      '<div class="dialog-actions">' +
      btn("Cancelar", { variant: "hf-btn--ghost", foot: true, extra: "data-close-confirm" }) +
      publishBtn({ go: "a6" }) +
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
    var closeToast = e.target.closest("[data-close-toast]");
    var tip = e.target.closest("[data-toast]");

    if (e.target.closest("[data-ms]")) e.stopPropagation();

    if (closeToast) {
      var toastEl = document.getElementById("pub-toast");
      if (toastEl) toastEl.remove();
      return;
    }

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

  window.addEventListener("hashchange", function () {
    var next = (location.hash || "#a1").slice(1);
    if (["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"].indexOf(next) === -1) return;
    if (next === "a3" || next === "a4" || next === "a5" || next === "a6") selected = ["2211", "3307"];
    if (next === "a2") selected = [];
    go(next);
  });

  var start = (location.hash || "#a1").slice(1);
  if (["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"].indexOf(start) === -1) start = "a1";
  if (start === "a3" || start === "a4" || start === "a5" || start === "a6") selected = ["2211", "3307"];
  if (start === "a2") selected = [];
  go(start);
})();
