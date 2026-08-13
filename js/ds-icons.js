(function () {
  var data = window.HF_ICON_DATA || { width: 24, height: 24, icons: {} };

  window.hfIcon = function (name, size) {
    size = size || 24;
    var body = data.icons[name];
    if (!body) return "";
    return (
      '<svg class="hf-icon" width="' +
      size +
      '" height="' +
      size +
      '" viewBox="0 0 ' +
      data.width +
      " " +
      data.height +
      '" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      body +
      "</svg>"
    );
  };

  window.hfIconBox = function (name) {
    if (!name || !window.hfIcon) return "";
    return '<span class="docs-ico" aria-hidden="true">' + window.hfIcon(name, 20) + "</span>";
  };

  var catalog = window.HF_CATALOG;
  if (!catalog) return;

  var names = Object.keys(data.icons).sort();

  catalog.pages.icones = {
    title: "Ícones",
    lead: "Biblioteca ICONS do HubFi — Lucide. Use o nome do ícone no Figma e no código. Clique para copiar.",
    node: null,
    html: function () {
      var used = ["check", "x", "search", "info", "circle-alert", "chevron-right", "chevron-down", "copy", "plus", "bell"];
      var usedHtml = used
        .filter(function (name) {
          return data.icons[name];
        })
        .map(function (name) {
          return iconTile(name);
        })
        .join("");
      var all = names
        .map(function (name) {
          return iconTile(name);
        })
        .join("");
      return (
        '<section class="docs-board"><div class="docs-board__copy"><h2 class="docs-h2">Nos componentes</h2><p class="docs-board__desc">Ícones da biblioteca ICONS que o produto já usa — começando pelo check do Toast.</p></div><div class="docs-icon-grid">' +
        usedHtml +
        "</div></section>" +
        '<section class="docs-board"><div class="docs-board__copy"><h2 class="docs-h2">Biblioteca</h2><p class="docs-board__desc">' +
        names.length +
        ' ícones. O nome é o mesmo do componente no Figma (ICONS / check). No código: <code>hfIcon("check", 16)</code>.</p></div>' +
        '<div class="docs-icon-tools"><input class="docs-icon-search" id="docs-icon-search" type="search" placeholder="Buscar ícone — check, x, search…" aria-label="Buscar ícones"><p class="docs-icon-count" id="docs-icon-count"></p></div>' +
        '<div class="docs-icon-grid" id="docs-icon-grid">' +
        all +
        "</div></section>"
      );
    },
  };

  function iconTile(name) {
    return (
      '<button class="docs-icon" type="button" data-copy="' +
      name +
      '" data-icon="' +
      name +
      '">' +
      window.hfIcon(name, 24) +
      "<span>" +
      name +
      "</span></button>"
    );
  }
})();
