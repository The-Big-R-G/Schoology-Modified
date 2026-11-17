/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/spectrum-colorpicker/spectrum.js":
/*!*******************************************************!*\
  !*** ./node_modules/spectrum-colorpicker/spectrum.js ***!
  \*******************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Spectrum Colorpicker v1.8.1
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT

(function (factory) {
    "use strict";

    if (true) { // AMD
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else {}
})(function($, undefined) {
    "use strict";

    var defaultOpts = {

        // Callbacks
        beforeShow: noop,
        move: noop,
        change: noop,
        show: noop,
        hide: noop,

        // Options
        color: false,
        flat: false,
        showInput: false,
        allowEmpty: false,
        showButtons: true,
        clickoutFiresChange: true,
        showInitial: false,
        showPalette: false,
        showPaletteOnly: false,
        hideAfterPaletteSelect: false,
        togglePaletteOnly: false,
        showSelectionPalette: true,
        localStorageKey: false,
        appendTo: "body",
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        togglePaletteMoreText: "more",
        togglePaletteLessText: "less",
        clearText: "Clear Color Selection",
        noColorSelectedText: "No Color Selected",
        preferredFormat: false,
        className: "", // Deprecated - use containerClassName and replacerClassName instead.
        containerClassName: "",
        replacerClassName: "",
        showAlpha: false,
        theme: "sp-light",
        palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
        selectionPalette: [],
        disabled: false,
        offset: null
    },
    spectrums = [],
    IE = !!/msie/i.exec( window.navigator.userAgent ),
    rgbaSupport = (function() {
        function contains( str, substr ) {
            return !!~('' + str).indexOf(substr);
        }

        var elem = document.createElement('div');
        var style = elem.style;
        style.cssText = 'background-color:rgba(0,0,0,.5)';
        return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
    })(),
    replaceInput = [
        "<div class='sp-replacer'>",
            "<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
            "<div class='sp-dd'>&#9660;</div>",
        "</div>"
    ].join(''),
    markup = (function () {

        // IE does not support gradients with multiple stops, so we need to simulate
        //  that for the rainbow slider with 8 divs that each have a single gradient
        var gradientFix = "";
        if (IE) {
            for (var i = 1; i <= 6; i++) {
                gradientFix += "<div class='sp-" + i + "'></div>";
            }
        }

        return [
            "<div class='sp-container sp-hidden'>",
                "<div class='sp-palette-container'>",
                    "<div class='sp-palette sp-thumb sp-cf'></div>",
                    "<div class='sp-palette-button-container sp-cf'>",
                        "<button type='button' class='sp-palette-toggle'></button>",
                    "</div>",
                "</div>",
                "<div class='sp-picker-container'>",
                    "<div class='sp-top sp-cf'>",
                        "<div class='sp-fill'></div>",
                        "<div class='sp-top-inner'>",
                            "<div class='sp-color'>",
                                "<div class='sp-sat'>",
                                    "<div class='sp-val'>",
                                        "<div class='sp-dragger'></div>",
                                    "</div>",
                                "</div>",
                            "</div>",
                            "<div class='sp-clear sp-clear-display'>",
                            "</div>",
                            "<div class='sp-hue'>",
                                "<div class='sp-slider'></div>",
                                gradientFix,
                            "</div>",
                        "</div>",
                        "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
                    "</div>",
                    "<div class='sp-input-container sp-cf'>",
                        "<input class='sp-input' type='text' spellcheck='false'  />",
                    "</div>",
                    "<div class='sp-initial sp-thumb sp-cf'></div>",
                    "<div class='sp-button-container sp-cf'>",
                        "<a class='sp-cancel' href='#'></a>",
                        "<button type='button' class='sp-choose'></button>",
                    "</div>",
                "</div>",
            "</div>"
        ].join("");
    })();

    function paletteTemplate (p, color, className, opts) {
        var html = [];
        for (var i = 0; i < p.length; i++) {
            var current = p[i];
            if(current) {
                var tiny = tinycolor(current);
                var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                c += (tinycolor.equals(color, current)) ? " sp-thumb-active" : "";
                var formattedString = tiny.toString(opts.preferredFormat || "rgb");
                var swatchStyle = rgbaSupport ? ("background-color:" + tiny.toRgbString()) : "filter:" + tiny.toFilter();
                html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';"></span></span>');
            } else {
                var cls = 'sp-clear-display';
                html.push($('<div />')
                    .append($('<span data-color="" style="background-color:transparent;" class="' + cls + '"></span>')
                        .attr('title', opts.noColorSelectedText)
                    )
                    .html()
                );
            }
        }
        return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
    }

    function hideAll() {
        for (var i = 0; i < spectrums.length; i++) {
            if (spectrums[i]) {
                spectrums[i].hide();
            }
        }
    }

    function instanceOptions(o, callbackContext) {
        var opts = $.extend({}, defaultOpts, o);
        opts.callbacks = {
            'move': bind(opts.move, callbackContext),
            'change': bind(opts.change, callbackContext),
            'show': bind(opts.show, callbackContext),
            'hide': bind(opts.hide, callbackContext),
            'beforeShow': bind(opts.beforeShow, callbackContext)
        };

        return opts;
    }

    function spectrum(element, o) {

        var opts = instanceOptions(o, element),
            flat = opts.flat,
            showSelectionPalette = opts.showSelectionPalette,
            localStorageKey = opts.localStorageKey,
            theme = opts.theme,
            callbacks = opts.callbacks,
            resize = throttle(reflow, 10),
            visible = false,
            isDragging = false,
            dragWidth = 0,
            dragHeight = 0,
            dragHelperHeight = 0,
            slideHeight = 0,
            slideWidth = 0,
            alphaWidth = 0,
            alphaSlideHelperWidth = 0,
            slideHelperHeight = 0,
            currentHue = 0,
            currentSaturation = 0,
            currentValue = 0,
            currentAlpha = 1,
            palette = [],
            paletteArray = [],
            paletteLookup = {},
            selectionPalette = opts.selectionPalette.slice(0),
            maxSelectionSize = opts.maxSelectionSize,
            draggingClass = "sp-dragging",
            shiftMovementDirection = null;

        var doc = element.ownerDocument,
            body = doc.body,
            boundElement = $(element),
            disabled = false,
            container = $(markup, doc).addClass(theme),
            pickerContainer = container.find(".sp-picker-container"),
            dragger = container.find(".sp-color"),
            dragHelper = container.find(".sp-dragger"),
            slider = container.find(".sp-hue"),
            slideHelper = container.find(".sp-slider"),
            alphaSliderInner = container.find(".sp-alpha-inner"),
            alphaSlider = container.find(".sp-alpha"),
            alphaSlideHelper = container.find(".sp-alpha-handle"),
            textInput = container.find(".sp-input"),
            paletteContainer = container.find(".sp-palette"),
            initialColorContainer = container.find(".sp-initial"),
            cancelButton = container.find(".sp-cancel"),
            clearButton = container.find(".sp-clear"),
            chooseButton = container.find(".sp-choose"),
            toggleButton = container.find(".sp-palette-toggle"),
            isInput = boundElement.is("input"),
            isInputTypeColor = isInput && boundElement.attr("type") === "color" && inputTypeColorSupport(),
            shouldReplace = isInput && !flat,
            replacer = (shouldReplace) ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]),
            offsetElement = (shouldReplace) ? replacer : boundElement,
            previewElement = replacer.find(".sp-preview-inner"),
            initialColor = opts.color || (isInput && boundElement.val()),
            colorOnShow = false,
            currentPreferredFormat = opts.preferredFormat,
            clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange,
            isEmpty = !initialColor,
            allowEmpty = opts.allowEmpty && !isInputTypeColor;

        function applyOptions() {

            if (opts.showPaletteOnly) {
                opts.showPalette = true;
            }

            toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);

            if (opts.palette) {
                palette = opts.palette.slice(0);
                paletteArray = $.isArray(palette[0]) ? palette : [palette];
                paletteLookup = {};
                for (var i = 0; i < paletteArray.length; i++) {
                    for (var j = 0; j < paletteArray[i].length; j++) {
                        var rgb = tinycolor(paletteArray[i][j]).toRgbString();
                        paletteLookup[rgb] = true;
                    }
                }
            }

            container.toggleClass("sp-flat", flat);
            container.toggleClass("sp-input-disabled", !opts.showInput);
            container.toggleClass("sp-alpha-enabled", opts.showAlpha);
            container.toggleClass("sp-clear-enabled", allowEmpty);
            container.toggleClass("sp-buttons-disabled", !opts.showButtons);
            container.toggleClass("sp-palette-buttons-disabled", !opts.togglePaletteOnly);
            container.toggleClass("sp-palette-disabled", !opts.showPalette);
            container.toggleClass("sp-palette-only", opts.showPaletteOnly);
            container.toggleClass("sp-initial-disabled", !opts.showInitial);
            container.addClass(opts.className).addClass(opts.containerClassName);

            reflow();
        }

        function initialize() {

            if (IE) {
                container.find("*:not(input)").attr("unselectable", "on");
            }

            applyOptions();

            if (shouldReplace) {
                boundElement.after(replacer).hide();
            }

            if (!allowEmpty) {
                clearButton.hide();
            }

            if (flat) {
                boundElement.after(container).hide();
            }
            else {

                var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
                if (appendTo.length !== 1) {
                    appendTo = $("body");
                }

                appendTo.append(container);
            }

            updateSelectionPaletteFromStorage();

            offsetElement.on("click.spectrum touchstart.spectrum", function (e) {
                if (!disabled) {
                    toggle();
                }

                e.stopPropagation();

                if (!$(e.target).is("input")) {
                    e.preventDefault();
                }
            });

            if(boundElement.is(":disabled") || (opts.disabled === true)) {
                disable();
            }

            // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
            container.click(stopPropagation);

            // Handle user typed input
            textInput.change(setFromTextInput);
            textInput.on("paste", function () {
                setTimeout(setFromTextInput, 1);
            });
            textInput.keydown(function (e) { if (e.keyCode == 13) { setFromTextInput(); } });

            cancelButton.text(opts.cancelText);
            cancelButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                revert();
                hide();
            });

            clearButton.attr("title", opts.clearText);
            clearButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                isEmpty = true;
                move();

                if(flat) {
                    //for the flat style, this is a change event
                    updateOriginalInput(true);
                }
            });

            chooseButton.text(opts.chooseText);
            chooseButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (IE && textInput.is(":focus")) {
                    textInput.trigger('change');
                }

                if (isValid()) {
                    updateOriginalInput(true);
                    hide();
                }
            });

            toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
            toggleButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                opts.showPaletteOnly = !opts.showPaletteOnly;

                // To make sure the Picker area is drawn on the right, next to the
                // Palette area (and not below the palette), first move the Palette
                // to the left to make space for the picker, plus 5px extra.
                // The 'applyOptions' function puts the whole container back into place
                // and takes care of the button-text and the sp-palette-only CSS class.
                if (!opts.showPaletteOnly && !flat) {
                    container.css('left', '-=' + (pickerContainer.outerWidth(true) + 5));
                }
                applyOptions();
            });

            draggable(alphaSlider, function (dragX, dragY, e) {
                currentAlpha = (dragX / alphaWidth);
                isEmpty = false;
                if (e.shiftKey) {
                    currentAlpha = Math.round(currentAlpha * 10) / 10;
                }

                move();
            }, dragStart, dragStop);

            draggable(slider, function (dragX, dragY) {
                currentHue = parseFloat(dragY / slideHeight);
                isEmpty = false;
                if (!opts.showAlpha) {
                    currentAlpha = 1;
                }
                move();
            }, dragStart, dragStop);

            draggable(dragger, function (dragX, dragY, e) {

                // shift+drag should snap the movement to either the x or y axis.
                if (!e.shiftKey) {
                    shiftMovementDirection = null;
                }
                else if (!shiftMovementDirection) {
                    var oldDragX = currentSaturation * dragWidth;
                    var oldDragY = dragHeight - (currentValue * dragHeight);
                    var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);

                    shiftMovementDirection = furtherFromX ? "x" : "y";
                }

                var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
                var setValue = !shiftMovementDirection || shiftMovementDirection === "y";

                if (setSaturation) {
                    currentSaturation = parseFloat(dragX / dragWidth);
                }
                if (setValue) {
                    currentValue = parseFloat((dragHeight - dragY) / dragHeight);
                }

                isEmpty = false;
                if (!opts.showAlpha) {
                    currentAlpha = 1;
                }

                move();

            }, dragStart, dragStop);

            if (!!initialColor) {
                set(initialColor);

                // In case color was black - update the preview UI and set the format
                // since the set function will not run (default color is black).
                updateUI();
                currentPreferredFormat = opts.preferredFormat || tinycolor(initialColor).format;

                addColorToSelectionPalette(initialColor);
            }
            else {
                updateUI();
            }

            if (flat) {
                show();
            }

            function paletteElementClick(e) {
                if (e.data && e.data.ignore) {
                    set($(e.target).closest(".sp-thumb-el").data("color"));
                    move();
                }
                else {
                    set($(e.target).closest(".sp-thumb-el").data("color"));
                    move();

                    // If the picker is going to close immediately, a palette selection
                    // is a change.  Otherwise, it's a move only.
                    if (opts.hideAfterPaletteSelect) {
                        updateOriginalInput(true);
                        hide();
                    } else {
                        updateOriginalInput();
                    }
                }

                return false;
            }

            var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            paletteContainer.on(paletteEvent, ".sp-thumb-el", paletteElementClick);
            initialColorContainer.on(paletteEvent, ".sp-thumb-el:nth-child(1)", { ignore: true }, paletteElementClick);
        }

        function updateSelectionPaletteFromStorage() {

            if (localStorageKey && window.localStorage) {

                // Migrate old palettes over to new format.  May want to remove this eventually.
                try {
                    var oldPalette = window.localStorage[localStorageKey].split(",#");
                    if (oldPalette.length > 1) {
                        delete window.localStorage[localStorageKey];
                        $.each(oldPalette, function(i, c) {
                             addColorToSelectionPalette(c);
                        });
                    }
                }
                catch(e) { }

                try {
                    selectionPalette = window.localStorage[localStorageKey].split(";");
                }
                catch (e) { }
            }
        }

        function addColorToSelectionPalette(color) {
            if (showSelectionPalette) {
                var rgb = tinycolor(color).toRgbString();
                if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
                    selectionPalette.push(rgb);
                    while(selectionPalette.length > maxSelectionSize) {
                        selectionPalette.shift();
                    }
                }

                if (localStorageKey && window.localStorage) {
                    try {
                        window.localStorage[localStorageKey] = selectionPalette.join(";");
                    }
                    catch(e) { }
                }
            }
        }

        function getUniqueSelectionPalette() {
            var unique = [];
            if (opts.showPalette) {
                for (var i = 0; i < selectionPalette.length; i++) {
                    var rgb = tinycolor(selectionPalette[i]).toRgbString();

                    if (!paletteLookup[rgb]) {
                        unique.push(selectionPalette[i]);
                    }
                }
            }

            return unique.reverse().slice(0, opts.maxSelectionSize);
        }

        function drawPalette() {

            var currentColor = get();

            var html = $.map(paletteArray, function (palette, i) {
                return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts);
            });

            updateSelectionPaletteFromStorage();

            if (selectionPalette) {
                html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts));
            }

            paletteContainer.html(html.join(""));
        }

        function drawInitial() {
            if (opts.showInitial) {
                var initial = colorOnShow;
                var current = get();
                initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts));
            }
        }

        function dragStart() {
            if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
                reflow();
            }
            isDragging = true;
            container.addClass(draggingClass);
            shiftMovementDirection = null;
            boundElement.trigger('dragstart.spectrum', [ get() ]);
        }

        function dragStop() {
            isDragging = false;
            container.removeClass(draggingClass);
            boundElement.trigger('dragstop.spectrum', [ get() ]);
        }

        function setFromTextInput() {

            var value = textInput.val();

            if ((value === null || value === "") && allowEmpty) {
                set(null);
                move();
                updateOriginalInput();
            }
            else {
                var tiny = tinycolor(value);
                if (tiny.isValid()) {
                    set(tiny);
                    move();
                    updateOriginalInput();
                }
                else {
                    textInput.addClass("sp-validation-error");
                }
            }
        }

        function toggle() {
            if (visible) {
                hide();
            }
            else {
                show();
            }
        }

        function show() {
            var event = $.Event('beforeShow.spectrum');

            if (visible) {
                reflow();
                return;
            }

            boundElement.trigger(event, [ get() ]);

            if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
                return;
            }

            hideAll();
            visible = true;

            $(doc).on("keydown.spectrum", onkeydown);
            $(doc).on("click.spectrum", clickout);
            $(window).on("resize.spectrum", resize);
            replacer.addClass("sp-active");
            container.removeClass("sp-hidden");

            reflow();
            updateUI();

            colorOnShow = get();

            drawInitial();
            callbacks.show(colorOnShow);
            boundElement.trigger('show.spectrum', [ colorOnShow ]);
        }

        function onkeydown(e) {
            // Close on ESC
            if (e.keyCode === 27) {
                hide();
            }
        }

        function clickout(e) {
            // Return on right click.
            if (e.button == 2) { return; }

            // If a drag event was happening during the mouseup, don't hide
            // on click.
            if (isDragging) { return; }

            if (clickoutFiresChange) {
                updateOriginalInput(true);
            }
            else {
                revert();
            }
            hide();
        }

        function hide() {
            // Return if hiding is unnecessary
            if (!visible || flat) { return; }
            visible = false;

            $(doc).off("keydown.spectrum", onkeydown);
            $(doc).off("click.spectrum", clickout);
            $(window).off("resize.spectrum", resize);

            replacer.removeClass("sp-active");
            container.addClass("sp-hidden");

            callbacks.hide(get());
            boundElement.trigger('hide.spectrum', [ get() ]);
        }

        function revert() {
            set(colorOnShow, true);
            updateOriginalInput(true);
        }

        function set(color, ignoreFormatChange) {
            if (tinycolor.equals(color, get())) {
                // Update UI just in case a validation error needs
                // to be cleared.
                updateUI();
                return;
            }

            var newColor, newHsv;
            if (!color && allowEmpty) {
                isEmpty = true;
            } else {
                isEmpty = false;
                newColor = tinycolor(color);
                newHsv = newColor.toHsv();

                currentHue = (newHsv.h % 360) / 360;
                currentSaturation = newHsv.s;
                currentValue = newHsv.v;
                currentAlpha = newHsv.a;
            }
            updateUI();

            if (newColor && newColor.isValid() && !ignoreFormatChange) {
                currentPreferredFormat = opts.preferredFormat || newColor.getFormat();
            }
        }

        function get(opts) {
            opts = opts || { };

            if (allowEmpty && isEmpty) {
                return null;
            }

            return tinycolor.fromRatio({
                h: currentHue,
                s: currentSaturation,
                v: currentValue,
                a: Math.round(currentAlpha * 1000) / 1000
            }, { format: opts.format || currentPreferredFormat });
        }

        function isValid() {
            return !textInput.hasClass("sp-validation-error");
        }

        function move() {
            updateUI();

            callbacks.move(get());
            boundElement.trigger('move.spectrum', [ get() ]);
        }

        function updateUI() {

            textInput.removeClass("sp-validation-error");

            updateHelperLocations();

            // Update dragger background color (gradients take care of saturation and value).
            var flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
            dragger.css("background-color", flatColor.toHexString());

            // Get a format that alpha will be included in (hex and names ignore alpha)
            var format = currentPreferredFormat;
            if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
                if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
                    format = "rgb";
                }
            }

            var realColor = get({ format: format }),
                displayColor = '';

             //reset background info for preview element
            previewElement.removeClass("sp-clear-display");
            previewElement.css('background-color', 'transparent');

            if (!realColor && allowEmpty) {
                // Update the replaced elements background with icon indicating no color selection
                previewElement.addClass("sp-clear-display");
            }
            else {
                var realHex = realColor.toHexString(),
                    realRgb = realColor.toRgbString();

                // Update the replaced elements background color (with actual selected color)
                if (rgbaSupport || realColor.alpha === 1) {
                    previewElement.css("background-color", realRgb);
                }
                else {
                    previewElement.css("background-color", "transparent");
                    previewElement.css("filter", realColor.toFilter());
                }

                if (opts.showAlpha) {
                    var rgb = realColor.toRgb();
                    rgb.a = 0;
                    var realAlpha = tinycolor(rgb).toRgbString();
                    var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

                    if (IE) {
                        alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
                    }
                    else {
                        alphaSliderInner.css("background", "-webkit-" + gradient);
                        alphaSliderInner.css("background", "-moz-" + gradient);
                        alphaSliderInner.css("background", "-ms-" + gradient);
                        // Use current syntax gradient on unprefixed property.
                        alphaSliderInner.css("background",
                            "linear-gradient(to right, " + realAlpha + ", " + realHex + ")");
                    }
                }

                displayColor = realColor.toString(format);
            }

            // Update the text entry input as it changes happen
            if (opts.showInput) {
                textInput.val(displayColor);
            }

            if (opts.showPalette) {
                drawPalette();
            }

            drawInitial();
        }

        function updateHelperLocations() {
            var s = currentSaturation;
            var v = currentValue;

            if(allowEmpty && isEmpty) {
                //if selected color is empty, hide the helpers
                alphaSlideHelper.hide();
                slideHelper.hide();
                dragHelper.hide();
            }
            else {
                //make sure helpers are visible
                alphaSlideHelper.show();
                slideHelper.show();
                dragHelper.show();

                // Where to show the little circle in that displays your current selected color
                var dragX = s * dragWidth;
                var dragY = dragHeight - (v * dragHeight);
                dragX = Math.max(
                    -dragHelperHeight,
                    Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight)
                );
                dragY = Math.max(
                    -dragHelperHeight,
                    Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight)
                );
                dragHelper.css({
                    "top": dragY + "px",
                    "left": dragX + "px"
                });

                var alphaX = currentAlpha * alphaWidth;
                alphaSlideHelper.css({
                    "left": (alphaX - (alphaSlideHelperWidth / 2)) + "px"
                });

                // Where to show the bar that displays your current selected hue
                var slideY = (currentHue) * slideHeight;
                slideHelper.css({
                    "top": (slideY - slideHelperHeight) + "px"
                });
            }
        }

        function updateOriginalInput(fireCallback) {
            var color = get(),
                displayColor = '',
                hasChanged = !tinycolor.equals(color, colorOnShow);

            if (color) {
                displayColor = color.toString(currentPreferredFormat);
                // Update the selection palette with the current color
                addColorToSelectionPalette(color);
            }

            if (isInput) {
                boundElement.val(displayColor);
            }

            if (fireCallback && hasChanged) {
                callbacks.change(color);
                boundElement.trigger('change', [ color ]);
            }
        }

        function reflow() {
            if (!visible) {
                return; // Calculations would be useless and wouldn't be reliable anyways
            }
            dragWidth = dragger.width();
            dragHeight = dragger.height();
            dragHelperHeight = dragHelper.height();
            slideWidth = slider.width();
            slideHeight = slider.height();
            slideHelperHeight = slideHelper.height();
            alphaWidth = alphaSlider.width();
            alphaSlideHelperWidth = alphaSlideHelper.width();

            if (!flat) {
                container.css("position", "absolute");
                if (opts.offset) {
                    container.offset(opts.offset);
                } else {
                    container.offset(getOffset(container, offsetElement));
                }
            }

            updateHelperLocations();

            if (opts.showPalette) {
                drawPalette();
            }

            boundElement.trigger('reflow.spectrum');
        }

        function destroy() {
            boundElement.show();
            offsetElement.off("click.spectrum touchstart.spectrum");
            container.remove();
            replacer.remove();
            spectrums[spect.id] = null;
        }

        function option(optionName, optionValue) {
            if (optionName === undefined) {
                return $.extend({}, opts);
            }
            if (optionValue === undefined) {
                return opts[optionName];
            }

            opts[optionName] = optionValue;

            if (optionName === "preferredFormat") {
                currentPreferredFormat = opts.preferredFormat;
            }
            applyOptions();
        }

        function enable() {
            disabled = false;
            boundElement.attr("disabled", false);
            offsetElement.removeClass("sp-disabled");
        }

        function disable() {
            hide();
            disabled = true;
            boundElement.attr("disabled", true);
            offsetElement.addClass("sp-disabled");
        }

        function setOffset(coord) {
            opts.offset = coord;
            reflow();
        }

        initialize();

        var spect = {
            show: show,
            hide: hide,
            toggle: toggle,
            reflow: reflow,
            option: option,
            enable: enable,
            disable: disable,
            offset: setOffset,
            set: function (c) {
                set(c);
                updateOriginalInput();
            },
            get: get,
            destroy: destroy,
            container: container
        };

        spect.id = spectrums.push(spect) - 1;

        return spect;
    }

    /**
    * checkOffset - get the offset below/above and left/right element depending on screen position
    * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
    */
    function getOffset(picker, input) {
        var extraY = 0;
        var dpWidth = picker.outerWidth();
        var dpHeight = picker.outerHeight();
        var inputHeight = input.outerHeight();
        var doc = picker[0].ownerDocument;
        var docElem = doc.documentElement;
        var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
        var viewHeight = docElem.clientHeight + $(doc).scrollTop();
        var offset = input.offset();
        var offsetLeft = offset.left;
        var offsetTop = offset.top;

        offsetTop += inputHeight;

        offsetLeft -=
            Math.min(offsetLeft, (offsetLeft + dpWidth > viewWidth && viewWidth > dpWidth) ?
            Math.abs(offsetLeft + dpWidth - viewWidth) : 0);

        offsetTop -=
            Math.min(offsetTop, ((offsetTop + dpHeight > viewHeight && viewHeight > dpHeight) ?
            Math.abs(dpHeight + inputHeight - extraY) : extraY));

        return {
            top: offsetTop,
            bottom: offset.bottom,
            left: offsetLeft,
            right: offset.right,
            width: offset.width,
            height: offset.height
        };
    }

    /**
    * noop - do nothing
    */
    function noop() {

    }

    /**
    * stopPropagation - makes the code only doing this a little easier to read in line
    */
    function stopPropagation(e) {
        e.stopPropagation();
    }

    /**
    * Create a function bound to a given object
    * Thanks to underscore.js
    */
    function bind(func, obj) {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 2);
        return function () {
            return func.apply(obj, args.concat(slice.call(arguments)));
        };
    }

    /**
    * Lightweight drag helper.  Handles containment within the element, so that
    * when dragging, the x is within [0,element.width] and y is within [0,element.height]
    */
    function draggable(element, onmove, onstart, onstop) {
        onmove = onmove || function () { };
        onstart = onstart || function () { };
        onstop = onstop || function () { };
        var doc = document;
        var dragging = false;
        var offset = {};
        var maxHeight = 0;
        var maxWidth = 0;
        var hasTouch = ('ontouchstart' in window);

        var duringDragEvents = {};
        duringDragEvents["selectstart"] = prevent;
        duringDragEvents["dragstart"] = prevent;
        duringDragEvents["touchmove mousemove"] = move;
        duringDragEvents["touchend mouseup"] = stop;

        function prevent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function move(e) {
            if (dragging) {
                // Mouseup happened outside of window
                if (IE && doc.documentMode < 9 && !e.button) {
                    return stop();
                }

                var t0 = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
                var pageX = t0 && t0.pageX || e.pageX;
                var pageY = t0 && t0.pageY || e.pageY;

                var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
                var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

                if (hasTouch) {
                    // Stop scrolling in iOS
                    prevent(e);
                }

                onmove.apply(element, [dragX, dragY, e]);
            }
        }

        function start(e) {
            var rightclick = (e.which) ? (e.which == 3) : (e.button == 2);

            if (!rightclick && !dragging) {
                if (onstart.apply(element, arguments) !== false) {
                    dragging = true;
                    maxHeight = $(element).height();
                    maxWidth = $(element).width();
                    offset = $(element).offset();

                    $(doc).on(duringDragEvents);
                    $(doc.body).addClass("sp-dragging");

                    move(e);

                    prevent(e);
                }
            }
        }

        function stop() {
            if (dragging) {
                $(doc).off(duringDragEvents);
                $(doc.body).removeClass("sp-dragging");

                // Wait a tick before notifying observers to allow the click event
                // to fire in Chrome.
                setTimeout(function() {
                    onstop.apply(element, arguments);
                }, 0);
            }
            dragging = false;
        }

        $(element).on("touchstart mousedown", start);
    }

    function throttle(func, wait, debounce) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var throttler = function () {
                timeout = null;
                func.apply(context, args);
            };
            if (debounce) clearTimeout(timeout);
            if (debounce || !timeout) timeout = setTimeout(throttler, wait);
        };
    }

    function inputTypeColorSupport() {
        return $.fn.spectrum.inputTypeColorSupport();
    }

    /**
    * Define a jQuery plugin
    */
    var dataID = "spectrum.id";
    $.fn.spectrum = function (opts, extra) {

        if (typeof opts == "string") {

            var returnValue = this;
            var args = Array.prototype.slice.call( arguments, 1 );

            this.each(function () {
                var spect = spectrums[$(this).data(dataID)];
                if (spect) {
                    var method = spect[opts];
                    if (!method) {
                        throw new Error( "Spectrum: no such method: '" + opts + "'" );
                    }

                    if (opts == "get") {
                        returnValue = spect.get();
                    }
                    else if (opts == "container") {
                        returnValue = spect.container;
                    }
                    else if (opts == "option") {
                        returnValue = spect.option.apply(spect, args);
                    }
                    else if (opts == "destroy") {
                        spect.destroy();
                        $(this).removeData(dataID);
                    }
                    else {
                        method.apply(spect, args);
                    }
                }
            });

            return returnValue;
        }

        // Initializing a new instance of spectrum
        return this.spectrum("destroy").each(function () {
            var options = $.extend({}, $(this).data(), opts);
            var spect = spectrum(this, options);
            $(this).data(dataID, spect.id);
        });
    };

    $.fn.spectrum.load = true;
    $.fn.spectrum.loadOpts = {};
    $.fn.spectrum.draggable = draggable;
    $.fn.spectrum.defaults = defaultOpts;
    $.fn.spectrum.inputTypeColorSupport = function inputTypeColorSupport() {
        if (typeof inputTypeColorSupport._cachedResult === "undefined") {
            var colorInput = $("<input type='color'/>")[0]; // if color element is supported, value will default to not null
            inputTypeColorSupport._cachedResult = colorInput.type === "color" && colorInput.value !== "";
        }
        return inputTypeColorSupport._cachedResult;
    };

    $.spectrum = { };
    $.spectrum.localization = { };
    $.spectrum.palettes = { };

    $.fn.spectrum.processNativeColorInputs = function () {
        var colorInputs = $("input[type=color]");
        if (colorInputs.length && !inputTypeColorSupport()) {
            colorInputs.spectrum({
                preferredFormat: "hex6"
            });
        }
    };

    // TinyColor v1.1.2
    // https://github.com/bgrins/TinyColor
    // Brian Grinstead, MIT License

    (function() {

    var trimLeft = /^[\s,#]+/,
        trimRight = /\s+$/,
        tinyCounter = 0,
        math = Math,
        mathRound = math.round,
        mathMin = math.min,
        mathMax = math.max,
        mathRandom = math.random;

    var tinycolor = function(color, opts) {

        color = (color) ? color : '';
        opts = opts || { };

        // If input is already a tinycolor, return itself
        if (color instanceof tinycolor) {
           return color;
        }
        // If we are called as a function, call using new instead
        if (!(this instanceof tinycolor)) {
            return new tinycolor(color, opts);
        }

        var rgb = inputToRGB(color);
        this._originalInput = color;
        this._r = rgb.r;
        this._g = rgb.g;
        this._b = rgb.b;
        this._a = rgb.a;
        this._roundA = mathRound(1000 * this._a) / 1000;
        this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;

        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this._r < 1) { this._r = mathRound(this._r); }
        if (this._g < 1) { this._g = mathRound(this._g); }
        if (this._b < 1) { this._b = mathRound(this._b); }

        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
    };

    tinycolor.prototype = {
        isDark: function() {
            return this.getBrightness() < 128;
        },
        isLight: function() {
            return !this.isDark();
        },
        isValid: function() {
            return this._ok;
        },
        getOriginalInput: function() {
          return this._originalInput;
        },
        getFormat: function() {
            return this._format;
        },
        getAlpha: function() {
            return this._a;
        },
        getBrightness: function() {
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        setAlpha: function(value) {
            this._a = boundAlpha(value);
            this._roundA = mathRound(1000 * this._a) / 1000;
            return this;
        },
        toHsv: function() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
        },
        toHsvString: function() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
            return (this._a == 1) ?
              "hsv("  + h + ", " + s + "%, " + v + "%)" :
              "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
        },
        toHsl: function() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
        },
        toHslString: function() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
            return (this._a == 1) ?
              "hsl("  + h + ", " + s + "%, " + l + "%)" :
              "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
        },
        toHex: function(allow3Char) {
            return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function(allow3Char) {
            return '#' + this.toHex(allow3Char);
        },
        toHex8: function() {
            return rgbaToHex(this._r, this._g, this._b, this._a);
        },
        toHex8String: function() {
            return '#' + this.toHex8();
        },
        toRgb: function() {
            return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
        },
        toRgbString: function() {
            return (this._a == 1) ?
              "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
              "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function() {
            return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
        },
        toPercentageRgbString: function() {
            return (this._a == 1) ?
              "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
              "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function() {
            if (this._a === 0) {
                return "transparent";
            }

            if (this._a < 1) {
                return false;
            }

            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function(secondColor) {
            var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
            var secondHex8String = hex8String;
            var gradientType = this._gradientType ? "GradientType = 1, " : "";

            if (secondColor) {
                var s = tinycolor(secondColor);
                secondHex8String = s.toHex8String();
            }

            return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
        },
        toString: function(format) {
            var formatSet = !!format;
            format = format || this._format;

            var formattedString = false;
            var hasAlpha = this._a < 1 && this._a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

            if (needsAlphaFormat) {
                // Special case for "transparent", all other non-alpha formats
                // will return rgba when there is transparency.
                if (format === "name" && this._a === 0) {
                    return this.toName();
                }
                return this.toRgbString();
            }
            if (format === "rgb") {
                formattedString = this.toRgbString();
            }
            if (format === "prgb") {
                formattedString = this.toPercentageRgbString();
            }
            if (format === "hex" || format === "hex6") {
                formattedString = this.toHexString();
            }
            if (format === "hex3") {
                formattedString = this.toHexString(true);
            }
            if (format === "hex8") {
                formattedString = this.toHex8String();
            }
            if (format === "name") {
                formattedString = this.toName();
            }
            if (format === "hsl") {
                formattedString = this.toHslString();
            }
            if (format === "hsv") {
                formattedString = this.toHsvString();
            }

            return formattedString || this.toHexString();
        },

        _applyModification: function(fn, args) {
            var color = fn.apply(null, [this].concat([].slice.call(args)));
            this._r = color._r;
            this._g = color._g;
            this._b = color._b;
            this.setAlpha(color._a);
            return this;
        },
        lighten: function() {
            return this._applyModification(lighten, arguments);
        },
        brighten: function() {
            return this._applyModification(brighten, arguments);
        },
        darken: function() {
            return this._applyModification(darken, arguments);
        },
        desaturate: function() {
            return this._applyModification(desaturate, arguments);
        },
        saturate: function() {
            return this._applyModification(saturate, arguments);
        },
        greyscale: function() {
            return this._applyModification(greyscale, arguments);
        },
        spin: function() {
            return this._applyModification(spin, arguments);
        },

        _applyCombination: function(fn, args) {
            return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function() {
            return this._applyCombination(analogous, arguments);
        },
        complement: function() {
            return this._applyCombination(complement, arguments);
        },
        monochromatic: function() {
            return this._applyCombination(monochromatic, arguments);
        },
        splitcomplement: function() {
            return this._applyCombination(splitcomplement, arguments);
        },
        triad: function() {
            return this._applyCombination(triad, arguments);
        },
        tetrad: function() {
            return this._applyCombination(tetrad, arguments);
        }
    };

    // If input is an object, force 1 into "1.0" to handle ratios properly
    // String input requires "1.0" as input, so 1 will be treated as 1
    tinycolor.fromRatio = function(color, opts) {
        if (typeof color == "object") {
            var newColor = {};
            for (var i in color) {
                if (color.hasOwnProperty(i)) {
                    if (i === "a") {
                        newColor[i] = color[i];
                    }
                    else {
                        newColor[i] = convertToPercentage(color[i]);
                    }
                }
            }
            color = newColor;
        }

        return tinycolor(color, opts);
    };

    // Given a string or object, convert that input to RGB
    // Possible string inputs:
    //
    //     "red"
    //     "#f00" or "f00"
    //     "#ff0000" or "ff0000"
    //     "#ff000000" or "ff000000"
    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
    //
    function inputToRGB(color) {

        var rgb = { r: 0, g: 0, b: 0 };
        var a = 1;
        var ok = false;
        var format = false;

        if (typeof color == "string") {
            color = stringInputToObject(color);
        }

        if (typeof color == "object") {
            if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
                rgb = rgbToRgb(color.r, color.g, color.b);
                ok = true;
                format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            }
            else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
                color.s = convertToPercentage(color.s);
                color.v = convertToPercentage(color.v);
                rgb = hsvToRgb(color.h, color.s, color.v);
                ok = true;
                format = "hsv";
            }
            else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
                color.s = convertToPercentage(color.s);
                color.l = convertToPercentage(color.l);
                rgb = hslToRgb(color.h, color.s, color.l);
                ok = true;
                format = "hsl";
            }

            if (color.hasOwnProperty("a")) {
                a = color.a;
            }
        }

        a = boundAlpha(a);

        return {
            ok: ok,
            format: color.format || format,
            r: mathMin(255, mathMax(rgb.r, 0)),
            g: mathMin(255, mathMax(rgb.g, 0)),
            b: mathMin(255, mathMax(rgb.b, 0)),
            a: a
        };
    }


    // Conversion Functions
    // --------------------

    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

    // `rgbToRgb`
    // Handle bounds / percentage checking to conform to CSS color spec
    // <http://www.w3.org/TR/css3-color/>
    // *Assumes:* r, g, b in [0, 255] or [0, 1]
    // *Returns:* { r, g, b } in [0, 255]
    function rgbToRgb(r, g, b){
        return {
            r: bound01(r, 255) * 255,
            g: bound01(g, 255) * 255,
            b: bound01(b, 255) * 255
        };
    }

    // `rgbToHsl`
    // Converts an RGB color value to HSL.
    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
    // *Returns:* { h, s, l } in [0,1]
    function rgbToHsl(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return { h: h, s: s, l: l };
    }

    // `hslToRgb`
    // Converts an HSL color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hslToRgb(h, s, l) {
        var r, g, b;

        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        if(s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHsv`
    // Converts an RGB color value to HSV
    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
    // *Returns:* { h, s, v } in [0,1]
    function rgbToHsv(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if(max == min) {
            h = 0; // achromatic
        }
        else {
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: h, s: s, v: v };
    }

    // `hsvToRgb`
    // Converts an HSV color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
     function hsvToRgb(h, s, v) {

        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);

        var i = math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 3 or 6 character hex
    function rgbToHex(r, g, b, allow3Char) {

        var hex = [
            pad2(mathRound(r).toString(16)),
            pad2(mathRound(g).toString(16)),
            pad2(mathRound(b).toString(16))
        ];

        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }

        return hex.join("");
    }
        // `rgbaToHex`
        // Converts an RGBA color plus alpha transparency to hex
        // Assumes r, g, b and a are contained in the set [0, 255]
        // Returns an 8 character hex
        function rgbaToHex(r, g, b, a) {

            var hex = [
                pad2(convertDecimalToHex(a)),
                pad2(mathRound(r).toString(16)),
                pad2(mathRound(g).toString(16)),
                pad2(mathRound(b).toString(16))
            ];

            return hex.join("");
        }

    // `equals`
    // Can be called with any tinycolor input
    tinycolor.equals = function (color1, color2) {
        if (!color1 || !color2) { return false; }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
    };
    tinycolor.random = function() {
        return tinycolor.fromRatio({
            r: mathRandom(),
            g: mathRandom(),
            b: mathRandom()
        });
    };


    // Modification Functions
    // ----------------------
    // Thanks to less.js for some of the basics here
    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

    function desaturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function saturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function greyscale(color) {
        return tinycolor(color).desaturate(100);
    }

    function lighten (color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    function brighten(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
        return tinycolor(rgb);
    }

    function darken (color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
    // Values outside of this range will be wrapped into this range.
    function spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (mathRound(hsl.h) + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
    }

    // Combination Functions
    // ---------------------
    // Thanks to jQuery xColor for some of the ideas behind these
    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

    function complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
    }

    function triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
        ];
    }

    function tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
        ];
    }

    function splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
            tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
        ];
    }

    function analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;

        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];

        for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor(hsl));
        }
        return ret;
    }

    function monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h, s = hsv.s, v = hsv.v;
        var ret = [];
        var modification = 1 / results;

        while (results--) {
            ret.push(tinycolor({ h: h, s: s, v: v}));
            v = (v + modification) % 1;
        }

        return ret;
    }

    // Utility Functions
    // ---------------------

    tinycolor.mix = function(color1, color2, amount) {
        amount = (amount === 0) ? 0 : (amount || 50);

        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();

        var p = amount / 100;
        var w = p * 2 - 1;
        var a = rgb2.a - rgb1.a;

        var w1;

        if (w * a == -1) {
            w1 = w;
        } else {
            w1 = (w + a) / (1 + w * a);
        }

        w1 = (w1 + 1) / 2;

        var w2 = 1 - w1;

        var rgba = {
            r: rgb2.r * w1 + rgb1.r * w2,
            g: rgb2.g * w1 + rgb1.g * w2,
            b: rgb2.b * w1 + rgb1.b * w2,
            a: rgb2.a * p  + rgb1.a * (1 - p)
        };

        return tinycolor(rgba);
    };


    // Readability Functions
    // ---------------------
    // <http://www.w3.org/TR/AERT#color-contrast>

    // `readability`
    // Analyze the 2 colors and returns an object with the following properties:
    //    `brightness`: difference in brightness between the two colors
    //    `color`: difference in color/hue between the two colors
    tinycolor.readability = function(color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        var rgb1 = c1.toRgb();
        var rgb2 = c2.toRgb();
        var brightnessA = c1.getBrightness();
        var brightnessB = c2.getBrightness();
        var colorDiff = (
            Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) +
            Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) +
            Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b)
        );

        return {
            brightness: Math.abs(brightnessA - brightnessB),
            color: colorDiff
        };
    };

    // `readable`
    // http://www.w3.org/TR/AERT#color-contrast
    // Ensure that foreground and background color combinations provide sufficient contrast.
    // *Example*
    //    tinycolor.isReadable("#000", "#111") => false
    tinycolor.isReadable = function(color1, color2) {
        var readability = tinycolor.readability(color1, color2);
        return readability.brightness > 125 && readability.color > 500;
    };

    // `mostReadable`
    // Given a base color and a list of possible foreground or background
    // colors for that base, returns the most readable color.
    // *Example*
    //    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
    tinycolor.mostReadable = function(baseColor, colorList) {
        var bestColor = null;
        var bestScore = 0;
        var bestIsReadable = false;
        for (var i=0; i < colorList.length; i++) {

            // We normalize both around the "acceptable" breaking point,
            // but rank brightness constrast higher than hue.

            var readability = tinycolor.readability(baseColor, colorList[i]);
            var readable = readability.brightness > 125 && readability.color > 500;
            var score = 3 * (readability.brightness / 125) + (readability.color / 500);

            if ((readable && ! bestIsReadable) ||
                (readable && bestIsReadable && score > bestScore) ||
                ((! readable) && (! bestIsReadable) && score > bestScore)) {
                bestIsReadable = readable;
                bestScore = score;
                bestColor = tinycolor(colorList[i]);
            }
        }
        return bestColor;
    };


    // Big List of Colors
    // ------------------
    // <http://www.w3.org/TR/css3-color/#svg-color>
    var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    };

    // Make it easy to access colors via `hexNames[hex]`
    var hexNames = tinycolor.hexNames = flip(names);


    // Utilities
    // ---------

    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
    function flip(o) {
        var flipped = { };
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                flipped[o[i]] = i;
            }
        }
        return flipped;
    }

    // Return a valid alpha value [0,1] with all invalid values being set to 1
    function boundAlpha(a) {
        a = parseFloat(a);

        if (isNaN(a) || a < 0 || a > 1) {
            a = 1;
        }

        return a;
    }

    // Take input from [0, n] and return it as [0, 1]
    function bound01(n, max) {
        if (isOnePointZero(n)) { n = "100%"; }

        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));

        // Automatically convert percentage into number
        if (processPercent) {
            n = parseInt(n * max, 10) / 100;
        }

        // Handle floating point rounding errors
        if ((math.abs(n - max) < 0.000001)) {
            return 1;
        }

        // Convert into [0, 1] range if it isn't already
        return (n % max) / parseFloat(max);
    }

    // Force a number between 0 and 1
    function clamp01(val) {
        return mathMin(1, mathMax(0, val));
    }

    // Parse a base-16 hex value into a base-10 integer
    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }

    // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
    function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
    }

    // Check to see if string passed in is a percentage
    function isPercentage(n) {
        return typeof n === "string" && n.indexOf('%') != -1;
    }

    // Force a hex value to have 2 characters
    function pad2(c) {
        return c.length == 1 ? '0' + c : '' + c;
    }

    // Replace a decimal with it's percentage value
    function convertToPercentage(n) {
        if (n <= 1) {
            n = (n * 100) + "%";
        }

        return n;
    }

    // Converts a decimal to a hex value
    function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
    }
    // Converts a hex value to a decimal
    function convertHexToDecimal(h) {
        return (parseIntFromHex(h) / 255);
    }

    var matchers = (function() {

        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = "[-\\+]?\\d+%?";

        // <http://www.w3.org/TR/css3-values/#number-value>
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

        return {
            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
            hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
    })();

    // `stringInputToObject`
    // Permissive string parsing.  Take in a number of formats, and output an object
    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
    function stringInputToObject(color) {

        color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
        var named = false;
        if (names[color]) {
            color = names[color];
            named = true;
        }
        else if (color == 'transparent') {
            return { r: 0, g: 0, b: 0, a: 0, format: "name" };
        }

        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match;
        if ((match = matchers.rgb.exec(color))) {
            return { r: match[1], g: match[2], b: match[3] };
        }
        if ((match = matchers.rgba.exec(color))) {
            return { r: match[1], g: match[2], b: match[3], a: match[4] };
        }
        if ((match = matchers.hsl.exec(color))) {
            return { h: match[1], s: match[2], l: match[3] };
        }
        if ((match = matchers.hsla.exec(color))) {
            return { h: match[1], s: match[2], l: match[3], a: match[4] };
        }
        if ((match = matchers.hsv.exec(color))) {
            return { h: match[1], s: match[2], v: match[3] };
        }
        if ((match = matchers.hsva.exec(color))) {
            return { h: match[1], s: match[2], v: match[3], a: match[4] };
        }
        if ((match = matchers.hex8.exec(color))) {
            return {
                a: convertHexToDecimal(match[1]),
                r: parseIntFromHex(match[2]),
                g: parseIntFromHex(match[3]),
                b: parseIntFromHex(match[4]),
                format: named ? "name" : "hex8"
            };
        }
        if ((match = matchers.hex6.exec(color))) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                format: named ? "name" : "hex"
            };
        }
        if ((match = matchers.hex3.exec(color))) {
            return {
                r: parseIntFromHex(match[1] + '' + match[1]),
                g: parseIntFromHex(match[2] + '' + match[2]),
                b: parseIntFromHex(match[3] + '' + match[3]),
                format: named ? "name" : "hex"
            };
        }

        return false;
    }

    window.tinycolor = tinycolor;
    })();

    $(function () {
        if ($.fn.spectrum.load) {
            $.fn.spectrum.processNativeColorInputs();
        }
    });

});


/***/ }),

/***/ "./src/scripts/theme-editor.ts":
/*!*************************************!*\
  !*** ./src/scripts/theme-editor.ts ***!
  \*************************************/
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
const jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "jquery"));
const materialize_css_1 = __importDefault(__webpack_require__(/*! materialize-css */ "materialize-css"));
__webpack_require__(/*! spectrum-colorpicker */ "./node_modules/spectrum-colorpicker/spectrum.js");
const analytics_1 = __webpack_require__(/*! ./utils/analytics */ "./src/scripts/utils/analytics.ts");
const constants_1 = __webpack_require__(/*! ./utils/constants */ "./src/scripts/utils/constants.ts");
const default_icons_1 = __webpack_require__(/*! ./utils/default-icons */ "./src/scripts/utils/default-icons.ts");
const default_themes_1 = __webpack_require__(/*! ./utils/default-themes */ "./src/scripts/utils/default-themes.ts");
const dom_1 = __webpack_require__(/*! ./utils/dom */ "./src/scripts/utils/dom.ts");
const theme_model_1 = __webpack_require__(/*! ./utils/theme-model */ "./src/scripts/utils/theme-model.ts");
const schoologyPlusLogoImageUrl = chrome.runtime.getURL("/imgs/schoology-plus-wide.svg");
const schoologyLogoImageUrl = "https://ui.schoology.com/design-system/assets/schoology-logo-horizontal-white.884fbe559c66e06d28c5cfcbd4044f0e.svg";
const lausdLegacyImageUrl = chrome.runtime.getURL("/imgs/lausd-legacy.png");
const lausd2019ImageUrl = chrome.runtime.getURL("/imgs/lausd-2019.png");
const lausd2022ImageUrl = chrome.runtime.getURL("/imgs/lausd-2022.png");
const CURRENT_VERSION = theme_model_1.SchoologyTheme.CURRENT_VERSION;
const placeholderUrl = "https://via.placeholder.com/200x50?text=School+Logo";
var defaultDomain = "app.schoology.com";
var __storage = {};
function load() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        __storage = yield chrome.storage.sync.get(null);
        yield (0, analytics_1.initializeAnalytics)({
            documentContext: true,
            isAnalyticsEnabled: (0, dom_1.getBrowser)() !== "Firefox" && __storage.analytics !== "disabled",
            selectedTheme: (_a = __storage.theme) !== null && _a !== void 0 ? _a : "<unset>",
            selectedBeta: (_b = __storage.beta) !== null && _b !== void 0 ? _b : "<unset>",
            currentVersion: chrome.runtime.getManifest().version,
            newVersion: (_c = __storage.newVersion) !== null && _c !== void 0 ? _c : "<unset>",
            randomUserId: yield (0, analytics_1.getAnalyticsUserId)(),
            themeIsModern: (_d = document.documentElement.getAttribute("modern")) !== null && _d !== void 0 ? _d : "false",
        });
        defaultDomain = __storage.defaultDomain || "app.schoology.com";
        if (isLAUSD()) {
            (0, dom_1.setCSSVariable)("lausd-visible", "block");
            (0, dom_1.setCSSVariable)("lausd-hidden", "none");
        }
        else {
            (0, dom_1.setCSSVariable)("lausd-visible", "none");
            (0, dom_1.setCSSVariable)("lausd-hidden", "block");
        }
        jquery_1.default.fn.roundSlider.prototype._invertRange = true;
        (0, jquery_1.default)("#theme-hue").slider({
            min: 0,
            max: 359,
            slide: hueSliderEvent,
            stop: hueSliderEvent,
            change: hueSliderEvent,
        });
        (0, jquery_1.default)(colorRainbowHueValue).slider({
            min: 0,
            max: 359,
            slide: hueSliderEvent,
            stop: hueSliderEvent,
            change: hueSliderEvent,
        });
        (0, jquery_1.default)("#color-rainbow-hue-range").roundSlider({
            sliderType: "range",
            handleShape: "round",
            width: 15,
            radius: 75,
            value: "0,359",
            max: 359,
            startAngle: 90,
            drag: circleRangeSliderEvent,
            stop: circleRangeSliderEvent,
            change: circleRangeSliderEvent,
        });
        document.querySelector(".rs-tooltip").style.margin = "-15.5px 0 0 -33.0547px";
        (0, jquery_1.default)("#color-rainbow-saturation-range").slider({
            min: 0,
            max: 100,
            range: true,
            slide: rangeSliderEvent,
            stop: rangeSliderEvent,
            change: rangeSliderEvent,
            values: [0, 100],
        });
        (0, jquery_1.default)("#color-rainbow-lightness-range").slider({
            min: 0,
            max: 100,
            range: true,
            slide: rangeSliderEvent,
            stop: rangeSliderEvent,
            change: rangeSliderEvent,
            values: [0, 100],
        });
        let oninput = (e) => (document.getElementById(e.target.dataset.label).textContent = e.target.value);
        for (let input of document.querySelectorAll("input[type=range][data-label]")) {
            input.addEventListener("input", oninput);
            document.getElementById(input.dataset.label).textContent = input.value;
        }
        for (let t of default_themes_1.DEFAULT_THEMES) {
            defaultThemes.push(t.name);
            if (!isLAUSD() && default_themes_1.LAUSD_THEMES.includes(t.name)) {
                continue;
            }
            allThemes[t.name] = t;
        }
        chrome.storage.sync.get(["theme", "themes"], s => {
            // default theme is "Schoology Plus"
            s.theme = s.theme || constants_1.DEFAULT_THEME_NAME;
            for (let t of s.themes || []) {
                allThemes[t.name] = t;
            }
            for (let t in allThemes) {
                let themeItem = (0, dom_1.createElement)("a", ["collection-item", "theme-item"], {
                    dataset: {
                        theme: t,
                    },
                    onclick: e => {
                        var _a, _b;
                        applyTheme(t);
                        for (let elem of (_b = (_a = themeItem.parentElement) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : []) {
                            elem.classList.remove("active");
                        }
                        themeItem.classList.add("active");
                    },
                }, [
                    (0, dom_1.createElement)("span", ["tooltipped"], {
                        textContent: t + (default_themes_1.CLASSIC_THEMES.includes(t) ? " (Classic)" : ""),
                        dataset: {
                            tooltip: t + (default_themes_1.CLASSIC_THEMES.includes(t) ? " (Classic)" : ""),
                        },
                    }),
                ]);
                let props = {
                    textContent: "check",
                    dataset: {
                        tooltip: "Apply Theme",
                    },
                    onclick: (e) => {
                        e.stopPropagation();
                        ConfirmModal.open("Apply Theme?", `Are you sure you want to apply the theme ${t}?`, ["Apply", "Cancel"], b => {
                            if (b === "Apply") {
                                (0, analytics_1.trackEvent)("button_click", {
                                    id: "apply-theme",
                                    context: "Theme List",
                                    value: t,
                                    legacyTarget: `Theme: ${t}`,
                                    legacyAction: "apply",
                                    legacyLabel: "Theme List",
                                });
                                chrome.storage.sync.set({ theme: t }, () => (location.href = `https://${defaultDomain}`));
                            }
                        });
                    },
                };
                let appliedProps = {
                    textContent: "star",
                    dataset: {
                        tooltip: "Theme Applied",
                    },
                    onclick: () => (location.href = `https://${defaultDomain}`),
                };
                function createActionButton(properties) {
                    return (0, dom_1.createElement)("i", ["material-icons", "right", "tooltipped"], properties);
                }
                let buttonsDiv = (0, dom_1.createElement)("div", ["right"]);
                buttonsDiv.style.width = "160px";
                themeItem.appendChild(buttonsDiv);
                buttonsDiv.appendChild(createActionButton(t == s.theme ? appliedProps : props));
                let shareButton = createActionButton({
                    textContent: "content_copy",
                    dataset: {
                        tooltip: "Copy Theme to Clipboard",
                    },
                });
                shareButton.addEventListener("click", e => {
                    copyThemeToClipboard(t);
                });
                buttonsDiv.appendChild(shareButton);
                if (!defaultThemes.includes(t)) {
                    buttonsDiv.appendChild(createActionButton({
                        textContent: "delete",
                        dataset: { tooltip: "Delete Theme" },
                        onclick: e => {
                            deleteTheme(t);
                            e.stopPropagation();
                        },
                    }));
                    buttonsDiv.appendChild(createActionButton({
                        textContent: "edit",
                        dataset: { tooltip: "Edit Theme" },
                        onclick: () => editTheme(t),
                    }));
                }
                themesList.appendChild(themeItem);
            }
            let selected = Array.from(themesList.children).find(x => x.dataset.theme == s.theme);
            (selected || themesList.firstElementChild).click();
            materialize_css_1.default.Tooltip.init(document.querySelectorAll(".tooltipped"), {
                outDuration: 0,
                inDuration: 300,
                enterDelay: 0,
                exitDelay: 10,
            });
            var elems = document.querySelectorAll(".fixed-action-btn");
            materialize_css_1.default.FloatingActionButton.init(elems, { direction: "left", hoverEnabled: false });
        });
    });
}
load();
function isLAUSD() {
    return defaultDomain === "lms.lausd.net";
}
var allThemes = {};
var defaultThemes = [];
var rainbowInterval = undefined;
var themeName = document.getElementById("theme-name");
var themeHue = document.getElementById("theme-hue");
var themePrimaryColor = document.getElementById("theme-primary-color");
var themeSecondaryColor = document.getElementById("theme-secondary-color");
var themeBackgroundColor = document.getElementById("theme-background-color");
var themeBorderColor = document.getElementById("theme-border-color");
var themeLinkColor = document.getElementById("theme-link-color");
var themeSchoologyPlusLogo = document.getElementById("theme-schoology-plus-logo");
var themeSchoologyLogo = document.getElementById("theme-schoology-logo");
var themeLAUSDLogo2022 = document.getElementById("theme-lausd-logo-2022");
var themeNewLAUSDLogo = document.getElementById("theme-new-lausd-logo");
var themeLAUSDLogo = document.getElementById("theme-lausd-logo");
var themeDefaultLogo = document.getElementById("theme-default-logo");
var themeCustomLogo = document.getElementById("theme-custom-logo");
var themeLogo = document.getElementById("theme-logo");
var themeCursor = document.getElementById("theme-cursor");
var themeColorHue = document.getElementById("theme-color-hue");
var themeColorCustom = document.getElementById("theme-color-custom");
var themeColorRainbow = document.getElementById("theme-color-rainbow");
var themeColorCustomWrapper = document.getElementById("theme-color-custom-wrapper");
var themeColorRainbowWrapper = document.getElementById("theme-color-rainbow-wrapper");
var colorRainbowHueAnimate = document.getElementById("color-rainbow-hue-animate");
var colorRainbowSaturationAnimate = document.getElementById("color-rainbow-saturation-animate");
var colorRainbowLightnessAnimate = document.getElementById("color-rainbow-lightness-animate");
var colorRainbowHueAnimateWrapper = document.getElementById("color-rainbow-hue-animate-wrapper");
var colorRainbowSaturationAnimateWrapper = document.getElementById("color-rainbow-saturation-animate-wrapper");
var colorRainbowLightnessAnimateWrapper = document.getElementById("color-rainbow-lightness-animate-wrapper");
var colorRainbowHueSpeed = document.getElementById("color-rainbow-hue-speed");
var colorRainbowHueValue = document.getElementById("color-rainbow-hue-value");
var colorRainbowHuePreview = document.getElementById("color-rainbow-hue-preview");
var colorRainbowSaturationSpeed = document.getElementById("color-rainbow-saturation-speed");
var colorRainbowSaturationValue = document.getElementById("color-rainbow-saturation-value");
var colorRainbowLightnessSpeed = document.getElementById("color-rainbow-lightness-speed");
var colorRainbowLightnessValue = document.getElementById("color-rainbow-lightness-value");
var colorRainbowHueAlternate = document.getElementById("color-rainbow-hue-alternate");
var colorRainbowSaturationAlternate = document.getElementById("color-rainbow-saturation-alternate");
var colorRainbowLightnessAlternate = document.getElementById("color-rainbow-lightness-alternate");
var colorRainbowHueRange = document.getElementById("color-rainbow-hue-range");
var colorRainbowSaturationRange = document.getElementById("color-rainbow-saturation-range");
var colorRainbowLightnessRange = document.getElementById("color-rainbow-lightness-range");
var themeHueWrapper = document.getElementById("theme-hue-wrapper");
var themeLogoWrapper = document.getElementById("theme-logo-wrapper");
var previewSection = document.getElementById("preview-section");
var themesList = document.getElementById("themes-list");
var themesListSection = document.getElementById("themes-list-section");
var themeEditorSection = document.getElementById("theme-editor-section");
var testIcon = document.getElementById("test-icon");
var iconList = document.getElementById("icon-list");
var tabIcons = document.getElementById("tab-icons");
/** @type {HTMLTableElement} */
var iconListTable = document.getElementById("icon-list-table");
var newIcon = document.getElementById("new-icon");
newIcon.addEventListener("click", addIcon);
var iconTestText = document.getElementById("icon-test-text");
iconTestText.addEventListener("input", iconPreview);
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", e => trySaveTheme());
var saveCloseButton = document.getElementById("save-close-button");
saveCloseButton.addEventListener("click", e => trySaveTheme(true));
var discardButton = document.getElementById("discard-button");
discardButton.addEventListener("click", e => ConfirmModal.open("Discard Changes?", "Are you sure you want to discard changes? All unsaved edits will be permanently lost.", ["Discard", "Cancel"], b => b === "Discard" && location.reload()));
var closeButton = document.getElementById("close-button");
closeButton.addEventListener("click", e => (!inEditMode() && (location.href = `https://${defaultDomain}`)) ||
    ConfirmModal.open("Discard Changes?", "Are you sure you want to close without saving? All unsaved edits will be permanently lost.", ["Discard", "Cancel"], b => b === "Discard" && (location.href = `https://${defaultDomain}`)));
var settingsButton = document.getElementById("settings-button");
settingsButton.addEventListener("click", e => SettingsModal.open());
var importButton = document.getElementById("import-button");
importButton.addEventListener("click", e => importTheme());
var createPresetDarkTheme = document.getElementById("create-preset-dark-theme");
createPresetDarkTheme === null || createPresetDarkTheme === void 0 ? void 0 : createPresetDarkTheme.addEventListener("click", e => editTheme("Schoology Plus Modern Dark", "My Dark Theme"));
var createPresetLightTheme = document.getElementById("create-preset-light-theme");
createPresetLightTheme === null || createPresetLightTheme === void 0 ? void 0 : createPresetLightTheme.addEventListener("click", e => editTheme("Schoology Plus Modern Light", "My Light Theme"));
var createPresetRainbowTheme = document.getElementById("create-preset-rainbow-theme");
createPresetRainbowTheme === null || createPresetRainbowTheme === void 0 ? void 0 : createPresetRainbowTheme.addEventListener("click", e => editTheme("Rainbow Modern", "My Rainbow Theme"));
var createPresetClassicTheme = document.getElementById("create-preset-classic-theme");
createPresetClassicTheme.addEventListener("click", e => editTheme("Schoology Plus", "My Classic Theme"));
var previewNavbar = document.getElementById("preview-navbar");
var previewLogo = document.getElementById("preview-logo");
var previewPage = document.getElementById("preview-page");
var lastSelectedTemplate = null;
var modernEnable = document.getElementById("modern-enable");
modernEnable.addEventListener("click", e => (0, analytics_1.trackEvent)("update_setting", {
    id: "modern-enable",
    context: "Theme Editor",
    value: modernEnable.checked.toString(),
    legacyTarget: "modern-enable",
    legacyAction: modernEnable.checked.toString(),
    legacyLabel: "Theme Editor",
}));
var modernWrapper = document.getElementById("modern-wrapper");
var modernBorderRadiusValue = document.getElementById("modern-border-radius-value");
var modernBorderSizeValue = document.getElementById("modern-border-size-value");
var modernPaddingValue = document.getElementById("modern-padding-value");
var previewModal = document.getElementById("preview-modal");
var splusModalClose = document.getElementById("splus-modal-close");
splusModalClose.addEventListener("click", e => {
    e.stopPropagation();
    previewModal.classList.add("hidden");
    previewPage.classList.remove("hidden");
    (0, analytics_1.trackEvent)("button_click", {
        id: "close-preview-modal",
        context: "Theme Editor",
        legacyTarget: "splus-modal-close",
        legacyAction: "click",
        legacyLabel: "Theme Editor",
    });
});
var previewSPlusButton = document.getElementById("preview-splus-button");
previewSPlusButton.addEventListener("click", e => {
    e.stopPropagation();
    previewModal.classList.toggle("hidden");
    previewPage.classList.toggle("hidden");
    (0, analytics_1.trackEvent)("button_click", {
        id: "preview-splus-button",
        context: "Theme Editor",
        legacyTarget: "preview-splus-button",
        legacyAction: "click",
        legacyLabel: "Theme Editor",
    });
});
class ThemeEditorModal {
    static get ELEMENT() {
        return document.getElementById("modal");
    }
    static get CONTENT_CONTAINER() {
        return document.getElementById("modal-content");
    }
    static get BUTTONS_CONTAINER() {
        return document.getElementById("modal-buttons");
    }
    /**
     * Displays a modal with the given content and buttons, calling callback on close
     * @param {Node} content The content of the modal
     * @param {string[]} buttons Buttons to show in the modal footer
     * @param {(button:string)=>void} callback Called on close with the selected button (or `null` if none selected)
     */
    static open(content, buttons = ["OK"], callback) {
        ThemeEditorModal.CONTENT_CONTAINER.innerHTML = "";
        ThemeEditorModal.BUTTONS_CONTAINER.innerHTML = "";
        var selected = null;
        ThemeEditorModal.CONTENT_CONTAINER.appendChild(content);
        for (let b of buttons) {
            ThemeEditorModal.BUTTONS_CONTAINER.appendChild((0, dom_1.createElement)("a", ["modal-close", "waves-effect", "waves-dark", "btn-flat"], {
                textContent: b,
                onclick: e => {
                    (0, analytics_1.trackEvent)("button_click", {
                        id: "modal-button",
                        context: "Theme Editor",
                        value: b,
                        legacyTarget: "Modal Button",
                        legacyAction: b,
                        legacyLabel: "Theme Editor",
                    });
                    selected = b;
                },
            }));
        }
        let controller = materialize_css_1.default.Modal.init(ThemeEditorModal.ELEMENT, {
            onCloseEnd: () => callback && callback(selected),
        });
        controller.open();
    }
}
class PromptModal {
    /**
     * Opens a modal requesting user input
     * @param {string} title The title of the modal
     * @param {string} placeholder Text displayed as a placeholder in the textbox
     * @param {string[]} buttons Buttons to display in the modal footer
     * @param {(button:string,text:string)=>void} callback Called on close with the selected button (or `null` if none selected) and the text in the textbox
     */
    static open(title, placeholder, buttons, callback, className) {
        let content = htmlToElement(`
        <div>
            <h4>${title}</h4>
            <div class="input-field">
                <textarea id="prompt-modal-textarea" class="materialize-textarea ${className}"></textarea>
                <label for="prompt-modal-textarea">${placeholder}</label>
            </div>
        </div>
        `);
        ThemeEditorModal.open(content, buttons, button => callback(button, document.getElementById("prompt-modal-textarea").value));
    }
}
class ConfirmModal {
    /**
     * Opens a modal requesting user confirmation
     * @param {string} title The title of the modal
     * @param {string} text Informative text detailing the question
     * @param {string[]} buttons Buttons to display in the modal footer
     * @param {(button:string)=>void} callback Called on close with the selected button (or `null` if none selected)
     */
    static open(title, text, buttons, callback) {
        let content = htmlToElement(`
        <div>
            <h4>${title}</h4>
            <p>${text}</p>
        </div>
        `);
        ThemeEditorModal.open(content, buttons, callback);
    }
}
class SettingsModal {
    /**
     * Opens the settings modal
     */
    static open() {
        let content = htmlToElement(`
        <div>
            <h4>Settings</h4>
            <p>
                Nothing to see here yet! Theme editor settings coming soon&trade;.
            </p>
        </div>
        `);
        ThemeEditorModal.open(content, ["Cancel", "Save"], button => {
            switch (button) {
                case "Save":
                    break;
                case "Cancel":
                default:
                    break;
            }
        });
    }
}
var origThemeName = undefined;
let warnings = [];
let errors = [];
let theme = null;
var output = document.getElementById("json-output");
output.addEventListener("input", importThemeFromOutput);
output.addEventListener("paste", e => {
    if (inEditMode()) {
        e.preventDefault();
        e.stopPropagation();
        let t = e.clipboardData.getData("text");
        output.value = t;
        importThemeFromOutput();
    }
});
for (let e of document.querySelectorAll("#theme-editor-section input")) {
    e.addEventListener("input", function (event) {
        updateOutput();
    });
}
var mTabs = materialize_css_1.default.Tabs.init(document.querySelector(".tabs"), {
    onShow: function (newtab) {
        if (newtab.id == "tab-preview") {
            previewSection.classList.add("fixed-on-large-and-up");
        }
        else {
            previewSection.classList.remove("fixed-on-large-and-up");
        }
    },
});
var elems = document.querySelectorAll(".dropdown-trigger");
var instances = materialize_css_1.default.Dropdown.init(elems, { constrainWidth: false });
/**
 * Returns a list of errors for the given theme
 * @param {*} j Theme JSON object
 */
function generateErrors(j) {
    let w = [];
    switch (j.version) {
        case 2:
            if (!j.name)
                w.push("Theme must have a name");
            if (!j.color)
                w.push("Theme must have a color object");
            break;
    }
    return w;
}
/**
 * Loads a theme from the JSON text displayed in the output textarea element
 */
function importThemeFromOutput() {
    importAndRender(parseJSONObject(output.value));
}
/**
 * Loads a theme from an object and renders it
 * @param {*} object JSON object representation of a theme
 */
function importAndRender(object) {
    errors = [];
    warnings = [];
    renderTheme(importThemeFromObject(object));
}
/**
 * Migrates a theme to the newest version of the theme specification
 * @param {*} t Theme JSON object
 */
function migrateTheme(t) {
    switch (t.version) {
        case 2:
            break;
        default:
            errors.push("The theme version is not supported");
            throw new Error("The theme version is not supported");
    }
    return t.version == CURRENT_VERSION ? t : migrateTheme(t);
}
/**
 * Fills out form elements with the data contained in the provided Theme object
 * @param {SchoologyThemeV2} j A SchoologyPlus theme object
 */
function importThemeFromObject(j) {
    if (!j) {
        errors.push("The JSON you have entered is not valid");
        updatePreview(false);
        return;
    }
    errors = generateErrors(j);
    if (errors.length > 0) {
        updatePreview(false);
        return;
    }
    let migratedTheme = migrateTheme(j);
    return theme_model_1.SchoologyTheme.loadFromObject(migratedTheme);
}
/**
 * Updates form elements with values from the provided theme
 * @param {SchoologyTheme} t The theme to render
 */
function renderTheme(t) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
    if (!t) {
        return;
    }
    themeName.value = t.name;
    themeLogo.value = "";
    switch ((_a = t.logo) === null || _a === void 0 ? void 0 : _a.preset) {
        case "schoology_plus":
            themeSchoologyPlusLogo.click();
            break;
        case "schoology_logo":
            themeSchoologyLogo.click();
            break;
        case "lausd_legacy":
            themeLAUSDLogo.click();
            break;
        case "lausd_2019":
            themeNewLAUSDLogo.click();
            break;
        case "lausd_2022":
            themeLAUSDLogo2022.click();
            break;
        case "default":
            themeDefaultLogo.click();
            break;
        default:
            themeLogo.value = (_c = (_b = t.logo) === null || _b === void 0 ? void 0 : _b.url) !== null && _c !== void 0 ? _c : "";
            themeCustomLogo.click();
            break;
    }
    (0, jquery_1.default)(themeHue).slider("value", t.color.hue || 200);
    colorRainbowHueAnimate.checked = false;
    colorRainbowHueSpeed.value = "50";
    (0, jquery_1.default)(colorRainbowHueRange).roundSlider("setValue", "0,359");
    colorRainbowHueAlternate.checked = false;
    (0, jquery_1.default)(colorRainbowHueValue).slider("value", 180);
    colorRainbowSaturationAnimate.checked = false;
    colorRainbowSaturationSpeed.value = "50";
    (0, jquery_1.default)(colorRainbowSaturationRange).slider("values", [0, 100]);
    colorRainbowSaturationAlternate.checked = false;
    colorRainbowSaturationValue.value = "50";
    colorRainbowLightnessAnimate.checked = false;
    colorRainbowLightnessSpeed.value = "50";
    (0, jquery_1.default)(colorRainbowLightnessRange).slider("values", [0, 100]);
    colorRainbowLightnessAlternate.checked = false;
    colorRainbowLightnessValue.value = "50";
    if (t.color.hue || t.color.hue === 0) {
        themeColorHue.click();
    }
    else if (t.color.custom) {
        let map = {
            "#theme-primary-color": "primary",
            "#theme-background-color": "background",
            "#theme-secondary-color": "hover",
            "#theme-border-color": "border",
            "#theme-link-color": "link",
        };
        Object.keys(map).map(x => (0, jquery_1.default)(x).spectrum("set", t.color.custom[map[x]]));
        themeColorCustom.click();
    }
    else if (t.color.rainbow) {
        themeColorRainbow.click();
        if (!!((_d = t.color.rainbow.hue) === null || _d === void 0 ? void 0 : _d.animate) !== colorRainbowHueAnimate.checked) {
            colorRainbowHueAnimate.click();
        }
        if ((_e = t.color.rainbow.hue) === null || _e === void 0 ? void 0 : _e.animate) {
            colorRainbowHueSpeed.value = t.color.rainbow.hue.animate.speed.toString();
            (0, jquery_1.default)(colorRainbowHueValue).slider("value", t.color.rainbow.hue.animate.offset);
            if (!!t.color.rainbow.hue.animate.alternate !== colorRainbowHueAlternate.checked) {
                colorRainbowHueAlternate.click();
            }
            let l = t.color.rainbow.hue.animate.min ||
                (0 &&
                    0 &&
                    0)
                ? t.color.rainbow.hue.animate.min
                : 0;
            let u = t.color.rainbow.hue.animate.max &&
                t.color.rainbow.hue.animate.max >= 0 &&
                t.color.rainbow.hue.animate.max <= 359
                ? t.color.rainbow.hue.animate.max
                : 359;
            (0, jquery_1.default)(colorRainbowHueRange).roundSlider("setValue", `${l},${u}`);
        }
        else {
            (0, jquery_1.default)(colorRainbowHueValue).slider("value", (_g = (_f = t.color.rainbow.hue) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : 0);
        }
        if (!!((_h = t.color.rainbow.saturation) === null || _h === void 0 ? void 0 : _h.animate) !== colorRainbowSaturationAnimate.checked) {
            colorRainbowSaturationAnimate.click();
        }
        if ((_j = t.color.rainbow.saturation) === null || _j === void 0 ? void 0 : _j.animate) {
            colorRainbowSaturationSpeed.value = t.color.rainbow.saturation.animate.speed.toString();
            colorRainbowSaturationValue.value =
                t.color.rainbow.saturation.animate.offset.toString();
            if (!!t.color.rainbow.saturation.animate.alternate !==
                colorRainbowSaturationAlternate.checked) {
                colorRainbowSaturationAlternate.click();
            }
            (0, jquery_1.default)(colorRainbowSaturationRange).slider("values", [
                t.color.rainbow.saturation.animate.min &&
                    t.color.rainbow.saturation.animate.min < t.color.rainbow.saturation.animate.max &&
                    t.color.rainbow.saturation.animate.min >= 0 &&
                    t.color.rainbow.saturation.animate.min <= 100
                    ? t.color.rainbow.saturation.animate.min
                    : 0,
                t.color.rainbow.saturation.animate.max &&
                    t.color.rainbow.saturation.animate.max > t.color.rainbow.saturation.animate.min &&
                    t.color.rainbow.saturation.animate.max >= 0 &&
                    t.color.rainbow.saturation.animate.max <= 100
                    ? t.color.rainbow.saturation.animate.max
                    : 100,
            ]);
        }
        else {
            colorRainbowSaturationValue.value =
                (_m = (_l = (_k = t.color.rainbow.saturation) === null || _k === void 0 ? void 0 : _k.value) === null || _l === void 0 ? void 0 : _l.toString()) !== null && _m !== void 0 ? _m : "0";
        }
        if (!!((_o = t.color.rainbow.lightness) === null || _o === void 0 ? void 0 : _o.animate) !== colorRainbowLightnessAnimate.checked) {
            colorRainbowLightnessAnimate.click();
        }
        if ((_p = t.color.rainbow.lightness) === null || _p === void 0 ? void 0 : _p.animate) {
            colorRainbowLightnessSpeed.value = t.color.rainbow.lightness.animate.speed.toString();
            colorRainbowLightnessValue.value = t.color.rainbow.lightness.animate.offset.toString();
            if (!!t.color.rainbow.lightness.animate.alternate !==
                colorRainbowLightnessAlternate.checked) {
                colorRainbowLightnessAlternate.click();
            }
            (0, jquery_1.default)(colorRainbowLightnessRange).slider("values", [
                t.color.rainbow.lightness.animate.min &&
                    t.color.rainbow.lightness.animate.min < t.color.rainbow.lightness.animate.max &&
                    t.color.rainbow.lightness.animate.min >= 0 &&
                    t.color.rainbow.lightness.animate.min <= 100
                    ? t.color.rainbow.lightness.animate.min
                    : 0,
                t.color.rainbow.lightness.animate.max &&
                    t.color.rainbow.lightness.animate.max > t.color.rainbow.lightness.animate.min &&
                    t.color.rainbow.lightness.animate.max >= 0 &&
                    t.color.rainbow.lightness.animate.max <= 100
                    ? t.color.rainbow.lightness.animate.max
                    : 100,
            ]);
        }
        else {
            colorRainbowLightnessValue.value = (_s = (_r = (_q = t.color.rainbow.lightness) === null || _q === void 0 ? void 0 : _q.value) === null || _r === void 0 ? void 0 : _r.toString()) !== null && _s !== void 0 ? _s : "0";
        }
    }
    if (t.color.modern) {
        modernEnable.checked = true;
        Object.keys(modernColorMap).map(x => {
            var _a;
            let modernOption = t.color.modern[modernColorMap[x][0]];
            (0, jquery_1.default)(x).spectrum("set", (_a = modernOption === null || modernOption === void 0 ? void 0 : modernOption[modernColorMap[x][1]]) !== null && _a !== void 0 ? _a : "#00DEAD");
        });
        modernBorderRadiusValue.value = (_v = (_u = (_t = t.color.modern.options) === null || _t === void 0 ? void 0 : _t.borderRadius) === null || _u === void 0 ? void 0 : _u.toString()) !== null && _v !== void 0 ? _v : "5";
        modernBorderSizeValue.value = (_y = (_x = (_w = t.color.modern.options) === null || _w === void 0 ? void 0 : _w.borderSize) === null || _x === void 0 ? void 0 : _x.toString()) !== null && _y !== void 0 ? _y : "1";
        modernPaddingValue.value = (_1 = (_0 = (_z = t.color.modern.options) === null || _z === void 0 ? void 0 : _z.padding) === null || _0 === void 0 ? void 0 : _0.toString()) !== null && _1 !== void 0 ? _1 : "5";
    }
    else {
        modernEnable.checked = false;
    }
    for (let el of document.querySelectorAll("input[type=range][data-label]")) {
        document.getElementById(el.dataset.label).textContent = el.value;
    }
    for (let el of [colorRainbowSaturationRange, colorRainbowLightnessRange]) {
        document.getElementById(el.id + "-display").textContent = `${(0, jquery_1.default)(el).slider("values")[0]} - ${(0, jquery_1.default)(el).slider("values")[1]}`;
    }
    iconList.innerHTML = "";
    if (t.icons) {
        for (let i of t.icons) {
            let row = addIcon();
            row.querySelector(".class-name").textContent = i.regex.toString();
            row.querySelector(".icon-url").textContent = i.url;
            row.querySelector(".small-icon-preview").src = i.url;
        }
    }
    themeCursor.value = "";
    if (t.cursor && t.cursor.primary) {
        themeCursor.value = t.cursor.primary;
    }
    materialize_css_1.default.updateTextFields();
    updateOutput();
}
let init = 0;
/**
 * Creates a Spectrum.js color picker
 * @param {string} id Element ID of the input element
 * @param {(tinycolor)=>void} onupdate Callback called when color is changed
 */
function initPicker(id, color, onupdate = updateOutput, showAlpha = false) {
    (0, jquery_1.default)(`#${id}`).spectrum({
        showInput: true,
        containerClassName: "full-spectrum",
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,
        maxPaletteSize: 10,
        preferredFormat: "hex",
        showAlpha: showAlpha,
        color: color || ["red", "blue", "yellow", "green", "magenta"][init++ % 5],
        move: function (color) {
            onupdate(color);
        },
        hide: function (color) {
            onupdate(color);
        },
        palette: [
            [
                "rgb(0, 0, 0)",
                "rgb(67, 67, 67)",
                "rgb(102, 102, 102)" /*"rgb(153, 153, 153)","rgb(183, 183, 183)",*/,
                "rgb(204, 204, 204)",
                "rgb(217, 217, 217)",
                /*"rgb(239, 239, 239)", "rgb(243, 243, 243)",*/ "rgb(255, 255, 255)",
            ],
            [
                "rgb(152, 0, 0)",
                "rgb(255, 0, 0)",
                "rgb(255, 153, 0)",
                "rgb(255, 255, 0)",
                "rgb(0, 255, 0)",
                "rgb(0, 255, 255)",
                "rgb(74, 134, 232)",
                "rgb(0, 0, 255)",
                "rgb(153, 0, 255)",
                "rgb(255, 0, 255)",
            ],
            [
                "rgb(230, 184, 175)",
                "rgb(244, 204, 204)",
                "rgb(252, 229, 205)",
                "rgb(255, 242, 204)",
                "rgb(217, 234, 211)",
                "rgb(208, 224, 227)",
                "rgb(201, 218, 248)",
                "rgb(207, 226, 243)",
                "rgb(217, 210, 233)",
                "rgb(234, 209, 220)",
            ],
            [
                "rgb(221, 126, 107)",
                "rgb(234, 153, 153)",
                "rgb(249, 203, 156)",
                "rgb(255, 229, 153)",
                "rgb(182, 215, 168)",
                "rgb(162, 196, 201)",
                "rgb(164, 194, 244)",
                "rgb(159, 197, 232)",
                "rgb(180, 167, 214)",
                "rgb(213, 166, 189)",
            ],
            [
                "rgb(204, 65, 37)",
                "rgb(224, 102, 102)",
                "rgb(246, 178, 107)",
                "rgb(255, 217, 102)",
                "rgb(147, 196, 125)",
                "rgb(118, 165, 175)",
                "rgb(109, 158, 235)",
                "rgb(111, 168, 220)",
                "rgb(142, 124, 195)",
                "rgb(194, 123, 160)",
            ],
            [
                "rgb(166, 28, 0)",
                "rgb(204, 0, 0)",
                "rgb(230, 145, 56)",
                "rgb(241, 194, 50)",
                "rgb(106, 168, 79)",
                "rgb(69, 129, 142)",
                "rgb(60, 120, 216)",
                "rgb(61, 133, 198)",
                "rgb(103, 78, 167)",
                "rgb(166, 77, 121)",
            ],
            [
                "rgb(133, 32, 12)",
                "rgb(153, 0, 0)",
                "rgb(180, 95, 6)",
                "rgb(191, 144, 0)",
                "rgb(56, 118, 29)",
                "rgb(19, 79, 92)",
                "rgb(17, 85, 204)",
                "rgb(11, 83, 148)",
                "rgb(53, 28, 117)",
                "rgb(116, 27, 71)",
            ],
            [
                "rgb(91, 15, 0)",
                "rgb(102, 0, 0)",
                "rgb(120, 63, 4)",
                "rgb(127, 96, 0)",
                "rgb(39, 78, 19)",
                "rgb(12, 52, 61)",
                "rgb(28, 69, 135)",
                "rgb(7, 55, 99)",
                "rgb(32, 18, 77)",
                "rgb(76, 17, 48)",
            ],
        ],
    });
}
initPicker("theme-primary-color");
initPicker("theme-secondary-color");
initPicker("theme-background-color");
initPicker("theme-border-color");
initPicker("theme-link-color");
initPicker("modern-color-primary", "#EAEAEA");
initPicker("modern-color-accent", "#F7F7F7");
initPicker("modern-color-secondary", "#DDD");
initPicker("modern-color-input", "#D0D0D0");
initPicker("modern-color-border", "#BABABA");
initPicker("modern-color-highlight", "rgba(255, 183, 2, 0.2)", updateOutput, true);
initPicker("modern-color-active", "#98d4e4", updateOutput, true);
initPicker("modern-color-grades", "#009400");
initPicker("modern-color-error", "#F44336");
initPicker("modern-cal-1", "#d6e7f4");
initPicker("modern-cal-2", "#d7e8cf");
initPicker("modern-cal-3", "#f9e9d4");
initPicker("modern-cal-4", "#e7e0e5");
initPicker("modern-cal-5", "#e6b5c9");
initPicker("modern-cal-6", "#f9f1cf");
initPicker("modern-cal-7", "#daf0f9");
initPicker("modern-cal-8", "#f9ddea");
initPicker("modern-cal-9", "#fbd7d8");
initPicker("modern-cal-10", "#f1f2d1");
initPicker("modern-cal-11", "#e0e8f5");
initPicker("modern-cal-12", "#fbd7e4");
initPicker("modern-cal-13", "#fcddd3");
initPicker("modern-cal-14", "#e7f2d5");
initPicker("modern-cal-15", "#e6e0ee");
initPicker("modern-cal-16", "#f0e5db");
initPicker("modern-cal-17", "#fce8d1");
initPicker("modern-cal-18", "#e1f1e7");
initPicker("modern-cal-19", "#f0dfed");
initPicker("modern-cal-20", "#e9e9ea");
initPicker("modern-cal-21", "#00427c");
initPicker("modern-cal-22", "#603073");
initPicker("modern-cal-23", "#8b1941");
initPicker("modern-cal-24", "#970c0c");
initPicker("modern-cal-25", "#9c3b07");
initPicker("modern-cal-26", "#685203");
initPicker("modern-cal-27", "#2a5f16");
initPicker("modern-cal-28", "#09584f");
initPicker("modern-cal-29", "#005a75");
initPicker("modern-cal-30", "#4d5557");
initPicker("modern-color-text-primary", "#2A2A2A");
initPicker("modern-color-text-muted", "#677583");
initPicker("modern-color-text-contrast", "white");
var modernColorMap = {
    "#modern-color-primary": ["interface", "primary", "modern-primary"],
    "#modern-color-accent": ["interface", "accent", "modern-accent"],
    "#modern-color-secondary": ["interface", "secondary", "modern-secondary"],
    "#modern-color-input": ["interface", "input", "modern-input"],
    "#modern-color-border": ["interface", "border", "modern-contrast-border"],
    "#modern-color-highlight": ["interface", "highlight", "modern-highlight"],
    "#modern-color-active": ["interface", "active", "modern-active"],
    "#modern-color-grades": ["interface", "grades", "modern-grades"],
    "#modern-color-error": ["interface", "error", "modern-error"],
    "#modern-color-text-primary": ["text", "primary", "modern-text"],
    "#modern-color-text-muted": ["text", "muted", "modern-muted-text"],
    "#modern-color-text-contrast": ["text", "contrast", "modern-contrast-text"],
    "#modern-cal-1": ["calendar", 0, "cal1"],
    "#modern-cal-2": ["calendar", 1, "cal2"],
    "#modern-cal-3": ["calendar", 2, "cal3"],
    "#modern-cal-4": ["calendar", 3, "cal4"],
    "#modern-cal-5": ["calendar", 4, "cal5"],
    "#modern-cal-6": ["calendar", 5, "cal6"],
    "#modern-cal-7": ["calendar", 6, "cal7"],
    "#modern-cal-8": ["calendar", 7, "cal8"],
    "#modern-cal-9": ["calendar", 8, "cal9"],
    "#modern-cal-10": ["calendar", 9, "cal10"],
    "#modern-cal-11": ["calendar", 10, "cal11"],
    "#modern-cal-12": ["calendar", 11, "cal12"],
    "#modern-cal-13": ["calendar", 12, "cal13"],
    "#modern-cal-14": ["calendar", 13, "cal14"],
    "#modern-cal-15": ["calendar", 14, "cal15"],
    "#modern-cal-16": ["calendar", 15, "cal16"],
    "#modern-cal-17": ["calendar", 16, "cal17"],
    "#modern-cal-18": ["calendar", 17, "cal18"],
    "#modern-cal-19": ["calendar", 18, "cal19"],
    "#modern-cal-20": ["calendar", 19, "cal20"],
    "#modern-cal-21": ["calendar", 20, "cal21"],
    "#modern-cal-22": ["calendar", 21, "cal22"],
    "#modern-cal-23": ["calendar", 22, "cal23"],
    "#modern-cal-24": ["calendar", 23, "cal24"],
    "#modern-cal-25": ["calendar", 24, "cal25"],
    "#modern-cal-26": ["calendar", 25, "cal26"],
    "#modern-cal-27": ["calendar", 26, "cal27"],
    "#modern-cal-28": ["calendar", 27, "cal28"],
    "#modern-cal-29": ["calendar", 28, "cal29"],
    "#modern-cal-30": ["calendar", 29, "cal30"],
};
function updateOutput() {
    clearInterval(rainbowInterval);
    warnings = [];
    errors = [];
    theme = new theme_model_1.SchoologyTheme(themeName.value || "Untitled Theme", theme_model_1.SchoologyTheme.CURRENT_VERSION, { hue: 210 });
    // Name
    if (!theme.name) {
        errors.push("Theme must have a name");
    }
    else if (defaultThemes.includes(theme.name)) {
        errors.push("Theme can't use the same name as a default theme. Please choose a different name.");
    }
    else if (theme.name != origThemeName && allThemes[theme.name]) {
        errors.push(`A theme with the name "${theme.name}" already exists. Delete that theme or choose a different name before saving.`);
    }
    // Color
    theme.color = new theme_model_1.ThemeColor();
    if (themeColorHue.checked) {
        themeColorCustomWrapper.classList.add("hidden");
        themeHueWrapper.classList.remove("hidden");
        themeColorRainbowWrapper.classList.add("hidden");
        theme.color.hue = (0, jquery_1.default)(themeHue).slider("value");
        (0, dom_1.setCSSVariable)("color-hue", theme.color.hue.toString());
        (0, dom_1.setCSSVariable)("primary-color", "hsl(var(--color-hue), 50%, 50%)");
        (0, dom_1.setCSSVariable)("background-color", "hsl(var(--color-hue), 60%, 30%)");
        (0, dom_1.setCSSVariable)("hover-color", "hsl(var(--color-hue), 55%, 40%)");
        (0, dom_1.setCSSVariable)("border-color", "hsl(var(--color-hue), 60%, 25%)");
        (0, dom_1.setCSSVariable)("link-color", "hsl(var(--color-hue), 55%, 40%)");
    }
    else if (themeColorCustom.checked) {
        themeColorCustomWrapper.classList.remove("hidden");
        themeHueWrapper.classList.add("hidden");
        themeColorRainbowWrapper.classList.add("hidden");
        theme.color.custom = new theme_model_1.CustomColorDefinition((0, jquery_1.default)("#theme-primary-color").spectrum("get").toHexString(), (0, jquery_1.default)("#theme-secondary-color").spectrum("get").toHexString(), (0, jquery_1.default)("#theme-background-color").spectrum("get").toHexString(), (0, jquery_1.default)("#theme-border-color").spectrum("get").toHexString(), (0, jquery_1.default)("#theme-link-color").spectrum("get").toHexString());
        (0, dom_1.setCSSVariable)("primary-color", theme.color.custom.primary);
        (0, dom_1.setCSSVariable)("background-color", theme.color.custom.background);
        (0, dom_1.setCSSVariable)("hover-color", theme.color.custom.hover);
        (0, dom_1.setCSSVariable)("border-color", theme.color.custom.border);
        (0, dom_1.setCSSVariable)("link-color", theme.color.custom.link);
    }
    else if (themeColorRainbow.checked) {
        themeColorCustomWrapper.classList.add("hidden");
        themeHueWrapper.classList.add("hidden");
        themeColorRainbowWrapper.classList.remove("hidden");
        theme.color.rainbow = new theme_model_1.RainbowColorDefinition(new theme_model_1.RainbowColorComponentDefinition(), new theme_model_1.RainbowColorComponentDefinition(), new theme_model_1.RainbowColorComponentDefinition());
        if (theme.color.rainbow.hue && colorRainbowHueAnimate.checked) {
            colorRainbowHueAnimateWrapper.classList.remove("hidden");
            document.querySelector("label[for=color-rainbow-hue-value]").firstElementChild.textContent = "Hue Offset";
            colorRainbowHueValue.classList.remove("hue-slider");
            theme.color.rainbow.hue.animate = new theme_model_1.RainbowColorComponentAnimation(+colorRainbowHueSpeed.value, +(0, jquery_1.default)(colorRainbowHueValue).slider("value"), +(0, jquery_1.default)(colorRainbowHueRange).roundSlider("getValue").split(",")[0], +(0, jquery_1.default)(colorRainbowHueRange).roundSlider("getValue").split(",")[1], colorRainbowHueAlternate.checked);
            let steps = [];
            let max = theme.color.rainbow.hue.animate.min > theme.color.rainbow.hue.animate.max
                ? theme.color.rainbow.hue.animate.max + 360
                : theme.color.rainbow.hue.animate.max;
            for (let i = 0; i <= 1; i += 0.05) {
                steps.push(`hsl(${theme.color.rainbow.hue.animate.min * (1 - i) + max * i}, 50%, 50%)`);
            }
            if (theme.color.rainbow.hue.animate.alternate) {
                steps.push(...steps.slice(0, steps.length - 1).reverse());
            }
            colorRainbowHuePreview.style.background = `linear-gradient(to right, ${steps.join()})`;
        }
        else {
            colorRainbowHueAnimateWrapper.classList.add("hidden");
            document.querySelector("label[for=color-rainbow-hue-value]").firstElementChild.textContent = "Hue Value";
            colorRainbowHueValue.classList.add("hue-slider");
            theme.color.rainbow.hue.value = (0, jquery_1.default)(colorRainbowHueValue).slider("value");
        }
        if (theme.color.rainbow.saturation && colorRainbowSaturationAnimate.checked) {
            colorRainbowSaturationAnimateWrapper.classList.remove("hidden");
            document.querySelector("label[for=color-rainbow-saturation-value]").firstElementChild.textContent = "Saturation Offset";
            theme.color.rainbow.saturation.animate = new theme_model_1.RainbowColorComponentAnimation(+colorRainbowSaturationSpeed.value, +colorRainbowSaturationValue.value, (0, jquery_1.default)(colorRainbowSaturationRange).slider("values")[0], (0, jquery_1.default)(colorRainbowSaturationRange).slider("values")[1], colorRainbowSaturationAlternate.checked);
        }
        else {
            colorRainbowSaturationAnimateWrapper.classList.add("hidden");
            document.querySelector("label[for=color-rainbow-saturation-value]").firstElementChild.textContent = "Saturation Value";
            theme.color.rainbow.saturation.value = Number.parseFloat(colorRainbowSaturationValue.value);
        }
        if (colorRainbowLightnessAnimate.checked) {
            colorRainbowLightnessAnimateWrapper.classList.remove("hidden");
            document.querySelector("label[for=color-rainbow-lightness-value]").firstElementChild.textContent = "Lightness Offset";
            theme.color.rainbow.lightness.animate = new theme_model_1.RainbowColorComponentAnimation(+colorRainbowLightnessSpeed.value, +colorRainbowLightnessValue.value, (0, jquery_1.default)(colorRainbowLightnessRange).slider("values")[0], (0, jquery_1.default)(colorRainbowLightnessRange).slider("values")[1], colorRainbowLightnessAlternate.checked);
        }
        else {
            colorRainbowLightnessAnimateWrapper.classList.add("hidden");
            document.querySelector("label[for=color-rainbow-lightness-value]").firstElementChild.textContent = "Lightness Value";
            theme.color.rainbow.lightness.value = Number.parseFloat(colorRainbowLightnessValue.value);
        }
        let f = generateRainbowFunction(theme);
        if (f) {
            f();
            rainbowInterval = setInterval(f, 100);
        }
    }
    if (modernEnable.checked) {
        document.documentElement.setAttribute("modern", "true");
        modernWrapper.classList.remove("hidden");
        theme.color.modern = new theme_model_1.ModernColorDefinition();
        theme.color.modern.calendar = [];
        theme.color.modern.interface = new theme_model_1.ModernInterfaceColorDefinition("#00DEAD", "#00DEAD", "#00DEAD", "#00DEAD", "#00DEAD", "#00DEAD", "#00DEAD", "#00DEAD", "#00DEAD");
        theme.color.modern.text = new theme_model_1.ModernTextColorDefinition("#00DEAD", "#00DEAD", "#00DEAD");
        theme.color.modern.options = new theme_model_1.ModernOptionsDefinition(5, 1, 5);
        theme.color.modern.dark = (0, jquery_1.default)("#modern-color-primary").spectrum("get").isDark();
        document.documentElement.setAttribute("dark", theme.color.modern.dark.toString());
        for (let id in modernColorMap) {
            let key = modernColorMap[id];
            // couldn't figure out how to make TypeScript happy here, did my best
            let modernKey = theme.color.modern[key[0]];
            modernKey[key[1]] = (0, jquery_1.default)(id)
                .spectrum("get")
                .toString();
            (0, dom_1.setCSSVariable)(key[2], (0, jquery_1.default)(id).spectrum("get").toString());
        }
        theme.color.modern.options.borderSize = +modernBorderSizeValue.value;
        theme.color.modern.options.borderRadius = +modernBorderRadiusValue.value;
        theme.color.modern.options.padding = +modernPaddingValue.value;
        (0, dom_1.setCSSVariable)("modern-border-size", `${modernBorderSizeValue.value}px`);
        (0, dom_1.setCSSVariable)("modern-border-radius", `${modernBorderRadiusValue.value}px`);
        (0, dom_1.setCSSVariable)("modern-padding", `${modernPaddingValue.value}px`);
    }
    else {
        document.documentElement.setAttribute("modern", "false");
        modernWrapper.classList.add("hidden");
    }
    // Logo
    themeLogoWrapper.classList.add("hidden");
    if (themeSchoologyPlusLogo.checked) {
        theme.logo = new theme_model_1.ThemeLogo(undefined, "schoology_plus");
        (0, dom_1.setCSSVariable)("background-url", `url(${schoologyPlusLogoImageUrl})`);
    }
    else if (themeSchoologyLogo.checked) {
        theme.logo = new theme_model_1.ThemeLogo(undefined, "schoology_logo");
        (0, dom_1.setCSSVariable)("background-url", `url(${schoologyLogoImageUrl})`);
    }
    else if (themeLAUSDLogo2022.checked) {
        theme.logo = new theme_model_1.ThemeLogo(undefined, "lausd_2022");
        (0, dom_1.setCSSVariable)("background-url", `url(${lausd2022ImageUrl})`);
    }
    else if (themeNewLAUSDLogo.checked) {
        theme.logo = new theme_model_1.ThemeLogo(undefined, "lausd_2019");
        (0, dom_1.setCSSVariable)("background-url", `url(${lausd2019ImageUrl})`);
    }
    else if (themeLAUSDLogo.checked) {
        theme.logo = new theme_model_1.ThemeLogo(undefined, "lausd_legacy");
        (0, dom_1.setCSSVariable)("background-url", `url(${lausdLegacyImageUrl})`);
    }
    else if (themeDefaultLogo.checked) {
        theme.logo = new theme_model_1.ThemeLogo(undefined, "default");
        (0, dom_1.setCSSVariable)("background-url", `url(${placeholderUrl})`);
    }
    else if (themeCustomLogo.checked) {
        themeLogoWrapper.classList.remove("hidden");
        if (themeLogo.value) {
            theme.logo = new theme_model_1.ThemeLogo(themeLogo.value);
            checkImage(themeLogo.value, x => {
                let img = x.target;
                if (img.width != 160 || img.height < 36 || img.height > 60) {
                    warnings.push("Logo image is not between the recommended sizes of 160x36 and 160x60");
                }
                (0, dom_1.setCSSVariable)("background-url", `url(${themeLogo.value})`);
            }, () => errors.push("Logo URL does not point to a valid image"));
        }
        else {
            errors.push("No logo URL is specified");
        }
    }
    // Cursor
    if (themeCursor.value) {
        theme.cursor = new theme_model_1.ThemeCursor(themeCursor.value);
        checkImage(themeCursor.value, x => {
            let img = x.target;
            if (img.width > 128 || img.height > 128) {
                errors.push("Cursor images must be smaller than 128x128 to appear");
            }
            (0, dom_1.setCSSVariable)("cursor", `url(${themeCursor.value}), auto`);
        }, () => errors.push("Cursor URL does not point to a valid image"));
    }
    else {
        (0, dom_1.setCSSVariable)("cursor", "auto");
    }
    // Icons
    if (iconListTable.rows.length > 1) {
        let customIcons = [];
        let first = true;
        for (let row of iconListTable.rows) {
            if (first || !row.cells[1].textContent || !row.cells[2].textContent) {
                first = false;
                continue;
            }
            let pattern = row.cells[1].textContent;
            let url = row.cells[2].textContent;
            checkImage(url, undefined, () => errors.push(url + " is not a valid image URL (Course Icons)"));
            try {
                RegExp(pattern);
            }
            catch (_a) {
                errors.push(pattern + " is not a valid regular expression (Course Icons)");
            }
            customIcons.push(new theme_model_1.ThemeIcon(pattern, url));
        }
        theme.icons = customIcons;
    }
    updatePreview();
}
/**
 * Update the theme preview and optionally the theme JSON
 * @param {boolean} updateJSON Whether or not to replace the JSON output with form values
 */
function updatePreview(updateJSON = true) {
    if (updateJSON)
        output.value = JSON.stringify(theme, null, 4);
    let warningCard = document.getElementById("warning-card");
    if (warnings.length > 0) {
        warningCard.style.display = "block";
        document.getElementById("warning-content").innerHTML = warnings.join("<br/>");
    }
    else {
        warningCard.style.display = "none";
    }
    let errorCard = document.getElementById("error-card");
    if (errors.length > 0 && inEditMode()) {
        errorCard.style.display = "block";
        document.getElementById("error-content").innerHTML = errors.join("<br/>");
    }
    else {
        errorCard.style.display = "none";
    }
    materialize_css_1.default.updateTextFields();
    materialize_css_1.default.textareaAutoResize(output);
    iconPreview();
}
function trySaveTheme(apply = false) {
    try {
        saveTheme(apply);
    }
    catch (err) {
        alert(err);
    }
}
/**
 * Saves the theme currently displayed in the preview with the given name.
 * If the querystring parameter `theme` exists, it will rename the theme with that value
 * @param {boolean} [apply=false] If true, applies the theme and returns to defaultDomain
 */
function saveTheme(apply = false, imported = false, rawTheme) {
    var _a, _b;
    if (errors.length > 0)
        throw new Error("Please fix all errors before saving the theme:\n" + errors.join("\n"));
    let t = rawTheme !== null && rawTheme !== void 0 ? rawTheme : JSON.parse(output.value);
    if (origThemeName && t.name != origThemeName) {
        ConfirmModal.open("Rename Theme?", `Are you sure you want to rename "${origThemeName}" to "${t.name}"?`, ["Rename", "Cancel"], b => b === "Rename" && doSave(t));
    }
    else {
        (0, analytics_1.trackEvent)("perform_action", {
            id: "color_type",
            context: "New Theme Created",
            value: Object.keys(t.color).find(k => k !== "modern"),
            legacyTarget: "color_type",
            legacyAction: Object.keys(t.color).find(k => k !== "modern"),
            legacyLabel: "New Theme Created",
        });
        (0, analytics_1.trackEvent)("perform_action", {
            id: "logo_type",
            context: "New Theme Created",
            value: ((_a = t === null || t === void 0 ? void 0 : t.logo) === null || _a === void 0 ? void 0 : _a.preset) || "custom",
            legacyTarget: "logo_type",
            legacyAction: ((_b = t === null || t === void 0 ? void 0 : t.logo) === null || _b === void 0 ? void 0 : _b.preset) || "custom",
            legacyLabel: "New Theme Created",
        });
        (0, analytics_1.trackEvent)("perform_action", {
            id: "cursor_type",
            context: "New Theme Created",
            value: t.cursor ? "primary" : "none",
            legacyTarget: "cursor_type",
            legacyAction: t.cursor ? "primary" : "none",
            legacyLabel: "New Theme Created",
        });
        (0, analytics_1.trackEvent)("perform_action", {
            id: "modern_enabled",
            context: "New Theme Created",
            value: String(!!t.color.modern),
            legacyTarget: "modern_enabled",
            legacyAction: String(!!t.color.modern),
            legacyLabel: "New Theme Created",
        });
        (0, analytics_1.trackEvent)("perform_action", {
            id: "preset",
            context: "New Theme Created",
            value: imported ? "Imported" : lastSelectedTemplate !== null && lastSelectedTemplate !== void 0 ? lastSelectedTemplate : undefined,
            legacyTarget: "preset",
            legacyAction: imported ? "Imported" : lastSelectedTemplate !== null && lastSelectedTemplate !== void 0 ? lastSelectedTemplate : undefined,
            legacyLabel: "New Theme Created",
        });
        doSave(t);
    }
    function doSave(t) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let s = yield chrome.storage.sync.get({ themes: [] });
                let themes = s.themes.filter((x) => x.name != (origThemeName || t.name));
                themes.push(t);
                yield chrome.storage.sync.set({ themes: themes });
                handleError();
                ConfirmModal.open("Theme saved successfully", "", ["OK"], () => {
                    origThemeName = t.name;
                    if (apply)
                        chrome.storage.sync.set({ theme: t.name }, () => (location.href = `https://${defaultDomain}`));
                    else
                        location.reload();
                });
            }
            catch (e) {
                handleError();
            }
            function handleError() {
                var _a;
                if (chrome.runtime.lastError) {
                    if ((_a = chrome.runtime.lastError.message) === null || _a === void 0 ? void 0 : _a.includes("QUOTA_BYTES_PER_ITEM")) {
                        alert("No space remaining to save theme. Please delete another theme or make this theme smaller in order to save. Most commonly themes are too large if they have too many custom icons.");
                        throw new Error("No space remaining to save theme. Please delete another theme or make this theme smaller in order to save. Most commonly themes are too large if they have too many custom icons.");
                    }
                }
            }
        });
    }
}
/**
 * Returns a valid CSS color string if input is valid, else returns an empty string
 * @param {string} c A possibly valid CSS color string
 * @returns {string} A valid CSS color string or `""` if input was invalid
 */
function validateColor(c) {
    var ele = document.createElement("div");
    ele.style.color = c;
    return ele.style.color.split(/\s+/).join("").toLowerCase();
}
/**
 * Checks if a URL points to a valid image
 * @param {string} imageSrc An image URL
 * @param {(Event)} validCallback Callback if image is valid
 * @param {(ErrorEvent)} invalidCallback Callback if image is invalid
 */
function checkImage(imageSrc, validCallback, invalidCallback) {
    try {
        var img = new Image();
        if (validCallback)
            img.onload = validCallback;
        if (invalidCallback)
            img.onerror = invalidCallback;
        img.src = imageSrc;
    }
    catch (_a) {
        invalidCallback === null || invalidCallback === void 0 ? void 0 : invalidCallback();
    }
}
/**
 * Checks if a string is a valid JSON object
 * @param {string} str A JSON string
 * @returns {{}|boolean} The object if it is valid JSON, else false
 */
function parseJSONObject(str) {
    var isObject = (val) => (val instanceof Object ? true : false);
    try {
        let o = JSON.parse(str);
        return isObject(o) ? o : false;
    }
    catch (e) {
        return false;
    }
}
/**
 * Applies the theme with the given name
 * @param {string} t The theme's name
 */
function applyTheme(t) {
    importAndRender(allThemes[t]);
}
/**
 * Deletes a theme with the given name from the Chrome Sync Storage
 * @param {string} name The theme's name
 */
function deleteTheme(name) {
    ConfirmModal.open("Delete Theme?", `Are you sure you want to delete the theme "${name}"?\nThe page will reload when the theme is deleted.`, ["Delete", "Cancel"], (b) => __awaiter(this, void 0, void 0, function* () {
        if (b === "Delete") {
            (0, analytics_1.trackEvent)("button_click", {
                id: "delete-theme",
                context: "Theme List",
                value: name,
                legacyTarget: `Theme: ${name}`,
                legacyAction: "delete",
                legacyLabel: "Theme List",
            });
            let s = yield chrome.storage.sync.get(["theme", "themes"]);
            yield chrome.storage.sync.set({
                theme: s.theme == name ? null : s.theme,
                themes: s.themes.filter((x) => x.name != name),
            });
            window.location.reload();
        }
    }));
}
/**
 * Opens the editor interface with the given theme selected, or
 * none selected if name not provided
 * @param {string} [name] The theme to edit
 */
function editTheme(name, replaceName) {
    if (replaceName) {
        lastSelectedTemplate = name;
    }
    (0, analytics_1.trackEvent)("button_click", {
        id: "edit-theme",
        context: "Theme List",
        value: name,
        legacyTarget: `Theme: ${name}`,
        legacyAction: "edit",
        legacyLabel: "Theme List",
    });
    clearInterval(rainbowInterval);
    themesListSection.classList.add("hidden");
    themeEditorSection.classList.remove("hidden");
    let themeToLoad = name ? allThemes[name] : { name: "My Theme", hue: 210 };
    if (replaceName) {
        themeToLoad.name = replaceName;
    }
    importAndRender(themeToLoad);
    previewSection.classList.add("show-editor-controls");
    output.removeAttribute("readonly");
    Array.from(iconList.querySelectorAll(".class-name, .icon-url")).map(x => x.setAttribute("contenteditable", "true"));
    origThemeName = replaceName || name;
    document.querySelector("#json-output + label").textContent = "JSON (Paste to import a theme)";
}
/**
 * Opens a modal allowing user to paste a JSON theme string
 * and then saves the provided theme
 */
function importTheme() {
    PromptModal.open("Import Theme", "Paste theme JSON here", ["Import", "Cancel"], (button, text) => {
        if (button === "Import") {
            try {
                let j = JSON.parse(text);
                importAndRender(j);
                saveTheme(false, true);
            }
            catch (_a) {
                ConfirmModal.open("Error Importing Theme", errors.length > 0 ? errors.join() : "Please provide a valid JSON string", ["OK"]);
            }
        }
    }, "import-theme");
}
/**
 * Cycles the color of the interface
 */
function generateRainbowFunction(theme) {
    if (theme.color.rainbow) {
        return () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            let hue = 0;
            let saturation = 0;
            let lightness = 0;
            let time = new Date().valueOf();
            // Equation for time-based hue, saturation, lightness:
            // hue = (((time / (150 - speed)) + offset) % (alternate ? range * 2 : range)) + min
            // if alternate and hue > max: hue = max - (hue - max)
            if ((_b = (_a = theme.color.rainbow) === null || _a === void 0 ? void 0 : _a.hue) === null || _b === void 0 ? void 0 : _b.animate) {
                let o = theme.color.rainbow.hue.animate;
                if (o.max < o.min) {
                    o.max += 360;
                }
                hue = getComponentValue(o, time);
            }
            else {
                hue = (_e = (_d = (_c = theme.color.rainbow) === null || _c === void 0 ? void 0 : _c.hue) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : 210;
            }
            if ((_g = (_f = theme.color.rainbow) === null || _f === void 0 ? void 0 : _f.saturation) === null || _g === void 0 ? void 0 : _g.animate) {
                saturation = getComponentValue(theme.color.rainbow.saturation.animate, time);
            }
            else {
                saturation = (_k = (_j = (_h = theme.color.rainbow) === null || _h === void 0 ? void 0 : _h.saturation) === null || _j === void 0 ? void 0 : _j.value) !== null && _k !== void 0 ? _k : 100;
            }
            if ((_m = (_l = theme.color.rainbow) === null || _l === void 0 ? void 0 : _l.lightness) === null || _m === void 0 ? void 0 : _m.animate) {
                lightness = getComponentValue(theme.color.rainbow.lightness.animate, time);
            }
            else {
                lightness = (_q = (_p = (_o = theme.color.rainbow) === null || _o === void 0 ? void 0 : _o.lightness) === null || _p === void 0 ? void 0 : _p.value) !== null && _q !== void 0 ? _q : 100;
            }
            document.documentElement.style.setProperty("--color-hue", hue.toString());
            (0, dom_1.setCSSVariable)("primary-color", `hsl(var(--color-hue), ${saturation}%, ${lightness}%)`);
            (0, dom_1.setCSSVariable)("background-color", "hsl(var(--color-hue), 60%, 30%)");
            (0, dom_1.setCSSVariable)("hover-color", "hsl(var(--color-hue), 55%, 40%)");
            (0, dom_1.setCSSVariable)("border-color", "hsl(var(--color-hue), 60%, 25%)");
            (0, dom_1.setCSSVariable)("link-color", "hsl(var(--color-hue), 55%, 40%)");
        };
    }
    return undefined;
    function getComponentValue(animateObject, time) {
        let { speed, offset, alternate, min, max } = animateObject;
        let range = max - min;
        let v = ((time / (150 - speed) + +offset) % (alternate ? range * 2 : range)) + min;
        if (alternate && v > max) {
            v = max - (v - max);
        }
        return v;
    }
}
function addIcon() {
    var _a, _b, _c, _d, _e;
    (0, analytics_1.trackEvent)("button_click", {
        id: "add-theme-icon",
        context: "Theme Editor",
        legacyTarget: "new-icon",
        legacyAction: "click",
        legacyLabel: "Theme Editor",
    });
    let template = `<td style=text-align:center><a class="action-button tooltipped arrow-button move-down"data-tooltip="Move Down"><i class=material-icons>arrow_downward</i> </a><a class="action-button tooltipped arrow-button move-up"data-tooltip="Move Up"><i class=material-icons>arrow_upward</i></a><td class=class-name data-text="Class Name Pattern"><td class=icon-url data-text="Icon URL"><td><img class="small-icon-preview" height=32/></td><td><a class="action-button tooltipped btn-flat delete-icon-button right waves-effect waves-light"data-tooltip=Delete><i class=material-icons>delete</i></a>`;
    let tr = document.createElement("tr");
    tr.innerHTML = template;
    iconList.appendChild(tr);
    let preview = tr.querySelector(".small-icon-preview");
    (_a = tr.querySelector(".move-down")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", moveDown);
    (_b = tr.querySelector(".move-up")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", moveUp);
    (_c = tr.querySelector(".delete-icon-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", deleteIcon);
    // Replaces pasted images with data urls
    // Replaces pasted HTML with plain text
    (_d = tr.querySelector(".class-name")) === null || _d === void 0 ? void 0 : _d.addEventListener("paste", plainTextPaste);
    (_e = tr.querySelector(".icon-url")) === null || _e === void 0 ? void 0 : _e.addEventListener("input", e => (preview.src = e.target.textContent));
    Array.from(tr.querySelectorAll("td")).map(x => x.addEventListener("blur", e => (e.target.scrollLeft = 0)));
    materialize_css_1.default.Tooltip.init(tr.querySelectorAll(".tooltipped"), {
        outDuration: 0,
        inDuration: 300,
        enterDelay: 0,
        exitDelay: 10,
    });
    if (inEditMode()) {
        let arr = Array.from(tr.querySelectorAll(".class-name, .icon-url"));
        arr.map(x => x.setAttribute("contenteditable", "true"));
        arr.map(x => x.addEventListener("input", updateOutput));
    }
    return tr;
}
function plainTextPaste(e) {
    var _a;
    e.preventDefault();
    var text = undefined;
    if (e.clipboardData ||
        e.originalEvent.clipboardData) {
        text = (_a = (e.originalEvent || e).clipboardData) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
    }
    if (document.queryCommandSupported("insertText")) {
        document.execCommand("insertText", false, text);
    }
    else {
        document.execCommand("paste", false, text);
    }
}
function moveUp(e) {
    var _a, _b;
    let target = e.target;
    while ((target === null || target === void 0 ? void 0 : target.tagName) != "TR")
        target = (_a = target === null || target === void 0 ? void 0 : target.parentElement) !== null && _a !== void 0 ? _a : null;
    if (target.previousElementSibling) {
        (_b = target === null || target === void 0 ? void 0 : target.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(target, target.previousElementSibling);
    }
    updateOutput();
}
function moveDown(e) {
    var _a, _b;
    let target = e.target;
    while ((target === null || target === void 0 ? void 0 : target.tagName) != "TR")
        target = (_a = target === null || target === void 0 ? void 0 : target.parentElement) !== null && _a !== void 0 ? _a : null;
    if (target.nextElementSibling) {
        (_b = target === null || target === void 0 ? void 0 : target.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(target.nextElementSibling, target);
    }
    updateOutput();
}
function deleteIcon(e) {
    var _a;
    (0, analytics_1.trackEvent)("button_click", {
        id: "delete-theme-icon",
        context: "Theme Editor",
        legacyTarget: "delete-icon-button",
        legacyAction: "click",
        legacyLabel: "Theme Editor",
    });
    let target = e.target;
    while ((target === null || target === void 0 ? void 0 : target.tagName) != "TR")
        target = (_a = target === null || target === void 0 ? void 0 : target.parentElement) !== null && _a !== void 0 ? _a : null;
    materialize_css_1.default.Tooltip.getInstance(target.querySelector(".delete-icon-button")).destroy();
    target.outerHTML = "";
    updateOutput();
}
function iconPreview() {
    testIcon.src = (s => {
        if (!s) {
            return chrome.runtime.getURL("imgs/fallback-course-icon.svg");
        }
        s += " ";
        if (theme && theme.icons) {
            for (let iconPattern of theme.icons) {
                if (s.match(new RegExp(iconPattern.regex, "i"))) {
                    return iconPattern.url;
                }
            }
        }
        if (isLAUSD() || __storage.useDefaultIconSet === "enabled") {
            for (let iconPattern of default_icons_1.DEFAULT_ICONS) {
                if (s.match(new RegExp(iconPattern.regex, "i"))) {
                    return iconPattern.url;
                }
            }
        }
        return chrome.runtime.getURL("imgs/fallback-course-icon.svg");
    })(iconTestText.value);
}
function copyThemeToClipboard(themeName) {
    (0, analytics_1.trackEvent)("button_click", {
        id: "copy-theme",
        context: "Theme List",
        value: themeName,
        legacyTarget: `Theme: ${themeName}`,
        legacyAction: "copy",
        legacyLabel: "Theme List",
    });
    let text = JSON.stringify(allThemes[themeName]);
    var copyFrom = (0, jquery_1.default)("<textarea/>");
    copyFrom.text(text);
    (0, jquery_1.default)("body").append(copyFrom);
    copyFrom.select();
    document.execCommand("copy");
    copyFrom.remove();
    materialize_css_1.default.toast({ html: `Copied theme "${themeName}" to clipboard` });
}
function inEditMode() {
    return !!document.querySelector(".show-editor-controls");
}
function htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}
function hueSliderEvent(event, ui) {
    var _a, _b;
    if (event.originalEvent) {
        updateOutput();
        document.getElementById(event.target.dataset.display).textContent =
            (_b = (_a = ui.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "<ERR>";
    }
}
function rangeSliderEvent(event, ui) {
    var _a, _b;
    if (event.originalEvent) {
        document.getElementById(event.target.id + "-display").textContent = `${(_a = ui.values) === null || _a === void 0 ? void 0 : _a[0]} - ${(_b = ui.values) === null || _b === void 0 ? void 0 : _b[1]}`;
        updateOutput();
    }
}
function circleRangeSliderEvent() {
    updateOutput();
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

/***/ "./src/scripts/utils/default-icons.ts":
/*!********************************************!*\
  !*** ./src/scripts/utils/default-icons.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_ICONS = void 0;
exports.DEFAULT_ICONS = [
    {
        regex: "\\bPE\\b|Phys(ical)? Edu?(cation)?|\\bSRLA\\b|TRK|TRACK FIELD|CROSS C|ADV COND|MO?V BD AWR|ATHLETIC|SPORTS|FITNESS|PHYS FIT",
        url: "https://cdn-icons-png.flaticon.com/512/2553/2553967.png",
        source: "exercise_2553967",
    },
    {
        regex: "WO?R?LD HIST?(ORY)?|WHG|WLD LANG|LAT AM|INTL REL",
        url: "https://cdn-icons-png.flaticon.com/512/174/174249.png",
        source: "internet_174249",
    },
    {
        regex: "ANIMAL",
        url: "https://cdn-icons-png.flaticon.com/512/2109/2109342.png",
        source: "barn_2109342",
    },
    {
        regex: "ANIM",
        url: "https://cdn-icons-png.flaticon.com/512/2037/2037876.png",
        source: "animation_2037876",
    },
    {
        regex: "FOREN",
        url: "https://cdn-icons-png.flaticon.com/512/1616/1616525.png",
        source: "forensic-science_1616525",
    },
    {
        regex: "AUTO.*[TM]ECH|[MT]ECH.*AUTO|AUTO MAIN",
        url: "https://cdn-icons-png.flaticon.com/512/2040/2040989.png",
        source: "car-service_2040989",
    },
    {
        regex: "ALG(EB|EBRA)?(\\d|\\b)",
        url: "https://cdn-icons-png.flaticon.com/512/167/167753.png",
        source: "blackboard_167753",
    },
    {
        regex: "ART HIST|PAINT",
        url: "https://cdn-icons-png.flaticon.com/512/214/214275.png",
        source: "paint-brush_214275",
    },
    {
        regex: "EUR",
        url: "https://cdn-icons-png.flaticon.com/512/664/664549.png",
        source: "europe_664549",
    },
    {
        regex: "PHYSICS|PHY:C",
        url: "https://cdn-icons-png.flaticon.com/512/164/164969.png",
        source: "science_164969",
    },
    {
        regex: "ASTRONOMY",
        url: "https://cdn-icons-png.flaticon.com/512/124/124553.png",
        source: "telescope_124553",
    },
    {
        regex: "PRE ?CALC",
        url: "https://cdn-icons-png.flaticon.com/512/1074/1074140.png",
        source: "parabola_1074140",
    },
    {
        regex: "BASKETBALL|BSKTBL",
        url: "https://cdn-icons-png.flaticon.com/512/500/500245.png",
        source: "basketball_500245",
    },
    {
        regex: "(^|\\b)CALC(ULUS)?\\b",
        url: "https://cdn-icons-png.flaticon.com/512/1572/1572296.png",
        source: "line-graph_1572296",
    },
    {
        regex: "CHEER|DRILL",
        url: "https://cdn-icons-png.flaticon.com/512/2185/2185584.png",
        source: "cheerleaders_2185584",
    },
    {
        regex: "CHEM",
        url: "https://cdn-icons-png.flaticon.com/512/123/123381.png",
        source: "flask_123381",
    },
    {
        regex: "GAME DESG?N|GAME DESIGN",
        url: "https://cdn-icons-png.flaticon.com/512/1737/1737285.png",
        source: "computer_1737285",
    },
    {
        regex: "COMP SCI?|COMPUTER|INTRO COMP|COMP PRO?G|INTRO PROG|CODING|INTE?R?NE?T|DIGITAL LIT|JAVA",
        url: "https://cdn-icons-png.flaticon.com/512/626/626570.png",
        source: "binary-code_626570",
    },
    {
        regex: "US HIST|AMER(ICAN?)?|AM DEM|AM IMAGE|IB HS AMR",
        url: "https://cdn-icons-png.flaticon.com/512/149/149513.png",
        source: "united-states-of-america_149513",
    },
    {
        regex: "HE?A?LTH|MEDICAL|MED INTERVEN|MEDICINE|HOSP|PATIENT",
        url: "https://cdn-icons-png.flaticon.com/512/179/179555.png",
        source: "first-aid-kit_179555",
    },
    {
        regex: "CERAMICS|AM IND",
        url: "https://cdn-icons-png.flaticon.com/512/123/123458.png",
        source: "pot_123458",
    },
    {
        regex: "FLOR|FLOWER",
        url: "https://cdn-icons-png.flaticon.com/512/346/346167.png",
        source: "flower_346167",
    },
    {
        regex: "MARINE|ZOOLOGY|OCEAN",
        url: "https://cdn-icons-png.flaticon.com/512/146/146718.png",
        source: "turtle_146718",
    },
    {
        regex: "MAND|CHINESE|CHINA|CHIN LANG",
        url: "https://cdn-icons-png.flaticon.com/512/2448/2448781.png",
        source: "flag_2448781",
    },
    {
        regex: "KOREA",
        url: "https://cdn-icons-png.flaticon.com/512/1999/1999610.png",
        source: "korea_1999610",
    },
    {
        regex: "PSYC|IB THEORY",
        url: "https://cdn-icons-png.flaticon.com/512/552/552408.png",
        source: "creativity_552408",
    },
    {
        regex: "PIANO|KEYBOARD",
        url: "https://cdn-icons-png.flaticon.com/512/1973/1973888.png",
        source: "keyboard_1973888",
    },
    {
        regex: "EXPO TE?XT|SH STORY",
        url: "https://cdn-icons-png.flaticon.com/512/176/176690.png",
        source: "writing_176690",
    },
    {
        regex: "DISCR",
        url: "https://cdn-icons-png.flaticon.com/512/251/251986.png",
        source: "calculating_251986",
    },
    {
        regex: "VET",
        url: "https://cdn-icons-png.flaticon.com/512/2659/2659366.png",
        source: "pawprint_2659366",
    },
    {
        regex: "ORCH|VIOLIN|STRINGS",
        url: "https://cdn-icons-png.flaticon.com/512/124/124811.png",
        source: "violin_124811",
    },
    {
        regex: "BAND|MAR DYN",
        url: "https://cdn-icons-png.flaticon.com/512/718/718543.png",
        source: "drums_718543",
    },
    {
        regex: "SOCCER",
        url: "https://cdn-icons-png.flaticon.com/512/1800/1800944.png",
        source: "football_1800944",
    },
    {
        regex: "LACROSS",
        url: "https://cdn-icons-png.flaticon.com/512/2827/2827041.png",
        source: "lacrosse_2827041",
    },
    {
        regex: "MUSIC|JAZZ|CHOIR|INSTRUM|WIND PERC|HARMONY|GLEE|CHORUS|VOC ENSEMBLE|SING|VOICE",
        url: "https://cdn-icons-png.flaticon.com/512/579/579496.png",
        source: "treble-clef_579496",
    },
    {
        regex: "BIO(LOGY|TECH(NOLOGY)?|MED)?\\b|GENETICS",
        url: "https://cdn-icons-png.flaticon.com/512/620/620366.png",
        source: "dna_620366",
    },
    {
        regex: "(^|\\b)LIT(ERATURE)?\\b|READ|L & L|LIBRARY",
        url: "https://cdn-icons-png.flaticon.com/512/167/167755.png",
        source: "open-book_167755",
    },
    {
        regex: "STAGE|THEATRE DSN|TH DSN WKSP|CHORPROC",
        url: "https://cdn-icons-png.flaticon.com/512/2673/2673346.png",
        source: "spotlight_2673346",
    },
    {
        regex: "ADVT DES",
        url: "https://cdn-icons-png.flaticon.com/512/1055/1055664.png",
        source: "ads_1055664",
    },
    {
        regex: "ECON(O(MICS)?)?|AP MA ECO|FIN MGMT|FINANCIAL",
        url: "https://cdn-icons-png.flaticon.com/512/712/712743.png",
        source: "profit_712743",
    },
    {
        regex: "STAT(STICS|ISTCS)|STATS?|STATISTICS",
        url: "https://cdn-icons-png.flaticon.com/512/1006/1006636.png",
        source: "analysis_1006636",
    },
    {
        regex: "FILM(MAKING)?\\b|VIDEO|VID PRD|BRDCST|CINEMA|SCREEN PLAY",
        url: "https://cdn-icons-png.flaticon.com/512/321/321799.png",
        source: "video-camera_321799",
    },
    {
        regex: "(FIR|1)ST RESPONDER",
        url: "https://cdn-icons-png.flaticon.com/512/119/119083.png",
        source: "ambulance_119083",
    },
    {
        regex: "GEOLOGY",
        url: "https://cdn-icons-png.flaticon.com/512/184/184647.png",
        source: "science_184647",
    },
    {
        regex: "COOK|CULINARY|FOOD|CATER",
        url: "https://cdn-icons-png.flaticon.com/512/1142/1142696.png",
        source: "cooking_1142696",
    },
    {
        regex: "\\bGOVT\\b|YOU ADM JUS|JUSTICE",
        url: "https://cdn-icons-png.flaticon.com/512/167/167718.png",
        source: "university_167718",
    },
    {
        regex: "GEOM",
        url: "https://cdn-icons-png.flaticon.com/512/258/258316.png",
        source: "office-material_258316",
    },
    {
        regex: "GUIT(AR)?|MARIACHI|UKELELE",
        url: "https://cdn-icons-png.flaticon.com/512/1586/1586234.png",
        source: "guitar_1586234",
    },
    {
        regex: "MYP ST TECH|\\bCTE\\b|SEM(INAR)?\\b|ENGINEER|\\bENG DE\\b|INTRO ENGIN|CREAT EXP|STEA?M|MULTICRAFT CORE",
        url: "https://cdn-icons-png.flaticon.com/512/1460/1460471.png",
        source: "idea_1460471",
    },
    {
        regex: "FLIGHT|SPACE|AEROSPA?CE",
        url: "https://cdn-icons-png.flaticon.com/512/744/744502.png",
        source: "globe_744502",
    },
    {
        regex: "ENG(LISH)?\\b|CREAT(IVE)? WRI?T(ING)?|\\bCOMP(OSITION)?\\b|\\bERWC\\b|LANGUAGE ARTS|LNG ART|\\bELA\\b",
        url: "https://cdn-icons-png.flaticon.com/512/254/254022.png",
        source: "signing_254022",
    },
    {
        regex: "SPAN(ISH)?\\b|SP LANG",
        url: "https://cdn-icons-png.flaticon.com/512/8081/8081829.png",
        source: "spanish-language_8081829",
    },
    {
        regex: "FREN(CH)?\\b|AP FR LANG",
        url: "https://cdn-icons-png.flaticon.com/512/206/206657.png",
        source: "france_206657",
    },
    {
        regex: "ITALIAN",
        url: "https://cdn-icons-png.flaticon.com/512/555/555668.png",
        source: "italy_555668",
    },
    {
        regex: "ENV",
        url: "https://cdn-icons-png.flaticon.com/512/291/291211.png",
        source: "recycle_291211",
    },
    {
        regex: "ROBOT|MFG|INTRO PHYS COMPUTING|MACHINING|MACHI?NI?ST",
        url: "https://cdn-icons-png.flaticon.com/512/1546/1546683.png",
        source: "robotic-arm_1546683",
    },
    {
        regex: "MEDIA",
        url: "https://cdn-icons-png.flaticon.com/512/1649/1649092.png",
        source: "media-player_1649092",
    },
    {
        regex: "CYBER",
        url: "https://cdn-icons-png.flaticon.com/512/2084/2084028.png",
        source: "cyber-security_2084028",
    },
    {
        regex: "GEOG|HUMAN GEO",
        url: "https://cdn-icons-png.flaticon.com/512/717/717982.png",
        source: "globe_717982",
    },
    {
        regex: "(^|\\b)ART\\b|DES CRAFT|CRAFTS",
        url: "https://cdn-icons-png.flaticon.com/512/1497/1497573.png",
        source: "creativity_1497573",
    },
    {
        regex: "AM SIGN LNG",
        url: "https://cdn-icons-png.flaticon.com/512/2014/2014363.png",
        source: "sign-language_2014363",
    },
    {
        regex: "DANCE?|DN CH|DNC CMP?NT?Y|BALLET?",
        url: "https://cdn-icons-png.flaticon.com/512/493/493507.png",
        source: "dancing_493507",
    },
    {
        regex: "APP CREAT",
        url: "https://cdn-icons-png.flaticon.com/512/186/186239.png",
        source: "smartphone_186239",
    },
    {
        regex: "MUSEUM",
        url: "https://cdn-icons-png.flaticon.com/512/252/252032.png",
        source: "banks_252032",
    },
    {
        regex: "GOLF",
        url: "https://cdn-icons-png.flaticon.com/512/1584/1584143.png",
        source: "golf_1584143",
    },
    {
        regex: "JAPAN",
        url: "https://cdn-icons-png.flaticon.com/512/206/206789.png",
        source: "japan_206789",
    },
    {
        regex: "MEX",
        url: "https://cdn-icons-png.flaticon.com/512/206/206600.png",
        source: "mexico_206600",
    },
    {
        regex: "RUSSIA",
        url: "https://cdn-icons-png.flaticon.com/512/206/206604.png",
        source: "russia_206604",
    },
    {
        regex: "(^|\\b)ELD\\b|(^|\\b)ELS\\b|(^|\\b)ELL\\b",
        url: "https://cdn-icons-png.flaticon.com/512/947/947478.png",
        source: "book_947478",
    },
    {
        regex: "(^|\\b)THEA(T[ER][ER])?\\b|DRAMA|PERFORM ART",
        url: "https://cdn-icons-png.flaticon.com/512/214/214351.png",
        source: "theater_214351",
    },
    {
        regex: "LEADER",
        url: "https://cdn-icons-png.flaticon.com/512/1534/1534091.png",
        source: "government_1534091",
    },
    {
        regex: "SERVICE|T\\.A\\.|PEER COUNSELING|TUTOR|AVID|ETHNIC|ETHN STUDIES|INTERACTIONS|ANTHRO|SOCI|DECATHLON|PENTATHLON|AFRO-AM",
        url: "https://cdn-icons-png.flaticon.com/512/4337/4337288.png",
        source: "idea_4337288",
    },
    {
        regex: "LATIN|\\bLAW\\b|CALLIGRAPHY",
        url: "https://cdn-icons-png.flaticon.com/512/1020/1020074.png",
        source: "manuscript_1020074",
    },
    {
        regex: "HUMANITI?E?S?|LIFE (MGMT|SKI?L?LS)|PHIL",
        url: "https://cdn-icons-png.flaticon.com/512/1205/1205495.png",
        source: "discussion_1205495",
    },
    {
        regex: "YEARBOOK|DIG IMAG|PHOTO",
        url: "https://cdn-icons-png.flaticon.com/512/1006/1006107.png",
        source: "memories_1006107",
    },
    {
        regex: "NETWORKING",
        url: "https://cdn-icons-png.flaticon.com/512/1554/1554377.png",
        source: "network_1554377",
    },
    {
        regex: "RES(EA)?RCH",
        url: "https://cdn-icons-png.flaticon.com/512/164/164996.png",
        source: "research_164996",
    },
    {
        regex: "COL(LEGE)?\\b|CLASS OF",
        url: "https://cdn-icons-png.flaticon.com/512/167/167743.png",
        source: "mortarboard_167743",
    },
    {
        regex: "CAREER|JOB|GEN WRK|\\bWORK\\b|ENTERP|SMALL BUS",
        url: "https://cdn-icons-png.flaticon.com/512/149/149018.png",
        source: "briefcase_149018",
    },
    {
        regex: "ADVIS|HOME|SOCIAL COM|GRADE \\d|BOOKS",
        url: "https://cdn-icons-png.flaticon.com/512/167/167729.png",
        source: "desk_167729",
    },
    {
        regex: "SWIM",
        url: "https://cdn-icons-png.flaticon.com/512/124/124212.png",
        source: "swimming_124212",
    },
    {
        regex: "CONSTRUCTION|WOOD|CARPENTRY?",
        url: "https://cdn-icons-png.flaticon.com/512/1973/1973946.png",
        source: "woodworking_1973946",
    },
    {
        regex: "VO?LLE?YBA?LL?",
        url: "https://cdn-icons-png.flaticon.com/512/68/68175.png",
        source: "volley-ball_68175",
    },
    {
        regex: "FOOTBALL",
        url: "https://cdn-icons-png.flaticon.com/512/167/167741.png",
        source: "american-football_167741",
    },
    {
        regex: "JOURNALI?SM",
        url: "https://cdn-icons-png.flaticon.com/512/1720/1720094.png",
        source: "communication_1720094",
    },
    {
        regex: "TENNIS",
        url: "https://cdn-icons-png.flaticon.com/512/1645/1645793.png",
        source: "tennis_1645793",
    },
    {
        regex: "SPEECH",
        url: "https://cdn-icons-png.flaticon.com/512/512/512500.png",
        source: "speak_512500",
    },
    {
        regex: "WRESTLING",
        url: "https://cdn-icons-png.flaticon.com/512/577/577132.png",
        source: "wrestling_577132",
    },
    {
        regex: "GRAPH(IC)? (DESIGN|COMM|ARTS)|INTR INT VD",
        url: "https://cdn-icons-png.flaticon.com/512/148/148862.png",
        source: "layers_148862",
    },
    {
        regex: "FASH DSN",
        url: "https://cdn-icons-png.flaticon.com/512/770/770088.png",
        source: "dress_770088",
    },
    {
        regex: "JROTC",
        url: "https://cdn-icons-png.flaticon.com/512/942/942444.png",
        source: "rank_942444",
    },
    {
        regex: "WATERPOLO",
        url: "https://cdn-icons-png.flaticon.com/512/625/625383.png",
        source: "water-polo_625383",
    },
    {
        regex: "HORT|LANDSCAP",
        url: "https://cdn-icons-png.flaticon.com/512/346/346195.png",
        source: "sprout_346195",
    },
    {
        regex: "ARABIC",
        url: "https://cdn-icons-png.flaticon.com/512/1704/1704491.png",
        source: "pattern_1704491",
    },
    {
        regex: "GERMAN",
        url: "https://cdn-icons-png.flaticon.com/512/555/555613.png",
        source: "germany_555613",
    },
    {
        regex: "HIST|ANCT CIVL",
        url: "https://cdn-icons-png.flaticon.com/512/1501/1501478.png",
        source: "parchment_1501478",
    },
    {
        regex: "SCULPT",
        url: "https://cdn-icons-png.flaticon.com/512/2071/2071211.png",
        source: "sculpture_2071211",
    },
    {
        regex: "SCI|ISCS",
        url: "https://cdn-icons-png.flaticon.com/512/167/167733.png",
        source: "microscope_167733",
    },
    {
        regex: "(BASE|SOFT)BALL",
        url: "https://cdn-icons-png.flaticon.com/512/1668/1668514.png",
        source: "baseball_1668514",
    },
    {
        regex: "PHYSIO|HUM BODY|BOD DYN|KINESIOLOGY",
        url: "https://cdn-icons-png.flaticon.com/512/2044/2044715.png",
        source: "x-ray_2044715",
    },
    {
        regex: "(^|\\b)MATH|IB MTH",
        url: "https://cdn-icons-png.flaticon.com/512/1284/1284095.png",
        source: "mathematics_1284095",
    },
    {
        regex: "DRAW|2D|3D|DESIGN|DE?SN|DRAFT ARC|SCREEN PRINT|EXPL ARCH|DRAFT TEC",
        url: "https://cdn-icons-png.flaticon.com/512/681/681560.png",
        source: "sketch_681560",
    },
    {
        regex: "SANDBOX",
        url: "https://cdn-icons-png.flaticon.com/512/1588/1588745.png",
        source: "sandbox_1588745",
    },
    {
        regex: "DRIVER|DRIVING",
        url: "https://cdn-icons-png.flaticon.com/512/741/741407.png",
        source: "car_741407",
    },
    {
        regex: ".",
        url: "https://cdn-icons-png.flaticon.com/512/164/164949.png",
        source: "bookshelf_164949",
    },
];


/***/ }),

/***/ "./src/scripts/utils/default-themes.ts":
/*!*********************************************!*\
  !*** ./src/scripts/utils/default-themes.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_THEMES = exports.CLASSIC_THEMES = exports.LAUSD_THEMES = void 0;
const constants_1 = __webpack_require__(/*! ./constants */ "./src/scripts/utils/constants.ts");
exports.LAUSD_THEMES = ["LAUSD Orange", "LAUSD Dark Blue", "LAUSD 2019"];
exports.CLASSIC_THEMES = ["Schoology Plus", "Rainbow"];
exports.DEFAULT_THEMES = [
    {
        name: "Schoology Plus Modern Light",
        version: 2,
        color: {
            hue: 200,
            modern: {
                dark: false,
                interface: {
                    primary: "#EAEAEA",
                    accent: "#F7F7F7",
                    secondary: "#DDD",
                    input: "#D0D0D0",
                    border: "#BABABA",
                    highlight: "rgba(255, 183, 2, 0.2)",
                    active: "rgba(152, 212, 228, 0.8)",
                    grades: "#009400",
                    error: "#F44336",
                },
                calendar: [
                    "#d6e7f4",
                    "#d7e8cf",
                    "#f9e9d4",
                    "#e7e0e5",
                    "#e6b5c9",
                    "#f9f1cf",
                    "#daf0f9",
                    "#f9ddea",
                    "#fbd7d8",
                    "#f1f2d1",
                    "#e0e8f5",
                    "#fbd7e4",
                    "#fcddd3",
                    "#e7f2d5",
                    "#e6e0ee",
                    "#f0e5db",
                    "#fce8d1",
                    "#e1f1e7",
                    "#f0dfed",
                    "#e9e9ea",
                    "#00427c",
                    "#603073",
                    "#8b1941",
                    "#970c0c",
                    "#9c3b07",
                    "#685203",
                    "#2a5f16",
                    "#09584f",
                    "#005a75",
                    "#4d5557",
                ],
                text: {
                    primary: "#2A2A2A",
                    muted: "#677583",
                    contrast: "white",
                },
                options: {
                    borderRadius: 5,
                    borderSize: 1,
                    padding: 10,
                },
            },
        },
        logo: {
            preset: "schoology_plus",
        },
    },
    {
        name: "Schoology Plus Modern Dark",
        version: 2,
        color: {
            custom: {
                primary: "#202225",
                hover: "#40444B",
                background: "#36393f",
                border: "#40444b",
                link: "#6fa8dc",
            },
            modern: {
                dark: true,
                interface: {
                    primary: "#36393F",
                    accent: "#2F3136",
                    secondary: "#202225",
                    input: "#40444B",
                    border: "#DCDDDE",
                    highlight: "rgba(184, 134, 11, 0.2)",
                    active: "rgba(0, 255, 255, 0.1)",
                    grades: "#8BC34A",
                    error: "#F44336",
                },
                calendar: [
                    "#457da5",
                    "#547c41",
                    "#926c37",
                    "#7c3d6b",
                    "#0b4c9c",
                    "#00209c",
                    "#004a09",
                    "#72721a",
                    "#44233e",
                    "#683131",
                    "#770a0a",
                    "#a72413",
                    "#E0024C",
                    "#188C16",
                    "#bd7304",
                    "#80168C",
                    "#164152",
                    "#00543f",
                    "#633e11",
                    "#461b2d",
                    "#00427c",
                    "#603073",
                    "#8b1941",
                    "#970c0c",
                    "#9c3b07",
                    "#685203",
                    "#2a5f16",
                    "#09584f",
                    "#005a75",
                    "#4d5557",
                ],
                text: {
                    primary: "#DCDDDE",
                    muted: "#72767D",
                    contrast: "#EEEEEE",
                },
                options: {
                    borderRadius: 5,
                    borderSize: 1,
                    padding: 10,
                },
            },
        },
        logo: {
            preset: "schoology_plus",
        },
    },
    {
        name: "Rainbow Modern",
        version: 2,
        color: {
            rainbow: {
                hue: {
                    animate: {
                        speed: 50,
                        offset: 0,
                        min: 0,
                        max: 359,
                        alternate: false,
                    },
                },
                saturation: {
                    value: 50,
                },
                lightness: {
                    value: 50,
                },
            },
            modern: {
                dark: false,
                interface: {
                    primary: "#EAEAEA",
                    accent: "#F7F7F7",
                    secondary: "#DDD",
                    input: "#D0D0D0",
                    border: "#BABABA",
                    highlight: "rgba(255, 183, 2, 0.2)",
                    active: "rgba(152, 212, 228, 0.8)",
                    grades: "#009400",
                    error: "#F44336",
                },
                calendar: [
                    "#d6e7f4",
                    "#d7e8cf",
                    "#f9e9d4",
                    "#e7e0e5",
                    "#e6b5c9",
                    "#f9f1cf",
                    "#daf0f9",
                    "#f9ddea",
                    "#fbd7d8",
                    "#f1f2d1",
                    "#e0e8f5",
                    "#fbd7e4",
                    "#fcddd3",
                    "#e7f2d5",
                    "#e6e0ee",
                    "#f0e5db",
                    "#fce8d1",
                    "#e1f1e7",
                    "#f0dfed",
                    "#e9e9ea",
                    "#00427c",
                    "#603073",
                    "#8b1941",
                    "#970c0c",
                    "#9c3b07",
                    "#685203",
                    "#2a5f16",
                    "#09584f",
                    "#005a75",
                    "#4d5557",
                ],
                text: {
                    primary: "#2A2A2A",
                    muted: "#677583",
                    contrast: "white",
                },
                options: {
                    borderRadius: 5,
                    borderSize: 1,
                    padding: 10,
                },
            },
        },
        logo: {
            preset: "schoology_plus",
        },
    },
    {
        name: constants_1.DEFAULT_THEME_NAME,
        version: 2,
        color: {
            hue: 210,
        },
        logo: {
            preset: "schoology_plus",
        },
    },
    {
        name: "Rainbow",
        version: 2,
        color: {
            rainbow: {
                hue: {
                    animate: {
                        speed: 50,
                        offset: 0,
                        min: 0,
                        max: 359,
                        alternate: false,
                    },
                },
                saturation: {
                    value: 50,
                },
                lightness: {
                    value: 50,
                },
            },
        },
        logo: {
            preset: "schoology_plus",
        },
    },
    {
        name: "Toy",
        version: 2,
        color: {
            hue: 150,
        },
        logo: {
            preset: "schoology_plus",
        },
        cursor: {
            primary: chrome.runtime.getURL("/imgs/toy-mode.png"),
        },
    },
    {
        name: "LAUSD Dark Blue",
        version: 2,
        color: {
            custom: {
                primary: "#143f69",
                hover: "#345f89",
                background: "#345f89",
                border: "#024f7d",
            },
        },
        logo: {
            preset: "lausd_2022",
        },
    },
    {
        name: "LAUSD 2019",
        version: 2,
        color: {
            custom: {
                primary: "#143f69",
                hover: "#345f89",
                background: "#345f89",
                border: "#024f7d",
            },
        },
        logo: {
            preset: "lausd_2019",
        },
    },
    {
        name: "LAUSD Orange",
        version: 2,
        color: {
            custom: {
                primary: "#ff7a00",
                hover: "#ff9a20",
                background: "#ff8a10",
                border: "#df5a00",
            },
        },
        logo: {
            preset: "lausd_legacy",
        },
    },
    {
        name: "Schoology Default",
        version: 2,
        color: {
            custom: {
                primary: "#0677ba",
                hover: "#024f7d",
                background: "#002c47",
                border: "#024f7d",
            },
        },
        logo: {
            preset: "schoology_logo",
        },
    },
];


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

/***/ "./src/scripts/utils/theme-model.ts":
/*!******************************************!*\
  !*** ./src/scripts/utils/theme-model.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchoologyTheme = exports.ThemeIcon = exports.ThemeCursor = exports.ThemeLogo = exports.ThemeColor = exports.ModernColorDefinition = exports.ModernOptionsDefinition = exports.ModernTextColorDefinition = exports.ModernInterfaceColorDefinition = exports.RainbowColorDefinition = exports.RainbowColorComponentDefinition = exports.RainbowColorComponentAnimation = exports.CustomColorDefinition = void 0;
class CustomColorDefinition {
    /**
     * Allows fine control over individual colors in the interface
     * @param {string} primary The main interface color used in the navigation bar and as the primary color for buttons and other UI elements.
     * @param {string} hover The color of items in the settings menu
     * @param {string} background The background color of buttons and other interactive elements when you hover over them, and the color of the settings dropdown menu
     * @param {string} border The border color of buttons and the border between the navigation bar and drop-down menus
     * @param {string} link The color of links and other interactive text
     */
    constructor(primary, hover, background, border, link) {
        this.primary = primary;
        this.hover = hover;
        this.background = background;
        this.border = border;
        this.link = link || hover;
    }
    /**
     * Creates and returns a `CustomColorDefinition` given a valid JSON object
     * @param {*} o JSON representation of a `CustomColorDefinition`
     * @returns {CustomColorDefinition}
     */
    static loadFromObject(o) {
        return o
            ? new CustomColorDefinition(o.primary, o.hover, o.background, o.border, o.link || o.hover)
            : undefined;
    }
}
exports.CustomColorDefinition = CustomColorDefinition;
class RainbowColorComponentAnimation {
    /**
     * Defines a color animation
     * @param {number} speed Speed of the animation; larger numbers are faster. (0-100)
     * @param {number} offset The initial value for the animation (the first time step); used to create separation between the animations of the different color compontents.
     * @param {number} min The minimum value in the animation cycle; the animation will cycle through all possible values for the component greater than this value and less than max.
     * @param {number} max The maximum value in the animation cycle; the animation will cycle through all possible values for the component less than this value and greater than min.
     * @param {boolean} alternate When true: color compontent animates from min to max and then from max to min. When false: color component animates from min to max and then resets back to min again
     */
    constructor(speed, offset, min, max, alternate) {
        this.speed = speed;
        this.offset = offset;
        this.min = min;
        this.max = max;
        this.alternate = alternate;
    }
    /**
     * Creates and returns a `RainbowColorComponentAnimation` given a valid JSON object
     * @param {*} o JSON representation of a `RainbowColorComponentAnimation`
     * @returns {RainbowColorComponentAnimation}
     */
    static loadFromObject(o) {
        return o
            ? new RainbowColorComponentAnimation(o.speed, o.offset, o.min, o.max, o.alternate)
            : undefined;
    }
}
exports.RainbowColorComponentAnimation = RainbowColorComponentAnimation;
class RainbowColorComponentDefinition {
    /**
     * Defines a rainbow color component (hue, saturation, lightness)
     * @param {RainbowColorComponentAnimation} animate Defines a color animation
     * @param {number} value Defines a static color
     */
    constructor(animate, value) {
        this.animate = animate;
        this.value = value;
    }
    /**
     * Creates and returns a `RainbowColorComponentDefinition` given a valid JSON object
     * @param {*} o JSON representation of a `RainbowColorComponentDefinition`
     * @returns {RainbowColorComponentDefinition}
     */
    static loadFromObject(o) {
        return o
            ? new RainbowColorComponentDefinition(RainbowColorComponentAnimation.loadFromObject(o.animate), o.value)
            : undefined;
    }
}
exports.RainbowColorComponentDefinition = RainbowColorComponentDefinition;
class RainbowColorDefinition {
    /**
     * Allows for animations of hue, saturation, and lightness of interface colors.
     * @param {RainbowColorComponentDefinition} hue Defines behavior of the hue component of the interface colors
     * @param {RainbowColorComponentDefinition} saturation Defines behavior of the saturation component of the interface colors
     * @param {RainbowColorComponentDefinition} lightness Defines behavior of the lightness component of the interface colors
     */
    constructor(hue, saturation, lightness) {
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
    }
    /**
     * Creates and returns a `RainbowColorDefinition` given a valid JSON object
     * @param {*} o JSON representation of a `RainbowColorDefinition`
     * @returns {RainbowColorDefinition}
     */
    static loadFromObject(o) {
        return o
            ? new RainbowColorDefinition(RainbowColorComponentDefinition.loadFromObject(o.hue), RainbowColorComponentDefinition.loadFromObject(o.saturation), RainbowColorComponentDefinition.loadFromObject(o.lightness))
            : undefined;
    }
}
exports.RainbowColorDefinition = RainbowColorDefinition;
class ModernInterfaceColorDefinition {
    /**
     * Defines individual colors for different Schoology interface components
     * @param {string} primary Primary interface color -- should be the lightest of the main colors
     * @param {string} accent Accent interface color -- should be darker than primary, but lighter than secondary
     * @param {string} secondary Secondary interface color -- should be the darkest of the main colors
     * @param {string} input Color for textboxes and other input fields
     * @param {string} border Color for element borders
     * @param {string} highlight Color for highlights, warnings, and wrong answers
     * @param {string} active Color for active elements, selected items, and correct answers
     * @param {string} grades Color for grades and scores
     * @param {string} error Color for error messages and icons
     */
    constructor(primary, accent, secondary, input, border, highlight, active, grades, error) {
        this.primary = primary;
        this.accent = accent;
        this.secondary = secondary;
        this.input = input;
        this.border = border;
        this.highlight = highlight;
        this.active = active;
        this.grades = grades;
        this.error = error;
    }
    /**
     * Creates and returns a `ModernInterfaceColorDefinition` given a valid JSON object
     * @param {*} o JSON representation of a `ModernInterfaceColorDefinition`
     * @returns {ModernInterfaceColorDefinition}
     */
    static loadFromObject(o) {
        return o
            ? new ModernInterfaceColorDefinition(o.primary, o.accent, o.secondary, o.input, o.border, o.highlight, o.active, o.grades, o.error)
            : undefined;
    }
}
exports.ModernInterfaceColorDefinition = ModernInterfaceColorDefinition;
class ModernTextColorDefinition {
    /**
     * Defines colors for textual elements of the Schoology interface
     * @param {string} primary Main text color, should contrast with `interface.primary`
     * @param {string} muted Muted text color, should stand out less than primary
     * @param {string} contrast Contrast text color, should always be light or white
     */
    constructor(primary, muted, contrast) {
        this.primary = primary;
        this.muted = muted;
        this.contrast = contrast;
    }
    /**
     * Creates and returns a `ModernTextColorDefinition` given a valid JSON object
     * @param {*} o JSON representation of a `ModernTextColorDefinition`
     * @returns {ModernTextColorDefinition}
     */
    static loadFromObject(o) {
        return o ? new ModernTextColorDefinition(o.primary, o.muted, o.contrast) : undefined;
    }
}
exports.ModernTextColorDefinition = ModernTextColorDefinition;
class ModernOptionsDefinition {
    /**
     * Configures style options for the modern theme engine
     * @param {number} borderRadius The size of border radius rounded corners (in pixels)
     * @param {number} borderSize The width of borders (in pixels)
     * @param {number} padding The amount of padding for certain elements (in pixels)
     */
    constructor(borderRadius, borderSize, padding) {
        this.borderRadius = borderRadius;
        this.borderSize = borderSize;
        this.padding = padding;
    }
    /**
     * Creates and returns a `ModernOptionsDefinition` given a valid JSON object
     * @param {*} o JSON representation of a `ModernOptionsDefinition`
     * @returns {ModernOptionsDefinition}
     */
    static loadFromObject(o) {
        return o ? new ModernOptionsDefinition(o.borderRadius, o.borderSize, o.padding) : undefined;
    }
}
exports.ModernOptionsDefinition = ModernOptionsDefinition;
class ModernColorDefinition {
    /**
     * Utilizes the modern theme engine to control significantly more of the interface's colors.
     * @param {boolean} dark Whether the theme is dark or light
     * @param {ModernInterfaceColorDefinition} interfaceColors Colors for main interface components
     * @param {string[]} calendar Colors for Schoology calendar events (specify exactly 20)
     * @param {ModernTextColorDefinition} text Colors for text elements
     * @param {ModernOptionsDefinition} options Style options for the interface
     */
    constructor(dark, interfaceColors, calendar, text, options) {
        this.dark = dark;
        this.interface = interfaceColors;
        this.calendar = calendar;
        this.text = text;
        this.options = options;
    }
    /**
     * Creates and returns a `ModernColorDefinition` given a valid JSON object
     * @param {*} o JSON representation of a `ModernColorDefinition`
     * @returns {ModernColorDefinition}
     */
    static loadFromObject(o) {
        return o
            ? new ModernColorDefinition(o.dark, ModernInterfaceColorDefinition.loadFromObject(o.interface), o.calendar, ModernTextColorDefinition.loadFromObject(o.text), ModernOptionsDefinition.loadFromObject(o.options))
            : undefined;
    }
}
exports.ModernColorDefinition = ModernColorDefinition;
class ThemeColor {
    /**
     * Describes the colors to use for the Schoology interface
     * @param {number} hue The theme's HSL color hue, used to color the interface by modifying the saturation and lightness values
     * @param {CustomColorDefinition} custom Allows fine control over individual colors in the interface
     * @param {RainbowColorDefinition} rainbow Allows for animations of hue, saturation, and lightness of interface colors
     * @param {ModernColorDefinition} modern Utilizes the modern theme engine to control significantly more of the interface's colors
     */
    constructor(hue, custom, rainbow, modern) {
        this.hue = hue;
        this.custom = custom;
        this.rainbow = rainbow;
        this.modern = modern;
    }
    /**
     * Creates and returns a `ThemeColor` given a valid JSON object
     * @param {*} o JSON representation of a `ThemeColor`
     * @returns {ThemeColor}
     */
    static loadFromObject(o) {
        return o
            ? new ThemeColor(o.hue, CustomColorDefinition.loadFromObject(o.custom), RainbowColorDefinition.loadFromObject(o.rainbow), ModernColorDefinition.loadFromObject(o.modern))
            : new ThemeColor(210);
    }
}
exports.ThemeColor = ThemeColor;
class ThemeLogo {
    /**
     * Defines a logo image
     * @param {string} url Link to an image
     * @param {"schoology_plus"|"schoology_logo"|"lausd_legacy"|"lausd_2019"|"lausd_2022"|"default"} preset Built-in image
     */
    constructor(url, preset) {
        this.url = url;
        this.preset = preset;
    }
    /**
     * Creates and returns a `ThemeLogo` given a valid JSON object
     * @param {*} o JSON representation of a `ThemeLogo`
     * @returns {ThemeLogo}
     */
    static loadFromObject(o) {
        return o ? new ThemeLogo(o.url, o.preset) : new ThemeLogo(undefined, "schoology_plus");
    }
}
exports.ThemeLogo = ThemeLogo;
class ThemeCursor {
    /**
     * Defines a cursor image
     * @param {string} primary Link to an image
     */
    constructor(primary) {
        this.primary = primary;
    }
    /**
     * Creates and returns a `ThemeCursor` given a valid JSON object
     * @param {*} o JSON representation of a `ThemeCursor`
     * @returns {ThemeCursor}
     */
    static loadFromObject(o) {
        return o ? new ThemeCursor(o.primary) : undefined;
    }
}
exports.ThemeCursor = ThemeCursor;
class ThemeIcon {
    /**
     * Defines a custom course icon
     * @param {RegExp|string} regex Regular expression to match courses
     * @param {string} url Link to an image
     */
    constructor(regex, url) {
        this.regex = regex;
        this.url = url;
    }
    /**
     * Creates and returns a `ThemeIcon[]` given a valid JSON array
     * @param {[]} array JSON representation of a `ThemeIcon[]`
     * @returns {ThemeIcon[]}
     */
    static loadArrayFromObject(array) {
        return array ? array.map(x => new ThemeIcon(x.regex, x.url)) : undefined;
    }
}
exports.ThemeIcon = ThemeIcon;
class SchoologyTheme {
    /**
     * Creates a theme from the given parameters
     * @param {string} name Used for identification purposes
     * @param {number} version Theme specification version
     * @param {ThemeColor} color Interface colors
     * @param {ThemeLogo} logo Logo image
     * @param {ThemeCursor} cursor Cursor image
     * @param {ThemeIcon[]} icons Custom course icons
     */
    constructor(name, version, color, logo, cursor, icons) {
        if (!name) {
            throw new Error("Theme must have a name");
        }
        this.name = name;
        this.version = version || SchoologyTheme.CURRENT_VERSION;
        this.color = color;
        this.logo = logo;
        this.cursor = cursor;
        this.icons = icons;
    }
    toString() {
        return JSON.stringify(this);
    }
    /**
     * Creates and returns a `SchoologyTheme` given a valid JSON object
     * @param {*} o JSON representation of a `SchoologyTheme`
     * @returns {SchoologyTheme}
     */
    static loadFromObject(o) {
        if (o && o.version === SchoologyTheme.CURRENT_VERSION) {
            return new SchoologyTheme(o.name, o.version, ThemeColor.loadFromObject(o.color), ThemeLogo.loadFromObject(o.logo), ThemeCursor.loadFromObject(o.cursor), ThemeIcon.loadArrayFromObject(o.icons));
        }
        throw new Error(`Invalid theme object provided. Make sure the provided JSON is a valid version ${SchoologyTheme.CURRENT_VERSION} theme.`);
    }
}
exports.SchoologyTheme = SchoologyTheme;
SchoologyTheme.CURRENT_VERSION = 2;


/***/ }),

/***/ "materialize-css":
/*!********************!*\
  !*** external "M" ***!
  \********************/
/***/ ((module) => {

"use strict";
module.exports = M;

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = jQuery;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/theme-editor.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDZCQUE2QjtBQUM3RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0EsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLElBQUksK0NBQStDO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGtEQUFrRCwyQkFBMkI7QUFDN0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLGdCQUFnQjtBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUZBQXVGLGlCQUFpQjtBQUN4RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQiwyQkFBMkI7QUFDM0IsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FB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O0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBLFVBQVUsaUJBQWlCLGFBQWEsaUJBQWlCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsK0NBQStDLElBQUksOENBQThDO0FBQ3RLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxtQkFBbUI7QUFDOUI7QUFDQTtBQUNBLDhCQUE4QixHQUFHO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrSUFBa0ksVUFBVTtBQUM1STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLFdBQVc7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQyxrQ0FB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MUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMscUNBQXFDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxVQUFVO0FBQzFDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsdUJBQXVCLFVBQVUsaUJBQWlCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7OztBQ2poQmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsc0JBQXNCLEdBQUcsc0JBQXNCLEdBQUcsb0JBQW9CO0FBQ3RFLG9CQUFvQixtQkFBTyxDQUFDLHFEQUFhO0FBQ3pDLG9CQUFvQjtBQUNwQixzQkFBc0I7QUFDdEIsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNB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QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlHQUF5RyxnQ0FBZ0M7QUFDekk7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qjs7Ozs7Ozs7Ozs7O0FDOVVBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9ub2RlX21vZHVsZXMvc3BlY3RydW0tY29sb3JwaWNrZXIvc3BlY3RydW0uanMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9zcmMvc2NyaXB0cy90aGVtZS1lZGl0b3IudHMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9zcmMvc2NyaXB0cy91dGlscy9hbmFseXRpY3MudHMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9zcmMvc2NyaXB0cy91dGlscy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9zcmMvc2NyaXB0cy91dGlscy9kZWZhdWx0LWljb25zLnRzIiwid2VicGFjazovL3NjaG9vbG9neS1wbHVzLy4vc3JjL3NjcmlwdHMvdXRpbHMvZGVmYXVsdC10aGVtZXMudHMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9zcmMvc2NyaXB0cy91dGlscy9kb20udHMiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9zcmMvc2NyaXB0cy91dGlscy90aGVtZS1tb2RlbC50cyIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy9leHRlcm5hbCB2YXIgXCJNXCIiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvZXh0ZXJuYWwgdmFyIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNwZWN0cnVtIENvbG9ycGlja2VyIHYxLjguMVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jncmlucy9zcGVjdHJ1bVxuLy8gQXV0aG9yOiBCcmlhbiBHcmluc3RlYWRcbi8vIExpY2Vuc2U6IE1JVFxuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHsgLy8gQU1EXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlID09IFwib2JqZWN0XCIpIHsgLy8gQ29tbW9uSlNcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9XG4gICAgZWxzZSB7IC8vIEJyb3dzZXJcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uKCQsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGRlZmF1bHRPcHRzID0ge1xuXG4gICAgICAgIC8vIENhbGxiYWNrc1xuICAgICAgICBiZWZvcmVTaG93OiBub29wLFxuICAgICAgICBtb3ZlOiBub29wLFxuICAgICAgICBjaGFuZ2U6IG5vb3AsXG4gICAgICAgIHNob3c6IG5vb3AsXG4gICAgICAgIGhpZGU6IG5vb3AsXG5cbiAgICAgICAgLy8gT3B0aW9uc1xuICAgICAgICBjb2xvcjogZmFsc2UsXG4gICAgICAgIGZsYXQ6IGZhbHNlLFxuICAgICAgICBzaG93SW5wdXQ6IGZhbHNlLFxuICAgICAgICBhbGxvd0VtcHR5OiBmYWxzZSxcbiAgICAgICAgc2hvd0J1dHRvbnM6IHRydWUsXG4gICAgICAgIGNsaWNrb3V0RmlyZXNDaGFuZ2U6IHRydWUsXG4gICAgICAgIHNob3dJbml0aWFsOiBmYWxzZSxcbiAgICAgICAgc2hvd1BhbGV0dGU6IGZhbHNlLFxuICAgICAgICBzaG93UGFsZXR0ZU9ubHk6IGZhbHNlLFxuICAgICAgICBoaWRlQWZ0ZXJQYWxldHRlU2VsZWN0OiBmYWxzZSxcbiAgICAgICAgdG9nZ2xlUGFsZXR0ZU9ubHk6IGZhbHNlLFxuICAgICAgICBzaG93U2VsZWN0aW9uUGFsZXR0ZTogdHJ1ZSxcbiAgICAgICAgbG9jYWxTdG9yYWdlS2V5OiBmYWxzZSxcbiAgICAgICAgYXBwZW5kVG86IFwiYm9keVwiLFxuICAgICAgICBtYXhTZWxlY3Rpb25TaXplOiA3LFxuICAgICAgICBjYW5jZWxUZXh0OiBcImNhbmNlbFwiLFxuICAgICAgICBjaG9vc2VUZXh0OiBcImNob29zZVwiLFxuICAgICAgICB0b2dnbGVQYWxldHRlTW9yZVRleHQ6IFwibW9yZVwiLFxuICAgICAgICB0b2dnbGVQYWxldHRlTGVzc1RleHQ6IFwibGVzc1wiLFxuICAgICAgICBjbGVhclRleHQ6IFwiQ2xlYXIgQ29sb3IgU2VsZWN0aW9uXCIsXG4gICAgICAgIG5vQ29sb3JTZWxlY3RlZFRleHQ6IFwiTm8gQ29sb3IgU2VsZWN0ZWRcIixcbiAgICAgICAgcHJlZmVycmVkRm9ybWF0OiBmYWxzZSxcbiAgICAgICAgY2xhc3NOYW1lOiBcIlwiLCAvLyBEZXByZWNhdGVkIC0gdXNlIGNvbnRhaW5lckNsYXNzTmFtZSBhbmQgcmVwbGFjZXJDbGFzc05hbWUgaW5zdGVhZC5cbiAgICAgICAgY29udGFpbmVyQ2xhc3NOYW1lOiBcIlwiLFxuICAgICAgICByZXBsYWNlckNsYXNzTmFtZTogXCJcIixcbiAgICAgICAgc2hvd0FscGhhOiBmYWxzZSxcbiAgICAgICAgdGhlbWU6IFwic3AtbGlnaHRcIixcbiAgICAgICAgcGFsZXR0ZTogW1tcIiNmZmZmZmZcIiwgXCIjMDAwMDAwXCIsIFwiI2ZmMDAwMFwiLCBcIiNmZjgwMDBcIiwgXCIjZmZmZjAwXCIsIFwiIzAwODAwMFwiLCBcIiMwMDAwZmZcIiwgXCIjNGIwMDgyXCIsIFwiIzk0MDBkM1wiXV0sXG4gICAgICAgIHNlbGVjdGlvblBhbGV0dGU6IFtdLFxuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIG9mZnNldDogbnVsbFxuICAgIH0sXG4gICAgc3BlY3RydW1zID0gW10sXG4gICAgSUUgPSAhIS9tc2llL2kuZXhlYyggd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgKSxcbiAgICByZ2JhU3VwcG9ydCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gY29udGFpbnMoIHN0ciwgc3Vic3RyICkge1xuICAgICAgICAgICAgcmV0dXJuICEhfignJyArIHN0cikuaW5kZXhPZihzdWJzdHIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdmFyIHN0eWxlID0gZWxlbS5zdHlsZTtcbiAgICAgICAgc3R5bGUuY3NzVGV4dCA9ICdiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpJztcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zKHN0eWxlLmJhY2tncm91bmRDb2xvciwgJ3JnYmEnKSB8fCBjb250YWlucyhzdHlsZS5iYWNrZ3JvdW5kQ29sb3IsICdoc2xhJyk7XG4gICAgfSkoKSxcbiAgICByZXBsYWNlSW5wdXQgPSBbXG4gICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtcmVwbGFjZXInPlwiLFxuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1wcmV2aWV3Jz48ZGl2IGNsYXNzPSdzcC1wcmV2aWV3LWlubmVyJz48L2Rpdj48L2Rpdj5cIixcbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtZGQnPiYjOTY2MDs8L2Rpdj5cIixcbiAgICAgICAgXCI8L2Rpdj5cIlxuICAgIF0uam9pbignJyksXG4gICAgbWFya3VwID0gKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvLyBJRSBkb2VzIG5vdCBzdXBwb3J0IGdyYWRpZW50cyB3aXRoIG11bHRpcGxlIHN0b3BzLCBzbyB3ZSBuZWVkIHRvIHNpbXVsYXRlXG4gICAgICAgIC8vICB0aGF0IGZvciB0aGUgcmFpbmJvdyBzbGlkZXIgd2l0aCA4IGRpdnMgdGhhdCBlYWNoIGhhdmUgYSBzaW5nbGUgZ3JhZGllbnRcbiAgICAgICAgdmFyIGdyYWRpZW50Rml4ID0gXCJcIjtcbiAgICAgICAgaWYgKElFKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSA2OyBpKyspIHtcbiAgICAgICAgICAgICAgICBncmFkaWVudEZpeCArPSBcIjxkaXYgY2xhc3M9J3NwLVwiICsgaSArIFwiJz48L2Rpdj5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWNvbnRhaW5lciBzcC1oaWRkZW4nPlwiLFxuICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtcGFsZXR0ZS1jb250YWluZXInPlwiLFxuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLXBhbGV0dGUgc3AtdGh1bWIgc3AtY2YnPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLXBhbGV0dGUtYnV0dG9uLWNvbnRhaW5lciBzcC1jZic+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc3AtcGFsZXR0ZS10b2dnbGUnPjwvYnV0dG9uPlwiLFxuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1waWNrZXItY29udGFpbmVyJz5cIixcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC10b3Agc3AtY2YnPlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1maWxsJz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtdG9wLWlubmVyJz5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWNvbG9yJz5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1zYXQnPlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC12YWwnPlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtZHJhZ2dlcic+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1jbGVhciBzcC1jbGVhci1kaXNwbGF5Jz5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtaHVlJz5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1zbGlkZXInPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkaWVudEZpeCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtYWxwaGEnPjxkaXYgY2xhc3M9J3NwLWFscGhhLWlubmVyJz48ZGl2IGNsYXNzPSdzcC1hbHBoYS1oYW5kbGUnPjwvZGl2PjwvZGl2PjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWlucHV0LWNvbnRhaW5lciBzcC1jZic+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxpbnB1dCBjbGFzcz0nc3AtaW5wdXQnIHR5cGU9J3RleHQnIHNwZWxsY2hlY2s9J2ZhbHNlJyAgLz5cIixcbiAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1pbml0aWFsIHNwLXRodW1iIHNwLWNmJz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1idXR0b24tY29udGFpbmVyIHNwLWNmJz5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGEgY2xhc3M9J3NwLWNhbmNlbCcgaHJlZj0nIyc+PC9hPlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NwLWNob29zZSc+PC9idXR0b24+XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgICAgICAgIFwiPC9kaXY+XCJcbiAgICAgICAgXS5qb2luKFwiXCIpO1xuICAgIH0pKCk7XG5cbiAgICBmdW5jdGlvbiBwYWxldHRlVGVtcGxhdGUgKHAsIGNvbG9yLCBjbGFzc05hbWUsIG9wdHMpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHBbaV07XG4gICAgICAgICAgICBpZihjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbnkgPSB0aW55Y29sb3IoY3VycmVudCk7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSB0aW55LnRvSHNsKCkubCA8IDAuNSA/IFwic3AtdGh1bWItZWwgc3AtdGh1bWItZGFya1wiIDogXCJzcC10aHVtYi1lbCBzcC10aHVtYi1saWdodFwiO1xuICAgICAgICAgICAgICAgIGMgKz0gKHRpbnljb2xvci5lcXVhbHMoY29sb3IsIGN1cnJlbnQpKSA/IFwiIHNwLXRodW1iLWFjdGl2ZVwiIDogXCJcIjtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkU3RyaW5nID0gdGlueS50b1N0cmluZyhvcHRzLnByZWZlcnJlZEZvcm1hdCB8fCBcInJnYlwiKTtcbiAgICAgICAgICAgICAgICB2YXIgc3dhdGNoU3R5bGUgPSByZ2JhU3VwcG9ydCA/IChcImJhY2tncm91bmQtY29sb3I6XCIgKyB0aW55LnRvUmdiU3RyaW5nKCkpIDogXCJmaWx0ZXI6XCIgKyB0aW55LnRvRmlsdGVyKCk7XG4gICAgICAgICAgICAgICAgaHRtbC5wdXNoKCc8c3BhbiB0aXRsZT1cIicgKyBmb3JtYXR0ZWRTdHJpbmcgKyAnXCIgZGF0YS1jb2xvcj1cIicgKyB0aW55LnRvUmdiU3RyaW5nKCkgKyAnXCIgY2xhc3M9XCInICsgYyArICdcIj48c3BhbiBjbGFzcz1cInNwLXRodW1iLWlubmVyXCIgc3R5bGU9XCInICsgc3dhdGNoU3R5bGUgKyAnO1wiPjwvc3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBjbHMgPSAnc3AtY2xlYXItZGlzcGxheSc7XG4gICAgICAgICAgICAgICAgaHRtbC5wdXNoKCQoJzxkaXYgLz4nKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCQoJzxzcGFuIGRhdGEtY29sb3I9XCJcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7XCIgY2xhc3M9XCInICsgY2xzICsgJ1wiPjwvc3Bhbj4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RpdGxlJywgb3B0cy5ub0NvbG9yU2VsZWN0ZWRUZXh0KVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5odG1sKClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIjxkaXYgY2xhc3M9J3NwLWNmIFwiICsgY2xhc3NOYW1lICsgXCInPlwiICsgaHRtbC5qb2luKCcnKSArIFwiPC9kaXY+XCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZUFsbCgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGVjdHJ1bXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzcGVjdHJ1bXNbaV0pIHtcbiAgICAgICAgICAgICAgICBzcGVjdHJ1bXNbaV0uaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFuY2VPcHRpb25zKG8sIGNhbGxiYWNrQ29udGV4dCkge1xuICAgICAgICB2YXIgb3B0cyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0cywgbyk7XG4gICAgICAgIG9wdHMuY2FsbGJhY2tzID0ge1xuICAgICAgICAgICAgJ21vdmUnOiBiaW5kKG9wdHMubW92ZSwgY2FsbGJhY2tDb250ZXh0KSxcbiAgICAgICAgICAgICdjaGFuZ2UnOiBiaW5kKG9wdHMuY2hhbmdlLCBjYWxsYmFja0NvbnRleHQpLFxuICAgICAgICAgICAgJ3Nob3cnOiBiaW5kKG9wdHMuc2hvdywgY2FsbGJhY2tDb250ZXh0KSxcbiAgICAgICAgICAgICdoaWRlJzogYmluZChvcHRzLmhpZGUsIGNhbGxiYWNrQ29udGV4dCksXG4gICAgICAgICAgICAnYmVmb3JlU2hvdyc6IGJpbmQob3B0cy5iZWZvcmVTaG93LCBjYWxsYmFja0NvbnRleHQpXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3BlY3RydW0oZWxlbWVudCwgbykge1xuXG4gICAgICAgIHZhciBvcHRzID0gaW5zdGFuY2VPcHRpb25zKG8sIGVsZW1lbnQpLFxuICAgICAgICAgICAgZmxhdCA9IG9wdHMuZmxhdCxcbiAgICAgICAgICAgIHNob3dTZWxlY3Rpb25QYWxldHRlID0gb3B0cy5zaG93U2VsZWN0aW9uUGFsZXR0ZSxcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZUtleSA9IG9wdHMubG9jYWxTdG9yYWdlS2V5LFxuICAgICAgICAgICAgdGhlbWUgPSBvcHRzLnRoZW1lLFxuICAgICAgICAgICAgY2FsbGJhY2tzID0gb3B0cy5jYWxsYmFja3MsXG4gICAgICAgICAgICByZXNpemUgPSB0aHJvdHRsZShyZWZsb3csIDEwKSxcbiAgICAgICAgICAgIHZpc2libGUgPSBmYWxzZSxcbiAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSBmYWxzZSxcbiAgICAgICAgICAgIGRyYWdXaWR0aCA9IDAsXG4gICAgICAgICAgICBkcmFnSGVpZ2h0ID0gMCxcbiAgICAgICAgICAgIGRyYWdIZWxwZXJIZWlnaHQgPSAwLFxuICAgICAgICAgICAgc2xpZGVIZWlnaHQgPSAwLFxuICAgICAgICAgICAgc2xpZGVXaWR0aCA9IDAsXG4gICAgICAgICAgICBhbHBoYVdpZHRoID0gMCxcbiAgICAgICAgICAgIGFscGhhU2xpZGVIZWxwZXJXaWR0aCA9IDAsXG4gICAgICAgICAgICBzbGlkZUhlbHBlckhlaWdodCA9IDAsXG4gICAgICAgICAgICBjdXJyZW50SHVlID0gMCxcbiAgICAgICAgICAgIGN1cnJlbnRTYXR1cmF0aW9uID0gMCxcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IDAsXG4gICAgICAgICAgICBjdXJyZW50QWxwaGEgPSAxLFxuICAgICAgICAgICAgcGFsZXR0ZSA9IFtdLFxuICAgICAgICAgICAgcGFsZXR0ZUFycmF5ID0gW10sXG4gICAgICAgICAgICBwYWxldHRlTG9va3VwID0ge30sXG4gICAgICAgICAgICBzZWxlY3Rpb25QYWxldHRlID0gb3B0cy5zZWxlY3Rpb25QYWxldHRlLnNsaWNlKDApLFxuICAgICAgICAgICAgbWF4U2VsZWN0aW9uU2l6ZSA9IG9wdHMubWF4U2VsZWN0aW9uU2l6ZSxcbiAgICAgICAgICAgIGRyYWdnaW5nQ2xhc3MgPSBcInNwLWRyYWdnaW5nXCIsXG4gICAgICAgICAgICBzaGlmdE1vdmVtZW50RGlyZWN0aW9uID0gbnVsbDtcblxuICAgICAgICB2YXIgZG9jID0gZWxlbWVudC5vd25lckRvY3VtZW50LFxuICAgICAgICAgICAgYm9keSA9IGRvYy5ib2R5LFxuICAgICAgICAgICAgYm91bmRFbGVtZW50ID0gJChlbGVtZW50KSxcbiAgICAgICAgICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgICAgICAgICBjb250YWluZXIgPSAkKG1hcmt1cCwgZG9jKS5hZGRDbGFzcyh0aGVtZSksXG4gICAgICAgICAgICBwaWNrZXJDb250YWluZXIgPSBjb250YWluZXIuZmluZChcIi5zcC1waWNrZXItY29udGFpbmVyXCIpLFxuICAgICAgICAgICAgZHJhZ2dlciA9IGNvbnRhaW5lci5maW5kKFwiLnNwLWNvbG9yXCIpLFxuICAgICAgICAgICAgZHJhZ0hlbHBlciA9IGNvbnRhaW5lci5maW5kKFwiLnNwLWRyYWdnZXJcIiksXG4gICAgICAgICAgICBzbGlkZXIgPSBjb250YWluZXIuZmluZChcIi5zcC1odWVcIiksXG4gICAgICAgICAgICBzbGlkZUhlbHBlciA9IGNvbnRhaW5lci5maW5kKFwiLnNwLXNsaWRlclwiKSxcbiAgICAgICAgICAgIGFscGhhU2xpZGVySW5uZXIgPSBjb250YWluZXIuZmluZChcIi5zcC1hbHBoYS1pbm5lclwiKSxcbiAgICAgICAgICAgIGFscGhhU2xpZGVyID0gY29udGFpbmVyLmZpbmQoXCIuc3AtYWxwaGFcIiksXG4gICAgICAgICAgICBhbHBoYVNsaWRlSGVscGVyID0gY29udGFpbmVyLmZpbmQoXCIuc3AtYWxwaGEtaGFuZGxlXCIpLFxuICAgICAgICAgICAgdGV4dElucHV0ID0gY29udGFpbmVyLmZpbmQoXCIuc3AtaW5wdXRcIiksXG4gICAgICAgICAgICBwYWxldHRlQ29udGFpbmVyID0gY29udGFpbmVyLmZpbmQoXCIuc3AtcGFsZXR0ZVwiKSxcbiAgICAgICAgICAgIGluaXRpYWxDb2xvckNvbnRhaW5lciA9IGNvbnRhaW5lci5maW5kKFwiLnNwLWluaXRpYWxcIiksXG4gICAgICAgICAgICBjYW5jZWxCdXR0b24gPSBjb250YWluZXIuZmluZChcIi5zcC1jYW5jZWxcIiksXG4gICAgICAgICAgICBjbGVhckJ1dHRvbiA9IGNvbnRhaW5lci5maW5kKFwiLnNwLWNsZWFyXCIpLFxuICAgICAgICAgICAgY2hvb3NlQnV0dG9uID0gY29udGFpbmVyLmZpbmQoXCIuc3AtY2hvb3NlXCIpLFxuICAgICAgICAgICAgdG9nZ2xlQnV0dG9uID0gY29udGFpbmVyLmZpbmQoXCIuc3AtcGFsZXR0ZS10b2dnbGVcIiksXG4gICAgICAgICAgICBpc0lucHV0ID0gYm91bmRFbGVtZW50LmlzKFwiaW5wdXRcIiksXG4gICAgICAgICAgICBpc0lucHV0VHlwZUNvbG9yID0gaXNJbnB1dCAmJiBib3VuZEVsZW1lbnQuYXR0cihcInR5cGVcIikgPT09IFwiY29sb3JcIiAmJiBpbnB1dFR5cGVDb2xvclN1cHBvcnQoKSxcbiAgICAgICAgICAgIHNob3VsZFJlcGxhY2UgPSBpc0lucHV0ICYmICFmbGF0LFxuICAgICAgICAgICAgcmVwbGFjZXIgPSAoc2hvdWxkUmVwbGFjZSkgPyAkKHJlcGxhY2VJbnB1dCkuYWRkQ2xhc3ModGhlbWUpLmFkZENsYXNzKG9wdHMuY2xhc3NOYW1lKS5hZGRDbGFzcyhvcHRzLnJlcGxhY2VyQ2xhc3NOYW1lKSA6ICQoW10pLFxuICAgICAgICAgICAgb2Zmc2V0RWxlbWVudCA9IChzaG91bGRSZXBsYWNlKSA/IHJlcGxhY2VyIDogYm91bmRFbGVtZW50LFxuICAgICAgICAgICAgcHJldmlld0VsZW1lbnQgPSByZXBsYWNlci5maW5kKFwiLnNwLXByZXZpZXctaW5uZXJcIiksXG4gICAgICAgICAgICBpbml0aWFsQ29sb3IgPSBvcHRzLmNvbG9yIHx8IChpc0lucHV0ICYmIGJvdW5kRWxlbWVudC52YWwoKSksXG4gICAgICAgICAgICBjb2xvck9uU2hvdyA9IGZhbHNlLFxuICAgICAgICAgICAgY3VycmVudFByZWZlcnJlZEZvcm1hdCA9IG9wdHMucHJlZmVycmVkRm9ybWF0LFxuICAgICAgICAgICAgY2xpY2tvdXRGaXJlc0NoYW5nZSA9ICFvcHRzLnNob3dCdXR0b25zIHx8IG9wdHMuY2xpY2tvdXRGaXJlc0NoYW5nZSxcbiAgICAgICAgICAgIGlzRW1wdHkgPSAhaW5pdGlhbENvbG9yLFxuICAgICAgICAgICAgYWxsb3dFbXB0eSA9IG9wdHMuYWxsb3dFbXB0eSAmJiAhaXNJbnB1dFR5cGVDb2xvcjtcblxuICAgICAgICBmdW5jdGlvbiBhcHBseU9wdGlvbnMoKSB7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLnNob3dQYWxldHRlT25seSkge1xuICAgICAgICAgICAgICAgIG9wdHMuc2hvd1BhbGV0dGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b2dnbGVCdXR0b24udGV4dChvcHRzLnNob3dQYWxldHRlT25seSA/IG9wdHMudG9nZ2xlUGFsZXR0ZU1vcmVUZXh0IDogb3B0cy50b2dnbGVQYWxldHRlTGVzc1RleHQpO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5wYWxldHRlKSB7XG4gICAgICAgICAgICAgICAgcGFsZXR0ZSA9IG9wdHMucGFsZXR0ZS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICBwYWxldHRlQXJyYXkgPSAkLmlzQXJyYXkocGFsZXR0ZVswXSkgPyBwYWxldHRlIDogW3BhbGV0dGVdO1xuICAgICAgICAgICAgICAgIHBhbGV0dGVMb29rdXAgPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhbGV0dGVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBhbGV0dGVBcnJheVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJnYiA9IHRpbnljb2xvcihwYWxldHRlQXJyYXlbaV1bal0pLnRvUmdiU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWxldHRlTG9va3VwW3JnYl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250YWluZXIudG9nZ2xlQ2xhc3MoXCJzcC1mbGF0XCIsIGZsYXQpO1xuICAgICAgICAgICAgY29udGFpbmVyLnRvZ2dsZUNsYXNzKFwic3AtaW5wdXQtZGlzYWJsZWRcIiwgIW9wdHMuc2hvd0lucHV0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci50b2dnbGVDbGFzcyhcInNwLWFscGhhLWVuYWJsZWRcIiwgb3B0cy5zaG93QWxwaGEpO1xuICAgICAgICAgICAgY29udGFpbmVyLnRvZ2dsZUNsYXNzKFwic3AtY2xlYXItZW5hYmxlZFwiLCBhbGxvd0VtcHR5KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci50b2dnbGVDbGFzcyhcInNwLWJ1dHRvbnMtZGlzYWJsZWRcIiwgIW9wdHMuc2hvd0J1dHRvbnMpO1xuICAgICAgICAgICAgY29udGFpbmVyLnRvZ2dsZUNsYXNzKFwic3AtcGFsZXR0ZS1idXR0b25zLWRpc2FibGVkXCIsICFvcHRzLnRvZ2dsZVBhbGV0dGVPbmx5KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci50b2dnbGVDbGFzcyhcInNwLXBhbGV0dGUtZGlzYWJsZWRcIiwgIW9wdHMuc2hvd1BhbGV0dGUpO1xuICAgICAgICAgICAgY29udGFpbmVyLnRvZ2dsZUNsYXNzKFwic3AtcGFsZXR0ZS1vbmx5XCIsIG9wdHMuc2hvd1BhbGV0dGVPbmx5KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci50b2dnbGVDbGFzcyhcInNwLWluaXRpYWwtZGlzYWJsZWRcIiwgIW9wdHMuc2hvd0luaXRpYWwpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKG9wdHMuY2xhc3NOYW1lKS5hZGRDbGFzcyhvcHRzLmNvbnRhaW5lckNsYXNzTmFtZSk7XG5cbiAgICAgICAgICAgIHJlZmxvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcblxuICAgICAgICAgICAgaWYgKElFKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmZpbmQoXCIqOm5vdChpbnB1dClcIikuYXR0cihcInVuc2VsZWN0YWJsZVwiLCBcIm9uXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhcHBseU9wdGlvbnMoKTtcblxuICAgICAgICAgICAgaWYgKHNob3VsZFJlcGxhY2UpIHtcbiAgICAgICAgICAgICAgICBib3VuZEVsZW1lbnQuYWZ0ZXIocmVwbGFjZXIpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFhbGxvd0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgY2xlYXJCdXR0b24uaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmxhdCkge1xuICAgICAgICAgICAgICAgIGJvdW5kRWxlbWVudC5hZnRlcihjb250YWluZXIpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdmFyIGFwcGVuZFRvID0gb3B0cy5hcHBlbmRUbyA9PT0gXCJwYXJlbnRcIiA/IGJvdW5kRWxlbWVudC5wYXJlbnQoKSA6ICQob3B0cy5hcHBlbmRUbyk7XG4gICAgICAgICAgICAgICAgaWYgKGFwcGVuZFRvLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhcHBlbmRUbyA9ICQoXCJib2R5XCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFwcGVuZFRvLmFwcGVuZChjb250YWluZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1cGRhdGVTZWxlY3Rpb25QYWxldHRlRnJvbVN0b3JhZ2UoKTtcblxuICAgICAgICAgICAgb2Zmc2V0RWxlbWVudC5vbihcImNsaWNrLnNwZWN0cnVtIHRvdWNoc3RhcnQuc3BlY3RydW1cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISQoZS50YXJnZXQpLmlzKFwiaW5wdXRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZihib3VuZEVsZW1lbnQuaXMoXCI6ZGlzYWJsZWRcIikgfHwgKG9wdHMuZGlzYWJsZWQgPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgZGlzYWJsZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGNsaWNrcyBmcm9tIGJ1YmJsaW5nIHVwIHRvIGRvY3VtZW50LiAgVGhpcyB3b3VsZCBjYXVzZSBpdCB0byBiZSBoaWRkZW4uXG4gICAgICAgICAgICBjb250YWluZXIuY2xpY2soc3RvcFByb3BhZ2F0aW9uKTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIHVzZXIgdHlwZWQgaW5wdXRcbiAgICAgICAgICAgIHRleHRJbnB1dC5jaGFuZ2Uoc2V0RnJvbVRleHRJbnB1dCk7XG4gICAgICAgICAgICB0ZXh0SW5wdXQub24oXCJwYXN0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChzZXRGcm9tVGV4dElucHV0LCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGV4dElucHV0LmtleWRvd24oZnVuY3Rpb24gKGUpIHsgaWYgKGUua2V5Q29kZSA9PSAxMykgeyBzZXRGcm9tVGV4dElucHV0KCk7IH0gfSk7XG5cbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbi50ZXh0KG9wdHMuY2FuY2VsVGV4dCk7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b24ub24oXCJjbGljay5zcGVjdHJ1bVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHJldmVydCgpO1xuICAgICAgICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjbGVhckJ1dHRvbi5hdHRyKFwidGl0bGVcIiwgb3B0cy5jbGVhclRleHQpO1xuICAgICAgICAgICAgY2xlYXJCdXR0b24ub24oXCJjbGljay5zcGVjdHJ1bVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlzRW1wdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG1vdmUoKTtcblxuICAgICAgICAgICAgICAgIGlmKGZsYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9mb3IgdGhlIGZsYXQgc3R5bGUsIHRoaXMgaXMgYSBjaGFuZ2UgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlT3JpZ2luYWxJbnB1dCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2hvb3NlQnV0dG9uLnRleHQob3B0cy5jaG9vc2VUZXh0KTtcbiAgICAgICAgICAgIGNob29zZUJ1dHRvbi5vbihcImNsaWNrLnNwZWN0cnVtXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoSUUgJiYgdGV4dElucHV0LmlzKFwiOmZvY3VzXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRJbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9yaWdpbmFsSW5wdXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdG9nZ2xlQnV0dG9uLnRleHQob3B0cy5zaG93UGFsZXR0ZU9ubHkgPyBvcHRzLnRvZ2dsZVBhbGV0dGVNb3JlVGV4dCA6IG9wdHMudG9nZ2xlUGFsZXR0ZUxlc3NUZXh0KTtcbiAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbi5vbihcImNsaWNrLnNwZWN0cnVtXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBvcHRzLnNob3dQYWxldHRlT25seSA9ICFvcHRzLnNob3dQYWxldHRlT25seTtcblxuICAgICAgICAgICAgICAgIC8vIFRvIG1ha2Ugc3VyZSB0aGUgUGlja2VyIGFyZWEgaXMgZHJhd24gb24gdGhlIHJpZ2h0LCBuZXh0IHRvIHRoZVxuICAgICAgICAgICAgICAgIC8vIFBhbGV0dGUgYXJlYSAoYW5kIG5vdCBiZWxvdyB0aGUgcGFsZXR0ZSksIGZpcnN0IG1vdmUgdGhlIFBhbGV0dGVcbiAgICAgICAgICAgICAgICAvLyB0byB0aGUgbGVmdCB0byBtYWtlIHNwYWNlIGZvciB0aGUgcGlja2VyLCBwbHVzIDVweCBleHRyYS5cbiAgICAgICAgICAgICAgICAvLyBUaGUgJ2FwcGx5T3B0aW9ucycgZnVuY3Rpb24gcHV0cyB0aGUgd2hvbGUgY29udGFpbmVyIGJhY2sgaW50byBwbGFjZVxuICAgICAgICAgICAgICAgIC8vIGFuZCB0YWtlcyBjYXJlIG9mIHRoZSBidXR0b24tdGV4dCBhbmQgdGhlIHNwLXBhbGV0dGUtb25seSBDU1MgY2xhc3MuXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNob3dQYWxldHRlT25seSAmJiAhZmxhdCkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuY3NzKCdsZWZ0JywgJy09JyArIChwaWNrZXJDb250YWluZXIub3V0ZXJXaWR0aCh0cnVlKSArIDUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXBwbHlPcHRpb25zKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZHJhZ2dhYmxlKGFscGhhU2xpZGVyLCBmdW5jdGlvbiAoZHJhZ1gsIGRyYWdZLCBlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEFscGhhID0gKGRyYWdYIC8gYWxwaGFXaWR0aCk7XG4gICAgICAgICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRBbHBoYSA9IE1hdGgucm91bmQoY3VycmVudEFscGhhICogMTApIC8gMTA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbW92ZSgpO1xuICAgICAgICAgICAgfSwgZHJhZ1N0YXJ0LCBkcmFnU3RvcCk7XG5cbiAgICAgICAgICAgIGRyYWdnYWJsZShzbGlkZXIsIGZ1bmN0aW9uIChkcmFnWCwgZHJhZ1kpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50SHVlID0gcGFyc2VGbG9hdChkcmFnWSAvIHNsaWRlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBpc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNob3dBbHBoYSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QWxwaGEgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb3ZlKCk7XG4gICAgICAgICAgICB9LCBkcmFnU3RhcnQsIGRyYWdTdG9wKTtcblxuICAgICAgICAgICAgZHJhZ2dhYmxlKGRyYWdnZXIsIGZ1bmN0aW9uIChkcmFnWCwgZHJhZ1ksIGUpIHtcblxuICAgICAgICAgICAgICAgIC8vIHNoaWZ0K2RyYWcgc2hvdWxkIHNuYXAgdGhlIG1vdmVtZW50IHRvIGVpdGhlciB0aGUgeCBvciB5IGF4aXMuXG4gICAgICAgICAgICAgICAgaWYgKCFlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaWZ0TW92ZW1lbnREaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghc2hpZnRNb3ZlbWVudERpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkRHJhZ1ggPSBjdXJyZW50U2F0dXJhdGlvbiAqIGRyYWdXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZERyYWdZID0gZHJhZ0hlaWdodCAtIChjdXJyZW50VmFsdWUgKiBkcmFnSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZ1cnRoZXJGcm9tWCA9IE1hdGguYWJzKGRyYWdYIC0gb2xkRHJhZ1gpID4gTWF0aC5hYnMoZHJhZ1kgLSBvbGREcmFnWSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hpZnRNb3ZlbWVudERpcmVjdGlvbiA9IGZ1cnRoZXJGcm9tWCA/IFwieFwiIDogXCJ5XCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHNldFNhdHVyYXRpb24gPSAhc2hpZnRNb3ZlbWVudERpcmVjdGlvbiB8fCBzaGlmdE1vdmVtZW50RGlyZWN0aW9uID09PSBcInhcIjtcbiAgICAgICAgICAgICAgICB2YXIgc2V0VmFsdWUgPSAhc2hpZnRNb3ZlbWVudERpcmVjdGlvbiB8fCBzaGlmdE1vdmVtZW50RGlyZWN0aW9uID09PSBcInlcIjtcblxuICAgICAgICAgICAgICAgIGlmIChzZXRTYXR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTYXR1cmF0aW9uID0gcGFyc2VGbG9hdChkcmFnWCAvIGRyYWdXaWR0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBwYXJzZUZsb2F0KChkcmFnSGVpZ2h0IC0gZHJhZ1kpIC8gZHJhZ0hlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghb3B0cy5zaG93QWxwaGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEFscGhhID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtb3ZlKCk7XG5cbiAgICAgICAgICAgIH0sIGRyYWdTdGFydCwgZHJhZ1N0b3ApO1xuXG4gICAgICAgICAgICBpZiAoISFpbml0aWFsQ29sb3IpIHtcbiAgICAgICAgICAgICAgICBzZXQoaW5pdGlhbENvbG9yKTtcblxuICAgICAgICAgICAgICAgIC8vIEluIGNhc2UgY29sb3Igd2FzIGJsYWNrIC0gdXBkYXRlIHRoZSBwcmV2aWV3IFVJIGFuZCBzZXQgdGhlIGZvcm1hdFxuICAgICAgICAgICAgICAgIC8vIHNpbmNlIHRoZSBzZXQgZnVuY3Rpb24gd2lsbCBub3QgcnVuIChkZWZhdWx0IGNvbG9yIGlzIGJsYWNrKS5cbiAgICAgICAgICAgICAgICB1cGRhdGVVSSgpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcmVmZXJyZWRGb3JtYXQgPSBvcHRzLnByZWZlcnJlZEZvcm1hdCB8fCB0aW55Y29sb3IoaW5pdGlhbENvbG9yKS5mb3JtYXQ7XG5cbiAgICAgICAgICAgICAgICBhZGRDb2xvclRvU2VsZWN0aW9uUGFsZXR0ZShpbml0aWFsQ29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlVUkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZsYXQpIHtcbiAgICAgICAgICAgICAgICBzaG93KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhbGV0dGVFbGVtZW50Q2xpY2soZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmRhdGEgJiYgZS5kYXRhLmlnbm9yZSkge1xuICAgICAgICAgICAgICAgICAgICBzZXQoJChlLnRhcmdldCkuY2xvc2VzdChcIi5zcC10aHVtYi1lbFwiKS5kYXRhKFwiY29sb3JcIikpO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXQoJChlLnRhcmdldCkuY2xvc2VzdChcIi5zcC10aHVtYi1lbFwiKS5kYXRhKFwiY29sb3JcIikpO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHBpY2tlciBpcyBnb2luZyB0byBjbG9zZSBpbW1lZGlhdGVseSwgYSBwYWxldHRlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBhIGNoYW5nZS4gIE90aGVyd2lzZSwgaXQncyBhIG1vdmUgb25seS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuaGlkZUFmdGVyUGFsZXR0ZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlT3JpZ2luYWxJbnB1dCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9yaWdpbmFsSW5wdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBhbGV0dGVFdmVudCA9IElFID8gXCJtb3VzZWRvd24uc3BlY3RydW1cIiA6IFwiY2xpY2suc3BlY3RydW0gdG91Y2hzdGFydC5zcGVjdHJ1bVwiO1xuICAgICAgICAgICAgcGFsZXR0ZUNvbnRhaW5lci5vbihwYWxldHRlRXZlbnQsIFwiLnNwLXRodW1iLWVsXCIsIHBhbGV0dGVFbGVtZW50Q2xpY2spO1xuICAgICAgICAgICAgaW5pdGlhbENvbG9yQ29udGFpbmVyLm9uKHBhbGV0dGVFdmVudCwgXCIuc3AtdGh1bWItZWw6bnRoLWNoaWxkKDEpXCIsIHsgaWdub3JlOiB0cnVlIH0sIHBhbGV0dGVFbGVtZW50Q2xpY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0aW9uUGFsZXR0ZUZyb21TdG9yYWdlKCkge1xuXG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlS2V5ICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcblxuICAgICAgICAgICAgICAgIC8vIE1pZ3JhdGUgb2xkIHBhbGV0dGVzIG92ZXIgdG8gbmV3IGZvcm1hdC4gIE1heSB3YW50IHRvIHJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZFBhbGV0dGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZUtleV0uc3BsaXQoXCIsI1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFBhbGV0dGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHdpbmRvdy5sb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlS2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChvbGRQYWxldHRlLCBmdW5jdGlvbihpLCBjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZENvbG9yVG9TZWxlY3Rpb25QYWxldHRlKGMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2goZSkgeyB9XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25QYWxldHRlID0gd2luZG93LmxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VLZXldLnNwbGl0KFwiO1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkQ29sb3JUb1NlbGVjdGlvblBhbGV0dGUoY29sb3IpIHtcbiAgICAgICAgICAgIGlmIChzaG93U2VsZWN0aW9uUGFsZXR0ZSkge1xuICAgICAgICAgICAgICAgIHZhciByZ2IgPSB0aW55Y29sb3IoY29sb3IpLnRvUmdiU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYWxldHRlTG9va3VwW3JnYl0gJiYgJC5pbkFycmF5KHJnYiwgc2VsZWN0aW9uUGFsZXR0ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblBhbGV0dGUucHVzaChyZ2IpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZShzZWxlY3Rpb25QYWxldHRlLmxlbmd0aCA+IG1heFNlbGVjdGlvblNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblBhbGV0dGUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2VLZXkgJiYgd2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VLZXldID0gc2VsZWN0aW9uUGFsZXR0ZS5qb2luKFwiO1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaChlKSB7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRVbmlxdWVTZWxlY3Rpb25QYWxldHRlKCkge1xuICAgICAgICAgICAgdmFyIHVuaXF1ZSA9IFtdO1xuICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1BhbGV0dGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGlvblBhbGV0dGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJnYiA9IHRpbnljb2xvcihzZWxlY3Rpb25QYWxldHRlW2ldKS50b1JnYlN0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFsZXR0ZUxvb2t1cFtyZ2JdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWUucHVzaChzZWxlY3Rpb25QYWxldHRlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVuaXF1ZS5yZXZlcnNlKCkuc2xpY2UoMCwgb3B0cy5tYXhTZWxlY3Rpb25TaXplKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYXdQYWxldHRlKCkge1xuXG4gICAgICAgICAgICB2YXIgY3VycmVudENvbG9yID0gZ2V0KCk7XG5cbiAgICAgICAgICAgIHZhciBodG1sID0gJC5tYXAocGFsZXR0ZUFycmF5LCBmdW5jdGlvbiAocGFsZXR0ZSwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWxldHRlVGVtcGxhdGUocGFsZXR0ZSwgY3VycmVudENvbG9yLCBcInNwLXBhbGV0dGUtcm93IHNwLXBhbGV0dGUtcm93LVwiICsgaSwgb3B0cyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdXBkYXRlU2VsZWN0aW9uUGFsZXR0ZUZyb21TdG9yYWdlKCk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25QYWxldHRlKSB7XG4gICAgICAgICAgICAgICAgaHRtbC5wdXNoKHBhbGV0dGVUZW1wbGF0ZShnZXRVbmlxdWVTZWxlY3Rpb25QYWxldHRlKCksIGN1cnJlbnRDb2xvciwgXCJzcC1wYWxldHRlLXJvdyBzcC1wYWxldHRlLXJvdy1zZWxlY3Rpb25cIiwgb3B0cykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYWxldHRlQ29udGFpbmVyLmh0bWwoaHRtbC5qb2luKFwiXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYXdJbml0aWFsKCkge1xuICAgICAgICAgICAgaWYgKG9wdHMuc2hvd0luaXRpYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbCA9IGNvbG9yT25TaG93O1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0KCk7XG4gICAgICAgICAgICAgICAgaW5pdGlhbENvbG9yQ29udGFpbmVyLmh0bWwocGFsZXR0ZVRlbXBsYXRlKFtpbml0aWFsLCBjdXJyZW50XSwgY3VycmVudCwgXCJzcC1wYWxldHRlLXJvdy1pbml0aWFsXCIsIG9wdHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdTdGFydCgpIHtcbiAgICAgICAgICAgIGlmIChkcmFnSGVpZ2h0IDw9IDAgfHwgZHJhZ1dpZHRoIDw9IDAgfHwgc2xpZGVIZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHJlZmxvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZHJhZ2dpbmdDbGFzcyk7XG4gICAgICAgICAgICBzaGlmdE1vdmVtZW50RGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIGJvdW5kRWxlbWVudC50cmlnZ2VyKCdkcmFnc3RhcnQuc3BlY3RydW0nLCBbIGdldCgpIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZHJhZ1N0b3AoKSB7XG4gICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoZHJhZ2dpbmdDbGFzcyk7XG4gICAgICAgICAgICBib3VuZEVsZW1lbnQudHJpZ2dlcignZHJhZ3N0b3Auc3BlY3RydW0nLCBbIGdldCgpIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0RnJvbVRleHRJbnB1dCgpIHtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGV4dElucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBpZiAoKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSBcIlwiKSAmJiBhbGxvd0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgc2V0KG51bGwpO1xuICAgICAgICAgICAgICAgIG1vdmUoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVPcmlnaW5hbElucHV0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdGlueSA9IHRpbnljb2xvcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbnkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldCh0aW55KTtcbiAgICAgICAgICAgICAgICAgICAgbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVPcmlnaW5hbElucHV0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0SW5wdXQuYWRkQ2xhc3MoXCJzcC12YWxpZGF0aW9uLWVycm9yXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9ICQuRXZlbnQoJ2JlZm9yZVNob3cuc3BlY3RydW0nKTtcblxuICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICByZWZsb3coKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJvdW5kRWxlbWVudC50cmlnZ2VyKGV2ZW50LCBbIGdldCgpIF0pO1xuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tzLmJlZm9yZVNob3coZ2V0KCkpID09PSBmYWxzZSB8fCBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGlkZUFsbCgpO1xuICAgICAgICAgICAgdmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgICAgICQoZG9jKS5vbihcImtleWRvd24uc3BlY3RydW1cIiwgb25rZXlkb3duKTtcbiAgICAgICAgICAgICQoZG9jKS5vbihcImNsaWNrLnNwZWN0cnVtXCIsIGNsaWNrb3V0KTtcbiAgICAgICAgICAgICQod2luZG93KS5vbihcInJlc2l6ZS5zcGVjdHJ1bVwiLCByZXNpemUpO1xuICAgICAgICAgICAgcmVwbGFjZXIuYWRkQ2xhc3MoXCJzcC1hY3RpdmVcIik7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoXCJzcC1oaWRkZW5cIik7XG5cbiAgICAgICAgICAgIHJlZmxvdygpO1xuICAgICAgICAgICAgdXBkYXRlVUkoKTtcblxuICAgICAgICAgICAgY29sb3JPblNob3cgPSBnZXQoKTtcblxuICAgICAgICAgICAgZHJhd0luaXRpYWwoKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5zaG93KGNvbG9yT25TaG93KTtcbiAgICAgICAgICAgIGJvdW5kRWxlbWVudC50cmlnZ2VyKCdzaG93LnNwZWN0cnVtJywgWyBjb2xvck9uU2hvdyBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ua2V5ZG93bihlKSB7XG4gICAgICAgICAgICAvLyBDbG9zZSBvbiBFU0NcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xpY2tvdXQoZSkge1xuICAgICAgICAgICAgLy8gUmV0dXJuIG9uIHJpZ2h0IGNsaWNrLlxuICAgICAgICAgICAgaWYgKGUuYnV0dG9uID09IDIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIC8vIElmIGEgZHJhZyBldmVudCB3YXMgaGFwcGVuaW5nIGR1cmluZyB0aGUgbW91c2V1cCwgZG9uJ3QgaGlkZVxuICAgICAgICAgICAgLy8gb24gY2xpY2suXG4gICAgICAgICAgICBpZiAoaXNEcmFnZ2luZykgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgaWYgKGNsaWNrb3V0RmlyZXNDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVPcmlnaW5hbElucHV0KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICAgICAgLy8gUmV0dXJuIGlmIGhpZGluZyBpcyB1bm5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKCF2aXNpYmxlIHx8IGZsYXQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICQoZG9jKS5vZmYoXCJrZXlkb3duLnNwZWN0cnVtXCIsIG9ua2V5ZG93bik7XG4gICAgICAgICAgICAkKGRvYykub2ZmKFwiY2xpY2suc3BlY3RydW1cIiwgY2xpY2tvdXQpO1xuICAgICAgICAgICAgJCh3aW5kb3cpLm9mZihcInJlc2l6ZS5zcGVjdHJ1bVwiLCByZXNpemUpO1xuXG4gICAgICAgICAgICByZXBsYWNlci5yZW1vdmVDbGFzcyhcInNwLWFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhcInNwLWhpZGRlblwiKTtcblxuICAgICAgICAgICAgY2FsbGJhY2tzLmhpZGUoZ2V0KCkpO1xuICAgICAgICAgICAgYm91bmRFbGVtZW50LnRyaWdnZXIoJ2hpZGUuc3BlY3RydW0nLCBbIGdldCgpIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJ0KCkge1xuICAgICAgICAgICAgc2V0KGNvbG9yT25TaG93LCB0cnVlKTtcbiAgICAgICAgICAgIHVwZGF0ZU9yaWdpbmFsSW5wdXQodHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXQoY29sb3IsIGlnbm9yZUZvcm1hdENoYW5nZSkge1xuICAgICAgICAgICAgaWYgKHRpbnljb2xvci5lcXVhbHMoY29sb3IsIGdldCgpKSkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBVSSBqdXN0IGluIGNhc2UgYSB2YWxpZGF0aW9uIGVycm9yIG5lZWRzXG4gICAgICAgICAgICAgICAgLy8gdG8gYmUgY2xlYXJlZC5cbiAgICAgICAgICAgICAgICB1cGRhdGVVSSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5ld0NvbG9yLCBuZXdIc3Y7XG4gICAgICAgICAgICBpZiAoIWNvbG9yICYmIGFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgICAgICBpc0VtcHR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG5ld0NvbG9yID0gdGlueWNvbG9yKGNvbG9yKTtcbiAgICAgICAgICAgICAgICBuZXdIc3YgPSBuZXdDb2xvci50b0hzdigpO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudEh1ZSA9IChuZXdIc3YuaCAlIDM2MCkgLyAzNjA7XG4gICAgICAgICAgICAgICAgY3VycmVudFNhdHVyYXRpb24gPSBuZXdIc3YucztcbiAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBuZXdIc3YudjtcbiAgICAgICAgICAgICAgICBjdXJyZW50QWxwaGEgPSBuZXdIc3YuYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZVVJKCk7XG5cbiAgICAgICAgICAgIGlmIChuZXdDb2xvciAmJiBuZXdDb2xvci5pc1ZhbGlkKCkgJiYgIWlnbm9yZUZvcm1hdENoYW5nZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcmVmZXJyZWRGb3JtYXQgPSBvcHRzLnByZWZlcnJlZEZvcm1hdCB8fCBuZXdDb2xvci5nZXRGb3JtYXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldChvcHRzKSB7XG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7IH07XG5cbiAgICAgICAgICAgIGlmIChhbGxvd0VtcHR5ICYmIGlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRpbnljb2xvci5mcm9tUmF0aW8oe1xuICAgICAgICAgICAgICAgIGg6IGN1cnJlbnRIdWUsXG4gICAgICAgICAgICAgICAgczogY3VycmVudFNhdHVyYXRpb24sXG4gICAgICAgICAgICAgICAgdjogY3VycmVudFZhbHVlLFxuICAgICAgICAgICAgICAgIGE6IE1hdGgucm91bmQoY3VycmVudEFscGhhICogMTAwMCkgLyAxMDAwXG4gICAgICAgICAgICB9LCB7IGZvcm1hdDogb3B0cy5mb3JtYXQgfHwgY3VycmVudFByZWZlcnJlZEZvcm1hdCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlzVmFsaWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRleHRJbnB1dC5oYXNDbGFzcyhcInNwLXZhbGlkYXRpb24tZXJyb3JcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtb3ZlKCkge1xuICAgICAgICAgICAgdXBkYXRlVUkoKTtcblxuICAgICAgICAgICAgY2FsbGJhY2tzLm1vdmUoZ2V0KCkpO1xuICAgICAgICAgICAgYm91bmRFbGVtZW50LnRyaWdnZXIoJ21vdmUuc3BlY3RydW0nLCBbIGdldCgpIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVUkoKSB7XG5cbiAgICAgICAgICAgIHRleHRJbnB1dC5yZW1vdmVDbGFzcyhcInNwLXZhbGlkYXRpb24tZXJyb3JcIik7XG5cbiAgICAgICAgICAgIHVwZGF0ZUhlbHBlckxvY2F0aW9ucygpO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgZHJhZ2dlciBiYWNrZ3JvdW5kIGNvbG9yIChncmFkaWVudHMgdGFrZSBjYXJlIG9mIHNhdHVyYXRpb24gYW5kIHZhbHVlKS5cbiAgICAgICAgICAgIHZhciBmbGF0Q29sb3IgPSB0aW55Y29sb3IuZnJvbVJhdGlvKHsgaDogY3VycmVudEh1ZSwgczogMSwgdjogMSB9KTtcbiAgICAgICAgICAgIGRyYWdnZXIuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBmbGF0Q29sb3IudG9IZXhTdHJpbmcoKSk7XG5cbiAgICAgICAgICAgIC8vIEdldCBhIGZvcm1hdCB0aGF0IGFscGhhIHdpbGwgYmUgaW5jbHVkZWQgaW4gKGhleCBhbmQgbmFtZXMgaWdub3JlIGFscGhhKVxuICAgICAgICAgICAgdmFyIGZvcm1hdCA9IGN1cnJlbnRQcmVmZXJyZWRGb3JtYXQ7XG4gICAgICAgICAgICBpZiAoY3VycmVudEFscGhhIDwgMSAmJiAhKGN1cnJlbnRBbHBoYSA9PT0gMCAmJiBmb3JtYXQgPT09IFwibmFtZVwiKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgPT09IFwiaGV4XCIgfHwgZm9ybWF0ID09PSBcImhleDNcIiB8fCBmb3JtYXQgPT09IFwiaGV4NlwiIHx8IGZvcm1hdCA9PT0gXCJuYW1lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gXCJyZ2JcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZWFsQ29sb3IgPSBnZXQoeyBmb3JtYXQ6IGZvcm1hdCB9KSxcbiAgICAgICAgICAgICAgICBkaXNwbGF5Q29sb3IgPSAnJztcblxuICAgICAgICAgICAgIC8vcmVzZXQgYmFja2dyb3VuZCBpbmZvIGZvciBwcmV2aWV3IGVsZW1lbnRcbiAgICAgICAgICAgIHByZXZpZXdFbGVtZW50LnJlbW92ZUNsYXNzKFwic3AtY2xlYXItZGlzcGxheVwiKTtcbiAgICAgICAgICAgIHByZXZpZXdFbGVtZW50LmNzcygnYmFja2dyb3VuZC1jb2xvcicsICd0cmFuc3BhcmVudCcpO1xuXG4gICAgICAgICAgICBpZiAoIXJlYWxDb2xvciAmJiBhbGxvd0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSByZXBsYWNlZCBlbGVtZW50cyBiYWNrZ3JvdW5kIHdpdGggaWNvbiBpbmRpY2F0aW5nIG5vIGNvbG9yIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIHByZXZpZXdFbGVtZW50LmFkZENsYXNzKFwic3AtY2xlYXItZGlzcGxheVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciByZWFsSGV4ID0gcmVhbENvbG9yLnRvSGV4U3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHJlYWxSZ2IgPSByZWFsQ29sb3IudG9SZ2JTdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgcmVwbGFjZWQgZWxlbWVudHMgYmFja2dyb3VuZCBjb2xvciAod2l0aCBhY3R1YWwgc2VsZWN0ZWQgY29sb3IpXG4gICAgICAgICAgICAgICAgaWYgKHJnYmFTdXBwb3J0IHx8IHJlYWxDb2xvci5hbHBoYSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3RWxlbWVudC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIHJlYWxSZ2IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlld0VsZW1lbnQuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3RWxlbWVudC5jc3MoXCJmaWx0ZXJcIiwgcmVhbENvbG9yLnRvRmlsdGVyKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dBbHBoYSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmdiID0gcmVhbENvbG9yLnRvUmdiKCk7XG4gICAgICAgICAgICAgICAgICAgIHJnYi5hID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWxBbHBoYSA9IHRpbnljb2xvcihyZ2IpLnRvUmdiU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBncmFkaWVudCA9IFwibGluZWFyLWdyYWRpZW50KGxlZnQsIFwiICsgcmVhbEFscGhhICsgXCIsIFwiICsgcmVhbEhleCArIFwiKVwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChJRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxwaGFTbGlkZXJJbm5lci5jc3MoXCJmaWx0ZXJcIiwgdGlueWNvbG9yKHJlYWxBbHBoYSkudG9GaWx0ZXIoeyBncmFkaWVudFR5cGU6IDEgfSwgcmVhbEhleCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxwaGFTbGlkZXJJbm5lci5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwiLXdlYmtpdC1cIiArIGdyYWRpZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFscGhhU2xpZGVySW5uZXIuY3NzKFwiYmFja2dyb3VuZFwiLCBcIi1tb3otXCIgKyBncmFkaWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHBoYVNsaWRlcklubmVyLmNzcyhcImJhY2tncm91bmRcIiwgXCItbXMtXCIgKyBncmFkaWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgY3VycmVudCBzeW50YXggZ3JhZGllbnQgb24gdW5wcmVmaXhlZCBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFscGhhU2xpZGVySW5uZXIuY3NzKFwiYmFja2dyb3VuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCBcIiArIHJlYWxBbHBoYSArIFwiLCBcIiArIHJlYWxIZXggKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkaXNwbGF5Q29sb3IgPSByZWFsQ29sb3IudG9TdHJpbmcoZm9ybWF0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB0ZXh0IGVudHJ5IGlucHV0IGFzIGl0IGNoYW5nZXMgaGFwcGVuXG4gICAgICAgICAgICBpZiAob3B0cy5zaG93SW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0ZXh0SW5wdXQudmFsKGRpc3BsYXlDb2xvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLnNob3dQYWxldHRlKSB7XG4gICAgICAgICAgICAgICAgZHJhd1BhbGV0dGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZHJhd0luaXRpYWwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUhlbHBlckxvY2F0aW9ucygpIHtcbiAgICAgICAgICAgIHZhciBzID0gY3VycmVudFNhdHVyYXRpb247XG4gICAgICAgICAgICB2YXIgdiA9IGN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgaWYoYWxsb3dFbXB0eSAmJiBpc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgLy9pZiBzZWxlY3RlZCBjb2xvciBpcyBlbXB0eSwgaGlkZSB0aGUgaGVscGVyc1xuICAgICAgICAgICAgICAgIGFscGhhU2xpZGVIZWxwZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHNsaWRlSGVscGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBkcmFnSGVscGVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIGhlbHBlcnMgYXJlIHZpc2libGVcbiAgICAgICAgICAgICAgICBhbHBoYVNsaWRlSGVscGVyLnNob3coKTtcbiAgICAgICAgICAgICAgICBzbGlkZUhlbHBlci5zaG93KCk7XG4gICAgICAgICAgICAgICAgZHJhZ0hlbHBlci5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBXaGVyZSB0byBzaG93IHRoZSBsaXR0bGUgY2lyY2xlIGluIHRoYXQgZGlzcGxheXMgeW91ciBjdXJyZW50IHNlbGVjdGVkIGNvbG9yXG4gICAgICAgICAgICAgICAgdmFyIGRyYWdYID0gcyAqIGRyYWdXaWR0aDtcbiAgICAgICAgICAgICAgICB2YXIgZHJhZ1kgPSBkcmFnSGVpZ2h0IC0gKHYgKiBkcmFnSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBkcmFnWCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgICAgICAtZHJhZ0hlbHBlckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5taW4oZHJhZ1dpZHRoIC0gZHJhZ0hlbHBlckhlaWdodCwgZHJhZ1ggLSBkcmFnSGVscGVySGVpZ2h0KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZHJhZ1kgPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICAgICAgLWRyYWdIZWxwZXJIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWluKGRyYWdIZWlnaHQgLSBkcmFnSGVscGVySGVpZ2h0LCBkcmFnWSAtIGRyYWdIZWxwZXJIZWlnaHQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBkcmFnSGVscGVyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCI6IGRyYWdZICsgXCJweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIjogZHJhZ1ggKyBcInB4XCJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBhbHBoYVggPSBjdXJyZW50QWxwaGEgKiBhbHBoYVdpZHRoO1xuICAgICAgICAgICAgICAgIGFscGhhU2xpZGVIZWxwZXIuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCI6IChhbHBoYVggLSAoYWxwaGFTbGlkZUhlbHBlcldpZHRoIC8gMikpICsgXCJweFwiXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBXaGVyZSB0byBzaG93IHRoZSBiYXIgdGhhdCBkaXNwbGF5cyB5b3VyIGN1cnJlbnQgc2VsZWN0ZWQgaHVlXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlWSA9IChjdXJyZW50SHVlKSAqIHNsaWRlSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHNsaWRlSGVscGVyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCI6IChzbGlkZVkgLSBzbGlkZUhlbHBlckhlaWdodCkgKyBcInB4XCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZU9yaWdpbmFsSW5wdXQoZmlyZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBnZXQoKSxcbiAgICAgICAgICAgICAgICBkaXNwbGF5Q29sb3IgPSAnJyxcbiAgICAgICAgICAgICAgICBoYXNDaGFuZ2VkID0gIXRpbnljb2xvci5lcXVhbHMoY29sb3IsIGNvbG9yT25TaG93KTtcblxuICAgICAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheUNvbG9yID0gY29sb3IudG9TdHJpbmcoY3VycmVudFByZWZlcnJlZEZvcm1hdCk7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBzZWxlY3Rpb24gcGFsZXR0ZSB3aXRoIHRoZSBjdXJyZW50IGNvbG9yXG4gICAgICAgICAgICAgICAgYWRkQ29sb3JUb1NlbGVjdGlvblBhbGV0dGUoY29sb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNJbnB1dCkge1xuICAgICAgICAgICAgICAgIGJvdW5kRWxlbWVudC52YWwoZGlzcGxheUNvbG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpcmVDYWxsYmFjayAmJiBoYXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLmNoYW5nZShjb2xvcik7XG4gICAgICAgICAgICAgICAgYm91bmRFbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScsIFsgY29sb3IgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZWZsb3coKSB7XG4gICAgICAgICAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIENhbGN1bGF0aW9ucyB3b3VsZCBiZSB1c2VsZXNzIGFuZCB3b3VsZG4ndCBiZSByZWxpYWJsZSBhbnl3YXlzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkcmFnV2lkdGggPSBkcmFnZ2VyLndpZHRoKCk7XG4gICAgICAgICAgICBkcmFnSGVpZ2h0ID0gZHJhZ2dlci5oZWlnaHQoKTtcbiAgICAgICAgICAgIGRyYWdIZWxwZXJIZWlnaHQgPSBkcmFnSGVscGVyLmhlaWdodCgpO1xuICAgICAgICAgICAgc2xpZGVXaWR0aCA9IHNsaWRlci53aWR0aCgpO1xuICAgICAgICAgICAgc2xpZGVIZWlnaHQgPSBzbGlkZXIuaGVpZ2h0KCk7XG4gICAgICAgICAgICBzbGlkZUhlbHBlckhlaWdodCA9IHNsaWRlSGVscGVyLmhlaWdodCgpO1xuICAgICAgICAgICAgYWxwaGFXaWR0aCA9IGFscGhhU2xpZGVyLndpZHRoKCk7XG4gICAgICAgICAgICBhbHBoYVNsaWRlSGVscGVyV2lkdGggPSBhbHBoYVNsaWRlSGVscGVyLndpZHRoKCk7XG5cbiAgICAgICAgICAgIGlmICghZmxhdCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jc3MoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLm9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIub2Zmc2V0KG9wdHMub2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIub2Zmc2V0KGdldE9mZnNldChjb250YWluZXIsIG9mZnNldEVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVwZGF0ZUhlbHBlckxvY2F0aW9ucygpO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5zaG93UGFsZXR0ZSkge1xuICAgICAgICAgICAgICAgIGRyYXdQYWxldHRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJvdW5kRWxlbWVudC50cmlnZ2VyKCdyZWZsb3cuc3BlY3RydW0nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBib3VuZEVsZW1lbnQuc2hvdygpO1xuICAgICAgICAgICAgb2Zmc2V0RWxlbWVudC5vZmYoXCJjbGljay5zcGVjdHJ1bSB0b3VjaHN0YXJ0LnNwZWN0cnVtXCIpO1xuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmVwbGFjZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICBzcGVjdHJ1bXNbc3BlY3QuaWRdID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9wdGlvbihvcHRpb25OYW1lLCBvcHRpb25WYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbk5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmV4dGVuZCh7fSwgb3B0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9uVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRzW29wdGlvbk5hbWVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvcHRzW29wdGlvbk5hbWVdID0gb3B0aW9uVmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25OYW1lID09PSBcInByZWZlcnJlZEZvcm1hdFwiKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFByZWZlcnJlZEZvcm1hdCA9IG9wdHMucHJlZmVycmVkRm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBwbHlPcHRpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICAgICAgICBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYm91bmRFbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICBvZmZzZXRFbGVtZW50LnJlbW92ZUNsYXNzKFwic3AtZGlzYWJsZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgYm91bmRFbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgIG9mZnNldEVsZW1lbnQuYWRkQ2xhc3MoXCJzcC1kaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldE9mZnNldChjb29yZCkge1xuICAgICAgICAgICAgb3B0cy5vZmZzZXQgPSBjb29yZDtcbiAgICAgICAgICAgIHJlZmxvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAgIHZhciBzcGVjdCA9IHtcbiAgICAgICAgICAgIHNob3c6IHNob3csXG4gICAgICAgICAgICBoaWRlOiBoaWRlLFxuICAgICAgICAgICAgdG9nZ2xlOiB0b2dnbGUsXG4gICAgICAgICAgICByZWZsb3c6IHJlZmxvdyxcbiAgICAgICAgICAgIG9wdGlvbjogb3B0aW9uLFxuICAgICAgICAgICAgZW5hYmxlOiBlbmFibGUsXG4gICAgICAgICAgICBkaXNhYmxlOiBkaXNhYmxlLFxuICAgICAgICAgICAgb2Zmc2V0OiBzZXRPZmZzZXQsXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgc2V0KGMpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZU9yaWdpbmFsSW5wdXQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lclxuICAgICAgICB9O1xuXG4gICAgICAgIHNwZWN0LmlkID0gc3BlY3RydW1zLnB1c2goc3BlY3QpIC0gMTtcblxuICAgICAgICByZXR1cm4gc3BlY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBjaGVja09mZnNldCAtIGdldCB0aGUgb2Zmc2V0IGJlbG93L2Fib3ZlIGFuZCBsZWZ0L3JpZ2h0IGVsZW1lbnQgZGVwZW5kaW5nIG9uIHNjcmVlbiBwb3NpdGlvblxuICAgICogVGhhbmtzIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5LXVpL2Jsb2IvbWFzdGVyL3VpL2pxdWVyeS51aS5kYXRlcGlja2VyLmpzXG4gICAgKi9cbiAgICBmdW5jdGlvbiBnZXRPZmZzZXQocGlja2VyLCBpbnB1dCkge1xuICAgICAgICB2YXIgZXh0cmFZID0gMDtcbiAgICAgICAgdmFyIGRwV2lkdGggPSBwaWNrZXIub3V0ZXJXaWR0aCgpO1xuICAgICAgICB2YXIgZHBIZWlnaHQgPSBwaWNrZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgdmFyIGlucHV0SGVpZ2h0ID0gaW5wdXQub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgdmFyIGRvYyA9IHBpY2tlclswXS5vd25lckRvY3VtZW50O1xuICAgICAgICB2YXIgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHZhciB2aWV3V2lkdGggPSBkb2NFbGVtLmNsaWVudFdpZHRoICsgJChkb2MpLnNjcm9sbExlZnQoKTtcbiAgICAgICAgdmFyIHZpZXdIZWlnaHQgPSBkb2NFbGVtLmNsaWVudEhlaWdodCArICQoZG9jKS5zY3JvbGxUb3AoKTtcbiAgICAgICAgdmFyIG9mZnNldCA9IGlucHV0Lm9mZnNldCgpO1xuICAgICAgICB2YXIgb2Zmc2V0TGVmdCA9IG9mZnNldC5sZWZ0O1xuICAgICAgICB2YXIgb2Zmc2V0VG9wID0gb2Zmc2V0LnRvcDtcblxuICAgICAgICBvZmZzZXRUb3AgKz0gaW5wdXRIZWlnaHQ7XG5cbiAgICAgICAgb2Zmc2V0TGVmdCAtPVxuICAgICAgICAgICAgTWF0aC5taW4ob2Zmc2V0TGVmdCwgKG9mZnNldExlZnQgKyBkcFdpZHRoID4gdmlld1dpZHRoICYmIHZpZXdXaWR0aCA+IGRwV2lkdGgpID9cbiAgICAgICAgICAgIE1hdGguYWJzKG9mZnNldExlZnQgKyBkcFdpZHRoIC0gdmlld1dpZHRoKSA6IDApO1xuXG4gICAgICAgIG9mZnNldFRvcCAtPVxuICAgICAgICAgICAgTWF0aC5taW4ob2Zmc2V0VG9wLCAoKG9mZnNldFRvcCArIGRwSGVpZ2h0ID4gdmlld0hlaWdodCAmJiB2aWV3SGVpZ2h0ID4gZHBIZWlnaHQpID9cbiAgICAgICAgICAgIE1hdGguYWJzKGRwSGVpZ2h0ICsgaW5wdXRIZWlnaHQgLSBleHRyYVkpIDogZXh0cmFZKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogb2Zmc2V0VG9wLFxuICAgICAgICAgICAgYm90dG9tOiBvZmZzZXQuYm90dG9tLFxuICAgICAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIHJpZ2h0OiBvZmZzZXQucmlnaHQsXG4gICAgICAgICAgICB3aWR0aDogb2Zmc2V0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvZmZzZXQuaGVpZ2h0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBub29wIC0gZG8gbm90aGluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gbm9vcCgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICogc3RvcFByb3BhZ2F0aW9uIC0gbWFrZXMgdGhlIGNvZGUgb25seSBkb2luZyB0aGlzIGEgbGl0dGxlIGVhc2llciB0byByZWFkIGluIGxpbmVcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdFxuICAgICogVGhhbmtzIHRvIHVuZGVyc2NvcmUuanNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmQoZnVuYywgb2JqKSB7XG4gICAgICAgIHZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuYy5hcHBseShvYmosIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTGlnaHR3ZWlnaHQgZHJhZyBoZWxwZXIuICBIYW5kbGVzIGNvbnRhaW5tZW50IHdpdGhpbiB0aGUgZWxlbWVudCwgc28gdGhhdFxuICAgICogd2hlbiBkcmFnZ2luZywgdGhlIHggaXMgd2l0aGluIFswLGVsZW1lbnQud2lkdGhdIGFuZCB5IGlzIHdpdGhpbiBbMCxlbGVtZW50LmhlaWdodF1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGRyYWdnYWJsZShlbGVtZW50LCBvbm1vdmUsIG9uc3RhcnQsIG9uc3RvcCkge1xuICAgICAgICBvbm1vdmUgPSBvbm1vdmUgfHwgZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICBvbnN0YXJ0ID0gb25zdGFydCB8fCBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIG9uc3RvcCA9IG9uc3RvcCB8fCBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgICAgICAgdmFyIGRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHZhciBvZmZzZXQgPSB7fTtcbiAgICAgICAgdmFyIG1heEhlaWdodCA9IDA7XG4gICAgICAgIHZhciBtYXhXaWR0aCA9IDA7XG4gICAgICAgIHZhciBoYXNUb3VjaCA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xuXG4gICAgICAgIHZhciBkdXJpbmdEcmFnRXZlbnRzID0ge307XG4gICAgICAgIGR1cmluZ0RyYWdFdmVudHNbXCJzZWxlY3RzdGFydFwiXSA9IHByZXZlbnQ7XG4gICAgICAgIGR1cmluZ0RyYWdFdmVudHNbXCJkcmFnc3RhcnRcIl0gPSBwcmV2ZW50O1xuICAgICAgICBkdXJpbmdEcmFnRXZlbnRzW1widG91Y2htb3ZlIG1vdXNlbW92ZVwiXSA9IG1vdmU7XG4gICAgICAgIGR1cmluZ0RyYWdFdmVudHNbXCJ0b3VjaGVuZCBtb3VzZXVwXCJdID0gc3RvcDtcblxuICAgICAgICBmdW5jdGlvbiBwcmV2ZW50KGUpIHtcbiAgICAgICAgICAgIGlmIChlLnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vdmUoZSkge1xuICAgICAgICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gTW91c2V1cCBoYXBwZW5lZCBvdXRzaWRlIG9mIHdpbmRvd1xuICAgICAgICAgICAgICAgIGlmIChJRSAmJiBkb2MuZG9jdW1lbnRNb2RlIDwgOSAmJiAhZS5idXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3AoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgdDAgPSBlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgJiYgZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgdmFyIHBhZ2VYID0gdDAgJiYgdDAucGFnZVggfHwgZS5wYWdlWDtcbiAgICAgICAgICAgICAgICB2YXIgcGFnZVkgPSB0MCAmJiB0MC5wYWdlWSB8fCBlLnBhZ2VZO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRyYWdYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ocGFnZVggLSBvZmZzZXQubGVmdCwgbWF4V2lkdGgpKTtcbiAgICAgICAgICAgICAgICB2YXIgZHJhZ1kgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihwYWdlWSAtIG9mZnNldC50b3AsIG1heEhlaWdodCkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc1RvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3Agc2Nyb2xsaW5nIGluIGlPU1xuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG9ubW92ZS5hcHBseShlbGVtZW50LCBbZHJhZ1gsIGRyYWdZLCBlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdGFydChlKSB7XG4gICAgICAgICAgICB2YXIgcmlnaHRjbGljayA9IChlLndoaWNoKSA/IChlLndoaWNoID09IDMpIDogKGUuYnV0dG9uID09IDIpO1xuXG4gICAgICAgICAgICBpZiAoIXJpZ2h0Y2xpY2sgJiYgIWRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9uc3RhcnQuYXBwbHkoZWxlbWVudCwgYXJndW1lbnRzKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQgPSAkKGVsZW1lbnQpLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aCA9ICQoZWxlbWVudCkud2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gJChlbGVtZW50KS5vZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgICAgICAkKGRvYykub24oZHVyaW5nRHJhZ0V2ZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jLmJvZHkpLmFkZENsYXNzKFwic3AtZHJhZ2dpbmdcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgbW92ZShlKTtcblxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAkKGRvYykub2ZmKGR1cmluZ0RyYWdFdmVudHMpO1xuICAgICAgICAgICAgICAgICQoZG9jLmJvZHkpLnJlbW92ZUNsYXNzKFwic3AtZHJhZ2dpbmdcIik7XG5cbiAgICAgICAgICAgICAgICAvLyBXYWl0IGEgdGljayBiZWZvcmUgbm90aWZ5aW5nIG9ic2VydmVycyB0byBhbGxvdyB0aGUgY2xpY2sgZXZlbnRcbiAgICAgICAgICAgICAgICAvLyB0byBmaXJlIGluIENocm9tZS5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBvbnN0b3AuYXBwbHkoZWxlbWVudCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAkKGVsZW1lbnQpLm9uKFwidG91Y2hzdGFydCBtb3VzZWRvd25cIiwgc3RhcnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIGRlYm91bmNlKSB7XG4gICAgICAgIHZhciB0aW1lb3V0O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgdmFyIHRocm90dGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChkZWJvdW5jZSkgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgaWYgKGRlYm91bmNlIHx8ICF0aW1lb3V0KSB0aW1lb3V0ID0gc2V0VGltZW91dCh0aHJvdHRsZXIsIHdhaXQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlucHV0VHlwZUNvbG9yU3VwcG9ydCgpIHtcbiAgICAgICAgcmV0dXJuICQuZm4uc3BlY3RydW0uaW5wdXRUeXBlQ29sb3JTdXBwb3J0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBEZWZpbmUgYSBqUXVlcnkgcGx1Z2luXG4gICAgKi9cbiAgICB2YXIgZGF0YUlEID0gXCJzcGVjdHJ1bS5pZFwiO1xuICAgICQuZm4uc3BlY3RydW0gPSBmdW5jdGlvbiAob3B0cywgZXh0cmEpIHtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdHMgPT0gXCJzdHJpbmdcIikge1xuXG4gICAgICAgICAgICB2YXIgcmV0dXJuVmFsdWUgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCggYXJndW1lbnRzLCAxICk7XG5cbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNwZWN0ID0gc3BlY3RydW1zWyQodGhpcykuZGF0YShkYXRhSUQpXTtcbiAgICAgICAgICAgICAgICBpZiAoc3BlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGhvZCA9IHNwZWN0W29wdHNdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBcIlNwZWN0cnVtOiBubyBzdWNoIG1ldGhvZDogJ1wiICsgb3B0cyArIFwiJ1wiICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cyA9PSBcImdldFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHNwZWN0LmdldCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdHMgPT0gXCJjb250YWluZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBzcGVjdC5jb250YWluZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0cyA9PSBcIm9wdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHNwZWN0Lm9wdGlvbi5hcHBseShzcGVjdCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0cyA9PSBcImRlc3Ryb3lcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BlY3QuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVEYXRhKGRhdGFJRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QuYXBwbHkoc3BlY3QsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXRpYWxpemluZyBhIG5ldyBpbnN0YW5jZSBvZiBzcGVjdHJ1bVxuICAgICAgICByZXR1cm4gdGhpcy5zcGVjdHJ1bShcImRlc3Ryb3lcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkKHRoaXMpLmRhdGEoKSwgb3B0cyk7XG4gICAgICAgICAgICB2YXIgc3BlY3QgPSBzcGVjdHJ1bSh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICQodGhpcykuZGF0YShkYXRhSUQsIHNwZWN0LmlkKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uc3BlY3RydW0ubG9hZCA9IHRydWU7XG4gICAgJC5mbi5zcGVjdHJ1bS5sb2FkT3B0cyA9IHt9O1xuICAgICQuZm4uc3BlY3RydW0uZHJhZ2dhYmxlID0gZHJhZ2dhYmxlO1xuICAgICQuZm4uc3BlY3RydW0uZGVmYXVsdHMgPSBkZWZhdWx0T3B0cztcbiAgICAkLmZuLnNwZWN0cnVtLmlucHV0VHlwZUNvbG9yU3VwcG9ydCA9IGZ1bmN0aW9uIGlucHV0VHlwZUNvbG9yU3VwcG9ydCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dFR5cGVDb2xvclN1cHBvcnQuX2NhY2hlZFJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIGNvbG9ySW5wdXQgPSAkKFwiPGlucHV0IHR5cGU9J2NvbG9yJy8+XCIpWzBdOyAvLyBpZiBjb2xvciBlbGVtZW50IGlzIHN1cHBvcnRlZCwgdmFsdWUgd2lsbCBkZWZhdWx0IHRvIG5vdCBudWxsXG4gICAgICAgICAgICBpbnB1dFR5cGVDb2xvclN1cHBvcnQuX2NhY2hlZFJlc3VsdCA9IGNvbG9ySW5wdXQudHlwZSA9PT0gXCJjb2xvclwiICYmIGNvbG9ySW5wdXQudmFsdWUgIT09IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlucHV0VHlwZUNvbG9yU3VwcG9ydC5fY2FjaGVkUmVzdWx0O1xuICAgIH07XG5cbiAgICAkLnNwZWN0cnVtID0geyB9O1xuICAgICQuc3BlY3RydW0ubG9jYWxpemF0aW9uID0geyB9O1xuICAgICQuc3BlY3RydW0ucGFsZXR0ZXMgPSB7IH07XG5cbiAgICAkLmZuLnNwZWN0cnVtLnByb2Nlc3NOYXRpdmVDb2xvcklucHV0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbG9ySW5wdXRzID0gJChcImlucHV0W3R5cGU9Y29sb3JdXCIpO1xuICAgICAgICBpZiAoY29sb3JJbnB1dHMubGVuZ3RoICYmICFpbnB1dFR5cGVDb2xvclN1cHBvcnQoKSkge1xuICAgICAgICAgICAgY29sb3JJbnB1dHMuc3BlY3RydW0oe1xuICAgICAgICAgICAgICAgIHByZWZlcnJlZEZvcm1hdDogXCJoZXg2XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIFRpbnlDb2xvciB2MS4xLjJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYmdyaW5zL1RpbnlDb2xvclxuICAgIC8vIEJyaWFuIEdyaW5zdGVhZCwgTUlUIExpY2Vuc2VcblxuICAgIChmdW5jdGlvbigpIHtcblxuICAgIHZhciB0cmltTGVmdCA9IC9eW1xccywjXSsvLFxuICAgICAgICB0cmltUmlnaHQgPSAvXFxzKyQvLFxuICAgICAgICB0aW55Q291bnRlciA9IDAsXG4gICAgICAgIG1hdGggPSBNYXRoLFxuICAgICAgICBtYXRoUm91bmQgPSBtYXRoLnJvdW5kLFxuICAgICAgICBtYXRoTWluID0gbWF0aC5taW4sXG4gICAgICAgIG1hdGhNYXggPSBtYXRoLm1heCxcbiAgICAgICAgbWF0aFJhbmRvbSA9IG1hdGgucmFuZG9tO1xuXG4gICAgdmFyIHRpbnljb2xvciA9IGZ1bmN0aW9uKGNvbG9yLCBvcHRzKSB7XG5cbiAgICAgICAgY29sb3IgPSAoY29sb3IpID8gY29sb3IgOiAnJztcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwgeyB9O1xuXG4gICAgICAgIC8vIElmIGlucHV0IGlzIGFscmVhZHkgYSB0aW55Y29sb3IsIHJldHVybiBpdHNlbGZcbiAgICAgICAgaWYgKGNvbG9yIGluc3RhbmNlb2YgdGlueWNvbG9yKSB7XG4gICAgICAgICAgIHJldHVybiBjb2xvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBhcmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24sIGNhbGwgdXNpbmcgbmV3IGluc3RlYWRcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIHRpbnljb2xvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGlueWNvbG9yKGNvbG9yLCBvcHRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZ2IgPSBpbnB1dFRvUkdCKGNvbG9yKTtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxJbnB1dCA9IGNvbG9yO1xuICAgICAgICB0aGlzLl9yID0gcmdiLnI7XG4gICAgICAgIHRoaXMuX2cgPSByZ2IuZztcbiAgICAgICAgdGhpcy5fYiA9IHJnYi5iO1xuICAgICAgICB0aGlzLl9hID0gcmdiLmE7XG4gICAgICAgIHRoaXMuX3JvdW5kQSA9IG1hdGhSb3VuZCgxMDAwICogdGhpcy5fYSkgLyAxMDAwO1xuICAgICAgICB0aGlzLl9mb3JtYXQgPSBvcHRzLmZvcm1hdCB8fCByZ2IuZm9ybWF0O1xuICAgICAgICB0aGlzLl9ncmFkaWVudFR5cGUgPSBvcHRzLmdyYWRpZW50VHlwZTtcblxuICAgICAgICAvLyBEb24ndCBsZXQgdGhlIHJhbmdlIG9mIFswLDI1NV0gY29tZSBiYWNrIGluIFswLDFdLlxuICAgICAgICAvLyBQb3RlbnRpYWxseSBsb3NlIGEgbGl0dGxlIGJpdCBvZiBwcmVjaXNpb24gaGVyZSwgYnV0IHdpbGwgZml4IGlzc3VlcyB3aGVyZVxuICAgICAgICAvLyAuNSBnZXRzIGludGVycHJldGVkIGFzIGhhbGYgb2YgdGhlIHRvdGFsLCBpbnN0ZWFkIG9mIGhhbGYgb2YgMVxuICAgICAgICAvLyBJZiBpdCB3YXMgc3VwcG9zZWQgdG8gYmUgMTI4LCB0aGlzIHdhcyBhbHJlYWR5IHRha2VuIGNhcmUgb2YgYnkgYGlucHV0VG9SZ2JgXG4gICAgICAgIGlmICh0aGlzLl9yIDwgMSkgeyB0aGlzLl9yID0gbWF0aFJvdW5kKHRoaXMuX3IpOyB9XG4gICAgICAgIGlmICh0aGlzLl9nIDwgMSkgeyB0aGlzLl9nID0gbWF0aFJvdW5kKHRoaXMuX2cpOyB9XG4gICAgICAgIGlmICh0aGlzLl9iIDwgMSkgeyB0aGlzLl9iID0gbWF0aFJvdW5kKHRoaXMuX2IpOyB9XG5cbiAgICAgICAgdGhpcy5fb2sgPSByZ2Iub2s7XG4gICAgICAgIHRoaXMuX3RjX2lkID0gdGlueUNvdW50ZXIrKztcbiAgICB9O1xuXG4gICAgdGlueWNvbG9yLnByb3RvdHlwZSA9IHtcbiAgICAgICAgaXNEYXJrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJyaWdodG5lc3MoKSA8IDEyODtcbiAgICAgICAgfSxcbiAgICAgICAgaXNMaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNEYXJrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzVmFsaWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29rO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPcmlnaW5hbElucHV0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb3JpZ2luYWxJbnB1dDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Rm9ybWF0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQ7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEFscGhhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hO1xuICAgICAgICB9LFxuICAgICAgICBnZXRCcmlnaHRuZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZ2IgPSB0aGlzLnRvUmdiKCk7XG4gICAgICAgICAgICByZXR1cm4gKHJnYi5yICogMjk5ICsgcmdiLmcgKiA1ODcgKyByZ2IuYiAqIDExNCkgLyAxMDAwO1xuICAgICAgICB9LFxuICAgICAgICBzZXRBbHBoYTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2EgPSBib3VuZEFscGhhKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3JvdW5kQSA9IG1hdGhSb3VuZCgxMDAwICogdGhpcy5fYSkgLyAxMDAwO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIHRvSHN2OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoc3YgPSByZ2JUb0hzdih0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iKTtcbiAgICAgICAgICAgIHJldHVybiB7IGg6IGhzdi5oICogMzYwLCBzOiBoc3YucywgdjogaHN2LnYsIGE6IHRoaXMuX2EgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9Ic3ZTdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhzdiA9IHJnYlRvSHN2KHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IpO1xuICAgICAgICAgICAgdmFyIGggPSBtYXRoUm91bmQoaHN2LmggKiAzNjApLCBzID0gbWF0aFJvdW5kKGhzdi5zICogMTAwKSwgdiA9IG1hdGhSb3VuZChoc3YudiAqIDEwMCk7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX2EgPT0gMSkgP1xuICAgICAgICAgICAgICBcImhzdihcIiAgKyBoICsgXCIsIFwiICsgcyArIFwiJSwgXCIgKyB2ICsgXCIlKVwiIDpcbiAgICAgICAgICAgICAgXCJoc3ZhKFwiICsgaCArIFwiLCBcIiArIHMgKyBcIiUsIFwiICsgdiArIFwiJSwgXCIrIHRoaXMuX3JvdW5kQSArIFwiKVwiO1xuICAgICAgICB9LFxuICAgICAgICB0b0hzbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaHNsID0gcmdiVG9Ic2wodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYik7XG4gICAgICAgICAgICByZXR1cm4geyBoOiBoc2wuaCAqIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sLCBhOiB0aGlzLl9hIH07XG4gICAgICAgIH0sXG4gICAgICAgIHRvSHNsU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoc2wgPSByZ2JUb0hzbCh0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iKTtcbiAgICAgICAgICAgIHZhciBoID0gbWF0aFJvdW5kKGhzbC5oICogMzYwKSwgcyA9IG1hdGhSb3VuZChoc2wucyAqIDEwMCksIGwgPSBtYXRoUm91bmQoaHNsLmwgKiAxMDApO1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9hID09IDEpID9cbiAgICAgICAgICAgICAgXCJoc2woXCIgICsgaCArIFwiLCBcIiArIHMgKyBcIiUsIFwiICsgbCArIFwiJSlcIiA6XG4gICAgICAgICAgICAgIFwiaHNsYShcIiArIGggKyBcIiwgXCIgKyBzICsgXCIlLCBcIiArIGwgKyBcIiUsIFwiKyB0aGlzLl9yb3VuZEEgKyBcIilcIjtcbiAgICAgICAgfSxcbiAgICAgICAgdG9IZXg6IGZ1bmN0aW9uKGFsbG93M0NoYXIpIHtcbiAgICAgICAgICAgIHJldHVybiByZ2JUb0hleCh0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iLCBhbGxvdzNDaGFyKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9IZXhTdHJpbmc6IGZ1bmN0aW9uKGFsbG93M0NoYXIpIHtcbiAgICAgICAgICAgIHJldHVybiAnIycgKyB0aGlzLnRvSGV4KGFsbG93M0NoYXIpO1xuICAgICAgICB9LFxuICAgICAgICB0b0hleDg6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJnYmFUb0hleCh0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iLCB0aGlzLl9hKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9IZXg4U3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAnIycgKyB0aGlzLnRvSGV4OCgpO1xuICAgICAgICB9LFxuICAgICAgICB0b1JnYjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4geyByOiBtYXRoUm91bmQodGhpcy5fciksIGc6IG1hdGhSb3VuZCh0aGlzLl9nKSwgYjogbWF0aFJvdW5kKHRoaXMuX2IpLCBhOiB0aGlzLl9hIH07XG4gICAgICAgIH0sXG4gICAgICAgIHRvUmdiU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fYSA9PSAxKSA/XG4gICAgICAgICAgICAgIFwicmdiKFwiICArIG1hdGhSb3VuZCh0aGlzLl9yKSArIFwiLCBcIiArIG1hdGhSb3VuZCh0aGlzLl9nKSArIFwiLCBcIiArIG1hdGhSb3VuZCh0aGlzLl9iKSArIFwiKVwiIDpcbiAgICAgICAgICAgICAgXCJyZ2JhKFwiICsgbWF0aFJvdW5kKHRoaXMuX3IpICsgXCIsIFwiICsgbWF0aFJvdW5kKHRoaXMuX2cpICsgXCIsIFwiICsgbWF0aFJvdW5kKHRoaXMuX2IpICsgXCIsIFwiICsgdGhpcy5fcm91bmRBICsgXCIpXCI7XG4gICAgICAgIH0sXG4gICAgICAgIHRvUGVyY2VudGFnZVJnYjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4geyByOiBtYXRoUm91bmQoYm91bmQwMSh0aGlzLl9yLCAyNTUpICogMTAwKSArIFwiJVwiLCBnOiBtYXRoUm91bmQoYm91bmQwMSh0aGlzLl9nLCAyNTUpICogMTAwKSArIFwiJVwiLCBiOiBtYXRoUm91bmQoYm91bmQwMSh0aGlzLl9iLCAyNTUpICogMTAwKSArIFwiJVwiLCBhOiB0aGlzLl9hIH07XG4gICAgICAgIH0sXG4gICAgICAgIHRvUGVyY2VudGFnZVJnYlN0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX2EgPT0gMSkgP1xuICAgICAgICAgICAgICBcInJnYihcIiAgKyBtYXRoUm91bmQoYm91bmQwMSh0aGlzLl9yLCAyNTUpICogMTAwKSArIFwiJSwgXCIgKyBtYXRoUm91bmQoYm91bmQwMSh0aGlzLl9nLCAyNTUpICogMTAwKSArIFwiJSwgXCIgKyBtYXRoUm91bmQoYm91bmQwMSh0aGlzLl9iLCAyNTUpICogMTAwKSArIFwiJSlcIiA6XG4gICAgICAgICAgICAgIFwicmdiYShcIiArIG1hdGhSb3VuZChib3VuZDAxKHRoaXMuX3IsIDI1NSkgKiAxMDApICsgXCIlLCBcIiArIG1hdGhSb3VuZChib3VuZDAxKHRoaXMuX2csIDI1NSkgKiAxMDApICsgXCIlLCBcIiArIG1hdGhSb3VuZChib3VuZDAxKHRoaXMuX2IsIDI1NSkgKiAxMDApICsgXCIlLCBcIiArIHRoaXMuX3JvdW5kQSArIFwiKVwiO1xuICAgICAgICB9LFxuICAgICAgICB0b05hbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2EgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fYSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBoZXhOYW1lc1tyZ2JUb0hleCh0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iLCB0cnVlKV0gfHwgZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIHRvRmlsdGVyOiBmdW5jdGlvbihzZWNvbmRDb2xvcikge1xuICAgICAgICAgICAgdmFyIGhleDhTdHJpbmcgPSAnIycgKyByZ2JhVG9IZXgodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYiwgdGhpcy5fYSk7XG4gICAgICAgICAgICB2YXIgc2Vjb25kSGV4OFN0cmluZyA9IGhleDhTdHJpbmc7XG4gICAgICAgICAgICB2YXIgZ3JhZGllbnRUeXBlID0gdGhpcy5fZ3JhZGllbnRUeXBlID8gXCJHcmFkaWVudFR5cGUgPSAxLCBcIiA6IFwiXCI7XG5cbiAgICAgICAgICAgIGlmIChzZWNvbmRDb2xvcikge1xuICAgICAgICAgICAgICAgIHZhciBzID0gdGlueWNvbG9yKHNlY29uZENvbG9yKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRIZXg4U3RyaW5nID0gcy50b0hleDhTdHJpbmcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KFwiK2dyYWRpZW50VHlwZStcInN0YXJ0Q29sb3JzdHI9XCIraGV4OFN0cmluZytcIixlbmRDb2xvcnN0cj1cIitzZWNvbmRIZXg4U3RyaW5nK1wiKVwiO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24oZm9ybWF0KSB7XG4gICAgICAgICAgICB2YXIgZm9ybWF0U2V0ID0gISFmb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgdGhpcy5fZm9ybWF0O1xuXG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkU3RyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgaGFzQWxwaGEgPSB0aGlzLl9hIDwgMSAmJiB0aGlzLl9hID49IDA7XG4gICAgICAgICAgICB2YXIgbmVlZHNBbHBoYUZvcm1hdCA9ICFmb3JtYXRTZXQgJiYgaGFzQWxwaGEgJiYgKGZvcm1hdCA9PT0gXCJoZXhcIiB8fCBmb3JtYXQgPT09IFwiaGV4NlwiIHx8IGZvcm1hdCA9PT0gXCJoZXgzXCIgfHwgZm9ybWF0ID09PSBcIm5hbWVcIik7XG5cbiAgICAgICAgICAgIGlmIChuZWVkc0FscGhhRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBcInRyYW5zcGFyZW50XCIsIGFsbCBvdGhlciBub24tYWxwaGEgZm9ybWF0c1xuICAgICAgICAgICAgICAgIC8vIHdpbGwgcmV0dXJuIHJnYmEgd2hlbiB0aGVyZSBpcyB0cmFuc3BhcmVuY3kuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gXCJuYW1lXCIgJiYgdGhpcy5fYSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b05hbWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9SZ2JTdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09IFwicmdiXCIpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvUmdiU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSBcInByZ2JcIikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9QZXJjZW50YWdlUmdiU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSBcImhleFwiIHx8IGZvcm1hdCA9PT0gXCJoZXg2XCIpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvSGV4U3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSBcImhleDNcIikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXhTdHJpbmcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSBcImhleDhcIikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXg4U3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSBcIm5hbWVcIikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9OYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSBcImhzbFwiKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hzbFN0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gXCJoc3ZcIikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9Ic3ZTdHJpbmcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFN0cmluZyB8fCB0aGlzLnRvSGV4U3RyaW5nKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FwcGx5TW9kaWZpY2F0aW9uOiBmdW5jdGlvbihmbiwgYXJncykge1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gZm4uYXBwbHkobnVsbCwgW3RoaXNdLmNvbmNhdChbXS5zbGljZS5jYWxsKGFyZ3MpKSk7XG4gICAgICAgICAgICB0aGlzLl9yID0gY29sb3IuX3I7XG4gICAgICAgICAgICB0aGlzLl9nID0gY29sb3IuX2c7XG4gICAgICAgICAgICB0aGlzLl9iID0gY29sb3IuX2I7XG4gICAgICAgICAgICB0aGlzLnNldEFscGhhKGNvbG9yLl9hKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBsaWdodGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseU1vZGlmaWNhdGlvbihsaWdodGVuLCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuICAgICAgICBicmlnaHRlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24oYnJpZ2h0ZW4sIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhcmtlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24oZGFya2VuLCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuICAgICAgICBkZXNhdHVyYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseU1vZGlmaWNhdGlvbihkZXNhdHVyYXRlLCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuICAgICAgICBzYXR1cmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24oc2F0dXJhdGUsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdyZXlzY2FsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24oZ3JleXNjYWxlLCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuICAgICAgICBzcGluOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseU1vZGlmaWNhdGlvbihzcGluLCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9hcHBseUNvbWJpbmF0aW9uOiBmdW5jdGlvbihmbiwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIFt0aGlzXS5jb25jYXQoW10uc2xpY2UuY2FsbChhcmdzKSkpO1xuICAgICAgICB9LFxuICAgICAgICBhbmFsb2dvdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24oYW5hbG9nb3VzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseUNvbWJpbmF0aW9uKGNvbXBsZW1lbnQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIG1vbm9jaHJvbWF0aWM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24obW9ub2Nocm9tYXRpYywgYXJndW1lbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3BsaXRjb21wbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseUNvbWJpbmF0aW9uKHNwbGl0Y29tcGxlbWVudCwgYXJndW1lbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJpYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24odHJpYWQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIHRldHJhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlDb21iaW5hdGlvbih0ZXRyYWQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gSWYgaW5wdXQgaXMgYW4gb2JqZWN0LCBmb3JjZSAxIGludG8gXCIxLjBcIiB0byBoYW5kbGUgcmF0aW9zIHByb3Blcmx5XG4gICAgLy8gU3RyaW5nIGlucHV0IHJlcXVpcmVzIFwiMS4wXCIgYXMgaW5wdXQsIHNvIDEgd2lsbCBiZSB0cmVhdGVkIGFzIDFcbiAgICB0aW55Y29sb3IuZnJvbVJhdGlvID0gZnVuY3Rpb24oY29sb3IsIG9wdHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb2xvciA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB2YXIgbmV3Q29sb3IgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY29sb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sb3IuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IFwiYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2xvcltpXSA9IGNvbG9yW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sb3JbaV0gPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbG9yID0gbmV3Q29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGlueWNvbG9yKGNvbG9yLCBvcHRzKTtcbiAgICB9O1xuXG4gICAgLy8gR2l2ZW4gYSBzdHJpbmcgb3Igb2JqZWN0LCBjb252ZXJ0IHRoYXQgaW5wdXQgdG8gUkdCXG4gICAgLy8gUG9zc2libGUgc3RyaW5nIGlucHV0czpcbiAgICAvL1xuICAgIC8vICAgICBcInJlZFwiXG4gICAgLy8gICAgIFwiI2YwMFwiIG9yIFwiZjAwXCJcbiAgICAvLyAgICAgXCIjZmYwMDAwXCIgb3IgXCJmZjAwMDBcIlxuICAgIC8vICAgICBcIiNmZjAwMDAwMFwiIG9yIFwiZmYwMDAwMDBcIlxuICAgIC8vICAgICBcInJnYiAyNTUgMCAwXCIgb3IgXCJyZ2IgKDI1NSwgMCwgMClcIlxuICAgIC8vICAgICBcInJnYiAxLjAgMCAwXCIgb3IgXCJyZ2IgKDEsIDAsIDApXCJcbiAgICAvLyAgICAgXCJyZ2JhICgyNTUsIDAsIDAsIDEpXCIgb3IgXCJyZ2JhIDI1NSwgMCwgMCwgMVwiXG4gICAgLy8gICAgIFwicmdiYSAoMS4wLCAwLCAwLCAxKVwiIG9yIFwicmdiYSAxLjAsIDAsIDAsIDFcIlxuICAgIC8vICAgICBcImhzbCgwLCAxMDAlLCA1MCUpXCIgb3IgXCJoc2wgMCAxMDAlIDUwJVwiXG4gICAgLy8gICAgIFwiaHNsYSgwLCAxMDAlLCA1MCUsIDEpXCIgb3IgXCJoc2xhIDAgMTAwJSA1MCUsIDFcIlxuICAgIC8vICAgICBcImhzdigwLCAxMDAlLCAxMDAlKVwiIG9yIFwiaHN2IDAgMTAwJSAxMDAlXCJcbiAgICAvL1xuICAgIGZ1bmN0aW9uIGlucHV0VG9SR0IoY29sb3IpIHtcblxuICAgICAgICB2YXIgcmdiID0geyByOiAwLCBnOiAwLCBiOiAwIH07XG4gICAgICAgIHZhciBhID0gMTtcbiAgICAgICAgdmFyIG9rID0gZmFsc2U7XG4gICAgICAgIHZhciBmb3JtYXQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbG9yID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNvbG9yID0gc3RyaW5nSW5wdXRUb09iamVjdChjb2xvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbG9yID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGlmIChjb2xvci5oYXNPd25Qcm9wZXJ0eShcInJcIikgJiYgY29sb3IuaGFzT3duUHJvcGVydHkoXCJnXCIpICYmIGNvbG9yLmhhc093blByb3BlcnR5KFwiYlwiKSkge1xuICAgICAgICAgICAgICAgIHJnYiA9IHJnYlRvUmdiKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xuICAgICAgICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBTdHJpbmcoY29sb3Iucikuc3Vic3RyKC0xKSA9PT0gXCIlXCIgPyBcInByZ2JcIiA6IFwicmdiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb2xvci5oYXNPd25Qcm9wZXJ0eShcImhcIikgJiYgY29sb3IuaGFzT3duUHJvcGVydHkoXCJzXCIpICYmIGNvbG9yLmhhc093blByb3BlcnR5KFwidlwiKSkge1xuICAgICAgICAgICAgICAgIGNvbG9yLnMgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLnMpO1xuICAgICAgICAgICAgICAgIGNvbG9yLnYgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLnYpO1xuICAgICAgICAgICAgICAgIHJnYiA9IGhzdlRvUmdiKGNvbG9yLmgsIGNvbG9yLnMsIGNvbG9yLnYpO1xuICAgICAgICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBcImhzdlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29sb3IuaGFzT3duUHJvcGVydHkoXCJoXCIpICYmIGNvbG9yLmhhc093blByb3BlcnR5KFwic1wiKSAmJiBjb2xvci5oYXNPd25Qcm9wZXJ0eShcImxcIikpIHtcbiAgICAgICAgICAgICAgICBjb2xvci5zID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvci5zKTtcbiAgICAgICAgICAgICAgICBjb2xvci5sID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvci5sKTtcbiAgICAgICAgICAgICAgICByZ2IgPSBoc2xUb1JnYihjb2xvci5oLCBjb2xvci5zLCBjb2xvci5sKTtcbiAgICAgICAgICAgICAgICBvayA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gXCJoc2xcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbG9yLmhhc093blByb3BlcnR5KFwiYVwiKSkge1xuICAgICAgICAgICAgICAgIGEgPSBjb2xvci5hO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYSA9IGJvdW5kQWxwaGEoYSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9rOiBvayxcbiAgICAgICAgICAgIGZvcm1hdDogY29sb3IuZm9ybWF0IHx8IGZvcm1hdCxcbiAgICAgICAgICAgIHI6IG1hdGhNaW4oMjU1LCBtYXRoTWF4KHJnYi5yLCAwKSksXG4gICAgICAgICAgICBnOiBtYXRoTWluKDI1NSwgbWF0aE1heChyZ2IuZywgMCkpLFxuICAgICAgICAgICAgYjogbWF0aE1pbigyNTUsIG1hdGhNYXgocmdiLmIsIDApKSxcbiAgICAgICAgICAgIGE6IGFcbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIC8vIENvbnZlcnNpb24gRnVuY3Rpb25zXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGByZ2JUb0hzbGAsIGByZ2JUb0hzdmAsIGBoc2xUb1JnYmAsIGBoc3ZUb1JnYmAgbW9kaWZpZWQgZnJvbTpcbiAgICAvLyA8aHR0cDovL21qaWphY2tzb24uY29tLzIwMDgvMDIvcmdiLXRvLWhzbC1hbmQtcmdiLXRvLWhzdi1jb2xvci1tb2RlbC1jb252ZXJzaW9uLWFsZ29yaXRobXMtaW4tamF2YXNjcmlwdD5cblxuICAgIC8vIGByZ2JUb1JnYmBcbiAgICAvLyBIYW5kbGUgYm91bmRzIC8gcGVyY2VudGFnZSBjaGVja2luZyB0byBjb25mb3JtIHRvIENTUyBjb2xvciBzcGVjXG4gICAgLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtY29sb3IvPlxuICAgIC8vICpBc3N1bWVzOiogciwgZywgYiBpbiBbMCwgMjU1XSBvciBbMCwgMV1cbiAgICAvLyAqUmV0dXJuczoqIHsgciwgZywgYiB9IGluIFswLCAyNTVdXG4gICAgZnVuY3Rpb24gcmdiVG9SZ2IociwgZywgYil7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBib3VuZDAxKHIsIDI1NSkgKiAyNTUsXG4gICAgICAgICAgICBnOiBib3VuZDAxKGcsIDI1NSkgKiAyNTUsXG4gICAgICAgICAgICBiOiBib3VuZDAxKGIsIDI1NSkgKiAyNTVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBgcmdiVG9Ic2xgXG4gICAgLy8gQ29udmVydHMgYW4gUkdCIGNvbG9yIHZhbHVlIHRvIEhTTC5cbiAgICAvLyAqQXNzdW1lczoqIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gWzAsIDI1NV0gb3IgWzAsIDFdXG4gICAgLy8gKlJldHVybnM6KiB7IGgsIHMsIGwgfSBpbiBbMCwxXVxuICAgIGZ1bmN0aW9uIHJnYlRvSHNsKHIsIGcsIGIpIHtcblxuICAgICAgICByID0gYm91bmQwMShyLCAyNTUpO1xuICAgICAgICBnID0gYm91bmQwMShnLCAyNTUpO1xuICAgICAgICBiID0gYm91bmQwMShiLCAyNTUpO1xuXG4gICAgICAgIHZhciBtYXggPSBtYXRoTWF4KHIsIGcsIGIpLCBtaW4gPSBtYXRoTWluKHIsIGcsIGIpO1xuICAgICAgICB2YXIgaCwgcywgbCA9IChtYXggKyBtaW4pIC8gMjtcblxuICAgICAgICBpZihtYXggPT0gbWluKSB7XG4gICAgICAgICAgICBoID0gcyA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBkID0gbWF4IC0gbWluO1xuICAgICAgICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgICAgICAgICAgc3dpdGNoKG1heCkge1xuICAgICAgICAgICAgICAgIGNhc2UgcjogaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGc6IGggPSAoYiAtIHIpIC8gZCArIDI7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgYjogaCA9IChyIC0gZykgLyBkICsgNDsgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGggLz0gNjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IGg6IGgsIHM6IHMsIGw6IGwgfTtcbiAgICB9XG5cbiAgICAvLyBgaHNsVG9SZ2JgXG4gICAgLy8gQ29udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi5cbiAgICAvLyAqQXNzdW1lczoqIGggaXMgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMzYwXSBhbmQgcyBhbmQgbCBhcmUgY29udGFpbmVkIFswLCAxXSBvciBbMCwgMTAwXVxuICAgIC8vICpSZXR1cm5zOiogeyByLCBnLCBiIH0gaW4gdGhlIHNldCBbMCwgMjU1XVxuICAgIGZ1bmN0aW9uIGhzbFRvUmdiKGgsIHMsIGwpIHtcbiAgICAgICAgdmFyIHIsIGcsIGI7XG5cbiAgICAgICAgaCA9IGJvdW5kMDEoaCwgMzYwKTtcbiAgICAgICAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgICAgICAgbCA9IGJvdW5kMDEobCwgMTAwKTtcblxuICAgICAgICBmdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICAgICAgICAgIGlmKHQgPCAwKSB0ICs9IDE7XG4gICAgICAgICAgICBpZih0ID4gMSkgdCAtPSAxO1xuICAgICAgICAgICAgaWYodCA8IDEvNikgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7XG4gICAgICAgICAgICBpZih0IDwgMS8yKSByZXR1cm4gcTtcbiAgICAgICAgICAgIGlmKHQgPCAyLzMpIHJldHVybiBwICsgKHEgLSBwKSAqICgyLzMgLSB0KSAqIDY7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHMgPT09IDApIHtcbiAgICAgICAgICAgIHIgPSBnID0gYiA9IGw7IC8vIGFjaHJvbWF0aWNcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcbiAgICAgICAgICAgIHZhciBwID0gMiAqIGwgLSBxO1xuICAgICAgICAgICAgciA9IGh1ZTJyZ2IocCwgcSwgaCArIDEvMyk7XG4gICAgICAgICAgICBnID0gaHVlMnJnYihwLCBxLCBoKTtcbiAgICAgICAgICAgIGIgPSBodWUycmdiKHAsIHEsIGggLSAxLzMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgcjogciAqIDI1NSwgZzogZyAqIDI1NSwgYjogYiAqIDI1NSB9O1xuICAgIH1cblxuICAgIC8vIGByZ2JUb0hzdmBcbiAgICAvLyBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNWXG4gICAgLy8gKkFzc3VtZXM6KiByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV0gb3IgWzAsIDFdXG4gICAgLy8gKlJldHVybnM6KiB7IGgsIHMsIHYgfSBpbiBbMCwxXVxuICAgIGZ1bmN0aW9uIHJnYlRvSHN2KHIsIGcsIGIpIHtcblxuICAgICAgICByID0gYm91bmQwMShyLCAyNTUpO1xuICAgICAgICBnID0gYm91bmQwMShnLCAyNTUpO1xuICAgICAgICBiID0gYm91bmQwMShiLCAyNTUpO1xuXG4gICAgICAgIHZhciBtYXggPSBtYXRoTWF4KHIsIGcsIGIpLCBtaW4gPSBtYXRoTWluKHIsIGcsIGIpO1xuICAgICAgICB2YXIgaCwgcywgdiA9IG1heDtcblxuICAgICAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICAgICAgcyA9IG1heCA9PT0gMCA/IDAgOiBkIC8gbWF4O1xuXG4gICAgICAgIGlmKG1heCA9PSBtaW4pIHtcbiAgICAgICAgICAgIGggPSAwOyAvLyBhY2hyb21hdGljXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2gobWF4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSByOiBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZzogaCA9IChiIC0gcikgLyBkICsgMjsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBiOiBoID0gKHIgLSBnKSAvIGQgKyA0OyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGggLz0gNjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBoOiBoLCBzOiBzLCB2OiB2IH07XG4gICAgfVxuXG4gICAgLy8gYGhzdlRvUmdiYFxuICAgIC8vIENvbnZlcnRzIGFuIEhTViBjb2xvciB2YWx1ZSB0byBSR0IuXG4gICAgLy8gKkFzc3VtZXM6KiBoIGlzIGNvbnRhaW5lZCBpbiBbMCwgMV0gb3IgWzAsIDM2MF0gYW5kIHMgYW5kIHYgYXJlIGNvbnRhaW5lZCBpbiBbMCwgMV0gb3IgWzAsIDEwMF1cbiAgICAvLyAqUmV0dXJuczoqIHsgciwgZywgYiB9IGluIHRoZSBzZXQgWzAsIDI1NV1cbiAgICAgZnVuY3Rpb24gaHN2VG9SZ2IoaCwgcywgdikge1xuXG4gICAgICAgIGggPSBib3VuZDAxKGgsIDM2MCkgKiA2O1xuICAgICAgICBzID0gYm91bmQwMShzLCAxMDApO1xuICAgICAgICB2ID0gYm91bmQwMSh2LCAxMDApO1xuXG4gICAgICAgIHZhciBpID0gbWF0aC5mbG9vcihoKSxcbiAgICAgICAgICAgIGYgPSBoIC0gaSxcbiAgICAgICAgICAgIHAgPSB2ICogKDEgLSBzKSxcbiAgICAgICAgICAgIHEgPSB2ICogKDEgLSBmICogcyksXG4gICAgICAgICAgICB0ID0gdiAqICgxIC0gKDEgLSBmKSAqIHMpLFxuICAgICAgICAgICAgbW9kID0gaSAlIDYsXG4gICAgICAgICAgICByID0gW3YsIHEsIHAsIHAsIHQsIHZdW21vZF0sXG4gICAgICAgICAgICBnID0gW3QsIHYsIHYsIHEsIHAsIHBdW21vZF0sXG4gICAgICAgICAgICBiID0gW3AsIHAsIHQsIHYsIHYsIHFdW21vZF07XG5cbiAgICAgICAgcmV0dXJuIHsgcjogciAqIDI1NSwgZzogZyAqIDI1NSwgYjogYiAqIDI1NSB9O1xuICAgIH1cblxuICAgIC8vIGByZ2JUb0hleGBcbiAgICAvLyBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdG8gaGV4XG4gICAgLy8gQXNzdW1lcyByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV1cbiAgICAvLyBSZXR1cm5zIGEgMyBvciA2IGNoYXJhY3RlciBoZXhcbiAgICBmdW5jdGlvbiByZ2JUb0hleChyLCBnLCBiLCBhbGxvdzNDaGFyKSB7XG5cbiAgICAgICAgdmFyIGhleCA9IFtcbiAgICAgICAgICAgIHBhZDIobWF0aFJvdW5kKHIpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgICAgICBwYWQyKG1hdGhSb3VuZChnKS50b1N0cmluZygxNikpLFxuICAgICAgICAgICAgcGFkMihtYXRoUm91bmQoYikudG9TdHJpbmcoMTYpKVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIFJldHVybiBhIDMgY2hhcmFjdGVyIGhleCBpZiBwb3NzaWJsZVxuICAgICAgICBpZiAoYWxsb3czQ2hhciAmJiBoZXhbMF0uY2hhckF0KDApID09IGhleFswXS5jaGFyQXQoMSkgJiYgaGV4WzFdLmNoYXJBdCgwKSA9PSBoZXhbMV0uY2hhckF0KDEpICYmIGhleFsyXS5jaGFyQXQoMCkgPT0gaGV4WzJdLmNoYXJBdCgxKSkge1xuICAgICAgICAgICAgcmV0dXJuIGhleFswXS5jaGFyQXQoMCkgKyBoZXhbMV0uY2hhckF0KDApICsgaGV4WzJdLmNoYXJBdCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoZXguam9pbihcIlwiKTtcbiAgICB9XG4gICAgICAgIC8vIGByZ2JhVG9IZXhgXG4gICAgICAgIC8vIENvbnZlcnRzIGFuIFJHQkEgY29sb3IgcGx1cyBhbHBoYSB0cmFuc3BhcmVuY3kgdG8gaGV4XG4gICAgICAgIC8vIEFzc3VtZXMgciwgZywgYiBhbmQgYSBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV1cbiAgICAgICAgLy8gUmV0dXJucyBhbiA4IGNoYXJhY3RlciBoZXhcbiAgICAgICAgZnVuY3Rpb24gcmdiYVRvSGV4KHIsIGcsIGIsIGEpIHtcblxuICAgICAgICAgICAgdmFyIGhleCA9IFtcbiAgICAgICAgICAgICAgICBwYWQyKGNvbnZlcnREZWNpbWFsVG9IZXgoYSkpLFxuICAgICAgICAgICAgICAgIHBhZDIobWF0aFJvdW5kKHIpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgICAgICAgICAgcGFkMihtYXRoUm91bmQoZykudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgICAgICAgICBwYWQyKG1hdGhSb3VuZChiKS50b1N0cmluZygxNikpXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICByZXR1cm4gaGV4LmpvaW4oXCJcIik7XG4gICAgICAgIH1cblxuICAgIC8vIGBlcXVhbHNgXG4gICAgLy8gQ2FuIGJlIGNhbGxlZCB3aXRoIGFueSB0aW55Y29sb3IgaW5wdXRcbiAgICB0aW55Y29sb3IuZXF1YWxzID0gZnVuY3Rpb24gKGNvbG9yMSwgY29sb3IyKSB7XG4gICAgICAgIGlmICghY29sb3IxIHx8ICFjb2xvcjIpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIHJldHVybiB0aW55Y29sb3IoY29sb3IxKS50b1JnYlN0cmluZygpID09IHRpbnljb2xvcihjb2xvcjIpLnRvUmdiU3RyaW5nKCk7XG4gICAgfTtcbiAgICB0aW55Y29sb3IucmFuZG9tID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aW55Y29sb3IuZnJvbVJhdGlvKHtcbiAgICAgICAgICAgIHI6IG1hdGhSYW5kb20oKSxcbiAgICAgICAgICAgIGc6IG1hdGhSYW5kb20oKSxcbiAgICAgICAgICAgIGI6IG1hdGhSYW5kb20oKVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvLyBNb2RpZmljYXRpb24gRnVuY3Rpb25zXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoYW5rcyB0byBsZXNzLmpzIGZvciBzb21lIG9mIHRoZSBiYXNpY3MgaGVyZVxuICAgIC8vIDxodHRwczovL2dpdGh1Yi5jb20vY2xvdWRoZWFkL2xlc3MuanMvYmxvYi9tYXN0ZXIvbGliL2xlc3MvZnVuY3Rpb25zLmpzPlxuXG4gICAgZnVuY3Rpb24gZGVzYXR1cmF0ZShjb2xvciwgYW1vdW50KSB7XG4gICAgICAgIGFtb3VudCA9IChhbW91bnQgPT09IDApID8gMCA6IChhbW91bnQgfHwgMTApO1xuICAgICAgICB2YXIgaHNsID0gdGlueWNvbG9yKGNvbG9yKS50b0hzbCgpO1xuICAgICAgICBoc2wucyAtPSBhbW91bnQgLyAxMDA7XG4gICAgICAgIGhzbC5zID0gY2xhbXAwMShoc2wucyk7XG4gICAgICAgIHJldHVybiB0aW55Y29sb3IoaHNsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzYXR1cmF0ZShjb2xvciwgYW1vdW50KSB7XG4gICAgICAgIGFtb3VudCA9IChhbW91bnQgPT09IDApID8gMCA6IChhbW91bnQgfHwgMTApO1xuICAgICAgICB2YXIgaHNsID0gdGlueWNvbG9yKGNvbG9yKS50b0hzbCgpO1xuICAgICAgICBoc2wucyArPSBhbW91bnQgLyAxMDA7XG4gICAgICAgIGhzbC5zID0gY2xhbXAwMShoc2wucyk7XG4gICAgICAgIHJldHVybiB0aW55Y29sb3IoaHNsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBncmV5c2NhbGUoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHRpbnljb2xvcihjb2xvcikuZGVzYXR1cmF0ZSgxMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpZ2h0ZW4gKGNvbG9yLCBhbW91bnQpIHtcbiAgICAgICAgYW1vdW50ID0gKGFtb3VudCA9PT0gMCkgPyAwIDogKGFtb3VudCB8fCAxMCk7XG4gICAgICAgIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gICAgICAgIGhzbC5sICs9IGFtb3VudCAvIDEwMDtcbiAgICAgICAgaHNsLmwgPSBjbGFtcDAxKGhzbC5sKTtcbiAgICAgICAgcmV0dXJuIHRpbnljb2xvcihoc2wpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJyaWdodGVuKGNvbG9yLCBhbW91bnQpIHtcbiAgICAgICAgYW1vdW50ID0gKGFtb3VudCA9PT0gMCkgPyAwIDogKGFtb3VudCB8fCAxMCk7XG4gICAgICAgIHZhciByZ2IgPSB0aW55Y29sb3IoY29sb3IpLnRvUmdiKCk7XG4gICAgICAgIHJnYi5yID0gbWF0aE1heCgwLCBtYXRoTWluKDI1NSwgcmdiLnIgLSBtYXRoUm91bmQoMjU1ICogLSAoYW1vdW50IC8gMTAwKSkpKTtcbiAgICAgICAgcmdiLmcgPSBtYXRoTWF4KDAsIG1hdGhNaW4oMjU1LCByZ2IuZyAtIG1hdGhSb3VuZCgyNTUgKiAtIChhbW91bnQgLyAxMDApKSkpO1xuICAgICAgICByZ2IuYiA9IG1hdGhNYXgoMCwgbWF0aE1pbigyNTUsIHJnYi5iIC0gbWF0aFJvdW5kKDI1NSAqIC0gKGFtb3VudCAvIDEwMCkpKSk7XG4gICAgICAgIHJldHVybiB0aW55Y29sb3IocmdiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXJrZW4gKGNvbG9yLCBhbW91bnQpIHtcbiAgICAgICAgYW1vdW50ID0gKGFtb3VudCA9PT0gMCkgPyAwIDogKGFtb3VudCB8fCAxMCk7XG4gICAgICAgIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gICAgICAgIGhzbC5sIC09IGFtb3VudCAvIDEwMDtcbiAgICAgICAgaHNsLmwgPSBjbGFtcDAxKGhzbC5sKTtcbiAgICAgICAgcmV0dXJuIHRpbnljb2xvcihoc2wpO1xuICAgIH1cblxuICAgIC8vIFNwaW4gdGFrZXMgYSBwb3NpdGl2ZSBvciBuZWdhdGl2ZSBhbW91bnQgd2l0aGluIFstMzYwLCAzNjBdIGluZGljYXRpbmcgdGhlIGNoYW5nZSBvZiBodWUuXG4gICAgLy8gVmFsdWVzIG91dHNpZGUgb2YgdGhpcyByYW5nZSB3aWxsIGJlIHdyYXBwZWQgaW50byB0aGlzIHJhbmdlLlxuICAgIGZ1bmN0aW9uIHNwaW4oY29sb3IsIGFtb3VudCkge1xuICAgICAgICB2YXIgaHNsID0gdGlueWNvbG9yKGNvbG9yKS50b0hzbCgpO1xuICAgICAgICB2YXIgaHVlID0gKG1hdGhSb3VuZChoc2wuaCkgKyBhbW91bnQpICUgMzYwO1xuICAgICAgICBoc2wuaCA9IGh1ZSA8IDAgPyAzNjAgKyBodWUgOiBodWU7XG4gICAgICAgIHJldHVybiB0aW55Y29sb3IoaHNsKTtcbiAgICB9XG5cbiAgICAvLyBDb21iaW5hdGlvbiBGdW5jdGlvbnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBUaGFua3MgdG8galF1ZXJ5IHhDb2xvciBmb3Igc29tZSBvZiB0aGUgaWRlYXMgYmVoaW5kIHRoZXNlXG4gICAgLy8gPGh0dHBzOi8vZ2l0aHViLmNvbS9pbmZ1c2lvbi9qUXVlcnkteGNvbG9yL2Jsb2IvbWFzdGVyL2pxdWVyeS54Y29sb3IuanM+XG5cbiAgICBmdW5jdGlvbiBjb21wbGVtZW50KGNvbG9yKSB7XG4gICAgICAgIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gICAgICAgIGhzbC5oID0gKGhzbC5oICsgMTgwKSAlIDM2MDtcbiAgICAgICAgcmV0dXJuIHRpbnljb2xvcihoc2wpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyaWFkKGNvbG9yKSB7XG4gICAgICAgIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gICAgICAgIHZhciBoID0gaHNsLmg7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aW55Y29sb3IoY29sb3IpLFxuICAgICAgICAgICAgdGlueWNvbG9yKHsgaDogKGggKyAxMjApICUgMzYwLCBzOiBoc2wucywgbDogaHNsLmwgfSksXG4gICAgICAgICAgICB0aW55Y29sb3IoeyBoOiAoaCArIDI0MCkgJSAzNjAsIHM6IGhzbC5zLCBsOiBoc2wubCB9KVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRldHJhZChjb2xvcikge1xuICAgICAgICB2YXIgaHNsID0gdGlueWNvbG9yKGNvbG9yKS50b0hzbCgpO1xuICAgICAgICB2YXIgaCA9IGhzbC5oO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGlueWNvbG9yKGNvbG9yKSxcbiAgICAgICAgICAgIHRpbnljb2xvcih7IGg6IChoICsgOTApICUgMzYwLCBzOiBoc2wucywgbDogaHNsLmwgfSksXG4gICAgICAgICAgICB0aW55Y29sb3IoeyBoOiAoaCArIDE4MCkgJSAzNjAsIHM6IGhzbC5zLCBsOiBoc2wubCB9KSxcbiAgICAgICAgICAgIHRpbnljb2xvcih7IGg6IChoICsgMjcwKSAlIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sIH0pXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3BsaXRjb21wbGVtZW50KGNvbG9yKSB7XG4gICAgICAgIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gICAgICAgIHZhciBoID0gaHNsLmg7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aW55Y29sb3IoY29sb3IpLFxuICAgICAgICAgICAgdGlueWNvbG9yKHsgaDogKGggKyA3MikgJSAzNjAsIHM6IGhzbC5zLCBsOiBoc2wubH0pLFxuICAgICAgICAgICAgdGlueWNvbG9yKHsgaDogKGggKyAyMTYpICUgMzYwLCBzOiBoc2wucywgbDogaHNsLmx9KVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuYWxvZ291cyhjb2xvciwgcmVzdWx0cywgc2xpY2VzKSB7XG4gICAgICAgIHJlc3VsdHMgPSByZXN1bHRzIHx8IDY7XG4gICAgICAgIHNsaWNlcyA9IHNsaWNlcyB8fCAzMDtcblxuICAgICAgICB2YXIgaHNsID0gdGlueWNvbG9yKGNvbG9yKS50b0hzbCgpO1xuICAgICAgICB2YXIgcGFydCA9IDM2MCAvIHNsaWNlcztcbiAgICAgICAgdmFyIHJldCA9IFt0aW55Y29sb3IoY29sb3IpXTtcblxuICAgICAgICBmb3IgKGhzbC5oID0gKChoc2wuaCAtIChwYXJ0ICogcmVzdWx0cyA+PiAxKSkgKyA3MjApICUgMzYwOyAtLXJlc3VsdHM7ICkge1xuICAgICAgICAgICAgaHNsLmggPSAoaHNsLmggKyBwYXJ0KSAlIDM2MDtcbiAgICAgICAgICAgIHJldC5wdXNoKHRpbnljb2xvcihoc2wpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbm9jaHJvbWF0aWMoY29sb3IsIHJlc3VsdHMpIHtcbiAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMgfHwgNjtcbiAgICAgICAgdmFyIGhzdiA9IHRpbnljb2xvcihjb2xvcikudG9Ic3YoKTtcbiAgICAgICAgdmFyIGggPSBoc3YuaCwgcyA9IGhzdi5zLCB2ID0gaHN2LnY7XG4gICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgdmFyIG1vZGlmaWNhdGlvbiA9IDEgLyByZXN1bHRzO1xuXG4gICAgICAgIHdoaWxlIChyZXN1bHRzLS0pIHtcbiAgICAgICAgICAgIHJldC5wdXNoKHRpbnljb2xvcih7IGg6IGgsIHM6IHMsIHY6IHZ9KSk7XG4gICAgICAgICAgICB2ID0gKHYgKyBtb2RpZmljYXRpb24pICUgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gVXRpbGl0eSBGdW5jdGlvbnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHRpbnljb2xvci5taXggPSBmdW5jdGlvbihjb2xvcjEsIGNvbG9yMiwgYW1vdW50KSB7XG4gICAgICAgIGFtb3VudCA9IChhbW91bnQgPT09IDApID8gMCA6IChhbW91bnQgfHwgNTApO1xuXG4gICAgICAgIHZhciByZ2IxID0gdGlueWNvbG9yKGNvbG9yMSkudG9SZ2IoKTtcbiAgICAgICAgdmFyIHJnYjIgPSB0aW55Y29sb3IoY29sb3IyKS50b1JnYigpO1xuXG4gICAgICAgIHZhciBwID0gYW1vdW50IC8gMTAwO1xuICAgICAgICB2YXIgdyA9IHAgKiAyIC0gMTtcbiAgICAgICAgdmFyIGEgPSByZ2IyLmEgLSByZ2IxLmE7XG5cbiAgICAgICAgdmFyIHcxO1xuXG4gICAgICAgIGlmICh3ICogYSA9PSAtMSkge1xuICAgICAgICAgICAgdzEgPSB3O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdzEgPSAodyArIGEpIC8gKDEgKyB3ICogYSk7XG4gICAgICAgIH1cblxuICAgICAgICB3MSA9ICh3MSArIDEpIC8gMjtcblxuICAgICAgICB2YXIgdzIgPSAxIC0gdzE7XG5cbiAgICAgICAgdmFyIHJnYmEgPSB7XG4gICAgICAgICAgICByOiByZ2IyLnIgKiB3MSArIHJnYjEuciAqIHcyLFxuICAgICAgICAgICAgZzogcmdiMi5nICogdzEgKyByZ2IxLmcgKiB3MixcbiAgICAgICAgICAgIGI6IHJnYjIuYiAqIHcxICsgcmdiMS5iICogdzIsXG4gICAgICAgICAgICBhOiByZ2IyLmEgKiBwICArIHJnYjEuYSAqICgxIC0gcClcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGlueWNvbG9yKHJnYmEpO1xuICAgIH07XG5cblxuICAgIC8vIFJlYWRhYmlsaXR5IEZ1bmN0aW9uc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIDxodHRwOi8vd3d3LnczLm9yZy9UUi9BRVJUI2NvbG9yLWNvbnRyYXN0PlxuXG4gICAgLy8gYHJlYWRhYmlsaXR5YFxuICAgIC8vIEFuYWx5emUgdGhlIDIgY29sb3JzIGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICAvLyAgICBgYnJpZ2h0bmVzc2A6IGRpZmZlcmVuY2UgaW4gYnJpZ2h0bmVzcyBiZXR3ZWVuIHRoZSB0d28gY29sb3JzXG4gICAgLy8gICAgYGNvbG9yYDogZGlmZmVyZW5jZSBpbiBjb2xvci9odWUgYmV0d2VlbiB0aGUgdHdvIGNvbG9yc1xuICAgIHRpbnljb2xvci5yZWFkYWJpbGl0eSA9IGZ1bmN0aW9uKGNvbG9yMSwgY29sb3IyKSB7XG4gICAgICAgIHZhciBjMSA9IHRpbnljb2xvcihjb2xvcjEpO1xuICAgICAgICB2YXIgYzIgPSB0aW55Y29sb3IoY29sb3IyKTtcbiAgICAgICAgdmFyIHJnYjEgPSBjMS50b1JnYigpO1xuICAgICAgICB2YXIgcmdiMiA9IGMyLnRvUmdiKCk7XG4gICAgICAgIHZhciBicmlnaHRuZXNzQSA9IGMxLmdldEJyaWdodG5lc3MoKTtcbiAgICAgICAgdmFyIGJyaWdodG5lc3NCID0gYzIuZ2V0QnJpZ2h0bmVzcygpO1xuICAgICAgICB2YXIgY29sb3JEaWZmID0gKFxuICAgICAgICAgICAgTWF0aC5tYXgocmdiMS5yLCByZ2IyLnIpIC0gTWF0aC5taW4ocmdiMS5yLCByZ2IyLnIpICtcbiAgICAgICAgICAgIE1hdGgubWF4KHJnYjEuZywgcmdiMi5nKSAtIE1hdGgubWluKHJnYjEuZywgcmdiMi5nKSArXG4gICAgICAgICAgICBNYXRoLm1heChyZ2IxLmIsIHJnYjIuYikgLSBNYXRoLm1pbihyZ2IxLmIsIHJnYjIuYilcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnJpZ2h0bmVzczogTWF0aC5hYnMoYnJpZ2h0bmVzc0EgLSBicmlnaHRuZXNzQiksXG4gICAgICAgICAgICBjb2xvcjogY29sb3JEaWZmXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8vIGByZWFkYWJsZWBcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9BRVJUI2NvbG9yLWNvbnRyYXN0XG4gICAgLy8gRW5zdXJlIHRoYXQgZm9yZWdyb3VuZCBhbmQgYmFja2dyb3VuZCBjb2xvciBjb21iaW5hdGlvbnMgcHJvdmlkZSBzdWZmaWNpZW50IGNvbnRyYXN0LlxuICAgIC8vICpFeGFtcGxlKlxuICAgIC8vICAgIHRpbnljb2xvci5pc1JlYWRhYmxlKFwiIzAwMFwiLCBcIiMxMTFcIikgPT4gZmFsc2VcbiAgICB0aW55Y29sb3IuaXNSZWFkYWJsZSA9IGZ1bmN0aW9uKGNvbG9yMSwgY29sb3IyKSB7XG4gICAgICAgIHZhciByZWFkYWJpbGl0eSA9IHRpbnljb2xvci5yZWFkYWJpbGl0eShjb2xvcjEsIGNvbG9yMik7XG4gICAgICAgIHJldHVybiByZWFkYWJpbGl0eS5icmlnaHRuZXNzID4gMTI1ICYmIHJlYWRhYmlsaXR5LmNvbG9yID4gNTAwO1xuICAgIH07XG5cbiAgICAvLyBgbW9zdFJlYWRhYmxlYFxuICAgIC8vIEdpdmVuIGEgYmFzZSBjb2xvciBhbmQgYSBsaXN0IG9mIHBvc3NpYmxlIGZvcmVncm91bmQgb3IgYmFja2dyb3VuZFxuICAgIC8vIGNvbG9ycyBmb3IgdGhhdCBiYXNlLCByZXR1cm5zIHRoZSBtb3N0IHJlYWRhYmxlIGNvbG9yLlxuICAgIC8vICpFeGFtcGxlKlxuICAgIC8vICAgIHRpbnljb2xvci5tb3N0UmVhZGFibGUoXCIjMTIzXCIsIFtcIiNmZmZcIiwgXCIjMDAwXCJdKSA9PiBcIiMwMDBcIlxuICAgIHRpbnljb2xvci5tb3N0UmVhZGFibGUgPSBmdW5jdGlvbihiYXNlQ29sb3IsIGNvbG9yTGlzdCkge1xuICAgICAgICB2YXIgYmVzdENvbG9yID0gbnVsbDtcbiAgICAgICAgdmFyIGJlc3RTY29yZSA9IDA7XG4gICAgICAgIHZhciBiZXN0SXNSZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCBjb2xvckxpc3QubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgLy8gV2Ugbm9ybWFsaXplIGJvdGggYXJvdW5kIHRoZSBcImFjY2VwdGFibGVcIiBicmVha2luZyBwb2ludCxcbiAgICAgICAgICAgIC8vIGJ1dCByYW5rIGJyaWdodG5lc3MgY29uc3RyYXN0IGhpZ2hlciB0aGFuIGh1ZS5cblxuICAgICAgICAgICAgdmFyIHJlYWRhYmlsaXR5ID0gdGlueWNvbG9yLnJlYWRhYmlsaXR5KGJhc2VDb2xvciwgY29sb3JMaXN0W2ldKTtcbiAgICAgICAgICAgIHZhciByZWFkYWJsZSA9IHJlYWRhYmlsaXR5LmJyaWdodG5lc3MgPiAxMjUgJiYgcmVhZGFiaWxpdHkuY29sb3IgPiA1MDA7XG4gICAgICAgICAgICB2YXIgc2NvcmUgPSAzICogKHJlYWRhYmlsaXR5LmJyaWdodG5lc3MgLyAxMjUpICsgKHJlYWRhYmlsaXR5LmNvbG9yIC8gNTAwKTtcblxuICAgICAgICAgICAgaWYgKChyZWFkYWJsZSAmJiAhIGJlc3RJc1JlYWRhYmxlKSB8fFxuICAgICAgICAgICAgICAgIChyZWFkYWJsZSAmJiBiZXN0SXNSZWFkYWJsZSAmJiBzY29yZSA+IGJlc3RTY29yZSkgfHxcbiAgICAgICAgICAgICAgICAoKCEgcmVhZGFibGUpICYmICghIGJlc3RJc1JlYWRhYmxlKSAmJiBzY29yZSA+IGJlc3RTY29yZSkpIHtcbiAgICAgICAgICAgICAgICBiZXN0SXNSZWFkYWJsZSA9IHJlYWRhYmxlO1xuICAgICAgICAgICAgICAgIGJlc3RTY29yZSA9IHNjb3JlO1xuICAgICAgICAgICAgICAgIGJlc3RDb2xvciA9IHRpbnljb2xvcihjb2xvckxpc3RbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0Q29sb3I7XG4gICAgfTtcblxuXG4gICAgLy8gQmlnIExpc3Qgb2YgQ29sb3JzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtY29sb3IvI3N2Zy1jb2xvcj5cbiAgICB2YXIgbmFtZXMgPSB0aW55Y29sb3IubmFtZXMgPSB7XG4gICAgICAgIGFsaWNlYmx1ZTogXCJmMGY4ZmZcIixcbiAgICAgICAgYW50aXF1ZXdoaXRlOiBcImZhZWJkN1wiLFxuICAgICAgICBhcXVhOiBcIjBmZlwiLFxuICAgICAgICBhcXVhbWFyaW5lOiBcIjdmZmZkNFwiLFxuICAgICAgICBhenVyZTogXCJmMGZmZmZcIixcbiAgICAgICAgYmVpZ2U6IFwiZjVmNWRjXCIsXG4gICAgICAgIGJpc3F1ZTogXCJmZmU0YzRcIixcbiAgICAgICAgYmxhY2s6IFwiMDAwXCIsXG4gICAgICAgIGJsYW5jaGVkYWxtb25kOiBcImZmZWJjZFwiLFxuICAgICAgICBibHVlOiBcIjAwZlwiLFxuICAgICAgICBibHVldmlvbGV0OiBcIjhhMmJlMlwiLFxuICAgICAgICBicm93bjogXCJhNTJhMmFcIixcbiAgICAgICAgYnVybHl3b29kOiBcImRlYjg4N1wiLFxuICAgICAgICBidXJudHNpZW5uYTogXCJlYTdlNWRcIixcbiAgICAgICAgY2FkZXRibHVlOiBcIjVmOWVhMFwiLFxuICAgICAgICBjaGFydHJldXNlOiBcIjdmZmYwMFwiLFxuICAgICAgICBjaG9jb2xhdGU6IFwiZDI2OTFlXCIsXG4gICAgICAgIGNvcmFsOiBcImZmN2Y1MFwiLFxuICAgICAgICBjb3JuZmxvd2VyYmx1ZTogXCI2NDk1ZWRcIixcbiAgICAgICAgY29ybnNpbGs6IFwiZmZmOGRjXCIsXG4gICAgICAgIGNyaW1zb246IFwiZGMxNDNjXCIsXG4gICAgICAgIGN5YW46IFwiMGZmXCIsXG4gICAgICAgIGRhcmtibHVlOiBcIjAwMDA4YlwiLFxuICAgICAgICBkYXJrY3lhbjogXCIwMDhiOGJcIixcbiAgICAgICAgZGFya2dvbGRlbnJvZDogXCJiODg2MGJcIixcbiAgICAgICAgZGFya2dyYXk6IFwiYTlhOWE5XCIsXG4gICAgICAgIGRhcmtncmVlbjogXCIwMDY0MDBcIixcbiAgICAgICAgZGFya2dyZXk6IFwiYTlhOWE5XCIsXG4gICAgICAgIGRhcmtraGFraTogXCJiZGI3NmJcIixcbiAgICAgICAgZGFya21hZ2VudGE6IFwiOGIwMDhiXCIsXG4gICAgICAgIGRhcmtvbGl2ZWdyZWVuOiBcIjU1NmIyZlwiLFxuICAgICAgICBkYXJrb3JhbmdlOiBcImZmOGMwMFwiLFxuICAgICAgICBkYXJrb3JjaGlkOiBcIjk5MzJjY1wiLFxuICAgICAgICBkYXJrcmVkOiBcIjhiMDAwMFwiLFxuICAgICAgICBkYXJrc2FsbW9uOiBcImU5OTY3YVwiLFxuICAgICAgICBkYXJrc2VhZ3JlZW46IFwiOGZiYzhmXCIsXG4gICAgICAgIGRhcmtzbGF0ZWJsdWU6IFwiNDgzZDhiXCIsXG4gICAgICAgIGRhcmtzbGF0ZWdyYXk6IFwiMmY0ZjRmXCIsXG4gICAgICAgIGRhcmtzbGF0ZWdyZXk6IFwiMmY0ZjRmXCIsXG4gICAgICAgIGRhcmt0dXJxdW9pc2U6IFwiMDBjZWQxXCIsXG4gICAgICAgIGRhcmt2aW9sZXQ6IFwiOTQwMGQzXCIsXG4gICAgICAgIGRlZXBwaW5rOiBcImZmMTQ5M1wiLFxuICAgICAgICBkZWVwc2t5Ymx1ZTogXCIwMGJmZmZcIixcbiAgICAgICAgZGltZ3JheTogXCI2OTY5NjlcIixcbiAgICAgICAgZGltZ3JleTogXCI2OTY5NjlcIixcbiAgICAgICAgZG9kZ2VyYmx1ZTogXCIxZTkwZmZcIixcbiAgICAgICAgZmlyZWJyaWNrOiBcImIyMjIyMlwiLFxuICAgICAgICBmbG9yYWx3aGl0ZTogXCJmZmZhZjBcIixcbiAgICAgICAgZm9yZXN0Z3JlZW46IFwiMjI4YjIyXCIsXG4gICAgICAgIGZ1Y2hzaWE6IFwiZjBmXCIsXG4gICAgICAgIGdhaW5zYm9ybzogXCJkY2RjZGNcIixcbiAgICAgICAgZ2hvc3R3aGl0ZTogXCJmOGY4ZmZcIixcbiAgICAgICAgZ29sZDogXCJmZmQ3MDBcIixcbiAgICAgICAgZ29sZGVucm9kOiBcImRhYTUyMFwiLFxuICAgICAgICBncmF5OiBcIjgwODA4MFwiLFxuICAgICAgICBncmVlbjogXCIwMDgwMDBcIixcbiAgICAgICAgZ3JlZW55ZWxsb3c6IFwiYWRmZjJmXCIsXG4gICAgICAgIGdyZXk6IFwiODA4MDgwXCIsXG4gICAgICAgIGhvbmV5ZGV3OiBcImYwZmZmMFwiLFxuICAgICAgICBob3RwaW5rOiBcImZmNjliNFwiLFxuICAgICAgICBpbmRpYW5yZWQ6IFwiY2Q1YzVjXCIsXG4gICAgICAgIGluZGlnbzogXCI0YjAwODJcIixcbiAgICAgICAgaXZvcnk6IFwiZmZmZmYwXCIsXG4gICAgICAgIGtoYWtpOiBcImYwZTY4Y1wiLFxuICAgICAgICBsYXZlbmRlcjogXCJlNmU2ZmFcIixcbiAgICAgICAgbGF2ZW5kZXJibHVzaDogXCJmZmYwZjVcIixcbiAgICAgICAgbGF3bmdyZWVuOiBcIjdjZmMwMFwiLFxuICAgICAgICBsZW1vbmNoaWZmb246IFwiZmZmYWNkXCIsXG4gICAgICAgIGxpZ2h0Ymx1ZTogXCJhZGQ4ZTZcIixcbiAgICAgICAgbGlnaHRjb3JhbDogXCJmMDgwODBcIixcbiAgICAgICAgbGlnaHRjeWFuOiBcImUwZmZmZlwiLFxuICAgICAgICBsaWdodGdvbGRlbnJvZHllbGxvdzogXCJmYWZhZDJcIixcbiAgICAgICAgbGlnaHRncmF5OiBcImQzZDNkM1wiLFxuICAgICAgICBsaWdodGdyZWVuOiBcIjkwZWU5MFwiLFxuICAgICAgICBsaWdodGdyZXk6IFwiZDNkM2QzXCIsXG4gICAgICAgIGxpZ2h0cGluazogXCJmZmI2YzFcIixcbiAgICAgICAgbGlnaHRzYWxtb246IFwiZmZhMDdhXCIsXG4gICAgICAgIGxpZ2h0c2VhZ3JlZW46IFwiMjBiMmFhXCIsXG4gICAgICAgIGxpZ2h0c2t5Ymx1ZTogXCI4N2NlZmFcIixcbiAgICAgICAgbGlnaHRzbGF0ZWdyYXk6IFwiNzg5XCIsXG4gICAgICAgIGxpZ2h0c2xhdGVncmV5OiBcIjc4OVwiLFxuICAgICAgICBsaWdodHN0ZWVsYmx1ZTogXCJiMGM0ZGVcIixcbiAgICAgICAgbGlnaHR5ZWxsb3c6IFwiZmZmZmUwXCIsXG4gICAgICAgIGxpbWU6IFwiMGYwXCIsXG4gICAgICAgIGxpbWVncmVlbjogXCIzMmNkMzJcIixcbiAgICAgICAgbGluZW46IFwiZmFmMGU2XCIsXG4gICAgICAgIG1hZ2VudGE6IFwiZjBmXCIsXG4gICAgICAgIG1hcm9vbjogXCI4MDAwMDBcIixcbiAgICAgICAgbWVkaXVtYXF1YW1hcmluZTogXCI2NmNkYWFcIixcbiAgICAgICAgbWVkaXVtYmx1ZTogXCIwMDAwY2RcIixcbiAgICAgICAgbWVkaXVtb3JjaGlkOiBcImJhNTVkM1wiLFxuICAgICAgICBtZWRpdW1wdXJwbGU6IFwiOTM3MGRiXCIsXG4gICAgICAgIG1lZGl1bXNlYWdyZWVuOiBcIjNjYjM3MVwiLFxuICAgICAgICBtZWRpdW1zbGF0ZWJsdWU6IFwiN2I2OGVlXCIsXG4gICAgICAgIG1lZGl1bXNwcmluZ2dyZWVuOiBcIjAwZmE5YVwiLFxuICAgICAgICBtZWRpdW10dXJxdW9pc2U6IFwiNDhkMWNjXCIsXG4gICAgICAgIG1lZGl1bXZpb2xldHJlZDogXCJjNzE1ODVcIixcbiAgICAgICAgbWlkbmlnaHRibHVlOiBcIjE5MTk3MFwiLFxuICAgICAgICBtaW50Y3JlYW06IFwiZjVmZmZhXCIsXG4gICAgICAgIG1pc3R5cm9zZTogXCJmZmU0ZTFcIixcbiAgICAgICAgbW9jY2FzaW46IFwiZmZlNGI1XCIsXG4gICAgICAgIG5hdmFqb3doaXRlOiBcImZmZGVhZFwiLFxuICAgICAgICBuYXZ5OiBcIjAwMDA4MFwiLFxuICAgICAgICBvbGRsYWNlOiBcImZkZjVlNlwiLFxuICAgICAgICBvbGl2ZTogXCI4MDgwMDBcIixcbiAgICAgICAgb2xpdmVkcmFiOiBcIjZiOGUyM1wiLFxuICAgICAgICBvcmFuZ2U6IFwiZmZhNTAwXCIsXG4gICAgICAgIG9yYW5nZXJlZDogXCJmZjQ1MDBcIixcbiAgICAgICAgb3JjaGlkOiBcImRhNzBkNlwiLFxuICAgICAgICBwYWxlZ29sZGVucm9kOiBcImVlZThhYVwiLFxuICAgICAgICBwYWxlZ3JlZW46IFwiOThmYjk4XCIsXG4gICAgICAgIHBhbGV0dXJxdW9pc2U6IFwiYWZlZWVlXCIsXG4gICAgICAgIHBhbGV2aW9sZXRyZWQ6IFwiZGI3MDkzXCIsXG4gICAgICAgIHBhcGF5YXdoaXA6IFwiZmZlZmQ1XCIsXG4gICAgICAgIHBlYWNocHVmZjogXCJmZmRhYjlcIixcbiAgICAgICAgcGVydTogXCJjZDg1M2ZcIixcbiAgICAgICAgcGluazogXCJmZmMwY2JcIixcbiAgICAgICAgcGx1bTogXCJkZGEwZGRcIixcbiAgICAgICAgcG93ZGVyYmx1ZTogXCJiMGUwZTZcIixcbiAgICAgICAgcHVycGxlOiBcIjgwMDA4MFwiLFxuICAgICAgICByZWJlY2NhcHVycGxlOiBcIjY2MzM5OVwiLFxuICAgICAgICByZWQ6IFwiZjAwXCIsXG4gICAgICAgIHJvc3licm93bjogXCJiYzhmOGZcIixcbiAgICAgICAgcm95YWxibHVlOiBcIjQxNjllMVwiLFxuICAgICAgICBzYWRkbGVicm93bjogXCI4YjQ1MTNcIixcbiAgICAgICAgc2FsbW9uOiBcImZhODA3MlwiLFxuICAgICAgICBzYW5keWJyb3duOiBcImY0YTQ2MFwiLFxuICAgICAgICBzZWFncmVlbjogXCIyZThiNTdcIixcbiAgICAgICAgc2Vhc2hlbGw6IFwiZmZmNWVlXCIsXG4gICAgICAgIHNpZW5uYTogXCJhMDUyMmRcIixcbiAgICAgICAgc2lsdmVyOiBcImMwYzBjMFwiLFxuICAgICAgICBza3libHVlOiBcIjg3Y2VlYlwiLFxuICAgICAgICBzbGF0ZWJsdWU6IFwiNmE1YWNkXCIsXG4gICAgICAgIHNsYXRlZ3JheTogXCI3MDgwOTBcIixcbiAgICAgICAgc2xhdGVncmV5OiBcIjcwODA5MFwiLFxuICAgICAgICBzbm93OiBcImZmZmFmYVwiLFxuICAgICAgICBzcHJpbmdncmVlbjogXCIwMGZmN2ZcIixcbiAgICAgICAgc3RlZWxibHVlOiBcIjQ2ODJiNFwiLFxuICAgICAgICB0YW46IFwiZDJiNDhjXCIsXG4gICAgICAgIHRlYWw6IFwiMDA4MDgwXCIsXG4gICAgICAgIHRoaXN0bGU6IFwiZDhiZmQ4XCIsXG4gICAgICAgIHRvbWF0bzogXCJmZjYzNDdcIixcbiAgICAgICAgdHVycXVvaXNlOiBcIjQwZTBkMFwiLFxuICAgICAgICB2aW9sZXQ6IFwiZWU4MmVlXCIsXG4gICAgICAgIHdoZWF0OiBcImY1ZGViM1wiLFxuICAgICAgICB3aGl0ZTogXCJmZmZcIixcbiAgICAgICAgd2hpdGVzbW9rZTogXCJmNWY1ZjVcIixcbiAgICAgICAgeWVsbG93OiBcImZmMFwiLFxuICAgICAgICB5ZWxsb3dncmVlbjogXCI5YWNkMzJcIlxuICAgIH07XG5cbiAgICAvLyBNYWtlIGl0IGVhc3kgdG8gYWNjZXNzIGNvbG9ycyB2aWEgYGhleE5hbWVzW2hleF1gXG4gICAgdmFyIGhleE5hbWVzID0gdGlueWNvbG9yLmhleE5hbWVzID0gZmxpcChuYW1lcyk7XG5cblxuICAgIC8vIFV0aWxpdGllc1xuICAgIC8vIC0tLS0tLS0tLVxuXG4gICAgLy8gYHsgJ25hbWUxJzogJ3ZhbDEnIH1gIGJlY29tZXMgYHsgJ3ZhbDEnOiAnbmFtZTEnIH1gXG4gICAgZnVuY3Rpb24gZmxpcChvKSB7XG4gICAgICAgIHZhciBmbGlwcGVkID0geyB9O1xuICAgICAgICBmb3IgKHZhciBpIGluIG8pIHtcbiAgICAgICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgZmxpcHBlZFtvW2ldXSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZsaXBwZWQ7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgdmFsaWQgYWxwaGEgdmFsdWUgWzAsMV0gd2l0aCBhbGwgaW52YWxpZCB2YWx1ZXMgYmVpbmcgc2V0IHRvIDFcbiAgICBmdW5jdGlvbiBib3VuZEFscGhhKGEpIHtcbiAgICAgICAgYSA9IHBhcnNlRmxvYXQoYSk7XG5cbiAgICAgICAgaWYgKGlzTmFOKGEpIHx8IGEgPCAwIHx8IGEgPiAxKSB7XG4gICAgICAgICAgICBhID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIC8vIFRha2UgaW5wdXQgZnJvbSBbMCwgbl0gYW5kIHJldHVybiBpdCBhcyBbMCwgMV1cbiAgICBmdW5jdGlvbiBib3VuZDAxKG4sIG1heCkge1xuICAgICAgICBpZiAoaXNPbmVQb2ludFplcm8obikpIHsgbiA9IFwiMTAwJVwiOyB9XG5cbiAgICAgICAgdmFyIHByb2Nlc3NQZXJjZW50ID0gaXNQZXJjZW50YWdlKG4pO1xuICAgICAgICBuID0gbWF0aE1pbihtYXgsIG1hdGhNYXgoMCwgcGFyc2VGbG9hdChuKSkpO1xuXG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgY29udmVydCBwZXJjZW50YWdlIGludG8gbnVtYmVyXG4gICAgICAgIGlmIChwcm9jZXNzUGVyY2VudCkge1xuICAgICAgICAgICAgbiA9IHBhcnNlSW50KG4gKiBtYXgsIDEwKSAvIDEwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBmbG9hdGluZyBwb2ludCByb3VuZGluZyBlcnJvcnNcbiAgICAgICAgaWYgKChtYXRoLmFicyhuIC0gbWF4KSA8IDAuMDAwMDAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb252ZXJ0IGludG8gWzAsIDFdIHJhbmdlIGlmIGl0IGlzbid0IGFscmVhZHlcbiAgICAgICAgcmV0dXJuIChuICUgbWF4KSAvIHBhcnNlRmxvYXQobWF4KTtcbiAgICB9XG5cbiAgICAvLyBGb3JjZSBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDFcbiAgICBmdW5jdGlvbiBjbGFtcDAxKHZhbCkge1xuICAgICAgICByZXR1cm4gbWF0aE1pbigxLCBtYXRoTWF4KDAsIHZhbCkpO1xuICAgIH1cblxuICAgIC8vIFBhcnNlIGEgYmFzZS0xNiBoZXggdmFsdWUgaW50byBhIGJhc2UtMTAgaW50ZWdlclxuICAgIGZ1bmN0aW9uIHBhcnNlSW50RnJvbUhleCh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbCwgMTYpO1xuICAgIH1cblxuICAgIC8vIE5lZWQgdG8gaGFuZGxlIDEuMCBhcyAxMDAlLCBzaW5jZSBvbmNlIGl0IGlzIGEgbnVtYmVyLCB0aGVyZSBpcyBubyBkaWZmZXJlbmNlIGJldHdlZW4gaXQgYW5kIDFcbiAgICAvLyA8aHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83NDIyMDcyL2phdmFzY3JpcHQtaG93LXRvLWRldGVjdC1udW1iZXItYXMtYS1kZWNpbWFsLWluY2x1ZGluZy0xLTA+XG4gICAgZnVuY3Rpb24gaXNPbmVQb2ludFplcm8obikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG4gPT0gXCJzdHJpbmdcIiAmJiBuLmluZGV4T2YoJy4nKSAhPSAtMSAmJiBwYXJzZUZsb2F0KG4pID09PSAxO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiBzdHJpbmcgcGFzc2VkIGluIGlzIGEgcGVyY2VudGFnZVxuICAgIGZ1bmN0aW9uIGlzUGVyY2VudGFnZShuKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgbiA9PT0gXCJzdHJpbmdcIiAmJiBuLmluZGV4T2YoJyUnKSAhPSAtMTtcbiAgICB9XG5cbiAgICAvLyBGb3JjZSBhIGhleCB2YWx1ZSB0byBoYXZlIDIgY2hhcmFjdGVyc1xuICAgIGZ1bmN0aW9uIHBhZDIoYykge1xuICAgICAgICByZXR1cm4gYy5sZW5ndGggPT0gMSA/ICcwJyArIGMgOiAnJyArIGM7XG4gICAgfVxuXG4gICAgLy8gUmVwbGFjZSBhIGRlY2ltYWwgd2l0aCBpdCdzIHBlcmNlbnRhZ2UgdmFsdWVcbiAgICBmdW5jdGlvbiBjb252ZXJ0VG9QZXJjZW50YWdlKG4pIHtcbiAgICAgICAgaWYgKG4gPD0gMSkge1xuICAgICAgICAgICAgbiA9IChuICogMTAwKSArIFwiJVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuXG4gICAgLy8gQ29udmVydHMgYSBkZWNpbWFsIHRvIGEgaGV4IHZhbHVlXG4gICAgZnVuY3Rpb24gY29udmVydERlY2ltYWxUb0hleChkKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoZCkgKiAyNTUpLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gICAgLy8gQ29udmVydHMgYSBoZXggdmFsdWUgdG8gYSBkZWNpbWFsXG4gICAgZnVuY3Rpb24gY29udmVydEhleFRvRGVjaW1hbChoKSB7XG4gICAgICAgIHJldHVybiAocGFyc2VJbnRGcm9tSGV4KGgpIC8gMjU1KTtcbiAgICB9XG5cbiAgICB2YXIgbWF0Y2hlcnMgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdmFsdWVzLyNpbnRlZ2Vycz5cbiAgICAgICAgdmFyIENTU19JTlRFR0VSID0gXCJbLVxcXFwrXT9cXFxcZCslP1wiO1xuXG4gICAgICAgIC8vIDxodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXZhbHVlcy8jbnVtYmVyLXZhbHVlPlxuICAgICAgICB2YXIgQ1NTX05VTUJFUiA9IFwiWy1cXFxcK10/XFxcXGQqXFxcXC5cXFxcZCslP1wiO1xuXG4gICAgICAgIC8vIEFsbG93IHBvc2l0aXZlL25lZ2F0aXZlIGludGVnZXIvbnVtYmVyLiAgRG9uJ3QgY2FwdHVyZSB0aGUgZWl0aGVyL29yLCBqdXN0IHRoZSBlbnRpcmUgb3V0Y29tZS5cbiAgICAgICAgdmFyIENTU19VTklUID0gXCIoPzpcIiArIENTU19OVU1CRVIgKyBcIil8KD86XCIgKyBDU1NfSU5URUdFUiArIFwiKVwiO1xuXG4gICAgICAgIC8vIEFjdHVhbCBtYXRjaGluZy5cbiAgICAgICAgLy8gUGFyZW50aGVzZXMgYW5kIGNvbW1hcyBhcmUgb3B0aW9uYWwsIGJ1dCBub3QgcmVxdWlyZWQuXG4gICAgICAgIC8vIFdoaXRlc3BhY2UgY2FuIHRha2UgdGhlIHBsYWNlIG9mIGNvbW1hcyBvciBvcGVuaW5nIHBhcmVuXG4gICAgICAgIHZhciBQRVJNSVNTSVZFX01BVENIMyA9IFwiW1xcXFxzfFxcXFwoXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVxcXFxzKlxcXFwpP1wiO1xuICAgICAgICB2YXIgUEVSTUlTU0lWRV9NQVRDSDQgPSBcIltcXFxcc3xcXFxcKF0rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilcXFxccypcXFxcKT9cIjtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmdiOiBuZXcgUmVnRXhwKFwicmdiXCIgKyBQRVJNSVNTSVZFX01BVENIMyksXG4gICAgICAgICAgICByZ2JhOiBuZXcgUmVnRXhwKFwicmdiYVwiICsgUEVSTUlTU0lWRV9NQVRDSDQpLFxuICAgICAgICAgICAgaHNsOiBuZXcgUmVnRXhwKFwiaHNsXCIgKyBQRVJNSVNTSVZFX01BVENIMyksXG4gICAgICAgICAgICBoc2xhOiBuZXcgUmVnRXhwKFwiaHNsYVwiICsgUEVSTUlTU0lWRV9NQVRDSDQpLFxuICAgICAgICAgICAgaHN2OiBuZXcgUmVnRXhwKFwiaHN2XCIgKyBQRVJNSVNTSVZFX01BVENIMyksXG4gICAgICAgICAgICBoc3ZhOiBuZXcgUmVnRXhwKFwiaHN2YVwiICsgUEVSTUlTU0lWRV9NQVRDSDQpLFxuICAgICAgICAgICAgaGV4MzogL14oWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkkLyxcbiAgICAgICAgICAgIGhleDY6IC9eKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pJC8sXG4gICAgICAgICAgICBoZXg4OiAvXihbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkkL1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICAvLyBgc3RyaW5nSW5wdXRUb09iamVjdGBcbiAgICAvLyBQZXJtaXNzaXZlIHN0cmluZyBwYXJzaW5nLiAgVGFrZSBpbiBhIG51bWJlciBvZiBmb3JtYXRzLCBhbmQgb3V0cHV0IGFuIG9iamVjdFxuICAgIC8vIGJhc2VkIG9uIGRldGVjdGVkIGZvcm1hdC4gIFJldHVybnMgYHsgciwgZywgYiB9YCBvciBgeyBoLCBzLCBsIH1gIG9yIGB7IGgsIHMsIHZ9YFxuICAgIGZ1bmN0aW9uIHN0cmluZ0lucHV0VG9PYmplY3QoY29sb3IpIHtcblxuICAgICAgICBjb2xvciA9IGNvbG9yLnJlcGxhY2UodHJpbUxlZnQsJycpLnJlcGxhY2UodHJpbVJpZ2h0LCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG5hbWVkID0gZmFsc2U7XG4gICAgICAgIGlmIChuYW1lc1tjb2xvcl0pIHtcbiAgICAgICAgICAgIGNvbG9yID0gbmFtZXNbY29sb3JdO1xuICAgICAgICAgICAgbmFtZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbG9yID09ICd0cmFuc3BhcmVudCcpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IDAsIGZvcm1hdDogXCJuYW1lXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRyeSB0byBtYXRjaCBzdHJpbmcgaW5wdXQgdXNpbmcgcmVndWxhciBleHByZXNzaW9ucy5cbiAgICAgICAgLy8gS2VlcCBtb3N0IG9mIHRoZSBudW1iZXIgYm91bmRpbmcgb3V0IG9mIHRoaXMgZnVuY3Rpb24gLSBkb24ndCB3b3JyeSBhYm91dCBbMCwxXSBvciBbMCwxMDBdIG9yIFswLDM2MF1cbiAgICAgICAgLy8gSnVzdCByZXR1cm4gYW4gb2JqZWN0IGFuZCBsZXQgdGhlIGNvbnZlcnNpb24gZnVuY3Rpb25zIGhhbmRsZSB0aGF0LlxuICAgICAgICAvLyBUaGlzIHdheSB0aGUgcmVzdWx0IHdpbGwgYmUgdGhlIHNhbWUgd2hldGhlciB0aGUgdGlueWNvbG9yIGlzIGluaXRpYWxpemVkIHdpdGggc3RyaW5nIG9yIG9iamVjdC5cbiAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMucmdiLmV4ZWMoY29sb3IpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5yZ2JhLmV4ZWMoY29sb3IpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXSwgYTogbWF0Y2hbNF0gfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaHNsLmV4ZWMoY29sb3IpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCBsOiBtYXRjaFszXSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oc2xhLmV4ZWMoY29sb3IpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCBsOiBtYXRjaFszXSwgYTogbWF0Y2hbNF0gfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaHN2LmV4ZWMoY29sb3IpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCB2OiBtYXRjaFszXSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oc3ZhLmV4ZWMoY29sb3IpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCB2OiBtYXRjaFszXSwgYTogbWF0Y2hbNF0gfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaGV4OC5leGVjKGNvbG9yKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYTogY29udmVydEhleFRvRGVjaW1hbChtYXRjaFsxXSksXG4gICAgICAgICAgICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdKSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10pLFxuICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50RnJvbUhleChtYXRjaFs0XSksXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/IFwibmFtZVwiIDogXCJoZXg4XCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChtYXRjaCA9IG1hdGNoZXJzLmhleDYuZXhlYyhjb2xvcikpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50RnJvbUhleChtYXRjaFsxXSksXG4gICAgICAgICAgICAgICAgZzogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdKSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10pLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogbmFtZWQgPyBcIm5hbWVcIiA6IFwiaGV4XCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChtYXRjaCA9IG1hdGNoZXJzLmhleDMuZXhlYyhjb2xvcikpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50RnJvbUhleChtYXRjaFsxXSArICcnICsgbWF0Y2hbMV0pLFxuICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50RnJvbUhleChtYXRjaFsyXSArICcnICsgbWF0Y2hbMl0pLFxuICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50RnJvbUhleChtYXRjaFszXSArICcnICsgbWF0Y2hbM10pLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogbmFtZWQgPyBcIm5hbWVcIiA6IFwiaGV4XCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgd2luZG93LnRpbnljb2xvciA9IHRpbnljb2xvcjtcbiAgICB9KSgpO1xuXG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkLmZuLnNwZWN0cnVtLmxvYWQpIHtcbiAgICAgICAgICAgICQuZm4uc3BlY3RydW0ucHJvY2Vzc05hdGl2ZUNvbG9ySW5wdXRzKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QganF1ZXJ5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImpxdWVyeVwiKSk7XG5jb25zdCBtYXRlcmlhbGl6ZV9jc3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwibWF0ZXJpYWxpemUtY3NzXCIpKTtcbnJlcXVpcmUoXCJzcGVjdHJ1bS1jb2xvcnBpY2tlclwiKTtcbmNvbnN0IGFuYWx5dGljc18xID0gcmVxdWlyZShcIi4vdXRpbHMvYW5hbHl0aWNzXCIpO1xuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi91dGlscy9jb25zdGFudHNcIik7XG5jb25zdCBkZWZhdWx0X2ljb25zXzEgPSByZXF1aXJlKFwiLi91dGlscy9kZWZhdWx0LWljb25zXCIpO1xuY29uc3QgZGVmYXVsdF90aGVtZXNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2RlZmF1bHQtdGhlbWVzXCIpO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi91dGlscy9kb21cIik7XG5jb25zdCB0aGVtZV9tb2RlbF8xID0gcmVxdWlyZShcIi4vdXRpbHMvdGhlbWUtbW9kZWxcIik7XG5jb25zdCBzY2hvb2xvZ3lQbHVzTG9nb0ltYWdlVXJsID0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKFwiL2ltZ3Mvc2Nob29sb2d5LXBsdXMtd2lkZS5zdmdcIik7XG5jb25zdCBzY2hvb2xvZ3lMb2dvSW1hZ2VVcmwgPSBcImh0dHBzOi8vdWkuc2Nob29sb2d5LmNvbS9kZXNpZ24tc3lzdGVtL2Fzc2V0cy9zY2hvb2xvZ3ktbG9nby1ob3Jpem9udGFsLXdoaXRlLjg4NGZiZTU1OWM2NmUwNmQyOGM1Y2ZjYmQ0MDQ0ZjBlLnN2Z1wiO1xuY29uc3QgbGF1c2RMZWdhY3lJbWFnZVVybCA9IGNocm9tZS5ydW50aW1lLmdldFVSTChcIi9pbWdzL2xhdXNkLWxlZ2FjeS5wbmdcIik7XG5jb25zdCBsYXVzZDIwMTlJbWFnZVVybCA9IGNocm9tZS5ydW50aW1lLmdldFVSTChcIi9pbWdzL2xhdXNkLTIwMTkucG5nXCIpO1xuY29uc3QgbGF1c2QyMDIySW1hZ2VVcmwgPSBjaHJvbWUucnVudGltZS5nZXRVUkwoXCIvaW1ncy9sYXVzZC0yMDIyLnBuZ1wiKTtcbmNvbnN0IENVUlJFTlRfVkVSU0lPTiA9IHRoZW1lX21vZGVsXzEuU2Nob29sb2d5VGhlbWUuQ1VSUkVOVF9WRVJTSU9OO1xuY29uc3QgcGxhY2Vob2xkZXJVcmwgPSBcImh0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8yMDB4NTA/dGV4dD1TY2hvb2wrTG9nb1wiO1xudmFyIGRlZmF1bHREb21haW4gPSBcImFwcC5zY2hvb2xvZ3kuY29tXCI7XG52YXIgX19zdG9yYWdlID0ge307XG5mdW5jdGlvbiBsb2FkKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgX19zdG9yYWdlID0geWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQobnVsbCk7XG4gICAgICAgIHlpZWxkICgwLCBhbmFseXRpY3NfMS5pbml0aWFsaXplQW5hbHl0aWNzKSh7XG4gICAgICAgICAgICBkb2N1bWVudENvbnRleHQ6IHRydWUsXG4gICAgICAgICAgICBpc0FuYWx5dGljc0VuYWJsZWQ6ICgwLCBkb21fMS5nZXRCcm93c2VyKSgpICE9PSBcIkZpcmVmb3hcIiAmJiBfX3N0b3JhZ2UuYW5hbHl0aWNzICE9PSBcImRpc2FibGVkXCIsXG4gICAgICAgICAgICBzZWxlY3RlZFRoZW1lOiAoX2EgPSBfX3N0b3JhZ2UudGhlbWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFwiPHVuc2V0PlwiLFxuICAgICAgICAgICAgc2VsZWN0ZWRCZXRhOiAoX2IgPSBfX3N0b3JhZ2UuYmV0YSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogXCI8dW5zZXQ+XCIsXG4gICAgICAgICAgICBjdXJyZW50VmVyc2lvbjogY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS52ZXJzaW9uLFxuICAgICAgICAgICAgbmV3VmVyc2lvbjogKF9jID0gX19zdG9yYWdlLm5ld1ZlcnNpb24pICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IFwiPHVuc2V0PlwiLFxuICAgICAgICAgICAgcmFuZG9tVXNlcklkOiB5aWVsZCAoMCwgYW5hbHl0aWNzXzEuZ2V0QW5hbHl0aWNzVXNlcklkKSgpLFxuICAgICAgICAgICAgdGhlbWVJc01vZGVybjogKF9kID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcIm1vZGVyblwiKSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogXCJmYWxzZVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgZGVmYXVsdERvbWFpbiA9IF9fc3RvcmFnZS5kZWZhdWx0RG9tYWluIHx8IFwiYXBwLnNjaG9vbG9neS5jb21cIjtcbiAgICAgICAgaWYgKGlzTEFVU0QoKSkge1xuICAgICAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShcImxhdXNkLXZpc2libGVcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgICAgICgwLCBkb21fMS5zZXRDU1NWYXJpYWJsZSkoXCJsYXVzZC1oaWRkZW5cIiwgXCJub25lXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShcImxhdXNkLXZpc2libGVcIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShcImxhdXNkLWhpZGRlblwiLCBcImJsb2NrXCIpO1xuICAgICAgICB9XG4gICAgICAgIGpxdWVyeV8xLmRlZmF1bHQuZm4ucm91bmRTbGlkZXIucHJvdG90eXBlLl9pbnZlcnRSYW5nZSA9IHRydWU7XG4gICAgICAgICgwLCBqcXVlcnlfMS5kZWZhdWx0KShcIiN0aGVtZS1odWVcIikuc2xpZGVyKHtcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMzU5LFxuICAgICAgICAgICAgc2xpZGU6IGh1ZVNsaWRlckV2ZW50LFxuICAgICAgICAgICAgc3RvcDogaHVlU2xpZGVyRXZlbnQsXG4gICAgICAgICAgICBjaGFuZ2U6IGh1ZVNsaWRlckV2ZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgKDAsIGpxdWVyeV8xLmRlZmF1bHQpKGNvbG9yUmFpbmJvd0h1ZVZhbHVlKS5zbGlkZXIoe1xuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAzNTksXG4gICAgICAgICAgICBzbGlkZTogaHVlU2xpZGVyRXZlbnQsXG4gICAgICAgICAgICBzdG9wOiBodWVTbGlkZXJFdmVudCxcbiAgICAgICAgICAgIGNoYW5nZTogaHVlU2xpZGVyRXZlbnQsXG4gICAgICAgIH0pO1xuICAgICAgICAoMCwganF1ZXJ5XzEuZGVmYXVsdCkoXCIjY29sb3ItcmFpbmJvdy1odWUtcmFuZ2VcIikucm91bmRTbGlkZXIoe1xuICAgICAgICAgICAgc2xpZGVyVHlwZTogXCJyYW5nZVwiLFxuICAgICAgICAgICAgaGFuZGxlU2hhcGU6IFwicm91bmRcIixcbiAgICAgICAgICAgIHdpZHRoOiAxNSxcbiAgICAgICAgICAgIHJhZGl1czogNzUsXG4gICAgICAgICAgICB2YWx1ZTogXCIwLDM1OVwiLFxuICAgICAgICAgICAgbWF4OiAzNTksXG4gICAgICAgICAgICBzdGFydEFuZ2xlOiA5MCxcbiAgICAgICAgICAgIGRyYWc6IGNpcmNsZVJhbmdlU2xpZGVyRXZlbnQsXG4gICAgICAgICAgICBzdG9wOiBjaXJjbGVSYW5nZVNsaWRlckV2ZW50LFxuICAgICAgICAgICAgY2hhbmdlOiBjaXJjbGVSYW5nZVNsaWRlckV2ZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ycy10b29sdGlwXCIpLnN0eWxlLm1hcmdpbiA9IFwiLTE1LjVweCAwIDAgLTMzLjA1NDdweFwiO1xuICAgICAgICAoMCwganF1ZXJ5XzEuZGVmYXVsdCkoXCIjY29sb3ItcmFpbmJvdy1zYXR1cmF0aW9uLXJhbmdlXCIpLnNsaWRlcih7XG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGU6IHJhbmdlU2xpZGVyRXZlbnQsXG4gICAgICAgICAgICBzdG9wOiByYW5nZVNsaWRlckV2ZW50LFxuICAgICAgICAgICAgY2hhbmdlOiByYW5nZVNsaWRlckV2ZW50LFxuICAgICAgICAgICAgdmFsdWVzOiBbMCwgMTAwXSxcbiAgICAgICAgfSk7XG4gICAgICAgICgwLCBqcXVlcnlfMS5kZWZhdWx0KShcIiNjb2xvci1yYWluYm93LWxpZ2h0bmVzcy1yYW5nZVwiKS5zbGlkZXIoe1xuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlOiByYW5nZVNsaWRlckV2ZW50LFxuICAgICAgICAgICAgc3RvcDogcmFuZ2VTbGlkZXJFdmVudCxcbiAgICAgICAgICAgIGNoYW5nZTogcmFuZ2VTbGlkZXJFdmVudCxcbiAgICAgICAgICAgIHZhbHVlczogWzAsIDEwMF0sXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgb25pbnB1dCA9IChlKSA9PiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuZGF0YXNldC5sYWJlbCkudGV4dENvbnRlbnQgPSBlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIGZvciAobGV0IGlucHV0IG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPXJhbmdlXVtkYXRhLWxhYmVsXVwiKSkge1xuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIG9uaW5wdXQpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5wdXQuZGF0YXNldC5sYWJlbCkudGV4dENvbnRlbnQgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCB0IG9mIGRlZmF1bHRfdGhlbWVzXzEuREVGQVVMVF9USEVNRVMpIHtcbiAgICAgICAgICAgIGRlZmF1bHRUaGVtZXMucHVzaCh0Lm5hbWUpO1xuICAgICAgICAgICAgaWYgKCFpc0xBVVNEKCkgJiYgZGVmYXVsdF90aGVtZXNfMS5MQVVTRF9USEVNRVMuaW5jbHVkZXModC5uYW1lKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWxsVGhlbWVzW3QubmFtZV0gPSB0O1xuICAgICAgICB9XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFtcInRoZW1lXCIsIFwidGhlbWVzXCJdLCBzID0+IHtcbiAgICAgICAgICAgIC8vIGRlZmF1bHQgdGhlbWUgaXMgXCJTY2hvb2xvZ3kgUGx1c1wiXG4gICAgICAgICAgICBzLnRoZW1lID0gcy50aGVtZSB8fCBjb25zdGFudHNfMS5ERUZBVUxUX1RIRU1FX05BTUU7XG4gICAgICAgICAgICBmb3IgKGxldCB0IG9mIHMudGhlbWVzIHx8IFtdKSB7XG4gICAgICAgICAgICAgICAgYWxsVGhlbWVzW3QubmFtZV0gPSB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgdCBpbiBhbGxUaGVtZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGhlbWVJdGVtID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKFwiYVwiLCBbXCJjb2xsZWN0aW9uLWl0ZW1cIiwgXCJ0aGVtZS1pdGVtXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiB0LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrOiBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseVRoZW1lKHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZWxlbSBvZiAoX2IgPSAoX2EgPSB0aGVtZUl0ZW0ucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNoaWxkcmVuKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBbXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lSXRlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKFwic3BhblwiLCBbXCJ0b29sdGlwcGVkXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogdCArIChkZWZhdWx0X3RoZW1lc18xLkNMQVNTSUNfVEhFTUVTLmluY2x1ZGVzKHQpID8gXCIgKENsYXNzaWMpXCIgOiBcIlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiB0ICsgKGRlZmF1bHRfdGhlbWVzXzEuQ0xBU1NJQ19USEVNRVMuaW5jbHVkZXModCkgPyBcIiAoQ2xhc3NpYylcIiA6IFwiXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgbGV0IHByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJjaGVja1wiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkFwcGx5IFRoZW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlybU1vZGFsLm9wZW4oXCJBcHBseSBUaGVtZT9cIiwgYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBhcHBseSB0aGUgdGhlbWUgJHt0fT9gLCBbXCJBcHBseVwiLCBcIkNhbmNlbFwiXSwgYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGIgPT09IFwiQXBwbHlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoMCwgYW5hbHl0aWNzXzEudHJhY2tFdmVudCkoXCJidXR0b25fY2xpY2tcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXBwbHktdGhlbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IFwiVGhlbWUgTGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhY3lUYXJnZXQ6IGBUaGVtZTogJHt0fWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhY3lBY3Rpb246IFwiYXBwbHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FjeUxhYmVsOiBcIlRoZW1lIExpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgdGhlbWU6IHQgfSwgKCkgPT4gKGxvY2F0aW9uLmhyZWYgPSBgaHR0cHM6Ly8ke2RlZmF1bHREb21haW59YCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGV0IGFwcGxpZWRQcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwic3RhclwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlRoZW1lIEFwcGxpZWRcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb25jbGljazogKCkgPT4gKGxvY2F0aW9uLmhyZWYgPSBgaHR0cHM6Ly8ke2RlZmF1bHREb21haW59YCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVBY3Rpb25CdXR0b24ocHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKFwiaVwiLCBbXCJtYXRlcmlhbC1pY29uc1wiLCBcInJpZ2h0XCIsIFwidG9vbHRpcHBlZFwiXSwgcHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBidXR0b25zRGl2ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKFwiZGl2XCIsIFtcInJpZ2h0XCJdKTtcbiAgICAgICAgICAgICAgICBidXR0b25zRGl2LnN0eWxlLndpZHRoID0gXCIxNjBweFwiO1xuICAgICAgICAgICAgICAgIHRoZW1lSXRlbS5hcHBlbmRDaGlsZChidXR0b25zRGl2KTtcbiAgICAgICAgICAgICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKGNyZWF0ZUFjdGlvbkJ1dHRvbih0ID09IHMudGhlbWUgPyBhcHBsaWVkUHJvcHMgOiBwcm9wcykpO1xuICAgICAgICAgICAgICAgIGxldCBzaGFyZUJ1dHRvbiA9IGNyZWF0ZUFjdGlvbkJ1dHRvbih7XG4gICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBcImNvbnRlbnRfY29weVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkNvcHkgVGhlbWUgdG8gQ2xpcGJvYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2hhcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb3B5VGhlbWVUb0NsaXBib2FyZCh0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKHNoYXJlQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRlZmF1bHRUaGVtZXMuaW5jbHVkZXModCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChjcmVhdGVBY3Rpb25CdXR0b24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiZGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB7IHRvb2x0aXA6IFwiRGVsZXRlIFRoZW1lXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6IGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZVRoZW1lKHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQoY3JlYXRlQWN0aW9uQnV0dG9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBcImVkaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHsgdG9vbHRpcDogXCJFZGl0IFRoZW1lXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6ICgpID0+IGVkaXRUaGVtZSh0KSxcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGVtZXNMaXN0LmFwcGVuZENoaWxkKHRoZW1lSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSBBcnJheS5mcm9tKHRoZW1lc0xpc3QuY2hpbGRyZW4pLmZpbmQoeCA9PiB4LmRhdGFzZXQudGhlbWUgPT0gcy50aGVtZSk7XG4gICAgICAgICAgICAoc2VsZWN0ZWQgfHwgdGhlbWVzTGlzdC5maXJzdEVsZW1lbnRDaGlsZCkuY2xpY2soKTtcbiAgICAgICAgICAgIG1hdGVyaWFsaXplX2Nzc18xLmRlZmF1bHQuVG9vbHRpcC5pbml0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9vbHRpcHBlZFwiKSwge1xuICAgICAgICAgICAgICAgIG91dER1cmF0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGluRHVyYXRpb246IDMwMCxcbiAgICAgICAgICAgICAgICBlbnRlckRlbGF5OiAwLFxuICAgICAgICAgICAgICAgIGV4aXREZWxheTogMTAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZml4ZWQtYWN0aW9uLWJ0blwiKTtcbiAgICAgICAgICAgIG1hdGVyaWFsaXplX2Nzc18xLmRlZmF1bHQuRmxvYXRpbmdBY3Rpb25CdXR0b24uaW5pdChlbGVtcywgeyBkaXJlY3Rpb246IFwibGVmdFwiLCBob3ZlckVuYWJsZWQ6IGZhbHNlIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmxvYWQoKTtcbmZ1bmN0aW9uIGlzTEFVU0QoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHREb21haW4gPT09IFwibG1zLmxhdXNkLm5ldFwiO1xufVxudmFyIGFsbFRoZW1lcyA9IHt9O1xudmFyIGRlZmF1bHRUaGVtZXMgPSBbXTtcbnZhciByYWluYm93SW50ZXJ2YWwgPSB1bmRlZmluZWQ7XG52YXIgdGhlbWVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1uYW1lXCIpO1xudmFyIHRoZW1lSHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1odWVcIik7XG52YXIgdGhlbWVQcmltYXJ5Q29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLXByaW1hcnktY29sb3JcIik7XG52YXIgdGhlbWVTZWNvbmRhcnlDb2xvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWUtc2Vjb25kYXJ5LWNvbG9yXCIpO1xudmFyIHRoZW1lQmFja2dyb3VuZENvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1iYWNrZ3JvdW5kLWNvbG9yXCIpO1xudmFyIHRoZW1lQm9yZGVyQ29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLWJvcmRlci1jb2xvclwiKTtcbnZhciB0aGVtZUxpbmtDb2xvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWUtbGluay1jb2xvclwiKTtcbnZhciB0aGVtZVNjaG9vbG9neVBsdXNMb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1zY2hvb2xvZ3ktcGx1cy1sb2dvXCIpO1xudmFyIHRoZW1lU2Nob29sb2d5TG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWUtc2Nob29sb2d5LWxvZ29cIik7XG52YXIgdGhlbWVMQVVTRExvZ28yMDIyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1sYXVzZC1sb2dvLTIwMjJcIik7XG52YXIgdGhlbWVOZXdMQVVTRExvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLW5ldy1sYXVzZC1sb2dvXCIpO1xudmFyIHRoZW1lTEFVU0RMb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1sYXVzZC1sb2dvXCIpO1xudmFyIHRoZW1lRGVmYXVsdExvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLWRlZmF1bHQtbG9nb1wiKTtcbnZhciB0aGVtZUN1c3RvbUxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLWN1c3RvbS1sb2dvXCIpO1xudmFyIHRoZW1lTG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWUtbG9nb1wiKTtcbnZhciB0aGVtZUN1cnNvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWUtY3Vyc29yXCIpO1xudmFyIHRoZW1lQ29sb3JIdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLWNvbG9yLWh1ZVwiKTtcbnZhciB0aGVtZUNvbG9yQ3VzdG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1jb2xvci1jdXN0b21cIik7XG52YXIgdGhlbWVDb2xvclJhaW5ib3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLWNvbG9yLXJhaW5ib3dcIik7XG52YXIgdGhlbWVDb2xvckN1c3RvbVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLWNvbG9yLWN1c3RvbS13cmFwcGVyXCIpO1xudmFyIHRoZW1lQ29sb3JSYWluYm93V3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWUtY29sb3ItcmFpbmJvdy13cmFwcGVyXCIpO1xudmFyIGNvbG9yUmFpbmJvd0h1ZUFuaW1hdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctaHVlLWFuaW1hdGVcIik7XG52YXIgY29sb3JSYWluYm93U2F0dXJhdGlvbkFuaW1hdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctc2F0dXJhdGlvbi1hbmltYXRlXCIpO1xudmFyIGNvbG9yUmFpbmJvd0xpZ2h0bmVzc0FuaW1hdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctbGlnaHRuZXNzLWFuaW1hdGVcIik7XG52YXIgY29sb3JSYWluYm93SHVlQW5pbWF0ZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctaHVlLWFuaW1hdGUtd3JhcHBlclwiKTtcbnZhciBjb2xvclJhaW5ib3dTYXR1cmF0aW9uQW5pbWF0ZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctc2F0dXJhdGlvbi1hbmltYXRlLXdyYXBwZXJcIik7XG52YXIgY29sb3JSYWluYm93TGlnaHRuZXNzQW5pbWF0ZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctbGlnaHRuZXNzLWFuaW1hdGUtd3JhcHBlclwiKTtcbnZhciBjb2xvclJhaW5ib3dIdWVTcGVlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29sb3ItcmFpbmJvdy1odWUtc3BlZWRcIik7XG52YXIgY29sb3JSYWluYm93SHVlVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctaHVlLXZhbHVlXCIpO1xudmFyIGNvbG9yUmFpbmJvd0h1ZVByZXZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctaHVlLXByZXZpZXdcIik7XG52YXIgY29sb3JSYWluYm93U2F0dXJhdGlvblNwZWVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xvci1yYWluYm93LXNhdHVyYXRpb24tc3BlZWRcIik7XG52YXIgY29sb3JSYWluYm93U2F0dXJhdGlvblZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xvci1yYWluYm93LXNhdHVyYXRpb24tdmFsdWVcIik7XG52YXIgY29sb3JSYWluYm93TGlnaHRuZXNzU3BlZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctbGlnaHRuZXNzLXNwZWVkXCIpO1xudmFyIGNvbG9yUmFpbmJvd0xpZ2h0bmVzc1ZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xvci1yYWluYm93LWxpZ2h0bmVzcy12YWx1ZVwiKTtcbnZhciBjb2xvclJhaW5ib3dIdWVBbHRlcm5hdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctaHVlLWFsdGVybmF0ZVwiKTtcbnZhciBjb2xvclJhaW5ib3dTYXR1cmF0aW9uQWx0ZXJuYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xvci1yYWluYm93LXNhdHVyYXRpb24tYWx0ZXJuYXRlXCIpO1xudmFyIGNvbG9yUmFpbmJvd0xpZ2h0bmVzc0FsdGVybmF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29sb3ItcmFpbmJvdy1saWdodG5lc3MtYWx0ZXJuYXRlXCIpO1xudmFyIGNvbG9yUmFpbmJvd0h1ZVJhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xvci1yYWluYm93LWh1ZS1yYW5nZVwiKTtcbnZhciBjb2xvclJhaW5ib3dTYXR1cmF0aW9uUmFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXJhaW5ib3ctc2F0dXJhdGlvbi1yYW5nZVwiKTtcbnZhciBjb2xvclJhaW5ib3dMaWdodG5lc3NSYW5nZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29sb3ItcmFpbmJvdy1saWdodG5lc3MtcmFuZ2VcIik7XG52YXIgdGhlbWVIdWVXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1odWUtd3JhcHBlclwiKTtcbnZhciB0aGVtZUxvZ29XcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1sb2dvLXdyYXBwZXJcIik7XG52YXIgcHJldmlld1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZXZpZXctc2VjdGlvblwiKTtcbnZhciB0aGVtZXNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZXMtbGlzdFwiKTtcbnZhciB0aGVtZXNMaXN0U2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWVzLWxpc3Qtc2VjdGlvblwiKTtcbnZhciB0aGVtZUVkaXRvclNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLWVkaXRvci1zZWN0aW9uXCIpO1xudmFyIHRlc3RJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXN0LWljb25cIik7XG52YXIgaWNvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb24tbGlzdFwiKTtcbnZhciB0YWJJY29ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFiLWljb25zXCIpO1xuLyoqIEB0eXBlIHtIVE1MVGFibGVFbGVtZW50fSAqL1xudmFyIGljb25MaXN0VGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb24tbGlzdC10YWJsZVwiKTtcbnZhciBuZXdJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctaWNvblwiKTtcbm5ld0ljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZEljb24pO1xudmFyIGljb25UZXN0VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaWNvbi10ZXN0LXRleHRcIik7XG5pY29uVGVzdFRleHQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGljb25QcmV2aWV3KTtcbnZhciBzYXZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYXZlLWJ1dHRvblwiKTtcbnNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gdHJ5U2F2ZVRoZW1lKCkpO1xudmFyIHNhdmVDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2F2ZS1jbG9zZS1idXR0b25cIik7XG5zYXZlQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gdHJ5U2F2ZVRoZW1lKHRydWUpKTtcbnZhciBkaXNjYXJkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNjYXJkLWJ1dHRvblwiKTtcbmRpc2NhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gQ29uZmlybU1vZGFsLm9wZW4oXCJEaXNjYXJkIENoYW5nZXM/XCIsIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRpc2NhcmQgY2hhbmdlcz8gQWxsIHVuc2F2ZWQgZWRpdHMgd2lsbCBiZSBwZXJtYW5lbnRseSBsb3N0LlwiLCBbXCJEaXNjYXJkXCIsIFwiQ2FuY2VsXCJdLCBiID0+IGIgPT09IFwiRGlzY2FyZFwiICYmIGxvY2F0aW9uLnJlbG9hZCgpKSk7XG52YXIgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWJ1dHRvblwiKTtcbmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+ICghaW5FZGl0TW9kZSgpICYmIChsb2NhdGlvbi5ocmVmID0gYGh0dHBzOi8vJHtkZWZhdWx0RG9tYWlufWApKSB8fFxuICAgIENvbmZpcm1Nb2RhbC5vcGVuKFwiRGlzY2FyZCBDaGFuZ2VzP1wiLCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbG9zZSB3aXRob3V0IHNhdmluZz8gQWxsIHVuc2F2ZWQgZWRpdHMgd2lsbCBiZSBwZXJtYW5lbnRseSBsb3N0LlwiLCBbXCJEaXNjYXJkXCIsIFwiQ2FuY2VsXCJdLCBiID0+IGIgPT09IFwiRGlzY2FyZFwiICYmIChsb2NhdGlvbi5ocmVmID0gYGh0dHBzOi8vJHtkZWZhdWx0RG9tYWlufWApKSk7XG52YXIgc2V0dGluZ3NCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNldHRpbmdzLWJ1dHRvblwiKTtcbnNldHRpbmdzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IFNldHRpbmdzTW9kYWwub3BlbigpKTtcbnZhciBpbXBvcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltcG9ydC1idXR0b25cIik7XG5pbXBvcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gaW1wb3J0VGhlbWUoKSk7XG52YXIgY3JlYXRlUHJlc2V0RGFya1RoZW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGUtcHJlc2V0LWRhcmstdGhlbWVcIik7XG5jcmVhdGVQcmVzZXREYXJrVGhlbWUgPT09IG51bGwgfHwgY3JlYXRlUHJlc2V0RGFya1RoZW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjcmVhdGVQcmVzZXREYXJrVGhlbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gZWRpdFRoZW1lKFwiU2Nob29sb2d5IFBsdXMgTW9kZXJuIERhcmtcIiwgXCJNeSBEYXJrIFRoZW1lXCIpKTtcbnZhciBjcmVhdGVQcmVzZXRMaWdodFRoZW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGUtcHJlc2V0LWxpZ2h0LXRoZW1lXCIpO1xuY3JlYXRlUHJlc2V0TGlnaHRUaGVtZSA9PT0gbnVsbCB8fCBjcmVhdGVQcmVzZXRMaWdodFRoZW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjcmVhdGVQcmVzZXRMaWdodFRoZW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IGVkaXRUaGVtZShcIlNjaG9vbG9neSBQbHVzIE1vZGVybiBMaWdodFwiLCBcIk15IExpZ2h0IFRoZW1lXCIpKTtcbnZhciBjcmVhdGVQcmVzZXRSYWluYm93VGhlbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZS1wcmVzZXQtcmFpbmJvdy10aGVtZVwiKTtcbmNyZWF0ZVByZXNldFJhaW5ib3dUaGVtZSA9PT0gbnVsbCB8fCBjcmVhdGVQcmVzZXRSYWluYm93VGhlbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNyZWF0ZVByZXNldFJhaW5ib3dUaGVtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiBlZGl0VGhlbWUoXCJSYWluYm93IE1vZGVyblwiLCBcIk15IFJhaW5ib3cgVGhlbWVcIikpO1xudmFyIGNyZWF0ZVByZXNldENsYXNzaWNUaGVtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlLXByZXNldC1jbGFzc2ljLXRoZW1lXCIpO1xuY3JlYXRlUHJlc2V0Q2xhc3NpY1RoZW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IGVkaXRUaGVtZShcIlNjaG9vbG9neSBQbHVzXCIsIFwiTXkgQ2xhc3NpYyBUaGVtZVwiKSk7XG52YXIgcHJldmlld05hdmJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJldmlldy1uYXZiYXJcIik7XG52YXIgcHJldmlld0xvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZXZpZXctbG9nb1wiKTtcbnZhciBwcmV2aWV3UGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJldmlldy1wYWdlXCIpO1xudmFyIGxhc3RTZWxlY3RlZFRlbXBsYXRlID0gbnVsbDtcbnZhciBtb2Rlcm5FbmFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGVybi1lbmFibGVcIik7XG5tb2Rlcm5FbmFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gKDAsIGFuYWx5dGljc18xLnRyYWNrRXZlbnQpKFwidXBkYXRlX3NldHRpbmdcIiwge1xuICAgIGlkOiBcIm1vZGVybi1lbmFibGVcIixcbiAgICBjb250ZXh0OiBcIlRoZW1lIEVkaXRvclwiLFxuICAgIHZhbHVlOiBtb2Rlcm5FbmFibGUuY2hlY2tlZC50b1N0cmluZygpLFxuICAgIGxlZ2FjeVRhcmdldDogXCJtb2Rlcm4tZW5hYmxlXCIsXG4gICAgbGVnYWN5QWN0aW9uOiBtb2Rlcm5FbmFibGUuY2hlY2tlZC50b1N0cmluZygpLFxuICAgIGxlZ2FjeUxhYmVsOiBcIlRoZW1lIEVkaXRvclwiLFxufSkpO1xudmFyIG1vZGVybldyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGVybi13cmFwcGVyXCIpO1xudmFyIG1vZGVybkJvcmRlclJhZGl1c1ZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2Rlcm4tYm9yZGVyLXJhZGl1cy12YWx1ZVwiKTtcbnZhciBtb2Rlcm5Cb3JkZXJTaXplVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGVybi1ib3JkZXItc2l6ZS12YWx1ZVwiKTtcbnZhciBtb2Rlcm5QYWRkaW5nVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGVybi1wYWRkaW5nLXZhbHVlXCIpO1xudmFyIHByZXZpZXdNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJldmlldy1tb2RhbFwiKTtcbnZhciBzcGx1c01vZGFsQ2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwbHVzLW1vZGFsLWNsb3NlXCIpO1xuc3BsdXNNb2RhbENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHByZXZpZXdNb2RhbC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIHByZXZpZXdQYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgKDAsIGFuYWx5dGljc18xLnRyYWNrRXZlbnQpKFwiYnV0dG9uX2NsaWNrXCIsIHtcbiAgICAgICAgaWQ6IFwiY2xvc2UtcHJldmlldy1tb2RhbFwiLFxuICAgICAgICBjb250ZXh0OiBcIlRoZW1lIEVkaXRvclwiLFxuICAgICAgICBsZWdhY3lUYXJnZXQ6IFwic3BsdXMtbW9kYWwtY2xvc2VcIixcbiAgICAgICAgbGVnYWN5QWN0aW9uOiBcImNsaWNrXCIsXG4gICAgICAgIGxlZ2FjeUxhYmVsOiBcIlRoZW1lIEVkaXRvclwiLFxuICAgIH0pO1xufSk7XG52YXIgcHJldmlld1NQbHVzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmV2aWV3LXNwbHVzLWJ1dHRvblwiKTtcbnByZXZpZXdTUGx1c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBwcmV2aWV3TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbiAgICBwcmV2aWV3UGFnZS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICAgICgwLCBhbmFseXRpY3NfMS50cmFja0V2ZW50KShcImJ1dHRvbl9jbGlja1wiLCB7XG4gICAgICAgIGlkOiBcInByZXZpZXctc3BsdXMtYnV0dG9uXCIsXG4gICAgICAgIGNvbnRleHQ6IFwiVGhlbWUgRWRpdG9yXCIsXG4gICAgICAgIGxlZ2FjeVRhcmdldDogXCJwcmV2aWV3LXNwbHVzLWJ1dHRvblwiLFxuICAgICAgICBsZWdhY3lBY3Rpb246IFwiY2xpY2tcIixcbiAgICAgICAgbGVnYWN5TGFiZWw6IFwiVGhlbWUgRWRpdG9yXCIsXG4gICAgfSk7XG59KTtcbmNsYXNzIFRoZW1lRWRpdG9yTW9kYWwge1xuICAgIHN0YXRpYyBnZXQgRUxFTUVOVCgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxcIik7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgQ09OVEVOVF9DT05UQUlORVIoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWNvbnRlbnRcIik7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgQlVUVE9OU19DT05UQUlORVIoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJ1dHRvbnNcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3BsYXlzIGEgbW9kYWwgd2l0aCB0aGUgZ2l2ZW4gY29udGVudCBhbmQgYnV0dG9ucywgY2FsbGluZyBjYWxsYmFjayBvbiBjbG9zZVxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY29udGVudCBUaGUgY29udGVudCBvZiB0aGUgbW9kYWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBidXR0b25zIEJ1dHRvbnMgdG8gc2hvdyBpbiB0aGUgbW9kYWwgZm9vdGVyXG4gICAgICogQHBhcmFtIHsoYnV0dG9uOnN0cmluZyk9PnZvaWR9IGNhbGxiYWNrIENhbGxlZCBvbiBjbG9zZSB3aXRoIHRoZSBzZWxlY3RlZCBidXR0b24gKG9yIGBudWxsYCBpZiBub25lIHNlbGVjdGVkKVxuICAgICAqL1xuICAgIHN0YXRpYyBvcGVuKGNvbnRlbnQsIGJ1dHRvbnMgPSBbXCJPS1wiXSwgY2FsbGJhY2spIHtcbiAgICAgICAgVGhlbWVFZGl0b3JNb2RhbC5DT05URU5UX0NPTlRBSU5FUi5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBUaGVtZUVkaXRvck1vZGFsLkJVVFRPTlNfQ09OVEFJTkVSLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHZhciBzZWxlY3RlZCA9IG51bGw7XG4gICAgICAgIFRoZW1lRWRpdG9yTW9kYWwuQ09OVEVOVF9DT05UQUlORVIuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgIGZvciAobGV0IGIgb2YgYnV0dG9ucykge1xuICAgICAgICAgICAgVGhlbWVFZGl0b3JNb2RhbC5CVVRUT05TX0NPTlRBSU5FUi5hcHBlbmRDaGlsZCgoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoXCJhXCIsIFtcIm1vZGFsLWNsb3NlXCIsIFwid2F2ZXMtZWZmZWN0XCIsIFwid2F2ZXMtZGFya1wiLCBcImJ0bi1mbGF0XCJdLCB7XG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGIsXG4gICAgICAgICAgICAgICAgb25jbGljazogZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICgwLCBhbmFseXRpY3NfMS50cmFja0V2ZW50KShcImJ1dHRvbl9jbGlja1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtb2RhbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IFwiVGhlbWUgRWRpdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FjeVRhcmdldDogXCJNb2RhbCBCdXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FjeUFjdGlvbjogYixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FjeUxhYmVsOiBcIlRoZW1lIEVkaXRvclwiLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbnRyb2xsZXIgPSBtYXRlcmlhbGl6ZV9jc3NfMS5kZWZhdWx0Lk1vZGFsLmluaXQoVGhlbWVFZGl0b3JNb2RhbC5FTEVNRU5ULCB7XG4gICAgICAgICAgICBvbkNsb3NlRW5kOiAoKSA9PiBjYWxsYmFjayAmJiBjYWxsYmFjayhzZWxlY3RlZCksXG4gICAgICAgIH0pO1xuICAgICAgICBjb250cm9sbGVyLm9wZW4oKTtcbiAgICB9XG59XG5jbGFzcyBQcm9tcHRNb2RhbCB7XG4gICAgLyoqXG4gICAgICogT3BlbnMgYSBtb2RhbCByZXF1ZXN0aW5nIHVzZXIgaW5wdXRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGUgVGhlIHRpdGxlIG9mIHRoZSBtb2RhbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlciBUZXh0IGRpc3BsYXllZCBhcyBhIHBsYWNlaG9sZGVyIGluIHRoZSB0ZXh0Ym94XG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gYnV0dG9ucyBCdXR0b25zIHRvIGRpc3BsYXkgaW4gdGhlIG1vZGFsIGZvb3RlclxuICAgICAqIEBwYXJhbSB7KGJ1dHRvbjpzdHJpbmcsdGV4dDpzdHJpbmcpPT52b2lkfSBjYWxsYmFjayBDYWxsZWQgb24gY2xvc2Ugd2l0aCB0aGUgc2VsZWN0ZWQgYnV0dG9uIChvciBgbnVsbGAgaWYgbm9uZSBzZWxlY3RlZCkgYW5kIHRoZSB0ZXh0IGluIHRoZSB0ZXh0Ym94XG4gICAgICovXG4gICAgc3RhdGljIG9wZW4odGl0bGUsIHBsYWNlaG9sZGVyLCBidXR0b25zLCBjYWxsYmFjaywgY2xhc3NOYW1lKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gaHRtbFRvRWxlbWVudChgXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDQ+JHt0aXRsZX08L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGlkPVwicHJvbXB0LW1vZGFsLXRleHRhcmVhXCIgY2xhc3M9XCJtYXRlcmlhbGl6ZS10ZXh0YXJlYSAke2NsYXNzTmFtZX1cIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcm9tcHQtbW9kYWwtdGV4dGFyZWFcIj4ke3BsYWNlaG9sZGVyfTwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBUaGVtZUVkaXRvck1vZGFsLm9wZW4oY29udGVudCwgYnV0dG9ucywgYnV0dG9uID0+IGNhbGxiYWNrKGJ1dHRvbiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9tcHQtbW9kYWwtdGV4dGFyZWFcIikudmFsdWUpKTtcbiAgICB9XG59XG5jbGFzcyBDb25maXJtTW9kYWwge1xuICAgIC8qKlxuICAgICAqIE9wZW5zIGEgbW9kYWwgcmVxdWVzdGluZyB1c2VyIGNvbmZpcm1hdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZSBUaGUgdGl0bGUgb2YgdGhlIG1vZGFsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgSW5mb3JtYXRpdmUgdGV4dCBkZXRhaWxpbmcgdGhlIHF1ZXN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gYnV0dG9ucyBCdXR0b25zIHRvIGRpc3BsYXkgaW4gdGhlIG1vZGFsIGZvb3RlclxuICAgICAqIEBwYXJhbSB7KGJ1dHRvbjpzdHJpbmcpPT52b2lkfSBjYWxsYmFjayBDYWxsZWQgb24gY2xvc2Ugd2l0aCB0aGUgc2VsZWN0ZWQgYnV0dG9uIChvciBgbnVsbGAgaWYgbm9uZSBzZWxlY3RlZClcbiAgICAgKi9cbiAgICBzdGF0aWMgb3Blbih0aXRsZSwgdGV4dCwgYnV0dG9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBodG1sVG9FbGVtZW50KGBcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoND4ke3RpdGxlfTwvaDQ+XG4gICAgICAgICAgICA8cD4ke3RleHR9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCk7XG4gICAgICAgIFRoZW1lRWRpdG9yTW9kYWwub3Blbihjb250ZW50LCBidXR0b25zLCBjYWxsYmFjayk7XG4gICAgfVxufVxuY2xhc3MgU2V0dGluZ3NNb2RhbCB7XG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIHNldHRpbmdzIG1vZGFsXG4gICAgICovXG4gICAgc3RhdGljIG9wZW4oKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gaHRtbFRvRWxlbWVudChgXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDQ+U2V0dGluZ3M8L2g0PlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgTm90aGluZyB0byBzZWUgaGVyZSB5ZXQhIFRoZW1lIGVkaXRvciBzZXR0aW5ncyBjb21pbmcgc29vbiZ0cmFkZTsuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcbiAgICAgICAgVGhlbWVFZGl0b3JNb2RhbC5vcGVuKGNvbnRlbnQsIFtcIkNhbmNlbFwiLCBcIlNhdmVcIl0sIGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGJ1dHRvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJTYXZlXCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJDYW5jZWxcIjpcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxudmFyIG9yaWdUaGVtZU5hbWUgPSB1bmRlZmluZWQ7XG5sZXQgd2FybmluZ3MgPSBbXTtcbmxldCBlcnJvcnMgPSBbXTtcbmxldCB0aGVtZSA9IG51bGw7XG52YXIgb3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc29uLW91dHB1dFwiKTtcbm91dHB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgaW1wb3J0VGhlbWVGcm9tT3V0cHV0KTtcbm91dHB1dC5hZGRFdmVudExpc3RlbmVyKFwicGFzdGVcIiwgZSA9PiB7XG4gICAgaWYgKGluRWRpdE1vZGUoKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGxldCB0ID0gZS5jbGlwYm9hcmREYXRhLmdldERhdGEoXCJ0ZXh0XCIpO1xuICAgICAgICBvdXRwdXQudmFsdWUgPSB0O1xuICAgICAgICBpbXBvcnRUaGVtZUZyb21PdXRwdXQoKTtcbiAgICB9XG59KTtcbmZvciAobGV0IGUgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN0aGVtZS1lZGl0b3Itc2VjdGlvbiBpbnB1dFwiKSkge1xuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB1cGRhdGVPdXRwdXQoKTtcbiAgICB9KTtcbn1cbnZhciBtVGFicyA9IG1hdGVyaWFsaXplX2Nzc18xLmRlZmF1bHQuVGFicy5pbml0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFic1wiKSwge1xuICAgIG9uU2hvdzogZnVuY3Rpb24gKG5ld3RhYikge1xuICAgICAgICBpZiAobmV3dGFiLmlkID09IFwidGFiLXByZXZpZXdcIikge1xuICAgICAgICAgICAgcHJldmlld1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcImZpeGVkLW9uLWxhcmdlLWFuZC11cFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByZXZpZXdTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJmaXhlZC1vbi1sYXJnZS1hbmQtdXBcIik7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG52YXIgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyb3Bkb3duLXRyaWdnZXJcIik7XG52YXIgaW5zdGFuY2VzID0gbWF0ZXJpYWxpemVfY3NzXzEuZGVmYXVsdC5Ecm9wZG93bi5pbml0KGVsZW1zLCB7IGNvbnN0cmFpbldpZHRoOiBmYWxzZSB9KTtcbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgZXJyb3JzIGZvciB0aGUgZ2l2ZW4gdGhlbWVcbiAqIEBwYXJhbSB7Kn0gaiBUaGVtZSBKU09OIG9iamVjdFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUVycm9ycyhqKSB7XG4gICAgbGV0IHcgPSBbXTtcbiAgICBzd2l0Y2ggKGoudmVyc2lvbikge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBpZiAoIWoubmFtZSlcbiAgICAgICAgICAgICAgICB3LnB1c2goXCJUaGVtZSBtdXN0IGhhdmUgYSBuYW1lXCIpO1xuICAgICAgICAgICAgaWYgKCFqLmNvbG9yKVxuICAgICAgICAgICAgICAgIHcucHVzaChcIlRoZW1lIG11c3QgaGF2ZSBhIGNvbG9yIG9iamVjdFwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gdztcbn1cbi8qKlxuICogTG9hZHMgYSB0aGVtZSBmcm9tIHRoZSBKU09OIHRleHQgZGlzcGxheWVkIGluIHRoZSBvdXRwdXQgdGV4dGFyZWEgZWxlbWVudFxuICovXG5mdW5jdGlvbiBpbXBvcnRUaGVtZUZyb21PdXRwdXQoKSB7XG4gICAgaW1wb3J0QW5kUmVuZGVyKHBhcnNlSlNPTk9iamVjdChvdXRwdXQudmFsdWUpKTtcbn1cbi8qKlxuICogTG9hZHMgYSB0aGVtZSBmcm9tIGFuIG9iamVjdCBhbmQgcmVuZGVycyBpdFxuICogQHBhcmFtIHsqfSBvYmplY3QgSlNPTiBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgYSB0aGVtZVxuICovXG5mdW5jdGlvbiBpbXBvcnRBbmRSZW5kZXIob2JqZWN0KSB7XG4gICAgZXJyb3JzID0gW107XG4gICAgd2FybmluZ3MgPSBbXTtcbiAgICByZW5kZXJUaGVtZShpbXBvcnRUaGVtZUZyb21PYmplY3Qob2JqZWN0KSk7XG59XG4vKipcbiAqIE1pZ3JhdGVzIGEgdGhlbWUgdG8gdGhlIG5ld2VzdCB2ZXJzaW9uIG9mIHRoZSB0aGVtZSBzcGVjaWZpY2F0aW9uXG4gKiBAcGFyYW0geyp9IHQgVGhlbWUgSlNPTiBvYmplY3RcbiAqL1xuZnVuY3Rpb24gbWlncmF0ZVRoZW1lKHQpIHtcbiAgICBzd2l0Y2ggKHQudmVyc2lvbikge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiVGhlIHRoZW1lIHZlcnNpb24gaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSB0aGVtZSB2ZXJzaW9uIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgfVxuICAgIHJldHVybiB0LnZlcnNpb24gPT0gQ1VSUkVOVF9WRVJTSU9OID8gdCA6IG1pZ3JhdGVUaGVtZSh0KTtcbn1cbi8qKlxuICogRmlsbHMgb3V0IGZvcm0gZWxlbWVudHMgd2l0aCB0aGUgZGF0YSBjb250YWluZWQgaW4gdGhlIHByb3ZpZGVkIFRoZW1lIG9iamVjdFxuICogQHBhcmFtIHtTY2hvb2xvZ3lUaGVtZVYyfSBqIEEgU2Nob29sb2d5UGx1cyB0aGVtZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaW1wb3J0VGhlbWVGcm9tT2JqZWN0KGopIHtcbiAgICBpZiAoIWopIHtcbiAgICAgICAgZXJyb3JzLnB1c2goXCJUaGUgSlNPTiB5b3UgaGF2ZSBlbnRlcmVkIGlzIG5vdCB2YWxpZFwiKTtcbiAgICAgICAgdXBkYXRlUHJldmlldyhmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXJyb3JzID0gZ2VuZXJhdGVFcnJvcnMoaik7XG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHVwZGF0ZVByZXZpZXcoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBtaWdyYXRlZFRoZW1lID0gbWlncmF0ZVRoZW1lKGopO1xuICAgIHJldHVybiB0aGVtZV9tb2RlbF8xLlNjaG9vbG9neVRoZW1lLmxvYWRGcm9tT2JqZWN0KG1pZ3JhdGVkVGhlbWUpO1xufVxuLyoqXG4gKiBVcGRhdGVzIGZvcm0gZWxlbWVudHMgd2l0aCB2YWx1ZXMgZnJvbSB0aGUgcHJvdmlkZWQgdGhlbWVcbiAqIEBwYXJhbSB7U2Nob29sb2d5VGhlbWV9IHQgVGhlIHRoZW1lIHRvIHJlbmRlclxuICovXG5mdW5jdGlvbiByZW5kZXJUaGVtZSh0KSB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rLCBfbCwgX20sIF9vLCBfcCwgX3EsIF9yLCBfcywgX3QsIF91LCBfdiwgX3csIF94LCBfeSwgX3osIF8wLCBfMTtcbiAgICBpZiAoIXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGVtZU5hbWUudmFsdWUgPSB0Lm5hbWU7XG4gICAgdGhlbWVMb2dvLnZhbHVlID0gXCJcIjtcbiAgICBzd2l0Y2ggKChfYSA9IHQubG9nbykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnByZXNldCkge1xuICAgICAgICBjYXNlIFwic2Nob29sb2d5X3BsdXNcIjpcbiAgICAgICAgICAgIHRoZW1lU2Nob29sb2d5UGx1c0xvZ28uY2xpY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2Nob29sb2d5X2xvZ29cIjpcbiAgICAgICAgICAgIHRoZW1lU2Nob29sb2d5TG9nby5jbGljaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsYXVzZF9sZWdhY3lcIjpcbiAgICAgICAgICAgIHRoZW1lTEFVU0RMb2dvLmNsaWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImxhdXNkXzIwMTlcIjpcbiAgICAgICAgICAgIHRoZW1lTmV3TEFVU0RMb2dvLmNsaWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImxhdXNkXzIwMjJcIjpcbiAgICAgICAgICAgIHRoZW1lTEFVU0RMb2dvMjAyMi5jbGljaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkZWZhdWx0XCI6XG4gICAgICAgICAgICB0aGVtZURlZmF1bHRMb2dvLmNsaWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoZW1lTG9nby52YWx1ZSA9IChfYyA9IChfYiA9IHQubG9nbykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnVybCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogXCJcIjtcbiAgICAgICAgICAgIHRoZW1lQ3VzdG9tTG9nby5jbGljaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgICgwLCBqcXVlcnlfMS5kZWZhdWx0KSh0aGVtZUh1ZSkuc2xpZGVyKFwidmFsdWVcIiwgdC5jb2xvci5odWUgfHwgMjAwKTtcbiAgICBjb2xvclJhaW5ib3dIdWVBbmltYXRlLmNoZWNrZWQgPSBmYWxzZTtcbiAgICBjb2xvclJhaW5ib3dIdWVTcGVlZC52YWx1ZSA9IFwiNTBcIjtcbiAgICAoMCwganF1ZXJ5XzEuZGVmYXVsdCkoY29sb3JSYWluYm93SHVlUmFuZ2UpLnJvdW5kU2xpZGVyKFwic2V0VmFsdWVcIiwgXCIwLDM1OVwiKTtcbiAgICBjb2xvclJhaW5ib3dIdWVBbHRlcm5hdGUuY2hlY2tlZCA9IGZhbHNlO1xuICAgICgwLCBqcXVlcnlfMS5kZWZhdWx0KShjb2xvclJhaW5ib3dIdWVWYWx1ZSkuc2xpZGVyKFwidmFsdWVcIiwgMTgwKTtcbiAgICBjb2xvclJhaW5ib3dTYXR1cmF0aW9uQW5pbWF0ZS5jaGVja2VkID0gZmFsc2U7XG4gICAgY29sb3JSYWluYm93U2F0dXJhdGlvblNwZWVkLnZhbHVlID0gXCI1MFwiO1xuICAgICgwLCBqcXVlcnlfMS5kZWZhdWx0KShjb2xvclJhaW5ib3dTYXR1cmF0aW9uUmFuZ2UpLnNsaWRlcihcInZhbHVlc1wiLCBbMCwgMTAwXSk7XG4gICAgY29sb3JSYWluYm93U2F0dXJhdGlvbkFsdGVybmF0ZS5jaGVja2VkID0gZmFsc2U7XG4gICAgY29sb3JSYWluYm93U2F0dXJhdGlvblZhbHVlLnZhbHVlID0gXCI1MFwiO1xuICAgIGNvbG9yUmFpbmJvd0xpZ2h0bmVzc0FuaW1hdGUuY2hlY2tlZCA9IGZhbHNlO1xuICAgIGNvbG9yUmFpbmJvd0xpZ2h0bmVzc1NwZWVkLnZhbHVlID0gXCI1MFwiO1xuICAgICgwLCBqcXVlcnlfMS5kZWZhdWx0KShjb2xvclJhaW5ib3dMaWdodG5lc3NSYW5nZSkuc2xpZGVyKFwidmFsdWVzXCIsIFswLCAxMDBdKTtcbiAgICBjb2xvclJhaW5ib3dMaWdodG5lc3NBbHRlcm5hdGUuY2hlY2tlZCA9IGZhbHNlO1xuICAgIGNvbG9yUmFpbmJvd0xpZ2h0bmVzc1ZhbHVlLnZhbHVlID0gXCI1MFwiO1xuICAgIGlmICh0LmNvbG9yLmh1ZSB8fCB0LmNvbG9yLmh1ZSA9PT0gMCkge1xuICAgICAgICB0aGVtZUNvbG9ySHVlLmNsaWNrKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHQuY29sb3IuY3VzdG9tKSB7XG4gICAgICAgIGxldCBtYXAgPSB7XG4gICAgICAgICAgICBcIiN0aGVtZS1wcmltYXJ5LWNvbG9yXCI6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgXCIjdGhlbWUtYmFja2dyb3VuZC1jb2xvclwiOiBcImJhY2tncm91bmRcIixcbiAgICAgICAgICAgIFwiI3RoZW1lLXNlY29uZGFyeS1jb2xvclwiOiBcImhvdmVyXCIsXG4gICAgICAgICAgICBcIiN0aGVtZS1ib3JkZXItY29sb3JcIjogXCJib3JkZXJcIixcbiAgICAgICAgICAgIFwiI3RoZW1lLWxpbmstY29sb3JcIjogXCJsaW5rXCIsXG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5rZXlzKG1hcCkubWFwKHggPT4gKDAsIGpxdWVyeV8xLmRlZmF1bHQpKHgpLnNwZWN0cnVtKFwic2V0XCIsIHQuY29sb3IuY3VzdG9tW21hcFt4XV0pKTtcbiAgICAgICAgdGhlbWVDb2xvckN1c3RvbS5jbGljaygpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0LmNvbG9yLnJhaW5ib3cpIHtcbiAgICAgICAgdGhlbWVDb2xvclJhaW5ib3cuY2xpY2soKTtcbiAgICAgICAgaWYgKCEhKChfZCA9IHQuY29sb3IucmFpbmJvdy5odWUpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5hbmltYXRlKSAhPT0gY29sb3JSYWluYm93SHVlQW5pbWF0ZS5jaGVja2VkKSB7XG4gICAgICAgICAgICBjb2xvclJhaW5ib3dIdWVBbmltYXRlLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChfZSA9IHQuY29sb3IucmFpbmJvdy5odWUpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5hbmltYXRlKSB7XG4gICAgICAgICAgICBjb2xvclJhaW5ib3dIdWVTcGVlZC52YWx1ZSA9IHQuY29sb3IucmFpbmJvdy5odWUuYW5pbWF0ZS5zcGVlZC50b1N0cmluZygpO1xuICAgICAgICAgICAgKDAsIGpxdWVyeV8xLmRlZmF1bHQpKGNvbG9yUmFpbmJvd0h1ZVZhbHVlKS5zbGlkZXIoXCJ2YWx1ZVwiLCB0LmNvbG9yLnJhaW5ib3cuaHVlLmFuaW1hdGUub2Zmc2V0KTtcbiAgICAgICAgICAgIGlmICghIXQuY29sb3IucmFpbmJvdy5odWUuYW5pbWF0ZS5hbHRlcm5hdGUgIT09IGNvbG9yUmFpbmJvd0h1ZUFsdGVybmF0ZS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgY29sb3JSYWluYm93SHVlQWx0ZXJuYXRlLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbCA9IHQuY29sb3IucmFpbmJvdy5odWUuYW5pbWF0ZS5taW4gfHxcbiAgICAgICAgICAgICAgICAoMCAmJlxuICAgICAgICAgICAgICAgICAgICB0LmNvbG9yLnJhaW5ib3cuaHVlLmFuaW1hdGUubWluID49IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgdC5jb2xvci5yYWluYm93Lmh1ZS5hbmltYXRlLm1pbiA8PSAzNTkpXG4gICAgICAgICAgICAgICAgPyB0LmNvbG9yLnJhaW5ib3cuaHVlLmFuaW1hdGUubWluXG4gICAgICAgICAgICAgICAgOiAwO1xuICAgICAgICAgICAgbGV0IHUgPSB0LmNvbG9yLnJhaW5ib3cuaHVlLmFuaW1hdGUubWF4ICYmXG4gICAgICAgICAgICAgICAgdC5jb2xvci5yYWluYm93Lmh1ZS5hbmltYXRlLm1heCA+PSAwICYmXG4gICAgICAgICAgICAgICAgdC5jb2xvci5yYWluYm93Lmh1ZS5hbmltYXRlLm1heCA8PSAzNTlcbiAgICAgICAgICAgICAgICA/IHQuY29sb3IucmFpbmJvdy5odWUuYW5pbWF0ZS5tYXhcbiAgICAgICAgICAgICAgICA6IDM1OTtcbiAgICAgICAgICAgICgwLCBqcXVlcnlfMS5kZWZhdWx0KShjb2xvclJhaW5ib3dIdWVSYW5nZSkucm91bmRTbGlkZXIoXCJzZXRWYWx1ZVwiLCBgJHtsfSwke3V9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoMCwganF1ZXJ5XzEuZGVmYXVsdCkoY29sb3JSYWluYm93SHVlVmFsdWUpLnNsaWRlcihcInZhbHVlXCIsIChfZyA9IChfZiA9IHQuY29sb3IucmFpbmJvdy5odWUpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi52YWx1ZSkgIT09IG51bGwgJiYgX2cgIT09IHZvaWQgMCA/IF9nIDogMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhKChfaCA9IHQuY29sb3IucmFpbmJvdy5zYXR1cmF0aW9uKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2guYW5pbWF0ZSkgIT09IGNvbG9yUmFpbmJvd1NhdHVyYXRpb25BbmltYXRlLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbG9yUmFpbmJvd1NhdHVyYXRpb25BbmltYXRlLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChfaiA9IHQuY29sb3IucmFpbmJvdy5zYXR1cmF0aW9uKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2ouYW5pbWF0ZSkge1xuICAgICAgICAgICAgY29sb3JSYWluYm93U2F0dXJhdGlvblNwZWVkLnZhbHVlID0gdC5jb2xvci5yYWluYm93LnNhdHVyYXRpb24uYW5pbWF0ZS5zcGVlZC50b1N0cmluZygpO1xuICAgICAgICAgICAgY29sb3JSYWluYm93U2F0dXJhdGlvblZhbHVlLnZhbHVlID1cbiAgICAgICAgICAgICAgICB0LmNvbG9yLnJhaW5ib3cuc2F0dXJhdGlvbi5hbmltYXRlLm9mZnNldC50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKCEhdC5jb2xvci5yYWluYm93LnNhdHVyYXRpb24uYW5pbWF0ZS5hbHRlcm5hdGUgIT09XG4gICAgICAgICAgICAgICAgY29sb3JSYWluYm93U2F0dXJhdGlvbkFsdGVybmF0ZS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgY29sb3JSYWluYm93U2F0dXJhdGlvbkFsdGVybmF0ZS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKDAsIGpxdWVyeV8xLmRlZmF1bHQpKGNvbG9yUmFpbmJvd1NhdHVyYXRpb25SYW5nZSkuc2xpZGVyKFwidmFsdWVzXCIsIFtcbiAgICAgICAgICAgICAgICB0LmNvbG9yLnJhaW5ib3cuc2F0dXJhdGlvbi5hbmltYXRlLm1pbiAmJlxuICAgICAgICAgICAgICAgICAgICB0LmNvbG9yLnJhaW5ib3cuc2F0dXJhdGlvbi5hbmltYXRlLm1pbiA8IHQuY29sb3IucmFpbmJvdy5zYXR1cmF0aW9uLmFuaW1hdGUubWF4ICYmXG4gICAgICAgICAgICAgICAgICAgIHQuY29sb3IucmFpbmJvdy5zYXR1cmF0aW9uLmFuaW1hdGUubWluID49IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgdC5jb2xvci5yYWluYm93LnNhdHVyYXRpb24uYW5pbWF0ZS5taW4gPD0gMTAwXG4gICAgICAgICAgICAgICAgICAgID8gdC5jb2xvci5yYWluYm93LnNhdHVyYXRpb24uYW5pbWF0ZS5taW5cbiAgICAgICAgICAgICAgICAgICAgOiAwLFxuICAgICAgICAgICAgICAgIHQuY29sb3IucmFpbmJvdy5zYXR1cmF0aW9uLmFuaW1hdGUubWF4ICYmXG4gICAgICAgICAgICAgICAgICAgIHQuY29sb3IucmFpbmJvdy5zYXR1cmF0aW9uLmFuaW1hdGUubWF4ID4gdC5jb2xvci5yYWluYm93LnNhdHVyYXRpb24uYW5pbWF0ZS5taW4gJiZcbiAgICAgICAgICAgICAgICAgICAgdC5jb2xvci5yYWluYm93LnNhdHVyYXRpb24uYW5pbWF0ZS5tYXggPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICB0LmNvbG9yLnJhaW5ib3cuc2F0dXJhdGlvbi5hbmltYXRlLm1heCA8PSAxMDBcbiAgICAgICAgICAgICAgICAgICAgPyB0LmNvbG9yLnJhaW5ib3cuc2F0dXJhdGlvbi5hbmltYXRlLm1heFxuICAgICAgICAgICAgICAgICAgICA6IDEwMCxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29sb3JSYWluYm93U2F0dXJhdGlvblZhbHVlLnZhbHVlID1cbiAgICAgICAgICAgICAgICAoX20gPSAoX2wgPSAoX2sgPSB0LmNvbG9yLnJhaW5ib3cuc2F0dXJhdGlvbikgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnZhbHVlKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgX20gIT09IHZvaWQgMCA/IF9tIDogXCIwXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhKChfbyA9IHQuY29sb3IucmFpbmJvdy5saWdodG5lc3MpID09PSBudWxsIHx8IF9vID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfby5hbmltYXRlKSAhPT0gY29sb3JSYWluYm93TGlnaHRuZXNzQW5pbWF0ZS5jaGVja2VkKSB7XG4gICAgICAgICAgICBjb2xvclJhaW5ib3dMaWdodG5lc3NBbmltYXRlLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChfcCA9IHQuY29sb3IucmFpbmJvdy5saWdodG5lc3MpID09PSBudWxsIHx8IF9wID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcC5hbmltYXRlKSB7XG4gICAgICAgICAgICBjb2xvclJhaW5ib3dMaWdodG5lc3NTcGVlZC52YWx1ZSA9IHQuY29sb3IucmFpbmJvdy5saWdodG5lc3MuYW5pbWF0ZS5zcGVlZC50b1N0cmluZygpO1xuICAgICAgICAgICAgY29sb3JSYWluYm93TGlnaHRuZXNzVmFsdWUudmFsdWUgPSB0LmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLmFuaW1hdGUub2Zmc2V0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoISF0LmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLmFuaW1hdGUuYWx0ZXJuYXRlICE9PVxuICAgICAgICAgICAgICAgIGNvbG9yUmFpbmJvd0xpZ2h0bmVzc0FsdGVybmF0ZS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgY29sb3JSYWluYm93TGlnaHRuZXNzQWx0ZXJuYXRlLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoMCwganF1ZXJ5XzEuZGVmYXVsdCkoY29sb3JSYWluYm93TGlnaHRuZXNzUmFuZ2UpLnNsaWRlcihcInZhbHVlc1wiLCBbXG4gICAgICAgICAgICAgICAgdC5jb2xvci5yYWluYm93LmxpZ2h0bmVzcy5hbmltYXRlLm1pbiAmJlxuICAgICAgICAgICAgICAgICAgICB0LmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLmFuaW1hdGUubWluIDwgdC5jb2xvci5yYWluYm93LmxpZ2h0bmVzcy5hbmltYXRlLm1heCAmJlxuICAgICAgICAgICAgICAgICAgICB0LmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLmFuaW1hdGUubWluID49IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgdC5jb2xvci5yYWluYm93LmxpZ2h0bmVzcy5hbmltYXRlLm1pbiA8PSAxMDBcbiAgICAgICAgICAgICAgICAgICAgPyB0LmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLmFuaW1hdGUubWluXG4gICAgICAgICAgICAgICAgICAgIDogMCxcbiAgICAgICAgICAgICAgICB0LmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLmFuaW1hdGUubWF4ICYmXG4gICAgICAgICAgICAgICAgICAgIHQuY29sb3IucmFpbmJvdy5saWdodG5lc3MuYW5pbWF0ZS5tYXggPiB0LmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLmFuaW1hdGUubWluICYmXG4gICAgICAgICAgICAgICAgICAgIHQuY29sb3IucmFpbmJvdy5saWdodG5lc3MuYW5pbWF0ZS5tYXggPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICB0LmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLmFuaW1hdGUubWF4IDw9IDEwMFxuICAgICAgICAgICAgICAgICAgICA/IHQuY29sb3IucmFpbmJvdy5saWdodG5lc3MuYW5pbWF0ZS5tYXhcbiAgICAgICAgICAgICAgICAgICAgOiAxMDAsXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbG9yUmFpbmJvd0xpZ2h0bmVzc1ZhbHVlLnZhbHVlID0gKF9zID0gKF9yID0gKF9xID0gdC5jb2xvci5yYWluYm93LmxpZ2h0bmVzcykgPT09IG51bGwgfHwgX3EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9xLnZhbHVlKSA9PT0gbnVsbCB8fCBfciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3IudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgX3MgIT09IHZvaWQgMCA/IF9zIDogXCIwXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHQuY29sb3IubW9kZXJuKSB7XG4gICAgICAgIG1vZGVybkVuYWJsZS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgT2JqZWN0LmtleXMobW9kZXJuQ29sb3JNYXApLm1hcCh4ID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGxldCBtb2Rlcm5PcHRpb24gPSB0LmNvbG9yLm1vZGVyblttb2Rlcm5Db2xvck1hcFt4XVswXV07XG4gICAgICAgICAgICAoMCwganF1ZXJ5XzEuZGVmYXVsdCkoeCkuc3BlY3RydW0oXCJzZXRcIiwgKF9hID0gbW9kZXJuT3B0aW9uID09PSBudWxsIHx8IG1vZGVybk9wdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZXJuT3B0aW9uW21vZGVybkNvbG9yTWFwW3hdWzFdXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogXCIjMDBERUFEXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgbW9kZXJuQm9yZGVyUmFkaXVzVmFsdWUudmFsdWUgPSAoX3YgPSAoX3UgPSAoX3QgPSB0LmNvbG9yLm1vZGVybi5vcHRpb25zKSA9PT0gbnVsbCB8fCBfdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3QuYm9yZGVyUmFkaXVzKSA9PT0gbnVsbCB8fCBfdSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3UudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgX3YgIT09IHZvaWQgMCA/IF92IDogXCI1XCI7XG4gICAgICAgIG1vZGVybkJvcmRlclNpemVWYWx1ZS52YWx1ZSA9IChfeSA9IChfeCA9IChfdyA9IHQuY29sb3IubW9kZXJuLm9wdGlvbnMpID09PSBudWxsIHx8IF93ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdy5ib3JkZXJTaXplKSA9PT0gbnVsbCB8fCBfeCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3gudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgX3kgIT09IHZvaWQgMCA/IF95IDogXCIxXCI7XG4gICAgICAgIG1vZGVyblBhZGRpbmdWYWx1ZS52YWx1ZSA9IChfMSA9IChfMCA9IChfeiA9IHQuY29sb3IubW9kZXJuLm9wdGlvbnMpID09PSBudWxsIHx8IF96ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfei5wYWRkaW5nKSA9PT0gbnVsbCB8fCBfMCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzAudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgXzEgIT09IHZvaWQgMCA/IF8xIDogXCI1XCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtb2Rlcm5FbmFibGUuY2hlY2tlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT1yYW5nZV1bZGF0YS1sYWJlbF1cIikpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwuZGF0YXNldC5sYWJlbCkudGV4dENvbnRlbnQgPSBlbC52YWx1ZTtcbiAgICB9XG4gICAgZm9yIChsZXQgZWwgb2YgW2NvbG9yUmFpbmJvd1NhdHVyYXRpb25SYW5nZSwgY29sb3JSYWluYm93TGlnaHRuZXNzUmFuZ2VdKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsLmlkICsgXCItZGlzcGxheVwiKS50ZXh0Q29udGVudCA9IGAkeygwLCBqcXVlcnlfMS5kZWZhdWx0KShlbCkuc2xpZGVyKFwidmFsdWVzXCIpWzBdfSAtICR7KDAsIGpxdWVyeV8xLmRlZmF1bHQpKGVsKS5zbGlkZXIoXCJ2YWx1ZXNcIilbMV19YDtcbiAgICB9XG4gICAgaWNvbkxpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBpZiAodC5pY29ucykge1xuICAgICAgICBmb3IgKGxldCBpIG9mIHQuaWNvbnMpIHtcbiAgICAgICAgICAgIGxldCByb3cgPSBhZGRJY29uKCk7XG4gICAgICAgICAgICByb3cucXVlcnlTZWxlY3RvcihcIi5jbGFzcy1uYW1lXCIpLnRleHRDb250ZW50ID0gaS5yZWdleC50b1N0cmluZygpO1xuICAgICAgICAgICAgcm93LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbi11cmxcIikudGV4dENvbnRlbnQgPSBpLnVybDtcbiAgICAgICAgICAgIHJvdy5xdWVyeVNlbGVjdG9yKFwiLnNtYWxsLWljb24tcHJldmlld1wiKS5zcmMgPSBpLnVybDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGVtZUN1cnNvci52YWx1ZSA9IFwiXCI7XG4gICAgaWYgKHQuY3Vyc29yICYmIHQuY3Vyc29yLnByaW1hcnkpIHtcbiAgICAgICAgdGhlbWVDdXJzb3IudmFsdWUgPSB0LmN1cnNvci5wcmltYXJ5O1xuICAgIH1cbiAgICBtYXRlcmlhbGl6ZV9jc3NfMS5kZWZhdWx0LnVwZGF0ZVRleHRGaWVsZHMoKTtcbiAgICB1cGRhdGVPdXRwdXQoKTtcbn1cbmxldCBpbml0ID0gMDtcbi8qKlxuICogQ3JlYXRlcyBhIFNwZWN0cnVtLmpzIGNvbG9yIHBpY2tlclxuICogQHBhcmFtIHtzdHJpbmd9IGlkIEVsZW1lbnQgSUQgb2YgdGhlIGlucHV0IGVsZW1lbnRcbiAqIEBwYXJhbSB7KHRpbnljb2xvcik9PnZvaWR9IG9udXBkYXRlIENhbGxiYWNrIGNhbGxlZCB3aGVuIGNvbG9yIGlzIGNoYW5nZWRcbiAqL1xuZnVuY3Rpb24gaW5pdFBpY2tlcihpZCwgY29sb3IsIG9udXBkYXRlID0gdXBkYXRlT3V0cHV0LCBzaG93QWxwaGEgPSBmYWxzZSkge1xuICAgICgwLCBqcXVlcnlfMS5kZWZhdWx0KShgIyR7aWR9YCkuc3BlY3RydW0oe1xuICAgICAgICBzaG93SW5wdXQ6IHRydWUsXG4gICAgICAgIGNvbnRhaW5lckNsYXNzTmFtZTogXCJmdWxsLXNwZWN0cnVtXCIsXG4gICAgICAgIHNob3dJbml0aWFsOiB0cnVlLFxuICAgICAgICBzaG93UGFsZXR0ZTogdHJ1ZSxcbiAgICAgICAgc2hvd1NlbGVjdGlvblBhbGV0dGU6IHRydWUsXG4gICAgICAgIG1heFBhbGV0dGVTaXplOiAxMCxcbiAgICAgICAgcHJlZmVycmVkRm9ybWF0OiBcImhleFwiLFxuICAgICAgICBzaG93QWxwaGE6IHNob3dBbHBoYSxcbiAgICAgICAgY29sb3I6IGNvbG9yIHx8IFtcInJlZFwiLCBcImJsdWVcIiwgXCJ5ZWxsb3dcIiwgXCJncmVlblwiLCBcIm1hZ2VudGFcIl1baW5pdCsrICUgNV0sXG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uIChjb2xvcikge1xuICAgICAgICAgICAgb251cGRhdGUoY29sb3IpO1xuICAgICAgICB9LFxuICAgICAgICBoaWRlOiBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICAgICAgICAgIG9udXBkYXRlKGNvbG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgcGFsZXR0ZTogW1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFwicmdiKDAsIDAsIDApXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoNjcsIDY3LCA2NylcIixcbiAgICAgICAgICAgICAgICBcInJnYigxMDIsIDEwMiwgMTAyKVwiIC8qXCJyZ2IoMTUzLCAxNTMsIDE1MylcIixcInJnYigxODMsIDE4MywgMTgzKVwiLCovLFxuICAgICAgICAgICAgICAgIFwicmdiKDIwNCwgMjA0LCAyMDQpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjE3LCAyMTcsIDIxNylcIixcbiAgICAgICAgICAgICAgICAvKlwicmdiKDIzOSwgMjM5LCAyMzkpXCIsIFwicmdiKDI0MywgMjQzLCAyNDMpXCIsKi8gXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTUyLCAwLCAwKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDI1NSwgMCwgMClcIixcbiAgICAgICAgICAgICAgICBcInJnYigyNTUsIDE1MywgMClcIixcbiAgICAgICAgICAgICAgICBcInJnYigyNTUsIDI1NSwgMClcIixcbiAgICAgICAgICAgICAgICBcInJnYigwLCAyNTUsIDApXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMCwgMjU1LCAyNTUpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoNzQsIDEzNCwgMjMyKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDAsIDAsIDI1NSlcIixcbiAgICAgICAgICAgICAgICBcInJnYigxNTMsIDAsIDI1NSlcIixcbiAgICAgICAgICAgICAgICBcInJnYigyNTUsIDAsIDI1NSlcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjMwLCAxODQsIDE3NSlcIixcbiAgICAgICAgICAgICAgICBcInJnYigyNDQsIDIwNCwgMjA0KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDI1MiwgMjI5LCAyMDUpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjU1LCAyNDIsIDIwNClcIixcbiAgICAgICAgICAgICAgICBcInJnYigyMTcsIDIzNCwgMjExKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDIwOCwgMjI0LCAyMjcpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjAxLCAyMTgsIDI0OClcIixcbiAgICAgICAgICAgICAgICBcInJnYigyMDcsIDIyNiwgMjQzKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDIxNywgMjEwLCAyMzMpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjM0LCAyMDksIDIyMClcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjIxLCAxMjYsIDEwNylcIixcbiAgICAgICAgICAgICAgICBcInJnYigyMzQsIDE1MywgMTUzKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDI0OSwgMjAzLCAxNTYpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjU1LCAyMjksIDE1MylcIixcbiAgICAgICAgICAgICAgICBcInJnYigxODIsIDIxNSwgMTY4KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDE2MiwgMTk2LCAyMDEpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTY0LCAxOTQsIDI0NClcIixcbiAgICAgICAgICAgICAgICBcInJnYigxNTksIDE5NywgMjMyKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDE4MCwgMTY3LCAyMTQpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjEzLCAxNjYsIDE4OSlcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjA0LCA2NSwgMzcpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjI0LCAxMDIsIDEwMilcIixcbiAgICAgICAgICAgICAgICBcInJnYigyNDYsIDE3OCwgMTA3KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDI1NSwgMjE3LCAxMDIpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTQ3LCAxOTYsIDEyNSlcIixcbiAgICAgICAgICAgICAgICBcInJnYigxMTgsIDE2NSwgMTc1KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDEwOSwgMTU4LCAyMzUpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTExLCAxNjgsIDIyMClcIixcbiAgICAgICAgICAgICAgICBcInJnYigxNDIsIDEyNCwgMTk1KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDE5NCwgMTIzLCAxNjApXCIsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFwicmdiKDE2NiwgMjgsIDApXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMjA0LCAwLCAwKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDIzMCwgMTQ1LCA1NilcIixcbiAgICAgICAgICAgICAgICBcInJnYigyNDEsIDE5NCwgNTApXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTA2LCAxNjgsIDc5KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDY5LCAxMjksIDE0MilcIixcbiAgICAgICAgICAgICAgICBcInJnYig2MCwgMTIwLCAyMTYpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoNjEsIDEzMywgMTk4KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDEwMywgNzgsIDE2NylcIixcbiAgICAgICAgICAgICAgICBcInJnYigxNjYsIDc3LCAxMjEpXCIsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFwicmdiKDEzMywgMzIsIDEyKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDE1MywgMCwgMClcIixcbiAgICAgICAgICAgICAgICBcInJnYigxODAsIDk1LCA2KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDE5MSwgMTQ0LCAwKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDU2LCAxMTgsIDI5KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDE5LCA3OSwgOTIpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTcsIDg1LCAyMDQpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTEsIDgzLCAxNDgpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoNTMsIDI4LCAxMTcpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTE2LCAyNywgNzEpXCIsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFwicmdiKDkxLCAxNSwgMClcIixcbiAgICAgICAgICAgICAgICBcInJnYigxMDIsIDAsIDApXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTIwLCA2MywgNClcIixcbiAgICAgICAgICAgICAgICBcInJnYigxMjcsIDk2LCAwKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDM5LCA3OCwgMTkpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTIsIDUyLCA2MSlcIixcbiAgICAgICAgICAgICAgICBcInJnYigyOCwgNjksIDEzNSlcIixcbiAgICAgICAgICAgICAgICBcInJnYig3LCA1NSwgOTkpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMzIsIDE4LCA3NylcIixcbiAgICAgICAgICAgICAgICBcInJnYig3NiwgMTcsIDQ4KVwiLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgXSxcbiAgICB9KTtcbn1cbmluaXRQaWNrZXIoXCJ0aGVtZS1wcmltYXJ5LWNvbG9yXCIpO1xuaW5pdFBpY2tlcihcInRoZW1lLXNlY29uZGFyeS1jb2xvclwiKTtcbmluaXRQaWNrZXIoXCJ0aGVtZS1iYWNrZ3JvdW5kLWNvbG9yXCIpO1xuaW5pdFBpY2tlcihcInRoZW1lLWJvcmRlci1jb2xvclwiKTtcbmluaXRQaWNrZXIoXCJ0aGVtZS1saW5rLWNvbG9yXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jb2xvci1wcmltYXJ5XCIsIFwiI0VBRUFFQVwiKTtcbmluaXRQaWNrZXIoXCJtb2Rlcm4tY29sb3ItYWNjZW50XCIsIFwiI0Y3RjdGN1wiKTtcbmluaXRQaWNrZXIoXCJtb2Rlcm4tY29sb3Itc2Vjb25kYXJ5XCIsIFwiI0RERFwiKTtcbmluaXRQaWNrZXIoXCJtb2Rlcm4tY29sb3ItaW5wdXRcIiwgXCIjRDBEMEQwXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jb2xvci1ib3JkZXJcIiwgXCIjQkFCQUJBXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jb2xvci1oaWdobGlnaHRcIiwgXCJyZ2JhKDI1NSwgMTgzLCAyLCAwLjIpXCIsIHVwZGF0ZU91dHB1dCwgdHJ1ZSk7XG5pbml0UGlja2VyKFwibW9kZXJuLWNvbG9yLWFjdGl2ZVwiLCBcIiM5OGQ0ZTRcIiwgdXBkYXRlT3V0cHV0LCB0cnVlKTtcbmluaXRQaWNrZXIoXCJtb2Rlcm4tY29sb3ItZ3JhZGVzXCIsIFwiIzAwOTQwMFwiKTtcbmluaXRQaWNrZXIoXCJtb2Rlcm4tY29sb3ItZXJyb3JcIiwgXCIjRjQ0MzM2XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMVwiLCBcIiNkNmU3ZjRcIik7XG5pbml0UGlja2VyKFwibW9kZXJuLWNhbC0yXCIsIFwiI2Q3ZThjZlwiKTtcbmluaXRQaWNrZXIoXCJtb2Rlcm4tY2FsLTNcIiwgXCIjZjllOWQ0XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtNFwiLCBcIiNlN2UwZTVcIik7XG5pbml0UGlja2VyKFwibW9kZXJuLWNhbC01XCIsIFwiI2U2YjVjOVwiKTtcbmluaXRQaWNrZXIoXCJtb2Rlcm4tY2FsLTZcIiwgXCIjZjlmMWNmXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtN1wiLCBcIiNkYWYwZjlcIik7XG5pbml0UGlja2VyKFwibW9kZXJuLWNhbC04XCIsIFwiI2Y5ZGRlYVwiKTtcbmluaXRQaWNrZXIoXCJtb2Rlcm4tY2FsLTlcIiwgXCIjZmJkN2Q4XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMTBcIiwgXCIjZjFmMmQxXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMTFcIiwgXCIjZTBlOGY1XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMTJcIiwgXCIjZmJkN2U0XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMTNcIiwgXCIjZmNkZGQzXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMTRcIiwgXCIjZTdmMmQ1XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMTVcIiwgXCIjZTZlMGVlXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMTZcIiwgXCIjZjBlNWRiXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMTdcIiwgXCIjZmNlOGQxXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMThcIiwgXCIjZTFmMWU3XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMTlcIiwgXCIjZjBkZmVkXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMjBcIiwgXCIjZTllOWVhXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMjFcIiwgXCIjMDA0MjdjXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMjJcIiwgXCIjNjAzMDczXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMjNcIiwgXCIjOGIxOTQxXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMjRcIiwgXCIjOTcwYzBjXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMjVcIiwgXCIjOWMzYjA3XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMjZcIiwgXCIjNjg1MjAzXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMjdcIiwgXCIjMmE1ZjE2XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMjhcIiwgXCIjMDk1ODRmXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMjlcIiwgXCIjMDA1YTc1XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jYWwtMzBcIiwgXCIjNGQ1NTU3XCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jb2xvci10ZXh0LXByaW1hcnlcIiwgXCIjMkEyQTJBXCIpO1xuaW5pdFBpY2tlcihcIm1vZGVybi1jb2xvci10ZXh0LW11dGVkXCIsIFwiIzY3NzU4M1wiKTtcbmluaXRQaWNrZXIoXCJtb2Rlcm4tY29sb3ItdGV4dC1jb250cmFzdFwiLCBcIndoaXRlXCIpO1xudmFyIG1vZGVybkNvbG9yTWFwID0ge1xuICAgIFwiI21vZGVybi1jb2xvci1wcmltYXJ5XCI6IFtcImludGVyZmFjZVwiLCBcInByaW1hcnlcIiwgXCJtb2Rlcm4tcHJpbWFyeVwiXSxcbiAgICBcIiNtb2Rlcm4tY29sb3ItYWNjZW50XCI6IFtcImludGVyZmFjZVwiLCBcImFjY2VudFwiLCBcIm1vZGVybi1hY2NlbnRcIl0sXG4gICAgXCIjbW9kZXJuLWNvbG9yLXNlY29uZGFyeVwiOiBbXCJpbnRlcmZhY2VcIiwgXCJzZWNvbmRhcnlcIiwgXCJtb2Rlcm4tc2Vjb25kYXJ5XCJdLFxuICAgIFwiI21vZGVybi1jb2xvci1pbnB1dFwiOiBbXCJpbnRlcmZhY2VcIiwgXCJpbnB1dFwiLCBcIm1vZGVybi1pbnB1dFwiXSxcbiAgICBcIiNtb2Rlcm4tY29sb3ItYm9yZGVyXCI6IFtcImludGVyZmFjZVwiLCBcImJvcmRlclwiLCBcIm1vZGVybi1jb250cmFzdC1ib3JkZXJcIl0sXG4gICAgXCIjbW9kZXJuLWNvbG9yLWhpZ2hsaWdodFwiOiBbXCJpbnRlcmZhY2VcIiwgXCJoaWdobGlnaHRcIiwgXCJtb2Rlcm4taGlnaGxpZ2h0XCJdLFxuICAgIFwiI21vZGVybi1jb2xvci1hY3RpdmVcIjogW1wiaW50ZXJmYWNlXCIsIFwiYWN0aXZlXCIsIFwibW9kZXJuLWFjdGl2ZVwiXSxcbiAgICBcIiNtb2Rlcm4tY29sb3ItZ3JhZGVzXCI6IFtcImludGVyZmFjZVwiLCBcImdyYWRlc1wiLCBcIm1vZGVybi1ncmFkZXNcIl0sXG4gICAgXCIjbW9kZXJuLWNvbG9yLWVycm9yXCI6IFtcImludGVyZmFjZVwiLCBcImVycm9yXCIsIFwibW9kZXJuLWVycm9yXCJdLFxuICAgIFwiI21vZGVybi1jb2xvci10ZXh0LXByaW1hcnlcIjogW1widGV4dFwiLCBcInByaW1hcnlcIiwgXCJtb2Rlcm4tdGV4dFwiXSxcbiAgICBcIiNtb2Rlcm4tY29sb3ItdGV4dC1tdXRlZFwiOiBbXCJ0ZXh0XCIsIFwibXV0ZWRcIiwgXCJtb2Rlcm4tbXV0ZWQtdGV4dFwiXSxcbiAgICBcIiNtb2Rlcm4tY29sb3ItdGV4dC1jb250cmFzdFwiOiBbXCJ0ZXh0XCIsIFwiY29udHJhc3RcIiwgXCJtb2Rlcm4tY29udHJhc3QtdGV4dFwiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTFcIjogW1wiY2FsZW5kYXJcIiwgMCwgXCJjYWwxXCJdLFxuICAgIFwiI21vZGVybi1jYWwtMlwiOiBbXCJjYWxlbmRhclwiLCAxLCBcImNhbDJcIl0sXG4gICAgXCIjbW9kZXJuLWNhbC0zXCI6IFtcImNhbGVuZGFyXCIsIDIsIFwiY2FsM1wiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTRcIjogW1wiY2FsZW5kYXJcIiwgMywgXCJjYWw0XCJdLFxuICAgIFwiI21vZGVybi1jYWwtNVwiOiBbXCJjYWxlbmRhclwiLCA0LCBcImNhbDVcIl0sXG4gICAgXCIjbW9kZXJuLWNhbC02XCI6IFtcImNhbGVuZGFyXCIsIDUsIFwiY2FsNlwiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTdcIjogW1wiY2FsZW5kYXJcIiwgNiwgXCJjYWw3XCJdLFxuICAgIFwiI21vZGVybi1jYWwtOFwiOiBbXCJjYWxlbmRhclwiLCA3LCBcImNhbDhcIl0sXG4gICAgXCIjbW9kZXJuLWNhbC05XCI6IFtcImNhbGVuZGFyXCIsIDgsIFwiY2FsOVwiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTEwXCI6IFtcImNhbGVuZGFyXCIsIDksIFwiY2FsMTBcIl0sXG4gICAgXCIjbW9kZXJuLWNhbC0xMVwiOiBbXCJjYWxlbmRhclwiLCAxMCwgXCJjYWwxMVwiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTEyXCI6IFtcImNhbGVuZGFyXCIsIDExLCBcImNhbDEyXCJdLFxuICAgIFwiI21vZGVybi1jYWwtMTNcIjogW1wiY2FsZW5kYXJcIiwgMTIsIFwiY2FsMTNcIl0sXG4gICAgXCIjbW9kZXJuLWNhbC0xNFwiOiBbXCJjYWxlbmRhclwiLCAxMywgXCJjYWwxNFwiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTE1XCI6IFtcImNhbGVuZGFyXCIsIDE0LCBcImNhbDE1XCJdLFxuICAgIFwiI21vZGVybi1jYWwtMTZcIjogW1wiY2FsZW5kYXJcIiwgMTUsIFwiY2FsMTZcIl0sXG4gICAgXCIjbW9kZXJuLWNhbC0xN1wiOiBbXCJjYWxlbmRhclwiLCAxNiwgXCJjYWwxN1wiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTE4XCI6IFtcImNhbGVuZGFyXCIsIDE3LCBcImNhbDE4XCJdLFxuICAgIFwiI21vZGVybi1jYWwtMTlcIjogW1wiY2FsZW5kYXJcIiwgMTgsIFwiY2FsMTlcIl0sXG4gICAgXCIjbW9kZXJuLWNhbC0yMFwiOiBbXCJjYWxlbmRhclwiLCAxOSwgXCJjYWwyMFwiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTIxXCI6IFtcImNhbGVuZGFyXCIsIDIwLCBcImNhbDIxXCJdLFxuICAgIFwiI21vZGVybi1jYWwtMjJcIjogW1wiY2FsZW5kYXJcIiwgMjEsIFwiY2FsMjJcIl0sXG4gICAgXCIjbW9kZXJuLWNhbC0yM1wiOiBbXCJjYWxlbmRhclwiLCAyMiwgXCJjYWwyM1wiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTI0XCI6IFtcImNhbGVuZGFyXCIsIDIzLCBcImNhbDI0XCJdLFxuICAgIFwiI21vZGVybi1jYWwtMjVcIjogW1wiY2FsZW5kYXJcIiwgMjQsIFwiY2FsMjVcIl0sXG4gICAgXCIjbW9kZXJuLWNhbC0yNlwiOiBbXCJjYWxlbmRhclwiLCAyNSwgXCJjYWwyNlwiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTI3XCI6IFtcImNhbGVuZGFyXCIsIDI2LCBcImNhbDI3XCJdLFxuICAgIFwiI21vZGVybi1jYWwtMjhcIjogW1wiY2FsZW5kYXJcIiwgMjcsIFwiY2FsMjhcIl0sXG4gICAgXCIjbW9kZXJuLWNhbC0yOVwiOiBbXCJjYWxlbmRhclwiLCAyOCwgXCJjYWwyOVwiXSxcbiAgICBcIiNtb2Rlcm4tY2FsLTMwXCI6IFtcImNhbGVuZGFyXCIsIDI5LCBcImNhbDMwXCJdLFxufTtcbmZ1bmN0aW9uIHVwZGF0ZU91dHB1dCgpIHtcbiAgICBjbGVhckludGVydmFsKHJhaW5ib3dJbnRlcnZhbCk7XG4gICAgd2FybmluZ3MgPSBbXTtcbiAgICBlcnJvcnMgPSBbXTtcbiAgICB0aGVtZSA9IG5ldyB0aGVtZV9tb2RlbF8xLlNjaG9vbG9neVRoZW1lKHRoZW1lTmFtZS52YWx1ZSB8fCBcIlVudGl0bGVkIFRoZW1lXCIsIHRoZW1lX21vZGVsXzEuU2Nob29sb2d5VGhlbWUuQ1VSUkVOVF9WRVJTSU9OLCB7IGh1ZTogMjEwIH0pO1xuICAgIC8vIE5hbWVcbiAgICBpZiAoIXRoZW1lLm5hbWUpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goXCJUaGVtZSBtdXN0IGhhdmUgYSBuYW1lXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChkZWZhdWx0VGhlbWVzLmluY2x1ZGVzKHRoZW1lLm5hbWUpKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKFwiVGhlbWUgY2FuJ3QgdXNlIHRoZSBzYW1lIG5hbWUgYXMgYSBkZWZhdWx0IHRoZW1lLiBQbGVhc2UgY2hvb3NlIGEgZGlmZmVyZW50IG5hbWUuXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGVtZS5uYW1lICE9IG9yaWdUaGVtZU5hbWUgJiYgYWxsVGhlbWVzW3RoZW1lLm5hbWVdKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKGBBIHRoZW1lIHdpdGggdGhlIG5hbWUgXCIke3RoZW1lLm5hbWV9XCIgYWxyZWFkeSBleGlzdHMuIERlbGV0ZSB0aGF0IHRoZW1lIG9yIGNob29zZSBhIGRpZmZlcmVudCBuYW1lIGJlZm9yZSBzYXZpbmcuYCk7XG4gICAgfVxuICAgIC8vIENvbG9yXG4gICAgdGhlbWUuY29sb3IgPSBuZXcgdGhlbWVfbW9kZWxfMS5UaGVtZUNvbG9yKCk7XG4gICAgaWYgKHRoZW1lQ29sb3JIdWUuY2hlY2tlZCkge1xuICAgICAgICB0aGVtZUNvbG9yQ3VzdG9tV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB0aGVtZUh1ZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgdGhlbWVDb2xvclJhaW5ib3dXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIHRoZW1lLmNvbG9yLmh1ZSA9ICgwLCBqcXVlcnlfMS5kZWZhdWx0KSh0aGVtZUh1ZSkuc2xpZGVyKFwidmFsdWVcIik7XG4gICAgICAgICgwLCBkb21fMS5zZXRDU1NWYXJpYWJsZSkoXCJjb2xvci1odWVcIiwgdGhlbWUuY29sb3IuaHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwicHJpbWFyeS1jb2xvclwiLCBcImhzbCh2YXIoLS1jb2xvci1odWUpLCA1MCUsIDUwJSlcIik7XG4gICAgICAgICgwLCBkb21fMS5zZXRDU1NWYXJpYWJsZSkoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiaHNsKHZhcigtLWNvbG9yLWh1ZSksIDYwJSwgMzAlKVwiKTtcbiAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShcImhvdmVyLWNvbG9yXCIsIFwiaHNsKHZhcigtLWNvbG9yLWh1ZSksIDU1JSwgNDAlKVwiKTtcbiAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShcImJvcmRlci1jb2xvclwiLCBcImhzbCh2YXIoLS1jb2xvci1odWUpLCA2MCUsIDI1JSlcIik7XG4gICAgICAgICgwLCBkb21fMS5zZXRDU1NWYXJpYWJsZSkoXCJsaW5rLWNvbG9yXCIsIFwiaHNsKHZhcigtLWNvbG9yLWh1ZSksIDU1JSwgNDAlKVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhlbWVDb2xvckN1c3RvbS5jaGVja2VkKSB7XG4gICAgICAgIHRoZW1lQ29sb3JDdXN0b21XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgIHRoZW1lSHVlV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB0aGVtZUNvbG9yUmFpbmJvd1dyYXBwZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgdGhlbWUuY29sb3IuY3VzdG9tID0gbmV3IHRoZW1lX21vZGVsXzEuQ3VzdG9tQ29sb3JEZWZpbml0aW9uKCgwLCBqcXVlcnlfMS5kZWZhdWx0KShcIiN0aGVtZS1wcmltYXJ5LWNvbG9yXCIpLnNwZWN0cnVtKFwiZ2V0XCIpLnRvSGV4U3RyaW5nKCksICgwLCBqcXVlcnlfMS5kZWZhdWx0KShcIiN0aGVtZS1zZWNvbmRhcnktY29sb3JcIikuc3BlY3RydW0oXCJnZXRcIikudG9IZXhTdHJpbmcoKSwgKDAsIGpxdWVyeV8xLmRlZmF1bHQpKFwiI3RoZW1lLWJhY2tncm91bmQtY29sb3JcIikuc3BlY3RydW0oXCJnZXRcIikudG9IZXhTdHJpbmcoKSwgKDAsIGpxdWVyeV8xLmRlZmF1bHQpKFwiI3RoZW1lLWJvcmRlci1jb2xvclwiKS5zcGVjdHJ1bShcImdldFwiKS50b0hleFN0cmluZygpLCAoMCwganF1ZXJ5XzEuZGVmYXVsdCkoXCIjdGhlbWUtbGluay1jb2xvclwiKS5zcGVjdHJ1bShcImdldFwiKS50b0hleFN0cmluZygpKTtcbiAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShcInByaW1hcnktY29sb3JcIiwgdGhlbWUuY29sb3IuY3VzdG9tLnByaW1hcnkpO1xuICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwiYmFja2dyb3VuZC1jb2xvclwiLCB0aGVtZS5jb2xvci5jdXN0b20uYmFja2dyb3VuZCk7XG4gICAgICAgICgwLCBkb21fMS5zZXRDU1NWYXJpYWJsZSkoXCJob3Zlci1jb2xvclwiLCB0aGVtZS5jb2xvci5jdXN0b20uaG92ZXIpO1xuICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwiYm9yZGVyLWNvbG9yXCIsIHRoZW1lLmNvbG9yLmN1c3RvbS5ib3JkZXIpO1xuICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwibGluay1jb2xvclwiLCB0aGVtZS5jb2xvci5jdXN0b20ubGluayk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoZW1lQ29sb3JSYWluYm93LmNoZWNrZWQpIHtcbiAgICAgICAgdGhlbWVDb2xvckN1c3RvbVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgdGhlbWVIdWVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIHRoZW1lQ29sb3JSYWluYm93V3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICB0aGVtZS5jb2xvci5yYWluYm93ID0gbmV3IHRoZW1lX21vZGVsXzEuUmFpbmJvd0NvbG9yRGVmaW5pdGlvbihuZXcgdGhlbWVfbW9kZWxfMS5SYWluYm93Q29sb3JDb21wb25lbnREZWZpbml0aW9uKCksIG5ldyB0aGVtZV9tb2RlbF8xLlJhaW5ib3dDb2xvckNvbXBvbmVudERlZmluaXRpb24oKSwgbmV3IHRoZW1lX21vZGVsXzEuUmFpbmJvd0NvbG9yQ29tcG9uZW50RGVmaW5pdGlvbigpKTtcbiAgICAgICAgaWYgKHRoZW1lLmNvbG9yLnJhaW5ib3cuaHVlICYmIGNvbG9yUmFpbmJvd0h1ZUFuaW1hdGUuY2hlY2tlZCkge1xuICAgICAgICAgICAgY29sb3JSYWluYm93SHVlQW5pbWF0ZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsYWJlbFtmb3I9Y29sb3ItcmFpbmJvdy1odWUtdmFsdWVdXCIpLmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50ID0gXCJIdWUgT2Zmc2V0XCI7XG4gICAgICAgICAgICBjb2xvclJhaW5ib3dIdWVWYWx1ZS5jbGFzc0xpc3QucmVtb3ZlKFwiaHVlLXNsaWRlclwiKTtcbiAgICAgICAgICAgIHRoZW1lLmNvbG9yLnJhaW5ib3cuaHVlLmFuaW1hdGUgPSBuZXcgdGhlbWVfbW9kZWxfMS5SYWluYm93Q29sb3JDb21wb25lbnRBbmltYXRpb24oK2NvbG9yUmFpbmJvd0h1ZVNwZWVkLnZhbHVlLCArKDAsIGpxdWVyeV8xLmRlZmF1bHQpKGNvbG9yUmFpbmJvd0h1ZVZhbHVlKS5zbGlkZXIoXCJ2YWx1ZVwiKSwgKygwLCBqcXVlcnlfMS5kZWZhdWx0KShjb2xvclJhaW5ib3dIdWVSYW5nZSkucm91bmRTbGlkZXIoXCJnZXRWYWx1ZVwiKS5zcGxpdChcIixcIilbMF0sICsoMCwganF1ZXJ5XzEuZGVmYXVsdCkoY29sb3JSYWluYm93SHVlUmFuZ2UpLnJvdW5kU2xpZGVyKFwiZ2V0VmFsdWVcIikuc3BsaXQoXCIsXCIpWzFdLCBjb2xvclJhaW5ib3dIdWVBbHRlcm5hdGUuY2hlY2tlZCk7XG4gICAgICAgICAgICBsZXQgc3RlcHMgPSBbXTtcbiAgICAgICAgICAgIGxldCBtYXggPSB0aGVtZS5jb2xvci5yYWluYm93Lmh1ZS5hbmltYXRlLm1pbiA+IHRoZW1lLmNvbG9yLnJhaW5ib3cuaHVlLmFuaW1hdGUubWF4XG4gICAgICAgICAgICAgICAgPyB0aGVtZS5jb2xvci5yYWluYm93Lmh1ZS5hbmltYXRlLm1heCArIDM2MFxuICAgICAgICAgICAgICAgIDogdGhlbWUuY29sb3IucmFpbmJvdy5odWUuYW5pbWF0ZS5tYXg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxOyBpICs9IDAuMDUpIHtcbiAgICAgICAgICAgICAgICBzdGVwcy5wdXNoKGBoc2woJHt0aGVtZS5jb2xvci5yYWluYm93Lmh1ZS5hbmltYXRlLm1pbiAqICgxIC0gaSkgKyBtYXggKiBpfSwgNTAlLCA1MCUpYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhlbWUuY29sb3IucmFpbmJvdy5odWUuYW5pbWF0ZS5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICBzdGVwcy5wdXNoKC4uLnN0ZXBzLnNsaWNlKDAsIHN0ZXBzLmxlbmd0aCAtIDEpLnJldmVyc2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2xvclJhaW5ib3dIdWVQcmV2aWV3LnN0eWxlLmJhY2tncm91bmQgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3N0ZXBzLmpvaW4oKX0pYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbG9yUmFpbmJvd0h1ZUFuaW1hdGVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibGFiZWxbZm9yPWNvbG9yLXJhaW5ib3ctaHVlLXZhbHVlXVwiKS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudCA9IFwiSHVlIFZhbHVlXCI7XG4gICAgICAgICAgICBjb2xvclJhaW5ib3dIdWVWYWx1ZS5jbGFzc0xpc3QuYWRkKFwiaHVlLXNsaWRlclwiKTtcbiAgICAgICAgICAgIHRoZW1lLmNvbG9yLnJhaW5ib3cuaHVlLnZhbHVlID0gKDAsIGpxdWVyeV8xLmRlZmF1bHQpKGNvbG9yUmFpbmJvd0h1ZVZhbHVlKS5zbGlkZXIoXCJ2YWx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhlbWUuY29sb3IucmFpbmJvdy5zYXR1cmF0aW9uICYmIGNvbG9yUmFpbmJvd1NhdHVyYXRpb25BbmltYXRlLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbG9yUmFpbmJvd1NhdHVyYXRpb25BbmltYXRlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxhYmVsW2Zvcj1jb2xvci1yYWluYm93LXNhdHVyYXRpb24tdmFsdWVdXCIpLmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50ID0gXCJTYXR1cmF0aW9uIE9mZnNldFwiO1xuICAgICAgICAgICAgdGhlbWUuY29sb3IucmFpbmJvdy5zYXR1cmF0aW9uLmFuaW1hdGUgPSBuZXcgdGhlbWVfbW9kZWxfMS5SYWluYm93Q29sb3JDb21wb25lbnRBbmltYXRpb24oK2NvbG9yUmFpbmJvd1NhdHVyYXRpb25TcGVlZC52YWx1ZSwgK2NvbG9yUmFpbmJvd1NhdHVyYXRpb25WYWx1ZS52YWx1ZSwgKDAsIGpxdWVyeV8xLmRlZmF1bHQpKGNvbG9yUmFpbmJvd1NhdHVyYXRpb25SYW5nZSkuc2xpZGVyKFwidmFsdWVzXCIpWzBdLCAoMCwganF1ZXJ5XzEuZGVmYXVsdCkoY29sb3JSYWluYm93U2F0dXJhdGlvblJhbmdlKS5zbGlkZXIoXCJ2YWx1ZXNcIilbMV0sIGNvbG9yUmFpbmJvd1NhdHVyYXRpb25BbHRlcm5hdGUuY2hlY2tlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb2xvclJhaW5ib3dTYXR1cmF0aW9uQW5pbWF0ZVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsYWJlbFtmb3I9Y29sb3ItcmFpbmJvdy1zYXR1cmF0aW9uLXZhbHVlXVwiKS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudCA9IFwiU2F0dXJhdGlvbiBWYWx1ZVwiO1xuICAgICAgICAgICAgdGhlbWUuY29sb3IucmFpbmJvdy5zYXR1cmF0aW9uLnZhbHVlID0gTnVtYmVyLnBhcnNlRmxvYXQoY29sb3JSYWluYm93U2F0dXJhdGlvblZhbHVlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sb3JSYWluYm93TGlnaHRuZXNzQW5pbWF0ZS5jaGVja2VkKSB7XG4gICAgICAgICAgICBjb2xvclJhaW5ib3dMaWdodG5lc3NBbmltYXRlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxhYmVsW2Zvcj1jb2xvci1yYWluYm93LWxpZ2h0bmVzcy12YWx1ZV1cIikuZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnQgPSBcIkxpZ2h0bmVzcyBPZmZzZXRcIjtcbiAgICAgICAgICAgIHRoZW1lLmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLmFuaW1hdGUgPSBuZXcgdGhlbWVfbW9kZWxfMS5SYWluYm93Q29sb3JDb21wb25lbnRBbmltYXRpb24oK2NvbG9yUmFpbmJvd0xpZ2h0bmVzc1NwZWVkLnZhbHVlLCArY29sb3JSYWluYm93TGlnaHRuZXNzVmFsdWUudmFsdWUsICgwLCBqcXVlcnlfMS5kZWZhdWx0KShjb2xvclJhaW5ib3dMaWdodG5lc3NSYW5nZSkuc2xpZGVyKFwidmFsdWVzXCIpWzBdLCAoMCwganF1ZXJ5XzEuZGVmYXVsdCkoY29sb3JSYWluYm93TGlnaHRuZXNzUmFuZ2UpLnNsaWRlcihcInZhbHVlc1wiKVsxXSwgY29sb3JSYWluYm93TGlnaHRuZXNzQWx0ZXJuYXRlLmNoZWNrZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29sb3JSYWluYm93TGlnaHRuZXNzQW5pbWF0ZVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsYWJlbFtmb3I9Y29sb3ItcmFpbmJvdy1saWdodG5lc3MtdmFsdWVdXCIpLmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50ID0gXCJMaWdodG5lc3MgVmFsdWVcIjtcbiAgICAgICAgICAgIHRoZW1lLmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLnZhbHVlID0gTnVtYmVyLnBhcnNlRmxvYXQoY29sb3JSYWluYm93TGlnaHRuZXNzVmFsdWUudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmID0gZ2VuZXJhdGVSYWluYm93RnVuY3Rpb24odGhlbWUpO1xuICAgICAgICBpZiAoZikge1xuICAgICAgICAgICAgZigpO1xuICAgICAgICAgICAgcmFpbmJvd0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZiwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9kZXJuRW5hYmxlLmNoZWNrZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1vZGVyblwiLCBcInRydWVcIik7XG4gICAgICAgIG1vZGVybldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgdGhlbWUuY29sb3IubW9kZXJuID0gbmV3IHRoZW1lX21vZGVsXzEuTW9kZXJuQ29sb3JEZWZpbml0aW9uKCk7XG4gICAgICAgIHRoZW1lLmNvbG9yLm1vZGVybi5jYWxlbmRhciA9IFtdO1xuICAgICAgICB0aGVtZS5jb2xvci5tb2Rlcm4uaW50ZXJmYWNlID0gbmV3IHRoZW1lX21vZGVsXzEuTW9kZXJuSW50ZXJmYWNlQ29sb3JEZWZpbml0aW9uKFwiIzAwREVBRFwiLCBcIiMwMERFQURcIiwgXCIjMDBERUFEXCIsIFwiIzAwREVBRFwiLCBcIiMwMERFQURcIiwgXCIjMDBERUFEXCIsIFwiIzAwREVBRFwiLCBcIiMwMERFQURcIiwgXCIjMDBERUFEXCIpO1xuICAgICAgICB0aGVtZS5jb2xvci5tb2Rlcm4udGV4dCA9IG5ldyB0aGVtZV9tb2RlbF8xLk1vZGVyblRleHRDb2xvckRlZmluaXRpb24oXCIjMDBERUFEXCIsIFwiIzAwREVBRFwiLCBcIiMwMERFQURcIik7XG4gICAgICAgIHRoZW1lLmNvbG9yLm1vZGVybi5vcHRpb25zID0gbmV3IHRoZW1lX21vZGVsXzEuTW9kZXJuT3B0aW9uc0RlZmluaXRpb24oNSwgMSwgNSk7XG4gICAgICAgIHRoZW1lLmNvbG9yLm1vZGVybi5kYXJrID0gKDAsIGpxdWVyeV8xLmRlZmF1bHQpKFwiI21vZGVybi1jb2xvci1wcmltYXJ5XCIpLnNwZWN0cnVtKFwiZ2V0XCIpLmlzRGFyaygpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGFya1wiLCB0aGVtZS5jb2xvci5tb2Rlcm4uZGFyay50b1N0cmluZygpKTtcbiAgICAgICAgZm9yIChsZXQgaWQgaW4gbW9kZXJuQ29sb3JNYXApIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBtb2Rlcm5Db2xvck1hcFtpZF07XG4gICAgICAgICAgICAvLyBjb3VsZG4ndCBmaWd1cmUgb3V0IGhvdyB0byBtYWtlIFR5cGVTY3JpcHQgaGFwcHkgaGVyZSwgZGlkIG15IGJlc3RcbiAgICAgICAgICAgIGxldCBtb2Rlcm5LZXkgPSB0aGVtZS5jb2xvci5tb2Rlcm5ba2V5WzBdXTtcbiAgICAgICAgICAgIG1vZGVybktleVtrZXlbMV1dID0gKDAsIGpxdWVyeV8xLmRlZmF1bHQpKGlkKVxuICAgICAgICAgICAgICAgIC5zcGVjdHJ1bShcImdldFwiKVxuICAgICAgICAgICAgICAgIC50b1N0cmluZygpO1xuICAgICAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShrZXlbMl0sICgwLCBqcXVlcnlfMS5kZWZhdWx0KShpZCkuc3BlY3RydW0oXCJnZXRcIikudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhlbWUuY29sb3IubW9kZXJuLm9wdGlvbnMuYm9yZGVyU2l6ZSA9ICttb2Rlcm5Cb3JkZXJTaXplVmFsdWUudmFsdWU7XG4gICAgICAgIHRoZW1lLmNvbG9yLm1vZGVybi5vcHRpb25zLmJvcmRlclJhZGl1cyA9ICttb2Rlcm5Cb3JkZXJSYWRpdXNWYWx1ZS52YWx1ZTtcbiAgICAgICAgdGhlbWUuY29sb3IubW9kZXJuLm9wdGlvbnMucGFkZGluZyA9ICttb2Rlcm5QYWRkaW5nVmFsdWUudmFsdWU7XG4gICAgICAgICgwLCBkb21fMS5zZXRDU1NWYXJpYWJsZSkoXCJtb2Rlcm4tYm9yZGVyLXNpemVcIiwgYCR7bW9kZXJuQm9yZGVyU2l6ZVZhbHVlLnZhbHVlfXB4YCk7XG4gICAgICAgICgwLCBkb21fMS5zZXRDU1NWYXJpYWJsZSkoXCJtb2Rlcm4tYm9yZGVyLXJhZGl1c1wiLCBgJHttb2Rlcm5Cb3JkZXJSYWRpdXNWYWx1ZS52YWx1ZX1weGApO1xuICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwibW9kZXJuLXBhZGRpbmdcIiwgYCR7bW9kZXJuUGFkZGluZ1ZhbHVlLnZhbHVlfXB4YCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKFwibW9kZXJuXCIsIFwiZmFsc2VcIik7XG4gICAgICAgIG1vZGVybldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICB9XG4gICAgLy8gTG9nb1xuICAgIHRoZW1lTG9nb1dyYXBwZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBpZiAodGhlbWVTY2hvb2xvZ3lQbHVzTG9nby5jaGVja2VkKSB7XG4gICAgICAgIHRoZW1lLmxvZ28gPSBuZXcgdGhlbWVfbW9kZWxfMS5UaGVtZUxvZ28odW5kZWZpbmVkLCBcInNjaG9vbG9neV9wbHVzXCIpO1xuICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwiYmFja2dyb3VuZC11cmxcIiwgYHVybCgke3NjaG9vbG9neVBsdXNMb2dvSW1hZ2VVcmx9KWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGVtZVNjaG9vbG9neUxvZ28uY2hlY2tlZCkge1xuICAgICAgICB0aGVtZS5sb2dvID0gbmV3IHRoZW1lX21vZGVsXzEuVGhlbWVMb2dvKHVuZGVmaW5lZCwgXCJzY2hvb2xvZ3lfbG9nb1wiKTtcbiAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShcImJhY2tncm91bmQtdXJsXCIsIGB1cmwoJHtzY2hvb2xvZ3lMb2dvSW1hZ2VVcmx9KWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGVtZUxBVVNETG9nbzIwMjIuY2hlY2tlZCkge1xuICAgICAgICB0aGVtZS5sb2dvID0gbmV3IHRoZW1lX21vZGVsXzEuVGhlbWVMb2dvKHVuZGVmaW5lZCwgXCJsYXVzZF8yMDIyXCIpO1xuICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwiYmFja2dyb3VuZC11cmxcIiwgYHVybCgke2xhdXNkMjAyMkltYWdlVXJsfSlgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhlbWVOZXdMQVVTRExvZ28uY2hlY2tlZCkge1xuICAgICAgICB0aGVtZS5sb2dvID0gbmV3IHRoZW1lX21vZGVsXzEuVGhlbWVMb2dvKHVuZGVmaW5lZCwgXCJsYXVzZF8yMDE5XCIpO1xuICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwiYmFja2dyb3VuZC11cmxcIiwgYHVybCgke2xhdXNkMjAxOUltYWdlVXJsfSlgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhlbWVMQVVTRExvZ28uY2hlY2tlZCkge1xuICAgICAgICB0aGVtZS5sb2dvID0gbmV3IHRoZW1lX21vZGVsXzEuVGhlbWVMb2dvKHVuZGVmaW5lZCwgXCJsYXVzZF9sZWdhY3lcIik7XG4gICAgICAgICgwLCBkb21fMS5zZXRDU1NWYXJpYWJsZSkoXCJiYWNrZ3JvdW5kLXVybFwiLCBgdXJsKCR7bGF1c2RMZWdhY3lJbWFnZVVybH0pYCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoZW1lRGVmYXVsdExvZ28uY2hlY2tlZCkge1xuICAgICAgICB0aGVtZS5sb2dvID0gbmV3IHRoZW1lX21vZGVsXzEuVGhlbWVMb2dvKHVuZGVmaW5lZCwgXCJkZWZhdWx0XCIpO1xuICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwiYmFja2dyb3VuZC11cmxcIiwgYHVybCgke3BsYWNlaG9sZGVyVXJsfSlgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhlbWVDdXN0b21Mb2dvLmNoZWNrZWQpIHtcbiAgICAgICAgdGhlbWVMb2dvV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICBpZiAodGhlbWVMb2dvLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGVtZS5sb2dvID0gbmV3IHRoZW1lX21vZGVsXzEuVGhlbWVMb2dvKHRoZW1lTG9nby52YWx1ZSk7XG4gICAgICAgICAgICBjaGVja0ltYWdlKHRoZW1lTG9nby52YWx1ZSwgeCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IHgudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmIChpbWcud2lkdGggIT0gMTYwIHx8IGltZy5oZWlnaHQgPCAzNiB8fCBpbWcuaGVpZ2h0ID4gNjApIHtcbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ3MucHVzaChcIkxvZ28gaW1hZ2UgaXMgbm90IGJldHdlZW4gdGhlIHJlY29tbWVuZGVkIHNpemVzIG9mIDE2MHgzNiBhbmQgMTYweDYwXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwiYmFja2dyb3VuZC11cmxcIiwgYHVybCgke3RoZW1lTG9nby52YWx1ZX0pYCk7XG4gICAgICAgICAgICB9LCAoKSA9PiBlcnJvcnMucHVzaChcIkxvZ28gVVJMIGRvZXMgbm90IHBvaW50IHRvIGEgdmFsaWQgaW1hZ2VcIikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJObyBsb2dvIFVSTCBpcyBzcGVjaWZpZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQ3Vyc29yXG4gICAgaWYgKHRoZW1lQ3Vyc29yLnZhbHVlKSB7XG4gICAgICAgIHRoZW1lLmN1cnNvciA9IG5ldyB0aGVtZV9tb2RlbF8xLlRoZW1lQ3Vyc29yKHRoZW1lQ3Vyc29yLnZhbHVlKTtcbiAgICAgICAgY2hlY2tJbWFnZSh0aGVtZUN1cnNvci52YWx1ZSwgeCA9PiB7XG4gICAgICAgICAgICBsZXQgaW1nID0geC50YXJnZXQ7XG4gICAgICAgICAgICBpZiAoaW1nLndpZHRoID4gMTI4IHx8IGltZy5oZWlnaHQgPiAxMjgpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChcIkN1cnNvciBpbWFnZXMgbXVzdCBiZSBzbWFsbGVyIHRoYW4gMTI4eDEyOCB0byBhcHBlYXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwiY3Vyc29yXCIsIGB1cmwoJHt0aGVtZUN1cnNvci52YWx1ZX0pLCBhdXRvYCk7XG4gICAgICAgIH0sICgpID0+IGVycm9ycy5wdXNoKFwiQ3Vyc29yIFVSTCBkb2VzIG5vdCBwb2ludCB0byBhIHZhbGlkIGltYWdlXCIpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICgwLCBkb21fMS5zZXRDU1NWYXJpYWJsZSkoXCJjdXJzb3JcIiwgXCJhdXRvXCIpO1xuICAgIH1cbiAgICAvLyBJY29uc1xuICAgIGlmIChpY29uTGlzdFRhYmxlLnJvd3MubGVuZ3RoID4gMSkge1xuICAgICAgICBsZXQgY3VzdG9tSWNvbnMgPSBbXTtcbiAgICAgICAgbGV0IGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgcm93IG9mIGljb25MaXN0VGFibGUucm93cykge1xuICAgICAgICAgICAgaWYgKGZpcnN0IHx8ICFyb3cuY2VsbHNbMV0udGV4dENvbnRlbnQgfHwgIXJvdy5jZWxsc1syXS50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcGF0dGVybiA9IHJvdy5jZWxsc1sxXS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGxldCB1cmwgPSByb3cuY2VsbHNbMl0udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjaGVja0ltYWdlKHVybCwgdW5kZWZpbmVkLCAoKSA9PiBlcnJvcnMucHVzaCh1cmwgKyBcIiBpcyBub3QgYSB2YWxpZCBpbWFnZSBVUkwgKENvdXJzZSBJY29ucylcIikpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBSZWdFeHAocGF0dGVybik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChwYXR0ZXJuICsgXCIgaXMgbm90IGEgdmFsaWQgcmVndWxhciBleHByZXNzaW9uIChDb3Vyc2UgSWNvbnMpXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VzdG9tSWNvbnMucHVzaChuZXcgdGhlbWVfbW9kZWxfMS5UaGVtZUljb24ocGF0dGVybiwgdXJsKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhlbWUuaWNvbnMgPSBjdXN0b21JY29ucztcbiAgICB9XG4gICAgdXBkYXRlUHJldmlldygpO1xufVxuLyoqXG4gKiBVcGRhdGUgdGhlIHRoZW1lIHByZXZpZXcgYW5kIG9wdGlvbmFsbHkgdGhlIHRoZW1lIEpTT05cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdXBkYXRlSlNPTiBXaGV0aGVyIG9yIG5vdCB0byByZXBsYWNlIHRoZSBKU09OIG91dHB1dCB3aXRoIGZvcm0gdmFsdWVzXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVByZXZpZXcodXBkYXRlSlNPTiA9IHRydWUpIHtcbiAgICBpZiAodXBkYXRlSlNPTilcbiAgICAgICAgb3V0cHV0LnZhbHVlID0gSlNPTi5zdHJpbmdpZnkodGhlbWUsIG51bGwsIDQpO1xuICAgIGxldCB3YXJuaW5nQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2FybmluZy1jYXJkXCIpO1xuICAgIGlmICh3YXJuaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHdhcm5pbmdDYXJkLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2FybmluZy1jb250ZW50XCIpLmlubmVySFRNTCA9IHdhcm5pbmdzLmpvaW4oXCI8YnIvPlwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHdhcm5pbmdDYXJkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gICAgbGV0IGVycm9yQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3ItY2FyZFwiKTtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDAgJiYgaW5FZGl0TW9kZSgpKSB7XG4gICAgICAgIGVycm9yQ2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLWNvbnRlbnRcIikuaW5uZXJIVE1MID0gZXJyb3JzLmpvaW4oXCI8YnIvPlwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGVycm9yQ2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIG1hdGVyaWFsaXplX2Nzc18xLmRlZmF1bHQudXBkYXRlVGV4dEZpZWxkcygpO1xuICAgIG1hdGVyaWFsaXplX2Nzc18xLmRlZmF1bHQudGV4dGFyZWFBdXRvUmVzaXplKG91dHB1dCk7XG4gICAgaWNvblByZXZpZXcoKTtcbn1cbmZ1bmN0aW9uIHRyeVNhdmVUaGVtZShhcHBseSA9IGZhbHNlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgc2F2ZVRoZW1lKGFwcGx5KTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBhbGVydChlcnIpO1xuICAgIH1cbn1cbi8qKlxuICogU2F2ZXMgdGhlIHRoZW1lIGN1cnJlbnRseSBkaXNwbGF5ZWQgaW4gdGhlIHByZXZpZXcgd2l0aCB0aGUgZ2l2ZW4gbmFtZS5cbiAqIElmIHRoZSBxdWVyeXN0cmluZyBwYXJhbWV0ZXIgYHRoZW1lYCBleGlzdHMsIGl0IHdpbGwgcmVuYW1lIHRoZSB0aGVtZSB3aXRoIHRoYXQgdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FwcGx5PWZhbHNlXSBJZiB0cnVlLCBhcHBsaWVzIHRoZSB0aGVtZSBhbmQgcmV0dXJucyB0byBkZWZhdWx0RG9tYWluXG4gKi9cbmZ1bmN0aW9uIHNhdmVUaGVtZShhcHBseSA9IGZhbHNlLCBpbXBvcnRlZCA9IGZhbHNlLCByYXdUaGVtZSkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZml4IGFsbCBlcnJvcnMgYmVmb3JlIHNhdmluZyB0aGUgdGhlbWU6XFxuXCIgKyBlcnJvcnMuam9pbihcIlxcblwiKSk7XG4gICAgbGV0IHQgPSByYXdUaGVtZSAhPT0gbnVsbCAmJiByYXdUaGVtZSAhPT0gdm9pZCAwID8gcmF3VGhlbWUgOiBKU09OLnBhcnNlKG91dHB1dC52YWx1ZSk7XG4gICAgaWYgKG9yaWdUaGVtZU5hbWUgJiYgdC5uYW1lICE9IG9yaWdUaGVtZU5hbWUpIHtcbiAgICAgICAgQ29uZmlybU1vZGFsLm9wZW4oXCJSZW5hbWUgVGhlbWU/XCIsIGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVuYW1lIFwiJHtvcmlnVGhlbWVOYW1lfVwiIHRvIFwiJHt0Lm5hbWV9XCI/YCwgW1wiUmVuYW1lXCIsIFwiQ2FuY2VsXCJdLCBiID0+IGIgPT09IFwiUmVuYW1lXCIgJiYgZG9TYXZlKHQpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICgwLCBhbmFseXRpY3NfMS50cmFja0V2ZW50KShcInBlcmZvcm1fYWN0aW9uXCIsIHtcbiAgICAgICAgICAgIGlkOiBcImNvbG9yX3R5cGVcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IFwiTmV3IFRoZW1lIENyZWF0ZWRcIixcbiAgICAgICAgICAgIHZhbHVlOiBPYmplY3Qua2V5cyh0LmNvbG9yKS5maW5kKGsgPT4gayAhPT0gXCJtb2Rlcm5cIiksXG4gICAgICAgICAgICBsZWdhY3lUYXJnZXQ6IFwiY29sb3JfdHlwZVwiLFxuICAgICAgICAgICAgbGVnYWN5QWN0aW9uOiBPYmplY3Qua2V5cyh0LmNvbG9yKS5maW5kKGsgPT4gayAhPT0gXCJtb2Rlcm5cIiksXG4gICAgICAgICAgICBsZWdhY3lMYWJlbDogXCJOZXcgVGhlbWUgQ3JlYXRlZFwiLFxuICAgICAgICB9KTtcbiAgICAgICAgKDAsIGFuYWx5dGljc18xLnRyYWNrRXZlbnQpKFwicGVyZm9ybV9hY3Rpb25cIiwge1xuICAgICAgICAgICAgaWQ6IFwibG9nb190eXBlXCIsXG4gICAgICAgICAgICBjb250ZXh0OiBcIk5ldyBUaGVtZSBDcmVhdGVkXCIsXG4gICAgICAgICAgICB2YWx1ZTogKChfYSA9IHQgPT09IG51bGwgfHwgdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdC5sb2dvKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHJlc2V0KSB8fCBcImN1c3RvbVwiLFxuICAgICAgICAgICAgbGVnYWN5VGFyZ2V0OiBcImxvZ29fdHlwZVwiLFxuICAgICAgICAgICAgbGVnYWN5QWN0aW9uOiAoKF9iID0gdCA9PT0gbnVsbCB8fCB0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0LmxvZ28pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wcmVzZXQpIHx8IFwiY3VzdG9tXCIsXG4gICAgICAgICAgICBsZWdhY3lMYWJlbDogXCJOZXcgVGhlbWUgQ3JlYXRlZFwiLFxuICAgICAgICB9KTtcbiAgICAgICAgKDAsIGFuYWx5dGljc18xLnRyYWNrRXZlbnQpKFwicGVyZm9ybV9hY3Rpb25cIiwge1xuICAgICAgICAgICAgaWQ6IFwiY3Vyc29yX3R5cGVcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IFwiTmV3IFRoZW1lIENyZWF0ZWRcIixcbiAgICAgICAgICAgIHZhbHVlOiB0LmN1cnNvciA/IFwicHJpbWFyeVwiIDogXCJub25lXCIsXG4gICAgICAgICAgICBsZWdhY3lUYXJnZXQ6IFwiY3Vyc29yX3R5cGVcIixcbiAgICAgICAgICAgIGxlZ2FjeUFjdGlvbjogdC5jdXJzb3IgPyBcInByaW1hcnlcIiA6IFwibm9uZVwiLFxuICAgICAgICAgICAgbGVnYWN5TGFiZWw6IFwiTmV3IFRoZW1lIENyZWF0ZWRcIixcbiAgICAgICAgfSk7XG4gICAgICAgICgwLCBhbmFseXRpY3NfMS50cmFja0V2ZW50KShcInBlcmZvcm1fYWN0aW9uXCIsIHtcbiAgICAgICAgICAgIGlkOiBcIm1vZGVybl9lbmFibGVkXCIsXG4gICAgICAgICAgICBjb250ZXh0OiBcIk5ldyBUaGVtZSBDcmVhdGVkXCIsXG4gICAgICAgICAgICB2YWx1ZTogU3RyaW5nKCEhdC5jb2xvci5tb2Rlcm4pLFxuICAgICAgICAgICAgbGVnYWN5VGFyZ2V0OiBcIm1vZGVybl9lbmFibGVkXCIsXG4gICAgICAgICAgICBsZWdhY3lBY3Rpb246IFN0cmluZyghIXQuY29sb3IubW9kZXJuKSxcbiAgICAgICAgICAgIGxlZ2FjeUxhYmVsOiBcIk5ldyBUaGVtZSBDcmVhdGVkXCIsXG4gICAgICAgIH0pO1xuICAgICAgICAoMCwgYW5hbHl0aWNzXzEudHJhY2tFdmVudCkoXCJwZXJmb3JtX2FjdGlvblwiLCB7XG4gICAgICAgICAgICBpZDogXCJwcmVzZXRcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IFwiTmV3IFRoZW1lIENyZWF0ZWRcIixcbiAgICAgICAgICAgIHZhbHVlOiBpbXBvcnRlZCA/IFwiSW1wb3J0ZWRcIiA6IGxhc3RTZWxlY3RlZFRlbXBsYXRlICE9PSBudWxsICYmIGxhc3RTZWxlY3RlZFRlbXBsYXRlICE9PSB2b2lkIDAgPyBsYXN0U2VsZWN0ZWRUZW1wbGF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGxlZ2FjeVRhcmdldDogXCJwcmVzZXRcIixcbiAgICAgICAgICAgIGxlZ2FjeUFjdGlvbjogaW1wb3J0ZWQgPyBcIkltcG9ydGVkXCIgOiBsYXN0U2VsZWN0ZWRUZW1wbGF0ZSAhPT0gbnVsbCAmJiBsYXN0U2VsZWN0ZWRUZW1wbGF0ZSAhPT0gdm9pZCAwID8gbGFzdFNlbGVjdGVkVGVtcGxhdGUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBsZWdhY3lMYWJlbDogXCJOZXcgVGhlbWUgQ3JlYXRlZFwiLFxuICAgICAgICB9KTtcbiAgICAgICAgZG9TYXZlKHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkb1NhdmUodCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgcyA9IHlpZWxkIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHsgdGhlbWVzOiBbXSB9KTtcbiAgICAgICAgICAgICAgICBsZXQgdGhlbWVzID0gcy50aGVtZXMuZmlsdGVyKCh4KSA9PiB4Lm5hbWUgIT0gKG9yaWdUaGVtZU5hbWUgfHwgdC5uYW1lKSk7XG4gICAgICAgICAgICAgICAgdGhlbWVzLnB1c2godCk7XG4gICAgICAgICAgICAgICAgeWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyB0aGVtZXM6IHRoZW1lcyB9KTtcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIENvbmZpcm1Nb2RhbC5vcGVuKFwiVGhlbWUgc2F2ZWQgc3VjY2Vzc2Z1bGx5XCIsIFwiXCIsIFtcIk9LXCJdLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdUaGVtZU5hbWUgPSB0Lm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcHBseSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgdGhlbWU6IHQubmFtZSB9LCAoKSA9PiAobG9jYXRpb24uaHJlZiA9IGBodHRwczovLyR7ZGVmYXVsdERvbWFpbn1gKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYSA9IGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5jbHVkZXMoXCJRVU9UQV9CWVRFU19QRVJfSVRFTVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJObyBzcGFjZSByZW1haW5pbmcgdG8gc2F2ZSB0aGVtZS4gUGxlYXNlIGRlbGV0ZSBhbm90aGVyIHRoZW1lIG9yIG1ha2UgdGhpcyB0aGVtZSBzbWFsbGVyIGluIG9yZGVyIHRvIHNhdmUuIE1vc3QgY29tbW9ubHkgdGhlbWVzIGFyZSB0b28gbGFyZ2UgaWYgdGhleSBoYXZlIHRvbyBtYW55IGN1c3RvbSBpY29ucy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzcGFjZSByZW1haW5pbmcgdG8gc2F2ZSB0aGVtZS4gUGxlYXNlIGRlbGV0ZSBhbm90aGVyIHRoZW1lIG9yIG1ha2UgdGhpcyB0aGVtZSBzbWFsbGVyIGluIG9yZGVyIHRvIHNhdmUuIE1vc3QgY29tbW9ubHkgdGhlbWVzIGFyZSB0b28gbGFyZ2UgaWYgdGhleSBoYXZlIHRvbyBtYW55IGN1c3RvbSBpY29ucy5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogUmV0dXJucyBhIHZhbGlkIENTUyBjb2xvciBzdHJpbmcgaWYgaW5wdXQgaXMgdmFsaWQsIGVsc2UgcmV0dXJucyBhbiBlbXB0eSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBjIEEgcG9zc2libHkgdmFsaWQgQ1NTIGNvbG9yIHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gQSB2YWxpZCBDU1MgY29sb3Igc3RyaW5nIG9yIGBcIlwiYCBpZiBpbnB1dCB3YXMgaW52YWxpZFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNvbG9yKGMpIHtcbiAgICB2YXIgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlbGUuc3R5bGUuY29sb3IgPSBjO1xuICAgIHJldHVybiBlbGUuc3R5bGUuY29sb3Iuc3BsaXQoL1xccysvKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG59XG4vKipcbiAqIENoZWNrcyBpZiBhIFVSTCBwb2ludHMgdG8gYSB2YWxpZCBpbWFnZVxuICogQHBhcmFtIHtzdHJpbmd9IGltYWdlU3JjIEFuIGltYWdlIFVSTFxuICogQHBhcmFtIHsoRXZlbnQpfSB2YWxpZENhbGxiYWNrIENhbGxiYWNrIGlmIGltYWdlIGlzIHZhbGlkXG4gKiBAcGFyYW0geyhFcnJvckV2ZW50KX0gaW52YWxpZENhbGxiYWNrIENhbGxiYWNrIGlmIGltYWdlIGlzIGludmFsaWRcbiAqL1xuZnVuY3Rpb24gY2hlY2tJbWFnZShpbWFnZVNyYywgdmFsaWRDYWxsYmFjaywgaW52YWxpZENhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpZiAodmFsaWRDYWxsYmFjaylcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSB2YWxpZENhbGxiYWNrO1xuICAgICAgICBpZiAoaW52YWxpZENhbGxiYWNrKVxuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSBpbnZhbGlkQ2FsbGJhY2s7XG4gICAgICAgIGltZy5zcmMgPSBpbWFnZVNyYztcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIGludmFsaWRDYWxsYmFjayA9PT0gbnVsbCB8fCBpbnZhbGlkQ2FsbGJhY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGludmFsaWRDYWxsYmFjaygpO1xuICAgIH1cbn1cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RyaW5nIGlzIGEgdmFsaWQgSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgQSBKU09OIHN0cmluZ1xuICogQHJldHVybnMge3t9fGJvb2xlYW59IFRoZSBvYmplY3QgaWYgaXQgaXMgdmFsaWQgSlNPTiwgZWxzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBwYXJzZUpTT05PYmplY3Qoc3RyKSB7XG4gICAgdmFyIGlzT2JqZWN0ID0gKHZhbCkgPT4gKHZhbCBpbnN0YW5jZW9mIE9iamVjdCA/IHRydWUgOiBmYWxzZSk7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IG8gPSBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgIHJldHVybiBpc09iamVjdChvKSA/IG8gOiBmYWxzZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbi8qKlxuICogQXBwbGllcyB0aGUgdGhlbWUgd2l0aCB0aGUgZ2l2ZW4gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHQgVGhlIHRoZW1lJ3MgbmFtZVxuICovXG5mdW5jdGlvbiBhcHBseVRoZW1lKHQpIHtcbiAgICBpbXBvcnRBbmRSZW5kZXIoYWxsVGhlbWVzW3RdKTtcbn1cbi8qKlxuICogRGVsZXRlcyBhIHRoZW1lIHdpdGggdGhlIGdpdmVuIG5hbWUgZnJvbSB0aGUgQ2hyb21lIFN5bmMgU3RvcmFnZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIHRoZW1lJ3MgbmFtZVxuICovXG5mdW5jdGlvbiBkZWxldGVUaGVtZShuYW1lKSB7XG4gICAgQ29uZmlybU1vZGFsLm9wZW4oXCJEZWxldGUgVGhlbWU/XCIsIGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSB0aGVtZSBcIiR7bmFtZX1cIj9cXG5UaGUgcGFnZSB3aWxsIHJlbG9hZCB3aGVuIHRoZSB0aGVtZSBpcyBkZWxldGVkLmAsIFtcIkRlbGV0ZVwiLCBcIkNhbmNlbFwiXSwgKGIpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKGIgPT09IFwiRGVsZXRlXCIpIHtcbiAgICAgICAgICAgICgwLCBhbmFseXRpY3NfMS50cmFja0V2ZW50KShcImJ1dHRvbl9jbGlja1wiLCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZGVsZXRlLXRoZW1lXCIsXG4gICAgICAgICAgICAgICAgY29udGV4dDogXCJUaGVtZSBMaXN0XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgbGVnYWN5VGFyZ2V0OiBgVGhlbWU6ICR7bmFtZX1gLFxuICAgICAgICAgICAgICAgIGxlZ2FjeUFjdGlvbjogXCJkZWxldGVcIixcbiAgICAgICAgICAgICAgICBsZWdhY3lMYWJlbDogXCJUaGVtZSBMaXN0XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBzID0geWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW1widGhlbWVcIiwgXCJ0aGVtZXNcIl0pO1xuICAgICAgICAgICAgeWllbGQgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1xuICAgICAgICAgICAgICAgIHRoZW1lOiBzLnRoZW1lID09IG5hbWUgPyBudWxsIDogcy50aGVtZSxcbiAgICAgICAgICAgICAgICB0aGVtZXM6IHMudGhlbWVzLmZpbHRlcigoeCkgPT4geC5uYW1lICE9IG5hbWUpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICB9KSk7XG59XG4vKipcbiAqIE9wZW5zIHRoZSBlZGl0b3IgaW50ZXJmYWNlIHdpdGggdGhlIGdpdmVuIHRoZW1lIHNlbGVjdGVkLCBvclxuICogbm9uZSBzZWxlY3RlZCBpZiBuYW1lIG5vdCBwcm92aWRlZFxuICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lXSBUaGUgdGhlbWUgdG8gZWRpdFxuICovXG5mdW5jdGlvbiBlZGl0VGhlbWUobmFtZSwgcmVwbGFjZU5hbWUpIHtcbiAgICBpZiAocmVwbGFjZU5hbWUpIHtcbiAgICAgICAgbGFzdFNlbGVjdGVkVGVtcGxhdGUgPSBuYW1lO1xuICAgIH1cbiAgICAoMCwgYW5hbHl0aWNzXzEudHJhY2tFdmVudCkoXCJidXR0b25fY2xpY2tcIiwge1xuICAgICAgICBpZDogXCJlZGl0LXRoZW1lXCIsXG4gICAgICAgIGNvbnRleHQ6IFwiVGhlbWUgTGlzdFwiLFxuICAgICAgICB2YWx1ZTogbmFtZSxcbiAgICAgICAgbGVnYWN5VGFyZ2V0OiBgVGhlbWU6ICR7bmFtZX1gLFxuICAgICAgICBsZWdhY3lBY3Rpb246IFwiZWRpdFwiLFxuICAgICAgICBsZWdhY3lMYWJlbDogXCJUaGVtZSBMaXN0XCIsXG4gICAgfSk7XG4gICAgY2xlYXJJbnRlcnZhbChyYWluYm93SW50ZXJ2YWwpO1xuICAgIHRoZW1lc0xpc3RTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgdGhlbWVFZGl0b3JTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgbGV0IHRoZW1lVG9Mb2FkID0gbmFtZSA/IGFsbFRoZW1lc1tuYW1lXSA6IHsgbmFtZTogXCJNeSBUaGVtZVwiLCBodWU6IDIxMCB9O1xuICAgIGlmIChyZXBsYWNlTmFtZSkge1xuICAgICAgICB0aGVtZVRvTG9hZC5uYW1lID0gcmVwbGFjZU5hbWU7XG4gICAgfVxuICAgIGltcG9ydEFuZFJlbmRlcih0aGVtZVRvTG9hZCk7XG4gICAgcHJldmlld1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcInNob3ctZWRpdG9yLWNvbnRyb2xzXCIpO1xuICAgIG91dHB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKTtcbiAgICBBcnJheS5mcm9tKGljb25MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2xhc3MtbmFtZSwgLmljb24tdXJsXCIpKS5tYXAoeCA9PiB4LnNldEF0dHJpYnV0ZShcImNvbnRlbnRlZGl0YWJsZVwiLCBcInRydWVcIikpO1xuICAgIG9yaWdUaGVtZU5hbWUgPSByZXBsYWNlTmFtZSB8fCBuYW1lO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjanNvbi1vdXRwdXQgKyBsYWJlbFwiKS50ZXh0Q29udGVudCA9IFwiSlNPTiAoUGFzdGUgdG8gaW1wb3J0IGEgdGhlbWUpXCI7XG59XG4vKipcbiAqIE9wZW5zIGEgbW9kYWwgYWxsb3dpbmcgdXNlciB0byBwYXN0ZSBhIEpTT04gdGhlbWUgc3RyaW5nXG4gKiBhbmQgdGhlbiBzYXZlcyB0aGUgcHJvdmlkZWQgdGhlbWVcbiAqL1xuZnVuY3Rpb24gaW1wb3J0VGhlbWUoKSB7XG4gICAgUHJvbXB0TW9kYWwub3BlbihcIkltcG9ydCBUaGVtZVwiLCBcIlBhc3RlIHRoZW1lIEpTT04gaGVyZVwiLCBbXCJJbXBvcnRcIiwgXCJDYW5jZWxcIl0sIChidXR0b24sIHRleHQpID0+IHtcbiAgICAgICAgaWYgKGJ1dHRvbiA9PT0gXCJJbXBvcnRcIikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgaiA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICAgICAgICAgICAgaW1wb3J0QW5kUmVuZGVyKGopO1xuICAgICAgICAgICAgICAgIHNhdmVUaGVtZShmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgICAgICBDb25maXJtTW9kYWwub3BlbihcIkVycm9yIEltcG9ydGluZyBUaGVtZVwiLCBlcnJvcnMubGVuZ3RoID4gMCA/IGVycm9ycy5qb2luKCkgOiBcIlBsZWFzZSBwcm92aWRlIGEgdmFsaWQgSlNPTiBzdHJpbmdcIiwgW1wiT0tcIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgXCJpbXBvcnQtdGhlbWVcIik7XG59XG4vKipcbiAqIEN5Y2xlcyB0aGUgY29sb3Igb2YgdGhlIGludGVyZmFjZVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVJhaW5ib3dGdW5jdGlvbih0aGVtZSkge1xuICAgIGlmICh0aGVtZS5jb2xvci5yYWluYm93KSB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sLCBfbSwgX28sIF9wLCBfcTtcbiAgICAgICAgICAgIGxldCBodWUgPSAwO1xuICAgICAgICAgICAgbGV0IHNhdHVyYXRpb24gPSAwO1xuICAgICAgICAgICAgbGV0IGxpZ2h0bmVzcyA9IDA7XG4gICAgICAgICAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuICAgICAgICAgICAgLy8gRXF1YXRpb24gZm9yIHRpbWUtYmFzZWQgaHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3M6XG4gICAgICAgICAgICAvLyBodWUgPSAoKCh0aW1lIC8gKDE1MCAtIHNwZWVkKSkgKyBvZmZzZXQpICUgKGFsdGVybmF0ZSA/IHJhbmdlICogMiA6IHJhbmdlKSkgKyBtaW5cbiAgICAgICAgICAgIC8vIGlmIGFsdGVybmF0ZSBhbmQgaHVlID4gbWF4OiBodWUgPSBtYXggLSAoaHVlIC0gbWF4KVxuICAgICAgICAgICAgaWYgKChfYiA9IChfYSA9IHRoZW1lLmNvbG9yLnJhaW5ib3cpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5odWUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hbmltYXRlKSB7XG4gICAgICAgICAgICAgICAgbGV0IG8gPSB0aGVtZS5jb2xvci5yYWluYm93Lmh1ZS5hbmltYXRlO1xuICAgICAgICAgICAgICAgIGlmIChvLm1heCA8IG8ubWluKSB7XG4gICAgICAgICAgICAgICAgICAgIG8ubWF4ICs9IDM2MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaHVlID0gZ2V0Q29tcG9uZW50VmFsdWUobywgdGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBodWUgPSAoX2UgPSAoX2QgPSAoX2MgPSB0aGVtZS5jb2xvci5yYWluYm93KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaHVlKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudmFsdWUpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IDIxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoX2cgPSAoX2YgPSB0aGVtZS5jb2xvci5yYWluYm93KSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Yuc2F0dXJhdGlvbikgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLmFuaW1hdGUpIHtcbiAgICAgICAgICAgICAgICBzYXR1cmF0aW9uID0gZ2V0Q29tcG9uZW50VmFsdWUodGhlbWUuY29sb3IucmFpbmJvdy5zYXR1cmF0aW9uLmFuaW1hdGUsIHRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2F0dXJhdGlvbiA9IChfayA9IChfaiA9IChfaCA9IHRoZW1lLmNvbG9yLnJhaW5ib3cpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5zYXR1cmF0aW9uKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2oudmFsdWUpICE9PSBudWxsICYmIF9rICE9PSB2b2lkIDAgPyBfayA6IDEwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoX20gPSAoX2wgPSB0aGVtZS5jb2xvci5yYWluYm93KSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wubGlnaHRuZXNzKSA9PT0gbnVsbCB8fCBfbSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX20uYW5pbWF0ZSkge1xuICAgICAgICAgICAgICAgIGxpZ2h0bmVzcyA9IGdldENvbXBvbmVudFZhbHVlKHRoZW1lLmNvbG9yLnJhaW5ib3cubGlnaHRuZXNzLmFuaW1hdGUsIHRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGlnaHRuZXNzID0gKF9xID0gKF9wID0gKF9vID0gdGhlbWUuY29sb3IucmFpbmJvdykgPT09IG51bGwgfHwgX28gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vLmxpZ2h0bmVzcykgPT09IG51bGwgfHwgX3AgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9wLnZhbHVlKSAhPT0gbnVsbCAmJiBfcSAhPT0gdm9pZCAwID8gX3EgOiAxMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLWNvbG9yLWh1ZVwiLCBodWUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAoMCwgZG9tXzEuc2V0Q1NTVmFyaWFibGUpKFwicHJpbWFyeS1jb2xvclwiLCBgaHNsKHZhcigtLWNvbG9yLWh1ZSksICR7c2F0dXJhdGlvbn0lLCAke2xpZ2h0bmVzc30lKWApO1xuICAgICAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShcImJhY2tncm91bmQtY29sb3JcIiwgXCJoc2wodmFyKC0tY29sb3ItaHVlKSwgNjAlLCAzMCUpXCIpO1xuICAgICAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShcImhvdmVyLWNvbG9yXCIsIFwiaHNsKHZhcigtLWNvbG9yLWh1ZSksIDU1JSwgNDAlKVwiKTtcbiAgICAgICAgICAgICgwLCBkb21fMS5zZXRDU1NWYXJpYWJsZSkoXCJib3JkZXItY29sb3JcIiwgXCJoc2wodmFyKC0tY29sb3ItaHVlKSwgNjAlLCAyNSUpXCIpO1xuICAgICAgICAgICAgKDAsIGRvbV8xLnNldENTU1ZhcmlhYmxlKShcImxpbmstY29sb3JcIiwgXCJoc2wodmFyKC0tY29sb3ItaHVlKSwgNTUlLCA0MCUpXCIpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGZ1bmN0aW9uIGdldENvbXBvbmVudFZhbHVlKGFuaW1hdGVPYmplY3QsIHRpbWUpIHtcbiAgICAgICAgbGV0IHsgc3BlZWQsIG9mZnNldCwgYWx0ZXJuYXRlLCBtaW4sIG1heCB9ID0gYW5pbWF0ZU9iamVjdDtcbiAgICAgICAgbGV0IHJhbmdlID0gbWF4IC0gbWluO1xuICAgICAgICBsZXQgdiA9ICgodGltZSAvICgxNTAgLSBzcGVlZCkgKyArb2Zmc2V0KSAlIChhbHRlcm5hdGUgPyByYW5nZSAqIDIgOiByYW5nZSkpICsgbWluO1xuICAgICAgICBpZiAoYWx0ZXJuYXRlICYmIHYgPiBtYXgpIHtcbiAgICAgICAgICAgIHYgPSBtYXggLSAodiAtIG1heCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkSWNvbigpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xuICAgICgwLCBhbmFseXRpY3NfMS50cmFja0V2ZW50KShcImJ1dHRvbl9jbGlja1wiLCB7XG4gICAgICAgIGlkOiBcImFkZC10aGVtZS1pY29uXCIsXG4gICAgICAgIGNvbnRleHQ6IFwiVGhlbWUgRWRpdG9yXCIsXG4gICAgICAgIGxlZ2FjeVRhcmdldDogXCJuZXctaWNvblwiLFxuICAgICAgICBsZWdhY3lBY3Rpb246IFwiY2xpY2tcIixcbiAgICAgICAgbGVnYWN5TGFiZWw6IFwiVGhlbWUgRWRpdG9yXCIsXG4gICAgfSk7XG4gICAgbGV0IHRlbXBsYXRlID0gYDx0ZCBzdHlsZT10ZXh0LWFsaWduOmNlbnRlcj48YSBjbGFzcz1cImFjdGlvbi1idXR0b24gdG9vbHRpcHBlZCBhcnJvdy1idXR0b24gbW92ZS1kb3duXCJkYXRhLXRvb2x0aXA9XCJNb3ZlIERvd25cIj48aSBjbGFzcz1tYXRlcmlhbC1pY29ucz5hcnJvd19kb3dud2FyZDwvaT4gPC9hPjxhIGNsYXNzPVwiYWN0aW9uLWJ1dHRvbiB0b29sdGlwcGVkIGFycm93LWJ1dHRvbiBtb3ZlLXVwXCJkYXRhLXRvb2x0aXA9XCJNb3ZlIFVwXCI+PGkgY2xhc3M9bWF0ZXJpYWwtaWNvbnM+YXJyb3dfdXB3YXJkPC9pPjwvYT48dGQgY2xhc3M9Y2xhc3MtbmFtZSBkYXRhLXRleHQ9XCJDbGFzcyBOYW1lIFBhdHRlcm5cIj48dGQgY2xhc3M9aWNvbi11cmwgZGF0YS10ZXh0PVwiSWNvbiBVUkxcIj48dGQ+PGltZyBjbGFzcz1cInNtYWxsLWljb24tcHJldmlld1wiIGhlaWdodD0zMi8+PC90ZD48dGQ+PGEgY2xhc3M9XCJhY3Rpb24tYnV0dG9uIHRvb2x0aXBwZWQgYnRuLWZsYXQgZGVsZXRlLWljb24tYnV0dG9uIHJpZ2h0IHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiZGF0YS10b29sdGlwPURlbGV0ZT48aSBjbGFzcz1tYXRlcmlhbC1pY29ucz5kZWxldGU8L2k+PC9hPmA7XG4gICAgbGV0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIHRyLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgIGljb25MaXN0LmFwcGVuZENoaWxkKHRyKTtcbiAgICBsZXQgcHJldmlldyA9IHRyLnF1ZXJ5U2VsZWN0b3IoXCIuc21hbGwtaWNvbi1wcmV2aWV3XCIpO1xuICAgIChfYSA9IHRyLnF1ZXJ5U2VsZWN0b3IoXCIubW92ZS1kb3duXCIpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vdmVEb3duKTtcbiAgICAoX2IgPSB0ci5xdWVyeVNlbGVjdG9yKFwiLm1vdmUtdXBcIikpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW92ZVVwKTtcbiAgICAoX2MgPSB0ci5xdWVyeVNlbGVjdG9yKFwiLmRlbGV0ZS1pY29uLWJ1dHRvblwiKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVJY29uKTtcbiAgICAvLyBSZXBsYWNlcyBwYXN0ZWQgaW1hZ2VzIHdpdGggZGF0YSB1cmxzXG4gICAgLy8gUmVwbGFjZXMgcGFzdGVkIEhUTUwgd2l0aCBwbGFpbiB0ZXh0XG4gICAgKF9kID0gdHIucXVlcnlTZWxlY3RvcihcIi5jbGFzcy1uYW1lXCIpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuYWRkRXZlbnRMaXN0ZW5lcihcInBhc3RlXCIsIHBsYWluVGV4dFBhc3RlKTtcbiAgICAoX2UgPSB0ci5xdWVyeVNlbGVjdG9yKFwiLmljb24tdXJsXCIpKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGUgPT4gKHByZXZpZXcuc3JjID0gZS50YXJnZXQudGV4dENvbnRlbnQpKTtcbiAgICBBcnJheS5mcm9tKHRyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZFwiKSkubWFwKHggPT4geC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBlID0+IChlLnRhcmdldC5zY3JvbGxMZWZ0ID0gMCkpKTtcbiAgICBtYXRlcmlhbGl6ZV9jc3NfMS5kZWZhdWx0LlRvb2x0aXAuaW5pdCh0ci5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvb2x0aXBwZWRcIiksIHtcbiAgICAgICAgb3V0RHVyYXRpb246IDAsXG4gICAgICAgIGluRHVyYXRpb246IDMwMCxcbiAgICAgICAgZW50ZXJEZWxheTogMCxcbiAgICAgICAgZXhpdERlbGF5OiAxMCxcbiAgICB9KTtcbiAgICBpZiAoaW5FZGl0TW9kZSgpKSB7XG4gICAgICAgIGxldCBhcnIgPSBBcnJheS5mcm9tKHRyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2xhc3MtbmFtZSwgLmljb24tdXJsXCIpKTtcbiAgICAgICAgYXJyLm1hcCh4ID0+IHguc2V0QXR0cmlidXRlKFwiY29udGVudGVkaXRhYmxlXCIsIFwidHJ1ZVwiKSk7XG4gICAgICAgIGFyci5tYXAoeCA9PiB4LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVPdXRwdXQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRyO1xufVxuZnVuY3Rpb24gcGxhaW5UZXh0UGFzdGUoZSkge1xuICAgIHZhciBfYTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHRleHQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGUuY2xpcGJvYXJkRGF0YSB8fFxuICAgICAgICBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YSkge1xuICAgICAgICB0ZXh0ID0gKF9hID0gKGUub3JpZ2luYWxFdmVudCB8fCBlKS5jbGlwYm9hcmREYXRhKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQoXCJpbnNlcnRUZXh0XCIpKSB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiaW5zZXJ0VGV4dFwiLCBmYWxzZSwgdGV4dCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcInBhc3RlXCIsIGZhbHNlLCB0ZXh0KTtcbiAgICB9XG59XG5mdW5jdGlvbiBtb3ZlVXAoZSkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIHdoaWxlICgodGFyZ2V0ID09PSBudWxsIHx8IHRhcmdldCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGFyZ2V0LnRhZ05hbWUpICE9IFwiVFJcIilcbiAgICAgICAgdGFyZ2V0ID0gKF9hID0gdGFyZ2V0ID09PSBudWxsIHx8IHRhcmdldCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGFyZ2V0LnBhcmVudEVsZW1lbnQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IG51bGw7XG4gICAgaWYgKHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgIChfYiA9IHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRhcmdldC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaW5zZXJ0QmVmb3JlKHRhcmdldCwgdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpO1xuICAgIH1cbiAgICB1cGRhdGVPdXRwdXQoKTtcbn1cbmZ1bmN0aW9uIG1vdmVEb3duKGUpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICB3aGlsZSAoKHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRhcmdldC50YWdOYW1lKSAhPSBcIlRSXCIpXG4gICAgICAgIHRhcmdldCA9IChfYSA9IHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRhcmdldC5wYXJlbnRFbGVtZW50KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBudWxsO1xuICAgIGlmICh0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgIChfYiA9IHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRhcmdldC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaW5zZXJ0QmVmb3JlKHRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcsIHRhcmdldCk7XG4gICAgfVxuICAgIHVwZGF0ZU91dHB1dCgpO1xufVxuZnVuY3Rpb24gZGVsZXRlSWNvbihlKSB7XG4gICAgdmFyIF9hO1xuICAgICgwLCBhbmFseXRpY3NfMS50cmFja0V2ZW50KShcImJ1dHRvbl9jbGlja1wiLCB7XG4gICAgICAgIGlkOiBcImRlbGV0ZS10aGVtZS1pY29uXCIsXG4gICAgICAgIGNvbnRleHQ6IFwiVGhlbWUgRWRpdG9yXCIsXG4gICAgICAgIGxlZ2FjeVRhcmdldDogXCJkZWxldGUtaWNvbi1idXR0b25cIixcbiAgICAgICAgbGVnYWN5QWN0aW9uOiBcImNsaWNrXCIsXG4gICAgICAgIGxlZ2FjeUxhYmVsOiBcIlRoZW1lIEVkaXRvclwiLFxuICAgIH0pO1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICB3aGlsZSAoKHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRhcmdldC50YWdOYW1lKSAhPSBcIlRSXCIpXG4gICAgICAgIHRhcmdldCA9IChfYSA9IHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRhcmdldC5wYXJlbnRFbGVtZW50KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBudWxsO1xuICAgIG1hdGVyaWFsaXplX2Nzc18xLmRlZmF1bHQuVG9vbHRpcC5nZXRJbnN0YW5jZSh0YXJnZXQucXVlcnlTZWxlY3RvcihcIi5kZWxldGUtaWNvbi1idXR0b25cIikpLmRlc3Ryb3koKTtcbiAgICB0YXJnZXQub3V0ZXJIVE1MID0gXCJcIjtcbiAgICB1cGRhdGVPdXRwdXQoKTtcbn1cbmZ1bmN0aW9uIGljb25QcmV2aWV3KCkge1xuICAgIHRlc3RJY29uLnNyYyA9IChzID0+IHtcbiAgICAgICAgaWYgKCFzKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKFwiaW1ncy9mYWxsYmFjay1jb3Vyc2UtaWNvbi5zdmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgcyArPSBcIiBcIjtcbiAgICAgICAgaWYgKHRoZW1lICYmIHRoZW1lLmljb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpY29uUGF0dGVybiBvZiB0aGVtZS5pY29ucykge1xuICAgICAgICAgICAgICAgIGlmIChzLm1hdGNoKG5ldyBSZWdFeHAoaWNvblBhdHRlcm4ucmVnZXgsIFwiaVwiKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGljb25QYXR0ZXJuLnVybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTEFVU0QoKSB8fCBfX3N0b3JhZ2UudXNlRGVmYXVsdEljb25TZXQgPT09IFwiZW5hYmxlZFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpY29uUGF0dGVybiBvZiBkZWZhdWx0X2ljb25zXzEuREVGQVVMVF9JQ09OUykge1xuICAgICAgICAgICAgICAgIGlmIChzLm1hdGNoKG5ldyBSZWdFeHAoaWNvblBhdHRlcm4ucmVnZXgsIFwiaVwiKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGljb25QYXR0ZXJuLnVybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNocm9tZS5ydW50aW1lLmdldFVSTChcImltZ3MvZmFsbGJhY2stY291cnNlLWljb24uc3ZnXCIpO1xuICAgIH0pKGljb25UZXN0VGV4dC52YWx1ZSk7XG59XG5mdW5jdGlvbiBjb3B5VGhlbWVUb0NsaXBib2FyZCh0aGVtZU5hbWUpIHtcbiAgICAoMCwgYW5hbHl0aWNzXzEudHJhY2tFdmVudCkoXCJidXR0b25fY2xpY2tcIiwge1xuICAgICAgICBpZDogXCJjb3B5LXRoZW1lXCIsXG4gICAgICAgIGNvbnRleHQ6IFwiVGhlbWUgTGlzdFwiLFxuICAgICAgICB2YWx1ZTogdGhlbWVOYW1lLFxuICAgICAgICBsZWdhY3lUYXJnZXQ6IGBUaGVtZTogJHt0aGVtZU5hbWV9YCxcbiAgICAgICAgbGVnYWN5QWN0aW9uOiBcImNvcHlcIixcbiAgICAgICAgbGVnYWN5TGFiZWw6IFwiVGhlbWUgTGlzdFwiLFxuICAgIH0pO1xuICAgIGxldCB0ZXh0ID0gSlNPTi5zdHJpbmdpZnkoYWxsVGhlbWVzW3RoZW1lTmFtZV0pO1xuICAgIHZhciBjb3B5RnJvbSA9ICgwLCBqcXVlcnlfMS5kZWZhdWx0KShcIjx0ZXh0YXJlYS8+XCIpO1xuICAgIGNvcHlGcm9tLnRleHQodGV4dCk7XG4gICAgKDAsIGpxdWVyeV8xLmRlZmF1bHQpKFwiYm9keVwiKS5hcHBlbmQoY29weUZyb20pO1xuICAgIGNvcHlGcm9tLnNlbGVjdCgpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcbiAgICBjb3B5RnJvbS5yZW1vdmUoKTtcbiAgICBtYXRlcmlhbGl6ZV9jc3NfMS5kZWZhdWx0LnRvYXN0KHsgaHRtbDogYENvcGllZCB0aGVtZSBcIiR7dGhlbWVOYW1lfVwiIHRvIGNsaXBib2FyZGAgfSk7XG59XG5mdW5jdGlvbiBpbkVkaXRNb2RlKCkge1xuICAgIHJldHVybiAhIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hvdy1lZGl0b3ItY29udHJvbHNcIik7XG59XG5mdW5jdGlvbiBodG1sVG9FbGVtZW50KGh0bWwpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG4gICAgaHRtbCA9IGh0bWwudHJpbSgpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWw7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbn1cbmZ1bmN0aW9uIGh1ZVNsaWRlckV2ZW50KGV2ZW50LCB1aSkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgaWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQpIHtcbiAgICAgICAgdXBkYXRlT3V0cHV0KCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV2ZW50LnRhcmdldC5kYXRhc2V0LmRpc3BsYXkpLnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIChfYiA9IChfYSA9IHVpLnZhbHVlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogXCI8RVJSPlwiO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJhbmdlU2xpZGVyRXZlbnQoZXZlbnQsIHVpKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChldmVudC50YXJnZXQuaWQgKyBcIi1kaXNwbGF5XCIpLnRleHRDb250ZW50ID0gYCR7KF9hID0gdWkudmFsdWVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF19IC0gJHsoX2IgPSB1aS52YWx1ZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYlsxXX1gO1xuICAgICAgICB1cGRhdGVPdXRwdXQoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjaXJjbGVSYW5nZVNsaWRlckV2ZW50KCkge1xuICAgIHVwZGF0ZU91dHB1dCgpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUFuYWx5dGljcyA9IGV4cG9ydHMuZ2V0QW5hbHl0aWNzVXNlcklkID0gZXhwb3J0cy50cmFja0V2ZW50ID0gdm9pZCAwO1xuLyoqXG4gKiBUcmFja3MgYW4gZXZlbnQgdXNpbmcgR29vZ2xlIEFuYWx5dGljcyBpZiB0aGUgdXNlciBkaWQgbm90IG9wdCBvdXRcbiAqIE5PVEU6IFRoZSBGaXJlZm94IHZlcnNpb24gb2YgdGhlIGV4dGVuc2lvbiBoYXMgbm8gc3VwcG9ydCBmb3IgR29vZ2xlIEFuYWx5dGljc1xuICovXG52YXIgdHJhY2tFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIF9hID0ge30pIHtcbiAgICB2YXIgeyBsZWdhY3lUYXJnZXQsIGxlZ2FjeUFjdGlvbiwgbGVnYWN5TGFiZWwgPSB1bmRlZmluZWQsIGxlZ2FjeVZhbHVlID0gdW5kZWZpbmVkLCBpZCwgY29udGV4dCwgdmFsdWUgfSA9IF9hLCBleHRyYVByb3BzID0gX19yZXN0KF9hLCBbXCJsZWdhY3lUYXJnZXRcIiwgXCJsZWdhY3lBY3Rpb25cIiwgXCJsZWdhY3lMYWJlbFwiLCBcImxlZ2FjeVZhbHVlXCIsIFwiaWRcIiwgXCJjb250ZXh0XCIsIFwidmFsdWVcIl0pO1xuICAgIGNvbnNvbGUuZGVidWcoXCJbUytdIFRyYWNraW5nIGRpc2FibGVkIGJ5IHVzZXJcIiwgYXJndW1lbnRzKTtcbn07XG5leHBvcnRzLnRyYWNrRXZlbnQgPSB0cmFja0V2ZW50O1xuZnVuY3Rpb24gZ2V0QW5hbHl0aWNzVXNlcklkKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbVRva2VuKCkge1xuICAgICAgICAgICAgLy8gRS5nLiA4ICogMzIgPSAyNTYgYml0cyB0b2tlblxuICAgICAgICAgICAgdmFyIHJhbmRvbVBvb2wgPSBuZXcgVWludDhBcnJheSgzMik7XG4gICAgICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJhbmRvbVBvb2wpO1xuICAgICAgICAgICAgdmFyIGhleCA9IFwiXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmRvbVBvb2wubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBoZXggKz0gcmFuZG9tUG9vbFtpXS50b1N0cmluZygxNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFLmcuIGRiMTg0NThlMjc4MmIyYjc3ZTM2NzY5YzU2OWUyNjNhNTM4ODVhOTk0NGRkMGE4NjFlNTA2NGVhYzE2ZjFhXG4gICAgICAgICAgICByZXR1cm4gaGV4O1xuICAgICAgICB9XG4gICAgICAgIGxldCBsID0geWllbGQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KHsgcmFuZG9tVXNlcklkOiBudWxsIH0pO1xuICAgICAgICBpZiAoIWwucmFuZG9tVXNlcklkKSB7XG4gICAgICAgICAgICBsZXQgcmFuZG9tVXNlcklkID0gZ2V0UmFuZG9tVG9rZW4oKTtcbiAgICAgICAgICAgIHlpZWxkIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHJhbmRvbVVzZXJJZCB9KTtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21Vc2VySWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGwucmFuZG9tVXNlcklkO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRBbmFseXRpY3NVc2VySWQgPSBnZXRBbmFseXRpY3NVc2VySWQ7XG5mdW5jdGlvbiBpbml0aWFsaXplQW5hbHl0aWNzKF9hKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCBhcmd1bWVudHMsIHZvaWQgMCwgZnVuY3Rpb24qICh7IGRvY3VtZW50Q29udGV4dCwgaXNBbmFseXRpY3NFbmFibGVkLCBzZWxlY3RlZFRoZW1lLCBzZWxlY3RlZEJldGEsIGN1cnJlbnRWZXJzaW9uLCBuZXdWZXJzaW9uLCByYW5kb21Vc2VySWQsIHRoZW1lSXNNb2Rlcm4sIH0pIHtcbiAgICAgICAgaWYgKGlzQW5hbHl0aWNzRW5hYmxlZCkge1xuICAgICAgICAgICAgZW5hYmxlQW5hbHl0aWNzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZW5hYmxlQW5hbHl0aWNzKCkge1xuICAgICAgICAgICAgLy8gR29vZ2xlIEFuYWx5dGljcyB2NFxuICAgICAgICAgICAgZ2xvYmFsVGhpcy5kYXRhTGF5ZXIgPSBnbG9iYWxUaGlzLmRhdGFMYXllciB8fCBbXTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGd0YWcoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAoX2EgPSBnbG9iYWxUaGlzLmRhdGFMYXllcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGd0YWcoXCJqc1wiLCBuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgIGNvbnN0IGd0YWdDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgcGFnZV9sb2NhdGlvbjogbG9jYXRpb24uaHJlZi5yZXBsYWNlKC9cXC9cXGR7Myx9XFxiL2csIFwiLypcIiksXG4gICAgICAgICAgICAgICAgcGFnZV9wYXRoOiBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9cXGR7Myx9XFxiL2csIFwiLypcIiksXG4gICAgICAgICAgICAgICAgcGFnZV90aXRsZTogbnVsbCxcbiAgICAgICAgICAgICAgICB1c2VyX2lkOiByYW5kb21Vc2VySWQsXG4gICAgICAgICAgICAgICAgdXNlcl9wcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiBzZWxlY3RlZFRoZW1lLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVCZXRhOiBzZWxlY3RlZEJldGEsXG4gICAgICAgICAgICAgICAgICAgIGxhc3RFbmFibGVkVmVyc2lvbjogbmV3VmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uVmVyc2lvbjogY3VycmVudFZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogbG9jYXRpb24uaG9zdCxcbiAgICAgICAgICAgICAgICAgICAgbW9kZXJuVGhlbWU6IHRoZW1lSXNNb2Rlcm4sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBndGFnKFwiY29uZmlnXCIsIFwiRy1ZTTZCMDBSRFlDXCIsIGd0YWdDb25maWcpO1xuICAgICAgICAgICAgZXhwb3J0cy50cmFja0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgX2EgPSB7fSkge1xuICAgICAgICAgICAgICAgIHZhciB7IGxlZ2FjeVRhcmdldCwgbGVnYWN5QWN0aW9uLCBsZWdhY3lMYWJlbCA9IHVuZGVmaW5lZCwgbGVnYWN5VmFsdWUgPSB1bmRlZmluZWQsIGlkLCBjb250ZXh0LCB2YWx1ZSB9ID0gX2EsIGV4dHJhUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImxlZ2FjeVRhcmdldFwiLCBcImxlZ2FjeUFjdGlvblwiLCBcImxlZ2FjeUxhYmVsXCIsIFwibGVnYWN5VmFsdWVcIiwgXCJpZFwiLCBcImNvbnRleHRcIiwgXCJ2YWx1ZVwiXSk7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50RGF0YSA9IE9iamVjdC5hc3NpZ24oeyBpZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgfSwgZXh0cmFQcm9wcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhgW1MrXSBUcmFja2VkIGV2ZW50OmAsIGV2ZW50TmFtZSwgZXZlbnREYXRhKTtcbiAgICAgICAgICAgICAgICBndGFnKFwiZXZlbnRcIiwgZXZlbnROYW1lLCBldmVudERhdGEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRyYWNrQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LmlzVHJ1c3RlZClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSAoZXZlbnQuY3VycmVudFRhcmdldCB8fCBldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgICgwLCBleHBvcnRzLnRyYWNrRXZlbnQpKFwidHJhY2tpbmdfbGlua19jbGlja1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGxlZ2FjeVRhcmdldDogdGFyZ2V0LmRhdGFzZXQuc3BsdXNUcmFja2luZ0lkIHx8IHRhcmdldC5pZCB8fCBcIlVubGFiZWxlZCBCdXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgbGVnYWN5QWN0aW9uOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZ2FjeUxhYmVsOiB0YXJnZXQuZGF0YXNldC5zcGx1c1RyYWNraW5nQ29udGV4dCB8fCBcIlRyYWNraW5nIExpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgbGVnYWN5VmFsdWU6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdWYWx1ZSB8fCBldmVudC5idXR0b24sXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0YXJnZXQuZGF0YXNldC5zcGx1c1RyYWNraW5nSWQgfHwgdGFyZ2V0LmlkIHx8IFwiVW5sYWJlbGVkIEJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB0YXJnZXQuZGF0YXNldC5zcGx1c1RyYWNraW5nQ29udGV4dCB8fCBcIlRyYWNraW5nIExpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRhcmdldC5kYXRhc2V0LnNwbHVzVHJhY2tpbmdWYWx1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb2N1bWVudENvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tlZEVsZW1lbnRzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMsIG11dGF0aW9uT2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNwbHVzLXRyYWNrLWNsaWNrczpub3QoLnNwbHVzLXRyYWNrZWQpXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRyYWNrZWRFbGVtZW50cy5oYXMoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0cmFja0NsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJhdXhjbGlja1wiLCB0cmFja0NsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJzcGx1cy10cmFja2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrZWRFbGVtZW50cy5hZGQoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZHlTdGF0ZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhZHlTdGF0ZUNoZWNrSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVsZW0gb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcGx1cy10cmFjay1jbGlja3NcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdHJhY2tlZEVsZW1lbnRzLmhhcyhlbGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRyYWNrQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImF1eGNsaWNrXCIsIHRyYWNrQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcInNwbHVzLXRyYWNrZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tlZEVsZW1lbnRzLmFkZChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5pbml0aWFsaXplQW5hbHl0aWNzID0gaW5pdGlhbGl6ZUFuYWx5dGljcztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ERUZBVUxUX1RIRU1FX05BTUUgPSBleHBvcnRzLkRJU0NPUkRfVVJMID0gZXhwb3J0cy5FWFRFTlNJT05fV0VCU0lURSA9IGV4cG9ydHMuRVhURU5TSU9OX05BTUUgPSB2b2lkIDA7XG5leHBvcnRzLkVYVEVOU0lPTl9OQU1FID0gXCJTY2hvb2xvZ3kgUGx1c1wiO1xuZXhwb3J0cy5FWFRFTlNJT05fV0VCU0lURSA9IFwiaHR0cHM6Ly9zY2hvb2xvZ3lwbC51c1wiO1xuZXhwb3J0cy5ESVNDT1JEX1VSTCA9IFwiaHR0cHM6Ly9kaXNjb3JkLnNjaG9vbG9neXBsLnVzXCI7XG5leHBvcnRzLkRFRkFVTFRfVEhFTUVfTkFNRSA9IGV4cG9ydHMuRVhURU5TSU9OX05BTUU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuREVGQVVMVF9JQ09OUyA9IHZvaWQgMDtcbmV4cG9ydHMuREVGQVVMVF9JQ09OUyA9IFtcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlxcXFxiUEVcXFxcYnxQaHlzKGljYWwpPyBFZHU/KGNhdGlvbik/fFxcXFxiU1JMQVxcXFxifFRSS3xUUkFDSyBGSUVMRHxDUk9TUyBDfEFEViBDT05EfE1PP1YgQkQgQVdSfEFUSExFVElDfFNQT1JUU3xGSVRORVNTfFBIWVMgRklUXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yNTUzLzI1NTM5NjcucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJleGVyY2lzZV8yNTUzOTY3XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIldPP1I/TEQgSElTVD8oT1JZKT98V0hHfFdMRCBMQU5HfExBVCBBTXxJTlRMIFJFTFwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTc0LzE3NDI0OS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImludGVybmV0XzE3NDI0OVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJBTklNQUxcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzIxMDkvMjEwOTM0Mi5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImJhcm5fMjEwOTM0MlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJBTklNXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yMDM3LzIwMzc4NzYucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJhbmltYXRpb25fMjAzNzg3NlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJGT1JFTlwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTYxNi8xNjE2NTI1LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiZm9yZW5zaWMtc2NpZW5jZV8xNjE2NTI1XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkFVVE8uKltUTV1FQ0h8W01UXUVDSC4qQVVUT3xBVVRPIE1BSU5cIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzIwNDAvMjA0MDk4OS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImNhci1zZXJ2aWNlXzIwNDA5ODlcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiQUxHKEVCfEVCUkEpPyhcXFxcZHxcXFxcYilcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE2Ny8xNjc3NTMucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJibGFja2JvYXJkXzE2Nzc1M1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJBUlQgSElTVHxQQUlOVFwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMjE0LzIxNDI3NS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInBhaW50LWJydXNoXzIxNDI3NVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJFVVJcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzY2NC82NjQ1NDkucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJldXJvcGVfNjY0NTQ5XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlBIWVNJQ1N8UEhZOkNcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE2NC8xNjQ5NjkucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJzY2llbmNlXzE2NDk2OVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJBU1RST05PTVlcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzEyNC8xMjQ1NTMucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJ0ZWxlc2NvcGVfMTI0NTUzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlBSRSA/Q0FMQ1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTA3NC8xMDc0MTQwLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwicGFyYWJvbGFfMTA3NDE0MFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJCQVNLRVRCQUxMfEJTS1RCTFwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNTAwLzUwMDI0NS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImJhc2tldGJhbGxfNTAwMjQ1XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIihefFxcXFxiKUNBTEMoVUxVUyk/XFxcXGJcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE1NzIvMTU3MjI5Ni5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImxpbmUtZ3JhcGhfMTU3MjI5NlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJDSEVFUnxEUklMTFwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMjE4NS8yMTg1NTg0LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiY2hlZXJsZWFkZXJzXzIxODU1ODRcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiQ0hFTVwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTIzLzEyMzM4MS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImZsYXNrXzEyMzM4MVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJHQU1FIERFU0c/TnxHQU1FIERFU0lHTlwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTczNy8xNzM3Mjg1LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiY29tcHV0ZXJfMTczNzI4NVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJDT01QIFNDST98Q09NUFVURVJ8SU5UUk8gQ09NUHxDT01QIFBSTz9HfElOVFJPIFBST0d8Q09ESU5HfElOVEU/Uj9ORT9UfERJR0lUQUwgTElUfEpBVkFcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzYyNi82MjY1NzAucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJiaW5hcnktY29kZV82MjY1NzBcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiVVMgSElTVHxBTUVSKElDQU4/KT98QU0gREVNfEFNIElNQUdFfElCIEhTIEFNUlwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTQ5LzE0OTUxMy5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInVuaXRlZC1zdGF0ZXMtb2YtYW1lcmljYV8xNDk1MTNcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiSEU/QT9MVEh8TUVESUNBTHxNRUQgSU5URVJWRU58TUVESUNJTkV8SE9TUHxQQVRJRU5UXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNzkvMTc5NTU1LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiZmlyc3QtYWlkLWtpdF8xNzk1NTVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiQ0VSQU1JQ1N8QU0gSU5EXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xMjMvMTIzNDU4LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwicG90XzEyMzQ1OFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJGTE9SfEZMT1dFUlwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMzQ2LzM0NjE2Ny5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImZsb3dlcl8zNDYxNjdcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiTUFSSU5FfFpPT0xPR1l8T0NFQU5cIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE0Ni8xNDY3MTgucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJ0dXJ0bGVfMTQ2NzE4XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIk1BTkR8Q0hJTkVTRXxDSElOQXxDSElOIExBTkdcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzI0NDgvMjQ0ODc4MS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImZsYWdfMjQ0ODc4MVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJLT1JFQVwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTk5OS8xOTk5NjEwLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwia29yZWFfMTk5OTYxMFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJQU1lDfElCIFRIRU9SWVwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNTUyLzU1MjQwOC5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImNyZWF0aXZpdHlfNTUyNDA4XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlBJQU5PfEtFWUJPQVJEXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xOTczLzE5NzM4ODgucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJrZXlib2FyZF8xOTczODg4XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkVYUE8gVEU/WFR8U0ggU1RPUllcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE3Ni8xNzY2OTAucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJ3cml0aW5nXzE3NjY5MFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJESVNDUlwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMjUxLzI1MTk4Ni5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImNhbGN1bGF0aW5nXzI1MTk4NlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJWRVRcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzI2NTkvMjY1OTM2Ni5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInBhd3ByaW50XzI2NTkzNjZcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiT1JDSHxWSU9MSU58U1RSSU5HU1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTI0LzEyNDgxMS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInZpb2xpbl8xMjQ4MTFcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiQkFORHxNQVIgRFlOXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi83MTgvNzE4NTQzLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiZHJ1bXNfNzE4NTQzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlNPQ0NFUlwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTgwMC8xODAwOTQ0LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiZm9vdGJhbGxfMTgwMDk0NFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJMQUNST1NTXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yODI3LzI4MjcwNDEucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJsYWNyb3NzZV8yODI3MDQxXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIk1VU0lDfEpBWlp8Q0hPSVJ8SU5TVFJVTXxXSU5EIFBFUkN8SEFSTU9OWXxHTEVFfENIT1JVU3xWT0MgRU5TRU1CTEV8U0lOR3xWT0lDRVwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNTc5LzU3OTQ5Ni5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInRyZWJsZS1jbGVmXzU3OTQ5NlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJCSU8oTE9HWXxURUNIKE5PTE9HWSk/fE1FRCk/XFxcXGJ8R0VORVRJQ1NcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzYyMC82MjAzNjYucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJkbmFfNjIwMzY2XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIihefFxcXFxiKUxJVChFUkFUVVJFKT9cXFxcYnxSRUFEfEwgJiBMfExJQlJBUllcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE2Ny8xNjc3NTUucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJvcGVuLWJvb2tfMTY3NzU1XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlNUQUdFfFRIRUFUUkUgRFNOfFRIIERTTiBXS1NQfENIT1JQUk9DXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yNjczLzI2NzMzNDYucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJzcG90bGlnaHRfMjY3MzM0NlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJBRFZUIERFU1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTA1NS8xMDU1NjY0LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiYWRzXzEwNTU2NjRcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiRUNPTihPKE1JQ1MpPyk/fEFQIE1BIEVDT3xGSU4gTUdNVHxGSU5BTkNJQUxcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzcxMi83MTI3NDMucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJwcm9maXRfNzEyNzQzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlNUQVQoU1RJQ1N8SVNUQ1MpfFNUQVRTP3xTVEFUSVNUSUNTXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xMDA2LzEwMDY2MzYucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJhbmFseXNpc18xMDA2NjM2XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkZJTE0oTUFLSU5HKT9cXFxcYnxWSURFT3xWSUQgUFJEfEJSRENTVHxDSU5FTUF8U0NSRUVOIFBMQVlcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzMyMS8zMjE3OTkucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJ2aWRlby1jYW1lcmFfMzIxNzk5XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIihGSVJ8MSlTVCBSRVNQT05ERVJcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzExOS8xMTkwODMucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJhbWJ1bGFuY2VfMTE5MDgzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkdFT0xPR1lcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE4NC8xODQ2NDcucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJzY2llbmNlXzE4NDY0N1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJDT09LfENVTElOQVJZfEZPT0R8Q0FURVJcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzExNDIvMTE0MjY5Ni5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImNvb2tpbmdfMTE0MjY5NlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJcXFxcYkdPVlRcXFxcYnxZT1UgQURNIEpVU3xKVVNUSUNFXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNjcvMTY3NzE4LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwidW5pdmVyc2l0eV8xNjc3MThcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiR0VPTVwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMjU4LzI1ODMxNi5wbmdcIixcbiAgICAgICAgc291cmNlOiBcIm9mZmljZS1tYXRlcmlhbF8yNTgzMTZcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiR1VJVChBUik/fE1BUklBQ0hJfFVLRUxFTEVcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE1ODYvMTU4NjIzNC5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImd1aXRhcl8xNTg2MjM0XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIk1ZUCBTVCBURUNIfFxcXFxiQ1RFXFxcXGJ8U0VNKElOQVIpP1xcXFxifEVOR0lORUVSfFxcXFxiRU5HIERFXFxcXGJ8SU5UUk8gRU5HSU58Q1JFQVQgRVhQfFNURUE/TXxNVUxUSUNSQUZUIENPUkVcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE0NjAvMTQ2MDQ3MS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImlkZWFfMTQ2MDQ3MVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJGTElHSFR8U1BBQ0V8QUVST1NQQT9DRVwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNzQ0Lzc0NDUwMi5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImdsb2JlXzc0NDUwMlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJFTkcoTElTSCk/XFxcXGJ8Q1JFQVQoSVZFKT8gV1JJP1QoSU5HKT98XFxcXGJDT01QKE9TSVRJT04pP1xcXFxifFxcXFxiRVJXQ1xcXFxifExBTkdVQUdFIEFSVFN8TE5HIEFSVHxcXFxcYkVMQVxcXFxiXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yNTQvMjU0MDIyLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwic2lnbmluZ18yNTQwMjJcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiU1BBTihJU0gpP1xcXFxifFNQIExBTkdcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzgwODEvODA4MTgyOS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInNwYW5pc2gtbGFuZ3VhZ2VfODA4MTgyOVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJGUkVOKENIKT9cXFxcYnxBUCBGUiBMQU5HXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yMDYvMjA2NjU3LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiZnJhbmNlXzIwNjY1N1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJJVEFMSUFOXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi81NTUvNTU1NjY4LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiaXRhbHlfNTU1NjY4XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkVOVlwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMjkxLzI5MTIxMS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInJlY3ljbGVfMjkxMjExXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlJPQk9UfE1GR3xJTlRSTyBQSFlTIENPTVBVVElOR3xNQUNISU5JTkd8TUFDSEk/Tkk/U1RcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE1NDYvMTU0NjY4My5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInJvYm90aWMtYXJtXzE1NDY2ODNcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiTUVESUFcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE2NDkvMTY0OTA5Mi5wbmdcIixcbiAgICAgICAgc291cmNlOiBcIm1lZGlhLXBsYXllcl8xNjQ5MDkyXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkNZQkVSXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yMDg0LzIwODQwMjgucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJjeWJlci1zZWN1cml0eV8yMDg0MDI4XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkdFT0d8SFVNQU4gR0VPXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi83MTcvNzE3OTgyLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiZ2xvYmVfNzE3OTgyXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIihefFxcXFxiKUFSVFxcXFxifERFUyBDUkFGVHxDUkFGVFNcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE0OTcvMTQ5NzU3My5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImNyZWF0aXZpdHlfMTQ5NzU3M1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJBTSBTSUdOIExOR1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMjAxNC8yMDE0MzYzLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwic2lnbi1sYW5ndWFnZV8yMDE0MzYzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkRBTkNFP3xETiBDSHxETkMgQ01QP05UP1l8QkFMTEVUP1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNDkzLzQ5MzUwNy5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImRhbmNpbmdfNDkzNTA3XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkFQUCBDUkVBVFwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTg2LzE4NjIzOS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInNtYXJ0cGhvbmVfMTg2MjM5XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIk1VU0VVTVwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMjUyLzI1MjAzMi5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImJhbmtzXzI1MjAzMlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJHT0xGXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNTg0LzE1ODQxNDMucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJnb2xmXzE1ODQxNDNcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiSkFQQU5cIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzIwNi8yMDY3ODkucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJqYXBhbl8yMDY3ODlcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiTUVYXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yMDYvMjA2NjAwLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwibWV4aWNvXzIwNjYwMFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJSVVNTSUFcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzIwNi8yMDY2MDQucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJydXNzaWFfMjA2NjA0XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIihefFxcXFxiKUVMRFxcXFxifChefFxcXFxiKUVMU1xcXFxifChefFxcXFxiKUVMTFxcXFxiXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi85NDcvOTQ3NDc4LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiYm9va185NDc0NzhcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiKF58XFxcXGIpVEhFQShUW0VSXVtFUl0pP1xcXFxifERSQU1BfFBFUkZPUk0gQVJUXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yMTQvMjE0MzUxLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwidGhlYXRlcl8yMTQzNTFcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiTEVBREVSXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNTM0LzE1MzQwOTEucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJnb3Zlcm5tZW50XzE1MzQwOTFcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiU0VSVklDRXxUXFxcXC5BXFxcXC58UEVFUiBDT1VOU0VMSU5HfFRVVE9SfEFWSUR8RVRITklDfEVUSE4gU1RVRElFU3xJTlRFUkFDVElPTlN8QU5USFJPfFNPQ0l8REVDQVRITE9OfFBFTlRBVEhMT058QUZSTy1BTVwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNDMzNy80MzM3Mjg4LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiaWRlYV80MzM3Mjg4XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkxBVElOfFxcXFxiTEFXXFxcXGJ8Q0FMTElHUkFQSFlcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzEwMjAvMTAyMDA3NC5wbmdcIixcbiAgICAgICAgc291cmNlOiBcIm1hbnVzY3JpcHRfMTAyMDA3NFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJIVU1BTklUST9FP1M/fExJRkUgKE1HTVR8U0tJP0w/TFMpfFBISUxcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzEyMDUvMTIwNTQ5NS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImRpc2N1c3Npb25fMTIwNTQ5NVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJZRUFSQk9PS3xESUcgSU1BR3xQSE9UT1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTAwNi8xMDA2MTA3LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwibWVtb3JpZXNfMTAwNjEwN1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJORVRXT1JLSU5HXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNTU0LzE1NTQzNzcucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJuZXR3b3JrXzE1NTQzNzdcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiUkVTKEVBKT9SQ0hcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE2NC8xNjQ5OTYucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJyZXNlYXJjaF8xNjQ5OTZcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiQ09MKExFR0UpP1xcXFxifENMQVNTIE9GXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNjcvMTY3NzQzLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwibW9ydGFyYm9hcmRfMTY3NzQzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkNBUkVFUnxKT0J8R0VOIFdSS3xcXFxcYldPUktcXFxcYnxFTlRFUlB8U01BTEwgQlVTXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNDkvMTQ5MDE4LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiYnJpZWZjYXNlXzE0OTAxOFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJBRFZJU3xIT01FfFNPQ0lBTCBDT018R1JBREUgXFxcXGR8Qk9PS1NcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE2Ny8xNjc3MjkucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJkZXNrXzE2NzcyOVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJTV0lNXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xMjQvMTI0MjEyLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwic3dpbW1pbmdfMTI0MjEyXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkNPTlNUUlVDVElPTnxXT09EfENBUlBFTlRSWT9cIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE5NzMvMTk3Mzk0Ni5wbmdcIixcbiAgICAgICAgc291cmNlOiBcIndvb2R3b3JraW5nXzE5NzM5NDZcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiVk8/TExFP1lCQT9MTD9cIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzY4LzY4MTc1LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwidm9sbGV5LWJhbGxfNjgxNzVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiRk9PVEJBTExcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE2Ny8xNjc3NDEucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJhbWVyaWNhbi1mb290YmFsbF8xNjc3NDFcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiSk9VUk5BTEk/U01cIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE3MjAvMTcyMDA5NC5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImNvbW11bmljYXRpb25fMTcyMDA5NFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJURU5OSVNcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE2NDUvMTY0NTc5My5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInRlbm5pc18xNjQ1NzkzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlNQRUVDSFwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNTEyLzUxMjUwMC5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInNwZWFrXzUxMjUwMFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJXUkVTVExJTkdcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzU3Ny81NzcxMzIucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJ3cmVzdGxpbmdfNTc3MTMyXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkdSQVBIKElDKT8gKERFU0lHTnxDT01NfEFSVFMpfElOVFIgSU5UIFZEXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNDgvMTQ4ODYyLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwibGF5ZXJzXzE0ODg2MlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJGQVNIIERTTlwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNzcwLzc3MDA4OC5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImRyZXNzXzc3MDA4OFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJKUk9UQ1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvOTQyLzk0MjQ0NC5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInJhbmtfOTQyNDQ0XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIldBVEVSUE9MT1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNjI1LzYyNTM4My5wbmdcIixcbiAgICAgICAgc291cmNlOiBcIndhdGVyLXBvbG9fNjI1MzgzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkhPUlR8TEFORFNDQVBcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzM0Ni8zNDYxOTUucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJzcHJvdXRfMzQ2MTk1XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkFSQUJJQ1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTcwNC8xNzA0NDkxLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwicGF0dGVybl8xNzA0NDkxXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkdFUk1BTlwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNTU1LzU1NTYxMy5wbmdcIixcbiAgICAgICAgc291cmNlOiBcImdlcm1hbnlfNTU1NjEzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkhJU1R8QU5DVCBDSVZMXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNTAxLzE1MDE0NzgucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJwYXJjaG1lbnRfMTUwMTQ3OFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCJTQ1VMUFRcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzIwNzEvMjA3MTIxMS5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInNjdWxwdHVyZV8yMDcxMjExXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlNDSXxJU0NTXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNjcvMTY3NzMzLnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwibWljcm9zY29wZV8xNjc3MzNcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiKEJBU0V8U09GVClCQUxMXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNjY4LzE2Njg1MTQucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJiYXNlYmFsbF8xNjY4NTE0XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIlBIWVNJT3xIVU0gQk9EWXxCT0QgRFlOfEtJTkVTSU9MT0dZXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yMDQ0LzIwNDQ3MTUucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJ4LXJheV8yMDQ0NzE1XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIihefFxcXFxiKU1BVEh8SUIgTVRIXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xMjg0LzEyODQwOTUucG5nXCIsXG4gICAgICAgIHNvdXJjZTogXCJtYXRoZW1hdGljc18xMjg0MDk1XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkRSQVd8MkR8M0R8REVTSUdOfERFP1NOfERSQUZUIEFSQ3xTQ1JFRU4gUFJJTlR8RVhQTCBBUkNIfERSQUZUIFRFQ1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvNjgxLzY4MTU2MC5wbmdcIixcbiAgICAgICAgc291cmNlOiBcInNrZXRjaF82ODE1NjBcIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcmVnZXg6IFwiU0FOREJPWFwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS81MTIvMTU4OC8xNTg4NzQ1LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwic2FuZGJveF8xNTg4NzQ1XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHJlZ2V4OiBcIkRSSVZFUnxEUklWSU5HXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi83NDEvNzQxNDA3LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiY2FyXzc0MTQwN1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgICByZWdleDogXCIuXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xNjQvMTY0OTQ5LnBuZ1wiLFxuICAgICAgICBzb3VyY2U6IFwiYm9va3NoZWxmXzE2NDk0OVwiLFxuICAgIH0sXG5dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRFRkFVTFRfVEhFTUVTID0gZXhwb3J0cy5DTEFTU0lDX1RIRU1FUyA9IGV4cG9ydHMuTEFVU0RfVEhFTUVTID0gdm9pZCAwO1xuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XG5leHBvcnRzLkxBVVNEX1RIRU1FUyA9IFtcIkxBVVNEIE9yYW5nZVwiLCBcIkxBVVNEIERhcmsgQmx1ZVwiLCBcIkxBVVNEIDIwMTlcIl07XG5leHBvcnRzLkNMQVNTSUNfVEhFTUVTID0gW1wiU2Nob29sb2d5IFBsdXNcIiwgXCJSYWluYm93XCJdO1xuZXhwb3J0cy5ERUZBVUxUX1RIRU1FUyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiU2Nob29sb2d5IFBsdXMgTW9kZXJuIExpZ2h0XCIsXG4gICAgICAgIHZlcnNpb246IDIsXG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICBodWU6IDIwMCxcbiAgICAgICAgICAgIG1vZGVybjoge1xuICAgICAgICAgICAgICAgIGRhcms6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGludGVyZmFjZToge1xuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiBcIiNFQUVBRUFcIixcbiAgICAgICAgICAgICAgICAgICAgYWNjZW50OiBcIiNGN0Y3RjdcIixcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiBcIiNERERcIixcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IFwiI0QwRDBEMFwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiI0JBQkFCQVwiLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IFwicmdiYSgyNTUsIDE4MywgMiwgMC4yKVwiLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IFwicmdiYSgxNTIsIDIxMiwgMjI4LCAwLjgpXCIsXG4gICAgICAgICAgICAgICAgICAgIGdyYWRlczogXCIjMDA5NDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIiNGNDQzMzZcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNhbGVuZGFyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiI2Q2ZTdmNFwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNkN2U4Y2ZcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZjllOWQ0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2U3ZTBlNVwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNlNmI1YzlcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZjlmMWNmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2RhZjBmOVwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNmOWRkZWFcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZmJkN2Q4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2YxZjJkMVwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNlMGU4ZjVcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZmJkN2U0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2ZjZGRkM1wiLFxuICAgICAgICAgICAgICAgICAgICBcIiNlN2YyZDVcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZTZlMGVlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2YwZTVkYlwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNmY2U4ZDFcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZTFmMWU3XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2YwZGZlZFwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNlOWU5ZWFcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjMDA0MjdjXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzYwMzA3M1wiLFxuICAgICAgICAgICAgICAgICAgICBcIiM4YjE5NDFcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjOTcwYzBjXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzljM2IwN1wiLFxuICAgICAgICAgICAgICAgICAgICBcIiM2ODUyMDNcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjMmE1ZjE2XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzA5NTg0ZlwiLFxuICAgICAgICAgICAgICAgICAgICBcIiMwMDVhNzVcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjNGQ1NTU3XCIsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IFwiIzJBMkEyQVwiLFxuICAgICAgICAgICAgICAgICAgICBtdXRlZDogXCIjNjc3NTgzXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyYXN0OiBcIndoaXRlXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogNSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyU2l6ZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ286IHtcbiAgICAgICAgICAgIHByZXNldDogXCJzY2hvb2xvZ3lfcGx1c1wiLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIlNjaG9vbG9neSBQbHVzIE1vZGVybiBEYXJrXCIsXG4gICAgICAgIHZlcnNpb246IDIsXG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICBjdXN0b206IHtcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiBcIiMyMDIyMjVcIixcbiAgICAgICAgICAgICAgICBob3ZlcjogXCIjNDA0NDRCXCIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjMzYzOTNmXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBcIiM0MDQ0NGJcIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcIiM2ZmE4ZGNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb2Rlcm46IHtcbiAgICAgICAgICAgICAgICBkYXJrOiB0cnVlLFxuICAgICAgICAgICAgICAgIGludGVyZmFjZToge1xuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiBcIiMzNjM5M0ZcIixcbiAgICAgICAgICAgICAgICAgICAgYWNjZW50OiBcIiMyRjMxMzZcIixcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiBcIiMyMDIyMjVcIixcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IFwiIzQwNDQ0QlwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiI0RDRERERVwiLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IFwicmdiYSgxODQsIDEzNCwgMTEsIDAuMilcIixcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBcInJnYmEoMCwgMjU1LCAyNTUsIDAuMSlcIixcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGVzOiBcIiM4QkMzNEFcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiI0Y0NDMzNlwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2FsZW5kYXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCIjNDU3ZGE1XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzU0N2M0MVwiLFxuICAgICAgICAgICAgICAgICAgICBcIiM5MjZjMzdcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjN2MzZDZiXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzBiNGM5Y1wiLFxuICAgICAgICAgICAgICAgICAgICBcIiMwMDIwOWNcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjMDA0YTA5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzcyNzIxYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIiM0NDIzM2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjNjgzMTMxXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzc3MGEwYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNhNzI0MTNcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjRTAwMjRDXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzE4OEMxNlwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNiZDczMDRcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjODAxNjhDXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzE2NDE1MlwiLFxuICAgICAgICAgICAgICAgICAgICBcIiMwMDU0M2ZcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjNjMzZTExXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzQ2MWIyZFwiLFxuICAgICAgICAgICAgICAgICAgICBcIiMwMDQyN2NcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjNjAzMDczXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzhiMTk0MVwiLFxuICAgICAgICAgICAgICAgICAgICBcIiM5NzBjMGNcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjOWMzYjA3XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzY4NTIwM1wiLFxuICAgICAgICAgICAgICAgICAgICBcIiMyYTVmMTZcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjMDk1ODRmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzAwNWE3NVwiLFxuICAgICAgICAgICAgICAgICAgICBcIiM0ZDU1NTdcIixcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogXCIjRENERERFXCIsXG4gICAgICAgICAgICAgICAgICAgIG11dGVkOiBcIiM3Mjc2N0RcIixcbiAgICAgICAgICAgICAgICAgICAgY29udHJhc3Q6IFwiI0VFRUVFRVwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDUsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclNpemU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBsb2dvOiB7XG4gICAgICAgICAgICBwcmVzZXQ6IFwic2Nob29sb2d5X3BsdXNcIixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJSYWluYm93IE1vZGVyblwiLFxuICAgICAgICB2ZXJzaW9uOiAyLFxuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgcmFpbmJvdzoge1xuICAgICAgICAgICAgICAgIGh1ZToge1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXg6IDM1OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzYXR1cmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA1MCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxpZ2h0bmVzczoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNTAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb2Rlcm46IHtcbiAgICAgICAgICAgICAgICBkYXJrOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbnRlcmZhY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogXCIjRUFFQUVBXCIsXG4gICAgICAgICAgICAgICAgICAgIGFjY2VudDogXCIjRjdGN0Y3XCIsXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeTogXCIjREREXCIsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiBcIiNEMEQwRDBcIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIiNCQUJBQkFcIixcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcInJnYmEoMjU1LCAxODMsIDIsIDAuMilcIixcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBcInJnYmEoMTUyLCAyMTIsIDIyOCwgMC44KVwiLFxuICAgICAgICAgICAgICAgICAgICBncmFkZXM6IFwiIzAwOTQwMFwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCIjRjQ0MzM2XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjYWxlbmRhcjogW1xuICAgICAgICAgICAgICAgICAgICBcIiNkNmU3ZjRcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZDdlOGNmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2Y5ZTlkNFwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNlN2UwZTVcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZTZiNWM5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2Y5ZjFjZlwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNkYWYwZjlcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZjlkZGVhXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2ZiZDdkOFwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNmMWYyZDFcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZTBlOGY1XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2ZiZDdlNFwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNmY2RkZDNcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZTdmMmQ1XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2U2ZTBlZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIiNmMGU1ZGJcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZmNlOGQxXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiI2UxZjFlN1wiLFxuICAgICAgICAgICAgICAgICAgICBcIiNmMGRmZWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjZTllOWVhXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzAwNDI3Y1wiLFxuICAgICAgICAgICAgICAgICAgICBcIiM2MDMwNzNcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjOGIxOTQxXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzk3MGMwY1wiLFxuICAgICAgICAgICAgICAgICAgICBcIiM5YzNiMDdcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjNjg1MjAzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzJhNWYxNlwiLFxuICAgICAgICAgICAgICAgICAgICBcIiMwOTU4NGZcIixcbiAgICAgICAgICAgICAgICAgICAgXCIjMDA1YTc1XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiIzRkNTU1N1wiLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiBcIiMyQTJBMkFcIixcbiAgICAgICAgICAgICAgICAgICAgbXV0ZWQ6IFwiIzY3NzU4M1wiLFxuICAgICAgICAgICAgICAgICAgICBjb250cmFzdDogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDUsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclNpemU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBsb2dvOiB7XG4gICAgICAgICAgICBwcmVzZXQ6IFwic2Nob29sb2d5X3BsdXNcIixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogY29uc3RhbnRzXzEuREVGQVVMVF9USEVNRV9OQU1FLFxuICAgICAgICB2ZXJzaW9uOiAyLFxuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgaHVlOiAyMTAsXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ286IHtcbiAgICAgICAgICAgIHByZXNldDogXCJzY2hvb2xvZ3lfcGx1c1wiLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIlJhaW5ib3dcIixcbiAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgIHJhaW5ib3c6IHtcbiAgICAgICAgICAgICAgICBodWU6IHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiAzNTksXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2F0dXJhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNTAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsaWdodG5lc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBsb2dvOiB7XG4gICAgICAgICAgICBwcmVzZXQ6IFwic2Nob29sb2d5X3BsdXNcIixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJUb3lcIixcbiAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgIGh1ZTogMTUwLFxuICAgICAgICB9LFxuICAgICAgICBsb2dvOiB7XG4gICAgICAgICAgICBwcmVzZXQ6IFwic2Nob29sb2d5X3BsdXNcIixcbiAgICAgICAgfSxcbiAgICAgICAgY3Vyc29yOiB7XG4gICAgICAgICAgICBwcmltYXJ5OiBjaHJvbWUucnVudGltZS5nZXRVUkwoXCIvaW1ncy90b3ktbW9kZS5wbmdcIiksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiTEFVU0QgRGFyayBCbHVlXCIsXG4gICAgICAgIHZlcnNpb246IDIsXG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICBjdXN0b206IHtcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiBcIiMxNDNmNjlcIixcbiAgICAgICAgICAgICAgICBob3ZlcjogXCIjMzQ1Zjg5XCIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjMzQ1Zjg5XCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBcIiMwMjRmN2RcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ286IHtcbiAgICAgICAgICAgIHByZXNldDogXCJsYXVzZF8yMDIyXCIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiTEFVU0QgMjAxOVwiLFxuICAgICAgICB2ZXJzaW9uOiAyLFxuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgY3VzdG9tOiB7XG4gICAgICAgICAgICAgICAgcHJpbWFyeTogXCIjMTQzZjY5XCIsXG4gICAgICAgICAgICAgICAgaG92ZXI6IFwiIzM0NWY4OVwiLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiIzM0NWY4OVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogXCIjMDI0ZjdkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBsb2dvOiB7XG4gICAgICAgICAgICBwcmVzZXQ6IFwibGF1c2RfMjAxOVwiLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkxBVVNEIE9yYW5nZVwiLFxuICAgICAgICB2ZXJzaW9uOiAyLFxuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgY3VzdG9tOiB7XG4gICAgICAgICAgICAgICAgcHJpbWFyeTogXCIjZmY3YTAwXCIsXG4gICAgICAgICAgICAgICAgaG92ZXI6IFwiI2ZmOWEyMFwiLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiI2ZmOGExMFwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogXCIjZGY1YTAwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBsb2dvOiB7XG4gICAgICAgICAgICBwcmVzZXQ6IFwibGF1c2RfbGVnYWN5XCIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiU2Nob29sb2d5IERlZmF1bHRcIixcbiAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgIGN1c3RvbToge1xuICAgICAgICAgICAgICAgIHByaW1hcnk6IFwiIzA2NzdiYVwiLFxuICAgICAgICAgICAgICAgIGhvdmVyOiBcIiMwMjRmN2RcIixcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcIiMwMDJjNDdcIixcbiAgICAgICAgICAgICAgICBib3JkZXI6IFwiIzAyNGY3ZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbG9nbzoge1xuICAgICAgICAgICAgcHJlc2V0OiBcInNjaG9vbG9neV9sb2dvXCIsXG4gICAgICAgIH0sXG4gICAgfSxcbl07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2FpdEZvckVsZW1lbnQgPSBleHBvcnRzLmNyZWF0ZVN2Z0xvZ28gPSBleHBvcnRzLnNldENTU1ZhcmlhYmxlID0gZXhwb3J0cy5nZXRQYXJlbnRzID0gZXhwb3J0cy5pc1Zpc2libGUgPSBleHBvcnRzLmdldEJyb3dzZXIgPSBleHBvcnRzLmNyZWF0ZUJ1dHRvbldpdGhMb2dvID0gZXhwb3J0cy5jcmVhdGVCdXR0b24gPSBleHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSB2b2lkIDA7XG4vKipcbiAqIENyZWF0ZXMgYSBET00gZWxlbWVudFxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBBIERPTSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIC0gVGhlIEhUTUwgdGFnIG5hbWUgb2YgdGhlIHR5cGUgb2YgRE9NIGVsZW1lbnQgdG8gY3JlYXRlXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBjbGFzc0xpc3QgLSBDU1MgY2xhc3NlcyB0byBhcHBseSB0byB0aGUgRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsYW55Pn0gcHJvcGVydGllcyAtIFByb3BlcnRpZXMgdG8gYXBwbHkgdG8gdGhlIERPTSBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGNoaWxkcmVuIC0gRWxlbWVudHMgdG8gYXBwZW5kIGFzIGNoaWxkcmVuIHRvIHRoZSBjcmVhdGVkIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTGlzdCwgcHJvcGVydGllcywgY2hpbGRyZW4pIHtcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAoY2xhc3NMaXN0KSB7XG4gICAgICAgIGZvciAobGV0IGMgb2YgY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICAgICAgZm9yIChsZXQgcHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNbcHJvcGVydHldIGluc3RhbmNlb2YgT2JqZWN0ICYmXG4gICAgICAgICAgICAgICAgIShwcm9wZXJ0aWVzW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHN1YnByb3BlcnR5IGluIHByb3BlcnRpZXNbcHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbcHJvcGVydHldW3N1YnByb3BlcnR5XSA9IHByb3BlcnRpZXNbcHJvcGVydHldW3N1YnByb3BlcnR5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkICYmIHByb3BlcnRpZXNbcHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50W3Byb3BlcnR5XSA9IHByb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50O1xuLyoqXG4gKiBDcmVhdGVzIGEgU2Nob29sb2d5IFBsdXMgdGhlbWVkIGJ1dHRvbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIElEIGZvciB0aGUgYnV0dG9uIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHNob3cgb24gdGhlIGJ1dHRvblxuICogQHBhcmFtIHsoZTogRXZlbnQpPT52b2lkfSBjYWxsYmFjayBBIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZFxuICovXG5mdW5jdGlvbiBjcmVhdGVCdXR0b24oaWQsIHRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFtcInN1Ym1pdC1zcGFuLXdyYXBwZXJcIiwgXCJzcGx1cy1tb2RhbC1idXR0b25cIl0sIHsgb25jbGljazogY2FsbGJhY2sgfSwgW1xuICAgICAgICBjcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgW1wiZm9ybS1zdWJtaXRcIiwgXCJzcGx1cy10cmFjay1jbGlja3NcIl0sIHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHsgc3BsdXNUcmFja2luZ0NvbnRleHQ6IFwiUysgQnV0dG9uXCIgfSxcbiAgICAgICAgfSksXG4gICAgXSk7XG59XG5leHBvcnRzLmNyZWF0ZUJ1dHRvbiA9IGNyZWF0ZUJ1dHRvbjtcbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbldpdGhMb2dvKGlkLCB0ZXh0LCBjYWxsYmFjaykge1xuICAgIGxldCBidXR0b24gPSBjcmVhdGVCdXR0b24oaWQsIHRleHQsIGNhbGxiYWNrKTtcbiAgICBsZXQgaW1nID0gY3JlYXRlU3ZnTG9nbygpO1xuICAgIE9iamVjdC5hc3NpZ24oaW1nLnN0eWxlLCB7XG4gICAgICAgIHZlcnRpY2FsQWxpZ246IFwibWlkZGxlXCIsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiBcIjRweFwiLFxuICAgICAgICB3aWR0aDogXCIxOHB4XCIsXG4gICAgfSk7XG4gICAgYnV0dG9uLnByZXBlbmQoaW1nKTtcbiAgICBidXR0b24uc3R5bGUuc2V0UHJvcGVydHkoXCJoZWlnaHRcIiwgXCIzNnB4XCIsIFwiaW1wb3J0YW50XCIpO1xuICAgIGxldCBidXR0b25JbnB1dCA9IGJ1dHRvbi5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgYnV0dG9uSW5wdXQuc3R5bGUucGFkZGluZ0xlZnQgPSBcIjRweFwiO1xuICAgIGJ1dHRvbklucHV0LnN0eWxlLnNldFByb3BlcnR5KFwiaGVpZ2h0XCIsIFwiMzZweFwiLCBcImltcG9ydGFudFwiKTtcbiAgICBidXR0b24uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbn1cbmV4cG9ydHMuY3JlYXRlQnV0dG9uV2l0aExvZ28gPSBjcmVhdGVCdXR0b25XaXRoTG9nbztcbi8qKlxuICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBicm93c2VyXG4gKiBAcmV0dXJucyB7XCJDaHJvbWVcInxcIkZpcmVmb3hcInxcIk90aGVyXCJ9IE5hbWUgb2YgdGhlIGN1cnJlbnQgYnJvd3NlclxuICovXG5mdW5jdGlvbiBnZXRCcm93c2VyKCkge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5jaHJvbWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzLmJyb3dzZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkZpcmVmb3hcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIExpa2VseSBjYXB0dXJlcyBhbGwgQ2hyb21pdW0tYmFzZWQgYnJvd3NlcnNcbiAgICAgICAgICAgIHJldHVybiBcIkNocm9tZVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJPdGhlclwiO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0QnJvd3NlciA9IGdldEJyb3dzZXI7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGFuIGVsZW1lbnQgaXMgdmlzaWJsZSB0byB0aGUgdXNlclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbSBUaGUgZWxlbWVudCB0byBjaGVjayBmb3IgdmlzaWJpbGl0eVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBlbGVtZW50IGlzIHZpc2libGVcbiAqL1xuZnVuY3Rpb24gaXNWaXNpYmxlKGVsZW0pIHtcbiAgICByZXR1cm4gISEoZWxlbS5vZmZzZXRXaWR0aCB8fCBlbGVtLm9mZnNldEhlaWdodCB8fCBlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKTtcbn1cbmV4cG9ydHMuaXNWaXNpYmxlID0gaXNWaXNpYmxlO1xuLyoqXG4gKiBSZXR1cm5zIGFsbCBwYXJlbnQgZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHByb3ZpZGVkIHNlbGVjdG9yLlxuICogRXNzZW50aWFsbHkgd29ya3MgbGlrZSBhIHJldmVyc2UgYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbSBUaGUgdGFyZ2V0IGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBBIENTUyBzZWxlY3RvclxuICogQHJldHVybnMge0hUTUxFbGVtZW50W119IEFuIGFycmF5IG9mIG1hdGNoaW5nIHBhcmVudCBlbGVtZW50c1xuICovXG5mdW5jdGlvbiBnZXRQYXJlbnRzKGVsZW0sIHNlbGVjdG9yKSB7XG4gICAgdmFyIHBhcmVudHMgPSBbXTtcbiAgICB2YXIgZmlyc3RDaGFyO1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBmaXJzdENoYXIgPSBzZWxlY3Rvci5jaGFyQXQoMCk7XG4gICAgfVxuICAgIGZvciAoOyBlbGVtICYmIGVsZW0gIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdENoYXIgPT09IFwiLlwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdG9yLnN1YnN0cigxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdENoYXIgPT09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uaWQgPT09IHNlbGVjdG9yLnN1YnN0cigxKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2goZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0Q2hhciA9PT0gXCJbXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5oYXNBdHRyaWJ1dGUoc2VsZWN0b3Iuc3Vic3RyKDEsIHNlbGVjdG9yLmxlbmd0aCAtIDEpKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2goZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsZW0udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHBhcmVudHMucHVzaChlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudHMucHVzaChlbGVtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFyZW50cztcbn1cbmV4cG9ydHMuZ2V0UGFyZW50cyA9IGdldFBhcmVudHM7XG4vKipcbiAqIFNldHMgdGhlIHZhbHVlIG9mIGEgQ1NTIHZhcmlhYmxlIG9uIHRoZSBkb2N1bWVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVmFyaWFibGUgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCBOZXcgdmFyaWFibGUgdmFsdWVcbiAqL1xuZnVuY3Rpb24gc2V0Q1NTVmFyaWFibGUobmFtZSwgdmFsKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGAtLSR7bmFtZX1gLCB2YWwgIT09IG51bGwgJiYgdmFsICE9PSB2b2lkIDAgPyB2YWwgOiBudWxsKTtcbn1cbmV4cG9ydHMuc2V0Q1NTVmFyaWFibGUgPSBzZXRDU1NWYXJpYWJsZTtcbmZ1bmN0aW9uIGNyZWF0ZVN2Z0xvZ28oLi4uY2xhc3Nlcykge1xuICAgIGxldCBjaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImNpcmNsZVwiKTtcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwiY3hcIiwgXCIyNTBcIik7XG4gICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcImN5XCIsIFwiMjUwXCIpO1xuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJyXCIsIFwiMjMwXCIpO1xuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImZpbGw6IG5vbmU7IHN0cm9rZS13aWR0aDogMzVweDsgc3Ryb2tlOiBjdXJyZW50Q29sb3I7XCIpO1xuICAgIGxldCBsaW5lMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwibGluZVwiKTtcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoXCJ4MVwiLCBcIjI1MFwiKTtcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoXCJ5MVwiLCBcIjEyNVwiKTtcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoXCJ4MlwiLCBcIjI1MFwiKTtcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoXCJ5MlwiLCBcIjM3NVwiKTtcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLXdpZHRoOiAzNXB4OyBzdHJva2U6IGN1cnJlbnRDb2xvcjtcIik7XG4gICAgbGV0IGxpbmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJsaW5lXCIpO1xuICAgIGxpbmUyLnNldEF0dHJpYnV0ZShcIngxXCIsIFwiMTI1XCIpO1xuICAgIGxpbmUyLnNldEF0dHJpYnV0ZShcInkxXCIsIFwiMjUwXCIpO1xuICAgIGxpbmUyLnNldEF0dHJpYnV0ZShcIngyXCIsIFwiMzc1XCIpO1xuICAgIGxpbmUyLnNldEF0dHJpYnV0ZShcInkyXCIsIFwiMjUwXCIpO1xuICAgIGxpbmUyLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwic3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyBzdHJva2Utd2lkdGg6IDM1cHg7IHN0cm9rZTogY3VycmVudENvbG9yO1wiKTtcbiAgICBsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgNTAwIDUwMFwiKTtcbiAgICBzdmcuYXBwZW5kKGNpcmNsZSwgbGluZTEsIGxpbmUyKTtcbiAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICBzdmcuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgICB9XG4gICAgcmV0dXJuIHN2Zztcbn1cbmV4cG9ydHMuY3JlYXRlU3ZnTG9nbyA9IGNyZWF0ZVN2Z0xvZ287XG5mdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3RvciwgY2hlY2tfaW50ZXJ2YWwgPSA1MCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2hlY2tfaW50ZXJ2YWwpO1xuICAgIH0pO1xufVxuZXhwb3J0cy53YWl0Rm9yRWxlbWVudCA9IHdhaXRGb3JFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNjaG9vbG9neVRoZW1lID0gZXhwb3J0cy5UaGVtZUljb24gPSBleHBvcnRzLlRoZW1lQ3Vyc29yID0gZXhwb3J0cy5UaGVtZUxvZ28gPSBleHBvcnRzLlRoZW1lQ29sb3IgPSBleHBvcnRzLk1vZGVybkNvbG9yRGVmaW5pdGlvbiA9IGV4cG9ydHMuTW9kZXJuT3B0aW9uc0RlZmluaXRpb24gPSBleHBvcnRzLk1vZGVyblRleHRDb2xvckRlZmluaXRpb24gPSBleHBvcnRzLk1vZGVybkludGVyZmFjZUNvbG9yRGVmaW5pdGlvbiA9IGV4cG9ydHMuUmFpbmJvd0NvbG9yRGVmaW5pdGlvbiA9IGV4cG9ydHMuUmFpbmJvd0NvbG9yQ29tcG9uZW50RGVmaW5pdGlvbiA9IGV4cG9ydHMuUmFpbmJvd0NvbG9yQ29tcG9uZW50QW5pbWF0aW9uID0gZXhwb3J0cy5DdXN0b21Db2xvckRlZmluaXRpb24gPSB2b2lkIDA7XG5jbGFzcyBDdXN0b21Db2xvckRlZmluaXRpb24ge1xuICAgIC8qKlxuICAgICAqIEFsbG93cyBmaW5lIGNvbnRyb2wgb3ZlciBpbmRpdmlkdWFsIGNvbG9ycyBpbiB0aGUgaW50ZXJmYWNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByaW1hcnkgVGhlIG1haW4gaW50ZXJmYWNlIGNvbG9yIHVzZWQgaW4gdGhlIG5hdmlnYXRpb24gYmFyIGFuZCBhcyB0aGUgcHJpbWFyeSBjb2xvciBmb3IgYnV0dG9ucyBhbmQgb3RoZXIgVUkgZWxlbWVudHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhvdmVyIFRoZSBjb2xvciBvZiBpdGVtcyBpbiB0aGUgc2V0dGluZ3MgbWVudVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYWNrZ3JvdW5kIFRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIGJ1dHRvbnMgYW5kIG90aGVyIGludGVyYWN0aXZlIGVsZW1lbnRzIHdoZW4geW91IGhvdmVyIG92ZXIgdGhlbSwgYW5kIHRoZSBjb2xvciBvZiB0aGUgc2V0dGluZ3MgZHJvcGRvd24gbWVudVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib3JkZXIgVGhlIGJvcmRlciBjb2xvciBvZiBidXR0b25zIGFuZCB0aGUgYm9yZGVyIGJldHdlZW4gdGhlIG5hdmlnYXRpb24gYmFyIGFuZCBkcm9wLWRvd24gbWVudXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGluayBUaGUgY29sb3Igb2YgbGlua3MgYW5kIG90aGVyIGludGVyYWN0aXZlIHRleHRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwcmltYXJ5LCBob3ZlciwgYmFja2dyb3VuZCwgYm9yZGVyLCBsaW5rKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeSA9IHByaW1hcnk7XG4gICAgICAgIHRoaXMuaG92ZXIgPSBob3ZlcjtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcbiAgICAgICAgdGhpcy5ib3JkZXIgPSBib3JkZXI7XG4gICAgICAgIHRoaXMubGluayA9IGxpbmsgfHwgaG92ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBgQ3VzdG9tQ29sb3JEZWZpbml0aW9uYCBnaXZlbiBhIHZhbGlkIEpTT04gb2JqZWN0XG4gICAgICogQHBhcmFtIHsqfSBvIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSBgQ3VzdG9tQ29sb3JEZWZpbml0aW9uYFxuICAgICAqIEByZXR1cm5zIHtDdXN0b21Db2xvckRlZmluaXRpb259XG4gICAgICovXG4gICAgc3RhdGljIGxvYWRGcm9tT2JqZWN0KG8pIHtcbiAgICAgICAgcmV0dXJuIG9cbiAgICAgICAgICAgID8gbmV3IEN1c3RvbUNvbG9yRGVmaW5pdGlvbihvLnByaW1hcnksIG8uaG92ZXIsIG8uYmFja2dyb3VuZCwgby5ib3JkZXIsIG8ubGluayB8fCBvLmhvdmVyKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5DdXN0b21Db2xvckRlZmluaXRpb24gPSBDdXN0b21Db2xvckRlZmluaXRpb247XG5jbGFzcyBSYWluYm93Q29sb3JDb21wb25lbnRBbmltYXRpb24ge1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBjb2xvciBhbmltYXRpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWQgU3BlZWQgb2YgdGhlIGFuaW1hdGlvbjsgbGFyZ2VyIG51bWJlcnMgYXJlIGZhc3Rlci4gKDAtMTAwKVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIGluaXRpYWwgdmFsdWUgZm9yIHRoZSBhbmltYXRpb24gKHRoZSBmaXJzdCB0aW1lIHN0ZXApOyB1c2VkIHRvIGNyZWF0ZSBzZXBhcmF0aW9uIGJldHdlZW4gdGhlIGFuaW1hdGlvbnMgb2YgdGhlIGRpZmZlcmVudCBjb2xvciBjb21wb250ZW50cy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluIFRoZSBtaW5pbXVtIHZhbHVlIGluIHRoZSBhbmltYXRpb24gY3ljbGU7IHRoZSBhbmltYXRpb24gd2lsbCBjeWNsZSB0aHJvdWdoIGFsbCBwb3NzaWJsZSB2YWx1ZXMgZm9yIHRoZSBjb21wb25lbnQgZ3JlYXRlciB0aGFuIHRoaXMgdmFsdWUgYW5kIGxlc3MgdGhhbiBtYXguXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heCBUaGUgbWF4aW11bSB2YWx1ZSBpbiB0aGUgYW5pbWF0aW9uIGN5Y2xlOyB0aGUgYW5pbWF0aW9uIHdpbGwgY3ljbGUgdGhyb3VnaCBhbGwgcG9zc2libGUgdmFsdWVzIGZvciB0aGUgY29tcG9uZW50IGxlc3MgdGhhbiB0aGlzIHZhbHVlIGFuZCBncmVhdGVyIHRoYW4gbWluLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWx0ZXJuYXRlIFdoZW4gdHJ1ZTogY29sb3IgY29tcG9udGVudCBhbmltYXRlcyBmcm9tIG1pbiB0byBtYXggYW5kIHRoZW4gZnJvbSBtYXggdG8gbWluLiBXaGVuIGZhbHNlOiBjb2xvciBjb21wb25lbnQgYW5pbWF0ZXMgZnJvbSBtaW4gdG8gbWF4IGFuZCB0aGVuIHJlc2V0cyBiYWNrIHRvIG1pbiBhZ2FpblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNwZWVkLCBvZmZzZXQsIG1pbiwgbWF4LCBhbHRlcm5hdGUpIHtcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgdGhpcy5taW4gPSBtaW47XG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xuICAgICAgICB0aGlzLmFsdGVybmF0ZSA9IGFsdGVybmF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGBSYWluYm93Q29sb3JDb21wb25lbnRBbmltYXRpb25gIGdpdmVuIGEgdmFsaWQgSlNPTiBvYmplY3RcbiAgICAgKiBAcGFyYW0geyp9IG8gSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhIGBSYWluYm93Q29sb3JDb21wb25lbnRBbmltYXRpb25gXG4gICAgICogQHJldHVybnMge1JhaW5ib3dDb2xvckNvbXBvbmVudEFuaW1hdGlvbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEZyb21PYmplY3Qobykge1xuICAgICAgICByZXR1cm4gb1xuICAgICAgICAgICAgPyBuZXcgUmFpbmJvd0NvbG9yQ29tcG9uZW50QW5pbWF0aW9uKG8uc3BlZWQsIG8ub2Zmc2V0LCBvLm1pbiwgby5tYXgsIG8uYWx0ZXJuYXRlKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5SYWluYm93Q29sb3JDb21wb25lbnRBbmltYXRpb24gPSBSYWluYm93Q29sb3JDb21wb25lbnRBbmltYXRpb247XG5jbGFzcyBSYWluYm93Q29sb3JDb21wb25lbnREZWZpbml0aW9uIHtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgcmFpbmJvdyBjb2xvciBjb21wb25lbnQgKGh1ZSwgc2F0dXJhdGlvbiwgbGlnaHRuZXNzKVxuICAgICAqIEBwYXJhbSB7UmFpbmJvd0NvbG9yQ29tcG9uZW50QW5pbWF0aW9ufSBhbmltYXRlIERlZmluZXMgYSBjb2xvciBhbmltYXRpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgRGVmaW5lcyBhIHN0YXRpYyBjb2xvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGFuaW1hdGUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSA9IGFuaW1hdGU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGBSYWluYm93Q29sb3JDb21wb25lbnREZWZpbml0aW9uYCBnaXZlbiBhIHZhbGlkIEpTT04gb2JqZWN0XG4gICAgICogQHBhcmFtIHsqfSBvIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSBgUmFpbmJvd0NvbG9yQ29tcG9uZW50RGVmaW5pdGlvbmBcbiAgICAgKiBAcmV0dXJucyB7UmFpbmJvd0NvbG9yQ29tcG9uZW50RGVmaW5pdGlvbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEZyb21PYmplY3Qobykge1xuICAgICAgICByZXR1cm4gb1xuICAgICAgICAgICAgPyBuZXcgUmFpbmJvd0NvbG9yQ29tcG9uZW50RGVmaW5pdGlvbihSYWluYm93Q29sb3JDb21wb25lbnRBbmltYXRpb24ubG9hZEZyb21PYmplY3Qoby5hbmltYXRlKSwgby52YWx1ZSlcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydHMuUmFpbmJvd0NvbG9yQ29tcG9uZW50RGVmaW5pdGlvbiA9IFJhaW5ib3dDb2xvckNvbXBvbmVudERlZmluaXRpb247XG5jbGFzcyBSYWluYm93Q29sb3JEZWZpbml0aW9uIHtcbiAgICAvKipcbiAgICAgKiBBbGxvd3MgZm9yIGFuaW1hdGlvbnMgb2YgaHVlLCBzYXR1cmF0aW9uLCBhbmQgbGlnaHRuZXNzIG9mIGludGVyZmFjZSBjb2xvcnMuXG4gICAgICogQHBhcmFtIHtSYWluYm93Q29sb3JDb21wb25lbnREZWZpbml0aW9ufSBodWUgRGVmaW5lcyBiZWhhdmlvciBvZiB0aGUgaHVlIGNvbXBvbmVudCBvZiB0aGUgaW50ZXJmYWNlIGNvbG9yc1xuICAgICAqIEBwYXJhbSB7UmFpbmJvd0NvbG9yQ29tcG9uZW50RGVmaW5pdGlvbn0gc2F0dXJhdGlvbiBEZWZpbmVzIGJlaGF2aW9yIG9mIHRoZSBzYXR1cmF0aW9uIGNvbXBvbmVudCBvZiB0aGUgaW50ZXJmYWNlIGNvbG9yc1xuICAgICAqIEBwYXJhbSB7UmFpbmJvd0NvbG9yQ29tcG9uZW50RGVmaW5pdGlvbn0gbGlnaHRuZXNzIERlZmluZXMgYmVoYXZpb3Igb2YgdGhlIGxpZ2h0bmVzcyBjb21wb25lbnQgb2YgdGhlIGludGVyZmFjZSBjb2xvcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzcykge1xuICAgICAgICB0aGlzLmh1ZSA9IGh1ZTtcbiAgICAgICAgdGhpcy5zYXR1cmF0aW9uID0gc2F0dXJhdGlvbjtcbiAgICAgICAgdGhpcy5saWdodG5lc3MgPSBsaWdodG5lc3M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBgUmFpbmJvd0NvbG9yRGVmaW5pdGlvbmAgZ2l2ZW4gYSB2YWxpZCBKU09OIG9iamVjdFxuICAgICAqIEBwYXJhbSB7Kn0gbyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGEgYFJhaW5ib3dDb2xvckRlZmluaXRpb25gXG4gICAgICogQHJldHVybnMge1JhaW5ib3dDb2xvckRlZmluaXRpb259XG4gICAgICovXG4gICAgc3RhdGljIGxvYWRGcm9tT2JqZWN0KG8pIHtcbiAgICAgICAgcmV0dXJuIG9cbiAgICAgICAgICAgID8gbmV3IFJhaW5ib3dDb2xvckRlZmluaXRpb24oUmFpbmJvd0NvbG9yQ29tcG9uZW50RGVmaW5pdGlvbi5sb2FkRnJvbU9iamVjdChvLmh1ZSksIFJhaW5ib3dDb2xvckNvbXBvbmVudERlZmluaXRpb24ubG9hZEZyb21PYmplY3Qoby5zYXR1cmF0aW9uKSwgUmFpbmJvd0NvbG9yQ29tcG9uZW50RGVmaW5pdGlvbi5sb2FkRnJvbU9iamVjdChvLmxpZ2h0bmVzcykpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLlJhaW5ib3dDb2xvckRlZmluaXRpb24gPSBSYWluYm93Q29sb3JEZWZpbml0aW9uO1xuY2xhc3MgTW9kZXJuSW50ZXJmYWNlQ29sb3JEZWZpbml0aW9uIHtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGluZGl2aWR1YWwgY29sb3JzIGZvciBkaWZmZXJlbnQgU2Nob29sb2d5IGludGVyZmFjZSBjb21wb25lbnRzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByaW1hcnkgUHJpbWFyeSBpbnRlcmZhY2UgY29sb3IgLS0gc2hvdWxkIGJlIHRoZSBsaWdodGVzdCBvZiB0aGUgbWFpbiBjb2xvcnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWNjZW50IEFjY2VudCBpbnRlcmZhY2UgY29sb3IgLS0gc2hvdWxkIGJlIGRhcmtlciB0aGFuIHByaW1hcnksIGJ1dCBsaWdodGVyIHRoYW4gc2Vjb25kYXJ5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlY29uZGFyeSBTZWNvbmRhcnkgaW50ZXJmYWNlIGNvbG9yIC0tIHNob3VsZCBiZSB0aGUgZGFya2VzdCBvZiB0aGUgbWFpbiBjb2xvcnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgQ29sb3IgZm9yIHRleHRib3hlcyBhbmQgb3RoZXIgaW5wdXQgZmllbGRzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvcmRlciBDb2xvciBmb3IgZWxlbWVudCBib3JkZXJzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhpZ2hsaWdodCBDb2xvciBmb3IgaGlnaGxpZ2h0cywgd2FybmluZ3MsIGFuZCB3cm9uZyBhbnN3ZXJzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGl2ZSBDb2xvciBmb3IgYWN0aXZlIGVsZW1lbnRzLCBzZWxlY3RlZCBpdGVtcywgYW5kIGNvcnJlY3QgYW5zd2Vyc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBncmFkZXMgQ29sb3IgZm9yIGdyYWRlcyBhbmQgc2NvcmVzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yIENvbG9yIGZvciBlcnJvciBtZXNzYWdlcyBhbmQgaWNvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwcmltYXJ5LCBhY2NlbnQsIHNlY29uZGFyeSwgaW5wdXQsIGJvcmRlciwgaGlnaGxpZ2h0LCBhY3RpdmUsIGdyYWRlcywgZXJyb3IpIHtcbiAgICAgICAgdGhpcy5wcmltYXJ5ID0gcHJpbWFyeTtcbiAgICAgICAgdGhpcy5hY2NlbnQgPSBhY2NlbnQ7XG4gICAgICAgIHRoaXMuc2Vjb25kYXJ5ID0gc2Vjb25kYXJ5O1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICAgIHRoaXMuYm9yZGVyID0gYm9yZGVyO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XG4gICAgICAgIHRoaXMuZ3JhZGVzID0gZ3JhZGVzO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBgTW9kZXJuSW50ZXJmYWNlQ29sb3JEZWZpbml0aW9uYCBnaXZlbiBhIHZhbGlkIEpTT04gb2JqZWN0XG4gICAgICogQHBhcmFtIHsqfSBvIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSBgTW9kZXJuSW50ZXJmYWNlQ29sb3JEZWZpbml0aW9uYFxuICAgICAqIEByZXR1cm5zIHtNb2Rlcm5JbnRlcmZhY2VDb2xvckRlZmluaXRpb259XG4gICAgICovXG4gICAgc3RhdGljIGxvYWRGcm9tT2JqZWN0KG8pIHtcbiAgICAgICAgcmV0dXJuIG9cbiAgICAgICAgICAgID8gbmV3IE1vZGVybkludGVyZmFjZUNvbG9yRGVmaW5pdGlvbihvLnByaW1hcnksIG8uYWNjZW50LCBvLnNlY29uZGFyeSwgby5pbnB1dCwgby5ib3JkZXIsIG8uaGlnaGxpZ2h0LCBvLmFjdGl2ZSwgby5ncmFkZXMsIG8uZXJyb3IpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLk1vZGVybkludGVyZmFjZUNvbG9yRGVmaW5pdGlvbiA9IE1vZGVybkludGVyZmFjZUNvbG9yRGVmaW5pdGlvbjtcbmNsYXNzIE1vZGVyblRleHRDb2xvckRlZmluaXRpb24ge1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgY29sb3JzIGZvciB0ZXh0dWFsIGVsZW1lbnRzIG9mIHRoZSBTY2hvb2xvZ3kgaW50ZXJmYWNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByaW1hcnkgTWFpbiB0ZXh0IGNvbG9yLCBzaG91bGQgY29udHJhc3Qgd2l0aCBgaW50ZXJmYWNlLnByaW1hcnlgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG11dGVkIE11dGVkIHRleHQgY29sb3IsIHNob3VsZCBzdGFuZCBvdXQgbGVzcyB0aGFuIHByaW1hcnlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udHJhc3QgQ29udHJhc3QgdGV4dCBjb2xvciwgc2hvdWxkIGFsd2F5cyBiZSBsaWdodCBvciB3aGl0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaW1hcnksIG11dGVkLCBjb250cmFzdCkge1xuICAgICAgICB0aGlzLnByaW1hcnkgPSBwcmltYXJ5O1xuICAgICAgICB0aGlzLm11dGVkID0gbXV0ZWQ7XG4gICAgICAgIHRoaXMuY29udHJhc3QgPSBjb250cmFzdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGBNb2Rlcm5UZXh0Q29sb3JEZWZpbml0aW9uYCBnaXZlbiBhIHZhbGlkIEpTT04gb2JqZWN0XG4gICAgICogQHBhcmFtIHsqfSBvIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSBgTW9kZXJuVGV4dENvbG9yRGVmaW5pdGlvbmBcbiAgICAgKiBAcmV0dXJucyB7TW9kZXJuVGV4dENvbG9yRGVmaW5pdGlvbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEZyb21PYmplY3Qobykge1xuICAgICAgICByZXR1cm4gbyA/IG5ldyBNb2Rlcm5UZXh0Q29sb3JEZWZpbml0aW9uKG8ucHJpbWFyeSwgby5tdXRlZCwgby5jb250cmFzdCkgOiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5Nb2Rlcm5UZXh0Q29sb3JEZWZpbml0aW9uID0gTW9kZXJuVGV4dENvbG9yRGVmaW5pdGlvbjtcbmNsYXNzIE1vZGVybk9wdGlvbnNEZWZpbml0aW9uIHtcbiAgICAvKipcbiAgICAgKiBDb25maWd1cmVzIHN0eWxlIG9wdGlvbnMgZm9yIHRoZSBtb2Rlcm4gdGhlbWUgZW5naW5lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJvcmRlclJhZGl1cyBUaGUgc2l6ZSBvZiBib3JkZXIgcmFkaXVzIHJvdW5kZWQgY29ybmVycyAoaW4gcGl4ZWxzKVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBib3JkZXJTaXplIFRoZSB3aWR0aCBvZiBib3JkZXJzIChpbiBwaXhlbHMpXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhZGRpbmcgVGhlIGFtb3VudCBvZiBwYWRkaW5nIGZvciBjZXJ0YWluIGVsZW1lbnRzIChpbiBwaXhlbHMpXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYm9yZGVyUmFkaXVzLCBib3JkZXJTaXplLCBwYWRkaW5nKSB7XG4gICAgICAgIHRoaXMuYm9yZGVyUmFkaXVzID0gYm9yZGVyUmFkaXVzO1xuICAgICAgICB0aGlzLmJvcmRlclNpemUgPSBib3JkZXJTaXplO1xuICAgICAgICB0aGlzLnBhZGRpbmcgPSBwYWRkaW5nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgYE1vZGVybk9wdGlvbnNEZWZpbml0aW9uYCBnaXZlbiBhIHZhbGlkIEpTT04gb2JqZWN0XG4gICAgICogQHBhcmFtIHsqfSBvIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSBgTW9kZXJuT3B0aW9uc0RlZmluaXRpb25gXG4gICAgICogQHJldHVybnMge01vZGVybk9wdGlvbnNEZWZpbml0aW9ufVxuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkRnJvbU9iamVjdChvKSB7XG4gICAgICAgIHJldHVybiBvID8gbmV3IE1vZGVybk9wdGlvbnNEZWZpbml0aW9uKG8uYm9yZGVyUmFkaXVzLCBvLmJvcmRlclNpemUsIG8ucGFkZGluZykgOiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5Nb2Rlcm5PcHRpb25zRGVmaW5pdGlvbiA9IE1vZGVybk9wdGlvbnNEZWZpbml0aW9uO1xuY2xhc3MgTW9kZXJuQ29sb3JEZWZpbml0aW9uIHtcbiAgICAvKipcbiAgICAgKiBVdGlsaXplcyB0aGUgbW9kZXJuIHRoZW1lIGVuZ2luZSB0byBjb250cm9sIHNpZ25pZmljYW50bHkgbW9yZSBvZiB0aGUgaW50ZXJmYWNlJ3MgY29sb3JzLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGFyayBXaGV0aGVyIHRoZSB0aGVtZSBpcyBkYXJrIG9yIGxpZ2h0XG4gICAgICogQHBhcmFtIHtNb2Rlcm5JbnRlcmZhY2VDb2xvckRlZmluaXRpb259IGludGVyZmFjZUNvbG9ycyBDb2xvcnMgZm9yIG1haW4gaW50ZXJmYWNlIGNvbXBvbmVudHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBjYWxlbmRhciBDb2xvcnMgZm9yIFNjaG9vbG9neSBjYWxlbmRhciBldmVudHMgKHNwZWNpZnkgZXhhY3RseSAyMClcbiAgICAgKiBAcGFyYW0ge01vZGVyblRleHRDb2xvckRlZmluaXRpb259IHRleHQgQ29sb3JzIGZvciB0ZXh0IGVsZW1lbnRzXG4gICAgICogQHBhcmFtIHtNb2Rlcm5PcHRpb25zRGVmaW5pdGlvbn0gb3B0aW9ucyBTdHlsZSBvcHRpb25zIGZvciB0aGUgaW50ZXJmYWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGFyaywgaW50ZXJmYWNlQ29sb3JzLCBjYWxlbmRhciwgdGV4dCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmRhcmsgPSBkYXJrO1xuICAgICAgICB0aGlzLmludGVyZmFjZSA9IGludGVyZmFjZUNvbG9ycztcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IGNhbGVuZGFyO1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgYE1vZGVybkNvbG9yRGVmaW5pdGlvbmAgZ2l2ZW4gYSB2YWxpZCBKU09OIG9iamVjdFxuICAgICAqIEBwYXJhbSB7Kn0gbyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGEgYE1vZGVybkNvbG9yRGVmaW5pdGlvbmBcbiAgICAgKiBAcmV0dXJucyB7TW9kZXJuQ29sb3JEZWZpbml0aW9ufVxuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkRnJvbU9iamVjdChvKSB7XG4gICAgICAgIHJldHVybiBvXG4gICAgICAgICAgICA/IG5ldyBNb2Rlcm5Db2xvckRlZmluaXRpb24oby5kYXJrLCBNb2Rlcm5JbnRlcmZhY2VDb2xvckRlZmluaXRpb24ubG9hZEZyb21PYmplY3Qoby5pbnRlcmZhY2UpLCBvLmNhbGVuZGFyLCBNb2Rlcm5UZXh0Q29sb3JEZWZpbml0aW9uLmxvYWRGcm9tT2JqZWN0KG8udGV4dCksIE1vZGVybk9wdGlvbnNEZWZpbml0aW9uLmxvYWRGcm9tT2JqZWN0KG8ub3B0aW9ucykpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLk1vZGVybkNvbG9yRGVmaW5pdGlvbiA9IE1vZGVybkNvbG9yRGVmaW5pdGlvbjtcbmNsYXNzIFRoZW1lQ29sb3Ige1xuICAgIC8qKlxuICAgICAqIERlc2NyaWJlcyB0aGUgY29sb3JzIHRvIHVzZSBmb3IgdGhlIFNjaG9vbG9neSBpbnRlcmZhY2VcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaHVlIFRoZSB0aGVtZSdzIEhTTCBjb2xvciBodWUsIHVzZWQgdG8gY29sb3IgdGhlIGludGVyZmFjZSBieSBtb2RpZnlpbmcgdGhlIHNhdHVyYXRpb24gYW5kIGxpZ2h0bmVzcyB2YWx1ZXNcbiAgICAgKiBAcGFyYW0ge0N1c3RvbUNvbG9yRGVmaW5pdGlvbn0gY3VzdG9tIEFsbG93cyBmaW5lIGNvbnRyb2wgb3ZlciBpbmRpdmlkdWFsIGNvbG9ycyBpbiB0aGUgaW50ZXJmYWNlXG4gICAgICogQHBhcmFtIHtSYWluYm93Q29sb3JEZWZpbml0aW9ufSByYWluYm93IEFsbG93cyBmb3IgYW5pbWF0aW9ucyBvZiBodWUsIHNhdHVyYXRpb24sIGFuZCBsaWdodG5lc3Mgb2YgaW50ZXJmYWNlIGNvbG9yc1xuICAgICAqIEBwYXJhbSB7TW9kZXJuQ29sb3JEZWZpbml0aW9ufSBtb2Rlcm4gVXRpbGl6ZXMgdGhlIG1vZGVybiB0aGVtZSBlbmdpbmUgdG8gY29udHJvbCBzaWduaWZpY2FudGx5IG1vcmUgb2YgdGhlIGludGVyZmFjZSdzIGNvbG9yc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGh1ZSwgY3VzdG9tLCByYWluYm93LCBtb2Rlcm4pIHtcbiAgICAgICAgdGhpcy5odWUgPSBodWU7XG4gICAgICAgIHRoaXMuY3VzdG9tID0gY3VzdG9tO1xuICAgICAgICB0aGlzLnJhaW5ib3cgPSByYWluYm93O1xuICAgICAgICB0aGlzLm1vZGVybiA9IG1vZGVybjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGBUaGVtZUNvbG9yYCBnaXZlbiBhIHZhbGlkIEpTT04gb2JqZWN0XG4gICAgICogQHBhcmFtIHsqfSBvIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSBgVGhlbWVDb2xvcmBcbiAgICAgKiBAcmV0dXJucyB7VGhlbWVDb2xvcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEZyb21PYmplY3Qobykge1xuICAgICAgICByZXR1cm4gb1xuICAgICAgICAgICAgPyBuZXcgVGhlbWVDb2xvcihvLmh1ZSwgQ3VzdG9tQ29sb3JEZWZpbml0aW9uLmxvYWRGcm9tT2JqZWN0KG8uY3VzdG9tKSwgUmFpbmJvd0NvbG9yRGVmaW5pdGlvbi5sb2FkRnJvbU9iamVjdChvLnJhaW5ib3cpLCBNb2Rlcm5Db2xvckRlZmluaXRpb24ubG9hZEZyb21PYmplY3Qoby5tb2Rlcm4pKVxuICAgICAgICAgICAgOiBuZXcgVGhlbWVDb2xvcigyMTApO1xuICAgIH1cbn1cbmV4cG9ydHMuVGhlbWVDb2xvciA9IFRoZW1lQ29sb3I7XG5jbGFzcyBUaGVtZUxvZ28ge1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBsb2dvIGltYWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBMaW5rIHRvIGFuIGltYWdlXG4gICAgICogQHBhcmFtIHtcInNjaG9vbG9neV9wbHVzXCJ8XCJzY2hvb2xvZ3lfbG9nb1wifFwibGF1c2RfbGVnYWN5XCJ8XCJsYXVzZF8yMDE5XCJ8XCJsYXVzZF8yMDIyXCJ8XCJkZWZhdWx0XCJ9IHByZXNldCBCdWlsdC1pbiBpbWFnZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVybCwgcHJlc2V0KSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLnByZXNldCA9IHByZXNldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGBUaGVtZUxvZ29gIGdpdmVuIGEgdmFsaWQgSlNPTiBvYmplY3RcbiAgICAgKiBAcGFyYW0geyp9IG8gSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhIGBUaGVtZUxvZ29gXG4gICAgICogQHJldHVybnMge1RoZW1lTG9nb31cbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEZyb21PYmplY3Qobykge1xuICAgICAgICByZXR1cm4gbyA/IG5ldyBUaGVtZUxvZ28oby51cmwsIG8ucHJlc2V0KSA6IG5ldyBUaGVtZUxvZ28odW5kZWZpbmVkLCBcInNjaG9vbG9neV9wbHVzXCIpO1xuICAgIH1cbn1cbmV4cG9ydHMuVGhlbWVMb2dvID0gVGhlbWVMb2dvO1xuY2xhc3MgVGhlbWVDdXJzb3Ige1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBjdXJzb3IgaW1hZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJpbWFyeSBMaW5rIHRvIGFuIGltYWdlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpbWFyeSkge1xuICAgICAgICB0aGlzLnByaW1hcnkgPSBwcmltYXJ5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgYFRoZW1lQ3Vyc29yYCBnaXZlbiBhIHZhbGlkIEpTT04gb2JqZWN0XG4gICAgICogQHBhcmFtIHsqfSBvIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSBgVGhlbWVDdXJzb3JgXG4gICAgICogQHJldHVybnMge1RoZW1lQ3Vyc29yfVxuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkRnJvbU9iamVjdChvKSB7XG4gICAgICAgIHJldHVybiBvID8gbmV3IFRoZW1lQ3Vyc29yKG8ucHJpbWFyeSkgOiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5UaGVtZUN1cnNvciA9IFRoZW1lQ3Vyc29yO1xuY2xhc3MgVGhlbWVJY29uIHtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgY3VzdG9tIGNvdXJzZSBpY29uXG4gICAgICogQHBhcmFtIHtSZWdFeHB8c3RyaW5nfSByZWdleCBSZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggY291cnNlc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgTGluayB0byBhbiBpbWFnZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlZ2V4LCB1cmwpIHtcbiAgICAgICAgdGhpcy5yZWdleCA9IHJlZ2V4O1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGBUaGVtZUljb25bXWAgZ2l2ZW4gYSB2YWxpZCBKU09OIGFycmF5XG4gICAgICogQHBhcmFtIHtbXX0gYXJyYXkgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhIGBUaGVtZUljb25bXWBcbiAgICAgKiBAcmV0dXJucyB7VGhlbWVJY29uW119XG4gICAgICovXG4gICAgc3RhdGljIGxvYWRBcnJheUZyb21PYmplY3QoYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5ID8gYXJyYXkubWFwKHggPT4gbmV3IFRoZW1lSWNvbih4LnJlZ2V4LCB4LnVybCkpIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydHMuVGhlbWVJY29uID0gVGhlbWVJY29uO1xuY2xhc3MgU2Nob29sb2d5VGhlbWUge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB0aGVtZSBmcm9tIHRoZSBnaXZlbiBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVXNlZCBmb3IgaWRlbnRpZmljYXRpb24gcHVycG9zZXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmVyc2lvbiBUaGVtZSBzcGVjaWZpY2F0aW9uIHZlcnNpb25cbiAgICAgKiBAcGFyYW0ge1RoZW1lQ29sb3J9IGNvbG9yIEludGVyZmFjZSBjb2xvcnNcbiAgICAgKiBAcGFyYW0ge1RoZW1lTG9nb30gbG9nbyBMb2dvIGltYWdlXG4gICAgICogQHBhcmFtIHtUaGVtZUN1cnNvcn0gY3Vyc29yIEN1cnNvciBpbWFnZVxuICAgICAqIEBwYXJhbSB7VGhlbWVJY29uW119IGljb25zIEN1c3RvbSBjb3Vyc2UgaWNvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB2ZXJzaW9uLCBjb2xvciwgbG9nbywgY3Vyc29yLCBpY29ucykge1xuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZW1lIG11c3QgaGF2ZSBhIG5hbWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbiB8fCBTY2hvb2xvZ3lUaGVtZS5DVVJSRU5UX1ZFUlNJT047XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5sb2dvID0gbG9nbztcbiAgICAgICAgdGhpcy5jdXJzb3IgPSBjdXJzb3I7XG4gICAgICAgIHRoaXMuaWNvbnMgPSBpY29ucztcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGBTY2hvb2xvZ3lUaGVtZWAgZ2l2ZW4gYSB2YWxpZCBKU09OIG9iamVjdFxuICAgICAqIEBwYXJhbSB7Kn0gbyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGEgYFNjaG9vbG9neVRoZW1lYFxuICAgICAqIEByZXR1cm5zIHtTY2hvb2xvZ3lUaGVtZX1cbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEZyb21PYmplY3Qobykge1xuICAgICAgICBpZiAobyAmJiBvLnZlcnNpb24gPT09IFNjaG9vbG9neVRoZW1lLkNVUlJFTlRfVkVSU0lPTikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTY2hvb2xvZ3lUaGVtZShvLm5hbWUsIG8udmVyc2lvbiwgVGhlbWVDb2xvci5sb2FkRnJvbU9iamVjdChvLmNvbG9yKSwgVGhlbWVMb2dvLmxvYWRGcm9tT2JqZWN0KG8ubG9nbyksIFRoZW1lQ3Vyc29yLmxvYWRGcm9tT2JqZWN0KG8uY3Vyc29yKSwgVGhlbWVJY29uLmxvYWRBcnJheUZyb21PYmplY3Qoby5pY29ucykpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0aGVtZSBvYmplY3QgcHJvdmlkZWQuIE1ha2Ugc3VyZSB0aGUgcHJvdmlkZWQgSlNPTiBpcyBhIHZhbGlkIHZlcnNpb24gJHtTY2hvb2xvZ3lUaGVtZS5DVVJSRU5UX1ZFUlNJT059IHRoZW1lLmApO1xuICAgIH1cbn1cbmV4cG9ydHMuU2Nob29sb2d5VGhlbWUgPSBTY2hvb2xvZ3lUaGVtZTtcblNjaG9vbG9neVRoZW1lLkNVUlJFTlRfVkVSU0lPTiA9IDI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE07IiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvdGhlbWUtZWRpdG9yLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9