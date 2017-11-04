var Data = (function () {
    'use strict';
    var self = {},
        ini = false,
        data = {},
        unsaved_language_settings = {},
        options_update_10300 = {
            "global": {
                "cheatsheet_native": "OFF",
                "cheatsheet_fj_guide": "OFF",
                "cheatsheet_key_strokes": "ON",
                "cheatsheet_key_layout" : "101"
            }
        },
        keyOrder = function (original_keys, reverse) {
            var i, n, keys = [], original, new_value;
            for (i = 0, n = original_keys.length; i < n; ++i) {
                original = original_keys[i];
                new_value = interact.getMessage(original);
                if (new_value === '') {
                    new_value = original;
                }
                keys[i] = new_value;
            }
            keys.sortIndices();
            if (reverse) {
                keys.reverse();
            }
            return keys;
        };
    self = {
        "init": function (s) {
            if (ini) {return; }
            ini = true;
            data = s;
            if (!data.version || data.version < 10300) {
                data.global = options_update_10300.global;
                data.version = 10300;
            }

        },
        "get" : function (variable, sort_order, by_keys) {
            var d = data[variable],
                order = by_keys || typeof sort_order !== "string" || !sort_order.match(/(asc|desc)/i) ? Object.keys(d) : Object.values(d);
            switch (sort_order) {
            case "asc":
                order = by_keys ? order.sort() : keyOrder(order);
                break;
            case "desc":
                order = by_keys ? order.sort().reverse() : keyOrder(order, true);
                break;
            default:
                break;
            }
            return {"data": d, "order": order};
        },
        "isValidateData" : function (key, value) {
            var test_values = [];
            switch (key) {
            case "language":
                test_values = Object.keys(data.duolingo);
                break;
            case "IME":
                test_values = data.vietnamese_setting;
                break;
            case "keyboard":
            case "cheatsheet_native":
                test_values = data.duokeyboards;
                test_values.push('OFF');
                break;
            case "cheatsheet_visability":
                test_values = ["Small", "Off"];
                break;
            case "cheatsheet_key_strokes":
                test_values = ["ON", "OFF"];
                break;
            case "cheatsheet_fj_guide":
                test_values = ["OFF", "Bumps", "Background"];
                break;
            case "cheatsheet_key_layout":
                test_values = ["101", "101A", "102", "102A"];
                break;
            }
            return test_values.indexOf(value) > -1;
        },
        "store": function (type, d) {
            switch (type) {
            case "new_language":
                if (d.language === "") {
                    break;
                }
                unsaved_language_settings[d.language] = true;
                data.duolingo[d.language] = {
                    "keyboard" : 'OFF',
                    "onscreen_keyboard" : 'Off',
                    "vietnamese" : 'OFF'
                };
                break;
            case "language_setting":
                if (self.isValidateData("language", d.language)
                        && self.isValidateData("keyboard", d.keyboard)
                        && self.isValidateData("cheatsheet_visability", d.cheatsheet_visability)
                        && self.isValidateData("IME", d.IME)
                        ) {
                    data.duolingo[d.language] = {
                        "keyboard" : d.keyboard,
                        "onscreen_keyboard" : d.cheatsheet_visability,
                        "vietnamese" : d.IME
                    };
                }
                break;
            case "global_setting":
                if (self.isValidateData("cheatsheet_native", d.cheatsheet_native)
                        && self.isValidateData("cheatsheet_key_strokes", d.cheatsheet_key_strokes)
                        && self.isValidateData("cheatsheet_fj_guide", d.cheatsheet_fj_guide)
                        && self.isValidateData("cheatsheet_key_layout", d.cheatsheet_key_layout)
                        ) {
                    data.global = {
                        "cheatsheet_native": d.cheatsheet_native,
                        "cheatsheet_fj_guide": d.cheatsheet_fj_guide,
                        "cheatsheet_key_strokes": d.cheatsheet_key_strokes,
                        "cheatsheet_key_layout": d.cheatsheet_key_layout
                    };
                }
                break;
            }
            return null;
        },
        "languageIsUnsaved"  : function (language) {
            return unsaved_language_settings[language];
        },
        "saveSingleLanguage" : function (language) {
            unsaved_language_settings[language] = false;
            interact.storeKeyboardPreferences(language, data.duolingo[language]);
        },
        "save" : function () {
            unsaved_language_settings = {};
            interact.storeOptions(data);
        }
    };
    return self;
}());
