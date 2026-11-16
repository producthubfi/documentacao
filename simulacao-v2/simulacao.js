(function () {
  var app = document.getElementById("app");
  var toastEl = document.getElementById("toast");
  var toastTimer = 0;
  var loadTimer = 0;
  var tipo = "";
  var screen = "a1";

  var LOGO = {
    itau: "assets/eec12.png",
    bradesco: "assets/4ef0d.png",
    caixa: "assets/429dd.png",
    inter: "assets/301d3.png",
    santander: "assets/ae7eb.png"
  };

  var BANKS = [
    {
      id: "caixa", name: "Caixa", logo: LOGO.caixa, tag: "ok", tagText: "Maior teto",
      action: "usar", imóvel: "R$ 600.000", entrada: "R$ 120.000", entradaLabel: "Valor de entrada",
      financiado: "R$ 480.000", p1: "R$ 5.513,22", p2: "R$ 1.153,26", taxa: "11,49%", cet: "12,72%", prazo: "420 meses"
    },
    {
      id: "santander", name: "Santander", logo: LOGO.santander, tag: "ok", tagText: "Entrada suficiente",
      action: "usar", imóvel: "R$ 580.000", entrada: "R$ 120.000", entradaLabel: "Valor de entrada",
      financiado: "R$ 460.000", p1: "R$ 5.283,50", p2: "R$ 1.105,21", taxa: "11,49%", cet: "12,72%", prazo: "420 meses"
    },
    {
      id: "bradesco", name: "Bradesco", logo: LOGO.bradesco, tag: "ok", tagText: "Entrada suficiente",
      action: "usar", imóvel: "R$ 560.000", entrada: "R$ 120.000", entradaLabel: "Valor de entrada",
      financiado: "R$ 440.000", p1: "R$ 5.053,79", p2: "R$ 1.057,16", taxa: "11,49%", cet: "12,72%", prazo: "420 meses"
    },
    {
      id: "itau", name: "Itaú", logo: LOGO.itau, tag: "warn", tagText: "Entrada insuficiente · faltam R$ 30.000",
      action: "ajustar", need: "R$ 150.000", needRaw: "150.000", gap: "R$ 30.000",
      imóvel: "R$ 500.000", entrada: "R$ 150.000", entradaLabel: "Entrada necessária",
      financiado: "R$ 350.000", p1: "R$ 4.895,04", p2: "R$ 843,00", taxa: "14,85%", cet: "15,92%", prazo: "420 meses"
    },
    {
      id: "inter", name: "Inter", logo: LOGO.inter, tag: "warn", tagText: "Entrada insuficiente · faltam R$ 20.000",
      action: "ajustar", need: "R$ 140.000", needRaw: "140.000", gap: "R$ 20.000",
      imóvel: "R$ 400.000", entrada: "R$ 140.000", entradaLabel: "Entrada necessária",
      financiado: "R$ 260.000", p1: "R$ 3.086,13", p2: "R$ 624,92", taxa: "12,00%", cet: "13,20%", prazo: "420 meses"
    }
  ];

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-on"); }, 2800);
  }

  function mode() { return app.getAttribute("data-mode"); }

  function money(raw) {
    var digits = String(raw || "").replace(/\D/g, "");
    if (!digits) return "";
    return "R$ " + Number(digits).toLocaleString("pt-BR");
  }

  function filled(id) {
    var el = document.getElementById(id);
    return el && el.value && el.value !== "R$";
  }

  function clientReady() {
    return tipo && filled("renda") && filled("recursos") && filled("nasc") && filled("prazo");
  }

  function syncModes() {
    var m = mode();
    document.querySelectorAll(".mode").forEach(function (btn) {
      var on = btn.getAttribute("data-mode") === m;
      btn.classList.toggle("is-on", on);
      btn.querySelector("[data-radio]").src = on ? "assets/0f65c.svg" : "assets/7582e.svg";
    });
    document.querySelectorAll("[data-only]").forEach(function (el) {
      el.hidden = el.getAttribute("data-only") !== m;
    });
    document.getElementById("fastBox").hidden = m !== "imovel";
  }

  function syncButton() {
    var btn = document.getElementById("simBtn");
    var loading = screen === "a4";
    var done = screen === "a5" || screen === "a6";
    btn.innerHTML = (done ? "Recalcular" : "Simular") + ' <img src="assets/ea7e2.svg" alt="">';
    btn.classList.toggle("recalc", done);
    var off = loading || (mode() === "cliente" && !done && !clientReady());
    btn.classList.toggle("is-off", off);
    btn.disabled = off;
    app.classList.toggle("is-loading", loading);
  }

  function emptyHtml() {
    return '<div class="empty">Preencha os dados ao lado e clique em Simular.<br>As condições dos bancos aparecerão aqui.</div>';
  }

  function loadingHtml() {
    return '' +
      '<div class="loading-hero">' +
        '<div class="loading-logos">' +
          '<img src="assets/683b6.png" alt="">' +
          '<img src="assets/4ea31.png" alt="">' +
          '<img src="assets/a8d2f.png" alt="">' +
          '<img src="assets/dec1e.png" alt="">' +
          '<img src="assets/107d4.png" alt="">' +
        '</div>' +
        '<p>Calculando o maior imóvel em cada banco</p>' +
      '</div>';
  }

  function metric(k, v, cls, icon, plain) {
    var ico = icon
      ? '<span class="m-ico' + (plain ? " is-plain" : "") + '"><img src="assets/' + icon + '.svg" alt=""></span>'
      : "";
    return '<div class="metric ' + (cls || "") + (icon ? " has-ico" : "") + '">' + ico +
      '<div><p class="k">' + k + '</p><p class="v">' + v + '</p></div></div>';
  }

  function field(k, v, opts) {
    opts = opts || {};
    var ico = opts.icon
      ? '<span class="m-ico"><img src="assets/' + opts.icon + '.svg" alt=""></span>'
      : "";
    var vClass = "v" + (opts.lg ? " lg" : "") + (opts.hot ? " hot" : "");
    return '<div' + (opts.icon ? ' class="has-ico"' : "") + ">" + ico +
      '<div><p class="k">' + k + '</p><p class="' + vClass + '">' + v + "</p></div></div>";
  }

  function bankBy(id) {
    return BANKS.filter(function (b) { return b.id === id; })[0];
  }

  function rowHtml(b) {
    var warn = b.tag === "warn";
    return '<article class="row" data-bank="' + b.id + '">' +
      '<div class="row-top"><div class="who"><span class="bank-logo"><img src="' + b.logo + '" alt=""></span><span class="name">' + b.name + '</span>' +
      '<span class="tag ' + b.tag + '">' + b.tagText + '</span></div>' +
      '<button class="btn ghost sm details" type="button" data-details="' + b.id + '">Ver detalhes <img src="assets/a3423.svg" alt=""></button></div>' +
      '<div class="row-metrics">' +
        field("Valor máximo do imóvel", b.imóvel, { lg: true }) +
        field(b.entradaLabel, b.entrada, { icon: "wallet", hot: warn }) +
        field("Valor financiado", b.financiado, { icon: "landmark" }) +
        field("Primeira parcela", b.p1) +
      '</div></article>';
  }

  function modalHtml(b) {
    return '<div class="sheet" role="dialog" aria-modal="true" aria-label="Detalhes de ' + b.name + '">' +
      '<div class="sheet-top">' +
        '<span class="bank-logo"><img src="' + b.logo + '" alt=""></span>' +
        '<span class="name">' + b.name + '</span>' +
        '<span class="tag ' + b.tag + '">' + b.tagText + '</span>' +
        '<span class="sheet-spacer" aria-hidden="true"></span>' +
        '<button class="sheet-x" type="button" data-close aria-label="Fechar">✕</button>' +
      '</div>' +
      '<div class="sheet-main">' +
        field("Valor máximo do imóvel", b.imóvel, { lg: true }) +
        field(b.entradaLabel, b.entrada, { icon: "wallet", hot: b.tag === "warn" }) +
        field("Valor financiado", b.financiado, { icon: "landmark" }) +
      '</div>' +
      '<div class="sheet-line" aria-hidden="true"></div>' +
      '<h3>Parcelas · SAC</h3>' +
      '<div class="sheet-grid">' +
        '<div><p class="k">Primeira parcela</p><p class="v">' + b.p1 + '</p></div>' +
        '<div><p class="k">Última parcela</p><p class="v">' + b.p2 + '</p></div>' +
        '<div><p class="k">Modelo de amortização</p><p class="v">SAC</p></div>' +
      '</div>' +
      '<div class="sheet-line" aria-hidden="true"></div>' +
      '<h3>Taxas e prazo</h3>' +
      '<div class="sheet-grid">' +
        '<div><p class="k">Taxa (a.a.)</p><p class="v">' + b.taxa + '</p></div>' +
        '<div><p class="k">CET (a.a.)</p><p class="v">' + b.cet + '</p></div>' +
        '<div><p class="k">Prazo</p><p class="v">' + b.prazo + '</p></div>' +
      '</div>' +
      '</div>';
  }

  function openModal(id) {
    var b = bankBy(id);
    if (!b) return;
    var box = document.getElementById("modal");
    box.innerHTML = modalHtml(b);
    box.hidden = false;
  }

  function closeModal() {
    document.getElementById("modal").hidden = true;
  }

  function resultsHtml() {
    return '<div class="stack">' + BANKS.map(rowHtml).join("") + '</div>' +
      '<div class="alert"><img src="assets/57667.svg" alt=""><p>Para fins de simulação apenas. Taxas e valores sujeitos à aprovação de crédito e às demais condições do produto vigentes no momento da contratação.</p></div>' +
      '<div class="foot"><button class="btn ghost" type="button" id="backFoot">Voltar</button><button class="btn ghost" type="button" id="download">Baixar simulação detalhada</button></div>';
  }

  function paint() {
    var sub = document.getElementById("subtitle");
    var title = document.getElementById("resTitle");
    var body = document.getElementById("resBody");
    var results = document.getElementById("results");
    var map = {
      a1: "Informe os dados para a simulação.",
      a2: "Informe os dados para a simulação.",
      a3: "Informe os dados para a simulação.",
      a4: "Calculando o potencial de compra em cada banco.",
      a5: "Resultado da simulação por banco. Valores ilustrativos.",
      a6: "Resultado da simulação por banco. Valores ilustrativos."
    };
    sub.textContent = map[screen];
    results.classList.toggle("is-done", screen === "a5" || screen === "a6");
    results.classList.toggle("is-loading", screen === "a4");
    title.textContent = "Potencial de compra por banco";
    document.getElementById("clienteModeTitle").textContent =
      screen === "a3" || screen === "a4" || screen === "a5" || screen === "a6"
        ? "Pelo Potencial de compra pelo cliente"
        : "Potencial de compra pelo cliente";
    if (screen === "a5" || screen === "a6") {
      body.innerHTML = resultsHtml();
      if (screen === "a6") openModal("caixa");
      else closeModal();
    } else if (screen === "a4") {
      body.innerHTML = loadingHtml();
    } else {
      body.innerHTML = emptyHtml();
    }
    document.querySelectorAll(".proto button").forEach(function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-jump") === screen);
    });
    syncModes();
    syncButton();
    if (location.hash !== "#" + screen) history.replaceState(null, "", "#" + screen);
    if (screen === "a4" || screen === "a5" || screen === "a6") {
      requestAnimationFrame(function () {
        results.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function fillExample() {
    tipo = "Residencial";
    document.getElementById("tipoLabel").textContent = tipo;
    document.getElementById("renda").value = "R$ 2.000";
    document.getElementById("recursos").value = "R$ 11.000";
    document.getElementById("nasc").value = "01/01/1990";
    document.getElementById("prazo").value = "420";
  }

  function clearForm() {
    tipo = "";
    document.getElementById("tipoLabel").textContent = "Selecione...";
    ["renda", "recursos", "nasc", "prazo", "valor", "entrada", "fgtsValor"].forEach(function (id) {
      document.getElementById(id).value = "";
    });
    setFgts(false);
  }

  function setFgts(on) {
    var btn = document.getElementById("fgts");
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    document.getElementById("fgtsValorField").hidden = !on;
  }

  function go(next) {
    clearTimeout(loadTimer);
    screen = next;
    if (next === "a1") app.setAttribute("data-mode", "imovel");
    if (next === "a2" || next === "a3" || next === "a4" || next === "a5" || next === "a6") app.setAttribute("data-mode", "cliente");
    if (next === "a1" || next === "a2") clearForm();
    if (next === "a3" || next === "a4" || next === "a5" || next === "a6") fillExample();
    paint();
    if (next === "a4") {
      loadTimer = setTimeout(function () { go("a5"); }, 4200);
    }
  }

  function closeMenus(except) {
    document.querySelectorAll(".menu").forEach(function (m) {
      if (m !== except) m.hidden = true;
    });
    document.getElementById("ctxBtn").classList.remove("is-open");
    document.getElementById("userBtn").classList.remove("is-open");
    document.getElementById("tipoBtn").classList.remove("is-open");
    document.getElementById("ctxBtn").setAttribute("aria-expanded", "false");
    document.getElementById("userBtn").setAttribute("aria-expanded", "false");
    document.getElementById("tipoBtn").setAttribute("aria-expanded", "false");
  }

  function toggleMenu(btn, menu) {
    var open = menu.hidden;
    closeMenus();
    menu.hidden = !open;
    btn.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  document.getElementById("ctxBtn").addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu(this, document.getElementById("ctxMenu"));
  });
  document.getElementById("userBtn").addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu(this, document.getElementById("userMenu"));
  });
  document.getElementById("tipoBtn").addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu(this, document.getElementById("tipoMenu"));
  });

  document.getElementById("ctxMenu").addEventListener("click", function (e) {
    var b = e.target.closest("[data-company]");
    if (!b) return;
    document.getElementById("ctxLabel").textContent = b.getAttribute("data-company");
    this.querySelectorAll("button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
    closeMenus();
  });
  document.getElementById("tipoMenu").addEventListener("click", function (e) {
    var b = e.target.closest("[data-tipo]");
    if (!b) return;
    tipo = b.getAttribute("data-tipo");
    document.getElementById("tipoLabel").textContent = tipo;
    this.querySelectorAll("button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
    closeMenus();
    if (screen === "a2" && clientReady()) screen = "a3";
    syncButton();
  });
  document.getElementById("userMenu").addEventListener("click", function (e) {
    var b = e.target.closest("[data-toast]");
    if (!b) return;
    toast(b.getAttribute("data-toast"));
    closeMenus();
  });

  document.querySelectorAll(".mode").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("data-mode");
      app.setAttribute("data-mode", next);
      if (screen === "a4" || screen === "a5" || screen === "a6") screen = next === "cliente" ? "a3" : "a1";
      else if (next === "cliente" && screen === "a1") screen = clientReady() ? "a3" : "a2";
      else if (next === "imovel") screen = "a1";
      paint();
    });
  });

  document.getElementById("fastSwitch").addEventListener("click", function () {
    var on = this.classList.toggle("is-on");
    this.setAttribute("aria-pressed", on ? "true" : "false");
    toast(on ? "Fast Itaú ligado. O retorno passa a vir direto do banco." : "Fast Itaú desligado.");
  });
  document.getElementById("fgts").addEventListener("click", function () {
    var on = this.getAttribute("aria-pressed") !== "true";
    setFgts(on);
    if (on) document.getElementById("fgtsValor").focus();
  });

  document.querySelectorAll("[data-money]").forEach(function (input) {
    input.addEventListener("input", function () {
      var formatted = money(input.value);
      input.value = formatted;
      if (mode() === "cliente" && screen !== "a5" && screen !== "a6" && screen !== "a4") {
        screen = clientReady() ? "a3" : "a2";
        document.querySelectorAll(".proto button").forEach(function (b) {
          b.classList.toggle("is-on", b.getAttribute("data-jump") === screen);
        });
      }
      syncButton();
    });
  });
  document.getElementById("nasc").addEventListener("input", function () {
    var d = this.value.replace(/\D/g, "").slice(0, 8);
    var out = d;
    if (d.length > 4) out = d.slice(0, 2) + "/" + d.slice(2, 4) + "/" + d.slice(4);
    else if (d.length > 2) out = d.slice(0, 2) + "/" + d.slice(2);
    this.value = out;
    if (mode() === "cliente" && (screen === "a2" || screen === "a3")) {
      screen = clientReady() ? "a3" : "a2";
    }
    syncButton();
  });
  document.getElementById("prazo").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 3);
    if (mode() === "cliente" && (screen === "a2" || screen === "a3")) {
      screen = clientReady() ? "a3" : "a2";
    }
    syncButton();
  });

  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (screen === "a5" || screen === "a6") {
      go("a4");
      return;
    }
    if (mode() === "imovel" && (!tipo || !filled("valor") || !filled("entrada") || !filled("nasc") || !filled("prazo"))) {
      toast("Preencha tipo, valor, entrada, nascimento e prazo para simular.");
      return;
    }
    if (mode() === "cliente" && !clientReady()) return;
    go("a4");
  });

  document.getElementById("backBtn").addEventListener("click", function () {
    if (screen === "a5" || screen === "a6" || screen === "a4") go("a3");
    else toast("Volta para Seleção de produto. Essa etapa não está neste fluxo.");
  });

  document.getElementById("results").addEventListener("click", function (e) {
    var details = e.target.closest("[data-details]");
    var back = e.target.closest("#backFoot");
    var down = e.target.closest("#download");
    if (details) {
      screen = "a6";
      openModal(details.getAttribute("data-details"));
      document.querySelectorAll(".proto button").forEach(function (b) {
        b.classList.toggle("is-on", b.getAttribute("data-jump") === "a6");
      });
      if (location.hash !== "#a6") history.replaceState(null, "", "#a6");
    }
    if (back) go("a3");
    if (down) toast("Download ilustrativo. O arquivo detalhado entra com a operação.");
  });

  document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target.id === "modal" || e.target.closest("[data-close]")) {
      closeModal();
      screen = "a5";
      document.querySelectorAll(".proto button").forEach(function (b) {
        b.classList.toggle("is-on", b.getAttribute("data-jump") === "a5");
      });
      history.replaceState(null, "", "#a5");
    }
  });

  document.querySelectorAll("[data-acc]").forEach(function (item) {
    item.querySelector(".nav-chev").addEventListener("click", function (e) {
      e.stopPropagation();
      item.classList.toggle("is-open");
    });
    item.querySelector(".nav-btn").addEventListener("click", function () {
      item.classList.toggle("is-open");
    });
  });

  document.querySelectorAll(".proto button").forEach(function (b) {
    b.addEventListener("click", function () { go(b.getAttribute("data-jump")); });
  });

  document.addEventListener("click", function () { closeMenus(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenus();
  });

  var start = (location.hash || "#a1").slice(1);
  if (["a1", "a2", "a3", "a4", "a5", "a6"].indexOf(start) === -1) start = "a1";
  go(start);
})();
