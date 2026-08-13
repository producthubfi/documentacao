(function () {
  var catalog = window.HF_CATALOG;
  var stage = document.getElementById("docs-stage");
  var nav = document.getElementById("docs-nav");
  var filter = document.getElementById("docs-filter-input");

  if (!catalog || !stage || !nav) return;

  function slug() {
    var hash = (location.hash || "").replace(/^#\/?/, "");
    return hash || "home";
  }

  function renderNav() {
    var q = filter && filter.value ? filter.value.toLowerCase().trim() : "";
    var html = '<p class="docs-nav-label">Documentação</p>';
    html += '<a href="#/" data-slug="home">Visão geral</a>';
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
      if (!q || fVisible) html += '<p class="docs-nav-label">Foundations</p>' + fLinks;
    }
    catalog.groups.forEach(function (group) {
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
      if (!q || visible) {
        html += '<p class="docs-nav-label">' + group.label + "</p>" + links;
      }
    });
    nav.innerHTML = html;
    highlight();
  }

  function highlight() {
    var current = slug();
    if (current !== "home" && !catalog.pages[current]) current = "home";
    nav.querySelectorAll("a").forEach(function (link) {
      var active = link.getAttribute("data-slug") === current;
      link.classList.toggle("is-active", active);
    });
  }

  function render() {
    var current = slug();
    var isHome = current === "home" || !catalog.pages[current];
    var page = isHome ? catalog.home : catalog.pages[current];
    var isFoundation = !!(catalog.foundations || []).some(function (item) {
      return item[0] === current;
    });
    var crumb = isHome
      ? '<nav class="docs-crumb"><span>Documentação</span></nav>'
      : '<nav class="docs-crumb"><a href="#/">Documentação</a><span aria-hidden="true">/</span><span>' +
        (isFoundation ? "Foundations" : "Componentes") +
        '</span><span aria-hidden="true">/</span><span>' +
        page.title +
        "</span></nav>";

    stage.innerHTML =
      '<div class="docs-page-head' +
      (isHome ? " docs-page-head--home" : "") +
      '">' +
      crumb +
      '<h1 class="docs-h1">' +
      page.title +
      "</h1>" +
      '<p class="docs-lead">' +
      page.lead +
      "</p></div>" +
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
    var items = Array.prototype.slice.call(menu.querySelectorAll(".hf-select-menu__item"));
    var box = field.closest(".docs-preview");

    function open() {
      closeSelects(field);
      // A lista flutua: ancora logo abaixo do campo, sem contar o rótulo nem o
      // texto de erro que também vivem dentro do .hf-field.
      menu.style.top = trigger.offsetTop + trigger.offsetHeight + 4 + "px";
      if (box) box.classList.add("is-select-open");
      field.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      var current = menu.querySelector(".hf-select-menu__item.is-active") || items[0];
      if (current) current.focus();
    }

    function close(refocus) {
      field.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      if (box) box.classList.remove("is-select-open");
      if (refocus) trigger.focus();
    }

    function choose(item) {
      items.forEach(function (other) {
        other.classList.remove("is-active");
        other.setAttribute("aria-selected", "false");
      });
      item.classList.add("is-active");
      item.setAttribute("aria-selected", "true");
      value.textContent = item.textContent;
      value.classList.remove("hf-field__value--placeholder");
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

    items.forEach(function (item) {
      item.addEventListener("click", function (event) {
        event.stopPropagation();
        choose(item);
      });
      item.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
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
