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
    "https://www.figma.com/design/6GPvl7jqcGdcwaCCx9kyOI/Dashboard-de-opera%C3%A7%C3%B5es?node-id=2211-6474";
  var FIGMA_KANBAN =
    "https://www.figma.com/design/LQfnfvRTFm2AZ9qwTWsQEk/Nova-opera%C3%A7%C3%A3o?node-id=8501-45420";

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
    var header = label
      ? '<div class="hf-field__header"><span class="hf-field__label">' +
        label +
        "</span></div>"
      : "";
    return (
      '<div class="hf-field hf-field--select' +
      (label ? "" : " hf-field--select-bare") +
      '" data-select data-select-type="default">' +
      header +
      '<button class="hf-field__control" type="button" role="combobox" aria-haspopup="listbox" aria-expanded="false">' +
      '<span class="hf-field__value">' +
      value +
      '</span><span class="hf-field__chevron"><img src="assets/icons/select-chevron.svg" alt=""></span></button>' +
      '<div class="hf-select-menu" role="listbox">' +
      items +
      "</div></div>"
    );
  }

  function dashScreen(opts) {
    opts = opts || {};
    var tour = !!opts.tour;
    var sidebar =
      typeof ui.appSidebar === "function" ? ui.appSidebar("operacoes", "fit collapsed") : "";
    var badge =
      typeof ui.badge === "function"
        ? ui.badge
        : function (type, text) {
            return '<span class="hf-badge hf-badge--' + type + '">' + text + "</span>";
          };

    var crumb =
      '<nav class="hf-crumb">' +
      '<button class="hf-crumb__home" type="button" data-nav-toggle aria-expanded="false" aria-label="Expandir menu">' +
      ico("panel-left", 20) +
      "</button>" +
      '<span class="hf-crumb__div"></span>' +
      "<span>Dashboard</span>" +
      (tour
        ? '<span class="hf-crumb__chev">' +
          ico("chevron-right", 16) +
          "</span><span>Tour guiado</span>"
        : "") +
      "</nav>";

    var header =
      "<header>" +
      '<h1 class="docs-dash-title">' +
      (tour ? "Tour do Dashboard" : "Dashboard") +
      "</h1>" +
      '<p class="docs-dash-sub">' +
      (tour
        ? "Percorra cada card e gráfico da primeira tela e veja o que fazer com cada um"
        : "Visão estratégica da plataforma Hubfi") +
      "</p></header>";

    function filterChip(label) {
      return (
        '<button class="docs-dash-fchip" type="button">' +
        label +
        '<span class="docs-dash-fchip__x" aria-hidden="true"><img src="assets/icons/chip-x.svg" width="10" height="10" alt=""></span></button>'
      );
    }

    var toolbar =
      '<div class="docs-dash-toolbar" data-tour="tabs">' +
      '<div class="hf-tabs" data-dash-tabs>' +
      '<button class="hf-tab is-active" type="button" data-dash-tab="operacoes">Operações</button>' +
      '<button class="hf-tab" type="button" data-dash-tab="safra">Safra</button>' +
      '<button class="hf-tab" type="button" data-dash-tab="empresas">Empresas</button>' +
      '<button class="hf-tab" type="button" data-dash-tab="produtos">Produtos</button>' +
      '<button class="hf-tab" type="button" data-dash-tab="usuarios">Usuários</button></div>' +
      '<button class="hf-btn hf-btn--lg hf-btn--ghost docs-dash-filter-btn" type="button">' +
      ico("list-filter", 20) +
      "Filtros</button></div>";

    var filters =
      '<div class="docs-dash-chips" data-tour="filters">' +
      '<span class="docs-dash-chips__label">Filtros</span>' +
      filterChip("Mesa: Financiamento") +
      filterChip("Produto: Financiamento") +
      filterChip("Empresa: Financiamento") +
      filterChip("Período: Financiamento") +
      filterChip("Operador: Financiamento") +
      filterChip("Usuário: Financiamento") +
      "</div>";

    function kpiSub(icon, text) {
      return (
        '<span class="docs-dash-kpi__sub">' +
        ico(icon, 16) +
        text +
        "</span>"
      );
    }

    function kpi(optsKpi) {
      var info = optsKpi.info
        ? '<span class="docs-dash-kpi__info">' + ico("info", 20) + "</span>"
        : "";
      return (
        '<article class="docs-dash-kpi"' +
        (optsKpi.tourId ? ' data-tour="' + optsKpi.tourId + '"' : "") +
        ">" +
        '<div class="docs-dash-kpi__head">' +
        '<span class="docs-dash-kpi__chip' +
        (optsKpi.chip ? " docs-dash-kpi__chip--" + optsKpi.chip : "") +
        '">' +
        ico(optsKpi.icon, 20) +
        "</span>" +
        '<span class="docs-dash-kpi__label">' +
        optsKpi.label +
        "</span>" +
        info +
        "</div>" +
        '<div class="docs-dash-kpi__body"><p class="docs-dash-kpi__value">' +
        optsKpi.value +
        "</p>" +
        '<div class="docs-dash-kpi__subs">' +
        optsKpi.subs +
        "</div></div>" +
        '<div class="docs-dash-kpi__foot"><span>Ticket médio</span><b>' +
        optsKpi.ticket +
        "</b></div></article>"
      );
    }

    var kpis =
      '<div class="docs-dash-kpis">' +
      kpi({
        icon: "banknote-arrow-up",
        label: "Pipeline originada",
        info: true,
        value: "R$ 1.000,00",
        ticket: "R$ 14.800",
        subs: kpiSub("layers", "317"),
        tourId: "kpi-originado",
      }) +
      kpi({
        icon: "refresh-ccw",
        chip: "info",
        label: "Pipeline ativa",
        info: true,
        value: "R$ 11,2M",
        ticket: "R$ 14.800",
        subs:
          kpiSub("layers", "10") +
          kpiSub("git-compare-arrows", "350") +
          kpiSub("circle-pause", "84 (R$ 1,1M)"),
        tourId: "kpi-ativo",
      }) +
      kpi({
        icon: "circle-check",
        chip: "ok",
        label: "Pipeline ganha",
        value: "R$ 5,4M",
        ticket: "R$ 14.800",
        subs: kpiSub("layers", "317"),
        tourId: "kpi-ganho",
      }) +
      kpi({
        icon: "circle-x",
        chip: "err",
        label: "Pipeline perdido",
        value: "R$ 1,8M",
        ticket: "R$ 14.800",
        subs: kpiSub("layers", "131"),
        tourId: "kpi-perdido",
      }) +
      "</div>";

    function tipAsset(name, w, h) {
      return (
        '<img src="assets/screen/dash/tip/' +
        name +
        '.svg" width="' +
        w +
        '" height="' +
        h +
        '" alt="">'
      );
    }

    function funnelTipStatus(dot, count, label, value) {
      return (
        '<div class="docs-dash-ftip__row"><span class="docs-dash-ftip__info">' +
        tipAsset(dot, 8, 8) +
        "<span><b>" +
        count +
        "</b> <em>" +
        label +
        '</em></span></span><span class="docs-dash-ftip__val">' +
        value +
        "</span></div>"
      );
    }

    var funnelTip =
      '<aside class="docs-dash-ftip" data-funnel-tip hidden>' +
      '<div class="docs-dash-ftip__head"><strong data-ftip-title>Documentação das Partes</strong>' +
      '<span class="docs-dash-ftip__badge" data-ftip-badge>Gargalo</span></div>' +
      '<div class="docs-dash-ftip__callout">' +
      tipAsset("info", 16, 16) +
      '<p data-ftip-note>Entra em gargalo quando 50% das operações nesta fase estão em Atenção ou Crítica.</p></div>' +
      '<hr class="docs-dash-ftip__div">' +
      '<div class="docs-dash-ftip__stats"><b data-ftip-ops>32 operações</b><b data-ftip-vol>R$ 10,8M</b></div>' +
      '<div class="docs-dash-ftip__breakdown" data-ftip-rows>' +
      funnelTipStatus("dot-ok", "20", "No prazo", "R$ 10,8M") +
      funnelTipStatus("dot-warn", "10", "Atenção", "R$ 10,8M") +
      funnelTipStatus("dot-crit", "2", "Crítica", "R$ 10,8M") +
      "</div>" +
      '<button class="docs-dash-ftip__btn" type="button">Ver todas' +
      tipAsset("chevron", 16, 16) +
      "</button></aside>";

    function bar(optsBar) {
      var alert = optsBar.kind === "warn" || optsBar.kind === "crit";
      return (
        '<button class="docs-dash-bar' +
        (optsBar.kind ? " docs-dash-bar--" + optsBar.kind : "") +
        (optsBar.gargalo ? " is-gargalo" : "") +
        '" type="button" data-funnel-bar' +
        (optsBar.gargalo ? ' data-tour="funil-gargalo"' : "") +
        ' data-stage="' +
        optsBar.label +
        '" data-ops="' +
        optsBar.count +
        '" data-vol="' +
        (optsBar.vol || "R$ 10,8M") +
        '"' +
        (optsBar.gargalo ? ' data-gargalo="1"' : "") +
        ' aria-label="' +
        optsBar.label +
        '">' +
        '<span class="docs-dash-bar__n">' +
        (alert ? ico("triangle-alert", 16) : "") +
        optsBar.count +
        "</span>" +
        '<span class="docs-dash-bar__fill" style="height:' +
        optsBar.height +
        'px"></span></button>'
      );
    }

    var funnelStages = [
      { label: "Coleta de Dados", count: "19", height: 59, kind: "", vol: "R$ 4,2M" },
      { label: "Análise de Crédito", count: "30", height: 118, kind: "warn", vol: "R$ 8,1M" },
      { label: "Doc. das Partes", count: "32", height: 209, kind: "crit", vol: "R$ 10,8M", gargalo: true },
      { label: "Análise Jurídica", count: "20", height: 76, kind: "warn", vol: "R$ 6,4M" },
      { label: "Proposta", count: "15", height: 52, kind: "", vol: "R$ 5,1M" },
      { label: "Formalização", count: "10", height: 32, kind: "pale", vol: "R$ 3,2M" },
      { label: "Assinatura", count: "7", height: 20, kind: "pale", vol: "R$ 2,1M" },
      { label: "Finalizado", count: "3", height: 9, kind: "pale", vol: "R$ 0,9M" },
    ];

    var funnel =
      '<section class="docs-dash-card docs-dash-card--funnel" data-tour="funil" data-funnel-root>' +
      '<div class="docs-dash-funnel__head">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">Funil de etapas</h2>' +
      '<p class="docs-dash-card__hint">Confira quantas operações estão por etapa. Passe o mouse nas barras para ver SLA e gargalo.</p></div>' +
      '<div class="docs-dash-legend">' +
      '<span class="docs-dash-legend__item"><span class="docs-dash-legend__ico docs-dash-legend__ico--crit">' +
      ico("triangle-alert", 14) +
      '</span><b>32</b> Crítica</span>' +
      '<span class="docs-dash-legend__item"><span class="docs-dash-legend__ico docs-dash-legend__ico--warn">' +
      ico("triangle-alert", 14) +
      '</span><b>50</b> Atenção</span>' +
      '<span class="docs-dash-legend__item"><span class="docs-dash-legend__ico docs-dash-legend__ico--ok">' +
      ico("check", 14) +
      "</span><b>65</b> Dentro do prazo</span>" +
      "</div></div>" +
      '<div class="docs-dash-funnel__plot">' +
      '<div class="docs-dash-bars">' +
      funnelStages
        .map(function (s) {
          return bar(s);
        })
        .join("") +
      "</div>" +
      funnelTip +
      "</div>" +
      '<div class="docs-dash-axis">' +
      funnelStages
        .map(function (s) {
          return "<span>" + s.label + "</span>";
        })
        .join("") +
      "</div></section>";

    function convRow(stage, fill, ops, conv, convType, rel, vol, time, timeMod) {
      return (
        "<tr><td><div class=\"docs-dash-stage\"><span>" +
        stage +
        '</span><span class="docs-dash-track"><span style="width:' +
        fill +
        '%"></span></span></div></td>' +
        '<td class="is-num">' +
        ops +
        '</td><td class="is-center">' +
        badge(convType, conv) +
        '</td><td class="is-center' +
        (rel === "—" ? " is-muted" : "") +
        '">' +
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
      '<section class="docs-dash-card docs-dash-card--table" data-tour="conversao">' +
      '<div class="docs-dash-card__head">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title docs-dash-card__title--lg">Conversão entre etapas</h2>' +
      '<p class="docs-dash-card__hint docs-dash-card__hint--sm">Contagem, conversão e volume por etapa</p></div>' +
      '<span class="docs-dash-kpi__info">' +
      ico("info", 16) +
      "</span></div>" +
      '<table class="docs-dash-table"><thead><tr>' +
      "<th>Etapa</th><th>Operações</th><th class=\"is-center\">Conversão</th><th class=\"is-center\">% Relativa</th><th>Volume</th><th>Tempo médio</th>" +
      "</tr></thead><tbody>" +
      convRow("Coleta de dados", 100, "1.240", "100%", "success", "—", "R$ 18,4M", "13 dias", "err") +
      convRow("Análise de crédito", 78, "968", "78%", "success", "22%", "R$ 14,1M", "4 dias", "warn") +
      convRow("Documentação das partes", 52, "645", "52%", "secondary", "24%", "R$ 9,3M", "4 dias", "warn") +
      convRow("Proposta enviada", 31, "384", "31%", "secondary", "21%", "R$ 5,4M", "3 dias", "warn") +
      convRow("Fechamento", 12, "149", "12%", "secondary", "19%", "R$ 2,1M", "2 dias", "info") +
      "</tbody></table></section>";

    function ringStat(color, label, value) {
      return (
        '<div class="docs-dash-ring-stat"><span class="docs-dash-dot" style="background:' +
        color +
        '"></span><span>' +
        label +
        "</span><b>" +
        value +
        "</b></div>"
      );
    }

    function ringCard(title, pct, color, rows) {
      return (
        '<div class="docs-dash-ring-card">' +
        '<div class="docs-dash-ring" style="--p:' +
        pct +
        ";--c:" +
        color +
        '"><strong>' +
        pct +
        "%</strong></div>" +
        '<div class="docs-dash-ring-meta"><p>' +
        title +
        "</p>" +
        rows +
        "</div></div>"
      );
    }

    var resolucao =
      '<section class="docs-dash-card docs-dash-resolucao" data-tour="resolucao">' +
      '<div class="docs-dash-card__head">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">Conversão e resolução</h2>' +
      '<p class="docs-dash-card__hint">Período selecionado</p></div>' +
      '<span class="docs-dash-kpi__info">' +
      ico("info", 16) +
      "</span></div>" +
      ringCard(
        "Conversão",
        "30",
        "#00a395",
        ringStat("#00a395", "Ganhas", "372") +
          ringStat("#5e8fe8", "Ativas no período", "1.240")
      ) +
      ringCard(
        "Resolução",
        "40",
        "#5e8fe8",
        ringStat("#00a395", "Ganhas", "372") +
          ringStat("#de3535", "Perdidas", "124") +
          ringStat("#5e8fe8", "Ativas no período", "1.240")
      ) +
      "</section>";

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

    function ghostBtn(label, iconLeft, iconRight) {
      return (
        '<button class="hf-btn hf-btn--sm hf-btn--ghost" type="button">' +
        (iconLeft ? ico(iconLeft, 16) : "") +
        label +
        (iconRight ? ico(iconRight, 16) : "") +
        "</button>"
      );
    }

    var perda =
      '<section class="docs-dash-card docs-dash-card--chart" data-tour="perda">' +
      '<div class="docs-dash-card__head">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">Motivos de perda</h2>' +
      '<p class="docs-dash-card__hint">Top 5 sobre o total de perdidas no período</p></div>' +
      dashSelect("", "Distribuição por quantidade", [
        "Distribuição por quantidade",
        "Distribuição por volume",
      ]) +
      "</div>" +
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
      "</div></div>" +
      '<div class="docs-dash-card__acts">' +
      ghostBtn("Por etapas", "layers") +
      ghostBtn("Ver todos", "", "chevron-right") +
      "</div></section>";

    var helpChrome =
      '<div class="hf-tour' +
      (tour ? "" : " is-explain") +
      '" data-tour-root' +
      (tour ? "" : " hidden") +
      ' aria-live="polite">' +
      '<div class="hf-tour__mask" data-tour-mask></div>' +
      '<div class="hf-tour__spot" data-tour-spot hidden></div>' +
      '<div class="hf-tour__tip' +
      (tour ? "" : " is-explain") +
      '" data-tour-tip hidden>' +
      '<div class="hf-tour__tip-head"><span class="hf-tour__step" data-tour-step>' +
      (tour ? "1 / 10" : "Ajuda") +
      "</span>" +
      (tour
        ? '<button class="hf-tour__skip" type="button" data-tour-skip>Fechar</button>'
        : "") +
      "</div>" +
      '<strong class="hf-tour__title" data-tour-title></strong>' +
      '<p class="hf-tour__body" data-tour-body></p>' +
      '<div class="hf-tour__actions">' +
      (tour
        ? '<button class="hf-btn hf-btn--ghost hf-btn--sm" type="button" data-tour-prev>Voltar</button>' +
          '<button class="hf-btn hf-btn--ghost hf-btn--sm" type="button" data-tour-close>Fechar tour</button>' +
          '<button class="hf-btn hf-btn--primary hf-btn--sm" type="button" data-tour-next>Próximo</button>'
        : '<button class="hf-btn hf-btn--primary hf-btn--sm" type="button" data-tour-close>Fechar</button>') +
      "</div></div></div>";

    function tabKpi(label, value) {
      return (
        '<div class="docs-dash-tab-kpi"><span>' +
        label +
        "</span><b>" +
        value +
        "</b></div>"
      );
    }

    function tabRankRow(color, name, ops, conv, vol, barPct) {
      return (
        "<tr><td><span class=\"docs-dash-tab-name\"><span class=\"docs-dash-tab-dot\" style=\"background:" +
        color +
        '"></span>' +
        name +
        '</span><span class="docs-dash-tab-bar"><span style="width:' +
        barPct +
        "%;background:" +
        color +
        '"></span></span></td>' +
        '<td class="is-num">' +
        ops +
        '</td><td class="is-center">' +
        badge("success", conv) +
        '</td><td class="is-right">' +
        vol +
        "</td></tr>"
      );
    }

    function tabRankCard(title, hint, rowsHtml) {
      return (
        '<section class="docs-dash-tab-card">' +
        '<div class="docs-dash-tab-card__head"><div><h2 class="docs-dash-tab-card__title">' +
        title +
        '</h2><p class="docs-dash-tab-card__hint">' +
        hint +
        "</p></div>" +
        '<span class="docs-dash-kpi__info">' +
        ico("info", 16) +
        "</span></div>" +
        '<table class="docs-dash-tab-table"><thead><tr>' +
        "<th>Nome</th><th class=\"is-num\">Operações</th><th class=\"is-center\">Conversão</th><th class=\"is-right\">Volume</th>" +
        "</tr></thead><tbody>" +
        rowsHtml +
        "</tbody></table>" +
        '<div class="docs-dash-card__acts">' +
        ghostBtn("Ver todos", "", "chevron-right") +
        "</div></section>"
      );
    }

    function tabEntityTable(title, hint, headers, rows) {
      return (
        '<section class="docs-dash-tab-card">' +
        '<div class="docs-dash-tab-card__head"><div><h2 class="docs-dash-tab-card__title">' +
        title +
        '</h2><p class="docs-dash-tab-card__hint">' +
        hint +
        "</p></div>" +
        '<span class="docs-dash-kpi__info">' +
        ico("info", 16) +
        "</span></div>" +
        '<table class="docs-dash-tab-table"><thead><tr>' +
        headers +
        "</tr></thead><tbody>" +
        rows +
        "</tbody></table>" +
        '<div class="docs-dash-card__acts">' +
        ghostBtn("Ver todos", "", "chevron-right") +
        "</div></section>"
      );
    }

    var panelSafra =
      '<div class="docs-dash-tab-kpis">' +
      tabKpi("Volume originado", "R$ 42,8M") +
      tabKpi("Ticket médio", "R$ 14.800") +
      tabKpi("Operações", "2.890") +
      tabKpi("Conversão média", "28%") +
      "</div>" +
      tabRankCard(
        "Ranking por mesa",
        "Performance da safra agrupada por mesa",
        tabRankRow("#00a395", "Financiamento", "1.240", "32%", "R$ 18,4M", 100) +
          tabRankRow("#3b82f6", "Consórcio", "860", "27%", "R$ 12,1M", 69) +
          tabRankRow("#8b5cf6", "Crédito PJ", "520", "24%", "R$ 7,8M", 42) +
          tabRankRow("#f59e0b", "Seguros", "270", "19%", "R$ 4,5M", 22)
      ) +
      tabRankCard(
        "Ranking por produto",
        "Comparativo de produtos na safra selecionada",
        tabRankRow("#00a395", "Home Equity", "980", "34%", "R$ 15,2M", 100) +
          tabRankRow("#3b82f6", "Financiamento Imobiliário", "720", "29%", "R$ 11,4M", 73) +
          tabRankRow("#8b5cf6", "Capital de Giro", "410", "22%", "R$ 6,1M", 42) +
          tabRankRow("#f59e0b", "CDC", "190", "18%", "R$ 2,9M", 19)
      ) +
      tabRankCard(
        "Ranking por empresa",
        "Empresas com maior volume na safra",
        tabRankRow("#00a395", "Hub de Crédito Techfinance", "500", "35%", "R$ 8,4M", 100) +
          tabRankRow("#3b82f6", "Vitta Empreendimentos", "310", "28%", "R$ 5,1M", 62) +
          tabRankRow("#8b5cf6", "Personal Finance", "210", "24%", "R$ 3,4M", 42) +
          tabRankRow("#f59e0b", "Interno Hubfi", "90", "20%", "R$ 1,2M", 18)
      );

    var panelEmpresas = tabEntityTable(
      "Ranking de empresas",
      "Volume, conversão e SLA por empresa no período",
      "<th>Empresa</th><th class=\"is-num\">Operações</th><th class=\"is-center\">Conversão</th><th class=\"is-num\">Ativas</th><th class=\"is-right\">Volume</th><th class=\"is-center\">SLA</th>",
      "<tr><td>Hub de Crédito Techfinance</td><td class=\"is-num\">500</td><td class=\"is-center\">" +
        badge("success", "35%") +
        '</td><td class="is-num">112</td><td class="is-right">R$ 12,1M</td><td class="is-center">' +
        badge("alert", "Atenção") +
        "</td></tr>" +
        "<tr><td>Vitta Empreendimentos</td><td class=\"is-num\">210</td><td class=\"is-center\">" +
        badge("success", "28%") +
        '</td><td class="is-num">48</td><td class="is-right">R$ 1,51M</td><td class="is-center">' +
        badge("success", "No prazo") +
        "</td></tr>" +
        "<tr><td>Personal Finance</td><td class=\"is-num\">110</td><td class=\"is-center\">" +
        badge("secondary", "24%") +
        '</td><td class="is-num">31</td><td class="is-right">R$ 1,1M</td><td class="is-center">' +
        badge("alert", "Crítica") +
        "</td></tr>" +
        "<tr><td>Interno Hubfi</td><td class=\"is-num\">50</td><td class=\"is-center\">" +
        badge("secondary", "20%") +
        '</td><td class="is-num">12</td><td class="is-right">R$ 0,9M</td><td class="is-center">' +
        badge("success", "No prazo") +
        "</td></tr>"
    );

    var panelProdutos = tabEntityTable(
      "Ranking de produtos",
      "Conversão e volume por produto no período",
      "<th>Produto</th><th class=\"is-num\">Operações</th><th class=\"is-center\">Conversão</th><th class=\"is-right\">Volume</th><th class=\"is-center\">Ticket médio</th>",
      "<tr><td>Home Equity</td><td class=\"is-num\">980</td><td class=\"is-center\">" +
        badge("success", "34%") +
        '</td><td class="is-right">R$ 15,2M</td><td class="is-center">R$ 15.500</td></tr>' +
        "<tr><td>Financiamento Imobiliário</td><td class=\"is-num\">720</td><td class=\"is-center\">" +
        badge("success", "29%") +
        '</td><td class="is-right">R$ 11,4M</td><td class="is-center">R$ 15.800</td></tr>' +
        "<tr><td>Capital de Giro</td><td class=\"is-num\">410</td><td class=\"is-center\">" +
        badge("secondary", "22%") +
        '</td><td class="is-right">R$ 6,1M</td><td class="is-center">R$ 14.900</td></tr>' +
        "<tr><td>CDC</td><td class=\"is-num\">190</td><td class=\"is-center\">" +
        badge("secondary", "18%") +
        '</td><td class="is-right">R$ 2,9M</td><td class="is-center">R$ 15.200</td></tr>'
    );

    var panelUsuarios = tabEntityTable(
      "Ranking de usuários",
      "Originação e pipeline aberto por usuário",
      "<th>Usuário</th><th>Empresa</th><th class=\"is-num\">Originadas</th><th class=\"is-num\">Ativas</th><th class=\"is-right\">Volume ativo</th><th class=\"is-center\">Conversão</th>",
      "<tr><td>Ana Souza</td><td>Hub de Crédito Techfinance</td><td class=\"is-num\">84</td><td class=\"is-num\">22</td><td class=\"is-right\">R$ 3,2M</td><td class=\"is-center\">" +
        badge("success", "36%") +
        "</td></tr>" +
        "<tr><td>Bruno Lima</td><td>Vitta Empreendimentos</td><td class=\"is-num\">61</td><td class=\"is-num\">18</td><td class=\"is-right\">R$ 1,8M</td><td class=\"is-center\">" +
        badge("success", "29%") +
        "</td></tr>" +
        "<tr><td>Carla Mendes</td><td>Personal Finance</td><td class=\"is-num\">44</td><td class=\"is-num\">12</td><td class=\"is-right\">R$ 1,1M</td><td class=\"is-center\">" +
        badge("secondary", "24%") +
        "</td></tr>" +
        "<tr><td>Diego Alves</td><td>Interno Hubfi</td><td class=\"is-num\">28</td><td class=\"is-num\">9</td><td class=\"is-right\">R$ 0,7M</td><td class=\"is-center\">" +
        badge("secondary", "21%") +
        "</td></tr>"
    );

    var bodyTop =
      toolbar +
      '<div class="docs-dash-panels">' +
      '<div class="docs-dash-panel is-active" data-dash-panel="operacoes">' +
      filters +
      kpis +
      funnel +
      '<div class="docs-dash-split">' +
      conversion +
      resolucao +
      "</div></div>" +
      '<div class="docs-dash-panel" data-dash-panel="safra">' +
      panelSafra +
      "</div>" +
      '<div class="docs-dash-panel" data-dash-panel="empresas">' +
      panelEmpresas +
      "</div>" +
      '<div class="docs-dash-panel" data-dash-panel="produtos">' +
      panelProdutos +
      "</div>" +
      '<div class="docs-dash-panel" data-dash-panel="usuarios">' +
      panelUsuarios +
      "</div></div>";

    if (tour) {
      return (
        '<div class="docs-screen docs-screen--dash docs-screen--tour" data-dash-tour data-dash-root data-dash-help="tour">' +
        sidebar +
        '<div class="docs-screen__main">' +
        '<div class="docs-screen__top">' +
        crumb +
        header +
        "</div>" +
        '<div class="docs-screen__body">' +
        bodyTop +
        "</div></div>" +
        helpChrome +
        "</div>"
      );
    }

    function probItem(count, badgeType, badgeText) {
      return (
        '<div class="docs-dash-prob__item">' +
        '<div class="docs-dash-prob__top"><span><b>' +
        count +
        "</b> Operações</span>" +
        badge(badgeType, badgeText) +
        "</div></div>"
      );
    }

    var probabilidade =
      '<section class="docs-dash-card docs-dash-card--chart" data-tour="probabilidade">' +
      '<div class="docs-dash-card__head">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">Probabilidade de fechamento</h2>' +
      '<p class="docs-dash-card__hint">Clique numa faixa para ver as operações · distribuição sem ponderação</p></div>' +
      '<span class="docs-dash-kpi__info">' +
      ico("info", 16) +
      "</span></div>" +
      '<div class="docs-dash-chart">' +
      pieChart(
        "",
        pieSeg("prob-1.svg", 0.28, 84.2, 66.56, 49.8) +
          pieSeg("prob-2.svg", 46.12, 81.56, 82.44, 117.82) +
          pieSeg("prob-3.svg", 0.28, 0, 79.8, 163.12),
        "<strong>1.240</strong><span>operações</span>"
      ) +
      '<div class="docs-dash-prob">' +
      probItem("321", "success", "Alta") +
      probItem("221", "alert", "Média") +
      probItem("121", "warning", "Baixa") +
      "</div></div></section>";

    function userStat(icon, chip, value, valueMod, label) {
      return (
        '<div class="docs-dash-ustat">' +
        '<span class="docs-dash-ustat__ico' +
        (chip ? " docs-dash-ustat__ico--" + chip : "") +
        '">' +
        ico(icon, 16) +
        "</span>" +
        '<div><b class="' +
        (valueMod || "") +
        '">' +
        value +
        "</b><span>" +
        label +
        "</span></div></div>"
      );
    }

    function rankRow(pct, color, name, leftIco, left, rightIco, right) {
      return (
        '<div class="docs-dash-rank">' +
        '<div class="docs-dash-rank__row"><b style="color:' +
        color +
        '">' +
        pct +
        "%</b><span class=\"docs-dash-rank__name\">" +
        name +
        '</span><span class="docs-dash-rank__meta"><span>' +
        ico(leftIco, 16) +
        left +
        "</span><span>" +
        ico(rightIco, 16) +
        right +
        '</span></span></div><span class="docs-dash-rank__track"><span style="width:' +
        pct +
        "%;background:linear-gradient(90deg," +
        color +
        "," +
        color +
        ')"></span></span></div>'
      );
    }

    var usuarios =
      '<section class="docs-dash-card" data-tour="usuarios-origem">' +
      '<div class="docs-dash-card__head">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">Usuários que originaram operações</h2>' +
      '<p class="docs-dash-card__hint">No período selecionado, com detalhamento por empresa</p></div>' +
      '<span class="docs-dash-kpi__info">' +
      ico("info", 16) +
      "</span></div>" +
      '<div class="docs-dash-ustats">' +
      userStat("layers", "", "100", "", "Usuários") +
      userStat("layers", "info", "1.240", "is-info", "operações originadas") +
      userStat("trending-up", "ok", "4,0", "is-ok", "média de originação por usuário") +
      "</div>" +
      '<div class="docs-dash-ranks">' +
      rankRow("75", "#00a395", "Hub de Crédito Techfinance", "users", "75 Usuários", "layers", "500 Ops") +
      rankRow("45", "#3b82f6", "Vitta Empreendimentos", "users", "48 Usuários", "layers", "210 Ops") +
      rankRow("31", "#8b5cf6", "Personal Finance", "users", "31 Usuários", "layers", "110 Ops") +
      rankRow("20", "#f59e0b", "Interno Hubfi", "users", "12 Usuários", "layers", "50 Ops") +
      "</div>" +
      '<div class="docs-dash-card__acts">' +
      ghostBtn("Ver todos", "", "chevron-right") +
      "</div></section>";

    var pipelineUsers =
      '<section class="docs-dash-card" data-tour="usuarios-pipeline">' +
      '<div class="docs-dash-card__head">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title">Usuários com pipeline em aberto</h2>' +
      '<p class="docs-dash-card__hint">Têm ao menos uma operação ativa no período, por empresa</p></div>' +
      '<span class="docs-dash-kpi__info">' +
      ico("info", 16) +
      "</span></div>" +
      '<div class="docs-dash-ustats">' +
      userStat("user-plus", "", "312", "", "Usuários que originam") +
      userStat("users", "info", "760", "is-info", "Usuários ativos na base") +
      userStat("trending-up", "ok", "63%", "is-ok", "dos usuários ativos têm pipeline aberto") +
      "</div>" +
      '<div class="docs-dash-ranks">' +
      rankRow("75", "#00a395", "Hub de Crédito Techfinance", "users", "112 Usuários", "banknote-arrow-up", "R$ 12,1M") +
      rankRow("45", "#3b82f6", "Vitta Empreendimentos", "users", "48 Usuários", "banknote-arrow-up", "R$ 1,51M") +
      rankRow("31", "#8b5cf6", "Personal Finance", "users", "31 Usuários", "banknote-arrow-up", "R$ 1,1M") +
      rankRow("20", "#f59e0b", "Interno Hubfi", "users", "12 Usuários", "banknote-arrow-up", "R$ 0,9M") +
      "</div>" +
      '<div class="docs-dash-card__acts">' +
      ghostBtn("Ver todos", "", "chevron-right") +
      "</div></section>";

    function formRow(stage, fill, fillMod, total, conv, convType) {
      return (
        "<tr><td>" +
        stage +
        '</td><td><span class="docs-dash-track docs-dash-track--form"><span class="' +
        fillMod +
        '" style="width:' +
        fill +
        '%"></span></span></td>' +
        '<td class="is-num">' +
        total +
        '</td><td class="is-center">' +
        badge(convType, conv) +
        "</td></tr>"
      );
    }

    var formFunnel =
      '<section class="docs-dash-card docs-dash-card--table docs-dash-formfunnel" data-tour="form-funnel">' +
      '<div class="docs-dash-card__head">' +
      '<div class="docs-dash-card__copy"><h2 class="docs-dash-card__title docs-dash-card__title--lg">Funil de formulário</h2>' +
      '<p class="docs-dash-card__hint docs-dash-card__hint--sm">Texto de apoio</p></div>' +
      dashSelect("", "Selecione o formulário", [
        "Selecione o formulário",
        "Dados do comprador",
        "Documentação das partes",
      ]) +
      "</div>" +
      '<table class="docs-dash-table docs-dash-table--form"><thead><tr>' +
      "<th>Etapa</th><th></th><th>Total</th><th class=\"is-center\">Conversão</th>" +
      "</tr></thead><tbody>" +
      formRow("Enviados", 100, "", "200", "100%", "success") +
      formRow("Respondido parcial", 62, "is-warn", "100", "62%", "alert") +
      formRow("Concluídos", 48, "", "90", "48%", "success") +
      "</tbody></table></section>";

    return (
      '<div class="docs-screen docs-screen--dash docs-screen--tour" data-dash-root data-dash-help="click">' +
      sidebar +
      '<div class="docs-screen__main">' +
      '<div class="docs-screen__top">' +
      crumb +
      header +
      "</div>" +
      '<div class="docs-screen__body">' +
      toolbar +
      '<div class="docs-dash-panels">' +
      '<div class="docs-dash-panel is-active" data-dash-panel="operacoes">' +
      filters +
      kpis +
      funnel +
      '<div class="docs-dash-split">' +
      conversion +
      resolucao +
      "</div>" +
      '<div class="docs-dash-split docs-dash-split--eq">' +
      perda +
      probabilidade +
      "</div>" +
      '<div class="docs-dash-split docs-dash-split--eq">' +
      usuarios +
      pipelineUsers +
      "</div>" +
      '<div class="docs-dash-split docs-dash-split--eq">' +
      formFunnel +
      "</div></div>" +
      '<div class="docs-dash-panel" data-dash-panel="safra">' +
      panelSafra +
      "</div>" +
      '<div class="docs-dash-panel" data-dash-panel="empresas">' +
      panelEmpresas +
      "</div>" +
      '<div class="docs-dash-panel" data-dash-panel="produtos">' +
      panelProdutos +
      "</div>" +
      '<div class="docs-dash-panel" data-dash-panel="usuarios">' +
      panelUsuarios +
      "</div></div></div></div>" +
      helpChrome +
      "</div>"
    );
  }

  function wikiProto(path) {
    return "ds.html?from=wiki#/" + String(path || "").replace(/^\//, "");
  }

  function wikiNavItem(id, label, icon, active) {
    return (
      '<button class="hf-wiki__nav-item' +
      (active ? " is-active" : "") +
      '" type="button" data-wiki-nav="' +
      id +
      '">' +
      '<span class="hf-wiki__nav-ico" aria-hidden="true">' +
      ico(icon || "book-open", 18) +
      "</span>" +
      '<span class="hf-wiki__nav-text">' +
      label +
      "</span></button>"
    );
  }

  function wikiNavGroup(label, items) {
    return (
      '<div class="hf-wiki__nav-group"><p class="hf-wiki__nav-label">' +
      label +
      "</p>" +
      items.join("") +
      "</div>"
    );
  }

  function wikiDuoSvg(kind) {
    var dark = "#0A7165";
    var light = "#3DB29C";
    var paths = {
      dashboard:
        '<rect x="3" y="3" width="8" height="8" rx="1.5" stroke="' +
        dark +
        '" stroke-width="1.7"></rect>' +
        '<rect x="13" y="3" width="8" height="5" rx="1.5" stroke="' +
        dark +
        '" stroke-width="1.7"></rect>' +
        '<rect x="13" y="10" width="8" height="11" rx="1.5" stroke="' +
        dark +
        '" stroke-width="1.7"></rect>' +
        '<rect x="3" y="13" width="8" height="8" rx="1.5" stroke="' +
        light +
        '" stroke-width="1.7"></rect>' +
        '<circle cx="17" cy="5.5" fill="' +
        light +
        '" r="1.4"></circle>',
      kanban:
        '<rect x="3" y="4" width="5" height="16" rx="1.5" stroke="' +
        dark +
        '" stroke-width="1.7"></rect>' +
        '<rect x="9.5" y="4" width="5" height="11" rx="1.5" stroke="' +
        dark +
        '" stroke-width="1.7"></rect>' +
        '<rect x="16" y="4" width="5" height="14" rx="1.5" stroke="' +
        light +
        '" stroke-width="1.7"></rect>' +
        '<circle cx="18.5" cy="8" fill="' +
        light +
        '" r="1.3"></circle>',
      pause:
        '<circle cx="12" cy="12" r="9" stroke="' +
        dark +
        '" stroke-width="1.7"></circle>' +
        '<path d="M10 8.5v7M14 8.5v7" stroke="' +
        light +
        '" stroke-width="1.9" stroke-linecap="round"></path>',
      compass:
        '<circle cx="12" cy="12" r="9" stroke="' +
        dark +
        '" stroke-width="1.7"></circle>' +
        '<path d="M14.5 9.5 10 14l4.5-1.2L16 9.5z" stroke="' +
        light +
        '" stroke-width="1.6" stroke-linejoin="round"></path>',
      chart:
        '<path d="M4 19V5M4 19h16" stroke="' +
        dark +
        '" stroke-width="1.7" stroke-linecap="round"></path>' +
        '<path d="M8 15l3.5-4 3 2.5L18 8" stroke="' +
        light +
        '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>' +
        '<circle cx="18" cy="8" fill="' +
        light +
        '" r="1.5"></circle>',
      plus:
        '<circle cx="12" cy="12" r="9" stroke="' +
        dark +
        '" stroke-width="1.7"></circle>' +
        '<path d="M12 8v8M8 12h8" stroke="' +
        light +
        '" stroke-width="1.8" stroke-linecap="round"></path>',
      user:
        '<circle cx="12" cy="8" r="3.2" stroke="' +
        dark +
        '" stroke-width="1.7"></circle>' +
        '<path d="M5.5 19c1.2-3.2 3.4-4.8 6.5-4.8s5.3 1.6 6.5 4.8" stroke="' +
        light +
        '" stroke-width="1.7" stroke-linecap="round"></path>',
      spark:
        '<path d="M12 3l1.6 5.2a2 2 0 0 0 1.2 1.2L20 11l-5.2 1.6a2 2 0 0 0-1.2 1.2L12 19l-1.6-5.2a2 2 0 0 0-1.2-1.2L4 11l5.2-1.6a2 2 0 0 0 1.2-1.2z" stroke="' +
        dark +
        '" stroke-width="1.6" stroke-linejoin="round"></path>' +
        '<circle cx="12" cy="11" fill="' +
        light +
        '" r="1.5"></circle>',
    };
    return (
      '<svg class="hf-wiki-duo" fill="none" height="22" viewBox="0 0 24 24" width="22" aria-hidden="true">' +
      (paths[kind] || paths.spark) +
      "</svg>"
    );
  }

  function wikiFrameIcon(kind) {
    return (
      '<span class="hf-wiki-frame" aria-hidden="true"><span class="hf-wiki-frame__inner">' +
      wikiDuoSvg(kind) +
      "</span></span>"
    );
  }

  function wikiStep(n, title, text) {
    return (
      '<li class="hf-wiki__step"><span class="hf-wiki__step-n">' +
      n +
      "</span><div><strong>" +
      title +
      "</strong><p>" +
      text +
      "</p></div></li>"
    );
  }

  function wikiCallout(title, text) {
    return (
      '<aside class="hf-wiki__callout">' +
      wikiFrameIcon("spark") +
      '<div><strong>' +
      title +
      "</strong><p>" +
      text +
      "</p></div></aside>"
    );
  }

  function wikiHead(eyebrow, title, lead, iconKind) {
    return (
      '<header class="hf-wiki__head">' +
      (eyebrow
        ? '<div class="hf-wiki__chip">' +
          (iconKind ? wikiFrameIcon(iconKind) : "") +
          '<span class="hf-wiki__chip-label">' +
          eyebrow +
          "</span></div>"
        : "") +
      "<h2>" +
      title +
      "</h2>" +
      (lead ? '<p class="hf-wiki__lead">' + lead + "</p>" : "") +
      "</header>"
    );
  }

  function wikiArticle(id, active, html) {
    return (
      '<article class="hf-wiki__article' +
      (active ? " is-active" : "") +
      '" data-wiki-article="' +
      id +
      '"' +
      (active ? "" : " hidden") +
      ">" +
      html +
      "</article>"
    );
  }

  function wikiScreen() {
    var wikiNav =
      '<aside class="hf-wiki__nav" aria-label="Tópicos">' +
      '<div class="hf-wiki__brand">' +
      '<a class="hf-wiki__brand-logo" href="wiki.html" aria-label="Hubfi Central de ajuda">' +
      '<span class="hf-wiki__brand-mark" aria-hidden="true">h<span>.</span></span>' +
      '<img src="assets/logos/h-color-light.svg" width="88" height="22" alt="hubfi">' +
      "</a>" +
      '<div class="hf-wiki__brand-meta">' +
      "<strong>Central de ajuda</strong>" +
      "<span>Guias e novidades do produto</span>" +
      "</div></div>" +
      '<label class="hf-wiki__search">' +
      ico("search", 16) +
      '<input type="search" placeholder="Buscar tópico…" aria-label="Buscar tópico" data-wiki-search></label>' +
      '<nav class="hf-wiki__nav-scroll">' +
      wikiNavGroup("Começar", [
        wikiNavItem("inicio", "O que há de novo", "sparkles", true),
        wikiNavItem("como-usar", "Como usar esta central", "compass"),
      ]) +
      wikiNavGroup("Dashboards", [
        wikiNavItem("dashboard", "Dashboard de operações", "layout-dashboard"),
        wikiNavItem("como-ler", "Como ler os indicadores", "chart-line"),
      ]) +
      wikiNavGroup("Operações", [
        wikiNavItem("kanban", "Kanban de operações", "kanban"),
        wikiNavItem("pausado", "Status Pausado", "circle-pause"),
        wikiNavItem("abertura", "Abertura de operação", "plus"),
      ]) +
      wikiNavGroup("Cadastros", [
        wikiNavItem("unicidade", "Unicidade de cliente", "user-plus"),
      ]) +
      "</nav>" +
      '<div class="hf-wiki__nav-foot">' +
      '<a class="hf-wiki__nav-foot-link" href="' +
      wikiProto("tour-dashboard") +
      '">' +
      ico("map", 14) +
      "<span>Tour do dashboard</span></a>" +
      '<p class="hf-wiki__nav-foot-note">Hubfi · set/2026</p>' +
      "</div></aside>";

    var articles =
      wikiArticle(
        "inicio",
        true,
        '<div class="hf-wiki-home">' +
          '<section class="hf-wiki-home__intro">' +
          '<div class="hf-wiki__chip hf-wiki__chip--center">' +
          '<span class="hf-wiki-frame hf-wiki-frame--xs" aria-hidden="true"><span class="hf-wiki-frame__inner">' +
          wikiDuoSvg("spark") +
          "</span></span>" +
          '<span class="hf-wiki__chip-label">Central de ajuda</span>' +
          '<span class="hf-wiki__chip-meta">Guias e novidades</span></div>' +
          "<h2>" +
          '<span class="hf-wiki-home__line">Tire suas dúvidas em minutos.</span>' +
          '<span class="hf-wiki-home__line hf-wiki-home__line--accent">Opere com mais confiança.</span>' +
          "</h2>" +
          "</section>" +
          '<section class="hf-wiki-home__mock hf-wiki-kanban-mock" aria-label="Demonstração animada do Kanban de operações">' +
          '<div class="hf-wiki-home__mock-glow" aria-hidden="true"></div>' +
          '<div class="hf-wiki-home__mock-frame">' +
          '<iframe class="hf-wiki-home__mock-iframe hf-wiki-kanban-mock__iframe" src="assets/wiki/kanban-mock/index.html?v=2" title="Mockup animado do Kanban Hubfi" loading="eager" scrolling="no"></iframe>' +
          "</div></section>" +
          '<div class="hf-wiki-home__divider bridge bridge--mark bridge--white-to-paper" aria-hidden="true">' +
          '<div class="bridge-mark-rule">' +
          '<span class="bridge-mark-line"></span>' +
          '<span class="bridge-mark-badge"><img src="assets/wiki/bridge-icon.png" id="icon-logo" alt=""></span>' +
          '<span class="bridge-mark-line"></span>' +
          "</div></div>" +
          '<section class="hf-wiki-home__features">' +
          '<article class="hf-wiki-home__feat">' +
          '<div class="hf-wiki-home__feat-top">' +
          wikiFrameIcon("dashboard") +
          '<span class="hf-wiki-home__feat-tag">Novo</span></div>' +
          "<strong>Dashboard de operações</strong>" +
          "<span>Funil, SLA, gargalo e abas por Safra, Empresas e Produtos. Clique em qualquer card para entender o indicador.</span>" +
          '<button class="hf-wiki-home__btn hf-wiki-home__btn--ghost" type="button" data-wiki-href="' +
          wikiProto("tour-dashboard") +
          '">' +
          ico("map", 16) +
          "<span>Abrir tour</span></button></article>" +
          '<article class="hf-wiki-home__feat">' +
          '<div class="hf-wiki-home__feat-top">' +
          wikiFrameIcon("kanban") +
          '<span class="hf-wiki-home__feat-tag">Novo</span></div>' +
          "<strong>Kanban de operações</strong>" +
          "<span>Board por etapa com filtros Todas, Pausadas e Rascunhos. Foque no que move o pipeline.</span>" +
          '<button class="hf-wiki-home__btn hf-wiki-home__btn--ghost" type="button" data-wiki-jump="kanban">' +
          ico("book-open", 16) +
          "<span>Ler guia</span></button></article>" +
          '<article class="hf-wiki-home__feat">' +
          '<div class="hf-wiki-home__feat-top">' +
          wikiFrameIcon("pause") +
          '<span class="hf-wiki-home__feat-tag">Atualizado</span></div>' +
          "<strong>Status Pausado</strong>" +
          "<span>Pendência temporária fora do SLA, com data de retorno e cadência de lembretes.</span>" +
          '<button class="hf-wiki-home__btn hf-wiki-home__btn--ghost" type="button" data-wiki-jump="pausado">' +
          ico("info", 16) +
          "<span>Como usar</span></button></article>" +
          "</section></div>"
      ) +
      wikiArticle(
        "como-usar",
        false,
        wikiHead(
          "Começar",
          "Como usar esta central",
          "Use a barra lateral para navegar entre tópicos. A busca filtra os itens do menu. Os artigos ficam nesta área, sem popup.",
          "compass"
        ) +
          '<div class="hf-wiki__panel">' +
          "<ul class=\"hf-wiki__steps\">" +
          wikiStep("1", "Escolha o tópico", "No menu à esquerda, abra o grupo e clique no artigo.") +
          wikiStep("2", "Leia no ritmo", "Cada página tem contexto, passos e o que evitar.") +
          wikiStep("3", "Volte quando precisar", "A central fica no produto, e não some como o modal antigo.") +
          "</ul></div>"
      ) +
      wikiArticle(
        "dashboard",
        false,
        wikiHead(
          "Dashboards",
          "Dashboard de operações",
          "Visão estratégica da plataforma: pipeline, funil, conversão, perdas e desempenho por usuário. Substitui a necessidade de explicar o painel em slides.",
          "dashboard"
        ) +
          '<div class="hf-wiki__panel">' +
          "<h3>O que você encontra</h3>" +
          "<ul class=\"hf-wiki__list\">" +
          "<li><strong>KPIs de pipeline:</strong> originada, ativa, ganha e perdido, com ticket médio.</li>" +
          "<li><strong>Funil:</strong> distribuição por etapa, SLA e tooltip de gargalo.</li>" +
          "<li><strong>Abas:</strong> Operações, Safra, Empresas, Produtos e Usuários.</li>" +
          "<li><strong>Filtros:</strong> mesa, produto, empresa, período, operador e usuário.</li>" +
          "</ul>" +
          "<h3>Como ler rápido</h3>" +
          "<ul class=\"hf-wiki__steps\">" +
          wikiStep("1", "Comece pelos KPIs", "Veja volume e ticket. Pipeline ativa mostra o que ainda está em jogo.") +
          wikiStep("2", "Olhe o funil", "Identifique onde o volume trava: análise, proposta ou formalização.") +
          wikiStep("3", "Ajuste os filtros", "Restrinja por mesa ou período antes de concluir.") +
          "</ul>" +
          wikiCallout(
            "Tour visual",
            'Prefira o <a href="' +
              wikiProto("tour-dashboard") +
              '">Tour do Dashboard</a>: percorre cada card e gráfico da primeira tela com spotlight. Use <strong>Fechar tour</strong> a qualquer momento para navegar livremente.'
          ) +
          "</div>"
      ) +
      wikiArticle(
        "como-ler",
        false,
        wikiHead(
          "Dashboards",
          "Como ler os indicadores",
          "Cada card do dashboard responde a uma pergunta. Use esta referência em vez de slides soltos.",
          "chart"
        ) +
          '<div class="hf-wiki__panel">' +
          '<div class="hf-wiki__table-wrap"><table class="hf-wiki__table"><thead><tr><th>Indicador</th><th>Significa</th><th>Ação típica</th></tr></thead><tbody>' +
          "<tr><td>Pipeline originada</td><td>Volume que entrou no período</td><td>Comparar com meta de captação</td></tr>" +
          "<tr><td>Pipeline ativa</td><td>Operações ainda em andamento</td><td>Priorizar o que está parado</td></tr>" +
          "<tr><td>Pipeline ganha</td><td>Fechamentos confirmados</td><td>Validar ticket e produto</td></tr>" +
          "<tr><td>Pipeline perdido</td><td>Volume que saiu sem fechamento</td><td>Ver motivos de perda</td></tr>" +
          "<tr><td>Conversão</td><td>% que avança entre etapas</td><td>Atacar o gargalo do funil</td></tr>" +
          "</tbody></table></div>" +
          wikiCallout(
            "Guia estendido",
            'Há também o material externo <a href="dashboards/como-ler.html" target="_blank" rel="noreferrer">Como ler os dados</a> para Admin e Gestor da empresa.'
          ) +
          "</div>"
      ) +
      wikiArticle(
        "kanban",
        false,
        wikiHead(
          "Operações",
          "Kanban de operações",
          "Board por etapa: Pré-cadastro, Em análise, Proposta, Formalização e Finalizado. Cada card mostra código, cliente, produto, valor, tempo e responsável.",
          "kanban"
        ) +
          '<div class="hf-wiki__panel">' +
          "<h3>Filtros rápidos</h3>" +
          "<ul class=\"hf-wiki__list\">" +
          "<li><strong>Todas:</strong> visão completa do funil.</li>" +
          "<li><strong>Pausadas:</strong> só operações com pausa (fora do SLA).</li>" +
          "<li><strong>Rascunhos:</strong> operações ainda não enviadas.</li>" +
          "</ul>" +
          wikiCallout(
            "Protótipo",
            'Veja o board em <a href="' +
              wikiProto("kanban-operacoes") +
              '">Kanban de operações</a>.'
          ) +
          "</div>"
      ) +
      wikiArticle(
        "pausado",
        false,
        wikiHead(
          "Operações",
          "Status Pausado",
          "Use quando a operação tem pendência temporária. A operação sai das filas ativas, o tempo pausado não conta no SLA e a cadência de lembretes começa a partir da data de retorno.",
          "pause"
        ) +
          '<div class="hf-wiki__panel">' +
          "<ul class=\"hf-wiki__steps\">" +
          wikiStep("1", "Pausar", "Informe motivo e data de retorno.") +
          wikiStep("2", "Acompanhar", "Busque com o filtro Pausadas no Kanban.") +
          wikiStep("3", "Retomar ou estender", "Volta para Em andamento ou define nova data.") +
          wikiStep("4", "Sem ação", "Após a cadência, vira Perdido por pausa vencida.") +
          "</ul>" +
          wikiCallout(
            "Protótipo",
            'Simule em <a href="' +
              wikiProto("detalhes-operacao?demo=paused") +
              '">Detalhes da operação · Pausado</a>.'
          ) +
          "</div>"
      ) +
      wikiArticle(
        "abertura",
        false,
        wikiHead(
          "Operações",
          "Abertura de operação",
          "Documento é a identidade. A ficha é única na empresa e reaproveitada entre colegas. Outra empresa cadastra o mesmo CPF em silêncio.",
          "plus"
        ) +
          '<div class="hf-wiki__panel">' +
          "<ul class=\"hf-wiki__list\">" +
          "<li>PF pede CPF; PJ pede CNPJ.</li>" +
          "<li>Sem documento válido, não avança.</li>" +
          "<li>CPF já na empresa reaproveita a ficha, mesmo criado por outro usuário.</li>" +
          "<li>Documento do corretor é recusado.</li>" +
          "</ul>" +
          wikiCallout(
            "Protótipo",
            'Fluxo em <a href="' +
              wikiProto("abertura-operacao") +
              '">Abertura de operação</a>.'
          ) +
          "</div>"
      ) +
      wikiArticle(
        "unicidade",
        false,
        wikiHead(
          "Cadastros",
          "Unicidade de cliente por empresa",
          "O mesmo documento não cria fichas duplicadas dentro da empresa. Entre empresas, cada uma cadastra de forma independente, sem mencionar a outra.",
          "user"
        ) +
          '<div class="hf-wiki__panel">' +
          "<ul class=\"hf-wiki__list\">" +
          "<li>Cadastro bloqueia se o documento já existe na empresa.</li>" +
          "<li>Edição com colisão de documento é barrada.</li>" +
          "<li>Formulário público sem documento não identifica o cliente.</li>" +
          "</ul>" +
          wikiCallout(
            "Protótipo",
            'Cenários em <a href="' +
              wikiProto("cadastro-cliente?demo=empresa") +
              '">Cadastro de cliente</a> e <a href="' +
              wikiProto("edicao-cliente?demo=colisao") +
              '">Edição de cliente</a>.'
          ) +
          "</div>"
      );

    return (
      '<div class="wiki-page" data-wiki-root>' +
      '<div class="hf-wiki">' +
      wikiNav +
      '<div class="hf-wiki__content" data-wiki-content>' +
      articles +
      "</div></div></div>"
    );
  }

  function kAsset(name, w, h) {
    return (
      '<img src="assets/screen/kanban/' +
      name +
      '.svg" width="' +
      w +
      '" height="' +
      h +
      '" alt="">'
    );
  }

  function kanbanTemp(nivel) {
    var file = nivel === "baixa" ? "temp-baixa" : nivel === "media" ? "temp-media" : "temp-alta";
    return (
      '<span class="hf-kcard__temp" aria-hidden="true">' +
      kAsset(file, 16, 16) +
      "</span>"
    );
  }

  function kanbanTag(kind, label) {
    if (kind === "paused") {
      return (
        '<span class="hf-kcard__tag hf-kcard__tag--paused">' +
        kAsset("pause", 12, 12) +
        "<span>" +
        label +
        "</span></span>"
      );
    }
    if (kind === "draft") {
      return (
        '<span class="hf-kcard__tag hf-kcard__tag--draft">' +
        kAsset("pencil", 12, 12) +
        "<span>" +
        label +
        "</span></span>"
      );
    }
    return "";
  }

  function kanbanCard(opts) {
    var flags = [];
    if (opts.paused) flags.push("paused");
    if (opts.draft) flags.push("draft");
    var tag = "";
    if (opts.paused) tag = kanbanTag("paused", opts.paused);
    else if (opts.draft) tag = kanbanTag("draft", "Rascunho");
    return (
      '<article class="hf-kcard" data-k-flags="' +
      flags.join(" ") +
      '">' +
      '<div class="hf-kcard__head"><span class="hf-kcard__id">' +
      opts.id +
      "</span>" +
      tag +
      kanbanTemp(opts.temp || "alta") +
      "</div>" +
      '<div class="hf-kcard__body"><p class="hf-kcard__name">' +
      opts.name +
      '</p><p class="hf-kcard__product">' +
      opts.product +
      "</p></div>" +
      '<div class="hf-kcard__foot"><p class="hf-kcard__value">' +
      opts.value +
      '</p><div class="hf-kcard__meta"><span class="hf-kcard__days">' +
      opts.days +
      '</span><span class="hf-kcard__avatar">' +
      opts.avatar +
      "</span></div></div></article>"
    );
  }

  function kanbanCol(opts) {
    var cards = (opts.cards || [])
      .map(function (c) {
        return kanbanCard(c);
      })
      .join("");
    return (
      '<section class="hf-kcol" data-k-tom="' +
      (opts.tom || "neutro") +
      '">' +
      '<header class="hf-kcol__head">' +
      '<span class="hf-kcol__dot" aria-hidden="true">' +
      kAsset("dot-" + (opts.tom || "neutro"), 8, 8) +
      "</span>" +
      '<span class="hf-kcol__name">' +
      opts.name +
      '</span><span class="hf-kcol__count">' +
      opts.count +
      '</span><span class="hf-kcol__spacer"></span>' +
      '<span class="hf-kcol__sum">' +
      opts.sum +
      "</span></header>" +
      '<div class="hf-kcol__cards">' +
      cards +
      "</div></section>"
    );
  }

  function kanbanQuick(label, count, selected) {
    return (
      '<button class="hf-kquick' +
      (selected ? " is-selected" : "") +
      '" type="button" data-k-quick="' +
      label.toLowerCase() +
      '"><span class="hf-kquick__label">' +
      label +
      '</span><span class="hf-kquick__count">' +
      count +
      "</span></button>"
    );
  }

  function kanbanScreen() {
    var sidebar =
      typeof ui.appSidebar === "function" ? ui.appSidebar("operacoes", "fit collapsed") : "";

    var crumb =
      '<nav class="hf-crumb">' +
      '<button class="hf-crumb__home" type="button" data-nav-toggle aria-expanded="false" aria-label="Expandir menu">' +
      kAsset("panel-left", 20, 20) +
      "</button>" +
      '<span class="hf-crumb__div"></span>' +
      "<span>Operações</span></nav>";

    var header =
      '<header class="hf-kboard__pagehead">' +
      '<div class="hf-kboard__titles"><h1 class="hf-kboard__title">Operações</h1>' +
      '<p class="hf-kboard__sub">Acompanhe cada operação da entrada à finalização</p></div>' +
      '<button class="hf-btn hf-btn--primary hf-kboard__cta" type="button">' +
      kAsset("plus", 20, 20) +
      "Nova Operação</button></header>";

    var toolbar =
      '<div class="hf-kboard__toolbar">' +
      '<label class="hf-kboard__search"><span class="hf-kboard__search-ico" aria-hidden="true">' +
      kAsset("search", 16, 16) +
      '</span><input type="search" placeholder="Buscar por código, cliente ou responsável" aria-label="Buscar operações"></label>' +
      '<div class="hf-kboard__quicks" data-k-quicks>' +
      kanbanQuick("Todas", "2.790", true) +
      kanbanQuick("Pausadas", "12", false) +
      kanbanQuick("Rascunhos", "8", false) +
      "</div>" +
      '<div class="hf-kboard__view" role="group" aria-label="Visão">' +
      '<button class="hf-kboard__view-btn is-active" type="button" aria-label="Kanban" aria-pressed="true">' +
      kAsset("view-kanban", 16, 16) +
      '</button><button class="hf-kboard__view-btn" type="button" aria-label="Lista" aria-pressed="false">' +
      kAsset("view-lista", 16, 16) +
      "</button></div>" +
      '<button class="hf-btn hf-btn--ghost hf-kboard__filters" type="button">Filtros</button>' +
      '<button class="hf-btn hf-btn--ghost hf-btn--icon hf-kboard__export" type="button" aria-label="Exportar">' +
      kAsset("download", 20, 20) +
      "</button></div>";

    var board =
      '<div class="hf-kboard__cols" data-k-board>' +
      kanbanCol({
        name: "Pré-cadastro",
        count: "1.126",
        sum: "R$ 793,8 mi",
        tom: "neutro",
        cards: [
          { id: "OP-002897", name: "Rafael Cavalcanti Teixeira Gomes", product: "Home Equity", value: "R$ 100.000,00", days: "2d", avatar: "RC", temp: "alta" },
          { id: "OP-002969", name: "Lucas Augusto Costa Godoi", product: "Financiamento Imobiliário", value: "R$ 450.000,00", days: "37d", avatar: "LA", temp: "media", paused: "Pausada até 11/10" },
          { id: "OP-002968", name: "Mauricio Lima", product: "Financiamento Imobiliário", value: "R$ 878.100,00", days: "1d", avatar: "ML", temp: "media", draft: true },
          { id: "OP-002967", name: "Aila Maria de Alencar Barreto", product: "Financiamento de Veículos", value: "R$ 39.000,00", days: "5d", avatar: "AM", temp: "baixa" },
        ],
      }) +
      kanbanCol({
        name: "Em análise",
        count: "560",
        sum: "R$ 554,5 mi",
        tom: "atencao",
        cards: [
          { id: "OP-002890", name: "Mauricio Lima Teste", product: "Financiamento Imobiliário", value: "R$ 500.000,00", days: "1d", avatar: "ML", temp: "alta" },
          { id: "OP-002954", name: "Ricardo Paz dos Santos Filho", product: "Home Equity", value: "R$ 670.000,00", days: "3d", avatar: "RP", temp: "alta" },
          { id: "OP-002778", name: "Geiza Ribeiro da Silva Sousa", product: "Financiamento Imobiliário", value: "R$ 15.000,00", days: "12d", avatar: "GR", temp: "baixa", paused: "Pausada até 04/10" },
          { id: "OP-002959", name: "Victor Tavares de Souza Lopes", product: "Consórcio", value: "R$ 400.000,00", days: "7d", avatar: "VT", temp: "media" },
        ],
      }) +
      kanbanCol({
        name: "Proposta",
        count: "584",
        sum: "R$ 57,9 mi",
        tom: "progresso",
        cards: [
          { id: "OP-001477", name: "Aila Maria de Alencar Barreto", product: "Plano de Saúde", value: "R$ 4.000,00", days: "2d", avatar: "AM", temp: "media" },
          { id: "OP-000588", name: "Wellington Andrade", product: "Financiamento de Veículos", value: "R$ 40.908,00", days: "9d", avatar: "WA", temp: "alta" },
          { id: "OP-002496", name: "Thiago Rebouças Correia", product: "Seguro de Vida", value: "R$ 654,24", days: "4d", avatar: "TR", temp: "baixa" },
          { id: "OP-001003", name: "Alberto Cassiano Barbosa", product: "Seguro Auto", value: "R$ 4.445,07", days: "21d", avatar: "AC", temp: "media", paused: "Pausada até 18/10" },
        ],
      }) +
      kanbanCol({
        name: "Formalização",
        count: "36",
        sum: "R$ 2,4 mi",
        tom: "progresso",
        cards: [
          { id: "OP-002766", name: "Raposo Teste", product: "Financiamento Imobiliário", value: "R$ 8.000,34", days: "6d", avatar: "RT", temp: "alta" },
          { id: "OP-000661", name: "Luiz Felipe Rocha Bezerra", product: "Financiamento de Veículos", value: "R$ 89.999,73", days: "15d", avatar: "LF", temp: "media" },
          { id: "OP-002542", name: "João Leal", product: "Financiamento Imobiliário", value: "R$ 213.610,53", days: "28d", avatar: "JL", temp: "baixa", paused: "Pausada até 30/09" },
          { id: "OP-002453", name: "Patricia Andrade de Sales", product: "Consórcio", value: "R$ 293.832,00", days: "3d", avatar: "PA", temp: "alta" },
        ],
      }) +
      kanbanCol({
        name: "Finalizado",
        count: "484",
        sum: "R$ 22,5 mi",
        tom: "concluido",
        cards: [
          { id: "OP-000371", name: "Nanci Eckermann", product: "Home Equity", value: "R$ 50.000,00", days: "2d", avatar: "NE", temp: "alta" },
          { id: "OP-001441", name: "Clean Terceirização", product: "Seguro Garantia", value: "R$ 798,31", days: "1d", avatar: "CT", temp: "media" },
          { id: "OP-002016", name: "Cynthia Freire Cottard", product: "Remessa Cambial", value: "R$ 120.000,00", days: "4d", avatar: "CF", temp: "media" },
          { id: "OP-002725", name: "Ricardo Paz dos Santos Filho", product: "Consórcio", value: "R$ 25.000.000,00", days: "9d", avatar: "RP", temp: "alta" },
        ],
      }) +
      "</div>";

    return (
      '<div class="docs-screen docs-screen--kanban" data-k-root>' +
      sidebar +
      '<div class="hf-kboard">' +
      crumb +
      header +
      toolbar +
      board +
      "</div></div>"
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
      '"' +
      (opts.wrap || "") +
      '><div class="hf-field__header"><span class="hf-field__label"' +
      (opts.labelAttr || "") +
      ">" +
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
      '<button class="hf-field__control" type="button" data-client-trigger role="combobox" aria-haspopup="listbox" aria-expanded="false">' +
      '<span class="hf-field__value hf-field__value--placeholder" data-client-value>Selecionar</span>' +
      '<span class="hf-field__chevron" aria-hidden="true"><img src="assets/icons/select-chevron.svg" alt=""></span></button>' +
      '<div class="hf-select-menu" role="listbox" data-client-menu>' +
      '<div class="hf-select-menu__search"><label class="hf-search"><span class="hf-search__icon" aria-hidden="true"><img src="assets/icons/search.svg" width="13" height="13" alt=""></span>' +
      '<input class="hf-search__field" type="search" data-client-query placeholder="Buscar cliente" autocomplete="off"></label></div>' +
      '<div data-client-options>' +
      items +
      "</div>" +
      '<button class="hf-open-client__create" type="button" data-client-create hidden></button>' +
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
    phone: "62996986604",
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
        "A ficha é única. " +
          client.name +
          " já está na sua empresa — não criamos outro cadastro. A operação de " +
          client.op.product +
          " segue com " +
          client.op.owner +
          ". Você está abrindo outra operação, de " +
          produto +
          ", no mesmo cliente."
      );
    }
    if (kind === "closed") {
      return matchCard(
        "success",
        "Cliente já cadastrado na empresa",
        "A ficha é única na empresa. Esta operação nova entra no mesmo cadastro — não cria outro cliente, mesmo que outro colega tenha cadastrado. Última operação: " +
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
      "Nenhum cliente com este CPF na sua empresa. Preencha telefone e e-mail para cadastrar."
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
      '<div class="hf-open__form hf-open__form--info">' +
      openSelect("Personal Finance", ["Ricardo Teste", "Lucas Augusto", "Maurício Lima"], {
        req: true,
        filled: "Ricardo Teste",
      }) +
      openClientPicker() +
      openField("CPF", "000.000.000-00", ' data-cpf-input data-doc-input inputmode="numeric"', {
        req: true,
        wrap: ' data-open-doc-wrap hidden',
        labelAttr: " data-doc-label",
      }) +
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
      creating: false,
      match: "",
    };
    var stepsEarly = [
      "Perfil do cliente",
      "Seleção de Produto",
      "Informações do cliente",
      "Comunicação",
    ];
    var cpfInput = shell.querySelector("[data-cpf-input]");
    var docWrap = shell.querySelector("[data-open-doc-wrap]");
    var docLabelEl = shell.querySelector("[data-doc-label]");
    var clientSelect = shell.querySelector("[data-client-select]");
    var clientMenu = clientSelect && clientSelect.querySelector("[data-client-menu]");
    var panel = shell.querySelector("[data-match-panel]");
    var lastView = 1;

    function clientItems() {
      if (isPj()) {
        return [{ label: "Jardins Incorporadora Ltda", cpf: "11222333000181" }];
      }
      return [
        { label: "Marcelo Oliveira", cpf: "12345678900" },
        { label: "Ricardo Mendes", cpf: "11122233344" },
      ];
    }

    function refillClientMenu() {
      var host = shell.querySelector("[data-client-options]");
      if (!host) return;
      host.innerHTML = clientItems()
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

    function showDocField(on) {
      if (!docWrap) return;
      docWrap.hidden = !on;
      if (docLabelEl) docLabelEl.textContent = docLabel();
      if (cpfInput) {
        cpfInput.placeholder = isPj() ? "00.000.000/0000-00" : "000.000.000-00";
      }
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
      var value = clientSelect.querySelector("[data-client-value]");
      if (!value) return;
      value.textContent = filled && text ? text : "Selecionar";
      value.classList.toggle("hf-field__value--placeholder", !(filled && text));
    }

    function paintMatch() {
      if (!panel) return;
      var kind = currentKind();
      state.match = kind;
      var phone = shell.querySelector("[data-phone-input]");
      var email = shell.querySelector("[data-email-input]");
      if (!kind) {
        if (state.creating) {
          panel.innerHTML = matchCard(
            "warning",
            "Informe o " + docLabel(),
            "O nome ainda não identifica o cliente. O " +
              docLabel() +
              " decide se a ficha já existe na empresa."
          );
          setClientLabel(state.name, true);
          showDocField(true);
          setOpenLocked(phone, false);
          setOpenLocked(email, false);
          return;
        }
        panel.innerHTML = "";
        setOpenLocked(phone, false);
        setOpenLocked(email, false);
        setClientLabel("Selecionar", false);
        showDocField(false);
        return;
      }
      var client = clientOf() || {};
      panel.innerHTML = renderMatch(kind, client, state.produto);
      if (kind === "broker") {
        state.name = "";
        state.creating = false;
        setClientLabel("Selecionar", false);
        if (phone) phone.value = "";
        if (email) email.value = "";
        setOpenLocked(phone, true);
        setOpenLocked(email, true);
        showDocField(true);
        return;
      }
      if (reused()) {
        state.name = client.name || state.name;
        state.creating = false;
        setClientLabel(client.name, true);
        if (client.phone && phone) phone.value = client.phone;
        if (client.email && email) email.value = client.email;
        setOpenLocked(phone, true);
        setOpenLocked(email, true);
        showDocField(false);
        return;
      }
      state.name = state.name || "Novo cliente";
      setClientLabel(state.name, true);
      showDocField(true);
      setOpenLocked(phone, false);
      setOpenLocked(email, false);
    }

    function lookupFromInput() {
      if (!cpfInput) return;
      var nextCpf = cpfDigits(cpfInput.value).slice(0, docLen());
      state.cpf = nextCpf;
      cpfInput.value = maskDoc(nextCpf);
      if (state.cpf.length < docLen()) {
        if (!state.creating) state.name = "";
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
          state.creating = false;
          if (cpfInput) cpfInput.value = "";
          refillClientMenu();
          showDocField(false);
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
      var clientCreate = clientSelect.querySelector("[data-client-create]");
      var clientTrigger = clientSelect.querySelector("[data-client-trigger]");

      function closeClientMenu() {
        clientSelect.classList.remove("is-open");
        if (clientTrigger) clientTrigger.setAttribute("aria-expanded", "false");
      }

      function openClientMenu() {
        clientSelect.classList.add("is-open");
        if (clientTrigger) clientTrigger.setAttribute("aria-expanded", "true");
        if (clientMenu && clientTrigger) {
          clientMenu.style.top = clientTrigger.offsetTop + clientTrigger.offsetHeight + 4 + "px";
        }
        if (clientQuery) {
          clientQuery.value = "";
          filterClientMenu("");
          clientQuery.focus();
        }
      }

      function filterClientMenu(q) {
        var needle = String(q || "").trim();
        var lower = needle.toLowerCase();
        var visible = 0;
        clientSelect.querySelectorAll("[data-client-cpf]").forEach(function (item) {
          var label = (item.getAttribute("data-label") || item.textContent || "").toLowerCase();
          var cpf = item.getAttribute("data-client-cpf") || "";
          var digitsNeedle = lower.replace(/\D/g, "");
          var hitLabel = !lower || label.indexOf(lower) !== -1;
          var hitDoc = !digitsNeedle || cpf.indexOf(digitsNeedle) !== -1;
          var show = hitLabel || hitDoc;
          item.hidden = !show;
          if (show) visible += 1;
        });
        if (clientCreate) {
          var showCreate = !!needle && visible === 0;
          clientCreate.hidden = !showCreate;
          clientCreate.textContent = showCreate ? 'Criar cliente "' + needle + '"' : "";
          clientCreate.setAttribute("data-create-name", needle);
        }
      }

      function pickClient(item) {
        if (!item || !cpfInput) return;
        state.creating = false;
        state.name = item.getAttribute("data-label") || item.textContent.trim();
        cpfInput.value = item.getAttribute("data-client-cpf") || "";
        closeClientMenu();
        lookupFromInput();
      }

      function createClient(name) {
        var next = String(name || "").trim();
        if (!next) return;
        state.creating = true;
        state.name = next;
        state.cpf = "";
        if (cpfInput) cpfInput.value = "";
        closeClientMenu();
        setClientLabel(next, true);
        showDocField(true);
        paintMatch();
        paint();
        if (cpfInput) cpfInput.focus();
      }

      if (clientTrigger) {
        clientTrigger.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          if (clientSelect.classList.contains("is-open")) closeClientMenu();
          else openClientMenu();
        });
      }
      if (clientQuery) {
        clientQuery.addEventListener("click", function (event) {
          event.stopPropagation();
        });
        clientQuery.addEventListener("input", function () {
          filterClientMenu(clientQuery.value);
        });
        clientQuery.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            event.preventDefault();
            var first = clientSelect.querySelector("[data-client-cpf]:not([hidden])");
            if (first) pickClient(first);
            else if (clientCreate && !clientCreate.hidden) createClient(clientCreate.getAttribute("data-create-name"));
          }
        });
      }
      if (clientCreate) {
        clientCreate.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          createClient(clientCreate.getAttribute("data-create-name"));
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
    if (cpfInput) {
      cpfInput.addEventListener("input", function () {
        cpfInput.value = maskDoc(cpfInput.value);
        lookupFromInput();
      });
    }
    shell.querySelectorAll("[data-demo-cpf]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!cpfInput) return;
        var perfil = btn.getAttribute("data-demo-perfil");
        if (perfil === "pj") setPerfil("Pessoa Jurídica");
        else setPerfil("Pessoa Física");
        view = 1;
        state.creating = false;
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
        {
          label: "Listagem (RF-PAUSA-01)",
          note: "Kanban com filtro Todas / Pausadas / Rascunhos.",
          href: "#/kanban-operacoes?view=pausadas",
        },
      ],
      pending: [
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
    node: "3109-36103",
    figmaFile: FIGMA_DASH,
    wide: true,
    section: "Telas",
      scenarios: [
      { label: "Visão estratégica", note: "Funil, conversão e indicadores.", href: "#/dashboard-operacoes" },
      { label: "Tour guiado", note: "Product tour card a card na primeira tela.", href: "#/tour-dashboard" },
      { label: "Central de ajuda", note: "Wiki em página própria.", href: "wiki.html" },
    ],
    html: function () {
      return dashScreen();
    },
  };

  catalog.pages["tour-dashboard"] = {
    title: "Tour do Dashboard",
    lead: "Product tour visual da primeira tela — spotlight em cada card e gráfico.",
    wide: true,
    section: "Telas",
    scenarios: [
      { label: "Começar tour", note: "Filtros → KPIs → Funil → Conversão → Resolução.", href: "#/tour-dashboard" },
    ],
    html: function () {
      return dashScreen({ tour: true });
    },
  };

  catalog.pages["kanban-operacoes"] = {
    title: "Kanban de operações",
    lead: "Board por etapa — busca, filtros rápidos, pausadas e rascunhos.",
    node: "8501-45420",
    figmaFile: FIGMA_KANBAN,
    wide: true,
    section: "Telas",
    scenarios: [
      { label: "Todas", note: "Visão completa do funil.", href: "#/kanban-operacoes" },
      { label: "Pausadas", note: "Só operações com pausa.", href: "#/kanban-operacoes?view=pausadas" },
      { label: "Rascunhos", note: "Só rascunhos.", href: "#/kanban-operacoes?view=rascunhos" },
    ],
    html: function () {
      return kanbanScreen();
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

  function bindKanban(root) {
    var shell = root.querySelector("[data-k-root]");
    if (!shell) return;

    function applyFilter(view) {
      var key = String(view || "todas").toLowerCase();
      shell.querySelectorAll("[data-k-quick]").forEach(function (btn) {
        var on = btn.getAttribute("data-k-quick") === key;
        btn.classList.toggle("is-selected", on);
      });
      shell.querySelectorAll(".hf-kcard").forEach(function (card) {
        var flags = " " + (card.getAttribute("data-k-flags") || "") + " ";
        var show =
          key === "todas" ||
          (key === "pausadas" && flags.indexOf(" paused ") !== -1) ||
          (key === "rascunhos" && flags.indexOf(" draft ") !== -1);
        card.hidden = !show;
      });
    }

    shell.querySelectorAll("[data-k-quick]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyFilter(btn.getAttribute("data-k-quick"));
      });
    });

    var qs = location.hash.split("?")[1] || "";
    var viewQ = qs.match(/(?:^|&)view=([^&]+)/);
    applyFilter(viewQ ? decodeURIComponent(viewQ[1]) : "todas");
  }

  function bindWiki(root) {
    var shell = root.querySelector("[data-wiki-root]");
    if (!shell) return;

    function topicFromUrl() {
      var search = location.search.replace(/^\?/, "");
      var hashQ = (location.hash.split("?")[1] || "");
      var qs = search || hashQ;
      var match = qs.match(/(?:^|&)topic=([^&]+)/);
      return match ? decodeURIComponent(match[1]) : "inicio";
    }

    function setTopicUrl(id) {
      try {
        var url = new URL(location.href);
        if (id && id !== "inicio") url.searchParams.set("topic", id);
        else url.searchParams.delete("topic");
        history.replaceState(null, "", url.pathname + url.search + url.hash);
      } catch (err) {}
    }

    function showTopic(id, syncUrl) {
      var key = String(id || "inicio");
      var found = false;
      shell.querySelectorAll("[data-wiki-article]").forEach(function (article) {
        var on = article.getAttribute("data-wiki-article") === key;
        if (on) found = true;
        article.classList.toggle("is-active", on);
        article.hidden = !on;
      });
      if (!found) {
        showTopic("inicio", syncUrl);
        return;
      }
      shell.querySelectorAll("[data-wiki-nav]").forEach(function (btn) {
        btn.classList.toggle("is-active", btn.getAttribute("data-wiki-nav") === key);
      });
      var content = shell.querySelector("[data-wiki-content]");
      if (content) content.scrollTop = 0;
      if (syncUrl !== false) setTopicUrl(key);
    }

    shell.querySelectorAll("[data-wiki-nav]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        showTopic(btn.getAttribute("data-wiki-nav"));
      });
    });

    shell.querySelectorAll("[data-wiki-jump]").forEach(function (el) {
      el.addEventListener("click", function (event) {
        var jump = el.getAttribute("data-wiki-jump");
        if (!jump) return;
        event.preventDefault();
        showTopic(jump);
      });
    });

    shell.querySelectorAll("[data-wiki-href]").forEach(function (el) {
      el.addEventListener("click", function () {
        var href = el.getAttribute("data-wiki-href");
        if (href) location.href = href;
      });
    });

    var search = shell.querySelector("[data-wiki-search]");
    if (search) {
      search.addEventListener("input", function () {
        var q = String(search.value || "").toLowerCase().trim();
        shell.querySelectorAll("[data-wiki-nav]").forEach(function (btn) {
          var label = String(btn.textContent || "").toLowerCase();
          btn.hidden = !!(q && label.indexOf(q) === -1);
        });
        shell.querySelectorAll(".hf-wiki__nav-group").forEach(function (group) {
          var visible = group.querySelectorAll("[data-wiki-nav]:not([hidden])").length;
          group.hidden = !visible;
        });
      });
    }

    showTopic(topicFromUrl(), false);

    // Bridge mark — mesmo IntersectionObserver do site Hubfi
    var bridges = shell.querySelectorAll(".bridge");
    if (bridges.length) {
      var bridgeIO = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in");
            bridgeIO.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      bridges.forEach(function (el) {
        bridgeIO.observe(el);
      });
    }
  }

  function bindDashTabs(root) {
    var shell = root.querySelector("[data-dash-root]");
    if (!shell) return;
    var tabs = shell.querySelectorAll("[data-dash-tab]");
    var panels = shell.querySelectorAll("[data-dash-panel]");
    if (!tabs.length || !panels.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.getAttribute("data-dash-tab");
        tabs.forEach(function (btn) {
          btn.classList.toggle("is-active", btn === tab);
        });
        panels.forEach(function (panel) {
          panel.classList.toggle(
            "is-active",
            panel.getAttribute("data-dash-panel") === id
          );
        });
      });
    });
  }

  function bindFunnelTip(root) {
    var funnelRoot = root.querySelector("[data-funnel-root]");
    if (!funnelRoot) return;
    var tip = funnelRoot.querySelector("[data-funnel-tip]");
    var bars = funnelRoot.querySelectorAll("[data-funnel-bar]");
    if (!tip || !bars.length) return;

    var titleEl = tip.querySelector("[data-ftip-title]");
    var badgeEl = tip.querySelector("[data-ftip-badge]");
    var calloutEl = tip.querySelector(".docs-dash-ftip__callout");
    var opsEl = tip.querySelector("[data-ftip-ops]");
    var volEl = tip.querySelector("[data-ftip-vol]");
    var hideTimer = null;

    function stageFullName(label) {
      if (label === "Doc. das Partes") return "Documentação das Partes";
      return label;
    }

    function placeTip(bar) {
      var plot = funnelRoot.querySelector(".docs-dash-funnel__plot") || funnelRoot;
      var plotRect = plot.getBoundingClientRect();
      var barRect = bar.getBoundingClientRect();
      var tipW = tip.offsetWidth || 296;
      var left = barRect.left - plotRect.left + barRect.width / 2 - tipW / 2;
      left = Math.max(8, Math.min(left, plotRect.width - tipW - 8));
      tip.style.left = left + "px";
      tip.style.top = Math.max(8, barRect.top - plotRect.top - 8) + "px";
    }

    function showTip(bar) {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      var stage = bar.getAttribute("data-stage") || "";
      var ops = bar.getAttribute("data-ops") || "0";
      var vol = bar.getAttribute("data-vol") || "R$ 0";
      var gargalo = bar.getAttribute("data-gargalo") === "1";

      if (titleEl) titleEl.textContent = stageFullName(stage);
      if (opsEl) opsEl.textContent = ops + " operações";
      if (volEl) volEl.textContent = vol;
      if (badgeEl) badgeEl.hidden = !gargalo;
      if (calloutEl) calloutEl.hidden = !gargalo;

      bars.forEach(function (b) {
        b.classList.toggle("is-tip-open", b === bar);
      });
      tip.hidden = false;
      placeTip(bar);
    }

    function scheduleHide() {
      hideTimer = setTimeout(function () {
        tip.hidden = true;
        bars.forEach(function (b) {
          b.classList.remove("is-tip-open");
        });
      }, 120);
    }

    bars.forEach(function (bar) {
      bar.addEventListener("mouseenter", function () {
        showTip(bar);
      });
      bar.addEventListener("focus", function () {
        showTip(bar);
      });
      bar.addEventListener("mouseleave", scheduleHide);
      bar.addEventListener("blur", scheduleHide);
    });

    tip.addEventListener("mouseenter", function () {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
    });
    tip.addEventListener("mouseleave", scheduleHide);
  }

  var DASH_HELP = {
    tabs: {
      title: "Abas da visão",
      body: "Troque entre Operações, Safra, Empresas, Produtos e Usuários. Cada aba troca o conteúdo abaixo — rankings e recortes específicos.",
    },
    filters: {
      title: "Filtros aplicados",
      body: "Os chips mostram o recorte atual (mesa, produto, empresa, período…). Remova um chip para ampliar a visão antes de interpretar os números.",
    },
    "kpi-originado": {
      title: "Pipeline originada",
      body: "Volume que entrou no período e quantidade de operações. Compare com a meta de captação e olhe o ticket médio no rodapé do card.",
    },
    "kpi-ativo": {
      title: "Pipeline ativa",
      body: "O que ainda está em jogo. Os ícones mostram operações ativas, movimentações e o quanto está pausado — priorize o que está parado.",
    },
    "kpi-ganho": {
      title: "Pipeline ganha",
      body: "Fechamentos confirmados no período. Use para validar resultado e ticket médio dos negócios ganhos.",
    },
    "kpi-perdido": {
      title: "Pipeline perdido",
      body: "Volume que saiu sem fechamento. Cruze depois com Motivos de perda para atacar causas.",
    },
    funil: {
      title: "Funil de etapas",
      body: "Barras por etapa com alerta de prazo. Passe o mouse para ver volume e SLA; a barra vermelha marca o gargalo.",
    },
    "funil-gargalo": {
      title: "Tooltip de gargalo",
      body: "Etapa entra em gargalo quando 50% das operações estão em Atenção ou Crítica. Use Ver todas para abrir a lista filtrada.",
    },
    conversao: {
      title: "Conversão entre etapas",
      body: "Tabela de passagem: quantas operações avançam, % relativa e tempo médio. Comece pela etapa com pior conversão ou maior tempo.",
    },
    resolucao: {
      title: "Conversão e resolução",
      body: "Anéis resumem o período: conversão (ganhas ÷ ativas) e resolução (ganhas + perdidas ÷ ativas). Leitura rápida do desfecho do funil.",
    },
    perda: {
      title: "Motivos de perda",
      body: "Top motivos sobre o total de perdidas no período. Use para priorizar ações comerciais e de produto.",
    },
    probabilidade: {
      title: "Probabilidade de fechamento",
      body: "Distribuição das operações por chance de fechar. Clique numa faixa para focar nas que precisam de atenção.",
    },
    "usuarios-origem": {
      title: "Usuários que originaram",
      body: "Quem gerou operações no período, com detalhe por empresa. Bom para ver concentração de origem.",
    },
    "usuarios-pipeline": {
      title: "Usuários com pipeline aberto",
      body: "Quem ainda tem operação ativa. Compare com a origem para ver quem mantém o funil em movimento.",
    },
    "form-funnel": {
      title: "Funil de formulário",
      body: "Acompanha envio, resposta parcial e conclusão dos formulários ligados às operações.",
    },
  };

  var DASH_TOUR_ORDER = [
    "tabs",
    "filters",
    "kpi-originado",
    "kpi-ativo",
    "kpi-ganho",
    "kpi-perdido",
    "funil",
    "funil-gargalo",
    "conversao",
    "resolucao",
  ];

  function bindDashHelp(root) {
    var shell = root.querySelector("[data-dash-help]");
    if (!shell) return;

    var mode = shell.getAttribute("data-dash-help") || "click";
    var tourMode = mode === "tour";
    var steps = DASH_TOUR_ORDER.map(function (id) {
      var meta = DASH_HELP[id] || { title: id, body: "" };
      return { id: id, title: meta.title, body: meta.body };
    });

    var idx = 0;
    var open = false;
    var spot = shell.querySelector("[data-tour-spot]");
    var tip = shell.querySelector("[data-tour-tip]");
    var titleEl = shell.querySelector("[data-tour-title]");
    var bodyEl = shell.querySelector("[data-tour-body]");
    var stepEl = shell.querySelector("[data-tour-step]");
    var prevBtn = shell.querySelector("[data-tour-prev]");
    var nextBtn = shell.querySelector("[data-tour-next]");
    var skipBtn = shell.querySelector("[data-tour-skip]");
    var closeBtn = shell.querySelector("[data-tour-close]");
    var tourRoot = shell.querySelector("[data-tour-root]");
    var bodyScroll = shell.querySelector(".docs-screen__body");
    var funnelTip = shell.querySelector("[data-funnel-tip]");
    var gargaloBar = shell.querySelector('[data-tour="funil-gargalo"]');
    var actions = tip ? tip.querySelector(".hf-tour__actions") : null;

    function setHelpMode(seq) {
      var isSeq = !!seq;
      shell.setAttribute("data-help-seq", isSeq ? "1" : "0");
      if (tourRoot) {
        tourRoot.classList.toggle("is-explain", !isSeq);
        tourRoot.classList.toggle("is-tour-seq", isSeq);
      }
      if (tip) tip.classList.toggle("is-explain", !isSeq);
      if (stepEl) stepEl.textContent = isSeq ? idx + 1 + " / " + steps.length : "Ajuda";
      if (skipBtn) skipBtn.hidden = !isSeq;
      if (actions) {
        actions.querySelectorAll("[data-tour-prev], [data-tour-next]").forEach(function (btn) {
          btn.hidden = !isSeq;
        });
        if (closeBtn) {
          closeBtn.hidden = false;
          closeBtn.textContent = isSeq ? "Fechar tour" : "Fechar";
          closeBtn.classList.toggle("hf-btn--ghost", isSeq);
          closeBtn.classList.toggle("hf-btn--primary", !isSeq);
        }
      }
    }

    function setTourChrome(on) {
      shell.classList.toggle("docs-screen--tour", true);
      shell.classList.toggle("is-tour-done", !on);
      if (tourRoot) tourRoot.hidden = !on;
    }

    function placeTarget(target, meta) {
      if (!target || !spot || !tip) return;
      open = true;
      setTourChrome(true);
      setHelpMode(shell.getAttribute("data-help-seq") === "1");
      shell.querySelectorAll("[data-tour]").forEach(function (el) {
        el.classList.toggle("is-tour-focus", el === target);
      });

      if (funnelTip) {
        var isGargalo = target.getAttribute("data-tour") === "funil-gargalo";
        funnelTip.hidden = !isGargalo;
        if (gargaloBar) gargaloBar.classList.toggle("is-tip-open", isGargalo);
      }

      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

      window.requestAnimationFrame(function () {
        var rect = target.getBoundingClientRect();
        var pad = 8;
        spot.hidden = false;
        tip.hidden = false;
        spot.style.top = rect.top - pad + "px";
        spot.style.left = rect.left - pad + "px";
        spot.style.width = rect.width + pad * 2 + "px";
        spot.style.height = rect.height + pad * 2 + "px";

        if (titleEl) titleEl.textContent = meta.title || "";
        if (bodyEl) bodyEl.textContent = meta.body || "";
        if (shell.getAttribute("data-help-seq") === "1") {
          if (stepEl) stepEl.textContent = idx + 1 + " / " + steps.length;
          if (prevBtn) prevBtn.disabled = idx === 0;
          if (nextBtn) nextBtn.textContent = idx === steps.length - 1 ? "Concluir" : "Próximo";
        }

        var tipW = tip.offsetWidth || 320;
        var tipH = tip.offsetHeight || 160;
        var left = Math.min(
          Math.max(16, rect.left + rect.width / 2 - tipW / 2),
          window.innerWidth - tipW - 16
        );
        var top = rect.bottom + 16;
        if (top + tipH > window.innerHeight - 16) {
          top = Math.max(16, rect.top - tipH - 16);
        }
        tip.style.left = left + "px";
        tip.style.top = top + "px";
      });
    }

    function showId(id) {
      var meta = DASH_HELP[id];
      var target = shell.querySelector('[data-tour="' + id + '"]');
      if (!meta || !target) return;
      placeTarget(target, meta);
    }

    function placeTour() {
      if (!open && !tourMode) return;
      var step = steps[idx];
      if (!step) return;
      if (stepEl) stepEl.textContent = idx + 1 + " / " + steps.length;
      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.textContent = idx === steps.length - 1 ? "Concluir" : "Próximo";
      showId(step.id);
    }

    function closeHelp() {
      open = false;
      shell.setAttribute("data-help-seq", "0");
      shell.classList.add("is-tour-done");
      if (tourRoot) tourRoot.hidden = true;
      if (spot) spot.hidden = true;
      if (tip) tip.hidden = true;
      if (funnelTip) funnelTip.hidden = true;
      shell.querySelectorAll("[data-tour]").forEach(function (el) {
        el.classList.remove("is-tour-focus");
      });
      if (gargaloBar) gargaloBar.classList.remove("is-tip-open");
    }

    function go(n) {
      idx = Math.max(0, Math.min(steps.length - 1, n));
      placeTour();
    }

    shell.querySelectorAll("[data-tour]").forEach(function (el) {
      el.classList.add("is-help-target");
      el.addEventListener("click", function (event) {
        var nested = event.target.closest("[data-tour]");
        if (nested && nested !== el) return;
        if (event.target.closest("[data-tour-root], [data-funnel-tip]")) return;
        var id = el.getAttribute("data-tour");
        if (!id || !DASH_HELP[id]) return;
        event.stopPropagation();
        setHelpMode(false);
        showId(id);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        go(idx - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (idx >= steps.length - 1) closeHelp();
        else go(idx + 1);
      });
    }
    if (skipBtn) skipBtn.addEventListener("click", closeHelp);
    if (closeBtn) closeBtn.addEventListener("click", closeHelp);

    window.addEventListener("resize", function () {
      if (!open) return;
      if (shell.getAttribute("data-help-seq") === "1") placeTour();
      else {
        var focus = shell.querySelector("[data-tour].is-tour-focus");
        if (focus) showId(focus.getAttribute("data-tour"));
      }
    });
    if (bodyScroll) {
      bodyScroll.addEventListener(
        "scroll",
        function () {
          if (!open) return;
          if (shell.getAttribute("data-help-seq") === "1") placeTour();
          else {
            var focus = shell.querySelector("[data-tour].is-tour-focus");
            if (focus) showId(focus.getAttribute("data-tour"));
          }
        },
        { passive: true }
      );
    }

    if (tourMode) {
      open = true;
      setHelpMode(true);
      go(0);
    } else {
      closeHelp();
    }
  }

  window.HF_SCREENS = {
    wiki: wikiScreen,
    bind: function (root) {
      bindOcr(root);
      bindOpen(root);
      bindOpDetail(root);
      bindKanban(root);
      bindWiki(root);
      bindDashTabs(root);
      bindFunnelTip(root);
      bindDashHelp(root);
      if (window.HF_IDENTITY && typeof window.HF_IDENTITY.bind === "function") {
        window.HF_IDENTITY.bind(root);
      }
    },
  };
})();
