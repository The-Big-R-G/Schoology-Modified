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
    if (request.type == "fetch" && request.url !== undefined) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVHc0Q7QUFDdEQ7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFrQjtBQUNqQztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDTztBQUNQLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0dlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVm1EO0FBQ1M7QUFDRTtBQUNyQjtBQUNSO0FBQ3lDO0FBQzFFO0FBQ0E7QUFDQSxnQkFBZ0IsNERBQVE7QUFDeEIsTUFBTSw2REFBYztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyx1RUFBZTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx5QkFBeUIsa0JBQWtCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRLHVFQUFlO0FBQ3ZCLGdCQUFnQixTQUFTO0FBQ3pCLGtEQUFrRDtBQUNsRCwwQkFBMEIsNEVBQXdCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxPQUFPO0FBQzNDLDBCQUEwQix1REFBUztBQUNuQztBQUNBLDZCQUE2QixxQkFBcUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHVEQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQix1RUFBZTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1RUFBZTtBQUNyQyx3Q0FBd0M7QUFDeEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxxQkFBcUIsd0RBQUs7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDZTtBQUNmLFNBQVMsZ0VBQVk7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixlQUFlO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLGNBQWM7QUFDbEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzREFBc0QsUUFBUSxJQUFJLGFBQWE7QUFDL0U7QUFDQSx5Q0FBeUMsdURBQVM7QUFDbEQ7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pMQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUcyRTtBQUNwRTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ08sNERBQTRELGtDQUFrQyxJQUFJO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EseUJBQXlCLCtEQUFjO0FBQ3ZDO0FBQ0E7QUFDTyxzQ0FBc0Msc0JBQXNCO0FBQ25FO0FBQ0EsMkJBQTJCLHlFQUF3QjtBQUNuRDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7O0FBRUE7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JxQjtBQUNhO0FBQ2xEO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLFlBQVksaUJBQWlCO0FBQzdCO0FBQ0E7QUFDQSw4QkFBOEIsNkRBQU87QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdUVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxXQUFXLHVFQUFlO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLDhCQUE4Qiw2REFBTztBQUNyQztBQUNPO0FBQ1AsMkNBQTJDLDZEQUFPO0FBQ2xEO0FBQ0EsNEJBQTRCLDZEQUFPO0FBQ25DO0FBQ0EsNEJBQTRCLFdBQVcsSUFBSSx5QkFBeUI7QUFDcEUsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw2REFBTztBQUNqQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7VUMxRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy9kb21wdXJpZnkvZGlzdC9wdXJpZnkuanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9zcmMvc2NyaXB0cy9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vc3JjL3NjcmlwdHMvdXRpbHMvYW5hbHl0aWNzLnRzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vc3JjL3NjcmlwdHMvdXRpbHMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vc3JjL3NjcmlwdHMvdXRpbHMvZG9tLnRzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vc3JjL3NjcmlwdHMvdXRpbHMvbG9nZ2VyLnRzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vc3JjL3NjcmlwdHMvdXRpbHMvbm90aWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy9jb250ZW50LXNjcmlwdHMtcmVnaXN0ZXItcG9seWZpbGwvcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWFkZGl0aW9uYWwtcGVybWlzc2lvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWFsZXJ0L2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1hbGVydC9ub2RlX21vZHVsZXMvd2ViZXh0LWRldGVjdC1wYWdlL2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1jb250ZW50LXNjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHRzL2Rpc3RyaWJ1dGlvbi9kZWR1cGxpY2F0b3IuanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHRzL2Rpc3RyaWJ1dGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdHMvZGlzdHJpYnV0aW9uL2luamVjdC10by1leGlzdGluZy10YWJzLmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0cy9kaXN0cmlidXRpb24vbGliLmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0cy9kaXN0cmlidXRpb24vcmVnaXN0ZXItY29udGVudC1zY3JpcHQtc2hpbS5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtZXZlbnRzL2Rpc3RyaWJ1dGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtZXZlbnRzL2Rpc3RyaWJ1dGlvbi9vbi1jb250ZXh0LWludmFsaWRhdGVkLmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1ldmVudHMvZGlzdHJpYnV0aW9uL29uLWV4dGVuc2lvbi1zdGFydC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtZXZlbnRzL2Rpc3RyaWJ1dGlvbi9vbmUtZXZlbnQuanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWV2ZW50cy9ub2RlX21vZHVsZXMvd2ViZXh0LWRldGVjdC1wYWdlL2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1wYXR0ZXJucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtcGF0dGVybnMvbm9kZV9tb2R1bGVzL2VzY2FwZS1zdHJpbmctcmVnZXhwL2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1wZXJtaXNzaW9uLXRvZ2dsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtcGVybWlzc2lvbi10b2dnbGUvbm9kZV9tb2R1bGVzL3dlYmV4dC1kZXRlY3QtcGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtcGVybWlzc2lvbnMvZGlzdHJpYnV0aW9uL2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1wb2x5ZmlsbC1raW5kYS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtdG9vbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIEBsaWNlbnNlIERPTVB1cmlmeSB8IChjKSBDdXJlNTMgYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyB8IFJlbGVhc2VkIHVuZGVyIHRoZSBBcGFjaGUgbGljZW5zZSAyLjAgYW5kIE1vemlsbGEgUHVibGljIExpY2Vuc2UgMi4wIHwgZ2l0aHViLmNvbS9jdXJlNTMvRE9NUHVyaWZ5L2Jsb2IvMi4wLjgvTElDRU5TRSAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkRPTVB1cmlmeSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgIHNldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mLFxuICAgICAgaXNGcm96ZW4gPSBPYmplY3QuaXNGcm96ZW47XG4gIHZhciBmcmVlemUgPSBPYmplY3QuZnJlZXplLFxuICAgICAgc2VhbCA9IE9iamVjdC5zZWFsLFxuICAgICAgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG5cbiAgdmFyIF9yZWYgPSB0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgUmVmbGVjdCxcbiAgICAgIGFwcGx5ID0gX3JlZi5hcHBseSxcbiAgICAgIGNvbnN0cnVjdCA9IF9yZWYuY29uc3RydWN0O1xuXG4gIGlmICghYXBwbHkpIHtcbiAgICBhcHBseSA9IGZ1bmN0aW9uIGFwcGx5KGZ1biwgdGhpc1ZhbHVlLCBhcmdzKSB7XG4gICAgICByZXR1cm4gZnVuLmFwcGx5KHRoaXNWYWx1ZSwgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghZnJlZXplKSB7XG4gICAgZnJlZXplID0gZnVuY3Rpb24gZnJlZXplKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cblxuICBpZiAoIXNlYWwpIHtcbiAgICBzZWFsID0gZnVuY3Rpb24gc2VhbCh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFjb25zdHJ1Y3QpIHtcbiAgICBjb25zdHJ1Y3QgPSBmdW5jdGlvbiBjb25zdHJ1Y3QoRnVuYywgYXJncykge1xuICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoRnVuYywgW251bGxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpKSkoKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGFycmF5Rm9yRWFjaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpO1xuICB2YXIgYXJyYXlQb3AgPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5wb3ApO1xuICB2YXIgYXJyYXlQdXNoID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucHVzaCk7XG5cbiAgdmFyIHN0cmluZ1RvTG93ZXJDYXNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRvTG93ZXJDYXNlKTtcbiAgdmFyIHN0cmluZ01hdGNoID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLm1hdGNoKTtcbiAgdmFyIHN0cmluZ1JlcGxhY2UgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG4gIHZhciBzdHJpbmdJbmRleE9mID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLmluZGV4T2YpO1xuICB2YXIgc3RyaW5nVHJpbSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50cmltKTtcblxuICB2YXIgcmVnRXhwVGVzdCA9IHVuYXBwbHkoUmVnRXhwLnByb3RvdHlwZS50ZXN0KTtcblxuICB2YXIgdHlwZUVycm9yQ3JlYXRlID0gdW5jb25zdHJ1Y3QoVHlwZUVycm9yKTtcblxuICBmdW5jdGlvbiB1bmFwcGx5KGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRoaXNBcmcpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbnN0cnVjdChmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnN0cnVjdChmdW5jLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgLyogQWRkIHByb3BlcnRpZXMgdG8gYSBsb29rdXAgdGFibGUgKi9cbiAgZnVuY3Rpb24gYWRkVG9TZXQoc2V0LCBhcnJheSkge1xuICAgIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgICAgLy8gTWFrZSAnaW4nIGFuZCB0cnV0aHkgY2hlY2tzIGxpa2UgQm9vbGVhbihzZXQuY29uc3RydWN0b3IpXG4gICAgICAvLyBpbmRlcGVuZGVudCBvZiBhbnkgcHJvcGVydGllcyBkZWZpbmVkIG9uIE9iamVjdC5wcm90b3R5cGUuXG4gICAgICAvLyBQcmV2ZW50IHByb3RvdHlwZSBzZXR0ZXJzIGZyb20gaW50ZXJjZXB0aW5nIHNldCBhcyBhIHRoaXMgdmFsdWUuXG4gICAgICBzZXRQcm90b3R5cGVPZihzZXQsIG51bGwpO1xuICAgIH1cblxuICAgIHZhciBsID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChsLS0pIHtcbiAgICAgIHZhciBlbGVtZW50ID0gYXJyYXlbbF07XG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBsY0VsZW1lbnQgPSBzdHJpbmdUb0xvd2VyQ2FzZShlbGVtZW50KTtcbiAgICAgICAgaWYgKGxjRWxlbWVudCAhPT0gZWxlbWVudCkge1xuICAgICAgICAgIC8vIENvbmZpZyBwcmVzZXRzIChlLmcuIHRhZ3MuanMsIGF0dHJzLmpzKSBhcmUgaW1tdXRhYmxlLlxuICAgICAgICAgIGlmICghaXNGcm96ZW4oYXJyYXkpKSB7XG4gICAgICAgICAgICBhcnJheVtsXSA9IGxjRWxlbWVudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbGVtZW50ID0gbGNFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNldFtlbGVtZW50XSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldDtcbiAgfVxuXG4gIC8qIFNoYWxsb3cgY2xvbmUgYW4gb2JqZWN0ICovXG4gIGZ1bmN0aW9uIGNsb25lKG9iamVjdCkge1xuICAgIHZhciBuZXdPYmplY3QgPSBjcmVhdGUobnVsbCk7XG5cbiAgICB2YXIgcHJvcGVydHkgPSB2b2lkIDA7XG4gICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgIGlmIChhcHBseShoYXNPd25Qcm9wZXJ0eSwgb2JqZWN0LCBbcHJvcGVydHldKSkge1xuICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3T2JqZWN0O1xuICB9XG5cbiAgdmFyIGh0bWwgPSBmcmVlemUoWydhJywgJ2FiYnInLCAnYWNyb255bScsICdhZGRyZXNzJywgJ2FyZWEnLCAnYXJ0aWNsZScsICdhc2lkZScsICdhdWRpbycsICdiJywgJ2JkaScsICdiZG8nLCAnYmlnJywgJ2JsaW5rJywgJ2Jsb2NrcXVvdGUnLCAnYm9keScsICdicicsICdidXR0b24nLCAnY2FudmFzJywgJ2NhcHRpb24nLCAnY2VudGVyJywgJ2NpdGUnLCAnY29kZScsICdjb2wnLCAnY29sZ3JvdXAnLCAnY29udGVudCcsICdkYXRhJywgJ2RhdGFsaXN0JywgJ2RkJywgJ2RlY29yYXRvcicsICdkZWwnLCAnZGV0YWlscycsICdkZm4nLCAnZGlyJywgJ2RpdicsICdkbCcsICdkdCcsICdlbGVtZW50JywgJ2VtJywgJ2ZpZWxkc2V0JywgJ2ZpZ2NhcHRpb24nLCAnZmlndXJlJywgJ2ZvbnQnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaGVhZCcsICdoZWFkZXInLCAnaGdyb3VwJywgJ2hyJywgJ2h0bWwnLCAnaScsICdpbWcnLCAnaW5wdXQnLCAnaW5zJywgJ2tiZCcsICdsYWJlbCcsICdsZWdlbmQnLCAnbGknLCAnbWFpbicsICdtYXAnLCAnbWFyaycsICdtYXJxdWVlJywgJ21lbnUnLCAnbWVudWl0ZW0nLCAnbWV0ZXInLCAnbmF2JywgJ25vYnInLCAnb2wnLCAnb3B0Z3JvdXAnLCAnb3B0aW9uJywgJ291dHB1dCcsICdwJywgJ3BpY3R1cmUnLCAncHJlJywgJ3Byb2dyZXNzJywgJ3EnLCAncnAnLCAncnQnLCAncnVieScsICdzJywgJ3NhbXAnLCAnc2VjdGlvbicsICdzZWxlY3QnLCAnc2hhZG93JywgJ3NtYWxsJywgJ3NvdXJjZScsICdzcGFjZXInLCAnc3BhbicsICdzdHJpa2UnLCAnc3Ryb25nJywgJ3N0eWxlJywgJ3N1YicsICdzdW1tYXJ5JywgJ3N1cCcsICd0YWJsZScsICd0Ym9keScsICd0ZCcsICd0ZW1wbGF0ZScsICd0ZXh0YXJlYScsICd0Zm9vdCcsICd0aCcsICd0aGVhZCcsICd0aW1lJywgJ3RyJywgJ3RyYWNrJywgJ3R0JywgJ3UnLCAndWwnLCAndmFyJywgJ3ZpZGVvJywgJ3diciddKTtcblxuICAvLyBTVkdcbiAgdmFyIHN2ZyA9IGZyZWV6ZShbJ3N2ZycsICdhJywgJ2FsdGdseXBoJywgJ2FsdGdseXBoZGVmJywgJ2FsdGdseXBoaXRlbScsICdhbmltYXRlY29sb3InLCAnYW5pbWF0ZW1vdGlvbicsICdhbmltYXRldHJhbnNmb3JtJywgJ2F1ZGlvJywgJ2NhbnZhcycsICdjaXJjbGUnLCAnY2xpcHBhdGgnLCAnZGVmcycsICdkZXNjJywgJ2VsbGlwc2UnLCAnZmlsdGVyJywgJ2ZvbnQnLCAnZycsICdnbHlwaCcsICdnbHlwaHJlZicsICdoa2VybicsICdpbWFnZScsICdsaW5lJywgJ2xpbmVhcmdyYWRpZW50JywgJ21hcmtlcicsICdtYXNrJywgJ21ldGFkYXRhJywgJ21wYXRoJywgJ3BhdGgnLCAncGF0dGVybicsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JhZGlhbGdyYWRpZW50JywgJ3JlY3QnLCAnc3RvcCcsICdzdHlsZScsICdzd2l0Y2gnLCAnc3ltYm9sJywgJ3RleHQnLCAndGV4dHBhdGgnLCAndGl0bGUnLCAndHJlZicsICd0c3BhbicsICd2aWRlbycsICd2aWV3JywgJ3ZrZXJuJ10pO1xuXG4gIHZhciBzdmdGaWx0ZXJzID0gZnJlZXplKFsnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JywgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLCAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsICdmZURpc3BsYWNlbWVudE1hcCcsICdmZURpc3RhbnRMaWdodCcsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVNZXJnZScsICdmZU1lcmdlTm9kZScsICdmZU1vcnBob2xvZ3knLCAnZmVPZmZzZXQnLCAnZmVQb2ludExpZ2h0JywgJ2ZlU3BlY3VsYXJMaWdodGluZycsICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLCAnZmVUdXJidWxlbmNlJ10pO1xuXG4gIHZhciBtYXRoTWwgPSBmcmVlemUoWydtYXRoJywgJ21lbmNsb3NlJywgJ21lcnJvcicsICdtZmVuY2VkJywgJ21mcmFjJywgJ21nbHlwaCcsICdtaScsICdtbGFiZWxlZHRyJywgJ21tdWx0aXNjcmlwdHMnLCAnbW4nLCAnbW8nLCAnbW92ZXInLCAnbXBhZGRlZCcsICdtcGhhbnRvbScsICdtcm9vdCcsICdtcm93JywgJ21zJywgJ21zcGFjZScsICdtc3FydCcsICdtc3R5bGUnLCAnbXN1YicsICdtc3VwJywgJ21zdWJzdXAnLCAnbXRhYmxlJywgJ210ZCcsICdtdGV4dCcsICdtdHInLCAnbXVuZGVyJywgJ211bmRlcm92ZXInXSk7XG5cbiAgdmFyIHRleHQgPSBmcmVlemUoWycjdGV4dCddKTtcblxuICB2YXIgaHRtbCQxID0gZnJlZXplKFsnYWNjZXB0JywgJ2FjdGlvbicsICdhbGlnbicsICdhbHQnLCAnYXV0b2NhcGl0YWxpemUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9waWN0dXJlaW5waWN0dXJlJywgJ2F1dG9wbGF5JywgJ2JhY2tncm91bmQnLCAnYmdjb2xvcicsICdib3JkZXInLCAnY2FwdHVyZScsICdjZWxscGFkZGluZycsICdjZWxsc3BhY2luZycsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3MnLCAnY2xlYXInLCAnY29sb3InLCAnY29scycsICdjb2xzcGFuJywgJ2NvbnRyb2xzJywgJ2NvbnRyb2xzbGlzdCcsICdjb29yZHMnLCAnY3Jvc3NvcmlnaW4nLCAnZGF0ZXRpbWUnLCAnZGVjb2RpbmcnLCAnZGVmYXVsdCcsICdkaXInLCAnZGlzYWJsZWQnLCAnZGlzYWJsZXBpY3R1cmVpbnBpY3R1cmUnLCAnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsICdlbmN0eXBlJywgJ2VudGVya2V5aGludCcsICdmYWNlJywgJ2ZvcicsICdoZWFkZXJzJywgJ2hlaWdodCcsICdoaWRkZW4nLCAnaGlnaCcsICdocmVmJywgJ2hyZWZsYW5nJywgJ2lkJywgJ2lucHV0bW9kZScsICdpbnRlZ3JpdHknLCAnaXNtYXAnLCAna2luZCcsICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9hZGluZycsICdsb29wJywgJ2xvdycsICdtYXgnLCAnbWF4bGVuZ3RoJywgJ21lZGlhJywgJ21ldGhvZCcsICdtaW4nLCAnbWlubGVuZ3RoJywgJ211bHRpcGxlJywgJ211dGVkJywgJ25hbWUnLCAnbm9zaGFkZScsICdub3ZhbGlkYXRlJywgJ25vd3JhcCcsICdvcGVuJywgJ29wdGltdW0nLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdwbGF5c2lubGluZScsICdwb3N0ZXInLCAncHJlbG9hZCcsICdwdWJkYXRlJywgJ3JhZGlvZ3JvdXAnLCAncmVhZG9ubHknLCAncmVsJywgJ3JlcXVpcmVkJywgJ3JldicsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd3MnLCAncm93c3BhbicsICdzcGVsbGNoZWNrJywgJ3Njb3BlJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcmNsYW5nJywgJ3N0YXJ0JywgJ3NyYycsICdzcmNzZXQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JywgJ3RhYmluZGV4JywgJ3RpdGxlJywgJ3RyYW5zbGF0ZScsICd0eXBlJywgJ3VzZW1hcCcsICd2YWxpZ24nLCAndmFsdWUnLCAnd2lkdGgnLCAneG1sbnMnXSk7XG5cbiAgdmFyIHN2ZyQxID0gZnJlZXplKFsnYWNjZW50LWhlaWdodCcsICdhY2N1bXVsYXRlJywgJ2FkZGl0aXZlJywgJ2FsaWdubWVudC1iYXNlbGluZScsICdhc2NlbnQnLCAnYXR0cmlidXRlbmFtZScsICdhdHRyaWJ1dGV0eXBlJywgJ2F6aW11dGgnLCAnYmFzZWZyZXF1ZW5jeScsICdiYXNlbGluZS1zaGlmdCcsICdiZWdpbicsICdiaWFzJywgJ2J5JywgJ2NsYXNzJywgJ2NsaXAnLCAnY2xpcHBhdGh1bml0cycsICdjbGlwLXBhdGgnLCAnY2xpcC1ydWxlJywgJ2NvbG9yJywgJ2NvbG9yLWludGVycG9sYXRpb24nLCAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJywgJ2NvbG9yLXByb2ZpbGUnLCAnY29sb3ItcmVuZGVyaW5nJywgJ2N4JywgJ2N5JywgJ2QnLCAnZHgnLCAnZHknLCAnZGlmZnVzZWNvbnN0YW50JywgJ2RpcmVjdGlvbicsICdkaXNwbGF5JywgJ2Rpdmlzb3InLCAnZHVyJywgJ2VkZ2Vtb2RlJywgJ2VsZXZhdGlvbicsICdlbmQnLCAnZmlsbCcsICdmaWxsLW9wYWNpdHknLCAnZmlsbC1ydWxlJywgJ2ZpbHRlcicsICdmaWx0ZXJ1bml0cycsICdmbG9vZC1jb2xvcicsICdmbG9vZC1vcGFjaXR5JywgJ2ZvbnQtZmFtaWx5JywgJ2ZvbnQtc2l6ZScsICdmb250LXNpemUtYWRqdXN0JywgJ2ZvbnQtc3RyZXRjaCcsICdmb250LXN0eWxlJywgJ2ZvbnQtdmFyaWFudCcsICdmb250LXdlaWdodCcsICdmeCcsICdmeScsICdnMScsICdnMicsICdnbHlwaC1uYW1lJywgJ2dseXBocmVmJywgJ2dyYWRpZW50dW5pdHMnLCAnZ3JhZGllbnR0cmFuc2Zvcm0nLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnaW1hZ2UtcmVuZGVyaW5nJywgJ2luJywgJ2luMicsICdrJywgJ2sxJywgJ2syJywgJ2szJywgJ2s0JywgJ2tlcm5pbmcnLCAna2V5cG9pbnRzJywgJ2tleXNwbGluZXMnLCAna2V5dGltZXMnLCAnbGFuZycsICdsZW5ndGhhZGp1c3QnLCAnbGV0dGVyLXNwYWNpbmcnLCAna2VybmVsbWF0cml4JywgJ2tlcm5lbHVuaXRsZW5ndGgnLCAnbGlnaHRpbmctY29sb3InLCAnbG9jYWwnLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCcsICdtYXJrZXJoZWlnaHQnLCAnbWFya2VydW5pdHMnLCAnbWFya2Vyd2lkdGgnLCAnbWFza2NvbnRlbnR1bml0cycsICdtYXNrdW5pdHMnLCAnbWF4JywgJ21hc2snLCAnbWVkaWEnLCAnbWV0aG9kJywgJ21vZGUnLCAnbWluJywgJ25hbWUnLCAnbnVtb2N0YXZlcycsICdvZmZzZXQnLCAnb3BlcmF0b3InLCAnb3BhY2l0eScsICdvcmRlcicsICdvcmllbnQnLCAnb3JpZW50YXRpb24nLCAnb3JpZ2luJywgJ292ZXJmbG93JywgJ3BhaW50LW9yZGVyJywgJ3BhdGgnLCAncGF0aGxlbmd0aCcsICdwYXR0ZXJuY29udGVudHVuaXRzJywgJ3BhdHRlcm50cmFuc2Zvcm0nLCAncGF0dGVybnVuaXRzJywgJ3BvaW50cycsICdwcmVzZXJ2ZWFscGhhJywgJ3ByZXNlcnZlYXNwZWN0cmF0aW8nLCAncHJpbWl0aXZldW5pdHMnLCAncicsICdyeCcsICdyeScsICdyYWRpdXMnLCAncmVmeCcsICdyZWZ5JywgJ3JlcGVhdGNvdW50JywgJ3JlcGVhdGR1cicsICdyZXN0YXJ0JywgJ3Jlc3VsdCcsICdyb3RhdGUnLCAnc2NhbGUnLCAnc2VlZCcsICdzaGFwZS1yZW5kZXJpbmcnLCAnc3BlY3VsYXJjb25zdGFudCcsICdzcGVjdWxhcmV4cG9uZW50JywgJ3NwcmVhZG1ldGhvZCcsICdzdGFydG9mZnNldCcsICdzdGRkZXZpYXRpb24nLCAnc3RpdGNodGlsZXMnLCAnc3RvcC1jb2xvcicsICdzdG9wLW9wYWNpdHknLCAnc3Ryb2tlLWRhc2hhcnJheScsICdzdHJva2UtZGFzaG9mZnNldCcsICdzdHJva2UtbGluZWNhcCcsICdzdHJva2UtbGluZWpvaW4nLCAnc3Ryb2tlLW1pdGVybGltaXQnLCAnc3Ryb2tlLW9wYWNpdHknLCAnc3Ryb2tlJywgJ3N0cm9rZS13aWR0aCcsICdzdHlsZScsICdzdXJmYWNlc2NhbGUnLCAnc3lzdGVtbGFuZ3VhZ2UnLCAndGFiaW5kZXgnLCAndGFyZ2V0eCcsICd0YXJnZXR5JywgJ3RyYW5zZm9ybScsICd0ZXh0LWFuY2hvcicsICd0ZXh0LWRlY29yYXRpb24nLCAndGV4dC1yZW5kZXJpbmcnLCAndGV4dGxlbmd0aCcsICd0eXBlJywgJ3UxJywgJ3UyJywgJ3VuaWNvZGUnLCAndmFsdWVzJywgJ3ZpZXdib3gnLCAndmlzaWJpbGl0eScsICd2ZXJzaW9uJywgJ3ZlcnQtYWR2LXknLCAndmVydC1vcmlnaW4teCcsICd2ZXJ0LW9yaWdpbi15JywgJ3dpZHRoJywgJ3dvcmQtc3BhY2luZycsICd3cmFwJywgJ3dyaXRpbmctbW9kZScsICd4Y2hhbm5lbHNlbGVjdG9yJywgJ3ljaGFubmVsc2VsZWN0b3InLCAneCcsICd4MScsICd4MicsICd4bWxucycsICd5JywgJ3kxJywgJ3kyJywgJ3onLCAnem9vbWFuZHBhbiddKTtcblxuICB2YXIgbWF0aE1sJDEgPSBmcmVlemUoWydhY2NlbnQnLCAnYWNjZW50dW5kZXInLCAnYWxpZ24nLCAnYmV2ZWxsZWQnLCAnY2xvc2UnLCAnY29sdW1uc2FsaWduJywgJ2NvbHVtbmxpbmVzJywgJ2NvbHVtbnNwYW4nLCAnZGVub21hbGlnbicsICdkZXB0aCcsICdkaXInLCAnZGlzcGxheScsICdkaXNwbGF5c3R5bGUnLCAnZW5jb2RpbmcnLCAnZmVuY2UnLCAnZnJhbWUnLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnbGFyZ2VvcCcsICdsZW5ndGgnLCAnbGluZXRoaWNrbmVzcycsICdsc3BhY2UnLCAnbHF1b3RlJywgJ21hdGhiYWNrZ3JvdW5kJywgJ21hdGhjb2xvcicsICdtYXRoc2l6ZScsICdtYXRodmFyaWFudCcsICdtYXhzaXplJywgJ21pbnNpemUnLCAnbW92YWJsZWxpbWl0cycsICdub3RhdGlvbicsICdudW1hbGlnbicsICdvcGVuJywgJ3Jvd2FsaWduJywgJ3Jvd2xpbmVzJywgJ3Jvd3NwYWNpbmcnLCAncm93c3BhbicsICdyc3BhY2UnLCAncnF1b3RlJywgJ3NjcmlwdGxldmVsJywgJ3NjcmlwdG1pbnNpemUnLCAnc2NyaXB0c2l6ZW11bHRpcGxpZXInLCAnc2VsZWN0aW9uJywgJ3NlcGFyYXRvcicsICdzZXBhcmF0b3JzJywgJ3N0cmV0Y2h5JywgJ3N1YnNjcmlwdHNoaWZ0JywgJ3N1cHNjcmlwdHNoaWZ0JywgJ3N5bW1ldHJpYycsICd2b2Zmc2V0JywgJ3dpZHRoJywgJ3htbG5zJ10pO1xuXG4gIHZhciB4bWwgPSBmcmVlemUoWyd4bGluazpocmVmJywgJ3htbDppZCcsICd4bGluazp0aXRsZScsICd4bWw6c3BhY2UnLCAneG1sbnM6eGxpbmsnXSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vYmV0dGVyLXJlZ2V4XG4gIHZhciBNVVNUQUNIRV9FWFBSID0gc2VhbCgvXFx7XFx7W1xcc1xcU10qfFtcXHNcXFNdKlxcfVxcfS9nbSk7IC8vIFNwZWNpZnkgdGVtcGxhdGUgZGV0ZWN0aW9uIHJlZ2V4IGZvciBTQUZFX0ZPUl9URU1QTEFURVMgbW9kZVxuICB2YXIgRVJCX0VYUFIgPSBzZWFsKC88JVtcXHNcXFNdKnxbXFxzXFxTXSolPi9nbSk7XG4gIHZhciBEQVRBX0FUVFIgPSBzZWFsKC9eZGF0YS1bXFwtXFx3LlxcdTAwQjctXFx1RkZGRl0vKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICB2YXIgQVJJQV9BVFRSID0gc2VhbCgvXmFyaWEtW1xcLVxcd10rJC8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gIHZhciBJU19BTExPV0VEX1VSSSA9IHNlYWwoL14oPzooPzooPzpmfGh0KXRwcz98bWFpbHRvfHRlbHxjYWxsdG98Y2lkfHhtcHApOnxbXmEtel18W2EteisuXFwtXSsoPzpbXmEteisuXFwtOl18JCkpL2kgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICApO1xuICB2YXIgSVNfU0NSSVBUX09SX0RBVEEgPSBzZWFsKC9eKD86XFx3K3NjcmlwdHxkYXRhKTovaSk7XG4gIHZhciBBVFRSX1dISVRFU1BBQ0UgPSBzZWFsKC9bXFx1MDAwMC1cXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUxODBFXFx1MjAwMC1cXHUyMDI5XFx1MjA1RlxcdTMwMDBdL2cgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb250cm9sLXJlZ2V4XG4gICk7XG5cbiAgdmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4gIGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheSQxKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbiAgdmFyIGdldEdsb2JhbCA9IGZ1bmN0aW9uIGdldEdsb2JhbCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogd2luZG93O1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbm8tb3AgcG9saWN5IGZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogRG9uJ3QgZXhwb3J0IHRoaXMgZnVuY3Rpb24gb3V0c2lkZSB0aGlzIG1vZHVsZSFcbiAgICogQHBhcmFtIHs/VHJ1c3RlZFR5cGVQb2xpY3lGYWN0b3J5fSB0cnVzdGVkVHlwZXMgVGhlIHBvbGljeSBmYWN0b3J5LlxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBkb2N1bWVudCBUaGUgZG9jdW1lbnQgb2JqZWN0ICh0byBkZXRlcm1pbmUgcG9saWN5IG5hbWUgc3VmZml4KVxuICAgKiBAcmV0dXJuIHs/VHJ1c3RlZFR5cGVQb2xpY3l9IFRoZSBwb2xpY3kgY3JlYXRlZCAob3IgbnVsbCwgaWYgVHJ1c3RlZCBUeXBlc1xuICAgKiBhcmUgbm90IHN1cHBvcnRlZCkuXG4gICAqL1xuICB2YXIgX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSA9IGZ1bmN0aW9uIF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBkb2N1bWVudCkge1xuICAgIGlmICgodHlwZW9mIHRydXN0ZWRUeXBlcyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodHJ1c3RlZFR5cGVzKSkgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB0aGUgY2FsbGVycyB0byBjb250cm9sIHRoZSB1bmlxdWUgcG9saWN5IG5hbWVcbiAgICAvLyBieSBhZGRpbmcgYSBkYXRhLXR0LXBvbGljeS1zdWZmaXggdG8gdGhlIHNjcmlwdCBlbGVtZW50IHdpdGggdGhlIERPTVB1cmlmeS5cbiAgICAvLyBQb2xpY3kgY3JlYXRpb24gd2l0aCBkdXBsaWNhdGUgbmFtZXMgdGhyb3dzIGluIFRydXN0ZWQgVHlwZXMuXG4gICAgdmFyIHN1ZmZpeCA9IG51bGw7XG4gICAgdmFyIEFUVFJfTkFNRSA9ICdkYXRhLXR0LXBvbGljeS1zdWZmaXgnO1xuICAgIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuaGFzQXR0cmlidXRlKEFUVFJfTkFNRSkpIHtcbiAgICAgIHN1ZmZpeCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKEFUVFJfTkFNRSk7XG4gICAgfVxuXG4gICAgdmFyIHBvbGljeU5hbWUgPSAnZG9tcHVyaWZ5JyArIChzdWZmaXggPyAnIycgKyBzdWZmaXggOiAnJyk7XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kocG9saWN5TmFtZSwge1xuICAgICAgICBjcmVhdGVIVE1MOiBmdW5jdGlvbiBjcmVhdGVIVE1MKGh0bWwkJDEpIHtcbiAgICAgICAgICByZXR1cm4gaHRtbCQkMTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgLy8gUG9saWN5IGNyZWF0aW9uIGZhaWxlZCAobW9zdCBsaWtlbHkgYW5vdGhlciBET01QdXJpZnkgc2NyaXB0IGhhc1xuICAgICAgLy8gYWxyZWFkeSBydW4pLiBTa2lwIGNyZWF0aW5nIHRoZSBwb2xpY3ksIGFzIHRoaXMgd2lsbCBvbmx5IGNhdXNlIGVycm9yc1xuICAgICAgLy8gaWYgVFQgYXJlIGVuZm9yY2VkLlxuICAgICAgY29uc29sZS53YXJuKCdUcnVzdGVkVHlwZXMgcG9saWN5ICcgKyBwb2xpY3lOYW1lICsgJyBjb3VsZCBub3QgYmUgY3JlYXRlZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBjcmVhdGVET01QdXJpZnkoKSB7XG4gICAgdmFyIHdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZ2V0R2xvYmFsKCk7XG5cbiAgICB2YXIgRE9NUHVyaWZ5ID0gZnVuY3Rpb24gRE9NUHVyaWZ5KHJvb3QpIHtcbiAgICAgIHJldHVybiBjcmVhdGVET01QdXJpZnkocm9vdCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcnNpb24gbGFiZWwsIGV4cG9zZWQgZm9yIGVhc2llciBjaGVja3NcbiAgICAgKiBpZiBET01QdXJpZnkgaXMgdXAgdG8gZGF0ZSBvciBub3RcbiAgICAgKi9cbiAgICBET01QdXJpZnkudmVyc2lvbiA9ICcyLjEuMSc7XG5cbiAgICAvKipcbiAgICAgKiBBcnJheSBvZiBlbGVtZW50cyB0aGF0IERPTVB1cmlmeSByZW1vdmVkIGR1cmluZyBzYW5pdGF0aW9uLlxuICAgICAqIEVtcHR5IGlmIG5vdGhpbmcgd2FzIHJlbW92ZWQuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcblxuICAgIGlmICghd2luZG93IHx8ICF3aW5kb3cuZG9jdW1lbnQgfHwgd2luZG93LmRvY3VtZW50Lm5vZGVUeXBlICE9PSA5KSB7XG4gICAgICAvLyBOb3QgcnVubmluZyBpbiBhIGJyb3dzZXIsIHByb3ZpZGUgYSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAvLyBzbyB0aGF0IHlvdSBjYW4gcGFzcyB5b3VyIG93biBXaW5kb3dcbiAgICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IGZhbHNlO1xuXG4gICAgICByZXR1cm4gRE9NUHVyaWZ5O1xuICAgIH1cblxuICAgIHZhciBvcmlnaW5hbERvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuXG4gICAgdmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuICAgIHZhciBEb2N1bWVudEZyYWdtZW50ID0gd2luZG93LkRvY3VtZW50RnJhZ21lbnQsXG4gICAgICAgIEhUTUxUZW1wbGF0ZUVsZW1lbnQgPSB3aW5kb3cuSFRNTFRlbXBsYXRlRWxlbWVudCxcbiAgICAgICAgTm9kZSA9IHdpbmRvdy5Ob2RlLFxuICAgICAgICBOb2RlRmlsdGVyID0gd2luZG93Lk5vZGVGaWx0ZXIsXG4gICAgICAgIF93aW5kb3ckTmFtZWROb2RlTWFwID0gd2luZG93Lk5hbWVkTm9kZU1hcCxcbiAgICAgICAgTmFtZWROb2RlTWFwID0gX3dpbmRvdyROYW1lZE5vZGVNYXAgPT09IHVuZGVmaW5lZCA/IHdpbmRvdy5OYW1lZE5vZGVNYXAgfHwgd2luZG93Lk1vek5hbWVkQXR0ck1hcCA6IF93aW5kb3ckTmFtZWROb2RlTWFwLFxuICAgICAgICBUZXh0ID0gd2luZG93LlRleHQsXG4gICAgICAgIENvbW1lbnQgPSB3aW5kb3cuQ29tbWVudCxcbiAgICAgICAgRE9NUGFyc2VyID0gd2luZG93LkRPTVBhcnNlcixcbiAgICAgICAgdHJ1c3RlZFR5cGVzID0gd2luZG93LnRydXN0ZWRUeXBlcztcblxuICAgIC8vIEFzIHBlciBpc3N1ZSAjNDcsIHRoZSB3ZWItY29tcG9uZW50cyByZWdpc3RyeSBpcyBpbmhlcml0ZWQgYnkgYVxuICAgIC8vIG5ldyBkb2N1bWVudCBjcmVhdGVkIHZpYSBjcmVhdGVIVE1MRG9jdW1lbnQuIEFzIHBlciB0aGUgc3BlY1xuICAgIC8vIChodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJjb21wb25lbnRzL3NwZWMvY3VzdG9tLyNjcmVhdGluZy1hbmQtcGFzc2luZy1yZWdpc3RyaWVzKVxuICAgIC8vIGEgbmV3IGVtcHR5IHJlZ2lzdHJ5IGlzIHVzZWQgd2hlbiBjcmVhdGluZyBhIHRlbXBsYXRlIGNvbnRlbnRzIG93bmVyXG4gICAgLy8gZG9jdW1lbnQsIHNvIHdlIHVzZSB0aGF0IGFzIG91ciBwYXJlbnQgZG9jdW1lbnQgdG8gZW5zdXJlIG5vdGhpbmdcbiAgICAvLyBpcyBpbmhlcml0ZWQuXG5cbiAgICBpZiAodHlwZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICBpZiAodGVtcGxhdGUuY29udGVudCAmJiB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQgPSB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHRydXN0ZWRUeXBlc1BvbGljeSA9IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBvcmlnaW5hbERvY3VtZW50KTtcbiAgICB2YXIgZW1wdHlIVE1MID0gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCgnJykgOiAnJztcblxuICAgIHZhciBfZG9jdW1lbnQgPSBkb2N1bWVudCxcbiAgICAgICAgaW1wbGVtZW50YXRpb24gPSBfZG9jdW1lbnQuaW1wbGVtZW50YXRpb24sXG4gICAgICAgIGNyZWF0ZU5vZGVJdGVyYXRvciA9IF9kb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3IsXG4gICAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lID0gX2RvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lLFxuICAgICAgICBjcmVhdGVEb2N1bWVudEZyYWdtZW50ID0gX2RvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQ7XG4gICAgdmFyIGltcG9ydE5vZGUgPSBvcmlnaW5hbERvY3VtZW50LmltcG9ydE5vZGU7XG5cblxuICAgIHZhciBkb2N1bWVudE1vZGUgPSB7fTtcbiAgICB0cnkge1xuICAgICAgZG9jdW1lbnRNb2RlID0gY2xvbmUoZG9jdW1lbnQpLmRvY3VtZW50TW9kZSA/IGRvY3VtZW50LmRvY3VtZW50TW9kZSA6IHt9O1xuICAgIH0gY2F0Y2ggKF8pIHt9XG5cbiAgICB2YXIgaG9va3MgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEV4cG9zZSB3aGV0aGVyIHRoaXMgYnJvd3NlciBzdXBwb3J0cyBydW5uaW5nIHRoZSBmdWxsIERPTVB1cmlmeS5cbiAgICAgKi9cbiAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSBpbXBsZW1lbnRhdGlvbiAmJiB0eXBlb2YgaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudE1vZGUgIT09IDk7XG5cbiAgICB2YXIgTVVTVEFDSEVfRVhQUiQkMSA9IE1VU1RBQ0hFX0VYUFIsXG4gICAgICAgIEVSQl9FWFBSJCQxID0gRVJCX0VYUFIsXG4gICAgICAgIERBVEFfQVRUUiQkMSA9IERBVEFfQVRUUixcbiAgICAgICAgQVJJQV9BVFRSJCQxID0gQVJJQV9BVFRSLFxuICAgICAgICBJU19TQ1JJUFRfT1JfREFUQSQkMSA9IElTX1NDUklQVF9PUl9EQVRBLFxuICAgICAgICBBVFRSX1dISVRFU1BBQ0UkJDEgPSBBVFRSX1dISVRFU1BBQ0U7XG4gICAgdmFyIElTX0FMTE9XRURfVVJJJCQxID0gSVNfQUxMT1dFRF9VUkk7XG5cbiAgICAvKipcbiAgICAgKiBXZSBjb25zaWRlciB0aGUgZWxlbWVudHMgYW5kIGF0dHJpYnV0ZXMgYmVsb3cgdG8gYmUgc2FmZS4gSWRlYWxseVxuICAgICAqIGRvbid0IGFkZCBhbnkgbmV3IG9uZXMgYnV0IGZlZWwgZnJlZSB0byByZW1vdmUgdW53YW50ZWQgb25lcy5cbiAgICAgKi9cblxuICAgIC8qIGFsbG93ZWQgZWxlbWVudCBuYW1lcyAqL1xuXG4gICAgdmFyIEFMTE9XRURfVEFHUyA9IG51bGw7XG4gICAgdmFyIERFRkFVTFRfQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkkMShodG1sKSwgX3RvQ29uc3VtYWJsZUFycmF5JDEoc3ZnKSwgX3RvQ29uc3VtYWJsZUFycmF5JDEoc3ZnRmlsdGVycyksIF90b0NvbnN1bWFibGVBcnJheSQxKG1hdGhNbCksIF90b0NvbnN1bWFibGVBcnJheSQxKHRleHQpKSk7XG5cbiAgICAvKiBBbGxvd2VkIGF0dHJpYnV0ZSBuYW1lcyAqL1xuICAgIHZhciBBTExPV0VEX0FUVFIgPSBudWxsO1xuICAgIHZhciBERUZBVUxUX0FMTE9XRURfQVRUUiA9IGFkZFRvU2V0KHt9LCBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5JDEoaHRtbCQxKSwgX3RvQ29uc3VtYWJsZUFycmF5JDEoc3ZnJDEpLCBfdG9Db25zdW1hYmxlQXJyYXkkMShtYXRoTWwkMSksIF90b0NvbnN1bWFibGVBcnJheSQxKHhtbCkpKTtcblxuICAgIC8qIEV4cGxpY2l0bHkgZm9yYmlkZGVuIHRhZ3MgKG92ZXJyaWRlcyBBTExPV0VEX1RBR1MvQUREX1RBR1MpICovXG4gICAgdmFyIEZPUkJJRF9UQUdTID0gbnVsbDtcblxuICAgIC8qIEV4cGxpY2l0bHkgZm9yYmlkZGVuIGF0dHJpYnV0ZXMgKG92ZXJyaWRlcyBBTExPV0VEX0FUVFIvQUREX0FUVFIpICovXG4gICAgdmFyIEZPUkJJRF9BVFRSID0gbnVsbDtcblxuICAgIC8qIERlY2lkZSBpZiBBUklBIGF0dHJpYnV0ZXMgYXJlIG9rYXkgKi9cbiAgICB2YXIgQUxMT1dfQVJJQV9BVFRSID0gdHJ1ZTtcblxuICAgIC8qIERlY2lkZSBpZiBjdXN0b20gZGF0YSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgdmFyIEFMTE9XX0RBVEFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgdW5rbm93biBwcm90b2NvbHMgYXJlIG9rYXkgKi9cbiAgICB2YXIgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBmYWxzZTtcblxuICAgIC8qIE91dHB1dCBzaG91bGQgYmUgc2FmZSBmb3IgY29tbW9uIHRlbXBsYXRlIGVuZ2luZXMuXG4gICAgICogVGhpcyBtZWFucywgRE9NUHVyaWZ5IHJlbW92ZXMgZGF0YSBhdHRyaWJ1dGVzLCBtdXN0YWNoZXMgYW5kIEVSQlxuICAgICAqL1xuICAgIHZhciBTQUZFX0ZPUl9URU1QTEFURVMgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBkb2N1bWVudCB3aXRoIDxodG1sPi4uLiBzaG91bGQgYmUgcmV0dXJuZWQgKi9cbiAgICB2YXIgV0hPTEVfRE9DVU1FTlQgPSBmYWxzZTtcblxuICAgIC8qIFRyYWNrIHdoZXRoZXIgY29uZmlnIGlzIGFscmVhZHkgc2V0IG9uIHRoaXMgaW5zdGFuY2Ugb2YgRE9NUHVyaWZ5LiAqL1xuICAgIHZhciBTRVRfQ09ORklHID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgYWxsIGVsZW1lbnRzIChlLmcuIHN0eWxlLCBzY3JpcHQpIG11c3QgYmUgY2hpbGRyZW4gb2ZcbiAgICAgKiBkb2N1bWVudC5ib2R5LiBCeSBkZWZhdWx0LCBicm93c2VycyBtaWdodCBtb3ZlIHRoZW0gdG8gZG9jdW1lbnQuaGVhZCAqL1xuICAgIHZhciBGT1JDRV9CT0RZID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgYSBET00gYEhUTUxCb2R5RWxlbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAob3IgYSBUcnVzdGVkSFRNTCBvYmplY3QgaWYgVHJ1c3RlZCBUeXBlcyBhcmUgc3VwcG9ydGVkKS5cbiAgICAgKiBJZiBgV0hPTEVfRE9DVU1FTlRgIGlzIGVuYWJsZWQgYSBgSFRNTEh0bWxFbGVtZW50YCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWRcbiAgICAgKi9cbiAgICB2YXIgUkVUVVJOX0RPTSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBEb2N1bWVudEZyYWdtZW50YCBzaG91bGQgYmUgcmV0dXJuZWQsIGluc3RlYWQgb2YgYSBodG1sXG4gICAgICogc3RyaW5nICAob3IgYSBUcnVzdGVkSFRNTCBvYmplY3QgaWYgVHJ1c3RlZCBUeXBlcyBhcmUgc3VwcG9ydGVkKSAqL1xuICAgIHZhciBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBJZiBgUkVUVVJOX0RPTWAgb3IgYFJFVFVSTl9ET01fRlJBR01FTlRgIGlzIGVuYWJsZWQsIGRlY2lkZSBpZiB0aGUgcmV0dXJuZWQgRE9NXG4gICAgICogYE5vZGVgIGlzIGltcG9ydGVkIGludG8gdGhlIGN1cnJlbnQgYERvY3VtZW50YC4gSWYgdGhpcyBmbGFnIGlzIG5vdCBlbmFibGVkIHRoZVxuICAgICAqIGBOb2RlYCB3aWxsIGJlbG9uZyAoaXRzIG93bmVyRG9jdW1lbnQpIHRvIGEgZnJlc2ggYEhUTUxEb2N1bWVudGAsIGNyZWF0ZWQgYnlcbiAgICAgKiBET01QdXJpZnkuICovXG4gICAgdmFyIFJFVFVSTl9ET01fSU1QT1JUID0gZmFsc2U7XG5cbiAgICAvKiBUcnkgdG8gcmV0dXJuIGEgVHJ1c3RlZCBUeXBlIG9iamVjdCBpbnN0ZWFkIG9mIGEgc3RyaW5nLCByZXR1cm4gYSBzdHJpbmcgaW5cbiAgICAgKiBjYXNlIFRydXN0ZWQgVHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgICovXG4gICAgdmFyIFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBmYWxzZTtcblxuICAgIC8qIE91dHB1dCBzaG91bGQgYmUgZnJlZSBmcm9tIERPTSBjbG9iYmVyaW5nIGF0dGFja3M/ICovXG4gICAgdmFyIFNBTklUSVpFX0RPTSA9IHRydWU7XG5cbiAgICAvKiBLZWVwIGVsZW1lbnQgY29udGVudCB3aGVuIHJlbW92aW5nIGVsZW1lbnQ/ICovXG4gICAgdmFyIEtFRVBfQ09OVEVOVCA9IHRydWU7XG5cbiAgICAvKiBJZiBhIGBOb2RlYCBpcyBwYXNzZWQgdG8gc2FuaXRpemUoKSwgdGhlbiBwZXJmb3JtcyBzYW5pdGl6YXRpb24gaW4tcGxhY2UgaW5zdGVhZFxuICAgICAqIG9mIGltcG9ydGluZyBpdCBpbnRvIGEgbmV3IERvY3VtZW50IGFuZCByZXR1cm5pbmcgYSBzYW5pdGl6ZWQgY29weSAqL1xuICAgIHZhciBJTl9QTEFDRSA9IGZhbHNlO1xuXG4gICAgLyogQWxsb3cgdXNhZ2Ugb2YgcHJvZmlsZXMgbGlrZSBodG1sLCBzdmcgYW5kIG1hdGhNbCAqL1xuICAgIHZhciBVU0VfUFJPRklMRVMgPSB7fTtcblxuICAgIC8qIFRhZ3MgdG8gaWdub3JlIGNvbnRlbnQgb2Ygd2hlbiBLRUVQX0NPTlRFTlQgaXMgdHJ1ZSAqL1xuICAgIHZhciBGT1JCSURfQ09OVEVOVFMgPSBhZGRUb1NldCh7fSwgWydhbm5vdGF0aW9uLXhtbCcsICdhdWRpbycsICdjb2xncm91cCcsICdkZXNjJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGVhZCcsICdpZnJhbWUnLCAnbWF0aCcsICdtaScsICdtbicsICdtbycsICdtcycsICdtdGV4dCcsICdub2VtYmVkJywgJ25vZnJhbWVzJywgJ3BsYWludGV4dCcsICdzY3JpcHQnLCAnc3R5bGUnLCAnc3ZnJywgJ3RlbXBsYXRlJywgJ3RoZWFkJywgJ3RpdGxlJywgJ3ZpZGVvJywgJ3htcCddKTtcblxuICAgIC8qIFRhZ3MgdGhhdCBhcmUgc2FmZSBmb3IgZGF0YTogVVJJcyAqL1xuICAgIHZhciBEQVRBX1VSSV9UQUdTID0gbnVsbDtcbiAgICB2YXIgREVGQVVMVF9EQVRBX1VSSV9UQUdTID0gYWRkVG9TZXQoe30sIFsnYXVkaW8nLCAndmlkZW8nLCAnaW1nJywgJ3NvdXJjZScsICdpbWFnZScsICd0cmFjayddKTtcblxuICAgIC8qIEF0dHJpYnV0ZXMgc2FmZSBmb3IgdmFsdWVzIGxpa2UgXCJqYXZhc2NyaXB0OlwiICovXG4gICAgdmFyIFVSSV9TQUZFX0FUVFJJQlVURVMgPSBudWxsO1xuICAgIHZhciBERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVMgPSBhZGRUb1NldCh7fSwgWydhbHQnLCAnY2xhc3MnLCAnZm9yJywgJ2lkJywgJ2xhYmVsJywgJ25hbWUnLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdzdW1tYXJ5JywgJ3RpdGxlJywgJ3ZhbHVlJywgJ3N0eWxlJywgJ3htbG5zJ10pO1xuXG4gICAgLyogS2VlcCBhIHJlZmVyZW5jZSB0byBjb25maWcgdG8gcGFzcyB0byBob29rcyAqL1xuICAgIHZhciBDT05GSUcgPSBudWxsO1xuXG4gICAgLyogSWRlYWxseSwgZG8gbm90IHRvdWNoIGFueXRoaW5nIGJlbG93IHRoaXMgbGluZSAqL1xuICAgIC8qIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18gKi9cblxuICAgIHZhciBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcblxuICAgIC8qKlxuICAgICAqIF9wYXJzZUNvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjZmcgb3B0aW9uYWwgY29uZmlnIGxpdGVyYWxcbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIHZhciBfcGFyc2VDb25maWcgPSBmdW5jdGlvbiBfcGFyc2VDb25maWcoY2ZnKSB7XG4gICAgICBpZiAoQ09ORklHICYmIENPTkZJRyA9PT0gY2ZnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gdGFtcGVyaW5nICovXG4gICAgICBpZiAoIWNmZyB8fCAodHlwZW9mIGNmZyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoY2ZnKSkgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNmZyA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSBwcm90b3R5cGUgcG9sbHV0aW9uICovXG4gICAgICBjZmcgPSBjbG9uZShjZmcpO1xuXG4gICAgICAvKiBTZXQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzICovXG4gICAgICBBTExPV0VEX1RBR1MgPSAnQUxMT1dFRF9UQUdTJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfVEFHUykgOiBERUZBVUxUX0FMTE9XRURfVEFHUztcbiAgICAgIEFMTE9XRURfQVRUUiA9ICdBTExPV0VEX0FUVFInIGluIGNmZyA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9BVFRSKSA6IERFRkFVTFRfQUxMT1dFRF9BVFRSO1xuICAgICAgVVJJX1NBRkVfQVRUUklCVVRFUyA9ICdBRERfVVJJX1NBRkVfQVRUUicgaW4gY2ZnID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTKSwgY2ZnLkFERF9VUklfU0FGRV9BVFRSKSA6IERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUztcbiAgICAgIERBVEFfVVJJX1RBR1MgPSAnQUREX0RBVEFfVVJJX1RBR1MnIGluIGNmZyA/IGFkZFRvU2V0KGNsb25lKERFRkFVTFRfREFUQV9VUklfVEFHUyksIGNmZy5BRERfREFUQV9VUklfVEFHUykgOiBERUZBVUxUX0RBVEFfVVJJX1RBR1M7XG4gICAgICBGT1JCSURfVEFHUyA9ICdGT1JCSURfVEFHUycgaW4gY2ZnID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfVEFHUykgOiB7fTtcbiAgICAgIEZPUkJJRF9BVFRSID0gJ0ZPUkJJRF9BVFRSJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9BVFRSKSA6IHt9O1xuICAgICAgVVNFX1BST0ZJTEVTID0gJ1VTRV9QUk9GSUxFUycgaW4gY2ZnID8gY2ZnLlVTRV9QUk9GSUxFUyA6IGZhbHNlO1xuICAgICAgQUxMT1dfQVJJQV9BVFRSID0gY2ZnLkFMTE9XX0FSSUFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgQUxMT1dfREFUQV9BVFRSID0gY2ZnLkFMTE9XX0RBVEFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBjZmcuQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFNBRkVfRk9SX1RFTVBMQVRFUyA9IGNmZy5TQUZFX0ZPUl9URU1QTEFURVMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFdIT0xFX0RPQ1VNRU5UID0gY2ZnLldIT0xFX0RPQ1VNRU5UIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NID0gY2ZnLlJFVFVSTl9ET00gfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9ET01fRlJBR01FTlQgPSBjZmcuUkVUVVJOX0RPTV9GUkFHTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTV9JTVBPUlQgPSBjZmcuUkVUVVJOX0RPTV9JTVBPUlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBjZmcuUkVUVVJOX1RSVVNURURfVFlQRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgRk9SQ0VfQk9EWSA9IGNmZy5GT1JDRV9CT0RZIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBTQU5JVElaRV9ET00gPSBjZmcuU0FOSVRJWkVfRE9NICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBLRUVQX0NPTlRFTlQgPSBjZmcuS0VFUF9DT05URU5UICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBJTl9QTEFDRSA9IGNmZy5JTl9QTEFDRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgSVNfQUxMT1dFRF9VUkkkJDEgPSBjZmcuQUxMT1dFRF9VUklfUkVHRVhQIHx8IElTX0FMTE9XRURfVVJJJCQxO1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBBTExPV19EQVRBX0FUVFIgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgUkVUVVJOX0RPTSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFBhcnNlIHByb2ZpbGUgaW5mbyAqL1xuICAgICAgaWYgKFVTRV9QUk9GSUxFUykge1xuICAgICAgICBBTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSQxKHRleHQpKSk7XG4gICAgICAgIEFMTE9XRURfQVRUUiA9IFtdO1xuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLmh0bWwgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGh0bWwpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgaHRtbCQxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMuc3ZnID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBzdmcpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMuc3ZnRmlsdGVycyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnRmlsdGVycyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBzdmckMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5tYXRoTWwgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIG1hdGhNbCk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBtYXRoTWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIE1lcmdlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgICAgaWYgKGNmZy5BRERfVEFHUykge1xuICAgICAgICBpZiAoQUxMT1dFRF9UQUdTID09PSBERUZBVUxUX0FMTE9XRURfVEFHUykge1xuICAgICAgICAgIEFMTE9XRURfVEFHUyA9IGNsb25lKEFMTE9XRURfVEFHUyk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGNmZy5BRERfVEFHUyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjZmcuQUREX0FUVFIpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfQVRUUiA9PT0gREVGQVVMVF9BTExPV0VEX0FUVFIpIHtcbiAgICAgICAgICBBTExPV0VEX0FUVFIgPSBjbG9uZShBTExPV0VEX0FUVFIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBjZmcuQUREX0FUVFIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ZnLkFERF9VUklfU0FGRV9BVFRSKSB7XG4gICAgICAgIGFkZFRvU2V0KFVSSV9TQUZFX0FUVFJJQlVURVMsIGNmZy5BRERfVVJJX1NBRkVfQVRUUik7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCAjdGV4dCBpbiBjYXNlIEtFRVBfQ09OVEVOVCBpcyBzZXQgdG8gdHJ1ZSAqL1xuICAgICAgaWYgKEtFRVBfQ09OVEVOVCkge1xuICAgICAgICBBTExPV0VEX1RBR1NbJyN0ZXh0J10gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgaHRtbCwgaGVhZCBhbmQgYm9keSB0byBBTExPV0VEX1RBR1MgaW4gY2FzZSBXSE9MRV9ET0NVTUVOVCBpcyB0cnVlICovXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ2h0bWwnLCAnaGVhZCcsICdib2R5J10pO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgdGJvZHkgdG8gQUxMT1dFRF9UQUdTIGluIGNhc2UgdGFibGVzIGFyZSBwZXJtaXR0ZWQsIHNlZSAjMjg2LCAjMzY1ICovXG4gICAgICBpZiAoQUxMT1dFRF9UQUdTLnRhYmxlKSB7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgWyd0Ym9keSddKTtcbiAgICAgICAgZGVsZXRlIEZPUkJJRF9UQUdTLnRib2R5O1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50IGZ1cnRoZXIgbWFuaXB1bGF0aW9uIG9mIGNvbmZpZ3VyYXRpb24uXG4gICAgICAvLyBOb3QgYXZhaWxhYmxlIGluIElFOCwgU2FmYXJpIDUsIGV0Yy5cbiAgICAgIGlmIChmcmVlemUpIHtcbiAgICAgICAgZnJlZXplKGNmZyk7XG4gICAgICB9XG5cbiAgICAgIENPTkZJRyA9IGNmZztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2ZvcmNlUmVtb3ZlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICB2YXIgX2ZvcmNlUmVtb3ZlID0gZnVuY3Rpb24gX2ZvcmNlUmVtb3ZlKG5vZGUpIHtcbiAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwgeyBlbGVtZW50OiBub2RlIH0pO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBub2RlLm91dGVySFRNTCA9IGVtcHR5SFRNTDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3JlbW92ZUF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIGFuIEF0dHJpYnV0ZSBuYW1lXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBhIERPTSBub2RlXG4gICAgICovXG4gICAgdmFyIF9yZW1vdmVBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIG5vZGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbm9kZS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpLFxuICAgICAgICAgIGZyb206IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbnVsbCxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2luaXREb2N1bWVudFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBkaXJ0eSBhIHN0cmluZyBvZiBkaXJ0eSBtYXJrdXBcbiAgICAgKiBAcmV0dXJuIHtEb2N1bWVudH0gYSBET00sIGZpbGxlZCB3aXRoIHRoZSBkaXJ0eSBtYXJrdXBcbiAgICAgKi9cbiAgICB2YXIgX2luaXREb2N1bWVudCA9IGZ1bmN0aW9uIF9pbml0RG9jdW1lbnQoZGlydHkpIHtcbiAgICAgIC8qIENyZWF0ZSBhIEhUTUwgZG9jdW1lbnQgKi9cbiAgICAgIHZhciBkb2MgPSB2b2lkIDA7XG4gICAgICB2YXIgbGVhZGluZ1doaXRlc3BhY2UgPSB2b2lkIDA7XG5cbiAgICAgIGlmIChGT1JDRV9CT0RZKSB7XG4gICAgICAgIGRpcnR5ID0gJzxyZW1vdmU+PC9yZW1vdmU+JyArIGRpcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogSWYgRk9SQ0VfQk9EWSBpc24ndCB1c2VkLCBsZWFkaW5nIHdoaXRlc3BhY2UgbmVlZHMgdG8gYmUgcHJlc2VydmVkIG1hbnVhbGx5ICovXG4gICAgICAgIHZhciBtYXRjaGVzID0gc3RyaW5nTWF0Y2goZGlydHksIC9eW1xcclxcblxcdCBdKy8pO1xuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZSA9IG1hdGNoZXMgJiYgbWF0Y2hlc1swXTtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpcnR5UGF5bG9hZCA9IHRydXN0ZWRUeXBlc1BvbGljeSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgLyogVXNlIHRoZSBET01QYXJzZXIgQVBJIGJ5IGRlZmF1bHQsIGZhbGxiYWNrIGxhdGVyIGlmIG5lZWRzIGJlICovXG4gICAgICB0cnkge1xuICAgICAgICBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRpcnR5UGF5bG9hZCwgJ3RleHQvaHRtbCcpO1xuICAgICAgfSBjYXRjaCAoXykge31cblxuICAgICAgLyogVXNlIGNyZWF0ZUhUTUxEb2N1bWVudCBpbiBjYXNlIERPTVBhcnNlciBpcyBub3QgYXZhaWxhYmxlICovXG4gICAgICBpZiAoIWRvYyB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICBkb2MgPSBpbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJycpO1xuICAgICAgICB2YXIgX2RvYyA9IGRvYyxcbiAgICAgICAgICAgIGJvZHkgPSBfZG9jLmJvZHk7XG5cbiAgICAgICAgYm9keS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJvZHkucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCk7XG4gICAgICAgIGJvZHkub3V0ZXJIVE1MID0gZGlydHlQYXlsb2FkO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlydHkgJiYgbGVhZGluZ1doaXRlc3BhY2UpIHtcbiAgICAgICAgZG9jLmJvZHkuaW5zZXJ0QmVmb3JlKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGxlYWRpbmdXaGl0ZXNwYWNlKSwgZG9jLmJvZHkuY2hpbGROb2Rlc1swXSB8fCBudWxsKTtcbiAgICAgIH1cblxuICAgICAgLyogV29yayBvbiB3aG9sZSBkb2N1bWVudCBvciBqdXN0IGl0cyBib2R5ICovXG4gICAgICByZXR1cm4gZ2V0RWxlbWVudHNCeVRhZ05hbWUuY2FsbChkb2MsIFdIT0xFX0RPQ1VNRU5UID8gJ2h0bWwnIDogJ2JvZHknKVswXTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2NyZWF0ZUl0ZXJhdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtEb2N1bWVudH0gcm9vdCBkb2N1bWVudC9mcmFnbWVudCB0byBjcmVhdGUgaXRlcmF0b3IgZm9yXG4gICAgICogQHJldHVybiB7SXRlcmF0b3J9IGl0ZXJhdG9yIGluc3RhbmNlXG4gICAgICovXG4gICAgdmFyIF9jcmVhdGVJdGVyYXRvciA9IGZ1bmN0aW9uIF9jcmVhdGVJdGVyYXRvcihyb290KSB7XG4gICAgICByZXR1cm4gY3JlYXRlTm9kZUl0ZXJhdG9yLmNhbGwocm9vdC5vd25lckRvY3VtZW50IHx8IHJvb3QsIHJvb3QsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UIHwgTm9kZUZpbHRlci5TSE9XX0NPTU1FTlQgfCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNDbG9iYmVyZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IGVsbSBlbGVtZW50IHRvIGNoZWNrIGZvciBjbG9iYmVyaW5nIGF0dGFja3NcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGNsb2JiZXJlZCwgZmFsc2UgaWYgc2FmZVxuICAgICAqL1xuICAgIHZhciBfaXNDbG9iYmVyZWQgPSBmdW5jdGlvbiBfaXNDbG9iYmVyZWQoZWxtKSB7XG4gICAgICBpZiAoZWxtIGluc3RhbmNlb2YgVGV4dCB8fCBlbG0gaW5zdGFuY2VvZiBDb21tZW50KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBlbG0ubm9kZU5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0udGV4dENvbnRlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQ2hpbGQgIT09ICdmdW5jdGlvbicgfHwgIShlbG0uYXR0cmlidXRlcyBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCkgfHwgdHlwZW9mIGVsbS5yZW1vdmVBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5zZXRBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5uYW1lc3BhY2VVUkkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc05vZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IG9iaiBvYmplY3QgdG8gY2hlY2sgd2hldGhlciBpdCdzIGEgRE9NIG5vZGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlzIG9iamVjdCBpcyBhIERPTSBub2RlXG4gICAgICovXG4gICAgdmFyIF9pc05vZGUgPSBmdW5jdGlvbiBfaXNOb2RlKG9iamVjdCkge1xuICAgICAgcmV0dXJuICh0eXBlb2YgTm9kZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoTm9kZSkpID09PSAnb2JqZWN0JyA/IG9iamVjdCBpbnN0YW5jZW9mIE5vZGUgOiBvYmplY3QgJiYgKHR5cGVvZiBvYmplY3QgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9iamVjdCkpID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqZWN0Lm5vZGVUeXBlID09PSAnbnVtYmVyJyAmJiB0eXBlb2Ygb2JqZWN0Lm5vZGVOYW1lID09PSAnc3RyaW5nJztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2V4ZWN1dGVIb29rXG4gICAgICogRXhlY3V0ZSB1c2VyIGNvbmZpZ3VyYWJsZSBob29rc1xuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50ICBOYW1lIG9mIHRoZSBob29rJ3MgZW50cnkgcG9pbnRcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSBub2RlIHRvIHdvcmsgb24gd2l0aCB0aGUgaG9va1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBhZGRpdGlvbmFsIGhvb2sgcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIHZhciBfZXhlY3V0ZUhvb2sgPSBmdW5jdGlvbiBfZXhlY3V0ZUhvb2soZW50cnlQb2ludCwgY3VycmVudE5vZGUsIGRhdGEpIHtcbiAgICAgIGlmICghaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcnJheUZvckVhY2goaG9va3NbZW50cnlQb2ludF0sIGZ1bmN0aW9uIChob29rKSB7XG4gICAgICAgIGhvb2suY2FsbChET01QdXJpZnksIGN1cnJlbnROb2RlLCBkYXRhLCBDT05GSUcpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZUVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdCBub2RlTmFtZVxuICAgICAqIEBwcm90ZWN0IHRleHRDb250ZW50XG4gICAgICogQHByb3RlY3QgcmVtb3ZlQ2hpbGRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBjaGVjayBmb3IgcGVybWlzc2lvbiB0byBleGlzdFxuICAgICAqIEByZXR1cm4gIHtCb29sZWFufSB0cnVlIGlmIG5vZGUgd2FzIGtpbGxlZCwgZmFsc2UgaWYgbGVmdCBhbGl2ZVxuICAgICAqL1xuICAgIHZhciBfc2FuaXRpemVFbGVtZW50cyA9IGZ1bmN0aW9uIF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSB7XG4gICAgICB2YXIgY29udGVudCA9IHZvaWQgMDtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZUVsZW1lbnRzJywgY3VycmVudE5vZGUsIG51bGwpO1xuXG4gICAgICAvKiBDaGVjayBpZiBlbGVtZW50IGlzIGNsb2JiZXJlZCBvciBjYW4gY2xvYmJlciAqL1xuICAgICAgaWYgKF9pc0Nsb2JiZXJlZChjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIENoZWNrIGlmIHRhZ25hbWUgY29udGFpbnMgVW5pY29kZSAqL1xuICAgICAgaWYgKHN0cmluZ01hdGNoKGN1cnJlbnROb2RlLm5vZGVOYW1lLCAvW1xcdTAwODAtXFx1RkZGRl0vKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogTm93IGxldCdzIGNoZWNrIHRoZSBlbGVtZW50J3MgdHlwZSBhbmQgbmFtZSAqL1xuICAgICAgdmFyIHRhZ05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShjdXJyZW50Tm9kZS5ub2RlTmFtZSk7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplRWxlbWVudCcsIGN1cnJlbnROb2RlLCB7XG4gICAgICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgICAgIGFsbG93ZWRUYWdzOiBBTExPV0VEX1RBR1NcbiAgICAgIH0pO1xuXG4gICAgICAvKiBUYWtlIGNhcmUgb2YgYW4gbVhTUyBwYXR0ZXJuIHVzaW5nIHAsIGJyIGluc2lkZSBzdmcsIG1hdGggKi9cbiAgICAgIGlmICgodGFnTmFtZSA9PT0gJ3N2ZycgfHwgdGFnTmFtZSA9PT0gJ21hdGgnKSAmJiBjdXJyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdwLCBicicpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogRGV0ZWN0IG1YU1MgYXR0ZW1wdHMgYWJ1c2luZyBuYW1lc3BhY2UgY29uZnVzaW9uICovXG4gICAgICBpZiAoIV9pc05vZGUoY3VycmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpICYmICghX2lzTm9kZShjdXJyZW50Tm9kZS5jb250ZW50KSB8fCAhX2lzTm9kZShjdXJyZW50Tm9kZS5jb250ZW50LmZpcnN0RWxlbWVudENoaWxkKSkgJiYgcmVnRXhwVGVzdCgvPFshL1xcd10vZywgY3VycmVudE5vZGUuaW5uZXJIVE1MKSAmJiByZWdFeHBUZXN0KC88WyEvXFx3XS9nLCBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBlbGVtZW50IGlmIGFueXRoaW5nIGZvcmJpZHMgaXRzIHByZXNlbmNlICovXG4gICAgICBpZiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkge1xuICAgICAgICAvKiBLZWVwIGNvbnRlbnQgZXhjZXB0IGZvciBiYWQtbGlzdGVkIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChLRUVQX0NPTlRFTlQgJiYgIUZPUkJJRF9DT05URU5UU1t0YWdOYW1lXSAmJiB0eXBlb2YgY3VycmVudE5vZGUuaW5zZXJ0QWRqYWNlbnRIVE1MID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBodG1sVG9JbnNlcnQgPSBjdXJyZW50Tm9kZS5pbm5lckhUTUw7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5pbnNlcnRBZGphY2VudEhUTUwoJ0FmdGVyRW5kJywgdHJ1c3RlZFR5cGVzUG9saWN5ID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoaHRtbFRvSW5zZXJ0KSA6IGh0bWxUb0luc2VydCk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgfVxuXG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBSZW1vdmUgaW4gY2FzZSBhIG5vc2NyaXB0L25vZW1iZWQgWFNTIGlzIHN1c3BlY3RlZCAqL1xuICAgICAgaWYgKCh0YWdOYW1lID09PSAnbm9zY3JpcHQnIHx8IHRhZ05hbWUgPT09ICdub2VtYmVkJykgJiYgcmVnRXhwVGVzdCgvPFxcL25vKHNjcmlwdHxlbWJlZCkvaSwgY3VycmVudE5vZGUuaW5uZXJIVE1MKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogU2FuaXRpemUgZWxlbWVudCBjb250ZW50IHRvIGJlIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgLyogR2V0IHRoZSBlbGVtZW50J3MgdGV4dCBjb250ZW50ICovXG4gICAgICAgIGNvbnRlbnQgPSBjdXJyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICAgICAgY29udGVudCA9IHN0cmluZ1JlcGxhY2UoY29udGVudCwgTVVTVEFDSEVfRVhQUiQkMSwgJyAnKTtcbiAgICAgICAgY29udGVudCA9IHN0cmluZ1JlcGxhY2UoY29udGVudCwgRVJCX0VYUFIkJDEsICcgJyk7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS50ZXh0Q29udGVudCAhPT0gY29udGVudCkge1xuICAgICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwgeyBlbGVtZW50OiBjdXJyZW50Tm9kZS5jbG9uZU5vZGUoKSB9KTtcbiAgICAgICAgICBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplRWxlbWVudHMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNUYWcgTG93ZXJjYXNlIHRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjTmFtZSBMb3dlcmNhc2UgYXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIHZhciBfaXNWYWxpZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSB7XG4gICAgICAvKiBNYWtlIHN1cmUgYXR0cmlidXRlIGNhbm5vdCBjbG9iYmVyICovXG4gICAgICBpZiAoU0FOSVRJWkVfRE9NICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpICYmICh2YWx1ZSBpbiBkb2N1bWVudCB8fCB2YWx1ZSBpbiBmb3JtRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvKiBBbGxvdyB2YWxpZCBkYXRhLSogYXR0cmlidXRlczogQXQgbGVhc3Qgb25lIGNoYXJhY3RlciBhZnRlciBcIi1cIlxuICAgICAgICAgIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9kb20uaHRtbCNlbWJlZGRpbmctY3VzdG9tLW5vbi12aXNpYmxlLWRhdGEtd2l0aC10aGUtZGF0YS0qLWF0dHJpYnV0ZXMpXG4gICAgICAgICAgWE1MLWNvbXBhdGlibGUgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZnJhc3RydWN0dXJlLmh0bWwjeG1sLWNvbXBhdGlibGUgYW5kIGh0dHA6Ly93d3cudzMub3JnL1RSL3htbC8jZDBlODA0KVxuICAgICAgICAgIFdlIGRvbid0IG5lZWQgdG8gY2hlY2sgdGhlIHZhbHVlOyBpdCdzIGFsd2F5cyBVUkkgc2FmZS4gKi9cbiAgICAgIGlmIChBTExPV19EQVRBX0FUVFIgJiYgcmVnRXhwVGVzdChEQVRBX0FUVFIkJDEsIGxjTmFtZSkpIDsgZWxzZSBpZiAoQUxMT1dfQVJJQV9BVFRSICYmIHJlZ0V4cFRlc3QoQVJJQV9BVFRSJCQxLCBsY05hbWUpKSA7IGVsc2UgaWYgKCFBTExPV0VEX0FUVFJbbGNOYW1lXSB8fCBGT1JCSURfQVRUUltsY05hbWVdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvKiBDaGVjayB2YWx1ZSBpcyBzYWZlLiBGaXJzdCwgaXMgYXR0ciBpbmVydD8gSWYgc28sIGlzIHNhZmUgKi9cbiAgICAgIH0gZWxzZSBpZiAoVVJJX1NBRkVfQVRUUklCVVRFU1tsY05hbWVdKSA7IGVsc2UgaWYgKHJlZ0V4cFRlc3QoSVNfQUxMT1dFRF9VUkkkJDEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSQkMSwgJycpKSkgOyBlbHNlIGlmICgobGNOYW1lID09PSAnc3JjJyB8fCBsY05hbWUgPT09ICd4bGluazpocmVmJyB8fCBsY05hbWUgPT09ICdocmVmJykgJiYgbGNUYWcgIT09ICdzY3JpcHQnICYmIHN0cmluZ0luZGV4T2YodmFsdWUsICdkYXRhOicpID09PSAwICYmIERBVEFfVVJJX1RBR1NbbGNUYWddKSA7IGVsc2UgaWYgKEFMTE9XX1VOS05PV05fUFJPVE9DT0xTICYmICFyZWdFeHBUZXN0KElTX1NDUklQVF9PUl9EQVRBJCQxLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UkJDEsICcnKSkpIDsgZWxzZSBpZiAoIXZhbHVlKSA7IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVBdHRyaWJ1dGVzXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdCBhdHRyaWJ1dGVzXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCByZW1vdmVBdHRyaWJ1dGVcbiAgICAgKiBAcHJvdGVjdCBzZXRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IGN1cnJlbnROb2RlIHRvIHNhbml0aXplXG4gICAgICovXG4gICAgdmFyIF9zYW5pdGl6ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKSB7XG4gICAgICB2YXIgYXR0ciA9IHZvaWQgMDtcbiAgICAgIHZhciB2YWx1ZSA9IHZvaWQgMDtcbiAgICAgIHZhciBsY05hbWUgPSB2b2lkIDA7XG4gICAgICB2YXIgbCA9IHZvaWQgMDtcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuXG4gICAgICB2YXIgYXR0cmlidXRlcyA9IGN1cnJlbnROb2RlLmF0dHJpYnV0ZXM7XG5cbiAgICAgIC8qIENoZWNrIGlmIHdlIGhhdmUgYXR0cmlidXRlczsgaWYgbm90IHdlIG1pZ2h0IGhhdmUgYSB0ZXh0IG5vZGUgKi9cblxuICAgICAgaWYgKCFhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGhvb2tFdmVudCA9IHtcbiAgICAgICAgYXR0ck5hbWU6ICcnLFxuICAgICAgICBhdHRyVmFsdWU6ICcnLFxuICAgICAgICBrZWVwQXR0cjogdHJ1ZSxcbiAgICAgICAgYWxsb3dlZEF0dHJpYnV0ZXM6IEFMTE9XRURfQVRUUlxuICAgICAgfTtcbiAgICAgIGwgPSBhdHRyaWJ1dGVzLmxlbmd0aDtcblxuICAgICAgLyogR28gYmFja3dhcmRzIG92ZXIgYWxsIGF0dHJpYnV0ZXM7IHNhZmVseSByZW1vdmUgYmFkIG9uZXMgKi9cbiAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgYXR0ciA9IGF0dHJpYnV0ZXNbbF07XG4gICAgICAgIHZhciBfYXR0ciA9IGF0dHIsXG4gICAgICAgICAgICBuYW1lID0gX2F0dHIubmFtZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZVVSSSA9IF9hdHRyLm5hbWVzcGFjZVVSSTtcblxuICAgICAgICB2YWx1ZSA9IHN0cmluZ1RyaW0oYXR0ci52YWx1ZSk7XG4gICAgICAgIGxjTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKG5hbWUpO1xuXG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgICAgaG9va0V2ZW50LmF0dHJOYW1lID0gbGNOYW1lO1xuICAgICAgICBob29rRXZlbnQuYXR0clZhbHVlID0gdmFsdWU7XG4gICAgICAgIGhvb2tFdmVudC5rZWVwQXR0ciA9IHRydWU7XG4gICAgICAgIGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyID0gdW5kZWZpbmVkOyAvLyBBbGxvd3MgZGV2ZWxvcGVycyB0byBzZWUgdGhpcyBpcyBhIHByb3BlcnR5IHRoZXkgY2FuIHNldFxuICAgICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUF0dHJpYnV0ZScsIGN1cnJlbnROb2RlLCBob29rRXZlbnQpO1xuICAgICAgICB2YWx1ZSA9IGhvb2tFdmVudC5hdHRyVmFsdWU7XG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoaG9va0V2ZW50LmZvcmNlS2VlcEF0dHIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFJlbW92ZSBhdHRyaWJ1dGUgKi9cbiAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgLyogRGlkIHRoZSBob29rcyBhcHByb3ZlIG9mIHRoZSBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGlmICghaG9va0V2ZW50LmtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBXb3JrIGFyb3VuZCBhIHNlY3VyaXR5IGlzc3VlIGluIGpRdWVyeSAzLjAgKi9cbiAgICAgICAgaWYgKHJlZ0V4cFRlc3QoL1xcLz4vaSwgdmFsdWUpKSB7XG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTYW5pdGl6ZSBhdHRyaWJ1dGUgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgICB2YWx1ZSA9IHN0cmluZ1JlcGxhY2UodmFsdWUsIE1VU1RBQ0hFX0VYUFIkJDEsICcgJyk7XG4gICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBFUkJfRVhQUiQkMSwgJyAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIElzIGB2YWx1ZWAgdmFsaWQgZm9yIHRoaXMgYXR0cmlidXRlPyAqL1xuICAgICAgICB2YXIgbGNUYWcgPSBjdXJyZW50Tm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoIV9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGludmFsaWQgZGF0YS0qIGF0dHJpYnV0ZSBzZXQgYnkgdHJ5LWNhdGNoaW5nIGl0ICovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVVJJLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qIEZhbGxiYWNrIHRvIHNldEF0dHJpYnV0ZSgpIGZvciBicm93c2VyLXVucmVjb2duaXplZCBuYW1lc3BhY2VzIGUuZy4gXCJ4LXNjaGVtYVwiLiAqL1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhcnJheVBvcChET01QdXJpZnkucmVtb3ZlZCk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZUF0dHJpYnV0ZXMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZVNoYWRvd0RPTVxuICAgICAqXG4gICAgICogQHBhcmFtICB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ21lbnQgdG8gaXRlcmF0ZSBvdmVyIHJlY3Vyc2l2ZWx5XG4gICAgICovXG4gICAgdmFyIF9zYW5pdGl6ZVNoYWRvd0RPTSA9IGZ1bmN0aW9uIF9zYW5pdGl6ZVNoYWRvd0RPTShmcmFnbWVudCkge1xuICAgICAgdmFyIHNoYWRvd05vZGUgPSB2b2lkIDA7XG4gICAgICB2YXIgc2hhZG93SXRlcmF0b3IgPSBfY3JlYXRlSXRlcmF0b3IoZnJhZ21lbnQpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplU2hhZG93RE9NJywgZnJhZ21lbnQsIG51bGwpO1xuXG4gICAgICB3aGlsZSAoc2hhZG93Tm9kZSA9IHNoYWRvd0l0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZVNoYWRvd05vZGUnLCBzaGFkb3dOb2RlLCBudWxsKTtcblxuICAgICAgICAvKiBTYW5pdGl6ZSB0YWdzIGFuZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoX3Nhbml0aXplRWxlbWVudHMoc2hhZG93Tm9kZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIERlZXAgc2hhZG93IERPTSBkZXRlY3RlZCAqL1xuICAgICAgICBpZiAoc2hhZG93Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShzaGFkb3dOb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXG4gICAgICAgIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoc2hhZG93Tm9kZSk7XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2FuaXRpemVcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHByb3ZpZGluZyBjb3JlIHNhbml0YXRpb24gZnVuY3Rpb25hbGl0eVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8Tm9kZX0gZGlydHkgc3RyaW5nIG9yIERPTSBub2RlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBET01QdXJpZnkuc2FuaXRpemUgPSBmdW5jdGlvbiAoZGlydHksIGNmZykge1xuICAgICAgdmFyIGJvZHkgPSB2b2lkIDA7XG4gICAgICB2YXIgaW1wb3J0ZWROb2RlID0gdm9pZCAwO1xuICAgICAgdmFyIGN1cnJlbnROb2RlID0gdm9pZCAwO1xuICAgICAgdmFyIG9sZE5vZGUgPSB2b2lkIDA7XG4gICAgICB2YXIgcmV0dXJuTm9kZSA9IHZvaWQgMDtcbiAgICAgIC8qIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgc3RyaW5nIHRvIHNhbml0aXplLlxuICAgICAgICBETyBOT1QgcmV0dXJuIGVhcmx5LCBhcyB0aGlzIHdpbGwgcmV0dXJuIHRoZSB3cm9uZyB0eXBlIGlmXG4gICAgICAgIHRoZSB1c2VyIGhhcyByZXF1ZXN0ZWQgYSBET00gb2JqZWN0IHJhdGhlciB0aGFuIGEgc3RyaW5nICovXG4gICAgICBpZiAoIWRpcnR5KSB7XG4gICAgICAgIGRpcnR5ID0gJzwhLS0+JztcbiAgICAgIH1cblxuICAgICAgLyogU3RyaW5naWZ5LCBpbiBjYXNlIGRpcnR5IGlzIGFuIG9iamVjdCAqL1xuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycgJiYgIV9pc05vZGUoZGlydHkpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZWdhdGVkLWNvbmRpdGlvblxuICAgICAgICBpZiAodHlwZW9mIGRpcnR5LnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCd0b1N0cmluZyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpcnR5ID0gZGlydHkudG9TdHJpbmcoKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGRpcnR5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdkaXJ0eSBpcyBub3QgYSBzdHJpbmcsIGFib3J0aW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIENoZWNrIHdlIGNhbiBydW4uIE90aGVyd2lzZSBmYWxsIGJhY2sgb3IgaWdub3JlICovXG4gICAgICBpZiAoIURPTVB1cmlmeS5pc1N1cHBvcnRlZCkge1xuICAgICAgICBpZiAoX3R5cGVvZih3aW5kb3cudG9TdGF0aWNIVE1MKSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHdpbmRvdy50b1N0YXRpY0hUTUwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRpcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy50b1N0YXRpY0hUTUwoZGlydHkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfaXNOb2RlKGRpcnR5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy50b1N0YXRpY0hUTUwoZGlydHkub3V0ZXJIVE1MKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFzc2lnbiBjb25maWcgdmFycyAqL1xuICAgICAgaWYgKCFTRVRfQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgfVxuXG4gICAgICAvKiBDbGVhbiB1cCByZW1vdmVkIGVsZW1lbnRzICovXG4gICAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuXG4gICAgICAvKiBDaGVjayBpZiBkaXJ0eSBpcyBjb3JyZWN0bHkgdHlwZWQgZm9yIElOX1BMQUNFICovXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBJTl9QTEFDRSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoSU5fUExBQ0UpIDsgZWxzZSBpZiAoZGlydHkgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIC8qIElmIGRpcnR5IGlzIGEgRE9NIGVsZW1lbnQsIGFwcGVuZCB0byBhbiBlbXB0eSBkb2N1bWVudCB0byBhdm9pZFxuICAgICAgICAgICBlbGVtZW50cyBiZWluZyBzdHJpcHBlZCBieSB0aGUgcGFyc2VyICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KCc8IS0tLS0+Jyk7XG4gICAgICAgIGltcG9ydGVkTm9kZSA9IGJvZHkub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRpcnR5LCB0cnVlKTtcbiAgICAgICAgaWYgKGltcG9ydGVkTm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBpbXBvcnRlZE5vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgICAgICAgIC8qIE5vZGUgaXMgYWxyZWFkeSBhIGJvZHksIHVzZSBhcyBpcyAqL1xuICAgICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XG4gICAgICAgIH0gZWxzZSBpZiAoaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1ub2RlLWFwcGVuZFxuICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoaW1wb3J0ZWROb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogRXhpdCBkaXJlY3RseSBpZiB3ZSBoYXZlIG5vdGhpbmcgdG8gZG8gKi9cbiAgICAgICAgaWYgKCFSRVRVUk5fRE9NICYmICFTQUZFX0ZPUl9URU1QTEFURVMgJiYgIVdIT0xFX0RPQ1VNRU5UICYmXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1pbmNsdWRlc1xuICAgICAgICBkaXJ0eS5pbmRleE9mKCc8JykgPT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoZGlydHkpIDogZGlydHk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBJbml0aWFsaXplIHRoZSBkb2N1bWVudCB0byB3b3JrIG9uICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KGRpcnR5KTtcblxuICAgICAgICAvKiBDaGVjayB3ZSBoYXZlIGEgRE9NIG5vZGUgZnJvbSB0aGUgZGF0YSAqL1xuICAgICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgICByZXR1cm4gUkVUVVJOX0RPTSA/IG51bGwgOiBlbXB0eUhUTUw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogUmVtb3ZlIGZpcnN0IGVsZW1lbnQgbm9kZSAob3VycykgaWYgRk9SQ0VfQk9EWSBpcyBzZXQgKi9cbiAgICAgIGlmIChib2R5ICYmIEZPUkNFX0JPRFkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIC8qIEdldCBub2RlIGl0ZXJhdG9yICovXG4gICAgICB2YXIgbm9kZUl0ZXJhdG9yID0gX2NyZWF0ZUl0ZXJhdG9yKElOX1BMQUNFID8gZGlydHkgOiBib2R5KTtcblxuICAgICAgLyogTm93IHN0YXJ0IGl0ZXJhdGluZyBvdmVyIHRoZSBjcmVhdGVkIGRvY3VtZW50ICovXG4gICAgICB3aGlsZSAoY3VycmVudE5vZGUgPSBub2RlSXRlcmF0b3IubmV4dE5vZGUoKSkge1xuICAgICAgICAvKiBGaXggSUUncyBzdHJhbmdlIGJlaGF2aW9yIHdpdGggbWFuaXB1bGF0ZWQgdGV4dE5vZGVzICM4OSAqL1xuICAgICAgICBpZiAoY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDMgJiYgY3VycmVudE5vZGUgPT09IG9sZE5vZGUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNoYWRvdyBET00gZGV0ZWN0ZWQsIHNhbml0aXplIGl0ICovXG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShjdXJyZW50Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKTtcblxuICAgICAgICBvbGROb2RlID0gY3VycmVudE5vZGU7XG4gICAgICB9XG5cbiAgICAgIG9sZE5vZGUgPSBudWxsO1xuXG4gICAgICAvKiBJZiB3ZSBzYW5pdGl6ZWQgYGRpcnR5YCBpbi1wbGFjZSwgcmV0dXJuIGl0LiAqL1xuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICAgIH1cblxuICAgICAgLyogUmV0dXJuIHNhbml0aXplZCBzdHJpbmcgb3IgRE9NICovXG4gICAgICBpZiAoUkVUVVJOX0RPTSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBjcmVhdGVEb2N1bWVudEZyYWdtZW50LmNhbGwoYm9keS5vd25lckRvY3VtZW50KTtcblxuICAgICAgICAgIHdoaWxlIChib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1ub2RlLWFwcGVuZFxuICAgICAgICAgICAgcmV0dXJuTm9kZS5hcHBlbmRDaGlsZChib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5Ob2RlID0gYm9keTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChSRVRVUk5fRE9NX0lNUE9SVCkge1xuICAgICAgICAgIC8qXG4gICAgICAgICAgICBBZG9wdE5vZGUoKSBpcyBub3QgdXNlZCBiZWNhdXNlIGludGVybmFsIHN0YXRlIGlzIG5vdCByZXNldFxuICAgICAgICAgICAgKGUuZy4gdGhlIHBhc3QgbmFtZXMgbWFwIG9mIGEgSFRNTEZvcm1FbGVtZW50KSwgdGhpcyBpcyBzYWZlXG4gICAgICAgICAgICBpbiB0aGVvcnkgYnV0IHdlIHdvdWxkIHJhdGhlciBub3QgcmlzayBhbm90aGVyIGF0dGFjayB2ZWN0b3IuXG4gICAgICAgICAgICBUaGUgc3RhdGUgdGhhdCBpcyBjbG9uZWQgYnkgaW1wb3J0Tm9kZSgpIGlzIGV4cGxpY2l0bHkgZGVmaW5lZFxuICAgICAgICAgICAgYnkgdGhlIHNwZWNzLlxuICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGltcG9ydE5vZGUuY2FsbChvcmlnaW5hbERvY3VtZW50LCByZXR1cm5Ob2RlLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5Ob2RlO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2VyaWFsaXplZEhUTUwgPSBXSE9MRV9ET0NVTUVOVCA/IGJvZHkub3V0ZXJIVE1MIDogYm9keS5pbm5lckhUTUw7XG5cbiAgICAgIC8qIFNhbml0aXplIGZpbmFsIHN0cmluZyB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gc3RyaW5nUmVwbGFjZShzZXJpYWxpemVkSFRNTCwgTVVTVEFDSEVfRVhQUiQkMSwgJyAnKTtcbiAgICAgICAgc2VyaWFsaXplZEhUTUwgPSBzdHJpbmdSZXBsYWNlKHNlcmlhbGl6ZWRIVE1MLCBFUkJfRVhQUiQkMSwgJyAnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoc2VyaWFsaXplZEhUTUwpIDogc2VyaWFsaXplZEhUTUw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gc2V0IHRoZSBjb25maWd1cmF0aW9uIG9uY2VcbiAgICAgKiBzZXRDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICAgKi9cbiAgICBET01QdXJpZnkuc2V0Q29uZmlnID0gZnVuY3Rpb24gKGNmZykge1xuICAgICAgX3BhcnNlQ29uZmlnKGNmZyk7XG4gICAgICBTRVRfQ09ORklHID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgdGhlIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBjbGVhckNvbmZpZ1xuICAgICAqXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmNsZWFyQ29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgICAgQ09ORklHID0gbnVsbDtcbiAgICAgIFNFVF9DT05GSUcgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBjaGVjayBpZiBhbiBhdHRyaWJ1dGUgdmFsdWUgaXMgdmFsaWQuXG4gICAgICogVXNlcyBsYXN0IHNldCBjb25maWcsIGlmIGFueS4gT3RoZXJ3aXNlLCB1c2VzIGNvbmZpZyBkZWZhdWx0cy5cbiAgICAgKiBpc1ZhbGlkQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHRhZyBUYWcgbmFtZSBvZiBjb250YWluaW5nIGVsZW1lbnQuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBhdHRyIEF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIHZhbGlkLiBPdGhlcndpc2UsIHJldHVybnMgZmFsc2UuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmlzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAodGFnLCBhdHRyLCB2YWx1ZSkge1xuICAgICAgLyogSW5pdGlhbGl6ZSBzaGFyZWQgY29uZmlnIHZhcnMgaWYgbmVjZXNzYXJ5LiAqL1xuICAgICAgaWYgKCFDT05GSUcpIHtcbiAgICAgICAgX3BhcnNlQ29uZmlnKHt9KTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxjVGFnID0gc3RyaW5nVG9Mb3dlckNhc2UodGFnKTtcbiAgICAgIHZhciBsY05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShhdHRyKTtcbiAgICAgIHJldHVybiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZEhvb2tcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGFkZCBET01QdXJpZnkgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byBhZGRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBob29rRnVuY3Rpb24gZnVuY3Rpb24gdG8gZXhlY3V0ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5hZGRIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQsIGhvb2tGdW5jdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiBob29rRnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBob29rc1tlbnRyeVBvaW50XSA9IGhvb2tzW2VudHJ5UG9pbnRdIHx8IFtdO1xuICAgICAgYXJyYXlQdXNoKGhvb2tzW2VudHJ5UG9pbnRdLCBob29rRnVuY3Rpb24pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYSBET01QdXJpZnkgaG9vayBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICAgKiAocG9wcyBpdCBmcm9tIHRoZSBzdGFjayBvZiBob29rcyBpZiBtb3JlIGFyZSBwcmVzZW50KVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcbiAgICAgIGlmIChob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICBhcnJheVBvcChob29rc1tlbnRyeVBvaW50XSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUhvb2tzXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYWxsIERPTVB1cmlmeSBob29rcyBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2tzIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVIb29rcyA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBbXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlQWxsSG9va3NcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhbGwgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICpcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlQWxsSG9va3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBob29rcyA9IHt9O1xuICAgIH07XG5cbiAgICByZXR1cm4gRE9NUHVyaWZ5O1xuICB9XG5cbiAgdmFyIHB1cmlmeSA9IGNyZWF0ZURPTVB1cmlmeSgpO1xuXG4gIHJldHVybiBwdXJpZnk7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1cmlmeS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5yZXF1aXJlKFwid2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHRzXCIpO1xuY29uc3Qgd2ViZXh0X3Blcm1pc3Npb25fdG9nZ2xlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dC1wZXJtaXNzaW9uLXRvZ2dsZVwiKSk7XG5jb25zdCBhbmFseXRpY3NfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2FuYWx5dGljc1wiKTtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vdXRpbHMvY29uc3RhbnRzXCIpO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi91dGlscy9kb21cIik7XG5jb25zdCBsb2dnZXJfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2xvZ2dlclwiKTtcbmNvbnN0IG5vdGlmaWNhdGlvbnNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL25vdGlmaWNhdGlvbnNcIik7XG52YXIgYXNzaWdubWVudE5vdGlmaWNhdGlvblVybCA9IFwiaHR0cHM6Ly9hcHAuc2Nob29sb2d5LmNvbS9ob21lL25vdGlmaWNhdGlvbnM/ZmlsdGVyPWFsbFwiO1xudmFyIGRlZmF1bHREb21haW4gPSBcImFwcC5zY2hvb2xvZ3kuY29tXCI7XG5jb25zdCBPRkZTQ1JFRU5fRE9DVU1FTlRfUEFUSCA9IFwiL29mZnNjcmVlbi5odG1sXCI7XG5mdW5jdGlvbiBsb2FkKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICgwLCB3ZWJleHRfcGVybWlzc2lvbl90b2dnbGVfMS5kZWZhdWx0KSh7IHJlbG9hZE9uU3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIob25JbnN0YWxsZWQpO1xuICAgICAgICBjaHJvbWUuYWxhcm1zLm9uQWxhcm0uYWRkTGlzdGVuZXIob25BbGFybSk7XG4gICAgICAgIGxldCBzID0geWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoeyBkZWZhdWx0RG9tYWluOiBcImFwcC5zY2hvb2xvZ3kuY29tXCIgfSk7XG4gICAgICAgIGRlZmF1bHREb21haW4gPSBzLmRlZmF1bHREb21haW47XG4gICAgICAgIGFzc2lnbm1lbnROb3RpZmljYXRpb25VcmwgPSBgaHR0cHM6Ly8ke2RlZmF1bHREb21haW59L2hvbWUvbm90aWZpY2F0aW9ucz9maWx0ZXI9YWxsYDtcbiAgICAgICAgLy8gVE9ETzogRG9tYWluIHBlcm1pc3Npb25zIHRvZ2dsZSBuZWVkcyB0byBiZSBhZGRlZFxuICAgICAgICAvLyBhZGREb21haW5QZXJtaXNzaW9uVG9nZ2xlKCk7XG4gICAgICAgIC8vUnVuIG9uY2Ugb24gbG9hZFxuICAgICAgICBvbkFsYXJtKHsgbmFtZTogXCJub3RpZmljYXRpb25cIiwgc2NoZWR1bGVkVGltZTogRGF0ZS5ub3coKSB9KTtcbiAgICAgICAgY2hyb21lLmFsYXJtcy5nZXQoXCJub3RpZmljYXRpb25cIiwgZnVuY3Rpb24gKGFsYXJtKSB7XG4gICAgICAgICAgICBpZiAoYWxhcm0pIHtcbiAgICAgICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiQWxhcm0gaXMgYWxyZWFkeSByZWdpc3RlcmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIk5vdGlmaWNhdGlvbnMgYWxhcm0gaXMgbm90IHJlZ2lzdGVyZWQ7IHJlZ2lzdGVyaW5nLi4uXCIpO1xuICAgICAgICAgICAgICAgIGNocm9tZS5hbGFybXMuY3JlYXRlKFwibm90aWZpY2F0aW9uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyaW9kSW5NaW51dGVzOiA1LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY2hyb21lLm5vdGlmaWNhdGlvbnMub25DbGlja2VkLmFkZExpc3RlbmVyKG9uTm90aWZpY2F0aW9uQ2xpY2tlZCk7XG4gICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogWzIxNywgMCwgMCwgMjU1XSB9KTtcbiAgICAgICAgY2hyb21lLmFjdGlvbi5vbkNsaWNrZWQuYWRkTGlzdGVuZXIob25BY3Rpb25DbGlja2VkKTtcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKG9uTWVzc2FnZSk7XG4gICAgICAgIGNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKG9uQ29udGV4dE1lbnVDbGlja2VkKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG9uQWN0aW9uQ2xpY2tlZCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiQnJvd3NlciBhY3Rpb24gY2xpY2tlZFwiKTtcbiAgICAgICAgbGV0IGJhZGdlVGV4dCA9IHlpZWxkIGNocm9tZS5hY3Rpb24uZ2V0QmFkZ2VUZXh0KHt9KTtcbiAgICAgICAgbGV0IG4gPSBOdW1iZXIucGFyc2VJbnQoYmFkZ2VUZXh0KTtcbiAgICAgICAgdHJhY2tBbmFseXRpY3NFdmVudChcImJ1dHRvbl9jbGlja1wiLCB7XG4gICAgICAgICAgICBpZDogXCJtYWluLWJyb3dzZXItYWN0aW9uLWJ1dHRvblwiLFxuICAgICAgICAgICAgY29udGV4dDogXCJCcm93c2VyIEFjdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IFN0cmluZyhuIHx8IDApLFxuICAgICAgICAgICAgbGVnYWN5VGFyZ2V0OiBcIkJyb3dzZXIgQWN0aW9uXCIsXG4gICAgICAgICAgICBsZWdhY3lBY3Rpb246IG4gPyBgYnJvd3NlciBhY3Rpb24gY2xpY2tlZDogJHtufWAgOiBcImJyb3dzZXIgYWN0aW9uIGNsaWNrZWQ6IDBcIixcbiAgICAgICAgICAgIGxlZ2FjeUxhYmVsOiBcIk5vdGlmaWNhdGlvbnNcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coYEJyb3dzZXIgYWN0aW9uIHRleHQ6IFwiJHtiYWRnZVRleHR9XCJgKTtcbiAgICAgICAgaWYgKG4pXG4gICAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6IGBodHRwczovLyR7ZGVmYXVsdERvbWFpbn0vaG9tZS9ub3RpZmljYXRpb25zYCB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBgaHR0cHM6Ly8ke2RlZmF1bHREb21haW59YCB9KTtcbiAgICAgICAgY2hyb21lLmFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiBcIlwiIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gb25Ob3RpZmljYXRpb25DbGlja2VkKGlkKSB7XG4gICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIk5vdGlmaWNhdGlvbiBjbGlja2VkXCIpO1xuICAgIHRyYWNrQW5hbHl0aWNzRXZlbnQoXCJwZXJmb3JtX2FjdGlvblwiLCB7XG4gICAgICAgIGlkOiBcImNsaWNrXCIsXG4gICAgICAgIGNvbnRleHQ6IFwiTm90aWZpY2F0aW9uc1wiLFxuICAgICAgICB2YWx1ZTogaWQsXG4gICAgICAgIGxlZ2FjeVRhcmdldDogaWQsXG4gICAgICAgIGxlZ2FjeUFjdGlvbjogXCJub3RpZmljYXRpb24gY2xpY2tcIixcbiAgICAgICAgbGVnYWN5TGFiZWw6IFwiTm90aWZpY2F0aW9uc1wiLFxuICAgIH0pO1xuICAgIGNocm9tZS5ub3RpZmljYXRpb25zLmNsZWFyKGlkKTtcbiAgICBzd2l0Y2ggKGlkKSB7XG4gICAgICAgIGNhc2UgXCJhc3NpZ25tZW50XCI6XG4gICAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6IGBodHRwczovLyR7ZGVmYXVsdERvbWFpbn0vaG9tZS9ub3RpZmljYXRpb25zYCB9KTtcbiAgICAgICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogXCJcIiB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBgaHR0cHM6Ly8ke2RlZmF1bHREb21haW59YCB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG9uQWxhcm0oYWxhcm0pIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgc3RvcmFnZUNvbnRlbnQgPSB5aWVsZCBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChudWxsKTtcbiAgICAgICAgaWYgKGFsYXJtICYmIGFsYXJtLm5hbWUgPT09IFwibm90aWZpY2F0aW9uXCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhgWyR7bmV3IERhdGUoKX1dIENoZWNraW5nIGZvciBuZXcgbm90aWZpY2F0aW9uc2ApO1xuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlQ29udGVudC5ub3RpZmljYXRpb25zICE9IFwiZGlzYWJsZWRcIikge1xuICAgICAgICAgICAgICAgICAgICBjaGVja0Zvck5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIuZXJyb3IoXCJFcnJvciBjYXVnaHQ6XCIpO1xuICAgICAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG9uSW5zdGFsbGVkKGRldGFpbHMpIHtcbiAgICB0cmFja0FuYWx5dGljc0V2ZW50KFwicGVyZm9ybV9hY3Rpb25cIiwge1xuICAgICAgICBpZDogXCJydW50aW1lX29uaW5zdGFsbGVkXCIsXG4gICAgICAgIHZhbHVlOiBkZXRhaWxzLnJlYXNvbixcbiAgICAgICAgY29udGV4dDogXCJWZXJzaW9uc1wiLFxuICAgICAgICBsZWdhY3lUYXJnZXQ6IFwiUnVudGltZSBvbkluc3RhbGxlZFwiLFxuICAgICAgICBsZWdhY3lBY3Rpb246IGRldGFpbHMucmVhc29uLFxuICAgICAgICBsZWdhY3lMYWJlbDogXCJWZXJzaW9uc1wiLFxuICAgIH0pO1xuICAgIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICAgICAgaWQ6IFwic3BsdXMtdGhlbWUtZWRpdG9yXCIsXG4gICAgICAgIHRpdGxlOiBcIlRoZW1lIEVkaXRvclwiLFxuICAgICAgICBjb250ZXh0czogW1wiYWN0aW9uXCJdLFxuICAgIH0pO1xuICAgIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICAgICAgaWQ6IFwic3BsdXMtZGlzY29yZFwiLFxuICAgICAgICB0aXRsZTogXCJEaXNjb3JkIFN1cHBvcnQgU2VydmVyXCIsXG4gICAgICAgIGNvbnRleHRzOiBbXCJhY3Rpb25cIl0sXG4gICAgfSk7XG4gICAgY2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xuICAgICAgICBpZDogXCJzcGx1cy13ZWJzaXRlXCIsXG4gICAgICAgIHRpdGxlOiBgJHtjb25zdGFudHNfMS5FWFRFTlNJT05fTkFNRX0gV2Vic2l0ZWAsXG4gICAgICAgIGNvbnRleHRzOiBbXCJhY3Rpb25cIl0sXG4gICAgfSk7XG59XG5mdW5jdGlvbiBvbkNvbnRleHRNZW51Q2xpY2tlZChpbmZvLCB0YWIpIHtcbiAgICBzd2l0Y2ggKGluZm8ubWVudUl0ZW1JZCkge1xuICAgICAgICBjYXNlIFwic3BsdXMtdGhlbWUtZWRpdG9yXCI6XG4gICAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6IGNocm9tZS5ydW50aW1lLmdldFVSTChcIi90aGVtZS1lZGl0b3IuaHRtbFwiKSB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3BsdXMtZGlzY29yZFwiOlxuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBjb25zdGFudHNfMS5ESVNDT1JEX1VSTCB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3BsdXMtd2Vic2l0ZVwiOlxuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB1cmw6IGAke2NvbnN0YW50c18xLkVYVEVOU0lPTl9XRUJTSVRFfS8/dXRtX3NvdXJjZT1leHQtY29udGV4dC1tZW51JnV0bV9jb250ZW50PSR7Y2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS52ZXJzaW9ufWAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG9uTWVzc2FnZShyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJSZWNlaXZlZCBiYWNrZ3JvdW5kIHBhZ2UgbWVzc2FnZVwiLCByZXF1ZXN0KTtcbiAgICBpZiAocmVxdWVzdC50eXBlID09IFwiZmV0Y2hcIiAmJiByZXF1ZXN0LnVybCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5kZWJ1ZyhcIlJlY2VpdmVkIGZldGNoIHJlcXVlc3QgZm9yIFwiICsgcmVxdWVzdC51cmwpO1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmluYWxSZXNwb25zZSA9IHt9O1xuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZU9iajtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZU9iaiA9IHlpZWxkIGZldGNoKHJlcXVlc3QudXJsLCByZXF1ZXN0LnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2Uuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLmVycm9yID0gZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2Uuc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS5oZWFkZXJzID0gcmVzcG9uc2VPYmouaGVhZGVycztcbiAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLm9rID0gcmVzcG9uc2VPYmoub2s7XG4gICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS5yZWRpcmVjdGVkID0gcmVzcG9uc2VPYmoucmVkaXJlY3RlZDtcbiAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLnN0YXR1cyA9IHJlc3BvbnNlT2JqLnN0YXR1cztcbiAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLnN0YXR1c1RleHQgPSByZXNwb25zZU9iai5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2UudHlwZSA9IHJlc3BvbnNlT2JqLnR5cGU7XG4gICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS51cmwgPSByZXNwb25zZU9iai51cmw7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXF1ZXN0LmJvZHlSZWFkVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImpzb25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLmpzb24gPSB5aWVsZCByZXNwb25zZU9iai5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2UudGV4dCA9IHlpZWxkIHJlc3BvbnNlT2JqLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLmJvZHlSZWFkRXJyb3IgPSBlIHx8IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5hbFJlc3BvbnNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKClcbiAgICAgICAgICAgIC50aGVuKHggPT4gc2VuZFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHgpKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gc2VuZFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnIgfSkpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcXVlc3QudHlwZSA9PSBcInVwZGF0ZURlZmF1bHREb21haW5cIiAmJiByZXF1ZXN0LmRvbWFpbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlZmF1bHREb21haW4gPSByZXF1ZXN0LmRvbWFpbjtcbiAgICAgICAgYXNzaWdubWVudE5vdGlmaWNhdGlvblVybCA9IGBodHRwczovLyR7ZGVmYXVsdERvbWFpbn0vaG9tZS9ub3RpZmljYXRpb25zP2ZpbHRlcj1hbGxgO1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVxdWVzdC50eXBlID09IFwic2V0QmFkZ2VUZXh0XCIgJiYgcmVxdWVzdC50ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogcmVxdWVzdC50ZXh0IH0pO1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVxdWVzdC50eXBlID09IFwibm90aWZpY2F0aW9uXCIpIHtcbiAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS51cGRhdGVMYXN0VGltZSkocmVxdWVzdC5kYXRhLnRpbWVNb2RpZmllZCwgcmVxdWVzdC5kYXRhLmxhc3RUaW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICgwLCBub3RpZmljYXRpb25zXzEuc2VuZE5vdGlmaWNhdGlvbikocmVxdWVzdC5kYXRhLm5vdGlmaWNhdGlvbiwgcmVxdWVzdC5kYXRhLm5hbWUsIHJlcXVlc3QuZGF0YS5jb3VudCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcXVlc3QudHlwZSA9PSBcImRlY2xhcmF0aXZlTmV0UmVxdWVzdFJ1bGVzZXRcIikge1xuICAgICAgICBpZiAocmVxdWVzdC5hY3Rpb24gPT09IFwiZW5hYmxlXCIpIHtcbiAgICAgICAgICAgIGNocm9tZS5kZWNsYXJhdGl2ZU5ldFJlcXVlc3RcbiAgICAgICAgICAgICAgICAudXBkYXRlRW5hYmxlZFJ1bGVzZXRzKHtcbiAgICAgICAgICAgICAgICBlbmFibGVSdWxlc2V0SWRzOiBbcmVxdWVzdC5ydWxlc2V0SWRdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gXCJkaXNhYmxlXCIpIHtcbiAgICAgICAgICAgIGNocm9tZS5kZWNsYXJhdGl2ZU5ldFJlcXVlc3RcbiAgICAgICAgICAgICAgICAudXBkYXRlRW5hYmxlZFJ1bGVzZXRzKHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlUnVsZXNldElkczogW3JlcXVlc3QucnVsZXNldElkXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBjaGVja0Zvck5vdGlmaWNhdGlvbnMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgbGV0IHN0b3JhZ2VDb250ZW50cyA9IHlpZWxkIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KG51bGwpO1xuICAgICAgICBpZiAoKDAsIGRvbV8xLmdldEJyb3dzZXIpKCkgPT09IFwiRmlyZWZveFwiKSB7XG4gICAgICAgICAgICAvLyBGaXJlZm94IGRvZXNuJ3Qgc3VwcG9ydCBzZXJ2aWNlIHdvcmtlcnMgc28gaXQgZG9lc24ndCBuZWVkIG9mZnNjcmVlbiBkb2N1bWVudHNcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvbWFuaWZlc3QuanNvbi9iYWNrZ3JvdW5kI2JhY2tncm91bmRfcGFnZXNcbiAgICAgICAgICAgIGxldCB7IG5vdGlmaWNhdGlvbiwgbmFtZSwgY291bnQsIGxhc3RUaW1lLCB0aW1lTW9kaWZpZWQgfSA9IHlpZWxkICgwLCBub3RpZmljYXRpb25zXzEubG9hZEFzc2lnbm1lbnROb3RpZmljYXRpb25zKShhc3NpZ25tZW50Tm90aWZpY2F0aW9uVXJsLCAoX2EgPSBzdG9yYWdlQ29udGVudHMubGFzdFRpbWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDApO1xuICAgICAgICAgICAgeWllbGQgKDAsIG5vdGlmaWNhdGlvbnNfMS51cGRhdGVMYXN0VGltZSkodGltZU1vZGlmaWVkLCBsYXN0VGltZSk7XG4gICAgICAgICAgICB5aWVsZCAoMCwgbm90aWZpY2F0aW9uc18xLnNlbmROb3RpZmljYXRpb24pKG5vdGlmaWNhdGlvbiwgbmFtZSwgY291bnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvIGJlbG93IG9ubHkgaW4gQ2hyb21lXG4gICAgICAgIC8vIENyZWF0ZSBhbiBvZmZzY3JlZW4gZG9jdW1lbnQgaWYgb25lIGRvZXNuJ3QgZXhpc3QgeWV0XG4gICAgICAgIHlpZWxkIGNyZWF0ZU9mZnNjcmVlbkRvY3VtZW50KCk7XG4gICAgICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgYW4gb2Zmc2NyZWVuIGRvY3VtZW50LCB3ZSBjYW4gZGlzcGF0Y2ggdGhlXG4gICAgICAgIC8vIG1lc3NhZ2UuXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6IFwib2Zmc2NyZWVuLW5vdGlmaWNhdGlvbnNcIixcbiAgICAgICAgICAgIHRhcmdldDogXCJvZmZzY3JlZW5cIixcbiAgICAgICAgICAgIGRhdGE6IHsgdXJsOiBhc3NpZ25tZW50Tm90aWZpY2F0aW9uVXJsLCBsYXN0VGltZTogKF9iID0gc3RvcmFnZUNvbnRlbnRzLmxhc3RUaW1lKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwIH0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlT2Zmc2NyZWVuRG9jdW1lbnQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghKHlpZWxkIGhhc09mZnNjcmVlbkRvY3VtZW50KCkpKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgY2hyb21lLm9mZnNjcmVlbi5jcmVhdGVEb2N1bWVudCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogT0ZGU0NSRUVOX0RPQ1VNRU5UX1BBVEgsXG4gICAgICAgICAgICAgICAgICAgIHJlYXNvbnM6IFtjaHJvbWUub2Zmc2NyZWVuLlJlYXNvbi5ET01fUEFSU0VSXSxcbiAgICAgICAgICAgICAgICAgICAganVzdGlmaWNhdGlvbjogXCJQYXJzZSBTY2hvb2xvZ3kgbm90aWZpY2F0aW9ucyBpbiBIVE1MIGZvcm1hdFwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIud2FybihcIkVycm9yIGNyZWF0aW5nIG9mZnNjcmVlbiBkb2N1bWVudCwgaXQgcHJvYmFibHkgYWxyZWFkeSBleGlzdHNcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGhhc09mZnNjcmVlbkRvY3VtZW50KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIENoZWNrIGFsbCB3aW5kb3dzIGNvbnRyb2xsZWQgYnkgdGhlIHNlcnZpY2Ugd29ya2VyIGlmIG9uZSBvZiB0aGVtIGlzIHRoZSBvZmZzY3JlZW4gZG9jdW1lbnRcbiAgICAgICAgY29uc3QgbWF0Y2hlZENsaWVudHMgPSB5aWVsZCBjbGllbnRzLm1hdGNoQWxsKCk7XG4gICAgICAgIGZvciAoY29uc3QgY2xpZW50IG9mIG1hdGNoZWRDbGllbnRzKSB7XG4gICAgICAgICAgICBpZiAoY2xpZW50LnVybC5lbmRzV2l0aChPRkZTQ1JFRU5fRE9DVU1FTlRfUEFUSCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB0cmFja0FuYWx5dGljc0V2ZW50KG5hbWUsIHByb3BzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgeWllbGQgY3JlYXRlT2Zmc2NyZWVuRG9jdW1lbnQoKTtcbiAgICAgICAgbGV0IHN0b3JhZ2VDb250ZW50cyA9IHlpZWxkIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KG51bGwpO1xuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiBcIm9mZnNjcmVlbi1hbmFseXRpY3NcIixcbiAgICAgICAgICAgIHRhcmdldDogXCJvZmZzY3JlZW5cIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIHByb3BzLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGFuYWx5dGljczogc3RvcmFnZUNvbnRlbnRzLmFuYWx5dGljcyxcbiAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHN0b3JhZ2VDb250ZW50cy50aGVtZSxcbiAgICAgICAgICAgICAgICAgICAgYmV0YTogc3RvcmFnZUNvbnRlbnRzLmJldGEsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246IGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkudmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgbmV3VmVyc2lvbjogc3RvcmFnZUNvbnRlbnRzLm5ld1ZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbVVzZXJJZDogKDAsIGFuYWx5dGljc18xLmdldEFuYWx5dGljc1VzZXJJZCkoKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5sb2FkKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQW5hbHl0aWNzID0gZXhwb3J0cy5nZXRBbmFseXRpY3NVc2VySWQgPSBleHBvcnRzLnRyYWNrRXZlbnQgPSB2b2lkIDA7XG4vKipcbiAqIFRyYWNrcyBhbiBldmVudCB1c2luZyBHb29nbGUgQW5hbHl0aWNzIGlmIHRoZSB1c2VyIGRpZCBub3Qgb3B0IG91dFxuICogTk9URTogVGhlIEZpcmVmb3ggdmVyc2lvbiBvZiB0aGUgZXh0ZW5zaW9uIGhhcyBubyBzdXBwb3J0IGZvciBHb29nbGUgQW5hbHl0aWNzXG4gKi9cbnZhciB0cmFja0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgX2EgPSB7fSkge1xuICAgIHZhciB7IGxlZ2FjeVRhcmdldCwgbGVnYWN5QWN0aW9uLCBsZWdhY3lMYWJlbCA9IHVuZGVmaW5lZCwgbGVnYWN5VmFsdWUgPSB1bmRlZmluZWQsIGlkLCBjb250ZXh0LCB2YWx1ZSB9ID0gX2EsIGV4dHJhUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImxlZ2FjeVRhcmdldFwiLCBcImxlZ2FjeUFjdGlvblwiLCBcImxlZ2FjeUxhYmVsXCIsIFwibGVnYWN5VmFsdWVcIiwgXCJpZFwiLCBcImNvbnRleHRcIiwgXCJ2YWx1ZVwiXSk7XG4gICAgY29uc29sZS5kZWJ1ZyhcIltTK10gVHJhY2tpbmcgZGlzYWJsZWQgYnkgdXNlclwiLCBhcmd1bWVudHMpO1xufTtcbmV4cG9ydHMudHJhY2tFdmVudCA9IHRyYWNrRXZlbnQ7XG5mdW5jdGlvbiBnZXRBbmFseXRpY3NVc2VySWQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tVG9rZW4oKSB7XG4gICAgICAgICAgICAvLyBFLmcuIDggKiAzMiA9IDI1NiBiaXRzIHRva2VuXG4gICAgICAgICAgICB2YXIgcmFuZG9tUG9vbCA9IG5ldyBVaW50OEFycmF5KDMyKTtcbiAgICAgICAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMocmFuZG9tUG9vbCk7XG4gICAgICAgICAgICB2YXIgaGV4ID0gXCJcIjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZG9tUG9vbC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGhleCArPSByYW5kb21Qb29sW2ldLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEUuZy4gZGIxODQ1OGUyNzgyYjJiNzdlMzY3NjljNTY5ZTI2M2E1Mzg4NWE5OTQ0ZGQwYTg2MWU1MDY0ZWFjMTZmMWFcbiAgICAgICAgICAgIHJldHVybiBoZXg7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGwgPSB5aWVsZCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoeyByYW5kb21Vc2VySWQ6IG51bGwgfSk7XG4gICAgICAgIGlmICghbC5yYW5kb21Vc2VySWQpIHtcbiAgICAgICAgICAgIGxldCByYW5kb21Vc2VySWQgPSBnZXRSYW5kb21Ub2tlbigpO1xuICAgICAgICAgICAgeWllbGQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgcmFuZG9tVXNlcklkIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmRvbVVzZXJJZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbC5yYW5kb21Vc2VySWQ7XG4gICAgfSk7XG59XG5leHBvcnRzLmdldEFuYWx5dGljc1VzZXJJZCA9IGdldEFuYWx5dGljc1VzZXJJZDtcbmZ1bmN0aW9uIGluaXRpYWxpemVBbmFseXRpY3MoX2EpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIGFyZ3VtZW50cywgdm9pZCAwLCBmdW5jdGlvbiogKHsgZG9jdW1lbnRDb250ZXh0LCBpc0FuYWx5dGljc0VuYWJsZWQsIHNlbGVjdGVkVGhlbWUsIHNlbGVjdGVkQmV0YSwgY3VycmVudFZlcnNpb24sIG5ld1ZlcnNpb24sIHJhbmRvbVVzZXJJZCwgdGhlbWVJc01vZGVybiwgfSkge1xuICAgICAgICBpZiAoaXNBbmFseXRpY3NFbmFibGVkKSB7XG4gICAgICAgICAgICBlbmFibGVBbmFseXRpY3MoKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBlbmFibGVBbmFseXRpY3MoKSB7XG4gICAgICAgICAgICAvLyBHb29nbGUgQW5hbHl0aWNzIHY0XG4gICAgICAgICAgICBnbG9iYWxUaGlzLmRhdGFMYXllciA9IGdsb2JhbFRoaXMuZGF0YUxheWVyIHx8IFtdO1xuICAgICAgICAgICAgZnVuY3Rpb24gZ3RhZyguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIChfYSA9IGdsb2JhbFRoaXMuZGF0YUxheWVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3RhZyhcImpzXCIsIG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgY29uc3QgZ3RhZ0NvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBwYWdlX2xvY2F0aW9uOiBsb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1xcL1xcZHszLH1cXGIvZywgXCIvKlwiKSxcbiAgICAgICAgICAgICAgICBwYWdlX3BhdGg6IGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1xcZHszLH1cXGIvZywgXCIvKlwiKSxcbiAgICAgICAgICAgICAgICBwYWdlX3RpdGxlOiBudWxsLFxuICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHJhbmRvbVVzZXJJZCxcbiAgICAgICAgICAgICAgICB1c2VyX3Byb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHNlbGVjdGVkVGhlbWUsXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUJldGE6IHNlbGVjdGVkQmV0YSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdEVuYWJsZWRWZXJzaW9uOiBuZXdWZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25WZXJzaW9uOiBjdXJyZW50VmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBsb2NhdGlvbi5ob3N0LFxuICAgICAgICAgICAgICAgICAgICBtb2Rlcm5UaGVtZTogdGhlbWVJc01vZGVybixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGd0YWcoXCJjb25maWdcIiwgXCJHLVlNNkIwMFJEWUNcIiwgZ3RhZ0NvbmZpZyk7XG4gICAgICAgICAgICBleHBvcnRzLnRyYWNrRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBfYSA9IHt9KSB7XG4gICAgICAgICAgICAgICAgdmFyIHsgbGVnYWN5VGFyZ2V0LCBsZWdhY3lBY3Rpb24sIGxlZ2FjeUxhYmVsID0gdW5kZWZpbmVkLCBsZWdhY3lWYWx1ZSA9IHVuZGVmaW5lZCwgaWQsIGNvbnRleHQsIHZhbHVlIH0gPSBfYSwgZXh0cmFQcm9wcyA9IF9fcmVzdChfYSwgW1wibGVnYWN5VGFyZ2V0XCIsIFwibGVnYWN5QWN0aW9uXCIsIFwibGVnYWN5TGFiZWxcIiwgXCJsZWdhY3lWYWx1ZVwiLCBcImlkXCIsIFwiY29udGV4dFwiLCBcInZhbHVlXCJdKTtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnREYXRhID0gT2JqZWN0LmFzc2lnbih7IGlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSB9LCBleHRyYVByb3BzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKGBbUytdIFRyYWNrZWQgZXZlbnQ6YCwgZXZlbnROYW1lLCBldmVudERhdGEpO1xuICAgICAgICAgICAgICAgIGd0YWcoXCJldmVudFwiLCBldmVudE5hbWUsIGV2ZW50RGF0YSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZnVuY3Rpb24gdHJhY2tDbGljayhldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICghZXZlbnQuaXNUcnVzdGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IChldmVudC5jdXJyZW50VGFyZ2V0IHx8IGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgKDAsIGV4cG9ydHMudHJhY2tFdmVudCkoXCJ0cmFja2luZ19saW5rX2NsaWNrXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgbGVnYWN5VGFyZ2V0OiB0YXJnZXQuZGF0YXNldC5zcGx1c1RyYWNraW5nSWQgfHwgdGFyZ2V0LmlkIHx8IFwiVW5sYWJlbGVkIEJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBsZWdhY3lBY3Rpb246IFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgbGVnYWN5TGFiZWw6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdDb250ZXh0IHx8IFwiVHJhY2tpbmcgTGlua1wiLFxuICAgICAgICAgICAgICAgICAgICBsZWdhY3lWYWx1ZTogdGFyZ2V0LmRhdGFzZXQuc3BsdXNUcmFja2luZ1ZhbHVlIHx8IGV2ZW50LmJ1dHRvbixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdJZCB8fCB0YXJnZXQuaWQgfHwgXCJVbmxhYmVsZWQgQnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdDb250ZXh0IHx8IFwiVHJhY2tpbmcgTGlua1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGFyZ2V0LmRhdGFzZXQuc3BsdXNUcmFja2luZ1ZhbHVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvY3VtZW50Q29udGV4dCkge1xuICAgICAgICAgICAgICAgIGxldCB0cmFja2VkRWxlbWVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICAgICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucywgbXV0YXRpb25PYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbGVtIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3BsdXMtdHJhY2stY2xpY2tzOm5vdCguc3BsdXMtdHJhY2tlZClcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdHJhY2tlZEVsZW1lbnRzLmhhcyhlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRyYWNrQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImF1eGNsaWNrXCIsIHRyYWNrQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcInNwbHVzLXRyYWNrZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tlZEVsZW1lbnRzLmFkZChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciByZWFkeVN0YXRlQ2hlY2tJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFkeVN0YXRlQ2hlY2tJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNwbHVzLXRyYWNrLWNsaWNrc1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFja2VkRWxlbWVudHMuaGFzKGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdHJhY2tDbGljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiYXV4Y2xpY2tcIiwgdHJhY2tDbGljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKFwic3BsdXMtdHJhY2tlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFja2VkRWxlbWVudHMuYWRkKGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmluaXRpYWxpemVBbmFseXRpY3MgPSBpbml0aWFsaXplQW5hbHl0aWNzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRFRkFVTFRfVEhFTUVfTkFNRSA9IGV4cG9ydHMuRElTQ09SRF9VUkwgPSBleHBvcnRzLkVYVEVOU0lPTl9XRUJTSVRFID0gZXhwb3J0cy5FWFRFTlNJT05fTkFNRSA9IHZvaWQgMDtcbmV4cG9ydHMuRVhURU5TSU9OX05BTUUgPSBcIlNjaG9vbG9neSBQbHVzXCI7XG5leHBvcnRzLkVYVEVOU0lPTl9XRUJTSVRFID0gXCJodHRwczovL3NjaG9vbG9neXBsLnVzXCI7XG5leHBvcnRzLkRJU0NPUkRfVVJMID0gXCJodHRwczovL2Rpc2NvcmQuc2Nob29sb2d5cGwudXNcIjtcbmV4cG9ydHMuREVGQVVMVF9USEVNRV9OQU1FID0gZXhwb3J0cy5FWFRFTlNJT05fTkFNRTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy53YWl0Rm9yRWxlbWVudCA9IGV4cG9ydHMuY3JlYXRlU3ZnTG9nbyA9IGV4cG9ydHMuc2V0Q1NTVmFyaWFibGUgPSBleHBvcnRzLmdldFBhcmVudHMgPSBleHBvcnRzLmlzVmlzaWJsZSA9IGV4cG9ydHMuZ2V0QnJvd3NlciA9IGV4cG9ydHMuY3JlYXRlQnV0dG9uV2l0aExvZ28gPSBleHBvcnRzLmNyZWF0ZUJ1dHRvbiA9IGV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IHZvaWQgMDtcbi8qKlxuICogQ3JlYXRlcyBhIERPTSBlbGVtZW50XG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IEEgRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgLSBUaGUgSFRNTCB0YWcgbmFtZSBvZiB0aGUgdHlwZSBvZiBET00gZWxlbWVudCB0byBjcmVhdGVcbiAqIEBwYXJhbSB7c3RyaW5nW119IGNsYXNzTGlzdCAtIENTUyBjbGFzc2VzIHRvIGFwcGx5IHRvIHRoZSBET00gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZyxhbnk+fSBwcm9wZXJ0aWVzIC0gUHJvcGVydGllcyB0byBhcHBseSB0byB0aGUgRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gY2hpbGRyZW4gLSBFbGVtZW50cyB0byBhcHBlbmQgYXMgY2hpbGRyZW4gdG8gdGhlIGNyZWF0ZWQgZWxlbWVudFxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3NMaXN0LCBwcm9wZXJ0aWVzLCBjaGlsZHJlbikge1xuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmIChjbGFzc0xpc3QpIHtcbiAgICAgICAgZm9yIChsZXQgYyBvZiBjbGFzc0xpc3QpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvcGVydGllcykge1xuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydGllc1twcm9wZXJ0eV0gaW5zdGFuY2VvZiBPYmplY3QgJiZcbiAgICAgICAgICAgICAgICAhKHByb3BlcnRpZXNbcHJvcGVydHldIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc3VicHJvcGVydHkgaW4gcHJvcGVydGllc1twcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFtwcm9wZXJ0eV1bc3VicHJvcGVydHldID0gcHJvcGVydGllc1twcm9wZXJ0eV1bc3VicHJvcGVydHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQgJiYgcHJvcGVydGllc1twcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRbcHJvcGVydHldID0gcHJvcGVydGllc1twcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG4vKipcbiAqIENyZWF0ZXMgYSBTY2hvb2xvZ3kgUGx1cyB0aGVtZWQgYnV0dG9uIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgSUQgZm9yIHRoZSBidXR0b24gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gc2hvdyBvbiB0aGUgYnV0dG9uXG4gKiBAcGFyYW0geyhlOiBFdmVudCk9PnZvaWR9IGNhbGxiYWNrIEEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbihpZCwgdGV4dCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgW1wic3VibWl0LXNwYW4td3JhcHBlclwiLCBcInNwbHVzLW1vZGFsLWJ1dHRvblwiXSwgeyBvbmNsaWNrOiBjYWxsYmFjayB9LCBbXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCBbXCJmb3JtLXN1Ym1pdFwiLCBcInNwbHVzLXRyYWNrLWNsaWNrc1wiXSwge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIHZhbHVlOiB0ZXh0LFxuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgZGF0YXNldDogeyBzcGx1c1RyYWNraW5nQ29udGV4dDogXCJTKyBCdXR0b25cIiB9LFxuICAgICAgICB9KSxcbiAgICBdKTtcbn1cbmV4cG9ydHMuY3JlYXRlQnV0dG9uID0gY3JlYXRlQnV0dG9uO1xuZnVuY3Rpb24gY3JlYXRlQnV0dG9uV2l0aExvZ28oaWQsIHRleHQsIGNhbGxiYWNrKSB7XG4gICAgbGV0IGJ1dHRvbiA9IGNyZWF0ZUJ1dHRvbihpZCwgdGV4dCwgY2FsbGJhY2spO1xuICAgIGxldCBpbWcgPSBjcmVhdGVTdmdMb2dvKCk7XG4gICAgT2JqZWN0LmFzc2lnbihpbWcuc3R5bGUsIHtcbiAgICAgICAgdmVydGljYWxBbGlnbjogXCJtaWRkbGVcIixcbiAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNHB4XCIsXG4gICAgICAgIHdpZHRoOiBcIjE4cHhcIixcbiAgICB9KTtcbiAgICBidXR0b24ucHJlcGVuZChpbWcpO1xuICAgIGJ1dHRvbi5zdHlsZS5zZXRQcm9wZXJ0eShcImhlaWdodFwiLCBcIjM2cHhcIiwgXCJpbXBvcnRhbnRcIik7XG4gICAgbGV0IGJ1dHRvbklucHV0ID0gYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICBidXR0b25JbnB1dC5zdHlsZS5wYWRkaW5nTGVmdCA9IFwiNHB4XCI7XG4gICAgYnV0dG9uSW5wdXQuc3R5bGUuc2V0UHJvcGVydHkoXCJoZWlnaHRcIiwgXCIzNnB4XCIsIFwiaW1wb3J0YW50XCIpO1xuICAgIGJ1dHRvbi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICByZXR1cm4gYnV0dG9uO1xufVxuZXhwb3J0cy5jcmVhdGVCdXR0b25XaXRoTG9nbyA9IGNyZWF0ZUJ1dHRvbldpdGhMb2dvO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IGJyb3dzZXJcbiAqIEByZXR1cm5zIHtcIkNocm9tZVwifFwiRmlyZWZveFwifFwiT3RoZXJcIn0gTmFtZSBvZiB0aGUgY3VycmVudCBicm93c2VyXG4gKi9cbmZ1bmN0aW9uIGdldEJyb3dzZXIoKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzLmNocm9tZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMuYnJvd3NlciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiRmlyZWZveFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gTGlrZWx5IGNhcHR1cmVzIGFsbCBDaHJvbWl1bS1iYXNlZCBicm93c2Vyc1xuICAgICAgICAgICAgcmV0dXJuIFwiQ2hyb21lXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIk90aGVyXCI7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRCcm93c2VyID0gZ2V0QnJvd3Nlcjtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZWxlbWVudCBpcyB2aXNpYmxlIHRvIHRoZSB1c2VyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtIFRoZSBlbGVtZW50IHRvIGNoZWNrIGZvciB2aXNpYmlsaXR5XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIGVsZW1lbnQgaXMgdmlzaWJsZVxuICovXG5mdW5jdGlvbiBpc1Zpc2libGUoZWxlbSkge1xuICAgIHJldHVybiAhIShlbGVtLm9mZnNldFdpZHRoIHx8IGVsZW0ub2Zmc2V0SGVpZ2h0IHx8IGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpO1xufVxuZXhwb3J0cy5pc1Zpc2libGUgPSBpc1Zpc2libGU7XG4vKipcbiAqIFJldHVybnMgYWxsIHBhcmVudCBlbGVtZW50cyBtYXRjaGluZyB0aGUgcHJvdmlkZWQgc2VsZWN0b3IuXG4gKiBFc3NlbnRpYWxseSB3b3JrcyBsaWtlIGEgcmV2ZXJzZSBgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbGAuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtIFRoZSB0YXJnZXQgZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIEEgQ1NTIHNlbGVjdG9yXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnRbXX0gQW4gYXJyYXkgb2YgbWF0Y2hpbmcgcGFyZW50IGVsZW1lbnRzXG4gKi9cbmZ1bmN0aW9uIGdldFBhcmVudHMoZWxlbSwgc2VsZWN0b3IpIHtcbiAgICB2YXIgcGFyZW50cyA9IFtdO1xuICAgIHZhciBmaXJzdENoYXI7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGZpcnN0Q2hhciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcbiAgICB9XG4gICAgZm9yICg7IGVsZW0gJiYgZWxlbSAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyBlbGVtID0gZWxlbS5wYXJlbnROb2RlKSB7XG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgaWYgKGZpcnN0Q2hhciA9PT0gXCIuXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0b3Iuc3Vic3RyKDEpKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2goZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0Q2hhciA9PT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5pZCA9PT0gc2VsZWN0b3Iuc3Vic3RyKDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudHMucHVzaChlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RDaGFyID09PSBcIltcIikge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLmhhc0F0dHJpYnV0ZShzZWxlY3Rvci5zdWJzdHIoMSwgc2VsZWN0b3IubGVuZ3RoIC0gMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudHMucHVzaChlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxlbS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50cy5wdXNoKGVsZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnRzO1xufVxuZXhwb3J0cy5nZXRQYXJlbnRzID0gZ2V0UGFyZW50cztcbi8qKlxuICogU2V0cyB0aGUgdmFsdWUgb2YgYSBDU1MgdmFyaWFibGUgb24gdGhlIGRvY3VtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBWYXJpYWJsZSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIE5ldyB2YXJpYWJsZSB2YWx1ZVxuICovXG5mdW5jdGlvbiBzZXRDU1NWYXJpYWJsZShuYW1lLCB2YWwpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoYC0tJHtuYW1lfWAsIHZhbCAhPT0gbnVsbCAmJiB2YWwgIT09IHZvaWQgMCA/IHZhbCA6IG51bGwpO1xufVxuZXhwb3J0cy5zZXRDU1NWYXJpYWJsZSA9IHNldENTU1ZhcmlhYmxlO1xuZnVuY3Rpb24gY3JlYXRlU3ZnTG9nbyguLi5jbGFzc2VzKSB7XG4gICAgbGV0IGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiY2lyY2xlXCIpO1xuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJjeFwiLCBcIjI1MFwiKTtcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwiY3lcIiwgXCIyNTBcIik7XG4gICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcInJcIiwgXCIyMzBcIik7XG4gICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZmlsbDogbm9uZTsgc3Ryb2tlLXdpZHRoOiAzNXB4OyBzdHJva2U6IGN1cnJlbnRDb2xvcjtcIik7XG4gICAgbGV0IGxpbmUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJsaW5lXCIpO1xuICAgIGxpbmUxLnNldEF0dHJpYnV0ZShcIngxXCIsIFwiMjUwXCIpO1xuICAgIGxpbmUxLnNldEF0dHJpYnV0ZShcInkxXCIsIFwiMTI1XCIpO1xuICAgIGxpbmUxLnNldEF0dHJpYnV0ZShcIngyXCIsIFwiMjUwXCIpO1xuICAgIGxpbmUxLnNldEF0dHJpYnV0ZShcInkyXCIsIFwiMzc1XCIpO1xuICAgIGxpbmUxLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwic3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyBzdHJva2Utd2lkdGg6IDM1cHg7IHN0cm9rZTogY3VycmVudENvbG9yO1wiKTtcbiAgICBsZXQgbGluZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImxpbmVcIik7XG4gICAgbGluZTIuc2V0QXR0cmlidXRlKFwieDFcIiwgXCIxMjVcIik7XG4gICAgbGluZTIuc2V0QXR0cmlidXRlKFwieTFcIiwgXCIyNTBcIik7XG4gICAgbGluZTIuc2V0QXR0cmlidXRlKFwieDJcIiwgXCIzNzVcIik7XG4gICAgbGluZTIuc2V0QXR0cmlidXRlKFwieTJcIiwgXCIyNTBcIik7XG4gICAgbGluZTIuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJzdHJva2UtbGluZWNhcDogcm91bmQ7IHN0cm9rZS13aWR0aDogMzVweDsgc3Ryb2tlOiBjdXJyZW50Q29sb3I7XCIpO1xuICAgIGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcbiAgICBzdmcuc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBcIjAgMCA1MDAgNTAwXCIpO1xuICAgIHN2Zy5hcHBlbmQoY2lyY2xlLCBsaW5lMSwgbGluZTIpO1xuICAgIGlmIChjbGFzc2VzKSB7XG4gICAgICAgIHN2Zy5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgIH1cbiAgICByZXR1cm4gc3ZnO1xufVxuZXhwb3J0cy5jcmVhdGVTdmdMb2dvID0gY3JlYXRlU3ZnTG9nbztcbmZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yLCBjaGVja19pbnRlcnZhbCA9IDUwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjaGVja19pbnRlcnZhbCk7XG4gICAgfSk7XG59XG5leHBvcnRzLndhaXRGb3JFbGVtZW50ID0gd2FpdEZvckVsZW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTG9nZ2VyID0gdm9pZCAwO1xuZXhwb3J0cy5Mb2dnZXIgPSB7XG4gICAgbG9nOiAoKCkgPT4gY29uc29sZS5sb2cuYmluZChnbG9iYWxUaGlzLmNvbnNvbGUsIGAlYytgLCBjcmVhdGVMb2dQcmVmaXgoXCIjODFENEZBXCIpKSkoKSxcbiAgICBlcnJvcjogKCgpID0+IGNvbnNvbGUuZXJyb3IuYmluZChnbG9iYWxUaGlzLmNvbnNvbGUsIGAlYytgLCBjcmVhdGVMb2dQcmVmaXgoXCIjRkY2OTYxXCIpKSkoKSxcbiAgICBpbmZvOiAoKCkgPT4gY29uc29sZS5pbmZvLmJpbmQoZ2xvYmFsVGhpcy5jb25zb2xlLCBgJWMrYCwgY3JlYXRlTG9nUHJlZml4KFwid2hpdGVcIikpKSgpLFxuICAgIHdhcm46ICgoKSA9PiBjb25zb2xlLndhcm4uYmluZChnbG9iYWxUaGlzLmNvbnNvbGUsIGAlYytgLCBjcmVhdGVMb2dQcmVmaXgoXCIjRkRGRDk2XCIpKSkoKSxcbiAgICB0cmFjZTogKCgpID0+IGNvbnNvbGUudHJhY2UuYmluZChnbG9iYWxUaGlzLmNvbnNvbGUsIGAlYytgLCBjcmVhdGVMb2dQcmVmaXgoXCJvcmFuZ2VcIikpKSgpLFxuICAgIGRlYnVnOiAoKCkgPT4gY29uc29sZS5kZWJ1Zy5iaW5kKGdsb2JhbFRoaXMuY29uc29sZSwgYCVjK2AsIGNyZWF0ZUxvZ1ByZWZpeChcImxpZ2h0Z3JlZW5cIikpKSgpLFxufTtcbmZ1bmN0aW9uIGNyZWF0ZUxvZ1ByZWZpeChjb2xvcikge1xuICAgIHJldHVybiBgY29sb3I6JHtjb2xvcn07Ym9yZGVyOjFweCBzb2xpZCAjMkEyQTJBO2JvcmRlci1yYWRpdXM6MTAwJTtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkO3BhZGRpbmc6IDAgNHB4IDAgNHB4O2JhY2tncm91bmQtY29sb3I6IzJBMkEyQWA7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZW5kTm90aWZpY2F0aW9uID0gZXhwb3J0cy51cGRhdGVMYXN0VGltZSA9IGV4cG9ydHMubG9hZEFzc2lnbm1lbnROb3RpZmljYXRpb25zID0gdm9pZCAwO1xuY29uc3QgZG9tcHVyaWZ5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImRvbXB1cmlmeVwiKSk7XG5jb25zdCBhbmFseXRpY3NfMSA9IHJlcXVpcmUoXCIuL2FuYWx5dGljc1wiKTtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgbG9nZ2VyXzEgPSByZXF1aXJlKFwiLi9sb2dnZXJcIik7XG5mdW5jdGlvbiBsb2FkQXNzaWdubWVudE5vdGlmaWNhdGlvbnMoYXNzaWdubWVudE5vdGlmaWNhdGlvblVybCwgbGFzdFRpbWUpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChhc3NpZ25tZW50Tm90aWZpY2F0aW9uVXJsLCB7XG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGxvYWRpbmcgbm90aWZpY2F0aW9uczogXCIgKyByZXNwb25zZSk7XG4gICAgICAgIGxldCByZXNwb25zZUpzb24gPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJMYXN0IG5ldyBncmFkZTogXCIgKyBuZXcgRGF0ZShsYXN0VGltZSkudG9TdHJpbmcoKSk7XG4gICAgICAgIGxldCB0aW1lID0gbGFzdFRpbWU7XG4gICAgICAgIGxldCB0aW1lTW9kaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aW1lKSB7XG4gICAgICAgICAgICB0aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRpbWVNb2RpZmllZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXZcIikgfHwgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IGRvbXB1cmlmeV8xLmRlZmF1bHQuc2FuaXRpemUocmVzcG9uc2VKc29uLm91dHB1dCk7XG4gICAgICAgIGxldCBub3RpZmljYXRpb25zID0gZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWRnZS1zZW50ZW5jZVwiKTtcbiAgICAgICAgbGV0IG1vbnRocyA9IFtcbiAgICAgICAgICAgIFwiSmFuXCIsXG4gICAgICAgICAgICBcIkZlYlwiLFxuICAgICAgICAgICAgXCJNYXJcIixcbiAgICAgICAgICAgIFwiQXByXCIsXG4gICAgICAgICAgICBcIk1heVwiLFxuICAgICAgICAgICAgXCJKdW5cIixcbiAgICAgICAgICAgIFwiSnVsXCIsXG4gICAgICAgICAgICBcIkF1Z1wiLFxuICAgICAgICAgICAgXCJTZXBcIixcbiAgICAgICAgICAgIFwiT2N0XCIsXG4gICAgICAgICAgICBcIk5vdlwiLFxuICAgICAgICAgICAgXCJEZWNcIixcbiAgICAgICAgXTtcbiAgICAgICAgbGV0IHRvdGFsQXNzaWdubWVudHMgPSAwO1xuICAgICAgICBmb3IgKGxldCBub3RpZmljYXRpb24gb2YgQXJyYXkuZnJvbShub3RpZmljYXRpb25zKS5yZXZlcnNlKCkpIHtcbiAgICAgICAgICAgIGlmIChub3RpZmljYXRpb24udGV4dENvbnRlbnQuaW5jbHVkZXMoXCJuZXcgZ3JhZGVcIikpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXNzaWdubWVudHMgPSBub3RpZmljYXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhXCIpO1xuICAgICAgICAgICAgICAgIGxldCBleHRyYVRleHRFbGVtZW50ID0gbm90aWZpY2F0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIub3RoZXItaXRlbXMtbGlua1wiKTtcbiAgICAgICAgICAgICAgICBsZXQgdGltZVRleHQgPSBub3RpZmljYXRpb24ucXVlcnlTZWxlY3RvcihcIi5lZGdlLXRpbWVcIikudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgbGV0IHNwbGl0RGF0ZSA9IHRpbWVUZXh0LnNwbGl0KFwiIGF0IFwiKTtcbiAgICAgICAgICAgICAgICBsZXQgbW9udGhEYXkgPSBzcGxpdERhdGVbMF07XG4gICAgICAgICAgICAgICAgbGV0IGhvdXJNaW51dGUgPSBzcGxpdERhdGVbMV07XG4gICAgICAgICAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgbGV0IG1vbnRoRGF5WWVhciA9IG1vbnRoRGF5ICsgYCAke25vdy5nZXRGdWxsWWVhcigpfWA7XG4gICAgICAgICAgICAgICAgbGV0IHRvZGF5ID0gYCR7bW9udGhzW25vdy5nZXRNb250aCgpXX0gJHtub3cuZ2V0RGF0ZSgpfSAke25vdy5nZXRGdWxsWWVhcigpfWA7XG4gICAgICAgICAgICAgICAgbGV0IG5vdGlmaWNhdGlvbkRhdGUgPSBEYXRlLnBhcnNlKG1vbnRoRGF5WWVhcik7XG4gICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbkRhdGUgPiBEYXRlLnBhcnNlKHRvZGF5KSkge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25EYXRlID0gRGF0ZS5wYXJzZShtb250aERheSArIGAgJHtub3cuZ2V0RnVsbFllYXIoKSAtIDF9ICR7aG91ck1pbnV0ZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbkRhdGUgPSBEYXRlLnBhcnNlKGAke21vbnRoRGF5WWVhcn0gJHtob3VyTWludXRlfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uRGF0ZSA+IHRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZSA9IG5vdGlmaWNhdGlvbkRhdGU7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVNb2RpZmllZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsQXNzaWdubWVudHMrKztcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgbiA9IG51bGw7XG4gICAgICAgIGlmICh0b3RhbEFzc2lnbm1lbnRzID4gMCkge1xuICAgICAgICAgICAgbiA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJhc2ljXCIsXG4gICAgICAgICAgICAgICAgaWNvblVybDogXCJpbWdzL2ljb25AMTI4LnBuZ1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5ldyBncmFkZSBwb3N0ZWRcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgJHt0b3RhbEFzc2lnbm1lbnRzfSBuZXcgYXNzaWdubWVudCR7dG90YWxBc3NpZ25tZW50cyA9PT0gMSA/IFwiIGhhcyBhIGdyYWRlXCIgOiBcInMgaGF2ZSBncmFkZXNcIn1gLFxuICAgICAgICAgICAgICAgIGV2ZW50VGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICBpc0NsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbjogbixcbiAgICAgICAgICAgIG5hbWU6IFwiYXNzaWdubWVudFwiLFxuICAgICAgICAgICAgY291bnQ6IHRvdGFsQXNzaWdubWVudHMsXG4gICAgICAgICAgICBsYXN0VGltZTogdGltZSxcbiAgICAgICAgICAgIHRpbWVNb2RpZmllZCxcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmV4cG9ydHMubG9hZEFzc2lnbm1lbnROb3RpZmljYXRpb25zID0gbG9hZEFzc2lnbm1lbnROb3RpZmljYXRpb25zO1xuZnVuY3Rpb24gdXBkYXRlTGFzdFRpbWUodGltZU1vZGlmaWVkLCB0aW1lKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKHRpbWVNb2RpZmllZCkge1xuICAgICAgICAgICAgeWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBsYXN0VGltZTogdGltZSB9KTtcbiAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJTZXQgbmV3IHRpbWUgXCIgKyBuZXcgRGF0ZSh0aW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiTm8gbmV3IG5vdGlmaWNhdGlvbnNcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMudXBkYXRlTGFzdFRpbWUgPSB1cGRhdGVMYXN0VGltZTtcbi8qKlxuICogU2VuZHMgYSBkZXNrdG9wIG5vdGlmaWNhdGlvbiBpZiBzZXR0aW5ncyBwZXJtaXRcbiAqIEBwYXJhbSB7Tm90aWZpY2F0aW9uT3B0aW9uc30gbm90aWZpY2F0aW9uIEEgY2hyb21lIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBub3RpZmljYXRpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnQ9MV0gVGhlIG51bWJlciB0byBhZGQgdG8gdGhlIGJyb3dzZXIgYWN0aW9uIGJhZGdlXG4gKi9cbmZ1bmN0aW9uIHNlbmROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBuYW1lLCBjb3VudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGlmICghbm90aWZpY2F0aW9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgc3RvcmFnZUNvbnRlbnQgPSB5aWVsZCBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChudWxsKTtcbiAgICAgICAgY291bnQgPSBjb3VudCB8fCBjb3VudCA9PSAwID8gY291bnQgOiAxO1xuICAgICAgICBpZiAoKDAsIGRvbV8xLmdldEJyb3dzZXIpKCkgPT0gXCJGaXJlZm94XCIpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBub3RpZmljYXRpb24ucmVxdWlyZUludGVyYWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJOZXcgbm90aWZpY2F0aW9uIVwiLCBub3RpZmljYXRpb24pO1xuICAgICAgICBpZiAoY291bnQgPiAwICYmXG4gICAgICAgICAgICAoIXN0b3JhZ2VDb250ZW50Lm5vdGlmaWNhdGlvbnMgfHxcbiAgICAgICAgICAgICAgICBzdG9yYWdlQ29udGVudC5ub3RpZmljYXRpb25zID09IFwiZW5hYmxlZFwiIHx8XG4gICAgICAgICAgICAgICAgc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyA9PSBcImJhZGdlXCIpKSB7XG4gICAgICAgICAgICBsZXQgeCA9IHlpZWxkIGNocm9tZS5hY3Rpb24uZ2V0QmFkZ2VUZXh0KHt9KTtcbiAgICAgICAgICAgIGxldCBudW0gPSBOdW1iZXIucGFyc2VJbnQoeCk7XG4gICAgICAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IChudW0gPyBudW0gKyBjb3VudCA6IGNvdW50KS50b1N0cmluZygpIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIk51bWJlciBiYWRnZSBpcyBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN0b3JhZ2VDb250ZW50Lm5vdGlmaWNhdGlvbnMgfHxcbiAgICAgICAgICAgIHN0b3JhZ2VDb250ZW50Lm5vdGlmaWNhdGlvbnMgPT0gXCJlbmFibGVkXCIgfHxcbiAgICAgICAgICAgIHN0b3JhZ2VDb250ZW50Lm5vdGlmaWNhdGlvbnMgPT0gXCJwb3B1cFwiKSB7XG4gICAgICAgICAgICBjaHJvbWUubm90aWZpY2F0aW9ucy5jcmVhdGUobmFtZSwgbm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgICgwLCBhbmFseXRpY3NfMS50cmFja0V2ZW50KShcInBlcmZvcm1fYWN0aW9uXCIsIHtcbiAgICAgICAgICAgICAgICBpZDogXCJzaG93blwiLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IFwiTm90aWZpY2F0aW9uc1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBuYW1lLFxuICAgICAgICAgICAgICAgIGxlZ2FjeVRhcmdldDogbmFtZSxcbiAgICAgICAgICAgICAgICBsZWdhY3lBY3Rpb246IFwic2hvd25cIixcbiAgICAgICAgICAgICAgICBsZWdhY3lMYWJlbDogXCJOb3RpZmljYXRpb25zXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJQb3B1cCBub3RpZmljYXRpb25zIGFyZSBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5zZW5kTm90aWZpY2F0aW9uID0gc2VuZE5vdGlmaWNhdGlvbjtcbiIsImltcG9ydCB7IGluamVjdENvbnRlbnRTY3JpcHQgfSBmcm9tICd3ZWJleHQtY29udGVudC1zY3JpcHRzJztcbmltcG9ydCBjaHJvbWVQIGZyb20gJ3dlYmV4dC1wb2x5ZmlsbC1raW5kYSc7XG5pbXBvcnQgeyBwYXR0ZXJuVG9SZWdleCB9IGZyb20gJ3dlYmV4dC1wYXR0ZXJucyc7XG5jb25zdCBub01hdGNoZXNFcnJvciA9ICdUeXBlIGVycm9yIGZvciBwYXJhbWV0ZXIgY29udGVudFNjcmlwdE9wdGlvbnMgKEVycm9yIHByb2Nlc3NpbmcgbWF0Y2hlczogQXJyYXkgcmVxdWlyZXMgYXQgbGVhc3QgMSBpdGVtczsgeW91IGhhdmUgMCkgZm9yIGNvbnRlbnRTY3JpcHRzLnJlZ2lzdGVyLic7XG5jb25zdCBub1Blcm1pc3Npb25FcnJvciA9ICdQZXJtaXNzaW9uIGRlbmllZCB0byByZWdpc3RlciBhIGNvbnRlbnQgc2NyaXB0IGZvciAnO1xuY29uc3QgZ290TmF2aWdhdGlvbiA9IHR5cGVvZiBjaHJvbWUgPT09ICdvYmplY3QnICYmICd3ZWJOYXZpZ2F0aW9uJyBpbiBjaHJvbWU7XG5hc3luYyBmdW5jdGlvbiBpc09yaWdpblBlcm1pdHRlZCh1cmwpIHtcbiAgICByZXR1cm4gY2hyb21lUC5wZXJtaXNzaW9ucy5jb250YWlucyh7XG4gICAgICAgIG9yaWdpbnM6IFtuZXcgVVJMKHVybCkub3JpZ2luICsgJy8qJ10sXG4gICAgfSk7XG59XG4vLyBUaGUgY2FsbGJhY2sgaXMgb25seSB1c2VkIGJ5IHdlYmV4dGVuc2lvbi1wb2x5ZmlsbFxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJDb250ZW50U2NyaXB0KGNvbnRlbnRTY3JpcHRPcHRpb25zLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHsganMgPSBbXSwgY3NzID0gW10sIG1hdGNoQWJvdXRCbGFuaywgbWF0Y2hlcyA9IFtdLCBleGNsdWRlTWF0Y2hlcywgcnVuQXQsIH0gPSBjb250ZW50U2NyaXB0T3B0aW9ucztcbiAgICBsZXQgeyBhbGxGcmFtZXMgfSA9IGNvbnRlbnRTY3JpcHRPcHRpb25zO1xuICAgIGlmIChnb3ROYXZpZ2F0aW9uKSB7XG4gICAgICAgIGFsbEZyYW1lcyA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIGlmIChhbGxGcmFtZXMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdgYWxsRnJhbWVzOiB0cnVlYCByZXF1aXJlcyB0aGUgYHdlYk5hdmlnYXRpb25gIHBlcm1pc3Npb24gdG8gd29yayBjb3JyZWN0bHk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mcmVnYW50ZS9jb250ZW50LXNjcmlwdHMtcmVnaXN0ZXItcG9seWZpbGwjcGVybWlzc2lvbnMnKTtcbiAgICB9XG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihub01hdGNoZXNFcnJvcik7XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKG1hdGNoZXMubWFwKGFzeW5jIChwYXR0ZXJuKSA9PiB7XG4gICAgICAgIGlmICghYXdhaXQgY2hyb21lUC5wZXJtaXNzaW9ucy5jb250YWlucyh7IG9yaWdpbnM6IFtwYXR0ZXJuXSB9KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5vUGVybWlzc2lvbkVycm9yICsgcGF0dGVybik7XG4gICAgICAgIH1cbiAgICB9KSk7XG4gICAgY29uc3QgbWF0Y2hlc1JlZ2V4ID0gcGF0dGVyblRvUmVnZXgoLi4ubWF0Y2hlcyk7XG4gICAgY29uc3QgZXhjbHVkZU1hdGNoZXNSZWdleCA9IHBhdHRlcm5Ub1JlZ2V4KC4uLmV4Y2x1ZGVNYXRjaGVzICE9PSBudWxsICYmIGV4Y2x1ZGVNYXRjaGVzICE9PSB2b2lkIDAgPyBleGNsdWRlTWF0Y2hlcyA6IFtdKTtcbiAgICBjb25zdCBpbmplY3QgPSBhc3luYyAodXJsLCB0YWJJZCwgZnJhbWVJZCA9IDApID0+IHtcbiAgICAgICAgaWYgKCFtYXRjaGVzUmVnZXgudGVzdCh1cmwpIC8vIE1hbnVhbCBgbWF0Y2hlc2AgZ2xvYiBtYXRjaGluZ1xuICAgICAgICAgICAgfHwgZXhjbHVkZU1hdGNoZXNSZWdleC50ZXN0KHVybCkgLy8gTWFudWFsIGBleGNsdWRlX21hdGNoZXNgIGdsb2IgbWF0Y2hpbmdcbiAgICAgICAgICAgIHx8ICFhd2FpdCBpc09yaWdpblBlcm1pdHRlZCh1cmwpIC8vIFdpdGhvdXQgdGhpcywgd2UgbWlnaHQgaGF2ZSB0ZW1wb3JhcnkgYWNjZXNzIHZpYSBhY2Nlc3NUYWJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgaW5qZWN0Q29udGVudFNjcmlwdCh7XG4gICAgICAgICAgICB0YWJJZCxcbiAgICAgICAgICAgIGZyYW1lSWQsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNzcyxcbiAgICAgICAgICAgIGpzLFxuICAgICAgICAgICAgbWF0Y2hBYm91dEJsYW5rLFxuICAgICAgICAgICAgcnVuQXQsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlnbm9yZVRhcmdldEVycm9yczogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCB0YWJMaXN0ZW5lciA9IGFzeW5jICh0YWJJZCwgeyBzdGF0dXMgfSwgeyB1cmwgfSkgPT4ge1xuICAgICAgICAvLyBPbmx5IHN0YXR1cyB1cGRhdGVzIGFyZSByZWxldmFudFxuICAgICAgICAvLyBObyBVUkwgPSBubyBwZXJtaXNzaW9uXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdsb2FkaW5nJyAmJiB1cmwpIHtcbiAgICAgICAgICAgIHZvaWQgaW5qZWN0KHVybCwgdGFiSWQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBuYXZMaXN0ZW5lciA9IGFzeW5jICh7IHRhYklkLCBmcmFtZUlkLCB1cmwsIH0pID0+IHtcbiAgICAgICAgdm9pZCBpbmplY3QodXJsLCB0YWJJZCwgZnJhbWVJZCk7XG4gICAgfTtcbiAgICBpZiAoZ290TmF2aWdhdGlvbikge1xuICAgICAgICBjaHJvbWUud2ViTmF2aWdhdGlvbi5vbkNvbW1pdHRlZC5hZGRMaXN0ZW5lcihuYXZMaXN0ZW5lcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIodGFiTGlzdGVuZXIpO1xuICAgIH1cbiAgICBjb25zdCByZWdpc3RlcmVkQ29udGVudFNjcmlwdCA9IHtcbiAgICAgICAgYXN5bmMgdW5yZWdpc3RlcigpIHtcbiAgICAgICAgICAgIGlmIChnb3ROYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2hyb21lLndlYk5hdmlnYXRpb24ub25Db21taXR0ZWQucmVtb3ZlTGlzdGVuZXIobmF2TGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHRhYkxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2socmVnaXN0ZXJlZENvbnRlbnRTY3JpcHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJlZENvbnRlbnRTY3JpcHQ7XG59XG4iLCJpbXBvcnQgeyBleGNsdWRlRHVwbGljYXRlUGF0dGVybnMsIHBhdHRlcm5Ub1JlZ2V4IH0gZnJvbSAnd2ViZXh0LXBhdHRlcm5zJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRNYW5pZmVzdFBlcm1pc3Npb25zKCkge1xuICAgIHJldHVybiBnZXRNYW5pZmVzdFBlcm1pc3Npb25zU3luYygpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hbmlmZXN0UGVybWlzc2lvbnNTeW5jKCkge1xuICAgIHJldHVybiBfZ2V0TWFuaWZlc3RQZXJtaXNzaW9uc1N5bmMoY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gX2dldE1hbmlmZXN0UGVybWlzc2lvbnNTeW5jKG1hbmlmZXN0KSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgY29uc3QgbWFuaWZlc3RQZXJtaXNzaW9ucyA9IHtcbiAgICAgICAgb3JpZ2luczogW10sXG4gICAgICAgIHBlcm1pc3Npb25zOiBbXSxcbiAgICB9O1xuICAgIGNvbnN0IGxpc3QgPSBuZXcgU2V0KFtcbiAgICAgICAgLi4uKChfYSA9IG1hbmlmZXN0LnBlcm1pc3Npb25zKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSksXG4gICAgICAgIC4uLigoX2IgPSBtYW5pZmVzdC5jb250ZW50X3NjcmlwdHMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFtdKS5mbGF0TWFwKGNvbmZpZyA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGNvbmZpZy5tYXRjaGVzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXTsgfSksXG4gICAgXSk7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvZ2Vja28tZGV2L2Jsb2IvYzBmYzhjNDg1MmU5MjdiMGFlNzVkODkzZDM1NzcyYjhjNjBlZTA2Yi90b29sa2l0L2NvbXBvbmVudHMvZXh0ZW5zaW9ucy9FeHRlbnNpb24uanNtI0w3MzgtTDc0M1xuICAgIGlmIChtYW5pZmVzdC5kZXZ0b29sc19wYWdlXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgaXQgY2FuJ3QgYmUgc3BlY2lmaWVkLCBidXQgaXQncyByZXBvcnRlZCB3aGVuIHJlcXVlc3RlZFxuICAgICAgICAmJiAhKChfYyA9IG1hbmlmZXN0Lm9wdGlvbmFsX3Blcm1pc3Npb25zKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaW5jbHVkZXMoJ2RldnRvb2xzJykpKSB7XG4gICAgICAgIGxpc3QuYWRkKCdkZXZ0b29scycpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHBlcm1pc3Npb24gb2YgbGlzdCkge1xuICAgICAgICBpZiAocGVybWlzc2lvbi5pbmNsdWRlcygnOi8vJykpIHtcbiAgICAgICAgICAgIG1hbmlmZXN0UGVybWlzc2lvbnMub3JpZ2lucy5wdXNoKHBlcm1pc3Npb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWFuaWZlc3RQZXJtaXNzaW9ucy5wZXJtaXNzaW9ucy5wdXNoKHBlcm1pc3Npb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYW5pZmVzdFBlcm1pc3Npb25zO1xufVxuY29uc3QgaG9zdFJlZ2V4ID0gLzpbL11bL11bKi5dKihbXi9dKykvOyAvLyBFeHRyYWN0cyB0aGUgd2lsZGNhcmQtbGVzcyBob3N0bmFtZVxuZnVuY3Rpb24gcGFyc2VEb21haW4ob3JpZ2luKSB7XG4gICAgcmV0dXJuIG9yaWdpbi5zcGxpdChob3N0UmVnZXgpWzFdO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdEFkZGl0aW9uYWxQZXJtaXNzaW9ucyhwZXJtaXNzaW9ucywgb3B0aW9ucykge1xuICAgIHJldHVybiBzZWxlY3RBZGRpdGlvbmFsUGVybWlzc2lvbnNTeW5jKHBlcm1pc3Npb25zLCBvcHRpb25zKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RBZGRpdGlvbmFsUGVybWlzc2lvbnNTeW5jKHBlcm1pc3Npb25zLCBvcHRpb25zKSB7XG4gICAgY29uc3QgbWFuaWZlc3RQZXJtaXNzaW9ucyA9IGdldE1hbmlmZXN0UGVybWlzc2lvbnNTeW5jKCk7XG4gICAgcmV0dXJuIF9nZXRBZGRpdGlvbmFsUGVybWlzc2lvbnMobWFuaWZlc3RQZXJtaXNzaW9ucywgcGVybWlzc2lvbnMsIG9wdGlvbnMpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFkZGl0aW9uYWxQZXJtaXNzaW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBjaHJvbWUucGVybWlzc2lvbnMuZ2V0QWxsKGN1cnJlbnRQZXJtaXNzaW9ucyA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYW5pZmVzdFBlcm1pc3Npb25zID0gZ2V0TWFuaWZlc3RQZXJtaXNzaW9uc1N5bmMoKTtcbiAgICAgICAgICAgIHJlc29sdmUoX2dldEFkZGl0aW9uYWxQZXJtaXNzaW9ucyhtYW5pZmVzdFBlcm1pc3Npb25zLCBjdXJyZW50UGVybWlzc2lvbnMsIG9wdGlvbnMpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gX2dldEFkZGl0aW9uYWxQZXJtaXNzaW9ucyhtYW5pZmVzdFBlcm1pc3Npb25zLCBjdXJyZW50UGVybWlzc2lvbnMsIHsgc3RyaWN0T3JpZ2lucyA9IHRydWUgfSA9IHt9KSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCBhZGRpdGlvbmFsUGVybWlzc2lvbnMgPSB7XG4gICAgICAgIG9yaWdpbnM6IFtdLFxuICAgICAgICBwZXJtaXNzaW9uczogW10sXG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IG9yaWdpbiBvZiAoX2EgPSBjdXJyZW50UGVybWlzc2lvbnMub3JpZ2lucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10pIHtcbiAgICAgICAgaWYgKG1hbmlmZXN0UGVybWlzc2lvbnMub3JpZ2lucy5pbmNsdWRlcyhvcmlnaW4pKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN0cmljdE9yaWdpbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvbWFpbiA9IHBhcnNlRG9tYWluKG9yaWdpbik7XG4gICAgICAgICAgICBjb25zdCBpc0RvbWFpbkluTWFuaWZlc3QgPSBtYW5pZmVzdFBlcm1pc3Npb25zLm9yaWdpbnNcbiAgICAgICAgICAgICAgICAuc29tZShtYW5pZmVzdE9yaWdpbiA9PiBwYXJzZURvbWFpbihtYW5pZmVzdE9yaWdpbikgPT09IGRvbWFpbik7XG4gICAgICAgICAgICBpZiAoaXNEb21haW5Jbk1hbmlmZXN0KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYWRkaXRpb25hbFBlcm1pc3Npb25zLm9yaWdpbnMucHVzaChvcmlnaW4pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHBlcm1pc3Npb24gb2YgKF9iID0gY3VycmVudFBlcm1pc3Npb25zLnBlcm1pc3Npb25zKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBbXSkge1xuICAgICAgICBpZiAoIW1hbmlmZXN0UGVybWlzc2lvbnMucGVybWlzc2lvbnMuaW5jbHVkZXMocGVybWlzc2lvbikpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQZXJtaXNzaW9ucy5wZXJtaXNzaW9ucy5wdXNoKHBlcm1pc3Npb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhZGRpdGlvbmFsUGVybWlzc2lvbnM7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNVcmxQZXJtaXR0ZWRCeU1hbmlmZXN0KG9yaWdpbikge1xuICAgIHJldHVybiBfaXNVcmxQZXJtaXR0ZWRCeU1hbmlmZXN0KG9yaWdpbiwgY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gX2lzVXJsUGVybWl0dGVkQnlNYW5pZmVzdChvcmlnaW4sIG1hbmlmZXN0KSB7XG4gICAgY29uc3QgbWFuaWZlc3RQZXJtaXNzaW9ucyA9IF9nZXRNYW5pZmVzdFBlcm1pc3Npb25zU3luYyhtYW5pZmVzdCk7XG4gICAgY29uc3Qgb3JpZ2luc1JlZ2V4ID0gcGF0dGVyblRvUmVnZXgoLi4ubWFuaWZlc3RQZXJtaXNzaW9ucy5vcmlnaW5zKTtcbiAgICByZXR1cm4gb3JpZ2luc1JlZ2V4LnRlc3Qob3JpZ2luKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcm9wT3ZlcmxhcHBpbmdQZXJtaXNzaW9ucyh7IG9yaWdpbnMsIHBlcm1pc3Npb25zIH0pIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBpZiAob3JpZ2lucykge1xuICAgICAgICByZXN1bHQub3JpZ2lucyA9IGV4Y2x1ZGVEdXBsaWNhdGVQYXR0ZXJucyhvcmlnaW5zKTtcbiAgICB9XG4gICAgaWYgKHBlcm1pc3Npb25zKSB7XG4gICAgICAgIHJlc3VsdC5wZXJtaXNzaW9ucyA9IFsuLi5wZXJtaXNzaW9uc107XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBvbmVFdmVudCB9IGZyb20gJ3dlYmV4dC1ldmVudHMnO1xuaW1wb3J0IHsgaXNCYWNrZ3JvdW5kV29ya2VyLCBpc0Nocm9tZSwgaXNCYWNrZ3JvdW5kUGFnZSB9IGZyb20gJ3dlYmV4dC1kZXRlY3QtcGFnZSc7XG5hc3luYyBmdW5jdGlvbiBvblBvcHVwQ2xvc2Uod2F0Y2hlZFdpbmRvd0lkKSB7XG4gICAgYXdhaXQgb25lRXZlbnQoY2hyb21lLndpbmRvd3Mub25SZW1vdmVkLCBjbG9zZWRXaW5kb3dJZCA9PiBjbG9zZWRXaW5kb3dJZCA9PT0gd2F0Y2hlZFdpbmRvd0lkKTtcbn1cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBzZXJpYWxpemVkLCBkbyBub3QgdXNlIHZhcmlhYmxlcyBvdXRzaWRlIGl0cyBzY29wZVxuZnVuY3Rpb24gcGFnZVNjcmlwdCgpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfID0+IHtcbiAgICAgICAgd2luZG93LmNsb3NlKCk7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBfID0+IHtcbiAgICAgICAgd2luZG93LmNsb3NlKCk7XG4gICAgfSk7XG4gICAgd2luZG93LnJlc2l6ZUJ5KDAsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICB3aW5kb3cubW92ZVRvKChzY3JlZW4ud2lkdGggLSB3aW5kb3cub3V0ZXJXaWR0aCkgLyAyLCAoc2NyZWVuLmhlaWdodCAtIHdpbmRvdy5vdXRlckhlaWdodCkgLyAyKTtcbiAgICBidXR0b24uZm9jdXMoKTtcbn1cbi8vIFRPRE86IEFkZCBidW5kbGVyIHRvIGluY2x1ZGUgYmFzZS1jc3NcbmNvbnN0IGNzcyA9IC8qIGNzcyAqLyBgXG5cdC8qISBodHRwczovL25wbS5pbS93ZWJleHQtYmFzZS1jc3MgKi9cblxuXHQvKiBDaHJvbWUgb25seTogLXdlYmtpdC1oeXBoZW5zICovXG5cdC8qIFNhZmFyaSBvbmx5OiBfOjotd2Via2l0LWZ1bGwtcGFnZS1tZWRpYSAqL1xuXG5cdC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi9cblx0QGltcG9ydCB1cmwoJ2Nocm9tZTovL2dsb2JhbC9za2luL2luLWNvbnRlbnQvY29tbW9uLmNzcycpIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86MCk7IC8qIEZpcmVmb3gtb25seSAqL1xuXG5cdDpyb290IHtcblx0XHQtLWJhY2tncm91bmQtY29sb3ItZm9yLWNocm9tZTogIzI5MmEyZDtcblx0XHRtYXgtd2lkdGg6IDcwMHB4O1xuXHRcdG1hcmdpbjogYXV0bztcblx0fVxuXG5cdGJvZHkge1xuXHRcdC0tYm9keS1tYXJnaW4taDogOHB4O1xuXHRcdG1hcmdpbi1sZWZ0OiB2YXIoLS1ib2R5LW1hcmdpbi1oKTtcblx0XHRtYXJnaW4tcmlnaHQ6IHZhcigtLWJvZHktbWFyZ2luLWgpO1xuXHR9XG5cblx0LyogU2VsZWN0b3IgbWF0Y2hlcyBGaXJlZm944oCZICovXG5cdGlucHV0W3R5cGU9J251bWJlciddLFxuXHRpbnB1dFt0eXBlPSdwYXNzd29yZCddLFxuXHRpbnB1dFt0eXBlPSdzZWFyY2gnXSxcblx0aW5wdXRbdHlwZT0ndGV4dCddLFxuXHRpbnB1dFt0eXBlPSd1cmwnXSxcblx0aW5wdXQ6bm90KFt0eXBlXSksXG5cdHRleHRhcmVhIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRcdG1hcmdpbi1sZWZ0OiAwO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdHJlc2l6ZTogdmVydGljYWw7XG5cdFx0LW1vei10YWItc2l6ZTogNCAhaW1wb3J0YW50O1xuXHRcdHRhYi1zaXplOiA0ICFpbXBvcnRhbnQ7XG5cdH1cblxuXHRpbnB1dFt0eXBlPSdjaGVja2JveCddIHtcblx0XHR2ZXJ0aWNhbC1hbGlnbjogLTAuMTVlbTtcblx0fVxuXG5cdEBzdXBwb3J0cyAobm90ICgtd2Via2l0LWh5cGhlbnM6bm9uZSkpIGFuZCAobm90ICgtbW96LWFwcGVhcmFuY2U6bm9uZSkpIGFuZCAobGlzdC1zdHlsZS10eXBlOicqJykge1xuXHRcdHRleHRhcmVhOmZvY3VzIHtcblx0XHRcdC8qIEluZXhwbGljYWJseSBtaXNzaW5nIGZyb20gQ2hyb21l4oCZcyBpbnB1dCBzdHlsZSBodHRwczovL2dpdGh1Yi5jb20vY2hyb21pdW0vY2hyb21pdW0vYmxvYi82YmVhMDU1N2ZlL2V4dGVuc2lvbnMvcmVuZGVyZXIvcmVzb3VyY2VzL2V4dGVuc2lvbi5jc3MjTDI4NyAqL1xuXHRcdFx0Ym9yZGVyLWNvbG9yOiAjNGQ5MGZlO1xuXHRcdFx0dHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDIwMG1zO1xuXHRcdH1cblx0fVxuXG5cdGhyIHtcblx0XHRtYXJnaW4tcmlnaHQ6IGNhbGMoLTEgKiB2YXIoLS1ib2R5LW1hcmdpbi1oKSk7XG5cdFx0bWFyZ2luLWxlZnQ6IGNhbGMoLTEgKiB2YXIoLS1ib2R5LW1hcmdpbi1oKSk7XG5cdFx0Ym9yZGVyOiBub25lO1xuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYWFhNDtcblx0fVxuXG5cdGltZyB7XG5cdFx0dmVydGljYWwtYWxpZ246IG1pZGRsZTtcblx0fVxuXG5cdF86Oi13ZWJraXQtZnVsbC1wYWdlLW1lZGlhLFxuXHRfOmZ1dHVyZSxcblx0OnJvb3Qge1xuXHRcdGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWYsICdBcHBsZSBDb2xvciBFbW9qaSc7XG5cdH1cblxuXHRfOjotd2Via2l0LWZ1bGwtcGFnZS1tZWRpYSxcblx0XzpmdXR1cmUsXG5cdGlucHV0W3R5cGU9J251bWJlciddLFxuXHRpbnB1dFt0eXBlPSdwYXNzd29yZCddLFxuXHRpbnB1dFt0eXBlPSdzZWFyY2gnXSxcblx0aW5wdXRbdHlwZT0ndGV4dCddLFxuXHRpbnB1dFt0eXBlPSd1cmwnXSxcblx0aW5wdXQ6bm90KFt0eXBlXSksXG5cdHRleHRhcmVhIHtcblx0XHRib3JkZXI6IHNvbGlkIDFweCAjODg4O1xuXHRcdHBhZGRpbmc6IDAuNGVtO1xuXHRcdGZvbnQ6IGluaGVyaXQ7XG5cdFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuXHR9XG5cblx0QG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xuXHRcdDpyb290IHtcblx0XHRcdGNvbG9yLXNjaGVtZTogZGFyaztcblx0XHRcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3ItZm9yLWNocm9tZSk7XG5cdFx0fVxuXG5cdFx0Ym9keSxcblx0XHRoMyB7IC8qIENocm9tZSAjMyAqL1xuXHRcdFx0Y29sb3I6ICNlOGVhZWQ7XG5cdFx0fVxuXG5cdFx0YSB7XG5cdFx0XHRjb2xvcjogdmFyKC0tbGluay1jb2xvciwgIzhhYjRmOCk7XG5cdFx0fVxuXG5cdFx0YTphY3RpdmUge1xuXHRcdFx0Y29sb3I6IHZhcigtLWxpbmstY29sb3ItYWN0aXZlLCAjYjZkM2Y5KTtcblx0XHR9XG5cblx0XHRpbnB1dFt0eXBlPSdudW1iZXInXSxcblx0XHRpbnB1dFt0eXBlPSdwYXNzd29yZCddLFxuXHRcdGlucHV0W3R5cGU9J3NlYXJjaCddLFxuXHRcdGlucHV0W3R5cGU9J3RleHQnXSxcblx0XHRpbnB1dFt0eXBlPSd1cmwnXSxcblx0XHRpbnB1dDpub3QoW3R5cGVdKSxcblx0XHR0ZXh0YXJlYSB7XG5cdFx0XHRjb2xvcjogaW5oZXJpdDtcblx0XHRcdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXHRcdH1cblx0fVxuXG5cdC8qIEVuZCB3ZWJleHQtYmFzZS1jc3MgKi9cblxuXHRib2R5IHtcblx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRcdG1pbi1oZWlnaHQ6IDEwMHZoO1xuXHRcdG1hcmdpbjogMDtcblx0XHRwYWRkaW5nOiAxZW07XG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRcdGZvbnQtc2l6ZTogMTRweDtcblx0XHRsaW5lLWhlaWdodDogMS41O1xuXHRcdGZvbnQtZmFtaWx5OiBzeXN0ZW0sIHN5c3RlbS11aSwgc2Fucy1zZXJpZjtcblx0fVxuXG5cdGJ1dHRvbiB7XG5cdFx0bWFyZ2luLXRvcDogMWVtO1xuXHRcdG1hcmdpbi1sZWZ0OiBhdXRvO1xuXHR9XG5gO1xuZnVuY3Rpb24gZ2V0UGFnZShtZXNzYWdlID0gJycpIHtcbiAgICByZXR1cm4gLyogaHRtbCAqLyBgXG5cdFx0PCFkb2N0eXBlIGh0bWw+XG5cdFx0PG1ldGEgY2hhcnNldD1cInV0Zi04XCIgLz5cblx0XHQ8dGl0bGU+JHtjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLm5hbWV9PC90aXRsZT5cblx0XHQ8c3R5bGU+JHtjc3N9PC9zdHlsZT5cblx0XHQ8c2NyaXB0IGRlZmVyIHNyYz1cImFsZXJ0LmpzXCI+PC9zY3JpcHQ+XG5cdFx0PGJvZHk+XG5cdFx0XHQ8bWFpbj4ke21lc3NhZ2V9PC9tYWluPlxuXHRcdFx0PGJ1dHRvbj5PazwvYnV0dG9uPlxuXHRcdDwvYm9keT5cblx0XHQ8c2NyaXB0Pigke3BhZ2VTY3JpcHQudG9TdHJpbmcoKX0pKCk8L3NjcmlwdD5cblx0YDtcbn1cbmFzeW5jIGZ1bmN0aW9uIHBvcHVwQWxlcnQobWVzc2FnZSkge1xuICAgIGNvbnN0IHdpZHRoID0gNDIwO1xuICAgIGNvbnN0IGhlaWdodCA9IDE1MDtcbiAgICAvLyBgY2hyb21lYCBpcyBQcm9taXNpZmllZCB3aGVyZSBgcG9wdXBBbGVydGAgaXMgdXNlZFxuICAgIGNvbnN0IHBvcHVwID0gYXdhaXQgY2hyb21lLndpbmRvd3MuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogJ3BvcHVwJyxcbiAgICAgICAgdXJsOiAnZGF0YTp0ZXh0L2h0bWwsJyArIGVuY29kZVVSSUNvbXBvbmVudChnZXRQYWdlKG1lc3NhZ2UpKSxcbiAgICAgICAgZm9jdXNlZDogdHJ1ZSxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB3aWR0aCxcbiAgICB9KTtcbiAgICBhd2FpdCBvblBvcHVwQ2xvc2UocG9wdXAuaWQpO1xufVxuLy8gYGFsZXJ0KClgIGlzIG5vdCBhdmFpbGFibGUgaW4gYW55IHNlcnZpY2Ugd29ya2VyXG4vLyBgYWxlcnQoKWAgaXMgbm90IGF2YWlsYWJsZSBpbiBhbnkgYmFja2dyb3VuZCBjb250ZXh0IGluIEZpcmVmb3ggYW5kIFNhZmFyaVxuY29uc3Qgd2ViZXh0QWxlcnQgPSBpc0JhY2tncm91bmRXb3JrZXIoKSB8fCAoIWlzQ2hyb21lKCkgJiYgaXNCYWNrZ3JvdW5kUGFnZSgpKVxuICAgID8gcG9wdXBBbGVydFxuICAgIDogYWxlcnQ7XG5leHBvcnQgZGVmYXVsdCB3ZWJleHRBbGVydDtcbiIsImxldCBjYWNoZSA9IHRydWU7XG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVdlYmV4dERldGVjdFBhZ2VDYWNoZSgpIHtcbiAgICBjYWNoZSA9IGZhbHNlO1xufVxuZnVuY3Rpb24gaXNDdXJyZW50UGF0aG5hbWUocGF0aCkge1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IG5ldyBVUkwocGF0aCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICAgICAgcmV0dXJuIHBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TWFuaWZlc3QoX3ZlcnNpb24pIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcy5jaHJvbWU/LnJ1bnRpbWU/LmdldE1hbmlmZXN0Py4oKTtcbn1cbmZ1bmN0aW9uIG9uY2UoZnVuY3Rpb25fKSB7XG4gICAgbGV0IHJlc3VsdDtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoIWNhY2hlIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmdW5jdGlvbl8oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIG9uIGh0dHAocyk6Ly8gcGFnZXMgKGl0IGNvdWxkIGJlIGluIGEgY29udGVudCBzY3JpcHQgb3IgcmVndWxhciB3ZWIgY29udGV4dCkgKi9cbmV4cG9ydCBjb25zdCBpc1dlYlBhZ2UgPSBvbmNlKCgpID0+IFsnYWJvdXQ6JywgJ2h0dHA6JywgJ2h0dHBzOiddLmluY2x1ZGVzKGxvY2F0aW9uLnByb3RvY29sKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGV4dGVuc2lvbiBjb250ZXh0cyB0aGF0IGhhdmUgYWNjZXNzIHRvIHRoZSBjaHJvbWUgQVBJICovXG5leHBvcnQgY29uc3QgaXNFeHRlbnNpb25Db250ZXh0ID0gb25jZSgoKSA9PiB0eXBlb2YgZ2xvYmFsVGhpcy5jaHJvbWU/LmV4dGVuc2lvbiA9PT0gJ29iamVjdCcpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGNvbnRlbnQgc2NyaXB0ICovXG5leHBvcnQgY29uc3QgaXNDb250ZW50U2NyaXB0ID0gb25jZSgoKSA9PiBpc0V4dGVuc2lvbkNvbnRleHQoKSAmJiBpc1dlYlBhZ2UoKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgYmFja2dyb3VuZCBjb250ZXh0ICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kID0gKCkgPT4gaXNCYWNrZ3JvdW5kUGFnZSgpIHx8IGlzQmFja2dyb3VuZFdvcmtlcigpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgcGFnZSAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZFBhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBjb25zdCBtYW5pZmVzdCA9IGdldE1hbmlmZXN0KDIpO1xuICAgIGlmIChtYW5pZmVzdFxuICAgICAgICAmJiBpc0N1cnJlbnRQYXRobmFtZShtYW5pZmVzdC5iYWNrZ3JvdW5kX3BhZ2UgPz8gbWFuaWZlc3QuYmFja2dyb3VuZD8ucGFnZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBCb29sZWFuKG1hbmlmZXN0Py5iYWNrZ3JvdW5kPy5zY3JpcHRzXG4gICAgICAgICYmIGlzQ3VycmVudFBhdGhuYW1lKCcvX2dlbmVyYXRlZF9iYWNrZ3JvdW5kX3BhZ2UuaHRtbCcpKTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgd29ya2VyICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kV29ya2VyID0gb25jZSgoKSA9PiBpc0N1cnJlbnRQYXRobmFtZShnZXRNYW5pZmVzdCgzKT8uYmFja2dyb3VuZD8uc2VydmljZV93b3JrZXIpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBwZXJzaXN0ZW50IGJhY2tncm91bmQgcGFnZSAoYXMgb3Bwb3NlZCB0byBhbiBFdmVudCBQYWdlIG9yIEJhY2tncm91bmQgV29ya2VyLCBib3RoIG9mIHdoaWNoIGNhbiBiZSB1bmxvYWRlZCBieSB0aGUgYnJvd3NlcikgKi9cbmV4cG9ydCBjb25zdCBpc1BlcnNpc3RlbnRCYWNrZ3JvdW5kUGFnZSA9IG9uY2UoKCkgPT4gaXNCYWNrZ3JvdW5kUGFnZSgpXG4gICAgJiYgZ2V0TWFuaWZlc3QoMik/Lm1hbmlmZXN0X3ZlcnNpb24gPT09IDIgLy8gRmlyZWZveCBjYW4gaGF2ZSBhIGJhY2tncm91bmQgcGFnZSBvbiBNVjMsIGJ1dCBjYW4ndCBiZSBwZXJzaXN0ZW50XG4gICAgJiYgZ2V0TWFuaWZlc3QoMik/LmJhY2tncm91bmQ/LnBlcnNpc3RlbnQgIT09IGZhbHNlKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYW4gb3B0aW9ucyBwYWdlLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCAqL1xuZXhwb3J0IGNvbnN0IGlzT3B0aW9uc1BhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBjb25zdCBwYXRoID0gZ2V0TWFuaWZlc3QoKT8ub3B0aW9uc191aT8ucGFnZTtcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGFuIG9wdGlvbnMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgKi9cbmV4cG9ydCBjb25zdCBpc1NpZGVQYW5lbCA9IG9uY2UoKCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnQgLS0gTm90IHlldCBpbiBAdHlwZXMvY2hyb21lXG4gICAgY29uc3QgcGF0aCA9IGdldE1hbmlmZXN0KDMpPy5bJ3NpZGVfcGFuZWwnXT8uZGVmYXVsdF9wYXRoO1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBkZXYgdG9vbHMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgYGRldnRvb2xzX3BhZ2VgIGZpZWxkLiAqL1xuZXhwb3J0IGNvbnN0IGlzRGV2VG9vbHNQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgY29uc3QgZGV2dG9vbHNQYWdlID0gaXNFeHRlbnNpb25Db250ZXh0KCkgJiYgY2hyb21lLmRldnRvb2xzICYmIGdldE1hbmlmZXN0KCk/LmRldnRvb2xzX3BhZ2U7XG4gICAgaWYgKHR5cGVvZiBkZXZ0b29sc1BhZ2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChkZXZ0b29sc1BhZ2UsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gdGhlIGRldiB0b29scyBwYWdlLiBVbmxpa2UgYGlzRGV2VG9vbHNQYWdlYCwgdGhpcyB3b3JrcyBpbiBhbnkgcGFnZSB0aGF0IGhhcyB0aGUgYGNocm9tZS5kZXZUb29sc2AgQVBJICovXG5leHBvcnQgY29uc3QgaXNEZXZUb29scyA9ICgpID0+IEJvb2xlYW4oZ2xvYmFsVGhpcy5jaHJvbWU/LmRldnRvb2xzKTtcbi8qKiBMb29zZWx5IGRldGVjdCBGaXJlZm94IHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNGaXJlZm94ID0gKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnRmlyZWZveCcpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IENocm9tZSB2aWEgdXNlciBhZ2VudCAobWlnaHQgYWxzbyBpbmNsdWRlIENocm9taXVtIGFuZCBmb3JrcyBsaWtlIE9wZXJhKSAqL1xuZXhwb3J0IGNvbnN0IGlzQ2hyb21lID0gKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnQ2hyb21lJyk7XG4vKiogTG9vc2VseSBkZXRlY3QgU2FmYXJpIHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNTYWZhcmkgPSAoKSA9PiAhaXNDaHJvbWUoKSAmJiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdTYWZhcmknKTtcbi8qKiBMb29zZWx5IGRldGVjdCBNb2JpbGUgU2FmYXJpIHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNNb2JpbGVTYWZhcmkgPSAoKSA9PiBpc1NhZmFyaSgpICYmIGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ01vYmlsZScpO1xuY29uc3QgY29udGV4dENoZWNrcyA9IHtcbiAgICBjb250ZW50U2NyaXB0OiBpc0NvbnRlbnRTY3JpcHQsXG4gICAgYmFja2dyb3VuZDogaXNCYWNrZ3JvdW5kLFxuICAgIG9wdGlvbnM6IGlzT3B0aW9uc1BhZ2UsXG4gICAgc2lkZVBhbmVsOiBpc1NpZGVQYW5lbCxcbiAgICBkZXZUb29sczogaXNEZXZUb29scyxcbiAgICBkZXZUb29sc1BhZ2U6IGlzRGV2VG9vbHNQYWdlLFxuICAgIGV4dGVuc2lvbjogaXNFeHRlbnNpb25Db250ZXh0LFxuICAgIHdlYjogaXNXZWJQYWdlLFxufTtcbmV4cG9ydCBjb25zdCBjb250ZXh0TmFtZXMgPSBPYmplY3Qua2V5cyhjb250ZXh0Q2hlY2tzKTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZXh0TmFtZSgpIHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB0ZXN0XSBvZiBPYmplY3QuZW50cmllcyhjb250ZXh0Q2hlY2tzKSkge1xuICAgICAgICBpZiAodGVzdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJ3Vua25vd24nO1xufVxuIiwiaW1wb3J0IGNocm9tZVAgZnJvbSAnd2ViZXh0LXBvbHlmaWxsLWtpbmRhJztcbmltcG9ydCB7IHBhdHRlcm5Ub1JlZ2V4IH0gZnJvbSAnd2ViZXh0LXBhdHRlcm5zJztcbmNvbnN0IGdvdFNjcmlwdGluZyA9IEJvb2xlYW4oZ2xvYmFsVGhpcy5jaHJvbWU/LnNjcmlwdGluZyk7XG5mdW5jdGlvbiBjYXN0VGFyZ2V0KHRhcmdldCkge1xuICAgIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0JyA/IHRhcmdldCA6IHtcbiAgICAgICAgdGFiSWQ6IHRhcmdldCxcbiAgICAgICAgZnJhbWVJZDogMCxcbiAgICB9O1xufVxuZnVuY3Rpb24gY2FzdEFsbEZyYW1lc1RhcmdldCh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4udGFyZ2V0LCBhbGxGcmFtZXM6IGZhbHNlIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHRhYklkOiB0YXJnZXQsXG4gICAgICAgIGZyYW1lSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgYWxsRnJhbWVzOiB0cnVlLFxuICAgIH07XG59XG5mdW5jdGlvbiBjYXN0QXJyYXkocG9zc2libGVBcnJheSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBvc3NpYmxlQXJyYXkpKSB7XG4gICAgICAgIHJldHVybiBwb3NzaWJsZUFycmF5O1xuICAgIH1cbiAgICByZXR1cm4gW3Bvc3NpYmxlQXJyYXldO1xufVxuY29uc3QgbmF0aXZlRnVuY3Rpb24gPSAvXmZ1bmN0aW9uIFxcdytcXChcXCkge1tcXG5cXHNdK1xcW25hdGl2ZSBjb2RlXVtcXG5cXHNdK30vO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVGdW5jdGlvbih0YXJnZXQsIGZ1bmN0aW9uXywgLi4uYXJncykge1xuICAgIGlmIChuYXRpdmVGdW5jdGlvbi50ZXN0KFN0cmluZyhmdW5jdGlvbl8pKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOYXRpdmUgZnVuY3Rpb25zIG5lZWQgdG8gYmUgd3JhcHBlZCBmaXJzdCwgbGlrZSBgZXhlY3V0ZUZ1bmN0aW9uKDEsICgpID0+IGFsZXJ0KDEpKWAnKTtcbiAgICB9XG4gICAgY29uc3QgeyBmcmFtZUlkLCB0YWJJZCB9ID0gY2FzdFRhcmdldCh0YXJnZXQpO1xuICAgIGlmIChnb3RTY3JpcHRpbmcpIHtcbiAgICAgICAgY29uc3QgW2luamVjdGlvbl0gPSBhd2FpdCBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgdGFiSWQsXG4gICAgICAgICAgICAgICAgZnJhbWVJZHM6IFtmcmFtZUlkXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jOiBmdW5jdGlvbl8sXG4gICAgICAgICAgICBhcmdzLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGluamVjdGlvbj8ucmVzdWx0O1xuICAgIH1cbiAgICBjb25zdCBbcmVzdWx0XSA9IGF3YWl0IGNocm9tZVAudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XG4gICAgICAgIGNvZGU6IGAoJHtmdW5jdGlvbl8udG9TdHJpbmcoKX0pKC4uLiR7SlNPTi5zdHJpbmdpZnkoYXJncyl9KWAsXG4gICAgICAgIG1hdGNoQWJvdXRCbGFuazogdHJ1ZSwgLy8gTmVlZGVkIGZvciBgc3JjZG9jYCBmcmFtZXM7IGRvZXNuJ3QgaHVydCBub3JtYWwgcGFnZXNcbiAgICAgICAgZnJhbWVJZCxcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gYXJyYXlPclVuZGVmaW5lZCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogW3ZhbHVlXTtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gLS0gSXQgZm9sbG93cyB0aGUgbmF0aXZlIG5hbWluZ1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluc2VydENTUyh7IHRhYklkLCBmcmFtZUlkLCBmaWxlcywgYWxsRnJhbWVzLCBtYXRjaEFib3V0QmxhbmssIHJ1bkF0LCB9LCB7IGlnbm9yZVRhcmdldEVycm9ycyB9ID0ge30pIHtcbiAgICBjb25zdCBldmVyeUluc2VydGlvbiA9IFByb21pc2UuYWxsKGZpbGVzLm1hcChhc3luYyAoY29udGVudCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb250ZW50ID0geyBmaWxlOiBjb250ZW50IH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdvdFNjcmlwdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGNocm9tZS5zY3JpcHRpbmcuaW5zZXJ0Q1NTKHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFiSWQsXG4gICAgICAgICAgICAgICAgICAgIGZyYW1lSWRzOiBhcnJheU9yVW5kZWZpbmVkKGZyYW1lSWQpLFxuICAgICAgICAgICAgICAgICAgICBhbGxGcmFtZXM6IGZyYW1lSWQgPT09IHVuZGVmaW5lZCA/IGFsbEZyYW1lcyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpbGVzOiAnZmlsZScgaW4gY29udGVudCA/IFtjb250ZW50LmZpbGVdIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGNzczogJ2NvZGUnIGluIGNvbnRlbnQgPyBjb250ZW50LmNvZGUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hyb21lUC50YWJzLmluc2VydENTUyh0YWJJZCwge1xuICAgICAgICAgICAgLi4uY29udGVudCxcbiAgICAgICAgICAgIG1hdGNoQWJvdXRCbGFuayxcbiAgICAgICAgICAgIGFsbEZyYW1lcyxcbiAgICAgICAgICAgIGZyYW1lSWQsXG4gICAgICAgICAgICBydW5BdDogcnVuQXQgPz8gJ2RvY3VtZW50X3N0YXJ0JywgLy8gQ1NTIHNob3VsZCBwcmVmZXIgYGRvY3VtZW50X3N0YXJ0YCB3aGVuIHVuc3BlY2lmaWVkXG4gICAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBpZiAoaWdub3JlVGFyZ2V0RXJyb3JzKSB7XG4gICAgICAgIGF3YWl0IGNhdGNoVGFyZ2V0SW5qZWN0aW9uRXJyb3JzKGV2ZXJ5SW5zZXJ0aW9uKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGF3YWl0IGV2ZXJ5SW5zZXJ0aW9uO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2VydE5vQ29kZShmaWxlcykge1xuICAgIGlmIChmaWxlcy5zb21lKGNvbnRlbnQgPT4gJ2NvZGUnIGluIGNvbnRlbnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2hyb21lLnNjcmlwdGluZyBkb2VzIG5vdCBzdXBwb3J0IGluamVjdGluZyBzdHJpbmdzIG9mIGBjb2RlYCcpO1xuICAgIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlU2NyaXB0KHsgdGFiSWQsIGZyYW1lSWQsIGZpbGVzLCBhbGxGcmFtZXMsIG1hdGNoQWJvdXRCbGFuaywgcnVuQXQsIH0sIHsgaWdub3JlVGFyZ2V0RXJyb3JzIH0gPSB7fSkge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRGaWxlcyA9IGZpbGVzLm1hcChmaWxlID0+IHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJyA/IHsgZmlsZSB9IDogZmlsZSk7XG4gICAgaWYgKGdvdFNjcmlwdGluZykge1xuICAgICAgICBhc3NlcnROb0NvZGUobm9ybWFsaXplZEZpbGVzKTtcbiAgICAgICAgY29uc3QgaW5qZWN0aW9uID0gY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgIHRhYklkLFxuICAgICAgICAgICAgICAgIGZyYW1lSWRzOiBhcnJheU9yVW5kZWZpbmVkKGZyYW1lSWQpLFxuICAgICAgICAgICAgICAgIGFsbEZyYW1lczogZnJhbWVJZCA9PT0gdW5kZWZpbmVkID8gYWxsRnJhbWVzIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbGVzOiBub3JtYWxpemVkRmlsZXMubWFwKCh7IGZpbGUgfSkgPT4gZmlsZSksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaWdub3JlVGFyZ2V0RXJyb3JzKSB7XG4gICAgICAgICAgICBhd2FpdCBjYXRjaFRhcmdldEluamVjdGlvbkVycm9ycyhpbmplY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgaW5qZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IHJldHVybiBgaW5qZWN0aW9uYDsgdGhlIFwicmV0dXJuIHZhbHVlXCIgb2YgYSBmaWxlIGlzIGdlbmVyYWxseSBub3QgdXNlZnVsXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRG9uJ3QgdXNlIC5tYXAoKSwgYGNvZGVgIGluamVjdGlvbnMgY2FuJ3QgYmUgXCJwYXJhbGxlbFwiXG4gICAgY29uc3QgZXhlY3V0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3QgY29udGVudCBvZiBub3JtYWxpemVkRmlsZXMpIHtcbiAgICAgICAgLy8gRmlsZXMgYXJlIGV4ZWN1dGVkIGluIG9yZGVyLCBidXQgYGNvZGVgIGlzbuKAmXQsIHNvIGl0IG11c3QgYXdhaXQgdGhlIGxhc3Qgc2NyaXB0IGJlZm9yZSBpbmplY3RpbmcgbW9yZVxuICAgICAgICBpZiAoJ2NvZGUnIGluIGNvbnRlbnQpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wIC0tIE9uIHB1cnBvc2UsIHNlZSBhYm92ZVxuICAgICAgICAgICAgYXdhaXQgZXhlY3V0aW9ucy5hdCgtMSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhlY3V0aW9ucy5wdXNoKGNocm9tZVAudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XG4gICAgICAgICAgICAuLi5jb250ZW50LFxuICAgICAgICAgICAgbWF0Y2hBYm91dEJsYW5rLFxuICAgICAgICAgICAgYWxsRnJhbWVzLFxuICAgICAgICAgICAgZnJhbWVJZCxcbiAgICAgICAgICAgIHJ1bkF0LFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChpZ25vcmVUYXJnZXRFcnJvcnMpIHtcbiAgICAgICAgYXdhaXQgY2F0Y2hUYXJnZXRJbmplY3Rpb25FcnJvcnMoUHJvbWlzZS5hbGwoZXhlY3V0aW9ucykpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZXhlY3V0aW9ucyk7XG4gICAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRhYnNCeVVybChtYXRjaGVzLCBleGNsdWRlTWF0Y2hlcykge1xuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IGV4Y2x1ZGUgPSBleGNsdWRlTWF0Y2hlcyA/IHBhdHRlcm5Ub1JlZ2V4KC4uLmV4Y2x1ZGVNYXRjaGVzKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB0YWJzID0gYXdhaXQgY2hyb21lUC50YWJzLnF1ZXJ5KHsgdXJsOiBtYXRjaGVzIH0pO1xuICAgIHJldHVybiB0YWJzXG4gICAgICAgIC5maWx0ZXIodGFiID0+IHRhYi5pZCAmJiB0YWIudXJsICYmIChleGNsdWRlID8gIWV4Y2x1ZGUudGVzdCh0YWIudXJsKSA6IHRydWUpKVxuICAgICAgICAubWFwKHRhYiA9PiB0YWIuaWQpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluamVjdENvbnRlbnRTY3JpcHQod2hlcmUsIHNjcmlwdHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHRhcmdldHMgPSBjYXN0QXJyYXkod2hlcmUpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKHRhcmdldHMubWFwKGFzeW5jICh0YXJnZXQpID0+IGluamVjdENvbnRlbnRTY3JpcHRJblNwZWNpZmljVGFyZ2V0KGNhc3RBbGxGcmFtZXNUYXJnZXQodGFyZ2V0KSwgc2NyaXB0cywgb3B0aW9ucykpKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGluamVjdENvbnRlbnRTY3JpcHRJblNwZWNpZmljVGFyZ2V0KHsgZnJhbWVJZCwgdGFiSWQsIGFsbEZyYW1lcyB9LCBzY3JpcHRzLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBpbmplY3Rpb25zID0gY2FzdEFycmF5KHNjcmlwdHMpLmZsYXRNYXAoc2NyaXB0ID0+IFtcbiAgICAgICAgaW5zZXJ0Q1NTKHtcbiAgICAgICAgICAgIHRhYklkLFxuICAgICAgICAgICAgZnJhbWVJZCxcbiAgICAgICAgICAgIGFsbEZyYW1lcyxcbiAgICAgICAgICAgIGZpbGVzOiBzY3JpcHQuY3NzID8/IFtdLFxuICAgICAgICAgICAgbWF0Y2hBYm91dEJsYW5rOiBzY3JpcHQubWF0Y2hBYm91dEJsYW5rID8/IHNjcmlwdC5tYXRjaF9hYm91dF9ibGFuayxcbiAgICAgICAgICAgIHJ1bkF0OiBzY3JpcHQucnVuQXQgPz8gc2NyaXB0LnJ1bl9hdCxcbiAgICAgICAgfSwgb3B0aW9ucyksXG4gICAgICAgIGV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICAgICAgdGFiSWQsXG4gICAgICAgICAgICBmcmFtZUlkLFxuICAgICAgICAgICAgYWxsRnJhbWVzLFxuICAgICAgICAgICAgZmlsZXM6IHNjcmlwdC5qcyA/PyBbXSxcbiAgICAgICAgICAgIG1hdGNoQWJvdXRCbGFuazogc2NyaXB0Lm1hdGNoQWJvdXRCbGFuayA/PyBzY3JpcHQubWF0Y2hfYWJvdXRfYmxhbmssXG4gICAgICAgICAgICBydW5BdDogc2NyaXB0LnJ1bkF0ID8/IHNjcmlwdC5ydW5fYXQsXG4gICAgICAgIH0sIG9wdGlvbnMpLFxuICAgIF0pO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKGluamVjdGlvbnMpO1xufVxuLy8gU291cmNlZCBmcm9tOlxuLy8gaHR0cHM6Ly9zb3VyY2UuY2hyb21pdW0ub3JnL2Nocm9taXVtL2Nocm9taXVtL3NyYy8rL21haW46ZXh0ZW5zaW9ucy9jb21tb24vZXh0ZW5zaW9uX3VybHMuY2M7ZHJjPTZiNDIxMTZmZTNiM2Q5M2E3Nzc1MGJkY2MwNzk0OGU5OGE3Mjg0MDU7bD0yOVxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Nb3ppbGxhL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9Db250ZW50X3NjcmlwdHNcbmNvbnN0IGJsb2NrZWRQcmVmaXhlcyA9IFtcbiAgICAnY2hyb21lLmdvb2dsZS5jb20vd2Vic3RvcmUnLCAvLyBIb3N0ICphbmQqIHBhdGhuYW1lXG4gICAgJ2Nocm9tZXdlYnN0b3JlLmdvb2dsZS5jb20nLFxuICAgICdhY2NvdW50cy1zdGF0aWMuY2RuLm1vemlsbGEubmV0JyxcbiAgICAnYWNjb3VudHMuZmlyZWZveC5jb20nLFxuICAgICdhZGRvbnMuY2RuLm1vemlsbGEubmV0JyxcbiAgICAnYWRkb25zLm1vemlsbGEub3JnJyxcbiAgICAnYXBpLmFjY291bnRzLmZpcmVmb3guY29tJyxcbiAgICAnY29udGVudC5jZG4ubW96aWxsYS5uZXQnLFxuICAgICdkaXNjb3ZlcnkuYWRkb25zLm1vemlsbGEub3JnJyxcbiAgICAnaW5wdXQubW96aWxsYS5vcmcnLFxuICAgICdpbnN0YWxsLm1vemlsbGEub3JnJyxcbiAgICAnb2F1dGguYWNjb3VudHMuZmlyZWZveC5jb20nLFxuICAgICdwcm9maWxlLmFjY291bnRzLmZpcmVmb3guY29tJyxcbiAgICAnc3VwcG9ydC5tb3ppbGxhLm9yZycsXG4gICAgJ3N5bmMuc2VydmljZXMubW96aWxsYS5jb20nLFxuICAgICd0ZXN0cGlsb3QuZmlyZWZveC5jb20nLFxuXTtcbmV4cG9ydCBmdW5jdGlvbiBpc1NjcmlwdGFibGVVcmwodXJsKSB7XG4gICAgaWYgKCF1cmw/LnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGNsZWFuVXJsID0gdXJsLnJlcGxhY2UoL15odHRwcz86XFwvXFwvLywgJycpO1xuICAgIHJldHVybiBibG9ja2VkUHJlZml4ZXMuZXZlcnkoYmxvY2tlZCA9PiAhY2xlYW5Vcmwuc3RhcnRzV2l0aChibG9ja2VkKSk7XG59XG5jb25zdCB0YXJnZXRFcnJvcnMgPSAvXk5vIGZyYW1lIHdpdGggaWQgXFxkKyBpbiB0YWIgXFxkKy4kfF5ObyB0YWIgd2l0aCBpZDogXFxkKy4kfF5UaGUgdGFiIHdhcyBjbG9zZWQuJHxeVGhlIGZyYW1lIHdhcyByZW1vdmVkLiQvO1xuYXN5bmMgZnVuY3Rpb24gY2F0Y2hUYXJnZXRJbmplY3Rpb25FcnJvcnMocHJvbWlzZSkge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIE9wdGlvbmFsIGNoYWluaW5nIGlzIGdvb2QgZW5vdWdoXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG4gICAgICAgIGlmICghdGFyZ2V0RXJyb3JzLnRlc3QoZXJyb3I/Lm1lc3NhZ2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIE5vdCBhbGwga2V5cyBhcmUgc3VwcG9ydGVkIGJ5IHRoZSBwb2x5ZmlsbCB0byBiZWdpbiB3aXRoXG4vLyBtYXRjaEFib3V0Qmxhbms6IGh0dHBzOi8vZ2l0aHViLmNvbS9mcmVnYW50ZS9jb250ZW50LXNjcmlwdHMtcmVnaXN0ZXItcG9seWZpbGwvaXNzdWVzLzJcbi8vICpHbG9iczogaHR0cHM6Ly9naXRodWIuY29tL2ZyZWdhbnRlL2NvbnRlbnQtc2NyaXB0cy1yZWdpc3Rlci1wb2x5ZmlsbC9pc3N1ZXMvMzVcbmZ1bmN0aW9uIGdldERpZmZlcmVudGlhdG9ycyhjKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFtjLmFsbF9mcmFtZXMsIGMuZXhjbHVkZV9tYXRjaGVzLCBjLnJ1bl9hdF0pO1xufVxuLyoqXG5FeGNsdWRlIHNhbWUtZmlsZSBpbmplY3Rpb25zIGZyb20gYSBtYW5pZmVzdCBgY29udGVudF9zY3JpcHRgIGFycmF5IGR1ZSB0byBhIGNoYW5nZSBpbiB0aGUgcG9seWZpbGwuXG5odHRwczovL2dpdGh1Yi5jb20vZnJlZ2FudGUvd2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHRzL2lzc3Vlcy82MlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBleGNsdWRlRHVwbGljYXRlRmlsZXMoY29udGVudFNjcmlwdHMsIHsgd2FybiA9IHRydWUgfSA9IHt9KSB7XG4gICAgY29uc3QgdW5pcXVlcyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBmaWx0ZXJXYXJuQW5kQWRkID0gKGZpbGVzLCBjb250ZXh0KSA9PiB7XG4gICAgICAgIGlmICghZmlsZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZXMuZmlsdGVyKGZpbGUgPT4ge1xuICAgICAgICAgICAgLy8gSWYgYSBjb250ZW50IHNjcmlwdCBoYXMgdGhlIHNhbWUgb3B0aW9ucywgdGhlbiBpdCdzIDEwMCUgZHVwbGljYXRlIGFuZCBzYWZlIHRvIHJlbW92ZS5cbiAgICAgICAgICAgIC8vIElmIGl0IGRvZXNuJ3QgaGF2ZSB0aGUgc2FtZSBvcHRpb25zLCB0aGVuIHJlbW92aW5nIGl0IGNhbiBjYXVzZSBpc3N1ZXMuXG4gICAgICAgICAgICBjb25zdCBkaWZmZXJlbnRpYXRvcnMgPSBnZXREaWZmZXJlbnRpYXRvcnMoY29udGV4dCk7XG4gICAgICAgICAgICAvLyBFeGNsdWRlIGZpbGVzIGZyb20gY3VycmVudCBzY3JpcHQgaWYgdGhleSB3ZXJlIGFscmVhZHkgaW5qZWN0ZWQgYnkgYW5vdGhlciBzY3JpcHRcbiAgICAgICAgICAgIGlmICh1bmlxdWVzLmhhcyhmaWxlKSkge1xuICAgICAgICAgICAgICAgIC8vIFdhcm4gdGhlIHVzZXIgaW4gY2FzZSB0aGlzIHJlbW92YWwgY2hhbmdlcyB0aGUgYmVoYXZpb3IgZnJvbSB3aGF0J3MgZXhwZWN0ZWRcbiAgICAgICAgICAgICAgICBpZiAod2FybiAmJiBkaWZmZXJlbnRpYXRvcnMgIT09IHVuaXF1ZXMuZ2V0KGZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRHVwbGljYXRlIGZpbGUgaW4gdGhlIG1hbmlmZXN0IGNvbnRlbnRfc2NyaXB0czogJHtmaWxlfSBcXG5Nb3JlIGluZm86IGh0dHBzOi8vZ2l0aHViLmNvbS9mcmVnYW50ZS93ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdHMvaXNzdWVzLzYyYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVuaXF1ZXMuc2V0KGZpbGUsIGRpZmZlcmVudGlhdG9ycyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gY29udGVudFNjcmlwdHMuZmxhdE1hcChjb250ZW50U2NyaXB0ID0+IHtcbiAgICAgICAgLy8gVG8gYXZvaWQgY29uZnVzaW9uLCBkcm9wIHRoZSBgbWF0Y2hlc2AgYXJyYXkgc2luY2UgaXQncyBub3QgdXNlZCBieSBgd2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHRzYFxuICAgICAgICBjb25zdCB7IG1hdGNoZXMsIC4uLmNsZWFuQ29udGVudFNjcmlwdCB9ID0gY29udGVudFNjcmlwdDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gKHtcbiAgICAgICAgICAgIC4uLmNsZWFuQ29udGVudFNjcmlwdCxcbiAgICAgICAgICAgIGpzOiBmaWx0ZXJXYXJuQW5kQWRkKGNvbnRlbnRTY3JpcHQuanMsIGNvbnRlbnRTY3JpcHQpLFxuICAgICAgICAgICAgY3NzOiBmaWx0ZXJXYXJuQW5kQWRkKGNvbnRlbnRTY3JpcHQuY3NzLCBjb250ZW50U2NyaXB0KSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIERyb3AgZW50aXJlIGJsb2NrIGlmIGNvbXBsZXRlIGR1cGxpY2F0ZSAodGhlIGBtYXRjaGVzYCBhcnJheSBjb3VsZCBiZSBkaWZmZXJlbnQsIGJ1dCB0aGF0IGRvZXNuJ3QgbWF0dGVyIGluIGB3ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdHNgKVxuICAgICAgICByZXR1cm4gcmVzdWx0LmNzcy5sZW5ndGggKyByZXN1bHQuanMubGVuZ3RoID09PSAwID8gW10gOiByZXN1bHQ7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBpbml0IH0gZnJvbSAnLi9saWIuanMnO1xudm9pZCBpbml0KCk7XG4iLCJpbXBvcnQgeyBnZXRUYWJzQnlVcmwsIGluamVjdENvbnRlbnRTY3JpcHQgfSBmcm9tICd3ZWJleHQtY29udGVudC1zY3JpcHRzJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbmplY3RUb0V4aXN0aW5nVGFicyhvcmlnaW5zLCBzY3JpcHRzKSB7XG4gICAgY29uc3QgZXhjbHVkZU1hdGNoZXMgPSBzY3JpcHRzLmZsYXRNYXAoc2NyaXB0ID0+IHNjcmlwdC5tYXRjaGVzID8/IFtdKTtcbiAgICByZXR1cm4gaW5qZWN0Q29udGVudFNjcmlwdChhd2FpdCBnZXRUYWJzQnlVcmwob3JpZ2lucywgZXhjbHVkZU1hdGNoZXMpLCBzY3JpcHRzLCB7IGlnbm9yZVRhcmdldEVycm9yczogdHJ1ZSB9KTtcbn1cbiIsImltcG9ydCB7IGdldEFkZGl0aW9uYWxQZXJtaXNzaW9ucyB9IGZyb20gJ3dlYmV4dC1hZGRpdGlvbmFsLXBlcm1pc3Npb25zJztcbmltcG9ydCB7IGV4Y2x1ZGVEdXBsaWNhdGVGaWxlcyB9IGZyb20gJy4vZGVkdXBsaWNhdG9yLmpzJztcbmltcG9ydCB7IGluamVjdFRvRXhpc3RpbmdUYWJzIH0gZnJvbSAnLi9pbmplY3QtdG8tZXhpc3RpbmctdGFicy5qcyc7XG5pbXBvcnQgeyByZWdpc3RlckNvbnRlbnRTY3JpcHQgfSBmcm9tICcuL3JlZ2lzdGVyLWNvbnRlbnQtc2NyaXB0LXNoaW0uanMnO1xuY29uc3QgcmVnaXN0ZXJlZFNjcmlwdHMgPSBuZXcgTWFwKCk7XG4vLyBJbiBGaXJlZm94LCBwYXRocyBpbiB0aGUgbWFuaWZlc3QgYXJlIGNvbnZlcnRlZCB0byBmdWxsIFVSTHMgdW5kZXIgYG1vei1leHRlbnNpb246Ly9gIGJ1dCBicm93c2VyLmNvbnRlbnRTY3JpcHRzIGV4cGVjdHMgZXhjbHVzaXZlbHkgcmVsYXRpdmUgcGF0aHNcbmZ1bmN0aW9uIG1ha2VQYXRoUmVsYXRpdmUoZmlsZSkge1xuICAgIHJldHVybiBuZXcgVVJMKGZpbGUsIGxvY2F0aW9uLm9yaWdpbikucGF0aG5hbWU7XG59XG4vLyBBdXRvbWF0aWNhbGx5IHJlZ2lzdGVyIHRoZSBjb250ZW50IHNjcmlwdHMgb24gdGhlIG5ldyBvcmlnaW5zXG5hc3luYyBmdW5jdGlvbiByZWdpc3Rlck9uT3JpZ2lucyh7IG9yaWdpbnM6IG5ld09yaWdpbnMsIH0pIHtcbiAgICBjb25zdCB7IGNvbnRlbnRfc2NyaXB0czogcmF3TWFuaWZlc3QsIG1hbmlmZXN0X3ZlcnNpb246IG1hbmlmZXN0VmVyc2lvbiB9ID0gY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKTtcbiAgICBpZiAoIXJhd01hbmlmZXN0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignd2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHRzIHRyaWVkIHRvIHJlZ2lzdGVyIHNjcmlwdHMgb24gdGhlIG5ldyBob3N0IHBlcm1pc3Npb25zLCBidXQgbm8gY29udGVudCBzY3JpcHRzIHdlcmUgZm91bmQgaW4gdGhlIG1hbmlmZXN0LicpO1xuICAgIH1cbiAgICBjb25zdCBjbGVhbk1hbmlmZXN0ID0gZXhjbHVkZUR1cGxpY2F0ZUZpbGVzKHJhd01hbmlmZXN0LCB7IHdhcm46IG1hbmlmZXN0VmVyc2lvbiA9PT0gMiB9KTtcbiAgICAvLyBSZWdpc3RlciBvbmUgYXQgYSB0aW1lIHRvIGFsbG93IHJlbW92aW5nIG9uZSBhdCBhIHRpbWUgYXMgd2VsbFxuICAgIGZvciAoY29uc3Qgb3JpZ2luIG9mIG5ld09yaWdpbnMgfHwgW10pIHtcbiAgICAgICAgZm9yIChjb25zdCBjb25maWcgb2YgY2xlYW5NYW5pZmVzdCkge1xuICAgICAgICAgICAgY29uc3QgcmVnaXN0ZXJlZFNjcmlwdCA9IHJlZ2lzdGVyQ29udGVudFNjcmlwdCh7XG4gICAgICAgICAgICAgICAgLy8gQWx3YXlzIGNvbnZlcnQgcGF0aHMgaGVyZSBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hldGhlciBGaXJlZm94IE1WMyB3aWxsIGFjY2VwdCBmdWxsIFVSTHNcbiAgICAgICAgICAgICAgICBqczogY29uZmlnLmpzPy5tYXAoZmlsZSA9PiBtYWtlUGF0aFJlbGF0aXZlKGZpbGUpKSxcbiAgICAgICAgICAgICAgICBjc3M6IGNvbmZpZy5jc3M/Lm1hcChmaWxlID0+IG1ha2VQYXRoUmVsYXRpdmUoZmlsZSkpLFxuICAgICAgICAgICAgICAgIGFsbEZyYW1lczogY29uZmlnLmFsbF9mcmFtZXMsXG4gICAgICAgICAgICAgICAgbWF0Y2hlczogW29yaWdpbl0sXG4gICAgICAgICAgICAgICAgZXhjbHVkZU1hdGNoZXM6IGNvbmZpZy5tYXRjaGVzLFxuICAgICAgICAgICAgICAgIHJ1bkF0OiBjb25maWcucnVuX2F0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWdpc3RlcmVkU2NyaXB0cy5zZXQob3JpZ2luLCByZWdpc3RlcmVkU2NyaXB0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBNYXkgbm90IGJlIG5lZWRlZCBpbiB0aGUgZnV0dXJlIGluIEZpcmVmb3hcbiAgICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDU4OTQ3XG4gICAgdm9pZCBpbmplY3RUb0V4aXN0aW5nVGFicyhuZXdPcmlnaW5zIHx8IFtdLCBjbGVhbk1hbmlmZXN0KTtcbn1cbmZ1bmN0aW9uIGhhbmRsZU5ld1Blcm1pc3Npb25zKHBlcm1pc3Npb25zKSB7XG4gICAgaWYgKHBlcm1pc3Npb25zLm9yaWdpbnMgJiYgcGVybWlzc2lvbnMub3JpZ2lucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZvaWQgcmVnaXN0ZXJPbk9yaWdpbnMocGVybWlzc2lvbnMpO1xuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZWREcm9wcGVkUGVybWlzc2lvbnMoeyBvcmlnaW5zIH0pIHtcbiAgICBpZiAoIW9yaWdpbnMgfHwgb3JpZ2lucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtvcmlnaW4sIHNjcmlwdFByb21pc2VdIG9mIHJlZ2lzdGVyZWRTY3JpcHRzKSB7XG4gICAgICAgIGlmIChvcmlnaW5zLmluY2x1ZGVzKG9yaWdpbikpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBhd2FpdCBzY3JpcHRQcm9taXNlO1xuICAgICAgICAgICAgdm9pZCBzY3JpcHQudW5yZWdpc3RlcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY2hyb21lLnBlcm1pc3Npb25zLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcihoYW5kbGVkRHJvcHBlZFBlcm1pc3Npb25zKTtcbiAgICBjaHJvbWUucGVybWlzc2lvbnMub25BZGRlZC5hZGRMaXN0ZW5lcihoYW5kbGVOZXdQZXJtaXNzaW9ucyk7XG4gICAgYXdhaXQgcmVnaXN0ZXJPbk9yaWdpbnMoYXdhaXQgZ2V0QWRkaXRpb25hbFBlcm1pc3Npb25zKHtcbiAgICAgICAgc3RyaWN0T3JpZ2luczogZmFsc2UsXG4gICAgfSkpO1xufVxuIiwiaW1wb3J0IHJlZ2lzdGVyQ29udGVudFNjcmlwdFBvbnlmaWxsIGZyb20gJ2NvbnRlbnQtc2NyaXB0cy1yZWdpc3Rlci1wb2x5ZmlsbC9wb255ZmlsbC5qcyc7XG5leHBvcnQgY29uc3QgY2hyb21lUmVnaXN0ZXIgPSBnbG9iYWxUaGlzLmNocm9tZT8uc2NyaXB0aW5nPy5yZWdpc3RlckNvbnRlbnRTY3JpcHRzO1xuZXhwb3J0IGNvbnN0IGZpcmVmb3hSZWdpc3RlciA9IGdsb2JhbFRoaXMuYnJvd3Nlcj8uY29udGVudFNjcmlwdHM/LnJlZ2lzdGVyO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyQ29udGVudFNjcmlwdChjb250ZW50U2NyaXB0KSB7XG4gICAgaWYgKGNocm9tZVJlZ2lzdGVyKSB7XG4gICAgICAgIGNvbnN0IGlkID0gJ3dlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0LScgKyBKU09OLnN0cmluZ2lmeShjb250ZW50U2NyaXB0KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGNocm9tZVJlZ2lzdGVyKFt7XG4gICAgICAgICAgICAgICAgICAgIC4uLmNvbnRlbnRTY3JpcHQsXG4gICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmICghZXJyb3I/Lm1lc3NhZ2Uuc3RhcnRzV2l0aCgnRHVwbGljYXRlIHNjcmlwdCBJRCcpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVucmVnaXN0ZXI6IGFzeW5jICgpID0+IGNocm9tZS5zY3JpcHRpbmcudW5yZWdpc3RlckNvbnRlbnRTY3JpcHRzKHsgaWRzOiBbaWRdIH0pLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBmaXJlZm94Q29udGVudFNjcmlwdCA9IHtcbiAgICAgICAgLi4uY29udGVudFNjcmlwdCxcbiAgICAgICAganM6IGNvbnRlbnRTY3JpcHQuanM/Lm1hcChmaWxlID0+ICh7IGZpbGUgfSkpLFxuICAgICAgICBjc3M6IGNvbnRlbnRTY3JpcHQuY3NzPy5tYXAoZmlsZSA9PiAoeyBmaWxlIH0pKSxcbiAgICB9O1xuICAgIGlmIChmaXJlZm94UmVnaXN0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGZpcmVmb3hSZWdpc3RlcihmaXJlZm94Q29udGVudFNjcmlwdCk7XG4gICAgfVxuICAgIHJldHVybiByZWdpc3RlckNvbnRlbnRTY3JpcHRQb255ZmlsbChmaXJlZm94Q29udGVudFNjcmlwdCk7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL29uLWNvbnRleHQtaW52YWxpZGF0ZWQuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9vbi1leHRlbnNpb24tc3RhcnQuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9vbmUtZXZlbnQuanMnO1xuIiwiY2xhc3MgT25Db250ZXh0SW52YWxpZGF0ZWQge1xuICAgICN0aW1lcjtcbiAgICAjY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAvLyBDYWxsaW5nIHRoaXMgd2lsbCBzdGFydCB0aGUgcG9sbGluZ1xuICAgIGdldCBzaWduYWwoKSB7XG4gICAgICAgIGlmICh0aGlzLiN0aW1lcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuI2NvbnRyb2xsZXIuc2lnbmFsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuI3RpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdhc0NvbnRleHRJbnZhbGlkYXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4jY29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy4jdGltZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDApO1xuICAgICAgICByZXR1cm4gdGhpcy4jY29udHJvbGxlci5zaWduYWw7XG4gICAgfVxuICAgIGdldCBwcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHJlc29sdmUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgICAgICAgICBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBjb250ZXh0IGlzIGludmFsaWRhdGVkXG4gICAgICogQHBhcmFtIG9wdGlvbnMuc2lnbmFsICAgVGhlIHNpZ25hbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyLCBsaWtlIHdpdGggdGhlIHJlZ3VsYXIgYGFkZEV2ZW50TGlzdGVuZXIoKWBcbiAgICAgKi9cbiAgICBhZGRMaXN0ZW5lcihjYWxsYmFjaywgeyBzaWduYWwgfSA9IHt9KSB7XG4gICAgICAgIGlmICh0aGlzLnNpZ25hbC5hYm9ydGVkICYmICFzaWduYWw/LmFib3J0ZWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgY2FsbGJhY2ssIHsgb25jZTogdHJ1ZSwgc2lnbmFsIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBvbkNvbnRleHRJbnZhbGlkYXRlZCA9IG5ldyBPbkNvbnRleHRJbnZhbGlkYXRlZCgpO1xuZXhwb3J0IGNvbnN0IHdhc0NvbnRleHRJbnZhbGlkYXRlZCA9ICgpID0+ICFjaHJvbWUucnVudGltZT8uaWQ7XG4vLyBUaGlzIGlzIGRvbmUgdG8gZW5zdXJlIGVhY2ggbGlzdGVuZXIgYW5kIGFib3J0c2lnbmFsIGFyZSBpbmRlcGVuZGVudCBpbiBlYWNoIHRlc3RcbmV4cG9ydCBjb25zdCBfdGVzdGluZyA9IE9uQ29udGV4dEludmFsaWRhdGVkO1xuIiwiaW1wb3J0IHsgaXNDaHJvbWUsIGlzUGVyc2lzdGVudEJhY2tncm91bmRQYWdlIH0gZnJvbSAnd2ViZXh0LWRldGVjdC1wYWdlJztcbmNvbnN0IHN0b3JhZ2VLZXkgPSAnX193ZWJleHQtZXZlbnRzX19zdGFydHVwJztcbmNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50VGFyZ2V0KCk7XG5sZXQgaGFzUnVuID0gZmFsc2U7XG5sZXQgaGFzTGlzdGVuZXJzID0gZmFsc2U7XG4vLyBAdHMtZXhwZWN0LWVycm9yIE5vIG5lZWQgdG8gbG9hZCBgYnJvd3NlcmAgdHlwZXMgeWV0XG5jb25zdCBicm93c2VyU3RvcmFnZSA9IGdsb2JhbFRoaXMuYnJvd3Nlcj8uc3RvcmFnZSA/PyBnbG9iYWxUaGlzLmNocm9tZT8uc3RvcmFnZTtcbmFzeW5jIGZ1bmN0aW9uIHJ1bm5lcigpIHtcbiAgICBoYXNSdW4gPSB0cnVlO1xuICAgIGlmICghaGFzTGlzdGVuZXJzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzUGVyc2lzdGVudEJhY2tncm91bmRQYWdlKCkpIHtcbiAgICAgICAgLy8gSXQncyBjZXJ0YWlubHkgdGhlIGZpcnN0IGFuZCBvbmx5IHRpbWVcbiAgICAgICAgZXZlbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2V4dGVuc2lvbi1zdGFydCcpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWJyb3dzZXJTdG9yYWdlPy5zZXNzaW9uKSB7XG4gICAgICAgIGlmIChpc0Nocm9tZSgpICYmIGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubWFuaWZlc3RfdmVyc2lvbiA9PT0gMikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdvbkV4dGVuc2lvblN0YXJ0IGlzIHVuYWJsZSB0byBkZXRlcm1pbmUgd2hldGhlciBpdOKAmXMgYmVpbmcgcnVuIGZvciB0aGUgZmlyc3QgdGltZSBvbiBNVjIgRXZlbnQgUGFnZXMgaW4gQ2hyb21lLiBJdCB3aWxsIHJ1biB0aGUgbGlzdGVuZXJzIGFueXdheS4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybignb25FeHRlbnNpb25TdGFydCBpcyB1bmFibGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgaXTigJlzIGJlaW5nIHJ1biBmb3IgdGhlIGZpcnN0IHRpbWUgd2l0aG91dCB0aGUgYHN0b3JhZ2VgIHBlcm1pc3Npb24uIEl0IHdpbGwgcnVuIHRoZSBsaXN0ZW5lcnMgYW55d2F5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2V4dGVuc2lvbi1zdGFydCcpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdG9yYWdlID0gYXdhaXQgYnJvd3NlclN0b3JhZ2Uuc2Vzc2lvbi5nZXQoc3RvcmFnZUtleSk7XG4gICAgaWYgKHN0b3JhZ2VLZXkgaW4gc3RvcmFnZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IGJyb3dzZXJTdG9yYWdlLnNlc3Npb24uc2V0KHsgW3N0b3JhZ2VLZXldOiB0cnVlIH0pO1xuICAgIGV2ZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdleHRlbnNpb24tc3RhcnQnKSk7XG59XG5leHBvcnQgY29uc3Qgb25FeHRlbnNpb25TdGFydCA9IE9iamVjdC5mcmVlemUoe1xuICAgIGFkZExpc3RlbmVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChoYXNSdW4pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybignb25FeHRlbnNpb25TdGFydC5hZGRMaXN0ZW5lcigpIHdhcyBjYWxsZWQgYWZ0ZXIgdGhlIGV4dGVuc2lvbiBzdGFydGVkLiBUaGUgY2FsbGJhY2sgd2lsbCBub3QgYmUgY2FsbGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFzTGlzdGVuZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgIGV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2V4dGVuc2lvbi1zdGFydCcsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlTGlzdGVuZXIoY2FsbGJhY2spIHtcbiAgICAgICAgZXZlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXh0ZW5zaW9uLXN0YXJ0JywgY2FsbGJhY2spO1xuICAgIH0sXG59KTtcbi8vIEF1dG9tYXRpY2FsbHkgcmVnaXN0ZXIgdGhlIHJ1bm5lclxuc2V0VGltZW91dChydW5uZXIsIDEwMCk7XG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gb25lRXZlbnQoZXZlbnQsIGZpbHRlcikge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAvLyBUT0RPOiBWb2lkRnVuY3Rpb24gc2hvdWxkIG5vdCBiZSBuZWNlc3NhcnksIGl0J3MgZXF1aXZhbGVudCB0byB1c2luZyBcImFueVwiXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gKC4uLnBhcmFtZXRlcnMpID0+IHtcbiAgICAgICAgICAgIGlmICghZmlsdGVyIHx8IGZpbHRlciguLi5wYXJhbWV0ZXJzKSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBldmVudC5yZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9KTtcbn1cbiIsImxldCBjYWNoZSA9IHRydWU7XG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVdlYmV4dERldGVjdFBhZ2VDYWNoZSgpIHtcbiAgICBjYWNoZSA9IGZhbHNlO1xufVxuZnVuY3Rpb24gaXNDdXJyZW50UGF0aG5hbWUocGF0aCkge1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IG5ldyBVUkwocGF0aCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICAgICAgcmV0dXJuIHBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TWFuaWZlc3QoX3ZlcnNpb24pIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcy5jaHJvbWU/LnJ1bnRpbWU/LmdldE1hbmlmZXN0Py4oKTtcbn1cbmZ1bmN0aW9uIG9uY2UoZnVuY3Rpb25fKSB7XG4gICAgbGV0IHJlc3VsdDtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoIWNhY2hlIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmdW5jdGlvbl8oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIG9uIGh0dHAocyk6Ly8gcGFnZXMgKGl0IGNvdWxkIGJlIGluIGEgY29udGVudCBzY3JpcHQgb3IgcmVndWxhciB3ZWIgY29udGV4dCkgKi9cbmV4cG9ydCBjb25zdCBpc1dlYlBhZ2UgPSBvbmNlKCgpID0+IFsnYWJvdXQ6JywgJ2h0dHA6JywgJ2h0dHBzOiddLmluY2x1ZGVzKGxvY2F0aW9uLnByb3RvY29sKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGV4dGVuc2lvbiBjb250ZXh0cyB0aGF0IGhhdmUgYWNjZXNzIHRvIHRoZSBjaHJvbWUgQVBJICovXG5leHBvcnQgY29uc3QgaXNFeHRlbnNpb25Db250ZXh0ID0gb25jZSgoKSA9PiB0eXBlb2YgZ2xvYmFsVGhpcy5jaHJvbWU/LmV4dGVuc2lvbiA9PT0gJ29iamVjdCcpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGNvbnRlbnQgc2NyaXB0ICovXG5leHBvcnQgY29uc3QgaXNDb250ZW50U2NyaXB0ID0gb25jZSgoKSA9PiBpc0V4dGVuc2lvbkNvbnRleHQoKSAmJiBpc1dlYlBhZ2UoKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgYmFja2dyb3VuZCBjb250ZXh0ICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kID0gKCkgPT4gaXNCYWNrZ3JvdW5kUGFnZSgpIHx8IGlzQmFja2dyb3VuZFdvcmtlcigpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgcGFnZSAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZFBhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBjb25zdCBtYW5pZmVzdCA9IGdldE1hbmlmZXN0KDIpO1xuICAgIGlmIChtYW5pZmVzdFxuICAgICAgICAmJiBpc0N1cnJlbnRQYXRobmFtZShtYW5pZmVzdC5iYWNrZ3JvdW5kX3BhZ2UgPz8gbWFuaWZlc3QuYmFja2dyb3VuZD8ucGFnZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBCb29sZWFuKG1hbmlmZXN0Py5iYWNrZ3JvdW5kPy5zY3JpcHRzXG4gICAgICAgICYmIGlzQ3VycmVudFBhdGhuYW1lKCcvX2dlbmVyYXRlZF9iYWNrZ3JvdW5kX3BhZ2UuaHRtbCcpKTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgd29ya2VyICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kV29ya2VyID0gb25jZSgoKSA9PiBpc0N1cnJlbnRQYXRobmFtZShnZXRNYW5pZmVzdCgzKT8uYmFja2dyb3VuZD8uc2VydmljZV93b3JrZXIpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBwZXJzaXN0ZW50IGJhY2tncm91bmQgcGFnZSAoYXMgb3Bwb3NlZCB0byBhbiBFdmVudCBQYWdlIG9yIEJhY2tncm91bmQgV29ya2VyLCBib3RoIG9mIHdoaWNoIGNhbiBiZSB1bmxvYWRlZCBieSB0aGUgYnJvd3NlcikgKi9cbmV4cG9ydCBjb25zdCBpc1BlcnNpc3RlbnRCYWNrZ3JvdW5kUGFnZSA9IG9uY2UoKCkgPT4gaXNCYWNrZ3JvdW5kUGFnZSgpXG4gICAgJiYgZ2V0TWFuaWZlc3QoMik/Lm1hbmlmZXN0X3ZlcnNpb24gPT09IDIgLy8gRmlyZWZveCBjYW4gaGF2ZSBhIGJhY2tncm91bmQgcGFnZSBvbiBNVjMsIGJ1dCBjYW4ndCBiZSBwZXJzaXN0ZW50XG4gICAgJiYgZ2V0TWFuaWZlc3QoMik/LmJhY2tncm91bmQ/LnBlcnNpc3RlbnQgIT09IGZhbHNlKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYW4gb3B0aW9ucyBwYWdlLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCAqL1xuZXhwb3J0IGNvbnN0IGlzT3B0aW9uc1BhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBjb25zdCBwYXRoID0gZ2V0TWFuaWZlc3QoKT8ub3B0aW9uc191aT8ucGFnZTtcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGFuIG9wdGlvbnMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgKi9cbmV4cG9ydCBjb25zdCBpc1NpZGVQYW5lbCA9IG9uY2UoKCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnQgLS0gTm90IHlldCBpbiBAdHlwZXMvY2hyb21lXG4gICAgY29uc3QgcGF0aCA9IGdldE1hbmlmZXN0KDMpPy5bJ3NpZGVfcGFuZWwnXT8uZGVmYXVsdF9wYXRoO1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBkZXYgdG9vbHMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgYGRldnRvb2xzX3BhZ2VgIGZpZWxkLiAqL1xuZXhwb3J0IGNvbnN0IGlzRGV2VG9vbHNQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgY29uc3QgZGV2dG9vbHNQYWdlID0gaXNFeHRlbnNpb25Db250ZXh0KCkgJiYgY2hyb21lLmRldnRvb2xzICYmIGdldE1hbmlmZXN0KCk/LmRldnRvb2xzX3BhZ2U7XG4gICAgaWYgKHR5cGVvZiBkZXZ0b29sc1BhZ2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChkZXZ0b29sc1BhZ2UsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gdGhlIGRldiB0b29scyBwYWdlLiBVbmxpa2UgYGlzRGV2VG9vbHNQYWdlYCwgdGhpcyB3b3JrcyBpbiBhbnkgcGFnZSB0aGF0IGhhcyB0aGUgYGNocm9tZS5kZXZUb29sc2AgQVBJICovXG5leHBvcnQgY29uc3QgaXNEZXZUb29scyA9ICgpID0+IEJvb2xlYW4oZ2xvYmFsVGhpcy5jaHJvbWU/LmRldnRvb2xzKTtcbi8qKiBMb29zZWx5IGRldGVjdCBGaXJlZm94IHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNGaXJlZm94ID0gKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnRmlyZWZveCcpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IENocm9tZSB2aWEgdXNlciBhZ2VudCAobWlnaHQgYWxzbyBpbmNsdWRlIENocm9taXVtIGFuZCBmb3JrcyBsaWtlIE9wZXJhKSAqL1xuZXhwb3J0IGNvbnN0IGlzQ2hyb21lID0gKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnQ2hyb21lJyk7XG4vKiogTG9vc2VseSBkZXRlY3QgU2FmYXJpIHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNTYWZhcmkgPSAoKSA9PiAhaXNDaHJvbWUoKSAmJiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdTYWZhcmknKTtcbi8qKiBMb29zZWx5IGRldGVjdCBNb2JpbGUgU2FmYXJpIHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNNb2JpbGVTYWZhcmkgPSAoKSA9PiBpc1NhZmFyaSgpICYmIGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ01vYmlsZScpO1xuY29uc3QgY29udGV4dENoZWNrcyA9IHtcbiAgICBjb250ZW50U2NyaXB0OiBpc0NvbnRlbnRTY3JpcHQsXG4gICAgYmFja2dyb3VuZDogaXNCYWNrZ3JvdW5kLFxuICAgIG9wdGlvbnM6IGlzT3B0aW9uc1BhZ2UsXG4gICAgc2lkZVBhbmVsOiBpc1NpZGVQYW5lbCxcbiAgICBkZXZUb29sczogaXNEZXZUb29scyxcbiAgICBkZXZUb29sc1BhZ2U6IGlzRGV2VG9vbHNQYWdlLFxuICAgIGV4dGVuc2lvbjogaXNFeHRlbnNpb25Db250ZXh0LFxuICAgIHdlYjogaXNXZWJQYWdlLFxufTtcbmV4cG9ydCBjb25zdCBjb250ZXh0TmFtZXMgPSBPYmplY3Qua2V5cyhjb250ZXh0Q2hlY2tzKTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZXh0TmFtZSgpIHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB0ZXN0XSBvZiBPYmplY3QuZW50cmllcyhjb250ZXh0Q2hlY2tzKSkge1xuICAgICAgICBpZiAodGVzdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJ3Vua25vd24nO1xufVxuIiwiaW1wb3J0IGVzY2FwZVN0cmluZ1JlZ2V4cCBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XG4vLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9nZWNrby1kZXYvYmxvYi8wNzNjYzI0ZjUzZDBjZjMxNDAzMTIxZDc2ODgxMjE0NmU1OTdjYzlkL3Rvb2xraXQvY29tcG9uZW50cy9leHRlbnNpb25zL3NjaGVtYXMvbWFuaWZlc3QuanNvbiNMNDg3LUw0OTFcbmV4cG9ydCBjb25zdCBwYXR0ZXJuVmFsaWRhdGlvblJlZ2V4ID0gL14oaHR0cHM/fHdzcz98ZmlsZXxmdHB8XFwqKTpcXC9cXC8oXFwqfFxcKlxcLlteKi9dK3xbXiovXSspXFwvLiokfF5maWxlOlxcL1xcL1xcLy4qJHxecmVzb3VyY2U6XFwvXFwvKFxcKnxcXCpcXC5bXiovXSt8W14qL10rKVxcLy4qJHxeYWJvdXQ6LztcbmNvbnN0IGlzRmlyZWZveCA9IGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ0ZpcmVmb3gvJyk7XG5leHBvcnQgY29uc3QgYWxsU3RhcnNSZWdleCA9IGlzRmlyZWZveFxuICAgID8gL14oaHR0cHM/fHdzcz8pOlsvXVsvXVteL10rKFsvXS4qKT8kL1xuICAgIDogL15odHRwcz86Wy9dWy9dW14vXSsoWy9dLiopPyQvO1xuZXhwb3J0IGNvbnN0IGFsbFVybHNSZWdleCA9IC9eKGh0dHBzP3xmaWxlfGZ0cCk6Wy9dKy87XG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0VmFsaWRQYXR0ZXJuKG1hdGNoUGF0dGVybikge1xuICAgIGlmICghaXNWYWxpZFBhdHRlcm4obWF0Y2hQYXR0ZXJuKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWF0Y2hQYXR0ZXJuICsgJyBpcyBhbiBpbnZhbGlkIHBhdHRlcm4sIGl0IG11c3QgbWF0Y2ggJyArIFN0cmluZyhwYXR0ZXJuVmFsaWRhdGlvblJlZ2V4KSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRQYXR0ZXJuKG1hdGNoUGF0dGVybikge1xuICAgIHJldHVybiBtYXRjaFBhdHRlcm4gPT09ICc8YWxsX3VybHM+JyB8fCBwYXR0ZXJuVmFsaWRhdGlvblJlZ2V4LnRlc3QobWF0Y2hQYXR0ZXJuKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkb2VzVXJsTWF0Y2hQYXR0ZXJucyh1cmwsIC4uLm1hdGNoUGF0dGVybikge1xuICAgIGlmIChtYXRjaFBhdHRlcm4uaW5jbHVkZXMoJzxhbGxfdXJscz4nKSAmJiBhbGxVcmxzUmVnZXgudGVzdCh1cmwpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAobWF0Y2hQYXR0ZXJuLmluY2x1ZGVzKCcqOi8vKi8qJykgJiYgYWxsU3RhcnNSZWdleC50ZXN0KHVybCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcGF0dGVybiBvZiBtYXRjaFBhdHRlcm4pIHtcbiAgICAgICAgaWYgKHBhdHRlcm5Ub1JlZ2V4KHBhdHRlcm4pLnRlc3QodXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gZ2V0UmF3UGF0dGVyblJlZ2V4KG1hdGNoUGF0dGVybikge1xuICAgIGFzc2VydFZhbGlkUGF0dGVybihtYXRjaFBhdHRlcm4pO1xuICAgIC8vIEhvc3QgdW5kZWZpbmVkIGZvciBmaWxlOi8vL1xuICAgIGxldCBbLCBwcm90b2NvbCwgaG9zdCA9ICcnLCBwYXRobmFtZV0gPSBtYXRjaFBhdHRlcm4uc3BsaXQoLyheW146XSs6Wy9dWy9dKShbXi9dKyk/Lyk7XG4gICAgcHJvdG9jb2wgPSBwcm90b2NvbFxuICAgICAgICAucmVwbGFjZSgnKicsIGlzRmlyZWZveCA/ICcoaHR0cHM/fHdzcz8pJyA6ICdodHRwcz8nKSAvLyBQcm90b2NvbCB3aWxkY2FyZFxuICAgICAgICAucmVwbGFjZUFsbCgvWy9dL2csICdbL10nKTsgLy8gRXNjYXBlIHNsYXNoZXNcbiAgICBpZiAoaG9zdCA9PT0gJyonKSB7XG4gICAgICAgIGhvc3QgPSAnW14vXSsnO1xuICAgIH1cbiAgICBlbHNlIGlmIChob3N0KSB7XG4gICAgICAgIGhvc3QgPSBob3N0XG4gICAgICAgICAgICAucmVwbGFjZSgvXlsqXVsuXS8sICcoW14vXSsuKSonKSAvLyBJbml0aWFsIHdpbGRjYXJkXG4gICAgICAgICAgICAucmVwbGFjZUFsbCgvWy5dL2csICdbLl0nKSAvLyBFc2NhcGUgZG90c1xuICAgICAgICAgICAgLnJlcGxhY2UoL1sqXSQvLCAnW14uXSsnKTsgLy8gTGFzdCB3aWxkY2FyZFxuICAgIH1cbiAgICBwYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgICAgIC5yZXBsYWNlQWxsKC9bL10vZywgJ1svXScpIC8vIEVzY2FwZSBzbGFzaGVzXG4gICAgICAgIC5yZXBsYWNlQWxsKC9bLl0vZywgJ1suXScpIC8vIEVzY2FwZSBkb3RzXG4gICAgICAgIC5yZXBsYWNlQWxsKC9bKl0vZywgJy4qJyk7IC8vIEFueSB3aWxkY2FyZFxuICAgIHJldHVybiAnXicgKyBwcm90b2NvbCArIGhvc3QgKyAnKCcgKyBwYXRobmFtZSArICcpPyQnO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhdHRlcm5Ub1JlZ2V4KC4uLm1hdGNoUGF0dGVybnMpIHtcbiAgICAvLyBObyBwYXR0ZXJuLCBtYXRjaCBub3RoaW5nIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcS8xNDExNTUyMi8yODg5MDZcbiAgICBpZiAobWF0Y2hQYXR0ZXJucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIC8kLi87XG4gICAgfVxuICAgIGlmIChtYXRjaFBhdHRlcm5zLmluY2x1ZGVzKCc8YWxsX3VybHM+JykpIHtcbiAgICAgICAgcmV0dXJuIGFsbFVybHNSZWdleDtcbiAgICB9XG4gICAgaWYgKG1hdGNoUGF0dGVybnMuaW5jbHVkZXMoJyo6Ly8qLyonKSkge1xuICAgICAgICByZXR1cm4gYWxsU3RhcnNSZWdleDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAobWF0Y2hQYXR0ZXJucy5tYXAoeCA9PiBnZXRSYXdQYXR0ZXJuUmVnZXgoeCkpLmpvaW4oJ3wnKSk7XG59XG4vLyBUaGUgcGFyZW5zIGFyZSByZXF1aXJlZCBieSAuc3BsaXQoKSB0byBwcmVzZXJ2ZSB0aGUgc3ltYm9sc1xuY29uc3QgZ2xvYlN5bWJvbHMgPSAvKFs/Kl0rKS87XG5mdW5jdGlvbiBzcGxpdFJlcGxhY2UocGFydCwgaW5kZXgpIHtcbiAgICBpZiAocGFydCA9PT0gJycpIHtcbiAgICAgICAgLy8gU2hvcnRjdXQgZm9yIHNwZWVkXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGluZGV4ICUgMiA9PT0gMCkge1xuICAgICAgICAvLyBSYXcgdGV4dCwgZXNjYXBlIGl0XG4gICAgICAgIHJldHVybiBlc2NhcGVTdHJpbmdSZWdleHAocGFydCk7XG4gICAgfVxuICAgIC8vIEVsc2U6IFN5bWJvbFxuICAgIGlmIChwYXJ0LmluY2x1ZGVzKCcqJykpIHsgLy8gQ2FuIGJlIG1vcmUgdGhhbiBvbmUgYW5kIGl0IHN3YWxsb3dzIHN1cnJvdW5kaW5nIHF1ZXN0aW9uIG1hcmtzXG4gICAgICAgIHJldHVybiAnLionO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLnBhcnRdLm1hcCgoKSA9PiBpc0ZpcmVmb3ggPyAnLicgOiAnLj8nKS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uIGdldFJhd0dsb2JSZWdleChnbG9iKSB7XG4gICAgY29uc3QgcmVnZXhTdHJpbmcgPSBnbG9iXG4gICAgICAgIC5zcGxpdChnbG9iU3ltYm9scylcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vbm8tYXJyYXktY2FsbGJhY2stcmVmZXJlbmNlIC0tIHRpcyBvayDwn6SrXG4gICAgICAgIC5tYXAoc3BsaXRSZXBsYWNlKVxuICAgICAgICAuam9pbignJyk7XG4gICAgLy8gRHJvcCBcInN0YXJ0IHdpdGggYW55dGhpbmdcIiBhbmQgXCJlbmQgd2l0aCBhbnl0aGluZ1wiIHNlcXVlbmNlcyBiZWNhdXNlIHRoZXkncmUgdGhlIGRlZmF1bHQgZm9yIHJlZ2V4XG4gICAgcmV0dXJuICgnXicgKyByZWdleFN0cmluZyArICckJylcbiAgICAgICAgLnJlcGxhY2UoL15bLl1bKl0vLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1suXVsqXSQvLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL15bJF0kLywgJy4rJyk7IC8vIENhdGNoIGAqYCBhbmQgYCpgXG59XG5leHBvcnQgZnVuY3Rpb24gZ2xvYlRvUmVnZXgoLi4uZ2xvYnMpIHtcbiAgICAvLyBObyBnbG9iLCBtYXRjaCBhbnl0aGluZzsgYGluY2x1ZGVfZ2xvYnM6IFtdYCBpcyB0aGUgZGVmYXVsdFxuICAgIGlmIChnbG9icy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIC8uKi87XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVnRXhwKGdsb2JzLm1hcCh4ID0+IGdldFJhd0dsb2JSZWdleCh4KSkuam9pbignfCcpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBleGNsdWRlRHVwbGljYXRlUGF0dGVybnMobWF0Y2hQYXR0ZXJucykge1xuICAgIGlmIChtYXRjaFBhdHRlcm5zLmluY2x1ZGVzKCc8YWxsX3VybHM+JykpIHtcbiAgICAgICAgcmV0dXJuIFsnPGFsbF91cmxzPiddO1xuICAgIH1cbiAgICBpZiAobWF0Y2hQYXR0ZXJucy5pbmNsdWRlcygnKjovLyovKicpKSB7XG4gICAgICAgIHJldHVybiBbJyo6Ly8qLyonXTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoUGF0dGVybnMuZmlsdGVyKHBvc3NpYmxlU3Vic2V0ID0+ICFtYXRjaFBhdHRlcm5zLnNvbWUocG9zc2libGVTdXBlcnNldCA9PiBwb3NzaWJsZVN1YnNldCAhPT0gcG9zc2libGVTdXBlcnNldCAmJiBwYXR0ZXJuVG9SZWdleChwb3NzaWJsZVN1cGVyc2V0KS50ZXN0KHBvc3NpYmxlU3Vic2V0KSkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlU3RyaW5nUmVnZXhwKHN0cmluZykge1xuXHRpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0Ly8gRXNjYXBlIGNoYXJhY3RlcnMgd2l0aCBzcGVjaWFsIG1lYW5pbmcgZWl0aGVyIGluc2lkZSBvciBvdXRzaWRlIGNoYXJhY3RlciBzZXRzLlxuXHQvLyBVc2UgYSBzaW1wbGUgYmFja3NsYXNoIGVzY2FwZSB3aGVuIGl04oCZcyBhbHdheXMgdmFsaWQsIGFuZCBhIGBcXHhubmAgZXNjYXBlIHdoZW4gdGhlIHNpbXBsZXIgZm9ybSB3b3VsZCBiZSBkaXNhbGxvd2VkIGJ5IFVuaWNvZGUgcGF0dGVybnPigJkgc3RyaWN0ZXIgZ3JhbW1hci5cblx0cmV0dXJuIHN0cmluZ1xuXHRcdC5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKyo/Ll0vZywgJ1xcXFwkJicpXG5cdFx0LnJlcGxhY2UoLy0vZywgJ1xcXFx4MmQnKTtcbn1cbiIsImltcG9ydCBjaHJvbWVQcm9taXNlZCBmcm9tICd3ZWJleHQtcG9seWZpbGwta2luZGEnO1xuaW1wb3J0IHsgaXNCYWNrZ3JvdW5kLCBpc0Nocm9tZSB9IGZyb20gJ3dlYmV4dC1kZXRlY3QtcGFnZSc7XG5pbXBvcnQgeyBpc1VybFBlcm1pdHRlZEJ5TWFuaWZlc3QgfSBmcm9tICd3ZWJleHQtcGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgZ2V0VGFiVXJsIH0gZnJvbSAnd2ViZXh0LXRvb2xzJztcbmltcG9ydCBhbGVydCBmcm9tICd3ZWJleHQtYWxlcnQnO1xuaW1wb3J0IHsgZXhlY3V0ZUZ1bmN0aW9uLCBpc1NjcmlwdGFibGVVcmwgfSBmcm9tICd3ZWJleHQtY29udGVudC1zY3JpcHRzJztcbmNvbnN0IGNvbnRleHRNZW51SWQgPSAnd2ViZXh0LXBlcm1pc3Npb24tdG9nZ2xlOmFkZC1wZXJtaXNzaW9uJztcbmxldCBnbG9iYWxPcHRpb25zO1xuY29uc3QgY2hyb21lUCA9IGlzQ2hyb21lKCkgJiYgZ2xvYmFsVGhpcy5jaHJvbWU/LnJ1bnRpbWU/LmdldE1hbmlmZXN0KCkubWFuaWZlc3RfdmVyc2lvbiA8IDNcbiAgICA/IGNocm9tZVByb21pc2VkXG4gICAgOiBjaHJvbWU7XG5mdW5jdGlvbiBhc3NlcnRUYWIodGFiKSB7XG4gICAgaWYgKCF0YWI/LmlkKSB7XG4gICAgICAgIC8vIERvbid0IHVzZSBub24tQVNDSUkgY2hhcmFjdGVycyBiZWNhdXNlIFNhZmFyaSBicmVha3MgdGhlIGVuY29kaW5nIGluIGV4ZWN1dGVTY3JpcHQuY29kZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBicm93c2VyIGRpZG5cXCd0IHN1cHBseSBhbnkgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGFjdGl2ZSB0YWIuJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0VXJsKHVybCkge1xuICAgIGlmICghdXJsKSB7XG4gICAgICAgIC8vIERvbid0IHVzZSBub24tQVNDSUkgY2hhcmFjdGVycyBiZWNhdXNlIFNhZmFyaSBicmVha3MgdGhlIGVuY29kaW5nIGluIGV4ZWN1dGVTY3JpcHQuY29kZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBicm93c2VyIGRpZG5cXCd0IHN1cHBseSB0aGUgY3VycmVudCBwYWdlXFwncyBVUkwuJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0U2NyaXB0YWJsZVVybCh1cmwpIHtcbiAgICBpZiAoIWlzU2NyaXB0YWJsZVVybCh1cmwpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLm5hbWUgKyAnIGNhblxcJ3QgYmUgZW5hYmxlZCBvbiB0aGlzIHBhZ2UuJyk7XG4gICAgfVxufVxuYXN5bmMgZnVuY3Rpb24gaXNPcmlnaW5QZXJtYW5lbnRseUFsbG93ZWQob3JpZ2luKSB7XG4gICAgcmV0dXJuIGNocm9tZVAucGVybWlzc2lvbnMuY29udGFpbnMoe1xuICAgICAgICBvcmlnaW5zOiBbb3JpZ2luICsgJy8qJ10sXG4gICAgfSk7XG59XG5mdW5jdGlvbiB1cGRhdGVJdGVtUmF3KHsgY2hlY2tlZCwgZW5hYmxlZCB9KSB7XG4gICAgY2hyb21lLmNvbnRleHRNZW51cy51cGRhdGUoY29udGV4dE1lbnVJZCwge1xuICAgICAgICBjaGVja2VkLFxuICAgICAgICBlbmFibGVkLFxuICAgIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlSXRlbSh1cmwpIHtcbiAgICBpZiAoIXVybCkge1xuICAgICAgICAvLyBObyBVUkwgbWVhbnMgbm8gYWN0aXZlVGFiLCBubyBtYW5pZmVzdCBwZXJtaXNzaW9uLCBubyBncmFudGVkIHBlcm1pc3Npb24sIE9SIG5vIHBlcm1pc3Npb24gcG9zc2libGUgKGNocm9tZTovLylcbiAgICAgICAgLy8gU2luY2Ugd2UgY2FuJ3QgZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIHRoZXNlIGNhc2VzLCB3ZSBjYW4ndCBkaXNhYmxlIHRoZSB0b2dnbGVcbiAgICAgICAgdXBkYXRlSXRlbVJhdyh7XG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc1NjcmlwdGFibGVVcmwodXJsKSkge1xuICAgICAgICBjb25zdCB7IG9yaWdpbiB9ID0gbmV3IFVSTCh1cmwpO1xuICAgICAgICAvLyBNYW5pZmVzdCBwZXJtaXNzaW9ucyBjYW4ndCBiZSByZW1vdmVkOyB0aGlzIGRpc2FibGVzIHRoZSB0b2dnbGUgb24gdGhvc2UgZG9tYWluc1xuICAgICAgICBjb25zdCBpc0RlZmF1bHQgPSBpc1VybFBlcm1pdHRlZEJ5TWFuaWZlc3QodXJsKTtcbiAgICAgICAgdXBkYXRlSXRlbVJhdyh7XG4gICAgICAgICAgICBlbmFibGVkOiAhaXNEZWZhdWx0LFxuICAgICAgICAgICAgLy8gV2UgbWlnaHQgaGF2ZSB0ZW1wb3JhcnkgcGVybWlzc2lvbiBhcyBwYXJ0IG9mIGBhY3RpdmVUYWJgLCBzbyBpdCBuZWVkcyB0byBiZSBwcm9wZXJseSBjaGVja2VkXG4gICAgICAgICAgICBjaGVja2VkOiBpc0RlZmF1bHQgfHwgYXdhaXQgaXNPcmlnaW5QZXJtYW5lbnRseUFsbG93ZWQob3JpZ2luKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gV2Uga25vdyB0aGUgVVJMLCBhbmQgd2Uga25vdyBpdCdzIG5vdCBzY3JpcHRhYmxlIChhYm91dDpibGFuaywgY2hyb21lOi8vLCBldGMuKVxuICAgIHVwZGF0ZUl0ZW1SYXcoe1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgfSk7XG59XG4vKipcbiAqIFJlcXVlc3RzIG9yIHJlbW92ZXMgdGhlIGhvc3QgcGVybWlzc2lvbiBmb3IgdGhlIHNwZWNpZmllZCB0YWJcbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIHBlcm1pc3Npb24gZXhpc3RzIGFmdGVyIHRoZSByZXF1ZXN0L3JlbW92YWxcbiAqL1xuYXN5bmMgZnVuY3Rpb24gc2V0UGVybWlzc2lvbih1cmwsIHJlcXVlc3QpIHtcbiAgICAvLyBUT0RPOiBFbnN1cmUgdGhhdCBVUkwgaXMgaW4gYG9wdGlvbmFsX3Blcm1pc3Npb25zYFxuICAgIC8vIFRPRE86IGh0dHBzOi8vZ2l0aHViLmNvbS9mcmVnYW50ZS93ZWJleHQtcGVybWlzc2lvbi10b2dnbGUvaXNzdWVzLzM3XG4gICAgY29uc3QgcGVybWlzc2lvbkRhdGEgPSB7XG4gICAgICAgIG9yaWdpbnM6IFtcbiAgICAgICAgICAgIG5ldyBVUkwodXJsKS5vcmlnaW4gKyAnLyonLFxuICAgICAgICBdLFxuICAgIH07XG4gICAgYXdhaXQgY2hyb21lUC5wZXJtaXNzaW9uc1tyZXF1ZXN0ID8gJ3JlcXVlc3QnIDogJ3JlbW92ZSddKHBlcm1pc3Npb25EYXRhKTtcbiAgICByZXR1cm4gY2hyb21lUC5wZXJtaXNzaW9ucy5jb250YWlucyhwZXJtaXNzaW9uRGF0YSk7XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVUYWJBY3RpdmF0ZWQoeyB0YWJJZCB9KSB7XG4gICAgdm9pZCB1cGRhdGVJdGVtKGF3YWl0IGdldFRhYlVybCh0YWJJZCkgPz8gJycpO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ2xpY2soeyBjaGVja2VkLCBtZW51SXRlbUlkIH0sIHRhYikge1xuICAgIGlmIChtZW51SXRlbUlkICE9PSBjb250ZXh0TWVudUlkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHVybDtcbiAgICB0cnkge1xuICAgICAgICBhc3NlcnRUYWIodGFiKTtcbiAgICAgICAgdXJsID0gdGFiLnVybCA/PyBhd2FpdCBnZXRUYWJVcmwodGFiLmlkKTtcbiAgICAgICAgYXNzZXJ0VXJsKHVybCk7XG4gICAgICAgIGFzc2VydFNjcmlwdGFibGVVcmwodXJsKTtcbiAgICAgICAgY29uc3QgcGVybWlzc2lvbkV4aXN0c05vdyA9IGF3YWl0IHNldFBlcm1pc3Npb24odXJsLCBjaGVja2VkKTtcbiAgICAgICAgY29uc3Qgc2V0dGluZ1dhc1N1Y2Nlc3NmdWwgPSBwZXJtaXNzaW9uRXhpc3RzTm93ID09PSBjaGVja2VkO1xuICAgICAgICAvLyBJZiBzdWNjZXNzZnVsLCBDaHJvbWUgYWxyZWFkeSBuYXRpdmVseSB1cGRhdGVkIHRoZSBjb250ZXh0IG1lbnUgaXRlbS5cbiAgICAgICAgaWYgKCFzZXR0aW5nV2FzU3VjY2Vzc2Z1bCkge1xuICAgICAgICAgICAgdXBkYXRlSXRlbVJhdyh7XG4gICAgICAgICAgICAgICAgY2hlY2tlZDogcGVybWlzc2lvbkV4aXN0c05vdyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwZXJtaXNzaW9uRXhpc3RzTm93ICYmIGdsb2JhbE9wdGlvbnMucmVsb2FkT25TdWNjZXNzKSB7XG4gICAgICAgICAgICB2b2lkIGV4ZWN1dGVGdW5jdGlvbih0YWIuaWQsIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZ2xvYmFsT3B0aW9ucy5yZWxvYWRPblN1Y2Nlc3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBEZWxheSB1cGRhdGluZyB0aGUgY29udGV4dCBtZW51IGl0ZW0gYmVjYXVzZSBvZiBzcHVyaW91cyBldmVudHMgYW5kIGFjdGl2ZVRhYiByYWNlIGNvbmRpdGlvbnNcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZyZWdhbnRlL3dlYmV4dC1wZXJtaXNzaW9uLXRvZ2dsZS9wdWxsLzQ1XG4gICAgICAgIHNldFRpbWVvdXQodXBkYXRlSXRlbSwgNTAwLCB1cmwpO1xuICAgICAgICBpZiAodGFiPy5pZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBleGVjdXRlRnVuY3Rpb24odGFiLmlkLCB0ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KHRleHQpOyAvKiBDYW4ndCBwYXNzIGEgcmF3IG5hdGl2ZSBmdW5jdGlvbiAqL1xuICAgICAgICAgICAgICAgIH0sIFN0cmluZyhlcnJvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgICAgIHZvaWQgYWxlcnQoU3RyaW5nKGVycm9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuLyoqXG4gKiBBZGRzIGFuIGl0ZW0gdG8gdGhlIGJyb3dzZXIgYWN0aW9uIGljb24ncyBjb250ZXh0IG1lbnUuXG4gKiBUaGUgdXNlciBjYW4gYWNjZXNzIHRoaXMgbWVudSBieSByaWdodCBjbGlja2luZyB0aGUgaWNvbi4gSWYgeW91ciBleHRlbnNpb24gZG9lc24ndCBoYXZlIGFueSBhY3Rpb24gb3JcbiAqIHBvcHVwIGFzc2lnbmVkIHRvIHRoZSBpY29uLCBpdCB3aWxsIGFsc28gYXBwZWFyIHdpdGggYSBsZWZ0IGNsaWNrLlxuICpcbiAqIEBwYXJhbSBvcHRpb25zIHtPcHRpb25zfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRQZXJtaXNzaW9uVG9nZ2xlKG9wdGlvbnMpIHtcbiAgICBpZiAoIWlzQmFja2dyb3VuZCgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignd2ViZXh0LXBlcm1pc3Npb24tdG9nZ2xlIGNhbiBvbmx5IGJlIGNhbGxlZCBmcm9tIGEgYmFja2dyb3VuZCBwYWdlJyk7XG4gICAgfVxuICAgIGlmIChnbG9iYWxPcHRpb25zKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignd2ViZXh0LXBlcm1pc3Npb24tdG9nZ2xlIGNhbiBvbmx5IGJlIGluaXRpYWxpemVkIG9uY2UnKTtcbiAgICB9XG4gICAgY29uc3QgbWFuaWZlc3QgPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpO1xuICAgIGlmICghbWFuaWZlc3QucGVybWlzc2lvbnM/LmluY2x1ZGVzKCdjb250ZXh0TWVudXMnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3dlYmV4dC1wZXJtaXNzaW9uLXRvZ2dsZSByZXF1aXJlcyB0aGUgYGNvbnRleHRNZW51c2AgcGVybWlzc2lvbicpO1xuICAgIH1cbiAgICBpZiAoIWNocm9tZS5jb250ZXh0TWVudXMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdjaHJvbWUuY29udGV4dE1lbnVzIGlzIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBnbG9iYWxPcHRpb25zID0ge1xuICAgICAgICB0aXRsZTogYEVuYWJsZSAke21hbmlmZXN0Lm5hbWV9IG9uIHRoaXMgZG9tYWluYCxcbiAgICAgICAgcmVsb2FkT25TdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuICAgIGlmIChnbG9iYWxPcHRpb25zLnJlbG9hZE9uU3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICBnbG9iYWxPcHRpb25zLnJlbG9hZE9uU3VjY2VzcyA9IGBEbyB5b3Ugd2FudCB0byByZWxvYWQgdGhpcyBwYWdlIHRvIGFwcGx5ICR7bWFuaWZlc3QubmFtZX0/YDtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uYWxIb3N0cyA9IFtcbiAgICAgICAgLi4ubWFuaWZlc3Qub3B0aW9uYWxfcGVybWlzc2lvbnMgPz8gW10sXG4gICAgICAgIC4uLm1hbmlmZXN0Lm9wdGlvbmFsX2hvc3RfcGVybWlzc2lvbnMgPz8gW10sXG4gICAgXS5maWx0ZXIoKHBlcm1pc3Npb24pID0+IHBlcm1pc3Npb24gPT09ICc8YWxsX3VybHM+JyB8fCBwZXJtaXNzaW9uLmluY2x1ZGVzKCcqJykpO1xuICAgIGlmIChvcHRpb25hbEhvc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd3ZWJleHQtcGVybWlzc2lvbi10b2dnbGUgcmVxdWlyZXMgc29tZSB3aWxkY2FyZCBob3N0cyB0byBiZSBzcGVjaWZpZWQgaW4gYG9wdGlvbmFsX3Blcm1pc3Npb25zYCAoTVYyKSBvciBgb3B0aW9uYWxfaG9zdF9wZXJtaXNzaW9uc2AgKE1WMyknKTtcbiAgICB9XG4gICAgLy8gUmVtb3ZlIGFueSBleGlzdGluZyBjb250ZXh0IG1lbnUgaXRlbSBhbmQgc2lsZW5jZSBhbnkgZXJyb3JcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLnJlbW92ZShjb250ZXh0TWVudUlkLCAoKSA9PiBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xuICAgIGNvbnN0IGNvbnRleHRzID0gbWFuaWZlc3QubWFuaWZlc3RfdmVyc2lvbiA9PT0gMlxuICAgICAgICA/IFsncGFnZV9hY3Rpb24nLCAnYnJvd3Nlcl9hY3Rpb24nXVxuICAgICAgICA6IFsnYWN0aW9uJ107XG4gICAgY2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xuICAgICAgICBpZDogY29udGV4dE1lbnVJZCxcbiAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgIHRpdGxlOiBnbG9iYWxPcHRpb25zLnRpdGxlLFxuICAgICAgICBjb250ZXh0cyxcbiAgICAgICAgLy8gTm90ZTogVGhpcyBpcyBjb21wbGV0ZWx5IGlnbm9yZWQgYnkgQ2hyb21lIGFuZCBTYWZhcmkuIEdyZWF0LiAjMTRcbiAgICAgICAgZG9jdW1lbnRVcmxQYXR0ZXJuczogb3B0aW9uYWxIb3N0cyxcbiAgICB9KTtcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihoYW5kbGVDbGljayk7XG4gICAgY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoaGFuZGxlVGFiQWN0aXZhdGVkKTtcbiAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoYXN5bmMgKHRhYklkLCB7IHN0YXR1cyB9LCB7IHVybCwgYWN0aXZlIH0pID0+IHtcbiAgICAgICAgaWYgKGFjdGl2ZSAmJiBzdGF0dXMgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIHZvaWQgdXBkYXRlSXRlbSh1cmwgPz8gYXdhaXQgZ2V0VGFiVXJsKHRhYklkKSA/PyAnJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImxldCBjYWNoZSA9IHRydWU7XG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVdlYmV4dERldGVjdFBhZ2VDYWNoZSgpIHtcbiAgICBjYWNoZSA9IGZhbHNlO1xufVxuZnVuY3Rpb24gaXNDdXJyZW50UGF0aG5hbWUocGF0aCkge1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IG5ldyBVUkwocGF0aCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICAgICAgcmV0dXJuIHBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TWFuaWZlc3QoX3ZlcnNpb24pIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcy5jaHJvbWU/LnJ1bnRpbWU/LmdldE1hbmlmZXN0Py4oKTtcbn1cbmZ1bmN0aW9uIG9uY2UoZnVuY3Rpb25fKSB7XG4gICAgbGV0IHJlc3VsdDtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoIWNhY2hlIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmdW5jdGlvbl8oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIG9uIGh0dHAocyk6Ly8gcGFnZXMgKGl0IGNvdWxkIGJlIGluIGEgY29udGVudCBzY3JpcHQgb3IgcmVndWxhciB3ZWIgY29udGV4dCkgKi9cbmV4cG9ydCBjb25zdCBpc1dlYlBhZ2UgPSBvbmNlKCgpID0+IFsnYWJvdXQ6JywgJ2h0dHA6JywgJ2h0dHBzOiddLmluY2x1ZGVzKGxvY2F0aW9uLnByb3RvY29sKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGV4dGVuc2lvbiBjb250ZXh0cyB0aGF0IGhhdmUgYWNjZXNzIHRvIHRoZSBjaHJvbWUgQVBJICovXG5leHBvcnQgY29uc3QgaXNFeHRlbnNpb25Db250ZXh0ID0gb25jZSgoKSA9PiB0eXBlb2YgZ2xvYmFsVGhpcy5jaHJvbWU/LmV4dGVuc2lvbiA9PT0gJ29iamVjdCcpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGNvbnRlbnQgc2NyaXB0ICovXG5leHBvcnQgY29uc3QgaXNDb250ZW50U2NyaXB0ID0gb25jZSgoKSA9PiBpc0V4dGVuc2lvbkNvbnRleHQoKSAmJiBpc1dlYlBhZ2UoKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgYmFja2dyb3VuZCBjb250ZXh0ICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kID0gKCkgPT4gaXNCYWNrZ3JvdW5kUGFnZSgpIHx8IGlzQmFja2dyb3VuZFdvcmtlcigpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgcGFnZSAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZFBhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBjb25zdCBtYW5pZmVzdCA9IGdldE1hbmlmZXN0KDIpO1xuICAgIGlmIChtYW5pZmVzdFxuICAgICAgICAmJiBpc0N1cnJlbnRQYXRobmFtZShtYW5pZmVzdC5iYWNrZ3JvdW5kX3BhZ2UgPz8gbWFuaWZlc3QuYmFja2dyb3VuZD8ucGFnZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBCb29sZWFuKG1hbmlmZXN0Py5iYWNrZ3JvdW5kPy5zY3JpcHRzXG4gICAgICAgICYmIGlzQ3VycmVudFBhdGhuYW1lKCcvX2dlbmVyYXRlZF9iYWNrZ3JvdW5kX3BhZ2UuaHRtbCcpKTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgd29ya2VyICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kV29ya2VyID0gb25jZSgoKSA9PiBpc0N1cnJlbnRQYXRobmFtZShnZXRNYW5pZmVzdCgzKT8uYmFja2dyb3VuZD8uc2VydmljZV93b3JrZXIpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBwZXJzaXN0ZW50IGJhY2tncm91bmQgcGFnZSAoYXMgb3Bwb3NlZCB0byBhbiBFdmVudCBQYWdlIG9yIEJhY2tncm91bmQgV29ya2VyLCBib3RoIG9mIHdoaWNoIGNhbiBiZSB1bmxvYWRlZCBieSB0aGUgYnJvd3NlcikgKi9cbmV4cG9ydCBjb25zdCBpc1BlcnNpc3RlbnRCYWNrZ3JvdW5kUGFnZSA9IG9uY2UoKCkgPT4gaXNCYWNrZ3JvdW5kUGFnZSgpXG4gICAgJiYgZ2V0TWFuaWZlc3QoMik/Lm1hbmlmZXN0X3ZlcnNpb24gPT09IDIgLy8gRmlyZWZveCBjYW4gaGF2ZSBhIGJhY2tncm91bmQgcGFnZSBvbiBNVjMsIGJ1dCBjYW4ndCBiZSBwZXJzaXN0ZW50XG4gICAgJiYgZ2V0TWFuaWZlc3QoMik/LmJhY2tncm91bmQ/LnBlcnNpc3RlbnQgIT09IGZhbHNlKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYW4gb3B0aW9ucyBwYWdlLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCAqL1xuZXhwb3J0IGNvbnN0IGlzT3B0aW9uc1BhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBjb25zdCBwYXRoID0gZ2V0TWFuaWZlc3QoKT8ub3B0aW9uc191aT8ucGFnZTtcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGFuIG9wdGlvbnMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgKi9cbmV4cG9ydCBjb25zdCBpc1NpZGVQYW5lbCA9IG9uY2UoKCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnQgLS0gTm90IHlldCBpbiBAdHlwZXMvY2hyb21lXG4gICAgY29uc3QgcGF0aCA9IGdldE1hbmlmZXN0KDMpPy5bJ3NpZGVfcGFuZWwnXT8uZGVmYXVsdF9wYXRoO1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBkZXYgdG9vbHMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgYGRldnRvb2xzX3BhZ2VgIGZpZWxkLiAqL1xuZXhwb3J0IGNvbnN0IGlzRGV2VG9vbHNQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgY29uc3QgZGV2dG9vbHNQYWdlID0gaXNFeHRlbnNpb25Db250ZXh0KCkgJiYgY2hyb21lLmRldnRvb2xzICYmIGdldE1hbmlmZXN0KCk/LmRldnRvb2xzX3BhZ2U7XG4gICAgaWYgKHR5cGVvZiBkZXZ0b29sc1BhZ2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChkZXZ0b29sc1BhZ2UsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gdGhlIGRldiB0b29scyBwYWdlLiBVbmxpa2UgYGlzRGV2VG9vbHNQYWdlYCwgdGhpcyB3b3JrcyBpbiBhbnkgcGFnZSB0aGF0IGhhcyB0aGUgYGNocm9tZS5kZXZUb29sc2AgQVBJICovXG5leHBvcnQgY29uc3QgaXNEZXZUb29scyA9ICgpID0+IEJvb2xlYW4oZ2xvYmFsVGhpcy5jaHJvbWU/LmRldnRvb2xzKTtcbi8qKiBMb29zZWx5IGRldGVjdCBGaXJlZm94IHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNGaXJlZm94ID0gKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnRmlyZWZveCcpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IENocm9tZSB2aWEgdXNlciBhZ2VudCAobWlnaHQgYWxzbyBpbmNsdWRlIENocm9taXVtIGFuZCBmb3JrcyBsaWtlIE9wZXJhKSAqL1xuZXhwb3J0IGNvbnN0IGlzQ2hyb21lID0gKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnQ2hyb21lJyk7XG4vKiogTG9vc2VseSBkZXRlY3QgU2FmYXJpIHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNTYWZhcmkgPSAoKSA9PiAhaXNDaHJvbWUoKSAmJiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdTYWZhcmknKTtcbi8qKiBMb29zZWx5IGRldGVjdCBNb2JpbGUgU2FmYXJpIHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNNb2JpbGVTYWZhcmkgPSAoKSA9PiBpc1NhZmFyaSgpICYmIGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ01vYmlsZScpO1xuY29uc3QgY29udGV4dENoZWNrcyA9IHtcbiAgICBjb250ZW50U2NyaXB0OiBpc0NvbnRlbnRTY3JpcHQsXG4gICAgYmFja2dyb3VuZDogaXNCYWNrZ3JvdW5kLFxuICAgIG9wdGlvbnM6IGlzT3B0aW9uc1BhZ2UsXG4gICAgc2lkZVBhbmVsOiBpc1NpZGVQYW5lbCxcbiAgICBkZXZUb29sczogaXNEZXZUb29scyxcbiAgICBkZXZUb29sc1BhZ2U6IGlzRGV2VG9vbHNQYWdlLFxuICAgIGV4dGVuc2lvbjogaXNFeHRlbnNpb25Db250ZXh0LFxuICAgIHdlYjogaXNXZWJQYWdlLFxufTtcbmV4cG9ydCBjb25zdCBjb250ZXh0TmFtZXMgPSBPYmplY3Qua2V5cyhjb250ZXh0Q2hlY2tzKTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZXh0TmFtZSgpIHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB0ZXN0XSBvZiBPYmplY3QuZW50cmllcyhjb250ZXh0Q2hlY2tzKSkge1xuICAgICAgICBpZiAodGVzdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJ3Vua25vd24nO1xufVxuIiwiaW1wb3J0IHsgZXhjbHVkZUR1cGxpY2F0ZVBhdHRlcm5zLCBwYXR0ZXJuVG9SZWdleCB9IGZyb20gJ3dlYmV4dC1wYXR0ZXJucyc7XG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTWFuaWZlc3RQZXJtaXNzaW9ucyhtYW5pZmVzdCA9IGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkpIHtcbiAgICBjb25zdCBtYW5pZmVzdFBlcm1pc3Npb25zID0ge1xuICAgICAgICBvcmlnaW5zOiBbXSxcbiAgICAgICAgcGVybWlzc2lvbnM6IFtdLFxuICAgIH07XG4gICAgY29uc3QgbGlzdCA9IG5ldyBTZXQoW1xuICAgICAgICAuLi4obWFuaWZlc3QucGVybWlzc2lvbnMgPz8gW10pLFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50IC0tIE5vdCBzdXJlIHdoeSBpdCdzIGJlaW5nIGEgUElUQVxuICAgICAgICAuLi4obWFuaWZlc3QuaG9zdF9wZXJtaXNzaW9ucyA/PyBbXSksXG4gICAgICAgIC4uLihtYW5pZmVzdC5jb250ZW50X3NjcmlwdHMgPz8gW10pLmZsYXRNYXAoY29uZmlnID0+IGNvbmZpZy5tYXRjaGVzID8/IFtdKSxcbiAgICBdKTtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9nZWNrby1kZXYvYmxvYi9jMGZjOGM0ODUyZTkyN2IwYWU3NWQ4OTNkMzU3NzJiOGM2MGVlMDZiL3Rvb2xraXQvY29tcG9uZW50cy9leHRlbnNpb25zL0V4dGVuc2lvbi5qc20jTDczOC1MNzQzXG4gICAgaWYgKG1hbmlmZXN0LmRldnRvb2xzX3BhZ2VcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBpdCBjYW4ndCBiZSBzcGVjaWZpZWQsIGJ1dCBpdCdzIHJlcG9ydGVkIHdoZW4gcmVxdWVzdGVkXG4gICAgICAgICYmICFtYW5pZmVzdC5vcHRpb25hbF9wZXJtaXNzaW9ucz8uaW5jbHVkZXMoJ2RldnRvb2xzJykpIHtcbiAgICAgICAgbGlzdC5hZGQoJ2RldnRvb2xzJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcGVybWlzc2lvbiBvZiBsaXN0KSB7XG4gICAgICAgIGlmIChwZXJtaXNzaW9uLmluY2x1ZGVzKCc6Ly8nKSB8fCBwZXJtaXNzaW9uID09PSAnPGFsbF91cmxzPicpIHtcbiAgICAgICAgICAgIG1hbmlmZXN0UGVybWlzc2lvbnMub3JpZ2lucy5wdXNoKHBlcm1pc3Npb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWFuaWZlc3RQZXJtaXNzaW9ucy5wZXJtaXNzaW9ucy5wdXNoKHBlcm1pc3Npb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkcm9wT3ZlcmxhcHBpbmdQZXJtaXNzaW9ucyhtYW5pZmVzdFBlcm1pc3Npb25zKTtcbn1cbmNvbnN0IGhvc3RSZWdleCA9IC86Wy9dWy9dWyouXSooW14vXSspLzsgLy8gRXh0cmFjdHMgdGhlIHdpbGRjYXJkLWxlc3MgaG9zdG5hbWVcbmZ1bmN0aW9uIHBhcnNlRG9tYWluKG9yaWdpbikge1xuICAgIHJldHVybiBvcmlnaW4uc3BsaXQoaG9zdFJlZ2V4KVsxXTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBxdWVyeUFkZGl0aW9uYWxQZXJtaXNzaW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBjaHJvbWUucGVybWlzc2lvbnMuZ2V0QWxsKGN1cnJlbnRQZXJtaXNzaW9ucyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGV4dHJhY3RBZGRpdGlvbmFsUGVybWlzc2lvbnMoY3VycmVudFBlcm1pc3Npb25zLCBvcHRpb25zKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBZGRpdGlvbmFsUGVybWlzc2lvbnMoY3VycmVudFBlcm1pc3Npb25zLCB7IG1hbmlmZXN0LCBzdHJpY3RPcmlnaW5zID0gdHJ1ZSwgfSA9IHt9KSB7XG4gICAgY29uc3QgbWFuaWZlc3RQZXJtaXNzaW9ucyA9IG5vcm1hbGl6ZU1hbmlmZXN0UGVybWlzc2lvbnMobWFuaWZlc3QpO1xuICAgIGNvbnN0IGFkZGl0aW9uYWxQZXJtaXNzaW9ucyA9IHtcbiAgICAgICAgb3JpZ2luczogW10sXG4gICAgICAgIHBlcm1pc3Npb25zOiBbXSxcbiAgICB9O1xuICAgIGZvciAoY29uc3Qgb3JpZ2luIG9mIGN1cnJlbnRQZXJtaXNzaW9ucy5vcmlnaW5zID8/IFtdKSB7XG4gICAgICAgIGlmIChtYW5pZmVzdFBlcm1pc3Npb25zLm9yaWdpbnMuaW5jbHVkZXMob3JpZ2luKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzdHJpY3RPcmlnaW5zKSB7XG4gICAgICAgICAgICBjb25zdCBkb21haW4gPSBwYXJzZURvbWFpbihvcmlnaW4pO1xuICAgICAgICAgICAgY29uc3QgaXNEb21haW5Jbk1hbmlmZXN0ID0gbWFuaWZlc3RQZXJtaXNzaW9ucy5vcmlnaW5zXG4gICAgICAgICAgICAgICAgLnNvbWUobWFuaWZlc3RPcmlnaW4gPT4gcGFyc2VEb21haW4obWFuaWZlc3RPcmlnaW4pID09PSBkb21haW4pO1xuICAgICAgICAgICAgaWYgKGlzRG9tYWluSW5NYW5pZmVzdCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFkZGl0aW9uYWxQZXJtaXNzaW9ucy5vcmlnaW5zLnB1c2gob3JpZ2luKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwZXJtaXNzaW9uIG9mIGN1cnJlbnRQZXJtaXNzaW9ucy5wZXJtaXNzaW9ucyA/PyBbXSkge1xuICAgICAgICBpZiAoIW1hbmlmZXN0UGVybWlzc2lvbnMucGVybWlzc2lvbnMuaW5jbHVkZXMocGVybWlzc2lvbikpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQZXJtaXNzaW9ucy5wZXJtaXNzaW9ucy5wdXNoKHBlcm1pc3Npb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhZGRpdGlvbmFsUGVybWlzc2lvbnM7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNVcmxQZXJtaXR0ZWRCeU1hbmlmZXN0KG9yaWdpbiwgbWFuaWZlc3QgPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpKSB7XG4gICAgY29uc3QgbWFuaWZlc3RQZXJtaXNzaW9ucyA9IG5vcm1hbGl6ZU1hbmlmZXN0UGVybWlzc2lvbnMobWFuaWZlc3QpO1xuICAgIGNvbnN0IG9yaWdpbnNSZWdleCA9IHBhdHRlcm5Ub1JlZ2V4KC4uLm1hbmlmZXN0UGVybWlzc2lvbnMub3JpZ2lucyk7XG4gICAgcmV0dXJuIG9yaWdpbnNSZWdleC50ZXN0KG9yaWdpbik7XG59XG5leHBvcnQgZnVuY3Rpb24gZHJvcE92ZXJsYXBwaW5nUGVybWlzc2lvbnMoeyBvcmlnaW5zLCBwZXJtaXNzaW9ucyB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb3JpZ2luczogb3JpZ2lucyA/IGV4Y2x1ZGVEdXBsaWNhdGVQYXR0ZXJucyhvcmlnaW5zKSA6IFtdLFxuICAgICAgICBwZXJtaXNzaW9uczogcGVybWlzc2lvbnMgPyBbLi4ucGVybWlzc2lvbnNdIDogW10sXG4gICAgfTtcbn1cbiIsImZ1bmN0aW9uIE5lc3RlZFByb3h5KHRhcmdldCkge1xuXHRyZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xuXHRcdGdldCh0YXJnZXQsIHByb3ApIHtcblx0XHRcdGlmICghdGFyZ2V0W3Byb3BdKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiB0YXJnZXRbcHJvcF0gIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBOZXN0ZWRQcm94eSh0YXJnZXRbcHJvcF0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gKC4uLmFyZ3VtZW50c18pID0+XG5cdFx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0YXJnZXRbcHJvcF0oLi4uYXJndW1lbnRzXywgcmVzdWx0ID0+IHtcblx0XHRcdFx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHR9LFxuXHR9KTtcbn1cblxuY29uc3QgY2hyb21lUCA9IGdsb2JhbFRoaXMuY2hyb21lICYmIG5ldyBOZXN0ZWRQcm94eShnbG9iYWxUaGlzLmNocm9tZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNocm9tZVA7XG4iLCJpbXBvcnQgY2hyb21lUCBmcm9tICd3ZWJleHQtcG9seWZpbGwta2luZGEnO1xuaW1wb3J0IHsgZXhlY3V0ZUZ1bmN0aW9uIH0gZnJvbSAnd2ViZXh0LWNvbnRlbnQtc2NyaXB0cyc7XG5leHBvcnQgZnVuY3Rpb24gY2FzdFRhcmdldCh0YXJnZXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCdcbiAgICAgICAgPyB0YXJnZXRcbiAgICAgICAgOiB7XG4gICAgICAgICAgICB0YWJJZDogdGFyZ2V0LFxuICAgICAgICAgICAgZnJhbWVJZDogMCxcbiAgICAgICAgfTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUYWJVcmwodGFyZ2V0KSB7XG4gICAgY29uc3QgeyBmcmFtZUlkLCB0YWJJZCB9ID0gY2FzdFRhcmdldCh0YXJnZXQpO1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChmcmFtZUlkID09PSAwICYmICd0YWJzJyBpbiBnbG9iYWxUaGlzLmNocm9tZSkge1xuICAgICAgICAgICAgY29uc3QgdGFiID0gYXdhaXQgY2hyb21lUC50YWJzLmdldCh0YWJJZCk7XG4gICAgICAgICAgICBpZiAodGFiLnVybCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWIudXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhd2FpdCBleGVjdXRlRnVuY3Rpb24odGFyZ2V0LCAoKSA9PiBsb2NhdGlvbi5ocmVmKTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICAvLyBObyBob3N0IHBlcm1pc3Npb25zXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNhbkFjY2Vzc1RhYih0YXJnZXQpIHtcbiAgICByZXR1cm4gZXhlY3V0ZUZ1bmN0aW9uKGNhc3RUYXJnZXQodGFyZ2V0KSwgKCkgPT4gdHJ1ZSkudGhlbigoKSA9PiB0cnVlLCAoKSA9PiBmYWxzZSk7XG59XG4vKiogVXRpbGl0eSB0byBhd2FpdCBwcm9taXNlcyB3aGVyZSB5b3Ugb25seSBjYXJlIHdoZXRoZXIgdGhleSB0aHJvdyBvciBub3QgKi9cbmFzeW5jIGZ1bmN0aW9uIGlzUHJvbWlzZUZ1bGZpbGxlZChwcm9taXNlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb2VzVGFiRXhpc3QodGFiSWQpIHtcbiAgICByZXR1cm4gaXNQcm9taXNlRnVsZmlsbGVkKGNocm9tZVAudGFicy5nZXQodGFiSWQpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRBY3Rpb25Qb3B1cChnZXRQb3B1cFVybCkge1xuICAgIGNvbnN0IGJyb3dzZXJBY3Rpb24gPSBjaHJvbWUuYWN0aW9uID8/IGNocm9tZVAuYnJvd3NlckFjdGlvbjtcbiAgICBjb25zdCBzZXRPbkFjdGl2ZVRhYiA9IGFzeW5jICh3aW5kb3dJZCkgPT4ge1xuICAgICAgICBjb25zdCBbdGFiXSA9IGF3YWl0IGNocm9tZVAudGFicy5xdWVyeSh7XG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICAuLi53aW5kb3dJZCA/IHsgd2luZG93SWQgfSA6IHsgbGFzdEZvY3VzZWRXaW5kb3c6IHRydWUgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGFiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgYnJvd3NlckFjdGlvbi5zZXRQb3B1cCh7XG4gICAgICAgICAgICBwb3B1cDogYXdhaXQgZ2V0UG9wdXBVcmwodGFiLnVybCkgPz8gJycsXG4gICAgICAgICAgICB0YWJJZDogdGFiLmlkLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZvaWQgc2V0T25BY3RpdmVUYWIoKTtcbiAgICBjaHJvbWUud2luZG93cy5vbkZvY3VzQ2hhbmdlZC5hZGRMaXN0ZW5lcihzZXRPbkFjdGl2ZVRhYik7XG4gICAgY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoYXN5bmMgKGFjdGl2ZUluZm8pID0+IHtcbiAgICAgICAgY29uc3QgdGFiID0gYXdhaXQgY2hyb21lUC50YWJzLmdldChhY3RpdmVJbmZvLnRhYklkKTtcbiAgICAgICAgYXdhaXQgYnJvd3NlckFjdGlvbi5zZXRQb3B1cCh7XG4gICAgICAgICAgICBwb3B1cDogYXdhaXQgZ2V0UG9wdXBVcmwodGFiLnVybCkgPz8gJycsXG4gICAgICAgICAgICB0YWJJZDogdGFiLmlkLFxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoYXN5bmMgKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpID0+IHtcbiAgICAgICAgaWYgKHRhYi5hY3RpdmUgJiYgY2hhbmdlSW5mby51cmwpIHtcbiAgICAgICAgICAgIGF3YWl0IGJyb3dzZXJBY3Rpb24uc2V0UG9wdXAoe1xuICAgICAgICAgICAgICAgIHBvcHVwOiBhd2FpdCBnZXRQb3B1cFVybCh0YWIudXJsKSA/PyAnJyxcbiAgICAgICAgICAgICAgICB0YWJJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvYmFja2dyb3VuZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==