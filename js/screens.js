(function () {
  var catalog = window.HF_CATALOG;
  if (!catalog) return;

  var ui = catalog.ui || {};
  var FIGMA_OP = "https://www.figma.com/design/LQfnfvRTFm2AZ9qwTWsQEk?node-id=8135-36006";
  var FIGMA_OPEN =
    "https://www.figma.com/design/LQfnfvRTFm2AZ9qwTWsQEk?node-id=7636-24781";
  var FIGMA_OPEN_INFO =
    "https://www.figma.com/design/LQfnfvRTFm2AZ9qwTWsQEk?node-id=7869-25743";
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

  function opScreen(opts) {
    opts = opts || {};
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
      (opts.lostChannel
        ? '<div class="hf-lost" role="status"><div class="hf-lost__head">' +
          badge("outline", "Encerrada") +
          "<strong>Esta operação foi encerrada</strong></div>" +
          "<p>Não é possível seguir com esta operação. Se precisar de mais informações, fale com o time HubFi.</p>" +
          "<small>Registrado em 25/08/2026 · Time HubFi</small></div>"
        : "") +
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

  function showSuccessToast(msg) {
    var host = document.querySelector("[data-toast-host]");
    if (!host) {
      host = document.createElement("div");
      host.className = "docs-toast-host";
      host.setAttribute("data-toast-host", "");
      document.body.appendChild(host);
    }
    host.innerHTML = ui.toast
      ? ui.toast(msg || "Dados salvos com sucesso.")
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

  function chipIco() {
    return (
      '<span class="hf-chipcard__ico" aria-hidden="true"><img src="assets/screen/open/chip-ico.svg" width="16" height="16" alt=""></span>'
    );
  }

  function chipCard(label, selected, mod) {
    return (
      '<button class="hf-chipcard' +
      (selected ? " is-selected" : "") +
      (mod ? " " + mod : "") +
      '" type="button" data-chipcard="' +
      label +
      '">' +
      chipIco() +
      "<span>" +
      label +
      "</span></button>"
    );
  }

  function fmtCard(title, desc, selected) {
    return (
      '<button class="hf-fmt' +
      (selected ? " is-selected" : "") +
      '" type="button" data-fmt="' +
      title +
      '"><span class="hf-radio" aria-hidden="true"><span class="hf-radio-box"><img class="hf-radio-box__off" src="assets/icons/select-radio.svg" width="18" height="18" alt=""><img class="hf-radio-box__on" src="assets/icons/select-radio-on.svg" width="18" height="18" alt=""></span><span>Opção</span></span>' +
      '<span class="hf-fmt__body"><strong>' +
      title +
      "</strong><p>" +
      desc +
      '</p><span class="hf-fmt__more">Entenda mais<img src="assets/screen/open/icon-right.svg" width="16" height="16" alt=""></span></span></button>'
    );
  }

  function openField(label, placeholder, extra) {
    extra = extra || "";
    return (
      '<div class="hf-field"><div class="hf-field__header"><span class="hf-field__label">' +
      label +
      '</span></div><div class="hf-field__control"><input class="hf-field__input" type="text" placeholder="' +
      placeholder +
      '"' +
      extra +
      "></div></div>"
    );
  }

  function openSelect(label, options) {
    var items = (options || [])
      .map(function (opt) {
        return (
          '<div class="hf-select-menu__item" role="option" tabindex="-1" data-label="' +
          opt +
          '" aria-selected="false">' +
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
      '<span class="hf-field__value">Selecionar</span>' +
      '<span class="hf-field__chevron"><img src="assets/icons/select-chevron.svg" alt=""></span></button>' +
      '<div class="hf-select-menu" role="listbox">' +
      items +
      "</div></div>"
    );
  }

  var OPEN_STEP_HTML = {
    "Perfil do cliente": "Perfil<br>do cliente",
    "Seleção de Produto": "Seleção<br>de Produto",
    "Informações do cliente": "Informações<br>do cliente",
    "Dados do formulário": "Dados<br>do formulário",
    Comunicação: "Comunicação",
    Resumo: "Resumo",
  };

  function openStepper(active, labels) {
    return (
      '<div class="hf-stepper-s" data-open-stepper>' +
      labels
        .map(function (label, i) {
          var status = i === active ? "current" : i < active ? "done" : "todo";
          return (
            '<div class="hf-step-s is-' +
            status +
            '" data-step="' +
            i +
            '"><span class="hf-step-s__track"><i class="hf-step-s__line hf-step-s__line--before"></i>' +
            '<span class="hf-step-s__dot"></span>' +
            '<i class="hf-step-s__line hf-step-s__line--after"></i></span>' +
            '<span class="hf-step-s__label">' +
            (OPEN_STEP_HTML[label] || label) +
            "</span></div>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  var OPEN_MESAS = [
    ["Câmbio", ""],
    ["Imobiliário", ""],
    ["Crédito", ""],
    ["Operações Estruturadas", "hf-chipcard--wide"],
    ["Seguros", ""],
    ["Energia", ""],
    ["Comércio", ""],
    ["Investimentos", "hf-chipcard--invest"],
  ];

  var OPEN_PRODUCTS = {
    Câmbio: ["Spot", "Turismo", "Importação", "Exportação", "Remessa"],
    Imobiliário: ["Aquisição", "Construção", "Home Equity", "Portabilidade", "FGTS"],
    Crédito: ["Capital de Giro", "Antecipação", "Consórcio", "CDC", "Empréstimo"],
    "Operações Estruturadas": ["FIDC", "CRI", "CRA", "Debênture", "Securitização"],
    Seguros: ["Vida", "Residencial", "Automóvel", "Empresarial", "Prestamista"],
    Energia: ["Geração", "Distribuição", "Autoprodução", "Mercado Livre", "GD"],
    Comércio: ["Antecipação", "Cobrança", "Fornecedor", "Varejo", "Atacado"],
    Investimentos: ["Renda Fixa", "Fundos", "Previdência", "COE", "Ações"],
  };

  function productsFor(mesa) {
    return OPEN_PRODUCTS[mesa] || [mesa, mesa, mesa, mesa, mesa];
  }

  var OPEN_CLIENTS = {
    "12345678900": {
      name: "Marcelo Oliveira",
      phone: "(11) 98888-0101",
      email: "marcelo.oliveira@email.com",
      birth: "12/03/1988",
      kind: "same",
      op: {
        id: "OP-002941",
        product: "Aquisição",
        owner: "Ana Costa",
        stage: "Análise de crédito",
        opened: "12/08/2026",
      },
    },
    "98765432100": {
      name: "Ana Julia Silva",
      phone: "(21) 97777-2020",
      email: "ana.julia@email.com",
      birth: "04/11/1992",
      kind: "other",
    },
    "11122233344": {
      name: "Ricardo Mendes",
      phone: "(81) 99115-6938",
      email: "ricardo.mendes@email.com",
      birth: "22/07/1985",
      kind: "closed",
      last: {
        id: "OP-001102",
        product: "Portabilidade",
        status: "Ganha",
        date: "03/2026",
      },
    },
  };

  function cpfDigits(value) {
    return String(value || "")
      .replace(/\D/g, "")
      .slice(0, 11);
  }

  function cpfMask(digits) {
    var d = cpfDigits(digits);
    if (d.length <= 3) return d;
    if (d.length <= 6) return d.slice(0, 3) + "." + d.slice(3);
    if (d.length <= 9) return d.slice(0, 3) + "." + d.slice(3, 6) + "." + d.slice(6);
    return d.slice(0, 3) + "." + d.slice(3, 6) + "." + d.slice(6, 9) + "-" + d.slice(9);
  }

  function matchKind(client, produto) {
    if (!client) return "new";
    if (client.kind === "same" && client.op && client.op.product === produto) return "same";
    if (client.kind === "same") return "other-product";
    return client.kind;
  }

  function openBtn(style, label, act) {
    return (
      '<button class="hf-btn hf-btn--sm hf-btn--' +
      style +
      '" type="button" data-match-act="' +
      act +
      '">' +
      label +
      "</button>"
    );
  }

  function renderMatch(kind, client, produto, request) {
    request = request || "";
    if (kind === "same") {
      var op = client.op;
      if (request === "form") {
        return (
          '<div class="hf-match hf-match--same">' +
          "<strong class=\"hf-match__h\">Solicitar troca de responsável</strong>" +
          '<p class="hf-match__p">A operação ' +
          op.id +
          " continua com " +
          op.owner +
          ". A troca só acontece se ela ou um gestor aceitar. Isso não é imediato.</p>" +
          '<div class="hf-match__op">' +
          kv("Responsável atual", op.owner) +
          kv("Solicitante", "Lucas Augusto") +
          kv("Operação", op.id) +
          kv("Produto", "Imobiliário · " + op.product) +
          "</div>" +
          '<div class="hf-field hf-field--area hf-match__reason"><div class="hf-field__header"><span class="hf-field__label">Por que você precisa assumir?</span><span class="hf-field__req">*</span></div>' +
          '<div class="hf-field__control hf-field__control--area"><textarea class="hf-field__area" data-assume-reason placeholder="Explique o motivo. O responsável atual e um gestor vão ver este pedido."></textarea></div>' +
          '<p class="hf-field__error" data-assume-error hidden>Informe o motivo para enviar o pedido.</p></div>' +
          '<div class="hf-match__acts">' +
          openBtn("ghost", "Voltar", "assume-back") +
          openBtn("primary", "Enviar pedido", "assume-send") +
          "</div></div>"
        );
      }
      if (request === "pending") {
        return (
          '<div class="hf-match hf-match--same">' +
          '<div class="hf-alert hf-alert--info" role="status"><img class="hf-alert__icon" src="assets/icons/alert-info.svg" width="20" height="20" alt=""><div class="hf-alert__body"><p class="hf-alert__title">Pedido enviado. A operação não mudou de responsável</p><p class="hf-alert__desc">Aguardando ' +
          op.owner +
          " ou um gestor aceitar. Enquanto isso, você só pode abrir a operação para acompanhar.</p></div></div>" +
          '<div class="hf-match__op">' +
          kv("Operação", op.id) +
          kv("Responsável", op.owner) +
          kv("Seu pedido", "Troca de responsável") +
          kv("Status", "Pendente") +
          "</div>" +
          '<div class="hf-match__acts">' +
          openBtn("primary", "Abrir operação", "open") +
          "</div></div>"
        );
      }
      if (request === "join-pending") {
        return (
          '<div class="hf-match hf-match--same">' +
          '<div class="hf-alert hf-alert--info" role="status"><img class="hf-alert__icon" src="assets/icons/alert-info.svg" width="20" height="20" alt=""><div class="hf-alert__body"><p class="hf-alert__title">Pedido para participar enviado</p><p class="hf-alert__desc">' +
          op.owner +
          " continua responsável. Você entra como apoio só depois que ela aceitar.</p></div></div>" +
          '<div class="hf-match__acts">' +
          openBtn("primary", "Abrir operação", "open") +
          "</div></div>"
        );
      }
      return (
        '<div class="hf-match hf-match--same">' +
        '<div class="hf-alert hf-alert--warning" role="alert"><img class="hf-alert__icon" src="assets/icons/alert-warning.svg" width="20" height="20" alt=""><div class="hf-alert__body"><p class="hf-alert__title">Este cliente já possui uma operação em andamento</p><p class="hf-alert__desc">Mesmo produto na sua imobiliária. Não crie outra. Abra a existente ou solicite a troca de responsável.</p></div></div>' +
        '<div class="hf-match__op">' +
        kv("Operação", op.id) +
        kv("Produto", "Imobiliário · " + op.product) +
        kv("Responsável", op.owner) +
        kv("Etapa", op.stage + " · " + op.opened) +
        "</div>" +
        '<div class="hf-match__acts">' +
        openBtn("primary", "Abrir operação", "open") +
        openBtn("ghost", "Solicitar troca de responsável", "assume") +
        openBtn("outline", "Pedir para participar", "join") +
        "</div></div>"
      );
    }
    if (kind === "other") {
      return (
        '<div class="hf-match hf-match--other">' +
        '<div class="hf-alert hf-alert--info" role="alert"><img class="hf-alert__icon" src="assets/icons/alert-info.svg" width="20" height="20" alt=""><div class="hf-alert__body"><p class="hf-alert__title">Não é possível abrir esta operação</p><p class="hf-alert__desc">Este CPF não está disponível para uma operação completa deste produto no momento. Você pode simular ou pedir uma revisão ao time HubFi.</p></div></div>' +
        '<div class="hf-match__acts">' +
        openBtn("primary", "Fazer simulação", "simulate") +
        openBtn("ghost", "Solicitar revisão à HubFi", "review") +
        "</div></div>"
      );
    }
    if (kind === "other-product") {
      return (
        '<div class="hf-match hf-match--ok">' +
        '<div class="hf-alert hf-alert--info" role="alert"><img class="hf-alert__icon" src="assets/icons/alert-info.svg" width="20" height="20" alt=""><div class="hf-alert__body"><p class="hf-alert__title">Cliente já cadastrado na sua imobiliária</p><p class="hf-alert__desc">' +
        client.name +
        " tem " +
        client.op.product +
        " em andamento com " +
        client.op.owner +
        ". Você está abrindo " +
        produto +
        ". Pode seguir.</p></div></div></div>"
      );
    }
    if (kind === "closed") {
      return (
        '<div class="hf-match hf-match--ok">' +
        '<div class="hf-alert hf-alert--success" role="alert"><img class="hf-alert__icon" src="assets/icons/alert-success.svg" width="20" height="20" alt=""><div class="hf-alert__body"><p class="hf-alert__title">Cliente já cadastrado</p><p class="hf-alert__desc">Última operação: ' +
        client.last.product +
        " · " +
        client.last.status +
        " em " +
        client.last.date +
        " (" +
        client.last.id +
        "). Pode abrir uma nova.</p></div></div></div>"
      );
    }
    return (
      '<div class="hf-match hf-match--ok">' +
      '<div class="hf-alert hf-alert--success" role="alert"><img class="hf-alert__icon" src="assets/icons/alert-success.svg" width="20" height="20" alt=""><div class="hf-alert__body"><p class="hf-alert__title">Novo cliente</p><p class="hf-alert__desc">Nenhuma operação deste CPF na sua imobiliária. Siga para o formato da operação.</p></div></div></div>'
    );
  }

  function openScreen() {
    var sidebar =
      typeof ui.appSidebar === "function" ? ui.appSidebar("nova", "fit") : "";
    var stepsA = [
      "Perfil do cliente",
      "Seleção de Produto",
      "Informações do cliente",
      "Comunicação",
      "Resumo",
    ];

    var mesas =
      '<div class="hf-chiprow" data-chip-group="mesa">' +
      OPEN_MESAS.map(function (row) {
        return chipCard(row[0], row[0] === "Imobiliário", row[1]);
      }).join("") +
      "</div>";

    var produtos = productsFor("Imobiliário")
      .map(function (name, i) {
        return chipCard(name, i === 0, "hf-chipcard--fill");
      })
      .join("");

    var formats =
      fmtCard(
        "Operação simplificada",
        "Você informa mesa, produto e cliente. O cliente preenche o resto.",
        true
      ) +
      fmtCard(
        "Operação completa",
        "Você preenche todos os dados agora, sem depender do cliente.",
        false
      ) +
      fmtCard(
        "Operação por link",
        "Envie um link e o cliente escolhe o produto e preenche tudo.",
        false
      ) +
      fmtCard(
        "Simulação de operação",
        "Simule o financiamento do seu clientes nos principais bancos.",
        false
      );

    return (
      '<div class="docs-screen docs-screen--open" data-open-root data-view="0">' +
      sidebar +
      '<div class="hf-open">' +
      '<div class="hf-open__crumb"><span class="hf-open__crumb-ico"><img src="assets/screen/open/crumb.svg" width="20" height="20" alt=""></span><i class="hf-open__crumb-div"></i><span>Nova operação</span></div>' +
      '<div class="hf-open__head"><h1 class="hf-open__title" data-open-title>Nova operação</h1>' +
      '<p class="hf-open__sub" data-open-sub>Preencha as etapas para criar uma nova operação de produto.</p></div>' +
      openStepper(0, stepsA) +
      '<div class="hf-open__stage">' +
      '<div class="hf-open__view is-on" data-open-view="0"><div class="hf-chiprow" data-chip-group="perfil">' +
      chipCard("Pessoa Física", true) +
      chipCard("Pessoa Jurídica", false, "hf-chipcard--pj") +
      "</div></div>" +
      '<div class="hf-open__view" data-open-view="1"><div class="hf-open-sec"><p class="hf-open-sec__title">Mesa de operações</p>' +
      mesas +
      "</div></div>" +
      '<div class="hf-open__view" data-open-view="2"><div class="hf-open-sec"><p class="hf-open-sec__title">Produto</p>' +
      '<div class="hf-chiprow" data-chip-group="produto">' +
      produtos +
      "</div></div></div>" +
      '<div class="hf-open__view" data-open-view="3"><div class="hf-open-sec hf-open-id"><p class="hf-open-sec__title">Identifique o cliente</p>' +
      '<p class="hf-open-id__hint">Informe o CPF para ver se já existe operação deste produto. O cliente pertence à imobiliária, não ao operador.</p>' +
      '<div class="hf-open__form hf-open__form--id">' +
      openField("CPF", "000.000.000-00", ' data-cpf-input inputmode="numeric" autocomplete="off"') +
      openField("Nome completo", "Preenchido após o CPF", " data-name-input") +
      "</div>" +
      '<div class="hf-open-demos"><span>Testar cenário</span>' +
      '<button class="hf-open-demo" type="button" data-demo-cpf="12345678900">Mesma imobiliária</button>' +
      '<button class="hf-open-demo" type="button" data-demo-cpf="98765432100">CPF indisponível</button>' +
      '<button class="hf-open-demo" type="button" data-demo-cpf="11122233344">Cliente já cadastrado</button>' +
      '<button class="hf-open-demo" type="button" data-demo-cpf="39053344705">Cliente novo</button>' +
      "</div>" +
      '<div class="hf-match-host" data-match-panel></div></div></div>' +
      '<div class="hf-open__view" data-open-view="4"><div class="hf-open-sec"><p class="hf-open-sec__title">Formato da operação</p>' +
      '<div class="hf-fmt-grid">' +
      formats +
      "</div></div></div>" +
      '<div class="hf-open__view" data-open-view="5"><h2 class="hf-open__h">Informações do cliente</h2>' +
      '<div class="hf-open__form">' +
      openSelect("Personal finance", ["Victor Tavares", "Lucas Augusto", "Maurício Lima"]) +
      openField("Telefone", "Informar", " data-phone-input") +
      openField("E-mail", "Informar", " data-email-input") +
      openField("Data de nascimento", "Informar", " data-birth-input") +
      openField("Valor da operação", "R$ 0,00") +
      '<div class="hf-field hf-field--area"><div class="hf-field__header"><span class="hf-field__label">Detalhe sobre a solicitação?</span></div>' +
      '<div class="hf-field__control hf-field__control--area"><textarea class="hf-field__area" placeholder="Como buscamos ofertar uma solução customizada e mais assertiva, informe mais detalhes sobre a solicitação como: situação do cliente, finalidade da operação, etc."></textarea></div></div>' +
      "</div></div></div>" +
      '<div class="hf-open__foot"><button class="hf-open__back" type="button" data-open-back disabled>' +
      '<img src="assets/screen/open/arrow-left.svg" width="18" height="18" alt="">Voltar</button>' +
      '<button class="hf-open__next" type="button" data-open-next>Continuar<img src="assets/screen/open/arrow-right.svg" width="18" height="18" alt=""></button></div>' +
      "</div></div>"
    );
  }

  function bindOpen(root) {
    var shell = root.querySelector("[data-open-root]");
    if (!shell) return;
    var view = 0;
    var state = {
      perfil: "Pessoa Física",
      mesa: "Imobiliário",
      produto: "Aquisição",
      formato: "Operação simplificada",
      cpf: "",
      name: "",
      match: "",
      lockSim: false,
      ownerRequest: "",
    };
    var stepsEarly = [
      "Perfil do cliente",
      "Seleção de Produto",
      "Informações do cliente",
      "Comunicação",
      "Resumo",
    ];
    var stepsLate = [
      "Perfil do cliente",
      "Seleção de Produto",
      "Informações do cliente",
      "Dados do formulário",
      "Comunicação",
    ];
    var cpfInput = shell.querySelector("[data-cpf-input]");
    var nameInput = shell.querySelector("[data-name-input]");
    var panel = shell.querySelector("[data-match-panel]");
    var lastView = 5;

    function stepperIndex() {
      if (view === 0) return 0;
      if (view <= 2) return 1;
      return 2;
    }

    function clientOf() {
      return OPEN_CLIENTS[state.cpf] || null;
    }

    function currentKind() {
      if (state.cpf.length !== 11) return "";
      return matchKind(clientOf(), state.produto);
    }

    function canProceed() {
      var kind = currentKind();
      if (view !== 3) return true;
      if (!kind) return false;
      if (kind === "same") return false;
      if (kind === "other") return !!state.lockSim;
      return true;
    }

    function paintMatch() {
      if (!panel) return;
      var kind = currentKind();
      state.match = kind;
      if (!kind) {
        panel.innerHTML = "";
        return;
      }
      var client = clientOf() || { name: nameInput ? nameInput.value : "" };
      panel.innerHTML = renderMatch(kind, client, state.produto, state.ownerRequest);
      if (kind === "other") {
        if (nameInput) nameInput.value = "";
        state.name = "";
      } else {
        if (client.name && nameInput) nameInput.value = client.name;
        state.name = client.name || state.name;
        var phone = shell.querySelector("[data-phone-input]");
        var email = shell.querySelector("[data-email-input]");
        var birth = shell.querySelector("[data-birth-input]");
        if (client.phone && phone) phone.value = client.phone;
        if (client.email && email) email.value = client.email;
        if (client.birth && birth) birth.value = client.birth;
      }
    }

    function lookupFromInput() {
      if (!cpfInput) return;
      var nextCpf = cpfDigits(cpfInput.value);
      if (nextCpf !== state.cpf) state.ownerRequest = "";
      state.cpf = nextCpf;
      cpfInput.value = cpfMask(state.cpf);
      if (state.cpf.length < 11) {
        state.lockSim = false;
        state.ownerRequest = "";
        if (nameInput && !OPEN_CLIENTS[state.cpf]) nameInput.value = "";
      }
      paintMatch();
      paint();
    }

    function paintFormats() {
      shell.querySelectorAll("[data-fmt]").forEach(function (btn) {
        var sim = btn.getAttribute("data-fmt") === "Simulação de operação";
        if (state.lockSim) {
          btn.disabled = !sim;
          btn.classList.toggle("is-selected", sim);
          if (sim) state.formato = "Simulação de operação";
        } else {
          btn.disabled = false;
        }
      });
    }

    function paint() {
      shell.setAttribute("data-view", String(view));
      shell.querySelectorAll("[data-open-view]").forEach(function (el) {
        el.classList.toggle("is-on", Number(el.getAttribute("data-open-view")) === view);
      });
      var active = stepperIndex();
      var labels = view === lastView ? stepsLate : stepsEarly;
      shell.querySelectorAll("[data-open-stepper] .hf-step-s").forEach(function (el, i) {
        el.classList.remove("is-current", "is-done", "is-todo");
        el.classList.add(i === active ? "is-current" : i < active ? "is-done" : "is-todo");
        var lab = el.querySelector(".hf-step-s__label");
        if (lab && labels[i]) lab.innerHTML = OPEN_STEP_HTML[labels[i]] || labels[i];
      });
      var title = shell.querySelector("[data-open-title]");
      var sub = shell.querySelector("[data-open-sub]");
      if (view >= 3) {
        title.textContent =
          "Financiamento " + state.mesa + " -" + state.produto + " - " + state.perfil;
        title.classList.add("is-regular");
        sub.textContent =
          view === 3
            ? "Confira se este CPF já tem operação deste produto antes de seguir."
            : "Informe os dados de contato do cliente mais algumas informações complementares para solicitação da proposta.";
      } else {
        title.textContent = "Nova operação";
        title.classList.remove("is-regular");
        sub.textContent = "Preencha as etapas para criar uma nova operação de produto.";
      }
      var back = shell.querySelector("[data-open-back]");
      var next = shell.querySelector("[data-open-next]");
      if (back) back.disabled = view === 0;
      if (next) {
        var blocked = view === 3 && !canProceed();
        next.disabled = blocked;
        next.hidden = blocked;
        next.innerHTML =
          view === lastView
            ? 'Concluir operação<img src="assets/screen/open/arrow-right.svg" width="18" height="18" alt="">'
            : 'Continuar<img src="assets/screen/open/arrow-right.svg" width="18" height="18" alt="">';
      }
      paintFormats();
      shell.querySelectorAll("[data-demo-cpf]").forEach(function (btn) {
        btn.classList.toggle(
          "is-on",
          cpfDigits(btn.getAttribute("data-demo-cpf")) === state.cpf
        );
      });
    }

    function refillProducts() {
      var row = shell.querySelector('[data-chip-group="produto"]');
      if (!row) return;
      var list = productsFor(state.mesa);
      state.produto = list[0];
      state.ownerRequest = "";
      row.innerHTML = list
        .map(function (name, i) {
          return chipCard(name, i === 0, "hf-chipcard--fill");
        })
        .join("");
      row.querySelectorAll("[data-chipcard]").forEach(wireChip);
      if (state.cpf.length === 11) paintMatch();
      paint();
    }

    function wireChip(btn) {
      btn.addEventListener("click", function () {
        var group = btn.closest("[data-chip-group]");
        var key = group.getAttribute("data-chip-group");
        group.querySelectorAll("[data-chipcard]").forEach(function (other) {
          other.classList.remove("is-selected");
        });
        btn.classList.add("is-selected");
        state[key] = btn.getAttribute("data-chipcard");
        if (key === "mesa") refillProducts();
        if (key === "produto" && state.cpf.length === 11) {
          state.lockSim = false;
          state.ownerRequest = "";
          paintMatch();
          paint();
        }
      });
    }

    shell.querySelectorAll("[data-chipcard]").forEach(wireChip);
    shell.querySelectorAll("[data-fmt]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        shell.querySelectorAll("[data-fmt]").forEach(function (other) {
          other.classList.remove("is-selected");
        });
        btn.classList.add("is-selected");
        state.formato = btn.getAttribute("data-fmt");
      });
    });
    if (cpfInput) {
      cpfInput.addEventListener("input", lookupFromInput);
      cpfInput.addEventListener("blur", lookupFromInput);
    }
    shell.querySelectorAll("[data-demo-cpf]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!cpfInput) return;
        cpfInput.value = btn.getAttribute("data-demo-cpf");
        lookupFromInput();
        cpfInput.focus();
      });
    });
    shell.addEventListener("click", function (event) {
      var el = event.target.nodeType === 1 ? event.target : event.target.parentElement;
      var act = el && el.closest("[data-match-act]");
      if (!act || !shell.contains(act)) return;
      var which = act.getAttribute("data-match-act");
      if (which === "open") {
        location.hash = "#/detalhes-operacao";
        return;
      }
      if (which === "assume") {
        state.ownerRequest = "form";
        paintMatch();
        return;
      }
      if (which === "assume-back") {
        state.ownerRequest = "";
        paintMatch();
        return;
      }
      if (which === "assume-send") {
        var reason = shell.querySelector("[data-assume-reason]");
        var err = shell.querySelector("[data-assume-error]");
        var field = reason && reason.closest(".hf-field");
        var text = reason ? String(reason.value || "").trim() : "";
        if (!text) {
          if (field) field.classList.add("hf-field--error");
          if (err) err.hidden = false;
          if (reason) reason.focus();
          return;
        }
        state.ownerRequest = "pending";
        paintMatch();
        showSuccessToast("Pedido enviado. Aguardando o responsável ou um gestor.");
        return;
      }
      if (which === "join") {
        state.ownerRequest = "join-pending";
        paintMatch();
        showSuccessToast("Pedido para participar enviado. Aguardando o responsável.");
        return;
      }
      if (which === "simulate") {
        state.lockSim = true;
        state.formato = "Simulação de operação";
        view = 4;
        paint();
        return;
      }
      if (which === "review") {
        showSuccessToast("Solicitação enviada ao time HubFi.");
      }
    });
    var back = shell.querySelector("[data-open-back]");
    var next = shell.querySelector("[data-open-next]");
    if (back) {
      back.addEventListener("click", function () {
        if (view > 0) {
          view -= 1;
          paint();
        }
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        if (view === 3 && !canProceed()) {
          lookupFromInput();
          return;
        }
        if (view < lastView) {
          view += 1;
          paint();
          return;
        }
        showSuccessToast("Operação criada com sucesso.");
      });
    }
    var q = (location.hash.split("?")[1] || "").split("&")[0];
    var demoMap = {
      "cenario=mesma": "12345678900",
      "cenario=outra": "98765432100",
      "cenario=cadastrado": "11122233344",
      "cenario=novo": "39053344705",
    };
    if (demoMap[q] && cpfInput) {
      view = 3;
      cpfInput.value = demoMap[q];
      lookupFromInput();
    } else {
      paint();
    }
  }

  catalog.groups.push({
    id: "screens",
    label: "Telas",
    icon: "app-window",
    blurb: "Páginas compostas com os componentes do DS — como o produto usa de verdade.",
    items: [
      ["abertura-operacao", "Abertura de operação"],
      ["operacao-outro-canal", "Operação encerrada"],
      ["detalhes-operacao", "Detalhes da operação"],
      ["dashboard-operacoes", "Dashboard de operações"],
    ],
  });

  catalog.pages["abertura-operacao"] = {
    title: "Abertura de operação",
    lead: "Wizard de nova operação com match de CPF. Bloqueio entre empresas não cita o outro canal.",
    leadHtml:
      '<ol class="docs-howto">' +
      "<li><em>1</em><div><strong>Perfil, mesa e produto</strong><span>O match só roda depois do produto escolhido</span></div></li>" +
      "<li><em>2</em><div><strong>CPF do cliente</strong><span>Teste: Mesma imobiliária · CPF indisponível · Cliente já cadastrado · Cliente novo</span></div></li>" +
      "<li><em>3</em><div><strong>Mesma imobiliária</strong><span>Não cria OP. Abrir, ou pedir troca de responsável (com aprovação)</span></div></li>" +
      "<li><em>4</em><div><strong>CPF indisponível</strong><span>Bloqueio genérico. Sem citar outra empresa ou outro canal. Motivo real só no backoffice HubFi</span></div></li>" +
      "</ol>",
    node: "7636-24781",
    figmaFile: FIGMA_OPEN,
    wide: true,
    section: "Telas",
    html: function () {
      return openScreen();
    },
  };

  catalog.pages["operacao-outro-canal"] = {
    title: "Operação encerrada",
    lead: "O que a imobiliária vê. O motivo real (contratação em outro canal) fica só no backoffice HubFi, por LGPD.",
    node: "8135-36006",
    figmaFile: FIGMA_OP,
    wide: true,
    section: "Telas",
    html: function () {
      return opScreen({ lostChannel: true });
    },
  };

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
      bindOpen(root);
    },
  };
})();
