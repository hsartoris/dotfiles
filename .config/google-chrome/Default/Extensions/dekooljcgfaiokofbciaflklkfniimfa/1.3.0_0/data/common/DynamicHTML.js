var DynamicHTML = (function () {
    'use strict';
    var self = {},
        parseBBcode = function (text, el) {},
        processBBtag =  function (code) {
            var info = code.match(/^\[([^\]]*|([^=\]]*)=?([^\]]*)?\](.*)\[\/\2)\]$/m),
                tag = info[2] || info[1],
                options =  info[3],
                innercode =  info[4],
                items,
                page,
                i,
                n,
                returninfo = {};
            switch (tag) {
            case "br":
                returninfo = {"tag_name": "br"};
                break;
            case "hr":
                returninfo = {"tag_name": "hr"};
                break;
            case "notag":
                returninfo = {"tag_name": "text_node", "text": innercode};
                break;
            case "b":
                returninfo = {"tag_name": "span", "innerhtml": parseBBcode(innercode), "css": {"font-weight": "bold"}};
                break;
            case "i":
                returninfo = {"tag_name": "span", "innerhtml": parseBBcode(innercode), "css": {"font-style": "italic"}};
                break;
            case "u":
                returninfo = {"tag_name": "span", "innerhtml": parseBBcode(innercode), "css": {"text-decoration": "underline"}};
                break;
            case "s":
                returninfo = {"tag_name": "span", "innerhtml": parseBBcode(innercode), "css": {"text-decoration": "line-through"}};
                break;
            case "url":
                options = options || innercode;
                page = options.match(/^page:\/\/(.*)/);

                if (page === null) {
                    returninfo = {"tag_name": "a", "innerhtml": parseBBcode(innercode), attr: {"href": options, "target": "_blank"}};
                } else {
                    returninfo = {
                        "tag_name": "a",
                        "innerhtml": parseBBcode(innercode),
                        "attr" : {"class": "duokeyboard-link"},
                        "events": {
                            "click": (function () {
                                var load_page = page[1];
                                return function () {
                                    PageLoader.loadPage(load_page);
                                };
                            }())
                        }
                    };
                }

                break;
            case "img":
                returninfo = {"tag_name": "figure", "innerhtml": [
                    {"tag_name": "img", "attr": {"src": options || innercode}},
                    (options ? {"tag_name": "figcaption", "innerhtml": parseBBcode(innercode)} : {})
                ]};
                break;
            case "code":
                returninfo = {"tag_name": "pre", "text": innercode};
                break;
            case "color":
                returninfo = {"tag_name": "span", "innerhtml": parseBBcode(innercode), "css": {"color": options || "auto"}};
                break;
            case "list":
                items = innercode.split('[*]');
                items[0] = {"tag_name": "text_node", "text": items[0]};
                for (i = 1, n = items.length; i < n; ++i) {
                    items[i] = {"tag_name": "li", "innerhtml": parseBBcode(items[i])};
                }
                returninfo = {"tag_name": "ul", "innerhtml": items || {}};
                break;
            }
            return returninfo;

        },
        buildElement = function (h) {
            var j,
                el = null;
            if (h.tag_name === "text_node") {
                return document.createTextNode(h.text || "");
            }
            el = document.createElement(h.tag_name);

            if (h.events) {
                for (j in h.events) {
                    el.addEventListener(j, h.events[j]);
                }
            }

            if (h.attr) {
                for (j in h.attr) {
                    el.setAttribute(j, h.attr[j]);
                }
            }
            if (h.css) {
                for (j in h.css) {
                    el.style[j] = h.css[j];
                }
            }
            if (h.innerhtml) {
                el = self.buildHTML(h.innerhtml, el);
            }
            if (h.text) {
                el.innerText = h.text;
            }
            if (h.bbcode) {
                el = parseBBcode(h.bbcode, el);
            }
            return el;
        };
    parseBBcode = function (text, el) {
        var i,
            n,
            regex = /\[((br|hr)|(b|i|u|s|url|img|code|color|list|notag)(?:=[^\]]*)?\](?:.)*?\[\/\3)\]/gm,
            bbcodes = text.match(regex),
            splittext = text,
            content = [];

        if (!bbcodes) {
            content.push(processBBtag('[notag]' + text + '[/notag]'));
            text = "";
        } else {
            for (i = 0, n = bbcodes.length; i < n; ++i) {
                splittext = text.split(bbcodes[i], 1);
                content.push({"tag_name": "text_node", "text": splittext[0]});
                content.push(processBBtag(bbcodes[i]));
                text = text.substring((splittext[0] + bbcodes[i]).length);
            }
        }

        if (text) {
            content.push(processBBtag('[notag]' + text + '[/notag]'));
        }

        return el ? self.buildHTML(content, el) : content;
    };
    self = {
        "setSelected" : function (select, value) {
            select.selectedIndex = null;
            var i, n, options = select.options;
            for (i = 0, n = options.length; i < n; ++i) {
                if (options[i].value === value) {
                    options[i].selected = true;
                }
            }
        },
        "buildHTML" : function (html, container) {
            var i,
                n,
                h,
                c;
            if (container && container instanceof Element) {
                c = container;
            } else if (container && container.tag_name) {
                c = buildElement(container);
            } else {
                c = document.createElement("div");
            }
            if (html.constructor !== Array) {
                if (container) {
                    html = [html];
                } else if (html.tag_name) {
                    c = buildElement(html);
                }
            }
            for (i = 0, n = html.length; i < n; ++i) {
                h = html[i];
                if (h instanceof Element) {
                    c.append(h);
                } else if (h.tag_name) {
                    c.appendChild(buildElement(h));
                }
            }
            return c;
        }
    };
    return self;
}());