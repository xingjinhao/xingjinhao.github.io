/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
!function (e) {
    "use strict";
    var t = function (t, n) {
        var o = e.document.getElementsByTagName("script")[0], r = e.document.createElement("script");
        return r.src = t, r.async = !0, o.parentNode.insertBefore(r, o), n && "function" === typeof n && (r.onload = n), r
    };
    "undefined" != typeof module ? module.exports = t : e.loadJS = t
}("undefined" != typeof global ? global : this);

/*! loadCSS: load a CSS file asynchronouslccy. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
!function (e) {
    "use strict";
    var n = function (n, t, o) {
        function i(e) {
            return a.body ? e() : void setTimeout(function () {
                i(e)
            })
        }

        function r() {
            l.addEventListener && l.removeEventListener("load", r), l.media = o || "all"
        }

        var d, a = e.document, l = a.createElement("link");
        if (t) d = t; else {
            var s = (a.body || a.getElementsByTagName("head")[0]).childNodes;
            d = s[s.length - 1]
        }
        var f = a.styleSheets;
        l.rel = "stylesheet", l.href = n, l.media = "only x", i(function () {
            d.parentNode.insertBefore(l, t ? d : d.nextSibling)
        });
        var u = function (e) {
            for (var n = l.href, t = f.length; t--;) if (f[t].href === n) return e();
            setTimeout(function () {
                u(e)
            })
        };
        return l.addEventListener && l.addEventListener("load", r), l.onloadcssdefined = u, u(r), l
    };
    "undefined" != typeof exports ? exports.loadCSS = n : e.loadCSS = n
}("undefined" != typeof global ? global : this);
//loadCSS("/styles/async.css");

/*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */
!function (t) {
    "use strict";
    if (t.loadCSS) {
        var e = loadCSS.relpreload = {};
        if (e.support = function () {
            try {
                return t.document.createElement("link").relList.supports("preload")
            } catch (e) {
                return !1
            }
        }, e.poly = function () {
            for (var e = t.document.getElementsByTagName("link"), r = 0; r < e.length; r++) {
                var n = e[r];
                "preload" === n.rel && "style" === n.getAttribute("as") && (t.loadCSS(n.href, n, n.getAttribute("media")), n.rel = null)
            }
        }, !e.support()) {
            e.poly();
            var r = t.setInterval(e.poly, 300);
            t.addEventListener && t.addEventListener("load", function () {
                e.poly(), t.clearInterval(r)
            }), t.attachEvent && t.attachEvent("onload", function () {
                t.clearInterval(r)
            })
        }
    }
}(this);

/*! preLoadCSS based on loadCSS. [c]2017 Filament Group, Inc. MIT License */
!function (e) {
    "use strict";
    var t = function (t, n, r) {
        function o(e) {
            return l.body ? e() : void setTimeout(function () {
                o(e)
            })
        }

        function i() {
            a.addEventListener && a.removeEventListener("load", i), a.rel = "stylesheet"
        }

        var d, l = e.document, a = l.createElement("link");
        if (n) d = n; else {
            var s = (l.body || l.getElementsByTagName("head")[0]).childNodes;
            d = s[s.length - 1]
        }
        var u = l.styleSheets;
        a.rel = "preload", a.href = t, a.media = r || "all", a.as = "style", o(function () {
            d.parentNode.insertBefore(a, n ? d : d.nextSibling)
        });
        var f = function (e) {
            for (var t = a.href, n = u.length; n--;) if (u[n].href === t) return e();
            setTimeout(function () {
                f(e)
            })
        }, c = function () {
            try {
                return e.document.createElement("link").relList.supports("preload")
            } catch (t) {
                return !1
            }
        };
        return c() || (a.rel = "stylesheet"), a.addEventListener && a.addEventListener("load", i), a.onloadcssdefined = f, f(i), a
    };
    "undefined" != typeof exports ? exports.preLoadCSS = t : e.preLoadCSS = t
}("undefined" != typeof global ? global : this);

/*! CustomEvent Polyfill */
!function () {
    "use strict";

    function t(t, e) {
        e = e || {bubbles: !1, cancelable: !1, detail: void 0};
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
    }

    return "function" == typeof window.CustomEvent ? !1 : (t.prototype = window.Event.prototype, void (window.CustomEvent = t))
}();

function supportsVideoType(e) {
    let c;
    return c || (c = document.createElement("video")), c.canPlayType({
        ogg: 'video/ogg; codecs="theora"',
        h264: 'video/mp4; codecs="avc1.42E01E"',
        webm: 'video/webm; codecs="vp8, vorbis"',
        vp9: 'video/webm; codecs="vp9"',
        hevc: 'video/mp4; codecs="hevc"',
        hls: 'application/x-mpegURL; codecs="avc1.42E01E"',
        av1: 'video/mp4; codecs="av01.0.08M.08"'
    }[e] || e)
}


/*!@license
 * enquire.js v2.1.6 - Awesome Media Queries in JavaScript
 * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT */
!function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.enquire = a()
    }
}(function () {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {exports: {}};
                b[g][0].call(k.exports, function (a) {
                    var c = b[g][1][a];
                    return e(c ? c : a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }

        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function (a, b, c) {
            function d(a, b) {
                this.query = a, this.isUnconditional = b, this.handlers = [], this.mql = window.matchMedia(a);
                var c = this;
                this.listener = function (a) {
                    c.mql = a.currentTarget || a, c.assess()
                }, this.mql.addListener(this.listener)
            }

            var e = a(3), f = a(4).each;
            d.prototype = {
                constuctor: d, addHandler: function (a) {
                    var b = new e(a);
                    this.handlers.push(b), this.matches() && b.on()
                }, removeHandler: function (a) {
                    var b = this.handlers;
                    f(b, function (c, d) {
                        if (c.equals(a)) return c.destroy(), !b.splice(d, 1)
                    })
                }, matches: function () {
                    return this.mql.matches || this.isUnconditional
                }, clear: function () {
                    f(this.handlers, function (a) {
                        a.destroy()
                    }), this.mql.removeListener(this.listener), this.handlers.length = 0
                }, assess: function () {
                    var a = this.matches() ? "on" : "off";
                    f(this.handlers, function (b) {
                        b[a]()
                    })
                }
            }, b.exports = d
        }, {3: 3, 4: 4}], 2: [function (a, b, c) {
            function d() {
                if (!window.matchMedia) throw new Error("matchMedia not present, legacy browsers require a polyfill");
                this.queries = {}, this.browserIsIncapable = !window.matchMedia("only all").matches
            }

            var e = a(1), f = a(4), g = f.each, h = f.isFunction, i = f.isArray;
            d.prototype = {
                constructor: d, register: function (a, b, c) {
                    var d = this.queries, f = c && this.browserIsIncapable;
                    return d[a] || (d[a] = new e(a, f)), h(b) && (b = {match: b}), i(b) || (b = [b]), g(b, function (b) {
                        h(b) && (b = {match: b}), d[a].addHandler(b)
                    }), this
                }, unregister: function (a, b) {
                    var c = this.queries[a];
                    return c && (b ? c.removeHandler(b) : (c.clear(), delete this.queries[a])), this
                }
            }, b.exports = d
        }, {1: 1, 4: 4}], 3: [function (a, b, c) {
            function d(a) {
                this.options = a, !a.deferSetup && this.setup()
            }

            d.prototype = {
                constructor: d, setup: function () {
                    this.options.setup && this.options.setup(), this.initialised = !0
                }, on: function () {
                    !this.initialised && this.setup(), this.options.match && this.options.match()
                }, off: function () {
                    this.options.unmatch && this.options.unmatch()
                }, destroy: function () {
                    this.options.destroy ? this.options.destroy() : this.off()
                }, equals: function (a) {
                    return this.options === a || this.options.match === a
                }
            }, b.exports = d
        }, {}], 4: [function (a, b, c) {
            function d(a, b) {
                var c = 0, d = a.length;
                for (c; c < d && b(a[c], c) !== !1; c++) ;
            }

            function e(a) {
                return "[object Array]" === Object.prototype.toString.apply(a)
            }

            function f(a) {
                return "function" == typeof a
            }

            b.exports = {isFunction: f, isArray: e, each: d}
        }, {}], 5: [function (a, b, c) {
            var d = a(2);
            b.exports = new d
        }, {2: 2}]
    }, {}, [5])(5)
});

/*!@license
 jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (a, b) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
    "use strict";
    var c = [], d = a.document, e = Object.getPrototypeOf, f = c.slice, g = c.concat, h = c.push, i = c.indexOf, j = {},
        k = j.toString, l = j.hasOwnProperty, m = l.toString, n = m.call(Object), o = {};

    function p(a, b) {
        b = b || d;
        var c = b.createElement("script");
        c.text = a, b.head.appendChild(c).parentNode.removeChild(c)
    }

    var q = "3.2.1", r = function (a, b) {
        return new r.fn.init(a, b)
    }, s = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, t = /^-ms-/, u = /-([a-z])/g, v = function (a, b) {
        return b.toUpperCase()
    };
    r.fn = r.prototype = {
        jquery: q, constructor: r, length: 0, toArray: function () {
            return f.call(this)
        }, get: function (a) {
            return null == a ? f.call(this) : a < 0 ? this[a + this.length] : this[a]
        }, pushStack: function (a) {
            var b = r.merge(this.constructor(), a);
            return b.prevObject = this, b
        }, each: function (a) {
            return r.each(this, a)
        }, map: function (a) {
            return this.pushStack(r.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, slice: function () {
            return this.pushStack(f.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (a) {
            var b = this.length, c = +a + (a < 0 ? b : 0);
            return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
        }, end: function () {
            return this.prevObject || this.constructor()
        }, push: h, sort: c.sort, splice: c.splice
    }, r.extend = r.fn.extend = function () {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || r.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++) if (null != (a = arguments[h])) for (b in a) c = g[b], d = a[b], g !== d && (j && d && (r.isPlainObject(d) || (e = Array.isArray(d))) ? (e ? (e = !1, f = c && Array.isArray(c) ? c : []) : f = c && r.isPlainObject(c) ? c : {}, g[b] = r.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }, r.extend({
        expando: "jQuery" + (q + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
            throw new Error(a)
        }, noop: function () {
        }, isFunction: function (a) {
            return "function" === r.type(a)
        }, isWindow: function (a) {
            return null != a && a === a.window
        }, isNumeric: function (a) {
            var b = r.type(a);
            return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a))
        }, isPlainObject: function (a) {
            var b, c;
            return !(!a || "[object Object]" !== k.call(a)) && (!(b = e(a)) || (c = l.call(b, "constructor") && b.constructor, "function" == typeof c && m.call(c) === n))
        }, isEmptyObject: function (a) {
            var b;
            for (b in a) return !1;
            return !0
        }, type: function (a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? j[k.call(a)] || "object" : typeof a
        }, globalEval: function (a) {
            p(a)
        }, camelCase: function (a) {
            return a.replace(t, "ms-").replace(u, v)
        }, each: function (a, b) {
            var c, d = 0;
            if (w(a)) {
                for (c = a.length; d < c; d++) if (b.call(a[d], d, a[d]) === !1) break
            } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
            return a
        }, trim: function (a) {
            return null == a ? "" : (a + "").replace(s, "")
        }, makeArray: function (a, b) {
            var c = b || [];
            return null != a && (w(Object(a)) ? r.merge(c, "string" == typeof a ? [a] : a) : h.call(c, a)), c
        }, inArray: function (a, b, c) {
            return null == b ? -1 : i.call(b, a, c)
        }, merge: function (a, b) {
            for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
            return a.length = e, a
        }, grep: function (a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        }, map: function (a, b, c) {
            var d, e, f = 0, h = [];
            if (w(a)) for (d = a.length; f < d; f++) e = b(a[f], f, c), null != e && h.push(e); else for (f in a) e = b(a[f], f, c), null != e && h.push(e);
            return g.apply([], h)
        }, guid: 1, proxy: function (a, b) {
            var c, d, e;
            if ("string" == typeof b && (c = a[b], b = a, a = c), r.isFunction(a)) return d = f.call(arguments, 2), e = function () {
                return a.apply(b || this, d.concat(f.call(arguments)))
            }, e.guid = a.guid = a.guid || r.guid++, e
        }, now: Date.now, support: o
    }), "function" == typeof Symbol && (r.fn[Symbol.iterator] = c[Symbol.iterator]), r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
        j["[object " + b + "]"] = b.toLowerCase()
    });

    function w(a) {
        var b = !!a && "length" in a && a.length, c = r.type(a);
        return "function" !== c && !r.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a)
    }

    var x = function (a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date, v = a.document, w = 0,
            x = 0, y = ha(), z = ha(), A = ha(), B = function (a, b) {
                return a === b && (l = !0), 0
            }, C = {}.hasOwnProperty, D = [], E = D.pop, F = D.push, G = D.push, H = D.slice, I = function (a, b) {
                for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return c;
                return -1
            },
            J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            K = "[\\x20\\t\\r\\n\\f]", L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            M = "\\[" + K + "*(" + L + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + L + "))|)" + K + "*\\]",
            N = ":(" + L + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
            O = new RegExp(K + "+", "g"), P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
            Q = new RegExp("^" + K + "*," + K + "*"), R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
            S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"), T = new RegExp(N),
            U = new RegExp("^" + L + "$"), V = {
                ID: new RegExp("^#(" + L + ")"),
                CLASS: new RegExp("^\\.(" + L + ")"),
                TAG: new RegExp("^(" + L + "|[*])"),
                ATTR: new RegExp("^" + M),
                PSEUDO: new RegExp("^" + N),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + J + ")$", "i"),
                needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i")
            }, W = /^(?:input|select|textarea|button)$/i, X = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, $ = /[+~]/,
            _ = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"), aa = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            }, ba = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ca = function (a, b) {
                return b ? "\0" === a ? "\ufffd" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a
            }, da = function () {
                m()
            }, ea = ta(function (a) {
                return a.disabled === !0 && ("form" in a || "label" in a)
            }, {dir: "parentNode", next: "legend"});
        try {
            G.apply(D = H.call(v.childNodes), v.childNodes), D[v.childNodes.length].nodeType
        } catch (fa) {
            G = {
                apply: D.length ? function (a, b) {
                    F.apply(a, H.call(b))
                } : function (a, b) {
                    var c = a.length, d = 0;
                    while (a[c++] = b[d++]) ;
                    a.length = c - 1
                }
            }
        }

        function ga(a, b, d, e) {
            var f, h, j, k, l, o, r, s = b && b.ownerDocument, w = b ? b.nodeType : 9;
            if (d = d || [], "string" != typeof a || !a || 1 !== w && 9 !== w && 11 !== w) return d;
            if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
                if (11 !== w && (l = Z.exec(a))) if (f = l[1]) {
                    if (9 === w) {
                        if (!(j = b.getElementById(f))) return d;
                        if (j.id === f) return d.push(j), d
                    } else if (s && (j = s.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d
                } else {
                    if (l[2]) return G.apply(d, b.getElementsByTagName(a)), d;
                    if ((f = l[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(f)), d
                }
                if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
                    if (1 !== w) s = b, r = a; else if ("object" !== b.nodeName.toLowerCase()) {
                        (k = b.getAttribute("id")) ? k = k.replace(ba, ca) : b.setAttribute("id", k = u), o = g(a), h = o.length;
                        while (h--) o[h] = "#" + k + " " + sa(o[h]);
                        r = o.join(","), s = $.test(a) && qa(b.parentNode) || b
                    }
                    if (r) try {
                        return G.apply(d, s.querySelectorAll(r)), d
                    } catch (x) {
                    } finally {
                        k === u && b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(P, "$1"), b, d, e)
        }

        function ha() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }

            return b
        }

        function ia(a) {
            return a[u] = !0, a
        }

        function ja(a) {
            var b = n.createElement("fieldset");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function ka(a, b) {
            var c = a.split("|"), e = c.length;
            while (e--) d.attrHandle[c[e]] = b
        }

        function la(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
            if (d) return d;
            if (c) while (c = c.nextSibling) if (c === b) return -1;
            return a ? 1 : -1
        }

        function ma(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function na(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function oa(a) {
            return function (b) {
                return "form" in b ? b.parentNode && b.disabled === !1 ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && ea(b) === a : b.disabled === a : "label" in b && b.disabled === a
            }
        }

        function pa(a) {
            return ia(function (b) {
                return b = +b, ia(function (c, d) {
                    var e, f = a([], c.length, b), g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function qa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }

        c = ga.support = {}, f = ga.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return !!b && "HTML" !== b.nodeName
        }, m = ga.setDocument = function (a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), v !== n && (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ja(function (a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = ja(function (a) {
                return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = Y.test(n.getElementsByClassName), c.getById = ja(function (a) {
                return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length
            }), c.getById ? (d.filter.ID = function (a) {
                var b = a.replace(_, aa);
                return function (a) {
                    return a.getAttribute("id") === b
                }
            }, d.find.ID = function (a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c ? [c] : []
                }
            }) : (d.filter.ID = function (a) {
                var b = a.replace(_, aa);
                return function (a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }, d.find.ID = function (a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c, d, e, f = b.getElementById(a);
                    if (f) {
                        if (c = f.getAttributeNode("id"), c && c.value === a) return [f];
                        e = b.getElementsByName(a), d = 0;
                        while (f = e[d++]) if (c = f.getAttributeNode("id"), c && c.value === a) return [f]
                    }
                    return []
                }
            }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
            } : function (a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
                if ("undefined" != typeof b.getElementsByClassName && p) return b.getElementsByClassName(a)
            }, r = [], q = [], (c.qsa = Y.test(n.querySelectorAll)) && (ja(function (a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + K + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + K + "*(?:value|" + J + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
            }), ja(function (a) {
                a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var b = n.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + K + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && q.push(":enabled", ":disabled"), o.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = Y.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
                c.disconnectedMatch = s.call(a, "*"), s.call(a, "[s!='']:x"), r.push("!=", N)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Y.test(o.compareDocumentPosition), t = b || Y.test(o.contains) ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function (a, b) {
                if (b) while (b = b.parentNode) if (b === a) return !0;
                return !1
            }, B = b ? function (a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? I(k, a) - I(k, b) : 0 : 4 & d ? -1 : 1)
            } : function (a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0, e = a.parentNode, f = b.parentNode, g = [a], h = [b];
                if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? I(k, a) - I(k, b) : 0;
                if (e === f) return la(a, b);
                c = a;
                while (c = c.parentNode) g.unshift(c);
                c = b;
                while (c = c.parentNode) h.unshift(c);
                while (g[d] === h[d]) d++;
                return d ? la(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0
            }, n) : n
        }, ga.matches = function (a, b) {
            return ga(a, null, null, b)
        }, ga.matchesSelector = function (a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(S, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {
            }
            return ga(b, n, null, [a]).length > 0
        }, ga.contains = function (a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b)
        }, ga.attr = function (a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, ga.escape = function (a) {
            return (a + "").replace(ba, ca)
        }, ga.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, ga.uniqueSort = function (a) {
            var b, d = [], e = 0, f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return k = null, a
        }, e = ga.getText = function (a) {
            var b, c = "", d = 0, f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                } else if (3 === f || 4 === f) return a.nodeValue
            } else while (b = a[d++]) c += e(b);
            return c
        }, d = ga.selectors = {
            cacheLength: 50,
            createPseudo: ia,
            match: V,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(_, aa), a[3] = (a[3] || a[4] || a[5] || "").replace(_, aa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                }, CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a
                }, PSEUDO: function (a) {
                    var b, c = !a[6] && a[2];
                    return V.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && T.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function (a) {
                    var b = a.replace(_, aa).toLowerCase();
                    return "*" === a ? function () {
                        return !0
                    } : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                }, CLASS: function (a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && y(a, function (a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                }, ATTR: function (a, b, c) {
                    return function (d) {
                        var e = ga.attr(d, a);
                        return null == e ? "!=" === b : !b || (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(O, " ") + " ").indexOf(c) > -1 : "|=" === b && (e === c || e.slice(0, c.length + 1) === c + "-"))
                    }
                }, CHILD: function (a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function (a) {
                        return !!a.parentNode
                    } : function (b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1;
                        if (q) {
                            if (f) {
                                while (p) {
                                    m = b;
                                    while (m = m[p]) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];
                                while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if (1 === m.nodeType && ++t && m === b) {
                                    k[a] = [w, n, t];
                                    break
                                }
                            } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
                            return t -= e, t === d || t % d === 0 && t / d >= 0
                        }
                    }
                }, PSEUDO: function (a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
                        var d, f = e(a, b), g = f.length;
                        while (g--) d = I(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function (a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: ia(function (a) {
                    var b = [], c = [], d = h(a.replace(P, "$1"));
                    return d[u] ? ia(function (a, b, c, e) {
                        var f, g = d(a, null, e, []), h = a.length;
                        while (h--) (f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function (a, e, f) {
                        return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                    }
                }), has: ia(function (a) {
                    return function (b) {
                        return ga(a, b).length > 0
                    }
                }), contains: ia(function (a) {
                    return a = a.replace(_, aa), function (b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                    }
                }), lang: ia(function (a) {
                    return U.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(_, aa).toLowerCase(), function (b) {
                        var c;
                        do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }), target: function (b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                }, root: function (a) {
                    return a === o
                }, focus: function (a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                }, enabled: oa(!1), disabled: oa(!0), checked: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                }, selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                }, empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0
                }, parent: function (a) {
                    return !d.pseudos.empty(a)
                }, header: function (a) {
                    return X.test(a.nodeName)
                }, input: function (a) {
                    return W.test(a.nodeName)
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                }, text: function (a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                }, first: pa(function () {
                    return [0]
                }), last: pa(function (a, b) {
                    return [b - 1]
                }), eq: pa(function (a, b, c) {
                    return [c < 0 ? c + b : c]
                }), even: pa(function (a, b) {
                    for (var c = 0; c < b; c += 2) a.push(c);
                    return a
                }), odd: pa(function (a, b) {
                    for (var c = 1; c < b; c += 2) a.push(c);
                    return a
                }), lt: pa(function (a, b, c) {
                    for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }), gt: pa(function (a, b, c) {
                    for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) d.pseudos[b] = ma(b);
        for (b in {submit: !0, reset: !0}) d.pseudos[b] = na(b);

        function ra() {
        }

        ra.prototype = d.filters = d.pseudos, d.setFilters = new ra, g = ga.tokenize = function (a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                c && !(e = Q.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(P, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? ga.error(a) : z(a, i).slice(0)
        };

        function sa(a) {
            for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
            return d
        }

        function ta(a, b, c) {
            var d = b.dir, e = b.next, f = e || d, g = c && "parentNode" === f, h = x++;
            return b.first ? function (b, c, e) {
                while (b = b[d]) if (1 === b.nodeType || g) return a(b, c, e);
                return !1
            } : function (b, c, i) {
                var j, k, l, m = [w, h];
                if (i) {
                    while (b = b[d]) if ((1 === b.nodeType || g) && a(b, c, i)) return !0
                } else while (b = b[d]) if (1 === b.nodeType || g) if (l = b[u] || (b[u] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b; else {
                    if ((j = k[f]) && j[0] === w && j[1] === h) return m[2] = j[2];
                    if (k[f] = m, m[2] = a(b, c, i)) return !0
                }
                return !1
            }
        }

        function ua(a) {
            return a.length > 1 ? function (b, c, d) {
                var e = a.length;
                while (e--) if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function va(a, b, c) {
            for (var d = 0, e = b.length; d < e; d++) ga(a, b[d], c);
            return c
        }

        function wa(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++) (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
            return g
        }

        function xa(a, b, c, d, e, f) {
            return d && !d[u] && (d = xa(d)), e && !e[u] && (e = xa(e, f)), ia(function (f, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = f || va(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : wa(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = wa(r, n), d(j, [], h, i), k = j.length;
                    while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--) (l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--) (l = r[k]) && (j = e ? I(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = wa(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r)
            })
        }

        function ya(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ta(function (a) {
                return a === b
            }, h, !0), l = ta(function (a) {
                return I(b, a) > -1
            }, h, !0), m = [function (a, c, d) {
                var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                return b = null, e
            }]; i < f; i++) if (c = d.relative[a[i].type]) m = [ta(ua(m), c)]; else {
                if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                    for (e = ++i; e < f; e++) if (d.relative[a[e].type]) break;
                    return xa(i > 1 && ua(m), i > 1 && sa(a.slice(0, i - 1).concat({value: " " === a[i - 2].type ? "*" : ""})).replace(P, "$1"), c, i < e && ya(a.slice(i, e)), e < f && ya(a = a.slice(e)), e < f && sa(a))
                }
                m.push(c)
            }
            return ua(m)
        }

        function za(a, b) {
            var c = b.length > 0, e = a.length > 0, f = function (f, g, h, i, k) {
                var l, o, q, r = 0, s = "0", t = f && [], u = [], v = j, x = f || e && d.find.TAG("*", k),
                    y = w += null == v ? 1 : Math.random() || .1, z = x.length;
                for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
                    if (e && l) {
                        o = 0, g || l.ownerDocument === n || (m(l), h = !p);
                        while (q = a[o++]) if (q(l, g || n, h)) {
                            i.push(l);
                            break
                        }
                        k && (w = y)
                    }
                    c && ((l = !q && l) && r--, f && t.push(l))
                }
                if (r += s, c && s !== r) {
                    o = 0;
                    while (q = b[o++]) q(t, u, g, h);
                    if (f) {
                        if (r > 0) while (s--) t[s] || u[s] || (u[s] = E.call(i));
                        u = wa(u)
                    }
                    G.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && ga.uniqueSort(i)
                }
                return k && (w = y, j = v), t
            };
            return c ? ia(f) : f
        }

        return h = ga.compile = function (a, b) {
            var c, d = [], e = [], f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--) f = ya(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, za(e, d)), f.selector = a
            }
            return f
        }, i = ga.select = function (a, b, c, e) {
            var f, i, j, k, l, m = "function" == typeof a && a, n = !e && g(a = m.selector || a);
            if (c = c || [], 1 === n.length) {
                if (i = n[0] = n[0].slice(0), i.length > 2 && "ID" === (j = i[0]).type && 9 === b.nodeType && p && d.relative[i[1].type]) {
                    if (b = (d.find.ID(j.matches[0].replace(_, aa), b) || [])[0], !b) return c;
                    m && (b = b.parentNode), a = a.slice(i.shift().value.length)
                }
                f = V.needsContext.test(a) ? 0 : i.length;
                while (f--) {
                    if (j = i[f], d.relative[k = j.type]) break;
                    if ((l = d.find[k]) && (e = l(j.matches[0].replace(_, aa), $.test(i[0].type) && qa(b.parentNode) || b))) {
                        if (i.splice(f, 1), a = e.length && sa(i), !a) return G.apply(c, e), c;
                        break
                    }
                }
            }
            return (m || h(a, n))(e, b, !p, c, !b || $.test(a) && qa(b.parentNode) || b), c
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) {
            return 1 & a.compareDocumentPosition(n.createElement("fieldset"))
        }), ja(function (a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || ka("type|href|height|width", function (a, b, c) {
            if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && ja(function (a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || ka("value", function (a, b, c) {
            if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
        }), ja(function (a) {
            return null == a.getAttribute("disabled")
        }) || ka(J, function (a, b, c) {
            var d;
            if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), ga
    }(a);
    r.find = x, r.expr = x.selectors, r.expr[":"] = r.expr.pseudos, r.uniqueSort = r.unique = x.uniqueSort, r.text = x.getText, r.isXMLDoc = x.isXML, r.contains = x.contains, r.escapeSelector = x.escape;
    var y = function (a, b, c) {
        var d = [], e = void 0 !== c;
        while ((a = a[b]) && 9 !== a.nodeType) if (1 === a.nodeType) {
            if (e && r(a).is(c)) break;
            d.push(a)
        }
        return d
    }, z = function (a, b) {
        for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
        return c
    }, A = r.expr.match.needsContext;

    function B(a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    }

    var C = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, D = /^.[^:#\[\.,]*$/;

    function E(a, b, c) {
        return r.isFunction(b) ? r.grep(a, function (a, d) {
            return !!b.call(a, d, a) !== c
        }) : b.nodeType ? r.grep(a, function (a) {
            return a === b !== c
        }) : "string" != typeof b ? r.grep(a, function (a) {
            return i.call(b, a) > -1 !== c
        }) : D.test(b) ? r.filter(b, a, c) : (b = r.filter(b, a), r.grep(a, function (a) {
            return i.call(b, a) > -1 !== c && 1 === a.nodeType
        }))
    }

    r.filter = function (a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? r.find.matchesSelector(d, a) ? [d] : [] : r.find.matches(a, r.grep(b, function (a) {
            return 1 === a.nodeType
        }))
    }, r.fn.extend({
        find: function (a) {
            var b, c, d = this.length, e = this;
            if ("string" != typeof a) return this.pushStack(r(a).filter(function () {
                for (b = 0; b < d; b++) if (r.contains(e[b], this)) return !0
            }));
            for (c = this.pushStack([]), b = 0; b < d; b++) r.find(a, e[b], c);
            return d > 1 ? r.uniqueSort(c) : c
        }, filter: function (a) {
            return this.pushStack(E(this, a || [], !1))
        }, not: function (a) {
            return this.pushStack(E(this, a || [], !0))
        }, is: function (a) {
            return !!E(this, "string" == typeof a && A.test(a) ? r(a) : a || [], !1).length
        }
    });
    var F, G = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, H = r.fn.init = function (a, b, c) {
        var e, f;
        if (!a) return this;
        if (c = c || F, "string" == typeof a) {
            if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : G.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
            if (e[1]) {
                if (b = b instanceof r ? b[0] : b, r.merge(this, r.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), C.test(e[1]) && r.isPlainObject(b)) for (e in b) r.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
                return this
            }
            return f = d.getElementById(e[2]), f && (this[0] = f, this.length = 1), this
        }
        return a.nodeType ? (this[0] = a, this.length = 1, this) : r.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(r) : r.makeArray(a, this)
    };
    H.prototype = r.fn, F = r(d);
    var I = /^(?:parents|prev(?:Until|All))/, J = {children: !0, contents: !0, next: !0, prev: !0};
    r.fn.extend({
        has: function (a) {
            var b = r(a, this), c = b.length;
            return this.filter(function () {
                for (var a = 0; a < c; a++) if (r.contains(this, b[a])) return !0
            })
        }, closest: function (a, b) {
            var c, d = 0, e = this.length, f = [], g = "string" != typeof a && r(a);
            if (!A.test(a)) for (; d < e; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && r.find.matchesSelector(c, a))) {
                f.push(c);
                break
            }
            return this.pushStack(f.length > 1 ? r.uniqueSort(f) : f)
        }, index: function (a) {
            return a ? "string" == typeof a ? i.call(r(a), this[0]) : i.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (a, b) {
            return this.pushStack(r.uniqueSort(r.merge(this.get(), r(a, b))))
        }, addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });

    function K(a, b) {
        while ((a = a[b]) && 1 !== a.nodeType) ;
        return a
    }

    r.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        }, parents: function (a) {
            return y(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return y(a, "parentNode", c)
        }, next: function (a) {
            return K(a, "nextSibling")
        }, prev: function (a) {
            return K(a, "previousSibling")
        }, nextAll: function (a) {
            return y(a, "nextSibling")
        }, prevAll: function (a) {
            return y(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return y(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return y(a, "previousSibling", c)
        }, siblings: function (a) {
            return z((a.parentNode || {}).firstChild, a)
        }, children: function (a) {
            return z(a.firstChild)
        }, contents: function (a) {
            return B(a, "iframe") ? a.contentDocument : (B(a, "template") && (a = a.content || a), r.merge([], a.childNodes))
        }
    }, function (a, b) {
        r.fn[a] = function (c, d) {
            var e = r.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = r.filter(d, e)), this.length > 1 && (J[a] || r.uniqueSort(e), I.test(a) && e.reverse()), this.pushStack(e)
        }
    });
    var L = /[^\x20\t\r\n\f]+/g;

    function M(a) {
        var b = {};
        return r.each(a.match(L) || [], function (a, c) {
            b[c] = !0
        }), b
    }

    r.Callbacks = function (a) {
        a = "string" == typeof a ? M(a) : r.extend({}, a);
        var b, c, d, e, f = [], g = [], h = -1, i = function () {
            for (e = e || a.once, d = b = !0; g.length; h = -1) {
                c = g.shift();
                while (++h < f.length) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1)
            }
            a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
        }, j = {
            add: function () {
                return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
                    r.each(b, function (b, c) {
                        r.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== r.type(c) && d(c)
                    })
                }(arguments), c && !b && i()), this
            }, remove: function () {
                return r.each(arguments, function (a, b) {
                    var c;
                    while ((c = r.inArray(b, f, c)) > -1) f.splice(c, 1), c <= h && h--
                }), this
            }, has: function (a) {
                return a ? r.inArray(a, f) > -1 : f.length > 0
            }, empty: function () {
                return f && (f = []), this
            }, disable: function () {
                return e = g = [], f = c = "", this
            }, disabled: function () {
                return !f
            }, lock: function () {
                return e = g = [], c || b || (f = c = ""), this
            }, locked: function () {
                return !!e
            }, fireWith: function (a, c) {
                return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this
            }, fire: function () {
                return j.fireWith(this, arguments), this
            }, fired: function () {
                return !!d
            }
        };
        return j
    };

    function N(a) {
        return a
    }

    function O(a) {
        throw a
    }

    function P(a, b, c, d) {
        var e;
        try {
            a && r.isFunction(e = a.promise) ? e.call(a).done(b).fail(c) : a && r.isFunction(e = a.then) ? e.call(a, b, c) : b.apply(void 0, [a].slice(d))
        } catch (a) {
            c.apply(void 0, [a])
        }
    }

    r.extend({
        Deferred: function (b) {
            var c = [["notify", "progress", r.Callbacks("memory"), r.Callbacks("memory"), 2], ["resolve", "done", r.Callbacks("once memory"), r.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", r.Callbacks("once memory"), r.Callbacks("once memory"), 1, "rejected"]],
                d = "pending", e = {
                    state: function () {
                        return d
                    }, always: function () {
                        return f.done(arguments).fail(arguments), this
                    }, "catch": function (a) {
                        return e.then(null, a)
                    }, pipe: function () {
                        var a = arguments;
                        return r.Deferred(function (b) {
                            r.each(c, function (c, d) {
                                var e = r.isFunction(a[d[4]]) && a[d[4]];
                                f[d[1]](function () {
                                    var a = e && e.apply(this, arguments);
                                    a && r.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    }, then: function (b, d, e) {
                        var f = 0;

                        function g(b, c, d, e) {
                            return function () {
                                var h = this, i = arguments, j = function () {
                                    var a, j;
                                    if (!(b < f)) {
                                        if (a = d.apply(h, i), a === c.promise()) throw new TypeError("Thenable self-resolution");
                                        j = a && ("object" == typeof a || "function" == typeof a) && a.then, r.isFunction(j) ? e ? j.call(a, g(f, c, N, e), g(f, c, O, e)) : (f++, j.call(a, g(f, c, N, e), g(f, c, O, e), g(f, c, N, c.notifyWith))) : (d !== N && (h = void 0, i = [a]), (e || c.resolveWith)(h, i))
                                    }
                                }, k = e ? j : function () {
                                    try {
                                        j()
                                    } catch (a) {
                                        r.Deferred.exceptionHook && r.Deferred.exceptionHook(a, k.stackTrace), b + 1 >= f && (d !== O && (h = void 0, i = [a]), c.rejectWith(h, i))
                                    }
                                };
                                b ? k() : (r.Deferred.getStackHook && (k.stackTrace = r.Deferred.getStackHook()), a.setTimeout(k))
                            }
                        }

                        return r.Deferred(function (a) {
                            c[0][3].add(g(0, a, r.isFunction(e) ? e : N, a.notifyWith)), c[1][3].add(g(0, a, r.isFunction(b) ? b : N)), c[2][3].add(g(0, a, r.isFunction(d) ? d : O))
                        }).promise()
                    }, promise: function (a) {
                        return null != a ? r.extend(a, e) : e
                    }
                }, f = {};
            return r.each(c, function (a, b) {
                var g = b[2], h = b[5];
                e[b[1]] = g.add, h && g.add(function () {
                    d = h
                }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function () {
                    return f[b[0] + "With"](this === f ? void 0 : this, arguments), this
                }, f[b[0] + "With"] = g.fireWith
            }), e.promise(f), b && b.call(f, f), f
        }, when: function (a) {
            var b = arguments.length, c = b, d = Array(c), e = f.call(arguments), g = r.Deferred(), h = function (a) {
                return function (c) {
                    d[a] = this, e[a] = arguments.length > 1 ? f.call(arguments) : c, --b || g.resolveWith(d, e)
                }
            };
            if (b <= 1 && (P(a, g.done(h(c)).resolve, g.reject, !b), "pending" === g.state() || r.isFunction(e[c] && e[c].then))) return g.then();
            while (c--) P(e[c], h(c), g.reject);
            return g.promise()
        }
    });
    var Q = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    r.Deferred.exceptionHook = function (b, c) {
        a.console && a.console.warn && b && Q.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c)
    }, r.readyException = function (b) {
        a.setTimeout(function () {
            throw b
        })
    };
    var R = r.Deferred();
    r.fn.ready = function (a) {
        return R.then(a)["catch"](function (a) {
            r.readyException(a)
        }), this
    }, r.extend({
        isReady: !1, readyWait: 1, ready: function (a) {
            (a === !0 ? --r.readyWait : r.isReady) || (r.isReady = !0, a !== !0 && --r.readyWait > 0 || R.resolveWith(d, [r]))
        }
    }), r.ready.then = R.then;

    function S() {
        d.removeEventListener("DOMContentLoaded", S),
            a.removeEventListener("load", S), r.ready()
    }

    "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(r.ready) : (d.addEventListener("DOMContentLoaded", S), a.addEventListener("load", S));
    var T = function (a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === r.type(c)) {
            e = !0;
            for (h in c) T(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, r.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
            return j.call(r(a), c)
        })), b)) for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    }, U = function (a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    };

    function V() {
        this.expando = r.expando + V.uid++
    }

    V.uid = 1, V.prototype = {
        cache: function (a) {
            var b = a[this.expando];
            return b || (b = {}, U(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                value: b,
                configurable: !0
            }))), b
        }, set: function (a, b, c) {
            var d, e = this.cache(a);
            if ("string" == typeof b) e[r.camelCase(b)] = c; else for (d in b) e[r.camelCase(d)] = b[d];
            return e
        }, get: function (a, b) {
            return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][r.camelCase(b)]
        }, access: function (a, b, c) {
            return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b)
        }, remove: function (a, b) {
            var c, d = a[this.expando];
            if (void 0 !== d) {
                if (void 0 !== b) {
                    Array.isArray(b) ? b = b.map(r.camelCase) : (b = r.camelCase(b), b = b in d ? [b] : b.match(L) || []), c = b.length;
                    while (c--) delete d[b[c]]
                }
                (void 0 === b || r.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
            }
        }, hasData: function (a) {
            var b = a[this.expando];
            return void 0 !== b && !r.isEmptyObject(b)
        }
    };
    var W = new V, X = new V, Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Z = /[A-Z]/g;

    function $(a) {
        return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : Y.test(a) ? JSON.parse(a) : a)
    }

    function _(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Z, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
            try {
                c = $(c)
            } catch (e) {
            }
            X.set(a, b, c)
        } else c = void 0;
        return c
    }

    r.extend({
        hasData: function (a) {
            return X.hasData(a) || W.hasData(a)
        }, data: function (a, b, c) {
            return X.access(a, b, c)
        }, removeData: function (a, b) {
            X.remove(a, b)
        }, _data: function (a, b, c) {
            return W.access(a, b, c)
        }, _removeData: function (a, b) {
            W.remove(a, b)
        }
    }), r.fn.extend({
        data: function (a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = X.get(f), 1 === f.nodeType && !W.get(f, "hasDataAttrs"))) {
                    c = g.length;
                    while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = r.camelCase(d.slice(5)), _(f, d, e[d])));
                    W.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function () {
                X.set(this, a)
            }) : T(this, function (b) {
                var c;
                if (f && void 0 === b) {
                    if (c = X.get(f, a), void 0 !== c) return c;
                    if (c = _(f, a), void 0 !== c) return c
                } else this.each(function () {
                    X.set(this, a, b)
                })
            }, null, b, arguments.length > 1, null, !0)
        }, removeData: function (a) {
            return this.each(function () {
                X.remove(this, a)
            })
        }
    }), r.extend({
        queue: function (a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = W.get(a, b), c && (!d || Array.isArray(c) ? d = W.access(a, b, r.makeArray(c)) : d.push(c)), d || []
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = r.queue(a, b), d = c.length, e = c.shift(), f = r._queueHooks(a, b), g = function () {
                r.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        }, _queueHooks: function (a, b) {
            var c = b + "queueHooks";
            return W.get(a, c) || W.access(a, c, {
                empty: r.Callbacks("once memory").add(function () {
                    W.remove(a, [b + "queue", c])
                })
            })
        }
    }), r.fn.extend({
        queue: function (a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? r.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                var c = r.queue(this, a, b);
                r._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && r.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                r.dequeue(this, a)
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, b) {
            var c, d = 1, e = r.Deferred(), f = this, g = this.length, h = function () {
                --d || e.resolveWith(f, [f])
            };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = W.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ba = new RegExp("^(?:([+-])=|)(" + aa + ")([a-z%]*)$", "i"),
        ca = ["Top", "Right", "Bottom", "Left"], da = function (a, b) {
            return a = b || a, "none" === a.style.display || "" === a.style.display && r.contains(a.ownerDocument, a) && "none" === r.css(a, "display")
        }, ea = function (a, b, c, d) {
            var e, f, g = {};
            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e
        };

    function fa(a, b, c, d) {
        var e, f = 1, g = 20, h = d ? function () {
                return d.cur()
            } : function () {
                return r.css(a, b, "")
            }, i = h(), j = c && c[3] || (r.cssNumber[b] ? "" : "px"),
            k = (r.cssNumber[b] || "px" !== j && +i) && ba.exec(r.css(a, b));
        if (k && k[3] !== j) {
            j = j || k[3], c = c || [], k = +i || 1;
            do f = f || ".5", k /= f, r.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
        }
        return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
    }

    var ga = {};

    function ha(a) {
        var b, c = a.ownerDocument, d = a.nodeName, e = ga[d];
        return e ? e : (b = c.body.appendChild(c.createElement(d)), e = r.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), ga[d] = e, e)
    }

    function ia(a, b) {
        for (var c, d, e = [], f = 0, g = a.length; f < g; f++) d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = W.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && da(d) && (e[f] = ha(d))) : "none" !== c && (e[f] = "none", W.set(d, "display", c)));
        for (f = 0; f < g; f++) null != e[f] && (a[f].style.display = e[f]);
        return a
    }

    r.fn.extend({
        show: function () {
            return ia(this, !0)
        }, hide: function () {
            return ia(this)
        }, toggle: function (a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                da(this) ? r(this).show() : r(this).hide()
            })
        }
    });
    var ja = /^(?:checkbox|radio)$/i, ka = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, la = /^$|\/(?:java|ecma)script/i, ma = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    ma.optgroup = ma.option, ma.tbody = ma.tfoot = ma.colgroup = ma.caption = ma.thead, ma.th = ma.td;

    function na(a, b) {
        var c;
        return c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && B(a, b) ? r.merge([a], c) : c
    }

    function oa(a, b) {
        for (var c = 0, d = a.length; c < d; c++) W.set(a[c], "globalEval", !b || W.get(b[c], "globalEval"))
    }

    var pa = /<|&#?\w+;/;

    function qa(a, b, c, d, e) {
        for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++) if (f = a[n], f || 0 === f) if ("object" === r.type(f)) r.merge(m, f.nodeType ? [f] : f); else if (pa.test(f)) {
            g = g || l.appendChild(b.createElement("div")), h = (ka.exec(f) || ["", ""])[1].toLowerCase(), i = ma[h] || ma._default, g.innerHTML = i[1] + r.htmlPrefilter(f) + i[2], k = i[0];
            while (k--) g = g.lastChild;
            r.merge(m, g.childNodes), g = l.firstChild, g.textContent = ""
        } else m.push(b.createTextNode(f));
        l.textContent = "", n = 0;
        while (f = m[n++]) if (d && r.inArray(f, d) > -1) e && e.push(f); else if (j = r.contains(f.ownerDocument, f), g = na(l.appendChild(f), "script"), j && oa(g), c) {
            k = 0;
            while (f = g[k++]) la.test(f.type || "") && c.push(f)
        }
        return l
    }

    !function () {
        var a = d.createDocumentFragment(), b = a.appendChild(d.createElement("div")), c = d.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), o.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", o.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var ra = d.documentElement, sa = /^key/, ta = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        ua = /^([^.]*)(?:\.(.+)|)/;

    function va() {
        return !0
    }

    function wa() {
        return !1
    }

    function xa() {
        try {
            return d.activeElement
        } catch (a) {
        }
    }

    function ya(a, b, c, d, e, f) {
        var g, h;
        if ("object" == typeof b) {
            "string" != typeof c && (d = d || c, c = void 0);
            for (h in b) ya(a, h, c, d, b[h], f);
            return a
        }
        if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = wa; else if (!e) return a;
        return 1 === f && (g = e, e = function (a) {
            return r().off(a), g.apply(this, arguments)
        }, e.guid = g.guid || (g.guid = r.guid++)), a.each(function () {
            r.event.add(this, b, e, d, c)
        })
    }

    r.event = {
        global: {}, add: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = W.get(a);
            if (q) {
                c.handler && (f = c, c = f.handler, e = f.selector), e && r.find.matchesSelector(ra, e), c.guid || (c.guid = r.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
                    return "undefined" != typeof r && r.event.triggered !== b.type ? r.event.dispatch.apply(a, arguments) : void 0
                }), b = (b || "").match(L) || [""], j = b.length;
                while (j--) h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = r.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = r.event.special[n] || {}, k = r.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && r.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), r.event.global[n] = !0)
            }
        }, remove: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = W.hasData(a) && W.get(a);
            if (q && (i = q.events)) {
                b = (b || "").match(L) || [""], j = b.length;
                while (j--) if (h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                    l = r.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
                    while (f--) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                    g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || r.removeEvent(a, n, q.handle), delete i[n])
                } else for (n in i) r.event.remove(a, n + b[j], c, d, !0);
                r.isEmptyObject(i) && W.remove(a, "handle events")
            }
        }, dispatch: function (a) {
            var b = r.event.fix(a), c, d, e, f, g, h, i = new Array(arguments.length),
                j = (W.get(this, "events") || {})[b.type] || [], k = r.event.special[b.type] || {};
            for (i[0] = b, c = 1; c < arguments.length; c++) i[c] = arguments[c];
            if (b.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, b) !== !1) {
                h = r.event.handlers.call(this, b, j), c = 0;
                while ((f = h[c++]) && !b.isPropagationStopped()) {
                    b.currentTarget = f.elem, d = 0;
                    while ((g = f.handlers[d++]) && !b.isImmediatePropagationStopped()) b.rnamespace && !b.rnamespace.test(g.namespace) || (b.handleObj = g, b.data = g.data, e = ((r.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (b.result = e) === !1 && (b.preventDefault(), b.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, b), b.result
            }
        }, handlers: function (a, b) {
            var c, d, e, f, g, h = [], i = b.delegateCount, j = a.target;
            if (i && j.nodeType && !("click" === a.type && a.button >= 1)) for (; j !== this; j = j.parentNode || this) if (1 === j.nodeType && ("click" !== a.type || j.disabled !== !0)) {
                for (f = [], g = {}, c = 0; c < i; c++) d = b[c], e = d.selector + " ", void 0 === g[e] && (g[e] = d.needsContext ? r(e, this).index(j) > -1 : r.find(e, this, null, [j]).length), g[e] && f.push(d);
                f.length && h.push({elem: j, handlers: f})
            }
            return j = this, i < b.length && h.push({elem: j, handlers: b.slice(i)}), h
        }, addProp: function (a, b) {
            Object.defineProperty(r.Event.prototype, a, {
                enumerable: !0,
                configurable: !0,
                get: r.isFunction(b) ? function () {
                    if (this.originalEvent) return b(this.originalEvent)
                } : function () {
                    if (this.originalEvent) return this.originalEvent[a]
                },
                set: function (b) {
                    Object.defineProperty(this, a, {enumerable: !0, configurable: !0, writable: !0, value: b})
                }
            })
        }, fix: function (a) {
            return a[r.expando] ? a : new r.Event(a)
        }, special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== xa() && this.focus) return this.focus(), !1
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    if (this === xa() && this.blur) return this.blur(), !1
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    if ("checkbox" === this.type && this.click && B(this, "input")) return this.click(), !1
                }, _default: function (a) {
                    return B(a.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        }
    }, r.removeEvent = function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c)
    }, r.Event = function (a, b) {
        return this instanceof r.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? va : wa, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && r.extend(this, b), this.timeStamp = a && a.timeStamp || r.now(), void (this[r.expando] = !0)) : new r.Event(a, b)
    }, r.Event.prototype = {
        constructor: r.Event,
        isDefaultPrevented: wa,
        isPropagationStopped: wa,
        isImmediatePropagationStopped: wa,
        isSimulated: !1,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = va, a && !this.isSimulated && a.preventDefault()
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = va, a && !this.isSimulated && a.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = va, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, r.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (a) {
            var b = a.button;
            return null == a.which && sa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && ta.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which
        }
    }, r.event.addProp), r.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (a, b) {
        r.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return e && (e === d || r.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), r.fn.extend({
        on: function (a, b, c, d) {
            return ya(this, a, b, c, d)
        }, one: function (a, b, c, d) {
            return ya(this, a, b, c, d, 1)
        }, off: function (a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, r(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = wa), this.each(function () {
                r.event.remove(this, a, c, b)
            })
        }
    });
    var za = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        Aa = /<script|<style|<link/i, Ba = /checked\s*(?:[^=]|=\s*.checked.)/i, Ca = /^true\/(.*)/,
        Da = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Ea(a, b) {
        return B(a, "table") && B(11 !== b.nodeType ? b : b.firstChild, "tr") ? r(">tbody", a)[0] || a : a
    }

    function Fa(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function Ga(a) {
        var b = Ca.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function Ha(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (W.hasData(a) && (f = W.access(a), g = W.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j) for (c = 0, d = j[e].length; c < d; c++) r.event.add(b, e, j[e][c])
            }
            X.hasData(a) && (h = X.access(a), i = r.extend({}, h), X.set(b, i))
        }
    }

    function Ia(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && ja.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
    }

    function Ja(a, b, c, d) {
        b = g.apply([], b);
        var e, f, h, i, j, k, l = 0, m = a.length, n = m - 1, q = b[0], s = r.isFunction(q);
        if (s || m > 1 && "string" == typeof q && !o.checkClone && Ba.test(q)) return a.each(function (e) {
            var f = a.eq(e);
            s && (b[0] = q.call(this, e, f.html())), Ja(f, b, c, d)
        });
        if (m && (e = qa(b, a[0].ownerDocument, !1, a, d), f = e.firstChild, 1 === e.childNodes.length && (e = f), f || d)) {
            for (h = r.map(na(e, "script"), Fa), i = h.length; l < m; l++) j = e, l !== n && (j = r.clone(j, !0, !0), i && r.merge(h, na(j, "script"))), c.call(a[l], j, l);
            if (i) for (k = h[h.length - 1].ownerDocument, r.map(h, Ga), l = 0; l < i; l++) j = h[l], la.test(j.type || "") && !W.access(j, "globalEval") && r.contains(k, j) && (j.src ? r._evalUrl && r._evalUrl(j.src) : p(j.textContent.replace(Da, ""), k))
        }
        return a
    }

    function Ka(a, b, c) {
        for (var d, e = b ? r.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || r.cleanData(na(d)), d.parentNode && (c && r.contains(d.ownerDocument, d) && oa(na(d, "script")), d.parentNode.removeChild(d));
        return a
    }

    r.extend({
        htmlPrefilter: function (a) {
            return a.replace(za, "<$1><$2>")
        }, clone: function (a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0), i = r.contains(a.ownerDocument, a);
            if (!(o.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || r.isXMLDoc(a))) for (g = na(h), f = na(a), d = 0, e = f.length; d < e; d++) Ia(f[d], g[d]);
            if (b) if (c) for (f = f || na(a), g = g || na(h), d = 0, e = f.length; d < e; d++) Ha(f[d], g[d]); else Ha(a, h);
            return g = na(h, "script"), g.length > 0 && oa(g, !i && na(a, "script")), h
        }, cleanData: function (a) {
            for (var b, c, d, e = r.event.special, f = 0; void 0 !== (c = a[f]); f++) if (U(c)) {
                if (b = c[W.expando]) {
                    if (b.events) for (d in b.events) e[d] ? r.event.remove(c, d) : r.removeEvent(c, d, b.handle);
                    c[W.expando] = void 0
                }
                c[X.expando] && (c[X.expando] = void 0)
            }
        }
    }), r.fn.extend({
        detach: function (a) {
            return Ka(this, a, !0)
        }, remove: function (a) {
            return Ka(this, a)
        }, text: function (a) {
            return T(this, function (a) {
                return void 0 === a ? r.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                })
            }, null, a, arguments.length)
        }, append: function () {
            return Ja(this, arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ea(this, a);
                    b.appendChild(a)
                }
            })
        }, prepend: function () {
            return Ja(this, arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ea(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        }, before: function () {
            return Ja(this, arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        }, after: function () {
            return Ja(this, arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        }, empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (r.cleanData(na(a, !1)), a.textContent = "");
            return this
        }, clone: function (a, b) {
            return a = null != a && a, b = null == b ? a : b, this.map(function () {
                return r.clone(this, a, b)
            })
        }, html: function (a) {
            return T(this, function (a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !Aa.test(a) && !ma[(ka.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = r.htmlPrefilter(a);
                    try {
                        for (; c < d; c++) b = this[c] || {}, 1 === b.nodeType && (r.cleanData(na(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {
                    }
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function () {
            var a = [];
            return Ja(this, arguments, function (b) {
                var c = this.parentNode;
                r.inArray(this, a) < 0 && (r.cleanData(na(this)), c && c.replaceChild(b, this))
            }, a)
        }
    }), r.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        r.fn[a] = function (a) {
            for (var c, d = [], e = r(a), f = e.length - 1, g = 0; g <= f; g++) c = g === f ? this : this.clone(!0), r(e[g])[b](c), h.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var La = /^margin/, Ma = new RegExp("^(" + aa + ")(?!px)[a-z%]+$", "i"), Na = function (b) {
        var c = b.ownerDocument.defaultView;
        return c && c.opener || (c = a), c.getComputedStyle(b)
    };
    !function () {
        function b() {
            if (i) {
                i.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i.innerHTML = "", ra.appendChild(h);
                var b = a.getComputedStyle(i);
                c = "1%" !== b.top, g = "2px" === b.marginLeft, e = "4px" === b.width, i.style.marginRight = "50%", f = "4px" === b.marginRight, ra.removeChild(h), i = null
            }
        }

        var c, e, f, g, h = d.createElement("div"), i = d.createElement("div");
        i.style && (i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", o.clearCloneStyle = "content-box" === i.style.backgroundClip, h.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", h.appendChild(i), r.extend(o, {
            pixelPosition: function () {
                return b(), c
            }, boxSizingReliable: function () {
                return b(), e
            }, pixelMarginRight: function () {
                return b(), f
            }, reliableMarginLeft: function () {
                return b(), g
            }
        }))
    }();

    function Oa(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Na(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || r.contains(a.ownerDocument, a) || (g = r.style(a, b)), !o.pixelMarginRight() && Ma.test(g) && La.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function Pa(a, b) {
        return {
            get: function () {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    var Qa = /^(none|table(?!-c[ea]).+)/, Ra = /^--/,
        Sa = {position: "absolute", visibility: "hidden", display: "block"},
        Ta = {letterSpacing: "0", fontWeight: "400"}, Ua = ["Webkit", "Moz", "ms"], Va = d.createElement("div").style;

    function Wa(a) {
        if (a in Va) return a;
        var b = a[0].toUpperCase() + a.slice(1), c = Ua.length;
        while (c--) if (a = Ua[c] + b, a in Va) return a
    }

    function Xa(a) {
        var b = r.cssProps[a];
        return b || (b = r.cssProps[a] = Wa(a) || a), b
    }

    function Ya(a, b, c) {
        var d = ba.exec(b);
        return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
    }

    function Za(a, b, c, d, e) {
        var f, g = 0;
        for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2) "margin" === c && (g += r.css(a, c + ca[f], !0, e)), d ? ("content" === c && (g -= r.css(a, "padding" + ca[f], !0, e)), "margin" !== c && (g -= r.css(a, "border" + ca[f] + "Width", !0, e))) : (g += r.css(a, "padding" + ca[f], !0, e), "padding" !== c && (g += r.css(a, "border" + ca[f] + "Width", !0, e)));
        return g
    }

    function $a(a, b, c) {
        var d, e = Na(a), f = Oa(a, b, e), g = "border-box" === r.css(a, "boxSizing", !1, e);
        return Ma.test(f) ? f : (d = g && (o.boxSizingReliable() || f === a.style[b]), "auto" === f && (f = a["offset" + b[0].toUpperCase() + b.slice(1)]), f = parseFloat(f) || 0, f + Za(a, b, c || (g ? "border" : "content"), d, e) + "px")
    }

    r.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = Oa(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": "cssFloat"},
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = r.camelCase(b), i = Ra.test(b), j = a.style;
                return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : j[b] : (f = typeof c, "string" === f && (e = ba.exec(c)) && e[1] && (c = fa(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (r.cssNumber[h] ? "" : "px")), o.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (j[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i ? j.setProperty(b, c) : j[b] = c)), void 0)
            }
        },
        css: function (a, b, c, d) {
            var e, f, g, h = r.camelCase(b), i = Ra.test(b);
            return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Oa(a, b, d)), "normal" === e && b in Ta && (e = Ta[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e
        }
    }), r.each(["height", "width"], function (a, b) {
        r.cssHooks[b] = {
            get: function (a, c, d) {
                if (c) return !Qa.test(r.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? $a(a, b, d) : ea(a, Sa, function () {
                    return $a(a, b, d)
                })
            }, set: function (a, c, d) {
                var e, f = d && Na(a), g = d && Za(a, b, d, "border-box" === r.css(a, "boxSizing", !1, f), f);
                return g && (e = ba.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = r.css(a, b)), Ya(a, c, g)
            }
        }
    }), r.cssHooks.marginLeft = Pa(o.reliableMarginLeft, function (a, b) {
        if (b) return (parseFloat(Oa(a, "marginLeft")) || a.getBoundingClientRect().left - ea(a, {marginLeft: 0}, function () {
            return a.getBoundingClientRect().left
        })) + "px"
    }), r.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        r.cssHooks[a + b] = {
            expand: function (c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + ca[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, La.test(a) || (r.cssHooks[a + b].set = Ya)
    }), r.fn.extend({
        css: function (a, b) {
            return T(this, function (a, b, c) {
                var d, e, f = {}, g = 0;
                if (Array.isArray(b)) {
                    for (d = Na(a), e = b.length; g < e; g++) f[b[g]] = r.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? r.style(a, b, c) : r.css(a, b)
            }, a, b, arguments.length > 1)
        }
    });

    function _a(a, b, c, d, e) {
        return new _a.prototype.init(a, b, c, d, e)
    }

    r.Tween = _a, _a.prototype = {
        constructor: _a, init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || r.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (r.cssNumber[c] ? "" : "px")
        }, cur: function () {
            var a = _a.propHooks[this.prop];
            return a && a.get ? a.get(this) : _a.propHooks._default.get(this)
        }, run: function (a) {
            var b, c = _a.propHooks[this.prop];
            return this.options.duration ? this.pos = b = r.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : _a.propHooks._default.set(this), this
        }
    }, _a.prototype.init.prototype = _a.prototype, _a.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = r.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
            }, set: function (a) {
                r.fx.step[a.prop] ? r.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[r.cssProps[a.prop]] && !r.cssHooks[a.prop] ? a.elem[a.prop] = a.now : r.style(a.elem, a.prop, a.now + a.unit)
            }
        }
    }, _a.propHooks.scrollTop = _a.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, r.easing = {
        linear: function (a) {
            return a
        }, swing: function (a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }, _default: "swing"
    }, r.fx = _a.prototype.init, r.fx.step = {};
    var ab, bb, cb = /^(?:toggle|show|hide)$/, db = /queueHooks$/;

    function eb() {
        bb && (d.hidden === !1 && a.requestAnimationFrame ? a.requestAnimationFrame(eb) : a.setTimeout(eb, r.fx.interval), r.fx.tick())
    }

    function fb() {
        return a.setTimeout(function () {
            ab = void 0
        }), ab = r.now()
    }

    function gb(a, b) {
        var c, d = 0, e = {height: a};
        for (b = b ? 1 : 0; d < 4; d += 2 - b) c = ca[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function hb(a, b, c) {
        for (var d, e = (kb.tweeners[b] || []).concat(kb.tweeners["*"]), f = 0, g = e.length; f < g; f++) if (d = e[f].call(c, b, a)) return d
    }

    function ib(a, b, c) {
        var d, e, f, g, h, i, j, k, l = "width" in b || "height" in b, m = this, n = {}, o = a.style,
            p = a.nodeType && da(a), q = W.get(a, "fxshow");
        c.queue || (g = r._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function () {
            g.unqueued || h()
        }), g.unqueued++, m.always(function () {
            m.always(function () {
                g.unqueued--, r.queue(a, "fx").length || g.empty.fire()
            })
        }));
        for (d in b) if (e = b[d], cb.test(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                if ("show" !== e || !q || void 0 === q[d]) continue;
                p = !0
            }
            n[d] = q && q[d] || r.style(a, d)
        }
        if (i = !r.isEmptyObject(b), i || !r.isEmptyObject(n)) {
            l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = q && q.display, null == j && (j = W.get(a, "display")), k = r.css(a, "display"), "none" === k && (j ? k = j : (ia([a], !0), j = a.style.display || j, k = r.css(a, "display"), ia([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === r.css(a, "float") && (i || (m.done(function () {
                o.display = j
            }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function () {
                o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
            })), i = !1;
            for (d in n) i || (q ? "hidden" in q && (p = q.hidden) : q = W.access(a, "fxshow", {display: j}), f && (q.hidden = !p), p && ia([a], !0), m.done(function () {
                p || ia([a]), W.remove(a, "fxshow");
                for (d in n) r.style(a, d, n[d])
            })), i = hb(p ? q[d] : 0, d, m), d in q || (q[d] = i.start, p && (i.end = i.start, i.start = 0))
        }
    }

    function jb(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = r.camelCase(c), e = b[d], f = a[c], Array.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = r.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }

    function kb(a, b, c) {
        var d, e, f = 0, g = kb.prefilters.length, h = r.Deferred().always(function () {
            delete i.elem
        }), i = function () {
            if (e) return !1;
            for (var b = ab || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (i || h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j]), !1)
        }, j = h.promise({
            elem: a,
            props: r.extend({}, b),
            opts: r.extend(!0, {specialEasing: {}, easing: r.easing._default}, c),
            originalProperties: b,
            originalOptions: c,
            startTime: ab || fb(),
            duration: c.duration,
            tweens: [],
            createTween: function (b, c) {
                var d = r.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d
            },
            stop: function (b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; c < d; c++) j.tweens[c].run(1);
                return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
            }
        }), k = j.props;
        for (jb(k, j.opts.specialEasing); f < g; f++) if (d = kb.prefilters[f].call(j, a, k, j.opts)) return r.isFunction(d.stop) && (r._queueHooks(j.elem, j.opts.queue).stop = r.proxy(d.stop, d)), d;
        return r.map(k, hb, j), r.isFunction(j.opts.start) && j.opts.start.call(a, j), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always), r.fx.timer(r.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j
    }

    r.Animation = r.extend(kb, {
        tweeners: {
            "*": [function (a, b) {
                var c = this.createTween(a, b);
                return fa(c.elem, a, ba.exec(b), c), c
            }]
        }, tweener: function (a, b) {
            r.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(L);
            for (var c, d = 0, e = a.length; d < e; d++) c = a[d], kb.tweeners[c] = kb.tweeners[c] || [], kb.tweeners[c].unshift(b)
        }, prefilters: [ib], prefilter: function (a, b) {
            b ? kb.prefilters.unshift(a) : kb.prefilters.push(a)
        }
    }), r.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? r.extend({}, a) : {
            complete: c || !c && b || r.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !r.isFunction(b) && b
        };
        return r.fx.off ? d.duration = 0 : "number" != typeof d.duration && (d.duration in r.fx.speeds ? d.duration = r.fx.speeds[d.duration] : d.duration = r.fx.speeds._default), null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
            r.isFunction(d.old) && d.old.call(this), d.queue && r.dequeue(this, d.queue)
        }, d
    }, r.fn.extend({
        fadeTo: function (a, b, c, d) {
            return this.filter(da).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            var e = r.isEmptyObject(a), f = r.speed(b, c, d), g = function () {
                var b = kb(this, r.extend({}, a), f);
                (e || W.get(this, "finish")) && b.stop(!0)
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        }, stop: function (a, b, c) {
            var d = function (a) {
                var b = a.stop;
                delete a.stop, b(c)
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                var b = !0, e = null != a && a + "queueHooks", f = r.timers, g = W.get(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && db.test(e) && d(g[e]);
                for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                !b && c || r.dequeue(this, a)
            })
        }, finish: function (a) {
            return a !== !1 && (a = a || "fx"), this.each(function () {
                var b, c = W.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = r.timers, g = d ? d.length : 0;
                for (c.finish = !0, r.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }), r.each(["toggle", "show", "hide"], function (a, b) {
        var c = r.fn[b];
        r.fn[b] = function (a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e)
        }
    }), r.each({
        slideDown: gb("show"),
        slideUp: gb("hide"),
        slideToggle: gb("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        r.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), r.timers = [], r.fx.tick = function () {
        var a, b = 0, c = r.timers;
        for (ab = r.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
        c.length || r.fx.stop(), ab = void 0
    }, r.fx.timer = function (a) {
        r.timers.push(a), r.fx.start()
    }, r.fx.interval = 13, r.fx.start = function () {
        bb || (bb = !0, eb())
    }, r.fx.stop = function () {
        bb = null
    }, r.fx.speeds = {slow: 600, fast: 200, _default: 400}, r.fn.delay = function (b, c) {
        return b = r.fx ? r.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
            var e = a.setTimeout(c, b);
            d.stop = function () {
                a.clearTimeout(e)
            }
        })
    }, function () {
        var a = d.createElement("input"), b = d.createElement("select"), c = b.appendChild(d.createElement("option"));
        a.type = "checkbox", o.checkOn = "" !== a.value, o.optSelected = c.selected, a = d.createElement("input"), a.value = "t", a.type = "radio", o.radioValue = "t" === a.value
    }();
    var lb, mb = r.expr.attrHandle;
    r.fn.extend({
        attr: function (a, b) {
            return T(this, r.attr, a, b, arguments.length > 1)
        }, removeAttr: function (a) {
            return this.each(function () {
                r.removeAttr(this, a)
            })
        }
    }), r.extend({
        attr: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? r.prop(a, b, c) : (1 === f && r.isXMLDoc(a) || (e = r.attrHooks[b.toLowerCase()] || (r.expr.match.bool.test(b) ? lb : void 0)), void 0 !== c ? null === c ? void r.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = r.find.attr(a, b),
                null == d ? void 0 : d))
        }, attrHooks: {
            type: {
                set: function (a, b) {
                    if (!o.radioValue && "radio" === b && B(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }, removeAttr: function (a, b) {
            var c, d = 0, e = b && b.match(L);
            if (e && 1 === a.nodeType) while (c = e[d++]) a.removeAttribute(c)
        }
    }), lb = {
        set: function (a, b, c) {
            return b === !1 ? r.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    }, r.each(r.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = mb[b] || r.find.attr;
        mb[b] = function (a, b, d) {
            var e, f, g = b.toLowerCase();
            return d || (f = mb[g], mb[g] = e, e = null != c(a, b, d) ? g : null, mb[g] = f), e
        }
    });
    var nb = /^(?:input|select|textarea|button)$/i, ob = /^(?:a|area)$/i;
    r.fn.extend({
        prop: function (a, b) {
            return T(this, r.prop, a, b, arguments.length > 1)
        }, removeProp: function (a) {
            return this.each(function () {
                delete this[r.propFix[a] || a]
            })
        }
    }), r.extend({
        prop: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return 1 === f && r.isXMLDoc(a) || (b = r.propFix[b] || b, e = r.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        }, propHooks: {
            tabIndex: {
                get: function (a) {
                    var b = r.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : nb.test(a.nodeName) || ob.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }, propFix: {"for": "htmlFor", "class": "className"}
    }), o.optSelected || (r.propHooks.selected = {
        get: function (a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        }, set: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
        }
    }), r.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        r.propFix[this.toLowerCase()] = this
    });

    function pb(a) {
        var b = a.match(L) || [];
        return b.join(" ")
    }

    function qb(a) {
        return a.getAttribute && a.getAttribute("class") || ""
    }

    r.fn.extend({
        addClass: function (a) {
            var b, c, d, e, f, g, h, i = 0;
            if (r.isFunction(a)) return this.each(function (b) {
                r(this).addClass(a.call(this, b, qb(this)))
            });
            if ("string" == typeof a && a) {
                b = a.match(L) || [];
                while (c = this[i++]) if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
                    g = 0;
                    while (f = b[g++]) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                    h = pb(d), e !== h && c.setAttribute("class", h)
                }
            }
            return this
        }, removeClass: function (a) {
            var b, c, d, e, f, g, h, i = 0;
            if (r.isFunction(a)) return this.each(function (b) {
                r(this).removeClass(a.call(this, b, qb(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof a && a) {
                b = a.match(L) || [];
                while (c = this[i++]) if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
                    g = 0;
                    while (f = b[g++]) while (d.indexOf(" " + f + " ") > -1) d = d.replace(" " + f + " ", " ");
                    h = pb(d), e !== h && c.setAttribute("class", h)
                }
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : r.isFunction(a) ? this.each(function (c) {
                r(this).toggleClass(a.call(this, c, qb(this), b), b)
            }) : this.each(function () {
                var b, d, e, f;
                if ("string" === c) {
                    d = 0, e = r(this), f = a.match(L) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else void 0 !== a && "boolean" !== c || (b = qb(this), b && W.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : W.get(this, "__className__") || ""))
            })
        }, hasClass: function (a) {
            var b, c, d = 0;
            b = " " + a + " ";
            while (c = this[d++]) if (1 === c.nodeType && (" " + pb(qb(c)) + " ").indexOf(b) > -1) return !0;
            return !1
        }
    });
    var rb = /\r/g;
    r.fn.extend({
        val: function (a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length) return d = r.isFunction(a), this.each(function (c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, r(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = r.map(e, function (a) {
                        return null == a ? "" : a + ""
                    })), b = r.valHooks[this.type] || r.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = r.valHooks[e.type] || r.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c)
            }
        }
    }), r.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = r.find.attr(a, "value");
                    return null != b ? b : pb(r.text(a))
                }
            }, select: {
                get: function (a) {
                    var b, c, d, e = a.options, f = a.selectedIndex, g = "select-one" === a.type, h = g ? null : [],
                        i = g ? f + 1 : e.length;
                    for (d = f < 0 ? i : g ? f : 0; d < i; d++) if (c = e[d], (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !B(c.parentNode, "optgroup"))) {
                        if (b = r(c).val(), g) return b;
                        h.push(b)
                    }
                    return h
                }, set: function (a, b) {
                    var c, d, e = a.options, f = r.makeArray(b), g = e.length;
                    while (g--) d = e[g], (d.selected = r.inArray(r.valHooks.option.get(d), f) > -1) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        }
    }), r.each(["radio", "checkbox"], function () {
        r.valHooks[this] = {
            set: function (a, b) {
                if (Array.isArray(b)) return a.checked = r.inArray(r(a).val(), b) > -1
            }
        }, o.checkOn || (r.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var sb = /^(?:focusinfocus|focusoutblur)$/;
    r.extend(r.event, {
        trigger: function (b, c, e, f) {
            var g, h, i, j, k, m, n, o = [e || d], p = l.call(b, "type") ? b.type : b,
                q = l.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !sb.test(p + r.event.triggered) && (p.indexOf(".") > -1 && (q = p.split("."), p = q.shift(), q.sort()), k = p.indexOf(":") < 0 && "on" + p, b = b[r.expando] ? b : new r.Event(p, "object" == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = q.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : r.makeArray(c, [b]), n = r.event.special[p] || {}, f || !n.trigger || n.trigger.apply(e, c) !== !1)) {
                if (!f && !n.noBubble && !r.isWindow(e)) {
                    for (j = n.delegateType || p, sb.test(j + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), i = h;
                    i === (e.ownerDocument || d) && o.push(i.defaultView || i.parentWindow || a)
                }
                g = 0;
                while ((h = o[g++]) && !b.isPropagationStopped()) b.type = g > 1 ? j : n.bindType || p, m = (W.get(h, "events") || {})[b.type] && W.get(h, "handle"), m && m.apply(h, c), m = k && h[k], m && m.apply && U(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
                return b.type = p, f || b.isDefaultPrevented() || n._default && n._default.apply(o.pop(), c) !== !1 || !U(e) || k && r.isFunction(e[p]) && !r.isWindow(e) && (i = e[k], i && (e[k] = null), r.event.triggered = p, e[p](), r.event.triggered = void 0, i && (e[k] = i)), b.result
            }
        }, simulate: function (a, b, c) {
            var d = r.extend(new r.Event, c, {type: a, isSimulated: !0});
            r.event.trigger(d, null, b)
        }
    }), r.fn.extend({
        trigger: function (a, b) {
            return this.each(function () {
                r.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            var c = this[0];
            if (c) return r.event.trigger(a, b, c, !0)
        }
    }), r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) {
        r.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), r.fn.extend({
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), o.focusin = "onfocusin" in a, o.focusin || r.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var c = function (a) {
            r.event.simulate(b, a.target, r.event.fix(a))
        };
        r.event.special[b] = {
            setup: function () {
                var d = this.ownerDocument || this, e = W.access(d, b);
                e || d.addEventListener(a, c, !0), W.access(d, b, (e || 0) + 1)
            }, teardown: function () {
                var d = this.ownerDocument || this, e = W.access(d, b) - 1;
                e ? W.access(d, b, e) : (d.removeEventListener(a, c, !0), W.remove(d, b))
            }
        }
    });
    var tb = a.location, ub = r.now(), vb = /\?/;
    r.parseXML = function (b) {
        var c;
        if (!b || "string" != typeof b) return null;
        try {
            c = (new a.DOMParser).parseFromString(b, "text/xml")
        } catch (d) {
            c = void 0
        }
        return c && !c.getElementsByTagName("parsererror").length || r.error("Invalid XML: " + b), c
    };
    var wb = /\[\]$/, xb = /\r?\n/g, yb = /^(?:submit|button|image|reset|file)$/i,
        zb = /^(?:input|select|textarea|keygen)/i;

    function Ab(a, b, c, d) {
        var e;
        if (Array.isArray(b)) r.each(b, function (b, e) {
            c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
        }); else if (c || "object" !== r.type(b)) d(a, b); else for (e in b) Ab(a + "[" + e + "]", b[e], c, d)
    }

    r.param = function (a, b) {
        var c, d = [], e = function (a, b) {
            var c = r.isFunction(b) ? b() : b;
            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c)
        };
        if (Array.isArray(a) || a.jquery && !r.isPlainObject(a)) r.each(a, function () {
            e(this.name, this.value)
        }); else for (c in a) Ab(c, a[c], b, e);
        return d.join("&")
    }, r.fn.extend({
        serialize: function () {
            return r.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var a = r.prop(this, "elements");
                return a ? r.makeArray(a) : this
            }).filter(function () {
                var a = this.type;
                return this.name && !r(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !ja.test(a))
            }).map(function (a, b) {
                var c = r(this).val();
                return null == c ? null : Array.isArray(c) ? r.map(c, function (a) {
                    return {name: b.name, value: a.replace(xb, "\r\n")}
                }) : {name: b.name, value: c.replace(xb, "\r\n")}
            }).get()
        }
    });
    var Bb = /%20/g, Cb = /#.*$/, Db = /([?&])_=[^&]*/, Eb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Fb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Gb = /^(?:GET|HEAD)$/, Hb = /^\/\//, Ib = {},
        Jb = {}, Kb = "*/".concat("*"), Lb = d.createElement("a");
    Lb.href = tb.href;

    function Mb(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(L) || [];
            if (r.isFunction(c)) while (d = f[e++]) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function Nb(a, b, c, d) {
        var e = {}, f = a === Jb;

        function g(h) {
            var i;
            return e[h] = !0, r.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }

        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function Ob(a, b) {
        var c, d, e = r.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && r.extend(!0, a, d), a
    }

    function Pb(a, b, c) {
        var d, e, f, g, h = a.contents, i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d) for (e in h) if (h[e] && h[e].test(d)) {
            i.unshift(e);
            break
        }
        if (i[0] in c) f = i[0]; else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        if (f) return f !== i[0] && i.unshift(f), c[f]
    }

    function Qb(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break
            }
            if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                b = g(b)
            } catch (l) {
                return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
            }
        }
        return {state: "success", data: b}
    }

    r.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: tb.href,
            type: "GET",
            isLocal: Fb.test(tb.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Kb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": JSON.parse, "text xml": r.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (a, b) {
            return b ? Ob(Ob(a, r.ajaxSettings), b) : Ob(r.ajaxSettings, a)
        },
        ajaxPrefilter: Mb(Ib),
        ajaxTransport: Mb(Jb),
        ajax: function (b, c) {
            "object" == typeof b && (c = b, b = void 0), c = c || {};
            var e, f, g, h, i, j, k, l, m, n, o = r.ajaxSetup({}, c), p = o.context || o,
                q = o.context && (p.nodeType || p.jquery) ? r(p) : r.event, s = r.Deferred(),
                t = r.Callbacks("once memory"), u = o.statusCode || {}, v = {}, w = {}, x = "canceled", y = {
                    readyState: 0, getResponseHeader: function (a) {
                        var b;
                        if (k) {
                            if (!h) {
                                h = {};
                                while (b = Eb.exec(g)) h[b[1].toLowerCase()] = b[2]
                            }
                            b = h[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    }, getAllResponseHeaders: function () {
                        return k ? g : null
                    }, setRequestHeader: function (a, b) {
                        return null == k && (a = w[a.toLowerCase()] = w[a.toLowerCase()] || a, v[a] = b), this
                    }, overrideMimeType: function (a) {
                        return null == k && (o.mimeType = a), this
                    }, statusCode: function (a) {
                        var b;
                        if (a) if (k) y.always(a[y.status]); else for (b in a) u[b] = [u[b], a[b]];
                        return this
                    }, abort: function (a) {
                        var b = a || x;
                        return e && e.abort(b), A(0, b), this
                    }
                };
            if (s.promise(y), o.url = ((b || o.url || tb.href) + "").replace(Hb, tb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(L) || [""], null == o.crossDomain) {
                j = d.createElement("a");
                try {
                    j.href = o.url, j.href = j.href, o.crossDomain = Lb.protocol + "//" + Lb.host != j.protocol + "//" + j.host
                } catch (z) {
                    o.crossDomain = !0
                }
            }
            if (o.data && o.processData && "string" != typeof o.data && (o.data = r.param(o.data, o.traditional)), Nb(Ib, o, c, y), k) return y;
            l = r.event && o.global, l && 0 === r.active++ && r.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Gb.test(o.type), f = o.url.replace(Cb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Bb, "+")) : (n = o.url.slice(f.length), o.data && (f += (vb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(Db, "$1"), n = (vb.test(f) ? "&" : "?") + "_=" + ub++ + n), o.url = f + n), o.ifModified && (r.lastModified[f] && y.setRequestHeader("If-Modified-Since", r.lastModified[f]), r.etag[f] && y.setRequestHeader("If-None-Match", r.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", o.contentType), y.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Kb + "; q=0.01" : "") : o.accepts["*"]);
            for (m in o.headers) y.setRequestHeader(m, o.headers[m]);
            if (o.beforeSend && (o.beforeSend.call(p, y, o) === !1 || k)) return y.abort();
            if (x = "abort", t.add(o.complete), y.done(o.success), y.fail(o.error), e = Nb(Jb, o, c, y)) {
                if (y.readyState = 1, l && q.trigger("ajaxSend", [y, o]), k) return y;
                o.async && o.timeout > 0 && (i = a.setTimeout(function () {
                    y.abort("timeout")
                }, o.timeout));
                try {
                    k = !1, e.send(v, A)
                } catch (z) {
                    if (k) throw z;
                    A(-1, z)
                }
            } else A(-1, "No Transport");

            function A(b, c, d, h) {
                var j, m, n, v, w, x = c;
                k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", y.readyState = b > 0 ? 4 : 0, j = b >= 200 && b < 300 || 304 === b, d && (v = Pb(o, y, d)), v = Qb(o, v, y, j), j ? (o.ifModified && (w = y.getResponseHeader("Last-Modified"), w && (r.lastModified[f] = w), w = y.getResponseHeader("etag"), w && (r.etag[f] = w)), 204 === b || "HEAD" === o.type ? x = "nocontent" : 304 === b ? x = "notmodified" : (x = v.state, m = v.data, n = v.error, j = !n)) : (n = x, !b && x || (x = "error", b < 0 && (b = 0))), y.status = b, y.statusText = (c || x) + "", j ? s.resolveWith(p, [m, x, y]) : s.rejectWith(p, [y, x, n]), y.statusCode(u), u = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [y, o, j ? m : n]), t.fireWith(p, [y, x]), l && (q.trigger("ajaxComplete", [y, o]), --r.active || r.event.trigger("ajaxStop")))
            }

            return y
        },
        getJSON: function (a, b, c) {
            return r.get(a, b, c, "json")
        },
        getScript: function (a, b) {
            return r.get(a, void 0, b, "script")
        }
    }), r.each(["get", "post"], function (a, b) {
        r[b] = function (a, c, d, e) {
            return r.isFunction(c) && (e = e || d, d = c, c = void 0), r.ajax(r.extend({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            }, r.isPlainObject(a) && a))
        }
    }), r._evalUrl = function (a) {
        return r.ajax({url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0})
    }, r.fn.extend({
        wrapAll: function (a) {
            var b;
            return this[0] && (r.isFunction(a) && (a = a.call(this[0])), b = r(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                var a = this;
                while (a.firstElementChild) a = a.firstElementChild;
                return a
            }).append(this)), this
        }, wrapInner: function (a) {
            return r.isFunction(a) ? this.each(function (b) {
                r(this).wrapInner(a.call(this, b))
            }) : this.each(function () {
                var b = r(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = r.isFunction(a);
            return this.each(function (c) {
                r(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function (a) {
            return this.parent(a).not("body").each(function () {
                r(this).replaceWith(this.childNodes)
            }), this
        }
    }), r.expr.pseudos.hidden = function (a) {
        return !r.expr.pseudos.visible(a)
    }, r.expr.pseudos.visible = function (a) {
        return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
    }, r.ajaxSettings.xhr = function () {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    };
    var Rb = {0: 200, 1223: 204}, Sb = r.ajaxSettings.xhr();
    o.cors = !!Sb && "withCredentials" in Sb, o.ajax = Sb = !!Sb, r.ajaxTransport(function (b) {
        var c, d;
        if (o.cors || Sb && !b.crossDomain) return {
            send: function (e, f) {
                var g, h = b.xhr();
                if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) h[g] = b.xhrFields[g];
                b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                for (g in e) h.setRequestHeader(g, e[g]);
                c = function (a) {
                    return function () {
                        c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Rb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {binary: h.response} : {text: h.responseText}, h.getAllResponseHeaders()))
                    }
                }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () {
                    4 === h.readyState && a.setTimeout(function () {
                        c && d()
                    })
                }, c = c("abort");
                try {
                    h.send(b.hasContent && b.data || null)
                } catch (i) {
                    if (c) throw i
                }
            }, abort: function () {
                c && c()
            }
        }
    }), r.ajaxPrefilter(function (a) {
        a.crossDomain && (a.contents.script = !1)
    }), r.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /\b(?:java|ecma)script\b/},
        converters: {
            "text script": function (a) {
                return r.globalEval(a), a
            }
        }
    }), r.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), r.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function (e, f) {
                    b = r("<script>").prop({charset: a.scriptCharset, src: a.url}).on("load error", c = function (a) {
                        b.remove(), c = null, a && f("error" === a.type ? 404 : 200, a.type)
                    }), d.head.appendChild(b[0])
                }, abort: function () {
                    c && c()
                }
            }
        }
    });
    var Tb = [], Ub = /(=)\?(?=&|$)|\?\?/;
    r.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var a = Tb.pop() || r.expando + "_" + ub++;
            return this[a] = !0, a
        }
    }), r.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e, f, g,
            h = b.jsonp !== !1 && (Ub.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Ub.test(b.data) && "data");
        if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = r.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Ub, "$1" + e) : b.jsonp !== !1 && (b.url += (vb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
            return g || r.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
            g = arguments
        }, d.always(function () {
            void 0 === f ? r(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Tb.push(e)), g && r.isFunction(f) && f(g[0]), g = f = void 0
        }), "script"
    }), o.createHTMLDocument = function () {
        var a = d.implementation.createHTMLDocument("").body;
        return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length
    }(), r.parseHTML = function (a, b, c) {
        if ("string" != typeof a) return [];
        "boolean" == typeof b && (c = b, b = !1);
        var e, f, g;
        return b || (o.createHTMLDocument ? (b = d.implementation.createHTMLDocument(""), e = b.createElement("base"), e.href = d.location.href, b.head.appendChild(e)) : b = d), f = C.exec(a), g = !c && [], f ? [b.createElement(f[1])] : (f = qa([a], b, g), g && g.length && r(g).remove(), r.merge([], f.childNodes))
    }, r.fn.load = function (a, b, c) {
        var d, e, f, g = this, h = a.indexOf(" ");
        return h > -1 && (d = pb(a.slice(h)), a = a.slice(0, h)), r.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && r.ajax({
            url: a,
            type: e || "GET",
            dataType: "html",
            data: b
        }).done(function (a) {
            f = arguments, g.html(d ? r("<div>").append(r.parseHTML(a)).find(d) : a)
        }).always(c && function (a, b) {
            g.each(function () {
                c.apply(this, f || [a.responseText, b, a])
            })
        }), this
    }, r.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
        r.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), r.expr.pseudos.animated = function (a) {
        return r.grep(r.timers, function (b) {
            return a === b.elem
        }).length
    }, r.offset = {
        setOffset: function (a, b, c) {
            var d, e, f, g, h, i, j, k = r.css(a, "position"), l = r(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = r.css(a, "top"), i = r.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), r.isFunction(b) && (b = b.call(a, c, r.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, r.fn.extend({
        offset: function (a) {
            if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                r.offset.setOffset(this, a, b)
            });
            var b, c, d, e, f = this[0];
            if (f) return f.getClientRects().length ? (d = f.getBoundingClientRect(), b = f.ownerDocument, c = b.documentElement, e = b.defaultView, {
                top: d.top + e.pageYOffset - c.clientTop,
                left: d.left + e.pageXOffset - c.clientLeft
            }) : {top: 0, left: 0}
        }, position: function () {
            if (this[0]) {
                var a, b, c = this[0], d = {top: 0, left: 0};
                return "fixed" === r.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), B(a[0], "html") || (d = a.offset()), d = {
                    top: d.top + r.css(a[0], "borderTopWidth", !0),
                    left: d.left + r.css(a[0], "borderLeftWidth", !0)
                }), {top: b.top - d.top - r.css(c, "marginTop", !0), left: b.left - d.left - r.css(c, "marginLeft", !0)}
            }
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent;
                while (a && "static" === r.css(a, "position")) a = a.offsetParent;
                return a || ra
            })
        }
    }), r.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
        var c = "pageYOffset" === b;
        r.fn[a] = function (d) {
            return T(this, function (a, d, e) {
                var f;
                return r.isWindow(a) ? f = a : 9 === a.nodeType && (f = a.defaultView), void 0 === e ? f ? f[b] : a[d] : void (f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e)
            }, a, d, arguments.length)
        }
    }), r.each(["top", "left"], function (a, b) {
        r.cssHooks[b] = Pa(o.pixelPosition, function (a, c) {
            if (c) return c = Oa(a, b), Ma.test(c) ? r(a).position()[b] + "px" : c
        })
    }), r.each({Height: "height", Width: "width"}, function (a, b) {
        r.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, d) {
            r.fn[d] = function (e, f) {
                var g = arguments.length && (c || "boolean" != typeof e),
                    h = c || (e === !0 || f === !0 ? "margin" : "border");
                return T(this, function (b, c, e) {
                    var f;
                    return r.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? r.css(b, c, h) : r.style(b, c, e, h)
                }, b, g ? e : void 0, g)
            }
        })
    }), r.fn.extend({
        bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    }), r.holdReady = function (a) {
        a ? r.readyWait++ : r.ready(!0)
    }, r.isArray = Array.isArray, r.parseJSON = JSON.parse, r.nodeName = B, "function" == typeof define && define.amd && define("jquery", [], function () {
        return r
    });
    var Vb = a.jQuery, Wb = a.$;
    return r.noConflict = function (b) {
        return a.$ === r && (a.$ = Wb), b && a.jQuery === r && (a.jQuery = Vb), r
    }, b || (a.jQuery = a.$ = r), r
});

/*!@preserve
 perfect-scrollbar v0.6.7 */
!function t(e, n, r) {
    function o(l, s) {
        if (!n[l]) {
            if (!e[l]) {
                var a = "function" == typeof require && require;
                if (!s && a) return a(l, !0);
                if (i) return i(l, !0);
                var c = new Error("Cannot find module '" + l + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[l] = {exports: {}};
            e[l][0].call(u.exports, function (t) {
                var n = e[l][1][t];
                return o(n ? n : t)
            }, u, u.exports, t, e, n, r)
        }
        return n[l].exports
    }

    for (var i = "function" == typeof require && require, l = 0; l < r.length; l++) o(r[l]);
    return o
}({
    1: [function (t, e, n) {
        "use strict";

        function r(t) {
            t.fn.perfectScrollbar = function (e) {
                return this.each(function () {
                    if ("object" == typeof e || "undefined" == typeof e) {
                        var n = e;
                        i.get(this) || o.initialize(this, n)
                    } else {
                        var r = e;
                        "update" === r ? o.update(this) : "destroy" === r && o.destroy(this)
                    }
                    return t(this)
                })
            }
        }

        var o = t("../main"), i = t("../plugin/instances");
        if ("function" == typeof define && define.amd) define(["jquery"], r); else {
            var l = window.jQuery ? window.jQuery : window.$;
            "undefined" != typeof l && r(l)
        }
        e.exports = r
    }, {"../main": 7, "../plugin/instances": 18}],
    2: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            var n = t.className.split(" ");
            n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ")
        }

        function o(t, e) {
            var n = t.className.split(" "), r = n.indexOf(e);
            r >= 0 && n.splice(r, 1), t.className = n.join(" ")
        }

        n.add = function (t, e) {
            t.classList ? t.classList.add(e) : r(t, e)
        }, n.remove = function (t, e) {
            t.classList ? t.classList.remove(e) : o(t, e)
        }, n.list = function (t) {
            return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ")
        }
    }, {}],
    3: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            return window.getComputedStyle(t)[e]
        }

        function o(t, e, n) {
            return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
        }

        function i(t, e) {
            for (var n in e) {
                var r = e[n];
                "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r
            }
            return t
        }

        var l = {};
        l.e = function (t, e) {
            var n = document.createElement(t);
            return n.className = e, n
        }, l.appendTo = function (t, e) {
            return e.appendChild(t), t
        }, l.css = function (t, e, n) {
            return "object" == typeof e ? i(t, e) : "undefined" == typeof n ? r(t, e) : o(t, e, n)
        }, l.matches = function (t, e) {
            return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
        }, l.remove = function (t) {
            "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
        }, l.queryChildren = function (t, e) {
            return Array.prototype.filter.call(t.childNodes, function (t) {
                return l.matches(t, e)
            })
        }, e.exports = l
    }, {}],
    4: [function (t, e, n) {
        "use strict";
        var r = function (t) {
            this.element = t, this.events = {}
        };
        r.prototype.bind = function (t, e) {
            "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
        }, r.prototype.unbind = function (t, e) {
            var n = "undefined" != typeof e;
            this.events[t] = this.events[t].filter(function (r) {
                return n && r !== e ? !0 : (this.element.removeEventListener(t, r, !1), !1)
            }, this)
        }, r.prototype.unbindAll = function () {
            for (var t in this.events) this.unbind(t)
        };
        var o = function () {
            this.eventElements = []
        };
        o.prototype.eventElement = function (t) {
            var e = this.eventElements.filter(function (e) {
                return e.element === t
            })[0];
            return "undefined" == typeof e && (e = new r(t), this.eventElements.push(e)), e
        }, o.prototype.bind = function (t, e, n) {
            this.eventElement(t).bind(e, n)
        }, o.prototype.unbind = function (t, e, n) {
            this.eventElement(t).unbind(e, n)
        }, o.prototype.unbindAll = function () {
            for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
        }, o.prototype.once = function (t, e, n) {
            var r = this.eventElement(t), o = function (t) {
                r.unbind(e, o), n(t)
            };
            r.bind(e, o)
        }, e.exports = o
    }, {}],
    5: [function (t, e, n) {
        "use strict";
        e.exports = function () {
            function t() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }

            return function () {
                return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
            }
        }()
    }, {}],
    6: [function (t, e, n) {
        "use strict";
        var r = t("./class"), o = t("./dom");
        n.toInt = function (t) {
            return parseInt(t, 10) || 0
        }, n.clone = function (t) {
            if (null === t) return null;
            if ("object" == typeof t) {
                var e = {};
                for (var n in t) e[n] = this.clone(t[n]);
                return e
            }
            return t
        }, n.extend = function (t, e) {
            var n = this.clone(t);
            for (var r in e) n[r] = this.clone(e[r]);
            return n
        }, n.isEditable = function (t) {
            return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]")
        }, n.removePsClasses = function (t) {
            for (var e = r.list(t), n = 0; n < e.length; n++) {
                var o = e[n];
                0 === o.indexOf("ps-") && r.remove(t, o)
            }
        }, n.outerWidth = function (t) {
            return this.toInt(o.css(t, "width")) + this.toInt(o.css(t, "paddingLeft")) + this.toInt(o.css(t, "paddingRight")) + this.toInt(o.css(t, "borderLeftWidth")) + this.toInt(o.css(t, "borderRightWidth"))
        }, n.startScrolling = function (t, e) {
            r.add(t, "ps-in-scrolling"), "undefined" != typeof e ? r.add(t, "ps-" + e) : (r.add(t, "ps-x"), r.add(t, "ps-y"))
        }, n.stopScrolling = function (t, e) {
            r.remove(t, "ps-in-scrolling"), "undefined" != typeof e ? r.remove(t, "ps-" + e) : (r.remove(t, "ps-x"), r.remove(t, "ps-y"))
        }, n.env = {
            isWebKit: "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
            supportsIePointer: null !== window.navigator.msMaxTouchPoints
        }
    }, {"./class": 2, "./dom": 3}],
    7: [function (t, e, n) {
        "use strict";
        var r = t("./plugin/destroy"), o = t("./plugin/initialize"), i = t("./plugin/update");
        e.exports = {initialize: o, update: i, destroy: r}
    }, {"./plugin/destroy": 9, "./plugin/initialize": 17, "./plugin/update": 21}],
    8: [function (t, e, n) {
        "use strict";
        e.exports = {
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            stopPropagationOnClick: !0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipePropagation: !0,
            useBothWheelAxes: !1,
            useKeyboard: !0,
            useSelectionScroll: !1,
            wheelPropagation: !1,
            wheelSpeed: 1
        }
    }, {}],
    9: [function (t, e, n) {
        "use strict";
        var r = t("../lib/dom"), o = t("../lib/helper"), i = t("./instances");
        e.exports = function (t) {
            var e = i.get(t);
            e && (e.event.unbindAll(), r.remove(e.scrollbarX), r.remove(e.scrollbarY), r.remove(e.scrollbarXRail), r.remove(e.scrollbarYRail), o.removePsClasses(t), i.remove(t))
        }
    }, {"../lib/dom": 3, "../lib/helper": 6, "./instances": 18}],
    10: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(t) {
                return t.getBoundingClientRect()
            }

            var r = window.Event.prototype.stopPropagation.bind;
            e.settings.stopPropagationOnClick && e.event.bind(e.scrollbarY, "click", r), e.event.bind(e.scrollbarYRail, "click", function (r) {
                var i = o.toInt(e.scrollbarYHeight / 2),
                    a = e.railYRatio * (r.pageY - window.scrollY - n(e.scrollbarYRail).top - i),
                    c = e.railYRatio * (e.railYHeight - e.scrollbarYHeight), u = a / c;
                0 > u ? u = 0 : u > 1 && (u = 1), s(t, "top", (e.contentHeight - e.containerHeight) * u), l(t), r.stopPropagation()
            }), e.settings.stopPropagationOnClick && e.event.bind(e.scrollbarX, "click", r), e.event.bind(e.scrollbarXRail, "click", function (r) {
                var i = o.toInt(e.scrollbarXWidth / 2),
                    a = e.railXRatio * (r.pageX - window.scrollX - n(e.scrollbarXRail).left - i),
                    c = e.railXRatio * (e.railXWidth - e.scrollbarXWidth), u = a / c;
                0 > u ? u = 0 : u > 1 && (u = 1), s(t, "left", (e.contentWidth - e.containerWidth) * u - e.negativeScrollAdjustment), l(t), r.stopPropagation()
            })
        }

        var o = t("../../lib/helper"), i = t("../instances"), l = t("../update-geometry"), s = t("../update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
    11: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n) {
                var o = r + n * e.railXRatio,
                    i = e.scrollbarXRail.getBoundingClientRect().left + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                0 > o ? e.scrollbarXLeft = 0 : o > i ? e.scrollbarXLeft = i : e.scrollbarXLeft = o;
                var s = l.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                c(t, "left", s)
            }

            var r = null, o = null, s = function (e) {
                n(e.pageX - o), a(t), e.stopPropagation(), e.preventDefault()
            }, u = function () {
                l.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", s)
            };
            e.event.bind(e.scrollbarX, "mousedown", function (n) {
                o = n.pageX, r = l.toInt(i.css(e.scrollbarX, "left")) * e.railXRatio, l.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }

        function o(t, e) {
            function n(n) {
                var o = r + n * e.railYRatio,
                    i = e.scrollbarYRail.getBoundingClientRect().top + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                0 > o ? e.scrollbarYTop = 0 : o > i ? e.scrollbarYTop = i : e.scrollbarYTop = o;
                var s = l.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                c(t, "top", s)
            }

            var r = null, o = null, s = function (e) {
                n(e.pageY - o), a(t), e.stopPropagation(), e.preventDefault()
            }, u = function () {
                l.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", s)
            };
            e.event.bind(e.scrollbarY, "mousedown", function (n) {
                o = n.pageY, r = l.toInt(i.css(e.scrollbarY, "top")) * e.railYRatio, l.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }

        var i = t("../../lib/dom"), l = t("../../lib/helper"), s = t("../instances"), a = t("../update-geometry"),
            c = t("../update-scroll");
        e.exports = function (t) {
            var e = s.get(t);
            r(t, e), o(t, e)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    12: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && 0 > r) return !e.settings.wheelPropagation
                }
                var i = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === i && 0 > n || i >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }

            var r = !1;
            e.event.bind(t, "mouseenter", function () {
                r = !0
            }), e.event.bind(t, "mouseleave", function () {
                r = !1
            });
            var i = !1;
            e.event.bind(e.ownerDocument, "keydown", function (a) {
                if ((!a.isDefaultPrevented || !a.isDefaultPrevented()) && r) {
                    var c = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                    if (c) {
                        for (; c.shadowRoot;) c = c.shadowRoot.activeElement;
                        if (o.isEditable(c)) return
                    }
                    var u = 0, d = 0;
                    switch (a.which) {
                        case 37:
                            u = -30;
                            break;
                        case 38:
                            d = 30;
                            break;
                        case 39:
                            u = 30;
                            break;
                        case 40:
                            d = -30;
                            break;
                        case 33:
                            d = 90;
                            break;
                        case 32:
                            d = a.shiftKey ? 90 : -90;
                            break;
                        case 34:
                            d = -90;
                            break;
                        case 35:
                            d = a.ctrlKey ? -e.contentHeight : -e.containerHeight;
                            break;
                        case 36:
                            d = a.ctrlKey ? t.scrollTop : e.containerHeight;
                            break;
                        default:
                            return
                    }
                    s(t, "top", t.scrollTop - d), s(t, "left", t.scrollLeft + u), l(t), i = n(u, d), i && a.preventDefault()
                }
            })
        }

        var o = t("../../lib/helper"), i = t("../instances"), l = t("../update-geometry"), s = t("../update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
    13: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && 0 > r) return !e.settings.wheelPropagation
                }
                var i = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === i && 0 > n || i >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }

            function r(t) {
                var e = t.deltaX, n = -1 * t.deltaY;
                return ("undefined" == typeof e || "undefined" == typeof n) && (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e !== e && n !== n && (e = 0, n = t.wheelDelta), [e, n]
            }

            function i(e, n) {
                var r = t.querySelector("textarea:hover");
                if (r) {
                    var o = r.scrollHeight - r.clientHeight;
                    if (o > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === o && 0 > n)) return !0;
                    var i = r.scrollLeft - r.clientWidth;
                    if (i > 0 && !(0 === r.scrollLeft && 0 > e || r.scrollLeft === i && e > 0)) return !0
                }
                return !1
            }

            function a(a) {
                if (o.env.isWebKit || !t.querySelector("select:focus")) {
                    var u = r(a), d = u[0], p = u[1];
                    i(d, p) || (c = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (p ? s(t, "top", t.scrollTop - p * e.settings.wheelSpeed) : s(t, "top", t.scrollTop + d * e.settings.wheelSpeed), c = !0) : e.scrollbarXActive && !e.scrollbarYActive && (d ? s(t, "left", t.scrollLeft + d * e.settings.wheelSpeed) : s(t, "left", t.scrollLeft - p * e.settings.wheelSpeed), c = !0) : (s(t, "top", t.scrollTop - p * e.settings.wheelSpeed), s(t, "left", t.scrollLeft + d * e.settings.wheelSpeed)), l(t), c = c || n(d, p), c && (a.stopPropagation(), a.preventDefault()))
                }
            }

            var c = !1;
            "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", a) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", a)
        }

        var o = t("../../lib/helper"), i = t("../instances"), l = t("../update-geometry"), s = t("../update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
    14: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            e.event.bind(t, "scroll", function () {
                i(t)
            })
        }

        var o = t("../instances"), i = t("../update-geometry");
        e.exports = function (t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {"../instances": 18, "../update-geometry": 19}],
    15: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n() {
                var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
            }

            function r() {
                c || (c = setInterval(function () {
                    return i.get(t) ? (s(t, "top", t.scrollTop + u.top), s(t, "left", t.scrollLeft + u.left), void l(t)) : void clearInterval(c)
                }, 50))
            }

            function a() {
                c && (clearInterval(c), c = null), o.stopScrolling(t)
            }

            var c = null, u = {top: 0, left: 0}, d = !1;
            e.event.bind(e.ownerDocument, "selectionchange", function () {
                t.contains(n()) ? d = !0 : (d = !1, a())
            }), e.event.bind(window, "mouseup", function () {
                d && (d = !1, a())
            }), e.event.bind(window, "mousemove", function (e) {
                if (d) {
                    var n = {x: e.pageX, y: e.pageY}, i = {
                        left: t.offsetLeft,
                        right: t.offsetLeft + t.offsetWidth,
                        top: t.offsetTop,
                        bottom: t.offsetTop + t.offsetHeight
                    };
                    n.x < i.left + 3 ? (u.left = -5, o.startScrolling(t, "x")) : n.x > i.right - 3 ? (u.left = 5, o.startScrolling(t, "x")) : u.left = 0, n.y < i.top + 3 ? (i.top + 3 - n.y < 5 ? u.top = -5 : u.top = -20, o.startScrolling(t, "y")) : n.y > i.bottom - 3 ? (n.y - i.bottom + 3 < 5 ? u.top = 5 : u.top = 20, o.startScrolling(t, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? a() : r()
                }
            })
        }

        var o = t("../../lib/helper"), i = t("../instances"), l = t("../update-geometry"), s = t("../update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
    16: [function (t, e, n) {
        "use strict";

        function r(t, e, n, r) {
            function s(n, r) {
                var o = t.scrollTop, i = t.scrollLeft, l = Math.abs(n), s = Math.abs(r);
                if (s > l) {
                    if (0 > r && o === e.contentHeight - e.containerHeight || r > 0 && 0 === o) return !e.settings.swipePropagation
                } else if (l > s && (0 > n && i === e.contentWidth - e.containerWidth || n > 0 && 0 === i)) return !e.settings.swipePropagation;
                return !0
            }

            function a(e, n) {
                l(t, "top", t.scrollTop - n), l(t, "left", t.scrollLeft - e), i(t)
            }

            function c() {
                Y = !0
            }

            function u() {
                Y = !1
            }

            function d(t) {
                return t.targetTouches ? t.targetTouches[0] : t
            }

            function p(t) {
                return t.targetTouches && 1 === t.targetTouches.length ? !0 : t.pointerType && "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE ? !0 : !1
            }

            function f(t) {
                if (p(t)) {
                    w = !0;
                    var e = d(t);
                    b.pageX = e.pageX, b.pageY = e.pageY, g = (new Date).getTime(), null !== y && clearInterval(y), t.stopPropagation()
                }
            }

            function h(t) {
                if (!Y && w && p(t)) {
                    var e = d(t), n = {pageX: e.pageX, pageY: e.pageY}, r = n.pageX - b.pageX, o = n.pageY - b.pageY;
                    a(r, o), b = n;
                    var i = (new Date).getTime(), l = i - g;
                    l > 0 && (m.x = r / l, m.y = o / l, g = i), s(r, o) && (t.stopPropagation(), t.preventDefault())
                }
            }

            function v() {
                !Y && w && (w = !1, clearInterval(y), y = setInterval(function () {
                    return o.get(t) ? Math.abs(m.x) < .01 && Math.abs(m.y) < .01 ? void clearInterval(y) : (a(30 * m.x, 30 * m.y), m.x *= .8, void (m.y *= .8)) : void clearInterval(y)
                }, 10))
            }

            var b = {}, g = 0, m = {}, y = null, Y = !1, w = !1;
            n && (e.event.bind(window, "touchstart", c), e.event.bind(window, "touchend", u), e.event.bind(t, "touchstart", f), e.event.bind(t, "touchmove", h), e.event.bind(t, "touchend", v)), r && (window.PointerEvent ? (e.event.bind(window, "pointerdown", c), e.event.bind(window, "pointerup", u), e.event.bind(t, "pointerdown", f), e.event.bind(t, "pointermove", h), e.event.bind(t, "pointerup", v)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", c), e.event.bind(window, "MSPointerUp", u), e.event.bind(t, "MSPointerDown", f), e.event.bind(t, "MSPointerMove", h), e.event.bind(t, "MSPointerUp", v)))
        }

        var o = t("../instances"), i = t("../update-geometry"), l = t("../update-scroll");
        e.exports = function (t, e, n) {
            var i = o.get(t);
            r(t, i, e, n)
        }
    }, {"../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
    17: [function (t, e, n) {
        "use strict";
        var r = t("../lib/class"), o = t("../lib/helper"), i = t("./instances"), l = t("./update-geometry"),
            s = t("./handler/click-rail"), a = t("./handler/drag-scrollbar"), c = t("./handler/keyboard"),
            u = t("./handler/mouse-wheel"), d = t("./handler/native-scroll"), p = t("./handler/selection"),
            f = t("./handler/touch");
        e.exports = function (t, e) {
            e = "object" == typeof e ? e : {}, r.add(t, "ps-container");
            var n = i.add(t);
            n.settings = o.extend(n.settings, e), s(t), a(t), u(t), d(t), n.settings.useSelectionScroll && p(t), (o.env.supportsTouch || o.env.supportsIePointer) && f(t, o.env.supportsTouch, o.env.supportsIePointer), n.settings.useKeyboard && c(t), l(t)
        }
    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    }],
    18: [function (t, e, n) {
        "use strict";

        function r(t) {
            var e = this;
            e.settings = d.clone(a), e.containerWidth = null, e.containerHeight = null, e.contentWidth = null, e.contentHeight = null, e.isRtl = "rtl" === s.css(t, "direction"), e.isNegativeScroll = function () {
                var e = t.scrollLeft, n = null;
                return t.scrollLeft = -1, n = t.scrollLeft < 0, t.scrollLeft = e, n
            }(), e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, e.event = new c, e.ownerDocument = t.ownerDocument || document, e.scrollbarXRail = s.appendTo(s.e("div", "ps-scrollbar-x-rail"), t), e.scrollbarX = s.appendTo(s.e("div", "ps-scrollbar-x"), e.scrollbarXRail), e.scrollbarXActive = null, e.scrollbarXWidth = null, e.scrollbarXLeft = null, e.scrollbarXBottom = d.toInt(s.css(e.scrollbarXRail, "bottom")), e.isScrollbarXUsingBottom = e.scrollbarXBottom === e.scrollbarXBottom, e.scrollbarXTop = e.isScrollbarXUsingBottom ? null : d.toInt(s.css(e.scrollbarXRail, "top")), e.railBorderXWidth = d.toInt(s.css(e.scrollbarXRail, "borderLeftWidth")) + d.toInt(s.css(e.scrollbarXRail, "borderRightWidth")), s.css(e.scrollbarXRail, "display", "block"), e.railXMarginWidth = d.toInt(s.css(e.scrollbarXRail, "marginLeft")) + d.toInt(s.css(e.scrollbarXRail, "marginRight")), s.css(e.scrollbarXRail, "display", ""), e.railXWidth = null, e.railXRatio = null, e.scrollbarYRail = s.appendTo(s.e("div", "ps-scrollbar-y-rail"), t), e.scrollbarY = s.appendTo(s.e("div", "ps-scrollbar-y"), e.scrollbarYRail), e.scrollbarYActive = null, e.scrollbarYHeight = null, e.scrollbarYTop = null, e.scrollbarYRight = d.toInt(s.css(e.scrollbarYRail, "right")), e.isScrollbarYUsingRight = e.scrollbarYRight === e.scrollbarYRight, e.scrollbarYLeft = e.isScrollbarYUsingRight ? null : d.toInt(s.css(e.scrollbarYRail, "left")), e.scrollbarYOuterWidth = e.isRtl ? d.outerWidth(e.scrollbarY) : null, e.railBorderYWidth = d.toInt(s.css(e.scrollbarYRail, "borderTopWidth")) + d.toInt(s.css(e.scrollbarYRail, "borderBottomWidth")), s.css(e.scrollbarYRail, "display", "block"), e.railYMarginHeight = d.toInt(s.css(e.scrollbarYRail, "marginTop")) + d.toInt(s.css(e.scrollbarYRail, "marginBottom")), s.css(e.scrollbarYRail, "display", ""), e.railYHeight = null, e.railYRatio = null
        }

        function o(t) {
            return "undefined" == typeof t.dataset ? t.getAttribute("data-ps-id") : t.dataset.psId
        }

        function i(t, e) {
            "undefined" == typeof t.dataset ? t.setAttribute("data-ps-id", e) : t.dataset.psId = e
        }

        function l(t) {
            "undefined" == typeof t.dataset ? t.removeAttribute("data-ps-id") : delete t.dataset.psId
        }

        var s = t("../lib/dom"), a = t("./default-setting"), c = t("../lib/event-manager"), u = t("../lib/guid"),
            d = t("../lib/helper"), p = {};
        n.add = function (t) {
            var e = u();
            return i(t, e), p[e] = new r(t), p[e]
        }, n.remove = function (t) {
            delete p[o(t)], l(t)
        }, n.get = function (t) {
            return p[o(t)]
        }
    }, {"../lib/dom": 3, "../lib/event-manager": 4, "../lib/guid": 5, "../lib/helper": 6, "./default-setting": 8}],
    19: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
        }

        function o(t, e) {
            var n = {width: e.railXWidth};
            e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, l.css(e.scrollbarXRail, n);
            var r = {top: t.scrollTop, height: e.railYHeight};
            e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft, l.css(e.scrollbarYRail, r), l.css(e.scrollbarX, {
                left: e.scrollbarXLeft,
                width: e.scrollbarXWidth - e.railBorderXWidth
            }), l.css(e.scrollbarY, {top: e.scrollbarYTop, height: e.scrollbarYHeight - e.railBorderYWidth})
        }

        var i = t("../lib/class"), l = t("../lib/dom"), s = t("../lib/helper"), a = t("./instances"),
            c = t("./update-scroll");
        e.exports = function (t) {
            var e = a.get(t);
            e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight;
            var n;
            t.contains(e.scrollbarXRail) || (n = l.queryChildren(t, ".ps-scrollbar-x-rail"), n.length > 0 && n.forEach(function (t) {
                l.remove(t)
            }), l.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (n = l.queryChildren(t, ".ps-scrollbar-y-rail"), n.length > 0 && n.forEach(function (t) {
                l.remove(t)
            }), l.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = r(e, s.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = s.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : (e.scrollbarXActive = !1, e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = 0), !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = r(e, s.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = s.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : (e.scrollbarYActive = !1, e.scrollbarYHeight = 0, e.scrollbarYTop = 0, c(t, "top", 0)), e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), o(t, e), i[e.scrollbarXActive ? "add" : "remove"](t, "ps-active-x"), i[e.scrollbarYActive ? "add" : "remove"](t, "ps-active-y")
        }
    }, {"../lib/class": 2, "../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-scroll": 20}],
    20: [function (t, e, n) {
        "use strict";
        var r, o, i = t("./instances"), l = document.createEvent("Event"), s = document.createEvent("Event"),
            a = document.createEvent("Event"), c = document.createEvent("Event"), u = document.createEvent("Event"),
            d = document.createEvent("Event"), p = document.createEvent("Event"), f = document.createEvent("Event"),
            h = document.createEvent("Event"), v = document.createEvent("Event");
        l.initEvent("ps-scroll-up", !0, !0), s.initEvent("ps-scroll-down", !0, !0), a.initEvent("ps-scroll-left", !0, !0), c.initEvent("ps-scroll-right", !0, !0), u.initEvent("ps-scroll-y", !0, !0), d.initEvent("ps-scroll-x", !0, !0), p.initEvent("ps-x-reach-start", !0, !0), f.initEvent("ps-x-reach-end", !0, !0), h.initEvent("ps-y-reach-start", !0, !0), v.initEvent("ps-y-reach-end", !0, !0), e.exports = function (t, e, n) {
            if ("undefined" == typeof t) throw"You must provide an element to the update-scroll function";
            if ("undefined" == typeof e) throw"You must provide an axis to the update-scroll function";
            if ("undefined" == typeof n) throw"You must provide a value to the update-scroll function";
            if ("top" === e && 0 >= n) return t.scrollTop = 0, void t.dispatchEvent(h);
            if ("left" === e && 0 >= n) return t.scrollLeft = 0, void t.dispatchEvent(p);
            var b = i.get(t);
            return "top" === e && n > b.contentHeight - b.containerHeight ? (t.scrollTop = b.contentHeight - b.containerHeight, void t.dispatchEvent(v)) : "left" === e && n > b.contentWidth - b.containerWidth ? (t.scrollLeft = b.contentWidth - b.containerWidth, void t.dispatchEvent(f)) : (r || (r = t.scrollTop), o || (o = t.scrollLeft), "top" === e && r > n && t.dispatchEvent(l), "top" === e && n > r && t.dispatchEvent(s), "left" === e && o > n && t.dispatchEvent(a), "left" === e && n > o && t.dispatchEvent(c), "top" === e && (t.scrollTop = r = n, t.dispatchEvent(u)), void ("left" === e && (t.scrollLeft = o = n, t.dispatchEvent(d))))
        }
    }, {"./instances": 18}],
    21: [function (t, e, n) {
        "use strict";
        var r = t("../lib/dom"), o = t("../lib/helper"), i = t("./instances"), l = t("./update-geometry");
        e.exports = function (t) {
            var e = i.get(t);
            e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, r.css(e.scrollbarXRail, "display", "block"), r.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = o.toInt(r.css(e.scrollbarXRail, "marginLeft")) + o.toInt(r.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = o.toInt(r.css(e.scrollbarYRail, "marginTop")) + o.toInt(r.css(e.scrollbarYRail, "marginBottom")), r.css(e.scrollbarXRail, "display", "none"), r.css(e.scrollbarYRail, "display", "none"), l(t), r.css(e.scrollbarXRail, "display", ""), r.css(e.scrollbarYRail, "display", ""))
        }
    }, {"../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-geometry": 19}]
}, {}, [1]);

/*!@preserve
JavaScript autoComplete v1.0.3 - https://github.com/Pixabay/JavaScript-autoComplete */
var autoComplete = function () {
    function e(e) {
        function t(e, t) {
            return e.classList ? e.classList.contains(t) : new RegExp("\\b" + t + "\\b").test(e.className)
        }

        function o(e, t, o) {
            e.attachEvent ? e.attachEvent("on" + t, o) : e.addEventListener(t, o)
        }

        function s(e, t, o) {
            e.detachEvent ? e.detachEvent("on" + t, o) : e.removeEventListener(t, o)
        }

        function n(e, s, n, l) {
            o(l || document, s, function (o) {
                for (var s, l = o.target || o.srcElement; l && !(s = t(l, e));) l = l.parentElement;
                s && n.call(l, o)
            })
        }

        if (document.querySelector) {
            var l = {
                selector: 0,
                source: 0,
                minChars: 3,
                delay: 150,
                cache: 1,
                menuClass: "",
                renderItem: function (e, t) {
                    t = t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                    var o = new RegExp("(" + t.split(" ").join("|") + ")", "gi");
                    return '<div class="autocomplete-suggestion" data-val="' + e + '">' + e.replace(o, "<b>$1</b>") + "</div>"
                },
                onSelect: function (e, t, o) {
                }
            };
            for (var c in e) e.hasOwnProperty(c) && (l[c] = e[c]);
            for (var a = "object" == typeof l.selector ? [l.selector] : document.querySelectorAll(l.selector), u = 0; u < a.length; u++) {
                var i = a[u];
                i.sc = document.createElement("div"), i.sc.className = "autocomplete-suggestions " + l.menuClass, i.autocompleteAttr = i.getAttribute("autocomplete"), i.setAttribute("autocomplete", "off"), i.cache = {}, i.last_val = "", i.updateSC = function (e, t) {
                    var o = i.getBoundingClientRect();
                    if (i.sc.style.left = o.left + (window.pageXOffset || document.documentElement.scrollLeft) + "px", i.sc.style.top = o.bottom + (window.pageYOffset || document.documentElement.scrollTop) + 1 + "px", i.sc.style.width = o.right - o.left + "px", !e && (i.sc.style.display = "block", i.sc.maxHeight || (i.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(i.sc, null) : i.sc.currentStyle).maxHeight)), i.sc.suggestionHeight || (i.sc.suggestionHeight = i.sc.querySelector(".autocomplete-suggestion").offsetHeight), i.sc.suggestionHeight)) if (t) {
                        var s = i.sc.scrollTop, n = t.getBoundingClientRect().top - i.sc.getBoundingClientRect().top;
                        n + i.sc.suggestionHeight - i.sc.maxHeight > 0 ? i.sc.scrollTop = n + i.sc.suggestionHeight + s - i.sc.maxHeight : 0 > n && (i.sc.scrollTop = n + s)
                    } else i.sc.scrollTop = 0
                }, o(window, "resize", i.updateSC), document.body.appendChild(i.sc), n("autocomplete-suggestion", "mouseleave", function (e) {
                    var t = i.sc.querySelector(".autocomplete-suggestion.selected");
                    t && setTimeout(function () {
                        t.className = t.className.replace("selected", "")
                    }, 20)
                }, i.sc), n("autocomplete-suggestion", "mouseover", function (e) {
                    var t = i.sc.querySelector(".autocomplete-suggestion.selected");
                    t && (t.className = t.className.replace("selected", "")), this.className += " selected"
                }, i.sc), n("autocomplete-suggestion", "mousedown", function (e) {
                    if (t(this, "autocomplete-suggestion")) {
                        var o = this.getAttribute("data-val");
                        i.value = o, l.onSelect(e, o, this), i.sc.style.display = "none"
                    }
                }, i.sc), i.blurHandler = function () {
                    try {
                        var e = document.querySelector(".autocomplete-suggestions:hover")
                    } catch (t) {
                        var e = 0
                    }
                    e ? i !== document.activeElement && setTimeout(function () {
                        i.focus()
                    }, 20) : (i.last_val = i.value, i.sc.style.display = "none", setTimeout(function () {
                        i.sc.style.display = "none"
                    }, 350))
                }, o(i, "blur", i.blurHandler);
                var r = function (e) {
                    var t = i.value;
                    if (i.cache[t] = e, e.length && t.length >= l.minChars) {
                        for (var o = "", s = 0; s < e.length; s++) o += l.renderItem(e[s], t);
                        i.sc.innerHTML = o, i.updateSC(0)
                    } else i.sc.style.display = "none"
                };
                i.keydownHandler = function (e) {
                    var t = window.event ? e.keyCode : e.which;
                    if ((40 == t || 38 == t) && i.sc.innerHTML) {
                        var o, s = i.sc.querySelector(".autocomplete-suggestion.selected");
                        return s ? (o = 40 == t ? s.nextSibling : s.previousSibling, o ? (s.className = s.className.replace("selected", ""), o.className += " selected", i.value = o.getAttribute("data-val")) : (s.className = s.className.replace("selected", ""), i.value = i.last_val, o = 0)) : (o = 40 == t ? i.sc.querySelector(".autocomplete-suggestion") : i.sc.childNodes[i.sc.childNodes.length - 1], o.className += " selected", i.value = o.getAttribute("data-val")), i.updateSC(0, o), !1
                    }
                    if (27 == t) i.value = i.last_val, i.sc.style.display = "none"; else if (13 == t || 9 == t) {
                        var s = i.sc.querySelector(".autocomplete-suggestion.selected");
                        s && "none" != i.sc.style.display && (l.onSelect(e, s.getAttribute("data-val"), s), setTimeout(function () {
                            i.sc.style.display = "none"
                        }, 20))
                    }
                }, o(i, "keydown", i.keydownHandler), i.keyupHandler = function (e) {
                    var t = window.event ? e.keyCode : e.which;
                    if (!t || (35 > t || t > 40) && 13 != t && 27 != t) {
                        var o = i.value;
                        if (o.length >= l.minChars) {
                            if (o != i.last_val) {
                                if (i.last_val = o, clearTimeout(i.timer), l.cache) {
                                    if (o in i.cache) return void r(i.cache[o]);
                                    for (var s = 1; s < o.length - l.minChars; s++) {
                                        var n = o.slice(0, o.length - s);
                                        if (n in i.cache && !i.cache[n].length) return void r([])
                                    }
                                }
                                i.timer = setTimeout(function () {
                                    l.source(o, r)
                                }, l.delay)
                            }
                        } else i.last_val = o, i.sc.style.display = "none"
                    }
                }, o(i, "keyup", i.keyupHandler), i.focusHandler = function (e) {
                    i.last_val = "\n", i.keyupHandler(e)
                }, l.minChars || o(i, "focus", i.focusHandler)
            }
            this.destroy = function () {
                for (var e = 0; e < a.length; e++) {
                    var t = a[e];
                    s(window, "resize", t.updateSC), s(t, "blur", t.blurHandler), s(t, "focus", t.focusHandler), s(t, "keydown", t.keydownHandler), s(t, "keyup", t.keyupHandler), t.autocompleteAttr ? t.setAttribute("autocomplete", t.autocompleteAttr) : t.removeAttribute("autocomplete"), document.body.removeChild(t.sc), t = null
                }
            }
        }
    }

    return e
}();
!function () {
    "function" == typeof define && define.amd ? define("autoComplete", function () {
        return autoComplete
    }) : "undefined" != typeof module && module.exports ? module.exports = autoComplete : window.autoComplete = autoComplete
}();

// LazyLoad 8.2 https://github.com/verlok/lazyload
var _extends = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
    }
    return e
}, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
!function (e, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.LazyLoad = t()
}(this, function () {
    "use strict";
    var e = {
        elements_selector: "img",
        container: document,
        threshold: 300,
        data_src: "src",
        data_srcset: "srcset",
        class_loading: "loading",
        class_loaded: "loaded",
        class_error: "error",
        callback_load: null,
        callback_error: null,
        callback_set: null
    }, t = function (e, t) {
        return e.getAttribute("data-" + t)
    }, n = function (e, t, n) {
        return e.setAttribute("data-" + t, n)
    }, r = function (e) {
        return e.filter(function (e) {
            return !t(e, "was-processed")
        })
    }, s = function (e, t) {
        var n = new e(t), r = new CustomEvent("LazyLoad::Initialized", {detail: {instance: n}});
        window.dispatchEvent(r)
    }, o = function (e, n) {
        var r = n.data_srcset, s = e.parentElement;
        if ("PICTURE" === s.tagName) for (var o, a = 0; o = s.children[a]; a += 1) if ("SOURCE" === o.tagName) {
            var i = t(o, r);
            i && o.setAttribute("srcset", i)
        }
    }, a = function (e, n) {
        var r = n.data_src, s = n.data_srcset, a = e.tagName, i = t(e, r);
        if ("IMG" === a) {
            o(e, n);
            var c = t(e, s);
            return c && e.setAttribute("srcset", c), void (i && e.setAttribute("src", i))
        }
        "IFRAME" !== a ? i && (e.style.backgroundImage = 'url("' + i + '")') : i && e.setAttribute("src", i)
    }, i = "classList" in document.createElement("p"), c = function (e, t) {
        i ? e.classList.add(t) : e.className += (e.className ? " " : "") + t
    }, l = function (e, t) {
        i ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
    }, u = function (e, t) {
        e && e(t)
    }, f = function (e, t, n) {
        e.removeEventListener("load", t), e.removeEventListener("error", n)
    }, d = function (e, t) {
        var n = function n(s) {
            _(s, !0, t), f(e, n, r)
        }, r = function r(s) {
            _(s, !1, t), f(e, n, r)
        };
        e.addEventListener("load", n), e.addEventListener("error", r)
    }, _ = function (e, t, n) {
        var r = e.target;
        l(r, n.class_loading), c(r, t ? n.class_loaded : n.class_error), u(t ? n.callback_load : n.callback_error, r)
    }, v = function (e, t) {
        ["IMG", "IFRAME"].indexOf(e.tagName) > -1 && (d(e, t), c(e, t.class_loading)), a(e, t), n(e, "was-processed", !0), u(t.callback_set, e)
    }, m = function (t, n) {
        this._settings = _extends({}, e, t), this._setObserver(), this.update(n)
    };
    m.prototype = {
        _setObserver: function () {
            var e = this;
            if ("IntersectionObserver" in window) {
                var t = this._settings;
                this._observer = new IntersectionObserver(function (n) {
                    n.forEach(function (n) {
                        if (n.intersectionRatio > 0) {
                            var r = n.target;
                            v(r, t), e._observer.unobserve(r)
                        }
                    }), e._elements = r(e._elements)
                }, {root: t.container === document ? null : t.container, rootMargin: t.threshold + "px"})
            }
        }, update: function (e) {
            var t = this, n = this._settings, s = e || n.container.querySelectorAll(n.elements_selector);
            this._elements = r(Array.prototype.slice.call(s)), this._observer ? this._elements.forEach(function (e) {
                t._observer.observe(e)
            }) : (this._elements.forEach(function (e) {
                v(e, n)
            }), this._elements = r(this._elements))
        }, destroy: function () {
            var e = this;
            this._observer && (r(this._elements).forEach(function (t) {
                e._observer.unobserve(t)
            }), this._observer = null), this._elements = null, this._settings = null
        }
    };
    var b = window.lazyLoadOptions;
    return b && function (e, t) {
        if (t.length) for (var n, r = 0; n = t[r]; r += 1) s(e, n); else s(e, t)
    }(m, b), m
});
/*!
 * SplitText
 * VERSION: 0.5.8
 * DATE: 2017-08-22
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
!function (e) {
    "use strict";
    var t = e.GreenSockGlobals || e, i = function (e) {
            var i, n = e.split("."), s = t;
            for (i = 0; i < n.length; i++) s[n[i]] = s = s[n[i]] || {};
            return s
        }, n = i("com.greensock.utils"), s = function (e) {
            var t = e.nodeType, i = "";
            if (1 === t || 9 === t || 11 === t) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) i += s(e)
            } else if (3 === t || 4 === t) return e.nodeValue;
            return i
        }, r = document, l = r.defaultView ? r.defaultView.getComputedStyle : function () {
        }, o = /([A-Z])/g, d = function (e, t, i, n) {
            var s;
            return (i = i || l(e, null)) ? (e = i.getPropertyValue(t.replace(o, "-$1").toLowerCase()), s = e || i.length ? e : i[t]) : e.currentStyle && (i = e.currentStyle, s = i[t]), n ? s : parseInt(s, 10) || 0
        }, p = function (e) {
            return e.length && e[0] && (e[0].nodeType && e[0].style && !e.nodeType || e[0].length && e[0][0]) ? !0 : !1
        }, a = function (e) {
            var t, i, n, s = [], r = e.length;
            for (t = 0; r > t; t++) if (i = e[t], p(i)) for (n = i.length, n = 0; n < i.length; n++) s.push(i[n]); else s.push(i);
            return s
        }, h = /(?:\r|\n|\t\t)/g, u = /(?:\s\s+)/g, f = 55296, c = 56319, g = 56320, y = 127462, x = 127487, S = 127995,
        v = 127999, b = function (e) {
            return (e.charCodeAt(0) - f << 10) + (e.charCodeAt(1) - g) + 65536
        }, _ = r.all && !r.addEventListener,
        m = " style='position:relative;display:inline-block;" + (_ ? "*display:inline;*zoom:1;'" : "'"),
        C = function (e, t) {
            e = e || "";
            var i = -1 !== e.indexOf("++"), n = 1;
            return i && (e = e.split("++").join("")), function () {
                return "<" + t + m + (e ? " class='" + e + (i ? n++ : "") + "'>" : ">")
            }
        }, T = n.SplitText = t.SplitText = function (e, t) {
            if ("string" == typeof e && (e = T.selector(e)), !e) throw"cannot split a null element.";
            this.elements = p(e) ? a(e) : [e], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = t || {}, this.split(t)
        }, N = function (e, t, i) {
            var n = e.nodeType;
            if (1 === n || 9 === n || 11 === n) for (e = e.firstChild; e; e = e.nextSibling) N(e, t, i); else (3 === n || 4 === n) && (e.nodeValue = e.nodeValue.split(t).join(i))
        }, w = function (e, t) {
            var i = t.length;
            for (; --i > -1;) e.push(t[i])
        }, A = function (e) {
            var t, i = [], n = e.length;
            for (t = 0; t !== n; i.push(e[t++])) ;
            return i
        }, L = function (e, t, i) {
            var n;
            for (; e && e !== t;) {
                if (n = e._next || e.nextSibling) return n.textContent.charAt(0) === i;
                e = e.parentNode || e._parent
            }
            return !1
        }, B = function (e) {
            var t, i, n = A(e.childNodes), s = n.length;
            for (t = 0; s > t; t++) i = n[t], i._isSplit ? B(i) : (t && 3 === i.previousSibling.nodeType ? i.previousSibling.nodeValue += 3 === i.nodeType ? i.nodeValue : i.firstChild.nodeValue : 3 !== i.nodeType && e.insertBefore(i.firstChild, i), e.removeChild(i))
        }, V = function (e, t, i, n, s, o, p) {
            var a, h, u, f, c, g, y, x, S, v, b, _, m = l(e), C = d(e, "paddingLeft", m), T = -999,
                A = d(e, "borderBottomWidth", m) + d(e, "borderTopWidth", m),
                V = d(e, "borderLeftWidth", m) + d(e, "borderRightWidth", m),
                W = d(e, "paddingTop", m) + d(e, "paddingBottom", m), H = d(e, "paddingLeft", m) + d(e, "paddingRight", m),
                E = .2 * d(e, "fontSize"), k = d(e, "textAlign", m, !0), O = [], R = [], j = [], M = t.wordDelimiter || " ",
                G = t.span ? "span" : "div", $ = t.type || t.split || "chars,words,lines",
                q = s && -1 !== $.indexOf("lines") ? [] : null, z = -1 !== $.indexOf("words"),
                D = -1 !== $.indexOf("chars"), F = "absolute" === t.position || t.absolute === !0, I = t.linesClass,
                P = -1 !== (I || "").indexOf("++"), Q = [];
            for (q && 1 === e.children.length && e.children[0]._isSplit && (e = e.children[0]), P && (I = I.split("++").join("")), h = e.getElementsByTagName("*"), u = h.length, c = [], a = 0; u > a; a++) c[a] = h[a];
            if (q || F) for (a = 0; u > a; a++) f = c[a], g = f.parentNode === e, (g || F || D && !z) && (_ = f.offsetTop, q && g && Math.abs(_ - T) > E && ("BR" !== f.nodeName || 0 === a) && (y = [], q.push(y), T = _), F && (f._x = f.offsetLeft, f._y = _, f._w = f.offsetWidth, f._h = f.offsetHeight), q && ((f._isSplit && g || !D && g || z && g || !z && f.parentNode.parentNode === e && !f.parentNode._isSplit) && (y.push(f), f._x -= C, L(f, e, M) && (f._wordEnd = !0)), "BR" === f.nodeName && (f.nextSibling && "BR" === f.nextSibling.nodeName || 0 === a) && q.push([])));
            for (a = 0; u > a; a++) f = c[a], g = f.parentNode === e, "BR" !== f.nodeName ? (F && (S = f.style, z || g || (f._x += f.parentNode._x, f._y += f.parentNode._y), S.left = f._x + "px", S.top = f._y + "px", S.position = "absolute", S.display = "block", S.width = f._w + 1 + "px", S.height = f._h + "px"), !z && D ? f._isSplit ? (f._next = f.nextSibling, f.parentNode.appendChild(f)) : f.parentNode._isSplit ? (f._parent = f.parentNode, !f.previousSibling && f.firstChild && (f.firstChild._isFirst = !0), f.nextSibling && " " === f.nextSibling.textContent && !f.nextSibling.nextSibling && Q.push(f.nextSibling), f._next = f.nextSibling && f.nextSibling._isFirst ? null : f.nextSibling, f.parentNode.removeChild(f), c.splice(a--, 1), u--) : g || (_ = !f.nextSibling && L(f.parentNode, e, M), f.parentNode._parent && f.parentNode._parent.appendChild(f), _ && f.parentNode.appendChild(r.createTextNode(" ")), t.span && (f.style.display = "inline"), O.push(f)) : f.parentNode._isSplit && !f._isSplit && "" !== f.innerHTML ? R.push(f) : D && !f._isSplit && (t.span && (f.style.display = "inline"), O.push(f))) : q || F ? (f.parentNode && f.parentNode.removeChild(f), c.splice(a--, 1), u--) : z || e.appendChild(f);
            for (a = Q.length; --a > -1;) Q[a].parentNode.removeChild(Q[a]);
            if (q) {
                for (F && (v = r.createElement(G), e.appendChild(v), b = v.offsetWidth + "px", _ = v.offsetParent === e ? 0 : e.offsetLeft, e.removeChild(v)), S = e.style.cssText, e.style.cssText = "display:none;"; e.firstChild;) e.removeChild(e.firstChild);
                for (x = " " === M && (!F || !z && !D), a = 0; a < q.length; a++) {
                    for (y = q[a], v = r.createElement(G), v.style.cssText = "display:block;text-align:" + k + ";position:" + (F ? "absolute;" : "relative;"), I && (v.className = I + (P ? a + 1 : "")), j.push(v), u = y.length, h = 0; u > h; h++) "BR" !== y[h].nodeName && (f = y[h], v.appendChild(f), x && f._wordEnd && v.appendChild(r.createTextNode(" ")), F && (0 === h && (v.style.top = f._y + "px", v.style.left = C + _ + "px"), f.style.top = "0px", _ && (f.style.left = f._x - _ + "px")));
                    0 === u ? v.innerHTML = "&nbsp;" : z || D || (B(v), N(v, String.fromCharCode(160), " ")), F && (v.style.width = b, v.style.height = f._h + "px"), e.appendChild(v)
                }
                e.style.cssText = S
            }
            F && (p > e.clientHeight && (e.style.height = p - W + "px", e.clientHeight < p && (e.style.height = p + A + "px")), o > e.clientWidth && (e.style.width = o - H + "px", e.clientWidth < o && (e.style.width = o + V + "px"))), w(i, O), w(n, R), w(s, j)
        }, W = function (e, t, i, n) {
            var l, o, d, p, a, g, _, m, C, T = t.span ? "span" : "div", w = t.type || t.split || "chars,words,lines",
                A = -1 !== w.indexOf("chars"), L = "absolute" === t.position || t.absolute === !0,
                B = t.wordDelimiter || " ", V = " " !== B ? "" : L ? "&#173; " : " ", W = t.span ? "</span>" : "</div>",
                H = !0, E = r.createElement("div"), k = e.parentNode;
            for (k.insertBefore(E, e), E.textContent = e.nodeValue, k.removeChild(e), e = E, l = s(e), _ = -1 !== l.indexOf("<"), t.reduceWhiteSpace !== !1 && (l = l.replace(u, " ").replace(h, "")), _ && (l = l.split("<").join("{{LT}}")), a = l.length, o = (" " === l.charAt(0) ? V : "") + i(), d = 0; a > d; d++) if (g = l.charAt(d), g === B && l.charAt(d - 1) !== B && d) {
                for (o += H ? W : "", H = !1; l.charAt(d + 1) === B;) o += V, d++;
                d === a - 1 ? o += V : ")" !== l.charAt(d + 1) && (o += V + i(), H = !0)
            } else "{" === g && "{{LT}}" === l.substr(d, 6) ? (o += A ? n() + "{{LT}}</" + T + ">" : "{{LT}}", d += 5) : g.charCodeAt(0) >= f && g.charCodeAt(0) <= c || l.charCodeAt(d + 1) >= 65024 && l.charCodeAt(d + 1) <= 65039 ? (m = b(l.substr(d, 2)), C = b(l.substr(d + 2, 2)), p = (y > m || m > x || y > C || C > x) && (S > C || C > v) ? 2 : 4, o += A && " " !== g ? n() + l.substr(d, p) + "</" + T + ">" : l.substr(d, p), d += p - 1) : o += A && " " !== g ? n() + g + "</" + T + ">" : g;
            e.outerHTML = o + (H ? W : ""), _ && N(k, "{{LT}}", "<")
        }, H = function (e, t, i, n) {
            var s, r, l = A(e.childNodes), o = l.length, p = "absolute" === t.position || t.absolute === !0;
            if (3 !== e.nodeType || o > 1) {
                for (t.absolute = !1, s = 0; o > s; s++) r = l[s], (3 !== r.nodeType || /\S+/.test(r.nodeValue)) && (p && 3 !== r.nodeType && "inline" === d(r, "display", null, !0) && (r.style.display = "inline-block", r.style.position = "relative"), r._isSplit = !0, H(r, t, i, n));
                return t.absolute = p, void (e._isSplit = !0)
            }
            W(e, t, i, n)
        }, E = T.prototype;
    E.split = function (e) {
        this.isSplit && this.revert(), this.vars = e = e || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        var t, i, n, s = this.elements.length, r = e.span ? "span" : "div", l = C(e.wordsClass, r),
            o = C(e.charsClass, r);
        for (; --s > -1;) n = this.elements[s], this._originals[s] = n.innerHTML, t = n.clientHeight, i = n.clientWidth, H(n, e, l, o), V(n, e, this.chars, this.words, this.lines, i, t);
        return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
    }, E.revert = function () {
        if (!this._originals) throw"revert() call wasn't scoped properly.";
        var e = this._originals.length;
        for (; --e > -1;) this.elements[e].innerHTML = this._originals[e];
        return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
    }, T.selector = e.$ || e.jQuery || function (t) {
        var i = e.$ || e.jQuery;
        return i ? (T.selector = i, i(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
    }, T.version = "0.5.8"
}(_gsScope), function (e) {
    "use strict";
    var t = function () {
        return (_gsScope.GreenSockGlobals || _gsScope)[e]
    };
    "undefined" != typeof module && module.exports ? module.exports = t() : "function" == typeof define && define.amd && define([], t)
}("SplitText");

/*!
 * TweenMax
 * VERSION: 1.14.2
 * DATE: 2014-10-29
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
        var s = function (t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++])) ;
            return i
        }, r = function (t, e, s) {
            i.call(this, t, e, s), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
        }, n = 1e-10, a = i._internals, o = a.isSelector, h = a.isArray, l = r.prototype = i.to({}, .1, {}), _ = [];
        r.version = "1.14.2", l.constructor = r, l.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.lagSmoothing = i.lagSmoothing, r.ticker = i.ticker, r.render = i.render, l.invalidate = function () {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
        }, l.updateTo = function (t, e) {
            var s, r = this.ratio, n = this.vars.immediateRender || t.immediateRender;
            e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (s in t) this.vars[s] = t[s];
            if (this._initted || n) if (e) this._initted = !1; else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                var a = this._time;
                this.render(0, !0, !1), this._initted = !1, this.render(a, !0, !1)
            } else if (this._time > 0 || n) {
                this._initted = !1, this._init();
                for (var o, h = 1 / (1 - r), l = this._firstPT; l;) o = l.s + l.c, l.c *= h, l.s = o - l.c, l = l._next
            }
            return this
        }, l.render = function (t, e, i) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var s, r, o, h, l, u, p, c, f = this._dirty ? this.totalDuration() : this._totalDuration, m = this._time,
                d = this._totalTime, g = this._cycle, v = this._duration, y = this._rawPrevTime;
            if (t >= f ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, r = "onComplete"), 0 === v && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > y || y === n) && y !== t && (i = !0, y > n && (r = "onReverseComplete")), this._rawPrevTime = c = !e || t || y === t ? t : n)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== d || 0 === v && y > 0 && y !== n) && (r = "onReverseComplete", s = this._reversed), 0 > t && (this._active = !1, 0 === v && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0), this._rawPrevTime = c = !e || t || y === t ? t : n)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (h = v + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : 0 > this._time && (this._time = 0)), this._easeType ? (l = this._time / v, u = this._easeType, p = this._easePower, (1 === u || 3 === u && l >= .5) && (l = 1 - l), 3 === u && (l *= 2), 1 === p ? l *= l : 2 === p ? l *= l * l : 3 === p ? l *= l * l * l : 4 === p && (l *= l * l * l * l), this.ratio = 1 === u ? 1 - l : 2 === u ? l : .5 > this._time / v ? l / 2 : 1 - l / 2) : this.ratio = this._ease.getRatio(this._time / v)), m === this._time && !i && g === this._cycle) return d !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)), void 0;
            if (!this._initted) {
                if (this._init(), !this._initted || this._gc) return;
                if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = m, this._totalTime = d, this._rawPrevTime = y, this._cycle = g, a.lazyTweens.push(this), this._lazy = [t, e], void 0;
                this._time && !s ? this.ratio = this._ease.getRatio(this._time / v) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== m && t >= 0 && (this._active = !0), 0 === d && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
            this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== d || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _)), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || _), 0 === v && this._rawPrevTime === n && c !== n && (this._rawPrevTime = 0))
        }, r.to = function (t, e, i) {
            return new r(t, e, i)
        }, r.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i)
        }, r.fromTo = function (t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new r(t, e, s)
        }, r.staggerTo = r.allTo = function (t, e, n, a, l, u, p) {
            a = a || 0;
            var c, f, m, d, g = n.delay || 0, v = [], y = function () {
                n.onComplete && n.onComplete.apply(n.onCompleteScope || this, arguments), l.apply(p || this, u || _)
            };
            for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = s(t))), t = t || [], 0 > a && (t = s(t), t.reverse(), a *= -1), c = t.length - 1, m = 0; c >= m; m++) {
                f = {};
                for (d in n) f[d] = n[d];
                f.delay = g, m === c && l && (f.onComplete = y), v[m] = new r(t[m], e, f), g += a
            }
            return v
        }, r.staggerFrom = r.allFrom = function (t, e, i, s, n, a, o) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, s, n, a, o)
        }, r.staggerFromTo = r.allFromTo = function (t, e, i, s, n, a, o, h) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, s, n, a, o, h)
        }, r.delayedCall = function (t, e, i, s, n) {
            return new r(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: s,
                immediateRender: !1,
                useFrames: n,
                overwrite: 0
            })
        }, r.set = function (t, e) {
            return new r(t, 0, e)
        }, r.isTweening = function (t) {
            return i.getTweensOf(t, !0).length > 0
        };
        var u = function (t, e) {
            for (var s = [], r = 0, n = t._first; n;) n instanceof i ? s[r++] = n : (e && (s[r++] = n), s = s.concat(u(n, e)), r = s.length), n = n._next;
            return s
        }, p = r.getAllTweens = function (e) {
            return u(t._rootTimeline, e).concat(u(t._rootFramesTimeline, e))
        };
        r.killAll = function (t, i, s, r) {
            null == i && (i = !0), null == s && (s = !0);
            var n, a, o, h = p(0 != r), l = h.length, _ = i && s && r;
            for (o = 0; l > o; o++) a = h[o], (_ || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
        }, r.killChildTweensOf = function (t, e) {
            if (null != t) {
                var n, l, _, u, p, c = a.tweenLookup;
                if ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = s(t)), h(t)) for (u = t.length; --u > -1;) r.killChildTweensOf(t[u], e); else {
                    n = [];
                    for (_ in c) for (l = c[_].target.parentNode; l;) l === t && (n = n.concat(c[_].tweens)), l = l.parentNode;
                    for (p = n.length, u = 0; p > u; u++) e && n[u].totalTime(n[u].totalDuration()), n[u]._enabled(!1, !1)
                }
            }
        };
        var c = function (t, i, s, r) {
            i = i !== !1, s = s !== !1, r = r !== !1;
            for (var n, a, o = p(r), h = i && s && r, l = o.length; --l > -1;) a = o[l], (h || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t)
        };
        return r.pauseAll = function (t, e, i) {
            c(!0, t, e, i)
        }, r.resumeAll = function (t, e, i) {
            c(!1, t, e, i)
        }, r.globalTimeScale = function (e) {
            var s = t._rootTimeline, r = i.ticker.time;
            return arguments.length ? (e = e || n, s._startTime = r - (r - s._startTime) * s._timeScale / e, s = t._rootFramesTimeline, r = i.ticker.frame, s._startTime = r - (r - s._startTime) * s._timeScale / e, s._timeScale = t._rootTimeline._timeScale = e, e) : s._timeScale
        }, l.progress = function (t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }, l.totalProgress = function (t) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
        }, l.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, l.duration = function (e) {
            return arguments.length ? t.prototype.duration.call(this, e) : this._duration
        }, l.totalDuration = function (t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, l.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, l.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, l.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, r
    }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
        var s = function (t) {
                e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                var i, s, r = this.vars;
                for (s in r) i = r[s], o(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
                o(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
            }, r = 1e-10, n = i._internals, a = n.isSelector, o = n.isArray, h = n.lazyTweens, l = n.lazyRender, _ = [],
            u = _gsScope._gsDefine.globals, p = function (t) {
                var e, i = {};
                for (e in t) i[e] = t[e];
                return i
            }, c = function (t, e, i, s) {
                var r = t._timeline._totalTime;
                (e || !this._forcingPlayhead) && (t._timeline.pause(t._startTime), e && e.apply(s || t._timeline, i || _), this._forcingPlayhead && t._timeline.seek(r))
            }, f = function (t) {
                var e, i = [], s = t.length;
                for (e = 0; e !== s; i.push(t[e++])) ;
                return i
            }, m = s.prototype = new e;
        return s.version = "1.14.2", m.constructor = s, m.kill()._gc = m._forcingPlayhead = !1, m.to = function (t, e, s, r) {
            var n = s.repeat && u.TweenMax || i;
            return e ? this.add(new n(t, e, s), r) : this.set(t, s, r)
        }, m.from = function (t, e, s, r) {
            return this.add((s.repeat && u.TweenMax || i).from(t, e, s), r)
        }, m.fromTo = function (t, e, s, r, n) {
            var a = r.repeat && u.TweenMax || i;
            return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
        }, m.staggerTo = function (t, e, r, n, o, h, l, _) {
            var u, c = new s({
                onComplete: h,
                onCompleteParams: l,
                onCompleteScope: _,
                smoothChildTiming: this.smoothChildTiming
            });
            for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = f(t)), n = n || 0, 0 > n && (t = f(t), t.reverse(), n *= -1), u = 0; t.length > u; u++) r.startAt && (r.startAt = p(r.startAt)), c.to(t[u], e, p(r), u * n);
            return this.add(c, o)
        }, m.staggerFrom = function (t, e, i, s, r, n, a, o) {
            return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
        }, m.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
        }, m.call = function (t, e, s, r) {
            return this.add(i.delayedCall(0, t, e, s), r)
        }, m.set = function (t, e, s) {
            return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
        }, s.exportRoot = function (t, e) {
            t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var r, n, a = new s(t), o = a._timeline;
            for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
            return o.add(a, 0), a
        }, m.add = function (r, n, a, h) {
            var l, _, u, p, c, f;
            if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
                if (r instanceof Array || r && r.push && o(r)) {
                    for (a = a || "normal", h = h || 0, l = n, _ = r.length, u = 0; _ > u; u++) o(p = r[u]) && (p = new s({tweens: p})), this.add(p, l), "string" != typeof p && "function" != typeof p && ("sequence" === a ? l = p._startTime + p.totalDuration() / p._timeScale : "start" === a && (p._startTime -= p.delay())), l += h;
                    return this._uncache(!0)
                }
                if ("string" == typeof r) return this.addLabel(r, n);
                if ("function" != typeof r) throw"Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r)
            }
            if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (c = this, f = c.rawTime() > r._startTime; c._timeline;) f && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1), c = c._timeline;
            return this
        }, m.remove = function (e) {
            if (e instanceof t) return this._remove(e, !1);
            if (e instanceof Array || e && e.push && o(e)) {
                for (var i = e.length; --i > -1;) this.remove(e[i]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }, m._remove = function (t, i) {
            e.prototype._remove.call(this, t, i);
            var s = this._last;
            return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, m.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }, m.insert = m.insertMultiple = function (t, e, i, s) {
            return this.add(t, e || 0, i, s)
        }, m.appendMultiple = function (t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
        }, m.addLabel = function (t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e), this
        }, m.addPause = function (t, e, i, s) {
            return this.call(c, ["{self}", e, i, s], this, t)
        }, m.removeLabel = function (t) {
            return delete this._labels[t], this
        }, m.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }, m._parseTimeOrLabel = function (e, i, s, r) {
            var n;
            if (r instanceof t && r.timeline === this) this.remove(r); else if (r && (r instanceof Array || r.push && o(r))) for (n = r.length; --n > -1;) r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
            if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
            if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration()); else {
                if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
            }
            return Number(e) + i
        }, m.seek = function (t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
        }, m.stop = function () {
            return this.paused(!0)
        }, m.gotoAndPlay = function (t, e) {
            return this.play(t, e)
        }, m.gotoAndStop = function (t, e) {
            return this.pause(t, e)
        }, m.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, n, a, o, u, p = this._dirty ? this.totalDuration() : this._totalDuration, c = this._time,
                f = this._startTime, m = this._timeScale, d = this._paused;
            if (t >= p ? (this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (u = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = p + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== c || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (u = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (u = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== c && this._first || i || u) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== c && t > 0 && (this._active = !0), 0 === c && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _)), this._time >= c) for (s = this._first; s && (a = s._next, !this._paused || d);) (s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a; else for (s = this._last; s && (a = s._prev, !this._paused || d);) (s._active || c >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                this._onUpdate && (e || (h.length && l(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _))), o && (this._gc || (f === this._startTime || m !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (n && (h.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || _)))
            }
        }, m._hasPausedChild = function () {
            for (var t = this._first; t;) {
                if (t._paused || t instanceof s && t._hasPausedChild()) return !0;
                t = t._next
            }
            return !1
        }, m.getChildren = function (t, e, s, r) {
            r = r || -9999999999;
            for (var n = [], a = this._first, o = 0; a;) r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
            return n
        }, m.getTweensOf = function (t, e) {
            var s, r, n = this._gc, a = [], o = 0;
            for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;) (s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
            return n && this._enabled(!1, !0), a
        }, m.recent = function () {
            return this._recent
        }, m._contains = function (t) {
            for (var e = t.timeline; e;) {
                if (e === this) return !0;
                e = e.timeline
            }
            return !1
        }, m.shiftChildren = function (t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
            if (e) for (s in n) n[s] >= i && (n[s] += t);
            return this._uncache(!0)
        }, m._kill = function (t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;) i[s]._kill(t, e) && (r = !0);
            return r
        }, m.clear = function (t) {
            var e = this.getChildren(!1, !0, !0), i = e.length;
            for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
            return t !== !1 && (this._labels = {}), this._uncache(!0)
        }, m.invalidate = function () {
            for (var e = this._first; e;) e.invalidate(), e = e._next;
            return t.prototype.invalidate.call(this)
        }, m._enabled = function (t, i) {
            if (t === this._gc) for (var s = this._first; s;) s._enabled(t, !0), s = s._next;
            return e.prototype._enabled.call(this, t, i)
        }, m.totalTime = function () {
            this._forcingPlayhead = !0;
            var e = t.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, e
        }, m.duration = function (t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
        }, m.totalDuration = function (t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, s = 0, r = this._last, n = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
                    this._duration = this._totalDuration = s, this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
        }, m.usesFrames = function () {
            for (var e = this._timeline; e._timeline;) e = e._timeline;
            return e === t._rootFramesTimeline
        }, m.rawTime = function () {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, s
    }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (t, e, i) {
        var s = function (e) {
                t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
            }, r = 1e-10, n = [], a = e._internals, o = a.lazyTweens, h = a.lazyRender, l = new i(null, null, 1, 0),
            _ = s.prototype = new t;
        return _.constructor = s, _.kill()._gc = !1, s.version = "1.14.2", _.invalidate = function () {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
        }, _.addCallback = function (t, i, s, r) {
            return this.add(e.delayedCall(0, t, s, r), i)
        }, _.removeCallback = function (t, e) {
            if (t) if (null == e) this._kill(null, t); else for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1;) i[s]._startTime === r && i[s]._enabled(!1, !1);
            return this
        }, _.tweenTo = function (t, i) {
            i = i || {};
            var s, r, a, o = {ease: l, overwrite: i.delay ? 2 : 1, useFrames: this.usesFrames(), immediateRender: !1};
            for (r in i) o[r] = i[r];
            return o.time = this._parseTimeOrLabel(t), s = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, a = new e(this, s, o), o.onStart = function () {
                a.target.paused(!0), a.vars.time !== a.target.time() && s === a.duration() && a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || a, i.onStartParams || n)
            }, a
        }, _.tweenFromTo = function (t, e, i) {
            i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                onCompleteScope: this
            }, i.immediateRender = i.immediateRender !== !1;
            var s = this.tweenTo(e, i);
            return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
        }, _.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, a, l, _, u, p, c = this._dirty ? this.totalDuration() : this._totalDuration, f = this._duration,
                m = this._time, d = this._totalTime, g = this._startTime, v = this._timeScale, y = this._rawPrevTime,
                T = this._paused, w = this._cycle;
            if (t >= c ? (this._locked || (this._totalTime = c, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (a = !0, _ = "onComplete", 0 === this._duration && (0 === t || 0 > y || y === r) && y !== t && this._first && (u = !0, y > r && (_ = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = f, t = f + 1e-4)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== m || 0 === f && y !== r && (y > 0 || 0 > t && y >= 0) && !this._locked) && (_ = "onReverseComplete", a = this._reversed), 0 > t ? (this._active = !1, y >= 0 && this._first && (u = !0), this._rawPrevTime = t) : (this._rawPrevTime = f || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (u = !0))) : (0 === f && 0 > y && (u = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (p = f + this._repeatDelay, this._cycle = this._totalTime / p >> 0, 0 !== this._cycle && this._cycle === this._totalTime / p && this._cycle--, this._time = this._totalTime - this._cycle * p, this._yoyo && 0 !== (1 & this._cycle) && (this._time = f - this._time), this._time > f ? (this._time = f, t = f + 1e-4) : 0 > this._time ? this._time = t = 0 : t = this._time))), this._cycle !== w && !this._locked) {
                var x = this._yoyo && 0 !== (1 & w), b = x === (this._yoyo && 0 !== (1 & this._cycle)),
                    P = this._totalTime, S = this._cycle, k = this._rawPrevTime, R = this._time;
                if (this._totalTime = w * f, w > this._cycle ? x = !x : this._totalTime += f, this._time = m, this._rawPrevTime = 0 === f ? y - 1e-4 : y, this._cycle = w, this._locked = !0, m = x ? 0 : f, this.render(m, e, 0 === f), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || n), b && (m = x ? f + 1e-4 : -1e-4, this.render(m, !0, !1)), this._locked = !1, this._paused && !T) return;
                this._time = R, this._totalTime = P, this._cycle = S, this._rawPrevTime = k
            }
            if (!(this._time !== m && this._first || i || u)) return d !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n)), void 0;
            if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== d && t > 0 && (this._active = !0), 0 === d && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || n)), this._time >= m) for (s = this._first; s && (l = s._next, !this._paused || T);) (s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = l; else for (s = this._last; s && (l = s._prev, !this._paused || T);) (s._active || m >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = l;
            this._onUpdate && (e || (o.length && h(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n))), _ && (this._locked || this._gc || (g === this._startTime || v !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (a && (o.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[_] && this.vars[_].apply(this.vars[_ + "Scope"] || this, this.vars[_ + "Params"] || n)))
        }, _.getActive = function (t, e, i) {
            null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
            var s, r, n = [], a = this.getChildren(t, e, i), o = 0, h = a.length;
            for (s = 0; h > s; s++) r = a[s], r.isActive() && (n[o++] = r);
            return n
        }, _.getLabelAfter = function (t) {
            t || 0 !== t && (t = this._time);
            var e, i = this.getLabelsArray(), s = i.length;
            for (e = 0; s > e; e++) if (i[e].time > t) return i[e].name;
            return null
        }, _.getLabelBefore = function (t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1;) if (t > e[i].time) return e[i].name;
            return null
        }, _.getLabelsArray = function () {
            var t, e = [], i = 0;
            for (t in this._labels) e[i++] = {time: this._labels[t], name: t};
            return e.sort(function (t, e) {
                return t.time - e.time
            }), e
        }, _.progress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
        }, _.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
        }, _.totalDuration = function (e) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, _.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, _.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, _.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, _.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, _.currentLabel = function (t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
        }, s
    }, !0), function () {
        var t = 180 / Math.PI, e = [], i = [], s = [], r = {}, n = function (t, e, i, s) {
                this.a = t, this.b = e, this.c = i, this.d = s, this.da = s - t, this.ca = i - t, this.ba = e - t
            },
            a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            o = function (t, e, i, s) {
                var r = {a: t}, n = {}, a = {}, o = {c: s}, h = (t + e) / 2, l = (e + i) / 2, _ = (i + s) / 2,
                    u = (h + l) / 2, p = (l + _) / 2, c = (p - u) / 8;
                return r.b = h + (t - h) / 4, n.b = u + c, r.c = n.a = (r.b + n.b) / 2, n.c = a.a = (u + p) / 2, a.b = p - c, o.b = _ + (s - _) / 4, a.c = o.a = (a.b + o.b) / 2, [r, n, a, o]
            }, h = function (t, r, n, a, h) {
                var l, _, u, p, c, f, m, d, g, v, y, T, w, x = t.length - 1, b = 0, P = t[0].a;
                for (l = 0; x > l; l++) c = t[b], _ = c.a, u = c.d, p = t[b + 1].d, h ? (y = e[l], T = i[l], w = .25 * (T + y) * r / (a ? .5 : s[l] || .5), f = u - (u - _) * (a ? .5 * r : 0 !== y ? w / y : 0), m = u + (p - u) * (a ? .5 * r : 0 !== T ? w / T : 0), d = u - (f + ((m - f) * (3 * y / (y + T) + .5) / 4 || 0))) : (f = u - .5 * (u - _) * r, m = u + .5 * (p - u) * r, d = u - (f + m) / 2), f += d, m += d, c.c = g = f, c.b = 0 !== l ? P : P = c.a + .6 * (c.c - c.a), c.da = u - _, c.ca = g - _, c.ba = P - _, n ? (v = o(_, P, g, u), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = m;
                c = t[b], c.b = P, c.c = P + .4 * (c.d - P), c.da = c.d - c.a, c.ca = c.c - c.a, c.ba = P - c.a, n && (v = o(c.a, P, c.c, c.d), t.splice(b, 1, v[0], v[1], v[2], v[3]))
            }, l = function (t, s, r, a) {
                var o, h, l, _, u, p, c = [];
                if (a) for (t = [a].concat(t), h = t.length; --h > -1;) "string" == typeof (p = t[h][s]) && "=" === p.charAt(1) && (t[h][s] = a[s] + Number(p.charAt(0) + p.substr(2)));
                if (o = t.length - 2, 0 > o) return c[0] = new n(t[0][s], 0, 0, t[-1 > o ? 0 : 1][s]), c;
                for (h = 0; o > h; h++) l = t[h][s], _ = t[h + 1][s], c[h] = new n(l, 0, 0, _), r && (u = t[h + 2][s], e[h] = (e[h] || 0) + (_ - l) * (_ - l), i[h] = (i[h] || 0) + (u - _) * (u - _));
                return c[h] = new n(t[h][s], 0, 0, t[h + 1][s]), c
            }, _ = function (t, n, o, _, u, p) {
                var c, f, m, d, g, v, y, T, w = {}, x = [], b = p || t[0];
                u = "string" == typeof u ? "," + u + "," : a, null == n && (n = 1);
                for (f in t[0]) x.push(f);
                if (t.length > 1) {
                    for (T = t[t.length - 1], y = !0, c = x.length; --c > -1;) if (f = x[c], Math.abs(b[f] - T[f]) > .05) {
                        y = !1;
                        break
                    }
                    y && (t = t.concat(), p && t.unshift(p), t.push(t[1]), p = t[t.length - 3])
                }
                for (e.length = i.length = s.length = 0, c = x.length; --c > -1;) f = x[c], r[f] = -1 !== u.indexOf("," + f + ","), w[f] = l(t, f, r[f], p);
                for (c = e.length; --c > -1;) e[c] = Math.sqrt(e[c]), i[c] = Math.sqrt(i[c]);
                if (!_) {
                    for (c = x.length; --c > -1;) if (r[f]) for (m = w[x[c]], v = m.length - 1, d = 0; v > d; d++) g = m[d + 1].da / i[d] + m[d].da / e[d], s[d] = (s[d] || 0) + g * g;
                    for (c = s.length; --c > -1;) s[c] = Math.sqrt(s[c])
                }
                for (c = x.length, d = o ? 4 : 1; --c > -1;) f = x[c], m = w[f], h(m, n, o, _, r[f]), y && (m.splice(0, d), m.splice(m.length - d, d));
                return w
            }, u = function (t, e, i) {
                e = e || "soft";
                var s, r, a, o, h, l, _, u, p, c, f, m = {}, d = "cubic" === e ? 3 : 2, g = "soft" === e, v = [];
                if (g && i && (t = [i].concat(t)), null == t || d + 1 > t.length) throw"invalid Bezier data";
                for (p in t[0]) v.push(p);
                for (l = v.length; --l > -1;) {
                    for (p = v[l], m[p] = h = [], c = 0, u = t.length, _ = 0; u > _; _++) s = null == i ? t[_][p] : "string" == typeof (f = t[_][p]) && "=" === f.charAt(1) ? i[p] + Number(f.charAt(0) + f.substr(2)) : Number(f), g && _ > 1 && u - 1 > _ && (h[c++] = (s + h[c - 2]) / 2), h[c++] = s;
                    for (u = c - d + 1, c = 0, _ = 0; u > _; _ += d) s = h[_], r = h[_ + 1], a = h[_ + 2], o = 2 === d ? 0 : h[_ + 3], h[c++] = f = 3 === d ? new n(s, r, a, o) : new n(s, (2 * r + s) / 3, (2 * r + a) / 3, a);
                    h.length = c
                }
                return m
            }, p = function (t, e, i) {
                for (var s, r, n, a, o, h, l, _, u, p, c, f = 1 / i, m = t.length; --m > -1;) for (p = t[m], n = p.a, a = p.d - n, o = p.c - n, h = p.b - n, s = r = 0, _ = 1; i >= _; _++) l = f * _, u = 1 - l, s = r - (r = (l * l * a + 3 * u * (l * o + u * h)) * l), c = m * i + _ - 1, e[c] = (e[c] || 0) + s * s
            }, c = function (t, e) {
                e = e >> 0 || 6;
                var i, s, r, n, a = [], o = [], h = 0, l = 0, _ = e - 1, u = [], c = [];
                for (i in t) p(t[i], a, e);
                for (r = a.length, s = 0; r > s; s++) h += Math.sqrt(a[s]), n = s % e, c[n] = h, n === _ && (l += h, n = s / e >> 0, u[n] = c, o[n] = l, h = 0, c = []);
                return {length: l, lengths: o, segments: u}
            }, f = _gsScope._gsDefine.plugin({
                propName: "bezier", priority: -1, version: "1.3.3", API: 2, global: !0, init: function (t, e, i) {
                    this._target = t, e instanceof Array && (e = {values: e}), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                    var s, r, n, a, o, h = e.values || [], l = {}, p = h[0], f = e.autoRotate || i.vars.orientToBezier;
                    this._autoRotate = f ? f instanceof Array ? f : [["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]] : null;
                    for (s in p) this._props.push(s);
                    for (n = this._props.length; --n > -1;) s = this._props[n], this._overwriteProps.push(s), r = this._func[s] = "function" == typeof t[s], l[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), o || l[s] !== h[0][s] && (o = l);
                    if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? _(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : u(h, e.type, l), this._segCount = this._beziers[s].length, this._timeRes) {
                        var m = c(this._beziers, this._timeRes);
                        this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                    }
                    if (f = this._autoRotate) for (this._initialRotations = [], f[0] instanceof Array || (this._autoRotate = f = [f]), n = f.length; --n > -1;) {
                        for (a = 0; 3 > a; a++) s = f[n][a], this._func[s] = "function" == typeof t[s] ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)] : !1;
                        s = f[n][2], this._initialRotations[n] = this._func[s] ? this._func[s].call(this._target) : this._target[s]
                    }
                    return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                }, set: function (e) {
                    var i, s, r, n, a, o, h, l, _, u, p = this._segCount, c = this._func, f = this._target,
                        m = e !== this._startRatio;
                    if (this._timeRes) {
                        if (_ = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && p - 1 > r) {
                            for (l = p - 1; l > r && e >= (this._l2 = _[++r]);) ;
                            this._l1 = _[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
                        } else if (this._l1 > e && r > 0) {
                            for (; r > 0 && (this._l1 = _[--r]) >= e;) ;
                            0 === r && this._l1 > e ? this._l1 = 0 : r++, this._l2 = _[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
                        }
                        if (i = r, e -= this._l1, r = this._si, e > this._s2 && u.length - 1 > r) {
                            for (l = u.length - 1; l > r && e >= (this._s2 = u[++r]);) ;
                            this._s1 = u[r - 1], this._si = r
                        } else if (this._s1 > e && r > 0) {
                            for (; r > 0 && (this._s1 = u[--r]) >= e;) ;
                            0 === r && this._s1 > e ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
                        }
                        o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                    } else i = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0, o = (e - i * (1 / p)) * p;
                    for (s = 1 - o, r = this._props.length; --r > -1;) n = this._props[r], a = this._beziers[n][i], h = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a, this._round[n] && (h = Math.round(h)), c[n] ? f[n](h) : f[n] = h;
                    if (this._autoRotate) {
                        var d, g, v, y, T, w, x, b = this._autoRotate;
                        for (r = b.length; --r > -1;) n = b[r][2], w = b[r][3] || 0, x = b[r][4] === !0 ? 1 : t, a = this._beziers[b[r][0]], d = this._beziers[b[r][1]], a && d && (a = a[i], d = d[i], g = a.a + (a.b - a.a) * o, y = a.b + (a.c - a.b) * o, g += (y - g) * o, y += (a.c + (a.d - a.c) * o - y) * o, v = d.a + (d.b - d.a) * o, T = d.b + (d.c - d.b) * o, v += (T - v) * o, T += (d.c + (d.d - d.c) * o - T) * o, h = m ? Math.atan2(T - v, y - g) * x + w : this._initialRotations[r], c[n] ? f[n](h) : f[n] = h)
                    }
                }
            }), m = f.prototype;
        f.bezierThrough = _, f.cubicToQuadratic = o, f._autoCSS = !0, f.quadraticToCubic = function (t, e, i) {
            return new n(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
        }, f._cssRegister = function () {
            var t = _gsScope._gsDefine.globals.CSSPlugin;
            if (t) {
                var e = t._internals, i = e._parseToProxy, s = e._setPluginRatio, r = e.CSSPropTween;
                e._registerComplexSpecialProp("bezier", {
                    parser: function (t, e, n, a, o, h) {
                        e instanceof Array && (e = {values: e}), h = new f;
                        var l, _, u, p = e.values, c = p.length - 1, m = [], d = {};
                        if (0 > c) return o;
                        for (l = 0; c >= l; l++) u = i(t, p[l], a, o, h, c !== l), m[l] = u.end;
                        for (_ in e) d[_] = e[_];
                        return d.values = m, o = new r(t, "bezier", 0, 0, u.pt, 2), o.data = u, o.plugin = h, o.setRatio = s, 0 === d.autoRotate && (d.autoRotate = !0), !d.autoRotate || d.autoRotate instanceof Array || (l = d.autoRotate === !0 ? 0 : Number(d.autoRotate), d.autoRotate = null != u.end.left ? [["left", "top", "rotation", l, !1]] : null != u.end.x ? [["x", "y", "rotation", l, !1]] : !1), d.autoRotate && (a._transform || a._enableTransforms(!1), u.autoRotate = a._target._gsTransform), h._onInitTween(u.proxy, d, a._tween), o
                    }
                })
            }
        }, m._roundProps = function (t, e) {
            for (var i = this._overwriteProps, s = i.length; --s > -1;) (t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e)
        }, m._kill = function (t) {
            var e, i, s = this._props;
            for (e in this._beziers) if (e in t) for (delete this._beziers[e], delete this._func[e], i = s.length; --i > -1;) s[i] === e && s.splice(i, 1);
            return this._super._kill.call(this, t)
        }
    }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
        var i, s, r, n, a = function () {
            t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
        }, o = {}, h = a.prototype = new t("css");
        h.constructor = a, a.version = "1.14.2", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", h = "px", a.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
            lineHeight: ""
        };
        var l, _, u, p, c, f, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            d = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, v = /(?![+-]?\d*\.?\d+|e[+-]\d+)[^0-9]/g,
            y = /(?:\d|\-|\+|=|#|\.)*/g, T = /opacity *= *([^)]*)/i, w = /opacity:([^;]*)/i,
            x = /alpha\(opacity *=.+?\)/i, b = /^(rgb|hsl)/, P = /([A-Z])/g, S = /-([a-z])/gi,
            k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, R = function (t, e) {
                return e.toUpperCase()
            }, A = /(?:Left|Right|Width)/i, C = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, D = /,(?=[^\)]*(?:\(|$))/gi, M = Math.PI / 180,
            z = 180 / Math.PI, I = {}, E = document, F = E.createElement("div"), L = E.createElement("img"),
            N = a._internals = {_specialProps: o}, X = navigator.userAgent, U = function () {
                var t, e = X.indexOf("Android"), i = E.createElement("div");
                return u = -1 !== X.indexOf("Safari") && -1 === X.indexOf("Chrome") && (-1 === e || Number(X.substr(e + 8, 1)) > 3), c = u && 6 > Number(X.substr(X.indexOf("Version/") + 8, 1)), p = -1 !== X.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)) && (f = parseFloat(RegExp.$1)), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", t = i.getElementsByTagName("a")[0], t ? /^0.55/.test(t.style.opacity) : !1
            }(), Y = function (t) {
                return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            }, j = function (t) {
                window.console && console.log(t)
            }, B = "", q = "", V = function (t, e) {
                e = e || F;
                var i, s, r = e.style;
                if (void 0 !== r[t]) return t;
                for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], s = 5; --s > -1 && void 0 === r[i[s] + t];) ;
                return s >= 0 ? (q = 3 === s ? "ms" : i[s], B = "-" + q.toLowerCase() + "-", q + t) : null
            }, G = E.defaultView ? E.defaultView.getComputedStyle : function () {
            }, W = a.getStyle = function (t, e, i, s, r) {
                var n;
                return U || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || G(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(P, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : Y(t)
            }, Z = N.convertToPixels = function (t, i, s, r, n) {
                if ("px" === r || !r) return s;
                if ("auto" === r || !s) return 0;
                var o, h, l, _ = A.test(i), u = t, p = F.style, c = 0 > s;
                if (c && (s = -s), "%" === r && -1 !== i.indexOf("border")) o = s / 100 * (_ ? t.clientWidth : t.clientHeight); else {
                    if (p.cssText = "border:0 solid red;position:" + W(t, "position") + ";line-height:0;", "%" !== r && u.appendChild) p[_ ? "borderLeftWidth" : "borderTopWidth"] = s + r; else {
                        if (u = t.parentNode || E.body, h = u._gsCache, l = e.ticker.frame, h && _ && h.time === l) return h.width * s / 100;
                        p[_ ? "width" : "height"] = s + r
                    }
                    u.appendChild(F), o = parseFloat(F[_ ? "offsetWidth" : "offsetHeight"]), u.removeChild(F), _ && "%" === r && a.cacheWidths !== !1 && (h = u._gsCache = u._gsCache || {}, h.time = l, h.width = 100 * (o / s)), 0 !== o || n || (o = Z(t, i, s, r, !0))
                }
                return c ? -o : o
            }, Q = N.calculateOffset = function (t, e, i) {
                if ("absolute" !== W(t, "position", i)) return 0;
                var s = "left" === e ? "Left" : "Top", r = W(t, "margin" + s, i);
                return t["offset" + s] - (Z(t, e, parseFloat(r), r.replace(y, "")) || 0)
            }, $ = function (t, e) {
                var i, s, r = {};
                if (e = e || G(t, null)) if (i = e.length) for (; --i > -1;) r[e[i].replace(S, R)] = e.getPropertyValue(e[i]); else for (i in e) r[i] = e[i]; else if (e = t.currentStyle || t.style) for (i in e) "string" == typeof i && void 0 === r[i] && (r[i.replace(S, R)] = e[i]);
                return U || (r.opacity = Y(t)), s = Oe(t, e, !1), r.rotation = s.rotation, r.skewX = s.skewX, r.scaleX = s.scaleX, r.scaleY = s.scaleY, r.x = s.x, r.y = s.y, be && (r.z = s.z, r.rotationX = s.rotationX, r.rotationY = s.rotationY, r.scaleZ = s.scaleZ), r.filters && delete r.filters, r
            }, H = function (t, e, i, s, r) {
                var n, a, o, h = {}, l = t.style;
                for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (h[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(v, "") ? n : 0 : Q(t, a), void 0 !== l[a] && (o = new ue(l, a, l[a], o)));
                if (s) for (a in s) "className" !== a && (h[a] = s[a]);
                return {difs: h, firstMPT: o}
            }, K = {width: ["Left", "Right"], height: ["Top", "Bottom"]},
            J = ["marginLeft", "marginRight", "marginTop", "marginBottom"], te = function (t, e, i) {
                var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight), r = K[e], n = r.length;
                for (i = i || G(t, null); --n > -1;) s -= parseFloat(W(t, "padding" + r[n], i, !0)) || 0, s -= parseFloat(W(t, "border" + r[n] + "Width", i, !0)) || 0;
                return s
            }, ee = function (t, e) {
                (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                var i = t.split(" "), s = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                    r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                return null == r ? r = "0" : "center" === r && (r = "50%"), ("center" === s || isNaN(parseFloat(s)) && -1 === (s + "").indexOf("=")) && (s = "50%"), e && (e.oxp = -1 !== s.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === s.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(s.replace(v, "")), e.oy = parseFloat(r.replace(v, ""))), s + " " + r + (i.length > 2 ? " " + i[2] : "")
            }, ie = function (t, e) {
                return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
            }, se = function (t, e) {
                return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
            }, re = function (t, e, i, s) {
                var r, n, a, o, h = 1e-6;
                return null == t ? o = e : "number" == typeof t ? o = t : (r = 360, n = t.split("_"), a = Number(n[0].replace(v, "")) * (-1 === t.indexOf("rad") ? 1 : z) - ("=" === t.charAt(1) ? 0 : e), n.length && (s && (s[i] = e + a), -1 !== t.indexOf("short") && (a %= r, a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (0 | a / r) * r : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (0 | a / r) * r)), o = e + a), h > o && o > -h && (o = 0), o
            }, ne = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            }, ae = function (t, e, i) {
                return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
            }, oe = a.parseColor = function (t) {
                var e, i, s, r, n, a;
                return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ne[t] ? ne[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), s = t.charAt(3), t = "#" + e + e + i + i + s + s), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(m), r = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = ae(r + 1 / 3, e, i), t[1] = ae(r, e, i), t[2] = ae(r - 1 / 3, e, i), t) : (t = t.match(m) || ne.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : ne.black
            }, he = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (h in ne) he += "|" + h + "\\b";
        he = RegExp(he + ")", "gi");
        var le = function (t, e, i, s) {
            if (null == t) return function (t) {
                return t
            };
            var r, n = e ? (t.match(he) || [""])[0] : "", a = t.split(n).join("").match(g) || [],
                o = t.substr(0, t.indexOf(a[0])), h = ")" === t.charAt(t.length - 1) ? ")" : "",
                l = -1 !== t.indexOf(" ") ? " " : ",", _ = a.length, u = _ > 0 ? a[0].replace(m, "") : "";
            return _ ? r = e ? function (t) {
                var e, p, c, f;
                if ("number" == typeof t) t += u; else if (s && D.test(t)) {
                    for (f = t.replace(D, "|").split("|"), c = 0; f.length > c; c++) f[c] = r(f[c]);
                    return f.join(",")
                }
                if (e = (t.match(he) || [n])[0], p = t.split(e).join("").match(g) || [], c = p.length, _ > c--) for (; _ > ++c;) p[c] = i ? p[0 | (c - 1) / 2] : a[c];
                return o + p.join(l) + l + e + h + (-1 !== t.indexOf("inset") ? " inset" : "")
            } : function (t) {
                var e, n, p;
                if ("number" == typeof t) t += u; else if (s && D.test(t)) {
                    for (n = t.replace(D, "|").split("|"), p = 0; n.length > p; p++) n[p] = r(n[p]);
                    return n.join(",")
                }
                if (e = t.match(g) || [], p = e.length, _ > p--) for (; _ > ++p;) e[p] = i ? e[0 | (p - 1) / 2] : a[p];
                return o + e.join(l) + h
            } : function (t) {
                return t
            }
        }, _e = function (t) {
            return t = t.split(","), function (e, i, s, r, n, a, o) {
                var h, l = (i + "").split(" ");
                for (o = {}, h = 0; 4 > h; h++) o[t[h]] = l[h] = l[h] || l[(h - 1) / 2 >> 0];
                return r.parse(e, o, n, a)
            }
        }, ue = (N._setPluginRatio = function (t) {
            this.plugin.setRatio(t);
            for (var e, i, s, r, n = this.data, a = n.proxy, o = n.firstMPT, h = 1e-6; o;) e = a[o.v], o.r ? e = Math.round(e) : h > e && e > -h && (e = 0), o.t[o.p] = e, o = o._next;
            if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t) for (o = n.firstMPT; o;) {
                if (i = o.t, i.type) {
                    if (1 === i.type) {
                        for (r = i.xs0 + i.s + i.xs1, s = 1; i.l > s; s++) r += i["xn" + s] + i["xs" + (s + 1)];
                        i.e = r
                    }
                } else i.e = i.s + i.xs0;
                o = o._next
            }
        }, function (t, e, i, s, r) {
            this.t = t, this.p = e, this.v = i, this.r = r, s && (s._prev = this, this._next = s)
        }), pe = (N._parseToProxy = function (t, e, i, s, r, n) {
            var a, o, h, l, _, u = s, p = {}, c = {}, f = i._transform, m = I;
            for (i._transform = null, I = e, s = _ = i.parse(t, e, s, r), I = m, n && (i._transform = f, u && (u._prev = null, u._prev && (u._prev._next = null))); s && s !== u;) {
                if (1 >= s.type && (o = s.p, c[o] = s.s + s.c, p[o] = s.s, n || (l = new ue(s, "s", o, l, s.r), s.c = 0), 1 === s.type)) for (a = s.l; --a > 0;) h = "xn" + a, o = s.p + "_" + h, c[o] = s.data[h], p[o] = s[h], n || (l = new ue(s, h, o, l, s.rxp[h]));
                s = s._next
            }
            return {proxy: p, end: c, firstMPT: l, pt: _}
        }, N.CSSPropTween = function (t, e, s, r, a, o, h, l, _, u, p) {
            this.t = t, this.p = e, this.s = s, this.c = r, this.n = h || e, t instanceof pe || n.push(this.n), this.r = l, this.type = o || 0, _ && (this.pr = _, i = !0), this.b = void 0 === u ? s : u, this.e = void 0 === p ? s + r : p, a && (this._next = a, a._prev = this)
        }), ce = a.parseComplex = function (t, e, i, s, r, n, a, o, h, _) {
            i = i || n || "", a = new pe(t, e, 0, 0, a, _ ? 2 : 1, null, !1, o, i, s), s += "";
            var u, p, c, f, g, v, y, T, w, x, P, S, k = i.split(", ").join(",").split(" "),
                R = s.split(", ").join(",").split(" "), A = k.length, C = l !== !1;
            for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (k = k.join(" ").replace(D, ", ").split(" "), R = R.join(" ").replace(D, ", ").split(" "), A = k.length), A !== R.length && (k = (n || "").split(" "), A = k.length), a.plugin = h, a.setRatio = _, u = 0; A > u; u++) if (f = k[u], g = R[u], T = parseFloat(f), T || 0 === T) a.appendXtra("", T, ie(g, T), g.replace(d, ""), C && -1 !== g.indexOf("px"), !0); else if (r && ("#" === f.charAt(0) || ne[f] || b.test(f))) S = "," === g.charAt(g.length - 1) ? ")," : ")", f = oe(f), g = oe(g), w = f.length + g.length > 6, w && !U && 0 === g[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(R[u]).join("transparent")) : (U || (w = !1), a.appendXtra(w ? "rgba(" : "rgb(", f[0], g[0] - f[0], ",", !0, !0).appendXtra("", f[1], g[1] - f[1], ",", !0).appendXtra("", f[2], g[2] - f[2], w ? "," : S, !0), w && (f = 4 > f.length ? 1 : f[3], a.appendXtra("", f, (4 > g.length ? 1 : g[3]) - f, S, !1))); else if (v = f.match(m)) {
                if (y = g.match(d), !y || y.length !== v.length) return a;
                for (c = 0, p = 0; v.length > p; p++) P = v[p], x = f.indexOf(P, c), a.appendXtra(f.substr(c, x - c), Number(P), ie(y[p], P), "", C && "px" === f.substr(x + P.length, 2), 0 === p), c = x + P.length;
                a["xs" + a.l] += f.substr(c)
            } else a["xs" + a.l] += a.l ? " " + f : f;
            if (-1 !== s.indexOf("=") && a.data) {
                for (S = a.xs0 + a.data.s, u = 1; a.l > u; u++) S += a["xs" + u] + a.data["xn" + u];
                a.e = S + a["xs" + u]
            }
            return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
        }, fe = 9;
        for (h = pe.prototype, h.l = h.pr = 0; --fe > 0;) h["xn" + fe] = 0, h["xs" + fe] = "";
        h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function (t, e, i, s, r, n) {
            var a = this, o = a.l;
            return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = s || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = r, a["xn" + o] = e, a.plugin || (a.xfirst = new pe(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {s: e + i}, a.rxp = {}, a.s = e, a.c = i, a.r = r, a)) : (a["xs" + o] += e + (s || ""), a)
        };
        var me = function (t, e) {
            e = e || {}, this.p = e.prefix ? V(t) || t : t, o[t] = o[this.p] = this, this.format = e.formatter || le(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
        }, de = N._registerComplexSpecialProp = function (t, e, i) {
            "object" != typeof e && (e = {parser: i});
            var s, r, n = t.split(","), a = e.defaultValue;
            for (i = i || [a], s = 0; n.length > s; s++) e.prefix = 0 === s && e.prefix, e.defaultValue = i[s] || a, r = new me(n[s], e)
        }, ge = function (t) {
            if (!o[t]) {
                var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                de(t, {
                    parser: function (t, i, s, r, n, a, h) {
                        var l = (_gsScope.GreenSockGlobals || _gsScope).com.greensock.plugins[e];
                        return l ? (l._cssRegister(), o[s].parse(t, i, s, r, n, a, h)) : (j("Error: " + e + " js file not loaded."), n)
                    }
                })
            }
        };
        h = me.prototype, h.parseComplex = function (t, e, i, s, r, n) {
            var a, o, h, l, _, u, p = this.keyword;
            if (this.multi && (D.test(i) || D.test(e) ? (o = e.replace(D, "|").split("|"), h = i.replace(D, "|").split("|")) : p && (o = [e], h = [i])), h) {
                for (l = h.length > o.length ? h.length : o.length, a = 0; l > a; a++) e = o[a] = o[a] || this.dflt, i = h[a] = h[a] || this.dflt, p && (_ = e.indexOf(p), u = i.indexOf(p), _ !== u && (i = -1 === u ? h : o, i[a] += " " + p));
                e = o.join(", "), i = h.join(", ")
            }
            return ce(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
        }, h.parse = function (t, e, i, s, n, a) {
            return this.parseComplex(t.style, this.format(W(t, this.p, r, !1, this.dflt)), this.format(e), n, a)
        }, a.registerSpecialProp = function (t, e, i) {
            de(t, {
                parser: function (t, s, r, n, a, o) {
                    var h = new pe(t, r, 0, 0, a, 2, r, !1, i);
                    return h.plugin = o, h.setRatio = e(t, s, n._tween, r), h
                }, priority: i
            })
        };
        var ve,
            ye = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
            Te = V("transform"), we = B + "transform", xe = V("transformOrigin"), be = null !== V("perspective"),
            Pe = N.Transform = function () {
                this.skewY = 0
            }, Se = window.SVGElement, ke = function (t, e, i) {
                var s, r = E.createElementNS("http://www.w3.org/2000/svg", t), n = /([a-z])([A-Z])/g;
                for (s in i) r.setAttributeNS(null, s.replace(n, "$1-$2").toLowerCase(), i[s]);
                return e.appendChild(r), r
            }, Re = document.documentElement, Ae = function () {
                var t, e, i, s = f || /Android/i.test(X) && !window.chrome;
                return E.createElementNS && !s && (t = ke("svg", Re), e = ke("rect", t, {
                    width: 100,
                    height: 50,
                    x: 100
                }), i = e.getBoundingClientRect().left, e.style[xe] = "50% 50%", e.style[Te] = "scale(0.5,0.5)", s = i === e.getBoundingClientRect().left, Re.removeChild(t)), s
            }(), Ce = function (t, e, i) {
                var s = t.getBBox();
                e = ee(e).split(" "), i.xOrigin = (-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * s.width : parseFloat(e[0])) + s.x, i.yOrigin = (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * s.height : parseFloat(e[1])) + s.y
            }, Oe = N.getTransform = function (t, e, i, s) {
                if (t._gsTransform && i && !s) return t._gsTransform;
                var n, o, h, l, _, u, p, c, f, m, d, g, v, y = i ? t._gsTransform || new Pe : new Pe, T = 0 > y.scaleX,
                    w = 2e-5, x = 1e5, b = 179.99, P = b * M,
                    S = be ? parseFloat(W(t, xe, e, !1, "0 0 0").split(" ")[2]) || y.zOrigin || 0 : 0,
                    k = parseFloat(a.defaultTransformPerspective) || 0;
                if (Te ? n = W(t, we, e, !0) : t.currentStyle && (n = t.currentStyle.filter.match(C), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), y.x || 0, y.y || 0].join(",") : ""), n && "none" !== n && "matrix(1, 0, 0, 1, 0, 0)" !== n) {
                    for (o = (n || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], h = o.length; --h > -1;) l = Number(o[h]), o[h] = (_ = l - (l |= 0)) ? (0 | _ * x + (0 > _ ? -.5 : .5)) / x + l : l;
                    if (16 === o.length) {
                        var R = o[8], A = o[9], O = o[10], D = o[12], I = o[13], E = o[14];
                        if (y.zOrigin && (E = -y.zOrigin, D = R * E - o[12], I = A * E - o[13], E = O * E + y.zOrigin - o[14]), !i || s || null == y.rotationX) {
                            var F, L, N, X, U, Y, j, B = o[0], q = o[1], V = o[2], G = o[3], Z = o[4], Q = o[5], $ = o[6],
                                H = o[7], K = o[11], J = Math.atan2($, O), te = -P > J || J > P;
                            y.rotationX = J * z, J && (X = Math.cos(-J), U = Math.sin(-J), F = Z * X + R * U, L = Q * X + A * U, N = $ * X + O * U, R = Z * -U + R * X, A = Q * -U + A * X, O = $ * -U + O * X, K = H * -U + K * X, Z = F, Q = L, $ = N), J = Math.atan2(R, B), y.rotationY = J * z, J && (Y = -P > J || J > P, X = Math.cos(-J), U = Math.sin(-J), F = B * X - R * U, L = q * X - A * U, N = V * X - O * U, A = q * U + A * X, O = V * U + O * X, K = G * U + K * X, B = F, q = L, V = N), J = Math.atan2(q, Q), y.rotation = J * z, J && (j = -P > J || J > P, X = Math.cos(-J), U = Math.sin(-J), B = B * X + Z * U, L = q * X + Q * U, Q = q * -U + Q * X, $ = V * -U + $ * X, q = L), j && te ? y.rotation = y.rotationX = 0 : j && Y ? y.rotation = y.rotationY = 0 : Y && te && (y.rotationY = y.rotationX = 0), y.scaleX = (0 | Math.sqrt(B * B + q * q) * x + .5) / x, y.scaleY = (0 | Math.sqrt(Q * Q + A * A) * x + .5) / x, y.scaleZ = (0 | Math.sqrt($ * $ + O * O) * x + .5) / x, y.skewX = 0, y.perspective = K ? 1 / (0 > K ? -K : K) : 0, y.x = D, y.y = I, y.z = E
                        }
                    } else if (!(be && !s && o.length && y.x === o[4] && y.y === o[5] && (y.rotationX || y.rotationY) || void 0 !== y.x && "none" === W(t, "display", e))) {
                        var ee = o.length >= 6, ie = ee ? o[0] : 1, se = o[1] || 0, re = o[2] || 0, ne = ee ? o[3] : 1;
                        y.x = o[4] || 0, y.y = o[5] || 0, u = Math.sqrt(ie * ie + se * se), p = Math.sqrt(ne * ne + re * re), c = ie || se ? Math.atan2(se, ie) * z : y.rotation || 0, f = re || ne ? Math.atan2(re, ne) * z + c : y.skewX || 0, m = u - Math.abs(y.scaleX || 0), d = p - Math.abs(y.scaleY || 0), Math.abs(f) > 90 && 270 > Math.abs(f) && (T ? (u *= -1, f += 0 >= c ? 180 : -180, c += 0 >= c ? 180 : -180) : (p *= -1, f += 0 >= f ? 180 : -180)), g = (c - y.rotation) % 180, v = (f - y.skewX) % 180, (void 0 === y.skewX || m > w || -w > m || d > w || -w > d || g > -b && b > g && false | g * x || v > -b && b > v && false | v * x) && (y.scaleX = u, y.scaleY = p, y.rotation = c, y.skewX = f), be && (y.rotationX = y.rotationY = y.z = 0, y.perspective = k, y.scaleZ = 1)
                    }
                    y.zOrigin = S;
                    for (h in y) w > y[h] && y[h] > -w && (y[h] = 0)
                } else y = {
                    x: 0,
                    y: 0,
                    z: 0,
                    scaleX: 1,
                    scaleY: 1,
                    scaleZ: 1,
                    skewX: 0,
                    skewY: 0,
                    perspective: k,
                    rotation: 0,
                    rotationX: 0,
                    rotationY: 0,
                    zOrigin: 0
                };
                return i && (t._gsTransform = y), y.svg = Se && t instanceof Se && t.parentNode instanceof Se, y.svg && (Ce(t, W(t, xe, r, !1, "50% 50%") + "", y), ve = a.useSVGTransformAttr || Ae), y.xPercent = y.yPercent = 0, y
            }, De = function (t) {
                var e, i, s = this.data, r = -s.rotation * M, n = r + s.skewX * M, a = 1e5,
                    o = (0 | Math.cos(r) * s.scaleX * a) / a, h = (0 | Math.sin(r) * s.scaleX * a) / a,
                    l = (0 | Math.sin(n) * -s.scaleY * a) / a, _ = (0 | Math.cos(n) * s.scaleY * a) / a, u = this.t.style,
                    p = this.t.currentStyle;
                if (p) {
                    i = h, h = -l, l = -i, e = p.filter, u.filter = "";
                    var c, m, d = this.t.offsetWidth, g = this.t.offsetHeight, v = "absolute" !== p.position,
                        w = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + h + ", M21=" + l + ", M22=" + _,
                        x = s.x + d * s.xPercent / 100, b = s.y + g * s.yPercent / 100;
                    if (null != s.ox && (c = (s.oxp ? .01 * d * s.ox : s.ox) - d / 2, m = (s.oyp ? .01 * g * s.oy : s.oy) - g / 2, x += c - (c * o + m * h), b += m - (c * l + m * _)), v ? (c = d / 2, m = g / 2, w += ", Dx=" + (c - (c * o + m * h) + x) + ", Dy=" + (m - (c * l + m * _) + b) + ")") : w += ", sizingMethod='auto expand')", u.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, w) : w + " " + e, (0 === t || 1 === t) && 1 === o && 0 === h && 0 === l && 1 === _ && (v && -1 === w.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && u.removeAttribute("filter")), !v) {
                        var P, S, k, R = 8 > f ? 1 : -1;
                        for (c = s.ieOffsetX || 0, m = s.ieOffsetY || 0, s.ieOffsetX = Math.round((d - ((0 > o ? -o : o) * d + (0 > h ? -h : h) * g)) / 2 + x), s.ieOffsetY = Math.round((g - ((0 > _ ? -_ : _) * g + (0 > l ? -l : l) * d)) / 2 + b), fe = 0; 4 > fe; fe++) S = J[fe], P = p[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : Z(this.t, S, parseFloat(P), P.replace(y, "")) || 0, k = i !== s[S] ? 2 > fe ? -s.ieOffsetX : -s.ieOffsetY : 2 > fe ? c - s.ieOffsetX : m - s.ieOffsetY, u[S] = (s[S] = Math.round(i - k * (0 === fe || 2 === fe ? 1 : R))) + "px"
                    }
                }
            }, Me = N.set3DTransformRatio = function (t) {
                var e, i, s, r, n, a, o, h, l, _, u, c, f, m, d, g, v, y, T, w, x, b, P, S = this.data, k = this.t.style,
                    R = S.rotation * M, A = S.scaleX, C = S.scaleY, O = S.scaleZ, D = S.x, z = S.y, I = S.z,
                    E = S.perspective;
                if (!(1 !== t && 0 !== t || "auto" !== S.force3D || S.rotationY || S.rotationX || 1 !== O || E || I)) return ze.call(this, t), void 0;
                if (p) {
                    var F = 1e-4;
                    F > A && A > -F && (A = O = 2e-5), F > C && C > -F && (C = O = 2e-5), !E || S.z || S.rotationX || S.rotationY || (E = 0)
                }
                if (R || S.skewX) y = Math.cos(R), T = Math.sin(R), e = y, n = T, S.skewX && (R -= S.skewX * M, y = Math.cos(R), T = Math.sin(R), "simple" === S.skewType && (w = Math.tan(S.skewX * M), w = Math.sqrt(1 + w * w), y *= w, T *= w)), i = -T, a = y; else {
                    if (!(S.rotationY || S.rotationX || 1 !== O || E || S.svg)) return k[Te] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + D + "px," + z + "px," + I + "px)" + (1 !== A || 1 !== C ? " scale(" + A + "," + C + ")" : ""), void 0;
                    e = a = 1, i = n = 0
                }
                u = 1, s = r = o = h = l = _ = c = f = m = 0, d = E ? -1 / E : 0, g = S.zOrigin, v = 1e5, R = S.rotationY * M, R && (y = Math.cos(R), T = Math.sin(R), l = u * -T, f = d * -T, s = e * T, o = n * T, u *= y, d *= y, e *= y, n *= y), R = S.rotationX * M, R && (y = Math.cos(R), T = Math.sin(R), w = i * y + s * T, x = a * y + o * T, b = _ * y + u * T, P = m * y + d * T, s = i * -T + s * y, o = a * -T + o * y, u = _ * -T + u * y, d = m * -T + d * y, i = w, a = x, _ = b, m = P), 1 !== O && (s *= O, o *= O, u *= O, d *= O), 1 !== C && (i *= C, a *= C, _ *= C, m *= C), 1 !== A && (e *= A, n *= A, l *= A, f *= A), g && (c -= g, r = s * c, h = o * c, c = u * c + g), S.svg && (r += S.xOrigin - (S.xOrigin * e + S.yOrigin * i), h += S.yOrigin - (S.xOrigin * n + S.yOrigin * a)), r = (w = (r += D) - (r |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + r : r, h = (w = (h += z) - (h |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + h : h, c = (w = (c += I) - (c |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + c : c, k[Te] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(") + [(0 | e * v) / v, (0 | n * v) / v, (0 | l * v) / v, (0 | f * v) / v, (0 | i * v) / v, (0 | a * v) / v, (0 | _ * v) / v, (0 | m * v) / v, (0 | s * v) / v, (0 | o * v) / v, (0 | u * v) / v, (0 | d * v) / v, r, h, c, E ? 1 + -c / E : 1].join(",") + ")"
            }, ze = N.set2DTransformRatio = function (t) {
                var e, i, s, r, n, a, o, h, l, _, u, p = this.data, c = this.t, f = c.style, m = p.x, d = p.y;
                return !(p.rotationX || p.rotationY || p.z || p.force3D === !0 || "auto" === p.force3D && 1 !== t && 0 !== t) || p.svg && ve || !be ? (r = p.scaleX, n = p.scaleY, p.rotation || p.skewX || p.svg ? (e = p.rotation * M, i = e - p.skewX * M, s = 1e5, a = Math.cos(e) * r, o = Math.sin(e) * r, h = Math.sin(i) * -n, l = Math.cos(i) * n, p.svg && (m += p.xOrigin - (p.xOrigin * a + p.yOrigin * h), d += p.yOrigin - (p.xOrigin * o + p.yOrigin * l), u = 1e-6, u > m && m > -u && (m = 0), u > d && d > -u && (d = 0)), _ = (0 | a * s) / s + "," + (0 | o * s) / s + "," + (0 | h * s) / s + "," + (0 | l * s) / s + "," + m + "," + d + ")", p.svg && ve ? c.setAttribute("transform", "matrix(" + _) : f[Te] = (p.xPercent || p.yPercent ? "translate(" + p.xPercent + "%," + p.yPercent + "%) matrix(" : "matrix(") + _) : f[Te] = (p.xPercent || p.yPercent ? "translate(" + p.xPercent + "%," + p.yPercent + "%) matrix(" : "matrix(") + r + ",0,0," + n + "," + m + "," + d + ")", void 0) : (this.setRatio = Me, Me.call(this, t), void 0)
            };
        de("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
            parser: function (t, e, i, s, n, o, h) {
                if (s._transform) return n;
                var l, _, u, p, c, f, m, d = s._transform = Oe(t, r, !0, h.parseTransform), g = t.style, v = 1e-6,
                    y = ye.length, T = h, w = {};
                if ("string" == typeof T.transform && Te) u = F.style, u[Te] = T.transform, u.display = "block", u.position = "absolute", E.body.appendChild(F), l = Oe(F, null, !1), E.body.removeChild(F); else if ("object" == typeof T) {
                    if (l = {
                        scaleX: se(null != T.scaleX ? T.scaleX : T.scale, d.scaleX),
                        scaleY: se(null != T.scaleY ? T.scaleY : T.scale, d.scaleY),
                        scaleZ: se(T.scaleZ, d.scaleZ),
                        x: se(T.x, d.x),
                        y: se(T.y, d.y),
                        z: se(T.z, d.z),
                        xPercent: se(T.xPercent, d.xPercent),
                        yPercent: se(T.yPercent, d.yPercent),
                        perspective: se(T.transformPerspective, d.perspective)
                    }, m = T.directionalRotation, null != m) if ("object" == typeof m) for (u in m) T[u] = m[u]; else T.rotation = m;
                    "string" == typeof T.x && -1 !== T.x.indexOf("%") && (l.x = 0, l.xPercent = se(T.x, d.xPercent)), "string" == typeof T.y && -1 !== T.y.indexOf("%") && (l.y = 0, l.yPercent = se(T.y, d.yPercent)), l.rotation = re("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : d.rotation, d.rotation, "rotation", w), be && (l.rotationX = re("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : d.rotationX || 0, d.rotationX, "rotationX", w), l.rotationY = re("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : d.rotationY || 0, d.rotationY, "rotationY", w)), l.skewX = null == T.skewX ? d.skewX : re(T.skewX, d.skewX), l.skewY = null == T.skewY ? d.skewY : re(T.skewY, d.skewY), (_ = l.skewY - d.skewY) && (l.skewX += _, l.rotation += _)
                }
                for (be && null != T.force3D && (d.force3D = T.force3D, f = !0), d.skewType = T.skewType || d.skewType || a.defaultSkewType, c = d.force3D || d.z || d.rotationX || d.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, c || null == T.scale || (l.scaleZ = 1); --y > -1;) i = ye[y], p = l[i] - d[i], (p > v || -v > p || null != T[i] || null != I[i]) && (f = !0, n = new pe(d, i, d[i], p, n), i in w && (n.e = w[i]), n.xs0 = 0, n.plugin = o, s._overwriteProps.push(n.n));
                return p = T.transformOrigin, p && d.svg && (Ce(t, p, l), n = new pe(d, "xOrigin", d.xOrigin, l.xOrigin - d.xOrigin, n, -1, "transformOrigin"), n.b = d.xOrigin, n.e = n.xs0 = l.xOrigin, n = new pe(d, "yOrigin", d.yOrigin, l.yOrigin - d.yOrigin, n, -1, "transformOrigin"), n.b = d.yOrigin, n.e = n.xs0 = l.yOrigin, p = "0px 0px"), (p || be && c && d.zOrigin) && (Te ? (f = !0, i = xe, p = (p || W(t, i, r, !1, "50% 50%")) + "", n = new pe(g, i, 0, 0, n, -1, "transformOrigin"), n.b = g[i], n.plugin = o, be ? (u = d.zOrigin, p = p.split(" "), d.zOrigin = (p.length > 2 && (0 === u || "0px" !== p[2]) ? parseFloat(p[2]) : u) || 0, n.xs0 = n.e = p[0] + " " + (p[1] || "50%") + " 0px", n = new pe(d, "zOrigin", 0, 0, n, -1, n.n), n.b = u, n.xs0 = n.e = d.zOrigin) : n.xs0 = n.e = p) : ee(p + "", d)), f && (s._transformType = d.svg && ve || !c && 3 !== this._transformType ? 2 : 3), n
            }, prefix: !0
        }), de("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), de("borderRadius", {
            defaultValue: "0px", parser: function (t, e, i, n, a) {
                e = this.format(e);
                var o, h, l, _, u, p, c, f, m, d, g, v, y, T, w, x,
                    b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    P = t.style;
                for (m = parseFloat(t.offsetWidth), d = parseFloat(t.offsetHeight), o = e.split(" "), h = 0; b.length > h; h++) this.p.indexOf("border") && (b[h] = V(b[h])), u = _ = W(t, b[h], r, !1, "0px"), -1 !== u.indexOf(" ") && (_ = u.split(" "), u = _[0], _ = _[1]), p = l = o[h], c = parseFloat(u), v = u.substr((c + "").length), y = "=" === p.charAt(1), y ? (f = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), f *= parseFloat(p), g = p.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(p), g = p.substr((f + "").length)), "" === g && (g = s[i] || v), g !== v && (T = Z(t, "borderLeft", c, v), w = Z(t, "borderTop", c, v), "%" === g ? (u = 100 * (T / m) + "%", _ = 100 * (w / d) + "%") : "em" === g ? (x = Z(t, "borderLeft", 1, "em"), u = T / x + "em", _ = w / x + "em") : (u = T + "px", _ = w + "px"), y && (p = parseFloat(u) + f + g, l = parseFloat(_) + f + g)), a = ce(P, b[h], u + " " + _, p + " " + l, !1, "0px", a);
                return a
            }, prefix: !0, formatter: le("0px 0px 0px 0px", !1, !0)
        }), de("backgroundPosition", {
            defaultValue: "0 0", parser: function (t, e, i, s, n, a) {
                var o, h, l, _, u, p, c = "background-position", m = r || G(t, null),
                    d = this.format((m ? f ? m.getPropertyValue(c + "-x") + " " + m.getPropertyValue(c + "-y") : m.getPropertyValue(c) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                    g = this.format(e);
                if (-1 !== d.indexOf("%") != (-1 !== g.indexOf("%")) && (p = W(t, "backgroundImage").replace(k, ""), p && "none" !== p)) {
                    for (o = d.split(" "), h = g.split(" "), L.setAttribute("src", p), l = 2; --l > -1;) d = o[l], _ = -1 !== d.indexOf("%"), _ !== (-1 !== h[l].indexOf("%")) && (u = 0 === l ? t.offsetWidth - L.width : t.offsetHeight - L.height, o[l] = _ ? parseFloat(d) / 100 * u + "px" : 100 * (parseFloat(d) / u) + "%");
                    d = o.join(" ")
                }
                return this.parseComplex(t.style, d, g, n, a)
            }, formatter: ee
        }), de("backgroundSize", {defaultValue: "0 0", formatter: ee}), de("perspective", {
            defaultValue: "0px",
            prefix: !0
        }), de("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), de("transformStyle", {prefix: !0}), de("backfaceVisibility", {prefix: !0}), de("userSelect", {prefix: !0}), de("margin", {parser: _e("marginTop,marginRight,marginBottom,marginLeft")}), de("padding", {parser: _e("paddingTop,paddingRight,paddingBottom,paddingLeft")}), de("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (t, e, i, s, n, a) {
                var o, h, l;
                return 9 > f ? (h = t.currentStyle, l = 8 > f ? " " : ",", o = "rect(" + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ")", e = this.format(e).split(",").join(l)) : (o = this.format(W(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
            }
        }), de("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), de("autoRound,strictUnits", {
            parser: function (t, e, i, s, r) {
                return r
            }
        }), de("border", {
            defaultValue: "0px solid #000", parser: function (t, e, i, s, n, a) {
                return this.parseComplex(t.style, this.format(W(t, "borderTopWidth", r, !1, "0px") + " " + W(t, "borderTopStyle", r, !1, "solid") + " " + W(t, "borderTopColor", r, !1, "#000")), this.format(e), n, a)
            }, color: !0, formatter: function (t) {
                var e = t.split(" ");
                return e[0] + " " + (e[1] || "solid") + " " + (t.match(he) || ["#000"])[0]
            }
        }), de("borderWidth", {parser: _e("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}), de("float,cssFloat,styleFloat", {
            parser: function (t, e, i, s, r) {
                var n = t.style, a = "cssFloat" in n ? "cssFloat" : "styleFloat";
                return new pe(n, a, 0, 0, r, -1, i, !1, 0, n[a], e)
            }
        });
        var Ie = function (t) {
            var e, i = this.t, s = i.filter || W(this.data, "filter") || "", r = 0 | this.s + this.c * t;
            100 === r && (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") && -1 === s.indexOf("oader(") ? (i.removeAttribute("filter"), e = !W(this.data, "filter")) : (i.filter = s.replace(x, ""), e = !0)), e || (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"), -1 === s.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = s + " alpha(opacity=" + r + ")") : i.filter = s.replace(T, "opacity=" + r))
        };
        de("opacity,alpha,autoAlpha", {
            defaultValue: "1", parser: function (t, e, i, s, n, a) {
                var o = parseFloat(W(t, "opacity", r, !1, "1")), h = t.style, l = "autoAlpha" === i;
                return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), l && 1 === o && "hidden" === W(t, "visibility", r) && 0 !== e && (o = 0), U ? n = new pe(h, "opacity", o, e - o, n) : (n = new pe(h, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = l ? 1 : 0, h.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Ie), l && (n = new pe(h, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", s._overwriteProps.push(n.n), s._overwriteProps.push(i)), n
            }
        });
        var Ee = function (t, e) {
            e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)), t.removeProperty(e.replace(P, "-$1").toLowerCase())) : t.removeAttribute(e))
        }, Fe = function (t) {
            if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                this.t.setAttribute("class", 0 === t ? this.b : this.e);
                for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Ee(i, e.p), e = e._next;
                1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        de("className", {
            parser: function (t, e, s, n, a, o, h) {
                var l, _, u, p, c, f = t.getAttribute("class") || "", m = t.style.cssText;
                if (a = n._classNamePT = new pe(t, s, 0, 0, a, 2), a.setRatio = Fe, a.pr = -11, i = !0, a.b = f, _ = $(t, r), u = t._gsClassPT) {
                    for (p = {}, c = u.data; c;) p[c.p] = 1, c = c._next;
                    u.setRatio(1)
                }
                return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : f.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), n._tween._duration && (t.setAttribute("class", a.e), l = H(t, _, $(t), h, p), t.setAttribute("class", f), a.data = l.firstMPT, t.style.cssText = m, a = a.xfirst = n.parse(t, l.difs, a, o)), a
            }
        });
        var Le = function (t) {
            if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var e, i, s, r, n = this.t.style, a = o.transform.parse;
                if ("all" === this.e) n.cssText = "", r = !0; else for (e = this.e.split(" ").join("").split(","), s = e.length; --s > -1;) i = e[s], o[i] && (o[i].parse === a ? r = !0 : i = "transformOrigin" === i ? xe : o[i].p), Ee(n, i);
                r && (Ee(n, Te), this.t._gsTransform && delete this.t._gsTransform)
            }
        };
        for (de("clearProps", {
            parser: function (t, e, s, r, n) {
                return n = new pe(t, s, 0, 0, n, 2), n.setRatio = Le, n.e = e, n.pr = -10, n.data = r._tween, i = !0, n
            }
        }), h = "bezier,throwProps,physicsProps,physics2D".split(","), fe = h.length; fe--;) ge(h[fe]);
        h = a.prototype, h._firstPT = null, h._onInitTween = function (t, e, o) {
            if (!t.nodeType) return !1;
            this._target = t, this._tween = o, this._vars = e, l = e.autoRound, i = !1, s = e.suffixMap || a.suffixMap, r = G(t, ""), n = this._overwriteProps;
            var h, p, f, m, d, g, v, y, T, x = t.style;
            if (_ && "" === x.zIndex && (h = W(t, "zIndex", r), ("auto" === h || "" === h) && this._addLazySet(x, "zIndex", 0)), "string" == typeof e && (m = x.cssText, h = $(t, r), x.cssText = m + ";" + e, h = H(t, h, $(t)).difs, !U && w.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, x.cssText = m), this._firstPT = p = this.parse(t, e, null), this._transformType) {
                for (T = 3 === this._transformType, Te ? u && (_ = !0, "" === x.zIndex && (v = W(t, "zIndex", r), ("auto" === v || "" === v) && this._addLazySet(x, "zIndex", 0)), c && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : x.zoom = 1, f = p; f && f._next;) f = f._next;
                y = new pe(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, f), y.setRatio = T && be ? Me : Te ? ze : De, y.data = this._transform || Oe(t, r, !0), n.pop()
            }
            if (i) {
                for (; p;) {
                    for (g = p._next, f = m; f && f.pr > p.pr;) f = f._next;
                    (p._prev = f ? f._prev : d) ? p._prev._next = p : m = p, (p._next = f) ? f._prev = p : d = p, p = g
                }
                this._firstPT = m
            }
            return !0
        }, h.parse = function (t, e, i, n) {
            var a, h, _, u, p, c, f, m, d, g, v = t.style;
            for (a in e) c = e[a], h = o[a], h ? i = h.parse(t, c, a, this, i, n, e) : (p = W(t, a, r) + "", d = "string" == typeof c, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || d && b.test(c) ? (d || (c = oe(c), c = (c.length > 3 ? "rgba(" : "rgb(") + c.join(",") + ")"), i = ce(v, a, p, c, !0, "transparent", i, 0, n)) : !d || -1 === c.indexOf(" ") && -1 === c.indexOf(",") ? (_ = parseFloat(p), f = _ || 0 === _ ? p.substr((_ + "").length) : "", ("" === p || "auto" === p) && ("width" === a || "height" === a ? (_ = te(t, a, r), f = "px") : "left" === a || "top" === a ? (_ = Q(t, a, r), f = "px") : (_ = "opacity" !== a ? 0 : 1, f = "")), g = d && "=" === c.charAt(1), g ? (u = parseInt(c.charAt(0) + "1", 10), c = c.substr(2), u *= parseFloat(c), m = c.replace(y, "")) : (u = parseFloat(c), m = d ? c.substr((u + "").length) || "" : ""), "" === m && (m = a in s ? s[a] : f), c = u || 0 === u ? (g ? u + _ : u) + m : e[a], f !== m && "" !== m && (u || 0 === u) && _ && (_ = Z(t, a, _, f), "%" === m ? (_ /= Z(t, a, 100, "%") / 100, e.strictUnits !== !0 && (p = _ + "%")) : "em" === m ? _ /= Z(t, a, 1, "em") : "px" !== m && (u = Z(t, a, u, m), m = "px"), g && (u || 0 === u) && (c = u + _ + m)), g && (u += _), !_ && 0 !== _ || !u && 0 !== u ? void 0 !== v[a] && (c || "NaN" != c + "" && null != c) ? (i = new pe(v, a, u || _ || 0, 0, i, -1, a, !1, 0, p, c), i.xs0 = "none" !== c || "display" !== a && -1 === a.indexOf("Style") ? c : p) : j("invalid " + a + " tween value: " + e[a]) : (i = new pe(v, a, _, u - _, i, 0, a, l !== !1 && ("px" === m || "zIndex" === a), 0, p, c), i.xs0 = m)) : i = ce(v, a, p, c, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
            return i
        }, h.setRatio = function (t) {
            var e, i, s, r = this._firstPT, n = 1e-6;
            if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (; r;) {
                if (e = r.c * t + r.s, r.r ? e = Math.round(e) : n > e && e > -n && (e = 0), r.type) if (1 === r.type) if (s = r.l, 2 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2; else if (3 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3; else if (4 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4; else if (5 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5; else {
                    for (i = r.xs0 + e + r.xs1, s = 1; r.l > s; s++) i += r["xn" + s] + r["xs" + (s + 1)];
                    r.t[r.p] = i
                } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t); else r.t[r.p] = e + r.xs0;
                r = r._next
            } else for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next; else for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t), r = r._next
        }, h._enableTransforms = function (t) {
            this._transform = this._transform || Oe(this._target, r, !0), this._transformType = this._transform.svg && ve || !t && 3 !== this._transformType ? 2 : 3
        };
        var Ne = function () {
            this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
        };
        h._addLazySet = function (t, e, i) {
            var s = this._firstPT = new pe(t, e, 0, 0, this._firstPT, 2);
            s.e = i, s.setRatio = Ne, s.data = this
        }, h._linkCSSP = function (t, e, i, s) {
            return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, s = !0), i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
        }, h._kill = function (e) {
            var i, s, r, n = e;
            if (e.autoAlpha || e.alpha) {
                n = {};
                for (s in e) n[s] = e[s];
                n.opacity = 1, n.autoAlpha && (n.visibility = 1)
            }
            return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
        };
        var Xe = function (t, e, i) {
            var s, r, n, a;
            if (t.slice) for (r = t.length; --r > -1;) Xe(t[r], e, i); else for (s = t.childNodes, r = s.length; --r > -1;) n = s[r], a = n.type, n.style && (e.push($(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Xe(n, e, i)
        };
        return a.cascadeTo = function (t, i, s) {
            var r, n, a, o = e.to(t, i, s), h = [o], l = [], _ = [], u = [], p = e._internals.reservedProps;
            for (t = o._targets || o.target, Xe(t, l, u), o.render(i, !0), Xe(t, _), o.render(0, !0), o._enabled(!0), r = u.length; --r > -1;) if (n = H(u[r], l[r], _[r]), n.firstMPT) {
                n = n.difs;
                for (a in s) p[a] && (n[a] = s[a]);
                h.push(e.to(u[r], i, n))
            }
            return h
        }, t.activate([a]), a
    }, !0), function () {
        var t = _gsScope._gsDefine.plugin({
            propName: "roundProps", priority: -1, API: 2, init: function (t, e, i) {
                return this._tween = i, !0
            }
        }), e = t.prototype;
        e._onInitAllProps = function () {
            for (var t, e, i, s = this._tween, r = s.vars.roundProps instanceof Array ? s.vars.roundProps : s.vars.roundProps.split(","), n = r.length, a = {}, o = s._propLookup.roundProps; --n > -1;) a[r[n]] = 1;
            for (n = r.length; --n > -1;) for (t = r[n], e = s._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(a, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : s._firstPT === e && (s._firstPT = i), e._next = e._prev = null, s._propLookup[t] = o), e = i;
            return !1
        }, e._add = function (t, e, i, s) {
            this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e)
        }
    }(), _gsScope._gsDefine.plugin({
        propName: "attr", API: 2, version: "0.3.3", init: function (t, e) {
            var i, s, r;
            if ("function" != typeof t.setAttribute) return !1;
            this._target = t, this._proxy = {}, this._start = {}, this._end = {};
            for (i in e) this._start[i] = this._proxy[i] = s = t.getAttribute(i), r = this._addTween(this._proxy, i, parseFloat(s), e[i], i), this._end[i] = r ? r.s + r.c : e[i], this._overwriteProps.push(i);
            return !0
        }, set: function (t) {
            this._super.setRatio.call(this, t);
            for (var e, i = this._overwriteProps, s = i.length, r = 1 === t ? this._end : t ? this._proxy : this._start; --s > -1;) e = i[s], this._target.setAttribute(e, r[e] + "")
        }
    }), _gsScope._gsDefine.plugin({
        propName: "directionalRotation", version: "0.2.1", API: 2, init: function (t, e) {
            "object" != typeof e && (e = {rotation: e}), this.finals = {};
            var i, s, r, n, a, o, h = e.useRadians === !0 ? 2 * Math.PI : 360, l = 1e-6;
            for (i in e) "useRadians" !== i && (o = (e[i] + "").split("_"), s = o[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), n = this.finals[i] = "string" == typeof s && "=" === s.charAt(1) ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, a = n - r, o.length && (s = o.join("_"), -1 !== s.indexOf("short") && (a %= h, a !== a % (h / 2) && (a = 0 > a ? a + h : a - h)), -1 !== s.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * h) % h - (0 | a / h) * h : -1 !== s.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * h) % h - (0 | a / h) * h)), (a > l || -l > a) && (this._addTween(t, i, r, r + a, i), this._overwriteProps.push(i)));
            return !0
        }, set: function (t) {
            var e;
            if (1 !== t) this._super.setRatio.call(this, t); else for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
        }
    })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (t) {
        var e, i, s, r = _gsScope.GreenSockGlobals || _gsScope, n = r.com.greensock, a = 2 * Math.PI, o = Math.PI / 2,
            h = n._class, l = function (e, i) {
                var s = h("easing." + e, function () {
                }, !0), r = s.prototype = new t;
                return r.constructor = s, r.getRatio = i, s
            }, _ = t.register || function () {
            }, u = function (t, e, i, s) {
                var r = h("easing." + t, {easeOut: new e, easeIn: new i, easeInOut: new s}, !0);
                return _(r, t), r
            }, p = function (t, e, i) {
                this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
            }, c = function (e, i) {
                var s = h("easing." + e, function (t) {
                    this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                }, !0), r = s.prototype = new t;
                return r.constructor = s, r.getRatio = i, r.config = function (t) {
                    return new s(t)
                }, s
            }, f = u("Back", c("BackOut", function (t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
            }), c("BackIn", function (t) {
                return t * t * ((this._p1 + 1) * t - this._p1)
            }), c("BackInOut", function (t) {
                return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
            })), m = h("easing.SlowMo", function (t, e, i) {
                e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
            }, !0), d = m.prototype = new t;
        return d.constructor = m, d.getRatio = function (t) {
            var e = t + (.5 - t) * this._p;
            return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }, m.ease = new m(.7, .7), d.config = m.config = function (t, e, i) {
            return new m(t, e, i)
        }, e = h("easing.SteppedEase", function (t) {
            t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
        }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function (t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
        }, d.config = e.config = function (t) {
            return new e(t)
        }, i = h("easing.RoughEase", function (e) {
            e = e || {};
            for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), c = u, f = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --c > -1;) i = f ? Math.random() : 1 / u * c, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), f ? s += Math.random() * r - .5 * r : c % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
                x: i,
                y: s
            };
            for (l.sort(function (t, e) {
                return t.x - e.x
            }), o = new p(1, 1, null), c = u; --c > -1;) a = l[c], o = new p(a.x, a.y, o);
            this._prev = new p(0, 0, 0 !== o.t ? o : o.next)
        }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t;) e = e.next;
                e = e.prev
            } else for (; e.prev && e.t >= t;) e = e.prev;
            return this._prev = e, e.v + (t - e.t) / e.gap * e.c
        }, d.config = function (t) {
            return new i(t)
        }, i.ease = new i, u("Bounce", l("BounceOut", function (t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), l("BounceIn", function (t) {
            return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), l("BounceInOut", function (t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
        })), u("Circ", l("CircOut", function (t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), l("CircIn", function (t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), l("CircInOut", function (t) {
            return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })), s = function (e, i, s) {
            var r = h("easing." + e, function (t, e) {
                this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
            }, !0), n = r.prototype = new t;
            return n.constructor = r, n.getRatio = i, n.config = function (t, e) {
                return new r(t, e)
            }, r
        }, u("Elastic", s("ElasticOut", function (t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
        }, .3), s("ElasticIn", function (t) {
            return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
        }, .3), s("ElasticInOut", function (t) {
            return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1
        }, .45)), u("Expo", l("ExpoOut", function (t) {
            return 1 - Math.pow(2, -10 * t)
        }), l("ExpoIn", function (t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), l("ExpoInOut", function (t) {
            return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })), u("Sine", l("SineOut", function (t) {
            return Math.sin(t * o)
        }), l("SineIn", function (t) {
            return -Math.cos(t * o) + 1
        }), l("SineInOut", function (t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })), h("easing.EaseLookup", {
            find: function (e) {
                return t.map[e]
            }
        }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), f
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (t, e) {
    "use strict";
    var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
    if (!i.TweenLite) {
        var s, r, n, a, o, h = function (t) {
            var e, s = t.split("."), r = i;
            for (e = 0; s.length > e; e++) r[s[e]] = r = r[s[e]] || {};
            return r
        }, l = h("com.greensock"), _ = 1e-10, u = function (t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++])) ;
            return i
        }, p = function () {
        }, c = function () {
            var t = Object.prototype.toString, e = t.call([]);
            return function (i) {
                return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
            }
        }(), f = {}, m = function (s, r, n, a) {
            this.sc = f[s] ? f[s].sc : [], f[s] = this, this.gsClass = null, this.func = n;
            var o = [];
            this.check = function (l) {
                for (var _, u, p, c, d = r.length, g = d; --d > -1;) (_ = f[r[d]] || new m(r[d], [])).gsClass ? (o[d] = _.gsClass, g--) : l && _.sc.push(this);
                if (0 === g && n) for (u = ("com.greensock." + s).split("."), p = u.pop(), c = h(u.join("."))[p] = this.gsClass = n.apply(n, o), a && (i[p] = c, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function () {
                    return c
                }) : s === e && "undefined" != typeof module && module.exports && (module.exports = c)), d = 0; this.sc.length > d; d++) this.sc[d].check()
            }, this.check(!0)
        }, d = t._gsDefine = function (t, e, i, s) {
            return new m(t, e, i, s)
        }, g = l._class = function (t, e, i) {
            return e = e || function () {
            }, d(t, [], function () {
                return e
            }, i), e
        };
        d.globals = i;
        var v = [0, 0, 1, 1], y = [], T = g("easing.Ease", function (t, e, i, s) {
            this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? v.concat(e) : v
        }, !0), w = T.map = {}, x = T.register = function (t, e, i, s) {
            for (var r, n, a, o, h = e.split(","), _ = h.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;) for (n = h[_], r = s ? g("easing." + n, null, !0) : l.easing[n] || {}, a = u.length; --a > -1;) o = u[a], w[n + "." + o] = w[o + n] = r[o] = t.getRatio ? t : t[o] || new t
        };
        for (n = T.prototype, n._calcEnd = !1, n.getRatio = function (t) {
            if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
            var e = this._type, i = this._power, s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
            return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
        }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = s.length; --r > -1;) n = s[r] + ",Power" + r, x(new T(null, null, 1, r), n, "easeOut", !0), x(new T(null, null, 2, r), n, "easeIn" + (0 === r ? ",easeNone" : "")), x(new T(null, null, 3, r), n, "easeInOut");
        w.linear = l.easing.Linear.easeIn, w.swing = l.easing.Quad.easeInOut;
        var b = g("events.EventDispatcher", function (t) {
            this._listeners = {}, this._eventTarget = t || this
        });
        n = b.prototype, n.addEventListener = function (t, e, i, s, r) {
            r = r || 0;
            var n, h, l = this._listeners[t], _ = 0;
            for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1;) n = l[h], n.c === e && n.s === i ? l.splice(h, 1) : 0 === _ && r > n.pr && (_ = h + 1);
            l.splice(_, 0, {c: e, s: i, up: s, pr: r}), this !== a || o || a.wake()
        }, n.removeEventListener = function (t, e) {
            var i, s = this._listeners[t];
            if (s) for (i = s.length; --i > -1;) if (s[i].c === e) return s.splice(i, 1), void 0
        }, n.dispatchEvent = function (t) {
            var e, i, s, r = this._listeners[t];
            if (r) for (e = r.length, i = this._eventTarget; --e > -1;) s = r[e], s && (s.up ? s.c.call(s.s || i, {
                type: t,
                target: i
            }) : s.c.call(s.s || i))
        };
        var P = t.requestAnimationFrame, S = t.cancelAnimationFrame, k = Date.now || function () {
            return (new Date).getTime()
        }, R = k();
        for (s = ["ms", "moz", "webkit", "o"], r = s.length; --r > -1 && !P;) P = t[s[r] + "RequestAnimationFrame"], S = t[s[r] + "CancelAnimationFrame"] || t[s[r] + "CancelRequestAnimationFrame"];
        g("Ticker", function (t, e) {
            var i, s, r, n, h, l = this, u = k(), c = e !== !1 && P, f = 500, m = 33, d = function (t) {
                var e, a, o = k() - R;
                o > f && (u += o - m), R += o, l.time = (R - u) / 1e3, e = l.time - h, (!i || e > 0 || t === !0) && (l.frame++, h += e + (e >= n ? .004 : n - e), a = !0), t !== !0 && (r = s(d)), a && l.dispatchEvent("tick")
            };
            b.call(l), l.time = l.frame = 0, l.tick = function () {
                d(!0)
            }, l.lagSmoothing = function (t, e) {
                f = t || 1 / _, m = Math.min(e, f, 0)
            }, l.sleep = function () {
                null != r && (c && S ? S(r) : clearTimeout(r), s = p, r = null, l === a && (o = !1))
            }, l.wake = function () {
                null !== r ? l.sleep() : l.frame > 10 && (R = k() - f + 5), s = 0 === i ? p : c && P ? P : function (t) {
                    return setTimeout(t, 0 | 1e3 * (h - l.time) + 1)
                }, l === a && (o = !0), d(2)
            }, l.fps = function (t) {
                return arguments.length ? (i = t, n = 1 / (i || 60), h = this.time + n, l.wake(), void 0) : i
            }, l.useRAF = function (t) {
                return arguments.length ? (l.sleep(), c = t, l.fps(i), void 0) : c
            }, l.fps(t), setTimeout(function () {
                c && (!r || 5 > l.frame) && l.useRAF(!1)
            }, 1500)
        }), n = l.Ticker.prototype = new l.events.EventDispatcher, n.constructor = l.Ticker;
        var A = g("core.Animation", function (t, e) {
            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, B) {
                o || a.wake();
                var i = this.vars.useFrames ? j : B;
                i.add(this, i._time), this.vars.paused && this.paused(!0)
            }
        });
        a = A.ticker = new l.Ticker, n = A.prototype, n._dirty = n._gc = n._initted = n._paused = !1, n._totalTime = n._time = 0, n._rawPrevTime = -1, n._next = n._last = n._onUpdate = n._timeline = n.timeline = null, n._paused = !1;
        var C = function () {
            o && k() - R > 2e3 && a.wake(), setTimeout(C, 2e3)
        };
        C(), n.play = function (t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, n.pause = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, n.resume = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!1)
        }, n.seek = function (t, e) {
            return this.totalTime(Number(t), e !== !1)
        }, n.restart = function (t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
        }, n.reverse = function (t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, n.render = function () {
        }, n.invalidate = function () {
            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
        }, n.isActive = function () {
            var t, e = this._timeline, i = this._startTime;
            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
        }, n._enabled = function (t, e) {
            return o || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        }, n._kill = function () {
            return this._enabled(!1, !1)
        }, n.kill = function (t, e) {
            return this._kill(t, e), this
        }, n._uncache = function (t) {
            for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
            return this
        }, n._swapSelfInParams = function (t) {
            for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
            return i
        }, n.eventCallback = function (t, e, i, s) {
            if ("on" === (t || "").substr(0, 2)) {
                var r = this.vars;
                if (1 === arguments.length) return r[t];
                null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = c(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        }, n.delay = function (t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
        }, n.duration = function (t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, n.totalDuration = function (t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
        }, n.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        }, n.totalTime = function (t, e, i) {
            if (o || a.wake(), !arguments.length) return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var s = this._totalDuration, r = this._timeline;
                    if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline) for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), I.length && q())
            }
            return this
        }, n.progress = n.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
        }, n.startTime = function (t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
        }, n.endTime = function (t) {
            return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
        }, n.timeScale = function (t) {
            if (!arguments.length) return this._timeScale;
            if (t = t || _, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime, i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t, this._uncache(!1)
        }, n.reversed = function (t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, n.paused = function (t) {
            if (!arguments.length) return this._paused;
            if (t != this._paused && this._timeline) {
                o || t || a.wake();
                var e = this._timeline, i = e.rawTime(), s = i - this._pauseTime;
                !t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !t && this._enabled(!0, !1), this
        };
        var O = g("core.SimpleTimeline", function (t) {
            A.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        n = O.prototype = new A, n.constructor = O, n.kill()._gc = !1, n._first = n._last = n._recent = null, n._sortChildren = !1, n.add = n.insert = function (t, e) {
            var i, s;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren) for (s = t._startTime; i && i._startTime > s;) i = i._prev;
            return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
        }, n._remove = function (t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
        }, n.render = function (t, e, i) {
            var s, r = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; r;) s = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s
        }, n.rawTime = function () {
            return o || a.wake(), this._totalTime
        };
        var D = g("TweenLite", function (e, i, s) {
            if (A.call(this, i, s), this.render = D.prototype.render, null == e) throw"Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : D.selector(e) || e;
            var r, n, a,
                o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                h = this.vars.overwrite;
            if (this._overwrite = h = null == h ? Y[D.defaultOverwrite] : "number" == typeof h ? h >> 0 : Y[h], (o || e instanceof Array || e.push && c(e)) && "number" != typeof e[0]) for (this._targets = a = u(e), this._propLookup = [], this._siblings = [], r = 0; a.length > r; r++) n = a[r], n ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(u(n))) : (this._siblings[r] = V(n, this, !1), 1 === h && this._siblings[r].length > 1 && W(n, this, null, 1, this._siblings[r])) : (n = a[r--] = D.selector(n), "string" == typeof n && a.splice(r + 1, 1)) : a.splice(r--, 1); else this._propLookup = {}, this._siblings = V(e, this, !1), 1 === h && this._siblings.length > 1 && W(e, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -_, this.render(-this._delay))
        }, !0), M = function (e) {
            return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
        }, z = function (t, e) {
            var i, s = {};
            for (i in t) U[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!L[i] || L[i] && L[i]._autoCSS) || (s[i] = t[i], delete t[i]);
            t.css = s
        };
        n = D.prototype = new A, n.constructor = D, n.kill()._gc = !1, n.ratio = 0, n._firstPT = n._targets = n._overwrittenProps = n._startAt = null, n._notifyPluginsOfEnabled = n._lazy = !1, D.version = "1.14.2", D.defaultEase = n._ease = new T(null, null, 1, 1), D.defaultOverwrite = "auto", D.ticker = a, D.autoSleep = !0, D.lagSmoothing = function (t, e) {
            a.lagSmoothing(t, e)
        }, D.selector = t.$ || t.jQuery || function (e) {
            var i = t.$ || t.jQuery;
            return i ? (D.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
        };
        var I = [], E = {}, F = D._internals = {isArray: c, isSelector: M, lazyTweens: I}, L = D._plugins = {},
            N = F.tweenLookup = {}, X = 0, U = F.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1
            }, Y = {none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0},
            j = A._rootFramesTimeline = new O, B = A._rootTimeline = new O, q = F.lazyRender = function () {
                var t, e = I.length;
                for (E = {}; --e > -1;) t = I[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                I.length = 0
            };
        B._startTime = a.time, j._startTime = a.frame, B._active = j._active = !0, setTimeout(q, 1), A._updateRoot = D.render = function () {
            var t, e, i;
            if (I.length && q(), B.render((a.time - B._startTime) * B._timeScale, !1, !1), j.render((a.frame - j._startTime) * j._timeScale, !1, !1), I.length && q(), !(a.frame % 120)) {
                for (i in N) {
                    for (e = N[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete N[i]
                }
                if (i = B._first, (!i || i._paused) && D.autoSleep && !j._first && 1 === a._listeners.tick.length) {
                    for (; i && i._paused;) i = i._next;
                    i || a.sleep()
                }
            }
        }, a.addEventListener("tick", A._updateRoot);
        var V = function (t, e, i) {
            var s, r, n = t._gsTweenID;
            if (N[n || (t._gsTweenID = n = "t" + X++)] || (N[n] = {
                target: t,
                tweens: []
            }), e && (s = N[n].tweens, s[r = s.length] = e, i)) for (; --r > -1;) s[r] === e && s.splice(r, 1);
            return N[n].tweens
        }, G = function (t, e, i, s) {
            var r, n, a = t.vars.onOverwrite;
            return a && (r = a(t, e, i, s)), a = D.onOverwrite, a && (n = a(t, e, i, s)), r !== !1 && n !== !1
        }, W = function (t, e, i, s, r) {
            var n, a, o, h;
            if (1 === s || s >= 4) {
                for (h = r.length, n = 0; h > n; n++) if ((o = r[n]) !== e) o._gc || G(o, e) && o._enabled(!1, !1) && (a = !0); else if (5 === s) break;
                return a
            }
            var l, u = e._startTime + _, p = [], c = 0, f = 0 === e._duration;
            for (n = r.length; --n > -1;) (o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (l = l || Z(e, 0, f), 0 === Z(o, l, f) && (p[c++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((f || !o._initted) && 2e-10 >= u - o._startTime || (p[c++] = o)));
            for (n = c; --n > -1;) if (o = p[n], 2 === s && o._kill(i, t, e) && (a = !0), 2 !== s || !o._firstPT && o._initted) {
                if (2 !== s && !G(o, e)) continue;
                o._enabled(!1, !1) && (a = !0)
            }
            return a
        }, Z = function (t, e, i) {
            for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline;) {
                if (n += s._startTime, r *= s._timeScale, s._paused) return -100;
                s = s._timeline
            }
            return n /= r, n > e ? n - e : i && n === e || !t._initted && 2 * _ > n - e ? _ : (n += t.totalDuration() / t._timeScale / r) > e + _ ? 0 : n - e - _
        };
        n._init = function () {
            var t, e, i, s, r, n = this.vars, a = this._overwrittenProps, o = this._duration, h = !!n.immediateRender,
                l = n.ease;
            if (n.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                for (s in n.startAt) r[s] = n.startAt[s];
                if (r.overwrite = !1, r.immediateRender = !0, r.lazy = h && n.lazy !== !1, r.startAt = r.delay = null, this._startAt = D.to(this.target, 0, r), h) if (this._time > 0) this._startAt = null; else if (0 !== o) return
            } else if (n.runBackwards && 0 !== o) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else {
                0 !== this._time && (h = !1), i = {};
                for (s in n) U[s] && "autoCSS" !== s || (i[s] = n[s]);
                if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && n.lazy !== !1, i.immediateRender = h, this._startAt = D.to(this.target, 0, i), h) {
                    if (0 === this._time) return
                } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
            }
            if (this._ease = l = l ? l instanceof T ? l : "function" == typeof l ? new T(l, n.easeParams) : w[l] || D.defaultEase : D.defaultEase, n.easeParams instanceof Array && l.config && (this._ease = l.config.apply(l, n.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0); else e = this._initProps(this.target, this._propLookup, this._siblings, a);
            if (e && D._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), n.runBackwards) for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
            this._onUpdate = n.onUpdate, this._initted = !0
        }, n._initProps = function (e, i, s, r) {
            var n, a, o, h, l, _;
            if (null == e) return !1;
            E[e._gsTweenID] && q(), this.vars.css || e.style && e !== t && e.nodeType && L.css && this.vars.autoCSS !== !1 && z(this.vars, e);
            for (n in this.vars) {
                if (_ = this.vars[n], U[n]) _ && (_ instanceof Array || _.push && c(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[n] = _ = this._swapSelfInParams(_, this)); else if (L[n] && (h = new L[n])._onInitTween(e, this.vars[n], this)) {
                    for (this._firstPT = l = {
                        _next: this._firstPT,
                        t: h,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: !0,
                        n: n,
                        pg: !0,
                        pr: h._priority
                    }, a = h._overwriteProps.length; --a > -1;) i[h._overwriteProps[a]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (o = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else this._firstPT = i[n] = l = {
                    _next: this._firstPT,
                    t: e,
                    p: n,
                    f: "function" == typeof e[n],
                    n: n,
                    pg: !1,
                    pr: 0
                }, l.s = l.f ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), l.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - l.s || 0;
                l && l._next && (l._next._prev = l)
            }
            return r && this._kill(r, e) ? this._initProps(e, i, s, r) : this._overwrite > 1 && this._firstPT && s.length > 1 && W(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (E[e._gsTweenID] = !0), o)
        }, n.render = function (t, e, i) {
            var s, r, n, a, o = this._time, h = this._duration, l = this._rawPrevTime;
            if (t >= h) this._totalTime = this._time = h, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete"), 0 === h && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > l || l === _) && l !== t && (i = !0, l > _ && (r = "onReverseComplete")), this._rawPrevTime = a = !e || t || l === t ? t : _); else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === h && l > 0 && l !== _) && (r = "onReverseComplete", s = this._reversed), 0 > t && (this._active = !1, 0 === h && (this._initted || !this.vars.lazy || i) && (l >= 0 && (i = !0), this._rawPrevTime = a = !e || t || l === t ? t : _)), this._initted || (i = !0); else if (this._totalTime = this._time = t, this._easeType) {
                var u = t / h, p = this._easeType, c = this._easePower;
                (1 === p || 3 === p && u >= .5) && (u = 1 - u), 3 === p && (u *= 2), 1 === c ? u *= u : 2 === c ? u *= u * u : 3 === c ? u *= u * u * u : 4 === c && (u *= u * u * u * u), this.ratio = 1 === p ? 1 - u : 2 === p ? u : .5 > t / h ? u / 2 : 1 - u / 2
            } else this.ratio = this._ease.getRatio(t / h);
            if (this._time !== o || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = l, I.push(this), this._lazy = [t, e], void 0;
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / h) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === h) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || y))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || y)), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || y), 0 === h && this._rawPrevTime === _ && a !== _ && (this._rawPrevTime = 0))
            }
        }, n._kill = function (t, e, i) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
            var s, r, n, a, o, h, l, _, u;
            if ((c(e) || M(e)) && "number" != typeof e[0]) for (s = e.length; --s > -1;) this._kill(t, e[s]) && (h = !0); else {
                if (this._targets) {
                    for (s = this._targets.length; --s > -1;) if (e === this._targets[s]) {
                        o = this._propLookup[s] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[s] = t ? this._overwrittenProps[s] || {} : "all";
                        break
                    }
                } else {
                    if (e !== this.target) return !1;
                    o = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (o) {
                    if (l = t || o, _ = t !== r && "all" !== r && t !== o && ("object" != typeof t || !t._tempKill), i && (D.onOverwrite || this.vars.onOverwrite)) {
                        for (n in l) o[n] && (u || (u = []), u.push(n));
                        if (!G(this, i, e, u)) return !1
                    }
                    for (n in l) (a = o[n]) && (a.pg && a.t._kill(l) && (h = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[n]), _ && (r[n] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return h
        }, n.invalidate = function () {
            return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], A.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -_, this.render(-this._delay)), this
        }, n._enabled = function (t, e) {
            if (o || a.wake(), t && this._gc) {
                var i, s = this._targets;
                if (s) for (i = s.length; --i > -1;) this._siblings[i] = V(s[i], this, !0); else this._siblings = V(this.target, this, !0)
            }
            return A.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? D._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
        }, D.to = function (t, e, i) {
            return new D(t, e, i)
        }, D.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new D(t, e, i)
        }, D.fromTo = function (t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new D(t, e, s)
        }, D.delayedCall = function (t, e, i, s, r) {
            return new D(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: s,
                immediateRender: !1,
                useFrames: r,
                overwrite: 0
            })
        }, D.set = function (t, e) {
            return new D(t, 0, e)
        }, D.getTweensOf = function (t, e) {
            if (null == t) return [];
            t = "string" != typeof t ? t : D.selector(t) || t;
            var i, s, r, n;
            if ((c(t) || M(t)) && "number" != typeof t[0]) {
                for (i = t.length, s = []; --i > -1;) s = s.concat(D.getTweensOf(t[i], e));
                for (i = s.length; --i > -1;) for (n = s[i], r = i; --r > -1;) n === s[r] && s.splice(i, 1)
            } else for (s = V(t).concat(), i = s.length; --i > -1;) (s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
            return s
        }, D.killTweensOf = D.killDelayedCallsTo = function (t, e, i) {
            "object" == typeof e && (i = e, e = !1);
            for (var s = D.getTweensOf(t, e), r = s.length; --r > -1;) s[r]._kill(i, t)
        };
        var Q = g("plugins.TweenPlugin", function (t, e) {
            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = Q.prototype
        }, !0);
        if (n = Q.prototype, Q.version = "1.10.1", Q.API = 2, n._firstPT = null, n._addTween = function (t, e, i, s, r, n) {
            var a, o;
            return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
                _next: this._firstPT,
                t: t,
                p: e,
                s: i,
                c: a,
                f: "function" == typeof t[e],
                n: r || e,
                r: n
            }, o._next && (o._next._prev = o), o) : void 0
        }, n.setRatio = function (t) {
            for (var e, i = this._firstPT, s = 1e-6; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
        }, n._kill = function (t) {
            var e, i = this._overwriteProps, s = this._firstPT;
            if (null != t[this._propName]) this._overwriteProps = []; else for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
            for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
            return !1
        }, n._roundProps = function (t, e) {
            for (var i = this._firstPT; i;) (t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
        }, D._onPluginEvent = function (t, e) {
            var i, s, r, n, a, o = e._firstPT;
            if ("_onInitAllProps" === t) {
                for (; o;) {
                    for (a = o._next, s = r; s && s.pr > o.pr;) s = s._next;
                    (o._prev = s ? s._prev : n) ? o._prev._next = o : r = o, (o._next = s) ? s._prev = o : n = o, o = a
                }
                o = e._firstPT = r
            }
            for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
            return i
        }, Q.activate = function (t) {
            for (var e = t.length; --e > -1;) t[e].API === Q.API && (L[(new t[e])._propName] = t[e]);
            return !0
        }, d.plugin = function (t) {
            if (!(t && t.propName && t.init && t.API)) throw"illegal plugin definition.";
            var e, i = t.propName, s = t.priority || 0, r = t.overwriteProps, n = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_roundProps",
                initAll: "_onInitAllProps"
            }, a = g("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                Q.call(this, i, s), this._overwriteProps = r || []
            }, t.global === !0), o = a.prototype = new Q(i);
            o.constructor = a, a.API = t.API;
            for (e in n) "function" == typeof t[e] && (o[n[e]] = t[e]);
            return a.version = t.version, Q.activate([a]), a
        }, s = t._gsQueue) {
            for (r = 0; s.length > r; r++) s[r]();
            for (n in f) f[n].func || t.console.log("GSAP encountered missing dependency: com.greensock." + n)
        }
        o = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");


/*
ScrollMagic v1.3.0
The jQuery plugin for doing magical scroll interactions.
(c) 2014 Jan Paepke (@janpaepke)
License & Info: http://janpaepke.github.io/ScrollMagic

Inspired by and partially based on SUPERSCROLLORAMA by John Polacek (@johnpolacek)
http://johnpolacek.github.com/superscrollorama/

Powered by the Greensock Tweening Platform (GSAP): http://www.greensock.com/js
Greensock License info at http://www.greensock.com/licensing/
*/
/**
 @overview    ##Info
 @version    1.3.0
 @license    Dual licensed under MIT license and GPL.
 @author        Jan Paepke - e-mail@janpaepke.de

 @todo: enhancement: remove dependencies and move to plugins -> 2.0
 @todo: bug: when cascading pins (pinning one element multiple times) and later removing them without reset, positioning errors occur.
 @todo: bug: having multiple scroll directions with cascaded pins doesn't work (one scroll vertical, one horizontal)
 @todo: feature: optimize performance on debug plugin (huge drawbacks, when using many scenes)
 */
!function (e, t) {
    if ("function" == typeof define && define.amd) define(["jquery", "TweenMax", "TimelineMax"], t); else {
        var n = t(e.jQuery, e.TweenMax, e.TimelineMax);
        e.ScrollMagic = n.Controller, e.ScrollScene = n.Scene
    }
}(this, function (e, t, n) {
    var r = function (t) {
        var n, r, a = "ScrollMagic",
            f = {container: window, vertical: !0, globalSceneOptions: {}, loglevel: 2, refreshInterval: 100}, g = this,
            d = e.extend({}, f, t), h = [], p = !1, v = 0, w = "PAUSED", m = !0, R = 0, E = !0, y = function () {
                if (g.version = g.constructor.version, e.each(d, function (e) {
                    f.hasOwnProperty(e) || (I(2, 'WARNING: Unknown option "' + e + '"'), delete d[e])
                }), d.container = e(d.container).first(), 0 === d.container.length) throw I(1, "ERROR creating object " + a + ": No valid scroll container supplied"), a + " init failed.";
                m = !e.contains(document, d.container.get(0)), m || d.container.on("resize", function (e) {
                    e.stopPropagation()
                }), R = d.vertical ? d.container.height() : d.container.width(), d.container.on("scroll resize", F), d.refreshInterval = parseInt(d.refreshInterval), d.refreshInterval > 0 && (r = window.setInterval(O, d.refreshInterval)), n = c(T), I(3, "added new " + a + " controller (v" + g.version + ")")
            }, S = function () {
                return d.vertical ? d.container.scrollTop() : d.container.scrollLeft()
            }, b = function (e) {
                d.vertical ? d.container.scrollTop(e) : d.container.scrollLeft(e)
            }, T = function () {
                if (n = c(T), E && p) {
                    var t = e.isArray(p) ? p : h.slice(0), r = v;
                    v = g.scrollPos();
                    var i = v - r;
                    w = 0 === i ? "PAUSED" : i > 0 ? "FORWARD" : "REVERSE", 0 > i && t.reverse(), e.each(t, function (e, n) {
                        I(3, "updating Scene " + (e + 1) + "/" + t.length + " (" + h.length + " total)"), n.update(!0)
                    }), 0 === t.length && d.loglevel >= 3 && I(3, "updating 0 Scenes (nothing added to controller)"), p = !1
                }
            }, F = function (e) {
                "resize" == e.type && (R = d.vertical ? d.container.height() : d.container.width()), p = !0
            }, O = function () {
                m || R != (d.vertical ? d.container.height() : d.container.width()) && d.container.trigger("resize"), e.each(h, function (e, t) {
                    t.refresh()
                })
            }, I = function (e) {
                if (d.loglevel >= e) {
                    var t = "(" + a + ") ->", n = Array.prototype.splice.call(arguments, 1);
                    n.unshift(e, t), o.apply(window, n)
                }
            }, z = function (e) {
                if (e.length <= 1) return e;
                var t = e.slice(0);
                return t.sort(function (e, t) {
                    return e.scrollOffset() > t.scrollOffset() ? 1 : -1
                }), t
            };
        return this.addScene = function (t) {
            return e.isArray(t) ? e.each(t, function (e, t) {
                g.addScene(t)
            }) : t instanceof i ? t.parent() != g ? t.addTo(g) : e.inArray(t, h) < 0 && (h.push(t), h = z(h), t.on("shift." + a + "_sort", function () {
                h = z(h)
            }), e.each(d.globalSceneOptions, function (e, n) {
                t[e] && t[e].call(t, n)
            }), I(3, "added Scene (" + h.length + " total)")) : I(1, "ERROR: invalid argument supplied for '.addScene()'"), g
        }, this.removeScene = function (t) {
            if (e.isArray(t)) e.each(t, function (e, t) {
                g.removeScene(t)
            }); else {
                var n = e.inArray(t, h);
                n > -1 && (t.off("shift." + a + "_sort"), h.splice(n, 1), t.remove(), I(3, "removed Scene (" + h.length + " total)"))
            }
            return g
        }, this.updateScene = function (t, n) {
            return e.isArray(t) ? e.each(t, function (e, t) {
                g.updateScene(t, n)
            }) : n ? t.update(!0) : (e.isArray(p) || (p = []), -1 == e.inArray(t, p) && p.push(t), p = z(p)), g
        }, this.update = function (e) {
            return F({type: "resize"}), e && T(), g
        }, this.scrollTo = function (t) {
            if (t instanceof i) t.parent() === g ? g.scrollTo(t.scrollOffset()) : I(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", t); else if ("string" === e.type(t) || l(t) || t instanceof e) {
                var n = e(t).first();
                if (n[0]) {
                    var r = d.vertical ? "top" : "left", o = s(d.container), a = s(n);
                    m || (o[r] -= g.scrollPos()), g.scrollTo(a[r] - o[r])
                } else I(2, "scrollTo(): The supplied element could not be found. Scroll cancelled.", t)
            } else e.isFunction(t) ? b = t : b.call(d.container[0], t);
            return g
        }, this.scrollPos = function (t) {
            return arguments.length ? (e.isFunction(t) ? S = t : I(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."), g) : S.call(g)
        }, this.info = function (e) {
            var t = {
                size: R,
                vertical: d.vertical,
                scrollPos: v,
                scrollDirection: w,
                container: d.container,
                isDocument: m
            };
            return arguments.length ? void 0 !== t[e] ? t[e] : void I(1, 'ERROR: option "' + e + '" is not available') : t
        }, this.loglevel = function (e) {
            return arguments.length ? (d.loglevel != e && (d.loglevel = e), g) : d.loglevel
        }, this.enabled = function (e) {
            return arguments.length ? (E != e && (E = !!e, g.updateScene(h, !0)), g) : E
        }, this.destroy = function (e) {
            window.clearTimeout(r);
            for (var t = h.length; t--;) h[t].destroy(e);
            return d.container.off("scroll resize", F), u(n), I(3, "destroyed " + a + " (reset: " + (e ? "true" : "false") + ")"), null
        }, y(), g
    };
    r.version = "1.3.0";
    var i = function (t) {
        var i, l, c, u, f, g, d, h = {onCenter: .5, onEnter: 1, onLeave: 0}, p = "ScrollScene", v = {
            duration: 0,
            offset: 0,
            triggerElement: null,
            triggerHook: "onCenter",
            reverse: !0,
            tweenChanges: !1,
            loglevel: 2
        }, w = this, m = e.extend({}, v, t), R = "BEFORE", E = 0, y = {start: 0, end: 0}, S = 0, b = !0, T = {
            unknownOptionSupplied: function () {
                e.each(m, function (e) {
                    v.hasOwnProperty(e) || (O(2, 'WARNING: Unknown option "' + e + '"'), delete m[e])
                })
            }, duration: function () {
                if (e.isFunction(m.duration)) {
                    i = m.duration;
                    try {
                        m.duration = parseFloat(i())
                    } catch (t) {
                        O(1, 'ERROR: Invalid return value of supplied function for option "duration":', m.duration), i = void 0, m.duration = v.duration
                    }
                } else m.duration = parseFloat(m.duration), (!e.isNumeric(m.duration) || m.duration < 0) && (O(1, 'ERROR: Invalid value for option "duration":', m.duration), m.duration = v.duration)
            }, offset: function () {
                m.offset = parseFloat(m.offset), e.isNumeric(m.offset) || (O(1, 'ERROR: Invalid value for option "offset":', m.offset), m.offset = v.offset)
            }, triggerElement: function () {
                null !== m.triggerElement && 0 === e(m.triggerElement).length && (O(1, 'ERROR: Element defined in option "triggerElement" was not found:', m.triggerElement), m.triggerElement = v.triggerElement)
            }, triggerHook: function () {
                m.triggerHook in h || (e.isNumeric(m.triggerHook) ? m.triggerHook = Math.max(0, Math.min(parseFloat(m.triggerHook), 1)) : (O(1, 'ERROR: Invalid value for option "triggerHook": ', m.triggerHook), m.triggerHook = v.triggerHook))
            }, reverse: function () {
                m.reverse = !!m.reverse
            }, tweenChanges: function () {
                m.tweenChanges = !!m.tweenChanges
            }, loglevel: function () {
                if (m.loglevel = parseInt(m.loglevel), !e.isNumeric(m.loglevel) || m.loglevel < 0 || m.loglevel > 3) {
                    var t = m.loglevel;
                    m.loglevel = v.loglevel, O(1, 'ERROR: Invalid value for option "loglevel":', t)
                }
            }
        }, F = function () {
            I(), w.on("change.internal", function (e) {
                "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? D() : "reverse" === e.what && w.update())
            }).on("shift.internal", function (e) {
                C(), w.update(), ("AFTER" === R && "duration" === e.reason || "DURING" === R && 0 === m.duration) && P()
            }).on("progress.internal", function () {
                A(), P()
            }).on("destroy", function (e) {
                e.preventDefault()
            })
        }, O = function (e) {
            if (m.loglevel >= e) {
                var t = "(" + p + ") ->", n = Array.prototype.splice.call(arguments, 1);
                n.unshift(e, t), o.apply(window, n)
            }
        }, I = function (t) {
            if (arguments.length) e.isArray(t) || (t = [t]); else {
                t = [];
                for (var n in T) t.push(n)
            }
            e.each(t, function (e, t) {
                T[t] && T[t]()
            })
        }, z = function (e, t) {
            var n = !1, r = m[e];
            return m[e] != t && (m[e] = t, I(e), n = r != m[e]), n
        }, C = function () {
            y = {start: S + m.offset}, l && m.triggerElement && (y.start -= l.info("size") * w.triggerHook()), y.end = y.start + m.duration
        }, N = function (e) {
            if (i) {
                var t = "duration";
                z(t, i.call(w)) && !e && (w.trigger("change", {what: t, newval: m[t]}), w.trigger("shift", {reason: t}))
            }
        }, D = function (t) {
            var n = 0;
            if (l && m.triggerElement) {
                for (var r = e(m.triggerElement).first(), i = l.info(), o = s(i.container), a = i.vertical ? "top" : "left"; r.parent().data("ScrollMagicPinSpacer");) r = r.parent();
                var c = s(r);
                i.isDocument || (o[a] -= l.scrollPos()), n = c[a] - o[a]
            }
            var u = n != S;
            S = n, u && !t && w.trigger("shift", {reason: "triggerElementPosition"})
        }, A = function (e) {
            if (c) {
                var t = e >= 0 && 1 >= e ? e : E;
                if (-1 === c.repeat()) if ("DURING" === R && c.paused()) c.play(); else {
                    if ("DURING" === R || c.paused()) return !1;
                    c.pause()
                } else {
                    if (t == c.progress()) return !1;
                    0 === m.duration ? "DURING" === R ? c.play() : c.reverse() : m.tweenChanges ? c.tweenTo(t * c.duration()) : c.progress(t).pause()
                }
                return !0
            }
            return !1
        }, P = function (e) {
            if (u && l) {
                var t = l.info();
                if (e || "DURING" !== R) {
                    var n = {position: f.inFlow ? "relative" : "absolute", top: 0, left: 0},
                        r = u.css("position") != n.position;
                    f.pushFollowers ? m.duration > 0 && ("AFTER" === R && 0 === parseFloat(f.spacer.css("padding-top")) ? r = !0 : "BEFORE" === R && 0 === parseFloat(f.spacer.css("padding-bottom")) && (r = !0)) : n[t.vertical ? "top" : "left"] = m.duration * E, u.css(n), r && (u.removeClass(f.pinnedClass), x())
                } else {
                    "fixed" != u.css("position") && (u.css("position", "fixed"), x(), u.addClass(f.pinnedClass));
                    var i = s(f.spacer, !0),
                        o = m.reverse || 0 === m.duration ? t.scrollPos - y.start : Math.round(E * m.duration * 10) / 10;
                    i.top -= parseFloat(f.spacer.css("margin-top")), i[t.vertical ? "top" : "left"] += o, u.css({
                        top: i.top,
                        left: i.left
                    })
                }
            }
        }, x = function () {
            if (u && l && f.inFlow) {
                var t = "AFTER" === R, n = "BEFORE" === R, r = "DURING" === R, i = "fixed" == u.css("position"),
                    o = l.info("vertical"), s = f.spacer.children().first(), c = a(f.spacer.css("display")), g = {};
                c ? (g["margin-top"] = n || r && i ? u.css("margin-top") : "auto", g["margin-bottom"] = t || r && i ? u.css("margin-bottom") : "auto") : g["margin-top"] = g["margin-bottom"] = "auto", f.relSize.width || f.relSize.autoFullWidth ? i ? e(window).width() == f.spacer.parent().width() ? u.css("width", f.relSize.autoFullWidth ? "100%" : "inherit") : u.css("width", f.spacer.width()) : u.css("width", "100%") : (g["min-width"] = s.outerWidth(!s.is(u)), g.width = i ? g["min-width"] : "auto"), f.relSize.height ? i ? e(window).height() == f.spacer.parent().height() ? u.css("height", "inherit") : u.css("height", f.spacer.height()) : u.css("height", "100%") : (g["min-height"] = s.outerHeight(!c), g.height = i ? g["min-height"] : "auto"), f.pushFollowers && (g["padding" + (o ? "Top" : "Left")] = m.duration * E, g["padding" + (o ? "Bottom" : "Right")] = m.duration * (1 - E)), f.spacer.css(g)
            }
        }, k = function () {
            l && u && "DURING" === R && !l.info("isDocument") && P()
        }, M = function () {
            l && u && "DURING" === R && ((f.relSize.width || f.relSize.autoFullWidth) && e(window).width() != f.spacer.parent().width() || f.relSize.height && e(window).height() != f.spacer.parent().height()) && x()
        }, G = function (e) {
            l && u && "DURING" === R && !l.info("isDocument") && (e.preventDefault(), l.scrollTo(l.info("scrollPos") - (e.originalEvent.wheelDelta / 3 || 30 * -e.originalEvent.detail)))
        };
        return this.parent = function () {
            return l
        }, this.duration = function (t) {
            var n = "duration";
            return arguments.length ? (e.isFunction(t) || (i = void 0), z(n, t) && (w.trigger("change", {
                what: n,
                newval: m[n]
            }), w.trigger("shift", {reason: n})), w) : m[n]
        }, this.offset = function (e) {
            var t = "offset";
            return arguments.length ? (z(t, e) && (w.trigger("change", {
                what: t,
                newval: m[t]
            }), w.trigger("shift", {reason: t})), w) : m[t]
        }, this.triggerElement = function (e) {
            var t = "triggerElement";
            return arguments.length ? (z(t, e) && w.trigger("change", {what: t, newval: m[t]}), w) : m[t]
        }, this.triggerHook = function (t) {
            var n = "triggerHook";
            return arguments.length ? (z(n, t) && (w.trigger("change", {
                what: n,
                newval: m[n]
            }), w.trigger("shift", {reason: n})), w) : e.isNumeric(m[n]) ? m[n] : h[m[n]]
        }, this.reverse = function (e) {
            var t = "reverse";
            return arguments.length ? (z(t, e) && w.trigger("change", {what: t, newval: m[t]}), w) : m[t]
        }, this.tweenChanges = function (e) {
            var t = "tweenChanges";
            return arguments.length ? (z(t, e) && w.trigger("change", {what: t, newval: m[t]}), w) : m[t]
        }, this.loglevel = function (e) {
            var t = "loglevel";
            return arguments.length ? (z(t, e) && w.trigger("change", {what: t, newval: m[t]}), w) : m[t]
        }, this.state = function () {
            return R
        }, this.triggerPosition = function () {
            var e = m.offset;
            return l && (e += m.triggerElement ? S : l.info("size") * w.triggerHook()), e
        }, this.triggerOffset = function () {
            return w.triggerPosition()
        }, this.scrollOffset = function () {
            return y.start
        }, this.update = function (e) {
            if (l) if (e) if (l.enabled() && b) {
                var t, n = l.info("scrollPos");
                t = m.duration > 0 ? (n - y.start) / (y.end - y.start) : n >= y.start ? 1 : 0, w.trigger("update", {
                    startPos: y.start,
                    endPos: y.end,
                    scrollPos: n
                }), w.progress(t)
            } else u && "DURING" === R && P(!0); else l.updateScene(w, !1);
            return w
        }, this.refresh = function () {
            return N(), D(), w
        }, this.progress = function (e) {
            if (arguments.length) {
                var t = !1, n = R, r = l ? l.info("scrollDirection") : "PAUSED", i = m.reverse || e >= E;
                if (0 === m.duration ? (t = E != e, E = 1 > e && i ? 0 : 1, R = 0 === E ? "BEFORE" : "DURING") : 0 >= e && "BEFORE" !== R && i ? (E = 0, R = "BEFORE", t = !0) : e > 0 && 1 > e && i ? (E = e, R = "DURING", t = !0) : e >= 1 && "AFTER" !== R ? (E = 1, R = "AFTER", t = !0) : "DURING" !== R || i || P(), t) {
                    var o = {progress: E, state: R, scrollDirection: r}, s = R != n, a = function (e) {
                        w.trigger(e, o)
                    };
                    s && "DURING" !== n && (a("enter"), a("BEFORE" === n ? "start" : "end")), a("progress"), s && "DURING" !== R && (a("BEFORE" === R ? "start" : "end"), a("leave"))
                }
                return w
            }
            return E
        }, this.setTween = function (t) {
            if (!n) return O(1, "ERROR: TimelineMax wasn't found. Please make sure GSAP is loaded before ScrollMagic or use asynchronous loading."), w;
            c && w.removeTween();
            try {
                c = new n({smoothChildTiming: !0}).add(t).pause()
            } catch (r) {
                O(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject")
            } finally {
                t.repeat && -1 === t.repeat() && (c.repeat(-1), c.yoyo(t.yoyo()))
            }
            if (c && l && m.triggerElement && m.loglevel >= 2) {
                var i = c.getTweensOf(e(m.triggerElement)), o = l.info("vertical");
                e.each(i, function (e, t) {
                    var n = t.vars.css || t.vars,
                        r = o ? void 0 !== n.top || void 0 !== n.bottom : void 0 !== n.left || void 0 !== n.right;
                    return r ? (O(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!"), !1) : void 0
                })
            }
            if (parseFloat(TweenLite.version) >= 1.14) for (var s, a, u = c.getChildren(!0, !0, !1), f = function () {
                O(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another")
            }, g = 0; g < u.length; g++) s = u[g], a !== f && (a = s.vars.onOverwrite, s.vars.onOverwrite = function () {
                a && a.apply(this, arguments), f.apply(this, arguments)
            });
            return O(3, "added tween"), A(), w
        }, this.removeTween = function (e) {
            return c && (e && A(0), c.kill(), c = void 0, O(3, "removed tween (reset: " + (e ? "true" : "false") + ")")), w
        }, this.setPin = function (t, n) {
            var r = {pushFollowers: !0, spacerClass: "scrollmagic-pin-spacer", pinnedClass: ""};
            if (n = e.extend({}, r, n), t = e(t).first(), 0 === t.length) return O(1, "ERROR calling method 'setPin()': Invalid pin element supplied."), w;
            if ("fixed" == t.css("position")) return O(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."), w;
            if (u) {
                if (u === t) return w;
                w.removePin()
            }
            u = t, u.parent().hide();
            var i = "absolute" != u.css("position"), o = u.css(["display", "top", "left", "bottom", "right"]),
                s = u.css(["width", "height"]);
            u.parent().show(), "0px" === s.width && i && a(o.display), !i && n.pushFollowers && (O(2, "WARNING: If the pinned element is positioned absolutely pushFollowers is disabled."), n.pushFollowers = !1);
            var l = e("<div></div>").addClass(n.spacerClass).css(o).data("ScrollMagicPinSpacer", !0).css({
                position: i ? "relative" : "absolute",
                "margin-left": "auto",
                "margin-right": "auto",
                "box-sizing": "content-box"
            }), c = u[0].style;
            return f = {
                spacer: l,
                relSize: {
                    width: "%" === s.width.slice(-1),
                    height: "%" === s.height.slice(-1),
                    autoFullWidth: "0px" === s.width && i && a(o.display)
                },
                pushFollowers: n.pushFollowers,
                inFlow: i,
                origStyle: {
                    width: c.width || "",
                    position: c.position || "",
                    top: c.top || "",
                    left: c.left || "",
                    bottom: c.bottom || "",
                    right: c.right || "",
                    "box-sizing": c["box-sizing"] || "",
                    "-moz-box-sizing": c["-moz-box-sizing"] || "",
                    "-webkit-box-sizing": c["-webkit-box-sizing"] || ""
                },
                pinnedClass: n.pinnedClass
            }, f.relSize.width && l.css("width", s.width), f.relSize.height && l.css("height", s.height), u.before(l).appendTo(l).css({
                position: i ? "relative" : "absolute",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }), (f.relSize.width || f.relSize.autoFullWidth) && u.css("box-sizing", "border-box"), e(window).on("scroll." + p + "_pin resize." + p + "_pin", k), u.on("mousewheel DOMMouseScroll", G), O(3, "added pin"), P(), w
        }, this.removePin = function (t) {
            return u && (t || !l ? (u.insertBefore(f.spacer).css(f.origStyle), f.spacer.remove()) : "DURING" === R && P(!0), e(window).off("scroll." + p + "_pin resize." + p + "_pin"), u.off("mousewheel DOMMouseScroll", G), u = void 0, O(3, "removed pin (reset: " + (t ? "true" : "false") + ")")), w
        }, this.setClassToggle = function (t, n) {
            var r = e(t);
            return 0 === r.length || "string" !== e.type(n) ? (O(1, "ERROR calling method 'setClassToggle()': Invalid " + (0 === r.length ? "element" : "classes") + " supplied."), w) : (g = n, d = r, w.on("enter.internal_class leave.internal_class", function (e) {
                d.toggleClass(g, "enter" === e.type)
            }), w)
        }, this.removeClassToggle = function (e) {
            return d && e && d.removeClass(g), w.off("start.internal_class end.internal_class"), g = void 0, d = void 0, w
        }, this.addTo = function (e) {
            return e instanceof r ? l != e && (l && l.removeScene(w), l = e, I(), N(!0), D(!0), C(), x(), l.info("container").on("resize." + p, function () {
                M(), w.triggerHook() > 0 && w.trigger("shift", {reason: "containerSize"})
            }), O(3, "added " + p + " to controller"), e.addScene(w), w.update()) : O(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic controller"), w
        }, this.enabled = function (e) {
            return arguments.length ? (b != e && (b = !!e, w.update(!0)), w) : b
        }, this.remove = function () {
            if (l) {
                l.info("container").off("resize." + p);
                var e = l;
                l = void 0, O(3, "removed " + p + " from controller"), e.removeScene(w)
            }
            return w
        }, this.destroy = function (e) {
            return w.removeTween(e), w.removePin(e), w.removeClassToggle(e), w.trigger("destroy", {reset: e}), w.remove(), w.off("start end enter leave progress change update shift destroy shift.internal change.internal progress.internal"), O(3, "destroyed " + p + " (reset: " + (e ? "true" : "false") + ")"), null
        }, this.on = function (t, n) {
            if (e.isFunction(n)) {
                var r = e.trim(t).toLowerCase().replace(/(\w+)\.(\w+)/g, "$1." + p + "_$2").replace(/( |^)(\w+)(?= |$)/g, "$1$2." + p);
                e(w).on(r, n)
            } else O(1, "ERROR calling method 'on()': Supplied argument is not a valid callback!");
            return w
        }, this.off = function (t, n) {
            var r = e.trim(t).toLowerCase().replace(/(\w+)\.(\w+)/g, "$1." + p + "_$2").replace(/( |^)(\w+)(?= |$)/g, "$1$2." + p + "$3");
            return e(w).off(r, n), w
        }, this.trigger = function (t, n) {
            O(3, "event fired:", t, "->", n);
            var r = e.Event(e.trim(t).toLowerCase(), n);
            return e(w).trigger(r), w
        }, F(), w
    }, o = function (e) {
        var t = ["error", "warn", "log"];
        e.log || (e.log = function () {
        });
        for (var n, r = 0; r < t.length; r++) n = t[r], e[n] || (e[n] = e.log);
        return function (n) {
            (n > t.length || 0 >= n) && (n = t.length);
            var r = new Date,
                i = ("0" + r.getHours()).slice(-2) + ":" + ("0" + r.getMinutes()).slice(-2) + ":" + ("0" + r.getSeconds()).slice(-2) + ":" + ("00" + r.getMilliseconds()).slice(-3),
                o = t[n - 1], s = Array.prototype.splice.call(arguments, 1), l = Function.prototype.bind.call(e[o], e);
            s.unshift(i), l.apply(e, s)
        }
    }(window.console = window.console || {}), s = function (e, t) {
        var n = {top: 0, left: 0};
        if (e = e[0], e && e.getBoundingClientRect) {
            var r = e.getBoundingClientRect();
            n.top = r.top, n.left = r.left, t || (n.top += (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), n.left += (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0))
        }
        return n
    }, l = function (e) {
        return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
    }, a = function (e) {
        return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
    }, c = window.requestAnimationFrame, u = window.cancelAnimationFrame;
    return function (e) {
        var t, n = 0, r = ["ms", "moz", "webkit", "o"];
        for (t = 0; !c && t < r.length; ++t) c = e[r[t] + "RequestAnimationFrame"], u = e[r[t] + "CancelAnimationFrame"] || e[r[t] + "CancelRequestAnimationFrame"];
        c || (c = function (t) {
            var r = (new Date).getTime(), i = Math.max(0, 16 - (r - n)), o = e.setTimeout(function () {
                t(r + i)
            }, i);
            return n = r + i, o
        }), u || (u = function (t) {
            e.clearTimeout(t)
        })
    }(window), {Controller: r, Scene: i}
});
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/*BKO: Changed rows: from 1 to 0*/
(function (i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
})(function (i) {
    "use strict";
    var e = window.Slick || {};
    e = function () {
        function e(e, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(e),
                appendDots: i(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 0,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(e), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(e).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = t++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }

        var t = 0;
        return e
    }(), e.prototype.activateADA = function () {
        var i = this;
        i.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
    }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null; else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : o === !0 ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({height: e}, i.options.speed)
        }
    }, e.prototype.animateSlide = function (e, t) {
        var o = {}, s = this;
        s.animateHeight(), s.options.rtl === !0 && s.options.vertical === !1 && (e = -e), s.transformsEnabled === !1 ? s.options.vertical === !1 ? s.$slideTrack.animate({left: e}, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({top: e}, s.options.speed, s.options.easing, t) : s.cssTransitions === !1 ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft), i({animStart: s.currentLeft}).animate({animStart: e}, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function (i) {
                i = Math.ceil(i), s.options.vertical === !1 ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function () {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), s.options.vertical === !1 ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function () {
        var e = this, t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function (e) {
        var t = this, o = t.getNavTarget();
        null !== o && "object" == typeof o && o.each(function () {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function (i) {
        var e = this, t = {};
        e.options.fade === !1 ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function () {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function () {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function () {
        var i = this, e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (i.options.infinite === !1 && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 === 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function () {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function () {
        var e, t, o = this;
        if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function () {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), e.options.centerMode !== !0 && e.options.swipeToSlide !== !0 || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function () {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 0) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function (e, t) {
        var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || l === !1 || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function (e, t) {
        var o, s, n, r = this, l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll !== 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case"previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case"next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case"index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function (i) {
        var e, t, o = this;
        if (e = o.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1]; else for (var s in e) {
            if (i < e[s]) {
                i = t;
                break
            }
            t = e[s]
        }
        return i
    }, e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), e.options.accessibility === !0 && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), e.options.accessibility === !0 && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function () {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function () {
        var i, e = this;
        e.options.rows > 0 && (i = e.$slides.children().children(), i.removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function (i) {
        var e = this;
        e.shouldClick === !1 && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function (e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function (i) {
        var e = this, t = {};
        t[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function (i, e) {
        var t = this;
        t.cssTransitions === !1 ? (t.$slides.eq(i).css({zIndex: t.options.zIndex}), t.$slides.eq(i).animate({opacity: 1}, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function () {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function (i) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function () {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function (t) {
            var o = i(this);
            setTimeout(function () {
                e.options.pauseOnFocus && o.is(":focus") && (e.focussed = !0, e.autoPlay())
            }, 0)
        }).on("blur.slick", "*", function (t) {
            i(this);
            e.options.pauseOnFocus && (e.focussed = !1, e.autoPlay())
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        var i = this;
        return i.currentSlide
    }, e.prototype.getDotCount = function () {
        var i = this, e = 0, t = 0, o = 0;
        if (i.options.infinite === !0) if (i.slideCount <= i.options.slidesToShow) ++o; else for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else if (i.options.centerMode === !0) o = i.slideCount; else if (i.options.asNavFor) for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function (i) {
        var e, t, o, s, n = this, r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, n.options.vertical === !0 && n.options.centerMode === !0 && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll !== 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = n.options.vertical === !1 ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, n.options.variableWidth === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, n.options.centerMode === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
        var e = this;
        return e.options[i]
    }, e.prototype.getNavigableIndexes = function () {
        var i, e = this, t = 0, o = 0, s = [];
        for (e.options.infinite === !1 ? i = e.slideCount : (t = e.options.slidesToScroll * -1, o = e.options.slidesToScroll * -1, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function () {
        return this
    }, e.prototype.getSlideCount = function () {
        var e, t, o, s, n = this;
        return s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0, o = n.swipeLeft * -1 + s, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function (e, s) {
            var r, l, d;
            if (r = i(s).outerWidth(), l = s.offsetLeft, n.options.centerMode !== !0 && (l += r / 2), d = l + r, o < d) return t = s, !1
        }), e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
        var t = this;
        t.changeSlide({data: {message: "index", index: parseInt(i)}}, e)
    }, e.prototype.init = function (e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), t.options.accessibility === !0 && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function () {
        var e = this, t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function (i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({tabindex: "-1"}), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
            var s = o.indexOf(t);
            if (i(this).attr({role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1}), s !== -1) {
                var n = "slick-slide-control" + e.instanceUid + s;
                i("#" + n).length && i(this).attr({"aria-describedby": n})
            }
        }), e.$dots.attr("role", "tablist").find("li").each(function (s) {
            var n = o[s];
            i(this).attr({role: "presentation"}), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({"aria-selected": "true", tabindex: "0"}).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.options.focusOnChange ? e.$slides.eq(s).attr({tabindex: "0"}) : e.$slides.eq(s).removeAttr("tabindex");
        e.activateADA()
    }, e.prototype.initArrowEvents = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {message: "previous"}, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {message: "next"}, i.changeSlide), i.options.accessibility === !0 && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function () {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && (i("li", e.$dots).on("click.slick", {message: "index"}, e.changeSlide), e.options.accessibility === !0 && e.$dots.on("keydown.slick", e.keyHandler)), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function () {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {action: "start"}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {action: "move"}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {action: "end"}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function (i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && e.options.accessibility === !0 ? e.changeSlide({data: {message: e.options.rtl === !0 ? "next" : "previous"}}) : 39 === i.keyCode && e.options.accessibility === !0 && e.changeSlide({data: {message: e.options.rtl === !0 ? "previous" : "next"}}))
    }, e.prototype.lazyLoad = function () {
        function e(e) {
            i("img[data-lazy]", e).each(function () {
                var e = i(this), t = i(this).attr("data-lazy"), o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"), n = document.createElement("img");
                n.onload = function () {
                    e.animate({opacity: 0}, 100, function () {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({opacity: 1}, 200, function () {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), r.$slider.trigger("lazyLoaded", [r, e, t])
                    })
                }, n.onerror = function () {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, t])
                }, n.src = t
            })
        }

        var t, o, s, n, r = this;
        if (r.options.centerMode === !0 ? r.options.infinite === !0 ? (s = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = s + r.options.slidesToShow + 2) : (s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(s + r.options.slidesToShow), r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)), t = r.$slider.find(".slick-slide").slice(s, n), "anticipated" === r.options.lazyLoad) for (var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) l < 0 && (l = r.slideCount - 1), t = t.add(a.eq(l)), t = t.add(a.eq(d)), l--, d++;
        e(t), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), e(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(r.options.slidesToShow * -1), e(o))
    }, e.prototype.loadSlider = function () {
        var i = this;
        i.setPosition(), i.$slideTrack.css({opacity: 1}), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function () {
        var i = this;
        i.changeSlide({data: {message: "next"}})
    }, e.prototype.orientationChange = function () {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function () {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function () {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function (e) {
        var t = this;
        if (!t.unslicked && (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && (t.initADA(), t.options.focusOnChange))) {
            var o = i(t.$slides.get(t.currentSlide));
            o.attr("tabindex", 0).focus()
        }
    }, e.prototype.prev = e.prototype.slickPrev = function () {
        var i = this;
        i.changeSlide({data: {message: "previous"}})
    }, e.prototype.preventDefault = function (i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), r = document.createElement("img"), r.onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), l.options.adaptiveHeight === !0 && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function () {
            e < 3 ? setTimeout(function () {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function (e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {currentSlide: t}), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function () {
        var e, t, o, s = this, n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n) if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
            }
            s.breakpoints.sort(function (i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function () {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function () {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
        var o = this;
        return "boolean" == typeof i ? (e = i, i = e === !0 ? 0 : o.slideCount - 1) : i = e === !0 ? --i : i, !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) && (o.unload(), t === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
    }, e.prototype.setCSS = function (i) {
        var e, t, o = this, s = {};
        o.options.rtl === !0 && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, o.transformsEnabled === !1 ? o.$slideTrack.css(s) : (s = {}, o.cssTransitions === !1 ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function () {
        var i = this;
        i.options.vertical === !1 ? i.options.centerMode === !0 && i.$list.css({padding: "0px " + i.options.centerPadding}) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), i.options.centerMode === !0 && i.$list.css({padding: i.options.centerPadding + " 0px"})), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), i.options.vertical === !1 && i.options.variableWidth === !1 ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : i.options.variableWidth === !0 ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        i.options.variableWidth === !1 && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function () {
        var e, t = this;
        t.$slides.each(function (o, s) {
            e = t.slideWidth * o * -1, t.options.rtl === !0 ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0})
        }), t.$slides.eq(t.currentSlide).css({zIndex: t.options.zIndex - 1, opacity: 1})
    }, e.prototype.setHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function () {
        var e, t, o, s, n, r = this, l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : "undefined" != typeof arguments[1] && (n = "single")), "single" === n) r.options[o] = s; else if ("multiple" === n) i.each(o, function (i, e) {
            r.options[i] = e
        }); else if ("responsive" === n) for (t in s) if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]]; else {
            for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
            r.options.responsive.push(s[t])
        }
        l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function () {
        var i = this;
        i.setDimensions(), i.setHeight(), i.options.fade === !1 ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function () {
        var i = this, e = document.body.style;
        i.positionProp = i.options.vertical === !0 ? "top" : "left",
            "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || i.options.useCSS === !0 && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && i.animType !== !1 && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && i.animType !== !1
    }, e.prototype.setSlideClasses = function (i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), n.options.centerMode === !0) {
            var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = n.options.infinite === !0 ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function () {
        var e, t, o, s = this;
        if (s.options.fade === !0 && (s.options.centerMode = !1), s.options.infinite === !0 && s.options.fade === !1 && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function (i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function (e) {
        var t = this, o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        return s || (s = 0), t.slideCount <= t.options.slidesToShow ? void t.slideHandler(s, !1, !0) : void t.slideHandler(s)
    }, e.prototype.slideHandler = function (i, e, t) {
        var o, s, n, r, l, d = null, a = this;
        if (e = e || !1, !(a.animating === !0 && a.options.waitForAnimate === !0 || a.options.fade === !0 && a.currentSlide === i)) return e === !1 && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, a.options.infinite === !1 && a.options.centerMode === !1 && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll) ? void (a.options.fade === !1 && (o = a.currentSlide, t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function () {
            a.postSlide(o)
        }) : a.postSlide(o))) : a.options.infinite === !1 && a.options.centerMode === !0 && (i < 0 || i > a.slideCount - a.options.slidesToScroll) ? void (a.options.fade === !1 && (o = a.currentSlide, t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function () {
            a.postSlide(o)
        }) : a.postSlide(o))) : (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll !== 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll !== 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = a.getNavTarget(), l = l.slick("getSlick"), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide)), a.updateDots(), a.updateArrows(), a.options.fade === !0 ? (t !== !0 ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
            a.postSlide(s)
        })) : a.postSlide(s), void a.animateHeight()) : void (t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(d, function () {
            a.postSlide(s)
        }) : a.postSlide(s)))
    }, e.prototype.startLoad = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function () {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), o = Math.round(180 * t / Math.PI), o < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? s.options.rtl === !1 ? "left" : "right" : o <= 360 && o >= 315 ? s.options.rtl === !1 ? "left" : "right" : o >= 135 && o <= 225 ? s.options.rtl === !1 ? "right" : "left" : s.options.verticalSwiping === !0 ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function (i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case"left":
                case"down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case"right":
                case"up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function (i) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && i.type.indexOf("mouse") !== -1)) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case"start":
                e.swipeStart(i);
                break;
            case"move":
                e.swipeMove(i);
                break;
            case"end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function (i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (l.options.verticalSwiping === !0 && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (l.options.rtl === !1 ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), l.options.verticalSwiping === !0 && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, l.options.infinite === !1 && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), l.options.vertical === !1 ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s), l.options.fade !== !0 && l.options.touchMove !== !1 && (l.animating === !0 ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function (i) {
        var e, t = this;
        return t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, void (t.dragging = !0))
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function () {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function (i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function () {
        var i, e = this;
        i = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function () {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function () {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function () {
        var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length;
        for (i = 0; i < r; i++) if ("object" == typeof s || "undefined" == typeof s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), "undefined" != typeof t) return t;
        return o
    }
});

function createSlick(i) {
    $(".slick-gallery-" + i).slick({
        dots: !0,
        lazyLoad: "progressive",
        infinite: !0,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        slide: ".slick-item",
        asNavFor: ".slick-captions-" + i,
        autoplay: !1
    }), $(".slick-captions-" + i).slick({
        dots: !1,
        arrows: !1,
        infinite: !0,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: !0,
        slide: ".slick-item",
        asNavFor: ".slick-gallery-" + i
    })
}

$(".slick-gallery").each(function (i) {
    var s = i + 1;
    $(this).addClass("slick-gallery-" + s), $(this).next().addClass("slick-captions-" + s), createSlick(s)
}), function () {
    "use strict";

    function i(p, n, f) {
        if (0 < p.length) {
            var e = [];
            void 0 !== n && "" !== n || (n = 0), void 0 !== f && "" !== f || (f = 0), $(p).each(function (i, s) {
                e.push(window[$(s).attr("id")])
            }), $(e).each(function (i, s) {
                for (var e, o, l, t, a, d, n = "", r = $(p[i]).find(".slides"), c = f; c < s.length; c++) n += (o = c, d = a = t = l = void 0, l = "", t = (e = s)[3][o], a = e[0][o], d = e[1][o], void 0 !== a && "" !== a || (a = ""), void 0 !== t && "" !== t || (t = ""), void 0 !== d && "" !== d || (d = ""), l += "<li>", l += '<img alt="' + t + '" src="' + a + '" data-zoomed="' + d + '" data-low-q="' + a + '" />', l += "</li>");
                0 === f ? r.empty().append(n) : r.append(n)
            }), $(e).each(function (i, s) {
                for (var e, o, l, t = "", a = $(p[i]).closest("figure").find("figcaption"), d = n; d < s.length; d++) t += (e = d, l = o = void 0, (o = "") !== (l = s[2][e]) && void 0 !== l || (l = ""), o += '<div class="caption">', o += l, o += "</div>");
                0 === n ? $(a).empty().append(t) : $(a).append(t), $(a).prepend('<div class="imgcount"><span class="current-count">' + (i + 1) + "</span> / " + s.length + "</div>")
            }), $(e).each(function (i) {
                var s, e, o, l;
                s = p[i], e = $(s).find(".slides"), o = $(s).closest("figure").find("figcaption"), l = $(s).closest("figure").find(".current-count"), $(e).slick({
                    dots: !1,
                    lazyLoad: "progressive",
                    infinite: !0,
                    speed: 300,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    slide: "li",
                    autoplay: !1,
                    asNavFor: o
                }), $(o).slick({
                    dots: !1,
                    arrows: !1,
                    lazyLoad: "progressive",
                    infinite: !0,
                    speed: 300,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    slide: ".caption",
                    autoplay: !1,
                    asNavFor: e
                }), $(e, o).on("afterChange", function () {
                    var i = parseInt($(e).find(".slick-active").attr("data-slick-index")) + 1;
                    l.empty().text(i)
                })
            })
        }
    }

    function s() {
        $(document).on("click", ".inlinegallery + .zoomin", function () {
            var i = $(this).closest("figure"), s = i.find("figcaption"), e = i.find("img[data-zoomed]");
            $(e).each(function () {
                var i = $(this).attr("data-zoomed"), s = $(this).attr("data-low-q");
                i !== $(this).attr("src") ? $(this).attr("src", i) : $(this).attr("src", s)
            }), i.toggleClass("zoomed"), i.find(".slides").slick("refresh"), s.slick("refresh")
        })
    }

    i($("body").find(".inlinegallery[id^=gallery]")), s()
}(), $("div:not(.inlinegallery)>.slides").slick({
    dots: !0,
    lazyLoad: "progressive",
    infinite: !0,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    slide: "li",
    autoplay: !1
}), $(".clippings-slider").slick({
    dots: !0,
    arrows: !1,
    lazyLoad: "progressive",
    infinite: !0,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    slide: ".social-clipping",
    autoplay: !0
}), $(".video-slider").slick({
    dots: !1,
    lazyLoad: "progressive",
    infinite: !0,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    slide: ".video-slider__item",
    autoplay: !1,
    responsive: [{breakpoint: 1024, settings: {slidesToShow: 2, slidesToScroll: 1}}, {
        breakpoint: 768,
        settings: {slidesToShow: 1, slidesToScroll: 1}
    }]
}), $(".product-slider").slick({
    dots: !0,
    lazyLoad: "progressive",
    infinite: !0,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    slide: ".product-slider__item",
    autoplay: !0,
    responsive: [{breakpoint: 1024, settings: {slidesToShow: 2, slidesToScroll: 1, arrows: !0}}, {
        breakpoint: 768,
        settings: {slidesToShow: 1, slidesToScroll: 1, arrows: !1}
    }]
});

function setCookie(e, t, i, n, a, o) {
    "use strict";
    var r = new Date;
    r.setTime(r.getTime()), i && (i = 1e3 * i * 60 * 60 * 24);
    var s = new Date(r.getTime() + i),
        d = e + "=" + escape(t) + "; path=/" + (i ? "; expires=" + s.toGMTString() : "") + (a ? "; domain=" + a : "") + (o ? "; secure" : "");
    document.cookie = d
}

function getCookie(e) {
    "use strict";
    var t = document.cookie, i = e + "=", n = t.indexOf("; " + i);
    if (-1 === n) {
        if (0 !== (n = t.indexOf(i))) return null
    } else n += 2;
    var a = document.cookie.indexOf(";", n);
    return -1 === a && (a = t.length), unescape(t.substring(n + i.length, a))
}

function deleteCookie(e, t, i) {
    "use strict";
    getCookie(e) && (document.cookie = e + "=; path=/" + (i ? "; domain=" + i : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT")
}

var slickevt = new CustomEvent("slickloaded", {detail: !0}), lang = document.documentElement.lang.substring(0, 2);

function initLanguage() {
    "use strict";
    return (bayer = {
        newslang: "en",
        lang: "en",
        gallery: {}
    }).gallery.pager = "Image {0} from {1}", bayer.search = {}, bayer.search.placeholder = "What are you looking for?", bayer.sitemap = {}, bayer.sitemap.expand = "Expand All", bayer.sitemap.collapse = "Collapse All", bayer.navigation = {}, bayer.navigation.backlink = "Go back to", bayer.MTIProjectId = "", bayer
}

String.format || (String.format = function (e) {
    "use strict";
    var i = Array.prototype.slice.call(arguments, 1);
    return e.replace(/\{(\d+)\}/g, function (e, t) {
        return void 0 !== i[t] ? i[t] : e
    })
});
var ll, bayer = bayer || initLanguage();

function getLocPagerString(e, t) {
    "use strict";
    return String.format(bayer.gallery.pager, e, t)
}

if ("" === lang && (lang = bayer.lang), ll = new LazyLoad({}), window.addEventListener("jqueryloaded", function () {
    window.dispatchEvent(slickevt), loadJS("./js/additional.min.js"), loadJS("./js/corporate-navigation.js", function () {
        window.setTimeout(function () {
            $(".meta-btns").empty(), $("#bcn-nav .meta li").clone().appendTo(".meta-btns"), $(".bcn-nobulls li").clone().appendTo(".meta-btns")
        }, 1e3)
    }), initSearch(), $("body").prepend('<div id="top"></div>'), $(".page-top").attr("href", "#top")
}), "undefined" != typeof Modernizr && (Modernizr.addTest("ipad", function () {
    return !!navigator.userAgent.match(/iPad/i)
}), Modernizr.addTest("iphone", function () {
    return !!navigator.userAgent.match(/iPhone/i)
}), Modernizr.addTest("ipod", function () {
    return !!navigator.userAgent.match(/iPod/i)
}), Modernizr.addTest("appleios", function () {
    return Modernizr.ipad || Modernizr.ipod || Modernizr.iphone
}), Modernizr.addTest("android", function () {
    return !!navigator.userAgent.match(/Android/i)
}), Modernizr.addTest("iosorandroid", function () {
    return Modernizr.ipad || Modernizr.ipod || Modernizr.iphone || Modernizr.android
})), $("#top-stage").length) if ($(window).width() < 1025) $("#top-stage").remove(); else {
    $("body").addClass("has-topstage"), $("body").addClass("init-topstage"), $("body").addClass("init-tagline"), $("body").addClass("init-tagline2"), $("body").addClass("fixed-tagline"), $("#top-stage").prependTo(".wrapper");
    var videosource, stagevideo = document.getElementById("stagevideo");
    null !== stagevideo && (null !== stagevideo.getAttribute("data-src") && (videosource = stagevideo.getAttribute("data-src")), null !== stagevideo.getAttribute("data-src-webm") && "probably" === supportsVideoType("vp9") && (videosource = stagevideo.getAttribute("data-src-webm")), stagevideo.src = videosource), $(".last-updated").appendTo(".main-section"), document.getElementById("stagevideo").play()
}

function initSearch() {
    "use strict";
    var e = '<div class="searchbox" id="search">';
    e += '<label for="searchfield">Search</label>', e += '<input type="hidden" id="chkGermanHidden2" value="Deutsch" name="chkGerman">', e += '<input type="hidden" name="m2" value="">', e += '<div class="input-group mainsearch input-group--search inputs--darkblue"><input type="text" class="input-group-field" id="searchfield" aria-label="' + bayer.search.placeholder + '" placeholder="' + bayer.search.placeholder + '" autocomplete="off"><div class="input-group-button"><button class="button button--search js-trigger-search">search</button></div></div>', e += '<button class="close-nav-btn" type="button">Close</button>', e += "</div>", $("nav.navigation").after(e), "undefined" != typeof activateSearch && activateSearch(), "undefined" != typeof initPopularSearchItems && initPopularSearchItems()
}

function initDiscoverMoreExplorer(e) {
    "use strict";
    var t = "Discover more", n = "read more";
    "de" === lang && (t = "Entdecken Sie mehr", n = "mehr lesen"), $.getJSON(e, function (e) {
        var i = '<div data-ga-category="Explore" class="explorer clearfix"><h2 class="topic">' + t + '</h2><div class="explorer-slick explore-tool">';
        $(e).each(function (e, t) {
            i += '<div data-ga-usetitle="' + t.headline + '" class="explr-item"><a data-ga-label="Click" class="media float block" href="' + t.url + '"><figure class="img fullwidth"><div class="explr-crop-img"><img src="' + t.thumbnail + '" alt="" /></div><div class="explr-overline"><span>' + t.topline + "</span></div><figcaption><h3>" + t.headline + "</h3>", "" !== t.abstract && (i += "<p>" + t.abstract + "</p>"), i += '<span class="readmore">' + n + "</span></figcaption></figure></a></div>"
        }), i += "</div></div>", $(i).insertAfter(".main"), initSlickExplorer(".explorer-slick")
    })
}

var evt = new CustomEvent("jqueryloaded", {detail: !0});

function initSlickExplorer(e) {
    "use strict";
    $(e).slick({
        dots: !1,
        infinite: !0,
        lazyLoad: "progressive",
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        slide: ".explr-item",
        responsive: [{breakpoint: 1441, settings: {slidesToShow: 3, slidesToScroll: 3}}, {
            breakpoint: 1024,
            settings: {slidesToShow: 2, slidesToScroll: 2}
        }, {breakpoint: 560, settings: {slidesToShow: 1, slidesToScroll: 1}}]
    })
}

window.dispatchEvent(evt), window.addEventListener("slickloaded", function () {
    "use strict";
    $(".explorer-slick-nojson").length && initSlickExplorer(".explorer-slick-nojson")
}), function () {
    "use strict";
    if ("undefined" != typeof textSharingActivate && !0 === textSharingActivate) {
        var e = "Hello, %0D%0A%0D%0A I’ve found this interesting information at the Bayer website: %0D%0A%0D%0A %22",
            t = "%22 %0D%0A%0D%0A%0D%0A More information at", i = "%0D%0A%0D%0A%0D%0A Best regards,";
        "de" === lang && (e = "Hallo, %0D%0A%0D%0A ich habe gerade diese interessante Information auf der Bayer Webseite gefunden: %0D%0A%0D%0A %22", t = "%22 %0D%0A%0D%0A%0D%0A Mehr Informationen unter", i = "%0D%0A%0D%0A%0D%0A Mit freundlichen Grüßen,");
        var l = {
            twitter: {
                url: "http://twitter.com/share?url=",
                className: "twitter",
                iconClassName: "fa fa-twitter",
                textAttribute: "&text="
            },
            linkedin: {
                url: "http://www.linkedin.com/shareArticle?url=",
                className: "linkedin",
                iconClassName: "fa fa-linkedin",
                textAttribute: "&summary="
            },
            mail: {
                url: "mailto:?subject=Bayer Global",
                className: "mail",
                iconClassName: "fa fa-envelope-o",
                textAttribute: "&body=",
                textBefore: e,
                textAfter: t,
                textEnd: i
            }
        };
        "undefined" != typeof textSharingFbAppId && (l.facebook = {
            url: "https://www.facebook.com/dialog/feed?link=",
            className: "facebook",
            iconClassName: "fa fa-facebook",
            textAttribute: "&description=",
            appId: textSharingFbAppId
        });
        var c, u, p = location.href, g = function (e) {
            var t = "";
            return void 0 !== window.getSelection ? t = window.getSelection().toString() : void 0 !== document.selection && "Text" === document.selection.type && (t = document.selection.createRange().text), e && 253 <= t.length && (t = $.trim(t).substring(0, 253) + "..."), encodeURIComponent(t)
        }, n = function () {
            $(".selection-links").remove()
        };
        $(document).on("keyup", function (e) {
            "27" === e.keyCode && n()
        }), $("body").on("mouseup", function (t) {
            setTimeout(function () {
                var e = g();
                n(), $(t.target).is("body *") && e.length && function () {
                    var e = g(), t = g(), i = window.getSelection().getRangeAt(0).getBoundingClientRect(), n = i.bottom,
                        a = i.left, o = window.pageYOffset;
                    if (!$(".selection-links").length) for (u in $("body").prepend('<div class="selection-links"></div>'), $(".selection-links").css({
                        top: o + n,
                        left: a
                    }), l) {
                        var r = l[u], s = 'target="_blank"';
                        "facebook" === r.className ? c = r.url + encodeURIComponent(p) + r.textAttribute + e + "&redirect_uri=" + window.location.origin + "&app_id=" + r.appId + "&name=" + encodeURIComponent($("title").text()) : "mail" === r.className ? (c = r.url + r.textAttribute + r.textBefore + e + r.textAfter + encodeURIComponent(p + "?utm_medium=email") + r.textEnd, s = "") : c = "twitter" === r.className ? r.url + encodeURIComponent(p) + r.textAttribute + t : r.url + encodeURIComponent(p) + r.textAttribute + e;
                        var d = '<a href="' + c + '"' + s + '><span class="' + r.iconClassName + '"></span></a>';
                        $(".selection-links").append(d)
                    }
                }()
            }, 100)
        })
    }
}(), $(function () {
    "use strict";
    var e = $(".lfthnd").height() - 50;
    $(".size-col-d").css("min-height", e)
});

// 底部通用
$('.followPrev').hover(function () {
    $(this).next().stop().fadeIn();
}, function () {
    $('.followPrev').stop();
    $(this).next().stop().fadeOut();
});

function querySt(e) {
    for (hu = window.location.search.substring(1), gy = hu.split("&"), i = 0; i < gy.length; i++) if (ft = gy[i].split("="), ft[0] == e) return ft[1]
}
