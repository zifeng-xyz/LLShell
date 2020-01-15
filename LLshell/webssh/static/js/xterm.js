!function (e) {
    if ('object' == typeof exports && 'undefined' != typeof module)
        module.exports = e();
    else if ('function' == typeof define && define.amd)
        define([], e);
    else {
        ('undefined' != typeof window ? window :
            'undefined' != typeof global ?
                global :
                'undefined' != typeof self ? self : this)
            .Terminal = e()
    }
}(function () {
    return function s(o, a, l) {
        function h(t, e) {
            if (!a[t]) {
                if (!o[t]) {
                    var i = 'function' == typeof require && require;
                    if (!e && i) return i(t, !0);
                    if (c) return c(t, !0);
                    var r = new Error('Cannot find module \'' + t + '\'');
                    throw r.code = 'MODULE_NOT_FOUND', r
                }
                var n = a[t] = { exports: {} };
                o[t][0].call(n.exports, function (e) {
                    return h(o[t][1][e] || e)
                }, n, n.exports, s, o, a, l)
            }
            return a[t].exports
        }
        for (var c = 'function' == typeof require && require, e = 0; e < l.length;
            e++)
            h(l[e]);
        return h
    }({
        1: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var l = e('./Strings'), s = e('./core/Platform'),
                    o = e('./ui/RenderDebouncer'), a = e('./ui/Lifecycle'),
                    h = e('./common/Lifecycle'), c = function (r) {
                        function e(e) {
                            var t = r.call(this) || this;
                            t._terminal = e, t._liveRegionLineCount = 0,
                                t._charsToConsume = [],
                                t._accessibilityTreeRoot = document.createElement('div'),
                                t._accessibilityTreeRoot.classList.add('xterm-accessibility'),
                                t._rowContainer = document.createElement('div'),
                                t._rowContainer.classList.add('xterm-accessibility-tree'),
                                t._rowElements = [];
                            for (var i = 0; i < t._terminal.rows; i++)
                                t._rowElements[i] = t._createAccessibilityTreeNode(),
                                    t._rowContainer.appendChild(t._rowElements[i]);
                            return t._topBoundaryFocusListener =
                                function (e) {
                                    return t._onBoundaryFocus(e, 0)
                                },
                                t._bottomBoundaryFocusListener =
                                function (e) {
                                    return t._onBoundaryFocus(e, 1)
                                },
                                t._rowElements[0].addEventListener(
                                    'focus', t._topBoundaryFocusListener),
                                t._rowElements[t._rowElements.length - 1]
                                    .addEventListener(
                                        'focus', t._bottomBoundaryFocusListener),
                                t._refreshRowsDimensions(),
                                t._accessibilityTreeRoot.appendChild(t._rowContainer),
                                t._renderRowsDebouncer = new o.RenderDebouncer(
                                    t._terminal, t._renderRows.bind(t)),
                                t._refreshRows(),
                                t._liveRegion = document.createElement('div'),
                                t._liveRegion.classList.add('live-region'),
                                t._liveRegion.setAttribute('aria-live', 'assertive'),
                                t._accessibilityTreeRoot.appendChild(t._liveRegion),
                                t._terminal.element.insertAdjacentElement(
                                    'afterbegin', t._accessibilityTreeRoot),
                                t.register(t._renderRowsDebouncer),
                                t.register(t._terminal.addDisposableListener(
                                    'resize',
                                    function (e) {
                                        return t._onResize(e.rows)
                                    })),
                                t.register(t._terminal.addDisposableListener(
                                    'refresh',
                                    function (e) {
                                        return t._refreshRows(e.start, e.end)
                                    })),
                                t.register(t._terminal.addDisposableListener(
                                    'scroll',
                                    function (e) {
                                        return t._refreshRows()
                                    })),
                                t.register(t._terminal.addDisposableListener(
                                    'a11y.char',
                                    function (e) {
                                        return t._onChar(e)
                                    })),
                                t.register(t._terminal.addDisposableListener(
                                    'linefeed',
                                    function () {
                                        return t._onChar('\n')
                                    })),
                                t.register(t._terminal.addDisposableListener(
                                    'a11y.tab',
                                    function (e) {
                                        return t._onTab(e)
                                    })),
                                t.register(t._terminal.addDisposableListener(
                                    'key',
                                    function (e) {
                                        return t._onKey(e)
                                    })),
                                t.register(t._terminal.addDisposableListener(
                                    'blur',
                                    function () {
                                        return t._clearLiveRegion()
                                    })),
                                t.register(t._terminal.addDisposableListener(
                                    'dprchange',
                                    function () {
                                        return t._refreshRowsDimensions()
                                    })),
                                t.register(t._terminal.renderer.addDisposableListener(
                                    'resize',
                                    function () {
                                        return t._refreshRowsDimensions()
                                    })),
                                t.register(a.addDisposableDomListener(
                                    window, 'resize',
                                    function () {
                                        return t._refreshRowsDimensions()
                                    })),
                                t
                        }
                        return n(e, r), e.prototype.dispose = function () {
                            r.prototype.dispose.call(this),
                                this._terminal.element.removeChild(
                                    this._accessibilityTreeRoot),
                                this._rowElements.length = 0
                        }, e.prototype._onBoundaryFocus = function (e, t) {
                            var i = e.target,
                                r = this._rowElements
                                [0 === t ? 1 : this._rowElements.length - 2];
                            if (i.getAttribute('aria-posinset') !==
                                (0 === t ? '1' :
                                    '' + this._terminal.buffer.lines.length) &&
                                e.relatedTarget === r) {
                                var n, s;
                                if (0 === t ? (n = i, s = this._rowElements.pop(),
                                    this._rowContainer.removeChild(s)) :
                                    (n = this._rowElements.shift(), s = i,
                                        this._rowContainer.removeChild(n)),
                                    n.removeEventListener(
                                        'focus', this._topBoundaryFocusListener),
                                    s.removeEventListener(
                                        'focus', this._bottomBoundaryFocusListener),
                                    0 === t) {
                                    var o = this._createAccessibilityTreeNode();
                                    this._rowElements.unshift(o),
                                        this._rowContainer.insertAdjacentElement(
                                            'afterbegin', o)
                                } else {
                                    o = this._createAccessibilityTreeNode();
                                    this._rowElements.push(o), this._rowContainer.appendChild(o)
                                }
                                this._rowElements[0].addEventListener(
                                    'focus', this._topBoundaryFocusListener),
                                    this._rowElements[this._rowElements.length - 1]
                                        .addEventListener(
                                            'focus', this._bottomBoundaryFocusListener),
                                    this._terminal.scrollLines(0 === t ? -1 : 1),
                                    this._rowElements
                                    [0 === t ? 1 : this._rowElements.length - 2]
                                        .focus(),
                                    e.preventDefault(), e.stopImmediatePropagation()
                            }
                        }, e.prototype._onResize = function (e) {
                            this._rowElements[this._rowElements.length - 1]
                                .removeEventListener(
                                    'focus', this._bottomBoundaryFocusListener);
                            for (var t = this._rowContainer.children.length;
                                t < this._terminal.rows; t++)
                                this._rowElements[t] = this._createAccessibilityTreeNode(),
                                    this._rowContainer.appendChild(this._rowElements[t]);
                            for (; this._rowElements.length > e;)
                                this._rowContainer.removeChild(this._rowElements.pop());
                            this._rowElements[this._rowElements.length - 1]
                                .addEventListener(
                                    'focus', this._bottomBoundaryFocusListener),
                                this._refreshRowsDimensions()
                        }, e.prototype._createAccessibilityTreeNode = function () {
                            var e = document.createElement('div');
                            return e.setAttribute('role', 'listitem'),
                                e.tabIndex = -1, this._refreshRowDimensions(e), e
                        }, e.prototype._onTab = function (e) {
                            for (var t = 0; t < e; t++) this._onChar(' ')
                        }, e.prototype._onChar = function (e) {
                            var t = this;
                            if (this._liveRegionLineCount < 21) {
                                if (0 < this._charsToConsume.length)
                                    this._charsToConsume.shift() !== e &&
                                        this._announceCharacter(e);
                                else
                                    this._announceCharacter(e);
                                '\n' === e &&
                                    (this._liveRegionLineCount++ ,
                                        21 === this._liveRegionLineCount &&
                                        (this._liveRegion.textContent += l.tooMuchOutput)),
                                    s.isMac && this._liveRegion.textContent &&
                                    0 < this._liveRegion.textContent.length &&
                                    !this._liveRegion.parentNode && setTimeout(function () {
                                        t._accessibilityTreeRoot.appendChild(t._liveRegion)
                                    }, 0)
                            }
                        }, e.prototype._clearLiveRegion = function () {
                            this._liveRegion.textContent = '',
                                this._liveRegionLineCount = 0,
                                s.isMac && this._liveRegion.parentNode &&
                                this._accessibilityTreeRoot.removeChild(this._liveRegion)
                        }, e.prototype._onKey = function (e) {
                            this._clearLiveRegion(), this._charsToConsume.push(e)
                        }, e.prototype._refreshRows = function (e, t) {
                            this._renderRowsDebouncer.refresh(e, t)
                        }, e.prototype._renderRows = function (e, t) {
                            for (var i = this._terminal.buffer,
                                r = i.lines.length.toString(), n = e;
                                n <= t; n++) {
                                var s = i.translateBufferLineToString(i.ydisp + n, !0),
                                    o = (i.ydisp + n + 1).toString(),
                                    a = this._rowElements[n];
                                a.textContent = 0 === s.length ? l.blankLine : s,
                                    a.setAttribute('aria-posinset', o),
                                    a.setAttribute('aria-setsize', r)
                            }
                        }, e.prototype._refreshRowsDimensions = function () {
                            if (this._terminal.renderer.dimensions.actualCellHeight) {
                                this._rowElements.length !== this._terminal.rows &&
                                    this._onResize(this._terminal.rows);
                                for (var e = 0; e < this._terminal.rows; e++)
                                    this._refreshRowDimensions(this._rowElements[e])
                            }
                        }, e.prototype._refreshRowDimensions = function (e) {
                            e.style.height =
                                this._terminal.renderer.dimensions.actualCellHeight + 'px'
                        }, e.prototype._announceCharacter = function (e) {
                            ' ' === e ? this._liveRegion.innerHTML += '&nbsp;' :
                                this._liveRegion.textContent += e
                        }, e
                    }(h.Disposable);
                i.AccessibilityManager = c
            },
            {
                './Strings': 14,
                './common/Lifecycle': 20,
                './core/Platform': 23,
                './ui/Lifecycle': 51,
                './ui/RenderDebouncer': 54
            }
        ],
        2: [
            function (e, t, D) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(D, '__esModule', { value: !0 });
                var a = e('./BufferLine'), k = e('./BufferReflow'),
                    i = e('./common/CircularList'), s = e('./common/EventEmitter'),
                    o = e('./renderer/atlas/Types');
                D.DEFAULT_ATTR = 256 | o.DEFAULT_COLOR << 9, D.CHAR_DATA_ATTR_INDEX = 0,
                    D.CHAR_DATA_CHAR_INDEX = 1, D.CHAR_DATA_WIDTH_INDEX = 2,
                    D.CHAR_DATA_CODE_INDEX = 3, D.MAX_BUFFER_SIZE = 4294967295,
                    D.NULL_CELL_CHAR = '', D.NULL_CELL_WIDTH = 1, D.NULL_CELL_CODE = 0,
                    D.WHITESPACE_CELL_CHAR = ' ', D.WHITESPACE_CELL_WIDTH = 1,
                    D.WHITESPACE_CELL_CODE = 32, D.FILL_CHAR_DATA = [
                        D.DEFAULT_ATTR, D.NULL_CELL_CHAR, D.NULL_CELL_WIDTH, D.NULL_CELL_CODE
                    ];
                var l = function () {
                    function e(e, t) {
                        this._terminal = e, this._hasScrollback = t, this.markers = [],
                            this._cols = this._terminal.cols, this._rows = this._terminal.rows,
                            this.clear()
                    }
                    return e.prototype
                        .getBlankLine =
                        function (e, t) {
                            var i = [e, D.NULL_CELL_CHAR, D.NULL_CELL_WIDTH, D.NULL_CELL_CODE];
                            return new a.BufferLine(this._cols, i, t)
                        },
                        Object.defineProperty(e.prototype, 'hasScrollback', {
                            get: function () {
                                return this._hasScrollback && this.lines.maxLength > this._rows
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        Object.defineProperty(e.prototype, 'isCursorInViewport', {
                            get: function () {
                                var e = this.ybase + this.y - this.ydisp;
                                return 0 <= e && e < this._rows
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        e.prototype._getCorrectBufferLength =
                        function (e) {
                            if (!this._hasScrollback) return e;
                            var t = e + this._terminal.options.scrollback;
                            return t > D.MAX_BUFFER_SIZE ? D.MAX_BUFFER_SIZE : t
                        },
                        e.prototype.fillViewportRows =
                        function (e) {
                            if (0 === this.lines.length) {
                                void 0 === e && (e = D.DEFAULT_ATTR);
                                for (var t = this._rows; t--;)
                                    this.lines.push(this.getBlankLine(e))
                            }
                        },
                        e.prototype.clear =
                        function () {
                            this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0,
                                this.lines =
                                new i.CircularList(this._getCorrectBufferLength(this._rows)),
                                this.scrollTop = 0, this.scrollBottom = this._rows - 1,
                                this.setupTabStops()
                        },
                        e.prototype.resize =
                        function (e, t) {
                            var i = this._getCorrectBufferLength(t);
                            if (i > this.lines.maxLength && (this.lines.maxLength = i),
                                0 < this.lines.length) {
                                if (this._cols < e)
                                    for (var r = 0; r < this.lines.length; r++)
                                        this.lines.get(r).resize(e, D.FILL_CHAR_DATA);
                                var n = 0;
                                if (this._rows < t)
                                    for (var s = this._rows; s < t; s++)
                                        this.lines.length < t + this.ybase &&
                                            (0 < this.ybase &&
                                                this.lines.length <=
                                                this.ybase + this.y + n + 1 ?
                                                (this.ybase-- , n++ , 0 < this.ydisp && this.ydisp--) :
                                                this.lines.push(
                                                    new a.BufferLine(e, D.FILL_CHAR_DATA)));
                                else
                                    for (s = this._rows; t < s; s--)
                                        this.lines.length > t + this.ybase &&
                                            (this.lines.length > this.ybase + this.y + 1 ?
                                                this.lines.pop() :
                                                (this.ybase++ , this.ydisp++));
                                if (i < this.lines.maxLength) {
                                    var o = this.lines.length - i;
                                    0 < o &&
                                        (this.lines.trimStart(o),
                                            this.ybase = Math.max(this.ybase - o, 0),
                                            this.ydisp = Math.max(this.ydisp - o, 0)),
                                        this.lines.maxLength = i
                                }
                                this.x = Math.min(this.x, e - 1),
                                    this.y = Math.min(this.y, t - 1), n && (this.y += n),
                                    this.savedY = Math.min(this.savedY, t - 1),
                                    this.savedX = Math.min(this.savedX, e - 1), this.scrollTop = 0
                            }
                            if (this.scrollBottom = t - 1,
                                this._isReflowEnabled && (this._reflow(e, t), this._cols > e))
                                for (r = 0; r < this.lines.length; r++)
                                    this.lines.get(r).resize(e, D.FILL_CHAR_DATA);
                            this._cols = e, this._rows = t
                        },
                        Object.defineProperty(e.prototype, '_isReflowEnabled', {
                            get: function () {
                                return this._hasScrollback &&
                                    !this._terminal.isWinptyCompatEnabled
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        e.prototype._reflow = function (e, t) {
                            this._cols !== e &&
                                (e > this._cols ? this._reflowLarger(e, t) :
                                    this._reflowSmaller(e, t))
                        }, e.prototype._reflowLarger = function (e, t) {
                            var i = k.reflowLargerGetLinesToRemove(
                                this.lines, this._cols, e, this.ybase + this.y);
                            if (0 < i.length) {
                                var r = k.reflowLargerCreateNewLayout(this.lines, i);
                                k.reflowLargerApplyNewLayout(this.lines, r.layout),
                                    this._reflowLargerAdjustViewport(e, t, r.countRemoved)
                            }
                        }, e.prototype._reflowLargerAdjustViewport = function (e, t, i) {
                            for (var r = i; 0 < r--;)
                                0 === this.ybase ?
                                    (0 < this.y && this.y-- ,
                                        this.lines.length < t &&
                                        this.lines.push(new a.BufferLine(e, D.FILL_CHAR_DATA))) :
                                    (this.ydisp === this.ybase && this.ydisp-- , this.ybase--)
                        }, e.prototype._reflowSmaller = function (e, t) {
                            for (var i = [], r = 0, n = this.lines.length - 1; 0 <= n; n--) {
                                var s = this.lines.get(n);
                                if (s.isWrapped || !(s.getTrimmedLength() <= e)) {
                                    for (var o = [s]; s.isWrapped && 0 < n;)
                                        s = this.lines.get(--n), o.unshift(s);
                                    var a = this.ybase + this.y;
                                    if (!(n <= a && a < n + o.length)) {
                                        var l = o[o.length - 1].getTrimmedLength(),
                                            h = k.reflowSmallerGetNewLineLengths(o, this._cols, e),
                                            c = h.length - o.length, u = void 0;
                                        u = 0 === this.ybase && this.y !== this.lines.length - 1 ?
                                            Math.max(0, this.y - this.lines.maxLength + c) :
                                            Math.max(0, this.lines.length - this.lines.maxLength + c);
                                        for (var _ = [], f = 0; f < c; f++) {
                                            var d = this.getBlankLine(D.DEFAULT_ATTR, !0);
                                            _.push(d)
                                        }
                                        0 < _.length &&
                                            (i.push({ start: n + o.length + r, newLines: _ }),
                                                r += _.length),
                                            o.push.apply(o, _);
                                        var p = h.length - 1, m = h[p];
                                        0 === m && (m = h[--p]);
                                        for (var y = o.length - c - 1, C = l; 0 <= y;) {
                                            var g = Math.min(C, m);
                                            if (o[p].copyCellsFrom(o[y], C - g, m - g, g, !0),
                                                0 === (m -= g) && (m = h[--p]), 0 === (C -= g)) {
                                                y--;
                                                var v = Math.max(y, 0);
                                                C = k.getWrappedLineTrimmedLength(o, v, this._cols)
                                            }
                                        }
                                        for (f = 0; f < o.length; f++)
                                            h[f] < e && o[f].set(h[f], D.FILL_CHAR_DATA);
                                        for (var b = c - u; 0 < b--;)
                                            0 === this.ybase ? this.y < t - 1 ?
                                                (this.y++ , this.lines.pop()) :
                                                (this.ybase++ , this.ydisp++) :
                                                this.ybase < Math.min(
                                                    this.lines.maxLength,
                                                    this.lines.length + r) -
                                                t &&
                                                (this.ybase === this.ydisp && this.ydisp++ ,
                                                    this.ybase++)
                                    }
                                }
                            }
                            if (0 < i.length) {
                                var w = [], L = [];
                                for (f = 0; f < this.lines.length; f++) L.push(this.lines.get(f));
                                var E = this.lines.length, S = E - 1, A = 0, x = i[A];
                                this.lines.length =
                                    Math.min(this.lines.maxLength, this.lines.length + r);
                                var T = 0;
                                for (f = Math.min(this.lines.maxLength - 1, E + r - 1); 0 <= f;
                                    f--)
                                    if (x && x.start > S + T) {
                                        for (var R = x.newLines.length - 1; 0 <= R; R--)
                                            this.lines.set(f--, x.newLines[R]);
                                        f++ , w.push({ index: S + 1, amount: x.newLines.length }),
                                            T += x.newLines.length, x = i[++A]
                                    } else
                                        this.lines.set(f, L[S--]);
                                var M = 0;
                                for (f = w.length - 1; 0 <= f; f--)
                                    w[f].index += M, this.lines.emit('insert', w[f]),
                                        M += w[f].amount;
                                var H = Math.max(0, E + r - this.lines.maxLength);
                                0 < H && this.lines.emitMayRemoveListeners('trim', H)
                            }
                        }, e.prototype.stringIndexToBufferIndex = function (e, t, i) {
                            for (void 0 === i && (i = !1); t;) {
                                var r = this.lines.get(e);
                                if (!r) return [-1, -1];
                                for (var n = i ? r.getTrimmedLength() : r.length, s = 0; s < n;
                                    ++s)
                                    if (r.get(s)[D.CHAR_DATA_WIDTH_INDEX] &&
                                        (t -= r.get(s)[D.CHAR_DATA_CHAR_INDEX].length || 1),
                                        t < 0)
                                        return [e, s];
                                e++
                            }
                            return [e, 0]
                        }, e.prototype.translateBufferLineToString = function (e, t, i, r) {
                            void 0 === i && (i = 0);
                            var n = this.lines.get(e);
                            return n ? n.translateToString(t, i, r) : ''
                        }, e.prototype.getWrappedRangeForLine = function (e) {
                            for (var t = e, i = e; 0 < t && this.lines.get(t).isWrapped;) t--;
                            for (;
                                i + 1 < this.lines.length && this.lines.get(i + 1).isWrapped;)
                                i++;
                            return {
                                first: t, last: i
                            }
                        }, e.prototype.setupTabStops = function (e) {
                            for (null != e ? this.tabs[e] || (e = this.prevStop(e)) :
                                (this.tabs = {}, e = 0);
                                e < this._cols; e += this._terminal.options.tabStopWidth)
                                this.tabs[e] = !0
                        }, e.prototype.prevStop = function (e) {
                            for (null == e && (e = this.x); !this.tabs[--e] && 0 < e;)
                                ;
                            return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e
                        }, e.prototype.nextStop = function (e) {
                            for (null == e && (e = this.x); !this.tabs[++e] && e < this._cols;)
                                ;
                            return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e
                        }, e.prototype.addMarker = function (e) {
                            var t = this, i = new h(e);
                            return this.markers.push(i),
                                i.register(this.lines.addDisposableListener(
                                    'trim',
                                    function (e) {
                                        i.line -= e, i.line < 0 && i.dispose()
                                    })),
                                i.register(this.lines.addDisposableListener(
                                    'insert',
                                    function (e) {
                                        i.line >= e.index && (i.line += e.amount)
                                    })),
                                i.register(this.lines.addDisposableListener(
                                    'delete',
                                    function (e) {
                                        i.line >= e.index &&
                                            i.line < e.index + e.amount && i.dispose(), i.line > e
                                                .index &&
                                            (i.line -= e.amount)
                                    })),
                                i.register(i.addDisposableListener('dispose', function () {
                                    return t._removeMarker(i)
                                })), i
                        }, e.prototype._removeMarker = function (e) {
                            this.markers.splice(this.markers.indexOf(e), 1)
                        }, e.prototype.iterator = function (e, t, i, r, n) {
                            return new c(this, e, t, i, r, n)
                        }, e
                }();
                D.Buffer = l;
                var h = function (i) {
                    function r(e) {
                        var t = i.call(this) || this;
                        return t.line = e, t._id = r._nextId++ , t.isDisposed = !1, t
                    }
                    return n(r, i), Object.defineProperty(r.prototype, 'id', {
                        get: function () {
                            return this._id
                        },
                        enumerable: !0,
                        configurable: !0
                    }),
                        r.prototype.dispose = function () {
                            this.isDisposed ||
                                (this.isDisposed = !0, this.emit('dispose'),
                                    i.prototype.dispose.call(this))
                        }, r._nextId = 1, r
                }(s.EventEmitter);
                D.Marker = h;
                var c = function () {
                    function e(e, t, i, r, n, s) {
                        void 0 === i && (i = 0), void 0 === r && (r = e.lines.length),
                            void 0 === n && (n = 0), void 0 === s && (s = 0),
                            this._buffer = e, this._trimRight = t, this._startIndex = i,
                            this._endIndex = r, this._startOverscan = n,
                            this._endOverscan = s,
                            this._startIndex < 0 && (this._startIndex = 0),
                            this._endIndex > this._buffer.lines.length &&
                            (this._endIndex = this._buffer.lines.length),
                            this._current = this._startIndex
                    }
                    return e.prototype.hasNext = function () {
                        return this._current < this._endIndex
                    }, e.prototype.next = function () {
                        var e = this._buffer.getWrappedRangeForLine(this._current);
                        e.first <
                            this._startIndex - this._startOverscan &&
                            (e.first = this._startIndex - this._startOverscan),
                            e.last > this._endIndex +
                            this._endOverscan &&
                            (e.last = this._endIndex + this._endOverscan),
                            e.first = Math.max(e.first, 0),
                            e.last = Math.min(e.last, this._buffer.lines.length);
                        for (var t = '', i = e.first; i <= e.last; ++i)
                            t += this._buffer.translateBufferLineToString(i, this._trimRight);
                        return this._current = e.last + 1, {
                            range: e, content: t
                        }
                    }, e
                }();
                D.BufferStringIterator = c
            },
            {
                './BufferLine': 3,
                './BufferReflow': 4,
                './common/CircularList': 17,
                './common/EventEmitter': 19,
                './renderer/atlas/Types': 46
            }
        ],
        3: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = e('./Buffer'), o = 2147483648, r = function () {
                    function i(e, t, i) {
                        if (void 0 === i && (i = !1), this.isWrapped = i, this._data = null,
                            this._combined = {},
                            t ||
                            (t =
                                [
                                    0, s.NULL_CELL_CHAR, s.NULL_CELL_WIDTH,
                                    s.NULL_CELL_CODE
                                ]),
                            e) {
                            this._data = new Uint32Array(3 * e);
                            for (var r = 0; r < e; ++r) this.set(r, t)
                        }
                        this.length = e
                    }
                    return i.prototype.get = function (e) {
                        var t = this._data[3 * e + 1];
                        return [
                            this._data[3 * e + 0],
                            t & o ? this._combined[e] : t ? String.fromCharCode(t) : '',
                            this._data[3 * e + 2],
                            t & o ?
                                this._combined[e].charCodeAt(this._combined[e].length - 1) :
                                t
                        ]
                    }, i.prototype.getWidth = function (e) {
                        return this._data[3 * e + 2]
                    }, i.prototype.set = function (e, t) {
                        this._data[3 * e + 0] = t[0],
                            1 < t[1].length ?
                                (this._combined[e] = t[1], this._data[3 * e + 1] = e | o) :
                                this._data[3 * e + 1] = t[1].charCodeAt(0),
                            this._data[3 * e + 2] = t[2]
                    }, i.prototype.insertCells = function (e, t, i) {
                        if (e %= this.length, t < this.length - e) {
                            for (var r = this.length - e - t - 1; 0 <= r; --r)
                                this.set(e + t + r, this.get(e + r));
                            for (r = 0; r < t; ++r) this.set(e + r, i)
                        } else
                            for (r = e; r < this.length; ++r) this.set(r, i)
                    }, i.prototype.deleteCells = function (e, t, i) {
                        if (e %= this.length, t < this.length - e) {
                            for (var r = 0; r < this.length - e - t; ++r)
                                this.set(e + r, this.get(e + t + r));
                            for (r = this.length - t; r < this.length; ++r) this.set(r, i)
                        } else
                            for (r = e; r < this.length; ++r) this.set(r, i)
                    }, i.prototype.replaceCells = function (e, t, i) {
                        for (; e < t && e < this.length;) this.set(e++, i)
                    }, i.prototype.resize = function (e, t) {
                        if (e !== this.length) {
                            if (e > this.length) {
                                var i = new Uint32Array(3 * e);
                                this.length &&
                                    (3 * e < this._data.length ?
                                        i.set(this._data.subarray(0, 3 * e)) :
                                        i.set(this._data)),
                                    this._data = i;
                                for (var r = this.length; r < e; ++r) this.set(r, t)
                            } else if (e) {
                                (i = new Uint32Array(3 * e)).set(this._data.subarray(0, 3 * e)),
                                    this._data = i;
                                var n = Object.keys(this._combined);
                                for (r = 0; r < n.length; r++) {
                                    var s = parseInt(n[r], 10);
                                    e <= s && delete this._combined[s]
                                }
                            } else
                                this._data = null, this._combined = {};
                            this.length = e
                        }
                    }, i.prototype.fill = function (e) {
                        this._combined = {};
                        for (var t = 0; t < this.length; ++t) this.set(t, e)
                    }, i.prototype.copyFrom = function (e) {
                        for (var t in this.length !== e.length ?
                            this._data = new Uint32Array(e._data) :
                            this._data.set(e._data),
                            this.length = e.length, this._combined = {}, e._combined)
                            this._combined[t] = e._combined[t];
                        this.isWrapped = e.isWrapped
                    }, i.prototype.clone = function () {
                        var e = new i(0);
                        for (var t in e._data = new Uint32Array(this._data),
                            e.length = this.length, this._combined)
                            e._combined[t] = this._combined[t];
                        return e.isWrapped = this.isWrapped, e
                    }, i.prototype.getTrimmedLength = function () {
                        for (var e = this.length - 1; 0 <= e; --e)
                            if (0 !== this._data[3 * e + 1]) return e + this._data[3 * e + 2];
                        return 0
                    }, i.prototype.copyCellsFrom = function (e, t, i, r, n) {
                        var s = e._data;
                        if (n)
                            for (var o = r - 1; 0 <= o; o--)
                                for (var a = 0; a < 3; a++)
                                    this._data[3 * (i + o) + a] = s[3 * (t + o) + a];
                        else
                            for (o = 0; o < r; o++)
                                for (a = 0; a < 3; a++)
                                    this._data[3 * (i + o) + a] = s[3 * (t + o) + a];
                        var l = Object.keys(e._combined);
                        for (a = 0; a < l.length; a++) {
                            var h = parseInt(l[a], 10);
                            t <= h && (this._combined[h - t + i] = e._combined[h])
                        }
                    }, i.prototype.translateToString = function (e, t, i) {
                        void 0 === e && (e = !1), void 0 === t && (t = 0),
                            void 0 === i && (i = this.length),
                            e && (i = Math.min(i, this.getTrimmedLength()));
                        for (var r = ''; t < i;) {
                            var n = this._data[3 * t + 1];
                            r += n & o ? this._combined[t] :
                                n ? String.fromCharCode(n) : s.WHITESPACE_CELL_CHAR,
                                t += this._data[3 * t + 2] || 1
                        }
                        return r
                    }, i
                }();
                i.BufferLine = r
            },
            { './Buffer': 2 }
        ],
        4: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var g = e('./Buffer');
                function v(e, t, i) {
                    if (t === e.length - 1) return e[t].getTrimmedLength();
                    var r = e[t].get(i - 1),
                        n = '' === r[g.CHAR_DATA_CHAR_INDEX] &&
                            1 === r[g.CHAR_DATA_WIDTH_INDEX],
                        s = 2 === e[t + 1].getWidth(0);
                    return n && s ? i - 1 : i
                }
                i.reflowLargerGetLinesToRemove = function (e, t, i, r) {
                    for (var n = [], s = 0; s < e.length - 1; s++) {
                        var o = s, a = e.get(++o);
                        if (a.isWrapped) {
                            for (var l = [e.get(s)]; o < e.length && a.isWrapped;)
                                l.push(a), a = e.get(++o);
                            if (s <= r && r < o)
                                s += l.length - 1;
                            else {
                                for (var h = 0, c = v(l, h, t), u = 1, _ = 0; u < l.length;) {
                                    var f = v(l, u, t), d = f - _, p = i - c, m = Math.min(d, p);
                                    l[h].copyCellsFrom(l[u], _, c, m, !1),
                                        (c += m) === i && (h++ , c = 0),
                                        (_ += m) === f && (u++ , _ = 0),
                                        0 === c && 0 !== h && 2 === l[h - 1].getWidth(i - 1) &&
                                        (l[h].copyCellsFrom(l[h - 1], i - 1, c++, 1, !1),
                                            l[h - 1].set(i - 1, g.FILL_CHAR_DATA))
                                }
                                l[h].replaceCells(c, i, g.FILL_CHAR_DATA);
                                for (var y = 0, C = l.length - 1;
                                    0 < C && (h < C || 0 === l[C].getTrimmedLength()); C--)
                                    y++;
                                0 < y && (n.push(s + l.length - y), n.push(y)),
                                    s += l.length - 1
                            }
                        }
                    }
                    return n
                }, i.reflowLargerCreateNewLayout = function (e, t) {
                    for (var i = [], r = 0, n = t[r], s = 0, o = 0; o < e.length; o++)
                        if (n === o) {
                            var a = t[++r];
                            e.emit('delete', { index: o - s, amount: a }), o += a - 1, s += a,
                                n = t[++r]
                        } else
                            i.push(o);
                    return {
                        layout: i, countRemoved: s
                    }
                }, i.reflowLargerApplyNewLayout = function (e, t) {
                    for (var i = [], r = 0; r < t.length; r++) i.push(e.get(t[r]));
                    for (r = 0; r < i.length; r++) e.set(r, i[r]);
                    e.length = t.length
                }, i.reflowSmallerGetNewLineLengths = function (i, r, e) {
                    for (var t = [], n = i.map(function (e, t) {
                        return v(i, t, r)
                    }).reduce(function (e, t) {
                        return e + t
                    }),
                        s = 0, o = 0, a = 0;
                        a < n;) {
                        if (n - a < e) {
                            t.push(n - a);
                            break
                        }
                        s += e;
                        var l = v(i, o, r);
                        l < s && (s -= l, o++);
                        var h = 2 === i[o].getWidth(s - 1);
                        h && s--;
                        var c = h ? e - 1 : e;
                        t.push(c), a += c
                    }
                    return t
                }, i.getWrappedLineTrimmedLength = v
            },
            { './Buffer': 2 }
        ],
        5: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = e('./Buffer'), o = function (i) {
                    function e(e) {
                        var t = i.call(this) || this;
                        return t._terminal = e, t._normal = new s.Buffer(t._terminal, !0),
                            t._normal.fillViewportRows(),
                            t._alt = new s.Buffer(t._terminal, !1),
                            t._activeBuffer = t._normal, t.setupTabStops(), t
                    }
                    return n(e, i), Object.defineProperty(e.prototype, 'alt', {
                        get: function () {
                            return this._alt
                        },
                        enumerable: !0,
                        configurable: !0
                    }),
                        Object.defineProperty(e.prototype, 'active', {
                            get: function () {
                                return this._activeBuffer
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        Object.defineProperty(e.prototype, 'normal', {
                            get: function () {
                                return this._normal
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        e.prototype.activateNormalBuffer = function () {
                            this._activeBuffer !== this._normal &&
                                (this._normal.x = this._alt.x,
                                    this._normal.y = this._alt.y, this._alt.clear(),
                                    this._activeBuffer = this._normal,
                                    this.emit('activate', {
                                        activeBuffer: this._normal,
                                        inactiveBuffer: this._alt
                                    }))
                        }, e.prototype.activateAltBuffer = function (e) {
                            this._activeBuffer !== this._alt &&
                                (this._alt.fillViewportRows(e),
                                    this._alt.x = this._normal.x,
                                    this._alt.y = this._normal.y,
                                    this._activeBuffer = this._alt, this.emit('activate', {
                                        activeBuffer: this._alt,
                                        inactiveBuffer: this._normal
                                    }))
                        }, e.prototype.resize = function (e, t) {
                            this._normal.resize(e, t), this._alt.resize(e, t)
                        }, e.prototype.setupTabStops = function (e) {
                            this._normal.setupTabStops(e), this._alt.setupTabStops(e)
                        }, e
                }(e('./common/EventEmitter').EventEmitter);
                i.BufferSet = o
            },
            { './Buffer': 2, './common/EventEmitter': 19 }
        ],
        6: [
            function (e, t, o) {
                'use strict';
                Object.defineProperty(o, '__esModule', { value: !0 });
                var a = e('./common/TypedArrayUtils');
                o.wcwidth = function (e) {
                    var t =
                        [
                            [768, 879], [1155, 1158], [1160, 1161],
                            [1425, 1469], [1471, 1471], [1473, 1474],
                            [1476, 1477], [1479, 1479], [1536, 1539],
                            [1552, 1557], [1611, 1630], [1648, 1648],
                            [1750, 1764], [1767, 1768], [1770, 1773],
                            [1807, 1807], [1809, 1809], [1840, 1866],
                            [1958, 1968], [2027, 2035], [2305, 2306],
                            [2364, 2364], [2369, 2376], [2381, 2381],
                            [2385, 2388], [2402, 2403], [2433, 2433],
                            [2492, 2492], [2497, 2500], [2509, 2509],
                            [2530, 2531], [2561, 2562], [2620, 2620],
                            [2625, 2626], [2631, 2632], [2635, 2637],
                            [2672, 2673], [2689, 2690], [2748, 2748],
                            [2753, 2757], [2759, 2760], [2765, 2765],
                            [2786, 2787], [2817, 2817], [2876, 2876],
                            [2879, 2879], [2881, 2883], [2893, 2893],
                            [2902, 2902], [2946, 2946], [3008, 3008],
                            [3021, 3021], [3134, 3136], [3142, 3144],
                            [3146, 3149], [3157, 3158], [3260, 3260],
                            [3263, 3263], [3270, 3270], [3276, 3277],
                            [3298, 3299], [3393, 3395], [3405, 3405],
                            [3530, 3530], [3538, 3540], [3542, 3542],
                            [3633, 3633], [3636, 3642], [3655, 3662],
                            [3761, 3761], [3764, 3769], [3771, 3772],
                            [3784, 3789], [3864, 3865], [3893, 3893],
                            [3895, 3895], [3897, 3897], [3953, 3966],
                            [3968, 3972], [3974, 3975], [3984, 3991],
                            [3993, 4028], [4038, 4038], [4141, 4144],
                            [4146, 4146], [4150, 4151], [4153, 4153],
                            [4184, 4185], [4448, 4607], [4959, 4959],
                            [5906, 5908], [5938, 5940], [5970, 5971],
                            [6002, 6003], [6068, 6069], [6071, 6077],
                            [6086, 6086], [6089, 6099], [6109, 6109],
                            [6155, 6157], [6313, 6313], [6432, 6434],
                            [6439, 6440], [6450, 6450], [6457, 6459],
                            [6679, 6680], [6912, 6915], [6964, 6964],
                            [6966, 6970], [6972, 6972], [6978, 6978],
                            [7019, 7027], [7616, 7626], [7678, 7679],
                            [8203, 8207], [8234, 8238], [8288, 8291],
                            [8298, 8303], [8400, 8431], [12330, 12335],
                            [12441, 12442], [43014, 43014], [43019, 43019],
                            [43045, 43046], [64286, 64286], [65024, 65039],
                            [65056, 65059], [65279, 65279], [65529, 65531]
                        ],
                        i = [
                            [68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154],
                            [68159, 68159], [119143, 119145], [119155, 119170],
                            [119173, 119179], [119210, 119213], [119362, 119364],
                            [917505, 917505], [917536, 917631], [917760, 917999]
                        ];
                    var r = 0 | e.control, n = new Uint8Array(65536);
                    a.fill(n, 1), n[0] = e.nul, a.fill(n, e.control, 1, 32),
                        a.fill(n, e.control, 127, 160),
                        a.fill(n, 2, 4352, 4448), n[9001] = 2, n[9002] = 2,
                        a.fill(n, 2, 11904, 42192), n[12351] = 1,
                        a.fill(n, 2, 44032, 55204), a.fill(n, 2, 63744, 64256),
                        a.fill(n, 2, 65040, 65050), a.fill(n, 2, 65072, 65136),
                        a.fill(n, 2, 65280, 65377), a.fill(n, 2, 65504, 65511);
                    for (var s = 0; s < t.length; ++s) a.fill(n, 0, t[s][0], t[s][1] + 1);
                    return function (e) {
                        return e < 32 ?
                            0 | r :
                            e < 127 ?
                                1 :
                                e < 65536 ?
                                    n[e] :
                                    function (e, t) {
                                        var i, r = 0, n = t.length - 1;
                                        if (e < t[0][0] || e > t[n][1]) return !1;
                                        for (; r <= n;)
                                            if (e > t[i = r + n >> 1][1])
                                                r = i + 1;
                                            else {
                                                if (!(e < t[i][0])) return !0;
                                                n = i - 1
                                            }
                                        return !1
                                    }(t = e, i) ?
                                        0 :
                                        131072 <= t && t <= 196605 || 196608 <= t && t <= 262141 ? 2 :
                                            1;
                        var t
                    }
                }({ nul: 0, control: 0 }), o.getStringCellWidth = function (e) {
                    for (var t = 0, i = e.length, r = 0; r < i; ++r) {
                        var n = e.charCodeAt(r);
                        if (55296 <= n && n <= 56319) {
                            if (++r >= i) return t + o.wcwidth(n);
                            var s = e.charCodeAt(r);
                            56320 <= s && s <= 57343 ?
                                n = 1024 * (n - 55296) + s - 56320 + 65536 :
                                t += o.wcwidth(s)
                        }
                        t += o.wcwidth(n)
                    }
                    return t
                }
            },
            { './common/TypedArrayUtils': 21 }
        ],
        7: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = function () {
                    function e(e, t, i) {
                        this._textarea = e, this._compositionView = t, this._terminal = i,
                            this._isComposing = !1, this._isSendingComposition = !1,
                            this._compositionPosition = {
                                start: null,
                                end: null
                            }
                    }
                    return e.prototype.compositionstart = function () {
                        this._isComposing = !0,
                            this._compositionPosition.start = this._textarea.value.length,
                            this._compositionView.textContent = '',
                            this._compositionView.classList.add('active')
                    }, e.prototype.compositionupdate = function (e) {
                        var t = this;
                        this._compositionView.textContent = e.data,
                            this.updateCompositionElements(), setTimeout(function () {
                                t._compositionPosition.end = t._textarea.value.length
                            }, 0)
                    }, e.prototype.compositionend = function () {
                        this._finalizeComposition(!0)
                    }, e.prototype.keydown = function (e) {
                        if (this._isComposing || this._isSendingComposition) {
                            if (229 === e.keyCode) return !1;
                            if (16 === e.keyCode || 17 === e.keyCode || 18 === e.keyCode)
                                return !1;
                            this._finalizeComposition(!1)
                        }
                        return 229 !== e.keyCode || (this._handleAnyTextareaChanges(), !1)
                    }, e.prototype._finalizeComposition = function (e) {
                        var t = this;
                        if (this._compositionView.classList.remove('active'),
                            this._isComposing = !1, this._clearTextareaPosition(), e) {
                            var i = {
                                start: this._compositionPosition.start,
                                end: this._compositionPosition.end
                            };
                            this._isSendingComposition = !0, setTimeout(function () {
                                if (t._isSendingComposition) {
                                    t._isSendingComposition = !1;
                                    var e = void 0;
                                    e = t._isComposing ?
                                        t._textarea.value.substring(i.start, i.end) :
                                        t._textarea.value.substring(i.start),
                                        t._terminal.handler(e)
                                }
                            }, 0)
                        } else {
                            this._isSendingComposition = !1;
                            var r = this._textarea.value.substring(
                                this._compositionPosition.start,
                                this._compositionPosition.end);
                            this._terminal.handler(r)
                        }
                    }, e.prototype._handleAnyTextareaChanges = function () {
                        var t = this, i = this._textarea.value;
                        setTimeout(function () {
                            if (!t._isComposing) {
                                var e = t._textarea.value.replace(i, '');
                                0 < e.length && t._terminal.handler(e)
                            }
                        }, 0)
                    }, e.prototype.updateCompositionElements = function (e) {
                        var t = this;
                        if (this._isComposing) {
                            if (this._terminal.buffer.isCursorInViewport) {
                                var i = Math.ceil(
                                    this._terminal.charMeasure.height *
                                    this._terminal.options.lineHeight),
                                    r = this._terminal.buffer.y * i,
                                    n = this._terminal.buffer.x *
                                        this._terminal.charMeasure.width;
                                this._compositionView.style.left = n + 'px',
                                    this._compositionView.style.top = r + 'px',
                                    this._compositionView.style.height = i + 'px',
                                    this._compositionView.style.lineHeight = i + 'px',
                                    this._compositionView.style.fontFamily =
                                    this._terminal.options.fontFamily,
                                    this._compositionView.style.fontSize =
                                    this._terminal.options.fontSize + 'px';
                                var s = this._compositionView.getBoundingClientRect();
                                this._textarea.style.left = n + 'px',
                                    this._textarea.style.top = r + 'px',
                                    this._textarea.style.width = s.width + 'px',
                                    this._textarea.style.height = s.height + 'px',
                                    this._textarea.style.lineHeight = s.height + 'px'
                            }
                            e || setTimeout(function () {
                                return t.updateCompositionElements(!0)
                            }, 0)
                        }
                    }, e.prototype._clearTextareaPosition = function () {
                        this._textarea.style.left = '', this._textarea.style.top = ''
                    }, e
                }();
                i.CompositionHelper = r
            },
            {}
        ],
        8: [
            function (e, t, r) {
                'use strict';
                var n,
                    s = this && this.__extends ||
                        (n =
                            function (e, t) {
                                return (
                                    n = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                n(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(r, '__esModule', { value: !0 });
                var i = e('./common/Lifecycle'), L = e('./core/input/TextDecoder');
                function o(e, t) {
                    for (var i = t - e, r = new Array(i); i--;) r[i] = --t;
                    return r
                }
                var a = function () {
                    function e(e) {
                        this.table = 'undefined' == typeof Uint8Array ? new Array(e) :
                            new Uint8Array(e)
                    }
                    return e.prototype.add = function (e, t, i, r) {
                        this.table[t << 8 | e] = (0 | i) << 4 | (void 0 === r ? t : r)
                    }, e.prototype.addMany = function (e, t, i, r) {
                        for (var n = 0; n < e.length; n++) this.add(e[n], t, i, r)
                    }, e
                }();
                r.TransitionTable = a;
                var l = o(32, 127), h = o(0, 24);
                h.push(25), h.push.apply(h, o(28, 32));
                r.VT500_TRANSITION_TABLE = function () {
                    var e, t = new a(4095), i = o(0, 14);
                    for (e in i)
                        for (var r = 0; r <= 160; ++r) t.add(r, e, 1, 0);
                    for (e in t.addMany(l, 0, 2, 0), i)
                        t.addMany([24, 26, 153, 154], e, 3, 0),
                            t.addMany(o(128, 144), e, 3, 0),
                            t.addMany(o(144, 152), e, 3, 0), t.add(156, e, 0, 0),
                            t.add(27, e, 11, 1), t.add(157, e, 4, 8),
                            t.addMany([152, 158, 159], e, 0, 7), t.add(155, e, 11, 3),
                            t.add(144, e, 11, 9);
                    return t.addMany(h, 0, 3, 0), t.addMany(h, 1, 3, 1),
                        t.add(127, 1, 0, 1), t.addMany(h, 8, 0, 8),
                        t.addMany(h, 3, 3, 3), t.add(127, 3, 0, 3),
                        t.addMany(h, 4, 3, 4), t.add(127, 4, 0, 4),
                        t.addMany(h, 6, 3, 6), t.addMany(h, 5, 3, 5),
                        t.add(127, 5, 0, 5), t.addMany(h, 2, 3, 2),
                        t.add(127, 2, 0, 2), t.add(93, 1, 4, 8), t.addMany(l, 8, 5, 8),
                        t.add(127, 8, 5, 8), t.addMany([156, 27, 24, 26, 7], 8, 6, 0),
                        t.addMany(o(28, 32), 8, 0, 8),
                        t.addMany([88, 94, 95], 1, 0, 7), t.addMany(l, 7, 0, 7),
                        t.addMany(h, 7, 0, 7), t.add(156, 7, 0, 0),
                        t.add(127, 7, 0, 7), t.add(91, 1, 11, 3),
                        t.addMany(o(64, 127), 3, 7, 0), t.addMany(o(48, 58), 3, 8, 4),
                        t.add(59, 3, 8, 4), t.addMany([60, 61, 62, 63], 3, 9, 4),
                        t.addMany(o(48, 58), 4, 8, 4), t.add(59, 4, 8, 4),
                        t.addMany(o(64, 127), 4, 7, 0),
                        t.addMany([58, 60, 61, 62, 63], 4, 0, 6),
                        t.addMany(o(32, 64), 6, 0, 6), t.add(127, 6, 0, 6),
                        t.addMany(o(64, 127), 6, 0, 0), t.add(58, 3, 0, 6),
                        t.addMany(o(32, 48), 3, 9, 5), t.addMany(o(32, 48), 5, 9, 5),
                        t.addMany(o(48, 64), 5, 0, 6), t.addMany(o(64, 127), 5, 7, 0),
                        t.addMany(o(32, 48), 4, 9, 5), t.addMany(o(32, 48), 1, 9, 2),
                        t.addMany(o(32, 48), 2, 9, 2), t.addMany(o(48, 127), 2, 10, 0),
                        t.addMany(o(48, 80), 1, 10, 0), t.addMany(o(81, 88), 1, 10, 0),
                        t.addMany([89, 90, 92], 1, 10, 0),
                        t.addMany(o(96, 127), 1, 10, 0), t.add(80, 1, 11, 9),
                        t.addMany(h, 9, 0, 9), t.add(127, 9, 0, 9),
                        t.addMany(o(28, 32), 9, 0, 9), t.addMany(o(32, 48), 9, 9, 12),
                        t.add(58, 9, 0, 11), t.addMany(o(48, 58), 9, 8, 10),
                        t.add(59, 9, 8, 10), t.addMany([60, 61, 62, 63], 9, 9, 10),
                        t.addMany(h, 11, 0, 11), t.addMany(o(32, 128), 11, 0, 11),
                        t.addMany(o(28, 32), 11, 0, 11), t.addMany(h, 10, 0, 10),
                        t.add(127, 10, 0, 10), t.addMany(o(28, 32), 10, 0, 10),
                        t.addMany(o(48, 58), 10, 8, 10), t.add(59, 10, 8, 10),
                        t.addMany([58, 60, 61, 62, 63], 10, 0, 11),
                        t.addMany(o(32, 48), 10, 9, 12), t.addMany(h, 12, 0, 12),
                        t.add(127, 12, 0, 12), t.addMany(o(28, 32), 12, 0, 12),
                        t.addMany(o(32, 48), 12, 9, 12),
                        t.addMany(o(48, 64), 12, 0, 11),
                        t.addMany(o(64, 127), 12, 12, 13),
                        t.addMany(o(64, 127), 10, 12, 13),
                        t.addMany(o(64, 127), 9, 12, 13), t.addMany(h, 13, 13, 13),
                        t.addMany(l, 13, 13, 13), t.add(127, 13, 0, 13),
                        t.addMany([27, 156], 13, 14, 0), t.add(160, 8, 5, 8), t
                }();
                var c = function () {
                    function e() { }
                    return e.prototype.hook = function (e, t, i) { },
                        e.prototype.put = function (e, t, i) { },
                        e.prototype.unhook = function () { }, e
                }(), u = function (i) {
                    function e(e) {
                        void 0 === e && (e = r.VT500_TRANSITION_TABLE);
                        var t = i.call(this) || this;
                        return t.TRANSITIONS = e, t.initialState = 0,
                            t.currentState = t.initialState, t._osc = '',
                            t._params = [0], t._collect = '',
                            t._printHandlerFb = function (e, t, i) { },
                            t._executeHandlerFb = function (e) { },
                            t._csiHandlerFb = function (e, t, i) { },
                            t._escHandlerFb = function (e, t) { },
                            t._oscHandlerFb = function (e, t) { }, t._dcsHandlerFb = new c,
                            t._errorHandlerFb =
                            function (e) {
                                return e
                            },
                            t._printHandler = t._printHandlerFb,
                            t._executeHandlers = Object.create(null),
                            t._csiHandlers = Object.create(null),
                            t._escHandlers = Object.create(null),
                            t._oscHandlers = Object.create(null),
                            t._dcsHandlers = Object.create(null),
                            t._activeDcsHandler = null,
                            t._errorHandler = t._errorHandlerFb,
                            t.setEscHandler('\\', function () { }), t
                    }
                    return s(e, i), e.prototype.dispose = function () {
                        this._printHandlerFb = null, this._executeHandlerFb = null,
                            this._csiHandlerFb = null, this._escHandlerFb = null,
                            this._oscHandlerFb = null, this._dcsHandlerFb = null,
                            this._errorHandlerFb = null, this._printHandler = null,
                            this._executeHandlers = null, this._escHandlers = null,
                            this._csiHandlers = null, this._oscHandlers = null,
                            this._dcsHandlers = null, this._activeDcsHandler = null,
                            this._errorHandler = null
                    }, e.prototype.setPrintHandler = function (e) {
                        this._printHandler = e
                    }, e.prototype.clearPrintHandler = function () {
                        this._printHandler = this._printHandlerFb
                    }, e.prototype.setExecuteHandler = function (e, t) {
                        this._executeHandlers[e.charCodeAt(0)] = t
                    }, e.prototype.clearExecuteHandler = function (e) {
                        this._executeHandlers[e.charCodeAt(0)] &&
                            delete this._executeHandlers[e.charCodeAt(0)]
                    }, e.prototype.setExecuteHandlerFallback = function (e) {
                        this._executeHandlerFb = e
                    }, e.prototype.addCsiHandler = function (e, t) {
                        var i = e.charCodeAt(0);
                        void 0 === this._csiHandlers[i] && (this._csiHandlers[i] = []);
                        var r = this._csiHandlers[i];
                        return r.push(t), {
                            dispose: function () {
                                var e = r.indexOf(t);
                                -1 !== e && r.splice(e, 1)
                            }
                        }
                    }, e.prototype.setCsiHandler = function (e, t) {
                        this._csiHandlers[e.charCodeAt(0)] = [t]
                    }, e.prototype.clearCsiHandler = function (e) {
                        this._csiHandlers[e.charCodeAt(0)] &&
                            delete this._csiHandlers[e.charCodeAt(0)]
                    }, e.prototype.setCsiHandlerFallback = function (e) {
                        this._csiHandlerFb = e
                    }, e.prototype.setEscHandler = function (e, t) {
                        this._escHandlers[e] = t
                    }, e.prototype.clearEscHandler = function (e) {
                        this._escHandlers[e] && delete this._escHandlers[e]
                    }, e.prototype.setEscHandlerFallback = function (e) {
                        this._escHandlerFb = e
                    }, e.prototype.addOscHandler = function (e, t) {
                        void 0 === this._oscHandlers[e] && (this._oscHandlers[e] = []);
                        var i = this._oscHandlers[e];
                        return i.push(t), {
                            dispose: function () {
                                var e = i.indexOf(t);
                                -1 !== e && i.splice(e, 1)
                            }
                        }
                    }, e.prototype.setOscHandler = function (e, t) {
                        this._oscHandlers[e] = [t]
                    }, e.prototype.clearOscHandler = function (e) {
                        this._oscHandlers[e] && delete this._oscHandlers[e]
                    }, e.prototype.setOscHandlerFallback = function (e) {
                        this._oscHandlerFb = e
                    }, e.prototype.setDcsHandler = function (e, t) {
                        this._dcsHandlers[e] = t
                    }, e.prototype.clearDcsHandler = function (e) {
                        this._dcsHandlers[e] && delete this._dcsHandlers[e]
                    }, e.prototype.setDcsHandlerFallback = function (e) {
                        this._dcsHandlerFb = e
                    }, e.prototype.setErrorHandler = function (e) {
                        this._errorHandler = e
                    }, e.prototype.clearErrorHandler = function () {
                        this._errorHandler = this._errorHandlerFb
                    }, e.prototype.reset = function () {
                        this.currentState = this.initialState, this._osc = '',
                            this._params = [0], this._collect = '',
                            this._activeDcsHandler = null
                    }, e.prototype.parse = function (e, t) {
                        for (var i = 0, r = 0, n = !1, s = this.currentState, o = -1,
                            a = -1, l = this._osc, h = this._collect, c = this._params,
                            u = this.TRANSITIONS.table, _ = this._activeDcsHandler,
                            f = null, d = 0;
                            d < t; ++d)
                            if (i = e[d], 0 === s && 31 < i && i < 128) {
                                for (o = ~o ? o : d; ++d < t && 31 < e[d] && e[d] < 128;)
                                    ;
                                d--
                            } else if (4 === s && 47 < i && i < 57)
                                c[c.length - 1] = 10 * c[c.length - 1] + i - 48;
                            else {
                                switch ((r = u[s << 8 | (i < 160 ? i : 160)]) >> 4) {
                                    case 2:
                                        o = ~o ? o : d;
                                        break;
                                    case 3:
                                        ~o && (this._printHandler(e, o, d), o = -1),
                                            (f = this._executeHandlers[i]) ?
                                                f() :
                                                this._executeHandlerFb(i);
                                        break;
                                    case 0:
                                        ~o ? (this._printHandler(e, o, d), o = -1) :
                                            ~a && (_.put(e, a, d), a = -1);
                                        break;
                                    case 1:
                                        if (159 < i) switch (s) {
                                            case 0:
                                                o = ~o ? o : d;
                                                break;
                                            case 6:
                                                r |= 6;
                                                break;
                                            case 11:
                                                r |= 11;
                                                break;
                                            case 13:
                                                a = ~a ? a : d, r |= 13;
                                                break;
                                            default:
                                                n = !0
                                        }
                                        else
                                            n = !0;
                                        if (n) {
                                            if (this._errorHandler({
                                                position: d,
                                                code: i,
                                                currentState: s,
                                                print: o,
                                                dcs: a,
                                                osc: l,
                                                collect: h,
                                                params: c,
                                                abort: !1
                                            })
                                                .abort)
                                                return;
                                            n = !1
                                        }
                                        break;
                                    case 7:
                                        for (var p = this._csiHandlers[i],
                                            m = p ? p.length - 1 : -1;
                                            0 <= m && !p[m](c, h); m--)
                                            ;
                                        m < 0 && this._csiHandlerFb(h, c, i);
                                        break;
                                    case 8:
                                        59 === i ? c.push(0) :
                                            c[c.length - 1] = 10 * c[c.length - 1] + i - 48;
                                        break;
                                    case 9:
                                        h += String.fromCharCode(i);
                                        break;
                                    case 10:
                                        (f = this._escHandlers[h + String.fromCharCode(i)]) ?
                                            f(h, i) :
                                            this._escHandlerFb(h, i);
                                        break;
                                    case 11:
                                        ~o && (this._printHandler(e, o, d), o = -1),
                                            c = [0], h = l = '', a = -1;
                                        break;
                                    case 12:
                                        (_ = this._dcsHandlers[h + String.fromCharCode(i)]) ||
                                            (_ = this._dcsHandlerFb),
                                            _.hook(h, c, i);
                                        break;
                                    case 13:
                                        a = ~a ? a : d;
                                        break;
                                    case 14:
                                        _ && (~a && _.put(e, a, d), _.unhook(), _ = null),
                                            27 === i && (r |= 1), c = [0], h = l = '', a = -1;
                                        break;
                                    case 4:
                                        ~o && (this._printHandler(e, o, d), o = -1), l = '';
                                        break;
                                    case 5:
                                        for (var y = d + 1; ; y++)
                                            if (t <= y || (i = e[y]) < 32 || 127 < i && i <= 159) {
                                                l += L.utf32ToString(e, d, y), d = y - 1;
                                                break
                                            }
                                        break;
                                    case 6:
                                        if (l && 24 !== i && 26 !== i) {
                                            var C = l.indexOf(';');
                                            if (-1 === C)
                                                this._oscHandlerFb(-1, l);
                                            else {
                                                for (var g = parseInt(l.substring(0, C)),
                                                    v = l.substring(C + 1),
                                                    b = this._oscHandlers[g],
                                                    w = b ? b.length - 1 : -1;
                                                    0 <= w && !b[w](v); w--)
                                                    ;
                                                w < 0 && this._oscHandlerFb(g, v)
                                            }
                                        }
                                        27 === i && (r |= 1), c = [0], h = l = '', a = -1
                                }
                                s = 15 & r
                            }
                        0 === s && ~o ? this._printHandler(e, o, t) :
                            13 === s && ~a && _ && _.put(e, a, t),
                            this._osc = l, this._collect = h, this._params = c,
                            this._activeDcsHandler = _, this.currentState = s
                    }, e
                }(i.Disposable);
                r.EscapeSequenceParser = u
            },
            { './common/Lifecycle': 20, './core/input/TextDecoder': 26 }
        ],
        9: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var a = e('./common/data/EscapeSequences'),
                    l = e('./core/data/Charsets'), C = e('./Buffer'),
                    g = e('./CharWidth'), h = e('./EscapeSequenceParser'),
                    s = e('./common/Lifecycle'), o = e('./common/TypedArrayUtils'),
                    v = e('./core/input/TextDecoder'),
                    c = { '(': 0, ')': 1, '*': 2, '+': 3, '-': 1, '.': 2 },
                    u = function () {
                        function e(e) {
                            this._terminal = e, this._data = new Uint32Array(0)
                        }
                        return e.prototype.hook = function (e, t, i) {
                            this._data = new Uint32Array(0)
                        }, e.prototype.put = function (e, t, i) {
                            this._data = o.concat(this._data, e.subarray(t, i))
                        }, e.prototype.unhook = function () {
                            var e = v.utf32ToString(this._data);
                            switch (this._data = new Uint32Array(0), e) {
                                case '"q':
                                    return this._terminal.handler(
                                        a.C0.ESC + 'P1$r0"q' + a.C0.ESC + '\\');
                                case '"p':
                                    return this._terminal.handler(
                                        a.C0.ESC + 'P1$r61"p' + a.C0.ESC + '\\');
                                case 'r':
                                    var t = this._terminal.buffer.scrollTop + 1 + ';' +
                                        (this._terminal.buffer.scrollBottom + 1) + 'r';
                                    return this._terminal.handler(
                                        a.C0.ESC + 'P1$r' + t + a.C0.ESC + '\\');
                                case 'm':
                                    return this._terminal.handler(
                                        a.C0.ESC + 'P1$r0m' + a.C0.ESC + '\\');
                                case ' q':
                                    var i = {
                                        block: 2,
                                        underline: 4,
                                        bar: 6
                                    }[this._terminal.getOption('cursorStyle')];
                                    return i -= this._terminal.getOption('cursorBlink'),
                                        this._terminal.handler(
                                            a.C0.ESC + 'P1$r' + i + ' q' + a.C0.ESC + '\\');
                                default:
                                    this._terminal.error('Unknown DCS $q %s', e),
                                        this._terminal.handler(
                                            a.C0.ESC + 'P0$r' + a.C0.ESC + '\\')
                            }
                        }, e
                    }(), _ = function (o) {
                        function e(e, t) {
                            void 0 === t && (t = new h.EscapeSequenceParser);
                            var r = o.call(this) || this;
                            r._terminal = e, r._parser = t,
                                r._parseBuffer = new Uint32Array(4096),
                                r._stringDecoder = new v.StringToUtf32, r.register(r._parser),
                                r._parser.setCsiHandlerFallback(function (e, t, i) {
                                    r._terminal.error(
                                        'Unknown CSI code: ',
                                        { collect: e, params: t, flag: String.fromCharCode(i) })
                                }),
                                r._parser.setEscHandlerFallback(function (e, t) {
                                    r._terminal.error(
                                        'Unknown ESC code: ',
                                        { collect: e, flag: String.fromCharCode(t) })
                                }),
                                r._parser.setExecuteHandlerFallback(function (e) {
                                    r._terminal.error('Unknown EXECUTE code: ', { code: e })
                                }),
                                r._parser.setOscHandlerFallback(function (e, t) {
                                    r._terminal.error(
                                        'Unknown OSC code: ', { identifier: e, data: t })
                                }),
                                r._parser.setPrintHandler(function (e, t, i) {
                                    return r.print(e, t, i)
                                }),
                                r._parser.setCsiHandler('@', function (e, t) {
                                    return r.insertChars(e)
                                }), r._parser.setCsiHandler('A', function (e, t) {
                                    return r.cursorUp(e)
                                }), r._parser.setCsiHandler('B', function (e, t) {
                                    return r.cursorDown(e)
                                }), r._parser.setCsiHandler('C', function (e, t) {
                                    return r.cursorForward(e)
                                }), r._parser.setCsiHandler('D', function (e, t) {
                                    return r.cursorBackward(e)
                                }), r._parser.setCsiHandler('E', function (e, t) {
                                    return r.cursorNextLine(e)
                                }), r._parser.setCsiHandler('F', function (e, t) {
                                    return r.cursorPrecedingLine(e)
                                }), r._parser.setCsiHandler('G', function (e, t) {
                                    return r.cursorCharAbsolute(e)
                                }), r._parser.setCsiHandler('H', function (e, t) {
                                    return r.cursorPosition(e)
                                }), r._parser.setCsiHandler('I', function (e, t) {
                                    return r.cursorForwardTab(e)
                                }), r._parser.setCsiHandler('J', function (e, t) {
                                    return r.eraseInDisplay(e)
                                }), r._parser.setCsiHandler('K', function (e, t) {
                                    return r.eraseInLine(e)
                                }), r._parser.setCsiHandler('L', function (e, t) {
                                    return r.insertLines(e)
                                }), r._parser.setCsiHandler('M', function (e, t) {
                                    return r.deleteLines(e)
                                }), r._parser.setCsiHandler('P', function (e, t) {
                                    return r.deleteChars(e)
                                }), r._parser.setCsiHandler('S', function (e, t) {
                                    return r.scrollUp(e)
                                }), r._parser.setCsiHandler('T', function (e, t) {
                                    return r.scrollDown(e, t)
                                }), r._parser.setCsiHandler('X', function (e, t) {
                                    return r.eraseChars(e)
                                }), r._parser.setCsiHandler('Z', function (e, t) {
                                    return r.cursorBackwardTab(e)
                                }), r._parser.setCsiHandler('`', function (e, t) {
                                    return r.charPosAbsolute(e)
                                }), r._parser.setCsiHandler('a', function (e, t) {
                                    return r.hPositionRelative(e)
                                }), r._parser.setCsiHandler('b', function (e, t) {
                                    return r.repeatPrecedingCharacter(e)
                                }), r._parser.setCsiHandler('c', function (e, t) {
                                    return r.sendDeviceAttributes(e, t)
                                }), r._parser.setCsiHandler('d', function (e, t) {
                                    return r.linePosAbsolute(e)
                                }), r._parser.setCsiHandler('e', function (e, t) {
                                    return r.vPositionRelative(e)
                                }), r._parser.setCsiHandler('f', function (e, t) {
                                    return r.hVPosition(e)
                                }), r._parser.setCsiHandler('g', function (e, t) {
                                    return r.tabClear(e)
                                }), r._parser.setCsiHandler('h', function (e, t) {
                                    return r.setMode(e, t)
                                }), r._parser.setCsiHandler('l', function (e, t) {
                                    return r.resetMode(e, t)
                                }), r._parser.setCsiHandler('m', function (e, t) {
                                    return r.charAttributes(e)
                                }), r._parser.setCsiHandler('n', function (e, t) {
                                    return r.deviceStatus(e, t)
                                }), r._parser.setCsiHandler('p', function (e, t) {
                                    return r.softReset(e, t)
                                }), r._parser.setCsiHandler('q', function (e, t) {
                                    return r.setCursorStyle(e, t)
                                }), r._parser.setCsiHandler('r', function (e, t) {
                                    return r.setScrollRegion(e, t)
                                }), r._parser.setCsiHandler('s', function (e, t) {
                                    return r.saveCursor(e)
                                }), r._parser.setCsiHandler('u', function (e, t) {
                                    return r.restoreCursor(e)
                                }), r._parser.setExecuteHandler(a.C0.BEL, function () {
                                    return r.bell()
                                }), r._parser.setExecuteHandler(a.C0.LF, function () {
                                    return r.lineFeed()
                                }), r._parser.setExecuteHandler(a.C0.VT, function () {
                                    return r.lineFeed()
                                }), r._parser.setExecuteHandler(a.C0.FF, function () {
                                    return r.lineFeed()
                                }), r._parser.setExecuteHandler(a.C0.CR, function () {
                                    return r.carriageReturn()
                                }), r._parser.setExecuteHandler(a.C0.BS, function () {
                                    return r.backspace()
                                }), r._parser.setExecuteHandler(a.C0.HT, function () {
                                    return r.tab()
                                }), r._parser.setExecuteHandler(a.C0.SO, function () {
                                    return r.shiftOut()
                                }), r._parser.setExecuteHandler(a.C0.SI, function () {
                                    return r.shiftIn()
                                }), r._parser.setExecuteHandler(a.C1.IND, function () {
                                    return r.index()
                                }), r._parser.setExecuteHandler(a.C1.NEL, function () {
                                    return r.nextLine()
                                }), r._parser.setExecuteHandler(a.C1.HTS, function () {
                                    return r.tabSet()
                                }), r._parser.setOscHandler(0, function (e) {
                                    return r.setTitle(e)
                                }), r._parser.setOscHandler(2, function (e) {
                                    return r.setTitle(e)
                                }), r._parser.setEscHandler('7', function () {
                                    return r.saveCursor([])
                                }), r._parser.setEscHandler('8', function () {
                                    return r.restoreCursor([])
                                }), r._parser.setEscHandler('D', function () {
                                    return r.index()
                                }), r._parser.setEscHandler('E', function () {
                                    return r.nextLine()
                                }), r._parser.setEscHandler('H', function () {
                                    return r.tabSet()
                                }), r._parser.setEscHandler('M', function () {
                                    return r.reverseIndex()
                                }), r._parser.setEscHandler('=', function () {
                                    return r.keypadApplicationMode()
                                }), r._parser.setEscHandler('>', function () {
                                    return r.keypadNumericMode()
                                }), r._parser.setEscHandler('c', function () {
                                    return r.reset()
                                }), r._parser.setEscHandler('n', function () {
                                    return r.setgLevel(2)
                                }), r._parser.setEscHandler('o', function () {
                                    return r.setgLevel(3)
                                }), r._parser.setEscHandler('|', function () {
                                    return r.setgLevel(3)
                                }), r._parser.setEscHandler('}', function () {
                                    return r.setgLevel(2)
                                }), r._parser.setEscHandler('~', function () {
                                    return r.setgLevel(1)
                                }), r._parser.setEscHandler('%@', function () {
                                    return r.selectDefaultCharset()
                                }), r._parser.setEscHandler('%G', function () {
                                    return r.selectDefaultCharset()
                                });
                            var i = function (e) {
                                n._parser.setEscHandler('(' + e, function () {
                                    return r.selectCharset('(' + e)
                                }), n._parser.setEscHandler(')' + e, function () {
                                    return r.selectCharset(')' + e)
                                }), n._parser.setEscHandler('*' + e, function () {
                                    return r.selectCharset('*' + e)
                                }), n._parser.setEscHandler('+' + e, function () {
                                    return r.selectCharset('+' + e)
                                }), n._parser.setEscHandler('-' + e, function () {
                                    return r.selectCharset('-' + e)
                                }), n._parser.setEscHandler('.' + e, function () {
                                    return r.selectCharset('.' + e)
                                }), n._parser.setEscHandler('/' + e, function () {
                                    return r.selectCharset('/' + e)
                                })
                            }, n = this;
                            for (var s in l.CHARSETS) i(s);
                            return r._parser.setErrorHandler(function (e) {
                                return r._terminal.error('Parsing error: ', e), e
                            }),
                                r._parser.setDcsHandler('$q', new u(r._terminal)), r
                        }
                        return n(e, o), e.prototype.dispose = function () {
                            o.prototype.dispose.call(this), this._terminal = null
                        }, e.prototype.parse = function (e) {
                            if (this._terminal) {
                                var t = this._terminal.buffer, i = t.x, r = t.y;
                                this._terminal.debug && this._terminal.log('data: ' + e),
                                    this._parseBuffer.length < e.length &&
                                    (this._parseBuffer = new Uint32Array(e.length));
                                for (var n = 0; n < e.length; ++n)
                                    this._parseBuffer[n] = e.charCodeAt(n);
                                this._parser.parse(
                                    this._parseBuffer,
                                    this._stringDecoder.decode(e, this._parseBuffer)),
                                    (t = this._terminal.buffer).x === i && t.y === r ||
                                    this._terminal.emit('cursormove')
                            }
                        }, e.prototype.print = function (e, t, i) {
                            var r, n, s,
                                o = this._terminal.buffer, a = this._terminal.charset,
                                l = this._terminal.options.screenReaderMode,
                                h = this._terminal.cols, c = this._terminal.wraparoundMode,
                                u = this._terminal.insertMode, _ = this._terminal.curAttr,
                                f = o.lines.get(o.y + o.ybase);
                            this._terminal.updateRange(o.y);
                            for (var d = t; d < i; ++d) {
                                if (r = e[d], n = v.stringFromCodePoint(r), s = g.wcwidth(r),
                                    r < 127 && a) {
                                    var p = a[n];
                                    p && (r = p.charCodeAt(0), n = p)
                                }
                                if (l && this._terminal.emit('a11y.char', n), s || !o.x) {
                                    if (o.x + s - 1 >= h)
                                        if (c)
                                            o.x = 0, o.y++ ,
                                                o.y > o.scrollBottom ?
                                                    (o.y-- , this._terminal.scroll(!0)) :
                                                    o.lines.get(o.y).isWrapped = !0,
                                                f = o.lines.get(o.y + o.ybase);
                                        else if (2 === s)
                                            continue;
                                    if (u)
                                        f.insertCells(
                                            o.x, s,
                                            [
                                                _, C.NULL_CELL_CHAR, C.NULL_CELL_WIDTH,
                                                C.NULL_CELL_CODE
                                            ]),
                                            2 === f.get(h - 1)[C.CHAR_DATA_WIDTH_INDEX] &&
                                            f.set(h - 1, [
                                                _, C.NULL_CELL_CHAR, C.NULL_CELL_WIDTH,
                                                C.NULL_CELL_CODE
                                            ]);
                                    if (f.set(o.x++, [_, n, s, r]), 0 < s)
                                        for (; --s;) f.set(o.x++, [_, '', 0, void 0])
                                } else {
                                    var m = f.get(o.x - 1);
                                    if (m)
                                        if (m[C.CHAR_DATA_WIDTH_INDEX])
                                            m[C.CHAR_DATA_CHAR_INDEX] += n,
                                                m[C.CHAR_DATA_CODE_INDEX] = r, f.set(o.x - 1, m);
                                        else {
                                            var y = f.get(o.x - 2);
                                            y &&
                                                (y[C.CHAR_DATA_CHAR_INDEX] += n,
                                                    y[C.CHAR_DATA_CODE_INDEX] = r, f.set(o.x - 2, y))
                                        }
                                }
                            }
                            this._terminal.updateRange(o.y)
                        }, e.prototype.addCsiHandler = function (e, t) {
                            return this._parser.addCsiHandler(e, t)
                        }, e.prototype.addOscHandler = function (e, t) {
                            return this._parser.addOscHandler(e, t)
                        }, e.prototype.bell = function () {
                            this._terminal.bell()
                        }, e.prototype.lineFeed = function () {
                            var e = this._terminal.buffer;
                            this._terminal.options.convertEol && (e.x = 0), e.y++ ,
                                e.y > e.scrollBottom && (e.y-- , this._terminal.scroll()),
                                e.x >= this._terminal.cols && e.x-- ,
                                this._terminal.emit('linefeed')
                        }, e.prototype.carriageReturn = function () {
                            this._terminal.buffer.x = 0
                        }, e.prototype.backspace = function () {
                            0 < this._terminal.buffer.x && this._terminal.buffer.x--
                        }, e.prototype.tab = function () {
                            var e = this._terminal.buffer.x;
                            this._terminal.buffer.x = this._terminal.buffer.nextStop(),
                                this._terminal.options.screenReaderMode &&
                                this._terminal.emit('a11y.tab', this._terminal.buffer.x - e)
                        }, e.prototype.shiftOut = function () {
                            this._terminal.setgLevel(1)
                        }, e.prototype.shiftIn = function () {
                            this._terminal.setgLevel(0)
                        }, e.prototype.insertChars = function (e) {
                            this._terminal.buffer.lines
                                .get(this._terminal.buffer.y + this._terminal.buffer.ybase)
                                .insertCells(
                                    this._terminal.buffer.x, e[0] || 1,
                                    [
                                        this._terminal.eraseAttr(), C.NULL_CELL_CHAR,
                                        C.NULL_CELL_WIDTH, C.NULL_CELL_CODE
                                    ]),
                                this._terminal.updateRange(this._terminal.buffer.y)
                        }, e.prototype.cursorUp = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1), this._terminal.buffer.y -= t,
                                this._terminal.buffer.y < 0 && (this._terminal.buffer.y = 0)
                        }, e.prototype.cursorDown = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1), this._terminal.buffer.y += t,
                                this._terminal.buffer.y >= this._terminal.rows &&
                                (this._terminal.buffer.y = this._terminal.rows - 1),
                                this._terminal.buffer.x >= this._terminal.cols &&
                                this._terminal.buffer.x--
                        }, e.prototype.cursorForward = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1), this._terminal.buffer.x += t,
                                this._terminal.buffer.x >= this._terminal.cols &&
                                (this._terminal.buffer.x = this._terminal.cols - 1)
                        }, e.prototype.cursorBackward = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1),
                                this._terminal.buffer.x >= this._terminal.cols &&
                                this._terminal.buffer.x-- ,
                                this._terminal.buffer.x -= t,
                                this._terminal.buffer.x < 0 && (this._terminal.buffer.x = 0)
                        }, e.prototype.cursorNextLine = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1), this._terminal.buffer.y += t,
                                this._terminal.buffer.y >= this._terminal.rows &&
                                (this._terminal.buffer.y = this._terminal.rows - 1),
                                this._terminal.buffer.x = 0
                        }, e.prototype.cursorPrecedingLine = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1), this._terminal.buffer.y -= t,
                                this._terminal.buffer.y < 0 &&
                                (this._terminal.buffer.y = 0),
                                this._terminal.buffer.x = 0
                        }, e.prototype.cursorCharAbsolute = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1), this._terminal.buffer.x = t - 1
                        }, e.prototype.cursorPosition = function (e) {
                            var t, i = e[0] - 1;
                            t = 2 <= e.length ? e[1] - 1 : 0,
                                i < 0 ?
                                    i = 0 :
                                    i >= this._terminal.rows && (i = this._terminal.rows - 1),
                                t < 0 ?
                                    t = 0 :
                                    t >= this._terminal.cols && (t = this._terminal.cols - 1),
                                this._terminal.buffer.x = t, this._terminal.buffer.y = i
                        }, e.prototype.cursorForwardTab = function (e) {
                            for (var t = e[0] || 1; t--;)
                                this._terminal.buffer.x = this._terminal.buffer.nextStop()
                        }, e.prototype._eraseInBufferLine = function (e, t, i, r) {
                            void 0 === r && (r = !1);
                            var n = this._terminal.buffer.lines.get(
                                this._terminal.buffer.ybase + e);
                            n.replaceCells(
                                t, i,
                                [
                                    this._terminal.eraseAttr(), C.NULL_CELL_CHAR,
                                    C.NULL_CELL_WIDTH, C.NULL_CELL_CODE
                                ]),
                                r && (n.isWrapped = !1)
                        }, e.prototype._resetBufferLine = function (e) {
                            this._eraseInBufferLine(e, 0, this._terminal.cols, !0)
                        }, e.prototype.eraseInDisplay = function (e) {
                            var t;
                            switch (e[0]) {
                                case 0:
                                    for (t = this._terminal.buffer.y,
                                        this._terminal.updateRange(t),
                                        this._eraseInBufferLine(
                                            t++, this._terminal.buffer.x, this._terminal.cols,
                                            0 === this._terminal.buffer.x);
                                        t < this._terminal.rows; t++)
                                        this._resetBufferLine(t);
                                    this._terminal.updateRange(t);
                                    break;
                                case 1:
                                    for (t = this._terminal.buffer.y,
                                        this._terminal.updateRange(t),
                                        this._eraseInBufferLine(
                                            t, 0, this._terminal.buffer.x + 1, !0),
                                        this._terminal.buffer.x + 1 >= this._terminal.cols &&
                                        (this._terminal.buffer.lines.get(t + 1).isWrapped =
                                            !1);
                                        t--;)
                                        this._resetBufferLine(t);
                                    this._terminal.updateRange(0);
                                    break;
                                case 2:
                                    for (t = this._terminal.rows,
                                        this._terminal.updateRange(t - 1);
                                        t--;)
                                        this._resetBufferLine(t);
                                    this._terminal.updateRange(0);
                                    break;
                                case 3:
                                    var i = this._terminal.buffer.lines.length -
                                        this._terminal.rows;
                                    0 < i &&
                                        (this._terminal.buffer.lines.trimStart(i),
                                            this._terminal.buffer.ybase =
                                            Math.max(this._terminal.buffer.ybase - i, 0),
                                            this._terminal.buffer.ydisp =
                                            Math.max(this._terminal.buffer.ydisp - i, 0),
                                            this._terminal.emit('scroll', 0))
                            }
                        }, e.prototype.eraseInLine = function (e) {
                            switch (e[0]) {
                                case 0:
                                    this._eraseInBufferLine(
                                        this._terminal.buffer.y, this._terminal.buffer.x,
                                        this._terminal.cols);
                                    break;
                                case 1:
                                    this._eraseInBufferLine(
                                        this._terminal.buffer.y, 0,
                                        this._terminal.buffer.x + 1);
                                    break;
                                case 2:
                                    this._eraseInBufferLine(
                                        this._terminal.buffer.y, 0, this._terminal.cols)
                            }
                            this._terminal.updateRange(this._terminal.buffer.y)
                        }, e.prototype.insertLines = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1);
                            for (var i = this._terminal.buffer, r = i.y + i.ybase,
                                n = this._terminal.rows - 1 - i.scrollBottom,
                                s = this._terminal.rows - 1 + i.ybase - n + 1;
                                t--;)
                                i.lines.splice(s - 1, 1),
                                    i.lines.splice(
                                        r, 0, i.getBlankLine(this._terminal.eraseAttr()));
                            this._terminal.updateRange(i.y),
                                this._terminal.updateRange(i.scrollBottom)
                        }, e.prototype.deleteLines = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1);
                            var i, r = this._terminal.buffer, n = r.y + r.ybase;
                            for (i = this._terminal.rows - 1 - r.scrollBottom,
                                i = this._terminal.rows - 1 + r.ybase - i;
                                t--;)
                                r.lines.splice(n, 1),
                                    r.lines.splice(
                                        i, 0, r.getBlankLine(this._terminal.eraseAttr()));
                            this._terminal.updateRange(r.y),
                                this._terminal.updateRange(r.scrollBottom)
                        }, e.prototype.deleteChars = function (e) {
                            this._terminal.buffer.lines
                                .get(this._terminal.buffer.y + this._terminal.buffer.ybase)
                                .deleteCells(
                                    this._terminal.buffer.x, e[0] || 1,
                                    [
                                        this._terminal.eraseAttr(), C.NULL_CELL_CHAR,
                                        C.NULL_CELL_WIDTH, C.NULL_CELL_CODE
                                    ]),
                                this._terminal.updateRange(this._terminal.buffer.y)
                        }, e.prototype.scrollUp = function (e) {
                            for (var t = e[0] || 1, i = this._terminal.buffer; t--;)
                                i.lines.splice(i.ybase + i.scrollTop, 1),
                                    i.lines.splice(
                                        i.ybase + i.scrollBottom, 0,
                                        i.getBlankLine(C.DEFAULT_ATTR));
                            this._terminal.updateRange(i.scrollTop),
                                this._terminal.updateRange(i.scrollBottom)
                        }, e.prototype.scrollDown = function (e, t) {
                            if (e.length < 2 && !t) {
                                for (var i = e[0] || 1, r = this._terminal.buffer; i--;)
                                    r.lines.splice(r.ybase + r.scrollBottom, 1),
                                        r.lines.splice(
                                            r.ybase + r.scrollBottom, 0,
                                            r.getBlankLine(C.DEFAULT_ATTR));
                                this._terminal.updateRange(r.scrollTop),
                                    this._terminal.updateRange(r.scrollBottom)
                            }
                        }, e.prototype.eraseChars = function (e) {
                            this._terminal.buffer.lines
                                .get(this._terminal.buffer.y + this._terminal.buffer.ybase)
                                .replaceCells(
                                    this._terminal.buffer.x,
                                    this._terminal.buffer.x + (e[0] || 1), [
                                    this._terminal.eraseAttr(), C.NULL_CELL_CHAR,
                                    C.NULL_CELL_WIDTH, C.NULL_CELL_CODE
                                ])
                        }, e.prototype.cursorBackwardTab = function (e) {
                            for (var t = e[0] || 1, i = this._terminal.buffer; t--;)
                                i.x = i.prevStop()
                        }, e.prototype.charPosAbsolute = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1),
                                this._terminal.buffer.x = t - 1,
                                this._terminal.buffer.x >= this._terminal.cols &&
                                (this._terminal.buffer.x = this._terminal.cols - 1)
                        }, e.prototype.hPositionRelative = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1), this._terminal.buffer.x += t,
                                this._terminal.buffer.x >= this._terminal.cols &&
                                (this._terminal.buffer.x = this._terminal.cols - 1)
                        }, e.prototype.repeatPrecedingCharacter = function (e) {
                            var t = this._terminal.buffer, i = t.lines.get(t.ybase + t.y);
                            i.replaceCells(t.x, t.x + (e[0] || 1), i.get(t.x - 1) || [
                                C.DEFAULT_ATTR, C.NULL_CELL_CHAR, C.NULL_CELL_WIDTH,
                                C.NULL_CELL_CODE
                            ])
                        }, e.prototype.sendDeviceAttributes = function (e, t) {
                            0 < e[0] ||
                                (t ? '>' === t &&
                                    (this._terminal.is('xterm') ?
                                        this._terminal.handler(
                                            a.C0.ESC + '[>0;276;0c') :
                                        this._terminal.is('rxvt-unicode') ?
                                            this._terminal.handler(
                                                a.C0.ESC + '[>85;95;0c') :
                                            this._terminal.is('linux') ?
                                                this._terminal.handler(e[0] + 'c') :
                                                this._terminal.is('screen') &&
                                                this._terminal.handler(
                                                    a.C0.ESC + '[>83;40003;0c')) :
                                    this._terminal.is('xterm') ||
                                        this._terminal.is('rxvt-unicode') ||
                                        this._terminal.is('screen') ?
                                        this._terminal.handler(a.C0.ESC + '[?1;2c') :
                                        this._terminal.is('linux') &&
                                        this._terminal.handler(a.C0.ESC + '[?6c'))
                        }, e.prototype.linePosAbsolute = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1),
                                this._terminal.buffer.y = t - 1,
                                this._terminal.buffer.y >= this._terminal.rows &&
                                (this._terminal.buffer.y = this._terminal.rows - 1)
                        }, e.prototype.vPositionRelative = function (e) {
                            var t = e[0];
                            t < 1 && (t = 1), this._terminal.buffer.y += t,
                                this._terminal.buffer.y >= this._terminal.rows &&
                                (this._terminal.buffer.y = this._terminal.rows - 1),
                                this._terminal.buffer.x >= this._terminal.cols &&
                                this._terminal.buffer.x--
                        }, e.prototype.hVPosition = function (e) {
                            e[0] < 1 && (e[0] = 1), e[1] < 1 && (e[1] = 1),
                                this._terminal.buffer.y = e[0] - 1,
                                this._terminal.buffer.y >= this._terminal.rows &&
                                (this._terminal.buffer.y = this._terminal.rows - 1),
                                this._terminal.buffer.x = e[1] - 1,
                                this._terminal.buffer.x >= this._terminal.cols &&
                                (this._terminal.buffer.x = this._terminal.cols - 1)
                        }, e.prototype.tabClear = function (e) {
                            var t = e[0];
                            t <= 0 ?
                                delete this._terminal.buffer.tabs[this._terminal.buffer.x] :
                                3 === t && (this._terminal.buffer.tabs = {})
                        }, e.prototype.setMode = function (e, t) {
                            if (1 < e.length)
                                for (var i = 0; i < e.length; i++) this.setMode([e[i]]);
                            else if (t) {
                                if ('?' === t) switch (e[0]) {
                                    case 1:
                                        this._terminal.applicationCursor = !0;
                                        break;
                                    case 2:
                                        this._terminal.setgCharset(0, l.DEFAULT_CHARSET),
                                            this._terminal.setgCharset(1, l.DEFAULT_CHARSET),
                                            this._terminal.setgCharset(2, l.DEFAULT_CHARSET),
                                            this._terminal.setgCharset(3, l.DEFAULT_CHARSET);
                                        break;
                                    case 3:
                                        this._terminal.savedCols = this._terminal.cols,
                                            this._terminal.resize(132, this._terminal.rows);
                                        break;
                                    case 6:
                                        this._terminal.originMode = !0;
                                        break;
                                    case 7:
                                        this._terminal.wraparoundMode = !0;
                                        break;
                                    case 12:
                                        break;
                                    case 66:
                                        this._terminal.log(
                                            'Serial port requested application keypad.'),
                                            this._terminal.applicationKeypad = !0,
                                            this._terminal.viewport &&
                                            this._terminal.viewport.syncScrollArea();
                                        break;
                                    case 9:
                                    case 1e3:
                                    case 1002:
                                    case 1003:
                                        this._terminal.x10Mouse = 9 === e[0],
                                            this._terminal.vt200Mouse = 1e3 === e[0],
                                            this._terminal.normalMouse = 1e3 < e[0],
                                            this._terminal.mouseEvents = !0,
                                            this._terminal.element &&
                                            this._terminal.element.classList.add(
                                                'enable-mouse-events'),
                                            this._terminal.selectionManager &&
                                            this._terminal.selectionManager.disable(),
                                            this._terminal.log('Binding to mouse events.');
                                        break;
                                    case 1004:
                                        this._terminal.sendFocus = !0;
                                        break;
                                    case 1005:
                                        this._terminal.utfMouse = !0;
                                        break;
                                    case 1006:
                                        this._terminal.sgrMouse = !0;
                                        break;
                                    case 1015:
                                        this._terminal.urxvtMouse = !0;
                                        break;
                                    case 25:
                                        this._terminal.cursorHidden = !1;
                                        break;
                                    case 1048:
                                        this.saveCursor(e);
                                        break;
                                    case 1049:
                                        this.saveCursor(e);
                                    case 47:
                                    case 1047:
                                        this._terminal.buffers.activateAltBuffer(
                                            this._terminal.eraseAttr()),
                                            this._terminal.refresh(0, this._terminal.rows - 1),
                                            this._terminal.viewport &&
                                            this._terminal.viewport.syncScrollArea(),
                                            this._terminal.showCursor();
                                        break;
                                    case 2004:
                                        this._terminal.bracketedPasteMode = !0
                                }
                            } else
                                switch (e[0]) {
                                    case 4:
                                        this._terminal.insertMode = !0
                                }
                        }, e.prototype.resetMode = function (e, t) {
                            if (1 < e.length)
                                for (var i = 0; i < e.length; i++) this.resetMode([e[i]]);
                            else if (t) {
                                if ('?' === t) switch (e[0]) {
                                    case 1:
                                        this._terminal.applicationCursor = !1;
                                        break;
                                    case 3:
                                        132 === this._terminal.cols &&
                                            this._terminal.savedCols &&
                                            this._terminal.resize(
                                                this._terminal.savedCols, this._terminal.rows),
                                            delete this._terminal.savedCols;
                                        break;
                                    case 6:
                                        this._terminal.originMode = !1;
                                        break;
                                    case 7:
                                        this._terminal.wraparoundMode = !1;
                                        break;
                                    case 12:
                                        break;
                                    case 66:
                                        this._terminal.log('Switching back to normal keypad.'),
                                            this._terminal.applicationKeypad = !1,
                                            this._terminal.viewport &&
                                            this._terminal.viewport.syncScrollArea();
                                        break;
                                    case 9:
                                    case 1e3:
                                    case 1002:
                                    case 1003:
                                        this._terminal.x10Mouse = !1,
                                            this._terminal.vt200Mouse = !1,
                                            this._terminal.normalMouse = !1,
                                            this._terminal.mouseEvents = !1,
                                            this._terminal.element &&
                                            this._terminal.element.classList.remove(
                                                'enable-mouse-events'),
                                            this._terminal.selectionManager &&
                                            this._terminal.selectionManager.enable();
                                        break;
                                    case 1004:
                                        this._terminal.sendFocus = !1;
                                        break;
                                    case 1005:
                                        this._terminal.utfMouse = !1;
                                        break;
                                    case 1006:
                                        this._terminal.sgrMouse = !1;
                                        break;
                                    case 1015:
                                        this._terminal.urxvtMouse = !1;
                                        break;
                                    case 25:
                                        this._terminal.cursorHidden = !0;
                                        break;
                                    case 1048:
                                        this.restoreCursor(e);
                                        break;
                                    case 1049:
                                    case 47:
                                    case 1047:
                                        this._terminal.buffers.activateNormalBuffer(),
                                            1049 === e[0] && this.restoreCursor(e),
                                            this._terminal.refresh(0, this._terminal.rows - 1),
                                            this._terminal.viewport &&
                                            this._terminal.viewport.syncScrollArea(),
                                            this._terminal.showCursor();
                                        break;
                                    case 2004:
                                        this._terminal.bracketedPasteMode = !1
                                }
                            } else
                                switch (e[0]) {
                                    case 4:
                                        this._terminal.insertMode = !1
                                }
                        }, e.prototype.charAttributes = function (e) {
                            if (1 !== e.length || 0 !== e[0]) {
                                for (var t, i = e.length, r = this._terminal.curAttr >> 18,
                                    n = this._terminal.curAttr >> 9 & 511,
                                    s = 511 & this._terminal.curAttr, o = 0;
                                    o < i; o++)
                                    30 <= (t = e[o]) && t <= 37 ?
                                        n = t - 30 :
                                        40 <= t && t <= 47 ?
                                            s = t - 40 :
                                            90 <= t && t <= 97 ?
                                                n = (t += 8) - 90 :
                                                100 <= t && t <= 107 ?
                                                    s = (t += 8) - 100 :
                                                    0 === t ?
                                                        (r = C.DEFAULT_ATTR >> 18,
                                                            n = C.DEFAULT_ATTR >> 9 & 511,
                                                            s = 511 & C.DEFAULT_ATTR) :
                                                        1 === t ?
                                                            r |= 1 :
                                                            3 === t ?
                                                                r |= 64 :
                                                                4 === t ?
                                                                    r |= 2 :
                                                                    5 === t ?
                                                                        r |= 4 :
                                                                        7 === t ?
                                                                            r |= 8 :
                                                                            8 === t ?
                                                                                r |= 16 :
                                                                                2 === t ?
                                                                                    r |= 32 :
                                                                                    22 === t ?
                                                                                        (r &= -2, r &= -33) :
                                                                                        23 === t ?
                                                                                            r &= -65 :
                                                                                            24 === t ?
                                                                                                r &= -3 :
                                                                                                25 === t ?
                                                                                                    r &= -5 :
                                                                                                    27 === t ?
                                                                                                        r &= -9 :
                                                                                                        28 === t ?
                                                                                                            r &= -17 :
                                                                                                            39 === t ?
                                                                                                                n = C.DEFAULT_ATTR >> 9 & 511 :
                                                                                                                49 === t ?
                                                                                                                    s = 511 & C.DEFAULT_ATTR :
                                                                                                                    38 === t ?
                                                                                                                        2 === e[o + 1] ?
                                                                                                                            (o += 2,
                                                                                                                                -1 ===
                                                                                                                                (n = this._terminal.matchColor(
                                                                                                                                    255 & e[o], 255 & e[o + 1],
                                                                                                                                    255 & e[o + 2])) &&
                                                                                                                                (n = 511),
                                                                                                                                o += 2) :
                                                                                                                            5 === e[o + 1] && (n = t = 255 & e[o += 2]) :
                                                                                                                        48 === t ?
                                                                                                                            2 === e[o + 1] ?
                                                                                                                                (o += 2,
                                                                                                                                    -1 ===
                                                                                                                                    (s = this._terminal.matchColor(
                                                                                                                                        255 & e[o], 255 & e[o + 1],
                                                                                                                                        255 & e[o + 2])) &&
                                                                                                                                    (s = 511),
                                                                                                                                    o += 2) :
                                                                                                                                5 === e[o + 1] && (s = t = 255 & e[o += 2]) :
                                                                                                                            100 === t ?
                                                                                                                                (n = C.DEFAULT_ATTR >> 9 & 511,
                                                                                                                                    s = 511 & C.DEFAULT_ATTR) :
                                                                                                                                this._terminal.error('Unknown SGR attribute: %d.', t);
                                this._terminal.curAttr = r << 18 | n << 9 | s
                            } else
                                this._terminal.curAttr = C.DEFAULT_ATTR
                        }, e.prototype.deviceStatus = function (e, t) {
                            if (t) {
                                if ('?' === t) switch (e[0]) {
                                    case 6:
                                        i = this._terminal.buffer.y + 1,
                                            r = this._terminal.buffer.x + 1;
                                        this._terminal.emit(
                                            'data', a.C0.ESC + '[?' + i + ';' + r + 'R')
                                }
                            } else
                                switch (e[0]) {
                                    case 5:
                                        this._terminal.emit('data', a.C0.ESC + '[0n');
                                        break;
                                    case 6:
                                        var i = this._terminal.buffer.y + 1,
                                            r = this._terminal.buffer.x + 1;
                                        this._terminal.emit(
                                            'data', a.C0.ESC + '[' + i + ';' + r + 'R')
                                }
                        }, e.prototype.softReset = function (e, t) {
                            '!' === t &&
                                (this._terminal.cursorHidden = !1,
                                    this._terminal.insertMode = !1,
                                    this._terminal.originMode = !1,
                                    this._terminal.wraparoundMode = !0,
                                    this._terminal.applicationKeypad = !1,
                                    this._terminal.viewport &&
                                    this._terminal.viewport.syncScrollArea(),
                                    this._terminal.applicationCursor = !1,
                                    this._terminal.buffer.scrollTop = 0,
                                    this._terminal.buffer.scrollBottom =
                                    this._terminal.rows - 1,
                                    this._terminal.curAttr = C.DEFAULT_ATTR,
                                    this._terminal.buffer.x = this._terminal.buffer.y = 0,
                                    this._terminal.charset = null, this._terminal.glevel = 0,
                                    this._terminal.charsets = [null])
                        }, e.prototype.setCursorStyle = function (e, t) {
                            if (' ' === t) {
                                var i = e[0] < 1 ? 1 : e[0];
                                switch (i) {
                                    case 1:
                                    case 2:
                                        this._terminal.setOption('cursorStyle', 'block');
                                        break;
                                    case 3:
                                    case 4:
                                        this._terminal.setOption('cursorStyle', 'underline');
                                        break;
                                    case 5:
                                    case 6:
                                        this._terminal.setOption('cursorStyle', 'bar')
                                }
                                var r = i % 2 == 1;
                                this._terminal.setOption('cursorBlink', r)
                            }
                        }, e.prototype.setScrollRegion = function (e, t) {
                            t ||
                                (this._terminal.buffer.scrollTop = (e[0] || 1) - 1,
                                    this._terminal.buffer.scrollBottom =
                                    (e[1] && e[1] <= this._terminal.rows ?
                                        e[1] :
                                        this._terminal.rows) -
                                    1,
                                    this._terminal.buffer.x = 0, this._terminal.buffer.y = 0)
                        }, e.prototype.saveCursor = function (e) {
                            this._terminal.buffer.savedX = this._terminal.buffer.x,
                                this._terminal.buffer.savedY = this._terminal.buffer.y,
                                this._terminal.buffer.savedCurAttr = this._terminal.curAttr
                        }, e.prototype.restoreCursor = function (e) {
                            this._terminal.buffer.x = this._terminal.buffer.savedX || 0,
                                this._terminal.buffer.y = this._terminal.buffer.savedY || 0,
                                this._terminal.curAttr =
                                this._terminal.buffer.savedCurAttr || C.DEFAULT_ATTR
                        }, e.prototype.setTitle = function (e) {
                            this._terminal.handleTitle(e)
                        }, e.prototype.nextLine = function () {
                            this._terminal.buffer.x = 0, this.index()
                        }, e.prototype.keypadApplicationMode = function () {
                            this._terminal.log('Serial port requested application keypad.'),
                                this._terminal.applicationKeypad = !0,
                                this._terminal.viewport &&
                                this._terminal.viewport.syncScrollArea()
                        }, e.prototype.keypadNumericMode = function () {
                            this._terminal.log('Switching back to normal keypad.'),
                                this._terminal.applicationKeypad = !1,
                                this._terminal.viewport &&
                                this._terminal.viewport.syncScrollArea()
                        }, e.prototype.selectDefaultCharset = function () {
                            this._terminal.setgLevel(0),
                                this._terminal.setgCharset(0, l.DEFAULT_CHARSET)
                        }, e.prototype.selectCharset = function (e) {
                            if (2 !== e.length) return this.selectDefaultCharset();
                            '/' !== e[0] &&
                                this._terminal.setgCharset(
                                    c[e[0]], l.CHARSETS[e[1]] || l.DEFAULT_CHARSET)
                        }, e.prototype.index = function () {
                            this._terminal.index()
                        }, e.prototype.tabSet = function () {
                            this._terminal.tabSet()
                        }, e.prototype.reverseIndex = function () {
                            this._terminal.reverseIndex()
                        }, e.prototype.reset = function () {
                            this._parser.reset(), this._terminal.reset()
                        }, e.prototype.setgLevel = function (e) {
                            this._terminal.setgLevel(e)
                        }, e
                    }(s.Disposable);
                i.InputHandler = _
            },
            {
                './Buffer': 2,
                './CharWidth': 6,
                './EscapeSequenceParser': 8,
                './common/Lifecycle': 20,
                './common/TypedArrayUtils': 21,
                './common/data/EscapeSequences': 22,
                './core/data/Charsets': 24,
                './core/input/TextDecoder': 26
            }
        ],
        10: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var u = e('./ui/MouseZoneManager'), s = e('./common/EventEmitter'),
                    f = e('./Buffer'), _ = e('./CharWidth'), o = function (i) {
                        function a(e) {
                            var t = i.call(this) || this;
                            return t._terminal = e, t._linkMatchers = [],
                                t._nextLinkMatcherId = 0,
                                t._rowsToLinkify = { start: null, end: null }, t
                        }
                        return n(a, i), a.prototype.attachToDom = function (e) {
                            this._mouseZoneManager = e
                        }, a.prototype.linkifyRows = function (e, t) {
                            var i = this;
                            this._mouseZoneManager &&
                                (null === this._rowsToLinkify.start ?
                                    (this._rowsToLinkify.start = e,
                                        this._rowsToLinkify.end = t) :
                                    (this._rowsToLinkify.start =
                                        Math.min(this._rowsToLinkify.start, e),
                                        this._rowsToLinkify.end =
                                        Math.max(this._rowsToLinkify.end, t)),
                                    this._mouseZoneManager.clearAll(e, t),
                                    this._rowsTimeoutId && clearTimeout(this._rowsTimeoutId),
                                    this._rowsTimeoutId = setTimeout(function () {
                                        return i._linkifyRows()
                                    }, a.TIME_BEFORE_LINKIFY))
                        }, a.prototype._linkifyRows = function () {
                            this._rowsTimeoutId = null;
                            var e = this._terminal.buffer,
                                t = e.ydisp + this._rowsToLinkify.start;
                            if (!(t >= e.lines.length)) {
                                for (var i = e.ydisp +
                                    Math.min(
                                        this._rowsToLinkify.end, this._terminal.rows) +
                                    1,
                                    r = Math.ceil(
                                        a.OVERSCAN_CHAR_LIMIT / this._terminal.cols),
                                    n = this._terminal.buffer.iterator(!1, t, i, r, r);
                                    n.hasNext();)
                                    for (var s = n.next(), o = 0; o < this._linkMatchers.length;
                                        o++)
                                        this._doLinkifyRow(
                                            s.range.first, s.content, this._linkMatchers[o]);
                                this._rowsToLinkify.start = null,
                                    this._rowsToLinkify.end = null
                            }
                        }, a.prototype.registerLinkMatcher = function (e, t, i) {
                            if (void 0 === i && (i = {}), !t)
                                throw new Error('handler must be defined');
                            var r = {
                                id: this._nextLinkMatcherId++,
                                regex: e,
                                handler: t,
                                matchIndex: i.matchIndex,
                                validationCallback: i.validationCallback,
                                hoverTooltipCallback: i.tooltipCallback,
                                hoverLeaveCallback: i.leaveCallback,
                                willLinkActivate: i.willLinkActivate,
                                priority: i.priority || 0
                            };
                            return this._addLinkMatcherToList(r), r.id
                        }, a.prototype._addLinkMatcherToList = function (e) {
                            if (0 !== this._linkMatchers.length) {
                                for (var t = this._linkMatchers.length - 1; 0 <= t; t--)
                                    if (e.priority <= this._linkMatchers[t].priority)
                                        return void this._linkMatchers.splice(t + 1, 0, e);
                                this._linkMatchers.splice(0, 0, e)
                            } else
                                this._linkMatchers.push(e)
                        }, a.prototype.deregisterLinkMatcher = function (e) {
                            for (var t = 0; t < this._linkMatchers.length; t++)
                                if (this._linkMatchers[t].id === e)
                                    return this._linkMatchers.splice(t, 1), !0;
                            return !1
                        }, a.prototype._doLinkifyRow = function (s, o, a) {
                            for (
                                var l,
                                h = this,
                                c = new RegExp(a.regex.source, a.regex.flags + 'g'), u = -1,
                                e =
                                    function () {
                                        var t =
                                            l['number' != typeof a.matchIndex ? 0 :
                                                a.matchIndex];
                                        if (!t) {
                                            if (_._terminal.debug)
                                                throw console.log({ match: l, matcher: a }),
                                                new Error(
                                                    'match found without corresponding matchIndex');
                                            return 'break'
                                        }
                                        if (u = o.indexOf(t, u + 1),
                                            c.lastIndex = u + t.length, u < 0)
                                            return 'break';
                                        var i =
                                            _._terminal.buffer.stringIndexToBufferIndex(s, u);
                                        if (i[0] < 0) return 'break';
                                        var r,
                                            e = _._terminal.buffer.lines.get(i[0]).get(i[1]);
                                        if (e) {
                                            var n = e[f.CHAR_DATA_ATTR_INDEX];
                                            r = n >> 9 & 511
                                        }
                                        a.validationCallback ?
                                            a.validationCallback(
                                                t,
                                                function (e) {
                                                    h._rowsTimeoutId ||
                                                        e &&
                                                        h._addLink(
                                                            i[1],
                                                            i[0] - h._terminal.buffer.ydisp,
                                                            t, a, r)
                                                }) :
                                            _._addLink(
                                                i[1], i[0] - _._terminal.buffer.ydisp, t, a,
                                                r)
                                    },
                                _ = this;
                                null !== (l = c.exec(o));) {
                                if ('break' === e()) break
                            }
                        }, a.prototype._addLink = function (e, t, i, r, n) {
                            var s = this, o = _.getStringCellWidth(i),
                                a = e % this._terminal.cols,
                                l = t + Math.floor(e / this._terminal.cols),
                                h = (a + o) % this._terminal.cols,
                                c = l + Math.floor((a + o) / this._terminal.cols);
                            0 === h && (h = this._terminal.cols, c--),
                                this._mouseZoneManager.add(new u.MouseZone(
                                    a + 1, l + 1, h + 1, c + 1,
                                    function (e) {
                                        if (r.handler) return r.handler(e, i);
                                        window.open(i, '_blank')
                                    },
                                    function (e) {
                                        s.emit(
                                            'linkhover',
                                            s._createLinkHoverEvent(a, l, h, c, n)),
                                            s._terminal.element.classList.add(
                                                'xterm-cursor-pointer')
                                    },
                                    function (e) {
                                        s.emit(
                                            'linktooltip',
                                            s._createLinkHoverEvent(a, l, h, c, n)),
                                            r.hoverTooltipCallback &&
                                            r.hoverTooltipCallback(e, i)
                                    },
                                    function () {
                                        s.emit(
                                            'linkleave',
                                            s._createLinkHoverEvent(a, l, h, c, n)),
                                            s._terminal.element.classList.remove(
                                                'xterm-cursor-pointer'),
                                            r.hoverLeaveCallback && r.hoverLeaveCallback()
                                    },
                                    function (e) {
                                        return !r.willLinkActivate || r.willLinkActivate(e, i)
                                    }))
                        }, a.prototype._createLinkHoverEvent = function (e, t, i, r, n) {
                            return {
                                x1: e, y1: t, x2: i, y2: r, cols: this._terminal.cols, fg: n
                            }
                        }, a.TIME_BEFORE_LINKIFY = 200, a.OVERSCAN_CHAR_LIMIT = 2e3, a
                    }(s.EventEmitter);
                i.Linkifier = o
            },
            {
                './Buffer': 2,
                './CharWidth': 6,
                './common/EventEmitter': 19,
                './ui/MouseZoneManager': 53
            }
        ],
        11: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = e('./ui/MouseHelper'), a = e('./core/Platform'),
                    o = e('./common/EventEmitter'), l = e('./SelectionModel'),
                    L = e('./Buffer'), h = e('./handlers/AltClickHandler'),
                    c = String.fromCharCode(160), u = new RegExp(c, 'g'),
                    _ = function (r) {
                        function e(e, t) {
                            var i = r.call(this) || this;
                            return i._terminal = e, i._charMeasure = t, i._enabled = !0,
                                i._initListeners(), i.enable(),
                                i._model = new l.SelectionModel(e),
                                i._activeSelectionMode = 0, i
                        }
                        return n(e, r),
                            e.prototype
                                .dispose =
                            function () {
                                r.prototype.dispose.call(this),
                                    this._removeMouseDownListeners()
                            },
                            Object.defineProperty(e.prototype, '_buffer', {
                                get: function () {
                                    return this._terminal.buffers.active
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            e.prototype._initListeners =
                            function () {
                                var t = this;
                                this._mouseMoveListener = function (e) {
                                    return t._onMouseMove(e)
                                }, this._mouseUpListener = function (e) {
                                    return t._onMouseUp(e)
                                }, this._trimListener = function (e) {
                                    return t._onTrim(e)
                                }, this.initBuffersListeners()
                            },
                            e.prototype.initBuffersListeners =
                            function () {
                                var t = this;
                                this._terminal.buffer.lines.on('trim', this._trimListener),
                                    this._terminal.buffers.on('activate', function (e) {
                                        return t._onBufferActivate(e)
                                    })
                            },
                            e.prototype.disable =
                            function () {
                                this.clearSelection(), this._enabled = !1
                            },
                            e.prototype.enable =
                            function () {
                                this._enabled = !0
                            },
                            Object.defineProperty(e.prototype, 'selectionStart', {
                                get: function () {
                                    return this._model.finalSelectionStart
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            Object.defineProperty(e.prototype, 'selectionEnd', {
                                get: function () {
                                    return this._model.finalSelectionEnd
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            Object.defineProperty(e.prototype, 'hasSelection', {
                                get: function () {
                                    var e = this._model.finalSelectionStart,
                                        t = this._model.finalSelectionEnd;
                                    return !(!e || !t) && (e[0] !== t[0] || e[1] !== t[1])
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            Object.defineProperty(e.prototype, 'selectionText', {
                                get: function () {
                                    var e = this._model.finalSelectionStart,
                                        t = this._model.finalSelectionEnd;
                                    if (!e || !t) return '';
                                    var i = [];
                                    if (3 === this._activeSelectionMode) {
                                        if (e[0] === t[0]) return '';
                                        for (var r = e[1]; r <= t[1]; r++) {
                                            var n = this._buffer.translateBufferLineToString(
                                                r, !0, e[0], t[0]);
                                            i.push(n)
                                        }
                                    } else {
                                        var s = e[1] === t[1] ? t[0] : void 0;
                                        i.push(this._buffer.translateBufferLineToString(
                                            e[1], !0, e[0], s));
                                        for (r = e[1] + 1; r <= t[1] - 1; r++) {
                                            var o = this._buffer.lines.get(r);
                                            n = this._buffer.translateBufferLineToString(r, !0);
                                            o.isWrapped ? i[i.length - 1] += n : i.push(n)
                                        }
                                        if (e[1] !== t[1]) {
                                            o = this._buffer.lines.get(t[1]),
                                                n = this._buffer.translateBufferLineToString(
                                                    t[1], !0, 0, t[0]);
                                            o.isWrapped ? i[i.length - 1] += n : i.push(n)
                                        }
                                    }
                                    return i
                                        .map(function (e) {
                                            return e.replace(u, ' ')
                                        })
                                        .join(a.isMSWindows ? '\r\n' : '\n')
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            e.prototype.clearSelection =
                            function () {
                                this._model.clearSelection(), this._removeMouseDownListeners(),
                                    this.refresh()
                            },
                            e.prototype.refresh =
                            function (e) {
                                var t = this;
                                (this._refreshAnimationFrame ||
                                    (this._refreshAnimationFrame =
                                        window.requestAnimationFrame(function () {
                                            return t._refresh()
                                        })),
                                    a.isLinux && e) &&
                                    (this.selectionText.length &&
                                        this.emit('newselection', this.selectionText))
                            },
                            e.prototype._refresh =
                            function () {
                                this._refreshAnimationFrame = null, this.emit('refresh', {
                                    start: this._model.finalSelectionStart,
                                    end: this._model.finalSelectionEnd,
                                    columnSelectMode: 3 === this._activeSelectionMode
                                })
                            },
                            e.prototype.isClickInSelection =
                            function (e) {
                                var t = this._getMouseBufferCoords(e),
                                    i = this._model.finalSelectionStart,
                                    r = this._model.finalSelectionEnd;
                                return !(!i || !r) && this._areCoordsInSelection(t, i, r)
                            },
                            e.prototype._areCoordsInSelection =
                            function (e, t, i) {
                                return e[1] > t[1] && e[1] < i[1] ||
                                    t[1] === i[1] && e[1] === t[1] && e[0] >= t[0] &&
                                    e[0] < i[0] ||
                                    t[1] < i[1] && e[1] === i[1] && e[0] < i[0] ||
                                    t[1] < i[1] && e[1] === t[1] && e[0] >= t[0]
                            },
                            e.prototype.selectWordAtCursor =
                            function (e) {
                                var t = this._getMouseBufferCoords(e);
                                t &&
                                    (this._selectWordAt(t, !1), this._model.selectionEnd = null,
                                        this.refresh(!0))
                            },
                            e.prototype.selectAll =
                            function () {
                                this._model.isSelectAllActive = !0, this.refresh(),
                                    this._terminal.emit('selection')
                            },
                            e.prototype.selectLines =
                            function (e, t) {
                                this._model.clearSelection(),
                                    e = Math.max(e, 0),
                                    t = Math.min(t, this._terminal.buffer.lines.length - 1),
                                    this._model.selectionStart = [0, e],
                                    this._model.selectionEnd = [this._terminal.cols, t],
                                    this.refresh(), this._terminal.emit('selection')
                            },
                            e.prototype._onTrim =
                            function (e) {
                                this._model.onTrim(e) && this.refresh()
                            },
                            e.prototype._getMouseBufferCoords =
                            function (e) {
                                var t = this._terminal.mouseHelper.getCoords(
                                    e, this._terminal.screenElement, this._charMeasure,
                                    this._terminal.cols, this._terminal.rows, !0);
                                return t ?
                                    (t[0]-- , t[1]-- , t[1] += this._terminal.buffer.ydisp, t) :
                                    null
                            },
                            e.prototype._getMouseEventScrollAmount =
                            function (e) {
                                var t = s.MouseHelper.getCoordsRelativeToElement(
                                    e, this._terminal.screenElement)[1],
                                    i = this._terminal.rows *
                                        Math.ceil(
                                            this._charMeasure.height *
                                            this._terminal.options.lineHeight);
                                return 0 <= t && t <= i ?
                                    0 :
                                    (i < t && (t -= i), t = Math.min(Math.max(t, -50), 50),
                                        (t /= 50) / Math.abs(t) + Math.round(14 * t))
                            },
                            e.prototype.shouldForceSelection =
                            function (e) {
                                return a.isMac ? e.altKey &&
                                    this._terminal.options.macOptionClickForcesSelection :
                                    e.shiftKey
                            },
                            e.prototype.onMouseDown =
                            function (e) {
                                if (this._mouseDownTimeStamp = e.timeStamp,
                                    (2 !== e.button || !this.hasSelection) && 0 === e.button) {
                                    if (!this._enabled) {
                                        if (!this.shouldForceSelection(e)) return;
                                        e.stopPropagation()
                                    }
                                    e.preventDefault(), this._dragScrollAmount = 0,
                                        this._enabled && e.shiftKey ?
                                            this._onIncrementalClick(e) :
                                            1 === e.detail ?
                                                this._onSingleClick(e) :
                                                2 === e.detail ? this._onDoubleClick(e) :
                                                    3 === e.detail && this._onTripleClick(e),
                                        this._addMouseDownListeners(),
                                        this.refresh(!0)
                                }
                            },
                            e.prototype._addMouseDownListeners =
                            function () {
                                var e = this;
                                this._terminal.element.ownerDocument.addEventListener(
                                    'mousemove', this._mouseMoveListener),
                                    this._terminal.element.ownerDocument.addEventListener(
                                        'mouseup', this._mouseUpListener),
                                    this._dragScrollIntervalTimer = setInterval(function () {
                                        return e._dragScroll()
                                    }, 50)
                            },
                            e.prototype._removeMouseDownListeners =
                            function () {
                                this._terminal.element.ownerDocument &&
                                    (this._terminal.element.ownerDocument.removeEventListener(
                                        'mousemove', this._mouseMoveListener),
                                        this._terminal.element.ownerDocument.removeEventListener(
                                            'mouseup', this._mouseUpListener)),
                                    clearInterval(this._dragScrollIntervalTimer),
                                    this._dragScrollIntervalTimer = null
                            },
                            e.prototype._onIncrementalClick =
                            function (e) {
                                this._model.selectionStart &&
                                    (this._model.selectionEnd = this._getMouseBufferCoords(e))
                            },
                            e.prototype._onSingleClick =
                            function (e) {
                                if (this._model.selectionStartLength = 0,
                                    this._model.isSelectAllActive = !1,
                                    this._activeSelectionMode =
                                    this.shouldColumnSelect(e) ? 3 : 0,
                                    this._model.selectionStart = this._getMouseBufferCoords(e),
                                    this._model.selectionStart) {
                                    this._model.selectionEnd = null;
                                    var t = this._buffer.lines.get(this._model.selectionStart[1]);
                                    if (t)
                                        if (!(t.length >= this._model.selectionStart[0]))
                                            0 ===
                                                t.get(this._model.selectionStart[0])
                                                [L.CHAR_DATA_WIDTH_INDEX] &&
                                                this._model.selectionStart[0]++
                                }
                            },
                            e.prototype._onDoubleClick =
                            function (e) {
                                var t = this._getMouseBufferCoords(e);
                                t && (this._activeSelectionMode = 1, this._selectWordAt(t, !0))
                            },
                            e.prototype._onTripleClick =
                            function (e) {
                                var t = this._getMouseBufferCoords(e);
                                t && (this._activeSelectionMode = 2, this._selectLineAt(t[1]))
                            },
                            e.prototype.shouldColumnSelect =
                            function (e) {
                                return e.altKey &&
                                    !(a.isMac &&
                                        this._terminal.options.macOptionClickForcesSelection)
                            },
                            e.prototype._onMouseMove =
                            function (e) {
                                e.stopImmediatePropagation();
                                var t = this._model.selectionEnd ?
                                    [this._model.selectionEnd[0], this._model.selectionEnd[1]] :
                                    null;
                                if (this._model.selectionEnd = this._getMouseBufferCoords(e),
                                    this._model.selectionEnd) {
                                    if (2 === this._activeSelectionMode ?
                                        this._model.selectionEnd[1] <
                                            this._model.selectionStart[1] ?
                                            this._model.selectionEnd[0] = 0 :
                                            this._model.selectionEnd[0] = this._terminal.cols :
                                        1 === this._activeSelectionMode &&
                                        this._selectToWordAt(this._model.selectionEnd),
                                        this._dragScrollAmount =
                                        this._getMouseEventScrollAmount(e),
                                        3 !== this._activeSelectionMode &&
                                        (0 < this._dragScrollAmount ?
                                            this._model.selectionEnd[0] =
                                            this._terminal.cols :
                                            this._dragScrollAmount < 0 &&
                                            (this._model.selectionEnd[0] = 0)),
                                        this._model.selectionEnd[1] < this._buffer.lines.length) {
                                        var i = this._buffer.lines.get(this._model.selectionEnd[1])
                                            .get(this._model.selectionEnd[0]);
                                        i && 0 === i[L.CHAR_DATA_WIDTH_INDEX] &&
                                            this._model.selectionEnd[0]++
                                    }
                                    t && t[0] === this._model.selectionEnd[0] &&
                                        t[1] === this._model.selectionEnd[1] ||
                                        this.refresh(!0)
                                } else
                                    this.refresh(!0)
                            },
                            e.prototype._dragScroll =
                            function () {
                                this._dragScrollAmount &&
                                    (this._terminal.scrollLines(this._dragScrollAmount, !1),
                                        0 < this._dragScrollAmount ?
                                            (3 !== this._activeSelectionMode &&
                                                (this._model.selectionEnd[0] =
                                                    this._terminal.cols),
                                                this._model.selectionEnd[1] = Math.min(
                                                    this._terminal.buffer.ydisp + this._terminal.rows,
                                                    this._terminal.buffer.lines.length - 1)) :
                                            (3 !== this._activeSelectionMode &&
                                                (this._model.selectionEnd[0] = 0),
                                                this._model.selectionEnd[1] =
                                                this._terminal.buffer.ydisp),
                                        this.refresh())
                            },
                            e.prototype._onMouseUp =
                            function (e) {
                                var t = e.timeStamp - this._mouseDownTimeStamp;
                                this._removeMouseDownListeners(),
                                    this.selectionText.length <= 1 && t < 500 ?
                                        new h.AltClickHandler(e, this._terminal).move() :
                                        this.hasSelection && this._terminal.emit('selection')
                            },
                            e.prototype._onBufferActivate =
                            function (e) {
                                this.clearSelection(),
                                    e.inactiveBuffer.lines.off('trim', this._trimListener),
                                    e.activeBuffer.lines.on('trim', this._trimListener)
                            },
                            e.prototype._convertViewportColToCharacterIndex = function (e, t) {
                                for (var i = t[0], r = 0; t[0] >= r; r++) {
                                    var n = e.get(r);
                                    0 === n[L.CHAR_DATA_WIDTH_INDEX] ?
                                        i-- :
                                        1 < n[L.CHAR_DATA_CHAR_INDEX].length && t[0] !== r &&
                                        (i += n[L.CHAR_DATA_CHAR_INDEX].length - 1)
                                }
                                return i
                            }, e.prototype.setSelection = function (e, t, i) {
                                this._model.clearSelection(), this._removeMouseDownListeners(),
                                    this._model.selectionStart = [e, t],
                                    this._model.selectionStartLength = i, this.refresh()
                            }, e.prototype._getWordAt = function (e, t, i, r) {
                                if (void 0 === i && (i = !0), void 0 === r && (r = !0),
                                    e[0] >= this._terminal.cols)
                                    return null;
                                var n = this._buffer.lines.get(e[1]);
                                if (!n) return null;
                                var s = this._buffer.translateBufferLineToString(e[1], !1),
                                    o = this._convertViewportColToCharacterIndex(n, e), a = o,
                                    l = e[0] - o, h = 0, c = 0, u = 0, _ = 0;
                                if (' ' === s.charAt(o)) {
                                    for (; 0 < o && ' ' === s.charAt(o - 1);) o--;
                                    for (; a < s.length && ' ' === s.charAt(a + 1);) a++
                                } else {
                                    var f = e[0], d = e[0];
                                    for (0 === n.get(f)[L.CHAR_DATA_WIDTH_INDEX] && (h++ , f--),
                                        2 === n.get(d)[L.CHAR_DATA_WIDTH_INDEX] && (c++ , d++),
                                        1 < n.get(d)[L.CHAR_DATA_CHAR_INDEX].length &&
                                        (_ += n.get(d)[L.CHAR_DATA_CHAR_INDEX].length - 1,
                                            a += n.get(d)[L.CHAR_DATA_CHAR_INDEX].length - 1);
                                        0 < f && 0 < o &&
                                        !this._isCharWordSeparator(n.get(f - 1));) {
                                        0 === (p = n.get(f - 1))[L.CHAR_DATA_WIDTH_INDEX] ?
                                            (h++ , f--) :
                                            1 < p[L.CHAR_DATA_CHAR_INDEX].length &&
                                            (u += p[L.CHAR_DATA_CHAR_INDEX].length - 1,
                                                o -= p[L.CHAR_DATA_CHAR_INDEX].length - 1),
                                            o-- , f--
                                    }
                                    for (; d < n.length && a + 1 < s.length &&
                                        !this._isCharWordSeparator(n.get(d + 1));) {
                                        var p;
                                        2 === (p = n.get(d + 1))[L.CHAR_DATA_WIDTH_INDEX] ?
                                            (c++ , d++) :
                                            1 < p[L.CHAR_DATA_CHAR_INDEX].length &&
                                            (_ += p[L.CHAR_DATA_CHAR_INDEX].length - 1,
                                                a += p[L.CHAR_DATA_CHAR_INDEX].length - 1),
                                            a++ , d++
                                    }
                                }
                                a++;
                                var m = o + l - h + u,
                                    y = Math.min(this._terminal.cols, a - o + h + c - u - _);
                                if (!t && '' === s.slice(o, a).trim()) return null;
                                if (i && 0 === m && 32 !== n.get(0)[L.CHAR_DATA_CODE_INDEX]) {
                                    var C = this._buffer.lines.get(e[1] - 1);
                                    if (C && n.isWrapped &&
                                        32 !==
                                        C.get(
                                            this._terminal.cols -
                                            1)[L.CHAR_DATA_CODE_INDEX]) {
                                        var g = this._getWordAt(
                                            [this._terminal.cols - 1, e[1] - 1], !1, !0, !1);
                                        if (g) {
                                            var v = this._terminal.cols - g.start;
                                            m -= v, y += v
                                        }
                                    }
                                }
                                if (r && m + y === this._terminal.cols &&
                                    32 !==
                                    n.get(
                                        this._terminal.cols - 1)[L.CHAR_DATA_CODE_INDEX]) {
                                    var b = this._buffer.lines.get(e[1] + 1);
                                    if (b && b.isWrapped &&
                                        32 !== b.get(0)[L.CHAR_DATA_CODE_INDEX]) {
                                        var w = this._getWordAt([0, e[1] + 1], !1, !1, !0);
                                        w && (y += w.length)
                                    }
                                }
                                return {
                                    start: m, length: y
                                }
                            }, e.prototype._selectWordAt = function (e, t) {
                                var i = this._getWordAt(e, t);
                                if (i) {
                                    for (; i.start < 0;) i.start += this._terminal.cols, e[1]--;
                                    this._model.selectionStart = [i.start, e[1]],
                                        this._model.selectionStartLength = i.length
                                }
                            }, e.prototype._selectToWordAt = function (e) {
                                var t = this._getWordAt(e, !0);
                                if (t) {
                                    for (var i = e[1]; t.start < 0;)
                                        t.start += this._terminal.cols, i--;
                                    if (!this._model.areSelectionValuesReversed())
                                        for (; t.start + t.length > this._terminal.cols;)
                                            t.length -= this._terminal.cols, i++;
                                    this._model.selectionEnd = [
                                        this._model.areSelectionValuesReversed() ?
                                            t.start :
                                            t.start + t.length,
                                        i
                                    ]
                                }
                            }, e.prototype._isCharWordSeparator = function (e) {
                                return 0 !== e[L.CHAR_DATA_WIDTH_INDEX] &&
                                    0 <= ' ()[]{}\'"'.indexOf(e[L.CHAR_DATA_CHAR_INDEX])
                            }, e.prototype._selectLineAt = function (e) {
                                var t = this._buffer.getWrappedRangeForLine(e);
                                this._model.selectionStart = [0, t.first],
                                    this._model.selectionEnd = [this._terminal.cols, t.last],
                                    this._model.selectionStartLength = 0
                            }, e
                    }(o.EventEmitter);
                i.SelectionManager = _
            },
            {
                './Buffer': 2,
                './SelectionModel': 12,
                './common/EventEmitter': 19,
                './core/Platform': 23,
                './handlers/AltClickHandler': 27,
                './ui/MouseHelper': 52
            }
        ],
        12: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = function () {
                    function e(e) {
                        this._terminal = e, this.clearSelection()
                    }
                    return e.prototype
                        .clearSelection =
                        function () {
                            this.selectionStart = null, this.selectionEnd = null,
                                this.isSelectAllActive = !1, this.selectionStartLength = 0
                        },
                        Object.defineProperty(e.prototype, 'finalSelectionStart', {
                            get: function () {
                                return this.isSelectAllActive ?
                                    [0, 0] :
                                    this.selectionEnd && this.selectionStart &&
                                        this.areSelectionValuesReversed() ?
                                        this.selectionEnd :
                                        this.selectionStart
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        Object.defineProperty(e.prototype, 'finalSelectionEnd', {
                            get: function () {
                                if (this.isSelectAllActive)
                                    return [
                                        this._terminal.cols,
                                        this._terminal.buffer.ybase + this._terminal.rows - 1
                                    ];
                                if (!this.selectionStart) return null;
                                if (this.selectionEnd && !this.areSelectionValuesReversed())
                                    return this.selectionStartLength &&
                                        this.selectionEnd[1] === this.selectionStart[1] ?
                                        [
                                            Math.max(
                                                this.selectionStart[0] + this.selectionStartLength,
                                                this.selectionEnd[0]),
                                            this.selectionEnd[1]
                                        ] :
                                        this.selectionEnd;
                                var e = this.selectionStart[0] + this.selectionStartLength;
                                return e > this._terminal.cols ?
                                    [
                                        e % this._terminal.cols,
                                        this.selectionStart[1] + Math.floor(e / this._terminal.cols)
                                    ] :
                                    [e, this.selectionStart[1]]
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        e.prototype.areSelectionValuesReversed = function () {
                            var e = this.selectionStart, t = this.selectionEnd;
                            return !(!e || !t) && (e[1] > t[1] || e[1] === t[1] && e[0] > t[0])
                        }, e.prototype.onTrim = function (e) {
                            return this.selectionStart && (this.selectionStart[1] -= e),
                                this.selectionEnd && (this.selectionEnd[1] -= e),
                                this.selectionEnd && this.selectionEnd[1] < 0 ?
                                    (this.clearSelection(), !0) :
                                    (this.selectionStart && this.selectionStart[1] < 0 &&
                                        (this.selectionStart[1] = 0),
                                        !1)
                        }, e
                }();
                i.SelectionModel = r
            },
            {}
        ],
        13: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 }),
                    i.DEFAULT_BELL_SOUND =
                    'data:audio/wav;base64,UklGRigBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQBAADpAFgCwAMlBZoG/wdmCcoKRAypDQ8PbRDBEQQTOxRtFYcWlBePGIUZXhoiG88bcBz7HHIdzh0WHlMeZx51HmkeUx4WHs8dah0AHXwc3hs9G4saxRnyGBIYGBcQFv8U4RPAEoYRQBACD70NWwwHC6gJOwjWBloF7gOBAhABkf8b/qv8R/ve+Xf4Ife79W/0JfPZ8Z/wde9N7ijtE+wU6xvqM+lb6H7nw+YX5mrlxuQz5Mzje+Ma49fioeKD4nXiYeJy4pHitOL04j/jn+MN5IPkFOWs5U3mDefM55/ogOl36m7rdOyE7abuyu8D8Unyj/Pg9D/2qfcb+Yn6/vuK/Qj/lAAlAg==';
                var r = function () {
                    function r(e) {
                        this._terminal = e
                    }
                    return Object.defineProperty(r, 'audioContext', {
                        get: function () {
                            if (!r._audioContext) {
                                var e = window.AudioContext || window.webkitAudioContext;
                                if (!e)
                                    return console.warn(
                                        'Web Audio API is not supported by this browser. Consider upgrading to the latest version'),
                                        null;
                                r._audioContext = new e
                            }
                            return r._audioContext
                        },
                        enumerable: !0,
                        configurable: !0
                    }),
                        r.prototype.playBellSound = function () {
                            var t = r.audioContext;
                            if (t) {
                                var i = t.createBufferSource();
                                t.decodeAudioData(
                                    this._base64ToArrayBuffer(this._removeMimeType(
                                        this._terminal.options.bellSound)),
                                    function (e) {
                                        i.buffer = e, i.connect(t.destination), i.start(0)
                                    })
                            }
                        }, r.prototype._base64ToArrayBuffer = function (e) {
                            for (var t = window.atob(e), i = t.length,
                                r = new Uint8Array(i), n = 0;
                                n < i; n++)
                                r[n] = t.charCodeAt(n);
                            return r.buffer
                        }, r.prototype._removeMimeType = function (e) {
                            return e.split(',')[1]
                        }, r
                }();
                i.SoundManager = r
            },
            {}
        ],
        14: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 }),
                    i.blankLine = 'Blank line', i.promptLabel = 'Terminal input',
                    i.tooMuchOutput =
                    'Too much output to announce, navigate to rows manually to read'
            },
            {}
        ],
        15: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = e('./BufferSet'), o = e('./Buffer'),
                    a = e('./CompositionHelper'), l = e('./common/EventEmitter'),
                    h = e('./Viewport'), c = e('./ui/Clipboard'),
                    u = e('./common/data/EscapeSequences'), _ = e('./InputHandler'),
                    f = e('./renderer/Renderer'), d = e('./Linkifier'),
                    p = e('./SelectionManager'), m = e('./ui/CharMeasure'),
                    y = e('./core/Platform'), C = e('./ui/Lifecycle'),
                    g = e('./Strings'), v = e('./ui/MouseHelper'),
                    b = e('./SoundManager'), w = e('./renderer/ColorManager'),
                    L = e('./ui/MouseZoneManager'), E = e('./AccessibilityManager'),
                    S = e('./ui/ScreenDprMonitor'),
                    A = e('./renderer/atlas/CharAtlasCache'),
                    x = e('./renderer/dom/DomRenderer'), T = e('./core/input/Keyboard'),
                    R = e('./common/Clone'),
                    M = 'undefined' != typeof window ? window.document : null,
                    H = ['cols', 'rows'], D = {
                        cols: 80,
                        rows: 24,
                        convertEol: !1,
                        termName: 'xterm',
                        cursorBlink: !1,
                        cursorStyle: 'block',
                        bellSound: b.DEFAULT_BELL_SOUND,
                        bellStyle: 'none',
                        drawBoldTextInBrightColors: !0,
                        enableBold: !0,
                        experimentalCharAtlas: 'static',
                        fontFamily: 'courier-new, courier, monospace',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontWeightBold: 'bold',
                        lineHeight: 1,
                        letterSpacing: 0,
                        scrollback: 1e3,
                        screenKeys: !1,
                        screenReaderMode: !1,
                        debug: !1,
                        macOptionIsMeta: !1,
                        macOptionClickForcesSelection: !1,
                        cancelEvents: !1,
                        disableStdin: !1,
                        useFlowControl: !1,
                        allowTransparency: !1,
                        tabStopWidth: 8,
                        theme: null,
                        rightClickSelectsWord: y.isMac,
                        rendererType: 'canvas'
                    },
                    k = function (i) {
                        function e(e) {
                            void 0 === e && (e = {});
                            var t = i.call(this) || this;
                            return t.browser = y, t._blankLine = null,
                                t.options = R.clone(e), t._setup(), t
                        }
                        return n(e, i),
                            e.prototype
                                .dispose =
                            function () {
                                i.prototype.dispose.call(this),
                                    this._customKeyEventHandler = null,
                                    A.removeTerminalFromCache(this),
                                    this.handler = function () { },
                                    this.write = function () { },
                                    this.element && this.element.parentNode &&
                                    this.element.parentNode.removeChild(this.element)
                            },
                            e.prototype.destroy =
                            function () {
                                this.dispose()
                            },
                            e.prototype._setup =
                            function () {
                                var t = this;
                                Object.keys(D).forEach(function (e) {
                                    null !== t.options[e] && void 0 !== t.options[e] ||
                                        (t.options[e] = D[e])
                                }),
                                    this._parent = M ? M.body : null,
                                    this.cols = Math.max(this.options.cols, 2),
                                    this.rows = Math.max(this.options.rows, 1),
                                    this.options.handler &&
                                    this.on('data', this.options.handler),
                                    this.cursorState = 0, this.cursorHidden = !1,
                                    this._customKeyEventHandler = null,
                                    this.applicationKeypad = !1, this.applicationCursor = !1,
                                    this.originMode = !1, this.insertMode = !1,
                                    this.wraparoundMode = !0, this.bracketedPasteMode = !1,
                                    this.charset = null, this.gcharset = null, this.glevel = 0,
                                    this.charsets = [null], this.curAttr = o.DEFAULT_ATTR,
                                    this.params = [], this.currentParam = 0,
                                    this.writeBuffer = [], this._writeInProgress = !1,
                                    this._xoffSentToCatchUp = !1, this._userScrolling = !1,
                                    this._inputHandler = new _.InputHandler(this),
                                    this.register(this._inputHandler),
                                    this.renderer = this.renderer || null,
                                    this.selectionManager = this.selectionManager || null,
                                    this.linkifier = this.linkifier || new d.Linkifier(this),
                                    this._mouseZoneManager = this._mouseZoneManager || null,
                                    this.soundManager =
                                    this.soundManager || new b.SoundManager(this),
                                    this.buffers = new s.BufferSet(this),
                                    this.selectionManager &&
                                    (this.selectionManager.clearSelection(),
                                        this.selectionManager.initBuffersListeners())
                            },
                            Object.defineProperty(e.prototype, 'buffer', {
                                get: function () {
                                    return this.buffers.active
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            e.prototype.eraseAttr =
                            function () {
                                return -512 & o.DEFAULT_ATTR | 511 & this.curAttr
                            },
                            e.prototype.focus =
                            function () {
                                this.textarea && this.textarea.focus()
                            },
                            Object.defineProperty(e.prototype, 'isFocused', {
                                get: function () {
                                    return M.activeElement === this.textarea && M.hasFocus()
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            e.prototype.getOption =
                            function (e) {
                                if (!(e in D))
                                    throw new Error('No option with key "' + e + '"');
                                return this.options[e]
                            },
                            e.prototype.setOption =
                            function (e, t) {
                                if (!(e in D))
                                    throw new Error('No option with key "' + e + '"');
                                if (-1 !== H.indexOf(e) &&
                                    console.error(
                                        'Option "' + e +
                                        '" can only be set in the constructor'),
                                    this.options[e] !== t) {
                                    switch (e) {
                                        case 'bellStyle':
                                            t || (t = 'none');
                                            break;
                                        case 'cursorStyle':
                                            t || (t = 'block');
                                            break;
                                        case 'fontWeight':
                                            t || (t = 'normal');
                                            break;
                                        case 'fontWeightBold':
                                            t || (t = 'bold');
                                            break;
                                        case 'lineHeight':
                                            if (t < 1)
                                                return void console.warn(
                                                    e + ' cannot be less than 1, value: ' + t);
                                        case 'rendererType':
                                            t || (t = 'canvas');
                                            break;
                                        case 'tabStopWidth':
                                            if (t < 1)
                                                return void console.warn(
                                                    e + ' cannot be less than 1, value: ' + t);
                                            break;
                                        case 'theme':
                                            if (this.renderer) return void this._setTheme(t);
                                            break;
                                        case 'scrollback':
                                            if ((t = Math.min(t, o.MAX_BUFFER_SIZE)) < 0)
                                                return void console.warn(
                                                    e + ' cannot be less than 0, value: ' + t);
                                            if (this.options[e] !== t) {
                                                var i = this.rows + t;
                                                if (this.buffer.lines.length > i) {
                                                    var r = this.buffer.lines.length - i,
                                                        n = this.buffer.ydisp - r < 0;
                                                    this.buffer.lines.trimStart(r),
                                                        this.buffer.ybase =
                                                        Math.max(this.buffer.ybase - r, 0),
                                                        this.buffer.ydisp =
                                                        Math.max(this.buffer.ydisp - r, 0),
                                                        n && this.refresh(0, this.rows - 1)
                                                }
                                            }
                                    }
                                    switch (this.options[e] = t, e) {
                                        case 'fontFamily':
                                        case 'fontSize':
                                            this.renderer &&
                                                (this.renderer.clear(),
                                                    this.charMeasure.measure(this.options));
                                            break;
                                        case 'drawBoldTextInBrightColors':
                                        case 'experimentalCharAtlas':
                                        case 'enableBold':
                                        case 'letterSpacing':
                                        case 'lineHeight':
                                        case 'fontWeight':
                                        case 'fontWeightBold':
                                            this.renderer &&
                                                (this.renderer.clear(),
                                                    this.renderer.onResize(this.cols, this.rows),
                                                    this.refresh(0, this.rows - 1));
                                            break;
                                        case 'rendererType':
                                            this.renderer &&
                                                (this.unregister(this.renderer),
                                                    this.renderer.dispose(), this.renderer = null),
                                                this._setupRenderer(),
                                                this.renderer.onCharSizeChanged(),
                                                this._theme && this.renderer.setTheme(this._theme),
                                                this.mouseHelper.setRenderer(this.renderer);
                                            break;
                                        case 'scrollback':
                                            this.buffers.resize(this.cols, this.rows),
                                                this.viewport && this.viewport.syncScrollArea();
                                            break;
                                        case 'screenReaderMode':
                                            t ? this._accessibilityManager ||
                                                (this._accessibilityManager =
                                                    new E.AccessibilityManager(this)) :
                                                this._accessibilityManager &&
                                                (this._accessibilityManager.dispose(),
                                                    this._accessibilityManager = null);
                                            break;
                                        case 'tabStopWidth':
                                            this.buffers.setupTabStops()
                                    }
                                    this.renderer && this.renderer.onOptionsChanged()
                                }
                            },
                            e.prototype._onTextAreaFocus =
                            function (e) {
                                this.sendFocus && this.handler(u.C0.ESC + '[I'),
                                    this.updateCursorStyle(e),
                                    this.element.classList.add('focus'), this.showCursor(),
                                    this.emit('focus')
                            },
                            e.prototype.blur =
                            function () {
                                return this.textarea.blur()
                            },
                            e.prototype._onTextAreaBlur =
                            function () {
                                this.textarea.value = '',
                                    this.refresh(this.buffer.y, this.buffer.y),
                                    this.sendFocus && this.handler(u.C0.ESC + '[O'),
                                    this.element.classList.remove('focus'), this.emit('blur')
                            },
                            e.prototype._initGlobal =
                            function () {
                                var t = this;
                                this._bindKeys(),
                                    this.register(C.addDisposableDomListener(
                                        this.element, 'copy', function (e) {
                                            t.hasSelection() &&
                                                c.copyHandler(e, t, t.selectionManager)
                                        }));
                                var e = function (e) {
                                    return c.pasteHandler(e, t)
                                };
                                this.register(
                                    C.addDisposableDomListener(this.textarea, 'paste', e)),
                                    this.register(
                                        C.addDisposableDomListener(this.element, 'paste', e)),
                                    y.isFirefox ? this.register(C.addDisposableDomListener(
                                        this.element, 'mousedown',
                                        function (e) {
                                            2 === e.button &&
                                                c.rightClickHandler(
                                                    e, t, t.selectionManager,
                                                    t.options.rightClickSelectsWord)
                                        })) :
                                        this.register(C.addDisposableDomListener(
                                            this.element, 'contextmenu',
                                            function (e) {
                                                c.rightClickHandler(
                                                    e, t, t.selectionManager,
                                                    t.options.rightClickSelectsWord)
                                            })),
                                    y.isLinux &&
                                    this.register(C.addDisposableDomListener(
                                        this.element, 'auxclick', function (e) {
                                            1 === e.button && c.moveTextAreaUnderMouseCursor(e, t)
                                        }))
                            },
                            e.prototype._bindKeys =
                            function () {
                                var i = this, r = this;
                                this.register(C.addDisposableDomListener(
                                    this.element, 'keydown',
                                    function (e) {
                                        M.activeElement === this && r._keyDown(e)
                                    },
                                    !0)),
                                    this.register(C.addDisposableDomListener(
                                        this.element, 'keypress',
                                        function (e) {
                                            M.activeElement === this && r._keyPress(e)
                                        },
                                        !0)),
                                    this.register(C.addDisposableDomListener(
                                        this.element, 'keyup',
                                        function (e) {
                                            var t;
                                            16 !== (t = e).keyCode && 17 !== t.keyCode &&
                                                18 !== t.keyCode && i.focus(),
                                                r._keyUp(e)
                                        },
                                        !0)),
                                    this.register(C.addDisposableDomListener(
                                        this.textarea, 'keydown',
                                        function (e) {
                                            return i._keyDown(e)
                                        },
                                        !0)),
                                    this.register(C.addDisposableDomListener(
                                        this.textarea, 'keypress',
                                        function (e) {
                                            return i._keyPress(e)
                                        },
                                        !0)),
                                    this.register(C.addDisposableDomListener(
                                        this.textarea, 'compositionstart',
                                        function () {
                                            return i._compositionHelper.compositionstart()
                                        })),
                                    this.register(C.addDisposableDomListener(
                                        this.textarea, 'compositionupdate',
                                        function (e) {
                                            return i._compositionHelper.compositionupdate(e)
                                        })),
                                    this.register(C.addDisposableDomListener(
                                        this.textarea, 'compositionend',
                                        function () {
                                            return i._compositionHelper.compositionend()
                                        })),
                                    this.register(this.addDisposableListener(
                                        'refresh',
                                        function () {
                                            return i._compositionHelper
                                                .updateCompositionElements()
                                        })),
                                    this.register(
                                        this.addDisposableListener('refresh', function (e) {
                                            return i._queueLinkification(e.start, e.end)
                                        }))
                            },
                            e.prototype.open =
                            function (e) {
                                var t = this;
                                if (this._parent = e || this._parent, !this._parent)
                                    throw new Error('Terminal requires a parent element.');
                                this._context = this._parent.ownerDocument.defaultView,
                                    this._document = this._parent.ownerDocument,
                                    this._screenDprMonitor = new S.ScreenDprMonitor,
                                    this._screenDprMonitor.setListener(function () {
                                        return t.emit('dprchange', window.devicePixelRatio)
                                    }),
                                    this.register(this._screenDprMonitor),
                                    this.element = this._document.createElement('div'),
                                    this.element.dir = 'ltr',
                                    this.element.classList.add('terminal'),
                                    this.element.classList.add('xterm'),
                                    this.element.setAttribute('tabindex', '0'),
                                    this._parent.appendChild(this.element);
                                var i = M.createDocumentFragment();
                                this._viewportElement = M.createElement('div'),
                                    this._viewportElement.classList.add('xterm-viewport'),
                                    i.appendChild(this._viewportElement),
                                    this._viewportScrollArea = M.createElement('div'),
                                    this._viewportScrollArea.classList.add('xterm-scroll-area'),
                                    this._viewportElement.appendChild(this._viewportScrollArea),
                                    this.screenElement = M.createElement('div'),
                                    this.screenElement.classList.add('xterm-screen'),
                                    this._helperContainer = M.createElement('div'),
                                    this._helperContainer.classList.add('xterm-helpers'),
                                    this.screenElement.appendChild(this._helperContainer),
                                    i.appendChild(this.screenElement),
                                    this._mouseZoneManager = new L.MouseZoneManager(this),
                                    this.register(this._mouseZoneManager),
                                    this.register(this.addDisposableListener(
                                        'scroll',
                                        function () {
                                            return t._mouseZoneManager.clearAll()
                                        })),
                                    this.linkifier.attachToDom(this._mouseZoneManager),
                                    this.textarea = M.createElement('textarea'),
                                    this.textarea.classList.add('xterm-helper-textarea'),
                                    this.textarea.setAttribute('aria-label', g.promptLabel),
                                    this.textarea.setAttribute('aria-multiline', 'false'),
                                    this.textarea.setAttribute('autocorrect', 'off'),
                                    this.textarea.setAttribute('autocapitalize', 'off'),
                                    this.textarea.setAttribute('spellcheck', 'false'),
                                    this.textarea.tabIndex = 0,
                                    this.register(C.addDisposableDomListener(
                                        this.textarea, 'focus',
                                        function (e) {
                                            return t._onTextAreaFocus(e)
                                        })),
                                    this.register(C.addDisposableDomListener(
                                        this.textarea, 'blur',
                                        function () {
                                            return t._onTextAreaBlur()
                                        })),
                                    this._helperContainer.appendChild(this.textarea),
                                    this._compositionView = M.createElement('div'),
                                    this._compositionView.classList.add('composition-view'),
                                    this._compositionHelper = new a.CompositionHelper(
                                        this.textarea, this._compositionView, this),
                                    this._helperContainer.appendChild(this._compositionView),
                                    this.charMeasure = new m.CharMeasure(M, this._helperContainer),
                                    this.element.appendChild(i), this._setupRenderer(),
                                    this._theme = this.options.theme, this.options.theme = null,
                                    this.viewport = new h.Viewport(
                                        this, this._viewportElement, this._viewportScrollArea,
                                        this.charMeasure),
                                    this.viewport.onThemeChanged(this.renderer.colorManager.colors),
                                    this.register(this.viewport),
                                    this.register(this.addDisposableListener(
                                        'cursormove',
                                        function () {
                                            return t.renderer.onCursorMove()
                                        })),
                                    this.register(this.addDisposableListener(
                                        'resize',
                                        function () {
                                            return t.renderer.onResize(t.cols, t.rows)
                                        })),
                                    this.register(this.addDisposableListener(
                                        'blur',
                                        function () {
                                            return t.renderer.onBlur()
                                        })),
                                    this.register(this.addDisposableListener(
                                        'focus',
                                        function () {
                                            return t.renderer.onFocus()
                                        })),
                                    this.register(this.addDisposableListener(
                                        'dprchange',
                                        function () {
                                            return t.renderer.onWindowResize(window.devicePixelRatio)
                                        })),
                                    this.register(C.addDisposableDomListener(
                                        window, 'resize',
                                        function () {
                                            return t.renderer.onWindowResize(window.devicePixelRatio)
                                        })),
                                    this.register(this.charMeasure.addDisposableListener(
                                        'charsizechanged',
                                        function () {
                                            return t.renderer.onCharSizeChanged()
                                        })),
                                    this.register(this.renderer.addDisposableListener(
                                        'resize',
                                        function (e) {
                                            return t.viewport.syncScrollArea()
                                        })),
                                    this.selectionManager =
                                    new p.SelectionManager(this, this.charMeasure),
                                    this.register(C.addDisposableDomListener(
                                        this.element, 'mousedown',
                                        function (e) {
                                            return t.selectionManager.onMouseDown(e)
                                        })),
                                    this.register(this.selectionManager.addDisposableListener(
                                        'refresh',
                                        function (e) {
                                            return t.renderer.onSelectionChanged(
                                                e.start, e.end, e.columnSelectMode)
                                        })),
                                    this.register(this.selectionManager.addDisposableListener(
                                        'newselection',
                                        function (e) {
                                            t.textarea.value = e, t.textarea.focus(),
                                                t.textarea.select()
                                        })),
                                    this.register(this.addDisposableListener(
                                        'scroll',
                                        function () {
                                            t.viewport.syncScrollArea(), t.selectionManager.refresh()
                                        })),
                                    this.register(C.addDisposableDomListener(
                                        this._viewportElement, 'scroll',
                                        function () {
                                            return t.selectionManager.refresh()
                                        })),
                                    this.mouseHelper = new v.MouseHelper(this.renderer),
                                    this.element.classList.toggle(
                                        'enable-mouse-events', this.mouseEvents),
                                    this.mouseEvents ? this.selectionManager.disable() :
                                        this.selectionManager.enable(),
                                    this.options.screenReaderMode &&
                                    (this._accessibilityManager =
                                        new E.AccessibilityManager(this)),
                                    this.charMeasure.measure(this.options),
                                    this.refresh(0, this.rows - 1), this._initGlobal(),
                                    this.bindMouse()
                            },
                            e.prototype._setupRenderer =
                            function () {
                                switch (this.options.rendererType) {
                                    case 'canvas':
                                        this.renderer = new f.Renderer(this, this.options.theme);
                                        break;
                                    case 'dom':
                                        this.renderer = new x.DomRenderer(this, this.options.theme);
                                        break;
                                    default:
                                        throw new Error(
                                            'Unrecognized rendererType "' +
                                            this.options.rendererType + '"')
                                }
                                this.register(this.renderer)
                            },
                            e.prototype._setTheme =
                            function (e) {
                                this._theme = e;
                                var t = this.renderer.setTheme(e);
                                this.viewport && this.viewport.onThemeChanged(t)
                            },
                            e.prototype.bindMouse =
                            function () {
                                var s = this, e = this.element, o = this, n = 32;
                                function a(e) {
                                    var t, i;
                                    if (t =
                                        function (e) {
                                            var t, i, r, n, s;
                                            switch (e.overrideType || e.type) {
                                                case 'mousedown':
                                                    t = null !== e.button && void 0 !== e.button ?
                                                        +e.button :
                                                        null !== e.which && void 0 !== e.which ?
                                                            e.which - 1 :
                                                            null,
                                                        y.isMSIE && (t = 1 === t ? 0 : 4 === t ? 1 : t);
                                                    break;
                                                case 'mouseup':
                                                    t = 3;
                                                    break;
                                                case 'DOMMouseScroll':
                                                    t = e.detail < 0 ? 64 : 65;
                                                    break;
                                                case 'wheel':
                                                    t = e.deltaY < 0 ? 64 : 65
                                            }
                                            i = e.shiftKey ? 4 : 0, r = e.metaKey ? 8 : 0,
                                                n = e.ctrlKey ? 16 : 0, s = i | r | n,
                                                o.vt200Mouse ? s &= n : o.normalMouse || (s = 0);
                                            return t = 32 + (s << 2) + t
                                        }(e),
                                        i = o.mouseHelper.getRawByteCoords(
                                            e, o.screenElement, o.charMeasure, o.cols, o.rows))
                                        switch (h(t, i), e.overrideType || e.type) {
                                            case 'mousedown':
                                                n = t;
                                                break;
                                            case 'mouseup':
                                                n = 32
                                        }
                                }
                                function l(e, t) {
                                    if (o.utfMouse) {
                                        if (2047 === t) return void e.push(0);
                                        t < 127 ? e.push(t) :
                                            (2047 < t && (t = 2047), e.push(192 | t >> 6),
                                                e.push(128 | 63 & t))
                                    } else {
                                        if (255 === t) return void e.push(0);
                                        127 < t && (t = 127), e.push(t)
                                    }
                                }
                                function h(e, t) {
                                    if (o._vt300Mouse) {
                                        e &= 3, t.x -= 32, t.y -= 32;
                                        var i = u.C0.ESC + '[24';
                                        if (0 === e)
                                            i += '1';
                                        else if (1 === e)
                                            i += '3';
                                        else if (2 === e)
                                            i += '5';
                                        else {
                                            if (3 === e) return;
                                            i += '0'
                                        }
                                        return i += '~[' + t.x + ',' + t.y + ']\r',
                                            void o.handler(i)
                                    }
                                    if (o._decLocator)
                                        return e &= 3, t.x -= 32, t.y -= 32,
                                            0 === e ?
                                                e = 2 :
                                                1 === e ? e = 4 :
                                                    2 === e ? e = 6 : 3 === e && (e = 3),
                                            void o.handler(
                                                u.C0.ESC + '[' + e + ';' +
                                                (3 === e ? 4 : 0) + ';' + t.y + ';' +
                                                t.x + ';' + t.page ||
                                                '0&w');
                                    if (o.urxvtMouse)
                                        return t.x -= 32, t.y -= 32, t.x++ , t.y++ ,
                                            void o.handler(
                                                u.C0.ESC + '[' + e + ';' + t.x + ';' + t.y +
                                                'M');
                                    if (o.sgrMouse)
                                        return t.x -= 32, t.y -= 32,
                                            void o.handler(
                                                u.C0.ESC + '[<' +
                                                ((3 == (3 & e) ? -4 & e : e) - 32) + ';' + t.x +
                                                ';' + t.y + (3 == (3 & e) ? 'm' : 'M'));
                                    var r = [];
                                    l(r, e), l(r, t.x), l(r, t.y),
                                        o.handler(
                                            u.C0.ESC + '[M' +
                                            String.fromCharCode.apply(String, r))
                                }
                                this.register(C.addDisposableDomListener(
                                    e, 'mousedown',
                                    function (e) {
                                        if (e.preventDefault(), s.focus(),
                                            s.mouseEvents &&
                                            !s.selectionManager.shouldForceSelection(e)) {
                                            if (a(e), s.vt200Mouse)
                                                return e.overrideType = 'mouseup', a(e), s.cancel(e);
                                            var t;
                                            s.normalMouse && (t = function (e) {
                                                var t, i, r;
                                                s.normalMouse &&
                                                    (t = e, i = n,
                                                        (r = o.mouseHelper.getRawByteCoords(
                                                            t, o.screenElement, o.charMeasure, o.cols,
                                                            o.rows)) &&
                                                        h(i += 32, r))
                                            }, s._document.addEventListener('mousemove', t));
                                            var i = function (e) {
                                                return s.normalMouse && !s.x10Mouse && a(e),
                                                    t &&
                                                    (s._document.removeEventListener(
                                                        'mousemove', t),
                                                        t = null),
                                                    s._document.removeEventListener('mouseup', i),
                                                    s.cancel(e)
                                            };
                                            return s._document.addEventListener('mouseup', i),
                                                s.cancel(e)
                                        }
                                    })),
                                    this.register(C.addDisposableDomListener(
                                        e, 'wheel',
                                        function (e) {
                                            if (s.mouseEvents)
                                                s.x10Mouse || s._vt300Mouse || s._decLocator ||
                                                    (a(e), e.preventDefault());
                                            else if (!s.buffer.hasScrollback) {
                                                var t = s.viewport.getLinesScrolled(e);
                                                if (0 === t) return;
                                                for (var i = u.C0.ESC +
                                                    (s.applicationCursor ? 'O' : '[') +
                                                    (e.deltaY < 0 ? 'A' : 'B'),
                                                    r = '', n = 0;
                                                    n < Math.abs(t); n++)
                                                    r += i;
                                                s.handler(r)
                                            }
                                        })),
                                    this.register(C.addDisposableDomListener(
                                        e, 'wheel',
                                        function (e) {
                                            if (!s.mouseEvents)
                                                return s.viewport.onWheel(e), s.cancel(e)
                                        })),
                                    this.register(C.addDisposableDomListener(
                                        e, 'touchstart',
                                        function (e) {
                                            if (!s.mouseEvents)
                                                return s.viewport.onTouchStart(e), s.cancel(e)
                                        })),
                                    this.register(
                                        C.addDisposableDomListener(e, 'touchmove', function (e) {
                                            if (!s.mouseEvents)
                                                return s.viewport.onTouchMove(e), s.cancel(e)
                                        }))
                            },
                            e.prototype.refresh =
                            function (e, t) {
                                this.renderer && this.renderer.refreshRows(e, t)
                            },
                            e.prototype._queueLinkification =
                            function (e, t) {
                                this.linkifier && this.linkifier.linkifyRows(e, t)
                            },
                            e.prototype.updateCursorStyle =
                            function (e) {
                                this.selectionManager &&
                                    this.selectionManager.shouldColumnSelect(e) ?
                                    this.element.classList.add('column-select') :
                                    this.element.classList.remove('column-select')
                            },
                            e.prototype.showCursor =
                            function () {
                                this.cursorState ||
                                    (this.cursorState = 1,
                                        this.refresh(this.buffer.y, this.buffer.y))
                            },
                            e.prototype.scroll =
                            function (e) {
                                var t;
                                void 0 === e && (e = !1),
                                    (t = this._blankLine) && t.length === this.cols &&
                                    t.get(0)[o.CHAR_DATA_ATTR_INDEX] === this.eraseAttr() ||
                                    (t = this.buffer.getBlankLine(this.eraseAttr(), e),
                                        this._blankLine = t),
                                    t.isWrapped = e;
                                var i = this.buffer.ybase + this.buffer.scrollTop,
                                    r = this.buffer.ybase + this.buffer.scrollBottom;
                                if (0 === this.buffer.scrollTop) {
                                    var n = this.buffer.lines.isFull;
                                    r === this.buffer.lines.length - 1 ?
                                        n ? this.buffer.lines.recycle().copyFrom(t) :
                                            this.buffer.lines.push(t.clone()) :
                                        this.buffer.lines.splice(r + 1, 0, t.clone()),
                                        n ? this._userScrolling &&
                                            (this.buffer.ydisp =
                                                Math.max(this.buffer.ydisp - 1, 0)) :
                                            (this.buffer.ybase++ ,
                                                this._userScrolling || this.buffer.ydisp++)
                                } else {
                                    var s = r - i + 1;
                                    this.buffer.lines.shiftElements(i + 1, s - 1, -1),
                                        this.buffer.lines.set(r, t.clone())
                                }
                                this._userScrolling || (this.buffer.ydisp = this.buffer.ybase),
                                    this.updateRange(this.buffer.scrollTop),
                                    this.updateRange(this.buffer.scrollBottom),
                                    this.emit('scroll', this.buffer.ydisp)
                            },
                            e.prototype.scrollLines =
                            function (e, t) {
                                if (e < 0) {
                                    if (0 === this.buffer.ydisp) return;
                                    this._userScrolling = !0
                                } else
                                    e + this.buffer.ydisp >= this.buffer.ybase &&
                                        (this._userScrolling = !1);
                                var i = this.buffer.ydisp;
                                this.buffer.ydisp = Math.max(
                                    Math.min(this.buffer.ydisp + e, this.buffer.ybase), 0),
                                    i !== this.buffer.ydisp &&
                                    (t || this.emit('scroll', this.buffer.ydisp),
                                        this.refresh(0, this.rows - 1))
                            },
                            e.prototype.scrollPages =
                            function (e) {
                                this.scrollLines(e * (this.rows - 1))
                            },
                            e.prototype.scrollToTop =
                            function () {
                                this.scrollLines(-this.buffer.ydisp)
                            },
                            e.prototype.scrollToBottom =
                            function () {
                                this.scrollLines(this.buffer.ybase - this.buffer.ydisp)
                            },
                            e.prototype.scrollToLine =
                            function (e) {
                                var t = e - this.buffer.ydisp;
                                0 !== t && this.scrollLines(t)
                            },
                            e.prototype.write =
                            function (e) {
                                var t = this;
                                this._isDisposed ||
                                    e &&
                                    (this.writeBuffer.push(e),
                                        this.options.useFlowControl &&
                                        !this._xoffSentToCatchUp &&
                                        5 <= this.writeBuffer.length &&
                                        (this.handler(u.C0.DC3),
                                            this._xoffSentToCatchUp = !0),
                                        !this._writeInProgress &&
                                        0 < this.writeBuffer.length &&
                                        (this._writeInProgress = !0,
                                            setTimeout(function () {
                                                t._innerWrite()
                                            })))
                            },
                            e.prototype._innerWrite =
                            function (e) {
                                var t = this;
                                void 0 === e && (e = 0),
                                    this._isDisposed && (this.writeBuffer = []);
                                for (var i = Date.now(); this.writeBuffer.length > e;) {
                                    var r = this.writeBuffer[e];
                                    if (e++ ,
                                        this._xoffSentToCatchUp &&
                                        this.writeBuffer.length === e &&
                                        (this.handler(u.C0.DC1),
                                            this._xoffSentToCatchUp = !1),
                                        this._refreshStart = this.buffer.y,
                                        this._refreshEnd = this.buffer.y,
                                        this._inputHandler.parse(r),
                                        this.updateRange(this.buffer.y),
                                        this.refresh(this._refreshStart, this._refreshEnd),
                                        12 <= Date.now() - i)
                                        break
                                }
                                this.writeBuffer.length > e ? setTimeout(function () {
                                    return t._innerWrite(e)
                                }, 0) : (this._writeInProgress = !1, this.writeBuffer = [])
                            },
                            e.prototype.writeln =
                            function (e) {
                                this.write(e + '\r\n')
                            },
                            e.prototype.attachCustomKeyEventHandler =
                            function (e) {
                                this._customKeyEventHandler = e
                            },
                            e.prototype.addCsiHandler =
                            function (e, t) {
                                return this._inputHandler.addCsiHandler(e, t)
                            },
                            e.prototype.addOscHandler =
                            function (e, t) {
                                return this._inputHandler.addOscHandler(e, t)
                            },
                            e.prototype.registerLinkMatcher =
                            function (e, t, i) {
                                var r = this.linkifier.registerLinkMatcher(e, t, i);
                                return this.refresh(0, this.rows - 1), r
                            },
                            e.prototype.deregisterLinkMatcher =
                            function (e) {
                                this.linkifier.deregisterLinkMatcher(e) &&
                                    this.refresh(0, this.rows - 1)
                            },
                            e.prototype.registerCharacterJoiner =
                            function (e) {
                                var t = this.renderer.registerCharacterJoiner(e);
                                return this.refresh(0, this.rows - 1), t
                            },
                            e.prototype.deregisterCharacterJoiner =
                            function (e) {
                                this.renderer.deregisterCharacterJoiner(e) &&
                                    this.refresh(0, this.rows - 1)
                            },
                            Object.defineProperty(e.prototype, 'markers', {
                                get: function () {
                                    return this.buffer.markers
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            e.prototype.addMarker = function (e) {
                                if (this.buffer === this.buffers.normal)
                                    return this.buffer.addMarker(
                                        this.buffer.ybase + this.buffer.y + e)
                            }, e.prototype.hasSelection = function () {
                                return !!this.selectionManager &&
                                    this.selectionManager.hasSelection
                            }, e.prototype.getSelection = function () {
                                return this.selectionManager ?
                                    this.selectionManager.selectionText :
                                    ''
                            }, e.prototype.clearSelection = function () {
                                this.selectionManager && this.selectionManager.clearSelection()
                            }, e.prototype.selectAll = function () {
                                this.selectionManager && this.selectionManager.selectAll()
                            }, e.prototype.selectLines = function (e, t) {
                                this.selectionManager && this.selectionManager.selectLines(e, t)
                            }, 
                            e.prototype._keyDown = function (e) {
                                if (this._customKeyEventHandler &&
                                    !1 === this._customKeyEventHandler(e))
                                    return !1;
                                if (!this._compositionHelper.keydown(e))
                                    return this.buffer.ybase !== this.buffer.ydisp &&
                                        this.scrollToBottom(),
                                        !1;
                                var t = T.evaluateKeyboardEvent(
                                    e, this.applicationCursor, this.browser.isMac,
                                    this.options.macOptionIsMeta);
                                if (this.updateCursorStyle(e), 3 !== t.type && 2 !== t.type)
                                    return 1 === t.type && this.selectAll(),
                                        !!this._isThirdLevelShift(this.browser, e) ||
                                        (t.cancel && this.cancel(e, !0),
                                            !t.key ||
                                            (this.emit('keydown', e),
                                                this.emit('key', t.key, e),
                                                this.showCursor(), this.handler(t.key),
                                                this.cancel(e, !0)));
                                var i = this.rows - 1;
                                return this.scrollLines(2 === t.type ? -i : i),
                                    this.cancel(e, !0)
                            }, 
                            e.prototype._isThirdLevelShift = function (e, t) {
                                var i = e.isMac && !this.options.macOptionIsMeta && t.altKey &&
                                    !t.ctrlKey && !t.metaKey ||
                                    e.isMSWindows && t.altKey && t.ctrlKey && !t.metaKey;
                                return 'keypress' === t.type ?
                                    i :
                                    i && (!t.keyCode || 47 < t.keyCode)
                            }, e.prototype.setgLevel = function (e) {
                                this.glevel = e, this.charset = this.charsets[e]
                            }, e.prototype.setgCharset = function (e, t) {
                                this.charsets[e] = t, this.glevel === e && (this.charset = t)
                            }, e.prototype._keyUp = function (e) {
                                this.updateCursorStyle(e)
                            }, e.prototype._keyPress = function (e) {
                                var t;
                                if (this._customKeyEventHandler &&
                                    !1 === this._customKeyEventHandler(e))
                                    return !1;
                                if (this.cancel(e), e.charCode)
                                    t = e.charCode;
                                else if (null === e.which || void 0 === e.which)
                                    t = e.keyCode;
                                else {
                                    if (0 === e.which || 0 === e.charCode) return !1;
                                    t = e.which
                                }
                                return !(!t ||
                                    (e.altKey || e.ctrlKey || e.metaKey) &&
                                    !this._isThirdLevelShift(this.browser, e)) &&
                                    (t = String.fromCharCode(t), this.emit('keypress', t, e),
                                        this.emit('key', t, e), this.showCursor(), this.handler(t),
                                        !0)
                            }, e.prototype.bell = function () {
                                var e = this;
                                this.emit('bell'),
                                    this._soundBell() && this.soundManager.playBellSound(),
                                    this._visualBell() &&
                                    (this.element.classList.add('visual-bell-active'),
                                        clearTimeout(this._visualBellTimer),
                                        this._visualBellTimer = window.setTimeout(function () {
                                            e.element.classList.remove('visual-bell-active')
                                        }, 200))
                            }, e.prototype.log = function (e, t) {
                                this.options.debug && this._context.console &&
                                    this._context.console.log && this._context.console.log(e, t)
                            }, e.prototype.error = function (e, t) {
                                this.options.debug && this._context.console &&
                                    this._context.console.error &&
                                    this._context.console.error(e, t)
                            }, e.prototype.resize = function (e, t) {
                                isNaN(e) || isNaN(t) ||
                                    (e !== this.cols || t !== this.rows ?
                                        (e < 2 && (e = 2), t < 1 && (t = 1),
                                            this.buffers.resize(e, t), this.cols = e,
                                            this.rows = t, this.buffers.setupTabStops(this.cols),
                                            this.charMeasure &&
                                            this.charMeasure.measure(this.options),
                                            this.refresh(0, this.rows - 1),
                                            this.emit('resize', { cols: e, rows: t })) :
                                        !this.charMeasure ||
                                        this.charMeasure.width &&
                                        this.charMeasure.height ||
                                        this.charMeasure.measure(this.options))
                            }, e.prototype.updateRange = function (e) {
                                e < this._refreshStart && (this._refreshStart = e), e > this
                                    ._refreshEnd &&
                                    (this._refreshEnd = e)
                            }, e.prototype.maxRange = function () {
                                this._refreshStart = 0, this._refreshEnd = this.rows - 1
                            }, e.prototype.clear = function () {
                                if (0 !== this.buffer.ybase || 0 !== this.buffer.y) {
                                    this.buffer.lines.set(
                                        0,
                                        this.buffer.lines.get(this.buffer.ybase + this.buffer.y)),
                                        this.buffer.lines.length = 1, this.buffer.ydisp = 0,
                                        this.buffer.ybase = 0, this.buffer.y = 0;
                                    for (var e = 1; e < this.rows; e++)
                                        this.buffer.lines.push(
                                            this.buffer.getBlankLine(o.DEFAULT_ATTR));
                                    this.refresh(0, this.rows - 1),
                                        this.emit('scroll', this.buffer.ydisp)
                                }
                            }, e.prototype.ch = function (e) {
                                return e ?
                                    [
                                        this.eraseAttr(), o.NULL_CELL_CHAR, o.NULL_CELL_WIDTH,
                                        o.NULL_CELL_CODE
                                    ] :
                                    [
                                        o.DEFAULT_ATTR, o.NULL_CELL_CHAR, o.NULL_CELL_WIDTH,
                                        o.NULL_CELL_CODE
                                    ]
                            }, e.prototype.is = function (e) {
                                return 0 === (this.options.termName + '').indexOf(e)
                            }, e.prototype.handler = function (e) {
                                this.options.disableStdin ||
                                    (this.selectionManager &&
                                        this.selectionManager.hasSelection &&
                                        this.selectionManager.clearSelection(),
                                        this.buffer.ybase !== this.buffer.ydisp &&
                                        this.scrollToBottom(),
                                        this.emit('data', e))
                            }, e.prototype.handleTitle = function (e) {
                                this.emit('title', e)
                            }, e.prototype.index = function () {
                                this.buffer.y++ ,
                                    this.buffer.y > this.buffer.scrollBottom &&
                                    (this.buffer.y-- , this.scroll()),
                                    this.buffer.x >= this.cols && this.buffer.x--
                            }, e.prototype.reverseIndex = function () {
                                if (this.buffer.y === this.buffer.scrollTop) {
                                    var e = this.buffer.scrollBottom - this.buffer.scrollTop;
                                    this.buffer.lines.shiftElements(
                                        this.buffer.y + this.buffer.ybase, e, 1),
                                        this.buffer.lines.set(
                                            this.buffer.y + this.buffer.ybase,
                                            this.buffer.getBlankLine(this.eraseAttr())),
                                        this.updateRange(this.buffer.scrollTop),
                                        this.updateRange(this.buffer.scrollBottom)
                                } else
                                    this.buffer.y--
                            }, e.prototype.reset = function () {
                                this.options.rows = this.rows, this.options.cols = this.cols;
                                var e = this._customKeyEventHandler, t = this._inputHandler,
                                    i = this.cursorState;
                                this._setup(), this._customKeyEventHandler = e,
                                    this._inputHandler = t, this.cursorState = i,
                                    this.refresh(0, this.rows - 1),
                                    this.viewport && this.viewport.syncScrollArea()
                            }, e.prototype.tabSet = function () {
                                this.buffer.tabs[this.buffer.x] = !0
                            }, e.prototype.cancel = function (e, t) {
                                if (this.options.cancelEvents || t)
                                    return e.preventDefault(), e.stopPropagation(), !1
                            }, e.prototype.matchColor = function (e, t, i) {
                                var r = e << 16 | t << 8 | i;
                                if (null !== O[r] && void 0 !== O[r]) return O[r];
                                for (var n, s, o, a, l, h, c, u, _ = 1 / 0, f = -1, d = 0;
                                    d < w.DEFAULT_ANSI_COLORS.length; d++) {
                                    if (n = w.DEFAULT_ANSI_COLORS[d].rgba, o = e, a = t, l = i,
                                        h = n >>> 24, c = n >>> 16 & 255, u = n >>> 8 & 255,
                                        0 ===
                                        (s = Math.pow(30 * (o - h), 2) +
                                            Math.pow(59 * (a - c), 2) +
                                            Math.pow(11 * (l - u), 2))) {
                                        f = d;
                                        break
                                    }
                                    s < _ && (_ = s, f = d)
                                }
                                return O[r] = f
                            }, e.prototype._visualBell = function () {
                                return !1
                            }, e.prototype._soundBell = function () {
                                return 'sound' === this.options.bellStyle
                            }, e
                    }(l.EventEmitter);
                i.Terminal = k;
                var O = {}
            },
            {
                './AccessibilityManager': 1,
                './Buffer': 2,
                './BufferSet': 5,
                './CompositionHelper': 7,
                './InputHandler': 9,
                './Linkifier': 10,
                './SelectionManager': 11,
                './SoundManager': 13,
                './Strings': 14,
                './Viewport': 16,
                './common/Clone': 18,
                './common/EventEmitter': 19,
                './common/data/EscapeSequences': 22,
                './core/Platform': 23,
                './core/input/Keyboard': 25,
                './renderer/ColorManager': 31,
                './renderer/Renderer': 35,
                './renderer/atlas/CharAtlasCache': 39,
                './renderer/dom/DomRenderer': 47,
                './ui/CharMeasure': 49,
                './ui/Clipboard': 50,
                './ui/Lifecycle': 51,
                './ui/MouseHelper': 52,
                './ui/MouseZoneManager': 53,
                './ui/ScreenDprMonitor': 55
            }
        ],
        16: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = e('./common/Lifecycle'), o = e('./ui/Lifecycle'),
                    a = function (s) {
                        function e(e, t, i, r) {
                            var n = s.call(this) || this;
                            return n._terminal = e, n._viewportElement = t,
                                n._scrollArea = i, n._charMeasure = r,
                                n.scrollBarWidth = 0, n._currentRowHeight = 0,
                                n._lastRecordedBufferLength = 0,
                                n._lastRecordedViewportHeight = 0,
                                n._lastRecordedBufferHeight = 0, n._lastScrollTop = 0,
                                n._wheelPartialScroll = 0,
                                n._refreshAnimationFrame = null,
                                n._ignoreNextScrollEvent = !1,
                                n.scrollBarWidth = n._viewportElement.offsetWidth -
                                n._scrollArea.offsetWidth ||
                                15,
                                n.register(o.addDisposableDomListener(
                                    n._viewportElement, 'scroll', n._onScroll.bind(n))),
                                setTimeout(function () {
                                    return n.syncScrollArea()
                                }, 0), n
                        }
                        return n(e, s), e.prototype.onThemeChanged = function (e) {
                            this._viewportElement.style.backgroundColor = e.background.css
                        }, e.prototype._refresh = function () {
                            var e = this;
                            null === this._refreshAnimationFrame &&
                                (this._refreshAnimationFrame =
                                    requestAnimationFrame(function () {
                                        return e._innerRefresh()
                                    }))
                        }, e.prototype._innerRefresh = function () {
                            if (0 < this._charMeasure.height) {
                                this._currentRowHeight =
                                    this._terminal.renderer.dimensions.scaledCellHeight /
                                    window.devicePixelRatio,
                                    this._lastRecordedViewportHeight =
                                    this._viewportElement.offsetHeight;
                                var e = Math.round(
                                    this._currentRowHeight *
                                    this._lastRecordedBufferLength) +
                                    (this._lastRecordedViewportHeight -
                                        this._terminal.renderer.dimensions.canvasHeight);
                                this._lastRecordedBufferHeight !== e &&
                                    (this._lastRecordedBufferHeight = e,
                                        this._scrollArea.style.height =
                                        this._lastRecordedBufferHeight + 'px')
                            }
                            var t = this._terminal.buffer.ydisp * this._currentRowHeight;
                            this._viewportElement.scrollTop !== t &&
                                (this._ignoreNextScrollEvent = !0,
                                    this._viewportElement.scrollTop = t),
                                this._refreshAnimationFrame = null
                        }, e.prototype.syncScrollArea = function () {
                            if (this._lastRecordedBufferLength !==
                                this._terminal.buffer.lines.length)
                                return this._lastRecordedBufferLength =
                                    this._terminal.buffer.lines.length,
                                    void this._refresh();
                            if (this._lastRecordedViewportHeight ===
                                this._terminal.renderer.dimensions.canvasHeight) {
                                var e = this._terminal.buffer.ydisp * this._currentRowHeight;
                                this._lastScrollTop === e &&
                                    this._lastScrollTop ===
                                    this._viewportElement.scrollTop &&
                                    this._terminal.renderer.dimensions.scaledCellHeight /
                                    window.devicePixelRatio ===
                                    this._currentRowHeight ||
                                    this._refresh()
                            } else
                                this._refresh()
                        }, e.prototype._onScroll = function (e) {
                            if (this._lastScrollTop = this._viewportElement.scrollTop,
                                this._viewportElement.offsetParent)
                                if (this._ignoreNextScrollEvent)
                                    this._ignoreNextScrollEvent = !1;
                                else {
                                    var t = Math.round(
                                        this._lastScrollTop / this._currentRowHeight) -
                                        this._terminal.buffer.ydisp;
                                    this._terminal.scrollLines(t, !0)
                                }
                        }, e.prototype.onWheel = function (e) {
                            var t = this._getPixelsScrolled(e);
                            0 !== t &&
                                (this._viewportElement.scrollTop += t, e.preventDefault())
                        }, e.prototype._getPixelsScrolled = function (e) {
                            if (0 === e.deltaY) return 0;
                            var t = e.deltaY;
                            return e.deltaMode === WheelEvent.DOM_DELTA_LINE ?
                                t *= this._currentRowHeight :
                                e.deltaMode === WheelEvent.DOM_DELTA_PAGE &&
                                (t *=
                                    this._currentRowHeight * this._terminal.rows),
                                t
                        }, e.prototype.getLinesScrolled = function (e) {
                            if (0 === e.deltaY) return 0;
                            var t = e.deltaY;
                            return e.deltaMode === WheelEvent.DOM_DELTA_PIXEL ?
                                (t /= this._currentRowHeight + 0,
                                    this._wheelPartialScroll += t,
                                    t = Math.floor(Math.abs(this._wheelPartialScroll)) *
                                    (0 < this._wheelPartialScroll ? 1 : -1),
                                    this._wheelPartialScroll %= 1) :
                                e.deltaMode === WheelEvent.DOM_DELTA_PAGE &&
                                (t *= this._terminal.rows),
                                t
                        }, e.prototype.onTouchStart = function (e) {
                            this._lastTouchY = e.touches[0].pageY
                        }, e.prototype.onTouchMove = function (e) {
                            var t = this._lastTouchY - e.touches[0].pageY;
                            this._lastTouchY = e.touches[0].pageY,
                                0 !== t &&
                                (this._viewportElement.scrollTop += t, e.preventDefault())
                        }, e
                    }(s.Disposable);
                i.Viewport = a
            },
            { './common/Lifecycle': 20, './ui/Lifecycle': 51 }
        ],
        17: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = function (i) {
                    function e(e) {
                        var t = i.call(this) || this;
                        return t._maxLength = e, t._array = new Array(t._maxLength),
                            t._startIndex = 0, t._length = 0, t
                    }
                    return n(e, i), Object.defineProperty(e.prototype, 'maxLength', {
                        get: function () {
                            return this._maxLength
                        },
                        set: function (e) {
                            if (this._maxLength !== e) {
                                for (var t = new Array(e), i = 0; i < Math.min(e, this.length);
                                    i++)
                                    t[i] = this._array[this._getCyclicIndex(i)];
                                this._array = t, this._maxLength = e, this._startIndex = 0
                            }
                        },
                        enumerable: !0,
                        configurable: !0
                    }),
                        Object.defineProperty(e.prototype, 'length', {
                            get: function () {
                                return this._length
                            },
                            set: function (e) {
                                if (e > this._length)
                                    for (var t = this._length; t < e; t++)
                                        this._array[t] = void 0;
                                this._length = e
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        e.prototype
                            .get =
                        function (e) {
                            return this._array[this._getCyclicIndex(e)]
                        },
                        e.prototype.set =
                        function (e, t) {
                            this._array[this._getCyclicIndex(e)] = t
                        },
                        e.prototype.push =
                        function (e) {
                            this._array[this._getCyclicIndex(this._length)] = e,
                                this._length === this._maxLength ?
                                    (this._startIndex = ++this._startIndex % this._maxLength,
                                        this.emitMayRemoveListeners('trim', 1)) :
                                    this._length++
                        },
                        e.prototype.recycle =
                        function () {
                            if (this._length !== this._maxLength)
                                throw new Error('Can only recycle when the buffer is full');
                            return this._startIndex = ++this._startIndex % this._maxLength,
                                this.emitMayRemoveListeners('trim', 1),
                                this._array[this._getCyclicIndex(this._length - 1)]
                        },
                        Object.defineProperty(e.prototype, 'isFull', {
                            get: function () {
                                return this._length === this._maxLength
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        e.prototype.pop = function () {
                            return this._array[this._getCyclicIndex(this._length-- - 1)]
                        }, e.prototype.splice = function (e, t) {
                            for (var i = [], r = 2; r < arguments.length; r++)
                                i[r - 2] = arguments[r];
                            if (t) {
                                for (var n = e; n < this._length - t; n++)
                                    this._array[this._getCyclicIndex(n)] =
                                        this._array[this._getCyclicIndex(n + t)];
                                this._length -= t
                            }
                            for (n = this._length - 1; e <= n; n--)
                                this._array[this._getCyclicIndex(n + i.length)] =
                                    this._array[this._getCyclicIndex(n)];
                            for (n = 0; n < i.length; n++)
                                this._array[this._getCyclicIndex(e + n)] = i[n];
                            if (this._length + i.length > this._maxLength) {
                                var s = this._length + i.length - this._maxLength;
                                this._startIndex += s, this._length = this._maxLength,
                                    this.emitMayRemoveListeners('trim', s)
                            } else
                                this._length += i.length
                        }, e.prototype.trimStart = function (e) {
                            e > this._length && (e = this._length), this._startIndex += e,
                                this._length -= e, this.emitMayRemoveListeners('trim', e)
                        }, e.prototype.shiftElements = function (e, t, i) {
                            if (!(t <= 0)) {
                                if (e < 0 || e >= this._length)
                                    throw new Error('start argument out of range');
                                if (e + i < 0)
                                    throw new Error('Cannot shift elements in list beyond index 0');
                                if (0 < i) {
                                    for (var r = t - 1; 0 <= r; r--)
                                        this.set(e + r + i, this.get(e + r));
                                    var n = e + t + i - this._length;
                                    if (0 < n)
                                        for (this._length += n; this._length > this._maxLength;)
                                            this._length-- , this._startIndex++ ,
                                                this.emitMayRemoveListeners('trim', 1)
                                } else
                                    for (r = 0; r < t; r++) this.set(e + r + i, this.get(e + r))
                            }
                        }, e.prototype._getCyclicIndex = function (e) {
                            return (this._startIndex + e) % this._maxLength
                        }, e
                }(e('./EventEmitter').EventEmitter);
                i.CircularList = s
            },
            { './EventEmitter': 19 }
        ],
        18: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 }),
                    i.clone = function e(t, i) {
                        if (void 0 === i && (i = 5), 'object' != typeof t) return t;
                        if (null === t) return null;
                        var r = Array.isArray(t) ? [] : {};
                        for (var n in t) r[n] = i <= 1 ? t[n] : e(t[n], i - 1);
                        return r
                    }
            },
            {}
        ],
        19: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = function (t) {
                    function e() {
                        var e = t.call(this) || this;
                        return e._events = e._events || {}, e
                    }
                    return n(e, t), e.prototype.on = function (e, t) {
                        this._events[e] = this._events[e] || [], this._events[e].push(t)
                    }, e.prototype.addDisposableListener = function (e, t) {
                        var i = this;
                        this.on(e, t);
                        var r = !1;
                        return {
                            dispose: function () {
                                r || (i.off(e, t), r = !0)
                            }
                        }
                    }, e.prototype.off = function (e, t) {
                        if (this._events[e])
                            for (var i = this._events[e], r = i.length; r--;)
                                if (i[r] === t) return void i.splice(r, 1)
                    }, e.prototype.removeAllListeners = function (e) {
                        this._events[e] && delete this._events[e]
                    }, e.prototype.emit = function (e) {
                        for (var t = [], i = 1; i < arguments.length; i++)
                            t[i - 1] = arguments[i];
                        if (this._events[e])
                            for (var r = this._events[e], n = 0; n < r.length; n++)
                                r[n].apply(this, t)
                    }, e.prototype.emitMayRemoveListeners = function (e) {
                        for (var t = [], i = 1; i < arguments.length; i++)
                            t[i - 1] = arguments[i];
                        if (this._events[e])
                            for (var r = this._events[e], n = r.length, s = 0; s < r.length;
                                s++)
                                r[s].apply(this, t), s -= n - r.length, n = r.length
                    }, e.prototype.listeners = function (e) {
                        return this._events[e] || []
                    }, e.prototype.dispose = function () {
                        t.prototype.dispose.call(this), this._events = {}
                    }, e
                }(e('./Lifecycle').Disposable);
                i.EventEmitter = s
            },
            { './Lifecycle': 20 }
        ],
        20: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = function () {
                    function e() {
                        this._disposables = [], this._isDisposed = !1
                    }
                    return e.prototype.dispose = function () {
                        this._isDisposed = !0, this._disposables.forEach(function (e) {
                            return e.dispose()
                        }),
                            this._disposables.length = 0
                    }, e.prototype.register = function (e) {
                        this._disposables.push(e)
                    }, e.prototype.unregister = function (e) {
                        var t = this._disposables.indexOf(e);
                        -1 !== t && this._disposables.splice(t, 1)
                    }, e
                }();
                i.Disposable = r
            },
            {}
        ],
        21: [
            function (e, t, i) {
                'use strict';
                function n(e, t, i, r) {
                    if (void 0 === i && (i = 0), void 0 === r && (r = e.length),
                        i >= e.length)
                        return e;
                    i = (e.length + i) % e.length,
                        r = r >= e.length ? e.length : (e.length + r) % e.length;
                    for (var n = i; n < r; ++n) e[n] = t;
                    return e
                }
                Object.defineProperty(i, '__esModule', { value: !0 }),
                    i.fill = function (e, t, i, r) {
                        return e.fill ? e.fill(t, i, r) : n(e, t, i, r)
                    }, i.fillFallback = n, i.concat = function (e, t) {
                        var i = new e.constructor(e.length + t.length);
                        return i.set(e), i.set(t, e.length), i
                    }
            },
            {}
        ],
        22: [
            function (e, t, i) {
                'use strict';
                var r, n;
                Object.defineProperty(i, '__esModule', { value: !0 }),
                    (r = i.C0 || (i.C0 = {})).NUL = '\0', r.SOH = '', r.STX = '',
                    r.ETX = '', r.EOT = '', r.ENQ = '',
                    r.ACK = '', r.BEL = '', r.BS = '\b',
                    r.HT = '\t', r.LF = '\n', r.VT = '\v',
                    r.FF = '\f', r.CR = '\r', r.SO = '',
                    r.SI = '', r.DLE = '', r.DC1 = '',
                    r.DC2 = '', r.DC3 = '', r.DC4 = '',
                    r.NAK = '', r.SYN = '', r.ETB = '',
                    r.CAN = '', r.EM = '', r.SUB = '',
                    r.ESC = '', r.FS = '', r.GS = '',
                    r.RS = '', r.US = '', r.SP = ' ',
                    r.DEL = '',
                    (n = i.C1 || (i.C1 = {})).PAD = '',
                    n.HOP = '', n.BPH = '', n.NBH = '',
                    n.IND = '', n.NEL = '', n.SSA = '',
                    n.ESA = '', n.HTS = '', n.HTJ = '',
                    n.VTS = '', n.PLD = '', n.PLU = '',
                    n.RI = '', n.SS2 = '', n.SS3 = '',
                    n.DCS = '', n.PU1 = '', n.PU2 = '',
                    n.STS = '', n.CCH = '', n.MW = '',
                    n.SPA = '', n.EPA = '', n.SOS = '',
                    n.SGCI = '', n.SCI = '', n.CSI = '',
                    n.ST = '', n.OSC = '', n.PM = '',
                    n.APC = ''
            },
            {}
        ],
        23: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = 'undefined' == typeof navigator,
                    n = r ? 'node' : navigator.userAgent,
                    s = r ? 'node' : navigator.platform;
                function o(e, t) {
                    return 0 <= e.indexOf(t)
                }
                i.isFirefox = !!~n.indexOf('Firefox'),
                    i.isSafari = /^((?!chrome|android).)*safari/i.test(n),
                    i.isMSIE = !!~n.indexOf('MSIE') || !!~n.indexOf('Trident'),
                    i.isMac = o(['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'], s),
                    i.isIpad = 'iPad' === s, i.isIphone = 'iPhone' === s,
                    i.isMSWindows = o(['Windows', 'Win16', 'Win32', 'WinCE'], s),
                    i.isLinux = 0 <= s.indexOf('Linux')
            },
            {}
        ],
        24: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 }),
                    i.CHARSETS = {}, i.DEFAULT_CHARSET = i.CHARSETS.B, i.CHARSETS[0] = {
                        '`': '◆',
                        a: '▒',
                        b: '\t',
                        c: '\f',
                        d: '\r',
                        e: '\n',
                        f: '°',
                        g: '±',
                        h: '␤',
                        i: '\v',
                        j: '┘',
                        k: '┐',
                        l: '┌',
                        m: '└',
                        n: '┼',
                        o: '⎺',
                        p: '⎻',
                        q: '─',
                        r: '⎼',
                        s: '⎽',
                        t: '├',
                        u: '┤',
                        v: '┴',
                        w: '┬',
                        x: '│',
                        y: '≤',
                        z: '≥',
                        '{': 'π',
                        '|': '≠',
                        '}': '£',
                        '~': '·'
                    },
                    i.CHARSETS.A = { '#': '£' }, i.CHARSETS.B = null, i.CHARSETS[4] = {
                        '#': '£',
                        '@': '¾',
                        '[': 'ij',
                        '\\': '½',
                        ']': '|',
                        '{': '¨',
                        '|': 'f',
                        '}': '¼',
                        '~': '´'
                    },
                    i.CHARSETS.C = i.CHARSETS[5] = {
                        '[': 'Ä',
                        '\\': 'Ö',
                        ']': 'Å',
                        '^': 'Ü',
                        '`': 'é',
                        '{': 'ä',
                        '|': 'ö',
                        '}': 'å',
                        '~': 'ü'
                    },
                    i.CHARSETS.R = {
                        '#': '£',
                        '@': 'à',
                        '[': '°',
                        '\\': 'ç',
                        ']': '§',
                        '{': 'é',
                        '|': 'ù',
                        '}': 'è',
                        '~': '¨'
                    },
                    i.CHARSETS.Q = {
                        '@': 'à',
                        '[': 'â',
                        '\\': 'ç',
                        ']': 'ê',
                        '^': 'î',
                        '`': 'ô',
                        '{': 'é',
                        '|': 'ù',
                        '}': 'è',
                        '~': 'û'
                    },
                    i.CHARSETS.K = {
                        '@': '§',
                        '[': 'Ä',
                        '\\': 'Ö',
                        ']': 'Ü',
                        '{': 'ä',
                        '|': 'ö',
                        '}': 'ü',
                        '~': 'ß'
                    },
                    i.CHARSETS.Y = {
                        '#': '£',
                        '@': '§',
                        '[': '°',
                        '\\': 'ç',
                        ']': 'é',
                        '`': 'ù',
                        '{': 'à',
                        '|': 'ò',
                        '}': 'è',
                        '~': 'ì'
                    },
                    i.CHARSETS.E = i.CHARSETS[6] = {
                        '@': 'Ä',
                        '[': 'Æ',
                        '\\': 'Ø',
                        ']': 'Å',
                        '^': 'Ü',
                        '`': 'ä',
                        '{': 'æ',
                        '|': 'ø',
                        '}': 'å',
                        '~': 'ü'
                    },
                    i.CHARSETS.Z = {
                        '#': '£',
                        '@': '§',
                        '[': '¡',
                        '\\': 'Ñ',
                        ']': '¿',
                        '{': '°',
                        '|': 'ñ',
                        '}': 'ç'
                    },
                    i.CHARSETS.H = i.CHARSETS[7] = {
                        '@': 'É',
                        '[': 'Ä',
                        '\\': 'Ö',
                        ']': 'Å',
                        '^': 'Ü',
                        '`': 'é',
                        '{': 'ä',
                        '|': 'ö',
                        '}': 'å',
                        '~': 'ü'
                    },
                    i.CHARSETS['='] = {
                        '#': 'ù',
                        '@': 'à',
                        '[': 'é',
                        '\\': 'ç',
                        ']': 'ê',
                        '^': 'î',
                        _: 'è',
                        '`': 'ô',
                        '{': 'ä',
                        '|': 'ö',
                        '}': 'ü',
                        '~': 'û'
                    }
            },
            {}
        ],
        25: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var h = e('../../common/data/EscapeSequences'), 
                    c = {
                        48: ['0', ')'],
                        49: ['1', '!'],
                        50: ['2', '@'],
                        51: ['3', '#'],
                        52: ['4', '$'],
                        53: ['5', '%'],
                        54: ['6', '^'],
                        55: ['7', '&'],
                        56: ['8', '*'],
                        57: ['9', '('],
                        186: [';', ':'],
                        187: ['=', '+'],
                        188: [',', '<'],
                        189: ['-', '_'],
                        190: ['.', '>'],
                        191: ['/', '?'],
                        192: ['`', '~'],
                        219: ['[', '{'],
                        220: ['\\', '|'],
                        221: [']', '}'],
                        222: ['\'', '"']
                    };
                i.evaluateKeyboardEvent = function (e, t, i, r) {
                    var n = { type: 0, cancel: !1, key: void 0 },
                        s = (e.shiftKey ? 1 : 0) | (e.altKey ? 2 : 0) |
                            (e.ctrlKey ? 4 : 0) | (e.metaKey ? 8 : 0);
                    switch (e.keyCode) {
                        case 0:
                            'UIKeyInputUpArrow' === e.key ?
                                n.key = t ? h.C0.ESC + 'OA' : h.C0.ESC + '[A' :
                                'UIKeyInputLeftArrow' === e.key ?
                                    n.key = t ? h.C0.ESC + 'OD' : h.C0.ESC + '[D' :
                                    'UIKeyInputRightArrow' === e.key ?
                                        n.key = t ? h.C0.ESC + 'OC' : h.C0.ESC + '[C' :
                                        'UIKeyInputDownArrow' === e.key &&
                                        (n.key = t ? h.C0.ESC + 'OB' : h.C0.ESC + '[B');
                            break;
                        case 8:
                            if (e.shiftKey) {
                                n.key = h.C0.BS;
                                break
                            }
                            if (e.altKey) {
                                n.key = h.C0.ESC + h.C0.DEL;
                                break
                            }
                            n.key = h.C0.DEL;
                            break;
                        case 9:
                            if (e.shiftKey) {
                                n.key = h.C0.ESC + '[Z';
                                break
                            }
                            n.key = h.C0.HT, n.cancel = !0;
                            break;
                        case 13:
                            n.key = h.C0.CR, n.cancel = !0;
                            break;
                        case 27:
                            n.key = h.C0.ESC, n.cancel = !0;
                            break;
                        case 37:
                            s ? (n.key = h.C0.ESC + '[1;' + (s + 1) + 'D',
                                n.key === h.C0.ESC + '[1;3D' &&
                                (n.key = i ? h.C0.ESC + 'b' : h.C0.ESC + '[1;5D')) :
                                n.key = t ? h.C0.ESC + 'OD' : h.C0.ESC + '[D';
                            break;
                        case 39:
                            s ? (n.key = h.C0.ESC + '[1;' + (s + 1) + 'C',
                                n.key === h.C0.ESC + '[1;3C' &&
                                (n.key = i ? h.C0.ESC + 'f' : h.C0.ESC + '[1;5C')) :
                                n.key = t ? h.C0.ESC + 'OC' : h.C0.ESC + '[C';
                            break;
                        case 38:
                            s ? (n.key = h.C0.ESC + '[1;' + (s + 1) + 'A',
                                n.key === h.C0.ESC + '[1;3A' &&
                                (n.key = h.C0.ESC + '[1;5A')) :
                                n.key = t ? h.C0.ESC + 'OA' : h.C0.ESC + '[A';
                            break;
                        case 40:
                            s ? (n.key = h.C0.ESC + '[1;' + (s + 1) + 'B',
                                n.key === h.C0.ESC + '[1;3B' &&
                                (n.key = h.C0.ESC + '[1;5B')) :
                                n.key = t ? h.C0.ESC + 'OB' : h.C0.ESC + '[B';
                            break;
                        case 45:
                            e.shiftKey || e.ctrlKey || (n.key = h.C0.ESC + '[2~');
                            break;
                        case 46:
                            n.key = s ? h.C0.ESC + '[3;' + (s + 1) + '~' : h.C0.ESC + '[3~';
                            break;
                        case 36:
                            n.key = s ? h.C0.ESC + '[1;' + (s + 1) + 'H' :
                                t ? h.C0.ESC + 'OH' : h.C0.ESC + '[H';
                            break;
                        case 35:
                            n.key = s ? h.C0.ESC + '[1;' + (s + 1) + 'F' :
                                t ? h.C0.ESC + 'OF' : h.C0.ESC + '[F';
                            break;
                        case 33:
                            e.shiftKey ? n.type = 2 : n.key = h.C0.ESC + '[5~';
                            break;
                        case 34:
                            e.shiftKey ? n.type = 3 : n.key = h.C0.ESC + '[6~';
                            break;
                        case 112:
                            n.key = s ? h.C0.ESC + '[1;' + (s + 1) + 'P' : h.C0.ESC + 'OP';
                            break;
                        case 113:
                            n.key = s ? h.C0.ESC + '[1;' + (s + 1) + 'Q' : h.C0.ESC + 'OQ';
                            break;
                        case 114:
                            n.key = s ? h.C0.ESC + '[1;' + (s + 1) + 'R' : h.C0.ESC + 'OR';
                            break;
                        case 115:
                            n.key = s ? h.C0.ESC + '[1;' + (s + 1) + 'S' : h.C0.ESC + 'OS';
                            break;
                        case 116:
                            n.key = s ? h.C0.ESC + '[15;' + (s + 1) + '~' : h.C0.ESC + '[15~';
                            break;
                        case 117:
                            n.key = s ? h.C0.ESC + '[17;' + (s + 1) + '~' : h.C0.ESC + '[17~';
                            break;
                        case 118:
                            n.key = s ? h.C0.ESC + '[18;' + (s + 1) + '~' : h.C0.ESC + '[18~';
                            break;
                        case 119:
                            n.key = s ? h.C0.ESC + '[19;' + (s + 1) + '~' : h.C0.ESC + '[19~';
                            break;
                        case 120:
                            n.key = s ? h.C0.ESC + '[20;' + (s + 1) + '~' : h.C0.ESC + '[20~';
                            break;
                        case 121:
                            n.key = s ? h.C0.ESC + '[21;' + (s + 1) + '~' : h.C0.ESC + '[21~';
                            break;
                        case 122:
                            n.key = s ? h.C0.ESC + '[23;' + (s + 1) + '~' : h.C0.ESC + '[23~';
                            break;
                        case 123:
                            n.key = s ? h.C0.ESC + '[24;' + (s + 1) + '~' : h.C0.ESC + '[24~';
                            break;
                        default:
                            if (!e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)
                                if (i && !r || !e.altKey || e.metaKey)
                                    i && !e.altKey && !e.ctrlKey && e.metaKey ?
                                        65 === e.keyCode && (n.type = 1) :
                                        e.key && !e.ctrlKey && !e.altKey && !e.metaKey &&
                                        48 <= e.keyCode && 1 === e.key.length &&
                                        (n.key = e.key);
                                else {
                                    var o = c[e.keyCode], a = o && o[e.shiftKey ? 1 : 0];
                                    if (a)
                                        n.key = h.C0.ESC + a;
                                    else if (65 <= e.keyCode && e.keyCode <= 90) {
                                        var l = e.ctrlKey ? e.keyCode - 64 : e.keyCode + 32;
                                        n.key = h.C0.ESC + String.fromCharCode(l)
                                    }
                                }
                            else
                                65 <= e.keyCode && e.keyCode <= 90 ?
                                    n.key = String.fromCharCode(e.keyCode - 64) :
                                    32 === e.keyCode ?
                                        n.key = String.fromCharCode(0) :
                                        51 <= e.keyCode && e.keyCode <= 55 ?
                                            n.key = String.fromCharCode(e.keyCode - 51 + 27) :
                                            56 === e.keyCode ?
                                                n.key = String.fromCharCode(127) :
                                                219 === e.keyCode ?
                                                    n.key = String.fromCharCode(27) :
                                                    220 === e.keyCode ?
                                                        n.key = String.fromCharCode(28) :
                                                        221 === e.keyCode && (n.key = String.fromCharCode(29))
                    }
                    return n
                }
            },
            { '../../common/data/EscapeSequences': 22 }
        ],
        26: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = function () {
                    function e() {
                        this._interim = 0
                    }
                    return e.prototype.clear = function () {
                        this._interim = 0
                    }, e.prototype.decode = function (e, t) {
                        var i = e.length;
                        if (!i) return 0;
                        var r = 0, n = 0;
                        if (this._interim) {
                            var s = e.charCodeAt(n++);
                            t[r++] = 56320 <= s && s <= 57343 ?
                                1024 * (this._interim - 55296) + s - 56320 + 65536 :
                                (t[r++] = this._interim, s),
                                this._interim = 0
                        }
                        for (var o = n; o < i; ++o) {
                            var a = e.charCodeAt(o);
                            if (55296 <= a && a <= 56319) {
                                if (++o >= i) return this._interim = a, r;
                                s = e.charCodeAt(o);
                                t[r++] = 56320 <= s && s <= 57343 ?
                                    1024 * (a - 55296) + s - 56320 + 65536 :
                                    (t[r++] = a, s)
                            } else
                                t[r++] = a
                        }
                        return r
                    }, e
                }();
                i.StringToUtf32 = r, i.stringFromCodePoint = function (e) {
                    return 65535 < e ? (e -= 65536,
                        String.fromCharCode(55296 + (e >> 10)) +
                        String.fromCharCode(e % 1024 + 56320)) :
                        String.fromCharCode(e)
                }, i.utf32ToString = function (e, t, i) {
                    void 0 === t && (t = 0), void 0 === i && (i = e.length);
                    for (var r = '', n = t; n < i; ++n) {
                        var s = e[n];
                        65535 < s ? (s -= 65536,
                            r += String.fromCharCode(55296 + (s >> 10)) +
                            String.fromCharCode(s % 1024 + 56320)) :
                            r += String.fromCharCode(s)
                    }
                    return r
                }
            },
            {}
        ],
        27: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = e('../common/data/EscapeSequences'), n = function () {
                    function e(e, t) {
                        var i;
                        this._mouseEvent = e, this._terminal = t,
                            this._lines = this._terminal.buffer.lines,
                            this._startCol = this._terminal.buffer.x,
                            this._startRow = this._terminal.buffer.y;
                        var r = this._terminal.mouseHelper.getCoords(
                            this._mouseEvent, this._terminal.element,
                            this._terminal.charMeasure, this._terminal.cols,
                            this._terminal.rows, !1);
                        r &&
                            (i = r.map(function (e) {
                                return e - 1
                            }),
                                this._endCol = i[0], this._endRow = i[1])
                    }
                    return e.prototype.move = function () {
                        this._mouseEvent.altKey && void 0 !== this._endCol &&
                            void 0 !== this._endRow &&
                            this._terminal.handler(this._arrowSequences())
                    }, e.prototype._arrowSequences = function () {
                        return this._terminal.buffer.hasScrollback ?
                            this._moveHorizontallyOnly() :
                            this._resetStartingRow() + this._moveToRequestedRow() +
                            this._moveToRequestedCol()
                    }, e.prototype._resetStartingRow = function () {
                        return 0 === this._moveToRequestedRow().length ?
                            '' :
                            s(this._bufferLine(
                                this._startCol, this._startRow, this._startCol,
                                this._startRow -
                                this._wrappedRowsForRow(this._startRow),
                                !1)
                                .length,
                                this._sequence('D'))
                    }, e.prototype._moveToRequestedRow = function () {
                        var e = this._startRow - this._wrappedRowsForRow(this._startRow),
                            t = this._endRow - this._wrappedRowsForRow(this._endRow);
                        return s(
                            Math.abs(e - t) - this._wrappedRowsCount(),
                            this._sequence(this._verticalDirection()))
                    }, e.prototype._moveToRequestedCol = function () {
                        var e;
                        e = 0 < this._moveToRequestedRow().length ?
                            this._endRow - this._wrappedRowsForRow(this._endRow) :
                            this._startRow;
                        var t = this._endRow, i = this._horizontalDirection();
                        return s(
                            this._bufferLine(this._startCol, e, this._endCol, t, 'C' === i)
                                .length,
                            this._sequence(i))
                    }, e.prototype._moveHorizontallyOnly = function () {
                        var e = this._horizontalDirection();
                        return s(Math.abs(this._startCol - this._endCol), this._sequence(e))
                    }, e.prototype._wrappedRowsCount = function () {
                        for (var e = 0,
                            t = this._startRow -
                                this._wrappedRowsForRow(this._startRow),
                            i = this._endRow - this._wrappedRowsForRow(this._endRow),
                            r = 0;
                            r < Math.abs(t - i); r++) {
                            var n = 'A' === this._verticalDirection() ? -1 : 1;
                            this._lines.get(t + n * r).isWrapped && e++
                        }
                        return e
                    }, e.prototype._wrappedRowsForRow = function (e) {
                        for (var t = 0, i = this._lines.get(e).isWrapped;
                            i && 0 <= e && e < this._terminal.rows;)
                            t++ , e-- , i = this._lines.get(e).isWrapped;
                        return t
                    }, e.prototype._horizontalDirection = function () {
                        var e;
                        return e = 0 < this._moveToRequestedRow().length ?
                            this._endRow - this._wrappedRowsForRow(this._endRow) :
                            this._startRow,
                            this._startCol < this._endCol && e <= this._endRow ||
                                this._startCol >= this._endCol && e < this._endRow ?
                                'C' :
                                'D'
                    }, e.prototype._verticalDirection = function () {
                        return this._startRow > this._endRow ? 'A' : 'B'
                    }, e.prototype._bufferLine = function (e, t, i, r, n) {
                        for (var s = e, o = t, a = ''; s !== i || o !== r;)
                            s += n ? 1 : -1,
                                n && s > this._terminal.cols - 1 ?
                                    (a += this._terminal.buffer.translateBufferLineToString(
                                        o, !1, e, s),
                                        e = s = 0, o++) :
                                    !n && s < 0 &&
                                    (a += this._terminal.buffer.translateBufferLineToString(
                                        o, !1, 0, e + 1),
                                        e = s = this._terminal.cols - 1, o--);
                        return a +
                            this._terminal.buffer.translateBufferLineToString(o, !1, e, s)
                    }, e.prototype._sequence = function (e) {
                        var t = this._terminal.applicationCursor ? 'O' : '[';
                        return r.C0.ESC + t + e
                    }, e
                }();
                function s(e, t) {
                    e = Math.floor(e);
                    for (var i = '', r = 0; r < e; r++) i += t;
                    return i
                }
                i.AltClickHandler = n
            },
            { '../common/data/EscapeSequences': 22 }
        ],
        28: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = e('../Terminal'), n = e('../Strings'), s = function () {
                    function t(e) {
                        this._core = new r.Terminal(e)
                    }
                    return Object.defineProperty(t.prototype, 'element', {
                        get: function () {
                            return this._core.element
                        },
                        enumerable: !0,
                        configurable: !0
                    }),
                        Object.defineProperty(t.prototype, 'textarea', {
                            get: function () {
                                return this._core.textarea
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        Object.defineProperty(t.prototype, 'rows', {
                            get: function () {
                                return this._core.rows
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        Object.defineProperty(t.prototype, 'cols', {
                            get: function () {
                                return this._core.cols
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        Object.defineProperty(t.prototype, 'markers', {
                            get: function () {
                                return this._core.markers
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        t.prototype.blur =
                        function () {
                            this._core.blur()
                        },
                        t.prototype.focus =
                        function () {
                            this._core.focus()
                        },
                        t.prototype.on =
                        function (e, t) {
                            this._core.on(e, t)
                        },
                        t.prototype.off =
                        function (e, t) {
                            this._core.off(e, t)
                        },
                        t.prototype.emit =
                        function (e, t) {
                            this._core.emit(e, t)
                        },
                        t.prototype.addDisposableListener =
                        function (e, t) {
                            return this._core.addDisposableListener(e, t)
                        },
                        t.prototype.resize =
                        function (e, t) {
                            this._core.resize(e, t)
                        },
                        t.prototype.writeln =
                        function (e) {
                            this._core.writeln(e)
                        },
                        t.prototype.open =
                        function (e) {
                            this._core.open(e)
                        },
                        t.prototype.attachCustomKeyEventHandler =
                        function (e) {
                            this._core.attachCustomKeyEventHandler(e)
                        },
                        t.prototype.addCsiHandler =
                        function (e, t) {
                            return this._core.addCsiHandler(e, t)
                        },
                        t.prototype.addOscHandler =
                        function (e, t) {
                            return this._core.addOscHandler(e, t)
                        },
                        t.prototype.registerLinkMatcher =
                        function (e, t, i) {
                            return this._core.registerLinkMatcher(e, t, i)
                        },
                        t.prototype.deregisterLinkMatcher =
                        function (e) {
                            this._core.deregisterLinkMatcher(e)
                        },
                        t.prototype.registerCharacterJoiner =
                        function (e) {
                            return this._core.registerCharacterJoiner(e)
                        },
                        t.prototype.deregisterCharacterJoiner =
                        function (e) {
                            this._core.deregisterCharacterJoiner(e)
                        },
                        t.prototype.addMarker =
                        function (e) {
                            return this._core.addMarker(e)
                        },
                        t.prototype.hasSelection =
                        function () {
                            return this._core.hasSelection()
                        },
                        t.prototype.getSelection =
                        function () {
                            return this._core.getSelection()
                        },
                        t.prototype.clearSelection =
                        function () {
                            this._core.clearSelection()
                        },
                        t.prototype.selectAll =
                        function () {
                            this._core.selectAll()
                        },
                        t.prototype.selectLines =
                        function (e, t) {
                            this._core.selectLines(e, t)
                        },
                        t.prototype.dispose =
                        function () {
                            this._core.dispose()
                        },
                        t.prototype.destroy =
                        function () {
                            this._core.destroy()
                        },
                        t.prototype.scrollLines =
                        function (e) {
                            this._core.scrollLines(e)
                        },
                        t.prototype.scrollPages =
                        function (e) {
                            this._core.scrollPages(e)
                        },
                        t.prototype.scrollToTop =
                        function () {
                            this._core.scrollToTop()
                        },
                        t.prototype.scrollToBottom =
                        function () {
                            this._core.scrollToBottom()
                        },
                        t.prototype.scrollToLine =
                        function (e) {
                            this._core.scrollToLine(e)
                        },
                        t.prototype.clear =
                        function () {
                            this._core.clear()
                        },
                        t.prototype.write =
                        function (e) {
                            this._core.write(e)
                        },
                        t.prototype.getOption =
                        function (e) {
                            return this._core.getOption(e)
                        },
                        t.prototype.setOption =
                        function (e, t) {
                            this._core.setOption(e, t)
                        },
                        t.prototype.refresh =
                        function (e, t) {
                            this._core.refresh(e, t)
                        },
                        t.prototype.reset =
                        function () {
                            this._core.reset()
                        },
                        t.applyAddon =
                        function (e) {
                            e.apply(t)
                        },
                        Object.defineProperty(t, 'strings', {
                            get: function () {
                                return n
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        t
                }();
                i.Terminal = s
            },
            { '../Strings': 14, '../Terminal': 15 }
        ],
        29: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var u = e('./atlas/Types'), r = e('./atlas/CharAtlasCache'),
                    n = e('../Buffer'), h = e('./atlas/CharAtlasUtils'),
                    s = function () {
                        function e(e, t, i, r, n) {
                            this._container = e, this._alpha = r, this._colors = n,
                                this._scaledCharWidth = 0, this._scaledCharHeight = 0,
                                this._scaledCellWidth = 0, this._scaledCellHeight = 0,
                                this._scaledCharLeft = 0, this._scaledCharTop = 0,
                                this._currentGlyphIdentifier = {
                                    chars: '',
                                    code: 0,
                                    bg: 0,
                                    fg: 0,
                                    bold: !1,
                                    dim: !1,
                                    italic: !1
                                },
                                this._canvas = document.createElement('canvas'),
                                this._canvas.classList.add('xterm-' + t + '-layer'),
                                this._canvas.style.zIndex = i.toString(), this._initCanvas(),
                                this._container.appendChild(this._canvas)
                        }
                        return e.prototype
                            .dispose =
                            function () {
                                this._container.removeChild(this._canvas),
                                    this._charAtlas && this._charAtlas.dispose()
                            },
                            e.prototype._initCanvas =
                            function () {
                                this._ctx = this._canvas.getContext('2d', { alpha: this._alpha }),
                                    this._alpha || this.clearAll()
                            },
                            e.prototype.onOptionsChanged = function (e) { },
                            e.prototype.onBlur = function (e) { },
                            e.prototype.onFocus = function (e) { },
                            e.prototype.onCursorMove = function (e) { },
                            e.prototype.onGridChanged = function (e, t, i) { },
                            e.prototype.onSelectionChanged =
                            function (e, t, i, r) {
                                void 0 === r && (r = !1)
                            },
                            e.prototype.onThemeChanged =
                            function (e, t) {
                                this._refreshCharAtlas(e, t)
                            },
                            e.prototype.setTransparency =
                            function (e, t) {
                                if (t !== this._alpha) {
                                    var i = this._canvas;
                                    this._alpha = t, this._canvas = this._canvas.cloneNode(),
                                        this._initCanvas(),
                                        this._container.replaceChild(this._canvas, i),
                                        this._refreshCharAtlas(e, this._colors),
                                        this.onGridChanged(e, 0, e.rows - 1)
                                }
                            },
                            e.prototype._refreshCharAtlas =
                            function (e, t) {
                                this._scaledCharWidth <= 0 && this._scaledCharHeight <= 0 ||
                                    (this._charAtlas = r.acquireCharAtlas(
                                        e, t, this._scaledCharWidth, this._scaledCharHeight),
                                        this._charAtlas.warmUp())
                            },
                            e.prototype.resize =
                            function (e, t) {
                                this._scaledCellWidth = t.scaledCellWidth,
                                    this._scaledCellHeight = t.scaledCellHeight,
                                    this._scaledCharWidth = t.scaledCharWidth,
                                    this._scaledCharHeight = t.scaledCharHeight,
                                    this._scaledCharLeft = t.scaledCharLeft,
                                    this._scaledCharTop = t.scaledCharTop,
                                    this._canvas.width = t.scaledCanvasWidth,
                                    this._canvas.height = t.scaledCanvasHeight,
                                    this._canvas.style.width = t.canvasWidth + 'px',
                                    this._canvas.style.height = t.canvasHeight + 'px',
                                    this._alpha || this.clearAll(),
                                    this._refreshCharAtlas(e, this._colors)
                            },
                            e.prototype.fillCells =
                            function (e, t, i, r) {
                                this._ctx.fillRect(
                                    e * this._scaledCellWidth, t * this._scaledCellHeight,
                                    i * this._scaledCellWidth, r * this._scaledCellHeight)
                            },
                            e.prototype.fillBottomLineAtCells =
                            function (e, t, i) {
                                void 0 === i && (i = 1),
                                    this._ctx.fillRect(
                                        e * this._scaledCellWidth,
                                        (t + 1) * this._scaledCellHeight -
                                        window.devicePixelRatio - 1,
                                        i * this._scaledCellWidth, window.devicePixelRatio)
                            },
                            e.prototype.fillLeftLineAtCell =
                            function (e, t) {
                                this._ctx.fillRect(
                                    e * this._scaledCellWidth, t * this._scaledCellHeight,
                                    window.devicePixelRatio, this._scaledCellHeight)
                            },
                            e.prototype.strokeRectAtCell =
                            function (e, t, i, r) {
                                this._ctx.lineWidth = window.devicePixelRatio,
                                    this._ctx.strokeRect(
                                        e * this._scaledCellWidth + window.devicePixelRatio / 2,
                                        t * this._scaledCellHeight + window.devicePixelRatio / 2,
                                        i * this._scaledCellWidth - window.devicePixelRatio,
                                        r * this._scaledCellHeight - window.devicePixelRatio)
                            },
                            e.prototype.clearAll =
                            function () {
                                this._alpha ?
                                    this._ctx.clearRect(
                                        0, 0, this._canvas.width, this._canvas.height) :
                                    (this._ctx.fillStyle = this._colors.background.css,
                                        this._ctx.fillRect(
                                            0, 0, this._canvas.width, this._canvas.height))
                            },
                            e.prototype.clearCells =
                            function (e, t, i, r) {
                                this._alpha ?
                                    this._ctx.clearRect(
                                        e * this._scaledCellWidth, t * this._scaledCellHeight,
                                        i * this._scaledCellWidth, r * this._scaledCellHeight) :
                                    (this._ctx.fillStyle = this._colors.background.css,
                                        this._ctx.fillRect(
                                            e * this._scaledCellWidth, t * this._scaledCellHeight,
                                            i * this._scaledCellWidth, r * this._scaledCellHeight))
                            },
                            e.prototype.fillCharTrueColor =
                            function (e, t, i, r) {
                                this._ctx.font = this._getFont(e, !1, !1),
                                    this._ctx.textBaseline = 'middle', this._clipRow(e, r),
                                    this._ctx.fillText(
                                        t[n.CHAR_DATA_CHAR_INDEX],
                                        i * this._scaledCellWidth + this._scaledCharLeft,
                                        r * this._scaledCellHeight + this._scaledCharTop +
                                        this._scaledCharHeight / 2)
                            },
                            e.prototype.drawChars =
                            function (e, t, i, r, n, s, o, a, l, h, c) {
                                o += e.options.drawBoldTextInBrightColors && l && o < 8 &&
                                    o !== u.INVERTED_DEFAULT_COLOR ?
                                    8 :
                                    0,
                                    this._currentGlyphIdentifier.chars = t,
                                    this._currentGlyphIdentifier.code = i,
                                    this._currentGlyphIdentifier.bg = a,
                                    this._currentGlyphIdentifier.fg = o,
                                    this._currentGlyphIdentifier.bold =
                                    l && e.options.enableBold,
                                    this._currentGlyphIdentifier.dim = h,
                                    this._currentGlyphIdentifier.italic = c,
                                    this._charAtlas &&
                                    this._charAtlas.draw(
                                        this._ctx, this._currentGlyphIdentifier,
                                        n * this._scaledCellWidth + this._scaledCharLeft,
                                        s * this._scaledCellHeight + this._scaledCharTop) ||
                                    this._drawUncachedChars(
                                        e, t, r, o, n, s, l && e.options.enableBold, h, c)
                            },
                            e.prototype._drawUncachedChars =
                            function (e, t, i, r, n, s, o, a, l) {
                                this._ctx.save(),
                                    this._ctx.font = this._getFont(e, o, l),
                                    this._ctx.textBaseline = 'middle',
                                    r === u.INVERTED_DEFAULT_COLOR ?
                                        this._ctx.fillStyle = this._colors.background.css :
                                        h.is256Color(r) ?
                                            this._ctx.fillStyle = this._colors.ansi[r].css :
                                            this._ctx.fillStyle = this._colors.foreground.css,
                                    this._clipRow(e, s),
                                    a && (this._ctx.globalAlpha = u.DIM_OPACITY),
                                    this._ctx.fillText(
                                        t, n * this._scaledCellWidth + this._scaledCharLeft,
                                        s * this._scaledCellHeight + this._scaledCharTop +
                                        this._scaledCharHeight / 2),
                                    this._ctx.restore()
                            },
                            e.prototype._clipRow = function (e, t) {
                                this._ctx.beginPath(),
                                    this._ctx.rect(
                                        0, t * this._scaledCellHeight,
                                        e.cols * this._scaledCellWidth, this._scaledCellHeight),
                                    this._ctx.clip()
                            }, e.prototype._getFont = function (e, t, i) {
                                return (i ? 'italic' : '') + ' ' +
                                    (t ? e.options.fontWeightBold : e.options.fontWeight) +
                                    ' ' + e.options.fontSize * window.devicePixelRatio + 'px ' +
                                    e.options.fontFamily
                            }, e
                    }();
                i.BaseRenderLayer = s
            },
            {
                '../Buffer': 2,
                './atlas/CharAtlasCache': 39,
                './atlas/CharAtlasUtils': 41,
                './atlas/Types': 46
            }
        ],
        30: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var p = e('../Buffer'), r = function () {
                    function c(e) {
                        this._terminal = e, this._characterJoiners = [],
                            this._nextCharacterJoinerId = 0
                    }
                    return c.prototype.registerCharacterJoiner = function (e) {
                        var t = { id: this._nextCharacterJoinerId++, handler: e };
                        return this._characterJoiners.push(t), t.id
                    }, c.prototype.deregisterCharacterJoiner = function (e) {
                        for (var t = 0; t < this._characterJoiners.length; t++)
                            if (this._characterJoiners[t].id === e)
                                return this._characterJoiners.splice(t, 1), !0;
                        return !1
                    }, c.prototype.getJoinedCharacters = function (e) {
                        if (0 === this._characterJoiners.length) return [];
                        var t = this._terminal.buffer.lines.get(e);
                        if (0 === t.length) return [];
                        for (var i = [],
                            r = this._terminal.buffer.translateBufferLineToString(
                                e, !0),
                            n = 0, s = 0, o = 0,
                            a = t.get(0)[p.CHAR_DATA_ATTR_INDEX] >> 9, l = 0;
                            l < this._terminal.cols; l++) {
                            var h = t.get(l), c = h[p.CHAR_DATA_CHAR_INDEX],
                                u = h[p.CHAR_DATA_WIDTH_INDEX],
                                _ = h[p.CHAR_DATA_ATTR_INDEX] >> 9;
                            if (0 !== u) {
                                if (_ !== a) {
                                    if (1 < l - n)
                                        for (var f = this._getJoinedRanges(r, o, s, t, n), d = 0;
                                            d < f.length; d++)
                                            i.push(f[d]);
                                    n = l, o = s, a = _
                                }
                                s += c.length
                            }
                        }
                        if (1 < this._terminal.cols - n)
                            for (f = this._getJoinedRanges(r, o, s, t, n), d = 0;
                                d < f.length; d++)
                                i.push(f[d]);
                        return i
                    }, c.prototype._getJoinedRanges = function (e, t, i, r, n) {
                        for (var s = e.substring(t, i),
                            o = this._characterJoiners[0].handler(s), a = 1;
                            a < this._characterJoiners.length; a++)
                            for (var l = this._characterJoiners[a].handler(s), h = 0;
                                h < l.length; h++)
                                c._mergeRanges(o, l[h]);
                        return this._stringRangesToCellRanges(o, r, n), o
                    }, c.prototype._stringRangesToCellRanges = function (e, t, i) {
                        var r = 0, n = !1, s = 0, o = e[r];
                        if (o) {
                            for (var a = i; a < this._terminal.cols; a++) {
                                var l = t.get(a), h = l[p.CHAR_DATA_WIDTH_INDEX],
                                    c = l[p.CHAR_DATA_CHAR_INDEX].length;
                                if (0 !== h) {
                                    if (!n && o[0] <= s && (o[0] = a, n = !0), o[1] <= s) {
                                        if (o[1] = a, !(o = e[++r])) break;
                                        n = o[0] <= s && (o[0] = a, !0)
                                    }
                                    s += c
                                }
                            }
                            o && (o[1] = this._terminal.cols)
                        }
                    }, c._mergeRanges = function (e, t) {
                        for (var i = !1, r = 0; r < e.length; r++) {
                            var n = e[r];
                            if (i) {
                                if (t[1] <= n[0]) return e[r - 1][1] = t[1], e;
                                if (t[1] <= n[1])
                                    return e[r - 1][1] = Math.max(t[1], n[1]), e.splice(r, 1),
                                        i = !1, e;
                                e.splice(r, 1), r--
                            } else {
                                if (t[1] <= n[0]) return e.splice(r, 0, t), e;
                                if (t[1] <= n[1]) return n[0] = Math.min(t[0], n[0]), e;
                                t[0] < n[1] && (n[0] = Math.min(t[0], n[0]), i = !0)
                            }
                        }
                        return i ? e[e.length - 1][1] = t[1] : e.push(t), e
                    }, c
                }();
                i.CharacterJoinerRegistry = r
            },
            { '../Buffer': 2 }
        ],
        31: [
            function (e, t, r) {
                'use strict';
                Object.defineProperty(r, '__esModule', { value: !0 });
                var n = h('#ffffff'), s = h('#000000'), o = h('#ffffff'),
                    a = h('#000000'),
                    l = { css: 'rgba(255, 255, 255, 0.3)', rgba: 4294967159 };
                function h(e) {
                    return {
                        css: e, rgba: parseInt(e.slice(1), 16) << 8 | 255
                    }
                }
                function c(e) {
                    var t = e.toString(16);
                    return t.length < 2 ? '0' + t : t
                }
                r.DEFAULT_ANSI_COLORS = function () {
                    for (var e =
                        [
                            h('#2e3436'), h('#cc0000'), h('#4e9a06'), h('#c4a000'),
                            h('#3465a4'), h('#75507b'), h('#06989a'), h('#d3d7cf'),
                            h('#555753'), h('#ef2929'), h('#8ae234'), h('#fce94f'),
                            h('#729fcf'), h('#ad7fa8'), h('#34e2e2'), h('#eeeeec')
                        ],
                        t = [0, 95, 135, 175, 215, 255], i = 0;
                        i < 216; i++) {
                        var r = t[i / 36 % 6 | 0], n = t[i / 6 % 6 | 0], s = t[i % 6];
                        e.push({
                            css: '#' + c(r) + c(n) + c(s),
                            rgba: (r << 24 | n << 16 | s << 8 | 255) >>> 0
                        })
                    }
                    for (i = 0; i < 24; i++) {
                        var o = 8 + 10 * i, a = c(o);
                        e.push({
                            css: '#' + a + a + a,
                            rgba: (o << 24 | o << 16 | o << 8 | 255) >>> 0
                        })
                    }
                    return e
                }();
                var i = function () {
                    function e(e, t) {
                        this.allowTransparency = t;
                        var i = e.createElement('canvas');
                        i.width = 1, i.height = 1, this._ctx = i.getContext('2d'),
                            this._ctx.globalCompositeOperation = 'copy',
                            this._litmusColor = this._ctx.createLinearGradient(0, 0, 1, 1),
                            this.colors = {
                                foreground: n,
                                background: s,
                                cursor: o,
                                cursorAccent: a,
                                selection: l,
                                ansi: r.DEFAULT_ANSI_COLORS.slice()
                            }
                    }
                    return e.prototype.setTheme = function (e) {
                        this.colors
                            .foreground = this._parseColor(e.foreground, n),
                            this.colors.background = this._parseColor(e.background, s),
                            this.colors.cursor = this._parseColor(e.cursor, o, !0),
                            this.colors.cursorAccent = this._parseColor(e.cursorAccent, a, !0),
                            this.colors.selection = this._parseColor(e.selection, l, !0),
                            this.colors.ansi[0] = this._parseColor(e.black, r.DEFAULT_ANSI_COLORS[0]),
                            this.colors.ansi[1] = this._parseColor(e.red, r.DEFAULT_ANSI_COLORS[1]),
                            this.colors.ansi[2] = this._parseColor(e.green, r.DEFAULT_ANSI_COLORS[2]),
                            this.colors.ansi[3] = this._parseColor(e.yellow, r.DEFAULT_ANSI_COLORS[3]),
                            this.colors.ansi[4] = this._parseColor(e.blue, r.DEFAULT_ANSI_COLORS[4]),
                            this.colors.ansi[5] =
                            this._parseColor(e.magenta, r.DEFAULT_ANSI_COLORS[5]),
                            this.colors.ansi[6] = this._parseColor(e.cyan, r.DEFAULT_ANSI_COLORS[6]),
                            this.colors.ansi[7] = this._parseColor(e.white, r.DEFAULT_ANSI_COLORS[7]),
                            this.colors.ansi[8] =
                            this._parseColor(e.brightBlack, r.DEFAULT_ANSI_COLORS[8]),
                            this.colors.ansi[9] =
                            this._parseColor(e.brightRed, r.DEFAULT_ANSI_COLORS[9]),
                            this.colors.ansi[10] =
                            this._parseColor(e.brightGreen, r.DEFAULT_ANSI_COLORS[10]),
                            this.colors.ansi[11] =
                            this._parseColor(e.brightYellow, r.DEFAULT_ANSI_COLORS[11]),
                            this.colors.ansi[12] =
                            this._parseColor(e.brightBlue, r.DEFAULT_ANSI_COLORS[12]),
                            this.colors.ansi[13] =
                            this._parseColor(e.brightMagenta, r.DEFAULT_ANSI_COLORS[13]),
                            this.colors.ansi[14] =
                            this._parseColor(e.brightCyan, r.DEFAULT_ANSI_COLORS[14]),
                            this.colors.ansi[15] =
                            this._parseColor(e.brightWhite, r.DEFAULT_ANSI_COLORS[15])
                    }, e.prototype._parseColor = function (e, t, i) {
                        if (void 0 === i && (i = this.allowTransparency), !e) return t;
                        if (this._ctx.fillStyle = this._litmusColor,
                            this._ctx.fillStyle = e, 'string' != typeof this._ctx.fillStyle)
                            return console.warn(
                                'Color: ' + e + ' is invalid using fallback ' + t.css),
                                t;
                        this._ctx.fillRect(0, 0, 1, 1);
                        var r = this._ctx.getImageData(0, 0, 1, 1).data;
                        return i || 255 === r[3] ?
                            {
                                css: e,
                                rgba: (r[0] << 24 | r[1] << 16 | r[2] << 8 | r[3]) >>> 0
                            } :
                            (console.warn(
                                'Color: ' + e +
                                ' is using transparency, but allowTransparency is false. Using fallback ' +
                                t.css + '.'),
                                t)
                    }, e
                }();
                r.ColorManager = i
            },
            {}
        ],
        32: [
            function (e, t, i) {
                'use strict';
                var r,
                    s = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var o = e('../Buffer'), n = e('./BaseRenderLayer'), a = function (n) {
                    function e(e, t, i) {
                        var r = n.call(this, e, 'cursor', t, !0, i) || this;
                        return r._state = {
                            x: null,
                            y: null,
                            isFocused: null,
                            style: null,
                            width: null
                        },
                            r._cursorRenderers = {
                                bar: r._renderBarCursor.bind(r),
                                block: r._renderBlockCursor.bind(r),
                                underline: r._renderUnderlineCursor.bind(r)
                            },
                            r
                    }
                    return s(e, n), e.prototype.resize = function (e, t) {
                        n.prototype.resize.call(this, e, t), this._state = {
                            x: null,
                            y: null,
                            isFocused: null,
                            style: null,
                            width: null
                        }
                    }, e.prototype.reset = function (e) {
                        this._clearCursor(),
                            this._cursorBlinkStateManager &&
                            (this._cursorBlinkStateManager.dispose(),
                                this._cursorBlinkStateManager = null, this.onOptionsChanged(e))
                    }, e.prototype.onBlur = function (e) {
                        this._cursorBlinkStateManager &&
                            this._cursorBlinkStateManager.pause(),
                            e.refresh(e.buffer.y, e.buffer.y)
                    }, e.prototype.onFocus = function (e) {
                        this._cursorBlinkStateManager ?
                            this._cursorBlinkStateManager.resume(e) :
                            e.refresh(e.buffer.y, e.buffer.y)
                    }, e.prototype.onOptionsChanged = function (e) {
                        var t = this;
                        e.options.cursorBlink ?
                            this._cursorBlinkStateManager ||
                            (this._cursorBlinkStateManager = new l(
                                e,
                                function () {
                                    t._render(e, !0)
                                })) :
                            (this._cursorBlinkStateManager &&
                                (this._cursorBlinkStateManager.dispose(),
                                    this._cursorBlinkStateManager = null),
                                e.refresh(e.buffer.y, e.buffer.y))
                    }, e.prototype.onCursorMove = function (e) {
                        this._cursorBlinkStateManager &&
                            this._cursorBlinkStateManager.restartBlinkAnimation(e)
                    }, e.prototype.onGridChanged = function (e, t, i) {
                        !this._cursorBlinkStateManager ||
                            this._cursorBlinkStateManager.isPaused ?
                            this._render(e, !1) :
                            this._cursorBlinkStateManager.restartBlinkAnimation(e)
                    }, e.prototype._render = function (e, t) {
                        if (e.cursorState && !e.cursorHidden) {
                            var i = e.buffer.ybase + e.buffer.y, r = i - e.buffer.ydisp;
                            if (r < 0 || r >= e.rows)
                                this._clearCursor();
                            else {
                                var n = e.buffer.lines.get(i).get(e.buffer.x);
                                if (n) {
                                    if (!e.isFocused)
                                        return this._clearCursor(), this._ctx.save(),
                                            this._ctx.fillStyle = this._colors.cursor.css,
                                            this._renderBlurCursor(e, e.buffer.x, r, n),
                                            this._ctx.restore(), this._state.x = e.buffer.x,
                                            this._state.y = r, this._state.isFocused = !1,
                                            this._state.style = e.options.cursorStyle,
                                            void (
                                                this._state.width = n[o.CHAR_DATA_WIDTH_INDEX]);
                                    if (!this._cursorBlinkStateManager ||
                                        this._cursorBlinkStateManager.isCursorVisible) {
                                        if (this._state) {
                                            if (this._state.x === e.buffer.x && this._state.y === r &&
                                                this._state.isFocused === e.isFocused &&
                                                this._state.style === e.options.cursorStyle &&
                                                this._state.width === n[o.CHAR_DATA_WIDTH_INDEX])
                                                return;
                                            this._clearCursor()
                                        }
                                        this._ctx.save(),
                                            this._cursorRenderers[e.options.cursorStyle || 'block'](
                                                e, e.buffer.x, r, n),
                                            this._ctx.restore(),
                                            this._state.x = e.buffer.x, this._state.y = r,
                                            this._state.isFocused = !1,
                                            this._state.style = e.options.cursorStyle,
                                            this._state.width = n[o.CHAR_DATA_WIDTH_INDEX]
                                    } else
                                        this._clearCursor()
                                }
                            }
                        } else
                            this._clearCursor()
                    }, e.prototype._clearCursor = function () {
                        this._state &&
                            (this.clearCells(
                                this._state.x, this._state.y, this._state.width, 1),
                                this._state = {
                                    x: null,
                                    y: null,
                                    isFocused: null,
                                    style: null,
                                    width: null
                                })
                    }, e.prototype._renderBarCursor = function (e, t, i, r) {
                        this._ctx.save(), this._ctx.fillStyle = this._colors.cursor.css,
                            this.fillLeftLineAtCell(t, i), this._ctx.restore()
                    }, e.prototype._renderBlockCursor = function (e, t, i, r) {
                        this._ctx.save(),
                            this._ctx.fillStyle = this._colors.cursor.css,
                            this.fillCells(t, i, r[o.CHAR_DATA_WIDTH_INDEX], 1),
                            this._ctx.fillStyle = this._colors.cursorAccent.css,
                            this.fillCharTrueColor(e, r, t, i), this._ctx.restore()
                    }, e.prototype._renderUnderlineCursor = function (e, t, i, r) {
                        this._ctx.save(), this._ctx.fillStyle = this._colors.cursor.css,
                            this.fillBottomLineAtCells(t, i),
                            this._ctx.restore()
                    }, e.prototype._renderBlurCursor = function (e, t, i, r) {
                        this._ctx.save(),
                            this._ctx.strokeStyle = this._colors.cursor.css,
                            this.strokeRectAtCell(t, i, r[o.CHAR_DATA_WIDTH_INDEX], 1),
                            this._ctx.restore()
                    }, e
                }(n.BaseRenderLayer);
                i.CursorRenderLayer = a;
                var l = function () {
                    function e(e, t) {
                        this._renderCallback = t, this.isCursorVisible = !0,
                            e.isFocused && this._restartInterval()
                    }
                    return Object.defineProperty(e.prototype, 'isPaused', {
                        get: function () {
                            return !(this._blinkStartTimeout || this._blinkInterval)
                        },
                        enumerable: !0,
                        configurable: !0
                    }),
                        e.prototype.dispose = function () {
                            this._blinkInterval &&
                                (window.clearInterval(this._blinkInterval),
                                    this._blinkInterval = null),
                                this._blinkStartTimeout &&
                                (window.clearTimeout(this._blinkStartTimeout),
                                    this._blinkStartTimeout = null),
                                this._animationFrame &&
                                (window.cancelAnimationFrame(this._animationFrame),
                                    this._animationFrame = null)
                        }, e.prototype.restartBlinkAnimation = function (e) {
                            var t = this;
                            this.isPaused ||
                                (this._animationTimeRestarted = Date.now(),
                                    this.isCursorVisible = !0,
                                    this._animationFrame ||
                                    (this._animationFrame =
                                        window.requestAnimationFrame(function () {
                                            t._renderCallback(), t._animationFrame = null
                                        })))
                        }, e.prototype._restartInterval = function (e) {
                            var t = this;
                            void 0 === e && (e = 600),
                                this._blinkInterval &&
                                window.clearInterval(this._blinkInterval),
                                this._blinkStartTimeout = setTimeout(function () {
                                    if (t._animationTimeRestarted) {
                                        var e =
                                            600 - (Date.now() - t._animationTimeRestarted);
                                        if (t._animationTimeRestarted = null, 0 < e)
                                            return void t._restartInterval(e)
                                    }
                                    t.isCursorVisible = !1,
                                        t._animationFrame =
                                        window.requestAnimationFrame(function () {
                                            t._renderCallback(), t._animationFrame = null
                                        }),
                                        t._blinkInterval = setInterval(function () {
                                            if (t._animationTimeRestarted) {
                                                var e =
                                                    600 - (Date.now() - t._animationTimeRestarted);
                                                return t._animationTimeRestarted = null,
                                                    void t._restartInterval(e)
                                            }
                                            t.isCursorVisible = !t.isCursorVisible,
                                                t._animationFrame =
                                                window.requestAnimationFrame(function () {
                                                    t._renderCallback(), t._animationFrame = null
                                                })
                                        }, 600)
                                }, e)
                        }, e.prototype.pause = function () {
                            this.isCursorVisible = !0,
                                this._blinkInterval &&
                                (window.clearInterval(this._blinkInterval),
                                    this._blinkInterval = null),
                                this._blinkStartTimeout &&
                                (window.clearTimeout(this._blinkStartTimeout),
                                    this._blinkStartTimeout = null),
                                this._animationFrame &&
                                (window.cancelAnimationFrame(this._animationFrame),
                                    this._animationFrame = null)
                        }, e.prototype.resume = function (e) {
                            this._animationTimeRestarted = null, this._restartInterval(),
                                this.restartBlinkAnimation(e)
                        }, e
                }()
            },
            { '../Buffer': 2, './BaseRenderLayer': 29 }
        ],
        33: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = function () {
                    function e() {
                        this.cache = []
                    }
                    return e.prototype.resize = function (e, t) {
                        for (var i = 0; i < e; i++) {
                            this.cache.length <= i && this.cache.push([]);
                            for (var r = this.cache[i].length; r < t; r++)
                                this.cache[i].push(null);
                            this.cache[i].length = t
                        }
                        this.cache.length = e
                    }, e.prototype.clear = function () {
                        for (var e = 0; e < this.cache.length; e++)
                            for (var t = 0; t < this.cache[e].length; t++)
                                this.cache[e][t] = null
                    }, e
                }();
                i.GridCache = r
            },
            {}
        ],
        34: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = e('./BaseRenderLayer'), o = e('./atlas/Types'),
                    a = e('./atlas/CharAtlasUtils'), l = function (s) {
                        function e(e, t, i, r) {
                            var n = s.call(this, e, 'link', t, !0, i) || this;
                            return n._state = null,
                                r.linkifier.on('linkhover', function (e) {
                                    return n._onLinkHover(e)
                                }), r.linkifier.on('linkleave', function (e) {
                                    return n._onLinkLeave(e)
                                }), n
                        }
                        return n(e, s), e.prototype.resize = function (e, t) {
                            s.prototype.resize.call(this, e, t), this._state = null
                        }, e.prototype.reset = function (e) {
                            this._clearCurrentLink()
                        }, e.prototype._clearCurrentLink = function () {
                            if (this._state) {
                                this.clearCells(
                                    this._state.x1, this._state.y1,
                                    this._state.cols - this._state.x1, 1);
                                var e = this._state.y2 - this._state.y1 - 1;
                                0 < e &&
                                    this.clearCells(
                                        0, this._state.y1 + 1, this._state.cols, e),
                                    this.clearCells(0, this._state.y2, this._state.x2, 1),
                                    this._state = null
                            }
                        }, e.prototype._onLinkHover = function (e) {
                            if (e.fg === o.INVERTED_DEFAULT_COLOR ?
                                this._ctx.fillStyle = this._colors.background.css :
                                a.is256Color(e.fg) ?
                                    this._ctx.fillStyle = this._colors.ansi[e.fg].css :
                                    this._ctx.fillStyle = this._colors.foreground.css,
                                e.y1 === e.y2)
                                this.fillBottomLineAtCells(e.x1, e.y1, e.x2 - e.x1);
                            else {
                                this.fillBottomLineAtCells(e.x1, e.y1, e.cols - e.x1);
                                for (var t = e.y1 + 1; t < e.y2; t++)
                                    this.fillBottomLineAtCells(0, t, e.cols);
                                this.fillBottomLineAtCells(0, e.y2, e.x2)
                            }
                            this._state = e
                        }, e.prototype._onLinkLeave = function (e) {
                            this._clearCurrentLink()
                        }, e
                    }(s.BaseRenderLayer);
                i.LinkRenderLayer = l
            },
            {
                './BaseRenderLayer': 29,
                './atlas/CharAtlasUtils': 41,
                './atlas/Types': 46
            }
        ],
        35: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var o = e('./TextRenderLayer'), a = e('./SelectionRenderLayer'),
                    l = e('./CursorRenderLayer'), h = e('./ColorManager'),
                    c = e('./LinkRenderLayer'), s = e('../common/EventEmitter'),
                    u = e('../ui/RenderDebouncer'), _ = e('../ui/ScreenDprMonitor'),
                    f = e('../renderer/CharacterJoinerRegistry'), d = function (s) {
                        function e(e, t) {
                            var i = s.call(this) || this;
                            i._terminal = e, i._isPaused = !1, i._needsFullRefresh = !1;
                            var r = i._terminal.options.allowTransparency;
                            if (i.colorManager = new h.ColorManager(document, r),
                                i._characterJoinerRegistry =
                                new f.CharacterJoinerRegistry(e),
                                t && i.colorManager.setTheme(t),
                                i._renderLayers =
                                [
                                    new o.TextRenderLayer(
                                        i._terminal.screenElement, 0,
                                        i.colorManager.colors, i._characterJoinerRegistry,
                                        r),
                                    new a.SelectionRenderLayer(
                                        i._terminal.screenElement, 1,
                                        i.colorManager.colors),
                                    new c.LinkRenderLayer(
                                        i._terminal.screenElement, 2,
                                        i.colorManager.colors, i._terminal),
                                    new l.CursorRenderLayer(
                                        i._terminal.screenElement, 3,
                                        i.colorManager.colors)
                                ],
                                i.dimensions = {
                                    scaledCharWidth: null,
                                    scaledCharHeight: null,
                                    scaledCellWidth: null,
                                    scaledCellHeight: null,
                                    scaledCharLeft: null,
                                    scaledCharTop: null,
                                    scaledCanvasWidth: null,
                                    scaledCanvasHeight: null,
                                    canvasWidth: null,
                                    canvasHeight: null,
                                    actualCellWidth: null,
                                    actualCellHeight: null
                                },
                                i._devicePixelRatio = window.devicePixelRatio,
                                i._updateDimensions(), i.onOptionsChanged(),
                                i._renderDebouncer = new u.RenderDebouncer(
                                    i._terminal, i._renderRows.bind(i)),
                                i._screenDprMonitor = new _.ScreenDprMonitor,
                                i._screenDprMonitor.setListener(function () {
                                    return i.onWindowResize(window.devicePixelRatio)
                                }),
                                i.register(i._screenDprMonitor),
                                'IntersectionObserver' in window) {
                                var n = new IntersectionObserver(function (e) {
                                    return i.onIntersectionChange(e[e.length - 1])
                                }, { threshold: 0 });
                                n.observe(i._terminal.element), i.register({
                                    dispose: function () {
                                        return n.disconnect()
                                    }
                                })
                            }
                            return i
                        }
                        return n(e, s), e.prototype.dispose = function () {
                            s.prototype.dispose.call(this),
                                this._renderLayers.forEach(function (e) {
                                    return e.dispose()
                                })
                        }, e.prototype.onIntersectionChange = function (e) {
                            this._isPaused = 0 === e.intersectionRatio,
                                !this._isPaused && this._needsFullRefresh &&
                                this._terminal.refresh(0, this._terminal.rows - 1)
                        }, e.prototype.onWindowResize = function (e) {
                            this._devicePixelRatio !== e &&
                                (this._devicePixelRatio = e,
                                    this.onResize(this._terminal.cols, this._terminal.rows))
                        }, e.prototype.setTheme = function (e) {
                            var t = this;
                            return this.colorManager.setTheme(e),
                                this._renderLayers.forEach(function (e) {
                                    e.onThemeChanged(t._terminal, t.colorManager.colors),
                                        e.reset(t._terminal)
                                }),
                                this._isPaused ?
                                    this._needsFullRefresh = !0 :
                                    this._terminal.refresh(0, this._terminal.rows - 1),
                                this.colorManager.colors
                        }, e.prototype.onResize = function (e, t) {
                            var i = this;
                            this._updateDimensions(),
                                this._renderLayers.forEach(function (e) {
                                    return e.resize(i._terminal, i.dimensions)
                                }),
                                this._isPaused ?
                                    this._needsFullRefresh = !0 :
                                    this._terminal.refresh(0, this._terminal.rows - 1),
                                this._terminal.screenElement.style.width =
                                this.dimensions.canvasWidth + 'px',
                                this._terminal.screenElement.style.height =
                                this.dimensions.canvasHeight + 'px',
                                this.emit('resize', {
                                    width: this.dimensions.canvasWidth,
                                    height: this.dimensions.canvasHeight
                                })
                        }, e.prototype.onCharSizeChanged = function () {
                            this.onResize(this._terminal.cols, this._terminal.rows)
                        }, e.prototype.onBlur = function () {
                            var t = this;
                            this._runOperation(function (e) {
                                return e.onBlur(t._terminal)
                            })
                        }, e.prototype.onFocus = function () {
                            var t = this;
                            this._runOperation(function (e) {
                                return e.onFocus(t._terminal)
                            })
                        }, e.prototype.onSelectionChanged = function (t, i, r) {
                            var n = this;
                            void 0 === r && (r = !1), this._runOperation(function (e) {
                                return e.onSelectionChanged(n._terminal, t, i, r)
                            })
                        }, e.prototype.onCursorMove = function () {
                            var t = this;
                            this._runOperation(function (e) {
                                return e.onCursorMove(t._terminal)
                            })
                        }, e.prototype.onOptionsChanged = function () {
                            var t = this;
                            this.colorManager.allowTransparency =
                                this._terminal.options.allowTransparency,
                                this._runOperation(function (e) {
                                    return e.onOptionsChanged(t._terminal)
                                })
                        }, e.prototype.clear = function () {
                            var t = this;
                            this._runOperation(function (e) {
                                return e.reset(t._terminal)
                            })
                        }, e.prototype._runOperation = function (t) {
                            this._isPaused ? this._needsFullRefresh = !0 :
                                this._renderLayers.forEach(function (e) {
                                    return t(e)
                                })
                        }, e.prototype.refreshRows = function (e, t) {
                            this._isPaused ? this._needsFullRefresh = !0 :
                                this._renderDebouncer.refresh(e, t)
                        }, e.prototype._renderRows = function (t, i) {
                            var r = this;
                            this._renderLayers.forEach(function (e) {
                                return e.onGridChanged(r._terminal, t, i)
                            }),
                                this._terminal.emit('refresh', { start: t, end: i })
                        }, e.prototype._updateDimensions = function () {
                            this._terminal.charMeasure.width &&
                                this._terminal.charMeasure.height &&
                                (this.dimensions.scaledCharWidth = Math.floor(
                                    this._terminal.charMeasure.width *
                                    window.devicePixelRatio),
                                    this.dimensions.scaledCharHeight = Math.ceil(
                                        this._terminal.charMeasure.height *
                                        window.devicePixelRatio),
                                    this.dimensions.scaledCellHeight = Math.floor(
                                        this.dimensions.scaledCharHeight *
                                        this._terminal.options.lineHeight),
                                    this.dimensions.scaledCharTop =
                                    1 === this._terminal.options.lineHeight ?
                                        0 :
                                        Math.round(
                                            (this.dimensions.scaledCellHeight -
                                                this.dimensions.scaledCharHeight) /
                                            2),
                                    this.dimensions.scaledCellWidth =
                                    this.dimensions.scaledCharWidth +
                                    Math.round(this._terminal.options.letterSpacing),
                                    this.dimensions.scaledCharLeft =
                                    Math.floor(this._terminal.options.letterSpacing / 2),
                                    this.dimensions.scaledCanvasHeight =
                                    this._terminal.rows * this.dimensions.scaledCellHeight,
                                    this.dimensions.scaledCanvasWidth =
                                    this._terminal.cols * this.dimensions.scaledCellWidth,
                                    this.dimensions.canvasHeight = Math.round(
                                        this.dimensions.scaledCanvasHeight /
                                        window.devicePixelRatio),
                                    this.dimensions.canvasWidth = Math.round(
                                        this.dimensions.scaledCanvasWidth /
                                        window.devicePixelRatio),
                                    this.dimensions.actualCellHeight =
                                    this.dimensions.canvasHeight / this._terminal.rows,
                                    this.dimensions.actualCellWidth =
                                    this.dimensions.canvasWidth / this._terminal.cols)
                        }, e.prototype.registerCharacterJoiner = function (e) {
                            return this._characterJoinerRegistry.registerCharacterJoiner(e)
                        }, e.prototype.deregisterCharacterJoiner = function (e) {
                            return this._characterJoinerRegistry.deregisterCharacterJoiner(
                                e)
                        }, e
                    }(s.EventEmitter);
                i.Renderer = d
            },
            {
                '../common/EventEmitter': 19,
                '../renderer/CharacterJoinerRegistry': 30,
                '../ui/RenderDebouncer': 54,
                '../ui/ScreenDprMonitor': 55,
                './ColorManager': 31,
                './CursorRenderLayer': 32,
                './LinkRenderLayer': 34,
                './SelectionRenderLayer': 36,
                './TextRenderLayer': 37
            }
        ],
        36: [
            function (e, t, i) {
                'use strict';
                var r,
                    s = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var n = function (n) {
                    function e(e, t, i) {
                        var r = n.call(this, e, 'selection', t, !0, i) || this;
                        return r._clearState(), r
                    }
                    return s(e, n), e.prototype._clearState = function () {
                        this._state = {
                            start: null,
                            end: null,
                            columnSelectMode: null,
                            ydisp: null
                        }
                    }, e.prototype.resize = function (e, t) {
                        n.prototype.resize.call(this, e, t), this._clearState()
                    }, e.prototype.reset = function (e) {
                        this._state.start && this._state.end &&
                            (this._clearState(), this.clearAll())
                    }, e.prototype.onSelectionChanged = function (e, t, i, r) {
                        if (this._didStateChange(t, i, r, e.buffer.ydisp))
                            if (this.clearAll(), t && i) {
                                var n = t[1] - e.buffer.ydisp, s = i[1] - e.buffer.ydisp,
                                    o = Math.max(n, 0), a = Math.min(s, e.rows - 1);
                                if (!(o >= e.rows || a < 0)) {
                                    if (this._ctx.fillStyle = this._colors.selection.css, r) {
                                        var l = t[0], h = i[0] - l, c = a - o + 1;
                                        this.fillCells(l, o, h, c)
                                    } else {
                                        l = n === o ? t[0] : 0;
                                        var u = o === a ? i[0] : e.cols;
                                        this.fillCells(l, o, u - l, 1);
                                        var _ = Math.max(a - o - 1, 0);
                                        if (this.fillCells(0, o + 1, e.cols, _), o !== a) {
                                            var f = s === a ? i[0] : e.cols;
                                            this.fillCells(0, a, f, 1)
                                        }
                                    }
                                    this._state.start = [t[0], t[1]],
                                        this._state.end = [i[0], i[1]],
                                        this._state.columnSelectMode = r,
                                        this._state.ydisp = e.buffer.ydisp
                                }
                            } else
                                this._clearState()
                    }, e.prototype._didStateChange = function (e, t, i, r) {
                        return !this._areCoordinatesEqual(e, this._state.start) ||
                            !this._areCoordinatesEqual(t, this._state.end) ||
                            i !== this._state.columnSelectMode || r !== this._state.ydisp
                    }, e.prototype._areCoordinatesEqual = function (e, t) {
                        return !(!e || !t) && (e[0] === t[0] && e[1] === t[1])
                    }, e
                }(e('./BaseRenderLayer').BaseRenderLayer);
                i.SelectionRenderLayer = n
            },
            { './BaseRenderLayer': 29 }
        ],
        37: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var w = e('../Buffer'), L = e('./atlas/Types'), a = e('./GridCache'),
                    s = e('./BaseRenderLayer'), p = e('./atlas/CharAtlasUtils'),
                    o = function (o) {
                        function e(e, t, i, r, n) {
                            var s = o.call(this, e, 'text', t, n, i) || this;
                            return s._characterOverlapCache = {},
                                s._state = new a.GridCache,
                                s._characterJoinerRegistry = r, s
                        }
                        return n(e, o), e.prototype.resize = function (e, t) {
                            o.prototype.resize.call(this, e, t);
                            var i = this._getFont(e, !1, !1);
                            this._characterWidth === t.scaledCharWidth &&
                                this._characterFont === i ||
                                (this._characterWidth = t.scaledCharWidth,
                                    this._characterFont = i, this._characterOverlapCache = {}),
                                this._state.clear(), this._state.resize(e.cols, e.rows)
                        }, e.prototype.reset = function (e) {
                            this._state.clear(), this.clearAll()
                        }, e.prototype._forEachCell = function (e, t, i, r, n) {
                            for (var s = t; s <= i; s++)
                                for (var o = s + e.buffer.ydisp, a = e.buffer.lines.get(o),
                                    l = r ? r.getJoinedCharacters(o) : [], h = 0;
                                    h < e.cols; h++) {
                                    var c = a.get(h),
                                        u = c[w.CHAR_DATA_CODE_INDEX] || w.WHITESPACE_CELL_CODE,
                                        _ = c[w.CHAR_DATA_CHAR_INDEX] || w.WHITESPACE_CELL_CHAR,
                                        f = c[w.CHAR_DATA_ATTR_INDEX],
                                        d = c[w.CHAR_DATA_WIDTH_INDEX], p = !1, m = h;
                                    if (0 !== d) {
                                        if (0 < l.length && h === l[0][0]) {
                                            p = !0;
                                            var y = l.shift();
                                            _ = e.buffer.translateBufferLineToString(
                                                o, !0, y[0], y[1]),
                                                d = y[1] - y[0], u = 1 / 0, m = y[1] - 1
                                        }
                                        !p && this._isOverlapping(c) && m < a.length - 1 &&
                                            a.get(m + 1)[w.CHAR_DATA_CODE_INDEX] ===
                                            w.NULL_CELL_CODE &&
                                            (d = 2);
                                        var C = f >> 18, g = 511 & f, v = f >> 9 & 511;
                                        if (8 & C) {
                                            var b = g;
                                            g = v,
                                                (v = b) === L.DEFAULT_COLOR &&
                                                (v = L.INVERTED_DEFAULT_COLOR),
                                                g === L.DEFAULT_COLOR && (g = L.INVERTED_DEFAULT_COLOR)
                                        }
                                        n(u, _, d, h, s, v, g, C), h = m
                                    }
                                }
                        }, e.prototype._drawBackground = function (e, t, i) {
                            var h = this, c = this._ctx, u = e.cols, _ = 0, f = 0, d = null;
                            c.save(),
                                this._forEachCell(
                                    e, t, i, null,
                                    function (e, t, i, r, n, s, o, a) {
                                        var l = null;
                                        o === L.INVERTED_DEFAULT_COLOR ?
                                            l = h._colors.foreground.css :
                                            p.is256Color(o) && (l = h._colors.ansi[o].css),
                                            null === d && (_ = r, f = n),
                                            n !== f ?
                                                (c.fillStyle = d, h.fillCells(_, f, u - _, 1),
                                                    _ = r, f = n) :
                                                d !== l &&
                                                (c.fillStyle = d, h.fillCells(_, f, r - _, 1),
                                                    _ = r, f = n),
                                            d = l
                                    }),
                                null !== d &&
                                (c.fillStyle = d, this.fillCells(_, f, u - _, 1)),
                                c.restore()
                        }, e.prototype._drawForeground = function (l, e, t) {
                            var h = this;
                            this._forEachCell(
                                l, e, t, this._characterJoinerRegistry,
                                function (e, t, i, r, n, s, o, a) {
                                    16 & a ||
                                        (2 & a &&
                                            (h._ctx.save(),
                                                s === L.INVERTED_DEFAULT_COLOR ?
                                                    h._ctx.fillStyle =
                                                    h._colors.background.css :
                                                    p.is256Color(s) ?
                                                        h._ctx.fillStyle = h._colors.ansi[s].css :
                                                        h._ctx.fillStyle = h._colors.foreground.css,
                                                h.fillBottomLineAtCells(r, n, i),
                                                h._ctx.restore()),
                                            h.drawChars(
                                                l, t, e, i, r, n, s, o, !!(1 & a), !!(32 & a),
                                                !!(64 & a)))
                                })
                        }, e.prototype.onGridChanged = function (e, t, i) {
                            0 !== this._state.cache.length &&
                                (this._charAtlas && this._charAtlas.beginFrame(),
                                    this.clearCells(0, t, e.cols, i - t + 1),
                                    this._drawBackground(e, t, i),
                                    this._drawForeground(e, t, i))
                        }, e.prototype.onOptionsChanged = function (e) {
                            this.setTransparency(e, e.options.allowTransparency)
                        }, e.prototype._isOverlapping = function (e) {
                            if (1 !== e[w.CHAR_DATA_WIDTH_INDEX]) return !1;
                            if (e[w.CHAR_DATA_CODE_INDEX] < 256) return !1;
                            var t = e[w.CHAR_DATA_CHAR_INDEX];
                            if (this._characterOverlapCache.hasOwnProperty(t))
                                return this._characterOverlapCache[t];
                            this._ctx.save(), this._ctx.font = this._characterFont;
                            var i = Math.floor(this._ctx.measureText(t).width) >
                                this._characterWidth;
                            return this._ctx.restore(), this._characterOverlapCache[t] = i
                        }, e
                    }(s.BaseRenderLayer);
                i.TextRenderLayer = o
            },
            {
                '../Buffer': 2,
                './BaseRenderLayer': 29,
                './GridCache': 33,
                './atlas/CharAtlasUtils': 41,
                './atlas/Types': 46
            }
        ],
        38: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = function () {
                    function e() {
                        this._didWarmUp = !1
                    }
                    return e.prototype.dispose = function () { },
                        e.prototype.warmUp =
                        function () {
                            this._didWarmUp || (this._doWarmUp(), this._didWarmUp = !0)
                        },
                        e.prototype._doWarmUp = function () { },
                        e.prototype.beginFrame = function () { }, e
                }();
                i.default = r
            },
            {}
        ],
        39: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var h = e('./CharAtlasUtils'), r = e('./DynamicCharAtlas'),
                    n = e('./NoneCharAtlas'), s = e('./StaticCharAtlas'),
                    c = { none: n.default, static: s.default, dynamic: r.default },
                    u = [];
                i.acquireCharAtlas = function (e, t, i, r) {
                    for (var n = h.generateConfig(i, r, e, t), s = 0; s < u.length; s++) {
                        var o = (a = u[s]).ownedBy.indexOf(e);
                        if (0 <= o) {
                            if (h.configEquals(a.config, n)) return a.atlas;
                            1 === a.ownedBy.length ? (a.atlas.dispose(), u.splice(s, 1)) :
                                a.ownedBy.splice(o, 1);
                            break
                        }
                    }
                    for (s = 0; s < u.length; s++) {
                        var a = u[s];
                        if (h.configEquals(a.config, n)) return a.ownedBy.push(e), a.atlas
                    }
                    var l = {
                        atlas: new c[e.options.experimentalCharAtlas](document, n),
                        config: n,
                        ownedBy: [e]
                    };
                    return u.push(l), l.atlas
                }, i.removeTerminalFromCache = function (e) {
                    for (var t = 0; t < u.length; t++) {
                        var i = u[t].ownedBy.indexOf(e);
                        if (-1 !== i) {
                            1 === u[t].ownedBy.length ?
                                (u[t].atlas.dispose(), u.splice(t, 1)) :
                                u[t].ownedBy.splice(i, 1);
                            break
                        }
                    }
                }
            },
            {
                './CharAtlasUtils': 41,
                './DynamicCharAtlas': 42,
                './NoneCharAtlas': 44,
                './StaticCharAtlas': 45
            }
        ],
        40: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var u = e('../../core/Platform'), _ = e('./Types');
                function f(e, t) {
                    for (var i = !0, r = t.rgba >>> 24, n = t.rgba >>> 16 & 255,
                        s = t.rgba >>> 8 & 255, o = 0;
                        o < e.data.length; o += 4)
                        e.data[o] === r && e.data[o + 1] === n && e.data[o + 2] === s ?
                            e.data[o + 3] = 0 :
                            i = !1;
                    return i
                }
                function d(e, t) {
                    return e + ' ' + t.fontSize * t.devicePixelRatio + 'px ' +
                        t.fontFamily
                }
                i.generateStaticCharAtlasTexture = function (e, t, i) {
                    var r = i.scaledCharWidth + _.CHAR_ATLAS_CELL_SPACING,
                        n = i.scaledCharHeight + _.CHAR_ATLAS_CELL_SPACING,
                        s = t(255 * r, 34 * n),
                        o = s.getContext('2d', { alpha: i.allowTransparency });
                    o.fillStyle = i.colors.background.css,
                        o.fillRect(0, 0, s.width, s.height), o.save(),
                        o.fillStyle = i.colors.foreground.css, o.font = d(i.fontWeight, i),
                        o.textBaseline = 'middle';
                    for (var a = 0; a < 256; a++)
                        o.save(), o.beginPath(), o.rect(a * r, 0, r, n), o.clip(),
                            o.fillText(String.fromCharCode(a), a * r, n / 2), o.restore();
                    for (o.save(), o.font = d(i.fontWeightBold, i), a = 0; a < 256; a++)
                        o.save(), o.beginPath(), o.rect(a * r, n, r, n), o.clip(),
                            o.fillText(String.fromCharCode(a), a * r, 1.5 * n), o.restore();
                    o.restore(), o.font = d(i.fontWeight, i);
                    for (var l = 0; l < 16; l++) {
                        var h = (l + 2) * n;
                        for (a = 0; a < 256; a++)
                            o.save(), o.beginPath(), o.rect(a * r, h, r, n), o.clip(),
                                o.fillStyle = i.colors.ansi[l].css,
                                o.fillText(String.fromCharCode(a), a * r, h + n / 2),
                                o.restore()
                    }
                    for (o.font = d(i.fontWeightBold, i), l = 0; l < 16; l++)
                        for (h = (l + 2 + 16) * n, a = 0; a < 256; a++)
                            o.save(), o.beginPath(), o.rect(a * r, h, r, n), o.clip(),
                                o.fillStyle = i.colors.ansi[l].css,
                                o.fillText(String.fromCharCode(a), a * r, h + n / 2),
                                o.restore();
                    if (o.restore(),
                        !('createImageBitmap' in e) || u.isFirefox || u.isSafari)
                        return s;
                    var c = o.getImageData(0, 0, s.width, s.height);
                    return f(c, i.colors.background), e.createImageBitmap(c)
                }, i.clearColor = f
            },
            { '../../core/Platform': 23, './Types': 46 }
        ],
        41: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = e('./Types');
                i.generateConfig = function (e, t, i, r) {
                    var n = {
                        foreground: r.foreground,
                        background: r.background,
                        cursor: null,
                        cursorAccent: null,
                        selection: null,
                        ansi: r.ansi.slice(0, 16)
                    };
                    return {
                        type: i.options.experimentalCharAtlas,
                        devicePixelRatio: window.devicePixelRatio, scaledCharWidth: e,
                        scaledCharHeight: t, fontFamily: i.options.fontFamily,
                        fontSize: i.options.fontSize, fontWeight: i.options.fontWeight,
                        fontWeightBold: i.options.fontWeightBold,
                        allowTransparency: i.options.allowTransparency, colors: n
                    }
                }, i.configEquals = function (e, t) {
                    for (var i = 0; i < e.colors.ansi.length; i++)
                        if (e.colors.ansi[i].rgba !== t.colors.ansi[i].rgba) return !1;
                    return e.type === t.type &&
                        e.devicePixelRatio === t.devicePixelRatio &&
                        e.fontFamily === t.fontFamily && e.fontSize === t.fontSize &&
                        e.fontWeight === t.fontWeight &&
                        e.fontWeightBold === t.fontWeightBold &&
                        e.allowTransparency === t.allowTransparency &&
                        e.scaledCharWidth === t.scaledCharWidth &&
                        e.scaledCharHeight === t.scaledCharHeight &&
                        e.colors.foreground === t.colors.foreground &&
                        e.colors.background === t.colors.background
                }, i.is256Color = function (e) {
                    return e < r.DEFAULT_COLOR
                }
            },
            { './Types': 46 }
        ],
        42: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var c = e('./Types'), s = e('./BaseCharAtlas'),
                    o = e('../ColorManager'), u = e('./CharAtlasGenerator'),
                    a = e('./LRUMap'), l = e('../../core/Platform'),
                    h = { css: 'rgba(0, 0, 0, 0)', rgba: 0 };
                function _(e) {
                    return e.code << 21 | e.bg << 12 | e.fg << 3 |
                        (e.bold ? 0 : 4) + (e.dim ? 0 : 2) + (e.italic ? 0 : 1)
                }
                i.getGlyphCacheKey = _;
                var f = function (s) {
                    function e(e, t) {
                        var i = s.call(this) || this;
                        i._config = t, i._drawToCacheCount = 0,
                            i._glyphsWaitingOnBitmap = [], i._bitmapCommitTimeout = null,
                            i._bitmap = null, i._cacheCanvas = e.createElement('canvas'),
                            i._cacheCanvas.width = 1024, i._cacheCanvas.height = 1024,
                            i._cacheCtx = i._cacheCanvas.getContext('2d', { alpha: !0 });
                        var r = e.createElement('canvas');
                        r.width = i._config.scaledCharWidth,
                            r.height = i._config.scaledCharHeight,
                            i._tmpCtx =
                            r.getContext('2d', { alpha: i._config.allowTransparency }),
                            i._width = Math.floor(1024 / i._config.scaledCharWidth),
                            i._height = Math.floor(1024 / i._config.scaledCharHeight);
                        var n = i._width * i._height;
                        return i._cacheMap = new a.default(n), i._cacheMap.prealloc(n), i
                    }
                    return n(e, s), e.prototype.dispose = function () {
                        null !== this._bitmapCommitTimeout &&
                            (window.clearTimeout(this._bitmapCommitTimeout),
                                this._bitmapCommitTimeout = null)
                    }, e.prototype.beginFrame = function () {
                        this._drawToCacheCount = 0
                    }, e.prototype.draw = function (e, t, i, r) {
                        if (32 === t.code) return !0;
                        if (!this._canCache(t)) return !1;
                        var n = _(t), s = this._cacheMap.get(n);
                        if (null != s) return this._drawFromCache(e, s, i, r), !0;
                        if (this._drawToCacheCount < 100) {
                            var o = void 0;
                            o = this._cacheMap.size < this._cacheMap.capacity ?
                                this._cacheMap.size :
                                this._cacheMap.peek().index;
                            var a = this._drawToCache(t, o);
                            return this._cacheMap.set(n, a), this._drawFromCache(e, a, i, r),
                                !0
                        }
                        return !1
                    }, e.prototype._canCache = function (e) {
                        return e.code < 256
                    }, e.prototype._toCoordinateX = function (e) {
                        return e % this._width * this._config.scaledCharWidth
                    }, e.prototype._toCoordinateY = function (e) {
                        return Math.floor(e / this._width) * this._config.scaledCharHeight
                    }, e.prototype._drawFromCache = function (e, t, i, r) {
                        if (!t.isEmpty) {
                            var n = this._toCoordinateX(t.index),
                                s = this._toCoordinateY(t.index);
                            e.drawImage(
                                t.inBitmap ? this._bitmap : this._cacheCanvas, n, s,
                                this._config.scaledCharWidth, this._config.scaledCharHeight,
                                i, r, this._config.scaledCharWidth,
                                this._config.scaledCharHeight)
                        }
                    }, e.prototype._getColorFromAnsiIndex = function (e) {
                        return e < this._config.colors.ansi.length ?
                            this._config.colors.ansi[e] :
                            o.DEFAULT_ANSI_COLORS[e]
                    }, e.prototype._getBackgroundColor = function (e) {
                        return this._config.allowTransparency ?
                            h :
                            e.bg === c.INVERTED_DEFAULT_COLOR ?
                                this._config.colors.foreground :
                                e.bg < 256 ? this._getColorFromAnsiIndex(e.bg) :
                                    this._config.colors.background
                    }, e.prototype._getForegroundColor = function (e) {
                        return e.fg === c.INVERTED_DEFAULT_COLOR ?
                            this._config.colors.background :
                            e.fg < 256 ? this._getColorFromAnsiIndex(e.fg) :
                                this._config.colors.foreground
                    }, e.prototype._drawToCache = function (e, t) {
                        this._drawToCacheCount++ , this._tmpCtx.save();
                        var i = this._getBackgroundColor(e);
                        this._tmpCtx.globalCompositeOperation = 'copy',
                            this._tmpCtx.fillStyle = i.css,
                            this._tmpCtx.fillRect(
                                0, 0, this._config.scaledCharWidth,
                                this._config.scaledCharHeight),
                            this._tmpCtx.globalCompositeOperation = 'source-over';
                        var r = e.bold ? this._config.fontWeightBold :
                            this._config.fontWeight,
                            n = e.italic ? 'italic' : '';
                        this._tmpCtx.font = n + ' ' + r + ' ' +
                            this._config.fontSize * this._config.devicePixelRatio + 'px ' +
                            this._config.fontFamily,
                            this._tmpCtx.textBaseline = 'middle',
                            this._tmpCtx.fillStyle = this._getForegroundColor(e).css,
                            e.dim && (this._tmpCtx.globalAlpha = c.DIM_OPACITY),
                            this._tmpCtx.fillText(
                                e.chars, 0, this._config.scaledCharHeight / 2),
                            this._tmpCtx.restore();
                        var s = this._tmpCtx.getImageData(
                            0, 0, this._config.scaledCharWidth,
                            this._config.scaledCharHeight),
                            o = !1;
                        this._config.allowTransparency || (o = u.clearColor(s, i));
                        var a = this._toCoordinateX(t), l = this._toCoordinateY(t);
                        this._cacheCtx.putImageData(s, a, l);
                        var h = { index: t, isEmpty: o, inBitmap: !1 };
                        return this._addGlyphToBitmap(h), h
                    }, e.prototype._addGlyphToBitmap = function (e) {
                        var t = this;
                        'createImageBitmap' in window && !l.isFirefox && !l.isSafari &&
                            (this._glyphsWaitingOnBitmap.push(e),
                                null === this._bitmapCommitTimeout &&
                                (this._bitmapCommitTimeout = window.setTimeout(function () {
                                    return t._generateBitmap()
                                }, 100)))
                    }, e.prototype._generateBitmap = function () {
                        var i = this, r = this._glyphsWaitingOnBitmap;
                        this._glyphsWaitingOnBitmap = [],
                            window.createImageBitmap(this._cacheCanvas).then(function (e) {
                                i._bitmap = e;
                                for (var t = 0; t < r.length; t++) {
                                    r[t].inBitmap = !0
                                }
                            }),
                            this._bitmapCommitTimeout = null
                    }, e
                }(s.default);
                i.default = f
            },
            {
                '../../core/Platform': 23,
                '../ColorManager': 31,
                './BaseCharAtlas': 38,
                './CharAtlasGenerator': 40,
                './LRUMap': 43,
                './Types': 46
            }
        ],
        43: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = function () {
                    function e(e) {
                        this.capacity = e, this._map = {}, this._head = null,
                            this._tail = null, this._nodePool = [], this.size = 0
                    }
                    return e.prototype._unlinkNode = function (e) {
                        var t = e.prev, i = e.next;
                        e === this._head && (this._head = i),
                            e === this._tail && (this._tail = t),
                            null !== t && (t.next = i), null !== i && (i.prev = t)
                    }, e.prototype._appendNode = function (e) {
                        var t = this._tail;
                        null !== t && (t.next = e), e.prev = t, e.next = null,
                            this._tail = e,
                            null === this._head && (this._head = e)
                    }, e.prototype.prealloc = function (e) {
                        for (var t = this._nodePool, i = 0; i < e; i++)
                            t.push({ prev: null, next: null, key: null, value: null })
                    }, e.prototype.get = function (e) {
                        var t = this._map[e];
                        return void 0 !== t ?
                            (this._unlinkNode(t), this._appendNode(t), t.value) :
                            null
                    }, e.prototype.peekValue = function (e) {
                        var t = this._map[e];
                        return void 0 !== t ? t.value : null
                    }, e.prototype.peek = function () {
                        var e = this._head;
                        return null === e ? null : e.value
                    }, e.prototype.set = function (e, t) {
                        var i = this._map[e];
                        if (void 0 !== i)
                            i = this._map[e], this._unlinkNode(i), i.value = t;
                        else if (this.size >= this.capacity)
                            i = this._head, this._unlinkNode(i), delete this._map[i.key],
                                i.key = e, i.value = t, this._map[e] = i;
                        else {
                            var r = this._nodePool;
                            0 < r.length ? ((i = r.pop()).key = e, i.value = t) :
                                i = { prev: null, next: null, key: e, value: t },
                                this._map[e] = i, this.size++
                        }
                        this._appendNode(i)
                    }, e
                }();
                i.default = r
            },
            {}
        ],
        44: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = function (i) {
                    function e(e, t) {
                        return i.call(this) || this
                    }
                    return n(e, i), e.prototype.draw = function (e, t, i, r) {
                        return !1
                    }, e
                }(e('./BaseCharAtlas').default);
                i.default = s
            },
            { './BaseCharAtlas': 38 }
        ],
        45: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var a = e('./Types'), s = e('./CharAtlasGenerator'),
                    o = e('./BaseCharAtlas'), l = e('./CharAtlasUtils'),
                    h = function (i) {
                        function e(e, t) {
                            var r = i.call(this) || this;
                            return r._document = e, r._config = t,
                                r._canvasFactory = function (e, t) {
                                    var i = r._document.createElement('canvas');
                                    return i.width = e, i.height = t, i
                                }, r
                        }
                        return n(e, i), e.prototype._doWarmUp = function () {
                            var t = this,
                                e = s.generateStaticCharAtlasTexture(
                                    window, this._canvasFactory, this._config);
                            e instanceof HTMLCanvasElement ? this._texture = e :
                                e.then(function (e) {
                                    t._texture = e
                                })
                        }, e.prototype._isCached = function (e, t) {
                            var i = e.code < 256, r = e.fg < 16,
                                n = e.fg === a.DEFAULT_COLOR, s = e.bg === a.DEFAULT_COLOR;
                            return i && (r || n) && s && !e.italic
                        }, e.prototype.draw = function (e, t, i, r) {
                            if (null === this._texture || void 0 === this._texture)
                                return !1;
                            var n = 0;
                            if (l.is256Color(t.fg) ?
                                n = 2 + t.fg + (t.bold ? 16 : 0) :
                                t.fg === a.DEFAULT_COLOR && t.bold && (n = 1),
                                !this._isCached(t, n))
                                return !1;
                            e.save();
                            var s = this._config.scaledCharWidth +
                                a.CHAR_ATLAS_CELL_SPACING,
                                o = this._config.scaledCharHeight +
                                    a.CHAR_ATLAS_CELL_SPACING;
                            return t.dim && (e.globalAlpha = a.DIM_OPACITY),
                                e.drawImage(
                                    this._texture, t.code * s, n * o, s,
                                    this._config.scaledCharHeight, i, r, s,
                                    this._config.scaledCharHeight),
                                e.restore(), !0
                        }, e
                    }(o.default);
                i.default = h
            },
            {
                './BaseCharAtlas': 38,
                './CharAtlasGenerator': 40,
                './CharAtlasUtils': 41,
                './Types': 46
            }
        ],
        46: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 }),
                    i.DEFAULT_COLOR = 256, i.INVERTED_DEFAULT_COLOR = 257,
                    i.DIM_OPACITY = .5, i.CHAR_ATLAS_CELL_SPACING = 1
            },
            {}
        ],
        47: [
            function (e, t, i) {
                'use strict';
                var r,
                    s = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var n = e('../../common/EventEmitter'), o = e('../ColorManager'),
                    a = e('../../ui/RenderDebouncer'), l = e('./DomRendererRowFactory'),
                    h = e('../atlas/Types'), c = 'xterm-dom-renderer-owner-',
                    u = 'xterm-rows', _ = 'xterm-fg-', f = 'xterm-bg-',
                    d = 'xterm-focus', p = 'xterm-selection', m = 1, y = function (n) {
                        function e(e, t) {
                            var i = n.call(this) || this;
                            i._terminal = e, i._terminalClass = m++ , i._rowElements = [];
                            var r = i._terminal.options.allowTransparency;
                            return i.colorManager = new o.ColorManager(document, r),
                                i.setTheme(t),
                                i._rowContainer = document.createElement('div'),
                                i._rowContainer.classList.add(u),
                                i._rowContainer.style.lineHeight = 'normal',
                                i._rowContainer.setAttribute('aria-hidden', 'true'),
                                i._refreshRowElements(
                                    i._terminal.cols, i._terminal.rows),
                                i._selectionContainer = document.createElement('div'),
                                i._selectionContainer.classList.add(p),
                                i._selectionContainer.setAttribute(
                                    'aria-hidden', 'true'),
                                i.dimensions = {
                                    scaledCharWidth: null,
                                    scaledCharHeight: null,
                                    scaledCellWidth: null,
                                    scaledCellHeight: null,
                                    scaledCharLeft: null,
                                    scaledCharTop: null,
                                    scaledCanvasWidth: null,
                                    scaledCanvasHeight: null,
                                    canvasWidth: null,
                                    canvasHeight: null,
                                    actualCellWidth: null,
                                    actualCellHeight: null
                                },
                                i._updateDimensions(),
                                i._renderDebouncer = new a.RenderDebouncer(
                                    i._terminal, i._renderRows.bind(i)),
                                i._rowFactory = new l.DomRendererRowFactory(document),
                                i._terminal.element.classList.add(c + i._terminalClass),
                                i._terminal.screenElement.appendChild(i._rowContainer),
                                i._terminal.screenElement.appendChild(
                                    i._selectionContainer),
                                i._terminal.linkifier.on('linkhover', function (e) {
                                    return i._onLinkHover(e)
                                }), i._terminal.linkifier.on('linkleave', function (e) {
                                    return i._onLinkLeave(e)
                                }), i
                        }
                        return s(e, n),
                            e.prototype
                                .dispose =
                            function () {
                                this._terminal.element.classList.remove(
                                    c + this._terminalClass),
                                    this._terminal.screenElement.removeChild(
                                        this._rowContainer),
                                    this._terminal.screenElement.removeChild(
                                        this._selectionContainer),
                                    this._terminal.screenElement.removeChild(
                                        this._themeStyleElement),
                                    this._terminal.screenElement.removeChild(
                                        this._dimensionsStyleElement),
                                    n.prototype.dispose.call(this)
                            },
                            e.prototype._updateDimensions =
                            function () {
                                var t = this;
                                this.dimensions
                                    .scaledCharWidth = Math.floor(
                                        this._terminal.charMeasure.width * window.devicePixelRatio),
                                    this.dimensions.scaledCharHeight = Math.ceil(
                                        this._terminal.charMeasure.height * window.devicePixelRatio),
                                    this.dimensions.scaledCellWidth = this.dimensions.scaledCharWidth +
                                    Math.round(this._terminal.options.letterSpacing),
                                    this.dimensions.scaledCellHeight = Math.floor(
                                        this.dimensions.scaledCharHeight * this._terminal.options.lineHeight),
                                    this.dimensions.scaledCharLeft = 0, this.dimensions.scaledCharTop = 0,
                                    this.dimensions.scaledCanvasWidth =
                                    this.dimensions.scaledCellWidth * this._terminal.cols,
                                    this.dimensions.scaledCanvasHeight =
                                    this.dimensions.scaledCellHeight * this._terminal.rows,
                                    this.dimensions.canvasWidth = Math.round(
                                        this.dimensions.scaledCanvasWidth / window.devicePixelRatio),
                                    this.dimensions.canvasHeight = Math.round(
                                        this.dimensions.scaledCanvasHeight / window.devicePixelRatio),
                                    this.dimensions.actualCellWidth =
                                    this.dimensions.canvasWidth / this._terminal.cols,
                                    this.dimensions.actualCellHeight =
                                    this.dimensions.canvasHeight / this._terminal.rows,
                                    this._rowElements.forEach(function (e) {
                                        e.style.width = t.dimensions.canvasWidth + 'px',
                                            e.style.height = t.dimensions.actualCellHeight + 'px',
                                            e.style.lineHeight = t.dimensions.actualCellHeight + 'px',
                                            e.style.overflow = 'hidden'
                                    }),
                                    this._dimensionsStyleElement ||
                                    (this._dimensionsStyleElement =
                                        document.createElement('style'),
                                        this._terminal.screenElement.appendChild(
                                            this._dimensionsStyleElement));
                                var e = this._terminalSelector + ' .' + u +
                                    ' span { display: inline-block; height: 100%; vertical-align: top; width: ' +
                                    this.dimensions.actualCellWidth + 'px}';
                                this._dimensionsStyleElement.innerHTML = e,
                                    this._selectionContainer.style.height =
                                    this._terminal._viewportElement.style.height,
                                    this._terminal.screenElement.style.width =
                                    this.dimensions.canvasWidth + 'px',
                                    this._terminal.screenElement.style.height =
                                    this.dimensions.canvasHeight + 'px'
                            },
                            e.prototype.setTheme =
                            function (e) {
                                var i = this;
                                e && this.colorManager.setTheme(e),
                                    this._themeStyleElement ||
                                    (this._themeStyleElement = document.createElement('style'),
                                        this._terminal.screenElement.appendChild(
                                            this._themeStyleElement));
                                var r = this._terminalSelector + ' .' + u +
                                    ' { color: ' + this.colorManager.colors.foreground.css +
                                    '; background-color: ' +
                                    this.colorManager.colors.background.css +
                                    '; font-family: ' + this._terminal.getOption('fontFamily') +
                                    '; font-size: ' + this._terminal.getOption('fontSize') +
                                    'px;}';
                                return r += this._terminalSelector + ' span:not(.' +
                                    l.BOLD_CLASS + ') { font-weight: ' +
                                    this._terminal.options.fontWeight + ';}' +
                                    this._terminalSelector + ' span.' + l.BOLD_CLASS +
                                    ' { font-weight: ' +
                                    this._terminal.options.fontWeightBold + ';}' +
                                    this._terminalSelector + ' span.' + l.ITALIC_CLASS +
                                    ' { font-style: italic;}',
                                    r += this._terminalSelector + ' .' + u + ':not(.' + d +
                                    ') .' + l.CURSOR_CLASS + ' { outline: 1px solid ' +
                                    this.colorManager.colors.cursor.css +
                                    '; outline-offset: -1px;}' + this._terminalSelector +
                                    ' .' + u + '.' + d + ' .' + l.CURSOR_CLASS + '.' +
                                    l.CURSOR_STYLE_BLOCK_CLASS +
                                    ' { background-color: ' +
                                    this.colorManager.colors.cursor.css + '; color: ' +
                                    this.colorManager.colors.cursorAccent.css + ';}' +
                                    this._terminalSelector + ' .' + u + '.' + d + ' .' +
                                    l.CURSOR_CLASS + '.' + l.CURSOR_STYLE_BAR_CLASS +
                                    ' { box-shadow: 1px 0 0 ' +
                                    this.colorManager.colors.cursor.css + ' inset;}' +
                                    this._terminalSelector + ' .' + u + '.' + d + ' .' +
                                    l.CURSOR_CLASS + '.' +
                                    l.CURSOR_STYLE_UNDERLINE_CLASS +
                                    ' { box-shadow: 0 -1px 0 ' +
                                    this.colorManager.colors.cursor.css + ' inset;}',
                                    r += this._terminalSelector + ' .' + p +
                                    ' { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}' +
                                    this._terminalSelector + ' .' + p +
                                    ' div { position: absolute; background-color: ' +
                                    this.colorManager.colors.selection.css + ';}',
                                    this.colorManager.colors.ansi.forEach(function (e, t) {
                                        r += i._terminalSelector + ' .' + _ + t +
                                            ' { color: ' + e.css + '; }' +
                                            i._terminalSelector + ' .' + f + t +
                                            ' { background-color: ' + e.css + '; }'
                                    }),
                                    r += this._terminalSelector + ' .' + _ +
                                    h.INVERTED_DEFAULT_COLOR + ' { color: ' +
                                    this.colorManager.colors.background.css + '; }' +
                                    this._terminalSelector + ' .' + f +
                                    h.INVERTED_DEFAULT_COLOR + ' { background-color: ' +
                                    this.colorManager.colors.foreground.css + '; }',
                                    this._themeStyleElement.innerHTML = r,
                                    this.colorManager.colors
                            },
                            e.prototype.onWindowResize =
                            function (e) {
                                this._updateDimensions()
                            },
                            e.prototype._refreshRowElements =
                            function (e, t) {
                                for (var i = this._rowElements.length; i <= t; i++) {
                                    var r = document.createElement('div');
                                    this._rowContainer.appendChild(r), this._rowElements.push(r)
                                }
                                for (; this._rowElements.length > t;)
                                    this._rowContainer.removeChild(this._rowElements.pop())
                            },
                            e.prototype.onResize =
                            function (e, t) {
                                this._refreshRowElements(e, t), this._updateDimensions()
                            },
                            e.prototype.onCharSizeChanged =
                            function () {
                                this._updateDimensions()
                            },
                            e.prototype.onBlur =
                            function () {
                                this._rowContainer.classList.remove(d)
                            },
                            e.prototype.onFocus =
                            function () {
                                this._rowContainer.classList.add(d)
                            },
                            e.prototype.onSelectionChanged =
                            function (e, t, i) {
                                for (; this._selectionContainer.children.length;)
                                    this._selectionContainer.removeChild(
                                        this._selectionContainer.children[0]);
                                if (e && t) {
                                    var r = e[1] - this._terminal.buffer.ydisp,
                                        n = t[1] - this._terminal.buffer.ydisp,
                                        s = Math.max(r, 0),
                                        o = Math.min(n, this._terminal.rows - 1);
                                    if (!(s >= this._terminal.rows || o < 0)) {
                                        var a = document.createDocumentFragment();
                                        if (i)
                                            a.appendChild(this._createSelectionElement(
                                                s, e[0], t[0], o - s + 1));
                                        else {
                                            var l = r === s ? e[0] : 0,
                                                h = s === o ? t[0] : this._terminal.cols;
                                            a.appendChild(this._createSelectionElement(s, l, h));
                                            var c = o - s - 1;
                                            if (a.appendChild(this._createSelectionElement(
                                                s + 1, 0, this._terminal.cols, c)),
                                                s !== o) {
                                                var u = n === o ? t[0] : this._terminal.cols;
                                                a.appendChild(this._createSelectionElement(o, 0, u))
                                            }
                                        }
                                        this._selectionContainer.appendChild(a)
                                    }
                                }
                            },
                            e.prototype._createSelectionElement =
                            function (e, t, i, r) {
                                void 0 === r && (r = 1);
                                var n = document.createElement('div');
                                return n.style.height =
                                    r * this.dimensions.actualCellHeight + 'px',
                                    n.style.top =
                                    e * this.dimensions.actualCellHeight + 'px',
                                    n.style.left =
                                    t * this.dimensions.actualCellWidth + 'px',
                                    n.style.width =
                                    this.dimensions.actualCellWidth * (i - t) + 'px',
                                    n
                            },
                            e.prototype.onCursorMove = function () { },
                            e.prototype.onOptionsChanged =
                            function () {
                                this._updateDimensions(), this.setTheme(void 0),
                                    this._terminal.refresh(0, this._terminal.rows - 1)
                            },
                            e.prototype.clear =
                            function () {
                                this._rowElements.forEach(function (e) {
                                    return e.innerHTML = ''
                                })
                            },
                            e.prototype.refreshRows =
                            function (e, t) {
                                this._renderDebouncer.refresh(e, t)
                            },
                            e.prototype._renderRows =
                            function (e, t) {
                                for (var i = this._terminal, r = i.buffer.ybase + i.buffer.y,
                                    n = this._terminal.buffer.x, s = e;
                                    s <= t; s++) {
                                    var o = this._rowElements[s];
                                    o.innerHTML = '';
                                    var a = s + i.buffer.ydisp, l = i.buffer.lines.get(a),
                                        h = i.options.cursorStyle;
                                    o.appendChild(this._rowFactory.createRow(
                                        l, a === r, h, n, this.dimensions.actualCellWidth,
                                        i.cols))
                                }
                                this._terminal.emit('refresh', { start: e, end: t })
                            },
                            Object.defineProperty(e.prototype, '_terminalSelector', {
                                get: function () {
                                    return '.' + c + this._terminalClass
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            e.prototype.registerCharacterJoiner = function (e) {
                                return -1
                            }, e.prototype.deregisterCharacterJoiner = function (e) {
                                return !1
                            }, e.prototype._onLinkHover = function (e) {
                                this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, !0)
                            }, e.prototype._onLinkLeave = function (e) {
                                this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, !1)
                            }, e.prototype._setCellUnderline = function (e, t, i, r, n, s) {
                                for (; e !== t || i !== r;) {
                                    var o = this._rowElements[i];
                                    if (!o) return;
                                    var a = o.children[e];
                                    a && (a.style.textDecoration = s ? 'underline' : 'none'),
                                        ++e >= n && (e = 0, i++)
                                }
                            }, e
                    }(n.EventEmitter);
                i.DomRenderer = y
            },
            {
                '../../common/EventEmitter': 19,
                '../../ui/RenderDebouncer': 54,
                '../ColorManager': 31,
                '../atlas/Types': 46,
                './DomRendererRowFactory': 48
            }
        ],
        48: [
            function (e, t, C) {
                'use strict';
                Object.defineProperty(C, '__esModule', { value: !0 });
                var g = e('../../Buffer'), v = e('../atlas/Types');
                C.BOLD_CLASS = 'xterm-bold', C.ITALIC_CLASS = 'xterm-italic',
                    C.CURSOR_CLASS = 'xterm-cursor',
                    C.CURSOR_STYLE_BLOCK_CLASS = 'xterm-cursor-block',
                    C.CURSOR_STYLE_BAR_CLASS = 'xterm-cursor-bar',
                    C.CURSOR_STYLE_UNDERLINE_CLASS = 'xterm-cursor-underline';
                var i = function () {
                    function e(e) {
                        this._document = e
                    }
                    return e.prototype.createRow = function (e, t, i, r, n, s) {
                        for (var o = this._document.createDocumentFragment(), a = 0,
                            l = Math.min(e.length, s) - 1;
                            0 <= l; l--) {
                            if ((h = e.get(l))[g.CHAR_DATA_CODE_INDEX] !== g.NULL_CELL_CODE ||
                                t && l === r) {
                                a = l + 1;
                                break
                            }
                        }
                        for (l = 0; l < a; l++) {
                            var h,
                                c = (h = e.get(l))[g.CHAR_DATA_CHAR_INDEX] ||
                                    g.WHITESPACE_CELL_CHAR,
                                u = h[g.CHAR_DATA_ATTR_INDEX], _ = h[g.CHAR_DATA_WIDTH_INDEX];
                            if (0 !== _) {
                                var f = this._document.createElement('span');
                                1 < _ && (f.style.width = n * _ + 'px');
                                var d = u >> 18, p = 511 & u, m = u >> 9 & 511;
                                if (t && l === r) switch (f.classList.add(C.CURSOR_CLASS), i) {
                                    case 'bar':
                                        f.classList.add(C.CURSOR_STYLE_BAR_CLASS);
                                        break;
                                    case 'underline':
                                        f.classList.add(C.CURSOR_STYLE_UNDERLINE_CLASS);
                                        break;
                                    default:
                                        f.classList.add(C.CURSOR_STYLE_BLOCK_CLASS)
                                }
                                if (8 & d) {
                                    var y = p;
                                    p = m,
                                        (m = y) === v.DEFAULT_COLOR && (m = v.INVERTED_DEFAULT_COLOR),
                                        p === v.DEFAULT_COLOR && (p = v.INVERTED_DEFAULT_COLOR)
                                }
                                1 & d && (m < 8 && (m += 8), f.classList.add(C.BOLD_CLASS)),
                                    64 & d && f.classList.add(C.ITALIC_CLASS),
                                    f.textContent = c,
                                    m !== v.DEFAULT_COLOR && f.classList.add('xterm-fg-' + m),
                                    p !== v.DEFAULT_COLOR && f.classList.add('xterm-bg-' + p),
                                    o.appendChild(f)
                            }
                        }
                        return o
                    }, e
                }();
                C.DomRendererRowFactory = i
            },
            { '../../Buffer': 2, '../atlas/Types': 46 }
        ],
        49: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = function (r) {
                    function e(e, t) {
                        var i = r.call(this) || this;
                        return i._document = e, i._parentElement = t,
                            i._measureElement = i._document.createElement('span'),
                            i._measureElement.classList.add(
                                'xterm-char-measure-element'),
                            i._measureElement.textContent = 'W',
                            i._measureElement.setAttribute('aria-hidden', 'true'),
                            i._parentElement.appendChild(i._measureElement), i
                    }
                    return n(e, r), Object.defineProperty(e.prototype, 'width', {
                        get: function () {
                            return this._width
                        },
                        enumerable: !0,
                        configurable: !0
                    }),
                        Object.defineProperty(e.prototype, 'height', {
                            get: function () {
                                return this._height
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        e.prototype.measure = function (e) {
                            this._measureElement.style.fontFamily = e.fontFamily,
                                this._measureElement.style.fontSize = e.fontSize + 'px';
                            var t = this._measureElement.getBoundingClientRect();
                            if (0 !== t.width && 0 !== t.height) {
                                var i = Math.ceil(t.height);
                                this._width === t.width && this._height === i ||
                                    (this._width = t.width, this._height = i,
                                        this.emit('charsizechanged'))
                            }
                        }, e
                }(e('../common/EventEmitter').EventEmitter);
                i.CharMeasure = s
            },
            { '../common/EventEmitter': 19 }
        ],
        50: [
            function (e, t, i) {
                'use strict';
                function r(e) {
                    return e.replace(/\r?\n/g, '\r')
                }
                function n(e, t) {
                    return t ? '[200~' + e + '[201~' : e
                }
                function s(e, t) {
                    var i = t.screenElement.getBoundingClientRect(),
                        r = e.clientX - i.left - 10, n = e.clientY - i.top - 10;
                    t.textarea.style.position = 'absolute',
                        t.textarea.style.width = '20px', t.textarea.style.height = '20px',
                        t.textarea.style.left = r + 'px', t.textarea.style.top = n + 'px',
                        t.textarea.style.zIndex = '1000', t.textarea.focus(),
                        setTimeout(function () {
                            t.textarea.style.position = null, t.textarea.style.width = null,
                                t.textarea.style.height = null, t.textarea.style.left = null,
                                t.textarea.style.top = null, t.textarea.style.zIndex = null
                        }, 200)
                }
                Object.defineProperty(i, '__esModule', { value: !0 }),
                    i.prepareTextForTerminal = r, i.bracketTextForPaste = n,
                    i.copyHandler =
                    function (e, t, i) {
                        t.browser.isMSIE ?
                            window.clipboardData.setData('Text', i.selectionText) :
                            e.clipboardData.setData('text/plain', i.selectionText),
                            e.preventDefault()
                    },
                    i.pasteHandler =
                    function (t, i) {
                        t.stopPropagation();
                        var e = function (e) {
                            e = n(e = r(e), i.bracketedPasteMode), i.handler(e),
                                i.textarea.value = '', i.emit('paste', e), i.cancel(t)
                        };
                        i.browser.isMSIE ?
                            window.clipboardData &&
                            e(window.clipboardData.getData('Text')) :
                            t.clipboardData && e(t.clipboardData.getData('text/plain'))
                    },
                    i.moveTextAreaUnderMouseCursor = s,
                    i.rightClickHandler = function (e, t, i, r) {
                        s(e, t), r && !i.isClickInSelection(e) && i.selectWordAtCursor(e),
                            t.textarea.value = i.selectionText, t.textarea.select()
                    }
            },
            {}
        ],
        51: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 }),
                    i.addDisposableDomListener = function (e, t, i, r) {
                        return e.addEventListener(t, i, r), {
                            dispose: function () {
                                i && (e.removeEventListener(t, i, r), i = e = null)
                            }
                        }
                    }
            },
            {}
        ],
        52: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = function () {
                    function a(e) {
                        this._renderer = e
                    }
                    return a.prototype.setRenderer = function (e) {
                        this._renderer = e
                    }, a.getCoordsRelativeToElement = function (e, t) {
                        var i = t.getBoundingClientRect();
                        return [e.clientX - i.left, e.clientY - i.top]
                    }, a.prototype.getCoords = function (e, t, i, r, n, s) {
                        if (!i.width || !i.height) return null;
                        var o = a.getCoordsRelativeToElement(e, t);
                        return o ?
                            (o[0] = Math.ceil(
                                (o[0] +
                                    (s ? this._renderer.dimensions.actualCellWidth / 2 : 0)) /
                                this._renderer.dimensions.actualCellWidth),
                                o[1] = Math.ceil(
                                    o[1] / this._renderer.dimensions.actualCellHeight),
                                o[0] = Math.min(Math.max(o[0], 1), r + (s ? 1 : 0)),
                                o[1] = Math.min(Math.max(o[1], 1), n), o) :
                            null
                    }, a.prototype.getRawByteCoords = function (e, t, i, r, n) {
                        var s = this.getCoords(e, t, i, r, n), o = s[0], a = s[1];
                        return {
                            x: o += 32, y: a += 32
                        }
                    }, a
                }();
                i.MouseHelper = r
            },
            {}
        ],
        53: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = e('../common/Lifecycle'), o = e('./Lifecycle'),
                    a = function (i) {
                        function e(e) {
                            var t = i.call(this) || this;
                            return t._terminal = e, t._zones = [], t._areZonesActive = !1,
                                t._tooltipTimeout = null, t._currentZone = null,
                                t._lastHoverCoords = [null, null],
                                t.register(o.addDisposableDomListener(
                                    t._terminal.element, 'mousedown',
                                    function (e) {
                                        return t._onMouseDown(e)
                                    })),
                                t._mouseMoveListener = function (e) {
                                    return t._onMouseMove(e)
                                }, t._mouseLeaveListener = function (e) {
                                    return t._onMouseLeave(e)
                                }, t._clickListener = function (e) {
                                    return t._onClick(e)
                                }, t
                        }
                        return n(e, i), e.prototype.dispose = function () {
                            i.prototype.dispose.call(this), this._deactivate()
                        }, e.prototype.add = function (e) {
                            this._zones.push(e),
                                1 === this._zones.length && this._activate()
                        }, e.prototype.clearAll = function (e, t) {
                            if (0 !== this._zones.length) {
                                t || (e = 0, t = this._terminal.rows - 1);
                                for (var i = 0; i < this._zones.length; i++) {
                                    var r = this._zones[i];
                                    (r.y1 > e && r.y1 <= t + 1 || r.y2 > e && r.y2 <= t + 1 ||
                                        r.y1 < e && r.y2 > t + 1) &&
                                        (this._currentZone && this._currentZone === r &&
                                            (this._currentZone.leaveCallback(),
                                                this._currentZone = null),
                                            this._zones.splice(i--, 1))
                                }
                                0 === this._zones.length && this._deactivate()
                            }
                        }, e.prototype._activate = function () {
                            this._areZonesActive ||
                                (this._areZonesActive = !0,
                                    this._terminal.element.addEventListener(
                                        'mousemove', this._mouseMoveListener),
                                    this._terminal.element.addEventListener(
                                        'mouseleave', this._mouseLeaveListener),
                                    this._terminal.element.addEventListener(
                                        'click', this._clickListener))
                        }, e.prototype._deactivate = function () {
                            this._areZonesActive &&
                                (this._areZonesActive = !1,
                                    this._terminal.element.removeEventListener(
                                        'mousemove', this._mouseMoveListener),
                                    this._terminal.element.removeEventListener(
                                        'mouseleave', this._mouseLeaveListener),
                                    this._terminal.element.removeEventListener(
                                        'click', this._clickListener))
                        }, e.prototype._onMouseMove = function (e) {
                            this._lastHoverCoords[0] === e.pageX &&
                                this._lastHoverCoords[1] === e.pageY ||
                                (this._onHover(e),
                                    this._lastHoverCoords = [e.pageX, e.pageY])
                        }, e.prototype._onHover = function (e) {
                            var t = this, i = this._findZoneEventAt(e);
                            i !== this._currentZone &&
                                (this._currentZone &&
                                    (this._currentZone.leaveCallback(),
                                        this._currentZone = null,
                                        this._tooltipTimeout &&
                                        clearTimeout(this._tooltipTimeout)),
                                    i &&
                                    ((this._currentZone = i).hoverCallback &&
                                        i.hoverCallback(e),
                                        this._tooltipTimeout = setTimeout(function () {
                                            return t._onTooltip(e)
                                        }, 500)))
                        }, e.prototype._onTooltip = function (e) {
                            this._tooltipTimeout = null;
                            var t = this._findZoneEventAt(e);
                            t && t.tooltipCallback && t.tooltipCallback(e)
                        }, e.prototype._onMouseDown = function (e) {
                            if (this._areZonesActive) {
                                var t = this._findZoneEventAt(e);
                                t && t.willLinkActivate(e) &&
                                    (e.preventDefault(), e.stopImmediatePropagation())
                            }
                        }, e.prototype._onMouseLeave = function (e) {
                            this._currentZone &&
                                (this._currentZone.leaveCallback(),
                                    this._currentZone = null,
                                    this._tooltipTimeout && clearTimeout(this._tooltipTimeout))
                        }, e.prototype._onClick = function (e) {
                            var t = this._findZoneEventAt(e);
                            t &&
                                (t.clickCallback(e), e.preventDefault(),
                                    e.stopImmediatePropagation())
                        }, e.prototype._findZoneEventAt = function (e) {
                            var t = this._terminal.mouseHelper.getCoords(
                                e, this._terminal.screenElement, this._terminal.charMeasure,
                                this._terminal.cols, this._terminal.rows);
                            if (!t) return null;
                            for (var i = t[0], r = t[1], n = 0; n < this._zones.length;
                                n++) {
                                var s = this._zones[n];
                                if (s.y1 === s.y2) {
                                    if (r === s.y1 && i >= s.x1 && i < s.x2) return s
                                } else if (
                                    r === s.y1 && i >= s.x1 || r === s.y2 && i < s.x2 ||
                                    r > s.y1 && r < s.y2)
                                    return s
                            }
                            return null
                        }, e
                    }(s.Disposable);
                i.MouseZoneManager = a;
                var l = function (e, t, i, r, n, s, o, a, l) {
                    this.x1 = e, this.y1 = t, this.x2 = i, this.y2 = r,
                        this.clickCallback = n, this.hoverCallback = s,
                        this.tooltipCallback = o, this.leaveCallback = a,
                        this.willLinkActivate = l
                };
                i.MouseZone = l
            },
            { '../common/Lifecycle': 20, './Lifecycle': 51 }
        ],
        54: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = function () {
                    function e(e, t) {
                        this._terminal = e, this._callback = t, this._animationFrame = null
                    }
                    return e.prototype.dispose = function () {
                        this._animationFrame &&
                            (window.cancelAnimationFrame(this._animationFrame),
                                this._animationFrame = null)
                    }, e.prototype.refresh = function (e, t) {
                        var i = this;
                        e = null != e ? e : 0, t = null != t ? t : this._terminal.rows - 1;
                        var r = void 0 !== this._rowStart && null !== this._rowStart,
                            n = void 0 !== this._rowEnd && null !== this._rowEnd;
                        this._rowStart = r ? Math.min(this._rowStart, e) : e,
                            this._rowEnd = n ? Math.max(this._rowEnd, t) : t,
                            this._animationFrame ||
                            (this._animationFrame =
                                window.requestAnimationFrame(function () {
                                    return i._innerRefresh()
                                }))
                    }, e.prototype._innerRefresh = function () {
                        this._rowStart = Math.max(this._rowStart, 0),
                            this._rowEnd = Math.min(this._rowEnd, this._terminal.rows - 1),
                            this._callback(this._rowStart, this._rowEnd), this._rowStart = null,
                            this._rowEnd = null, this._animationFrame = null
                    }, e
                }();
                i.RenderDebouncer = r
            },
            {}
        ],
        55: [
            function (e, t, i) {
                'use strict';
                var r,
                    n = this && this.__extends ||
                        (r =
                            function (e, t) {
                                return (
                                    r = Object.setPrototypeOf ||
                                    { __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t
                                    } ||
                                    function (e, t) {
                                        for (var i in t)
                                            t.hasOwnProperty(i) && (e[i] = t[i])
                                    })(e, t)
                            },
                            function (e, t) {
                                function i() {
                                    this.constructor = e
                                }
                                r(e, t),
                                    e.prototype = null === t ? Object.create(t) :
                                        (i.prototype = t.prototype, new i)
                            });
                Object.defineProperty(i, '__esModule', { value: !0 });
                var s = function (e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return n(t, e), t.prototype.setListener = function (e) {
                        var t = this;
                        this._listener && this.clearListener(),
                            this._listener = e, this._outerListener = function () {
                                t._listener(
                                    window.devicePixelRatio, t._currentDevicePixelRatio),
                                    t._updateDpr()
                            }, this._updateDpr()
                    }, t.prototype.dispose = function () {
                        e.prototype.dispose.call(this), this.clearListener()
                    }, t.prototype._updateDpr = function () {
                        this._resolutionMediaMatchList &&
                            this._resolutionMediaMatchList.removeListener(
                                this._outerListener),
                            this._currentDevicePixelRatio = window.devicePixelRatio,
                            this._resolutionMediaMatchList = window.matchMedia(
                                'screen and (resolution: ' + window.devicePixelRatio +
                                'dppx)'),
                            this._resolutionMediaMatchList.addListener(this._outerListener)
                    }, t.prototype.clearListener = function () {
                        this._listener &&
                            (this._resolutionMediaMatchList.removeListener(
                                this._outerListener),
                                this._listener = null, this._outerListener = null)
                    }, t
                }(e('../common/Lifecycle').Disposable);
                i.ScreenDprMonitor = s
            },
            { '../common/Lifecycle': 20 }
        ],
        56: [
            function (e, t, i) {
                'use strict';
                Object.defineProperty(i, '__esModule', { value: !0 });
                var r = e('./public/Terminal');
                t.exports = r.Terminal
            },
            { './public/Terminal': 28 }
        ]
    }, {}, [56]) (56)
});