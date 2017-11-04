var SettingsElements = (function () {
    'use strict';

    var self = {},
        buildEncounterSelect = function (initial_event, select_question) {
            var i,
                n,
                encounters_select_options = [],
                settings = Data.get("duolingo", "asc", true);

            if (select_question) {
                encounters_select_options.push(
                    {"tag_name": "option", "text": select_question, "attr": {"value": ""}}
                );
            }

            for (i = 0, n = settings.order.length; i < n; ++i) {
                encounters_select_options.push(
                    {"tag_name": "option", "text": settings.order[i], "attr": {"value": settings.order[i]}}
                );
            }

            return {
                "tag_name": "select",
                "innerhtml": encounters_select_options,
                "events" : {
                    "change": function () {initial_event(this.value); }
                }
            };
        },
        buildCheatSheetSelect = function (store_event) {
            var i,
                n,
                cheatSheet_select_options = [],
                options = [ interact.getMessage('Options_settings_kb_set_shown'), interact.getMessage('Options_settings_kb_set_hidden')],
                values = ['Small', 'Off'];

            for (i = 0, n = 2; i < n; ++i) {
                cheatSheet_select_options.push(
                    {"tag_name": "option", "text": options[i], "attr": {"value": values[i]}}
                );
            }

            return {"tag_name": "select", "innerhtml": cheatSheet_select_options, "events": {"change": store_event}};
        },
        buildKeyboardSelect = function (default_value, store_event) {
            var i, n,
                keyboards = Data.get("duokeyboards"),
                keyboard_select_options = [{"tag_name": "option", "text": interact.getMessage(default_value), "attr": {"value": "OFF"}}];

            for (i = 0, n = keyboards.order.length; i < n; ++i) {
                keyboard_select_options.push(
                    {"tag_name": "option", "text": interact.getMessage(keyboards.data[keyboards.order[i]]), "attr": {"value": keyboards.data[keyboards.order[i]]}}
                );
            }

            return {"tag_name": "select", "innerhtml": keyboard_select_options, "events": {"change": store_event}};
        },
        buildIMESelect = function (store_event) {
            var i, n, j, m,
                ime = Data.get("ime", "asc", true),
                modes = [],
                options = [],
                optionsGroups = [{
                    "tag_name": "option",
                    "text": interact.getMessage('Off'),
                    "attr": {"value": 'OFF'}
                }];

            for (i = 0, n = ime.order.length; i < n; ++i) {
                options = [];
                modes = ime.data[ime.order[i]].modes;
                for (j = 0, m = modes.length; j < m; ++j) {
                    if (!modes[j].hidden) {
                        options.push({
                            "tag_name": "option",
                            "text": interact.getMessage(modes[j].name),
                            "attr": {"value": modes[j].name}
                        });
                    }
                }
                optionsGroups.push({"tag_name": "optgroup", attr: {"label": interact.getMessage(ime.order[i])}, "innerhtml": options});
            }
            return {"tag_name": "select", "innerhtml": optionsGroups, "events": {"change": store_event}};

        },
        buildKeyStrokesSelect = function (store_event) {
            var o = [interact.getMessage("Options_settings_kb_set_ks_on"), interact.getMessage("Options_settings_kb_set_ks_off")],
                values = ["ON", "OFF"],
                order = [0, 1],
                options = [],
                i,
                n;
            for (i = 0, n = order.length; i < n; ++i) {
                options.push(
                    {"tag_name": "option", "text": o[order[i]], "attr": {"value": values[order[i]]}}
                );
            }

            return {
                "tag_name": "select",
                "innerhtml": options,
                "events": {"change": store_event}
            };
        },
        buildKeyboardKeyLayoutSelect = function (store_event) {
            var o = [
                    interact.getMessage("Options_settings_kb_key_layout_101"),
                    interact.getMessage("Options_settings_kb_key_layout_101A"),
                    interact.getMessage("Options_settings_kb_key_layout_102"),
                    interact.getMessage("Options_settings_kb_key_layout_102A")
                ],
                values = ["101", "101A", "102", "102A"],
                order = [o[0], o[1], o[2], o[3]],
                options = [],
                i,
                n;

            order.sortIndices();

            for (i = 0, n = order.length; i < n; ++i) {
                options.push(
                    {"tag_name": "option", "text": o[order[i]], "attr": {"value": values[order[i]]}}
                );
            }

            return {
                "tag_name": "select",
                "innerhtml": options,
                "events": {"change": store_event}
            };
        },
        buildFJGuideSelect = function (store_event) {
            var o = [interact.getMessage("Options_settings_kb_set_fj_bumps"), interact.getMessage("Options_settings_kb_set_fj_bk")],
                values = ["OFF", "Bumps", "Background"],
                order = [o[0], o[1]],
                options = [],
                i,
                n;

            order.sortIndices();
            ++order[0];
            ++order[1];
            order.unshift(0);
            o.unshift(interact.getMessage("Options_settings_kb_set_fj_none"));

            for (i = 0, n = order.length; i < n; ++i) {
                options.push(
                    {"tag_name": "option", "text": o[order[i]], "attr": {"value": values[order[i]]}}
                );
            }

            return {
                "tag_name": "select",
                "innerhtml": options,
                "events": {"change": store_event}
            };
        };
    self = {
        "buildSettings" : function (select, initialize_event, store_event, singleLanguage) {
            var settings = Data.get("duolingo", "asc", true),
                language_settings = (settings.order.length === 0 ? null : settings.order[0]);
            if (!singleLanguage || singleLanguage === 2) {
                select.language = DynamicHTML.buildHTML(singleLanguage ? {"tag_name": "span", "attr": {"id": "DuoKeyboard-field-id"}} : buildEncounterSelect(initialize_event));
                select.language_container = DynamicHTML.buildHTML([
                    {"tag_name": "span", "text": interact.getMessage("Options_settings_kb_set_encounter")},
                    select.language
                ]);
            } else {
                select.language_container = {"tag_name": "br"};
            }
            select.keyboard = DynamicHTML.buildHTML(buildKeyboardSelect('Options_settings_kb_set_no_change', store_event));
            select.cheatsheet_visability =  DynamicHTML.buildHTML(buildCheatSheetSelect(store_event));
            select.IME = DynamicHTML.buildHTML(buildIMESelect(store_event));
            if (null !== language_settings) {
                initialize_event(language_settings, select);
            }
            return {
                "select": select,
                "html" : [
                    select.language_container,
                    {"tag_name": "span", "text": interact.getMessage("Options_settings_kb_set_ask_keyboard")},
                    select.keyboard,
                    {"tag_name": "br"},
                    {"tag_name": "span", "text": interact.getMessage("Options_settings_kb_set_cheatsheet")},
                    select.cheatsheet_visability,
                    {"tag_name": "br"},
                    {"tag_name": "span", "text": interact.getMessage("Options_settings_kb_set_IME")},
                    select.IME
                ]
            };
        },
        "undetectableField": function (select, change_event) {
            var html = [{"tag_name": "span", "text": interact.getMessage("Unable_to_detect_language")}];

            select.quick_select = DynamicHTML.buildHTML(buildEncounterSelect(
                change_event,
                interact.getMessage("use_manual_settings")
            ));
            if (Data.get("duolingo").order.length > 0) {
                html = html.concat([
                    {"tag_name": "br"},
                    {"tag_name": "span", "text": interact.getMessage("use_quick_settings")},
                    select.quick_select
                ]);
            }

            return {
                "select": select,
                "html" : html
            };
        },
        "buildGlobalDuoKeyboardSettings" : function (select, initialize_event, store_event) {
            select.cheatsheet_key_strokes = DynamicHTML.buildHTML(buildKeyStrokesSelect(store_event));
            select.cheatsheet_native = DynamicHTML.buildHTML(buildKeyboardSelect('Options_settings_kb_no_native_layout', store_event));
            select.cheatsheet_fj_guide = DynamicHTML.buildHTML(buildFJGuideSelect(store_event));
            select.cheatsheet_key_layout = DynamicHTML.buildHTML(buildKeyboardKeyLayoutSelect(store_event));

            initialize_event(select);

            return {
                "select": select,
                "html" : [
                    {"tag_name": "span", "text": interact.getMessage("Options_settings_kb_global_keystroke")},
                    select.cheatsheet_key_strokes,
                    {"tag_name": "br"},
                    {"tag_name": "span", "text": interact.getMessage("Options_settings_kb_global_key_bumps")},
                    select.cheatsheet_fj_guide,
                    {"tag_name": "br"},
                    {"tag_name": "span", "text": interact.getMessage("Options_settings_kb_show_native_layout")},
                    select.cheatsheet_native,
                    {"tag_name": "br"},
                    {"tag_name": "span", "text": interact.getMessage("Options_settings_kb_key_layout")},
                    select.cheatsheet_key_layout
                ]
            };
        }
    };
    return self;
}());


