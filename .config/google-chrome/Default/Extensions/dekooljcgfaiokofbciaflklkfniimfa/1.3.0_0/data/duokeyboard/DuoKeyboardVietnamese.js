DuoKeyboardInputMethodExtension.prototype.extensions.Vietnamese = (function () {
    'use strict';
    var self = {},
        mode = "OFF", // OFF, VIQR, VNI or TELEX
        c = {"sac": 769, "huyen": 768, "hoi": 777, "nga": 771, "nang": 803, "mu": 770, "moc": 795, "trang": 774, "dau": 1, "remove": -1},

        modes = {
            "VIQR"  : {"'": c.sac, "`": c.huyen, "?": c.hoi, "~": c.nga, ".": c.nang, "^": c.mu, "*": c.moc, "(": c.trang, "d": c.dau, "-": c.remove, "+": c.moc},
            "VNI"   : {"1": c.sac, "2": c.huyen, "3": c.hoi, "4": c.nga, "5": c.nang, "6": c.mu, "7": c.moc, "8": c.trang, "9": c.dau, "0": c.remove},
            "TELEX" : {"s": c.sac, "f": c.huyen, "r": c.hoi, "x": c.nga, "j": c.nang, "a": c.mu, "o": c.mu, "e": c.mu, "w": c.moc, "d": c.dau, "z": c.remove}
        },
        accents = {
            "tone": [c.sac, c.huyen, c.hoi, c.nga, c.nang],
            "a": [c.trang, c.mu],
            "e": [c.mu],
            "i": [],
            "o": [c.mu, c.moc],
            "u": [c.moc],
            "y": []
        },
        decomposedCharCodeList = function (code) {
            var charcodes = [],
                index = 0;
            code = code.normalize('NFD');
            while (!isNaN(code.charCodeAt(index))) {
                charcodes.push(code.charCodeAt(index));
                index++;
            }
            return charcodes;
        },
        composedChar = function (codes) {
            if (!Array.isArray(codes)) { codes = [codes]; }
            if (codes.length === 3 && [c.nang, c.mu, c.trang ].indexOf(codes[2]) > -1) {
                codes.push(codes.splice(1, 1)[0]);
            }
            return String.fromCharCode.apply(null, codes).normalize();
        };

    self = {
        "isOn" : function () {
            return 'OFF' !== mode;
        },
        "setMode" : function (m) {
            var posibilities = ['OFF', 'VIQR', 'VNI', 'TELEX'],
                success = false,
                im = posibilities.indexOf(m.toUpperCase());
            if (-1 < im) {
                mode = posibilities[im];
                success = true;
            }
            return success;
        },
        "getMode" : function () {
            return mode;
        },
        "processCharacter" : function (str_before, newchar, select_start, select_end, selected) {
            var txt = self.addKey(str_before, newchar);
            return {"text": txt, "selectionStart": txt.length, "selectionEnd": txt.length};
        },
        "addKey" : function (text, key) {
            if ("OFF" === mode) { return text + key; }
            var mKey = key.toLowerCase(),
                modification = modes[mode][mKey],
                acting_char = text.substring(text.length - 1, text.length),
                dec_acting_char = decomposedCharCodeList(acting_char),
                cleaned_acting_char = composedChar(dec_acting_char[0]).toLowerCase(),
                isTonalAccent,
                i,
                n,
                index,
                check_accents,
                accentIndex;

            if ('' === acting_char
                    || 'undefined' === typeof modification) {return text + key; }
            //account for special telex combinations
            if ("TELEX" === mode) {
                if (c.moc === modification
                        && 'a' === cleaned_acting_char
                        ) {
                    modification = c.trang;
                } else if (modification === c.mu && !(
                        ('a' === mKey && 'a' === cleaned_acting_char)
                        || ('e' === mKey && 'e' === cleaned_acting_char)
                        || ('o' === mKey && 'o' === cleaned_acting_char)
                    )
                        ) {
                    return text + key;
                }
            } else if ("VIQR" === mode && '\\' === acting_char) {
                return text.substring(0, text.length - 1) + key;
            }

            switch (modification) {
                //remove accent if applied
            case c.remove:
                if (272 === dec_acting_char[0]) {
                    acting_char = composedChar([68]);
                } else if (273 === dec_acting_char[0]) {
                    acting_char = composedChar([100]);
                } else if (dec_acting_char.length > 1 && 'undefined' !== typeof accents[cleaned_acting_char]) {
                    dec_acting_char.pop();
                    acting_char = composedChar(dec_acting_char);
                } else {
                    acting_char += key;
                }
                break;
              //modify dau character
            case c.dau:
                switch (dec_acting_char[0]) {
                case 68:
                    acting_char = composedChar(272);
                    break;
                case 100:
                    acting_char = composedChar(273);
                    break;
                case 272:
                    acting_char = composedChar(68) + key;
                    break;
                case 273:
                    acting_char = composedChar(100) + key;
                    break;
                default:
                    acting_char += key;
                    break;
                }
                break;

            default:
                // check if the modefier may change the charater
                isTonalAccent = accents.tone.indexOf(modification)  > -1;
                if ('undefined' !== typeof accents[cleaned_acting_char] &&
                        (//is character specific accent
                            accents[cleaned_acting_char].indexOf(modification) > -1 ||
                            isTonalAccent
                        )
                        ) {
                    index = dec_acting_char.indexOf(modification);
                    if (index > -1) {
                        //remove accent and add charcater
                        dec_acting_char.splice(index, 1);
                        acting_char = composedChar(dec_acting_char) + key;
                    } else {
                        check_accents = isTonalAccent ? accents.tone : accents[cleaned_acting_char];
                        for (i = 1, n = dec_acting_char.length; i < n; ++i) {
                            accentIndex = check_accents.indexOf(dec_acting_char[i]);
                            if (accentIndex > -1) {
                                dec_acting_char.splice(i, 1);
                            }
                        }
                        dec_acting_char.push(modification);
                        acting_char = composedChar(dec_acting_char);
                    }
                } else {
                    acting_char += key;
                }
                break;

            }
            return text.substring(0, text.length - 1) + acting_char;
        }
    };
    return self;
}());