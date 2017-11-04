var PageHowToUse = (function () {
    'use strict';
//interact.getMessage();
    var self = {},
        topics = [
            {
                "title": interact.getMessage("HowToUse_getting_started_title"),
                "context": [{
                    "tag_name": "p",
                    "bbcode": interact.getMessage("HowToUse_getting_started_content")
                }]
            }, {
                "title": interact.getMessage("HowToUse_diacritics_title"),
                "context": [{
                    "tag_name": "p",
                    "bbcode": interact.getMessage("HowToUse_diacritics_content")
                }]
            }, {
                "title": interact.getMessage("HowToUse_ime_title"),
                "context": [{
                    "tag_name": "p",
                    "bbcode": interact.getMessage("HowToUse_ime_content")
                }]
            }, {
                "title": interact.getMessage("HowToUse_korean_title"),
                "context": [{
                    "tag_name": "p",
                    "bbcode": interact.getMessage("HowToUse_korean_content")
                }, {
                    "tag_name": "table",
                    "attr": {"class": "duokeyboard-info-table"},
                    "innerhtml": [
                        {"tag_name": "caption", "bbcode": interact.getMessage("HowToUse_korean_vowel_table_caption")},
                        {"tag_name": "tbody",
                            "innerhtml": [{
                                "tag_name": "tr",
                                "innerhtml": [
                                    {"tag_name": "th", "text": interact.getMessage("Hangul")},
                                    {"tag_name": "th", "text": "ㅏ"},
                                    {"tag_name": "th", "text": "ㅐ"},
                                    {"tag_name": "th", "text": "ㅑ"},
                                    {"tag_name": "th", "text": "ㅒ"},
                                    {"tag_name": "th", "text": "ㅓ"},
                                    {"tag_name": "th", "text": "ㅔ"},
                                    {"tag_name": "th", "text": "ㅕ"},
                                    {"tag_name": "th", "text": "ㅖ"},
                                    {"tag_name": "th", "text": "ㅗ"},
                                    {"tag_name": "th", "text": "ㅘ"},
                                    {"tag_name": "th", "text": "ㅙ"},
                                    {"tag_name": "th", "text": "ㅚ"},
                                    {"tag_name": "th", "text": "ㅛ"},
                                    {"tag_name": "th", "text": "ㅜ"},
                                    {"tag_name": "th", "text": "ㅝ"},
                                    {"tag_name": "th", "text": "ㅞ"},
                                    {"tag_name": "th", "text": "ㅟ"},
                                    {"tag_name": "th", "text": "ㅠ"},
                                    {"tag_name": "th", "text": "ㅡ"},
                                    {"tag_name": "th", "text": "ㅢ"},
                                    {"tag_name": "th", "text": "ㅣ"}
                                ]
                            }, {
                                "tag_name": "tr",
                                "innerhtml": [
                                    {"tag_name": "th", "text": interact.getMessage("Romanization")},
                                    {"tag_name": "td", "text": "a"},
                                    {"tag_name": "td", "text": "ae"},
                                    {"tag_name": "td", "text": "ya"},
                                    {"tag_name": "td", "text": "yae"},
                                    {"tag_name": "td", "text": "eo"},
                                    {"tag_name": "td", "text": "e"},
                                    {"tag_name": "td", "text": "yeo"},
                                    {"tag_name": "td", "text": "ye"},
                                    {"tag_name": "td", "text": "o"},
                                    {"tag_name": "td", "text": "wa"},
                                    {"tag_name": "td", "text": "wae"},
                                    {"tag_name": "td", "text": "oe"},
                                    {"tag_name": "td", "text": "yo"},
                                    {"tag_name": "td", "text": "u"},
                                    {"tag_name": "td", "text": "wo"},
                                    {"tag_name": "td", "text": "we"},
                                    {"tag_name": "td", "text": "wi"},
                                    {"tag_name": "td", "text": "yu"},
                                    {"tag_name": "td", "text": "eu"},
                                    {"tag_name": "td", "text": "ui"},
                                    {"tag_name": "td", "text": "i"}
                                ]
                            }]}
                    ]
                }, {
                    "tag_name": "table",
                    "attr": {"class": "duokeyboard-info-table"},
                    "innerhtml": [
                        {"tag_name": "caption", "bbcode": interact.getMessage("HowToUse_korean_consonent_table_caption")},
                        {
                            "tag_name": "tbody",
                            "innerhtml": [
                                {"tag_name": "tr", "innerhtml": [
                                    {"tag_name": "th", "text": interact.getMessage("Hangul"), "attr": {"colspan": 2}},
                                    {"tag_name": "th", "text": "ㄱ"},
                                    {"tag_name": "th", "text": "ㄲ"},
                                    {"tag_name": "th", "text": "ㄴ"},
                                    {"tag_name": "th", "text": "ㄷ"},
                                    {"tag_name": "th", "text": "ㄸ"},
                                    {"tag_name": "th", "text": "ㄹ"},
                                    {"tag_name": "th", "text": "ㅁ"},
                                    {"tag_name": "th", "text": "ㅂ"},
                                    {"tag_name": "th", "text": "ㅃ"},
                                    {"tag_name": "th", "text": "ㅅ"},
                                    {"tag_name": "th", "text": "ㅆ"},
                                    {"tag_name": "th", "text": "ㅇ"},
                                    {"tag_name": "th", "text": "ㅈ"},
                                    {"tag_name": "th", "text": "ㅉ"},
                                    {"tag_name": "th", "text": "ㅊ"},
                                    {"tag_name": "th", "text": "ㅋ"},
                                    {"tag_name": "th", "text": "ㅌ"},
                                    {"tag_name": "th", "text": "ㅍ"},
                                    {"tag_name": "th", "text": "ㅎ"}
                                ]},
                                {"tag_name": "tr", "innerhtml": [
                                    {"tag_name": "th", "text": interact.getMessage("Romanization"), "attr": {"rowspan": 2}},
                                    {"tag_name": "th", "text": interact.getMessage("jamo_initial")},
                                    {"tag_name": "td", "text": "g"},
                                    {"tag_name": "td", "text": "gg/kk/G"},
                                    {"tag_name": "td", "text": "n"},
                                    {"tag_name": "td", "text": "d"},
                                    {"tag_name": "td", "text": "tt/D"},
                                    {"tag_name": "td", "text": "r/l"},
                                    {"tag_name": "td", "text": "m"},
                                    {"tag_name": "td", "text": "b"},
                                    {"tag_name": "td", "text": "bb/pp/B"},
                                    {"tag_name": "td", "text": "s"},
                                    {"tag_name": "td", "text": "ss/S"},
                                    {"tag_name": "td", "text": "'"},
                                    {"tag_name": "td", "text": "j"},
                                    {"tag_name": "td", "text": "jj/J"},
                                    {"tag_name": "td", "text": "c/ch"},
                                    {"tag_name": "td", "text": "k"},
                                    {"tag_name": "td", "text": "t"},
                                    {"tag_name": "td", "text": "p"},
                                    {"tag_name": "td", "text": "h"}
                                ]},
                                {"tag_name": "tr", "innerhtml": [
                                    {"tag_name": "th", "text": interact.getMessage("jamo_final")},
                                    {"tag_name": "td", "text": "g"},
                                    {"tag_name": "td", "text": "kk/G"},
                                    {"tag_name": "td", "text": "n"},
                                    {"tag_name": "td", "text": "d"},
                                    {"tag_name": "td", "text": " "},
                                    {"tag_name": "td", "text": "l"},
                                    {"tag_name": "td", "text": "m"},
                                    {"tag_name": "td", "text": "b"},
                                    {"tag_name": "td", "text": " "},
                                    {"tag_name": "td", "text": "s"},
                                    {"tag_name": "td", "text": "ss/S"},
                                    {"tag_name": "td", "text": "ng"},
                                    {"tag_name": "td", "text": "j"},
                                    {"tag_name": "td", "text": " "},
                                    {"tag_name": "td", "text": "c/ch"},
                                    {"tag_name": "td", "text": "k"},
                                    {"tag_name": "td", "text": "t"},
                                    {"tag_name": "td", "text": "p"},
                                    {"tag_name": "td", "text": "h"}
                                ]}
                            ]
                        }
                    ]
                }]
            }, {
                "title": interact.getMessage("HowToUse_vietnamese_title"),
                "context": [{
                    "tag_name": "p",
                    "bbcode": interact.getMessage("HowToUse_vietnamese_content")
                },
                    {"tag_name": "table", "attr": {"class": "duokeyboard-info-table"}, "innerhtml": [
                        {"tag_name": "caption", "bbcode": interact.getMessage("HowToUse_vietnamese_system_table_caption")},
                        {"tag_name": "tbody", "innerhtml": [
                            {"tag_name": "tr", "innerhtml": [
                                {"tag_name": "th", "text": interact.getMessage("Diacritic")},
                                {"tag_name": "th", "text": "sắc"},
                                {"tag_name": "th", "text": "huyền"},
                                {"tag_name": "th", "text": "hỏi"},
                                {"tag_name": "th", "text": "ngã"},
                                {"tag_name": "th", "text": "nặng"},
                                {"tag_name": "th", "text": "mũ"},
                                {"tag_name": "th", "text": "móc"},
                                {"tag_name": "th", "text": "trăng"},
                                {"tag_name": "th", "text": "đ"}
                            ]},
                            {"tag_name": "tr", "innerhtml": [
                                {"tag_name": "th", "text": interact.getMessage("TELEX")},
                                {"tag_name": "td", "text": "s"},
                                {"tag_name": "td", "text": "f"},
                                {"tag_name": "td", "text": "r"},
                                {"tag_name": "td", "text": "x"},
                                {"tag_name": "td", "text": "j"},
                                {"tag_name": "td", "text": "aa/oo/ee"},
                                {"tag_name": "td", "text": "ow/uw"},
                                {"tag_name": "td", "text": "aw"},
                                {"tag_name": "td", "text": "dd"}
                            ]},
                            {"tag_name": "tr", "innerhtml": [
                                {"tag_name": "th", "text": interact.getMessage("VIQR")},
                                {"tag_name": "td", "text": "'"},
                                {"tag_name": "td", "text": "`"},
                                {"tag_name": "td", "text": "?"},
                                {"tag_name": "td", "text": "~"},
                                {"tag_name": "td", "text": "."},
                                {"tag_name": "td", "text": "^"},
                                {"tag_name": "td", "text": "*"},
                                {"tag_name": "td", "text": "("},
                                {"tag_name": "td", "text": "dd"}
                            ]},
                            {"tag_name": "tr", "innerhtml": [
                                {"tag_name": "th", "text": interact.getMessage("VNI")},
                                {"tag_name": "td", "text": "1"},
                                {"tag_name": "td", "text": "2"},
                                {"tag_name": "td", "text": "3"},
                                {"tag_name": "td", "text": "4"},
                                {"tag_name": "td", "text": "5"},
                                {"tag_name": "td", "text": "6"},
                                {"tag_name": "td", "text": "7"},
                                {"tag_name": "td", "text": "8"},
                                {"tag_name": "td", "text": "9"}
                            ]}
                        ]}
                    ]}, {
                    "tag_name": "table",
                    "attr": {"class": "duokeyboard-info-table duokeyboard-align-left"},
                    "innerhtml": [
                        {"tag_name": "caption", "bbcode": (interact.getMessage("HowToUse_vietnamese_example_table_caption") + '[br]"Em tập đánh Tiếng Việt"')},
                        {"tag_name": "tbody", "innerhtml": [
                            {"tag_name": "tr", "innerhtml": [
                                {"tag_name": "th", "text": interact.getMessage("TELEX")},
                                {"tag_name": "td", "text": "Em taajp ddasnh Tieesng Vieejt"}
                            ]},
                            {"tag_name": "tr", "innerhtml": [
                                {"tag_name": "th", "text": interact.getMessage("VIQR")},
                                {"tag_name": "td", "text": "Em ta^.p dda'nh Tie^'ng Vie^.t"}
                            ]},
                            {"tag_name": "tr", "innerhtml": [
                                {"tag_name": "th", "text": interact.getMessage("VNI")},
                                {"tag_name": "td", "text": "Em ta65p d9a1nh Tie61ng Vie65t"}
                            ]}
                        ]}
                    ]
                }]
            }
        ];


    self = {
        "showTestArea" : function () {
            return false;
        },
        "getTitle" : function () {
            return interact.getMessage("HowToUse_title");
        },
        "loadPage" : function () {
            var i,
                n,
                page = [];
            for (i = 0, n = topics.length; i < n; ++i) {
                page.push({"tag_name": "h3", "text": topics[i].title});
                page = page.concat(topics[i].context);
            }
            return page;
        }
    };
    return self;

}());