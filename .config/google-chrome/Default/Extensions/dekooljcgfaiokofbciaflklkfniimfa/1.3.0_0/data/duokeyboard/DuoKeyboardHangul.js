DuoKeyboardInputMethodExtension.prototype.extensions.Hangul = (function () {
    'use strict';
    var self = {},
        mode = 'OFF',
        allow_composing_initial = false,
        tableLookup = function (key, table) {
            var code = Number.NaN;
            if (table[key]) {
                code = table[key];
            }
            return code;
        },
        romanization_deadkey = Number.NaN,
        romanization = {
            "latin2CompatabilityJamo" : function (latin, combine_with, level) {
                return 0 === (combine_with || 0) ? tableLookup(latin, romanization.default) :
                        ((romanization.combine[level] && romanization.combine[level][combine_with]) ?
                                tableLookup(latin, romanization.combine[level][combine_with]) :
                                    Number.NaN);
            },
            "default": {
                "g": 12593,
                "G": 12594,
                "n": 12596,
                "d": 12599,
                "D": 12600,
                "r": 12601,
                "l": 12601,
                "m": 12609,
                "b": 12610,
                "B": 12611,
                "s": 12613,
                "S": 12614,
                "'": 12615,
                "j": 12616,
                "J": 12617,
                "c": 12618,
                "k": 12619,
                "t": 12620,
                "p": 12621,
                "h": 12622,
                "a": 12623,
                "e": 12628,
                "o": 12631,
                "u": 12636,
                "i": 12643
            },
            "combine": {
                "0": {
                    "12621": {"p": 12611},
                    "12618": {"h": 12618},
                    "12593": {"g": 12594},
                    "12599": {"d": 12600},
                    "12613": {"s": 12614},
                    "12616": {"j": 12617},
                    "12610": {"b": 12611},
                    "12620": {"t": 12600},
                    "12619": {"k": 12594}
                },
                "1": {
                    "12623": {//a
                        "e": 12624
                    },
                    "12628": {//e
                        "o": 12627,
                        "u": 12641
                    },
                    "12631": {//o
                        "e": 12634
                    },
                    "12636": {//u
                        "i": 12642
                    },
                    "121": {//y
                        "o": 12635,
                        "u": 12640,
                        "a": 12625,
                        "e": 12630
                    },
                    "12625": {//ya
                        "e": 12626
                    },
                    "12630": {//ye
                        "o": 12629
                    },
                    "119": {//w
                        "i": 12639,
                        "o": 12637,
                        "e": 12638,
                        "a": 12632
                    },
                    "12632": {//wa
                        "e": 12633
                    }
                },
                "2": {
                    "12618": {//c
                        "h": 12618
                    },
                    "12593": {//g
                        "s": 12595
                    },
                    "12596": {//n
                        "j": 12597,
                        "h": 12598,
                        "g": 12615
                    },
                    "12610": {//b
                        "s": 12612
                    },
                    "12601": {//l,r
                        "s": 12605,
                        "t": 12606,
                        "h": 12608,
                        "m": 12603,
                        "p": 12607,
                        "b": 12604,
                        "g": 12602
                    },
                    "12613" : {//s
                        "s": 12614
                    },
                    "12619" : {//k
                        "k" : 12594
                    }
                }
            }
        },
        compatibilityJamo2Jamo = {
            "composing": {
                "4527": {
                    "4520": 4528,
                    "4535": 4529,
                    "4536": 4530,
                    "4538": 4531,
                    "4544": 4532,
                    "4545": 4533,
                    "4546": 4534
                },
                "4457": {
                    //"4449": 4458,
                    "4450": 4459,
                    "4469": 4460
                },
                "4467": {
                    "4469": 4468
                },
                "4462": {
                    "4453": 4463,
                    //"4454": 4464,
                    "4469": 4465
                },
                "4536": {
                    "4538": 4537
                },
                "4520": {
                    "4538": 4522
                },
                "4523": {
                    "4541": 4524,
                    "4546": 4525
                }
            },
            "tables": {
                "0": {
                    "12593": 4352,
                    "12594": 4353,
                    "12596": 4354,
                    "12599": 4355,
                    "12600": 4356,
                    "12601": 4357,
                    "12609": 4358,
                    "12610": 4359,
                    "12611": 4360,
                    "12613": 4361,
                    "12614": 4362,
                    "12615": 4363,
                    "12616": 4364,
                    "12617": 4365,
                    "12618": 4366,
                    "12619": 4367,
                    "12620": 4368,
                    "12621": 4369,
                    "12622": 4370
                },
                "2": {
                    "12593": 4520,
                    "12594": 4521,
                    "12595": 4522,
                    "12596": 4523,
                    "12597": 4524,
                    "12598": 4525,
                    "12599": 4526,
                    "12601": 4527,
                    "12602": 4528,
                    "12603": 4529,
                    "12604": 4530,
                    "12605": 4531,
                    "12606": 4532,
                    "12607": 4533,
                    "12608": 4534,
                    "12609": 4535,
                    "12610": 4536,
                    "12612": 4537,
                    "12613": 4538,
                    "12614": 4539,
                    "12615": 4540,
                    "12616": 4541,
                    "12618": 4542,
                    "12619": 4543,
                    "12620": 4544,
                    "12621": 4545,
                    "12622": 4546
                },
                "reverse": {
                    "0": {//only neccesary for first level when removing additional jamo
                        "4352": 12593,
                        "4353": 12594,
                        "4354": 12596,
                        "4355": 12599,
                        "4356": 12600,
                        "4357": 12601,
                        "4358": 12609,
                        "4359": 12610,
                        "4360": 12611,
                        "4361": 12613,
                        "4362": 12614,
                        "4363": 12615,
                        "4364": 12616,
                        "4365": 12617,
                        "4366": 12618,
                        "4367": 12619,
                        "4368": 12620,
                        "4369": 12621,
                        "4370": 12622,
                        "12594": [12593, 12593],
                        "12600": [12599, 12599],
                        "12614": [12613, 12613],
                        "12611": [12610, 12610],
                        "12617": [12616, 12616]
                    },
                    "2" : {
                        "4520": 12593,
                        "4521": 12594,
                        "4522": [4520, 12613],
                        "4523": 12596,
                        "4524": [4523, 12616],
                        "4525": [4523, 12622],
                        "4526": 12599,
                        "4527": 12601,
                        "4528": [4527, 12593],
                        "4529": [4527, 12609],
                        "4530": [4527, 12610],
                        "4531": [4527, 12613],
                        "4532": [4527, 12620],
                        "4533": [4527, 12621],
                        "4534": [4527, 12622],
                        "4535": 12609,
                        "4536": 12610,
                        "4537": [4536, 12613],
                        "4538": 12613,
                        "4539": 12614,
                        "4540": 12615,
                        "4541": 12616,
                        "4542": 12618,
                        "4543": 12619,
                        "4544": 12620,
                        "4545": 12621,
                        "4546": 12622
                    }
                }
            },
            "reverse" : {
                "0" : function (unicode, include_composing) {
                    var reversed = tableLookup(unicode, compatibilityJamo2Jamo.tables.reverse[0]);
                    return include_composing ? reversed :
                            Array.isArray(reversed) ? Number.NaN : reversed;
                },
                "1": function (unicode) {
                    var code = Number.NaN;
                    if (0x1161 <= unicode  && 0x1175 >= unicode) {
                        code = unicode + 8174;
                    }
                    return code;
                },
                "2":  function (unicode) {
                    return tableLookup(unicode, compatibilityJamo2Jamo.tables.reverse[2]);
                },
                "auto" : function (unicode, include_composing) {
                    var reversed = compatibilityJamo2Jamo.reverse[0](unicode, include_composing);

                    if (isNaN(reversed) && !Array.isArray(reversed)) {
                        reversed = compatibilityJamo2Jamo.reverse[1](unicode);
                    }
                    if (isNaN(reversed) && !Array.isArray(reversed)) {
                        reversed = compatibilityJamo2Jamo.reverse[2](unicode);
                    }
                    if (isNaN(reversed) && !Array.isArray(reversed)) {
                        reversed = unicode;
                    }
                    return reversed;
                }
            },
            "0" : function (unicode) {
                return tableLookup(unicode, compatibilityJamo2Jamo.tables[0]);
            },
            "1": function (unicode) {
                var code = Number.NaN;
                if (0x314F <= unicode  && 0x3163 >= unicode) {
                    code = unicode - 8174;
                }
                return code;
            },
            "2":  function (unicode) {
                return tableLookup(unicode, compatibilityJamo2Jamo.tables[2]);
            }
        },
        decomposedCharCodeList = function (char) {
            var unicodes = [],
                index = 0;
            char = char.normalize('NFD');
            while (!isNaN(char.charCodeAt(index))) {
                unicodes.push(char.charCodeAt(index));
                index++;
            }
            return unicodes;
        },
        composedChar = function (unicodes) {
            if (!Array.isArray(unicodes)) { unicodes = [unicodes]; }
            return String.fromCharCode.apply(null, unicodes).normalize();
        },
        preProcessCode = function (unicode) {
            if (Array.isArray(unicode)) {
                if (1 !== unicode.length) {
                    return null;
                }
                unicode = unicode[0];
            }
            return unicode;
        },
        isCompatabilityJamo = function (unicode) {
            unicode = preProcessCode(unicode);
            return unicode !== null ? (0x3131 <= unicode && unicode <= 0x318E) : null; //compatability Jamo;
        },
        isInitialJamo = function (unicode) {
            unicode = preProcessCode(unicode);
            return unicode !== null ? (0x1100 <= unicode && unicode <= 0x1112) || !isNaN(compatibilityJamo2Jamo[0](unicode)) : null; //compatability Jamo;
        },
        isMedialJamo = function (unicode) {
            unicode = preProcessCode(unicode);
            return unicode !== null ? (0x1161 <= unicode && unicode <= 0x1175) || !isNaN(compatibilityJamo2Jamo[1](unicode)) : null; //compatability Jamo;
        },
        isFinalJamo = function (unicode) {
            unicode = preProcessCode(unicode);
            return unicode !== null ? (0x11A8 <= unicode && unicode <= 0x11C2) || !isNaN(compatibilityJamo2Jamo[2](unicode)) : null; //compatability Jamo;
        },
        isJamo = function (unicode) {
            unicode = preProcessCode(unicode);
            return unicode !== null ?
                    (isInitialJamo(unicode) || isMedialJamo(unicode) || isFinalJamo(unicode))
                    : null;
        },
        getJamoLevel = function (unicode) {
            return isInitialJamo(unicode) ? 0 :
                    isMedialJamo(unicode) ? 1 :
                            isFinalJamo(unicode) ? 2 : null;

        },
        composingJamo = function (Jamo1, Jamo2) {
            return compatibilityJamo2Jamo.composing[Jamo1] && compatibilityJamo2Jamo.composing[Jamo1][Jamo2] ?
                    [compatibilityJamo2Jamo.composing[Jamo1][Jamo2]] :
                    [Jamo1, Jamo2];
        },
        isHangul = function (code) {
            code = preProcessCode(code);
            return code !== null ?
                    ((0xAC00 <= code && code <= 0xD7A3) //Hangul Syllables
                    || isCompatabilityJamo(code)) //compatability Jamo;
                    : null;
        },
        addAsInitialJamo = function (dcompatabilityJamo, dcurrentChar) {
            dcompatabilityJamo = preProcessCode(dcompatabilityJamo);
            var jamo = 0;
            if (isMedialJamo(dcompatabilityJamo)) {
                jamo = compatibilityJamo2Jamo[1](dcompatabilityJamo);
                if (!isNaN(jamo)) {
                    dcurrentChar = dcurrentChar.concat([0x110B, jamo]);
                }
            } else {
                jamo = compatibilityJamo2Jamo[0](dcompatabilityJamo);
                if (!isNaN(jamo)) {
                    dcurrentChar = dcurrentChar.concat([jamo]);
                } else {
                    dcurrentChar = dcurrentChar.concat([dcompatabilityJamo]);
                }
            }
            return dcurrentChar;
        },
        addAsComposingJamo = function (dcompatabilityJamo, dcurrentChar, level) {
            var jamo = compatibilityJamo2Jamo[level](dcompatabilityJamo),
                lastJamo = dcurrentChar.pop(),
                composed = composingJamo(lastJamo, jamo);

            if (1 === composed.length) {//composing jamo
                dcurrentChar = dcurrentChar.concat([composed]);
            } else {//non composing  jamo thus add new char
                dcurrentChar = dcurrentChar.concat([lastJamo]);
                dcurrentChar = addAsInitialJamo(dcompatabilityJamo, dcurrentChar);
            }
            return dcurrentChar;
        },
        addToInitialJamo = function (dcompatabilityJamo, dcurrentChar) {
            dcompatabilityJamo = preProcessCode(dcompatabilityJamo);

            var jamo = compatibilityJamo2Jamo[isMedialJamo(dcompatabilityJamo) ? 1 : 0](dcompatabilityJamo),
                currentjamo = compatibilityJamo2Jamo[0](dcurrentChar[dcurrentChar.length - 1]);

            if (!isNaN(currentjamo)) {
                dcurrentChar[dcurrentChar.length - 1] = currentjamo;
            }
            return dcurrentChar.concat(isNaN(jamo) ? [dcompatabilityJamo] : [jamo]);

        },
        addToMedialJamo = function (dcompatabilityJamo, dcurrentChar) {
            dcompatabilityJamo = preProcessCode(dcompatabilityJamo);

            if (isMedialJamo(dcompatabilityJamo)) {
                dcurrentChar = addAsComposingJamo(dcompatabilityJamo, dcurrentChar, 1);

            } else {
                var jamo = compatibilityJamo2Jamo[2](dcompatabilityJamo);
                dcurrentChar = dcurrentChar.concat(isNaN(jamo) ? [dcompatabilityJamo] : [jamo]);
            }

            return dcurrentChar;
        },
        addToFinalJamo = function (dcompatabilityJamo, dcurrentChar) {
            dcompatabilityJamo = preProcessCode(dcompatabilityJamo);
            var jamo = 0,
                lastJamo = 0;

            if (isMedialJamo(dcompatabilityJamo)) {
                lastJamo = dcurrentChar.pop();
                jamo = compatibilityJamo2Jamo.reverse[2](lastJamo);

                if (2 === jamo.length) { //composed final jamo thus decompose and split final jamo over 2 characters
                    dcurrentChar = dcurrentChar.concat(jamo);
                } else { //normal final jamo thus add regular Medial
                    dcurrentChar.push(jamo);
                }
                dcurrentChar = addToInitialJamo(dcompatabilityJamo, dcurrentChar);
            } else {
                dcurrentChar = addAsComposingJamo(dcompatabilityJamo, dcurrentChar, 2);
            }

            return dcurrentChar;
        },
        filterJamo = function (str) {
            var i,
                n,
                new_str = "";
            for (i = 0, n = str.length; i < n; ++i) {
                new_str +=  composedChar(compatibilityJamo2Jamo.reverse.auto(str[i].charCodeAt()));
            }
            return new_str;
        },
        addJamo = function (compatabilityJamo, currentChar) {
            var dcompatabilityJamo = decomposedCharCodeList(compatabilityJamo),
                dcurrentChar = decomposedCharCodeList(currentChar),
                level = 0,
                new_str = currentChar + compatabilityJamo;

            if (isCompatabilityJamo(dcompatabilityJamo)) {
                if (isHangul(currentChar.charCodeAt())) {
                    level = getJamoLevel(dcurrentChar[dcurrentChar.length - 1]);
                    switch (level) {
                    case 2:
                        new_str = addToFinalJamo(dcompatabilityJamo, dcurrentChar);
                        break;
                    case 1:
                        new_str = addToMedialJamo(dcompatabilityJamo, dcurrentChar);
                        break;
                    default:
                        new_str = addToInitialJamo(dcompatabilityJamo, dcurrentChar);
                        break;
                    }
                } else {
                    new_str = addAsInitialJamo(dcompatabilityJamo, dcurrentChar);
                }

                new_str = composedChar(new_str);
                new_str = filterJamo(new_str);
            }
            return new_str;
        },
        koreanRevisedRomenization = function (latin, currentChar) {
            if ("undefined" === typeof currentChar) {
                currentChar = "";
            }
            var dcurrentChar = decomposedCharCodeList(currentChar),
                dlatin = decomposedCharCodeList(latin),
                new_jamo = 0,
                last_jamo = 0,
                new_str = [],
                reverser_removed = 0,
                level = Number.NaN;

            if (latin === 'w' || latin === 'y') {
                romanization_deadkey = latin.charCodeAt();
                return currentChar;
            }

            if (!isNaN(romanization_deadkey)) {
                new_jamo = romanization.latin2CompatabilityJamo(latin, romanization_deadkey, 1);
                if (!isNaN(new_jamo)) {
                    new_str = addJamo(composedChar(new_jamo), currentChar);
                }
            } else {
                new_jamo = romanization.latin2CompatabilityJamo(latin);
                if (!isNaN(new_jamo) && isHangul(currentChar.charCodeAt())) {
                    last_jamo = dcurrentChar.pop();

                    level = getJamoLevel(last_jamo);
                    reverser_removed = compatibilityJamo2Jamo.reverse.auto(last_jamo);
                    // handle ng
                    if (0x3147 === reverser_removed && isMedialJamo(new_jamo)) {
                        dcurrentChar.push(0x11AB);
                        last_jamo = 0x3131;
                    }

                    new_jamo = romanization.latin2CompatabilityJamo(latin, reverser_removed, level);

                    if (isNaN(new_jamo)) {
                        dcurrentChar.push(last_jamo);
                        new_jamo = romanization.latin2CompatabilityJamo(latin);
                    }
                } else if (isNaN(new_jamo)) {
                    new_jamo =  dlatin;
                }
                new_str = addJamo(composedChar(new_jamo), filterJamo(composedChar(dcurrentChar)));
            }
            romanization_deadkey = Number.NaN;
            return new_str;
        },
        removeJamo = function (hangul_character) {
            if ("" === hangul_character) {return ""; }

            var level = getJamoLevel(hangul_character.charCodeAt()),
                decomposed = decomposedCharCodeList(hangul_character),
                removed = decomposed.pop(),
                reverser_removed = null;

            if (2 === level || (allow_composing_initial && 0 === level)) {
                //test if this is was a composing character
                reverser_removed = compatibilityJamo2Jamo.reverse.auto(removed, true);
                if (Array.isArray(reverser_removed)) {
                    decomposed.push(reverser_removed[0]);
                }
            }
            romanization_deadkey = Number.NaN;
            return filterJamo(composedChar(decomposed));
        };

    self = {
        "addRomanizedCharacter" : function (newchar, selected) {
            return koreanRevisedRomenization(newchar, selected);
        },
        "removeCharacter" : function (str_before, select_start, select_end, selected) {
            var txt = '',
                useDefault = true;

            if ('undefined' === typeof selected || selected.length !== 1 || !isHangul(selected.charCodeAt())) {
                if ('undefined' === typeof selected) { selected = ''; }
                txt = str_before + selected;

            } else {
                selected = removeJamo(selected);
                txt = str_before + selected;
                useDefault = false;
            }
            return {"text": txt, "selectionStart": txt.length - selected.length, "selectionEnd": txt.length, "useDefault": useDefault};
        },
        "processCharacter" : function (str_before, newchar, select_start, select_end, selected) {
            if ('undefined' === typeof selected || selected.length !== 1) { selected = ''; }
            switch (mode) {
            case 'HANGULJAMO':
                newchar = addJamo(newchar, selected);
                break;
            case 'KOREAN REVISED ROMANIZATION':
                newchar = koreanRevisedRomenization(newchar, selected);
                break;
            }

            var txt = (str_before + newchar),
                select_length = (newchar.length > 0 && isHangul(newchar[newchar.length - 1].charCodeAt())) ? 1 : 0;

            return {"text": txt, "selectionStart": txt.length - select_length, "selectionEnd": txt.length};
        },
        "isOn" : function () {
            return 'OFF' !== mode;
        },
        "setMode" : function (m) {
            var posibilities = ['OFF', 'HANGULJAMO', 'KOREAN REVISED ROMANIZATION'],
                success = false,
                im = posibilities.indexOf(m.toUpperCase());
            allow_composing_initial = false;
            if (-1 < im) {
                mode = posibilities[im];
                if ('KOREAN REVISED ROMANIZATION' === m.toUpperCase()) {
                    allow_composing_initial = true;
                }
                success = true;
            }
            return success;
        },
        "getMode" : function () {
            return mode;
        }
    };
    return self;
}());