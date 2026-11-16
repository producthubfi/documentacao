(function () {
  var screen = "a1";
  var selected = ["2211", "0884"];
  var sheetOpen = false;
  var confirmOpen = false;

  var GROUPS = [
    { id: "1054", name: "Grupo 1054", admin: "Turn2C · CNP Consórcio", date: "25/10/2026", when: "Em 4 dias", cotas: "2 cotas", lances: "4 lances", valor: "R$ 240.000,00", status: "pendente", action: "publish" },
    { id: "0882", name: "Grupo 0882", admin: "Turn2C · Embracon", date: "25/10/2026", when: "Em 4 dias", cotas: "3 cotas", lances: "5 lances", valor: "R$ 310.000,00", status: "pendente", action: "publish" },
    { id: "2201", name: "Grupo 2201", admin: "Hubfi · Porto Seguro", date: "25/10/2026", when: "Em 4 dias", cotas: "1 cota", lances: "2 lances", valor: "R$ 80.000,00", status: "pendente", action: "publish" },
    { id: "0910", name: "Grupo 0910", admin: "Turn2C · CNP Consórcio", date: "18/10/2026", when: "Há 3 dias", cotas: "1 cota", lances: "2 lances", valor: "R$ 120.000,00", status: "publicada", action: "view" },
    { id: "1503", name: "Grupo 1503", admin: "Turn2C · CNP Consórcio", date: "11/10/2026", when: "Há 10 dias", cotas: "4 cotas", lances: "6 lances", valor: "R$ 450.000,00", status: "publicada", action: "view" },
    { id: "0330", name: "Grupo 0330", admin: "Embracon · Direto", date: "04/10/2026", when: "Há 17 dias", cotas: "0 cota", lances: "0 lance", valor: "R$ 0,00", status: "sem", action: "details" }
  ];

  var LANCES = [
    { cliente: "Mauricio Lima", doc: "113.544.464-10", cota: "2211", tipo: "Lance fixo", valor: "R$ 60.000,00", data: "27/09/2026" },
    { cliente: "Mauricio Lima", doc: "113.544.464-10", cota: "2211", tipo: "Lance fixo", valor: "R$ 60.000,00", data: "24/09/2026" },
    { cliente: "Ana Paula Souza", doc: "298.112.003-55", cota: "0884", tipo: "Lance fixo", valor: "R$ 55.000,00", data: "22/09/2026" },
    { cliente: "Carlos Mendes", doc: "041.887.220-19", cota: "3102", tipo: "Lance livre", valor: "R$ 65.000,00", data: "20/09/2026" }
  ];

  var COTAS = [
    { id: "2211", cliente: "Mauricio Lima", credito: "R$ 180.000,00", lances: "2 lances" },
    { id: "0884", cliente: "Ana Paula Souza", credito: "R$ 150.000,00", lances: "1 lance" },
    { id: "3102", cliente: "Carlos Mendes", credito: "R$ 200.000,00", lances: "1 lance" },
    { id: "4410", cliente: "Fernanda Dias", credito: "R$ 120.000,00", lances: "0 lance" }
  ];

  var HIST = [
    { data: "27/09/2026", tipo: "Lance fixo", valor: "R$ 60.000,00", status: "Contemplado", assembleia: "25/10/2026" },
    { data: "24/09/2026", tipo: "Lance fixo", valor: "R$ 60.000,00", status: "Substituído", assembleia: "25/10/2026" },
    { data: "12/08/2026", tipo: "Lance livre", valor: "R$ 40.000,00", status: "Não contemplado", assembleia: "20/08/2026" }
  ];

  function ico(name) {
    var paths = {
      dash: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>',
      wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8"/><path d="M18 12h.01"/>',
      calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
      bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
      search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
      chevron: '<path d="m6 9 6 6 6-6"/>',
      hash: '<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>',
      clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      left: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
      check: '<path d="M20 6 9 17l-5-5"/>'
    };
    return '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || "") + "</svg>";
  }

  function badge(status) {
    if (status === "pendente") return '<span class="badge warn">Pendente</span>';
    if (status === "publicada") return '<span class="badge ok">Publicada</span>';
    if (status === "sem") return '<span class="badge neutral">Sem lances</span>';
    if (status === "aguarda") return '<span class="badge warn">Aguardando assembleia</span>';
    if (status === "sera") return '<span class="badge ok">Será contemplado</span>';
    if (status === "nao") return '<span class="badge neutral">Não contemplado nesta assembleia</span>';
    if (status === "cont") return '<span class="badge ok">Contemplado</span>';
    if (status === "sub") return '<span class="badge neutral">Substituído</span>';
    return '<span class="badge neutral">' + status + "</span>";
  }

  function actionBtn(g) {
    if (g.action === "publish") return '<button class="btn dark sm" type="button" data-go="a2" data-group="' + g.id + '">Publicar resultado</button>';
    if (g.action === "view") return '<button class="btn ghost sm" type="button" data-toast="Resultado já publicado. Abra pelo grupo 1054 no fluxo feliz.">Ver resultado</button>';
    return '<button class="btn ghost sm" type="button" data-toast="Sem lances neste grupo.">Ver detalhes</button>';
  }

  function shell(inner, opts) {
    opts = opts || {};
    return '<aside class="sidebar">' +
      '<div class="side-pad"><div class="logo"><img src="assets/04b4c.svg" alt="hubfi" width="109" height="27"></div>' +
      '<button class="ctx" type="button"><span class="ctx-ico">TE</span><span class="ctx-copy"><span class="ctx-k">Contexto da Empresa</span><span class="ctx-v">Todas as empresas</span></span><img src="assets/517ff.svg" alt="" width="16" height="16"></button></div>' +
      '<div class="group-label">Rotina</div><div class="nav-list">' +
      '<button class="nav-btn" type="button">' + ico("dash") + 'Dashboard</button>' +
      '<button class="nav-btn" type="button">' + ico("users") + 'Clientes</button>' +
      '</div><div class="group-label">Gestão</div><div class="nav-list">' +
      '<button class="nav-btn is-on" type="button">' + ico("layers") + 'Gestão de Consórcio</button>' +
      '</div><div class="group-label">Administração interna</div><div class="nav-list">' +
      '<button class="nav-btn" type="button">' + ico("users") + 'Usuários</button>' +
      '<button class="nav-btn" type="button">' + ico("layers") + 'Backoffice</button>' +
      '</div>' +
      '<button class="user" type="button"><span class="avatar">LA</span><span class="user-copy"><b>Lucas Augusto</b><span>lucasaugusto@hubfi.com.br</span></span></button>' +
      '</aside><main class="page">' + inner + "</main>";
  }

  function tabs(active) {
    var items = [
      ["dash", "Dashboard"],
      ["users", "Clientes"],
      ["layers", "Grupos"],
      ["wallet", "Cotas"],
      ["calendar", "Assembleias"],
      ["bell", "Lembretes"]
    ];
    return '<div class="tabs">' + items.map(function (it) {
      var on = it[1] === active ? " is-on" : "";
      return '<button class="tab' + on + '" type="button">' + ico(it[0]) + it[1] + "</button>";
    }).join("") + "</div>";
  }

  function a1() {
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> <b>Assembleias</b></div>' +
      '<div class="page-head"><h1>Assembleias</h1><p>Publique o resultado oficial uma vez e atualize cotas e lances juntos</p></div>' +
      tabs("Assembleias") +
      '<div class="kpis">' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Assembleias pendentes</p><span class="kpi-ico">' + ico("hash") + '</span></div><p class="value">3</p></div>' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Lances aguardando resultado</p><span class="kpi-ico">' + ico("wallet") + '</span></div><p class="value">11</p></div>' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Próxima assembleia</p><span class="kpi-ico warn">' + ico("calendar") + '</span></div><p class="value" style="font-size:22px">25/10/2026</p></div>' +
        '<div class="kpi"><div class="kpi-top"><p class="label">Publicadas no mês</p><span class="kpi-ico hot">' + ico("clock") + '</span></div><p class="value">4</p></div>' +
      '</div>' +
      '<div class="filters">' +
        '<div class="search">' + ico("search") + '<span>Buscar por grupo ou administradora...</span></div>' +
        '<div class="field"><label>Grupo</label><div class="control">Todos ' + ico("chevron") + '</div></div>' +
        '<div class="field"><label>Administradora</label><div class="control">Todas ' + ico("chevron") + '</div></div>' +
        '<div class="field"><label>Status</label><div class="control">Todos ' + ico("chevron") + '</div></div>' +
        '<div class="field"><label>Período</label><div class="control">Próx. 30 dias ' + ico("chevron") + '</div></div>' +
      '</div>' +
      '<div class="table">' +
        '<div class="thead cols-list"><span>Grupo</span><span>Data da assembleia</span><span>Cotas com lance</span><span>Lances aguardando</span><span>Valor dos lances</span><span>Status</span><span>Ações</span></div>' +
        GROUPS.map(function (g) {
          return '<div class="tr cols-list">' +
            '<div class="cell-stack"><strong>' + g.name + '</strong><span>' + g.admin + '</span></div>' +
            '<div class="cell-stack"><strong>' + g.date + '</strong><span>' + g.when + '</span></div>' +
            '<span>' + g.cotas + '</span><span>' + g.lances + '</span><span>' + g.valor + '</span>' +
            badge(g.status) + actionBtn(g) +
          '</div>';
        }).join("") +
      '</div>'
    );
  }

  function detailChrome(extraCard, lancesStatusMode) {
    var chips = selected.map(function (id) {
      var c = COTAS.filter(function (x) { return x.id === id; })[0];
      return '<span class="chip">Cota ' + id + (c ? " · " + c.cliente.split(" ")[0] : "") + "</span>";
    }).join("");
    return '<button class="back" type="button" data-go="a1">' + ico("left") + 'Voltar para Assembleias</button>' +
      '<div class="meta">' + badge(screen === "a6" ? "publicada" : "pendente") +
        '<span class="meta-item">' + ico("calendar") + 'Assembleia em 25/10/2026</span>' +
        '<span class="meta-item">' + ico("layers") + 'Turn2C · CNP Consórcio</span>' +
        '<span class="meta-item">' + ico("users") + '3 cotas com lance</span>' +
        '<span class="meta-item">' + ico("wallet") + '4 lances · R$ 240.000,00</span>' +
      '</div>' +
      '<div class="card">' +
        '<h2>Resultado oficial</h2>' +
        '<p class="lead">Informe as cotas do grupo contempladas nesta assembleia. Os lances dessas cotas serão marcados como contemplados.</p>' +
        '<div class="ms"><p class="ms-label">Cotas contempladas</p>' +
          '<button class="ms-box' + (sheetOpen ? " is-open" : "") + '" type="button" data-sheet="1">' +
            (selected.length ? '<span class="chips">' + chips + "</span>" : '<span class="placeholder">Selecione as cotas contempladas</span>') +
            ico("chevron") +
          '</button></div>' +
        (extraCard || "") +
      '</div>' +
      '<div class="section-head"><h3>Lances aguardando esta assembleia</h3><span class="badge warn">4 lances aguardando</span></div>' +
      '<div class="table">' +
        '<div class="thead cols-lances"><span>Cliente</span><span>Cota</span><span>Tipo de lance</span><span>Valor do lance</span><span>Registrado em</span><span>Comprovante</span><span>Status</span></div>' +
        LANCES.map(function (l) {
          var st = "aguarda";
          if (lancesStatusMode === "preview") st = selected.indexOf(l.cota) >= 0 ? "sera" : "nao";
          if (lancesStatusMode === "done") st = selected.indexOf(l.cota) >= 0 ? "cont" : "nao";
          return '<div class="tr cols-lances">' +
            '<div class="cell-stack"><strong>' + l.cliente + '</strong><span>' + l.doc + '</span></div>' +
            '<span>' + l.cota + '</span><span>' + l.tipo + '</span><span>' + l.valor + '</span><span>' + l.data + '</span>' +
            '<button class="linkish" type="button" data-toast="Comprovante ilustrativo.">Ver comprovante</button>' +
            badge(st) +
          '</div>';
        }).join("") +
      '</div>';
  }

  function a2() {
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Assembleias <span>/</span> <b>Grupo 1054</b></div>' +
      '<div class="page-head"><h1>Grupo 1054</h1><p>Resultado oficial da assembleia de 25/10/2026</p></div>' +
      detailChrome("", "wait") +
      '<div class="foot"><p class="foot-copy">Selecione as cotas contempladas para liberar a publicação do resultado.</p>' +
      '<div class="foot-actions"><button class="btn ghost" type="button" data-go="a1">Cancelar</button>' +
      '<button class="btn primary" type="button" disabled>Publicar resultado</button></div></div>'
    );
  }

  function a3() {
    sheetOpen = true;
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Assembleias <span>/</span> <b>Grupo 1054</b></div>' +
      '<div class="page-head"><h1>Grupo 1054</h1><p>Resultado oficial da assembleia de 25/10/2026</p></div>' +
      detailChrome("", "wait") +
      '<div class="foot"><p class="foot-copy">Selecione as cotas contempladas para liberar a publicação do resultado.</p>' +
      '<div class="foot-actions"><button class="btn ghost" type="button" data-go="a1">Cancelar</button>' +
      '<button class="btn primary" type="button" data-apply-sheet>Publicar resultado</button></div></div>'
    ) + sheetHtml();
  }

  function a4() {
    sheetOpen = false;
    var impact =
      '<div class="impact">' +
        '<div class="impact-item"><p class="k">Cotas contempladas</p><p class="v">' + selected.length + '</p></div>' +
        '<div class="impact-item"><p class="k">Lances contemplados</p><p class="v">3</p></div>' +
        '<div class="impact-item"><p class="k">Lances não contemplados</p><p class="v">1</p></div>' +
      '</div>';
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Assembleias <span>/</span> <b>Grupo 1054</b></div>' +
      '<div class="page-head"><h1>Grupo 1054</h1><p>Resultado oficial da assembleia de 25/10/2026</p></div>' +
      detailChrome(impact, "preview") +
      '<div class="foot"><p class="foot-copy">Ao publicar, as cotas selecionadas e os lances vinculados mudam de status juntos.</p>' +
      '<div class="foot-actions"><button class="btn ghost" type="button" data-go="a1">Cancelar</button>' +
      '<button class="btn primary" type="button" data-confirm="1">Publicar resultado</button></div></div>'
    );
  }

  function a5() {
    confirmOpen = true;
    sheetOpen = false;
    var html = a4();
    return html + confirmHtml();
  }

  function a6() {
    confirmOpen = false;
    sheetOpen = false;
    var impact =
      '<div class="impact">' +
        '<div class="impact-item"><p class="k">Cotas contempladas</p><p class="v">' + selected.length + '</p></div>' +
        '<div class="impact-item"><p class="k">Lances contemplados</p><p class="v">3</p></div>' +
        '<div class="impact-item"><p class="k">Lances não contemplados</p><p class="v">1</p></div>' +
      '</div>';
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Assembleias <span>/</span> <b>Grupo 1054</b></div>' +
      '<div class="alert">' + ico("check") + '<span>Resultado publicado em 16/11/2026 às 10:12. Cotas e lances foram atualizados.</span></div>' +
      '<div class="page-head"><h1>Grupo 1054</h1><p>Resultado oficial da assembleia de 25/10/2026</p></div>' +
      detailChrome(impact, "done") +
      '<div class="foot"><p class="foot-copy">Abra a ficha do cliente contemplado para ver a cota atualizada.</p>' +
      '<div class="foot-actions"><button class="btn ghost" type="button" data-go="a1">Voltar para lista</button>' +
      '<button class="btn primary" type="button" data-go="a7">Abrir ficha do cliente</button></div></div>'
    );
  }

  function a7() {
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Clientes <span>/</span> <b>Mauricio Lima</b></div>' +
      '<button class="back" type="button" data-go="a6">' + ico("left") + 'Voltar para resultado</button>' +
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
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="alert">' + ico("check") + '<span>Cota 2211 contemplada na assembleia de 25/10/2026 por lance fixo de R$ 60.000,00.</span></div>' +
          '<div class="card">' +
            '<h2>Cota 2211</h2>' +
            '<p class="lead">Crédito de R$ 180.000,00 · Turn2C · CNP Consórcio</p>' +
            '<div class="impact" style="margin-top:16px">' +
              '<div class="impact-item"><p class="k">Forma de contemplação</p><p class="v" style="font-size:15px">Lance fixo</p></div>' +
              '<div class="impact-item"><p class="k">Valor do lance</p><p class="v" style="font-size:15px">R$ 60.000,00</p></div>' +
              '<div class="impact-item"><p class="k">Assembleia</p><p class="v" style="font-size:15px">25/10/2026</p></div>' +
            '</div>' +
            '<div style="margin-top:16px"><button class="btn ghost" type="button" data-go="a8">Ver histórico de lances</button></div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function a8() {
    return shell(
      '<div class="crumb">Gestão de Consórcio <span>/</span> Clientes <span>/</span> Mauricio Lima <span>/</span> <b>Histórico de lances</b></div>' +
      '<button class="back" type="button" data-go="a7">' + ico("left") + 'Voltar para ficha</button>' +
      '<div class="page-head"><h1>Histórico de lances</h1><p>Cota 2211 · Grupo 1054 · Mauricio Lima</p></div>' +
      '<div class="table">' +
        '<div class="thead cols-hist"><span>Registrado em</span><span>Tipo</span><span>Valor</span><span>Assembleia</span><span>Status</span></div>' +
        HIST.map(function (h) {
          var st = h.status === "Contemplado" ? "cont" : h.status === "Substituído" ? "sub" : "nao";
          return '<div class="tr cols-hist"><span>' + h.data + '</span><span>' + h.tipo + '</span><span>' + h.valor + '</span><span>' + h.assembleia + '</span>' + badge(st) + '</div>';
        }).join("") +
      '</div>' +
      '<div class="foot"><p class="foot-copy">Fluxo feliz concluído: da lista até o histórico da cota contemplada.</p>' +
      '<div class="foot-actions"><button class="btn primary" type="button" data-go="a1">Voltar ao início</button></div></div>'
    );
  }

  function sheetHtml() {
    return '<div class="overlay" id="sheet">' +
      '<div class="sheet" role="dialog" aria-modal="true" aria-label="Selecionar cotas">' +
        '<div class="sheet-top"><div><h2>Selecionar cotas contempladas</h2><p>Marque as cotas do Grupo 1054 contempladas nesta assembleia.</p></div>' +
        '<button class="x" type="button" data-close-sheet aria-label="Fechar">✕</button></div>' +
        '<div class="sheet-search">' + ico("search") + '<input type="search" placeholder="Buscar cota ou cliente..." aria-label="Buscar cota ou cliente"></div>' +
        COTAS.map(function (c) {
          var on = selected.indexOf(c.id) >= 0;
          return '<button class="opt' + (on ? " is-on" : "") + '" type="button" data-toggle-cota="' + c.id + '">' +
            '<span class="check">' + (on ? "✓" : "") + '</span>' +
            '<span class="opt-copy"><strong>Cota ' + c.id + ' · ' + c.cliente + '</strong><span>' + c.credito + ' · ' + c.lances + '</span></span>' +
          '</button>';
        }).join("") +
        '<div class="sheet-foot"><span class="muted">' + selected.length + ' cotas selecionadas</span>' +
        '<button class="btn primary" type="button" data-apply-sheet>Aplicar seleção</button></div>' +
      '</div></div>';
  }

  function confirmHtml() {
    return '<div class="overlay" id="confirm">' +
      '<div class="dialog" role="dialog" aria-modal="true" aria-label="Confirmar publicação">' +
        '<div class="dialog-top"><div><h2>Confirmar publicação do resultado</h2><p>Essa ação atualiza cotas e lances ao mesmo tempo.</p></div>' +
        '<button class="x" type="button" data-close-confirm aria-label="Fechar">✕</button></div>' +
        '<div class="dialog-body">' +
          '<p>Você está publicando o resultado oficial da assembleia do <b>Grupo 1054</b> em <b>25/10/2026</b>.</p>' +
          '<ul class="dialog-list">' +
            '<li>' + selected.length + ' cotas serão marcadas como contempladas</li>' +
            '<li>3 lances serão marcados como contemplados</li>' +
            '<li>1 lance permanecerá como não contemplado nesta assembleia</li>' +
          '</ul>' +
          '<p>Depois de publicar, o status da assembleia muda para Publicada.</p>' +
        '</div>' +
        '<div class="dialog-actions">' +
          '<button class="btn ghost" type="button" data-close-confirm>Cancelar</button>' +
          '<button class="btn primary" type="button" data-go="a6">Confirmar publicação</button>' +
        '</div>' +
      '</div></div>';
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
    toast._t = setTimeout(function () { el.classList.remove("is-on"); }, 2600);
  }

  document.getElementById("app").addEventListener("click", function (e) {
    var jump = e.target.closest("[data-go]");
    var openSheet = e.target.closest("[data-sheet]");
    var closeSheet = e.target.closest("[data-close-sheet]");
    var applySheet = e.target.closest("[data-apply-sheet]");
    var toggle = e.target.closest("[data-toggle-cota]");
    var conf = e.target.closest("[data-confirm]");
    var closeConf = e.target.closest("[data-close-confirm]");
    var tip = e.target.closest("[data-toast]");

    if (e.target.id === "sheet" || closeSheet) {
      go(selected.length ? "a4" : "a2");
      return;
    }
    if (e.target.id === "confirm" || closeConf) {
      go("a4");
      return;
    }
    if (toggle) {
      var id = toggle.getAttribute("data-toggle-cota");
      if (selected.indexOf(id) >= 0) selected = selected.filter(function (x) { return x !== id; });
      else selected = selected.concat([id]);
      paint();
      return;
    }
    if (applySheet) {
      if (!selected.length) {
        toast("Selecione ao menos uma cota contemplada.");
        return;
      }
      go("a4");
      return;
    }
    if (openSheet) {
      go("a3");
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
      if (b.getAttribute("data-jump") === "a3") selected = ["2211", "0884"];
      if (b.getAttribute("data-jump") === "a2") selected = [];
      go(b.getAttribute("data-jump"));
    });
  });

  var start = (location.hash || "#a1").slice(1);
  if (["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"].indexOf(start) === -1) start = "a1";
  if (start === "a3" || start === "a4" || start === "a5" || start === "a6") selected = ["2211", "0884"];
  if (start === "a2") selected = [];
  go(start);
})();
