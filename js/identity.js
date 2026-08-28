(function () {
  var catalog = window.HF_CATALOG;
  if (!catalog) return;

  var ui = catalog.ui || {};

  var BROKER = {
    cpf: "52998224725",
    name: "Lucas Augusto",
    email: "lucasaugusto@hubfi.com.br",
    phone: "62996026603",
  };

  var COMPANY = {
    "22233344455": {
      name: "Camila Ferreira",
      email: "camila.ferreira@email.com",
      phone: "(11) 97777-4411",
      owner: "Ana Costa",
      created: "08/04/2026",
      emailVerified: true,
      phoneVerified: true,
      formalized: false,
    },
    "11122233344": {
      name: "Ricardo Mendes",
      email: "ricardo.mendes@email.com",
      phone: "(81) 99115-6938",
      owner: "Lucas Augusto",
      created: "03/03/2026",
      emailVerified: true,
      phoneVerified: true,
      formalized: true,
    },
    "44455566677": {
      name: "Pedro Nogueira",
      email: "pedro.nogueira@email.com",
      phone: "",
      owner: "Ana Costa",
      created: "19/06/2026",
      emailVerified: true,
      phoneVerified: false,
      formalized: false,
    },
    "33344455566": {
      name: "Helena Dias",
      email: "helena.dias@email.com",
      phone: "(21) 98888-2200",
      owner: "Ana Costa",
      created: "02/02/2025",
      emailVerified: false,
      phoneVerified: false,
      noDocument: true,
      formalized: false,
    },
  };

  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function cpfMask(value) {
    var d = digits(value).slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return d.slice(0, 3) + "." + d.slice(3);
    if (d.length <= 9) return d.slice(0, 3) + "." + d.slice(3, 6) + "." + d.slice(6);
    return d.slice(0, 3) + "." + d.slice(3, 6) + "." + d.slice(6, 9) + "-" + d.slice(9);
  }

  function cnpjMask(value) {
    var d = digits(value).slice(0, 14);
    if (d.length <= 2) return d;
    if (d.length <= 5) return d.slice(0, 2) + "." + d.slice(2);
    if (d.length <= 8) return d.slice(0, 2) + "." + d.slice(2, 5) + "." + d.slice(5);
    if (d.length <= 12) return d.slice(0, 2) + "." + d.slice(2, 5) + "." + d.slice(5, 8) + "/" + d.slice(8);
    return d.slice(0, 2) + "." + d.slice(2, 5) + "." + d.slice(5, 8) + "/" + d.slice(8, 12) + "-" + d.slice(12);
  }

  function phoneMask(value) {
    var d = digits(value).slice(0, 11);
    if (d.length <= 2) return d ? "(" + d : "";
    if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  }

  function normEmail(value) {
    return String(value || "").trim().toLowerCase();
  }

  function field(opts) {
    opts = opts || {};
    var extra = opts.extra || "";
    var dis = opts.disabled ? " disabled" : "";
    var val = opts.value != null ? ' value="' + opts.value + '"' : "";
    var badge = opts.badge ? '<span class="hf-id-badge">' + opts.badge + "</span>" : "";
    var hint = opts.hint ? '<p class="hf-id-hint">' + opts.hint + "</p>" : "";
    var req = opts.req ? '<span class="hf-field__req">*</span>' : "";
    return (
      '<div class="hf-field' +
      (opts.disabled ? " hf-field--disabled" : "") +
      (opts.mod ? " " + opts.mod : "") +
      '"><div class="hf-field__header"><span class="hf-field__label">' +
      (opts.label || "") +
      "</span>" +
      badge +
      req +
      '</div><div class="hf-field__control"><input class="hf-field__input" type="' +
      (opts.type || "text") +
      '" placeholder="' +
      (opts.placeholder || "") +
      '"' +
      val +
      dis +
      extra +
      "></div>" +
      hint +
      "</div>"
    );
  }

  function alertBox(type, title, desc) {
    return (
      '<div class="hf-alert hf-alert--' +
      type +
      '" role="alert"><img class="hf-alert__icon" src="assets/icons/alert-' +
      type +
      '.svg?v=87" width="20" height="20" alt=""><div class="hf-alert__body"><p class="hf-alert__title">' +
      title +
      "</p>" +
      (desc ? '<p class="hf-alert__desc">' + desc + "</p>" : "") +
      "</div></div>"
    );
  }

  function facts(rows) {
    return rows
      .map(function (row) {
        return (
          '<div class="hf-kv"><span class="hf-kv__label">' +
          row[0] +
          '</span><span class="hf-kv__value">' +
          row[1] +
          "</span></div>"
        );
      })
      .join("");
  }

  function alertTone(tone) {
    if (tone === "error" || tone === "other") return "error";
    if (tone === "success" || tone === "ok") return "success";
    if (tone === "info") return "info";
    return "warning";
  }

  function matchCard(tone, title, desc, factsHtml, actsHtml, extraHtml) {
    var type = alertTone(tone);
    return (
      '<div class="hf-match hf-match--' +
      tone +
      '" role="status">' +
      '<div class="hf-alert hf-alert--' +
      type +
      '" role="alert"><img class="hf-alert__icon" src="assets/icons/alert-' +
      type +
      '.svg?v=87" width="20" height="20" alt=""><div class="hf-alert__body"><p class="hf-alert__title">' +
      title +
      "</p>" +
      (desc ? '<p class="hf-alert__desc">' + desc + "</p>" : "") +
      "</div></div>" +
      (factsHtml ? '<div class="hf-match__facts">' + factsHtml + "</div>" : "") +
      (extraHtml || "") +
      (actsHtml ? '<div class="hf-match__acts">' + actsHtml + "</div>" : "") +
      "</div>"
    );
  }

  function btn(style, label, act, size) {
    return (
      '<button class="hf-btn hf-btn--' +
      (size || "sm") +
      " hf-btn--" +
      style +
      '" type="button" data-id-act="' +
      act +
      '">' +
      label +
      "</button>"
    );
  }

  function demos(items) {
    return (
      '<div class="hf-open-demos"><span>Testar cenário</span>' +
      items
        .map(function (item) {
          return (
            '<button class="hf-open-demo" type="button" data-id-demo="' +
            item[0] +
            '">' +
            item[1] +
            "</button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function crumb(page) {
    var trail = "<span>Clientes</span>";
    if (page && page !== "Clientes") {
      trail += '<span class="hf-open__crumb-div"></span><span>' + page + "</span>";
    }
    return (
      '<div class="hf-open__crumb"><span class="hf-open__crumb-ico"><img src="assets/screen/open/crumb.svg" width="20" height="20" alt=""></span><i class="hf-open__crumb-div"></i>' +
      trail +
      "</div>"
    );
  }

  function overlay(inner) {
    return '<div class="docs-overlay" data-id-overlay hidden>' + inner + "</div>";
  }

  function showToast(msg) {
    var host = document.querySelector("[data-toast-host]");
    if (!host) {
      host = document.createElement("div");
      host.className = "docs-toast-host";
      host.setAttribute("data-toast-host", "");
      document.body.appendChild(host);
    }
    host.innerHTML = ui.toast ? ui.toast(msg) : "";
    var toast = host.querySelector(".hf-toast");
    if (!toast) return;
    function hide() {
      if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
    }
    var closeBtn = toast.querySelector("[data-alert-close]");
    if (closeBtn) closeBtn.addEventListener("click", hide);
    window.setTimeout(hide, 4000);
  }

  function openOverlay(root) {
    var el = root.querySelector("[data-id-overlay]");
    if (!el) return;
    el.hidden = false;
    el.classList.add("is-open");
  }

  function closeOverlay(root) {
    var el = root.querySelector("[data-id-overlay]");
    if (!el) return;
    el.classList.remove("is-open");
    el.hidden = true;
  }

  function isBrokerDoc(cpf) {
    return digits(cpf) === BROKER.cpf;
  }

  function isBrokerContact(email, phone) {
    var mail = normEmail(email) === BROKER.email;
    var tel = digits(phone) === BROKER.phone;
    return mail || tel;
  }

  function ico(name, size) {
    return window.hfIcon ? window.hfIcon(name, size || 20) : "";
  }

  function selectPf(value) {
    return (
      '<div class="hf-field hf-field--select hf-cli-field" data-select data-select-type="default">' +
      '<div class="hf-field__header"><span class="hf-field__label">Personal Finance</span><span class="hf-field__req">*</span></div>' +
      '<button class="hf-field__control" type="button" role="combobox" aria-haspopup="listbox" aria-expanded="false">' +
      '<span class="hf-field__value' +
      (value ? "" : " hf-field__value--placeholder") +
      '">' +
      (value || "Selecione...") +
      '</span><span class="hf-field__chevron"><img src="assets/icons/select-chevron.svg" alt=""></span></button>' +
      '<div class="hf-select-menu" role="listbox">' +
      '<div class="hf-select-menu__item" role="option" tabindex="-1" data-label="Maurício Lima">Maurício Lima</div>' +
      '<div class="hf-select-menu__item" role="option" tabindex="-1" data-label="Lucas Augusto">Lucas Augusto</div>' +
      '<div class="hf-select-menu__item" role="option" tabindex="-1" data-label="Ana Costa">Ana Costa</div>' +
      "</div></div>"
    );
  }

  function radios(name, pf) {
    return (
      '<div class="hf-field hf-cli-field"><div class="hf-field__header"><span class="hf-field__label">Tipo de cliente</span></div>' +
      '<div class="hf-cli-radios">' +
      '<label class="hf-radio"><input type="radio" name="' +
      name +
      '" value="PF"' +
      (pf ? " checked" : "") +
      ' data-id-tipo="PF"><span class="hf-radio-box"><img class="hf-radio-box__off" src="assets/icons/select-radio.svg" width="18" height="18" alt=""><img class="hf-radio-box__on" src="assets/icons/select-radio-on.svg" width="18" height="18" alt=""></span><span>Pessoa física</span></label>' +
      '<label class="hf-radio"><input type="radio" name="' +
      name +
      '" value="PJ"' +
      (pf ? "" : " checked") +
      ' data-id-tipo="PJ"><span class="hf-radio-box"><img class="hf-radio-box__off" src="assets/icons/select-radio.svg" width="18" height="18" alt=""><img class="hf-radio-box__on" src="assets/icons/select-radio-on.svg" width="18" height="18" alt=""></span><span>Pessoa Jurídica</span></label>' +
      "</div></div>"
    );
  }

  function pair(a, b) {
    return '<div class="hf-cli-pair">' + a + b + "</div>";
  }

  function darkBtn(label, act) {
    return (
      '<button class="hf-btn hf-btn--lg hf-btn--dark" type="button" data-id-act="' +
      act +
      '">' +
      label +
      "</button>"
    );
  }

  function clientScreen(opts) {
    var sidebar = typeof ui.appSidebar === "function" ? ui.appSidebar("clientes", "fit") : "";
    return (
      '<div class="docs-screen docs-screen--open docs-screen--clients" data-id-root="' +
      opts.id +
      '">' +
      sidebar +
      '<div class="hf-open hf-cli">' +
      opts.body +
      "</div>" +
      (opts.sheet || "") +
      (opts.overlay || "") +
      "</div>"
    );
  }

  function cadastroHtml() {
    var rows = [
      ["Teste daily", "Maurício Lima", "Minha Empresa LTDA", "testdaily@email.com", "(81) 98593-9388", "11/08/2026 11:36", ""],
      ["Camila Ferreira", "Ana Costa", "Minha Empresa LTDA", "camila.ferreira@email.com", "(11) 97777-4411", "08/04/2026 11:20", "edit"],
      ["Ricardo Mendes", "Lucas Augusto", "Minha Empresa LTDA", "ricardo.mendes@email.com", "(81) 99115-6938", "03/03/2026 09:12", "edit"],
      ["long title op", "Maurício Lima", "Minha Empresa LTDA", "longtitleop@email.com", "(81) 98593-9388", "10/08/2026 10:03", ""],
      ["mau link 2", "Maurício Lima", "Minha Empresa LTDA", "maulink22@mail.com", "(81) 98593-9388", "10/08/2026 09:56", ""],
    ]
      .map(function (r) {
        return (
          "<tr" +
          (r[6] === "edit" ? ' data-id-act="open" class="is-link"' : "") +
          "><td>" +
          r[0] +
          "</td><td><span class='hf-cli-cell-main'>" +
          r[1] +
          "</span><span class='hf-cli-cell-sub'>" +
          r[2] +
          "</span></td><td>" +
          r[3] +
          "</td><td>" +
          r[4] +
          "</td><td>" +
          r[5] +
          '</td><td class="hf-table__act-col"><button class="hf-table__act" type="button" aria-label="Mais ações"><img src="assets/icons/tbl-dots.svg" alt=""></button></td></tr>'
        );
      })
      .join("");
    return clientScreen({
      id: "cadastro",
      body:
        crumb() +
        '<div class="hf-cli-head"><div class="hf-header__titles"><h1 class="hf-header__title">Clientes</h1>' +
        '<p class="hf-header__sub">Gerencie e organize seus clientes</p></div>' +
        '<button class="hf-btn hf-btn--lg hf-btn--primary" type="button" data-id-act="new">' +
        '<span class="hf-btn__plus" aria-hidden="true"><img src="assets/icons/plus-h.svg" alt=""><img src="assets/icons/plus-v.svg" alt=""></span>Novo Cliente</button></div>' +
        demos([
          ["novo", "Cliente novo"],
          ["empresa", "Já na empresa"],
        ]) +
        '<div class="hf-table-wrap hf-cli-table"><div class="hf-table-toolbar">' +
        '<label class="hf-search"><span class="hf-search__icon" aria-hidden="true"><img src="assets/icons/search.svg" width="13" height="13" alt=""></span>' +
        '<input class="hf-search__field" type="search" placeholder="Procurar por cliente..."></label>' +
        '<div class="hf-cli-toolbar-acts">' +
        '<button class="hf-btn hf-btn--lg hf-btn--ghost" type="button">' +
        ico("list-filter", 20) +
        "Filtros</button>" +
        '<button class="hf-btn hf-btn--lg hf-btn--ghost hf-btn--icon" type="button" aria-label="Colunas">' +
        ico("settings-2", 16) +
        "</button></div></div>" +
        '<div class="hf-table-body"><table class="hf-table"><thead><tr>' +
        "<th><button class='hf-sort' type='button'>Cliente<img src='assets/icons/tbl-sort.svg' alt=''></button></th>" +
        "<th><button class='hf-sort' type='button'>Personal Finance<img src='assets/icons/tbl-sort.svg' alt=''></button></th>" +
        "<th><button class='hf-sort' type='button'>Email<img src='assets/icons/tbl-sort.svg' alt=''></button></th>" +
        "<th><button class='hf-sort' type='button'>Telefone<img src='assets/icons/tbl-sort.svg' alt=''></button></th>" +
        "<th><button class='hf-sort' type='button'>Data de criação<img src='assets/icons/tbl-sort.svg' alt=''></button></th>" +
        '<th class="hf-table__act-col"></th></tr></thead><tbody>' +
        rows +
        "</tbody></table></div></div>",
      sheet:
        '<div class="hf-cli-drawer" data-id-sheet hidden><aside class="hf-cli-sheet">' +
        '<div class="hf-cli-sheet__head"><h2>Novo Cliente</h2>' +
        '<button class="hf-sheet__close" type="button" data-id-act="close-sheet" aria-label="Fechar">' +
        ico("x", 16) +
        "</button></div>" +
        '<div class="hf-cli-sheet__form">' +
        radios("cadastro-tipo", true) +
        field({
          label: "CPF",
          placeholder: "ex.: 999.999.999-99",
          req: true,
          mod: "hf-cli-field",
          extra: ' data-id-doc inputmode="numeric" autocomplete="off"',
        }) +
        '<div class="hf-match-host hf-cli-match" data-id-panel></div>' +
        '<div class="hf-cli-rest" data-id-rest hidden>' +
        field({
          label: "Nome",
          placeholder: "nome completo",
          req: true,
          mod: "hf-cli-field",
          extra: " data-id-name",
        }) +
        pair(
          field({
            label: "Telefone",
            placeholder: "ex.: 81 99999-9999",
            req: true,
            extra: ' data-id-phone inputmode="numeric"',
          }),
          field({
            label: "Email",
            placeholder: "ex.: nome@dominio.com",
            req: true,
            extra: " data-id-email",
          })
        ) +
        pair(
          field({
            label: "Data de nascimento",
            placeholder: "dd/mm/aaaa",
            extra: " data-id-birth",
          }),
          selectPf()
        ) +
        "</div>" +
        '<hr class="hf-cli-div">' +
        '<div class="hf-cli-sheet__foot">' +
        darkBtn("Registrar", "create") +
        "</div></div></aside></div>",
      overlay: overlay(
        '<div class="hf-dialog"><div class="hf-dialog__head"><h3 class="hf-dialog__title">Importar cliente para a sua base?</h3></div>' +
          '<p class="hf-dialog__desc">A ficha continua única na empresa. Você passa a vê-la na sua lista, sem criar um segundo cadastro.</p>' +
          '<div class="hf-dialog__slot" data-id-import-slot></div><hr class="hf-dialog__div">' +
          '<div class="hf-dialog__foot">' +
          btn("ghost", "Cancelar", "import-cancel", "lg") +
          btn("primary", "Importar para minha base", "import-confirm", "lg") +
          "</div></div>"
      ),
    });
  }

  function edicaoHtml() {
    return clientScreen({
      id: "edicao",
      body:
        crumb("Detalhe do Cliente") +
        '<div class="hf-cli-head hf-cli-head--detail">' +
        '<button class="hf-btn hf-btn--lg hf-btn--ghost hf-btn--icon" type="button" data-id-act="back" aria-label="Voltar">' +
        ico("arrow-left", 24) +
        "</button>" +
        '<div class="hf-header__titles"><h1 class="hf-header__title">Detalhes do Cliente</h1>' +
        '<p class="hf-header__sub">Informações do cliente e histórico de todas as operações associadas.</p></div>' +
        '<button class="hf-btn hf-btn--lg hf-btn--ghost hf-btn--icon" type="button" aria-label="Excluir">' +
        ico("trash-2", 20) +
        "</button></div>" +
        '<div class="hf-id-role" data-id-role>Perfil em teste: <strong>usuário comum</strong> · sem operação formalizada</div>' +
        demos([
          ["livre", "Sem formalização"],
          ["trava", "Com formalização · usuário"],
          ["gestor", "Com formalização · gestor"],
          ["backoffice", "Backoffice HubFi"],
        ]) +
        '<div class="hf-cli-cols">' +
        '<section class="hf-cli-card"><h3>Informações</h3>' +
        '<div class="hf-match-host hf-cli-match" data-id-panel></div>' +
        '<div class="hf-cli-sheet__form">' +
        radios("edicao-tipo", true) +
        field({
          label: "CPF",
          value: "222.333.444-55",
          req: true,
          mod: "hf-cli-field",
          extra: ' data-id-doc inputmode="numeric"',
        }) +
        field({
          label: "Nome",
          value: "Camila Ferreira",
          req: true,
          mod: "hf-cli-field",
          extra: " data-id-name",
        }) +
        pair(
          field({
            label: "Telefone",
            value: "(11) 97777-4411",
            req: true,
            badge: "Verificado",
            extra: ' data-id-phone inputmode="numeric"',
          }),
          field({
            label: "Email",
            value: "camila.ferreira@email.com",
            req: true,
            badge: "Verificado",
            extra: " data-id-email",
          })
        ) +
        pair(
          field({
            label: "Data de nascimento",
            placeholder: "dd/mm/aaaa",
            extra: " data-id-birth",
          }),
          selectPf("Maurício Lima")
        ) +
        '<hr class="hf-cli-div">' +
        '<div class="hf-cli-sheet__foot">' +
        darkBtn("Salvar", "save") +
        "</div></div></section>" +
        '<section class="hf-cli-card"><h3>Operações</h3>' +
        '<button class="hf-cli-op" type="button" data-id-act="open-op">' +
        '<div class="hf-cli-op__body"><div class="hf-cli-op__meta"><span class="hf-cli-op__id">OP-002939</span>' +
        '<span class="hf-cli-op__chip">Formulário Proposta</span></div>' +
        "<strong>Financiamento Imobiliário - Portabilidade</strong></div>" +
        ico("chevron-right", 24) +
        "</button></section></div>" +
        '<div class="hf-id-audit"><h3>Auditoria do cadastro</h3><ul data-id-audit></ul></div>',
      overlay: overlay(
        '<div class="hf-dialog"><div class="hf-dialog__head"><h3 class="hf-dialog__title">Alterar documento</h3></div>' +
          '<p class="hf-dialog__desc">Este cliente já tem operação formalizada. A alteração exige justificativa e fica na auditoria.</p>' +
          '<div class="hf-dialog__slot">' +
          field({
            label: "Novo CPF",
            placeholder: "000.000.000-00",
            extra: ' data-id-new-doc inputmode="numeric"',
          }) +
          '<div class="hf-field hf-field--area"><div class="hf-field__header"><span class="hf-field__label">Justificativa</span><span class="hf-field__req">*</span></div>' +
          '<div class="hf-field__control hf-field__control--area"><textarea class="hf-field__area" data-id-reason placeholder="Explique o motivo da correção. Fica registrado na auditoria."></textarea></div></div>' +
          '</div><hr class="hf-dialog__div"><div class="hf-dialog__foot">' +
          btn("ghost", "Cancelar", "doc-cancel", "lg") +
          btn("primary", "Salvar documento", "doc-confirm", "lg") +
          "</div></div>"
      ),
    });
  }

  function publicHtml() {
    return (
      '<div class="docs-screen docs-screen--public" data-id-root="publico">' +
      '<div class="hf-pub">' +
      '<img class="hf-pub__logo" src="assets/logos/h-color-light.svg" width="109" height="27" alt="hubfi">' +
      '<p class="hf-pub__kicker">Abertura de operação · Jardins Imóveis</p>' +
      '<h1 class="hf-pub__title" data-id-title>Informe seu documento</h1>' +
      '<p class="hf-pub__sub" data-id-sub>Usamos o CPF ou CNPJ só para localizar ou criar sua ficha nesta empresa.</p>' +
      '<div class="hf-pub__steps" data-id-steps></div>' +
      '<div class="hf-pub__card" data-id-card></div>' +
      demos([
        ["completo", "Já cadastrado"],
        ["incompleto", "Contato incompleto"],
        ["novo", "Cliente novo"],
        ["legado", "Ficha sem documento"],
        ["corretor", "Dados do corretor"],
      ]) +
      "</div></div>"
    );
  }

  function bindCadastro(root) {
    var shell = root.querySelector('[data-id-root="cadastro"]');
    if (!shell) return;
    var state = { tipo: "PF", doc: "", imported: false };
    var sheet = shell.querySelector("[data-id-sheet]");
    var docInput = shell.querySelector("[data-id-doc]");
    var nameInput = shell.querySelector("[data-id-name]");
    var emailInput = shell.querySelector("[data-id-email]");
    var phoneInput = shell.querySelector("[data-id-phone]");
    var panel = shell.querySelector("[data-id-panel]");
    var next = shell.querySelector('[data-id-act="create"]');

    function expectedLen() {
      return state.tipo === "PJ" ? 14 : 11;
    }

    function maskDoc(value) {
      return state.tipo === "PJ" ? cnpjMask(value) : cpfMask(value);
    }

    function found() {
      return COMPANY[state.doc] || null;
    }

    function openSheet() {
      if (!sheet) return;
      sheet.hidden = false;
      sheet.classList.add("is-open");
    }

    function closeSheet() {
      if (!sheet) return;
      sheet.hidden = true;
      sheet.classList.remove("is-open");
    }

    function setTipo(tipo) {
      state.tipo = tipo;
      var pf = shell.querySelector('[data-id-tipo="PF"]');
      var pj = shell.querySelector('[data-id-tipo="PJ"]');
      if (pf) pf.checked = tipo === "PF";
      if (pj) pj.checked = tipo === "PJ";
      var label = docInput && docInput.closest(".hf-field")
        ? docInput.closest(".hf-field").querySelector(".hf-field__label")
        : null;
      if (label) label.textContent = tipo === "PJ" ? "CNPJ" : "CPF";
    }

    function paintPanel() {
      var client = found();
      var rest = shell.querySelector("[data-id-rest]");
      if (state.doc.length !== expectedLen()) {
        panel.innerHTML = "";
        if (rest) rest.hidden = true;
        return;
      }
      if (client && !state.imported) {
        if (rest) rest.hidden = true;
        panel.innerHTML = matchCard(
          "warning",
          "Este documento já está na sua empresa",
          "Não criamos uma segunda ficha. Localize o cadastro existente ou importe para a sua base.",
          facts([
            ["Cliente", client.name],
            ["Cadastrado por", client.owner],
            ["Desde", client.created],
          ]),
          btn("primary", "Importar para minha base", "import", "lg") +
            btn("ghost", "Abrir cadastro existente", "open", "lg")
        );
        return;
      }
      if (client && state.imported) {
        if (rest) rest.hidden = true;
        panel.innerHTML = matchCard(
          "success",
          "Cliente na sua base",
          client.name + " agora aparece na sua lista. A ficha da empresa continua única.",
          "",
          btn("primary", "Abrir cadastro", "open", "lg")
        );
        return;
      }
      if (rest) rest.hidden = false;
      panel.innerHTML = "";
    }

    function paint() {
      paintPanel();
      var client = found();
      var complete = state.doc.length === expectedLen();
      var blocked = !!client;
      if (next) {
        next.disabled = !complete || blocked;
        next.hidden = blocked;
      }
      shell.querySelectorAll("[data-id-demo]").forEach(function (btnEl) {
        var map = { novo: "39053344705", empresa: "22233344455" };
        btnEl.classList.toggle("is-on", map[btnEl.getAttribute("data-id-demo")] === state.doc);
      });
    }

    function lookup() {
      state.doc = digits(docInput.value).slice(0, expectedLen());
      state.imported = false;
      docInput.value = maskDoc(state.doc);
      var client = found();
      if (client) {
        nameInput.value = client.name;
        emailInput.value = client.email;
        phoneInput.value = client.phone;
      }
      paint();
    }

    if (docInput) {
      docInput.addEventListener("input", lookup);
      docInput.addEventListener("blur", lookup);
    }
    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        phoneInput.value = phoneMask(phoneInput.value);
      });
    }
    shell.querySelectorAll("[data-id-tipo]").forEach(function (input) {
      input.addEventListener("change", function () {
        setTipo(input.getAttribute("data-id-tipo"));
        lookup();
      });
    });
    shell.querySelectorAll("[data-id-demo]").forEach(function (btnEl) {
      btnEl.addEventListener("click", function () {
        var map = { novo: "39053344705", empresa: "22233344455" };
        setTipo("PF");
        openSheet();
        docInput.value = map[btnEl.getAttribute("data-id-demo")] || "";
        lookup();
      });
    });
    shell.addEventListener("click", function (event) {
      if (event.target.closest(".hf-table__act")) return;
      var act = event.target.closest("[data-id-act]");
      if (!act || !shell.contains(act)) return;
      var which = act.getAttribute("data-id-act");
      if (which === "new") {
        openSheet();
        return;
      }
      if (which === "close-sheet") {
        closeSheet();
        return;
      }
      if (which === "import") {
        var client = found();
        var slot = shell.querySelector("[data-id-import-slot]");
        if (slot && client) {
          slot.innerHTML =
            "<strong>" +
            client.name +
            "</strong><p>" +
            maskDoc(state.doc) +
            " · cadastrado por " +
            client.owner +
            "</p>";
        }
        openOverlay(shell);
        return;
      }
      if (which === "import-cancel") {
        closeOverlay(shell);
        return;
      }
      if (which === "import-confirm") {
        state.imported = true;
        closeOverlay(shell);
        paint();
        showToast("Cliente importado para a sua base.");
        return;
      }
      if (which === "open") {
        location.hash = "#/edicao-cliente";
        return;
      }
      if (which === "create") {
        if (!String(nameInput.value || "").trim()) {
          showToast("Informe o nome do cliente.");
          return;
        }
        closeSheet();
        showToast("Cliente cadastrado nesta empresa.");
      }
    });
    if (sheet) {
      sheet.addEventListener("click", function (event) {
        if (event.target === sheet) closeSheet();
      });
    }
    var overlayEl = shell.querySelector("[data-id-overlay]");
    if (overlayEl) {
      overlayEl.addEventListener("click", function (event) {
        if (event.target === overlayEl) closeOverlay(shell);
      });
    }
    paint();
  }

  function bindEdicao(root) {
    var shell = root.querySelector('[data-id-root="edicao"]');
    if (!shell) return;
    var state = {
      role: "user",
      formalized: false,
      doc: "22233344455",
      emailVerified: true,
      phoneVerified: true,
      audit: [
        {
          field: "Cadastro",
          from: "—",
          to: "Criado por Ana Costa",
          who: "Ana Costa",
          when: "08/04/2026 11:20",
        },
      ],
    };
    var docInput = shell.querySelector("[data-id-doc]");
    var emailInput = shell.querySelector("[data-id-email]");
    var phoneInput = shell.querySelector("[data-id-phone]");
    var panel = shell.querySelector("[data-id-panel]");
    var roleEl = shell.querySelector("[data-id-role]");
    var auditEl = shell.querySelector("[data-id-audit]");
    var original = {
      doc: digits(docInput.value),
      email: emailInput.value,
      phone: digits(phoneInput.value),
    };

    function canEditDoc() {
      if (!state.formalized) return true;
      return state.role === "manager" || state.role === "backoffice";
    }

    function paintBadges() {
      var emailField = emailInput.closest(".hf-field");
      var phoneField = phoneInput.closest(".hf-field");
      var emailBadge = emailField.querySelector(".hf-id-badge");
      var phoneBadge = phoneField.querySelector(".hf-id-badge");
      if (emailBadge) emailBadge.hidden = !state.emailVerified;
      if (phoneBadge) phoneBadge.hidden = !state.phoneVerified;
    }

    function paintAudit() {
      auditEl.innerHTML = state.audit
        .map(function (row) {
          return (
            "<li><strong>" +
            row.field +
            "</strong><span>" +
            row.from +
            " → " +
            row.to +
            '</span><small>' +
            row.who +
            " · " +
            row.when +
            "</small></li>"
          );
        })
        .join("");
    }

    function paint() {
      var locked = !canEditDoc();
      docInput.disabled = locked;
      docInput.closest(".hf-field").classList.toggle("hf-field--disabled", locked);
      var labels = {
        user: state.formalized
          ? "Perfil em teste: <strong>usuário comum</strong> · operação formalizada"
          : "Perfil em teste: <strong>usuário comum</strong> · sem operação formalizada",
        manager: "Perfil em teste: <strong>gestor da empresa</strong> · operação formalizada",
        backoffice: "Perfil em teste: <strong>backoffice HubFi</strong> · acesso irrestrito",
      };
      if (roleEl) roleEl.innerHTML = labels[state.role] || labels.user;
      if (locked) {
        panel.innerHTML = matchCard(
          "info",
          "Documento travado",
          "Já existe operação formalizada. Um gestor da empresa altera com justificativa.",
          "",
          state.role === "manager" || state.role === "backoffice"
            ? btn("primary", "Alterar documento", "unlock-doc", "lg")
            : ""
        );
      } else {
        panel.innerHTML = matchCard(
          "success",
          "Documento editável",
          "Ainda não há operação formalizada. Qualquer usuário com acesso corrige o documento."
        );
      }
      paintBadges();
      paintAudit();
      shell.querySelectorAll("[data-id-demo]").forEach(function (btnEl) {
        btnEl.classList.toggle("is-on", btnEl.getAttribute("data-id-demo") === state.demo);
      });
    }

    function pushAudit(fieldName, from, to) {
      state.audit.unshift({
        field: fieldName,
        from: from,
        to: to,
        who: state.role === "backoffice" ? "Backoffice HubFi" : "Lucas Augusto",
        when: "agora",
      });
    }

    emailInput.addEventListener("input", function () {
      if (normEmail(emailInput.value) !== normEmail(original.email) && state.emailVerified) {
        state.emailVerified = false;
        paintBadges();
        panel.innerHTML = matchCard(
          "warning",
          "Verificação de e-mail desfeita",
          "Na próxima vez que este canal for usado para acesso, um código novo será pedido."
        );
      }
    });
    phoneInput.addEventListener("input", function () {
      phoneInput.value = phoneMask(phoneInput.value);
      if (digits(phoneInput.value) !== original.phone && state.phoneVerified) {
        state.phoneVerified = false;
        paintBadges();
        panel.innerHTML = matchCard(
          "warning",
          "Verificação de telefone desfeita",
          "A edição não impede a troca de contato. Só desfaz a confirmação daquele canal."
        );
      }
    });
    shell.querySelectorAll("[data-id-demo]").forEach(function (btnEl) {
      btnEl.addEventListener("click", function () {
        var which = btnEl.getAttribute("data-id-demo");
        state.demo = which;
        if (which === "livre") {
          state.role = "user";
          state.formalized = false;
        }
        if (which === "trava") {
          state.role = "user";
          state.formalized = true;
        }
        if (which === "gestor") {
          state.role = "manager";
          state.formalized = true;
        }
        if (which === "backoffice") {
          state.role = "backoffice";
          state.formalized = true;
        }
        paint();
      });
    });
    shell.querySelectorAll("[data-id-tipo]").forEach(function (input) {
      input.addEventListener("change", function () {
        var label = docInput.closest(".hf-field").querySelector(".hf-field__label");
        if (label) label.textContent = input.getAttribute("data-id-tipo") === "PJ" ? "CNPJ" : "CPF";
      });
    });
    shell.addEventListener("click", function (event) {
      var act = event.target.closest("[data-id-act]");
      if (!act || !shell.contains(act)) return;
      var which = act.getAttribute("data-id-act");
      if (which === "unlock-doc") {
        openOverlay(shell);
        return;
      }
      if (which === "doc-cancel") {
        closeOverlay(shell);
        return;
      }
      if (which === "doc-confirm") {
        var nextDoc = digits(shell.querySelector("[data-id-new-doc]").value);
        var reason = String(shell.querySelector("[data-id-reason]").value || "").trim();
        if (nextDoc.length !== 11) {
          showToast("Informe um CPF válido.");
          return;
        }
        if (COMPANY[nextDoc] && nextDoc !== state.doc) {
          showToast("Este documento já pertence a outro cliente da empresa.");
          return;
        }
        if (!reason && state.role !== "backoffice") {
          showToast("A justificativa é obrigatória.");
          return;
        }
        pushAudit("Documento", cpfMask(state.doc), cpfMask(nextDoc));
        state.doc = nextDoc;
        docInput.value = cpfMask(nextDoc);
        closeOverlay(shell);
        paint();
        showToast("Documento atualizado e registrado na auditoria.");
        return;
      }
      if (which === "save") {
        if (digits(docInput.value) !== original.doc) {
          if (state.formalized && state.role === "user") {
            showToast("Usuário comum não altera documento após formalização.");
            return;
          }
          pushAudit("Documento", cpfMask(original.doc), cpfMask(docInput.value));
          original.doc = digits(docInput.value);
        }
        if (normEmail(emailInput.value) !== normEmail(original.email)) {
          pushAudit("E-mail", original.email, emailInput.value);
          original.email = emailInput.value;
        }
        if (digits(phoneInput.value) !== original.phone) {
          pushAudit("Telefone", phoneMask(original.phone), phoneInput.value);
          original.phone = digits(phoneInput.value);
        }
        paintAudit();
        showToast("Alterações salvas.");
        return;
      }
      if (which === "back" || which === "cancel") {
        location.hash = "#/cadastro-cliente";
        return;
      }
      if (which === "open-op") {
        location.hash = "#/detalhes-operacao";
      }
    });
    var overlayEl = shell.querySelector("[data-id-overlay]");
    if (overlayEl) {
      overlayEl.addEventListener("click", function (event) {
        if (event.target === overlayEl) closeOverlay(shell);
      });
    }
    state.demo = "livre";
    paint();
  }

  function bindPublico(root) {
    var shell = root.querySelector('[data-id-root="publico"]');
    if (!shell) return;
    var state = {
      step: "doc",
      doc: "",
      name: "",
      email: "",
      phone: "",
      skipEmail: false,
      skipPhone: false,
      emailOk: false,
      phoneOk: false,
      otp: "",
      demo: "",
    };
    var title = shell.querySelector("[data-id-title]");
    var sub = shell.querySelector("[data-id-sub]");
    var card = shell.querySelector("[data-id-card]");
    var steps = shell.querySelector("[data-id-steps]");

    function client() {
      return COMPANY[state.doc] || null;
    }

    function complete() {
      var c = client();
      return !!(c && c.emailVerified && c.phoneVerified && c.email && c.phone && !c.noDocument);
    }

    function paintSteps() {
      var labels = ["Documento", "Contato", "Verificação"];
      var idx = state.step === "doc" ? 0 : state.step === "otp" ? 2 : 1;
      steps.innerHTML = labels
        .map(function (label, i) {
          var cls = i === idx ? "is-current" : i < idx ? "is-done" : "is-todo";
          return '<span class="hf-pub-step ' + cls + '">' + label + "</span>";
        })
        .join('<i class="hf-pub-step__line"></i>');
    }

    function fieldRow(opts) {
      return field(opts);
    }

    function actions(primary, primaryAct, extra) {
      return (
        '<div class="hf-pub__acts">' +
        (extra || "") +
        '<button class="hf-open__next" type="button" data-id-act="' +
        primaryAct +
        '">' +
        primary +
        "</button></div>"
      );
    }

    function paintCard() {
      if (state.step === "doc") {
        title.textContent = "Informe seu documento";
        sub.textContent = "Usamos o CPF só para localizar ou criar sua ficha nesta empresa.";
        card.innerHTML =
          '<div data-pub-panel></div>' +
          fieldRow({
            label: "CPF",
            placeholder: "000.000.000-00",
            value: cpfMask(state.doc),
            req: true,
            extra: ' data-pub-doc inputmode="numeric"',
          }) +
          actions("Continuar", "doc-next");
        return;
      }
      if (state.step === "contato") {
        var c = client();
        title.textContent = c && !c.noDocument ? "Complete seu contato" : "Seus dados";
        sub.textContent = "Pelo menos um canal precisa ser verificado. Pular os dois impede o acesso.";
        card.innerHTML =
          '<div data-pub-panel></div>' +
          fieldRow({
            label: "CPF",
            value: cpfMask(state.doc),
            disabled: true,
            extra: " data-pub-doc-ro",
          }) +
          (c && !c.noDocument
            ? ""
            : fieldRow({
                label: "Nome completo",
                placeholder: "Como você se chama",
                value: state.name,
                extra: " data-pub-name",
              })) +
          fieldRow({
            label: "E-mail",
            placeholder: "email@cliente.com",
            value: state.email,
            extra: " data-pub-email",
            hint: state.skipEmail ? "Canal pulado. Você não receberá atualizações por e-mail." : "",
          }) +
          fieldRow({
            label: "Telefone",
            placeholder: "(00) 00000-0000",
            value: state.phone,
            extra: ' data-pub-phone inputmode="numeric"',
            hint: state.skipPhone ? "Canal pulado. Você não receberá atualizações por WhatsApp." : "",
          }) +
          actions(
            "Verificar canais",
            "contato-next",
            '<button class="hf-btn hf-btn--lg hf-btn--ghost" type="button" data-id-act="skip-one">Pular um canal</button>'
          );
        return;
      }
      if (state.step === "verify-email") {
        title.textContent = "Confirme o e-mail";
        sub.textContent = "Enviamos um código para " + state.email + ".";
        card.innerHTML =
          fieldRow({
            label: "Código de 6 dígitos",
            placeholder: "000000",
            extra: ' data-pub-otp inputmode="numeric"',
          }) +
          '<p class="hf-id-hint">Protótipo: use 123456.</p>' +
          actions("Confirmar e-mail", "email-ok", '<button class="hf-btn hf-btn--lg hf-btn--ghost" type="button" data-id-act="skip-email">Pular e-mail</button>');
        return;
      }
      if (state.step === "verify-phone") {
        title.textContent = "Confirme o WhatsApp";
        sub.textContent = "Enviamos um código para " + state.phone + ".";
        card.innerHTML =
          fieldRow({
            label: "Código de 6 dígitos",
            placeholder: "000000",
            extra: ' data-pub-otp inputmode="numeric"',
          }) +
          '<p class="hf-id-hint">Protótipo: use 123456.</p>' +
          actions("Confirmar telefone", "phone-ok", '<button class="hf-btn hf-btn--lg hf-btn--ghost" type="button" data-id-act="skip-phone">Pular telefone</button>');
        return;
      }
      title.textContent = "Código de acesso";
      sub.textContent = complete()
        ? "Encontramos sua ficha. Confirme o acesso para seguir."
        : "Sessão liberada pelo canal confirmado.";
      card.innerHTML =
        fieldRow({
          label: "Código de acesso",
          placeholder: "000000",
          extra: ' data-pub-otp inputmode="numeric"',
        }) +
        '<p class="hf-id-hint">Protótipo: use 123456.</p>' +
        actions("Entrar no formulário", "enter");
    }

    function panelMsg(html) {
      var panel = card.querySelector("[data-pub-panel]");
      if (panel) panel.innerHTML = html;
    }

    function paint() {
      paintSteps();
      paintCard();
      shell.querySelectorAll("[data-id-demo]").forEach(function (btnEl) {
        btnEl.classList.toggle("is-on", btnEl.getAttribute("data-id-demo") === state.demo);
      });
    }

    function syncFromCard() {
      var doc = card.querySelector("[data-pub-doc]");
      var name = card.querySelector("[data-pub-name]");
      var email = card.querySelector("[data-pub-email]");
      var phone = card.querySelector("[data-pub-phone]");
      if (doc) {
        state.doc = digits(doc.value).slice(0, 11);
        doc.value = cpfMask(state.doc);
      }
      if (name) state.name = name.value;
      if (email) state.email = email.value;
      if (phone) {
        state.phone = phoneMask(phone.value);
        phone.value = state.phone;
      }
    }

    function goAfterDoc() {
      if (state.doc.length !== 11) {
        panelMsg(matchCard("warning", "Documento obrigatório", "Informe um CPF válido para continuar."));
        return;
      }
      if (isBrokerDoc(state.doc)) {
        panelMsg(matchCard("error", "Documento inválido para este link", "Use o CPF da pessoa que vai contratar."));
        return;
      }
      var c = client();
      if (c && c.noDocument) {
        state.step = "contato";
        state.email = c.email;
        state.phone = c.phone;
        paint();
        return;
      }
      if (complete()) {
        state.step = "otp";
        paint();
        return;
      }
      if (c) {
        state.name = c.name;
        state.email = c.email || "";
        state.phone = c.phone || "";
      }
      state.step = "contato";
      paint();
    }

    function canSkipBoth() {
      return state.skipEmail && state.skipPhone;
    }

    function nextFromContato() {
      if (isBrokerContact(state.email, state.phone)) {
        panelMsg(matchCard("error", "Contato do profissional responsável", "Informe o e-mail e o telefone do cliente."));
        return;
      }
      var c = client();
      if ((!c || c.noDocument) && digits(state.phone) && COMPANY["33344455566"] && normEmail(state.email) === "helena.dias@email.com") {
        showToast("Ficha sem documento atualizada. O CPF foi gravado nela.");
      }
      if (!state.skipEmail && state.email) {
        state.step = "verify-email";
        paint();
        return;
      }
      if (!state.skipPhone && state.phone) {
        state.step = "verify-phone";
        paint();
        return;
      }
      panelMsg(matchCard("warning", "Confirme pelo menos um canal", "Não dá para pular e-mail e telefone ao mesmo tempo."));
    }

    shell.addEventListener("input", function (event) {
      if (event.target.hasAttribute("data-pub-doc")) {
        event.target.value = cpfMask(event.target.value);
        state.doc = digits(event.target.value);
      }
      if (event.target.hasAttribute("data-pub-phone")) {
        event.target.value = phoneMask(event.target.value);
      }
    });
    shell.addEventListener("click", function (event) {
      var demo = event.target.closest("[data-id-demo]");
      if (demo) {
        var which = demo.getAttribute("data-id-demo");
        state = {
          step: "doc",
          doc: "",
          name: "",
          email: "",
          phone: "",
          skipEmail: false,
          skipPhone: false,
          emailOk: false,
          phoneOk: false,
          otp: "",
          demo: which,
        };
        var map = {
          completo: "11122233344",
          incompleto: "44455566677",
          novo: "39053344705",
          legado: "33344455566",
          corretor: BROKER.cpf,
        };
        state.doc = map[which] || "";
        if (which === "legado") {
          state.email = "helena.dias@email.com";
          state.phone = "(21) 98888-2200";
        }
        paint();
        if (state.doc.length === 11) goAfterDoc();
        return;
      }
      var act = event.target.closest("[data-id-act]");
      if (!act) return;
      var which = act.getAttribute("data-id-act");
      syncFromCard();
      if (which === "doc-next") return goAfterDoc();
      if (which === "skip-one") {
        if (!state.skipEmail) state.skipEmail = true;
        else if (!state.skipPhone) state.skipPhone = true;
        if (canSkipBoth()) {
          state.skipPhone = false;
          panelMsg(matchCard("warning", "Pelo menos um canal", "Você pode pular e-mail ou telefone, nunca os dois."));
          return;
        }
        paint();
        showToast("Canal pulado. As atualizações vão só pelo canal confirmado.");
        return;
      }
      if (which === "contato-next") return nextFromContato();
      if (which === "skip-email") {
        if (state.skipPhone) {
          showToast("Confirme o telefone. Não dá para pular os dois canais.");
          return;
        }
        state.skipEmail = true;
        state.step = state.phone && !state.skipPhone ? "verify-phone" : "otp";
        paint();
        return;
      }
      if (which === "skip-phone") {
        if (state.skipEmail) {
          showToast("Confirme o e-mail. Não dá para pular os dois canais.");
          return;
        }
        state.skipPhone = true;
        state.step = state.emailOk || state.skipEmail ? "otp" : "verify-email";
        if (state.emailOk || state.email) state.step = "otp";
        paint();
        return;
      }
      if (which === "email-ok") {
        var otp = card.querySelector("[data-pub-otp]");
        if (!otp || otp.value !== "123456") {
          showToast("Código inválido. Use 123456 neste protótipo.");
          return;
        }
        state.emailOk = true;
        state.step = state.skipPhone || !state.phone ? "otp" : "verify-phone";
        paint();
        return;
      }
      if (which === "phone-ok") {
        var otp2 = card.querySelector("[data-pub-otp]");
        if (!otp2 || otp2.value !== "123456") {
          showToast("Código inválido. Use 123456 neste protótipo.");
          return;
        }
        state.phoneOk = true;
        state.step = "otp";
        paint();
        return;
      }
      if (which === "enter") {
        var otp3 = card.querySelector("[data-pub-otp]");
        if (!otp3 || otp3.value !== "123456") {
          showToast("Código inválido. Use 123456 neste protótipo.");
          return;
        }
        showToast("Acesso liberado. Seguindo para o formulário.");
      }
    });
    paint();
  }

  catalog.pages["cadastro-cliente"] = {
    title: "Cadastro de cliente",
    lead: "Criação explícita bloqueia documento já existente na empresa e oferece importar a ficha para a base do usuário.",
    leadHtml:
      '<ol class="docs-howto">' +
      "<li><em>1</em><div><strong>Documento primeiro</strong><span>CPF ou CNPJ decide se a ficha já existe nesta empresa</span></div></li>" +
      "<li><em>2</em><div><strong>Já na empresa</strong><span>Não cria outra ficha. Importar para a sua base ou abrir o cadastro</span></div></li>" +
      "<li><em>3</em><div><strong>Documento livre</strong><span>Cadastra normalmente, inclusive se o mesmo CPF existir em outra empresa — sem citar isso</span></div></li>" +
      "</ol>",
    node: "1-1870",
    figmaFile: "https://www.figma.com/design/C9RP2qnls5pDBjMSEdhT1n/Untitled?node-id=1-1870",
    wide: true,
    section: "Telas",
    html: cadastroHtml,
  };

  catalog.pages["edicao-cliente"] = {
    title: "Edição de cliente",
    lead: "Nome livre. Documento trava após operação formalizada. Editar e-mail ou telefone desfaz a verificação daquele canal e gera auditoria.",
    leadHtml:
      '<ol class="docs-howto">' +
      "<li><em>1</em><div><strong>Sem formalização</strong><span>Qualquer usuário com acesso corrige o documento</span></div></li>" +
      "<li><em>2</em><div><strong>Com formalização</strong><span>Usuário comum não altera. Gestor informa justificativa</span></div></li>" +
      "<li><em>3</em><div><strong>Contato</strong><span>Trocar e-mail ou telefone verificado remove a confirmação daquele canal</span></div></li>" +
      "<li><em>4</em><div><strong>Auditoria</strong><span>Documento, e-mail e telefone registram valor anterior, novo, autor e data</span></div></li>" +
      "</ol>",
    node: "1-1871",
    figmaFile: "https://www.figma.com/design/C9RP2qnls5pDBjMSEdhT1n/Untitled?node-id=1-1871",
    wide: true,
    section: "Telas",
    html: edicaoHtml,
  };

  catalog.pages["link-publico"] = {
    title: "Link público",
    lead: "Documento primeiro. Ficha completa vai para o código de acesso. Ficha nova verifica e-mail e telefone, podendo pular só um canal.",
    leadHtml:
      '<ol class="docs-howto">' +
      "<li><em>1</em><div><strong>Documento</strong><span>Primeira etapa. Ficha completa, incompleta ou nova seguem o fluxo da spec</span></div></li>" +
      "<li><em>2</em><div><strong>Ficha completa</strong><span>Pula coleta e vai para verificação de acesso</span></div></li>" +
      "<li><em>3</em><div><strong>Um canal</strong><span>Dá para pular e-mail ou WhatsApp, nunca os dois. Comunicação segue só no canal confirmado</span></div></li>" +
      "<li><em>4</em><div><strong>Legado</strong><span>Contato verificado de ficha sem documento grava o CPF nela, em vez de criar outra</span></div></li>" +
      "</ol>",
    wide: true,
    section: "Telas",
    html: publicHtml,
  };

  window.HF_IDENTITY = {
    bind: function (root) {
      bindCadastro(root);
      bindEdicao(root);
      bindPublico(root);
    },
  };
})();
