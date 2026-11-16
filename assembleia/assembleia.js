(function () {
  var ICO = "../assets/icons/";
  var ASM = "assets/";
  var screen = "a1";
  var selected = ["2211", "3307"];
  var sheetOpen = false;
  var confirmOpen = false;
  var histOpen = false;
  var adjustOpen = false;
  var adjustConfirmOpen = false;
  var adjustMsOpen = false;
  var adjustTried = false;
  var adjusted = false;
  var publishedBefore = ["2211", "3307"];
  var adjustCotas = ["2211", "4954"];
  var adjustMotivo = "";
  var overlay = null;
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
    {
      assembleia: "25/10/2026",
      valor: "R$ 60.000,00",
      detalhe: "(30,00%) Lance fixo - Crédito",
      registrado: "24/09/2026",
      status: "cont",
      arquivo: "Mauricio de Lima Couotinho Junior - 1054 - 2211.pdf",
    },
    {
      assembleia: "25/10/2026",
      valor: "R$ 60.000,00",
      detalhe: "(30,00%) Lance fixo - Crédito",
      registrado: "27/09/2026",
      status: "cont",
      arquivo: "Mauricio de Lima Couotinho Junior - 1054 - 2211.pdf",
    },
    {
      assembleia: "01/10/2026",
      valor: "R$ 60.000,00",
      detalhe: "(30,00%) Lance fixo - Crédito",
      registrado: "27/09/2026",
      status: "nao-blue",
      arquivo: "Mauricio de Lima Couotinho Junior - 1054 - 2211.pdf",
    },
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
    } else if (status === "nao-blue") {
      type = "info";
      label = "Não contemplado";
    } else if (status === "cont") {
      type = "published";
      label = "Contemplado";
      withIcon = true;
    } else if (status === "contcota") {
      type = "published";
      label = "Contemplada";
      withIcon = true;
    } else if (status === "mantem") {
      type = "secondary";
      label = "Mantém o status";
    } else if (status === "sub") {
      type = "secondary";
      label = "Substituído";
    } else if (status === "lances") {
      type = "alert";
      label = "4 lances aguardando";
    } else if (status === "atualizados") {
      type = "published";
      label = "4 lances atualizados";
    } else if (status === "cotas") {
      type = "published";
      label = "3 cotas com lance";
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

  function impactStats() {
    var contemplados = LANCES.filter(function (l) {
      return selected.indexOf(l.cota) >= 0;
    }).length;
    var nao = LANCES.length - contemplados;
    return (
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
      "</div>"
    );
  }

  function impactSummary(opts) {
    opts = opts || {};
    if (opts.metricsOnly) {
      return '<div class="impact-summary impact-summary--embed">' + impactStats() + "</div>";
    }
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
      impactStats() +
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

  function publishedCard(opts) {
    opts = opts || {};
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
    var histBtn = adjusted
      ? btn("Ver histórico de alterações", {
          variant: "hf-btn--ghost",
          foot: true,
          icon: "icon-history.svg",
          extra: "data-scroll-adjust-hist",
        })
      : btn("Ver histórico de alterações", {
          variant: "hf-btn--ghost",
          foot: true,
          icon: "icon-history.svg",
          toast: "Ainda não há ajustes neste resultado.",
        });
    return (
      '<div class="card card--published">' +
      '<div class="published-top">' +
      '<div class="published-top__copy">' +
      '<div class="published-title-row">' +
      "<h2>Resultado publicado</h2>" +
      '<span class="hf-badge asm-badge hf-badge--published">Publicada</span></div>' +
      '<p class="lead">Por Lucas Augusto · 25/10/2026 às 16:42</p></div>' +
      '<div class="published-actions">' +
      histBtn +
      btn("Ajustar resultado", {
        variant: "hf-btn--primary",
        foot: true,
        icon: "icon-pencil.svg",
        extra: "data-open-adjust",
      }) +
      "</div></div>" +
      '<div class="published-body">' +
      '<div class="published-cotas">' +
      '<p class="published-kicker">Cotas contempladas</p>' +
      '<div class="published-tags">' +
      (tags || '<span class="published-empty">Nenhuma cota contemplada</span>') +
      "</div></div>" +
      impactSummary({ metricsOnly: true }) +
      "</div>" +
      '<p class="published-foot"><img src="' +
      ASM +
      'icon-circle-check.svg" alt="" width="14" height="14"><span>O resultado não pode ser republicado por cima. Correções entram por ajuste, com registro de quem alterou.</span></p></div>'
    );
  }

  function adjustDiffLines() {
    var added = adjustCotas.filter(function (id) {
      return publishedBefore.indexOf(id) < 0;
    });
    var removed = publishedBefore.filter(function (id) {
      return adjustCotas.indexOf(id) < 0;
    });
    var same = adjustCotas.filter(function (id) {
      return publishedBefore.indexOf(id) >= 0;
    });
    var lines = "";
    added.forEach(function (id) {
      lines +=
        '<p class="adjust-diff__add">+ Cota ' + id + " passa a Contemplada</p>";
    });
    removed.forEach(function (id) {
      lines +=
        '<p class="adjust-diff__rem">- Cota ' + id + " deixa de ser contemplada</p>";
    });
    lines +=
      '<p class="adjust-diff__note">Publicado: cotas ' +
      publishedBefore.join(" e ") +
      (same.length
        ? ". A cota " + same.join(" e ") + " não muda."
        : ".") +
      "</p>";
    return lines;
  }

  function adjustMultiselect() {
    var chips = adjustCotas
      .map(function (id) {
        return (
          '<span class="chip">Cota ' +
          id +
          '<button type="button" class="chip__x" data-remove-adjust="' +
          id +
          '" aria-label="Remover cota ' +
          id +
          '"><img src="' +
          ASM +
          'icon-x-gray.svg" alt="" width="12" height="12"></button></span>'
        );
      })
      .join("");
    return (
      '<div class="ms ms--wide' +
      (adjustMsOpen ? " is-open" : "") +
      '" data-adjust-ms>' +
      '<p class="ms-label">Cotas contempladas *</p>' +
      '<div class="ms-box" role="combobox" tabindex="0" data-adjust-ms-toggle aria-expanded="' +
      (adjustMsOpen ? "true" : "false") +
      '">' +
      (adjustCotas.length
        ? '<span class="chips">' + chips + "</span>"
        : '<span class="placeholder">Selecione as cotas contempladas</span>') +
      '<span class="ms-chevron" aria-hidden="true"><img src="' +
      ICO +
      'select-chevron.svg" alt=""></span></div>' +
      (adjustMsOpen
        ? '<div class="ms-dd" role="listbox" aria-label="Cotas do grupo">' +
          COTAS.map(function (c) {
            var on = adjustCotas.indexOf(c.id) >= 0;
            return (
              '<button class="ms-opt' +
              (on ? " is-on" : "") +
              '" type="button" role="option" aria-selected="' +
              (on ? "true" : "false") +
              '" data-toggle-adjust="' +
              c.id +
              '"><span class="ms-check" aria-hidden="true">' +
              (on
                ? '<img src="' + ICO + 'select-check.svg" alt="" width="10" height="8">'
                : "") +
              '</span><span class="ms-opt__main"><strong>Cota ' +
              c.id +
              "</strong><span>" +
              c.cliente +
              ' · Grupo 1054</span></span><span class="ms-opt__side"><strong>' +
              c.credito +
              "</strong><span>" +
              (c.lances || "") +
              "</span></span></button>"
            );
          }).join("") +
          "</div>"
        : "") +
      '<div class="adjust-diff">' +
      adjustDiffLines() +
      "</div></div>"
    );
  }

  function adjustModalHtml() {
    var motivoInvalid = adjustTried && !String(adjustMotivo || "").trim();
    var canReview =
      adjustCotas.length > 0 && String(adjustMotivo || "").trim().length > 0;
    return (
      '<div class="overlay" id="adjust-modal">' +
      '<div class="dialog dialog--adjust" role="dialog" aria-modal="true" aria-labelledby="adjust-title">' +
      '<div class="dialog-top"><div class="dialog-titles"><h2 id="adjust-title">Ajustar resultado da assembleia</h2>' +
      "<p>Altere a lista de cotas contempladas. Os lances são recalculados pela mesma regra da publicação.</p></div>" +
      '<button class="x" type="button" data-close-adjust aria-label="Fechar"><img src="' +
      ASM +
      'icon-x-gray.svg" alt="" width="16" height="16"></button></div>' +
      '<div class="adjust-warn"><img src="' +
      ASM +
      'icon-alert.svg" alt="" width="16" height="16"><span>O ajuste altera cotas e lances já publicados e fica registrado com seu nome, data e motivo.</span></div>' +
      adjustMultiselect() +
      '<label class="adjust-motivo' +
      (motivoInvalid ? " is-invalid" : "") +
      '"><span class="ms-label">Motivo do ajuste *</span>' +
      '<textarea data-adjust-motivo placeholder="Descreva por que o resultado precisa mudar" rows="3">' +
      (adjustMotivo || "") +
      "</textarea>" +
      (motivoInvalid
        ? '<span class="adjust-motivo__err">Informe o motivo para continuar</span>'
        : "") +
      "</label>" +
      '<div class="dialog-actions">' +
      btn("Cancelar", { variant: "hf-btn--ghost", foot: true, extra: "data-close-adjust" }) +
      btn("Revisar ajuste", {
        variant: "hf-btn--primary",
        foot: true,
        icon: "icon-arrow-right.svg",
        extra: "data-review-adjust" + (canReview ? "" : " aria-disabled=\"true\""),
      }) +
      "</div></div></div>"
    );
  }

  function confirmAdjustHtml() {
    var clients = {
      "2211": "Mauricio Lima CPF",
      "4954": "Mauricio Lima CPF",
      "3307": "Raniele Karolina",
      "4001": "Sem lance nesta assembleia",
    };
    var ids = [];
    publishedBefore.concat(adjustCotas).forEach(function (id) {
      if (ids.indexOf(id) < 0) ids.push(id);
    });
    var rows = ids
      .map(function (id) {
        var beforeOn = publishedBefore.indexOf(id) >= 0;
        var afterOn = adjustCotas.indexOf(id) >= 0;
        var beforeBadge = beforeOn
          ? '<span class="hf-badge asm-badge hf-badge--published">Contemplada</span>'
          : '<span class="hf-badge asm-badge hf-badge--secondary">Mantém o status</span>';
        var afterBadge = afterOn
          ? '<span class="hf-badge asm-badge hf-badge--published">Contemplada</span>'
          : '<span class="hf-badge asm-badge hf-badge--secondary">Mantém o status</span>';
        return (
          '<div class="adjust-diff-row">' +
          '<div class="adjust-diff-row__who"><strong>Cota ' +
          id +
          "</strong><span>" +
          (clients[id] || "") +
          "</span></div>" +
          '<div class="adjust-diff-row__before">' +
          beforeBadge +
          '</div><img src="' +
          ASM +
          'icon-arrow-right.svg" alt="" width="16" height="16">' +
          '<div class="adjust-diff-row__after">' +
          afterBadge +
          "</div></div>"
        );
      })
      .join("");
    return (
      '<div class="overlay" id="adjust-confirm">' +
      '<div class="dialog dialog--adjust-confirm" role="dialog" aria-modal="true" aria-labelledby="adjust-confirm-title">' +
      '<div class="dialog-top"><div class="dialog-titles"><h2 id="adjust-confirm-title">Confirmar ajuste do resultado</h2>' +
      "<p>O que muda ao confirmar</p></div>" +
      '<button class="x" type="button" data-close-adjust-confirm aria-label="Fechar"><img src="' +
      ASM +
      'icon-x-gray.svg" alt="" width="16" height="16"></button></div>' +
      '<div class="adjust-diff-table"><div class="adjust-diff-table__head"><span>Cota e cliente</span><span>Antes</span><span></span><span>Depois</span></div>' +
      rows +
      "</div>" +
      '<p class="adjust-confirm-motivo"><strong>Motivo informado</strong><span>Motivo: ' +
      (adjustMotivo || "") +
      "</span></p>" +
      '<div class="dialog-actions">' +
      btn("Voltar", { variant: "hf-btn--ghost", foot: true, extra: "data-back-adjust" }) +
      btn("Confirmar ajuste", {
        variant: "hf-btn--primary",
        foot: true,
        icon: "icon-send.svg",
        extra: "data-confirm-adjust",
      }) +
      "</div></div></div>"
    );
  }

  function adjustHistorySection() {
    if (!adjusted) return "";
    return (
      '<div class="adjust-hist" id="adjust-hist">' +
      '<div class="section-head"><h3>Histórico de alterações</h3></div>' +
      '<article class="adjust-hist__card">' +
      '<div class="adjust-hist__top"><strong>Ajuste</strong>' +
      '<span class="hf-badge asm-badge hf-badge--info">Publicação</span></div>' +
      "<p>Cota 4954 passou para Contemplada. Cota 3307 deixou de ser contemplada. Motivo: " +
      (adjustMotivo ||
        "Cota 4954 foi contemplada por sorteio e a 3307 entrou por engano.") +
      "</p>" +
      "<span>Lucas Augusto · 25/10/2026 às 17:10</span></article></div>"
    );
  }

  function publishedPage(opts) {
    opts = opts || {};
    var toastHtml = "";
    if (opts.toast === "published") {
      toastHtml =
        '<div class="asm-toast" id="pub-toast" role="status">' +
        '<img src="' +
        ASM +
        'icon-circle-check.svg" alt="" width="20" height="20">' +
        '<div class="asm-toast__text"><strong>Resultado publicado</strong><span>2 cotas contempladas e 4 lances atualizados.</span></div>' +
        '<button type="button" class="asm-toast__x" data-close-toast aria-label="Fechar"><img src="' +
        ASM +
        'icon-x-gray.svg" alt="" width="14" height="14"></button></div>';
    } else if (opts.toast === "published-empty") {
      toastHtml =
        '<div class="asm-toast" id="pub-toast" role="status">' +
        '<img src="' +
        ASM +
        'icon-circle-check.svg" alt="" width="20" height="20">' +
        '<div class="asm-toast__text"><strong>Resultado publicado</strong><span>Nenhuma cota contemplada. 4 lances atualizados para Não contemplado.</span></div>' +
        '<button type="button" class="asm-toast__x" data-close-toast aria-label="Fechar"><img src="' +
        ASM +
        'icon-x-gray.svg" alt="" width="14" height="14"></button></div>';
    } else if (opts.toast === "adjusted") {
      toastHtml =
        '<div class="asm-toast" id="pub-toast" role="status">' +
        '<img src="' +
        ASM +
        'icon-circle-check.svg" alt="" width="20" height="20">' +
        '<div class="asm-toast__text"><strong>Resultado ajustado</strong><span>Cotas e lances atualizados com o novo resultado.</span></div>' +
        '<button type="button" class="asm-toast__x" data-close-toast aria-label="Fechar"><img src="' +
        ASM +
        'icon-x-gray.svg" alt="" width="14" height="14"></button></div>';
    }
    var next =
      opts.hideNext
        ? ""
        : '<div class="next-step"><p>Confira a cota contemplada na ficha do cliente Mauricio Lima.</p>' +
          btn("Abrir ficha do cliente", {
            variant: "hf-btn--primary",
            foot: true,
            icon: "icon-arrow-right.svg",
            go: "a7",
          }) +
          "</div>";
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
          "4 lances · R$ 240.000,00</span></div>" +
          publishedCard(opts) +
          adjustHistorySection() +
          '<div class="section-head"><h3>Cotas da assembleia</h3>' +
          badge("cotas") +
          "</div>" +
          cotasAssembleiaTable() +
          '<div class="section-head"><h3>Lances desta assembleia</h3>' +
          badge("atualizados") +
          "</div>" +
          lancesTable("done") +
          next
      ) + toastHtml
    );
  }

  function multiselectDropdown(opts) {
    opts = opts || {};
    var emptySearch = !!opts.emptySearch;
    var searchVal = emptySearch ? "9999" : "";
    var optionsHtml = emptySearch
      ? '<div class="ms-empty" role="status">' +
        '<img src="' +
        ASM +
        'icon-alert.svg" alt="" width="20" height="20">' +
        "<div><strong>Nenhuma cota encontrada no grupo 1054</strong>" +
        "<span>Só é possível contemplar cotas já cadastradas neste grupo. Confira o número ou cadastre a cota antes de publicar.</span></div></div>"
      : COTAS.map(function (c) {
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
        }).join("");
    return (
      '<div class="ms-dd" role="listbox" aria-label="Cotas do grupo">' +
      '<div class="ms-dd__search"><img src="' +
      ICO +
      'search.svg" alt="" width="16" height="16"><input type="search" placeholder="Buscar cota ou cliente..." data-ms-search aria-label="Buscar cota ou cliente" value="' +
      searchVal +
      '"></div>' +
      optionsHtml +
      '<div class="ms-dd__foot"><span>' +
      selected.length +
      ' cotas selecionadas</span><button type="button" class="ms-dd__clear" data-clear-cotas>Limpar seleção</button></div></div>'
    );
  }

  function comprovanteModalHtml() {
    return (
      '<div class="overlay" id="comp-modal">' +
      '<div class="dialog dialog--comp" role="dialog" aria-modal="true" aria-labelledby="comp-title">' +
      '<div class="dialog-top"><div class="dialog-titles"><h2 id="comp-title">Comprovante do lance</h2>' +
      "<p>Cota 2211 · Mauricio Lima CPF · Registrado em 24/09/2026</p></div>" +
      '<button class="x" type="button" data-close-comp aria-label="Fechar"><img src="' +
      ASM +
      'icon-x-gray.svg" alt="" width="16" height="16"></button></div>' +
      '<div class="comp-preview"><div class="comp-preview__sheet">' +
      "<strong>Mauricio de Lima Coutinho Junior</strong>" +
      "<span>Grupo 1054 · Cota 2211</span>" +
      "<span>Lance fixo · R$ 60.000,00 (30,00%)</span>" +
      "<span>Arquivo: Mauricio-1054-2211.pdf</span></div></div>" +
      '<div class="dialog-actions">' +
      btn("Fechar", { variant: "hf-btn--ghost", foot: true, extra: "data-close-comp" }) +
      btn("Baixar PDF", { variant: "hf-btn--primary", foot: true, toast: "Download ilustrativo neste protótipo." }) +
      "</div></div></div>"
    );
  }

  function cotaModalHtml() {
    var cont = selected.indexOf("2211") >= 0;
    return (
      '<div class="overlay" id="cota-modal">' +
      '<div class="dialog dialog--cota" role="dialog" aria-modal="true" aria-labelledby="cota-title">' +
      '<div class="dialog-top"><div class="dialog-titles"><h2 id="cota-title">Cota 2211</h2>' +
      "<p>Mauricio Lima CPF · Grupo 1054 · Turn2C</p></div>" +
      '<button class="x" type="button" data-close-cota aria-label="Fechar"><img src="' +
      ASM +
      'icon-x-gray.svg" alt="" width="16" height="16"></button></div>' +
      '<div class="cota-grid">' +
      '<div><span>Crédito</span><strong>R$ 120.000,00</strong></div>' +
      "<div><span>Status</span>" +
      (cont
        ? '<span class="hf-badge asm-badge hf-badge--published">Contemplada</span>'
        : '<span class="hf-badge asm-badge hf-badge--secondary">Ativa</span>') +
      "</div>" +
      "<div><span>Lances nesta assembleia</span><strong>2</strong></div>" +
      "<div><span>Total em lances</span><strong>R$ 120.000,00</strong></div></div>" +
      '<div class="dialog-actions">' +
      btn("Ver histórico de lances", {
        variant: "hf-btn--ghost",
        foot: true,
        icon: "icon-history.svg",
        extra: "data-open-hist",
      }) +
      btn("Fechar", { variant: "hf-btn--primary", foot: true, extra: "data-close-cota" }) +
      "</div></div></div>"
    );
  }

  function editCotaModalHtml() {
    return (
      '<div class="overlay" id="edit-cota-modal">' +
      '<div class="dialog dialog--cota" role="dialog" aria-modal="true" aria-labelledby="edit-cota-title">' +
      '<div class="dialog-top"><div class="dialog-titles"><h2 id="edit-cota-title">Editar cota 2211</h2>' +
      "<p>Dados cadastrais da cota. O desfecho de assembleia continua sendo alterado só por Ajustar resultado.</p></div>" +
      '<button class="x" type="button" data-close-edit-cota aria-label="Fechar"><img src="' +
      ASM +
      'icon-x-gray.svg" alt="" width="16" height="16"></button></div>' +
      '<div class="edit-cota-fields">' +
      '<label><span>Número da cota</span><input type="text" value="2211" readonly></label>' +
      '<label><span>Grupo</span><input type="text" value="1054" readonly></label>' +
      '<label><span>Crédito</span><input type="text" value="R$ 120.000,00"></label>' +
      '<label><span>Observação</span><textarea rows="3" placeholder="Opcional">Cota ativa no grupo 1054</textarea></label></div>' +
      '<div class="dialog-actions">' +
      btn("Cancelar", { variant: "hf-btn--ghost", foot: true, extra: "data-close-edit-cota" }) +
      btn("Salvar alterações", {
        variant: "hf-btn--primary",
        foot: true,
        extra: "data-save-edit-cota",
      }) +
      "</div></div></div>"
    );
  }

  function actionBtn(g) {
    if (g.action === "publish") {
      return btn("Publicar resultado", {
        variant: "hf-btn--ghost",
        action: true,
        go: "a2",
        extra: 'data-group="' + g.id + '"',
      });
    }
    if (g.action === "view") {
      return btn("Ver resultado", {
        variant: "hf-btn--ghost",
        action: true,
        go: "a6",
      });
    }
    return btn("Ver detalhes", {
      variant: "hf-btn--ghost",
      action: true,
      toast: "Este grupo não tem lances aguardando assembleia.",
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
      ["Dashboard", ASM + "tab-dashboard.svg", null],
      ["Clientes", ASM + "tab-users.svg", "a7"],
      ["Grupos", ASM + "tab-layers.svg", null],
      ["Cotas", ASM + "tab-wallet.svg", "d3"],
      ["Assembleias", ASM + "tab-calendar.svg", "a1"],
      ["Lembretes", ASM + "tab-bell.svg", null],
    ];
    return (
      '<div class="hf-tabs asm-tabs" data-tabs role="tablist">' +
      items
        .map(function (it) {
          var on = it[0] === active;
          var src = on ? ASM + "tab-icon.svg" : it[1];
          if (on && it[0] === "Assembleias") src = ASM + "tab-calendar.svg";
          if (on && it[0] === "Cotas") src = ASM + "tab-wallet.svg";
          var jump = it[2] ? ' data-go="' + it[2] + '"' : "";
          return (
            '<button class="hf-tab' +
            (on ? " is-active" : "") +
            '" type="button" role="tab" aria-selected="' +
            (on ? "true" : "false") +
            '"' +
            jump +
            '><span class="hf-tab__ico"><img src="' +
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

  function cotasAssembleiaTable() {
    var rowsData = [
      { cliente: "Mauricio Lima CPF", doc: "11354446410", cota: "2211", lances: "2 lances", valor: "R$ 120.000,00", go: "a7" },
      { cliente: "Mauricio Lima CPF", doc: "11354446410", cota: "4954", lances: "1 lance", valor: "R$ 60.000,00" },
      { cliente: "Raniele Karolina", doc: "13062079470", cota: "3307", lances: "1 lance", valor: "R$ 60.000,00", go: "a7" },
    ].map(function (r) {
      r.st = selected.indexOf(r.cota) >= 0 ? "contcota" : "mantem";
      return r;
    });
    var head =
      '<span class="asm-col-grupo">Cliente</span>' +
      '<span class="asm-col-cota">Cota</span>' +
      '<span class="asm-col-tipo">Lances</span>' +
      '<span class="asm-col-vlance">Valor dos lances</span>' +
      '<span class="asm-col-reg">Assembleia</span>' +
      '<span class="asm-col-comp">Consulta</span>' +
      '<span class="asm-col-status-lg">Status da cota</span>';
    var rows = rowsData
      .map(function (r) {
        var name = r.go
          ? '<button class="linkish cell-name" type="button" data-go="' + r.go + '">' + r.cliente + "</button>"
          : "<strong>" + r.cliente + "</strong>";
        var histAttr =
          r.st === "contcota"
            ? " data-open-hist"
            : ' data-toast="Histórico ilustrativo neste protótipo."';
        return (
          '<div class="asm-list__row' +
          (r.st === "contcota" ? " is-highlight" : "") +
          '">' +
          '<div class="asm-col-grupo"><div class="cell-stack">' +
          name +
          "<span>" +
          r.doc +
          "</span></div></div>" +
          '<div class="asm-col-cota"><strong>' +
          r.cota +
          "</strong></div>" +
          '<div class="asm-col-tipo">' +
          r.lances +
          "</div>" +
          '<div class="asm-col-vlance">' +
          r.valor +
          "</div>" +
          '<div class="asm-col-reg">25/10/2026</div>' +
          '<div class="asm-col-comp"><button class="linkish" type="button"' +
          histAttr +
          '>Histórico de lances <img src="' +
          ASM +
          'icon-eye.svg" alt="" width="14" height="14"></button></div>' +
          '<div class="asm-col-status-lg">' +
          badge(r.st) +
          "</div></div>"
        );
      })
      .join("");
    return listTable(head, rows);
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
      if (lancesStatusMode === "done") st = selected.indexOf(l.cota) >= 0 ? "cont" : "nao-blue";
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
        '<div class="asm-col-comp"><button class="linkish" type="button" data-open-comp>Ver comprovante <img src="' +
        ASM +
        'icon-eye.svg" alt="" width="14" height="14"></button></div>' +
        '<div class="asm-col-status-lg">' +
        badge(st) +
        "</div></div>"
      );
    }).join("");
    return listTable(head, rows);
  }

  function detailChrome(extraCard, lancesStatusMode, opts) {
    opts = opts || {};
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
      '<p class="ms-label" id="ms-cotas-label">Cotas contempladas</p>' +
      '<div class="ms-box" role="combobox" tabindex="0" data-ms-toggle aria-labelledby="ms-cotas-label" aria-expanded="' +
      (sheetOpen ? "true" : "false") +
      '" aria-haspopup="listbox">' +
      (selected.length
        ? '<span class="chips">' + chips + "</span>"
        : '<span class="placeholder">Selecione as cotas contempladas</span>') +
      '<span class="ms-chevron" aria-hidden="true"><img src="' +
      ICO +
      'select-chevron.svg" alt=""></span>' +
      "</div>" +
      (sheetOpen ? multiselectDropdown({ emptySearch: !!opts.emptySearch }) : "") +
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
          "Selecione as cotas contempladas ou publique sem contempladas, se essa for a decisão oficial.",
          btn("Cancelar", { variant: "hf-btn--ghost", foot: true, go: "a1" }) +
            publishBtn({ go: "b1" })
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
              go: selected.length ? "a4" : "b1",
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

  function a9() {
    sheetOpen = true;
    if (!selected.length) selected = ["2211", "3307"];
    return shell(
      detailHead() +
        detailChrome("", "wait", { emptySearch: true }) +
        footBar(
          "Só cotas cadastradas no grupo entram no resultado. Ajuste a busca ou cadastre a cota antes de publicar.",
          btn("Cancelar", { variant: "hf-btn--ghost", foot: true, go: "a1" }) +
            publishBtn({ go: selected.length ? "a4" : "b1" })
        )
    );
  }

  function b1() {
    selected = [];
    sheetOpen = false;
    adjusted = false;
    return shell(
      detailHead() +
        detailChrome(impactSummary(), "preview") +
        footBar(
          "Nenhuma cota contemplada. Todos os lances desta assembleia passam para Não contemplado.",
          btn("Cancelar", { variant: "hf-btn--ghost", foot: true, go: "a1" }) +
            publishBtn({ extra: 'data-confirm-empty="1"' })
        )
    );
  }

  function b2() {
    return b1() + confirmEmptyHtml();
  }

  function b3() {
    selected = [];
    adjusted = false;
    return publishedPage({
      toast: "published-empty",
      hideNext: true,
    });
  }

  function a6() {
    confirmOpen = false;
    sheetOpen = false;
    adjustOpen = false;
    adjustConfirmOpen = false;
    if (!adjusted) selected = ["2211", "3307"];
    return publishedPage({ toast: "published" });
  }

  function beginAdjust() {
    publishedBefore = selected.slice();
    adjustCotas = ["2211", "4954"];
    adjustMotivo = "";
    adjustTried = true;
    adjustMsOpen = false;
    adjustOpen = true;
    adjustConfirmOpen = false;
  }

  function c1() {
    adjustOpen = false;
    adjustConfirmOpen = false;
    if (!adjusted) selected = ["2211", "3307"];
    return publishedPage({ hideNext: false });
  }

  function c2() {
    if (!adjustOpen) beginAdjust();
    adjustOpen = true;
    adjustConfirmOpen = false;
    selected = publishedBefore.slice();
    return publishedPage({ hideNext: true }) + adjustModalHtml();
  }

  function c3() {
    adjustOpen = false;
    adjustConfirmOpen = true;
    selected = publishedBefore.slice();
    return publishedPage({ hideNext: true }) + confirmAdjustHtml();
  }

  function c4() {
    adjustOpen = false;
    adjustConfirmOpen = false;
    adjusted = true;
    selected = adjustCotas.slice();
    if (!adjustMotivo) {
      adjustMotivo =
        "Cota 4954 foi contemplada por sorteio e a 3307 entrou por engano.";
    }
    return publishedPage({ toast: "adjusted", hideNext: false });
  }

  function d1() {
    if (!adjusted) selected = ["2211", "3307"];
    return publishedPage({ hideNext: false });
  }

  function d2() {
    histOpen = true;
    return d1() + historicoModalHtml();
  }

  function d3() {
    var rows = [
      { cota: "2211", cliente: "Mauricio Lima CPF", doc: "11354446410", grupo: "1054", admin: "Turn2C", credito: "R$ 120.000,00", cont: true },
      { cota: "4954", cliente: "Mauricio Lima CPF", doc: "11354446410", grupo: "1054", admin: "Turn2C", credito: "R$ 60.000,00", cont: selected.indexOf("4954") >= 0 },
      { cota: "3307", cliente: "Raniele Karolina", doc: "13062079470", grupo: "1054", admin: "Turn2C", credito: "R$ 60.000,00", cont: selected.indexOf("3307") >= 0 },
      { cota: "1188", cliente: "Ana Souza", doc: "02988733400", grupo: "9001", admin: "Embracon", credito: "R$ 80.000,00", cont: false },
    ]
      .map(function (r) {
        var contBadge = r.cont
          ? '<span class="hf-badge asm-badge hf-badge--published"><span class="hf-badge__ico"><img src="' +
            ASM +
            'icon-trophy.svg" alt=""></span>Contemplada</span>'
          : '<span class="hf-badge asm-badge hf-badge--secondary">Não contemplada</span>';
        return (
          '<div class="asm-list__row' +
          (r.cont ? " is-highlight" : "") +
          '">' +
          '<div class="asm-col-grupo"><div class="cell-stack"><button class="linkish cell-name" type="button" data-go="a7">' +
          r.cliente +
          "</button><span>" +
          r.doc +
          "</span></div></div>" +
          '<div class="asm-col-cota"><strong>' +
          r.cota +
          "</strong></div>" +
          '<div class="asm-col-tipo">' +
          r.grupo +
          "</div>" +
          '<div class="asm-col-vlance">' +
          r.admin +
          "</div>" +
          '<div class="asm-col-reg">' +
          r.credito +
          '</div><div class="asm-col-comp"><button class="linkish" type="button" data-open-hist>Histórico de lances <img src="' +
          ASM +
          'icon-eye.svg" alt="" width="14" height="14"></button></div>' +
          '<div class="asm-col-status-lg">' +
          contBadge +
          "</div></div>"
        );
      })
      .join("");
    var head =
      '<span class="asm-col-grupo">Cliente</span>' +
      '<span class="asm-col-cota">Cota</span>' +
      '<span class="asm-col-tipo">Grupo</span>' +
      '<span class="asm-col-vlance">Administradora</span>' +
      '<span class="asm-col-reg">Crédito</span>' +
      '<span class="asm-col-comp">Consulta</span>' +
      '<span class="asm-col-status-lg">Status</span>';
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> <b>Cotas</b></div>' +
        '<div class="page-head"><h1>Cotas</h1><p>Status das cotas a partir do resultado publicado</p></div>' +
        tabs("Cotas") +
        '<div class="filters">' +
        searchField("Buscar por cota ou cliente...") +
        selectField("grupo", "Grupo", "Todos", ["Todos", "1054", "9001"]) +
        selectField("status", "Status", "Todas", ["Todas", "Contemplada", "Não contemplada"]) +
        "</div>" +
        listTable(head, rows)
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
              '<button type="button" role="menuitem" data-open-cota><img src="' +
              ASM +
              'icon-eye.svg" alt="" width="14" height="14">Ver cota</button>' +
              '<button type="button" role="menuitem" class="is-on" data-open-hist><img src="' +
              ASM +
              'icon-history.svg" alt="" width="14" height="14">Histórico de lances</button>' +
              '<button type="button" role="menuitem" data-open-edit-cota><img src="' +
              ASM +
              'icon-pencil.svg" alt="" width="14" height="14">Editar cota</button></div>'
            : "") +
          "</div>";
        return (
          '<div class="asm-list__row' +
          (r.sim ? " is-highlight" : "") +
          '">' +
          '<div class="asm-col-ficha-cota"><strong>' +
          r.cota +
          "</strong></div>" +
          '<div class="asm-col-ficha-grupo">' +
          r.grupo +
          "</div>" +
          '<div class="asm-col-ficha-admin">' +
          r.admin +
          "</div>" +
          '<div class="asm-col-ficha-cont">' +
          contemplada +
          "</div>" +
          '<div class="asm-col-ficha-credito">' +
          r.credito +
          "</div>" +
          '<div class="asm-col-ficha-status">' +
          '<span class="hf-badge asm-badge hf-badge--published">Ativa</span></div>' +
          '<div class="asm-col-ficha-menu">' +
          actions +
          "</div></div>"
        );
      })
      .join("");

    var head =
      '<span class="asm-col-ficha-cota">Cota</span>' +
      '<span class="asm-col-ficha-grupo">Grupo</span>' +
      '<span class="asm-col-ficha-admin">Administradora</span>' +
      '<span class="asm-col-ficha-cont">Contemplada</span>' +
      '<span class="asm-col-ficha-credito">Crédito</span>' +
      '<span class="asm-col-ficha-status">Status</span>' +
      '<span class="asm-col-ficha-menu">Ações</span>';

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
        '<div class="alert-info__text"><strong>Cota 2211 contemplada na assembleia de 25/10/2026</strong>' +
        "<span>Os lances vinculados foram atualizados automaticamente pelo resultado publicado.</span></div></div>" +
        '<div class="filters filters--ficha">' +
        searchField("Buscar por cota ou grupo") +
        selectField("grupo", "Grupo", "Todos", ["Todos", "1054", "1021"]) +
        selectField("contemplada", "Contemplada", "Todas", ["Todas", "Sim", "Não"]) +
        "</div>" +
        listTable(head, cotasRows)
    );
  }

  function historicoModalHtml() {
    var cards = HIST.map(function (h) {
      var statusLabel = h.status === "cont" ? "Contemplado" : "Não contemplado";
      var badgeHtml =
        h.status === "cont"
          ? '<span class="hf-badge asm-badge hf-badge--published">' + statusLabel + "</span>"
          : '<span class="hf-badge asm-badge hf-badge--info">' + statusLabel + "</span>";
      return (
        '<article class="hist-card">' +
        '<p class="hist-card__meta">Assembleia: ' +
        h.assembleia +
        "</p>" +
        '<div class="hist-card__valor"><strong>' +
        h.valor +
        "</strong><span>" +
        h.detalhe +
        "</span></div>" +
        '<p class="hist-card__meta">Registrado em ' +
        h.registrado +
        " por Mauricio Lima</p>" +
        '<div class="hist-card__file"><span>' +
        h.arquivo +
        '</span><button class="hf-btn hf-btn--ghost hist-card__comp" type="button" data-open-comp><img src="' +
        ASM +
        'icon-eye.svg" alt="" width="16" height="16">Ver comprovante</button></div>' +
        '<div class="hist-card__status">' +
        badgeHtml +
        '<div class="hist-card__select" aria-hidden="true"><span>' +
        statusLabel +
        '</span><img src="' +
        ICO +
        'select-chevron.svg" alt=""></div></div></article>'
      );
    }).join("");

    return (
      '<div class="overlay overlay--hist" id="hist-modal">' +
      '<div class="dialog dialog--hist" role="dialog" aria-modal="true" aria-labelledby="hist-title">' +
      '<div class="dialog-top">' +
      '<div class="dialog-titles"><h2 id="hist-title">Histórico de lances da cota 2211</h2>' +
      "<p>Grupo 1054 · Mauricio Lima CPF</p></div>" +
      '<button class="x" type="button" data-close-hist aria-label="Fechar"><img src="' +
      ASM +
      'icon-x-gray.svg" alt="" width="16" height="16"></button></div>' +
      '<div class="hist-list">' +
      cards +
      "</div>" +
      '<div class="hist-lock"><img src="' +
      ASM +
      'icon-lock.svg" alt="" width="14" height="14">' +
      "<span>Status definido pela assembleia de 25/10/2026 · </span>" +
      '<button class="linkish" type="button" data-go="a6">Ver assembleia</button></div>' +
      '<div class="dialog-actions">' +
      btn("Fechar", { variant: "hf-btn--ghost", foot: true, extra: "data-close-hist" }) +
      "</div></div></div>"
    );
  }

  function a8() {
    histOpen = true;
    return a7() + historicoModalHtml();
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

  function confirmEmptyHtml() {
    return (
      '<div class="overlay" id="confirm-empty">' +
      '<div class="dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-empty-title">' +
      '<div class="dialog-top">' +
      '<div class="dialog-titles"><h2 id="confirm-empty-title">Publicar sem cotas contempladas?</h2>' +
      "<p>Grupo 1054 · Assembleia de 25/10/2026</p></div>" +
      '<button class="x" type="button" data-close-confirm-empty aria-label="Fechar"><img src="' +
      ASM +
      'icon-x-gray.svg" alt="" width="16" height="16"></button></div>' +
      '<div class="dialog-body">' +
      '<div class="dialog-item"><img src="' +
      ASM +
      'icon-alert.svg" alt="" width="18" height="18"><p>Nenhuma cota será marcada como Contemplada nesta publicação.</p></div>' +
      '<div class="dialog-item"><img src="' +
      ASM +
      'icon-circle-check.svg" alt="" width="18" height="18"><p>Os 4 lances aguardando esta assembleia passam para Não contemplado.</p></div>' +
      '<div class="dialog-item"><img src="' +
      ASM +
      'icon-alert.svg" alt="" width="18" height="18"><p>Depois de publicado, o resultado não é republicado por cima. Correções entram por Ajustar resultado.</p></div>' +
      "</div>" +
      '<div class="dialog-actions">' +
      btn("Cancelar", { variant: "hf-btn--ghost", foot: true, extra: "data-close-confirm-empty" }) +
      publishBtn({ go: "b3" }) +
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
      function refreshMsEmpty() {
        var q = msSearch.value.toLowerCase().trim();
        var opts = document.querySelectorAll(".ms-opt");
        var visible = 0;
        opts.forEach(function (opt) {
          var text = (opt.getAttribute("data-ms-label") || "").toLowerCase();
          var hide = !!(q && text.indexOf(q) === -1);
          opt.hidden = hide;
          if (!hide) visible += 1;
        });
        var empty = document.querySelector(".ms-empty");
        if (empty && opts.length) empty.hidden = visible > 0 || !q;
      }
      msSearch.addEventListener("input", refreshMsEmpty);
      msSearch.addEventListener("click", function (event) {
        event.stopPropagation();
      });
      if (msSearch.value) refreshMsEmpty();
    }
    var motivo = document.querySelector("[data-adjust-motivo]");
    if (motivo) {
      motivo.addEventListener("click", function (event) {
        event.stopPropagation();
      });
      motivo.addEventListener("input", function () {
        adjustMotivo = motivo.value;
      });
    }
  }

  function paint() {
    sheetOpen = screen === "a3" || screen === "a9";
    confirmOpen = screen === "a5" || screen === "b2";
    histOpen = screen === "a8" || screen === "d2";
    adjustOpen = screen === "c2";
    adjustConfirmOpen = screen === "c3";
    var map = {
      a1: a1,
      a2: a2,
      a3: a3,
      a4: a4,
      a5: a5,
      a6: a6,
      a7: a7,
      a8: a8,
      a9: a9,
      b1: b1,
      b2: b2,
      b3: b3,
      c1: c1,
      c2: c2,
      c3: c3,
      c4: c4,
      d1: d1,
      d2: d2,
      d3: d3,
    };
    var html = (map[screen] || a1)();
    if (overlay === "comp") html += comprovanteModalHtml();
    if (overlay === "cota") html += cotaModalHtml();
    if (overlay === "edit") html += editCotaModalHtml();
    document.getElementById("app").innerHTML = html;
    document.querySelectorAll(".proto button").forEach(function (b) {
      var jump = b.getAttribute("data-jump");
      b.classList.toggle(
        "is-on",
        jump === screen ||
          (jump === "a7" && screen === "a8") ||
          (jump === "d1" && screen === "d2") ||
          (jump === "c1" && (screen === "c2" || screen === "c3")) ||
          (jump === "b1" && screen === "b2")
      );
    });
    if (location.hash !== "#" + screen) history.replaceState(null, "", "#" + screen);
    wireAll();
  }

  function go(next) {
    screen = next;
    if (
      ["a1", "a2", "a3", "a4", "a5", "a6", "a9", "b1", "b2", "b3", "c1", "c2", "c3", "c4", "d1", "d3"].indexOf(
        next
      ) >= 0
    ) {
      overlay = null;
    }
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
    if (screen === "a9") {
      go(selected.length ? "a4" : "a2");
      return;
    }
    if (screen === "a3") go(selected.length ? "a4" : "a2");
  }

  document.addEventListener("click", function (e) {
    closeSelects(null);
    if ((screen === "a3" || screen === "a9") && !e.target.closest("[data-ms]")) closeMsDropdown();
    if (screen === "c2" && adjustMsOpen && !e.target.closest("[data-adjust-ms]")) {
      adjustMsOpen = false;
      paint();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSelects(null);
      if (overlay) {
        overlay = null;
        paint();
        return;
      }
      closeMsDropdown();
      if (screen === "b2") {
        go("b1");
        return;
      }
      if (screen === "c3") {
        go("c2");
        return;
      }
      if (screen === "c2" || adjustOpen) {
        go("c1");
        return;
      }
      if (screen === "d2") {
        go("d1");
        return;
      }
      if (screen === "a8" || histOpen) {
        go("a7");
        return;
      }
      return;
    }
    if (
      event.target.matches("[data-ms-toggle]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      event.target.click();
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
    var openHist = e.target.closest("[data-open-hist]");
    var closeHist = e.target.closest("[data-close-hist]");
    var openAdjust = e.target.closest("[data-open-adjust]");
    var closeAdjust = e.target.closest("[data-close-adjust]");
    var reviewAdjust = e.target.closest("[data-review-adjust]");
    var backAdjust = e.target.closest("[data-back-adjust]");
    var confirmAdjust = e.target.closest("[data-confirm-adjust]");
    var closeAdjustConfirm = e.target.closest("[data-close-adjust-confirm]");
    var toggleAdjust = e.target.closest("[data-toggle-adjust]");
    var removeAdjust = e.target.closest("[data-remove-adjust]");
    var adjustMsToggle = e.target.closest("[data-adjust-ms-toggle]");
    var scrollAdjustHist = e.target.closest("[data-scroll-adjust-hist]");
    var closeToast = e.target.closest("[data-close-toast]");
    var openComp = e.target.closest("[data-open-comp]");
    var closeComp = e.target.closest("[data-close-comp]");
    var openCota = e.target.closest("[data-open-cota]");
    var closeCota = e.target.closest("[data-close-cota]");
    var openEditCota = e.target.closest("[data-open-edit-cota]");
    var closeEditCota = e.target.closest("[data-close-edit-cota]");
    var saveEditCota = e.target.closest("[data-save-edit-cota]");
    var confirmEmpty = e.target.closest("[data-confirm-empty]");
    var closeConfirmEmpty = e.target.closest("[data-close-confirm-empty]");
    var tip = e.target.closest("[data-toast]");

    if (e.target.closest("[data-ms]") || e.target.closest("[data-adjust-ms]")) e.stopPropagation();

    if (closeToast) {
      var toastEl = document.getElementById("pub-toast");
      if (toastEl) toastEl.remove();
      return;
    }

    if (scrollAdjustHist) {
      var histEl = document.getElementById("adjust-hist");
      if (histEl) histEl.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (e.target.id === "comp-modal" || closeComp) {
      overlay = null;
      paint();
      return;
    }
    if (openComp) {
      overlay = "comp";
      paint();
      return;
    }
    if (e.target.id === "cota-modal" || closeCota) {
      overlay = null;
      paint();
      return;
    }
    if (openCota) {
      overlay = "cota";
      paint();
      return;
    }
    if (e.target.id === "edit-cota-modal" || closeEditCota) {
      overlay = null;
      paint();
      return;
    }
    if (openEditCota) {
      overlay = "edit";
      paint();
      return;
    }
    if (saveEditCota) {
      overlay = null;
      paint();
      toast("Alterações da cota salvas neste protótipo.");
      return;
    }

    if (e.target.id === "hist-modal" || closeHist) {
      go(screen === "d2" || screen === "d1" || screen === "d3" ? "d1" : "a7");
      return;
    }
    if (openHist) {
      overlay = null;
      go(
        screen === "d1" || screen === "d3" || screen === "c1" || screen === "c4" || screen === "a6" || screen === "b3"
          ? "d2"
          : "a8"
      );
      return;
    }

    if (confirmEmpty) {
      go("b2");
      return;
    }
    if (e.target.id === "confirm-empty" || closeConfirmEmpty) {
      go("b1");
      return;
    }

    if (openAdjust) {
      beginAdjust();
      go("c2");
      return;
    }
    if (e.target.id === "adjust-modal" || closeAdjust) {
      go(adjusted ? "c4" : "c1");
      return;
    }
    if (reviewAdjust) {
      adjustTried = true;
      adjustMotivo = (document.querySelector("[data-adjust-motivo]") || {}).value || "";
      if (!String(adjustMotivo).trim()) {
        paint();
        return;
      }
      go("c3");
      return;
    }
    if (backAdjust || closeAdjustConfirm || e.target.id === "adjust-confirm") {
      go("c2");
      return;
    }
    if (confirmAdjust) {
      selected = adjustCotas.slice();
      adjusted = true;
      go("c4");
      return;
    }
    if (removeAdjust) {
      e.stopPropagation();
      var ridAdj = removeAdjust.getAttribute("data-remove-adjust");
      adjustCotas = adjustCotas.filter(function (x) {
        return x !== ridAdj;
      });
      paint();
      return;
    }
    if (toggleAdjust) {
      e.stopPropagation();
      var aid = toggleAdjust.getAttribute("data-toggle-adjust");
      if (adjustCotas.indexOf(aid) >= 0) {
        adjustCotas = adjustCotas.filter(function (x) {
          return x !== aid;
        });
      } else adjustCotas = adjustCotas.concat([aid]);
      paint();
      return;
    }
    if (adjustMsToggle) {
      e.stopPropagation();
      if (e.target.closest("[data-remove-adjust]")) return;
      adjustMsOpen = !adjustMsOpen;
      paint();
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
      if (screen !== "a3" && screen !== "a9") screen = "a3";
      paint();
      return;
    }
    if (msToggle) {
      e.stopPropagation();
      if (e.target.closest("[data-remove-cota]")) return;
      if (screen === "a3" || screen === "a9") go(selected.length ? "a4" : "a2");
      else go("a3");
      return;
    }
    if (conf) {
      go(selected.length ? "a5" : "b2");
      return;
    }
    if (jump) {
      go(jump.getAttribute("data-go"));
      return;
    }
    if (tip) toast(tip.getAttribute("data-toast"));
  });

  var SCREENS = [
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "b1",
    "b2",
    "b3",
    "c1",
    "c2",
    "c3",
    "c4",
    "d1",
    "d2",
    "d3",
  ];

  function prepareScreen(next) {
    overlay = null;
    if (next === "a6") {
      adjusted = false;
      selected = ["2211", "3307"];
    }
    if (next === "a9") {
      adjusted = false;
      selected = ["2211", "3307"];
    }
    if (next === "b1" || next === "b2" || next === "b3") {
      adjusted = false;
      selected = [];
    }
    if (next === "c1" || next === "c2" || next === "c3") {
      adjusted = false;
      selected = ["2211", "3307"];
    }
    if (next === "c2" || next === "c3") beginAdjust();
    if (next === "c4") {
      adjusted = true;
      selected = ["2211", "4954"];
      adjustCotas = ["2211", "4954"];
      publishedBefore = ["2211", "3307"];
      if (!adjustMotivo) {
        adjustMotivo =
          "Cota 4954 foi contemplada por sorteio e a 3307 entrou por engano.";
      }
    }
    if (next === "d1" || next === "d2" || next === "d3") {
      if (!adjusted) selected = ["2211", "3307"];
    }
    if (next === "a3" || next === "a4" || next === "a5") {
      selected = ["2211", "3307"];
      adjusted = false;
    }
    if (next === "a2") selected = [];
  }

  document.querySelectorAll(".proto button").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = b.getAttribute("data-jump");
      prepareScreen(next);
      go(next);
    });
  });

  window.addEventListener("hashchange", function () {
    var next = (location.hash || "#a1").slice(1);
    if (SCREENS.indexOf(next) === -1) return;
    prepareScreen(next);
    go(next);
  });

  var start = (location.hash || "#a1").slice(1);
  if (SCREENS.indexOf(start) === -1) start = "a1";
  prepareScreen(start);
  go(start);
})();
