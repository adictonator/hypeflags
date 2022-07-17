/*!
 * enquire.min.js
 */
/*!
 * enquire.js v2.1.2 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
!(function (e, t, n) {
	var i = window.matchMedia
	'undefined' != typeof module && module.exports
		? (module.exports = n(i))
		: 'function' == typeof define && define.amd
		? define(function () {
				return (t[e] = n(i))
		  })
		: (t[e] = n(i))
})('enquire', this, function (e) {
	'use strict'
	function t(e, t) {
		var n,
			i = 0,
			o = e.length
		for (i; o > i && ((n = t(e[i], i)), n !== !1); i++);
	}
	function n(e) {
		return '[object Array]' === Object.prototype.toString.apply(e)
	}
	function i(e) {
		return 'function' == typeof e
	}
	function o(e) {
		;(this.options = e), !e.deferSetup && this.setup()
	}
	function r(t, n) {
		;(this.query = t),
			(this.isUnconditional = n),
			(this.handlers = []),
			(this.mql = e(t))
		var i = this
		;(this.listener = function (e) {
			;(i.mql = e), i.assess()
		}),
			this.mql.addListener(this.listener)
	}
	function s() {
		if (!e)
			throw new Error(
				'matchMedia not present, legacy browsers require a polyfill'
			)
		;(this.queries = {}), (this.browserIsIncapable = !e('only all').matches)
	}
	return (
		(o.prototype = {
			setup: function () {
				this.options.setup && this.options.setup(),
					(this.initialised = !0)
			},
			on: function () {
				!this.initialised && this.setup(),
					this.options.match && this.options.match()
			},
			off: function () {
				this.options.unmatch && this.options.unmatch()
			},
			destroy: function () {
				this.options.destroy ? this.options.destroy() : this.off()
			},
			equals: function (e) {
				return this.options === e || this.options.match === e
			},
		}),
		(r.prototype = {
			addHandler: function (e) {
				var t = new o(e)
				this.handlers.push(t), this.matches() && t.on()
			},
			removeHandler: function (e) {
				var n = this.handlers
				t(n, function (t, i) {
					return t.equals(e) ? (t.destroy(), !n.splice(i, 1)) : void 0
				})
			},
			matches: function () {
				return this.mql.matches || this.isUnconditional
			},
			clear: function () {
				t(this.handlers, function (e) {
					e.destroy()
				}),
					this.mql.removeListener(this.listener),
					(this.handlers.length = 0)
			},
			assess: function () {
				var e = this.matches() ? 'on' : 'off'
				t(this.handlers, function (t) {
					t[e]()
				})
			},
		}),
		(s.prototype = {
			register: function (e, o, s) {
				var a = this.queries,
					l = s && this.browserIsIncapable
				return (
					a[e] || (a[e] = new r(e, l)),
					i(o) && (o = { match: o }),
					n(o) || (o = [o]),
					t(o, function (t) {
						i(t) && (t = { match: t }), a[e].addHandler(t)
					}),
					this
				)
			},
			unregister: function (e, t) {
				var n = this.queries[e]
				return (
					n &&
						(t
							? n.removeHandler(t)
							: (n.clear(), delete this.queries[e])),
					this
				)
			},
		}),
		new s()
	)
}),
	/*!
	 * jquery.min.js
	 */ /*! jQuery v2.2.3 | (c) jQuery Foundation | jquery.org/license */
	!(function (e, t) {
		'object' == typeof module && 'object' == typeof module.exports
			? (module.exports = e.document
					? t(e, !0)
					: function (e) {
							if (!e.document)
								throw new Error(
									'jQuery requires a window with a document'
								)
							return t(e)
					  })
			: t(e)
	})('undefined' != typeof window ? window : this, function (e, t) {
		function n(e) {
			var t = !!e && 'length' in e && e.length,
				n = re.type(e)
			return (
				'function' !== n &&
				!re.isWindow(e) &&
				('array' === n ||
					0 === t ||
					('number' == typeof t && t > 0 && t - 1 in e))
			)
		}
		function i(e, t, n) {
			if (re.isFunction(t))
				return re.grep(e, function (e, i) {
					return !!t.call(e, i, e) !== n
				})
			if (t.nodeType)
				return re.grep(e, function (e) {
					return (e === t) !== n
				})
			if ('string' == typeof t) {
				if (ve.test(t)) return re.filter(t, e, n)
				t = re.filter(t, e)
			}
			return re.grep(e, function (e) {
				return K.call(t, e) > -1 !== n
			})
		}
		function o(e, t) {
			for (; (e = e[t]) && 1 !== e.nodeType; );
			return e
		}
		function r(e) {
			var t = {}
			return (
				re.each(e.match(xe) || [], function (e, n) {
					t[n] = !0
				}),
				t
			)
		}
		function s() {
			G.removeEventListener('DOMContentLoaded', s),
				e.removeEventListener('load', s),
				re.ready()
		}
		function a() {
			this.expando = re.expando + a.uid++
		}
		function l(e, t, n) {
			var i
			if (void 0 === n && 1 === e.nodeType)
				if (
					((i = 'data-' + t.replace(Ae, '-$&').toLowerCase()),
					(n = e.getAttribute(i)),
					'string' == typeof n)
				) {
					try {
						n =
							'true' === n ||
							('false' !== n &&
								('null' === n
									? null
									: +n + '' === n
									? +n
									: Ee.test(n)
									? re.parseJSON(n)
									: n))
					} catch (e) {}
					$e.set(e, t, n)
				} else n = void 0
			return n
		}
		function u(e, t, n, i) {
			var o,
				r = 1,
				s = 20,
				a = i
					? function () {
							return i.cur()
					  }
					: function () {
							return re.css(e, t, '')
					  },
				l = a(),
				u = (n && n[3]) || (re.cssNumber[t] ? '' : 'px'),
				c =
					(re.cssNumber[t] || ('px' !== u && +l)) &&
					Ne.exec(re.css(e, t))
			if (c && c[3] !== u) {
				;(u = u || c[3]), (n = n || []), (c = +l || 1)
				do (r = r || '.5'), (c /= r), re.style(e, t, c + u)
				while (r !== (r = a() / l) && 1 !== r && --s)
			}
			return (
				n &&
					((c = +c || +l || 0),
					(o = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
					i && ((i.unit = u), (i.start = c), (i.end = o))),
				o
			)
		}
		function c(e, t) {
			var n =
				'undefined' != typeof e.getElementsByTagName
					? e.getElementsByTagName(t || '*')
					: 'undefined' != typeof e.querySelectorAll
					? e.querySelectorAll(t || '*')
					: []
			return void 0 === t || (t && re.nodeName(e, t))
				? re.merge([e], n)
				: n
		}
		function d(e, t) {
			for (var n = 0, i = e.length; i > n; n++)
				Ce.set(e[n], 'globalEval', !t || Ce.get(t[n], 'globalEval'))
		}
		function p(e, t, n, i, o) {
			for (
				var r,
					s,
					a,
					l,
					u,
					p,
					f = t.createDocumentFragment(),
					h = [],
					v = 0,
					g = e.length;
				g > v;
				v++
			)
				if (((r = e[v]), r || 0 === r))
					if ('object' === re.type(r))
						re.merge(h, r.nodeType ? [r] : r)
					else if (_e.test(r)) {
						for (
							s = s || f.appendChild(t.createElement('div')),
								a = (qe.exec(r) || ['', ''])[1].toLowerCase(),
								l = Le[a] || Le._default,
								s.innerHTML = l[1] + re.htmlPrefilter(r) + l[2],
								p = l[0];
							p--;

						)
							s = s.lastChild
						re.merge(h, s.childNodes),
							(s = f.firstChild),
							(s.textContent = '')
					} else h.push(t.createTextNode(r))
			for (f.textContent = '', v = 0; (r = h[v++]); )
				if (i && re.inArray(r, i) > -1) o && o.push(r)
				else if (
					((u = re.contains(r.ownerDocument, r)),
					(s = c(f.appendChild(r), 'script')),
					u && d(s),
					n)
				)
					for (p = 0; (r = s[p++]); )
						Pe.test(r.type || '') && n.push(r)
			return f
		}
		function f() {
			return !0
		}
		function h() {
			return !1
		}
		function v() {
			try {
				return G.activeElement
			} catch (e) {}
		}
		function g(e, t, n, i, o, r) {
			var s, a
			if ('object' == typeof t) {
				'string' != typeof n && ((i = i || n), (n = void 0))
				for (a in t) g(e, a, n, i, t[a], r)
				return e
			}
			if (
				(null == i && null == o
					? ((o = n), (i = n = void 0))
					: null == o &&
					  ('string' == typeof n
							? ((o = i), (i = void 0))
							: ((o = i), (i = n), (n = void 0))),
				o === !1)
			)
				o = h
			else if (!o) return e
			return (
				1 === r &&
					((s = o),
					(o = function (e) {
						return re().off(e), s.apply(this, arguments)
					}),
					(o.guid = s.guid || (s.guid = re.guid++))),
				e.each(function () {
					re.event.add(this, t, o, i, n)
				})
			)
		}
		function m(e, t) {
			return re.nodeName(e, 'table') &&
				re.nodeName(11 !== t.nodeType ? t : t.firstChild, 'tr')
				? e.getElementsByTagName('tbody')[0] ||
						e.appendChild(e.ownerDocument.createElement('tbody'))
				: e
		}
		function y(e) {
			return (
				(e.type = (null !== e.getAttribute('type')) + '/' + e.type), e
			)
		}
		function b(e) {
			var t = Be.exec(e.type)
			return t ? (e.type = t[1]) : e.removeAttribute('type'), e
		}
		function w(e, t) {
			var n, i, o, r, s, a, l, u
			if (1 === t.nodeType) {
				if (
					Ce.hasData(e) &&
					((r = Ce.access(e)), (s = Ce.set(t, r)), (u = r.events))
				) {
					delete s.handle, (s.events = {})
					for (o in u)
						for (n = 0, i = u[o].length; i > n; n++)
							re.event.add(t, o, u[o][n])
				}
				$e.hasData(e) &&
					((a = $e.access(e)), (l = re.extend({}, a)), $e.set(t, l))
			}
		}
		function x(e, t) {
			var n = t.nodeName.toLowerCase()
			'input' === n && He.test(e.type)
				? (t.checked = e.checked)
				: ('input' !== n && 'textarea' !== n) ||
				  (t.defaultValue = e.defaultValue)
		}
		function k(e, t, n, i) {
			t = J.apply([], t)
			var o,
				r,
				s,
				a,
				l,
				u,
				d = 0,
				f = e.length,
				h = f - 1,
				v = t[0],
				g = re.isFunction(v)
			if (
				g ||
				(f > 1 && 'string' == typeof v && !ie.checkClone && We.test(v))
			)
				return e.each(function (o) {
					var r = e.eq(o)
					g && (t[0] = v.call(this, o, r.html())), k(r, t, n, i)
				})
			if (
				f &&
				((o = p(t, e[0].ownerDocument, !1, e, i)),
				(r = o.firstChild),
				1 === o.childNodes.length && (o = r),
				r || i)
			) {
				for (s = re.map(c(o, 'script'), y), a = s.length; f > d; d++)
					(l = o),
						d !== h &&
							((l = re.clone(l, !0, !0)),
							a && re.merge(s, c(l, 'script'))),
						n.call(e[d], l, d)
				if (a)
					for (
						u = s[s.length - 1].ownerDocument, re.map(s, b), d = 0;
						a > d;
						d++
					)
						(l = s[d]),
							Pe.test(l.type || '') &&
								!Ce.access(l, 'globalEval') &&
								re.contains(u, l) &&
								(l.src
									? re._evalUrl && re._evalUrl(l.src)
									: re.globalEval(
											l.textContent.replace(Ue, '')
									  ))
			}
			return e
		}
		function T(e, t, n) {
			for (
				var i, o = t ? re.filter(t, e) : e, r = 0;
				null != (i = o[r]);
				r++
			)
				n || 1 !== i.nodeType || re.cleanData(c(i)),
					i.parentNode &&
						(n &&
							re.contains(i.ownerDocument, i) &&
							d(c(i, 'script')),
						i.parentNode.removeChild(i))
			return e
		}
		function S(e, t) {
			var n = re(t.createElement(e)).appendTo(t.body),
				i = re.css(n[0], 'display')
			return n.detach(), i
		}
		function C(e) {
			var t = G,
				n = Ye[e]
			return (
				n ||
					((n = S(e, t)),
					('none' !== n && n) ||
						((Xe = (
							Xe ||
							re("<iframe frameborder='0' width='0' height='0'/>")
						).appendTo(t.documentElement)),
						(t = Xe[0].contentDocument),
						t.write(),
						t.close(),
						(n = S(e, t)),
						Xe.detach()),
					(Ye[e] = n)),
				n
			)
		}
		function $(e, t, n) {
			var i,
				o,
				r,
				s,
				a = e.style
			return (
				(n = n || Qe(e)),
				(s = n ? n.getPropertyValue(t) || n[t] : void 0),
				('' !== s && void 0 !== s) ||
					re.contains(e.ownerDocument, e) ||
					(s = re.style(e, t)),
				n &&
					!ie.pixelMarginRight() &&
					Ge.test(s) &&
					Ve.test(t) &&
					((i = a.width),
					(o = a.minWidth),
					(r = a.maxWidth),
					(a.minWidth = a.maxWidth = a.width = s),
					(s = n.width),
					(a.width = i),
					(a.minWidth = o),
					(a.maxWidth = r)),
				void 0 !== s ? s + '' : s
			)
		}
		function E(e, t) {
			return {
				get: function () {
					return e()
						? void delete this.get
						: (this.get = t).apply(this, arguments)
				},
			}
		}
		function A(e) {
			if (e in it) return e
			for (var t = e[0].toUpperCase() + e.slice(1), n = nt.length; n--; )
				if (((e = nt[n] + t), e in it)) return e
		}
		function j(e, t, n) {
			var i = Ne.exec(t)
			return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || 'px') : t
		}
		function N(e, t, n, i, o) {
			for (
				var r =
						n === (i ? 'border' : 'content')
							? 4
							: 'width' === t
							? 1
							: 0,
					s = 0;
				4 > r;
				r += 2
			)
				'margin' === n && (s += re.css(e, n + De[r], !0, o)),
					i
						? ('content' === n &&
								(s -= re.css(e, 'padding' + De[r], !0, o)),
						  'margin' !== n &&
								(s -= re.css(
									e,
									'border' + De[r] + 'Width',
									!0,
									o
								)))
						: ((s += re.css(e, 'padding' + De[r], !0, o)),
						  'padding' !== n &&
								(s += re.css(
									e,
									'border' + De[r] + 'Width',
									!0,
									o
								)))
			return s
		}
		function D(t, n, i) {
			var o = !0,
				r = 'width' === n ? t.offsetWidth : t.offsetHeight,
				s = Qe(t),
				a = 'border-box' === re.css(t, 'boxSizing', !1, s)
			if (
				(G.msFullscreenElement &&
					e.top !== e &&
					t.getClientRects().length &&
					(r = Math.round(100 * t.getBoundingClientRect()[n])),
				0 >= r || null == r)
			) {
				if (
					((r = $(t, n, s)),
					(0 > r || null == r) && (r = t.style[n]),
					Ge.test(r))
				)
					return r
				;(o = a && (ie.boxSizingReliable() || r === t.style[n])),
					(r = parseFloat(r) || 0)
			}
			return r + N(t, n, i || (a ? 'border' : 'content'), o, s) + 'px'
		}
		function O(e, t) {
			for (var n, i, o, r = [], s = 0, a = e.length; a > s; s++)
				(i = e[s]),
					i.style &&
						((r[s] = Ce.get(i, 'olddisplay')),
						(n = i.style.display),
						t
							? (r[s] || 'none' !== n || (i.style.display = ''),
							  '' === i.style.display &&
									Oe(i) &&
									(r[s] = Ce.access(
										i,
										'olddisplay',
										C(i.nodeName)
									)))
							: ((o = Oe(i)),
							  ('none' === n && o) ||
									Ce.set(
										i,
										'olddisplay',
										o ? n : re.css(i, 'display')
									)))
			for (s = 0; a > s; s++)
				(i = e[s]),
					i.style &&
						((t &&
							'none' !== i.style.display &&
							'' !== i.style.display) ||
							(i.style.display = t ? r[s] || '' : 'none'))
			return e
		}
		function H(e, t, n, i, o) {
			return new H.prototype.init(e, t, n, i, o)
		}
		function q() {
			return (
				e.setTimeout(function () {
					ot = void 0
				}),
				(ot = re.now())
			)
		}
		function P(e, t) {
			var n,
				i = 0,
				o = { height: e }
			for (t = t ? 1 : 0; 4 > i; i += 2 - t)
				(n = De[i]), (o['margin' + n] = o['padding' + n] = e)
			return t && (o.opacity = o.width = e), o
		}
		function L(e, t, n) {
			for (
				var i,
					o = (I.tweeners[t] || []).concat(I.tweeners['*']),
					r = 0,
					s = o.length;
				s > r;
				r++
			)
				if ((i = o[r].call(n, t, e))) return i
		}
		function _(e, t, n) {
			var i,
				o,
				r,
				s,
				a,
				l,
				u,
				c,
				d = this,
				p = {},
				f = e.style,
				h = e.nodeType && Oe(e),
				v = Ce.get(e, 'fxshow')
			n.queue ||
				((a = re._queueHooks(e, 'fx')),
				null == a.unqueued &&
					((a.unqueued = 0),
					(l = a.empty.fire),
					(a.empty.fire = function () {
						a.unqueued || l()
					})),
				a.unqueued++,
				d.always(function () {
					d.always(function () {
						a.unqueued--, re.queue(e, 'fx').length || a.empty.fire()
					})
				})),
				1 === e.nodeType &&
					('height' in t || 'width' in t) &&
					((n.overflow = [f.overflow, f.overflowX, f.overflowY]),
					(u = re.css(e, 'display')),
					(c =
						'none' === u
							? Ce.get(e, 'olddisplay') || C(e.nodeName)
							: u),
					'inline' === c &&
						'none' === re.css(e, 'float') &&
						(f.display = 'inline-block')),
				n.overflow &&
					((f.overflow = 'hidden'),
					d.always(function () {
						;(f.overflow = n.overflow[0]),
							(f.overflowX = n.overflow[1]),
							(f.overflowY = n.overflow[2])
					}))
			for (i in t)
				if (((o = t[i]), st.exec(o))) {
					if (
						(delete t[i],
						(r = r || 'toggle' === o),
						o === (h ? 'hide' : 'show'))
					) {
						if ('show' !== o || !v || void 0 === v[i]) continue
						h = !0
					}
					p[i] = (v && v[i]) || re.style(e, i)
				} else u = void 0
			if (re.isEmptyObject(p))
				'inline' === ('none' === u ? C(e.nodeName) : u) &&
					(f.display = u)
			else {
				v
					? 'hidden' in v && (h = v.hidden)
					: (v = Ce.access(e, 'fxshow', {})),
					r && (v.hidden = !h),
					h
						? re(e).show()
						: d.done(function () {
								re(e).hide()
						  }),
					d.done(function () {
						var t
						Ce.remove(e, 'fxshow')
						for (t in p) re.style(e, t, p[t])
					})
				for (i in p)
					(s = L(h ? v[i] : 0, i, d)),
						i in v ||
							((v[i] = s.start),
							h &&
								((s.end = s.start),
								(s.start =
									'width' === i || 'height' === i ? 1 : 0)))
			}
		}
		function z(e, t) {
			var n, i, o, r, s
			for (n in e)
				if (
					((i = re.camelCase(n)),
					(o = t[i]),
					(r = e[n]),
					re.isArray(r) && ((o = r[1]), (r = e[n] = r[0])),
					n !== i && ((e[i] = r), delete e[n]),
					(s = re.cssHooks[i]),
					s && 'expand' in s)
				) {
					;(r = s.expand(r)), delete e[i]
					for (n in r) n in e || ((e[n] = r[n]), (t[n] = o))
				} else t[i] = o
		}
		function I(e, t, n) {
			var i,
				o,
				r = 0,
				s = I.prefilters.length,
				a = re.Deferred().always(function () {
					delete l.elem
				}),
				l = function () {
					if (o) return !1
					for (
						var t = ot || q(),
							n = Math.max(0, u.startTime + u.duration - t),
							i = n / u.duration || 0,
							r = 1 - i,
							s = 0,
							l = u.tweens.length;
						l > s;
						s++
					)
						u.tweens[s].run(r)
					return (
						a.notifyWith(e, [u, r, n]),
						1 > r && l ? n : (a.resolveWith(e, [u]), !1)
					)
				},
				u = a.promise({
					elem: e,
					props: re.extend({}, t),
					opts: re.extend(
						!0,
						{ specialEasing: {}, easing: re.easing._default },
						n
					),
					originalProperties: t,
					originalOptions: n,
					startTime: ot || q(),
					duration: n.duration,
					tweens: [],
					createTween: function (t, n) {
						var i = re.Tween(
							e,
							u.opts,
							t,
							n,
							u.opts.specialEasing[t] || u.opts.easing
						)
						return u.tweens.push(i), i
					},
					stop: function (t) {
						var n = 0,
							i = t ? u.tweens.length : 0
						if (o) return this
						for (o = !0; i > n; n++) u.tweens[n].run(1)
						return (
							t
								? (a.notifyWith(e, [u, 1, 0]),
								  a.resolveWith(e, [u, t]))
								: a.rejectWith(e, [u, t]),
							this
						)
					},
				}),
				c = u.props
			for (z(c, u.opts.specialEasing); s > r; r++)
				if ((i = I.prefilters[r].call(u, e, c, u.opts)))
					return (
						re.isFunction(i.stop) &&
							(re._queueHooks(u.elem, u.opts.queue).stop =
								re.proxy(i.stop, i)),
						i
					)
			return (
				re.map(c, L, u),
				re.isFunction(u.opts.start) && u.opts.start.call(e, u),
				re.fx.timer(
					re.extend(l, { elem: e, anim: u, queue: u.opts.queue })
				),
				u
					.progress(u.opts.progress)
					.done(u.opts.done, u.opts.complete)
					.fail(u.opts.fail)
					.always(u.opts.always)
			)
		}
		function F(e) {
			return (e.getAttribute && e.getAttribute('class')) || ''
		}
		function M(e) {
			return function (t, n) {
				'string' != typeof t && ((n = t), (t = '*'))
				var i,
					o = 0,
					r = t.toLowerCase().match(xe) || []
				if (re.isFunction(n))
					for (; (i = r[o++]); )
						'+' === i[0]
							? ((i = i.slice(1) || '*'),
							  (e[i] = e[i] || []).unshift(n))
							: (e[i] = e[i] || []).push(n)
			}
		}
		function R(e, t, n, i) {
			function o(a) {
				var l
				return (
					(r[a] = !0),
					re.each(e[a] || [], function (e, a) {
						var u = a(t, n, i)
						return 'string' != typeof u || s || r[u]
							? s
								? !(l = u)
								: void 0
							: (t.dataTypes.unshift(u), o(u), !1)
					}),
					l
				)
			}
			var r = {},
				s = e === $t
			return o(t.dataTypes[0]) || (!r['*'] && o('*'))
		}
		function W(e, t) {
			var n,
				i,
				o = re.ajaxSettings.flatOptions || {}
			for (n in t)
				void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n])
			return i && re.extend(!0, e, i), e
		}
		function B(e, t, n) {
			for (
				var i, o, r, s, a = e.contents, l = e.dataTypes;
				'*' === l[0];

			)
				l.shift(),
					void 0 === i &&
						(i = e.mimeType || t.getResponseHeader('Content-Type'))
			if (i)
				for (o in a)
					if (a[o] && a[o].test(i)) {
						l.unshift(o)
						break
					}
			if (l[0] in n) r = l[0]
			else {
				for (o in n) {
					if (!l[0] || e.converters[o + ' ' + l[0]]) {
						r = o
						break
					}
					s || (s = o)
				}
				r = r || s
			}
			return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
		}
		function U(e, t, n, i) {
			var o,
				r,
				s,
				a,
				l,
				u = {},
				c = e.dataTypes.slice()
			if (c[1])
				for (s in e.converters) u[s.toLowerCase()] = e.converters[s]
			for (r = c.shift(); r; )
				if (
					(e.responseFields[r] && (n[e.responseFields[r]] = t),
					!l &&
						i &&
						e.dataFilter &&
						(t = e.dataFilter(t, e.dataType)),
					(l = r),
					(r = c.shift()))
				)
					if ('*' === r) r = l
					else if ('*' !== l && l !== r) {
						if (((s = u[l + ' ' + r] || u['* ' + r]), !s))
							for (o in u)
								if (
									((a = o.split(' ')),
									a[1] === r &&
										(s =
											u[l + ' ' + a[0]] ||
											u['* ' + a[0]]))
								) {
									s === !0
										? (s = u[o])
										: u[o] !== !0 &&
										  ((r = a[0]), c.unshift(a[1]))
									break
								}
						if (s !== !0)
							if (s && e.throws) t = s(t)
							else
								try {
									t = s(t)
								} catch (e) {
									return {
										state: 'parsererror',
										error: s
											? e
											: 'No conversion from ' +
											  l +
											  ' to ' +
											  r,
									}
								}
					}
			return { state: 'success', data: t }
		}
		function X(e, t, n, i) {
			var o
			if (re.isArray(t))
				re.each(t, function (t, o) {
					n || Nt.test(e)
						? i(e, o)
						: X(
								e +
									'[' +
									('object' == typeof o && null != o
										? t
										: '') +
									']',
								o,
								n,
								i
						  )
				})
			else if (n || 'object' !== re.type(t)) i(e, t)
			else for (o in t) X(e + '[' + o + ']', t[o], n, i)
		}
		function Y(e) {
			return re.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
		}
		var V = [],
			G = e.document,
			Q = V.slice,
			J = V.concat,
			Z = V.push,
			K = V.indexOf,
			ee = {},
			te = ee.toString,
			ne = ee.hasOwnProperty,
			ie = {},
			oe = '2.2.3',
			re = function (e, t) {
				return new re.fn.init(e, t)
			},
			se = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			ae = /^-ms-/,
			le = /-([\da-z])/gi,
			ue = function (e, t) {
				return t.toUpperCase()
			}
		;(re.fn = re.prototype =
			{
				jquery: oe,
				constructor: re,
				selector: '',
				length: 0,
				toArray: function () {
					return Q.call(this)
				},
				get: function (e) {
					return null != e
						? 0 > e
							? this[e + this.length]
							: this[e]
						: Q.call(this)
				},
				pushStack: function (e) {
					var t = re.merge(this.constructor(), e)
					return (t.prevObject = this), (t.context = this.context), t
				},
				each: function (e) {
					return re.each(this, e)
				},
				map: function (e) {
					return this.pushStack(
						re.map(this, function (t, n) {
							return e.call(t, n, t)
						})
					)
				},
				slice: function () {
					return this.pushStack(Q.apply(this, arguments))
				},
				first: function () {
					return this.eq(0)
				},
				last: function () {
					return this.eq(-1)
				},
				eq: function (e) {
					var t = this.length,
						n = +e + (0 > e ? t : 0)
					return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
				},
				end: function () {
					return this.prevObject || this.constructor()
				},
				push: Z,
				sort: V.sort,
				splice: V.splice,
			}),
			(re.extend = re.fn.extend =
				function () {
					var e,
						t,
						n,
						i,
						o,
						r,
						s = arguments[0] || {},
						a = 1,
						l = arguments.length,
						u = !1
					for (
						'boolean' == typeof s &&
							((u = s), (s = arguments[a] || {}), a++),
							'object' == typeof s ||
								re.isFunction(s) ||
								(s = {}),
							a === l && ((s = this), a--);
						l > a;
						a++
					)
						if (null != (e = arguments[a]))
							for (t in e)
								(n = s[t]),
									(i = e[t]),
									s !== i &&
										(u &&
										i &&
										(re.isPlainObject(i) ||
											(o = re.isArray(i)))
											? (o
													? ((o = !1),
													  (r =
															n && re.isArray(n)
																? n
																: []))
													: (r =
															n &&
															re.isPlainObject(n)
																? n
																: {}),
											  (s[t] = re.extend(u, r, i)))
											: void 0 !== i && (s[t] = i))
					return s
				}),
			re.extend({
				expando: 'jQuery' + (oe + Math.random()).replace(/\D/g, ''),
				isReady: !0,
				error: function (e) {
					throw new Error(e)
				},
				noop: function () {},
				isFunction: function (e) {
					return 'function' === re.type(e)
				},
				isArray: Array.isArray,
				isWindow: function (e) {
					return null != e && e === e.window
				},
				isNumeric: function (e) {
					var t = e && e.toString()
					return !re.isArray(e) && t - parseFloat(t) + 1 >= 0
				},
				isPlainObject: function (e) {
					var t
					if ('object' !== re.type(e) || e.nodeType || re.isWindow(e))
						return !1
					if (
						e.constructor &&
						!ne.call(e, 'constructor') &&
						!ne.call(e.constructor.prototype || {}, 'isPrototypeOf')
					)
						return !1
					for (t in e);
					return void 0 === t || ne.call(e, t)
				},
				isEmptyObject: function (e) {
					var t
					for (t in e) return !1
					return !0
				},
				type: function (e) {
					return null == e
						? e + ''
						: 'object' == typeof e || 'function' == typeof e
						? ee[te.call(e)] || 'object'
						: typeof e
				},
				globalEval: function (e) {
					var t,
						n = eval
					;(e = re.trim(e)),
						e &&
							(1 === e.indexOf('use strict')
								? ((t = G.createElement('script')),
								  (t.text = e),
								  G.head
										.appendChild(t)
										.parentNode.removeChild(t))
								: n(e))
				},
				camelCase: function (e) {
					return e.replace(ae, 'ms-').replace(le, ue)
				},
				nodeName: function (e, t) {
					return (
						e.nodeName &&
						e.nodeName.toLowerCase() === t.toLowerCase()
					)
				},
				each: function (e, t) {
					var i,
						o = 0
					if (n(e))
						for (
							i = e.length;
							i > o && t.call(e[o], o, e[o]) !== !1;
							o++
						);
					else for (o in e) if (t.call(e[o], o, e[o]) === !1) break
					return e
				},
				trim: function (e) {
					return null == e ? '' : (e + '').replace(se, '')
				},
				makeArray: function (e, t) {
					var i = t || []
					return (
						null != e &&
							(n(Object(e))
								? re.merge(i, 'string' == typeof e ? [e] : e)
								: Z.call(i, e)),
						i
					)
				},
				inArray: function (e, t, n) {
					return null == t ? -1 : K.call(t, e, n)
				},
				merge: function (e, t) {
					for (var n = +t.length, i = 0, o = e.length; n > i; i++)
						e[o++] = t[i]
					return (e.length = o), e
				},
				grep: function (e, t, n) {
					for (var i, o = [], r = 0, s = e.length, a = !n; s > r; r++)
						(i = !t(e[r], r)), i !== a && o.push(e[r])
					return o
				},
				map: function (e, t, i) {
					var o,
						r,
						s = 0,
						a = []
					if (n(e))
						for (o = e.length; o > s; s++)
							(r = t(e[s], s, i)), null != r && a.push(r)
					else
						for (s in e) (r = t(e[s], s, i)), null != r && a.push(r)
					return J.apply([], a)
				},
				guid: 1,
				proxy: function (e, t) {
					var n, i, o
					return (
						'string' == typeof t && ((n = e[t]), (t = e), (e = n)),
						re.isFunction(e)
							? ((i = Q.call(arguments, 2)),
							  (o = function () {
									return e.apply(
										t || this,
										i.concat(Q.call(arguments))
									)
							  }),
							  (o.guid = e.guid = e.guid || re.guid++),
							  o)
							: void 0
					)
				},
				now: Date.now,
				support: ie,
			}),
			'function' == typeof Symbol &&
				(re.fn[Symbol.iterator] = V[Symbol.iterator]),
			re.each(
				'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
					' '
				),
				function (e, t) {
					ee['[object ' + t + ']'] = t.toLowerCase()
				}
			)
		var ce = (function (e) {
			function t(e, t, n, i) {
				var o,
					r,
					s,
					a,
					l,
					u,
					d,
					f,
					h = t && t.ownerDocument,
					v = t ? t.nodeType : 9
				if (
					((n = n || []),
					'string' != typeof e ||
						!e ||
						(1 !== v && 9 !== v && 11 !== v))
				)
					return n
				if (
					!i &&
					((t ? t.ownerDocument || t : F) !== O && D(t),
					(t = t || O),
					q)
				) {
					if (11 !== v && (u = me.exec(e)))
						if ((o = u[1])) {
							if (9 === v) {
								if (!(s = t.getElementById(o))) return n
								if (s.id === o) return n.push(s), n
							} else if (
								h &&
								(s = h.getElementById(o)) &&
								z(t, s) &&
								s.id === o
							)
								return n.push(s), n
						} else {
							if (u[2])
								return Z.apply(n, t.getElementsByTagName(e)), n
							if (
								(o = u[3]) &&
								x.getElementsByClassName &&
								t.getElementsByClassName
							)
								return (
									Z.apply(n, t.getElementsByClassName(o)), n
								)
						}
					if (x.qsa && !U[e + ' '] && (!P || !P.test(e))) {
						if (1 !== v) (h = t), (f = e)
						else if ('object' !== t.nodeName.toLowerCase()) {
							for (
								(a = t.getAttribute('id'))
									? (a = a.replace(be, '\\$&'))
									: t.setAttribute('id', (a = I)),
									d = C(e),
									r = d.length,
									l = pe.test(a)
										? '#' + a
										: "[id='" + a + "']";
								r--;

							)
								d[r] = l + ' ' + p(d[r])
							;(f = d.join(',')),
								(h = (ye.test(e) && c(t.parentNode)) || t)
						}
						if (f)
							try {
								return Z.apply(n, h.querySelectorAll(f)), n
							} catch (e) {
							} finally {
								a === I && t.removeAttribute('id')
							}
					}
				}
				return E(e.replace(ae, '$1'), t, n, i)
			}
			function n() {
				function e(n, i) {
					return (
						t.push(n + ' ') > k.cacheLength && delete e[t.shift()],
						(e[n + ' '] = i)
					)
				}
				var t = []
				return e
			}
			function i(e) {
				return (e[I] = !0), e
			}
			function o(e) {
				var t = O.createElement('div')
				try {
					return !!e(t)
				} catch (e) {
					return !1
				} finally {
					t.parentNode && t.parentNode.removeChild(t), (t = null)
				}
			}
			function r(e, t) {
				for (var n = e.split('|'), i = n.length; i--; )
					k.attrHandle[n[i]] = t
			}
			function s(e, t) {
				var n = t && e,
					i =
						n &&
						1 === e.nodeType &&
						1 === t.nodeType &&
						(~t.sourceIndex || Y) - (~e.sourceIndex || Y)
				if (i) return i
				if (n) for (; (n = n.nextSibling); ) if (n === t) return -1
				return e ? 1 : -1
			}
			function a(e) {
				return function (t) {
					var n = t.nodeName.toLowerCase()
					return 'input' === n && t.type === e
				}
			}
			function l(e) {
				return function (t) {
					var n = t.nodeName.toLowerCase()
					return ('input' === n || 'button' === n) && t.type === e
				}
			}
			function u(e) {
				return i(function (t) {
					return (
						(t = +t),
						i(function (n, i) {
							for (
								var o, r = e([], n.length, t), s = r.length;
								s--;

							)
								n[(o = r[s])] && (n[o] = !(i[o] = n[o]))
						})
					)
				})
			}
			function c(e) {
				return e && 'undefined' != typeof e.getElementsByTagName && e
			}
			function d() {}
			function p(e) {
				for (var t = 0, n = e.length, i = ''; n > t; t++)
					i += e[t].value
				return i
			}
			function f(e, t, n) {
				var i = t.dir,
					o = n && 'parentNode' === i,
					r = R++
				return t.first
					? function (t, n, r) {
							for (; (t = t[i]); )
								if (1 === t.nodeType || o) return e(t, n, r)
					  }
					: function (t, n, s) {
							var a,
								l,
								u,
								c = [M, r]
							if (s) {
								for (; (t = t[i]); )
									if ((1 === t.nodeType || o) && e(t, n, s))
										return !0
							} else
								for (; (t = t[i]); )
									if (1 === t.nodeType || o) {
										if (
											((u = t[I] || (t[I] = {})),
											(l =
												u[t.uniqueID] ||
												(u[t.uniqueID] = {})),
											(a = l[i]) &&
												a[0] === M &&
												a[1] === r)
										)
											return (c[2] = a[2])
										if (((l[i] = c), (c[2] = e(t, n, s))))
											return !0
									}
					  }
			}
			function h(e) {
				return e.length > 1
					? function (t, n, i) {
							for (var o = e.length; o--; )
								if (!e[o](t, n, i)) return !1
							return !0
					  }
					: e[0]
			}
			function v(e, n, i) {
				for (var o = 0, r = n.length; r > o; o++) t(e, n[o], i)
				return i
			}
			function g(e, t, n, i, o) {
				for (
					var r, s = [], a = 0, l = e.length, u = null != t;
					l > a;
					a++
				)
					(r = e[a]) &&
						((n && !n(r, i, o)) || (s.push(r), u && t.push(a)))
				return s
			}
			function m(e, t, n, o, r, s) {
				return (
					o && !o[I] && (o = m(o)),
					r && !r[I] && (r = m(r, s)),
					i(function (i, s, a, l) {
						var u,
							c,
							d,
							p = [],
							f = [],
							h = s.length,
							m = i || v(t || '*', a.nodeType ? [a] : a, []),
							y = !e || (!i && t) ? m : g(m, p, e, a, l),
							b = n ? (r || (i ? e : h || o) ? [] : s) : y
						if ((n && n(y, b, a, l), o))
							for (
								u = g(b, f), o(u, [], a, l), c = u.length;
								c--;

							)
								(d = u[c]) && (b[f[c]] = !(y[f[c]] = d))
						if (i) {
							if (r || e) {
								if (r) {
									for (u = [], c = b.length; c--; )
										(d = b[c]) && u.push((y[c] = d))
									r(null, (b = []), u, l)
								}
								for (c = b.length; c--; )
									(d = b[c]) &&
										(u = r ? ee(i, d) : p[c]) > -1 &&
										(i[u] = !(s[u] = d))
							}
						} else (b = g(b === s ? b.splice(h, b.length) : b)), r ? r(null, s, b, l) : Z.apply(s, b)
					})
				)
			}
			function y(e) {
				for (
					var t,
						n,
						i,
						o = e.length,
						r = k.relative[e[0].type],
						s = r || k.relative[' '],
						a = r ? 1 : 0,
						l = f(
							function (e) {
								return e === t
							},
							s,
							!0
						),
						u = f(
							function (e) {
								return ee(t, e) > -1
							},
							s,
							!0
						),
						c = [
							function (e, n, i) {
								var o =
									(!r && (i || n !== A)) ||
									((t = n).nodeType ? l(e, n, i) : u(e, n, i))
								return (t = null), o
							},
						];
					o > a;
					a++
				)
					if ((n = k.relative[e[a].type])) c = [f(h(c), n)]
					else {
						if (
							((n = k.filter[e[a].type].apply(
								null,
								e[a].matches
							)),
							n[I])
						) {
							for (i = ++a; o > i && !k.relative[e[i].type]; i++);
							return m(
								a > 1 && h(c),
								a > 1 &&
									p(
										e.slice(0, a - 1).concat({
											value:
												' ' === e[a - 2].type
													? '*'
													: '',
										})
									).replace(ae, '$1'),
								n,
								i > a && y(e.slice(a, i)),
								o > i && y((e = e.slice(i))),
								o > i && p(e)
							)
						}
						c.push(n)
					}
				return h(c)
			}
			function b(e, n) {
				var o = n.length > 0,
					r = e.length > 0,
					s = function (i, s, a, l, u) {
						var c,
							d,
							p,
							f = 0,
							h = '0',
							v = i && [],
							m = [],
							y = A,
							b = i || (r && k.find.TAG('*', u)),
							w = (M += null == y ? 1 : Math.random() || 0.1),
							x = b.length
						for (
							u && (A = s === O || s || u);
							h !== x && null != (c = b[h]);
							h++
						) {
							if (r && c) {
								for (
									d = 0,
										s ||
											c.ownerDocument === O ||
											(D(c), (a = !q));
									(p = e[d++]);

								)
									if (p(c, s || O, a)) {
										l.push(c)
										break
									}
								u && (M = w)
							}
							o && ((c = !p && c) && f--, i && v.push(c))
						}
						if (((f += h), o && h !== f)) {
							for (d = 0; (p = n[d++]); ) p(v, m, s, a)
							if (i) {
								if (f > 0)
									for (; h--; )
										v[h] || m[h] || (m[h] = Q.call(l))
								m = g(m)
							}
							Z.apply(l, m),
								u &&
									!i &&
									m.length > 0 &&
									f + n.length > 1 &&
									t.uniqueSort(l)
						}
						return u && ((M = w), (A = y)), v
					}
				return o ? i(s) : s
			}
			var w,
				x,
				k,
				T,
				S,
				C,
				$,
				E,
				A,
				j,
				N,
				D,
				O,
				H,
				q,
				P,
				L,
				_,
				z,
				I = 'sizzle' + 1 * new Date(),
				F = e.document,
				M = 0,
				R = 0,
				W = n(),
				B = n(),
				U = n(),
				X = function (e, t) {
					return e === t && (N = !0), 0
				},
				Y = 1 << 31,
				V = {}.hasOwnProperty,
				G = [],
				Q = G.pop,
				J = G.push,
				Z = G.push,
				K = G.slice,
				ee = function (e, t) {
					for (var n = 0, i = e.length; i > n; n++)
						if (e[n] === t) return n
					return -1
				},
				te =
					'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
				ne = '[\\x20\\t\\r\\n\\f]',
				ie = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
				oe =
					'\\[' +
					ne +
					'*(' +
					ie +
					')(?:' +
					ne +
					'*([*^$|!~]?=)' +
					ne +
					'*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
					ie +
					'))|)' +
					ne +
					'*\\]',
				re =
					':(' +
					ie +
					')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
					oe +
					')*)|.*)\\)|)',
				se = new RegExp(ne + '+', 'g'),
				ae = new RegExp(
					'^' + ne + '+|((?:^|[^\\\\])(?:\\\\.)*)' + ne + '+$',
					'g'
				),
				le = new RegExp('^' + ne + '*,' + ne + '*'),
				ue = new RegExp('^' + ne + '*([>+~]|' + ne + ')' + ne + '*'),
				ce = new RegExp('=' + ne + '*([^\\]\'"]*?)' + ne + '*\\]', 'g'),
				de = new RegExp(re),
				pe = new RegExp('^' + ie + '$'),
				fe = {
					ID: new RegExp('^#(' + ie + ')'),
					CLASS: new RegExp('^\\.(' + ie + ')'),
					TAG: new RegExp('^(' + ie + '|[*])'),
					ATTR: new RegExp('^' + oe),
					PSEUDO: new RegExp('^' + re),
					CHILD: new RegExp(
						'^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
							ne +
							'*(even|odd|(([+-]|)(\\d*)n|)' +
							ne +
							'*(?:([+-]|)' +
							ne +
							'*(\\d+)|))' +
							ne +
							'*\\)|)',
						'i'
					),
					bool: new RegExp('^(?:' + te + ')$', 'i'),
					needsContext: new RegExp(
						'^' +
							ne +
							'*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
							ne +
							'*((?:-\\d)?\\d*)' +
							ne +
							'*\\)|)(?=[^-]|$)',
						'i'
					),
				},
				he = /^(?:input|select|textarea|button)$/i,
				ve = /^h\d$/i,
				ge = /^[^{]+\{\s*\[native \w/,
				me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				ye = /[+~]/,
				be = /'|\\/g,
				we = new RegExp(
					'\\\\([\\da-f]{1,6}' + ne + '?|(' + ne + ')|.)',
					'ig'
				),
				xe = function (e, t, n) {
					var i = '0x' + t - 65536
					return i !== i || n
						? t
						: 0 > i
						? String.fromCharCode(i + 65536)
						: String.fromCharCode(
								(i >> 10) | 55296,
								(1023 & i) | 56320
						  )
				},
				ke = function () {
					D()
				}
			try {
				Z.apply((G = K.call(F.childNodes)), F.childNodes),
					G[F.childNodes.length].nodeType
			} catch (e) {
				Z = {
					apply: G.length
						? function (e, t) {
								J.apply(e, K.call(t))
						  }
						: function (e, t) {
								for (
									var n = e.length, i = 0;
									(e[n++] = t[i++]);

								);
								e.length = n - 1
						  },
				}
			}
			;(x = t.support = {}),
				(S = t.isXML =
					function (e) {
						var t = e && (e.ownerDocument || e).documentElement
						return !!t && 'HTML' !== t.nodeName
					}),
				(D = t.setDocument =
					function (e) {
						var t,
							n,
							i = e ? e.ownerDocument || e : F
						return i !== O && 9 === i.nodeType && i.documentElement
							? ((O = i),
							  (H = O.documentElement),
							  (q = !S(O)),
							  (n = O.defaultView) &&
									n.top !== n &&
									(n.addEventListener
										? n.addEventListener('unload', ke, !1)
										: n.attachEvent &&
										  n.attachEvent('onunload', ke)),
							  (x.attributes = o(function (e) {
									return (
										(e.className = 'i'),
										!e.getAttribute('className')
									)
							  })),
							  (x.getElementsByTagName = o(function (e) {
									return (
										e.appendChild(O.createComment('')),
										!e.getElementsByTagName('*').length
									)
							  })),
							  (x.getElementsByClassName = ge.test(
									O.getElementsByClassName
							  )),
							  (x.getById = o(function (e) {
									return (
										(H.appendChild(e).id = I),
										!O.getElementsByName ||
											!O.getElementsByName(I).length
									)
							  })),
							  x.getById
									? ((k.find.ID = function (e, t) {
											if (
												'undefined' !=
													typeof t.getElementById &&
												q
											) {
												var n = t.getElementById(e)
												return n ? [n] : []
											}
									  }),
									  (k.filter.ID = function (e) {
											var t = e.replace(we, xe)
											return function (e) {
												return (
													e.getAttribute('id') === t
												)
											}
									  }))
									: (delete k.find.ID,
									  (k.filter.ID = function (e) {
											var t = e.replace(we, xe)
											return function (e) {
												var n =
													'undefined' !=
														typeof e.getAttributeNode &&
													e.getAttributeNode('id')
												return n && n.value === t
											}
									  })),
							  (k.find.TAG = x.getElementsByTagName
									? function (e, t) {
											return 'undefined' !=
												typeof t.getElementsByTagName
												? t.getElementsByTagName(e)
												: x.qsa
												? t.querySelectorAll(e)
												: void 0
									  }
									: function (e, t) {
											var n,
												i = [],
												o = 0,
												r = t.getElementsByTagName(e)
											if ('*' === e) {
												for (; (n = r[o++]); )
													1 === n.nodeType &&
														i.push(n)
												return i
											}
											return r
									  }),
							  (k.find.CLASS =
									x.getElementsByClassName &&
									function (e, t) {
										return 'undefined' !=
											typeof t.getElementsByClassName && q
											? t.getElementsByClassName(e)
											: void 0
									}),
							  (L = []),
							  (P = []),
							  (x.qsa = ge.test(O.querySelectorAll)) &&
									(o(function (e) {
										;(H.appendChild(e).innerHTML =
											"<a id='" +
											I +
											"'></a><select id='" +
											I +
											"-\r\\' msallowcapture=''><option selected=''></option></select>"),
											e.querySelectorAll(
												"[msallowcapture^='']"
											).length &&
												P.push(
													'[*^$]=' +
														ne +
														'*(?:\'\'|"")'
												),
											e.querySelectorAll('[selected]')
												.length ||
												P.push(
													'\\[' +
														ne +
														'*(?:value|' +
														te +
														')'
												),
											e.querySelectorAll(
												'[id~=' + I + '-]'
											).length || P.push('~='),
											e.querySelectorAll(':checked')
												.length || P.push(':checked'),
											e.querySelectorAll('a#' + I + '+*')
												.length || P.push('.#.+[+~]')
									}),
									o(function (e) {
										var t = O.createElement('input')
										t.setAttribute('type', 'hidden'),
											e
												.appendChild(t)
												.setAttribute('name', 'D'),
											e.querySelectorAll('[name=d]')
												.length &&
												P.push(
													'name' + ne + '*[*^$|!~]?='
												),
											e.querySelectorAll(':enabled')
												.length ||
												P.push(':enabled', ':disabled'),
											e.querySelectorAll('*,:x'),
											P.push(',.*:')
									})),
							  (x.matchesSelector = ge.test(
									(_ =
										H.matches ||
										H.webkitMatchesSelector ||
										H.mozMatchesSelector ||
										H.oMatchesSelector ||
										H.msMatchesSelector)
							  )) &&
									o(function (e) {
										;(x.disconnectedMatch = _.call(
											e,
											'div'
										)),
											_.call(e, "[s!='']:x"),
											L.push('!=', re)
									}),
							  (P = P.length && new RegExp(P.join('|'))),
							  (L = L.length && new RegExp(L.join('|'))),
							  (t = ge.test(H.compareDocumentPosition)),
							  (z =
									t || ge.test(H.contains)
										? function (e, t) {
												var n =
														9 === e.nodeType
															? e.documentElement
															: e,
													i = t && t.parentNode
												return (
													e === i ||
													!(
														!i ||
														1 !== i.nodeType ||
														!(n.contains
															? n.contains(i)
															: e.compareDocumentPosition &&
															  16 &
																	e.compareDocumentPosition(
																		i
																	))
													)
												)
										  }
										: function (e, t) {
												if (t)
													for (; (t = t.parentNode); )
														if (t === e) return !0
												return !1
										  }),
							  (X = t
									? function (e, t) {
											if (e === t) return (N = !0), 0
											var n =
												!e.compareDocumentPosition -
												!t.compareDocumentPosition
											return n
												? n
												: ((n =
														(e.ownerDocument ||
															e) ===
														(t.ownerDocument || t)
															? e.compareDocumentPosition(
																	t
															  )
															: 1),
												  1 & n ||
												  (!x.sortDetached &&
														t.compareDocumentPosition(
															e
														) === n)
														? e === O ||
														  (e.ownerDocument ===
																F &&
																z(F, e))
															? -1
															: t === O ||
															  (t.ownerDocument ===
																	F &&
																	z(F, t))
															? 1
															: j
															? ee(j, e) -
															  ee(j, t)
															: 0
														: 4 & n
														? -1
														: 1)
									  }
									: function (e, t) {
											if (e === t) return (N = !0), 0
											var n,
												i = 0,
												o = e.parentNode,
												r = t.parentNode,
												a = [e],
												l = [t]
											if (!o || !r)
												return e === O
													? -1
													: t === O
													? 1
													: o
													? -1
													: r
													? 1
													: j
													? ee(j, e) - ee(j, t)
													: 0
											if (o === r) return s(e, t)
											for (n = e; (n = n.parentNode); )
												a.unshift(n)
											for (n = t; (n = n.parentNode); )
												l.unshift(n)
											for (; a[i] === l[i]; ) i++
											return i
												? s(a[i], l[i])
												: a[i] === F
												? -1
												: l[i] === F
												? 1
												: 0
									  }),
							  O)
							: O
					}),
				(t.matches = function (e, n) {
					return t(e, null, null, n)
				}),
				(t.matchesSelector = function (e, n) {
					if (
						((e.ownerDocument || e) !== O && D(e),
						(n = n.replace(ce, "='$1']")),
						x.matchesSelector &&
							q &&
							!U[n + ' '] &&
							(!L || !L.test(n)) &&
							(!P || !P.test(n)))
					)
						try {
							var i = _.call(e, n)
							if (
								i ||
								x.disconnectedMatch ||
								(e.document && 11 !== e.document.nodeType)
							)
								return i
						} catch (e) {}
					return t(n, O, null, [e]).length > 0
				}),
				(t.contains = function (e, t) {
					return (e.ownerDocument || e) !== O && D(e), z(e, t)
				}),
				(t.attr = function (e, t) {
					;(e.ownerDocument || e) !== O && D(e)
					var n = k.attrHandle[t.toLowerCase()],
						i =
							n && V.call(k.attrHandle, t.toLowerCase())
								? n(e, t, !q)
								: void 0
					return void 0 !== i
						? i
						: x.attributes || !q
						? e.getAttribute(t)
						: (i = e.getAttributeNode(t)) && i.specified
						? i.value
						: null
				}),
				(t.error = function (e) {
					throw new Error(
						'Syntax error, unrecognized expression: ' + e
					)
				}),
				(t.uniqueSort = function (e) {
					var t,
						n = [],
						i = 0,
						o = 0
					if (
						((N = !x.detectDuplicates),
						(j = !x.sortStable && e.slice(0)),
						e.sort(X),
						N)
					) {
						for (; (t = e[o++]); ) t === e[o] && (i = n.push(o))
						for (; i--; ) e.splice(n[i], 1)
					}
					return (j = null), e
				}),
				(T = t.getText =
					function (e) {
						var t,
							n = '',
							i = 0,
							o = e.nodeType
						if (o) {
							if (1 === o || 9 === o || 11 === o) {
								if ('string' == typeof e.textContent)
									return e.textContent
								for (e = e.firstChild; e; e = e.nextSibling)
									n += T(e)
							} else if (3 === o || 4 === o) return e.nodeValue
						} else for (; (t = e[i++]); ) n += T(t)
						return n
					}),
				(k = t.selectors =
					{
						cacheLength: 50,
						createPseudo: i,
						match: fe,
						attrHandle: {},
						find: {},
						relative: {
							'>': { dir: 'parentNode', first: !0 },
							' ': { dir: 'parentNode' },
							'+': { dir: 'previousSibling', first: !0 },
							'~': { dir: 'previousSibling' },
						},
						preFilter: {
							ATTR: function (e) {
								return (
									(e[1] = e[1].replace(we, xe)),
									(e[3] = (
										e[3] ||
										e[4] ||
										e[5] ||
										''
									).replace(we, xe)),
									'~=' === e[2] && (e[3] = ' ' + e[3] + ' '),
									e.slice(0, 4)
								)
							},
							CHILD: function (e) {
								return (
									(e[1] = e[1].toLowerCase()),
									'nth' === e[1].slice(0, 3)
										? (e[3] || t.error(e[0]),
										  (e[4] = +(e[4]
												? e[5] + (e[6] || 1)
												: 2 *
												  ('even' === e[3] ||
														'odd' === e[3]))),
										  (e[5] = +(
												e[7] + e[8] || 'odd' === e[3]
										  )))
										: e[3] && t.error(e[0]),
									e
								)
							},
							PSEUDO: function (e) {
								var t,
									n = !e[6] && e[2]
								return fe.CHILD.test(e[0])
									? null
									: (e[3]
											? (e[2] = e[4] || e[5] || '')
											: n &&
											  de.test(n) &&
											  (t = C(n, !0)) &&
											  (t =
													n.indexOf(
														')',
														n.length - t
													) - n.length) &&
											  ((e[0] = e[0].slice(0, t)),
											  (e[2] = n.slice(0, t))),
									  e.slice(0, 3))
							},
						},
						filter: {
							TAG: function (e) {
								var t = e.replace(we, xe).toLowerCase()
								return '*' === e
									? function () {
											return !0
									  }
									: function (e) {
											return (
												e.nodeName &&
												e.nodeName.toLowerCase() === t
											)
									  }
							},
							CLASS: function (e) {
								var t = W[e + ' ']
								return (
									t ||
									((t = new RegExp(
										'(^|' + ne + ')' + e + '(' + ne + '|$)'
									)) &&
										W(e, function (e) {
											return t.test(
												('string' ==
													typeof e.className &&
													e.className) ||
													('undefined' !=
														typeof e.getAttribute &&
														e.getAttribute(
															'class'
														)) ||
													''
											)
										}))
								)
							},
							ATTR: function (e, n, i) {
								return function (o) {
									var r = t.attr(o, e)
									return null == r
										? '!=' === n
										: !n ||
												((r += ''),
												'=' === n
													? r === i
													: '!=' === n
													? r !== i
													: '^=' === n
													? i && 0 === r.indexOf(i)
													: '*=' === n
													? i && r.indexOf(i) > -1
													: '$=' === n
													? i &&
													  r.slice(-i.length) === i
													: '~=' === n
													? (
															' ' +
															r.replace(se, ' ') +
															' '
													  ).indexOf(i) > -1
													: '|=' === n &&
													  (r === i ||
															r.slice(
																0,
																i.length + 1
															) ===
																i + '-'))
								}
							},
							CHILD: function (e, t, n, i, o) {
								var r = 'nth' !== e.slice(0, 3),
									s = 'last' !== e.slice(-4),
									a = 'of-type' === t
								return 1 === i && 0 === o
									? function (e) {
											return !!e.parentNode
									  }
									: function (t, n, l) {
											var u,
												c,
												d,
												p,
												f,
												h,
												v =
													r !== s
														? 'nextSibling'
														: 'previousSibling',
												g = t.parentNode,
												m =
													a &&
													t.nodeName.toLowerCase(),
												y = !l && !a,
												b = !1
											if (g) {
												if (r) {
													for (; v; ) {
														for (
															p = t;
															(p = p[v]);

														)
															if (
																a
																	? p.nodeName.toLowerCase() ===
																	  m
																	: 1 ===
																	  p.nodeType
															)
																return !1
														h = v =
															'only' === e &&
															!h &&
															'nextSibling'
													}
													return !0
												}
												if (
													((h = [
														s
															? g.firstChild
															: g.lastChild,
													]),
													s && y)
												) {
													for (
														p = g,
															d =
																p[I] ||
																(p[I] = {}),
															c =
																d[p.uniqueID] ||
																(d[p.uniqueID] =
																	{}),
															u = c[e] || [],
															f =
																u[0] === M &&
																u[1],
															b = f && u[2],
															p =
																f &&
																g.childNodes[f];
														(p =
															(++f &&
																p &&
																p[v]) ||
															(b = f = 0) ||
															h.pop());

													)
														if (
															1 === p.nodeType &&
															++b &&
															p === t
														) {
															c[e] = [M, f, b]
															break
														}
												} else if (
													(y &&
														((p = t),
														(d =
															p[I] ||
															(p[I] = {})),
														(c =
															d[p.uniqueID] ||
															(d[p.uniqueID] =
																{})),
														(u = c[e] || []),
														(f =
															u[0] === M && u[1]),
														(b = f)),
													b === !1)
												)
													for (
														;
														(p =
															(++f &&
																p &&
																p[v]) ||
															(b = f = 0) ||
															h.pop()) &&
														((a
															? p.nodeName.toLowerCase() !==
															  m
															: 1 !==
															  p.nodeType) ||
															!++b ||
															(y &&
																((d =
																	p[I] ||
																	(p[I] =
																		{})),
																(c =
																	d[
																		p
																			.uniqueID
																	] ||
																	(d[
																		p.uniqueID
																	] = {})),
																(c[e] = [
																	M,
																	b,
																])),
															p !== t));

													);
												return (
													(b -= o),
													b === i ||
														(b % i === 0 &&
															b / i >= 0)
												)
											}
									  }
							},
							PSEUDO: function (e, n) {
								var o,
									r =
										k.pseudos[e] ||
										k.setFilters[e.toLowerCase()] ||
										t.error('unsupported pseudo: ' + e)
								return r[I]
									? r(n)
									: r.length > 1
									? ((o = [e, e, '', n]),
									  k.setFilters.hasOwnProperty(
											e.toLowerCase()
									  )
											? i(function (e, t) {
													for (
														var i,
															o = r(e, n),
															s = o.length;
														s--;

													)
														(i = ee(e, o[s])),
															(e[i] = !(t[i] =
																o[s]))
											  })
											: function (e) {
													return r(e, 0, o)
											  })
									: r
							},
						},
						pseudos: {
							not: i(function (e) {
								var t = [],
									n = [],
									o = $(e.replace(ae, '$1'))
								return o[I]
									? i(function (e, t, n, i) {
											for (
												var r,
													s = o(e, null, i, []),
													a = e.length;
												a--;

											)
												(r = s[a]) &&
													(e[a] = !(t[a] = r))
									  })
									: function (e, i, r) {
											return (
												(t[0] = e),
												o(t, null, r, n),
												(t[0] = null),
												!n.pop()
											)
									  }
							}),
							has: i(function (e) {
								return function (n) {
									return t(e, n).length > 0
								}
							}),
							contains: i(function (e) {
								return (
									(e = e.replace(we, xe)),
									function (t) {
										return (
											(
												t.textContent ||
												t.innerText ||
												T(t)
											).indexOf(e) > -1
										)
									}
								)
							}),
							lang: i(function (e) {
								return (
									pe.test(e || '') ||
										t.error('unsupported lang: ' + e),
									(e = e.replace(we, xe).toLowerCase()),
									function (t) {
										var n
										do
											if (
												(n = q
													? t.lang
													: t.getAttribute(
															'xml:lang'
													  ) ||
													  t.getAttribute('lang'))
											)
												return (
													(n = n.toLowerCase()),
													n === e ||
														0 === n.indexOf(e + '-')
												)
										while (
											(t = t.parentNode) &&
											1 === t.nodeType
										)
										return !1
									}
								)
							}),
							target: function (t) {
								var n = e.location && e.location.hash
								return n && n.slice(1) === t.id
							},
							root: function (e) {
								return e === H
							},
							focus: function (e) {
								return (
									e === O.activeElement &&
									(!O.hasFocus || O.hasFocus()) &&
									!!(e.type || e.href || ~e.tabIndex)
								)
							},
							enabled: function (e) {
								return e.disabled === !1
							},
							disabled: function (e) {
								return e.disabled === !0
							},
							checked: function (e) {
								var t = e.nodeName.toLowerCase()
								return (
									('input' === t && !!e.checked) ||
									('option' === t && !!e.selected)
								)
							},
							selected: function (e) {
								return (
									e.parentNode && e.parentNode.selectedIndex,
									e.selected === !0
								)
							},
							empty: function (e) {
								for (e = e.firstChild; e; e = e.nextSibling)
									if (e.nodeType < 6) return !1
								return !0
							},
							parent: function (e) {
								return !k.pseudos.empty(e)
							},
							header: function (e) {
								return ve.test(e.nodeName)
							},
							input: function (e) {
								return he.test(e.nodeName)
							},
							button: function (e) {
								var t = e.nodeName.toLowerCase()
								return (
									('input' === t && 'button' === e.type) ||
									'button' === t
								)
							},
							text: function (e) {
								var t
								return (
									'input' === e.nodeName.toLowerCase() &&
									'text' === e.type &&
									(null == (t = e.getAttribute('type')) ||
										'text' === t.toLowerCase())
								)
							},
							first: u(function () {
								return [0]
							}),
							last: u(function (e, t) {
								return [t - 1]
							}),
							eq: u(function (e, t, n) {
								return [0 > n ? n + t : n]
							}),
							even: u(function (e, t) {
								for (var n = 0; t > n; n += 2) e.push(n)
								return e
							}),
							odd: u(function (e, t) {
								for (var n = 1; t > n; n += 2) e.push(n)
								return e
							}),
							lt: u(function (e, t, n) {
								for (var i = 0 > n ? n + t : n; --i >= 0; )
									e.push(i)
								return e
							}),
							gt: u(function (e, t, n) {
								for (var i = 0 > n ? n + t : n; ++i < t; )
									e.push(i)
								return e
							}),
						},
					}),
				(k.pseudos.nth = k.pseudos.eq)
			for (w in {
				radio: !0,
				checkbox: !0,
				file: !0,
				password: !0,
				image: !0,
			})
				k.pseudos[w] = a(w)
			for (w in { submit: !0, reset: !0 }) k.pseudos[w] = l(w)
			return (
				(d.prototype = k.filters = k.pseudos),
				(k.setFilters = new d()),
				(C = t.tokenize =
					function (e, n) {
						var i,
							o,
							r,
							s,
							a,
							l,
							u,
							c = B[e + ' ']
						if (c) return n ? 0 : c.slice(0)
						for (a = e, l = [], u = k.preFilter; a; ) {
							;(i && !(o = le.exec(a))) ||
								(o && (a = a.slice(o[0].length) || a),
								l.push((r = []))),
								(i = !1),
								(o = ue.exec(a)) &&
									((i = o.shift()),
									r.push({
										value: i,
										type: o[0].replace(ae, ' '),
									}),
									(a = a.slice(i.length)))
							for (s in k.filter)
								!(o = fe[s].exec(a)) ||
									(u[s] && !(o = u[s](o))) ||
									((i = o.shift()),
									r.push({ value: i, type: s, matches: o }),
									(a = a.slice(i.length)))
							if (!i) break
						}
						return n ? a.length : a ? t.error(e) : B(e, l).slice(0)
					}),
				($ = t.compile =
					function (e, t) {
						var n,
							i = [],
							o = [],
							r = U[e + ' ']
						if (!r) {
							for (t || (t = C(e)), n = t.length; n--; )
								(r = y(t[n])), r[I] ? i.push(r) : o.push(r)
							;(r = U(e, b(o, i))), (r.selector = e)
						}
						return r
					}),
				(E = t.select =
					function (e, t, n, i) {
						var o,
							r,
							s,
							a,
							l,
							u = 'function' == typeof e && e,
							d = !i && C((e = u.selector || e))
						if (((n = n || []), 1 === d.length)) {
							if (
								((r = d[0] = d[0].slice(0)),
								r.length > 2 &&
									'ID' === (s = r[0]).type &&
									x.getById &&
									9 === t.nodeType &&
									q &&
									k.relative[r[1].type])
							) {
								if (
									((t = (k.find.ID(
										s.matches[0].replace(we, xe),
										t
									) || [])[0]),
									!t)
								)
									return n
								u && (t = t.parentNode),
									(e = e.slice(r.shift().value.length))
							}
							for (
								o = fe.needsContext.test(e) ? 0 : r.length;
								o-- && ((s = r[o]), !k.relative[(a = s.type)]);

							)
								if (
									(l = k.find[a]) &&
									(i = l(
										s.matches[0].replace(we, xe),
										(ye.test(r[0].type) &&
											c(t.parentNode)) ||
											t
									))
								) {
									if (
										(r.splice(o, 1),
										(e = i.length && p(r)),
										!e)
									)
										return Z.apply(n, i), n
									break
								}
						}
						return (
							(u || $(e, d))(
								i,
								t,
								!q,
								n,
								!t || (ye.test(e) && c(t.parentNode)) || t
							),
							n
						)
					}),
				(x.sortStable = I.split('').sort(X).join('') === I),
				(x.detectDuplicates = !!N),
				D(),
				(x.sortDetached = o(function (e) {
					return 1 & e.compareDocumentPosition(O.createElement('div'))
				})),
				o(function (e) {
					return (
						(e.innerHTML = "<a href='#'></a>"),
						'#' === e.firstChild.getAttribute('href')
					)
				}) ||
					r('type|href|height|width', function (e, t, n) {
						return n
							? void 0
							: e.getAttribute(
									t,
									'type' === t.toLowerCase() ? 1 : 2
							  )
					}),
				(x.attributes &&
					o(function (e) {
						return (
							(e.innerHTML = '<input/>'),
							e.firstChild.setAttribute('value', ''),
							'' === e.firstChild.getAttribute('value')
						)
					})) ||
					r('value', function (e, t, n) {
						return n || 'input' !== e.nodeName.toLowerCase()
							? void 0
							: e.defaultValue
					}),
				o(function (e) {
					return null == e.getAttribute('disabled')
				}) ||
					r(te, function (e, t, n) {
						var i
						return n
							? void 0
							: e[t] === !0
							? t.toLowerCase()
							: (i = e.getAttributeNode(t)) && i.specified
							? i.value
							: null
					}),
				t
			)
		})(e)
		;(re.find = ce),
			(re.expr = ce.selectors),
			(re.expr[':'] = re.expr.pseudos),
			(re.uniqueSort = re.unique = ce.uniqueSort),
			(re.text = ce.getText),
			(re.isXMLDoc = ce.isXML),
			(re.contains = ce.contains)
		var de = function (e, t, n) {
				for (
					var i = [], o = void 0 !== n;
					(e = e[t]) && 9 !== e.nodeType;

				)
					if (1 === e.nodeType) {
						if (o && re(e).is(n)) break
						i.push(e)
					}
				return i
			},
			pe = function (e, t) {
				for (var n = []; e; e = e.nextSibling)
					1 === e.nodeType && e !== t && n.push(e)
				return n
			},
			fe = re.expr.match.needsContext,
			he = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
			ve = /^.[^:#\[\.,]*$/
		;(re.filter = function (e, t, n) {
			var i = t[0]
			return (
				n && (e = ':not(' + e + ')'),
				1 === t.length && 1 === i.nodeType
					? re.find.matchesSelector(i, e)
						? [i]
						: []
					: re.find.matches(
							e,
							re.grep(t, function (e) {
								return 1 === e.nodeType
							})
					  )
			)
		}),
			re.fn.extend({
				find: function (e) {
					var t,
						n = this.length,
						i = [],
						o = this
					if ('string' != typeof e)
						return this.pushStack(
							re(e).filter(function () {
								for (t = 0; n > t; t++)
									if (re.contains(o[t], this)) return !0
							})
						)
					for (t = 0; n > t; t++) re.find(e, o[t], i)
					return (
						(i = this.pushStack(n > 1 ? re.unique(i) : i)),
						(i.selector = this.selector
							? this.selector + ' ' + e
							: e),
						i
					)
				},
				filter: function (e) {
					return this.pushStack(i(this, e || [], !1))
				},
				not: function (e) {
					return this.pushStack(i(this, e || [], !0))
				},
				is: function (e) {
					return !!i(
						this,
						'string' == typeof e && fe.test(e) ? re(e) : e || [],
						!1
					).length
				},
			})
		var ge,
			me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
			ye = (re.fn.init = function (e, t, n) {
				var i, o
				if (!e) return this
				if (((n = n || ge), 'string' == typeof e)) {
					if (
						((i =
							'<' === e[0] &&
							'>' === e[e.length - 1] &&
							e.length >= 3
								? [null, e, null]
								: me.exec(e)),
						!i || (!i[1] && t))
					)
						return !t || t.jquery
							? (t || n).find(e)
							: this.constructor(t).find(e)
					if (i[1]) {
						if (
							((t = t instanceof re ? t[0] : t),
							re.merge(
								this,
								re.parseHTML(
									i[1],
									t && t.nodeType ? t.ownerDocument || t : G,
									!0
								)
							),
							he.test(i[1]) && re.isPlainObject(t))
						)
							for (i in t)
								re.isFunction(this[i])
									? this[i](t[i])
									: this.attr(i, t[i])
						return this
					}
					return (
						(o = G.getElementById(i[2])),
						o && o.parentNode && ((this.length = 1), (this[0] = o)),
						(this.context = G),
						(this.selector = e),
						this
					)
				}
				return e.nodeType
					? ((this.context = this[0] = e), (this.length = 1), this)
					: re.isFunction(e)
					? void 0 !== n.ready
						? n.ready(e)
						: e(re)
					: (void 0 !== e.selector &&
							((this.selector = e.selector),
							(this.context = e.context)),
					  re.makeArray(e, this))
			})
		;(ye.prototype = re.fn), (ge = re(G))
		var be = /^(?:parents|prev(?:Until|All))/,
			we = { children: !0, contents: !0, next: !0, prev: !0 }
		re.fn.extend({
			has: function (e) {
				var t = re(e, this),
					n = t.length
				return this.filter(function () {
					for (var e = 0; n > e; e++)
						if (re.contains(this, t[e])) return !0
				})
			},
			closest: function (e, t) {
				for (
					var n,
						i = 0,
						o = this.length,
						r = [],
						s =
							fe.test(e) || 'string' != typeof e
								? re(e, t || this.context)
								: 0;
					o > i;
					i++
				)
					for (n = this[i]; n && n !== t; n = n.parentNode)
						if (
							n.nodeType < 11 &&
							(s
								? s.index(n) > -1
								: 1 === n.nodeType &&
								  re.find.matchesSelector(n, e))
						) {
							r.push(n)
							break
						}
				return this.pushStack(r.length > 1 ? re.uniqueSort(r) : r)
			},
			index: function (e) {
				return e
					? 'string' == typeof e
						? K.call(re(e), this[0])
						: K.call(this, e.jquery ? e[0] : e)
					: this[0] && this[0].parentNode
					? this.first().prevAll().length
					: -1
			},
			add: function (e, t) {
				return this.pushStack(
					re.uniqueSort(re.merge(this.get(), re(e, t)))
				)
			},
			addBack: function (e) {
				return this.add(
					null == e ? this.prevObject : this.prevObject.filter(e)
				)
			},
		}),
			re.each(
				{
					parent: function (e) {
						var t = e.parentNode
						return t && 11 !== t.nodeType ? t : null
					},
					parents: function (e) {
						return de(e, 'parentNode')
					},
					parentsUntil: function (e, t, n) {
						return de(e, 'parentNode', n)
					},
					next: function (e) {
						return o(e, 'nextSibling')
					},
					prev: function (e) {
						return o(e, 'previousSibling')
					},
					nextAll: function (e) {
						return de(e, 'nextSibling')
					},
					prevAll: function (e) {
						return de(e, 'previousSibling')
					},
					nextUntil: function (e, t, n) {
						return de(e, 'nextSibling', n)
					},
					prevUntil: function (e, t, n) {
						return de(e, 'previousSibling', n)
					},
					siblings: function (e) {
						return pe((e.parentNode || {}).firstChild, e)
					},
					children: function (e) {
						return pe(e.firstChild)
					},
					contents: function (e) {
						return e.contentDocument || re.merge([], e.childNodes)
					},
				},
				function (e, t) {
					re.fn[e] = function (n, i) {
						var o = re.map(this, t, n)
						return (
							'Until' !== e.slice(-5) && (i = n),
							i && 'string' == typeof i && (o = re.filter(i, o)),
							this.length > 1 &&
								(we[e] || re.uniqueSort(o),
								be.test(e) && o.reverse()),
							this.pushStack(o)
						)
					}
				}
			)
		var xe = /\S+/g
		;(re.Callbacks = function (e) {
			e = 'string' == typeof e ? r(e) : re.extend({}, e)
			var t,
				n,
				i,
				o,
				s = [],
				a = [],
				l = -1,
				u = function () {
					for (o = e.once, i = t = !0; a.length; l = -1)
						for (n = a.shift(); ++l < s.length; )
							s[l].apply(n[0], n[1]) === !1 &&
								e.stopOnFalse &&
								((l = s.length), (n = !1))
					e.memory || (n = !1), (t = !1), o && (s = n ? [] : '')
				},
				c = {
					add: function () {
						return (
							s &&
								(n && !t && ((l = s.length - 1), a.push(n)),
								(function t(n) {
									re.each(n, function (n, i) {
										re.isFunction(i)
											? (e.unique && c.has(i)) ||
											  s.push(i)
											: i &&
											  i.length &&
											  'string' !== re.type(i) &&
											  t(i)
									})
								})(arguments),
								n && !t && u()),
							this
						)
					},
					remove: function () {
						return (
							re.each(arguments, function (e, t) {
								for (var n; (n = re.inArray(t, s, n)) > -1; )
									s.splice(n, 1), l >= n && l--
							}),
							this
						)
					},
					has: function (e) {
						return e ? re.inArray(e, s) > -1 : s.length > 0
					},
					empty: function () {
						return s && (s = []), this
					},
					disable: function () {
						return (o = a = []), (s = n = ''), this
					},
					disabled: function () {
						return !s
					},
					lock: function () {
						return (o = a = []), n || (s = n = ''), this
					},
					locked: function () {
						return !!o
					},
					fireWith: function (e, n) {
						return (
							o ||
								((n = n || []),
								(n = [e, n.slice ? n.slice() : n]),
								a.push(n),
								t || u()),
							this
						)
					},
					fire: function () {
						return c.fireWith(this, arguments), this
					},
					fired: function () {
						return !!i
					},
				}
			return c
		}),
			re.extend({
				Deferred: function (e) {
					var t = [
							[
								'resolve',
								'done',
								re.Callbacks('once memory'),
								'resolved',
							],
							[
								'reject',
								'fail',
								re.Callbacks('once memory'),
								'rejected',
							],
							['notify', 'progress', re.Callbacks('memory')],
						],
						n = 'pending',
						i = {
							state: function () {
								return n
							},
							always: function () {
								return o.done(arguments).fail(arguments), this
							},
							then: function () {
								var e = arguments
								return re
									.Deferred(function (n) {
										re.each(t, function (t, r) {
											var s = re.isFunction(e[t]) && e[t]
											o[r[1]](function () {
												var e =
													s &&
													s.apply(this, arguments)
												e && re.isFunction(e.promise)
													? e
															.promise()
															.progress(n.notify)
															.done(n.resolve)
															.fail(n.reject)
													: n[r[0] + 'With'](
															this === i
																? n.promise()
																: this,
															s ? [e] : arguments
													  )
											})
										}),
											(e = null)
									})
									.promise()
							},
							promise: function (e) {
								return null != e ? re.extend(e, i) : i
							},
						},
						o = {}
					return (
						(i.pipe = i.then),
						re.each(t, function (e, r) {
							var s = r[2],
								a = r[3]
							;(i[r[1]] = s.add),
								a &&
									s.add(
										function () {
											n = a
										},
										t[1 ^ e][2].disable,
										t[2][2].lock
									),
								(o[r[0]] = function () {
									return (
										o[r[0] + 'With'](
											this === o ? i : this,
											arguments
										),
										this
									)
								}),
								(o[r[0] + 'With'] = s.fireWith)
						}),
						i.promise(o),
						e && e.call(o, o),
						o
					)
				},
				when: function (e) {
					var t,
						n,
						i,
						o = 0,
						r = Q.call(arguments),
						s = r.length,
						a = 1 !== s || (e && re.isFunction(e.promise)) ? s : 0,
						l = 1 === a ? e : re.Deferred(),
						u = function (e, n, i) {
							return function (o) {
								;(n[e] = this),
									(i[e] =
										arguments.length > 1
											? Q.call(arguments)
											: o),
									i === t
										? l.notifyWith(n, i)
										: --a || l.resolveWith(n, i)
							}
						}
					if (s > 1)
						for (
							t = new Array(s),
								n = new Array(s),
								i = new Array(s);
							s > o;
							o++
						)
							r[o] && re.isFunction(r[o].promise)
								? r[o]
										.promise()
										.progress(u(o, n, t))
										.done(u(o, i, r))
										.fail(l.reject)
								: --a
					return a || l.resolveWith(i, r), l.promise()
				},
			})
		var ke
		;(re.fn.ready = function (e) {
			return re.ready.promise().done(e), this
		}),
			re.extend({
				isReady: !1,
				readyWait: 1,
				holdReady: function (e) {
					e ? re.readyWait++ : re.ready(!0)
				},
				ready: function (e) {
					;(e === !0 ? --re.readyWait : re.isReady) ||
						((re.isReady = !0),
						(e !== !0 && --re.readyWait > 0) ||
							(ke.resolveWith(G, [re]),
							re.fn.triggerHandler &&
								(re(G).triggerHandler('ready'),
								re(G).off('ready'))))
				},
			}),
			(re.ready.promise = function (t) {
				return (
					ke ||
						((ke = re.Deferred()),
						'complete' === G.readyState ||
						('loading' !== G.readyState &&
							!G.documentElement.doScroll)
							? e.setTimeout(re.ready)
							: (G.addEventListener('DOMContentLoaded', s),
							  e.addEventListener('load', s))),
					ke.promise(t)
				)
			}),
			re.ready.promise()
		var Te = function (e, t, n, i, o, r, s) {
				var a = 0,
					l = e.length,
					u = null == n
				if ('object' === re.type(n)) {
					o = !0
					for (a in n) Te(e, t, a, n[a], !0, r, s)
				} else if (
					void 0 !== i &&
					((o = !0),
					re.isFunction(i) || (s = !0),
					u &&
						(s
							? (t.call(e, i), (t = null))
							: ((u = t),
							  (t = function (e, t, n) {
									return u.call(re(e), n)
							  }))),
					t)
				)
					for (; l > a; a++)
						t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)))
				return o ? e : u ? t.call(e) : l ? t(e[0], n) : r
			},
			Se = function (e) {
				return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
			}
		;(a.uid = 1),
			(a.prototype = {
				register: function (e, t) {
					var n = t || {}
					return (
						e.nodeType
							? (e[this.expando] = n)
							: Object.defineProperty(e, this.expando, {
									value: n,
									writable: !0,
									configurable: !0,
							  }),
						e[this.expando]
					)
				},
				cache: function (e) {
					if (!Se(e)) return {}
					var t = e[this.expando]
					return (
						t ||
							((t = {}),
							Se(e) &&
								(e.nodeType
									? (e[this.expando] = t)
									: Object.defineProperty(e, this.expando, {
											value: t,
											configurable: !0,
									  }))),
						t
					)
				},
				set: function (e, t, n) {
					var i,
						o = this.cache(e)
					if ('string' == typeof t) o[t] = n
					else for (i in t) o[i] = t[i]
					return o
				},
				get: function (e, t) {
					return void 0 === t
						? this.cache(e)
						: e[this.expando] && e[this.expando][t]
				},
				access: function (e, t, n) {
					var i
					return void 0 === t ||
						(t && 'string' == typeof t && void 0 === n)
						? ((i = this.get(e, t)),
						  void 0 !== i ? i : this.get(e, re.camelCase(t)))
						: (this.set(e, t, n), void 0 !== n ? n : t)
				},
				remove: function (e, t) {
					var n,
						i,
						o,
						r = e[this.expando]
					if (void 0 !== r) {
						if (void 0 === t) this.register(e)
						else {
							re.isArray(t)
								? (i = t.concat(t.map(re.camelCase)))
								: ((o = re.camelCase(t)),
								  t in r
										? (i = [t, o])
										: ((i = o),
										  (i =
												i in r
													? [i]
													: i.match(xe) || []))),
								(n = i.length)
							for (; n--; ) delete r[i[n]]
						}
						;(void 0 === t || re.isEmptyObject(r)) &&
							(e.nodeType
								? (e[this.expando] = void 0)
								: delete e[this.expando])
					}
				},
				hasData: function (e) {
					var t = e[this.expando]
					return void 0 !== t && !re.isEmptyObject(t)
				},
			})
		var Ce = new a(),
			$e = new a(),
			Ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			Ae = /[A-Z]/g
		re.extend({
			hasData: function (e) {
				return $e.hasData(e) || Ce.hasData(e)
			},
			data: function (e, t, n) {
				return $e.access(e, t, n)
			},
			removeData: function (e, t) {
				$e.remove(e, t)
			},
			_data: function (e, t, n) {
				return Ce.access(e, t, n)
			},
			_removeData: function (e, t) {
				Ce.remove(e, t)
			},
		}),
			re.fn.extend({
				data: function (e, t) {
					var n,
						i,
						o,
						r = this[0],
						s = r && r.attributes
					if (void 0 === e) {
						if (
							this.length &&
							((o = $e.get(r)),
							1 === r.nodeType && !Ce.get(r, 'hasDataAttrs'))
						) {
							for (n = s.length; n--; )
								s[n] &&
									((i = s[n].name),
									0 === i.indexOf('data-') &&
										((i = re.camelCase(i.slice(5))),
										l(r, i, o[i])))
							Ce.set(r, 'hasDataAttrs', !0)
						}
						return o
					}
					return 'object' == typeof e
						? this.each(function () {
								$e.set(this, e)
						  })
						: Te(
								this,
								function (t) {
									var n, i
									if (r && void 0 === t) {
										if (
											((n =
												$e.get(r, e) ||
												$e.get(
													r,
													e
														.replace(Ae, '-$&')
														.toLowerCase()
												)),
											void 0 !== n)
										)
											return n
										if (
											((i = re.camelCase(e)),
											(n = $e.get(r, i)),
											void 0 !== n)
										)
											return n
										if (
											((n = l(r, i, void 0)),
											void 0 !== n)
										)
											return n
									} else
										(i = re.camelCase(e)),
											this.each(function () {
												var n = $e.get(this, i)
												$e.set(this, i, t),
													e.indexOf('-') > -1 &&
														void 0 !== n &&
														$e.set(this, e, t)
											})
								},
								null,
								t,
								arguments.length > 1,
								null,
								!0
						  )
				},
				removeData: function (e) {
					return this.each(function () {
						$e.remove(this, e)
					})
				},
			}),
			re.extend({
				queue: function (e, t, n) {
					var i
					return e
						? ((t = (t || 'fx') + 'queue'),
						  (i = Ce.get(e, t)),
						  n &&
								(!i || re.isArray(n)
									? (i = Ce.access(e, t, re.makeArray(n)))
									: i.push(n)),
						  i || [])
						: void 0
				},
				dequeue: function (e, t) {
					t = t || 'fx'
					var n = re.queue(e, t),
						i = n.length,
						o = n.shift(),
						r = re._queueHooks(e, t),
						s = function () {
							re.dequeue(e, t)
						}
					'inprogress' === o && ((o = n.shift()), i--),
						o &&
							('fx' === t && n.unshift('inprogress'),
							delete r.stop,
							o.call(e, s, r)),
						!i && r && r.empty.fire()
				},
				_queueHooks: function (e, t) {
					var n = t + 'queueHooks'
					return (
						Ce.get(e, n) ||
						Ce.access(e, n, {
							empty: re.Callbacks('once memory').add(function () {
								Ce.remove(e, [t + 'queue', n])
							}),
						})
					)
				},
			}),
			re.fn.extend({
				queue: function (e, t) {
					var n = 2
					return (
						'string' != typeof e && ((t = e), (e = 'fx'), n--),
						arguments.length < n
							? re.queue(this[0], e)
							: void 0 === t
							? this
							: this.each(function () {
									var n = re.queue(this, e, t)
									re._queueHooks(this, e),
										'fx' === e &&
											'inprogress' !== n[0] &&
											re.dequeue(this, e)
							  })
					)
				},
				dequeue: function (e) {
					return this.each(function () {
						re.dequeue(this, e)
					})
				},
				clearQueue: function (e) {
					return this.queue(e || 'fx', [])
				},
				promise: function (e, t) {
					var n,
						i = 1,
						o = re.Deferred(),
						r = this,
						s = this.length,
						a = function () {
							--i || o.resolveWith(r, [r])
						}
					for (
						'string' != typeof e && ((t = e), (e = void 0)),
							e = e || 'fx';
						s--;

					)
						(n = Ce.get(r[s], e + 'queueHooks')),
							n && n.empty && (i++, n.empty.add(a))
					return a(), o.promise(t)
				},
			})
		var je = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
			Ne = new RegExp('^(?:([+-])=|)(' + je + ')([a-z%]*)$', 'i'),
			De = ['Top', 'Right', 'Bottom', 'Left'],
			Oe = function (e, t) {
				return (
					(e = t || e),
					'none' === re.css(e, 'display') ||
						!re.contains(e.ownerDocument, e)
				)
			},
			He = /^(?:checkbox|radio)$/i,
			qe = /<([\w:-]+)/,
			Pe = /^$|\/(?:java|ecma)script/i,
			Le = {
				option: [1, "<select multiple='multiple'>", '</select>'],
				thead: [1, '<table>', '</table>'],
				col: [2, '<table><colgroup>', '</colgroup></table>'],
				tr: [2, '<table><tbody>', '</tbody></table>'],
				td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
				_default: [0, '', ''],
			}
		;(Le.optgroup = Le.option),
			(Le.tbody = Le.tfoot = Le.colgroup = Le.caption = Le.thead),
			(Le.th = Le.td)
		var _e = /<|&#?\w+;/
		!(function () {
			var e = G.createDocumentFragment(),
				t = e.appendChild(G.createElement('div')),
				n = G.createElement('input')
			n.setAttribute('type', 'radio'),
				n.setAttribute('checked', 'checked'),
				n.setAttribute('name', 't'),
				t.appendChild(n),
				(ie.checkClone = t
					.cloneNode(!0)
					.cloneNode(!0).lastChild.checked),
				(t.innerHTML = '<textarea>x</textarea>'),
				(ie.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue)
		})()
		var ze = /^key/,
			Ie = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
			Fe = /^([^.]*)(?:\.(.+)|)/
		;(re.event = {
			global: {},
			add: function (e, t, n, i, o) {
				var r,
					s,
					a,
					l,
					u,
					c,
					d,
					p,
					f,
					h,
					v,
					g = Ce.get(e)
				if (g)
					for (
						n.handler &&
							((r = n), (n = r.handler), (o = r.selector)),
							n.guid || (n.guid = re.guid++),
							(l = g.events) || (l = g.events = {}),
							(s = g.handle) ||
								(s = g.handle =
									function (t) {
										return 'undefined' != typeof re &&
											re.event.triggered !== t.type
											? re.event.dispatch.apply(
													e,
													arguments
											  )
											: void 0
									}),
							t = (t || '').match(xe) || [''],
							u = t.length;
						u--;

					)
						(a = Fe.exec(t[u]) || []),
							(f = v = a[1]),
							(h = (a[2] || '').split('.').sort()),
							f &&
								((d = re.event.special[f] || {}),
								(f = (o ? d.delegateType : d.bindType) || f),
								(d = re.event.special[f] || {}),
								(c = re.extend(
									{
										type: f,
										origType: v,
										data: i,
										handler: n,
										guid: n.guid,
										selector: o,
										needsContext:
											o &&
											re.expr.match.needsContext.test(o),
										namespace: h.join('.'),
									},
									r
								)),
								(p = l[f]) ||
									((p = l[f] = []),
									(p.delegateCount = 0),
									(d.setup &&
										d.setup.call(e, i, h, s) !== !1) ||
										(e.addEventListener &&
											e.addEventListener(f, s))),
								d.add &&
									(d.add.call(e, c),
									c.handler.guid ||
										(c.handler.guid = n.guid)),
								o
									? p.splice(p.delegateCount++, 0, c)
									: p.push(c),
								(re.event.global[f] = !0))
			},
			remove: function (e, t, n, i, o) {
				var r,
					s,
					a,
					l,
					u,
					c,
					d,
					p,
					f,
					h,
					v,
					g = Ce.hasData(e) && Ce.get(e)
				if (g && (l = g.events)) {
					for (t = (t || '').match(xe) || [''], u = t.length; u--; )
						if (
							((a = Fe.exec(t[u]) || []),
							(f = v = a[1]),
							(h = (a[2] || '').split('.').sort()),
							f)
						) {
							for (
								d = re.event.special[f] || {},
									f = (i ? d.delegateType : d.bindType) || f,
									p = l[f] || [],
									a =
										a[2] &&
										new RegExp(
											'(^|\\.)' +
												h.join('\\.(?:.*\\.|)') +
												'(\\.|$)'
										),
									s = r = p.length;
								r--;

							)
								(c = p[r]),
									(!o && v !== c.origType) ||
										(n && n.guid !== c.guid) ||
										(a && !a.test(c.namespace)) ||
										(i &&
											i !== c.selector &&
											('**' !== i || !c.selector)) ||
										(p.splice(r, 1),
										c.selector && p.delegateCount--,
										d.remove && d.remove.call(e, c))
							s &&
								!p.length &&
								((d.teardown &&
									d.teardown.call(e, h, g.handle) !== !1) ||
									re.removeEvent(e, f, g.handle),
								delete l[f])
						} else
							for (f in l) re.event.remove(e, f + t[u], n, i, !0)
					re.isEmptyObject(l) && Ce.remove(e, 'handle events')
				}
			},
			dispatch: function (e) {
				e = re.event.fix(e)
				var t,
					n,
					i,
					o,
					r,
					s = [],
					a = Q.call(arguments),
					l = (Ce.get(this, 'events') || {})[e.type] || [],
					u = re.event.special[e.type] || {}
				if (
					((a[0] = e),
					(e.delegateTarget = this),
					!u.preDispatch || u.preDispatch.call(this, e) !== !1)
				) {
					for (
						s = re.event.handlers.call(this, e, l), t = 0;
						(o = s[t++]) && !e.isPropagationStopped();

					)
						for (
							e.currentTarget = o.elem, n = 0;
							(r = o.handlers[n++]) &&
							!e.isImmediatePropagationStopped();

						)
							(e.rnamespace && !e.rnamespace.test(r.namespace)) ||
								((e.handleObj = r),
								(e.data = r.data),
								(i = (
									(re.event.special[r.origType] || {})
										.handle || r.handler
								).apply(o.elem, a)),
								void 0 !== i &&
									(e.result = i) === !1 &&
									(e.preventDefault(), e.stopPropagation()))
					return (
						u.postDispatch && u.postDispatch.call(this, e), e.result
					)
				}
			},
			handlers: function (e, t) {
				var n,
					i,
					o,
					r,
					s = [],
					a = t.delegateCount,
					l = e.target
				if (
					a &&
					l.nodeType &&
					('click' !== e.type || isNaN(e.button) || e.button < 1)
				)
					for (; l !== this; l = l.parentNode || this)
						if (
							1 === l.nodeType &&
							(l.disabled !== !0 || 'click' !== e.type)
						) {
							for (i = [], n = 0; a > n; n++)
								(r = t[n]),
									(o = r.selector + ' '),
									void 0 === i[o] &&
										(i[o] = r.needsContext
											? re(o, this).index(l) > -1
											: re.find(o, this, null, [l])
													.length),
									i[o] && i.push(r)
							i.length && s.push({ elem: l, handlers: i })
						}
				return (
					a < t.length &&
						s.push({ elem: this, handlers: t.slice(a) }),
					s
				)
			},
			props: 'altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(
				' '
			),
			fixHooks: {},
			keyHooks: {
				props: 'char charCode key keyCode'.split(' '),
				filter: function (e, t) {
					return (
						null == e.which &&
							(e.which =
								null != t.charCode ? t.charCode : t.keyCode),
						e
					)
				},
			},
			mouseHooks: {
				props: 'button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement'.split(
					' '
				),
				filter: function (e, t) {
					var n,
						i,
						o,
						r = t.button
					return (
						null == e.pageX &&
							null != t.clientX &&
							((n = e.target.ownerDocument || G),
							(i = n.documentElement),
							(o = n.body),
							(e.pageX =
								t.clientX +
								((i && i.scrollLeft) ||
									(o && o.scrollLeft) ||
									0) -
								((i && i.clientLeft) ||
									(o && o.clientLeft) ||
									0)),
							(e.pageY =
								t.clientY +
								((i && i.scrollTop) ||
									(o && o.scrollTop) ||
									0) -
								((i && i.clientTop) ||
									(o && o.clientTop) ||
									0))),
						e.which ||
							void 0 === r ||
							(e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0),
						e
					)
				},
			},
			fix: function (e) {
				if (e[re.expando]) return e
				var t,
					n,
					i,
					o = e.type,
					r = e,
					s = this.fixHooks[o]
				for (
					s ||
						(this.fixHooks[o] = s =
							Ie.test(o)
								? this.mouseHooks
								: ze.test(o)
								? this.keyHooks
								: {}),
						i = s.props ? this.props.concat(s.props) : this.props,
						e = new re.Event(r),
						t = i.length;
					t--;

				)
					(n = i[t]), (e[n] = r[n])
				return (
					e.target || (e.target = G),
					3 === e.target.nodeType && (e.target = e.target.parentNode),
					s.filter ? s.filter(e, r) : e
				)
			},
			special: {
				load: { noBubble: !0 },
				focus: {
					trigger: function () {
						return this !== v() && this.focus
							? (this.focus(), !1)
							: void 0
					},
					delegateType: 'focusin',
				},
				blur: {
					trigger: function () {
						return this === v() && this.blur
							? (this.blur(), !1)
							: void 0
					},
					delegateType: 'focusout',
				},
				click: {
					trigger: function () {
						return 'checkbox' === this.type &&
							this.click &&
							re.nodeName(this, 'input')
							? (this.click(), !1)
							: void 0
					},
					_default: function (e) {
						return re.nodeName(e.target, 'a')
					},
				},
				beforeunload: {
					postDispatch: function (e) {
						void 0 !== e.result &&
							e.originalEvent &&
							(e.originalEvent.returnValue = e.result)
					},
				},
			},
		}),
			(re.removeEvent = function (e, t, n) {
				e.removeEventListener && e.removeEventListener(t, n)
			}),
			(re.Event = function (e, t) {
				return this instanceof re.Event
					? (e && e.type
							? ((this.originalEvent = e),
							  (this.type = e.type),
							  (this.isDefaultPrevented =
									e.defaultPrevented ||
									(void 0 === e.defaultPrevented &&
										e.returnValue === !1)
										? f
										: h))
							: (this.type = e),
					  t && re.extend(this, t),
					  (this.timeStamp = (e && e.timeStamp) || re.now()),
					  void (this[re.expando] = !0))
					: new re.Event(e, t)
			}),
			(re.Event.prototype = {
				constructor: re.Event,
				isDefaultPrevented: h,
				isPropagationStopped: h,
				isImmediatePropagationStopped: h,
				preventDefault: function () {
					var e = this.originalEvent
					;(this.isDefaultPrevented = f), e && e.preventDefault()
				},
				stopPropagation: function () {
					var e = this.originalEvent
					;(this.isPropagationStopped = f), e && e.stopPropagation()
				},
				stopImmediatePropagation: function () {
					var e = this.originalEvent
					;(this.isImmediatePropagationStopped = f),
						e && e.stopImmediatePropagation(),
						this.stopPropagation()
				},
			}),
			re.each(
				{
					mouseenter: 'mouseover',
					mouseleave: 'mouseout',
					pointerenter: 'pointerover',
					pointerleave: 'pointerout',
				},
				function (e, t) {
					re.event.special[e] = {
						delegateType: t,
						bindType: t,
						handle: function (e) {
							var n,
								i = this,
								o = e.relatedTarget,
								r = e.handleObj
							return (
								(o && (o === i || re.contains(i, o))) ||
									((e.type = r.origType),
									(n = r.handler.apply(this, arguments)),
									(e.type = t)),
								n
							)
						},
					}
				}
			),
			re.fn.extend({
				on: function (e, t, n, i) {
					return g(this, e, t, n, i)
				},
				one: function (e, t, n, i) {
					return g(this, e, t, n, i, 1)
				},
				off: function (e, t, n) {
					var i, o
					if (e && e.preventDefault && e.handleObj)
						return (
							(i = e.handleObj),
							re(e.delegateTarget).off(
								i.namespace
									? i.origType + '.' + i.namespace
									: i.origType,
								i.selector,
								i.handler
							),
							this
						)
					if ('object' == typeof e) {
						for (o in e) this.off(o, t, e[o])
						return this
					}
					return (
						(t !== !1 && 'function' != typeof t) ||
							((n = t), (t = void 0)),
						n === !1 && (n = h),
						this.each(function () {
							re.event.remove(this, e, n, t)
						})
					)
				},
			})
		var Me =
				/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
			Re = /<script|<style|<link/i,
			We = /checked\s*(?:[^=]|=\s*.checked.)/i,
			Be = /^true\/(.*)/,
			Ue = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
		re.extend({
			htmlPrefilter: function (e) {
				return e.replace(Me, '<$1></$2>')
			},
			clone: function (e, t, n) {
				var i,
					o,
					r,
					s,
					a = e.cloneNode(!0),
					l = re.contains(e.ownerDocument, e)
				if (
					!(
						ie.noCloneChecked ||
						(1 !== e.nodeType && 11 !== e.nodeType) ||
						re.isXMLDoc(e)
					)
				)
					for (s = c(a), r = c(e), i = 0, o = r.length; o > i; i++)
						x(r[i], s[i])
				if (t)
					if (n)
						for (
							r = r || c(e), s = s || c(a), i = 0, o = r.length;
							o > i;
							i++
						)
							w(r[i], s[i])
					else w(e, a)
				return (
					(s = c(a, 'script')),
					s.length > 0 && d(s, !l && c(e, 'script')),
					a
				)
			},
			cleanData: function (e) {
				for (
					var t, n, i, o = re.event.special, r = 0;
					void 0 !== (n = e[r]);
					r++
				)
					if (Se(n)) {
						if ((t = n[Ce.expando])) {
							if (t.events)
								for (i in t.events)
									o[i]
										? re.event.remove(n, i)
										: re.removeEvent(n, i, t.handle)
							n[Ce.expando] = void 0
						}
						n[$e.expando] && (n[$e.expando] = void 0)
					}
			},
		}),
			re.fn.extend({
				domManip: k,
				detach: function (e) {
					return T(this, e, !0)
				},
				remove: function (e) {
					return T(this, e)
				},
				text: function (e) {
					return Te(
						this,
						function (e) {
							return void 0 === e
								? re.text(this)
								: this.empty().each(function () {
										;(1 !== this.nodeType &&
											11 !== this.nodeType &&
											9 !== this.nodeType) ||
											(this.textContent = e)
								  })
						},
						null,
						e,
						arguments.length
					)
				},
				append: function () {
					return k(this, arguments, function (e) {
						if (
							1 === this.nodeType ||
							11 === this.nodeType ||
							9 === this.nodeType
						) {
							var t = m(this, e)
							t.appendChild(e)
						}
					})
				},
				prepend: function () {
					return k(this, arguments, function (e) {
						if (
							1 === this.nodeType ||
							11 === this.nodeType ||
							9 === this.nodeType
						) {
							var t = m(this, e)
							t.insertBefore(e, t.firstChild)
						}
					})
				},
				before: function () {
					return k(this, arguments, function (e) {
						this.parentNode && this.parentNode.insertBefore(e, this)
					})
				},
				after: function () {
					return k(this, arguments, function (e) {
						this.parentNode &&
							this.parentNode.insertBefore(e, this.nextSibling)
					})
				},
				empty: function () {
					for (var e, t = 0; null != (e = this[t]); t++)
						1 === e.nodeType &&
							(re.cleanData(c(e, !1)), (e.textContent = ''))
					return this
				},
				clone: function (e, t) {
					return (
						(e = null != e && e),
						(t = null == t ? e : t),
						this.map(function () {
							return re.clone(this, e, t)
						})
					)
				},
				html: function (e) {
					return Te(
						this,
						function (e) {
							var t = this[0] || {},
								n = 0,
								i = this.length
							if (void 0 === e && 1 === t.nodeType)
								return t.innerHTML
							if (
								'string' == typeof e &&
								!Re.test(e) &&
								!Le[(qe.exec(e) || ['', ''])[1].toLowerCase()]
							) {
								e = re.htmlPrefilter(e)
								try {
									for (; i > n; n++)
										(t = this[n] || {}),
											1 === t.nodeType &&
												(re.cleanData(c(t, !1)),
												(t.innerHTML = e))
									t = 0
								} catch (e) {}
							}
							t && this.empty().append(e)
						},
						null,
						e,
						arguments.length
					)
				},
				replaceWith: function () {
					var e = []
					return k(
						this,
						arguments,
						function (t) {
							var n = this.parentNode
							re.inArray(this, e) < 0 &&
								(re.cleanData(c(this)),
								n && n.replaceChild(t, this))
						},
						e
					)
				},
			}),
			re.each(
				{
					appendTo: 'append',
					prependTo: 'prepend',
					insertBefore: 'before',
					insertAfter: 'after',
					replaceAll: 'replaceWith',
				},
				function (e, t) {
					re.fn[e] = function (e) {
						for (
							var n, i = [], o = re(e), r = o.length - 1, s = 0;
							r >= s;
							s++
						)
							(n = s === r ? this : this.clone(!0)),
								re(o[s])[t](n),
								Z.apply(i, n.get())
						return this.pushStack(i)
					}
				}
			)
		var Xe,
			Ye = { HTML: 'block', BODY: 'block' },
			Ve = /^margin/,
			Ge = new RegExp('^(' + je + ')(?!px)[a-z%]+$', 'i'),
			Qe = function (t) {
				var n = t.ownerDocument.defaultView
				return (n && n.opener) || (n = e), n.getComputedStyle(t)
			},
			Je = function (e, t, n, i) {
				var o,
					r,
					s = {}
				for (r in t) (s[r] = e.style[r]), (e.style[r] = t[r])
				o = n.apply(e, i || [])
				for (r in t) e.style[r] = s[r]
				return o
			},
			Ze = G.documentElement
		!(function () {
			function t() {
				;(a.style.cssText =
					'-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%'),
					(a.innerHTML = ''),
					Ze.appendChild(s)
				var t = e.getComputedStyle(a)
				;(n = '1%' !== t.top),
					(r = '2px' === t.marginLeft),
					(i = '4px' === t.width),
					(a.style.marginRight = '50%'),
					(o = '4px' === t.marginRight),
					Ze.removeChild(s)
			}
			var n,
				i,
				o,
				r,
				s = G.createElement('div'),
				a = G.createElement('div')
			a.style &&
				((a.style.backgroundClip = 'content-box'),
				(a.cloneNode(!0).style.backgroundClip = ''),
				(ie.clearCloneStyle = 'content-box' === a.style.backgroundClip),
				(s.style.cssText =
					'border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute'),
				s.appendChild(a),
				re.extend(ie, {
					pixelPosition: function () {
						return t(), n
					},
					boxSizingReliable: function () {
						return null == i && t(), i
					},
					pixelMarginRight: function () {
						return null == i && t(), o
					},
					reliableMarginLeft: function () {
						return null == i && t(), r
					},
					reliableMarginRight: function () {
						var t,
							n = a.appendChild(G.createElement('div'))
						return (
							(n.style.cssText = a.style.cssText =
								'-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0'),
							(n.style.marginRight = n.style.width = '0'),
							(a.style.width = '1px'),
							Ze.appendChild(s),
							(t = !parseFloat(
								e.getComputedStyle(n).marginRight
							)),
							Ze.removeChild(s),
							a.removeChild(n),
							t
						)
					},
				}))
		})()
		var Ke = /^(none|table(?!-c[ea]).+)/,
			et = {
				position: 'absolute',
				visibility: 'hidden',
				display: 'block',
			},
			tt = { letterSpacing: '0', fontWeight: '400' },
			nt = ['Webkit', 'O', 'Moz', 'ms'],
			it = G.createElement('div').style
		re.extend({
			cssHooks: {
				opacity: {
					get: function (e, t) {
						if (t) {
							var n = $(e, 'opacity')
							return '' === n ? '1' : n
						}
					},
				},
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
				zoom: !0,
			},
			cssProps: { float: 'cssFloat' },
			style: function (e, t, n, i) {
				if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
					var o,
						r,
						s,
						a = re.camelCase(t),
						l = e.style
					return (
						(t = re.cssProps[a] || (re.cssProps[a] = A(a) || a)),
						(s = re.cssHooks[t] || re.cssHooks[a]),
						void 0 === n
							? s &&
							  'get' in s &&
							  void 0 !== (o = s.get(e, !1, i))
								? o
								: l[t]
							: ((r = typeof n),
							  'string' === r &&
									(o = Ne.exec(n)) &&
									o[1] &&
									((n = u(e, t, o)), (r = 'number')),
							  void (
									null != n &&
									n === n &&
									('number' === r &&
										(n +=
											(o && o[3]) ||
											(re.cssNumber[a] ? '' : 'px')),
									ie.clearCloneStyle ||
										'' !== n ||
										0 !== t.indexOf('background') ||
										(l[t] = 'inherit'),
									(s &&
										'set' in s &&
										void 0 === (n = s.set(e, n, i))) ||
										(l[t] = n))
							  ))
					)
				}
			},
			css: function (e, t, n, i) {
				var o,
					r,
					s,
					a = re.camelCase(t)
				return (
					(t = re.cssProps[a] || (re.cssProps[a] = A(a) || a)),
					(s = re.cssHooks[t] || re.cssHooks[a]),
					s && 'get' in s && (o = s.get(e, !0, n)),
					void 0 === o && (o = $(e, t, i)),
					'normal' === o && t in tt && (o = tt[t]),
					'' === n || n
						? ((r = parseFloat(o)),
						  n === !0 || isFinite(r) ? r || 0 : o)
						: o
				)
			},
		}),
			re.each(['height', 'width'], function (e, t) {
				re.cssHooks[t] = {
					get: function (e, n, i) {
						return n
							? Ke.test(re.css(e, 'display')) &&
							  0 === e.offsetWidth
								? Je(e, et, function () {
										return D(e, t, i)
								  })
								: D(e, t, i)
							: void 0
					},
					set: function (e, n, i) {
						var o,
							r = i && Qe(e),
							s =
								i &&
								N(
									e,
									t,
									i,
									'border-box' ===
										re.css(e, 'boxSizing', !1, r),
									r
								)
						return (
							s &&
								(o = Ne.exec(n)) &&
								'px' !== (o[3] || 'px') &&
								((e.style[t] = n), (n = re.css(e, t))),
							j(e, n, s)
						)
					},
				}
			}),
			(re.cssHooks.marginLeft = E(ie.reliableMarginLeft, function (e, t) {
				return t
					? (parseFloat($(e, 'marginLeft')) ||
							e.getBoundingClientRect().left -
								Je(e, { marginLeft: 0 }, function () {
									return e.getBoundingClientRect().left
								})) + 'px'
					: void 0
			})),
			(re.cssHooks.marginRight = E(
				ie.reliableMarginRight,
				function (e, t) {
					return t
						? Je(e, { display: 'inline-block' }, $, [
								e,
								'marginRight',
						  ])
						: void 0
				}
			)),
			re.each(
				{ margin: '', padding: '', border: 'Width' },
				function (e, t) {
					;(re.cssHooks[e + t] = {
						expand: function (n) {
							for (
								var i = 0,
									o = {},
									r =
										'string' == typeof n
											? n.split(' ')
											: [n];
								4 > i;
								i++
							)
								o[e + De[i] + t] = r[i] || r[i - 2] || r[0]
							return o
						},
					}),
						Ve.test(e) || (re.cssHooks[e + t].set = j)
				}
			),
			re.fn.extend({
				css: function (e, t) {
					return Te(
						this,
						function (e, t, n) {
							var i,
								o,
								r = {},
								s = 0
							if (re.isArray(t)) {
								for (i = Qe(e), o = t.length; o > s; s++)
									r[t[s]] = re.css(e, t[s], !1, i)
								return r
							}
							return void 0 !== n
								? re.style(e, t, n)
								: re.css(e, t)
						},
						e,
						t,
						arguments.length > 1
					)
				},
				show: function () {
					return O(this, !0)
				},
				hide: function () {
					return O(this)
				},
				toggle: function (e) {
					return 'boolean' == typeof e
						? e
							? this.show()
							: this.hide()
						: this.each(function () {
								Oe(this) ? re(this).show() : re(this).hide()
						  })
				},
			}),
			(re.Tween = H),
			(H.prototype = {
				constructor: H,
				init: function (e, t, n, i, o, r) {
					;(this.elem = e),
						(this.prop = n),
						(this.easing = o || re.easing._default),
						(this.options = t),
						(this.start = this.now = this.cur()),
						(this.end = i),
						(this.unit = r || (re.cssNumber[n] ? '' : 'px'))
				},
				cur: function () {
					var e = H.propHooks[this.prop]
					return e && e.get
						? e.get(this)
						: H.propHooks._default.get(this)
				},
				run: function (e) {
					var t,
						n = H.propHooks[this.prop]
					return (
						this.options.duration
							? (this.pos = t =
									re.easing[this.easing](
										e,
										this.options.duration * e,
										0,
										1,
										this.options.duration
									))
							: (this.pos = t = e),
						(this.now = (this.end - this.start) * t + this.start),
						this.options.step &&
							this.options.step.call(this.elem, this.now, this),
						n && n.set
							? n.set(this)
							: H.propHooks._default.set(this),
						this
					)
				},
			}),
			(H.prototype.init.prototype = H.prototype),
			(H.propHooks = {
				_default: {
					get: function (e) {
						var t
						return 1 !== e.elem.nodeType ||
							(null != e.elem[e.prop] &&
								null == e.elem.style[e.prop])
							? e.elem[e.prop]
							: ((t = re.css(e.elem, e.prop, '')),
							  t && 'auto' !== t ? t : 0)
					},
					set: function (e) {
						re.fx.step[e.prop]
							? re.fx.step[e.prop](e)
							: 1 !== e.elem.nodeType ||
							  (null == e.elem.style[re.cssProps[e.prop]] &&
									!re.cssHooks[e.prop])
							? (e.elem[e.prop] = e.now)
							: re.style(e.elem, e.prop, e.now + e.unit)
					},
				},
			}),
			(H.propHooks.scrollTop = H.propHooks.scrollLeft =
				{
					set: function (e) {
						e.elem.nodeType &&
							e.elem.parentNode &&
							(e.elem[e.prop] = e.now)
					},
				}),
			(re.easing = {
				linear: function (e) {
					return e
				},
				swing: function (e) {
					return 0.5 - Math.cos(e * Math.PI) / 2
				},
				_default: 'swing',
			}),
			(re.fx = H.prototype.init),
			(re.fx.step = {})
		var ot,
			rt,
			st = /^(?:toggle|show|hide)$/,
			at = /queueHooks$/
		;(re.Animation = re.extend(I, {
			tweeners: {
				'*': [
					function (e, t) {
						var n = this.createTween(e, t)
						return u(n.elem, e, Ne.exec(t), n), n
					},
				],
			},
			tweener: function (e, t) {
				re.isFunction(e) ? ((t = e), (e = ['*'])) : (e = e.match(xe))
				for (var n, i = 0, o = e.length; o > i; i++)
					(n = e[i]),
						(I.tweeners[n] = I.tweeners[n] || []),
						I.tweeners[n].unshift(t)
			},
			prefilters: [_],
			prefilter: function (e, t) {
				t ? I.prefilters.unshift(e) : I.prefilters.push(e)
			},
		})),
			(re.speed = function (e, t, n) {
				var i =
					e && 'object' == typeof e
						? re.extend({}, e)
						: {
								complete:
									n || (!n && t) || (re.isFunction(e) && e),
								duration: e,
								easing:
									(n && t) || (t && !re.isFunction(t) && t),
						  }
				return (
					(i.duration = re.fx.off
						? 0
						: 'number' == typeof i.duration
						? i.duration
						: i.duration in re.fx.speeds
						? re.fx.speeds[i.duration]
						: re.fx.speeds._default),
					(null != i.queue && i.queue !== !0) || (i.queue = 'fx'),
					(i.old = i.complete),
					(i.complete = function () {
						re.isFunction(i.old) && i.old.call(this),
							i.queue && re.dequeue(this, i.queue)
					}),
					i
				)
			}),
			re.fn.extend({
				fadeTo: function (e, t, n, i) {
					return this.filter(Oe)
						.css('opacity', 0)
						.show()
						.end()
						.animate({ opacity: t }, e, n, i)
				},
				animate: function (e, t, n, i) {
					var o = re.isEmptyObject(e),
						r = re.speed(t, n, i),
						s = function () {
							var t = I(this, re.extend({}, e), r)
							;(o || Ce.get(this, 'finish')) && t.stop(!0)
						}
					return (
						(s.finish = s),
						o || r.queue === !1
							? this.each(s)
							: this.queue(r.queue, s)
					)
				},
				stop: function (e, t, n) {
					var i = function (e) {
						var t = e.stop
						delete e.stop, t(n)
					}
					return (
						'string' != typeof e &&
							((n = t), (t = e), (e = void 0)),
						t && e !== !1 && this.queue(e || 'fx', []),
						this.each(function () {
							var t = !0,
								o = null != e && e + 'queueHooks',
								r = re.timers,
								s = Ce.get(this)
							if (o) s[o] && s[o].stop && i(s[o])
							else
								for (o in s)
									s[o] && s[o].stop && at.test(o) && i(s[o])
							for (o = r.length; o--; )
								r[o].elem !== this ||
									(null != e && r[o].queue !== e) ||
									(r[o].anim.stop(n),
									(t = !1),
									r.splice(o, 1))
							;(!t && n) || re.dequeue(this, e)
						})
					)
				},
				finish: function (e) {
					return (
						e !== !1 && (e = e || 'fx'),
						this.each(function () {
							var t,
								n = Ce.get(this),
								i = n[e + 'queue'],
								o = n[e + 'queueHooks'],
								r = re.timers,
								s = i ? i.length : 0
							for (
								n.finish = !0,
									re.queue(this, e, []),
									o && o.stop && o.stop.call(this, !0),
									t = r.length;
								t--;

							)
								r[t].elem === this &&
									r[t].queue === e &&
									(r[t].anim.stop(!0), r.splice(t, 1))
							for (t = 0; s > t; t++)
								i[t] && i[t].finish && i[t].finish.call(this)
							delete n.finish
						})
					)
				},
			}),
			re.each(['toggle', 'show', 'hide'], function (e, t) {
				var n = re.fn[t]
				re.fn[t] = function (e, i, o) {
					return null == e || 'boolean' == typeof e
						? n.apply(this, arguments)
						: this.animate(P(t, !0), e, i, o)
				}
			}),
			re.each(
				{
					slideDown: P('show'),
					slideUp: P('hide'),
					slideToggle: P('toggle'),
					fadeIn: { opacity: 'show' },
					fadeOut: { opacity: 'hide' },
					fadeToggle: { opacity: 'toggle' },
				},
				function (e, t) {
					re.fn[e] = function (e, n, i) {
						return this.animate(t, e, n, i)
					}
				}
			),
			(re.timers = []),
			(re.fx.tick = function () {
				var e,
					t = 0,
					n = re.timers
				for (ot = re.now(); t < n.length; t++)
					(e = n[t]), e() || n[t] !== e || n.splice(t--, 1)
				n.length || re.fx.stop(), (ot = void 0)
			}),
			(re.fx.timer = function (e) {
				re.timers.push(e), e() ? re.fx.start() : re.timers.pop()
			}),
			(re.fx.interval = 13),
			(re.fx.start = function () {
				rt || (rt = e.setInterval(re.fx.tick, re.fx.interval))
			}),
			(re.fx.stop = function () {
				e.clearInterval(rt), (rt = null)
			}),
			(re.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
			(re.fn.delay = function (t, n) {
				return (
					(t = re.fx ? re.fx.speeds[t] || t : t),
					(n = n || 'fx'),
					this.queue(n, function (n, i) {
						var o = e.setTimeout(n, t)
						i.stop = function () {
							e.clearTimeout(o)
						}
					})
				)
			}),
			(function () {
				var e = G.createElement('input'),
					t = G.createElement('select'),
					n = t.appendChild(G.createElement('option'))
				;(e.type = 'checkbox'),
					(ie.checkOn = '' !== e.value),
					(ie.optSelected = n.selected),
					(t.disabled = !0),
					(ie.optDisabled = !n.disabled),
					(e = G.createElement('input')),
					(e.value = 't'),
					(e.type = 'radio'),
					(ie.radioValue = 't' === e.value)
			})()
		var lt,
			ut = re.expr.attrHandle
		re.fn.extend({
			attr: function (e, t) {
				return Te(this, re.attr, e, t, arguments.length > 1)
			},
			removeAttr: function (e) {
				return this.each(function () {
					re.removeAttr(this, e)
				})
			},
		}),
			re.extend({
				attr: function (e, t, n) {
					var i,
						o,
						r = e.nodeType
					if (3 !== r && 8 !== r && 2 !== r)
						return 'undefined' == typeof e.getAttribute
							? re.prop(e, t, n)
							: ((1 === r && re.isXMLDoc(e)) ||
									((t = t.toLowerCase()),
									(o =
										re.attrHooks[t] ||
										(re.expr.match.bool.test(t)
											? lt
											: void 0))),
							  void 0 !== n
									? null === n
										? void re.removeAttr(e, t)
										: o &&
										  'set' in o &&
										  void 0 !== (i = o.set(e, n, t))
										? i
										: (e.setAttribute(t, n + ''), n)
									: o &&
									  'get' in o &&
									  null !== (i = o.get(e, t))
									? i
									: ((i = re.find.attr(e, t)),
									  null == i ? void 0 : i))
				},
				attrHooks: {
					type: {
						set: function (e, t) {
							if (
								!ie.radioValue &&
								'radio' === t &&
								re.nodeName(e, 'input')
							) {
								var n = e.value
								return (
									e.setAttribute('type', t),
									n && (e.value = n),
									t
								)
							}
						},
					},
				},
				removeAttr: function (e, t) {
					var n,
						i,
						o = 0,
						r = t && t.match(xe)
					if (r && 1 === e.nodeType)
						for (; (n = r[o++]); )
							(i = re.propFix[n] || n),
								re.expr.match.bool.test(n) && (e[i] = !1),
								e.removeAttribute(n)
				},
			}),
			(lt = {
				set: function (e, t, n) {
					return (
						t === !1 ? re.removeAttr(e, n) : e.setAttribute(n, n), n
					)
				},
			}),
			re.each(re.expr.match.bool.source.match(/\w+/g), function (e, t) {
				var n = ut[t] || re.find.attr
				ut[t] = function (e, t, i) {
					var o, r
					return (
						i ||
							((r = ut[t]),
							(ut[t] = o),
							(o = null != n(e, t, i) ? t.toLowerCase() : null),
							(ut[t] = r)),
						o
					)
				}
			})
		var ct = /^(?:input|select|textarea|button)$/i,
			dt = /^(?:a|area)$/i
		re.fn.extend({
			prop: function (e, t) {
				return Te(this, re.prop, e, t, arguments.length > 1)
			},
			removeProp: function (e) {
				return this.each(function () {
					delete this[re.propFix[e] || e]
				})
			},
		}),
			re.extend({
				prop: function (e, t, n) {
					var i,
						o,
						r = e.nodeType
					if (3 !== r && 8 !== r && 2 !== r)
						return (
							(1 === r && re.isXMLDoc(e)) ||
								((t = re.propFix[t] || t),
								(o = re.propHooks[t])),
							void 0 !== n
								? o &&
								  'set' in o &&
								  void 0 !== (i = o.set(e, n, t))
									? i
									: (e[t] = n)
								: o && 'get' in o && null !== (i = o.get(e, t))
								? i
								: e[t]
						)
				},
				propHooks: {
					tabIndex: {
						get: function (e) {
							var t = re.find.attr(e, 'tabindex')
							return t
								? parseInt(t, 10)
								: ct.test(e.nodeName) ||
								  (dt.test(e.nodeName) && e.href)
								? 0
								: -1
						},
					},
				},
				propFix: { for: 'htmlFor', class: 'className' },
			}),
			ie.optSelected ||
				(re.propHooks.selected = {
					get: function (e) {
						var t = e.parentNode
						return (
							t && t.parentNode && t.parentNode.selectedIndex,
							null
						)
					},
					set: function (e) {
						var t = e.parentNode
						t &&
							(t.selectedIndex,
							t.parentNode && t.parentNode.selectedIndex)
					},
				}),
			re.each(
				[
					'tabIndex',
					'readOnly',
					'maxLength',
					'cellSpacing',
					'cellPadding',
					'rowSpan',
					'colSpan',
					'useMap',
					'frameBorder',
					'contentEditable',
				],
				function () {
					re.propFix[this.toLowerCase()] = this
				}
			)
		var pt = /[\t\r\n\f]/g
		re.fn.extend({
			addClass: function (e) {
				var t,
					n,
					i,
					o,
					r,
					s,
					a,
					l = 0
				if (re.isFunction(e))
					return this.each(function (t) {
						re(this).addClass(e.call(this, t, F(this)))
					})
				if ('string' == typeof e && e)
					for (t = e.match(xe) || []; (n = this[l++]); )
						if (
							((o = F(n)),
							(i =
								1 === n.nodeType &&
								(' ' + o + ' ').replace(pt, ' ')))
						) {
							for (s = 0; (r = t[s++]); )
								i.indexOf(' ' + r + ' ') < 0 && (i += r + ' ')
							;(a = re.trim(i)),
								o !== a && n.setAttribute('class', a)
						}
				return this
			},
			removeClass: function (e) {
				var t,
					n,
					i,
					o,
					r,
					s,
					a,
					l = 0
				if (re.isFunction(e))
					return this.each(function (t) {
						re(this).removeClass(e.call(this, t, F(this)))
					})
				if (!arguments.length) return this.attr('class', '')
				if ('string' == typeof e && e)
					for (t = e.match(xe) || []; (n = this[l++]); )
						if (
							((o = F(n)),
							(i =
								1 === n.nodeType &&
								(' ' + o + ' ').replace(pt, ' ')))
						) {
							for (s = 0; (r = t[s++]); )
								for (; i.indexOf(' ' + r + ' ') > -1; )
									i = i.replace(' ' + r + ' ', ' ')
							;(a = re.trim(i)),
								o !== a && n.setAttribute('class', a)
						}
				return this
			},
			toggleClass: function (e, t) {
				var n = typeof e
				return 'boolean' == typeof t && 'string' === n
					? t
						? this.addClass(e)
						: this.removeClass(e)
					: re.isFunction(e)
					? this.each(function (n) {
							re(this).toggleClass(e.call(this, n, F(this), t), t)
					  })
					: this.each(function () {
							var t, i, o, r
							if ('string' === n)
								for (
									i = 0, o = re(this), r = e.match(xe) || [];
									(t = r[i++]);

								)
									o.hasClass(t)
										? o.removeClass(t)
										: o.addClass(t)
							else
								(void 0 !== e && 'boolean' !== n) ||
									((t = F(this)),
									t && Ce.set(this, '__className__', t),
									this.setAttribute &&
										this.setAttribute(
											'class',
											t || e === !1
												? ''
												: Ce.get(
														this,
														'__className__'
												  ) || ''
										))
					  })
			},
			hasClass: function (e) {
				var t,
					n,
					i = 0
				for (t = ' ' + e + ' '; (n = this[i++]); )
					if (
						1 === n.nodeType &&
						(' ' + F(n) + ' ').replace(pt, ' ').indexOf(t) > -1
					)
						return !0
				return !1
			},
		})
		var ft = /\r/g,
			ht = /[\x20\t\r\n\f]+/g
		re.fn.extend({
			val: function (e) {
				var t,
					n,
					i,
					o = this[0]
				return arguments.length
					? ((i = re.isFunction(e)),
					  this.each(function (n) {
							var o
							1 === this.nodeType &&
								((o = i ? e.call(this, n, re(this).val()) : e),
								null == o
									? (o = '')
									: 'number' == typeof o
									? (o += '')
									: re.isArray(o) &&
									  (o = re.map(o, function (e) {
											return null == e ? '' : e + ''
									  })),
								(t =
									re.valHooks[this.type] ||
									re.valHooks[this.nodeName.toLowerCase()]),
								(t &&
									'set' in t &&
									void 0 !== t.set(this, o, 'value')) ||
									(this.value = o))
					  }))
					: o
					? ((t =
							re.valHooks[o.type] ||
							re.valHooks[o.nodeName.toLowerCase()]),
					  t && 'get' in t && void 0 !== (n = t.get(o, 'value'))
							? n
							: ((n = o.value),
							  'string' == typeof n
									? n.replace(ft, '')
									: null == n
									? ''
									: n))
					: void 0
			},
		}),
			re.extend({
				valHooks: {
					option: {
						get: function (e) {
							var t = re.find.attr(e, 'value')
							return null != t
								? t
								: re.trim(re.text(e)).replace(ht, ' ')
						},
					},
					select: {
						get: function (e) {
							for (
								var t,
									n,
									i = e.options,
									o = e.selectedIndex,
									r = 'select-one' === e.type || 0 > o,
									s = r ? null : [],
									a = r ? o + 1 : i.length,
									l = 0 > o ? a : r ? o : 0;
								a > l;
								l++
							)
								if (
									((n = i[l]),
									(n.selected || l === o) &&
										(ie.optDisabled
											? !n.disabled
											: null ===
											  n.getAttribute('disabled')) &&
										(!n.parentNode.disabled ||
											!re.nodeName(
												n.parentNode,
												'optgroup'
											)))
								) {
									if (((t = re(n).val()), r)) return t
									s.push(t)
								}
							return s
						},
						set: function (e, t) {
							for (
								var n,
									i,
									o = e.options,
									r = re.makeArray(t),
									s = o.length;
								s--;

							)
								(i = o[s]),
									(i.selected =
										re.inArray(
											re.valHooks.option.get(i),
											r
										) > -1) && (n = !0)
							return n || (e.selectedIndex = -1), r
						},
					},
				},
			}),
			re.each(['radio', 'checkbox'], function () {
				;(re.valHooks[this] = {
					set: function (e, t) {
						return re.isArray(t)
							? (e.checked = re.inArray(re(e).val(), t) > -1)
							: void 0
					},
				}),
					ie.checkOn ||
						(re.valHooks[this].get = function (e) {
							return null === e.getAttribute('value')
								? 'on'
								: e.value
						})
			})
		var vt = /^(?:focusinfocus|focusoutblur)$/
		re.extend(re.event, {
			trigger: function (t, n, i, o) {
				var r,
					s,
					a,
					l,
					u,
					c,
					d,
					p = [i || G],
					f = ne.call(t, 'type') ? t.type : t,
					h = ne.call(t, 'namespace') ? t.namespace.split('.') : []
				if (
					((s = a = i = i || G),
					3 !== i.nodeType &&
						8 !== i.nodeType &&
						!vt.test(f + re.event.triggered) &&
						(f.indexOf('.') > -1 &&
							((h = f.split('.')), (f = h.shift()), h.sort()),
						(u = f.indexOf(':') < 0 && 'on' + f),
						(t = t[re.expando]
							? t
							: new re.Event(f, 'object' == typeof t && t)),
						(t.isTrigger = o ? 2 : 3),
						(t.namespace = h.join('.')),
						(t.rnamespace = t.namespace
							? new RegExp(
									'(^|\\.)' +
										h.join('\\.(?:.*\\.|)') +
										'(\\.|$)'
							  )
							: null),
						(t.result = void 0),
						t.target || (t.target = i),
						(n = null == n ? [t] : re.makeArray(n, [t])),
						(d = re.event.special[f] || {}),
						o || !d.trigger || d.trigger.apply(i, n) !== !1))
				) {
					if (!o && !d.noBubble && !re.isWindow(i)) {
						for (
							l = d.delegateType || f,
								vt.test(l + f) || (s = s.parentNode);
							s;
							s = s.parentNode
						)
							p.push(s), (a = s)
						a === (i.ownerDocument || G) &&
							p.push(a.defaultView || a.parentWindow || e)
					}
					for (r = 0; (s = p[r++]) && !t.isPropagationStopped(); )
						(t.type = r > 1 ? l : d.bindType || f),
							(c =
								(Ce.get(s, 'events') || {})[t.type] &&
								Ce.get(s, 'handle')),
							c && c.apply(s, n),
							(c = u && s[u]),
							c &&
								c.apply &&
								Se(s) &&
								((t.result = c.apply(s, n)),
								t.result === !1 && t.preventDefault())
					return (
						(t.type = f),
						o ||
							t.isDefaultPrevented() ||
							(d._default &&
								d._default.apply(p.pop(), n) !== !1) ||
							!Se(i) ||
							(u &&
								re.isFunction(i[f]) &&
								!re.isWindow(i) &&
								((a = i[u]),
								a && (i[u] = null),
								(re.event.triggered = f),
								i[f](),
								(re.event.triggered = void 0),
								a && (i[u] = a))),
						t.result
					)
				}
			},
			simulate: function (e, t, n) {
				var i = re.extend(new re.Event(), n, {
					type: e,
					isSimulated: !0,
				})
				re.event.trigger(i, null, t),
					i.isDefaultPrevented() && n.preventDefault()
			},
		}),
			re.fn.extend({
				trigger: function (e, t) {
					return this.each(function () {
						re.event.trigger(e, t, this)
					})
				},
				triggerHandler: function (e, t) {
					var n = this[0]
					return n ? re.event.trigger(e, t, n, !0) : void 0
				},
			}),
			re.each(
				'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(
					' '
				),
				function (e, t) {
					re.fn[t] = function (e, n) {
						return arguments.length > 0
							? this.on(t, null, e, n)
							: this.trigger(t)
					}
				}
			),
			re.fn.extend({
				hover: function (e, t) {
					return this.mouseenter(e).mouseleave(t || e)
				},
			}),
			(ie.focusin = 'onfocusin' in e),
			ie.focusin ||
				re.each(
					{ focus: 'focusin', blur: 'focusout' },
					function (e, t) {
						var n = function (e) {
							re.event.simulate(t, e.target, re.event.fix(e))
						}
						re.event.special[t] = {
							setup: function () {
								var i = this.ownerDocument || this,
									o = Ce.access(i, t)
								o || i.addEventListener(e, n, !0),
									Ce.access(i, t, (o || 0) + 1)
							},
							teardown: function () {
								var i = this.ownerDocument || this,
									o = Ce.access(i, t) - 1
								o
									? Ce.access(i, t, o)
									: (i.removeEventListener(e, n, !0),
									  Ce.remove(i, t))
							},
						}
					}
				)
		var gt = e.location,
			mt = re.now(),
			yt = /\?/
		;(re.parseJSON = function (e) {
			return JSON.parse(e + '')
		}),
			(re.parseXML = function (t) {
				var n
				if (!t || 'string' != typeof t) return null
				try {
					n = new e.DOMParser().parseFromString(t, 'text/xml')
				} catch (e) {
					n = void 0
				}
				return (
					(n && !n.getElementsByTagName('parsererror').length) ||
						re.error('Invalid XML: ' + t),
					n
				)
			})
		var bt = /#.*$/,
			wt = /([?&])_=[^&]*/,
			xt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
			kt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			Tt = /^(?:GET|HEAD)$/,
			St = /^\/\//,
			Ct = {},
			$t = {},
			Et = '*/'.concat('*'),
			At = G.createElement('a')
		;(At.href = gt.href),
			re.extend({
				active: 0,
				lastModified: {},
				etag: {},
				ajaxSettings: {
					url: gt.href,
					type: 'GET',
					isLocal: kt.test(gt.protocol),
					global: !0,
					processData: !0,
					async: !0,
					contentType:
						'application/x-www-form-urlencoded; charset=UTF-8',
					accepts: {
						'*': Et,
						text: 'text/plain',
						html: 'text/html',
						xml: 'application/xml, text/xml',
						json: 'application/json, text/javascript',
					},
					contents: {
						xml: /\bxml\b/,
						html: /\bhtml/,
						json: /\bjson\b/,
					},
					responseFields: {
						xml: 'responseXML',
						text: 'responseText',
						json: 'responseJSON',
					},
					converters: {
						'* text': String,
						'text html': !0,
						'text json': re.parseJSON,
						'text xml': re.parseXML,
					},
					flatOptions: { url: !0, context: !0 },
				},
				ajaxSetup: function (e, t) {
					return t
						? W(W(e, re.ajaxSettings), t)
						: W(re.ajaxSettings, e)
				},
				ajaxPrefilter: M(Ct),
				ajaxTransport: M($t),
				ajax: function (t, n) {
					function i(t, n, i, a) {
						var u,
							d,
							y,
							b,
							x,
							T = n
						2 !== w &&
							((w = 2),
							l && e.clearTimeout(l),
							(o = void 0),
							(s = a || ''),
							(k.readyState = t > 0 ? 4 : 0),
							(u = (t >= 200 && 300 > t) || 304 === t),
							i && (b = B(p, k, i)),
							(b = U(p, b, k, u)),
							u
								? (p.ifModified &&
										((x =
											k.getResponseHeader(
												'Last-Modified'
											)),
										x && (re.lastModified[r] = x),
										(x = k.getResponseHeader('etag')),
										x && (re.etag[r] = x)),
								  204 === t || 'HEAD' === p.type
										? (T = 'nocontent')
										: 304 === t
										? (T = 'notmodified')
										: ((T = b.state),
										  (d = b.data),
										  (y = b.error),
										  (u = !y)))
								: ((y = T),
								  (!t && T) ||
										((T = 'error'), 0 > t && (t = 0))),
							(k.status = t),
							(k.statusText = (n || T) + ''),
							u
								? v.resolveWith(f, [d, T, k])
								: v.rejectWith(f, [k, T, y]),
							k.statusCode(m),
							(m = void 0),
							c &&
								h.trigger(u ? 'ajaxSuccess' : 'ajaxError', [
									k,
									p,
									u ? d : y,
								]),
							g.fireWith(f, [k, T]),
							c &&
								(h.trigger('ajaxComplete', [k, p]),
								--re.active || re.event.trigger('ajaxStop')))
					}
					'object' == typeof t && ((n = t), (t = void 0)),
						(n = n || {})
					var o,
						r,
						s,
						a,
						l,
						u,
						c,
						d,
						p = re.ajaxSetup({}, n),
						f = p.context || p,
						h =
							p.context && (f.nodeType || f.jquery)
								? re(f)
								: re.event,
						v = re.Deferred(),
						g = re.Callbacks('once memory'),
						m = p.statusCode || {},
						y = {},
						b = {},
						w = 0,
						x = 'canceled',
						k = {
							readyState: 0,
							getResponseHeader: function (e) {
								var t
								if (2 === w) {
									if (!a)
										for (a = {}; (t = xt.exec(s)); )
											a[t[1].toLowerCase()] = t[2]
									t = a[e.toLowerCase()]
								}
								return null == t ? null : t
							},
							getAllResponseHeaders: function () {
								return 2 === w ? s : null
							},
							setRequestHeader: function (e, t) {
								var n = e.toLowerCase()
								return (
									w || ((e = b[n] = b[n] || e), (y[e] = t)),
									this
								)
							},
							overrideMimeType: function (e) {
								return w || (p.mimeType = e), this
							},
							statusCode: function (e) {
								var t
								if (e)
									if (2 > w) for (t in e) m[t] = [m[t], e[t]]
									else k.always(e[k.status])
								return this
							},
							abort: function (e) {
								var t = e || x
								return o && o.abort(t), i(0, t), this
							},
						}
					if (
						((v.promise(k).complete = g.add),
						(k.success = k.done),
						(k.error = k.fail),
						(p.url = ((t || p.url || gt.href) + '')
							.replace(bt, '')
							.replace(St, gt.protocol + '//')),
						(p.type = n.method || n.type || p.method || p.type),
						(p.dataTypes = re
							.trim(p.dataType || '*')
							.toLowerCase()
							.match(xe) || ['']),
						null == p.crossDomain)
					) {
						u = G.createElement('a')
						try {
							;(u.href = p.url),
								(u.href = u.href),
								(p.crossDomain =
									At.protocol + '//' + At.host !=
									u.protocol + '//' + u.host)
						} catch (e) {
							p.crossDomain = !0
						}
					}
					if (
						(p.data &&
							p.processData &&
							'string' != typeof p.data &&
							(p.data = re.param(p.data, p.traditional)),
						R(Ct, p, n, k),
						2 === w)
					)
						return k
					;(c = re.event && p.global),
						c && 0 === re.active++ && re.event.trigger('ajaxStart'),
						(p.type = p.type.toUpperCase()),
						(p.hasContent = !Tt.test(p.type)),
						(r = p.url),
						p.hasContent ||
							(p.data &&
								((r = p.url +=
									(yt.test(r) ? '&' : '?') + p.data),
								delete p.data),
							p.cache === !1 &&
								(p.url = wt.test(r)
									? r.replace(wt, '$1_=' + mt++)
									: r +
									  (yt.test(r) ? '&' : '?') +
									  '_=' +
									  mt++)),
						p.ifModified &&
							(re.lastModified[r] &&
								k.setRequestHeader(
									'If-Modified-Since',
									re.lastModified[r]
								),
							re.etag[r] &&
								k.setRequestHeader(
									'If-None-Match',
									re.etag[r]
								)),
						((p.data && p.hasContent && p.contentType !== !1) ||
							n.contentType) &&
							k.setRequestHeader('Content-Type', p.contentType),
						k.setRequestHeader(
							'Accept',
							p.dataTypes[0] && p.accepts[p.dataTypes[0]]
								? p.accepts[p.dataTypes[0]] +
										('*' !== p.dataTypes[0]
											? ', ' + Et + '; q=0.01'
											: '')
								: p.accepts['*']
						)
					for (d in p.headers) k.setRequestHeader(d, p.headers[d])
					if (
						p.beforeSend &&
						(p.beforeSend.call(f, k, p) === !1 || 2 === w)
					)
						return k.abort()
					x = 'abort'
					for (d in { success: 1, error: 1, complete: 1 }) k[d](p[d])
					if ((o = R($t, p, n, k))) {
						if (
							((k.readyState = 1),
							c && h.trigger('ajaxSend', [k, p]),
							2 === w)
						)
							return k
						p.async &&
							p.timeout > 0 &&
							(l = e.setTimeout(function () {
								k.abort('timeout')
							}, p.timeout))
						try {
							;(w = 1), o.send(y, i)
						} catch (e) {
							if (!(2 > w)) throw e
							i(-1, e)
						}
					} else i(-1, 'No Transport')
					return k
				},
				getJSON: function (e, t, n) {
					return re.get(e, t, n, 'json')
				},
				getScript: function (e, t) {
					return re.get(e, void 0, t, 'script')
				},
			}),
			re.each(['get', 'post'], function (e, t) {
				re[t] = function (e, n, i, o) {
					return (
						re.isFunction(n) &&
							((o = o || i), (i = n), (n = void 0)),
						re.ajax(
							re.extend(
								{
									url: e,
									type: t,
									dataType: o,
									data: n,
									success: i,
								},
								re.isPlainObject(e) && e
							)
						)
					)
				}
			}),
			(re._evalUrl = function (e) {
				return re.ajax({
					url: e,
					type: 'GET',
					dataType: 'script',
					async: !1,
					global: !1,
					throws: !0,
				})
			}),
			re.fn.extend({
				wrapAll: function (e) {
					var t
					return re.isFunction(e)
						? this.each(function (t) {
								re(this).wrapAll(e.call(this, t))
						  })
						: (this[0] &&
								((t = re(e, this[0].ownerDocument)
									.eq(0)
									.clone(!0)),
								this[0].parentNode && t.insertBefore(this[0]),
								t
									.map(function () {
										for (
											var e = this;
											e.firstElementChild;

										)
											e = e.firstElementChild
										return e
									})
									.append(this)),
						  this)
				},
				wrapInner: function (e) {
					return re.isFunction(e)
						? this.each(function (t) {
								re(this).wrapInner(e.call(this, t))
						  })
						: this.each(function () {
								var t = re(this),
									n = t.contents()
								n.length ? n.wrapAll(e) : t.append(e)
						  })
				},
				wrap: function (e) {
					var t = re.isFunction(e)
					return this.each(function (n) {
						re(this).wrapAll(t ? e.call(this, n) : e)
					})
				},
				unwrap: function () {
					return this.parent()
						.each(function () {
							re.nodeName(this, 'body') ||
								re(this).replaceWith(this.childNodes)
						})
						.end()
				},
			}),
			(re.expr.filters.hidden = function (e) {
				return !re.expr.filters.visible(e)
			}),
			(re.expr.filters.visible = function (e) {
				return (
					e.offsetWidth > 0 ||
					e.offsetHeight > 0 ||
					e.getClientRects().length > 0
				)
			})
		var jt = /%20/g,
			Nt = /\[\]$/,
			Dt = /\r?\n/g,
			Ot = /^(?:submit|button|image|reset|file)$/i,
			Ht = /^(?:input|select|textarea|keygen)/i
		;(re.param = function (e, t) {
			var n,
				i = [],
				o = function (e, t) {
					;(t = re.isFunction(t) ? t() : null == t ? '' : t),
						(i[i.length] =
							encodeURIComponent(e) + '=' + encodeURIComponent(t))
				}
			if (
				(void 0 === t &&
					(t = re.ajaxSettings && re.ajaxSettings.traditional),
				re.isArray(e) || (e.jquery && !re.isPlainObject(e)))
			)
				re.each(e, function () {
					o(this.name, this.value)
				})
			else for (n in e) X(n, e[n], t, o)
			return i.join('&').replace(jt, '+')
		}),
			re.fn.extend({
				serialize: function () {
					return re.param(this.serializeArray())
				},
				serializeArray: function () {
					return this.map(function () {
						var e = re.prop(this, 'elements')
						return e ? re.makeArray(e) : this
					})
						.filter(function () {
							var e = this.type
							return (
								this.name &&
								!re(this).is(':disabled') &&
								Ht.test(this.nodeName) &&
								!Ot.test(e) &&
								(this.checked || !He.test(e))
							)
						})
						.map(function (e, t) {
							var n = re(this).val()
							return null == n
								? null
								: re.isArray(n)
								? re.map(n, function (e) {
										return {
											name: t.name,
											value: e.replace(Dt, '\r\n'),
										}
								  })
								: { name: t.name, value: n.replace(Dt, '\r\n') }
						})
						.get()
				},
			}),
			(re.ajaxSettings.xhr = function () {
				try {
					return new e.XMLHttpRequest()
				} catch (e) {}
			})
		var qt = { 0: 200, 1223: 204 },
			Pt = re.ajaxSettings.xhr()
		;(ie.cors = !!Pt && 'withCredentials' in Pt),
			(ie.ajax = Pt = !!Pt),
			re.ajaxTransport(function (t) {
				var n, i
				return ie.cors || (Pt && !t.crossDomain)
					? {
							send: function (o, r) {
								var s,
									a = t.xhr()
								if (
									(a.open(
										t.type,
										t.url,
										t.async,
										t.username,
										t.password
									),
									t.xhrFields)
								)
									for (s in t.xhrFields) a[s] = t.xhrFields[s]
								t.mimeType &&
									a.overrideMimeType &&
									a.overrideMimeType(t.mimeType),
									t.crossDomain ||
										o['X-Requested-With'] ||
										(o['X-Requested-With'] =
											'XMLHttpRequest')
								for (s in o) a.setRequestHeader(s, o[s])
								;(n = function (e) {
									return function () {
										n &&
											((n =
												i =
												a.onload =
												a.onerror =
												a.onabort =
												a.onreadystatechange =
													null),
											'abort' === e
												? a.abort()
												: 'error' === e
												? 'number' != typeof a.status
													? r(0, 'error')
													: r(a.status, a.statusText)
												: r(
														qt[a.status] ||
															a.status,
														a.statusText,
														'text' !==
															(a.responseType ||
																'text') ||
															'string' !=
																typeof a.responseText
															? {
																	binary: a.response,
															  }
															: {
																	text: a.responseText,
															  },
														a.getAllResponseHeaders()
												  ))
									}
								}),
									(a.onload = n()),
									(i = a.onerror = n('error')),
									void 0 !== a.onabort
										? (a.onabort = i)
										: (a.onreadystatechange = function () {
												4 === a.readyState &&
													e.setTimeout(function () {
														n && i()
													})
										  }),
									(n = n('abort'))
								try {
									a.send((t.hasContent && t.data) || null)
								} catch (e) {
									if (n) throw e
								}
							},
							abort: function () {
								n && n()
							},
					  }
					: void 0
			}),
			re.ajaxSetup({
				accepts: {
					script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
				},
				contents: { script: /\b(?:java|ecma)script\b/ },
				converters: {
					'text script': function (e) {
						return re.globalEval(e), e
					},
				},
			}),
			re.ajaxPrefilter('script', function (e) {
				void 0 === e.cache && (e.cache = !1),
					e.crossDomain && (e.type = 'GET')
			}),
			re.ajaxTransport('script', function (e) {
				if (e.crossDomain) {
					var t, n
					return {
						send: function (i, o) {
							;(t = re('<script>')
								.prop({ charset: e.scriptCharset, src: e.url })
								.on(
									'load error',
									(n = function (e) {
										t.remove(),
											(n = null),
											e &&
												o(
													'error' === e.type
														? 404
														: 200,
													e.type
												)
									})
								)),
								G.head.appendChild(t[0])
						},
						abort: function () {
							n && n()
						},
					}
				}
			})
		var Lt = [],
			_t = /(=)\?(?=&|$)|\?\?/
		re.ajaxSetup({
			jsonp: 'callback',
			jsonpCallback: function () {
				var e = Lt.pop() || re.expando + '_' + mt++
				return (this[e] = !0), e
			},
		}),
			re.ajaxPrefilter('json jsonp', function (t, n, i) {
				var o,
					r,
					s,
					a =
						t.jsonp !== !1 &&
						(_t.test(t.url)
							? 'url'
							: 'string' == typeof t.data &&
							  0 ===
									(t.contentType || '').indexOf(
										'application/x-www-form-urlencoded'
									) &&
							  _t.test(t.data) &&
							  'data')
				return a || 'jsonp' === t.dataTypes[0]
					? ((o = t.jsonpCallback =
							re.isFunction(t.jsonpCallback)
								? t.jsonpCallback()
								: t.jsonpCallback),
					  a
							? (t[a] = t[a].replace(_t, '$1' + o))
							: t.jsonp !== !1 &&
							  (t.url +=
									(yt.test(t.url) ? '&' : '?') +
									t.jsonp +
									'=' +
									o),
					  (t.converters['script json'] = function () {
							return s || re.error(o + ' was not called'), s[0]
					  }),
					  (t.dataTypes[0] = 'json'),
					  (r = e[o]),
					  (e[o] = function () {
							s = arguments
					  }),
					  i.always(function () {
							void 0 === r ? re(e).removeProp(o) : (e[o] = r),
								t[o] &&
									((t.jsonpCallback = n.jsonpCallback),
									Lt.push(o)),
								s && re.isFunction(r) && r(s[0]),
								(s = r = void 0)
					  }),
					  'script')
					: void 0
			}),
			(re.parseHTML = function (e, t, n) {
				if (!e || 'string' != typeof e) return null
				'boolean' == typeof t && ((n = t), (t = !1)), (t = t || G)
				var i = he.exec(e),
					o = !n && []
				return i
					? [t.createElement(i[1])]
					: ((i = p([e], t, o)),
					  o && o.length && re(o).remove(),
					  re.merge([], i.childNodes))
			})
		var zt = re.fn.load
		;(re.fn.load = function (e, t, n) {
			if ('string' != typeof e && zt) return zt.apply(this, arguments)
			var i,
				o,
				r,
				s = this,
				a = e.indexOf(' ')
			return (
				a > -1 && ((i = re.trim(e.slice(a))), (e = e.slice(0, a))),
				re.isFunction(t)
					? ((n = t), (t = void 0))
					: t && 'object' == typeof t && (o = 'POST'),
				s.length > 0 &&
					re
						.ajax({
							url: e,
							type: o || 'GET',
							dataType: 'html',
							data: t,
						})
						.done(function (e) {
							;(r = arguments),
								s.html(
									i
										? re('<div>')
												.append(re.parseHTML(e))
												.find(i)
										: e
								)
						})
						.always(
							n &&
								function (e, t) {
									s.each(function () {
										n.apply(
											this,
											r || [e.responseText, t, e]
										)
									})
								}
						),
				this
			)
		}),
			re.each(
				[
					'ajaxStart',
					'ajaxStop',
					'ajaxComplete',
					'ajaxError',
					'ajaxSuccess',
					'ajaxSend',
				],
				function (e, t) {
					re.fn[t] = function (e) {
						return this.on(t, e)
					}
				}
			),
			(re.expr.filters.animated = function (e) {
				return re.grep(re.timers, function (t) {
					return e === t.elem
				}).length
			}),
			(re.offset = {
				setOffset: function (e, t, n) {
					var i,
						o,
						r,
						s,
						a,
						l,
						u,
						c = re.css(e, 'position'),
						d = re(e),
						p = {}
					'static' === c && (e.style.position = 'relative'),
						(a = d.offset()),
						(r = re.css(e, 'top')),
						(l = re.css(e, 'left')),
						(u =
							('absolute' === c || 'fixed' === c) &&
							(r + l).indexOf('auto') > -1),
						u
							? ((i = d.position()), (s = i.top), (o = i.left))
							: ((s = parseFloat(r) || 0),
							  (o = parseFloat(l) || 0)),
						re.isFunction(t) &&
							(t = t.call(e, n, re.extend({}, a))),
						null != t.top && (p.top = t.top - a.top + s),
						null != t.left && (p.left = t.left - a.left + o),
						'using' in t ? t.using.call(e, p) : d.css(p)
				},
			}),
			re.fn.extend({
				offset: function (e) {
					if (arguments.length)
						return void 0 === e
							? this
							: this.each(function (t) {
									re.offset.setOffset(this, e, t)
							  })
					var t,
						n,
						i = this[0],
						o = { top: 0, left: 0 },
						r = i && i.ownerDocument
					return r
						? ((t = r.documentElement),
						  re.contains(t, i)
								? ((o = i.getBoundingClientRect()),
								  (n = Y(r)),
								  {
										top:
											o.top + n.pageYOffset - t.clientTop,
										left:
											o.left +
											n.pageXOffset -
											t.clientLeft,
								  })
								: o)
						: void 0
				},
				position: function () {
					if (this[0]) {
						var e,
							t,
							n = this[0],
							i = { top: 0, left: 0 }
						return (
							'fixed' === re.css(n, 'position')
								? (t = n.getBoundingClientRect())
								: ((e = this.offsetParent()),
								  (t = this.offset()),
								  re.nodeName(e[0], 'html') || (i = e.offset()),
								  (i.top += re.css(e[0], 'borderTopWidth', !0)),
								  (i.left += re.css(
										e[0],
										'borderLeftWidth',
										!0
								  ))),
							{
								top: t.top - i.top - re.css(n, 'marginTop', !0),
								left:
									t.left -
									i.left -
									re.css(n, 'marginLeft', !0),
							}
						)
					}
				},
				offsetParent: function () {
					return this.map(function () {
						for (
							var e = this.offsetParent;
							e && 'static' === re.css(e, 'position');

						)
							e = e.offsetParent
						return e || Ze
					})
				},
			}),
			re.each(
				{ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' },
				function (e, t) {
					var n = 'pageYOffset' === t
					re.fn[e] = function (i) {
						return Te(
							this,
							function (e, i, o) {
								var r = Y(e)
								return void 0 === o
									? r
										? r[t]
										: e[i]
									: void (r
											? r.scrollTo(
													n ? r.pageXOffset : o,
													n ? o : r.pageYOffset
											  )
											: (e[i] = o))
							},
							e,
							i,
							arguments.length
						)
					}
				}
			),
			re.each(['top', 'left'], function (e, t) {
				re.cssHooks[t] = E(ie.pixelPosition, function (e, n) {
					return n
						? ((n = $(e, t)),
						  Ge.test(n) ? re(e).position()[t] + 'px' : n)
						: void 0
				})
			}),
			re.each({ Height: 'height', Width: 'width' }, function (e, t) {
				re.each(
					{ padding: 'inner' + e, content: t, '': 'outer' + e },
					function (n, i) {
						re.fn[i] = function (i, o) {
							var r =
									arguments.length &&
									(n || 'boolean' != typeof i),
								s =
									n ||
									(i === !0 || o === !0 ? 'margin' : 'border')
							return Te(
								this,
								function (t, n, i) {
									var o
									return re.isWindow(t)
										? t.document.documentElement[
												'client' + e
										  ]
										: 9 === t.nodeType
										? ((o = t.documentElement),
										  Math.max(
												t.body['scroll' + e],
												o['scroll' + e],
												t.body['offset' + e],
												o['offset' + e],
												o['client' + e]
										  ))
										: void 0 === i
										? re.css(t, n, s)
										: re.style(t, n, i, s)
								},
								t,
								r ? i : void 0,
								r,
								null
							)
						}
					}
				)
			}),
			re.fn.extend({
				bind: function (e, t, n) {
					return this.on(e, null, t, n)
				},
				unbind: function (e, t) {
					return this.off(e, null, t)
				},
				delegate: function (e, t, n, i) {
					return this.on(t, e, n, i)
				},
				undelegate: function (e, t, n) {
					return 1 === arguments.length
						? this.off(e, '**')
						: this.off(t, e || '**', n)
				},
				size: function () {
					return this.length
				},
			}),
			(re.fn.andSelf = re.fn.addBack),
			'function' == typeof define &&
				define.amd &&
				define('jquery', [], function () {
					return re
				})
		var It = e.jQuery,
			Ft = e.$
		return (
			(re.noConflict = function (t) {
				return (
					e.$ === re && (e.$ = Ft),
					t && e.jQuery === re && (e.jQuery = It),
					re
				)
			}),
			t || (e.jQuery = e.$ = re),
			re
		)
	}),
	/*!
	 * jquery.zoom.min.js
	 */ /*!
	Zoom 1.7.21
	license: MIT
	http://www.jacklmoore.com/zoom
*/
	(function (e) {
		var t = {
			url: !1,
			callback: !1,
			target: !1,
			duration: 120,
			on: 'mouseover',
			touch: !0,
			onZoomIn: !1,
			onZoomOut: !1,
			magnify: 1,
		}
		;(e.zoom = function (t, n, i, o) {
			var r,
				s,
				a,
				l,
				u,
				c,
				d,
				p = e(t),
				f = p.css('position'),
				h = e(n)
			return (
				(t.style.position = /(absolute|fixed)/.test(f)
					? f
					: 'relative'),
				(t.style.overflow = 'hidden'),
				(i.style.width = i.style.height = ''),
				e(i)
					.addClass('zoomImg')
					.css({
						position: 'absolute',
						top: 0,
						left: 0,
						opacity: 0,
						width: i.width * o,
						height: i.height * o,
						border: 'none',
						maxWidth: 'none',
						maxHeight: 'none',
					})
					.appendTo(t),
				{
					init: function () {
						;(s = p.outerWidth()),
							(r = p.outerHeight()),
							n === t
								? ((l = s), (a = r))
								: ((l = h.outerWidth()), (a = h.outerHeight())),
							(u = (i.width - s) / l),
							(c = (i.height - r) / a),
							(d = h.offset())
					},
					move: function (e) {
						var t = e.pageX - d.left,
							n = e.pageY - d.top
						;(n = Math.max(Math.min(n, a), 0)),
							(t = Math.max(Math.min(t, l), 0)),
							(i.style.left = t * -u + 'px'),
							(i.style.top = n * -c + 'px')
					},
				}
			)
		}),
			(e.fn.zoom = function (n) {
				return this.each(function () {
					var i = e.extend({}, t, n || {}),
						o = (i.target && e(i.target)[0]) || this,
						r = this,
						s = e(r),
						a = document.createElement('img'),
						l = e(a),
						u = 'mousemove.zoom',
						c = !1,
						d = !1
					if (!i.url) {
						var p = r.querySelector('img')
						if (
							(p &&
								(i.url =
									p.getAttribute('data-src') ||
									p.currentSrc ||
									p.src),
							!i.url)
						)
							return
					}
					s.one(
						'zoom.destroy',
						function (e, t) {
							s.off('.zoom'),
								(o.style.position = e),
								(o.style.overflow = t),
								(a.onload = null),
								l.remove()
						}.bind(this, o.style.position, o.style.overflow)
					),
						(a.onload = function () {
							function t(t) {
								p.init(),
									p.move(t),
									l
										.stop()
										.fadeTo(
											e.support.opacity ? i.duration : 0,
											1,
											!!e.isFunction(i.onZoomIn) &&
												i.onZoomIn.call(a)
										)
							}
							function n() {
								l.stop().fadeTo(
									i.duration,
									0,
									!!e.isFunction(i.onZoomOut) &&
										i.onZoomOut.call(a)
								)
							}
							var p = e.zoom(o, r, a, i.magnify)
							'grab' === i.on
								? s.on('mousedown.zoom', function (i) {
										1 === i.which &&
											(e(document).one(
												'mouseup.zoom',
												function () {
													n(),
														e(document).off(
															u,
															p.move
														)
												}
											),
											t(i),
											e(document).on(u, p.move),
											i.preventDefault())
								  })
								: 'click' === i.on
								? s.on('click.zoom', function (i) {
										return c
											? void 0
											: ((c = !0),
											  t(i),
											  e(document).on(u, p.move),
											  e(document).one(
													'click.zoom',
													function () {
														n(),
															(c = !1),
															e(document).off(
																u,
																p.move
															)
													}
											  ),
											  !1)
								  })
								: 'toggle' === i.on
								? s.on('click.zoom', function (e) {
										c ? n() : t(e), (c = !c)
								  })
								: 'mouseover' === i.on &&
								  (p.init(),
								  s
										.on('mouseenter.zoom', t)
										.on('mouseleave.zoom', n)
										.on(u, p.move)),
								i.touch &&
									s
										.on('touchstart.zoom', function (e) {
											e.preventDefault(),
												d
													? ((d = !1), n())
													: ((d = !0),
													  t(
															e.originalEvent
																.touches[0] ||
																e.originalEvent
																	.changedTouches[0]
													  ))
										})
										.on('touchmove.zoom', function (e) {
											e.preventDefault(),
												p.move(
													e.originalEvent
														.touches[0] ||
														e.originalEvent
															.changedTouches[0]
												)
										})
										.on('touchend.zoom', function (e) {
											e.preventDefault(),
												d && ((d = !1), n())
										}),
								e.isFunction(i.callback) && i.callback.call(a)
						}),
						a.setAttribute('role', 'presentation'),
						(a.alt = ''),
						(a.src = i.url)
				})
			}),
			(e.fn.zoom.defaults = t)
	})(window.jQuery),
	function () {
		function e(e, t) {
			for (var n = -1, i = t.length, o = e.length; ++n < i; )
				e[o + n] = t[n]
			return e
		}
		function t(e, t, n) {
			for (var i = -1, o = e.length; ++i < o; ) {
				var r = e[i],
					s = t(r)
				if (null != s && (a === le ? s === s : n(s, a)))
					var a = s,
						l = r
			}
			return l
		}
		function n(e, t, n) {
			var i
			return (
				n(e, function (e, n, o) {
					return t(e, n, o) ? ((i = e), !1) : void 0
				}),
				i
			)
		}
		function i(e, t, n, i, o) {
			return (
				o(e, function (e, o, r) {
					n = i ? ((i = !1), e) : t(n, e, o, r)
				}),
				n
			)
		}
		function o(e, t) {
			return T(t, function (t) {
				return e[t]
			})
		}
		function r(e) {
			return e && e.Object === Object ? e : null
		}
		function s(e) {
			return fe[e]
		}
		function a(e) {
			var t = !1
			if (null != e && 'function' != typeof e.toString)
				try {
					t = !!(e + '')
				} catch (e) {}
			return t
		}
		function l(e, t) {
			return (
				(e = 'number' == typeof e || pe.test(e) ? +e : -1),
				e > -1 && 0 == e % 1 && (null == t ? 9007199254740991 : t) > e
			)
		}
		function u(e) {
			if (Z(e) && !Re(e)) {
				if (e instanceof c) return e
				if (Se.call(e, '__wrapped__')) {
					var t = new c(e.__wrapped__, e.__chain__)
					return (t.__actions__ = A(e.__actions__)), t
				}
			}
			return new c(e)
		}
		function c(e, t) {
			;(this.__wrapped__ = e),
				(this.__actions__ = []),
				(this.__chain__ = !!t)
		}
		function d(e, t, n, i) {
			var o
			return (
				(o = e === le) ||
					((o = Te[n]),
					(o = (e === o || (e !== e && o !== o)) && !Se.call(i, n))),
				o ? t : e
			)
		}
		function p(e) {
			return J(e) ? Ne(e) : {}
		}
		function f(e, t, n) {
			if ('function' != typeof e)
				throw new TypeError('Expected a function')
			return setTimeout(function () {
				e.apply(le, n)
			}, t)
		}
		function h(e, t) {
			var n = !0
			return (
				Pe(e, function (e, i, o) {
					return (n = !!t(e, i, o))
				}),
				n
			)
		}
		function v(e, t) {
			var n = []
			return (
				Pe(e, function (e, i, o) {
					t(e, i, o) && n.push(e)
				}),
				n
			)
		}
		function g(t, n, i, o) {
			o || (o = [])
			for (var r = -1, s = t.length; ++r < s; ) {
				var a = t[r]
				n > 0 && Z(a) && V(a) && (i || Re(a) || Y(a))
					? n > 1
						? g(a, n - 1, i, o)
						: e(o, a)
					: i || (o[o.length] = a)
			}
			return o
		}
		function m(e, t) {
			return e && Le(e, t, ie)
		}
		function y(e, t) {
			return v(t, function (t) {
				return G(e[t])
			})
		}
		function b(e, t, n, i, o) {
			return (
				e === t ||
				(null == e || null == t || (!J(e) && !Z(t))
					? e !== e && t !== t
					: w(e, t, b, n, i, o))
			)
		}
		function w(e, t, n, i, o, r) {
			var s = Re(e),
				l = Re(t),
				u = '[object Array]',
				c = '[object Array]'
			s ||
				((u = $e.call(e)),
				'[object Arguments]' == u && (u = '[object Object]')),
				l ||
					((c = $e.call(t)),
					'[object Arguments]' == c && (c = '[object Object]'))
			var d = '[object Object]' == u && !a(e),
				l = '[object Object]' == c && !a(t)
			return !(c = u == c) || s || d
				? 2 & o ||
				  ((u = d && Se.call(e, '__wrapped__')),
				  (l = l && Se.call(t, '__wrapped__')),
				  !u && !l)
					? !!c &&
					  (r || (r = []),
					  (u = M(r, function (t) {
							return t[0] === e
					  })) && u[1]
							? u[1] == t
							: (r.push([e, t]),
							  (t = (s ? P : _)(e, t, n, i, o, r)),
							  r.pop(),
							  t))
					: n(u ? e.value() : e, l ? t.value() : t, i, o, r)
				: L(e, t, u)
		}
		function x(e) {
			var t = typeof e
			return 'function' == t
				? e
				: null == e
				? se
				: ('object' == t ? S : $)(e)
		}
		function k(e) {
			e = null == e ? e : Object(e)
			var t,
				n = []
			for (t in e) n.push(t)
			return n
		}
		function T(e, t) {
			var n = -1,
				i = V(e) ? Array(e.length) : []
			return (
				Pe(e, function (e, o, r) {
					i[++n] = t(e, o, r)
				}),
				i
			)
		}
		function S(e) {
			var t = ie(e)
			return function (n) {
				var i = t.length
				if (null == n) return !i
				for (n = Object(n); i--; ) {
					var o = t[i]
					if (!(o in n && b(e[o], n[o], le, 3))) return !1
				}
				return !0
			}
		}
		function C(e, t) {
			return (
				(e = Object(e)),
				W(
					t,
					function (t, n) {
						return n in e && (t[n] = e[n]), t
					},
					{}
				)
			)
		}
		function $(e) {
			return function (t) {
				return null == t ? le : t[e]
			}
		}
		function E(e, t, n) {
			var i = -1,
				o = e.length
			for (
				0 > t && (t = -t > o ? 0 : o + t),
					n = n > o ? o : n,
					0 > n && (n += o),
					o = t > n ? 0 : (n - t) >>> 0,
					t >>>= 0,
					n = Array(o);
				++i < o;

			)
				n[i] = e[i + t]
			return n
		}
		function A(e) {
			return E(e, 0, e.length)
		}
		function j(e, t) {
			var n
			return (
				Pe(e, function (e, i, o) {
					return (n = t(e, i, o)), !n
				}),
				!!n
			)
		}
		function N(t, n) {
			return W(
				n,
				function (t, n) {
					return n.func.apply(n.thisArg, e([t], n.args))
				},
				t
			)
		}
		function D(e, t, n, i) {
			n || (n = {})
			for (var o = -1, r = t.length; ++o < r; ) {
				var s = t[o],
					a = i ? i(n[s], e[s], s, n, e) : e[s],
					l = n,
					u = l[s]
				;(Se.call(l, s) &&
					(u === a || (u !== u && a !== a)) &&
					(a !== le || s in l)) ||
					(l[s] = a)
			}
			return n
		}
		function O(e) {
			return U(function (t, n) {
				var i = -1,
					o = n.length,
					r = o > 1 ? n[o - 1] : le,
					r = 'function' == typeof r ? (o--, r) : le
				for (t = Object(t); ++i < o; ) {
					var s = n[i]
					s && e(t, s, i, r)
				}
				return t
			})
		}
		function H(e) {
			return function () {
				var t = arguments,
					n = p(e.prototype),
					t = e.apply(n, t)
				return J(t) ? t : n
			}
		}
		function q(e, t, n) {
			function i() {
				for (
					var r = -1,
						s = arguments.length,
						a = -1,
						l = n.length,
						u = Array(l + s),
						c = this && this !== xe && this instanceof i ? o : e;
					++a < l;

				)
					u[a] = n[a]
				for (; s--; ) u[a++] = arguments[++r]
				return c.apply(t, u)
			}
			if ('function' != typeof e)
				throw new TypeError('Expected a function')
			var o = H(e)
			return i
		}
		function P(e, t, n, i, o, r) {
			var s = -1,
				a = 1 & o,
				l = e.length,
				u = t.length
			if (l != u && !(2 & o && u > l)) return !1
			for (u = !0; ++s < l; ) {
				var c = e[s],
					d = t[s]
				if (void 0 !== le) {
					u = !1
					break
				}
				if (a) {
					if (
						!j(t, function (e) {
							return c === e || n(c, e, i, o, r)
						})
					) {
						u = !1
						break
					}
				} else if (c !== d && !n(c, d, i, o, r)) {
					u = !1
					break
				}
			}
			return u
		}
		function L(e, t, n) {
			switch (n) {
				case '[object Boolean]':
				case '[object Date]':
					return +e == +t
				case '[object Error]':
					return e.name == t.name && e.message == t.message
				case '[object Number]':
					return e != +e ? t != +t : e == +t
				case '[object RegExp]':
				case '[object String]':
					return e == t + ''
			}
			return !1
		}
		function _(e, t, n, i, o, r) {
			var s = 2 & o,
				a = ie(e),
				l = a.length,
				u = ie(t).length
			if (l != u && !s) return !1
			for (var c = l; c--; ) {
				var d = a[c]
				if (!(s ? d in t : Se.call(t, d))) return !1
			}
			for (u = !0; ++c < l; ) {
				var d = a[c],
					p = e[d],
					f = t[d]
				if (void 0 !== le || (p !== f && !n(p, f, i, o, r))) {
					u = !1
					break
				}
				s || (s = 'constructor' == d)
			}
			return (
				u &&
					!s &&
					((n = e.constructor),
					(i = t.constructor),
					n != i &&
						'constructor' in e &&
						'constructor' in t &&
						!(
							'function' == typeof n &&
							n instanceof n &&
							'function' == typeof i &&
							i instanceof i
						) &&
						(u = !1)),
				u
			)
		}
		function z(e) {
			var t = e ? e.length : le
			if (Q(t) && (Re(e) || ee(e) || Y(e))) {
				e = String
				for (var n = -1, i = Array(t); ++n < t; ) i[n] = e(n)
				t = i
			} else t = null
			return t
		}
		function I(e) {
			var t = e && e.constructor,
				t = (G(t) && t.prototype) || Te
			return e === t
		}
		function F(e) {
			return e ? e[0] : le
		}
		function M(e, t) {
			return n(e, x(t), Pe)
		}
		function R(e, t) {
			return Pe(e, 'function' == typeof t ? t : se)
		}
		function W(e, t, n) {
			return i(e, x(t), n, 3 > arguments.length, Pe)
		}
		function B(e, t) {
			var n
			if ('function' != typeof t)
				throw new TypeError('Expected a function')
			return (
				(e = We(e)),
				function () {
					return (
						0 < --e && (n = t.apply(this, arguments)),
						1 >= e && (t = le),
						n
					)
				}
			)
		}
		function U(e) {
			var t
			if ('function' != typeof e)
				throw new TypeError('Expected a function')
			return (
				(t = qe(t === le ? e.length - 1 : We(t), 0)),
				function () {
					for (
						var n = arguments,
							i = -1,
							o = qe(n.length - t, 0),
							r = Array(o);
						++i < o;

					)
						r[i] = n[t + i]
					for (o = Array(t + 1), i = -1; ++i < t; ) o[i] = n[i]
					return (o[t] = r), e.apply(this, o)
				}
			)
		}
		function X(e, t) {
			return e > t
		}
		function Y(e) {
			return (
				Z(e) &&
				V(e) &&
				Se.call(e, 'callee') &&
				(!De.call(e, 'callee') || '[object Arguments]' == $e.call(e))
			)
		}
		function V(e) {
			return null != e && !('function' == typeof e && G(e)) && Q(_e(e))
		}
		function G(e) {
			return (
				(e = J(e) ? $e.call(e) : ''),
				'[object Function]' == e || '[object GeneratorFunction]' == e
			)
		}
		function Q(e) {
			return (
				'number' == typeof e &&
				e > -1 &&
				0 == e % 1 &&
				9007199254740991 >= e
			)
		}
		function J(e) {
			var t = typeof e
			return !!e && ('object' == t || 'function' == t)
		}
		function Z(e) {
			return !!e && 'object' == typeof e
		}
		function K(e) {
			return (
				'number' == typeof e ||
				(Z(e) && '[object Number]' == $e.call(e))
			)
		}
		function ee(e) {
			return (
				'string' == typeof e ||
				(!Re(e) && Z(e) && '[object String]' == $e.call(e))
			)
		}
		function te(e, t) {
			return t > e
		}
		function ne(e) {
			return 'string' == typeof e ? e : null == e ? '' : e + ''
		}
		function ie(e) {
			var t = I(e)
			if (!t && !V(e)) return He(Object(e))
			var n,
				i = z(e),
				o = !!i,
				i = i || [],
				r = i.length
			for (n in e)
				!Se.call(e, n) ||
					(o && ('length' == n || l(n, r))) ||
					(t && 'constructor' == n) ||
					i.push(n)
			return i
		}
		function oe(e) {
			for (
				var t = -1,
					n = I(e),
					i = k(e),
					o = i.length,
					r = z(e),
					s = !!r,
					r = r || [],
					a = r.length;
				++t < o;

			) {
				var u = i[t]
				;(s && ('length' == u || l(u, a))) ||
					('constructor' == u && (n || !Se.call(e, u))) ||
					r.push(u)
			}
			return r
		}
		function re(e) {
			return e ? o(e, ie(e)) : []
		}
		function se(e) {
			return e
		}
		function ae(t, n, i) {
			var o = ie(n),
				r = y(n, o)
			null != i ||
				(J(n) && (r.length || !o.length)) ||
				((i = n), (n = t), (t = this), (r = y(n, ie(n))))
			var s = !(J(i) && 'chain' in i) || i.chain,
				a = G(t)
			return (
				Pe(r, function (i) {
					var o = n[i]
					;(t[i] = o),
						a &&
							(t.prototype[i] = function () {
								var n = this.__chain__
								if (s || n) {
									var i = t(this.__wrapped__)
									return (
										(i.__actions__ = A(
											this.__actions__
										)).push({
											func: o,
											args: arguments,
											thisArg: t,
										}),
										(i.__chain__ = n),
										i
									)
								}
								return o.apply(t, e([this.value()], arguments))
							})
				}),
				t
			)
		}
		var le,
			ue = 1 / 0,
			ce = /[&<>"'`]/g,
			de = RegExp(ce.source),
			pe = /^(?:0|[1-9]\d*)$/,
			fe = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;',
				'`': '&#96;',
			},
			he = { function: !0, object: !0 },
			ve =
				he[typeof exports] && exports && !exports.nodeType
					? exports
					: le,
			ge = he[typeof module] && module && !module.nodeType ? module : le,
			me = ge && ge.exports === ve ? ve : le,
			ye = r(he[typeof self] && self),
			be = r(he[typeof window] && window),
			we = r(he[typeof this] && this),
			xe =
				r(ve && ge && 'object' == typeof global && global) ||
				(be !== (we && we.window) && be) ||
				ye ||
				we ||
				Function('return this')(),
			ke = Array.prototype,
			Te = Object.prototype,
			Se = Te.hasOwnProperty,
			Ce = 0,
			$e = Te.toString,
			Ee = xe._,
			Ae = xe.Reflect,
			je = Ae ? Ae.f : le,
			Ne = Object.create,
			De = Te.propertyIsEnumerable,
			Oe = xe.isFinite,
			He = Object.keys,
			qe = Math.max,
			Pe = (function (e, t) {
				return function (n, i) {
					if (null == n) return n
					if (!V(n)) return e(n, i)
					for (
						var o = n.length, r = t ? o : -1, s = Object(n);
						(t ? r-- : ++r < o) && !1 !== i(s[r], r, s);

					);
					return n
				}
			})(m),
			Le = (function (e) {
				return function (t, n, i) {
					var o = -1,
						r = Object(t)
					i = i(t)
					for (var s = i.length; s--; ) {
						var a = i[e ? s : ++o]
						if (!1 === n(r[a], a, r)) break
					}
					return t
				}
			})()
		je &&
			!De.call({ valueOf: 1 }, 'valueOf') &&
			(k = function (e) {
				e = je(e)
				for (var t, n = []; !(t = e.next()).done; ) n.push(t.value)
				return n
			})
		var _e = $('length'),
			ze = U(function (t, n) {
				return (
					Re(t) || (t = null == t ? [] : [Object(t)]),
					g(n, 1),
					e(A(t), re)
				)
			}),
			Ie = U(function (e, t, n) {
				return q(e, t, n)
			}),
			Fe = U(function (e, t) {
				return f(e, 1, t)
			}),
			Me = U(function (e, t, n) {
				return f(e, Be(t) || 0, n)
			}),
			Re = Array.isArray,
			We = Number,
			Be = Number,
			Ue = O(function (e, t) {
				D(t, ie(t), e)
			}),
			Xe = O(function (e, t) {
				D(t, oe(t), e)
			}),
			Ye = O(function (e, t, n, i) {
				D(t, oe(t), e, i)
			}),
			Ve = U(function (e) {
				return e.push(le, d), Ye.apply(le, e)
			}),
			Ge = U(function (e, t) {
				return null == e ? {} : C(e, g(t, 1))
			}),
			Qe = x
		;(c.prototype = p(u.prototype)),
			(c.prototype.constructor = c),
			(u.assignIn = Xe),
			(u.before = B),
			(u.bind = Ie),
			(u.chain = function (e) {
				return (e = u(e)), (e.__chain__ = !0), e
			}),
			(u.compact = function (e) {
				return v(e, Boolean)
			}),
			(u.concat = ze),
			(u.create = function (e, t) {
				var n = p(e)
				return t ? Ue(n, t) : n
			}),
			(u.defaults = Ve),
			(u.defer = Fe),
			(u.delay = Me),
			(u.filter = function (e, t) {
				return v(e, x(t))
			}),
			(u.flatten = function (e) {
				return e && e.length ? g(e, 1) : []
			}),
			(u.flattenDeep = function (e) {
				return e && e.length ? g(e, ue) : []
			}),
			(u.iteratee = Qe),
			(u.keys = ie),
			(u.map = function (e, t) {
				return T(e, x(t))
			}),
			(u.matches = function (e) {
				return S(Ue({}, e))
			}),
			(u.mixin = ae),
			(u.negate = function (e) {
				if ('function' != typeof e)
					throw new TypeError('Expected a function')
				return function () {
					return !e.apply(this, arguments)
				}
			}),
			(u.once = function (e) {
				return B(2, e)
			}),
			(u.pick = Ge),
			(u.slice = function (e, t, n) {
				var i = e ? e.length : 0
				return (
					(n = n === le ? i : +n),
					i ? E(e, null == t ? 0 : +t, n) : []
				)
			}),
			(u.sortBy = function (e, t) {
				var n = 0
				return (
					(t = x(t)),
					T(
						T(e, function (e, i, o) {
							return { c: e, b: n++, a: t(e, i, o) }
						}).sort(function (e, t) {
							var n
							e: {
								n = e.a
								var i = t.a
								if (n !== i) {
									var o = null === n,
										r = n === le,
										s = n === n,
										a = null === i,
										l = i === le,
										u = i === i
									if (
										(n > i && !a) ||
										!s ||
										(o && !l && u) ||
										(r && u)
									) {
										n = 1
										break e
									}
									if (
										(i > n && !o) ||
										!u ||
										(a && !r && s) ||
										(l && s)
									) {
										n = -1
										break e
									}
								}
								n = 0
							}
							return n || e.b - t.b
						}),
						$('c')
					)
				)
			}),
			(u.tap = function (e, t) {
				return t(e), e
			}),
			(u.thru = function (e, t) {
				return t(e)
			}),
			(u.toArray = function (e) {
				return V(e) ? (e.length ? A(e) : []) : re(e)
			}),
			(u.values = re),
			(u.extend = Xe),
			ae(u, u),
			(u.clone = function (e) {
				return J(e) ? (Re(e) ? A(e) : D(e, ie(e))) : e
			}),
			(u.escape = function (e) {
				return (e = ne(e)) && de.test(e) ? e.replace(ce, s) : e
			}),
			(u.every = function (e, t, n) {
				return (t = n ? le : t), h(e, x(t))
			}),
			(u.find = M),
			(u.forEach = R),
			(u.has = function (e, t) {
				return null != e && Se.call(e, t)
			}),
			(u.head = F),
			(u.identity = se),
			(u.indexOf = function (e, t, n) {
				var i = e ? e.length : 0
				;(n = 'number' == typeof n ? (0 > n ? qe(i + n, 0) : n) : 0),
					(n = (n || 0) - 1)
				for (var o = t === t; ++n < i; ) {
					var r = e[n]
					if (o ? r === t : r !== r) return n
				}
				return -1
			}),
			(u.isArguments = Y),
			(u.isArray = Re),
			(u.isBoolean = function (e) {
				return (
					!0 === e ||
					!1 === e ||
					(Z(e) && '[object Boolean]' == $e.call(e))
				)
			}),
			(u.isDate = function (e) {
				return Z(e) && '[object Date]' == $e.call(e)
			}),
			(u.isEmpty = function (e) {
				if (V(e) && (Re(e) || ee(e) || G(e.splice) || Y(e)))
					return !e.length
				for (var t in e) if (Se.call(e, t)) return !1
				return !0
			}),
			(u.isEqual = function (e, t) {
				return b(e, t)
			}),
			(u.isFinite = function (e) {
				return 'number' == typeof e && Oe(e)
			}),
			(u.isFunction = G),
			(u.isNaN = function (e) {
				return K(e) && e != +e
			}),
			(u.isNull = function (e) {
				return null === e
			}),
			(u.isNumber = K),
			(u.isObject = J),
			(u.isRegExp = function (e) {
				return J(e) && '[object RegExp]' == $e.call(e)
			}),
			(u.isString = ee),
			(u.isUndefined = function (e) {
				return e === le
			}),
			(u.last = function (e) {
				var t = e ? e.length : 0
				return t ? e[t - 1] : le
			}),
			(u.max = function (e) {
				return e && e.length ? t(e, se, X) : le
			}),
			(u.min = function (e) {
				return e && e.length ? t(e, se, te) : le
			}),
			(u.noConflict = function () {
				return xe._ === this && (xe._ = Ee), this
			}),
			(u.noop = function () {}),
			(u.reduce = W),
			(u.result = function (e, t, n) {
				return (
					(t = null == e ? le : e[t]),
					t === le && (t = n),
					G(t) ? t.call(e) : t
				)
			}),
			(u.size = function (e) {
				return null == e ? 0 : ((e = V(e) ? e : ie(e)), e.length)
			}),
			(u.some = function (e, t, n) {
				return (t = n ? le : t), j(e, x(t))
			}),
			(u.uniqueId = function (e) {
				var t = ++Ce
				return ne(e) + t
			}),
			(u.each = R),
			(u.first = F),
			ae(
				u,
				(function () {
					var e = {}
					return (
						m(u, function (t, n) {
							Se.call(u.prototype, n) || (e[n] = t)
						}),
						e
					)
				})(),
				{ chain: !1 }
			),
			(u.VERSION = '4.5.1'),
			Pe(
				'pop join replace reverse split push shift sort splice unshift'.split(
					' '
				),
				function (e) {
					var t = (
							/^(?:replace|split)$/.test(e)
								? String.prototype
								: ke
						)[e],
						n = /^(?:push|sort|unshift)$/.test(e) ? 'tap' : 'thru',
						i = /^(?:pop|join|replace|shift)$/.test(e)
					u.prototype[e] = function () {
						var e = arguments
						return i && !this.__chain__
							? t.apply(this.value(), e)
							: this[n](function (n) {
									return t.apply(n, e)
							  })
					}
				}
			),
			(u.prototype.toJSON =
				u.prototype.valueOf =
				u.prototype.value =
					function () {
						return N(this.__wrapped__, this.__actions__)
					}),
			((be || ye || {})._ = u),
			'function' == typeof define &&
			'object' == typeof define.amd &&
			define.amd
				? define(function () {
						return u
				  })
				: ve && ge
				? (me && ((ge.exports = u)._ = u), (ve._ = u))
				: (xe._ = u)
	}.call(this),
	/*!
	 * mobile-sniff.min.js
	 */ !(function () {
		window.mobileCheck = function () {
			var e = !1
			return (
				(function (t) {
					;(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
						t
					) ||
						/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
							t.substr(0, 4)
						)) &&
						(e = !0)
				})(navigator.userAgent || navigator.vendor || window.opera),
				e
			)
		}
	})(),
	/*!
	 * modernizr.min.js
	 */ /*! modernizr 3.3.1 (Custom Build) | MIT *
	 * https://modernizr.com/download/?-csstransforms-flexbox-svg-setclasses !*/
	!(function (e, t, n) {
		function i(e, t) {
			return typeof e === t
		}
		function o() {
			var e, t, n, o, r, s, a
			for (var l in b)
				if (b.hasOwnProperty(l)) {
					if (
						((e = []),
						(t = b[l]),
						t.name &&
							(e.push(t.name.toLowerCase()),
							t.options &&
								t.options.aliases &&
								t.options.aliases.length))
					)
						for (n = 0; n < t.options.aliases.length; n++)
							e.push(t.options.aliases[n].toLowerCase())
					for (
						o = i(t.fn, 'function') ? t.fn() : t.fn, r = 0;
						r < e.length;
						r++
					)
						(s = e[r]),
							(a = s.split('.')),
							1 === a.length
								? (x[a[0]] = o)
								: (!x[a[0]] ||
										x[a[0]] instanceof Boolean ||
										(x[a[0]] = new Boolean(x[a[0]])),
								  (x[a[0]][a[1]] = o)),
							y.push((o ? '' : 'no-') + a.join('-'))
				}
		}
		function r(e) {
			var t = k.className,
				n = x._config.classPrefix || ''
			if ((T && (t = t.baseVal), x._config.enableJSClass)) {
				var i = new RegExp('(^|\\s)' + n + 'no-js(\\s|$)')
				t = t.replace(i, '$1' + n + 'js$2')
			}
			x._config.enableClasses &&
				((t += ' ' + n + e.join(' ' + n)),
				T ? (k.className.baseVal = t) : (k.className = t))
		}
		function s(e, t) {
			return !!~('' + e).indexOf(t)
		}
		function a() {
			return 'function' != typeof t.createElement
				? t.createElement(arguments[0])
				: T
				? t.createElementNS.call(
						t,
						'http://www.w3.org/2000/svg',
						arguments[0]
				  )
				: t.createElement.apply(t, arguments)
		}
		function l(e) {
			return e
				.replace(/([a-z])-([a-z])/g, function (e, t, n) {
					return t + n.toUpperCase()
				})
				.replace(/^-/, '')
		}
		function u(e, t) {
			return function () {
				return e.apply(t, arguments)
			}
		}
		function c(e, t, n) {
			var o
			for (var r in e)
				if (e[r] in t)
					return n === !1
						? e[r]
						: ((o = t[e[r]]), i(o, 'function') ? u(o, n || t) : o)
			return !1
		}
		function d(e) {
			return e
				.replace(/([A-Z])/g, function (e, t) {
					return '-' + t.toLowerCase()
				})
				.replace(/^ms-/, '-ms-')
		}
		function p() {
			var e = t.body
			return e || ((e = a(T ? 'svg' : 'body')), (e.fake = !0)), e
		}
		function f(e, n, i, o) {
			var r,
				s,
				l,
				u,
				c = 'modernizr',
				d = a('div'),
				f = p()
			if (parseInt(i, 10))
				for (; i--; )
					(l = a('div')),
						(l.id = o ? o[i] : c + (i + 1)),
						d.appendChild(l)
			return (
				(r = a('style')),
				(r.type = 'text/css'),
				(r.id = 's' + c),
				(f.fake ? f : d).appendChild(r),
				f.appendChild(d),
				r.styleSheet
					? (r.styleSheet.cssText = e)
					: r.appendChild(t.createTextNode(e)),
				(d.id = c),
				f.fake &&
					((f.style.background = ''),
					(f.style.overflow = 'hidden'),
					(u = k.style.overflow),
					(k.style.overflow = 'hidden'),
					k.appendChild(f)),
				(s = n(d, e)),
				f.fake
					? (f.parentNode.removeChild(f),
					  (k.style.overflow = u),
					  k.offsetHeight)
					: d.parentNode.removeChild(d),
				!!s
			)
		}
		function h(t, i) {
			var o = t.length
			if ('CSS' in e && 'supports' in e.CSS) {
				for (; o--; ) if (e.CSS.supports(d(t[o]), i)) return !0
				return !1
			}
			if ('CSSSupportsRule' in e) {
				for (var r = []; o--; ) r.push('(' + d(t[o]) + ':' + i + ')')
				return (
					(r = r.join(' or ')),
					f(
						'@supports (' +
							r +
							') { #modernizr { position: absolute; } }',
						function (e) {
							return (
								'absolute' == getComputedStyle(e, null).position
							)
						}
					)
				)
			}
			return n
		}
		function v(e, t, o, r) {
			function u() {
				d && (delete A.style, delete A.modElem)
			}
			if (((r = !i(r, 'undefined') && r), !i(o, 'undefined'))) {
				var c = h(e, o)
				if (!i(c, 'undefined')) return c
			}
			for (
				var d, p, f, v, g, m = ['modernizr', 'tspan', 'samp'];
				!A.style && m.length;

			)
				(d = !0),
					(A.modElem = a(m.shift())),
					(A.style = A.modElem.style)
			for (f = e.length, p = 0; f > p; p++)
				if (
					((v = e[p]),
					(g = A.style[v]),
					s(v, '-') && (v = l(v)),
					A.style[v] !== n)
				) {
					if (r || i(o, 'undefined')) return u(), 'pfx' != t || v
					try {
						A.style[v] = o
					} catch (e) {}
					if (A.style[v] != g) return u(), 'pfx' != t || v
				}
			return u(), !1
		}
		function g(e, t, n, o, r) {
			var s = e.charAt(0).toUpperCase() + e.slice(1),
				a = (e + ' ' + C.join(s + ' ') + s).split(' ')
			return i(t, 'string') || i(t, 'undefined')
				? v(a, t, o, r)
				: ((a = (e + ' ' + $.join(s + ' ') + s).split(' ')), c(a, t, n))
		}
		function m(e, t, i) {
			return g(e, n, n, t, i)
		}
		var y = [],
			b = [],
			w = {
				_version: '3.3.1',
				_config: {
					classPrefix: '',
					enableClasses: !0,
					enableJSClass: !0,
					usePrefixes: !0,
				},
				_q: [],
				on: function (e, t) {
					var n = this
					setTimeout(function () {
						t(n[e])
					}, 0)
				},
				addTest: function (e, t, n) {
					b.push({ name: e, fn: t, options: n })
				},
				addAsyncTest: function (e) {
					b.push({ name: null, fn: e })
				},
			},
			x = function () {}
		;(x.prototype = w),
			(x = new x()),
			x.addTest(
				'svg',
				!!t.createElementNS &&
					!!t.createElementNS('http://www.w3.org/2000/svg', 'svg')
						.createSVGRect
			)
		var k = t.documentElement,
			T = 'svg' === k.nodeName.toLowerCase(),
			S = 'Moz O ms Webkit',
			C = w._config.usePrefixes ? S.split(' ') : []
		w._cssomPrefixes = C
		var $ = w._config.usePrefixes ? S.toLowerCase().split(' ') : []
		w._domPrefixes = $
		var E = { elem: a('modernizr') }
		x._q.push(function () {
			delete E.elem
		})
		var A = { style: E.elem.style }
		x._q.unshift(function () {
			delete A.style
		}),
			(w.testAllProps = g),
			(w.testAllProps = m),
			x.addTest('flexbox', m('flexBasis', '1px', !0)),
			x.addTest('csstransforms', function () {
				return (
					-1 === navigator.userAgent.indexOf('Android 2.') &&
					m('transform', 'scale(1)', !0)
				)
			}),
			o(),
			r(y),
			delete w.addTest,
			delete w.addAsyncTest
		for (var j = 0; j < x._q.length; j++) x._q[j]()
		e.Modernizr = x
	})(window, document),
	/*!
	 * prepare-transition.min.js
	 */ /* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
	!(function (e) {
		e.fn.prepareTransition = function () {
			return this.each(function () {
				var t = e(this)
				t.one(
					'TransitionEnd webkitTransitionEnd transitionend oTransitionEnd',
					function () {
						t.removeClass('is-transitioning')
					}
				)
				var n = [
						'transition-duration',
						'-moz-transition-duration',
						'-webkit-transition-duration',
						'-o-transition-duration',
					],
					i = 0
				e.each(n, function (e, n) {
					i || (i = parseFloat(t.css(n)))
				}),
					0 != i && (t.addClass('is-transitioning'), t[0].offsetWidth)
			})
		}
	})(jQuery),
	/* jquery.ba-throttle-debounce.min.js
	 */
	/*
	 * jQuery throttle / debounce - v1.1 - 3/7/2010
	 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
	 *
	 * Copyright (c) 2010 "Cowboy" Ben Alman
	 * Dual licensed under the MIT and GPL licenses.
	 * http://benalman.com/about/license/
	 */
	(function (e, t) {
		var n,
			i = e.jQuery || e.Cowboy || (e.Cowboy = {})
		;(i.throttle = n =
			function (e, n, o, r) {
				function s() {
					function i() {
						;(l = +new Date()), o.apply(u, d)
					}
					function s() {
						a = t
					}
					var u = this,
						c = +new Date() - l,
						d = arguments
					r && !a && i(),
						a && clearTimeout(a),
						r === t && c > e
							? i()
							: n !== !0 &&
							  (a = setTimeout(r ? s : i, r === t ? e - c : e))
				}
				var a,
					l = 0
				return (
					'boolean' != typeof n && ((r = o), (o = n), (n = t)),
					i.guid && (s.guid = o.guid = o.guid || i.guid++),
					s
				)
			}),
			(i.debounce = function (e, i, o) {
				return o === t ? n(e, i, !1) : n(e, o, i !== !1)
			})
	})(this)

// ==================================================
// fancyBox v3.3.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2018 fancyApps
//
// ==================================================
!(function (t, e, n, o) {
	'use strict'
	function i(t, e) {
		var o,
			i,
			a = [],
			s = 0
		;(t && t.isDefaultPrevented()) ||
			(t.preventDefault(),
			(e = t && t.data ? t.data.options : e || {}),
			(o = e.$target || n(t.currentTarget)),
			(i = o.attr('data-fancybox') || ''),
			i
				? ((a = e.selector
						? n(e.selector)
						: t.data
						? t.data.items
						: []),
				  (a = a.length
						? a.filter('[data-fancybox="' + i + '"]')
						: n('[data-fancybox="' + i + '"]')),
				  (s = a.index(o)),
				  s < 0 && (s = 0))
				: (a = [o]),
			n.fancybox.open(a, e, s))
	}
	if (((t.console = t.console || { info: function (t) {} }), n)) {
		if (n.fn.fancybox)
			return void console.info('fancyBox already initialized')
		var a = {
				loop: !1,
				gutter: 50,
				keyboard: !0,
				arrows: !0,
				infobar: !0,
				smallBtn: 'auto',
				toolbar: 'auto',
				buttons: ['zoom', 'thumbs', 'close'],
				idleTime: 3,
				protect: !1,
				modal: !1,
				image: { preload: !1 },
				ajax: { settings: { data: { fancybox: !0 } } },
				iframe: {
					tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
					preload: !0,
					css: {},
					attr: { scrolling: 'auto' },
				},
				defaultType: 'image',
				animationEffect: 'zoom',
				animationDuration: 366,
				zoomOpacity: 'auto',
				transitionEffect: 'fade',
				transitionDuration: 366,
				slideClass: '',
				baseClass: '',
				baseTpl:
					'<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"></div></div></div>',
				spinnerTpl: '<div class="fancybox-loading"></div>',
				errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
				btnTpl: {
					download:
						'<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" /></svg></a>',
					zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" /></svg></button>',
					close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',
					smallBtn:
						'<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',
					arrowLeft:
						'<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path></svg></a>',
					arrowRight:
						'<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path></svg></a>',
				},
				parentEl: 'body',
				autoFocus: !1,
				backFocus: !0,
				trapFocus: !0,
				fullScreen: { autoStart: !1 },
				touch: { vertical: !0, momentum: !0 },
				hash: null,
				media: {},
				slideShow: { autoStart: !1, speed: 4e3 },
				thumbs: {
					autoStart: !1,
					hideOnClose: !0,
					parentEl: '.fancybox-container',
					axis: 'y',
				},
				wheel: 'auto',
				onInit: n.noop,
				beforeLoad: n.noop,
				afterLoad: n.noop,
				beforeShow: n.noop,
				afterShow: n.noop,
				beforeClose: n.noop,
				afterClose: n.noop,
				onActivate: n.noop,
				onDeactivate: n.noop,
				clickContent: function (t, e) {
					return 'image' === t.type && 'zoom'
				},
				clickSlide: 'close',
				clickOutside: 'close',
				dblclickContent: !1,
				dblclickSlide: !1,
				dblclickOutside: !1,
				mobile: {
					idleTime: !1,
					clickContent: function (t, e) {
						return 'image' === t.type && 'toggleControls'
					},
					clickSlide: function (t, e) {
						return 'image' === t.type ? 'toggleControls' : 'close'
					},
					dblclickContent: function (t, e) {
						return 'image' === t.type && 'zoom'
					},
					dblclickSlide: function (t, e) {
						return 'image' === t.type && 'zoom'
					},
				},
				lang: 'en',
				i18n: {
					en: {
						CLOSE: 'Close',
						NEXT: 'Next',
						PREV: 'Previous',
						ERROR: 'The requested content cannot be loaded. <br/> Please try again later.',
						PLAY_START: 'Start slideshow',
						PLAY_STOP: 'Pause slideshow',
						FULL_SCREEN: 'Full screen',
						THUMBS: 'Thumbnails',
						DOWNLOAD: 'Download',
						SHARE: 'Share',
						ZOOM: 'Zoom',
					},
					de: {
						CLOSE: 'Schliessen',
						NEXT: 'Weiter',
						PREV: 'Zurück',
						ERROR: 'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.',
						PLAY_START: 'Diaschau starten',
						PLAY_STOP: 'Diaschau beenden',
						FULL_SCREEN: 'Vollbild',
						THUMBS: 'Vorschaubilder',
						DOWNLOAD: 'Herunterladen',
						SHARE: 'Teilen',
						ZOOM: 'Maßstab',
					},
				},
			},
			s = n(t),
			r = n(e),
			c = 0,
			l = function (t) {
				return t && t.hasOwnProperty && t instanceof n
			},
			d = (function () {
				return (
					t.requestAnimationFrame ||
					t.webkitRequestAnimationFrame ||
					t.mozRequestAnimationFrame ||
					t.oRequestAnimationFrame ||
					function (e) {
						return t.setTimeout(e, 1e3 / 60)
					}
				)
			})(),
			u = (function () {
				var t,
					n = e.createElement('fakeelement'),
					i = {
						transition: 'transitionend',
						OTransition: 'oTransitionEnd',
						MozTransition: 'transitionend',
						WebkitTransition: 'webkitTransitionEnd',
					}
				for (t in i) if (n.style[t] !== o) return i[t]
				return 'transitionend'
			})(),
			f = function (t) {
				return t && t.length && t[0].offsetHeight
			},
			p = function (t, e) {
				var o = n.extend(!0, {}, t, e)
				return (
					n.each(e, function (t, e) {
						n.isArray(e) && (o[t] = e)
					}),
					o
				)
			},
			h = function (t, o, i) {
				var a = this
				;(a.opts = p({ index: i }, n.fancybox.defaults)),
					n.isPlainObject(o) && (a.opts = p(a.opts, o)),
					n.fancybox.isMobile && (a.opts = p(a.opts, a.opts.mobile)),
					(a.id = a.opts.id || ++c),
					(a.currIndex = parseInt(a.opts.index, 10) || 0),
					(a.prevIndex = null),
					(a.prevPos = null),
					(a.currPos = 0),
					(a.firstRun = !0),
					(a.group = []),
					(a.slides = {}),
					a.addContent(t),
					a.group.length &&
						((a.$lastFocus = n(e.activeElement).trigger('blur')),
						a.init())
			}
		n.extend(h.prototype, {
			init: function () {
				var i,
					a,
					s,
					r = this,
					c = r.group[r.currIndex],
					l = c.opts,
					d = n.fancybox.scrollbarWidth
				n.fancybox.getInstance() ||
					l.hideScrollbar === !1 ||
					(n('body').addClass('fancybox-active'),
					!n.fancybox.isMobile &&
						e.body.scrollHeight > t.innerHeight &&
						(d === o &&
							((i = n(
								'<div style="width:100px;height:100px;overflow:scroll;" />'
							).appendTo('body')),
							(d = n.fancybox.scrollbarWidth =
								i[0].offsetWidth - i[0].clientWidth),
							i.remove()),
						n('head').append(
							'<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' +
								d +
								'px; }</style>'
						),
						n('body').addClass('compensate-for-scrollbar'))),
					(s = ''),
					n.each(l.buttons, function (t, e) {
						s += l.btnTpl[e] || ''
					}),
					(a = n(
						r.translate(
							r,
							l.baseTpl
								.replace('{{buttons}}', s)
								.replace(
									'{{arrows}}',
									l.btnTpl.arrowLeft + l.btnTpl.arrowRight
								)
						)
					)
						.attr('id', 'fancybox-container-' + r.id)
						.addClass('fancybox-is-hidden')
						.addClass(l.baseClass)
						.data('FancyBox', r)
						.appendTo(l.parentEl)),
					(r.$refs = { container: a }),
					[
						'bg',
						'inner',
						'infobar',
						'toolbar',
						'stage',
						'caption',
						'navigation',
					].forEach(function (t) {
						r.$refs[t] = a.find('.fancybox-' + t)
					}),
					r.trigger('onInit'),
					r.activate(),
					r.jumpTo(r.currIndex)
			},
			translate: function (t, e) {
				var n = t.opts.i18n[t.opts.lang]
				return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
					var i = n[e]
					return i === o ? t : i
				})
			},
			addContent: function (t) {
				var e,
					i = this,
					a = n.makeArray(t)
				n.each(a, function (t, e) {
					var a,
						s,
						r,
						c,
						l,
						d = {},
						u = {}
					n.isPlainObject(e)
						? ((d = e), (u = e.opts || e))
						: 'object' === n.type(e) && n(e).length
						? ((a = n(e)),
						  (u = a.data() || {}),
						  (u = n.extend(!0, {}, u, u.options)),
						  (u.$orig = a),
						  (d.src = i.opts.src || u.src || a.attr('href')),
						  d.type || d.src || ((d.type = 'inline'), (d.src = e)))
						: (d = { type: 'html', src: e + '' }),
						(d.opts = n.extend(!0, {}, i.opts, u)),
						n.isArray(u.buttons) && (d.opts.buttons = u.buttons),
						(s = d.type || d.opts.type),
						(c = d.src || ''),
						!s &&
							c &&
							((r = c.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i))
								? ((s = 'video'),
								  d.opts.videoFormat ||
										(d.opts.videoFormat =
											'video/' +
											('ogv' === r[1] ? 'ogg' : r[1])))
								: c.match(
										/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
								  )
								? (s = 'image')
								: c.match(/\.(pdf)((\?|#).*)?$/i)
								? (s = 'iframe')
								: '#' === c.charAt(0) && (s = 'inline')),
						s ? (d.type = s) : i.trigger('objectNeedsType', d),
						d.contentType ||
							(d.contentType =
								n.inArray(d.type, ['html', 'inline', 'ajax']) >
								-1
									? 'html'
									: d.type),
						(d.index = i.group.length),
						'auto' == d.opts.smallBtn &&
							(d.opts.smallBtn =
								n.inArray(d.type, ['html', 'inline', 'ajax']) >
								-1),
						'auto' === d.opts.toolbar &&
							(d.opts.toolbar = !d.opts.smallBtn),
						d.opts.$trigger &&
							d.index === i.opts.index &&
							(d.opts.$thumb = d.opts.$trigger.find('img:first')),
						(d.opts.$thumb && d.opts.$thumb.length) ||
							!d.opts.$orig ||
							(d.opts.$thumb = d.opts.$orig.find('img:first')),
						'function' === n.type(d.opts.caption) &&
							(d.opts.caption = d.opts.caption.apply(e, [i, d])),
						'function' === n.type(i.opts.caption) &&
							(d.opts.caption = i.opts.caption.apply(e, [i, d])),
						d.opts.caption instanceof n ||
							(d.opts.caption =
								d.opts.caption === o
									? ''
									: d.opts.caption + ''),
						'ajax' === d.type &&
							((l = c.split(/\s+/, 2)),
							l.length > 1 &&
								((d.src = l.shift()),
								(d.opts.filter = l.shift()))),
						d.opts.modal &&
							(d.opts = n.extend(!0, d.opts, {
								infobar: 0,
								toolbar: 0,
								smallBtn: 0,
								keyboard: 0,
								slideShow: 0,
								fullScreen: 0,
								thumbs: 0,
								touch: 0,
								clickContent: !1,
								clickSlide: !1,
								clickOutside: !1,
								dblclickContent: !1,
								dblclickSlide: !1,
								dblclickOutside: !1,
							})),
						i.group.push(d)
				}),
					Object.keys(i.slides).length &&
						(i.updateControls(),
						(e = i.Thumbs),
						e && e.isActive && (e.create(), e.focus()))
			},
			addEvents: function () {
				var o = this
				o.removeEvents(),
					o.$refs.container
						.on(
							'click.fb-close',
							'[data-fancybox-close]',
							function (t) {
								t.stopPropagation(),
									t.preventDefault(),
									o.close(t)
							}
						)
						.on(
							'touchstart.fb-prev click.fb-prev',
							'[data-fancybox-prev]',
							function (t) {
								t.stopPropagation(),
									t.preventDefault(),
									o.previous()
							}
						)
						.on(
							'touchstart.fb-next click.fb-next',
							'[data-fancybox-next]',
							function (t) {
								t.stopPropagation(),
									t.preventDefault(),
									o.next()
							}
						)
						.on('click.fb', '[data-fancybox-zoom]', function (t) {
							o[
								o.isScaledDown()
									? 'scaleToActual'
									: 'scaleToFit'
							]()
						}),
					s.on('orientationchange.fb resize.fb', function (t) {
						t &&
						t.originalEvent &&
						'resize' === t.originalEvent.type
							? d(function () {
									o.update()
							  })
							: (o.$refs.stage.hide(),
							  setTimeout(
									function () {
										o.$refs.stage.show(), o.update()
									},
									n.fancybox.isMobile ? 600 : 250
							  ))
					}),
					r.on('focusin.fb', function (t) {
						var o = n.fancybox ? n.fancybox.getInstance() : null
						o.isClosing ||
							!o.current ||
							!o.current.opts.trapFocus ||
							n(t.target).hasClass('fancybox-container') ||
							n(t.target).is(e) ||
							(o &&
								'fixed' !== n(t.target).css('position') &&
								!o.$refs.container.has(t.target).length &&
								(t.stopPropagation(), o.focus()))
					}),
					r.on('keydown.fb', function (t) {
						var e = o.current,
							i = t.keyCode || t.which
						if (
							e &&
							e.opts.keyboard &&
							!(
								t.ctrlKey ||
								t.altKey ||
								t.shiftKey ||
								n(t.target).is('input') ||
								n(t.target).is('textarea')
							)
						)
							return 8 === i || 27 === i
								? (t.preventDefault(), void o.close(t))
								: 37 === i || 38 === i
								? (t.preventDefault(), void o.previous())
								: 39 === i || 40 === i
								? (t.preventDefault(), void o.next())
								: void o.trigger('afterKeydown', t, i)
					}),
					o.group[o.currIndex].opts.idleTime &&
						((o.idleSecondsCounter = 0),
						r.on(
							'mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle',
							function (t) {
								;(o.idleSecondsCounter = 0),
									o.isIdle && o.showControls(),
									(o.isIdle = !1)
							}
						),
						(o.idleInterval = t.setInterval(function () {
							o.idleSecondsCounter++,
								o.idleSecondsCounter >=
									o.group[o.currIndex].opts.idleTime &&
									!o.isDragging &&
									((o.isIdle = !0),
									(o.idleSecondsCounter = 0),
									o.hideControls())
						}, 1e3)))
			},
			removeEvents: function () {
				var e = this
				s.off('orientationchange.fb resize.fb'),
					r.off('focusin.fb keydown.fb .fb-idle'),
					this.$refs.container.off('.fb-close .fb-prev .fb-next'),
					e.idleInterval &&
						(t.clearInterval(e.idleInterval),
						(e.idleInterval = null))
			},
			previous: function (t) {
				return this.jumpTo(this.currPos - 1, t)
			},
			next: function (t) {
				return this.jumpTo(this.currPos + 1, t)
			},
			jumpTo: function (t, e) {
				var i,
					a,
					s,
					r,
					c,
					l,
					d,
					u = this,
					p = u.group.length
				if (
					!(
						u.isDragging ||
						u.isClosing ||
						(u.isAnimating && u.firstRun)
					)
				) {
					if (
						((t = parseInt(t, 10)),
						(a = u.current ? u.current.opts.loop : u.opts.loop),
						!a && (t < 0 || t >= p))
					)
						return !1
					if (
						((i = u.firstRun = !Object.keys(u.slides).length),
						!(p < 2 && !i && u.isDragging))
					) {
						if (
							((r = u.current),
							(u.prevIndex = u.currIndex),
							(u.prevPos = u.currPos),
							(s = u.createSlide(t)),
							p > 1 &&
								((a || s.index > 0) && u.createSlide(t - 1),
								(a || s.index < p - 1) && u.createSlide(t + 1)),
							(u.current = s),
							(u.currIndex = s.index),
							(u.currPos = s.pos),
							u.trigger('beforeShow', i),
							u.updateControls(),
							(l = n.fancybox.getTranslate(s.$slide)),
							(s.isMoved =
								(0 !== l.left || 0 !== l.top) &&
								!s.$slide.hasClass('fancybox-animated')),
							(s.forcedDuration = o),
							n.isNumeric(e)
								? (s.forcedDuration = e)
								: (e =
										s.opts[
											i
												? 'animationDuration'
												: 'transitionDuration'
										]),
							(e = parseInt(e, 10)),
							i)
						)
							return (
								s.opts.animationEffect &&
									e &&
									u.$refs.container.css(
										'transition-duration',
										e + 'ms'
									),
								u.$refs.container.removeClass(
									'fancybox-is-hidden'
								),
								f(u.$refs.container),
								u.$refs.container.addClass('fancybox-is-open'),
								f(u.$refs.container),
								s.$slide.addClass('fancybox-slide--previous'),
								u.loadSlide(s),
								s.$slide
									.removeClass('fancybox-slide--previous')
									.addClass('fancybox-slide--current'),
								void u.preload('image')
							)
						n.each(u.slides, function (t, e) {
							n.fancybox.stop(e.$slide)
						}),
							s.$slide
								.removeClass(
									'fancybox-slide--next fancybox-slide--previous'
								)
								.addClass('fancybox-slide--current'),
							s.isMoved
								? ((c = Math.round(s.$slide.width())),
								  n.each(u.slides, function (t, o) {
										var i = o.pos - s.pos
										n.fancybox.animate(
											o.$slide,
											{
												top: 0,
												left: i * c + i * o.opts.gutter,
											},
											e,
											function () {
												o.$slide
													.removeAttr('style')
													.removeClass(
														'fancybox-slide--next fancybox-slide--previous'
													),
													o.pos === u.currPos &&
														((s.isMoved = !1),
														u.complete())
											}
										)
								  }))
								: u.$refs.stage.children().removeAttr('style'),
							s.isLoaded ? u.revealContent(s) : u.loadSlide(s),
							u.preload('image'),
							r.pos !== s.pos &&
								((d =
									'fancybox-slide--' +
									(r.pos > s.pos ? 'next' : 'previous')),
								r.$slide.removeClass(
									'fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous'
								),
								(r.isComplete = !1),
								e &&
									(s.isMoved || s.opts.transitionEffect) &&
									(s.isMoved
										? r.$slide.addClass(d)
										: ((d =
												'fancybox-animated ' +
												d +
												' fancybox-fx-' +
												s.opts.transitionEffect),
										  n.fancybox.animate(
												r.$slide,
												d,
												e,
												function () {
													r.$slide
														.removeClass(d)
														.removeAttr('style')
												}
										  ))))
					}
				}
			},
			createSlide: function (t) {
				var e,
					o,
					i = this
				return (
					(o = t % i.group.length),
					(o = o < 0 ? i.group.length + o : o),
					!i.slides[t] &&
						i.group[o] &&
						((e = n('<div class="fancybox-slide"></div>').appendTo(
							i.$refs.stage
						)),
						(i.slides[t] = n.extend(!0, {}, i.group[o], {
							pos: t,
							$slide: e,
							isLoaded: !1,
						})),
						i.updateSlide(i.slides[t])),
					i.slides[t]
				)
			},
			scaleToActual: function (t, e, i) {
				var a,
					s,
					r,
					c,
					l,
					d = this,
					u = d.current,
					f = u.$content,
					p = n.fancybox.getTranslate(u.$slide).width,
					h = n.fancybox.getTranslate(u.$slide).height,
					g = u.width,
					b = u.height
				!d.isAnimating &&
					f &&
					'image' == u.type &&
					u.isLoaded &&
					!u.hasError &&
					(n.fancybox.stop(f),
					(d.isAnimating = !0),
					(t = t === o ? 0.5 * p : t),
					(e = e === o ? 0.5 * h : e),
					(a = n.fancybox.getTranslate(f)),
					(a.top -= n.fancybox.getTranslate(u.$slide).top),
					(a.left -= n.fancybox.getTranslate(u.$slide).left),
					(c = g / a.width),
					(l = b / a.height),
					(s = 0.5 * p - 0.5 * g),
					(r = 0.5 * h - 0.5 * b),
					g > p &&
						((s = a.left * c - (t * c - t)),
						s > 0 && (s = 0),
						s < p - g && (s = p - g)),
					b > h &&
						((r = a.top * l - (e * l - e)),
						r > 0 && (r = 0),
						r < h - b && (r = h - b)),
					d.updateCursor(g, b),
					n.fancybox.animate(
						f,
						{ top: r, left: s, scaleX: c, scaleY: l },
						i || 330,
						function () {
							d.isAnimating = !1
						}
					),
					d.SlideShow && d.SlideShow.isActive && d.SlideShow.stop())
			},
			scaleToFit: function (t) {
				var e,
					o = this,
					i = o.current,
					a = i.$content
				!o.isAnimating &&
					a &&
					'image' == i.type &&
					i.isLoaded &&
					!i.hasError &&
					(n.fancybox.stop(a),
					(o.isAnimating = !0),
					(e = o.getFitPos(i)),
					o.updateCursor(e.width, e.height),
					n.fancybox.animate(
						a,
						{
							top: e.top,
							left: e.left,
							scaleX: e.width / a.width(),
							scaleY: e.height / a.height(),
						},
						t || 330,
						function () {
							o.isAnimating = !1
						}
					))
			},
			getFitPos: function (t) {
				var e,
					n,
					o,
					i,
					a,
					s = this,
					r = t.$content,
					c = t.width || t.opts.width,
					l = t.height || t.opts.height,
					d = {}
				return (
					!!(t.isLoaded && r && r.length) &&
					((i = {
						top: parseInt(t.$slide.css('paddingTop'), 10),
						right: parseInt(t.$slide.css('paddingRight'), 10),
						bottom: parseInt(t.$slide.css('paddingBottom'), 10),
						left: parseInt(t.$slide.css('paddingLeft'), 10),
					}),
					(e =
						parseInt(s.$refs.stage.width(), 10) -
						(i.left + i.right)),
					(n =
						parseInt(s.$refs.stage.height(), 10) -
						(i.top + i.bottom)),
					(c && l) || ((c = e), (l = n)),
					(o = Math.min(1, e / c, n / l)),
					(c = Math.floor(o * c)),
					(l = Math.floor(o * l)),
					'image' === t.type
						? ((d.top = Math.floor(0.5 * (n - l)) + i.top),
						  (d.left = Math.floor(0.5 * (e - c)) + i.left))
						: 'video' === t.contentType &&
						  ((a =
								t.opts.width && t.opts.height
									? c / l
									: t.opts.ratio || 16 / 9),
						  l > c / a ? (l = c / a) : c > l * a && (c = l * a)),
					(d.width = c),
					(d.height = l),
					d)
				)
			},
			update: function () {
				var t = this
				n.each(t.slides, function (e, n) {
					t.updateSlide(n)
				})
			},
			updateSlide: function (t, e) {
				var o = this,
					i = t && t.$content,
					a = t.width || t.opts.width,
					s = t.height || t.opts.height
				i &&
					(a || s || 'video' === t.contentType) &&
					!t.hasError &&
					(n.fancybox.stop(i),
					n.fancybox.setTranslate(i, o.getFitPos(t)),
					t.pos === o.currPos &&
						((o.isAnimating = !1), o.updateCursor())),
					t.$slide.trigger('refresh'),
					o.$refs.toolbar.toggleClass(
						'compensate-for-scrollbar',
						t.$slide.get(0).scrollHeight >
							t.$slide.get(0).clientHeight
					),
					o.trigger('onUpdate', t)
			},
			centerSlide: function (t, e) {
				var i,
					a,
					s = this
				s.current &&
					((i = Math.round(t.$slide.width())),
					(a = t.pos - s.current.pos),
					n.fancybox.animate(
						t.$slide,
						{ top: 0, left: a * i + a * t.opts.gutter, opacity: 1 },
						e === o ? 0 : e,
						null,
						!1
					))
			},
			updateCursor: function (t, e) {
				var o,
					i = this,
					a = i.current,
					s = i.$refs.container.removeClass(
						'fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut'
					)
				a &&
					!i.isClosing &&
					((o = i.isZoomable()),
					s.toggleClass('fancybox-is-zoomable', o),
					n('[data-fancybox-zoom]').prop('disabled', !o),
					o &&
					('zoom' === a.opts.clickContent ||
						(n.isFunction(a.opts.clickContent) &&
							'zoom' === a.opts.clickContent(a)))
						? i.isScaledDown(t, e)
							? s.addClass('fancybox-can-zoomIn')
							: a.opts.touch
							? s.addClass('fancybox-can-drag')
							: s.addClass('fancybox-can-zoomOut')
						: a.opts.touch &&
						  'video' !== a.contentType &&
						  s.addClass('fancybox-can-drag'))
			},
			isZoomable: function () {
				var t,
					e = this,
					n = e.current
				if (n && !e.isClosing && 'image' === n.type && !n.hasError) {
					if (!n.isLoaded) return !0
					if (
						((t = e.getFitPos(n)),
						n.width > t.width || n.height > t.height)
					)
						return !0
				}
				return !1
			},
			isScaledDown: function (t, e) {
				var i = this,
					a = !1,
					s = i.current,
					r = s.$content
				return (
					t !== o && e !== o
						? (a = t < s.width && e < s.height)
						: r &&
						  ((a = n.fancybox.getTranslate(r)),
						  (a = a.width < s.width && a.height < s.height)),
					a
				)
			},
			canPan: function () {
				var t,
					e = this,
					n = !1,
					o = e.current
				return (
					'image' === o.type &&
						(t = o.$content) &&
						!o.hasError &&
						((n = e.getFitPos(o)),
						(n =
							Math.abs(t.width() - n.width) > 1 ||
							Math.abs(t.height() - n.height) > 1)),
					n
				)
			},
			loadSlide: function (t) {
				var e,
					o,
					i,
					a = this
				if (!t.isLoading && !t.isLoaded) {
					switch (
						((t.isLoading = !0),
						a.trigger('beforeLoad', t),
						(e = t.type),
						(o = t.$slide),
						o
							.off('refresh')
							.trigger('onReset')
							.addClass(t.opts.slideClass),
						e)
					) {
						case 'image':
							a.setImage(t)
							break
						case 'iframe':
							a.setIframe(t)
							break
						case 'html':
							a.setContent(t, t.src || t.content)
							break
						case 'video':
							a.setContent(
								t,
								'<video class="fancybox-video" controls controlsList="nodownload"><source src="' +
									t.src +
									'" type="' +
									t.opts.videoFormat +
									'">Your browser doesn\'t support HTML5 video</video'
							)
							break
						case 'inline':
							n(t.src).length
								? a.setContent(t, n(t.src))
								: a.setError(t)
							break
						case 'ajax':
							a.showLoading(t),
								(i = n.ajax(
									n.extend({}, t.opts.ajax.settings, {
										url: t.src,
										success: function (e, n) {
											'success' === n &&
												a.setContent(t, e)
										},
										error: function (e, n) {
											e && 'abort' !== n && a.setError(t)
										},
									})
								)),
								o.one('onReset', function () {
									i.abort()
								})
							break
						default:
							a.setError(t)
					}
					return !0
				}
			},
			setImage: function (e) {
				var o,
					i,
					a,
					s,
					r,
					c = this,
					l = e.opts.srcset || e.opts.image.srcset
				if (
					((e.timouts = setTimeout(function () {
						var t = e.$image
						!e.isLoading ||
							(t && t[0].complete) ||
							e.hasError ||
							c.showLoading(e)
					}, 350)),
					l)
				) {
					;(s = t.devicePixelRatio || 1),
						(r = t.innerWidth * s),
						(a = l.split(',').map(function (t) {
							var e = {}
							return (
								t
									.trim()
									.split(/\s+/)
									.forEach(function (t, n) {
										var o = parseInt(
											t.substring(0, t.length - 1),
											10
										)
										return 0 === n
											? (e.url = t)
											: void (
													o &&
													((e.value = o),
													(e.postfix =
														t[t.length - 1]))
											  )
									}),
								e
							)
						})),
						a.sort(function (t, e) {
							return t.value - e.value
						})
					for (var d = 0; d < a.length; d++) {
						var u = a[d]
						if (
							('w' === u.postfix && u.value >= r) ||
							('x' === u.postfix && u.value >= s)
						) {
							i = u
							break
						}
					}
					!i && a.length && (i = a[a.length - 1]),
						i &&
							((e.src = i.url),
							e.width &&
								e.height &&
								'w' == i.postfix &&
								((e.height = (e.width / e.height) * i.value),
								(e.width = i.value)),
							(e.opts.srcset = l))
				}
				;(e.$content = n('<div class="fancybox-content"></div>')
					.addClass('fancybox-is-hidden')
					.appendTo(e.$slide.addClass('fancybox-slide--image'))),
					(o =
						e.opts.thumb ||
						(!(!e.opts.$thumb || !e.opts.$thumb.length) &&
							e.opts.$thumb.attr('src'))),
					e.opts.preload !== !1 &&
						e.opts.width &&
						e.opts.height &&
						o &&
						((e.width = e.opts.width),
						(e.height = e.opts.height),
						(e.$ghost = n('<img />')
							.one('error', function () {
								n(this).remove(), (e.$ghost = null)
							})
							.one('load', function () {
								c.afterLoad(e)
							})
							.addClass('fancybox-image')
							.appendTo(e.$content)
							.attr('src', o))),
					c.setBigImage(e)
			},
			setBigImage: function (t) {
				var e = this,
					o = n('<img />')
				;(t.$image = o
					.one('error', function () {
						e.setError(t)
					})
					.one('load', function () {
						var n
						t.$ghost ||
							(e.resolveImageSlideSize(
								t,
								this.naturalWidth,
								this.naturalHeight
							),
							e.afterLoad(t)),
							t.timouts &&
								(clearTimeout(t.timouts), (t.timouts = null)),
							e.isClosing ||
								(t.opts.srcset &&
									((n = t.opts.sizes),
									(n && 'auto' !== n) ||
										(n =
											(t.width / t.height > 1 &&
											s.width() / s.height() > 1
												? '100'
												: Math.round(
														(t.width / t.height) *
															100
												  )) + 'vw'),
									o
										.attr('sizes', n)
										.attr('srcset', t.opts.srcset)),
								t.$ghost &&
									setTimeout(function () {
										t.$ghost &&
											!e.isClosing &&
											t.$ghost.hide()
									}, Math.min(
										300,
										Math.max(1e3, t.height / 1600)
									)),
								e.hideLoading(t))
					})
					.addClass('fancybox-image')
					.attr('src', t.src)
					.appendTo(t.$content)),
					(o[0].complete || 'complete' == o[0].readyState) &&
					o[0].naturalWidth &&
					o[0].naturalHeight
						? o.trigger('load')
						: o[0].error && o.trigger('error')
			},
			resolveImageSlideSize: function (t, e, n) {
				var o = parseInt(t.opts.width, 10),
					i = parseInt(t.opts.height, 10)
				;(t.width = e),
					(t.height = n),
					o > 0 &&
						((t.width = o), (t.height = Math.floor((o * n) / e))),
					i > 0 &&
						((t.width = Math.floor((i * e) / n)), (t.height = i))
			},
			setIframe: function (t) {
				var e,
					i = this,
					a = t.opts.iframe,
					s = t.$slide
				;(t.$content = n(
					'<div class="fancybox-content' +
						(a.preload ? ' fancybox-is-hidden' : '') +
						'"></div>'
				)
					.css(a.css)
					.appendTo(s)),
					s.addClass('fancybox-slide--' + t.contentType),
					(t.$iframe = e =
						n(a.tpl.replace(/\{rnd\}/g, new Date().getTime()))
							.attr(a.attr)
							.appendTo(t.$content)),
					a.preload
						? (i.showLoading(t),
						  e.on('load.fb error.fb', function (e) {
								;(this.isReady = 1),
									t.$slide.trigger('refresh'),
									i.afterLoad(t)
						  }),
						  s.on('refresh.fb', function () {
								var n,
									i,
									s = t.$content,
									r = a.css.width,
									c = a.css.height
								if (1 === e[0].isReady) {
									try {
										;(n = e.contents()),
											(i = n.find('body'))
									} catch (t) {}
									i &&
										i.length &&
										i.children().length &&
										(s.css({ width: '', height: '' }),
										r === o &&
											(r = Math.ceil(
												Math.max(
													i[0].clientWidth,
													i.outerWidth(!0)
												)
											)),
										r && s.width(r),
										c === o &&
											(c = Math.ceil(
												Math.max(
													i[0].clientHeight,
													i.outerHeight(!0)
												)
											)),
										c && s.height(c)),
										s.removeClass('fancybox-is-hidden')
								}
						  }))
						: this.afterLoad(t),
					e.attr('src', t.src),
					s.one('onReset', function () {
						try {
							n(this)
								.find('iframe')
								.hide()
								.unbind()
								.attr('src', '//about:blank')
						} catch (t) {}
						n(this).off('refresh.fb').empty(), (t.isLoaded = !1)
					})
			},
			setContent: function (t, e) {
				var o = this
				o.isClosing ||
					(o.hideLoading(t),
					t.$content && n.fancybox.stop(t.$content),
					t.$slide.empty(),
					l(e) && e.parent().length
						? (e
								.parent()
								.parent('.fancybox-slide--inline')
								.trigger('onReset'),
						  (t.$placeholder = n('<div>').hide().insertAfter(e)),
						  e.css('display', 'inline-block'))
						: t.hasError ||
						  ('string' === n.type(e) &&
								((e = n('<div>').append(n.trim(e)).contents()),
								3 === e[0].nodeType &&
									(e = n('<div>').html(e))),
						  t.opts.filter &&
								(e = n('<div>').html(e).find(t.opts.filter))),
					t.$slide.one('onReset', function () {
						n(this).find('video,audio').trigger('pause'),
							t.$placeholder &&
								(t.$placeholder.after(e.hide()).remove(),
								(t.$placeholder = null)),
							t.$smallBtn &&
								(t.$smallBtn.remove(), (t.$smallBtn = null)),
							t.hasError || (n(this).empty(), (t.isLoaded = !1))
					}),
					n(e).appendTo(t.$slide),
					n(e).is('video,audio') &&
						(n(e).addClass('fancybox-video'),
						n(e).wrap('<div></div>'),
						(t.contentType = 'video'),
						(t.opts.width = t.opts.width || n(e).attr('width')),
						(t.opts.height = t.opts.height || n(e).attr('height'))),
					(t.$content = t.$slide
						.children()
						.filter('div,form,main,video,audio')
						.first()
						.addClass('fancybox-content')),
					t.$slide.addClass('fancybox-slide--' + t.contentType),
					this.afterLoad(t))
			},
			setError: function (t) {
				;(t.hasError = !0),
					t.$slide
						.trigger('onReset')
						.removeClass('fancybox-slide--' + t.contentType)
						.addClass('fancybox-slide--error'),
					(t.contentType = 'html'),
					this.setContent(t, this.translate(t, t.opts.errorTpl)),
					t.pos === this.currPos && (this.isAnimating = !1)
			},
			showLoading: function (t) {
				var e = this
				;(t = t || e.current),
					t &&
						!t.$spinner &&
						(t.$spinner = n(
							e.translate(e, e.opts.spinnerTpl)
						).appendTo(t.$slide))
			},
			hideLoading: function (t) {
				var e = this
				;(t = t || e.current),
					t && t.$spinner && (t.$spinner.remove(), delete t.$spinner)
			},
			afterLoad: function (t) {
				var e = this
				e.isClosing ||
					((t.isLoading = !1),
					(t.isLoaded = !0),
					e.trigger('afterLoad', t),
					e.hideLoading(t),
					t.pos === e.currPos && e.updateCursor(),
					!t.opts.smallBtn ||
						(t.$smallBtn && t.$smallBtn.length) ||
						(t.$smallBtn = n(
							e.translate(t, t.opts.btnTpl.smallBtn)
						).prependTo(t.$content)),
					t.opts.protect &&
						t.$content &&
						!t.hasError &&
						(t.$content.on('contextmenu.fb', function (t) {
							return 2 == t.button && t.preventDefault(), !0
						}),
						'image' === t.type &&
							n(
								'<div class="fancybox-spaceball"></div>'
							).appendTo(t.$content)),
					e.revealContent(t))
			},
			revealContent: function (t) {
				var e,
					i,
					a,
					s,
					r = this,
					c = t.$slide,
					l = !1,
					d = !1
				return (
					(e =
						t.opts[
							r.firstRun ? 'animationEffect' : 'transitionEffect'
						]),
					(a =
						t.opts[
							r.firstRun
								? 'animationDuration'
								: 'transitionDuration'
						]),
					(a = parseInt(
						t.forcedDuration === o ? a : t.forcedDuration,
						10
					)),
					t.pos === r.currPos &&
						(t.isComplete ? (e = !1) : (r.isAnimating = !0)),
					(!t.isMoved && t.pos === r.currPos && a) || (e = !1),
					'zoom' === e &&
						(t.pos === r.currPos &&
						a &&
						'image' === t.type &&
						!t.hasError &&
						(d = r.getThumbPos(t))
							? (l = r.getFitPos(t))
							: (e = 'fade')),
					'zoom' === e
						? ((l.scaleX = l.width / d.width),
						  (l.scaleY = l.height / d.height),
						  (s = t.opts.zoomOpacity),
						  'auto' == s &&
								(s =
									Math.abs(
										t.width / t.height - d.width / d.height
									) > 0.1),
						  s && ((d.opacity = 0.1), (l.opacity = 1)),
						  n.fancybox.setTranslate(
								t.$content.removeClass('fancybox-is-hidden'),
								d
						  ),
						  f(t.$content),
						  void n.fancybox.animate(
								t.$content,
								l,
								a,
								function () {
									;(r.isAnimating = !1), r.complete()
								}
						  ))
						: (r.updateSlide(t),
						  e
								? (n.fancybox.stop(c),
								  (i =
										'fancybox-animated fancybox-slide--' +
										(t.pos >= r.prevPos
											? 'next'
											: 'previous') +
										' fancybox-fx-' +
										e),
								  c
										.removeAttr('style')
										.removeClass(
											'fancybox-slide--current fancybox-slide--next fancybox-slide--previous'
										)
										.addClass(i),
								  t.$content.removeClass('fancybox-is-hidden'),
								  f(c),
								  void n.fancybox.animate(
										c,
										'fancybox-slide--current',
										a,
										function (e) {
											c
												.removeClass(i)
												.removeAttr('style'),
												t.pos === r.currPos &&
													r.complete()
										},
										!0
								  ))
								: (f(c),
								  t.$content.removeClass('fancybox-is-hidden'),
								  void (t.pos === r.currPos && r.complete())))
				)
			},
			getThumbPos: function (o) {
				var i,
					a = this,
					s = !1,
					r = o.opts.$thumb,
					c =
						r && r.length && r[0].ownerDocument === e
							? r.offset()
							: 0,
					l = function (e) {
						for (
							var o,
								i = e[0],
								a = i.getBoundingClientRect(),
								s = [];
							null !== i.parentElement;

						)
							('hidden' !== n(i.parentElement).css('overflow') &&
								'auto' !==
									n(i.parentElement).css('overflow')) ||
								s.push(i.parentElement.getBoundingClientRect()),
								(i = i.parentElement)
						return (
							(o = s.every(function (t) {
								var e =
										Math.min(a.right, t.right) -
										Math.max(a.left, t.left),
									n =
										Math.min(a.bottom, t.bottom) -
										Math.max(a.top, t.top)
								return e > 0 && n > 0
							})),
							o &&
								a.bottom > 0 &&
								a.right > 0 &&
								a.left < n(t).width() &&
								a.top < n(t).height()
						)
					}
				return (
					c &&
						l(r) &&
						((i = a.$refs.stage.offset()),
						(s = {
							top:
								c.top -
								i.top +
								parseFloat(r.css('border-top-width') || 0),
							left:
								c.left -
								i.left +
								parseFloat(r.css('border-left-width') || 0),
							width: r.width(),
							height: r.height(),
							scaleX: 1,
							scaleY: 1,
						})),
					s
				)
			},
			complete: function () {
				var t = this,
					o = t.current,
					i = {}
				!o.isMoved &&
					o.isLoaded &&
					(o.isComplete ||
						((o.isComplete = !0),
						o.$slide.siblings().trigger('onReset'),
						t.preload('inline'),
						f(o.$slide),
						o.$slide.addClass('fancybox-slide--complete'),
						n.each(t.slides, function (e, o) {
							o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1
								? (i[o.pos] = o)
								: o &&
								  (n.fancybox.stop(o.$slide),
								  o.$slide.off().remove())
						}),
						(t.slides = i)),
					(t.isAnimating = !1),
					t.updateCursor(),
					t.trigger('afterShow'),
					o.$slide
						.find('video,audio')
						.filter(':visible:first')
						.trigger('play'),
					(n(e.activeElement).is('[disabled]') ||
						(o.opts.autoFocus &&
							'image' != o.type &&
							'iframe' !== o.type)) &&
						t.focus())
			},
			preload: function (t) {
				var e = this,
					n = e.slides[e.currPos + 1],
					o = e.slides[e.currPos - 1]
				n && n.type === t && e.loadSlide(n),
					o && o.type === t && e.loadSlide(o)
			},
			focus: function () {
				var t,
					e = this.current
				this.isClosing ||
					(e &&
						e.isComplete &&
						e.$content &&
						((t = e.$content.find(
							'input[autofocus]:enabled:visible:first'
						)),
						t.length ||
							(t = e.$content
								.find('button,:input,[tabindex],a')
								.filter(':enabled:visible:first')),
						(t = t && t.length ? t : e.$content),
						t.trigger('focus')))
			},
			activate: function () {
				var t = this
				n('.fancybox-container').each(function () {
					var e = n(this).data('FancyBox')
					e &&
						e.id !== t.id &&
						!e.isClosing &&
						(e.trigger('onDeactivate'),
						e.removeEvents(),
						(e.isVisible = !1))
				}),
					(t.isVisible = !0),
					(t.current || t.isIdle) && (t.update(), t.updateControls()),
					t.trigger('onActivate'),
					t.addEvents()
			},
			close: function (t, e) {
				var o,
					i,
					a,
					s,
					r,
					c,
					l,
					p = this,
					h = p.current,
					g = function () {
						p.cleanUp(t)
					}
				return (
					!p.isClosing &&
					((p.isClosing = !0),
					p.trigger('beforeClose', t) === !1
						? ((p.isClosing = !1),
						  d(function () {
								p.update()
						  }),
						  !1)
						: (p.removeEvents(),
						  h.timouts && clearTimeout(h.timouts),
						  (a = h.$content),
						  (o = h.opts.animationEffect),
						  (i = n.isNumeric(e)
								? e
								: o
								? h.opts.animationDuration
								: 0),
						  h.$slide
								.off(u)
								.removeClass(
									'fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated'
								),
						  h.$slide.siblings().trigger('onReset').remove(),
						  i &&
								p.$refs.container
									.removeClass('fancybox-is-open')
									.addClass('fancybox-is-closing'),
						  p.hideLoading(h),
						  p.hideControls(),
						  p.updateCursor(),
						  'zoom' !== o ||
								(t !== !0 &&
									a &&
									i &&
									'image' === h.type &&
									!h.hasError &&
									(l = p.getThumbPos(h))) ||
								(o = 'fade'),
						  'zoom' === o
								? (n.fancybox.stop(a),
								  (s = n.fancybox.getTranslate(a)),
								  (c = {
										top: s.top,
										left: s.left,
										scaleX: s.width / l.width,
										scaleY: s.height / l.height,
										width: l.width,
										height: l.height,
								  }),
								  (r = h.opts.zoomOpacity),
								  'auto' == r &&
										(r =
											Math.abs(
												h.width / h.height -
													l.width / l.height
											) > 0.1),
								  r && (l.opacity = 0),
								  n.fancybox.setTranslate(a, c),
								  f(a),
								  n.fancybox.animate(a, l, i, g),
								  !0)
								: (o && i
										? t === !0
											? setTimeout(g, i)
											: n.fancybox.animate(
													h.$slide.removeClass(
														'fancybox-slide--current'
													),
													'fancybox-animated fancybox-slide--previous fancybox-fx-' +
														o,
													i,
													g
											  )
										: g(),
								  !0)))
				)
			},
			cleanUp: function (t) {
				var e,
					o = this,
					i = n('body')
				o.current.$slide.trigger('onReset'),
					o.$refs.container.empty().remove(),
					o.trigger('afterClose', t),
					o.$lastFocus &&
						o.current.opts.backFocus &&
						o.$lastFocus.trigger('focus'),
					(o.current = null),
					(e = n.fancybox.getInstance()),
					e
						? e.activate()
						: (i.removeClass(
								'fancybox-active compensate-for-scrollbar'
						  ),
						  n('#fancybox-style-noscroll').remove())
			},
			trigger: function (t, e) {
				var o,
					i = Array.prototype.slice.call(arguments, 1),
					a = this,
					s = e && e.opts ? e : a.current
				return (
					s ? i.unshift(s) : (s = a),
					i.unshift(a),
					n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)),
					o === !1
						? o
						: void ('afterClose' !== t && a.$refs
								? a.$refs.container.trigger(t + '.fb', i)
								: r.trigger(t + '.fb', i))
				)
			},
			updateControls: function (t) {
				var e = this,
					n = e.current,
					o = n.index,
					i = n.opts.caption,
					a = e.$refs.container,
					s = e.$refs.caption
				n.$slide.trigger('refresh'),
					(e.$caption = i && i.length ? s.html(i) : null),
					e.isHiddenControls || e.isIdle || e.showControls(),
					a.find('[data-fancybox-count]').html(e.group.length),
					a.find('[data-fancybox-index]').html(o + 1),
					a
						.find('[data-fancybox-prev]')
						.toggleClass('disabled', !n.opts.loop && o <= 0),
					a
						.find('[data-fancybox-next]')
						.toggleClass(
							'disabled',
							!n.opts.loop && o >= e.group.length - 1
						),
					'image' === n.type
						? a
								.find('[data-fancybox-zoom]')
								.show()
								.end()
								.find('[data-fancybox-download]')
								.attr('href', n.opts.image.src || n.src)
								.show()
						: n.opts.toolbar &&
						  a
								.find(
									'[data-fancybox-download],[data-fancybox-zoom]'
								)
								.hide()
			},
			hideControls: function () {
				;(this.isHiddenControls = !0),
					this.$refs.container.removeClass(
						'fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav'
					)
			},
			showControls: function () {
				var t = this,
					e = t.current ? t.current.opts : t.opts,
					n = t.$refs.container
				;(t.isHiddenControls = !1),
					(t.idleSecondsCounter = 0),
					n
						.toggleClass(
							'fancybox-show-toolbar',
							!(!e.toolbar || !e.buttons)
						)
						.toggleClass(
							'fancybox-show-infobar',
							!!(e.infobar && t.group.length > 1)
						)
						.toggleClass(
							'fancybox-show-nav',
							!!(e.arrows && t.group.length > 1)
						)
						.toggleClass('fancybox-is-modal', !!e.modal),
					t.$caption
						? n.addClass('fancybox-show-caption ')
						: n.removeClass('fancybox-show-caption')
			},
			toggleControls: function () {
				this.isHiddenControls
					? this.showControls()
					: this.hideControls()
			},
		}),
			(n.fancybox = {
				version: '3.3.5',
				defaults: a,
				getInstance: function (t) {
					var e = n(
							'.fancybox-container:not(".fancybox-is-closing"):last'
						).data('FancyBox'),
						o = Array.prototype.slice.call(arguments, 1)
					return (
						e instanceof h &&
						('string' === n.type(t)
							? e[t].apply(e, o)
							: 'function' === n.type(t) && t.apply(e, o),
						e)
					)
				},
				open: function (t, e, n) {
					return new h(t, e, n)
				},
				close: function (t) {
					var e = this.getInstance()
					e && (e.close(), t === !0 && this.close())
				},
				destroy: function () {
					this.close(!0), r.add('body').off('click.fb-start', '**')
				},
				isMobile:
					e.createTouch !== o &&
					/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
						navigator.userAgent
					),
				use3d: (function () {
					var n = e.createElement('div')
					return (
						t.getComputedStyle &&
						t.getComputedStyle(n) &&
						t.getComputedStyle(n).getPropertyValue('transform') &&
						!(e.documentMode && e.documentMode < 11)
					)
				})(),
				getTranslate: function (t) {
					var e
					return (
						!(!t || !t.length) &&
						((e = t[0].getBoundingClientRect()),
						{
							top: e.top || 0,
							left: e.left || 0,
							width: e.width,
							height: e.height,
							opacity: parseFloat(t.css('opacity')),
						})
					)
				},
				setTranslate: function (t, e) {
					var n = '',
						i = {}
					if (t && e)
						return (
							(e.left === o && e.top === o) ||
								((n =
									(e.left === o
										? t.position().left
										: e.left) +
									'px, ' +
									(e.top === o ? t.position().top : e.top) +
									'px'),
								(n = this.use3d
									? 'translate3d(' + n + ', 0px)'
									: 'translate(' + n + ')')),
							e.scaleX !== o &&
								e.scaleY !== o &&
								(n =
									(n.length ? n + ' ' : '') +
									'scale(' +
									e.scaleX +
									', ' +
									e.scaleY +
									')'),
							n.length && (i.transform = n),
							e.opacity !== o && (i.opacity = e.opacity),
							e.width !== o && (i.width = e.width),
							e.height !== o && (i.height = e.height),
							t.css(i)
						)
				},
				animate: function (t, e, i, a, s) {
					var r = !1
					n.isFunction(i) && ((a = i), (i = null)),
						n.isPlainObject(e) || t.removeAttr('style'),
						n.fancybox.stop(t),
						t.on(u, function (o) {
							;(!o ||
								!o.originalEvent ||
								(t.is(o.originalEvent.target) &&
									'z-index' !=
										o.originalEvent.propertyName)) &&
								(n.fancybox.stop(t),
								r && n.fancybox.setTranslate(t, r),
								n.isPlainObject(e)
									? s === !1 && t.removeAttr('style')
									: s !== !0 && t.removeClass(e),
								n.isFunction(a) && a(o))
						}),
						n.isNumeric(i) &&
							t.css('transition-duration', i + 'ms'),
						n.isPlainObject(e)
							? (e.scaleX !== o &&
									e.scaleY !== o &&
									((r = n.extend({}, e, {
										width: t.width() * e.scaleX,
										height: t.height() * e.scaleY,
										scaleX: 1,
										scaleY: 1,
									})),
									delete e.width,
									delete e.height,
									t
										.parent()
										.hasClass('fancybox-slide--image') &&
										t
											.parent()
											.addClass('fancybox-is-scaling')),
							  n.fancybox.setTranslate(t, e))
							: t.addClass(e),
						t.data(
							'timer',
							setTimeout(function () {
								t.trigger('transitionend')
							}, i + 16)
						)
				},
				stop: function (t) {
					t &&
						t.length &&
						(clearTimeout(t.data('timer')),
						t.off('transitionend').css('transition-duration', ''),
						t.parent().removeClass('fancybox-is-scaling'))
				},
			}),
			(n.fn.fancybox = function (t) {
				var e
				return (
					(t = t || {}),
					(e = t.selector || !1),
					e
						? n('body')
								.off('click.fb-start', e)
								.on('click.fb-start', e, { options: t }, i)
						: this.off('click.fb-start').on(
								'click.fb-start',
								{ items: this, options: t },
								i
						  ),
					this
				)
			}),
			r.on('click.fb-start', '[data-fancybox]', i),
			r.on('click.fb-start', '[data-trigger]', function (t) {
				i(t, {
					$target: n(
						'[data-fancybox="' +
							n(t.currentTarget).attr('data-trigger') +
							'"]'
					).eq(n(t.currentTarget).attr('data-index') || 0),
					$trigger: n(this),
				})
			})
	}
})(window, document, window.jQuery || jQuery),
	(function (t) {
		'use strict'
		var e = function (e, n, o) {
				if (e)
					return (
						(o = o || ''),
						'object' === t.type(o) && (o = t.param(o, !0)),
						t.each(n, function (t, n) {
							e = e.replace('$' + t, n || '')
						}),
						o.length && (e += (e.indexOf('?') > 0 ? '&' : '?') + o),
						e
					)
			},
			n = {
				youtube: {
					matcher:
						/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
					params: {
						autoplay: 1,
						autohide: 1,
						fs: 1,
						rel: 0,
						hd: 1,
						wmode: 'transparent',
						enablejsapi: 1,
						html5: 1,
					},
					paramPlace: 8,
					type: 'iframe',
					url: '//www.youtube.com/embed/$4',
					thumb: '//img.youtube.com/vi/$4/hqdefault.jpg',
				},
				vimeo: {
					matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
					params: {
						autoplay: 1,
						hd: 1,
						show_title: 1,
						show_byline: 1,
						show_portrait: 0,
						fullscreen: 1,
						api: 1,
					},
					paramPlace: 3,
					type: 'iframe',
					url: '//player.vimeo.com/video/$2',
				},
				instagram: {
					matcher:
						/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
					type: 'image',
					url: '//$1/p/$2/media/?size=l',
				},
				gmap_place: {
					matcher:
						/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
					type: 'iframe',
					url: function (t) {
						return (
							'//maps.google.' +
							t[2] +
							'/?ll=' +
							(t[9]
								? t[9] +
								  '&z=' +
								  Math.floor(t[10]) +
								  (t[12] ? t[12].replace(/^\//, '&') : '')
								: t[12] + ''
							).replace(/\?/, '&') +
							'&output=' +
							(t[12] && t[12].indexOf('layer=c') > 0
								? 'svembed'
								: 'embed')
						)
					},
				},
				gmap_search: {
					matcher:
						/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
					type: 'iframe',
					url: function (t) {
						return (
							'//maps.google.' +
							t[2] +
							'/maps?q=' +
							t[5].replace('query=', 'q=').replace('api=1', '') +
							'&output=embed'
						)
					},
				},
			}
		t(document).on('objectNeedsType.fb', function (o, i, a) {
			var s,
				r,
				c,
				l,
				d,
				u,
				f,
				p = a.src || '',
				h = !1
			;(s = t.extend(!0, {}, n, a.opts.media)),
				t.each(s, function (n, o) {
					if ((c = p.match(o.matcher))) {
						if (
							((h = o.type),
							(f = n),
							(u = {}),
							o.paramPlace && c[o.paramPlace])
						) {
							;(d = c[o.paramPlace]),
								'?' == d[0] && (d = d.substring(1)),
								(d = d.split('&'))
							for (var i = 0; i < d.length; ++i) {
								var s = d[i].split('=', 2)
								2 == s.length &&
									(u[s[0]] = decodeURIComponent(
										s[1].replace(/\+/g, ' ')
									))
							}
						}
						return (
							(l = t.extend(!0, {}, o.params, a.opts[n], u)),
							(p =
								'function' === t.type(o.url)
									? o.url.call(this, c, l, a)
									: e(o.url, c, l)),
							(r =
								'function' === t.type(o.thumb)
									? o.thumb.call(this, c, l, a)
									: e(o.thumb, c)),
							'youtube' === n
								? (p = p.replace(
										/&t=((\d+)m)?(\d+)s/,
										function (t, e, n, o) {
											return (
												'&start=' +
												((n
													? 60 * parseInt(n, 10)
													: 0) +
													parseInt(o, 10))
											)
										}
								  ))
								: 'vimeo' === n && (p = p.replace('&%23', '#')),
							!1
						)
					}
				}),
				h
					? (a.opts.thumb ||
							(a.opts.$thumb && a.opts.$thumb.length) ||
							(a.opts.thumb = r),
					  'iframe' === h &&
							(a.opts = t.extend(!0, a.opts, {
								iframe: {
									preload: !1,
									attr: { scrolling: 'no' },
								},
							})),
					  t.extend(a, {
							type: h,
							src: p,
							origSrc: a.src,
							contentSource: f,
							contentType:
								'image' === h
									? 'image'
									: 'gmap_place' == f || 'gmap_search' == f
									? 'map'
									: 'video',
					  }))
					: p && (a.type = a.opts.defaultType)
		})
	})(window.jQuery || jQuery),
	(function (t, e, n) {
		'use strict'
		var o = (function () {
				return (
					t.requestAnimationFrame ||
					t.webkitRequestAnimationFrame ||
					t.mozRequestAnimationFrame ||
					t.oRequestAnimationFrame ||
					function (e) {
						return t.setTimeout(e, 1e3 / 60)
					}
				)
			})(),
			i = (function () {
				return (
					t.cancelAnimationFrame ||
					t.webkitCancelAnimationFrame ||
					t.mozCancelAnimationFrame ||
					t.oCancelAnimationFrame ||
					function (e) {
						t.clearTimeout(e)
					}
				)
			})(),
			a = function (e) {
				var n = []
				;(e = e.originalEvent || e || t.e),
					(e =
						e.touches && e.touches.length
							? e.touches
							: e.changedTouches && e.changedTouches.length
							? e.changedTouches
							: [e])
				for (var o in e)
					e[o].pageX
						? n.push({ x: e[o].pageX, y: e[o].pageY })
						: e[o].clientX &&
						  n.push({ x: e[o].clientX, y: e[o].clientY })
				return n
			},
			s = function (t, e, n) {
				return e && t
					? 'x' === n
						? t.x - e.x
						: 'y' === n
						? t.y - e.y
						: Math.sqrt(
								Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)
						  )
					: 0
			},
			r = function (t) {
				if (
					t.is(
						'a,area,button,[role="button"],input,label,select,summary,textarea,video,audio'
					) ||
					n.isFunction(t.get(0).onclick) ||
					t.data('selectable')
				)
					return !0
				for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
					if ('data-fancybox-' === o[e].nodeName.substr(0, 14))
						return !0
				return !1
			},
			c = function (e) {
				var n = t.getComputedStyle(e)['overflow-y'],
					o = t.getComputedStyle(e)['overflow-x'],
					i =
						('scroll' === n || 'auto' === n) &&
						e.scrollHeight > e.clientHeight,
					a =
						('scroll' === o || 'auto' === o) &&
						e.scrollWidth > e.clientWidth
				return i || a
			},
			l = function (t) {
				for (var e = !1; ; ) {
					if ((e = c(t.get(0)))) break
					if (
						((t = t.parent()),
						!t.length ||
							t.hasClass('fancybox-stage') ||
							t.is('body'))
					)
						break
				}
				return e
			},
			d = function (t) {
				var e = this
				;(e.instance = t),
					(e.$bg = t.$refs.bg),
					(e.$stage = t.$refs.stage),
					(e.$container = t.$refs.container),
					e.destroy(),
					e.$container.on(
						'touchstart.fb.touch mousedown.fb.touch',
						n.proxy(e, 'ontouchstart')
					)
			}
		;(d.prototype.destroy = function () {
			this.$container.off('.fb.touch')
		}),
			(d.prototype.ontouchstart = function (o) {
				var i = this,
					c = n(o.target),
					d = i.instance,
					u = d.current,
					f = u.$content,
					p = 'touchstart' == o.type
				if (
					(p && i.$container.off('mousedown.fb.touch'),
					(!o.originalEvent || 2 != o.originalEvent.button) &&
						c.length &&
						!r(c) &&
						!r(c.parent()) &&
						(c.is('img') ||
							!(
								o.originalEvent.clientX >
								c[0].clientWidth + c.offset().left
							)))
				) {
					if (!u || d.isAnimating || d.isClosing)
						return o.stopPropagation(), void o.preventDefault()
					if (
						((i.realPoints = i.startPoints = a(o)),
						i.startPoints.length)
					) {
						if (
							(o.stopPropagation(),
							(i.startEvent = o),
							(i.canTap = !0),
							(i.$target = c),
							(i.$content = f),
							(i.opts = u.opts.touch),
							(i.isPanning = !1),
							(i.isSwiping = !1),
							(i.isZooming = !1),
							(i.isScrolling = !1),
							(i.startTime = new Date().getTime()),
							(i.distanceX = i.distanceY = i.distance = 0),
							(i.canvasWidth = Math.round(
								u.$slide[0].clientWidth
							)),
							(i.canvasHeight = Math.round(
								u.$slide[0].clientHeight
							)),
							(i.contentLastPos = null),
							(i.contentStartPos = n.fancybox.getTranslate(
								i.$content
							) || { top: 0, left: 0 }),
							(i.sliderStartPos =
								i.sliderLastPos ||
								n.fancybox.getTranslate(u.$slide)),
							(i.stagePos = n.fancybox.getTranslate(
								d.$refs.stage
							)),
							(i.sliderStartPos.top -= i.stagePos.top),
							(i.sliderStartPos.left -= i.stagePos.left),
							(i.contentStartPos.top -= i.stagePos.top),
							(i.contentStartPos.left -= i.stagePos.left),
							n(e)
								.off('.fb.touch')
								.on(
									p
										? 'touchend.fb.touch touchcancel.fb.touch'
										: 'mouseup.fb.touch mouseleave.fb.touch',
									n.proxy(i, 'ontouchend')
								)
								.on(
									p
										? 'touchmove.fb.touch'
										: 'mousemove.fb.touch',
									n.proxy(i, 'ontouchmove')
								),
							n.fancybox.isMobile &&
								e.addEventListener('scroll', i.onscroll, !0),
							(!i.opts && !d.canPan()) ||
								(!c.is(i.$stage) && !i.$stage.find(c).length))
						)
							return void (
								c.is('.fancybox-image') && o.preventDefault()
							)
						;(n.fancybox.isMobile && (l(c) || l(c.parent()))) ||
							o.preventDefault(),
							(1 === i.startPoints.length || u.hasError) &&
								(i.instance.canPan()
									? (n.fancybox.stop(i.$content),
									  i.$content.css('transition-duration', ''),
									  (i.isPanning = !0))
									: (i.isSwiping = !0),
								i.$container.addClass(
									'fancybox-controls--isGrabbing'
								)),
							2 === i.startPoints.length &&
								'image' === u.type &&
								(u.isLoaded || u.$ghost) &&
								((i.canTap = !1),
								(i.isSwiping = !1),
								(i.isPanning = !1),
								(i.isZooming = !0),
								n.fancybox.stop(i.$content),
								i.$content.css('transition-duration', ''),
								(i.centerPointStartX =
									0.5 *
										(i.startPoints[0].x +
											i.startPoints[1].x) -
									n(t).scrollLeft()),
								(i.centerPointStartY =
									0.5 *
										(i.startPoints[0].y +
											i.startPoints[1].y) -
									n(t).scrollTop()),
								(i.percentageOfImageAtPinchPointX =
									(i.centerPointStartX -
										i.contentStartPos.left) /
									i.contentStartPos.width),
								(i.percentageOfImageAtPinchPointY =
									(i.centerPointStartY -
										i.contentStartPos.top) /
									i.contentStartPos.height),
								(i.startDistanceBetweenFingers = s(
									i.startPoints[0],
									i.startPoints[1]
								)))
					}
				}
			}),
			(d.prototype.onscroll = function (t) {
				var n = this
				;(n.isScrolling = !0),
					e.removeEventListener('scroll', n.onscroll, !0)
			}),
			(d.prototype.ontouchmove = function (t) {
				var e = this,
					o = n(t.target)
				return void 0 !== t.originalEvent.buttons &&
					0 === t.originalEvent.buttons
					? void e.ontouchend(t)
					: e.isScrolling ||
					  (!o.is(e.$stage) && !e.$stage.find(o).length)
					? void (e.canTap = !1)
					: ((e.newPoints = a(t)),
					  void (
							(e.opts || e.instance.canPan()) &&
							e.newPoints.length &&
							e.newPoints.length &&
							((e.isSwiping && e.isSwiping === !0) ||
								t.preventDefault(),
							(e.distanceX = s(
								e.newPoints[0],
								e.startPoints[0],
								'x'
							)),
							(e.distanceY = s(
								e.newPoints[0],
								e.startPoints[0],
								'y'
							)),
							(e.distance = s(e.newPoints[0], e.startPoints[0])),
							e.distance > 0 &&
								(e.isSwiping
									? e.onSwipe(t)
									: e.isPanning
									? e.onPan()
									: e.isZooming && e.onZoom()))
					  ))
			}),
			(d.prototype.onSwipe = function (e) {
				var a,
					s = this,
					r = s.isSwiping,
					c = s.sliderStartPos.left || 0
				if (r !== !0)
					'x' == r &&
						(s.distanceX > 0 &&
						(s.instance.group.length < 2 ||
							(0 === s.instance.current.index &&
								!s.instance.current.opts.loop))
							? (c += Math.pow(s.distanceX, 0.8))
							: s.distanceX < 0 &&
							  (s.instance.group.length < 2 ||
									(s.instance.current.index ===
										s.instance.group.length - 1 &&
										!s.instance.current.opts.loop))
							? (c -= Math.pow(-s.distanceX, 0.8))
							: (c += s.distanceX)),
						(s.sliderLastPos = {
							top:
								'x' == r
									? 0
									: s.sliderStartPos.top + s.distanceY,
							left: c,
						}),
						s.requestId && (i(s.requestId), (s.requestId = null)),
						(s.requestId = o(function () {
							s.sliderLastPos &&
								(n.each(s.instance.slides, function (t, e) {
									var o = e.pos - s.instance.currPos
									n.fancybox.setTranslate(e.$slide, {
										top: s.sliderLastPos.top,
										left:
											s.sliderLastPos.left +
											o * s.canvasWidth +
											o * e.opts.gutter,
									})
								}),
								s.$container.addClass('fancybox-is-sliding'))
						}))
				else if (Math.abs(s.distance) > 10) {
					if (
						((s.canTap = !1),
						s.instance.group.length < 2 && s.opts.vertical
							? (s.isSwiping = 'y')
							: s.instance.isDragging ||
							  s.opts.vertical === !1 ||
							  ('auto' === s.opts.vertical && n(t).width() > 800)
							? (s.isSwiping = 'x')
							: ((a = Math.abs(
									(180 *
										Math.atan2(s.distanceY, s.distanceX)) /
										Math.PI
							  )),
							  (s.isSwiping = a > 45 && a < 135 ? 'y' : 'x')),
						(s.canTap = !1),
						'y' === s.isSwiping &&
							n.fancybox.isMobile &&
							(l(s.$target) || l(s.$target.parent())))
					)
						return void (s.isScrolling = !0)
					;(s.instance.isDragging = s.isSwiping),
						(s.startPoints = s.newPoints),
						n.each(s.instance.slides, function (t, e) {
							n.fancybox.stop(e.$slide),
								e.$slide.css('transition-duration', ''),
								(e.inTransition = !1),
								e.pos === s.instance.current.pos &&
									(s.sliderStartPos.left =
										n.fancybox.getTranslate(e.$slide).left -
										n.fancybox.getTranslate(
											s.instance.$refs.stage
										).left)
						}),
						s.instance.SlideShow &&
							s.instance.SlideShow.isActive &&
							s.instance.SlideShow.stop()
				}
			}),
			(d.prototype.onPan = function () {
				var t = this
				return s(t.newPoints[0], t.realPoints[0]) <
					(n.fancybox.isMobile ? 10 : 5)
					? void (t.startPoints = t.newPoints)
					: ((t.canTap = !1),
					  (t.contentLastPos = t.limitMovement()),
					  t.requestId && (i(t.requestId), (t.requestId = null)),
					  void (t.requestId = o(function () {
							n.fancybox.setTranslate(
								t.$content,
								t.contentLastPos
							)
					  })))
			}),
			(d.prototype.limitMovement = function () {
				var t,
					e,
					n,
					o,
					i,
					a,
					s = this,
					r = s.canvasWidth,
					c = s.canvasHeight,
					l = s.distanceX,
					d = s.distanceY,
					u = s.contentStartPos,
					f = u.left,
					p = u.top,
					h = u.width,
					g = u.height
				return (
					(i = h > r ? f + l : f),
					(a = p + d),
					(t = Math.max(0, 0.5 * r - 0.5 * h)),
					(e = Math.max(0, 0.5 * c - 0.5 * g)),
					(n = Math.min(r - h, 0.5 * r - 0.5 * h)),
					(o = Math.min(c - g, 0.5 * c - 0.5 * g)),
					l > 0 &&
						i > t &&
						(i = t - 1 + Math.pow(-t + f + l, 0.8) || 0),
					l < 0 &&
						i < n &&
						(i = n + 1 - Math.pow(n - f - l, 0.8) || 0),
					d > 0 &&
						a > e &&
						(a = e - 1 + Math.pow(-e + p + d, 0.8) || 0),
					d < 0 &&
						a < o &&
						(a = o + 1 - Math.pow(o - p - d, 0.8) || 0),
					{ top: a, left: i }
				)
			}),
			(d.prototype.limitPosition = function (t, e, n, o) {
				var i = this,
					a = i.canvasWidth,
					s = i.canvasHeight
				return (
					n > a
						? ((t = t > 0 ? 0 : t), (t = t < a - n ? a - n : t))
						: (t = Math.max(0, a / 2 - n / 2)),
					o > s
						? ((e = e > 0 ? 0 : e), (e = e < s - o ? s - o : e))
						: (e = Math.max(0, s / 2 - o / 2)),
					{ top: e, left: t }
				)
			}),
			(d.prototype.onZoom = function () {
				var e = this,
					a = e.contentStartPos,
					r = a.width,
					c = a.height,
					l = a.left,
					d = a.top,
					u = s(e.newPoints[0], e.newPoints[1]),
					f = u / e.startDistanceBetweenFingers,
					p = Math.floor(r * f),
					h = Math.floor(c * f),
					g = (r - p) * e.percentageOfImageAtPinchPointX,
					b = (c - h) * e.percentageOfImageAtPinchPointY,
					m =
						(e.newPoints[0].x + e.newPoints[1].x) / 2 -
						n(t).scrollLeft(),
					y =
						(e.newPoints[0].y + e.newPoints[1].y) / 2 -
						n(t).scrollTop(),
					v = m - e.centerPointStartX,
					x = y - e.centerPointStartY,
					w = l + (g + v),
					$ = d + (b + x),
					S = { top: $, left: w, scaleX: f, scaleY: f }
				;(e.canTap = !1),
					(e.newWidth = p),
					(e.newHeight = h),
					(e.contentLastPos = S),
					e.requestId && (i(e.requestId), (e.requestId = null)),
					(e.requestId = o(function () {
						n.fancybox.setTranslate(e.$content, e.contentLastPos)
					}))
			}),
			(d.prototype.ontouchend = function (t) {
				var o = this,
					s = Math.max(new Date().getTime() - o.startTime, 1),
					r = o.isSwiping,
					c = o.isPanning,
					l = o.isZooming,
					d = o.isScrolling
				return (
					(o.endPoints = a(t)),
					o.$container.removeClass('fancybox-controls--isGrabbing'),
					n(e).off('.fb.touch'),
					e.removeEventListener('scroll', o.onscroll, !0),
					o.requestId && (i(o.requestId), (o.requestId = null)),
					(o.isSwiping = !1),
					(o.isPanning = !1),
					(o.isZooming = !1),
					(o.isScrolling = !1),
					(o.instance.isDragging = !1),
					o.canTap
						? o.onTap(t)
						: ((o.speed = 366),
						  (o.velocityX = (o.distanceX / s) * 0.5),
						  (o.velocityY = (o.distanceY / s) * 0.5),
						  (o.speedX = Math.max(
								0.5 * o.speed,
								Math.min(
									1.5 * o.speed,
									(1 / Math.abs(o.velocityX)) * o.speed
								)
						  )),
						  void (c
								? o.endPanning()
								: l
								? o.endZooming()
								: o.endSwiping(r, d)))
				)
			}),
			(d.prototype.endSwiping = function (t, e) {
				var o = this,
					i = !1,
					a = o.instance.group.length
				;(o.sliderLastPos = null),
					'y' == t && !e && Math.abs(o.distanceY) > 50
						? (n.fancybox.animate(
								o.instance.current.$slide,
								{
									top:
										o.sliderStartPos.top +
										o.distanceY +
										150 * o.velocityY,
									opacity: 0,
								},
								200
						  ),
						  (i = o.instance.close(!0, 200)))
						: 'x' == t && o.distanceX > 50 && a > 1
						? (i = o.instance.previous(o.speedX))
						: 'x' == t &&
						  o.distanceX < -50 &&
						  a > 1 &&
						  (i = o.instance.next(o.speedX)),
					i !== !1 ||
						('x' != t && 'y' != t) ||
						(e || a < 2
							? o.instance.centerSlide(o.instance.current, 150)
							: o.instance.jumpTo(o.instance.current.index)),
					o.$container.removeClass('fancybox-is-sliding')
			}),
			(d.prototype.endPanning = function () {
				var t,
					e,
					o,
					i = this
				i.contentLastPos &&
					(i.opts.momentum === !1
						? ((t = i.contentLastPos.left),
						  (e = i.contentLastPos.top))
						: ((t = i.contentLastPos.left + i.velocityX * i.speed),
						  (e = i.contentLastPos.top + i.velocityY * i.speed)),
					(o = i.limitPosition(
						t,
						e,
						i.contentStartPos.width,
						i.contentStartPos.height
					)),
					(o.width = i.contentStartPos.width),
					(o.height = i.contentStartPos.height),
					n.fancybox.animate(i.$content, o, 330))
			}),
			(d.prototype.endZooming = function () {
				var t,
					e,
					o,
					i,
					a = this,
					s = a.instance.current,
					r = a.newWidth,
					c = a.newHeight
				a.contentLastPos &&
					((t = a.contentLastPos.left),
					(e = a.contentLastPos.top),
					(i = {
						top: e,
						left: t,
						width: r,
						height: c,
						scaleX: 1,
						scaleY: 1,
					}),
					n.fancybox.setTranslate(a.$content, i),
					r < a.canvasWidth && c < a.canvasHeight
						? a.instance.scaleToFit(150)
						: r > s.width || c > s.height
						? a.instance.scaleToActual(
								a.centerPointStartX,
								a.centerPointStartY,
								150
						  )
						: ((o = a.limitPosition(t, e, r, c)),
						  n.fancybox.setTranslate(
								a.$content,
								n.fancybox.getTranslate(a.$content)
						  ),
						  n.fancybox.animate(a.$content, o, 150)))
			}),
			(d.prototype.onTap = function (e) {
				var o,
					i = this,
					s = n(e.target),
					r = i.instance,
					c = r.current,
					l = (e && a(e)) || i.startPoints,
					d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
					u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
					f = function (t) {
						var o = c.opts[t]
						if ((n.isFunction(o) && (o = o.apply(r, [c, e])), o))
							switch (o) {
								case 'close':
									r.close(i.startEvent)
									break
								case 'toggleControls':
									r.toggleControls(!0)
									break
								case 'next':
									r.next()
									break
								case 'nextOrClose':
									r.group.length > 1
										? r.next()
										: r.close(i.startEvent)
									break
								case 'zoom':
									'image' == c.type &&
										(c.isLoaded || c.$ghost) &&
										(r.canPan()
											? r.scaleToFit()
											: r.isScaledDown()
											? r.scaleToActual(d, u)
											: r.group.length < 2 &&
											  r.close(i.startEvent))
							}
					}
				if (
					(!e.originalEvent || 2 != e.originalEvent.button) &&
					(s.is('img') || !(d > s[0].clientWidth + s.offset().left))
				) {
					if (
						s.is(
							'.fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container'
						)
					)
						o = 'Outside'
					else if (s.is('.fancybox-slide')) o = 'Slide'
					else {
						if (
							!r.current.$content ||
							!r.current.$content.find(s).addBack().filter(s)
								.length
						)
							return
						o = 'Content'
					}
					if (i.tapped) {
						if (
							(clearTimeout(i.tapped),
							(i.tapped = null),
							Math.abs(d - i.tapX) > 50 ||
								Math.abs(u - i.tapY) > 50)
						)
							return this
						f('dblclick' + o)
					} else
						(i.tapX = d),
							(i.tapY = u),
							c.opts['dblclick' + o] &&
							c.opts['dblclick' + o] !== c.opts['click' + o]
								? (i.tapped = setTimeout(function () {
										;(i.tapped = null), f('click' + o)
								  }, 500))
								: f('click' + o)
					return this
				}
			}),
			n(e).on('onActivate.fb', function (t, e) {
				e && !e.Guestures && (e.Guestures = new d(e))
			})
	})(window, document, window.jQuery || jQuery),
	(function (t, e) {
		'use strict'
		e.extend(!0, e.fancybox.defaults, {
			btnTpl: {
				slideShow:
					'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>',
			},
			slideShow: { autoStart: !1, speed: 3e3 },
		})
		var n = function (t) {
			;(this.instance = t), this.init()
		}
		e.extend(n.prototype, {
			timer: null,
			isActive: !1,
			$button: null,
			init: function () {
				var t = this
				;(t.$button = t.instance.$refs.toolbar
					.find('[data-fancybox-play]')
					.on('click', function () {
						t.toggle()
					})),
					(t.instance.group.length < 2 ||
						!t.instance.group[t.instance.currIndex].opts
							.slideShow) &&
						t.$button.hide()
			},
			set: function (t) {
				var e = this
				e.instance &&
				e.instance.current &&
				(t === !0 ||
					e.instance.current.opts.loop ||
					e.instance.currIndex < e.instance.group.length - 1)
					? (e.timer = setTimeout(function () {
							e.isActive &&
								e.instance.jumpTo(
									(e.instance.currIndex + 1) %
										e.instance.group.length
								)
					  }, e.instance.current.opts.slideShow.speed))
					: (e.stop(),
					  (e.instance.idleSecondsCounter = 0),
					  e.instance.showControls())
			},
			clear: function () {
				var t = this
				clearTimeout(t.timer), (t.timer = null)
			},
			start: function () {
				var t = this,
					e = t.instance.current
				e &&
					((t.isActive = !0),
					t.$button
						.attr('title', e.opts.i18n[e.opts.lang].PLAY_STOP)
						.removeClass('fancybox-button--play')
						.addClass('fancybox-button--pause'),
					t.set(!0))
			},
			stop: function () {
				var t = this,
					e = t.instance.current
				t.clear(),
					t.$button
						.attr('title', e.opts.i18n[e.opts.lang].PLAY_START)
						.removeClass('fancybox-button--pause')
						.addClass('fancybox-button--play'),
					(t.isActive = !1)
			},
			toggle: function () {
				var t = this
				t.isActive ? t.stop() : t.start()
			},
		}),
			e(t).on({
				'onInit.fb': function (t, e) {
					e && !e.SlideShow && (e.SlideShow = new n(e))
				},
				'beforeShow.fb': function (t, e, n, o) {
					var i = e && e.SlideShow
					o
						? i && n.opts.slideShow.autoStart && i.start()
						: i && i.isActive && i.clear()
				},
				'afterShow.fb': function (t, e, n) {
					var o = e && e.SlideShow
					o && o.isActive && o.set()
				},
				'afterKeydown.fb': function (n, o, i, a, s) {
					var r = o && o.SlideShow
					!r ||
						!i.opts.slideShow ||
						(80 !== s && 32 !== s) ||
						e(t.activeElement).is('button,a,input') ||
						(a.preventDefault(), r.toggle())
				},
				'beforeClose.fb onDeactivate.fb': function (t, e) {
					var n = e && e.SlideShow
					n && n.stop()
				},
			}),
			e(t).on('visibilitychange', function () {
				var n = e.fancybox.getInstance(),
					o = n && n.SlideShow
				o && o.isActive && (t.hidden ? o.clear() : o.set())
			})
	})(document, window.jQuery || jQuery),
	(function (t, e) {
		'use strict'
		var n = (function () {
			for (
				var e = [
						[
							'requestFullscreen',
							'exitFullscreen',
							'fullscreenElement',
							'fullscreenEnabled',
							'fullscreenchange',
							'fullscreenerror',
						],
						[
							'webkitRequestFullscreen',
							'webkitExitFullscreen',
							'webkitFullscreenElement',
							'webkitFullscreenEnabled',
							'webkitfullscreenchange',
							'webkitfullscreenerror',
						],
						[
							'webkitRequestFullScreen',
							'webkitCancelFullScreen',
							'webkitCurrentFullScreenElement',
							'webkitCancelFullScreen',
							'webkitfullscreenchange',
							'webkitfullscreenerror',
						],
						[
							'mozRequestFullScreen',
							'mozCancelFullScreen',
							'mozFullScreenElement',
							'mozFullScreenEnabled',
							'mozfullscreenchange',
							'mozfullscreenerror',
						],
						[
							'msRequestFullscreen',
							'msExitFullscreen',
							'msFullscreenElement',
							'msFullscreenEnabled',
							'MSFullscreenChange',
							'MSFullscreenError',
						],
					],
					n = {},
					o = 0;
				o < e.length;
				o++
			) {
				var i = e[o]
				if (i && i[1] in t) {
					for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a]
					return n
				}
			}
			return !1
		})()
		if (!n)
			return void (
				e &&
				e.fancybox &&
				(e.fancybox.defaults.btnTpl.fullScreen = !1)
			)
		var o = {
			request: function (e) {
				;(e = e || t.documentElement),
					e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
			},
			exit: function () {
				t[n.exitFullscreen]()
			},
			toggle: function (e) {
				;(e = e || t.documentElement),
					this.isFullscreen() ? this.exit() : this.request(e)
			},
			isFullscreen: function () {
				return Boolean(t[n.fullscreenElement])
			},
			enabled: function () {
				return Boolean(t[n.fullscreenEnabled])
			},
		}
		e.extend(!0, e.fancybox.defaults, {
			btnTpl: {
				fullScreen:
					'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 v16 h22 v-16 h-22 v8" /></svg></button>',
			},
			fullScreen: { autoStart: !1 },
		}),
			e(t).on({
				'onInit.fb': function (t, e) {
					var n
					e && e.group[e.currIndex].opts.fullScreen
						? ((n = e.$refs.container),
						  n.on(
								'click.fb-fullscreen',
								'[data-fancybox-fullscreen]',
								function (t) {
									t.stopPropagation(),
										t.preventDefault(),
										o.toggle()
								}
						  ),
						  e.opts.fullScreen &&
								e.opts.fullScreen.autoStart === !0 &&
								o.request(),
						  (e.FullScreen = o))
						: e &&
						  e.$refs.toolbar
								.find('[data-fancybox-fullscreen]')
								.hide()
				},
				'afterKeydown.fb': function (t, e, n, o, i) {
					e &&
						e.FullScreen &&
						70 === i &&
						(o.preventDefault(), e.FullScreen.toggle())
				},
				'beforeClose.fb': function (t, e) {
					e &&
						e.FullScreen &&
						e.$refs.container.hasClass('fancybox-is-fullscreen') &&
						o.exit()
				},
			}),
			e(t).on(n.fullscreenchange, function () {
				var t = o.isFullscreen(),
					n = e.fancybox.getInstance()
				n &&
					(n.current &&
						'image' === n.current.type &&
						n.isAnimating &&
						(n.current.$content.css('transition', 'none'),
						(n.isAnimating = !1),
						n.update(!0, !0, 0)),
					n.trigger('onFullscreenChange', t),
					n.$refs.container.toggleClass('fancybox-is-fullscreen', t))
			})
	})(document, window.jQuery || jQuery),
	(function (t, e) {
		'use strict'
		var n = 'fancybox-thumbs',
			o = n + '-active',
			i = n + '-loading'
		e.fancybox.defaults = e.extend(
			!0,
			{
				btnTpl: {
					thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>',
				},
				thumbs: {
					autoStart: !1,
					hideOnClose: !0,
					parentEl: '.fancybox-container',
					axis: 'y',
				},
			},
			e.fancybox.defaults
		)
		var a = function (t) {
			this.init(t)
		}
		e.extend(a.prototype, {
			$button: null,
			$grid: null,
			$list: null,
			isVisible: !1,
			isActive: !1,
			init: function (t) {
				var e,
					n,
					o = this
				;(o.instance = t),
					(t.Thumbs = o),
					(o.opts = t.group[t.currIndex].opts.thumbs),
					(e = t.group[0]),
					(e =
						e.opts.thumb ||
						(!(!e.opts.$thumb || !e.opts.$thumb.length) &&
							e.opts.$thumb.attr('src'))),
					t.group.length > 1 &&
						((n = t.group[1]),
						(n =
							n.opts.thumb ||
							(!(!n.opts.$thumb || !n.opts.$thumb.length) &&
								n.opts.$thumb.attr('src')))),
					(o.$button = t.$refs.toolbar.find(
						'[data-fancybox-thumbs]'
					)),
					o.opts && e && n && e && n
						? (o.$button.show().on('click', function () {
								o.toggle()
						  }),
						  (o.isActive = !0))
						: o.$button.hide()
			},
			create: function () {
				var t,
					o = this,
					a = o.instance,
					s = o.opts.parentEl,
					r = []
				o.$grid ||
					((o.$grid = e(
						'<div class="' +
							n +
							' ' +
							n +
							'-' +
							o.opts.axis +
							'"></div>'
					).appendTo(a.$refs.container.find(s).addBack().filter(s))),
					o.$grid.on('click', 'li', function () {
						a.jumpTo(e(this).attr('data-index'))
					})),
					o.$list || (o.$list = e('<ul>').appendTo(o.$grid)),
					e.each(a.group, function (e, n) {
						;(t =
							n.opts.thumb ||
							(n.opts.$thumb ? n.opts.$thumb.attr('src') : null)),
							t || 'image' !== n.type || (t = n.src),
							r.push(
								'<li data-index="' +
									e +
									'" tabindex="0" class="' +
									i +
									'"' +
									(t && t.length
										? ' style="background-image:url(' +
										  t +
										  ')" />'
										: '') +
									'></li>'
							)
					}),
					(o.$list[0].innerHTML = r.join('')),
					'x' === o.opts.axis &&
						o.$list.width(
							parseInt(o.$grid.css('padding-right'), 10) +
								a.group.length *
									o.$list.children().eq(0).outerWidth(!0)
						)
			},
			focus: function (t) {
				var e,
					n,
					i = this,
					a = i.$list,
					s = i.$grid
				i.instance.current &&
					((e = a
						.children()
						.removeClass(o)
						.filter(
							'[data-index="' + i.instance.current.index + '"]'
						)
						.addClass(o)),
					(n = e.position()),
					'y' === i.opts.axis &&
					(n.top < 0 || n.top > a.height() - e.outerHeight())
						? a
								.stop()
								.animate(
									{ scrollTop: a.scrollTop() + n.top },
									t
								)
						: 'x' === i.opts.axis &&
						  (n.left < s.scrollLeft() ||
								n.left >
									s.scrollLeft() +
										(s.width() - e.outerWidth())) &&
						  a.parent().stop().animate({ scrollLeft: n.left }, t))
			},
			update: function () {
				var t = this
				t.instance.$refs.container.toggleClass(
					'fancybox-show-thumbs',
					this.isVisible
				),
					t.isVisible
						? (t.$grid || t.create(),
						  t.instance.trigger('onThumbsShow'),
						  t.focus(0))
						: t.$grid && t.instance.trigger('onThumbsHide'),
					t.instance.update()
			},
			hide: function () {
				;(this.isVisible = !1), this.update()
			},
			show: function () {
				;(this.isVisible = !0), this.update()
			},
			toggle: function () {
				;(this.isVisible = !this.isVisible), this.update()
			},
		}),
			e(t).on({
				'onInit.fb': function (t, e) {
					var n
					e &&
						!e.Thumbs &&
						((n = new a(e)),
						n.isActive && n.opts.autoStart === !0 && n.show())
				},
				'beforeShow.fb': function (t, e, n, o) {
					var i = e && e.Thumbs
					i && i.isVisible && i.focus(o ? 0 : 250)
				},
				'afterKeydown.fb': function (t, e, n, o, i) {
					var a = e && e.Thumbs
					a &&
						a.isActive &&
						71 === i &&
						(o.preventDefault(), a.toggle())
				},
				'beforeClose.fb': function (t, e) {
					var n = e && e.Thumbs
					n &&
						n.isVisible &&
						n.opts.hideOnClose !== !1 &&
						n.$grid.hide()
				},
			})
	})(document, window.jQuery || jQuery),
	(function (t, e) {
		'use strict'
		function n(t) {
			var e = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;',
				'/': '&#x2F;',
				'`': '&#x60;',
				'=': '&#x3D;',
			}
			return String(t).replace(/[&<>"'`=\/]/g, function (t) {
				return e[t]
			})
		}
		e.extend(!0, e.fancybox.defaults, {
			btnTpl: {
				share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>',
			},
			share: {
				url: function (t, e) {
					return (
						(!t.currentHash &&
							'inline' !== e.type &&
							'html' !== e.type &&
							(e.origSrc || e.src)) ||
						window.location
					)
				},
				tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p></div>',
			},
		}),
			e(t).on('click', '[data-fancybox-share]', function () {
				var t,
					o,
					i = e.fancybox.getInstance(),
					a = i.current || null
				a &&
					('function' === e.type(a.opts.share.url) &&
						(t = a.opts.share.url.apply(a, [i, a])),
					(o = a.opts.share.tpl
						.replace(
							/\{\{media\}\}/g,
							'image' === a.type ? encodeURIComponent(a.src) : ''
						)
						.replace(/\{\{url\}\}/g, encodeURIComponent(t))
						.replace(/\{\{url_raw\}\}/g, n(t))
						.replace(
							/\{\{descr\}\}/g,
							i.$caption
								? encodeURIComponent(i.$caption.text())
								: ''
						)),
					e.fancybox.open({
						src: i.translate(i, o),
						type: 'html',
						opts: {
							animationEffect: !1,
							afterLoad: function (t, e) {
								i.$refs.container.one(
									'beforeClose.fb',
									function () {
										t.close(null, 0)
									}
								),
									e.$content
										.find('.fancybox-share__links a')
										.click(function () {
											return (
												window.open(
													this.href,
													'Share',
													'width=550, height=450'
												),
												!1
											)
										})
							},
						},
					}))
			})
	})(document, window.jQuery || jQuery),
	(function (t, e, n) {
		'use strict'
		function o() {
			var t = e.location.hash.substr(1),
				n = t.split('-'),
				o =
					n.length > 1 && /^\+?\d+$/.test(n[n.length - 1])
						? parseInt(n.pop(-1), 10) || 1
						: 1,
				i = n.join('-')
			return { hash: t, index: o < 1 ? 1 : o, gallery: i }
		}
		function i(t) {
			var e
			'' !== t.gallery &&
				(e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']")
					.eq(t.index - 1)
					.trigger('click.fb-start'))
		}
		function a(t) {
			var e, n
			return (
				!!t &&
				((e = t.current ? t.current.opts : t.opts),
				(n = e.hash || (e.$orig ? e.$orig.data('fancybox') : '')),
				'' !== n && n)
			)
		}
		n.escapeSelector ||
			(n.escapeSelector = function (t) {
				var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
					n = function (t, e) {
						return e
							? '\0' === t
								? '�'
								: t.slice(0, -1) +
								  '\\' +
								  t.charCodeAt(t.length - 1).toString(16) +
								  ' '
							: '\\' + t
					}
				return (t + '').replace(e, n)
			}),
			n(function () {
				n.fancybox.defaults.hash !== !1 &&
					(n(t).on({
						'onInit.fb': function (t, e) {
							var n, i
							e.group[e.currIndex].opts.hash !== !1 &&
								((n = o()),
								(i = a(e)),
								i &&
									n.gallery &&
									i == n.gallery &&
									(e.currIndex = n.index - 1))
						},
						'beforeShow.fb': function (n, o, i, s) {
							var r
							i &&
								i.opts.hash !== !1 &&
								((r = a(o)),
								r &&
									((o.currentHash =
										r +
										(o.group.length > 1
											? '-' + (i.index + 1)
											: '')),
									e.location.hash !== '#' + o.currentHash &&
										(o.origHash ||
											(o.origHash = e.location.hash),
										o.hashTimer &&
											clearTimeout(o.hashTimer),
										(o.hashTimer = setTimeout(function () {
											'replaceState' in e.history
												? (e.history[
														s
															? 'pushState'
															: 'replaceState'
												  ](
														{},
														t.title,
														e.location.pathname +
															e.location.search +
															'#' +
															o.currentHash
												  ),
												  s &&
														(o.hasCreatedHistory =
															!0))
												: (e.location.hash =
														o.currentHash),
												(o.hashTimer = null)
										}, 300)))))
						},
						'beforeClose.fb': function (n, o, i) {
							var s
							i.opts.hash !== !1 &&
								((s = a(o)),
								o.currentHash && o.hasCreatedHistory
									? e.history.back()
									: o.currentHash &&
									  ('replaceState' in e.history
											? e.history.replaceState(
													{},
													t.title,
													e.location.pathname +
														e.location.search +
														(o.origHash || '')
											  )
											: (e.location.hash = o.origHash)),
								(o.currentHash = null),
								clearTimeout(o.hashTimer))
						},
					}),
					n(e).on('hashchange.fb', function () {
						var t,
							e = o()
						n.each(
							n('.fancybox-container').get().reverse(),
							function (e, o) {
								var i = n(o).data('FancyBox')
								if (i.currentHash) return (t = i), !1
							}
						),
							t
								? !t.currentHash ||
								  t.currentHash === e.gallery + '-' + e.index ||
								  (1 === e.index &&
										t.currentHash == e.gallery) ||
								  ((t.currentHash = null), t.close())
								: '' !== e.gallery && i(e)
					}),
					setTimeout(function () {
						n.fancybox.getInstance() || i(o())
					}, 50))
			})
	})(document, window, window.jQuery || jQuery),
	(function (t, e) {
		'use strict'
		var n = new Date().getTime()
		e(t).on({
			'onInit.fb': function (t, e, o) {
				e.$refs.stage.on(
					'mousewheel DOMMouseScroll wheel MozMousePixelScroll',
					function (t) {
						var o = e.current,
							i = new Date().getTime()
						e.group.length < 2 ||
							o.opts.wheel === !1 ||
							('auto' === o.opts.wheel && 'image' !== o.type) ||
							(t.preventDefault(),
							t.stopPropagation(),
							o.$slide.hasClass('fancybox-animated') ||
								((t = t.originalEvent || t),
								i - n < 250 ||
									((n = i),
									e[
										(-t.deltaY ||
											-t.deltaX ||
											t.wheelDelta ||
											-t.detail) < 0
											? 'next'
											: 'previous'
									]())))
					}
				)
			},
		})
	})(document, window.jQuery || jQuery)

!function (i) {
	'use strict'
	'function' == typeof define && define.amd
		? define(['jquery'], i)
		: 'undefined' != typeof exports
		? (module.exports = i(require('jquery')))
		: i(jQuery)
}
