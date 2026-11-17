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

/***/ "./src/scripts/offscreen.ts":
/*!**********************************!*\
  !*** ./src/scripts/offscreen.ts ***!
  \**********************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const analytics_1 = __webpack_require__(/*! ./utils/analytics */ "./src/scripts/utils/analytics.ts");
const dom_1 = __webpack_require__(/*! ./utils/dom */ "./src/scripts/utils/dom.ts");
const notifications_1 = __webpack_require__(/*! ./utils/notifications */ "./src/scripts/utils/notifications.ts");
// Registering this listener when the script is first executed ensures that the
// offscreen document will be able to receive messages when the promise returned
// by `offscreen.createDocument()` resolves.
chrome.runtime.onMessage.addListener(handleMessages);
let analyticsIsEnabled = false;
// This function performs basic filtering and error checking on messages before
// dispatching the message to a more specific message handler.
function handleMessages(message, sender, sendResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        // Return early if this message isn't meant for the offscreen document.
        if (message.target !== "offscreen") {
            return false;
        }
        // Dispatch the message to an appropriate handler.
        switch (message.type) {
            case "offscreen-notifications":
                let { notification, name, count, lastTime, timeModified } = yield (0, notifications_1.loadAssignmentNotifications)(message.data.url, message.data.lastTime);
                chrome.runtime.sendMessage({
                    type: "notification",
                    data: {
                        notification,
                        name,
                        count,
                        lastTime,
                        timeModified,
                    },
                });
                break;
            case "offscreen-analytics":
                if (!analyticsIsEnabled) {
                    yield (0, analytics_1.initializeAnalytics)({
                        documentContext: false,
                        isAnalyticsEnabled: (0, dom_1.getBrowser)() !== "Firefox" &&
                            message.data.settings.analytics !== "disabled",
                        selectedTheme: (_a = message.data.settings.theme) !== null && _a !== void 0 ? _a : "<unset>",
                        selectedBeta: (_b = message.data.settings.beta) !== null && _b !== void 0 ? _b : "<unset>",
                        currentVersion: message.data.settings.version,
                        newVersion: (_c = message.data.settings.newVersion) !== null && _c !== void 0 ? _c : "<unset>",
                        randomUserId: message.data.settings.randomUserId,
                        themeIsModern: "<unset>",
                    });
                    analyticsIsEnabled = true;
                }
                (0, analytics_1.trackEvent)(message.data.name, message.data.props);
                break;
            default:
                console.warn(`Unexpected message type received: '${message.type}'.`);
                return false;
        }
    });
}


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/offscreen.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7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LHdCQUF3Qjs7Ozs7OztVQzVKeEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vbm9kZV9tb2R1bGVzL2RvbXB1cmlmeS9kaXN0L3B1cmlmeS5qcyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL29mZnNjcmVlbi50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2FuYWx5dGljcy50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2RvbS50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL2xvZ2dlci50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3V0aWxzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBAbGljZW5zZSBET01QdXJpZnkgfCAoYykgQ3VyZTUzIGFuZCBvdGhlciBjb250cmlidXRvcnMgfCBSZWxlYXNlZCB1bmRlciB0aGUgQXBhY2hlIGxpY2Vuc2UgMi4wIGFuZCBNb3ppbGxhIFB1YmxpYyBMaWNlbnNlIDIuMCB8IGdpdGh1Yi5jb20vY3VyZTUzL0RPTVB1cmlmeS9ibG9iLzIuMC44L0xJQ0VOU0UgKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5ET01QdXJpZnkgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCBmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QuaGFzT3duUHJvcGVydHksXG4gICAgICBzZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZixcbiAgICAgIGlzRnJvemVuID0gT2JqZWN0LmlzRnJvemVuO1xuICB2YXIgZnJlZXplID0gT2JqZWN0LmZyZWV6ZSxcbiAgICAgIHNlYWwgPSBPYmplY3Quc2VhbCxcbiAgICAgIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLW11dGFibGUtZXhwb3J0c1xuXG4gIHZhciBfcmVmID0gdHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIFJlZmxlY3QsXG4gICAgICBhcHBseSA9IF9yZWYuYXBwbHksXG4gICAgICBjb25zdHJ1Y3QgPSBfcmVmLmNvbnN0cnVjdDtcblxuICBpZiAoIWFwcGx5KSB7XG4gICAgYXBwbHkgPSBmdW5jdGlvbiBhcHBseShmdW4sIHRoaXNWYWx1ZSwgYXJncykge1xuICAgICAgcmV0dXJuIGZ1bi5hcHBseSh0aGlzVmFsdWUsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICBpZiAoIWZyZWV6ZSkge1xuICAgIGZyZWV6ZSA9IGZ1bmN0aW9uIGZyZWV6ZSh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFzZWFsKSB7XG4gICAgc2VhbCA9IGZ1bmN0aW9uIHNlYWwoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghY29uc3RydWN0KSB7XG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gY29uc3RydWN0KEZ1bmMsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KEZ1bmMsIFtudWxsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKSkpKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBhcnJheUZvckVhY2ggPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKTtcbiAgdmFyIGFycmF5UG9wID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucG9wKTtcbiAgdmFyIGFycmF5UHVzaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuXG4gIHZhciBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XG4gIHZhciBzdHJpbmdNYXRjaCA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5tYXRjaCk7XG4gIHZhciBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuICB2YXIgc3RyaW5nSW5kZXhPZiA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mKTtcbiAgdmFyIHN0cmluZ1RyaW0gPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudHJpbSk7XG5cbiAgdmFyIHJlZ0V4cFRlc3QgPSB1bmFwcGx5KFJlZ0V4cC5wcm90b3R5cGUudGVzdCk7XG5cbiAgdmFyIHR5cGVFcnJvckNyZWF0ZSA9IHVuY29uc3RydWN0KFR5cGVFcnJvcik7XG5cbiAgZnVuY3Rpb24gdW5hcHBseShmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdW5jb25zdHJ1Y3QoZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb25zdHJ1Y3QoZnVuYywgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qIEFkZCBwcm9wZXJ0aWVzIHRvIGEgbG9va3VwIHRhYmxlICovXG4gIGZ1bmN0aW9uIGFkZFRvU2V0KHNldCwgYXJyYXkpIHtcbiAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIC8vIE1ha2UgJ2luJyBhbmQgdHJ1dGh5IGNoZWNrcyBsaWtlIEJvb2xlYW4oc2V0LmNvbnN0cnVjdG9yKVxuICAgICAgLy8gaW5kZXBlbmRlbnQgb2YgYW55IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBPYmplY3QucHJvdG90eXBlLlxuICAgICAgLy8gUHJldmVudCBwcm90b3R5cGUgc2V0dGVycyBmcm9tIGludGVyY2VwdGluZyBzZXQgYXMgYSB0aGlzIHZhbHVlLlxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2V0LCBudWxsKTtcbiAgICB9XG5cbiAgICB2YXIgbCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobC0tKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IGFycmF5W2xdO1xuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbGNFbGVtZW50ID0gc3RyaW5nVG9Mb3dlckNhc2UoZWxlbWVudCk7XG4gICAgICAgIGlmIChsY0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBDb25maWcgcHJlc2V0cyAoZS5nLiB0YWdzLmpzLCBhdHRycy5qcykgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgICBpZiAoIWlzRnJvemVuKGFycmF5KSkge1xuICAgICAgICAgICAgYXJyYXlbbF0gPSBsY0VsZW1lbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbWVudCA9IGxjRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRbZWxlbWVudF0gPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKiBTaGFsbG93IGNsb25lIGFuIG9iamVjdCAqL1xuICBmdW5jdGlvbiBjbG9uZShvYmplY3QpIHtcbiAgICB2YXIgbmV3T2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuXG4gICAgdmFyIHByb3BlcnR5ID0gdm9pZCAwO1xuICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICBpZiAoYXBwbHkoaGFzT3duUHJvcGVydHksIG9iamVjdCwgW3Byb3BlcnR5XSkpIHtcbiAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuXG4gIHZhciBodG1sID0gZnJlZXplKFsnYScsICdhYmJyJywgJ2Fjcm9ueW0nLCAnYWRkcmVzcycsICdhcmVhJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnYXVkaW8nLCAnYicsICdiZGknLCAnYmRvJywgJ2JpZycsICdibGluaycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NlbnRlcicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2NvbnRlbnQnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWNvcmF0b3InLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpcicsICdkaXYnLCAnZGwnLCAnZHQnLCAnZWxlbWVudCcsICdlbScsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb250JywgJ2Zvb3RlcicsICdmb3JtJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWQnLCAnaGVhZGVyJywgJ2hncm91cCcsICdocicsICdodG1sJywgJ2knLCAnaW1nJywgJ2lucHV0JywgJ2lucycsICdrYmQnLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ21haW4nLCAnbWFwJywgJ21hcmsnLCAnbWFycXVlZScsICdtZW51JywgJ21lbnVpdGVtJywgJ21ldGVyJywgJ25hdicsICdub2JyJywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwaWN0dXJlJywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JwJywgJ3J0JywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NlY3Rpb24nLCAnc2VsZWN0JywgJ3NoYWRvdycsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhY2VyJywgJ3NwYW4nLCAnc3RyaWtlJywgJ3N0cm9uZycsICdzdHlsZScsICdzdWInLCAnc3VtbWFyeScsICdzdXAnLCAndGFibGUnLCAndGJvZHknLCAndGQnLCAndGVtcGxhdGUnLCAndGV4dGFyZWEnLCAndGZvb3QnLCAndGgnLCAndGhlYWQnLCAndGltZScsICd0cicsICd0cmFjaycsICd0dCcsICd1JywgJ3VsJywgJ3ZhcicsICd2aWRlbycsICd3YnInXSk7XG5cbiAgLy8gU1ZHXG4gIHZhciBzdmcgPSBmcmVlemUoWydzdmcnLCAnYScsICdhbHRnbHlwaCcsICdhbHRnbHlwaGRlZicsICdhbHRnbHlwaGl0ZW0nLCAnYW5pbWF0ZWNvbG9yJywgJ2FuaW1hdGVtb3Rpb24nLCAnYW5pbWF0ZXRyYW5zZm9ybScsICdhdWRpbycsICdjYW52YXMnLCAnY2lyY2xlJywgJ2NsaXBwYXRoJywgJ2RlZnMnLCAnZGVzYycsICdlbGxpcHNlJywgJ2ZpbHRlcicsICdmb250JywgJ2cnLCAnZ2x5cGgnLCAnZ2x5cGhyZWYnLCAnaGtlcm4nLCAnaW1hZ2UnLCAnbGluZScsICdsaW5lYXJncmFkaWVudCcsICdtYXJrZXInLCAnbWFzaycsICdtZXRhZGF0YScsICdtcGF0aCcsICdwYXRoJywgJ3BhdHRlcm4nLCAncG9seWdvbicsICdwb2x5bGluZScsICdyYWRpYWxncmFkaWVudCcsICdyZWN0JywgJ3N0b3AnLCAnc3R5bGUnLCAnc3dpdGNoJywgJ3N5bWJvbCcsICd0ZXh0JywgJ3RleHRwYXRoJywgJ3RpdGxlJywgJ3RyZWYnLCAndHNwYW4nLCAndmlkZW8nLCAndmlldycsICd2a2VybiddKTtcblxuICB2YXIgc3ZnRmlsdGVycyA9IGZyZWV6ZShbJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJywgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLCAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLCAnZmVGdW5jRycsICdmZUZ1bmNSJywgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlTWVyZ2UnLCAnZmVNZXJnZU5vZGUnLCAnZmVNb3JwaG9sb2d5JywgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLCAnZmVTcG90TGlnaHQnLCAnZmVUaWxlJywgJ2ZlVHVyYnVsZW5jZSddKTtcblxuICB2YXIgbWF0aE1sID0gZnJlZXplKFsnbWF0aCcsICdtZW5jbG9zZScsICdtZXJyb3InLCAnbWZlbmNlZCcsICdtZnJhYycsICdtZ2x5cGgnLCAnbWknLCAnbWxhYmVsZWR0cicsICdtbXVsdGlzY3JpcHRzJywgJ21uJywgJ21vJywgJ21vdmVyJywgJ21wYWRkZWQnLCAnbXBoYW50b20nLCAnbXJvb3QnLCAnbXJvdycsICdtcycsICdtc3BhY2UnLCAnbXNxcnQnLCAnbXN0eWxlJywgJ21zdWInLCAnbXN1cCcsICdtc3Vic3VwJywgJ210YWJsZScsICdtdGQnLCAnbXRleHQnLCAnbXRyJywgJ211bmRlcicsICdtdW5kZXJvdmVyJ10pO1xuXG4gIHZhciB0ZXh0ID0gZnJlZXplKFsnI3RleHQnXSk7XG5cbiAgdmFyIGh0bWwkMSA9IGZyZWV6ZShbJ2FjY2VwdCcsICdhY3Rpb24nLCAnYWxpZ24nLCAnYWx0JywgJ2F1dG9jYXBpdGFsaXplJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvcGljdHVyZWlucGljdHVyZScsICdhdXRvcGxheScsICdiYWNrZ3JvdW5kJywgJ2JnY29sb3InLCAnYm9yZGVyJywgJ2NhcHR1cmUnLCAnY2VsbHBhZGRpbmcnLCAnY2VsbHNwYWNpbmcnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzJywgJ2NsZWFyJywgJ2NvbG9yJywgJ2NvbHMnLCAnY29sc3BhbicsICdjb250cm9scycsICdjb250cm9sc2xpc3QnLCAnY29vcmRzJywgJ2Nyb3Nzb3JpZ2luJywgJ2RhdGV0aW1lJywgJ2RlY29kaW5nJywgJ2RlZmF1bHQnLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rpc2FibGVwaWN0dXJlaW5waWN0dXJlJywgJ2Rpc2FibGVyZW1vdGVwbGF5YmFjaycsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLCAnZW5jdHlwZScsICdlbnRlcmtleWhpbnQnLCAnZmFjZScsICdmb3InLCAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmbGFuZycsICdpZCcsICdpbnB1dG1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzbWFwJywgJ2tpbmQnLCAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvYWRpbmcnLCAnbG9vcCcsICdsb3cnLCAnbWF4JywgJ21heGxlbmd0aCcsICdtZWRpYScsICdtZXRob2QnLCAnbWluJywgJ21pbmxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsICduYW1lJywgJ25vc2hhZGUnLCAnbm92YWxpZGF0ZScsICdub3dyYXAnLCAnb3BlbicsICdvcHRpbXVtJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncGxheXNpbmxpbmUnLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHViZGF0ZScsICdyYWRpb2dyb3VwJywgJ3JlYWRvbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXYnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dzJywgJ3Jvd3NwYW4nLCAnc3BlbGxjaGVjaycsICdzY29wZScsICdzZWxlY3RlZCcsICdzaGFwZScsICdzaXplJywgJ3NpemVzJywgJ3NwYW4nLCAnc3JjbGFuZycsICdzdGFydCcsICdzcmMnLCAnc3Jjc2V0JywgJ3N0ZXAnLCAnc3R5bGUnLCAnc3VtbWFyeScsICd0YWJpbmRleCcsICd0aXRsZScsICd0cmFuc2xhdGUnLCAndHlwZScsICd1c2VtYXAnLCAndmFsaWduJywgJ3ZhbHVlJywgJ3dpZHRoJywgJ3htbG5zJ10pO1xuXG4gIHZhciBzdmckMSA9IGZyZWV6ZShbJ2FjY2VudC1oZWlnaHQnLCAnYWNjdW11bGF0ZScsICdhZGRpdGl2ZScsICdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnYXNjZW50JywgJ2F0dHJpYnV0ZW5hbWUnLCAnYXR0cmlidXRldHlwZScsICdhemltdXRoJywgJ2Jhc2VmcmVxdWVuY3knLCAnYmFzZWxpbmUtc2hpZnQnLCAnYmVnaW4nLCAnYmlhcycsICdieScsICdjbGFzcycsICdjbGlwJywgJ2NsaXBwYXRodW5pdHMnLCAnY2xpcC1wYXRoJywgJ2NsaXAtcnVsZScsICdjb2xvcicsICdjb2xvci1pbnRlcnBvbGF0aW9uJywgJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycycsICdjb2xvci1wcm9maWxlJywgJ2NvbG9yLXJlbmRlcmluZycsICdjeCcsICdjeScsICdkJywgJ2R4JywgJ2R5JywgJ2RpZmZ1c2Vjb25zdGFudCcsICdkaXJlY3Rpb24nLCAnZGlzcGxheScsICdkaXZpc29yJywgJ2R1cicsICdlZGdlbW9kZScsICdlbGV2YXRpb24nLCAnZW5kJywgJ2ZpbGwnLCAnZmlsbC1vcGFjaXR5JywgJ2ZpbGwtcnVsZScsICdmaWx0ZXInLCAnZmlsdGVydW5pdHMnLCAnZmxvb2QtY29sb3InLCAnZmxvb2Qtb3BhY2l0eScsICdmb250LWZhbWlseScsICdmb250LXNpemUnLCAnZm9udC1zaXplLWFkanVzdCcsICdmb250LXN0cmV0Y2gnLCAnZm9udC1zdHlsZScsICdmb250LXZhcmlhbnQnLCAnZm9udC13ZWlnaHQnLCAnZngnLCAnZnknLCAnZzEnLCAnZzInLCAnZ2x5cGgtbmFtZScsICdnbHlwaHJlZicsICdncmFkaWVudHVuaXRzJywgJ2dyYWRpZW50dHJhbnNmb3JtJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2ltYWdlLXJlbmRlcmluZycsICdpbicsICdpbjInLCAnaycsICdrMScsICdrMicsICdrMycsICdrNCcsICdrZXJuaW5nJywgJ2tleXBvaW50cycsICdrZXlzcGxpbmVzJywgJ2tleXRpbWVzJywgJ2xhbmcnLCAnbGVuZ3RoYWRqdXN0JywgJ2xldHRlci1zcGFjaW5nJywgJ2tlcm5lbG1hdHJpeCcsICdrZXJuZWx1bml0bGVuZ3RoJywgJ2xpZ2h0aW5nLWNvbG9yJywgJ2xvY2FsJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnLCAnbWFya2VyaGVpZ2h0JywgJ21hcmtlcnVuaXRzJywgJ21hcmtlcndpZHRoJywgJ21hc2tjb250ZW50dW5pdHMnLCAnbWFza3VuaXRzJywgJ21heCcsICdtYXNrJywgJ21lZGlhJywgJ21ldGhvZCcsICdtb2RlJywgJ21pbicsICduYW1lJywgJ251bW9jdGF2ZXMnLCAnb2Zmc2V0JywgJ29wZXJhdG9yJywgJ29wYWNpdHknLCAnb3JkZXInLCAnb3JpZW50JywgJ29yaWVudGF0aW9uJywgJ29yaWdpbicsICdvdmVyZmxvdycsICdwYWludC1vcmRlcicsICdwYXRoJywgJ3BhdGhsZW5ndGgnLCAncGF0dGVybmNvbnRlbnR1bml0cycsICdwYXR0ZXJudHJhbnNmb3JtJywgJ3BhdHRlcm51bml0cycsICdwb2ludHMnLCAncHJlc2VydmVhbHBoYScsICdwcmVzZXJ2ZWFzcGVjdHJhdGlvJywgJ3ByaW1pdGl2ZXVuaXRzJywgJ3InLCAncngnLCAncnknLCAncmFkaXVzJywgJ3JlZngnLCAncmVmeScsICdyZXBlYXRjb3VudCcsICdyZXBlYXRkdXInLCAncmVzdGFydCcsICdyZXN1bHQnLCAncm90YXRlJywgJ3NjYWxlJywgJ3NlZWQnLCAnc2hhcGUtcmVuZGVyaW5nJywgJ3NwZWN1bGFyY29uc3RhbnQnLCAnc3BlY3VsYXJleHBvbmVudCcsICdzcHJlYWRtZXRob2QnLCAnc3RhcnRvZmZzZXQnLCAnc3RkZGV2aWF0aW9uJywgJ3N0aXRjaHRpbGVzJywgJ3N0b3AtY29sb3InLCAnc3RvcC1vcGFjaXR5JywgJ3N0cm9rZS1kYXNoYXJyYXknLCAnc3Ryb2tlLWRhc2hvZmZzZXQnLCAnc3Ryb2tlLWxpbmVjYXAnLCAnc3Ryb2tlLWxpbmVqb2luJywgJ3N0cm9rZS1taXRlcmxpbWl0JywgJ3N0cm9rZS1vcGFjaXR5JywgJ3N0cm9rZScsICdzdHJva2Utd2lkdGgnLCAnc3R5bGUnLCAnc3VyZmFjZXNjYWxlJywgJ3N5c3RlbWxhbmd1YWdlJywgJ3RhYmluZGV4JywgJ3RhcmdldHgnLCAndGFyZ2V0eScsICd0cmFuc2Zvcm0nLCAndGV4dC1hbmNob3InLCAndGV4dC1kZWNvcmF0aW9uJywgJ3RleHQtcmVuZGVyaW5nJywgJ3RleHRsZW5ndGgnLCAndHlwZScsICd1MScsICd1MicsICd1bmljb2RlJywgJ3ZhbHVlcycsICd2aWV3Ym94JywgJ3Zpc2liaWxpdHknLCAndmVyc2lvbicsICd2ZXJ0LWFkdi15JywgJ3ZlcnQtb3JpZ2luLXgnLCAndmVydC1vcmlnaW4teScsICd3aWR0aCcsICd3b3JkLXNwYWNpbmcnLCAnd3JhcCcsICd3cml0aW5nLW1vZGUnLCAneGNoYW5uZWxzZWxlY3RvcicsICd5Y2hhbm5lbHNlbGVjdG9yJywgJ3gnLCAneDEnLCAneDInLCAneG1sbnMnLCAneScsICd5MScsICd5MicsICd6JywgJ3pvb21hbmRwYW4nXSk7XG5cbiAgdmFyIG1hdGhNbCQxID0gZnJlZXplKFsnYWNjZW50JywgJ2FjY2VudHVuZGVyJywgJ2FsaWduJywgJ2JldmVsbGVkJywgJ2Nsb3NlJywgJ2NvbHVtbnNhbGlnbicsICdjb2x1bW5saW5lcycsICdjb2x1bW5zcGFuJywgJ2Rlbm9tYWxpZ24nLCAnZGVwdGgnLCAnZGlyJywgJ2Rpc3BsYXknLCAnZGlzcGxheXN0eWxlJywgJ2VuY29kaW5nJywgJ2ZlbmNlJywgJ2ZyYW1lJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2xhcmdlb3AnLCAnbGVuZ3RoJywgJ2xpbmV0aGlja25lc3MnLCAnbHNwYWNlJywgJ2xxdW90ZScsICdtYXRoYmFja2dyb3VuZCcsICdtYXRoY29sb3InLCAnbWF0aHNpemUnLCAnbWF0aHZhcmlhbnQnLCAnbWF4c2l6ZScsICdtaW5zaXplJywgJ21vdmFibGVsaW1pdHMnLCAnbm90YXRpb24nLCAnbnVtYWxpZ24nLCAnb3BlbicsICdyb3dhbGlnbicsICdyb3dsaW5lcycsICdyb3dzcGFjaW5nJywgJ3Jvd3NwYW4nLCAncnNwYWNlJywgJ3JxdW90ZScsICdzY3JpcHRsZXZlbCcsICdzY3JpcHRtaW5zaXplJywgJ3NjcmlwdHNpemVtdWx0aXBsaWVyJywgJ3NlbGVjdGlvbicsICdzZXBhcmF0b3InLCAnc2VwYXJhdG9ycycsICdzdHJldGNoeScsICdzdWJzY3JpcHRzaGlmdCcsICdzdXBzY3JpcHRzaGlmdCcsICdzeW1tZXRyaWMnLCAndm9mZnNldCcsICd3aWR0aCcsICd4bWxucyddKTtcblxuICB2YXIgeG1sID0gZnJlZXplKFsneGxpbms6aHJlZicsICd4bWw6aWQnLCAneGxpbms6dGl0bGUnLCAneG1sOnNwYWNlJywgJ3htbG5zOnhsaW5rJ10pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL2JldHRlci1yZWdleFxuICB2YXIgTVVTVEFDSEVfRVhQUiA9IHNlYWwoL1xce1xce1tcXHNcXFNdKnxbXFxzXFxTXSpcXH1cXH0vZ20pOyAvLyBTcGVjaWZ5IHRlbXBsYXRlIGRldGVjdGlvbiByZWdleCBmb3IgU0FGRV9GT1JfVEVNUExBVEVTIG1vZGVcbiAgdmFyIEVSQl9FWFBSID0gc2VhbCgvPCVbXFxzXFxTXSp8W1xcc1xcU10qJT4vZ20pO1xuICB2YXIgREFUQV9BVFRSID0gc2VhbCgvXmRhdGEtW1xcLVxcdy5cXHUwMEI3LVxcdUZGRkZdLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgdmFyIEFSSUFfQVRUUiA9IHNlYWwoL15hcmlhLVtcXC1cXHddKyQvKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICB2YXIgSVNfQUxMT1dFRF9VUkkgPSBzZWFsKC9eKD86KD86KD86ZnxodCl0cHM/fG1haWx0b3x0ZWx8Y2FsbHRvfGNpZHx4bXBwKTp8W15hLXpdfFthLXorLlxcLV0rKD86W15hLXorLlxcLTpdfCQpKS9pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgKTtcbiAgdmFyIElTX1NDUklQVF9PUl9EQVRBID0gc2VhbCgvXig/OlxcdytzY3JpcHR8ZGF0YSk6L2kpO1xuICB2YXIgQVRUUl9XSElURVNQQUNFID0gc2VhbCgvW1xcdTAwMDAtXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDAtXFx1MjAyOVxcdTIwNUZcXHUzMDAwXS9nIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29udHJvbC1yZWdleFxuICApO1xuXG4gIHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuICBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkkMShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4gIHZhciBnZXRHbG9iYWwgPSBmdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdztcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5vLW9wIHBvbGljeSBmb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gICAqIERvbid0IGV4cG9ydCB0aGlzIGZ1bmN0aW9uIG91dHNpZGUgdGhpcyBtb2R1bGUhXG4gICAqIEBwYXJhbSB7P1RydXN0ZWRUeXBlUG9saWN5RmFjdG9yeX0gdHJ1c3RlZFR5cGVzIFRoZSBwb2xpY3kgZmFjdG9yeS5cbiAgICogQHBhcmFtIHtEb2N1bWVudH0gZG9jdW1lbnQgVGhlIGRvY3VtZW50IG9iamVjdCAodG8gZGV0ZXJtaW5lIHBvbGljeSBuYW1lIHN1ZmZpeClcbiAgICogQHJldHVybiB7P1RydXN0ZWRUeXBlUG9saWN5fSBUaGUgcG9saWN5IGNyZWF0ZWQgKG9yIG51bGwsIGlmIFRydXN0ZWQgVHlwZXNcbiAgICogYXJlIG5vdCBzdXBwb3J0ZWQpLlxuICAgKi9cbiAgdmFyIF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kgPSBmdW5jdGlvbiBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgZG9jdW1lbnQpIHtcbiAgICBpZiAoKHR5cGVvZiB0cnVzdGVkVHlwZXMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRydXN0ZWRUeXBlcykpICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgdGhlIGNhbGxlcnMgdG8gY29udHJvbCB0aGUgdW5pcXVlIHBvbGljeSBuYW1lXG4gICAgLy8gYnkgYWRkaW5nIGEgZGF0YS10dC1wb2xpY3ktc3VmZml4IHRvIHRoZSBzY3JpcHQgZWxlbWVudCB3aXRoIHRoZSBET01QdXJpZnkuXG4gICAgLy8gUG9saWN5IGNyZWF0aW9uIHdpdGggZHVwbGljYXRlIG5hbWVzIHRocm93cyBpbiBUcnVzdGVkIFR5cGVzLlxuICAgIHZhciBzdWZmaXggPSBudWxsO1xuICAgIHZhciBBVFRSX05BTUUgPSAnZGF0YS10dC1wb2xpY3ktc3VmZml4JztcbiAgICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0Lmhhc0F0dHJpYnV0ZShBVFRSX05BTUUpKSB7XG4gICAgICBzdWZmaXggPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShBVFRSX05BTUUpO1xuICAgIH1cblxuICAgIHZhciBwb2xpY3lOYW1lID0gJ2RvbXB1cmlmeScgKyAoc3VmZml4ID8gJyMnICsgc3VmZml4IDogJycpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5KHBvbGljeU5hbWUsIHtcbiAgICAgICAgY3JlYXRlSFRNTDogZnVuY3Rpb24gY3JlYXRlSFRNTChodG1sJCQxKSB7XG4gICAgICAgICAgcmV0dXJuIGh0bWwkJDE7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIC8vIFBvbGljeSBjcmVhdGlvbiBmYWlsZWQgKG1vc3QgbGlrZWx5IGFub3RoZXIgRE9NUHVyaWZ5IHNjcmlwdCBoYXNcbiAgICAgIC8vIGFscmVhZHkgcnVuKS4gU2tpcCBjcmVhdGluZyB0aGUgcG9saWN5LCBhcyB0aGlzIHdpbGwgb25seSBjYXVzZSBlcnJvcnNcbiAgICAgIC8vIGlmIFRUIGFyZSBlbmZvcmNlZC5cbiAgICAgIGNvbnNvbGUud2FybignVHJ1c3RlZFR5cGVzIHBvbGljeSAnICsgcG9saWN5TmFtZSArICcgY291bGQgbm90IGJlIGNyZWF0ZWQuJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gY3JlYXRlRE9NUHVyaWZ5KCkge1xuICAgIHZhciB3aW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGdldEdsb2JhbCgpO1xuXG4gICAgdmFyIERPTVB1cmlmeSA9IGZ1bmN0aW9uIERPTVB1cmlmeShyb290KSB7XG4gICAgICByZXR1cm4gY3JlYXRlRE9NUHVyaWZ5KHJvb3QpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIGxhYmVsLCBleHBvc2VkIGZvciBlYXNpZXIgY2hlY2tzXG4gICAgICogaWYgRE9NUHVyaWZ5IGlzIHVwIHRvIGRhdGUgb3Igbm90XG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnZlcnNpb24gPSAnMi4xLjEnO1xuXG4gICAgLyoqXG4gICAgICogQXJyYXkgb2YgZWxlbWVudHMgdGhhdCBET01QdXJpZnkgcmVtb3ZlZCBkdXJpbmcgc2FuaXRhdGlvbi5cbiAgICAgKiBFbXB0eSBpZiBub3RoaW5nIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVkID0gW107XG5cbiAgICBpZiAoIXdpbmRvdyB8fCAhd2luZG93LmRvY3VtZW50IHx8IHdpbmRvdy5kb2N1bWVudC5ub2RlVHlwZSAhPT0gOSkge1xuICAgICAgLy8gTm90IHJ1bm5pbmcgaW4gYSBicm93c2VyLCBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCB5b3UgY2FuIHBhc3MgeW91ciBvd24gV2luZG93XG4gICAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSBmYWxzZTtcblxuICAgICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgICB9XG5cbiAgICB2YXIgb3JpZ2luYWxEb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxuICAgIHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbiAgICB2YXIgRG9jdW1lbnRGcmFnbWVudCA9IHdpbmRvdy5Eb2N1bWVudEZyYWdtZW50LFxuICAgICAgICBIVE1MVGVtcGxhdGVFbGVtZW50ID0gd2luZG93LkhUTUxUZW1wbGF0ZUVsZW1lbnQsXG4gICAgICAgIE5vZGUgPSB3aW5kb3cuTm9kZSxcbiAgICAgICAgTm9kZUZpbHRlciA9IHdpbmRvdy5Ob2RlRmlsdGVyLFxuICAgICAgICBfd2luZG93JE5hbWVkTm9kZU1hcCA9IHdpbmRvdy5OYW1lZE5vZGVNYXAsXG4gICAgICAgIE5hbWVkTm9kZU1hcCA9IF93aW5kb3ckTmFtZWROb2RlTWFwID09PSB1bmRlZmluZWQgPyB3aW5kb3cuTmFtZWROb2RlTWFwIHx8IHdpbmRvdy5Nb3pOYW1lZEF0dHJNYXAgOiBfd2luZG93JE5hbWVkTm9kZU1hcCxcbiAgICAgICAgVGV4dCA9IHdpbmRvdy5UZXh0LFxuICAgICAgICBDb21tZW50ID0gd2luZG93LkNvbW1lbnQsXG4gICAgICAgIERPTVBhcnNlciA9IHdpbmRvdy5ET01QYXJzZXIsXG4gICAgICAgIHRydXN0ZWRUeXBlcyA9IHdpbmRvdy50cnVzdGVkVHlwZXM7XG5cbiAgICAvLyBBcyBwZXIgaXNzdWUgIzQ3LCB0aGUgd2ViLWNvbXBvbmVudHMgcmVnaXN0cnkgaXMgaW5oZXJpdGVkIGJ5IGFcbiAgICAvLyBuZXcgZG9jdW1lbnQgY3JlYXRlZCB2aWEgY3JlYXRlSFRNTERvY3VtZW50LiBBcyBwZXIgdGhlIHNwZWNcbiAgICAvLyAoaHR0cDovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL2N1c3RvbS8jY3JlYXRpbmctYW5kLXBhc3NpbmctcmVnaXN0cmllcylcbiAgICAvLyBhIG5ldyBlbXB0eSByZWdpc3RyeSBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgYSB0ZW1wbGF0ZSBjb250ZW50cyBvd25lclxuICAgIC8vIGRvY3VtZW50LCBzbyB3ZSB1c2UgdGhhdCBhcyBvdXIgcGFyZW50IGRvY3VtZW50IHRvIGVuc3VyZSBub3RoaW5nXG4gICAgLy8gaXMgaW5oZXJpdGVkLlxuXG4gICAgaWYgKHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgICAgaWYgKHRlbXBsYXRlLmNvbnRlbnQgJiYgdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGRvY3VtZW50ID0gdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB0cnVzdGVkVHlwZXNQb2xpY3kgPSBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgb3JpZ2luYWxEb2N1bWVudCk7XG4gICAgdmFyIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpIDogJyc7XG5cbiAgICB2YXIgX2RvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgICAgIGltcGxlbWVudGF0aW9uID0gX2RvY3VtZW50LmltcGxlbWVudGF0aW9uLFxuICAgICAgICBjcmVhdGVOb2RlSXRlcmF0b3IgPSBfZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yLFxuICAgICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZSA9IF9kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSxcbiAgICAgICAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCA9IF9kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50O1xuICAgIHZhciBpbXBvcnROb2RlID0gb3JpZ2luYWxEb2N1bWVudC5pbXBvcnROb2RlO1xuXG5cbiAgICB2YXIgZG9jdW1lbnRNb2RlID0ge307XG4gICAgdHJ5IHtcbiAgICAgIGRvY3VtZW50TW9kZSA9IGNsb25lKGRvY3VtZW50KS5kb2N1bWVudE1vZGUgPyBkb2N1bWVudC5kb2N1bWVudE1vZGUgOiB7fTtcbiAgICB9IGNhdGNoIChfKSB7fVxuXG4gICAgdmFyIGhvb2tzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBFeHBvc2Ugd2hldGhlciB0aGlzIGJyb3dzZXIgc3VwcG9ydHMgcnVubmluZyB0aGUgZnVsbCBET01QdXJpZnkuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmlzU3VwcG9ydGVkID0gaW1wbGVtZW50YXRpb24gJiYgdHlwZW9mIGltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnRNb2RlICE9PSA5O1xuXG4gICAgdmFyIE1VU1RBQ0hFX0VYUFIkJDEgPSBNVVNUQUNIRV9FWFBSLFxuICAgICAgICBFUkJfRVhQUiQkMSA9IEVSQl9FWFBSLFxuICAgICAgICBEQVRBX0FUVFIkJDEgPSBEQVRBX0FUVFIsXG4gICAgICAgIEFSSUFfQVRUUiQkMSA9IEFSSUFfQVRUUixcbiAgICAgICAgSVNfU0NSSVBUX09SX0RBVEEkJDEgPSBJU19TQ1JJUFRfT1JfREFUQSxcbiAgICAgICAgQVRUUl9XSElURVNQQUNFJCQxID0gQVRUUl9XSElURVNQQUNFO1xuICAgIHZhciBJU19BTExPV0VEX1VSSSQkMSA9IElTX0FMTE9XRURfVVJJO1xuXG4gICAgLyoqXG4gICAgICogV2UgY29uc2lkZXIgdGhlIGVsZW1lbnRzIGFuZCBhdHRyaWJ1dGVzIGJlbG93IHRvIGJlIHNhZmUuIElkZWFsbHlcbiAgICAgKiBkb24ndCBhZGQgYW55IG5ldyBvbmVzIGJ1dCBmZWVsIGZyZWUgdG8gcmVtb3ZlIHVud2FudGVkIG9uZXMuXG4gICAgICovXG5cbiAgICAvKiBhbGxvd2VkIGVsZW1lbnQgbmFtZXMgKi9cblxuICAgIHZhciBBTExPV0VEX1RBR1MgPSBudWxsO1xuICAgIHZhciBERUZBVUxUX0FMTE9XRURfVEFHUyA9IGFkZFRvU2V0KHt9LCBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5JDEoaHRtbCksIF90b0NvbnN1bWFibGVBcnJheSQxKHN2ZyksIF90b0NvbnN1bWFibGVBcnJheSQxKHN2Z0ZpbHRlcnMpLCBfdG9Db25zdW1hYmxlQXJyYXkkMShtYXRoTWwpLCBfdG9Db25zdW1hYmxlQXJyYXkkMSh0ZXh0KSkpO1xuXG4gICAgLyogQWxsb3dlZCBhdHRyaWJ1dGUgbmFtZXMgKi9cbiAgICB2YXIgQUxMT1dFRF9BVFRSID0gbnVsbDtcbiAgICB2YXIgREVGQVVMVF9BTExPV0VEX0FUVFIgPSBhZGRUb1NldCh7fSwgW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSQxKGh0bWwkMSksIF90b0NvbnN1bWFibGVBcnJheSQxKHN2ZyQxKSwgX3RvQ29uc3VtYWJsZUFycmF5JDEobWF0aE1sJDEpLCBfdG9Db25zdW1hYmxlQXJyYXkkMSh4bWwpKSk7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiB0YWdzIChvdmVycmlkZXMgQUxMT1dFRF9UQUdTL0FERF9UQUdTKSAqL1xuICAgIHZhciBGT1JCSURfVEFHUyA9IG51bGw7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiBhdHRyaWJ1dGVzIChvdmVycmlkZXMgQUxMT1dFRF9BVFRSL0FERF9BVFRSKSAqL1xuICAgIHZhciBGT1JCSURfQVRUUiA9IG51bGw7XG5cbiAgICAvKiBEZWNpZGUgaWYgQVJJQSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgdmFyIEFMTE9XX0FSSUFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgY3VzdG9tIGRhdGEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIHZhciBBTExPV19EQVRBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIHVua25vd24gcHJvdG9jb2xzIGFyZSBva2F5ICovXG4gICAgdmFyIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZm9yIGNvbW1vbiB0ZW1wbGF0ZSBlbmdpbmVzLlxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICAgKi9cbiAgICB2YXIgU0FGRV9GT1JfVEVNUExBVEVTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgZG9jdW1lbnQgd2l0aCA8aHRtbD4uLi4gc2hvdWxkIGJlIHJldHVybmVkICovXG4gICAgdmFyIFdIT0xFX0RPQ1VNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBUcmFjayB3aGV0aGVyIGNvbmZpZyBpcyBhbHJlYWR5IHNldCBvbiB0aGlzIGluc3RhbmNlIG9mIERPTVB1cmlmeS4gKi9cbiAgICB2YXIgU0VUX0NPTkZJRyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGFsbCBlbGVtZW50cyAoZS5nLiBzdHlsZSwgc2NyaXB0KSBtdXN0IGJlIGNoaWxkcmVuIG9mXG4gICAgICogZG9jdW1lbnQuYm9keS4gQnkgZGVmYXVsdCwgYnJvd3NlcnMgbWlnaHQgbW92ZSB0aGVtIHRvIGRvY3VtZW50LmhlYWQgKi9cbiAgICB2YXIgRk9SQ0VfQk9EWSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXG4gICAgICogSWYgYFdIT0xFX0RPQ1VNRU5UYCBpcyBlbmFibGVkIGEgYEhUTUxIdG1sRWxlbWVudGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkXG4gICAgICovXG4gICAgdmFyIFJFVFVSTl9ET00gPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgRG9jdW1lbnRGcmFnbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cbiAgICB2YXIgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogSWYgYFJFVFVSTl9ET01gIG9yIGBSRVRVUk5fRE9NX0ZSQUdNRU5UYCBpcyBlbmFibGVkLCBkZWNpZGUgaWYgdGhlIHJldHVybmVkIERPTVxuICAgICAqIGBOb2RlYCBpcyBpbXBvcnRlZCBpbnRvIHRoZSBjdXJyZW50IGBEb2N1bWVudGAuIElmIHRoaXMgZmxhZyBpcyBub3QgZW5hYmxlZCB0aGVcbiAgICAgKiBgTm9kZWAgd2lsbCBiZWxvbmcgKGl0cyBvd25lckRvY3VtZW50KSB0byBhIGZyZXNoIGBIVE1MRG9jdW1lbnRgLCBjcmVhdGVkIGJ5XG4gICAgICogRE9NUHVyaWZ5LiAqL1xuICAgIHZhciBSRVRVUk5fRE9NX0lNUE9SVCA9IGZhbHNlO1xuXG4gICAgLyogVHJ5IHRvIHJldHVybiBhIFRydXN0ZWQgVHlwZSBvYmplY3QgaW5zdGVhZCBvZiBhIHN0cmluZywgcmV0dXJuIGEgc3RyaW5nIGluXG4gICAgICogY2FzZSBUcnVzdGVkIFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkICAqL1xuICAgIHZhciBSRVRVUk5fVFJVU1RFRF9UWVBFID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIGZyZWUgZnJvbSBET00gY2xvYmJlcmluZyBhdHRhY2tzPyAqL1xuICAgIHZhciBTQU5JVElaRV9ET00gPSB0cnVlO1xuXG4gICAgLyogS2VlcCBlbGVtZW50IGNvbnRlbnQgd2hlbiByZW1vdmluZyBlbGVtZW50PyAqL1xuICAgIHZhciBLRUVQX0NPTlRFTlQgPSB0cnVlO1xuXG4gICAgLyogSWYgYSBgTm9kZWAgaXMgcGFzc2VkIHRvIHNhbml0aXplKCksIHRoZW4gcGVyZm9ybXMgc2FuaXRpemF0aW9uIGluLXBsYWNlIGluc3RlYWRcbiAgICAgKiBvZiBpbXBvcnRpbmcgaXQgaW50byBhIG5ldyBEb2N1bWVudCBhbmQgcmV0dXJuaW5nIGEgc2FuaXRpemVkIGNvcHkgKi9cbiAgICB2YXIgSU5fUExBQ0UgPSBmYWxzZTtcblxuICAgIC8qIEFsbG93IHVzYWdlIG9mIHByb2ZpbGVzIGxpa2UgaHRtbCwgc3ZnIGFuZCBtYXRoTWwgKi9cbiAgICB2YXIgVVNFX1BST0ZJTEVTID0ge307XG5cbiAgICAvKiBUYWdzIHRvIGlnbm9yZSBjb250ZW50IG9mIHdoZW4gS0VFUF9DT05URU5UIGlzIHRydWUgKi9cbiAgICB2YXIgRk9SQklEX0NPTlRFTlRTID0gYWRkVG9TZXQoe30sIFsnYW5ub3RhdGlvbi14bWwnLCAnYXVkaW8nLCAnY29sZ3JvdXAnLCAnZGVzYycsICdmb3JlaWdub2JqZWN0JywgJ2hlYWQnLCAnaWZyYW1lJywgJ21hdGgnLCAnbWknLCAnbW4nLCAnbW8nLCAnbXMnLCAnbXRleHQnLCAnbm9lbWJlZCcsICdub2ZyYW1lcycsICdwbGFpbnRleHQnLCAnc2NyaXB0JywgJ3N0eWxlJywgJ3N2ZycsICd0ZW1wbGF0ZScsICd0aGVhZCcsICd0aXRsZScsICd2aWRlbycsICd4bXAnXSk7XG5cbiAgICAvKiBUYWdzIHRoYXQgYXJlIHNhZmUgZm9yIGRhdGE6IFVSSXMgKi9cbiAgICB2YXIgREFUQV9VUklfVEFHUyA9IG51bGw7XG4gICAgdmFyIERFRkFVTFRfREFUQV9VUklfVEFHUyA9IGFkZFRvU2V0KHt9LCBbJ2F1ZGlvJywgJ3ZpZGVvJywgJ2ltZycsICdzb3VyY2UnLCAnaW1hZ2UnLCAndHJhY2snXSk7XG5cbiAgICAvKiBBdHRyaWJ1dGVzIHNhZmUgZm9yIHZhbHVlcyBsaWtlIFwiamF2YXNjcmlwdDpcIiAqL1xuICAgIHZhciBVUklfU0FGRV9BVFRSSUJVVEVTID0gbnVsbDtcbiAgICB2YXIgREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTID0gYWRkVG9TZXQoe30sIFsnYWx0JywgJ2NsYXNzJywgJ2ZvcicsICdpZCcsICdsYWJlbCcsICduYW1lJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAnc3VtbWFyeScsICd0aXRsZScsICd2YWx1ZScsICdzdHlsZScsICd4bWxucyddKTtcblxuICAgIC8qIEtlZXAgYSByZWZlcmVuY2UgdG8gY29uZmlnIHRvIHBhc3MgdG8gaG9va3MgKi9cbiAgICB2YXIgQ09ORklHID0gbnVsbDtcblxuICAgIC8qIElkZWFsbHksIGRvIG5vdCB0b3VjaCBhbnl0aGluZyBiZWxvdyB0aGlzIGxpbmUgKi9cbiAgICAvKiBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fICovXG5cbiAgICB2YXIgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cbiAgICAvKipcbiAgICAgKiBfcGFyc2VDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY2ZnIG9wdGlvbmFsIGNvbmZpZyBsaXRlcmFsXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICB2YXIgX3BhcnNlQ29uZmlnID0gZnVuY3Rpb24gX3BhcnNlQ29uZmlnKGNmZykge1xuICAgICAgaWYgKENPTkZJRyAmJiBDT05GSUcgPT09IGNmZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8qIFNoaWVsZCBjb25maWd1cmF0aW9uIG9iamVjdCBmcm9tIHRhbXBlcmluZyAqL1xuICAgICAgaWYgKCFjZmcgfHwgKHR5cGVvZiBjZmcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGNmZykpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjZmcgPSB7fTtcbiAgICAgIH1cblxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gcHJvdG90eXBlIHBvbGx1dGlvbiAqL1xuICAgICAgY2ZnID0gY2xvbmUoY2ZnKTtcblxuICAgICAgLyogU2V0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgICAgQUxMT1dFRF9UQUdTID0gJ0FMTE9XRURfVEFHUycgaW4gY2ZnID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX1RBR1MpIDogREVGQVVMVF9BTExPV0VEX1RBR1M7XG4gICAgICBBTExPV0VEX0FUVFIgPSAnQUxMT1dFRF9BVFRSJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUikgOiBERUZBVUxUX0FMTE9XRURfQVRUUjtcbiAgICAgIFVSSV9TQUZFX0FUVFJJQlVURVMgPSAnQUREX1VSSV9TQUZFX0FUVFInIGluIGNmZyA/IGFkZFRvU2V0KGNsb25lKERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyksIGNmZy5BRERfVVJJX1NBRkVfQVRUUikgOiBERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVM7XG4gICAgICBEQVRBX1VSSV9UQUdTID0gJ0FERF9EQVRBX1VSSV9UQUdTJyBpbiBjZmcgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX0RBVEFfVVJJX1RBR1MpLCBjZmcuQUREX0RBVEFfVVJJX1RBR1MpIDogREVGQVVMVF9EQVRBX1VSSV9UQUdTO1xuICAgICAgRk9SQklEX1RBR1MgPSAnRk9SQklEX1RBR1MnIGluIGNmZyA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX1RBR1MpIDoge307XG4gICAgICBGT1JCSURfQVRUUiA9ICdGT1JCSURfQVRUUicgaW4gY2ZnID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQVRUUikgOiB7fTtcbiAgICAgIFVTRV9QUk9GSUxFUyA9ICdVU0VfUFJPRklMRVMnIGluIGNmZyA/IGNmZy5VU0VfUFJPRklMRVMgOiBmYWxzZTtcbiAgICAgIEFMTE9XX0FSSUFfQVRUUiA9IGNmZy5BTExPV19BUklBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGNmZy5BTExPV19EQVRBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gY2ZnLkFMTE9XX1VOS05PV05fUFJPVE9DT0xTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBTQUZFX0ZPUl9URU1QTEFURVMgPSBjZmcuU0FGRV9GT1JfVEVNUExBVEVTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBXSE9MRV9ET0NVTUVOVCA9IGNmZy5XSE9MRV9ET0NVTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTSA9IGNmZy5SRVRVUk5fRE9NIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gY2ZnLlJFVFVSTl9ET01fRlJBR01FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9ET01fSU1QT1JUID0gY2ZnLlJFVFVSTl9ET01fSU1QT1JUIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fVFJVU1RFRF9UWVBFID0gY2ZnLlJFVFVSTl9UUlVTVEVEX1RZUEUgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEZPUkNFX0JPRFkgPSBjZmcuRk9SQ0VfQk9EWSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgU0FOSVRJWkVfRE9NID0gY2ZnLlNBTklUSVpFX0RPTSAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgS0VFUF9DT05URU5UID0gY2ZnLktFRVBfQ09OVEVOVCAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgSU5fUExBQ0UgPSBjZmcuSU5fUExBQ0UgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIElTX0FMTE9XRURfVVJJJCQxID0gY2ZnLkFMTE9XRURfVVJJX1JFR0VYUCB8fCBJU19BTExPV0VEX1VSSSQkMTtcbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgQUxMT1dfREFUQV9BVFRSID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgIFJFVFVSTl9ET00gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBQYXJzZSBwcm9maWxlIGluZm8gKi9cbiAgICAgIGlmIChVU0VfUFJPRklMRVMpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkkMSh0ZXh0KSkpO1xuICAgICAgICBBTExPV0VEX0FUVFIgPSBbXTtcbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5odG1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBodG1sKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGh0bWwkMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2ZyQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2Z0ZpbHRlcnMgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIHN2Z0ZpbHRlcnMpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMubWF0aE1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBtYXRoTWwpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgbWF0aE1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBNZXJnZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIGlmIChjZmcuQUREX1RBR1MpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfVEFHUyA9PT0gREVGQVVMVF9BTExPV0VEX1RBR1MpIHtcbiAgICAgICAgICBBTExPV0VEX1RBR1MgPSBjbG9uZShBTExPV0VEX1RBR1MpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBjZmcuQUREX1RBR1MpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ZnLkFERF9BVFRSKSB7XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIgPT09IERFRkFVTFRfQUxMT1dFRF9BVFRSKSB7XG4gICAgICAgICAgQUxMT1dFRF9BVFRSID0gY2xvbmUoQUxMT1dFRF9BVFRSKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgY2ZnLkFERF9BVFRSKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNmZy5BRERfVVJJX1NBRkVfQVRUUikge1xuICAgICAgICBhZGRUb1NldChVUklfU0FGRV9BVFRSSUJVVEVTLCBjZmcuQUREX1VSSV9TQUZFX0FUVFIpO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgI3RleHQgaW4gY2FzZSBLRUVQX0NPTlRFTlQgaXMgc2V0IHRvIHRydWUgKi9cbiAgICAgIGlmIChLRUVQX0NPTlRFTlQpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTWycjdGV4dCddID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkIGh0bWwsIGhlYWQgYW5kIGJvZHkgdG8gQUxMT1dFRF9UQUdTIGluIGNhc2UgV0hPTEVfRE9DVU1FTlQgaXMgdHJ1ZSAqL1xuICAgICAgaWYgKFdIT0xFX0RPQ1VNRU5UKSB7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgWydodG1sJywgJ2hlYWQnLCAnYm9keSddKTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkIHRib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIHRhYmxlcyBhcmUgcGVybWl0dGVkLCBzZWUgIzI4NiwgIzM2NSAqL1xuICAgICAgaWYgKEFMTE9XRURfVEFHUy50YWJsZSkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsndGJvZHknXSk7XG4gICAgICAgIGRlbGV0ZSBGT1JCSURfVEFHUy50Ym9keTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudCBmdXJ0aGVyIG1hbmlwdWxhdGlvbiBvZiBjb25maWd1cmF0aW9uLlxuICAgICAgLy8gTm90IGF2YWlsYWJsZSBpbiBJRTgsIFNhZmFyaSA1LCBldGMuXG4gICAgICBpZiAoZnJlZXplKSB7XG4gICAgICAgIGZyZWV6ZShjZmcpO1xuICAgICAgfVxuXG4gICAgICBDT05GSUcgPSBjZmc7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9mb3JjZVJlbW92ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBhIERPTSBub2RlXG4gICAgICovXG4gICAgdmFyIF9mb3JjZVJlbW92ZSA9IGZ1bmN0aW9uIF9mb3JjZVJlbW92ZShub2RlKSB7XG4gICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHsgZWxlbWVudDogbm9kZSB9KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgbm9kZS5vdXRlckhUTUwgPSBlbXB0eUhUTUw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9yZW1vdmVBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBhbiBBdHRyaWJ1dGUgbmFtZVxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuICAgIHZhciBfcmVtb3ZlQXR0cmlidXRlID0gZnVuY3Rpb24gX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBub2RlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG5vZGUuZ2V0QXR0cmlidXRlTm9kZShuYW1lKSxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG51bGwsXG4gICAgICAgICAgZnJvbTogbm9kZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pbml0RG9jdW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZGlydHkgYSBzdHJpbmcgb2YgZGlydHkgbWFya3VwXG4gICAgICogQHJldHVybiB7RG9jdW1lbnR9IGEgRE9NLCBmaWxsZWQgd2l0aCB0aGUgZGlydHkgbWFya3VwXG4gICAgICovXG4gICAgdmFyIF9pbml0RG9jdW1lbnQgPSBmdW5jdGlvbiBfaW5pdERvY3VtZW50KGRpcnR5KSB7XG4gICAgICAvKiBDcmVhdGUgYSBIVE1MIGRvY3VtZW50ICovXG4gICAgICB2YXIgZG9jID0gdm9pZCAwO1xuICAgICAgdmFyIGxlYWRpbmdXaGl0ZXNwYWNlID0gdm9pZCAwO1xuXG4gICAgICBpZiAoRk9SQ0VfQk9EWSkge1xuICAgICAgICBkaXJ0eSA9ICc8cmVtb3ZlPjwvcmVtb3ZlPicgKyBkaXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIElmIEZPUkNFX0JPRFkgaXNuJ3QgdXNlZCwgbGVhZGluZyB3aGl0ZXNwYWNlIG5lZWRzIHRvIGJlIHByZXNlcnZlZCBtYW51YWxseSAqL1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IHN0cmluZ01hdGNoKGRpcnR5LCAvXltcXHJcXG5cXHQgXSsvKTtcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2UgPSBtYXRjaGVzICYmIG1hdGNoZXNbMF07XG4gICAgICB9XG5cbiAgICAgIHZhciBkaXJ0eVBheWxvYWQgPSB0cnVzdGVkVHlwZXNQb2xpY3kgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgIC8qIFVzZSB0aGUgRE9NUGFyc2VyIEFQSSBieSBkZWZhdWx0LCBmYWxsYmFjayBsYXRlciBpZiBuZWVkcyBiZSAqL1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkaXJ0eVBheWxvYWQsICd0ZXh0L2h0bWwnKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHt9XG5cbiAgICAgIC8qIFVzZSBjcmVhdGVIVE1MRG9jdW1lbnQgaW4gY2FzZSBET01QYXJzZXIgaXMgbm90IGF2YWlsYWJsZSAqL1xuICAgICAgaWYgKCFkb2MgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgZG9jID0gaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCcnKTtcbiAgICAgICAgdmFyIF9kb2MgPSBkb2MsXG4gICAgICAgICAgICBib2R5ID0gX2RvYy5ib2R5O1xuXG4gICAgICAgIGJvZHkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChib2R5LnBhcmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpO1xuICAgICAgICBib2R5Lm91dGVySFRNTCA9IGRpcnR5UGF5bG9hZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRpcnR5ICYmIGxlYWRpbmdXaGl0ZXNwYWNlKSB7XG4gICAgICAgIGRvYy5ib2R5Lmluc2VydEJlZm9yZShkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsZWFkaW5nV2hpdGVzcGFjZSksIGRvYy5ib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIC8qIFdvcmsgb24gd2hvbGUgZG9jdW1lbnQgb3IganVzdCBpdHMgYm9keSAqL1xuICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlUYWdOYW1lLmNhbGwoZG9jLCBXSE9MRV9ET0NVTUVOVCA/ICdodG1sJyA6ICdib2R5JylbMF07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9jcmVhdGVJdGVyYXRvclxuICAgICAqXG4gICAgICogQHBhcmFtICB7RG9jdW1lbnR9IHJvb3QgZG9jdW1lbnQvZnJhZ21lbnQgdG8gY3JlYXRlIGl0ZXJhdG9yIGZvclxuICAgICAqIEByZXR1cm4ge0l0ZXJhdG9yfSBpdGVyYXRvciBpbnN0YW5jZVxuICAgICAqL1xuICAgIHZhciBfY3JlYXRlSXRlcmF0b3IgPSBmdW5jdGlvbiBfY3JlYXRlSXRlcmF0b3Iocm9vdCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU5vZGVJdGVyYXRvci5jYWxsKHJvb3Qub3duZXJEb2N1bWVudCB8fCByb290LCByb290LCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVDtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzQ2xvYmJlcmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBlbG0gZWxlbWVudCB0byBjaGVjayBmb3IgY2xvYmJlcmluZyBhdHRhY2tzXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBjbG9iYmVyZWQsIGZhbHNlIGlmIHNhZmVcbiAgICAgKi9cbiAgICB2YXIgX2lzQ2xvYmJlcmVkID0gZnVuY3Rpb24gX2lzQ2xvYmJlcmVkKGVsbSkge1xuICAgICAgaWYgKGVsbSBpbnN0YW5jZW9mIFRleHQgfHwgZWxtIGluc3RhbmNlb2YgQ29tbWVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZWxtLm5vZGVOYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnJlbW92ZUNoaWxkICE9PSAnZnVuY3Rpb24nIHx8ICEoZWxtLmF0dHJpYnV0ZXMgaW5zdGFuY2VvZiBOYW1lZE5vZGVNYXApIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uc2V0QXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0ubmFtZXNwYWNlVVJJICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNOb2RlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBvYmogb2JqZWN0IHRvIGNoZWNrIHdoZXRoZXIgaXQncyBhIERPTSBub2RlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpcyBvYmplY3QgaXMgYSBET00gbm9kZVxuICAgICAqL1xuICAgIHZhciBfaXNOb2RlID0gZnVuY3Rpb24gX2lzTm9kZShvYmplY3QpIHtcbiAgICAgIHJldHVybiAodHlwZW9mIE5vZGUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKE5vZGUpKSA9PT0gJ29iamVjdCcgPyBvYmplY3QgaW5zdGFuY2VvZiBOb2RlIDogb2JqZWN0ICYmICh0eXBlb2Ygb2JqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmplY3QpKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iamVjdC5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG9iamVjdC5ub2RlTmFtZSA9PT0gJ3N0cmluZyc7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9leGVjdXRlSG9va1xuICAgICAqIEV4ZWN1dGUgdXNlciBjb25maWd1cmFibGUgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCAgTmFtZSBvZiB0aGUgaG9vaydzIGVudHJ5IHBvaW50XG4gICAgICogQHBhcmFtICB7Tm9kZX0gY3VycmVudE5vZGUgbm9kZSB0byB3b3JrIG9uIHdpdGggdGhlIGhvb2tcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgYWRkaXRpb25hbCBob29rIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICB2YXIgX2V4ZWN1dGVIb29rID0gZnVuY3Rpb24gX2V4ZWN1dGVIb29rKGVudHJ5UG9pbnQsIGN1cnJlbnROb2RlLCBkYXRhKSB7XG4gICAgICBpZiAoIWhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXJyYXlGb3JFYWNoKGhvb2tzW2VudHJ5UG9pbnRdLCBmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVFbGVtZW50c1xuICAgICAqXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCB0ZXh0Q29udGVudFxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUNoaWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gY2hlY2sgZm9yIHBlcm1pc3Npb24gdG8gZXhpc3RcbiAgICAgKiBAcmV0dXJuICB7Qm9vbGVhbn0gdHJ1ZSBpZiBub2RlIHdhcyBraWxsZWQsIGZhbHNlIGlmIGxlZnQgYWxpdmVcbiAgICAgKi9cbiAgICB2YXIgX3Nhbml0aXplRWxlbWVudHMgPSBmdW5jdGlvbiBfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSB2b2lkIDA7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cbiAgICAgIGlmIChfaXNDbG9iYmVyZWQoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayBpZiB0YWduYW1lIGNvbnRhaW5zIFVuaWNvZGUgKi9cbiAgICAgIGlmIChzdHJpbmdNYXRjaChjdXJyZW50Tm9kZS5ub2RlTmFtZSwgL1tcXHUwMDgwLVxcdUZGRkZdLykpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE5vdyBsZXQncyBjaGVjayB0aGUgZWxlbWVudCdzIHR5cGUgYW5kIG5hbWUgKi9cbiAgICAgIHZhciB0YWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBjdXJyZW50Tm9kZSwge1xuICAgICAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgICAgICBhbGxvd2VkVGFnczogQUxMT1dFRF9UQUdTXG4gICAgICB9KTtcblxuICAgICAgLyogVGFrZSBjYXJlIG9mIGFuIG1YU1MgcGF0dGVybiB1c2luZyBwLCBiciBpbnNpZGUgc3ZnLCBtYXRoICovXG4gICAgICBpZiAoKHRhZ05hbWUgPT09ICdzdmcnIHx8IHRhZ05hbWUgPT09ICdtYXRoJykgJiYgY3VycmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgncCwgYnInKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIERldGVjdCBtWFNTIGF0dGVtcHRzIGFidXNpbmcgbmFtZXNwYWNlIGNvbmZ1c2lvbiAqL1xuICAgICAgaWYgKCFfaXNOb2RlKGN1cnJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSAmJiAoIV9pc05vZGUoY3VycmVudE5vZGUuY29udGVudCkgfHwgIV9pc05vZGUoY3VycmVudE5vZGUuY29udGVudC5maXJzdEVsZW1lbnRDaGlsZCkpICYmIHJlZ0V4cFRlc3QoLzxbIS9cXHddL2csIGN1cnJlbnROb2RlLmlubmVySFRNTCkgJiYgcmVnRXhwVGVzdCgvPFshL1xcd10vZywgY3VycmVudE5vZGUudGV4dENvbnRlbnQpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBSZW1vdmUgZWxlbWVudCBpZiBhbnl0aGluZyBmb3JiaWRzIGl0cyBwcmVzZW5jZSAqL1xuICAgICAgaWYgKCFBTExPV0VEX1RBR1NbdGFnTmFtZV0gfHwgRk9SQklEX1RBR1NbdGFnTmFtZV0pIHtcbiAgICAgICAgLyogS2VlcCBjb250ZW50IGV4Y2VwdCBmb3IgYmFkLWxpc3RlZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoS0VFUF9DT05URU5UICYmICFGT1JCSURfQ09OVEVOVFNbdGFnTmFtZV0gJiYgdHlwZW9mIGN1cnJlbnROb2RlLmluc2VydEFkamFjZW50SFRNTCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgaHRtbFRvSW5zZXJ0ID0gY3VycmVudE5vZGUuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY3VycmVudE5vZGUuaW5zZXJ0QWRqYWNlbnRIVE1MKCdBZnRlckVuZCcsIHRydXN0ZWRUeXBlc1BvbGljeSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGh0bWxUb0luc2VydCkgOiBodG1sVG9JbnNlcnQpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIH1cblxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogUmVtb3ZlIGluIGNhc2UgYSBub3NjcmlwdC9ub2VtYmVkIFhTUyBpcyBzdXNwZWN0ZWQgKi9cbiAgICAgIGlmICgodGFnTmFtZSA9PT0gJ25vc2NyaXB0JyB8fCB0YWdOYW1lID09PSAnbm9lbWJlZCcpICYmIHJlZ0V4cFRlc3QoLzxcXC9ubyhzY3JpcHR8ZW1iZWQpL2ksIGN1cnJlbnROb2RlLmlubmVySFRNTCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFNhbml0aXplIGVsZW1lbnQgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTICYmIGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIC8qIEdldCB0aGUgZWxlbWVudCdzIHRleHQgY29udGVudCAqL1xuICAgICAgICBjb250ZW50ID0gY3VycmVudE5vZGUudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnRlbnQgPSBzdHJpbmdSZXBsYWNlKGNvbnRlbnQsIE1VU1RBQ0hFX0VYUFIkJDEsICcgJyk7XG4gICAgICAgIGNvbnRlbnQgPSBzdHJpbmdSZXBsYWNlKGNvbnRlbnQsIEVSQl9FWFBSJCQxLCAnICcpO1xuICAgICAgICBpZiAoY3VycmVudE5vZGUudGV4dENvbnRlbnQgIT09IGNvbnRlbnQpIHtcbiAgICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHsgZWxlbWVudDogY3VycmVudE5vZGUuY2xvbmVOb2RlKCkgfSk7XG4gICAgICAgICAgY3VycmVudE5vZGUudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZUVsZW1lbnRzJywgY3VycmVudE5vZGUsIG51bGwpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc1ZhbGlkQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjVGFnIExvd2VyY2FzZSB0YWcgbmFtZSBvZiBjb250YWluaW5nIGVsZW1lbnQuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBsY05hbWUgTG93ZXJjYXNlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIHZhbGlkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICB2YXIgX2lzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkge1xuICAgICAgLyogTWFrZSBzdXJlIGF0dHJpYnV0ZSBjYW5ub3QgY2xvYmJlciAqL1xuICAgICAgaWYgKFNBTklUSVpFX0RPTSAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSAmJiAodmFsdWUgaW4gZG9jdW1lbnQgfHwgdmFsdWUgaW4gZm9ybUVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLyogQWxsb3cgdmFsaWQgZGF0YS0qIGF0dHJpYnV0ZXM6IEF0IGxlYXN0IG9uZSBjaGFyYWN0ZXIgYWZ0ZXIgXCItXCJcbiAgICAgICAgICAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZG9tLmh0bWwjZW1iZWRkaW5nLWN1c3RvbS1ub24tdmlzaWJsZS1kYXRhLXdpdGgtdGhlLWRhdGEtKi1hdHRyaWJ1dGVzKVxuICAgICAgICAgIFhNTC1jb21wYXRpYmxlIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI3htbC1jb21wYXRpYmxlIGFuZCBodHRwOi8vd3d3LnczLm9yZy9UUi94bWwvI2QwZTgwNClcbiAgICAgICAgICBXZSBkb24ndCBuZWVkIHRvIGNoZWNrIHRoZSB2YWx1ZTsgaXQncyBhbHdheXMgVVJJIHNhZmUuICovXG4gICAgICBpZiAoQUxMT1dfREFUQV9BVFRSICYmIHJlZ0V4cFRlc3QoREFUQV9BVFRSJCQxLCBsY05hbWUpKSA7IGVsc2UgaWYgKEFMTE9XX0FSSUFfQVRUUiAmJiByZWdFeHBUZXN0KEFSSUFfQVRUUiQkMSwgbGNOYW1lKSkgOyBlbHNlIGlmICghQUxMT1dFRF9BVFRSW2xjTmFtZV0gfHwgRk9SQklEX0FUVFJbbGNOYW1lXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLyogQ2hlY2sgdmFsdWUgaXMgc2FmZS4gRmlyc3QsIGlzIGF0dHIgaW5lcnQ/IElmIHNvLCBpcyBzYWZlICovXG4gICAgICB9IGVsc2UgaWYgKFVSSV9TQUZFX0FUVFJJQlVURVNbbGNOYW1lXSkgOyBlbHNlIGlmIChyZWdFeHBUZXN0KElTX0FMTE9XRURfVVJJJCQxLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UkJDEsICcnKSkpIDsgZWxzZSBpZiAoKGxjTmFtZSA9PT0gJ3NyYycgfHwgbGNOYW1lID09PSAneGxpbms6aHJlZicgfHwgbGNOYW1lID09PSAnaHJlZicpICYmIGxjVGFnICE9PSAnc2NyaXB0JyAmJiBzdHJpbmdJbmRleE9mKHZhbHVlLCAnZGF0YTonKSA9PT0gMCAmJiBEQVRBX1VSSV9UQUdTW2xjVGFnXSkgOyBlbHNlIGlmIChBTExPV19VTktOT1dOX1BST1RPQ09MUyAmJiAhcmVnRXhwVGVzdChJU19TQ1JJUFRfT1JfREFUQSQkMSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFJCQxLCAnJykpKSA7IGVsc2UgaWYgKCF2YWx1ZSkgOyBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplQXR0cmlidXRlc1xuICAgICAqXG4gICAgICogQHByb3RlY3QgYXR0cmlidXRlc1xuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgcmVtb3ZlQXR0cmlidXRlXG4gICAgICogQHByb3RlY3Qgc2V0QXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxuICAgICAqL1xuICAgIHZhciBfc2FuaXRpemVBdHRyaWJ1dGVzID0gZnVuY3Rpb24gX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSkge1xuICAgICAgdmFyIGF0dHIgPSB2b2lkIDA7XG4gICAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gICAgICB2YXIgbGNOYW1lID0gdm9pZCAwO1xuICAgICAgdmFyIGwgPSB2b2lkIDA7XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBjdXJyZW50Tm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGF0dHJpYnV0ZXM7IGlmIG5vdCB3ZSBtaWdodCBoYXZlIGEgdGV4dCBub2RlICovXG5cbiAgICAgIGlmICghYXR0cmlidXRlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBob29rRXZlbnQgPSB7XG4gICAgICAgIGF0dHJOYW1lOiAnJyxcbiAgICAgICAgYXR0clZhbHVlOiAnJyxcbiAgICAgICAga2VlcEF0dHI6IHRydWUsXG4gICAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzOiBBTExPV0VEX0FUVFJcbiAgICAgIH07XG4gICAgICBsID0gYXR0cmlidXRlcy5sZW5ndGg7XG5cbiAgICAgIC8qIEdvIGJhY2t3YXJkcyBvdmVyIGFsbCBhdHRyaWJ1dGVzOyBzYWZlbHkgcmVtb3ZlIGJhZCBvbmVzICovXG4gICAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgIGF0dHIgPSBhdHRyaWJ1dGVzW2xdO1xuICAgICAgICB2YXIgX2F0dHIgPSBhdHRyLFxuICAgICAgICAgICAgbmFtZSA9IF9hdHRyLm5hbWUsXG4gICAgICAgICAgICBuYW1lc3BhY2VVUkkgPSBfYXR0ci5uYW1lc3BhY2VVUkk7XG5cbiAgICAgICAgdmFsdWUgPSBzdHJpbmdUcmltKGF0dHIudmFsdWUpO1xuICAgICAgICBsY05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShuYW1lKTtcblxuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIGhvb2tFdmVudC5hdHRyTmFtZSA9IGxjTmFtZTtcbiAgICAgICAgaG9va0V2ZW50LmF0dHJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBob29rRXZlbnQua2VlcEF0dHIgPSB0cnVlO1xuICAgICAgICBob29rRXZlbnQuZm9yY2VLZWVwQXR0ciA9IHVuZGVmaW5lZDsgLy8gQWxsb3dzIGRldmVsb3BlcnMgdG8gc2VlIHRoaXMgaXMgYSBwcm9wZXJ0eSB0aGV5IGNhbiBzZXRcbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVBdHRyaWJ1dGUnLCBjdXJyZW50Tm9kZSwgaG9va0V2ZW50KTtcbiAgICAgICAgdmFsdWUgPSBob29rRXZlbnQuYXR0clZhbHVlO1xuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmUgYXR0cmlidXRlICovXG4gICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoIWhvb2tFdmVudC5rZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogV29yayBhcm91bmQgYSBzZWN1cml0eSBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgICAgIGlmIChyZWdFeHBUZXN0KC9cXC8+L2ksIHZhbHVlKSkge1xuICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2FuaXRpemUgYXR0cmlidXRlIGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBNVVNUQUNIRV9FWFBSJCQxLCAnICcpO1xuICAgICAgICAgIHZhbHVlID0gc3RyaW5nUmVwbGFjZSh2YWx1ZSwgRVJCX0VYUFIkJDEsICcgJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBJcyBgdmFsdWVgIHZhbGlkIGZvciB0aGlzIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgdmFyIGxjVGFnID0gY3VycmVudE5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCFfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEhhbmRsZSBpbnZhbGlkIGRhdGEtKiBhdHRyaWJ1dGUgc2V0IGJ5IHRyeS1jYXRjaGluZyBpdCAqL1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChuYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKiBGYWxsYmFjayB0byBzZXRBdHRyaWJ1dGUoKSBmb3IgYnJvd3Nlci11bnJlY29nbml6ZWQgbmFtZXNwYWNlcyBlLmcuIFwieC1zY2hlbWFcIi4gKi9cbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXJyYXlQb3AoRE9NUHVyaWZ5LnJlbW92ZWQpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVTaGFkb3dET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdtZW50IHRvIGl0ZXJhdGUgb3ZlciByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIHZhciBfc2FuaXRpemVTaGFkb3dET00gPSBmdW5jdGlvbiBfc2FuaXRpemVTaGFkb3dET00oZnJhZ21lbnQpIHtcbiAgICAgIHZhciBzaGFkb3dOb2RlID0gdm9pZCAwO1xuICAgICAgdmFyIHNoYWRvd0l0ZXJhdG9yID0gX2NyZWF0ZUl0ZXJhdG9yKGZyYWdtZW50KTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcblxuICAgICAgd2hpbGUgKHNoYWRvd05vZGUgPSBzaGFkb3dJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVTaGFkb3dOb2RlJywgc2hhZG93Tm9kZSwgbnVsbCk7XG5cbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKHNoYWRvd05vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBEZWVwIHNoYWRvdyBET00gZGV0ZWN0ZWQgKi9cbiAgICAgICAgaWYgKHNoYWRvd05vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oc2hhZG93Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKHNoYWRvd05vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNhbml0aXplXG4gICAgICogUHVibGljIG1ldGhvZCBwcm92aWRpbmcgY29yZSBzYW5pdGF0aW9uIGZ1bmN0aW9uYWxpdHlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE5vZGV9IGRpcnR5IHN0cmluZyBvciBET00gbm9kZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgRE9NUHVyaWZ5LnNhbml0aXplID0gZnVuY3Rpb24gKGRpcnR5LCBjZmcpIHtcbiAgICAgIHZhciBib2R5ID0gdm9pZCAwO1xuICAgICAgdmFyIGltcG9ydGVkTm9kZSA9IHZvaWQgMDtcbiAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHZvaWQgMDtcbiAgICAgIHZhciBvbGROb2RlID0gdm9pZCAwO1xuICAgICAgdmFyIHJldHVybk5vZGUgPSB2b2lkIDA7XG4gICAgICAvKiBNYWtlIHN1cmUgd2UgaGF2ZSBhIHN0cmluZyB0byBzYW5pdGl6ZS5cbiAgICAgICAgRE8gTk9UIHJldHVybiBlYXJseSwgYXMgdGhpcyB3aWxsIHJldHVybiB0aGUgd3JvbmcgdHlwZSBpZlxuICAgICAgICB0aGUgdXNlciBoYXMgcmVxdWVzdGVkIGEgRE9NIG9iamVjdCByYXRoZXIgdGhhbiBhIHN0cmluZyAqL1xuICAgICAgaWYgKCFkaXJ0eSkge1xuICAgICAgICBkaXJ0eSA9ICc8IS0tPic7XG4gICAgICB9XG5cbiAgICAgIC8qIFN0cmluZ2lmeSwgaW4gY2FzZSBkaXJ0eSBpcyBhbiBvYmplY3QgKi9cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnICYmICFfaXNOb2RlKGRpcnR5KSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVnYXRlZC1jb25kaXRpb25cbiAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgndG9TdHJpbmcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXJ0eSA9IGRpcnR5LnRvU3RyaW5nKCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnZGlydHkgaXMgbm90IGEgc3RyaW5nLCBhYm9ydGluZycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayB3ZSBjYW4gcnVuLiBPdGhlcndpc2UgZmFsbCBiYWNrIG9yIGlnbm9yZSAqL1xuICAgICAgaWYgKCFET01QdXJpZnkuaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgaWYgKF90eXBlb2Yod2luZG93LnRvU3RhdGljSFRNTCkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB3aW5kb3cudG9TdGF0aWNIVE1MID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cudG9TdGF0aWNIVE1MKGRpcnR5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2lzTm9kZShkaXJ0eSkpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cudG9TdGF0aWNIVE1MKGRpcnR5Lm91dGVySFRNTCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpcnR5O1xuICAgICAgfVxuXG4gICAgICAvKiBBc3NpZ24gY29uZmlnIHZhcnMgKi9cbiAgICAgIGlmICghU0VUX0NPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIH1cblxuICAgICAgLyogQ2xlYW4gdXAgcmVtb3ZlZCBlbGVtZW50cyAqL1xuICAgICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcblxuICAgICAgLyogQ2hlY2sgaWYgZGlydHkgaXMgY29ycmVjdGx5IHR5cGVkIGZvciBJTl9QTEFDRSAqL1xuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgSU5fUExBQ0UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKElOX1BMQUNFKSA7IGVsc2UgaWYgKGRpcnR5IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAvKiBJZiBkaXJ0eSBpcyBhIERPTSBlbGVtZW50LCBhcHBlbmQgdG8gYW4gZW1wdHkgZG9jdW1lbnQgdG8gYXZvaWRcbiAgICAgICAgICAgZWxlbWVudHMgYmVpbmcgc3RyaXBwZWQgYnkgdGhlIHBhcnNlciAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudCgnPCEtLS0tPicpO1xuICAgICAgICBpbXBvcnRlZE5vZGUgPSBib2R5Lm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShkaXJ0eSwgdHJ1ZSk7XG4gICAgICAgIGlmIChpbXBvcnRlZE5vZGUubm9kZVR5cGUgPT09IDEgJiYgaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAvKiBOb2RlIGlzIGFscmVhZHkgYSBib2R5LCB1c2UgYXMgaXMgKi9cbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2UgaWYgKGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgYm9keSA9IGltcG9ydGVkTm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItbm9kZS1hcHBlbmRcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGltcG9ydGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIEV4aXQgZGlyZWN0bHkgaWYgd2UgaGF2ZSBub3RoaW5nIHRvIGRvICovXG4gICAgICAgIGlmICghUkVUVVJOX0RPTSAmJiAhU0FGRV9GT1JfVEVNUExBVEVTICYmICFXSE9MRV9ET0NVTUVOVCAmJlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICAgICAgZGlydHkuaW5kZXhPZignPCcpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSW5pdGlhbGl6ZSB0aGUgZG9jdW1lbnQgdG8gd29yayBvbiAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudChkaXJ0eSk7XG5cbiAgICAgICAgLyogQ2hlY2sgd2UgaGF2ZSBhIERPTSBub2RlIGZyb20gdGhlIGRhdGEgKi9cbiAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIFJFVFVSTl9ET00gPyBudWxsIDogZW1wdHlIVE1MO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBmaXJzdCBlbGVtZW50IG5vZGUgKG91cnMpIGlmIEZPUkNFX0JPRFkgaXMgc2V0ICovXG4gICAgICBpZiAoYm9keSAmJiBGT1JDRV9CT0RZKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvKiBHZXQgbm9kZSBpdGVyYXRvciAqL1xuICAgICAgdmFyIG5vZGVJdGVyYXRvciA9IF9jcmVhdGVJdGVyYXRvcihJTl9QTEFDRSA/IGRpcnR5IDogYm9keSk7XG5cbiAgICAgIC8qIE5vdyBzdGFydCBpdGVyYXRpbmcgb3ZlciB0aGUgY3JlYXRlZCBkb2N1bWVudCAqL1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogRml4IElFJ3Mgc3RyYW5nZSBiZWhhdmlvciB3aXRoIG1hbmlwdWxhdGVkIHRleHROb2RlcyAjODkgKi9cbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAzICYmIGN1cnJlbnROb2RlID09PSBvbGROb2RlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTYW5pdGl6ZSB0YWdzIGFuZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoX3Nhbml0aXplRWxlbWVudHMoY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTaGFkb3cgRE9NIGRldGVjdGVkLCBzYW5pdGl6ZSBpdCAqL1xuICAgICAgICBpZiAoY3VycmVudE5vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oY3VycmVudE5vZGUuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzLCBzYW5pdGl6ZSBpZiBuZWNlc3NhcnkgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgb2xkTm9kZSA9IGN1cnJlbnROb2RlO1xuICAgICAgfVxuXG4gICAgICBvbGROb2RlID0gbnVsbDtcblxuICAgICAgLyogSWYgd2Ugc2FuaXRpemVkIGBkaXJ0eWAgaW4tcGxhY2UsIHJldHVybiBpdC4gKi9cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBzYW5pdGl6ZWQgc3RyaW5nIG9yIERPTSAqL1xuICAgICAgaWYgKFJFVFVSTl9ET00pIHtcbiAgICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgICByZXR1cm5Ob2RlID0gY3JlYXRlRG9jdW1lbnRGcmFnbWVudC5jYWxsKGJvZHkub3duZXJEb2N1bWVudCk7XG5cbiAgICAgICAgICB3aGlsZSAoYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItbm9kZS1hcHBlbmRcbiAgICAgICAgICAgIHJldHVybk5vZGUuYXBwZW5kQ2hpbGQoYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGJvZHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoUkVUVVJOX0RPTV9JTVBPUlQpIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgQWRvcHROb2RlKCkgaXMgbm90IHVzZWQgYmVjYXVzZSBpbnRlcm5hbCBzdGF0ZSBpcyBub3QgcmVzZXRcbiAgICAgICAgICAgIChlLmcuIHRoZSBwYXN0IG5hbWVzIG1hcCBvZiBhIEhUTUxGb3JtRWxlbWVudCksIHRoaXMgaXMgc2FmZVxuICAgICAgICAgICAgaW4gdGhlb3J5IGJ1dCB3ZSB3b3VsZCByYXRoZXIgbm90IHJpc2sgYW5vdGhlciBhdHRhY2sgdmVjdG9yLlxuICAgICAgICAgICAgVGhlIHN0YXRlIHRoYXQgaXMgY2xvbmVkIGJ5IGltcG9ydE5vZGUoKSBpcyBleHBsaWNpdGx5IGRlZmluZWRcbiAgICAgICAgICAgIGJ5IHRoZSBzcGVjcy5cbiAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybk5vZGUgPSBpbXBvcnROb2RlLmNhbGwob3JpZ2luYWxEb2N1bWVudCwgcmV0dXJuTm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuTm9kZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlcmlhbGl6ZWRIVE1MID0gV0hPTEVfRE9DVU1FTlQgPyBib2R5Lm91dGVySFRNTCA6IGJvZHkuaW5uZXJIVE1MO1xuXG4gICAgICAvKiBTYW5pdGl6ZSBmaW5hbCBzdHJpbmcgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIE1VU1RBQ0hFX0VYUFIkJDEsICcgJyk7XG4gICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gc3RyaW5nUmVwbGFjZShzZXJpYWxpemVkSFRNTCwgRVJCX0VYUFIkJDEsICcgJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHNlcmlhbGl6ZWRIVE1MKSA6IHNlcmlhbGl6ZWRIVE1MO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHNldCB0aGUgY29uZmlndXJhdGlvbiBvbmNlXG4gICAgICogc2V0Q29uZmlnXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnNldENvbmZpZyA9IGZ1bmN0aW9uIChjZmcpIHtcbiAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgU0VUX0NPTkZJRyA9IHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIHRoZSBjb25maWd1cmF0aW9uXG4gICAgICogY2xlYXJDb25maWdcbiAgICAgKlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5jbGVhckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIENPTkZJRyA9IG51bGw7XG4gICAgICBTRVRfQ09ORklHID0gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gY2hlY2sgaWYgYW4gYXR0cmlidXRlIHZhbHVlIGlzIHZhbGlkLlxuICAgICAqIFVzZXMgbGFzdCBzZXQgY29uZmlnLCBpZiBhbnkuIE90aGVyd2lzZSwgdXNlcyBjb25maWcgZGVmYXVsdHMuXG4gICAgICogaXNWYWxpZEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB0YWcgVGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZC4gT3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gKHRhZywgYXR0ciwgdmFsdWUpIHtcbiAgICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cbiAgICAgIGlmICghQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyh7fSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBsY1RhZyA9IHN0cmluZ1RvTG93ZXJDYXNlKHRhZyk7XG4gICAgICB2YXIgbGNOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UoYXR0cik7XG4gICAgICByZXR1cm4gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byBhZGQgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gYWRkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va0Z1bmN0aW9uIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgKi9cbiAgICBET01QdXJpZnkuYWRkSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50LCBob29rRnVuY3Rpb24pIHtcbiAgICAgIGlmICh0eXBlb2YgaG9va0Z1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBob29rc1tlbnRyeVBvaW50XSB8fCBbXTtcbiAgICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGEgRE9NUHVyaWZ5IGhvb2sgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICogKHBvcHMgaXQgZnJvbSB0aGUgc3RhY2sgb2YgaG9va3MgaWYgbW9yZSBhcmUgcHJlc2VudClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgYXJyYXlQb3AoaG9va3NbZW50cnlQb2ludF0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3MgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rcyB0byByZW1vdmVcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9va3MgPSBmdW5jdGlvbiAoZW50cnlQb2ludCkge1xuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gW107XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUFsbEhvb2tzXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYWxsIERPTVB1cmlmeSBob29rc1xuICAgICAqXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUFsbEhvb2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgaG9va3MgPSB7fTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgfVxuXG4gIHZhciBwdXJpZnkgPSBjcmVhdGVET01QdXJpZnkoKTtcblxuICByZXR1cm4gcHVyaWZ5O1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdXJpZnkuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYW5hbHl0aWNzXzEgPSByZXF1aXJlKFwiLi91dGlscy9hbmFseXRpY3NcIik7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2RvbVwiKTtcbmNvbnN0IG5vdGlmaWNhdGlvbnNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL25vdGlmaWNhdGlvbnNcIik7XG4vLyBSZWdpc3RlcmluZyB0aGlzIGxpc3RlbmVyIHdoZW4gdGhlIHNjcmlwdCBpcyBmaXJzdCBleGVjdXRlZCBlbnN1cmVzIHRoYXQgdGhlXG4vLyBvZmZzY3JlZW4gZG9jdW1lbnQgd2lsbCBiZSBhYmxlIHRvIHJlY2VpdmUgbWVzc2FnZXMgd2hlbiB0aGUgcHJvbWlzZSByZXR1cm5lZFxuLy8gYnkgYG9mZnNjcmVlbi5jcmVhdGVEb2N1bWVudCgpYCByZXNvbHZlcy5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihoYW5kbGVNZXNzYWdlcyk7XG5sZXQgYW5hbHl0aWNzSXNFbmFibGVkID0gZmFsc2U7XG4vLyBUaGlzIGZ1bmN0aW9uIHBlcmZvcm1zIGJhc2ljIGZpbHRlcmluZyBhbmQgZXJyb3IgY2hlY2tpbmcgb24gbWVzc2FnZXMgYmVmb3JlXG4vLyBkaXNwYXRjaGluZyB0aGUgbWVzc2FnZSB0byBhIG1vcmUgc3BlY2lmaWMgbWVzc2FnZSBoYW5kbGVyLlxuZnVuY3Rpb24gaGFuZGxlTWVzc2FnZXMobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgLy8gUmV0dXJuIGVhcmx5IGlmIHRoaXMgbWVzc2FnZSBpc24ndCBtZWFudCBmb3IgdGhlIG9mZnNjcmVlbiBkb2N1bWVudC5cbiAgICAgICAgaWYgKG1lc3NhZ2UudGFyZ2V0ICE9PSBcIm9mZnNjcmVlblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIG1lc3NhZ2UgdG8gYW4gYXBwcm9wcmlhdGUgaGFuZGxlci5cbiAgICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJvZmZzY3JlZW4tbm90aWZpY2F0aW9uc1wiOlxuICAgICAgICAgICAgICAgIGxldCB7IG5vdGlmaWNhdGlvbiwgbmFtZSwgY291bnQsIGxhc3RUaW1lLCB0aW1lTW9kaWZpZWQgfSA9IHlpZWxkICgwLCBub3RpZmljYXRpb25zXzEubG9hZEFzc2lnbm1lbnROb3RpZmljYXRpb25zKShtZXNzYWdlLmRhdGEudXJsLCBtZXNzYWdlLmRhdGEubGFzdFRpbWUpO1xuICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3RpZmljYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lTW9kaWZpZWQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwib2Zmc2NyZWVuLWFuYWx5dGljc1wiOlxuICAgICAgICAgICAgICAgIGlmICghYW5hbHl0aWNzSXNFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkICgwLCBhbmFseXRpY3NfMS5pbml0aWFsaXplQW5hbHl0aWNzKSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudENvbnRleHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBbmFseXRpY3NFbmFibGVkOiAoMCwgZG9tXzEuZ2V0QnJvd3NlcikoKSAhPT0gXCJGaXJlZm94XCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmRhdGEuc2V0dGluZ3MuYW5hbHl0aWNzICE9PSBcImRpc2FibGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFRoZW1lOiAoX2EgPSBtZXNzYWdlLmRhdGEuc2V0dGluZ3MudGhlbWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFwiPHVuc2V0PlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRCZXRhOiAoX2IgPSBtZXNzYWdlLmRhdGEuc2V0dGluZ3MuYmV0YSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogXCI8dW5zZXQ+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmVyc2lvbjogbWVzc2FnZS5kYXRhLnNldHRpbmdzLnZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWZXJzaW9uOiAoX2MgPSBtZXNzYWdlLmRhdGEuc2V0dGluZ3MubmV3VmVyc2lvbikgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogXCI8dW5zZXQ+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5kb21Vc2VySWQ6IG1lc3NhZ2UuZGF0YS5zZXR0aW5ncy5yYW5kb21Vc2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZUlzTW9kZXJuOiBcIjx1bnNldD5cIixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGFuYWx5dGljc0lzRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICgwLCBhbmFseXRpY3NfMS50cmFja0V2ZW50KShtZXNzYWdlLmRhdGEubmFtZSwgbWVzc2FnZS5kYXRhLnByb3BzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBVbmV4cGVjdGVkIG1lc3NhZ2UgdHlwZSByZWNlaXZlZDogJyR7bWVzc2FnZS50eXBlfScuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQW5hbHl0aWNzID0gZXhwb3J0cy5nZXRBbmFseXRpY3NVc2VySWQgPSBleHBvcnRzLnRyYWNrRXZlbnQgPSB2b2lkIDA7XG4vKipcbiAqIFRyYWNrcyBhbiBldmVudCB1c2luZyBHb29nbGUgQW5hbHl0aWNzIGlmIHRoZSB1c2VyIGRpZCBub3Qgb3B0IG91dFxuICogTk9URTogVGhlIEZpcmVmb3ggdmVyc2lvbiBvZiB0aGUgZXh0ZW5zaW9uIGhhcyBubyBzdXBwb3J0IGZvciBHb29nbGUgQW5hbHl0aWNzXG4gKi9cbnZhciB0cmFja0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgX2EgPSB7fSkge1xuICAgIHZhciB7IGxlZ2FjeVRhcmdldCwgbGVnYWN5QWN0aW9uLCBsZWdhY3lMYWJlbCA9IHVuZGVmaW5lZCwgbGVnYWN5VmFsdWUgPSB1bmRlZmluZWQsIGlkLCBjb250ZXh0LCB2YWx1ZSB9ID0gX2EsIGV4dHJhUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImxlZ2FjeVRhcmdldFwiLCBcImxlZ2FjeUFjdGlvblwiLCBcImxlZ2FjeUxhYmVsXCIsIFwibGVnYWN5VmFsdWVcIiwgXCJpZFwiLCBcImNvbnRleHRcIiwgXCJ2YWx1ZVwiXSk7XG4gICAgY29uc29sZS5kZWJ1ZyhcIltTK10gVHJhY2tpbmcgZGlzYWJsZWQgYnkgdXNlclwiLCBhcmd1bWVudHMpO1xufTtcbmV4cG9ydHMudHJhY2tFdmVudCA9IHRyYWNrRXZlbnQ7XG5mdW5jdGlvbiBnZXRBbmFseXRpY3NVc2VySWQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tVG9rZW4oKSB7XG4gICAgICAgICAgICAvLyBFLmcuIDggKiAzMiA9IDI1NiBiaXRzIHRva2VuXG4gICAgICAgICAgICB2YXIgcmFuZG9tUG9vbCA9IG5ldyBVaW50OEFycmF5KDMyKTtcbiAgICAgICAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMocmFuZG9tUG9vbCk7XG4gICAgICAgICAgICB2YXIgaGV4ID0gXCJcIjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZG9tUG9vbC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGhleCArPSByYW5kb21Qb29sW2ldLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEUuZy4gZGIxODQ1OGUyNzgyYjJiNzdlMzY3NjljNTY5ZTI2M2E1Mzg4NWE5OTQ0ZGQwYTg2MWU1MDY0ZWFjMTZmMWFcbiAgICAgICAgICAgIHJldHVybiBoZXg7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGwgPSB5aWVsZCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoeyByYW5kb21Vc2VySWQ6IG51bGwgfSk7XG4gICAgICAgIGlmICghbC5yYW5kb21Vc2VySWQpIHtcbiAgICAgICAgICAgIGxldCByYW5kb21Vc2VySWQgPSBnZXRSYW5kb21Ub2tlbigpO1xuICAgICAgICAgICAgeWllbGQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgcmFuZG9tVXNlcklkIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmRvbVVzZXJJZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbC5yYW5kb21Vc2VySWQ7XG4gICAgfSk7XG59XG5leHBvcnRzLmdldEFuYWx5dGljc1VzZXJJZCA9IGdldEFuYWx5dGljc1VzZXJJZDtcbmZ1bmN0aW9uIGluaXRpYWxpemVBbmFseXRpY3MoX2EpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIGFyZ3VtZW50cywgdm9pZCAwLCBmdW5jdGlvbiogKHsgZG9jdW1lbnRDb250ZXh0LCBpc0FuYWx5dGljc0VuYWJsZWQsIHNlbGVjdGVkVGhlbWUsIHNlbGVjdGVkQmV0YSwgY3VycmVudFZlcnNpb24sIG5ld1ZlcnNpb24sIHJhbmRvbVVzZXJJZCwgdGhlbWVJc01vZGVybiwgfSkge1xuICAgICAgICBpZiAoaXNBbmFseXRpY3NFbmFibGVkKSB7XG4gICAgICAgICAgICBlbmFibGVBbmFseXRpY3MoKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBlbmFibGVBbmFseXRpY3MoKSB7XG4gICAgICAgICAgICAvLyBHb29nbGUgQW5hbHl0aWNzIHY0XG4gICAgICAgICAgICBnbG9iYWxUaGlzLmRhdGFMYXllciA9IGdsb2JhbFRoaXMuZGF0YUxheWVyIHx8IFtdO1xuICAgICAgICAgICAgZnVuY3Rpb24gZ3RhZyguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIChfYSA9IGdsb2JhbFRoaXMuZGF0YUxheWVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3RhZyhcImpzXCIsIG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgY29uc3QgZ3RhZ0NvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBwYWdlX2xvY2F0aW9uOiBsb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1xcL1xcZHszLH1cXGIvZywgXCIvKlwiKSxcbiAgICAgICAgICAgICAgICBwYWdlX3BhdGg6IGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1xcZHszLH1cXGIvZywgXCIvKlwiKSxcbiAgICAgICAgICAgICAgICBwYWdlX3RpdGxlOiBudWxsLFxuICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHJhbmRvbVVzZXJJZCxcbiAgICAgICAgICAgICAgICB1c2VyX3Byb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHNlbGVjdGVkVGhlbWUsXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUJldGE6IHNlbGVjdGVkQmV0YSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdEVuYWJsZWRWZXJzaW9uOiBuZXdWZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25WZXJzaW9uOiBjdXJyZW50VmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBsb2NhdGlvbi5ob3N0LFxuICAgICAgICAgICAgICAgICAgICBtb2Rlcm5UaGVtZTogdGhlbWVJc01vZGVybixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGd0YWcoXCJjb25maWdcIiwgXCJHLVlNNkIwMFJEWUNcIiwgZ3RhZ0NvbmZpZyk7XG4gICAgICAgICAgICBleHBvcnRzLnRyYWNrRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBfYSA9IHt9KSB7XG4gICAgICAgICAgICAgICAgdmFyIHsgbGVnYWN5VGFyZ2V0LCBsZWdhY3lBY3Rpb24sIGxlZ2FjeUxhYmVsID0gdW5kZWZpbmVkLCBsZWdhY3lWYWx1ZSA9IHVuZGVmaW5lZCwgaWQsIGNvbnRleHQsIHZhbHVlIH0gPSBfYSwgZXh0cmFQcm9wcyA9IF9fcmVzdChfYSwgW1wibGVnYWN5VGFyZ2V0XCIsIFwibGVnYWN5QWN0aW9uXCIsIFwibGVnYWN5TGFiZWxcIiwgXCJsZWdhY3lWYWx1ZVwiLCBcImlkXCIsIFwiY29udGV4dFwiLCBcInZhbHVlXCJdKTtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnREYXRhID0gT2JqZWN0LmFzc2lnbih7IGlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSB9LCBleHRyYVByb3BzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKGBbUytdIFRyYWNrZWQgZXZlbnQ6YCwgZXZlbnROYW1lLCBldmVudERhdGEpO1xuICAgICAgICAgICAgICAgIGd0YWcoXCJldmVudFwiLCBldmVudE5hbWUsIGV2ZW50RGF0YSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZnVuY3Rpb24gdHJhY2tDbGljayhldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICghZXZlbnQuaXNUcnVzdGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IChldmVudC5jdXJyZW50VGFyZ2V0IHx8IGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgKDAsIGV4cG9ydHMudHJhY2tFdmVudCkoXCJ0cmFja2luZ19saW5rX2NsaWNrXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgbGVnYWN5VGFyZ2V0OiB0YXJnZXQuZGF0YXNldC5zcGx1c1RyYWNraW5nSWQgfHwgdGFyZ2V0LmlkIHx8IFwiVW5sYWJlbGVkIEJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBsZWdhY3lBY3Rpb246IFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgbGVnYWN5TGFiZWw6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdDb250ZXh0IHx8IFwiVHJhY2tpbmcgTGlua1wiLFxuICAgICAgICAgICAgICAgICAgICBsZWdhY3lWYWx1ZTogdGFyZ2V0LmRhdGFzZXQuc3BsdXNUcmFja2luZ1ZhbHVlIHx8IGV2ZW50LmJ1dHRvbixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdJZCB8fCB0YXJnZXQuaWQgfHwgXCJVbmxhYmVsZWQgQnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdDb250ZXh0IHx8IFwiVHJhY2tpbmcgTGlua1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGFyZ2V0LmRhdGFzZXQuc3BsdXNUcmFja2luZ1ZhbHVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvY3VtZW50Q29udGV4dCkge1xuICAgICAgICAgICAgICAgIGxldCB0cmFja2VkRWxlbWVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICAgICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucywgbXV0YXRpb25PYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbGVtIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3BsdXMtdHJhY2stY2xpY2tzOm5vdCguc3BsdXMtdHJhY2tlZClcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdHJhY2tlZEVsZW1lbnRzLmhhcyhlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRyYWNrQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImF1eGNsaWNrXCIsIHRyYWNrQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcInNwbHVzLXRyYWNrZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tlZEVsZW1lbnRzLmFkZChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciByZWFkeVN0YXRlQ2hlY2tJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFkeVN0YXRlQ2hlY2tJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNwbHVzLXRyYWNrLWNsaWNrc1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFja2VkRWxlbWVudHMuaGFzKGVsZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdHJhY2tDbGljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiYXV4Y2xpY2tcIiwgdHJhY2tDbGljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKFwic3BsdXMtdHJhY2tlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFja2VkRWxlbWVudHMuYWRkKGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmluaXRpYWxpemVBbmFseXRpY3MgPSBpbml0aWFsaXplQW5hbHl0aWNzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLndhaXRGb3JFbGVtZW50ID0gZXhwb3J0cy5jcmVhdGVTdmdMb2dvID0gZXhwb3J0cy5zZXRDU1NWYXJpYWJsZSA9IGV4cG9ydHMuZ2V0UGFyZW50cyA9IGV4cG9ydHMuaXNWaXNpYmxlID0gZXhwb3J0cy5nZXRCcm93c2VyID0gZXhwb3J0cy5jcmVhdGVCdXR0b25XaXRoTG9nbyA9IGV4cG9ydHMuY3JlYXRlQnV0dG9uID0gZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gdm9pZCAwO1xuLyoqXG4gKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gQSBET00gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyAtIFRoZSBIVE1MIHRhZyBuYW1lIG9mIHRoZSB0eXBlIG9mIERPTSBlbGVtZW50IHRvIGNyZWF0ZVxuICogQHBhcmFtIHtzdHJpbmdbXX0gY2xhc3NMaXN0IC0gQ1NTIGNsYXNzZXMgdG8gYXBwbHkgdG8gdGhlIERPTSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLGFueT59IHByb3BlcnRpZXMgLSBQcm9wZXJ0aWVzIHRvIGFwcGx5IHRvIHRoZSBET00gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBjaGlsZHJlbiAtIEVsZW1lbnRzIHRvIGFwcGVuZCBhcyBjaGlsZHJlbiB0byB0aGUgY3JlYXRlZCBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc0xpc3QsIHByb3BlcnRpZXMsIGNoaWxkcmVuKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKGNsYXNzTGlzdCkge1xuICAgICAgICBmb3IgKGxldCBjIG9mIGNsYXNzTGlzdCkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGZvciAobGV0IHByb3BlcnR5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW3Byb3BlcnR5XSBpbnN0YW5jZW9mIE9iamVjdCAmJlxuICAgICAgICAgICAgICAgICEocHJvcGVydGllc1twcm9wZXJ0eV0gaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzdWJwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50W3Byb3BlcnR5XVtzdWJwcm9wZXJ0eV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XVtzdWJwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCAmJiBwcm9wZXJ0aWVzW3Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFtwcm9wZXJ0eV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbi8qKlxuICogQ3JlYXRlcyBhIFNjaG9vbG9neSBQbHVzIHRoZW1lZCBidXR0b24gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBJRCBmb3IgdGhlIGJ1dHRvbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBzaG93IG9uIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7KGU6IEV2ZW50KT0+dm9pZH0gY2FsbGJhY2sgQSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQnV0dG9uKGlkLCB0ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBbXCJzdWJtaXQtc3Bhbi13cmFwcGVyXCIsIFwic3BsdXMtbW9kYWwtYnV0dG9uXCJdLCB7IG9uY2xpY2s6IGNhbGxiYWNrIH0sIFtcbiAgICAgICAgY3JlYXRlRWxlbWVudChcImlucHV0XCIsIFtcImZvcm0tc3VibWl0XCIsIFwic3BsdXMtdHJhY2stY2xpY2tzXCJdLCB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgdmFsdWU6IHRleHQsXG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBkYXRhc2V0OiB7IHNwbHVzVHJhY2tpbmdDb250ZXh0OiBcIlMrIEJ1dHRvblwiIH0sXG4gICAgICAgIH0pLFxuICAgIF0pO1xufVxuZXhwb3J0cy5jcmVhdGVCdXR0b24gPSBjcmVhdGVCdXR0b247XG5mdW5jdGlvbiBjcmVhdGVCdXR0b25XaXRoTG9nbyhpZCwgdGV4dCwgY2FsbGJhY2spIHtcbiAgICBsZXQgYnV0dG9uID0gY3JlYXRlQnV0dG9uKGlkLCB0ZXh0LCBjYWxsYmFjayk7XG4gICAgbGV0IGltZyA9IGNyZWF0ZVN2Z0xvZ28oKTtcbiAgICBPYmplY3QuYXNzaWduKGltZy5zdHlsZSwge1xuICAgICAgICB2ZXJ0aWNhbEFsaWduOiBcIm1pZGRsZVwiLFxuICAgICAgICBwYWRkaW5nTGVmdDogXCI0cHhcIixcbiAgICAgICAgd2lkdGg6IFwiMThweFwiLFxuICAgIH0pO1xuICAgIGJ1dHRvbi5wcmVwZW5kKGltZyk7XG4gICAgYnV0dG9uLnN0eWxlLnNldFByb3BlcnR5KFwiaGVpZ2h0XCIsIFwiMzZweFwiLCBcImltcG9ydGFudFwiKTtcbiAgICBsZXQgYnV0dG9uSW5wdXQgPSBidXR0b24ucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgIGJ1dHRvbklucHV0LnN0eWxlLnBhZGRpbmdMZWZ0ID0gXCI0cHhcIjtcbiAgICBidXR0b25JbnB1dC5zdHlsZS5zZXRQcm9wZXJ0eShcImhlaWdodFwiLCBcIjM2cHhcIiwgXCJpbXBvcnRhbnRcIik7XG4gICAgYnV0dG9uLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgIHJldHVybiBidXR0b247XG59XG5leHBvcnRzLmNyZWF0ZUJ1dHRvbldpdGhMb2dvID0gY3JlYXRlQnV0dG9uV2l0aExvZ287XG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgYnJvd3NlclxuICogQHJldHVybnMge1wiQ2hyb21lXCJ8XCJGaXJlZm94XCJ8XCJPdGhlclwifSBOYW1lIG9mIHRoZSBjdXJyZW50IGJyb3dzZXJcbiAqL1xuZnVuY3Rpb24gZ2V0QnJvd3NlcigpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMuY2hyb21lICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5icm93c2VyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJGaXJlZm94XCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBMaWtlbHkgY2FwdHVyZXMgYWxsIENocm9taXVtLWJhc2VkIGJyb3dzZXJzXG4gICAgICAgICAgICByZXR1cm4gXCJDaHJvbWVcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiT3RoZXJcIjtcbiAgICB9XG59XG5leHBvcnRzLmdldEJyb3dzZXIgPSBnZXRCcm93c2VyO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbGVtZW50IGlzIHZpc2libGUgdG8gdGhlIHVzZXJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW0gVGhlIGVsZW1lbnQgdG8gY2hlY2sgZm9yIHZpc2liaWxpdHlcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgZWxlbWVudCBpcyB2aXNpYmxlXG4gKi9cbmZ1bmN0aW9uIGlzVmlzaWJsZShlbGVtKSB7XG4gICAgcmV0dXJuICEhKGVsZW0ub2Zmc2V0V2lkdGggfHwgZWxlbS5vZmZzZXRIZWlnaHQgfHwgZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59XG5leHBvcnRzLmlzVmlzaWJsZSA9IGlzVmlzaWJsZTtcbi8qKlxuICogUmV0dXJucyBhbGwgcGFyZW50IGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBwcm92aWRlZCBzZWxlY3Rvci5cbiAqIEVzc2VudGlhbGx5IHdvcmtzIGxpa2UgYSByZXZlcnNlIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsYC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW0gVGhlIHRhcmdldCBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgQSBDU1Mgc2VsZWN0b3JcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudFtdfSBBbiBhcnJheSBvZiBtYXRjaGluZyBwYXJlbnQgZWxlbWVudHNcbiAqL1xuZnVuY3Rpb24gZ2V0UGFyZW50cyhlbGVtLCBzZWxlY3Rvcikge1xuICAgIHZhciBwYXJlbnRzID0gW107XG4gICAgdmFyIGZpcnN0Q2hhcjtcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgZmlyc3RDaGFyID0gc2VsZWN0b3IuY2hhckF0KDApO1xuICAgIH1cbiAgICBmb3IgKDsgZWxlbSAmJiBlbGVtICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IGVsZW0gPSBlbGVtLnBhcmVudE5vZGUpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RDaGFyID09PSBcIi5cIikge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3Rvci5zdWJzdHIoMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudHMucHVzaChlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RDaGFyID09PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLmlkID09PSBzZWxlY3Rvci5zdWJzdHIoMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdENoYXIgPT09IFwiW1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uaGFzQXR0cmlidXRlKHNlbGVjdG9yLnN1YnN0cigxLCBzZWxlY3Rvci5sZW5ndGggLSAxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbGVtLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2goZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnRzLnB1c2goZWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhcmVudHM7XG59XG5leHBvcnRzLmdldFBhcmVudHMgPSBnZXRQYXJlbnRzO1xuLyoqXG4gKiBTZXRzIHRoZSB2YWx1ZSBvZiBhIENTUyB2YXJpYWJsZSBvbiB0aGUgZG9jdW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFZhcmlhYmxlIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgTmV3IHZhcmlhYmxlIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHNldENTU1ZhcmlhYmxlKG5hbWUsIHZhbCkge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShgLS0ke25hbWV9YCwgdmFsICE9PSBudWxsICYmIHZhbCAhPT0gdm9pZCAwID8gdmFsIDogbnVsbCk7XG59XG5leHBvcnRzLnNldENTU1ZhcmlhYmxlID0gc2V0Q1NTVmFyaWFibGU7XG5mdW5jdGlvbiBjcmVhdGVTdmdMb2dvKC4uLmNsYXNzZXMpIHtcbiAgICBsZXQgY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJjaXJjbGVcIik7XG4gICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcImN4XCIsIFwiMjUwXCIpO1xuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJjeVwiLCBcIjI1MFwiKTtcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwiclwiLCBcIjIzMFwiKTtcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJmaWxsOiBub25lOyBzdHJva2Utd2lkdGg6IDM1cHg7IHN0cm9rZTogY3VycmVudENvbG9yO1wiKTtcbiAgICBsZXQgbGluZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImxpbmVcIik7XG4gICAgbGluZTEuc2V0QXR0cmlidXRlKFwieDFcIiwgXCIyNTBcIik7XG4gICAgbGluZTEuc2V0QXR0cmlidXRlKFwieTFcIiwgXCIxMjVcIik7XG4gICAgbGluZTEuc2V0QXR0cmlidXRlKFwieDJcIiwgXCIyNTBcIik7XG4gICAgbGluZTEuc2V0QXR0cmlidXRlKFwieTJcIiwgXCIzNzVcIik7XG4gICAgbGluZTEuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJzdHJva2UtbGluZWNhcDogcm91bmQ7IHN0cm9rZS13aWR0aDogMzVweDsgc3Ryb2tlOiBjdXJyZW50Q29sb3I7XCIpO1xuICAgIGxldCBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwibGluZVwiKTtcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoXCJ4MVwiLCBcIjEyNVwiKTtcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoXCJ5MVwiLCBcIjI1MFwiKTtcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoXCJ4MlwiLCBcIjM3NVwiKTtcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoXCJ5MlwiLCBcIjI1MFwiKTtcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLXdpZHRoOiAzNXB4OyBzdHJva2U6IGN1cnJlbnRDb2xvcjtcIik7XG4gICAgbGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIFwiMCAwIDUwMCA1MDBcIik7XG4gICAgc3ZnLmFwcGVuZChjaXJjbGUsIGxpbmUxLCBsaW5lMik7XG4gICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgc3ZnLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgfVxuICAgIHJldHVybiBzdmc7XG59XG5leHBvcnRzLmNyZWF0ZVN2Z0xvZ28gPSBjcmVhdGVTdmdMb2dvO1xuZnVuY3Rpb24gd2FpdEZvckVsZW1lbnQoc2VsZWN0b3IsIGNoZWNrX2ludGVydmFsID0gNTApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNoZWNrX2ludGVydmFsKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMud2FpdEZvckVsZW1lbnQgPSB3YWl0Rm9yRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Mb2dnZXIgPSB2b2lkIDA7XG5leHBvcnRzLkxvZ2dlciA9IHtcbiAgICBsb2c6ICgoKSA9PiBjb25zb2xlLmxvZy5iaW5kKGdsb2JhbFRoaXMuY29uc29sZSwgYCVjK2AsIGNyZWF0ZUxvZ1ByZWZpeChcIiM4MUQ0RkFcIikpKSgpLFxuICAgIGVycm9yOiAoKCkgPT4gY29uc29sZS5lcnJvci5iaW5kKGdsb2JhbFRoaXMuY29uc29sZSwgYCVjK2AsIGNyZWF0ZUxvZ1ByZWZpeChcIiNGRjY5NjFcIikpKSgpLFxuICAgIGluZm86ICgoKSA9PiBjb25zb2xlLmluZm8uYmluZChnbG9iYWxUaGlzLmNvbnNvbGUsIGAlYytgLCBjcmVhdGVMb2dQcmVmaXgoXCJ3aGl0ZVwiKSkpKCksXG4gICAgd2FybjogKCgpID0+IGNvbnNvbGUud2Fybi5iaW5kKGdsb2JhbFRoaXMuY29uc29sZSwgYCVjK2AsIGNyZWF0ZUxvZ1ByZWZpeChcIiNGREZEOTZcIikpKSgpLFxuICAgIHRyYWNlOiAoKCkgPT4gY29uc29sZS50cmFjZS5iaW5kKGdsb2JhbFRoaXMuY29uc29sZSwgYCVjK2AsIGNyZWF0ZUxvZ1ByZWZpeChcIm9yYW5nZVwiKSkpKCksXG4gICAgZGVidWc6ICgoKSA9PiBjb25zb2xlLmRlYnVnLmJpbmQoZ2xvYmFsVGhpcy5jb25zb2xlLCBgJWMrYCwgY3JlYXRlTG9nUHJlZml4KFwibGlnaHRncmVlblwiKSkpKCksXG59O1xuZnVuY3Rpb24gY3JlYXRlTG9nUHJlZml4KGNvbG9yKSB7XG4gICAgcmV0dXJuIGBjb2xvcjoke2NvbG9yfTtib3JkZXI6MXB4IHNvbGlkICMyQTJBMkE7Ym9yZGVyLXJhZGl1czoxMDAlO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7cGFkZGluZzogMCA0cHggMCA0cHg7YmFja2dyb3VuZC1jb2xvcjojMkEyQTJBYDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNlbmROb3RpZmljYXRpb24gPSBleHBvcnRzLnVwZGF0ZUxhc3RUaW1lID0gZXhwb3J0cy5sb2FkQXNzaWdubWVudE5vdGlmaWNhdGlvbnMgPSB2b2lkIDA7XG5jb25zdCBkb21wdXJpZnlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiZG9tcHVyaWZ5XCIpKTtcbmNvbnN0IGFuYWx5dGljc18xID0gcmVxdWlyZShcIi4vYW5hbHl0aWNzXCIpO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCBsb2dnZXJfMSA9IHJlcXVpcmUoXCIuL2xvZ2dlclwiKTtcbmZ1bmN0aW9uIGxvYWRBc3NpZ25tZW50Tm90aWZpY2F0aW9ucyhhc3NpZ25tZW50Tm90aWZpY2F0aW9uVXJsLCBsYXN0VGltZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGFzc2lnbm1lbnROb3RpZmljYXRpb25VcmwsIHtcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgbG9hZGluZyBub3RpZmljYXRpb25zOiBcIiArIHJlc3BvbnNlKTtcbiAgICAgICAgbGV0IHJlc3BvbnNlSnNvbiA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIkxhc3QgbmV3IGdyYWRlOiBcIiArIG5ldyBEYXRlKGxhc3RUaW1lKS50b1N0cmluZygpKTtcbiAgICAgICAgbGV0IHRpbWUgPSBsYXN0VGltZTtcbiAgICAgICAgbGV0IHRpbWVNb2RpZmllZCA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRpbWUpIHtcbiAgICAgICAgICAgIHRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGltZU1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdlwiKSB8fCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gZG9tcHVyaWZ5XzEuZGVmYXVsdC5zYW5pdGl6ZShyZXNwb25zZUpzb24ub3V0cHV0KTtcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbnMgPSBkaXYucXVlcnlTZWxlY3RvckFsbChcIi5lZGdlLXNlbnRlbmNlXCIpO1xuICAgICAgICBsZXQgbW9udGhzID0gW1xuICAgICAgICAgICAgXCJKYW5cIixcbiAgICAgICAgICAgIFwiRmViXCIsXG4gICAgICAgICAgICBcIk1hclwiLFxuICAgICAgICAgICAgXCJBcHJcIixcbiAgICAgICAgICAgIFwiTWF5XCIsXG4gICAgICAgICAgICBcIkp1blwiLFxuICAgICAgICAgICAgXCJKdWxcIixcbiAgICAgICAgICAgIFwiQXVnXCIsXG4gICAgICAgICAgICBcIlNlcFwiLFxuICAgICAgICAgICAgXCJPY3RcIixcbiAgICAgICAgICAgIFwiTm92XCIsXG4gICAgICAgICAgICBcIkRlY1wiLFxuICAgICAgICBdO1xuICAgICAgICBsZXQgdG90YWxBc3NpZ25tZW50cyA9IDA7XG4gICAgICAgIGZvciAobGV0IG5vdGlmaWNhdGlvbiBvZiBBcnJheS5mcm9tKG5vdGlmaWNhdGlvbnMpLnJldmVyc2UoKSkge1xuICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi50ZXh0Q29udGVudC5pbmNsdWRlcyhcIm5ldyBncmFkZVwiKSkge1xuICAgICAgICAgICAgICAgIGxldCBhc3NpZ25tZW50cyA9IG5vdGlmaWNhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFcIik7XG4gICAgICAgICAgICAgICAgbGV0IGV4dHJhVGV4dEVsZW1lbnQgPSBub3RpZmljYXRpb24ucXVlcnlTZWxlY3RvcihcIi5vdGhlci1pdGVtcy1saW5rXCIpO1xuICAgICAgICAgICAgICAgIGxldCB0aW1lVGV4dCA9IG5vdGlmaWNhdGlvbi5xdWVyeVNlbGVjdG9yKFwiLmVkZ2UtdGltZVwiKS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBsZXQgc3BsaXREYXRlID0gdGltZVRleHQuc3BsaXQoXCIgYXQgXCIpO1xuICAgICAgICAgICAgICAgIGxldCBtb250aERheSA9IHNwbGl0RGF0ZVswXTtcbiAgICAgICAgICAgICAgICBsZXQgaG91ck1pbnV0ZSA9IHNwbGl0RGF0ZVsxXTtcbiAgICAgICAgICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBsZXQgbW9udGhEYXlZZWFyID0gbW9udGhEYXkgKyBgICR7bm93LmdldEZ1bGxZZWFyKCl9YDtcbiAgICAgICAgICAgICAgICBsZXQgdG9kYXkgPSBgJHttb250aHNbbm93LmdldE1vbnRoKCldfSAke25vdy5nZXREYXRlKCl9ICR7bm93LmdldEZ1bGxZZWFyKCl9YDtcbiAgICAgICAgICAgICAgICBsZXQgbm90aWZpY2F0aW9uRGF0ZSA9IERhdGUucGFyc2UobW9udGhEYXlZZWFyKTtcbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uRGF0ZSA+IERhdGUucGFyc2UodG9kYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbkRhdGUgPSBEYXRlLnBhcnNlKG1vbnRoRGF5ICsgYCAke25vdy5nZXRGdWxsWWVhcigpIC0gMX0gJHtob3VyTWludXRlfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uRGF0ZSA9IERhdGUucGFyc2UoYCR7bW9udGhEYXlZZWFyfSAke2hvdXJNaW51dGV9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3RpZmljYXRpb25EYXRlID4gdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aW1lID0gbm90aWZpY2F0aW9uRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgdGltZU1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxBc3NpZ25tZW50cysrO1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBuID0gbnVsbDtcbiAgICAgICAgaWYgKHRvdGFsQXNzaWdubWVudHMgPiAwKSB7XG4gICAgICAgICAgICBuID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYmFzaWNcIixcbiAgICAgICAgICAgICAgICBpY29uVXJsOiBcImltZ3MvaWNvbkAxMjgucG5nXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiTmV3IGdyYWRlIHBvc3RlZFwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke3RvdGFsQXNzaWdubWVudHN9IG5ldyBhc3NpZ25tZW50JHt0b3RhbEFzc2lnbm1lbnRzID09PSAxID8gXCIgaGFzIGEgZ3JhZGVcIiA6IFwicyBoYXZlIGdyYWRlc1wifWAsXG4gICAgICAgICAgICAgICAgZXZlbnRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIGlzQ2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uOiBuLFxuICAgICAgICAgICAgbmFtZTogXCJhc3NpZ25tZW50XCIsXG4gICAgICAgICAgICBjb3VudDogdG90YWxBc3NpZ25tZW50cyxcbiAgICAgICAgICAgIGxhc3RUaW1lOiB0aW1lLFxuICAgICAgICAgICAgdGltZU1vZGlmaWVkLFxuICAgICAgICB9O1xuICAgIH0pO1xufVxuZXhwb3J0cy5sb2FkQXNzaWdubWVudE5vdGlmaWNhdGlvbnMgPSBsb2FkQXNzaWdubWVudE5vdGlmaWNhdGlvbnM7XG5mdW5jdGlvbiB1cGRhdGVMYXN0VGltZSh0aW1lTW9kaWZpZWQsIHRpbWUpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAodGltZU1vZGlmaWVkKSB7XG4gICAgICAgICAgICB5aWVsZCBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IGxhc3RUaW1lOiB0aW1lIH0pO1xuICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIlNldCBuZXcgdGltZSBcIiArIG5ldyBEYXRlKHRpbWUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlcl8xLkxvZ2dlci5sb2coXCJObyBuZXcgbm90aWZpY2F0aW9uc1wiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy51cGRhdGVMYXN0VGltZSA9IHVwZGF0ZUxhc3RUaW1lO1xuLyoqXG4gKiBTZW5kcyBhIGRlc2t0b3Agbm90aWZpY2F0aW9uIGlmIHNldHRpbmdzIHBlcm1pdFxuICogQHBhcmFtIHtOb3RpZmljYXRpb25PcHRpb25zfSBub3RpZmljYXRpb24gQSBjaHJvbWUgbm90aWZpY2F0aW9uIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIG5vdGlmaWNhdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudD0xXSBUaGUgbnVtYmVyIHRvIGFkZCB0byB0aGUgYnJvd3NlciBhY3Rpb24gYmFkZ2VcbiAqL1xuZnVuY3Rpb24gc2VuZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIG5hbWUsIGNvdW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKCFub3RpZmljYXRpb24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBzdG9yYWdlQ29udGVudCA9IHlpZWxkIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KG51bGwpO1xuICAgICAgICBjb3VudCA9IGNvdW50IHx8IGNvdW50ID09IDAgPyBjb3VudCA6IDE7XG4gICAgICAgIGlmICgoMCwgZG9tXzEuZ2V0QnJvd3NlcikoKSA9PSBcIkZpcmVmb3hcIikge1xuICAgICAgICAgICAgZGVsZXRlIG5vdGlmaWNhdGlvbi5yZXF1aXJlSW50ZXJhY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIk5ldyBub3RpZmljYXRpb24hXCIsIG5vdGlmaWNhdGlvbik7XG4gICAgICAgIGlmIChjb3VudCA+IDAgJiZcbiAgICAgICAgICAgICghc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyB8fFxuICAgICAgICAgICAgICAgIHN0b3JhZ2VDb250ZW50Lm5vdGlmaWNhdGlvbnMgPT0gXCJlbmFibGVkXCIgfHxcbiAgICAgICAgICAgICAgICBzdG9yYWdlQ29udGVudC5ub3RpZmljYXRpb25zID09IFwiYmFkZ2VcIikpIHtcbiAgICAgICAgICAgIGxldCB4ID0geWllbGQgY2hyb21lLmFjdGlvbi5nZXRCYWRnZVRleHQoe30pO1xuICAgICAgICAgICAgbGV0IG51bSA9IE51bWJlci5wYXJzZUludCh4KTtcbiAgICAgICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogKG51bSA/IG51bSArIGNvdW50IDogY291bnQpLnRvU3RyaW5nKCkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXJfMS5Mb2dnZXIubG9nKFwiTnVtYmVyIGJhZGdlIGlzIGRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyB8fFxuICAgICAgICAgICAgc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyA9PSBcImVuYWJsZWRcIiB8fFxuICAgICAgICAgICAgc3RvcmFnZUNvbnRlbnQubm90aWZpY2F0aW9ucyA9PSBcInBvcHVwXCIpIHtcbiAgICAgICAgICAgIGNocm9tZS5ub3RpZmljYXRpb25zLmNyZWF0ZShuYW1lLCBub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgKDAsIGFuYWx5dGljc18xLnRyYWNrRXZlbnQpKFwicGVyZm9ybV9hY3Rpb25cIiwge1xuICAgICAgICAgICAgICAgIGlkOiBcInNob3duXCIsXG4gICAgICAgICAgICAgICAgY29udGV4dDogXCJOb3RpZmljYXRpb25zXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgbGVnYWN5VGFyZ2V0OiBuYW1lLFxuICAgICAgICAgICAgICAgIGxlZ2FjeUFjdGlvbjogXCJzaG93blwiLFxuICAgICAgICAgICAgICAgIGxlZ2FjeUxhYmVsOiBcIk5vdGlmaWNhdGlvbnNcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyXzEuTG9nZ2VyLmxvZyhcIlBvcHVwIG5vdGlmaWNhdGlvbnMgYXJlIGRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLnNlbmROb3RpZmljYXRpb24gPSBzZW5kTm90aWZpY2F0aW9uO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvb2Zmc2NyZWVuLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9