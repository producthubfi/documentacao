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
    "12345678900": {
      name: "Marcelo Oliveira",
      email: "marcelo.oliveira@email.com",
      phone: "(11) 98888-0101",
      owner: "Ana Costa",
      created: "12/08/2026",
      emailVerified: true,
      phoneVerified: true,
      formalized: false,
    },
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
    "55566677788": {
      name: "Bruno Alves",
      email: "bruno.alves@email.com",
      phone: "(11) 96666-1100",
      owner: "Ana Costa",
      created: "14/01/2026",
      emailVerified: true,
      phoneVerified: true,
      formalized: false,
      deleted: true,
    },
    "11222333000181": {
      name: "Jardins Incorporadora Ltda",
      email: "contato@jardins.com.br",
      phone: "(11) 3000-1000",
      owner: "Ana Costa",
      created: "12/01/2026",
      emailVerified: true,
      phoneVerified: true,
      formalized: false,
      pj: true,
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

  function hashDemo(shell) {
    var qs = (location.hash.split("?")[1] || "");
    var match = qs.match(/(?:^|&)demo=([^&]+)/);
    if (!match) return;
    var btn = shell.querySelector('[data-id-demo="' + decodeURIComponent(match[1]) + '"]');
    if (btn) btn.click();
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

  function overlayEl(root, name) {
    if (name) return root.querySelector('[data-id-overlay="' + name + '"]');
    return root.querySelector("[data-id-overlay]");
  }

  function openOverlay(root, name) {
    var el = overlayEl(root, name);
    if (!el) return;
    el.hidden = false;
    el.classList.add("is-open");
  }

  function closeOverlay(root, name) {
    var el = overlayEl(root, name);
    if (!el) return;
    el.classList.remove("is-open");
    el.hidden = true;
  }

  function otherClient(doc, current) {
    var c = COMPANY[digits(doc)];
    if (!c || c.deleted) return null;
    if (current && digits(doc) === digits(current)) return null;
    return c;
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
          ["excluido", "Cliente excluído"],
          ["pj", "Pessoa jurídica"],
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
        '<button class="hf-btn hf-btn--lg hf-btn--ghost hf-btn--icon" type="button" data-id-act="delete" aria-label="Excluir">' +
        ico("trash-2", 20) +
        "</button></div>" +
        '<div class="hf-id-role" data-id-role>Perfil em teste: <strong>usuário comum</strong> · sem operação formalizada</div>' +
        demos([
          ["livre", "Sem formalização"],
          ["trava", "Com formalização · usuário"],
          ["gestor", "Com formalização · gestor"],
          ["backoffice", "Backoffice HubFi"],
          ["colisao", "Colisão de documento"],
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
          badge: "Travado",
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
      overlay:
        overlay(
          '<div class="hf-dialog"><div class="hf-dialog__head"><h3 class="hf-dialog__title">Alterar documento</h3></div>' +
            '<p class="hf-dialog__desc">Este cliente já tem operação formalizada. A alteração exige justificativa e fica na auditoria.</p>' +
            '<div class="hf-dialog__slot">' +
            field({
              label: "Novo CPF",
              placeholder: "000.000.000-00",
              extra: ' data-id-new-doc inputmode="numeric"',
            }) +
            '<p class="hf-field__error" data-id-doc-error hidden>Este CPF já pertence a outro cliente da empresa. Não duplicamos um usuário.</p>' +
            '<div class="hf-field hf-field--area"><div class="hf-field__header"><span class="hf-field__label">Justificativa</span><span class="hf-field__req">*</span></div>' +
            '<div class="hf-field__control hf-field__control--area"><textarea class="hf-field__area" data-id-reason placeholder="Explique o motivo da correção. Fica registrado na auditoria."></textarea></div></div>' +
            '</div><hr class="hf-dialog__div"><div class="hf-dialog__foot">' +
            btn("ghost", "Cancelar", "doc-cancel", "lg") +
            btn("primary", "Salvar documento", "doc-confirm", "lg") +
            "</div></div>"
        ).replace('data-id-overlay hidden', 'data-id-overlay="doc" hidden') +
        overlay(
          '<div class="hf-dialog"><div class="hf-dialog__head"><h3 class="hf-dialog__title">Excluir cliente?</h3></div>' +
            '<p class="hf-dialog__desc">O usuário sai da base desta empresa. O CPF fica livre para um novo cadastro — não duplicamos o cliente.</p>' +
            '<hr class="hf-dialog__div"><div class="hf-dialog__foot">' +
            btn("ghost", "Cancelar", "del-cancel", "lg") +
            btn("primary", "Excluir cadastro", "del-confirm", "lg") +
            "</div></div>"
        ).replace('data-id-overlay hidden', 'data-id-overlay="del" hidden'),
    });
  }

  function publicHtml() {
    return (
      '<div class="docs-screen docs-screen--public" data-id-root="publico">' +
      '<div class="hf-pub">' +
      '<img class="hf-pub__logo" src="assets/logos/h-color-light.svg" width="109" height="27" alt="hubfi">' +
      '<p class="hf-pub__kicker">Abertura de operação · Jardins Imóveis</p>' +
      '<h1 class="hf-pub__title" data-id-title>Informe seu documento</h1>' +
      '<p class="hf-pub__sub" data-id-sub>Usamos o CPF ou CNPJ só para localizar ou cadastrar o cliente nesta empresa.</p>' +
      '<div class="hf-pub__steps" data-id-steps></div>' +
      '<div class="hf-pub__card" data-id-card></div>' +
      demos([
        ["completo", "Já cadastrado"],
        ["incompleto", "Contato incompleto"],
        ["novo", "Cliente novo"],
        ["legado", "Ficha sem documento"],
        ["corretor", "Dados do corretor"],
        ["expirado", "Token expirado"],
      ]) +
      "</div></div>"
    );
  }

  function bindCadastro(root) {
    var shell = root.querySelector('[data-id-root="cadastro"]');
    if (!shell) return;
    var state = { tipo: "PF", doc: "", typed: false };
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
      var c = COMPANY[state.doc];
      if (c && c.deleted) return null;
      if (state.doc.length !== expectedLen()) return null;
      if (c) return c;
      return COMPANY[state.tipo === "PJ" ? "11222333000181" : "22233344455"];
    }

    function released() {
      var c = COMPANY[state.doc];
      return c && c.deleted ? c : null;
    }

    function openSheet() {
      if (!sheet) return;
      sheet.hidden = false;
      sheet.classList.add("is-open");
    }

    function resetSheet() {
      state.doc = "";
      state.typed = false;
      if (docInput) docInput.value = "";
      if (nameInput) nameInput.value = "";
      if (emailInput) emailInput.value = "";
      if (phoneInput) phoneInput.value = "";
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
      if (client) {
        if (rest) rest.hidden = true;
        panel.innerHTML = matchCard(
          "warning",
          "Este usuário já está na sua empresa",
          "Não duplicamos um cliente. Abra o cadastro existente — a ficha é única na empresa, inclusive se outro colega tiver criado.",
          facts([
            ["Cliente", client.name],
            ["Cadastrado por", client.owner],
            ["Desde", client.created],
          ]),
          btn("primary", "Abrir cadastro existente", "open", "lg")
        );
        return;
      }
      var freed = released();
      if (freed) {
        if (rest) rest.hidden = false;
        panel.innerHTML = matchCard(
          "success",
          "Usuário liberado",
          "Este usuário estava em um cadastro excluído. Pode cadastrar de novo nesta empresa — não havia mais um cliente com este CPF."
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
      var demoMap = {
        empresa: "22233344455",
        excluido: "55566677788",
        pj: "11222333000181",
      };
      shell.querySelectorAll("[data-id-demo]").forEach(function (btnEl) {
        var key = btnEl.getAttribute("data-id-demo");
        var on = key === "novo" ? sheet && !sheet.hidden && !state.doc : demoMap[key] === state.doc;
        btnEl.classList.toggle("is-on", !!on);
      });
    }

    function lookup() {
      state.doc = digits(docInput.value).slice(0, expectedLen());
      docInput.value = maskDoc(state.doc);
      var client = found();
      if (client) {
        nameInput.value = client.name;
        emailInput.value = client.email;
        phoneInput.value = client.phone;
      } else {
        var gone = released();
        if (gone) {
          nameInput.value = gone.name;
          emailInput.value = gone.email;
          phoneInput.value = gone.phone;
        }
      }
      paint();
    }

    if (docInput) {
      docInput.addEventListener("input", function () {
        state.typed = true;
        lookup();
      });
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
        var which = btnEl.getAttribute("data-id-demo");
        var map = {
          empresa: "22233344455",
          excluido: "55566677788",
          pj: "11222333000181",
        };
        setTipo(which === "pj" ? "PJ" : "PF");
        if (which === "novo") {
          resetSheet();
          openSheet();
          paint();
          if (docInput) docInput.focus();
          return;
        }
        openSheet();
        docInput.value = map[which] || "";
        lookup();
      });
    });
    shell.addEventListener("click", function (event) {
      if (event.target.closest(".hf-table__act")) return;
      var act = event.target.closest("[data-id-act]");
      if (!act || !shell.contains(act)) return;
      var which = act.getAttribute("data-id-act");
      if (which === "new") {
        setTipo("PF");
        resetSheet();
        openSheet();
        paint();
        if (docInput) docInput.focus();
        return;
      }
      if (which === "close-sheet") {
        closeSheet();
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
        if (COMPANY[state.doc] && COMPANY[state.doc].deleted) {
          COMPANY[state.doc].deleted = false;
          COMPANY[state.doc].name = String(nameInput.value || "").trim() || COMPANY[state.doc].name;
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
    paint();
    hashDemo(shell);
  }

  function bindEdicao(root) {
    var shell = root.querySelector('[data-id-root="edicao"]');
    if (!shell) return;
    var state = {
      role: "user",
      formalized: false,
      deleted: false,
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
    var nameInput = shell.querySelector("[data-id-name]");
    var emailInput = shell.querySelector("[data-id-email]");
    var phoneInput = shell.querySelector("[data-id-phone]");
    var panel = shell.querySelector("[data-id-panel]");
    var roleEl = shell.querySelector("[data-id-role]");
    var auditEl = shell.querySelector("[data-id-audit]");
    var original = {
      doc: digits(docInput.value),
      name: nameInput ? String(nameInput.value || "").trim() : "",
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
      var docField = docInput.closest(".hf-field");
      var emailBadge = emailField.querySelector(".hf-id-badge");
      var phoneBadge = phoneField.querySelector(".hf-id-badge");
      var docBadge = docField.querySelector(".hf-id-badge");
      if (emailBadge) emailBadge.hidden = !state.emailVerified;
      if (phoneBadge) phoneBadge.hidden = !state.phoneVerified;
      if (docBadge) docBadge.hidden = canEditDoc() || state.deleted;
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

    function colliding() {
      return otherClient(digits(docInput.value), state.doc);
    }

    function paintCollision() {
      var clash = colliding();
      if (!clash) return false;
      panel.innerHTML = matchCard(
        "error",
          "Este cliente já pertence a outro usuário",
          "Não duplicamos um cliente. O CPF de " +
          clash.name +
          " já está nesta empresa. Em outra empresa, o mesmo CPF seria permitido."
      );
      return true;
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
      if (state.deleted) {
        docInput.disabled = true;
        panel.innerHTML = matchCard(
          "success",
          "Cadastro excluído",
          "O usuário saiu da base. Um novo cadastro pode usar este CPF — não duplicamos o cliente.",
          "",
          btn("primary", "Cadastrar de novo", "recadastro", "lg")
        );
      } else if (paintCollision()) {
        /* card already painted */
      } else if (locked) {
        panel.innerHTML = matchCard(
          "info",
          "CPF travado",
          "Nome, e-mail e telefone você edita e salva normalmente. Só o CPF exige um gestor da empresa e justificativa, porque já existe operação formalizada.",
          "",
          state.role === "manager" || state.role === "backoffice"
            ? btn("primary", "Alterar CPF", "unlock-doc", "lg")
            : ""
        );
      } else {
        panel.innerHTML = matchCard(
          "success",
          "CPF editável",
          "Ainda não há operação formalizada. Qualquer usuário com acesso corrige o CPF."
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
    docInput.addEventListener("input", function () {
      docInput.value = cpfMask(docInput.value);
      paint();
    });
    shell.querySelectorAll("[data-id-demo]").forEach(function (btnEl) {
      btnEl.addEventListener("click", function () {
        var which = btnEl.getAttribute("data-id-demo");
        state.demo = which;
        if (which === "livre") {
          state.role = "user";
          state.formalized = false;
          state.deleted = false;
          docInput.value = cpfMask(state.doc);
        }
        if (which === "trava") {
          state.role = "user";
          state.formalized = true;
          state.deleted = false;
          docInput.value = cpfMask(state.doc);
        }
        if (which === "gestor") {
          state.role = "manager";
          state.formalized = true;
          state.deleted = false;
          docInput.value = cpfMask(state.doc);
        }
        if (which === "backoffice") {
          state.role = "backoffice";
          state.formalized = true;
          state.deleted = false;
          docInput.value = cpfMask(state.doc);
        }
        if (which === "colisao") {
          state.role = "user";
          state.formalized = false;
          state.deleted = false;
          docInput.value = cpfMask("11122233344");
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
        openOverlay(shell, "doc");
        return;
      }
      if (which === "doc-cancel") {
        closeOverlay(shell, "doc");
        return;
      }
      if (which === "doc-confirm") {
        var nextDoc = digits(shell.querySelector("[data-id-new-doc]").value);
        var reason = String(shell.querySelector("[data-id-reason]").value || "").trim();
        var err = shell.querySelector("[data-id-doc-error]");
        if (err) err.hidden = true;
        if (nextDoc.length !== 11) {
          showToast("Informe um CPF válido.");
          return;
        }
        if (otherClient(nextDoc, state.doc)) {
          if (err) err.hidden = false;
          showToast("Este CPF já pertence a outro cliente. Não duplicamos um usuário.");
          return;
        }
        if (!reason && state.role !== "backoffice") {
          showToast("A justificativa é obrigatória.");
          return;
        }
        pushAudit("Documento", cpfMask(state.doc), cpfMask(nextDoc));
        state.doc = nextDoc;
        original.doc = nextDoc;
        docInput.value = cpfMask(nextDoc);
        closeOverlay(shell, "doc");
        paint();
        showToast("Documento atualizado e registrado na auditoria.");
        return;
      }
      if (which === "delete") {
        openOverlay(shell, "del");
        return;
      }
      if (which === "del-cancel") {
        closeOverlay(shell, "del");
        return;
      }
      if (which === "del-confirm") {
        if (COMPANY[state.doc]) COMPANY[state.doc].deleted = true;
        state.deleted = true;
        closeOverlay(shell, "del");
        paint();
        showToast("Cadastro excluído. Este CPF está livre para um novo usuário.");
        return;
      }
      if (which === "recadastro") {
        location.hash = "#/cadastro-cliente";
        return;
      }
      if (which === "save") {
        if (colliding()) {
          paint();
          showToast("Este CPF já pertence a outro cliente. Não duplicamos um usuário.");
          return;
        }
        var nameVal = nameInput ? String(nameInput.value || "").trim() : "";
        var nameChanged = nameVal && nameVal !== original.name;
        if (digits(docInput.value) !== original.doc) {
          if (state.formalized && state.role === "user") {
            showToast("Usuário comum não altera o CPF após formalização. Peça a um gestor.");
            return;
          }
          pushAudit("CPF", cpfMask(original.doc), cpfMask(docInput.value));
          original.doc = digits(docInput.value);
          state.doc = original.doc;
        }
        if (nameChanged) original.name = nameVal;
        if (normEmail(emailInput.value) !== normEmail(original.email)) {
          pushAudit("E-mail", original.email, emailInput.value);
          original.email = emailInput.value;
        }
        if (digits(phoneInput.value) !== original.phone) {
          pushAudit("Telefone", phoneMask(original.phone), phoneInput.value);
          original.phone = digits(phoneInput.value);
        }
        paintAudit();
        if (nameChanged && canEditDoc() === false) {
          panel.innerHTML = matchCard(
            "success",
            "Nome atualizado",
            "Nome não pede justificativa. O CPF continua travado — só um gestor da empresa altera, com justificativa."
          );
          showToast("Nome salvo.");
          return;
        }
        paint();
        showToast(nameChanged ? "Nome salvo." : "Alterações salvas.");
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
    shell.querySelectorAll("[data-id-overlay]").forEach(function (el) {
      el.addEventListener("click", function (event) {
        if (event.target === el) closeOverlay(shell, el.getAttribute("data-id-overlay"));
      });
    });
    state.demo = "livre";
    paint();
    hashDemo(shell);
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
      expired: false,
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
        sub.textContent = "Usamos o CPF só para localizar ou cadastrar o cliente nesta empresa.";
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
        ? state.expired
          ? "O acesso anterior expirou. Confirme o código novamente."
          : "Encontramos o seu cadastro. Confirme o acesso para seguir."
        : "Sessão liberada pelo canal confirmado.";
      card.innerHTML =
        (state.expired
          ? matchCard(
              "warning",
              "Acesso expirado",
              "O token desta sessão venceu. Autentique de novo para entrar no formulário."
            )
          : "") +
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
        state.expired = state.demo === "expirado";
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
          expired: which === "expirado",
        };
        var map = {
          completo: "11122233344",
          incompleto: "44455566677",
          novo: "39053344705",
          legado: "33344455566",
          corretor: BROKER.cpf,
          expirado: "11122233344",
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
        location.hash = "#/formulario-publico";
        return;
      }
    });
    paint();
    hashDemo(shell);
  }

  function formHtml() {
    return (
      '<div class="docs-screen docs-screen--public" data-id-root="formulario">' +
      '<div class="hf-pub hf-pub--form">' +
      '<img class="hf-pub__logo" src="assets/logos/h-color-light.svg" width="109" height="27" alt="hubfi">' +
      '<p class="hf-pub__kicker">Formulário da operação · Jardins Imóveis · OP-002941</p>' +
      '<h1 class="hf-pub__title">Complete os dados da operação</h1>' +
      '<p class="hf-pub__sub">O cliente desta operação já existe. Identidade só por documento — e-mail e telefone não localizam ficha.</p>' +
      '<div class="hf-pub__card" data-id-card></div>' +
      demos([
        ["com-doc", "Com documento"],
        ["sem-doc", "Sem documento"],
      ]) +
      "</div></div>"
    );
  }

  function bindFormulario(root) {
    var shell = root.querySelector('[data-id-root="formulario"]');
    if (!shell) return;
    var state = { demo: "com-doc", doc: "12345678900", email: "marcelo.oliveira@email.com", phone: "(11) 98888-0101" };
    var card = shell.querySelector("[data-id-card]");
    card.innerHTML =
      '<div data-form-panel></div>' +
      field({
        label: "CPF ou CNPJ",
        placeholder: "000.000.000-00",
        req: true,
        extra: ' data-form-doc inputmode="numeric"',
      }) +
      field({
        label: "E-mail",
        placeholder: "email@cliente.com",
        extra: " data-form-email",
      }) +
      field({
        label: "Telefone",
        placeholder: "(00) 00000-0000",
        extra: ' data-form-phone inputmode="numeric"',
      }) +
      field({
        label: "Renda mensal",
        placeholder: "R$ 0",
      }) +
      '<div class="hf-pub__acts">' +
      '<button class="hf-open__next" type="button" data-id-act="send">Enviar formulário</button></div>';
    var docInput = card.querySelector("[data-form-doc]");
    var emailInput = card.querySelector("[data-form-email]");
    var phoneInput = card.querySelector("[data-form-phone]");
    var panel = card.querySelector("[data-form-panel]");
    var send = card.querySelector('[data-id-act="send"]');

    function paint() {
      var d = digits(state.doc);
      var hasDoc = d.length === 11 || d.length === 14;
      var contactOnly = !hasDoc && (!!state.email || !!digits(state.phone));
      var matchByContact = null;
      if (!hasDoc) {
        Object.keys(COMPANY).forEach(function (key) {
          var c = COMPANY[key];
          if (!c || c.deleted) return;
          if (state.email && normEmail(c.email) === normEmail(state.email)) matchByContact = c;
          if (digits(state.phone) && digits(c.phone) === digits(state.phone)) matchByContact = c;
        });
      }
      if (contactOnly) {
        panel.innerHTML = matchCard(
          "error",
          "Sem documento, não há identidade",
          "Cadastro sem CPF ou CNPJ está depreciado. E-mail e telefone não localizam ficha, mesmo que já existam nesta empresa" +
            (matchByContact ? " — " + matchByContact.name + " não é encontrado por contato." : ".")
        );
      } else if (hasDoc) {
        var known = COMPANY[d];
        panel.innerHTML = matchCard(
          "success",
          "Documento recebido",
          known && !known.deleted
            ? "A ficha desta operação permanece a mesma. O formulário não cria outro cadastro nem busca por contato."
            : "Documento válido. Os demais campos são dados da operação, não chave de identidade."
        );
      } else {
        panel.innerHTML = "";
      }
      if (send) send.disabled = !hasDoc;
      if (docInput) docInput.value = d.length > 11 ? cnpjMask(d) : cpfMask(d);
      if (emailInput) emailInput.value = state.email;
      if (phoneInput) phoneInput.value = state.phone;
      shell.querySelectorAll("[data-id-demo]").forEach(function (btnEl) {
        btnEl.classList.toggle("is-on", btnEl.getAttribute("data-id-demo") === state.demo);
      });
    }

    if (docInput) {
      docInput.addEventListener("input", function () {
        state.doc = digits(docInput.value).slice(0, 14);
        paint();
      });
    }
    if (emailInput) {
      emailInput.addEventListener("input", function () {
        state.email = emailInput.value;
        paint();
      });
    }
    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        state.phone = phoneMask(phoneInput.value);
        paint();
      });
    }
    shell.addEventListener("click", function (event) {
      var demo = event.target.closest("[data-id-demo]");
      if (demo) {
        var which = demo.getAttribute("data-id-demo");
        state.demo = which;
        if (which === "com-doc") {
          state.doc = "12345678900";
          state.email = "marcelo.oliveira@email.com";
          state.phone = "(11) 98888-0101";
        } else {
          state.doc = "";
          state.email = "camila.ferreira@email.com";
          state.phone = "(11) 97777-4411";
        }
        paint();
        return;
      }
      var act = event.target.closest("[data-id-act]");
      if (!act || act.getAttribute("data-id-act") !== "send") return;
      if (digits(state.doc).length !== 11 && digits(state.doc).length !== 14) {
        showToast("Informe o documento para enviar.");
        return;
      }
      showToast("Formulário enviado. A ficha não foi alterada por e-mail ou telefone.");
    });
    paint();
    hashDemo(shell);
  }

  catalog.pages["cadastro-cliente"] = {
    title: "Cadastro de cliente",
    lead: "Criação explícita bloqueia documento já existente na empresa. A ficha é única: o usuário abre o cadastro existente.",
    leadHtml:
      '<ol class="docs-howto">' +
      "<li><em>1</em><div><strong>Documento primeiro</strong><span>CPF ou CNPJ decide se a ficha já existe nesta empresa</span></div></li>" +
      "<li><em>2</em><div><strong>Já na empresa</strong><span>Não duplicamos um cliente. Bloqueia a criação e abre o cadastro existente</span></div></li>" +
      "<li><em>3</em><div><strong>Documento livre</strong><span>Cadastra normalmente, inclusive se o mesmo CPF existir em outra empresa — sem citar isso</span></div></li>" +
      "<li><em>4</em><div><strong>Excluído</strong><span>Documento de cadastro excluído volta a ficar livre nesta empresa</span></div></li>" +
      "</ol>",
    node: "1-1870",
    figmaFile: "https://www.figma.com/design/C9RP2qnls5pDBjMSEdhT1n/Untitled?node-id=1-1870",
    wide: true,
    section: "Telas",
    scenarios: [
      { label: "Cliente novo", note: "Documento livre. Cadastra nesta empresa.", href: "#/cadastro-cliente?demo=novo" },
      { label: "Já na empresa", note: "Bloqueia ficha nova. Abre o cadastro existente.", href: "#/cadastro-cliente?demo=empresa" },
      { label: "Cliente excluído", note: "CPF volta a ficar livre nesta empresa.", href: "#/cadastro-cliente?demo=excluido" },
      { label: "Pessoa jurídica", note: "CNPJ no lugar do CPF. Mesma regra.", href: "#/cadastro-cliente?demo=pj" },
    ],
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
      "<li><em>5</em><div><strong>Colisão</strong><span>Trocar o documento para o CPF de outro cliente da empresa é bloqueado</span></div></li>" +
      "<li><em>6</em><div><strong>Excluir</strong><span>O documento fica livre para um novo cadastro na mesma empresa</span></div></li>" +
      "</ol>",
    node: "1-1871",
    figmaFile: "https://www.figma.com/design/C9RP2qnls5pDBjMSEdhT1n/Untitled?node-id=1-1871",
    wide: true,
    section: "Telas",
    scenarios: [
      { label: "Sem formalização", note: "Qualquer usuário corrige o CPF.", href: "#/edicao-cliente?demo=livre" },
      { label: "Com formalização · usuário", note: "CPF travado. Nome, e-mail e telefone livres. Verificação cai ao editar contato.", href: "#/edicao-cliente?demo=trava" },
      { label: "Com formalização · gestor", note: "Altera o CPF com justificativa. Fica na auditoria.", href: "#/edicao-cliente?demo=gestor" },
      { label: "Backoffice HubFi", note: "Acesso irrestrito, com rastro.", href: "#/edicao-cliente?demo=backoffice" },
      { label: "Colisão de documento", note: "CPF de outro cliente da empresa é bloqueado.", href: "#/edicao-cliente?demo=colisao" },
    ],
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
      "<li><em>5</em><div><strong>Token expirado</strong><span>Ficha completa pede o código de acesso de novo antes do formulário</span></div></li>" +
      "</ol>",
    wide: true,
    section: "Telas",
    later: true,
    scenarios: [
      { label: "Já cadastrado", note: "Aceite de link público fica para depois.", href: "#/link-publico?demo=completo" },
      { label: "Contato incompleto", href: "#/link-publico?demo=incompleto" },
      { label: "Cliente novo", href: "#/link-publico?demo=novo" },
      { label: "Ficha sem documento", href: "#/link-publico?demo=legado" },
      { label: "Dados do corretor", href: "#/link-publico?demo=corretor" },
      { label: "Token expirado", href: "#/link-publico?demo=expirado" },
    ],
    html: publicHtml,
  };

  catalog.pages["formulario-publico"] = {
    title: "Formulário público",
    lead: "O cliente da operação já existe. Sem CPF ou CNPJ a ficha é depreciada: e-mail e telefone não fazem match.",
    leadHtml:
      '<ol class="docs-howto">' +
      "<li><em>1</em><div><strong>Documento</strong><span>Única chave. O formulário não cria cadastro novo</span></div></li>" +
      "<li><em>2</em><div><strong>Sem documento</strong><span>Não localiza ficha por e-mail ou telefone, mesmo que o contato já exista na empresa</span></div></li>" +
      "</ol>",
    wide: true,
    section: "Telas",
    scenarios: [
      { label: "Com documento", note: "Única chave. Não cria outro cadastro.", href: "#/formulario-publico?demo=com-doc" },
      { label: "Sem documento", note: "E-mail e telefone não localizam ficha.", href: "#/formulario-publico?demo=sem-doc" },
    ],
    html: formHtml,
  };

  window.HF_IDENTITY = {
    bind: function (root) {
      bindCadastro(root);
      bindEdicao(root);
      bindPublico(root);
      bindFormulario(root);
    },
  };
})();
