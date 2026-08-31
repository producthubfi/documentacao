(function () {
  var catalog = window.HF_CATALOG;
  if (!catalog) return;

  var ui = catalog.ui || {};
  var FIGMA_OP = "https://www.figma.com/design/LQfnfvRTFm2AZ9qwTWsQEk?node-id=8135-36006";
  var FIGMA_OPEN =
    "https://www.figma.com/design/C9RP2qnls5pDBjMSEdhT1n/Untitled?node-id=5-4106";
  var FIGMA_OPEN_INFO =
    "https://www.figma.com/design/C9RP2qnls5pDBjMSEdhT1n/Untitled?node-id=5-5689";
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

  function headerBtn(icon, label, act, extra) {
    var glyph = "";
    if (icon) {
      glyph = /\.svg$/.test(icon)
        ? '<span class="hf-btn__glyph"><img src="assets/icons/' + icon + '?v=89" width="16" height="16" alt=""></span>'
        : ico(icon, 16);
    }
    return (
      '<button class="hf-btn hf-header__act' +
      (extra ? " " + extra : "") +
      '" type="button"' +
      (act ? ' data-op-act="' + act + '"' : "") +
      ">" +
      glyph +
      label +
      "</button>"
    );
  }

  function timeCard(icon, label, value, hint, extraClass) {
    return (
      '<div class="hf-opage__time-card' +
      (extraClass ? " " + extraClass : "") +
      '">' +
      '<span class="hf-opage__time-ico" aria-hidden="true">' +
      ico(icon, 16) +
      "</span>" +
      '<div class="hf-opage__time-copy"><small>' +
      label +
      "</small><b>" +
      value +
      "</b><p>" +
      hint +
      "</p></div></div>"
    );
  }

  function pauseTimeCards(pausedDays, slaValue) {
    return (
      '<div class="hf-opage__times">' +
      timeCard(
        "pause",
        "SLA",
        slaValue || "Pausado",
        "Operação fora das filas ativas",
        "hf-opage__time-card--sla"
      ) +
      timeCard("clock", "Tempo em andamento", "18 dias", "Conta no SLA da etapa") +
      timeCard("hourglass", "Tempo pausado", pausedDays + " dias", "Fora do SLA", "is-paused") +
      "</div>"
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
      '<span class="hf-opage__status" data-op-badge hidden></span>' +
      '<i class="hf-header__rule" style="height:20px"></i>' +
      '<span class="hf-opage__person">Marcelo Oliveira</span>' +
      '<span class="hf-opage__spacer"></span>' +
      '<div class="hf-header__actions">' +
      '<span class="hf-opage__acts" data-op-acts-live>' +
      '<div class="hf-header__group">' +
      headerBtn("hd-check.svg", "Ganho", "won") +
      headerBtn("hd-x.svg", "Perdido", "lost") +
      "</div></span>" +
      '<span class="hf-opage__acts" data-op-acts-paused hidden>' +
      headerBtn("", "Retomar", "resume", "hf-btn--primary") +
      headerBtn("", "Estender pausa", "extend") +
      "</span>" +
      '<i class="hf-header__rule" style="height:20px"></i>' +
      headerBtn("hd-info.svg", "Mais informações", "", "hf-header__act--more") +
      '<span class="hf-opage__acts" data-op-acts-live>' +
      headerBtn("pause", "Pausado", "pause") +
      "</span></div></div>" +
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
      '<div data-pause-log></div>' +
      nested +
      "</div></section>";

    var chat =
      '<div class="hf-card-comments-wrap">' +
      (ui.cardComments
        ? ui.cardComments({ variant: "populated" })
        : "") +
      "</div>";

    var demos = opts.lostChannel
      ? ""
      : '<div class="hf-open-demos"><span>Testar cenário</span>' +
        '<button class="hf-open-demo is-on" type="button" data-op-demo="in_progress">Em andamento</button>' +
        '<button class="hf-open-demo" type="button" data-op-demo="paused">Pausado</button>' +
        '<button class="hf-open-demo" type="button" data-op-demo="cadence">Cadência vencida</button>' +
        '<button class="hf-open-demo" type="button" data-op-demo="auto_lost">Perdido por pausa</button></div>';

    var pauseReasons = [
      "Cliente sem definição de imóvel",
      "Documento pendente do cliente",
      "Cliente sem disponibilidade no momento",
      "Aguardando decisão financeira do cliente",
      "Aguardando condição de mercado (taxa, oferta)",
      "Outro",
    ];
    var pauseOverlay = opts.lostChannel
      ? ""
      : '<div class="docs-overlay" data-pause-overlay hidden>' +
        '<div class="hf-dialog"><div class="hf-dialog__head"><h3 class="hf-dialog__title" data-pause-dialog-title>Pausar operação</h3></div>' +
        '<p class="hf-dialog__desc">A operação sai das filas de SLA e volta na data de retorno, com lembrete no Slack do responsável.</p>' +
        '<div class="hf-dialog__slot hf-dialog__slot--form">' +
        openSelect("Motivo", pauseReasons, { req: true, attrs: " data-pause-reason-field" }) +
        '<div class="hf-field"><div class="hf-field__header"><span class="hf-field__label">Data de retorno prevista</span><span class="hf-field__req">*</span></div>' +
        '<div class="hf-field__control"><input class="hf-field__input" type="date" data-pause-date></div></div>' +
        '<div class="hf-field hf-field--area"><div class="hf-field__header"><span class="hf-field__label">Detalhe</span></div>' +
        '<div class="hf-field__control hf-field__control--area"><textarea class="hf-field__area" data-pause-detail placeholder="Complemento ao motivo. Obrigatório se o motivo for Outro."></textarea></div></div>' +
        '<p class="hf-field__error" data-pause-error hidden>Informe motivo e data de retorno.</p></div>' +
        '<hr class="hf-dialog__div"><div class="hf-dialog__foot">' +
        '<button class="hf-btn hf-btn--lg hf-btn--ghost" type="button" data-pause-cancel>Cancelar</button>' +
        '<button class="hf-btn hf-btn--lg hf-btn--primary" type="button" data-pause-confirm>Pausar operação</button>' +
        "</div></div></div>";

    return (
      '<div class="docs-screen' +
      (opts.lostChannel ? "" : " docs-screen--op-detail") +
      '"' +
      (opts.lostChannel ? "" : " data-op-detail") +
      ">" +
      sidebar +
      '<div class="docs-screen__main">' +
      '<div class="docs-screen__top">' +
      crumb +
      demos +
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
      (opts.lostChannel ? "" : '<div class="hf-match-host" data-pause-banner></div>') +
      "</div>" +
      chat +
      "</div>" +
      ocrOverlay() +
      pauseOverlay +
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
      '"><span class="hf-radio" aria-hidden="true"><span class="hf-radio-box"><img class="hf-radio-box__off" src="assets/icons/select-radio.svg" width="16" height="16" alt=""><img class="hf-radio-box__on" src="assets/icons/select-radio-on.svg" width="16" height="16" alt=""></span></span>' +
      '<span class="hf-fmt__body"><strong>' +
      title +
      "</strong><p>" +
      desc +
      '</p><span class="hf-fmt__more">Saber mais<img class="hf-fmt__more-ico" src="assets/screen/open/fmt-more.svg" width="14" height="14" alt=""></span></span></button>'
    );
  }

  function openField(label, placeholder, extra, opts) {
    extra = extra || "";
    opts = opts || {};
    return (
      '<div class="hf-field' +
      (opts.mod ? " " + opts.mod : "") +
      '"><div class="hf-field__header"><span class="hf-field__label">' +
      label +
      "</span>" +
      (opts.info
        ? '<img class="hf-field__info" src="assets/icons/field-info.svg" width="16" height="16" alt="">'
        : "") +
      (opts.req ? '<span class="hf-field__req">*</span>' : "") +
      '</div><div class="hf-field__control"><input class="hf-field__input" type="text" placeholder="' +
      placeholder +
      '"' +
      extra +
      "></div></div>"
    );
  }

  function openSelect(label, options, extra) {
    extra = extra || {};
    var filled = extra.filled || "";
    var items = (options || [])
      .map(function (opt) {
        var text = typeof opt === "string" ? opt : opt.label;
        var cpf = typeof opt === "string" ? "" : opt.cpf || "";
        return (
          '<div class="hf-select-menu__item" role="option" tabindex="-1" data-label="' +
          text +
          '"' +
          (cpf ? ' data-client-cpf="' + cpf + '"' : "") +
          ">" +
          text +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="hf-field hf-field--select' +
      (extra.mod ? " " + extra.mod : "") +
      '" data-select data-select-type="default"' +
      (extra.attrs || "") +
      ">" +
      '<div class="hf-field__header"><span class="hf-field__label">' +
      label +
      "</span>" +
      (extra.req ? '<span class="hf-field__req">*</span>' : "") +
      "</div>" +
      '<button class="hf-field__control" type="button" role="combobox" aria-haspopup="listbox" aria-expanded="false">' +
      '<span class="hf-field__value' +
      (filled ? "" : " hf-field__value--placeholder") +
      '">' +
      (filled || "Selecionar") +
      '</span><span class="hf-field__chevron"><img src="assets/icons/select-chevron.svg" alt=""></span></button>' +
      '<div class="hf-select-menu" role="listbox">' +
      items +
      "</div></div>"
    );
  }

  function openClientPicker(opts) {
    opts = opts || {};
    var items = (opts.items || [
      { label: "Marcelo Oliveira", cpf: "12345678900" },
      { label: "Ricardo Mendes", cpf: "11122233344" },
      { label: "Novo cliente", cpf: "39053344705" },
    ])
      .map(function (opt) {
        return (
          '<div class="hf-select-menu__item" role="option" tabindex="-1" data-label="' +
          opt.label +
          '" data-client-cpf="' +
          opt.cpf +
          '">' +
          opt.label +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="hf-field hf-field--select hf-open-client" data-client-select>' +
      '<div class="hf-field__header"><span class="hf-field__label">Selecione um cliente</span><span class="hf-field__req">*</span></div>' +
      '<div class="hf-field__control" data-client-trigger>' +
      '<input class="hf-field__input" type="text" data-client-query placeholder="Selecionar" autocomplete="off">' +
      '<button class="hf-open-client__clear" type="button" data-client-clear hidden aria-label="Limpar">' +
      '<img src="assets/ds-icons/x.svg" width="16" height="16" alt=""></button>' +
      '<span class="hf-field__chevron" aria-hidden="true"><img src="assets/icons/search.svg" width="16" height="16" alt=""></span></div>' +
      '<div class="hf-select-menu" role="listbox" data-client-menu>' +
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
    ["Operações Estruturadas", ""],
    ["Seguros", ""],
    ["Energia", ""],
    ["Consórcio", ""],
    ["Investimentos", ""],
  ];

  var OPEN_PRODUCTS = {
    Câmbio: ["Spot", "Turismo", "Importação", "Exportação", "Remessa"],
    Imobiliário: ["Aquisição", "Construção", "Home Equity", "Portabilidade", "FGTS"],
    Crédito: ["Capital de Giro", "Antecipação", "Consórcio", "CDC", "Empréstimo"],
    "Operações Estruturadas": ["FIDC", "CRI", "CRA", "Debênture", "Securitização"],
    Seguros: ["Vida", "Residencial", "Automóvel", "Empresarial", "Prestamista"],
    Energia: ["Geração", "Distribuição", "Autoprodução", "Mercado Livre", "GD"],
    Consórcio: ["Imóvel", "Auto", "Moto", "Serviços", "Pesados"],
    Investimentos: ["Renda Fixa", "Fundos", "Previdência", "COE", "Ações"],
  };

  function productsFor(mesa) {
    return OPEN_PRODUCTS[mesa] || [mesa, mesa, mesa, mesa, mesa];
  }

  var OPEN_BROKER = {
    cpf: "52998224725",
    name: "Lucas Augusto",
    email: "lucasaugusto@hubfi.com.br",
    phone: "62996026603",
  };

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
    "11222333000181": {
      name: "Jardins Incorporadora Ltda",
      phone: "(11) 3000-1000",
      email: "contato@jardins.com.br",
      kind: "closed",
      last: {
        id: "OP-000880",
        product: "Construção",
        status: "Ganha",
        date: "11/2025",
      },
    },
  };

  function cpfDigits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function cpfMask(digits) {
    var d = cpfDigits(digits).slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return d.slice(0, 3) + "." + d.slice(3);
    if (d.length <= 9) return d.slice(0, 3) + "." + d.slice(3, 6) + "." + d.slice(6);
    return d.slice(0, 3) + "." + d.slice(3, 6) + "." + d.slice(6, 9) + "-" + d.slice(9);
  }

  function cnpjMask(digits) {
    var d = cpfDigits(digits).slice(0, 14);
    if (d.length <= 2) return d;
    if (d.length <= 5) return d.slice(0, 2) + "." + d.slice(2);
    if (d.length <= 8) return d.slice(0, 2) + "." + d.slice(2, 5) + "." + d.slice(5);
    if (d.length <= 12) return d.slice(0, 2) + "." + d.slice(2, 5) + "." + d.slice(5, 8) + "/" + d.slice(8);
    return (
      d.slice(0, 2) +
      "." +
      d.slice(2, 5) +
      "." +
      d.slice(5, 8) +
      "/" +
      d.slice(8, 12) +
      "-" +
      d.slice(12)
    );
  }

  function matchKind(client, produto, cpf) {
    if (cpf && cpf === OPEN_BROKER.cpf) return "broker";
    if (!client) return "new";
    if (client.kind === "same" && client.op && client.op.product === produto) return "same";
    if (client.kind === "same") return "other-product";
    return client.kind;
  }

  function setOpenLocked(input, locked) {
    if (!input) return;
    input.disabled = !!locked;
    input.readOnly = !!locked;
    var field = input.closest(".hf-field");
    if (field) field.classList.toggle("hf-field--disabled", !!locked);
  }

  function openBtn(style, label, act) {
    return (
      '<button class="hf-btn hf-btn--lg hf-btn--' +
      style +
      '" type="button" data-match-act="' +
      act +
      '">' +
      label +
      "</button>"
    );
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

  function renderMatch(kind, client, produto) {
    if (kind === "same") {
      var op = client.op;
      return matchCard(
        "warning",
        "Este cliente já possui uma operação em andamento",
        "Mesmo produto na sua imobiliária. Não crie outra. Abra a existente.",
        kv("Operação", op.id) +
          kv("Produto", "Imobiliário · " + op.product) +
          kv("Responsável", op.owner) +
          kv("Etapa", op.stage + " · " + op.opened),
        openBtn("primary", "Abrir operação", "open")
      );
    }
    if (kind === "broker") {
      return matchCard(
        "error",
        "Estes dados pertencem ao profissional responsável",
        "Informe o documento do cliente. Não é possível abrir uma operação em nome do próprio corretor."
      );
    }
    if (kind === "other-product") {
      return matchCard(
        "info",
        "Cliente já cadastrado na empresa",
        "Não duplicamos um usuário. " +
          client.name +
          " já está na sua empresa. Nome e contato vieram do cadastro e não se editam nesta tela. " +
          client.op.product +
          " segue com " +
          client.op.owner +
          ". Você está abrindo " +
          produto +
          "."
      );
    }
    if (kind === "closed") {
      return matchCard(
        "success",
        "Cliente já cadastrado na empresa",
        "Não duplicamos um usuário. A operação será vinculada a este cadastro, mesmo que outro colega tenha criado. Última operação: " +
          client.last.product +
          " · " +
          client.last.status +
          " em " +
          client.last.date +
          " (" +
          client.last.id +
          ")."
      );
    }
    return matchCard(
      "success",
      "Novo cliente nesta empresa",
      "Nenhum usuário com este CPF na sua empresa. Preencha telefone e e-mail para cadastrar."
    );
  }

  function openScreen() {
    var sidebar =
      typeof ui.appSidebar === "function" ? ui.appSidebar("nova", "fit") : "";
    var steps = [
      "Perfil do cliente",
      "Seleção de Produto",
      "Informações do cliente",
      "Comunicação",
    ];

    var mesas =
      '<div class="hf-chiprow" data-chip-group="mesa">' +
      OPEN_MESAS.map(function (row) {
        return chipCard(row[0], row[0] === "Imobiliário");
      }).join("") +
      "</div>";

    var produtos = productsFor("Imobiliário")
      .map(function (name, i) {
        return chipCard(name, i === 0);
      })
      .join("");

    var formats =
      fmtCard(
        "Operação simplificada",
        "Cadastre o cliente em segundos e foque no que gera resultado. A gente cuida do resto, te avisando de cada avanço.",
        false
      ) +
      fmtCard(
        "Operação completa",
        "Traga todos os dados de uma vez e adiante a operação. Você decide quem fala com o cliente.",
        true
      ) +
      fmtCard(
        "Operação por link",
        "Compartilhe um link e deixe o cliente preencher no tempo dele, sem esforço nenhum da sua parte.",
        false
      ) +
      fmtCard(
        "Simulação de operação",
        "Mostre o resultado ao cliente antes de decidir. Sem compromisso, sem abrir operação.",
        false
      );

    return (
      '<div class="docs-screen docs-screen--open docs-screen--open-flow" data-open-root data-view="0">' +
      sidebar +
      '<div class="hf-open">' +
      '<div class="hf-open__crumb"><span class="hf-open__crumb-ico"><img src="assets/screen/open/crumb.svg" width="20" height="20" alt=""></span><i class="hf-open__crumb-div"></i><span>Nova Operação</span><span class="hf-open__crumb-div"></span><span>Operações</span></div>' +
      '<div class="hf-open__head"><h1 class="hf-open__title" data-open-title>Nova operação</h1>' +
      '<p class="hf-open__sub" data-open-sub>Preencha as etapas para criar uma nova operação de produto.</p></div>' +
      openStepper(0, steps) +
      '<div class="hf-open__stage">' +
      '<div class="hf-open__view is-on" data-open-view="0"><div class="hf-open__stack">' +
      '<div class="hf-open-sec"><p class="hf-open-sec__title">Perfil do cliente</p>' +
      '<div class="hf-chiprow" data-chip-group="perfil">' +
      chipCard("Pessoa Física", true) +
      chipCard("Pessoa Jurídica", false) +
      "</div></div>" +
      '<div class="hf-open-sec"><p class="hf-open-sec__title">Mesa de Operações</p>' +
      mesas +
      "</div>" +
      '<div class="hf-open-sec"><p class="hf-open-sec__title">Produto</p>' +
      '<div class="hf-chiprow" data-chip-group="produto">' +
      produtos +
      "</div></div>" +
      '<div class="hf-open-sec"><p class="hf-open-sec__title">Formato da operação</p>' +
      '<div class="hf-fmt-grid">' +
      formats +
      "</div></div></div></div>" +
      '<div class="hf-open__view" data-open-view="1"><div class="hf-open__info">' +
      '<h2 class="hf-open__h">Informações do Cliente</h2>' +
      '<div class="hf-open-demos"><span>Testar cenário</span>' +
      '<button class="hf-open-demo" type="button" data-demo-cpf="12345678900">Operação aberta</button>' +
      '<button class="hf-open-demo" type="button" data-demo-cpf="11122233344">Cliente do colega</button>' +
      '<button class="hf-open-demo" type="button" data-demo-cpf="11222333000181" data-demo-perfil="pj">Pessoa jurídica</button>' +
      '<button class="hf-open-demo" type="button" data-demo-cpf="52998224725">Dados do corretor</button>' +
      "</div>" +
      '<div class="hf-match-host" data-match-panel></div>' +
      '<input type="hidden" data-cpf-input data-doc-input value="">' +
      '<div class="hf-open__form hf-open__form--info">' +
      openSelect("Personal Finance", ["Ricardo Teste", "Lucas Augusto", "Maurício Lima"], {
        req: true,
        filled: "Ricardo Teste",
      }) +
      openClientPicker() +
      openField("Telefone", "(00) 00000-0000", " data-phone-input", { req: true }) +
      openField("Email", "email@cliente.com", " data-email-input", { req: true }) +
      openField("Valor da Operação", "R$ 0", " data-amount-input", { info: true }) +
      '<div class="hf-field hf-field--area"><div class="hf-field__header"><span class="hf-field__label">Detalhe sobre a solicitação?</span></div>' +
      '<div class="hf-field__control hf-field__control--area"><textarea class="hf-field__area" placeholder="Como buscamos ofertar uma solução customizada e mais assertiva, informe mais detalhes sobre a solicitação como: situação do cliente, finalidade da operação, etc."></textarea></div></div>' +
      "</div></div></div>" +
      '<div class="hf-open__foot"><button class="hf-open__back" type="button" data-open-back hidden>' +
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
      formato: "Operação completa",
      cpf: "",
      name: "",
      match: "",
    };
    var stepsEarly = [
      "Perfil do cliente",
      "Seleção de Produto",
      "Informações do cliente",
      "Comunicação",
    ];
    var cpfInput = shell.querySelector("[data-cpf-input]");
    var clientSelect = shell.querySelector("[data-client-select]");
    var clientMenu = clientSelect && clientSelect.querySelector("[data-client-menu]");
    var panel = shell.querySelector("[data-match-panel]");
    var lastView = 1;

    function clientItems() {
      if (isPj()) {
        return [
          { label: "Jardins Incorporadora Ltda", cpf: "11222333000181" },
          { label: "Novo cliente", cpf: "33444555000190" },
        ];
      }
      return [
        { label: "Marcelo Oliveira", cpf: "12345678900" },
        { label: "Ricardo Mendes", cpf: "11122233344" },
        { label: "Novo cliente", cpf: "39053344705" },
      ];
    }

    function refillClientMenu() {
      if (!clientMenu) return;
      clientMenu.innerHTML = clientItems()
        .map(function (opt) {
          return (
            '<div class="hf-select-menu__item" role="option" tabindex="-1" data-label="' +
            opt.label +
            '" data-client-cpf="' +
            opt.cpf +
            '">' +
            opt.label +
            "</div>"
          );
        })
        .join("");
    }

    function setPerfil(label) {
      state.perfil = label;
      var row = shell.querySelector('[data-chip-group="perfil"]');
      if (!row) return;
      row.querySelectorAll("[data-chipcard]").forEach(function (chip) {
        chip.classList.toggle("is-selected", chip.getAttribute("data-chipcard") === label);
      });
      refillClientMenu();
    }

    function isPj() {
      return state.perfil === "Pessoa Jurídica";
    }

    function docLen() {
      return isPj() ? 14 : 11;
    }

    function docLabel() {
      return isPj() ? "CNPJ" : "CPF";
    }

    function maskDoc(value) {
      return isPj() ? cnpjMask(value) : cpfMask(value);
    }

    function stepperIndex() {
      return view === 0 ? 0 : 2;
    }

    function clientOf() {
      return OPEN_CLIENTS[state.cpf] || null;
    }

    function currentKind() {
      if (state.cpf.length !== docLen()) return "";
      return matchKind(clientOf(), state.produto, state.cpf);
    }

    function reused() {
      var kind = currentKind();
      return kind === "same" || kind === "closed" || kind === "other-product";
    }

    function contactFilled() {
      var phone = shell.querySelector("[data-phone-input]");
      var email = shell.querySelector("[data-email-input]");
      return !!(phone && String(phone.value || "").trim() && email && String(email.value || "").trim());
    }

    function canProceed() {
      var kind = currentKind();
      if (view !== 1) return true;
      if (!kind || kind === "same" || kind === "broker") return false;
      if (kind === "new" && !contactFilled()) return false;
      return true;
    }

    function setClientLabel(text, filled) {
      if (!clientSelect) return;
      var query = clientSelect.querySelector("[data-client-query]");
      var clear = clientSelect.querySelector("[data-client-clear]");
      if (query) query.value = filled ? text || "" : "";
      if (clear) clear.hidden = !filled;
    }

    function paintMatch() {
      if (!panel) return;
      var kind = currentKind();
      state.match = kind;
      var phone = shell.querySelector("[data-phone-input]");
      var email = shell.querySelector("[data-email-input]");
      if (!kind) {
        panel.innerHTML = "";
        setOpenLocked(phone, false);
        setOpenLocked(email, false);
        setClientLabel("Selecionar", false);
        return;
      }
      var client = clientOf() || {};
      panel.innerHTML = renderMatch(kind, client, state.produto);
      if (kind === "broker") {
        state.name = "";
        setClientLabel("Selecionar", false);
        if (phone) phone.value = "";
        if (email) email.value = "";
        setOpenLocked(phone, true);
        setOpenLocked(email, true);
        return;
      }
      if (reused()) {
        state.name = client.name || state.name;
        setClientLabel(client.name, true);
        if (client.phone && phone) phone.value = client.phone;
        if (client.email && email) email.value = client.email;
        setOpenLocked(phone, true);
        setOpenLocked(email, true);
        return;
      }
      state.name = "Novo cliente";
      setClientLabel("Novo cliente", true);
      setOpenLocked(phone, false);
      setOpenLocked(email, false);
    }

    function lookupFromInput() {
      if (!cpfInput) return;
      var nextCpf = cpfDigits(cpfInput.value).slice(0, docLen());
      state.cpf = nextCpf;
      cpfInput.value = nextCpf;
      if (state.cpf.length < docLen()) {
        state.name = "";
      }
      paintMatch();
      paint();
    }

    function paintFormats() {
      shell.querySelectorAll("[data-fmt]").forEach(function (btn) {
        btn.disabled = false;
      });
    }

    function paint() {
      shell.setAttribute("data-view", String(view));
      shell.querySelectorAll("[data-open-view]").forEach(function (el) {
        el.classList.toggle("is-on", Number(el.getAttribute("data-open-view")) === view);
      });
      var active = stepperIndex();
      var labels = stepsEarly;
      shell.querySelectorAll("[data-open-stepper] .hf-step-s").forEach(function (el, i) {
        el.classList.remove("is-current", "is-done", "is-todo");
        el.classList.add(i === active ? "is-current" : i < active ? "is-done" : "is-todo");
        var lab = el.querySelector(".hf-step-s__label");
        if (lab && labels[i]) lab.innerHTML = OPEN_STEP_HTML[labels[i]] || labels[i];
      });
      var title = shell.querySelector("[data-open-title]");
      var sub = shell.querySelector("[data-open-sub]");
      if (view === 1) {
        title.textContent =
          "Financiamento " + state.mesa + " - " + state.produto + " - " + state.perfil;
        title.classList.add("is-regular");
        sub.textContent = reused()
          ? "Contato carregado do cadastro. Para alterar e-mail ou telefone, edite o cliente."
          : "Informe os dados de contato do cliente mais algumas informações complementares para solicitação da proposta.";
      } else {
        title.textContent = "Nova operação";
        title.classList.remove("is-regular");
        sub.textContent = "Preencha as etapas para criar uma nova operação de produto.";
      }
      var back = shell.querySelector("[data-open-back]");
      var next = shell.querySelector("[data-open-next]");
      if (back) {
        back.disabled = view === 0;
        back.hidden = view === 0;
      }
      if (next) {
        var kind = currentKind();
        var blocked = view === 1 && (kind === "same" || kind === "broker");
        var incomplete = view === 1 && (!kind || (kind === "new" && !contactFilled()));
        next.disabled = blocked || incomplete;
        next.hidden = blocked;
        next.innerHTML =
          'Continuar<img src="assets/screen/open/arrow-right.svg" width="18" height="18" alt="">';
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
      row.innerHTML = list
        .map(function (name, i) {
          return chipCard(name, i === 0);
        })
        .join("");
      row.querySelectorAll("[data-chipcard]").forEach(wireChip);
      if (state.cpf.length === docLen()) paintMatch();
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
        if (key === "perfil") {
          state.cpf = "";
          state.name = "";
          if (cpfInput) cpfInput.value = "";
          refillClientMenu();
          paintMatch();
        }
        if (key === "mesa") refillProducts();
        if (key === "produto" && state.cpf.length === docLen()) {
          paintMatch();
          paint();
        }
        paint();
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
    if (clientSelect) {
      var clientQuery = clientSelect.querySelector("[data-client-query]");
      var clientMenu = clientSelect.querySelector("[data-client-menu]");
      var clientClear = clientSelect.querySelector("[data-client-clear]");

      function closeClientMenu() {
        clientSelect.classList.remove("is-open");
      }

      function openClientMenu() {
        clientSelect.classList.add("is-open");
        if (clientMenu) {
          var trigger = clientSelect.querySelector("[data-client-trigger]");
          if (trigger) {
            clientMenu.style.top = trigger.offsetTop + trigger.offsetHeight + 4 + "px";
          }
        }
      }

      function filterClientMenu(q) {
        var needle = String(q || "")
          .toLowerCase()
          .trim();
        clientSelect.querySelectorAll("[data-client-cpf]").forEach(function (item) {
          var label = (item.getAttribute("data-label") || item.textContent || "").toLowerCase();
          var cpf = item.getAttribute("data-client-cpf") || "";
          var digitsNeedle = needle.replace(/\D/g, "");
          var hitLabel = !needle || label.indexOf(needle) !== -1;
          var hitDoc = !digitsNeedle || cpf.indexOf(digitsNeedle) !== -1;
          item.hidden = !(hitLabel || hitDoc);
        });
      }

      function pickClient(item) {
        if (!item || !cpfInput) return;
        cpfInput.value = item.getAttribute("data-client-cpf") || "";
        closeClientMenu();
        lookupFromInput();
      }

      if (clientQuery) {
        clientQuery.addEventListener("focus", function () {
          filterClientMenu(clientQuery.value);
          openClientMenu();
        });
        clientQuery.addEventListener("input", function () {
          filterClientMenu(clientQuery.value);
          openClientMenu();
          if (!clientQuery.value.trim() && cpfInput && state.cpf) {
            cpfInput.value = "";
            lookupFromInput();
          }
        });
      }
      if (clientClear) {
        clientClear.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          if (cpfInput) cpfInput.value = "";
          closeClientMenu();
          lookupFromInput();
          if (clientQuery) clientQuery.focus();
        });
      }
      clientSelect.addEventListener("click", function (event) {
        var item = event.target.closest("[data-client-cpf]");
        if (!item || !clientSelect.contains(item)) return;
        event.preventDefault();
        pickClient(item);
      });
      document.addEventListener("click", function (event) {
        if (!clientSelect.contains(event.target)) closeClientMenu();
      });
    }
    shell.querySelectorAll("[data-demo-cpf]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!cpfInput) return;
        var perfil = btn.getAttribute("data-demo-perfil");
        if (perfil === "pj") setPerfil("Pessoa Jurídica");
        else setPerfil("Pessoa Física");
        view = 1;
        cpfInput.value = btn.getAttribute("data-demo-cpf");
        lookupFromInput();
      });
    });
    shell.addEventListener("click", function (event) {
      var el = event.target.nodeType === 1 ? event.target : event.target.parentElement;
      var act = el && el.closest("[data-match-act]");
      if (!act || !shell.contains(act)) return;
      var which = act.getAttribute("data-match-act");
      if (which === "open") {
        location.hash = "#/detalhes-operacao";
      }
    });
    shell.querySelectorAll("[data-phone-input], [data-email-input]").forEach(function (el) {
      el.addEventListener("input", paint);
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
        if (view === 1 && !canProceed()) {
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
    paint();
    var openQs = (location.hash.split("?")[1] || "");
    if (/(?:^|&)step=info/.test(openQs) || /(?:^|&)cpf=/.test(openQs)) {
      view = 1;
      var cpfQ = openQs.match(/(?:^|&)cpf=([^&]+)/);
      if (cpfQ && cpfInput) {
        cpfInput.value = decodeURIComponent(cpfQ[1]);
        lookupFromInput();
      } else {
        paint();
      }
    }
  }

  catalog.briefings = [
    {
      title: "Unicidade de Cliente por Empresa",
      lead: "Só os fluxos com erro ou alerta: bloqueio, recusa e trava. Caminhos felizes ficam fora desta lista.",
      scenarios: [
        {
          label: "Cadastro: documento já na empresa",
          note: "Bloqueia a ficha nova. Card de alerta e abrir o cadastro existente.",
          href: "#/cadastro-cliente?demo=empresa",
        },
        {
          label: "Cadastro: CNPJ já na empresa",
          note: "Mesmo alerta de duplicata, com pessoa jurídica.",
          href: "#/cadastro-cliente?demo=pj",
        },
        {
          label: "Abertura: documento obrigatório",
          note: "Sem CPF ou CNPJ válido, alerta e não avança.",
          href: "#/abertura-operacao?step=info",
        },
        {
          label: "Abertura: operação já em andamento",
          note: "Mesmo produto. Alerta para abrir a operação existente.",
          href: "#/abertura-operacao?step=info&cpf=12345678900",
        },
        {
          label: "Abertura: dados do corretor",
          note: "Documento do responsável é recusado.",
          href: "#/abertura-operacao?step=info&cpf=52998224725",
        },
        {
          label: "Formulário público: sem documento",
          note: "E-mail e telefone não fazem match. Erro de identidade.",
          href: "#/formulario-publico?demo=sem-doc",
        },
        {
          label: "Edição: CPF travado",
          note: "Operação formalizada. Usuário comum não altera o documento.",
          href: "#/edicao-cliente?demo=trava",
        },
        {
          label: "Edição: colisão de documento",
          note: "Trocar para o CPF de outro cliente da empresa é bloqueado.",
          href: "#/edicao-cliente?demo=colisao",
        },
      ],
      pending: [
        {
          title: "Duas empresas, mesmo CPF",
          note: "Cada empresa cadastra de forma independente, sem mencionar a outra. Hoje isso só aparece na copy.",
        },
        {
          title: "Integração de parceiro",
          note: "Documento já cadastrado por outro usuário da mesma empresa deve reaproveitar a ficha. Sem tela neste DS.",
        },
        {
          title: "Link público",
          note: "Aceite desses cenários fica para depois.",
        },
      ],
    },
    {
      title: 'Status "Pausado" — Retenção de operações com pendência temporária',
      lead: "Pausa a operação com motivo e data de retorno. O tempo pausado fica fora do SLA. Sem retomada na cadência, vira Perdido por pausa vencida.",
      scenarios: [
        {
          label: "Transição para Pausado",
          note: "A partir de Em andamento. Motivo e data de retorno são obrigatórios.",
          href: "#/detalhes-operacao?demo=paused",
        },
        {
          label: "Tempo pausado separado do SLA",
          note: "Dias pausados não entram no tempo em andamento.",
          href: "#/detalhes-operacao?demo=paused",
        },
        {
          label: "Retomar ou estender",
          note: "Volta para Em andamento ou define nova data. A cadência reinicia.",
          href: "#/detalhes-operacao?demo=paused",
        },
        {
          label: "Cadência pós-vencimento",
          note: "Lembretes D+0, D+2 e D+4 depois da data de retorno.",
          href: "#/detalhes-operacao?demo=cadence",
        },
        {
          label: "Perdido por pausa vencida",
          note: "Sem ação ao fim da cadência. Motivo distinto da perda real.",
          href: "#/detalhes-operacao?demo=auto_lost",
        },
      ],
      pending: [
        {
          title: "Listagem (RF-PAUSA-01)",
          note: "Kanban e tabela sem pausadas por padrão, com filtro. Fora deste protótipo.",
        },
        {
          title: "Mensagem de Slack (RF-PAUSA-04)",
          note: "Lembrete no canal do operador. Fora deste protótipo.",
        },
      ],
    },
  ];

  catalog.pages["prototipos"] = {
    title: "PROTÓTIPOS",
    lead: "Dois briefings. Em cada um, os critérios de aceite já prototipados.",
    section: "Protótipos",
    wide: true,
    html: function () {
      return catalog.ui.briefingHub ? catalog.ui.briefingHub() : "";
    },
  };

  catalog.pages["abertura-operacao"] = {
    title: "Abertura de operação",
    lead: "Documento é a identidade. A ficha é única na empresa e reaproveitada entre colegas. Outra empresa cadastra o mesmo CPF em silêncio.",
    leadHtml:
      '<ol class="docs-howto">' +
      "<li><em>1</em><div><strong>Perfil, mesa e produto</strong><span>PF pede CPF. PJ pede CNPJ. O match roda depois do produto</span></div></li>" +
      "<li><em>2</em><div><strong>Documento do cliente</strong><span>O match roda ao informar um CPF ou CNPJ válido</span></div></li>" +
      "<li><em>3</em><div><strong>Reaproveitar ou criar</strong><span>Ficha da empresa carrega nome e contato travados. Cliente novo preenche. Sem documento não avança</span></div></li>" +
      "<li><em>4</em><div><strong>Outra empresa</strong><span>Cria ficha nova, sem mencionar que o documento existe fora. Dados do corretor são recusados</span></div></li>" +
      "<li><em>5</em><div><strong>Cliente do colega</strong><span>CPF já na empresa reaproveita o cadastro, mesmo criado por outro usuário</span></div></li>" +
      "<li><em>6</em><div><strong>Pessoa jurídica</strong><span>CNPJ no lugar do CPF. A mesma regra de unicidade</span></div></li>" +
      "</ol>",
    node: "5-4106",
    figmaFile: FIGMA_OPEN,
    wide: true,
    section: "Telas",
    scenarios: [
      { label: "Documento obrigatório", note: "Sem CPF ou CNPJ válido, não avança.", href: "#/abertura-operacao?step=info" },
      { label: "Cliente do colega", note: "Reaproveita a ficha e vincula a operação nova.", href: "#/abertura-operacao?step=info&cpf=11122233344" },
      { label: "Operação aberta", note: "Mesmo produto já em andamento.", href: "#/abertura-operacao?step=info&cpf=12345678900" },
      { label: "Pessoa jurídica", note: "CNPJ no lugar do CPF. Mesma regra de unicidade.", href: "#/abertura-operacao?step=info&cpf=11222333000181" },
      { label: "Dados do corretor", note: "Documento do responsável é recusado.", href: "#/abertura-operacao?step=info&cpf=52998224725" },
    ],
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
    scenarios: [
      { label: "Imobiliária", note: "Motivo real da perda fica só no backoffice.", href: "#/operacao-outro-canal" },
    ],
    html: function () {
      return opScreen({ lostChannel: true });
    },
  };

  catalog.pages["detalhes-operacao"] = {
    title: "Detalhes da operação",
    lead: "Status da operação, incluindo Pausado: pendência temporária, data de retorno e cadência de lembretes.",
    leadHtml:
      '<ol class="docs-howto">' +
      "<li><em>1</em><div><strong>Pausar</strong><span>Em andamento → Pausado. Motivo e data de retorno são obrigatórios</span></div></li>" +
      "<li><em>2</em><div><strong>Fora do SLA</strong><span>A operação some da fila ativa, mas continua buscável com o filtro Pausado</span></div></li>" +
      "<li><em>3</em><div><strong>Retomar ou estender</strong><span>Volta para Em andamento ou define nova data. A cadência de Slack reinicia</span></div></li>" +
      "<li><em>4</em><div><strong>Cadência vencida</strong><span>D+0, D+2 e D+4. Sem ação, vira Perdido por pausa vencida</span></div></li>" +
      "<li><em>5</em><div><strong>Tempo</strong><span>Dias pausados ficam separados do tempo em andamento e não entram no SLA</span></div></li>" +
      "</ol>",
    node: "8135-36006",
    figmaFile: FIGMA_OP,
    wide: true,
    section: "Telas",
    scenarios: [
      { label: "Em andamento", note: "Fluxo padrão, sem card de pausa.", href: "#/detalhes-operacao" },
      { label: "Pausado", note: "Fora das filas. Tempo pausado separado do SLA.", href: "#/detalhes-operacao?demo=paused" },
      { label: "Cadência vencida", note: "Lembretes D+0, D+2, D+4.", href: "#/detalhes-operacao?demo=cadence" },
      { label: "Perdido por pausa", note: "Sem retomada ao fim da cadência.", href: "#/detalhes-operacao?demo=auto_lost" },
    ],
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
    scenarios: [
      { label: "Visão estratégica", note: "Funil, conversão e indicadores.", href: "#/dashboard-operacoes" },
    ],
    html: function () {
      return dashScreen();
    },
  };

  function bindOpDetail(root) {
    var shell = root.querySelector("[data-op-detail]");
    if (!shell) return;

    var state = {
      status: "in_progress",
      reason: "Documento pendente do cliente",
      detail: "Cliente aguarda segunda via do RG.",
      returnDate: "",
      mode: "pause",
    };

    function pad(n) {
      return n < 10 ? "0" + n : String(n);
    }
    function todayPlus(days) {
      var d = new Date();
      d.setDate(d.getDate() + days);
      return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
    }
    function fmtDate(iso) {
      if (!iso) return "—";
      var p = String(iso).split("-");
      return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : iso;
    }
    function logLine(text, time) {
      return (
        '<p class="hf-etapa__log">' +
        ico("chevron-down", 20) +
        "<span>" +
        text +
        "</span><small>" +
        time +
        "</small></p>"
      );
    }
    function reasonField() {
      return shell.querySelector("[data-pause-reason-field]");
    }
    function reasonValue() {
      var field = reasonField();
      var value = field && field.querySelector(".hf-field__value");
      if (!value || value.classList.contains("hf-field__value--placeholder")) return "";
      return String(value.textContent || "").trim();
    }
    function setReason(text) {
      var field = reasonField();
      if (!field) return;
      var value = field.querySelector(".hf-field__value");
      var filled = !!text;
      if (value) {
        value.textContent = filled ? text : "Selecionar";
        value.classList.toggle("hf-field__value--placeholder", !filled);
      }
      field.querySelectorAll(".hf-select-menu__item").forEach(function (item) {
        var on = filled && item.getAttribute("data-label") === text;
        item.classList.toggle("is-active", on);
        item.setAttribute("aria-selected", on ? "true" : "false");
      });
      field.classList.remove("is-open");
      var trigger = field.querySelector(".hf-field__control");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    }

    function openDialog(mode) {
      state.mode = mode;
      var overlay = shell.querySelector("[data-pause-overlay]");
      var title = shell.querySelector("[data-pause-dialog-title]");
      var confirm = shell.querySelector("[data-pause-confirm]");
      var date = shell.querySelector("[data-pause-date]");
      var detail = shell.querySelector("[data-pause-detail]");
      var err = shell.querySelector("[data-pause-error]");
      if (title) title.textContent = mode === "extend" ? "Estender pausa" : "Pausar operação";
      if (confirm) confirm.textContent = mode === "extend" ? "Salvar nova data" : "Pausar operação";
      setReason(state.reason || "");
      if (date) date.value = state.returnDate || todayPlus(15);
      if (detail) detail.value = state.detail || "";
      if (err) err.hidden = true;
      if (overlay) {
        overlay.hidden = false;
        overlay.classList.add("is-open");
      }
    }

    function closeDialog() {
      var overlay = shell.querySelector("[data-pause-overlay]");
      if (!overlay) return;
      setReason(reasonValue());
      overlay.classList.remove("is-open");
      overlay.hidden = true;
    }

    function samplePaused() {
      state.status = "paused";
      state.reason = "Documento pendente do cliente";
      state.detail = "Cliente aguarda segunda via do RG.";
      state.returnDate = todayPlus(15);
    }

    function scrollToPauseBanner(smooth) {
      if (state.status === "in_progress") {
        var bodyReset = shell.querySelector(".docs-screen__body");
        if (bodyReset) bodyReset.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        return;
      }
      var run = function () {
        var bannerEl = shell.querySelector("[data-pause-banner]");
        var card = bannerEl && bannerEl.querySelector(".hf-match");
        var body = shell.querySelector(".docs-screen__body");
        if (!card || !body) return;
        var top =
          body.scrollTop +
          card.getBoundingClientRect().top -
          body.getBoundingClientRect().top -
          8;
        body.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
      };
      requestAnimationFrame(function () {
        requestAnimationFrame(run);
      });
    }

    function paint(opts) {
      opts = opts || {};
      var badgeHost = shell.querySelector("[data-op-badge]");
      var liveActs = shell.querySelectorAll("[data-op-acts-live]");
      var pausedActs = shell.querySelector("[data-op-acts-paused]");
      var banner = shell.querySelector("[data-pause-banner]");
      var log = shell.querySelector("[data-pause-log]");
      var badgeFn = ui.badge || function (t, text) {
        return '<span class="hf-badge hf-badge--' + t + '">' + text + "</span>";
      };

      shell.classList.toggle("is-paused", state.status === "paused" || state.status === "cadence");
      shell.classList.toggle("is-lost", state.status === "auto_lost");
      shell.querySelectorAll("[data-op-demo]").forEach(function (btn) {
        btn.classList.toggle("is-on", btn.getAttribute("data-op-demo") === state.status);
      });

      if (badgeHost) {
        if (state.status === "paused") {
          badgeHost.hidden = false;
          badgeHost.innerHTML = badgeFn("alert", "Pausado");
        } else if (state.status === "cadence") {
          badgeHost.hidden = false;
          badgeHost.innerHTML = badgeFn("warning", "Pausa vencida");
        } else if (state.status === "auto_lost") {
          badgeHost.hidden = false;
          badgeHost.innerHTML = badgeFn("outline", "Perdido");
        } else {
          badgeHost.hidden = true;
          badgeHost.innerHTML = "";
        }
      }
      liveActs.forEach(function (el) {
        el.hidden = state.status !== "in_progress";
      });
      if (pausedActs) pausedActs.hidden = state.status !== "paused" && state.status !== "cadence";

      if (banner) {
        if (state.status === "paused") {
          banner.innerHTML = matchCard(
            "warning",
            "Operação pausada",
            "Fora das filas de SLA até a data de retorno. O responsável recebe lembrete no Slack.",
            kv("Motivo", state.reason) +
              kv("Retorno previsto", fmtDate(state.returnDate)) +
              kv("Pausado por", "Victor Tavares") +
              (state.detail ? kv("Detalhe", state.detail) : ""),
            "",
            pauseTimeCards(12, "Pausado")
          );
        } else if (state.status === "cadence") {
          banner.innerHTML = matchCard(
            "warning",
            "A data de retorno venceu",
            "Cadência de lembretes no Slack: 2 de 3. Sem ação, a operação vai para Perdido por pausa vencida.",
            kv("Motivo", state.reason) +
              kv("Retorno previsto", fmtDate(state.returnDate)) +
              kv("Último lembrete", "Enviado · D+2") +
              kv("Próximo", "D+4"),
            "",
            pauseTimeCards(19, "Pausa vencida")
          );
        } else if (state.status === "auto_lost") {
          banner.innerHTML = matchCard(
            "error",
            "Perdido por pausa vencida sem retomada",
            "A cadência de lembretes terminou sem ação. Este motivo fica separado da perda real, para não inflar a taxa de Perdido.",
            kv("Motivo original", state.reason) +
              kv("Retorno previsto", fmtDate(state.returnDate)) +
              kv("Encerrado em", "27/08/2026") +
              kv("Responsável", "Victor Tavares"),
            "",
            pauseTimeCards(19, "Encerrado")
          );
        } else {
          banner.innerHTML = "";
        }
      }

      if (log) {
        var html = "";
        if (state.status !== "in_progress") {
          html += logLine(
            "Operação pausada · " + state.reason + " · retorno " + fmtDate(state.returnDate),
            "27/08/2026 10:12"
          );
          html += logLine("Tempo pausado separado do tempo em andamento · não entra no SLA", "27/08/2026 10:12");
        }
        if (state.status === "cadence" || state.status === "auto_lost") {
          html += logLine("Lembrete Slack enviado (D+0) · sem resposta", "11/09/2026 09:00");
          html += logLine("Lembrete Slack enviado (D+2) · sem resposta", "13/09/2026 09:00");
        }
        if (state.status === "auto_lost") {
          html += logLine("Lembrete Slack enviado (D+4) · sem resposta", "15/09/2026 09:00");
          html += logLine("Status alterado para Perdido por pausa vencida sem retomada", "15/09/2026 18:00");
        }
        log.innerHTML = html;
      }

      if (opts.scroll !== false) scrollToPauseBanner(opts.smooth);
    }

    shell.addEventListener("click", function (event) {
      var demo = event.target.closest("[data-op-demo]");
      if (demo && shell.contains(demo)) {
        var which = demo.getAttribute("data-op-demo");
        if (which === "in_progress") {
          state.status = "in_progress";
        } else if (which === "paused") {
          samplePaused();
        } else if (which === "cadence") {
          samplePaused();
          state.status = "cadence";
          state.returnDate = todayPlus(-4);
        } else if (which === "auto_lost") {
          samplePaused();
          state.status = "auto_lost";
          state.returnDate = todayPlus(-10);
        }
        paint({ smooth: true });
        return;
      }
      var act = event.target.closest("[data-op-act]");
      if (!act || !shell.contains(act)) return;
      var whichAct = act.getAttribute("data-op-act");
      if (whichAct === "won") {
        showSuccessToast("Operação marcada como Ganho.");
        return;
      }
      if (whichAct === "lost") {
        showSuccessToast("Operação marcada como Perdido.");
        return;
      }
      if (whichAct === "pause") {
        openDialog("pause");
        return;
      }
      if (whichAct === "extend") {
        openDialog("extend");
        return;
      }
      if (whichAct === "resume") {
        state.status = "in_progress";
        paint({ smooth: true });
        showSuccessToast("Operação retomada. Voltou para Em andamento.");
      }
    });

    var cancel = shell.querySelector("[data-pause-cancel]");
    var confirm = shell.querySelector("[data-pause-confirm]");
    var overlay = shell.querySelector("[data-pause-overlay]");
    if (cancel) cancel.addEventListener("click", closeDialog);
    if (overlay) {
      overlay.addEventListener("click", function (event) {
        if (event.target === overlay) closeDialog();
      });
    }
    if (confirm) {
      confirm.addEventListener("click", function () {
        var date = shell.querySelector("[data-pause-date]");
        var detail = shell.querySelector("[data-pause-detail]");
        var err = shell.querySelector("[data-pause-error]");
        var reasonVal = reasonValue();
        var dateVal = date ? String(date.value || "").trim() : "";
        var detailVal = detail ? String(detail.value || "").trim() : "";
        var needDetail = reasonVal === "Outro";
        if (!reasonVal || !dateVal || (needDetail && !detailVal)) {
          if (err) {
            err.hidden = false;
            err.textContent = needDetail
              ? "Outro exige detalhe em texto livre."
              : "Informe motivo e data de retorno.";
          }
          return;
        }
        state.reason = reasonVal;
        state.returnDate = dateVal;
        state.detail = detailVal;
        state.status = "paused";
        closeDialog();
        paint({ smooth: true });
        showSuccessToast(
          state.mode === "extend"
            ? "Pausa estendida. Cadência de lembretes reiniciada."
            : "Operação pausada. Lembrete agendado no Slack."
        );
      });
    }

    var opQs = (location.hash.split("?")[1] || "");
    var opDemo = opQs.match(/(?:^|&)demo=([^&]+)/);
    if (opDemo) {
      var whichDemo = decodeURIComponent(opDemo[1]);
      if (whichDemo === "paused") samplePaused();
      else if (whichDemo === "cadence") {
        samplePaused();
        state.status = "cadence";
        state.returnDate = todayPlus(-4);
      } else if (whichDemo === "auto_lost") {
        samplePaused();
        state.status = "auto_lost";
        state.returnDate = todayPlus(-10);
      }
    }
    paint({ smooth: false });
  }

  window.HF_SCREENS = {
    bind: function (root) {
      bindOcr(root);
      bindOpen(root);
      bindOpDetail(root);
      if (window.HF_IDENTITY && typeof window.HF_IDENTITY.bind === "function") {
        window.HF_IDENTITY.bind(root);
      }
    },
  };
})();
