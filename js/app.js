$(window).load(function () {
    var colorInput = $('#color');
    var bgColorInput = $('#bg-color');
    var opacityInput = $('#opacity');
    var resultInput = $('#result');


    function setColorToInput() {
        var $el = $(this);
        var val = $el.val().replace('#', '');
        $el.siblings('input[type=color]').val('#' + val);
    }

    function Hex2RGB(hex) {
        hex = hex.replace('#', '');
        var rgb = {};
        rgb.r = parseInt(hex.substr(0, 2), 16);
        rgb.g = parseInt(hex.substr(2, 2), 16);
        rgb.b = parseInt(hex.substr(4, 2), 16);
        return rgb;
    }

    function RGB2Hex(rgb) {
        var result= '#';
        if (rgb.r < 10) {
            result += '0';
        }
        result += rgb.r.toString(16);
        if (rgb.g < 10) {
            result += '0';
        }
        result += rgb.g.toString(16);
        if (rgb.b < 10) {
            result += '0';
        }
        result += rgb.b.toString(16);
        return result;
    }

    function getOriginalColor(color, opacity, backgroundColor) {
        var originalColor;
        opacity = parseFloat(opacity);

        if (opacity > 0 && opacity <= 1) {
            originalColor = Math.round((color - (1 - opacity) * backgroundColor) / opacity);
        }

        return originalColor;
    }

    function getOriginalHex(colorHex, opacity, backgroundHex) {
        var originalRgb = {};
        var backgroundRgb = Hex2RGB(backgroundHex);
        var colorRgb = Hex2RGB(colorHex);

        originalRgb.r = getOriginalColor(colorRgb.r, opacity, backgroundRgb.r);
        originalRgb.g = getOriginalColor(colorRgb.g, opacity, backgroundRgb.g);
        originalRgb.b = getOriginalColor(colorRgb.b, opacity, backgroundRgb.b);

        return RGB2Hex(originalRgb);
    }

    colorInput.on('change', setColorToInput);
    bgColorInput.on('change', setColorToInput);
    resultInput.on('change', setColorToInput);

    $('.color-selector').on('change', function () {
        $(this).siblings('input[type=text]').val($(this).val());
    });

    $('#calculate').click(function() {
        var originalHex = getOriginalHex(
            colorInput.val(),
            opacityInput.val(),
            bgColorInput.val()
        ).replace('#', '');
        resultInput.val(originalHex).change();
    });
});