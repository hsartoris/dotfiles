//ensure firefox and webkit interoperatability
var WebExtension = chrome || browser,
    interact = (function () {
        'use strict';
        var self,
            keyboards = {};
        self = {
            "getMessage": function (messageName, substitutions) {
                var message = WebExtension.i18n.getMessage(messageName.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, ''), substitutions);
                return message === '' ? messageName : message;
            },
            "storeOptions" : function (s) {
                WebExtension.storage.sync.set({'options': s.duolingo, 'global': s.global, 'version': s.version});
            },
            "getURL" : function (url) {
                return WebExtension.extension.getURL(url);
            },
            "getKeyboardLayout" : function (keyboard_name) {
                return (keyboard_name === 'OFF' ?
                        Promise.resolve({}) :
                        Promise.resolve(keyboards[keyboard_name] ||
                            promiseAJAX(interact.getURL('/data/duokeyboard/keyboard-layouts/' + keyboard_name + '.json'))
                            .then(function (keyboard) {
                                keyboards[keyboard_name] = JSON.parse(keyboard);
                                return keyboards[keyboard_name];
                            }))
                );
            }
        };
        return self;
    }()),
    duoKeyboardsetup = function () {
        'use strict';
        WebExtension.storage.sync.get({
            options: {},
            global: {},
            version: 10000
        }, function (items) {
            var s = {};
            s.duolingo = items.options;
            promiseAJAX(interact.getURL('/data/duokeyboard/duokeyboardSetup.json'))
                .then(function (data) {
                    var i,
                        j,
                        m,
                        setup = JSON.parse(data),
                        ime = setup.inputMethodExtensions,
                        ime_options = [];

                    for (i in ime) {
                        for (j = 0, m = ime[i].modes.length; j < m; ++j) {
                            if (!ime[i].modes[j].hidden) {
                                ime_options.push(ime[i].modes[j].name);
                            }
                        }
                    }
                    ime_options.sort();
                    if (ime_options.length > 0) {
                        s.vietnamese_setting = ['OFF'].concat(ime_options);
                    }
                    if (ime) {
                        s.ime = ime;
                    }
                    s.duokeyboards = setup.keyboards.sort();
                    s.extendedKeyboards = setup.extendedKeyboards;
                    s.global = items.global;
                    s.version = items.version;
                    Data.init(s);
                    init();
                }).catch(function (err) {
                    //not supposed to happen
                });
        });
    };
if (document && document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", duoKeyboardsetup);
} else {
    duoKeyboardsetup();
}