(function(win, doc, $) {
    'use strict';
    var promptLayer = function(opts) {
        var settings = $.extend(true, promptLayer.defaultOpts, opts || {});
        this.init(settings);
    };
    promptLayer.defaultOpts = {
        type: 0,
        content: '',
        obj: 'body',
        time: '1500'
    };
    promptLayer.prototype = {
        init: function(opts) {
            var o = this;
            var scriptCode = '(function() {var docEle = document.documentElement, evt = "onorientationchange" in window ? "orientationchange" : "",fn = function() {var width = docEle.clientWidth;width && (docEle.style.fontSize = width / 7.5 + "px");};fn(); if (window.addEventListener) { if (evt) { window.addEventListener(evt, fn, false);}window.addEventListener("resize", fn, false);document.addEventListener("DOMContentLoaded", fn, false);}})();';
            o.brithStructure(opts);
            var styleCode = 'body{font-size:0.24rem}' + '.prompt-bg {opacity: 0;visibility: hidden;position: fixed; top: 0;right: 0;bottom: 0;left: 0;z-index: 1040;overflow-x: hidden;overflow-y: auto;display: flex;display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;justify-content: center; -webkit-justify-content: center; align-items: center;-webkit-align-items: center; -moz-box-align: center; -webkit-box-align: center; -webkit-box-pack: center;background: transparent;}' +
                '.prompt-bg.is-visible { opacity: 1; visibility: visible;-webkit-transition: opacity 0.3s 0s, visibility 0s 0s;-moz-transition: opacity 0.3s 0s, visibility 0s 0s;transition: opacity 0.3s 0s, visibility 0s 0s;}' + '.prompt {font-size: 0.28rem;text-align: center;padding: 0.3rem 0.64rem; background-color: rgba(0, 0, 0, .6); border-radius: 5px;}' + '.prompt span { font-size: 0.28rem; color: #fff;}';
            var iconCode = '.prompt img {width: 0.56rem; height: 0.56rem; margin: 0 auto 0.2rem;display:block;border:0 }';
            styleCode += iconCode;
            if (!window.returnFlag) {
                window.returnFlag = true;
                o.loadJSCode(scriptCode);
                o.loadCssCode(styleCode);
            }
        },
        brithStructure: function(opts) {
            var promptHtml = "";
            var curCont = (!opts.content) ? '操作成功' : opts.content;
            this.hideLayer(opts);
            switch (opts.type) {
                case 0: //纯文字
                    promptHtml = '<div class="prompt-bg is-visible"><div class="prompt"><span>' + curCont + '</span></div></div>';
                    $(opts.obj).append(promptHtml);
                    break;
                case 1: //操作成功
                    promptHtml = '<div class="prompt-bg is-visible"><div class="prompt"><img src="prompt_yes.png" /><span>' + curCont + '</span></div></div>';
                    $(opts.obj).append(promptHtml);
                    break;
                case 2: //操作失败
                    promptHtml = '<div class="prompt-bg is-visible"><div class="prompt"><img src="prompt_no.png" /><span>' + curCont + '</span></div></div>';
                    $(opts.obj).append(promptHtml);
                    break;
                default:
                    promptHtml = '<div class="prompt-bg is-visible"><div class="prompt"><span>' + curCont + '</span></div></div>';
                    $(opts.obj).append(promptHtml);
                    break;
            }
        },
        hideLayer: function(opts) {
            var time = !opts.time ? '1500' : opts.time;
            setTimeout(function() {
                $('.prompt-bg').removeClass('is-visible');
            }, time);
        },
        loadJSCode: function(code) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.appendChild(document.createTextNode(code));
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(script);
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

    function showPromptLayer(type, content, obj, time) {
        var opts = {
            type: type,
            content: content,
            obj: (!obj) ? obj : 'body',
            time: time
        }
        new promptLayer(opts);
    };

    function hidePromptLayer(opts) {
        $('.prompt-bg').removeClass('is-visible');
    };
    win.promptLayer = promptLayer;
    win.showPromptLayer = showPromptLayer;
    win.hideLayer = hidePromptLayer;

})(window, document, jQuery);