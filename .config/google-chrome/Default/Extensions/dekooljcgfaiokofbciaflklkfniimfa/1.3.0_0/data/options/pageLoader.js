var PageLoader = (function () {
    'use strict';

    var self = {},
        settings = {
            'home': {"page": "PageSettings", "menu": interact.getMessage("Options_settings_title")},
            'how_to_use': {"page": "PageHowToUse", "menu": interact.getMessage("HowToUse_title")}
        },
        el = {},
        loadMenu = function () {
            var i, menu_items = [];
            for (i in settings) {

                settings[i].el = DynamicHTML.buildHTML({
                    "tag_name": "li",
                    "innerhtml": [{"tag_name": "a", "text": settings[i].menu}],
                    "events": {"click": (function () {
                        var page = i;
                        return function () {
                            self.loadPage(page);
                        };
                    }())}
                });
                menu_items.push(settings[i].el);
            }
            DynamicHTML.buildHTML(menu_items, el.menu);
        },
        showTestArea = function (show) {
            (show ? removeClassName : addClassName)(document.getElementById('main'), 'no-testarea');
        },
        setMenuHighlight = function (el) {
            var i;
            for (i in settings) {
                (settings[i].el !== el ? removeClassName : addClassName)(settings[i].el.firstChild, 'current-page');
            }
        };

    self = {
        "init" : function () {
            el = {
                "main": document.getElementById("main"),
                "menu": document.getElementById("menu"),
                "content": document.getElementById("content"),
                "page_title": document.getElementById("page_title")
            };
            loadMenu();
            self.loadPage();
        },
        "loadPage" : function (name) {
            var n = settings[name] || settings.home;
            el.page_title.innerText = window[n.page].getTitle();
            emptyElement(el.content);
            DynamicHTML.buildHTML(window[n.page].loadPage(), el.content);
            showTestArea(window[n.page].showTestArea());
            setMenuHighlight(n.el);
        }
    };
    return self;

}());