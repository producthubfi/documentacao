(function (global) {
  var catalog = global.HF_CATALOG;
  if (!catalog) return;
  var A = "assets/ds/";

  function img(file, w, h) {
    return '<img src="' + A + file + '" width="' + w + '" height="' + h + '" alt="">';
  }

  function bank(id, size) {
    var names = {
      inter: "Inter",
      bradesco: "Bradesco",
      caixa: "Caixa",
      itau: "Itaú",
      santander: "Santander",
    };
    return (
      '<img src="' +
      A +
      "banco-" +
      id +
      '.png" width="' +
      size +
      '" height="' +
      size +
      '" alt="' +
      names[id] +
      '">'
    );
  }

  function iconBtn(file) {
    return (
      '<button class="hf-btn hf-btn--ghost hf-btn--icon hf-btn--sm" type="button">' +
      img(file, 16, 16) +
      "</button>"
    );
  }

  function textBtn(label) {
    return '<button class="hf-btn hf-btn--ghost hf-btn--xs" type="button">' + label + "</button>";
  }

  function spin(size, withLabel) {
    var file = size === "lg" ? "spinner-lg.svg" : size === "md" ? "spinner-md.svg" : "spinner-sm.svg";
    var px = size === "lg" ? 32 : size === "md" ? 24 : 16;
    return (
      '<span class="hf-spin' +
      (withLabel ? " hf-spin--label" : "") +
      '">' +
      img(file, px, px) +
      (withLabel ? '<span class="hf-spin__label">Calculando...</span>' : "") +
      "</span>"
    );
  }

  function formRow(status) {
    var pill =
      status === "preenchido"
        ? '<span class="hf-pill hf-pill--success">Preenchido</span>'
        : status === "enviado"
          ? '<span class="hf-pill hf-pill--info">Enviado</span>'
          : '<span class="hf-pill hf-pill--warning">Dados pendentes</span>';
    return (
      '<div class="hf-form-row"><p class="hf-form-row__name">NOME DO FORMULÁRIO</p>' +
      pill +
      iconBtn("icon-eye.svg") +
      iconBtn("icon-pencil.svg") +
      "</div>"
    );
  }

  function mstep(atual) {
    var steps = ["Dados do imóvel", "Dados do cliente", "Documentos"];
    var html = '<div class="hf-mstep">';
    steps.forEach(function (label, i) {
      var n = i + 1;
      var done = n < atual;
      var current = n === atual;
      var cls = done ? " is-done" : current ? " is-current" : "";
      if (i) html += '<span class="hf-mstep__line' + (n <= atual ? " is-done" : "") + '"></span>';
      html +=
        '<div class="hf-mstep__item' +
        cls +
        '"><span class="hf-mstep__dot">' +
        (done ? "✓" : String(n)) +
        '</span><p class="hf-mstep__label">' +
        label +
        "</p></div>";
    });
    return html + "</div>";
  }

  function stage(open) {
    return (
      '<article class="hf-stage' +
      (open ? " hf-stage--open" : "") +
      '"><div class="hf-stage__head"><div class="hf-stage__titles"><p class="hf-stage__title">' +
      (open ? "Etapa 2 · Análise" : "Etapa 1 · Cadastro") +
      '</p><p class="hf-stage__meta">Movido por Fulano em 20/10/2026</p></div>' +
      (open
        ? '<span class="hf-pill hf-pill--warning">Pendente</span>'
        : '<span class="hf-pill hf-pill--success">Concluída</span>') +
      '<button class="hf-btn hf-btn--ghost hf-btn--icon hf-btn--sm" type="button" aria-label="' +
      (open ? "Recolher" : "Expandir") +
      '">' +
      img("icon-chevron.svg", 16, 16).replace("<img ", '<img class="hf-stage__chev" ') +
      "</button></div>" +
      (open ? '<div class="hf-stage__slot">Conteúdo da etapa</div>' : "") +
      "</article>"
    );
  }

  function kpi(tone, icon) {
    return (
      '<article class="hf-kpi"><div class="hf-kpi__head"><span class="hf-kpi__tile hf-kpi__tile--' +
      tone +
      '">' +
      img(icon, 16, 16) +
      '</span><p class="hf-kpi__label">Total de grupos e cotas</p>' +
      img("icon-info.svg", 16, 16) +
      '</div><p class="hf-kpi__value">R$ 1.200.600,00</p></article>'
    );
  }

  function lance(status) {
    var pill =
      status === "contemplado"
        ? '<span class="hf-pill hf-pill--green">Contemplado</span>'
        : status === "nao"
          ? '<span class="hf-pill hf-pill--info">Não contemplado</span>'
          : '<span class="hf-pill hf-pill--warning">Aguardando assembleia</span>';
    var select =
      status === "contemplado"
        ? "Contemplado"
        : status === "nao"
          ? "Não contemplado"
          : "Aguardando assembleia";
    return (
      '<article class="hf-lance"><p class="hf-lance__muted">Assembleia: 01/10/2026</p>' +
      '<div class="hf-lance__valor"><strong>R$ 60.000,00</strong><span>(30,00%) Lance fixo - Crédito</span></div>' +
      '<p class="hf-lance__muted">Registrado em 27/09/2026 por Maurício Lima</p>' +
      '<div class="hf-lance__file"><p>Mauricio de Lima Couotinho Junior - 1054 - 2211.pdf</p>' +
      '<button class="hf-lance__view" type="button">' +
      img("icon-eye-16.svg", 16, 16) +
      "Ver comprovante</button></div>" +
      '<div class="hf-lance__status">' +
      pill +
      '<span class="hf-lance__select">' +
      select +
      img("icon-chevron-down.svg", 16, 16) +
      "</span></div></article>"
    );
  }

  function tag(label) {
    return '<span class="hf-multi__tag">' + label + img("icon-x.svg", 12, 12) + "</span>";
  }

  function multi(state) {
    var filled = state !== "vazio";
    var cls = state === "foco" ? " hf-multi--focus" : state === "erro" ? " hf-multi--error" : "";
    var help =
      state === "erro"
        ? "Selecione ao menos uma cota do grupo"
        : "Apenas cotas do grupo com lance aguardando";
    return (
      '<div class="hf-multi' +
      cls +
      '"><p class="hf-multi__label">Cotas contempladas <span class="hf-multi__req">*</span></p>' +
      '<div class="hf-multi__field"><div class="hf-multi__tags">' +
      (filled
        ? tag("Cota 2211") + tag("Cota 4954")
        : '<p class="hf-multi__placeholder">Selecione as cotas contempladas</p>') +
      "</div>" +
      img("icon-chevron-down.svg", 16, 16) +
      '</div><p class="hf-multi__help">' +
      help +
      "</p></div>"
    );
  }

  function cota(state) {
    var box =
      state === "selecionado"
        ? '<span class="hf-cota__box">' + img("icon-check.svg", 18, 18) + "</span>"
        : '<span class="hf-cota__box"></span>';
    return (
      '<div class="hf-cota hf-cota--' +
      state +
      '">' +
      box +
      '<div class="hf-cota__main"><strong>Cota 2211</strong><span>Mauricio Lima CPF · Grupo 1054</span></div>' +
      '<div class="hf-cota__side"><strong>R$ 60.000,00</strong><span>Lance fixo</span></div></div>'
    );
  }

  function impact(publicado) {
    return (
      '<article class="hf-impact"><h3 class="hf-impact__title">' +
      (publicado ? "Resultado publicado" : "O que acontece ao publicar") +
      '</h3><div class="hf-impact__stats">' +
      '<div class="hf-impact__stat"><strong>3</strong><span>Cotas contempladas</span></div>' +
      '<div class="hf-impact__stat"><strong>5</strong><span>Lances contemplados</span></div>' +
      '<div class="hf-impact__stat hf-impact__stat--blue"><strong>12</strong><span>Lances não contemplados</span></div>' +
      '</div><div class="hf-impact__foot">' +
      img(publicado ? "icon-check-14.svg" : "icon-clock-14.svg", 14, 14) +
      (publicado
        ? "Publicado por Lucas Augusto em 21/10/2026"
        : "Os lances aguardando esta assembleia serão atualizados juntos") +
      "</div></article>"
    );
  }

  function cradio(state) {
    return (
      '<article class="hf-cradio hf-cradio--' +
      state +
      '">' +
      img(state === "selected" ? "radio-on.svg" : "radio-off.svg", 16, 16) +
      '<div class="hf-cradio__body"><h3>Operação simplificada</h3>' +
      "<p>Cadastre o cliente em segundos e foque no que gera resultado. A gente cuida do resto, te avisando de cada avanço.</p>" +
      '<button class="hf-cradio__action" type="button">Saber mais ' +
      img("icon-arrow.svg", 16, 16) +
      "</button></div></article>"
    );
  }

  function fchip(removable, hover) {
    return (
      '<span class="hf-fchip' +
      (hover ? " hf-fchip--hover" : "") +
      '">Produto: <strong>Financiamento</strong>' +
      (removable
        ? '<button type="button" aria-label="Remover filtro">' + img("icon-x-12.svg", 12, 12) + "</button>"
        : "") +
      "</span>"
    );
  }

  function bancos(modo) {
    var side =
      modo === "imovel"
        ? '<div class="hf-bancos__fast"><span class="hf-fast">' +
          img("icon-fast.svg", 10, 10) +
          'Fast Itaú</span><span class="hf-switch-mini" aria-hidden="true"><i></i></span></div>' +
          '<p class="hf-bancos__note">Retorno personalizado direto do banco</p>'
        : '<p class="hf-bancos__note">Cada banco devolve o próprio teto</p>';
    return (
      '<article class="hf-bancos"><div class="hf-bancos__main"><div class="hf-bancos__title-row"><span class="hf-bancos__logos">' +
      bank("itau", 24) +
      bank("bradesco", 24) +
      bank("caixa", 24) +
      bank("inter", 24) +
      bank("santander", 24) +
      '</span><p class="hf-bancos__title">Simulação para 5 bancos</p></div>' +
      '<p class="hf-bancos__sub">Itaú · Bradesco · Caixa · Inter · Santander</p></div>' +
      '<div class="hf-bancos__side">' +
      side +
      "</div></article>"
    );
  }

  function metrics() {
    var rows = [
      ["Taxa de juros", "11,90% a.a."],
      ["Prazo", "420 meses"],
      ["Valor do imóvel", "R$ 490.000"],
      ["Valor do financiamento", "R$ 350.000"],
      ["CET", "12,88% a.a."],
      ["Primeira parcela", "R$ 3.020"],
    ];
    return (
      '<div class="hf-proposta__metrics">' +
      rows
        .map(function (r) {
          return "<div><span>" + r[0] + "</span><strong>" + r[1] + "</strong></div>";
        })
        .join("") +
      "</div>"
    );
  }

  function proposta(status) {
    var logo = bank("bradesco", 32);
    if (status === "analise") logo = bank("bradesco", 32).replace("<img ", '<img class="is-pending" ');
    var actions = "";
    var note = "";
    if (status === "analise") {
      actions =
        '<span class="hf-pill hf-pill--outline">Pendente envio</span>' +
        iconBtn("icon-chat.svg") +
        iconBtn("icon-dots.svg");
    } else if (status === "enviado") {
      actions =
        '<span class="hf-pill hf-pill--outline">Pendente envio</span>' +
        iconBtn("icon-chat.svg") +
        iconBtn("icon-dots.svg");
      note =
        '<p class="hf-proposta__note hf-proposta__note--info">Proposta enviada em 05/10/2026 às 14:52. Consulta automática por até 10 minutos.</p>';
    } else if (status === "manual") {
      actions =
        textBtn("Recarregar") +
        textBtn("Registrar resultado manualmente") +
        '<span class="hf-pill hf-pill--neutral">Em análise</span>' +
        iconBtn("icon-chat.svg") +
        iconBtn("icon-dots.svg");
      note =
        '<p class="hf-proposta__note hf-proposta__note--info">Proposta enviada em 05/10/2026 às 14:52. Consulta automática por até 10 minutos.</p>';
    } else if (status === "aprovada" || status === "recusada") {
      actions =
        '<span class="hf-pill hf-pill--info">via API ' +
        img("icon-zap.svg", 12, 12) +
        "</span>" +
        (status === "aprovada"
          ? '<span class="hf-pill hf-pill--green">Aprovada</span>'
          : '<span class="hf-pill hf-pill--error">Recusada</span>') +
        iconBtn("icon-chat.svg") +
        iconBtn("icon-dots.svg");
      note =
        status === "aprovada"
          ? '<p class="hf-proposta__note hf-proposta__note--ok">Proposta enviada em 05/10/2026 às 14:52.</p>'
          : '<p class="hf-proposta__note hf-proposta__note--error">Renda insuficiente para o valor solicitado.</p>';
    } else if (status === "erro-reenviar") {
      actions =
        '<button class="hf-btn hf-btn--ghost hf-btn--xs" type="button">' +
        img("icon-file-plus.svg", 14, 14) +
        " Reenviar</button>" +
        '<span class="hf-pill hf-pill--error">Erro no envio</span>' +
        iconBtn("icon-dots.svg");
      note =
        '<p class="hf-proposta__note hf-proposta__note--error">O banco não aceitou o CPF do proponente. Use Reenviar para revisar os dados e enviar de novo.</p>';
    } else {
      actions =
        textBtn("Registrar resultado manualmente") +
        '<span class="hf-pill hf-pill--error-hot">Envio indisponível</span>' +
        iconBtn("icon-dots.svg");
      note =
        '<p class="hf-proposta__note hf-proposta__note--error">O Bradesco não aceita proposta por API para o estado civil União Estável. Registre o resultado manualmente.</p>';
    }
    var mid = status === "aprovada" || status === "recusada" ? metrics() : "";
    return (
      '<article class="hf-proposta"><div class="hf-proposta__bank">' +
      logo +
      "<strong>Banco Bradesco</strong></div>" +
      mid +
      '<div class="hf-proposta__actions">' +
      actions +
      "</div>" +
      note +
      "</article>"
    );
  }

  function when() {
    return '<span class="hf-log__when">14/04/2026 14:20</span>';
  }

  function kvs() {
    return (
      '<div class="hf-log__kvs"><div><span>Pausado</span><strong>10 dias</strong></div>' +
      "<div><span>Retorno previsto</span><strong>01/10/2026</strong></div>" +
      "<div><span>Motivo da pausa</span><strong>Documento pendente do clien...</strong></div></div>"
    );
  }

  function logRow(kind) {
    if (kind === "default") {
      return (
        '<div class="hf-log">' +
        img("log-chevron.svg", 16, 16) +
        '<p class="hf-log__line">Operador mudou para <strong>{{João Pereira}}.</strong>' +
        when() +
        "</p></div>"
      );
    }
    if (kind === "pausada" || kind === "estendida") {
      return (
        '<div class="hf-log">' +
        img(kind === "pausada" ? "log-pause.svg" : "log-clock-plus.svg", 16, 16) +
        '<span class="hf-pill hf-pill--warning">' +
        (kind === "pausada" ? "Pausada" : "Pausa estendida") +
        '</span><div class="hf-log__body"><p class="hf-log__line"><strong>Rafael Cavalcanti</strong> ' +
        (kind === "pausada" ? "marcou a operação como pausada." : "estendeu a operação como pausada.") +
        when() +
        '</p><p class="hf-log__detail">Detalhe: Cliente sem disponibilidade no momento.</p></div>' +
        kvs() +
        "</div>"
      );
    }
    if (kind === "reaberta" || kind === "ganha") {
      return (
        '<div class="hf-log">' +
        img(kind === "ganha" ? "log-won.svg" : "log-reopen.svg", 16, 16) +
        '<span class="hf-pill ' +
        (kind === "ganha" ? "hf-pill--won" : "hf-pill--muted") +
        '">' +
        (kind === "ganha" ? "Ganha" : "Reaberta") +
        '</span><p class="hf-log__line"><strong>Rafael Cavalcanti</strong> ' +
        (kind === "ganha" ? "marcou a operação como ganha." : "reabriu a operação.") +
        when() +
        "</p></div>"
      );
    }
    if (kind === "vencida") {
      return (
        '<div class="hf-log">' +
        img("log-alert.svg", 16, 16) +
        '<span class="hf-pill hf-pill--lost">Pausa vencida</span>' +
        '<p class="hf-log__line">Data de retorno vencida.' +
        when() +
        "</p>" +
        iconBtn("icon-chat.svg") +
        "</div>"
      );
    }
    if (kind === "perdida") {
      return (
        '<div class="hf-log">' +
        img("log-lost.svg", 16, 16) +
        '<span class="hf-pill hf-pill--lost">Perdida</span><div class="hf-log__body">' +
        '<p class="hf-log__line">Operação marcada como perdida.' +
        when() +
        '</p><p class="hf-log__detail">Detalhe: Período de pausa vencida sem atualização.</p></div></div>'
      );
    }
    if (kind === "sistema") {
      return (
        '<div class="hf-log">' +
        img("log-bot.svg", 16, 16) +
        '<p class="hf-log__line"><strong>Sistema</strong> Follow-up FI • Touchpoint 01 enviado para {{#stg-alertas}}' +
        when() +
        "</p></div>"
      );
    }
    return (
      '<div class="hf-log">' +
      bank("bradesco", 16).replace('width="16"', 'class="hf-log__logo" width="16"') +
      '<p class="hf-log__line"><strong>Lucas Augusto</strong> Proposta registrada: Banco Bradesco (Aprovada)' +
      when() +
      "</p></div>"
    );
  }

  function cell(label, html) {
    return '<div class="docs-cell"><p class="docs-meta">' + label + "</p>" + html + "</div>";
  }

  function board(title, desc, inner, extra) {
    return (
      '<section class="docs-board"><div class="docs-board__copy"><h2 class="docs-h2">' +
      title +
      "</h2>" +
      (desc ? '<p class="docs-board__desc">' + desc + "</p>" : "") +
      '</div><div class="docs-preview' +
      (extra ? " " + extra : "") +
      '">' +
      inner +
      "</div></section>"
    );
  }

  function findGroup(id) {
    for (var i = 0; i < catalog.groups.length; i++) {
      if (catalog.groups[i].id === id) return catalog.groups[i];
    }
    return null;
  }

  function addItem(groupId, slug, label) {
    var group = findGroup(groupId);
    if (!group) return;
    var exists = group.items.some(function (item) {
      return item[0] === slug;
    });
    if (!exists) group.items.push([slug, label]);
  }

  addItem("form", "multiselect", "Multiselect");
  addItem("form", "form-row", "Form Row");
  addItem("actions", "filter-chip", "Filter Chip");
  addItem("actions", "card-radio", "Card Radio");
  addItem("feedback", "spinner", "Spinner");

  if (!findGroup("propostas")) {
    catalog.groups.push({
      id: "propostas",
      label: "Propostas",
      icon: "landmark",
      blurb: "Bancos, card de proposta, etapas do modal e timeline da operação.",
      items: [
        ["bancos", "Bancos"],
        ["card-proposta", "Card Proposta"],
        ["modal-stepper", "Modal Stepper"],
        ["stage-card", "Stage Card"],
        ["log", "Log"],
      ],
    });
  }
  if (!findGroup("consorcio")) {
    catalog.groups.push({
      id: "consorcio",
      label: "Consórcio",
      icon: "pie-chart",
      blurb: "KPIs, lances, seleção de cotas e publicação da assembleia.",
      items: [
        ["kpi-consorcio", "KPI Consórcio"],
        ["bulk-bar", "Bulk Bar"],
        ["lance-card", "Lance Card"],
        ["impact-summary", "Impact Summary"],
      ],
    });
  }

  var pages = {
    spinner: {
      title: "Spinner",
      lead: "Indicador de carregamento em sm, md e lg, com ou sem label da ação.",
      node: "1043-9793",
      html: function () {
        return board(
          "Tamanhos",
          "sm 16, md 24, lg 32. Com label, o texto fica 12 Regular em --text-secondary.",
          cell("sm", spin("sm")) +
            cell("sm + label", spin("sm", true)) +
            cell("md", spin("md")) +
            cell("md + label", spin("md", true)) +
            cell("lg", spin("lg")) +
            cell("lg + label", spin("lg", true))
        );
      },
    },
    "form-row": {
      title: "Form Row",
      lead: "Linha de formulário com badge de status e ações de ver e editar.",
      node: "1019-6725",
      html: function () {
        return board(
          "Status",
          "Pendente, preenchido e enviado. Altura 56, raio 8, borda #E3E3E3.",
          formRow("pendente") + formRow("preenchido") + formRow("enviado"),
          "docs-preview--stack"
        );
      },
    },
    "modal-stepper": {
      title: "Modal Stepper",
      lead: "Três etapas do modal: imóvel, cliente e documentos. A etapa atual fica em destaque e as anteriores viram check.",
      node: "1019-6678",
      html: function () {
        return board(
          "Etapa atual",
          "Indicador 24, linha 32. Concluído e atual em #0DAF9F.",
          mstep(1) + mstep(2) + mstep(3),
          "docs-preview--stack"
        );
      },
    },
    "stage-card": {
      title: "Stage Card",
      lead: "Card de etapa da operação, recolhido ou aberto, com badge e atalho.",
      node: "1019-6468",
      html: function () {
        return board(
          "Estados",
          "Recolhido mostra a etapa concluída. Aberto reserva o slot do conteúdo.",
          stage(false) + stage(true),
          "docs-preview--stack"
        );
      },
    },
    "bulk-bar": {
      title: "Bulk Bar",
      lead: "Barra de ações em lote quando há linhas selecionadas. Pad 12, gap 16, raio 8.",
      node: "1054-7022",
      html: function () {
        return board(
          "Seleção",
          "Texto à esquerda, ação secundária ghost e primária dark.",
          '<div class="hf-bulk"><p class="hf-bulk__text">1 unidade selecionada</p>' +
            '<button class="hf-btn hf-btn--ghost hf-btn--lg" type="button">Pagamento em massa</button>' +
            '<button class="hf-btn hf-btn--dark hf-btn--lg" type="button">Registrar lance</button></div>'
        );
      },
    },
    "kpi-consorcio": {
      title: "KPI Consórcio",
      lead: "Card de KPI da gestão de consórcio. Pad 16, raio 10, valor 24 SemiBold.",
      node: "1054-6911",
      html: function () {
        return board(
          "Cores",
          "Tile 32 com 10% da cor. Teal, verde, amarelo e rosa.",
          kpi("teal", "icon-users.svg") +
            kpi("green", "icon-wallet.svg") +
            kpi("amber", "icon-calendar.svg") +
            kpi("rose", "icon-clock.svg")
        );
      },
    },
    "lance-card": {
      title: "Lance Card",
      lead: "Card do histórico de lances. Status aguardando, contemplado e não contemplado.",
      node: "1054-7038",
      html: function () {
        return board(
          "Status",
          "Gap 13, raio 8, borda #E8E8E8.",
          lance("aguardando") + lance("contemplado") + lance("nao")
        );
      },
    },
    multiselect: {
      title: "Multiselect",
      lead: "Campo com tags para cotas contempladas, mais a opção da lista.",
      node: "1056-7152",
      html: function () {
        return (
          board(
            "Campo",
            "Vazio, preenchido, foco e erro. Tags em teal 10%.",
            multi("vazio") + multi("preenchido") + multi("foco") + multi("erro")
          ) +
          board(
            "Opção de cota",
            "Checkbox, cota, cliente e lance. Selecionado leva fundo teal 6%.",
            cota("padrao") + cota("hover") + cota("selecionado") + cota("disabled")
          )
        );
      },
    },
    "impact-summary": {
      title: "Impact Summary",
      lead: "Resumo do que a publicação da assembleia altera, antes e depois.",
      node: "1056-7255",
      html: function () {
        return board("Estados", "Prévia com relógio. Publicado com o autor e a data.", impact(false) + impact(true));
      },
    },
    "card-radio": {
      title: "Card Radio",
      lead: "Card selecionável com rádio, título, descrição e link de ação.",
      node: "1063-7292",
      html: function () {
        return board(
          "Estados",
          "Default, hover, selected e disabled. Selecionado usa fundo #F0FDFA e título teal.",
          cradio("default") + cradio("hover") + cradio("selected") + cradio("disabled"),
          "docs-preview--stack"
        );
      },
    },
    "filter-chip": {
      title: "Filter Chip",
      lead: "Chip do filtro aplicado, com ou sem ação de remover.",
      node: "851-2385",
      html: function () {
        return board(
          "Variantes",
          "Pílula branca, 12 Regular, borda default. Hover escurece a borda.",
          fchip(true, false) + fchip(true, true) + fchip(false, false)
        );
      },
    },
    bancos: {
      title: "Bancos",
      lead: "Logos dos bancos parceiros e a faixa de simulação para imóvel ou cliente.",
      node: "1041-9705",
      html: function () {
        var logos = ["itau", "bradesco", "caixa", "inter", "santander"]
          .map(function (id) {
            return (
              "<figure>" +
              bank(id, 32) +
              bank(id, 24) +
              "<figcaption>" +
              id +
              "</figcaption></figure>"
            );
          })
          .join("");
        return (
          board("Logos", "24 e 32, raio cheio. Itaú, Bradesco, Caixa, Inter e Santander.", '<div class="hf-logo-row">' + logos + "</div>") +
          board(
            "Faixa de simulação",
            "modo=imóvel traz o Fast Itaú. modo=cliente troca a nota do teto.",
            bancos("imovel") + bancos("cliente"),
            "docs-preview--stack"
          )
        );
      },
    },
    "card-proposta": {
      title: "Card Proposta",
      lead: "Card do banco na esteira de proposta. O mesmo status existe para Bradesco, Inter, Itaú, Santander e Caixa.",
      node: "1019-6467",
      html: function () {
        return board(
          "Status",
          "Em análise, enviado, input manual, aprovada, recusada, erro com reenvio e envio indisponível.",
          cell("em análise", proposta("analise")) +
            cell("enviado", proposta("enviado")) +
            cell("input manual", proposta("manual")) +
            cell("aprovada", proposta("aprovada")) +
            cell("recusada", proposta("recusada")) +
            cell("erro · reenviar", proposta("erro-reenviar")) +
            cell("erro · manual", proposta("erro-manual")),
          "docs-preview--stack"
        );
      },
    },
    log: {
      title: "Log",
      lead: "Linha da timeline da operação e registro de proposta com a logo do banco.",
      node: "1026-8971",
      html: function () {
        return board(
          "card-log",
          "Default, pausa, extensão, reabertura, vencimento, perda, ganho, sistema e proposta.",
          logRow("default") +
            logRow("pausada") +
            logRow("estendida") +
            logRow("reaberta") +
            logRow("vencida") +
            logRow("perdida") +
            logRow("ganha") +
            logRow("sistema") +
            logRow("proposta"),
          "docs-preview--stack"
        );
      },
    },
  };

  Object.keys(pages).forEach(function (slug) {
    catalog.pages[slug] = pages[slug];
  });

  global.HF_THUMBS = {
    spinner: spin("md", true),
    "form-row": formRow("preenchido"),
    "modal-stepper": mstep(2),
    "stage-card": stage(false),
    "bulk-bar": '<div class="hf-bulk" style="width:220px"><p class="hf-bulk__text">1 selecionada</p></div>',
    "kpi-consorcio": kpi("teal", "icon-users.svg"),
    "lance-card": lance("aguardando"),
    multiselect: multi("preenchido"),
    "impact-summary": impact(false),
    "card-radio": cradio("selected"),
    "filter-chip": fchip(true, false),
    bancos: bancos("cliente"),
    "card-proposta": proposta("aprovada"),
    log: logRow("ganha"),
  };
})(window);
