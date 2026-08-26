(function () {
  var OPERATION = {
    applicant: {
      fullName: "Herminio Da Jesus Reis",
      cpf: "123.456.789-00",
      birthDate: "15/03/1990",
      phone: "(11) 98765-4321",
      email: "ligia.tavares@email.com",
      cep: "01310-100",
      street: "Av. Paulista",
      number: "1000",
      complement: null,
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
    },
    holder: {
      holderName: "Honorio Da Jesus Reis",
      cpf: "021.835.745-09",
    },
  };

  var DICT = [
    { key: "fullName", aliases: ["nome", "nome completo", "nome do proponente", "nome do cliente", "nome do titular"] },
    { key: "cpf", aliases: ["cpf", "cpf do cliente", "cpf cnpj"] },
    { key: "birthDate", aliases: ["nascimento", "data de nascimento", "dt nasc", "data nasc"] },
    { key: "phone", aliases: ["telefone", "celular", "whatsapp", "fone"] },
    { key: "email", aliases: ["email", "e-mail", "e mail"] },
    { key: "cep", aliases: ["cep", "codigo postal"] },
    { key: "street", aliases: ["rua", "logradouro", "endereco"] },
    { key: "number", aliases: ["numero", "nro", "n"] },
    { key: "complement", aliases: ["complemento", "apto", "apartamento"] },
    { key: "neighborhood", aliases: ["bairro"] },
    { key: "city", aliases: ["cidade", "municipio"] },
    { key: "state", aliases: ["estado", "uf"] },
    { key: "holderName", aliases: ["nome do titular do documento", "titular da cnh"] },
  ];

  var HUB_ROWS = [
    ["applicant.fullName", OPERATION.applicant.fullName],
    ["applicant.cpf", OPERATION.applicant.cpf],
    ["applicant.birthDate", OPERATION.applicant.birthDate],
    ["applicant.phone", OPERATION.applicant.phone],
    ["applicant.email", OPERATION.applicant.email],
    ["applicant.cep", OPERATION.applicant.cep],
    ["applicant.street", OPERATION.applicant.street],
    ["applicant.complement", "— sem informação"],
    ["holder.holderName", OPERATION.holder.holderName],
  ];

  var BANKS = {
    itau: {
      name: "Itaú",
      color: "#ec7000",
      hosts: ["itau.com.br"],
      card:
        "detectStep lê o H2 do wizard (Dados Pessoais, Endereço). Hints só se um select customizado não aceitar o filler nativo. CEP pode ter afterWrite para esperar a busca do banco.",
      fields: [
        { label: "Nome Completo", keyHint: "fullName", note: "step Dados Pessoais" },
        { label: "CPF", keyHint: "cpf", note: "step Dados Pessoais" },
        { label: "Data de Nascimento", keyHint: "birthDate", note: "step Dados Pessoais" },
        { label: "Telefone", keyHint: "phone", note: "step Dados Pessoais" },
        { label: "E-mail", keyHint: "email", note: "step Dados Pessoais" },
        { label: "CEP", keyHint: "cep", note: "step Endereço" },
        { label: "Nome do Titular", keyHint: "fullName", note: "label ambíguo — no step do proponente cai em fullName, não na CNH" },
      ],
    },
    caixa: {
      name: "Caixa",
      color: "#005ca9",
      hosts: ["caixa.gov.br", "habita.caixa.gov.br"],
      card:
        "detectStep pelo texto do stepper da habitação/financiamento. Hosts de homologação entram no mesmo array. Label “Nome” sem “completo” ainda resolve por alias.",
      fields: [
        { label: "Nome", keyHint: "fullName", note: "step Identificação" },
        { label: "CPF do proponente", keyHint: "cpf", note: "step Identificação" },
        { label: "Dt. nascimento", keyHint: "birthDate", note: "step Identificação" },
        { label: "Celular", keyHint: "phone", note: "step Contato" },
        { label: "E-mail", keyHint: "email", note: "step Contato" },
        { label: "CEP", keyHint: "cep", note: "step Residência" },
      ],
    },
    inter: {
      name: "Inter",
      color: "#ff7a00",
      hosts: ["bancointer.com.br", "inter.co"],
      card:
        "Portal costuma ser SPA. MutationObserver no core redetecta o step quando o H1 muda. Adapter quase só hosts + detectStep.",
      fields: [
        { label: "Nome do cliente", keyHint: "fullName", note: "step Seus dados" },
        { label: "CPF", keyHint: "cpf", note: "step Seus dados" },
        { label: "Nascimento", keyHint: "birthDate", note: "step Seus dados" },
        { label: "WhatsApp", keyHint: "phone", note: "alias de phone" },
        { label: "E-mail", keyHint: "email", note: "step Seus dados" },
        { label: "Logradouro", keyHint: "street", note: "step Endereço" },
      ],
    },
    santander: {
      name: "Santander",
      color: "#ec0000",
      hosts: ["santander.com.br"],
      card:
        "Alguns campos vêm como CPF/CNPJ no mesmo input. Matcher usa o alias cpf cnpj → cpf quando o step é pessoa física. Pessoa jurídica fica fora deste escopo.",
      fields: [
        { label: "Nome", keyHint: "fullName", note: "step Dados pessoais" },
        { label: "CPF/CNPJ", keyHint: "cpf", note: "PF: preenche CPF. PJ: skip" },
        { label: "Data de nascimento", keyHint: "birthDate", note: "step Dados pessoais" },
        { label: "Telefone celular", keyHint: "phone", note: "step Contato" },
        { label: "E-mail", keyHint: "email", note: "step Contato" },
        { label: "UF", keyHint: "state", note: "step Endereço" },
      ],
    },
    bradesco: {
      name: "Bradesco",
      color: "#cc092f",
      hosts: ["bradesco.com.br", "banco.bradesco"],
      card:
        "Label “Nome do proponente” já é um alias de fullName. Se o portal usar iframe, manifest precisa de all_frames no content script.",
      fields: [
        { label: "Nome do proponente", keyHint: "fullName", note: "step Proponente" },
        { label: "CPF", keyHint: "cpf", note: "step Proponente" },
        { label: "Data de Nascimento", keyHint: "birthDate", note: "step Proponente" },
        { label: "Telefone", keyHint: "phone", note: "step Proponente" },
        { label: "E-mail", keyHint: "email", note: "step Proponente" },
        { label: "Bairro", keyHint: "neighborhood", note: "step Endereço" },
      ],
    },
  };

  var state = { bank: "itau", selected: null };

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function normalize(text) {
    return String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[*/]/g, " ")
      .replace(/\b(digite|informe|seu|sua|os|as|o|a|do|da|de|e)\b/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function matchLabel(raw) {
    var n = normalize(raw);
    if (!n) return null;
    var best = null;
    DICT.forEach(function (entry) {
      entry.aliases.forEach(function (alias) {
        var a = normalize(alias);
        var score = 0;
        if (n === a) score = 0.98;
        else if (n.indexOf(a) >= 0 || a.indexOf(n) >= 0) score = 0.92;
        if (score && (!best || score > best.score || (score === best.score && a.length > best.alias.length))) {
          best = { key: entry.key, alias: alias, score: score, normalized: n };
        }
      });
    });
    return best;
  }

  function resolveFill(key) {
    if (key === "holderName") {
      return {
        path: "holder.holderName",
        value: OPERATION.holder.holderName,
        fill: false,
        reason: "Titular da CNH. CPF diferente do proponente — não vai para o form do banco.",
      };
    }
    var value = OPERATION.applicant[key];
    if (value == null || value === "") {
      return {
        path: "applicant." + key,
        value: null,
        fill: false,
        reason: "Chave certa, mas a operação não tem esse dado. Campo fica vazio.",
      };
    }
    return {
      path: "applicant." + key,
      value: value,
      fill: true,
      reason: "Mesma chave, papel applicant, confiança acima de 0.90.",
    };
  }

  function paintHub(hitKey) {
    var box = $("[data-hub]");
    box.innerHTML = HUB_ROWS.map(function (row) {
      var key = row[0].split(".")[1];
      var on = hitKey && (row[0] === "applicant." + hitKey || row[0] === "holder." + hitKey);
      return (
        "<div class=\"" +
        (on ? "is-hit" : "") +
        "\"><dt>" +
        row[0] +
        "</dt><dd>" +
        row[1] +
        "</dd></div>"
      );
    }).join("");
  }

  function paintTrace(raw) {
    var box = $("[data-trace]");
    var found = matchLabel(raw);
    if (!found) {
      box.innerHTML =
        "<ol>" +
        "<li><span class=\"k\">1. Label bruto</span><span class=\"v\">" +
        raw +
        "</span></li>" +
        "<li><span class=\"k\">2. Normalizado</span><span class=\"v\">" +
        normalize(raw) +
        "</span></li>" +
        "<li><span class=\"k\">3. Dicionário</span><span class=\"v no\">sem chave ≥ 0.90 — não preenche</span></li>" +
        "</ol>";
      paintHub(null);
      return;
    }
    var fill = resolveFill(found.key);
    box.innerHTML =
      "<ol>" +
      "<li><span class=\"k\">1. Label bruto no banco</span><span class=\"v\">" +
      raw +
      "</span></li>" +
      "<li><span class=\"k\">2. Normalizado</span><span class=\"v\">" +
      found.normalized +
      "</span></li>" +
      "<li><span class=\"k\">3. Alias no dicionário</span><span class=\"v\">" +
      found.alias +
      " → <strong>" +
      found.key +
      "</strong> (" +
      found.score.toFixed(2) +
      ")</span></li>" +
      "<li><span class=\"k\">4. Caminho na operação</span><span class=\"v\">" +
      fill.path +
      "</span></li>" +
      "<li><span class=\"k\">5. Decisão</span><span class=\"v " +
      (fill.fill ? "ok" : "no") +
      "\">" +
      (fill.fill ? "Preenche: " + fill.value : "Não preenche") +
      " — " +
      fill.reason +
      "</span></li>" +
      "</ol>";
    paintHub(found.key);
  }

  function paintLabels() {
    var bank = BANKS[state.bank];
    $("[data-host]").textContent = "hosts: *." + bank.hosts.join("  *.");
    var wrap = $("[data-labels]");
    wrap.innerHTML = bank.fields
      .map(function (f, i) {
        return (
          "<button type=\"button\" class=\"label-btn\" data-i=\"" +
          i +
          "\">" +
          f.label +
          "<small>" +
          f.note +
          "</small></button>"
        );
      })
      .join("");
  }

  function paintCards() {
    var box = $("[data-bank-cards]");
    box.innerHTML = Object.keys(BANKS)
      .map(function (id) {
        var b = BANKS[id];
        return (
          "<article class=\"bcard\" style=\"--c:" +
          b.color +
          "\"><div><h3>" +
          b.name +
          "</h3><p class=\"hosts\">" +
          b.hosts
            .map(function (h) {
              return "*." + h;
            })
            .join("<br>") +
          "</p></div><div><strong>Arquivo</strong><p><code>adapters/" +
          id +
          ".ts</code></p></div><div><strong>O que o adapter faz</strong><p>" +
          b.card +
          "</p></div></article>"
        );
      })
      .join("");
  }

  function setBank(id) {
    state.bank = id;
    document.querySelectorAll(".bank-tab").forEach(function (btn) {
      var on = btn.getAttribute("data-bank") === id;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    paintLabels();
    var first = BANKS[id].fields[0];
    paintTrace(first.label);
    highlight(0);
  }

  function highlight(index) {
    document.querySelectorAll(".label-btn").forEach(function (btn, i) {
      btn.classList.toggle("is-on", i === index);
    });
  }

  document.querySelectorAll(".bank-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setBank(btn.getAttribute("data-bank"));
    });
  });

  $("[data-labels]").addEventListener("click", function (e) {
    var btn = e.target.closest(".label-btn");
    if (!btn) return;
    var i = Number(btn.getAttribute("data-i"));
    highlight(i);
    paintTrace(BANKS[state.bank].fields[i].label);
  });

  $("[data-type]").addEventListener("input", function (e) {
    var v = e.target.value.trim();
    if (!v) return;
    document.querySelectorAll(".label-btn").forEach(function (btn) {
      btn.classList.remove("is-on");
    });
    paintTrace(v);
  });

  paintCards();
  paintHub(null);
  setBank("itau");
})();
