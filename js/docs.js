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

  function navGroup(label, icon, links) {
    return (
      '<div class="docs-nav-group"><p class="docs-nav-label">' +
      iconBox(icon) +
      "<span>" +
      label +
      "</span></p>" +
      links +
      "</div>"
    );
  }

  function protoMatch(q) {
    if (!q) return true;
    var keys = ["protótipos", "prototipos", "briefing", "unicidade", "pausado", "pausa"];
    return keys.some(function (key) {
      return key.indexOf(q) !== -1;
    });
  }

  function renderNav() {
    var q = filter && filter.value ? filter.value.toLowerCase().trim() : "";
    var html = navGroup("Documentação", "book-open", '<a href="#/" data-slug="home">Visão geral</a>');
    html +=
      '<div class="docs-nav-group docs-nav-group--proto"' +
      (protoMatch(q) ? "" : ' hidden') +
      '><a href="#/prototipos" data-slug="prototipos" class="docs-nav-proto">' +
      iconBox("layers-2") +
      "<span>PROTÓTIPOS</span></a></div>";
    if (catalog.foundations && catalog.foundations.length) {
      var fLinks = "";
      var fVisible = 0;
      catalog.foundations.forEach(function (item) {
        var match = !q || item[0].indexOf(q) !== -1 || item[1].toLowerCase().indexOf(q) !== -1;
        if (match) fVisible += 1;
        fLinks +=
          '<a href="#/' +
          item[0] +
          '" data-slug="' +
          item[0] +
          '"' +
          (match ? "" : ' class="is-hidden"') +
          ">" +
          item[1] +
          "</a>";
      });
      if (!q || fVisible) html += navGroup("Foundations", "swatch-book", fLinks);
    }
    catalog.groups.forEach(function (group) {
      if (group.nav === "single" || group.id === "prototipos") return;
      var links = "";
      var visible = 0;
      group.items.forEach(function (item) {
        var match = !q || item[0].indexOf(q) !== -1 || item[1].toLowerCase().indexOf(q) !== -1;
        if (match) visible += 1;
        links +=
          '<a href="#/' +
          item[0] +
          '" data-slug="' +
          item[0] +
          '"' +
          (match ? "" : ' class="is-hidden"') +
          ">" +
          item[1] +
          "</a>";
      });
      if (!q || visible) html += navGroup(group.label, group.icon, links);
    });
    nav.innerHTML = html;
    highlight();
  }

  function highlight() {
    var current = slug();
    if (current !== "home" && !catalog.pages[current]) current = "home";
    var page = catalog.pages[current];
    var protoOn = current === "prototipos" || !!(page && page.section === "Telas");
    nav.querySelectorAll("a").forEach(function (link) {
      var slugAttr = link.getAttribute("data-slug");
      var active = slugAttr === "prototipos" ? protoOn : slugAttr === current;
      link.classList.toggle("is-active", active);
    });
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
    window.scrollTo(0, 0);
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
