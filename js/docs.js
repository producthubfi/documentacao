(function () {
  var catalog = window.HF_CATALOG;
  var stage = document.getElementById("docs-stage");
  var nav = document.getElementById("docs-nav");
  var filter = document.getElementById("docs-filter-input");

  if (!catalog || !stage || !nav) return;

  function slug() {
    var hash = (location.hash || "").replace(/^#\/?/, "");
    hash = hash.split("?")[0];
    return hash || "home";
  }

  function iconBox(name) {
    return window.hfIconBox ? window.hfIconBox(name) : "";
  }

  function navIco(name) {
    if (!window.hfIcon) return "";
    return '<span class="docs-nav-ico" aria-hidden="true">' + window.hfIcon(name, 16) + "</span>";
  }

  var ITEM_ICONS = {
    home: "house",
    cores: "palette",
    tipografia: "type",
    icones: "smile",
    logos: "hexagon",
    search: "search",
    input: "text-cursor-input",
    textarea: "text",
    select: "chevrons-up-down",
    checkbox: "square-check",
    radio: "circle-dot",
    switch: "toggle-right",
    label: "tag",
    upload: "upload",
    button: "mouse-pointer-click",
    chip: "badge",
    "select-button": "panel-top",
    alert: "circle-alert",
    badge: "award",
    toast: "bell",
    tooltip: "message-circle",
    progress: "loader",
    skeleton: "rectangle-horizontal",
    accordion: "chevrons-down-up",
    breadcrumb: "ellipsis",
    tabs: "layout-panel-top",
    pagination: "chevrons-left-right",
    header: "panel-top",
    sidebar: "panel-left",
    stepper: "list-ordered",
    "dropdown-menu": "menu",
    modal: "app-window",
    dialog: "message-square",
    popover: "square-mouse-pointer",
    sheet: "panel-bottom",
    avatar: "circle-user",
    card: "rectangle-horizontal",
    "card-select": "layout-grid",
    "card-file": "file",
    "card-comments": "messages-square",
    table: "table-2",
    "list-item": "list",
    separator: "minus",
    slider: "sliders-horizontal",
    operations: "kanban",
    section: "layout-dashboard",
    "rich-text": "pilcrow",
    prototipos: "clipboard-list",
    "abertura-operacao": "plus",
    "cadastro-cliente": "user-plus",
    "edicao-cliente": "user-round-pen",
    "link-publico": "link",
    "formulario-publico": "clipboard-pen",
    "detalhes-operacao": "file-search",
    "operacao-outro-canal": "circle-off",
    "dashboard-operacoes": "layout-dashboard",
  };

  function itemIcon(slug, fallback) {
    return ITEM_ICONS[slug] || fallback || "file";
  }

  var openGroups = {};
  var tocOnScroll = null;

  function navLink(href, slugAttr, label, icon, hidden) {
    return (
      '<a href="' +
      href +
      '" data-slug="' +
      slugAttr +
      '"' +
      (hidden ? ' class="is-hidden"' : "") +
      ">" +
      navIco(icon) +
      "<span>" +
      label +
      "</span></a>"
    );
  }

  function navGroup(id, label, links, extraClass, forceOpen) {
    var open = forceOpen !== false && openGroups[id] !== false;
    return (
      '<div class="docs-nav-group' +
      (open ? " is-open" : "") +
      (extraClass ? " " + extraClass : "") +
      '" data-group="' +
      id +
      '"><button type="button" class="docs-nav-toggle" aria-expanded="' +
      (open ? "true" : "false") +
      '"><span>' +
      label +
      "</span>" +
      (window.hfIcon ? window.hfIcon("chevron-down", 14) : "") +
      '</button><div class="docs-nav-list">' +
      links +
      "</div></div>"
    );
  }

  var PROTO_NAV = [
    { slug: "prototipos", label: "Briefings", icon: "clipboard-list" },
    { slug: "abertura-operacao", label: "Abertura de operação", icon: "plus" },
    { slug: "cadastro-cliente", label: "Cadastro de cliente", icon: "user-plus" },
    { slug: "edicao-cliente", label: "Edição de cliente", icon: "user-round-pen" },
    { slug: "link-publico", label: "Link público", icon: "link" },
    { slug: "formulario-publico", label: "Formulário público", icon: "clipboard-pen" },
    { slug: "detalhes-operacao", label: "Detalhes da operação", icon: "file-search" },
    { slug: "operacao-outro-canal", label: "Operação encerrada", icon: "circle-off" },
    { slug: "dashboard-operacoes", label: "Dashboard de operações", icon: "layout-dashboard" },
    { href: "extensao/", label: "Extensão · Itaú", icon: "puzzle" },
    { href: "extensao/spec.html", label: "Spec · 5 bancos", icon: "list-checks" },
    { href: "dashboards/hubfi-painel-empresas.html", label: "Painel empresas", icon: "building-2" },
    { href: "dashboards/como-ler.html", label: "Como ler os dados", icon: "chart-line" },
    { href: "dashboards/capital-insider.html", label: "Capital Insider", icon: "mic" },
    { href: "corban.html", label: "LP Correspondentes", icon: "store" },
  ];

  function protoMatch(q) {
    if (!q) return true;
    var keys = [
      "protótipos",
      "prototipos",
      "briefing",
      "unicidade",
      "pausado",
      "pausa",
      "extensão",
      "extensao",
      "itau",
      "itaú",
      "spec",
      "bancos",
    ];
    return keys.some(function (key) {
      return key.indexOf(q) !== -1;
    });
  }

  function protoItemMatch(item, q) {
    if (!q) return true;
    var hay = (item.label + " " + (item.slug || "") + " " + (item.href || "")).toLowerCase();
    return hay.indexOf(q) !== -1 || protoMatch(q);
  }

  function renderNav() {
    var q = filter && filter.value ? filter.value.toLowerCase().trim() : "";
    var current = slug();
    var html = "";

    html += navGroup(
      "docs",
      "Documentação",
      navLink("#/", "home", "Visão geral", "house", !!(q && "visão geral documentacao documentação visao".indexOf(q) === -1)),
      "",
      !q ? openGroups.docs !== false : true
    );

    if (catalog.foundations && catalog.foundations.length) {
      var fLinks = "";
      var fVisible = 0;
      var fActive = false;
      catalog.foundations.forEach(function (item) {
        var match = !q || item[0].indexOf(q) !== -1 || item[1].toLowerCase().indexOf(q) !== -1;
        if (match) fVisible += 1;
        if (item[0] === current) fActive = true;
        fLinks += navLink("#/" + item[0], item[0], item[1], item[2] || itemIcon(item[0], "swatch-book"), !match);
      });
      if (!q || fVisible) html += navGroup("foundations", "Foundations", fLinks, "", !q ? openGroups.foundations !== false : true);
    }
    catalog.groups.forEach(function (group) {
      if (group.nav === "single" || group.id === "prototipos") return;
      var links = "";
      var visible = 0;
      var active = false;
      group.items.forEach(function (item) {
        var match = !q || item[0].indexOf(q) !== -1 || item[1].toLowerCase().indexOf(q) !== -1;
        if (match) visible += 1;
        if (item[0] === current) active = true;
        links += navLink("#/" + item[0], item[0], item[1], itemIcon(item[0], group.icon), !match);
      });
      if (!q || visible) html += navGroup(group.id, group.label, links, "", !q ? openGroups[group.id] !== false : true);
    });
    var protoLinks = "";
    var protoVisible = 0;
    var protoActive = false;
    PROTO_NAV.forEach(function (item) {
      var match = protoItemMatch(item, q);
      if (match) protoVisible += 1;
      if (item.slug && item.slug === current) protoActive = true;
      protoLinks += navLink(
        item.href || "#/" + item.slug,
        item.slug || "",
        item.label,
        item.icon || "layers-2",
        !match
      );
    });
    if (!q || protoVisible) html += navGroup("prototipos", "Protótipos", protoLinks, "docs-nav-group--end", !q ? openGroups.prototipos !== false : true);
    nav.innerHTML = html;
    highlight();
    bindNav();
  }

  function bindNav() {
    nav.querySelectorAll(".docs-nav-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var group = btn.closest(".docs-nav-group");
        if (!group) return;
        var open = group.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        var id = group.getAttribute("data-group");
        if (id) openGroups[id] = open;
      });
    });
  }

  function highlight() {
    var current = slug();
    if (current !== "home" && !catalog.pages[current]) current = "home";
    nav.querySelectorAll("a").forEach(function (link) {
      var slugAttr = link.getAttribute("data-slug");
      link.classList.toggle("is-active", !!slugAttr && slugAttr === current);
    });
    nav.querySelectorAll(".docs-nav-group").forEach(function (group) {
      if (!group.querySelector("a.is-active")) return;
      group.classList.add("is-open");
      var btn = group.querySelector(".docs-nav-toggle");
      if (btn) btn.setAttribute("aria-expanded", "true");
    });
  }

  function headingId(text, index) {
    var id =
      String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "sec";
    return "docs-" + id + (index ? "-" + index : "");
  }

  function renderToc(isScreen) {
    var toc = document.getElementById("docs-toc");
    var main = document.querySelector(".docs-main");
    if (tocOnScroll) {
      window.removeEventListener("scroll", tocOnScroll);
      tocOnScroll = null;
    }
    if (!toc || !main) return;
    if (isScreen) {
      toc.hidden = true;
      toc.innerHTML = "";
      main.classList.remove("docs-main--toc");
      return;
    }
    var headings = Array.prototype.slice.call(stage.querySelectorAll(".docs-h2"));
    if (headings.length < 2) {
      toc.hidden = true;
      toc.innerHTML = "";
      main.classList.remove("docs-main--toc");
      return;
    }
    var used = {};
    var html =
      '<p class="docs-toc__title">' +
      navIco("align-left") +
      "<span>Nesta página</span></p>";
    headings.forEach(function (heading, index) {
      var text = heading.textContent.trim();
      var id = headingId(text, 0);
      if (used[id]) id = headingId(text, index + 1);
      used[id] = true;
      heading.id = id;
      html +=
        '<a href="#/' +
        slug() +
        '" data-toc="' +
        id +
        '">' +
        text +
        "</a>";
    });
    toc.innerHTML = html;
    toc.hidden = false;
    main.classList.add("docs-main--toc");
    var links = toc.querySelectorAll("a[data-toc]");
    toc.onclick = function (event) {
      var link = event.target.closest("a[data-toc]");
      if (!link) return;
      event.preventDefault();
      var target = document.getElementById(link.getAttribute("data-toc"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    tocOnScroll = function () {
      var current = headings[0];
      headings.forEach(function (heading) {
        if (heading.getBoundingClientRect().top <= 88) current = heading;
      });
      links.forEach(function (link) {
        link.classList.toggle("is-active", !!(current && link.getAttribute("data-toc") === current.id));
      });
    };
    window.addEventListener("scroll", tocOnScroll, { passive: true });
    tocOnScroll();
  }

  function render() {
    var current = slug();
    var isHome = current === "home" || !catalog.pages[current];
    var page = isHome ? catalog.home : catalog.pages[current];
    var isScreen = page.section === "Telas" || current === "detalhes-operacao";
    var isProtoHub = current === "prototipos";
    var isFoundation = !!(catalog.foundations || []).some(function (item) {
      return item[0] === current;
    });
    var app = document.querySelector(".docs-app");
    if (app) app.classList.toggle("docs-app--screen", !!(isScreen && !isHome));
    var back = document.getElementById("docs-back");
    if (back) {
      back.setAttribute("href", isScreen && !isHome ? "#/prototipos" : "#/");
      back.innerHTML =
        (window.hfIcon ? window.hfIcon("arrow-left", 16) : "") + "Voltar";
    }
    var crumb;
    if (isHome) {
      crumb = '<nav class="docs-crumb"><span>Documentação</span></nav>';
    } else if (isProtoHub) {
      crumb =
        '<nav class="docs-crumb"><a href="#/">Documentação</a><span aria-hidden="true">/</span><span>PROTÓTIPOS</span></nav>';
    } else if (isScreen) {
      crumb =
        '<nav class="docs-crumb"><a href="#/">Documentação</a><span aria-hidden="true">/</span><a href="#/prototipos">PROTÓTIPOS</a><span aria-hidden="true">/</span><span>' +
        page.title +
        "</span></nav>";
    } else {
      crumb =
        '<nav class="docs-crumb"><a href="#/">Documentação</a><span aria-hidden="true">/</span><span>' +
        (isFoundation ? "Foundations" : "Componentes") +
        '</span><span aria-hidden="true">/</span><span>' +
        page.title +
        "</span></nav>";
    }

    stage.classList.toggle("docs-stage--wide", !!(page.wide && !isHome));
    stage.innerHTML =
      isScreen && !isHome
        ? page.html()
        : '<div class="docs-page-head' +
          (isHome ? " docs-page-head--home" : "") +
          (page.wide ? " docs-page-head--wide" : "") +
          '">' +
          crumb +
          '<h1 class="docs-h1">' +
          page.title +
          "</h1>" +
          (page.leadHtml || '<p class="docs-lead">' + page.lead + "</p>") +
          "</div>" +
          page.html();

    document.title = isHome ? "HubFi DS · Documentação" : page.title + " · HubFi DS";
    highlight();
    bind();
    renderToc(!!(isScreen && !isHome));
    window.scrollTo(0, 0);
    if (tocOnScroll) tocOnScroll();
  }

  // Agrupa as variações de um preview em abas. Sem isso os exemplos viram um
  // mosaico solto, com tamanhos diferentes disputando espaço na mesma linha.
  function tabifyVariants() {
    stage.querySelectorAll(".docs-preview").forEach(function (preview) {
      var children = Array.prototype.slice.call(preview.children);
      var cells = children.filter(function (el) {
        return el.classList.contains("docs-cell");
      });
      if (cells.length < 2 || cells.length !== children.length) return;

      var bar = document.createElement("div");
      bar.className = "docs-tabs__bar";
      bar.setAttribute("role", "tablist");

      var body = document.createElement("div");
      body.className = "docs-tabs__stage";

      function addTab(label, content) {
        var tab = document.createElement("button");
        tab.type = "button";
        tab.className = "docs-tabs__tab";
        tab.setAttribute("role", "tab");
        tab.textContent = label;

        var panel = document.createElement("div");
        panel.className = "docs-tabs__panel";
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-label", label);
        panel.appendChild(content);

        tab.addEventListener("click", function () {
          bar.querySelectorAll(".docs-tabs__tab").forEach(function (other) {
            other.classList.remove("is-active");
            other.setAttribute("aria-selected", "false");
          });
          body.querySelectorAll(".docs-tabs__panel").forEach(function (other) {
            other.classList.remove("is-active");
          });
          tab.classList.add("is-active");
          tab.setAttribute("aria-selected", "true");
          panel.classList.add("is-active");
        });

        bar.appendChild(tab);
        body.appendChild(panel);
        return tab;
      }

      // A primeira aba mostra todas as variações num grid alinhado, para poder
      // comparar; as demais isolam uma variação de cada vez.
      var overview = document.createElement("div");
      overview.className = "docs-allvars";
      var overviewTab = addTab("Todas", overview);

      cells.forEach(function (cell, i) {
        var meta = cell.querySelector(".docs-meta");
        var label = meta ? meta.textContent : "Variação " + (i + 1);
        if (meta) meta.remove();

        var item = document.createElement("div");
        item.className = "docs-allvars__item";
        var caption = document.createElement("p");
        caption.className = "docs-allvars__label";
        caption.textContent = label;
        var slot = document.createElement("div");
        slot.className = "docs-allvars__body";
        Array.prototype.forEach.call(cell.children, function (child) {
          slot.appendChild(child.cloneNode(true));
        });
        item.appendChild(caption);
        item.appendChild(slot);
        overview.appendChild(item);

        // A aba isolada repete o nome da variação: o rótulo da aba some de vista
        // quando a pessoa rola até o componente.
        var single = document.createElement("div");
        single.className = "docs-tabs__single";
        var singleCaption = document.createElement("p");
        singleCaption.className = "docs-allvars__label";
        singleCaption.textContent = label;
        single.appendChild(singleCaption);
        while (cell.firstChild) single.appendChild(cell.firstChild);
        addTab(label, single);
      });

      overviewTab.click();

      var wrap = document.createElement("div");
      wrap.className = "docs-tabs";
      wrap.appendChild(bar);
      wrap.appendChild(body);

      preview.innerHTML = "";
      preview.appendChild(wrap);
      preview.classList.add("docs-preview--tabbed");
    });
  }

  function bind() {
    tabifyVariants();

    stage.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var value = btn.getAttribute("data-copy");
        if (!value || !navigator.clipboard) return;
        navigator.clipboard.writeText(value).then(function () {
          btn.classList.add("is-copied");
          window.setTimeout(function () {
            btn.classList.remove("is-copied");
          }, 1200);
        });
      });
    });

    var iconSearch = stage.querySelector("#docs-icon-search");
    var iconGrid = stage.querySelector("#docs-icon-grid");
    var iconCount = stage.querySelector("#docs-icon-count");
    if (iconSearch && iconGrid) {
      var tiles = iconGrid.querySelectorAll(".docs-icon");
      function filterIcons() {
        var q = iconSearch.value.toLowerCase().trim();
        var visible = 0;
        tiles.forEach(function (tile) {
          var match = !q || (tile.getAttribute("data-icon") || "").indexOf(q) !== -1;
          tile.classList.toggle("is-hidden", !match);
          if (match) visible += 1;
        });
        if (iconCount) iconCount.textContent = visible + " de " + tiles.length;
      }
      iconSearch.addEventListener("input", filterIcons);
      filterIcons();
    }

    stage.querySelectorAll("[data-accordion]").forEach(function (root) {
      root.querySelectorAll(".hf-accordion__trigger").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var item = btn.closest(".hf-accordion__item");
          var open = item.classList.toggle("is-open");
          btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
      });
    });

    stage.querySelectorAll("[data-switch]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var on = btn.classList.toggle("is-on");
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });

    stage.querySelectorAll("[data-nav-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var screen = btn.closest(".docs-screen");
        var nav = screen && screen.querySelector(".hf-app-nav");
        if (!nav) return;
        var collapsed = nav.classList.toggle("hf-app-nav--collapsed");
        btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
        btn.setAttribute("aria-label", collapsed ? "Expandir menu" : "Recolher menu");
      });
    });

    stage.querySelectorAll("[data-tabs]").forEach(function (root) {
      root.querySelectorAll(".hf-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          root.querySelectorAll(".hf-tab").forEach(function (other) {
            other.classList.remove("is-active");
            var img = other.querySelector(".hf-tab__ico img") || other.querySelector("img");
            if (img) img.src = "assets/icons/tab-icon-off.svg";
          });
          tab.classList.add("is-active");
          var activeImg = tab.querySelector(".hf-tab__ico img") || tab.querySelector("img");
          if (activeImg) activeImg.src = "assets/icons/tab-icon.svg";
        });
      });
    });

    stage.querySelectorAll("[data-chip]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.classList.toggle("hf-chip--selected");
      });
    });

    stage.querySelectorAll("[data-card-select]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var parent = btn.parentElement;
        parent.querySelectorAll("[data-card-select]").forEach(function (other) {
          other.classList.remove("is-selected");
        });
        btn.classList.add("is-selected");
      });
    });

    stage.querySelectorAll("[data-select-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var parent = btn.parentElement;
        parent.querySelectorAll("[data-select-btn]").forEach(function (other) {
          other.classList.remove("is-selected");
        });
        btn.classList.add("is-selected");
      });
    });

    stage.querySelectorAll("[data-open-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var overlay = stage.querySelector("[data-overlay]");
        if (overlay) overlay.classList.add("is-open");
      });
    });

    stage.querySelectorAll("[data-overlay]").forEach(function (overlay) {
      overlay.addEventListener("click", function (event) {
        if (event.target === overlay) overlay.classList.remove("is-open");
      });
      overlay.querySelectorAll("[data-modal-close]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          overlay.classList.remove("is-open");
        });
      });
    });

    stage.querySelectorAll("[data-alert-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var box = btn.closest(".hf-alert, .hf-toast");
        if (box) box.style.display = "none";
      });
    });

    stage.querySelectorAll(".hf-slider").forEach(function (input) {
      function paint() {
        input.style.setProperty("--hf-slider-fill", input.value + "%");
      }
      input.addEventListener("input", paint);
      paint();
    });

    stage.querySelectorAll("[data-pager], .hf-pager:not(.hf-pager--arrows)").forEach(function (root) {
      root.querySelectorAll("button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.textContent === "‹" || btn.textContent === "›") return;
          root.querySelectorAll("button").forEach(function (other) {
            other.classList.remove("is-current");
          });
          btn.classList.add("is-current");
        });
      });
    });

    stage.querySelectorAll("[data-indeterminate]").forEach(function (input) {
      input.indeterminate = true;
    });

    stage.querySelectorAll("[data-select]").forEach(wireSelect);
    if (window.HF_SCREENS && typeof window.HF_SCREENS.bind === "function") {
      window.HF_SCREENS.bind(stage);
    }
  }

  function closeSelects(except) {
    stage.querySelectorAll("[data-select].is-open").forEach(function (field) {
      if (field === except) return;
      field.classList.remove("is-open");
      var trigger = field.querySelector(".hf-field__control");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
    stage.querySelectorAll(".docs-preview.is-select-open").forEach(function (box) {
      if (except && box.contains(except)) return;
      box.classList.remove("is-select-open");
    });
  }

  function wireSelect(field) {
    var trigger = field.querySelector(".hf-field__control");
    var value = field.querySelector(".hf-field__value");
    var menu = field.querySelector(".hf-select-menu");
    if (!trigger || !menu || !value) return;
    var type = field.getAttribute("data-select-type") || "default";
    var items = Array.prototype.slice.call(menu.querySelectorAll(".hf-select-menu__item"));
    var search = menu.querySelector(".hf-search__field");
    var box = field.closest(".docs-preview");

    function itemLabel(item) {
      return item.getAttribute("data-label") || item.textContent.trim();
    }

    function open() {
      closeSelects(field);
      // A lista flutua: ancora logo abaixo do campo, sem contar o rótulo nem o
      // texto de erro que também vivem dentro do .hf-field.
      menu.style.top = trigger.offsetTop + trigger.offsetHeight + 4 + "px";
      if (box) box.classList.add("is-select-open");
      field.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      if (search) search.focus();
      else {
        var current = menu.querySelector(".hf-select-menu__item.is-active") || items[0];
        if (current) current.focus();
      }
    }

    function close(refocus) {
      field.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      if (box) box.classList.remove("is-select-open");
      if (refocus) trigger.focus();
    }

    function setValue(text, filled) {
      value.textContent = text;
      value.classList.toggle("hf-field__value--placeholder", !filled);
    }

    function syncChecks() {
      var picked = items
        .filter(function (item) {
          var input = item.querySelector("input[type='checkbox']");
          return input && input.checked;
        })
        .map(itemLabel);
      items.forEach(function (item) {
        var input = item.querySelector("input[type='checkbox']");
        var on = !!(input && input.checked);
        item.classList.toggle("is-active", on);
        item.setAttribute("aria-selected", on ? "true" : "false");
      });
      setValue(picked.length ? picked.join(", ") : "Selecione", picked.length > 0);
    }

    function choose(item) {
      items.forEach(function (other) {
        other.classList.remove("is-active");
        other.setAttribute("aria-selected", "false");
        var radio = other.querySelector("input[type='radio']");
        if (radio) radio.checked = other === item;
      });
      item.classList.add("is-active");
      item.setAttribute("aria-selected", "true");
      setValue(itemLabel(item), true);
      close(true);
    }

    function move(from, step) {
      var next = items[items.indexOf(from) + step];
      if (next) next.focus();
    }

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      if (field.classList.contains("is-open")) close(false);
      else open();
    });

    trigger.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        open();
      }
    });

    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    if (search) {
      search.addEventListener("click", function (event) {
        event.stopPropagation();
      });
      search.addEventListener("input", function () {
        var q = search.value.toLowerCase();
        items.forEach(function (item) {
          var text = itemLabel(item).toLowerCase();
          item.hidden = !!(q && text.indexOf(q) === -1);
        });
      });
    }

    items.forEach(function (item) {
      item.addEventListener("click", function (event) {
        event.stopPropagation();
        if (type === "checkbox") {
          var check = item.querySelector("input[type='checkbox']");
          if (check && event.target !== check) check.checked = !check.checked;
          syncChecks();
          return;
        }
        if (type === "radio") {
          var radio = item.querySelector("input[type='radio']");
          if (radio) radio.checked = true;
        }
        choose(item);
      });
      item.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (type === "checkbox") {
            var check = item.querySelector("input[type='checkbox']");
            if (check) check.checked = !check.checked;
            syncChecks();
            return;
          }
          choose(item);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          move(item, 1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          move(item, -1);
        } else if (event.key === "Escape" || event.key === "Tab") {
          close(true);
        }
      });
    });
  }

  document.addEventListener("click", function () {
    closeSelects(null);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSelects(null);
  });

  if (filter) {
    filter.addEventListener("input", renderNav);
  }

  window.addEventListener("hashchange", render);
  renderNav();
  render();
})();
