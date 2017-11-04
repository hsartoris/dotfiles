var PageSettings = (function () {
    'use strict';

    var self = {},
        save_button,
        select = {
            "language" : {},
            "keyboard" : {},
            "cheatsheet_visability" : {},
            "cheatsheet_native" : {},
            "IME" : {},
            "cheatsheet_key_strokes" : {},
            "cheatsheet_fj_guide" : {},
            "cheatsheet_key_layout" : {}
        },
        setCheatSheetVisability = function () {
            select.cheatsheet_visability.disabled = (select.keyboard.value === "OFF" ? "disabled" : null);
        },
        storeGlobalSettings = function () {
            Data.store("global_setting", {
                "cheatsheet_native" : select.cheatsheet_native.value,
                "cheatsheet_key_strokes" : select.cheatsheet_key_strokes.value,
                "cheatsheet_fj_guide" : select.cheatsheet_fj_guide.value,
                "cheatsheet_key_layout" : select.cheatsheet_key_layout.value
            });
            if (Data.isValidateData("language", select.language.value)) {
                removeClassName(save_button, 'btn-disabled');
                DuoKeyboardController.optionsPreview(select.language.value);
            }

        },
        storeLanguageSettings = function () {
            Data.store("language_setting", {
                "language" : select.language.value,
                "keyboard" : select.keyboard.value,
                "cheatsheet_visability" : select.cheatsheet_visability.value,
                "IME" : select.IME.value
            });
            if (Data.isValidateData("language", select.language.value)) {
                removeClassName(save_button, 'btn-disabled');
                DuoKeyboardController.optionsPreview(select.language.value);
            }
            setCheatSheetVisability();
        },
        setInitialGlobalSettings = function (s) {
            var settings = Data.get("global").data,
                sel = s || select;

            DynamicHTML.setSelected(sel.cheatsheet_native, settings.cheatsheet_native);
            DynamicHTML.setSelected(sel.cheatsheet_key_strokes, settings.cheatsheet_key_strokes);
            DynamicHTML.setSelected(sel.cheatsheet_fj_guide, settings.cheatsheet_fj_guide);
            DynamicHTML.setSelected(sel.cheatsheet_key_layout, settings.cheatsheet_key_layout);
        },
        setInitialLanguageSettings = function (language_settings, s) {
            var settings = Data.get("duolingo").data[language_settings],
                sel = s || select;

            if (!settings) {
                return;
            }
            DynamicHTML.setSelected(sel.keyboard, settings.keyboard);
            DynamicHTML.setSelected(sel.cheatsheet_visability, settings.onscreen_keyboard);
            DynamicHTML.setSelected(sel.IME, settings.vietnamese);
            DuoKeyboardController.optionsPreview(language_settings);

            setCheatSheetVisability();
        },
        buildStarterInfo = function () {
            return [
                {"tag_name": "span", "bbcode": interact.getMessage("Options_settings_starter_info")}
            ];
        };
    self = {
        "showTestArea" : function () {
            return Data.get("duolingo").order.length !== 0;
        },
        "getTitle" : function () {
            return interact.getMessage("Options_settings_title");
        },
        "loadPage" : function () {
            var settings = Data.get("duolingo", "asc", true),
                tmp = {},
                save_message = document.getElementById('duolingo-save-info'),
                page = [{"tag_name": "h3", "text": interact.getMessage("Options_settings_title_global_settings")}],
                test_area = document.getElementById('testarea');
            if (settings.order.length !== 0) {

                test_area.placeholder = interact.getMessage("Options_settings_test_keyboard");

                tmp = SettingsElements.buildGlobalDuoKeyboardSettings(select, setInitialGlobalSettings, storeGlobalSettings);
                select = tmp.select;
                page = page.concat(tmp.html);

                page.push({"tag_name": "h3", "text": interact.getMessage("Options_settings_title_lang_settings")});

                tmp = SettingsElements.buildSettings(select, setInitialLanguageSettings, storeLanguageSettings);

                select = tmp.select;
                page = page.concat(tmp.html);

                save_message.innerText =  interact.getMessage("Options_settings_save_message");
                save_button = document.getElementById('duolingo-save-button');
                save_button.addEventListener('click', function () {
                    if (!hasClassName(save_button, 'btn-disabled')) {
                        css(save_message, 'opacity', 1);
                        addClassName(save_button, 'btn-disabled');
                        Data.save();
                    }
                });
            } else {
                page = buildStarterInfo(select);
            }

            return page;
        }
    };
    return self;

}());