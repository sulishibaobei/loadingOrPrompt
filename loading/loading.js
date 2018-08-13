(function(win, doc, $) {
    'use strict';
    var loadingLayer = function(opts) {
        var settings = $.extend(true, loadingLayer.defaultOpts, opts || {});
        this.init(settings);
    };
    loadingLayer.defaultOpts = {
        type: 0,
        obj: 'body',
        content: '',
        class: ''
    };
    loadingLayer.prototype = {
        init: function(opts) {
            var o = this;
            o.brithStructure(opts);
            var styleCode = '.loadingLayerBox { position: absolute;top: 0;left: 0;z-index: 1000;width: 100%; height: 100%; background: rgba(0, 0, 0, 0.4);color: #fff;}' + ' .loadingLayerBox.reverse {background: rgba(255, 255, 255, 0.8);color: #000}';
            var iconCode = '.loadingLayerBox .flexBox {display: flex;align-items: center;justify-content: center; width: 100%; height: 100%;line-height: 100%;}' + ' .loadingLayerBox .onlyIcon {width: 32px;height: 32px;-webkit-animation: myLoading 800ms linear infinite;animation: myLoading 800ms linear infinite; background: url(loading.png) center center no-repeat;background-size: 32px auto;}' +
                ' @keyframes myLoading { from {transform: rotate(0deg); }to { transform: rotate(360deg); }}' + ' @-webkit-keyframes myLoading {from {transform: rotate(0deg);}to { transform: rotate(360deg);}}' + '  .loadingLayerBox.reverse .onlyIcon { background: url(loading-reverse.png) center center no-repeat;background-size: 32px auto;}' + ' .loadingLayerBox .flexBox span {margin-left: 5px; }';
            styleCode += iconCode;
            if (!window.returnFlag) {
                window.returnFlag = true;
                o.loadCssCode(styleCode);
            }
        },
        brithStructure: function(opts) {
            var loadingHtml = '';
            var autoClass = !opts.class ? '' : opts.class;
            var curCont = (!opts.content) ? '正在奋力加载，请稍后...' : opts.content;
            this.hideLayer();
            switch (opts.type) {
                case 0: //纯图标
                    loadingHtml = '<div class="loadingLayerBox ' + autoClass + '"><div class="flexBox"><div class="onlyIcon"></div></div></div></div>';
                    $(opts.obj).append(loadingHtml);
                    break;
                case 1: //纯文字
                    loadingHtml = '<div class="loadingLayerBox ' + autoClass + '"><div class="flexBox">' + curCont + '</div></div>';
                    $(opts.obj).append(loadingHtml);
                    break;
                case 2: //文字加图片
                    loadingHtml = '<div class="loadingLayerBox ' + autoClass + '"><div class="flexBox  imageText"><div class="onlyIcon"></div><span>' + curCont + '</span></div></div>';
                    $(opts.obj).append(loadingHtml);
                    break;
                default:
                    loadingHtml = '<div class="loadingLayerBox ' + autoClass + '"><div class="flexBox"><div class="onlyIcon"></div></div></div>';
                    $(opts.obj).append(loadingHtml);
                    break;
            }
        },
        hideLayer: function() {
            $('.loadingLayerBox').remove();
        },
        loadCssCode: function(code) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.rel = "stylesheet";
            style.appendChild(document.createTextNode(code));
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(style);
        }
    };

    function showLoadingLayer(opts) {
        new loadingLayer(opts);
    };

    function hideLoadingLayer() {
        $(".loadingLayerBox").remove();
    };

    win.loadingLayer = loadingLayer;
    win.showLoadingLayer = showLoadingLayer;
    win.hideLoadingLayer = hideLoadingLayer;
})(window, document, jQuery);