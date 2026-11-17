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
    if (request.type == "openMessages") {
        void (() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const tab = (_a = sender.tab) !== null && _a !== void 0 ? _a : (yield chrome.tabs.query({ active: true, lastFocusedWindow: true }))[0];
            if (!(tab === null || tab === void 0 ? void 0 : tab.id))
                return;
            chrome.tabs.sendMessage(tab.id, { type: "openMessagesInSchoology" });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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O0FBQ0Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pETztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1R3NEO0FBQ3REO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnRUFBa0I7QUFDakM7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ087QUFDUCxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdHZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZtRDtBQUNTO0FBQ0U7QUFDckI7QUFDUjtBQUN5QztBQUMxRTtBQUNBO0FBQ0EsZ0JBQWdCLDREQUFRO0FBQ3hCLE1BQU0sNkRBQWM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsdUVBQWU7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EseUJBQXlCLGtCQUFrQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUSx1RUFBZTtBQUN2QixnQkFBZ0IsU0FBUztBQUN6QixrREFBa0Q7QUFDbEQsMEJBQTBCLDRFQUF3QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQywwQkFBMEIsdURBQVM7QUFDbkM7QUFDQSw2QkFBNkIscUJBQXFCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix1REFBUztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUIsdUVBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUVBQWU7QUFDckMsd0NBQXdDO0FBQ3hDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EscUJBQXFCLHdEQUFLO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ2U7QUFDZixTQUFTLGdFQUFZO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixjQUFjO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0RBQXNELFFBQVEsSUFBSSxhQUFhO0FBQy9FO0FBQ0EseUNBQXlDLHVEQUFTO0FBQ2xEO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6TEE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVHMkU7QUFDcEU7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNPLDREQUE0RCxrQ0FBa0MsSUFBSTtBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLHlCQUF5QiwrREFBYztBQUN2QztBQUNBO0FBQ08sc0NBQXNDLHNCQUFzQjtBQUNuRTtBQUNBLDJCQUEyQix5RUFBd0I7QUFDbkQ7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRTtBQUNGOztBQUVBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCcUI7QUFDYTtBQUNsRDtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxZQUFZLGlCQUFpQjtBQUM3QjtBQUNBO0FBQ0EsOEJBQThCLDZEQUFPO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVFQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsV0FBVyx1RUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCw4QkFBOEIsNkRBQU87QUFDckM7QUFDTztBQUNQLDJDQUEyQyw2REFBTztBQUNsRDtBQUNBLDRCQUE0Qiw2REFBTztBQUNuQztBQUNBLDRCQUE0QixXQUFXLElBQUkseUJBQXlCO0FBQ3BFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNkRBQU87QUFDakM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDMUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvZG9tcHVyaWZ5L2Rpc3QvcHVyaWZ5LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vc3JjL3NjcmlwdHMvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2FuYWx5dGljcy50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2RvbS50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2xvZ2dlci50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvY29udGVudC1zY3JpcHRzLXJlZ2lzdGVyLXBvbHlmaWxsL3BvbnlmaWxsLmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1hZGRpdGlvbmFsLXBlcm1pc3Npb25zL2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1hbGVydC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtYWxlcnQvbm9kZV9tb2R1bGVzL3dlYmV4dC1kZXRlY3QtcGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtY29udGVudC1zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0cy9kaXN0cmlidXRpb24vZGVkdXBsaWNhdG9yLmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0cy9kaXN0cmlidXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHRzL2Rpc3RyaWJ1dGlvbi9pbmplY3QtdG8tZXhpc3RpbmctdGFicy5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdHMvZGlzdHJpYnV0aW9uL2xpYi5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdHMvZGlzdHJpYnV0aW9uL3JlZ2lzdGVyLWNvbnRlbnQtc2NyaXB0LXNoaW0uanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWV2ZW50cy9kaXN0cmlidXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWV2ZW50cy9kaXN0cmlidXRpb24vb24tY29udGV4dC1pbnZhbGlkYXRlZC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtZXZlbnRzL2Rpc3RyaWJ1dGlvbi9vbi1leHRlbnNpb24tc3RhcnQuanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LWV2ZW50cy9kaXN0cmlidXRpb24vb25lLWV2ZW50LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1ldmVudHMvbm9kZV9tb2R1bGVzL3dlYmV4dC1kZXRlY3QtcGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtcGF0dGVybnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LXBhdHRlcm5zL25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtcGVybWlzc2lvbi10b2dnbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LXBlcm1pc3Npb24tdG9nZ2xlL25vZGVfbW9kdWxlcy93ZWJleHQtZGV0ZWN0LXBhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LXBlcm1pc3Npb25zL2Rpc3RyaWJ1dGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL25vZGVfbW9kdWxlcy93ZWJleHQtcG9seWZpbGwta2luZGEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvd2ViZXh0LXRvb2xzL2luZGV4LmpzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBAbGljZW5zZSBET01QdXJpZnkgfCAoYykgQ3VyZTUzIGFuZCBvdGhlciBjb250cmlidXRvcnMgfCBSZWxlYXNlZCB1bmRlciB0aGUgQXBhY2hlIGxpY2Vuc2UgMi4wIGFuZCBNb3ppbGxhIFB1YmxpYyBMaWNlbnNlIDIuMCB8IGdpdGh1Yi5jb20vY3VyZTUzL0RPTVB1cmlmeS9ibG9iLzIuMC44L0xJQ0VOU0UgKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5ET01QdXJpZnkgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCBmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QuaGFzT3duUHJvcGVydHksXG4gICAgICBzZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZixcbiAgICAgIGlzRnJvemVuID0gT2JqZWN0LmlzRnJvemVuO1xuICB2YXIgZnJlZXplID0gT2JqZWN0LmZyZWV6ZSxcbiAgICAgIHNlYWwgPSBPYmplY3Quc2VhbCxcbiAgICAgIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLW11dGFibGUtZXhwb3J0c1xuXG4gIHZhciBfcmVmID0gdHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIFJlZmxlY3QsXG4gICAgICBhcHBseSA9IF9yZWYuYXBwbHksXG4gICAgICBjb25zdHJ1Y3QgPSBfcmVmLmNvbnN0cnVjdDtcblxuICBpZiAoIWFwcGx5KSB7XG4gICAgYXBwbHkgPSBmdW5jdGlvbiBhcHBseShmdW4sIHRoaXNWYWx1ZSwgYXJncykge1xuICAgICAgcmV0dXJuIGZ1bi5hcHBseSh0aGlzVmFsdWUsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICBpZiAoIWZyZWV6ZSkge1xuICAgIGZyZWV6ZSA9IGZ1bmN0aW9uIGZyZWV6ZSh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFzZWFsKSB7XG4gICAgc2VhbCA9IGZ1bmN0aW9uIHNlYWwoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghY29uc3RydWN0KSB7XG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gY29uc3RydWN0KEZ1bmMsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KEZ1bmMsIFtudWxsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKSkpKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBhcnJheUZvckVhY2ggPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKTtcbiAgdmFyIGFycmF5UG9wID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucG9wKTtcbiAgdmFyIGFycmF5UHVzaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuXG4gIHZhciBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XG4gIHZhciBzdHJpbmdNYXRjaCA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5tYXRjaCk7XG4gIHZhciBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuICB2YXIgc3RyaW5nSW5kZXhPZiA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mKTtcbiAgdmFyIHN0cmluZ1RyaW0gPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudHJpbSk7XG5cbiAgdmFyIHJlZ0V4cFRlc3QgPSB1bmFwcGx5KFJlZ0V4cC5wcm90b3R5cGUudGVzdCk7XG5cbiAgdmFyIHR5cGVFcnJvckNyZWF0ZSA9IHVuY29uc3RydWN0KFR5cGVFcnJvcik7XG5cbiAgZnVuY3Rpb24gdW5hcHBseShmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdW5jb25zdHJ1Y3QoZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb25zdHJ1Y3QoZnVuYywgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qIEFkZCBwcm9wZXJ0aWVzIHRvIGEgbG9va3VwIHRhYmxlICovXG4gIGZ1bmN0aW9uIGFkZFRvU2V0KHNldCwgYXJyYXkpIHtcbiAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIC8vIE1ha2UgJ2luJyBhbmQgdHJ1dGh5IGNoZWNrcyBsaWtlIEJvb2xlYW4oc2V0LmNvbnN0cnVjdG9yKVxuICAgICAgLy8gaW5kZXBlbmRlbnQgb2YgYW55IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBPYmplY3QucHJvdG90eXBlLlxuICAgICAgLy8gUHJldmVudCBwcm90b3R5cGUgc2V0dGVycyBmcm9tIGludGVyY2VwdGluZyBzZXQgYXMgYSB0aGlzIHZhbHVlLlxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2V0LCBudWxsKTtcbiAgICB9XG5cbiAgICB2YXIgbCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobC0tKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IGFycmF5W2xdO1xuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbGNFbGVtZW50ID0gc3RyaW5nVG9Mb3dlckNhc2UoZWxlbWVudCk7XG4gICAgICAgIGlmIChsY0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBDb25maWcgcHJlc2V0cyAoZS5nLiB0YWdzLmpzLCBhdHRycy5qcykgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgICBpZiAoIWlzRnJvemVuKGFycmF5KSkge1xuICAgICAgICAgICAgYXJyYXlbbF0gPSBsY0VsZW1lbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbWVudCA9IGxjRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRbZWxlbWVudF0gPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKiBTaGFsbG93IGNsb25lIGFuIG9iamVjdCAqL1xuICBmdW5jdGlvbiBjbG9uZShvYmplY3QpIHtcbiAgICB2YXIgbmV3T2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuXG4gICAgdmFyIHByb3BlcnR5ID0gdm9pZCAwO1xuICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICBpZiAoYXBwbHkoaGFzT3duUHJvcGVydHksIG9iamVjdCwgW3Byb3BlcnR5XSkpIHtcbiAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuXG4gIHZhciBodG1sID0gZnJlZXplKFsnYScsICdhYmJyJywgJ2Fjcm9ueW0nLCAnYWRkcmVzcycsICdhcmVhJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnYXVkaW8nLCAnYicsICdiZGknLCAnYmRvJywgJ2JpZycsICdibGluaycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NlbnRlcicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2NvbnRlbnQnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWNvcmF0b3InLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpcicsICdkaXYnLCAnZGwnLCAnZHQnLCAnZWxlbWVudCcsICdlbScsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb250JywgJ2Zvb3RlcicsICdmb3JtJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWQnLCAnaGVhZGVyJywgJ2hncm91cCcsICdocicsICdodG1sJywgJ2knLCAnaW1nJywgJ2lucHV0JywgJ2lucycsICdrYmQnLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ21haW4nLCAnbWFwJywgJ21hcmsnLCAnbWFycXVlZScsICdtZW51JywgJ21lbnVpdGVtJywgJ21ldGVyJywgJ25hdicsICdub2JyJywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwaWN0dXJlJywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JwJywgJ3J0JywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NlY3Rpb24nLCAnc2VsZWN0JywgJ3NoYWRvdycsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhY2VyJywgJ3NwYW4nLCAnc3RyaWtlJywgJ3N0cm9uZycsICdzdHlsZScsICdzdWInLCAnc3VtbWFyeScsICdzdXAnLCAndGFibGUnLCAndGJvZHknLCAndGQnLCAndGVtcGxhdGUnLCAndGV4dGFyZWEnLCAndGZvb3QnLCAndGgnLCAndGhlYWQnLCAndGltZScsICd0cicsICd0cmFjaycsICd0dCcsICd1JywgJ3VsJywgJ3ZhcicsICd2aWRlbycsICd3YnInXSk7XG5cbiAgLy8gU1ZHXG4gIHZhciBzdmcgPSBmcmVlemUoWydzdmcnLCAnYScsICdhbHRnbHlwaCcsICdhbHRnbHlwaGRlZicsICdhbHRnbHlwaGl0ZW0nLCAnYW5pbWF0ZWNvbG9yJywgJ2FuaW1hdGVtb3Rpb24nLCAnYW5pbWF0ZXRyYW5zZm9ybScsICdhdWRpbycsICdjYW52YXMnLCAnY2lyY2xlJywgJ2NsaXBwYXRoJywgJ2RlZnMnLCAnZGVzYycsICdlbGxpcHNlJywgJ2ZpbHRlcicsICdmb250JywgJ2cnLCAnZ2x5cGgnLCAnZ2x5cGhyZWYnLCAnaGtlcm4nLCAnaW1hZ2UnLCAnbGluZScsICdsaW5lYXJncmFkaWVudCcsICdtYXJrZXInLCAnbWFzaycsICdtZXRhZGF0YScsICdtcGF0aCcsICdwYXRoJywgJ3BhdHRlcm4nLCAncG9seWdvbicsICdwb2x5bGluZScsICdyYWRpYWxncmFkaWVudCcsICdyZWN0JywgJ3N0b3AnLCAnc3R5bGUnLCAnc3dpdGNoJywgJ3N5bWJvbCcsICd0ZXh0JywgJ3RleHRwYXRoJywgJ3RpdGxlJywgJ3RyZWYnLCAndHNwYW4nLCAndmlkZW8nLCAndmlldycsICd2a2VybiddKTtcblxuICB2YXIgc3ZnRmlsdGVycyA9IGZyZWV6ZShbJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJywgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLCAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLCAnZmVGdW5jRycsICdmZUZ1bmNSJywgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlTWVyZ2UnLCAnZmVNZXJnZU5vZGUnLCAnZmVNb3JwaG9sb2d5JywgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLCAnZmVTcG90TGlnaHQnLCAnZmVUaWxlJywgJ2ZlVHVyYnVsZW5jZSddKTtcblxuICB2YXIgbWF0aE1sID0gZnJlZXplKFsnbWF0aCcsICdtZW5jbG9zZScsICdtZXJyb3InLCAnbWZlbmNlZCcsICdtZnJhYycsICdtZ2x5cGgnLCAnbWknLCAnbWxhYmVsZWR0cicsICdtbXVsdGlzY3JpcHRzJywgJ21uJywgJ21vJywgJ21vdmVyJywgJ21wYWRkZWQnLCAnbXBoYW50b20nLCAnbXJvb3QnLCAnbXJvdycsICdtcycsICdtc3BhY2UnLCAnbXNxcnQnLCAnbXN0eWxlJywgJ21zdWInLCAnbXN1cCcsICdtc3Vic3VwJywgJ210YWJsZScsICdtdGQnLCAnbXRleHQnLCAnbXRyJywgJ211bmRlcicsICdtdW5kZXJvdmVyJ10pO1xuXG4gIHZhciB0ZXh0ID0gZnJlZXplKFsnI3RleHQnXSk7XG5cbiAgdmFyIGh0bWwkMSA9IGZyZWV6ZShbJ2FjY2VwdCcsICdhY3Rpb24nLCAnYWxpZ24nLCAnYWx0JywgJ2F1dG9jYXBpdGFsaXplJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvcGljdHVyZWlucGljdHVyZScsICdhdXRvcGxheScsICdiYWNrZ3JvdW5kJywgJ2JnY29sb3InLCAnYm9yZGVyJywgJ2NhcHR1cmUnLCAnY2VsbHBhZGRpbmcnLCAnY2VsbHNwYWNpbmcnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzJywgJ2NsZWFyJywgJ2NvbG9yJywgJ2NvbHMnLCAnY29sc3BhbicsICdjb250cm9scycsICdjb250cm9sc2xpc3QnLCAnY29vcmRzJywgJ2Nyb3Nzb3JpZ2luJywgJ2RhdGV0aW1lJywgJ2RlY29kaW5nJywgJ2RlZmF1bHQnLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rpc2FibGVwaWN0dXJlaW5waWN0dXJlJywgJ2Rpc2FibGVyZW1vdGVwbGF5YmFjaycsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLCAnZW5jdHlwZScsICdlbnRlcmtleWhpbnQnLCAnZmFjZScsICdmb3InLCAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmbGFuZycsICdpZCcsICdpbnB1dG1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzbWFwJywgJ2tpbmQnLCAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvYWRpbmcnLCAnbG9vcCcsICdsb3cnLCAnbWF4JywgJ21heGxlbmd0aCcsICdtZWRpYScsICdtZXRob2QnLCAnbWluJywgJ21pbmxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsICduYW1lJywgJ25vc2hhZGUnLCAnbm92YWxpZGF0ZScsICdub3dyYXAnLCAnb3BlbicsICdvcHRpbXVtJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncGxheXNpbmxpbmUnLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHViZGF0ZScsICdyYWRpb2dyb3VwJywgJ3JlYWRvbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXYnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dzJywgJ3Jvd3NwYW4nLCAnc3BlbGxjaGVjaycsICdzY29wZScsICdzZWxlY3RlZCcsICdzaGFwZScsICdzaXplJywgJ3NpemVzJywgJ3NwYW4nLCAnc3JjbGFuZycsICdzdGFydCcsICdzcmMnLCAnc3Jjc2V0JywgJ3N0ZXAnLCAnc3R5bGUnLCAnc3VtbWFyeScsICd0YWJpbmRleCcsICd0aXRsZScsICd0cmFuc2xhdGUnLCAndHlwZScsICd1c2VtYXAnLCAndmFsaWduJywgJ3ZhbHVlJywgJ3dpZHRoJywgJ3htbG5zJ10pO1xuXG4gIHZhciBzdmckMSA9IGZyZWV6ZShbJ2FjY2VudC1oZWlnaHQnLCAnYWNjdW11bGF0ZScsICdhZGRpdGl2ZScsICdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnYXNjZW50JywgJ2F0dHJpYnV0ZW5hbWUnLCAnYXR0cmlidXRldHlwZScsICdhemltdXRoJywgJ2Jhc2VmcmVxdWVuY3knLCAnYmFzZWxpbmUtc2hpZnQnLCAnYmVnaW4nLCAnYmlhcycsICdieScsICdjbGFzcycsICdjbGlwJywgJ2NsaXBwYXRodW5pdHMnLCAnY2xpcC1wYXRoJywgJ2NsaXAtcnVsZScsICdjb2xvcicsICdjb2xvci1pbnRlcnBvbGF0aW9uJywgJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycycsICdjb2xvci1wcm9maWxlJywgJ2NvbG9yLXJlbmRlcmluZycsICdjeCcsICdjeScsICdkJywgJ2R4JywgJ2R5JywgJ2RpZmZ1c2Vjb25zdGFudCcsICdkaXJlY3Rpb24nLCAnZGlzcGxheScsICdkaXZpc29yJywgJ2R1cicsICdlZGdlbW9kZScsICdlbGV2YXRpb24nLCAnZW5kJywgJ2ZpbGwnLCAnZmlsbC1vcGFjaXR5JywgJ2ZpbGwtcnVsZScsICdmaWx0ZXInLCAnZmlsdGVydW5pdHMnLCAnZmxvb2QtY29sb3InLCAnZmxvb2Qtb3BhY2l0eScsICdmb250LWZhbWlseScsICdmb250LXNpemUnLCAnZm9udC1zaXplLWFkanVzdCcsICdmb250LXN0cmV0Y2gnLCAnZm9udC1zdHlsZScsICdmb250LXZhcmlhbnQnLCAnZm9udC13ZWlnaHQnLCAnZngnLCAnZnknLCAnZzEnLCAnZzInLCAnZ2x5cGgtbmFtZScsICdnbHlwaHJlZicsICdncmFkaWVudHVuaXRzJywgJ2dyYWRpZW50dHJhbnNmb3JtJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2ltYWdlLXJlbmRlcmluZycsICdpbicsICdpbjInLCAnaycsICdrMScsICdrMicsICdrMycsICdrNCcsICdrZXJuaW5nJywgJ2tleXBvaW50cycsICdrZXlzcGxpbmVzJywgJ2tleXRpbWVzJywgJ2xhbmcnLCAnbGVuZ3RoYWRqdXN0JywgJ2xldHRlci1zcGFjaW5nJywgJ2tlcm5lbG1hdHJpeCcsICdrZXJuZWx1bml0bGVuZ3RoJywgJ2xpZ2h0aW5nLWNvbG9yJywgJ2xvY2FsJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnLCAnbWFya2VyaGVpZ2h0JywgJ21hcmtlcnVuaXRzJywgJ21hcmtlcndpZHRoJywgJ21hc2tjb250ZW50dW5pdHMnLCAnbWFza3VuaXRzJywgJ21heCcsICdtYXNrJywgJ21lZGlhJywgJ21ldGhvZCcsICdtb2RlJywgJ21pbicsICduYW1lJywgJ251bW9jdGF2ZXMnLCAnb2Zmc2V0JywgJ29wZXJhdG9yJywgJ29wYWNpdHknLCAnb3JkZXInLCAnb3JpZW50JywgJ29yaWVudGF0aW9uJywgJ29yaWdpbicsICdvdmVyZmxvdycsICdwYWludC1vcmRlcicsICdwYXRoJywgJ3BhdGhsZW5ndGgnLCAncGF0dGVybmNvbnRlbnR1bml0cycsICdwYXR0ZXJudHJhbnNmb3JtJywgJ3BhdHRlcm51bml0cycsICdwb2ludHMnLCAncHJlc2VydmVhbHBoYScsICdwcmVzZXJ2ZWFzcGVjdHJhdGlvJywgJ3ByaW1pdGl2ZXVuaXRzJywgJ3InLCAncngnLCAncnknLCAncmFkaXVzJywgJ3JlZngnLCAncmVmeScsICdyZXBlYXRjb3VudCcsICdyZXBlYXRkdXInLCAncmVzdGFydCcsICdyZXN1bHQnLCAncm90YXRlJywgJ3NjYWxlJywgJ3NlZWQnLCAnc2hhcGUtcmVuZGVyaW5nJywgJ3NwZWN1bGFyY29uc3RhbnQnLCAnc3BlY3VsYXJleHBvbmVudCcsICdzcHJlYWRtZXRob2QnLCAnc3RhcnRvZmZzZXQnLCAnc3RkZGV2aWF0aW9uJywgJ3N0aXRjaHRpbGVzJywgJ3N0b3AtY29sb3InLCAnc3RvcC1vcGFjaXR5JywgJ3N0cm9rZS1kYXNoYXJyYXknLCAnc3Ryb2tlLWRhc2hvZmZzZXQnLCAnc3Ryb2tlLWxpbmVjYXAnLCAnc3Ryb2tlLWxpbmVqb2luJywgJ3N0cm9rZS1taXRlcmxpbWl0JywgJ3N0cm9rZS1vcGFjaXR5JywgJ3N0cm9rZScsICdzdHJva2Utd2lkdGgnLCAnc3R5bGUnLCAnc3VyZmFjZXNjYWxlJywgJ3N5c3RlbWxhbmd1YWdlJywgJ3RhYmluZGV4JywgJ3RhcmdldHgnLCAndGFyZ2V0eScsICd0cmFuc2Zvcm0nLCAndGV4dC1hbmNob3InLCAndGV4dC1kZWNvcmF0aW9uJywgJ3RleHQtcmVuZGVyaW5nJywgJ3RleHRsZW5ndGgnLCAndHlwZScsICd1MScsICd1MicsICd1bmljb2RlJywgJ3ZhbHVlcycsICd2aWV3Ym94JywgJ3Zpc2liaWxpdHknLCAndmVyc2lvbicsICd2ZXJ0LWFkdi15JywgJ3ZlcnQtb3JpZ2luLXgnLCAndmVydC1vcmlnaW4teScsICd3aWR0aCcsICd3b3JkLXNwYWNpbmcnLCAnd3JhcCcsICd3cml0aW5nLW1vZGUnLCAneGNoYW5uZWxzZWxlY3RvcicsICd5Y2hhbm5lbHNlbGVjdG9yJywgJ3gnLCAneDEnLCAneDInLCAneG1sbnMnLCAneScsICd5MScsICd5MicsICd6JywgJ3pvb21hbmRwYW4nXSk7XG5cbiAgdmFyIG1hdGhNbCQxID0gZnJlZXplKFsnYWNjZW50JywgJ2FjY2VudHVuZGVyJywgJ2FsaWduJywgJ2JldmVsbGVkJywgJ2Nsb3NlJywgJ2NvbHVtbnNhbGlnbicsICdjb2x1bW5saW5lcycsICdjb2x1bW5zcGFuJywgJ2Rlbm9tYWxpZ24nLCAnZGVwdGgnLCAnZGlyJywgJ2Rpc3BsYXknLCAnZGlzcGxheXN0eWxlJywgJ2VuY29kaW5nJywgJ2ZlbmNlJywgJ2ZyYW1lJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2xhcmdlb3AnLCAnbGVuZ3RoJywgJ2xpbmV0aGlja25lc3MnLCAnbHNwYWNlJywgJ2xxdW90ZScsICdtYXRoYmFja2dyb3VuZCcsICdtYXRoY29sb3InLCAnbWF0aHNpemUnLCAnbWF0aHZhcmlhbnQnLCAnbWF4c2l6ZScsICdtaW5zaXplJywgJ21vdmFibGVsaW1pdHMnLCAnbm90YXRpb24nLCAnbnVtYWxpZ24nLCAnb3BlbicsICdyb3dhbGlnbicsICdyb3dsaW5lcycsICdyb3dzcGFjaW5nJywgJ3Jvd3NwYW4nLCAncnNwYWNlJywgJ3JxdW90ZScsICdzY3JpcHRsZXZlbCcsICdzY3JpcHRtaW5zaXplJywgJ3NjcmlwdHNpemVtdWx0aXBsaWVyJywgJ3NlbGVjdGlvbicsICdzZXBhcmF0b3InLCAnc2VwYXJhdG9ycycsICdzdHJldGNoeScsICdzdWJzY3JpcHRzaGlmdCcsICdzdXBzY3JpcHRzaGlmdCcsICdzeW1tZXRyaWMnLCAndm9mZnNldCcsICd3aWR0aCcsICd4bWxucyddKTtcblxuICB2YXIgeG1sID0gZnJlZXplKFsneGxpbms6aHJlZicsICd4bWw6aWQnLCAneGxpbms6dGl0bGUnLCAneG1sOnNwYWNlJywgJ3htbG5zOnhsaW5rJ10pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL2JldHRlci1yZWdleFxuICB2YXIgTVVTVEFDSEVfRVhQUiA9IHNlYWwoL1xce1xce1tcXHNcXFNdKnxbXFxzXFxTXSpcXH1cXH0vZ20pOyAvLyBTcGVjaWZ5IHRlbXBsYXRlIGRldGVjdGlvbiByZWdleCBmb3IgU0FGRV9GT1JfVEVNUExBVEVTIG1vZGVcbiAgdmFyIEVSQl9FWFBSID0gc2VhbCgvPCVbXFxzXFxTXSp8W1xcc1xcU10qJT4vZ20pO1xuICB2YXIgREFUQV9BVFRSID0gc2VhbCgvXmRhdGEtW1xcLVxcdy5cXHUwMEI3LVxcdUZGRkZdLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgdmFyIEFSSUFfQVRUUiA9IHNlYWwoL15hcmlhLVtcXC1cXHddKyQvKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICB2YXIgSVNfQUxMT1dFRF9VUkkgPSBzZWFsKC9eKD86KD86KD86ZnxodCl0cHM/fG1haWx0b3x0ZWx8Y2FsbHRvfGNpZHx4bXBwKTp8W15hLXpdfFthLXorLlxcLV0rKD86W15hLXorLlxcLTpdfCQpKS9pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgKTtcbiAgdmFyIElTX1NDUklQVF9PUl9EQVRBID0gc2VhbCgvXig/OlxcdytzY3JpcHR8ZGF0YSk6L2kpO1xuICB2YXIgQVRUUl9XSElURVNQQUNFID0gc2VhbCgvW1xcdTAwMDAtXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDAtXFx1MjAyOVxcdTIwNUZcXHUzMDAwXS9nIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29udHJvbC1yZWdleFxuICApO1xuXG4gIHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuICBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkkMShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4gIHZhciBnZXRHbG9iYWwgPSBmdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdztcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5vLW9wIHBvbGljeSBmb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gICAqIERvbid0IGV4cG9ydCB0aGlzIGZ1bmN0aW9uIG91dHNpZGUgdGhpcyBtb2R1bGUhXG4gICAqIEBwYXJhbSB7P1RydXN0ZWRUeXBlUG9saWN5RmFjdG9yeX0gdHJ1c3RlZFR5cGVzIFRoZSBwb2xpY3kgZmFjdG9yeS5cbiAgICogQHBhcmFtIHtEb2N1bWVudH0gZG9jdW1lbnQgVGhlIGRvY3VtZW50IG9iamVjdCAodG8gZGV0ZXJtaW5lIHBvbGljeSBuYW1lIHN1ZmZpeClcbiAgICogQHJldHVybiB7P1RydXN0ZWRUeXBlUG9saWN5fSBUaGUgcG9saWN5IGNyZWF0ZWQgKG9yIG51bGwsIGlmIFRydXN0ZWQgVHlwZXNcbiAgICogYXJlIG5vdCBzdXBwb3J0ZWQpLlxuICAgKi9cbiAgdmFyIF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kgPSBmdW5jdGlvbiBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgZG9jdW1lbnQpIHtcbiAgICBpZiAoKHR5cGVvZiB0cnVzdGVkVHlwZXMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRydXN0ZWRUeXBlcykpICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgdGhlIGNhbGxlcnMgdG8gY29udHJvbCB0aGUgdW5pcXVlIHBvbGljeSBuYW1lXG4gICAgLy8gYnkgYWRkaW5nIGEgZGF0YS10dC1wb2xpY3ktc3VmZml4IHRvIHRoZSBzY3JpcHQgZWxlbWVudCB3aXRoIHRoZSBET01QdXJpZnkuXG4gICAgLy8gUG9saWN5IGNyZWF0aW9uIHdpdGggZHVwbGljYXRlIG5hbWVzIHRocm93cyBpbiBUcnVzdGVkIFR5cGVzLlxuICAgIHZhciBzdWZmaXggPSBudWxsO1xuICAgIHZhciBBVFRSX05BTUUgPSAnZGF0YS10dC1wb2xpY3ktc3VmZml4JztcbiAgICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0Lmhhc0F0dHJpYnV0ZShBVFRSX05BTUUpKSB7XG4gICAgICBzdWZmaXggPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShBVFRSX05BTUUpO1xuICAgIH1cblxuICAgIHZhciBwb2xpY3lOYW1lID0gJ2RvbXB1cmlmeScgKyAoc3VmZml4ID8gJyMnICsgc3VmZml4IDogJycpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5KHBvbGljeU5hbWUsIHtcbiAgICAgICAgY3JlYXRlSFRNTDogZnVuY3Rpb24gY3JlYXRlSFRNTChodG1sJCQxKSB7XG4gICAgICAgICAgcmV0dXJuIGh0bWwkJDE7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIC8vIFBvbGljeSBjcmVhdGlvbiBmYWlsZWQgKG1vc3QgbGlrZWx5IGFub3RoZXIgRE9NUHVyaWZ5IHNjcmlwdCBoYXNcbiAgICAgIC8vIGFscmVhZHkgcnVuKS4gU2tpcCBjcmVhdGluZyB0aGUgcG9saWN5LCBhcyB0aGlzIHdpbGwgb25seSBjYXVzZSBlcnJvcnNcbiAgICAgIC8vIGlmIFRUIGFyZSBlbmZvcmNlZC5cbiAgICAgIGNvbnNvbGUud2FybignVHJ1c3RlZFR5cGVzIHBvbGljeSAnICsgcG9saWN5TmFtZSArICcgY291bGQgbm90IGJlIGNyZWF0ZWQuJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gY3JlYXRlRE9NUHVyaWZ5KCkge1xuICAgIHZhciB3aW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGdldEdsb2JhbCgpO1xuXG4gICAgdmFyIERPTVB1cmlmeSA9IGZ1bmN0aW9uIERPTVB1cmlmeShyb290KSB7XG4gICAgICByZXR1cm4gY3JlYXRlRE9NUHVyaWZ5KHJvb3QpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIGxhYmVsLCBleHBvc2VkIGZvciBlYXNpZXIgY2hlY2tzXG4gICAgICogaWYgRE9NUHVyaWZ5IGlzIHVwIHRvIGRhdGUgb3Igbm90XG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnZlcnNpb24gPSAnMi4xLjEnO1xuXG4gICAgLyoqXG4gICAgICogQXJyYXkgb2YgZWxlbWVudHMgdGhhdCBET01QdXJpZnkgcmVtb3ZlZCBkdXJpbmcgc2FuaXRhdGlvbi5cbiAgICAgKiBFbXB0eSBpZiBub3RoaW5nIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVkID0gW107XG5cbiAgICBpZiAoIXdpbmRvdyB8fCAhd2luZG93LmRvY3VtZW50IHx8IHdpbmRvdy5kb2N1bWVudC5ub2RlVHlwZSAhPT0gOSkge1xuICAgICAgLy8gTm90IHJ1bm5pbmcgaW4gYSBicm93c2VyLCBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCB5b3UgY2FuIHBhc3MgeW91ciBvd24gV2luZG93XG4gICAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSBmYWxzZTtcblxuICAgICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgICB9XG5cbiAgICB2YXIgb3JpZ2luYWxEb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxuICAgIHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbiAgICB2YXIgRG9jdW1lbnRGcmFnbWVudCA9IHdpbmRvdy5Eb2N1bWVudEZyYWdtZW50LFxuICAgICAgICBIVE1MVGVtcGxhdGVFbGVtZW50ID0gd2luZG93LkhUTUxUZW1wbGF0ZUVsZW1lbnQsXG4gICAgICAgIE5vZGUgPSB3aW5kb3cuTm9kZSxcbiAgICAgICAgTm9kZUZpbHRlciA9IHdpbmRvdy5Ob2RlRmlsdGVyLFxuICAgICAgICBfd2luZG93JE5hbWVkTm9kZU1hcCA9IHdpbmRvdy5OYW1lZE5vZGVNYXAsXG4gICAgICAgIE5hbWVkTm9kZU1hcCA9IF93aW5kb3ckTmFtZWROb2RlTWFwID09PSB1bmRlZmluZWQgPyB3aW5kb3cuTmFtZWROb2RlTWFwIHx8IHdpbmRvdy5Nb3pOYW1lZEF0dHJNYXAgOiBfd2luZG93JE5hbWVkTm9kZU1hcCxcbiAgICAgICAgVGV4dCA9IHdpbmRvdy5UZXh0LFxuICAgICAgICBDb21tZW50ID0gd2luZG93LkNvbW1lbnQsXG4gICAgICAgIERPTVBhcnNlciA9IHdpbmRvdy5ET01QYXJzZXIsXG4gICAgICAgIHRydXN0ZWRUeXBlcyA9IHdpbmRvdy50cnVzdGVkVHlwZXM7XG5cbiAgICAvLyBBcyBwZXIgaXNzdWUgIzQ3LCB0aGUgd2ViLWNvbXBvbmVudHMgcmVnaXN0cnkgaXMgaW5oZXJpdGVkIGJ5IGFcbiAgICAvLyBuZXcgZG9jdW1lbnQgY3JlYXRlZCB2aWEgY3JlYXRlSFRNTERvY3VtZW50LiBBcyBwZXIgdGhlIHNwZWNcbiAgICAvLyAoaHR0cDovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL2N1c3RvbS8jY3JlYXRpbmctYW5kLXBhc3NpbmctcmVnaXN0cmllcylcbiAgICAvLyBhIG5ldyBlbXB0eSByZWdpc3RyeSBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgYSB0ZW1wbGF0ZSBjb250ZW50cyBvd25lclxuICAgIC8vIGRvY3VtZW50LCBzbyB3ZSB1c2UgdGhhdCBhcyBvdXIgcGFyZW50IGRvY3VtZW50IHRvIGVuc3VyZSBub3RoaW5nXG4gICAgLy8gaXMgaW5oZXJpdGVkLlxuXG4gICAgaWYgKHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgICAgaWYgKHRlbXBsYXRlLmNvbnRlbnQgJiYgdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGRvY3VtZW50ID0gdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB0cnVzdGVkVHlwZXNQb2xpY3kgPSBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgb3JpZ2luYWxEb2N1bWVudCk7XG4gICAgdmFyIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpIDogJyc7XG5cbiAgICB2YXIgX2RvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgICAgIGltcGxlbWVudGF0aW9uID0gX2RvY3VtZW50LmltcGxlbWVudGF0aW9uLFxuICAgICAgICBjcmVhdGVOb2RlSXRlcmF0b3IgPSBfZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yLFxuICAgICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZSA9IF9kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSxcbiAgICAgICAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCA9IF9kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50O1xuICAgIHZhciBpbXBvcnROb2RlID0gb3JpZ2luYWxEb2N1bWVudC5pbXBvcnROb2RlO1xuXG5cbiAgICB2YXIgZG9jdW1lbnRNb2RlID0ge307XG4gICAgdHJ5IHtcbiAgICAgIGRvY3VtZW50TW9kZSA9IGNsb25lKGRvY3VtZW50KS5kb2N1bWVudE1vZGUgPyBkb2N1bWVudC5kb2N1bWVudE1vZGUgOiB7fTtcbiAgICB9IGNhdGNoIChfKSB7fVxuXG4gICAgdmFyIGhvb2tzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBFeHBvc2Ugd2hldGhlciB0aGlzIGJyb3dzZXIgc3VwcG9ydHMgcnVubmluZyB0aGUgZnVsbCBET01QdXJpZnkuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmlzU3VwcG9ydGVkID0gaW1wbGVtZW50YXRpb24gJiYgdHlwZW9mIGltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnRNb2RlICE9PSA5O1xuXG4gICAgdmFyIE1VU1RBQ0hFX0VYUFIkJDEgPSBNVVNUQUNIRV9FWFBSLFxuICAgICAgICBFUkJfRVhQUiQkMSA9IEVSQl9FWFBSLFxuICAgICAgICBEQVRBX0FUVFIkJDEgPSBEQVRBX0FUVFIsXG4gICAgICAgIEFSSUFfQVRUUiQkMSA9IEFSSUFfQVRUUixcbiAgICAgICAgSVNfU0NSSVBUX09SX0RBVEEkJDEgPSBJU19TQ1JJUFRfT1JfREFUQSxcbiAgICAgICAgQVRUUl9XSElURVNQQUNFJCQxID0gQVRUUl9XSElURVNQQUNFO1xuICAgIHZhciBJU19BTExPV0VEX1VSSSQkMSA9IElTX0FMTE9XRURfVVJJO1xuXG4gICAgLyoqXG4gICAgICogV2UgY29uc2lkZXIgdGhlIGVsZW1lbnRzIGFuZCBhdHRyaWJ1dGVzIGJlbG93IHRvIGJlIHNhZmUuIElkZWFsbHlcbiAgICAgKiBkb24ndCBhZGQgYW55IG5ldyBvbmVzIGJ1dCBmZWVsIGZyZWUgdG8gcmVtb3ZlIHVud2FudGVkIG9uZXMuXG4gICAgICovXG5cbiAgICAvKiBhbGxvd2VkIGVsZW1lbnQgbmFtZXMgKi9cblxuICAgIHZhciBBTExPV0VEX1RBR1MgPSBudWxsO1xuICAgIHZhciBERUZBVUxUX0FMTE9XRURfVEFHUyA9IGFkZFRvU2V0KHt9LCBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5JDEoaHRtbCksIF90b0NvbnN1bWFibGVBcnJheSQxKHN2ZyksIF90b0NvbnN1bWFibGVBcnJheSQxKHN2Z0ZpbHRlcnMpLCBfdG9Db25zdW1hYmxlQXJyYXkkMShtYXRoTWwpLCBfdG9Db25zdW1hYmxlQXJyYXkkMSh0ZXh0KSkpO1xuXG4gICAgLyogQWxsb3dlZCBhdHRyaWJ1dGUgbmFtZXMgKi9cbiAgICB2YXIgQUxMT1dFRF9BVFRSID0gbnVsbDtcbiAgICB2YXIgREVGQVVMVF9BTExPV0VEX0FUVFIgPSBhZGRUb1NldCh7fSwgW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSQxKGh0bWwkMSksIF90b0NvbnN1bWFibGVBcnJheSQxKHN2ZyQxKSwgX3RvQ29uc3VtYWJsZUFycmF5JDEobWF0aE1sJDEpLCBfdG9Db25zdW1hYmxlQXJyYXkkMSh4bWwpKSk7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiB0YWdzIChvdmVycmlkZXMgQUxMT1dFRF9UQUdTL0FERF9UQUdTKSAqL1xuICAgIHZhciBGT1JCSURfVEFHUyA9IG51bGw7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiBhdHRyaWJ1dGVzIChvdmVycmlkZXMgQUxMT1dFRF9BVFRSL0FERF9BVFRSKSAqL1xuICAgIHZhciBGT1JCSURfQVRUUiA9IG51bGw7XG5cbiAgICAvKiBEZWNpZGUgaWYgQVJJQSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgdmFyIEFMTE9XX0FSSUFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgY3VzdG9tIGRhdGEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIHZhciBBTExPV19EQVRBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIHVua25vd24gcHJvdG9jb2xzIGFyZSBva2F5ICovXG4gICAgdmFyIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZm9yIGNvbW1vbiB0ZW1wbGF0ZSBlbmdpbmVzLlxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICAgKi9cbiAgICB2YXIgU0FGRV9GT1JfVEVNUExBVEVTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgZG9jdW1lbnQgd2l0aCA8aHRtbD4uLi4gc2hvdWxkIGJlIHJldHVybmVkICovXG4gICAgdmFyIFdIT0xFX0RPQ1VNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBUcmFjayB3aGV0aGVyIGNvbmZpZyBpcyBhbHJlYWR5IHNldCBvbiB0aGlzIGluc3RhbmNlIG9mIERPTVB1cmlmeS4gKi9cbiAgICB2YXIgU0VUX0NPTkZJRyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGFsbCBlbGVtZW50cyAoZS5nLiBzdHlsZSwgc2NyaXB0KSBtdXN0IGJlIGNoaWxkcmVuIG9mXG4gICAgICogZG9jdW1lbnQuYm9keS4gQnkgZGVmYXVsdCwgYnJvd3NlcnMgbWlnaHQgbW92ZSB0aGVtIHRvIGRvY3VtZW50LmhlYWQgKi9cbiAgICB2YXIgRk9SQ0VfQk9EWSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXG4gICAgICogSWYgYFdIT0xFX0RPQ1VNRU5UYCBpcyBlbmFibGVkIGEgYEhUTUxIdG1sRWxlbWVudGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkXG4gICAgICovXG4gICAgdmFyIFJFVFVSTl9ET00gPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgRG9jdW1lbnRGcmFnbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cbiAgICB2YXIgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogSWYgYFJFVFVSTl9ET01gIG9yIGBSRVRVUk5fRE9NX0ZSQUdNRU5UYCBpcyBlbmFibGVkLCBkZWNpZGUgaWYgdGhlIHJldHVybmVkIERPTVxuICAgICAqIGBOb2RlYCBpcyBpbXBvcnRlZCBpbnRvIHRoZSBjdXJyZW50IGBEb2N1bWVudGAuIElmIHRoaXMgZmxhZyBpcyBub3QgZW5hYmxlZCB0aGVcbiAgICAgKiBgTm9kZWAgd2lsbCBiZWxvbmcgKGl0cyBvd25lckRvY3VtZW50KSB0byBhIGZyZXNoIGBIVE1MRG9jdW1lbnRgLCBjcmVhdGVkIGJ5XG4gICAgICogRE9NUHVyaWZ5LiAqL1xuICAgIHZhciBSRVRVUk5fRE9NX0lNUE9SVCA9IGZhbHNlO1xuXG4gICAgLyogVHJ5IHRvIHJldHVybiBhIFRydXN0ZWQgVHlwZSBvYmplY3QgaW5zdGVhZCBvZiBhIHN0cmluZywgcmV0dXJuIGEgc3RyaW5nIGluXG4gICAgICogY2FzZSBUcnVzdGVkIFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkICAqL1xuICAgIHZhciBSRVRVUk5fVFJVU1RFRF9UWVBFID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIGZyZWUgZnJvbSBET00gY2xvYmJlcmluZyBhdHRhY2tzPyAqL1xuICAgIHZhciBTQU5JVElaRV9ET00gPSB0cnVlO1xuXG4gICAgLyogS2VlcCBlbGVtZW50IGNvbnRlbnQgd2hlbiByZW1vdmluZyBlbGVtZW50PyAqL1xuICAgIHZhciBLRUVQX0NPTlRFTlQgPSB0cnVlO1xuXG4gICAgLyogSWYgYSBgTm9kZWAgaXMgcGFzc2VkIHRvIHNhbml0aXplKCksIHRoZW4gcGVyZm9ybXMgc2FuaXRpemF0aW9uIGluLXBsYWNlIGluc3RlYWRcbiAgICAgKiBvZiBpbXBvcnRpbmcgaXQgaW50byBhIG5ldyBEb2N1bWVudCBhbmQgcmV0dXJuaW5nIGEgc2FuaXRpemVkIGNvcHkgKi9cbiAgICB2YXIgSU5fUExBQ0UgPSBmYWxzZTtcblxuICAgIC8qIEFsbG93IHVzYWdlIG9mIHByb2ZpbGVzIGxpa2UgaHRtbCwgc3ZnIGFuZCBtYXRoTWwgKi9cbiAgICB2YXIgVVNFX1BST0ZJTEVTID0ge307XG5cbiAgICAvKiBUYWdzIHRvIGlnbm9yZSBjb250ZW50IG9mIHdoZW4gS0VFUF9DT05URU5UIGlzIHRydWUgKi9cbiAgICB2YXIgRk9SQklEX0NPTlRFTlRTID0gYWRkVG9TZXQoe30sIFsnYW5ub3RhdGlvbi14bWwnLCAnYXVkaW8nLCAnY29sZ3JvdXAnLCAnZGVzYycsICdmb3JlaWdub2JqZWN0JywgJ2hlYWQnLCAnaWZyYW1lJywgJ21hdGgnLCAnbWknLCAnbW4nLCAnbW8nLCAnbXMnLCAnbXRleHQnLCAnbm9lbWJlZCcsICdub2ZyYW1lcycsICdwbGFpbnRleHQnLCAnc2NyaXB0JywgJ3N0eWxlJywgJ3N2ZycsICd0ZW1wbGF0ZScsICd0aGVhZCcsICd0aXRsZScsICd2aWRlbycsICd4bXAnXSk7XG5cbiAgICAvKiBUYWdzIHRoYXQgYXJlIHNhZmUgZm9yIGRhdGE6IFVSSXMgKi9cbiAgICB2YXIgREFUQV9VUklfVEFHUyA9IG51bGw7XG4gICAgdmFyIERFRkFVTFRfREFUQV9VUklfVEFHUyA9IGFkZFRvU2V0KHt9LCBbJ2F1ZGlvJywgJ3ZpZGVvJywgJ2ltZycsICdzb3VyY2UnLCAnaW1hZ2UnLCAndHJhY2snXSk7XG5cbiAgICAvKiBBdHRyaWJ1dGVzIHNhZmUgZm9yIHZhbHVlcyBsaWtlIFwiamF2YXNjcmlwdDpcIiAqL1xuICAgIHZhciBVUklfU0FGRV9BVFRSSUJVVEVTID0gbnVsbDtcbiAgICB2YXIgREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTID0gYWRkVG9TZXQoe30sIFsnYWx0JywgJ2NsYXNzJywgJ2ZvcicsICdpZCcsICdsYWJlbCcsICduYW1lJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAnc3VtbWFyeScsICd0aXRsZScsICd2YWx1ZScsICdzdHlsZScsICd4bWxucyddKTtcblxuICAgIC8qIEtlZXAgYSByZWZlcmVuY2UgdG8gY29uZmlnIHRvIHBhc3MgdG8gaG9va3MgKi9cbiAgICB2YXIgQ09ORklHID0gbnVsbDtcblxuICAgIC8qIElkZWFsbHksIGRvIG5vdCB0b3VjaCBhbnl0aGluZyBiZWxvdyB0aGlzIGxpbmUgKi9cbiAgICAvKiBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fICovXG5cbiAgICB2YXIgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cbiAgICAvKipcbiAgICAgKiBfcGFyc2VDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY2ZnIG9wdGlvbmFsIGNvbmZpZyBsaXRlcmFsXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICB2YXIgX3BhcnNlQ29uZmlnID0gZnVuY3Rpb24gX3BhcnNlQ29uZmlnKGNmZykge1xuICAgICAgaWYgKENPTkZJRyAmJiBDT05GSUcgPT09IGNmZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8qIFNoaWVsZCBjb25maWd1cmF0aW9uIG9iamVjdCBmcm9tIHRhbXBlcmluZyAqL1xuICAgICAgaWYgKCFjZmcgfHwgKHR5cGVvZiBjZmcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGNmZykpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjZmcgPSB7fTtcbiAgICAgIH1cblxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gcHJvdG90eXBlIHBvbGx1dGlvbiAqL1xuICAgICAgY2ZnID0gY2xvbmUoY2ZnKTtcblxuICAgICAgLyogU2V0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgICAgQUxMT1dFRF9UQUdTID0gJ0FMTE9XRURfVEFHUycgaW4gY2ZnID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX1RBR1MpIDogREVGQVVMVF9BTExPV0VEX1RBR1M7XG4gICAgICBBTExPV0VEX0FUVFIgPSAnQUxMT1dFRF9BVFRSJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUikgOiBERUZBVUxUX0FMTE9XRURfQVRUUjtcbiAgICAgIFVSSV9TQUZFX0FUVFJJQlVURVMgPSAnQUREX1VSSV9TQUZFX0FUVFInIGluIGNmZyA/IGFkZFRvU2V0KGNsb25lKERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyksIGNmZy5BRERfVVJJX1NBRkVfQVRUUikgOiBERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVM7XG4gICAgICBEQVRBX1VSSV9UQUdTID0gJ0FERF9EQVRBX1VSSV9UQUdTJyBpbiBjZmcgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX0RBVEFfVVJJX1RBR1MpLCBjZmcuQUREX0RBVEFfVVJJX1RBR1MpIDogREVGQVVMVF9EQVRBX1VSSV9UQUdTO1xuICAgICAgRk9SQklEX1RBR1MgPSAnRk9SQklEX1RBR1MnIGluIGNmZyA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX1RBR1MpIDoge307XG4gICAgICBGT1JCSURfQVRUUiA9ICdGT1JCSURfQVRUUicgaW4gY2ZnID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQVRUUikgOiB7fTtcbiAgICAgIFVTRV9QUk9GSUxFUyA9ICdVU0VfUFJPRklMRVMnIGluIGNmZyA/IGNmZy5VU0VfUFJPRklMRVMgOiBmYWxzZTtcbiAgICAgIEFMTE9XX0FSSUFfQVRUUiA9IGNmZy5BTExPV19BUklBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGNmZy5BTExPV19EQVRBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gY2ZnLkFMTE9XX1VOS05PV05fUFJPVE9DT0xTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBTQUZFX0ZPUl9URU1QTEFURVMgPSBjZmcuU0FGRV9GT1JfVEVNUExBVEVTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBXSE9MRV9ET0NVTUVOVCA9IGNmZy5XSE9MRV9ET0NVTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTSA9IGNmZy5SRVRVUk5fRE9NIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gY2ZnLlJFVFVSTl9ET01fRlJBR01FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9ET01fSU1QT1JUID0gY2ZnLlJFVFVSTl9ET01fSU1QT1JUIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fVFJVU1RFRF9UWVBFID0gY2ZnLlJFVFVSTl9UUlVTVEVEX1RZUEUgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEZPUkNFX0JPRFkgPSBjZmcuRk9SQ0VfQk9EWSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgU0FOSVRJWkVfRE9NID0gY2ZnLlNBTklUSVpFX0RPTSAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgS0VFUF9DT05URU5UID0gY2ZnLktFRVBfQ09OVEVOVCAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgSU5fUExBQ0UgPSBjZmcuSU5fUExBQ0UgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIElTX0FMTE9XRURfVVJJJCQxID0gY2ZnLkFMTE9XRURfVVJJX1JFR0VYUCB8fCBJU19BTExPV0VEX1VSSSQkMTtcbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgQUxMT1dfREFUQV9BVFRSID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgIFJFVFVSTl9ET00gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBQYXJzZSBwcm9maWxlIGluZm8gKi9cbiAgICAgIGlmIChVU0VfUFJPRklMRVMpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkkMSh0ZXh0KSkpO1xuICAgICAgICBBTExPV0VEX0FUVFIgPSBbXTtcbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5odG1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBodG1sKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGh0bWwkMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2ZyQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2Z0ZpbHRlcnMgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIHN2Z0ZpbHRlcnMpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMubWF0aE1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBtYXRoTWwpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgbWF0aE1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBNZXJnZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIGlmIChjZmcuQUREX1RBR1MpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfVEFHUyA9PT0gREVGQVVMVF9BTExPV0VEX1RBR1MpIHtcbiAgICAgICAgICBBTExPV0VEX1RBR1MgPSBjbG9uZShBTExPV0VEX1RBR1MpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBjZmcuQUREX1RBR1MpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ZnLkFERF9BVFRSKSB7XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIgPT09IERFRkFVTFRfQUxMT1dFRF9BVFRSKSB7XG4gICAgICAgICAgQUxMT1dFRF9BVFRSID0gY2xvbmUoQUxMT1dFRF9BVFRSKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgY2ZnLkFERF9BVFRSKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNmZy5BRERfVVJJX1NBRkVfQVRUUikge1xuICAgICAgICBhZGRUb1NldChVUklfU0FGRV9BVFRSSUJVVEVTLCBjZmcuQUREX1VSSV9TQUZFX0FUVFIpO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgI3RleHQgaW4gY2FzZSBLRUVQX0NPTlRFTlQgaXMgc2V0IHRvIHRydWUgKi9cbiAgICAgIGlmIChLRUVQX0NPTlRFTlQpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTWycjdGV4dCddID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkIGh0bWwsIGhlYWQgYW5kIGJvZHkgdG8gQUxMT1dFRF9UQUdTIGluIGNhc2UgV0hPTEVfRE9DVU1FTlQgaXMgdHJ1ZSAqL1xuICAgICAgaWYgKFdIT0xFX0RPQ1VNRU5UKSB7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgWydodG1sJywgJ2hlYWQnLCAnYm9keSddKTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkIHRib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIHRhYmxlcyBhcmUgcGVybWl0dGVkLCBzZWUgIzI4NiwgIzM2NSAqL1xuICAgICAgaWYgKEFMTE9XRURfVEFHUy50YWJsZSkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsndGJvZHknXSk7XG4gICAgICAgIGRlbGV0ZSBGT1JCSURfVEFHUy50Ym9keTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudCBmdXJ0aGVyIG1hbmlwdWxhdGlvbiBvZiBjb25maWd1cmF0aW9uLlxuICAgICAgLy8gTm90IGF2YWlsYWJsZSBpbiBJRTgsIFNhZmFyaSA1LCBldGMuXG4gICAgICBpZiAoZnJlZXplKSB7XG4gICAgICAgIGZyZWV6ZShjZmcpO1xuICAgICAgfVxuXG4gICAgICBDT05GSUcgPSBjZmc7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9mb3JjZVJlbW92ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBhIERPTSBub2RlXG4gICAgICovXG4gICAgdmFyIF9mb3JjZVJlbW92ZSA9IGZ1bmN0aW9uIF9mb3JjZVJlbW92ZShub2RlKSB7XG4gICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHsgZWxlbWVudDogbm9kZSB9KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgbm9kZS5vdXRlckhUTUwgPSBlbXB0eUhUTUw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9yZW1vdmVBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBhbiBBdHRyaWJ1dGUgbmFtZVxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuICAgIHZhciBfcmVtb3ZlQXR0cmlidXRlID0gZnVuY3Rpb24gX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBub2RlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG5vZGUuZ2V0QXR0cmlidXRlTm9kZShuYW1lKSxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG51bGwsXG4gICAgICAgICAgZnJvbTogbm9kZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pbml0RG9jdW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZGlydHkgYSBzdHJpbmcgb2YgZGlydHkgbWFya3VwXG4gICAgICogQHJldHVybiB7RG9jdW1lbnR9IGEgRE9NLCBmaWxsZWQgd2l0aCB0aGUgZGlydHkgbWFya3VwXG4gICAgICovXG4gICAgdmFyIF9pbml0RG9jdW1lbnQgPSBmdW5jdGlvbiBfaW5pdERvY3VtZW50KGRpcnR5KSB7XG4gICAgICAvKiBDcmVhdGUgYSBIVE1MIGRvY3VtZW50ICovXG4gICAgICB2YXIgZG9jID0gdm9pZCAwO1xuICAgICAgdmFyIGxlYWRpbmdXaGl0ZXNwYWNlID0gdm9pZCAwO1xuXG4gICAgICBpZiAoRk9SQ0VfQk9EWSkge1xuICAgICAgICBkaXJ0eSA9ICc8cmVtb3ZlPjwvcmVtb3ZlPicgKyBkaXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIElmIEZPUkNFX0JPRFkgaXNuJ3QgdXNlZCwgbGVhZGluZyB3aGl0ZXNwYWNlIG5lZWRzIHRvIGJlIHByZXNlcnZlZCBtYW51YWxseSAqL1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IHN0cmluZ01hdGNoKGRpcnR5LCAvXltcXHJcXG5cXHQgXSsvKTtcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2UgPSBtYXRjaGVzICYmIG1hdGNoZXNbMF07XG4gICAgICB9XG5cbiAgICAgIHZhciBkaXJ0eVBheWxvYWQgPSB0cnVzdGVkVHlwZXNQb2xpY3kgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgIC8qIFVzZSB0aGUgRE9NUGFyc2VyIEFQSSBieSBkZWZhdWx0LCBmYWxsYmFjayBsYXRlciBpZiBuZWVkcyBiZSAqL1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkaXJ0eVBheWxvYWQsICd0ZXh0L2h0bWwnKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHt9XG5cbiAgICAgIC8qIFVzZSBjcmVhdGVIVE1MRG9jdW1lbnQgaW4gY2FzZSBET01QYXJzZXIgaXMgbm90IGF2YWlsYWJsZSAqL1xuICAgICAgaWYgKCFkb2MgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgZG9jID0gaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCcnKTtcbiAgICAgICAgdmFyIF9kb2MgPSBkb2MsXG4gICAgICAgICAgICBib2R5ID0gX2RvYy5ib2R5O1xuXG4gICAgICAgIGJvZHkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChib2R5LnBhcmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpO1xuICAgICAgICBib2R5Lm91dGVySFRNTCA9IGRpcnR5UGF5bG9hZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRpcnR5ICYmIGxlYWRpbmdXaGl0ZXNwYWNlKSB7XG4gICAgICAgIGRvYy5ib2R5Lmluc2VydEJlZm9yZShkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsZWFkaW5nV2hpdGVzcGFjZSksIGRvYy5ib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIC8qIFdvcmsgb24gd2hvbGUgZG9jdW1lbnQgb3IganVzdCBpdHMgYm9keSAqL1xuICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlUYWdOYW1lLmNhbGwoZG9jLCBXSE9MRV9ET0NVTUVOVCA/ICdodG1sJyA6ICdib2R5JylbMF07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9jcmVhdGVJdGVyYXRvclxuICAgICAqXG4gICAgICogQHBhcmFtICB7RG9jdW1lbnR9IHJvb3QgZG9jdW1lbnQvZnJhZ21lbnQgdG8gY3JlYXRlIGl0ZXJhdG9yIGZvclxuICAgICAqIEByZXR1cm4ge0l0ZXJhdG9yfSBpdGVyYXRvciBpbnN0YW5jZVxuICAgICAqL1xuICAgIHZhciBfY3JlYXRlSXRlcmF0b3IgPSBmdW5jdGlvbiBfY3JlYXRlSXRlcmF0b3Iocm9vdCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU5vZGVJdGVyYXRvci5jYWxsKHJvb3Qub3duZXJEb2N1bWVudCB8fCByb290LCByb290LCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVDtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzQ2xvYmJlcmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBlbG0gZWxlbWVudCB0byBjaGVjayBmb3IgY2xvYmJlcmluZyBhdHRhY2tzXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBjbG9iYmVyZWQsIGZhbHNlIGlmIHNhZmVcbiAgICAgKi9cbiAgICB2YXIgX2lzQ2xvYmJlcmVkID0gZnVuY3Rpb24gX2lzQ2xvYmJlcmVkKGVsbSkge1xuICAgICAgaWYgKGVsbSBpbnN0YW5jZW9mIFRleHQgfHwgZWxtIGluc3RhbmNlb2YgQ29tbWVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZWxtLm5vZGVOYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnJlbW92ZUNoaWxkICE9PSAnZnVuY3Rpb24nIHx8ICEoZWxtLmF0dHJpYnV0ZXMgaW5zdGFuY2VvZiBOYW1lZE5vZGVNYXApIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uc2V0QXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0ubmFtZXNwYWNlVVJJICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNOb2RlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBvYmogb2JqZWN0IHRvIGNoZWNrIHdoZXRoZXIgaXQncyBhIERPTSBub2RlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpcyBvYmplY3QgaXMgYSBET00gbm9kZVxuICAgICAqL1xuICAgIHZhciBfaXNOb2RlID0gZnVuY3Rpb24gX2lzTm9kZShvYmplY3QpIHtcbiAgICAgIHJldHVybiAodHlwZW9mIE5vZGUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKE5vZGUpKSA9PT0gJ29iamVjdCcgPyBvYmplY3QgaW5zdGFuY2VvZiBOb2RlIDogb2JqZWN0ICYmICh0eXBlb2Ygb2JqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmplY3QpKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iamVjdC5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG9iamVjdC5ub2RlTmFtZSA9PT0gJ3N0cmluZyc7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9leGVjdXRlSG9va1xuICAgICAqIEV4ZWN1dGUgdXNlciBjb25maWd1cmFibGUgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCAgTmFtZSBvZiB0aGUgaG9vaydzIGVudHJ5IHBvaW50XG4gICAgICogQHBhcmFtICB7Tm9kZX0gY3VycmVudE5vZGUgbm9kZSB0byB3b3JrIG9uIHdpdGggdGhlIGhvb2tcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgYWRkaXRpb25hbCBob29rIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICB2YXIgX2V4ZWN1dGVIb29rID0gZnVuY3Rpb24gX2V4ZWN1dGVIb29rKGVudHJ5UG9pbnQsIGN1cnJlbnROb2RlLCBkYXRhKSB7XG4gICAgICBpZiAoIWhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXJyYXlGb3JFYWNoKGhvb2tzW2VudHJ5UG9pbnRdLCBmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVFbGVtZW50c1xuICAgICAqXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCB0ZXh0Q29udGVudFxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUNoaWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gY2hlY2sgZm9yIHBlcm1pc3Npb24gdG8gZXhpc3RcbiAgICAgKiBAcmV0dXJuICB7Qm9vbGVhbn0gdHJ1ZSBpZiBub2RlIHdhcyBraWxsZWQsIGZhbHNlIGlmIGxlZnQgYWxpdmVcbiAgICAgKi9cbiAgICB2YXIgX3Nhbml0aXplRWxlbWVudHMgPSBmdW5jdGlvbiBfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSB2b2lkIDA7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cbiAgICAgIGlmIChfaXNDbG9iYmVyZWQoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayBpZiB0YWduYW1lIGNvbnRhaW5zIFVuaWNvZGUgKi9cbiAgICAgIGlmIChzdHJpbmdNYXRjaChjdXJyZW50Tm9kZS5ub2RlTmFtZSwgL1tcXHUwMDgwLVxcdUZGRkZdLykpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE5vdyBsZXQncyBjaGVjayB0aGUgZWxlbWVudCdzIHR5cGUgYW5kIG5hbWUgKi9cbiAgICAgIHZhciB0YWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBjdXJyZW50Tm9kZSwge1xuICAgICAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgICAgICBhbGxvd2VkVGFnczogQUxMT1dFRF9UQUdTXG4gICAgICB9KTtcblxuICAgICAgLyogVGFrZSBjYXJlIG9mIGFuIG1YU1MgcGF0dGVybiB1c2luZyBwLCBiciBpbnNpZGUgc3ZnLCBtYXRoICovXG4gICAgICBpZiAoKHRhZ05hbWUgPT09ICdzdmcnIHx8IHRhZ05hbWUgPT09ICdtYXRoJykgJiYgY3VycmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgncCwgYnInKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIERldGVjdCBtWFNTIGF0dGVtcHRzIGFidXNpbmcgbmFtZXNwYWNlIGNvbmZ1c2lvbiAqL1xuICAgICAgaWYgKCFfaXNOb2RlKGN1cnJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSAmJiAoIV9pc05vZGUoY3VycmVudE5vZGUuY29udGVudCkgfHwgIV9pc05vZGUoY3VycmVudE5vZGUuY29udGVudC5maXJzdEVsZW1lbnRDaGlsZCkpICYmIHJlZ0V4cFRlc3QoLzxbIS9cXHddL2csIGN1cnJlbnROb2RlLmlubmVySFRNTCkgJiYgcmVnRXhwVGVzdCgvPFshL1xcd10vZywgY3VycmVudE5vZGUudGV4dENvbnRlbnQpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBSZW1vdmUgZWxlbWVudCBpZiBhbnl0aGluZyBmb3JiaWRzIGl0cyBwcmVzZW5jZSAqL1xuICAgICAgaWYgKCFBTExPV0VEX1RBR1NbdGFnTmFtZV0gfHwgRk9SQklEX1RBR1NbdGFnTmFtZV0pIHtcbiAgICAgICAgLyogS2VlcCBjb250ZW50IGV4Y2VwdCBmb3IgYmFkLWxpc3RlZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoS0VFUF9DT05URU5UICYmICFGT1JCSURfQ09OVEVOVFNbdGFnTmFtZV0gJiYgdHlwZW9mIGN1cnJlbnROb2RlLmluc2VydEFkamFjZW50SFRNTCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgaHRtbFRvSW5zZXJ0ID0gY3VycmVudE5vZGUuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY3VycmVudE5vZGUuaW5zZXJ0QWRqYWNlbnRIVE1MKCdBZnRlckVuZCcsIHRydXN0ZWRUeXBlc1BvbGljeSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGh0bWxUb0luc2VydCkgOiBodG1sVG9JbnNlcnQpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIH1cblxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogUmVtb3ZlIGluIGNhc2UgYSBub3NjcmlwdC9ub2VtYmVkIFhTUyBpcyBzdXNwZWN0ZWQgKi9cbiAgICAgIGlmICgodGFnTmFtZSA9PT0gJ25vc2NyaXB0JyB8fCB0YWdOYW1lID09PSAnbm9lbWJlZCcpICYmIHJlZ0V4cFRlc3QoLzxcXC9ubyhzY3JpcHR8ZW1iZWQpL2ksIGN1cnJlbnROb2RlLmlubmVySFRNTCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFNhbml0aXplIGVsZW1lbnQgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTICYmIGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIC8qIEdldCB0aGUgZWxlbWVudCdzIHRleHQgY29udGVudCAqL1xuICAgICAgICBjb250ZW50ID0gY3VycmVudE5vZGUudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnRlbnQgPSBzdHJpbmdSZXBsYWNlKGNvbnRlbnQsIE1VU1RBQ0hFX0VYUFIkJDEsICcgJyk7XG4gICAgICAgIGNvbnRlbnQgPSBzdHJpbmdSZXBsYWNlKGNvbnRlbnQsIEVSQl9FWFBSJCQxLCAnICcpO1xuICAgICAgICBpZiAoY3VycmVudE5vZGUudGV4dENvbnRlbnQgIT09IGNvbnRlbnQpIHtcbiAgICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHsgZWxlbWVudDogY3VycmVudE5vZGUuY2xvbmVOb2RlKCkgfSk7XG4gICAgICAgICAgY3VycmVudE5vZGUudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZUVsZW1lbnRzJywgY3VycmVudE5vZGUsIG51bGwpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc1ZhbGlkQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjVGFnIExvd2VyY2FzZSB0YWcgbmFtZSBvZiBjb250YWluaW5nIGVsZW1lbnQuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBsY05hbWUgTG93ZXJjYXNlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIHZhbGlkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICB2YXIgX2lzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkge1xuICAgICAgLyogTWFrZSBzdXJlIGF0dHJpYnV0ZSBjYW5ub3QgY2xvYmJlciAqL1xuICAgICAgaWYgKFNBTklUSVpFX0RPTSAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSAmJiAodmFsdWUgaW4gZG9jdW1lbnQgfHwgdmFsdWUgaW4gZm9ybUVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLyogQWxsb3cgdmFsaWQgZGF0YS0qIGF0dHJpYnV0ZXM6IEF0IGxlYXN0IG9uZSBjaGFyYWN0ZXIgYWZ0ZXIgXCItXCJcbiAgICAgICAgICAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZG9tLmh0bWwjZW1iZWRkaW5nLWN1c3RvbS1ub24tdmlzaWJsZS1kYXRhLXdpdGgtdGhlLWRhdGEtKi1hdHRyaWJ1dGVzKVxuICAgICAgICAgIFhNTC1jb21wYXRpYmxlIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI3htbC1jb21wYXRpYmxlIGFuZCBodHRwOi8vd3d3LnczLm9yZy9UUi94bWwvI2QwZTgwNClcbiAgICAgICAgICBXZSBkb24ndCBuZWVkIHRvIGNoZWNrIHRoZSB2YWx1ZTsgaXQncyBhbHdheXMgVVJJIHNhZmUuICovXG4gICAgICBpZiAoQUxMT1dfREFUQV9BVFRSICYmIHJlZ0V4cFRlc3QoREFUQV9BVFRSJCQxLCBsY05hbWUpKSA7IGVsc2UgaWYgKEFMTE9XX0FSSUFfQVRUUiAmJiByZWdFeHBUZXN0KEFSSUFfQVRUUiQkMSwgbGNOYW1lKSkgOyBlbHNlIGlmICghQUxMT1dFRF9BVFRSW2xjTmFtZV0gfHwgRk9SQklEX0FUVFJbbGNOYW1lXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLyogQ2hlY2sgdmFsdWUgaXMgc2FmZS4gRmlyc3QsIGlzIGF0dHIgaW5lcnQ/IElmIHNvLCBpcyBzYWZlICovXG4gICAgICB9IGVsc2UgaWYgKFVSSV9TQUZFX0FUVFJJQlVURVNbbGNOYW1lXSkgOyBlbHNlIGlmIChyZWdFeHBUZXN0KElTX0FMTE9XRURfVVJJJCQxLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UkJDEsICcnKSkpIDsgZWxzZSBpZiAoKGxjTmFtZSA9PT0gJ3NyYycgfHwgbGNOYW1lID09PSAneGxpbms6aHJlZicgfHwgbGNOYW1lID09PSAnaHJlZicpICYmIGxjVGFnICE9PSAnc2NyaXB0JyAmJiBzdHJpbmdJbmRleE9mKHZhbHVlLCAnZGF0YTonKSA9PT0gMCAmJiBEQVRBX1VSSV9UQUdTW2xjVGFnXSkgOyBlbHNlIGlmIChBTExPV19VTktOT1dOX1BST1RPQ09MUyAmJiAhcmVnRXhwVGVzdChJU19TQ1JJUFRfT1JfREFUQSQkMSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFJCQxLCAnJykpKSA7IGVsc2UgaWYgKCF2YWx1ZSkgOyBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplQXR0cmlidXRlc1xuICAgICAqXG4gICAgICogQHByb3RlY3QgYXR0cmlidXRlc1xuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgcmVtb3ZlQXR0cmlidXRlXG4gICAgICogQHByb3RlY3Qgc2V0QXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxuICAgICAqL1xuICAgIHZhciBfc2FuaXRpemVBdHRyaWJ1dGVzID0gZnVuY3Rpb24gX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSkge1xuICAgICAgdmFyIGF0dHIgPSB2b2lkIDA7XG4gICAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gICAgICB2YXIgbGNOYW1lID0gdm9pZCAwO1xuICAgICAgdmFyIGwgPSB2b2lkIDA7XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBjdXJyZW50Tm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGF0dHJpYnV0ZXM7IGlmIG5vdCB3ZSBtaWdodCBoYXZlIGEgdGV4dCBub2RlICovXG5cbiAgICAgIGlmICghYXR0cmlidXRlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBob29rRXZlbnQgPSB7XG4gICAgICAgIGF0dHJOYW1lOiAnJyxcbiAgICAgICAgYXR0clZhbHVlOiAnJyxcbiAgICAgICAga2VlcEF0dHI6IHRydWUsXG4gICAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzOiBBTExPV0VEX0FUVFJcbiAgICAgIH07XG4gICAgICBsID0gYXR0cmlidXRlcy5sZW5ndGg7XG5cbiAgICAgIC8qIEdvIGJhY2t3YXJkcyBvdmVyIGFsbCBhdHRyaWJ1dGVzOyBzYWZlbHkgcmVtb3ZlIGJhZCBvbmVzICovXG4gICAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgIGF0dHIgPSBhdHRyaWJ1dGVzW2xdO1xuICAgICAgICB2YXIgX2F0dHIgPSBhdHRyLFxuICAgICAgICAgICAgbmFtZSA9IF9hdHRyLm5hbWUsXG4gICAgICAgICAgICBuYW1lc3BhY2VVUkkgPSBfYXR0ci5uYW1lc3BhY2VVUkk7XG5cbiAgICAgICAgdmFsdWUgPSBzdHJpbmdUcmltKGF0dHIudmFsdWUpO1xuICAgICAgICBsY05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShuYW1lKTtcblxuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIGhvb2tFdmVudC5hdHRyTmFtZSA9IGxjTmFtZTtcbiAgICAgICAgaG9va0V2ZW50LmF0dHJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBob29rRXZlbnQua2VlcEF0dHIgPSB0cnVlO1xuICAgICAgICBob29rRXZlbnQuZm9yY2VLZWVwQXR0ciA9IHVuZGVmaW5lZDsgLy8gQWxsb3dzIGRldmVsb3BlcnMgdG8gc2VlIHRoaXMgaXMgYSBwcm9wZXJ0eSB0aGV5IGNhbiBzZXRcbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVBdHRyaWJ1dGUnLCBjdXJyZW50Tm9kZSwgaG9va0V2ZW50KTtcbiAgICAgICAgdmFsdWUgPSBob29rRXZlbnQuYXR0clZhbHVlO1xuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmUgYXR0cmlidXRlICovXG4gICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoIWhvb2tFdmVudC5rZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogV29yayBhcm91bmQgYSBzZWN1cml0eSBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgICAgIGlmIChyZWdFeHBUZXN0KC9cXC8+L2ksIHZhbHVlKSkge1xuICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2FuaXRpemUgYXR0cmlidXRlIGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBNVVNUQUNIRV9FWFBSJCQxLCAnICcpO1xuICAgICAgICAgIHZhbHVlID0gc3RyaW5nUmVwbGFjZSh2YWx1ZSwgRVJCX0VYUFIkJDEsICcgJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBJcyBgdmFsdWVgIHZhbGlkIGZvciB0aGlzIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgdmFyIGxjVGFnID0gY3VycmVudE5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCFfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEhhbmRsZSBpbnZhbGlkIGRhdGEtKiBhdHRyaWJ1dGUgc2V0IGJ5IHRyeS1jYXRjaGluZyBpdCAqL1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChuYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKiBGYWxsYmFjayB0byBzZXRBdHRyaWJ1dGUoKSBmb3IgYnJvd3Nlci11bnJlY29nbml6ZWQgbmFtZXNwYWNlcyBlLmcuIFwieC1zY2hlbWFcIi4gKi9cbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXJyYXlQb3AoRE9NUHVyaWZ5LnJlbW92ZWQpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVTaGFkb3dET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdtZW50IHRvIGl0ZXJhdGUgb3ZlciByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIHZhciBfc2FuaXRpemVTaGFkb3dET00gPSBmdW5jdGlvbiBfc2FuaXRpemVTaGFkb3dET00oZnJhZ21lbnQpIHtcbiAgICAgIHZhciBzaGFkb3dOb2RlID0gdm9pZCAwO1xuICAgICAgdmFyIHNoYWRvd0l0ZXJhdG9yID0gX2NyZWF0ZUl0ZXJhdG9yKGZyYWdtZW50KTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcblxuICAgICAgd2hpbGUgKHNoYWRvd05vZGUgPSBzaGFkb3dJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVTaGFkb3dOb2RlJywgc2hhZG93Tm9kZSwgbnVsbCk7XG5cbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKHNoYWRvd05vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBEZWVwIHNoYWRvdyBET00gZGV0ZWN0ZWQgKi9cbiAgICAgICAgaWYgKHNoYWRvd05vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oc2hhZG93Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKHNoYWRvd05vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNhbml0aXplXG4gICAgICogUHVibGljIG1ldGhvZCBwcm92aWRpbmcgY29yZSBzYW5pdGF0aW9uIGZ1bmN0aW9uYWxpdHlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE5vZGV9IGRpcnR5IHN0cmluZyBvciBET00gbm9kZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgRE9NUHVyaWZ5LnNhbml0aXplID0gZnVuY3Rpb24gKGRpcnR5LCBjZmcpIHtcbiAgICAgIHZhciBib2R5ID0gdm9pZCAwO1xuICAgICAgdmFyIGltcG9ydGVkTm9kZSA9IHZvaWQgMDtcbiAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHZvaWQgMDtcbiAgICAgIHZhciBvbGROb2RlID0gdm9pZCAwO1xuICAgICAgdmFyIHJldHVybk5vZGUgPSB2b2lkIDA7XG4gICAgICAvKiBNYWtlIHN1cmUgd2UgaGF2ZSBhIHN0cmluZyB0byBzYW5pdGl6ZS5cbiAgICAgICAgRE8gTk9UIHJldHVybiBlYXJseSwgYXMgdGhpcyB3aWxsIHJldHVybiB0aGUgd3JvbmcgdHlwZSBpZlxuICAgICAgICB0aGUgdXNlciBoYXMgcmVxdWVzdGVkIGEgRE9NIG9iamVjdCByYXRoZXIgdGhhbiBhIHN0cmluZyAqL1xuICAgICAgaWYgKCFkaXJ0eSkge1xuICAgICAgICBkaXJ0eSA9ICc8IS0tPic7XG4gICAgICB9XG5cbiAgICAgIC8qIFN0cmluZ2lmeSwgaW4gY2FzZSBkaXJ0eSBpcyBhbiBvYmplY3QgKi9cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnICYmICFfaXNOb2RlKGRpcnR5KSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVnYXRlZC1jb25kaXRpb25cbiAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgndG9TdHJpbmcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXJ0eSA9IGRpcnR5LnRvU3RyaW5nKCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnZGlydHkgaXMgbm90IGEgc3RyaW5nLCBhYm9ydGluZycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayB3ZSBjYW4gcnVuLiBPdGhlcndpc2UgZmFsbCBiYWNrIG9yIGlnbm9yZSAqL1xuICAgICAgaWYgKCFET01QdXJpZnkuaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgaWYgKF90eXBlb2Yod2luZG93LnRvU3RhdGljSFRNTCkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB3aW5kb3cudG9TdGF0aWNIVE1MID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cudG9TdGF0aWNIVE1MKGRpcnR5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2lzTm9kZShkaXJ0eSkpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cudG9TdGF0aWNIVE1MKGRpcnR5Lm91dGVySFRNTCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpcnR5O1xuICAgICAgfVxuXG4gICAgICAvKiBBc3NpZ24gY29uZmlnIHZhcnMgKi9cbiAgICAgIGlmICghU0VUX0NPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIH1cblxuICAgICAgLyogQ2xlYW4gdXAgcmVtb3ZlZCBlbGVtZW50cyAqL1xuICAgICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcblxuICAgICAgLyogQ2hlY2sgaWYgZGlydHkgaXMgY29ycmVjdGx5IHR5cGVkIGZvciBJTl9QTEFDRSAqL1xuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgSU5fUExBQ0UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKElOX1BMQUNFKSA7IGVsc2UgaWYgKGRpcnR5IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAvKiBJZiBkaXJ0eSBpcyBhIERPTSBlbGVtZW50LCBhcHBlbmQgdG8gYW4gZW1wdHkgZG9jdW1lbnQgdG8gYXZvaWRcbiAgICAgICAgICAgZWxlbWVudHMgYmVpbmcgc3RyaXBwZWQgYnkgdGhlIHBhcnNlciAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudCgnPCEtLS0tPicpO1xuICAgICAgICBpbXBvcnRlZE5vZGUgPSBib2R5Lm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShkaXJ0eSwgdHJ1ZSk7XG4gICAgICAgIGlmIChpbXBvcnRlZE5vZGUubm9kZVR5cGUgPT09IDEgJiYgaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAvKiBOb2RlIGlzIGFscmVhZHkgYSBib2R5LCB1c2UgYXMgaXMgKi9cbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2UgaWYgKGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgYm9keSA9IGltcG9ydGVkTm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItbm9kZS1hcHBlbmRcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGltcG9ydGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIEV4aXQgZGlyZWN0bHkgaWYgd2UgaGF2ZSBub3RoaW5nIHRvIGRvICovXG4gICAgICAgIGlmICghUkVUVVJOX0RPTSAmJiAhU0FGRV9GT1JfVEVNUExBVEVTICYmICFXSE9MRV9ET0NVTUVOVCAmJlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICAgICAgZGlydHkuaW5kZXhPZignPCcpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSW5pdGlhbGl6ZSB0aGUgZG9jdW1lbnQgdG8gd29yayBvbiAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudChkaXJ0eSk7XG5cbiAgICAgICAgLyogQ2hlY2sgd2UgaGF2ZSBhIERPTSBub2RlIGZyb20gdGhlIGRhdGEgKi9cbiAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIFJFVFVSTl9ET00gPyBudWxsIDogZW1wdHlIVE1MO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBmaXJzdCBlbGVtZW50IG5vZGUgKG91cnMpIGlmIEZPUkNFX0JPRFkgaXMgc2V0ICovXG4gICAgICBpZiAoYm9keSAmJiBGT1JDRV9CT0RZKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvKiBHZXQgbm9kZSBpdGVyYXRvciAqL1xuICAgICAgdmFyIG5vZGVJdGVyYXRvciA9IF9jcmVhdGVJdGVyYXRvcihJTl9QTEFDRSA/IGRpcnR5IDogYm9keSk7XG5cbiAgICAgIC8qIE5vdyBzdGFydCBpdGVyYXRpbmcgb3ZlciB0aGUgY3JlYXRlZCBkb2N1bWVudCAqL1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogRml4IElFJ3Mgc3RyYW5nZSBiZWhhdmlvciB3aXRoIG1hbmlwdWxhdGVkIHRleHROb2RlcyAjODkgKi9cbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAzICYmIGN1cnJlbnROb2RlID09PSBvbGROb2RlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTYW5pdGl6ZSB0YWdzIGFuZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoX3Nhbml0aXplRWxlbWVudHMoY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTaGFkb3cgRE9NIGRldGVjdGVkLCBzYW5pdGl6ZSBpdCAqL1xuICAgICAgICBpZiAoY3VycmVudE5vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oY3VycmVudE5vZGUuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzLCBzYW5pdGl6ZSBpZiBuZWNlc3NhcnkgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgb2xkTm9kZSA9IGN1cnJlbnROb2RlO1xuICAgICAgfVxuXG4gICAgICBvbGROb2RlID0gbnVsbDtcblxuICAgICAgLyogSWYgd2Ugc2FuaXRpemVkIGBkaXJ0eWAgaW4tcGxhY2UsIHJldHVybiBpdC4gKi9cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBzYW5pdGl6ZWQgc3RyaW5nIG9yIERPTSAqL1xuICAgICAgaWYgKFJFVFVSTl9ET00pIHtcbiAgICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgICByZXR1cm5Ob2RlID0gY3JlYXRlRG9jdW1lbnRGcmFnbWVudC5jYWxsKGJvZHkub3duZXJEb2N1bWVudCk7XG5cbiAgICAgICAgICB3aGlsZSAoYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItbm9kZS1hcHBlbmRcbiAgICAgICAgICAgIHJldHVybk5vZGUuYXBwZW5kQ2hpbGQoYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGJvZHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoUkVUVVJOX0RPTV9JTVBPUlQpIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgQWRvcHROb2RlKCkgaXMgbm90IHVzZWQgYmVjYXVzZSBpbnRlcm5hbCBzdGF0ZSBpcyBub3QgcmVzZXRcbiAgICAgICAgICAgIChlLmcuIHRoZSBwYXN0IG5hbWVzIG1hcCBvZiBhIEhUTUxGb3JtRWxlbWVudCksIHRoaXMgaXMgc2FmZVxuICAgICAgICAgICAgaW4gdGhlb3J5IGJ1dCB3ZSB3b3VsZCByYXRoZXIgbm90IHJpc2sgYW5vdGhlciBhdHRhY2sgdmVjdG9yLlxuICAgICAgICAgICAgVGhlIHN0YXRlIHRoYXQgaXMgY2xvbmVkIGJ5IGltcG9ydE5vZGUoKSBpcyBleHBsaWNpdGx5IGRlZmluZWRcbiAgICAgICAgICAgIGJ5IHRoZSBzcGVjcy5cbiAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybk5vZGUgPSBpbXBvcnROb2RlLmNhbGwob3JpZ2luYWxEb2N1bWVudCwgcmV0dXJuTm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuTm9kZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlcmlhbGl6ZWRIVE1MID0gV0hPTEVfRE9DVU1FTlQgPyBib2R5Lm91dGVySFRNTCA6IGJvZHkuaW5uZXJIVE1MO1xuXG4gICAgICAvKiBTYW5pdGl6ZSBmaW5hbCBzdHJpbmcgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIE1VU1RBQ0hFX0VYUFIkJDEsICcgJyk7XG4gICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gc3RyaW5nUmVwbGFjZShzZXJpYWxpemVkSFRNTCwgRVJCX0VYUFIkJDEsICcgJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHNlcmlhbGl6ZWRIVE1MKSA6IHNlcmlhbGl6ZWRIVE1MO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHNldCB0aGUgY29uZmlndXJhdGlvbiBvbmNlXG4gICAgICogc2V0Q29uZmlnXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnNldENvbmZpZyA9IGZ1bmN0aW9uIChjZmcpIHtcbiAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgU0VUX0NPTkZJRyA9IHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIHRoZSBjb25maWd1cmF0aW9uXG4gICAgICogY2xlYXJDb25maWdcbiAgICAgKlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5jbGVhckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIENPTkZJRyA9IG51bGw7XG4gICAgICBTRVRfQ09ORklHID0gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gY2hlY2sgaWYgYW4gYXR0cmlidXRlIHZhbHVlIGlzIHZhbGlkLlxuICAgICAqIFVzZXMgbGFzdCBzZXQgY29uZmlnLCBpZiBhbnkuIE90aGVyd2lzZSwgdXNlcyBjb25maWcgZGVmYXVsdHMuXG4gICAgICogaXNWYWxpZEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB0YWcgVGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZC4gT3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gKHRhZywgYXR0ciwgdmFsdWUpIHtcbiAgICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cbiAgICAgIGlmICghQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyh7fSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBsY1RhZyA9IHN0cmluZ1RvTG93ZXJDYXNlKHRhZyk7XG4gICAgICB2YXIgbGNOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UoYXR0cik7XG4gICAgICByZXR1cm4gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byBhZGQgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gYWRkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va0Z1bmN0aW9uIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgKi9cbiAgICBET01QdXJpZnkuYWRkSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50LCBob29rRnVuY3Rpb24pIHtcbiAgICAgIGlmICh0eXBlb2YgaG9va0Z1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBob29rc1tlbnRyeVBvaW50XSB8fCBbXTtcbiAgICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGEgRE9NUHVyaWZ5IGhvb2sgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICogKHBvcHMgaXQgZnJvbSB0aGUgc3RhY2sgb2YgaG9va3MgaWYgbW9yZSBhcmUgcHJlc2VudClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgYXJyYXlQb3AoaG9va3NbZW50cnlQb2ludF0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3MgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rcyB0byByZW1vdmVcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9va3MgPSBmdW5jdGlvbiAoZW50cnlQb2ludCkge1xuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gW107XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUFsbEhvb2tzXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYWxsIERPTVB1cmlmeSBob29rc1xuICAgICAqXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUFsbEhvb2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgaG9va3MgPSB7fTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgfVxuXG4gIHZhciBwdXJpZnkgPSBjcmVhdGVET01QdXJpZnkoKTtcblxuICByZXR1cm4gcHVyaWZ5O1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdXJpZnkuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xucmVxdWlyZShcIndlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0c1wiKTtcbmNvbnN0IHdlYmV4dF9wZXJtaXNzaW9uX3RvZ2dsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHQtcGVybWlzc2lvbi10b2dnbGVcIikpO1xuY29uc3QgYW5hbHl0aWNzXzEgPSByZXF1aXJlKFwiLi91dGlscy9hbmFseXRpY3NcIik7XG5jb25zdCBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2NvbnN0YW50c1wiKTtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vdXRpbHMvZG9tXCIpO1xuY29uc3QgbG9nZ2VyXzEgPSByZXF1aXJlKFwiLi91dGlscy9sb2dnZXJcIik7XG5jb25zdCBub3RpZmljYXRpb25zXzEgPSByZXF1aXJlKFwiLi91dGlscy9ub3RpZmljYXRpb25zXCIpO1xudmFyIGFzc2lnbm1lbnROb3RpZmljYXRpb25VcmwgPSBcImh0dHBzOi8vYXBwLnNjaG9vbG9neS5jb20vaG9tZS9ub3RpZmljYXRpb25zP2ZpbHRlcj1hbGxcIjtcbnZhciBkZWZhdWx0RG9tYWluID0gXCJhcHAuc2Nob29sb2d5LmNvbVwiO1xuY29uc3QgT0ZGU0NSRUVOX0RPQ1VNRU5UX1BBVEggPSBcIi9vZmZzY3JlZW4uaHRtbFwiO1xuZnVuY3Rpb24gbG9hZCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAoMCwgd2ViZXh0X3Blcm1pc3Npb25fdG9nZ2xlXzEuZGVmYXVsdCkoeyByZWxvYWRPblN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKG9uSW5zdGFsbGVkKTtcbiAgICAgICAgY2hyb21lLmFsYXJtcy5vbkFsYXJtLmFkZExpc3RlbmVyKG9uQWxhcm0pO1xuICAgICAgICBsZXQgcyA9IHlpZWxkIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHsgZGVmYXVsdERvbWFpbjogXCJhcHAuc2Nob29sb2d5LmNvbVwiIH0pO1xuICAgICAgICBkZWZhdWx0RG9tYWluID0gcy5kZWZhdWx0RG9tYWluO1xuICAgICAgICBhc3NpZ25tZW50Tm90aWZpY2F0aW9uVXJsID0gYGh0dHBzOi8vJHtkZWZhdWx0RG9tYWlufS9ob21lL25vdGlmaWNhdGlvbnM/ZmlsdGVyPWFsbGA7XG4gICAgICAgIC8vIFRPRE86IERvbWFpbiBwZXJtaXNzaW9ucyB0b2dnbGUgbmVlZHMgdG8gYmUgYWRkZWRcbiAgICAgICAgLy8gYWRkRG9tYWluUGVybWlzc2lvblRvZ2dsZSgpO1xuICAgICAgICAvL1J1biBvbmNlIG9uIGxvYWRcbiAgICAgICAgb25BbGFybSh7IG5hbWU6IFwibm90aWZpY2F0aW9uXCIsIHNjaGVkdWxlZFRpbWU6IERhdGUubm93KCkgfSk7XG4gICAgICAgIGNocm9tZS5hbGFybXMuZ2V0KFwibm90aWZpY2F0aW9uXCIsIGZ1bmN0aW9uIChhbGFybSkge1xuICAgICAgICAgICAgaWYgKGFsYXJtKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIkFsYXJtIGlzIGFscmVhZHkgcmVnaXN0ZXJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJOb3RpZmljYXRpb25zIGFsYXJtIGlzIG5vdCByZWdpc3RlcmVkOyByZWdpc3RlcmluZy4uLlwiKTtcbiAgICAgICAgICAgICAgICBjaHJvbWUuYWxhcm1zLmNyZWF0ZShcIm5vdGlmaWNhdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHBlcmlvZEluTWludXRlczogNSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNocm9tZS5ub3RpZmljYXRpb25zLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihvbk5vdGlmaWNhdGlvbkNsaWNrZWQpO1xuICAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFsyMTcsIDAsIDAsIDI1NV0gfSk7XG4gICAgICAgIGNocm9tZS5hY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKG9uQWN0aW9uQ2xpY2tlZCk7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihvbk1lc3NhZ2UpO1xuICAgICAgICBjaHJvbWUuY29udGV4dE1lbnVzLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihvbkNvbnRleHRNZW51Q2xpY2tlZCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBvbkFjdGlvbkNsaWNrZWQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIkJyb3dzZXIgYWN0aW9uIGNsaWNrZWRcIik7XG4gICAgICAgIGxldCBiYWRnZVRleHQgPSB5aWVsZCBjaHJvbWUuYWN0aW9uLmdldEJhZGdlVGV4dCh7fSk7XG4gICAgICAgIGxldCBuID0gTnVtYmVyLnBhcnNlSW50KGJhZGdlVGV4dCk7XG4gICAgICAgIHRyYWNrQW5hbHl0aWNzRXZlbnQoXCJidXR0b25fY2xpY2tcIiwge1xuICAgICAgICAgICAgaWQ6IFwibWFpbi1icm93c2VyLWFjdGlvbi1idXR0b25cIixcbiAgICAgICAgICAgIGNvbnRleHQ6IFwiQnJvd3NlciBBY3Rpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiBTdHJpbmcobiB8fCAwKSxcbiAgICAgICAgICAgIGxlZ2FjeVRhcmdldDogXCJCcm93c2VyIEFjdGlvblwiLFxuICAgICAgICAgICAgbGVnYWN5QWN0aW9uOiBuID8gYGJyb3dzZXIgYWN0aW9uIGNsaWNrZWQ6ICR7bn1gIDogXCJicm93c2VyIGFjdGlvbiBjbGlja2VkOiAwXCIsXG4gICAgICAgICAgICBsZWdhY3lMYWJlbDogXCJOb3RpZmljYXRpb25zXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKGBCcm93c2VyIGFjdGlvbiB0ZXh0OiBcIiR7YmFkZ2VUZXh0fVwiYCk7XG4gICAgICAgIGlmIChuKVxuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBgaHR0cHM6Ly8ke2RlZmF1bHREb21haW59L2hvbWUvbm90aWZpY2F0aW9uc2AgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogYGh0dHBzOi8vJHtkZWZhdWx0RG9tYWlufWAgfSk7XG4gICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogXCJcIiB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG9uTm90aWZpY2F0aW9uQ2xpY2tlZChpZCkge1xuICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJOb3RpZmljYXRpb24gY2xpY2tlZFwiKTtcbiAgICB0cmFja0FuYWx5dGljc0V2ZW50KFwicGVyZm9ybV9hY3Rpb25cIiwge1xuICAgICAgICBpZDogXCJjbGlja1wiLFxuICAgICAgICBjb250ZXh0OiBcIk5vdGlmaWNhdGlvbnNcIixcbiAgICAgICAgdmFsdWU6IGlkLFxuICAgICAgICBsZWdhY3lUYXJnZXQ6IGlkLFxuICAgICAgICBsZWdhY3lBY3Rpb246IFwibm90aWZpY2F0aW9uIGNsaWNrXCIsXG4gICAgICAgIGxlZ2FjeUxhYmVsOiBcIk5vdGlmaWNhdGlvbnNcIixcbiAgICB9KTtcbiAgICBjaHJvbWUubm90aWZpY2F0aW9ucy5jbGVhcihpZCk7XG4gICAgc3dpdGNoIChpZCkge1xuICAgICAgICBjYXNlIFwiYXNzaWdubWVudFwiOlxuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBgaHR0cHM6Ly8ke2RlZmF1bHREb21haW59L2hvbWUvbm90aWZpY2F0aW9uc2AgfSk7XG4gICAgICAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IFwiXCIgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogYGh0dHBzOi8vJHtkZWZhdWx0RG9tYWlufWAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5mdW5jdGlvbiBvbkFsYXJtKGFsYXJtKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgbGV0IHN0b3JhZ2VDb250ZW50ID0geWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQobnVsbCk7XG4gICAgICAgIGlmIChhbGFybSAmJiBhbGFybS5uYW1lID09PSBcIm5vdGlmaWNhdGlvblwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coYFske25ldyBEYXRlKCl9XSBDaGVja2luZyBmb3IgbmV3IG5vdGlmaWNhdGlvbnNgKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyAhPSBcImRpc2FibGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JOb3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmVycm9yKFwiRXJyb3IgY2F1Z2h0OlwiKTtcbiAgICAgICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBvbkluc3RhbGxlZChkZXRhaWxzKSB7XG4gICAgdHJhY2tBbmFseXRpY3NFdmVudChcInBlcmZvcm1fYWN0aW9uXCIsIHtcbiAgICAgICAgaWQ6IFwicnVudGltZV9vbmluc3RhbGxlZFwiLFxuICAgICAgICB2YWx1ZTogZGV0YWlscy5yZWFzb24sXG4gICAgICAgIGNvbnRleHQ6IFwiVmVyc2lvbnNcIixcbiAgICAgICAgbGVnYWN5VGFyZ2V0OiBcIlJ1bnRpbWUgb25JbnN0YWxsZWRcIixcbiAgICAgICAgbGVnYWN5QWN0aW9uOiBkZXRhaWxzLnJlYXNvbixcbiAgICAgICAgbGVnYWN5TGFiZWw6IFwiVmVyc2lvbnNcIixcbiAgICB9KTtcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICAgIGlkOiBcInNwbHVzLXRoZW1lLWVkaXRvclwiLFxuICAgICAgICB0aXRsZTogXCJUaGVtZSBFZGl0b3JcIixcbiAgICAgICAgY29udGV4dHM6IFtcImFjdGlvblwiXSxcbiAgICB9KTtcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICAgIGlkOiBcInNwbHVzLWRpc2NvcmRcIixcbiAgICAgICAgdGl0bGU6IFwiRGlzY29yZCBTdXBwb3J0IFNlcnZlclwiLFxuICAgICAgICBjb250ZXh0czogW1wiYWN0aW9uXCJdLFxuICAgIH0pO1xuICAgIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICAgICAgaWQ6IFwic3BsdXMtd2Vic2l0ZVwiLFxuICAgICAgICB0aXRsZTogYCR7Y29uc3RhbnRzXzEuRVhURU5TSU9OX05BTUV9IFdlYnNpdGVgLFxuICAgICAgICBjb250ZXh0czogW1wiYWN0aW9uXCJdLFxuICAgIH0pO1xufVxuZnVuY3Rpb24gb25Db250ZXh0TWVudUNsaWNrZWQoaW5mbywgdGFiKSB7XG4gICAgc3dpdGNoIChpbmZvLm1lbnVJdGVtSWQpIHtcbiAgICAgICAgY2FzZSBcInNwbHVzLXRoZW1lLWVkaXRvclwiOlxuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBjaHJvbWUucnVudGltZS5nZXRVUkwoXCIvdGhlbWUtZWRpdG9yLmh0bWxcIikgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNwbHVzLWRpc2NvcmRcIjpcbiAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogY29uc3RhbnRzXzEuRElTQ09SRF9VUkwgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNwbHVzLXdlYnNpdGVcIjpcbiAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdXJsOiBgJHtjb25zdGFudHNfMS5FWFRFTlNJT05fV0VCU0lURX0vP3V0bV9zb3VyY2U9ZXh0LWNvbnRleHQtbWVudSZ1dG1fY29udGVudD0ke2Nocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkudmVyc2lvbn1gLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5mdW5jdGlvbiBvbk1lc3NhZ2UocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiUmVjZWl2ZWQgYmFja2dyb3VuZCBwYWdlIG1lc3NhZ2VcIiwgcmVxdWVzdCk7XG4gICAgaWYgKHJlcXVlc3QudHlwZSA9PSBcIm9wZW5NZXNzYWdlc1wiKSB7XG4gICAgICAgIHZvaWQgKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IHRhYiA9IChfYSA9IHNlbmRlci50YWIpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICh5aWVsZCBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgbGFzdEZvY3VzZWRXaW5kb3c6IHRydWUgfSkpWzBdO1xuICAgICAgICAgICAgaWYgKCEodGFiID09PSBudWxsIHx8IHRhYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGFiLmlkKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWIuaWQsIHsgdHlwZTogXCJvcGVuTWVzc2FnZXNJblNjaG9vbG9neVwiIH0pO1xuICAgICAgICB9KSkoKTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcXVlc3QudHlwZSA9PSBcImZldGNoXCIgJiYgcmVxdWVzdC51cmwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXJfMS5Mb2dnZXIuZGVidWcoXCJSZWNlaXZlZCBmZXRjaCByZXF1ZXN0IGZvciBcIiArIHJlcXVlc3QudXJsKTtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpbmFsUmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2VPYmo7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VPYmogPSB5aWVsZCBmZXRjaChyZXF1ZXN0LnVybCwgcmVxdWVzdC5wYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS5lcnJvciA9IGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5hbFJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2UuaGVhZGVycyA9IHJlc3BvbnNlT2JqLmhlYWRlcnM7XG4gICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS5vayA9IHJlc3BvbnNlT2JqLm9rO1xuICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2UucmVkaXJlY3RlZCA9IHJlc3BvbnNlT2JqLnJlZGlyZWN0ZWQ7XG4gICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS5zdGF0dXMgPSByZXNwb25zZU9iai5zdGF0dXM7XG4gICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS5zdGF0dXNUZXh0ID0gcmVzcG9uc2VPYmouc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLnR5cGUgPSByZXNwb25zZU9iai50eXBlO1xuICAgICAgICAgICAgICAgIGZpbmFsUmVzcG9uc2UudXJsID0gcmVzcG9uc2VPYmoudXJsO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmVxdWVzdC5ib2R5UmVhZFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJqc29uXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS5qc29uID0geWllbGQgcmVzcG9uc2VPYmouanNvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFJlc3BvbnNlLnRleHQgPSB5aWVsZCByZXNwb25zZU9iai50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxSZXNwb25zZS5ib2R5UmVhZEVycm9yID0gZSB8fCB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmluYWxSZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpXG4gICAgICAgICAgICAudGhlbih4ID0+IHNlbmRSZXNwb25zZShKU09OLnN0cmluZ2lmeSh4KSkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHNlbmRSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyIH0pKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXF1ZXN0LnR5cGUgPT0gXCJ1cGRhdGVEZWZhdWx0RG9tYWluXCIgJiYgcmVxdWVzdC5kb21haW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWZhdWx0RG9tYWluID0gcmVxdWVzdC5kb21haW47XG4gICAgICAgIGFzc2lnbm1lbnROb3RpZmljYXRpb25VcmwgPSBgaHR0cHM6Ly8ke2RlZmF1bHREb21haW59L2hvbWUvbm90aWZpY2F0aW9ucz9maWx0ZXI9YWxsYDtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcXVlc3QudHlwZSA9PSBcInNldEJhZGdlVGV4dFwiICYmIHJlcXVlc3QudGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IHJlcXVlc3QudGV4dCB9KTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcXVlc3QudHlwZSA9PSBcIm5vdGlmaWNhdGlvblwiKSB7XG4gICAgICAgICgwLCBub3RpZmljYXRpb25zXzEudXBkYXRlTGFzdFRpbWUpKHJlcXVlc3QuZGF0YS50aW1lTW9kaWZpZWQsIHJlcXVlc3QuZGF0YS5sYXN0VGltZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNlbmROb3RpZmljYXRpb24pKHJlcXVlc3QuZGF0YS5ub3RpZmljYXRpb24sIHJlcXVlc3QuZGF0YS5uYW1lLCByZXF1ZXN0LmRhdGEuY291bnQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXF1ZXN0LnR5cGUgPT0gXCJkZWNsYXJhdGl2ZU5ldFJlcXVlc3RSdWxlc2V0XCIpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QuYWN0aW9uID09PSBcImVuYWJsZVwiKSB7XG4gICAgICAgICAgICBjaHJvbWUuZGVjbGFyYXRpdmVOZXRSZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnVwZGF0ZUVuYWJsZWRSdWxlc2V0cyh7XG4gICAgICAgICAgICAgICAgZW5hYmxlUnVsZXNldElkczogW3JlcXVlc3QucnVsZXNldElkXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT09IFwiZGlzYWJsZVwiKSB7XG4gICAgICAgICAgICBjaHJvbWUuZGVjbGFyYXRpdmVOZXRSZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnVwZGF0ZUVuYWJsZWRSdWxlc2V0cyh7XG4gICAgICAgICAgICAgICAgZGlzYWJsZVJ1bGVzZXRJZHM6IFtyZXF1ZXN0LnJ1bGVzZXRJZF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUgfSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tGb3JOb3RpZmljYXRpb25zKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGxldCBzdG9yYWdlQ29udGVudHMgPSB5aWVsZCBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChudWxsKTtcbiAgICAgICAgaWYgKCgwLCBkb21fMS5nZXRCcm93c2VyKSgpID09PSBcIkZpcmVmb3hcIikge1xuICAgICAgICAgICAgLy8gRmlyZWZveCBkb2Vzbid0IHN1cHBvcnQgc2VydmljZSB3b3JrZXJzIHNvIGl0IGRvZXNuJ3QgbmVlZCBvZmZzY3JlZW4gZG9jdW1lbnRzXG4gICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL01vemlsbGEvQWRkLW9ucy9XZWJFeHRlbnNpb25zL21hbmlmZXN0Lmpzb24vYmFja2dyb3VuZCNiYWNrZ3JvdW5kX3BhZ2VzXG4gICAgICAgICAgICBsZXQgeyBub3RpZmljYXRpb24sIG5hbWUsIGNvdW50LCBsYXN0VGltZSwgdGltZU1vZGlmaWVkIH0gPSB5aWVsZCAoMCwgbm90aWZpY2F0aW9uc18xLmxvYWRBc3NpZ25tZW50Tm90aWZpY2F0aW9ucykoYXNzaWdubWVudE5vdGlmaWNhdGlvblVybCwgKF9hID0gc3RvcmFnZUNvbnRlbnRzLmxhc3RUaW1lKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwKTtcbiAgICAgICAgICAgIHlpZWxkICgwLCBub3RpZmljYXRpb25zXzEudXBkYXRlTGFzdFRpbWUpKHRpbWVNb2RpZmllZCwgbGFzdFRpbWUpO1xuICAgICAgICAgICAgeWllbGQgKDAsIG5vdGlmaWNhdGlvbnNfMS5zZW5kTm90aWZpY2F0aW9uKShub3RpZmljYXRpb24sIG5hbWUsIGNvdW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBEbyBiZWxvdyBvbmx5IGluIENocm9tZVxuICAgICAgICAvLyBDcmVhdGUgYW4gb2Zmc2NyZWVuIGRvY3VtZW50IGlmIG9uZSBkb2Vzbid0IGV4aXN0IHlldFxuICAgICAgICB5aWVsZCBjcmVhdGVPZmZzY3JlZW5Eb2N1bWVudCgpO1xuICAgICAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIGFuIG9mZnNjcmVlbiBkb2N1bWVudCwgd2UgY2FuIGRpc3BhdGNoIHRoZVxuICAgICAgICAvLyBtZXNzYWdlLlxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiBcIm9mZnNjcmVlbi1ub3RpZmljYXRpb25zXCIsXG4gICAgICAgICAgICB0YXJnZXQ6IFwib2Zmc2NyZWVuXCIsXG4gICAgICAgICAgICBkYXRhOiB7IHVybDogYXNzaWdubWVudE5vdGlmaWNhdGlvblVybCwgbGFzdFRpbWU6IChfYiA9IHN0b3JhZ2VDb250ZW50cy5sYXN0VGltZSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMCB9LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU9mZnNjcmVlbkRvY3VtZW50KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoISh5aWVsZCBoYXNPZmZzY3JlZW5Eb2N1bWVudCgpKSkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNocm9tZS5vZmZzY3JlZW4uY3JlYXRlRG9jdW1lbnQoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IE9GRlNDUkVFTl9ET0NVTUVOVF9QQVRILFxuICAgICAgICAgICAgICAgICAgICByZWFzb25zOiBbY2hyb21lLm9mZnNjcmVlbi5SZWFzb24uRE9NX1BBUlNFUl0sXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZmljYXRpb246IFwiUGFyc2UgU2Nob29sb2d5IG5vdGlmaWNhdGlvbnMgaW4gSFRNTCBmb3JtYXRcIixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLndhcm4oXCJFcnJvciBjcmVhdGluZyBvZmZzY3JlZW4gZG9jdW1lbnQsIGl0IHByb2JhYmx5IGFscmVhZHkgZXhpc3RzXCIsIGUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBoYXNPZmZzY3JlZW5Eb2N1bWVudCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBDaGVjayBhbGwgd2luZG93cyBjb250cm9sbGVkIGJ5IHRoZSBzZXJ2aWNlIHdvcmtlciBpZiBvbmUgb2YgdGhlbSBpcyB0aGUgb2Zmc2NyZWVuIGRvY3VtZW50XG4gICAgICAgIGNvbnN0IG1hdGNoZWRDbGllbnRzID0geWllbGQgY2xpZW50cy5tYXRjaEFsbCgpO1xuICAgICAgICBmb3IgKGNvbnN0IGNsaWVudCBvZiBtYXRjaGVkQ2xpZW50cykge1xuICAgICAgICAgICAgaWYgKGNsaWVudC51cmwuZW5kc1dpdGgoT0ZGU0NSRUVOX0RPQ1VNRU5UX1BBVEgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdHJhY2tBbmFseXRpY3NFdmVudChuYW1lLCBwcm9wcykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHlpZWxkIGNyZWF0ZU9mZnNjcmVlbkRvY3VtZW50KCk7XG4gICAgICAgIGxldCBzdG9yYWdlQ29udGVudHMgPSB5aWVsZCBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChudWxsKTtcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogXCJvZmZzY3JlZW4tYW5hbHl0aWNzXCIsXG4gICAgICAgICAgICB0YXJnZXQ6IFwib2Zmc2NyZWVuXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICBwcm9wcyxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBhbmFseXRpY3M6IHN0b3JhZ2VDb250ZW50cy5hbmFseXRpY3MsXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiBzdG9yYWdlQ29udGVudHMudGhlbWUsXG4gICAgICAgICAgICAgICAgICAgIGJldGE6IHN0b3JhZ2VDb250ZW50cy5iZXRhLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLnZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZlcnNpb246IHN0b3JhZ2VDb250ZW50cy5uZXdWZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICByYW5kb21Vc2VySWQ6ICgwLCBhbmFseXRpY3NfMS5nZXRBbmFseXRpY3NVc2VySWQpKCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxubG9hZCgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUFuYWx5dGljcyA9IGV4cG9ydHMuZ2V0QW5hbHl0aWNzVXNlcklkID0gZXhwb3J0cy50cmFja0V2ZW50ID0gdm9pZCAwO1xuLyoqXG4gKiBUcmFja3MgYW4gZXZlbnQgdXNpbmcgR29vZ2xlIEFuYWx5dGljcyBpZiB0aGUgdXNlciBkaWQgbm90IG9wdCBvdXRcbiAqIE5PVEU6IFRoZSBGaXJlZm94IHZlcnNpb24gb2YgdGhlIGV4dGVuc2lvbiBoYXMgbm8gc3VwcG9ydCBmb3IgR29vZ2xlIEFuYWx5dGljc1xuICovXG52YXIgdHJhY2tFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIF9hID0ge30pIHtcbiAgICB2YXIgeyBsZWdhY3lUYXJnZXQsIGxlZ2FjeUFjdGlvbiwgbGVnYWN5TGFiZWwgPSB1bmRlZmluZWQsIGxlZ2FjeVZhbHVlID0gdW5kZWZpbmVkLCBpZCwgY29udGV4dCwgdmFsdWUgfSA9IF9hLCBleHRyYVByb3BzID0gX19yZXN0KF9hLCBbXCJsZWdhY3lUYXJnZXRcIiwgXCJsZWdhY3lBY3Rpb25cIiwgXCJsZWdhY3lMYWJlbFwiLCBcImxlZ2FjeVZhbHVlXCIsIFwiaWRcIiwgXCJjb250ZXh0XCIsIFwidmFsdWVcIl0pO1xuICAgIGNvbnNvbGUuZGVidWcoXCJbUytdIFRyYWNraW5nIGRpc2FibGVkIGJ5IHVzZXJcIiwgYXJndW1lbnRzKTtcbn07XG5leHBvcnRzLnRyYWNrRXZlbnQgPSB0cmFja0V2ZW50O1xuZnVuY3Rpb24gZ2V0QW5hbHl0aWNzVXNlcklkKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbVRva2VuKCkge1xuICAgICAgICAgICAgLy8gRS5nLiA4ICogMzIgPSAyNTYgYml0cyB0b2tlblxuICAgICAgICAgICAgdmFyIHJhbmRvbVBvb2wgPSBuZXcgVWludDhBcnJheSgzMik7XG4gICAgICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJhbmRvbVBvb2wpO1xuICAgICAgICAgICAgdmFyIGhleCA9IFwiXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmRvbVBvb2wubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBoZXggKz0gcmFuZG9tUG9vbFtpXS50b1N0cmluZygxNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFLmcuIGRiMTg0NThlMjc4MmIyYjc3ZTM2NzY5YzU2OWUyNjNhNTM4ODVhOTk0NGRkMGE4NjFlNTA2NGVhYzE2ZjFhXG4gICAgICAgICAgICByZXR1cm4gaGV4O1xuICAgICAgICB9XG4gICAgICAgIGxldCBsID0geWllbGQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KHsgcmFuZG9tVXNlcklkOiBudWxsIH0pO1xuICAgICAgICBpZiAoIWwucmFuZG9tVXNlcklkKSB7XG4gICAgICAgICAgICBsZXQgcmFuZG9tVXNlcklkID0gZ2V0UmFuZG9tVG9rZW4oKTtcbiAgICAgICAgICAgIHlpZWxkIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHJhbmRvbVVzZXJJZCB9KTtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21Vc2VySWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGwucmFuZG9tVXNlcklkO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRBbmFseXRpY3NVc2VySWQgPSBnZXRBbmFseXRpY3NVc2VySWQ7XG5mdW5jdGlvbiBpbml0aWFsaXplQW5hbHl0aWNzKF9hKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCBhcmd1bWVudHMsIHZvaWQgMCwgZnVuY3Rpb24qICh7IGRvY3VtZW50Q29udGV4dCwgaXNBbmFseXRpY3NFbmFibGVkLCBzZWxlY3RlZFRoZW1lLCBzZWxlY3RlZEJldGEsIGN1cnJlbnRWZXJzaW9uLCBuZXdWZXJzaW9uLCByYW5kb21Vc2VySWQsIHRoZW1lSXNNb2Rlcm4sIH0pIHtcbiAgICAgICAgaWYgKGlzQW5hbHl0aWNzRW5hYmxlZCkge1xuICAgICAgICAgICAgZW5hYmxlQW5hbHl0aWNzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZW5hYmxlQW5hbHl0aWNzKCkge1xuICAgICAgICAgICAgLy8gR29vZ2xlIEFuYWx5dGljcyB2NFxuICAgICAgICAgICAgZ2xvYmFsVGhpcy5kYXRhTGF5ZXIgPSBnbG9iYWxUaGlzLmRhdGFMYXllciB8fCBbXTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGd0YWcoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAoX2EgPSBnbG9iYWxUaGlzLmRhdGFMYXllcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGd0YWcoXCJqc1wiLCBuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgIGNvbnN0IGd0YWdDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgcGFnZV9sb2NhdGlvbjogbG9jYXRpb24uaHJlZi5yZXBsYWNlKC9cXC9cXGR7Myx9XFxiL2csIFwiLypcIiksXG4gICAgICAgICAgICAgICAgcGFnZV9wYXRoOiBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9cXGR7Myx9XFxiL2csIFwiLypcIiksXG4gICAgICAgICAgICAgICAgcGFnZV90aXRsZTogbnVsbCxcbiAgICAgICAgICAgICAgICB1c2VyX2lkOiByYW5kb21Vc2VySWQsXG4gICAgICAgICAgICAgICAgdXNlcl9wcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiBzZWxlY3RlZFRoZW1lLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVCZXRhOiBzZWxlY3RlZEJldGEsXG4gICAgICAgICAgICAgICAgICAgIGxhc3RFbmFibGVkVmVyc2lvbjogbmV3VmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uVmVyc2lvbjogY3VycmVudFZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogbG9jYXRpb24uaG9zdCxcbiAgICAgICAgICAgICAgICAgICAgbW9kZXJuVGhlbWU6IHRoZW1lSXNNb2Rlcm4sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBndGFnKFwiY29uZmlnXCIsIFwiRy1ZTTZCMDBSRFlDXCIsIGd0YWdDb25maWcpO1xuICAgICAgICAgICAgZXhwb3J0cy50cmFja0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgX2EgPSB7fSkge1xuICAgICAgICAgICAgICAgIHZhciB7IGxlZ2FjeVRhcmdldCwgbGVnYWN5QWN0aW9uLCBsZWdhY3lMYWJlbCA9IHVuZGVmaW5lZCwgbGVnYWN5VmFsdWUgPSB1bmRlZmluZWQsIGlkLCBjb250ZXh0LCB2YWx1ZSB9ID0gX2EsIGV4dHJhUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImxlZ2FjeVRhcmdldFwiLCBcImxlZ2FjeUFjdGlvblwiLCBcImxlZ2FjeUxhYmVsXCIsIFwibGVnYWN5VmFsdWVcIiwgXCJpZFwiLCBcImNvbnRleHRcIiwgXCJ2YWx1ZVwiXSk7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50RGF0YSA9IE9iamVjdC5hc3NpZ24oeyBpZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgfSwgZXh0cmFQcm9wcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhgW1MrXSBUcmFja2VkIGV2ZW50OmAsIGV2ZW50TmFtZSwgZXZlbnREYXRhKTtcbiAgICAgICAgICAgICAgICBndGFnKFwiZXZlbnRcIiwgZXZlbnROYW1lLCBldmVudERhdGEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRyYWNrQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LmlzVHJ1c3RlZClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSAoZXZlbnQuY3VycmVudFRhcmdldCB8fCBldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgICgwLCBleHBvcnRzLnRyYWNrRXZlbnQpKFwidHJhY2tpbmdfbGlua19jbGlja1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGxlZ2FjeVRhcmdldDogdGFyZ2V0LmRhdGFzZXQuc3BsdXNUcmFja2luZ0lkIHx8IHRhcmdldC5pZCB8fCBcIlVubGFiZWxlZCBCdXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgbGVnYWN5QWN0aW9uOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZ2FjeUxhYmVsOiB0YXJnZXQuZGF0YXNldC5zcGx1c1RyYWNraW5nQ29udGV4dCB8fCBcIlRyYWNraW5nIExpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgbGVnYWN5VmFsdWU6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdWYWx1ZSB8fCBldmVudC5idXR0b24sXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0YXJnZXQuZGF0YXNldC5zcGx1c1RyYWNraW5nSWQgfHwgdGFyZ2V0LmlkIHx8IFwiVW5sYWJlbGVkIEJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB0YXJnZXQuZGF0YXNldC5zcGx1c1RyYWNraW5nQ29udGV4dCB8fCBcIlRyYWNraW5nIExpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdWYWx1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb2N1bWVudENvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tlZEVsZW1lbnRzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMsIG11dGF0aW9uT2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNwbHVzLXRyYWNrLWNsaWNrczpub3QoLnNwbHVzLXRyYWNrZWQpXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRyYWNrZWRFbGVtZW50cy5oYXMoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0cmFja0NsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJhdXhjbGlja1wiLCB0cmFja0NsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJzcGx1cy10cmFja2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrZWRFbGVtZW50cy5hZGQoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZHlTdGF0ZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhZHlTdGF0ZUNoZWNrSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVsZW0gb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcGx1cy10cmFjay1jbGlja3NcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdHJhY2tlZEVsZW1lbnRzLmhhcyhlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRyYWNrQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImF1eGNsaWNrXCIsIHRyYWNrQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcInNwbHVzLXRyYWNrZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tlZEVsZW1lbnRzLmFkZChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5pbml0aWFsaXplQW5hbHl0aWNzID0gaW5pdGlhbGl6ZUFuYWx5dGljcztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ERUZBVUxUX1RIRU1FX05BTUUgPSBleHBvcnRzLkRJU0NPUkRfVVJMID0gZXhwb3J0cy5FWFRFTlNJT05fV0VCU0lURSA9IGV4cG9ydHMuRVhURU5TSU9OX05BTUUgPSB2b2lkIDA7XG5leHBvcnRzLkVYVEVOU0lPTl9OQU1FID0gXCJTY2hvb2xvZ3kgUGx1c1wiO1xuZXhwb3J0cy5FWFRFTlNJT05fV0VCU0lURSA9IFwiaHR0cHM6Ly9zY2hvb2xvZ3lwbC51c1wiO1xuZXhwb3J0cy5ESVNDT1JEX1VSTCA9IFwiaHR0cHM6Ly9kaXNjb3JkLnNjaG9vbG9neXBsLnVzXCI7XG5leHBvcnRzLkRFRkFVTFRfVEhFTUVfTkFNRSA9IGV4cG9ydHMuRVhURU5TSU9OX05BTUU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2FpdEZvckVsZW1lbnQgPSBleHBvcnRzLmNyZWF0ZVN2Z0xvZ28gPSBleHBvcnRzLnNldENTU1ZhcmlhYmxlID0gZXhwb3J0cy5nZXRQYXJlbnRzID0gZXhwb3J0cy5pc1Zpc2libGUgPSBleHBvcnRzLmdldEJyb3dzZXIgPSBleHBvcnRzLmNyZWF0ZUJ1dHRvbldpdGhMb2dvID0gZXhwb3J0cy5jcmVhdGVCdXR0b24gPSBleHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSB2b2lkIDA7XG4vKipcbiAqIENyZWF0ZXMgYSBET00gZWxlbWVudFxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBBIERPTSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIC0gVGhlIEhUTUwgdGFnIG5hbWUgb2YgdGhlIHR5cGUgb2YgRE9NIGVsZW1lbnQgdG8gY3JlYXRlXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBjbGFzc0xpc3QgLSBDU1MgY2xhc3NlcyB0byBhcHBseSB0byB0aGUgRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsYW55Pn0gcHJvcGVydGllcyAtIFByb3BlcnRpZXMgdG8gYXBwbHkgdG8gdGhlIERPTSBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGNoaWxkcmVuIC0gRWxlbWVudHMgdG8gYXBwZW5kIGFzIGNoaWxkcmVuIHRvIHRoZSBjcmVhdGVkIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTGlzdCwgcHJvcGVydGllcywgY2hpbGRyZW4pIHtcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAoY2xhc3NMaXN0KSB7XG4gICAgICAgIGZvciAobGV0IGMgb2YgY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICAgICAgZm9yIChsZXQgcHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNbcHJvcGVydHldIGluc3RhbmNlb2YgT2JqZWN0ICYmXG4gICAgICAgICAgICAgICAgIShwcm9wZXJ0aWVzW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHN1YnByb3BlcnR5IGluIHByb3BlcnRpZXNbcHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbcHJvcGVydHldW3N1YnByb3BlcnR5XSA9IHByb3BlcnRpZXNbcHJvcGVydHldW3N1YnByb3BlcnR5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkICYmIHByb3BlcnRpZXNbcHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50W3Byb3BlcnR5XSA9IHByb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50O1xuLyoqXG4gKiBDcmVhdGVzIGEgU2Nob29sb2d5IFBsdXMgdGhlbWVkIGJ1dHRvbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIElEIGZvciB0aGUgYnV0dG9uIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHNob3cgb24gdGhlIGJ1dHRvblxuICogQHBhcmFtIHsoZTogRXZlbnQpPT52b2lkfSBjYWxsYmFjayBBIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZFxuICovXG5mdW5jdGlvbiBjcmVhdGVCdXR0b24oaWQsIHRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFtcInN1Ym1pdC1zcGFuLXdyYXBwZXJcIiwgXCJzcGx1cy1tb2RhbC1idXR0b25cIl0sIHsgb25jbGljazogY2FsbGJhY2sgfSwgW1xuICAgICAgICBjcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgW1wiZm9ybS1zdWJtaXRcIiwgXCJzcGx1cy10cmFjay1jbGlja3NcIl0sIHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHsgc3BsdXNUcmFja2luZ0NvbnRleHQ6IFwiUysgQnV0dG9uXCIgfSxcbiAgICAgICAgfSksXG4gICAgXSk7XG59XG5leHBvcnRzLmNyZWF0ZUJ1dHRvbiA9IGNyZWF0ZUJ1dHRvbjtcbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbldpdGhMb2dvKGlkLCB0ZXh0LCBjYWxsYmFjaykge1xuICAgIGxldCBidXR0b24gPSBjcmVhdGVCdXR0b24oaWQsIHRleHQsIGNhbGxiYWNrKTtcbiAgICBsZXQgaW1nID0gY3JlYXRlU3ZnTG9nbygpO1xuICAgIE9iamVjdC5hc3NpZ24oaW1nLnN0eWxlLCB7XG4gICAgICAgIHZlcnRpY2FsQWxpZ246IFwibWlkZGxlXCIsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiBcIjRweFwiLFxuICAgICAgICB3aWR0aDogXCIxOHB4XCIsXG4gICAgfSk7XG4gICAgYnV0dG9uLnByZXBlbmQoaW1nKTtcbiAgICBidXR0b24uc3R5bGUuc2V0UHJvcGVydHkoXCJoZWlnaHRcIiwgXCIzNnB4XCIsIFwiaW1wb3J0YW50XCIpO1xuICAgIGxldCBidXR0b25JbnB1dCA9IGJ1dHRvbi5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgYnV0dG9uSW5wdXQuc3R5bGUucGFkZGluZ0xlZnQgPSBcIjRweFwiO1xuICAgIGJ1dHRvbklucHV0LnN0eWxlLnNldFByb3BlcnR5KFwiaGVpZ2h0XCIsIFwiMzZweFwiLCBcImltcG9ydGFudFwiKTtcbiAgICBidXR0b24uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn1cbmV4cG9ydHMuY3JlYXRlQnV0dG9uV2l0aExvZ28gPSBjcmVhdGVCdXR0b25XaXRoTG9nbztcbi8qKlxuICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBicm93c2VyXG4gKiBAcmV0dXJucyB7XCJDaHJvbWVcInxcIkZpcmVmb3hcInxcIk90aGVyXCJ9IE5hbWUgb2YgdGhlIGN1cnJlbnQgYnJvd3NlclxuICovXG5mdW5jdGlvbiBnZXRCcm93c2VyKCkge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5jaHJvbWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzLmJyb3dzZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkZpcmVmb3hcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIExpa2VseSBjYXB0dXJlcyBhbGwgQ2hyb21pdW0tYmFzZWQgYnJvd3NlcnNcbiAgICAgICAgICAgIHJldHVybiBcIkNocm9tZVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJPdGhlclwiO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0QnJvd3NlciA9IGdldEJyb3dzZXI7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGFuIGVsZW1lbnQgaXMgdmlzaWJsZSB0byB0aGUgdXNlclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbSBUaGUgZWxlbWVudCB0byBjaGVjayBmb3IgdmlzaWJpbGl0eVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBlbGVtZW50IGlzIHZpc2libGVcbiAqL1xuZnVuY3Rpb24gaXNWaXNpYmxlKGVsZW0pIHtcbiAgICByZXR1cm4gISEoZWxlbS5vZmZzZXRXaWR0aCB8fCBlbGVtLm9mZnNldEhlaWdodCB8fCBlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKTtcbn1cbmV4cG9ydHMuaXNWaXNpYmxlID0gaXNWaXNpYmxlO1xuLyoqXG4gKiBSZXR1cm5zIGFsbCBwYXJlbnQgZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHByb3ZpZGVkIHNlbGVjdG9yLlxuICogRXNzZW50aWFsbHkgd29ya3MgbGlrZSBhIHJldmVyc2UgYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbSBUaGUgdGFyZ2V0IGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBBIENTUyBzZWxlY3RvclxuICogQHJldHVybnMge0hUTUxFbGVtZW50W119IEFuIGFycmF5IG9mIG1hdGNoaW5nIHBhcmVudCBlbGVtZW50c1xuICovXG5mdW5jdGlvbiBnZXRQYXJlbnRzKGVsZW0sIHNlbGVjdG9yKSB7XG4gICAgdmFyIHBhcmVudHMgPSBbXTtcbiAgICB2YXIgZmlyc3RDaGFyO1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBmaXJzdENoYXIgPSBzZWxlY3Rvci5jaGFyQXQoMCk7XG4gICAgfVxuICAgIGZvciAoOyBlbGVtICYmIGVsZW0gIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdENoYXIgPT09IFwiLlwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdG9yLnN1YnN0cigxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdENoYXIgPT09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uaWQgPT09IHNlbGVjdG9yLnN1YnN0cigxKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2goZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0Q2hhciA9PT0gXCJbXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5oYXNBdHRyaWJ1dGUoc2VsZWN0b3Iuc3Vic3RyKDEsIHNlbGVjdG9yLmxlbmd0aCAtIDEpKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2goZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsZW0udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHBhcmVudHMucHVzaChlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudHMucHVzaChlbGVtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFyZW50cztcbn1cbmV4cG9ydHMuZ2V0UGFyZW50cyA9IGdldFBhcmVudHM7XG4vKipcbiAqIFNldHMgdGhlIHZhbHVlIG9mIGEgQ1NTIHZhcmlhYmxlIG9uIHRoZSBkb2N1bWVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVmFyaWFibGUgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCBOZXcgdmFyaWFibGUgdmFsdWVcbiAqL1xuZnVuY3Rpb24gc2V0Q1NTVmFyaWFibGUobmFtZSwgdmFsKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGAtLSR7bmFtZX1gLCB2YWwgIT09IG51bGwgJiYgdmFsICE9PSB2b2lkIDAgPyB2YWwgOiBudWxsKTtcbn1cbmV4cG9ydHMuc2V0Q1NTVmFyaWFibGUgPSBzZXRDU1NWYXJpYWJsZTtcbmZ1bmN0aW9uIGNyZWF0ZVN2Z0xvZ28oLi4uY2xhc3Nlcykge1xuICAgIGxldCBjaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImNpcmNsZVwiKTtcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwiY3hcIiwgXCIyNTBcIik7XG4gICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcImN5XCIsIFwiMjUwXCIpO1xuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJyXCIsIFwiMjMwXCIpO1xuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImZpbGw6IG5vbmU7IHN0cm9rZS13aWR0aDogMzVweDsgc3Ryb2tlOiBjdXJyZW50Q29sb3I7XCIpO1xuICAgIGxldCBsaW5lMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwibGluZVwiKTtcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoXCJ4MVwiLCBcIjI1MFwiKTtcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoXCJ5MVwiLCBcIjEyNVwiKTtcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoXCJ4MlwiLCBcIjI1MFwiKTtcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoXCJ5MlwiLCBcIjM3NVwiKTtcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLXdpZHRoOiAzNXB4OyBzdHJva2U6IGN1cnJlbnRDb2xvcjtcIik7XG4gICAgbGV0IGxpbmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJsaW5lXCIpO1xuICAgIGxpbmUyLnNldEF0dHJpYnV0ZShcIngxXCIsIFwiMTI1XCIpO1xuICAgIGxpbmUyLnNldEF0dHJpYnV0ZShcInkxXCIsIFwiMjUwXCIpO1xuICAgIGxpbmUyLnNldEF0dHJpYnV0ZShcIngyXCIsIFwiMzc1XCIpO1xuICAgIGxpbmUyLnNldEF0dHJpYnV0ZShcInkyXCIsIFwiMjUwXCIpO1xuICAgIGxpbmUyLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwic3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyBzdHJva2Utd2lkdGg6IDM1cHg7IHN0cm9rZTogY3VycmVudENvbG9yO1wiKTtcbiAgICBsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgNTAwIDUwMFwiKTtcbiAgICBzdmcuYXBwZW5kKGNpcmNsZSwgbGluZTEsIGxpbmUyKTtcbiAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICBzdmcuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgICB9XG4gICAgcmV0dXJuIHN2Zztcbn1cbmV4cG9ydHMuY3JlYXRlU3ZnTG9nbyA9IGNyZWF0ZVN2Z0xvZ287XG5mdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3RvciwgY2hlY2tfaW50ZXJ2YWwgPSA1MCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2hlY2tfaW50ZXJ2YWwpO1xuICAgIH0pO1xufVxuZXhwb3J0cy53YWl0Rm9yRWxlbWVudCA9IHdhaXRGb3JFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkxvZ2dlciA9IHZvaWQgMDtcbmV4cG9ydHMuTG9nZ2VyID0ge1xuICAgIGxvZzogKCgpID0+IGNvbnNvbGUubG9nLmJpbmQoZ2xvYmFsVGhpcy5jb25zb2xlLCBgJWMrYCwgY3JlYXRlTG9nUHJlZml4KFwiIzgxRDRGQVwiKSkpKCksXG4gICAgZXJyb3I6ICgoKSA9PiBjb25zb2xlLmVycm9yLmJpbmQoZ2xvYmFsVGhpcy5jb25zb2xlLCBgJWMrYCwgY3JlYXRlTG9nUHJlZml4KFwiI0ZGNjk2MVwiKSkpKCksXG4gICAgaW5mbzogKCgpID0+IGNvbnNvbGUuaW5mby5iaW5kKGdsb2JhbFRoaXMuY29uc29sZSwgYCVjK2AsIGNyZWF0ZUxvZ1ByZWZpeChcIndoaXRlXCIpKSkoKSxcbiAgICB3YXJuOiAoKCkgPT4gY29uc29sZS53YXJuLmJpbmQoZ2xvYmFsVGhpcy5jb25zb2xlLCBgJWMrYCwgY3JlYXRlTG9nUHJlZml4KFwiI0ZERkQ5NlwiKSkpKCksXG4gICAgdHJhY2U6ICgoKSA9PiBjb25zb2xlLnRyYWNlLmJpbmQoZ2xvYmFsVGhpcy5jb25zb2xlLCBgJWMrYCwgY3JlYXRlTG9nUHJlZml4KFwib3JhbmdlXCIpKSkoKSxcbiAgICBkZWJ1ZzogKCgpID0+IGNvbnNvbGUuZGVidWcuYmluZChnbG9iYWxUaGlzLmNvbnNvbGUsIGAlYytgLCBjcmVhdGVMb2dQcmVmaXgoXCJsaWdodGdyZWVuXCIpKSkoKSxcbn07XG5mdW5jdGlvbiBjcmVhdGVMb2dQcmVmaXgoY29sb3IpIHtcbiAgICByZXR1cm4gYGNvbG9yOiR7Y29sb3J9O2JvcmRlcjoxcHggc29saWQgIzJBMkEyQTtib3JkZXItcmFkaXVzOjEwMCU7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtwYWRkaW5nOiAwIDRweCAwIDRweDtiYWNrZ3JvdW5kLWNvbG9yOiMyQTJBMkFgO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VuZE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMudXBkYXRlTGFzdFRpbWUgPSBleHBvcnRzLmxvYWRBc3NpZ25tZW50Tm90aWZpY2F0aW9ucyA9IHZvaWQgMDtcbmNvbnN0IGRvbXB1cmlmeV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkb21wdXJpZnlcIikpO1xuY29uc3QgYW5hbHl0aWNzXzEgPSByZXF1aXJlKFwiLi9hbmFseXRpY3NcIik7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IGxvZ2dlcl8xID0gcmVxdWlyZShcIi4vbG9nZ2VyXCIpO1xuZnVuY3Rpb24gbG9hZEFzc2lnbm1lbnROb3RpZmljYXRpb25zKGFzc2lnbm1lbnROb3RpZmljYXRpb25VcmwsIGxhc3RUaW1lKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYXNzaWdubWVudE5vdGlmaWNhdGlvblVybCwge1xuICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBsb2FkaW5nIG5vdGlmaWNhdGlvbnM6IFwiICsgcmVzcG9uc2UpO1xuICAgICAgICBsZXQgcmVzcG9uc2VKc29uID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiTGFzdCBuZXcgZ3JhZGU6IFwiICsgbmV3IERhdGUobGFzdFRpbWUpLnRvU3RyaW5nKCkpO1xuICAgICAgICBsZXQgdGltZSA9IGxhc3RUaW1lO1xuICAgICAgICBsZXQgdGltZU1vZGlmaWVkID0gZmFsc2U7XG4gICAgICAgIGlmICghdGltZSkge1xuICAgICAgICAgICAgdGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aW1lTW9kaWZpZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2XCIpIHx8IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBkb21wdXJpZnlfMS5kZWZhdWx0LnNhbml0aXplKHJlc3BvbnNlSnNvbi5vdXRwdXQpO1xuICAgICAgICBsZXQgbm90aWZpY2F0aW9ucyA9IGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiLmVkZ2Utc2VudGVuY2VcIik7XG4gICAgICAgIGxldCBtb250aHMgPSBbXG4gICAgICAgICAgICBcIkphblwiLFxuICAgICAgICAgICAgXCJGZWJcIixcbiAgICAgICAgICAgIFwiTWFyXCIsXG4gICAgICAgICAgICBcIkFwclwiLFxuICAgICAgICAgICAgXCJNYXlcIixcbiAgICAgICAgICAgIFwiSnVuXCIsXG4gICAgICAgICAgICBcIkp1bFwiLFxuICAgICAgICAgICAgXCJBdWdcIixcbiAgICAgICAgICAgIFwiU2VwXCIsXG4gICAgICAgICAgICBcIk9jdFwiLFxuICAgICAgICAgICAgXCJOb3ZcIixcbiAgICAgICAgICAgIFwiRGVjXCIsXG4gICAgICAgIF07XG4gICAgICAgIGxldCB0b3RhbEFzc2lnbm1lbnRzID0gMDtcbiAgICAgICAgZm9yIChsZXQgbm90aWZpY2F0aW9uIG9mIEFycmF5LmZyb20obm90aWZpY2F0aW9ucykucmV2ZXJzZSgpKSB7XG4gICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLnRleHRDb250ZW50LmluY2x1ZGVzKFwibmV3IGdyYWRlXCIpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFzc2lnbm1lbnRzID0gbm90aWZpY2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYVwiKTtcbiAgICAgICAgICAgICAgICBsZXQgZXh0cmFUZXh0RWxlbWVudCA9IG5vdGlmaWNhdGlvbi5xdWVyeVNlbGVjdG9yKFwiLm90aGVyLWl0ZW1zLWxpbmtcIik7XG4gICAgICAgICAgICAgICAgbGV0IHRpbWVUZXh0ID0gbm90aWZpY2F0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuZWRnZS10aW1lXCIpLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIGxldCBzcGxpdERhdGUgPSB0aW1lVGV4dC5zcGxpdChcIiBhdCBcIik7XG4gICAgICAgICAgICAgICAgbGV0IG1vbnRoRGF5ID0gc3BsaXREYXRlWzBdO1xuICAgICAgICAgICAgICAgIGxldCBob3VyTWludXRlID0gc3BsaXREYXRlWzFdO1xuICAgICAgICAgICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGxldCBtb250aERheVllYXIgPSBtb250aERheSArIGAgJHtub3cuZ2V0RnVsbFllYXIoKX1gO1xuICAgICAgICAgICAgICAgIGxldCB0b2RheSA9IGAke21vbnRoc1tub3cuZ2V0TW9udGgoKV19ICR7bm93LmdldERhdGUoKX0gJHtub3cuZ2V0RnVsbFllYXIoKX1gO1xuICAgICAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25EYXRlID0gRGF0ZS5wYXJzZShtb250aERheVllYXIpO1xuICAgICAgICAgICAgICAgIGlmIChub3RpZmljYXRpb25EYXRlID4gRGF0ZS5wYXJzZSh0b2RheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uRGF0ZSA9IERhdGUucGFyc2UobW9udGhEYXkgKyBgICR7bm93LmdldEZ1bGxZZWFyKCkgLSAxfSAke2hvdXJNaW51dGV9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25EYXRlID0gRGF0ZS5wYXJzZShgJHttb250aERheVllYXJ9ICR7aG91ck1pbnV0ZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbkRhdGUgPiB0aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUgPSBub3RpZmljYXRpb25EYXRlO1xuICAgICAgICAgICAgICAgICAgICB0aW1lTW9kaWZpZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEFzc2lnbm1lbnRzKys7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2cobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG4gPSBudWxsO1xuICAgICAgICBpZiAodG90YWxBc3NpZ25tZW50cyA+IDApIHtcbiAgICAgICAgICAgIG4gPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJiYXNpY1wiLFxuICAgICAgICAgICAgICAgIGljb25Vcmw6IFwiaW1ncy9pY29uQDEyOC5wbmdcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJOZXcgZ3JhZGUgcG9zdGVkXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYCR7dG90YWxBc3NpZ25tZW50c30gbmV3IGFzc2lnbm1lbnQke3RvdGFsQXNzaWdubWVudHMgPT09IDEgPyBcIiBoYXMgYSBncmFkZVwiIDogXCJzIGhhdmUgZ3JhZGVzXCJ9YCxcbiAgICAgICAgICAgICAgICBldmVudFRpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgaXNDbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub3RpZmljYXRpb246IG4sXG4gICAgICAgICAgICBuYW1lOiBcImFzc2lnbm1lbnRcIixcbiAgICAgICAgICAgIGNvdW50OiB0b3RhbEFzc2lnbm1lbnRzLFxuICAgICAgICAgICAgbGFzdFRpbWU6IHRpbWUsXG4gICAgICAgICAgICB0aW1lTW9kaWZpZWQsXG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnRzLmxvYWRBc3NpZ25tZW50Tm90aWZpY2F0aW9ucyA9IGxvYWRBc3NpZ25tZW50Tm90aWZpY2F0aW9ucztcbmZ1bmN0aW9uIHVwZGF0ZUxhc3RUaW1lKHRpbWVNb2RpZmllZCwgdGltZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGlmICh0aW1lTW9kaWZpZWQpIHtcbiAgICAgICAgICAgIHlpZWxkIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgbGFzdFRpbWU6IHRpbWUgfSk7XG4gICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiU2V0IG5ldyB0aW1lIFwiICsgbmV3IERhdGUodGltZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIk5vIG5ldyBub3RpZmljYXRpb25zXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLnVwZGF0ZUxhc3RUaW1lID0gdXBkYXRlTGFzdFRpbWU7XG4vKipcbiAqIFNlbmRzIGEgZGVza3RvcCBub3RpZmljYXRpb24gaWYgc2V0dGluZ3MgcGVybWl0XG4gKiBAcGFyYW0ge05vdGlmaWNhdGlvbk9wdGlvbnN9IG5vdGlmaWNhdGlvbiBBIGNocm9tZSBub3RpZmljYXRpb24gb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgbm90aWZpY2F0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gW2NvdW50PTFdIFRoZSBudW1iZXIgdG8gYWRkIHRvIHRoZSBicm93c2VyIGFjdGlvbiBiYWRnZVxuICovXG5mdW5jdGlvbiBzZW5kTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgbmFtZSwgY291bnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAoIW5vdGlmaWNhdGlvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IHN0b3JhZ2VDb250ZW50ID0geWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQobnVsbCk7XG4gICAgICAgIGNvdW50ID0gY291bnQgfHwgY291bnQgPT0gMCA/IGNvdW50IDogMTtcbiAgICAgICAgaWYgKCgwLCBkb21fMS5nZXRCcm93c2VyKSgpID09IFwiRmlyZWZveFwiKSB7XG4gICAgICAgICAgICBkZWxldGUgbm90aWZpY2F0aW9uLnJlcXVpcmVJbnRlcmFjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiTmV3IG5vdGlmaWNhdGlvbiFcIiwgbm90aWZpY2F0aW9uKTtcbiAgICAgICAgaWYgKGNvdW50ID4gMCAmJlxuICAgICAgICAgICAgKCFzdG9yYWdlQ29udGVudC5ub3RpZmljYXRpb25zIHx8XG4gICAgICAgICAgICAgICAgc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyA9PSBcImVuYWJsZWRcIiB8fFxuICAgICAgICAgICAgICAgIHN0b3JhZ2VDb250ZW50Lm5vdGlmaWNhdGlvbnMgPT0gXCJiYWRnZVwiKSkge1xuICAgICAgICAgICAgbGV0IHggPSB5aWVsZCBjaHJvbWUuYWN0aW9uLmdldEJhZGdlVGV4dCh7fSk7XG4gICAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyLnBhcnNlSW50KHgpO1xuICAgICAgICAgICAgY2hyb21lLmFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiAobnVtID8gbnVtICsgY291bnQgOiBjb3VudCkudG9TdHJpbmcoKSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJOdW1iZXIgYmFkZ2UgaXMgZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzdG9yYWdlQ29udGVudC5ub3RpZmljYXRpb25zIHx8XG4gICAgICAgICAgICBzdG9yYWdlQ29udGVudC5ub3RpZmljYXRpb25zID09IFwiZW5hYmxlZFwiIHx8XG4gICAgICAgICAgICBzdG9yYWdlQ29udGVudC5ub3RpZmljYXRpb25zID09IFwicG9wdXBcIikge1xuICAgICAgICAgICAgY2hyb21lLm5vdGlmaWNhdGlvbnMuY3JlYXRlKG5hbWUsIG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICAoMCwgYW5hbHl0aWNzXzEudHJhY2tFdmVudCkoXCJwZXJmb3JtX2FjdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwic2hvd25cIixcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBcIk5vdGlmaWNhdGlvbnNcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmFtZSxcbiAgICAgICAgICAgICAgICBsZWdhY3lUYXJnZXQ6IG5hbWUsXG4gICAgICAgICAgICAgICAgbGVnYWN5QWN0aW9uOiBcInNob3duXCIsXG4gICAgICAgICAgICAgICAgbGVnYWN5TGFiZWw6IFwiTm90aWZpY2F0aW9uc1wiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiUG9wdXAgbm90aWZpY2F0aW9ucyBhcmUgZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuc2VuZE5vdGlmaWNhdGlvbiA9IHNlbmROb3RpZmljYXRpb247XG4iLCJpbXBvcnQgeyBpbmplY3RDb250ZW50U2NyaXB0IH0gZnJvbSAnd2ViZXh0LWNvbnRlbnQtc2NyaXB0cyc7XG5pbXBvcnQgY2hyb21lUCBmcm9tICd3ZWJleHQtcG9seWZpbGwta2luZGEnO1xuaW1wb3J0IHsgcGF0dGVyblRvUmVnZXggfSBmcm9tICd3ZWJleHQtcGF0dGVybnMnO1xuY29uc3Qgbm9NYXRjaGVzRXJyb3IgPSAnVHlwZSBlcnJvciBmb3IgcGFyYW1ldGVyIGNvbnRlbnRTY3JpcHRPcHRpb25zIChFcnJvciBwcm9jZXNzaW5nIG1hdGNoZXM6IEFycmF5IHJlcXVpcmVzIGF0IGxlYXN0IDEgaXRlbXM7IHlvdSBoYXZlIDApIGZvciBjb250ZW50U2NyaXB0cy5yZWdpc3Rlci4nO1xuY29uc3Qgbm9QZXJtaXNzaW9uRXJyb3IgPSAnUGVybWlzc2lvbiBkZW5pZWQgdG8gcmVnaXN0ZXIgYSBjb250ZW50IHNjcmlwdCBmb3IgJztcbmNvbnN0IGdvdE5hdmlnYXRpb24gPSB0eXBlb2YgY2hyb21lID09PSAnb2JqZWN0JyAmJiAnd2ViTmF2aWdhdGlvbicgaW4gY2hyb21lO1xuYXN5bmMgZnVuY3Rpb24gaXNPcmlnaW5QZXJtaXR0ZWQodXJsKSB7XG4gICAgcmV0dXJuIGNocm9tZVAucGVybWlzc2lvbnMuY29udGFpbnMoe1xuICAgICAgICBvcmlnaW5zOiBbbmV3IFVSTCh1cmwpLm9yaWdpbiArICcvKiddLFxuICAgIH0pO1xufVxuLy8gVGhlIGNhbGxiYWNrIGlzIG9ubHkgdXNlZCBieSB3ZWJleHRlbnNpb24tcG9seWZpbGxcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyQ29udGVudFNjcmlwdChjb250ZW50U2NyaXB0T3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBjb25zdCB7IGpzID0gW10sIGNzcyA9IFtdLCBtYXRjaEFib3V0QmxhbmssIG1hdGNoZXMgPSBbXSwgZXhjbHVkZU1hdGNoZXMsIHJ1bkF0LCB9ID0gY29udGVudFNjcmlwdE9wdGlvbnM7XG4gICAgbGV0IHsgYWxsRnJhbWVzIH0gPSBjb250ZW50U2NyaXB0T3B0aW9ucztcbiAgICBpZiAoZ290TmF2aWdhdGlvbikge1xuICAgICAgICBhbGxGcmFtZXMgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYWxsRnJhbWVzKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignYGFsbEZyYW1lczogdHJ1ZWAgcmVxdWlyZXMgdGhlIGB3ZWJOYXZpZ2F0aW9uYCBwZXJtaXNzaW9uIHRvIHdvcmsgY29ycmVjdGx5OiBodHRwczovL2dpdGh1Yi5jb20vZnJlZ2FudGUvY29udGVudC1zY3JpcHRzLXJlZ2lzdGVyLXBvbHlmaWxsI3Blcm1pc3Npb25zJyk7XG4gICAgfVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3Iobm9NYXRjaGVzRXJyb3IpO1xuICAgIH1cbiAgICBhd2FpdCBQcm9taXNlLmFsbChtYXRjaGVzLm1hcChhc3luYyAocGF0dGVybikgPT4ge1xuICAgICAgICBpZiAoIWF3YWl0IGNocm9tZVAucGVybWlzc2lvbnMuY29udGFpbnMoeyBvcmlnaW5zOiBbcGF0dGVybl0gfSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihub1Blcm1pc3Npb25FcnJvciArIHBhdHRlcm4pO1xuICAgICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnN0IG1hdGNoZXNSZWdleCA9IHBhdHRlcm5Ub1JlZ2V4KC4uLm1hdGNoZXMpO1xuICAgIGNvbnN0IGV4Y2x1ZGVNYXRjaGVzUmVnZXggPSBwYXR0ZXJuVG9SZWdleCguLi5leGNsdWRlTWF0Y2hlcyAhPT0gbnVsbCAmJiBleGNsdWRlTWF0Y2hlcyAhPT0gdm9pZCAwID8gZXhjbHVkZU1hdGNoZXMgOiBbXSk7XG4gICAgY29uc3QgaW5qZWN0ID0gYXN5bmMgKHVybCwgdGFiSWQsIGZyYW1lSWQgPSAwKSA9PiB7XG4gICAgICAgIGlmICghbWF0Y2hlc1JlZ2V4LnRlc3QodXJsKSAvLyBNYW51YWwgYG1hdGNoZXNgIGdsb2IgbWF0Y2hpbmdcbiAgICAgICAgICAgIHx8IGV4Y2x1ZGVNYXRjaGVzUmVnZXgudGVzdCh1cmwpIC8vIE1hbnVhbCBgZXhjbHVkZV9tYXRjaGVzYCBnbG9iIG1hdGNoaW5nXG4gICAgICAgICAgICB8fCAhYXdhaXQgaXNPcmlnaW5QZXJtaXR0ZWQodXJsKSAvLyBXaXRob3V0IHRoaXMsIHdlIG1pZ2h0IGhhdmUgdGVtcG9yYXJ5IGFjY2VzcyB2aWEgYWNjZXNzVGFiXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGluamVjdENvbnRlbnRTY3JpcHQoe1xuICAgICAgICAgICAgdGFiSWQsXG4gICAgICAgICAgICBmcmFtZUlkLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjc3MsXG4gICAgICAgICAgICBqcyxcbiAgICAgICAgICAgIG1hdGNoQWJvdXRCbGFuayxcbiAgICAgICAgICAgIHJ1bkF0LFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZ25vcmVUYXJnZXRFcnJvcnM6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgdGFiTGlzdGVuZXIgPSBhc3luYyAodGFiSWQsIHsgc3RhdHVzIH0sIHsgdXJsIH0pID0+IHtcbiAgICAgICAgLy8gT25seSBzdGF0dXMgdXBkYXRlcyBhcmUgcmVsZXZhbnRcbiAgICAgICAgLy8gTm8gVVJMID0gbm8gcGVybWlzc2lvblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnbG9hZGluZycgJiYgdXJsKSB7XG4gICAgICAgICAgICB2b2lkIGluamVjdCh1cmwsIHRhYklkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgbmF2TGlzdGVuZXIgPSBhc3luYyAoeyB0YWJJZCwgZnJhbWVJZCwgdXJsLCB9KSA9PiB7XG4gICAgICAgIHZvaWQgaW5qZWN0KHVybCwgdGFiSWQsIGZyYW1lSWQpO1xuICAgIH07XG4gICAgaWYgKGdvdE5hdmlnYXRpb24pIHtcbiAgICAgICAgY2hyb21lLndlYk5hdmlnYXRpb24ub25Db21taXR0ZWQuYWRkTGlzdGVuZXIobmF2TGlzdGVuZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHRhYkxpc3RlbmVyKTtcbiAgICB9XG4gICAgY29uc3QgcmVnaXN0ZXJlZENvbnRlbnRTY3JpcHQgPSB7XG4gICAgICAgIGFzeW5jIHVucmVnaXN0ZXIoKSB7XG4gICAgICAgICAgICBpZiAoZ290TmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQ29tbWl0dGVkLnJlbW92ZUxpc3RlbmVyKG5hdkxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih0YWJMaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlZ2lzdGVyZWRDb250ZW50U2NyaXB0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRDb250ZW50U2NyaXB0O1xufVxuIiwiaW1wb3J0IHsgZXhjbHVkZUR1cGxpY2F0ZVBhdHRlcm5zLCBwYXR0ZXJuVG9SZWdleCB9IGZyb20gJ3dlYmV4dC1wYXR0ZXJucyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWFuaWZlc3RQZXJtaXNzaW9ucygpIHtcbiAgICByZXR1cm4gZ2V0TWFuaWZlc3RQZXJtaXNzaW9uc1N5bmMoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYW5pZmVzdFBlcm1pc3Npb25zU3luYygpIHtcbiAgICByZXR1cm4gX2dldE1hbmlmZXN0UGVybWlzc2lvbnNTeW5jKGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRNYW5pZmVzdFBlcm1pc3Npb25zU3luYyhtYW5pZmVzdCkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIGNvbnN0IG1hbmlmZXN0UGVybWlzc2lvbnMgPSB7XG4gICAgICAgIG9yaWdpbnM6IFtdLFxuICAgICAgICBwZXJtaXNzaW9uczogW10sXG4gICAgfTtcbiAgICBjb25zdCBsaXN0ID0gbmV3IFNldChbXG4gICAgICAgIC4uLigoX2EgPSBtYW5pZmVzdC5wZXJtaXNzaW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10pLFxuICAgICAgICAuLi4oKF9iID0gbWFuaWZlc3QuY29udGVudF9zY3JpcHRzKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBbXSkuZmxhdE1hcChjb25maWcgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBjb25maWcubWF0Y2hlcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW107IH0pLFxuICAgIF0pO1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL2dlY2tvLWRldi9ibG9iL2MwZmM4YzQ4NTJlOTI3YjBhZTc1ZDg5M2QzNTc3MmI4YzYwZWUwNmIvdG9vbGtpdC9jb21wb25lbnRzL2V4dGVuc2lvbnMvRXh0ZW5zaW9uLmpzbSNMNzM4LUw3NDNcbiAgICBpZiAobWFuaWZlc3QuZGV2dG9vbHNfcGFnZVxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIGl0IGNhbid0IGJlIHNwZWNpZmllZCwgYnV0IGl0J3MgcmVwb3J0ZWQgd2hlbiByZXF1ZXN0ZWRcbiAgICAgICAgJiYgISgoX2MgPSBtYW5pZmVzdC5vcHRpb25hbF9wZXJtaXNzaW9ucykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmluY2x1ZGVzKCdkZXZ0b29scycpKSkge1xuICAgICAgICBsaXN0LmFkZCgnZGV2dG9vbHMnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwZXJtaXNzaW9uIG9mIGxpc3QpIHtcbiAgICAgICAgaWYgKHBlcm1pc3Npb24uaW5jbHVkZXMoJzovLycpKSB7XG4gICAgICAgICAgICBtYW5pZmVzdFBlcm1pc3Npb25zLm9yaWdpbnMucHVzaChwZXJtaXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1hbmlmZXN0UGVybWlzc2lvbnMucGVybWlzc2lvbnMucHVzaChwZXJtaXNzaW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFuaWZlc3RQZXJtaXNzaW9ucztcbn1cbmNvbnN0IGhvc3RSZWdleCA9IC86Wy9dWy9dWyouXSooW14vXSspLzsgLy8gRXh0cmFjdHMgdGhlIHdpbGRjYXJkLWxlc3MgaG9zdG5hbWVcbmZ1bmN0aW9uIHBhcnNlRG9tYWluKG9yaWdpbikge1xuICAgIHJldHVybiBvcmlnaW4uc3BsaXQoaG9zdFJlZ2V4KVsxXTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RBZGRpdGlvbmFsUGVybWlzc2lvbnMocGVybWlzc2lvbnMsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gc2VsZWN0QWRkaXRpb25hbFBlcm1pc3Npb25zU3luYyhwZXJtaXNzaW9ucywgb3B0aW9ucyk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0QWRkaXRpb25hbFBlcm1pc3Npb25zU3luYyhwZXJtaXNzaW9ucywgb3B0aW9ucykge1xuICAgIGNvbnN0IG1hbmlmZXN0UGVybWlzc2lvbnMgPSBnZXRNYW5pZmVzdFBlcm1pc3Npb25zU3luYygpO1xuICAgIHJldHVybiBfZ2V0QWRkaXRpb25hbFBlcm1pc3Npb25zKG1hbmlmZXN0UGVybWlzc2lvbnMsIHBlcm1pc3Npb25zLCBvcHRpb25zKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBZGRpdGlvbmFsUGVybWlzc2lvbnMob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgY2hyb21lLnBlcm1pc3Npb25zLmdldEFsbChjdXJyZW50UGVybWlzc2lvbnMgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFuaWZlc3RQZXJtaXNzaW9ucyA9IGdldE1hbmlmZXN0UGVybWlzc2lvbnNTeW5jKCk7XG4gICAgICAgICAgICByZXNvbHZlKF9nZXRBZGRpdGlvbmFsUGVybWlzc2lvbnMobWFuaWZlc3RQZXJtaXNzaW9ucywgY3VycmVudFBlcm1pc3Npb25zLCBvcHRpb25zKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRBZGRpdGlvbmFsUGVybWlzc2lvbnMobWFuaWZlc3RQZXJtaXNzaW9ucywgY3VycmVudFBlcm1pc3Npb25zLCB7IHN0cmljdE9yaWdpbnMgPSB0cnVlIH0gPSB7fSkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgYWRkaXRpb25hbFBlcm1pc3Npb25zID0ge1xuICAgICAgICBvcmlnaW5zOiBbXSxcbiAgICAgICAgcGVybWlzc2lvbnM6IFtdLFxuICAgIH07XG4gICAgZm9yIChjb25zdCBvcmlnaW4gb2YgKF9hID0gY3VycmVudFBlcm1pc3Npb25zLm9yaWdpbnMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdKSB7XG4gICAgICAgIGlmIChtYW5pZmVzdFBlcm1pc3Npb25zLm9yaWdpbnMuaW5jbHVkZXMob3JpZ2luKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzdHJpY3RPcmlnaW5zKSB7XG4gICAgICAgICAgICBjb25zdCBkb21haW4gPSBwYXJzZURvbWFpbihvcmlnaW4pO1xuICAgICAgICAgICAgY29uc3QgaXNEb21haW5Jbk1hbmlmZXN0ID0gbWFuaWZlc3RQZXJtaXNzaW9ucy5vcmlnaW5zXG4gICAgICAgICAgICAgICAgLnNvbWUobWFuaWZlc3RPcmlnaW4gPT4gcGFyc2VEb21haW4obWFuaWZlc3RPcmlnaW4pID09PSBkb21haW4pO1xuICAgICAgICAgICAgaWYgKGlzRG9tYWluSW5NYW5pZmVzdCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFkZGl0aW9uYWxQZXJtaXNzaW9ucy5vcmlnaW5zLnB1c2gob3JpZ2luKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwZXJtaXNzaW9uIG9mIChfYiA9IGN1cnJlbnRQZXJtaXNzaW9ucy5wZXJtaXNzaW9ucykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogW10pIHtcbiAgICAgICAgaWYgKCFtYW5pZmVzdFBlcm1pc3Npb25zLnBlcm1pc3Npb25zLmluY2x1ZGVzKHBlcm1pc3Npb24pKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsUGVybWlzc2lvbnMucGVybWlzc2lvbnMucHVzaChwZXJtaXNzaW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWRkaXRpb25hbFBlcm1pc3Npb25zO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzVXJsUGVybWl0dGVkQnlNYW5pZmVzdChvcmlnaW4pIHtcbiAgICByZXR1cm4gX2lzVXJsUGVybWl0dGVkQnlNYW5pZmVzdChvcmlnaW4sIGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIF9pc1VybFBlcm1pdHRlZEJ5TWFuaWZlc3Qob3JpZ2luLCBtYW5pZmVzdCkge1xuICAgIGNvbnN0IG1hbmlmZXN0UGVybWlzc2lvbnMgPSBfZ2V0TWFuaWZlc3RQZXJtaXNzaW9uc1N5bmMobWFuaWZlc3QpO1xuICAgIGNvbnN0IG9yaWdpbnNSZWdleCA9IHBhdHRlcm5Ub1JlZ2V4KC4uLm1hbmlmZXN0UGVybWlzc2lvbnMub3JpZ2lucyk7XG4gICAgcmV0dXJuIG9yaWdpbnNSZWdleC50ZXN0KG9yaWdpbik7XG59XG5leHBvcnQgZnVuY3Rpb24gZHJvcE92ZXJsYXBwaW5nUGVybWlzc2lvbnMoeyBvcmlnaW5zLCBwZXJtaXNzaW9ucyB9KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgaWYgKG9yaWdpbnMpIHtcbiAgICAgICAgcmVzdWx0Lm9yaWdpbnMgPSBleGNsdWRlRHVwbGljYXRlUGF0dGVybnMob3JpZ2lucyk7XG4gICAgfVxuICAgIGlmIChwZXJtaXNzaW9ucykge1xuICAgICAgICByZXN1bHQucGVybWlzc2lvbnMgPSBbLi4ucGVybWlzc2lvbnNdO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgb25lRXZlbnQgfSBmcm9tICd3ZWJleHQtZXZlbnRzJztcbmltcG9ydCB7IGlzQmFja2dyb3VuZFdvcmtlciwgaXNDaHJvbWUsIGlzQmFja2dyb3VuZFBhZ2UgfSBmcm9tICd3ZWJleHQtZGV0ZWN0LXBhZ2UnO1xuYXN5bmMgZnVuY3Rpb24gb25Qb3B1cENsb3NlKHdhdGNoZWRXaW5kb3dJZCkge1xuICAgIGF3YWl0IG9uZUV2ZW50KGNocm9tZS53aW5kb3dzLm9uUmVtb3ZlZCwgY2xvc2VkV2luZG93SWQgPT4gY2xvc2VkV2luZG93SWQgPT09IHdhdGNoZWRXaW5kb3dJZCk7XG59XG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgc2VyaWFsaXplZCwgZG8gbm90IHVzZSB2YXJpYWJsZXMgb3V0c2lkZSBpdHMgc2NvcGVcbmZ1bmN0aW9uIHBhZ2VTY3JpcHQoKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXyA9PiB7XG4gICAgICAgIHdpbmRvdy5jbG9zZSgpO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgXyA9PiB7XG4gICAgICAgIHdpbmRvdy5jbG9zZSgpO1xuICAgIH0pO1xuICAgIHdpbmRvdy5yZXNpemVCeSgwLCBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgd2luZG93Lm1vdmVUbygoc2NyZWVuLndpZHRoIC0gd2luZG93Lm91dGVyV2lkdGgpIC8gMiwgKHNjcmVlbi5oZWlnaHQgLSB3aW5kb3cub3V0ZXJIZWlnaHQpIC8gMik7XG4gICAgYnV0dG9uLmZvY3VzKCk7XG59XG4vLyBUT0RPOiBBZGQgYnVuZGxlciB0byBpbmNsdWRlIGJhc2UtY3NzXG5jb25zdCBjc3MgPSAvKiBjc3MgKi8gYFxuXHQvKiEgaHR0cHM6Ly9ucG0uaW0vd2ViZXh0LWJhc2UtY3NzICovXG5cblx0LyogQ2hyb21lIG9ubHk6IC13ZWJraXQtaHlwaGVucyAqL1xuXHQvKiBTYWZhcmkgb25seTogXzo6LXdlYmtpdC1mdWxsLXBhZ2UtbWVkaWEgKi9cblxuXHQvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovXG5cdEBpbXBvcnQgdXJsKCdjaHJvbWU6Ly9nbG9iYWwvc2tpbi9pbi1jb250ZW50L2NvbW1vbi5jc3MnKSAobWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOjApOyAvKiBGaXJlZm94LW9ubHkgKi9cblxuXHQ6cm9vdCB7XG5cdFx0LS1iYWNrZ3JvdW5kLWNvbG9yLWZvci1jaHJvbWU6ICMyOTJhMmQ7XG5cdFx0bWF4LXdpZHRoOiA3MDBweDtcblx0XHRtYXJnaW46IGF1dG87XG5cdH1cblxuXHRib2R5IHtcblx0XHQtLWJvZHktbWFyZ2luLWg6IDhweDtcblx0XHRtYXJnaW4tbGVmdDogdmFyKC0tYm9keS1tYXJnaW4taCk7XG5cdFx0bWFyZ2luLXJpZ2h0OiB2YXIoLS1ib2R5LW1hcmdpbi1oKTtcblx0fVxuXG5cdC8qIFNlbGVjdG9yIG1hdGNoZXMgRmlyZWZveOKAmSAqL1xuXHRpbnB1dFt0eXBlPSdudW1iZXInXSxcblx0aW5wdXRbdHlwZT0ncGFzc3dvcmQnXSxcblx0aW5wdXRbdHlwZT0nc2VhcmNoJ10sXG5cdGlucHV0W3R5cGU9J3RleHQnXSxcblx0aW5wdXRbdHlwZT0ndXJsJ10sXG5cdGlucHV0Om5vdChbdHlwZV0pLFxuXHR0ZXh0YXJlYSB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRyZXNpemU6IHZlcnRpY2FsO1xuXHRcdC1tb3otdGFiLXNpemU6IDQgIWltcG9ydGFudDtcblx0XHR0YWItc2l6ZTogNCAhaW1wb3J0YW50O1xuXHR9XG5cblx0aW5wdXRbdHlwZT0nY2hlY2tib3gnXSB7XG5cdFx0dmVydGljYWwtYWxpZ246IC0wLjE1ZW07XG5cdH1cblxuXHRAc3VwcG9ydHMgKG5vdCAoLXdlYmtpdC1oeXBoZW5zOm5vbmUpKSBhbmQgKG5vdCAoLW1vei1hcHBlYXJhbmNlOm5vbmUpKSBhbmQgKGxpc3Qtc3R5bGUtdHlwZTonKicpIHtcblx0XHR0ZXh0YXJlYTpmb2N1cyB7XG5cdFx0XHQvKiBJbmV4cGxpY2FibHkgbWlzc2luZyBmcm9tIENocm9tZeKAmXMgaW5wdXQgc3R5bGUgaHR0cHM6Ly9naXRodWIuY29tL2Nocm9taXVtL2Nocm9taXVtL2Jsb2IvNmJlYTA1NTdmZS9leHRlbnNpb25zL3JlbmRlcmVyL3Jlc291cmNlcy9leHRlbnNpb24uY3NzI0wyODcgKi9cblx0XHRcdGJvcmRlci1jb2xvcjogIzRkOTBmZTtcblx0XHRcdHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAyMDBtcztcblx0XHR9XG5cdH1cblxuXHRociB7XG5cdFx0bWFyZ2luLXJpZ2h0OiBjYWxjKC0xICogdmFyKC0tYm9keS1tYXJnaW4taCkpO1xuXHRcdG1hcmdpbi1sZWZ0OiBjYWxjKC0xICogdmFyKC0tYm9keS1tYXJnaW4taCkpO1xuXHRcdGJvcmRlcjogbm9uZTtcblx0XHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2FhYTQ7XG5cdH1cblxuXHRpbWcge1xuXHRcdHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG5cdH1cblxuXHRfOjotd2Via2l0LWZ1bGwtcGFnZS1tZWRpYSxcblx0XzpmdXR1cmUsXG5cdDpyb290IHtcblx0XHRmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmLCAnQXBwbGUgQ29sb3IgRW1vamknO1xuXHR9XG5cblx0Xzo6LXdlYmtpdC1mdWxsLXBhZ2UtbWVkaWEsXG5cdF86ZnV0dXJlLFxuXHRpbnB1dFt0eXBlPSdudW1iZXInXSxcblx0aW5wdXRbdHlwZT0ncGFzc3dvcmQnXSxcblx0aW5wdXRbdHlwZT0nc2VhcmNoJ10sXG5cdGlucHV0W3R5cGU9J3RleHQnXSxcblx0aW5wdXRbdHlwZT0ndXJsJ10sXG5cdGlucHV0Om5vdChbdHlwZV0pLFxuXHR0ZXh0YXJlYSB7XG5cdFx0Ym9yZGVyOiBzb2xpZCAxcHggIzg4ODtcblx0XHRwYWRkaW5nOiAwLjRlbTtcblx0XHRmb250OiBpbmhlcml0O1xuXHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcblx0fVxuXG5cdEBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcblx0XHQ6cm9vdCB7XG5cdFx0XHRjb2xvci1zY2hlbWU6IGRhcms7XG5cdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yLWZvci1jaHJvbWUpO1xuXHRcdH1cblxuXHRcdGJvZHksXG5cdFx0aDMgeyAvKiBDaHJvbWUgIzMgKi9cblx0XHRcdGNvbG9yOiAjZThlYWVkO1xuXHRcdH1cblxuXHRcdGEge1xuXHRcdFx0Y29sb3I6IHZhcigtLWxpbmstY29sb3IsICM4YWI0ZjgpO1xuXHRcdH1cblxuXHRcdGE6YWN0aXZlIHtcblx0XHRcdGNvbG9yOiB2YXIoLS1saW5rLWNvbG9yLWFjdGl2ZSwgI2I2ZDNmOSk7XG5cdFx0fVxuXG5cdFx0aW5wdXRbdHlwZT0nbnVtYmVyJ10sXG5cdFx0aW5wdXRbdHlwZT0ncGFzc3dvcmQnXSxcblx0XHRpbnB1dFt0eXBlPSdzZWFyY2gnXSxcblx0XHRpbnB1dFt0eXBlPSd0ZXh0J10sXG5cdFx0aW5wdXRbdHlwZT0ndXJsJ10sXG5cdFx0aW5wdXQ6bm90KFt0eXBlXSksXG5cdFx0dGV4dGFyZWEge1xuXHRcdFx0Y29sb3I6IGluaGVyaXQ7XG5cdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0XHR9XG5cdH1cblxuXHQvKiBFbmQgd2ViZXh0LWJhc2UtY3NzICovXG5cblx0Ym9keSB7XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0XHRtaW4taGVpZ2h0OiAxMDB2aDtcblx0XHRtYXJnaW46IDA7XG5cdFx0cGFkZGluZzogMWVtO1xuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0XHRmb250LXNpemU6IDE0cHg7XG5cdFx0bGluZS1oZWlnaHQ6IDEuNTtcblx0XHRmb250LWZhbWlseTogc3lzdGVtLCBzeXN0ZW0tdWksIHNhbnMtc2VyaWY7XG5cdH1cblxuXHRidXR0b24ge1xuXHRcdG1hcmdpbi10b3A6IDFlbTtcblx0XHRtYXJnaW4tbGVmdDogYXV0bztcblx0fVxuYDtcbmZ1bmN0aW9uIGdldFBhZ2UobWVzc2FnZSA9ICcnKSB7XG4gICAgcmV0dXJuIC8qIGh0bWwgKi8gYFxuXHRcdDwhZG9jdHlwZSBodG1sPlxuXHRcdDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiIC8+XG5cdFx0PHRpdGxlPiR7Y2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5uYW1lfTwvdGl0bGU+XG5cdFx0PHN0eWxlPiR7Y3NzfTwvc3R5bGU+XG5cdFx0PHNjcmlwdCBkZWZlciBzcmM9XCJhbGVydC5qc1wiPjwvc2NyaXB0PlxuXHRcdDxib2R5PlxuXHRcdFx0PG1haW4+JHttZXNzYWdlfTwvbWFpbj5cblx0XHRcdDxidXR0b24+T2s8L2J1dHRvbj5cblx0XHQ8L2JvZHk+XG5cdFx0PHNjcmlwdD4oJHtwYWdlU2NyaXB0LnRvU3RyaW5nKCl9KSgpPC9zY3JpcHQ+XG5cdGA7XG59XG5hc3luYyBmdW5jdGlvbiBwb3B1cEFsZXJ0KG1lc3NhZ2UpIHtcbiAgICBjb25zdCB3aWR0aCA9IDQyMDtcbiAgICBjb25zdCBoZWlnaHQgPSAxNTA7XG4gICAgLy8gYGNocm9tZWAgaXMgUHJvbWlzaWZpZWQgd2hlcmUgYHBvcHVwQWxlcnRgIGlzIHVzZWRcbiAgICBjb25zdCBwb3B1cCA9IGF3YWl0IGNocm9tZS53aW5kb3dzLmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6ICdwb3B1cCcsXG4gICAgICAgIHVybDogJ2RhdGE6dGV4dC9odG1sLCcgKyBlbmNvZGVVUklDb21wb25lbnQoZ2V0UGFnZShtZXNzYWdlKSksXG4gICAgICAgIGZvY3VzZWQ6IHRydWUsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgd2lkdGgsXG4gICAgfSk7XG4gICAgYXdhaXQgb25Qb3B1cENsb3NlKHBvcHVwLmlkKTtcbn1cbi8vIGBhbGVydCgpYCBpcyBub3QgYXZhaWxhYmxlIGluIGFueSBzZXJ2aWNlIHdvcmtlclxuLy8gYGFsZXJ0KClgIGlzIG5vdCBhdmFpbGFibGUgaW4gYW55IGJhY2tncm91bmQgY29udGV4dCBpbiBGaXJlZm94IGFuZCBTYWZhcmlcbmNvbnN0IHdlYmV4dEFsZXJ0ID0gaXNCYWNrZ3JvdW5kV29ya2VyKCkgfHwgKCFpc0Nocm9tZSgpICYmIGlzQmFja2dyb3VuZFBhZ2UoKSlcbiAgICA/IHBvcHVwQWxlcnRcbiAgICA6IGFsZXJ0O1xuZXhwb3J0IGRlZmF1bHQgd2ViZXh0QWxlcnQ7XG4iLCJsZXQgY2FjaGUgPSB0cnVlO1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVXZWJleHREZXRlY3RQYWdlQ2FjaGUoKSB7XG4gICAgY2FjaGUgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzQ3VycmVudFBhdGhuYW1lKHBhdGgpIHtcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgICAgIHJldHVybiBwYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE1hbmlmZXN0KF92ZXJzaW9uKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lPy5nZXRNYW5pZmVzdD8uKCk7XG59XG5mdW5jdGlvbiBvbmNlKGZ1bmN0aW9uXykge1xuICAgIGxldCByZXN1bHQ7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKCFjYWNoZSB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuY3Rpb25fKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBvbiBodHRwKHMpOi8vIHBhZ2VzIChpdCBjb3VsZCBiZSBpbiBhIGNvbnRlbnQgc2NyaXB0IG9yIHJlZ3VsYXIgd2ViIGNvbnRleHQpICovXG5leHBvcnQgY29uc3QgaXNXZWJQYWdlID0gb25jZSgoKSA9PiBbJ2Fib3V0OicsICdodHRwOicsICdodHRwczonXS5pbmNsdWRlcyhsb2NhdGlvbi5wcm90b2NvbCkpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBleHRlbnNpb24gY29udGV4dHMgdGhhdCBoYXZlIGFjY2VzcyB0byB0aGUgY2hyb21lIEFQSSAqL1xuZXhwb3J0IGNvbnN0IGlzRXh0ZW5zaW9uQ29udGV4dCA9IG9uY2UoKCkgPT4gdHlwZW9mIGdsb2JhbFRoaXMuY2hyb21lPy5leHRlbnNpb24gPT09ICdvYmplY3QnKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBjb250ZW50IHNjcmlwdCAqL1xuZXhwb3J0IGNvbnN0IGlzQ29udGVudFNjcmlwdCA9IG9uY2UoKCkgPT4gaXNFeHRlbnNpb25Db250ZXh0KCkgJiYgaXNXZWJQYWdlKCkpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgY29udGV4dCAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZCA9ICgpID0+IGlzQmFja2dyb3VuZFBhZ2UoKSB8fCBpc0JhY2tncm91bmRXb3JrZXIoKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIHBhZ2UgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmRQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgY29uc3QgbWFuaWZlc3QgPSBnZXRNYW5pZmVzdCgyKTtcbiAgICBpZiAobWFuaWZlc3RcbiAgICAgICAgJiYgaXNDdXJyZW50UGF0aG5hbWUobWFuaWZlc3QuYmFja2dyb3VuZF9wYWdlID8/IG1hbmlmZXN0LmJhY2tncm91bmQ/LnBhZ2UpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gQm9vbGVhbihtYW5pZmVzdD8uYmFja2dyb3VuZD8uc2NyaXB0c1xuICAgICAgICAmJiBpc0N1cnJlbnRQYXRobmFtZSgnL19nZW5lcmF0ZWRfYmFja2dyb3VuZF9wYWdlLmh0bWwnKSk7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIHdvcmtlciAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZFdvcmtlciA9IG9uY2UoKCkgPT4gaXNDdXJyZW50UGF0aG5hbWUoZ2V0TWFuaWZlc3QoMyk/LmJhY2tncm91bmQ/LnNlcnZpY2Vfd29ya2VyKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgcGVyc2lzdGVudCBiYWNrZ3JvdW5kIHBhZ2UgKGFzIG9wcG9zZWQgdG8gYW4gRXZlbnQgUGFnZSBvciBCYWNrZ3JvdW5kIFdvcmtlciwgYm90aCBvZiB3aGljaCBjYW4gYmUgdW5sb2FkZWQgYnkgdGhlIGJyb3dzZXIpICovXG5leHBvcnQgY29uc3QgaXNQZXJzaXN0ZW50QmFja2dyb3VuZFBhZ2UgPSBvbmNlKCgpID0+IGlzQmFja2dyb3VuZFBhZ2UoKVxuICAgICYmIGdldE1hbmlmZXN0KDIpPy5tYW5pZmVzdF92ZXJzaW9uID09PSAyIC8vIEZpcmVmb3ggY2FuIGhhdmUgYSBiYWNrZ3JvdW5kIHBhZ2Ugb24gTVYzLCBidXQgY2FuJ3QgYmUgcGVyc2lzdGVudFxuICAgICYmIGdldE1hbmlmZXN0KDIpPy5iYWNrZ3JvdW5kPy5wZXJzaXN0ZW50ICE9PSBmYWxzZSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGFuIG9wdGlvbnMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgKi9cbmV4cG9ydCBjb25zdCBpc09wdGlvbnNQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgY29uc3QgcGF0aCA9IGdldE1hbmlmZXN0KCk/Lm9wdGlvbnNfdWk/LnBhZ2U7XG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGF0aCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICByZXR1cm4gdXJsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhbiBvcHRpb25zIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gICovXG5leHBvcnQgY29uc3QgaXNTaWRlUGFuZWwgPSBvbmNlKCgpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50IC0tIE5vdCB5ZXQgaW4gQHR5cGVzL2Nocm9tZVxuICAgIGNvbnN0IHBhdGggPSBnZXRNYW5pZmVzdCgzKT8uWydzaWRlX3BhbmVsJ10/LmRlZmF1bHRfcGF0aDtcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgZGV2IHRvb2xzIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gIGBkZXZ0b29sc19wYWdlYCBmaWVsZC4gKi9cbmV4cG9ydCBjb25zdCBpc0RldlRvb2xzUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGNvbnN0IGRldnRvb2xzUGFnZSA9IGlzRXh0ZW5zaW9uQ29udGV4dCgpICYmIGNocm9tZS5kZXZ0b29scyAmJiBnZXRNYW5pZmVzdCgpPy5kZXZ0b29sc19wYWdlO1xuICAgIGlmICh0eXBlb2YgZGV2dG9vbHNQYWdlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZGV2dG9vbHNQYWdlLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIHRoZSBkZXYgdG9vbHMgcGFnZS4gVW5saWtlIGBpc0RldlRvb2xzUGFnZWAsIHRoaXMgd29ya3MgaW4gYW55IHBhZ2UgdGhhdCBoYXMgdGhlIGBjaHJvbWUuZGV2VG9vbHNgIEFQSSAqL1xuZXhwb3J0IGNvbnN0IGlzRGV2VG9vbHMgPSAoKSA9PiBCb29sZWFuKGdsb2JhbFRoaXMuY2hyb21lPy5kZXZ0b29scyk7XG4vKiogTG9vc2VseSBkZXRlY3QgRmlyZWZveCB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzRmlyZWZveCA9ICgpID0+IGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ0ZpcmVmb3gnKTtcbi8qKiBMb29zZWx5IGRldGVjdCBDaHJvbWUgdmlhIHVzZXIgYWdlbnQgKG1pZ2h0IGFsc28gaW5jbHVkZSBDaHJvbWl1bSBhbmQgZm9ya3MgbGlrZSBPcGVyYSkgKi9cbmV4cG9ydCBjb25zdCBpc0Nocm9tZSA9ICgpID0+IGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ0Nocm9tZScpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IFNhZmFyaSB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzU2FmYXJpID0gKCkgPT4gIWlzQ2hyb21lKCkgJiYgZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnU2FmYXJpJyk7XG4vKiogTG9vc2VseSBkZXRlY3QgTW9iaWxlIFNhZmFyaSB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzTW9iaWxlU2FmYXJpID0gKCkgPT4gaXNTYWZhcmkoKSAmJiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdNb2JpbGUnKTtcbmNvbnN0IGNvbnRleHRDaGVja3MgPSB7XG4gICAgY29udGVudFNjcmlwdDogaXNDb250ZW50U2NyaXB0LFxuICAgIGJhY2tncm91bmQ6IGlzQmFja2dyb3VuZCxcbiAgICBvcHRpb25zOiBpc09wdGlvbnNQYWdlLFxuICAgIHNpZGVQYW5lbDogaXNTaWRlUGFuZWwsXG4gICAgZGV2VG9vbHM6IGlzRGV2VG9vbHMsXG4gICAgZGV2VG9vbHNQYWdlOiBpc0RldlRvb2xzUGFnZSxcbiAgICBleHRlbnNpb246IGlzRXh0ZW5zaW9uQ29udGV4dCxcbiAgICB3ZWI6IGlzV2ViUGFnZSxcbn07XG5leHBvcnQgY29uc3QgY29udGV4dE5hbWVzID0gT2JqZWN0LmtleXMoY29udGV4dENoZWNrcyk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGV4dE5hbWUoKSB7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgdGVzdF0gb2YgT2JqZWN0LmVudHJpZXMoY29udGV4dENoZWNrcykpIHtcbiAgICAgICAgaWYgKHRlc3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICd1bmtub3duJztcbn1cbiIsImltcG9ydCBjaHJvbWVQIGZyb20gJ3dlYmV4dC1wb2x5ZmlsbC1raW5kYSc7XG5pbXBvcnQgeyBwYXR0ZXJuVG9SZWdleCB9IGZyb20gJ3dlYmV4dC1wYXR0ZXJucyc7XG5jb25zdCBnb3RTY3JpcHRpbmcgPSBCb29sZWFuKGdsb2JhbFRoaXMuY2hyb21lPy5zY3JpcHRpbmcpO1xuZnVuY3Rpb24gY2FzdFRhcmdldCh0YXJnZXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcgPyB0YXJnZXQgOiB7XG4gICAgICAgIHRhYklkOiB0YXJnZXQsXG4gICAgICAgIGZyYW1lSWQ6IDAsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNhc3RBbGxGcmFtZXNUYXJnZXQodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnRhcmdldCwgYWxsRnJhbWVzOiBmYWxzZSB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0YWJJZDogdGFyZ2V0LFxuICAgICAgICBmcmFtZUlkOiB1bmRlZmluZWQsXG4gICAgICAgIGFsbEZyYW1lczogdHJ1ZSxcbiAgICB9O1xufVxuZnVuY3Rpb24gY2FzdEFycmF5KHBvc3NpYmxlQXJyYXkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwb3NzaWJsZUFycmF5KSkge1xuICAgICAgICByZXR1cm4gcG9zc2libGVBcnJheTtcbiAgICB9XG4gICAgcmV0dXJuIFtwb3NzaWJsZUFycmF5XTtcbn1cbmNvbnN0IG5hdGl2ZUZ1bmN0aW9uID0gL15mdW5jdGlvbiBcXHcrXFwoXFwpIHtbXFxuXFxzXStcXFtuYXRpdmUgY29kZV1bXFxuXFxzXSt9LztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRnVuY3Rpb24odGFyZ2V0LCBmdW5jdGlvbl8sIC4uLmFyZ3MpIHtcbiAgICBpZiAobmF0aXZlRnVuY3Rpb24udGVzdChTdHJpbmcoZnVuY3Rpb25fKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTmF0aXZlIGZ1bmN0aW9ucyBuZWVkIHRvIGJlIHdyYXBwZWQgZmlyc3QsIGxpa2UgYGV4ZWN1dGVGdW5jdGlvbigxLCAoKSA9PiBhbGVydCgxKSlgJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgZnJhbWVJZCwgdGFiSWQgfSA9IGNhc3RUYXJnZXQodGFyZ2V0KTtcbiAgICBpZiAoZ290U2NyaXB0aW5nKSB7XG4gICAgICAgIGNvbnN0IFtpbmplY3Rpb25dID0gYXdhaXQgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgIHRhYklkLFxuICAgICAgICAgICAgICAgIGZyYW1lSWRzOiBbZnJhbWVJZF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuYzogZnVuY3Rpb25fLFxuICAgICAgICAgICAgYXJncyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpbmplY3Rpb24/LnJlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgW3Jlc3VsdF0gPSBhd2FpdCBjaHJvbWVQLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xuICAgICAgICBjb2RlOiBgKCR7ZnVuY3Rpb25fLnRvU3RyaW5nKCl9KSguLi4ke0pTT04uc3RyaW5naWZ5KGFyZ3MpfSlgLFxuICAgICAgICBtYXRjaEFib3V0Qmxhbms6IHRydWUsIC8vIE5lZWRlZCBmb3IgYHNyY2RvY2AgZnJhbWVzOyBkb2Vzbid0IGh1cnQgbm9ybWFsIHBhZ2VzXG4gICAgICAgIGZyYW1lSWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGFycmF5T3JVbmRlZmluZWQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFt2YWx1ZV07XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uIC0tIEl0IGZvbGxvd3MgdGhlIG5hdGl2ZSBuYW1pbmdcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnNlcnRDU1MoeyB0YWJJZCwgZnJhbWVJZCwgZmlsZXMsIGFsbEZyYW1lcywgbWF0Y2hBYm91dEJsYW5rLCBydW5BdCwgfSwgeyBpZ25vcmVUYXJnZXRFcnJvcnMgfSA9IHt9KSB7XG4gICAgY29uc3QgZXZlcnlJbnNlcnRpb24gPSBQcm9taXNlLmFsbChmaWxlcy5tYXAoYXN5bmMgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29udGVudCA9IHsgZmlsZTogY29udGVudCB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChnb3RTY3JpcHRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBjaHJvbWUuc2NyaXB0aW5nLmluc2VydENTUyh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRhYklkLFxuICAgICAgICAgICAgICAgICAgICBmcmFtZUlkczogYXJyYXlPclVuZGVmaW5lZChmcmFtZUlkKSxcbiAgICAgICAgICAgICAgICAgICAgYWxsRnJhbWVzOiBmcmFtZUlkID09PSB1bmRlZmluZWQgPyBhbGxGcmFtZXMgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmaWxlczogJ2ZpbGUnIGluIGNvbnRlbnQgPyBbY29udGVudC5maWxlXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBjc3M6ICdjb2RlJyBpbiBjb250ZW50ID8gY29udGVudC5jb2RlIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNocm9tZVAudGFicy5pbnNlcnRDU1ModGFiSWQsIHtcbiAgICAgICAgICAgIC4uLmNvbnRlbnQsXG4gICAgICAgICAgICBtYXRjaEFib3V0QmxhbmssXG4gICAgICAgICAgICBhbGxGcmFtZXMsXG4gICAgICAgICAgICBmcmFtZUlkLFxuICAgICAgICAgICAgcnVuQXQ6IHJ1bkF0ID8/ICdkb2N1bWVudF9zdGFydCcsIC8vIENTUyBzaG91bGQgcHJlZmVyIGBkb2N1bWVudF9zdGFydGAgd2hlbiB1bnNwZWNpZmllZFxuICAgICAgICB9KTtcbiAgICB9KSk7XG4gICAgaWYgKGlnbm9yZVRhcmdldEVycm9ycykge1xuICAgICAgICBhd2FpdCBjYXRjaFRhcmdldEluamVjdGlvbkVycm9ycyhldmVyeUluc2VydGlvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhd2FpdCBldmVyeUluc2VydGlvbjtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NlcnROb0NvZGUoZmlsZXMpIHtcbiAgICBpZiAoZmlsZXMuc29tZShjb250ZW50ID0+ICdjb2RlJyBpbiBjb250ZW50KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nocm9tZS5zY3JpcHRpbmcgZG9lcyBub3Qgc3VwcG9ydCBpbmplY3Rpbmcgc3RyaW5ncyBvZiBgY29kZWAnKTtcbiAgICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVNjcmlwdCh7IHRhYklkLCBmcmFtZUlkLCBmaWxlcywgYWxsRnJhbWVzLCBtYXRjaEFib3V0QmxhbmssIHJ1bkF0LCB9LCB7IGlnbm9yZVRhcmdldEVycm9ycyB9ID0ge30pIHtcbiAgICBjb25zdCBub3JtYWxpemVkRmlsZXMgPSBmaWxlcy5tYXAoZmlsZSA9PiB0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycgPyB7IGZpbGUgfSA6IGZpbGUpO1xuICAgIGlmIChnb3RTY3JpcHRpbmcpIHtcbiAgICAgICAgYXNzZXJ0Tm9Db2RlKG5vcm1hbGl6ZWRGaWxlcyk7XG4gICAgICAgIGNvbnN0IGluamVjdGlvbiA9IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICB0YWJJZCxcbiAgICAgICAgICAgICAgICBmcmFtZUlkczogYXJyYXlPclVuZGVmaW5lZChmcmFtZUlkKSxcbiAgICAgICAgICAgICAgICBhbGxGcmFtZXM6IGZyYW1lSWQgPT09IHVuZGVmaW5lZCA/IGFsbEZyYW1lcyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaWxlczogbm9ybWFsaXplZEZpbGVzLm1hcCgoeyBmaWxlIH0pID0+IGZpbGUpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGlnbm9yZVRhcmdldEVycm9ycykge1xuICAgICAgICAgICAgYXdhaXQgY2F0Y2hUYXJnZXRJbmplY3Rpb25FcnJvcnMoaW5qZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IGluamVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCByZXR1cm4gYGluamVjdGlvbmA7IHRoZSBcInJldHVybiB2YWx1ZVwiIG9mIGEgZmlsZSBpcyBnZW5lcmFsbHkgbm90IHVzZWZ1bFxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIERvbid0IHVzZSAubWFwKCksIGBjb2RlYCBpbmplY3Rpb25zIGNhbid0IGJlIFwicGFyYWxsZWxcIlxuICAgIGNvbnN0IGV4ZWN1dGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGNvbnRlbnQgb2Ygbm9ybWFsaXplZEZpbGVzKSB7XG4gICAgICAgIC8vIEZpbGVzIGFyZSBleGVjdXRlZCBpbiBvcmRlciwgYnV0IGBjb2RlYCBpc27igJl0LCBzbyBpdCBtdXN0IGF3YWl0IHRoZSBsYXN0IHNjcmlwdCBiZWZvcmUgaW5qZWN0aW5nIG1vcmVcbiAgICAgICAgaWYgKCdjb2RlJyBpbiBjb250ZW50KSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcCAtLSBPbiBwdXJwb3NlLCBzZWUgYWJvdmVcbiAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGlvbnMuYXQoLTEpO1xuICAgICAgICB9XG4gICAgICAgIGV4ZWN1dGlvbnMucHVzaChjaHJvbWVQLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xuICAgICAgICAgICAgLi4uY29udGVudCxcbiAgICAgICAgICAgIG1hdGNoQWJvdXRCbGFuayxcbiAgICAgICAgICAgIGFsbEZyYW1lcyxcbiAgICAgICAgICAgIGZyYW1lSWQsXG4gICAgICAgICAgICBydW5BdCxcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAoaWdub3JlVGFyZ2V0RXJyb3JzKSB7XG4gICAgICAgIGF3YWl0IGNhdGNoVGFyZ2V0SW5qZWN0aW9uRXJyb3JzKFByb21pc2UuYWxsKGV4ZWN1dGlvbnMpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGV4ZWN1dGlvbnMpO1xuICAgIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUYWJzQnlVcmwobWF0Y2hlcywgZXhjbHVkZU1hdGNoZXMpIHtcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCBleGNsdWRlID0gZXhjbHVkZU1hdGNoZXMgPyBwYXR0ZXJuVG9SZWdleCguLi5leGNsdWRlTWF0Y2hlcykgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgdGFicyA9IGF3YWl0IGNocm9tZVAudGFicy5xdWVyeSh7IHVybDogbWF0Y2hlcyB9KTtcbiAgICByZXR1cm4gdGFic1xuICAgICAgICAuZmlsdGVyKHRhYiA9PiB0YWIuaWQgJiYgdGFiLnVybCAmJiAoZXhjbHVkZSA/ICFleGNsdWRlLnRlc3QodGFiLnVybCkgOiB0cnVlKSlcbiAgICAgICAgLm1hcCh0YWIgPT4gdGFiLmlkKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbmplY3RDb250ZW50U2NyaXB0KHdoZXJlLCBzY3JpcHRzLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB0YXJnZXRzID0gY2FzdEFycmF5KHdoZXJlKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbCh0YXJnZXRzLm1hcChhc3luYyAodGFyZ2V0KSA9PiBpbmplY3RDb250ZW50U2NyaXB0SW5TcGVjaWZpY1RhcmdldChjYXN0QWxsRnJhbWVzVGFyZ2V0KHRhcmdldCksIHNjcmlwdHMsIG9wdGlvbnMpKSk7XG59XG5hc3luYyBmdW5jdGlvbiBpbmplY3RDb250ZW50U2NyaXB0SW5TcGVjaWZpY1RhcmdldCh7IGZyYW1lSWQsIHRhYklkLCBhbGxGcmFtZXMgfSwgc2NyaXB0cywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgaW5qZWN0aW9ucyA9IGNhc3RBcnJheShzY3JpcHRzKS5mbGF0TWFwKHNjcmlwdCA9PiBbXG4gICAgICAgIGluc2VydENTUyh7XG4gICAgICAgICAgICB0YWJJZCxcbiAgICAgICAgICAgIGZyYW1lSWQsXG4gICAgICAgICAgICBhbGxGcmFtZXMsXG4gICAgICAgICAgICBmaWxlczogc2NyaXB0LmNzcyA/PyBbXSxcbiAgICAgICAgICAgIG1hdGNoQWJvdXRCbGFuazogc2NyaXB0Lm1hdGNoQWJvdXRCbGFuayA/PyBzY3JpcHQubWF0Y2hfYWJvdXRfYmxhbmssXG4gICAgICAgICAgICBydW5BdDogc2NyaXB0LnJ1bkF0ID8/IHNjcmlwdC5ydW5fYXQsXG4gICAgICAgIH0sIG9wdGlvbnMpLFxuICAgICAgICBleGVjdXRlU2NyaXB0KHtcbiAgICAgICAgICAgIHRhYklkLFxuICAgICAgICAgICAgZnJhbWVJZCxcbiAgICAgICAgICAgIGFsbEZyYW1lcyxcbiAgICAgICAgICAgIGZpbGVzOiBzY3JpcHQuanMgPz8gW10sXG4gICAgICAgICAgICBtYXRjaEFib3V0Qmxhbms6IHNjcmlwdC5tYXRjaEFib3V0QmxhbmsgPz8gc2NyaXB0Lm1hdGNoX2Fib3V0X2JsYW5rLFxuICAgICAgICAgICAgcnVuQXQ6IHNjcmlwdC5ydW5BdCA/PyBzY3JpcHQucnVuX2F0LFxuICAgICAgICB9LCBvcHRpb25zKSxcbiAgICBdKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChpbmplY3Rpb25zKTtcbn1cbi8vIFNvdXJjZWQgZnJvbTpcbi8vIGh0dHBzOi8vc291cmNlLmNocm9taXVtLm9yZy9jaHJvbWl1bS9jaHJvbWl1bS9zcmMvKy9tYWluOmV4dGVuc2lvbnMvY29tbW9uL2V4dGVuc2lvbl91cmxzLmNjO2RyYz02YjQyMTE2ZmUzYjNkOTNhNzc3NTBiZGNjMDc5NDhlOThhNzI4NDA1O2w9Mjlcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQ29udGVudF9zY3JpcHRzXG5jb25zdCBibG9ja2VkUHJlZml4ZXMgPSBbXG4gICAgJ2Nocm9tZS5nb29nbGUuY29tL3dlYnN0b3JlJywgLy8gSG9zdCAqYW5kKiBwYXRobmFtZVxuICAgICdjaHJvbWV3ZWJzdG9yZS5nb29nbGUuY29tJyxcbiAgICAnYWNjb3VudHMtc3RhdGljLmNkbi5tb3ppbGxhLm5ldCcsXG4gICAgJ2FjY291bnRzLmZpcmVmb3guY29tJyxcbiAgICAnYWRkb25zLmNkbi5tb3ppbGxhLm5ldCcsXG4gICAgJ2FkZG9ucy5tb3ppbGxhLm9yZycsXG4gICAgJ2FwaS5hY2NvdW50cy5maXJlZm94LmNvbScsXG4gICAgJ2NvbnRlbnQuY2RuLm1vemlsbGEubmV0JyxcbiAgICAnZGlzY292ZXJ5LmFkZG9ucy5tb3ppbGxhLm9yZycsXG4gICAgJ2lucHV0Lm1vemlsbGEub3JnJyxcbiAgICAnaW5zdGFsbC5tb3ppbGxhLm9yZycsXG4gICAgJ29hdXRoLmFjY291bnRzLmZpcmVmb3guY29tJyxcbiAgICAncHJvZmlsZS5hY2NvdW50cy5maXJlZm94LmNvbScsXG4gICAgJ3N1cHBvcnQubW96aWxsYS5vcmcnLFxuICAgICdzeW5jLnNlcnZpY2VzLm1vemlsbGEuY29tJyxcbiAgICAndGVzdHBpbG90LmZpcmVmb3guY29tJyxcbl07XG5leHBvcnQgZnVuY3Rpb24gaXNTY3JpcHRhYmxlVXJsKHVybCkge1xuICAgIGlmICghdXJsPy5zdGFydHNXaXRoKCdodHRwJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBjbGVhblVybCA9IHVybC5yZXBsYWNlKC9eaHR0cHM/OlxcL1xcLy8sICcnKTtcbiAgICByZXR1cm4gYmxvY2tlZFByZWZpeGVzLmV2ZXJ5KGJsb2NrZWQgPT4gIWNsZWFuVXJsLnN0YXJ0c1dpdGgoYmxvY2tlZCkpO1xufVxuY29uc3QgdGFyZ2V0RXJyb3JzID0gL15ObyBmcmFtZSB3aXRoIGlkIFxcZCsgaW4gdGFiIFxcZCsuJHxeTm8gdGFiIHdpdGggaWQ6IFxcZCsuJHxeVGhlIHRhYiB3YXMgY2xvc2VkLiR8XlRoZSBmcmFtZSB3YXMgcmVtb3ZlZC4kLztcbmFzeW5jIGZ1bmN0aW9uIGNhdGNoVGFyZ2V0SW5qZWN0aW9uRXJyb3JzKHByb21pc2UpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBPcHRpb25hbCBjaGFpbmluZyBpcyBnb29kIGVub3VnaFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuICAgICAgICBpZiAoIXRhcmdldEVycm9ycy50ZXN0KGVycm9yPy5tZXNzYWdlKSkge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBOb3QgYWxsIGtleXMgYXJlIHN1cHBvcnRlZCBieSB0aGUgcG9seWZpbGwgdG8gYmVnaW4gd2l0aFxuLy8gbWF0Y2hBYm91dEJsYW5rOiBodHRwczovL2dpdGh1Yi5jb20vZnJlZ2FudGUvY29udGVudC1zY3JpcHRzLXJlZ2lzdGVyLXBvbHlmaWxsL2lzc3Vlcy8yXG4vLyAqR2xvYnM6IGh0dHBzOi8vZ2l0aHViLmNvbS9mcmVnYW50ZS9jb250ZW50LXNjcmlwdHMtcmVnaXN0ZXItcG9seWZpbGwvaXNzdWVzLzM1XG5mdW5jdGlvbiBnZXREaWZmZXJlbnRpYXRvcnMoYykge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShbYy5hbGxfZnJhbWVzLCBjLmV4Y2x1ZGVfbWF0Y2hlcywgYy5ydW5fYXRdKTtcbn1cbi8qKlxuRXhjbHVkZSBzYW1lLWZpbGUgaW5qZWN0aW9ucyBmcm9tIGEgbWFuaWZlc3QgYGNvbnRlbnRfc2NyaXB0YCBhcnJheSBkdWUgdG8gYSBjaGFuZ2UgaW4gdGhlIHBvbHlmaWxsLlxuaHR0cHM6Ly9naXRodWIuY29tL2ZyZWdhbnRlL3dlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0cy9pc3N1ZXMvNjJcbiovXG5leHBvcnQgZnVuY3Rpb24gZXhjbHVkZUR1cGxpY2F0ZUZpbGVzKGNvbnRlbnRTY3JpcHRzLCB7IHdhcm4gPSB0cnVlIH0gPSB7fSkge1xuICAgIGNvbnN0IHVuaXF1ZXMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgZmlsdGVyV2FybkFuZEFkZCA9IChmaWxlcywgY29udGV4dCkgPT4ge1xuICAgICAgICBpZiAoIWZpbGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGVzLmZpbHRlcihmaWxlID0+IHtcbiAgICAgICAgICAgIC8vIElmIGEgY29udGVudCBzY3JpcHQgaGFzIHRoZSBzYW1lIG9wdGlvbnMsIHRoZW4gaXQncyAxMDAlIGR1cGxpY2F0ZSBhbmQgc2FmZSB0byByZW1vdmUuXG4gICAgICAgICAgICAvLyBJZiBpdCBkb2Vzbid0IGhhdmUgdGhlIHNhbWUgb3B0aW9ucywgdGhlbiByZW1vdmluZyBpdCBjYW4gY2F1c2UgaXNzdWVzLlxuICAgICAgICAgICAgY29uc3QgZGlmZmVyZW50aWF0b3JzID0gZ2V0RGlmZmVyZW50aWF0b3JzKGNvbnRleHQpO1xuICAgICAgICAgICAgLy8gRXhjbHVkZSBmaWxlcyBmcm9tIGN1cnJlbnQgc2NyaXB0IGlmIHRoZXkgd2VyZSBhbHJlYWR5IGluamVjdGVkIGJ5IGFub3RoZXIgc2NyaXB0XG4gICAgICAgICAgICBpZiAodW5pcXVlcy5oYXMoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBXYXJuIHRoZSB1c2VyIGluIGNhc2UgdGhpcyByZW1vdmFsIGNoYW5nZXMgdGhlIGJlaGF2aW9yIGZyb20gd2hhdCdzIGV4cGVjdGVkXG4gICAgICAgICAgICAgICAgaWYgKHdhcm4gJiYgZGlmZmVyZW50aWF0b3JzICE9PSB1bmlxdWVzLmdldChmaWxlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYER1cGxpY2F0ZSBmaWxlIGluIHRoZSBtYW5pZmVzdCBjb250ZW50X3NjcmlwdHM6ICR7ZmlsZX0gXFxuTW9yZSBpbmZvOiBodHRwczovL2dpdGh1Yi5jb20vZnJlZ2FudGUvd2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHRzL2lzc3Vlcy82MmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1bmlxdWVzLnNldChmaWxlLCBkaWZmZXJlbnRpYXRvcnMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIGNvbnRlbnRTY3JpcHRzLmZsYXRNYXAoY29udGVudFNjcmlwdCA9PiB7XG4gICAgICAgIC8vIFRvIGF2b2lkIGNvbmZ1c2lvbiwgZHJvcCB0aGUgYG1hdGNoZXNgIGFycmF5IHNpbmNlIGl0J3Mgbm90IHVzZWQgYnkgYHdlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0c2BcbiAgICAgICAgY29uc3QgeyBtYXRjaGVzLCAuLi5jbGVhbkNvbnRlbnRTY3JpcHQgfSA9IGNvbnRlbnRTY3JpcHQ7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICh7XG4gICAgICAgICAgICAuLi5jbGVhbkNvbnRlbnRTY3JpcHQsXG4gICAgICAgICAgICBqczogZmlsdGVyV2FybkFuZEFkZChjb250ZW50U2NyaXB0LmpzLCBjb250ZW50U2NyaXB0KSxcbiAgICAgICAgICAgIGNzczogZmlsdGVyV2FybkFuZEFkZChjb250ZW50U2NyaXB0LmNzcywgY29udGVudFNjcmlwdCksXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBEcm9wIGVudGlyZSBibG9jayBpZiBjb21wbGV0ZSBkdXBsaWNhdGUgKHRoZSBgbWF0Y2hlc2AgYXJyYXkgY291bGQgYmUgZGlmZmVyZW50LCBidXQgdGhhdCBkb2Vzbid0IG1hdHRlciBpbiBgd2ViZXh0LWR5bmFtaWMtY29udGVudC1zY3JpcHRzYClcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5jc3MubGVuZ3RoICsgcmVzdWx0LmpzLmxlbmd0aCA9PT0gMCA/IFtdIDogcmVzdWx0O1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgaW5pdCB9IGZyb20gJy4vbGliLmpzJztcbnZvaWQgaW5pdCgpO1xuIiwiaW1wb3J0IHsgZ2V0VGFic0J5VXJsLCBpbmplY3RDb250ZW50U2NyaXB0IH0gZnJvbSAnd2ViZXh0LWNvbnRlbnQtc2NyaXB0cyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5qZWN0VG9FeGlzdGluZ1RhYnMob3JpZ2lucywgc2NyaXB0cykge1xuICAgIGNvbnN0IGV4Y2x1ZGVNYXRjaGVzID0gc2NyaXB0cy5mbGF0TWFwKHNjcmlwdCA9PiBzY3JpcHQubWF0Y2hlcyA/PyBbXSk7XG4gICAgcmV0dXJuIGluamVjdENvbnRlbnRTY3JpcHQoYXdhaXQgZ2V0VGFic0J5VXJsKG9yaWdpbnMsIGV4Y2x1ZGVNYXRjaGVzKSwgc2NyaXB0cywgeyBpZ25vcmVUYXJnZXRFcnJvcnM6IHRydWUgfSk7XG59XG4iLCJpbXBvcnQgeyBnZXRBZGRpdGlvbmFsUGVybWlzc2lvbnMgfSBmcm9tICd3ZWJleHQtYWRkaXRpb25hbC1wZXJtaXNzaW9ucyc7XG5pbXBvcnQgeyBleGNsdWRlRHVwbGljYXRlRmlsZXMgfSBmcm9tICcuL2RlZHVwbGljYXRvci5qcyc7XG5pbXBvcnQgeyBpbmplY3RUb0V4aXN0aW5nVGFicyB9IGZyb20gJy4vaW5qZWN0LXRvLWV4aXN0aW5nLXRhYnMuanMnO1xuaW1wb3J0IHsgcmVnaXN0ZXJDb250ZW50U2NyaXB0IH0gZnJvbSAnLi9yZWdpc3Rlci1jb250ZW50LXNjcmlwdC1zaGltLmpzJztcbmNvbnN0IHJlZ2lzdGVyZWRTY3JpcHRzID0gbmV3IE1hcCgpO1xuLy8gSW4gRmlyZWZveCwgcGF0aHMgaW4gdGhlIG1hbmlmZXN0IGFyZSBjb252ZXJ0ZWQgdG8gZnVsbCBVUkxzIHVuZGVyIGBtb3otZXh0ZW5zaW9uOi8vYCBidXQgYnJvd3Nlci5jb250ZW50U2NyaXB0cyBleHBlY3RzIGV4Y2x1c2l2ZWx5IHJlbGF0aXZlIHBhdGhzXG5mdW5jdGlvbiBtYWtlUGF0aFJlbGF0aXZlKGZpbGUpIHtcbiAgICByZXR1cm4gbmV3IFVSTChmaWxlLCBsb2NhdGlvbi5vcmlnaW4pLnBhdGhuYW1lO1xufVxuLy8gQXV0b21hdGljYWxseSByZWdpc3RlciB0aGUgY29udGVudCBzY3JpcHRzIG9uIHRoZSBuZXcgb3JpZ2luc1xuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJPbk9yaWdpbnMoeyBvcmlnaW5zOiBuZXdPcmlnaW5zLCB9KSB7XG4gICAgY29uc3QgeyBjb250ZW50X3NjcmlwdHM6IHJhd01hbmlmZXN0LCBtYW5pZmVzdF92ZXJzaW9uOiBtYW5pZmVzdFZlcnNpb24gfSA9IGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCk7XG4gICAgaWYgKCFyYXdNYW5pZmVzdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3dlYmV4dC1keW5hbWljLWNvbnRlbnQtc2NyaXB0cyB0cmllZCB0byByZWdpc3RlciBzY3JpcHRzIG9uIHRoZSBuZXcgaG9zdCBwZXJtaXNzaW9ucywgYnV0IG5vIGNvbnRlbnQgc2NyaXB0cyB3ZXJlIGZvdW5kIGluIHRoZSBtYW5pZmVzdC4nKTtcbiAgICB9XG4gICAgY29uc3QgY2xlYW5NYW5pZmVzdCA9IGV4Y2x1ZGVEdXBsaWNhdGVGaWxlcyhyYXdNYW5pZmVzdCwgeyB3YXJuOiBtYW5pZmVzdFZlcnNpb24gPT09IDIgfSk7XG4gICAgLy8gUmVnaXN0ZXIgb25lIGF0IGEgdGltZSB0byBhbGxvdyByZW1vdmluZyBvbmUgYXQgYSB0aW1lIGFzIHdlbGxcbiAgICBmb3IgKGNvbnN0IG9yaWdpbiBvZiBuZXdPcmlnaW5zIHx8IFtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgY29uZmlnIG9mIGNsZWFuTWFuaWZlc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlZ2lzdGVyZWRTY3JpcHQgPSByZWdpc3RlckNvbnRlbnRTY3JpcHQoe1xuICAgICAgICAgICAgICAgIC8vIEFsd2F5cyBjb252ZXJ0IHBhdGhzIGhlcmUgYmVjYXVzZSB3ZSBkb24ndCBrbm93IHdoZXRoZXIgRmlyZWZveCBNVjMgd2lsbCBhY2NlcHQgZnVsbCBVUkxzXG4gICAgICAgICAgICAgICAganM6IGNvbmZpZy5qcz8ubWFwKGZpbGUgPT4gbWFrZVBhdGhSZWxhdGl2ZShmaWxlKSksXG4gICAgICAgICAgICAgICAgY3NzOiBjb25maWcuY3NzPy5tYXAoZmlsZSA9PiBtYWtlUGF0aFJlbGF0aXZlKGZpbGUpKSxcbiAgICAgICAgICAgICAgICBhbGxGcmFtZXM6IGNvbmZpZy5hbGxfZnJhbWVzLFxuICAgICAgICAgICAgICAgIG1hdGNoZXM6IFtvcmlnaW5dLFxuICAgICAgICAgICAgICAgIGV4Y2x1ZGVNYXRjaGVzOiBjb25maWcubWF0Y2hlcyxcbiAgICAgICAgICAgICAgICBydW5BdDogY29uZmlnLnJ1bl9hdCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVnaXN0ZXJlZFNjcmlwdHMuc2V0KG9yaWdpbiwgcmVnaXN0ZXJlZFNjcmlwdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gTWF5IG5vdCBiZSBuZWVkZWQgaW4gdGhlIGZ1dHVyZSBpbiBGaXJlZm94XG4gICAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQ1ODk0N1xuICAgIHZvaWQgaW5qZWN0VG9FeGlzdGluZ1RhYnMobmV3T3JpZ2lucyB8fCBbXSwgY2xlYW5NYW5pZmVzdCk7XG59XG5mdW5jdGlvbiBoYW5kbGVOZXdQZXJtaXNzaW9ucyhwZXJtaXNzaW9ucykge1xuICAgIGlmIChwZXJtaXNzaW9ucy5vcmlnaW5zICYmIHBlcm1pc3Npb25zLm9yaWdpbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB2b2lkIHJlZ2lzdGVyT25PcmlnaW5zKHBlcm1pc3Npb25zKTtcbiAgICB9XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVkRHJvcHBlZFBlcm1pc3Npb25zKHsgb3JpZ2lucyB9KSB7XG4gICAgaWYgKCFvcmlnaW5zIHx8IG9yaWdpbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbb3JpZ2luLCBzY3JpcHRQcm9taXNlXSBvZiByZWdpc3RlcmVkU2NyaXB0cykge1xuICAgICAgICBpZiAob3JpZ2lucy5pbmNsdWRlcyhvcmlnaW4pKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICAgICAgY29uc3Qgc2NyaXB0ID0gYXdhaXQgc2NyaXB0UHJvbWlzZTtcbiAgICAgICAgICAgIHZvaWQgc2NyaXB0LnVucmVnaXN0ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KCkge1xuICAgIGNocm9tZS5wZXJtaXNzaW9ucy5vblJlbW92ZWQuYWRkTGlzdGVuZXIoaGFuZGxlZERyb3BwZWRQZXJtaXNzaW9ucyk7XG4gICAgY2hyb21lLnBlcm1pc3Npb25zLm9uQWRkZWQuYWRkTGlzdGVuZXIoaGFuZGxlTmV3UGVybWlzc2lvbnMpO1xuICAgIGF3YWl0IHJlZ2lzdGVyT25PcmlnaW5zKGF3YWl0IGdldEFkZGl0aW9uYWxQZXJtaXNzaW9ucyh7XG4gICAgICAgIHN0cmljdE9yaWdpbnM6IGZhbHNlLFxuICAgIH0pKTtcbn1cbiIsImltcG9ydCByZWdpc3RlckNvbnRlbnRTY3JpcHRQb255ZmlsbCBmcm9tICdjb250ZW50LXNjcmlwdHMtcmVnaXN0ZXItcG9seWZpbGwvcG9ueWZpbGwuanMnO1xuZXhwb3J0IGNvbnN0IGNocm9tZVJlZ2lzdGVyID0gZ2xvYmFsVGhpcy5jaHJvbWU/LnNjcmlwdGluZz8ucmVnaXN0ZXJDb250ZW50U2NyaXB0cztcbmV4cG9ydCBjb25zdCBmaXJlZm94UmVnaXN0ZXIgPSBnbG9iYWxUaGlzLmJyb3dzZXI/LmNvbnRlbnRTY3JpcHRzPy5yZWdpc3RlcjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlckNvbnRlbnRTY3JpcHQoY29udGVudFNjcmlwdCkge1xuICAgIGlmIChjaHJvbWVSZWdpc3Rlcikge1xuICAgICAgICBjb25zdCBpZCA9ICd3ZWJleHQtZHluYW1pYy1jb250ZW50LXNjcmlwdC0nICsgSlNPTi5zdHJpbmdpZnkoY29udGVudFNjcmlwdCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBjaHJvbWVSZWdpc3Rlcihbe1xuICAgICAgICAgICAgICAgICAgICAuLi5jb250ZW50U2NyaXB0LFxuICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoIWVycm9yPy5tZXNzYWdlLnN0YXJ0c1dpdGgoJ0R1cGxpY2F0ZSBzY3JpcHQgSUQnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1bnJlZ2lzdGVyOiBhc3luYyAoKSA9PiBjaHJvbWUuc2NyaXB0aW5nLnVucmVnaXN0ZXJDb250ZW50U2NyaXB0cyh7IGlkczogW2lkXSB9KSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgZmlyZWZveENvbnRlbnRTY3JpcHQgPSB7XG4gICAgICAgIC4uLmNvbnRlbnRTY3JpcHQsXG4gICAgICAgIGpzOiBjb250ZW50U2NyaXB0LmpzPy5tYXAoZmlsZSA9PiAoeyBmaWxlIH0pKSxcbiAgICAgICAgY3NzOiBjb250ZW50U2NyaXB0LmNzcz8ubWFwKGZpbGUgPT4gKHsgZmlsZSB9KSksXG4gICAgfTtcbiAgICBpZiAoZmlyZWZveFJlZ2lzdGVyKSB7XG4gICAgICAgIHJldHVybiBmaXJlZm94UmVnaXN0ZXIoZmlyZWZveENvbnRlbnRTY3JpcHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJDb250ZW50U2NyaXB0UG9ueWZpbGwoZmlyZWZveENvbnRlbnRTY3JpcHQpO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9vbi1jb250ZXh0LWludmFsaWRhdGVkLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vb24tZXh0ZW5zaW9uLXN0YXJ0LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vb25lLWV2ZW50LmpzJztcbiIsImNsYXNzIE9uQ29udGV4dEludmFsaWRhdGVkIHtcbiAgICAjdGltZXI7XG4gICAgI2NvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgLy8gQ2FsbGluZyB0aGlzIHdpbGwgc3RhcnQgdGhlIHBvbGxpbmdcbiAgICBnZXQgc2lnbmFsKCkge1xuICAgICAgICBpZiAodGhpcy4jdGltZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiNjb250cm9sbGVyLnNpZ25hbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiN0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh3YXNDb250ZXh0SW52YWxpZGF0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuI2NvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuI3RpbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2NvbnRyb2xsZXIuc2lnbmFsO1xuICAgIH1cbiAgICBnZXQgcHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihyZXNvbHZlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNhbGxiYWNrICAgICAgICAgVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgY29udGV4dCBpcyBpbnZhbGlkYXRlZFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnNpZ25hbCAgIFRoZSBzaWduYWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciwgbGlrZSB3aXRoIHRoZSByZWd1bGFyIGBhZGRFdmVudExpc3RlbmVyKClgXG4gICAgICovXG4gICAgYWRkTGlzdGVuZXIoY2FsbGJhY2ssIHsgc2lnbmFsIH0gPSB7fSkge1xuICAgICAgICBpZiAodGhpcy5zaWduYWwuYWJvcnRlZCAmJiAhc2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGNhbGxiYWNrLCB7IG9uY2U6IHRydWUsIHNpZ25hbCB9KTtcbiAgICB9XG59XG5leHBvcnQgY29uc3Qgb25Db250ZXh0SW52YWxpZGF0ZWQgPSBuZXcgT25Db250ZXh0SW52YWxpZGF0ZWQoKTtcbmV4cG9ydCBjb25zdCB3YXNDb250ZXh0SW52YWxpZGF0ZWQgPSAoKSA9PiAhY2hyb21lLnJ1bnRpbWU/LmlkO1xuLy8gVGhpcyBpcyBkb25lIHRvIGVuc3VyZSBlYWNoIGxpc3RlbmVyIGFuZCBhYm9ydHNpZ25hbCBhcmUgaW5kZXBlbmRlbnQgaW4gZWFjaCB0ZXN0XG5leHBvcnQgY29uc3QgX3Rlc3RpbmcgPSBPbkNvbnRleHRJbnZhbGlkYXRlZDtcbiIsImltcG9ydCB7IGlzQ2hyb21lLCBpc1BlcnNpc3RlbnRCYWNrZ3JvdW5kUGFnZSB9IGZyb20gJ3dlYmV4dC1kZXRlY3QtcGFnZSc7XG5jb25zdCBzdG9yYWdlS2V5ID0gJ19fd2ViZXh0LWV2ZW50c19fc3RhcnR1cCc7XG5jb25zdCBldmVudCA9IG5ldyBFdmVudFRhcmdldCgpO1xubGV0IGhhc1J1biA9IGZhbHNlO1xubGV0IGhhc0xpc3RlbmVycyA9IGZhbHNlO1xuLy8gQHRzLWV4cGVjdC1lcnJvciBObyBuZWVkIHRvIGxvYWQgYGJyb3dzZXJgIHR5cGVzIHlldFxuY29uc3QgYnJvd3NlclN0b3JhZ2UgPSBnbG9iYWxUaGlzLmJyb3dzZXI/LnN0b3JhZ2UgPz8gZ2xvYmFsVGhpcy5jaHJvbWU/LnN0b3JhZ2U7XG5hc3luYyBmdW5jdGlvbiBydW5uZXIoKSB7XG4gICAgaGFzUnVuID0gdHJ1ZTtcbiAgICBpZiAoIWhhc0xpc3RlbmVycykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc1BlcnNpc3RlbnRCYWNrZ3JvdW5kUGFnZSgpKSB7XG4gICAgICAgIC8vIEl0J3MgY2VydGFpbmx5IHRoZSBmaXJzdCBhbmQgb25seSB0aW1lXG4gICAgICAgIGV2ZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdleHRlbnNpb24tc3RhcnQnKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFicm93c2VyU3RvcmFnZT8uc2Vzc2lvbikge1xuICAgICAgICBpZiAoaXNDaHJvbWUoKSAmJiBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLm1hbmlmZXN0X3ZlcnNpb24gPT09IDIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybignb25FeHRlbnNpb25TdGFydCBpcyB1bmFibGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgaXTigJlzIGJlaW5nIHJ1biBmb3IgdGhlIGZpcnN0IHRpbWUgb24gTVYyIEV2ZW50IFBhZ2VzIGluIENocm9tZS4gSXQgd2lsbCBydW4gdGhlIGxpc3RlbmVycyBhbnl3YXkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ29uRXh0ZW5zaW9uU3RhcnQgaXMgdW5hYmxlIHRvIGRldGVybWluZSB3aGV0aGVyIGl04oCZcyBiZWluZyBydW4gZm9yIHRoZSBmaXJzdCB0aW1lIHdpdGhvdXQgdGhlIGBzdG9yYWdlYCBwZXJtaXNzaW9uLiBJdCB3aWxsIHJ1biB0aGUgbGlzdGVuZXJzIGFueXdheScpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdleHRlbnNpb24tc3RhcnQnKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3RvcmFnZSA9IGF3YWl0IGJyb3dzZXJTdG9yYWdlLnNlc3Npb24uZ2V0KHN0b3JhZ2VLZXkpO1xuICAgIGlmIChzdG9yYWdlS2V5IGluIHN0b3JhZ2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhd2FpdCBicm93c2VyU3RvcmFnZS5zZXNzaW9uLnNldCh7IFtzdG9yYWdlS2V5XTogdHJ1ZSB9KTtcbiAgICBldmVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnZXh0ZW5zaW9uLXN0YXJ0JykpO1xufVxuZXhwb3J0IGNvbnN0IG9uRXh0ZW5zaW9uU3RhcnQgPSBPYmplY3QuZnJlZXplKHtcbiAgICBhZGRMaXN0ZW5lcihjYWxsYmFjaykge1xuICAgICAgICBpZiAoaGFzUnVuKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ29uRXh0ZW5zaW9uU3RhcnQuYWRkTGlzdGVuZXIoKSB3YXMgY2FsbGVkIGFmdGVyIHRoZSBleHRlbnNpb24gc3RhcnRlZC4gVGhlIGNhbGxiYWNrIHdpbGwgbm90IGJlIGNhbGxlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhhc0xpc3RlbmVycyA9IHRydWU7XG4gICAgICAgICAgICBldmVudC5hZGRFdmVudExpc3RlbmVyKCdleHRlbnNpb24tc3RhcnQnLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZUxpc3RlbmVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGV2ZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2V4dGVuc2lvbi1zdGFydCcsIGNhbGxiYWNrKTtcbiAgICB9LFxufSk7XG4vLyBBdXRvbWF0aWNhbGx5IHJlZ2lzdGVyIHRoZSBydW5uZXJcbnNldFRpbWVvdXQocnVubmVyLCAxMDApO1xuIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9uZUV2ZW50KGV2ZW50LCBmaWx0ZXIpIHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgLy8gVE9ETzogVm9pZEZ1bmN0aW9uIHNob3VsZCBub3QgYmUgbmVjZXNzYXJ5LCBpdCdzIGVxdWl2YWxlbnQgdG8gdXNpbmcgXCJhbnlcIlxuICAgICAgICBjb25zdCBsaXN0ZW5lciA9ICguLi5wYXJhbWV0ZXJzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZpbHRlciB8fCBmaWx0ZXIoLi4ucGFyYW1ldGVycykpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfSk7XG59XG4iLCJsZXQgY2FjaGUgPSB0cnVlO1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVXZWJleHREZXRlY3RQYWdlQ2FjaGUoKSB7XG4gICAgY2FjaGUgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzQ3VycmVudFBhdGhuYW1lKHBhdGgpIHtcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgICAgIHJldHVybiBwYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE1hbmlmZXN0KF92ZXJzaW9uKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lPy5nZXRNYW5pZmVzdD8uKCk7XG59XG5mdW5jdGlvbiBvbmNlKGZ1bmN0aW9uXykge1xuICAgIGxldCByZXN1bHQ7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKCFjYWNoZSB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuY3Rpb25fKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBvbiBodHRwKHMpOi8vIHBhZ2VzIChpdCBjb3VsZCBiZSBpbiBhIGNvbnRlbnQgc2NyaXB0IG9yIHJlZ3VsYXIgd2ViIGNvbnRleHQpICovXG5leHBvcnQgY29uc3QgaXNXZWJQYWdlID0gb25jZSgoKSA9PiBbJ2Fib3V0OicsICdodHRwOicsICdodHRwczonXS5pbmNsdWRlcyhsb2NhdGlvbi5wcm90b2NvbCkpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBleHRlbnNpb24gY29udGV4dHMgdGhhdCBoYXZlIGFjY2VzcyB0byB0aGUgY2hyb21lIEFQSSAqL1xuZXhwb3J0IGNvbnN0IGlzRXh0ZW5zaW9uQ29udGV4dCA9IG9uY2UoKCkgPT4gdHlwZW9mIGdsb2JhbFRoaXMuY2hyb21lPy5leHRlbnNpb24gPT09ICdvYmplY3QnKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBjb250ZW50IHNjcmlwdCAqL1xuZXhwb3J0IGNvbnN0IGlzQ29udGVudFNjcmlwdCA9IG9uY2UoKCkgPT4gaXNFeHRlbnNpb25Db250ZXh0KCkgJiYgaXNXZWJQYWdlKCkpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgY29udGV4dCAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZCA9ICgpID0+IGlzQmFja2dyb3VuZFBhZ2UoKSB8fCBpc0JhY2tncm91bmRXb3JrZXIoKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIHBhZ2UgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmRQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgY29uc3QgbWFuaWZlc3QgPSBnZXRNYW5pZmVzdCgyKTtcbiAgICBpZiAobWFuaWZlc3RcbiAgICAgICAgJiYgaXNDdXJyZW50UGF0aG5hbWUobWFuaWZlc3QuYmFja2dyb3VuZF9wYWdlID8/IG1hbmlmZXN0LmJhY2tncm91bmQ/LnBhZ2UpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gQm9vbGVhbihtYW5pZmVzdD8uYmFja2dyb3VuZD8uc2NyaXB0c1xuICAgICAgICAmJiBpc0N1cnJlbnRQYXRobmFtZSgnL19nZW5lcmF0ZWRfYmFja2dyb3VuZF9wYWdlLmh0bWwnKSk7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIHdvcmtlciAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZFdvcmtlciA9IG9uY2UoKCkgPT4gaXNDdXJyZW50UGF0aG5hbWUoZ2V0TWFuaWZlc3QoMyk/LmJhY2tncm91bmQ/LnNlcnZpY2Vfd29ya2VyKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgcGVyc2lzdGVudCBiYWNrZ3JvdW5kIHBhZ2UgKGFzIG9wcG9zZWQgdG8gYW4gRXZlbnQgUGFnZSBvciBCYWNrZ3JvdW5kIFdvcmtlciwgYm90aCBvZiB3aGljaCBjYW4gYmUgdW5sb2FkZWQgYnkgdGhlIGJyb3dzZXIpICovXG5leHBvcnQgY29uc3QgaXNQZXJzaXN0ZW50QmFja2dyb3VuZFBhZ2UgPSBvbmNlKCgpID0+IGlzQmFja2dyb3VuZFBhZ2UoKVxuICAgICYmIGdldE1hbmlmZXN0KDIpPy5tYW5pZmVzdF92ZXJzaW9uID09PSAyIC8vIEZpcmVmb3ggY2FuIGhhdmUgYSBiYWNrZ3JvdW5kIHBhZ2Ugb24gTVYzLCBidXQgY2FuJ3QgYmUgcGVyc2lzdGVudFxuICAgICYmIGdldE1hbmlmZXN0KDIpPy5iYWNrZ3JvdW5kPy5wZXJzaXN0ZW50ICE9PSBmYWxzZSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGFuIG9wdGlvbnMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgKi9cbmV4cG9ydCBjb25zdCBpc09wdGlvbnNQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgY29uc3QgcGF0aCA9IGdldE1hbmlmZXN0KCk/Lm9wdGlvbnNfdWk/LnBhZ2U7XG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGF0aCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICByZXR1cm4gdXJsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhbiBvcHRpb25zIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gICovXG5leHBvcnQgY29uc3QgaXNTaWRlUGFuZWwgPSBvbmNlKCgpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50IC0tIE5vdCB5ZXQgaW4gQHR5cGVzL2Nocm9tZVxuICAgIGNvbnN0IHBhdGggPSBnZXRNYW5pZmVzdCgzKT8uWydzaWRlX3BhbmVsJ10/LmRlZmF1bHRfcGF0aDtcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgZGV2IHRvb2xzIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gIGBkZXZ0b29sc19wYWdlYCBmaWVsZC4gKi9cbmV4cG9ydCBjb25zdCBpc0RldlRvb2xzUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGNvbnN0IGRldnRvb2xzUGFnZSA9IGlzRXh0ZW5zaW9uQ29udGV4dCgpICYmIGNocm9tZS5kZXZ0b29scyAmJiBnZXRNYW5pZmVzdCgpPy5kZXZ0b29sc19wYWdlO1xuICAgIGlmICh0eXBlb2YgZGV2dG9vbHNQYWdlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZGV2dG9vbHNQYWdlLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIHRoZSBkZXYgdG9vbHMgcGFnZS4gVW5saWtlIGBpc0RldlRvb2xzUGFnZWAsIHRoaXMgd29ya3MgaW4gYW55IHBhZ2UgdGhhdCBoYXMgdGhlIGBjaHJvbWUuZGV2VG9vbHNgIEFQSSAqL1xuZXhwb3J0IGNvbnN0IGlzRGV2VG9vbHMgPSAoKSA9PiBCb29sZWFuKGdsb2JhbFRoaXMuY2hyb21lPy5kZXZ0b29scyk7XG4vKiogTG9vc2VseSBkZXRlY3QgRmlyZWZveCB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzRmlyZWZveCA9ICgpID0+IGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ0ZpcmVmb3gnKTtcbi8qKiBMb29zZWx5IGRldGVjdCBDaHJvbWUgdmlhIHVzZXIgYWdlbnQgKG1pZ2h0IGFsc28gaW5jbHVkZSBDaHJvbWl1bSBhbmQgZm9ya3MgbGlrZSBPcGVyYSkgKi9cbmV4cG9ydCBjb25zdCBpc0Nocm9tZSA9ICgpID0+IGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ0Nocm9tZScpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IFNhZmFyaSB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzU2FmYXJpID0gKCkgPT4gIWlzQ2hyb21lKCkgJiYgZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnU2FmYXJpJyk7XG4vKiogTG9vc2VseSBkZXRlY3QgTW9iaWxlIFNhZmFyaSB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzTW9iaWxlU2FmYXJpID0gKCkgPT4gaXNTYWZhcmkoKSAmJiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdNb2JpbGUnKTtcbmNvbnN0IGNvbnRleHRDaGVja3MgPSB7XG4gICAgY29udGVudFNjcmlwdDogaXNDb250ZW50U2NyaXB0LFxuICAgIGJhY2tncm91bmQ6IGlzQmFja2dyb3VuZCxcbiAgICBvcHRpb25zOiBpc09wdGlvbnNQYWdlLFxuICAgIHNpZGVQYW5lbDogaXNTaWRlUGFuZWwsXG4gICAgZGV2VG9vbHM6IGlzRGV2VG9vbHMsXG4gICAgZGV2VG9vbHNQYWdlOiBpc0RldlRvb2xzUGFnZSxcbiAgICBleHRlbnNpb246IGlzRXh0ZW5zaW9uQ29udGV4dCxcbiAgICB3ZWI6IGlzV2ViUGFnZSxcbn07XG5leHBvcnQgY29uc3QgY29udGV4dE5hbWVzID0gT2JqZWN0LmtleXMoY29udGV4dENoZWNrcyk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGV4dE5hbWUoKSB7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgdGVzdF0gb2YgT2JqZWN0LmVudHJpZXMoY29udGV4dENoZWNrcykpIHtcbiAgICAgICAgaWYgKHRlc3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICd1bmtub3duJztcbn1cbiIsImltcG9ydCBlc2NhcGVTdHJpbmdSZWdleHAgZnJvbSAnZXNjYXBlLXN0cmluZy1yZWdleHAnO1xuLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvZ2Vja28tZGV2L2Jsb2IvMDczY2MyNGY1M2QwY2YzMTQwMzEyMWQ3Njg4MTIxNDZlNTk3Y2M5ZC90b29sa2l0L2NvbXBvbmVudHMvZXh0ZW5zaW9ucy9zY2hlbWFzL21hbmlmZXN0Lmpzb24jTDQ4Ny1MNDkxXG5leHBvcnQgY29uc3QgcGF0dGVyblZhbGlkYXRpb25SZWdleCA9IC9eKGh0dHBzP3x3c3M/fGZpbGV8ZnRwfFxcKik6XFwvXFwvKFxcKnxcXCpcXC5bXiovXSt8W14qL10rKVxcLy4qJHxeZmlsZTpcXC9cXC9cXC8uKiR8XnJlc291cmNlOlxcL1xcLyhcXCp8XFwqXFwuW14qL10rfFteKi9dKylcXC8uKiR8XmFib3V0Oi87XG5jb25zdCBpc0ZpcmVmb3ggPSBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdGaXJlZm94LycpO1xuZXhwb3J0IGNvbnN0IGFsbFN0YXJzUmVnZXggPSBpc0ZpcmVmb3hcbiAgICA/IC9eKGh0dHBzP3x3c3M/KTpbL11bL11bXi9dKyhbL10uKik/JC9cbiAgICA6IC9eaHR0cHM/OlsvXVsvXVteL10rKFsvXS4qKT8kLztcbmV4cG9ydCBjb25zdCBhbGxVcmxzUmVnZXggPSAvXihodHRwcz98ZmlsZXxmdHApOlsvXSsvO1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFZhbGlkUGF0dGVybihtYXRjaFBhdHRlcm4pIHtcbiAgICBpZiAoIWlzVmFsaWRQYXR0ZXJuKG1hdGNoUGF0dGVybikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1hdGNoUGF0dGVybiArICcgaXMgYW4gaW52YWxpZCBwYXR0ZXJuLCBpdCBtdXN0IG1hdGNoICcgKyBTdHJpbmcocGF0dGVyblZhbGlkYXRpb25SZWdleCkpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkUGF0dGVybihtYXRjaFBhdHRlcm4pIHtcbiAgICByZXR1cm4gbWF0Y2hQYXR0ZXJuID09PSAnPGFsbF91cmxzPicgfHwgcGF0dGVyblZhbGlkYXRpb25SZWdleC50ZXN0KG1hdGNoUGF0dGVybik7XG59XG5leHBvcnQgZnVuY3Rpb24gZG9lc1VybE1hdGNoUGF0dGVybnModXJsLCAuLi5tYXRjaFBhdHRlcm4pIHtcbiAgICBpZiAobWF0Y2hQYXR0ZXJuLmluY2x1ZGVzKCc8YWxsX3VybHM+JykgJiYgYWxsVXJsc1JlZ2V4LnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG1hdGNoUGF0dGVybi5pbmNsdWRlcygnKjovLyovKicpICYmIGFsbFN0YXJzUmVnZXgudGVzdCh1cmwpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHBhdHRlcm4gb2YgbWF0Y2hQYXR0ZXJuKSB7XG4gICAgICAgIGlmIChwYXR0ZXJuVG9SZWdleChwYXR0ZXJuKS50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGdldFJhd1BhdHRlcm5SZWdleChtYXRjaFBhdHRlcm4pIHtcbiAgICBhc3NlcnRWYWxpZFBhdHRlcm4obWF0Y2hQYXR0ZXJuKTtcbiAgICAvLyBIb3N0IHVuZGVmaW5lZCBmb3IgZmlsZTovLy9cbiAgICBsZXQgWywgcHJvdG9jb2wsIGhvc3QgPSAnJywgcGF0aG5hbWVdID0gbWF0Y2hQYXR0ZXJuLnNwbGl0KC8oXlteOl0rOlsvXVsvXSkoW14vXSspPy8pO1xuICAgIHByb3RvY29sID0gcHJvdG9jb2xcbiAgICAgICAgLnJlcGxhY2UoJyonLCBpc0ZpcmVmb3ggPyAnKGh0dHBzP3x3c3M/KScgOiAnaHR0cHM/JykgLy8gUHJvdG9jb2wgd2lsZGNhcmRcbiAgICAgICAgLnJlcGxhY2VBbGwoL1svXS9nLCAnWy9dJyk7IC8vIEVzY2FwZSBzbGFzaGVzXG4gICAgaWYgKGhvc3QgPT09ICcqJykge1xuICAgICAgICBob3N0ID0gJ1teL10rJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaG9zdCkge1xuICAgICAgICBob3N0ID0gaG9zdFxuICAgICAgICAgICAgLnJlcGxhY2UoL15bKl1bLl0vLCAnKFteL10rLikqJykgLy8gSW5pdGlhbCB3aWxkY2FyZFxuICAgICAgICAgICAgLnJlcGxhY2VBbGwoL1suXS9nLCAnWy5dJykgLy8gRXNjYXBlIGRvdHNcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bKl0kLywgJ1teLl0rJyk7IC8vIExhc3Qgd2lsZGNhcmRcbiAgICB9XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZVxuICAgICAgICAucmVwbGFjZUFsbCgvWy9dL2csICdbL10nKSAvLyBFc2NhcGUgc2xhc2hlc1xuICAgICAgICAucmVwbGFjZUFsbCgvWy5dL2csICdbLl0nKSAvLyBFc2NhcGUgZG90c1xuICAgICAgICAucmVwbGFjZUFsbCgvWypdL2csICcuKicpOyAvLyBBbnkgd2lsZGNhcmRcbiAgICByZXR1cm4gJ14nICsgcHJvdG9jb2wgKyBob3N0ICsgJygnICsgcGF0aG5hbWUgKyAnKT8kJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXR0ZXJuVG9SZWdleCguLi5tYXRjaFBhdHRlcm5zKSB7XG4gICAgLy8gTm8gcGF0dGVybiwgbWF0Y2ggbm90aGluZyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMTQxMTU1MjIvMjg4OTA2XG4gICAgaWYgKG1hdGNoUGF0dGVybnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAvJC4vO1xuICAgIH1cbiAgICBpZiAobWF0Y2hQYXR0ZXJucy5pbmNsdWRlcygnPGFsbF91cmxzPicpKSB7XG4gICAgICAgIHJldHVybiBhbGxVcmxzUmVnZXg7XG4gICAgfVxuICAgIGlmIChtYXRjaFBhdHRlcm5zLmluY2x1ZGVzKCcqOi8vKi8qJykpIHtcbiAgICAgICAgcmV0dXJuIGFsbFN0YXJzUmVnZXg7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVnRXhwKG1hdGNoUGF0dGVybnMubWFwKHggPT4gZ2V0UmF3UGF0dGVyblJlZ2V4KHgpKS5qb2luKCd8JykpO1xufVxuLy8gVGhlIHBhcmVucyBhcmUgcmVxdWlyZWQgYnkgLnNwbGl0KCkgdG8gcHJlc2VydmUgdGhlIHN5bWJvbHNcbmNvbnN0IGdsb2JTeW1ib2xzID0gLyhbPypdKykvO1xuZnVuY3Rpb24gc3BsaXRSZXBsYWNlKHBhcnQsIGluZGV4KSB7XG4gICAgaWYgKHBhcnQgPT09ICcnKSB7XG4gICAgICAgIC8vIFNob3J0Y3V0IGZvciBzcGVlZFxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChpbmRleCAlIDIgPT09IDApIHtcbiAgICAgICAgLy8gUmF3IHRleHQsIGVzY2FwZSBpdFxuICAgICAgICByZXR1cm4gZXNjYXBlU3RyaW5nUmVnZXhwKHBhcnQpO1xuICAgIH1cbiAgICAvLyBFbHNlOiBTeW1ib2xcbiAgICBpZiAocGFydC5pbmNsdWRlcygnKicpKSB7IC8vIENhbiBiZSBtb3JlIHRoYW4gb25lIGFuZCBpdCBzd2FsbG93cyBzdXJyb3VuZGluZyBxdWVzdGlvbiBtYXJrc1xuICAgICAgICByZXR1cm4gJy4qJztcbiAgICB9XG4gICAgcmV0dXJuIFsuLi5wYXJ0XS5tYXAoKCkgPT4gaXNGaXJlZm94ID8gJy4nIDogJy4/Jykuam9pbignJyk7XG59XG5mdW5jdGlvbiBnZXRSYXdHbG9iUmVnZXgoZ2xvYikge1xuICAgIGNvbnN0IHJlZ2V4U3RyaW5nID0gZ2xvYlxuICAgICAgICAuc3BsaXQoZ2xvYlN5bWJvbHMpXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL25vLWFycmF5LWNhbGxiYWNrLXJlZmVyZW5jZSAtLSB0aXMgb2sg8J+kq1xuICAgICAgICAubWFwKHNwbGl0UmVwbGFjZSlcbiAgICAgICAgLmpvaW4oJycpO1xuICAgIC8vIERyb3AgXCJzdGFydCB3aXRoIGFueXRoaW5nXCIgYW5kIFwiZW5kIHdpdGggYW55dGhpbmdcIiBzZXF1ZW5jZXMgYmVjYXVzZSB0aGV5J3JlIHRoZSBkZWZhdWx0IGZvciByZWdleFxuICAgIHJldHVybiAoJ14nICsgcmVnZXhTdHJpbmcgKyAnJCcpXG4gICAgICAgIC5yZXBsYWNlKC9eWy5dWypdLywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bLl1bKl0kLywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9eWyRdJC8sICcuKycpOyAvLyBDYXRjaCBgKmAgYW5kIGAqYFxufVxuZXhwb3J0IGZ1bmN0aW9uIGdsb2JUb1JlZ2V4KC4uLmdsb2JzKSB7XG4gICAgLy8gTm8gZ2xvYiwgbWF0Y2ggYW55dGhpbmc7IGBpbmNsdWRlX2dsb2JzOiBbXWAgaXMgdGhlIGRlZmF1bHRcbiAgICBpZiAoZ2xvYnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAvLiovO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChnbG9icy5tYXAoeCA9PiBnZXRSYXdHbG9iUmVnZXgoeCkpLmpvaW4oJ3wnKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZXhjbHVkZUR1cGxpY2F0ZVBhdHRlcm5zKG1hdGNoUGF0dGVybnMpIHtcbiAgICBpZiAobWF0Y2hQYXR0ZXJucy5pbmNsdWRlcygnPGFsbF91cmxzPicpKSB7XG4gICAgICAgIHJldHVybiBbJzxhbGxfdXJscz4nXTtcbiAgICB9XG4gICAgaWYgKG1hdGNoUGF0dGVybnMuaW5jbHVkZXMoJyo6Ly8qLyonKSkge1xuICAgICAgICByZXR1cm4gWycqOi8vKi8qJ107XG4gICAgfVxuICAgIHJldHVybiBtYXRjaFBhdHRlcm5zLmZpbHRlcihwb3NzaWJsZVN1YnNldCA9PiAhbWF0Y2hQYXR0ZXJucy5zb21lKHBvc3NpYmxlU3VwZXJzZXQgPT4gcG9zc2libGVTdWJzZXQgIT09IHBvc3NpYmxlU3VwZXJzZXQgJiYgcGF0dGVyblRvUmVnZXgocG9zc2libGVTdXBlcnNldCkudGVzdChwb3NzaWJsZVN1YnNldCkpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzY2FwZVN0cmluZ1JlZ2V4cChzdHJpbmcpIHtcblx0aWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdC8vIEVzY2FwZSBjaGFyYWN0ZXJzIHdpdGggc3BlY2lhbCBtZWFuaW5nIGVpdGhlciBpbnNpZGUgb3Igb3V0c2lkZSBjaGFyYWN0ZXIgc2V0cy5cblx0Ly8gVXNlIGEgc2ltcGxlIGJhY2tzbGFzaCBlc2NhcGUgd2hlbiBpdOKAmXMgYWx3YXlzIHZhbGlkLCBhbmQgYSBgXFx4bm5gIGVzY2FwZSB3aGVuIHRoZSBzaW1wbGVyIGZvcm0gd291bGQgYmUgZGlzYWxsb3dlZCBieSBVbmljb2RlIHBhdHRlcm5z4oCZIHN0cmljdGVyIGdyYW1tYXIuXG5cdHJldHVybiBzdHJpbmdcblx0XHQucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCsqPy5dL2csICdcXFxcJCYnKVxuXHRcdC5yZXBsYWNlKC8tL2csICdcXFxceDJkJyk7XG59XG4iLCJpbXBvcnQgY2hyb21lUHJvbWlzZWQgZnJvbSAnd2ViZXh0LXBvbHlmaWxsLWtpbmRhJztcbmltcG9ydCB7IGlzQmFja2dyb3VuZCwgaXNDaHJvbWUgfSBmcm9tICd3ZWJleHQtZGV0ZWN0LXBhZ2UnO1xuaW1wb3J0IHsgaXNVcmxQZXJtaXR0ZWRCeU1hbmlmZXN0IH0gZnJvbSAnd2ViZXh0LXBlcm1pc3Npb25zJztcbmltcG9ydCB7IGdldFRhYlVybCB9IGZyb20gJ3dlYmV4dC10b29scyc7XG5pbXBvcnQgYWxlcnQgZnJvbSAnd2ViZXh0LWFsZXJ0JztcbmltcG9ydCB7IGV4ZWN1dGVGdW5jdGlvbiwgaXNTY3JpcHRhYmxlVXJsIH0gZnJvbSAnd2ViZXh0LWNvbnRlbnQtc2NyaXB0cyc7XG5jb25zdCBjb250ZXh0TWVudUlkID0gJ3dlYmV4dC1wZXJtaXNzaW9uLXRvZ2dsZTphZGQtcGVybWlzc2lvbic7XG5sZXQgZ2xvYmFsT3B0aW9ucztcbmNvbnN0IGNocm9tZVAgPSBpc0Nocm9tZSgpICYmIGdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lPy5nZXRNYW5pZmVzdCgpLm1hbmlmZXN0X3ZlcnNpb24gPCAzXG4gICAgPyBjaHJvbWVQcm9taXNlZFxuICAgIDogY2hyb21lO1xuZnVuY3Rpb24gYXNzZXJ0VGFiKHRhYikge1xuICAgIGlmICghdGFiPy5pZCkge1xuICAgICAgICAvLyBEb24ndCB1c2Ugbm9uLUFTQ0lJIGNoYXJhY3RlcnMgYmVjYXVzZSBTYWZhcmkgYnJlYWtzIHRoZSBlbmNvZGluZyBpbiBleGVjdXRlU2NyaXB0LmNvZGVcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYnJvd3NlciBkaWRuXFwndCBzdXBwbHkgYW55IGluZm9ybWF0aW9uIGFib3V0IHRoZSBhY3RpdmUgdGFiLicpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2VydFVybCh1cmwpIHtcbiAgICBpZiAoIXVybCkge1xuICAgICAgICAvLyBEb24ndCB1c2Ugbm9uLUFTQ0lJIGNoYXJhY3RlcnMgYmVjYXVzZSBTYWZhcmkgYnJlYWtzIHRoZSBlbmNvZGluZyBpbiBleGVjdXRlU2NyaXB0LmNvZGVcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYnJvd3NlciBkaWRuXFwndCBzdXBwbHkgdGhlIGN1cnJlbnQgcGFnZVxcJ3MgVVJMLicpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2VydFNjcmlwdGFibGVVcmwodXJsKSB7XG4gICAgaWYgKCFpc1NjcmlwdGFibGVVcmwodXJsKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5uYW1lICsgJyBjYW5cXCd0IGJlIGVuYWJsZWQgb24gdGhpcyBwYWdlLicpO1xuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIGlzT3JpZ2luUGVybWFuZW50bHlBbGxvd2VkKG9yaWdpbikge1xuICAgIHJldHVybiBjaHJvbWVQLnBlcm1pc3Npb25zLmNvbnRhaW5zKHtcbiAgICAgICAgb3JpZ2luczogW29yaWdpbiArICcvKiddLFxuICAgIH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlSXRlbVJhdyh7IGNoZWNrZWQsIGVuYWJsZWQgfSkge1xuICAgIGNocm9tZS5jb250ZXh0TWVudXMudXBkYXRlKGNvbnRleHRNZW51SWQsIHtcbiAgICAgICAgY2hlY2tlZCxcbiAgICAgICAgZW5hYmxlZCxcbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUl0ZW0odXJsKSB7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgICAgLy8gTm8gVVJMIG1lYW5zIG5vIGFjdGl2ZVRhYiwgbm8gbWFuaWZlc3QgcGVybWlzc2lvbiwgbm8gZ3JhbnRlZCBwZXJtaXNzaW9uLCBPUiBubyBwZXJtaXNzaW9uIHBvc3NpYmxlIChjaHJvbWU6Ly8pXG4gICAgICAgIC8vIFNpbmNlIHdlIGNhbid0IGRpZmZlcmVudGlhdGUgYmV0d2VlbiB0aGVzZSBjYXNlcywgd2UgY2FuJ3QgZGlzYWJsZSB0aGUgdG9nZ2xlXG4gICAgICAgIHVwZGF0ZUl0ZW1SYXcoe1xuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNTY3JpcHRhYmxlVXJsKHVybCkpIHtcbiAgICAgICAgY29uc3QgeyBvcmlnaW4gfSA9IG5ldyBVUkwodXJsKTtcbiAgICAgICAgLy8gTWFuaWZlc3QgcGVybWlzc2lvbnMgY2FuJ3QgYmUgcmVtb3ZlZDsgdGhpcyBkaXNhYmxlcyB0aGUgdG9nZ2xlIG9uIHRob3NlIGRvbWFpbnNcbiAgICAgICAgY29uc3QgaXNEZWZhdWx0ID0gaXNVcmxQZXJtaXR0ZWRCeU1hbmlmZXN0KHVybCk7XG4gICAgICAgIHVwZGF0ZUl0ZW1SYXcoe1xuICAgICAgICAgICAgZW5hYmxlZDogIWlzRGVmYXVsdCxcbiAgICAgICAgICAgIC8vIFdlIG1pZ2h0IGhhdmUgdGVtcG9yYXJ5IHBlcm1pc3Npb24gYXMgcGFydCBvZiBgYWN0aXZlVGFiYCwgc28gaXQgbmVlZHMgdG8gYmUgcHJvcGVybHkgY2hlY2tlZFxuICAgICAgICAgICAgY2hlY2tlZDogaXNEZWZhdWx0IHx8IGF3YWl0IGlzT3JpZ2luUGVybWFuZW50bHlBbGxvd2VkKG9yaWdpbiksXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFdlIGtub3cgdGhlIFVSTCwgYW5kIHdlIGtub3cgaXQncyBub3Qgc2NyaXB0YWJsZSAoYWJvdXQ6YmxhbmssIGNocm9tZTovLywgZXRjLilcbiAgICB1cGRhdGVJdGVtUmF3KHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgIH0pO1xufVxuLyoqXG4gKiBSZXF1ZXN0cyBvciByZW1vdmVzIHRoZSBob3N0IHBlcm1pc3Npb24gZm9yIHRoZSBzcGVjaWZpZWQgdGFiXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBwZXJtaXNzaW9uIGV4aXN0cyBhZnRlciB0aGUgcmVxdWVzdC9yZW1vdmFsXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHNldFBlcm1pc3Npb24odXJsLCByZXF1ZXN0KSB7XG4gICAgLy8gVE9ETzogRW5zdXJlIHRoYXQgVVJMIGlzIGluIGBvcHRpb25hbF9wZXJtaXNzaW9uc2BcbiAgICAvLyBUT0RPOiBodHRwczovL2dpdGh1Yi5jb20vZnJlZ2FudGUvd2ViZXh0LXBlcm1pc3Npb24tdG9nZ2xlL2lzc3Vlcy8zN1xuICAgIGNvbnN0IHBlcm1pc3Npb25EYXRhID0ge1xuICAgICAgICBvcmlnaW5zOiBbXG4gICAgICAgICAgICBuZXcgVVJMKHVybCkub3JpZ2luICsgJy8qJyxcbiAgICAgICAgXSxcbiAgICB9O1xuICAgIGF3YWl0IGNocm9tZVAucGVybWlzc2lvbnNbcmVxdWVzdCA/ICdyZXF1ZXN0JyA6ICdyZW1vdmUnXShwZXJtaXNzaW9uRGF0YSk7XG4gICAgcmV0dXJuIGNocm9tZVAucGVybWlzc2lvbnMuY29udGFpbnMocGVybWlzc2lvbkRhdGEpO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlVGFiQWN0aXZhdGVkKHsgdGFiSWQgfSkge1xuICAgIHZvaWQgdXBkYXRlSXRlbShhd2FpdCBnZXRUYWJVcmwodGFiSWQpID8/ICcnKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKHsgY2hlY2tlZCwgbWVudUl0ZW1JZCB9LCB0YWIpIHtcbiAgICBpZiAobWVudUl0ZW1JZCAhPT0gY29udGV4dE1lbnVJZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCB1cmw7XG4gICAgdHJ5IHtcbiAgICAgICAgYXNzZXJ0VGFiKHRhYik7XG4gICAgICAgIHVybCA9IHRhYi51cmwgPz8gYXdhaXQgZ2V0VGFiVXJsKHRhYi5pZCk7XG4gICAgICAgIGFzc2VydFVybCh1cmwpO1xuICAgICAgICBhc3NlcnRTY3JpcHRhYmxlVXJsKHVybCk7XG4gICAgICAgIGNvbnN0IHBlcm1pc3Npb25FeGlzdHNOb3cgPSBhd2FpdCBzZXRQZXJtaXNzaW9uKHVybCwgY2hlY2tlZCk7XG4gICAgICAgIGNvbnN0IHNldHRpbmdXYXNTdWNjZXNzZnVsID0gcGVybWlzc2lvbkV4aXN0c05vdyA9PT0gY2hlY2tlZDtcbiAgICAgICAgLy8gSWYgc3VjY2Vzc2Z1bCwgQ2hyb21lIGFscmVhZHkgbmF0aXZlbHkgdXBkYXRlZCB0aGUgY29udGV4dCBtZW51IGl0ZW0uXG4gICAgICAgIGlmICghc2V0dGluZ1dhc1N1Y2Nlc3NmdWwpIHtcbiAgICAgICAgICAgIHVwZGF0ZUl0ZW1SYXcoe1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHBlcm1pc3Npb25FeGlzdHNOb3csXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGVybWlzc2lvbkV4aXN0c05vdyAmJiBnbG9iYWxPcHRpb25zLnJlbG9hZE9uU3VjY2Vzcykge1xuICAgICAgICAgICAgdm9pZCBleGVjdXRlRnVuY3Rpb24odGFiLmlkLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb25maXJtKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGdsb2JhbE9wdGlvbnMucmVsb2FkT25TdWNjZXNzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gRGVsYXkgdXBkYXRpbmcgdGhlIGNvbnRleHQgbWVudSBpdGVtIGJlY2F1c2Ugb2Ygc3B1cmlvdXMgZXZlbnRzIGFuZCBhY3RpdmVUYWIgcmFjZSBjb25kaXRpb25zXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mcmVnYW50ZS93ZWJleHQtcGVybWlzc2lvbi10b2dnbGUvcHVsbC80NVxuICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZUl0ZW0sIDUwMCwgdXJsKTtcbiAgICAgICAgaWYgKHRhYj8uaWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZUZ1bmN0aW9uKHRhYi5pZCwgdGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydCh0ZXh0KTsgLyogQ2FuJ3QgcGFzcyBhIHJhdyBuYXRpdmUgZnVuY3Rpb24gKi9cbiAgICAgICAgICAgICAgICB9LCBTdHJpbmcoZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgICAgICB2b2lkIGFsZXJ0KFN0cmluZyhlcnJvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cbi8qKlxuICogQWRkcyBhbiBpdGVtIHRvIHRoZSBicm93c2VyIGFjdGlvbiBpY29uJ3MgY29udGV4dCBtZW51LlxuICogVGhlIHVzZXIgY2FuIGFjY2VzcyB0aGlzIG1lbnUgYnkgcmlnaHQgY2xpY2tpbmcgdGhlIGljb24uIElmIHlvdXIgZXh0ZW5zaW9uIGRvZXNuJ3QgaGF2ZSBhbnkgYWN0aW9uIG9yXG4gKiBwb3B1cCBhc3NpZ25lZCB0byB0aGUgaWNvbiwgaXQgd2lsbCBhbHNvIGFwcGVhciB3aXRoIGEgbGVmdCBjbGljay5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyB7T3B0aW9uc31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkUGVybWlzc2lvblRvZ2dsZShvcHRpb25zKSB7XG4gICAgaWYgKCFpc0JhY2tncm91bmQoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3dlYmV4dC1wZXJtaXNzaW9uLXRvZ2dsZSBjYW4gb25seSBiZSBjYWxsZWQgZnJvbSBhIGJhY2tncm91bmQgcGFnZScpO1xuICAgIH1cbiAgICBpZiAoZ2xvYmFsT3B0aW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3dlYmV4dC1wZXJtaXNzaW9uLXRvZ2dsZSBjYW4gb25seSBiZSBpbml0aWFsaXplZCBvbmNlJyk7XG4gICAgfVxuICAgIGNvbnN0IG1hbmlmZXN0ID0gY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKTtcbiAgICBpZiAoIW1hbmlmZXN0LnBlcm1pc3Npb25zPy5pbmNsdWRlcygnY29udGV4dE1lbnVzJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd3ZWJleHQtcGVybWlzc2lvbi10b2dnbGUgcmVxdWlyZXMgdGhlIGBjb250ZXh0TWVudXNgIHBlcm1pc3Npb24nKTtcbiAgICB9XG4gICAgaWYgKCFjaHJvbWUuY29udGV4dE1lbnVzKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignY2hyb21lLmNvbnRleHRNZW51cyBpcyBub3QgYXZhaWxhYmxlJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZ2xvYmFsT3B0aW9ucyA9IHtcbiAgICAgICAgdGl0bGU6IGBFbmFibGUgJHttYW5pZmVzdC5uYW1lfSBvbiB0aGlzIGRvbWFpbmAsXG4gICAgICAgIHJlbG9hZE9uU3VjY2VzczogZmFsc2UsXG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgfTtcbiAgICBpZiAoZ2xvYmFsT3B0aW9ucy5yZWxvYWRPblN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5yZWxvYWRPblN1Y2Nlc3MgPSBgRG8geW91IHdhbnQgdG8gcmVsb2FkIHRoaXMgcGFnZSB0byBhcHBseSAke21hbmlmZXN0Lm5hbWV9P2A7XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbmFsSG9zdHMgPSBbXG4gICAgICAgIC4uLm1hbmlmZXN0Lm9wdGlvbmFsX3Blcm1pc3Npb25zID8/IFtdLFxuICAgICAgICAuLi5tYW5pZmVzdC5vcHRpb25hbF9ob3N0X3Blcm1pc3Npb25zID8/IFtdLFxuICAgIF0uZmlsdGVyKChwZXJtaXNzaW9uKSA9PiBwZXJtaXNzaW9uID09PSAnPGFsbF91cmxzPicgfHwgcGVybWlzc2lvbi5pbmNsdWRlcygnKicpKTtcbiAgICBpZiAob3B0aW9uYWxIb3N0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignd2ViZXh0LXBlcm1pc3Npb24tdG9nZ2xlIHJlcXVpcmVzIHNvbWUgd2lsZGNhcmQgaG9zdHMgdG8gYmUgc3BlY2lmaWVkIGluIGBvcHRpb25hbF9wZXJtaXNzaW9uc2AgKE1WMikgb3IgYG9wdGlvbmFsX2hvc3RfcGVybWlzc2lvbnNgIChNVjMpJyk7XG4gICAgfVxuICAgIC8vIFJlbW92ZSBhbnkgZXhpc3RpbmcgY29udGV4dCBtZW51IGl0ZW0gYW5kIHNpbGVuY2UgYW55IGVycm9yXG4gICAgY2hyb21lLmNvbnRleHRNZW51cy5yZW1vdmUoY29udGV4dE1lbnVJZCwgKCkgPT4gY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcbiAgICBjb25zdCBjb250ZXh0cyA9IG1hbmlmZXN0Lm1hbmlmZXN0X3ZlcnNpb24gPT09IDJcbiAgICAgICAgPyBbJ3BhZ2VfYWN0aW9uJywgJ2Jyb3dzZXJfYWN0aW9uJ11cbiAgICAgICAgOiBbJ2FjdGlvbiddO1xuICAgIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICAgICAgaWQ6IGNvbnRleHRNZW51SWQsXG4gICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICB0aXRsZTogZ2xvYmFsT3B0aW9ucy50aXRsZSxcbiAgICAgICAgY29udGV4dHMsXG4gICAgICAgIC8vIE5vdGU6IFRoaXMgaXMgY29tcGxldGVseSBpZ25vcmVkIGJ5IENocm9tZSBhbmQgU2FmYXJpLiBHcmVhdC4gIzE0XG4gICAgICAgIGRvY3VtZW50VXJsUGF0dGVybnM6IG9wdGlvbmFsSG9zdHMsXG4gICAgfSk7XG4gICAgY2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoaGFuZGxlQ2xpY2spO1xuICAgIGNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKGhhbmRsZVRhYkFjdGl2YXRlZCk7XG4gICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGFzeW5jICh0YWJJZCwgeyBzdGF0dXMgfSwgeyB1cmwsIGFjdGl2ZSB9KSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmUgJiYgc3RhdHVzID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICB2b2lkIHVwZGF0ZUl0ZW0odXJsID8/IGF3YWl0IGdldFRhYlVybCh0YWJJZCkgPz8gJycpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJsZXQgY2FjaGUgPSB0cnVlO1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVXZWJleHREZXRlY3RQYWdlQ2FjaGUoKSB7XG4gICAgY2FjaGUgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzQ3VycmVudFBhdGhuYW1lKHBhdGgpIHtcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgICAgIHJldHVybiBwYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE1hbmlmZXN0KF92ZXJzaW9uKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lPy5nZXRNYW5pZmVzdD8uKCk7XG59XG5mdW5jdGlvbiBvbmNlKGZ1bmN0aW9uXykge1xuICAgIGxldCByZXN1bHQ7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKCFjYWNoZSB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuY3Rpb25fKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBvbiBodHRwKHMpOi8vIHBhZ2VzIChpdCBjb3VsZCBiZSBpbiBhIGNvbnRlbnQgc2NyaXB0IG9yIHJlZ3VsYXIgd2ViIGNvbnRleHQpICovXG5leHBvcnQgY29uc3QgaXNXZWJQYWdlID0gb25jZSgoKSA9PiBbJ2Fib3V0OicsICdodHRwOicsICdodHRwczonXS5pbmNsdWRlcyhsb2NhdGlvbi5wcm90b2NvbCkpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBleHRlbnNpb24gY29udGV4dHMgdGhhdCBoYXZlIGFjY2VzcyB0byB0aGUgY2hyb21lIEFQSSAqL1xuZXhwb3J0IGNvbnN0IGlzRXh0ZW5zaW9uQ29udGV4dCA9IG9uY2UoKCkgPT4gdHlwZW9mIGdsb2JhbFRoaXMuY2hyb21lPy5leHRlbnNpb24gPT09ICdvYmplY3QnKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBjb250ZW50IHNjcmlwdCAqL1xuZXhwb3J0IGNvbnN0IGlzQ29udGVudFNjcmlwdCA9IG9uY2UoKCkgPT4gaXNFeHRlbnNpb25Db250ZXh0KCkgJiYgaXNXZWJQYWdlKCkpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgY29udGV4dCAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZCA9ICgpID0+IGlzQmFja2dyb3VuZFBhZ2UoKSB8fCBpc0JhY2tncm91bmRXb3JrZXIoKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIHBhZ2UgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmRQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgY29uc3QgbWFuaWZlc3QgPSBnZXRNYW5pZmVzdCgyKTtcbiAgICBpZiAobWFuaWZlc3RcbiAgICAgICAgJiYgaXNDdXJyZW50UGF0aG5hbWUobWFuaWZlc3QuYmFja2dyb3VuZF9wYWdlID8/IG1hbmlmZXN0LmJhY2tncm91bmQ/LnBhZ2UpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gQm9vbGVhbihtYW5pZmVzdD8uYmFja2dyb3VuZD8uc2NyaXB0c1xuICAgICAgICAmJiBpc0N1cnJlbnRQYXRobmFtZSgnL19nZW5lcmF0ZWRfYmFja2dyb3VuZF9wYWdlLmh0bWwnKSk7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIHdvcmtlciAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZFdvcmtlciA9IG9uY2UoKCkgPT4gaXNDdXJyZW50UGF0aG5hbWUoZ2V0TWFuaWZlc3QoMyk/LmJhY2tncm91bmQ/LnNlcnZpY2Vfd29ya2VyKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgcGVyc2lzdGVudCBiYWNrZ3JvdW5kIHBhZ2UgKGFzIG9wcG9zZWQgdG8gYW4gRXZlbnQgUGFnZSBvciBCYWNrZ3JvdW5kIFdvcmtlciwgYm90aCBvZiB3aGljaCBjYW4gYmUgdW5sb2FkZWQgYnkgdGhlIGJyb3dzZXIpICovXG5leHBvcnQgY29uc3QgaXNQZXJzaXN0ZW50QmFja2dyb3VuZFBhZ2UgPSBvbmNlKCgpID0+IGlzQmFja2dyb3VuZFBhZ2UoKVxuICAgICYmIGdldE1hbmlmZXN0KDIpPy5tYW5pZmVzdF92ZXJzaW9uID09PSAyIC8vIEZpcmVmb3ggY2FuIGhhdmUgYSBiYWNrZ3JvdW5kIHBhZ2Ugb24gTVYzLCBidXQgY2FuJ3QgYmUgcGVyc2lzdGVudFxuICAgICYmIGdldE1hbmlmZXN0KDIpPy5iYWNrZ3JvdW5kPy5wZXJzaXN0ZW50ICE9PSBmYWxzZSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGFuIG9wdGlvbnMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgKi9cbmV4cG9ydCBjb25zdCBpc09wdGlvbnNQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgY29uc3QgcGF0aCA9IGdldE1hbmlmZXN0KCk/Lm9wdGlvbnNfdWk/LnBhZ2U7XG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGF0aCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICByZXR1cm4gdXJsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhbiBvcHRpb25zIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gICovXG5leHBvcnQgY29uc3QgaXNTaWRlUGFuZWwgPSBvbmNlKCgpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50IC0tIE5vdCB5ZXQgaW4gQHR5cGVzL2Nocm9tZVxuICAgIGNvbnN0IHBhdGggPSBnZXRNYW5pZmVzdCgzKT8uWydzaWRlX3BhbmVsJ10/LmRlZmF1bHRfcGF0aDtcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgZGV2IHRvb2xzIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gIGBkZXZ0b29sc19wYWdlYCBmaWVsZC4gKi9cbmV4cG9ydCBjb25zdCBpc0RldlRvb2xzUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGNvbnN0IGRldnRvb2xzUGFnZSA9IGlzRXh0ZW5zaW9uQ29udGV4dCgpICYmIGNocm9tZS5kZXZ0b29scyAmJiBnZXRNYW5pZmVzdCgpPy5kZXZ0b29sc19wYWdlO1xuICAgIGlmICh0eXBlb2YgZGV2dG9vbHNQYWdlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZGV2dG9vbHNQYWdlLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIHRoZSBkZXYgdG9vbHMgcGFnZS4gVW5saWtlIGBpc0RldlRvb2xzUGFnZWAsIHRoaXMgd29ya3MgaW4gYW55IHBhZ2UgdGhhdCBoYXMgdGhlIGBjaHJvbWUuZGV2VG9vbHNgIEFQSSAqL1xuZXhwb3J0IGNvbnN0IGlzRGV2VG9vbHMgPSAoKSA9PiBCb29sZWFuKGdsb2JhbFRoaXMuY2hyb21lPy5kZXZ0b29scyk7XG4vKiogTG9vc2VseSBkZXRlY3QgRmlyZWZveCB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzRmlyZWZveCA9ICgpID0+IGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ0ZpcmVmb3gnKTtcbi8qKiBMb29zZWx5IGRldGVjdCBDaHJvbWUgdmlhIHVzZXIgYWdlbnQgKG1pZ2h0IGFsc28gaW5jbHVkZSBDaHJvbWl1bSBhbmQgZm9ya3MgbGlrZSBPcGVyYSkgKi9cbmV4cG9ydCBjb25zdCBpc0Nocm9tZSA9ICgpID0+IGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ0Nocm9tZScpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IFNhZmFyaSB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzU2FmYXJpID0gKCkgPT4gIWlzQ2hyb21lKCkgJiYgZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnU2FmYXJpJyk7XG4vKiogTG9vc2VseSBkZXRlY3QgTW9iaWxlIFNhZmFyaSB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzTW9iaWxlU2FmYXJpID0gKCkgPT4gaXNTYWZhcmkoKSAmJiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdNb2JpbGUnKTtcbmNvbnN0IGNvbnRleHRDaGVja3MgPSB7XG4gICAgY29udGVudFNjcmlwdDogaXNDb250ZW50U2NyaXB0LFxuICAgIGJhY2tncm91bmQ6IGlzQmFja2dyb3VuZCxcbiAgICBvcHRpb25zOiBpc09wdGlvbnNQYWdlLFxuICAgIHNpZGVQYW5lbDogaXNTaWRlUGFuZWwsXG4gICAgZGV2VG9vbHM6IGlzRGV2VG9vbHMsXG4gICAgZGV2VG9vbHNQYWdlOiBpc0RldlRvb2xzUGFnZSxcbiAgICBleHRlbnNpb246IGlzRXh0ZW5zaW9uQ29udGV4dCxcbiAgICB3ZWI6IGlzV2ViUGFnZSxcbn07XG5leHBvcnQgY29uc3QgY29udGV4dE5hbWVzID0gT2JqZWN0LmtleXMoY29udGV4dENoZWNrcyk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGV4dE5hbWUoKSB7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgdGVzdF0gb2YgT2JqZWN0LmVudHJpZXMoY29udGV4dENoZWNrcykpIHtcbiAgICAgICAgaWYgKHRlc3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICd1bmtub3duJztcbn1cbiIsImltcG9ydCB7IGV4Y2x1ZGVEdXBsaWNhdGVQYXR0ZXJucywgcGF0dGVyblRvUmVnZXggfSBmcm9tICd3ZWJleHQtcGF0dGVybnMnO1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU1hbmlmZXN0UGVybWlzc2lvbnMobWFuaWZlc3QgPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpKSB7XG4gICAgY29uc3QgbWFuaWZlc3RQZXJtaXNzaW9ucyA9IHtcbiAgICAgICAgb3JpZ2luczogW10sXG4gICAgICAgIHBlcm1pc3Npb25zOiBbXSxcbiAgICB9O1xuICAgIGNvbnN0IGxpc3QgPSBuZXcgU2V0KFtcbiAgICAgICAgLi4uKG1hbmlmZXN0LnBlcm1pc3Npb25zID8/IFtdKSxcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudCAtLSBOb3Qgc3VyZSB3aHkgaXQncyBiZWluZyBhIFBJVEFcbiAgICAgICAgLi4uKG1hbmlmZXN0Lmhvc3RfcGVybWlzc2lvbnMgPz8gW10pLFxuICAgICAgICAuLi4obWFuaWZlc3QuY29udGVudF9zY3JpcHRzID8/IFtdKS5mbGF0TWFwKGNvbmZpZyA9PiBjb25maWcubWF0Y2hlcyA/PyBbXSksXG4gICAgXSk7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvZ2Vja28tZGV2L2Jsb2IvYzBmYzhjNDg1MmU5MjdiMGFlNzVkODkzZDM1NzcyYjhjNjBlZTA2Yi90b29sa2l0L2NvbXBvbmVudHMvZXh0ZW5zaW9ucy9FeHRlbnNpb24uanNtI0w3MzgtTDc0M1xuICAgIGlmIChtYW5pZmVzdC5kZXZ0b29sc19wYWdlXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgaXQgY2FuJ3QgYmUgc3BlY2lmaWVkLCBidXQgaXQncyByZXBvcnRlZCB3aGVuIHJlcXVlc3RlZFxuICAgICAgICAmJiAhbWFuaWZlc3Qub3B0aW9uYWxfcGVybWlzc2lvbnM/LmluY2x1ZGVzKCdkZXZ0b29scycpKSB7XG4gICAgICAgIGxpc3QuYWRkKCdkZXZ0b29scycpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHBlcm1pc3Npb24gb2YgbGlzdCkge1xuICAgICAgICBpZiAocGVybWlzc2lvbi5pbmNsdWRlcygnOi8vJykgfHwgcGVybWlzc2lvbiA9PT0gJzxhbGxfdXJscz4nKSB7XG4gICAgICAgICAgICBtYW5pZmVzdFBlcm1pc3Npb25zLm9yaWdpbnMucHVzaChwZXJtaXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1hbmlmZXN0UGVybWlzc2lvbnMucGVybWlzc2lvbnMucHVzaChwZXJtaXNzaW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZHJvcE92ZXJsYXBwaW5nUGVybWlzc2lvbnMobWFuaWZlc3RQZXJtaXNzaW9ucyk7XG59XG5jb25zdCBob3N0UmVnZXggPSAvOlsvXVsvXVsqLl0qKFteL10rKS87IC8vIEV4dHJhY3RzIHRoZSB3aWxkY2FyZC1sZXNzIGhvc3RuYW1lXG5mdW5jdGlvbiBwYXJzZURvbWFpbihvcmlnaW4pIHtcbiAgICByZXR1cm4gb3JpZ2luLnNwbGl0KGhvc3RSZWdleClbMV07XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcXVlcnlBZGRpdGlvbmFsUGVybWlzc2lvbnMob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgY2hyb21lLnBlcm1pc3Npb25zLmdldEFsbChjdXJyZW50UGVybWlzc2lvbnMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShleHRyYWN0QWRkaXRpb25hbFBlcm1pc3Npb25zKGN1cnJlbnRQZXJtaXNzaW9ucywgb3B0aW9ucykpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QWRkaXRpb25hbFBlcm1pc3Npb25zKGN1cnJlbnRQZXJtaXNzaW9ucywgeyBtYW5pZmVzdCwgc3RyaWN0T3JpZ2lucyA9IHRydWUsIH0gPSB7fSkge1xuICAgIGNvbnN0IG1hbmlmZXN0UGVybWlzc2lvbnMgPSBub3JtYWxpemVNYW5pZmVzdFBlcm1pc3Npb25zKG1hbmlmZXN0KTtcbiAgICBjb25zdCBhZGRpdGlvbmFsUGVybWlzc2lvbnMgPSB7XG4gICAgICAgIG9yaWdpbnM6IFtdLFxuICAgICAgICBwZXJtaXNzaW9uczogW10sXG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IG9yaWdpbiBvZiBjdXJyZW50UGVybWlzc2lvbnMub3JpZ2lucyA/PyBbXSkge1xuICAgICAgICBpZiAobWFuaWZlc3RQZXJtaXNzaW9ucy5vcmlnaW5zLmluY2x1ZGVzKG9yaWdpbikpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RyaWN0T3JpZ2lucykge1xuICAgICAgICAgICAgY29uc3QgZG9tYWluID0gcGFyc2VEb21haW4ob3JpZ2luKTtcbiAgICAgICAgICAgIGNvbnN0IGlzRG9tYWluSW5NYW5pZmVzdCA9IG1hbmlmZXN0UGVybWlzc2lvbnMub3JpZ2luc1xuICAgICAgICAgICAgICAgIC5zb21lKG1hbmlmZXN0T3JpZ2luID0+IHBhcnNlRG9tYWluKG1hbmlmZXN0T3JpZ2luKSA9PT0gZG9tYWluKTtcbiAgICAgICAgICAgIGlmIChpc0RvbWFpbkluTWFuaWZlc3QpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhZGRpdGlvbmFsUGVybWlzc2lvbnMub3JpZ2lucy5wdXNoKG9yaWdpbik7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcGVybWlzc2lvbiBvZiBjdXJyZW50UGVybWlzc2lvbnMucGVybWlzc2lvbnMgPz8gW10pIHtcbiAgICAgICAgaWYgKCFtYW5pZmVzdFBlcm1pc3Npb25zLnBlcm1pc3Npb25zLmluY2x1ZGVzKHBlcm1pc3Npb24pKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsUGVybWlzc2lvbnMucGVybWlzc2lvbnMucHVzaChwZXJtaXNzaW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWRkaXRpb25hbFBlcm1pc3Npb25zO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzVXJsUGVybWl0dGVkQnlNYW5pZmVzdChvcmlnaW4sIG1hbmlmZXN0ID0gY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKSkge1xuICAgIGNvbnN0IG1hbmlmZXN0UGVybWlzc2lvbnMgPSBub3JtYWxpemVNYW5pZmVzdFBlcm1pc3Npb25zKG1hbmlmZXN0KTtcbiAgICBjb25zdCBvcmlnaW5zUmVnZXggPSBwYXR0ZXJuVG9SZWdleCguLi5tYW5pZmVzdFBlcm1pc3Npb25zLm9yaWdpbnMpO1xuICAgIHJldHVybiBvcmlnaW5zUmVnZXgudGVzdChvcmlnaW4pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRyb3BPdmVybGFwcGluZ1Blcm1pc3Npb25zKHsgb3JpZ2lucywgcGVybWlzc2lvbnMgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9yaWdpbnM6IG9yaWdpbnMgPyBleGNsdWRlRHVwbGljYXRlUGF0dGVybnMob3JpZ2lucykgOiBbXSxcbiAgICAgICAgcGVybWlzc2lvbnM6IHBlcm1pc3Npb25zID8gWy4uLnBlcm1pc3Npb25zXSA6IFtdLFxuICAgIH07XG59XG4iLCJmdW5jdGlvbiBOZXN0ZWRQcm94eSh0YXJnZXQpIHtcblx0cmV0dXJuIG5ldyBQcm94eSh0YXJnZXQsIHtcblx0XHRnZXQodGFyZ2V0LCBwcm9wKSB7XG5cdFx0XHRpZiAoIXRhcmdldFtwcm9wXSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgTmVzdGVkUHJveHkodGFyZ2V0W3Byb3BdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICguLi5hcmd1bWVudHNfKSA9PlxuXHRcdFx0XHRuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0dGFyZ2V0W3Byb3BdKC4uLmFyZ3VtZW50c18sIHJlc3VsdCA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0fSk7XG59XG5cbmNvbnN0IGNocm9tZVAgPSBnbG9iYWxUaGlzLmNocm9tZSAmJiBuZXcgTmVzdGVkUHJveHkoZ2xvYmFsVGhpcy5jaHJvbWUpO1xuXG5leHBvcnQgZGVmYXVsdCBjaHJvbWVQO1xuIiwiaW1wb3J0IGNocm9tZVAgZnJvbSAnd2ViZXh0LXBvbHlmaWxsLWtpbmRhJztcbmltcG9ydCB7IGV4ZWN1dGVGdW5jdGlvbiB9IGZyb20gJ3dlYmV4dC1jb250ZW50LXNjcmlwdHMnO1xuZXhwb3J0IGZ1bmN0aW9uIGNhc3RUYXJnZXQodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnXG4gICAgICAgID8gdGFyZ2V0XG4gICAgICAgIDoge1xuICAgICAgICAgICAgdGFiSWQ6IHRhcmdldCxcbiAgICAgICAgICAgIGZyYW1lSWQ6IDAsXG4gICAgICAgIH07XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VGFiVXJsKHRhcmdldCkge1xuICAgIGNvbnN0IHsgZnJhbWVJZCwgdGFiSWQgfSA9IGNhc3RUYXJnZXQodGFyZ2V0KTtcbiAgICB0cnkge1xuICAgICAgICBpZiAoZnJhbWVJZCA9PT0gMCAmJiAndGFicycgaW4gZ2xvYmFsVGhpcy5jaHJvbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhYiA9IGF3YWl0IGNocm9tZVAudGFicy5nZXQodGFiSWQpO1xuICAgICAgICAgICAgaWYgKHRhYi51cmwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFiLnVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgZXhlY3V0ZUZ1bmN0aW9uKHRhcmdldCwgKCkgPT4gbG9jYXRpb24uaHJlZik7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgLy8gTm8gaG9zdCBwZXJtaXNzaW9uc1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjYW5BY2Nlc3NUYWIodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGV4ZWN1dGVGdW5jdGlvbihjYXN0VGFyZ2V0KHRhcmdldCksICgpID0+IHRydWUpLnRoZW4oKCkgPT4gdHJ1ZSwgKCkgPT4gZmFsc2UpO1xufVxuLyoqIFV0aWxpdHkgdG8gYXdhaXQgcHJvbWlzZXMgd2hlcmUgeW91IG9ubHkgY2FyZSB3aGV0aGVyIHRoZXkgdGhyb3cgb3Igbm90ICovXG5hc3luYyBmdW5jdGlvbiBpc1Byb21pc2VGdWxmaWxsZWQocHJvbWlzZSkge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG9lc1RhYkV4aXN0KHRhYklkKSB7XG4gICAgcmV0dXJuIGlzUHJvbWlzZUZ1bGZpbGxlZChjaHJvbWVQLnRhYnMuZ2V0KHRhYklkKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aW9uUG9wdXAoZ2V0UG9wdXBVcmwpIHtcbiAgICBjb25zdCBicm93c2VyQWN0aW9uID0gY2hyb21lLmFjdGlvbiA/PyBjaHJvbWVQLmJyb3dzZXJBY3Rpb247XG4gICAgY29uc3Qgc2V0T25BY3RpdmVUYWIgPSBhc3luYyAod2luZG93SWQpID0+IHtcbiAgICAgICAgY29uc3QgW3RhYl0gPSBhd2FpdCBjaHJvbWVQLnRhYnMucXVlcnkoe1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgLi4ud2luZG93SWQgPyB7IHdpbmRvd0lkIH0gOiB7IGxhc3RGb2N1c2VkV2luZG93OiB0cnVlIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRhYikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGJyb3dzZXJBY3Rpb24uc2V0UG9wdXAoe1xuICAgICAgICAgICAgcG9wdXA6IGF3YWl0IGdldFBvcHVwVXJsKHRhYi51cmwpID8/ICcnLFxuICAgICAgICAgICAgdGFiSWQ6IHRhYi5pZCxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2b2lkIHNldE9uQWN0aXZlVGFiKCk7XG4gICAgY2hyb21lLndpbmRvd3Mub25Gb2N1c0NoYW5nZWQuYWRkTGlzdGVuZXIoc2V0T25BY3RpdmVUYWIpO1xuICAgIGNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKGFzeW5jIChhY3RpdmVJbmZvKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhYiA9IGF3YWl0IGNocm9tZVAudGFicy5nZXQoYWN0aXZlSW5mby50YWJJZCk7XG4gICAgICAgIGF3YWl0IGJyb3dzZXJBY3Rpb24uc2V0UG9wdXAoe1xuICAgICAgICAgICAgcG9wdXA6IGF3YWl0IGdldFBvcHVwVXJsKHRhYi51cmwpID8/ICcnLFxuICAgICAgICAgICAgdGFiSWQ6IHRhYi5pZCxcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGFzeW5jICh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSA9PiB7XG4gICAgICAgIGlmICh0YWIuYWN0aXZlICYmIGNoYW5nZUluZm8udXJsKSB7XG4gICAgICAgICAgICBhd2FpdCBicm93c2VyQWN0aW9uLnNldFBvcHVwKHtcbiAgICAgICAgICAgICAgICBwb3B1cDogYXdhaXQgZ2V0UG9wdXBVcmwodGFiLnVybCkgPz8gJycsXG4gICAgICAgICAgICAgICAgdGFiSWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2JhY2tncm91bmQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=