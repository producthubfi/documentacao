(function () {
  var ICO =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10.5 2.5h-6A1.5 1.5 0 0 0 3 4v6" stroke="#141414" stroke-width="1.5" stroke-linecap="round"/><rect x="5" y="4.5" width="8" height="8" rx="1.5" stroke="#141414" stroke-width="1.5"/></svg>';

  var FILE =
    '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11.5 2.5H6A1.5 1.5 0 0 0 4.5 4v12A1.5 1.5 0 0 0 6 17.5h8A1.5 1.5 0 0 0 15.5 16V7.5L11.5 2.5Z" stroke="#141414" stroke-width="1.4" stroke-linejoin="round"/><path d="M11.5 2.5V7.5H15.5" stroke="#141414" stroke-width="1.4" stroke-linejoin="round"/></svg>';

  var CHEV =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="#A8A8A8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var operation = {
    id: "OP-002773",
    status: "Em Análise",
    product: "Financiamento de Veículos",
    people: [
      {
        id: "person-principal",
        role: "Proponente principal",
        name: "Herminio Da Jesus Reis",
        cpf: "123.456.789-00",
        birthDate: "15/03/1990",
        phone: "(11) 98765-4321",
        email: "ligia.tavares@email.com",
      },
      {
        id: "person-cnh",
        role: "Titular do documento",
        name: "Honorio Da Jesus Reis",
        cpf: "021.835.745-09",
        birthDate: "15/03/1985",
      },
    ],
    requested: {
      personId: "person-principal",
      cpf: "123.456.789-00",
      birthDate: "15/03/1990",
      phone: "(11) 98765-4321",
      email: "ligia.tavares@email.com",
      cep: "01310-100",
      street: "Av. Paulista",
      number: "1000",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
    },
    documents: [
      {
        id: "doc-cnh",
        type: "CNH - Frente",
        ownerId: "person-cnh",
        extracted: {
          name: "Honorio Da Jesus Reis",
          cpf: "021.835.745-09",
          birthDate: "15/03/1985",
          validity: "20/11/2028",
          category: "AB",
        },
      },
    ],
  };

  var STEPS = {
    "applicant-data": {
      id: "applicant-data",
      label: "Dados Pessoais",
      detectedBy: ["dados pessoais", "dados do proponente"],
      fields: ["fullName", "cpf", "birthDate", "phone", "email"],
    },
    address: {
      id: "address",
      label: "Endereço",
      detectedBy: ["endereço", "endereco"],
      fields: ["cep", "street", "number", "complement", "neighborhood", "city", "state"],
    },
  };

  var FIELD_META = {
    fullName: { label: "Nome completo", aliases: ["nome completo", "nome"] },
    cpf: { label: "CPF", aliases: ["cpf"] },
    birthDate: { label: "Nascimento", aliases: ["data de nascimento", "nascimento"] },
    phone: { label: "Telefone", aliases: ["telefone", "celular"] },
    email: { label: "E-mail", aliases: ["e-mail", "email"] },
    cep: { label: "CEP", aliases: ["cep"] },
    street: { label: "Rua", aliases: ["rua", "logradouro", "endereco"] },
    number: { label: "Número", aliases: ["numero", "número"] },
    complement: { label: "Complemento", aliases: ["complemento"] },
    neighborhood: { label: "Bairro", aliases: ["bairro"] },
    city: { label: "Cidade", aliases: ["cidade"] },
    state: { label: "Estado", aliases: ["estado", "uf"] },
  };

  function person(id) {
    return operation.people.find(function (p) {
      return p.id === id;
    });
  }

  function resolveValue(key) {
    var principal = person("person-principal");
    var requested = operation.requested;
    var cnh = operation.documents[0].extracted;
    var cnhSamePerson = cnh.cpf === requested.cpf;

    if (key === "fullName") {
      if (cnhSamePerson && cnh.name && principal.name && cnh.name !== principal.name) {
        return { status: "conflict", value: null };
      }
      return { status: principal.name ? "ok" : "empty", value: principal.name || null, source: "cliente" };
    }
    if (key === "cpf") {
      if (cnhSamePerson && cnh.cpf !== requested.cpf) return { status: "conflict", value: null };
      return { status: "ok", value: requested.cpf, source: "enviado pelo cliente" };
    }
    if (key === "birthDate") {
      if (cnhSamePerson && cnh.birthDate !== requested.birthDate) return { status: "conflict", value: null };
      return { status: "ok", value: requested.birthDate, source: "enviado pelo cliente" };
    }
    var map = {
      phone: requested.phone,
      email: requested.email,
      cep: requested.cep,
      street: requested.street,
      number: requested.number,
      neighborhood: requested.neighborhood,
      city: requested.city,
      state: requested.state,
    };
    if (key === "complement") return { status: "empty", value: null };
    if (map[key]) return { status: "ok", value: map[key], source: "enviado pelo cliente" };
    return { status: "empty", value: null };
  }

  var step = "applicant-data";
  var lastFill = null;
  var detailsOpen = false;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function toast(msg) {
    var el = $(".toast");
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove("is-on");
    }, 1600);
  }

  function copy(text, btn) {
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    btn.classList.add("is-on");
    toast("Copiado");
    setTimeout(function () {
      btn.classList.remove("is-on");
    }, 800);
  }

  function setBankStep(id) {
    step = id;
    $$("[data-bank-step]").forEach(function (el) {
      el.classList.toggle("is-on", el.getAttribute("data-bank-step") === id);
    });
    lastFill = null;
    detailsOpen = false;
    paintAutofill();
  }

  function availableCount(keys) {
    return keys.filter(function (k) {
      return resolveValue(k).status === "ok";
    }).length;
  }

  function fillStep() {
    var spec = STEPS[step];
    var rows = spec.fields.map(function (key) {
      var resolved = resolveValue(key);
      var input = $('[data-field="' + key + '"]');
      var present = !!input;
      var row = {
        key: key,
        label: FIELD_META[key].label,
        status: "skip",
        note: "Não está neste step",
      };
      if (!present) return row;
      if (resolved.status === "empty") {
        row.status = "empty";
        row.note = "Sem informação";
        return row;
      }
      if (resolved.status === "conflict") {
        row.status = "conflict";
        row.note = "Dado divergente";
        return row;
      }
      input.value = resolved.value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      if (input.value === resolved.value) {
        row.status = "ok";
        row.note = "Preenchido";
        input.classList.remove("is-filled");
        void input.offsetWidth;
        input.classList.add("is-filled");
      } else {
        row.status = "conflict";
        row.note = "Não permaneceu";
      }
      return row;
    });
    lastFill = rows;
    paintAutofill();
  }

  function paintAutofill() {
    var spec = STEPS[step];
    var box = $("[data-autofill]");
    var present = spec.fields.filter(function (k) {
      return $('[data-field="' + k + '"]');
    });
    var avail = availableCount(present);
    box.hidden = false;
    box.classList.toggle("is-done", !!lastFill);

    if (!lastFill) {
      box.innerHTML =
        '<p class="autofill__kicker">Itaú detectado</p>' +
        '<p class="autofill__step">Etapa atual: ' +
        spec.label +
        "</p>" +
        '<div class="autofill__meta"><span>' +
        present.length +
        " campos encontrados</span><span>" +
        avail +
        " dados disponíveis</span></div>" +
        '<button class="autofill__btn" type="button" data-fill>Preencher formulário</button>';
      return;
    }
    var ok = lastFill.filter(function (r) {
      return r.status === "ok";
    }).length;
    var warn = lastFill.filter(function (r) {
      return r.status === "conflict";
    }).length;
    var empty = lastFill.filter(function (r) {
      return r.status === "empty";
    }).length;
    var details = lastFill
      .filter(function (r) {
        return r.status !== "skip";
      })
      .map(function (r) {
        var cls = r.status === "ok" ? "is-ok" : r.status === "conflict" ? "is-warn" : "";
        var mark = r.status === "ok" ? "✅ Preenchido" : r.status === "conflict" ? "⚠️ " + r.note : "— " + r.note;
        return '<div class="autofill__row ' + cls + '"><span>' + r.label + "</span><span>" + mark + "</span></div>";
      })
      .join("");
    box.innerHTML =
      '<p class="autofill__kicker">Preenchimento concluído</p>' +
      '<p class="autofill__step">Etapa: ' +
      spec.label +
      "</p>" +
      '<ul class="autofill__stats">' +
      "<li>✅ " +
      ok +
      " campos preenchidos</li>" +
      "<li>⚠️ " +
      warn +
      " precisam de revisão</li>" +
      "<li>— " +
      empty +
      " sem informação</li></ul>" +
      '<button class="autofill__btn autofill__btn--ghost" type="button" data-details>Ver detalhes</button>' +
      (detailsOpen ? '<div class="autofill__details">' + details + "</div>" : "");
  }

  function fieldHtml(label, value, extra) {
    return (
      '<div class="field' +
      (extra || "") +
      '"><div><p class="field__k">' +
      label +
      '</p><p class="field__v' +
      (label.indexOf("Operação") >= 0 ? " is-op" : "") +
      '">' +
      value +
      '</p></div><button class="field__copy" type="button" data-copy="' +
      value +
      '" aria-label="Copiar">' +
      ICO +
      "</button></div>"
    );
  }

  function paintPanel() {
    var principal = person("person-principal");
    var cnh = operation.documents[0];
    $("[data-main-fields]").innerHTML =
      fieldHtml("Nome do Cliente", principal.name) +
      fieldHtml("Nome do Produto", operation.product) +
      fieldHtml("Número da Operação", operation.id);
    $("[data-cnh-fields]").innerHTML =
      fieldHtml("Nome do Titular", cnh.extracted.name) +
      fieldHtml("CPF", cnh.extracted.cpf) +
      fieldHtml("Data de Nascimento", cnh.extracted.birthDate) +
      fieldHtml("Validade", cnh.extracted.validity) +
      fieldHtml("Categoria", cnh.extracted.category);
    $("[data-requested]").innerHTML =
      fieldHtml("CPF", operation.requested.cpf, " is-card") +
      fieldHtml("Data de Nascimento", operation.requested.birthDate, " is-card") +
      fieldHtml("Telefone", operation.requested.phone, " is-card") +
      fieldHtml("E-mail", operation.requested.email, " is-card") +
      fieldHtml("CEP", operation.requested.cep, " is-card") +
      fieldHtml("Endereço", operation.requested.street + ", " + operation.requested.number, " is-card") +
      fieldHtml("Bairro", operation.requested.neighborhood, " is-card") +
      fieldHtml("Cidade", operation.requested.city, " is-card") +
      fieldHtml("Estado", operation.requested.state, " is-card");
    $$(".doc__file").forEach(function (el) {
      el.innerHTML = FILE;
    });
    $$("[data-chev]").forEach(function (el) {
      el.innerHTML = CHEV;
    });
    paintAutofill();
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-copy], [data-fill], [data-details], [data-next], [data-doc], [data-sec]");
    if (!t) return;
    if (t.hasAttribute("data-copy")) {
      copy(t.getAttribute("data-copy"), t);
      return;
    }
    if (t.hasAttribute("data-fill")) {
      fillStep();
      return;
    }
    if (t.hasAttribute("data-details")) {
      detailsOpen = !detailsOpen;
      paintAutofill();
      return;
    }
    if (t.hasAttribute("data-next")) {
      if (step === "applicant-data") setBankStep("address");
      else toast("Protótipo: só os dois primeiros steps.");
      return;
    }
    if (t.hasAttribute("data-doc")) {
      var body = t.parentElement.querySelector(".doc__body");
      if (body) body.hidden = !body.hidden;
      return;
    }
    if (t.hasAttribute("data-sec")) {
      var pad = t.parentElement.querySelector(".sec__pad");
      if (pad) pad.hidden = !pad.hidden;
    }
  });

  paintPanel();
})();
