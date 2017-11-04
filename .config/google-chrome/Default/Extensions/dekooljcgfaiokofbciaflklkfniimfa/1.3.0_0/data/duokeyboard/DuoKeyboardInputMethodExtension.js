var DuoKeyboardInputMethodExtension = function () {
    'use strict';
    var self = {},
        current_extension = 'none',
        ex = {},
        isOn = false,
        handleBackspace = false,
        mode2extension = {},
        extensions = this.extensions;
    self = {
        loadExtension : function (name, c) {
            var i;
            for (i in c.modes) {
                mode2extension[c.modes[i].name] = name;
            }
        },
        setExtension: function (name) {
            var succes = false;
            ex = {};
            isOn = false;
            current_extension = 'none';
            if (extensions[name]) {
                current_extension = name;
                ex = extensions[name];
                isOn = true;
                succes = true;
                handleBackspace = 'undefined' !== typeof ex.removeCharacter;
            }
            return succes;
        },
        setExtensionByMode: function (mode) {
            var extension_name = (mode === 'OFF' || !mode2extension[mode]) ? 'none' :  mode2extension[mode];
            self.setExtension(extension_name);
            return ex.setMode ? ex.setMode(mode) : extension_name === 'none';
        },
        processCharacter : function (str_before, newchar, select_start, select_end, selected) {
            return ex.processCharacter
                    ? ex.processCharacter(str_before, newchar, select_start, select_end, selected)
                    : {"text": (str_before + newchar), "selectionStart": (str_before + newchar).length, "selectionEnd": (str_before + newchar).length};
        },
        removeCharacter : function (str_before, select_start, select_end, selected) {
            return ex.removeCharacter ? ex.removeCharacter(str_before, select_start, select_end, selected) : {"text": (str_before + selected), "selectionStart": (str_before + selected).length, "selectionEnd": (str_before + selected).length, "useDefault": true};
        },
        selectChange : function (select_start, select_end) {
            return ex.selectChange ? ex.selectChange(select_start, select_end) : false;
        },
        getExtensionName : function () {
            return current_extension;
        },
        isOn : function () {
            return isOn;
        },
        handleBackspace: function () {
            return handleBackspace;
        }
    };
    return self;
};
DuoKeyboardInputMethodExtension.prototype.extensions = {};
DuoKeyboardInputMethodExtension.prototype.extensions.none = {};
