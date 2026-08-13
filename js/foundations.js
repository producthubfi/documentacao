(function () {
  var catalog = window.HF_CATALOG;
  if (!catalog) return;

  var FIGMA_F = "https://www.figma.com/design/oeQ6gsy0oaYES95JjT4q9Q?node-id=";

  function colorCard(name, token, hex) {
    return (
      '<button class="docs-color" type="button" data-copy="' +
      hex +
      '" style="--swatch:' +
      hex +
      '"><span class="docs-color__chip" aria-hidden="true"></span><strong>' +
      name +
      "</strong><span>" +
      hex +
      '</span><code>' +
      token +
      "</code></button>"
    );
  }

  function palette(title, desc, items) {
    return (
      '<section class="docs-board"><div class="docs-board__copy"><h2 class="docs-h2">' +
      title +
      "</h2>" +
      (desc ? '<p class="docs-board__desc">' + desc + "</p>" : "") +
      '</div><div class="docs-palette">' +
      items
        .map(function (item) {
          return colorCard(item[0], item[1], item[2]);
        })
        .join("") +
      "</div></section>"
    );
  }

  function typeRow(name, token, sample, cls) {
    return (
      '<div class="docs-type"><p class="' +
      cls +
      '">' +
      sample +
      '</p><div class="docs-type__meta"><strong>' +
      name +
      "</strong><span>" +
      token +
      "</span></div></div>"
    );
  }

  catalog.foundations = [
    ["cores", "Cores"],
    ["tipografia", "Tipografia"],
    ["logos", "Logos"],
  ];

  catalog.pages.cores = {
    title: "Cores",
    lead: "Primitivas e semânticas do arquivo DS · Foundations. Clique no cartão para copiar o hex.",
    node: "1-386",
    figmaFile: FIGMA_F,
    html: function () {
      return (
        palette("Primary", "A escala teal da marca. 500 é o default da plataforma; 600 entra no hover.", [
          ["50", "--primary-50", "#ecfbf9"],
          ["100 / subtle", "--primary-subtle", "#d9f5f1"],
          ["Lighter", "--primary-lighter", "#ebfffd"],
          ["400", "--primary-400", "#2fc0b1"],
          ["500 / brand", "--primary-brand", "#00a396"],
          ["Default", "--primary-default", "#00a395"],
          ["600 / hover", "--primary-hover", "#008a7e"],
          ["800 / dark", "--primary-800", "#005c54"],
          ["900", "--primary-900", "#003d38"],
        ]) +
        palette("Neutral", "Cinzas frios da interface: fundo, borda, texto e ícone.", [
          ["0", "--neutral-0", "#ffffff"],
          ["50 / subtle", "--background-subtle", "#f5f5f5"],
          ["100", "--neutral-100", "#e0e1e1"],
          ["150", "--neutral-150", "#eaecec"],
          ["300", "--neutral-300", "#b6b9b9"],
          ["400", "--neutral-400", "#a1a5a5"],
          ["800", "--neutral-800", "#282a2a"],
          ["900", "--neutral-900", "#141515"],
        ]) +
        palette("Texto e borda", "Tokens semânticos. Preferir estes nomes no produto, não o hex cru.", [
          ["text/primary", "--text-primary", "#141414"],
          ["text/secondary", "--text-secondary", "#a8a8a8"],
          ["text/muted", "--text-muted", "#cccccc"],
          ["text/inverse", "--text-inverse", "#ffffff"],
          ["border/default", "--border-default", "#e3e3e3"],
          ["border/field", "--border-field", "#e3e3e3"],
        ]) +
        palette("Feedback", "Success, warning, error e info — estados da plataforma.", [
          ["success", "--success", "#0daf9f"],
          ["success/subtle", "--success-subtle", "#ccf5ef"],
          ["warning", "--warning", "#e7b008"],
          ["warning/subtle", "--warning-subtle", "#fff8db"],
          ["error", "--error", "#de3535"],
          ["error/dark", "--error-dark", "#af1d1d"],
          ["info", "--info", "#3672e2"],
          ["info/subtle", "--info-subtle", "#e4ecfb"],
        ])
      );
    },
  };

  catalog.pages.tipografia = {
    title: "Tipografia",
    lead: "Outfit em toda a plataforma. Uma família, pesos 400 / 500 / 600, escala fechada.",
    node: "1-479",
    figmaFile: FIGMA_F,
    html: function () {
      return (
        '<section class="docs-board"><div class="docs-board__copy"><h2 class="docs-h2">Família</h2><p class="docs-board__desc">Outfit no produto. Inter só aparece em artefatos de documentação do Figma, não na interface HubFi.</p></div><div class="docs-type-family"><p class="docs-type-family__name">Outfit</p><p class="docs-type-family__sample">AáBbCcDdEeFfGg 0123456789</p><p class="docs-type-family__meta">Regular 400 · Medium 500 · Semibold 600</p></div></section>' +
        '<section class="docs-board"><div class="docs-board__copy"><h2 class="docs-h2">Escala</h2><p class="docs-board__desc">Os text styles usados nos componentes. Line-height 1.45 no corpo, 1.5 em caption e título.</p></div><div class="docs-type-list">' +
        typeRow("Display", "Outfit Medium 36 / 1.15 · −0.03em", "Antecipação de recebíveis", "docs-type__display") +
        typeRow("Title", "Outfit Semibold 24 / 1.5", "Clientes da operação", "docs-type__title") +
        typeRow("Heading", "Outfit Medium 18 / 1.3", "Dados cadastrais", "docs-type__heading") +
        typeRow("Body 16", "Outfit Regular 16 / 1.5", "O valor cai na conta no mesmo dia útil.", "docs-type__body16") +
        typeRow("Body 14", "Outfit Regular 14 / 1.45", "Confirme os dados do contrato antes de enviar.", "docs-type__body14") +
        typeRow("Label", "Outfit Medium 14 / 1.45", "Razão social", "docs-type__label") +
        typeRow("Caption", "Outfit Regular 12 / 1.5", "Texto de apoio · helper e meta", "docs-type__caption") +
        "</div></section>"
      );
    },
  };

  catalog.pages.logos = {
    title: "Logos",
    lead: "Wordmark HubFi. Teal no i, grafite no restante. Não esticar, não recolorir fora destas versões.",
    node: "2-8349",
    figmaFile: FIGMA_F,
    html: function () {
      var word =
        '<img src="assets/icons/hubfi-logo.svg" width="218" height="54" alt="hubfi">';
      var mark =
        '<span class="docs-brandmark" aria-hidden="true"><img src="assets/icons/hubfi-logo.svg" alt=""></span>';
      return (
        '<section class="docs-board"><div class="docs-board__copy"><h2 class="docs-h2">Wordmark</h2><p class="docs-board__desc">Versão padrão sobre fundo claro. Largura de referência 109×27.</p></div><div class="docs-logo-board">' +
        word +
        "</div></section>" +
        '<section class="docs-board"><div class="docs-board__copy"><h2 class="docs-h2">Inverso</h2><p class="docs-board__desc">Sobre primary/900, como no rodapé das covers do Foundations.</p></div><div class="docs-logo-board docs-logo-board--dark">' +
        word +
        "</div></section>" +
        '<section class="docs-board"><div class="docs-board__copy"><h2 class="docs-h2">Sobre a marca</h2><p class="docs-board__desc">Fundo primary/500. O wordmark vai para branco.</p></div><div class="docs-logo-board docs-logo-board--brand">' +
        word +
        "</div></section>" +
        '<section class="docs-board"><div class="docs-board__copy"><h2 class="docs-h2">Símbolo</h2><p class="docs-board__desc">O h do blob, quando o espaço não cabe o nome inteiro — favicon, avatar, app.</p></div><div class="docs-logo-row"><div class="docs-logo-board docs-logo-board--mark">' +
        mark +
        '</div><div class="docs-logo-board docs-logo-board--dark docs-logo-board--mark">' +
        mark +
        "</div></div></section>"
      );
    },
  };

  var galleries = catalog.home.html;
  catalog.home.title = "Design System HubFi";
  catalog.home.lead =
    "A linguagem visual da plataforma: cor, tipo, marca e os componentes que o produto usa de verdade.";
  catalog.home.html = function () {
    return (
      '<section class="docs-intro">' +
      '<div class="docs-intro__bar" aria-hidden="true">' +
      '<span style="background:#ecfbf9"></span><span style="background:#d9f5f1"></span><span style="background:#2fc0b1"></span><span style="background:#00a396"></span><span style="background:#008a7e"></span><span style="background:#005c54"></span><span style="background:#003d38"></span>' +
      "</div>" +
      '<p class="docs-intro__body">Foundations vêm do <a href="' +
      FIGMA_F +
      '1-386" target="_blank" rel="noreferrer">DS · Foundations</a>. Componentes, do <a href="https://www.figma.com/design/XGEdsV9rlBKYZLz3UwoqYV" target="_blank" rel="noreferrer">DS · Components</a>.</p>' +
      '<div class="docs-doors">' +
      '<a class="docs-door" href="#/cores"><span class="docs-door__swatches" aria-hidden="true"><i style="background:#00a396"></i><i style="background:#008a7e"></i><i style="background:#005c54"></i></span><strong>Cores</strong><span>Primitivas, semânticos e feedback</span></a>' +
      '<a class="docs-door" href="#/tipografia"><span class="docs-door__letter">Aa</span><strong>Tipografia</strong><span>Outfit, escala e pesos</span></a>' +
      '<a class="docs-door" href="#/logos"><img src="assets/icons/hubfi-logo.svg" width="88" height="22" alt=""><strong>Logos</strong><span>Wordmark, inverso e símbolo</span></a>' +
      "</div></section>" +
      galleries()
    );
  };
})();
