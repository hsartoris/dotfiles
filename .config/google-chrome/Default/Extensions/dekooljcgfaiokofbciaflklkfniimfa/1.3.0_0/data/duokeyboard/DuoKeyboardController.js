var DuoKeyboardController = (function () {
    'use strict';
    var self = {},
        ini = false,
        app = null,
        elements_with_dk = [],
        DK = null,
        DKO = null,
        inLesson = false,
        bodyConfig = { childList: true},
        newbodyConfig = { childList: true, subtree: true },
        newInputQuery = '[data-test^="challenge"][data-test$="input"]',
        appConfig = { attributes: true, attributeFilter: ['class'], childList: true  },
        containerConfig = {subtree: true, childList: true },
        hideDuokeyboard = function () {
            DKO.hide();
            DKO.hidePreferences();
        },
        addKeyboard = function (el, keyboard_reference_id, pre_settings) {
            var curSet = Data.get('duolingo').data[keyboard_reference_id] || pre_settings,
                ime = Data.get('extendedKeyboards').data[curSet.keyboard] ? Data.get('extendedKeyboards').data[curSet.keyboard].mode : curSet.vietnamese;
            if (!curSet) {return; }
            DK.off();

            if (curSet.keyboard === 'OFF') {
                DK.setKeyboard(null);
                DKO.hide();
                if (ime === 'OFF') {
                    return;
                }
            }

            DK.addToElement(el);
            DK.setVietnamese(ime);
            DK.on();

            if (curSet.keyboard !== 'OFF') {
                Promise.all([interact.getKeyboardLayout(curSet.keyboard),
                    interact.getKeyboardLayout(Data.get('global').data.cheatsheet_native)])
                    .then(function (keyboards) {
                        DK.setKeyboard(keyboards[0]);
                        DKO.setKeyboard(keyboards[0], keyboards[1]);

                        if (curSet.onscreen_keyboard === 'Off') {
                            DKO.hide();
                        } else {
                            setTimeout(function () {DKO.show(); }, 100);
                        }
                    }).catch(function () {
                        DKO.hide();
                        DK.off();
                    });
            }
        },
        runDuoKeyboard = function (el, info, previewOptions) {
            var controls = document.getElementById('controls');
            if (controls) {
                DKO.on(controls);
            } else {
                controls = document.querySelector('[data-test="challenge-header"]').parentNode.parentNode.parentNode.childNodes[1];
                if (controls) {
                    DKO.on(controls);
                } else {
                    //oh no I am broken again :'(
                    return;
                }
            }

            if (Data.get('duolingo').data[info] || previewOptions) {
                addKeyboard(el, info, previewOptions);
                if (Data.languageIsUnsaved(info)) {
                    DKO.initiatePreferences(info);
                } else if (info !== "") {
                    DKO.hidePreferences();
                }
            } else {
                if (info === "") {
                    DKO.showManualPrefOption(el);
                } else {
                    DKO.initiatePreferences(info);
                }
            }
        },
        //punch_through required for dirtyfix, new dl subtree monitoring body causes infinite loop
        testDuoKeyboard = function (A, punch_through, settings) {
            var root = A || document,
                el = root.querySelector('#text-input') || root.querySelector('#word-input') || document.querySelector(newInputQuery),
                info = null;
            if (el) {
                info = el.getAttribute('Placeholder') || "";

                if (!punch_through && (-1 !== elements_with_dk.indexOf(el))) { return; }
                elements_with_dk.push(el);
                runDuoKeyboard(el, info, settings);
            }
        },
        containerObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length  > 0 && mutation.addedNodes[0].id === 'session-element-container') {
                    testDuoKeyboard(mutation.addedNodes[0]);
                }
            });
        }),
        setLessonState = function (state, bypass) {
            if (inLesson === state && !bypass) { return; }
            inLesson = state;
            if (state) {
                var el  = document.querySelector('.player-main');
                if (el) {
                    containerObserver.observe(el, containerConfig);
                }
                testDuoKeyboard();
            } else {
                elements_with_dk = [];
                hideDuokeyboard();
                containerObserver.disconnect();
            }
        },
        appObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var i, n;
                switch (mutation.type) {
                case 'attributes':
                    setLessonState(mutation.target.getAttribute('class').indexOf('player') !== -1);
                    break;
                case 'childList':
                    if (mutation.removedNodes.length  > 0) {
                        for (i = 0, n = mutation.removedNodes.length; i < n; ++i) if (mutation.removedNodes[i].querySelector && mutation.removedNodes[i].querySelector('.player-main')) {
                            setLessonState(false);
                        }
                    }
                    if (mutation.addedNodes.length  > 0) {
                        for (i = 0, n = mutation.addedNodes.length; i < n; ++i) if (mutation.addedNodes[i].querySelector && mutation.addedNodes[i].querySelector('.player-main')) {
                            setLessonState(true);
                        }
                    }
                    break;
                }
            });
        }),
        bodyObserver = new MutationObserver(function (mutations) {
            var i, n, new_in_lesson;
            mutations.forEach(function (mutation) {
                new_in_lesson = document.querySelectorAll(newInputQuery);
                if (new_in_lesson.length === 0) {
                    setLessonState(false,true);
                } else {
                    setLessonState(true,true);
                }
                if (mutation.removedNodes.length  > 0) {
                    for (i = 0, n = mutation.removedNodes.length; i < n; ++i) {
                        if (mutation.removedNodes[i].id === 'app') {
                            appObserver.disconnect();
                            setLessonState(false);
                        }
                   }
                }
                if (mutation.addedNodes.length  > 0) {
                    for (i = 0, n = mutation.addedNodes.length; i < n; ++i) if (mutation.addedNodes[i].id === 'app') {
                       appObserver.observe(mutation.addedNodes[0], appConfig);
                       if (mutation.addedNodes[0].getAttribute('class') && mutation.addedNodes[0].getAttribute('class').indexOf('player') !== -1) {
                          setLessonState(true);
                       }
                    }
                }
            });
        });

    self = {
        "init" : function () {
            if (ini) { return; }
            DK = new DuoKeyboard();
            DKO = new DuoKeyboardOnscreen();
            app = document.getElementById('app');
            bodyObserver.observe(document.body, bodyConfig);
            if (app) {
                appObserver.observe(app, appConfig);
                if (app.getAttribute('class') && app.getAttribute('class').indexOf('lesson') !== -1) {
                    bodyObserver.observe(document.body, bodyConfig);
                    setLessonState(true);
                }
            } else {
                bodyObserver.observe(document.body, newbodyConfig);
            }
            ini = true;
        },
        "addDuoKeyboard" : function (settings) {
            //punchthrough required for dirtyfix, new dl subtree monitoring body causes infinite loop
            testDuoKeyboard(null, true, settings);
        },
        "optionsPreview" : function (keyboard_reference_id) {
            if(typeof keyboard_reference_id  === 'string') {
                runDuoKeyboard(document.getElementById('testarea'), keyboard_reference_id);
            } else {
                runDuoKeyboard(document.getElementById('testarea'), "", keyboard_reference_id);
            }
        }
    };
    return self;
}());

var init = function () {
    'use strict';
    DuoKeyboardController.init();
    if(PageLoader) {
        PageLoader.init();
    }
};