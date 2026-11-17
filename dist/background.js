/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dompurify/dist/purify.js":
/*!***********************************************!*\
  !*** ./node_modules/dompurify/dist/purify.js ***!
  \***********************************************/
/***/ (function(module) {

/*! @license DOMPurify | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.0.8/LICENSE */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, function () { 'use strict';

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  var hasOwnProperty = Object.hasOwnProperty,
      setPrototypeOf = Object.setPrototypeOf,
      isFrozen = Object.isFrozen;
  var freeze = Object.freeze,
      seal = Object.seal,
      create = Object.create; // eslint-disable-line import/no-mutable-exports

  var _ref = typeof Reflect !== 'undefined' && Reflect,
      apply = _ref.apply,
      construct = _ref.construct;

  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }

  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }

  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }

  if (!construct) {
    construct = function construct(Func, args) {
      return new (Function.prototype.bind.apply(Func, [null].concat(_toConsumableArray(args))))();
    };
  }

  var arrayForEach = unapply(Array.prototype.forEach);
  var arrayPop = unapply(Array.prototype.pop);
  var arrayPush = unapply(Array.prototype.push);

  var stringToLowerCase = unapply(String.prototype.toLowerCase);
  var stringMatch = unapply(String.prototype.match);
  var stringReplace = unapply(String.prototype.replace);
  var stringIndexOf = unapply(String.prototype.indexOf);
  var stringTrim = unapply(String.prototype.trim);

  var regExpTest = unapply(RegExp.prototype.test);

  var typeErrorCreate = unconstruct(TypeError);

  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return apply(func, thisArg, args);
    };
  }

  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return construct(func, args);
    };
  }

  /* Add properties to a lookup table */
  function addToSet(set, array) {
    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }

    var l = array.length;
    while (l--) {
      var element = array[l];
      if (typeof element === 'string') {
        var lcElement = stringToLowerCase(element);
        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }

          element = lcElement;
        }
      }

      set[element] = true;
    }

    return set;
  }

  /* Shallow clone an object */
  function clone(object) {
    var newObject = create(null);

    var property = void 0;
    for (property in object) {
      if (apply(hasOwnProperty, object, [property])) {
        newObject[property] = object[property];
      }
    }

    return newObject;
  }

  var html = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);

  // SVG
  var svg = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'audio', 'canvas', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'video', 'view', 'vkern']);

  var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);

  var mathMl = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']);

  var text = freeze(['#text']);

  var html$1 = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns']);

  var svg$1 = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);

  var mathMl$1 = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);

  var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  // eslint-disable-next-line unicorn/better-regex
  var MUSTACHE_EXPR = seal(/\{\{[\s\S]*|[\s\S]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
  var ERB_EXPR = seal(/<%[\s\S]*|[\s\S]*%>/gm);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
  var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
  var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  var getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };

  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {Document} document The document object (to determine policy name suffix)
   * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported).
   */
  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
    if ((typeof trustedTypes === 'undefined' ? 'undefined' : _typeof(trustedTypes)) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    }

    // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.
    var suffix = null;
    var ATTR_NAME = 'data-tt-policy-suffix';
    if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
      suffix = document.currentScript.getAttribute(ATTR_NAME);
    }

    var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML: function createHTML(html$$1) {
          return html$$1;
        }
      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };

  function createDOMPurify() {
    var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

    var DOMPurify = function DOMPurify(root) {
      return createDOMPurify(root);
    };

    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */
    DOMPurify.version = '2.1.1';

    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */
    DOMPurify.removed = [];

    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;

      return DOMPurify;
    }

    var originalDocument = window.document;

    var document = window.document;
    var DocumentFragment = window.DocumentFragment,
        HTMLTemplateElement = window.HTMLTemplateElement,
        Node = window.Node,
        NodeFilter = window.NodeFilter,
        _window$NamedNodeMap = window.NamedNodeMap,
        NamedNodeMap = _window$NamedNodeMap === undefined ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
        Text = window.Text,
        Comment = window.Comment,
        DOMParser = window.DOMParser,
        trustedTypes = window.trustedTypes;

    // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.

    if (typeof HTMLTemplateElement === 'function') {
      var template = document.createElement('template');
      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }

    var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
    var emptyHTML = trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML('') : '';

    var _document = document,
        implementation = _document.implementation,
        createNodeIterator = _document.createNodeIterator,
        getElementsByTagName = _document.getElementsByTagName,
        createDocumentFragment = _document.createDocumentFragment;
    var importNode = originalDocument.importNode;


    var documentMode = {};
    try {
      documentMode = clone(document).documentMode ? document.documentMode : {};
    } catch (_) {}

    var hooks = {};

    /**
     * Expose whether this browser supports running the full DOMPurify.
     */
    DOMPurify.isSupported = implementation && typeof implementation.createHTMLDocument !== 'undefined' && documentMode !== 9;

    var MUSTACHE_EXPR$$1 = MUSTACHE_EXPR,
        ERB_EXPR$$1 = ERB_EXPR,
        DATA_ATTR$$1 = DATA_ATTR,
        ARIA_ATTR$$1 = ARIA_ATTR,
        IS_SCRIPT_OR_DATA$$1 = IS_SCRIPT_OR_DATA,
        ATTR_WHITESPACE$$1 = ATTR_WHITESPACE;
    var IS_ALLOWED_URI$$1 = IS_ALLOWED_URI;

    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */

    var ALLOWED_TAGS = null;
    var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(html), _toConsumableArray$1(svg), _toConsumableArray$1(svgFilters), _toConsumableArray$1(mathMl), _toConsumableArray$1(text)));

    /* Allowed attribute names */
    var ALLOWED_ATTR = null;
    var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray$1(html$1), _toConsumableArray$1(svg$1), _toConsumableArray$1(mathMl$1), _toConsumableArray$1(xml)));

    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
    var FORBID_TAGS = null;

    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
    var FORBID_ATTR = null;

    /* Decide if ARIA attributes are okay */
    var ALLOW_ARIA_ATTR = true;

    /* Decide if custom data attributes are okay */
    var ALLOW_DATA_ATTR = true;

    /* Decide if unknown protocols are okay */
    var ALLOW_UNKNOWN_PROTOCOLS = false;

    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */
    var SAFE_FOR_TEMPLATES = false;

    /* Decide if document with <html>... should be returned */
    var WHOLE_DOCUMENT = false;

    /* Track whether config is already set on this instance of DOMPurify. */
    var SET_CONFIG = false;

    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */
    var FORCE_BODY = false;

    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */
    var RETURN_DOM = false;

    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */
    var RETURN_DOM_FRAGMENT = false;

    /* If `RETURN_DOM` or `RETURN_DOM_FRAGMENT` is enabled, decide if the returned DOM
     * `Node` is imported into the current `Document`. If this flag is not enabled the
     * `Node` will belong (its ownerDocument) to a fresh `HTMLDocument`, created by
     * DOMPurify. */
    var RETURN_DOM_IMPORT = false;

    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */
    var RETURN_TRUSTED_TYPE = false;

    /* Output should be free from DOM clobbering attacks? */
    var SANITIZE_DOM = true;

    /* Keep element content when removing element? */
    var KEEP_CONTENT = true;

    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */
    var IN_PLACE = false;

    /* Allow usage of profiles like html, svg and mathMl */
    var USE_PROFILES = {};

    /* Tags to ignore content of when KEEP_CONTENT is true */
    var FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);

    /* Tags that are safe for data: URIs */
    var DATA_URI_TAGS = null;
    var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);

    /* Attributes safe for values like "javascript:" */
    var URI_SAFE_ATTRIBUTES = null;
    var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'summary', 'title', 'value', 'style', 'xmlns']);

    /* Keep a reference to config to pass to hooks */
    var CONFIG = null;

    /* Ideally, do not touch anything below this line */
    /* ______________________________________________ */

    var formElement = document.createElement('form');

    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity
    var _parseConfig = function _parseConfig(cfg) {
      if (CONFIG && CONFIG === cfg) {
        return;
      }

      /* Shield configuration object from tampering */
      if (!cfg || (typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
        cfg = {};
      }

      /* Shield configuration object from prototype pollution */
      cfg = clone(cfg);

      /* Set configuration parameters */
      ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
      URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
      FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
      FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
      USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
      RETURN_DOM = cfg.RETURN_DOM || false; // Default false
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
      RETURN_DOM_IMPORT = cfg.RETURN_DOM_IMPORT || false; // Default false
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
      FORCE_BODY = cfg.FORCE_BODY || false; // Default false
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
      IN_PLACE = cfg.IN_PLACE || false; // Default false
      IS_ALLOWED_URI$$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$$1;
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }

      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }

      /* Parse profile info */
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(text)));
        ALLOWED_ATTR = [];
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html);
          addToSet(ALLOWED_ATTR, html$1);
        }

        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg);
          addToSet(ALLOWED_ATTR, svg$1);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg$1);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl);
          addToSet(ALLOWED_ATTR, mathMl$1);
          addToSet(ALLOWED_ATTR, xml);
        }
      }

      /* Merge configuration parameters */
      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }

        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
      }

      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }

        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
      }

      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
      }

      /* Add #text in case KEEP_CONTENT is set to true */
      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }

      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }

      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      }

      // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.
      if (freeze) {
        freeze(cfg);
      }

      CONFIG = cfg;
    };

    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */
    var _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, { element: node });
      try {
        node.parentNode.removeChild(node);
      } catch (_) {
        node.outerHTML = emptyHTML;
      }
    };

    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */
    var _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }

      node.removeAttribute(name);
    };

    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */
    var _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      var doc = void 0;
      var leadingWhitespace = void 0;

      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        var matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }

      var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /* Use the DOMParser API by default, fallback later if needs be */
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, 'text/html');
      } catch (_) {}

      /* Use createHTMLDocument in case DOMParser is not available */
      if (!doc || !doc.documentElement) {
        doc = implementation.createHTMLDocument('');
        var _doc = doc,
            body = _doc.body;

        body.parentNode.removeChild(body.parentNode.firstElementChild);
        body.outerHTML = dirtyPayload;
      }

      if (dirty && leadingWhitespace) {
        doc.body.insertBefore(document.createTextNode(leadingWhitespace), doc.body.childNodes[0] || null);
      }

      /* Work on whole document or just its body */
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    };

    /**
     * _createIterator
     *
     * @param  {Document} root document/fragment to create iterator for
     * @return {Iterator} iterator instance
     */
    var _createIterator = function _createIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, function () {
        return NodeFilter.FILTER_ACCEPT;
      }, false);
    };

    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */
    var _isClobbered = function _isClobbered(elm) {
      if (elm instanceof Text || elm instanceof Comment) {
        return false;
      }

      if (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string') {
        return true;
      }

      return false;
    };

    /**
     * _isNode
     *
     * @param  {Node} obj object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */
    var _isNode = function _isNode(object) {
      return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? object instanceof Node : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
    };

    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */
    var _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }

      arrayForEach(hooks[entryPoint], function (hook) {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };

    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */
    var _sanitizeElements = function _sanitizeElements(currentNode) {
      var content = void 0;

      /* Execute a hook if present */
      _executeHook('beforeSanitizeElements', currentNode, null);

      /* Check if element is clobbered or can clobber */
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Check if tagname contains Unicode */
      if (stringMatch(currentNode.nodeName, /[\u0080-\uFFFF]/)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Now let's check the element's type and name */
      var tagName = stringToLowerCase(currentNode.nodeName);

      /* Execute a hook if present */
      _executeHook('uponSanitizeElement', currentNode, {
        tagName: tagName,
        allowedTags: ALLOWED_TAGS
      });

      /* Take care of an mXSS pattern using p, br inside svg, math */
      if ((tagName === 'svg' || tagName === 'math') && currentNode.querySelectorAll('p, br').length !== 0) {
        _forceRemove(currentNode);
        return true;
      }

      /* Detect mXSS attempts abusing namespace confusion */
      if (!_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[!/\w]/g, currentNode.innerHTML) && regExpTest(/<[!/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Remove element if anything forbids its presence */
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Keep content except for bad-listed elements */
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && typeof currentNode.insertAdjacentHTML === 'function') {
          try {
            var htmlToInsert = currentNode.innerHTML;
            currentNode.insertAdjacentHTML('AfterEnd', trustedTypesPolicy ? trustedTypesPolicy.createHTML(htmlToInsert) : htmlToInsert);
          } catch (_) {}
        }

        _forceRemove(currentNode);
        return true;
      }

      /* Remove in case a noscript/noembed XSS is suspected */
      if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Sanitize element content to be template-safe */
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        content = stringReplace(content, MUSTACHE_EXPR$$1, ' ');
        content = stringReplace(content, ERB_EXPR$$1, ' ');
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
          currentNode.textContent = content;
        }
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeElements', currentNode, null);

      return false;
    };

    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity
    var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }

      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */
      if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$$1, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        return false;

        /* Check value is safe. First, is attr inert? If so, is safe */
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ; else if (!value) ; else {
        return false;
      }

      return true;
    };

    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */
    var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      var attr = void 0;
      var value = void 0;
      var lcName = void 0;
      var l = void 0;
      /* Execute a hook if present */
      _executeHook('beforeSanitizeAttributes', currentNode, null);

      var attributes = currentNode.attributes;

      /* Check if we have attributes; if not we might have a text node */

      if (!attributes) {
        return;
      }

      var hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      l = attributes.length;

      /* Go backwards over all attributes; safely remove bad ones */
      while (l--) {
        attr = attributes[l];
        var _attr = attr,
            name = _attr.name,
            namespaceURI = _attr.namespaceURI;

        value = stringTrim(attr.value);
        lcName = stringToLowerCase(name);

        /* Execute a hook if present */
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
        value = hookEvent.attrValue;
        /* Did the hooks approve of the attribute? */
        if (hookEvent.forceKeepAttr) {
          continue;
        }

        /* Remove attribute */
        _removeAttribute(name, currentNode);

        /* Did the hooks approve of the attribute? */
        if (!hookEvent.keepAttr) {
          continue;
        }

        /* Work around a security issue in jQuery 3.0 */
        if (regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }

        /* Sanitize attribute content to be template-safe */
        if (SAFE_FOR_TEMPLATES) {
          value = stringReplace(value, MUSTACHE_EXPR$$1, ' ');
          value = stringReplace(value, ERB_EXPR$$1, ' ');
        }

        /* Is `value` valid for this attribute? */
        var lcTag = currentNode.nodeName.toLowerCase();
        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }

        /* Handle invalid data-* attribute set by try-catching it */
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }

          arrayPop(DOMPurify.removed);
        } catch (_) {}
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeAttributes', currentNode, null);
    };

    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */
    var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      var shadowNode = void 0;
      var shadowIterator = _createIterator(fragment);

      /* Execute a hook if present */
      _executeHook('beforeSanitizeShadowDOM', fragment, null);

      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);

        /* Sanitize tags and elements */
        if (_sanitizeElements(shadowNode)) {
          continue;
        }

        /* Deep shadow DOM detected */
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(shadowNode);
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };

    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} configuration object
     */
    // eslint-disable-next-line complexity
    DOMPurify.sanitize = function (dirty, cfg) {
      var body = void 0;
      var importedNode = void 0;
      var currentNode = void 0;
      var oldNode = void 0;
      var returnNode = void 0;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */
      if (!dirty) {
        dirty = '<!-->';
      }

      /* Stringify, in case dirty is an object */
      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        // eslint-disable-next-line no-negated-condition
        if (typeof dirty.toString !== 'function') {
          throw typeErrorCreate('toString is not a function');
        } else {
          dirty = dirty.toString();
          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        }
      }

      /* Check we can run. Otherwise fall back or ignore */
      if (!DOMPurify.isSupported) {
        if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
          if (typeof dirty === 'string') {
            return window.toStaticHTML(dirty);
          }

          if (_isNode(dirty)) {
            return window.toStaticHTML(dirty.outerHTML);
          }
        }

        return dirty;
      }

      /* Assign config vars */
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }

      /* Clean up removed elements */
      DOMPurify.removed = [];

      /* Check if dirty is correctly typed for IN_PLACE */
      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }

      if (IN_PLACE) ; else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
        // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }

        /* Initialize the document to work on */
        body = _initDocument(dirty);

        /* Check we have a DOM node from the data */
        if (!body) {
          return RETURN_DOM ? null : emptyHTML;
        }
      }

      /* Remove first element node (ours) if FORCE_BODY is set */
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }

      /* Get node iterator */
      var nodeIterator = _createIterator(IN_PLACE ? dirty : body);

      /* Now start iterating over the created document */
      while (currentNode = nodeIterator.nextNode()) {
        /* Fix IE's strange behavior with manipulated textNodes #89 */
        if (currentNode.nodeType === 3 && currentNode === oldNode) {
          continue;
        }

        /* Sanitize tags and elements */
        if (_sanitizeElements(currentNode)) {
          continue;
        }

        /* Shadow DOM detected, sanitize it */
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(currentNode);

        oldNode = currentNode;
      }

      oldNode = null;

      /* If we sanitized `dirty` in-place, return it. */
      if (IN_PLACE) {
        return dirty;
      }

      /* Return sanitized string or DOM */
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);

          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }

        if (RETURN_DOM_IMPORT) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }

        return returnNode;
      }

      var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

      /* Sanitize final string template-safe */
      if (SAFE_FOR_TEMPLATES) {
        serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$$1, ' ');
        serializedHTML = stringReplace(serializedHTML, ERB_EXPR$$1, ' ');
      }

      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };

    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */
    DOMPurify.setConfig = function (cfg) {
      _parseConfig(cfg);
      SET_CONFIG = true;
    };

    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */
    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };

    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {string} tag Tag name of containing element.
     * @param  {string} attr Attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */
    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }

      var lcTag = stringToLowerCase(tag);
      var lcName = stringToLowerCase(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };

    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */
    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }

      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };

    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     */
    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        arrayPop(hooks[entryPoint]);
      }
    };

    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */
    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };

    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     *
     */
    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };

    return DOMPurify;
  }

  var purify = createDOMPurify();

  return purify;

}));
//# sourceMappingURL=purify.js.map


/***/ }),

/***/ "./src/scripts/background.ts":
/*!***********************************!*\
  !*** ./src/scripts/background.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! webext-dynamic-content-scripts */ "./node_modules/webext-dynamic-content-scripts/distribution/index.js");
const webext_permission_toggle_1 = __importDefault(__webpack_require__(/*! webext-permission-toggle */ "./node_modules/webext-permission-toggle/index.js"));
const analytics_1 = __webpack_require__(/*! ./utils/analytics */ "./src/scripts/utils/analytics.ts");
const constants_1 = __webpack_require__(/*! ./utils/constants */ "./src/scripts/utils/constants.ts");
const dom_1 = __webpack_require__(/*! ./utils/dom */ "./src/scripts/utils/dom.ts");
const logger_1 = __webpack_require__(/*! ./utils/logger */ "./src/scripts/utils/logger.ts");
const notifications_1 = __webpack_require__(/*! ./utils/notifications */ "./src/scripts/utils/notifications.ts");
var assignmentNotificationUrl = "https://app.schoology.com/home/notifications?filter=all";
var defaultDomain = "app.schoology.com";
const OFFSCREEN_DOCUMENT_PATH = "/offscreen.html";
function load() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, webext_permission_toggle_1.default)({ reloadOnSuccess: true });
        chrome.runtime.onInstalled.addListener(onInstalled);
        chrome.alarms.onAlarm.addListener(onAlarm);
        let s = yield chrome.storage.sync.get({ defaultDomain: "app.schoology.com" });
        defaultDomain = s.defaultDomain;
        assignmentNotificationUrl = `https://${defaultDomain}/home/notifications?filter=all`;
        // TODO: Domain permissions toggle needs to be added
        // addDomainPermissionToggle();
        //Run once on load
        onAlarm({ name: "notification", scheduledTime: Date.now() });
        chrome.alarms.get("notification", function (alarm) {
            if (alarm) {
                logger_1.Logger.log("Alarm is already registered");
            }
            else {
                logger_1.Logger.log("Notifications alarm is not registered; registering...");
                chrome.alarms.create("notification", {
                    periodInMinutes: 5,
                });
            }
        });
        chrome.notifications.onClicked.addListener(onNotificationClicked);
        chrome.action.setBadgeBackgroundColor({ color: [217, 0, 0, 255] });
        chrome.action.onClicked.addListener(onActionClicked);
        chrome.runtime.onMessage.addListener(onMessage);
        chrome.contextMenus.onClicked.addListener(onContextMenuClicked);
    });
}
function onActionClicked() {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.Logger.log("Browser action clicked");
        let badgeText = yield chrome.action.getBadgeText({});
        let n = Number.parseInt(badgeText);
        trackAnalyticsEvent("button_click", {
            id: "main-browser-action-button",
            context: "Browser Action",
            value: String(n || 0),
            legacyTarget: "Browser Action",
            legacyAction: n ? `browser action clicked: ${n}` : "browser action clicked: 0",
            legacyLabel: "Notifications",
        });
        logger_1.Logger.log(`Browser action text: "${badgeText}"`);
        if (n)
            chrome.tabs.create({ url: `https://${defaultDomain}/home/notifications` });
        else
            chrome.tabs.create({ url: `https://${defaultDomain}` });
        chrome.action.setBadgeText({ text: "" });
    });
}
function onNotificationClicked(id) {
    logger_1.Logger.log("Notification clicked");
    trackAnalyticsEvent("perform_action", {
        id: "click",
        context: "Notifications",
        value: id,
        legacyTarget: id,
        legacyAction: "notification click",
        legacyLabel: "Notifications",
    });
    chrome.notifications.clear(id);
    switch (id) {
        case "assignment":
            chrome.tabs.create({ url: `https://${defaultDomain}/home/notifications` });
            chrome.action.setBadgeText({ text: "" });
            break;
        default:
            chrome.tabs.create({ url: `https://${defaultDomain}` });
            break;
    }
}
function onAlarm(alarm) {
    return __awaiter(this, void 0, void 0, function* () {
        let storageContent = yield chrome.storage.sync.get(null);
        if (alarm && alarm.name === "notification") {
            try {
                logger_1.Logger.log(`[${new Date()}] Checking for new notifications`);
                if (storageContent.notifications != "disabled") {
                    checkForNotifications();
                }
            }
            catch (error) {
                logger_1.Logger.error("Error caught:");
                logger_1.Logger.error(error);
            }
        }
    });
}
function onInstalled(details) {
    trackAnalyticsEvent("perform_action", {
        id: "runtime_oninstalled",
        value: details.reason,
        context: "Versions",
        legacyTarget: "Runtime onInstalled",
        legacyAction: details.reason,
        legacyLabel: "Versions",
    });
    chrome.contextMenus.create({
        id: "splus-theme-editor",
        title: "Theme Editor",
        contexts: ["action"],
    });
    chrome.contextMenus.create({
        id: "splus-discord",
        title: "Discord Support Server",
        contexts: ["action"],
    });
    chrome.contextMenus.create({
        id: "splus-website",
        title: `${constants_1.EXTENSION_NAME} Website`,
        contexts: ["action"],
    });
}
function onContextMenuClicked(info, tab) {
    switch (info.menuItemId) {
        case "splus-theme-editor":
            chrome.tabs.create({ url: chrome.runtime.getURL("/theme-editor.html") });
            break;
        case "splus-discord":
            chrome.tabs.create({ url: constants_1.DISCORD_URL });
            break;
        case "splus-website":
            chrome.tabs.create({
                url: `${constants_1.EXTENSION_WEBSITE}/?utm_source=ext-context-menu&utm_content=${chrome.runtime.getManifest().version}`,
            });
            break;
    }
}
function onMessage(request, sender, sendResponse) {
    logger_1.Logger.log("Received background page message", request);
    if (request.type == "openMessages" || request.type == "openBrowser") {
        void (() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const tab = (_a = sender.tab) !== null && _a !== void 0 ? _a : (yield chrome.tabs.query({ active: true, lastFocusedWindow: true }))[0];
            if (!(tab === null || tab === void 0 ? void 0 : tab.id))
                return;
            chrome.tabs.sendMessage(tab.id, {
                type: request.type == "openMessages" ? "openMessagesInSchoology" : "openBrowserInSchoology",
            });
        }))();
        sendResponse({ success: true });
        return true;
    }
    else if (request.type == "fetch" && request.url !== undefined) {
        logger_1.Logger.debug("Received fetch request for " + request.url);
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                let finalResponse = {};
                let responseObj;
                try {
                    responseObj = yield fetch(request.url, request.params);
                }
                catch (e) {
                    finalResponse.success = false;
                    finalResponse.error = e;
                    return finalResponse;
                }
                finalResponse.success = true;
                finalResponse.headers = responseObj.headers;
                finalResponse.ok = responseObj.ok;
                finalResponse.redirected = responseObj.redirected;
                finalResponse.status = responseObj.status;
                finalResponse.statusText = responseObj.statusText;
                finalResponse.type = responseObj.type;
                finalResponse.url = responseObj.url;
                try {
                    switch (request.bodyReadType) {
                        case "json":
                            finalResponse.json = yield responseObj.json();
                            break;
                        case "text":
                            finalResponse.text = yield responseObj.text();
                            break;
                    }
                }
                catch (e) {
                    finalResponse.bodyReadError = e || true;
                }
                return finalResponse;
            });
        })()
            .then(x => sendResponse(JSON.stringify(x)))
            .catch(err => sendResponse(JSON.stringify({ success: false, error: err })));
        return true;
    }
    else if (request.type == "updateDefaultDomain" && request.domain !== undefined) {
        defaultDomain = request.domain;
        assignmentNotificationUrl = `https://${defaultDomain}/home/notifications?filter=all`;
        sendResponse({ success: true });
        return true;
    }
    else if (request.type == "setBadgeText" && request.text !== undefined) {
        chrome.browserAction.setBadgeText({ text: request.text });
        sendResponse({ success: true });
        return true;
    }
    else if (request.type == "notification") {
        (0, notifications_1.updateLastTime)(request.data.timeModified, request.data.lastTime).then(() => {
            (0, notifications_1.sendNotification)(request.data.notification, request.data.name, request.data.count).then(() => {
                sendResponse({ success: true });
            });
        });
        return true;
    }
    else if (request.type == "declarativeNetRequestRuleset") {
        if (request.action === "enable") {
            chrome.declarativeNetRequest
                .updateEnabledRulesets({
                enableRulesetIds: [request.rulesetId],
            })
                .then(() => sendResponse({ success: true }));
        }
        else if (request.action === "disable") {
            chrome.declarativeNetRequest
                .updateEnabledRulesets({
                disableRulesetIds: [request.rulesetId],
            })
                .then(() => sendResponse({ success: true }));
        }
    }
}
function checkForNotifications() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let storageContents = yield chrome.storage.sync.get(null);
        if ((0, dom_1.getBrowser)() === "Firefox") {
            // Firefox doesn't support service workers so it doesn't need offscreen documents
            // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background#background_pages
            let { notification, name, count, lastTime, timeModified } = yield (0, notifications_1.loadAssignmentNotifications)(assignmentNotificationUrl, (_a = storageContents.lastTime) !== null && _a !== void 0 ? _a : 0);
            yield (0, notifications_1.updateLastTime)(timeModified, lastTime);
            yield (0, notifications_1.sendNotification)(notification, name, count);
            return;
        }
        // Do below only in Chrome
        // Create an offscreen document if one doesn't exist yet
        yield createOffscreenDocument();
        // Now that we have an offscreen document, we can dispatch the
        // message.
        chrome.runtime.sendMessage({
            type: "offscreen-notifications",
            target: "offscreen",
            data: { url: assignmentNotificationUrl, lastTime: (_b = storageContents.lastTime) !== null && _b !== void 0 ? _b : 0 },
        });
    });
}
function createOffscreenDocument() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(yield hasOffscreenDocument())) {
                yield chrome.offscreen.createDocument({
                    url: OFFSCREEN_DOCUMENT_PATH,
                    reasons: [chrome.offscreen.Reason.DOM_PARSER],
                    justification: "Parse Schoology notifications in HTML format",
                });
            }
        }
        catch (e) {
            logger_1.Logger.warn("Error creating offscreen document, it probably already exists", e);
        }
    });
}
function hasOffscreenDocument() {
    return __awaiter(this, void 0, void 0, function* () {
        // Check all windows controlled by the service worker if one of them is the offscreen document
        const matchedClients = yield clients.matchAll();
        for (const client of matchedClients) {
            if (client.url.endsWith(OFFSCREEN_DOCUMENT_PATH)) {
                return true;
            }
        }
        return false;
    });
}
function trackAnalyticsEvent(name, props) {
    return __awaiter(this, void 0, void 0, function* () {
        yield createOffscreenDocument();
        let storageContents = yield chrome.storage.sync.get(null);
        chrome.runtime.sendMessage({
            type: "offscreen-analytics",
            target: "offscreen",
            data: {
                name,
                props,
                settings: {
                    analytics: storageContents.analytics,
                    theme: storageContents.theme,
                    beta: storageContents.beta,
                    version: chrome.runtime.getManifest().version,
                    newVersion: storageContents.newVersion,
                    randomUserId: (0, analytics_1.getAnalyticsUserId)(),
                },
            },
        });
    });
}
load();


/***/ }),

/***/ "./src/scripts/utils/analytics.ts":
/*!****************************************!*\
  !*** ./src/scripts/utils/analytics.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeAnalytics = exports.getAnalyticsUserId = exports.trackEvent = void 0;
/**
 * Tracks an event using Google Analytics if the user did not opt out
 * NOTE: The Firefox version of the extension has no support for Google Analytics
 */
var trackEvent = function (eventName, _a = {}) {
    var { legacyTarget, legacyAction, legacyLabel = undefined, legacyValue = undefined, id, context, value } = _a, extraProps = __rest(_a, ["legacyTarget", "legacyAction", "legacyLabel", "legacyValue", "id", "context", "value"]);
    console.debug("[S+] Tracking disabled by user", arguments);
};
exports.trackEvent = trackEvent;
function getAnalyticsUserId() {
    return __awaiter(this, void 0, void 0, function* () {
        function getRandomToken() {
            // E.g. 8 * 32 = 256 bits token
            var randomPool = new Uint8Array(32);
            crypto.getRandomValues(randomPool);
            var hex = "";
            for (var i = 0; i < randomPool.length; ++i) {
                hex += randomPool[i].toString(16);
            }
            // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
            return hex;
        }
        let l = yield chrome.storage.local.get({ randomUserId: null });
        if (!l.randomUserId) {
            let randomUserId = getRandomToken();
            yield chrome.storage.local.set({ randomUserId });
            return randomUserId;
        }
        return l.randomUserId;
    });
}
exports.getAnalyticsUserId = getAnalyticsUserId;
function initializeAnalytics(_a) {
    return __awaiter(this, arguments, void 0, function* ({ documentContext, isAnalyticsEnabled, selectedTheme, selectedBeta, currentVersion, newVersion, randomUserId, themeIsModern, }) {
        if (isAnalyticsEnabled) {
            enableAnalytics();
        }
        function enableAnalytics() {
            // Google Analytics v4
            globalThis.dataLayer = globalThis.dataLayer || [];
            function gtag(...args) {
                var _a;
                (_a = globalThis.dataLayer) === null || _a === void 0 ? void 0 : _a.push(arguments);
            }
            gtag("js", new Date());
            const gtagConfig = {
                page_location: location.href.replace(/\/\d{3,}\b/g, "/*"),
                page_path: location.pathname.replace(/\/\d{3,}\b/g, "/*"),
                page_title: null,
                user_id: randomUserId,
                user_properties: {
                    theme: selectedTheme,
                    activeBeta: selectedBeta,
                    lastEnabledVersion: newVersion,
                    extensionVersion: currentVersion,
                    domain: location.host,
                    modernTheme: themeIsModern,
                },
            };
            gtag("config", "G-YM6B00RDYC", gtagConfig);
            exports.trackEvent = function (eventName, _a = {}) {
                var { legacyTarget, legacyAction, legacyLabel = undefined, legacyValue = undefined, id, context, value } = _a, extraProps = __rest(_a, ["legacyTarget", "legacyAction", "legacyLabel", "legacyValue", "id", "context", "value"]);
                let eventData = Object.assign({ id,
                    context,
                    value }, extraProps);
                console.debug(`[S+] Tracked event:`, eventName, eventData);
                gtag("event", eventName, eventData);
            };
            function trackClick(event) {
                if (!event.isTrusted)
                    return;
                let target = (event.currentTarget || event.target);
                (0, exports.trackEvent)("tracking_link_click", {
                    legacyTarget: target.dataset.splusTrackingId || target.id || "Unlabeled Button",
                    legacyAction: "click",
                    legacyLabel: target.dataset.splusTrackingContext || "Tracking Link",
                    legacyValue: target.dataset.splusTrackingValue || event.button,
                    id: target.dataset.splusTrackingId || target.id || "Unlabeled Button",
                    context: target.dataset.splusTrackingContext || "Tracking Link",
                    value: target.dataset.splusTrackingValue,
                });
            }
            if (documentContext) {
                let trackedElements = new Set();
                let observer = new MutationObserver((mutations, mutationObserver) => {
                    for (let elem of document.querySelectorAll(".splus-track-clicks:not(.splus-tracked)")) {
                        if (!trackedElements.has(elem)) {
                            elem.addEventListener("click", trackClick);
                            elem.addEventListener("auxclick", trackClick);
                            elem.classList.add("splus-tracked");
                            trackedElements.add(elem);
                        }
                    }
                });
                var readyStateCheckInterval = setInterval(function () {
                    if (document.readyState === "complete") {
                        clearInterval(readyStateCheckInterval);
                        init();
                    }
                }, 10);
                function init() {
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true,
                    });
                    for (let elem of document.querySelectorAll(".splus-track-clicks")) {
                        if (!trackedElements.has(elem)) {
                            elem.addEventListener("click", trackClick);
                            elem.addEventListener("auxclick", trackClick);
                            elem.classList.add("splus-tracked");
                            trackedElements.add(elem);
                        }
                    }
                }
            }
        }
    });
}
exports.initializeAnalytics = initializeAnalytics;


/***/ }),

/***/ "./src/scripts/utils/constants.ts":
/*!****************************************!*\
  !*** ./src/scripts/utils/constants.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_THEME_NAME = exports.DISCORD_URL = exports.EXTENSION_WEBSITE = exports.EXTENSION_NAME = void 0;
exports.EXTENSION_NAME = "Schoology Plus";
exports.EXTENSION_WEBSITE = "https://schoologypl.us";
exports.DISCORD_URL = "https://discord.schoologypl.us";
exports.DEFAULT_THEME_NAME = exports.EXTENSION_NAME;


/***/ }),

/***/ "./src/scripts/utils/dom.ts":
/*!**********************************!*\
  !*** ./src/scripts/utils/dom.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.waitForElement = exports.createSvgLogo = exports.setCSSVariable = exports.getParents = exports.isVisible = exports.getBrowser = exports.createButtonWithLogo = exports.createButton = exports.createElement = void 0;
/**
 * Creates a DOM element
 * @returns {HTMLElement} A DOM element
 * @param {string} tag - The HTML tag name of the type of DOM element to create
 * @param {string[]} classList - CSS classes to apply to the DOM element
 * @param {Object.<string,any>} properties - Properties to apply to the DOM element
 * @param {HTMLElement[]} children - Elements to append as children to the created element
 */
function createElement(tag, classList, properties, children) {
    let element = document.createElement(tag);
    if (classList) {
        for (let c of classList) {
            element.classList.add(c);
        }
    }
    if (properties) {
        for (let property in properties) {
            if (properties[property] instanceof Object &&
                !(properties[property] instanceof Function)) {
                for (let subproperty in properties[property]) {
                    element[property][subproperty] = properties[property][subproperty];
                }
            }
            else if (property !== undefined && properties[property] !== undefined) {
                element[property] = properties[property];
            }
        }
    }
    if (children) {
        for (let child of children) {
            element.appendChild(child);
        }
    }
    return element;
}
exports.createElement = createElement;
/**
 * Creates a Schoology Plus themed button element
 * @param {string} id The ID for the button element
 * @param {string} text The text to show on the button
 * @param {(e: Event)=>void} callback A function to be called when the button is clicked
 */
function createButton(id, text, callback) {
    return createElement("span", ["submit-span-wrapper", "splus-modal-button"], { onclick: callback }, [
        createElement("input", ["form-submit", "splus-track-clicks"], {
            type: "button",
            value: text,
            id: id,
            dataset: { splusTrackingContext: "S+ Button" },
        }),
    ]);
}
exports.createButton = createButton;
function createButtonWithLogo(id, text, callback) {
    let button = createButton(id, text, callback);
    let img = createSvgLogo();
    Object.assign(img.style, {
        verticalAlign: "middle",
        paddingLeft: "4px",
        width: "18px",
    });
    button.prepend(img);
    button.style.setProperty("height", "36px", "important");
    let buttonInput = button.querySelector("input");
    buttonInput.style.paddingLeft = "4px";
    buttonInput.style.setProperty("height", "36px", "important");
    button.style.cursor = "pointer";
    return button;
}
exports.createButtonWithLogo = createButtonWithLogo;
/**
 * Returns the name of the current browser
 * @returns {"Chrome"|"Firefox"|"Other"} Name of the current browser
 */
function getBrowser() {
    if (typeof globalThis.chrome !== "undefined") {
        if (typeof globalThis.browser !== "undefined") {
            return "Firefox";
        }
        else {
            // Likely captures all Chromium-based browsers
            return "Chrome";
        }
    }
    else {
        return "Other";
    }
}
exports.getBrowser = getBrowser;
/**
 * Returns `true` if an element is visible to the user
 * @param {HTMLElement} elem The element to check for visibility
 * @returns {boolean} `true` if element is visible
 */
function isVisible(elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}
exports.isVisible = isVisible;
/**
 * Returns all parent elements matching the provided selector.
 * Essentially works like a reverse `document.querySelectorAll`.
 * @param {HTMLElement} elem The target element
 * @param {string} selector A CSS selector
 * @returns {HTMLElement[]} An array of matching parent elements
 */
function getParents(elem, selector) {
    var parents = [];
    var firstChar;
    if (selector) {
        firstChar = selector.charAt(0);
    }
    for (; elem && elem !== document.documentElement; elem = elem.parentNode) {
        if (selector) {
            if (firstChar === ".") {
                if (elem.classList.contains(selector.substr(1))) {
                    parents.push(elem);
                }
            }
            if (firstChar === "#") {
                if (elem.id === selector.substr(1)) {
                    parents.push(elem);
                }
            }
            if (firstChar === "[") {
                if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
                    parents.push(elem);
                }
            }
            if (elem.tagName.toLowerCase() === selector) {
                parents.push(elem);
            }
        }
        else {
            parents.push(elem);
        }
    }
    return parents;
}
exports.getParents = getParents;
/**
 * Sets the value of a CSS variable on the document
 * @param {string} name Variable name
 * @param {string} val New variable value
 */
function setCSSVariable(name, val) {
    document.documentElement.style.setProperty(`--${name}`, val !== null && val !== void 0 ? val : null);
}
exports.setCSSVariable = setCSSVariable;
function createSvgLogo(...classes) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "250");
    circle.setAttribute("cy", "250");
    circle.setAttribute("r", "230");
    circle.setAttribute("style", "fill: none; stroke-width: 35px; stroke: currentColor;");
    let line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute("x1", "250");
    line1.setAttribute("y1", "125");
    line1.setAttribute("x2", "250");
    line1.setAttribute("y2", "375");
    line1.setAttribute("style", "stroke-linecap: round; stroke-width: 35px; stroke: currentColor;");
    let line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute("x1", "125");
    line2.setAttribute("y1", "250");
    line2.setAttribute("x2", "375");
    line2.setAttribute("y2", "250");
    line2.setAttribute("style", "stroke-linecap: round; stroke-width: 35px; stroke: currentColor;");
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 500 500");
    svg.append(circle, line1, line2);
    if (classes) {
        svg.classList.add(...classes);
    }
    return svg;
}
exports.createSvgLogo = createSvgLogo;
function waitForElement(selector, check_interval = 50) {
    return new Promise(resolve => {
        let interval = setInterval(() => {
            let elem = document.querySelector(selector);
            if (elem) {
                clearInterval(interval);
                resolve(elem);
            }
        }, check_interval);
    });
}
exports.waitForElement = waitForElement;


/***/ }),

/***/ "./src/scripts/utils/logger.ts":
/*!*************************************!*\
  !*** ./src/scripts/utils/logger.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = void 0;
exports.Logger = {
    log: (() => console.log.bind(globalThis.console, `%c+`, createLogPrefix("#81D4FA")))(),
    error: (() => console.error.bind(globalThis.console, `%c+`, createLogPrefix("#FF6961")))(),
    info: (() => console.info.bind(globalThis.console, `%c+`, createLogPrefix("white")))(),
    warn: (() => console.warn.bind(globalThis.console, `%c+`, createLogPrefix("#FDFD96")))(),
    trace: (() => console.trace.bind(globalThis.console, `%c+`, createLogPrefix("orange")))(),
    debug: (() => console.debug.bind(globalThis.console, `%c+`, createLogPrefix("lightgreen")))(),
};
function createLogPrefix(color) {
    return `color:${color};border:1px solid #2A2A2A;border-radius:100%;font-size:14px;font-weight:bold;padding: 0 4px 0 4px;background-color:#2A2A2A`;
}


/***/ }),

/***/ "./src/scripts/utils/notifications.ts":
/*!********************************************!*\
  !*** ./src/scripts/utils/notifications.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendNotification = exports.updateLastTime = exports.loadAssignmentNotifications = void 0;
const dompurify_1 = __importDefault(__webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js"));
const analytics_1 = __webpack_require__(/*! ./analytics */ "./src/scripts/utils/analytics.ts");
const dom_1 = __webpack_require__(/*! ./dom */ "./src/scripts/utils/dom.ts");
const logger_1 = __webpack_require__(/*! ./logger */ "./src/scripts/utils/logger.ts");
function loadAssignmentNotifications(assignmentNotificationUrl, lastTime) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(assignmentNotificationUrl, {
            credentials: "same-origin",
        });
        if (!response.ok)
            throw new Error("Error loading notifications: " + response);
        let responseJson = yield response.json();
        logger_1.Logger.log("Last new grade: " + new Date(lastTime).toString());
        let time = lastTime;
        let timeModified = false;
        if (!time) {
            time = Date.now();
            timeModified = true;
        }
        let div = document.querySelector("div") || document.body.appendChild(document.createElement("div"));
        div.innerHTML = dompurify_1.default.sanitize(responseJson.output);
        let notifications = div.querySelectorAll(".edge-sentence");
        let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        let totalAssignments = 0;
        for (let notification of Array.from(notifications).reverse()) {
            if (notification.textContent.includes("new grade")) {
                let assignments = notification.getElementsByTagName("a");
                let extraTextElement = notification.querySelector(".other-items-link");
                let timeText = notification.querySelector(".edge-time").textContent;
                let splitDate = timeText.split(" at ");
                let monthDay = splitDate[0];
                let hourMinute = splitDate[1];
                let now = new Date();
                let monthDayYear = monthDay + ` ${now.getFullYear()}`;
                let today = `${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
                let notificationDate = Date.parse(monthDayYear);
                if (notificationDate > Date.parse(today)) {
                    notificationDate = Date.parse(monthDay + ` ${now.getFullYear() - 1} ${hourMinute}`);
                }
                else {
                    notificationDate = Date.parse(`${monthDayYear} ${hourMinute}`);
                }
                if (notificationDate > time) {
                    time = notificationDate;
                    timeModified = true;
                    totalAssignments++;
                    logger_1.Logger.log(notification);
                }
            }
        }
        let n = null;
        if (totalAssignments > 0) {
            n = {
                type: "basic",
                iconUrl: "imgs/icon@128.png",
                title: "New grade posted",
                message: `${totalAssignments} new assignment${totalAssignments === 1 ? " has a grade" : "s have grades"}`,
                eventTime: Date.now(),
                isClickable: true,
            };
        }
        return {
            notification: n,
            name: "assignment",
            count: totalAssignments,
            lastTime: time,
            timeModified,
        };
    });
}
exports.loadAssignmentNotifications = loadAssignmentNotifications;
function updateLastTime(timeModified, time) {
    return __awaiter(this, void 0, void 0, function* () {
        if (timeModified) {
            yield chrome.storage.sync.set({ lastTime: time });
            logger_1.Logger.log("Set new time " + new Date(time));
        }
        else {
            logger_1.Logger.log("No new notifications");
        }
    });
}
exports.updateLastTime = updateLastTime;
/**
 * Sends a desktop notification if settings permit
 * @param {NotificationOptions} notification A chrome notification object
 * @param {string} name The name of the notification
 * @param {number} [count=1] The number to add to the browser action badge
 */
function sendNotification(notification, name, count) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!notification)
            return;
        let storageContent = yield chrome.storage.sync.get(null);
        count = count || count == 0 ? count : 1;
        if ((0, dom_1.getBrowser)() == "Firefox") {
            delete notification.requireInteraction;
        }
        logger_1.Logger.log("New notification!", notification);
        if (count > 0 &&
            (!storageContent.notifications ||
                storageContent.notifications == "enabled" ||
                storageContent.notifications == "badge")) {
            let x = yield chrome.action.getBadgeText({});
            let num = Number.parseInt(x);
            chrome.action.setBadgeText({ text: (num ? num + count : count).toString() });
        }
        else {
            logger_1.Logger.log("Number badge is disabled");
        }
        if (!storageContent.notifications ||
            storageContent.notifications == "enabled" ||
            storageContent.notifications == "popup") {
            chrome.notifications.create(name, notification);
            (0, analytics_1.trackEvent)("perform_action", {
                id: "shown",
                context: "Notifications",
                value: name,
                legacyTarget: name,
                legacyAction: "shown",
                legacyLabel: "Notifications",
            });
        }
        else {
            logger_1.Logger.log("Popup notifications are disabled");
        }
    });
}
exports.sendNotification = sendNotification;


/***/ }),

/***/ "./node_modules/content-scripts-register-polyfill/ponyfill.js":
/*!********************************************************************!*\
  !*** ./node_modules/content-scripts-register-polyfill/ponyfill.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ registerContentScript)
/* harmony export */ });
/* harmony import */ var webext_content_scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webext-content-scripts */ "./node_modules/webext-content-scripts/index.js");
/* harmony import */ var webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webext-polyfill-kinda */ "./node_modules/webext-polyfill-kinda/index.js");
/* harmony import */ var webext_patterns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webext-patterns */ "./node_modules/webext-patterns/index.js");



const noMatchesError = 'Type error for parameter contentScriptOptions (Error processing matches: Array requires at least 1 items; you have 0) for contentScripts.register.';
const noPermissionError = 'Permission denied to register a content script for ';
const gotNavigation = typeof chrome === 'object' && 'webNavigation' in chrome;
async function isOriginPermitted(url) {
    return webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_1__["default"].permissions.contains({
        origins: [new URL(url).origin + '/*'],
    });
}
// The callback is only used by webextension-polyfill
async function registerContentScript(contentScriptOptions, callback) {
    const { js = [], css = [], matchAboutBlank, matches = [], excludeMatches, runAt, } = contentScriptOptions;
    let { allFrames } = contentScriptOptions;
    if (gotNavigation) {
        allFrames = false;
    }
    else if (allFrames) {
        console.warn('`allFrames: true` requires the `webNavigation` permission to work correctly: https://github.com/fregante/content-scripts-register-polyfill#permissions');
    }
    if (matches.length === 0) {
        throw new Error(noMatchesError);
    }
    await Promise.all(matches.map(async (pattern) => {
        if (!await webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_1__["default"].permissions.contains({ origins: [pattern] })) {
            throw new Error(noPermissionError + pattern);
        }
    }));
    const matchesRegex = (0,webext_patterns__WEBPACK_IMPORTED_MODULE_2__.patternToRegex)(...matches);
    const excludeMatchesRegex = (0,webext_patterns__WEBPACK_IMPORTED_MODULE_2__.patternToRegex)(...excludeMatches !== null && excludeMatches !== void 0 ? excludeMatches : []);
    const inject = async (url, tabId, frameId = 0) => {
        if (!matchesRegex.test(url) // Manual `matches` glob matching
            || excludeMatchesRegex.test(url) // Manual `exclude_matches` glob matching
            || !await isOriginPermitted(url) // Without this, we might have temporary access via accessTab
        ) {
            return;
        }
        await (0,webext_content_scripts__WEBPACK_IMPORTED_MODULE_0__.injectContentScript)({
            tabId,
            frameId,
        }, {
            css,
            js,
            matchAboutBlank,
            runAt,
        }, {
            ignoreTargetErrors: true,
        });
    };
    const tabListener = async (tabId, { status }, { url }) => {
        // Only status updates are relevant
        // No URL = no permission
        if (status === 'loading' && url) {
            void inject(url, tabId);
        }
    };
    const navListener = async ({ tabId, frameId, url, }) => {
        void inject(url, tabId, frameId);
    };
    if (gotNavigation) {
        chrome.webNavigation.onCommitted.addListener(navListener);
    }
    else {
        chrome.tabs.onUpdated.addListener(tabListener);
    }
    const registeredContentScript = {
        async unregister() {
            if (gotNavigation) {
                chrome.webNavigation.onCommitted.removeListener(navListener);
            }
            else {
                chrome.tabs.onUpdated.removeListener(tabListener);
            }
        },
    };
    if (typeof callback === 'function') {
        callback(registeredContentScript);
    }
    return registeredContentScript;
}


/***/ }),

/***/ "./node_modules/webext-additional-permissions/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/webext-additional-permissions/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _getAdditionalPermissions: () => (/* binding */ _getAdditionalPermissions),
/* harmony export */   _getManifestPermissionsSync: () => (/* binding */ _getManifestPermissionsSync),
/* harmony export */   _isUrlPermittedByManifest: () => (/* binding */ _isUrlPermittedByManifest),
/* harmony export */   dropOverlappingPermissions: () => (/* binding */ dropOverlappingPermissions),
/* harmony export */   getAdditionalPermissions: () => (/* binding */ getAdditionalPermissions),
/* harmony export */   getManifestPermissions: () => (/* binding */ getManifestPermissions),
/* harmony export */   getManifestPermissionsSync: () => (/* binding */ getManifestPermissionsSync),
/* harmony export */   isUrlPermittedByManifest: () => (/* binding */ isUrlPermittedByManifest),
/* harmony export */   selectAdditionalPermissions: () => (/* binding */ selectAdditionalPermissions),
/* harmony export */   selectAdditionalPermissionsSync: () => (/* binding */ selectAdditionalPermissionsSync)
/* harmony export */ });
/* harmony import */ var webext_patterns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webext-patterns */ "./node_modules/webext-patterns/index.js");

async function getManifestPermissions() {
    return getManifestPermissionsSync();
}
function getManifestPermissionsSync() {
    return _getManifestPermissionsSync(chrome.runtime.getManifest());
}
function _getManifestPermissionsSync(manifest) {
    var _a, _b, _c;
    const manifestPermissions = {
        origins: [],
        permissions: [],
    };
    const list = new Set([
        ...((_a = manifest.permissions) !== null && _a !== void 0 ? _a : []),
        ...((_b = manifest.content_scripts) !== null && _b !== void 0 ? _b : []).flatMap(config => { var _a; return (_a = config.matches) !== null && _a !== void 0 ? _a : []; }),
    ]);
    // https://github.com/mozilla/gecko-dev/blob/c0fc8c4852e927b0ae75d893d35772b8c60ee06b/toolkit/components/extensions/Extension.jsm#L738-L743
    if (manifest.devtools_page
        // @ts-expect-error it can't be specified, but it's reported when requested
        && !((_c = manifest.optional_permissions) === null || _c === void 0 ? void 0 : _c.includes('devtools'))) {
        list.add('devtools');
    }
    for (const permission of list) {
        if (permission.includes('://')) {
            manifestPermissions.origins.push(permission);
        }
        else {
            manifestPermissions.permissions.push(permission);
        }
    }
    return manifestPermissions;
}
const hostRegex = /:[/][/][*.]*([^/]+)/; // Extracts the wildcard-less hostname
function parseDomain(origin) {
    return origin.split(hostRegex)[1];
}
async function selectAdditionalPermissions(permissions, options) {
    return selectAdditionalPermissionsSync(permissions, options);
}
function selectAdditionalPermissionsSync(permissions, options) {
    const manifestPermissions = getManifestPermissionsSync();
    return _getAdditionalPermissions(manifestPermissions, permissions, options);
}
async function getAdditionalPermissions(options) {
    return new Promise(resolve => {
        chrome.permissions.getAll(currentPermissions => {
            const manifestPermissions = getManifestPermissionsSync();
            resolve(_getAdditionalPermissions(manifestPermissions, currentPermissions, options));
        });
    });
}
function _getAdditionalPermissions(manifestPermissions, currentPermissions, { strictOrigins = true } = {}) {
    var _a, _b;
    const additionalPermissions = {
        origins: [],
        permissions: [],
    };
    for (const origin of (_a = currentPermissions.origins) !== null && _a !== void 0 ? _a : []) {
        if (manifestPermissions.origins.includes(origin)) {
            continue;
        }
        if (!strictOrigins) {
            const domain = parseDomain(origin);
            const isDomainInManifest = manifestPermissions.origins
                .some(manifestOrigin => parseDomain(manifestOrigin) === domain);
            if (isDomainInManifest) {
                continue;
            }
        }
        additionalPermissions.origins.push(origin);
    }
    for (const permission of (_b = currentPermissions.permissions) !== null && _b !== void 0 ? _b : []) {
        if (!manifestPermissions.permissions.includes(permission)) {
            additionalPermissions.permissions.push(permission);
        }
    }
    return additionalPermissions;
}
function isUrlPermittedByManifest(origin) {
    return _isUrlPermittedByManifest(origin, chrome.runtime.getManifest());
}
function _isUrlPermittedByManifest(origin, manifest) {
    const manifestPermissions = _getManifestPermissionsSync(manifest);
    const originsRegex = (0,webext_patterns__WEBPACK_IMPORTED_MODULE_0__.patternToRegex)(...manifestPermissions.origins);
    return originsRegex.test(origin);
}
function dropOverlappingPermissions({ origins, permissions }) {
    const result = {};
    if (origins) {
        result.origins = (0,webext_patterns__WEBPACK_IMPORTED_MODULE_0__.excludeDuplicatePatterns)(origins);
    }
    if (permissions) {
        result.permissions = [...permissions];
    }
    return result;
}


/***/ }),

/***/ "./node_modules/webext-alert/index.js":
/*!********************************************!*\
  !*** ./node_modules/webext-alert/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webext_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webext-events */ "./node_modules/webext-events/distribution/index.js");
/* harmony import */ var webext_detect_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webext-detect-page */ "./node_modules/webext-alert/node_modules/webext-detect-page/index.js");


async function onPopupClose(watchedWindowId) {
    await (0,webext_events__WEBPACK_IMPORTED_MODULE_0__.oneEvent)(chrome.windows.onRemoved, closedWindowId => closedWindowId === watchedWindowId);
}
// This function will be serialized, do not use variables outside its scope
function pageScript() {
    const button = document.querySelector('button');
    button.addEventListener('click', _ => {
        window.close();
    });
    window.addEventListener('blur', _ => {
        window.close();
    });
    window.resizeBy(0, document.body.scrollHeight - window.innerHeight);
    window.moveTo((screen.width - window.outerWidth) / 2, (screen.height - window.outerHeight) / 2);
    button.focus();
}
// TODO: Add bundler to include base-css
const css = /* css */ `
	/*! https://npm.im/webext-base-css */

	/* Chrome only: -webkit-hyphens */
	/* Safari only: _::-webkit-full-page-media */

	/* webpackIgnore: true */
	@import url('chrome://global/skin/in-content/common.css') (min--moz-device-pixel-ratio:0); /* Firefox-only */

	:root {
		--background-color-for-chrome: #292a2d;
		max-width: 700px;
		margin: auto;
	}

	body {
		--body-margin-h: 8px;
		margin-left: var(--body-margin-h);
		margin-right: var(--body-margin-h);
	}

	/* Selector matches Firefox’ */
	input[type='number'],
	input[type='password'],
	input[type='search'],
	input[type='text'],
	input[type='url'],
	input:not([type]),
	textarea {
		display: block;
		box-sizing: border-box;
		margin-left: 0;
		width: 100%;
		resize: vertical;
		-moz-tab-size: 4 !important;
		tab-size: 4 !important;
	}

	input[type='checkbox'] {
		vertical-align: -0.15em;
	}

	@supports (not (-webkit-hyphens:none)) and (not (-moz-appearance:none)) and (list-style-type:'*') {
		textarea:focus {
			/* Inexplicably missing from Chrome’s input style https://github.com/chromium/chromium/blob/6bea0557fe/extensions/renderer/resources/extension.css#L287 */
			border-color: #4d90fe;
			transition: border-color 200ms;
		}
	}

	hr {
		margin-right: calc(-1 * var(--body-margin-h));
		margin-left: calc(-1 * var(--body-margin-h));
		border: none;
		border-bottom: 1px solid #aaa4;
	}

	img {
		vertical-align: middle;
	}

	_::-webkit-full-page-media,
	_:future,
	:root {
		font-family: -apple-system, BlinkMacSystemFont, sans-serif, 'Apple Color Emoji';
	}

	_::-webkit-full-page-media,
	_:future,
	input[type='number'],
	input[type='password'],
	input[type='search'],
	input[type='text'],
	input[type='url'],
	input:not([type]),
	textarea {
		border: solid 1px #888;
		padding: 0.4em;
		font: inherit;
		-webkit-appearance: none;
	}

	@media (prefers-color-scheme: dark) {
		:root {
			color-scheme: dark;
			background-color: var(--background-color-for-chrome);
		}

		body,
		h3 { /* Chrome #3 */
			color: #e8eaed;
		}

		a {
			color: var(--link-color, #8ab4f8);
		}

		a:active {
			color: var(--link-color-active, #b6d3f9);
		}

		input[type='number'],
		input[type='password'],
		input[type='search'],
		input[type='text'],
		input[type='url'],
		input:not([type]),
		textarea {
			color: inherit;
			background-color: transparent;
		}
	}

	/* End webext-base-css */

	body {
		box-sizing: border-box;
		min-height: 100vh;
		margin: 0;
		padding: 1em;
		justify-content: center;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		line-height: 1.5;
		font-family: system, system-ui, sans-serif;
	}

	button {
		margin-top: 1em;
		margin-left: auto;
	}
`;
function getPage(message = '') {
    return /* html */ `
		<!doctype html>
		<meta charset="utf-8" />
		<title>${chrome.runtime.getManifest().name}</title>
		<style>${css}</style>
		<script defer src="alert.js"></script>
		<body>
			<main>${message}</main>
			<button>Ok</button>
		</body>
		<script>(${pageScript.toString()})()</script>
	`;
}
async function popupAlert(message) {
    const width = 420;
    const height = 150;
    // `chrome` is Promisified where `popupAlert` is used
    const popup = await chrome.windows.create({
        type: 'popup',
        url: 'data:text/html,' + encodeURIComponent(getPage(message)),
        focused: true,
        height,
        width,
    });
    await onPopupClose(popup.id);
}
// `alert()` is not available in any service worker
// `alert()` is not available in any background context in Firefox and Safari
const webextAlert = (0,webext_detect_page__WEBPACK_IMPORTED_MODULE_1__.isBackgroundWorker)() || (!(0,webext_detect_page__WEBPACK_IMPORTED_MODULE_1__.isChrome)() && (0,webext_detect_page__WEBPACK_IMPORTED_MODULE_1__.isBackgroundPage)())
    ? popupAlert
    : alert;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (webextAlert);


/***/ }),

/***/ "./node_modules/webext-alert/node_modules/webext-detect-page/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/webext-alert/node_modules/webext-detect-page/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contextNames: () => (/* binding */ contextNames),
/* harmony export */   disableWebextDetectPageCache: () => (/* binding */ disableWebextDetectPageCache),
/* harmony export */   getContextName: () => (/* binding */ getContextName),
/* harmony export */   isBackground: () => (/* binding */ isBackground),
/* harmony export */   isBackgroundPage: () => (/* binding */ isBackgroundPage),
/* harmony export */   isBackgroundWorker: () => (/* binding */ isBackgroundWorker),
/* harmony export */   isChrome: () => (/* binding */ isChrome),
/* harmony export */   isContentScript: () => (/* binding */ isContentScript),
/* harmony export */   isDevTools: () => (/* binding */ isDevTools),
/* harmony export */   isDevToolsPage: () => (/* binding */ isDevToolsPage),
/* harmony export */   isExtensionContext: () => (/* binding */ isExtensionContext),
/* harmony export */   isFirefox: () => (/* binding */ isFirefox),
/* harmony export */   isMobileSafari: () => (/* binding */ isMobileSafari),
/* harmony export */   isOptionsPage: () => (/* binding */ isOptionsPage),
/* harmony export */   isPersistentBackgroundPage: () => (/* binding */ isPersistentBackgroundPage),
/* harmony export */   isSafari: () => (/* binding */ isSafari),
/* harmony export */   isSidePanel: () => (/* binding */ isSidePanel),
/* harmony export */   isWebPage: () => (/* binding */ isWebPage)
/* harmony export */ });
let cache = true;
function disableWebextDetectPageCache() {
    cache = false;
}
function isCurrentPathname(path) {
    if (!path) {
        return false;
    }
    try {
        const { pathname } = new URL(path, location.origin);
        return pathname === location.pathname;
    }
    catch {
        return false;
    }
}
function getManifest(_version) {
    return globalThis.chrome?.runtime?.getManifest?.();
}
function once(function_) {
    let result;
    return () => {
        if (!cache || result === undefined) {
            result = function_();
        }
        return result;
    };
}
/** Indicates whether the code is being run on http(s):// pages (it could be in a content script or regular web context) */
const isWebPage = once(() => ['about:', 'http:', 'https:'].includes(location.protocol));
/** Indicates whether the code is being run in extension contexts that have access to the chrome API */
const isExtensionContext = once(() => typeof globalThis.chrome?.extension === 'object');
/** Indicates whether the code is being run in a content script */
const isContentScript = once(() => isExtensionContext() && isWebPage());
/** Indicates whether the code is being run in a background context */
const isBackground = () => isBackgroundPage() || isBackgroundWorker();
/** Indicates whether the code is being run in a background page */
const isBackgroundPage = once(() => {
    const manifest = getManifest(2);
    if (manifest
        && isCurrentPathname(manifest.background_page ?? manifest.background?.page)) {
        return true;
    }
    return Boolean(manifest?.background?.scripts
        && isCurrentPathname('/_generated_background_page.html'));
});
/** Indicates whether the code is being run in a background worker */
const isBackgroundWorker = once(() => isCurrentPathname(getManifest(3)?.background?.service_worker));
/** Indicates whether the code is being run in a persistent background page (as opposed to an Event Page or Background Worker, both of which can be unloaded by the browser) */
const isPersistentBackgroundPage = once(() => isBackgroundPage()
    && getManifest(2)?.manifest_version === 2 // Firefox can have a background page on MV3, but can't be persistent
    && getManifest(2)?.background?.persistent !== false);
/** Indicates whether the code is being run in an options page. This only works if the current page’s URL matches the one specified in the extension's `manifest.json` */
const isOptionsPage = once(() => {
    const path = getManifest()?.options_ui?.page;
    if (typeof path !== 'string') {
        return false;
    }
    const url = new URL(path, location.origin);
    return url.pathname === location.pathname;
});
/** Indicates whether the code is being run in an options page. This only works if the current page’s URL matches the one specified in the extension's `manifest.json` */
const isSidePanel = once(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Not yet in @types/chrome
    const path = getManifest(3)?.['side_panel']?.default_path;
    if (typeof path !== 'string') {
        return false;
    }
    const url = new URL(path, location.origin);
    return url.pathname === location.pathname;
});
/** Indicates whether the code is being run in a dev tools page. This only works if the current page’s URL matches the one specified in the extension's `manifest.json` `devtools_page` field. */
const isDevToolsPage = once(() => {
    const devtoolsPage = isExtensionContext() && chrome.devtools && getManifest()?.devtools_page;
    if (typeof devtoolsPage !== 'string') {
        return false;
    }
    const url = new URL(devtoolsPage, location.origin);
    return url.pathname === location.pathname;
});
/** Indicates whether the code is being run in the dev tools page. Unlike `isDevToolsPage`, this works in any page that has the `chrome.devTools` API */
const isDevTools = () => Boolean(globalThis.chrome?.devtools);
/** Loosely detect Firefox via user agent */
const isFirefox = () => globalThis.navigator?.userAgent.includes('Firefox');
/** Loosely detect Chrome via user agent (might also include Chromium and forks like Opera) */
const isChrome = () => globalThis.navigator?.userAgent.includes('Chrome');
/** Loosely detect Safari via user agent */
const isSafari = () => !isChrome() && globalThis.navigator?.userAgent.includes('Safari');
/** Loosely detect Mobile Safari via user agent */
const isMobileSafari = () => isSafari() && globalThis.navigator?.userAgent.includes('Mobile');
const contextChecks = {
    contentScript: isContentScript,
    background: isBackground,
    options: isOptionsPage,
    sidePanel: isSidePanel,
    devTools: isDevTools,
    devToolsPage: isDevToolsPage,
    extension: isExtensionContext,
    web: isWebPage,
};
const contextNames = Object.keys(contextChecks);
function getContextName() {
    for (const [name, test] of Object.entries(contextChecks)) {
        if (test()) {
            return name;
        }
    }
    return 'unknown';
}


/***/ }),

/***/ "./node_modules/webext-content-scripts/index.js":
/*!******************************************************!*\
  !*** ./node_modules/webext-content-scripts/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeFunction: () => (/* binding */ executeFunction),
/* harmony export */   executeScript: () => (/* binding */ executeScript),
/* harmony export */   getTabsByUrl: () => (/* binding */ getTabsByUrl),
/* harmony export */   injectContentScript: () => (/* binding */ injectContentScript),
/* harmony export */   insertCSS: () => (/* binding */ insertCSS),
/* harmony export */   isScriptableUrl: () => (/* binding */ isScriptableUrl)
/* harmony export */ });
/* harmony import */ var webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webext-polyfill-kinda */ "./node_modules/webext-polyfill-kinda/index.js");
/* harmony import */ var webext_patterns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webext-patterns */ "./node_modules/webext-patterns/index.js");


const gotScripting = Boolean(globalThis.chrome?.scripting);
function castTarget(target) {
    return typeof target === 'object' ? target : {
        tabId: target,
        frameId: 0,
    };
}
function castAllFramesTarget(target) {
    if (typeof target === 'object') {
        return { ...target, allFrames: false };
    }
    return {
        tabId: target,
        frameId: undefined,
        allFrames: true,
    };
}
function castArray(possibleArray) {
    if (Array.isArray(possibleArray)) {
        return possibleArray;
    }
    return [possibleArray];
}
const nativeFunction = /^function \w+\(\) {[\n\s]+\[native code][\n\s]+}/;
async function executeFunction(target, function_, ...args) {
    if (nativeFunction.test(String(function_))) {
        throw new TypeError('Native functions need to be wrapped first, like `executeFunction(1, () => alert(1))`');
    }
    const { frameId, tabId } = castTarget(target);
    if (gotScripting) {
        const [injection] = await chrome.scripting.executeScript({
            target: {
                tabId,
                frameIds: [frameId],
            },
            func: function_,
            args,
        });
        return injection?.result;
    }
    const [result] = await webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__["default"].tabs.executeScript(tabId, {
        code: `(${function_.toString()})(...${JSON.stringify(args)})`,
        matchAboutBlank: true, // Needed for `srcdoc` frames; doesn't hurt normal pages
        frameId,
    });
    return result;
}
function arrayOrUndefined(value) {
    return value === undefined ? undefined : [value];
}
// eslint-disable-next-line @typescript-eslint/naming-convention -- It follows the native naming
async function insertCSS({ tabId, frameId, files, allFrames, matchAboutBlank, runAt, }, { ignoreTargetErrors } = {}) {
    const everyInsertion = Promise.all(files.map(async (content) => {
        if (typeof content === 'string') {
            content = { file: content };
        }
        if (gotScripting) {
            return chrome.scripting.insertCSS({
                target: {
                    tabId,
                    frameIds: arrayOrUndefined(frameId),
                    allFrames: frameId === undefined ? allFrames : undefined,
                },
                files: 'file' in content ? [content.file] : undefined,
                css: 'code' in content ? content.code : undefined,
            });
        }
        return webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__["default"].tabs.insertCSS(tabId, {
            ...content,
            matchAboutBlank,
            allFrames,
            frameId,
            runAt: runAt ?? 'document_start', // CSS should prefer `document_start` when unspecified
        });
    }));
    if (ignoreTargetErrors) {
        await catchTargetInjectionErrors(everyInsertion);
    }
    else {
        await everyInsertion;
    }
}
function assertNoCode(files) {
    if (files.some(content => 'code' in content)) {
        throw new Error('chrome.scripting does not support injecting strings of `code`');
    }
}
async function executeScript({ tabId, frameId, files, allFrames, matchAboutBlank, runAt, }, { ignoreTargetErrors } = {}) {
    const normalizedFiles = files.map(file => typeof file === 'string' ? { file } : file);
    if (gotScripting) {
        assertNoCode(normalizedFiles);
        const injection = chrome.scripting.executeScript({
            target: {
                tabId,
                frameIds: arrayOrUndefined(frameId),
                allFrames: frameId === undefined ? allFrames : undefined,
            },
            files: normalizedFiles.map(({ file }) => file),
        });
        if (ignoreTargetErrors) {
            await catchTargetInjectionErrors(injection);
        }
        else {
            await injection;
        }
        // Don't return `injection`; the "return value" of a file is generally not useful
        return;
    }
    // Don't use .map(), `code` injections can't be "parallel"
    const executions = [];
    for (const content of normalizedFiles) {
        // Files are executed in order, but `code` isn’t, so it must await the last script before injecting more
        if ('code' in content) {
            // eslint-disable-next-line no-await-in-loop -- On purpose, see above
            await executions.at(-1);
        }
        executions.push(webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__["default"].tabs.executeScript(tabId, {
            ...content,
            matchAboutBlank,
            allFrames,
            frameId,
            runAt,
        }));
    }
    if (ignoreTargetErrors) {
        await catchTargetInjectionErrors(Promise.all(executions));
    }
    else {
        await Promise.all(executions);
    }
}
async function getTabsByUrl(matches, excludeMatches) {
    if (matches.length === 0) {
        return [];
    }
    const exclude = excludeMatches ? (0,webext_patterns__WEBPACK_IMPORTED_MODULE_1__.patternToRegex)(...excludeMatches) : undefined;
    const tabs = await webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__["default"].tabs.query({ url: matches });
    return tabs
        .filter(tab => tab.id && tab.url && (exclude ? !exclude.test(tab.url) : true))
        .map(tab => tab.id);
}
async function injectContentScript(where, scripts, options = {}) {
    const targets = castArray(where);
    await Promise.all(targets.map(async (target) => injectContentScriptInSpecificTarget(castAllFramesTarget(target), scripts, options)));
}
async function injectContentScriptInSpecificTarget({ frameId, tabId, allFrames }, scripts, options = {}) {
    const injections = castArray(scripts).flatMap(script => [
        insertCSS({
            tabId,
            frameId,
            allFrames,
            files: script.css ?? [],
            matchAboutBlank: script.matchAboutBlank ?? script.match_about_blank,
            runAt: script.runAt ?? script.run_at,
        }, options),
        executeScript({
            tabId,
            frameId,
            allFrames,
            files: script.js ?? [],
            matchAboutBlank: script.matchAboutBlank ?? script.match_about_blank,
            runAt: script.runAt ?? script.run_at,
        }, options),
    ]);
    await Promise.all(injections);
}
// Sourced from:
// https://source.chromium.org/chromium/chromium/src/+/main:extensions/common/extension_urls.cc;drc=6b42116fe3b3d93a77750bdcc07948e98a728405;l=29
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts
const blockedPrefixes = [
    'chrome.google.com/webstore', // Host *and* pathname
    'chromewebstore.google.com',
    'accounts-static.cdn.mozilla.net',
    'accounts.firefox.com',
    'addons.cdn.mozilla.net',
    'addons.mozilla.org',
    'api.accounts.firefox.com',
    'content.cdn.mozilla.net',
    'discovery.addons.mozilla.org',
    'input.mozilla.org',
    'install.mozilla.org',
    'oauth.accounts.firefox.com',
    'profile.accounts.firefox.com',
    'support.mozilla.org',
    'sync.services.mozilla.com',
    'testpilot.firefox.com',
];
function isScriptableUrl(url) {
    if (!url?.startsWith('http')) {
        return false;
    }
    const cleanUrl = url.replace(/^https?:\/\//, '');
    return blockedPrefixes.every(blocked => !cleanUrl.startsWith(blocked));
}
const targetErrors = /^No frame with id \d+ in tab \d+.$|^No tab with id: \d+.$|^The tab was closed.$|^The frame was removed.$/;
async function catchTargetInjectionErrors(promise) {
    try {
        await promise;
    }
    catch (error) {
        // @ts-expect-error Optional chaining is good enough
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (!targetErrors.test(error?.message)) {
            throw error;
        }
    }
}


/***/ }),

/***/ "./node_modules/webext-dynamic-content-scripts/distribution/deduplicator.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/webext-dynamic-content-scripts/distribution/deduplicator.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   excludeDuplicateFiles: () => (/* binding */ excludeDuplicateFiles)
/* harmony export */ });
// Not all keys are supported by the polyfill to begin with
// matchAboutBlank: https://github.com/fregante/content-scripts-register-polyfill/issues/2
// *Globs: https://github.com/fregante/content-scripts-register-polyfill/issues/35
function getDifferentiators(c) {
    return JSON.stringify([c.all_frames, c.exclude_matches, c.run_at]);
}
/**
Exclude same-file injections from a manifest `content_script` array due to a change in the polyfill.
https://github.com/fregante/webext-dynamic-content-scripts/issues/62
*/
function excludeDuplicateFiles(contentScripts, { warn = true } = {}) {
    const uniques = new Map();
    const filterWarnAndAdd = (files, context) => {
        if (!files) {
            return [];
        }
        return files.filter(file => {
            // If a content script has the same options, then it's 100% duplicate and safe to remove.
            // If it doesn't have the same options, then removing it can cause issues.
            const differentiators = getDifferentiators(context);
            // Exclude files from current script if they were already injected by another script
            if (uniques.has(file)) {
                // Warn the user in case this removal changes the behavior from what's expected
                if (warn && differentiators !== uniques.get(file)) {
                    console.warn(`Duplicate file in the manifest content_scripts: ${file} \nMore info: https://github.com/fregante/webext-dynamic-content-scripts/issues/62`);
                }
                return false;
            }
            uniques.set(file, differentiators);
            return true;
        });
    };
    return contentScripts.flatMap(contentScript => {
        // To avoid confusion, drop the `matches` array since it's not used by `webext-dynamic-content-scripts`
        const { matches, ...cleanContentScript } = contentScript;
        const result = ({
            ...cleanContentScript,
            js: filterWarnAndAdd(contentScript.js, contentScript),
            css: filterWarnAndAdd(contentScript.css, contentScript),
        });
        // Drop entire block if complete duplicate (the `matches` array could be different, but that doesn't matter in `webext-dynamic-content-scripts`)
        return result.css.length + result.js.length === 0 ? [] : result;
    });
}


/***/ }),

/***/ "./node_modules/webext-dynamic-content-scripts/distribution/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webext-dynamic-content-scripts/distribution/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib.js */ "./node_modules/webext-dynamic-content-scripts/distribution/lib.js");

void (0,_lib_js__WEBPACK_IMPORTED_MODULE_0__.init)();


/***/ }),

/***/ "./node_modules/webext-dynamic-content-scripts/distribution/inject-to-existing-tabs.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/webext-dynamic-content-scripts/distribution/inject-to-existing-tabs.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   injectToExistingTabs: () => (/* binding */ injectToExistingTabs)
/* harmony export */ });
/* harmony import */ var webext_content_scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webext-content-scripts */ "./node_modules/webext-content-scripts/index.js");

async function injectToExistingTabs(origins, scripts) {
    const excludeMatches = scripts.flatMap(script => script.matches ?? []);
    return (0,webext_content_scripts__WEBPACK_IMPORTED_MODULE_0__.injectContentScript)(await (0,webext_content_scripts__WEBPACK_IMPORTED_MODULE_0__.getTabsByUrl)(origins, excludeMatches), scripts, { ignoreTargetErrors: true });
}


/***/ }),

/***/ "./node_modules/webext-dynamic-content-scripts/distribution/lib.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webext-dynamic-content-scripts/distribution/lib.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var webext_additional_permissions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webext-additional-permissions */ "./node_modules/webext-additional-permissions/index.js");
/* harmony import */ var _deduplicator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deduplicator.js */ "./node_modules/webext-dynamic-content-scripts/distribution/deduplicator.js");
/* harmony import */ var _inject_to_existing_tabs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inject-to-existing-tabs.js */ "./node_modules/webext-dynamic-content-scripts/distribution/inject-to-existing-tabs.js");
/* harmony import */ var _register_content_script_shim_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register-content-script-shim.js */ "./node_modules/webext-dynamic-content-scripts/distribution/register-content-script-shim.js");




const registeredScripts = new Map();
// In Firefox, paths in the manifest are converted to full URLs under `moz-extension://` but browser.contentScripts expects exclusively relative paths
function makePathRelative(file) {
    return new URL(file, location.origin).pathname;
}
// Automatically register the content scripts on the new origins
async function registerOnOrigins({ origins: newOrigins, }) {
    const { content_scripts: rawManifest, manifest_version: manifestVersion } = chrome.runtime.getManifest();
    if (!rawManifest) {
        throw new Error('webext-dynamic-content-scripts tried to register scripts on the new host permissions, but no content scripts were found in the manifest.');
    }
    const cleanManifest = (0,_deduplicator_js__WEBPACK_IMPORTED_MODULE_1__.excludeDuplicateFiles)(rawManifest, { warn: manifestVersion === 2 });
    // Register one at a time to allow removing one at a time as well
    for (const origin of newOrigins || []) {
        for (const config of cleanManifest) {
            const registeredScript = (0,_register_content_script_shim_js__WEBPACK_IMPORTED_MODULE_3__.registerContentScript)({
                // Always convert paths here because we don't know whether Firefox MV3 will accept full URLs
                js: config.js?.map(file => makePathRelative(file)),
                css: config.css?.map(file => makePathRelative(file)),
                allFrames: config.all_frames,
                matches: [origin],
                excludeMatches: config.matches,
                runAt: config.run_at,
            });
            registeredScripts.set(origin, registeredScript);
        }
    }
    // May not be needed in the future in Firefox
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1458947
    void (0,_inject_to_existing_tabs_js__WEBPACK_IMPORTED_MODULE_2__.injectToExistingTabs)(newOrigins || [], cleanManifest);
}
function handleNewPermissions(permissions) {
    if (permissions.origins && permissions.origins.length > 0) {
        void registerOnOrigins(permissions);
    }
}
async function handledDroppedPermissions({ origins }) {
    if (!origins || origins.length === 0) {
        return;
    }
    for (const [origin, scriptPromise] of registeredScripts) {
        if (origins.includes(origin)) {
            // eslint-disable-next-line no-await-in-loop
            const script = await scriptPromise;
            void script.unregister();
        }
    }
}
async function init() {
    chrome.permissions.onRemoved.addListener(handledDroppedPermissions);
    chrome.permissions.onAdded.addListener(handleNewPermissions);
    await registerOnOrigins(await (0,webext_additional_permissions__WEBPACK_IMPORTED_MODULE_0__.getAdditionalPermissions)({
        strictOrigins: false,
    }));
}


/***/ }),

/***/ "./node_modules/webext-dynamic-content-scripts/distribution/register-content-script-shim.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/webext-dynamic-content-scripts/distribution/register-content-script-shim.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chromeRegister: () => (/* binding */ chromeRegister),
/* harmony export */   firefoxRegister: () => (/* binding */ firefoxRegister),
/* harmony export */   registerContentScript: () => (/* binding */ registerContentScript)
/* harmony export */ });
/* harmony import */ var content_scripts_register_polyfill_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! content-scripts-register-polyfill/ponyfill.js */ "./node_modules/content-scripts-register-polyfill/ponyfill.js");

const chromeRegister = globalThis.chrome?.scripting?.registerContentScripts;
const firefoxRegister = globalThis.browser?.contentScripts?.register;
async function registerContentScript(contentScript) {
    if (chromeRegister) {
        const id = 'webext-dynamic-content-script-' + JSON.stringify(contentScript);
        try {
            await chromeRegister([{
                    ...contentScript,
                    id,
                }]);
        }
        catch (error) {
            if (!error?.message.startsWith('Duplicate script ID')) {
                throw error;
            }
        }
        return {
            unregister: async () => chrome.scripting.unregisterContentScripts({ ids: [id] }),
        };
    }
    const firefoxContentScript = {
        ...contentScript,
        js: contentScript.js?.map(file => ({ file })),
        css: contentScript.css?.map(file => ({ file })),
    };
    if (firefoxRegister) {
        return firefoxRegister(firefoxContentScript);
    }
    return (0,content_scripts_register_polyfill_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(firefoxContentScript);
}


/***/ }),

/***/ "./node_modules/webext-events/distribution/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/webext-events/distribution/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _testing: () => (/* reexport safe */ _on_context_invalidated_js__WEBPACK_IMPORTED_MODULE_0__._testing),
/* harmony export */   onContextInvalidated: () => (/* reexport safe */ _on_context_invalidated_js__WEBPACK_IMPORTED_MODULE_0__.onContextInvalidated),
/* harmony export */   onExtensionStart: () => (/* reexport safe */ _on_extension_start_js__WEBPACK_IMPORTED_MODULE_1__.onExtensionStart),
/* harmony export */   oneEvent: () => (/* reexport safe */ _one_event_js__WEBPACK_IMPORTED_MODULE_2__.oneEvent),
/* harmony export */   wasContextInvalidated: () => (/* reexport safe */ _on_context_invalidated_js__WEBPACK_IMPORTED_MODULE_0__.wasContextInvalidated)
/* harmony export */ });
/* harmony import */ var _on_context_invalidated_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./on-context-invalidated.js */ "./node_modules/webext-events/distribution/on-context-invalidated.js");
/* harmony import */ var _on_extension_start_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./on-extension-start.js */ "./node_modules/webext-events/distribution/on-extension-start.js");
/* harmony import */ var _one_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./one-event.js */ "./node_modules/webext-events/distribution/one-event.js");





/***/ }),

/***/ "./node_modules/webext-events/distribution/on-context-invalidated.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webext-events/distribution/on-context-invalidated.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _testing: () => (/* binding */ _testing),
/* harmony export */   onContextInvalidated: () => (/* binding */ onContextInvalidated),
/* harmony export */   wasContextInvalidated: () => (/* binding */ wasContextInvalidated)
/* harmony export */ });
class OnContextInvalidated {
    #timer;
    #controller = new AbortController();
    // Calling this will start the polling
    get signal() {
        if (this.#timer) {
            return this.#controller.signal;
        }
        this.#timer = setInterval(() => {
            if (wasContextInvalidated()) {
                this.#controller.abort();
                clearInterval(this.#timer);
            }
        }, 200);
        return this.#controller.signal;
    }
    get promise() {
        return new Promise(resolve => {
            this.addListener(resolve);
        });
    }
    /**
     *
     * @param callback         The function to call when the context is invalidated
     * @param options.signal   The signal to remove the listener, like with the regular `addEventListener()`
     */
    addListener(callback, { signal } = {}) {
        if (this.signal.aborted && !signal?.aborted) {
            setTimeout(callback, 0);
            return;
        }
        this.signal.addEventListener('abort', callback, { once: true, signal });
    }
}
const onContextInvalidated = new OnContextInvalidated();
const wasContextInvalidated = () => !chrome.runtime?.id;
// This is done to ensure each listener and abortsignal are independent in each test
const _testing = OnContextInvalidated;


/***/ }),

/***/ "./node_modules/webext-events/distribution/on-extension-start.js":
/*!***********************************************************************!*\
  !*** ./node_modules/webext-events/distribution/on-extension-start.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onExtensionStart: () => (/* binding */ onExtensionStart)
/* harmony export */ });
/* harmony import */ var webext_detect_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webext-detect-page */ "./node_modules/webext-events/node_modules/webext-detect-page/index.js");

const storageKey = '__webext-events__startup';
const event = new EventTarget();
let hasRun = false;
let hasListeners = false;
// @ts-expect-error No need to load `browser` types yet
const browserStorage = globalThis.browser?.storage ?? globalThis.chrome?.storage;
async function runner() {
    hasRun = true;
    if (!hasListeners) {
        return;
    }
    if ((0,webext_detect_page__WEBPACK_IMPORTED_MODULE_0__.isPersistentBackgroundPage)()) {
        // It's certainly the first and only time
        event.dispatchEvent(new Event('extension-start'));
        return;
    }
    if (!browserStorage?.session) {
        if ((0,webext_detect_page__WEBPACK_IMPORTED_MODULE_0__.isChrome)() && chrome.runtime.getManifest().manifest_version === 2) {
            console.warn('onExtensionStart is unable to determine whether it’s being run for the first time on MV2 Event Pages in Chrome. It will run the listeners anyway.');
        }
        else {
            console.warn('onExtensionStart is unable to determine whether it’s being run for the first time without the `storage` permission. It will run the listeners anyway');
        }
        event.dispatchEvent(new Event('extension-start'));
        return;
    }
    const storage = await browserStorage.session.get(storageKey);
    if (storageKey in storage) {
        return;
    }
    await browserStorage.session.set({ [storageKey]: true });
    event.dispatchEvent(new Event('extension-start'));
}
const onExtensionStart = Object.freeze({
    addListener(callback) {
        if (hasRun) {
            console.warn('onExtensionStart.addListener() was called after the extension started. The callback will not be called.');
        }
        else {
            hasListeners = true;
            event.addEventListener('extension-start', callback);
        }
    },
    removeListener(callback) {
        event.removeEventListener('extension-start', callback);
    },
});
// Automatically register the runner
setTimeout(runner, 100);


/***/ }),

/***/ "./node_modules/webext-events/distribution/one-event.js":
/*!**************************************************************!*\
  !*** ./node_modules/webext-events/distribution/one-event.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   oneEvent: () => (/* binding */ oneEvent)
/* harmony export */ });
async function oneEvent(event, filter) {
    await new Promise(resolve => {
        // TODO: VoidFunction should not be necessary, it's equivalent to using "any"
        const listener = (...parameters) => {
            if (!filter || filter(...parameters)) {
                resolve();
                event.removeListener(listener);
            }
        };
        event.addListener(listener);
    });
}


/***/ }),

/***/ "./node_modules/webext-events/node_modules/webext-detect-page/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/webext-events/node_modules/webext-detect-page/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contextNames: () => (/* binding */ contextNames),
/* harmony export */   disableWebextDetectPageCache: () => (/* binding */ disableWebextDetectPageCache),
/* harmony export */   getContextName: () => (/* binding */ getContextName),
/* harmony export */   isBackground: () => (/* binding */ isBackground),
/* harmony export */   isBackgroundPage: () => (/* binding */ isBackgroundPage),
/* harmony export */   isBackgroundWorker: () => (/* binding */ isBackgroundWorker),
/* harmony export */   isChrome: () => (/* binding */ isChrome),
/* harmony export */   isContentScript: () => (/* binding */ isContentScript),
/* harmony export */   isDevTools: () => (/* binding */ isDevTools),
/* harmony export */   isDevToolsPage: () => (/* binding */ isDevToolsPage),
/* harmony export */   isExtensionContext: () => (/* binding */ isExtensionContext),
/* harmony export */   isFirefox: () => (/* binding */ isFirefox),
/* harmony export */   isMobileSafari: () => (/* binding */ isMobileSafari),
/* harmony export */   isOptionsPage: () => (/* binding */ isOptionsPage),
/* harmony export */   isPersistentBackgroundPage: () => (/* binding */ isPersistentBackgroundPage),
/* harmony export */   isSafari: () => (/* binding */ isSafari),
/* harmony export */   isSidePanel: () => (/* binding */ isSidePanel),
/* harmony export */   isWebPage: () => (/* binding */ isWebPage)
/* harmony export */ });
let cache = true;
function disableWebextDetectPageCache() {
    cache = false;
}
function isCurrentPathname(path) {
    if (!path) {
        return false;
    }
    try {
        const { pathname } = new URL(path, location.origin);
        return pathname === location.pathname;
    }
    catch {
        return false;
    }
}
function getManifest(_version) {
    return globalThis.chrome?.runtime?.getManifest?.();
}
function once(function_) {
    let result;
    return () => {
        if (!cache || result === undefined) {
            result = function_();
        }
        return result;
    };
}
/** Indicates whether the code is being run on http(s):// pages (it could be in a content script or regular web context) */
const isWebPage = once(() => ['about:', 'http:', 'https:'].includes(location.protocol));
/** Indicates whether the code is being run in extension contexts that have access to the chrome API */
const isExtensionContext = once(() => typeof globalThis.chrome?.extension === 'object');
/** Indicates whether the code is being run in a content script */
const isContentScript = once(() => isExtensionContext() && isWebPage());
/** Indicates whether the code is being run in a background context */
const isBackground = () => isBackgroundPage() || isBackgroundWorker();
/** Indicates whether the code is being run in a background page */
const isBackgroundPage = once(() => {
    const manifest = getManifest(2);
    if (manifest
        && isCurrentPathname(manifest.background_page ?? manifest.background?.page)) {
        return true;
    }
    return Boolean(manifest?.background?.scripts
        && isCurrentPathname('/_generated_background_page.html'));
});
/** Indicates whether the code is being run in a background worker */
const isBackgroundWorker = once(() => isCurrentPathname(getManifest(3)?.background?.service_worker));
/** Indicates whether the code is being run in a persistent background page (as opposed to an Event Page or Background Worker, both of which can be unloaded by the browser) */
const isPersistentBackgroundPage = once(() => isBackgroundPage()
    && getManifest(2)?.manifest_version === 2 // Firefox can have a background page on MV3, but can't be persistent
    && getManifest(2)?.background?.persistent !== false);
/** Indicates whether the code is being run in an options page. This only works if the current page’s URL matches the one specified in the extension's `manifest.json` */
const isOptionsPage = once(() => {
    const path = getManifest()?.options_ui?.page;
    if (typeof path !== 'string') {
        return false;
    }
    const url = new URL(path, location.origin);
    return url.pathname === location.pathname;
});
/** Indicates whether the code is being run in an options page. This only works if the current page’s URL matches the one specified in the extension's `manifest.json` */
const isSidePanel = once(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Not yet in @types/chrome
    const path = getManifest(3)?.['side_panel']?.default_path;
    if (typeof path !== 'string') {
        return false;
    }
    const url = new URL(path, location.origin);
    return url.pathname === location.pathname;
});
/** Indicates whether the code is being run in a dev tools page. This only works if the current page’s URL matches the one specified in the extension's `manifest.json` `devtools_page` field. */
const isDevToolsPage = once(() => {
    const devtoolsPage = isExtensionContext() && chrome.devtools && getManifest()?.devtools_page;
    if (typeof devtoolsPage !== 'string') {
        return false;
    }
    const url = new URL(devtoolsPage, location.origin);
    return url.pathname === location.pathname;
});
/** Indicates whether the code is being run in the dev tools page. Unlike `isDevToolsPage`, this works in any page that has the `chrome.devTools` API */
const isDevTools = () => Boolean(globalThis.chrome?.devtools);
/** Loosely detect Firefox via user agent */
const isFirefox = () => globalThis.navigator?.userAgent.includes('Firefox');
/** Loosely detect Chrome via user agent (might also include Chromium and forks like Opera) */
const isChrome = () => globalThis.navigator?.userAgent.includes('Chrome');
/** Loosely detect Safari via user agent */
const isSafari = () => !isChrome() && globalThis.navigator?.userAgent.includes('Safari');
/** Loosely detect Mobile Safari via user agent */
const isMobileSafari = () => isSafari() && globalThis.navigator?.userAgent.includes('Mobile');
const contextChecks = {
    contentScript: isContentScript,
    background: isBackground,
    options: isOptionsPage,
    sidePanel: isSidePanel,
    devTools: isDevTools,
    devToolsPage: isDevToolsPage,
    extension: isExtensionContext,
    web: isWebPage,
};
const contextNames = Object.keys(contextChecks);
function getContextName() {
    for (const [name, test] of Object.entries(contextChecks)) {
        if (test()) {
            return name;
        }
    }
    return 'unknown';
}


/***/ }),

/***/ "./node_modules/webext-patterns/index.js":
/*!***********************************************!*\
  !*** ./node_modules/webext-patterns/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allStarsRegex: () => (/* binding */ allStarsRegex),
/* harmony export */   allUrlsRegex: () => (/* binding */ allUrlsRegex),
/* harmony export */   assertValidPattern: () => (/* binding */ assertValidPattern),
/* harmony export */   doesUrlMatchPatterns: () => (/* binding */ doesUrlMatchPatterns),
/* harmony export */   excludeDuplicatePatterns: () => (/* binding */ excludeDuplicatePatterns),
/* harmony export */   globToRegex: () => (/* binding */ globToRegex),
/* harmony export */   isValidPattern: () => (/* binding */ isValidPattern),
/* harmony export */   patternToRegex: () => (/* binding */ patternToRegex),
/* harmony export */   patternValidationRegex: () => (/* binding */ patternValidationRegex)
/* harmony export */ });
/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! escape-string-regexp */ "./node_modules/webext-patterns/node_modules/escape-string-regexp/index.js");

// Copied from https://github.com/mozilla/gecko-dev/blob/073cc24f53d0cf31403121d768812146e597cc9d/toolkit/components/extensions/schemas/manifest.json#L487-L491
const patternValidationRegex = /^(https?|wss?|file|ftp|\*):\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$|^file:\/\/\/.*$|^resource:\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$|^about:/;
const isFirefox = globalThis.navigator?.userAgent.includes('Firefox/');
const allStarsRegex = isFirefox
    ? /^(https?|wss?):[/][/][^/]+([/].*)?$/
    : /^https?:[/][/][^/]+([/].*)?$/;
const allUrlsRegex = /^(https?|file|ftp):[/]+/;
function assertValidPattern(matchPattern) {
    if (!isValidPattern(matchPattern)) {
        throw new Error(matchPattern + ' is an invalid pattern, it must match ' + String(patternValidationRegex));
    }
}
function isValidPattern(matchPattern) {
    return matchPattern === '<all_urls>' || patternValidationRegex.test(matchPattern);
}
function doesUrlMatchPatterns(url, ...matchPattern) {
    if (matchPattern.includes('<all_urls>') && allUrlsRegex.test(url)) {
        return true;
    }
    if (matchPattern.includes('*://*/*') && allStarsRegex.test(url)) {
        return true;
    }
    for (const pattern of matchPattern) {
        if (patternToRegex(pattern).test(url)) {
            return true;
        }
    }
    return false;
}
function getRawPatternRegex(matchPattern) {
    assertValidPattern(matchPattern);
    // Host undefined for file:///
    let [, protocol, host = '', pathname] = matchPattern.split(/(^[^:]+:[/][/])([^/]+)?/);
    protocol = protocol
        .replace('*', isFirefox ? '(https?|wss?)' : 'https?') // Protocol wildcard
        .replaceAll(/[/]/g, '[/]'); // Escape slashes
    if (host === '*') {
        host = '[^/]+';
    }
    else if (host) {
        host = host
            .replace(/^[*][.]/, '([^/]+.)*') // Initial wildcard
            .replaceAll(/[.]/g, '[.]') // Escape dots
            .replace(/[*]$/, '[^.]+'); // Last wildcard
    }
    pathname = pathname
        .replaceAll(/[/]/g, '[/]') // Escape slashes
        .replaceAll(/[.]/g, '[.]') // Escape dots
        .replaceAll(/[*]/g, '.*'); // Any wildcard
    return '^' + protocol + host + '(' + pathname + ')?$';
}
function patternToRegex(...matchPatterns) {
    // No pattern, match nothing https://stackoverflow.com/q/14115522/288906
    if (matchPatterns.length === 0) {
        return /$./;
    }
    if (matchPatterns.includes('<all_urls>')) {
        return allUrlsRegex;
    }
    if (matchPatterns.includes('*://*/*')) {
        return allStarsRegex;
    }
    return new RegExp(matchPatterns.map(x => getRawPatternRegex(x)).join('|'));
}
// The parens are required by .split() to preserve the symbols
const globSymbols = /([?*]+)/;
function splitReplace(part, index) {
    if (part === '') {
        // Shortcut for speed
        return '';
    }
    if (index % 2 === 0) {
        // Raw text, escape it
        return (0,escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__["default"])(part);
    }
    // Else: Symbol
    if (part.includes('*')) { // Can be more than one and it swallows surrounding question marks
        return '.*';
    }
    return [...part].map(() => isFirefox ? '.' : '.?').join('');
}
function getRawGlobRegex(glob) {
    const regexString = glob
        .split(globSymbols)
        // eslint-disable-next-line unicorn/no-array-callback-reference -- tis ok 🤫
        .map(splitReplace)
        .join('');
    // Drop "start with anything" and "end with anything" sequences because they're the default for regex
    return ('^' + regexString + '$')
        .replace(/^[.][*]/, '')
        .replace(/[.][*]$/, '')
        .replace(/^[$]$/, '.+'); // Catch `*` and `*`
}
function globToRegex(...globs) {
    // No glob, match anything; `include_globs: []` is the default
    if (globs.length === 0) {
        return /.*/;
    }
    return new RegExp(globs.map(x => getRawGlobRegex(x)).join('|'));
}
function excludeDuplicatePatterns(matchPatterns) {
    if (matchPatterns.includes('<all_urls>')) {
        return ['<all_urls>'];
    }
    if (matchPatterns.includes('*://*/*')) {
        return ['*://*/*'];
    }
    return matchPatterns.filter(possibleSubset => !matchPatterns.some(possibleSuperset => possibleSubset !== possibleSuperset && patternToRegex(possibleSuperset).test(possibleSubset)));
}


/***/ }),

/***/ "./node_modules/webext-patterns/node_modules/escape-string-regexp/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/webext-patterns/node_modules/escape-string-regexp/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ escapeStringRegexp)
/* harmony export */ });
function escapeStringRegexp(string) {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Escape characters with special meaning either inside or outside character sets.
	// Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
}


/***/ }),

/***/ "./node_modules/webext-permission-toggle/index.js":
/*!********************************************************!*\
  !*** ./node_modules/webext-permission-toggle/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addPermissionToggle)
/* harmony export */ });
/* harmony import */ var webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webext-polyfill-kinda */ "./node_modules/webext-polyfill-kinda/index.js");
/* harmony import */ var webext_detect_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webext-detect-page */ "./node_modules/webext-permission-toggle/node_modules/webext-detect-page/index.js");
/* harmony import */ var webext_permissions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webext-permissions */ "./node_modules/webext-permissions/distribution/index.js");
/* harmony import */ var webext_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webext-tools */ "./node_modules/webext-tools/index.js");
/* harmony import */ var webext_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! webext-alert */ "./node_modules/webext-alert/index.js");
/* harmony import */ var webext_content_scripts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! webext-content-scripts */ "./node_modules/webext-content-scripts/index.js");






const contextMenuId = 'webext-permission-toggle:add-permission';
let globalOptions;
const chromeP = (0,webext_detect_page__WEBPACK_IMPORTED_MODULE_1__.isChrome)() && globalThis.chrome?.runtime?.getManifest().manifest_version < 3
    ? webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__["default"]
    : chrome;
function assertTab(tab) {
    if (!tab?.id) {
        // Don't use non-ASCII characters because Safari breaks the encoding in executeScript.code
        throw new Error('The browser didn\'t supply any information about the active tab.');
    }
}
function assertUrl(url) {
    if (!url) {
        // Don't use non-ASCII characters because Safari breaks the encoding in executeScript.code
        throw new Error('The browser didn\'t supply the current page\'s URL.');
    }
}
function assertScriptableUrl(url) {
    if (!(0,webext_content_scripts__WEBPACK_IMPORTED_MODULE_5__.isScriptableUrl)(url)) {
        throw new Error(chrome.runtime.getManifest().name + ' can\'t be enabled on this page.');
    }
}
async function isOriginPermanentlyAllowed(origin) {
    return chromeP.permissions.contains({
        origins: [origin + '/*'],
    });
}
function updateItemRaw({ checked, enabled }) {
    chrome.contextMenus.update(contextMenuId, {
        checked,
        enabled,
    });
}
async function updateItem(url) {
    if (!url) {
        // No URL means no activeTab, no manifest permission, no granted permission, OR no permission possible (chrome://)
        // Since we can't differentiate between these cases, we can't disable the toggle
        updateItemRaw({
            enabled: true,
            checked: false,
        });
        return;
    }
    if ((0,webext_content_scripts__WEBPACK_IMPORTED_MODULE_5__.isScriptableUrl)(url)) {
        const { origin } = new URL(url);
        // Manifest permissions can't be removed; this disables the toggle on those domains
        const isDefault = (0,webext_permissions__WEBPACK_IMPORTED_MODULE_2__.isUrlPermittedByManifest)(url);
        updateItemRaw({
            enabled: !isDefault,
            // We might have temporary permission as part of `activeTab`, so it needs to be properly checked
            checked: isDefault || await isOriginPermanentlyAllowed(origin),
        });
        return;
    }
    // We know the URL, and we know it's not scriptable (about:blank, chrome://, etc.)
    updateItemRaw({
        enabled: false,
        checked: false,
    });
}
/**
 * Requests or removes the host permission for the specified tab
 * @returns Whether the permission exists after the request/removal
 */
async function setPermission(url, request) {
    // TODO: Ensure that URL is in `optional_permissions`
    // TODO: https://github.com/fregante/webext-permission-toggle/issues/37
    const permissionData = {
        origins: [
            new URL(url).origin + '/*',
        ],
    };
    await chromeP.permissions[request ? 'request' : 'remove'](permissionData);
    return chromeP.permissions.contains(permissionData);
}
async function handleTabActivated({ tabId }) {
    void updateItem(await (0,webext_tools__WEBPACK_IMPORTED_MODULE_3__.getTabUrl)(tabId) ?? '');
}
async function handleClick({ checked, menuItemId }, tab) {
    if (menuItemId !== contextMenuId) {
        return;
    }
    let url;
    try {
        assertTab(tab);
        url = tab.url ?? await (0,webext_tools__WEBPACK_IMPORTED_MODULE_3__.getTabUrl)(tab.id);
        assertUrl(url);
        assertScriptableUrl(url);
        const permissionExistsNow = await setPermission(url, checked);
        const settingWasSuccessful = permissionExistsNow === checked;
        // If successful, Chrome already natively updated the context menu item.
        if (!settingWasSuccessful) {
            updateItemRaw({
                checked: permissionExistsNow,
            });
        }
        if (permissionExistsNow && globalOptions.reloadOnSuccess) {
            void (0,webext_content_scripts__WEBPACK_IMPORTED_MODULE_5__.executeFunction)(tab.id, (message) => {
                if (confirm(message)) {
                    location.reload();
                }
            }, globalOptions.reloadOnSuccess);
        }
    }
    catch (error) {
        // Delay updating the context menu item because of spurious events and activeTab race conditions
        // https://github.com/fregante/webext-permission-toggle/pull/45
        setTimeout(updateItem, 500, url);
        if (tab?.id) {
            try {
                await (0,webext_content_scripts__WEBPACK_IMPORTED_MODULE_5__.executeFunction)(tab.id, text => {
                    window.alert(text); /* Can't pass a raw native function */
                }, String(error));
            }
            catch {
                void (0,webext_alert__WEBPACK_IMPORTED_MODULE_4__["default"])(String(error));
            }
        }
        throw error;
    }
}
/**
 * Adds an item to the browser action icon's context menu.
 * The user can access this menu by right clicking the icon. If your extension doesn't have any action or
 * popup assigned to the icon, it will also appear with a left click.
 *
 * @param options {Options}
 */
function addPermissionToggle(options) {
    if (!(0,webext_detect_page__WEBPACK_IMPORTED_MODULE_1__.isBackground)()) {
        throw new Error('webext-permission-toggle can only be called from a background page');
    }
    if (globalOptions) {
        throw new Error('webext-permission-toggle can only be initialized once');
    }
    const manifest = chrome.runtime.getManifest();
    if (!manifest.permissions?.includes('contextMenus')) {
        throw new Error('webext-permission-toggle requires the `contextMenus` permission');
    }
    if (!chrome.contextMenus) {
        console.warn('chrome.contextMenus is not available');
        return;
    }
    globalOptions = {
        title: `Enable ${manifest.name} on this domain`,
        reloadOnSuccess: false,
        ...options,
    };
    if (globalOptions.reloadOnSuccess === true) {
        globalOptions.reloadOnSuccess = `Do you want to reload this page to apply ${manifest.name}?`;
    }
    const optionalHosts = [
        ...manifest.optional_permissions ?? [],
        ...manifest.optional_host_permissions ?? [],
    ].filter((permission) => permission === '<all_urls>' || permission.includes('*'));
    if (optionalHosts.length === 0) {
        throw new TypeError('webext-permission-toggle requires some wildcard hosts to be specified in `optional_permissions` (MV2) or `optional_host_permissions` (MV3)');
    }
    // Remove any existing context menu item and silence any error
    chrome.contextMenus.remove(contextMenuId, () => chrome.runtime.lastError);
    const contexts = manifest.manifest_version === 2
        ? ['page_action', 'browser_action']
        : ['action'];
    chrome.contextMenus.create({
        id: contextMenuId,
        type: 'checkbox',
        checked: false,
        title: globalOptions.title,
        contexts,
        // Note: This is completely ignored by Chrome and Safari. Great. #14
        documentUrlPatterns: optionalHosts,
    });
    chrome.contextMenus.onClicked.addListener(handleClick);
    chrome.tabs.onActivated.addListener(handleTabActivated);
    chrome.tabs.onUpdated.addListener(async (tabId, { status }, { url, active }) => {
        if (active && status === 'complete') {
            void updateItem(url ?? await (0,webext_tools__WEBPACK_IMPORTED_MODULE_3__.getTabUrl)(tabId) ?? '');
        }
    });
}


/***/ }),

/***/ "./node_modules/webext-permission-toggle/node_modules/webext-detect-page/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/webext-permission-toggle/node_modules/webext-detect-page/index.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contextNames: () => (/* binding */ contextNames),
/* harmony export */   disableWebextDetectPageCache: () => (/* binding */ disableWebextDetectPageCache),
/* harmony export */   getContextName: () => (/* binding */ getContextName),
/* harmony export */   isBackground: () => (/* binding */ isBackground),
/* harmony export */   isBackgroundPage: () => (/* binding */ isBackgroundPage),
/* harmony export */   isBackgroundWorker: () => (/* binding */ isBackgroundWorker),
/* harmony export */   isChrome: () => (/* binding */ isChrome),
/* harmony export */   isContentScript: () => (/* binding */ isContentScript),
/* harmony export */   isDevTools: () => (/* binding */ isDevTools),
/* harmony export */   isDevToolsPage: () => (/* binding */ isDevToolsPage),
/* harmony export */   isExtensionContext: () => (/* binding */ isExtensionContext),
/* harmony export */   isFirefox: () => (/* binding */ isFirefox),
/* harmony export */   isMobileSafari: () => (/* binding */ isMobileSafari),
/* harmony export */   isOptionsPage: () => (/* binding */ isOptionsPage),
/* harmony export */   isPersistentBackgroundPage: () => (/* binding */ isPersistentBackgroundPage),
/* harmony export */   isSafari: () => (/* binding */ isSafari),
/* harmony export */   isSidePanel: () => (/* binding */ isSidePanel),
/* harmony export */   isWebPage: () => (/* binding */ isWebPage)
/* harmony export */ });
let cache = true;
function disableWebextDetectPageCache() {
    cache = false;
}
function isCurrentPathname(path) {
    if (!path) {
        return false;
    }
    try {
        const { pathname } = new URL(path, location.origin);
        return pathname === location.pathname;
    }
    catch {
        return false;
    }
}
function getManifest(_version) {
    return globalThis.chrome?.runtime?.getManifest?.();
}
function once(function_) {
    let result;
    return () => {
        if (!cache || result === undefined) {
            result = function_();
        }
        return result;
    };
}
/** Indicates whether the code is being run on http(s):// pages (it could be in a content script or regular web context) */
const isWebPage = once(() => ['about:', 'http:', 'https:'].includes(location.protocol));
/** Indicates whether the code is being run in extension contexts that have access to the chrome API */
const isExtensionContext = once(() => typeof globalThis.chrome?.extension === 'object');
/** Indicates whether the code is being run in a content script */
const isContentScript = once(() => isExtensionContext() && isWebPage());
/** Indicates whether the code is being run in a background context */
const isBackground = () => isBackgroundPage() || isBackgroundWorker();
/** Indicates whether the code is being run in a background page */
const isBackgroundPage = once(() => {
    const manifest = getManifest(2);
    if (manifest
        && isCurrentPathname(manifest.background_page ?? manifest.background?.page)) {
        return true;
    }
    return Boolean(manifest?.background?.scripts
        && isCurrentPathname('/_generated_background_page.html'));
});
/** Indicates whether the code is being run in a background worker */
const isBackgroundWorker = once(() => isCurrentPathname(getManifest(3)?.background?.service_worker));
/** Indicates whether the code is being run in a persistent background page (as opposed to an Event Page or Background Worker, both of which can be unloaded by the browser) */
const isPersistentBackgroundPage = once(() => isBackgroundPage()
    && getManifest(2)?.manifest_version === 2 // Firefox can have a background page on MV3, but can't be persistent
    && getManifest(2)?.background?.persistent !== false);
/** Indicates whether the code is being run in an options page. This only works if the current page’s URL matches the one specified in the extension's `manifest.json` */
const isOptionsPage = once(() => {
    const path = getManifest()?.options_ui?.page;
    if (typeof path !== 'string') {
        return false;
    }
    const url = new URL(path, location.origin);
    return url.pathname === location.pathname;
});
/** Indicates whether the code is being run in an options page. This only works if the current page’s URL matches the one specified in the extension's `manifest.json` */
const isSidePanel = once(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Not yet in @types/chrome
    const path = getManifest(3)?.['side_panel']?.default_path;
    if (typeof path !== 'string') {
        return false;
    }
    const url = new URL(path, location.origin);
    return url.pathname === location.pathname;
});
/** Indicates whether the code is being run in a dev tools page. This only works if the current page’s URL matches the one specified in the extension's `manifest.json` `devtools_page` field. */
const isDevToolsPage = once(() => {
    const devtoolsPage = isExtensionContext() && chrome.devtools && getManifest()?.devtools_page;
    if (typeof devtoolsPage !== 'string') {
        return false;
    }
    const url = new URL(devtoolsPage, location.origin);
    return url.pathname === location.pathname;
});
/** Indicates whether the code is being run in the dev tools page. Unlike `isDevToolsPage`, this works in any page that has the `chrome.devTools` API */
const isDevTools = () => Boolean(globalThis.chrome?.devtools);
/** Loosely detect Firefox via user agent */
const isFirefox = () => globalThis.navigator?.userAgent.includes('Firefox');
/** Loosely detect Chrome via user agent (might also include Chromium and forks like Opera) */
const isChrome = () => globalThis.navigator?.userAgent.includes('Chrome');
/** Loosely detect Safari via user agent */
const isSafari = () => !isChrome() && globalThis.navigator?.userAgent.includes('Safari');
/** Loosely detect Mobile Safari via user agent */
const isMobileSafari = () => isSafari() && globalThis.navigator?.userAgent.includes('Mobile');
const contextChecks = {
    contentScript: isContentScript,
    background: isBackground,
    options: isOptionsPage,
    sidePanel: isSidePanel,
    devTools: isDevTools,
    devToolsPage: isDevToolsPage,
    extension: isExtensionContext,
    web: isWebPage,
};
const contextNames = Object.keys(contextChecks);
function getContextName() {
    for (const [name, test] of Object.entries(contextChecks)) {
        if (test()) {
            return name;
        }
    }
    return 'unknown';
}


/***/ }),

/***/ "./node_modules/webext-permissions/distribution/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/webext-permissions/distribution/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dropOverlappingPermissions: () => (/* binding */ dropOverlappingPermissions),
/* harmony export */   extractAdditionalPermissions: () => (/* binding */ extractAdditionalPermissions),
/* harmony export */   isUrlPermittedByManifest: () => (/* binding */ isUrlPermittedByManifest),
/* harmony export */   normalizeManifestPermissions: () => (/* binding */ normalizeManifestPermissions),
/* harmony export */   queryAdditionalPermissions: () => (/* binding */ queryAdditionalPermissions)
/* harmony export */ });
/* harmony import */ var webext_patterns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webext-patterns */ "./node_modules/webext-patterns/index.js");

function normalizeManifestPermissions(manifest = chrome.runtime.getManifest()) {
    const manifestPermissions = {
        origins: [],
        permissions: [],
    };
    const list = new Set([
        ...(manifest.permissions ?? []),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Not sure why it's being a PITA
        ...(manifest.host_permissions ?? []),
        ...(manifest.content_scripts ?? []).flatMap(config => config.matches ?? []),
    ]);
    // https://github.com/mozilla/gecko-dev/blob/c0fc8c4852e927b0ae75d893d35772b8c60ee06b/toolkit/components/extensions/Extension.jsm#L738-L743
    if (manifest.devtools_page
        // @ts-expect-error it can't be specified, but it's reported when requested
        && !manifest.optional_permissions?.includes('devtools')) {
        list.add('devtools');
    }
    for (const permission of list) {
        if (permission.includes('://') || permission === '<all_urls>') {
            manifestPermissions.origins.push(permission);
        }
        else {
            manifestPermissions.permissions.push(permission);
        }
    }
    return dropOverlappingPermissions(manifestPermissions);
}
const hostRegex = /:[/][/][*.]*([^/]+)/; // Extracts the wildcard-less hostname
function parseDomain(origin) {
    return origin.split(hostRegex)[1];
}
async function queryAdditionalPermissions(options) {
    return new Promise(resolve => {
        chrome.permissions.getAll(currentPermissions => {
            resolve(extractAdditionalPermissions(currentPermissions, options));
        });
    });
}
function extractAdditionalPermissions(currentPermissions, { manifest, strictOrigins = true, } = {}) {
    const manifestPermissions = normalizeManifestPermissions(manifest);
    const additionalPermissions = {
        origins: [],
        permissions: [],
    };
    for (const origin of currentPermissions.origins ?? []) {
        if (manifestPermissions.origins.includes(origin)) {
            continue;
        }
        if (!strictOrigins) {
            const domain = parseDomain(origin);
            const isDomainInManifest = manifestPermissions.origins
                .some(manifestOrigin => parseDomain(manifestOrigin) === domain);
            if (isDomainInManifest) {
                continue;
            }
        }
        additionalPermissions.origins.push(origin);
    }
    for (const permission of currentPermissions.permissions ?? []) {
        if (!manifestPermissions.permissions.includes(permission)) {
            additionalPermissions.permissions.push(permission);
        }
    }
    return additionalPermissions;
}
function isUrlPermittedByManifest(origin, manifest = chrome.runtime.getManifest()) {
    const manifestPermissions = normalizeManifestPermissions(manifest);
    const originsRegex = (0,webext_patterns__WEBPACK_IMPORTED_MODULE_0__.patternToRegex)(...manifestPermissions.origins);
    return originsRegex.test(origin);
}
function dropOverlappingPermissions({ origins, permissions }) {
    return {
        origins: origins ? (0,webext_patterns__WEBPACK_IMPORTED_MODULE_0__.excludeDuplicatePatterns)(origins) : [],
        permissions: permissions ? [...permissions] : [],
    };
}


/***/ }),

/***/ "./node_modules/webext-polyfill-kinda/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/webext-polyfill-kinda/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function NestedProxy(target) {
	return new Proxy(target, {
		get(target, prop) {
			if (!target[prop]) {
				return;
			}

			if (typeof target[prop] !== 'function') {
				return new NestedProxy(target[prop]);
			}

			return (...arguments_) =>
				new Promise((resolve, reject) => {
					target[prop](...arguments_, result => {
						if (chrome.runtime.lastError) {
							reject(new Error(chrome.runtime.lastError.message));
						} else {
							resolve(result);
						}
					});
				});
		},
	});
}

const chromeP = globalThis.chrome && new NestedProxy(globalThis.chrome);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chromeP);


/***/ }),

/***/ "./node_modules/webext-tools/index.js":
/*!********************************************!*\
  !*** ./node_modules/webext-tools/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canAccessTab: () => (/* binding */ canAccessTab),
/* harmony export */   castTarget: () => (/* binding */ castTarget),
/* harmony export */   doesTabExist: () => (/* binding */ doesTabExist),
/* harmony export */   getTabUrl: () => (/* binding */ getTabUrl),
/* harmony export */   setActionPopup: () => (/* binding */ setActionPopup)
/* harmony export */ });
/* harmony import */ var webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webext-polyfill-kinda */ "./node_modules/webext-polyfill-kinda/index.js");
/* harmony import */ var webext_content_scripts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webext-content-scripts */ "./node_modules/webext-content-scripts/index.js");


function castTarget(target) {
    return typeof target === 'object'
        ? target
        : {
            tabId: target,
            frameId: 0,
        };
}
async function getTabUrl(target) {
    const { frameId, tabId } = castTarget(target);
    try {
        if (frameId === 0 && 'tabs' in globalThis.chrome) {
            const tab = await webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__["default"].tabs.get(tabId);
            if (tab.url) {
                return tab.url;
            }
        }
        return await (0,webext_content_scripts__WEBPACK_IMPORTED_MODULE_1__.executeFunction)(target, () => location.href);
    }
    catch {
        // No host permissions
        return undefined;
    }
}
async function canAccessTab(target) {
    return (0,webext_content_scripts__WEBPACK_IMPORTED_MODULE_1__.executeFunction)(castTarget(target), () => true).then(() => true, () => false);
}
/** Utility to await promises where you only care whether they throw or not */
async function isPromiseFulfilled(promise) {
    try {
        await promise;
        return true;
    }
    catch {
        return false;
    }
}
async function doesTabExist(tabId) {
    return isPromiseFulfilled(webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__["default"].tabs.get(tabId));
}
function setActionPopup(getPopupUrl) {
    const browserAction = chrome.action ?? webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__["default"].browserAction;
    const setOnActiveTab = async (windowId) => {
        const [tab] = await webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__["default"].tabs.query({
            active: true,
            ...windowId ? { windowId } : { lastFocusedWindow: true },
        });
        if (!tab) {
            return;
        }
        await browserAction.setPopup({
            popup: await getPopupUrl(tab.url) ?? '',
            tabId: tab.id,
        });
    };
    void setOnActiveTab();
    chrome.windows.onFocusChanged.addListener(setOnActiveTab);
    chrome.tabs.onActivated.addListener(async (activeInfo) => {
        const tab = await webext_polyfill_kinda__WEBPACK_IMPORTED_MODULE_0__["default"].tabs.get(activeInfo.tabId);
        await browserAction.setPopup({
            popup: await getPopupUrl(tab.url) ?? '',
            tabId: tab.id,
        });
    });
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
        if (tab.active && changeInfo.url) {
            await browserAction.setPopup({
                popup: await getPopupUrl(tab.url) ?? '',
                tabId,
            });
        }
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/background.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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O0FBQ0Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pETztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1R3NEO0FBQ3REO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnRUFBa0I7QUFDakM7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ087QUFDUCxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdHZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZtRDtBQUNTO0FBQ0U7QUFDckI7QUFDUjtBQUN5QztBQUMxRTtBQUNBO0FBQ0EsZ0JBQWdCLDREQUFRO0FBQ3hCLE1BQU0sNkRBQWM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsdUVBQWU7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EseUJBQXlCLGtCQUFrQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUSx1RUFBZTtBQUN2QixnQkFBZ0IsU0FBUztBQUN6QixrREFBa0Q7QUFDbEQsMEJBQTBCLDRFQUF3QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQywwQkFBMEIsdURBQVM7QUFDbkM7QUFDQSw2QkFBNkIscUJBQXFCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix1REFBUztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUIsdUVBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUVBQWU7QUFDckMsd0NBQXdDO0FBQ3hDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EscUJBQXFCLHdEQUFLO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ2U7QUFDZixTQUFTLGdFQUFZO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixjQUFjO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0RBQXNELFFBQVEsSUFBSSxhQUFhO0FBQy9FO0FBQ0EseUNBQXlDLHVEQUFTO0FBQ2xEO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6TEE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVHMkU7QUFDcEU7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNPLDREQUE0RCxrQ0FBa0MsSUFBSTtBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLHlCQUF5QiwrREFBYztBQUN2QztBQUNBO0FBQ08sc0NBQXNDLHNCQUFzQjtBQUNuRTtBQUNBLDJCQUEyQix5RUFBd0I7QUFDbkQ7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRTtBQUNGOztBQUVBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCcUI7QUFDYTtBQUNsRDtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxZQUFZLGlCQUFpQjtBQUM3QjtBQUNBO0FBQ0EsOEJBQThCLDZEQUFPO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVFQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsV0FBVyx1RUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCw4QkFBOEIsNkRBQU87QUFDckM7QUFDTztBQUNQLDJDQUEyQyw2REFBTztBQUNsRDtBQUNBLDRCQUE0Qiw2REFBTztBQUNuQztBQUNBLDRCQUE0QixXQUFXLElBQUkseUJBQXlCO0FBQ3BFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNkRBQU87QUFDakM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDMUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvZG9tcHVyaWZ5L2Rpc3QvcHVyaWZ5LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vc3JjL3NjcmlwdHMvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2FuYWx5dGljcy50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2RvbS50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2xvZ2dlci50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvY29udGVudC1zY3JpcHRzLXJlZ2lzdGVyLXBvbHlmaWxsL3BvbnlmaWxsLmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1hZGRpdGlvbmFsLXBlcm1pc3Npb25zL2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1hbGVydC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtYWxlcnQvbm9kZV9tb2R1bGVzL3dlYmV4dC1kZXRlY3QtcGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtY29udGVudC1zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0cy9kaXN0cmlidXRpb24vZGVkdXBsaWNhdG9yLmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0cy9kaXN0cmlidXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHRzL2Rpc3RyaWJ1dGlvbi9pbmplY3QtdG8tZXhpc3RpbmctdGFicy5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdHMvZGlzdHJpYnV0aW9uL2xpYi5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdHMvZGlzdHJpYnV0aW9uL3JlZ2lzdGVyLWNvbnRlbnQtc2NyaXB0LXNoaW0uanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWV2ZW50cy9kaXN0cmlidXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWV2ZW50cy9kaXN0cmlidXRpb24vb24tY29udGV4dC1pbnZhbGlkYXRlZC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtZXZlbnRzL2Rpc3RyaWJ1dGlvbi9vbi1leHRlbnNpb24tc3RhcnQuanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWV2ZW50cy9kaXN0cmlidXRpb24vb25lLWV2ZW50LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1ldmVudHMvbm9kZV9tb2R1bGVzL3dlYmV4dC1kZXRlY3QtcGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtcGF0dGVybnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LXBhdHRlcm5zL25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtcGVybWlzc2lvbi10b2dnbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LXBlcm1pc3Npb24tdG9nZ2xlL25vZGVfbW9kdWxlcy93ZWJleHQtZGV0ZWN0LXBhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LXBlcm1pc3Npb25zL2Rpc3RyaWJ1dGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtcG9seWZpbGwta2luZGEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LXRvb2xzL2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBAbGljZW5zZSBET01QdXJpZnkgfCAoYykgQ3VyZTUzIGFuZCBvdGhlciBjb250cmlidXRvcnMgfCBSZWxlYXNlZCB1bmRlciB0aGUgQXBhY2hlIGxpY2Vuc2UgMi4wIGFuZCBNb3ppbGxhIFB1YmxpYyBMaWNlbnNlIDIuMCB8IGdpdGh1Yi5jb20vY3VyZTUzL0RPTVB1cmlmeS9ibG9iLzIuMC44L0xJQ0VOU0UgKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5ET01QdXJpZnkgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCBmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QuaGFzT3duUHJvcGVydHksXG4gICAgICBzZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZixcbiAgICAgIGlzRnJvemVuID0gT2JqZWN0LmlzRnJvemVuO1xuICB2YXIgZnJlZXplID0gT2JqZWN0LmZyZWV6ZSxcbiAgICAgIHNlYWwgPSBPYmplY3Quc2VhbCxcbiAgICAgIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLW11dGFibGUtZXhwb3J0c1xuXG4gIHZhciBfcmVmID0gdHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIFJlZmxlY3QsXG4gICAgICBhcHBseSA9IF9yZWYuYXBwbHksXG4gICAgICBjb25zdHJ1Y3QgPSBfcmVmLmNvbnN0cnVjdDtcblxuICBpZiAoIWFwcGx5KSB7XG4gICAgYXBwbHkgPSBmdW5jdGlvbiBhcHBseShmdW4sIHRoaXNWYWx1ZSwgYXJncykge1xuICAgICAgcmV0dXJuIGZ1bi5hcHBseSh0aGlzVmFsdWUsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICBpZiAoIWZyZWV6ZSkge1xuICAgIGZyZWV6ZSA9IGZ1bmN0aW9uIGZyZWV6ZSh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFzZWFsKSB7XG4gICAgc2VhbCA9IGZ1bmN0aW9uIHNlYWwoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghY29uc3RydWN0KSB7XG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gY29uc3RydWN0KEZ1bmMsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KEZ1bmMsIFtudWxsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKSkpKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBhcnJheUZvckVhY2ggPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKTtcbiAgdmFyIGFycmF5UG9wID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucG9wKTtcbiAgdmFyIGFycmF5UHVzaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuXG4gIHZhciBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XG4gIHZhciBzdHJpbmdNYXRjaCA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5tYXRjaCk7XG4gIHZhciBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuICB2YXIgc3RyaW5nSW5kZXhPZiA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mKTtcbiAgdmFyIHN0cmluZ1RyaW0gPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudHJpbSk7XG5cbiAgdmFyIHJlZ0V4cFRlc3QgPSB1bmFwcGx5KFJlZ0V4cC5wcm90b3R5cGUudGVzdCk7XG5cbiAgdmFyIHR5cGVFcnJvckNyZWF0ZSA9IHVuY29uc3RydWN0KFR5cGVFcnJvcik7XG5cbiAgZnVuY3Rpb24gdW5hcHBseShmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdW5jb25zdHJ1Y3QoZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb25zdHJ1Y3QoZnVuYywgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qIEFkZCBwcm9wZXJ0aWVzIHRvIGEgbG9va3VwIHRhYmxlICovXG4gIGZ1bmN0aW9uIGFkZFRvU2V0KHNldCwgYXJyYXkpIHtcbiAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIC8vIE1ha2UgJ2luJyBhbmQgdHJ1dGh5IGNoZWNrcyBsaWtlIEJvb2xlYW4oc2V0LmNvbnN0cnVjdG9yKVxuICAgICAgLy8gaW5kZXBlbmRlbnQgb2YgYW55IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBPYmplY3QucHJvdG90eXBlLlxuICAgICAgLy8gUHJldmVudCBwcm90b3R5cGUgc2V0dGVycyBmcm9tIGludGVyY2VwdGluZyBzZXQgYXMgYSB0aGlzIHZhbHVlLlxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2V0LCBudWxsKTtcbiAgICB9XG5cbiAgICB2YXIgbCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobC0tKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IGFycmF5W2xdO1xuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbGNFbGVtZW50ID0gc3RyaW5nVG9Mb3dlckNhc2UoZWxlbWVudCk7XG4gICAgICAgIGlmIChsY0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBDb25maWcgcHJlc2V0cyAoZS5nLiB0YWdzLmpzLCBhdHRycy5qcykgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgICBpZiAoIWlzRnJvemVuKGFycmF5KSkge1xuICAgICAgICAgICAgYXJyYXlbbF0gPSBsY0VsZW1lbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbWVudCA9IGxjRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRbZWxlbWVudF0gPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKiBTaGFsbG93IGNsb25lIGFuIG9iamVjdCAqL1xuICBmdW5jdGlvbiBjbG9uZShvYmplY3QpIHtcbiAgICB2YXIgbmV3T2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuXG4gICAgdmFyIHByb3BlcnR5ID0gdm9pZCAwO1xuICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICBpZiAoYXBwbHkoaGFzT3duUHJvcGVydHksIG9iamVjdCwgW3Byb3BlcnR5XSkpIHtcbiAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuXG4gIHZhciBodG1sID0gZnJlZXplKFsnYScsICdhYmJyJywgJ2Fjcm9ueW0nLCAnYWRkcmVzcycsICdhcmVhJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnYXVkaW8nLCAnYicsICdiZGknLCAnYmRvJywgJ2JpZycsICdibGluaycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NlbnRlcicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2NvbnRlbnQnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWNvcmF0b3InLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpcicsICdkaXYnLCAnZGwnLCAnZHQnLCAnZWxlbWVudCcsICdlbScsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb250JywgJ2Zvb3RlcicsICdmb3JtJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWQnLCAnaGVhZGVyJywgJ2hncm91cCcsICdocicsICdodG1sJywgJ2knLCAnaW1nJywgJ2lucHV0JywgJ2lucycsICdrYmQnLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ21haW4nLCAnbWFwJywgJ21hcmsnLCAnbWFycXVlZScsICdtZW51JywgJ21lbnVpdGVtJywgJ21ldGVyJywgJ25hdicsICdub2JyJywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwaWN0dXJlJywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JwJywgJ3J0JywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NlY3Rpb24nLCAnc2VsZWN0JywgJ3NoYWRvdycsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhY2VyJywgJ3NwYW4nLCAnc3RyaWtlJywgJ3N0cm9uZycsICdzdHlsZScsICdzdWInLCAnc3VtbWFyeScsICdzdXAnLCAndGFibGUnLCAndGJvZHknLCAndGQnLCAndGVtcGxhdGUnLCAndGV4dGFyZWEnLCAndGZvb3QnLCAndGgnLCAndGhlYWQnLCAndGltZScsICd0cicsICd0cmFjaycsICd0dCcsICd1JywgJ3VsJywgJ3ZhcicsICd2aWRlbycsICd3YnInXSk7XG5cbiAgLy8gU1ZHXG4gIHZhciBzdmcgPSBmcmVlemUoWydzdmcnLCAnYScsICdhbHRnbHlwaCcsICdhbHRnbHlwaGRlZicsICdhbHRnbHlwaGl0ZW0nLCAnYW5pbWF0ZWNvbG9yJywgJ2FuaW1hdGVtb3Rpb24nLCAnYW5pbWF0ZXRyYW5zZm9ybScsICdhdWRpbycsICdjYW52YXMnLCAnY2lyY2xlJywgJ2NsaXBwYXRoJywgJ2RlZnMnLCAnZGVzYycsICdlbGxpcHNlJywgJ2ZpbHRlcicsICdmb250JywgJ2cnLCAnZ2x5cGgnLCAnZ2x5cGhyZWYnLCAnaGtlcm4nLCAnaW1hZ2UnLCAnbGluZScsICdsaW5lYXJncmFkaWVudCcsICdtYXJrZXInLCAnbWFzaycsICdtZXRhZGF0YScsICdtcGF0aCcsICdwYXRoJywgJ3BhdHRlcm4nLCAncG9seWdvbicsICdwb2x5bGluZScsICdyYWRpYWxncmFkaWVudCcsICdyZWN0JywgJ3N0b3AnLCAnc3R5bGUnLCAnc3dpdGNoJywgJ3N5bWJvbCcsICd0ZXh0JywgJ3RleHRwYXRoJywgJ3RpdGxlJywgJ3RyZWYnLCAndHNwYW4nLCAndmlkZW8nLCAndmlldycsICd2a2VybiddKTtcblxuICB2YXIgc3ZnRmlsdGVycyA9IGZyZWV6ZShbJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJywgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLCAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLCAnZmVGdW5jRycsICdmZUZ1bmNSJywgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlTWVyZ2UnLCAnZmVNZXJnZU5vZGUnLCAnZmVNb3JwaG9sb2d5JywgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLCAnZmVTcG90TGlnaHQnLCAnZmVUaWxlJywgJ2ZlVHVyYnVsZW5jZSddKTtcblxuICB2YXIgbWF0aE1sID0gZnJlZXplKFsnbWF0aCcsICdtZW5jbG9zZScsICdtZXJyb3InLCAnbWZlbmNlZCcsICdtZnJhYycsICdtZ2x5cGgnLCAnbWknLCAnbWxhYmVsZWR0cicsICdtbXVsdGlzY3JpcHRzJywgJ21uJywgJ21vJywgJ21vdmVyJywgJ21wYWRkZWQnLCAnbXBoYW50b20nLCAnbXJvb3QnLCAnbXJvdycsICdtcycsICdtc3BhY2UnLCAnbXNxcnQnLCAnbXN0eWxlJywgJ21zdWInLCAnbXN1cCcsICdtc3Vic3VwJywgJ210YWJsZScsICdtdGQnLCAnbXRleHQnLCAnbXRyJywgJ211bmRlcicsICdtdW5kZXJvdmVyJ10pO1xuXG4gIHZhciB0ZXh0ID0gZnJlZXplKFsnI3RleHQnXSk7XG5cbiAgdmFyIGh0bWwkMSA9IGZyZWV6ZShbJ2FjY2VwdCcsICdhY3Rpb24nLCAnYWxpZ24nLCAnYWx0JywgJ2F1dG9jYXBpdGFsaXplJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvcGljdHVyZWlucGljdHVyZScsICdhdXRvcGxheScsICdiYWNrZ3JvdW5kJywgJ2JnY29sb3InLCAnYm9yZGVyJywgJ2NhcHR1cmUnLCAnY2VsbHBhZGRpbmcnLCAnY2VsbHNwYWNpbmcnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzJywgJ2NsZWFyJywgJ2NvbG9yJywgJ2NvbHMnLCAnY29sc3BhbicsICdjb250cm9scycsICdjb250cm9sc2xpc3QnLCAnY29vcmRzJywgJ2Nyb3Nzb3JpZ2luJywgJ2RhdGV0aW1lJywgJ2RlY29kaW5nJywgJ2RlZmF1bHQnLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rpc2FibGVwaWN0dXJlaW5waWN0dXJlJywgJ2Rpc2FibGVyZW1vdGVwbGF5YmFjaycsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLCAnZW5jdHlwZScsICdlbnRlcmtleWhpbnQnLCAnZmFjZScsICdmb3InLCAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmbGFuZycsICdpZCcsICdpbnB1dG1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzbWFwJywgJ2tpbmQnLCAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvYWRpbmcnLCAnbG9vcCcsICdsb3cnLCAnbWF4JywgJ21heGxlbmd0aCcsICdtZWRpYScsICdtZXRob2QnLCAnbWluJywgJ21pbmxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsICduYW1lJywgJ25vc2hhZGUnLCAnbm92YWxpZGF0ZScsICdub3dyYXAnLCAnb3BlbicsICdvcHRpbXVtJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncGxheXNpbmxpbmUnLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHViZGF0ZScsICdyYWRpb2dyb3VwJywgJ3JlYWRvbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXYnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dzJywgJ3Jvd3NwYW4nLCAnc3BlbGxjaGVjaycsICdzY29wZScsICdzZWxlY3RlZCcsICdzaGFwZScsICdzaXplJywgJ3NpemVzJywgJ3NwYW4nLCAnc3JjbGFuZycsICdzdGFydCcsICdzcmMnLCAnc3Jjc2V0JywgJ3N0ZXAnLCAnc3R5bGUnLCAnc3VtbWFyeScsICd0YWJpbmRleCcsICd0aXRsZScsICd0cmFuc2xhdGUnLCAndHlwZScsICd1c2VtYXAnLCAndmFsaWduJywgJ3ZhbHVlJywgJ3dpZHRoJywgJ3htbG5zJ10pO1xuXG4gIHZhciBzdmckMSA9IGZyZWV6ZShbJ2FjY2VudC1oZWlnaHQnLCAnYWNjdW11bGF0ZScsICdhZGRpdGl2ZScsICdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnYXNjZW50JywgJ2F0dHJpYnV0ZW5hbWUnLCAnYXR0cmlidXRldHlwZScsICdhemltdXRoJywgJ2Jhc2VmcmVxdWVuY3knLCAnYmFzZWxpbmUtc2hpZnQnLCAnYmVnaW4nLCAnYmlhcycsICdieScsICdjbGFzcycsICdjbGlwJywgJ2NsaXBwYXRodW5pdHMnLCAnY2xpcC1wYXRoJywgJ2NsaXAtcnVsZScsICdjb2xvcicsICdjb2xvci1pbnRlcnBvbGF0aW9uJywgJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycycsICdjb2xvci1wcm9maWxlJywgJ2NvbG9yLXJlbmRlcmluZycsICdjeCcsICdjeScsICdkJywgJ2R4JywgJ2R5JywgJ2RpZmZ1c2Vjb25zdGFudCcsICdkaXJlY3Rpb24nLCAnZGlzcGxheScsICdkaXZpc29yJywgJ2R1cicsICdlZGdlbW9kZScsICdlbGV2YXRpb24nLCAnZW5kJywgJ2ZpbGwnLCAnZmlsbC1vcGFjaXR5JywgJ2ZpbGwtcnVsZScsICdmaWx0ZXInLCAnZmlsdGVydW5pdHMnLCAnZmxvb2QtY29sb3InLCAnZmxvb2Qtb3BhY2l0eScsICdmb250LWZhbWlseScsICdmb250LXNpemUnLCAnZm9udC1zaXplLWFkanVzdCcsICdmb250LXN0cmV0Y2gnLCAnZm9udC1zdHlsZScsICdmb250LXZhcmlhbnQnLCAnZm9udC13ZWlnaHQnLCAnZngnLCAnZnknLCAnZzEnLCAnZzInLCAnZ2x5cGgtbmFtZScsICdnbHlwaHJlZicsICdncmFkaWVudHVuaXRzJywgJ2dyYWRpZW50dHJhbnNmb3JtJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2ltYWdlLXJlbmRlcmluZycsICdpbicsICdpbjInLCAnaycsICdrMScsICdrMicsICdrMycsICdrNCcsICdrZXJuaW5nJywgJ2tleXBvaW50cycsICdrZXlzcGxpbmVzJywgJ2tleXRpbWVzJywgJ2xhbmcnLCAnbGVuZ3RoYWRqdXN0JywgJ2xldHRlci1zcGFjaW5nJywgJ2tlcm5lbG1hdHJpeCcsICdrZXJuZWx1bml0bGVuZ3RoJywgJ2xpZ2h0aW5nLWNvbG9yJywgJ2xvY2FsJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnLCAnbWFya2VyaGVpZ2h0JywgJ21hcmtlcnVuaXRzJywgJ21hcmtlcndpZHRoJywgJ21hc2tjb250ZW50dW5pdHMnLCAnbWFza3VuaXRzJywgJ21heCcsICdtYXNrJywgJ21lZGlhJywgJ21ldGhvZCcsICdtb2RlJywgJ21pbicsICduYW1lJywgJ251bW9jdGF2ZXMnLCAnb2Zmc2V0JywgJ29wZXJhdG9yJywgJ29wYWNpdHknLCAnb3JkZXInLCAnb3JpZW50JywgJ29yaWVudGF0aW9uJywgJ29yaWdpbicsICdvdmVyZmxvdycsICdwYWludC1vcmRlcicsICdwYXRoJywgJ3BhdGhsZW5ndGgnLCAncGF0dGVybmNvbnRlbnR1bml0cycsICdwYXR0ZXJudHJhbnNmb3JtJywgJ3BhdHRlcm51bml0cycsICdwb2ludHMnLCAncHJlc2VydmVhbHBoYScsICdwcmVzZXJ2ZWFzcGVjdHJhdGlvJywgJ3ByaW1pdGl2ZXVuaXRzJywgJ3InLCAncngnLCAncnknLCAncmFkaXVzJywgJ3JlZngnLCAncmVmeScsICdyZXBlYXRjb3VudCcsICdyZXBlYXRkdXInLCAncmVzdGFydCcsICdyZXN1bHQnLCAncm90YXRlJywgJ3NjYWxlJywgJ3NlZWQnLCAnc2hhcGUtcmVuZGVyaW5nJywgJ3NwZWN1bGFyY29uc3RhbnQnLCAnc3BlY3VsYXJleHBvbmVudCcsICdzcHJlYWRtZXRob2QnLCAnc3RhcnRvZmZzZXQnLCAnc3RkZGV2aWF0aW9uJywgJ3N0aXRjaHRpbGVzJywgJ3N0b3AtY29sb3InLCAnc3RvcC1vcGFjaXR5JywgJ3N0cm9rZS1kYXNoYXJyYXknLCAnc3Ryb2tlLWRhc2hvZmZzZXQnLCAnc3Ryb2tlLWxpbmVjYXAnLCAnc3Ryb2tlLWxpbmVqb2luJywgJ3N0cm9rZS1taXRlcmxpbWl0JywgJ3N0cm9rZS1vcGFjaXR5JywgJ3N0cm9rZScsICdzdHJva2Utd2lkdGgnLCAnc3R5bGUnLCAnc3VyZmFjZXNjYWxlJywgJ3N5c3RlbWxhbmd1YWdlJywgJ3RhYmluZGV4JywgJ3RhcmdldHgnLCAndGFyZ2V0eScsICd0cmFuc2Zvcm0nLCAndGV4dC1hbmNob3InLCAndGV4dC1kZWNvcmF0aW9uJywgJ3RleHQtcmVuZGVyaW5nJywgJ3RleHRsZW5ndGgnLCAndHlwZScsICd1MScsICd1MicsICd1bmljb2RlJywgJ3ZhbHVlcycsICd2aWV3Ym94JywgJ3Zpc2liaWxpdHknLCAndmVyc2lvbicsICd2ZXJ0LWFkdi15JywgJ3ZlcnQtb3JpZ2luLXgnLCAndmVydC1vcmlnaW4teScsICd3aWR0aCcsICd3b3JkLXNwYWNpbmcnLCAnd3JhcCcsICd3cml0aW5nLW1vZGUnLCAneGNoYW5uZWxzZWxlY3RvcicsICd5Y2hhbm5lbHNlbGVjdG9yJywgJ3gnLCAneDEnLCAneDInLCAneG1sbnMnLCAneScsICd5MScsICd5MicsICd6JywgJ3pvb21hbmRwYW4nXSk7XG5cbiAgdmFyIG1hdGhNbCQxID0gZnJlZXplKFsnYWNjZW50JywgJ2FjY2VudHVuZGVyJywgJ2FsaWduJywgJ2JldmVsbGVkJywgJ2Nsb3NlJywgJ2NvbHVtbnNhbGlnbicsICdjb2x1bW5saW5lcycsICdjb2x1bW5zcGFuJywgJ2Rlbm9tYWxpZ24nLCAnZGVwdGgnLCAnZGlyJywgJ2Rpc3BsYXknLCAnZGlzcGxheXN0eWxlJywgJ2VuY29kaW5nJywgJ2ZlbmNlJywgJ2ZyYW1lJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2xhcmdlb3AnLCAnbGVuZ3RoJywgJ2xpbmV0aGlja25lc3MnLCAnbHNwYWNlJywgJ2xxdW90ZScsICdtYXRoYmFja2dyb3VuZCcsICdtYXRoY29sb3InLCAnbWF0aHNpemUnLCAnbWF0aHZhcmlhbnQnLCAnbWF4c2l6ZScsICdtaW5zaXplJywgJ21vdmFibGVsaW1pdHMnLCAnbm90YXRpb24nLCAnbnVtYWxpZ24nLCAnb3BlbicsICdyb3dhbGlnbicsICdyb3dsaW5lcycsICdyb3dzcGFjaW5nJywgJ3Jvd3NwYW4nLCAncnNwYWNlJywgJ3JxdW90ZScsICdzY3JpcHRsZXZlbCcsICdzY3JpcHRtaW5zaXplJywgJ3NjcmlwdHNpemVtdWx0aXBsaWVyJywgJ3NlbGVjdGlvbicsICdzZXBhcmF0b3InLCAnc2VwYXJhdG9ycycsICdzdHJldGNoeScsICdzdWJzY3JpcHRzaGlmdCcsICdzdXBzY3JpcHRzaGlmdCcsICdzeW1tZXRyaWMnLCAndm9mZnNldCcsICd3aWR0aCcsICd4bWxucyddKTtcblxuICB2YXIgeG1sID0gZnJlZXplKFsneGxpbms6aHJlZicsICd4bWw6aWQnLCAneGxpbms6dGl0bGUnLCAneG1sOnNwYWNlJywgJ3htbG5zOnhsaW5rJ10pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL2JldHRlci1yZWdleFxuICB2YXIgTVVTVEFDSEVfRVhQUiA9IHNlYWwoL1xce1xce1tcXHNcXFNdKnxbXFxzXFxTXSpcXH1cXH0vZ20pOyAvLyBTcGVjaWZ5IHRlbXBsYXRlIGRldGVjdGlvbiByZWdleCBmb3IgU0FGRV9GT1JfVEVNUExBVEVTIG1vZGVcbiAgdmFyIEVSQl9FWFBSID0gc2VhbCgvPCVbXFxzXFxTXSp8W1xcc1xcU10qJT4vZ20pO1xuICB2YXIgREFUQV9BVFRSID0gc2VhbCgvXmRhdGEtW1xcLVxcdy5cXHUwMEI3LVxcdUZGRkZdLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgdmFyIEFSSUFfQVRUUiA9IHNlYWwoL15hcmlhLVtcXC1cXHddKyQvKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICB2YXIgSVNfQUxMT1dFRF9VUkkgPSBzZWFsKC9eKD86KD86KD86ZnxodCl0cHM/fG1haWx0b3x0ZWx8Y2FsbHRvfGNpZHx4bXBwKTp8W15hLXpdfFthLXorLlxcLV0rKD86W15hLXorLlxcLTpdfCQpKS9pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgKTtcbiAgdmFyIElTX1NDUklQVF9PUl9EQVRBID0gc2VhbCgvXig/OlxcdytzY3JpcHR8ZGF0YSk6L2kpO1xuICB2YXIgQVRUUl9XSElURVNQQUNFID0gc2VhbCgvW1xcdTAwMDAtXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDAtXFx1MjAyOVxcdTIwNUZcXHUzMDAwXS9nIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29udHJvbC1yZWdleFxuICApO1xuXG4gIHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuICBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkkMShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4gIHZhciBnZXRHbG9iYWwgPSBmdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdztcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5vLW9wIHBvbGljeSBmb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gICAqIERvbid0IGV4cG9ydCB0aGlzIGZ1bmN0aW9uIG91dHNpZGUgdGhpcyBtb2R1bGUhXG4gICAqIEBwYXJhbSB7P1RydXN0ZWRUeXBlUG9saWN5RmFjdG9yeX0gdHJ1c3RlZFR5cGVzIFRoZSBwb2xpY3kgZmFjdG9yeS5cbiAgICogQHBhcmFtIHtEb2N1bWVudH0gZG9jdW1lbnQgVGhlIGRvY3VtZW50IG9iamVjdCAodG8gZGV0ZXJtaW5lIHBvbGljeSBuYW1lIHN1ZmZpeClcbiAgICogQHJldHVybiB7P1RydXN0ZWRUeXBlUG9saWN5fSBUaGUgcG9saWN5IGNyZWF0ZWQgKG9yIG51bGwsIGlmIFRydXN0ZWQgVHlwZXNcbiAgICogYXJlIG5vdCBzdXBwb3J0ZWQpLlxuICAgKi9cbiAgdmFyIF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kgPSBmdW5jdGlvbiBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgZG9jdW1lbnQpIHtcbiAgICBpZiAoKHR5cGVvZiB0cnVzdGVkVHlwZXMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRydXN0ZWRUeXBlcykpICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgdGhlIGNhbGxlcnMgdG8gY29udHJvbCB0aGUgdW5pcXVlIHBvbGljeSBuYW1lXG4gICAgLy8gYnkgYWRkaW5nIGEgZGF0YS10dC1wb2xpY3ktc3VmZml4IHRvIHRoZSBzY3JpcHQgZWxlbWVudCB3aXRoIHRoZSBET01QdXJpZnkuXG4gICAgLy8gUG9saWN5IGNyZWF0aW9uIHdpdGggZHVwbGljYXRlIG5hbWVzIHRocm93cyBpbiBUcnVzdGVkIFR5cGVzLlxuICAgIHZhciBzdWZmaXggPSBudWxsO1xuICAgIHZhciBBVFRSX05BTUUgPSAnZGF0YS10dC1wb2xpY3ktc3VmZml4JztcbiAgICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0Lmhhc0F0dHJpYnV0ZShBVFRSX05BTUUpKSB7XG4gICAgICBzdWZmaXggPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShBVFRSX05BTUUpO1xuICAgIH1cblxuICAgIHZhciBwb2xpY3lOYW1lID0gJ2RvbXB1cmlmeScgKyAoc3VmZml4ID8gJyMnICsgc3VmZml4IDogJycpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5KHBvbGljeU5hbWUsIHtcbiAgICAgICAgY3JlYXRlSFRNTDogZnVuY3Rpb24gY3JlYXRlSFRNTChodG1sJCQxKSB7XG4gICAgICAgICAgcmV0dXJuIGh0bWwkJDE7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIC8vIFBvbGljeSBjcmVhdGlvbiBmYWlsZWQgKG1vc3QgbGlrZWx5IGFub3RoZXIgRE9NUHVyaWZ5IHNjcmlwdCBoYXNcbiAgICAgIC8vIGFscmVhZHkgcnVuKS4gU2tpcCBjcmVhdGluZyB0aGUgcG9saWN5LCBhcyB0aGlzIHdpbGwgb25seSBjYXVzZSBlcnJvcnNcbiAgICAgIC8vIGlmIFRUIGFyZSBlbmZvcmNlZC5cbiAgICAgIGNvbnNvbGUud2FybignVHJ1c3RlZFR5cGVzIHBvbGljeSAnICsgcG9saWN5TmFtZSArICcgY291bGQgbm90IGJlIGNyZWF0ZWQuJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gY3JlYXRlRE9NUHVyaWZ5KCkge1xuICAgIHZhciB3aW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGdldEdsb2JhbCgpO1xuXG4gICAgdmFyIERPTVB1cmlmeSA9IGZ1bmN0aW9uIERPTVB1cmlmeShyb290KSB7XG4gICAgICByZXR1cm4gY3JlYXRlRE9NUHVyaWZ5KHJvb3QpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIGxhYmVsLCBleHBvc2VkIGZvciBlYXNpZXIgY2hlY2tzXG4gICAgICogaWYgRE9NUHVyaWZ5IGlzIHVwIHRvIGRhdGUgb3Igbm90XG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnZlcnNpb24gPSAnMi4xLjEnO1xuXG4gICAgLyoqXG4gICAgICogQXJyYXkgb2YgZWxlbWVudHMgdGhhdCBET01QdXJpZnkgcmVtb3ZlZCBkdXJpbmcgc2FuaXRhdGlvbi5cbiAgICAgKiBFbXB0eSBpZiBub3RoaW5nIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVkID0gW107XG5cbiAgICBpZiAoIXdpbmRvdyB8fCAhd2luZG93LmRvY3VtZW50IHx8IHdpbmRvdy5kb2N1bWVudC5ub2RlVHlwZSAhPT0gOSkge1xuICAgICAgLy8gTm90IHJ1bm5pbmcgaW4gYSBicm93c2VyLCBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCB5b3UgY2FuIHBhc3MgeW91ciBvd24gV2luZG93XG4gICAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSBmYWxzZTtcblxuICAgICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgICB9XG5cbiAgICB2YXIgb3JpZ2luYWxEb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxuICAgIHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbiAgICB2YXIgRG9jdW1lbnRGcmFnbWVudCA9IHdpbmRvdy5Eb2N1bWVudEZyYWdtZW50LFxuICAgICAgICBIVE1MVGVtcGxhdGVFbGVtZW50ID0gd2luZG93LkhUTUxUZW1wbGF0ZUVsZW1lbnQsXG4gICAgICAgIE5vZGUgPSB3aW5kb3cuTm9kZSxcbiAgICAgICAgTm9kZUZpbHRlciA9IHdpbmRvdy5Ob2RlRmlsdGVyLFxuICAgICAgICBfd2luZG93JE5hbWVkTm9kZU1hcCA9IHdpbmRvdy5OYW1lZE5vZGVNYXAsXG4gICAgICAgIE5hbWVkTm9kZU1hcCA9IF93aW5kb3ckTmFtZWROb2RlTWFwID09PSB1bmRlZmluZWQgPyB3aW5kb3cuTmFtZWROb2RlTWFwIHx8IHdpbmRvdy5Nb3pOYW1lZEF0dHJNYXAgOiBfd2luZG93JE5hbWVkTm9kZU1hcCxcbiAgICAgICAgVGV4dCA9IHdpbmRvdy5UZXh0LFxuICAgICAgICBDb21tZW50ID0gd2luZG93LkNvbW1lbnQsXG4gICAgICAgIERPTVBhcnNlciA9IHdpbmRvdy5ET01QYXJzZXIsXG4gICAgICAgIHRydXN0ZWRUeXBlcyA9IHdpbmRvdy50cnVzdGVkVHlwZXM7XG5cbiAgICAvLyBBcyBwZXIgaXNzdWUgIzQ3LCB0aGUgd2ViLWNvbXBvbmVudHMgcmVnaXN0cnkgaXMgaW5oZXJpdGVkIGJ5IGFcbiAgICAvLyBuZXcgZG9jdW1lbnQgY3JlYXRlZCB2aWEgY3JlYXRlSFRNTERvY3VtZW50LiBBcyBwZXIgdGhlIHNwZWNcbiAgICAvLyAoaHR0cDovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL2N1c3RvbS8jY3JlYXRpbmctYW5kLXBhc3NpbmctcmVnaXN0cmllcylcbiAgICAvLyBhIG5ldyBlbXB0eSByZWdpc3RyeSBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgYSB0ZW1wbGF0ZSBjb250ZW50cyBvd25lclxuICAgIC8vIGRvY3VtZW50LCBzbyB3ZSB1c2UgdGhhdCBhcyBvdXIgcGFyZW50IGRvY3VtZW50IHRvIGVuc3VyZSBub3RoaW5nXG4gICAgLy8gaXMgaW5oZXJpdGVkLlxuXG4gICAgaWYgKHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgICAgaWYgKHRlbXBsYXRlLmNvbnRlbnQgJiYgdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGRvY3VtZW50ID0gdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB0cnVzdGVkVHlwZXNQb2xpY3kgPSBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgb3JpZ2luYWxEb2N1bWVudCk7XG4gICAgdmFyIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpIDogJyc7XG5cbiAgICB2YXIgX2RvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgICAgIGltcGxlbWVudGF0aW9uID0gX2RvY3VtZW50LmltcGxlbWVudGF0aW9uLFxuICAgICAgICBjcmVhdGVOb2RlSXRlcmF0b3IgPSBfZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yLFxuICAgICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZSA9IF9kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSxcbiAgICAgICAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCA9IF9kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50O1xuICAgIHZhciBpbXBvcnROb2RlID0gb3JpZ2luYWxEb2N1bWVudC5pbXBvcnROb2RlO1xuXG5cbiAgICB2YXIgZG9jdW1lbnRNb2RlID0ge307XG4gICAgdHJ5IHtcbiAgICAgIGRvY3VtZW50TW9kZSA9IGNsb25lKGRvY3VtZW50KS5kb2N1bWVudE1vZGUgPyBkb2N1bWVudC5kb2N1bWVudE1vZGUgOiB7fTtcbiAgICB9IGNhdGNoIChfKSB7fVxuXG4gICAgdmFyIGhvb2tzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBFeHBvc2Ugd2hldGhlciB0aGlzIGJyb3dzZXIgc3VwcG9ydHMgcnVubmluZyB0aGUgZnVsbCBET01QdXJpZnkuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmlzU3VwcG9ydGVkID0gaW1wbGVtZW50YXRpb24gJiYgdHlwZW9mIGltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnRNb2RlICE9PSA5O1xuXG4gICAgdmFyIE1VU1RBQ0hFX0VYUFIkJDEgPSBNVVNUQUNIRV9FWFBSLFxuICAgICAgICBFUkJfRVhQUiQkMSA9IEVSQl9FWFBSLFxuICAgICAgICBEQVRBX0FUVFIkJDEgPSBEQVRBX0FUVFIsXG4gICAgICAgIEFSSUFfQVRUUiQkMSA9IEFSSUFfQVRUUixcbiAgICAgICAgSVNfU0NSSVBUX09SX0RBVEEkJDEgPSBJU19TQ1JJUFRfT1JfREFUQSxcbiAgICAgICAgQVRUUl9XSElURVNQQUNFJCQxID0gQVRUUl9XSElURVNQQUNFO1xuICAgIHZhciBJU19BTExPV0VEX1VSSSQkMSA9IElTX0FMTE9XRURfVVJJO1xuXG4gICAgLyoqXG4gICAgICogV2UgY29uc2lkZXIgdGhlIGVsZW1lbnRzIGFuZCBhdHRyaWJ1dGVzIGJlbG93IHRvIGJlIHNhZmUuIElkZWFsbHlcbiAgICAgKiBkb24ndCBhZGQgYW55IG5ldyBvbmVzIGJ1dCBmZWVsIGZyZWUgdG8gcmVtb3ZlIHVud2FudGVkIG9uZXMuXG4gICAgICovXG5cbiAgICAvKiBhbGxvd2VkIGVsZW1lbnQgbmFtZXMgKi9cblxuICAgIHZhciBBTExPV0VEX1RBR1MgPSBudWxsO1xuICAgIHZhciBERUZBVUxUX0FMTE9XRURfVEFHUyA9IGFkZFRvU2V0KHt9LCBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5JDEoaHRtbCksIF90b0NvbnN1bWFibGVBcnJheSQxKHN2ZyksIF90b0NvbnN1bWFibGVBcnJheSQxKHN2Z0ZpbHRlcnMpLCBfdG9Db25zdW1hYmxlQXJyYXkkMShtYXRoTWwpLCBfdG9Db25zdW1hYmxlQXJyYXkkMSh0ZXh0KSkpO1xuXG4gICAgLyogQWxsb3dlZCBhdHRyaWJ1dGUgbmFtZXMgKi9cbiAgICB2YXIgQUxMT1dFRF9BVFRSID0gbnVsbDtcbiAgICB2YXIgREVGQVVMVF9BTExPV0VEX0FUVFIgPSBhZGRUb1NldCh7fSwgW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSQxKGh0bWwkMSksIF90b0NvbnN1bWFibGVBcnJheSQxKHN2ZyQxKSwgX3RvQ29uc3VtYWJsZUFycmF5JDEobWF0aE1sJDEpLCBfdG9Db25zdW1hYmxlQXJyYXkkMSh4bWwpKSk7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiB0YWdzIChvdmVycmlkZXMgQUxMT1dFRF9UQUdTL0FERF9UQUdTKSAqL1xuICAgIHZhciBGT1JCSURfVEFHUyA9IG51bGw7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiBhdHRyaWJ1dGVzIChvdmVycmlkZXMgQUxMT1dFRF9BVFRSL0FERF9BVFRSKSAqL1xuICAgIHZhciBGT1JCSURfQVRUUiA9IG51bGw7XG5cbiAgICAvKiBEZWNpZGUgaWYgQVJJQSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgdmFyIEFMTE9XX0FSSUFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgY3VzdG9tIGRhdGEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIHZhciBBTExPV19EQVRBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIHVua25vd24gcHJvdG9jb2xzIGFyZSBva2F5ICovXG4gICAgdmFyIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZm9yIGNvbW1vbiB0ZW1wbGF0ZSBlbmdpbmVzLlxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICAgKi9cbiAgICB2YXIgU0FGRV9GT1JfVEVNUExBVEVTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgZG9jdW1lbnQgd2l0aCA8aHRtbD4uLi4gc2hvdWxkIGJlIHJldHVybmVkICovXG4gICAgdmFyIFdIT0xFX0RPQ1VNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBUcmFjayB3aGV0aGVyIGNvbmZpZyBpcyBhbHJlYWR5IHNldCBvbiB0aGlzIGluc3RhbmNlIG9mIERPTVB1cmlmeS4gKi9cbiAgICB2YXIgU0VUX0NPTkZJRyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGFsbCBlbGVtZW50cyAoZS5nLiBzdHlsZSwgc2NyaXB0KSBtdXN0IGJlIGNoaWxkcmVuIG9mXG4gICAgICogZG9jdW1lbnQuYm9keS4gQnkgZGVmYXVsdCwgYnJvd3NlcnMgbWlnaHQgbW92ZSB0aGVtIHRvIGRvY3VtZW50LmhlYWQgKi9cbiAgICB2YXIgRk9SQ0VfQk9EWSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXG4gICAgICogSWYgYFdIT0xFX0RPQ1VNRU5UYCBpcyBlbmFibGVkIGEgYEhUTUxIdG1sRWxlbWVudGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkXG4gICAgICovXG4gICAgdmFyIFJFVFVSTl9ET00gPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgRG9jdW1lbnRGcmFnbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cbiAgICB2YXIgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogSWYgYFJFVFVSTl9ET01gIG9yIGBSRVRVUk5fRE9NX0ZSQUdNRU5UYCBpcyBlbmFibGVkLCBkZWNpZGUgaWYgdGhlIHJldHVybmVkIERPTVxuICAgICAqIGBOb2RlYCBpcyBpbXBvcnRlZCBpbnRvIHRoZSBjdXJyZW50IGBEb2N1bWVudGAuIElmIHRoaXMgZmxhZyBpcyBub3QgZW5hYmxlZCB0aGVcbiAgICAgKiBgTm9kZWAgd2lsbCBiZWxvbmcgKGl0cyBvd25lckRvY3VtZW50KSB0byBhIGZyZXNoIGBIVE1MRG9jdW1lbnRgLCBjcmVhdGVkIGJ5XG4gICAgICogRE9NUHVyaWZ5LiAqL1xuICAgIHZhciBSRVRVUk5fRE9NX0lNUE9SVCA9IGZhbHNlO1xuXG4gICAgLyogVHJ5IHRvIHJldHVybiBhIFRydXN0ZWQgVHlwZSBvYmplY3QgaW5zdGVhZCBvZiBhIHN0cmluZywgcmV0dXJuIGEgc3RyaW5nIGluXG4gICAgICogY2FzZSBUcnVzdGVkIFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkICAqL1xuICAgIHZhciBSRVRVUk5fVFJVU1RFRF9UWVBFID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIGZyZWUgZnJvbSBET00gY2xvYmJlcmluZyBhdHRhY2tzPyAqL1xuICAgIHZhciBTQU5JVElaRV9ET00gPSB0cnVlO1xuXG4gICAgLyogS2VlcCBlbGVtZW50IGNvbnRlbnQgd2hlbiByZW1vdmluZyBlbGVtZW50PyAqL1xuICAgIHZhciBLRUVQX0NPTlRFTlQgPSB0cnVlO1xuXG4gICAgLyogSWYgYSBgTm9kZWAgaXMgcGFzc2VkIHRvIHNhbml0aXplKCksIHRoZW4gcGVyZm9ybXMgc2FuaXRpemF0aW9uIGluLXBsYWNlIGluc3RlYWRcbiAgICAgKiBvZiBpbXBvcnRpbmcgaXQgaW50byBhIG5ldyBEb2N1bWVudCBhbmQgcmV0dXJuaW5nIGEgc2FuaXRpemVkIGNvcHkgKi9cbiAgICB2YXIgSU5fUExBQ0UgPSBmYWxzZTtcblxuICAgIC8qIEFsbG93IHVzYWdlIG9mIHByb2ZpbGVzIGxpa2UgaHRtbCwgc3ZnIGFuZCBtYXRoTWwgKi9cbiAgICB2YXIgVVNFX1BST0ZJTEVTID0ge307XG5cbiAgICAvKiBUYWdzIHRvIGlnbm9yZSBjb250ZW50IG9mIHdoZW4gS0VFUF9DT05URU5UIGlzIHRydWUgKi9cbiAgICB2YXIgRk9SQklEX0NPTlRFTlRTID0gYWRkVG9TZXQoe30sIFsnYW5ub3RhdGlvbi14bWwnLCAnYXVkaW8nLCAnY29sZ3JvdXAnLCAnZGVzYycsICdmb3JlaWdub2JqZWN0JywgJ2hlYWQnLCAnaWZyYW1lJywgJ21hdGgnLCAnbWknLCAnbW4nLCAnbW8nLCAnbXMnLCAnbXRleHQnLCAnbm9lbWJlZCcsICdub2ZyYW1lcycsICdwbGFpbnRleHQnLCAnc2NyaXB0JywgJ3N0eWxlJywgJ3N2ZycsICd0ZW1wbGF0ZScsICd0aGVhZCcsICd0aXRsZScsICd2aWRlbycsICd4bXAnXSk7XG5cbiAgICAvKiBUYWdzIHRoYXQgYXJlIHNhZmUgZm9yIGRhdGE6IFVSSXMgKi9cbiAgICB2YXIgREFUQV9VUklfVEFHUyA9IG51bGw7XG4gICAgdmFyIERFRkFVTFRfREFUQV9VUklfVEFHUyA9IGFkZFRvU2V0KHt9LCBbJ2F1ZGlvJywgJ3ZpZGVvJywgJ2ltZycsICdzb3VyY2UnLCAnaW1hZ2UnLCAndHJhY2snXSk7XG5cbiAgICAvKiBBdHRyaWJ1dGVzIHNhZmUgZm9yIHZhbHVlcyBsaWtlIFwiamF2YXNjcmlwdDpcIiAqL1xuICAgIHZhciBVUklfU0FGRV9BVFRSSUJVVEVTID0gbnVsbDtcbiAgICB2YXIgREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTID0gYWRkVG9TZXQoe30sIFsnYWx0JywgJ2NsYXNzJywgJ2ZvcicsICdpZCcsICdsYWJlbCcsICduYW1lJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAnc3VtbWFyeScsICd0aXRsZScsICd2YWx1ZScsICdzdHlsZScsICd4bWxucyddKTtcblxuICAgIC8qIEtlZXAgYSByZWZlcmVuY2UgdG8gY29uZmlnIHRvIHBhc3MgdG8gaG9va3MgKi9cbiAgICB2YXIgQ09ORklHID0gbnVsbDtcblxuICAgIC8qIElkZWFsbHksIGRvIG5vdCB0b3VjaCBhbnl0aGluZyBiZWxvdyB0aGlzIGxpbmUgKi9cbiAgICAvKiBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fICovXG5cbiAgICB2YXIgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cbiAgICAvKipcbiAgICAgKiBfcGFyc2VDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY2ZnIG9wdGlvbmFsIGNvbmZpZyBsaXRlcmFsXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICB2YXIgX3BhcnNlQ29uZmlnID0gZnVuY3Rpb24gX3BhcnNlQ29uZmlnKGNmZykge1xuICAgICAgaWYgKENPTkZJRyAmJiBDT05GSUcgPT09IGNmZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8qIFNoaWVsZCBjb25maWd1cmF0aW9uIG9iamVjdCBmcm9tIHRhbXBlcmluZyAqL1xuICAgICAgaWYgKCFjZmcgfHwgKHR5cGVvZiBjZmcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGNmZykpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjZmcgPSB7fTtcbiAgICAgIH1cblxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gcHJvdG90eXBlIHBvbGx1dGlvbiAqL1xuICAgICAgY2ZnID0gY2xvbmUoY2ZnKTtcblxuICAgICAgLyogU2V0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgICAgQUxMT1dFRF9UQUdTID0gJ0FMTE9XRURfVEFHUycgaW4gY2ZnID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX1RBR1MpIDogREVGQVVMVF9BTExPV0VEX1RBR1M7XG4gICAgICBBTExPV0VEX0FUVFIgPSAnQUxMT1dFRF9BVFRSJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUikgOiBERUZBVUxUX0FMTE9XRURfQVRUUjtcbiAgICAgIFVSSV9TQUZFX0FUVFJJQlVURVMgPSAnQUREX1VSSV9TQUZFX0FUVFInIGluIGNmZyA/IGFkZFRvU2V0KGNsb25lKERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyksIGNmZy5BRERfVVJJX1NBRkVfQVRUUikgOiBERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVM7XG4gICAgICBEQVRBX1VSSV9UQUdTID0gJ0FERF9EQVRBX1VSSV9UQUdTJyBpbiBjZmcgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX0RBVEFfVVJJX1RBR1MpLCBjZmcuQUREX0RBVEFfVVJJX1RBR1MpIDogREVGQVVMVF9EQVRBX1VSSV9UQUdTO1xuICAgICAgRk9SQklEX1RBR1MgPSAnRk9SQklEX1RBR1MnIGluIGNmZyA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX1RBR1MpIDoge307XG4gICAgICBGT1JCSURfQVRUUiA9ICdGT1JCSURfQVRUUicgaW4gY2ZnID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQVRUUikgOiB7fTtcbiAgICAgIFVTRV9QUk9GSUxFUyA9ICdVU0VfUFJPRklMRVMnIGluIGNmZyA/IGNmZy5VU0VfUFJPRklMRVMgOiBmYWxzZTtcbiAgICAgIEFMTE9XX0FSSUFfQVRUUiA9IGNmZy5BTExPV19BUklBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGNmZy5BTExPV19EQVRBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gY2ZnLkFMTE9XX1VOS05PV05fUFJPVE9DT0xTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBTQUZFX0ZPUl9URU1QTEFURVMgPSBjZmcuU0FGRV9GT1JfVEVNUExBVEVTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBXSE9MRV9ET0NVTUVOVCA9IGNmZy5XSE9MRV9ET0NVTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTSA9IGNmZy5SRVRVUk5fRE9NIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gY2ZnLlJFVFVSTl9ET01fRlJBR01FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9ET01fSU1QT1JUID0gY2ZnLlJFVFVSTl9ET01fSU1QT1JUIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fVFJVU1RFRF9UWVBFID0gY2ZnLlJFVFVSTl9UUlVTVEVEX1RZUEUgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEZPUkNFX0JPRFkgPSBjZmcuRk9SQ0VfQk9EWSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgU0FOSVRJWkVfRE9NID0gY2ZnLlNBTklUSVpFX0RPTSAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgS0VFUF9DT05URU5UID0gY2ZnLktFRVBfQ09OVEVOVCAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgSU5fUExBQ0UgPSBjZmcuSU5fUExBQ0UgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIElTX0FMTE9XRURfVVJJJCQxID0gY2ZnLkFMTE9XRURfVVJJX1JFR0VYUCB8fCBJU19BTExPV0VEX1VSSSQkMTtcbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgQUxMT1dfREFUQV9BVFRSID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgIFJFVFVSTl9ET00gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBQYXJzZSBwcm9maWxlIGluZm8gKi9cbiAgICAgIGlmIChVU0VfUFJPRklMRVMpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkkMSh0ZXh0KSkpO1xuICAgICAgICBBTExPV0VEX0FUVFIgPSBbXTtcbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5odG1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBodG1sKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGh0bWwkMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2ZyQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2Z0ZpbHRlcnMgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIHN2Z0ZpbHRlcnMpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMubWF0aE1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBtYXRoTWwpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgbWF0aE1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBNZXJnZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIGlmIChjZmcuQUREX1RBR1MpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfVEFHUyA9PT0gREVGQVVMVF9BTExPV0VEX1RBR1MpIHtcbiAgICAgICAgICBBTExPV0VEX1RBR1MgPSBjbG9uZShBTExPV0VEX1RBR1MpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBjZmcuQUREX1RBR1MpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ZnLkFERF9BVFRSKSB7XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIgPT09IERFRkFVTFRfQUxMT1dFRF9BVFRSKSB7XG4gICAgICAgICAgQUxMT1dFRF9BVFRSID0gY2xvbmUoQUxMT1dFRF9BVFRSKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgY2ZnLkFERF9BVFRSKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNmZy5BRERfVVJJX1NBRkVfQVRUUikge1xuICAgICAgICBhZGRUb1NldChVUklfU0FGRV9BVFRSSUJVVEVTLCBjZmcuQUREX1VSSV9TQUZFX0FUVFIpO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgI3RleHQgaW4gY2FzZSBLRUVQX0NPTlRFTlQgaXMgc2V0IHRvIHRydWUgKi9cbiAgICAgIGlmIChLRUVQX0NPTlRFTlQpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTWycjdGV4dCddID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkIGh0bWwsIGhlYWQgYW5kIGJvZHkgdG8gQUxMT1dFRF9UQUdTIGluIGNhc2UgV0hPTEVfRE9DVU1FTlQgaXMgdHJ1ZSAqL1xuICAgICAgaWYgKFdIT0xFX0RPQ1VNRU5UKSB7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgWydodG1sJywgJ2hlYWQnLCAnYm9keSddKTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkIHRib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIHRhYmxlcyBhcmUgcGVybWl0dGVkLCBzZWUgIzI4NiwgIzM2NSAqL1xuICAgICAgaWYgKEFMTE9XRURfVEFHUy50YWJsZSkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsndGJvZHknXSk7XG4gICAgICAgIGRlbGV0ZSBGT1JCSURfVEFHUy50Ym9keTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudCBmdXJ0aGVyIG1hbmlwdWxhdGlvbiBvZiBjb25maWd1cmF0aW9uLlxuICAgICAgLy8gTm90IGF2YWlsYWJsZSBpbiBJRTgsIFNhZmFyaSA1LCBldGMuXG4gICAgICBpZiAoZnJlZXplKSB7XG4gICAgICAgIGZyZWV6ZShjZmcpO1xuICAgICAgfVxuXG4gICAgICBDT05GSUcgPSBjZmc7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9mb3JjZVJlbW92ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBhIERPTSBub2RlXG4gICAgICovXG4gICAgdmFyIF9mb3JjZVJlbW92ZSA9IGZ1bmN0aW9uIF9mb3JjZVJlbW92ZShub2RlKSB7XG4gICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHsgZWxlbWVudDogbm9kZSB9KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgbm9kZS5vdXRlckhUTUwgPSBlbXB0eUhUTUw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9yZW1vdmVBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBhbiBBdHRyaWJ1dGUgbmFtZVxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuICAgIHZhciBfcmVtb3ZlQXR0cmlidXRlID0gZnVuY3Rpb24gX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBub2RlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG5vZGUuZ2V0QXR0cmlidXRlTm9kZShuYW1lKSxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG51bGwsXG4gICAgICAgICAgZnJvbTogbm9kZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pbml0RG9jdW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZGlydHkgYSBzdHJpbmcgb2YgZGlydHkgbWFya3VwXG4gICAgICogQHJldHVybiB7RG9jdW1lbnR9IGEgRE9NLCBmaWxsZWQgd2l0aCB0aGUgZGlydHkgbWFya3VwXG4gICAgICovXG4gICAgdmFyIF9pbml0RG9jdW1lbnQgPSBmdW5jdGlvbiBfaW5pdERvY3VtZW50KGRpcnR5KSB7XG4gICAgICAvKiBDcmVhdGUgYSBIVE1MIGRvY3VtZW50ICovXG4gICAgICB2YXIgZG9jID0gdm9pZCAwO1xuICAgICAgdmFyIGxlYWRpbmdXaGl0ZXNwYWNlID0gdm9pZCAwO1xuXG4gICAgICBpZiAoRk9SQ0VfQk9EWSkge1xuICAgICAgICBkaXJ0eSA9ICc8cmVtb3ZlPjwvcmVtb3ZlPicgKyBkaXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIElmIEZPUkNFX0JPRFkgaXNuJ3QgdXNlZCwgbGVhZGluZyB3aGl0ZXNwYWNlIG5lZWRzIHRvIGJlIHByZXNlcnZlZCBtYW51YWxseSAqL1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IHN0cmluZ01hdGNoKGRpcnR5LCAvXltcXHJcXG5cXHQgXSsvKTtcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2UgPSBtYXRjaGVzICYmIG1hdGNoZXNbMF07XG4gICAgICB9XG5cbiAgICAgIHZhciBkaXJ0eVBheWxvYWQgPSB0cnVzdGVkVHlwZXNQb2xpY3kgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgIC8qIFVzZSB0aGUgRE9NUGFyc2VyIEFQSSBieSBkZWZhdWx0LCBmYWxsYmFjayBsYXRlciBpZiBuZWVkcyBiZSAqL1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkaXJ0eVBheWxvYWQsICd0ZXh0L2h0bWwnKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHt9XG5cbiAgICAgIC8qIFVzZSBjcmVhdGVIVE1MRG9jdW1lbnQgaW4gY2FzZSBET01QYXJzZXIgaXMgbm90IGF2YWlsYWJsZSAqL1xuICAgICAgaWYgKCFkb2MgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgZG9jID0gaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCcnKTtcbiAgICAgICAgdmFyIF9kb2MgPSBkb2MsXG4gICAgICAgICAgICBib2R5ID0gX2RvYy5ib2R5O1xuXG4gICAgICAgIGJvZHkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChib2R5LnBhcmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpO1xuICAgICAgICBib2R5Lm91dGVySFRNTCA9IGRpcnR5UGF5bG9hZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRpcnR5ICYmIGxlYWRpbmdXaGl0ZXNwYWNlKSB7XG4gICAgICAgIGRvYy5ib2R5Lmluc2VydEJlZm9yZShkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsZWFkaW5nV2hpdGVzcGFjZSksIGRvYy5ib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIC8qIFdvcmsgb24gd2hvbGUgZG9jdW1lbnQgb3IganVzdCBpdHMgYm9keSAqL1xuICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlUYWdOYW1lLmNhbGwoZG9jLCBXSE9MRV9ET0NVTUVOVCA/ICdodG1sJyA6ICdib2R5JylbMF07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9jcmVhdGVJdGVyYXRvclxuICAgICAqXG4gICAgICogQHBhcmFtICB7RG9jdW1lbnR9IHJvb3QgZG9jdW1lbnQvZnJhZ21lbnQgdG8gY3JlYXRlIGl0ZXJhdG9yIGZvclxuICAgICAqIEByZXR1cm4ge0l0ZXJhdG9yfSBpdGVyYXRvciBpbnN0YW5jZVxuICAgICAqL1xuICAgIHZhciBfY3JlYXRlSXRlcmF0b3IgPSBmdW5jdGlvbiBfY3JlYXRlSXRlcmF0b3Iocm9vdCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU5vZGVJdGVyYXRvci5jYWxsKHJvb3Qub3duZXJEb2N1bWVudCB8fCByb290LCByb290LCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVDtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzQ2xvYmJlcmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBlbG0gZWxlbWVudCB0byBjaGVjayBmb3IgY2xvYmJlcmluZyBhdHRhY2tzXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBjbG9iYmVyZWQsIGZhbHNlIGlmIHNhZmVcbiAgICAgKi9cbiAgICB2YXIgX2lzQ2xvYmJlcmVkID0gZnVuY3Rpb24gX2lzQ2xvYmJlcmVkKGVsbSkge1xuICAgICAgaWYgKGVsbSBpbnN0YW5jZW9mIFRleHQgfHwgZWxtIGluc3RhbmNlb2YgQ29tbWVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZWxtLm5vZGVOYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnJlbW92ZUNoaWxkICE9PSAnZnVuY3Rpb24nIHx8ICEoZWxtLmF0dHJpYnV0ZXMgaW5zdGFuY2VvZiBOYW1lZE5vZGVNYXApIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uc2V0QXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0ubmFtZXNwYWNlVVJJICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNOb2RlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBvYmogb2JqZWN0IHRvIGNoZWNrIHdoZXRoZXIgaXQncyBhIERPTSBub2RlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpcyBvYmplY3QgaXMgYSBET00gbm9kZVxuICAgICAqL1xuICAgIHZhciBfaXNOb2RlID0gZnVuY3Rpb24gX2lzTm9kZShvYmplY3QpIHtcbiAgICAgIHJldHVybiAodHlwZW9mIE5vZGUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKE5vZGUpKSA9PT0gJ29iamVjdCcgPyBvYmplY3QgaW5zdGFuY2VvZiBOb2RlIDogb2JqZWN0ICYmICh0eXBlb2Ygb2JqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmplY3QpKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iamVjdC5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG9iamVjdC5ub2RlTmFtZSA9PT0gJ3N0cmluZyc7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9leGVjdXRlSG9va1xuICAgICAqIEV4ZWN1dGUgdXNlciBjb25maWd1cmFibGUgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCAgTmFtZSBvZiB0aGUgaG9vaydzIGVudHJ5IHBvaW50XG4gICAgICogQHBhcmFtICB7Tm9kZX0gY3VycmVudE5vZGUgbm9kZSB0byB3b3JrIG9uIHdpdGggdGhlIGhvb2tcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgYWRkaXRpb25hbCBob29rIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICB2YXIgX2V4ZWN1dGVIb29rID0gZnVuY3Rpb24gX2V4ZWN1dGVIb29rKGVudHJ5UG9pbnQsIGN1cnJlbnROb2RlLCBkYXRhKSB7XG4gICAgICBpZiAoIWhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXJyYXlGb3JFYWNoKGhvb2tzW2VudHJ5UG9pbnRdLCBmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVFbGVtZW50c1xuICAgICAqXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCB0ZXh0Q29udGVudFxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUNoaWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gY2hlY2sgZm9yIHBlcm1pc3Npb24gdG8gZXhpc3RcbiAgICAgKiBAcmV0dXJuICB7Qm9vbGVhbn0gdHJ1ZSBpZiBub2RlIHdhcyBraWxsZWQsIGZhbHNlIGlmIGxlZnQgYWxpdmVcbiAgICAgKi9cbiAgICB2YXIgX3Nhbml0aXplRWxlbWVudHMgPSBmdW5jdGlvbiBfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSB2b2lkIDA7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cbiAgICAgIGlmIChfaXNDbG9iYmVyZWQoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayBpZiB0YWduYW1lIGNvbnRhaW5zIFVuaWNvZGUgKi9cbiAgICAgIGlmIChzdHJpbmdNYXRjaChjdXJyZW50Tm9kZS5ub2RlTmFtZSwgL1tcXHUwMDgwLVxcdUZGRkZdLykpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE5vdyBsZXQncyBjaGVjayB0aGUgZWxlbWVudCdzIHR5cGUgYW5kIG5hbWUgKi9cbiAgICAgIHZhciB0YWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBjdXJyZW50Tm9kZSwge1xuICAgICAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgICAgICBhbGxvd2VkVGFnczogQUxMT1dFRF9UQUdTXG4gICAgICB9KTtcblxuICAgICAgLyogVGFrZSBjYXJlIG9mIGFuIG1YU1MgcGF0dGVybiB1c2luZyBwLCBiciBpbnNpZGUgc3ZnLCBtYXRoICovXG4gICAgICBpZiAoKHRhZ05hbWUgPT09ICdzdmcnIHx8IHRhZ05hbWUgPT09ICdtYXRoJykgJiYgY3VycmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgncCwgYnInKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIERldGVjdCBtWFNTIGF0dGVtcHRzIGFidXNpbmcgbmFtZXNwYWNlIGNvbmZ1c2lvbiAqL1xuICAgICAgaWYgKCFfaXNOb2RlKGN1cnJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSAmJiAoIV9pc05vZGUoY3VycmVudE5vZGUuY29udGVudCkgfHwgIV9pc05vZGUoY3VycmVudE5vZGUuY29udGVudC5maXJzdEVsZW1lbnRDaGlsZCkpICYmIHJlZ0V4cFRlc3QoLzxbIS9cXHddL2csIGN1cnJlbnROb2RlLmlubmVySFRNTCkgJiYgcmVnRXhwVGVzdCgvPFshL1xcd10vZywgY3VycmVudE5vZGUudGV4dENvbnRlbnQpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBSZW1vdmUgZWxlbWVudCBpZiBhbnl0aGluZyBmb3JiaWRzIGl0cyBwcmVzZW5jZSAqL1xuICAgICAgaWYgKCFBTExPV0VEX1RBR1NbdGFnTmFtZV0gfHwgRk9SQklEX1RBR1NbdGFnTmFtZV0pIHtcbiAgICAgICAgLyogS2VlcCBjb250ZW50IGV4Y2VwdCBmb3IgYmFkLWxpc3RlZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoS0VFUF9DT05URU5UICYmICFGT1JCSURfQ09OVEVOVFNbdGFnTmFtZV0gJiYgdHlwZW9mIGN1cnJlbnROb2RlLmluc2VydEFkamFjZW50SFRNTCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgaHRtbFRvSW5zZXJ0ID0gY3VycmVudE5vZGUuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY3VycmVudE5vZGUuaW5zZXJ0QWRqYWNlbnRIVE1MKCdBZnRlckVuZCcsIHRydXN0ZWRUeXBlc1BvbGljeSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGh0bWxUb0luc2VydCkgOiBodG1sVG9JbnNlcnQpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIH1cblxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogUmVtb3ZlIGluIGNhc2UgYSBub3NjcmlwdC9ub2VtYmVkIFhTUyBpcyBzdXNwZWN0ZWQgKi9cbiAgICAgIGlmICgodGFnTmFtZSA9PT0gJ25vc2NyaXB0JyB8fCB0YWdOYW1lID09PSAnbm9lbWJlZCcpICYmIHJlZ0V4cFRlc3QoLzxcXC9ubyhzY3JpcHR8ZW1iZWQpL2ksIGN1cnJlbnROb2RlLmlubmVySFRNTCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFNhbml0aXplIGVsZW1lbnQgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTICYmIGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIC8qIEdldCB0aGUgZWxlbWVudCdzIHRleHQgY29udGVudCAqL1xuICAgICAgICBjb250ZW50ID0gY3VycmVudE5vZGUudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnRlbnQgPSBzdHJpbmdSZXBsYWNlKGNvbnRlbnQsIE1VU1RBQ0hFX0VYUFIkJDEsICcgJyk7XG4gICAgICAgIGNvbnRlbnQgPSBzdHJpbmdSZXBsYWNlKGNvbnRlbnQsIEVSQl9FWFBSJCQxLCAnICcpO1xuICAgICAgICBpZiAoY3VycmVudE5vZGUudGV4dENvbnRlbnQgIT09IGNvbnRlbnQpIHtcbiAgICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHsgZWxlbWVudDogY3VycmVudE5vZGUuY2xvbmVOb2RlKCkgfSk7XG4gICAgICAgICAgY3VycmVudE5vZGUudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZUVsZW1lbnRzJywgY3VycmVudE5vZGUsIG51bGwpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc1ZhbGlkQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjVGFnIExvd2VyY2FzZSB0YWcgbmFtZSBvZiBjb250YWluaW5nIGVsZW1lbnQuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBsY05hbWUgTG93ZXJjYXNlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIHZhbGlkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICB2YXIgX2lzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkge1xuICAgICAgLyogTWFrZSBzdXJlIGF0dHJpYnV0ZSBjYW5ub3QgY2xvYmJlciAqL1xuICAgICAgaWYgKFNBTklUSVpFX0RPTSAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSAmJiAodmFsdWUgaW4gZG9jdW1lbnQgfHwgdmFsdWUgaW4gZm9ybUVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLyogQWxsb3cgdmFsaWQgZGF0YS0qIGF0dHJpYnV0ZXM6IEF0IGxlYXN0IG9uZSBjaGFyYWN0ZXIgYWZ0ZXIgXCItXCJcbiAgICAgICAgICAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZG9tLmh0bWwjZW1iZWRkaW5nLWN1c3RvbS1ub24tdmlzaWJsZS1kYXRhLXdpdGgtdGhlLWRhdGEtKi1hdHRyaWJ1dGVzKVxuICAgICAgICAgIFhNTC1jb21wYXRpYmxlIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI3htbC1jb21wYXRpYmxlIGFuZCBodHRwOi8vd3d3LnczLm9yZy9UUi94bWwvI2QwZTgwNClcbiAgICAgICAgICBXZSBkb24ndCBuZWVkIHRvIGNoZWNrIHRoZSB2YWx1ZTsgaXQncyBhbHdheXMgVVJJIHNhZmUuICovXG4gICAgICBpZiAoQUxMT1dfREFUQV9BVFRSICYmIHJlZ0V4cFRlc3QoREFUQV9BVFRSJCQxLCBsY05hbWUpKSA7IGVsc2UgaWYgKEFMTE9XX0FSSUFfQVRUUiAmJiByZWdFeHBUZXN0KEFSSUFfQVRUUiQkMSwgbGNOYW1lKSkgOyBlbHNlIGlmICghQUxMT1dFRF9BVFRSW2xjTmFtZV0gfHwgRk9SQklEX0FUVFJbbGNOYW1lXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLyogQ2hlY2sgdmFsdWUgaXMgc2FmZS4gRmlyc3QsIGlzIGF0dHIgaW5lcnQ/IElmIHNvLCBpcyBzYWZlICovXG4gICAgICB9IGVsc2UgaWYgKFVSSV9TQUZFX0FUVFJJQlVURVNbbGNOYW1lXSkgOyBlbHNlIGlmIChyZWdFeHBUZXN0KElTX0FMTE9XRURfVVJJJCQxLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UkJDEsICcnKSkpIDsgZWxzZSBpZiAoKGxjTmFtZSA9PT0gJ3NyYycgfHwgbGNOYW1lID09PSAneGxpbms6aHJlZicgfHwgbGNOYW1lID09PSAnaHJlZicpICYmIGxjVGFnICE9PSAnc2NyaXB0JyAmJiBzdHJpbmdJbmRleE9mKHZhbHVlLCAnZGF0YTonKSA9PT0gMCAmJiBEQVRBX1VSSV9UQUdTW2xjVGFnXSkgOyBlbHNlIGlmIChBTExPV19VTktOT1dOX1BST1RPQ09MUyAmJiAhcmVnRXhwVGVzdChJU19TQ1JJUFRfT1JfREFUQSQkMSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFJCQxLCAnJykpKSA7IGVsc2UgaWYgKCF2YWx1ZSkgOyBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplQXR0cmlidXRlc1xuICAgICAqXG4gICAgICogQHByb3RlY3QgYXR0cmlidXRlc1xuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgcmVtb3ZlQXR0cmlidXRlXG4gICAgICogQHByb3RlY3Qgc2V0QXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxuICAgICAqL1xuICAgIHZhciBfc2FuaXRpemVBdHRyaWJ1dGVzID0gZnVuY3Rpb24gX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSkge1xuICAgICAgdmFyIGF0dHIgPSB2b2lkIDA7XG4gICAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gICAgICB2YXIgbGNOYW1lID0gdm9pZCAwO1xuICAgICAgdmFyIGwgPSB2b2lkIDA7XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBjdXJyZW50Tm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGF0dHJpYnV0ZXM7IGlmIG5vdCB3ZSBtaWdodCBoYXZlIGEgdGV4dCBub2RlICovXG5cbiAgICAgIGlmICghYXR0cmlidXRlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBob29rRXZlbnQgPSB7XG4gICAgICAgIGF0dHJOYW1lOiAnJyxcbiAgICAgICAgYXR0clZhbHVlOiAnJyxcbiAgICAgICAga2VlcEF0dHI6IHRydWUsXG4gICAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzOiBBTExPV0VEX0FUVFJcbiAgICAgIH07XG4gICAgICBsID0gYXR0cmlidXRlcy5sZW5ndGg7XG5cbiAgICAgIC8qIEdvIGJhY2t3YXJkcyBvdmVyIGFsbCBhdHRyaWJ1dGVzOyBzYWZlbHkgcmVtb3ZlIGJhZCBvbmVzICovXG4gICAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgIGF0dHIgPSBhdHRyaWJ1dGVzW2xdO1xuICAgICAgICB2YXIgX2F0dHIgPSBhdHRyLFxuICAgICAgICAgICAgbmFtZSA9IF9hdHRyLm5hbWUsXG4gICAgICAgICAgICBuYW1lc3BhY2VVUkkgPSBfYXR0ci5uYW1lc3BhY2VVUkk7XG5cbiAgICAgICAgdmFsdWUgPSBzdHJpbmdUcmltKGF0dHIudmFsdWUpO1xuICAgICAgICBsY05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShuYW1lKTtcblxuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIGhvb2tFdmVudC5hdHRyTmFtZSA9IGxjTmFtZTtcbiAgICAgICAgaG9va0V2ZW50LmF0dHJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBob29rRXZlbnQua2VlcEF0dHIgPSB0cnVlO1xuICAgICAgICBob29rRXZlbnQuZm9yY2VLZWVwQXR0ciA9IHVuZGVmaW5lZDsgLy8gQWxsb3dzIGRldmVsb3BlcnMgdG8gc2VlIHRoaXMgaXMgYSBwcm9wZXJ0eSB0aGV5IGNhbiBzZXRcbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVBdHRyaWJ1dGUnLCBjdXJyZW50Tm9kZSwgaG9va0V2ZW50KTtcbiAgICAgICAgdmFsdWUgPSBob29rRXZlbnQuYXR0clZhbHVlO1xuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmUgYXR0cmlidXRlICovXG4gICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoIWhvb2tFdmVudC5rZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogV29yayBhcm91bmQgYSBzZWN1cml0eSBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgICAgIGlmIChyZWdFeHBUZXN0KC9cXC8+L2ksIHZhbHVlKSkge1xuICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2FuaXRpemUgYXR0cmlidXRlIGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBNVVNUQUNIRV9FWFBSJCQxLCAnICcpO1xuICAgICAgICAgIHZhbHVlID0gc3RyaW5nUmVwbGFjZSh2YWx1ZSwgRVJCX0VYUFIkJDEsICcgJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBJcyBgdmFsdWVgIHZhbGlkIGZvciB0aGlzIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgdmFyIGxjVGFnID0gY3VycmVudE5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCFfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEhhbmRsZSBpbnZhbGlkIGRhdGEtKiBhdHRyaWJ1dGUgc2V0IGJ5IHRyeS1jYXRjaGluZyBpdCAqL1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChuYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKiBGYWxsYmFjayB0byBzZXRBdHRyaWJ1dGUoKSBmb3IgYnJvd3Nlci11bnJlY29nbml6ZWQgbmFtZXNwYWNlcyBlLmcuIFwieC1zY2hlbWFcIi4gKi9cbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXJyYXlQb3AoRE9NUHVyaWZ5LnJlbW92ZWQpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVTaGFkb3dET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdtZW50IHRvIGl0ZXJhdGUgb3ZlciByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIHZhciBfc2FuaXRpemVTaGFkb3dET00gPSBmdW5jdGlvbiBfc2FuaXRpemVTaGFkb3dET00oZnJhZ21lbnQpIHtcbiAgICAgIHZhciBzaGFkb3dOb2RlID0gdm9pZCAwO1xuICAgICAgdmFyIHNoYWRvd0l0ZXJhdG9yID0gX2NyZWF0ZUl0ZXJhdG9yKGZyYWdtZW50KTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcblxuICAgICAgd2hpbGUgKHNoYWRvd05vZGUgPSBzaGFkb3dJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVTaGFkb3dOb2RlJywgc2hhZG93Tm9kZSwgbnVsbCk7XG5cbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKHNoYWRvd05vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBEZWVwIHNoYWRvdyBET00gZGV0ZWN0ZWQgKi9cbiAgICAgICAgaWYgKHNoYWRvd05vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oc2hhZG93Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKHNoYWRvd05vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNhbml0aXplXG4gICAgICogUHVibGljIG1ldGhvZCBwcm92aWRpbmcgY29yZSBzYW5pdGF0aW9uIGZ1bmN0aW9uYWxpdHlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE5vZGV9IGRpcnR5IHN0cmluZyBvciBET00gbm9kZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgRE9NUHVyaWZ5LnNhbml0aXplID0gZnVuY3Rpb24gKGRpcnR5LCBjZmcpIHtcbiAgICAgIHZhciBib2R5ID0gdm9pZCAwO1xuICAgICAgdmFyIGltcG9ydGVkTm9kZSA9IHZvaWQgMDtcbiAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHZvaWQgMDtcbiAgICAgIHZhciBvbGROb2RlID0gdm9pZCAwO1xuICAgICAgdmFyIHJldHVybk5vZGUgPSB2b2lkIDA7XG4gICAgICAvKiBNYWtlIHN1cmUgd2UgaGF2ZSBhIHN0cmluZyB0byBzYW5pdGl6ZS5cbiAgICAgICAgRE8gTk9UIHJldHVybiBlYXJseSwgYXMgdGhpcyB3aWxsIHJldHVybiB0aGUgd3JvbmcgdHlwZSBpZlxuICAgICAgICB0aGUgdXNlciBoYXMgcmVxdWVzdGVkIGEgRE9NIG9iamVjdCByYXRoZXIgdGhhbiBhIHN0cmluZyAqL1xuICAgICAgaWYgKCFkaXJ0eSkge1xuICAgICAgICBkaXJ0eSA9ICc8IS0tPic7XG4gICAgICB9XG5cbiAgICAgIC8qIFN0cmluZ2lmeSwgaW4gY2FzZSBkaXJ0eSBpcyBhbiBvYmplY3QgKi9cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnICYmICFfaXNOb2RlKGRpcnR5KSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVnYXRlZC1jb25kaXRpb25cbiAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgndG9TdHJpbmcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXJ0eSA9IGRpcnR5LnRvU3RyaW5nKCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnZGlydHkgaXMgbm90IGEgc3RyaW5nLCBhYm9ydGluZycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayB3ZSBjYW4gcnVuLiBPdGhlcndpc2UgZmFsbCBiYWNrIG9yIGlnbm9yZSAqL1xuICAgICAgaWYgKCFET01QdXJpZnkuaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgaWYgKF90eXBlb2Yod2luZG93LnRvU3RhdGljSFRNTCkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB3aW5kb3cudG9TdGF0aWNIVE1MID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cudG9TdGF0aWNIVE1MKGRpcnR5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2lzTm9kZShkaXJ0eSkpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cudG9TdGF0aWNIVE1MKGRpcnR5Lm91dGVySFRNTCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpcnR5O1xuICAgICAgfVxuXG4gICAgICAvKiBBc3NpZ24gY29uZmlnIHZhcnMgKi9cbiAgICAgIGlmICghU0VUX0NPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIH1cblxuICAgICAgLyogQ2xlYW4gdXAgcmVtb3ZlZCBlbGVtZW50cyAqL1xuICAgICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcblxuICAgICAgLyogQ2hlY2sgaWYgZGlydHkgaXMgY29ycmVjdGx5IHR5cGVkIGZvciBJTl9QTEFDRSAqL1xuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgSU5fUExBQ0UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKElOX1BMQUNFKSA7IGVsc2UgaWYgKGRpcnR5IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAvKiBJZiBkaXJ0eSBpcyBhIERPTSBlbGVtZW50LCBhcHBlbmQgdG8gYW4gZW1wdHkgZG9jdW1lbnQgdG8gYXZvaWRcbiAgICAgICAgICAgZWxlbWVudHMgYmVpbmcgc3RyaXBwZWQgYnkgdGhlIHBhcnNlciAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudCgnPCEtLS0tPicpO1xuICAgICAgICBpbXBvcnRlZE5vZGUgPSBib2R5Lm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShkaXJ0eSwgdHJ1ZSk7XG4gICAgICAgIGlmIChpbXBvcnRlZE5vZGUubm9kZVR5cGUgPT09IDEgJiYgaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAvKiBOb2RlIGlzIGFscmVhZHkgYSBib2R5LCB1c2UgYXMgaXMgKi9cbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2UgaWYgKGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgYm9keSA9IGltcG9ydGVkTm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItbm9kZS1hcHBlbmRcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGltcG9ydGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIEV4aXQgZGlyZWN0bHkgaWYgd2UgaGF2ZSBub3RoaW5nIHRvIGRvICovXG4gICAgICAgIGlmICghUkVUVVJOX0RPTSAmJiAhU0FGRV9GT1JfVEVNUExBVEVTICYmICFXSE9MRV9ET0NVTUVOVCAmJlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICAgICAgZGlydHkuaW5kZXhPZignPCcpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSW5pdGlhbGl6ZSB0aGUgZG9jdW1lbnQgdG8gd29yayBvbiAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudChkaXJ0eSk7XG5cbiAgICAgICAgLyogQ2hlY2sgd2UgaGF2ZSBhIERPTSBub2RlIGZyb20gdGhlIGRhdGEgKi9cbiAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIFJFVFVSTl9ET00gPyBudWxsIDogZW1wdHlIVE1MO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBmaXJzdCBlbGVtZW50IG5vZGUgKG91cnMpIGlmIEZPUkNFX0JPRFkgaXMgc2V0ICovXG4gICAgICBpZiAoYm9keSAmJiBGT1JDRV9CT0RZKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvKiBHZXQgbm9kZSBpdGVyYXRvciAqL1xuICAgICAgdmFyIG5vZGVJdGVyYXRvciA9IF9jcmVhdGVJdGVyYXRvcihJTl9QTEFDRSA/IGRpcnR5IDogYm9keSk7XG5cbiAgICAgIC8qIE5vdyBzdGFydCBpdGVyYXRpbmcgb3ZlciB0aGUgY3JlYXRlZCBkb2N1bWVudCAqL1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogRml4IElFJ3Mgc3RyYW5nZSBiZWhhdmlvciB3aXRoIG1hbmlwdWxhdGVkIHRleHROb2RlcyAjODkgKi9cbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAzICYmIGN1cnJlbnROb2RlID09PSBvbGROb2RlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTYW5pdGl6ZSB0YWdzIGFuZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoX3Nhbml0aXplRWxlbWVudHMoY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTaGFkb3cgRE9NIGRldGVjdGVkLCBzYW5pdGl6ZSBpdCAqL1xuICAgICAgICBpZiAoY3VycmVudE5vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oY3VycmVudE5vZGUuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzLCBzYW5pdGl6ZSBpZiBuZWNlc3NhcnkgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgb2xkTm9kZSA9IGN1cnJlbnROb2RlO1xuICAgICAgfVxuXG4gICAgICBvbGROb2RlID0gbnVsbDtcblxuICAgICAgLyogSWYgd2Ugc2FuaXRpemVkIGBkaXJ0eWAgaW4tcGxhY2UsIHJldHVybiBpdC4gKi9cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBzYW5pdGl6ZWQgc3RyaW5nIG9yIERPTSAqL1xuICAgICAgaWYgKFJFVFVSTl9ET00pIHtcbiAgICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgICByZXR1cm5Ob2RlID0gY3JlYXRlRG9jdW1lbnRGcmFnbWVudC5jYWxsKGJvZHkub3duZXJEb2N1bWVudCk7XG5cbiAgICAgICAgICB3aGlsZSAoYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItbm9kZS1hcHBlbmRcbiAgICAgICAgICAgIHJldHVybk5vZGUuYXBwZW5kQ2hpbGQoYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGJvZHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoUkVUVVJOX0RPTV9JTVBPUlQpIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgQWRvcHROb2RlKCkgaXMgbm90IHVzZWQgYmVjYXVzZSBpbnRlcm5hbCBzdGF0ZSBpcyBub3QgcmVzZXRcbiAgICAgICAgICAgIChlLmcuIHRoZSBwYXN0IG5hbWVzIG1hcCBvZiBhIEhUTUxGb3JtRWxlbWVudCksIHRoaXMgaXMgc2FmZVxuICAgICAgICAgICAgaW4gdGhlb3J5IGJ1dCB3ZSB3b3VsZCByYXRoZXIgbm90IHJpc2sgYW5vdGhlciBhdHRhY2sgdmVjdG9yLlxuICAgICAgICAgICAgVGhlIHN0YXRlIHRoYXQgaXMgY2xvbmVkIGJ5IGltcG9ydE5vZGUoKSBpcyBleHBsaWNpdGx5IGRlZmluZWRcbiAgICAgICAgICAgIGJ5IHRoZSBzcGVjcy5cbiAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybk5vZGUgPSBpbXBvcnROb2RlLmNhbGwob3JpZ2luYWxEb2N1bWVudCwgcmV0dXJuTm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuTm9kZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlcmlhbGl6ZWRIVE1MID0gV0hPTEVfRE9DVU1FTlQgPyBib2R5Lm91dGVySFRNTCA6IGJvZHkuaW5uZXJIVE1MO1xuXG4gICAgICAvKiBTYW5pdGl6ZSBmaW5hbCBzdHJpbmcgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIE1VU1RBQ0hFX0VYUFIkJDEsICcgJyk7XG4gICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gc3RyaW5nUmVwbGFjZShzZXJpYWxpemVkSFRNTCwgRVJCX0VYUFIkJDEsICcgJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHNlcmlhbGl6ZWRIVE1MKSA6IHNlcmlhbGl6ZWRIVE1MO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHNldCB0aGUgY29uZmlndXJhdGlvbiBvbmNlXG4gICAgICogc2V0Q29uZmlnXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnNldENvbmZpZyA9IGZ1bmN0aW9uIChjZmcpIHtcbiAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgU0VUX0NPTkZJRyA9IHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIHRoZSBjb25maWd1cmF0aW9uXG4gICAgICogY2xlYXJDb25maWdcbiAgICAgKlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5jbGVhckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIENPTkZJRyA9IG51bGw7XG4gICAgICBTRVRfQ09ORklHID0gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gY2hlY2sgaWYgYW4gYXR0cmlidXRlIHZhbHVlIGlzIHZhbGlkLlxuICAgICAqIFVzZXMgbGFzdCBzZXQgY29uZmlnLCBpZiBhbnkuIE90aGVyd2lzZSwgdXNlcyBjb25maWcgZGVmYXVsdHMuXG4gICAgICogaXNWYWxpZEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB0YWcgVGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZC4gT3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gKHRhZywgYXR0ciwgdmFsdWUpIHtcbiAgICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cbiAgICAgIGlmICghQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyh7fSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBsY1RhZyA9IHN0cmluZ1RvTG93ZXJDYXNlKHRhZyk7XG4gICAgICB2YXIgbGNOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UoYXR0cik7XG4gICAgICByZXR1cm4gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byBhZGQgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gYWRkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va0Z1bmN0aW9uIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgKi9cbiAgICBET01QdXJpZnkuYWRkSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50LCBob29rRnVuY3Rpb24pIHtcbiAgICAgIGlmICh0eXBlb2YgaG9va0Z1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBob29rc1tlbnRyeVBvaW50XSB8fCBbXTtcbiAgICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGEgRE9NUHVyaWZ5IGhvb2sgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICogKHBvcHMgaXQgZnJvbSB0aGUgc3RhY2sgb2YgaG9va3MgaWYgbW9yZSBhcmUgcHJlc2VudClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgYXJyYXlQb3AoaG9va3NbZW50cnlQb2ludF0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3MgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rcyB0byByZW1vdmVcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9va3MgPSBmdW5jdGlvbiAoZW50cnlQb2ludCkge1xuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gW107XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUFsbEhvb2tzXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYWxsIERPTVB1cmlmeSBob29rc1xuICAgICAqXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUFsbEhvb2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgaG9va3MgPSB7fTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgfVxuXG4gIHZhciBwdXJpZnkgPSBjcmVhdGVET01QdXJpZnkoKTtcblxuICByZXR1cm4gcHVyaWZ5O1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdXJpZnkuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xucmVxdWlyZShcIndlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0c1wiKTtcbmNvbnN0IHdlYmV4dF9wZXJtaXNzaW9uX3RvZ2dsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHQtcGVybWlzc2lvbi10b2dnbGVcIikpO1xuY29uc3QgYW5hbHl0aWNzXzEgPSByZXF1aXJlKFwiLi91dGlscy9hbmFseXRpY3NcIik7XG5jb25zdCBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2NvbnN0YW50c1wiKTtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vdXRpbHMvZG9tXCIpO1xuY29uc3QgbG9nZ2VyXzEgPSByZXF1aXJlKFwiLi91dGlscy9sb2dnZXJcIik7XG5jb25zdCBub3RpZmljYXRpb25zXzEgPSByZXF1aXJlKFwiLi91dGlscy9ub3RpZmljYXRpb25zXCIpO1xudmFyIGFzc2lnbm1lbnROb3RpZmljYXRpb25VcmwgPSBcImh0dHBzOi8vYXBwLnNjaG9vbG9neS5jb20vaG9tZS9ub3RpZmljYXRpb25zP2ZpbHRlcj1hbGxcIjtcbnZhciBkZWZhdWx0RG9tYWluID0gXCJhcHAuc2Nob29sb2d5LmNvbVwiO1xuY29uc3QgT0ZGU0NSRUVOX0RPQ1VNRU5UX1BBVEggPSBcIi9vZmZzY3JlZW4uaHRtbFwiO1xuZnVuY3Rpb24gbG9hZCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAoMCwgd2ViZXh0X3Blcm1pc3Npb25fdG9nZ2xlXzEuZGVmYXVsdCkoeyByZWxvYWRPblN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKG9uSW5zdGFsbGVkKTtcbiAgICAgICAgY2hyb21lLmFsYXJtcy5vbkFsYXJtLmFkZExpc3RlbmVyKG9uQWxhcm0pO1xuICAgICAgICBsZXQgcyA9IHlpZWxkIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHsgZGVmYXVsdERvbWFpbjogXCJhcHAuc2Nob29sb2d5LmNvbVwiIH0pO1xuICAgICAgICBkZWZhdWx0RG9tYWluID0gcy5kZWZhdWx0RG9tYWluO1xuICAgICAgICBhc3NpZ25tZW50Tm90aWZpY2F0aW9uVXJsID0gYGh0dHBzOi8vJHtkZWZhdWx0RG9tYWlufS9ob21lL25vdGlmaWNhdGlvbnM/ZmlsdGVyPWFsbGA7XG4gICAgICAgIC8vIFRPRE86IERvbWFpbiBwZXJtaXNzaW9ucyB0b2dnbGUgbmVlZHMgdG8gYmUgYWRkZWRcbiAgICAgICAgLy8gYWRkRG9tYWluUGVybWlzc2lvblRvZ2dsZSgpO1xuICAgICAgICAvL1J1biBvbmNlIG9uIGxvYWRcbiAgICAgICAgb25BbGFybSh7IG5hbWU6IFwibm90aWZpY2F0aW9uXCIsIHNjaGVkdWxlZFRpbWU6IERhdGUubm93KCkgfSk7XG4gICAgICAgIGNocm9tZS5hbGFybXMuZ2V0KFwibm90aWZpY2F0aW9uXCIsIGZ1bmN0aW9uIChhbGFybSkge1xuICAgICAgICAgICAgaWYgKGFsYXJtKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIkFsYXJtIGlzIGFscmVhZHkgcmVnaXN0ZXJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJOb3RpZmljYXRpb25zIGFsYXJtIGlzIG5vdCByZWdpc3RlcmVkOyByZWdpc3RlcmluZy4uLlwiKTtcbiAgICAgICAgICAgICAgICBjaHJvbWUuYWxhcm1zLmNyZWF0ZShcIm5vdGlmaWNhdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHBlcmlvZEluTWludXRlczogNSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNocm9tZS5ub3RpZmljYXRpb25zLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihvbk5vdGlmaWNhdGlvbkNsaWNrZWQpO1xuICAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFsyMTcsIDAsIDAsIDI1NV0gfSk7XG4gICAgICAgIGNocm9tZS5hY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKG9uQWN0aW9uQ2xpY2tlZCk7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihvbk1lc3NhZ2UpO1xuICAgICAgICBjaHJvbWUuY29udGV4dE1lbnVzLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihvbkNvbnRleHRNZW51Q2xpY2tlZCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBvbkFjdGlvbkNsaWNrZWQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIkJyb3dzZXIgYWN0aW9uIGNsaWNrZWRcIik7XG4gICAgICAgIGxldCBiYWRnZVRleHQgPSB5aWVsZCBjaHJvbWUuYWN0aW9uLmdldEJhZGdlVGV4dCh7fSk7XG4gICAgICAgIGxldCBuID0gTnVtYmVyLnBhcnNlSW50KGJhZGdlVGV4dCk7XG4gICAgICAgIHRyYWNrQW5hbHl0aWNzRXZlbnQoXCJidXR0b25fY2xpY2tcIiwge1xuICAgICAgICAgICAgaWQ6IFwibWFpbi1icm93c2VyLWFjdGlvbi1idXR0b25cIixcbiAgICAgICAgICAgIGNvbnRleHQ6IFwiQnJvd3NlciBBY3Rpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiBTdHJpbmcobiB8fCAwKSxcbiAgICAgICAgICAgIGxlZ2FjeVRhcmdldDogXCJCcm93c2VyIEFjdGlvblwiLFxuICAgICAgICAgICAgbGVnYWN5QWN0aW9uOiBuID8gYGJyb3dzZXIgYWN0aW9uIGNsaWNrZWQ6ICR7bn1gIDogXCJicm93c2VyIGFjdGlvbiBjbGlja2VkOiAwXCIsXG4gICAgICAgICAgICBsZWdhY3lMYWJlbDogXCJOb3RpZmljYXRpb25zXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKGBCcm93c2VyIGFjdGlvbiB0ZXh0OiBcIiR7YmFkZ2VUZXh0fVwiYCk7XG4gICAgICAgIGlmIChuKVxuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBgaHR0cHM6Ly8ke2RlZmF1bHREb21haW59L2hvbWUvbm90aWZpY2F0aW9uc2AgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogYGh0dHBzOi8vJHtkZWZhdWx0RG9tYWlufWAgfSk7XG4gICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogXCJcIiB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG9uTm90aWZpY2F0aW9uQ2xpY2tlZChpZCkge1xuICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJOb3RpZmljYXRpb24gY2xpY2tlZFwiKTtcbiAgICB0cmFja0FuYWx5dGljc0V2ZW50KFwicGVyZm9ybV9hY3Rpb25cIiwge1xuICAgICAgICBpZDogXCJjbGlja1wiLFxuICAgICAgICBjb250ZXh0OiBcIk5vdGlmaWNhdGlvbnNcIixcbiAgICAgICAgdmFsdWU6IGlkLFxuICAgICAgICBsZWdhY3lUYXJnZXQ6IGlkLFxuICAgICAgICBsZWdhY3lBY3Rpb246IFwibm90aWZpY2F0aW9uIGNsaWNrXCIsXG4gICAgICAgIGxlZ2FjeUxhYmVsOiBcIk5vdGlmaWNhdGlvbnNcIixcbiAgICB9KTtcbiAgICBjaHJvbWUubm90aWZpY2F0aW9ucy5jbGVhcihpZCk7XG4gICAgc3dpdGNoIChpZCkge1xuICAgICAgICBjYXNlIFwiYXNzaWdubWVudFwiOlxuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBgaHR0cHM6Ly8ke2RlZmF1bHREb21haW59L2hvbWUvbm90aWZpY2F0aW9uc2AgfSk7XG4gICAgICAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IFwiXCIgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogYGh0dHBzOi8vJHtkZWZhdWx0RG9tYWlufWAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5mdW5jdGlvbiBvbkFsYXJtKGFsYXJtKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgbGV0IHN0b3JhZ2VDb250ZW50ID0geWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQobnVsbCk7XG4gICAgICAgIGlmIChhbGFybSAmJiBhbGFybS5uYW1lID09PSBcIm5vdGlmaWNhdGlvblwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coYFske25ldyBEYXRlKCl9XSBDaGVja2luZyBmb3IgbmV3IG5vdGlmaWNhdGlvbnNgKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyAhPSBcImRpc2FibGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JOb3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmVycm9yKFwiRXJyb3IgY2F1Z2h0OlwiKTtcbiAgICAgICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBvbkluc3RhbGxlZChkZXRhaWxzKSB7XG4gICAgdHJhY2tBbmFseXRpY3NFdmVudChcInBlcmZvcm1fYWN0aW9uXCIsIHtcbiAgICAgICAgaWQ6IFwicnVudGltZV9vbmluc3RhbGxlZFwiLFxuICAgICAgICB2YWx1ZTogZGV0YWlscy5yZWFzb24sXG4gICAgICAgIGNvbnRleHQ6IFwiVmVyc2lvbnNcIixcbiAgICAgICAgbGVnYWN5VGFyZ2V0OiBcIlJ1bnRpbWUgb25JbnN0YWxsZWRcIixcbiAgICAgICAgbGVnYWN5QWN0aW9uOiBkZXRhaWxzLnJlYXNvbixcbiAgICAgICAgbGVnYWN5TGFiZWw6IFwiVmVyc2lvbnNcIixcbiAgICB9KTtcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICAgIGlkOiBcInNwbHVzLXRoZW1lLWVkaXRvclwiLFxuICAgICAgICB0aXRsZTogXCJUaGVtZSBFZGl0b3JcIixcbiAgICAgICAgY29udGV4dHM6IFtcImFjdGlvblwiXSxcbiAgICB9KTtcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICAgIGlkOiBcInNwbHVzLWRpc2NvcmRcIixcbiAgICAgICAgdGl0bGU6IFwiRGlzY29yZCBTdXBwb3J0IFNlcnZlclwiLFxuICAgICAgICBjb250ZXh0czogW1wiYWN0aW9uXCJdLFxuICAgIH0pO1xuICAgIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICAgICAgaWQ6IFwic3BsdXMtd2Vic2l0ZVwiLFxuICAgICAgICB0aXRsZTogYCR7Y29uc3RhbnRzXzEuRVhURU5TSU9OX05BTUV9IFdlYnNpdGVgLFxuICAgICAgICBjb250ZXh0czogW1wiYWN0aW9uXCJdLFxuICAgIH0pO1xufVxuZnVuY3Rpb24gb25Db250ZXh0TWVudUNsaWNrZWQoaW5mbywgdGFiKSB7XG4gICAgc3dpdGNoIChpbmZvLm1lbnVJdGVtSWQpIHtcbiAgICAgICAgY2FzZSBcInNwbHVzLXRoZW1lLWVkaXRvclwiOlxuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBjaHJvbWUucnVudGltZS5nZXRVUkwoXCIvdGhlbWUtZWRpdG9yLmh0bWxcIikgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNwbHVzLWRpc2NvcmRcIjpcbiAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogY29uc3RhbnRzXzEuRElTQ09SRF9VUkwgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNwbHVzLXdlYnNpdGVcIjpcbiAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdXJsOiBgJHtjb25zdGFudHNfMS5FWFRFTlNJT05fV0VCU0lURX0vP3V0bV9zb3VyY2U9ZXh0LWNvbnRleHQtbWVudSZ1dG1fY29udGVudD0ke2Nocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkudmVyc2lvbn1gLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5mdW5jdGlvbiBvbk1lc3NhZ2UocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiUmVjZWl2ZWQgYmFja2dyb3VuZCBwYWdlIG1lc3NhZ2VcIiwgcmVxdWVzdCk7XG4gICAgaWYgKHJlcXVlc3QudHlwZSA9PSBcIm9wZW5NZXNzYWdlc1wiIHx8IHJlcXVlc3QudHlwZSA9PSBcIm9wZW5Ccm93c2VyXCIpIHtcbiAgICAgICAgdm9pZCAoKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgdGFiID0gKF9hID0gc2VuZGVyLnRhYikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKHlpZWxkIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBsYXN0Rm9jdXNlZFdpbmRvdzogdHJ1ZSB9KSlbMF07XG4gICAgICAgICAgICBpZiAoISh0YWIgPT09IG51bGwgfHwgdGFiID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0YWIuaWQpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYi5pZCwge1xuICAgICAgICAgICAgICAgIHR5cGU6IHJlcXVlc3QudHlwZSA9PSBcIm9wZW5NZXNzYWdlc1wiID8gXCJvcGVuTWVzc2FnZXNJblNjaG9vbG9neVwiIDogXCJvcGVuQnJvd3NlckluU2Nob29sb2d5XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpKCk7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXF1ZXN0LnR5cGUgPT0gXCJmZXRjaFwiICYmIHJlcXVlc3QudXJsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmRlYnVnKFwiUmVjZWl2ZWQgZmV0Y2ggcmVxdWVzdCBmb3IgXCIgKyByZXF1ZXN0LnVybCk7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCBmaW5hbFJlc3BvbnNlID0ge307XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlT2JqO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlT2JqID0geWllbGQgZmV0Y2gocmVxdWVzdC51cmwsIHJlcXVlc3QucGFyYW1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2UuZXJyb3IgPSBlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluYWxSZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLmhlYWRlcnMgPSByZXNwb25zZU9iai5oZWFkZXJzO1xuICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2Uub2sgPSByZXNwb25zZU9iai5vaztcbiAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLnJlZGlyZWN0ZWQgPSByZXNwb25zZU9iai5yZWRpcmVjdGVkO1xuICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2Uuc3RhdHVzID0gcmVzcG9uc2VPYmouc3RhdHVzO1xuICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2Uuc3RhdHVzVGV4dCA9IHJlc3BvbnNlT2JqLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS50eXBlID0gcmVzcG9uc2VPYmoudHlwZTtcbiAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLnVybCA9IHJlc3BvbnNlT2JqLnVybDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlcXVlc3QuYm9keVJlYWRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwianNvblwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2UuanNvbiA9IHlpZWxkIHJlc3BvbnNlT2JqLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS50ZXh0ID0geWllbGQgcmVzcG9uc2VPYmoudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2UuYm9keVJlYWRFcnJvciA9IGUgfHwgdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsUmVzcG9uc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKVxuICAgICAgICAgICAgLnRoZW4oeCA9PiBzZW5kUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeCkpKVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBzZW5kUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVyciB9KSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVxdWVzdC50eXBlID09IFwidXBkYXRlRGVmYXVsdERvbWFpblwiICYmIHJlcXVlc3QuZG9tYWluICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVmYXVsdERvbWFpbiA9IHJlcXVlc3QuZG9tYWluO1xuICAgICAgICBhc3NpZ25tZW50Tm90aWZpY2F0aW9uVXJsID0gYGh0dHBzOi8vJHtkZWZhdWx0RG9tYWlufS9ob21lL25vdGlmaWNhdGlvbnM/ZmlsdGVyPWFsbGA7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXF1ZXN0LnR5cGUgPT0gXCJzZXRCYWRnZVRleHRcIiAmJiByZXF1ZXN0LnRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiByZXF1ZXN0LnRleHQgfSk7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXF1ZXN0LnR5cGUgPT0gXCJub3RpZmljYXRpb25cIikge1xuICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnVwZGF0ZUxhc3RUaW1lKShyZXF1ZXN0LmRhdGEudGltZU1vZGlmaWVkLCByZXF1ZXN0LmRhdGEubGFzdFRpbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zZW5kTm90aWZpY2F0aW9uKShyZXF1ZXN0LmRhdGEubm90aWZpY2F0aW9uLCByZXF1ZXN0LmRhdGEubmFtZSwgcmVxdWVzdC5kYXRhLmNvdW50KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVxdWVzdC50eXBlID09IFwiZGVjbGFyYXRpdmVOZXRSZXF1ZXN0UnVsZXNldFwiKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gXCJlbmFibGVcIikge1xuICAgICAgICAgICAgY2hyb21lLmRlY2xhcmF0aXZlTmV0UmVxdWVzdFxuICAgICAgICAgICAgICAgIC51cGRhdGVFbmFibGVkUnVsZXNldHMoe1xuICAgICAgICAgICAgICAgIGVuYWJsZVJ1bGVzZXRJZHM6IFtyZXF1ZXN0LnJ1bGVzZXRJZF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlcXVlc3QuYWN0aW9uID09PSBcImRpc2FibGVcIikge1xuICAgICAgICAgICAgY2hyb21lLmRlY2xhcmF0aXZlTmV0UmVxdWVzdFxuICAgICAgICAgICAgICAgIC51cGRhdGVFbmFibGVkUnVsZXNldHMoe1xuICAgICAgICAgICAgICAgIGRpc2FibGVSdWxlc2V0SWRzOiBbcmVxdWVzdC5ydWxlc2V0SWRdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGNoZWNrRm9yTm90aWZpY2F0aW9ucygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBsZXQgc3RvcmFnZUNvbnRlbnRzID0geWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQobnVsbCk7XG4gICAgICAgIGlmICgoMCwgZG9tXzEuZ2V0QnJvd3NlcikoKSA9PT0gXCJGaXJlZm94XCIpIHtcbiAgICAgICAgICAgIC8vIEZpcmVmb3ggZG9lc24ndCBzdXBwb3J0IHNlcnZpY2Ugd29ya2VycyBzbyBpdCBkb2Vzbid0IG5lZWQgb2Zmc2NyZWVuIGRvY3VtZW50c1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Nb3ppbGxhL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9tYW5pZmVzdC5qc29uL2JhY2tncm91bmQjYmFja2dyb3VuZF9wYWdlc1xuICAgICAgICAgICAgbGV0IHsgbm90aWZpY2F0aW9uLCBuYW1lLCBjb3VudCwgbGFzdFRpbWUsIHRpbWVNb2RpZmllZCB9ID0geWllbGQgKDAsIG5vdGlmaWNhdGlvbnNfMS5sb2FkQXNzaWdubWVudE5vdGlmaWNhdGlvbnMpKGFzc2lnbm1lbnROb3RpZmljYXRpb25VcmwsIChfYSA9IHN0b3JhZ2VDb250ZW50cy5sYXN0VGltZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMCk7XG4gICAgICAgICAgICB5aWVsZCAoMCwgbm90aWZpY2F0aW9uc18xLnVwZGF0ZUxhc3RUaW1lKSh0aW1lTW9kaWZpZWQsIGxhc3RUaW1lKTtcbiAgICAgICAgICAgIHlpZWxkICgwLCBub3RpZmljYXRpb25zXzEuc2VuZE5vdGlmaWNhdGlvbikobm90aWZpY2F0aW9uLCBuYW1lLCBjb3VudCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG8gYmVsb3cgb25seSBpbiBDaHJvbWVcbiAgICAgICAgLy8gQ3JlYXRlIGFuIG9mZnNjcmVlbiBkb2N1bWVudCBpZiBvbmUgZG9lc24ndCBleGlzdCB5ZXRcbiAgICAgICAgeWllbGQgY3JlYXRlT2Zmc2NyZWVuRG9jdW1lbnQoKTtcbiAgICAgICAgLy8gTm93IHRoYXQgd2UgaGF2ZSBhbiBvZmZzY3JlZW4gZG9jdW1lbnQsIHdlIGNhbiBkaXNwYXRjaCB0aGVcbiAgICAgICAgLy8gbWVzc2FnZS5cbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogXCJvZmZzY3JlZW4tbm90aWZpY2F0aW9uc1wiLFxuICAgICAgICAgICAgdGFyZ2V0OiBcIm9mZnNjcmVlblwiLFxuICAgICAgICAgICAgZGF0YTogeyB1cmw6IGFzc2lnbm1lbnROb3RpZmljYXRpb25VcmwsIGxhc3RUaW1lOiAoX2IgPSBzdG9yYWdlQ29udGVudHMubGFzdFRpbWUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDAgfSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVPZmZzY3JlZW5Eb2N1bWVudCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCEoeWllbGQgaGFzT2Zmc2NyZWVuRG9jdW1lbnQoKSkpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBjaHJvbWUub2Zmc2NyZWVuLmNyZWF0ZURvY3VtZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBPRkZTQ1JFRU5fRE9DVU1FTlRfUEFUSCxcbiAgICAgICAgICAgICAgICAgICAgcmVhc29uczogW2Nocm9tZS5vZmZzY3JlZW4uUmVhc29uLkRPTV9QQVJTRVJdLFxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZpY2F0aW9uOiBcIlBhcnNlIFNjaG9vbG9neSBub3RpZmljYXRpb25zIGluIEhUTUwgZm9ybWF0XCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci53YXJuKFwiRXJyb3IgY3JlYXRpbmcgb2Zmc2NyZWVuIGRvY3VtZW50LCBpdCBwcm9iYWJseSBhbHJlYWR5IGV4aXN0c1wiLCBlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaGFzT2Zmc2NyZWVuRG9jdW1lbnQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gQ2hlY2sgYWxsIHdpbmRvd3MgY29udHJvbGxlZCBieSB0aGUgc2VydmljZSB3b3JrZXIgaWYgb25lIG9mIHRoZW0gaXMgdGhlIG9mZnNjcmVlbiBkb2N1bWVudFxuICAgICAgICBjb25zdCBtYXRjaGVkQ2xpZW50cyA9IHlpZWxkIGNsaWVudHMubWF0Y2hBbGwoKTtcbiAgICAgICAgZm9yIChjb25zdCBjbGllbnQgb2YgbWF0Y2hlZENsaWVudHMpIHtcbiAgICAgICAgICAgIGlmIChjbGllbnQudXJsLmVuZHNXaXRoKE9GRlNDUkVFTl9ET0NVTUVOVF9QQVRIKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHRyYWNrQW5hbHl0aWNzRXZlbnQobmFtZSwgcHJvcHMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB5aWVsZCBjcmVhdGVPZmZzY3JlZW5Eb2N1bWVudCgpO1xuICAgICAgICBsZXQgc3RvcmFnZUNvbnRlbnRzID0geWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQobnVsbCk7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6IFwib2Zmc2NyZWVuLWFuYWx5dGljc1wiLFxuICAgICAgICAgICAgdGFyZ2V0OiBcIm9mZnNjcmVlblwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgcHJvcHMsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzOiBzdG9yYWdlQ29udGVudHMuYW5hbHl0aWNzLFxuICAgICAgICAgICAgICAgICAgICB0aGVtZTogc3RvcmFnZUNvbnRlbnRzLnRoZW1lLFxuICAgICAgICAgICAgICAgICAgICBiZXRhOiBzdG9yYWdlQ29udGVudHMuYmV0YSxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS52ZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICBuZXdWZXJzaW9uOiBzdG9yYWdlQ29udGVudHMubmV3VmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tVXNlcklkOiAoMCwgYW5hbHl0aWNzXzEuZ2V0QW5hbHl0aWNzVXNlcklkKSgpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmxvYWQoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVBbmFseXRpY3MgPSBleHBvcnRzLmdldEFuYWx5dGljc1VzZXJJZCA9IGV4cG9ydHMudHJhY2tFdmVudCA9IHZvaWQgMDtcbi8qKlxuICogVHJhY2tzIGFuIGV2ZW50IHVzaW5nIEdvb2dsZSBBbmFseXRpY3MgaWYgdGhlIHVzZXIgZGlkIG5vdCBvcHQgb3V0XG4gKiBOT1RFOiBUaGUgRmlyZWZveCB2ZXJzaW9uIG9mIHRoZSBleHRlbnNpb24gaGFzIG5vIHN1cHBvcnQgZm9yIEdvb2dsZSBBbmFseXRpY3NcbiAqL1xudmFyIHRyYWNrRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBfYSA9IHt9KSB7XG4gICAgdmFyIHsgbGVnYWN5VGFyZ2V0LCBsZWdhY3lBY3Rpb24sIGxlZ2FjeUxhYmVsID0gdW5kZWZpbmVkLCBsZWdhY3lWYWx1ZSA9IHVuZGVmaW5lZCwgaWQsIGNvbnRleHQsIHZhbHVlIH0gPSBfYSwgZXh0cmFQcm9wcyA9IF9fcmVzdChfYSwgW1wibGVnYWN5VGFyZ2V0XCIsIFwibGVnYWN5QWN0aW9uXCIsIFwibGVnYWN5TGFiZWxcIiwgXCJsZWdhY3lWYWx1ZVwiLCBcImlkXCIsIFwiY29udGV4dFwiLCBcInZhbHVlXCJdKTtcbiAgICBjb25zb2xlLmRlYnVnKFwiW1MrXSBUcmFja2luZyBkaXNhYmxlZCBieSB1c2VyXCIsIGFyZ3VtZW50cyk7XG59O1xuZXhwb3J0cy50cmFja0V2ZW50ID0gdHJhY2tFdmVudDtcbmZ1bmN0aW9uIGdldEFuYWx5dGljc1VzZXJJZCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBmdW5jdGlvbiBnZXRSYW5kb21Ub2tlbigpIHtcbiAgICAgICAgICAgIC8vIEUuZy4gOCAqIDMyID0gMjU2IGJpdHMgdG9rZW5cbiAgICAgICAgICAgIHZhciByYW5kb21Qb29sID0gbmV3IFVpbnQ4QXJyYXkoMzIpO1xuICAgICAgICAgICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhyYW5kb21Qb29sKTtcbiAgICAgICAgICAgIHZhciBoZXggPSBcIlwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5kb21Qb29sLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaGV4ICs9IHJhbmRvbVBvb2xbaV0udG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRS5nLiBkYjE4NDU4ZTI3ODJiMmI3N2UzNjc2OWM1NjllMjYzYTUzODg1YTk5NDRkZDBhODYxZTUwNjRlYWMxNmYxYVxuICAgICAgICAgICAgcmV0dXJuIGhleDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbCA9IHlpZWxkIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCh7IHJhbmRvbVVzZXJJZDogbnVsbCB9KTtcbiAgICAgICAgaWYgKCFsLnJhbmRvbVVzZXJJZCkge1xuICAgICAgICAgICAgbGV0IHJhbmRvbVVzZXJJZCA9IGdldFJhbmRvbVRva2VuKCk7XG4gICAgICAgICAgICB5aWVsZCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyByYW5kb21Vc2VySWQgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tVXNlcklkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsLnJhbmRvbVVzZXJJZDtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZ2V0QW5hbHl0aWNzVXNlcklkID0gZ2V0QW5hbHl0aWNzVXNlcklkO1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUFuYWx5dGljcyhfYSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgYXJndW1lbnRzLCB2b2lkIDAsIGZ1bmN0aW9uKiAoeyBkb2N1bWVudENvbnRleHQsIGlzQW5hbHl0aWNzRW5hYmxlZCwgc2VsZWN0ZWRUaGVtZSwgc2VsZWN0ZWRCZXRhLCBjdXJyZW50VmVyc2lvbiwgbmV3VmVyc2lvbiwgcmFuZG9tVXNlcklkLCB0aGVtZUlzTW9kZXJuLCB9KSB7XG4gICAgICAgIGlmIChpc0FuYWx5dGljc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIGVuYWJsZUFuYWx5dGljcygpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGVuYWJsZUFuYWx5dGljcygpIHtcbiAgICAgICAgICAgIC8vIEdvb2dsZSBBbmFseXRpY3MgdjRcbiAgICAgICAgICAgIGdsb2JhbFRoaXMuZGF0YUxheWVyID0gZ2xvYmFsVGhpcy5kYXRhTGF5ZXIgfHwgW107XG4gICAgICAgICAgICBmdW5jdGlvbiBndGFnKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgKF9hID0gZ2xvYmFsVGhpcy5kYXRhTGF5ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBndGFnKFwianNcIiwgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICBjb25zdCBndGFnQ29uZmlnID0ge1xuICAgICAgICAgICAgICAgIHBhZ2VfbG9jYXRpb246IGxvY2F0aW9uLmhyZWYucmVwbGFjZSgvXFwvXFxkezMsfVxcYi9nLCBcIi8qXCIpLFxuICAgICAgICAgICAgICAgIHBhZ2VfcGF0aDogbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvXFxkezMsfVxcYi9nLCBcIi8qXCIpLFxuICAgICAgICAgICAgICAgIHBhZ2VfdGl0bGU6IG51bGwsXG4gICAgICAgICAgICAgICAgdXNlcl9pZDogcmFuZG9tVXNlcklkLFxuICAgICAgICAgICAgICAgIHVzZXJfcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICB0aGVtZTogc2VsZWN0ZWRUaGVtZSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQmV0YTogc2VsZWN0ZWRCZXRhLFxuICAgICAgICAgICAgICAgICAgICBsYXN0RW5hYmxlZFZlcnNpb246IG5ld1ZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvblZlcnNpb246IGN1cnJlbnRWZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICBkb21haW46IGxvY2F0aW9uLmhvc3QsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVyblRoZW1lOiB0aGVtZUlzTW9kZXJuLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ3RhZyhcImNvbmZpZ1wiLCBcIkctWU02QjAwUkRZQ1wiLCBndGFnQ29uZmlnKTtcbiAgICAgICAgICAgIGV4cG9ydHMudHJhY2tFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIF9hID0ge30pIHtcbiAgICAgICAgICAgICAgICB2YXIgeyBsZWdhY3lUYXJnZXQsIGxlZ2FjeUFjdGlvbiwgbGVnYWN5TGFiZWwgPSB1bmRlZmluZWQsIGxlZ2FjeVZhbHVlID0gdW5kZWZpbmVkLCBpZCwgY29udGV4dCwgdmFsdWUgfSA9IF9hLCBleHRyYVByb3BzID0gX19yZXN0KF9hLCBbXCJsZWdhY3lUYXJnZXRcIiwgXCJsZWdhY3lBY3Rpb25cIiwgXCJsZWdhY3lMYWJlbFwiLCBcImxlZ2FjeVZhbHVlXCIsIFwiaWRcIiwgXCJjb250ZXh0XCIsIFwidmFsdWVcIl0pO1xuICAgICAgICAgICAgICAgIGxldCBldmVudERhdGEgPSBPYmplY3QuYXNzaWduKHsgaWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlIH0sIGV4dHJhUHJvcHMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoYFtTK10gVHJhY2tlZCBldmVudDpgLCBldmVudE5hbWUsIGV2ZW50RGF0YSk7XG4gICAgICAgICAgICAgICAgZ3RhZyhcImV2ZW50XCIsIGV2ZW50TmFtZSwgZXZlbnREYXRhKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmdW5jdGlvbiB0cmFja0NsaWNrKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFldmVudC5pc1RydXN0ZWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gKGV2ZW50LmN1cnJlbnRUYXJnZXQgfHwgZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAoMCwgZXhwb3J0cy50cmFja0V2ZW50KShcInRyYWNraW5nX2xpbmtfY2xpY2tcIiwge1xuICAgICAgICAgICAgICAgICAgICBsZWdhY3lUYXJnZXQ6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdJZCB8fCB0YXJnZXQuaWQgfHwgXCJVbmxhYmVsZWQgQnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZ2FjeUFjdGlvbjogXCJjbGlja1wiLFxuICAgICAgICAgICAgICAgICAgICBsZWdhY3lMYWJlbDogdGFyZ2V0LmRhdGFzZXQuc3BsdXNUcmFja2luZ0NvbnRleHQgfHwgXCJUcmFja2luZyBMaW5rXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZ2FjeVZhbHVlOiB0YXJnZXQuZGF0YXNldC5zcGx1c1RyYWNraW5nVmFsdWUgfHwgZXZlbnQuYnV0dG9uLFxuICAgICAgICAgICAgICAgICAgICBpZDogdGFyZ2V0LmRhdGFzZXQuc3BsdXNUcmFja2luZ0lkIHx8IHRhcmdldC5pZCB8fCBcIlVubGFiZWxlZCBCdXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogdGFyZ2V0LmRhdGFzZXQuc3BsdXNUcmFja2luZ0NvbnRleHQgfHwgXCJUcmFja2luZyBMaW5rXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0YXJnZXQuZGF0YXNldC5zcGx1c1RyYWNraW5nVmFsdWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnRDb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrZWRFbGVtZW50cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgICAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zLCBtdXRhdGlvbk9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVsZW0gb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcGx1cy10cmFjay1jbGlja3M6bm90KC5zcGx1cy10cmFja2VkKVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFja2VkRWxlbWVudHMuaGFzKGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdHJhY2tDbGljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiYXV4Y2xpY2tcIiwgdHJhY2tDbGljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKFwic3BsdXMtdHJhY2tlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFja2VkRWxlbWVudHMuYWRkKGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlYWR5U3RhdGVDaGVja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYWR5U3RhdGVDaGVja0ludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbGVtIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3BsdXMtdHJhY2stY2xpY2tzXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRyYWNrZWRFbGVtZW50cy5oYXMoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0cmFja0NsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJhdXhjbGlja1wiLCB0cmFja0NsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJzcGx1cy10cmFja2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrZWRFbGVtZW50cy5hZGQoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuaW5pdGlhbGl6ZUFuYWx5dGljcyA9IGluaXRpYWxpemVBbmFseXRpY3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuREVGQVVMVF9USEVNRV9OQU1FID0gZXhwb3J0cy5ESVNDT1JEX1VSTCA9IGV4cG9ydHMuRVhURU5TSU9OX1dFQlNJVEUgPSBleHBvcnRzLkVYVEVOU0lPTl9OQU1FID0gdm9pZCAwO1xuZXhwb3J0cy5FWFRFTlNJT05fTkFNRSA9IFwiU2Nob29sb2d5IFBsdXNcIjtcbmV4cG9ydHMuRVhURU5TSU9OX1dFQlNJVEUgPSBcImh0dHBzOi8vc2Nob29sb2d5cGwudXNcIjtcbmV4cG9ydHMuRElTQ09SRF9VUkwgPSBcImh0dHBzOi8vZGlzY29yZC5zY2hvb2xvZ3lwbC51c1wiO1xuZXhwb3J0cy5ERUZBVUxUX1RIRU1FX05BTUUgPSBleHBvcnRzLkVYVEVOU0lPTl9OQU1FO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLndhaXRGb3JFbGVtZW50ID0gZXhwb3J0cy5jcmVhdGVTdmdMb2dvID0gZXhwb3J0cy5zZXRDU1NWYXJpYWJsZSA9IGV4cG9ydHMuZ2V0UGFyZW50cyA9IGV4cG9ydHMuaXNWaXNpYmxlID0gZXhwb3J0cy5nZXRCcm93c2VyID0gZXhwb3J0cy5jcmVhdGVCdXR0b25XaXRoTG9nbyA9IGV4cG9ydHMuY3JlYXRlQnV0dG9uID0gZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gdm9pZCAwO1xuLyoqXG4gKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gQSBET00gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyAtIFRoZSBIVE1MIHRhZyBuYW1lIG9mIHRoZSB0eXBlIG9mIERPTSBlbGVtZW50IHRvIGNyZWF0ZVxuICogQHBhcmFtIHtzdHJpbmdbXX0gY2xhc3NMaXN0IC0gQ1NTIGNsYXNzZXMgdG8gYXBwbHkgdG8gdGhlIERPTSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLGFueT59IHByb3BlcnRpZXMgLSBQcm9wZXJ0aWVzIHRvIGFwcGx5IHRvIHRoZSBET00gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBjaGlsZHJlbiAtIEVsZW1lbnRzIHRvIGFwcGVuZCBhcyBjaGlsZHJlbiB0byB0aGUgY3JlYXRlZCBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc0xpc3QsIHByb3BlcnRpZXMsIGNoaWxkcmVuKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKGNsYXNzTGlzdCkge1xuICAgICAgICBmb3IgKGxldCBjIG9mIGNsYXNzTGlzdCkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGZvciAobGV0IHByb3BlcnR5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW3Byb3BlcnR5XSBpbnN0YW5jZW9mIE9iamVjdCAmJlxuICAgICAgICAgICAgICAgICEocHJvcGVydGllc1twcm9wZXJ0eV0gaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzdWJwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50W3Byb3BlcnR5XVtzdWJwcm9wZXJ0eV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XVtzdWJwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCAmJiBwcm9wZXJ0aWVzW3Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFtwcm9wZXJ0eV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbi8qKlxuICogQ3JlYXRlcyBhIFNjaG9vbG9neSBQbHVzIHRoZW1lZCBidXR0b24gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBJRCBmb3IgdGhlIGJ1dHRvbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBzaG93IG9uIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7KGU6IEV2ZW50KT0+dm9pZH0gY2FsbGJhY2sgQSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQnV0dG9uKGlkLCB0ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBbXCJzdWJtaXQtc3Bhbi13cmFwcGVyXCIsIFwic3BsdXMtbW9kYWwtYnV0dG9uXCJdLCB7IG9uY2xpY2s6IGNhbGxiYWNrIH0sIFtcbiAgICAgICAgY3JlYXRlRWxlbWVudChcImlucHV0XCIsIFtcImZvcm0tc3VibWl0XCIsIFwic3BsdXMtdHJhY2stY2xpY2tzXCJdLCB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgdmFsdWU6IHRleHQsXG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBkYXRhc2V0OiB7IHNwbHVzVHJhY2tpbmdDb250ZXh0OiBcIlMrIEJ1dHRvblwiIH0sXG4gICAgICAgIH0pLFxuICAgIF0pO1xufVxuZXhwb3J0cy5jcmVhdGVCdXR0b24gPSBjcmVhdGVCdXR0b247XG5mdW5jdGlvbiBjcmVhdGVCdXR0b25XaXRoTG9nbyhpZCwgdGV4dCwgY2FsbGJhY2spIHtcbiAgICBsZXQgYnV0dG9uID0gY3JlYXRlQnV0dG9uKGlkLCB0ZXh0LCBjYWxsYmFjayk7XG4gICAgbGV0IGltZyA9IGNyZWF0ZVN2Z0xvZ28oKTtcbiAgICBPYmplY3QuYXNzaWduKGltZy5zdHlsZSwge1xuICAgICAgICB2ZXJ0aWNhbEFsaWduOiBcIm1pZGRsZVwiLFxuICAgICAgICBwYWRkaW5nTGVmdDogXCI0cHhcIixcbiAgICAgICAgd2lkdGg6IFwiMThweFwiLFxuICAgIH0pO1xuICAgIGJ1dHRvbi5wcmVwZW5kKGltZyk7XG4gICAgYnV0dG9uLnN0eWxlLnNldFByb3BlcnR5KFwiaGVpZ2h0XCIsIFwiMzZweFwiLCBcImltcG9ydGFudFwiKTtcbiAgICBsZXQgYnV0dG9uSW5wdXQgPSBidXR0b24ucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgIGJ1dHRvbklucHV0LnN0eWxlLnBhZGRpbmdMZWZ0ID0gXCI0cHhcIjtcbiAgICBidXR0b25JbnB1dC5zdHlsZS5zZXRQcm9wZXJ0eShcImhlaWdodFwiLCBcIjM2cHhcIiwgXCJpbXBvcnRhbnRcIik7XG4gICAgYnV0dG9uLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgIHJldHVybiBidXR0b247XG59XG5leHBvcnRzLmNyZWF0ZUJ1dHRvbldpdGhMb2dvID0gY3JlYXRlQnV0dG9uV2l0aExvZ287XG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgYnJvd3NlclxuICogQHJldHVybnMge1wiQ2hyb21lXCJ8XCJGaXJlZm94XCJ8XCJPdGhlclwifSBOYW1lIG9mIHRoZSBjdXJyZW50IGJyb3dzZXJcbiAqL1xuZnVuY3Rpb24gZ2V0QnJvd3NlcigpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMuY2hyb21lICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5icm93c2VyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJGaXJlZm94XCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBMaWtlbHkgY2FwdHVyZXMgYWxsIENocm9taXVtLWJhc2VkIGJyb3dzZXJzXG4gICAgICAgICAgICByZXR1cm4gXCJDaHJvbWVcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiT3RoZXJcIjtcbiAgICB9XG59XG5leHBvcnRzLmdldEJyb3dzZXIgPSBnZXRCcm93c2VyO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbGVtZW50IGlzIHZpc2libGUgdG8gdGhlIHVzZXJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW0gVGhlIGVsZW1lbnQgdG8gY2hlY2sgZm9yIHZpc2liaWxpdHlcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgZWxlbWVudCBpcyB2aXNpYmxlXG4gKi9cbmZ1bmN0aW9uIGlzVmlzaWJsZShlbGVtKSB7XG4gICAgcmV0dXJuICEhKGVsZW0ub2Zmc2V0V2lkdGggfHwgZWxlbS5vZmZzZXRIZWlnaHQgfHwgZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59XG5leHBvcnRzLmlzVmlzaWJsZSA9IGlzVmlzaWJsZTtcbi8qKlxuICogUmV0dXJucyBhbGwgcGFyZW50IGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBwcm92aWRlZCBzZWxlY3Rvci5cbiAqIEVzc2VudGlhbGx5IHdvcmtzIGxpa2UgYSByZXZlcnNlIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsYC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW0gVGhlIHRhcmdldCBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgQSBDU1Mgc2VsZWN0b3JcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudFtdfSBBbiBhcnJheSBvZiBtYXRjaGluZyBwYXJlbnQgZWxlbWVudHNcbiAqL1xuZnVuY3Rpb24gZ2V0UGFyZW50cyhlbGVtLCBzZWxlY3Rvcikge1xuICAgIHZhciBwYXJlbnRzID0gW107XG4gICAgdmFyIGZpcnN0Q2hhcjtcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgZmlyc3RDaGFyID0gc2VsZWN0b3IuY2hhckF0KDApO1xuICAgIH1cbiAgICBmb3IgKDsgZWxlbSAmJiBlbGVtICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IGVsZW0gPSBlbGVtLnBhcmVudE5vZGUpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RDaGFyID09PSBcIi5cIikge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3Rvci5zdWJzdHIoMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudHMucHVzaChlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RDaGFyID09PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLmlkID09PSBzZWxlY3Rvci5zdWJzdHIoMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdENoYXIgPT09IFwiW1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uaGFzQXR0cmlidXRlKHNlbGVjdG9yLnN1YnN0cigxLCBzZWxlY3Rvci5sZW5ndGggLSAxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbGVtLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2goZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnRzLnB1c2goZWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhcmVudHM7XG59XG5leHBvcnRzLmdldFBhcmVudHMgPSBnZXRQYXJlbnRzO1xuLyoqXG4gKiBTZXRzIHRoZSB2YWx1ZSBvZiBhIENTUyB2YXJpYWJsZSBvbiB0aGUgZG9jdW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFZhcmlhYmxlIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgTmV3IHZhcmlhYmxlIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHNldENTU1ZhcmlhYmxlKG5hbWUsIHZhbCkge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShgLS0ke25hbWV9YCwgdmFsICE9PSBudWxsICYmIHZhbCAhPT0gdm9pZCAwID8gdmFsIDogbnVsbCk7XG59XG5leHBvcnRzLnNldENTU1ZhcmlhYmxlID0gc2V0Q1NTVmFyaWFibGU7XG5mdW5jdGlvbiBjcmVhdGVTdmdMb2dvKC4uLmNsYXNzZXMpIHtcbiAgICBsZXQgY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJjaXJjbGVcIik7XG4gICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcImN4XCIsIFwiMjUwXCIpO1xuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJjeVwiLCBcIjI1MFwiKTtcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwiclwiLCBcIjIzMFwiKTtcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJmaWxsOiBub25lOyBzdHJva2Utd2lkdGg6IDM1cHg7IHN0cm9rZTogY3VycmVudENvbG9yO1wiKTtcbiAgICBsZXQgbGluZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImxpbmVcIik7XG4gICAgbGluZTEuc2V0QXR0cmlidXRlKFwieDFcIiwgXCIyNTBcIik7XG4gICAgbGluZTEuc2V0QXR0cmlidXRlKFwieTFcIiwgXCIxMjVcIik7XG4gICAgbGluZTEuc2V0QXR0cmlidXRlKFwieDJcIiwgXCIyNTBcIik7XG4gICAgbGluZTEuc2V0QXR0cmlidXRlKFwieTJcIiwgXCIzNzVcIik7XG4gICAgbGluZTEuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJzdHJva2UtbGluZWNhcDogcm91bmQ7IHN0cm9rZS13aWR0aDogMzVweDsgc3Ryb2tlOiBjdXJyZW50Q29sb3I7XCIpO1xuICAgIGxldCBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwibGluZVwiKTtcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoXCJ4MVwiLCBcIjEyNVwiKTtcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoXCJ5MVwiLCBcIjI1MFwiKTtcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoXCJ4MlwiLCBcIjM3NVwiKTtcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoXCJ5MlwiLCBcIjI1MFwiKTtcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLXdpZHRoOiAzNXB4OyBzdHJva2U6IGN1cnJlbnRDb2xvcjtcIik7XG4gICAgbGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIFwiMCAwIDUwMCA1MDBcIik7XG4gICAgc3ZnLmFwcGVuZChjaXJjbGUsIGxpbmUxLCBsaW5lMik7XG4gICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgc3ZnLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgfVxuICAgIHJldHVybiBzdmc7XG59XG5leHBvcnRzLmNyZWF0ZVN2Z0xvZ28gPSBjcmVhdGVTdmdMb2dvO1xuZnVuY3Rpb24gd2FpdEZvckVsZW1lbnQoc2VsZWN0b3IsIGNoZWNrX2ludGVydmFsID0gNTApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNoZWNrX2ludGVydmFsKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMud2FpdEZvckVsZW1lbnQgPSB3YWl0Rm9yRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Mb2dnZXIgPSB2b2lkIDA7XG5leHBvcnRzLkxvZ2dlciA9IHtcbiAgICBsb2c6ICgoKSA9PiBjb25zb2xlLmxvZy5iaW5kKGdsb2JhbFRoaXMuY29uc29sZSwgYCVjK2AsIGNyZWF0ZUxvZ1ByZWZpeChcIiM4MUQ0RkFcIikpKSgpLFxuICAgIGVycm9yOiAoKCkgPT4gY29uc29sZS5lcnJvci5iaW5kKGdsb2JhbFRoaXMuY29uc29sZSwgYCVjK2AsIGNyZWF0ZUxvZ1ByZWZpeChcIiNGRjY5NjFcIikpKSgpLFxuICAgIGluZm86ICgoKSA9PiBjb25zb2xlLmluZm8uYmluZChnbG9iYWxUaGlzLmNvbnNvbGUsIGAlYytgLCBjcmVhdGVMb2dQcmVmaXgoXCJ3aGl0ZVwiKSkpKCksXG4gICAgd2FybjogKCgpID0+IGNvbnNvbGUud2Fybi5iaW5kKGdsb2JhbFRoaXMuY29uc29sZSwgYCVjK2AsIGNyZWF0ZUxvZ1ByZWZpeChcIiNGREZEOTZcIikpKSgpLFxuICAgIHRyYWNlOiAoKCkgPT4gY29uc29sZS50cmFjZS5iaW5kKGdsb2JhbFRoaXMuY29uc29sZSwgYCVjK2AsIGNyZWF0ZUxvZ1ByZWZpeChcIm9yYW5nZVwiKSkpKCksXG4gICAgZGVidWc6ICgoKSA9PiBjb25zb2xlLmRlYnVnLmJpbmQoZ2xvYmFsVGhpcy5jb25zb2xlLCBgJWMrYCwgY3JlYXRlTG9nUHJlZml4KFwibGlnaHRncmVlblwiKSkpKCksXG59O1xuZnVuY3Rpb24gY3JlYXRlTG9nUHJlZml4KGNvbG9yKSB7XG4gICAgcmV0dXJuIGBjb2xvcjoke2NvbG9yfTtib3JkZXI6MXB4IHNvbGlkICMyQTJBMkE7Ym9yZGVyLXJhZGl1czoxMDAlO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7cGFkZGluZzogMCA0cHggMCA0cHg7YmFja2dyb3VuZC1jb2xvcjojMkEyQTJBYDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNlbmROb3RpZmljYXRpb24gPSBleHBvcnRzLnVwZGF0ZUxhc3RUaW1lID0gZXhwb3J0cy5sb2FkQXNzaWdubWVudE5vdGlmaWNhdGlvbnMgPSB2b2lkIDA7XG5jb25zdCBkb21wdXJpZnlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiZG9tcHVyaWZ5XCIpKTtcbmNvbnN0IGFuYWx5dGljc18xID0gcmVxdWlyZShcIi4vYW5hbHl0aWNzXCIpO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCBsb2dnZXJfMSA9IHJlcXVpcmUoXCIuL2xvZ2dlclwiKTtcbmZ1bmN0aW9uIGxvYWRBc3NpZ25tZW50Tm90aWZpY2F0aW9ucyhhc3NpZ25tZW50Tm90aWZpY2F0aW9uVXJsLCBsYXN0VGltZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGFzc2lnbm1lbnROb3RpZmljYXRpb25VcmwsIHtcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgbG9hZGluZyBub3RpZmljYXRpb25zOiBcIiArIHJlc3BvbnNlKTtcbiAgICAgICAgbGV0IHJlc3BvbnNlSnNvbiA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIkxhc3QgbmV3IGdyYWRlOiBcIiArIG5ldyBEYXRlKGxhc3RUaW1lKS50b1N0cmluZygpKTtcbiAgICAgICAgbGV0IHRpbWUgPSBsYXN0VGltZTtcbiAgICAgICAgbGV0IHRpbWVNb2RpZmllZCA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRpbWUpIHtcbiAgICAgICAgICAgIHRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGltZU1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdlwiKSB8fCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gZG9tcHVyaWZ5XzEuZGVmYXVsdC5zYW5pdGl6ZShyZXNwb25zZUpzb24ub3V0cHV0KTtcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbnMgPSBkaXYucXVlcnlTZWxlY3RvckFsbChcIi5lZGdlLXNlbnRlbmNlXCIpO1xuICAgICAgICBsZXQgbW9udGhzID0gW1xuICAgICAgICAgICAgXCJKYW5cIixcbiAgICAgICAgICAgIFwiRmViXCIsXG4gICAgICAgICAgICBcIk1hclwiLFxuICAgICAgICAgICAgXCJBcHJcIixcbiAgICAgICAgICAgIFwiTWF5XCIsXG4gICAgICAgICAgICBcIkp1blwiLFxuICAgICAgICAgICAgXCJKdWxcIixcbiAgICAgICAgICAgIFwiQXVnXCIsXG4gICAgICAgICAgICBcIlNlcFwiLFxuICAgICAgICAgICAgXCJPY3RcIixcbiAgICAgICAgICAgIFwiTm92XCIsXG4gICAgICAgICAgICBcIkRlY1wiLFxuICAgICAgICBdO1xuICAgICAgICBsZXQgdG90YWxBc3NpZ25tZW50cyA9IDA7XG4gICAgICAgIGZvciAobGV0IG5vdGlmaWNhdGlvbiBvZiBBcnJheS5mcm9tKG5vdGlmaWNhdGlvbnMpLnJldmVyc2UoKSkge1xuICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi50ZXh0Q29udGVudC5pbmNsdWRlcyhcIm5ldyBncmFkZVwiKSkge1xuICAgICAgICAgICAgICAgIGxldCBhc3NpZ25tZW50cyA9IG5vdGlmaWNhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFcIik7XG4gICAgICAgICAgICAgICAgbGV0IGV4dHJhVGV4dEVsZW1lbnQgPSBub3RpZmljYXRpb24ucXVlcnlTZWxlY3RvcihcIi5vdGhlci1pdGVtcy1saW5rXCIpO1xuICAgICAgICAgICAgICAgIGxldCB0aW1lVGV4dCA9IG5vdGlmaWNhdGlvbi5xdWVyeVNlbGVjdG9yKFwiLmVkZ2UtdGltZVwiKS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBsZXQgc3BsaXREYXRlID0gdGltZVRleHQuc3BsaXQoXCIgYXQgXCIpO1xuICAgICAgICAgICAgICAgIGxldCBtb250aERheSA9IHNwbGl0RGF0ZVswXTtcbiAgICAgICAgICAgICAgICBsZXQgaG91ck1pbnV0ZSA9IHNwbGl0RGF0ZVsxXTtcbiAgICAgICAgICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBsZXQgbW9udGhEYXlZZWFyID0gbW9udGhEYXkgKyBgICR7bm93LmdldEZ1bGxZZWFyKCl9YDtcbiAgICAgICAgICAgICAgICBsZXQgdG9kYXkgPSBgJHttb250aHNbbm93LmdldE1vbnRoKCldfSAke25vdy5nZXREYXRlKCl9ICR7bm93LmdldEZ1bGxZZWFyKCl9YDtcbiAgICAgICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uRGF0ZSA9IERhdGUucGFyc2UobW9udGhEYXlZZWFyKTtcbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uRGF0ZSA+IERhdGUucGFyc2UodG9kYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbkRhdGUgPSBEYXRlLnBhcnNlKG1vbnRoRGF5ICsgYCAke25vdy5nZXRGdWxsWWVhcigpIC0gMX0gJHtob3VyTWludXRlfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uRGF0ZSA9IERhdGUucGFyc2UoYCR7bW9udGhEYXlZZWFyfSAke2hvdXJNaW51dGV9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3RpZmljYXRpb25EYXRlID4gdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aW1lID0gbm90aWZpY2F0aW9uRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgdGltZU1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxBc3NpZ25tZW50cysrO1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBuID0gbnVsbDtcbiAgICAgICAgaWYgKHRvdGFsQXNzaWdubWVudHMgPiAwKSB7XG4gICAgICAgICAgICBuID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYmFzaWNcIixcbiAgICAgICAgICAgICAgICBpY29uVXJsOiBcImltZ3MvaWNvbkAxMjgucG5nXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiTmV3IGdyYWRlIHBvc3RlZFwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke3RvdGFsQXNzaWdubWVudHN9IG5ldyBhc3NpZ25tZW50JHt0b3RhbEFzc2lnbm1lbnRzID09PSAxID8gXCIgaGFzIGEgZ3JhZGVcIiA6IFwicyBoYXZlIGdyYWRlc1wifWAsXG4gICAgICAgICAgICAgICAgZXZlbnRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIGlzQ2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uOiBuLFxuICAgICAgICAgICAgbmFtZTogXCJhc3NpZ25tZW50XCIsXG4gICAgICAgICAgICBjb3VudDogdG90YWxBc3NpZ25tZW50cyxcbiAgICAgICAgICAgIGxhc3RUaW1lOiB0aW1lLFxuICAgICAgICAgICAgdGltZU1vZGlmaWVkLFxuICAgICAgICB9O1xuICAgIH0pO1xufVxuZXhwb3J0cy5sb2FkQXNzaWdubWVudE5vdGlmaWNhdGlvbnMgPSBsb2FkQXNzaWdubWVudE5vdGlmaWNhdGlvbnM7XG5mdW5jdGlvbiB1cGRhdGVMYXN0VGltZSh0aW1lTW9kaWZpZWQsIHRpbWUpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAodGltZU1vZGlmaWVkKSB7XG4gICAgICAgICAgICB5aWVsZCBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IGxhc3RUaW1lOiB0aW1lIH0pO1xuICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIlNldCBuZXcgdGltZSBcIiArIG5ldyBEYXRlKHRpbWUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJObyBuZXcgbm90aWZpY2F0aW9uc1wiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy51cGRhdGVMYXN0VGltZSA9IHVwZGF0ZUxhc3RUaW1lO1xuLyoqXG4gKiBTZW5kcyBhIGRlc2t0b3Agbm90aWZpY2F0aW9uIGlmIHNldHRpbmdzIHBlcm1pdFxuICogQHBhcmFtIHtOb3RpZmljYXRpb25PcHRpb25zfSBub3RpZmljYXRpb24gQSBjaHJvbWUgbm90aWZpY2F0aW9uIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIG5vdGlmaWNhdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudD0xXSBUaGUgbnVtYmVyIHRvIGFkZCB0byB0aGUgYnJvd3NlciBhY3Rpb24gYmFkZ2VcbiAqL1xuZnVuY3Rpb24gc2VuZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIG5hbWUsIGNvdW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKCFub3RpZmljYXRpb24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBzdG9yYWdlQ29udGVudCA9IHlpZWxkIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KG51bGwpO1xuICAgICAgICBjb3VudCA9IGNvdW50IHx8IGNvdW50ID09IDAgPyBjb3VudCA6IDE7XG4gICAgICAgIGlmICgoMCwgZG9tXzEuZ2V0QnJvd3NlcikoKSA9PSBcIkZpcmVmb3hcIikge1xuICAgICAgICAgICAgZGVsZXRlIG5vdGlmaWNhdGlvbi5yZXF1aXJlSW50ZXJhY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIk5ldyBub3RpZmljYXRpb24hXCIsIG5vdGlmaWNhdGlvbik7XG4gICAgICAgIGlmIChjb3VudCA+IDAgJiZcbiAgICAgICAgICAgICghc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyB8fFxuICAgICAgICAgICAgICAgIHN0b3JhZ2VDb250ZW50Lm5vdGlmaWNhdGlvbnMgPT0gXCJlbmFibGVkXCIgfHxcbiAgICAgICAgICAgICAgICBzdG9yYWdlQ29udGVudC5ub3RpZmljYXRpb25zID09IFwiYmFkZ2VcIikpIHtcbiAgICAgICAgICAgIGxldCB4ID0geWllbGQgY2hyb21lLmFjdGlvbi5nZXRCYWRnZVRleHQoe30pO1xuICAgICAgICAgICAgbGV0IG51bSA9IE51bWJlci5wYXJzZUludCh4KTtcbiAgICAgICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogKG51bSA/IG51bSArIGNvdW50IDogY291bnQpLnRvU3RyaW5nKCkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiTnVtYmVyIGJhZGdlIGlzIGRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyB8fFxuICAgICAgICAgICAgc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyA9PSBcImVuYWJsZWRcIiB8fFxuICAgICAgICAgICAgc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyA9PSBcInBvcHVwXCIpIHtcbiAgICAgICAgICAgIGNocm9tZS5ub3RpZmljYXRpb25zLmNyZWF0ZShuYW1lLCBub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgKDAsIGFuYWx5dGljc18xLnRyYWNrRXZlbnQpKFwicGVyZm9ybV9hY3Rpb25cIiwge1xuICAgICAgICAgICAgICAgIGlkOiBcInNob3duXCIsXG4gICAgICAgICAgICAgICAgY29udGV4dDogXCJOb3RpZmljYXRpb25zXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgbGVnYWN5VGFyZ2V0OiBuYW1lLFxuICAgICAgICAgICAgICAgIGxlZ2FjeUFjdGlvbjogXCJzaG93blwiLFxuICAgICAgICAgICAgICAgIGxlZ2FjeUxhYmVsOiBcIk5vdGlmaWNhdGlvbnNcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIlBvcHVwIG5vdGlmaWNhdGlvbnMgYXJlIGRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLnNlbmROb3RpZmljYXRpb24gPSBzZW5kTm90aWZpY2F0aW9uO1xuIiwiaW1wb3J0IHsgaW5qZWN0Q29udGVudFNjcmlwdCB9IGZyb20gJ3dlYmV4dC1jb250ZW50LXNjcmlwdHMnO1xuaW1wb3J0IGNocm9tZVAgZnJvbSAnd2ViZXh0LXBvbHlmaWxsLWtpbmRhJztcbmltcG9ydCB7IHBhdHRlcm5Ub1JlZ2V4IH0gZnJvbSAnd2ViZXh0LXBhdHRlcm5zJztcbmNvbnN0IG5vTWF0Y2hlc0Vycm9yID0gJ1R5cGUgZXJyb3IgZm9yIHBhcmFtZXRlciBjb250ZW50U2NyaXB0T3B0aW9ucyAoRXJyb3IgcHJvY2Vzc2luZyBtYXRjaGVzOiBBcnJheSByZXF1aXJlcyBhdCBsZWFzdCAxIGl0ZW1zOyB5b3UgaGF2ZSAwKSBmb3IgY29udGVudFNjcmlwdHMucmVnaXN0ZXIuJztcbmNvbnN0IG5vUGVybWlzc2lvbkVycm9yID0gJ1Blcm1pc3Npb24gZGVuaWVkIHRvIHJlZ2lzdGVyIGEgY29udGVudCBzY3JpcHQgZm9yICc7XG5jb25zdCBnb3ROYXZpZ2F0aW9uID0gdHlwZW9mIGNocm9tZSA9PT0gJ29iamVjdCcgJiYgJ3dlYk5hdmlnYXRpb24nIGluIGNocm9tZTtcbmFzeW5jIGZ1bmN0aW9uIGlzT3JpZ2luUGVybWl0dGVkKHVybCkge1xuICAgIHJldHVybiBjaHJvbWVQLnBlcm1pc3Npb25zLmNvbnRhaW5zKHtcbiAgICAgICAgb3JpZ2luczogW25ldyBVUkwodXJsKS5vcmlnaW4gKyAnLyonXSxcbiAgICB9KTtcbn1cbi8vIFRoZSBjYWxsYmFjayBpcyBvbmx5IHVzZWQgYnkgd2ViZXh0ZW5zaW9uLXBvbHlmaWxsXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiByZWdpc3RlckNvbnRlbnRTY3JpcHQoY29udGVudFNjcmlwdE9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgeyBqcyA9IFtdLCBjc3MgPSBbXSwgbWF0Y2hBYm91dEJsYW5rLCBtYXRjaGVzID0gW10sIGV4Y2x1ZGVNYXRjaGVzLCBydW5BdCwgfSA9IGNvbnRlbnRTY3JpcHRPcHRpb25zO1xuICAgIGxldCB7IGFsbEZyYW1lcyB9ID0gY29udGVudFNjcmlwdE9wdGlvbnM7XG4gICAgaWYgKGdvdE5hdmlnYXRpb24pIHtcbiAgICAgICAgYWxsRnJhbWVzID0gZmFsc2U7XG4gICAgfVxuICAgIGVsc2UgaWYgKGFsbEZyYW1lcykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2BhbGxGcmFtZXM6IHRydWVgIHJlcXVpcmVzIHRoZSBgd2ViTmF2aWdhdGlvbmAgcGVybWlzc2lvbiB0byB3b3JrIGNvcnJlY3RseTogaHR0cHM6Ly9naXRodWIuY29tL2ZyZWdhbnRlL2NvbnRlbnQtc2NyaXB0cy1yZWdpc3Rlci1wb2x5ZmlsbCNwZXJtaXNzaW9ucycpO1xuICAgIH1cbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5vTWF0Y2hlc0Vycm9yKTtcbiAgICB9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwobWF0Y2hlcy5tYXAoYXN5bmMgKHBhdHRlcm4pID0+IHtcbiAgICAgICAgaWYgKCFhd2FpdCBjaHJvbWVQLnBlcm1pc3Npb25zLmNvbnRhaW5zKHsgb3JpZ2luczogW3BhdHRlcm5dIH0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iobm9QZXJtaXNzaW9uRXJyb3IgKyBwYXR0ZXJuKTtcbiAgICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zdCBtYXRjaGVzUmVnZXggPSBwYXR0ZXJuVG9SZWdleCguLi5tYXRjaGVzKTtcbiAgICBjb25zdCBleGNsdWRlTWF0Y2hlc1JlZ2V4ID0gcGF0dGVyblRvUmVnZXgoLi4uZXhjbHVkZU1hdGNoZXMgIT09IG51bGwgJiYgZXhjbHVkZU1hdGNoZXMgIT09IHZvaWQgMCA/IGV4Y2x1ZGVNYXRjaGVzIDogW10pO1xuICAgIGNvbnN0IGluamVjdCA9IGFzeW5jICh1cmwsIHRhYklkLCBmcmFtZUlkID0gMCkgPT4ge1xuICAgICAgICBpZiAoIW1hdGNoZXNSZWdleC50ZXN0KHVybCkgLy8gTWFudWFsIGBtYXRjaGVzYCBnbG9iIG1hdGNoaW5nXG4gICAgICAgICAgICB8fCBleGNsdWRlTWF0Y2hlc1JlZ2V4LnRlc3QodXJsKSAvLyBNYW51YWwgYGV4Y2x1ZGVfbWF0Y2hlc2AgZ2xvYiBtYXRjaGluZ1xuICAgICAgICAgICAgfHwgIWF3YWl0IGlzT3JpZ2luUGVybWl0dGVkKHVybCkgLy8gV2l0aG91dCB0aGlzLCB3ZSBtaWdodCBoYXZlIHRlbXBvcmFyeSBhY2Nlc3MgdmlhIGFjY2Vzc1RhYlxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBpbmplY3RDb250ZW50U2NyaXB0KHtcbiAgICAgICAgICAgIHRhYklkLFxuICAgICAgICAgICAgZnJhbWVJZCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY3NzLFxuICAgICAgICAgICAganMsXG4gICAgICAgICAgICBtYXRjaEFib3V0QmxhbmssXG4gICAgICAgICAgICBydW5BdCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWdub3JlVGFyZ2V0RXJyb3JzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IHRhYkxpc3RlbmVyID0gYXN5bmMgKHRhYklkLCB7IHN0YXR1cyB9LCB7IHVybCB9KSA9PiB7XG4gICAgICAgIC8vIE9ubHkgc3RhdHVzIHVwZGF0ZXMgYXJlIHJlbGV2YW50XG4gICAgICAgIC8vIE5vIFVSTCA9IG5vIHBlcm1pc3Npb25cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2xvYWRpbmcnICYmIHVybCkge1xuICAgICAgICAgICAgdm9pZCBpbmplY3QodXJsLCB0YWJJZCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG5hdkxpc3RlbmVyID0gYXN5bmMgKHsgdGFiSWQsIGZyYW1lSWQsIHVybCwgfSkgPT4ge1xuICAgICAgICB2b2lkIGluamVjdCh1cmwsIHRhYklkLCBmcmFtZUlkKTtcbiAgICB9O1xuICAgIGlmIChnb3ROYXZpZ2F0aW9uKSB7XG4gICAgICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQ29tbWl0dGVkLmFkZExpc3RlbmVyKG5hdkxpc3RlbmVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih0YWJMaXN0ZW5lcik7XG4gICAgfVxuICAgIGNvbnN0IHJlZ2lzdGVyZWRDb250ZW50U2NyaXB0ID0ge1xuICAgICAgICBhc3luYyB1bnJlZ2lzdGVyKCkge1xuICAgICAgICAgICAgaWYgKGdvdE5hdmlnYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUud2ViTmF2aWdhdGlvbi5vbkNvbW1pdHRlZC5yZW1vdmVMaXN0ZW5lcihuYXZMaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIodGFiTGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjayhyZWdpc3RlcmVkQ29udGVudFNjcmlwdCk7XG4gICAgfVxuICAgIHJldHVybiByZWdpc3RlcmVkQ29udGVudFNjcmlwdDtcbn1cbiIsImltcG9ydCB7IGV4Y2x1ZGVEdXBsaWNhdGVQYXR0ZXJucywgcGF0dGVyblRvUmVnZXggfSBmcm9tICd3ZWJleHQtcGF0dGVybnMnO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE1hbmlmZXN0UGVybWlzc2lvbnMoKSB7XG4gICAgcmV0dXJuIGdldE1hbmlmZXN0UGVybWlzc2lvbnNTeW5jKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFuaWZlc3RQZXJtaXNzaW9uc1N5bmMoKSB7XG4gICAgcmV0dXJuIF9nZXRNYW5pZmVzdFBlcm1pc3Npb25zU3luYyhjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0TWFuaWZlc3RQZXJtaXNzaW9uc1N5bmMobWFuaWZlc3QpIHtcbiAgICB2YXIgX2EsIF9iLCBfYztcbiAgICBjb25zdCBtYW5pZmVzdFBlcm1pc3Npb25zID0ge1xuICAgICAgICBvcmlnaW5zOiBbXSxcbiAgICAgICAgcGVybWlzc2lvbnM6IFtdLFxuICAgIH07XG4gICAgY29uc3QgbGlzdCA9IG5ldyBTZXQoW1xuICAgICAgICAuLi4oKF9hID0gbWFuaWZlc3QucGVybWlzc2lvbnMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdKSxcbiAgICAgICAgLi4uKChfYiA9IG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0cykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogW10pLmZsYXRNYXAoY29uZmlnID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gY29uZmlnLm1hdGNoZXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdOyB9KSxcbiAgICBdKTtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9nZWNrby1kZXYvYmxvYi9jMGZjOGM0ODUyZTkyN2IwYWU3NWQ4OTNkMzU3NzJiOGM2MGVlMDZiL3Rvb2xraXQvY29tcG9uZW50cy9leHRlbnNpb25zL0V4dGVuc2lvbi5qc20jTDczOC1MNzQzXG4gICAgaWYgKG1hbmlmZXN0LmRldnRvb2xzX3BhZ2VcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBpdCBjYW4ndCBiZSBzcGVjaWZpZWQsIGJ1dCBpdCdzIHJlcG9ydGVkIHdoZW4gcmVxdWVzdGVkXG4gICAgICAgICYmICEoKF9jID0gbWFuaWZlc3Qub3B0aW9uYWxfcGVybWlzc2lvbnMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5pbmNsdWRlcygnZGV2dG9vbHMnKSkpIHtcbiAgICAgICAgbGlzdC5hZGQoJ2RldnRvb2xzJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcGVybWlzc2lvbiBvZiBsaXN0KSB7XG4gICAgICAgIGlmIChwZXJtaXNzaW9uLmluY2x1ZGVzKCc6Ly8nKSkge1xuICAgICAgICAgICAgbWFuaWZlc3RQZXJtaXNzaW9ucy5vcmlnaW5zLnB1c2gocGVybWlzc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtYW5pZmVzdFBlcm1pc3Npb25zLnBlcm1pc3Npb25zLnB1c2gocGVybWlzc2lvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hbmlmZXN0UGVybWlzc2lvbnM7XG59XG5jb25zdCBob3N0UmVnZXggPSAvOlsvXVsvXVsqLl0qKFteL10rKS87IC8vIEV4dHJhY3RzIHRoZSB3aWxkY2FyZC1sZXNzIGhvc3RuYW1lXG5mdW5jdGlvbiBwYXJzZURvbWFpbihvcmlnaW4pIHtcbiAgICByZXR1cm4gb3JpZ2luLnNwbGl0KGhvc3RSZWdleClbMV07XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0QWRkaXRpb25hbFBlcm1pc3Npb25zKHBlcm1pc3Npb25zLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHNlbGVjdEFkZGl0aW9uYWxQZXJtaXNzaW9uc1N5bmMocGVybWlzc2lvbnMsIG9wdGlvbnMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdEFkZGl0aW9uYWxQZXJtaXNzaW9uc1N5bmMocGVybWlzc2lvbnMsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBtYW5pZmVzdFBlcm1pc3Npb25zID0gZ2V0TWFuaWZlc3RQZXJtaXNzaW9uc1N5bmMoKTtcbiAgICByZXR1cm4gX2dldEFkZGl0aW9uYWxQZXJtaXNzaW9ucyhtYW5pZmVzdFBlcm1pc3Npb25zLCBwZXJtaXNzaW9ucywgb3B0aW9ucyk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWRkaXRpb25hbFBlcm1pc3Npb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNocm9tZS5wZXJtaXNzaW9ucy5nZXRBbGwoY3VycmVudFBlcm1pc3Npb25zID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hbmlmZXN0UGVybWlzc2lvbnMgPSBnZXRNYW5pZmVzdFBlcm1pc3Npb25zU3luYygpO1xuICAgICAgICAgICAgcmVzb2x2ZShfZ2V0QWRkaXRpb25hbFBlcm1pc3Npb25zKG1hbmlmZXN0UGVybWlzc2lvbnMsIGN1cnJlbnRQZXJtaXNzaW9ucywgb3B0aW9ucykpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0QWRkaXRpb25hbFBlcm1pc3Npb25zKG1hbmlmZXN0UGVybWlzc2lvbnMsIGN1cnJlbnRQZXJtaXNzaW9ucywgeyBzdHJpY3RPcmlnaW5zID0gdHJ1ZSB9ID0ge30pIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IGFkZGl0aW9uYWxQZXJtaXNzaW9ucyA9IHtcbiAgICAgICAgb3JpZ2luczogW10sXG4gICAgICAgIHBlcm1pc3Npb25zOiBbXSxcbiAgICB9O1xuICAgIGZvciAoY29uc3Qgb3JpZ2luIG9mIChfYSA9IGN1cnJlbnRQZXJtaXNzaW9ucy5vcmlnaW5zKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSkge1xuICAgICAgICBpZiAobWFuaWZlc3RQZXJtaXNzaW9ucy5vcmlnaW5zLmluY2x1ZGVzKG9yaWdpbikpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RyaWN0T3JpZ2lucykge1xuICAgICAgICAgICAgY29uc3QgZG9tYWluID0gcGFyc2VEb21haW4ob3JpZ2luKTtcbiAgICAgICAgICAgIGNvbnN0IGlzRG9tYWluSW5NYW5pZmVzdCA9IG1hbmlmZXN0UGVybWlzc2lvbnMub3JpZ2luc1xuICAgICAgICAgICAgICAgIC5zb21lKG1hbmlmZXN0T3JpZ2luID0+IHBhcnNlRG9tYWluKG1hbmlmZXN0T3JpZ2luKSA9PT0gZG9tYWluKTtcbiAgICAgICAgICAgIGlmIChpc0RvbWFpbkluTWFuaWZlc3QpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhZGRpdGlvbmFsUGVybWlzc2lvbnMub3JpZ2lucy5wdXNoKG9yaWdpbik7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcGVybWlzc2lvbiBvZiAoX2IgPSBjdXJyZW50UGVybWlzc2lvbnMucGVybWlzc2lvbnMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFtdKSB7XG4gICAgICAgIGlmICghbWFuaWZlc3RQZXJtaXNzaW9ucy5wZXJtaXNzaW9ucy5pbmNsdWRlcyhwZXJtaXNzaW9uKSkge1xuICAgICAgICAgICAgYWRkaXRpb25hbFBlcm1pc3Npb25zLnBlcm1pc3Npb25zLnB1c2gocGVybWlzc2lvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFkZGl0aW9uYWxQZXJtaXNzaW9ucztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1VybFBlcm1pdHRlZEJ5TWFuaWZlc3Qob3JpZ2luKSB7XG4gICAgcmV0dXJuIF9pc1VybFBlcm1pdHRlZEJ5TWFuaWZlc3Qob3JpZ2luLCBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBfaXNVcmxQZXJtaXR0ZWRCeU1hbmlmZXN0KG9yaWdpbiwgbWFuaWZlc3QpIHtcbiAgICBjb25zdCBtYW5pZmVzdFBlcm1pc3Npb25zID0gX2dldE1hbmlmZXN0UGVybWlzc2lvbnNTeW5jKG1hbmlmZXN0KTtcbiAgICBjb25zdCBvcmlnaW5zUmVnZXggPSBwYXR0ZXJuVG9SZWdleCguLi5tYW5pZmVzdFBlcm1pc3Npb25zLm9yaWdpbnMpO1xuICAgIHJldHVybiBvcmlnaW5zUmVnZXgudGVzdChvcmlnaW4pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRyb3BPdmVybGFwcGluZ1Blcm1pc3Npb25zKHsgb3JpZ2lucywgcGVybWlzc2lvbnMgfSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGlmIChvcmlnaW5zKSB7XG4gICAgICAgIHJlc3VsdC5vcmlnaW5zID0gZXhjbHVkZUR1cGxpY2F0ZVBhdHRlcm5zKG9yaWdpbnMpO1xuICAgIH1cbiAgICBpZiAocGVybWlzc2lvbnMpIHtcbiAgICAgICAgcmVzdWx0LnBlcm1pc3Npb25zID0gWy4uLnBlcm1pc3Npb25zXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCB7IG9uZUV2ZW50IH0gZnJvbSAnd2ViZXh0LWV2ZW50cyc7XG5pbXBvcnQgeyBpc0JhY2tncm91bmRXb3JrZXIsIGlzQ2hyb21lLCBpc0JhY2tncm91bmRQYWdlIH0gZnJvbSAnd2ViZXh0LWRldGVjdC1wYWdlJztcbmFzeW5jIGZ1bmN0aW9uIG9uUG9wdXBDbG9zZSh3YXRjaGVkV2luZG93SWQpIHtcbiAgICBhd2FpdCBvbmVFdmVudChjaHJvbWUud2luZG93cy5vblJlbW92ZWQsIGNsb3NlZFdpbmRvd0lkID0+IGNsb3NlZFdpbmRvd0lkID09PSB3YXRjaGVkV2luZG93SWQpO1xufVxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIHNlcmlhbGl6ZWQsIGRvIG5vdCB1c2UgdmFyaWFibGVzIG91dHNpZGUgaXRzIHNjb3BlXG5mdW5jdGlvbiBwYWdlU2NyaXB0KCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF8gPT4ge1xuICAgICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIF8gPT4ge1xuICAgICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICB9KTtcbiAgICB3aW5kb3cucmVzaXplQnkoMCwgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIHdpbmRvdy5tb3ZlVG8oKHNjcmVlbi53aWR0aCAtIHdpbmRvdy5vdXRlcldpZHRoKSAvIDIsIChzY3JlZW4uaGVpZ2h0IC0gd2luZG93Lm91dGVySGVpZ2h0KSAvIDIpO1xuICAgIGJ1dHRvbi5mb2N1cygpO1xufVxuLy8gVE9ETzogQWRkIGJ1bmRsZXIgdG8gaW5jbHVkZSBiYXNlLWNzc1xuY29uc3QgY3NzID0gLyogY3NzICovIGBcblx0LyohIGh0dHBzOi8vbnBtLmltL3dlYmV4dC1iYXNlLWNzcyAqL1xuXG5cdC8qIENocm9tZSBvbmx5OiAtd2Via2l0LWh5cGhlbnMgKi9cblx0LyogU2FmYXJpIG9ubHk6IF86Oi13ZWJraXQtZnVsbC1wYWdlLW1lZGlhICovXG5cblx0Lyogd2VicGFja0lnbm9yZTogdHJ1ZSAqL1xuXHRAaW1wb3J0IHVybCgnY2hyb21lOi8vZ2xvYmFsL3NraW4vaW4tY29udGVudC9jb21tb24uY3NzJykgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzowKTsgLyogRmlyZWZveC1vbmx5ICovXG5cblx0OnJvb3Qge1xuXHRcdC0tYmFja2dyb3VuZC1jb2xvci1mb3ItY2hyb21lOiAjMjkyYTJkO1xuXHRcdG1heC13aWR0aDogNzAwcHg7XG5cdFx0bWFyZ2luOiBhdXRvO1xuXHR9XG5cblx0Ym9keSB7XG5cdFx0LS1ib2R5LW1hcmdpbi1oOiA4cHg7XG5cdFx0bWFyZ2luLWxlZnQ6IHZhcigtLWJvZHktbWFyZ2luLWgpO1xuXHRcdG1hcmdpbi1yaWdodDogdmFyKC0tYm9keS1tYXJnaW4taCk7XG5cdH1cblxuXHQvKiBTZWxlY3RvciBtYXRjaGVzIEZpcmVmb3jigJkgKi9cblx0aW5wdXRbdHlwZT0nbnVtYmVyJ10sXG5cdGlucHV0W3R5cGU9J3Bhc3N3b3JkJ10sXG5cdGlucHV0W3R5cGU9J3NlYXJjaCddLFxuXHRpbnB1dFt0eXBlPSd0ZXh0J10sXG5cdGlucHV0W3R5cGU9J3VybCddLFxuXHRpbnB1dDpub3QoW3R5cGVdKSxcblx0dGV4dGFyZWEge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdFx0bWFyZ2luLWxlZnQ6IDA7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0cmVzaXplOiB2ZXJ0aWNhbDtcblx0XHQtbW96LXRhYi1zaXplOiA0ICFpbXBvcnRhbnQ7XG5cdFx0dGFiLXNpemU6IDQgIWltcG9ydGFudDtcblx0fVxuXG5cdGlucHV0W3R5cGU9J2NoZWNrYm94J10ge1xuXHRcdHZlcnRpY2FsLWFsaWduOiAtMC4xNWVtO1xuXHR9XG5cblx0QHN1cHBvcnRzIChub3QgKC13ZWJraXQtaHlwaGVuczpub25lKSkgYW5kIChub3QgKC1tb3otYXBwZWFyYW5jZTpub25lKSkgYW5kIChsaXN0LXN0eWxlLXR5cGU6JyonKSB7XG5cdFx0dGV4dGFyZWE6Zm9jdXMge1xuXHRcdFx0LyogSW5leHBsaWNhYmx5IG1pc3NpbmcgZnJvbSBDaHJvbWXigJlzIGlucHV0IHN0eWxlIGh0dHBzOi8vZ2l0aHViLmNvbS9jaHJvbWl1bS9jaHJvbWl1bS9ibG9iLzZiZWEwNTU3ZmUvZXh0ZW5zaW9ucy9yZW5kZXJlci9yZXNvdXJjZXMvZXh0ZW5zaW9uLmNzcyNMMjg3ICovXG5cdFx0XHRib3JkZXItY29sb3I6ICM0ZDkwZmU7XG5cdFx0XHR0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMjAwbXM7XG5cdFx0fVxuXHR9XG5cblx0aHIge1xuXHRcdG1hcmdpbi1yaWdodDogY2FsYygtMSAqIHZhcigtLWJvZHktbWFyZ2luLWgpKTtcblx0XHRtYXJnaW4tbGVmdDogY2FsYygtMSAqIHZhcigtLWJvZHktbWFyZ2luLWgpKTtcblx0XHRib3JkZXI6IG5vbmU7XG5cdFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNhYWE0O1xuXHR9XG5cblx0aW1nIHtcblx0XHR2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuXHR9XG5cblx0Xzo6LXdlYmtpdC1mdWxsLXBhZ2UtbWVkaWEsXG5cdF86ZnV0dXJlLFxuXHQ6cm9vdCB7XG5cdFx0Zm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZiwgJ0FwcGxlIENvbG9yIEVtb2ppJztcblx0fVxuXG5cdF86Oi13ZWJraXQtZnVsbC1wYWdlLW1lZGlhLFxuXHRfOmZ1dHVyZSxcblx0aW5wdXRbdHlwZT0nbnVtYmVyJ10sXG5cdGlucHV0W3R5cGU9J3Bhc3N3b3JkJ10sXG5cdGlucHV0W3R5cGU9J3NlYXJjaCddLFxuXHRpbnB1dFt0eXBlPSd0ZXh0J10sXG5cdGlucHV0W3R5cGU9J3VybCddLFxuXHRpbnB1dDpub3QoW3R5cGVdKSxcblx0dGV4dGFyZWEge1xuXHRcdGJvcmRlcjogc29saWQgMXB4ICM4ODg7XG5cdFx0cGFkZGluZzogMC40ZW07XG5cdFx0Zm9udDogaW5oZXJpdDtcblx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG5cdH1cblxuXHRAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XG5cdFx0OnJvb3Qge1xuXHRcdFx0Y29sb3Itc2NoZW1lOiBkYXJrO1xuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvci1mb3ItY2hyb21lKTtcblx0XHR9XG5cblx0XHRib2R5LFxuXHRcdGgzIHsgLyogQ2hyb21lICMzICovXG5cdFx0XHRjb2xvcjogI2U4ZWFlZDtcblx0XHR9XG5cblx0XHRhIHtcblx0XHRcdGNvbG9yOiB2YXIoLS1saW5rLWNvbG9yLCAjOGFiNGY4KTtcblx0XHR9XG5cblx0XHRhOmFjdGl2ZSB7XG5cdFx0XHRjb2xvcjogdmFyKC0tbGluay1jb2xvci1hY3RpdmUsICNiNmQzZjkpO1xuXHRcdH1cblxuXHRcdGlucHV0W3R5cGU9J251bWJlciddLFxuXHRcdGlucHV0W3R5cGU9J3Bhc3N3b3JkJ10sXG5cdFx0aW5wdXRbdHlwZT0nc2VhcmNoJ10sXG5cdFx0aW5wdXRbdHlwZT0ndGV4dCddLFxuXHRcdGlucHV0W3R5cGU9J3VybCddLFxuXHRcdGlucHV0Om5vdChbdHlwZV0pLFxuXHRcdHRleHRhcmVhIHtcblx0XHRcdGNvbG9yOiBpbmhlcml0O1xuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdFx0fVxuXHR9XG5cblx0LyogRW5kIHdlYmV4dC1iYXNlLWNzcyAqL1xuXG5cdGJvZHkge1xuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdFx0bWluLWhlaWdodDogMTAwdmg7XG5cdFx0bWFyZ2luOiAwO1xuXHRcdHBhZGRpbmc6IDFlbTtcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdFx0Zm9udC1zaXplOiAxNHB4O1xuXHRcdGxpbmUtaGVpZ2h0OiAxLjU7XG5cdFx0Zm9udC1mYW1pbHk6IHN5c3RlbSwgc3lzdGVtLXVpLCBzYW5zLXNlcmlmO1xuXHR9XG5cblx0YnV0dG9uIHtcblx0XHRtYXJnaW4tdG9wOiAxZW07XG5cdFx0bWFyZ2luLWxlZnQ6IGF1dG87XG5cdH1cbmA7XG5mdW5jdGlvbiBnZXRQYWdlKG1lc3NhZ2UgPSAnJykge1xuICAgIHJldHVybiAvKiBodG1sICovIGBcblx0XHQ8IWRvY3R5cGUgaHRtbD5cblx0XHQ8bWV0YSBjaGFyc2V0PVwidXRmLThcIiAvPlxuXHRcdDx0aXRsZT4ke2Nocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubmFtZX08L3RpdGxlPlxuXHRcdDxzdHlsZT4ke2Nzc308L3N0eWxlPlxuXHRcdDxzY3JpcHQgZGVmZXIgc3JjPVwiYWxlcnQuanNcIj48L3NjcmlwdD5cblx0XHQ8Ym9keT5cblx0XHRcdDxtYWluPiR7bWVzc2FnZX08L21haW4+XG5cdFx0XHQ8YnV0dG9uPk9rPC9idXR0b24+XG5cdFx0PC9ib2R5PlxuXHRcdDxzY3JpcHQ+KCR7cGFnZVNjcmlwdC50b1N0cmluZygpfSkoKTwvc2NyaXB0PlxuXHRgO1xufVxuYXN5bmMgZnVuY3Rpb24gcG9wdXBBbGVydChtZXNzYWdlKSB7XG4gICAgY29uc3Qgd2lkdGggPSA0MjA7XG4gICAgY29uc3QgaGVpZ2h0ID0gMTUwO1xuICAgIC8vIGBjaHJvbWVgIGlzIFByb21pc2lmaWVkIHdoZXJlIGBwb3B1cEFsZXJ0YCBpcyB1c2VkXG4gICAgY29uc3QgcG9wdXAgPSBhd2FpdCBjaHJvbWUud2luZG93cy5jcmVhdGUoe1xuICAgICAgICB0eXBlOiAncG9wdXAnLFxuICAgICAgICB1cmw6ICdkYXRhOnRleHQvaHRtbCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KGdldFBhZ2UobWVzc2FnZSkpLFxuICAgICAgICBmb2N1c2VkOiB0cnVlLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHdpZHRoLFxuICAgIH0pO1xuICAgIGF3YWl0IG9uUG9wdXBDbG9zZShwb3B1cC5pZCk7XG59XG4vLyBgYWxlcnQoKWAgaXMgbm90IGF2YWlsYWJsZSBpbiBhbnkgc2VydmljZSB3b3JrZXJcbi8vIGBhbGVydCgpYCBpcyBub3QgYXZhaWxhYmxlIGluIGFueSBiYWNrZ3JvdW5kIGNvbnRleHQgaW4gRmlyZWZveCBhbmQgU2FmYXJpXG5jb25zdCB3ZWJleHRBbGVydCA9IGlzQmFja2dyb3VuZFdvcmtlcigpIHx8ICghaXNDaHJvbWUoKSAmJiBpc0JhY2tncm91bmRQYWdlKCkpXG4gICAgPyBwb3B1cEFsZXJ0XG4gICAgOiBhbGVydDtcbmV4cG9ydCBkZWZhdWx0IHdlYmV4dEFsZXJ0O1xuIiwibGV0IGNhY2hlID0gdHJ1ZTtcbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlV2ViZXh0RGV0ZWN0UGFnZUNhY2hlKCkge1xuICAgIGNhY2hlID0gZmFsc2U7XG59XG5mdW5jdGlvbiBpc0N1cnJlbnRQYXRobmFtZShwYXRoKSB7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBwYXRobmFtZSB9ID0gbmV3IFVSTChwYXRoLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgICAgICByZXR1cm4gcGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRNYW5pZmVzdChfdmVyc2lvbikge1xuICAgIHJldHVybiBnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZT8uZ2V0TWFuaWZlc3Q/LigpO1xufVxuZnVuY3Rpb24gb25jZShmdW5jdGlvbl8pIHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICghY2FjaGUgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmN0aW9uXygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gb24gaHR0cChzKTovLyBwYWdlcyAoaXQgY291bGQgYmUgaW4gYSBjb250ZW50IHNjcmlwdCBvciByZWd1bGFyIHdlYiBjb250ZXh0KSAqL1xuZXhwb3J0IGNvbnN0IGlzV2ViUGFnZSA9IG9uY2UoKCkgPT4gWydhYm91dDonLCAnaHR0cDonLCAnaHR0cHM6J10uaW5jbHVkZXMobG9jYXRpb24ucHJvdG9jb2wpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gZXh0ZW5zaW9uIGNvbnRleHRzIHRoYXQgaGF2ZSBhY2Nlc3MgdG8gdGhlIGNocm9tZSBBUEkgKi9cbmV4cG9ydCBjb25zdCBpc0V4dGVuc2lvbkNvbnRleHQgPSBvbmNlKCgpID0+IHR5cGVvZiBnbG9iYWxUaGlzLmNocm9tZT8uZXh0ZW5zaW9uID09PSAnb2JqZWN0Jyk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgY29udGVudCBzY3JpcHQgKi9cbmV4cG9ydCBjb25zdCBpc0NvbnRlbnRTY3JpcHQgPSBvbmNlKCgpID0+IGlzRXh0ZW5zaW9uQ29udGV4dCgpICYmIGlzV2ViUGFnZSgpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIGNvbnRleHQgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmQgPSAoKSA9PiBpc0JhY2tncm91bmRQYWdlKCkgfHwgaXNCYWNrZ3JvdW5kV29ya2VyKCk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgYmFja2dyb3VuZCBwYWdlICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGNvbnN0IG1hbmlmZXN0ID0gZ2V0TWFuaWZlc3QoMik7XG4gICAgaWYgKG1hbmlmZXN0XG4gICAgICAgICYmIGlzQ3VycmVudFBhdGhuYW1lKG1hbmlmZXN0LmJhY2tncm91bmRfcGFnZSA/PyBtYW5pZmVzdC5iYWNrZ3JvdW5kPy5wYWdlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIEJvb2xlYW4obWFuaWZlc3Q/LmJhY2tncm91bmQ/LnNjcmlwdHNcbiAgICAgICAgJiYgaXNDdXJyZW50UGF0aG5hbWUoJy9fZ2VuZXJhdGVkX2JhY2tncm91bmRfcGFnZS5odG1sJykpO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgYmFja2dyb3VuZCB3b3JrZXIgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmRXb3JrZXIgPSBvbmNlKCgpID0+IGlzQ3VycmVudFBhdGhuYW1lKGdldE1hbmlmZXN0KDMpPy5iYWNrZ3JvdW5kPy5zZXJ2aWNlX3dvcmtlcikpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIHBlcnNpc3RlbnQgYmFja2dyb3VuZCBwYWdlIChhcyBvcHBvc2VkIHRvIGFuIEV2ZW50IFBhZ2Ugb3IgQmFja2dyb3VuZCBXb3JrZXIsIGJvdGggb2Ygd2hpY2ggY2FuIGJlIHVubG9hZGVkIGJ5IHRoZSBicm93c2VyKSAqL1xuZXhwb3J0IGNvbnN0IGlzUGVyc2lzdGVudEJhY2tncm91bmRQYWdlID0gb25jZSgoKSA9PiBpc0JhY2tncm91bmRQYWdlKClcbiAgICAmJiBnZXRNYW5pZmVzdCgyKT8ubWFuaWZlc3RfdmVyc2lvbiA9PT0gMiAvLyBGaXJlZm94IGNhbiBoYXZlIGEgYmFja2dyb3VuZCBwYWdlIG9uIE1WMywgYnV0IGNhbid0IGJlIHBlcnNpc3RlbnRcbiAgICAmJiBnZXRNYW5pZmVzdCgyKT8uYmFja2dyb3VuZD8ucGVyc2lzdGVudCAhPT0gZmFsc2UpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhbiBvcHRpb25zIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gICovXG5leHBvcnQgY29uc3QgaXNPcHRpb25zUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBnZXRNYW5pZmVzdCgpPy5vcHRpb25zX3VpPy5wYWdlO1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYW4gb3B0aW9ucyBwYWdlLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCAqL1xuZXhwb3J0IGNvbnN0IGlzU2lkZVBhbmVsID0gb25jZSgoKSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudCAtLSBOb3QgeWV0IGluIEB0eXBlcy9jaHJvbWVcbiAgICBjb25zdCBwYXRoID0gZ2V0TWFuaWZlc3QoMyk/Llsnc2lkZV9wYW5lbCddPy5kZWZhdWx0X3BhdGg7XG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGF0aCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICByZXR1cm4gdXJsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGRldiB0b29scyBwYWdlLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCBgZGV2dG9vbHNfcGFnZWAgZmllbGQuICovXG5leHBvcnQgY29uc3QgaXNEZXZUb29sc1BhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBjb25zdCBkZXZ0b29sc1BhZ2UgPSBpc0V4dGVuc2lvbkNvbnRleHQoKSAmJiBjaHJvbWUuZGV2dG9vbHMgJiYgZ2V0TWFuaWZlc3QoKT8uZGV2dG9vbHNfcGFnZTtcbiAgICBpZiAodHlwZW9mIGRldnRvb2xzUGFnZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGRldnRvb2xzUGFnZSwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICByZXR1cm4gdXJsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiB0aGUgZGV2IHRvb2xzIHBhZ2UuIFVubGlrZSBgaXNEZXZUb29sc1BhZ2VgLCB0aGlzIHdvcmtzIGluIGFueSBwYWdlIHRoYXQgaGFzIHRoZSBgY2hyb21lLmRldlRvb2xzYCBBUEkgKi9cbmV4cG9ydCBjb25zdCBpc0RldlRvb2xzID0gKCkgPT4gQm9vbGVhbihnbG9iYWxUaGlzLmNocm9tZT8uZGV2dG9vbHMpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IEZpcmVmb3ggdmlhIHVzZXIgYWdlbnQgKi9cbmV4cG9ydCBjb25zdCBpc0ZpcmVmb3ggPSAoKSA9PiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdGaXJlZm94Jyk7XG4vKiogTG9vc2VseSBkZXRlY3QgQ2hyb21lIHZpYSB1c2VyIGFnZW50IChtaWdodCBhbHNvIGluY2x1ZGUgQ2hyb21pdW0gYW5kIGZvcmtzIGxpa2UgT3BlcmEpICovXG5leHBvcnQgY29uc3QgaXNDaHJvbWUgPSAoKSA9PiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdDaHJvbWUnKTtcbi8qKiBMb29zZWx5IGRldGVjdCBTYWZhcmkgdmlhIHVzZXIgYWdlbnQgKi9cbmV4cG9ydCBjb25zdCBpc1NhZmFyaSA9ICgpID0+ICFpc0Nocm9tZSgpICYmIGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ1NhZmFyaScpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IE1vYmlsZSBTYWZhcmkgdmlhIHVzZXIgYWdlbnQgKi9cbmV4cG9ydCBjb25zdCBpc01vYmlsZVNhZmFyaSA9ICgpID0+IGlzU2FmYXJpKCkgJiYgZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnTW9iaWxlJyk7XG5jb25zdCBjb250ZXh0Q2hlY2tzID0ge1xuICAgIGNvbnRlbnRTY3JpcHQ6IGlzQ29udGVudFNjcmlwdCxcbiAgICBiYWNrZ3JvdW5kOiBpc0JhY2tncm91bmQsXG4gICAgb3B0aW9uczogaXNPcHRpb25zUGFnZSxcbiAgICBzaWRlUGFuZWw6IGlzU2lkZVBhbmVsLFxuICAgIGRldlRvb2xzOiBpc0RldlRvb2xzLFxuICAgIGRldlRvb2xzUGFnZTogaXNEZXZUb29sc1BhZ2UsXG4gICAgZXh0ZW5zaW9uOiBpc0V4dGVuc2lvbkNvbnRleHQsXG4gICAgd2ViOiBpc1dlYlBhZ2UsXG59O1xuZXhwb3J0IGNvbnN0IGNvbnRleHROYW1lcyA9IE9iamVjdC5rZXlzKGNvbnRleHRDaGVja3MpO1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRleHROYW1lKCkge1xuICAgIGZvciAoY29uc3QgW25hbWUsIHRlc3RdIG9mIE9iamVjdC5lbnRyaWVzKGNvbnRleHRDaGVja3MpKSB7XG4gICAgICAgIGlmICh0ZXN0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAndW5rbm93bic7XG59XG4iLCJpbXBvcnQgY2hyb21lUCBmcm9tICd3ZWJleHQtcG9seWZpbGwta2luZGEnO1xuaW1wb3J0IHsgcGF0dGVyblRvUmVnZXggfSBmcm9tICd3ZWJleHQtcGF0dGVybnMnO1xuY29uc3QgZ290U2NyaXB0aW5nID0gQm9vbGVhbihnbG9iYWxUaGlzLmNocm9tZT8uc2NyaXB0aW5nKTtcbmZ1bmN0aW9uIGNhc3RUYXJnZXQodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnID8gdGFyZ2V0IDoge1xuICAgICAgICB0YWJJZDogdGFyZ2V0LFxuICAgICAgICBmcmFtZUlkOiAwLFxuICAgIH07XG59XG5mdW5jdGlvbiBjYXN0QWxsRnJhbWVzVGFyZ2V0KHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4geyAuLi50YXJnZXQsIGFsbEZyYW1lczogZmFsc2UgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGFiSWQ6IHRhcmdldCxcbiAgICAgICAgZnJhbWVJZDogdW5kZWZpbmVkLFxuICAgICAgICBhbGxGcmFtZXM6IHRydWUsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNhc3RBcnJheShwb3NzaWJsZUFycmF5KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocG9zc2libGVBcnJheSkpIHtcbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlQXJyYXk7XG4gICAgfVxuICAgIHJldHVybiBbcG9zc2libGVBcnJheV07XG59XG5jb25zdCBuYXRpdmVGdW5jdGlvbiA9IC9eZnVuY3Rpb24gXFx3K1xcKFxcKSB7W1xcblxcc10rXFxbbmF0aXZlIGNvZGVdW1xcblxcc10rfS87XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUZ1bmN0aW9uKHRhcmdldCwgZnVuY3Rpb25fLCAuLi5hcmdzKSB7XG4gICAgaWYgKG5hdGl2ZUZ1bmN0aW9uLnRlc3QoU3RyaW5nKGZ1bmN0aW9uXykpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05hdGl2ZSBmdW5jdGlvbnMgbmVlZCB0byBiZSB3cmFwcGVkIGZpcnN0LCBsaWtlIGBleGVjdXRlRnVuY3Rpb24oMSwgKCkgPT4gYWxlcnQoMSkpYCcpO1xuICAgIH1cbiAgICBjb25zdCB7IGZyYW1lSWQsIHRhYklkIH0gPSBjYXN0VGFyZ2V0KHRhcmdldCk7XG4gICAgaWYgKGdvdFNjcmlwdGluZykge1xuICAgICAgICBjb25zdCBbaW5qZWN0aW9uXSA9IGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICB0YWJJZCxcbiAgICAgICAgICAgICAgICBmcmFtZUlkczogW2ZyYW1lSWRdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmM6IGZ1bmN0aW9uXyxcbiAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaW5qZWN0aW9uPy5yZXN1bHQ7XG4gICAgfVxuICAgIGNvbnN0IFtyZXN1bHRdID0gYXdhaXQgY2hyb21lUC50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcbiAgICAgICAgY29kZTogYCgke2Z1bmN0aW9uXy50b1N0cmluZygpfSkoLi4uJHtKU09OLnN0cmluZ2lmeShhcmdzKX0pYCxcbiAgICAgICAgbWF0Y2hBYm91dEJsYW5rOiB0cnVlLCAvLyBOZWVkZWQgZm9yIGBzcmNkb2NgIGZyYW1lczsgZG9lc24ndCBodXJ0IG5vcm1hbCBwYWdlc1xuICAgICAgICBmcmFtZUlkLFxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBhcnJheU9yVW5kZWZpbmVkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBbdmFsdWVdO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAtLSBJdCBmb2xsb3dzIHRoZSBuYXRpdmUgbmFtaW5nXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5zZXJ0Q1NTKHsgdGFiSWQsIGZyYW1lSWQsIGZpbGVzLCBhbGxGcmFtZXMsIG1hdGNoQWJvdXRCbGFuaywgcnVuQXQsIH0sIHsgaWdub3JlVGFyZ2V0RXJyb3JzIH0gPSB7fSkge1xuICAgIGNvbnN0IGV2ZXJ5SW5zZXJ0aW9uID0gUHJvbWlzZS5hbGwoZmlsZXMubWFwKGFzeW5jIChjb250ZW50KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSB7IGZpbGU6IGNvbnRlbnQgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ290U2NyaXB0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hyb21lLnNjcmlwdGluZy5pbnNlcnRDU1Moe1xuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgICB0YWJJZCxcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVJZHM6IGFycmF5T3JVbmRlZmluZWQoZnJhbWVJZCksXG4gICAgICAgICAgICAgICAgICAgIGFsbEZyYW1lczogZnJhbWVJZCA9PT0gdW5kZWZpbmVkID8gYWxsRnJhbWVzIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmlsZXM6ICdmaWxlJyBpbiBjb250ZW50ID8gW2NvbnRlbnQuZmlsZV0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY3NzOiAnY29kZScgaW4gY29udGVudCA/IGNvbnRlbnQuY29kZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaHJvbWVQLnRhYnMuaW5zZXJ0Q1NTKHRhYklkLCB7XG4gICAgICAgICAgICAuLi5jb250ZW50LFxuICAgICAgICAgICAgbWF0Y2hBYm91dEJsYW5rLFxuICAgICAgICAgICAgYWxsRnJhbWVzLFxuICAgICAgICAgICAgZnJhbWVJZCxcbiAgICAgICAgICAgIHJ1bkF0OiBydW5BdCA/PyAnZG9jdW1lbnRfc3RhcnQnLCAvLyBDU1Mgc2hvdWxkIHByZWZlciBgZG9jdW1lbnRfc3RhcnRgIHdoZW4gdW5zcGVjaWZpZWRcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGlmIChpZ25vcmVUYXJnZXRFcnJvcnMpIHtcbiAgICAgICAgYXdhaXQgY2F0Y2hUYXJnZXRJbmplY3Rpb25FcnJvcnMoZXZlcnlJbnNlcnRpb24pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXdhaXQgZXZlcnlJbnNlcnRpb247XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0Tm9Db2RlKGZpbGVzKSB7XG4gICAgaWYgKGZpbGVzLnNvbWUoY29udGVudCA9PiAnY29kZScgaW4gY29udGVudCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjaHJvbWUuc2NyaXB0aW5nIGRvZXMgbm90IHN1cHBvcnQgaW5qZWN0aW5nIHN0cmluZ3Mgb2YgYGNvZGVgJyk7XG4gICAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVTY3JpcHQoeyB0YWJJZCwgZnJhbWVJZCwgZmlsZXMsIGFsbEZyYW1lcywgbWF0Y2hBYm91dEJsYW5rLCBydW5BdCwgfSwgeyBpZ25vcmVUYXJnZXRFcnJvcnMgfSA9IHt9KSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZEZpbGVzID0gZmlsZXMubWFwKGZpbGUgPT4gdHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnID8geyBmaWxlIH0gOiBmaWxlKTtcbiAgICBpZiAoZ290U2NyaXB0aW5nKSB7XG4gICAgICAgIGFzc2VydE5vQ29kZShub3JtYWxpemVkRmlsZXMpO1xuICAgICAgICBjb25zdCBpbmplY3Rpb24gPSBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgdGFiSWQsXG4gICAgICAgICAgICAgICAgZnJhbWVJZHM6IGFycmF5T3JVbmRlZmluZWQoZnJhbWVJZCksXG4gICAgICAgICAgICAgICAgYWxsRnJhbWVzOiBmcmFtZUlkID09PSB1bmRlZmluZWQgPyBhbGxGcmFtZXMgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlsZXM6IG5vcm1hbGl6ZWRGaWxlcy5tYXAoKHsgZmlsZSB9KSA9PiBmaWxlKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpZ25vcmVUYXJnZXRFcnJvcnMpIHtcbiAgICAgICAgICAgIGF3YWl0IGNhdGNoVGFyZ2V0SW5qZWN0aW9uRXJyb3JzKGluamVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBpbmplY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgcmV0dXJuIGBpbmplY3Rpb25gOyB0aGUgXCJyZXR1cm4gdmFsdWVcIiBvZiBhIGZpbGUgaXMgZ2VuZXJhbGx5IG5vdCB1c2VmdWxcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBEb24ndCB1c2UgLm1hcCgpLCBgY29kZWAgaW5qZWN0aW9ucyBjYW4ndCBiZSBcInBhcmFsbGVsXCJcbiAgICBjb25zdCBleGVjdXRpb25zID0gW107XG4gICAgZm9yIChjb25zdCBjb250ZW50IG9mIG5vcm1hbGl6ZWRGaWxlcykge1xuICAgICAgICAvLyBGaWxlcyBhcmUgZXhlY3V0ZWQgaW4gb3JkZXIsIGJ1dCBgY29kZWAgaXNu4oCZdCwgc28gaXQgbXVzdCBhd2FpdCB0aGUgbGFzdCBzY3JpcHQgYmVmb3JlIGluamVjdGluZyBtb3JlXG4gICAgICAgIGlmICgnY29kZScgaW4gY29udGVudCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3AgLS0gT24gcHVycG9zZSwgc2VlIGFib3ZlXG4gICAgICAgICAgICBhd2FpdCBleGVjdXRpb25zLmF0KC0xKTtcbiAgICAgICAgfVxuICAgICAgICBleGVjdXRpb25zLnB1c2goY2hyb21lUC50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcbiAgICAgICAgICAgIC4uLmNvbnRlbnQsXG4gICAgICAgICAgICBtYXRjaEFib3V0QmxhbmssXG4gICAgICAgICAgICBhbGxGcmFtZXMsXG4gICAgICAgICAgICBmcmFtZUlkLFxuICAgICAgICAgICAgcnVuQXQsXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKGlnbm9yZVRhcmdldEVycm9ycykge1xuICAgICAgICBhd2FpdCBjYXRjaFRhcmdldEluamVjdGlvbkVycm9ycyhQcm9taXNlLmFsbChleGVjdXRpb25zKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChleGVjdXRpb25zKTtcbiAgICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VGFic0J5VXJsKG1hdGNoZXMsIGV4Y2x1ZGVNYXRjaGVzKSB7XG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgZXhjbHVkZSA9IGV4Y2x1ZGVNYXRjaGVzID8gcGF0dGVyblRvUmVnZXgoLi4uZXhjbHVkZU1hdGNoZXMpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHRhYnMgPSBhd2FpdCBjaHJvbWVQLnRhYnMucXVlcnkoeyB1cmw6IG1hdGNoZXMgfSk7XG4gICAgcmV0dXJuIHRhYnNcbiAgICAgICAgLmZpbHRlcih0YWIgPT4gdGFiLmlkICYmIHRhYi51cmwgJiYgKGV4Y2x1ZGUgPyAhZXhjbHVkZS50ZXN0KHRhYi51cmwpIDogdHJ1ZSkpXG4gICAgICAgIC5tYXAodGFiID0+IHRhYi5pZCk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5qZWN0Q29udGVudFNjcmlwdCh3aGVyZSwgc2NyaXB0cywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IGNhc3RBcnJheSh3aGVyZSk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwodGFyZ2V0cy5tYXAoYXN5bmMgKHRhcmdldCkgPT4gaW5qZWN0Q29udGVudFNjcmlwdEluU3BlY2lmaWNUYXJnZXQoY2FzdEFsbEZyYW1lc1RhcmdldCh0YXJnZXQpLCBzY3JpcHRzLCBvcHRpb25zKSkpO1xufVxuYXN5bmMgZnVuY3Rpb24gaW5qZWN0Q29udGVudFNjcmlwdEluU3BlY2lmaWNUYXJnZXQoeyBmcmFtZUlkLCB0YWJJZCwgYWxsRnJhbWVzIH0sIHNjcmlwdHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGluamVjdGlvbnMgPSBjYXN0QXJyYXkoc2NyaXB0cykuZmxhdE1hcChzY3JpcHQgPT4gW1xuICAgICAgICBpbnNlcnRDU1Moe1xuICAgICAgICAgICAgdGFiSWQsXG4gICAgICAgICAgICBmcmFtZUlkLFxuICAgICAgICAgICAgYWxsRnJhbWVzLFxuICAgICAgICAgICAgZmlsZXM6IHNjcmlwdC5jc3MgPz8gW10sXG4gICAgICAgICAgICBtYXRjaEFib3V0Qmxhbms6IHNjcmlwdC5tYXRjaEFib3V0QmxhbmsgPz8gc2NyaXB0Lm1hdGNoX2Fib3V0X2JsYW5rLFxuICAgICAgICAgICAgcnVuQXQ6IHNjcmlwdC5ydW5BdCA/PyBzY3JpcHQucnVuX2F0LFxuICAgICAgICB9LCBvcHRpb25zKSxcbiAgICAgICAgZXhlY3V0ZVNjcmlwdCh7XG4gICAgICAgICAgICB0YWJJZCxcbiAgICAgICAgICAgIGZyYW1lSWQsXG4gICAgICAgICAgICBhbGxGcmFtZXMsXG4gICAgICAgICAgICBmaWxlczogc2NyaXB0LmpzID8/IFtdLFxuICAgICAgICAgICAgbWF0Y2hBYm91dEJsYW5rOiBzY3JpcHQubWF0Y2hBYm91dEJsYW5rID8/IHNjcmlwdC5tYXRjaF9hYm91dF9ibGFuayxcbiAgICAgICAgICAgIHJ1bkF0OiBzY3JpcHQucnVuQXQgPz8gc2NyaXB0LnJ1bl9hdCxcbiAgICAgICAgfSwgb3B0aW9ucyksXG4gICAgXSk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoaW5qZWN0aW9ucyk7XG59XG4vLyBTb3VyY2VkIGZyb206XG4vLyBodHRwczovL3NvdXJjZS5jaHJvbWl1bS5vcmcvY2hyb21pdW0vY2hyb21pdW0vc3JjLysvbWFpbjpleHRlbnNpb25zL2NvbW1vbi9leHRlbnNpb25fdXJscy5jYztkcmM9NmI0MjExNmZlM2IzZDkzYTc3NzUwYmRjYzA3OTQ4ZTk4YTcyODQwNTtsPTI5XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL01vemlsbGEvQWRkLW9ucy9XZWJFeHRlbnNpb25zL0NvbnRlbnRfc2NyaXB0c1xuY29uc3QgYmxvY2tlZFByZWZpeGVzID0gW1xuICAgICdjaHJvbWUuZ29vZ2xlLmNvbS93ZWJzdG9yZScsIC8vIEhvc3QgKmFuZCogcGF0aG5hbWVcbiAgICAnY2hyb21ld2Vic3RvcmUuZ29vZ2xlLmNvbScsXG4gICAgJ2FjY291bnRzLXN0YXRpYy5jZG4ubW96aWxsYS5uZXQnLFxuICAgICdhY2NvdW50cy5maXJlZm94LmNvbScsXG4gICAgJ2FkZG9ucy5jZG4ubW96aWxsYS5uZXQnLFxuICAgICdhZGRvbnMubW96aWxsYS5vcmcnLFxuICAgICdhcGkuYWNjb3VudHMuZmlyZWZveC5jb20nLFxuICAgICdjb250ZW50LmNkbi5tb3ppbGxhLm5ldCcsXG4gICAgJ2Rpc2NvdmVyeS5hZGRvbnMubW96aWxsYS5vcmcnLFxuICAgICdpbnB1dC5tb3ppbGxhLm9yZycsXG4gICAgJ2luc3RhbGwubW96aWxsYS5vcmcnLFxuICAgICdvYXV0aC5hY2NvdW50cy5maXJlZm94LmNvbScsXG4gICAgJ3Byb2ZpbGUuYWNjb3VudHMuZmlyZWZveC5jb20nLFxuICAgICdzdXBwb3J0Lm1vemlsbGEub3JnJyxcbiAgICAnc3luYy5zZXJ2aWNlcy5tb3ppbGxhLmNvbScsXG4gICAgJ3Rlc3RwaWxvdC5maXJlZm94LmNvbScsXG5dO1xuZXhwb3J0IGZ1bmN0aW9uIGlzU2NyaXB0YWJsZVVybCh1cmwpIHtcbiAgICBpZiAoIXVybD8uc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgY2xlYW5VcmwgPSB1cmwucmVwbGFjZSgvXmh0dHBzPzpcXC9cXC8vLCAnJyk7XG4gICAgcmV0dXJuIGJsb2NrZWRQcmVmaXhlcy5ldmVyeShibG9ja2VkID0+ICFjbGVhblVybC5zdGFydHNXaXRoKGJsb2NrZWQpKTtcbn1cbmNvbnN0IHRhcmdldEVycm9ycyA9IC9eTm8gZnJhbWUgd2l0aCBpZCBcXGQrIGluIHRhYiBcXGQrLiR8Xk5vIHRhYiB3aXRoIGlkOiBcXGQrLiR8XlRoZSB0YWIgd2FzIGNsb3NlZC4kfF5UaGUgZnJhbWUgd2FzIHJlbW92ZWQuJC87XG5hc3luYyBmdW5jdGlvbiBjYXRjaFRhcmdldEluamVjdGlvbkVycm9ycyhwcm9taXNlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgT3B0aW9uYWwgY2hhaW5pbmcgaXMgZ29vZCBlbm91Z2hcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXJndW1lbnRcbiAgICAgICAgaWYgKCF0YXJnZXRFcnJvcnMudGVzdChlcnJvcj8ubWVzc2FnZSkpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gTm90IGFsbCBrZXlzIGFyZSBzdXBwb3J0ZWQgYnkgdGhlIHBvbHlmaWxsIHRvIGJlZ2luIHdpdGhcbi8vIG1hdGNoQWJvdXRCbGFuazogaHR0cHM6Ly9naXRodWIuY29tL2ZyZWdhbnRlL2NvbnRlbnQtc2NyaXB0cy1yZWdpc3Rlci1wb2x5ZmlsbC9pc3N1ZXMvMlxuLy8gKkdsb2JzOiBodHRwczovL2dpdGh1Yi5jb20vZnJlZ2FudGUvY29udGVudC1zY3JpcHRzLXJlZ2lzdGVyLXBvbHlmaWxsL2lzc3Vlcy8zNVxuZnVuY3Rpb24gZ2V0RGlmZmVyZW50aWF0b3JzKGMpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoW2MuYWxsX2ZyYW1lcywgYy5leGNsdWRlX21hdGNoZXMsIGMucnVuX2F0XSk7XG59XG4vKipcbkV4Y2x1ZGUgc2FtZS1maWxlIGluamVjdGlvbnMgZnJvbSBhIG1hbmlmZXN0IGBjb250ZW50X3NjcmlwdGAgYXJyYXkgZHVlIHRvIGEgY2hhbmdlIGluIHRoZSBwb2x5ZmlsbC5cbmh0dHBzOi8vZ2l0aHViLmNvbS9mcmVnYW50ZS93ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdHMvaXNzdWVzLzYyXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGV4Y2x1ZGVEdXBsaWNhdGVGaWxlcyhjb250ZW50U2NyaXB0cywgeyB3YXJuID0gdHJ1ZSB9ID0ge30pIHtcbiAgICBjb25zdCB1bmlxdWVzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGZpbHRlcldhcm5BbmRBZGQgPSAoZmlsZXMsIGNvbnRleHQpID0+IHtcbiAgICAgICAgaWYgKCFmaWxlcykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxlcy5maWx0ZXIoZmlsZSA9PiB7XG4gICAgICAgICAgICAvLyBJZiBhIGNvbnRlbnQgc2NyaXB0IGhhcyB0aGUgc2FtZSBvcHRpb25zLCB0aGVuIGl0J3MgMTAwJSBkdXBsaWNhdGUgYW5kIHNhZmUgdG8gcmVtb3ZlLlxuICAgICAgICAgICAgLy8gSWYgaXQgZG9lc24ndCBoYXZlIHRoZSBzYW1lIG9wdGlvbnMsIHRoZW4gcmVtb3ZpbmcgaXQgY2FuIGNhdXNlIGlzc3Vlcy5cbiAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVudGlhdG9ycyA9IGdldERpZmZlcmVudGlhdG9ycyhjb250ZXh0KTtcbiAgICAgICAgICAgIC8vIEV4Y2x1ZGUgZmlsZXMgZnJvbSBjdXJyZW50IHNjcmlwdCBpZiB0aGV5IHdlcmUgYWxyZWFkeSBpbmplY3RlZCBieSBhbm90aGVyIHNjcmlwdFxuICAgICAgICAgICAgaWYgKHVuaXF1ZXMuaGFzKGZpbGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gV2FybiB0aGUgdXNlciBpbiBjYXNlIHRoaXMgcmVtb3ZhbCBjaGFuZ2VzIHRoZSBiZWhhdmlvciBmcm9tIHdoYXQncyBleHBlY3RlZFxuICAgICAgICAgICAgICAgIGlmICh3YXJuICYmIGRpZmZlcmVudGlhdG9ycyAhPT0gdW5pcXVlcy5nZXQoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBEdXBsaWNhdGUgZmlsZSBpbiB0aGUgbWFuaWZlc3QgY29udGVudF9zY3JpcHRzOiAke2ZpbGV9IFxcbk1vcmUgaW5mbzogaHR0cHM6Ly9naXRodWIuY29tL2ZyZWdhbnRlL3dlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0cy9pc3N1ZXMvNjJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdW5pcXVlcy5zZXQoZmlsZSwgZGlmZmVyZW50aWF0b3JzKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBjb250ZW50U2NyaXB0cy5mbGF0TWFwKGNvbnRlbnRTY3JpcHQgPT4ge1xuICAgICAgICAvLyBUbyBhdm9pZCBjb25mdXNpb24sIGRyb3AgdGhlIGBtYXRjaGVzYCBhcnJheSBzaW5jZSBpdCdzIG5vdCB1c2VkIGJ5IGB3ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdHNgXG4gICAgICAgIGNvbnN0IHsgbWF0Y2hlcywgLi4uY2xlYW5Db250ZW50U2NyaXB0IH0gPSBjb250ZW50U2NyaXB0O1xuICAgICAgICBjb25zdCByZXN1bHQgPSAoe1xuICAgICAgICAgICAgLi4uY2xlYW5Db250ZW50U2NyaXB0LFxuICAgICAgICAgICAganM6IGZpbHRlcldhcm5BbmRBZGQoY29udGVudFNjcmlwdC5qcywgY29udGVudFNjcmlwdCksXG4gICAgICAgICAgICBjc3M6IGZpbHRlcldhcm5BbmRBZGQoY29udGVudFNjcmlwdC5jc3MsIGNvbnRlbnRTY3JpcHQpLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gRHJvcCBlbnRpcmUgYmxvY2sgaWYgY29tcGxldGUgZHVwbGljYXRlICh0aGUgYG1hdGNoZXNgIGFycmF5IGNvdWxkIGJlIGRpZmZlcmVudCwgYnV0IHRoYXQgZG9lc24ndCBtYXR0ZXIgaW4gYHdlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0c2ApXG4gICAgICAgIHJldHVybiByZXN1bHQuY3NzLmxlbmd0aCArIHJlc3VsdC5qcy5sZW5ndGggPT09IDAgPyBbXSA6IHJlc3VsdDtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGluaXQgfSBmcm9tICcuL2xpYi5qcyc7XG52b2lkIGluaXQoKTtcbiIsImltcG9ydCB7IGdldFRhYnNCeVVybCwgaW5qZWN0Q29udGVudFNjcmlwdCB9IGZyb20gJ3dlYmV4dC1jb250ZW50LXNjcmlwdHMnO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluamVjdFRvRXhpc3RpbmdUYWJzKG9yaWdpbnMsIHNjcmlwdHMpIHtcbiAgICBjb25zdCBleGNsdWRlTWF0Y2hlcyA9IHNjcmlwdHMuZmxhdE1hcChzY3JpcHQgPT4gc2NyaXB0Lm1hdGNoZXMgPz8gW10pO1xuICAgIHJldHVybiBpbmplY3RDb250ZW50U2NyaXB0KGF3YWl0IGdldFRhYnNCeVVybChvcmlnaW5zLCBleGNsdWRlTWF0Y2hlcyksIHNjcmlwdHMsIHsgaWdub3JlVGFyZ2V0RXJyb3JzOiB0cnVlIH0pO1xufVxuIiwiaW1wb3J0IHsgZ2V0QWRkaXRpb25hbFBlcm1pc3Npb25zIH0gZnJvbSAnd2ViZXh0LWFkZGl0aW9uYWwtcGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgZXhjbHVkZUR1cGxpY2F0ZUZpbGVzIH0gZnJvbSAnLi9kZWR1cGxpY2F0b3IuanMnO1xuaW1wb3J0IHsgaW5qZWN0VG9FeGlzdGluZ1RhYnMgfSBmcm9tICcuL2luamVjdC10by1leGlzdGluZy10YWJzLmpzJztcbmltcG9ydCB7IHJlZ2lzdGVyQ29udGVudFNjcmlwdCB9IGZyb20gJy4vcmVnaXN0ZXItY29udGVudC1zY3JpcHQtc2hpbS5qcyc7XG5jb25zdCByZWdpc3RlcmVkU2NyaXB0cyA9IG5ldyBNYXAoKTtcbi8vIEluIEZpcmVmb3gsIHBhdGhzIGluIHRoZSBtYW5pZmVzdCBhcmUgY29udmVydGVkIHRvIGZ1bGwgVVJMcyB1bmRlciBgbW96LWV4dGVuc2lvbjovL2AgYnV0IGJyb3dzZXIuY29udGVudFNjcmlwdHMgZXhwZWN0cyBleGNsdXNpdmVseSByZWxhdGl2ZSBwYXRoc1xuZnVuY3Rpb24gbWFrZVBhdGhSZWxhdGl2ZShmaWxlKSB7XG4gICAgcmV0dXJuIG5ldyBVUkwoZmlsZSwgbG9jYXRpb24ub3JpZ2luKS5wYXRobmFtZTtcbn1cbi8vIEF1dG9tYXRpY2FsbHkgcmVnaXN0ZXIgdGhlIGNvbnRlbnQgc2NyaXB0cyBvbiB0aGUgbmV3IG9yaWdpbnNcbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyT25PcmlnaW5zKHsgb3JpZ2luczogbmV3T3JpZ2lucywgfSkge1xuICAgIGNvbnN0IHsgY29udGVudF9zY3JpcHRzOiByYXdNYW5pZmVzdCwgbWFuaWZlc3RfdmVyc2lvbjogbWFuaWZlc3RWZXJzaW9uIH0gPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpO1xuICAgIGlmICghcmF3TWFuaWZlc3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd3ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdHMgdHJpZWQgdG8gcmVnaXN0ZXIgc2NyaXB0cyBvbiB0aGUgbmV3IGhvc3QgcGVybWlzc2lvbnMsIGJ1dCBubyBjb250ZW50IHNjcmlwdHMgd2VyZSBmb3VuZCBpbiB0aGUgbWFuaWZlc3QuJyk7XG4gICAgfVxuICAgIGNvbnN0IGNsZWFuTWFuaWZlc3QgPSBleGNsdWRlRHVwbGljYXRlRmlsZXMocmF3TWFuaWZlc3QsIHsgd2FybjogbWFuaWZlc3RWZXJzaW9uID09PSAyIH0pO1xuICAgIC8vIFJlZ2lzdGVyIG9uZSBhdCBhIHRpbWUgdG8gYWxsb3cgcmVtb3Zpbmcgb25lIGF0IGEgdGltZSBhcyB3ZWxsXG4gICAgZm9yIChjb25zdCBvcmlnaW4gb2YgbmV3T3JpZ2lucyB8fCBbXSkge1xuICAgICAgICBmb3IgKGNvbnN0IGNvbmZpZyBvZiBjbGVhbk1hbmlmZXN0KSB7XG4gICAgICAgICAgICBjb25zdCByZWdpc3RlcmVkU2NyaXB0ID0gcmVnaXN0ZXJDb250ZW50U2NyaXB0KHtcbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgY29udmVydCBwYXRocyBoZXJlIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB3aGV0aGVyIEZpcmVmb3ggTVYzIHdpbGwgYWNjZXB0IGZ1bGwgVVJMc1xuICAgICAgICAgICAgICAgIGpzOiBjb25maWcuanM/Lm1hcChmaWxlID0+IG1ha2VQYXRoUmVsYXRpdmUoZmlsZSkpLFxuICAgICAgICAgICAgICAgIGNzczogY29uZmlnLmNzcz8ubWFwKGZpbGUgPT4gbWFrZVBhdGhSZWxhdGl2ZShmaWxlKSksXG4gICAgICAgICAgICAgICAgYWxsRnJhbWVzOiBjb25maWcuYWxsX2ZyYW1lcyxcbiAgICAgICAgICAgICAgICBtYXRjaGVzOiBbb3JpZ2luXSxcbiAgICAgICAgICAgICAgICBleGNsdWRlTWF0Y2hlczogY29uZmlnLm1hdGNoZXMsXG4gICAgICAgICAgICAgICAgcnVuQXQ6IGNvbmZpZy5ydW5fYXQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlZ2lzdGVyZWRTY3JpcHRzLnNldChvcmlnaW4sIHJlZ2lzdGVyZWRTY3JpcHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIE1heSBub3QgYmUgbmVlZGVkIGluIHRoZSBmdXR1cmUgaW4gRmlyZWZveFxuICAgIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0NTg5NDdcbiAgICB2b2lkIGluamVjdFRvRXhpc3RpbmdUYWJzKG5ld09yaWdpbnMgfHwgW10sIGNsZWFuTWFuaWZlc3QpO1xufVxuZnVuY3Rpb24gaGFuZGxlTmV3UGVybWlzc2lvbnMocGVybWlzc2lvbnMpIHtcbiAgICBpZiAocGVybWlzc2lvbnMub3JpZ2lucyAmJiBwZXJtaXNzaW9ucy5vcmlnaW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdm9pZCByZWdpc3Rlck9uT3JpZ2lucyhwZXJtaXNzaW9ucyk7XG4gICAgfVxufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlZERyb3BwZWRQZXJtaXNzaW9ucyh7IG9yaWdpbnMgfSkge1xuICAgIGlmICghb3JpZ2lucyB8fCBvcmlnaW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3QgW29yaWdpbiwgc2NyaXB0UHJvbWlzZV0gb2YgcmVnaXN0ZXJlZFNjcmlwdHMpIHtcbiAgICAgICAgaWYgKG9yaWdpbnMuaW5jbHVkZXMob3JpZ2luKSkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGF3YWl0IHNjcmlwdFByb21pc2U7XG4gICAgICAgICAgICB2b2lkIHNjcmlwdC51bnJlZ2lzdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBjaHJvbWUucGVybWlzc2lvbnMub25SZW1vdmVkLmFkZExpc3RlbmVyKGhhbmRsZWREcm9wcGVkUGVybWlzc2lvbnMpO1xuICAgIGNocm9tZS5wZXJtaXNzaW9ucy5vbkFkZGVkLmFkZExpc3RlbmVyKGhhbmRsZU5ld1Blcm1pc3Npb25zKTtcbiAgICBhd2FpdCByZWdpc3Rlck9uT3JpZ2lucyhhd2FpdCBnZXRBZGRpdGlvbmFsUGVybWlzc2lvbnMoe1xuICAgICAgICBzdHJpY3RPcmlnaW5zOiBmYWxzZSxcbiAgICB9KSk7XG59XG4iLCJpbXBvcnQgcmVnaXN0ZXJDb250ZW50U2NyaXB0UG9ueWZpbGwgZnJvbSAnY29udGVudC1zY3JpcHRzLXJlZ2lzdGVyLXBvbHlmaWxsL3BvbnlmaWxsLmpzJztcbmV4cG9ydCBjb25zdCBjaHJvbWVSZWdpc3RlciA9IGdsb2JhbFRoaXMuY2hyb21lPy5zY3JpcHRpbmc/LnJlZ2lzdGVyQ29udGVudFNjcmlwdHM7XG5leHBvcnQgY29uc3QgZmlyZWZveFJlZ2lzdGVyID0gZ2xvYmFsVGhpcy5icm93c2VyPy5jb250ZW50U2NyaXB0cz8ucmVnaXN0ZXI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJDb250ZW50U2NyaXB0KGNvbnRlbnRTY3JpcHQpIHtcbiAgICBpZiAoY2hyb21lUmVnaXN0ZXIpIHtcbiAgICAgICAgY29uc3QgaWQgPSAnd2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHQtJyArIEpTT04uc3RyaW5naWZ5KGNvbnRlbnRTY3JpcHQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgY2hyb21lUmVnaXN0ZXIoW3tcbiAgICAgICAgICAgICAgICAgICAgLi4uY29udGVudFNjcmlwdCxcbiAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKCFlcnJvcj8ubWVzc2FnZS5zdGFydHNXaXRoKCdEdXBsaWNhdGUgc2NyaXB0IElEJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdW5yZWdpc3RlcjogYXN5bmMgKCkgPT4gY2hyb21lLnNjcmlwdGluZy51bnJlZ2lzdGVyQ29udGVudFNjcmlwdHMoeyBpZHM6IFtpZF0gfSksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGZpcmVmb3hDb250ZW50U2NyaXB0ID0ge1xuICAgICAgICAuLi5jb250ZW50U2NyaXB0LFxuICAgICAgICBqczogY29udGVudFNjcmlwdC5qcz8ubWFwKGZpbGUgPT4gKHsgZmlsZSB9KSksXG4gICAgICAgIGNzczogY29udGVudFNjcmlwdC5jc3M/Lm1hcChmaWxlID0+ICh7IGZpbGUgfSkpLFxuICAgIH07XG4gICAgaWYgKGZpcmVmb3hSZWdpc3Rlcikge1xuICAgICAgICByZXR1cm4gZmlyZWZveFJlZ2lzdGVyKGZpcmVmb3hDb250ZW50U2NyaXB0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyQ29udGVudFNjcmlwdFBvbnlmaWxsKGZpcmVmb3hDb250ZW50U2NyaXB0KTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vb24tY29udGV4dC1pbnZhbGlkYXRlZC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29uLWV4dGVuc2lvbi1zdGFydC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29uZS1ldmVudC5qcyc7XG4iLCJjbGFzcyBPbkNvbnRleHRJbnZhbGlkYXRlZCB7XG4gICAgI3RpbWVyO1xuICAgICNjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIC8vIENhbGxpbmcgdGhpcyB3aWxsIHN0YXJ0IHRoZSBwb2xsaW5nXG4gICAgZ2V0IHNpZ25hbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuI3RpbWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4jY29udHJvbGxlci5zaWduYWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4jdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2FzQ29udGV4dEludmFsaWRhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiNjb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLiN0aW1lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7XG4gICAgICAgIHJldHVybiB0aGlzLiNjb250cm9sbGVyLnNpZ25hbDtcbiAgICB9XG4gICAgZ2V0IHByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXIocmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAgICAgICAgIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGNvbnRleHQgaXMgaW52YWxpZGF0ZWRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5zaWduYWwgICBUaGUgc2lnbmFsIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIsIGxpa2Ugd2l0aCB0aGUgcmVndWxhciBgYWRkRXZlbnRMaXN0ZW5lcigpYFxuICAgICAqL1xuICAgIGFkZExpc3RlbmVyKGNhbGxiYWNrLCB7IHNpZ25hbCB9ID0ge30pIHtcbiAgICAgICAgaWYgKHRoaXMuc2lnbmFsLmFib3J0ZWQgJiYgIXNpZ25hbD8uYWJvcnRlZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBjYWxsYmFjaywgeyBvbmNlOiB0cnVlLCBzaWduYWwgfSk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IG9uQ29udGV4dEludmFsaWRhdGVkID0gbmV3IE9uQ29udGV4dEludmFsaWRhdGVkKCk7XG5leHBvcnQgY29uc3Qgd2FzQ29udGV4dEludmFsaWRhdGVkID0gKCkgPT4gIWNocm9tZS5ydW50aW1lPy5pZDtcbi8vIFRoaXMgaXMgZG9uZSB0byBlbnN1cmUgZWFjaCBsaXN0ZW5lciBhbmQgYWJvcnRzaWduYWwgYXJlIGluZGVwZW5kZW50IGluIGVhY2ggdGVzdFxuZXhwb3J0IGNvbnN0IF90ZXN0aW5nID0gT25Db250ZXh0SW52YWxpZGF0ZWQ7XG4iLCJpbXBvcnQgeyBpc0Nocm9tZSwgaXNQZXJzaXN0ZW50QmFja2dyb3VuZFBhZ2UgfSBmcm9tICd3ZWJleHQtZGV0ZWN0LXBhZ2UnO1xuY29uc3Qgc3RvcmFnZUtleSA9ICdfX3dlYmV4dC1ldmVudHNfX3N0YXJ0dXAnO1xuY29uc3QgZXZlbnQgPSBuZXcgRXZlbnRUYXJnZXQoKTtcbmxldCBoYXNSdW4gPSBmYWxzZTtcbmxldCBoYXNMaXN0ZW5lcnMgPSBmYWxzZTtcbi8vIEB0cy1leHBlY3QtZXJyb3IgTm8gbmVlZCB0byBsb2FkIGBicm93c2VyYCB0eXBlcyB5ZXRcbmNvbnN0IGJyb3dzZXJTdG9yYWdlID0gZ2xvYmFsVGhpcy5icm93c2VyPy5zdG9yYWdlID8/IGdsb2JhbFRoaXMuY2hyb21lPy5zdG9yYWdlO1xuYXN5bmMgZnVuY3Rpb24gcnVubmVyKCkge1xuICAgIGhhc1J1biA9IHRydWU7XG4gICAgaWYgKCFoYXNMaXN0ZW5lcnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNQZXJzaXN0ZW50QmFja2dyb3VuZFBhZ2UoKSkge1xuICAgICAgICAvLyBJdCdzIGNlcnRhaW5seSB0aGUgZmlyc3QgYW5kIG9ubHkgdGltZVxuICAgICAgICBldmVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnZXh0ZW5zaW9uLXN0YXJ0JykpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghYnJvd3NlclN0b3JhZ2U/LnNlc3Npb24pIHtcbiAgICAgICAgaWYgKGlzQ2hyb21lKCkgJiYgY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5tYW5pZmVzdF92ZXJzaW9uID09PSAyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ29uRXh0ZW5zaW9uU3RhcnQgaXMgdW5hYmxlIHRvIGRldGVybWluZSB3aGV0aGVyIGl04oCZcyBiZWluZyBydW4gZm9yIHRoZSBmaXJzdCB0aW1lIG9uIE1WMiBFdmVudCBQYWdlcyBpbiBDaHJvbWUuIEl0IHdpbGwgcnVuIHRoZSBsaXN0ZW5lcnMgYW55d2F5LicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdvbkV4dGVuc2lvblN0YXJ0IGlzIHVuYWJsZSB0byBkZXRlcm1pbmUgd2hldGhlciBpdOKAmXMgYmVpbmcgcnVuIGZvciB0aGUgZmlyc3QgdGltZSB3aXRob3V0IHRoZSBgc3RvcmFnZWAgcGVybWlzc2lvbi4gSXQgd2lsbCBydW4gdGhlIGxpc3RlbmVycyBhbnl3YXknKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnZXh0ZW5zaW9uLXN0YXJ0JykpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHN0b3JhZ2UgPSBhd2FpdCBicm93c2VyU3RvcmFnZS5zZXNzaW9uLmdldChzdG9yYWdlS2V5KTtcbiAgICBpZiAoc3RvcmFnZUtleSBpbiBzdG9yYWdlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgYnJvd3NlclN0b3JhZ2Uuc2Vzc2lvbi5zZXQoeyBbc3RvcmFnZUtleV06IHRydWUgfSk7XG4gICAgZXZlbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2V4dGVuc2lvbi1zdGFydCcpKTtcbn1cbmV4cG9ydCBjb25zdCBvbkV4dGVuc2lvblN0YXJ0ID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgYWRkTGlzdGVuZXIoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGhhc1J1bikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdvbkV4dGVuc2lvblN0YXJ0LmFkZExpc3RlbmVyKCkgd2FzIGNhbGxlZCBhZnRlciB0aGUgZXh0ZW5zaW9uIHN0YXJ0ZWQuIFRoZSBjYWxsYmFjayB3aWxsIG5vdCBiZSBjYWxsZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoYXNMaXN0ZW5lcnMgPSB0cnVlO1xuICAgICAgICAgICAgZXZlbnQuYWRkRXZlbnRMaXN0ZW5lcignZXh0ZW5zaW9uLXN0YXJ0JywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVMaXN0ZW5lcihjYWxsYmFjaykge1xuICAgICAgICBldmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdleHRlbnNpb24tc3RhcnQnLCBjYWxsYmFjayk7XG4gICAgfSxcbn0pO1xuLy8gQXV0b21hdGljYWxseSByZWdpc3RlciB0aGUgcnVubmVyXG5zZXRUaW1lb3V0KHJ1bm5lciwgMTAwKTtcbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBvbmVFdmVudChldmVudCwgZmlsdGVyKSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIC8vIFRPRE86IFZvaWRGdW5jdGlvbiBzaG91bGQgbm90IGJlIG5lY2Vzc2FyeSwgaXQncyBlcXVpdmFsZW50IHRvIHVzaW5nIFwiYW55XCJcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSAoLi4ucGFyYW1ldGVycykgPT4ge1xuICAgICAgICAgICAgaWYgKCFmaWx0ZXIgfHwgZmlsdGVyKC4uLnBhcmFtZXRlcnMpKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH0pO1xufVxuIiwibGV0IGNhY2hlID0gdHJ1ZTtcbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlV2ViZXh0RGV0ZWN0UGFnZUNhY2hlKCkge1xuICAgIGNhY2hlID0gZmFsc2U7XG59XG5mdW5jdGlvbiBpc0N1cnJlbnRQYXRobmFtZShwYXRoKSB7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBwYXRobmFtZSB9ID0gbmV3IFVSTChwYXRoLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgICAgICByZXR1cm4gcGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRNYW5pZmVzdChfdmVyc2lvbikge1xuICAgIHJldHVybiBnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZT8uZ2V0TWFuaWZlc3Q/LigpO1xufVxuZnVuY3Rpb24gb25jZShmdW5jdGlvbl8pIHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICghY2FjaGUgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmN0aW9uXygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gb24gaHR0cChzKTovLyBwYWdlcyAoaXQgY291bGQgYmUgaW4gYSBjb250ZW50IHNjcmlwdCBvciByZWd1bGFyIHdlYiBjb250ZXh0KSAqL1xuZXhwb3J0IGNvbnN0IGlzV2ViUGFnZSA9IG9uY2UoKCkgPT4gWydhYm91dDonLCAnaHR0cDonLCAnaHR0cHM6J10uaW5jbHVkZXMobG9jYXRpb24ucHJvdG9jb2wpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gZXh0ZW5zaW9uIGNvbnRleHRzIHRoYXQgaGF2ZSBhY2Nlc3MgdG8gdGhlIGNocm9tZSBBUEkgKi9cbmV4cG9ydCBjb25zdCBpc0V4dGVuc2lvbkNvbnRleHQgPSBvbmNlKCgpID0+IHR5cGVvZiBnbG9iYWxUaGlzLmNocm9tZT8uZXh0ZW5zaW9uID09PSAnb2JqZWN0Jyk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgY29udGVudCBzY3JpcHQgKi9cbmV4cG9ydCBjb25zdCBpc0NvbnRlbnRTY3JpcHQgPSBvbmNlKCgpID0+IGlzRXh0ZW5zaW9uQ29udGV4dCgpICYmIGlzV2ViUGFnZSgpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIGNvbnRleHQgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmQgPSAoKSA9PiBpc0JhY2tncm91bmRQYWdlKCkgfHwgaXNCYWNrZ3JvdW5kV29ya2VyKCk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgYmFja2dyb3VuZCBwYWdlICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGNvbnN0IG1hbmlmZXN0ID0gZ2V0TWFuaWZlc3QoMik7XG4gICAgaWYgKG1hbmlmZXN0XG4gICAgICAgICYmIGlzQ3VycmVudFBhdGhuYW1lKG1hbmlmZXN0LmJhY2tncm91bmRfcGFnZSA/PyBtYW5pZmVzdC5iYWNrZ3JvdW5kPy5wYWdlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIEJvb2xlYW4obWFuaWZlc3Q/LmJhY2tncm91bmQ/LnNjcmlwdHNcbiAgICAgICAgJiYgaXNDdXJyZW50UGF0aG5hbWUoJy9fZ2VuZXJhdGVkX2JhY2tncm91bmRfcGFnZS5odG1sJykpO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgYmFja2dyb3VuZCB3b3JrZXIgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmRXb3JrZXIgPSBvbmNlKCgpID0+IGlzQ3VycmVudFBhdGhuYW1lKGdldE1hbmlmZXN0KDMpPy5iYWNrZ3JvdW5kPy5zZXJ2aWNlX3dvcmtlcikpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIHBlcnNpc3RlbnQgYmFja2dyb3VuZCBwYWdlIChhcyBvcHBvc2VkIHRvIGFuIEV2ZW50IFBhZ2Ugb3IgQmFja2dyb3VuZCBXb3JrZXIsIGJvdGggb2Ygd2hpY2ggY2FuIGJlIHVubG9hZGVkIGJ5IHRoZSBicm93c2VyKSAqL1xuZXhwb3J0IGNvbnN0IGlzUGVyc2lzdGVudEJhY2tncm91bmRQYWdlID0gb25jZSgoKSA9PiBpc0JhY2tncm91bmRQYWdlKClcbiAgICAmJiBnZXRNYW5pZmVzdCgyKT8ubWFuaWZlc3RfdmVyc2lvbiA9PT0gMiAvLyBGaXJlZm94IGNhbiBoYXZlIGEgYmFja2dyb3VuZCBwYWdlIG9uIE1WMywgYnV0IGNhbid0IGJlIHBlcnNpc3RlbnRcbiAgICAmJiBnZXRNYW5pZmVzdCgyKT8uYmFja2dyb3VuZD8ucGVyc2lzdGVudCAhPT0gZmFsc2UpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhbiBvcHRpb25zIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gICovXG5leHBvcnQgY29uc3QgaXNPcHRpb25zUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBnZXRNYW5pZmVzdCgpPy5vcHRpb25zX3VpPy5wYWdlO1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYW4gb3B0aW9ucyBwYWdlLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCAqL1xuZXhwb3J0IGNvbnN0IGlzU2lkZVBhbmVsID0gb25jZSgoKSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudCAtLSBOb3QgeWV0IGluIEB0eXBlcy9jaHJvbWVcbiAgICBjb25zdCBwYXRoID0gZ2V0TWFuaWZlc3QoMyk/Llsnc2lkZV9wYW5lbCddPy5kZWZhdWx0X3BhdGg7XG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGF0aCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICByZXR1cm4gdXJsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGRldiB0b29scyBwYWdlLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCBgZGV2dG9vbHNfcGFnZWAgZmllbGQuICovXG5leHBvcnQgY29uc3QgaXNEZXZUb29sc1BhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBjb25zdCBkZXZ0b29sc1BhZ2UgPSBpc0V4dGVuc2lvbkNvbnRleHQoKSAmJiBjaHJvbWUuZGV2dG9vbHMgJiYgZ2V0TWFuaWZlc3QoKT8uZGV2dG9vbHNfcGFnZTtcbiAgICBpZiAodHlwZW9mIGRldnRvb2xzUGFnZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGRldnRvb2xzUGFnZSwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICByZXR1cm4gdXJsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiB0aGUgZGV2IHRvb2xzIHBhZ2UuIFVubGlrZSBgaXNEZXZUb29sc1BhZ2VgLCB0aGlzIHdvcmtzIGluIGFueSBwYWdlIHRoYXQgaGFzIHRoZSBgY2hyb21lLmRldlRvb2xzYCBBUEkgKi9cbmV4cG9ydCBjb25zdCBpc0RldlRvb2xzID0gKCkgPT4gQm9vbGVhbihnbG9iYWxUaGlzLmNocm9tZT8uZGV2dG9vbHMpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IEZpcmVmb3ggdmlhIHVzZXIgYWdlbnQgKi9cbmV4cG9ydCBjb25zdCBpc0ZpcmVmb3ggPSAoKSA9PiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdGaXJlZm94Jyk7XG4vKiogTG9vc2VseSBkZXRlY3QgQ2hyb21lIHZpYSB1c2VyIGFnZW50IChtaWdodCBhbHNvIGluY2x1ZGUgQ2hyb21pdW0gYW5kIGZvcmtzIGxpa2UgT3BlcmEpICovXG5leHBvcnQgY29uc3QgaXNDaHJvbWUgPSAoKSA9PiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdDaHJvbWUnKTtcbi8qKiBMb29zZWx5IGRldGVjdCBTYWZhcmkgdmlhIHVzZXIgYWdlbnQgKi9cbmV4cG9ydCBjb25zdCBpc1NhZmFyaSA9ICgpID0+ICFpc0Nocm9tZSgpICYmIGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ1NhZmFyaScpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IE1vYmlsZSBTYWZhcmkgdmlhIHVzZXIgYWdlbnQgKi9cbmV4cG9ydCBjb25zdCBpc01vYmlsZVNhZmFyaSA9ICgpID0+IGlzU2FmYXJpKCkgJiYgZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnTW9iaWxlJyk7XG5jb25zdCBjb250ZXh0Q2hlY2tzID0ge1xuICAgIGNvbnRlbnRTY3JpcHQ6IGlzQ29udGVudFNjcmlwdCxcbiAgICBiYWNrZ3JvdW5kOiBpc0JhY2tncm91bmQsXG4gICAgb3B0aW9uczogaXNPcHRpb25zUGFnZSxcbiAgICBzaWRlUGFuZWw6IGlzU2lkZVBhbmVsLFxuICAgIGRldlRvb2xzOiBpc0RldlRvb2xzLFxuICAgIGRldlRvb2xzUGFnZTogaXNEZXZUb29sc1BhZ2UsXG4gICAgZXh0ZW5zaW9uOiBpc0V4dGVuc2lvbkNvbnRleHQsXG4gICAgd2ViOiBpc1dlYlBhZ2UsXG59O1xuZXhwb3J0IGNvbnN0IGNvbnRleHROYW1lcyA9IE9iamVjdC5rZXlzKGNvbnRleHRDaGVja3MpO1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRleHROYW1lKCkge1xuICAgIGZvciAoY29uc3QgW25hbWUsIHRlc3RdIG9mIE9iamVjdC5lbnRyaWVzKGNvbnRleHRDaGVja3MpKSB7XG4gICAgICAgIGlmICh0ZXN0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAndW5rbm93bic7XG59XG4iLCJpbXBvcnQgZXNjYXBlU3RyaW5nUmVnZXhwIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcbi8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL2dlY2tvLWRldi9ibG9iLzA3M2NjMjRmNTNkMGNmMzE0MDMxMjFkNzY4ODEyMTQ2ZTU5N2NjOWQvdG9vbGtpdC9jb21wb25lbnRzL2V4dGVuc2lvbnMvc2NoZW1hcy9tYW5pZmVzdC5qc29uI0w0ODctTDQ5MVxuZXhwb3J0IGNvbnN0IHBhdHRlcm5WYWxpZGF0aW9uUmVnZXggPSAvXihodHRwcz98d3NzP3xmaWxlfGZ0cHxcXCopOlxcL1xcLyhcXCp8XFwqXFwuW14qL10rfFteKi9dKylcXC8uKiR8XmZpbGU6XFwvXFwvXFwvLiokfF5yZXNvdXJjZTpcXC9cXC8oXFwqfFxcKlxcLlteKi9dK3xbXiovXSspXFwvLiokfF5hYm91dDovO1xuY29uc3QgaXNGaXJlZm94ID0gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnRmlyZWZveC8nKTtcbmV4cG9ydCBjb25zdCBhbGxTdGFyc1JlZ2V4ID0gaXNGaXJlZm94XG4gICAgPyAvXihodHRwcz98d3NzPyk6Wy9dWy9dW14vXSsoWy9dLiopPyQvXG4gICAgOiAvXmh0dHBzPzpbL11bL11bXi9dKyhbL10uKik/JC87XG5leHBvcnQgY29uc3QgYWxsVXJsc1JlZ2V4ID0gL14oaHR0cHM/fGZpbGV8ZnRwKTpbL10rLztcbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRWYWxpZFBhdHRlcm4obWF0Y2hQYXR0ZXJuKSB7XG4gICAgaWYgKCFpc1ZhbGlkUGF0dGVybihtYXRjaFBhdHRlcm4pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtYXRjaFBhdHRlcm4gKyAnIGlzIGFuIGludmFsaWQgcGF0dGVybiwgaXQgbXVzdCBtYXRjaCAnICsgU3RyaW5nKHBhdHRlcm5WYWxpZGF0aW9uUmVnZXgpKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFBhdHRlcm4obWF0Y2hQYXR0ZXJuKSB7XG4gICAgcmV0dXJuIG1hdGNoUGF0dGVybiA9PT0gJzxhbGxfdXJscz4nIHx8IHBhdHRlcm5WYWxpZGF0aW9uUmVnZXgudGVzdChtYXRjaFBhdHRlcm4pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRvZXNVcmxNYXRjaFBhdHRlcm5zKHVybCwgLi4ubWF0Y2hQYXR0ZXJuKSB7XG4gICAgaWYgKG1hdGNoUGF0dGVybi5pbmNsdWRlcygnPGFsbF91cmxzPicpICYmIGFsbFVybHNSZWdleC50ZXN0KHVybCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChtYXRjaFBhdHRlcm4uaW5jbHVkZXMoJyo6Ly8qLyonKSAmJiBhbGxTdGFyc1JlZ2V4LnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwYXR0ZXJuIG9mIG1hdGNoUGF0dGVybikge1xuICAgICAgICBpZiAocGF0dGVyblRvUmVnZXgocGF0dGVybikudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBnZXRSYXdQYXR0ZXJuUmVnZXgobWF0Y2hQYXR0ZXJuKSB7XG4gICAgYXNzZXJ0VmFsaWRQYXR0ZXJuKG1hdGNoUGF0dGVybik7XG4gICAgLy8gSG9zdCB1bmRlZmluZWQgZm9yIGZpbGU6Ly8vXG4gICAgbGV0IFssIHByb3RvY29sLCBob3N0ID0gJycsIHBhdGhuYW1lXSA9IG1hdGNoUGF0dGVybi5zcGxpdCgvKF5bXjpdKzpbL11bL10pKFteL10rKT8vKTtcbiAgICBwcm90b2NvbCA9IHByb3RvY29sXG4gICAgICAgIC5yZXBsYWNlKCcqJywgaXNGaXJlZm94ID8gJyhodHRwcz98d3NzPyknIDogJ2h0dHBzPycpIC8vIFByb3RvY29sIHdpbGRjYXJkXG4gICAgICAgIC5yZXBsYWNlQWxsKC9bL10vZywgJ1svXScpOyAvLyBFc2NhcGUgc2xhc2hlc1xuICAgIGlmIChob3N0ID09PSAnKicpIHtcbiAgICAgICAgaG9zdCA9ICdbXi9dKyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhvc3QpIHtcbiAgICAgICAgaG9zdCA9IGhvc3RcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eWypdWy5dLywgJyhbXi9dKy4pKicpIC8vIEluaXRpYWwgd2lsZGNhcmRcbiAgICAgICAgICAgIC5yZXBsYWNlQWxsKC9bLl0vZywgJ1suXScpIC8vIEVzY2FwZSBkb3RzXG4gICAgICAgICAgICAucmVwbGFjZSgvWypdJC8sICdbXi5dKycpOyAvLyBMYXN0IHdpbGRjYXJkXG4gICAgfVxuICAgIHBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICAgICAgLnJlcGxhY2VBbGwoL1svXS9nLCAnWy9dJykgLy8gRXNjYXBlIHNsYXNoZXNcbiAgICAgICAgLnJlcGxhY2VBbGwoL1suXS9nLCAnWy5dJykgLy8gRXNjYXBlIGRvdHNcbiAgICAgICAgLnJlcGxhY2VBbGwoL1sqXS9nLCAnLionKTsgLy8gQW55IHdpbGRjYXJkXG4gICAgcmV0dXJuICdeJyArIHByb3RvY29sICsgaG9zdCArICcoJyArIHBhdGhuYW1lICsgJyk/JCc7XG59XG5leHBvcnQgZnVuY3Rpb24gcGF0dGVyblRvUmVnZXgoLi4ubWF0Y2hQYXR0ZXJucykge1xuICAgIC8vIE5vIHBhdHRlcm4sIG1hdGNoIG5vdGhpbmcgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xLzE0MTE1NTIyLzI4ODkwNlxuICAgIGlmIChtYXRjaFBhdHRlcm5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gLyQuLztcbiAgICB9XG4gICAgaWYgKG1hdGNoUGF0dGVybnMuaW5jbHVkZXMoJzxhbGxfdXJscz4nKSkge1xuICAgICAgICByZXR1cm4gYWxsVXJsc1JlZ2V4O1xuICAgIH1cbiAgICBpZiAobWF0Y2hQYXR0ZXJucy5pbmNsdWRlcygnKjovLyovKicpKSB7XG4gICAgICAgIHJldHVybiBhbGxTdGFyc1JlZ2V4O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChtYXRjaFBhdHRlcm5zLm1hcCh4ID0+IGdldFJhd1BhdHRlcm5SZWdleCh4KSkuam9pbignfCcpKTtcbn1cbi8vIFRoZSBwYXJlbnMgYXJlIHJlcXVpcmVkIGJ5IC5zcGxpdCgpIHRvIHByZXNlcnZlIHRoZSBzeW1ib2xzXG5jb25zdCBnbG9iU3ltYm9scyA9IC8oWz8qXSspLztcbmZ1bmN0aW9uIHNwbGl0UmVwbGFjZShwYXJ0LCBpbmRleCkge1xuICAgIGlmIChwYXJ0ID09PSAnJykge1xuICAgICAgICAvLyBTaG9ydGN1dCBmb3Igc3BlZWRcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoaW5kZXggJSAyID09PSAwKSB7XG4gICAgICAgIC8vIFJhdyB0ZXh0LCBlc2NhcGUgaXRcbiAgICAgICAgcmV0dXJuIGVzY2FwZVN0cmluZ1JlZ2V4cChwYXJ0KTtcbiAgICB9XG4gICAgLy8gRWxzZTogU3ltYm9sXG4gICAgaWYgKHBhcnQuaW5jbHVkZXMoJyonKSkgeyAvLyBDYW4gYmUgbW9yZSB0aGFuIG9uZSBhbmQgaXQgc3dhbGxvd3Mgc3Vycm91bmRpbmcgcXVlc3Rpb24gbWFya3NcbiAgICAgICAgcmV0dXJuICcuKic7XG4gICAgfVxuICAgIHJldHVybiBbLi4ucGFydF0ubWFwKCgpID0+IGlzRmlyZWZveCA/ICcuJyA6ICcuPycpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gZ2V0UmF3R2xvYlJlZ2V4KGdsb2IpIHtcbiAgICBjb25zdCByZWdleFN0cmluZyA9IGdsb2JcbiAgICAgICAgLnNwbGl0KGdsb2JTeW1ib2xzKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9uby1hcnJheS1jYWxsYmFjay1yZWZlcmVuY2UgLS0gdGlzIG9rIPCfpKtcbiAgICAgICAgLm1hcChzcGxpdFJlcGxhY2UpXG4gICAgICAgIC5qb2luKCcnKTtcbiAgICAvLyBEcm9wIFwic3RhcnQgd2l0aCBhbnl0aGluZ1wiIGFuZCBcImVuZCB3aXRoIGFueXRoaW5nXCIgc2VxdWVuY2VzIGJlY2F1c2UgdGhleSdyZSB0aGUgZGVmYXVsdCBmb3IgcmVnZXhcbiAgICByZXR1cm4gKCdeJyArIHJlZ2V4U3RyaW5nICsgJyQnKVxuICAgICAgICAucmVwbGFjZSgvXlsuXVsqXS8sICcnKVxuICAgICAgICAucmVwbGFjZSgvWy5dWypdJC8sICcnKVxuICAgICAgICAucmVwbGFjZSgvXlskXSQvLCAnLisnKTsgLy8gQ2F0Y2ggYCpgIGFuZCBgKmBcbn1cbmV4cG9ydCBmdW5jdGlvbiBnbG9iVG9SZWdleCguLi5nbG9icykge1xuICAgIC8vIE5vIGdsb2IsIG1hdGNoIGFueXRoaW5nOyBgaW5jbHVkZV9nbG9iczogW11gIGlzIHRoZSBkZWZhdWx0XG4gICAgaWYgKGdsb2JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gLy4qLztcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoZ2xvYnMubWFwKHggPT4gZ2V0UmF3R2xvYlJlZ2V4KHgpKS5qb2luKCd8JykpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4Y2x1ZGVEdXBsaWNhdGVQYXR0ZXJucyhtYXRjaFBhdHRlcm5zKSB7XG4gICAgaWYgKG1hdGNoUGF0dGVybnMuaW5jbHVkZXMoJzxhbGxfdXJscz4nKSkge1xuICAgICAgICByZXR1cm4gWyc8YWxsX3VybHM+J107XG4gICAgfVxuICAgIGlmIChtYXRjaFBhdHRlcm5zLmluY2x1ZGVzKCcqOi8vKi8qJykpIHtcbiAgICAgICAgcmV0dXJuIFsnKjovLyovKiddO1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hQYXR0ZXJucy5maWx0ZXIocG9zc2libGVTdWJzZXQgPT4gIW1hdGNoUGF0dGVybnMuc29tZShwb3NzaWJsZVN1cGVyc2V0ID0+IHBvc3NpYmxlU3Vic2V0ICE9PSBwb3NzaWJsZVN1cGVyc2V0ICYmIHBhdHRlcm5Ub1JlZ2V4KHBvc3NpYmxlU3VwZXJzZXQpLnRlc3QocG9zc2libGVTdWJzZXQpKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVTdHJpbmdSZWdleHAoc3RyaW5nKSB7XG5cdGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG5cdH1cblxuXHQvLyBFc2NhcGUgY2hhcmFjdGVycyB3aXRoIHNwZWNpYWwgbWVhbmluZyBlaXRoZXIgaW5zaWRlIG9yIG91dHNpZGUgY2hhcmFjdGVyIHNldHMuXG5cdC8vIFVzZSBhIHNpbXBsZSBiYWNrc2xhc2ggZXNjYXBlIHdoZW4gaXTigJlzIGFsd2F5cyB2YWxpZCwgYW5kIGEgYFxceG5uYCBlc2NhcGUgd2hlbiB0aGUgc2ltcGxlciBmb3JtIHdvdWxkIGJlIGRpc2FsbG93ZWQgYnkgVW5pY29kZSBwYXR0ZXJuc+KAmSBzdHJpY3RlciBncmFtbWFyLlxuXHRyZXR1cm4gc3RyaW5nXG5cdFx0LnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nLCAnXFxcXCQmJylcblx0XHQucmVwbGFjZSgvLS9nLCAnXFxcXHgyZCcpO1xufVxuIiwiaW1wb3J0IGNocm9tZVByb21pc2VkIGZyb20gJ3dlYmV4dC1wb2x5ZmlsbC1raW5kYSc7XG5pbXBvcnQgeyBpc0JhY2tncm91bmQsIGlzQ2hyb21lIH0gZnJvbSAnd2ViZXh0LWRldGVjdC1wYWdlJztcbmltcG9ydCB7IGlzVXJsUGVybWl0dGVkQnlNYW5pZmVzdCB9IGZyb20gJ3dlYmV4dC1wZXJtaXNzaW9ucyc7XG5pbXBvcnQgeyBnZXRUYWJVcmwgfSBmcm9tICd3ZWJleHQtdG9vbHMnO1xuaW1wb3J0IGFsZXJ0IGZyb20gJ3dlYmV4dC1hbGVydCc7XG5pbXBvcnQgeyBleGVjdXRlRnVuY3Rpb24sIGlzU2NyaXB0YWJsZVVybCB9IGZyb20gJ3dlYmV4dC1jb250ZW50LXNjcmlwdHMnO1xuY29uc3QgY29udGV4dE1lbnVJZCA9ICd3ZWJleHQtcGVybWlzc2lvbi10b2dnbGU6YWRkLXBlcm1pc3Npb24nO1xubGV0IGdsb2JhbE9wdGlvbnM7XG5jb25zdCBjaHJvbWVQID0gaXNDaHJvbWUoKSAmJiBnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZT8uZ2V0TWFuaWZlc3QoKS5tYW5pZmVzdF92ZXJzaW9uIDwgM1xuICAgID8gY2hyb21lUHJvbWlzZWRcbiAgICA6IGNocm9tZTtcbmZ1bmN0aW9uIGFzc2VydFRhYih0YWIpIHtcbiAgICBpZiAoIXRhYj8uaWQpIHtcbiAgICAgICAgLy8gRG9uJ3QgdXNlIG5vbi1BU0NJSSBjaGFyYWN0ZXJzIGJlY2F1c2UgU2FmYXJpIGJyZWFrcyB0aGUgZW5jb2RpbmcgaW4gZXhlY3V0ZVNjcmlwdC5jb2RlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGJyb3dzZXIgZGlkblxcJ3Qgc3VwcGx5IGFueSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYWN0aXZlIHRhYi4nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NlcnRVcmwodXJsKSB7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgICAgLy8gRG9uJ3QgdXNlIG5vbi1BU0NJSSBjaGFyYWN0ZXJzIGJlY2F1c2UgU2FmYXJpIGJyZWFrcyB0aGUgZW5jb2RpbmcgaW4gZXhlY3V0ZVNjcmlwdC5jb2RlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGJyb3dzZXIgZGlkblxcJ3Qgc3VwcGx5IHRoZSBjdXJyZW50IHBhZ2VcXCdzIFVSTC4nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NlcnRTY3JpcHRhYmxlVXJsKHVybCkge1xuICAgIGlmICghaXNTY3JpcHRhYmxlVXJsKHVybCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubmFtZSArICcgY2FuXFwndCBiZSBlbmFibGVkIG9uIHRoaXMgcGFnZS4nKTtcbiAgICB9XG59XG5hc3luYyBmdW5jdGlvbiBpc09yaWdpblBlcm1hbmVudGx5QWxsb3dlZChvcmlnaW4pIHtcbiAgICByZXR1cm4gY2hyb21lUC5wZXJtaXNzaW9ucy5jb250YWlucyh7XG4gICAgICAgIG9yaWdpbnM6IFtvcmlnaW4gKyAnLyonXSxcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUl0ZW1SYXcoeyBjaGVja2VkLCBlbmFibGVkIH0pIHtcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLnVwZGF0ZShjb250ZXh0TWVudUlkLCB7XG4gICAgICAgIGNoZWNrZWQsXG4gICAgICAgIGVuYWJsZWQsXG4gICAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiB1cGRhdGVJdGVtKHVybCkge1xuICAgIGlmICghdXJsKSB7XG4gICAgICAgIC8vIE5vIFVSTCBtZWFucyBubyBhY3RpdmVUYWIsIG5vIG1hbmlmZXN0IHBlcm1pc3Npb24sIG5vIGdyYW50ZWQgcGVybWlzc2lvbiwgT1Igbm8gcGVybWlzc2lvbiBwb3NzaWJsZSAoY2hyb21lOi8vKVxuICAgICAgICAvLyBTaW5jZSB3ZSBjYW4ndCBkaWZmZXJlbnRpYXRlIGJldHdlZW4gdGhlc2UgY2FzZXMsIHdlIGNhbid0IGRpc2FibGUgdGhlIHRvZ2dsZVxuICAgICAgICB1cGRhdGVJdGVtUmF3KHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzU2NyaXB0YWJsZVVybCh1cmwpKSB7XG4gICAgICAgIGNvbnN0IHsgb3JpZ2luIH0gPSBuZXcgVVJMKHVybCk7XG4gICAgICAgIC8vIE1hbmlmZXN0IHBlcm1pc3Npb25zIGNhbid0IGJlIHJlbW92ZWQ7IHRoaXMgZGlzYWJsZXMgdGhlIHRvZ2dsZSBvbiB0aG9zZSBkb21haW5zXG4gICAgICAgIGNvbnN0IGlzRGVmYXVsdCA9IGlzVXJsUGVybWl0dGVkQnlNYW5pZmVzdCh1cmwpO1xuICAgICAgICB1cGRhdGVJdGVtUmF3KHtcbiAgICAgICAgICAgIGVuYWJsZWQ6ICFpc0RlZmF1bHQsXG4gICAgICAgICAgICAvLyBXZSBtaWdodCBoYXZlIHRlbXBvcmFyeSBwZXJtaXNzaW9uIGFzIHBhcnQgb2YgYGFjdGl2ZVRhYmAsIHNvIGl0IG5lZWRzIHRvIGJlIHByb3Blcmx5IGNoZWNrZWRcbiAgICAgICAgICAgIGNoZWNrZWQ6IGlzRGVmYXVsdCB8fCBhd2FpdCBpc09yaWdpblBlcm1hbmVudGx5QWxsb3dlZChvcmlnaW4pLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBXZSBrbm93IHRoZSBVUkwsIGFuZCB3ZSBrbm93IGl0J3Mgbm90IHNjcmlwdGFibGUgKGFib3V0OmJsYW5rLCBjaHJvbWU6Ly8sIGV0Yy4pXG4gICAgdXBkYXRlSXRlbVJhdyh7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICB9KTtcbn1cbi8qKlxuICogUmVxdWVzdHMgb3IgcmVtb3ZlcyB0aGUgaG9zdCBwZXJtaXNzaW9uIGZvciB0aGUgc3BlY2lmaWVkIHRhYlxuICogQHJldHVybnMgV2hldGhlciB0aGUgcGVybWlzc2lvbiBleGlzdHMgYWZ0ZXIgdGhlIHJlcXVlc3QvcmVtb3ZhbFxuICovXG5hc3luYyBmdW5jdGlvbiBzZXRQZXJtaXNzaW9uKHVybCwgcmVxdWVzdCkge1xuICAgIC8vIFRPRE86IEVuc3VyZSB0aGF0IFVSTCBpcyBpbiBgb3B0aW9uYWxfcGVybWlzc2lvbnNgXG4gICAgLy8gVE9ETzogaHR0cHM6Ly9naXRodWIuY29tL2ZyZWdhbnRlL3dlYmV4dC1wZXJtaXNzaW9uLXRvZ2dsZS9pc3N1ZXMvMzdcbiAgICBjb25zdCBwZXJtaXNzaW9uRGF0YSA9IHtcbiAgICAgICAgb3JpZ2luczogW1xuICAgICAgICAgICAgbmV3IFVSTCh1cmwpLm9yaWdpbiArICcvKicsXG4gICAgICAgIF0sXG4gICAgfTtcbiAgICBhd2FpdCBjaHJvbWVQLnBlcm1pc3Npb25zW3JlcXVlc3QgPyAncmVxdWVzdCcgOiAncmVtb3ZlJ10ocGVybWlzc2lvbkRhdGEpO1xuICAgIHJldHVybiBjaHJvbWVQLnBlcm1pc3Npb25zLmNvbnRhaW5zKHBlcm1pc3Npb25EYXRhKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVRhYkFjdGl2YXRlZCh7IHRhYklkIH0pIHtcbiAgICB2b2lkIHVwZGF0ZUl0ZW0oYXdhaXQgZ2V0VGFiVXJsKHRhYklkKSA/PyAnJyk7XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDbGljayh7IGNoZWNrZWQsIG1lbnVJdGVtSWQgfSwgdGFiKSB7XG4gICAgaWYgKG1lbnVJdGVtSWQgIT09IGNvbnRleHRNZW51SWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgdXJsO1xuICAgIHRyeSB7XG4gICAgICAgIGFzc2VydFRhYih0YWIpO1xuICAgICAgICB1cmwgPSB0YWIudXJsID8/IGF3YWl0IGdldFRhYlVybCh0YWIuaWQpO1xuICAgICAgICBhc3NlcnRVcmwodXJsKTtcbiAgICAgICAgYXNzZXJ0U2NyaXB0YWJsZVVybCh1cmwpO1xuICAgICAgICBjb25zdCBwZXJtaXNzaW9uRXhpc3RzTm93ID0gYXdhaXQgc2V0UGVybWlzc2lvbih1cmwsIGNoZWNrZWQpO1xuICAgICAgICBjb25zdCBzZXR0aW5nV2FzU3VjY2Vzc2Z1bCA9IHBlcm1pc3Npb25FeGlzdHNOb3cgPT09IGNoZWNrZWQ7XG4gICAgICAgIC8vIElmIHN1Y2Nlc3NmdWwsIENocm9tZSBhbHJlYWR5IG5hdGl2ZWx5IHVwZGF0ZWQgdGhlIGNvbnRleHQgbWVudSBpdGVtLlxuICAgICAgICBpZiAoIXNldHRpbmdXYXNTdWNjZXNzZnVsKSB7XG4gICAgICAgICAgICB1cGRhdGVJdGVtUmF3KHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBwZXJtaXNzaW9uRXhpc3RzTm93LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBlcm1pc3Npb25FeGlzdHNOb3cgJiYgZ2xvYmFsT3B0aW9ucy5yZWxvYWRPblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHZvaWQgZXhlY3V0ZUZ1bmN0aW9uKHRhYi5pZCwgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlybShtZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBnbG9iYWxPcHRpb25zLnJlbG9hZE9uU3VjY2Vzcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIERlbGF5IHVwZGF0aW5nIHRoZSBjb250ZXh0IG1lbnUgaXRlbSBiZWNhdXNlIG9mIHNwdXJpb3VzIGV2ZW50cyBhbmQgYWN0aXZlVGFiIHJhY2UgY29uZGl0aW9uc1xuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZnJlZ2FudGUvd2ViZXh0LXBlcm1pc3Npb24tdG9nZ2xlL3B1bGwvNDVcbiAgICAgICAgc2V0VGltZW91dCh1cGRhdGVJdGVtLCA1MDAsIHVybCk7XG4gICAgICAgIGlmICh0YWI/LmlkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGVGdW5jdGlvbih0YWIuaWQsIHRleHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQodGV4dCk7IC8qIENhbid0IHBhc3MgYSByYXcgbmF0aXZlIGZ1bmN0aW9uICovXG4gICAgICAgICAgICAgICAgfSwgU3RyaW5nKGVycm9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICAgICAgdm9pZCBhbGVydChTdHJpbmcoZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG4vKipcbiAqIEFkZHMgYW4gaXRlbSB0byB0aGUgYnJvd3NlciBhY3Rpb24gaWNvbidzIGNvbnRleHQgbWVudS5cbiAqIFRoZSB1c2VyIGNhbiBhY2Nlc3MgdGhpcyBtZW51IGJ5IHJpZ2h0IGNsaWNraW5nIHRoZSBpY29uLiBJZiB5b3VyIGV4dGVuc2lvbiBkb2Vzbid0IGhhdmUgYW55IGFjdGlvbiBvclxuICogcG9wdXAgYXNzaWduZWQgdG8gdGhlIGljb24sIGl0IHdpbGwgYWxzbyBhcHBlYXIgd2l0aCBhIGxlZnQgY2xpY2suXG4gKlxuICogQHBhcmFtIG9wdGlvbnMge09wdGlvbnN9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZFBlcm1pc3Npb25Ub2dnbGUob3B0aW9ucykge1xuICAgIGlmICghaXNCYWNrZ3JvdW5kKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd3ZWJleHQtcGVybWlzc2lvbi10b2dnbGUgY2FuIG9ubHkgYmUgY2FsbGVkIGZyb20gYSBiYWNrZ3JvdW5kIHBhZ2UnKTtcbiAgICB9XG4gICAgaWYgKGdsb2JhbE9wdGlvbnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd3ZWJleHQtcGVybWlzc2lvbi10b2dnbGUgY2FuIG9ubHkgYmUgaW5pdGlhbGl6ZWQgb25jZScpO1xuICAgIH1cbiAgICBjb25zdCBtYW5pZmVzdCA9IGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCk7XG4gICAgaWYgKCFtYW5pZmVzdC5wZXJtaXNzaW9ucz8uaW5jbHVkZXMoJ2NvbnRleHRNZW51cycpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignd2ViZXh0LXBlcm1pc3Npb24tdG9nZ2xlIHJlcXVpcmVzIHRoZSBgY29udGV4dE1lbnVzYCBwZXJtaXNzaW9uJyk7XG4gICAgfVxuICAgIGlmICghY2hyb21lLmNvbnRleHRNZW51cykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2Nocm9tZS5jb250ZXh0TWVudXMgaXMgbm90IGF2YWlsYWJsZScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGdsb2JhbE9wdGlvbnMgPSB7XG4gICAgICAgIHRpdGxlOiBgRW5hYmxlICR7bWFuaWZlc3QubmFtZX0gb24gdGhpcyBkb21haW5gLFxuICAgICAgICByZWxvYWRPblN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAuLi5vcHRpb25zLFxuICAgIH07XG4gICAgaWYgKGdsb2JhbE9wdGlvbnMucmVsb2FkT25TdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgIGdsb2JhbE9wdGlvbnMucmVsb2FkT25TdWNjZXNzID0gYERvIHlvdSB3YW50IHRvIHJlbG9hZCB0aGlzIHBhZ2UgdG8gYXBwbHkgJHttYW5pZmVzdC5uYW1lfT9gO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25hbEhvc3RzID0gW1xuICAgICAgICAuLi5tYW5pZmVzdC5vcHRpb25hbF9wZXJtaXNzaW9ucyA/PyBbXSxcbiAgICAgICAgLi4ubWFuaWZlc3Qub3B0aW9uYWxfaG9zdF9wZXJtaXNzaW9ucyA/PyBbXSxcbiAgICBdLmZpbHRlcigocGVybWlzc2lvbikgPT4gcGVybWlzc2lvbiA9PT0gJzxhbGxfdXJscz4nIHx8IHBlcm1pc3Npb24uaW5jbHVkZXMoJyonKSk7XG4gICAgaWYgKG9wdGlvbmFsSG9zdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3dlYmV4dC1wZXJtaXNzaW9uLXRvZ2dsZSByZXF1aXJlcyBzb21lIHdpbGRjYXJkIGhvc3RzIHRvIGJlIHNwZWNpZmllZCBpbiBgb3B0aW9uYWxfcGVybWlzc2lvbnNgIChNVjIpIG9yIGBvcHRpb25hbF9ob3N0X3Blcm1pc3Npb25zYCAoTVYzKScpO1xuICAgIH1cbiAgICAvLyBSZW1vdmUgYW55IGV4aXN0aW5nIGNvbnRleHQgbWVudSBpdGVtIGFuZCBzaWxlbmNlIGFueSBlcnJvclxuICAgIGNocm9tZS5jb250ZXh0TWVudXMucmVtb3ZlKGNvbnRleHRNZW51SWQsICgpID0+IGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7XG4gICAgY29uc3QgY29udGV4dHMgPSBtYW5pZmVzdC5tYW5pZmVzdF92ZXJzaW9uID09PSAyXG4gICAgICAgID8gWydwYWdlX2FjdGlvbicsICdicm93c2VyX2FjdGlvbiddXG4gICAgICAgIDogWydhY3Rpb24nXTtcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICAgIGlkOiBjb250ZXh0TWVudUlkLFxuICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgdGl0bGU6IGdsb2JhbE9wdGlvbnMudGl0bGUsXG4gICAgICAgIGNvbnRleHRzLFxuICAgICAgICAvLyBOb3RlOiBUaGlzIGlzIGNvbXBsZXRlbHkgaWdub3JlZCBieSBDaHJvbWUgYW5kIFNhZmFyaS4gR3JlYXQuICMxNFxuICAgICAgICBkb2N1bWVudFVybFBhdHRlcm5zOiBvcHRpb25hbEhvc3RzLFxuICAgIH0pO1xuICAgIGNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKGhhbmRsZUNsaWNrKTtcbiAgICBjaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcihoYW5kbGVUYWJBY3RpdmF0ZWQpO1xuICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihhc3luYyAodGFiSWQsIHsgc3RhdHVzIH0sIHsgdXJsLCBhY3RpdmUgfSkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlICYmIHN0YXR1cyA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgdm9pZCB1cGRhdGVJdGVtKHVybCA/PyBhd2FpdCBnZXRUYWJVcmwodGFiSWQpID8/ICcnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwibGV0IGNhY2hlID0gdHJ1ZTtcbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlV2ViZXh0RGV0ZWN0UGFnZUNhY2hlKCkge1xuICAgIGNhY2hlID0gZmFsc2U7XG59XG5mdW5jdGlvbiBpc0N1cnJlbnRQYXRobmFtZShwYXRoKSB7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBwYXRobmFtZSB9ID0gbmV3IFVSTChwYXRoLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgICAgICByZXR1cm4gcGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRNYW5pZmVzdChfdmVyc2lvbikge1xuICAgIHJldHVybiBnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZT8uZ2V0TWFuaWZlc3Q/LigpO1xufVxuZnVuY3Rpb24gb25jZShmdW5jdGlvbl8pIHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICghY2FjaGUgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmN0aW9uXygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gb24gaHR0cChzKTovLyBwYWdlcyAoaXQgY291bGQgYmUgaW4gYSBjb250ZW50IHNjcmlwdCBvciByZWd1bGFyIHdlYiBjb250ZXh0KSAqL1xuZXhwb3J0IGNvbnN0IGlzV2ViUGFnZSA9IG9uY2UoKCkgPT4gWydhYm91dDonLCAnaHR0cDonLCAnaHR0cHM6J10uaW5jbHVkZXMobG9jYXRpb24ucHJvdG9jb2wpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gZXh0ZW5zaW9uIGNvbnRleHRzIHRoYXQgaGF2ZSBhY2Nlc3MgdG8gdGhlIGNocm9tZSBBUEkgKi9cbmV4cG9ydCBjb25zdCBpc0V4dGVuc2lvbkNvbnRleHQgPSBvbmNlKCgpID0+IHR5cGVvZiBnbG9iYWxUaGlzLmNocm9tZT8uZXh0ZW5zaW9uID09PSAnb2JqZWN0Jyk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgY29udGVudCBzY3JpcHQgKi9cbmV4cG9ydCBjb25zdCBpc0NvbnRlbnRTY3JpcHQgPSBvbmNlKCgpID0+IGlzRXh0ZW5zaW9uQ29udGV4dCgpICYmIGlzV2ViUGFnZSgpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIGNvbnRleHQgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmQgPSAoKSA9PiBpc0JhY2tncm91bmRQYWdlKCkgfHwgaXNCYWNrZ3JvdW5kV29ya2VyKCk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgYmFja2dyb3VuZCBwYWdlICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGNvbnN0IG1hbmlmZXN0ID0gZ2V0TWFuaWZlc3QoMik7XG4gICAgaWYgKG1hbmlmZXN0XG4gICAgICAgICYmIGlzQ3VycmVudFBhdGhuYW1lKG1hbmlmZXN0LmJhY2tncm91bmRfcGFnZSA/PyBtYW5pZmVzdC5iYWNrZ3JvdW5kPy5wYWdlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIEJvb2xlYW4obWFuaWZlc3Q/LmJhY2tncm91bmQ/LnNjcmlwdHNcbiAgICAgICAgJiYgaXNDdXJyZW50UGF0aG5hbWUoJy9fZ2VuZXJhdGVkX2JhY2tncm91bmRfcGFnZS5odG1sJykpO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgYmFja2dyb3VuZCB3b3JrZXIgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmRXb3JrZXIgPSBvbmNlKCgpID0+IGlzQ3VycmVudFBhdGhuYW1lKGdldE1hbmlmZXN0KDMpPy5iYWNrZ3JvdW5kPy5zZXJ2aWNlX3dvcmtlcikpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIHBlcnNpc3RlbnQgYmFja2dyb3VuZCBwYWdlIChhcyBvcHBvc2VkIHRvIGFuIEV2ZW50IFBhZ2Ugb3IgQmFja2dyb3VuZCBXb3JrZXIsIGJvdGggb2Ygd2hpY2ggY2FuIGJlIHVubG9hZGVkIGJ5IHRoZSBicm93c2VyKSAqL1xuZXhwb3J0IGNvbnN0IGlzUGVyc2lzdGVudEJhY2tncm91bmRQYWdlID0gb25jZSgoKSA9PiBpc0JhY2tncm91bmRQYWdlKClcbiAgICAmJiBnZXRNYW5pZmVzdCgyKT8ubWFuaWZlc3RfdmVyc2lvbiA9PT0gMiAvLyBGaXJlZm94IGNhbiBoYXZlIGEgYmFja2dyb3VuZCBwYWdlIG9uIE1WMywgYnV0IGNhbid0IGJlIHBlcnNpc3RlbnRcbiAgICAmJiBnZXRNYW5pZmVzdCgyKT8uYmFja2dyb3VuZD8ucGVyc2lzdGVudCAhPT0gZmFsc2UpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhbiBvcHRpb25zIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gICovXG5leHBvcnQgY29uc3QgaXNPcHRpb25zUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBnZXRNYW5pZmVzdCgpPy5vcHRpb25zX3VpPy5wYWdlO1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYW4gb3B0aW9ucyBwYWdlLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCAqL1xuZXhwb3J0IGNvbnN0IGlzU2lkZVBhbmVsID0gb25jZSgoKSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudCAtLSBOb3QgeWV0IGluIEB0eXBlcy9jaHJvbWVcbiAgICBjb25zdCBwYXRoID0gZ2V0TWFuaWZlc3QoMyk/Llsnc2lkZV9wYW5lbCddPy5kZWZhdWx0X3BhdGg7XG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGF0aCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICByZXR1cm4gdXJsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGRldiB0b29scyBwYWdlLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCBgZGV2dG9vbHNfcGFnZWAgZmllbGQuICovXG5leHBvcnQgY29uc3QgaXNEZXZUb29sc1BhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBjb25zdCBkZXZ0b29sc1BhZ2UgPSBpc0V4dGVuc2lvbkNvbnRleHQoKSAmJiBjaHJvbWUuZGV2dG9vbHMgJiYgZ2V0TWFuaWZlc3QoKT8uZGV2dG9vbHNfcGFnZTtcbiAgICBpZiAodHlwZW9mIGRldnRvb2xzUGFnZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGRldnRvb2xzUGFnZSwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICByZXR1cm4gdXJsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiB0aGUgZGV2IHRvb2xzIHBhZ2UuIFVubGlrZSBgaXNEZXZUb29sc1BhZ2VgLCB0aGlzIHdvcmtzIGluIGFueSBwYWdlIHRoYXQgaGFzIHRoZSBgY2hyb21lLmRldlRvb2xzYCBBUEkgKi9cbmV4cG9ydCBjb25zdCBpc0RldlRvb2xzID0gKCkgPT4gQm9vbGVhbihnbG9iYWxUaGlzLmNocm9tZT8uZGV2dG9vbHMpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IEZpcmVmb3ggdmlhIHVzZXIgYWdlbnQgKi9cbmV4cG9ydCBjb25zdCBpc0ZpcmVmb3ggPSAoKSA9PiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdGaXJlZm94Jyk7XG4vKiogTG9vc2VseSBkZXRlY3QgQ2hyb21lIHZpYSB1c2VyIGFnZW50IChtaWdodCBhbHNvIGluY2x1ZGUgQ2hyb21pdW0gYW5kIGZvcmtzIGxpa2UgT3BlcmEpICovXG5leHBvcnQgY29uc3QgaXNDaHJvbWUgPSAoKSA9PiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdDaHJvbWUnKTtcbi8qKiBMb29zZWx5IGRldGVjdCBTYWZhcmkgdmlhIHVzZXIgYWdlbnQgKi9cbmV4cG9ydCBjb25zdCBpc1NhZmFyaSA9ICgpID0+ICFpc0Nocm9tZSgpICYmIGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ1NhZmFyaScpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IE1vYmlsZSBTYWZhcmkgdmlhIHVzZXIgYWdlbnQgKi9cbmV4cG9ydCBjb25zdCBpc01vYmlsZVNhZmFyaSA9ICgpID0+IGlzU2FmYXJpKCkgJiYgZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnTW9iaWxlJyk7XG5jb25zdCBjb250ZXh0Q2hlY2tzID0ge1xuICAgIGNvbnRlbnRTY3JpcHQ6IGlzQ29udGVudFNjcmlwdCxcbiAgICBiYWNrZ3JvdW5kOiBpc0JhY2tncm91bmQsXG4gICAgb3B0aW9uczogaXNPcHRpb25zUGFnZSxcbiAgICBzaWRlUGFuZWw6IGlzU2lkZVBhbmVsLFxuICAgIGRldlRvb2xzOiBpc0RldlRvb2xzLFxuICAgIGRldlRvb2xzUGFnZTogaXNEZXZUb29sc1BhZ2UsXG4gICAgZXh0ZW5zaW9uOiBpc0V4dGVuc2lvbkNvbnRleHQsXG4gICAgd2ViOiBpc1dlYlBhZ2UsXG59O1xuZXhwb3J0IGNvbnN0IGNvbnRleHROYW1lcyA9IE9iamVjdC5rZXlzKGNvbnRleHRDaGVja3MpO1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRleHROYW1lKCkge1xuICAgIGZvciAoY29uc3QgW25hbWUsIHRlc3RdIG9mIE9iamVjdC5lbnRyaWVzKGNvbnRleHRDaGVja3MpKSB7XG4gICAgICAgIGlmICh0ZXN0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAndW5rbm93bic7XG59XG4iLCJpbXBvcnQgeyBleGNsdWRlRHVwbGljYXRlUGF0dGVybnMsIHBhdHRlcm5Ub1JlZ2V4IH0gZnJvbSAnd2ViZXh0LXBhdHRlcm5zJztcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVNYW5pZmVzdFBlcm1pc3Npb25zKG1hbmlmZXN0ID0gY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKSkge1xuICAgIGNvbnN0IG1hbmlmZXN0UGVybWlzc2lvbnMgPSB7XG4gICAgICAgIG9yaWdpbnM6IFtdLFxuICAgICAgICBwZXJtaXNzaW9uczogW10sXG4gICAgfTtcbiAgICBjb25zdCBsaXN0ID0gbmV3IFNldChbXG4gICAgICAgIC4uLihtYW5pZmVzdC5wZXJtaXNzaW9ucyA/PyBbXSksXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnQgLS0gTm90IHN1cmUgd2h5IGl0J3MgYmVpbmcgYSBQSVRBXG4gICAgICAgIC4uLihtYW5pZmVzdC5ob3N0X3Blcm1pc3Npb25zID8/IFtdKSxcbiAgICAgICAgLi4uKG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0cyA/PyBbXSkuZmxhdE1hcChjb25maWcgPT4gY29uZmlnLm1hdGNoZXMgPz8gW10pLFxuICAgIF0pO1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL2dlY2tvLWRldi9ibG9iL2MwZmM4YzQ4NTJlOTI3YjBhZTc1ZDg5M2QzNTc3MmI4YzYwZWUwNmIvdG9vbGtpdC9jb21wb25lbnRzL2V4dGVuc2lvbnMvRXh0ZW5zaW9uLmpzbSNMNzM4LUw3NDNcbiAgICBpZiAobWFuaWZlc3QuZGV2dG9vbHNfcGFnZVxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIGl0IGNhbid0IGJlIHNwZWNpZmllZCwgYnV0IGl0J3MgcmVwb3J0ZWQgd2hlbiByZXF1ZXN0ZWRcbiAgICAgICAgJiYgIW1hbmlmZXN0Lm9wdGlvbmFsX3Blcm1pc3Npb25zPy5pbmNsdWRlcygnZGV2dG9vbHMnKSkge1xuICAgICAgICBsaXN0LmFkZCgnZGV2dG9vbHMnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwZXJtaXNzaW9uIG9mIGxpc3QpIHtcbiAgICAgICAgaWYgKHBlcm1pc3Npb24uaW5jbHVkZXMoJzovLycpIHx8IHBlcm1pc3Npb24gPT09ICc8YWxsX3VybHM+Jykge1xuICAgICAgICAgICAgbWFuaWZlc3RQZXJtaXNzaW9ucy5vcmlnaW5zLnB1c2gocGVybWlzc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtYW5pZmVzdFBlcm1pc3Npb25zLnBlcm1pc3Npb25zLnB1c2gocGVybWlzc2lvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRyb3BPdmVybGFwcGluZ1Blcm1pc3Npb25zKG1hbmlmZXN0UGVybWlzc2lvbnMpO1xufVxuY29uc3QgaG9zdFJlZ2V4ID0gLzpbL11bL11bKi5dKihbXi9dKykvOyAvLyBFeHRyYWN0cyB0aGUgd2lsZGNhcmQtbGVzcyBob3N0bmFtZVxuZnVuY3Rpb24gcGFyc2VEb21haW4ob3JpZ2luKSB7XG4gICAgcmV0dXJuIG9yaWdpbi5zcGxpdChob3N0UmVnZXgpWzFdO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHF1ZXJ5QWRkaXRpb25hbFBlcm1pc3Npb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNocm9tZS5wZXJtaXNzaW9ucy5nZXRBbGwoY3VycmVudFBlcm1pc3Npb25zID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoZXh0cmFjdEFkZGl0aW9uYWxQZXJtaXNzaW9ucyhjdXJyZW50UGVybWlzc2lvbnMsIG9wdGlvbnMpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEFkZGl0aW9uYWxQZXJtaXNzaW9ucyhjdXJyZW50UGVybWlzc2lvbnMsIHsgbWFuaWZlc3QsIHN0cmljdE9yaWdpbnMgPSB0cnVlLCB9ID0ge30pIHtcbiAgICBjb25zdCBtYW5pZmVzdFBlcm1pc3Npb25zID0gbm9ybWFsaXplTWFuaWZlc3RQZXJtaXNzaW9ucyhtYW5pZmVzdCk7XG4gICAgY29uc3QgYWRkaXRpb25hbFBlcm1pc3Npb25zID0ge1xuICAgICAgICBvcmlnaW5zOiBbXSxcbiAgICAgICAgcGVybWlzc2lvbnM6IFtdLFxuICAgIH07XG4gICAgZm9yIChjb25zdCBvcmlnaW4gb2YgY3VycmVudFBlcm1pc3Npb25zLm9yaWdpbnMgPz8gW10pIHtcbiAgICAgICAgaWYgKG1hbmlmZXN0UGVybWlzc2lvbnMub3JpZ2lucy5pbmNsdWRlcyhvcmlnaW4pKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN0cmljdE9yaWdpbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvbWFpbiA9IHBhcnNlRG9tYWluKG9yaWdpbik7XG4gICAgICAgICAgICBjb25zdCBpc0RvbWFpbkluTWFuaWZlc3QgPSBtYW5pZmVzdFBlcm1pc3Npb25zLm9yaWdpbnNcbiAgICAgICAgICAgICAgICAuc29tZShtYW5pZmVzdE9yaWdpbiA9PiBwYXJzZURvbWFpbihtYW5pZmVzdE9yaWdpbikgPT09IGRvbWFpbik7XG4gICAgICAgICAgICBpZiAoaXNEb21haW5Jbk1hbmlmZXN0KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYWRkaXRpb25hbFBlcm1pc3Npb25zLm9yaWdpbnMucHVzaChvcmlnaW4pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHBlcm1pc3Npb24gb2YgY3VycmVudFBlcm1pc3Npb25zLnBlcm1pc3Npb25zID8/IFtdKSB7XG4gICAgICAgIGlmICghbWFuaWZlc3RQZXJtaXNzaW9ucy5wZXJtaXNzaW9ucy5pbmNsdWRlcyhwZXJtaXNzaW9uKSkge1xuICAgICAgICAgICAgYWRkaXRpb25hbFBlcm1pc3Npb25zLnBlcm1pc3Npb25zLnB1c2gocGVybWlzc2lvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFkZGl0aW9uYWxQZXJtaXNzaW9ucztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1VybFBlcm1pdHRlZEJ5TWFuaWZlc3Qob3JpZ2luLCBtYW5pZmVzdCA9IGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkpIHtcbiAgICBjb25zdCBtYW5pZmVzdFBlcm1pc3Npb25zID0gbm9ybWFsaXplTWFuaWZlc3RQZXJtaXNzaW9ucyhtYW5pZmVzdCk7XG4gICAgY29uc3Qgb3JpZ2luc1JlZ2V4ID0gcGF0dGVyblRvUmVnZXgoLi4ubWFuaWZlc3RQZXJtaXNzaW9ucy5vcmlnaW5zKTtcbiAgICByZXR1cm4gb3JpZ2luc1JlZ2V4LnRlc3Qob3JpZ2luKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcm9wT3ZlcmxhcHBpbmdQZXJtaXNzaW9ucyh7IG9yaWdpbnMsIHBlcm1pc3Npb25zIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvcmlnaW5zOiBvcmlnaW5zID8gZXhjbHVkZUR1cGxpY2F0ZVBhdHRlcm5zKG9yaWdpbnMpIDogW10sXG4gICAgICAgIHBlcm1pc3Npb25zOiBwZXJtaXNzaW9ucyA/IFsuLi5wZXJtaXNzaW9uc10gOiBbXSxcbiAgICB9O1xufVxuIiwiZnVuY3Rpb24gTmVzdGVkUHJveHkodGFyZ2V0KSB7XG5cdHJldHVybiBuZXcgUHJveHkodGFyZ2V0LCB7XG5cdFx0Z2V0KHRhcmdldCwgcHJvcCkge1xuXHRcdFx0aWYgKCF0YXJnZXRbcHJvcF0pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIHRhcmdldFtwcm9wXSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IE5lc3RlZFByb3h5KHRhcmdldFtwcm9wXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoLi4uYXJndW1lbnRzXykgPT5cblx0XHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRhcmdldFtwcm9wXSguLi5hcmd1bWVudHNfLCByZXN1bHQgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuXHRcdFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0sXG5cdH0pO1xufVxuXG5jb25zdCBjaHJvbWVQID0gZ2xvYmFsVGhpcy5jaHJvbWUgJiYgbmV3IE5lc3RlZFByb3h5KGdsb2JhbFRoaXMuY2hyb21lKTtcblxuZXhwb3J0IGRlZmF1bHQgY2hyb21lUDtcbiIsImltcG9ydCBjaHJvbWVQIGZyb20gJ3dlYmV4dC1wb2x5ZmlsbC1raW5kYSc7XG5pbXBvcnQgeyBleGVjdXRlRnVuY3Rpb24gfSBmcm9tICd3ZWJleHQtY29udGVudC1zY3JpcHRzJztcbmV4cG9ydCBmdW5jdGlvbiBjYXN0VGFyZ2V0KHRhcmdldCkge1xuICAgIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0J1xuICAgICAgICA/IHRhcmdldFxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHRhYklkOiB0YXJnZXQsXG4gICAgICAgICAgICBmcmFtZUlkOiAwLFxuICAgICAgICB9O1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRhYlVybCh0YXJnZXQpIHtcbiAgICBjb25zdCB7IGZyYW1lSWQsIHRhYklkIH0gPSBjYXN0VGFyZ2V0KHRhcmdldCk7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGZyYW1lSWQgPT09IDAgJiYgJ3RhYnMnIGluIGdsb2JhbFRoaXMuY2hyb21lKSB7XG4gICAgICAgICAgICBjb25zdCB0YWIgPSBhd2FpdCBjaHJvbWVQLnRhYnMuZ2V0KHRhYklkKTtcbiAgICAgICAgICAgIGlmICh0YWIudXJsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhYi51cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IGV4ZWN1dGVGdW5jdGlvbih0YXJnZXQsICgpID0+IGxvY2F0aW9uLmhyZWYpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIC8vIE5vIGhvc3QgcGVybWlzc2lvbnNcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FuQWNjZXNzVGFiKHRhcmdldCkge1xuICAgIHJldHVybiBleGVjdXRlRnVuY3Rpb24oY2FzdFRhcmdldCh0YXJnZXQpLCAoKSA9PiB0cnVlKS50aGVuKCgpID0+IHRydWUsICgpID0+IGZhbHNlKTtcbn1cbi8qKiBVdGlsaXR5IHRvIGF3YWl0IHByb21pc2VzIHdoZXJlIHlvdSBvbmx5IGNhcmUgd2hldGhlciB0aGV5IHRocm93IG9yIG5vdCAqL1xuYXN5bmMgZnVuY3Rpb24gaXNQcm9taXNlRnVsZmlsbGVkKHByb21pc2UpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRvZXNUYWJFeGlzdCh0YWJJZCkge1xuICAgIHJldHVybiBpc1Byb21pc2VGdWxmaWxsZWQoY2hyb21lUC50YWJzLmdldCh0YWJJZCkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGlvblBvcHVwKGdldFBvcHVwVXJsKSB7XG4gICAgY29uc3QgYnJvd3NlckFjdGlvbiA9IGNocm9tZS5hY3Rpb24gPz8gY2hyb21lUC5icm93c2VyQWN0aW9uO1xuICAgIGNvbnN0IHNldE9uQWN0aXZlVGFiID0gYXN5bmMgKHdpbmRvd0lkKSA9PiB7XG4gICAgICAgIGNvbnN0IFt0YWJdID0gYXdhaXQgY2hyb21lUC50YWJzLnF1ZXJ5KHtcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIC4uLndpbmRvd0lkID8geyB3aW5kb3dJZCB9IDogeyBsYXN0Rm9jdXNlZFdpbmRvdzogdHJ1ZSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0YWIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBicm93c2VyQWN0aW9uLnNldFBvcHVwKHtcbiAgICAgICAgICAgIHBvcHVwOiBhd2FpdCBnZXRQb3B1cFVybCh0YWIudXJsKSA/PyAnJyxcbiAgICAgICAgICAgIHRhYklkOiB0YWIuaWQsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdm9pZCBzZXRPbkFjdGl2ZVRhYigpO1xuICAgIGNocm9tZS53aW5kb3dzLm9uRm9jdXNDaGFuZ2VkLmFkZExpc3RlbmVyKHNldE9uQWN0aXZlVGFiKTtcbiAgICBjaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcihhc3luYyAoYWN0aXZlSW5mbykgPT4ge1xuICAgICAgICBjb25zdCB0YWIgPSBhd2FpdCBjaHJvbWVQLnRhYnMuZ2V0KGFjdGl2ZUluZm8udGFiSWQpO1xuICAgICAgICBhd2FpdCBicm93c2VyQWN0aW9uLnNldFBvcHVwKHtcbiAgICAgICAgICAgIHBvcHVwOiBhd2FpdCBnZXRQb3B1cFVybCh0YWIudXJsKSA/PyAnJyxcbiAgICAgICAgICAgIHRhYklkOiB0YWIuaWQsXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihhc3luYyAodGFiSWQsIGNoYW5nZUluZm8sIHRhYikgPT4ge1xuICAgICAgICBpZiAodGFiLmFjdGl2ZSAmJiBjaGFuZ2VJbmZvLnVybCkge1xuICAgICAgICAgICAgYXdhaXQgYnJvd3NlckFjdGlvbi5zZXRQb3B1cCh7XG4gICAgICAgICAgICAgICAgcG9wdXA6IGF3YWl0IGdldFBvcHVwVXJsKHRhYi51cmwpID8/ICcnLFxuICAgICAgICAgICAgICAgIHRhYklkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9