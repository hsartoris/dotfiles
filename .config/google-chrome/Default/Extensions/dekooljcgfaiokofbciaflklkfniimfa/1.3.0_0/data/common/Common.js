var hasClassName = function (el, classname) {
        'use strict';
        var i, n,
            cn = el.getAttribute('class') || '';
        cn = cn.split(' ');

        for (i = 0, n = cn.length; i < n; ++i) {
            if (cn[i] !== '' && cn[i] === classname) {
                return true;
            }
        }
        return false;
    },
    addClassName = function (el, classname) {
        'use strict';
        if (!hasClassName(el, classname)) {
            var cn = (el.getAttribute('class') === null ? '' :  el.getAttribute('class')) + ' ' + classname;
            el.setAttribute('class', cn);
        }
    },
    removeClassName = function (el, classname) {
        'use strict';
        var new_cn = [], i, n,
            cn = el.getAttribute('class') || '';
        cn = cn.split(' ');

        for (i = 0, n = cn.length; i < n; ++i) {
            if (cn[i] !== '' && cn[i] !== classname) {
                new_cn.push(cn[i]);
            }
        }
        new_cn = new_cn.join(' ');
        el.setAttribute('class', new_cn);
    },
    isString = function (str) {
        'use strict';
        return str instanceof String || typeof str === "string";
    },
    css = function (el, classes, value) {
        'use strict';
        var i,
            n,
            prop,
            c;
        if (isString(classes) && value) {
            c = {};
            c[classes] = value;
            classes = c;
        }
        if (!Array.isArray(el)) {
            el = [el];
        }
        for (i = 0, n = el.length; i < n; ++i) {
            for (prop in classes) {
                if (classes.hasOwnProperty(prop)) {
                    el[i].style[prop] = classes[prop];
                }
            }
        }
    },
    emptyElement = function (el) {
        'use strict';
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    },
    promiseAJAX = function (url, options) {
        'use strict';
        var o = options || {},
            method = o.method || 'GET';

        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {

                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    },
    insertAfter = function (newElement, targetElement) {
        'use strict';
        var parent = targetElement.parentNode;

        if (parent.lastChild === targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    };
Array.prototype.sortIndices = function (func) {
    'use strict';
    var i = this.length,
        j = i,
        that = this;

    while (i--) {
        this[i] = { "k": i, "v": this[i] };
    }

    this.sort(function (a, b) {
        return func ? func.call(that, a.v, b.v) :
                      a.v < b.v ? -1 : a.v > b.v ? 1 : 0;
    });

    while (j--) {
        this[j] = this[j].k;
    }
};
