var DuoKeyboard = function () {
    'use strict';
    var self = {},
        i,
        enable_vietnamese = false,
        keyboard = null,
        evt = document.createEvent("HTMLEvents"),
        keys = ['Backspace', 'Space', 'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash'],
        state = {
            'active' : false,
            'keydown' : '',
            'keylastUpDead' : false,
            'insertChar' : '',
            'firstpress' : false,
            'deadkeyMode': false,
            'level' : 1,
            'AltRight': false,
            'Shift' : false,
            'ControlRight' : false,
            'handleDeadKey': false,
            'deadkeyRegister' : {}
        },
        DKInputMethodExtension = null,
        deadkeys = null,
        modifierChanged = function () {
            state.level = 1;
            state.level += (state.Shift ? 1 : 0);
            state.level += (state.AltRight ? 2 : 0);
        },
        useDuoKeyboard = function (e) {
            return (keys.indexOf(e.code) > -1 && (state.active || (null !== DKInputMethodExtension && DKInputMethodExtension.isOn())));
        },
        winCompatbilityAltGr = function (e) {
            return (/win/i).test(navigator.platform) && e.altKey && state.AltRight;
        },
        updateInputField = function (processed_data, input) {
            input.value = processed_data.text;
            input.setSelectionRange(processed_data.selectionStart, processed_data.selectionEnd);
        },
        removeCharacter = function (input) {
            if (DKInputMethodExtension === null
                    || !DKInputMethodExtension.isOn()
                    || !DKInputMethodExtension.handleBackspace()
                    ) {
                return true;
            }
            var selectionStart = input.selectionStart,
                selectionEnd = input.selectionEnd,
                str = input.value,
                str_before = str.substring(0, selectionStart),
                str_after = str.substring(selectionEnd, str.length),
                selected =  str.substring(selectionStart, selectionEnd),
                processed_data = DKInputMethodExtension.removeCharacter(str_before, selectionStart, selectionEnd, selected);

            if (!processed_data.useDefault) {
                processed_data.text = processed_data.text + str_after;
                updateInputField(processed_data, input);
            }

            return processed_data.useDefault;
        },
        insertChar = function (insert_char, input, combine, e) {
            if (-1 === insert_char) { return null; }

            var selectionStart = input.selectionStart,
                selectionEnd = input.selectionEnd,
                str_before = '',
                str_after = '',
                str = input.value,
                selected =  str.substring(selectionStart, selectionEnd),
                processed_data;
            if (combine && selectionStart > 0) {
                insert_char = String.fromCharCode(input.value.charCodeAt(selectionStart - 1), insert_char).normalize();
                str_before = str.substring(0, selectionStart - 1);
            } else {
                insert_char = String.fromCharCode(insert_char);
                str_before = str.substring(0, selectionStart);
            }
            str_after = str.substring(selectionEnd, str.length);
            processed_data = (null === DKInputMethodExtension)
                ? {"text": (str_before + insert_char), "selectionStart": (str_before + insert_char).length, "selectionEnd": str_before.length}
                : DKInputMethodExtension.processCharacter(str_before, insert_char, selectionStart, selectionEnd, selected);

            if (e && 'Space' === e.code && e.key === " " && processed_data.text.slice(-1) === " ") {
                processed_data.text = processed_data.text.slice(0, -1);
                processed_data.selectionEnd = processed_data.selectionEnd - 1;
                processed_data.selectionStart = processed_data.selectionEnd;
            }

            processed_data.text = processed_data.text + str_after;
            updateInputField(processed_data, input);
        },
        keypress = function (e) {
            var char_code,
                target = e.explicitOriginalTarget || e.srcElement;
            if ('Space' === e.code) {
                char_code = 32;

                if (null !== deadkeys && deadkeys.getDeadKeyMode()) {
                    char_code = deadkeys.addDeadKey(char_code);
                }

                insertChar(char_code, target, false, e);

                state.keylastUpDead = false;
            } else {
                state.keydown = e.code;
                if (state.active && null !== keyboard
                        && 'undefined' !== typeof keyboard[state.keydown]
                        && 'undefined' !== typeof keyboard[state.keydown][state.level - 1]) {
                    char_code = keyboard[state.keydown][state.level - 1].code;

                    if (null !== deadkeys && keyboard[state.keydown][state.level - 1].isdead) {
                        char_code = deadkeys.addDeadKey(char_code);
                        insertChar(char_code, target, false);
                    } else if (char_code >= 768 && char_code <= 879) {
                        insertChar(char_code, target, true);
                    } else {
                        if (null !== deadkeys && deadkeys.getDeadKeyMode()) {
                            char_code = deadkeys.addDeadKey(char_code);
                        }
                        insertChar(char_code, target, false);
                    }

                    state.keylastUpDead = false;
                } else {
                    if (null === keyboard && useDuoKeyboard(e) && 'Dead' !== e.key && !state.keylastUpDead) {
                        insertChar(e.key.charCodeAt(0), target, false);
                    }
                }
            }
        };
    evt.initEvent("blur", false, true);
    self = {
        "setKeyboard" : function (kb) {
            keyboard = kb;
        },
        "setVietnamese" : function (mode) {
            if (enable_vietnamese) {
                return DKInputMethodExtension.setExtensionByMode(mode);
            }
            return false;
        },
        "addToElement" : function (el) {
            el.addEventListener("keydown", self.keydown);
            el.addEventListener("keypress", self.keypress);
            el.addEventListener("keyup", self.keyup);
        },
        "on" : function () {
            state.active = true;
            return;
        },
        "off" : function () {
            state.active = false;
            return;
        },
        "toggle" : function () {
            self[(state.active) ? 'off' : 'on']();
            return;
        },
        "keydown" : function (e) {
            if (this !== document
                    && e.code === 'Backspace'
                    && !e.ctrlKey
                    && useDuoKeyboard(e)
                    ) {
                if (!removeCharacter(e.explicitOriginalTarget || e.srcElement)) {
                    e.preventDefault();
                }
            }
            switch (e.code) {
            case 'ShiftLeft':
            case 'ShiftRight':
                state.Shift = true;
                modifierChanged();
                break;
            case 'AltRight':
                state.AltRight = true;
                modifierChanged();
                break;
            case 'ControlRight':
                // not implemented yet a.o. french canadian
                state.ControlRight = true;
                modifierChanged();
                break;
            }

            if (this === document || (e.ctrlKey && !winCompatbilityAltGr(e))) {return; }
            if (useDuoKeyboard(e) && e.code !== 'Backspace') {
                keypress(e);
                // deadkey is alive
                if ('undefined' !== typeof state.deadkeyRegister[e.code]
                        && 'undefined' !== typeof state.deadkeyRegister[e.code][state.level]) {
                    state.deadkeyRegister[e.code][state.level] = true;
                }
            }
        },
        "keyup" : function (e) {
            switch (e.code) {
            case 'ShiftLeft':
            case 'ShiftRight':
                state.Shift = false;
                modifierChanged();
                break;
            case 'AltRight':
                state.AltRight = false;
                modifierChanged();
                break;
            case 'ControlRight':
                // not implremented yet for french canadian
                state.ControlRight = false;
                modifierChanged();
                break;
            }
            if (this === document || (e.ctrlKey && !winCompatbilityAltGr(e))) {return; }
            // Handle dead key press; only detected on key up :(
            if (useDuoKeyboard(e)) {

                if ('Dead' === e.key && keys.indexOf(e.code) > -1) {
                    if ('undefined' === typeof state.deadkeyRegister[e.code]) {
                        state.deadkeyRegister[e.code] = [];
                    }
                    if ('undefined' === typeof state.deadkeyRegister[e.code][state.level]) {
                        state.deadkeyRegister[e.code][state.level] = false;
                    }
                    //press if dead key was not detected in down event
                    if (!state.deadkeyRegister[e.code][state.level]) {
                        keypress(e);
                    } else {
                        //deadkey is dead;
                        state.deadkeyRegister[e.code][state.level] = false;
                    }
                }
                if (state.keylastUpDead && 'Dead' !== e.key) {
                    keypress(e);
                }
                state.keylastUpDead = ('Dead' === e.key);
            }

        },
        "keypress" : function (e) {
            if (this === document) {return; }
            if (useDuoKeyboard(e) //DK enabled
                    && !(e.ctrlKey && !winCompatbilityAltGr(e))
                    && e.code !== 'Backspace' //Backspace handling is done above
                    && !(e.code === 'Space' && e.key === " ") // space is handled elsewhere
                    && !(null === keyboard //a keyboard is loaded
                    && ('Dead' === e.key || state.keylastUpDead)) // deadKeys

                    ) {
                e.preventDefault();
                //fix for new duolingo check button
                this.dispatchEvent(evt);
            }

        }
    };

    if ('undefined' !== typeof DuoKeyboardDeadKeys) {
        deadkeys = DuoKeyboardDeadKeys;
    }
    if ('undefined' !== typeof DuoKeyboardInputMethodExtension) {
        enable_vietnamese = true;
        DKInputMethodExtension = new DuoKeyboardInputMethodExtension();
        for (i in Data.get('ime').data) {
            DKInputMethodExtension.loadExtension(i, Data.get('ime').data[i]);
        }
    }
    // make sure modefiers are captured
    self.addToElement(document);
    return self;
};