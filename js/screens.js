(function () {
  var catalog = window.HF_CATALOG;
  if (!catalog) return;

  var ui = catalog.ui || {};
  var FIGMA_OP = "https://www.figma.com/design/LQfnfvRTFm2AZ9qwTWsQEk?node-id=8135-36006";
  var FIGMA_DASH =
    "https://www.figma.com/design/6GPvl7jqcGdcwaCCx9kyOI/Dashboard-de-opera%C3%A7%C3%B5es?node-id=2211-256";

  function ico(name, size) {
    return window.hfIcon ? window.hfIcon(name, size || 20) : "";
  }

  function ibox(name) {
    return '<span class="hf-ibox" aria-hidden="true">' + ico(name, 20) + "</span>";
  }

  function iconBtn(name, label) {
    return (
      '<button class="hf-btn hf-btn--sm hf-btn--ghost hf-btn--icon" type="button" aria-label="' +
      label +
      '">' +
      ico(name, 16) +
      "</button>"
    );
  }

  function kv(label, value, empty) {
    return (
      '<div class="hf-kv"><span class="hf-kv__label">' +
      label +
      '</span><span class="hf-kv__value' +
      (empty ? " hf-kv__value--empty" : "") +
      '">' +
      value +
      "</span></div>"
    );
  }

  function fileSlot(label, name) {
    var card =
      typeof ui.cardFile === "function"
        ? ui.cardFile("default", name || "extrato_jan.pdf")
        : "";
    card = card.replace(
      'class="hf-card-file',
      'class="hf-card-file" data-open-ocr role="button" tabindex="0"'
    );
    card = card.replace(
      "</div>",
      iconBtn("pencil", "Editar") + "</div>"
    );
    return (
      '<div class="hf-fileslot"><span class="hf-fileslot__label">' +
      label +
      "</span>" +
      card +
      "</div>"
    );
  }

  function flowStep(label, state) {
    return typeof ui.step === "function" ? ui.step(state, label) : "";
  }

  function opScreen() {
    var sidebar =
      typeof ui.appSidebar === "function" ? ui.appSidebar(null, "fit") : "";
    var badge =
      typeof ui.badge === "function"
        ? ui.badge
        : function (type, text) {
            return '<span class="hf-badge hf-badge--' + type + '">' + text + "</span>";
          };

    var crumb =
      '<nav class="hf-crumb">' +
      '<span class="hf-crumb__home">' +
      ico("panel-left", 20) +
      "</span>" +
      '<span class="hf-crumb__div"></span>' +
      "<span>Operações</span>" +
      '<span class="hf-crumb__chev">' +
      ico("chevron-right", 16) +
      "</span>" +
      "<span>Detalhes da operação</span></nav>";

    var header =
      '<header class="hf-opage__head">' +
      '<div class="hf-opage__id">OP-000000' +
      iconBtn("copy", "Copiar código") +
      "</div>" +
      '<div class="hf-opage__title-row">' +
      '<h1 class="hf-opage__title">Nome cliente</h1>' +
      '<i class="hf-header__rule" style="height:20px"></i>' +
      '<span class="hf-opage__person">Marcelo Oliveira</span>' +
      '<span class="hf-opage__spacer"></span>' +
      '<button class="hf-btn hf-btn--sm hf-btn--ghost" type="button">' +
      ico("clipboard-list", 16) +
      "Ver informações</button></div>" +
      '<div class="hf-header__chips">' +
      '<div class="hf-header__meta"><span class="hf-opage__chip-ico">' +
      ico("house", 15) +
      "</span><span>Financiamento Imobiliário - Aquisição</span></div>" +
      '<i class="hf-header__rule" style="height:20px"></i>' +
      '<div class="hf-header__meta"><span class="hf-opage__chip-ico hf-opage__chip-ico--money">' +
      ico("banknote", 15) +
      '</span><span class="is-value">R$ 490.000,00</span></div>' +
      '<i class="hf-header__rule" style="height:20px"></i>' +
      '<div class="hf-header__meta"><span class="hf-opage__chip-ico">' +
      ico("user", 15) +
      "</span><span>Victor Tavares</span>" +
      ico("message-circle-more", 20) +
      "</div>" +
      '<i class="hf-header__rule" style="height:20px"></i>' +
      '<div class="hf-header__meta"><img class="hf-opage__mark" src="assets/logos/h-color-light.svg" width="20" height="20" alt="">' +
      '<span class="is-value">Time Hubfi</span></div>' +
      "</div></header>";

    var flow =
      typeof ui.stepper === "function"
        ? ui.stepper(0, [
            "Coleta de dados",
            "Análise de Crédito",
            "Escolha da Instituição",
            "Documentação das Partes",
            "Avaliação do Imóvel",
            "Análise Jurídica",
            "Elaboração Contrato",
            "Assinatura Contrato",
            "Registro Cartório",
            "Liberação Recurso",
          ])
        : '<div class="hf-stepper">' +
          flowStep("Coleta de dados", "current") +
          flowStep("Análise de Crédito", "todo") +
          flowStep("Escolha da Instituição", "todo") +
          flowStep("Documentação das Partes", "todo") +
          flowStep("Avaliação do Imóvel", "todo") +
          flowStep("Análise Jurídica", "todo") +
          flowStep("Elaboração Contrato", "todo") +
          flowStep("Assinatura Contrato", "todo") +
          flowStep("Registro Cartório", "todo") +
          flowStep("Liberação Recurso", "todo") +
          "</div>";

    var summary =
      '<div class="hf-opage__summary">' +
      '<div class="hf-opage__note">' +
      '<span class="hf-opage__note-ico">' +
      ico("info", 20) +
      "</span><div><strong>Observações da operação</strong>" +
      "<p>Cliente solteiro, trabalha CLT há 3 anos como motorista na Disk Caçamba. Renda de R$ 5.880. Solicitou financiamento de moto (placa KRF-6A31), R$ 24k financiado.</p>" +
      "</div></div>" +
      '<div class="hf-opage__temp">' +
      '<div class="hf-opage__temp-meta">' +
      '<span class="hf-opage__temp-item">' +
      ico("clipboard-list", 16) +
      "Formulário preenchido</span>" +
      '<span class="hf-opage__temp-item hf-opage__temp-item--strong">' +
      ico("house", 16) +
      "Imóvel escolhido</span></div>" +
      '<div class="hf-gauge" aria-label="Temperatura média">' +
      '<img class="hf-gauge__track" src="assets/screen/gauge-track.svg" width="81" height="45" alt="">' +
      '<img class="hf-gauge__fill" src="assets/screen/gauge-fill.svg" width="57" height="45" alt="">' +
      '<img class="hf-gauge__knob" src="assets/screen/gauge-knob.svg" width="14" height="14" alt="">' +
      "<span>Média</span></div>" +
      '<button class="hf-btn-select" type="button" aria-label="Editar temperatura">' +
      ico("pencil", 16) +
      ico("chevron-down", 16) +
      "</button></div></div>";

    var formBody =
      '<div class="hf-tabs">' +
      '<button class="hf-tab is-active" type="button">Comprador(a)</button>' +
      '<button class="hf-tab" type="button">Financiamento</button></div>' +
      '<div class="hf-opage__block"><h3>Dados do(a) Comprador(a)</h3>' +
      '<p class="hf-opage__sub">Dados</p>' +
      '<div class="hf-kv-row">' +
      kv("Tipo de identificação", "CNH") +
      kv("Estado civil", "Casado(a)") +
      kv("Regime de casamento", "Comunhão parcial de bens") +
      "</div>" +
      '<p class="hf-opage__sub">Documentos</p>' +
      '<div class="hf-filegrid">' +
      fileSlot("CNH") +
      fileSlot("RG com CPF") +
      fileSlot("Comprovante de endereço") +
      "</div></div>" +
      '<hr class="hf-sep">' +
      '<div class="hf-opage__block"><h3>Dados de Renda do(a) Comprador(a)</h3>' +
      '<div class="hf-kv-row">' +
      kv("Tipo de renda", "CLT") +
      kv("Profissão / Cargo", "Analista de Sistemas") +
      kv("Declarou IRPF?", "Sim") +
      "</div>" +
      '<p class="hf-opage__sub">Documentos</p>' +
      '<div class="hf-filegrid">' +
      fileSlot("Declaração de IRPF") +
      fileSlot("Recibo de IRPF") +
      fileSlot("Contracheque (Últimos 3 meses)") +
      fileSlot("Extratos bancários (Últimos 3 meses)") +
      "</div></div>";

    var nested =
      '<article class="hf-formcard">' +
      '<div class="hf-formcard__head">' +
      ibox("clipboard-list") +
      '<div class="hf-formcard__copy"><strong>Formulário dados</strong>' +
      "<span>Concluído em 21/05/2026 | 11:40</span></div>" +
      badge("information", "Extraindo dados") +
      iconBtn("git-pull-request", "Sincronizar") +
      iconBtn("eye", "Visualizar") +
      iconBtn("chevron-up", "Recolher") +
      "</div>" +
      '<div class="hf-formcard__body">' +
      formBody +
      "</div></article>";

    var etapa =
      '<section class="hf-etapa is-open" data-accordion>' +
      '<div class="hf-etapa__bar">' +
      ibox("layers") +
      '<div class="hf-formcard__copy"><strong class="hf-etapa__title">Coleta de dados</strong>' +
      "<span>Etapa iniciada em 21/05/2026 | 11:30</span></div>" +
      badge("alert", "Pendente") +
      iconBtn("file-plus", "Adicionar") +
      iconBtn("chevron-up", "Recolher") +
      "</div>" +
      '<div class="hf-etapa__nest">' +
      '<p class="hf-etapa__log">' +
      ico("chevron-down", 20) +
      "<span>Operação criada no sistema</span>" +
      "<small>13/04/2026 14:20</small></p>" +
      nested +
      "</div></section>";

    var chat =
      '<div class="hf-card-comments-wrap">' +
      (ui.cardComments
        ? ui.cardComments({ variant: "populated" })
        : "") +
      "</div>";

    return (
      '<div class="docs-screen">' +
      sidebar +
      '<div class="docs-screen__main">' +
      '<div class="docs-screen__top">' +
      crumb +
      header +
      flow +
      "</div>" +
      '<div class="docs-screen__body">' +
      summary +
      etapa +
      "</div>" +
      chat +
      "</div>" +
      ocrOverlay() +
      "</div>"
    );
  }

  function statusDot(kind) {
    var map = {
      ok: { type: "success", icon: "check-check" },
      warn: { type: "alert", icon: "info" },
      error: { type: "warning", icon: "x" },
    };
    var s = map[kind];
    if (!s) return "";
    return (
      '<span class="hf-badge hf-badge--dot hf-badge--' +
      s.type +
      '" aria-hidden="true">' +
      ico(s.icon, 12) +
      "</span>"
    );
  }

  function ocrField(item) {
    var err = item.error
      ? '<p class="hf-field__error">' + item.error + "</p>"
      : "";
    var mod = item.status === "error" ? " hf-field--error" : "";
    var val = item.value ? ' value="' + item.value + '"' : "";
    var ph = item.placeholder ? ' placeholder="' + item.placeholder + '"' : "";
    return (
      '<div class="hf-field' +
      mod +
      '" data-ocr-item data-label="' +
      item.label +
      '" data-chip="' +
      (item.chip || item.label).toLowerCase() +
      '"><div class="hf-field__header"><div class="hf-field__labelrow"><span class="hf-field__label">' +
      item.label +
      "</span>" +
      statusDot(item.status) +
      '</div></div><div class="hf-field__control"><input class="hf-field__input" type="text"' +
      ph +
      val +
      "></div>" +
      err +
      "</div>"
    );
  }

  function ocrRow(items) {
    return '<div class="hf-ocr__row">' + items.map(ocrField).join("") + "</div>";
  }

  function ocrCard(title, body) {
    return (
      '<article class="hf-card" data-ocr-card><div class="hf-ocr__stitle"><i class="hf-ocr__accent" aria-hidden="true"></i><h3 class="hf-card__title">' +
      title +
      "</h3></div>" +
      body +
      "</article>"
    );
  }

  function ocrOverlay() {
    var search =
      '<label class="hf-search"><span class="hf-search__icon" aria-hidden="true">' +
      ico("search", 16) +
      '</span><input class="hf-search__field" type="search" placeholder="Buscar informação" data-ocr-search></label>';

    var chips =
      '<div class="hf-ocr__chips">' +
      '<div class="hf-ocr__stitle hf-ocr__stitle--error"><i class="hf-ocr__accent" aria-hidden="true"></i><span>Dados não identificados</span></div>' +
      '<button class="hf-badge hf-badge--warning" type="button" data-ocr-chip="nacionalidade">Nacionalidade</button>' +
      '<button class="hf-badge hf-badge--warning" type="button" data-ocr-chip="código irpf">Código IRPF</button>' +
      '<button class="hf-badge hf-badge--warning" type="button" data-ocr-chip="código irpf">Código IRPF</button>' +
      '<button class="hf-badge hf-badge--warning" type="button" data-ocr-chip="código irpf">Código IRPF</button>' +
      "</div>";

    var pessoais =
      ocrCard(
        "Dados Pessoais",
        ocrField({ label: "Nome completo", value: "ANA JULIA SILVA DE ALMEIDA" }) +
          ocrRow([
            { label: "CPF", value: "123.456.789-00", status: "ok" },
            { label: "Data de nascimento", value: "15/03/1995", status: "ok" },
          ]) +
          ocrRow([
            { label: "Estado civil", value: "Solteira", status: "warn" },
            { label: "Sexo", value: "Feminino", status: "ok" },
          ]) +
          ocrField({
            label: "Nacionalidade",
            status: "error",
            error: "Texto não extraído",
            chip: "nacionalidade",
          })
      );

    var identidade =
      ocrCard(
        "Documento de Identidade",
        ocrRow([
          { label: "RG", value: "55.123.456-X", status: "ok" },
          { label: "Órgão emissor", value: "SSP/SP", status: "ok" },
        ]) +
          ocrField({ label: "Data de emissão", value: "10/11/2018", status: "ok" }) +
          ocrField({
            label: "CNH",
            status: "warn",
            placeholder: "Ausente neste documento",
          })
      );

    var irpf =
      ocrCard(
        "Dados fiscais",
        ocrField({
          label: "Código IRPF",
          status: "error",
          error: "Texto não extraído",
          chip: "código irpf",
        }) +
          ocrField({
            label: "Código IRPF",
            status: "error",
            error: "Texto não extraído",
            chip: "código irpf",
          }) +
          ocrField({
            label: "Código IRPF",
            status: "error",
            error: "Texto não extraído",
            chip: "código irpf",
          })
      );

    var preview =
      '<section class="hf-ocr__preview hf-missing" data-missing="Viewer de documento — não existe no DS" title="Componente não existe no DS: preview/iframe de arquivo">' +
      '<div class="hf-ocr__file">' +
      ico("file-text", 20) +
      "<strong>irpf-2025.pdf</strong></div>" +
      '<div class="hf-ocr__iframe">IFRAME ARQUIVO</div>' +
      '<div class="hf-ocr__actions">' +
      '<button class="hf-btn hf-btn--sm hf-btn--ghost" type="button">' +
      ico("download", 16) +
      "Baixar</button></div></section>";

    var panel =
      '<aside class="hf-ocr__panel">' +
      '<header class="hf-ocr__head">' +
      "<div><strong>Dados do Documento</strong><p>Confirme os campos extraídos do documento</p></div>" +
      '<button class="hf-modal__close" type="button" data-modal-close aria-label="Fechar">' +
      ico("x", 24) +
      "</button></header>" +
      '<div class="hf-ocr__scroll">' +
      search +
      chips +
      '<div class="hf-ocr__fields">' +
      pessoais +
      identidade +
      irpf +
      "</div></div>" +
      '<footer class="hf-ocr__foot">' +
      '<button class="hf-btn hf-btn--sm hf-btn--ghost" type="button" data-modal-close>' +
      ico("x", 16) +
      "Fechar</button>" +
      '<button class="hf-btn hf-btn--sm hf-btn--primary" type="button" data-ocr-save>' +
      ico("save", 16) +
      "Salvar Dados</button></footer></aside>";

    return (
      '<div class="hf-ocr-overlay" data-ocr-overlay hidden>' +
      '<div class="hf-ocr hf-missing" data-missing="Drawer OCR (preview + dados) — não existe no DS" title="Componente não existe no DS: drawer OCR de duas colunas">' +
      preview +
      panel +
      "</div></div>"
    );
  }

  function showSuccessToast() {
    var host = document.querySelector("[data-toast-host]");
    if (!host) {
      host = document.createElement("div");
      host.className = "docs-toast-host";
      host.setAttribute("data-toast-host", "");
      document.body.appendChild(host);
    }
    host.innerHTML = ui.toast
      ? ui.toast("Dados salvos com sucesso.")
      : "";
    var toast = host.querySelector(".hf-toast");
    if (!toast) return;
    function hide() {
      if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
    }
    var closeBtn = toast.querySelector("[data-alert-close]");
    if (closeBtn) closeBtn.addEventListener("click", hide);
    window.setTimeout(hide, 4000);
  }

  function bindOcr(root) {
    var overlay = root.querySelector("[data-ocr-overlay]");
    if (!overlay) return;

    function open() {
      overlay.hidden = false;
      overlay.classList.add("is-open");
    }
    function close() {
      overlay.classList.remove("is-open");
      overlay.hidden = true;
    }

    root.querySelectorAll("[data-open-ocr]").forEach(function (card) {
      card.addEventListener("click", function (event) {
        if (event.target.closest(".hf-btn, .hf-card-file__act")) return;
        open();
      });
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      });
    });

    overlay.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", close);
    });
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) close();
    });

    var search = overlay.querySelector("[data-ocr-search]");
    var chips = overlay.querySelectorAll("[data-ocr-chip]");
    var items = overlay.querySelectorAll("[data-ocr-item]");
    var cards = overlay.querySelectorAll("[data-ocr-card]");
    var activeChip = "";

    function applyFilter() {
      var q = search && search.value ? search.value.toLowerCase().trim() : "";
      items.forEach(function (item) {
        var label = (item.getAttribute("data-label") || "").toLowerCase();
        var chip = (item.getAttribute("data-chip") || "").toLowerCase();
        var input = item.querySelector(".hf-field__input");
        var value = input ? String(input.value || "").toLowerCase() : "";
        var matchQ = !q || label.indexOf(q) !== -1 || value.indexOf(q) !== -1;
        var matchChip = !activeChip || chip === activeChip;
        item.classList.toggle("is-hidden", !(matchQ && matchChip));
      });
      cards.forEach(function (card) {
        var visible = card.querySelector("[data-ocr-item]:not(.is-hidden)");
        card.classList.toggle("is-hidden", !visible);
      });
    }

    if (search) search.addEventListener("input", applyFilter);

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var key = (chip.getAttribute("data-ocr-chip") || "").toLowerCase();
        activeChip = activeChip === key ? "" : key;
        chips.forEach(function (other) {
          var key = (other.getAttribute("data-ocr-chip") || "").toLowerCase();
          other.classList.toggle("is-on", !!activeChip && key === activeChip);
        });
        applyFilter();
      });
    });

    var save = overlay.querySelector("[data-ocr-save]");
    if (save) {
      save.addEventListener("click", function () {
        overlay.querySelectorAll(".hf-field--error").forEach(function (field) {
          var input = field.querySelector(".hf-field__input");
          if (!input || !String(input.value || "").trim()) return;
          field.classList.remove("hf-field--error");
          var err = field.querySelector(".hf-field__error");
          if (err) err.remove();
        });
        close();
        showSuccessToast();
      });
    }
  }

  function dashSelect(label, value, options) {
    var items = (options || [value])
      .map(function (opt) {
        var on = opt === value;
        return (
          '<div class="hf-select-menu__item' +
          (on ? " is-active" : "") +
          '" role="option" tabindex="-1" data-label="' +
          opt +
          '" aria-selected="' +
          (on ? "true" : "false") +
          '">' +
          opt +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="hf-field hf-field--select" data-select data-select-type="default">' +
      '<div class="hf-field__header"><span class="hf-field__label">' +
      label +
      "</span></div>" +
      '<button class="hf-field__control" type="button" role="combobox" aria-haspopup="listbox" aria-expanded="false">' +
      '<span class="hf-field__value">' +
      value +
      '</span><span class="hf-field__chevron"><img src="assets/icons/select-chevron.svg" alt=""></span></button>' +
      '<div class="hf-select-menu" role="listbox">' +
      items +
      "</div></div>"
    );
  }

  function dashScreen() {
    var sidebar =
      typeof ui.appSidebar === "function" ? ui.appSidebar("operacoes", "fit") : "";
    var badge =
      typeof ui.badge === "function"
        ? ui.badge
        : function (type, text) {
            return '<span class="hf-badge hf-badge--' + type + '">' + text + "</span>";
          };

    var crumb =
      '<nav class="hf-crumb">' +
      '<span class="hf-crumb__home">' +
      ico("panel-left", 20) +
      "</span>" +
      '<span class="hf-crumb__div"></span>' +
      "<span>Visão estratégica</span></nav>";

    var header =
      "<header>" +
      '<h1 class="docs-dash-title">Dashboard</h1>' +
      '<p class="docs-dash-sub">Visão estratégica da plataforma Hubfi</p></header>';

    var filters =
      '<div class="docs-dash-filters">' +
      dashSelect("Mesa", "Todas", ["Todas", "Mesa 1", "Mesa 2"]) +
      dashSelect("Produto", "Todos", ["Todos", "Financiamento", "Consórcio"]) +
      dashSelect("Empresa", "Todas", ["Todas", "Hubfi"]) +
      dashSelect("Período", "Este mês", ["Este mês", "Este trimestre", "Este ano"]) +
      dashSelect("Operador", "Todos", ["Todos", "Victor Tavares"]) +
      dashSelect("Usuário", "Todos", ["Todos", "Lucas Augusto"]) +
      "</div>";

    var tabs =
      '<div class="hf-tabs" data-tabs>' +
      '<button class="hf-tab is-active" type="button">Operações</button>' +
      '<button class="hf-tab" type="button">Empresas</button>' +
      '<button class="hf-tab" type="button">Análise</button>' +
      '<button class="hf-tab" type="button">Produtos</button></div>';

    function kpi(icon, chipMod, label) {
      return (
        '<article class="docs-dash-kpi">' +
        '<div class="docs-dash-kpi__head">' +
        '<span class="docs-dash-kpi__chip' +
        (chipMod ? " docs-dash-kpi__chip--" + chipMod : "") +
        '">' +
        ico(icon, 20) +
        "</span>" +
        '<span class="docs-dash-kpi__label">' +
        label +
        "</span>" +
        '<span class="docs-dash-kpi__info">' +
        ico("info", 20) +
        "</span></div>" +
        '<p class="docs-dash-kpi__value">R$ 1.000,00</p>' +
        '<p class="docs-dash-kpi__meta">10 Operações</p></article>'
      );
    }

    var kpis =
      '<div class="docs-dash-kpis">' +
      kpi("file-spreadsheet", "", "Pipeline originado") +
      kpi("refresh-ccw", "info", "Pipeline ativo") +
      kpi("circle-check", "ok", "Operações ganhas") +
      kpi("circle-x", "err", "Operações perdidas") +
      "</div>";

    function bar(count, height, kind) {
      var alert = kind === "warn" || kind === "crit";
      return (
        '<div class="docs-dash-bar' +
        (kind ? " docs-dash-bar--" + kind : "") +
        '">' +
        '<span class="docs-dash-bar__n">' +
        (alert ? ico("triangle-alert", 16) : "") +
        count +
        "</span>" +
        '<span class="docs-dash-bar__fill" style="height:' +
        height +
        'px"></span></div>'
      );
    }

    var funnel =
      '<section class="docs-dash-card">' +
      '<div class="docs-dash-funnel__head">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">Funil de etapas</h2>' +
      '<p class="docs-dash-card__hint">Confira quantas operações estão por etapa.</p></div>' +
      '<div class="docs-dash-funnel__focus">Documentação das Partes' +
      badge("warning", "Gargalo") +
      "</div>" +
      '<div class="docs-dash-legend">' +
      '<span class="docs-dash-legend__item"><span class="docs-dash-legend__ico docs-dash-legend__ico--crit">' +
      ico("triangle-alert", 16) +
      "</span>Crítica</span>" +
      '<span class="docs-dash-legend__item"><span class="docs-dash-legend__ico docs-dash-legend__ico--warn">' +
      ico("triangle-alert", 16) +
      "</span>Atenção</span>" +
      '<span class="docs-dash-legend__item"><span class="docs-dash-legend__ico docs-dash-legend__ico--ok"></span>Dentro do prazo</span>' +
      "</div></div>" +
      '<div class="docs-dash-bars">' +
      bar("19", 59, "") +
      bar("32", 118, "warn") +
      bar("32", 209, "crit") +
      bar("32", 118, "warn") +
      bar("15", 52, "") +
      "</div>" +
      '<div class="docs-dash-axis"><span>Coleta de Dados</span><span>Análise de Crédito</span><span>Doc. das Partes</span><span>Análise Jurídica</span><span>Coleta de Dados</span></div>' +
      "</section>";

    function convRow(stage, fill, ops, conv, convType, rel, vol, time, timeMod) {
      return (
        "<tr><td><div class=\"docs-dash-stage\"><span>" +
        stage +
        '</span><span class="docs-dash-track"><span style="width:' +
        fill +
        'px"></span></span></div></td>' +
        '<td class="is-num">' +
        ops +
        '</td><td class="is-center">' +
        badge(convType, conv) +
        '</td><td class="is-center">' +
        rel +
        "</td><td>" +
        vol +
        '</td><td><span class="docs-dash-time docs-dash-time--' +
        timeMod +
        '">' +
        ico("clock", 14) +
        time +
        "</span></td></tr>"
      );
    }

    var conversion =
      '<section class="docs-dash-card docs-dash-card--table">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">Conversão entre etapas</h2>' +
      '<p class="docs-dash-card__hint">Contagem, conversão e volume por etapa</p></div>' +
      '<table class="docs-dash-table"><thead><tr>' +
      "<th>Etapa</th><th>Operações</th><th class=\"is-center\">Conversão</th><th class=\"is-center\">% Relativa</th><th>Volume</th><th>Tempo médio</th>" +
      "</tr></thead><tbody>" +
      convRow("Coleta de dados", 120, "1.240", "100%", "success", "—", "R$ 18,4M", "13 dias", "err") +
      convRow("Análise de crédito", 93, "968", "78%", "success", "22%", "R$ 14,1M", "4 dias", "warn") +
      convRow("Documentação das partes", 62, "645", "52%", "secondary", "24%", "R$ 9,3M", "4 dias", "warn") +
      convRow("Proposta enviada", 37, "384", "31%", "secondary", "21%", "R$ 5,4M", "3 dias", "warn") +
      convRow("Fechamento", 15, "149", "12%", "secondary", "19%", "R$ 2,1M", "2 dias", "info") +
      "</tbody></table></section>";

    function pctCell(label, value) {
      return (
        '<div class="docs-dash-pct"><small>' +
        label +
        "</small><b>" +
        value +
        "</b></div>"
      );
    }

    function avgTime(days) {
      return (
        '<div class="docs-dash-avg">' +
        ico("clock", 14) +
        " Tempo médio aberto<b>" +
        days +
        "</b></div>"
      );
    }

    var taxa =
      '<section class="docs-dash-card docs-dash-conv">' +
      '<div class="docs-dash-card__head">' +
      '<h2 class="docs-dash-card__title">Taxa de conversão</h2>' +
      '<button class="docs-dash-conv__btn" type="button">' +
      ico("circle-question-mark", 14) +
      "Como funciona</button></div>" +
      '<div class="docs-dash-safra">' +
      '<div class="docs-dash-safra__label">' +
      ico("calendar-clock", 16) +
      "Safra selecionada" +
      '<span class="docs-dash-chip">10/05/2026 - 10/06/2026</span></div>' +
      '<div class="docs-dash-safra__row">' +
      '<div class="docs-dash-rate">' +
      '<span class="docs-dash-donut docs-dash-donut--ring" style="--p:0"></span>' +
      "<strong>0%</strong>" +
      "<p>Originadas e fechadas no período selecionado</p></div>" +
      avgTime("77 dias") +
      "</div>" +
      '<div class="docs-dash-pcts">' +
      pctCell("P50", "72 dias") +
      pctCell("P75", "104 dias") +
      pctCell("P90", "154 dias") +
      pctCell("Máximo", "438 dias") +
      "</div></div>" +
      '<div class="docs-dash-closed">' +
      '<div class="docs-dash-safra__label">' +
      ico("calendar-check-2", 16) +
      "Última safra fechada" +
      '<span class="docs-dash-chip">Maio/2026</span></div>' +
      '<div class="docs-dash-safra__row">' +
      '<div class="docs-dash-rate">' +
      '<span class="docs-dash-donut docs-dash-donut--ring" style="--p:7.8"></span>' +
      '<strong class="is-ok">7,8%</strong></div>' +
      avgTime("77 dias") +
      "</div>" +
      '<div class="docs-dash-counts">' +
      "<span><b>20</b> Total</span>" +
      '<span><b class="is-ok">18</b> Ganhas</span>' +
      '<span><b class="is-err">2</b> Perdidas</span></div>' +
      '<div class="docs-dash-pcts">' +
      pctCell("P50", "50 dias") +
      pctCell("P75", "100 dias") +
      pctCell("P90", "120 dias") +
      pctCell("Máximo", "200 dias") +
      "</div></div></section>";

    function pieSeg(file, top, left, width, height) {
      return (
        '<img class="docs-dash-pie__seg" src="assets/screen/dash/' +
        file +
        '" alt="" width="' +
        width +
        '" height="' +
        height +
        '" style="top:' +
        top +
        "px;left:" +
        left +
        "px;width:" +
        width +
        "px;height:" +
        height +
        'px">'
      );
    }

    function pieChart(mod, segs, inner) {
      return (
        '<div class="docs-dash-pie' +
        (mod ? " " + mod : "") +
        '">' +
        segs +
        '<div class="docs-dash-pie__label">' +
        inner +
        "</div></div>"
      );
    }

    function legendRow(color, label, pct) {
      return (
        '<div class="docs-dash-legend-list__row">' +
        '<span class="docs-dash-dot" style="background:' +
        color +
        '"></span>' +
        "<span>" +
        label +
        "</span><b>" +
        pct +
        "</b></div>"
      );
    }

    var perda =
      '<section class="docs-dash-card docs-dash-card--chart">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">Motivos de perda</h2>' +
      '<p class="docs-dash-card__hint">Top 5 · % sobre o total de operações perdidas no período</p></div>' +
      '<div class="docs-dash-chart">' +
      pieChart(
        "",
        pieSeg("perda-1.svg", 0.28, 84.2, 79.8, 121.75) +
          pieSeg("perda-2.svg", 116.92, 33.59, 114.5, 47.09) +
          pieSeg("perda-3.svg", 65.16, 0, 41.16, 76.51) +
          pieSeg("perda-4.svg", 13.07, 4.35, 45.94, 51.3) +
          pieSeg("perda-5.svg", 0.28, 46.4, 33.4, 27.69),
        "<strong>848</strong><span>perdidas</span>"
      ) +
      '<div class="docs-dash-legend-list">' +
      legendRow("#de3535", "Renda insuficiente", "34%") +
      legendRow("#f5c026", "Desistência do cliente", "27%") +
      legendRow("#00a395", "Documentação incompleta", "18%") +
      legendRow("#787d7d", "Taxa não competitiva", "13%") +
      legendRow("#e3e3e3", "Outros", "8%") +
      "</div></div></section>";

    function probItem(count, badgeType, badgeText, revenue) {
      return (
        '<div class="docs-dash-prob__item">' +
        '<div class="docs-dash-prob__top"><span>' +
        count +
        " Operações</span>" +
        badge(badgeType, badgeText) +
        "</div>" +
        '<div class="docs-dash-prob__rev">' +
        ico("banknote-arrow-up", 20) +
        revenue +
        "</div></div>"
      );
    }

    var probabilidade =
      '<section class="docs-dash-card docs-dash-card--chart">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">Probabilidade de fechamento</h2>' +
      '<p class="docs-dash-card__hint">Distribuição por faixa · sem ponderação</p></div>' +
      '<div class="docs-dash-chart">' +
      pieChart(
        "",
        pieSeg("prob-1.svg", 0.28, 84.2, 66.56, 49.8) +
          pieSeg("prob-2.svg", 46.12, 81.56, 82.44, 117.82) +
          pieSeg("prob-3.svg", 0.28, 0, 79.8, 163.12),
        "<strong>1.240</strong><span>operações</span>"
      ) +
      '<div class="docs-dash-prob">' +
      probItem("321", "success", "Alta", "R$ 2.000.000,00") +
      probItem("221", "alert", "Média", "R$ 1.000.000,00") +
      probItem("121", "warning", "Baixa", "R$ 500.000,00") +
      "</div></div></section>";

    function rateCard(title, hint, pct, aFile, bFile, a, b) {
      return (
        '<section class="docs-dash-card docs-dash-card--chart">' +
        '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">' +
        title +
        "</h2>" +
        '<p class="docs-dash-card__hint">' +
        hint +
        "</p></div>" +
        '<div class="docs-dash-chart docs-dash-chart--pair">' +
        pieChart(
          "docs-dash-pie--sm",
          pieSeg(aFile, 0.27, 24.14, 125.86, 149.72) +
            pieSeg(bFile, 0.68, 0, 70.11, 122.42),
          '<strong class="is-info">' + pct + "%</strong>"
        ) +
        '<div class="docs-dash-legend-list docs-dash-legend-list--short">' +
        legendRow("#00a395", a, "") +
        legendRow("#5e8fe8", b, "") +
        "</div></div></section>"
      );
    }

    return (
      '<div class="docs-screen docs-screen--dash">' +
      sidebar +
      '<div class="docs-screen__main">' +
      '<div class="docs-screen__top">' +
      crumb +
      header +
      "</div>" +
      '<div class="docs-screen__body">' +
      filters +
      tabs +
      kpis +
      funnel +
      '<div class="docs-dash-split">' +
      conversion +
      taxa +
      "</div>" +
      '<div class="docs-dash-split docs-dash-split--eq">' +
      perda +
      probabilidade +
      "</div>" +
      '<div class="docs-dash-split docs-dash-split--eq">' +
      rateCard(
        "Conversão simulação para operação",
        "Operações abertas a partir de simulação",
        "42",
        "sim-a.svg",
        "sim-b.svg",
        "1000 simulações",
        "840 operações"
      ) +
      rateCard(
        "Clientes recorrentes",
        "Texto de apoio",
        "12",
        "rec-a.svg",
        "rec-b.svg",
        "1000 clientes",
        "31 recorrências"
      ) +
      "</div></div></div></div>"
    );
  }

  catalog.groups.push({
    id: "screens",
    label: "Telas",
    icon: "app-window",
    blurb: "Páginas compostas com os componentes do DS — como o produto usa de verdade.",
    items: [
      ["detalhes-operacao", "Detalhes da operação"],
      ["dashboard-operacoes", "Dashboard de operações"],
    ],
  });

  catalog.pages["detalhes-operacao"] = {
    title: "Detalhes da operação",
    lead: "Tela composta da Nova operação.",
    leadHtml:
      '<ol class="docs-howto">' +
      "<li><em>1</em><div><strong>Abrir o OCR</strong><span>Clique em um Card File do formulário</span></div></li>" +
      "<li><em>2</em><div><strong>Conferir os dados</strong><span>Documento à esquerda, extração à direita</span></div></li>" +
      "<li><em>3</em><div><strong>Filtrar pendências</strong><span>Use a busca ou as badges em vermelho</span></div></li>" +
      "<li><em>4</em><div><strong>Completar e salvar</strong><span>Preencha o que faltar e confirme</span></div></li>" +
      "</ol>",
    node: "8135-36006",
    figmaFile: FIGMA_OP,
    wide: true,
    section: "Telas",
    html: function () {
      return opScreen();
    },
  };

  catalog.pages["dashboard-operacoes"] = {
    title: "Dashboard de operações",
    lead: "Visão estratégica da plataforma — funil, conversão e indicadores.",
    node: "2211-256",
    figmaFile: FIGMA_DASH,
    wide: true,
    section: "Telas",
    html: function () {
      return dashScreen();
    },
  };

  window.HF_SCREENS = {
    bind: function (root) {
      bindOcr(root);
    },
  };
})();
