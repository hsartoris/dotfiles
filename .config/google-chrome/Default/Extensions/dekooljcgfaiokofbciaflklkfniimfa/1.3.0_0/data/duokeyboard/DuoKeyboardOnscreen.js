var DuoKeyboardOnscreen  = function () {
    'use strict';
    var self = {},
        keyboard_properties = {
            'Backquote': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Digit1': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Digit2': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Digit3': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Digit4': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Digit5': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Digit6': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Digit7': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Digit8': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Digit9': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Digit0': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Minus': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Equal': {'type': 'regular', 'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'BackslashAlt1': {'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Backspace': {'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Tab': {'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyQ': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyW': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyE': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyR': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyT': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyY': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyU': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyI': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyO': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyP': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'BracketLeft': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'BracketRight': {'type': 'regular', 'row': 1, 'element': null, 'element_original': null, 'element_replacement': null},
            'Backslash': {'row': 1, 'element': null, 'element_original': null, 'element_replacement': null, "alternative": ["BackslashAlt1", "BackslashAlt2"]},
            'EnterAlt1': {'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'EnterAlt2': {'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'CapsLock': {'row': 2, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyA': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyS': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyD': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyF': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null, 'element_bumper' : null},
            'KeyG': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyH': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyJ': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null, 'element_bumper' : null},
            'KeyK': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyL': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null},
            'Semicolon': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null},
            'Quote': {'type': 'regular', 'row': 2, 'element': null, 'element_original': null, 'element_replacement': null},
            'BackslashAlt2': {'row': 0, 'element': null, 'element_original': null, 'element_replacement': null},
            'Enter': {'row': 2, 'element': null, 'element_original': null, 'element_replacement': null, "alternative": ["EnterAlt1", "EnterAlt2"]},
            'ShiftLeft': {'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'IntlBackslash': {'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyZ': {'type': 'regular', 'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyX': {'type': 'regular', 'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyC': {'type': 'regular', 'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyV': {'type': 'regular', 'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyB': {'type': 'regular', 'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyN': {'type': 'regular', 'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'KeyM': {'type': 'regular', 'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'Comma': {'type': 'regular', 'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'Period': {'type': 'regular', 'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'Slash': {'type': 'regular', 'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'ShiftRight': {'row': 3, 'element': null, 'element_original': null, 'element_replacement': null},
            'ControlLeft': {'row': 4, 'element': null, 'element_original': null, 'element_replacement': null},
            'AltLeft': {'row': 4, 'element': null, 'element_original': null, 'element_replacement': null},
            'Space': {'row': 4, 'element': null, 'element_original': null, 'element_replacement': null},
            'AltRight': {'row': 4, 'element': null, 'element_original': null, 'element_replacement': null},
            'ControlRight': {'row': 4, 'element': null, 'element_original': null, 'element_replacement': null}
        },
        duokeyboard_container = document.createElement('div'),
        kb = document.createElement('div'),
        kb_holder = DynamicHTML.buildHTML({"tag_name": 'div', "attr": {"id" : 'duokeyboard-holder', "class": 'duokeyboard-holder-hidden'}}),
        pref =  DynamicHTML.buildHTML({"tag_name": 'div', "attr": {"id" : 'duokeyboard-keyboard-preferences-container'}}),
        manual_pref,
        regular_pref,
        select = {
            "language" : {},
            "language_container" : {},
            "keyboard" : {},
            "cheatsheet_visability" : {},
            "IME" : {},
            "man_keyboard" : {},
            "man_cheatsheet_visability" : {},
            "man_IME" : {},
            "quick_select" : {}
        },
        currentKeyboardLayout = {},
        nativeKeyboardLayout = {},
        altgr = false,
        isVisible = false,
        isOn = false,
        shifted = false,
        show_pref = false,
        current_level = 0,
        show_keystrokes = true,
        addNativeKeys = function () {
            var i, n, el, character = "", Character = "", j, m, keys = [];
            for (i in nativeKeyboardLayout) {
                n = nativeKeyboardLayout[i];
                keys = [i];
                if (keyboard_properties[i].alternative) {
                    keys = keys.concat(keyboard_properties[i].alternative);
                }

                for (j = 0, m = keys.length; j < m; ++j) {
                    el = keyboard_properties[keys[j]].element_original;
                    if (n[0] && n[0].code) {
                        character = String.fromCharCode(n[0].code);
                        Character = character.toUpperCase();
                        el.innerText = Character.toLowerCase() === character ? Character : character;
                    } else {
                        el.innerText = ' ';
                    }
                }
            }
        },
        updateKeys = function () {
            var i, n, el, j, m, keys = [];
            for (i in currentKeyboardLayout) {
                n = currentKeyboardLayout[i];
                keys = [i];
                if (keyboard_properties[i].alternative) {
                    keys = keys.concat(keyboard_properties[i].alternative);
                }

                for (j = 0, m = keys.length; j < m; ++j) {
                    el = keyboard_properties[keys[j]].element_replacement;
                    removeClassName(el, 'duokeyboard-deadkey');
                    if (n[current_level] && n[current_level].code) {
                        el.innerText = String.fromCharCode(n[current_level].code);
                        if (n[current_level].isdead) {
                            addClassName(el, 'duokeyboard-deadkey');
                        }
                    } else {
                        el.innerText = ' ';
                    }
                }
            }
        },
        setupKeyboard = function () {
            var global_settings = Data.get("global").data;
            show_keystrokes = (global_settings.cheatsheet_key_strokes === 'ON');
            removeClassName(kb, 'duokeyboard-key-layout-101');
            removeClassName(kb, 'duokeyboard-key-layout-101A');
            removeClassName(kb, 'duokeyboard-key-layout-102');
            removeClassName(kb, 'duokeyboard-key-layout-102A');

            addClassName(kb, ('duokeyboard-key-layout-' + global_settings.cheatsheet_key_layout));

            if (global_settings.cheatsheet_native === 'OFF') {
                removeClassName(kb, 'duokeyboard-large');
            } else {
                addNativeKeys();
                addClassName(kb, 'duokeyboard-large');
            }

            addClassName(keyboard_properties.KeyF.element_bumper, 'duokeyboard-key-bumper-hidden');
            addClassName(keyboard_properties.KeyJ.element_bumper, 'duokeyboard-key-bumper-hidden');

            removeClassName(keyboard_properties.KeyF.element, 'duokeyboard-bumper-key');
            removeClassName(keyboard_properties.KeyJ.element, 'duokeyboard-bumper-key');

            switch (global_settings.cheatsheet_fj_guide) {
            case 'Bumps':
                removeClassName(keyboard_properties.KeyF.element_bumper, 'duokeyboard-key-bumper-hidden');
                removeClassName(keyboard_properties.KeyJ.element_bumper, 'duokeyboard-key-bumper-hidden');
                break;
            case 'Background':
                addClassName(keyboard_properties.KeyF.element, 'duokeyboard-bumper-key');
                addClassName(keyboard_properties.KeyJ.element, 'duokeyboard-bumper-key');
                break;
            }
            updateKeys();
        },
        modifierChanged = function () {
            current_level = 0;
            current_level += (shifted ? 1 : 0);
            current_level += (altgr ? 2 : 0);
            updateKeys();
        },
        keydown = function (e) {
            var j, m, keys;
            switch (e.code) {
            case 'ShiftLeft':
            case 'ShiftRight':
                shifted = true;
                modifierChanged();
                break;
            case 'AltRight':
                altgr = true;
                modifierChanged();
                break;
            }
            if (show_keystrokes && keyboard_properties[e.code] && null !== keyboard_properties[e.code].element) {
                keys = [e.code];
                if (keyboard_properties[e.code].alternative) {
                    keys = keys.concat(keyboard_properties[e.code].alternative);
                }

                for (j = 0, m = keys.length; j < m; ++j) {
                    addClassName(keyboard_properties[keys[j]].element, 'duokeyboard-key-pressed');
                }
            }
        },
        keyup = function (e) {
            var j, m, keys;
            switch (e.code) {
            case 'ShiftLeft':
            case 'ShiftRight':
                shifted = false;
                modifierChanged();
                break;
            case 'AltRight':
                altgr = false;
                modifierChanged();
                break;
            }
            if (keyboard_properties[e.code] && null !== keyboard_properties[e.code].element) {
                keys = [e.code];
                if (keyboard_properties[e.code].alternative) {
                    keys = keys.concat(keyboard_properties[e.code].alternative);
                }

                for (j = 0, m = keys.length; j < m; ++j) {
                    removeClassName(keyboard_properties[keys[j]].element, 'duokeyboard-key-pressed');
                }
            }
        },
        setCheatSheetVisability = function () {
            select.cheatsheet_visability.disabled = (select.keyboard.value === "OFF" ? "disabled" : null);
            select.man_cheatsheet_visability.disabled = (select.man_keyboard.value === "OFF" ? "disabled" : null);
        },
        resetPreferences = function (settings) {
            select.language.innerText = "";
            DynamicHTML.setSelected(select.quick_select);
            DynamicHTML.setSelected(select.keyboard, settings.keyboard);
            DynamicHTML.setSelected(select.cheatsheet_visability, settings.onscreen_keyboard);
            DynamicHTML.setSelected(select.IME, settings.vietnamese);

            DynamicHTML.setSelected(select.man_keyboard);
            DynamicHTML.setSelected(select.man_cheatsheet_visability);
            DynamicHTML.setSelected(select.man_IME);

            if (!settings || 'undefined' === typeof settings.keyboard || settings.keyboard === 'OFF') {
                self.hide();
            }

            setCheatSheetVisability();
        },
        previewPreferences = function (manual) {
            if (manual) {
                DuoKeyboardController.addDuoKeyboard({
                    "keyboard" : select.man_keyboard.value,
                    "onscreen_keyboard" : select.man_cheatsheet_visability.value,
                    "vietnamese" : select.man_IME.value
                });

            } else {
                var s = Data.get("duolingo");
                if (!s[select.language.innerText]) {
                    Data.store("new_language", {"language" : select.language.innerText});
                }
                Data.store("language_setting", {
                    "language" : select.language.innerText,
                    "keyboard" : select.keyboard.value,
                    "cheatsheet_visability" : select.cheatsheet_visability.value,
                    "IME" : select.IME.value
                });
                if (Data.isValidateData("language", select.language.innerText)) {
                    DuoKeyboardController.addDuoKeyboard();
                }
            }
            setCheatSheetVisability();
        },
        storePreferences = function () {
            previewPreferences();
        },
        savePreferences = function () {
            storePreferences();
            self.hidePreferences();
            Data.save();
        },
        manualPreferences = function () {
            DynamicHTML.setSelected(select.quick_select);
            previewPreferences(true);
        },
        presetPreferences = function () {
            var settings = Data.get("duolingo").data;

            if (settings[select.quick_select.value]) {
                settings = settings[select.quick_select.value];
                DynamicHTML.setSelected(select.man_keyboard, settings.keyboard);
                DynamicHTML.setSelected(select.man_cheatsheet_visability, settings.onscreen_keyboard);
                DynamicHTML.setSelected(select.man_IME, settings.vietnamese);
            }
            previewPreferences(true);
        },
        createKeyboard = function () {
            var i,
                m,
                j = 0,
                inner_html = null,
                kbs = DynamicHTML.buildHTML({
                    "tag_name": "div",
                    "attr": {"id": 'duokeyboard-container'}
                }),
                div = DynamicHTML.buildHTML({"tag_name": "div", "attr": {"class": "duokeyboard-row"}});


            for (i  in keyboard_properties ) {
                m = keyboard_properties[i];
                if (m.row > j) {
                    kbs.appendChild(div);
                    div = DynamicHTML.buildHTML({"tag_name": "div", "attr": {"class": "duokeyboard-row"}});
                    j++;
                }
                keyboard_properties[i].element_replacement = DynamicHTML.buildHTML({
                    "tag_name": "span",
                    "attr": {"class" : "duokeyboard-key-replacement"}
                });
                keyboard_properties[i].element_original = DynamicHTML.buildHTML({
                    "tag_name": "span",
                    "attr": {"class" : "duokeyboard-key-original"}
                });
                inner_html = [
                    keyboard_properties[i].element_original,
                    keyboard_properties[i].element_replacement
                ];
                if (i === "KeyF" || i === "KeyJ") {
                    keyboard_properties[i].element_bumper = DynamicHTML.buildHTML({"tag_name": "span", attr: {"class": "duokeyboard-key-bumper"}});
                    inner_html.push(keyboard_properties[i].element_bumper);
                }

                keyboard_properties[i].element = DynamicHTML.buildHTML({
                    "tag_name": "span",
                    "attr": {"class" : ("duokeyboard-key duokeyboard-key-regular" + (m.type === 'regular' ? '' : " duokeyboard-key duokeyboard-key-" + i))},
                    "innerhtml" : inner_html
                });

                div.appendChild(keyboard_properties[i].element);
            }
            kbs.appendChild(div);
            return kbs;
        },
        init = function () {
            var tmp;

            kb = createKeyboard();
            kb_holder.appendChild(kb);

            tmp = SettingsElements.undetectableField(select, presetPreferences);
            select = tmp.select;
            manual_pref = DynamicHTML.buildHTML(tmp.html, {"tag_name": "div", "attr": {"id": "duokeyboard-keyboard-manual"}});

            tmp = SettingsElements.buildSettings(select, function () {}, manualPreferences, 1);
            select.man_keyboard = tmp.select.keyboard;
            select.man_cheatsheet_visability = tmp.select.cheatsheet_visability;
            select.man_IME = tmp.select.IME;
            manual_pref.appendChild(DynamicHTML.buildHTML(tmp.html));
            pref.appendChild(manual_pref);

            tmp = SettingsElements.buildSettings(select, function () {}, storePreferences, 2);
            select = tmp.select;
            tmp.html.push({"tag_name": "button", "events": {"click": savePreferences}, "text": interact.getMessage('Save_duokeyboard_pref'), "attr": {"class": "duokeyboard-button duokeyboard-button-green"}});
            regular_pref = DynamicHTML.buildHTML({"tag_name": "div", "attr": {"id": "duokeyboard-keyboard-preferences"}});
            pref.appendChild(DynamicHTML.buildHTML(tmp.html, regular_pref));

            duokeyboard_container.appendChild(pref);
            duokeyboard_container.appendChild(kb_holder);

        };
    self = {
        "showManualPrefOption": function (el) {
            self.initiatePreferences("", true);
            el.parentNode.appendChild(DynamicHTML.buildHTML(
                {
                    "tag_name": "div",
                    "attr" : {"class": "manual-pref-option-container"},
                    innerhtml : {
                        "tag_name": "img",
                        "events": {"click": self.togglePreferences},
                        "attr" : {
                            "class": "manual-pref-option",
                            "alt": "Toggle manual preferences",
                            "src" : interact.getURL('data/img/icon-16.png')
                        }
                    }
                }
            ));
        },
        "initiatePreferences" : function (keyboard_identifier, noshow) {
            resetPreferences(Data.get('duolingo').data[keyboard_identifier] || {});
            select.language.innerText = keyboard_identifier;


            var sel,
                tmp,
                f,
                isRegular = hasClassName(pref, 'duokeyboard-pref-regular'),
                isManual = hasClassName(pref, 'duokeyboard-pref-manual');

            removeClassName(pref, 'duokeyboard-pref-regular');
            removeClassName(pref, 'duokeyboard-pref-manual');

            if (keyboard_identifier && "" !== keyboard_identifier) {
                addClassName(pref, 'duokeyboard-pref-regular');
                if (isManual) {
                    self.hidePreferences();
                }
                f = function () {
                    removeClassName(regular_pref, 'duokeyboard-hide');
                    addClassName(manual_pref, 'duokeyboard-hide');
                    if (!noshow) {
                        self.showPreferences();
                    }
                };
                if (isManual) {
                    setTimeout(f, 500);
                } else {
                    f();
                }
            } else {
                addClassName(pref, 'duokeyboard-pref-manual');
                if (isRegular) {
                    self.hidePreferences();
                }
                sel = select.quick_select;
                tmp = SettingsElements.undetectableField(select, presetPreferences);

                sel.replaceWith(tmp.select.quick_select);

                f = function () {
                    addClassName(regular_pref, 'duokeyboard-hide');
                    removeClassName(manual_pref, 'duokeyboard-hide');
                    if (!noshow) {
                        self.showPreferences();
                    }
                };
                if (isRegular) {
                    setTimeout(f, 500);
                } else {
                    f();
                }
            }
        },
        "togglePreferences" : function () {
            if (show_pref) {
                self.hidePreferences();
            } else {
                self.showPreferences();
            }
        },
        "showPreferences" : function () {
            if (show_pref && isOn) {return; }
            show_pref = true;
            removeClassName(pref, 'duokeyboard-holder-hidden');
        },
        "hidePreferences" : function () {
            if (!show_pref && isOn) {return; }
            show_pref = false;
            addClassName(pref, 'duokeyboard-holder-hidden');
        },
        "show" : function () {
            if (isVisible && isOn) {return; }
            removeClassName(kb_holder, 'duokeyboard-holder-hidden');
            isVisible = true;
        },
        "hide" : function () {
            if (!isVisible && isOn) {return; }
            addClassName(kb_holder, 'duokeyboard-holder-hidden');
            isVisible = false;
        },
        "on" : function (el) {
            if (!document.body.contains(duokeyboard_container)) {
                el.insertBefore(duokeyboard_container, el.childNodes[0]);
            }
            if (isOn) {return; }
            document.addEventListener("keydown", keydown);
            document.addEventListener("keyup", keyup);
            isOn = true;
        },
        "setKeyboard" : function (keyboard, nativekeyboard) {
            currentKeyboardLayout = keyboard;
            nativeKeyboardLayout = nativekeyboard || {};
            setupKeyboard();
        }
    };
    init();
    return self;
};