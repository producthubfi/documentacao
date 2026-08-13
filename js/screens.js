(function () {
  var catalog = window.HF_CATALOG;
  if (!catalog) return;

  var ui = catalog.ui || {};
  var FIGMA_OP = "https://www.figma.com/design/LQfnfvRTFm2AZ9qwTWsQEk?node-id=8332-123243";

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
      });
    }
  }

  catalog.groups.push({
    id: "screens",
    label: "Telas",
    icon: "app-window",
    blurb: "Páginas compostas com os componentes do DS — como o produto usa de verdade.",
    items: [["detalhes-operacao", "Detalhes da operação"]],
  });

  catalog.pages["detalhes-operacao"] = {
    title: "Detalhes da operação",
    lead: "Tela composta da Nova operação.",
    leadHtml:
      '<div class="docs-brief">' +
      '<p class="docs-lead">Tela composta da Nova operação, montada com componentes do DS.</p>' +
      '<ol class="docs-steps">' +
      "<li>Clique em um <strong>Card File</strong> para abrir o drawer OCR.</li>" +
      "<li>Confira o documento à esquerda e os dados extraídos à direita.</li>" +
      "<li>Filtre pela busca ou pelas badges de dados não identificados.</li>" +
      "<li>Preencha o que faltar e salve.</li>" +
      "</ol>" +
      '<p class="docs-brief__meta"><strong>Do DS:</strong> Search, Input, Badge, Button e Card.</p>' +
      '<p class="docs-brief__warn"><strong>Borda vermelha:</strong> peça que ainda não existe no DS (drawer OCR e viewer do arquivo).</p>' +
      "</div>",
    node: "8332-123243",
    figmaFile: FIGMA_OP,
    wide: true,
    section: "Telas",
    html: function () {
      return opScreen();
    },
  };

  window.HF_SCREENS = {
    bind: function (root) {
      bindOcr(root);
    },
  };
})();
