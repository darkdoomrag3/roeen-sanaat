/* price filter */
! function (a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function (a) {
	function C(a) {
		for (var b = a.css("visibility");
			"inherit" === b;) a = a.parent(), b = a.css("visibility");
		return "hidden" !== b
	}

	function V(a) {
		for (var b, c; a.length && a[0] !== document;) {
			if (b = a.css("position"), ("absolute" === b || "relative" === b || "fixed" === b) && (c = parseInt(a.css("zIndex"), 10), !isNaN(c) && 0 !== c)) return c;
			a = a.parent()
		}
		return 0
	}

	function W() {
		this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
			closeText: "Done",
			prevText: "",
			nextText: "",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: !1,
			showMonthAfterYear: !1,
			yearSuffix: ""
		}, this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: !1,
			hideIfNoPrevNext: !1,
			navigationAsDateFormat: !1,
			gotoCurrent: !1,
			changeMonth: !1,
			changeYear: !1,
			yearRange: "c-10:c+10",
			showOtherMonths: !1,
			selectOtherMonths: !1,
			showWeek: !1,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: !0,
			showButtonPanel: !1,
			autoSize: !1,
			disabled: !1
		}, a.extend(this._defaults, this.regional[""]), this.regional.en = a.extend(!0, {}, this.regional[""]), this.regional["en-US"] = a.extend(!0, {}, this.regional.en), this.dpDiv = X(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
	}

	function X(b) {
		var c = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return b.on("mouseout", c, function () {
			a(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && a(this).removeClass("ui-datepicker-next-hover")
		}).on("mouseover", c, Y)
	}

	function Y() {
		a.datepicker._isDisabledDatepicker(U.inline ? U.dpDiv.parent()[0] : U.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), a(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && a(this).addClass("ui-datepicker-next-hover"))
	}

	function Z(b, c) {
		a.extend(b, c);
		for (var d in c) null == c[d] && (b[d] = c[d]);
		return b
	}

	function oa(a) {
		return function () {
			var b = this.element.val();
			a.apply(this, arguments), this._refresh(), b !== this.element.val() && this._trigger("change")
		}
	}
	a.ui = a.ui || {};
	var c = (a.ui.version = "1.12.1", 0),
		d = Array.prototype.slice;
	a.cleanData = function (b) {
		return function (c) {
			var d, e, f;
			for (f = 0; null != (e = c[f]); f++) try {
				d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove")
			} catch (a) {}
			b(c)
		}
	}(a.cleanData), a.widget = function (b, c, d) {
		var e, f, g, h = {},
			i = b.split(".")[0];
		b = b.split(".")[1];
		var j = i + "-" + b;
		return d || (d = c, c = a.Widget), a.isArray(d) && (d = a.extend.apply(null, [{}].concat(d))), a.expr[":"][j.toLowerCase()] = function (b) {
			return !!a.data(b, j)
		}, a[i] = a[i] || {}, e = a[i][b], f = a[i][b] = function (a, b) {
			return this._createWidget ? void(arguments.length && this._createWidget(a, b)) : new f(a, b)
		}, a.extend(f, e, {
			version: d.version,
			_proto: a.extend({}, d),
			_childConstructors: []
		}), g = new c, g.options = a.widget.extend({}, g.options), a.each(d, function (b, d) {
			return a.isFunction(d) ? void(h[b] = function () {
				function a() {
					return c.prototype[b].apply(this, arguments)
				}

				function e(a) {
					return c.prototype[b].apply(this, a)
				}
				return function () {
					var f, b = this._super,
						c = this._superApply;
					return this._super = a, this._superApply = e, f = d.apply(this, arguments), this._super = b, this._superApply = c, f
				}
			}()) : void(h[b] = d)
		}), f.prototype = a.widget.extend(g, {
			widgetEventPrefix: e ? g.widgetEventPrefix || b : b
		}, h, {
			constructor: f,
			namespace: i,
			widgetName: b,
			widgetFullName: j
		}), e ? (a.each(e._childConstructors, function (b, c) {
			var d = c.prototype;
			a.widget(d.namespace + "." + d.widgetName, f, c._proto)
		}), delete e._childConstructors) : c._childConstructors.push(f), a.widget.bridge(b, f), f
	}, a.widget.extend = function (b) {
		for (var g, h, c = d.call(arguments, 1), e = 0, f = c.length; e < f; e++)
			for (g in c[e]) h = c[e][g], c[e].hasOwnProperty(g) && void 0 !== h && (a.isPlainObject(h) ? b[g] = a.isPlainObject(b[g]) ? a.widget.extend({}, b[g], h) : a.widget.extend({}, h) : b[g] = h);
		return b
	}, a.widget.bridge = function (b, c) {
		var e = c.prototype.widgetFullName || b;
		a.fn[b] = function (f) {
			var g = "string" == typeof f,
				h = d.call(arguments, 1),
				i = this;
			return g ? this.length || "instance" !== f ? this.each(function () {
				var c, d = a.data(this, e);
				return "instance" === f ? (i = d, !1) : d ? a.isFunction(d[f]) && "_" !== f.charAt(0) ? (c = d[f].apply(d, h), c !== d && void 0 !== c ? (i = c && c.jquery ? i.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + f + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'")
			}) : i = void 0 : (h.length && (f = a.widget.extend.apply(null, [f].concat(h))), this.each(function () {
				var b = a.data(this, e);
				b ? (b.option(f || {}), b._init && b._init()) : a.data(this, e, new c(f, this))
			})), i
		}
	}, a.Widget = function () {}, a.Widget._childConstructors = [], a.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			classes: {},
			disabled: !1,
			create: null
		},
		_createWidget: function (b, d) {
			d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = a(), this.hoverable = a(), this.focusable = a(), this.classesElementLookup = {}, d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function (a) {
					a.target === d && this.destroy()
				}
			}), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: function () {
			return {}
		},
		_getCreateEventData: a.noop,
		_create: a.noop,
		_init: a.noop,
		destroy: function () {
			var b = this;
			this._destroy(), a.each(this.classesElementLookup, function (a, c) {
				b._removeClass(c, a)
			}), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
		},
		_destroy: a.noop,
		widget: function () {
			return this.element
		},
		option: function (b, c) {
			var e, f, g, d = b;
			if (0 === arguments.length) return a.widget.extend({}, this.options);
			if ("string" == typeof b)
				if (d = {}, e = b.split("."), b = e.shift(), e.length) {
					for (f = d[b] = a.widget.extend({}, this.options[b]), g = 0; g < e.length - 1; g++) f[e[g]] = f[e[g]] || {}, f = f[e[g]];
					if (b = e.pop(), 1 === arguments.length) return void 0 === f[b] ? null : f[b];
					f[b] = c
				} else {
					if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
					d[b] = c
				}
			return this._setOptions(d), this
		},
		_setOptions: function (a) {
			var b;
			for (b in a) this._setOption(b, a[b]);
			return this
		},
		_setOption: function (a, b) {
			return "classes" === a && this._setOptionClasses(b), this.options[a] = b, "disabled" === a && this._setOptionDisabled(b), this
		},
		_setOptionClasses: function (b) {
			var c, d, e;
			for (c in b) e = this.classesElementLookup[c], b[c] !== this.options.classes[c] && e && e.length && (d = a(e.get()), this._removeClass(e, c), d.addClass(this._classes({
				element: d,
				keys: c,
				classes: b,
				add: !0
			})))
		},
		_setOptionDisabled: function (a) {
			this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!a), a && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
		},
		enable: function () {
			return this._setOptions({
				disabled: !1
			})
		},
		disable: function () {
			return this._setOptions({
				disabled: !0
			})
		},
		_classes: function (b) {
			function e(e, f) {
				var g, h;
				for (h = 0; h < e.length; h++) g = d.classesElementLookup[e[h]] || a(), g = a(b.add ? a.unique(g.get().concat(b.element.get())) : g.not(b.element).get()), d.classesElementLookup[e[h]] = g, c.push(e[h]), f && b.classes[e[h]] && c.push(b.classes[e[h]])
			}
			var c = [],
				d = this;
			return b = a.extend({
				element: this.element,
				classes: this.options.classes || {}
			}, b), this._on(b.element, {
				remove: "_untrackClassesElement"
			}), b.keys && e(b.keys.match(/\S+/g) || [], !0), b.extra && e(b.extra.match(/\S+/g) || []), c.join(" ")
		},
		_untrackClassesElement: function (b) {
			var c = this;
			a.each(c.classesElementLookup, function (d, e) {
				a.inArray(b.target, e) !== -1 && (c.classesElementLookup[d] = a(e.not(b.target).get()))
			})
		},
		_removeClass: function (a, b, c) {
			return this._toggleClass(a, b, c, !1)
		},
		_addClass: function (a, b, c) {
			return this._toggleClass(a, b, c, !0)
		},
		_toggleClass: function (a, b, c, d) {
			d = "boolean" == typeof d ? d : c;
			var e = "string" == typeof a || null === a,
				f = {
					extra: e ? b : c,
					keys: e ? a : b,
					element: e ? this.element : a,
					add: d
				};
			return f.element.toggleClass(this._classes(f), d), this
		},
		_on: function (b, c, d) {
			var e, f = this;
			"boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function (d, g) {
				function h() {
					if (b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled")) return ("string" == typeof g ? f[g] : g).apply(f, arguments)
				}
				"string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
				var i = d.match(/^([\w:-]*)\s*(.*)$/),
					j = i[1] + f.eventNamespace,
					k = i[2];
				k ? e.on(j, k, h) : c.on(j, h)
			})
		},
		_off: function (b, c) {
			c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, b.off(c).off(c), this.bindings = a(this.bindings.not(b).get()), this.focusable = a(this.focusable.not(b).get()), this.hoverable = a(this.hoverable.not(b).get())
		},
		_delay: function (a, b) {
			function c() {
				return ("string" == typeof a ? d[a] : a).apply(d, arguments)
			}
			var d = this;
			return setTimeout(c, b || 0)
		},
		_hoverable: function (b) {
			this.hoverable = this.hoverable.add(b), this._on(b, {
				mouseenter: function (b) {
					this._addClass(a(b.currentTarget), null, "ui-state-hover")
				},
				mouseleave: function (b) {
					this._removeClass(a(b.currentTarget), null, "ui-state-hover")
				}
			})
		},
		_focusable: function (b) {
			this.focusable = this.focusable.add(b), this._on(b, {
				focusin: function (b) {
					this._addClass(a(b.currentTarget), null, "ui-state-focus")
				},
				focusout: function (b) {
					this._removeClass(a(b.currentTarget), null, "ui-state-focus")
				}
			})
		},
		_trigger: function (b, c, d) {
			var e, f, g = this.options[b];
			if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
				for (e in f) e in c || (c[e] = f[e]);
			return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
		}
	}, a.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function (b, c) {
		a.Widget.prototype["_" + b] = function (d, e, f) {
			"string" == typeof e && (e = {
				effect: e
			});
			var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
			e = e || {}, "number" == typeof e && (e = {
				duration: e
			}), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function (c) {
				a(this)[b](), f && f.call(d[0]), c()
			})
		}
	});
	a.widget;
	! function () {
		function k(a, b, c) {
			return [parseFloat(a[0]) * (i.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (i.test(a[1]) ? c / 100 : 1)]
		}

		function l(b, c) {
			return parseInt(a.css(b, c), 10) || 0
		}

		function m(b) {
			var c = b[0];
			return 9 === c.nodeType ? {
				width: b.width(),
				height: b.height(),
				offset: {
					top: 0,
					left: 0
				}
			} : a.isWindow(c) ? {
				width: b.width(),
				height: b.height(),
				offset: {
					top: b.scrollTop(),
					left: b.scrollLeft()
				}
			} : c.preventDefault ? {
				width: 0,
				height: 0,
				offset: {
					top: c.pageY,
					left: c.pageX
				}
			} : {
				width: b.outerWidth(),
				height: b.outerHeight(),
				offset: b.offset()
			}
		}
		var b, c = Math.max,
			d = Math.abs,
			e = /left|center|right/,
			f = /top|center|bottom/,
			g = /[\+\-]\d+(\.[\d]+)?%?/,
			h = /^\w+/,
			i = /%$/,
			j = a.fn.position;
		a.position = {
			scrollbarWidth: function () {
				if (void 0 !== b) return b;
				var c, d, e = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
					f = e.children()[0];
				return a("body").append(e), c = f.offsetWidth, e.css("overflow", "scroll"), d = f.offsetWidth, c === d && (d = e[0].clientWidth), e.remove(), b = c - d
			},
			getScrollInfo: function (b) {
				var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
					d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
					e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
					f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
				return {
					width: f ? a.position.scrollbarWidth() : 0,
					height: e ? a.position.scrollbarWidth() : 0
				}
			},
			getWithinInfo: function (b) {
				var c = a(b || window),
					d = a.isWindow(c[0]),
					e = !!c[0] && 9 === c[0].nodeType,
					f = !d && !e;
				return {
					element: c,
					isWindow: d,
					isDocument: e,
					offset: f ? a(b).offset() : {
						left: 0,
						top: 0
					},
					scrollLeft: c.scrollLeft(),
					scrollTop: c.scrollTop(),
					width: c.outerWidth(),
					height: c.outerHeight()
				}
			}
		}, a.fn.position = function (b) {
			if (!b || !b.of) return j.apply(this, arguments);
			b = a.extend({}, b);
			var i, n, o, p, q, r, s = a(b.of),
				t = a.position.getWithinInfo(b.within),
				u = a.position.getScrollInfo(t),
				v = (b.collision || "flip").split(" "),
				w = {};
			return r = m(s), s[0].preventDefault && (b.at = "left top"), n = r.width, o = r.height, p = r.offset, q = a.extend({}, p), a.each(["my", "at"], function () {
				var c, d, a = (b[this] || "").split(" ");
				1 === a.length && (a = e.test(a[0]) ? a.concat(["center"]) : f.test(a[0]) ? ["center"].concat(a) : ["center", "center"]), a[0] = e.test(a[0]) ? a[0] : "center", a[1] = f.test(a[1]) ? a[1] : "center", c = g.exec(a[0]), d = g.exec(a[1]), w[this] = [c ? c[0] : 0, d ? d[0] : 0], b[this] = [h.exec(a[0])[0], h.exec(a[1])[0]]
			}), 1 === v.length && (v[1] = v[0]), "right" === b.at[0] ? q.left += n : "center" === b.at[0] && (q.left += n / 2), "bottom" === b.at[1] ? q.top += o : "center" === b.at[1] && (q.top += o / 2), i = k(w.at, n, o), q.left += i[0], q.top += i[1], this.each(function () {
				var e, f, g = a(this),
					h = g.outerWidth(),
					j = g.outerHeight(),
					m = l(this, "marginLeft"),
					r = l(this, "marginTop"),
					x = h + m + l(this, "marginRight") + u.width,
					y = j + r + l(this, "marginBottom") + u.height,
					z = a.extend({}, q),
					A = k(w.my, g.outerWidth(), g.outerHeight());
				"right" === b.my[0] ? z.left -= h : "center" === b.my[0] && (z.left -= h / 2), "bottom" === b.my[1] ? z.top -= j : "center" === b.my[1] && (z.top -= j / 2), z.left += A[0], z.top += A[1], e = {
					marginLeft: m,
					marginTop: r
				}, a.each(["left", "top"], function (c, d) {
					a.ui.position[v[c]] && a.ui.position[v[c]][d](z, {
						targetWidth: n,
						targetHeight: o,
						elemWidth: h,
						elemHeight: j,
						collisionPosition: e,
						collisionWidth: x,
						collisionHeight: y,
						offset: [i[0] + A[0], i[1] + A[1]],
						my: b.my,
						at: b.at,
						within: t,
						elem: g
					})
				}), b.using && (f = function (a) {
					var e = p.left - z.left,
						f = e + n - h,
						i = p.top - z.top,
						k = i + o - j,
						l = {
							target: {
								element: s,
								left: p.left,
								top: p.top,
								width: n,
								height: o
							},
							element: {
								element: g,
								left: z.left,
								top: z.top,
								width: h,
								height: j
							},
							horizontal: f < 0 ? "left" : e > 0 ? "right" : "center",
							vertical: k < 0 ? "top" : i > 0 ? "bottom" : "middle"
						};
					n < h && d(e + f) < n && (l.horizontal = "center"), o < j && d(i + k) < o && (l.vertical = "middle"), c(d(e), d(f)) > c(d(i), d(k)) ? l.important = "horizontal" : l.important = "vertical", b.using.call(this, a, l)
				}), g.offset(a.extend(z, {
					using: f
				}))
			})
		}, a.ui.position = {
			fit: {
				left: function (a, b) {
					var j, d = b.within,
						e = d.isWindow ? d.scrollLeft : d.offset.left,
						f = d.width,
						g = a.left - b.collisionPosition.marginLeft,
						h = e - g,
						i = g + b.collisionWidth - f - e;
					b.collisionWidth > f ? h > 0 && i <= 0 ? (j = a.left + h + b.collisionWidth - f - e, a.left += h - j) : i > 0 && h <= 0 ? a.left = e : h > i ? a.left = e + f - b.collisionWidth : a.left = e : h > 0 ? a.left += h : i > 0 ? a.left -= i : a.left = c(a.left - g, a.left)
				},
				top: function (a, b) {
					var j, d = b.within,
						e = d.isWindow ? d.scrollTop : d.offset.top,
						f = b.within.height,
						g = a.top - b.collisionPosition.marginTop,
						h = e - g,
						i = g + b.collisionHeight - f - e;
					b.collisionHeight > f ? h > 0 && i <= 0 ? (j = a.top + h + b.collisionHeight - f - e, a.top += h - j) : i > 0 && h <= 0 ? a.top = e : h > i ? a.top = e + f - b.collisionHeight : a.top = e : h > 0 ? a.top += h : i > 0 ? a.top -= i : a.top = c(a.top - g, a.top)
				}
			},
			flip: {
				left: function (a, b) {
					var n, o, c = b.within,
						e = c.offset.left + c.scrollLeft,
						f = c.width,
						g = c.isWindow ? c.scrollLeft : c.offset.left,
						h = a.left - b.collisionPosition.marginLeft,
						i = h - g,
						j = h + b.collisionWidth - f - g,
						k = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
						l = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
						m = -2 * b.offset[0];
					i < 0 ? (n = a.left + k + l + m + b.collisionWidth - f - e, (n < 0 || n < d(i)) && (a.left += k + l + m)) : j > 0 && (o = a.left - b.collisionPosition.marginLeft + k + l + m - g, (o > 0 || d(o) < j) && (a.left += k + l + m))
				},
				top: function (a, b) {
					var o, p, c = b.within,
						e = c.offset.top + c.scrollTop,
						f = c.height,
						g = c.isWindow ? c.scrollTop : c.offset.top,
						h = a.top - b.collisionPosition.marginTop,
						i = h - g,
						j = h + b.collisionHeight - f - g,
						k = "top" === b.my[1],
						l = k ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
						m = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
						n = -2 * b.offset[1];
					i < 0 ? (p = a.top + l + m + n + b.collisionHeight - f - e, (p < 0 || p < d(i)) && (a.top += l + m + n)) : j > 0 && (o = a.top - b.collisionPosition.marginTop + l + m + n - g, (o > 0 || d(o) < j) && (a.top += l + m + n))
				}
			},
			flipfit: {
				left: function () {
					a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
				},
				top: function () {
					a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
				}
			}
		}
	}();
	var i = (a.ui.position, a.extend(a.expr[":"], {
			data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
				return function (c) {
					return !!a.data(c, b)
				}
			}) : function (b, c, d) {
				return !!a.data(b, d[3])
			}
		}), a.fn.extend({
			disableSelection: function () {
				var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
				return function () {
					return this.on(a + ".ui-disableSelection", function (a) {
						a.preventDefault()
					})
				}
			}(),
			enableSelection: function () {
				return this.off(".ui-disableSelection")
			}
		}), "ui-effects-"),
		j = "ui-effects-style",
		k = "ui-effects-animated",
		l = a;
	a.effects = {
			effect: {}
		},
		function (a, b) {
			function m(a, b, c) {
				var d = h[b.type] || {};
				return null == a ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a)
			}

			function n(b) {
				var c = f(),
					d = c._rgba = [];
				return b = b.toLowerCase(), l(e, function (a, e) {
					var f, h = e.re.exec(b),
						i = h && e.parse(h),
						j = e.space || "rgba";
					if (i) return f = c[j](i), c[g[j].cache] = f[g[j].cache], d = c._rgba = f._rgba, !1
				}), d.length ? ("0,0,0,0" === d.join() && a.extend(d, k.transparent), c) : k[b]
			}

			function o(a, b, c) {
				return c = (c + 1) % 1, 6 * c < 1 ? a + (b - a) * c * 6 : 2 * c < 1 ? b : 3 * c < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a
			}
			var k, c = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
				d = /^([\-+])=\s*(\d+\.?\d*)/,
				e = [{
					re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					parse: function (a) {
						return [a[1], a[2], a[3], a[4]]
					}
				}, {
					re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					parse: function (a) {
						return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
					}
				}, {
					re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
					parse: function (a) {
						return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
					}
				}, {
					re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
					parse: function (a) {
						return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
					}
				}, {
					re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					space: "hsla",
					parse: function (a) {
						return [a[1], a[2] / 100, a[3] / 100, a[4]]
					}
				}],
				f = a.Color = function (b, c, d, e) {
					return new a.Color.fn.parse(b, c, d, e)
				},
				g = {
					rgba: {
						props: {
							red: {
								idx: 0,
								type: "byte"
							},
							green: {
								idx: 1,
								type: "byte"
							},
							blue: {
								idx: 2,
								type: "byte"
							}
						}
					},
					hsla: {
						props: {
							hue: {
								idx: 0,
								type: "degrees"
							},
							saturation: {
								idx: 1,
								type: "percent"
							},
							lightness: {
								idx: 2,
								type: "percent"
							}
						}
					}
				},
				h = {
					byte: {
						floor: !0,
						max: 255
					},
					percent: {
						max: 1
					},
					degrees: {
						mod: 360,
						floor: !0
					}
				},
				i = f.support = {},
				j = a("<p>")[0],
				l = a.each;
			j.style.cssText = "background-color:rgba(1,1,1,.5)", i.rgba = j.style.backgroundColor.indexOf("rgba") > -1, l(g, function (a, b) {
				b.cache = "_" + a, b.props.alpha = {
					idx: 3,
					type: "percent",
					def: 1
				}
			}), f.fn = a.extend(f.prototype, {
				parse: function (c, d, e, h) {
					if (c === b) return this._rgba = [null, null, null, null], this;
					(c.jquery || c.nodeType) && (c = a(c).css(d), d = b);
					var i = this,
						j = a.type(c),
						o = this._rgba = [];
					return d !== b && (c = [c, d, e, h], j = "array"), "string" === j ? this.parse(n(c) || k._default) : "array" === j ? (l(g.rgba.props, function (a, b) {
						o[b.idx] = m(c[b.idx], b)
					}), this) : "object" === j ? (c instanceof f ? l(g, function (a, b) {
						c[b.cache] && (i[b.cache] = c[b.cache].slice())
					}) : l(g, function (b, d) {
						var e = d.cache;
						l(d.props, function (a, b) {
							if (!i[e] && d.to) {
								if ("alpha" === a || null == c[a]) return;
								i[e] = d.to(i._rgba)
							}
							i[e][b.idx] = m(c[a], b, !0)
						}), i[e] && a.inArray(null, i[e].slice(0, 3)) < 0 && (i[e][3] = 1, d.from && (i._rgba = d.from(i[e])))
					}), this) : void 0
				},
				is: function (a) {
					var b = f(a),
						c = !0,
						d = this;
					return l(g, function (a, e) {
						var f, g = b[e.cache];
						return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], l(e.props, function (a, b) {
							if (null != g[b.idx]) return c = g[b.idx] === f[b.idx]
						})), c
					}), c
				},
				_space: function () {
					var a = [],
						b = this;
					return l(g, function (c, d) {
						b[d.cache] && a.push(c)
					}), a.pop()
				},
				transition: function (a, b) {
					var c = f(a),
						d = c._space(),
						e = g[d],
						i = 0 === this.alpha() ? f("transparent") : this,
						j = i[e.cache] || e.to(i._rgba),
						k = j.slice();
					return c = c[e.cache], l(e.props, function (a, d) {
						var e = d.idx,
							f = j[e],
							g = c[e],
							i = h[d.type] || {};
						null !== g && (null === f ? k[e] = g : (i.mod && (g - f > i.mod / 2 ? f += i.mod : f - g > i.mod / 2 && (f -= i.mod)), k[e] = m((g - f) * b + f, d)))
					}), this[d](k)
				},
				blend: function (b) {
					if (1 === this._rgba[3]) return this;
					var c = this._rgba.slice(),
						d = c.pop(),
						e = f(b)._rgba;
					return f(a.map(c, function (a, b) {
						return (1 - d) * e[b] + d * a
					}))
				},
				toRgbaString: function () {
					var b = "rgba(",
						c = a.map(this._rgba, function (a, b) {
							return null == a ? b > 2 ? 1 : 0 : a
						});
					return 1 === c[3] && (c.pop(), b = "rgb("), b + c.join() + ")"
				},
				toHslaString: function () {
					var b = "hsla(",
						c = a.map(this.hsla(), function (a, b) {
							return null == a && (a = b > 2 ? 1 : 0), b && b < 3 && (a = Math.round(100 * a) + "%"), a
						});
					return 1 === c[3] && (c.pop(), b = "hsl("), b + c.join() + ")"
				},
				toHexString: function (b) {
					var c = this._rgba.slice(),
						d = c.pop();
					return b && c.push(~~(255 * d)), "#" + a.map(c, function (a) {
						return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a
					}).join("")
				},
				toString: function () {
					return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
				}
			}), f.fn.parse.prototype = f.fn, g.hsla.to = function (a) {
				if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
				var k, l, b = a[0] / 255,
					c = a[1] / 255,
					d = a[2] / 255,
					e = a[3],
					f = Math.max(b, c, d),
					g = Math.min(b, c, d),
					h = f - g,
					i = f + g,
					j = .5 * i;
				return k = g === f ? 0 : b === f ? 60 * (c - d) / h + 360 : c === f ? 60 * (d - b) / h + 120 : 60 * (b - c) / h + 240, l = 0 === h ? 0 : j <= .5 ? h / i : h / (2 - i), [Math.round(k) % 360, l, j, null == e ? 1 : e]
			}, g.hsla.from = function (a) {
				if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
				var b = a[0] / 360,
					c = a[1],
					d = a[2],
					e = a[3],
					f = d <= .5 ? d * (1 + c) : d + c - d * c,
					g = 2 * d - f;
				return [Math.round(255 * o(g, f, b + 1 / 3)), Math.round(255 * o(g, f, b)), Math.round(255 * o(g, f, b - 1 / 3)), e]
			}, l(g, function (c, e) {
				var g = e.props,
					h = e.cache,
					i = e.to,
					j = e.from;
				f.fn[c] = function (c) {
					if (i && !this[h] && (this[h] = i(this._rgba)), c === b) return this[h].slice();
					var d, e = a.type(c),
						k = "array" === e || "object" === e ? c : arguments,
						n = this[h].slice();
					return l(g, function (a, b) {
						var c = k["object" === e ? a : b.idx];
						null == c && (c = n[b.idx]), n[b.idx] = m(c, b)
					}), j ? (d = f(j(n)), d[h] = n, d) : f(n)
				}, l(g, function (b, e) {
					f.fn[b] || (f.fn[b] = function (f) {
						var k, g = a.type(f),
							h = "alpha" === b ? this._hsla ? "hsla" : "rgba" : c,
							i = this[h](),
							j = i[e.idx];
						return "undefined" === g ? j : ("function" === g && (f = f.call(this, j), g = a.type(f)), null == f && e.empty ? this : ("string" === g && (k = d.exec(f), k && (f = j + parseFloat(k[2]) * ("+" === k[1] ? 1 : -1))), i[e.idx] = f, this[h](i)))
					})
				})
			}), f.hook = function (b) {
				var c = b.split(" ");
				l(c, function (b, c) {
					a.cssHooks[c] = {
						set: function (b, d) {
							var e, g, h = "";
							if ("transparent" !== d && ("string" !== a.type(d) || (e = n(d)))) {
								if (d = f(e || d), !i.rgba && 1 !== d._rgba[3]) {
									for (g = "backgroundColor" === c ? b.parentNode : b;
										("" === h || "transparent" === h) && g && g.style;) try {
										h = a.css(g, "backgroundColor"), g = g.parentNode
									} catch (a) {}
									d = d.blend(h && "transparent" !== h ? h : "_default")
								}
								d = d.toRgbaString()
							}
							try {
								b.style[c] = d
							} catch (a) {}
						}
					}, a.fx.step[c] = function (b) {
						b.colorInit || (b.start = f(b.elem, c), b.end = f(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
					}
				})
			}, f.hook(c), a.cssHooks.borderColor = {
				expand: function (a) {
					var b = {};
					return l(["Top", "Right", "Bottom", "Left"], function (c, d) {
						b["border" + d + "Color"] = a
					}), b
				}
			}, k = a.Color.names = {
				aqua: "#00ffff",
				black: "#000000",
				blue: "#0000ff",
				fuchsia: "#ff00ff",
				gray: "#808080",
				green: "#008000",
				lime: "#00ff00",
				maroon: "#800000",
				navy: "#000080",
				olive: "#808000",
				purple: "#800080",
				red: "#ff0000",
				silver: "#c0c0c0",
				teal: "#008080",
				white: "#ffffff",
				yellow: "#ffff00",
				transparent: [null, null, null, 0],
				_default: "#ffffff"
			}
		}(l),
		function () {
			function d(b) {
				var c, d, e = b.ownerDocument.defaultView ? b.ownerDocument.defaultView.getComputedStyle(b, null) : b.currentStyle,
					f = {};
				if (e && e.length && e[0] && e[e[0]])
					for (d = e.length; d--;) c = e[d], "string" == typeof e[c] && (f[a.camelCase(c)] = e[c]);
				else
					for (c in e) "string" == typeof e[c] && (f[c] = e[c]);
				return f
			}

			function e(b, d) {
				var f, g, e = {};
				for (f in d) g = d[f], b[f] !== g && (c[f] || !a.fx.step[f] && isNaN(parseFloat(g)) || (e[f] = g));
				return e
			}
			var b = ["add", "remove", "toggle"],
				c = {
					border: 1,
					borderBottom: 1,
					borderColor: 1,
					borderLeft: 1,
					borderRight: 1,
					borderTop: 1,
					borderWidth: 1,
					margin: 1,
					padding: 1
				};
			a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (b, c) {
				a.fx.step[c] = function (a) {
					("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (l.style(a.elem, c, a.end), a.setAttr = !0)
				}
			}), a.fn.addBack || (a.fn.addBack = function (a) {
				return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
			}), a.effects.animateClass = function (c, f, g, h) {
				var i = a.speed(f, g, h);
				return this.queue(function () {
					var h, f = a(this),
						g = f.attr("class") || "",
						j = i.children ? f.find("*").addBack() : f;
					j = j.map(function () {
						var b = a(this);
						return {
							el: b,
							start: d(this)
						}
					}), h = function () {
						a.each(b, function (a, b) {
							c[b] && f[b + "Class"](c[b])
						})
					}, h(), j = j.map(function () {
						return this.end = d(this.el[0]), this.diff = e(this.start, this.end), this
					}), f.attr("class", g), j = j.map(function () {
						var b = this,
							c = a.Deferred(),
							d = a.extend({}, i, {
								queue: !1,
								complete: function () {
									c.resolve(b)
								}
							});
						return this.el.animate(this.diff, d), c.promise()
					}), a.when.apply(a, j.get()).done(function () {
						h(), a.each(arguments, function () {
							var b = this.el;
							a.each(this.diff, function (a) {
								b.css(a, "")
							})
						}), i.complete.call(f[0])
					})
				})
			}, a.fn.extend({
				addClass: function (b) {
					return function (c, d, e, f) {
						return d ? a.effects.animateClass.call(this, {
							add: c
						}, d, e, f) : b.apply(this, arguments)
					}
				}(a.fn.addClass),
				removeClass: function (b) {
					return function (c, d, e, f) {
						return arguments.length > 1 ? a.effects.animateClass.call(this, {
							remove: c
						}, d, e, f) : b.apply(this, arguments)
					}
				}(a.fn.removeClass),
				toggleClass: function (b) {
					return function (c, d, e, f, g) {
						return "boolean" == typeof d || void 0 === d ? e ? a.effects.animateClass.call(this, d ? {
							add: c
						} : {
							remove: c
						}, e, f, g) : b.apply(this, arguments) : a.effects.animateClass.call(this, {
							toggle: c
						}, d, e, f)
					}
				}(a.fn.toggleClass),
				switchClass: function (b, c, d, e, f) {
					return a.effects.animateClass.call(this, {
						add: c,
						remove: b
					}, d, e, f)
				}
			})
		}(),
		function () {
			function b(b, c, d, e) {
				return a.isPlainObject(b) && (c = b, b = b.effect), b = {
					effect: b
				}, null == c && (c = {}), a.isFunction(c) && (e = c, d = null, c = {}), ("number" == typeof c || a.fx.speeds[c]) && (e = d, d = c, c = {}), a.isFunction(d) && (e = d, d = null), c && a.extend(b, c), d = d || c.duration, b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, b.complete = e || c.complete, b
			}

			function c(b) {
				return !(b && "number" != typeof b && !a.fx.speeds[b]) || ("string" == typeof b && !a.effects.effect[b] || (!!a.isFunction(b) || "object" == typeof b && !b.effect))
			}

			function d(a, b) {
				var c = b.outerWidth(),
					d = b.outerHeight(),
					e = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
					f = e.exec(a) || ["", 0, c, d, 0];
				return {
					top: parseFloat(f[1]) || 0,
					right: "auto" === f[2] ? c : parseFloat(f[2]),
					bottom: "auto" === f[3] ? d : parseFloat(f[3]),
					left: parseFloat(f[4]) || 0
				}
			}
			a.expr && a.expr.filters && a.expr.filters.animated && (a.expr.filters.animated = function (b) {
				return function (c) {
					return !!a(c).data(k) || b(c)
				}
			}(a.expr.filters.animated)), a.uiBackCompat !== !1 && a.extend(a.effects, {
				save: function (a, b) {
					for (var c = 0, d = b.length; c < d; c++) null !== b[c] && a.data(i + b[c], a[0].style[b[c]])
				},
				restore: function (a, b) {
					for (var c, d = 0, e = b.length; d < e; d++) null !== b[d] && (c = a.data(i + b[d]), a.css(b[d], c))
				},
				setMode: function (a, b) {
					return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"), b
				},
				createWrapper: function (b) {
					if (b.parent().is(".ui-effects-wrapper")) return b.parent();
					var c = {
							width: b.outerWidth(!0),
							height: b.outerHeight(!0),
							float: b.css("float")
						},
						d = a("<div></div>").addClass("ui-effects-wrapper").css({
							fontSize: "100%",
							background: "transparent",
							border: "none",
							margin: 0,
							padding: 0
						}),
						e = {
							width: b.width(),
							height: b.height()
						},
						f = document.activeElement;
					try {
						f.id
					} catch (a) {
						f = document.body
					}
					return b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).trigger("focus"), d = b.parent(), "static" === b.css("position") ? (d.css({
						position: "relative"
					}), b.css({
						position: "relative"
					})) : (a.extend(c, {
						position: b.css("position"),
						zIndex: b.css("z-index")
					}), a.each(["top", "left", "bottom", "right"], function (a, d) {
						c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
					}), b.css({
						position: "relative",
						top: 0,
						left: 0,
						right: "auto",
						bottom: "auto"
					})), b.css(e), d.css(c).show()
				},
				removeWrapper: function (b) {
					var c = document.activeElement;
					return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).trigger("focus")), b
				}
			}), a.extend(a.effects, {
				version: "1.12.1",
				define: function (b, c, d) {
					return d || (d = c, c = "effect"), a.effects.effect[b] = d, a.effects.effect[b].mode = c, d
				},
				scaledDimensions: function (a, b, c) {
					if (0 === b) return {
						height: 0,
						width: 0,
						outerHeight: 0,
						outerWidth: 0
					};
					var d = "horizontal" !== c ? (b || 100) / 100 : 1,
						e = "vertical" !== c ? (b || 100) / 100 : 1;
					return {
						height: a.height() * e,
						width: a.width() * d,
						outerHeight: a.outerHeight() * e,
						outerWidth: a.outerWidth() * d
					}
				},
				clipToBox: function (a) {
					return {
						width: a.clip.right - a.clip.left,
						height: a.clip.bottom - a.clip.top,
						left: a.clip.left,
						top: a.clip.top
					}
				},
				unshift: function (a, b, c) {
					var d = a.queue();
					b > 1 && d.splice.apply(d, [1, 0].concat(d.splice(b, c))), a.dequeue()
				},
				saveStyle: function (a) {
					a.data(j, a[0].style.cssText)
				},
				restoreStyle: function (a) {
					a[0].style.cssText = a.data(j) || "", a.removeData(j)
				},
				mode: function (a, b) {
					var c = a.is(":hidden");
					return "toggle" === b && (b = c ? "show" : "hide"), (c ? "hide" === b : "show" === b) && (b = "none"), b
				},
				getBaseline: function (a, b) {
					var c, d;
					switch (a[0]) {
						case "top":
							c = 0;
							break;
						case "middle":
							c = .5;
							break;
						case "bottom":
							c = 1;
							break;
						default:
							c = a[0] / b.height
					}
					switch (a[1]) {
						case "left":
							d = 0;
							break;
						case "center":
							d = .5;
							break;
						case "right":
							d = 1;
							break;
						default:
							d = a[1] / b.width
					}
					return {
						x: d,
						y: c
					}
				},
				createPlaceholder: function (b) {
					var c, d = b.css("position"),
						e = b.position();
					return b.css({
						marginTop: b.css("marginTop"),
						marginBottom: b.css("marginBottom"),
						marginLeft: b.css("marginLeft"),
						marginRight: b.css("marginRight")
					}).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()), /^(static|relative)/.test(d) && (d = "absolute", c = a("<" + b[0].nodeName + ">").insertAfter(b).css({
						display: /^(inline|ruby)/.test(b.css("display")) ? "inline-block" : "block",
						visibility: "hidden",
						marginTop: b.css("marginTop"),
						marginBottom: b.css("marginBottom"),
						marginLeft: b.css("marginLeft"),
						marginRight: b.css("marginRight"),
						float: b.css("float")
					}).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).addClass("ui-effects-placeholder"), b.data(i + "placeholder", c)), b.css({
						position: d,
						left: e.left,
						top: e.top
					}), c
				},
				removePlaceholder: function (a) {
					var b = i + "placeholder",
						c = a.data(b);
					c && (c.remove(), a.removeData(b))
				},
				cleanUp: function (b) {
					a.effects.restoreStyle(b), a.effects.removePlaceholder(b)
				},
				setTransition: function (b, c, d, e) {
					return e = e || {}, a.each(c, function (a, c) {
						var f = b.cssUnit(c);
						f[0] > 0 && (e[c] = f[0] * d + f[1])
					}), e
				}
			}), a.fn.extend({
				effect: function () {
					function m(b) {
						function g() {
							f.removeData(k), a.effects.cleanUp(f), "hide" === c.mode && f.hide(), l()
						}

						function l() {
							a.isFunction(h) && h.call(f[0]), a.isFunction(b) && b()
						}
						var f = a(this);
						c.mode = j.shift(), a.uiBackCompat === !1 || e ? "none" === c.mode ? (f[i](), l()) : d.call(f[0], c, g) : (f.is(":hidden") ? "hide" === i : "show" === i) ? (f[i](), l()) : d.call(f[0], c, l)
					}
					var c = b.apply(this, arguments),
						d = a.effects.effect[c.effect],
						e = d.mode,
						f = c.queue,
						g = f || "fx",
						h = c.complete,
						i = c.mode,
						j = [],
						l = function (b) {
							var c = a(this),
								d = a.effects.mode(c, i) || e;
							c.data(k, !0), j.push(d), e && ("show" === d || d === e && "hide" === d) && c.show(), e && "none" === d || a.effects.saveStyle(c), a.isFunction(b) && b()
						};
					return a.fx.off || !d ? i ? this[i](c.duration, h) : this.each(function () {
						h && h.call(this)
					}) : f === !1 ? this.each(l).each(m) : this.queue(g, l).queue(g, m)
				},
				show: function (a) {
					return function (d) {
						if (c(d)) return a.apply(this, arguments);
						var e = b.apply(this, arguments);
						return e.mode = "show",
							this.effect.call(this, e)
					}
				}(a.fn.show),
				hide: function (a) {
					return function (d) {
						if (c(d)) return a.apply(this, arguments);
						var e = b.apply(this, arguments);
						return e.mode = "hide", this.effect.call(this, e)
					}
				}(a.fn.hide),
				toggle: function (a) {
					return function (d) {
						if (c(d) || "boolean" == typeof d) return a.apply(this, arguments);
						var e = b.apply(this, arguments);
						return e.mode = "toggle", this.effect.call(this, e)
					}
				}(a.fn.toggle),
				cssUnit: function (b) {
					var c = this.css(b),
						d = [];
					return a.each(["em", "px", "%", "pt"], function (a, b) {
						c.indexOf(b) > 0 && (d = [parseFloat(c), b])
					}), d
				},
				cssClip: function (a) {
					return a ? this.css("clip", "rect(" + a.top + "px " + a.right + "px " + a.bottom + "px " + a.left + "px)") : d(this.css("clip"), this)
				},
				transfer: function (b, c) {
					var d = a(this),
						e = a(b.to),
						f = "fixed" === e.css("position"),
						g = a("body"),
						h = f ? g.scrollTop() : 0,
						i = f ? g.scrollLeft() : 0,
						j = e.offset(),
						k = {
							top: j.top - h,
							left: j.left - i,
							height: e.innerHeight(),
							width: e.innerWidth()
						},
						l = d.offset(),
						m = a("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(b.className).css({
							top: l.top - h,
							left: l.left - i,
							height: d.innerHeight(),
							width: d.innerWidth(),
							position: f ? "fixed" : "absolute"
						}).animate(k, b.duration, b.easing, function () {
							m.remove(), a.isFunction(c) && c()
						})
				}
			}), a.fx.step.clip = function (b) {
				b.clipInit || (b.start = a(b.elem).cssClip(), "string" == typeof b.end && (b.end = d(b.end, b.elem)), b.clipInit = !0), a(b.elem).cssClip({
					top: b.pos * (b.end.top - b.start.top) + b.start.top,
					right: b.pos * (b.end.right - b.start.right) + b.start.right,
					bottom: b.pos * (b.end.bottom - b.start.bottom) + b.start.bottom,
					left: b.pos * (b.end.left - b.start.left) + b.start.left
				})
			}
		}(),
		function () {
			var b = {};
			a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (a, c) {
				b[c] = function (b) {
					return Math.pow(b, a + 2)
				}
			}), a.extend(b, {
				Sine: function (a) {
					return 1 - Math.cos(a * Math.PI / 2)
				},
				Circ: function (a) {
					return 1 - Math.sqrt(1 - a * a)
				},
				Elastic: function (a) {
					return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15)
				},
				Back: function (a) {
					return a * a * (3 * a - 2)
				},
				Bounce: function (a) {
					for (var b, c = 4; a < ((b = Math.pow(2, --c)) - 1) / 11;);
					return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2)
				}
			}), a.each(b, function (b, c) {
				a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function (a) {
					return 1 - c(1 - a)
				}, a.easing["easeInOut" + b] = function (a) {
					return a < .5 ? c(2 * a) / 2 : 1 - c(a * -2 + 2) / 2
				}
			})
		}();
	var m, m = a.effects;
	a.effects.define("blind", "hide", function (b, c) {
		var d = {
				up: ["bottom", "top"],
				vertical: ["bottom", "top"],
				down: ["top", "bottom"],
				left: ["right", "left"],
				horizontal: ["right", "left"],
				right: ["left", "right"]
			},
			e = a(this),
			f = b.direction || "up",
			g = e.cssClip(),
			h = {
				clip: a.extend({}, g)
			},
			i = a.effects.createPlaceholder(e);
		h.clip[d[f][0]] = h.clip[d[f][1]], "show" === b.mode && (e.cssClip(h.clip), i && i.css(a.effects.clipToBox(h)), h.clip = g), i && i.animate(a.effects.clipToBox(h), b.duration, b.easing), e.animate(h, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: c
		})
	}), a.effects.define("bounce", function (b, c) {
		var d, e, f, g = a(this),
			h = b.mode,
			i = "hide" === h,
			j = "show" === h,
			k = b.direction || "up",
			l = b.distance,
			m = b.times || 5,
			n = 2 * m + (j || i ? 1 : 0),
			o = b.duration / n,
			p = b.easing,
			q = "up" === k || "down" === k ? "top" : "left",
			r = "up" === k || "left" === k,
			s = 0,
			t = g.queue().length;
		for (a.effects.createPlaceholder(g), f = g.css(q), l || (l = g["top" === q ? "outerHeight" : "outerWidth"]() / 3), j && (e = {
				opacity: 1
			}, e[q] = f, g.css("opacity", 0).css(q, r ? 2 * -l : 2 * l).animate(e, o, p)), i && (l /= Math.pow(2, m - 1)), e = {}, e[q] = f; s < m; s++) d = {}, d[q] = (r ? "-=" : "+=") + l, g.animate(d, o, p).animate(e, o, p), l = i ? 2 * l : l / 2;
		i && (d = {
			opacity: 0
		}, d[q] = (r ? "-=" : "+=") + l, g.animate(d, o, p)), g.queue(c), a.effects.unshift(g, t, n + 1)
	}), a.effects.define("clip", "hide", function (b, c) {
		var d, e = {},
			f = a(this),
			g = b.direction || "vertical",
			h = "both" === g,
			i = h || "horizontal" === g,
			j = h || "vertical" === g;
		d = f.cssClip(), e.clip = {
			top: j ? (d.bottom - d.top) / 2 : d.top,
			right: i ? (d.right - d.left) / 2 : d.right,
			bottom: j ? (d.bottom - d.top) / 2 : d.bottom,
			left: i ? (d.right - d.left) / 2 : d.left
		}, a.effects.createPlaceholder(f), "show" === b.mode && (f.cssClip(e.clip), e.clip = d), f.animate(e, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: c
		})
	}), a.effects.define("drop", "hide", function (b, c) {
		var d, e = a(this),
			f = b.mode,
			g = "show" === f,
			h = b.direction || "left",
			i = "up" === h || "down" === h ? "top" : "left",
			j = "up" === h || "left" === h ? "-=" : "+=",
			k = "+=" === j ? "-=" : "+=",
			l = {
				opacity: 0
			};
		a.effects.createPlaceholder(e), d = b.distance || e["top" === i ? "outerHeight" : "outerWidth"](!0) / 2, l[i] = j + d, g && (e.css(l), l[i] = k + d, l.opacity = 1), e.animate(l, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: c
		})
	}), a.effects.define("explode", "hide", function (b, c) {
		function s() {
			r.push(this), r.length === j * k && t()
		}

		function t() {
			l.css({
				visibility: "visible"
			}), a(r).remove(), c()
		}
		var d, e, f, g, h, i, j = b.pieces ? Math.round(Math.sqrt(b.pieces)) : 3,
			k = j,
			l = a(this),
			m = b.mode,
			n = "show" === m,
			o = l.show().css("visibility", "hidden").offset(),
			p = Math.ceil(l.outerWidth() / k),
			q = Math.ceil(l.outerHeight() / j),
			r = [];
		for (d = 0; d < j; d++)
			for (g = o.top + d * q, i = d - (j - 1) / 2, e = 0; e < k; e++) f = o.left + e * p, h = e - (k - 1) / 2, l.clone().appendTo("body").wrap("<div></div>").css({
				position: "absolute",
				visibility: "visible",
				left: -e * p,
				top: -d * q
			}).parent().addClass("ui-effects-explode").css({
				position: "absolute",
				overflow: "hidden",
				width: p,
				height: q,
				left: f + (n ? h * p : 0),
				top: g + (n ? i * q : 0),
				opacity: n ? 0 : 1
			}).animate({
				left: f + (n ? 0 : h * p),
				top: g + (n ? 0 : i * q),
				opacity: n ? 1 : 0
			}, b.duration || 500, b.easing, s)
	}), a.effects.define("fade", "toggle", function (b, c) {
		var d = "show" === b.mode;
		a(this).css("opacity", d ? 0 : 1).animate({
			opacity: d ? 1 : 0
		}, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: c
		})
	}), a.effects.define("fold", "hide", function (b, c) {
		var d = a(this),
			e = b.mode,
			f = "show" === e,
			g = "hide" === e,
			h = b.size || 15,
			i = /([0-9]+)%/.exec(h),
			j = !!b.horizFirst,
			k = j ? ["right", "bottom"] : ["bottom", "right"],
			l = b.duration / 2,
			m = a.effects.createPlaceholder(d),
			n = d.cssClip(),
			o = {
				clip: a.extend({}, n)
			},
			p = {
				clip: a.extend({}, n)
			},
			q = [n[k[0]], n[k[1]]],
			r = d.queue().length;
		i && (h = parseInt(i[1], 10) / 100 * q[g ? 0 : 1]), o.clip[k[0]] = h, p.clip[k[0]] = h, p.clip[k[1]] = 0, f && (d.cssClip(p.clip), m && m.css(a.effects.clipToBox(p)), p.clip = n), d.queue(function (c) {
			m && m.animate(a.effects.clipToBox(o), l, b.easing).animate(a.effects.clipToBox(p), l, b.easing), c()
		}).animate(o, l, b.easing).animate(p, l, b.easing).queue(c), a.effects.unshift(d, r, 4)
	}), a.effects.define("highlight", "show", function (b, c) {
		var d = a(this),
			e = {
				backgroundColor: d.css("backgroundColor")
			};
		"hide" === b.mode && (e.opacity = 0), a.effects.saveStyle(d), d.css({
			backgroundImage: "none",
			backgroundColor: b.color || "#ffff99"
		}).animate(e, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: c
		})
	}), a.effects.define("size", function (b, c) {
		var d, e, f, g = a(this),
			h = ["fontSize"],
			i = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
			j = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
			k = b.mode,
			l = "effect" !== k,
			m = b.scale || "both",
			n = b.origin || ["middle", "center"],
			o = g.css("position"),
			p = g.position(),
			q = a.effects.scaledDimensions(g),
			r = b.from || q,
			s = b.to || a.effects.scaledDimensions(g, 0);
		a.effects.createPlaceholder(g), "show" === k && (f = r, r = s, s = f), e = {
			from: {
				y: r.height / q.height,
				x: r.width / q.width
			},
			to: {
				y: s.height / q.height,
				x: s.width / q.width
			}
		}, "box" !== m && "both" !== m || (e.from.y !== e.to.y && (r = a.effects.setTransition(g, i, e.from.y, r), s = a.effects.setTransition(g, i, e.to.y, s)), e.from.x !== e.to.x && (r = a.effects.setTransition(g, j, e.from.x, r), s = a.effects.setTransition(g, j, e.to.x, s))), "content" !== m && "both" !== m || e.from.y !== e.to.y && (r = a.effects.setTransition(g, h, e.from.y, r), s = a.effects.setTransition(g, h, e.to.y, s)), n && (d = a.effects.getBaseline(n, q), r.top = (q.outerHeight - r.outerHeight) * d.y + p.top, r.left = (q.outerWidth - r.outerWidth) * d.x + p.left, s.top = (q.outerHeight - s.outerHeight) * d.y + p.top, s.left = (q.outerWidth - s.outerWidth) * d.x + p.left), g.css(r), "content" !== m && "both" !== m || (i = i.concat(["marginTop", "marginBottom"]).concat(h), j = j.concat(["marginLeft", "marginRight"]), g.find("*[width]").each(function () {
			var c = a(this),
				d = a.effects.scaledDimensions(c),
				f = {
					height: d.height * e.from.y,
					width: d.width * e.from.x,
					outerHeight: d.outerHeight * e.from.y,
					outerWidth: d.outerWidth * e.from.x
				},
				g = {
					height: d.height * e.to.y,
					width: d.width * e.to.x,
					outerHeight: d.height * e.to.y,
					outerWidth: d.width * e.to.x
				};
			e.from.y !== e.to.y && (f = a.effects.setTransition(c, i, e.from.y, f), g = a.effects.setTransition(c, i, e.to.y, g)), e.from.x !== e.to.x && (f = a.effects.setTransition(c, j, e.from.x, f), g = a.effects.setTransition(c, j, e.to.x, g)), l && a.effects.saveStyle(c), c.css(f), c.animate(g, b.duration, b.easing, function () {
				l && a.effects.restoreStyle(c)
			})
		})), g.animate(s, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: function () {
				var b = g.offset();
				0 === s.opacity && g.css("opacity", r.opacity), l || (g.css("position", "static" === o ? "relative" : o).offset(b), a.effects.saveStyle(g)), c()
			}
		})
	}), a.effects.define("scale", function (b, c) {
		var d = a(this),
			e = b.mode,
			f = parseInt(b.percent, 10) || (0 === parseInt(b.percent, 10) ? 0 : "effect" !== e ? 0 : 100),
			g = a.extend(!0, {
				from: a.effects.scaledDimensions(d),
				to: a.effects.scaledDimensions(d, f, b.direction || "both"),
				origin: b.origin || ["middle", "center"]
			}, b);
		b.fade && (g.from.opacity = 1, g.to.opacity = 0), a.effects.effect.size.call(this, g, c)
	}), a.effects.define("puff", "hide", function (b, c) {
		var d = a.extend(!0, {}, b, {
			fade: !0,
			percent: parseInt(b.percent, 10) || 150
		});
		a.effects.effect.scale.call(this, d, c)
	}), a.effects.define("pulsate", "show", function (b, c) {
		var d = a(this),
			e = b.mode,
			f = "show" === e,
			g = "hide" === e,
			h = f || g,
			i = 2 * (b.times || 5) + (h ? 1 : 0),
			j = b.duration / i,
			k = 0,
			l = 1,
			m = d.queue().length;
		for (!f && d.is(":visible") || (d.css("opacity", 0).show(), k = 1); l < i; l++) d.animate({
			opacity: k
		}, j, b.easing), k = 1 - k;
		d.animate({
			opacity: k
		}, j, b.easing), d.queue(c), a.effects.unshift(d, m, i + 1)
	}), a.effects.define("shake", function (b, c) {
		var d = 1,
			e = a(this),
			f = b.direction || "left",
			g = b.distance || 20,
			h = b.times || 3,
			i = 2 * h + 1,
			j = Math.round(b.duration / i),
			k = "up" === f || "down" === f ? "top" : "left",
			l = "up" === f || "left" === f,
			m = {},
			n = {},
			o = {},
			p = e.queue().length;
		for (a.effects.createPlaceholder(e), m[k] = (l ? "-=" : "+=") + g, n[k] = (l ? "+=" : "-=") + 2 * g, o[k] = (l ? "-=" : "+=") + 2 * g, e.animate(m, j, b.easing); d < h; d++) e.animate(n, j, b.easing).animate(o, j, b.easing);
		e.animate(n, j, b.easing).animate(m, j / 2, b.easing).queue(c), a.effects.unshift(e, p, i + 1)
	}), a.effects.define("slide", "show", function (b, c) {
		var d, e, f = a(this),
			g = {
				up: ["bottom", "top"],
				down: ["top", "bottom"],
				left: ["right", "left"],
				right: ["left", "right"]
			},
			h = b.mode,
			i = b.direction || "left",
			j = "up" === i || "down" === i ? "top" : "left",
			k = "up" === i || "left" === i,
			l = b.distance || f["top" === j ? "outerHeight" : "outerWidth"](!0),
			m = {};
		a.effects.createPlaceholder(f), d = f.cssClip(), e = f.position()[j], m[j] = (k ? -1 : 1) * l + e, m.clip = f.cssClip(), m.clip[g[i][1]] = m.clip[g[i][0]], "show" === h && (f.cssClip(m.clip), f.css(j, m[j]), m.clip = d, m[j] = e), f.animate(m, {
			queue: !1,
			duration: b.duration,
			easing: b.easing,
			complete: c
		})
	});
	a.uiBackCompat !== !1 && (m = a.effects.define("transfer", function (b, c) {
		a(this).transfer(b, c)
	}));
	a.ui.focusable = function (b, c) {
		var d, e, f, g, h, i = b.nodeName.toLowerCase();
		return "area" === i ? (d = b.parentNode, e = d.name, !(!b.href || !e || "map" !== d.nodeName.toLowerCase()) && (f = a("img[usemap='#" + e + "']"), f.length > 0 && f.is(":visible"))) : (/^(input|select|textarea|button|object)$/.test(i) ? (g = !b.disabled, g && (h = a(b).closest("fieldset")[0], h && (g = !h.disabled))) : g = "a" === i ? b.href || c : c, g && a(b).is(":visible") && C(a(b)))
	}, a.extend(a.expr[":"], {
		focusable: function (b) {
			return a.ui.focusable(b, null != a.attr(b, "tabindex"))
		}
	});
	a.ui.focusable, a.fn.form = function () {
		return "string" == typeof this[0].form ? this.closest("form") : a(this[0].form)
	}, a.ui.formResetMixin = {
		_formResetHandler: function () {
			var b = a(this);
			setTimeout(function () {
				var c = b.data("ui-form-reset-instances");
				a.each(c, function () {
					this.refresh()
				})
			})
		},
		_bindFormResetHandler: function () {
			if (this.form = this.element.form(), this.form.length) {
				var a = this.form.data("ui-form-reset-instances") || [];
				a.length || this.form.on("reset.ui-form-reset", this._formResetHandler), a.push(this), this.form.data("ui-form-reset-instances", a)
			}
		},
		_unbindFormResetHandler: function () {
			if (this.form.length) {
				var b = this.form.data("ui-form-reset-instances");
				b.splice(a.inArray(this, b), 1), b.length ? this.form.data("ui-form-reset-instances", b) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
			}
		}
	};
	"1.7" === a.fn.jquery.substring(0, 3) && (a.each(["Width", "Height"], function (b, c) {
		function g(b, c, e, f) {
			return a.each(d, function () {
				c -= parseFloat(a.css(b, "padding" + this)) || 0, e && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
			}), c
		}
		var d = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],
			e = c.toLowerCase(),
			f = {
				innerWidth: a.fn.innerWidth,
				innerHeight: a.fn.innerHeight,
				outerWidth: a.fn.outerWidth,
				outerHeight: a.fn.outerHeight
			};
		a.fn["inner" + c] = function (b) {
			return void 0 === b ? f["inner" + c].call(this) : this.each(function () {
				a(this).css(e, g(this, b) + "px")
			})
		}, a.fn["outer" + c] = function (b, d) {
			return "number" != typeof b ? f["outer" + c].call(this, b) : this.each(function () {
				a(this).css(e, g(this, b, !0, d) + "px")
			})
		}
	}), a.fn.addBack = function (a) {
		return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
	});
	a.ui.keyCode = {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}, a.ui.escapeSelector = function () {
		var a = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
		return function (b) {
			return b.replace(a, "\\$1")
		}
	}(), a.fn.labels = function () {
		var b, c, d, e, f;
		return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (e = this.eq(0).parents("label"), d = this.attr("id"), d && (b = this.eq(0).parents().last(), f = b.add(b.length ? b.siblings() : this.siblings()), c = "label[for='" + a.ui.escapeSelector(d) + "']", e = e.add(f.find(c).addBack(c))), this.pushStack(e))
	}, a.fn.scrollParent = function (b) {
		var c = this.css("position"),
			d = "absolute" === c,
			e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
			f = this.parents().filter(function () {
				var b = a(this);
				return (!d || "static" !== b.css("position")) && e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
			}).eq(0);
		return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document)
	}, a.extend(a.expr[":"], {
		tabbable: function (b) {
			var c = a.attr(b, "tabindex"),
				d = null != c;
			return (!d || c >= 0) && a.ui.focusable(b, d)
		}
	}), a.fn.extend({
		uniqueId: function () {
			var a = 0;
			return function () {
				return this.each(function () {
					this.id || (this.id = "ui-id-" + ++a)
				})
			}
		}(),
		removeUniqueId: function () {
			return this.each(function () {
				/^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
			})
		}
	}), a.widget("ui.accordion", {
		version: "1.12.1",
		options: {
			active: 0,
			animate: {},
			classes: {
				"ui-accordion-header": "ui-corner-top",
				"ui-accordion-header-collapsed": "ui-corner-all",
				"ui-accordion-content": "ui-corner-bottom"
			},
			collapsible: !1,
			event: "click",
			header: "> li > :first-child, > :not(li):even",
			heightStyle: "auto",
			icons: {
				activeHeader: "ui-icon-triangle-1-s",
				header: "ui-icon-triangle-1-e"
			},
			activate: null,
			beforeActivate: null
		},
		hideProps: {
			borderTopWidth: "hide",
			borderBottomWidth: "hide",
			paddingTop: "hide",
			paddingBottom: "hide",
			height: "hide"
		},
		showProps: {
			borderTopWidth: "show",
			borderBottomWidth: "show",
			paddingTop: "show",
			paddingBottom: "show",
			height: "show"
		},
		_create: function () {
			var b = this.options;
			this.prevShow = this.prevHide = a(), this._addClass("ui-accordion", "ui-widget ui-helper-reset"), this.element.attr("role", "tablist"), b.collapsible || b.active !== !1 && null != b.active || (b.active = 0), this._processPanels(), b.active < 0 && (b.active += this.headers.length), this._refresh()
		},
		_getCreateEventData: function () {
			return {
				header: this.active,
				panel: this.active.length ? this.active.next() : a()
			}
		},
		_createIcons: function () {
			var b, c, d = this.options.icons;
			d && (b = a("<span>"), this._addClass(b, "ui-accordion-header-icon", "ui-icon " + d.header), b.prependTo(this.headers), c = this.active.children(".ui-accordion-header-icon"), this._removeClass(c, d.header)._addClass(c, null, d.activeHeader)._addClass(this.headers, "ui-accordion-icons"))
		},
		_destroyIcons: function () {
			this._removeClass(this.headers, "ui-accordion-icons"), this.headers.children(".ui-accordion-header-icon").remove()
		},
		_destroy: function () {
			var a;
			this.element.removeAttr("role"), this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(), this._destroyIcons(), a = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && a.css("height", "")
		},
		_setOption: function (a, b) {
			return "active" === a ? void this._activate(b) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(b)), this._super(a, b), "collapsible" !== a || b || this.options.active !== !1 || this._activate(0), void("icons" === a && (this._destroyIcons(), b && this._createIcons())))
		},
		_setOptionDisabled: function (a) {
			this._super(a), this.element.attr("aria-disabled", a), this._toggleClass(null, "ui-state-disabled", !!a), this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!a)
		},
		_keydown: function (b) {
			if (!b.altKey && !b.ctrlKey) {
				var c = a.ui.keyCode,
					d = this.headers.length,
					e = this.headers.index(b.target),
					f = !1;
				switch (b.keyCode) {
					case c.RIGHT:
					case c.DOWN:
						f = this.headers[(e + 1) % d];
						break;
					case c.LEFT:
					case c.UP:
						f = this.headers[(e - 1 + d) % d];
						break;
					case c.SPACE:
					case c.ENTER:
						this._eventHandler(b);
						break;
					case c.HOME:
						f = this.headers[0];
						break;
					case c.END:
						f = this.headers[d - 1]
				}
				f && (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), a(f).trigger("focus"), b.preventDefault())
			}
		},
		_panelKeyDown: function (b) {
			b.keyCode === a.ui.keyCode.UP && b.ctrlKey && a(b.currentTarget).prev().trigger("focus")
		},
		refresh: function () {
			var b = this.options;
			this._processPanels(), b.active === !1 && b.collapsible === !0 || !this.headers.length ? (b.active = !1, this.active = a()) : b.active === !1 ? this._activate(0) : this.active.length && !a.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (b.active = !1, this.active = a()) : this._activate(Math.max(0, b.active - 1)) : b.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
		},
		_processPanels: function () {
			var a = this.headers,
				b = this.panels;
			this.headers = this.element.find(this.options.header), this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"), this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(), this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"), b && (this._off(a.not(this.headers)), this._off(b.not(this.panels)))
		},
		_refresh: function () {
			var b, c = this.options,
				d = c.heightStyle,
				e = this.element.parent();
			this.active = this._findActive(c.active), this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"), this._addClass(this.active.next(), "ui-accordion-content-active"), this.active.next().show(), this.headers.attr("role", "tab").each(function () {
				var b = a(this),
					c = b.uniqueId().attr("id"),
					d = b.next(),
					e = d.uniqueId().attr("id");
				b.attr("aria-controls", e), d.attr("aria-labelledby", c)
			}).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			}).next().attr({
				"aria-hidden": "true"
			}).hide(), this.active.length ? this.active.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			}).next().attr({
				"aria-hidden": "false"
			}) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(c.event), "fill" === d ? (b = e.height(), this.element.siblings(":visible").each(function () {
				var c = a(this),
					d = c.css("position");
				"absolute" !== d && "fixed" !== d && (b -= c.outerHeight(!0))
			}), this.headers.each(function () {
				b -= a(this).outerHeight(!0)
			}), this.headers.next().each(function () {
				a(this).height(Math.max(0, b - a(this).innerHeight() + a(this).height()))
			}).css("overflow", "auto")) : "auto" === d && (b = 0, this.headers.next().each(function () {
				var c = a(this).is(":visible");
				c || a(this).show(), b = Math.max(b, a(this).css("height", "").height()), c || a(this).hide()
			}).height(b))
		},
		_activate: function (b) {
			var c = this._findActive(b)[0];
			c !== this.active[0] && (c = c || this.active[0], this._eventHandler({
				target: c,
				currentTarget: c,
				preventDefault: a.noop
			}))
		},
		_findActive: function (b) {
			return "number" == typeof b ? this.headers.eq(b) : a()
		},
		_setupEvents: function (b) {
			var c = {
				keydown: "_keydown"
			};
			b && a.each(b.split(" "), function (a, b) {
				c[b] = "_eventHandler"
			}), this._off(this.headers.add(this.headers.next())), this._on(this.headers, c), this._on(this.headers.next(), {
				keydown: "_panelKeyDown"
			}), this._hoverable(this.headers), this._focusable(this.headers)
		},
		_eventHandler: function (b) {
			var c, d, e = this.options,
				f = this.active,
				g = a(b.currentTarget),
				h = g[0] === f[0],
				i = h && e.collapsible,
				j = i ? a() : g.next(),
				k = f.next(),
				l = {
					oldHeader: f,
					oldPanel: k,
					newHeader: i ? a() : g,
					newPanel: j
				};
			b.preventDefault(), h && !e.collapsible || this._trigger("beforeActivate", b, l) === !1 || (e.active = !i && this.headers.index(g), this.active = h ? a() : g, this._toggle(l), this._removeClass(f, "ui-accordion-header-active", "ui-state-active"), e.icons && (c = f.children(".ui-accordion-header-icon"), this._removeClass(c, null, e.icons.activeHeader)._addClass(c, null, e.icons.header)), h || (this._removeClass(g, "ui-accordion-header-collapsed")._addClass(g, "ui-accordion-header-active", "ui-state-active"), e.icons && (d = g.children(".ui-accordion-header-icon"), this._removeClass(d, null, e.icons.header)._addClass(d, null, e.icons.activeHeader)), this._addClass(g.next(), "ui-accordion-content-active")))
		},
		_toggle: function (b) {
			var c = b.newPanel,
				d = this.prevShow.length ? this.prevShow : b.oldPanel;
			this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = c, this.prevHide = d, this.options.animate ? this._animate(c, d, b) : (d.hide(), c.show(), this._toggleComplete(b)), d.attr({
				"aria-hidden": "true"
			}), d.prev().attr({
				"aria-selected": "false",
				"aria-expanded": "false"
			}), c.length && d.length ? d.prev().attr({
				tabIndex: -1,
				"aria-expanded": "false"
			}) : c.length && this.headers.filter(function () {
				return 0 === parseInt(a(this).attr("tabIndex"), 10)
			}).attr("tabIndex", -1), c.attr("aria-hidden", "false").prev().attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			})
		},
		_animate: function (a, b, c) {
			var d, e, f, g = this,
				h = 0,
				i = a.css("box-sizing"),
				j = a.length && (!b.length || a.index() < b.index()),
				k = this.options.animate || {},
				l = j && k.down || k,
				m = function () {
					g._toggleComplete(c)
				};
			return "number" == typeof l && (f = l), "string" == typeof l && (e = l), e = e || l.easing || k.easing, f = f || l.duration || k.duration, b.length ? a.length ? (d = a.show().outerHeight(), b.animate(this.hideProps, {
				duration: f,
				easing: e,
				step: function (a, b) {
					b.now = Math.round(a)
				}
			}), void a.hide().animate(this.showProps, {
				duration: f,
				easing: e,
				complete: m,
				step: function (a, c) {
					c.now = Math.round(a), "height" !== c.prop ? "content-box" === i && (h += c.now) : "content" !== g.options.heightStyle && (c.now = Math.round(d - b.outerHeight() - h), h = 0)
				}
			})) : b.animate(this.hideProps, f, e, m) : a.animate(this.showProps, f, e, m)
		},
		_toggleComplete: function (a) {
			var b = a.oldPanel,
				c = b.prev();
			this._removeClass(b, "ui-accordion-content-active"), this._removeClass(c, "ui-accordion-header-active")._addClass(c, "ui-accordion-header-collapsed"), b.length && (b.parent()[0].className = b.parent()[0].className), this._trigger("activate", null, a)
		}
	}), a.ui.safeActiveElement = function (a) {
		var b;
		try {
			b = a.activeElement
		} catch (c) {
			b = a.body
		}
		return b || (b = a.body), b.nodeName || (b = a.body), b
	}, a.widget("ui.menu", {
		version: "1.12.1",
		defaultElement: "<ul>",
		delay: 300,
		options: {
			icons: {
				submenu: "ui-icon-caret-1-e"
			},
			items: "> *",
			menus: "ul",
			position: {
				my: "left top",
				at: "right top"
			},
			role: "menu",
			blur: null,
			focus: null,
			select: null
		},
		_create: function () {
			this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().attr({
				role: this.options.role,
				tabIndex: 0
			}), this._addClass("ui-menu", "ui-widget ui-widget-content"), this._on({
				"mousedown .ui-menu-item": function (a) {
					a.preventDefault()
				},
				"click .ui-menu-item": function (b) {
					var c = a(b.target),
						d = a(a.ui.safeActiveElement(this.document[0]));
					!this.mouseHandled && c.not(".ui-state-disabled").length && (this.select(b), b.isPropagationStopped() || (this.mouseHandled = !0), c.has(".ui-menu").length ? this.expand(b) : !this.element.is(":focus") && d.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
				},
				"mouseenter .ui-menu-item": function (b) {
					if (!this.previousFilter) {
						var c = a(b.target).closest(".ui-menu-item"),
							d = a(b.currentTarget);
						c[0] === d[0] && (this._removeClass(d.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(b, d))
					}
				},
				mouseleave: "collapseAll",
				"mouseleave .ui-menu": "collapseAll",
				focus: function (a, b) {
					var c = this.active || this.element.find(this.options.items).eq(0);
					b || this.focus(a, c)
				},
				blur: function (b) {
					this._delay(function () {
						var c = !a.contains(this.element[0], a.ui.safeActiveElement(this.document[0]));
						c && this.collapseAll(b)
					})
				},
				keydown: "_keydown"
			}), this.refresh(), this._on(this.document, {
				click: function (a) {
					this._closeOnDocumentClick(a) && this.collapseAll(a), this.mouseHandled = !1
				}
			})
		},
		_destroy: function () {
			var b = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
				c = b.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
			this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(), c.children().each(function () {
				var b = a(this);
				b.data("ui-menu-submenu-caret") && b.remove()
			})
		},
		_keydown: function (b) {
			var c, d, e, f, g = !0;
			switch (b.keyCode) {
				case a.ui.keyCode.PAGE_UP:
					this.previousPage(b);
					break;
				case a.ui.keyCode.PAGE_DOWN:
					this.nextPage(b);
					break;
				case a.ui.keyCode.HOME:
					this._move("first", "first", b);
					break;
				case a.ui.keyCode.END:
					this._move("last", "last", b);
					break;
				case a.ui.keyCode.UP:
					this.previous(b);
					break;
				case a.ui.keyCode.DOWN:
					this.next(b);
					break;
				case a.ui.keyCode.LEFT:
					this.collapse(b);
					break;
				case a.ui.keyCode.RIGHT:
					this.active && !this.active.is(".ui-state-disabled") && this.expand(b);
					break;
				case a.ui.keyCode.ENTER:
				case a.ui.keyCode.SPACE:
					this._activate(b);
					break;
				case a.ui.keyCode.ESCAPE:
					this.collapse(b);
					break;
				default:
					g = !1, d = this.previousFilter || "", f = !1, e = b.keyCode >= 96 && b.keyCode <= 105 ? (b.keyCode - 96).toString() : String.fromCharCode(b.keyCode), clearTimeout(this.filterTimer), e === d ? f = !0 : e = d + e, c = this._filterMenuItems(e), c = f && c.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : c, c.length || (e = String.fromCharCode(b.keyCode), c = this._filterMenuItems(e)), c.length ? (this.focus(b, c), this.previousFilter = e, this.filterTimer = this._delay(function () {
						delete this.previousFilter
					}, 1e3)) : delete this.previousFilter
			}
			g && b.preventDefault()
		},
		_activate: function (a) {
			this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(a) : this.select(a))
		},
		refresh: function () {
			var b, c, d, e, f, g = this,
				h = this.options.icons.submenu,
				i = this.element.find(this.options.menus);
			this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length), d = i.filter(":not(.ui-menu)").hide().attr({
				role: this.options.role,
				"aria-hidden": "true",
				"aria-expanded": "false"
			}).each(function () {
				var b = a(this),
					c = b.prev(),
					d = a("<span>").data("ui-menu-submenu-caret", !0);
				g._addClass(d, "ui-menu-icon", "ui-icon " + h), c.attr("aria-haspopup", "true").prepend(d), b.attr("aria-labelledby", c.attr("id"))
			}), this._addClass(d, "ui-menu", "ui-widget ui-widget-content ui-front"), b = i.add(this.element), c = b.find(this.options.items), c.not(".ui-menu-item").each(function () {
				var b = a(this);
				g._isDivider(b) && g._addClass(b, "ui-menu-divider", "ui-widget-content")
			}), e = c.not(".ui-menu-item, .ui-menu-divider"), f = e.children().not(".ui-menu").uniqueId().attr({
				tabIndex: -1,
				role: this._itemRole()
			}), this._addClass(e, "ui-menu-item")._addClass(f, "ui-menu-item-wrapper"), c.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !a.contains(this.element[0], this.active[0]) && this.blur()
		},
		_itemRole: function () {
			return {
				menu: "menuitem",
				listbox: "option"
			} [this.options.role]
		},
		_setOption: function (a, b) {
			if ("icons" === a) {
				var c = this.element.find(".ui-menu-icon");
				this._removeClass(c, null, this.options.icons.submenu)._addClass(c, null, b.submenu)
			}
			this._super(a, b)
		},
		_setOptionDisabled: function (a) {
			this._super(a), this.element.attr("aria-disabled", String(a)), this._toggleClass(null, "ui-state-disabled", !!a)
		},
		focus: function (a, b) {
			var c, d, e;
			this.blur(a, a && "focus" === a.type), this._scrollIntoView(b), this.active = b.first(), d = this.active.children(".ui-menu-item-wrapper"), this._addClass(d, null, "ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", d.attr("id")), e = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"), this._addClass(e, null, "ui-state-active"), a && "keydown" === a.type ? this._close() : this.timer = this._delay(function () {
				this._close()
			}, this.delay), c = b.children(".ui-menu"), c.length && a && /^mouse/.test(a.type) && this._startOpening(c), this.activeMenu = b.parent(), this._trigger("focus", a, {
				item: b
			})
		},
		_scrollIntoView: function (b) {
			var c, d, e, f, g, h;
			this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, d = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, e = b.offset().top - this.activeMenu.offset().top - c - d, f = this.activeMenu.scrollTop(), g = this.activeMenu.height(), h = b.outerHeight(), e < 0 ? this.activeMenu.scrollTop(f + e) : e + h > g && this.activeMenu.scrollTop(f + e - g + h))
		},
		blur: function (a, b) {
			b || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", a, {
				item: this.active
			}), this.active = null)
		},
		_startOpening: function (a) {
			clearTimeout(this.timer), "true" === a.attr("aria-hidden") && (this.timer = this._delay(function () {
				this._close(), this._open(a)
			}, this.delay))
		},
		_open: function (b) {
			var c = a.extend({ of: this.active
			}, this.options.position);
			clearTimeout(this.timer), this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true"), b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c)
		},
		collapseAll: function (b, c) {
			clearTimeout(this.timer), this.timer = this._delay(function () {
				var d = c ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
				d.length || (d = this.element), this._close(d), this.blur(b), this._removeClass(d.find(".ui-state-active"), null, "ui-state-active"), this.activeMenu = d
			}, this.delay)
		},
		_close: function (a) {
			a || (a = this.active ? this.active.parent() : this.element), a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false")
		},
		_closeOnDocumentClick: function (b) {
			return !a(b.target).closest(".ui-menu").length
		},
		_isDivider: function (a) {
			return !/[^\-\u2014\u2013\s]/.test(a.text())
		},
		collapse: function (a) {
			var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
			b && b.length && (this._close(), this.focus(a, b))
		},
		expand: function (a) {
			var b = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
			b && b.length && (this._open(b.parent()), this._delay(function () {
				this.focus(a, b)
			}))
		},
		next: function (a) {
			this._move("next", "first", a)
		},
		previous: function (a) {
			this._move("prev", "last", a)
		},
		isFirstItem: function () {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		},
		isLastItem: function () {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		},
		_move: function (a, b, c) {
			var d;
			this.active && (d = "first" === a || "last" === a ? this.active["first" === a ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[a + "All"](".ui-menu-item").eq(0)), d && d.length && this.active || (d = this.activeMenu.find(this.options.items)[b]()), this.focus(c, d)
		},
		nextPage: function (b) {
			var c, d, e;
			return this.active ? void(this.isLastItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
				return c = a(this), c.offset().top - d - e < 0
			}), this.focus(b, c)) : this.focus(b, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(b)
		},
		previousPage: function (b) {
			var c, d, e;
			return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
				return c = a(this), c.offset().top - d + e > 0
			}), this.focus(b, c)) : this.focus(b, this.activeMenu.find(this.options.items).first()))) : void this.next(b)
		},
		_hasScroll: function () {
			return this.element.outerHeight() < this.element.prop("scrollHeight")
		},
		select: function (b) {
			this.active = this.active || a(b.target).closest(".ui-menu-item");
			var c = {
				item: this.active
			};
			this.active.has(".ui-menu").length || this.collapseAll(b, !0), this._trigger("select", b, c)
		},
		_filterMenuItems: function (b) {
			var c = b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
				d = new RegExp("^" + c, "i");
			return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () {
				return d.test(a.trim(a(this).children(".ui-menu-item-wrapper").text()))
			})
		}
	});
	a.widget("ui.autocomplete", {
		version: "1.12.1",
		defaultElement: "<input>",
		options: {
			appendTo: null,
			autoFocus: !1,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null,
			change: null,
			close: null,
			focus: null,
			open: null,
			response: null,
			search: null,
			select: null
		},
		requestIndex: 0,
		pending: 0,
		_create: function () {
			var b, c, d, e = this.element[0].nodeName.toLowerCase(),
				f = "textarea" === e,
				g = "input" === e;
			this.isMultiLine = f || !g && this._isContentEditable(this.element), this.valueMethod = this.element[f || g ? "val" : "text"], this.isNewMenu = !0, this._addClass("ui-autocomplete-input"), this.element.attr("autocomplete", "off"), this._on(this.element, {
				keydown: function (e) {
					if (this.element.prop("readOnly")) return b = !0, d = !0, void(c = !0);
					b = !1, d = !1, c = !1;
					var f = a.ui.keyCode;
					switch (e.keyCode) {
						case f.PAGE_UP:
							b = !0, this._move("previousPage", e);
							break;
						case f.PAGE_DOWN:
							b = !0, this._move("nextPage", e);
							break;
						case f.UP:
							b = !0, this._keyEvent("previous", e);
							break;
						case f.DOWN:
							b = !0, this._keyEvent("next", e);
							break;
						case f.ENTER:
							this.menu.active && (b = !0, e.preventDefault(), this.menu.select(e));
							break;
						case f.TAB:
							this.menu.active && this.menu.select(e);
							break;
						case f.ESCAPE:
							this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(e), e.preventDefault());
							break;
						default:
							c = !0, this._searchTimeout(e)
					}
				},
				keypress: function (d) {
					if (b) return b = !1, void(this.isMultiLine && !this.menu.element.is(":visible") || d.preventDefault());
					if (!c) {
						var e = a.ui.keyCode;
						switch (d.keyCode) {
							case e.PAGE_UP:
								this._move("previousPage", d);
								break;
							case e.PAGE_DOWN:
								this._move("nextPage", d);
								break;
							case e.UP:
								this._keyEvent("previous", d);
								break;
							case e.DOWN:
								this._keyEvent("next", d)
						}
					}
				},
				input: function (a) {
					return d ? (d = !1, void a.preventDefault()) : void this._searchTimeout(a)
				},
				focus: function () {
					this.selectedItem = null, this.previous = this._value()
				},
				blur: function (a) {
					return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(a), void this._change(a))
				}
			}), this._initSource(), this.menu = a("<ul>").appendTo(this._appendTo()).menu({
				role: null
			}).hide().menu("instance"), this._addClass(this.menu.element, "ui-autocomplete", "ui-front"), this._on(this.menu.element, {
				mousedown: function (b) {
					b.preventDefault(), this.cancelBlur = !0, this._delay(function () {
						delete this.cancelBlur, this.element[0] !== a.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus")
					})
				},
				menufocus: function (b, c) {
					var d, e;
					return this.isNewMenu && (this.isNewMenu = !1, b.originalEvent && /^mouse/.test(b.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function () {
						a(b.target).trigger(b.originalEvent)
					})) : (e = c.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", b, {
						item: e
					}) && b.originalEvent && /^key/.test(b.originalEvent.type) && this._value(e.value), d = c.item.attr("aria-label") || e.value, void(d && a.trim(d).length && (this.liveRegion.children().hide(), a("<div>").text(d).appendTo(this.liveRegion))))
				},
				menuselect: function (b, c) {
					var d = c.item.data("ui-autocomplete-item"),
						e = this.previous;
					this.element[0] !== a.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = e, this._delay(function () {
						this.previous = e, this.selectedItem = d
					})), !1 !== this._trigger("select", b, {
						item: d
					}) && this._value(d.value), this.term = this._value(), this.close(b), this.selectedItem = d
				}
			}), this.liveRegion = a("<div>", {
				role: "status",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			}).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this._on(this.window, {
				beforeunload: function () {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_destroy: function () {
			clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
		},
		_setOption: function (a, b) {
			this._super(a, b), "source" === a && this._initSource(), "appendTo" === a && this.menu.element.appendTo(this._appendTo()), "disabled" === a && b && this.xhr && this.xhr.abort()
		},
		_isEventTargetInWidget: function (b) {
			var c = this.menu.element[0];
			return b.target === this.element[0] || b.target === c || a.contains(c, b.target)
		},
		_closeOnClickOutside: function (a) {
			this._isEventTargetInWidget(a) || this.close()
		},
		_appendTo: function () {
			var b = this.options.appendTo;
			return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), b && b[0] || (b = this.element.closest(".ui-front, dialog")), b.length || (b = this.document[0].body), b
		},
		_initSource: function () {
			var b, c, d = this;
			a.isArray(this.options.source) ? (b = this.options.source, this.source = function (c, d) {
				d(a.ui.autocomplete.filter(b, c.term))
			}) : "string" == typeof this.options.source ? (c = this.options.source, this.source = function (b, e) {
				d.xhr && d.xhr.abort(), d.xhr = a.ajax({
					url: c,
					data: b,
					dataType: "json",
					success: function (a) {
						e(a)
					},
					error: function () {
						e([])
					}
				})
			}) : this.source = this.options.source
		},
		_searchTimeout: function (a) {
			clearTimeout(this.searching), this.searching = this._delay(function () {
				var b = this.term === this._value(),
					c = this.menu.element.is(":visible"),
					d = a.altKey || a.ctrlKey || a.metaKey || a.shiftKey;
				b && (!b || c || d) || (this.selectedItem = null, this.search(null, a))
			}, this.options.delay)
		},
		search: function (a, b) {
			return a = null != a ? a : this._value(), this.term = this._value(), a.length < this.options.minLength ? this.close(b) : this._trigger("search", b) !== !1 ? this._search(a) : void 0
		},
		_search: function (a) {
			this.pending++, this._addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
				term: a
			}, this._response())
		},
		_response: function () {
			var b = ++this.requestIndex;
			return a.proxy(function (a) {
				b === this.requestIndex && this.__response(a), this.pending--, this.pending || this._removeClass("ui-autocomplete-loading")
			}, this)
		},
		__response: function (a) {
			a && (a = this._normalize(a)), this._trigger("response", null, {
				content: a
			}), !this.options.disabled && a && a.length && !this.cancelSearch ? (this._suggest(a), this._trigger("open")) : this._close()
		},
		close: function (a) {
			this.cancelSearch = !0, this._close(a)
		},
		_close: function (a) {
			this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", a))
		},
		_change: function (a) {
			this.previous !== this._value() && this._trigger("change", a, {
				item: this.selectedItem
			})
		},
		_normalize: function (b) {
			return b.length && b[0].label && b[0].value ? b : a.map(b, function (b) {
				return "string" == typeof b ? {
					label: b,
					value: b
				} : a.extend({}, b, {
					label: b.label || b.value,
					value: b.value || b.label
				})
			})
		},
		_suggest: function (b) {
			var c = this.menu.element.empty();
			this._renderMenu(c, b), this.isNewMenu = !0, this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({ of: this.element
			}, this.options.position)), this.options.autoFocus && this.menu.next(), this._on(this.document, {
				mousedown: "_closeOnClickOutside"
			})
		},
		_resizeMenu: function () {
			var a = this.menu.element;
			a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
		},
		_renderMenu: function (b, c) {
			var d = this;
			a.each(c, function (a, c) {
				d._renderItemData(b, c)
			})
		},
		_renderItemData: function (a, b) {
			return this._renderItem(a, b).data("ui-autocomplete-item", b)
		},
		_renderItem: function (b, c) {
			return a("<li>").append(a("<div>").text(c.label)).appendTo(b)
		},
		_move: function (a, b) {
			return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(a) || this.menu.isLastItem() && /^next/.test(a) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[a](b) : void this.search(null, b)
		},
		widget: function () {
			return this.menu.element
		},
		_value: function () {
			return this.valueMethod.apply(this.element, arguments)
		},
		_keyEvent: function (a, b) {
			this.isMultiLine && !this.menu.element.is(":visible") || (this._move(a, b), b.preventDefault())
		},
		_isContentEditable: function (a) {
			if (!a.length) return !1;
			var b = a.prop("contentEditable");
			return "inherit" === b ? this._isContentEditable(a.parent()) : "true" === b
		}
	}), a.extend(a.ui.autocomplete, {
		escapeRegex: function (a) {
			return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
		},
		filter: function (b, c) {
			var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
			return a.grep(b, function (a) {
				return d.test(a.label || a.value || a)
			})
		}
	}), a.widget("ui.autocomplete", a.ui.autocomplete, {
		options: {
			messages: {
				noResults: "No search results.",
				results: function (a) {
					return a + (a > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
				}
			}
		},
		__response: function (b) {
			var c;
			this._superApply(arguments), this.options.disabled || this.cancelSearch || (c = b && b.length ? this.options.messages.results(b.length) : this.options.messages.noResults, this.liveRegion.children().hide(), a("<div>").text(c).appendTo(this.liveRegion))
		}
	});
	var Q = (a.ui.autocomplete, /ui-corner-([a-z]){2,6}/g);
	a.widget("ui.controlgroup", {
		version: "1.12.1",
		defaultElement: "<div>",
		options: {
			direction: "horizontal",
			disabled: null,
			onlyVisible: !0,
			items: {
				button: "input[type=button], input[type=submit], input[type=reset], button, a",
				controlgroupLabel: ".ui-controlgroup-label",
				checkboxradio: "input[type='checkbox'], input[type='radio']",
				selectmenu: "select",
				spinner: ".ui-spinner-input"
			}
		},
		_create: function () {
			this._enhance()
		},
		_enhance: function () {
			this.element.attr("role", "toolbar"), this.refresh()
		},
		_destroy: function () {
			this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"), this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
		},
		_initWidgets: function () {
			var b = this,
				c = [];
			a.each(this.options.items, function (d, e) {
				var f, g = {};
				if (e) return "controlgroupLabel" === d ? (f = b.element.find(e), f.each(function () {
					var b = a(this);
					b.children(".ui-controlgroup-label-contents").length || b.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")
				}), b._addClass(f, null, "ui-widget ui-widget-content ui-state-default"), void(c = c.concat(f.get()))) : void(a.fn[d] && (g = b["_" + d + "Options"] ? b["_" + d + "Options"]("middle") : {
					classes: {}
				}, b.element.find(e).each(function () {
					var e = a(this),
						f = e[d]("instance"),
						h = a.widget.extend({}, g);
					if ("button" !== d || !e.parent(".ui-spinner").length) {
						f || (f = e[d]()[d]("instance")), f && (h.classes = b._resolveClassesValues(h.classes, f)), e[d](h);
						var i = e[d]("widget");
						a.data(i[0], "ui-controlgroup-data", f ? f : e[d]("instance")), c.push(i[0])
					}
				})))
			}), this.childWidgets = a(a.unique(c)), this._addClass(this.childWidgets, "ui-controlgroup-item")
		},
		_callChildMethod: function (b) {
			this.childWidgets.each(function () {
				var c = a(this),
					d = c.data("ui-controlgroup-data");
				d && d[b] && d[b]()
			})
		},
		_updateCornerClass: function (a, b) {
			var c = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",
				d = this._buildSimpleOptions(b, "label").classes.label;
			this._removeClass(a, null, c), this._addClass(a, null, d)
		},
		_buildSimpleOptions: function (a, b) {
			var c = "vertical" === this.options.direction,
				d = {
					classes: {}
				};
			return d.classes[b] = {
				middle: "",
				first: "ui-corner-" + (c ? "top" : "left"),
				last: "ui-corner-" + (c ? "bottom" : "right"),
				only: "ui-corner-all"
			} [a], d
		},
		_spinnerOptions: function (a) {
			var b = this._buildSimpleOptions(a, "ui-spinner");
			return b.classes["ui-spinner-up"] = "", b.classes["ui-spinner-down"] = "", b
		},
		_buttonOptions: function (a) {
			return this._buildSimpleOptions(a, "ui-button")
		},
		_checkboxradioOptions: function (a) {
			return this._buildSimpleOptions(a, "ui-checkboxradio-label")
		},
		_selectmenuOptions: function (a) {
			var b = "vertical" === this.options.direction;
			return {
				width: !!b && "auto",
				classes: {
					middle: {
						"ui-selectmenu-button-open": "",
						"ui-selectmenu-button-closed": ""
					},
					first: {
						"ui-selectmenu-button-open": "ui-corner-" + (b ? "top" : "tl"),
						"ui-selectmenu-button-closed": "ui-corner-" + (b ? "top" : "left")
					},
					last: {
						"ui-selectmenu-button-open": b ? "" : "ui-corner-tr",
						"ui-selectmenu-button-closed": "ui-corner-" + (b ? "bottom" : "right")
					},
					only: {
						"ui-selectmenu-button-open": "ui-corner-top",
						"ui-selectmenu-button-closed": "ui-corner-all"
					}
				} [a]
			}
		},
		_resolveClassesValues: function (b, c) {
			var d = {};
			return a.each(b, function (e) {
				var f = c.options.classes[e] || "";
				f = a.trim(f.replace(Q, "")), d[e] = (f + " " + b[e]).replace(/\s+/g, " ")
			}), d
		},
		_setOption: function (a, b) {
			return "direction" === a && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(a, b), "disabled" === a ? void this._callChildMethod(b ? "disable" : "enable") : void this.refresh()
		},
		refresh: function () {
			var b, c = this;
			this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"), this._initWidgets(), b = this.childWidgets, this.options.onlyVisible && (b = b.filter(":visible")), b.length && (a.each(["first", "last"], function (a, d) {
				var e = b[d]().data("ui-controlgroup-data");
				if (e && c["_" + e.widgetName + "Options"]) {
					var f = c["_" + e.widgetName + "Options"](1 === b.length ? "only" : d);
					f.classes = c._resolveClassesValues(f.classes, e), e.element[e.widgetName](f)
				} else c._updateCornerClass(b[d](), d)
			}), this._callChildMethod("refresh"))
		}
	});
	a.widget("ui.checkboxradio", [a.ui.formResetMixin, {
		version: "1.12.1",
		options: {
			disabled: null,
			label: null,
			icon: !0,
			classes: {
				"ui-checkboxradio-label": "ui-corner-all",
				"ui-checkboxradio-icon": "ui-corner-all"
			}
		},
		_getCreateOptions: function () {
			var b, c, d = this,
				e = this._super() || {};
			return this._readType(), c = this.element.labels(), this.label = a(c[c.length - 1]), this.label.length || a.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element[0]).each(function () {
				d.originalLabel += 3 === this.nodeType ? a(this).text() : this.outerHTML
			}), this.originalLabel && (e.label = this.originalLabel), b = this.element[0].disabled, null != b && (e.disabled = b), e
		},
		_create: function () {
			var a = this.element[0].checked;
			this._bindFormResetHandler(), null == this.options.disabled && (this.options.disabled = this.element[0].disabled), this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"), this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), a && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover")), this._on({
				change: "_toggleClasses",
				focus: function () {
					this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
				},
				blur: function () {
					this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
				}
			})
		},
		_readType: function () {
			var b = this.element[0].nodeName.toLowerCase();
			this.type = this.element[0].type, "input" === b && /radio|checkbox/.test(this.type) || a.error("Can't create checkboxradio on element.nodeName=" + b + " and element.type=" + this.type)
		},
		_enhance: function () {
			this._updateIcon(this.element[0].checked)
		},
		widget: function () {
			return this.label
		},
		_getRadioGroup: function () {
			var b, c = this.element[0].name,
				d = "input[name='" + a.ui.escapeSelector(c) + "']";
			return c ? (b = this.form.length ? a(this.form[0].elements).filter(d) : a(d).filter(function () {
				return 0 === a(this).form().length
			}), b.not(this.element)) : a([])
		},
		_toggleClasses: function () {
			var b = this.element[0].checked;
			this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", b), this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", b)._toggleClass(this.icon, null, "ui-icon-blank", !b), "radio" === this.type && this._getRadioGroup().each(function () {
				var b = a(this).checkboxradio("instance");
				b && b._removeClass(b.label, "ui-checkboxradio-checked", "ui-state-active")
			})
		},
		_destroy: function () {
			this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove())
		},
		_setOption: function (a, b) {
			if ("label" !== a || b) return this._super(a, b), "disabled" === a ? (this._toggleClass(this.label, null, "ui-state-disabled", b), void(this.element[0].disabled = b)) : void this.refresh()
		},
		_updateIcon: function (b) {
			var c = "ui-icon ui-icon-background ";
			this.options.icon ? (this.icon || (this.icon = a("<span>"), this.iconSpace = a("<span> </span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (c += b ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, b ? "ui-icon-blank" : "ui-icon-check")) : c += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", c), b || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon)
		},
		_updateLabel: function () {
			var a = this.label.contents().not(this.element[0]);
			this.icon && (a = a.not(this.icon[0])), this.iconSpace && (a = a.not(this.iconSpace[0])), a.remove(), this.label.append(this.options.label)
		},
		refresh: function () {
			var a = this.element[0].checked,
				b = this.element[0].disabled;
			this._updateIcon(a), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", a), null !== this.options.label && this._updateLabel(), b !== this.options.disabled && this._setOptions({
				disabled: b
			})
		}
	}]);
	a.ui.checkboxradio;
	a.widget("ui.button", {
		version: "1.12.1",
		defaultElement: "<button>",
		options: {
			classes: {
				"ui-button": "ui-corner-all"
			},
			disabled: null,
			icon: null,
			iconPosition: "beginning",
			label: null,
			showLabel: !0
		},
		_getCreateOptions: function () {
			var a, b = this._super() || {};
			return this.isInput = this.element.is("input"), a = this.element[0].disabled, null != a && (b.disabled = a), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (b.label = this.originalLabel), b
		},
		_create: function () {
			!this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({
				keyup: function (b) {
					b.keyCode === a.ui.keyCode.SPACE && (b.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
				}
			})
		},
		_enhance: function () {
			this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip())
		},
		_updateTooltip: function () {
			this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label)
		},
		_updateIcon: function (b, c) {
			var d = "iconPosition" !== b,
				e = d ? this.options.iconPosition : c,
				f = "top" === e || "bottom" === e;
			this.icon ? d && this._removeClass(this.icon, null, this.options.icon) : (this.icon = a("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), d && this._addClass(this.icon, null, c), this._attachIcon(e), f ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = a("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(e))
		},
		_destroy: function () {
			this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title")
		},
		_attachIconSpace: function (a) {
			this.icon[/^(?:end|bottom)/.test(a) ? "before" : "after"](this.iconSpace)
		},
		_attachIcon: function (a) {
			this.element[/^(?:end|bottom)/.test(a) ? "append" : "prepend"](this.icon)
		},
		_setOptions: function (a) {
			var b = void 0 === a.showLabel ? this.options.showLabel : a.showLabel,
				c = void 0 === a.icon ? this.options.icon : a.icon;
			b || c || (a.showLabel = !0), this._super(a)
		},
		_setOption: function (a, b) {
			"icon" === a && (b ? this._updateIcon(a, b) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), "iconPosition" === a && this._updateIcon(a, b), "showLabel" === a && (this._toggleClass("ui-button-icon-only", null, !b), this._updateTooltip()), "label" === a && (this.isInput ? this.element.val(b) : (this.element.html(b), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(a, b), "disabled" === a && (this._toggleClass(null, "ui-state-disabled", b), this.element[0].disabled = b, b && this.element.blur())
		},
		refresh: function () {
			var a = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
			a !== this.options.disabled && this._setOptions({
				disabled: a
			}), this._updateTooltip()
		}
	}), a.uiBackCompat !== !1 && (a.widget("ui.button", a.ui.button, {
		options: {
			text: !0,
			icons: {
				primary: null,
				secondary: null
			}
		},
		_create: function () {
			this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end"), this._super()
		},
		_setOption: function (a, b) {
			return "text" === a ? void this._super("showLabel", b) : ("showLabel" === a && (this.options.text = b), "icon" === a && (this.options.icons.primary = b), "icons" === a && (b.primary ? (this._super("icon", b.primary), this._super("iconPosition", "beginning")) : b.secondary && (this._super("icon", b.secondary), this._super("iconPosition", "end"))), void this._superApply(arguments))
		}
	}), a.fn.button = function (b) {
		return function () {
			return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? b.apply(this, arguments) : (a.ui.checkboxradio || a.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({
				icon: !1
			}) : this.checkboxradio.apply(this, arguments))
		}
	}(a.fn.button), a.fn.buttonset = function () {
		return a.ui.controlgroup || a.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {
			button: arguments[0].items
		}), this.controlgroup.apply(this, arguments))
	});
	a.ui.button;
	a.extend(a.ui, {
		datepicker: {
			version: "1.12.1"
		}
	});
	var U;
	a.extend(W.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		_widgetDatepicker: function () {
			return this.dpDiv
		},
		setDefaults: function (a) {
			return Z(this._defaults, a || {}), this
		},
		_attachDatepicker: function (b, c) {
			var d, e, f;
			d = b.nodeName.toLowerCase(), e = "div" === d || "span" === d, b.id || (this.uuid += 1, b.id = "dp" + this.uuid), f = this._newInst(a(b), e), f.settings = a.extend({}, c || {}), "input" === d ? this._connectDatepicker(b, f) : e && this._inlineDatepicker(b, f)
		},
		_newInst: function (b, c) {
			var d = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
			return {
				id: d,
				input: b,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: c,
				dpDiv: c ? X(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
			}
		},
		_connectDatepicker: function (b, c) {
			var d = a(b);
			c.append = a([]), c.trigger = a([]), d.hasClass(this.markerClassName) || (this._attachments(d, c), d.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(c), a.data(b, "datepicker", c), c.settings.disabled && this._disableDatepicker(b))
		},
		_attachments: function (b, c) {
			var d, e, f, g = this._get(c, "appendText"),
				h = this._get(c, "isRTL");
			c.append && c.append.remove(), g && (c.append = a("<span class='" + this._appendClass + "'>" + g + "</span>"), b[h ? "before" : "after"](c.append)), b.off("focus", this._showDatepicker), c.trigger && c.trigger.remove(), d = this._get(c, "showOn"), "focus" !== d && "both" !== d || b.on("focus", this._showDatepicker), "button" !== d && "both" !== d || (e = this._get(c, "buttonText"), f = this._get(c, "buttonImage"), c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
				src: f,
				alt: e,
				title: e
			}) : a("<button type='button'></button>").addClass(this._triggerClass).html(f ? a("<img/>").attr({
				src: f,
				alt: e,
				title: e
			}) : e)), b[h ? "before" : "after"](c.trigger), c.trigger.on("click", function () {
				return a.datepicker._datepickerShowing && a.datepicker._lastInput === b[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== b[0] ? (a.datepicker._hideDatepicker(), a.datepicker._showDatepicker(b[0])) : a.datepicker._showDatepicker(b[0]), !1
			}))
		},
		_autoSize: function (a) {
			if (this._get(a, "autoSize") && !a.inline) {
				var b, c, d, e, f = new Date(2009, 11, 20),
					g = this._get(a, "dateFormat");
				g.match(/[DM]/) && (b = function (a) {
					for (c = 0, d = 0, e = 0; e < a.length; e++) a[e].length > c && (c = a[e].length, d = e);
					return d
				}, f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))), f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())), a.input.attr("size", this._formatDate(a, f).length)
			}
		},
		_inlineDatepicker: function (b, c) {
			var d = a(b);
			d.hasClass(this.markerClassName) || (d.addClass(this.markerClassName).append(c.dpDiv), a.data(b, "datepicker", c), this._setDate(c, this._getDefaultDate(c), !0), this._updateDatepicker(c), this._updateAlternate(c), c.settings.disabled && this._disableDatepicker(b), c.dpDiv.css("display", "block"))
		},
		_dialogDatepicker: function (b, c, d, e, f) {
			var g, h, i, j, k, l = this._dialogInst;
			return l || (this.uuid += 1, g = "dp" + this.uuid, this._dialogInput = a("<input type='text' id='" + g + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), a("body").append(this._dialogInput), l = this._dialogInst = this._newInst(this._dialogInput, !1), l.settings = {}, a.data(this._dialogInput[0], "datepicker", l)), Z(l.settings, e || {}), c = c && c.constructor === Date ? this._formatDate(l, c) : c, this._dialogInput.val(c), this._pos = f ? f.length ? f : [f.pageX, f.pageY] : null, this._pos || (h = document.documentElement.clientWidth, i = document.documentElement.clientHeight, j = document.documentElement.scrollLeft || document.body.scrollLeft, k = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + j, i / 2 - 150 + k]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), l.settings.onSelect = d, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), a.blockUI && a.blockUI(this.dpDiv), a.data(this._dialogInput[0], "datepicker", l), this
		},
		_destroyDatepicker: function (b) {
			var c, d = a(b),
				e = a.data(b, "datepicker");
			d.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), a.removeData(b, "datepicker"), "input" === c ? (e.append.remove(), e.trigger.remove(), d.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : "div" !== c && "span" !== c || d.removeClass(this.markerClassName).empty(), U === e && (U = null))
		},
		_enableDatepicker: function (b) {
			var c, d, e = a(b),
				f = a.data(b, "datepicker");
			e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !1, f.trigger.filter("button").each(function () {
				this.disabled = !1
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			})) : "div" !== c && "span" !== c || (d = e.children("." + this._inlineClass), d.children().removeClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = a.map(this._disabledInputs, function (a) {
				return a === b ? null : a
			}))
		},
		_disableDatepicker: function (b) {
			var c, d, e = a(b),
				f = a.data(b, "datepicker");
			e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !0, f.trigger.filter("button").each(function () {
				this.disabled = !0
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			})) : "div" !== c && "span" !== c || (d = e.children("." + this._inlineClass), d.children().addClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = a.map(this._disabledInputs, function (a) {
				return a === b ? null : a
			}), this._disabledInputs[this._disabledInputs.length] = b)
		},
		_isDisabledDatepicker: function (a) {
			if (!a) return !1;
			for (var b = 0; b < this._disabledInputs.length; b++)
				if (this._disabledInputs[b] === a) return !0;
			return !1
		},
		_getInst: function (b) {
			try {
				return a.data(b, "datepicker")
			} catch (a) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function (b, c, d) {
			var e, f, g, h, i = this._getInst(b);
			return 2 === arguments.length && "string" == typeof c ? "defaults" === c ? a.extend({}, a.datepicker._defaults) : i ? "all" === c ? a.extend({}, i.settings) : this._get(i, c) : null : (e = c || {}, "string" == typeof c && (e = {}, e[c] = d), void(i && (this._curInst === i && this._hideDatepicker(), f = this._getDateDatepicker(b, !0), g = this._getMinMaxDate(i, "min"), h = this._getMinMaxDate(i, "max"), Z(i.settings, e), null !== g && void 0 !== e.dateFormat && void 0 === e.minDate && (i.settings.minDate = this._formatDate(i, g)), null !== h && void 0 !== e.dateFormat && void 0 === e.maxDate && (i.settings.maxDate = this._formatDate(i, h)), "disabled" in e && (e.disabled ? this._disableDatepicker(b) : this._enableDatepicker(b)), this._attachments(a(b), i), this._autoSize(i), this._setDate(i, f), this._updateAlternate(i), this._updateDatepicker(i))))
		},
		_changeDatepicker: function (a, b, c) {
			this._optionDatepicker(a, b, c)
		},
		_refreshDatepicker: function (a) {
			var b = this._getInst(a);
			b && this._updateDatepicker(b)
		},
		_setDateDatepicker: function (a, b) {
			var c = this._getInst(a);
			c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
		},
		_getDateDatepicker: function (a, b) {
			var c = this._getInst(a);
			return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null
		},
		_doKeyDown: function (b) {
			var c, d, e, f = a.datepicker._getInst(b.target),
				g = !0,
				h = f.dpDiv.is(".ui-datepicker-rtl");
			if (f._keyEvent = !0, a.datepicker._datepickerShowing) switch (b.keyCode) {
				case 9:
					a.datepicker._hideDatepicker(), g = !1;
					break;
				case 13:
					return e = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv), e[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, e[0]), c = a.datepicker._get(f, "onSelect"), c ? (d = a.datepicker._formatDate(f), c.apply(f.input ? f.input[0] : null, [d, f])) : a.datepicker._hideDatepicker(), !1;
				case 27:
					a.datepicker._hideDatepicker();
					break;
				case 33:
					a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
					break;
				case 34:
					a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
					break;
				case 35:
					(b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target), g = b.ctrlKey || b.metaKey;
					break;
				case 36:
					(b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target), g = b.ctrlKey || b.metaKey;
					break;
				case 37:
					(b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? 1 : -1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
					break;
				case 38:
					(b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D"), g = b.ctrlKey || b.metaKey;
					break;
				case 39:
					(b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? -1 : 1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
					break;
				case 40:
					(b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D"), g = b.ctrlKey || b.metaKey;
					break;
				default:
					g = !1
			} else 36 === b.keyCode && b.ctrlKey ? a.datepicker._showDatepicker(this) : g = !1;
			g && (b.preventDefault(), b.stopPropagation())
		},
		_doKeyPress: function (b) {
			var c, d, e = a.datepicker._getInst(b.target);
			if (a.datepicker._get(e, "constrainInput")) return c = a.datepicker._possibleChars(a.datepicker._get(e, "dateFormat")), d = String.fromCharCode(null == b.charCode ? b.keyCode : b.charCode), b.ctrlKey || b.metaKey || d < " " || !c || c.indexOf(d) > -1
		},
		_doKeyUp: function (b) {
			var c, d = a.datepicker._getInst(b.target);
			if (d.input.val() !== d.lastVal) try {
				c = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d)), c && (a.datepicker._setDateFromField(d), a.datepicker._updateAlternate(d), a.datepicker._updateDatepicker(d))
			} catch (a) {}
			return !0
		},
		_showDatepicker: function (b) {
			if (b = b.target || b, "input" !== b.nodeName.toLowerCase() && (b = a("input", b.parentNode)[0]), !a.datepicker._isDisabledDatepicker(b) && a.datepicker._lastInput !== b) {
				var c, d, e, f, g, h, i;
				c = a.datepicker._getInst(b), a.datepicker._curInst && a.datepicker._curInst !== c && (a.datepicker._curInst.dpDiv.stop(!0, !0), c && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])), d = a.datepicker._get(c, "beforeShow"), e = d ? d.apply(b, [b, c]) : {}, e !== !1 && (Z(c.settings, e), c.lastVal = null, a.datepicker._lastInput = b, a.datepicker._setDateFromField(c), a.datepicker._inDialog && (b.value = ""), a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(b), a.datepicker._pos[1] += b.offsetHeight), f = !1, a(b).parents().each(function () {
					return f |= "fixed" === a(this).css("position"), !f
				}), g = {
					left: a.datepicker._pos[0],
					top: a.datepicker._pos[1]
				}, a.datepicker._pos = null, c.dpDiv.empty(), c.dpDiv.css({
					position: "absolute",
					display: "block",
					top: "-1000px"
				}), a.datepicker._updateDatepicker(c), g = a.datepicker._checkOffset(c, g, f), c.dpDiv.css({
					position: a.datepicker._inDialog && a.blockUI ? "static" : f ? "fixed" : "absolute",
					display: "none",
					left: g.left + "px",
					top: g.top + "px"
				}), c.inline || (h = a.datepicker._get(c, "showAnim"), i = a.datepicker._get(c, "duration"), c.dpDiv.css("z-index", V(a(b)) + 1), a.datepicker._datepickerShowing = !0, a.effects && a.effects.effect[h] ? c.dpDiv.show(h, a.datepicker._get(c, "showOptions"), i) : c.dpDiv[h || "show"](h ? i : null), a.datepicker._shouldFocusInput(c) && c.input.trigger("focus"), a.datepicker._curInst = c))
			}
		},
		_updateDatepicker: function (b) {
			this.maxRows = 4, U = b, b.dpDiv.empty().append(this._generateHTML(b)), this._attachHandlers(b);
			var c, d = this._getNumberOfMonths(b),
				e = d[1],
				f = 17,
				g = b.dpDiv.find("." + this._dayOverClass + " a");
			g.length > 0 && Y.apply(g.get(0)), b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), e > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + e).css("width", f * e + "em"), b.dpDiv[(1 !== d[0] || 1 !== d[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), b === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(b) && b.input.trigger("focus"), b.yearshtml && (c = b.yearshtml, setTimeout(function () {
				c === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml), c = b.yearshtml = null
			}, 0))
		},
		_shouldFocusInput: function (a) {
			return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
		},
		_checkOffset: function (b, c, d) {
			var e = b.dpDiv.outerWidth(),
				f = b.dpDiv.outerHeight(),
				g = b.input ? b.input.outerWidth() : 0,
				h = b.input ? b.input.outerHeight() : 0,
				i = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft()),
				j = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop());
			return c.left -= this._get(b, "isRTL") ? e - g : 0, c.left -= d && c.left === b.input.offset().left ? a(document).scrollLeft() : 0, c.top -= d && c.top === b.input.offset().top + h ? a(document).scrollTop() : 0, c.left -= Math.min(c.left, c.left + e > i && i > e ? Math.abs(c.left + e - i) : 0), c.top -= Math.min(c.top, c.top + f > j && j > f ? Math.abs(f + h) : 0), c
		},
		_findPos: function (b) {
			for (var c, d = this._getInst(b), e = this._get(d, "isRTL"); b && ("hidden" === b.type || 1 !== b.nodeType || a.expr.filters.hidden(b));) b = b[e ? "previousSibling" : "nextSibling"];
			return c = a(b).offset(), [c.left, c.top]
		},
		_hideDatepicker: function (b) {
			var c, d, e, f, g = this._curInst;
			!g || b && g !== a.data(b, "datepicker") || this._datepickerShowing && (c = this._get(g, "showAnim"), d = this._get(g, "duration"), e = function () {
				a.datepicker._tidyDialog(g)
			}, a.effects && (a.effects.effect[c] || a.effects[c]) ? g.dpDiv.hide(c, a.datepicker._get(g, "showOptions"), d, e) : g.dpDiv["slideDown" === c ? "slideUp" : "fadeIn" === c ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1, f = this._get(g, "onClose"), f && f.apply(g.input ? g.input[0] : null, [g.input ? g.input.val() : "", g]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
				position: "absolute",
				left: "0",
				top: "-100px"
			}), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv))), this._inDialog = !1)
		},
		_tidyDialog: function (a) {
			a.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
		},
		_checkExternalClick: function (b) {
			if (a.datepicker._curInst) {
				var c = a(b.target),
					d = a.datepicker._getInst(c[0]);
				(c[0].id === a.datepicker._mainDivId || 0 !== c.parents("#" + a.datepicker._mainDivId).length || c.hasClass(a.datepicker.markerClassName) || c.closest("." + a.datepicker._triggerClass).length || !a.datepicker._datepickerShowing || a.datepicker._inDialog && a.blockUI) && (!c.hasClass(a.datepicker.markerClassName) || a.datepicker._curInst === d) || a.datepicker._hideDatepicker()
			}
		},
		_adjustDate: function (b, c, d) {
			var e = a(b),
				f = this._getInst(e[0]);
			this._isDisabledDatepicker(e[0]) || (this._adjustInstDate(f, c + ("M" === d ? this._get(f, "showCurrentAtPos") : 0), d), this._updateDatepicker(f))
		},
		_gotoToday: function (b) {
			var c, d = a(b),
				e = this._getInst(d[0]);
			this._get(e, "gotoCurrent") && e.currentDay ? (e.selectedDay = e.currentDay, e.drawMonth = e.selectedMonth = e.currentMonth, e.drawYear = e.selectedYear = e.currentYear) : (c = new Date, e.selectedDay = c.getDate(), e.drawMonth = e.selectedMonth = c.getMonth(), e.drawYear = e.selectedYear = c.getFullYear()), this._notifyChange(e), this._adjustDate(d)
		},
		_selectMonthYear: function (b, c, d) {
			var e = a(b),
				f = this._getInst(e[0]);
			f["selected" + ("M" === d ? "Month" : "Year")] = f["draw" + ("M" === d ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10), this._notifyChange(f), this._adjustDate(e)
		},
		_selectDay: function (b, c, d, e) {
			var f, g = a(b);
			a(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(g[0]) || (f = this._getInst(g[0]), f.selectedDay = f.currentDay = a("a", e).html(), f.selectedMonth = f.currentMonth = c, f.selectedYear = f.currentYear = d, this._selectDate(b, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
		},
		_clearDate: function (b) {
			var c = a(b);
			this._selectDate(c, "")
		},
		_selectDate: function (b, c) {
			var d, e = a(b),
				f = this._getInst(e[0]);
			c = null != c ? c : this._formatDate(f), f.input && f.input.val(c), this._updateAlternate(f), d = this._get(f, "onSelect"), d ? d.apply(f.input ? f.input[0] : null, [c, f]) : f.input && f.input.trigger("change"), f.inline ? this._updateDatepicker(f) : (this._hideDatepicker(), this._lastInput = f.input[0], "object" != typeof f.input[0] && f.input.trigger("focus"), this._lastInput = null)
		},
		_updateAlternate: function (b) {
			var c, d, e, f = this._get(b, "altField");
			f && (c = this._get(b, "altFormat") || this._get(b, "dateFormat"), d = this._getDate(b), e = this.formatDate(c, d, this._getFormatConfig(b)), a(f).val(e))
		},
		noWeekends: function (a) {
			var b = a.getDay();
			return [b > 0 && b < 6, ""]
		},
		iso8601Week: function (a) {
			var b, c = new Date(a.getTime());
			return c.setDate(c.getDate() + 4 - (c.getDay() || 7)), b = c.getTime(), c.setMonth(0), c.setDate(1), Math.floor(Math.round((b - c) / 864e5) / 7) + 1
		},
		parseDate: function (b, c, d) {
			if (null == b || null == c) throw "Invalid arguments";
			if (c = "object" == typeof c ? c.toString() : c + "", "" === c) return null;
			var e, f, g, t, h = 0,
				i = (d ? d.shortYearCutoff : null) || this._defaults.shortYearCutoff,
				j = "string" != typeof i ? i : (new Date).getFullYear() % 100 + parseInt(i, 10),
				k = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort,
				l = (d ? d.dayNames : null) || this._defaults.dayNames,
				m = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort,
				n = (d ? d.monthNames : null) || this._defaults.monthNames,
				o = -1,
				p = -1,
				q = -1,
				r = -1,
				s = !1,
				u = function (a) {
					var c = e + 1 < b.length && b.charAt(e + 1) === a;
					return c && e++, c
				},
				v = function (a) {
					var b = u(a),
						d = "@" === a ? 14 : "!" === a ? 20 : "y" === a && b ? 4 : "o" === a ? 3 : 2,
						e = "y" === a ? d : 1,
						f = new RegExp("^\\d{" + e + "," + d + "}"),
						g = c.substring(h).match(f);
					if (!g) throw "Missing number at position " + h;
					return h += g[0].length, parseInt(g[0], 10)
				},
				w = function (b, d, e) {
					var f = -1,
						g = a.map(u(b) ? e : d, function (a, b) {
							return [[b, a]]
						}).sort(function (a, b) {
							return -(a[1].length - b[1].length)
						});
					if (a.each(g, function (a, b) {
							var d = b[1];
							if (c.substr(h, d.length).toLowerCase() === d.toLowerCase()) return f = b[0], h += d.length, !1
						}), f !== -1) return f + 1;
					throw "Unknown name at position " + h
				},
				x = function () {
					if (c.charAt(h) !== b.charAt(e)) throw "Unexpected literal at position " + h;
					h++
				};
			for (e = 0; e < b.length; e++)
				if (s) "'" !== b.charAt(e) || u("'") ? x() : s = !1;
				else switch (b.charAt(e)) {
					case "d":
						q = v("d");
						break;
					case "D":
						w("D", k, l);
						break;
					case "o":
						r = v("o");
						break;
					case "m":
						p = v("m");
						break;
					case "M":
						p = w("M", m, n);
						break;
					case "y":
						o = v("y");
						break;
					case "@":
						t = new Date(v("@")), o = t.getFullYear(), p = t.getMonth() + 1, q = t.getDate();
						break;
					case "!":
						t = new Date((v("!") - this._ticksTo1970) / 1e4), o = t.getFullYear(), p = t.getMonth() + 1, q = t.getDate();
						break;
					case "'":
						u("'") ? x() : s = !0;
						break;
					default:
						x()
				}
			if (h < c.length && (g = c.substr(h), !/^\s+/.test(g))) throw "Extra/unparsed characters found in date: " + g;
			if (o === -1 ? o = (new Date).getFullYear() : o < 100 && (o += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (o <= j ? 0 : -100)), r > -1)
				for (p = 1, q = r;;) {
					if (f = this._getDaysInMonth(o, p - 1), q <= f) break;
					p++, q -= f
				}
			if (t = this._daylightSavingAdjust(new Date(o, p - 1, q)), t.getFullYear() !== o || t.getMonth() + 1 !== p || t.getDate() !== q) throw "Invalid date";
			return t
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
		formatDate: function (a, b, c) {
			if (!b) return "";
			var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
				f = (c ? c.dayNames : null) || this._defaults.dayNames,
				g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
				h = (c ? c.monthNames : null) || this._defaults.monthNames,
				i = function (b) {
					var c = d + 1 < a.length && a.charAt(d + 1) === b;
					return c && d++, c
				},
				j = function (a, b, c) {
					var d = "" + b;
					if (i(a))
						for (; d.length < c;) d = "0" + d;
					return d
				},
				k = function (a, b, c, d) {
					return i(a) ? d[b] : c[b]
				},
				l = "",
				m = !1;
			if (b)
				for (d = 0; d < a.length; d++)
					if (m) "'" !== a.charAt(d) || i("'") ? l += a.charAt(d) : m = !1;
					else switch (a.charAt(d)) {
						case "d":
							l += j("d", b.getDate(), 2);
							break;
						case "D":
							l += k("D", b.getDay(), e, f);
							break;
						case "o":
							l += j("o", Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime() - new Date(b.getFullYear(), 0, 0).getTime()) / 864e5), 3);
							break;
						case "m":
							l += j("m", b.getMonth() + 1, 2);
							break;
						case "M":
							l += k("M", b.getMonth(), g, h);
							break;
						case "y":
							l += i("y") ? b.getFullYear() : (b.getFullYear() % 100 < 10 ? "0" : "") + b.getFullYear() % 100;
							break;
						case "@":
							l += b.getTime();
							break;
						case "!":
							l += 1e4 * b.getTime() + this._ticksTo1970;
							break;
						case "'":
							i("'") ? l += "'" : m = !0;
							break;
						default:
							l += a.charAt(d)
					}
			return l
		},
		_possibleChars: function (a) {
			var b, c = "",
				d = !1,
				e = function (c) {
					var d = b + 1 < a.length && a.charAt(b + 1) === c;
					return d && b++, d
				};
			for (b = 0; b < a.length; b++)
				if (d) "'" !== a.charAt(b) || e("'") ? c += a.charAt(b) : d = !1;
				else switch (a.charAt(b)) {
					case "d":
					case "m":
					case "y":
					case "@":
						c += "0123456789";
						break;
					case "D":
					case "M":
						return null;
					case "'":
						e("'") ? c += "'" : d = !0;
						break;
					default:
						c += a.charAt(b)
				}
			return c
		},
		_get: function (a, b) {
			return void 0 !== a.settings[b] ? a.settings[b] : this._defaults[b]
		},
		_setDateFromField: function (a, b) {
			if (a.input.val() !== a.lastVal) {
				var c = this._get(a, "dateFormat"),
					d = a.lastVal = a.input ? a.input.val() : null,
					e = this._getDefaultDate(a),
					f = e,
					g = this._getFormatConfig(a);
				try {
					f = this.parseDate(c, d, g) || e
				} catch (a) {
					d = b ? "" : d
				}
				a.selectedDay = f.getDate(), a.drawMonth = a.selectedMonth = f.getMonth(), a.drawYear = a.selectedYear = f.getFullYear(), a.currentDay = d ? f.getDate() : 0, a.currentMonth = d ? f.getMonth() : 0, a.currentYear = d ? f.getFullYear() : 0, this._adjustInstDate(a)
			}
		},
		_getDefaultDate: function (a) {
			return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
		},
		_determineDate: function (b, c, d) {
			var e = function (a) {
					var b = new Date;
					return b.setDate(b.getDate() + a), b
				},
				f = function (c) {
					try {
						return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), c, a.datepicker._getFormatConfig(b))
					} catch (a) {}
					for (var d = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, e = d.getFullYear(), f = d.getMonth(), g = d.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, i = h.exec(c); i;) {
						switch (i[2] || "d") {
							case "d":
							case "D":
								g += parseInt(i[1], 10);
								break;
							case "w":
							case "W":
								g += 7 * parseInt(i[1], 10);
								break;
							case "m":
							case "M":
								f += parseInt(i[1], 10), g = Math.min(g, a.datepicker._getDaysInMonth(e, f));
								break;
							case "y":
							case "Y":
								e += parseInt(i[1], 10), g = Math.min(g, a.datepicker._getDaysInMonth(e, f))
						}
						i = h.exec(c)
					}
					return new Date(e, f, g)
				},
				g = null == c || "" === c ? d : "string" == typeof c ? f(c) : "number" == typeof c ? isNaN(c) ? d : e(c) : new Date(c.getTime());
			return g = g && "Invalid Date" === g.toString() ? d : g, g && (g.setHours(0), g.setMinutes(0), g.setSeconds(0), g.setMilliseconds(0)), this._daylightSavingAdjust(g)
		},
		_daylightSavingAdjust: function (a) {
			return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
		},
		_setDate: function (a, b, c) {
			var d = !b,
				e = a.selectedMonth,
				f = a.selectedYear,
				g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
			a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), e === a.selectedMonth && f === a.selectedYear || c || this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
		},
		_getDate: function (a) {
			var b = !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
			return b
		},
		_attachHandlers: function (b) {
			var c = this._get(b, "stepMonths"),
				d = "#" + b.id.replace(/\\\\/g, "\\");
			b.dpDiv.find("[data-handler]").map(function () {
				var b = {
					prev: function () {
						a.datepicker._adjustDate(d, -c, "M")
					},
					next: function () {
						a.datepicker._adjustDate(d, +c, "M")
					},
					hide: function () {
						a.datepicker._hideDatepicker()
					},
					today: function () {
						a.datepicker._gotoToday(d)
					},
					selectDay: function () {
						return a.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
					},
					selectMonth: function () {
						return a.datepicker._selectMonthYear(d, this, "M"), !1
					},
					selectYear: function () {
						return a.datepicker._selectMonthYear(d, this, "Y"), !1
					}
				};
				a(this).on(this.getAttribute("data-event"), b[this.getAttribute("data-handler")])
			})
		},
		_generateHTML: function (a) {
			var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = new Date,
				P = this._daylightSavingAdjust(new Date(O.getFullYear(), O.getMonth(), O.getDate())),
				Q = this._get(a, "isRTL"),
				R = this._get(a, "showButtonPanel"),
				S = this._get(a, "hideIfNoPrevNext"),
				T = this._get(a, "navigationAsDateFormat"),
				U = this._getNumberOfMonths(a),
				V = this._get(a, "showCurrentAtPos"),
				W = this._get(a, "stepMonths"),
				X = 1 !== U[0] || 1 !== U[1],
				Y = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
				Z = this._getMinMaxDate(a, "min"),
				$ = this._getMinMaxDate(a, "max"),
				_ = a.drawMonth - V,
				aa = a.drawYear;
			if (_ < 0 && (_ += 12, aa--), $)
				for (b = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - U[0] * U[1] + 1, $.getDate())), b = Z && b < Z ? Z : b; this._daylightSavingAdjust(new Date(aa, _, 1)) > b;) _--, _ < 0 && (_ = 11, aa--);
			for (a.drawMonth = _, a.drawYear = aa, c = this._get(a, "prevText"), c = T ? this.formatDate(c, this._daylightSavingAdjust(new Date(aa, _ - W, 1)), this._getFormatConfig(a)) : c, d = this._canAdjustMonth(a, -1, aa, _) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>" : S ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>", e = this._get(a, "nextText"), e = T ? this.formatDate(e, this._daylightSavingAdjust(new Date(aa, _ + W, 1)), this._getFormatConfig(a)) : e, f = this._canAdjustMonth(a, 1, aa, _) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>" : S ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>", g = this._get(a, "currentText"), h = this._get(a, "gotoCurrent") && a.currentDay ? Y : P, g = T ? this.formatDate(g, h, this._getFormatConfig(a)) : g, i = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>", j = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Q ? i : "") + (this._isInRange(a, h) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + g + "</button>" : "") + (Q ? "" : i) + "</div>" : "", k = parseInt(this._get(a, "firstDay"), 10), k = isNaN(k) ? 0 : k, l = this._get(a, "showWeek"), m = this._get(a, "dayNames"), n = this._get(a, "dayNamesMin"), o = this._get(a, "monthNames"), p = this._get(a, "monthNamesShort"), q = this._get(a, "beforeShowDay"), r = this._get(a, "showOtherMonths"), s = this._get(a, "selectOtherMonths"), t = this._getDefaultDate(a), u = "", w = 0; w < U[0]; w++) {
				for (x = "", this.maxRows = 4, y = 0; y < U[1]; y++) {
					if (z = this._daylightSavingAdjust(new Date(aa, _, a.selectedDay)), A = " ui-corner-all", B = "", X) {
						if (B += "<div class='ui-datepicker-group", U[1] > 1) switch (y) {
							case 0:
								B += " ui-datepicker-group-first", A = " ui-corner-" + (Q ? "right" : "left");
								break;
							case U[1] - 1:
								B += " ui-datepicker-group-last", A = " ui-corner-" + (Q ? "left" : "right");
								break;
							default:
								B += " ui-datepicker-group-middle", A = ""
						}
						B += "'>"
					}
					for (B += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + A + "'>" + (/all|left/.test(A) && 0 === w ? Q ? f : d : "") + (/all|right/.test(A) && 0 === w ? Q ? d : f : "") + this._generateMonthYearHeader(a, _, aa, Z, $, w > 0 || y > 0, o, p) + "</div><table class='ui-datepicker-calendar'><thead><tr>", C = l ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "", v = 0; v < 7; v++) D = (v + k) % 7, C += "<th scope='col'" + ((v + k + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + m[D] + "'>" + n[D] + "</span></th>";
					for (B += C + "</tr></thead><tbody>", E = this._getDaysInMonth(aa, _), aa === a.selectedYear && _ === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, E)), F = (this._getFirstDayOfMonth(aa, _) - k + 7) % 7, G = Math.ceil((F + E) / 7), H = X && this.maxRows > G ? this.maxRows : G, this.maxRows = H, I = this._daylightSavingAdjust(new Date(aa, _, 1 - F)), J = 0; J < H; J++) {
						for (B += "<tr>", K = l ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(I) + "</td>" : "", v = 0; v < 7; v++) L = q ? q.apply(a.input ? a.input[0] : null, [I]) : [!0, ""], M = I.getMonth() !== _, N = M && !s || !L[0] || Z && I < Z || $ && I > $, K += "<td class='" + ((v + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (M ? " ui-datepicker-other-month" : "") + (I.getTime() === z.getTime() && _ === a.selectedMonth && a._keyEvent || t.getTime() === I.getTime() && t.getTime() === z.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (M && !r ? "" : " " + L[1] + (I.getTime() === Y.getTime() ? " " + this._currentClass : "") + (I.getTime() === P.getTime() ? " ui-datepicker-today" : "")) + "'" + (M && !r || !L[2] ? "" : " title='" + L[2].replace(/'/g, "&#39;") + "'") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (M && !r ? "&#xa0;" : N ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === P.getTime() ? " ui-state-highlight" : "") + (I.getTime() === Y.getTime() ? " ui-state-active" : "") + (M ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>", I.setDate(I.getDate() + 1), I = this._daylightSavingAdjust(I);
						B += K + "</tr>"
					}
					_++, _ > 11 && (_ = 0, aa++), B += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && y === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += B
				}
				u += x
			}
			return u += j, a._keyEvent = !1, u
		},
		_generateMonthYearHeader: function (a, b, c, d, e, f, g, h) {
			var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"),
				r = this._get(a, "changeYear"),
				s = this._get(a, "showMonthAfterYear"),
				t = "<div class='ui-datepicker-title'>",
				u = "";
			if (f || !q) u += "<span class='ui-datepicker-month'>" + g[b] + "</span>";
			else {
				for (i = d && d.getFullYear() === c, j = e && e.getFullYear() === c, u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", k = 0; k < 12; k++)(!i || k >= d.getMonth()) && (!j || k <= e.getMonth()) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
				u += "</select>"
			}
			if (s || (t += u + (!f && q && r ? "" : "&#xa0;")), !a.yearshtml)
				if (a.yearshtml = "", f || !r) t += "<span class='ui-datepicker-year'>" + c + "</span>";
				else {
					for (l = this._get(a, "yearRange").split(":"), m = (new Date).getFullYear(), n = function (a) {
							var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10);
							return isNaN(b) ? m : b
						}, o = n(l[0]), p = Math.max(o, n(l[1] || "")), o = d ? Math.max(o, d.getFullYear()) : o, p = e ? Math.min(p, e.getFullYear()) : p, a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; o <= p; o++) a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
					a.yearshtml += "</select>", t += a.yearshtml, a.yearshtml = null
				}
			return t += this._get(a, "yearSuffix"), s && (t += (!f && q && r ? "" : "&#xa0;") + u), t += "</div>"
		},
		_adjustInstDate: function (a, b, c) {
			var d = a.selectedYear + ("Y" === c ? b : 0),
				e = a.selectedMonth + ("M" === c ? b : 0),
				f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ("D" === c ? b : 0),
				g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
			a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), "M" !== c && "Y" !== c || this._notifyChange(a)
		},
		_restrictMinMax: function (a, b) {
			var c = this._getMinMaxDate(a, "min"),
				d = this._getMinMaxDate(a, "max"),
				e = c && b < c ? c : b;
			return d && e > d ? d : e
		},
		_notifyChange: function (a) {
			var b = this._get(a, "onChangeMonthYear");
			b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
		},
		_getNumberOfMonths: function (a) {
			var b = this._get(a, "numberOfMonths");
			return null == b ? [1, 1] : "number" == typeof b ? [1, b] : b
		},
		_getMinMaxDate: function (a, b) {
			return this._determineDate(a, this._get(a, b + "Date"), null)
		},
		_getDaysInMonth: function (a, b) {
			return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
		},
		_getFirstDayOfMonth: function (a, b) {
			return new Date(a, b, 1).getDay()
		},
		_canAdjustMonth: function (a, b, c, d) {
			var e = this._getNumberOfMonths(a),
				f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
			return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f)
		},
		_isInRange: function (a, b) {
			var c, d, e = this._getMinMaxDate(a, "min"),
				f = this._getMinMaxDate(a, "max"),
				g = null,
				h = null,
				i = this._get(a, "yearRange");
			return i && (c = i.split(":"), d = (new Date).getFullYear(), g = parseInt(c[0], 10), h = parseInt(c[1], 10), c[0].match(/[+\-].*/) && (g += d), c[1].match(/[+\-].*/) && (h += d)), (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || b.getFullYear() <= h)
		},
		_getFormatConfig: function (a) {
			var b = this._get(a, "shortYearCutoff");
			return b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
				shortYearCutoff: b,
				dayNamesShort: this._get(a, "dayNamesShort"),
				dayNames: this._get(a, "dayNames"),
				monthNamesShort: this._get(a, "monthNamesShort"),
				monthNames: this._get(a, "monthNames")
			}
		},
		_formatDate: function (a, b, c, d) {
			b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
			var e = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
			return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
		}
	}), a.fn.datepicker = function (b) {
		if (!this.length) return this;
		a.datepicker.initialized || (a(document).on("mousedown", a.datepicker._checkExternalClick), a.datepicker.initialized = !0), 0 === a("#" + a.datepicker._mainDivId).length && a("body").append(a.datepicker.dpDiv);
		var c = Array.prototype.slice.call(arguments, 1);
		return "string" != typeof b || "isDisabled" !== b && "getDate" !== b && "widget" !== b ? "option" === b && 2 === arguments.length && "string" == typeof arguments[1] ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c)) : this.each(function () {
			"string" == typeof b ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(c)) : a.datepicker._attachDatepicker(this, b)
		}) : a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c))
	}, a.datepicker = new W, a.datepicker.initialized = !1, a.datepicker.uuid = (new Date).getTime(), a.datepicker.version = "1.12.1";
	var aa = (a.datepicker, a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), !1);
	a(document).on("mouseup", function () {
		aa = !1
	});
	a.widget("ui.mouse", {
		version: "1.12.1",
		options: {
			cancel: "input, textarea, button, select, option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function () {
			var b = this;
			this.element.on("mousedown." + this.widgetName, function (a) {
				return b._mouseDown(a)
			}).on("click." + this.widgetName, function (c) {
				if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1
			}), this.started = !1
		},
		_mouseDestroy: function () {
			this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function (b) {
			if (!aa) {
				this._mouseMoved = !1, this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
				var c = this,
					d = 1 === b.which,
					e = !("string" != typeof this.options.cancel || !b.target.nodeName) && a(b.target).closest(this.options.cancel).length;
				return !(d && !e && this._mouseCapture(b)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
					c.mouseDelayMet = !0
				}, this.options.delay)), this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(b) !== !1, !this._mouseStarted) ? (b.preventDefault(), !0) : (!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
					return c._mouseMove(a)
				}, this._mouseUpDelegate = function (a) {
					return c._mouseUp(a)
				}, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), aa = !0, !0))
			}
		},
		_mouseMove: function (b) {
			if (this._mouseMoved) {
				if (a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button) return this._mouseUp(b);
				if (!b.which)
					if (b.originalEvent.altKey || b.originalEvent.ctrlKey || b.originalEvent.metaKey || b.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
					else if (!this.ignoreMissingWhich) return this._mouseUp(b)
			}
			return (b.which || b.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)
		},
		_mouseUp: function (b) {
			this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, aa = !1, b.preventDefault()
		},
		_mouseDistanceMet: function (a) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function () {
			return this.mouseDelayMet
		},
		_mouseStart: function () {},
		_mouseDrag: function () {},
		_mouseStop: function () {},
		_mouseCapture: function () {
			return !0
		}
	}), a.ui.plugin = {
		add: function (b, c, d) {
			var e, f = a.ui[b].prototype;
			for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
		},
		call: function (a, b, c, d) {
			var e, f = a.plugins[b];
			if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))
				for (e = 0; e < f.length; e++) a.options[f[e][0]] && f[e][1].apply(a.element, c)
		}
	}, a.ui.safeBlur = function (b) {
		b && "body" !== b.nodeName.toLowerCase() && a(b).trigger("blur")
	};
	a.widget("ui.draggable", a.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1,
			drag: null,
			start: null,
			stop: null
		},
		_create: function () {
			"original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit()
		},
		_setOption: function (a, b) {
			this._super(a, b), "handle" === a && (this._removeHandleClassName(), this._setHandleClassName())
		},
		_destroy: function () {
			return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this._removeHandleClassName(), void this._mouseDestroy())
		},
		_mouseCapture: function (b) {
			var c = this.options;
			return !(this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(b), !!this.handle && (this._blurActiveElement(b), this._blockFrames(c.iframeFix === !0 ? "iframe" : c.iframeFix), !0))
		},
		_blockFrames: function (b) {
			this.iframeBlocks = this.document.find(b).map(function () {
				var b = a(this);
				return a("<div>").css("position", "absolute").appendTo(b.parent()).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).offset(b.offset())[0]
			})
		},
		_unblockFrames: function () {
			this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
		},
		_blurActiveElement: function (b) {
			var c = a.ui.safeActiveElement(this.document[0]),
				d = a(b.target);
			d.closest(c).length || a.ui.safeBlur(c)
		},
		_mouseStart: function (b) {
			var c = this.options;
			return this.helper = this._createHelper(b), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function () {
				return "fixed" === a(this).css("position")
			}).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(b), this.originalPosition = this.position = this._generatePosition(b, !1), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
		},
		_refreshOffsets: function (a) {
			this.offset = {
				top: this.positionAbs.top - this.margins.top,
				left: this.positionAbs.left - this.margins.left,
				scroll: !1,
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}, this.offset.click = {
				left: a.pageX - this.offset.left,
				top: a.pageY - this.offset.top
			}
		},
		_mouseDrag: function (b, c) {
			if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b, !0), this.positionAbs = this._convertPositionTo("absolute"), !c) {
				var d = this._uiHash();
				if (this._trigger("drag", b, d) === !1) return this._mouseUp(new a.Event("mouseup", b)), !1;
				this.position = d.position
			}
			return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
		},
		_mouseStop: function (b) {
			var c = this,
				d = !1;
			return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
				c._trigger("stop", b) !== !1 && c._clear()
			}) : this._trigger("stop", b) !== !1 && this._clear(), !1
		},
		_mouseUp: function (b) {
			return this._unblockFrames(), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), this.handleElement.is(b.target) && this.element.trigger("focus"), a.ui.mouse.prototype._mouseUp.call(this, b)
		},
		cancel: function () {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new a.Event("mouseup", {
				target: this.element[0]
			})) : this._clear(), this
		},
		_getHandle: function (b) {
			return !this.options.handle || !!a(b.target).closest(this.element.find(this.options.handle)).length
		},
		_setHandleClassName: function () {
			this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle")
		},
		_removeHandleClassName: function () {
			this._removeClass(this.handleElement, "ui-draggable-handle")
		},
		_createHelper: function (b) {
			var c = this.options,
				d = a.isFunction(c.helper),
				e = d ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
			return e.parents("body").length || e.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d && e[0] === this.element[0] && this._setPositionRelative(), e[0] === this.element[0] || /(fixed|absolute)/.test(e.css("position")) || e.css("position", "absolute"), e
		},
		_setPositionRelative: function () {
			/^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
		},
		_adjustOffsetFromHelper: function (b) {
			"string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
				left: +b[0],
				top: +b[1] || 0
			}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
		},
		_isRootNode: function (a) {
			return /(html|body)/i.test(a.tagName) || a === this.document[0]
		},
		_getParentOffset: function () {
			var b = this.offsetParent.offset(),
				c = this.document[0];
			return "absolute" === this.cssPosition && this.scrollParent[0] !== c && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(),
				b.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (b = {
				top: 0,
				left: 0
			}), {
				top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function () {
			if ("relative" !== this.cssPosition) return {
				top: 0,
				left: 0
			};
			var a = this.element.position(),
				b = this._isRootNode(this.scrollParent[0]);
			return {
				top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + (b ? 0 : this.scrollParent.scrollTop()),
				left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + (b ? 0 : this.scrollParent.scrollLeft())
			}
		},
		_cacheMargins: function () {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function () {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function () {
			var b, c, d, e = this.options,
				f = this.document[0];
			return this.relativeContainer = null, e.containment ? "window" === e.containment ? void(this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === e.containment ? void(this.containment = [0, 0, a(f).width() - this.helperProportions.width - this.margins.left, (a(f).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : e.containment.constructor === Array ? void(this.containment = e.containment) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), c = a(e.containment), d = c[0], void(d && (b = /(scroll|auto)/.test(c.css("overflow")), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = c))) : void(this.containment = null)
		},
		_convertPositionTo: function (a, b) {
			b || (b = this.position);
			var c = "absolute" === a ? 1 : -1,
				d = this._isRootNode(this.scrollParent[0]);
			return {
				top: b.top + this.offset.relative.top * c + this.offset.parent.top * c - ("fixed" === this.cssPosition ? -this.offset.scroll.top : d ? 0 : this.offset.scroll.top) * c,
				left: b.left + this.offset.relative.left * c + this.offset.parent.left * c - ("fixed" === this.cssPosition ? -this.offset.scroll.left : d ? 0 : this.offset.scroll.left) * c
			}
		},
		_generatePosition: function (a, b) {
			var c, d, e, f, g = this.options,
				h = this._isRootNode(this.scrollParent[0]),
				i = a.pageX,
				j = a.pageY;
			return h && this.offset.scroll || (this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			}), b && (this.containment && (this.relativeContainer ? (d = this.relativeContainer.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, a.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), a.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), a.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), a.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f), "y" === g.axis && (i = this.originalPageX), "x" === g.axis && (j = this.originalPageY)), {
				top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
				left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
			}
		},
		_clear: function () {
			this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
		},
		_trigger: function (b, c, d) {
			return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d, this], !0), /^(drag|start|stop)/.test(b) && (this.positionAbs = this._convertPositionTo("absolute"), d.offset = this.positionAbs), a.Widget.prototype._trigger.call(this, b, c, d)
		},
		plugins: {},
		_uiHash: function () {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}), a.ui.plugin.add("draggable", "connectToSortable", {
		start: function (b, c, d) {
			var e = a.extend({}, c, {
				item: d.element
			});
			d.sortables = [], a(d.options.connectToSortable).each(function () {
				var c = a(this).sortable("instance");
				c && !c.options.disabled && (d.sortables.push(c), c.refreshPositions(), c._trigger("activate", b, e))
			})
		},
		stop: function (b, c, d) {
			var e = a.extend({}, c, {
				item: d.element
			});
			d.cancelHelperRemoval = !1, a.each(d.sortables, function () {
				var a = this;
				a.isOver ? (a.isOver = 0, d.cancelHelperRemoval = !0, a.cancelHelperRemoval = !1, a._storedCSS = {
					position: a.placeholder.css("position"),
					top: a.placeholder.css("top"),
					left: a.placeholder.css("left")
				}, a._mouseStop(b), a.options.helper = a.options._helper) : (a.cancelHelperRemoval = !0, a._trigger("deactivate", b, e))
			})
		},
		drag: function (b, c, d) {
			a.each(d.sortables, function () {
				var e = !1,
					f = this;
				f.positionAbs = d.positionAbs, f.helperProportions = d.helperProportions, f.offset.click = d.offset.click, f._intersectsWith(f.containerCache) && (e = !0, a.each(d.sortables, function () {
					return this.positionAbs = d.positionAbs, this.helperProportions = d.helperProportions, this.offset.click = d.offset.click, this !== f && this._intersectsWith(this.containerCache) && a.contains(f.element[0], this.element[0]) && (e = !1), e
				})), e ? (f.isOver || (f.isOver = 1, d._parent = c.helper.parent(), f.currentItem = c.helper.appendTo(f.element).data("ui-sortable-item", !0), f.options._helper = f.options.helper, f.options.helper = function () {
					return c.helper[0]
				}, b.target = f.currentItem[0], f._mouseCapture(b, !0), f._mouseStart(b, !0, !0), f.offset.click.top = d.offset.click.top, f.offset.click.left = d.offset.click.left, f.offset.parent.left -= d.offset.parent.left - f.offset.parent.left, f.offset.parent.top -= d.offset.parent.top - f.offset.parent.top, d._trigger("toSortable", b), d.dropped = f.element, a.each(d.sortables, function () {
					this.refreshPositions()
				}), d.currentItem = d.element, f.fromOutside = d), f.currentItem && (f._mouseDrag(b), c.position = f.position)) : f.isOver && (f.isOver = 0, f.cancelHelperRemoval = !0, f.options._revert = f.options.revert, f.options.revert = !1, f._trigger("out", b, f._uiHash(f)), f._mouseStop(b, !0), f.options.revert = f.options._revert, f.options.helper = f.options._helper, f.placeholder && f.placeholder.remove(), c.helper.appendTo(d._parent), d._refreshOffsets(b), c.position = d._generatePosition(b, !0), d._trigger("fromSortable", b), d.dropped = !1, a.each(d.sortables, function () {
					this.refreshPositions()
				}))
			})
		}
	}), a.ui.plugin.add("draggable", "cursor", {
		start: function (b, c, d) {
			var e = a("body"),
				f = d.options;
			e.css("cursor") && (f._cursor = e.css("cursor")), e.css("cursor", f.cursor)
		},
		stop: function (b, c, d) {
			var e = d.options;
			e._cursor && a("body").css("cursor", e._cursor)
		}
	}), a.ui.plugin.add("draggable", "opacity", {
		start: function (b, c, d) {
			var e = a(c.helper),
				f = d.options;
			e.css("opacity") && (f._opacity = e.css("opacity")), e.css("opacity", f.opacity)
		},
		stop: function (b, c, d) {
			var e = d.options;
			e._opacity && a(c.helper).css("opacity", e._opacity)
		}
	}), a.ui.plugin.add("draggable", "scroll", {
		start: function (a, b, c) {
			c.scrollParentNotHidden || (c.scrollParentNotHidden = c.helper.scrollParent(!1)), c.scrollParentNotHidden[0] !== c.document[0] && "HTML" !== c.scrollParentNotHidden[0].tagName && (c.overflowOffset = c.scrollParentNotHidden.offset())
		},
		drag: function (b, c, d) {
			var e = d.options,
				f = !1,
				g = d.scrollParentNotHidden[0],
				h = d.document[0];
			g !== h && "HTML" !== g.tagName ? (e.axis && "x" === e.axis || (d.overflowOffset.top + g.offsetHeight - b.pageY < e.scrollSensitivity ? g.scrollTop = f = g.scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (g.scrollTop = f = g.scrollTop - e.scrollSpeed)), e.axis && "y" === e.axis || (d.overflowOffset.left + g.offsetWidth - b.pageX < e.scrollSensitivity ? g.scrollLeft = f = g.scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (g.scrollLeft = f = g.scrollLeft - e.scrollSpeed))) : (e.axis && "x" === e.axis || (b.pageY - a(h).scrollTop() < e.scrollSensitivity ? f = a(h).scrollTop(a(h).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(h).scrollTop()) < e.scrollSensitivity && (f = a(h).scrollTop(a(h).scrollTop() + e.scrollSpeed))), e.axis && "y" === e.axis || (b.pageX - a(h).scrollLeft() < e.scrollSensitivity ? f = a(h).scrollLeft(a(h).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(h).scrollLeft()) < e.scrollSensitivity && (f = a(h).scrollLeft(a(h).scrollLeft() + e.scrollSpeed)))), f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
		}
	}), a.ui.plugin.add("draggable", "snap", {
		start: function (b, c, d) {
			var e = d.options;
			d.snapElements = [], a(e.snap.constructor !== String ? e.snap.items || ":data(ui-draggable)" : e.snap).each(function () {
				var b = a(this),
					c = b.offset();
				this !== d.element[0] && d.snapElements.push({
					item: this,
					width: b.outerWidth(),
					height: b.outerHeight(),
					top: c.top,
					left: c.left
				})
			})
		},
		drag: function (b, c, d) {
			var e, f, g, h, i, j, k, l, m, n, o = d.options,
				p = o.snapTolerance,
				q = c.offset.left,
				r = q + d.helperProportions.width,
				s = c.offset.top,
				t = s + d.helperProportions.height;
			for (m = d.snapElements.length - 1; m >= 0; m--) i = d.snapElements[m].left - d.margins.left, j = i + d.snapElements[m].width, k = d.snapElements[m].top - d.margins.top, l = k + d.snapElements[m].height, r < i - p || q > j + p || t < k - p || s > l + p || !a.contains(d.snapElements[m].item.ownerDocument, d.snapElements[m].item) ? (d.snapElements[m].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
				snapItem: d.snapElements[m].item
			})), d.snapElements[m].snapping = !1) : ("inner" !== o.snapMode && (e = Math.abs(k - t) <= p, f = Math.abs(l - s) <= p, g = Math.abs(i - r) <= p, h = Math.abs(j - q) <= p, e && (c.position.top = d._convertPositionTo("relative", {
				top: k - d.helperProportions.height,
				left: 0
			}).top), f && (c.position.top = d._convertPositionTo("relative", {
				top: l,
				left: 0
			}).top), g && (c.position.left = d._convertPositionTo("relative", {
				top: 0,
				left: i - d.helperProportions.width
			}).left), h && (c.position.left = d._convertPositionTo("relative", {
				top: 0,
				left: j
			}).left)), n = e || f || g || h, "outer" !== o.snapMode && (e = Math.abs(k - s) <= p, f = Math.abs(l - t) <= p, g = Math.abs(i - q) <= p, h = Math.abs(j - r) <= p, e && (c.position.top = d._convertPositionTo("relative", {
				top: k,
				left: 0
			}).top), f && (c.position.top = d._convertPositionTo("relative", {
				top: l - d.helperProportions.height,
				left: 0
			}).top), g && (c.position.left = d._convertPositionTo("relative", {
				top: 0,
				left: i
			}).left), h && (c.position.left = d._convertPositionTo("relative", {
				top: 0,
				left: j - d.helperProportions.width
			}).left)), !d.snapElements[m].snapping && (e || f || g || h || n) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
				snapItem: d.snapElements[m].item
			})), d.snapElements[m].snapping = e || f || g || h || n)
		}
	}), a.ui.plugin.add("draggable", "stack", {
		start: function (b, c, d) {
			var e, f = d.options,
				g = a.makeArray(a(f.stack)).sort(function (b, c) {
					return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
				});
			g.length && (e = parseInt(a(g[0]).css("zIndex"), 10) || 0, a(g).each(function (b) {
				a(this).css("zIndex", e + b)
			}), this.css("zIndex", e + g.length))
		}
	}), a.ui.plugin.add("draggable", "zIndex", {
		start: function (b, c, d) {
			var e = a(c.helper),
				f = d.options;
			e.css("zIndex") && (f._zIndex = e.css("zIndex")), e.css("zIndex", f.zIndex)
		},
		stop: function (b, c, d) {
			var e = d.options;
			e._zIndex && a(c.helper).css("zIndex", e._zIndex)
		}
	});
	a.ui.draggable;
	a.widget("ui.resizable", a.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			classes: {
				"ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
			},
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 90,
			resize: null,
			start: null,
			stop: null
		},
		_num: function (a) {
			return parseFloat(a) || 0
		},
		_isNumber: function (a) {
			return !isNaN(parseFloat(a))
		},
		_hasScroll: function (b, c) {
			if ("hidden" === a(b).css("overflow")) return !1;
			var d = c && "left" === c ? "scrollLeft" : "scrollTop",
				e = !1;
			return b[d] > 0 || (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
		},
		_create: function () {
			var b, c = this.options,
				d = this;
			this._addClass("ui-resizable"), a.extend(this, {
				_aspectRatio: !!c.aspectRatio,
				aspectRatio: c.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper" : null
			}), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
				position: this.element.css("position"),
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				top: this.element.css("top"),
				left: this.element.css("left")
			})), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, b = {
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom"),
				marginLeft: this.originalElement.css("marginLeft")
			}, this.element.css(b), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			})), this.originalElement.css(b), this._proportionallyResize()), this._setupHandles(), c.autoHide && a(this.element).on("mouseenter", function () {
				c.disabled || (d._removeClass("ui-resizable-autohide"), d._handles.show())
			}).on("mouseleave", function () {
				c.disabled || d.resizing || (d._addClass("ui-resizable-autohide"), d._handles.hide())
			}), this._mouseInit()
		},
		_destroy: function () {
			this._mouseDestroy();
			var b, c = function (b) {
				a(b).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
			};
			return this.elementIsWrapper && (c(this.element), b = this.element, this.originalElement.css({
				position: b.css("position"),
				width: b.outerWidth(),
				height: b.outerHeight(),
				top: b.css("top"),
				left: b.css("left")
			}).insertAfter(b), b.remove()), this.originalElement.css("resize", this.originalResizeStyle), c(this.originalElement), this
		},
		_setOption: function (a, b) {
			switch (this._super(a, b), a) {
				case "handles":
					this._removeHandles(), this._setupHandles()
			}
		},
		_setupHandles: function () {
			var c, d, e, f, g, b = this.options,
				h = this;
			if (this.handles = b.handles || (a(".ui-resizable-handle", this.element).length ? {
					n: ".ui-resizable-n",
					e: ".ui-resizable-e",
					s: ".ui-resizable-s",
					w: ".ui-resizable-w",
					se: ".ui-resizable-se",
					sw: ".ui-resizable-sw",
					ne: ".ui-resizable-ne",
					nw: ".ui-resizable-nw"
				} : "e,s,se"), this._handles = a(), this.handles.constructor === String)
				for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, d = 0; d < e.length; d++) c = a.trim(e[d]), f = "ui-resizable-" + c, g = a("<div>"), this._addClass(g, "ui-resizable-handle " + f), g.css({
					zIndex: b.zIndex
				}), this.handles[c] = ".ui-resizable-" + c, this.element.append(g);
			this._renderAxis = function (b) {
				var c, d, e, f;
				b = b || this.element;
				for (c in this.handles) this.handles[c].constructor === String ? this.handles[c] = this.element.children(this.handles[c]).first().show() : (this.handles[c].jquery || this.handles[c].nodeType) && (this.handles[c] = a(this.handles[c]), this._on(this.handles[c], {
					mousedown: h._mouseDown
				})), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (d = a(this.handles[c], this.element), f = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth(), e = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join(""), b.css(e, f), this._proportionallyResize()), this._handles = this._handles.add(this.handles[c])
			}, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", function () {
				h.resizing || (this.className && (g = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), h.axis = g && g[1] ? g[1] : "se")
			}), b.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"))
		},
		_removeHandles: function () {
			this._handles.remove()
		},
		_mouseCapture: function (b) {
			var c, d, e = !1;
			for (c in this.handles) d = a(this.handles[c])[0], (d === b.target || a.contains(d, b.target)) && (e = !0);
			return !this.options.disabled && e
		},
		_mouseStart: function (b) {
			var c, d, e, f = this.options,
				g = this.element;
			return this.resizing = !0, this._renderProxy(), c = this._num(this.helper.css("left")), d = this._num(this.helper.css("top")), f.containment && (c += a(f.containment).scrollLeft() || 0, d += a(f.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
				left: c,
				top: d
			}, this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {
				width: g.width(),
				height: g.height()
			}, this.originalSize = this._helper ? {
				width: g.outerWidth(),
				height: g.outerHeight()
			} : {
				width: g.width(),
				height: g.height()
			}, this.sizeDiff = {
				width: g.outerWidth() - g.width(),
				height: g.outerHeight() - g.height()
			}, this.originalPosition = {
				left: c,
				top: d
			}, this.originalMousePosition = {
				left: b.pageX,
				top: b.pageY
			}, this.aspectRatio = "number" == typeof f.aspectRatio ? f.aspectRatio : this.originalSize.width / this.originalSize.height || 1, e = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === e ? this.axis + "-resize" : e), this._addClass("ui-resizable-resizing"), this._propagate("start", b), !0
		},
		_mouseDrag: function (b) {
			var c, d, e = this.originalMousePosition,
				f = this.axis,
				g = b.pageX - e.left || 0,
				h = b.pageY - e.top || 0,
				i = this._change[f];
			return this._updatePrevProperties(), !!i && (c = i.apply(this, [b, g, h]), this._updateVirtualBoundaries(b.shiftKey), (this._aspectRatio || b.shiftKey) && (c = this._updateRatio(c, b)), c = this._respectSize(c, b), this._updateCache(c), this._propagate("resize", b), d = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), a.isEmptyObject(d) || (this._updatePrevProperties(), this._trigger("resize", b, this.ui()), this._applyChanges()), !1)
		},
		_mouseStop: function (b) {
			this.resizing = !1;
			var c, d, e, f, g, h, i, j = this.options,
				k = this;
			return this._helper && (c = this._proportionallyResizeElements, d = c.length && /textarea/i.test(c[0].nodeName), e = d && this._hasScroll(c[0], "left") ? 0 : k.sizeDiff.height, f = d ? 0 : k.sizeDiff.width, g = {
				width: k.helper.width() - f,
				height: k.helper.height() - e
			}, h = parseFloat(k.element.css("left")) + (k.position.left - k.originalPosition.left) || null, i = parseFloat(k.element.css("top")) + (k.position.top - k.originalPosition.top) || null, j.animate || this.element.css(a.extend(g, {
				top: i,
				left: h
			})), k.helper.height(k.size.height), k.helper.width(k.size.width), this._helper && !j.animate && this._proportionallyResize()), a("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
		},
		_updatePrevProperties: function () {
			this.prevPosition = {
				top: this.position.top,
				left: this.position.left
			}, this.prevSize = {
				width: this.size.width,
				height: this.size.height
			}
		},
		_applyChanges: function () {
			var a = {};
			return this.position.top !== this.prevPosition.top && (a.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (a.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (a.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (a.height = this.size.height + "px"), this.helper.css(a), a
		},
		_updateVirtualBoundaries: function (a) {
			var b, c, d, e, f, g = this.options;
			f = {
				minWidth: this._isNumber(g.minWidth) ? g.minWidth : 0,
				maxWidth: this._isNumber(g.maxWidth) ? g.maxWidth : 1 / 0,
				minHeight: this._isNumber(g.minHeight) ? g.minHeight : 0,
				maxHeight: this._isNumber(g.maxHeight) ? g.maxHeight : 1 / 0
			}, (this._aspectRatio || a) && (b = f.minHeight * this.aspectRatio, d = f.minWidth / this.aspectRatio, c = f.maxHeight * this.aspectRatio, e = f.maxWidth / this.aspectRatio, b > f.minWidth && (f.minWidth = b), d > f.minHeight && (f.minHeight = d), c < f.maxWidth && (f.maxWidth = c), e < f.maxHeight && (f.maxHeight = e)), this._vBoundaries = f
		},
		_updateCache: function (a) {
			this.offset = this.helper.offset(), this._isNumber(a.left) && (this.position.left = a.left), this._isNumber(a.top) && (this.position.top = a.top), this._isNumber(a.height) && (this.size.height = a.height), this._isNumber(a.width) && (this.size.width = a.width)
		},
		_updateRatio: function (a) {
			var b = this.position,
				c = this.size,
				d = this.axis;
			return this._isNumber(a.height) ? a.width = a.height * this.aspectRatio : this._isNumber(a.width) && (a.height = a.width / this.aspectRatio), "sw" === d && (a.left = b.left + (c.width - a.width), a.top = null), "nw" === d && (a.top = b.top + (c.height - a.height), a.left = b.left + (c.width - a.width)), a
		},
		_respectSize: function (a) {
			var b = this._vBoundaries,
				c = this.axis,
				d = this._isNumber(a.width) && b.maxWidth && b.maxWidth < a.width,
				e = this._isNumber(a.height) && b.maxHeight && b.maxHeight < a.height,
				f = this._isNumber(a.width) && b.minWidth && b.minWidth > a.width,
				g = this._isNumber(a.height) && b.minHeight && b.minHeight > a.height,
				h = this.originalPosition.left + this.originalSize.width,
				i = this.originalPosition.top + this.originalSize.height,
				j = /sw|nw|w/.test(c),
				k = /nw|ne|n/.test(c);
			return f && (a.width = b.minWidth), g && (a.height = b.minHeight), d && (a.width = b.maxWidth), e && (a.height = b.maxHeight), f && j && (a.left = h - b.minWidth), d && j && (a.left = h - b.maxWidth), g && k && (a.top = i - b.minHeight), e && k && (a.top = i - b.maxHeight), a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null, a
		},
		_getPaddingPlusBorderDimensions: function (a) {
			for (var b = 0, c = [], d = [a.css("borderTopWidth"), a.css("borderRightWidth"), a.css("borderBottomWidth"), a.css("borderLeftWidth")], e = [a.css("paddingTop"), a.css("paddingRight"), a.css("paddingBottom"), a.css("paddingLeft")]; b < 4; b++) c[b] = parseFloat(d[b]) || 0, c[b] += parseFloat(e[b]) || 0;
			return {
				height: c[0] + c[2],
				width: c[1] + c[3]
			}
		},
		_proportionallyResize: function () {
			if (this._proportionallyResizeElements.length)
				for (var a, b = 0, c = this.helper || this.element; b < this._proportionallyResizeElements.length; b++) a = this._proportionallyResizeElements[b], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(a)), a.css({
					height: c.height() - this.outerDimensions.height || 0,
					width: c.width() - this.outerDimensions.width || 0
				})
		},
		_renderProxy: function () {
			var b = this.element,
				c = this.options;
			this.elementOffset = b.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), this._addClass(this.helper, this._helper), this.helper.css({
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++c.zIndex
			}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
		},
		_change: {
			e: function (a, b) {
				return {
					width: this.originalSize.width + b
				}
			},
			w: function (a, b) {
				var c = this.originalSize,
					d = this.originalPosition;
				return {
					left: d.left + b,
					width: c.width - b
				}
			},
			n: function (a, b, c) {
				var d = this.originalSize,
					e = this.originalPosition;
				return {
					top: e.top + c,
					height: d.height - c
				}
			},
			s: function (a, b, c) {
				return {
					height: this.originalSize.height + c
				}
			},
			se: function (b, c, d) {
				return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
			},
			sw: function (b, c, d) {
				return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
			},
			ne: function (b, c, d) {
				return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
			},
			nw: function (b, c, d) {
				return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
			}
		},
		_propagate: function (b, c) {
			a.ui.plugin.call(this, b, [c, this.ui()]), "resize" !== b && this._trigger(b, c, this.ui())
		},
		plugins: {},
		ui: function () {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	}), a.ui.plugin.add("resizable", "animate", {
		stop: function (b) {
			var c = a(this).resizable("instance"),
				d = c.options,
				e = c._proportionallyResizeElements,
				f = e.length && /textarea/i.test(e[0].nodeName),
				g = f && c._hasScroll(e[0], "left") ? 0 : c.sizeDiff.height,
				h = f ? 0 : c.sizeDiff.width,
				i = {
					width: c.size.width - h,
					height: c.size.height - g
				},
				j = parseFloat(c.element.css("left")) + (c.position.left - c.originalPosition.left) || null,
				k = parseFloat(c.element.css("top")) + (c.position.top - c.originalPosition.top) || null;
			c.element.animate(a.extend(i, k && j ? {
				top: k,
				left: j
			} : {}), {
				duration: d.animateDuration,
				easing: d.animateEasing,
				step: function () {
					var d = {
						width: parseFloat(c.element.css("width")),
						height: parseFloat(c.element.css("height")),
						top: parseFloat(c.element.css("top")),
						left: parseFloat(c.element.css("left"))
					};
					e && e.length && a(e[0]).css({
						width: d.width,
						height: d.height
					}), c._updateCache(d), c._propagate("resize", b)
				}
			})
		}
	}), a.ui.plugin.add("resizable", "containment", {
		start: function () {
			var b, c, d, e, f, g, h, i = a(this).resizable("instance"),
				j = i.options,
				k = i.element,
				l = j.containment,
				m = l instanceof a ? l.get(0) : /parent/.test(l) ? k.parent().get(0) : l;
			m && (i.containerElement = a(m), /document/.test(l) || l === document ? (i.containerOffset = {
				left: 0,
				top: 0
			}, i.containerPosition = {
				left: 0,
				top: 0
			}, i.parentData = {
				element: a(document),
				left: 0,
				top: 0,
				width: a(document).width(),
				height: a(document).height() || document.body.parentNode.scrollHeight
			}) : (b = a(m), c = [], a(["Top", "Right", "Left", "Bottom"]).each(function (a, d) {
				c[a] = i._num(b.css("padding" + d))
			}), i.containerOffset = b.offset(), i.containerPosition = b.position(), i.containerSize = {
				height: b.innerHeight() - c[3],
				width: b.innerWidth() - c[1]
			}, d = i.containerOffset, e = i.containerSize.height, f = i.containerSize.width, g = i._hasScroll(m, "left") ? m.scrollWidth : f, h = i._hasScroll(m) ? m.scrollHeight : e, i.parentData = {
				element: m,
				left: d.left,
				top: d.top,
				width: g,
				height: h
			}))
		},
		resize: function (b) {
			var c, d, e, f, g = a(this).resizable("instance"),
				h = g.options,
				i = g.containerOffset,
				j = g.position,
				k = g._aspectRatio || b.shiftKey,
				l = {
					top: 0,
					left: 0
				},
				m = g.containerElement,
				n = !0;
			m[0] !== document && /static/.test(m.css("position")) && (l = i), j.left < (g._helper ? i.left : 0) && (g.size.width = g.size.width + (g._helper ? g.position.left - i.left : g.position.left - l.left), k && (g.size.height = g.size.width / g.aspectRatio, n = !1), g.position.left = h.helper ? i.left : 0), j.top < (g._helper ? i.top : 0) && (g.size.height = g.size.height + (g._helper ? g.position.top - i.top : g.position.top), k && (g.size.width = g.size.height * g.aspectRatio, n = !1), g.position.top = g._helper ? i.top : 0), e = g.containerElement.get(0) === g.element.parent().get(0), f = /relative|absolute/.test(g.containerElement.css("position")), e && f ? (g.offset.left = g.parentData.left + g.position.left, g.offset.top = g.parentData.top + g.position.top) : (g.offset.left = g.element.offset().left, g.offset.top = g.element.offset().top), c = Math.abs(g.sizeDiff.width + (g._helper ? g.offset.left - l.left : g.offset.left - i.left)), d = Math.abs(g.sizeDiff.height + (g._helper ? g.offset.top - l.top : g.offset.top - i.top)), c + g.size.width >= g.parentData.width && (g.size.width = g.parentData.width - c, k && (g.size.height = g.size.width / g.aspectRatio, n = !1)), d + g.size.height >= g.parentData.height && (g.size.height = g.parentData.height - d, k && (g.size.width = g.size.height * g.aspectRatio, n = !1)), n || (g.position.left = g.prevPosition.left, g.position.top = g.prevPosition.top, g.size.width = g.prevSize.width, g.size.height = g.prevSize.height)
		},
		stop: function () {
			var b = a(this).resizable("instance"),
				c = b.options,
				d = b.containerOffset,
				e = b.containerPosition,
				f = b.containerElement,
				g = a(b.helper),
				h = g.offset(),
				i = g.outerWidth() - b.sizeDiff.width,
				j = g.outerHeight() - b.sizeDiff.height;
			b._helper && !c.animate && /relative/.test(f.css("position")) && a(this).css({
				left: h.left - e.left - d.left,
				width: i,
				height: j
			}), b._helper && !c.animate && /static/.test(f.css("position")) && a(this).css({
				left: h.left - e.left - d.left,
				width: i,
				height: j
			})
		}
	}), a.ui.plugin.add("resizable", "alsoResize", {
		start: function () {
			var b = a(this).resizable("instance"),
				c = b.options;
			a(c.alsoResize).each(function () {
				var b = a(this);
				b.data("ui-resizable-alsoresize", {
					width: parseFloat(b.width()),
					height: parseFloat(b.height()),
					left: parseFloat(b.css("left")),
					top: parseFloat(b.css("top"))
				})
			})
		},
		resize: function (b, c) {
			var d = a(this).resizable("instance"),
				e = d.options,
				f = d.originalSize,
				g = d.originalPosition,
				h = {
					height: d.size.height - f.height || 0,
					width: d.size.width - f.width || 0,
					top: d.position.top - g.top || 0,
					left: d.position.left - g.left || 0
				};
			a(e.alsoResize).each(function () {
				var b = a(this),
					d = a(this).data("ui-resizable-alsoresize"),
					e = {},
					f = b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
				a.each(f, function (a, b) {
					var c = (d[b] || 0) + (h[b] || 0);
					c && c >= 0 && (e[b] = c || null)
				}), b.css(e)
			})
		},
		stop: function () {
			a(this).removeData("ui-resizable-alsoresize")
		}
	}), a.ui.plugin.add("resizable", "ghost", {
		start: function () {
			var b = a(this).resizable("instance"),
				c = b.size;
			b.ghost = b.originalElement.clone(), b.ghost.css({
				opacity: .25,
				display: "block",
				position: "relative",
				height: c.height,
				width: c.width,
				margin: 0,
				left: 0,
				top: 0
			}), b._addClass(b.ghost, "ui-resizable-ghost"), a.uiBackCompat !== !1 && "string" == typeof b.options.ghost && b.ghost.addClass(this.options.ghost), b.ghost.appendTo(b.helper)
		},
		resize: function () {
			var b = a(this).resizable("instance");
			b.ghost && b.ghost.css({
				position: "relative",
				height: b.size.height,
				width: b.size.width
			})
		},
		stop: function () {
			var b = a(this).resizable("instance");
			b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
		}
	}), a.ui.plugin.add("resizable", "grid", {
		resize: function () {
			var b, c = a(this).resizable("instance"),
				d = c.options,
				e = c.size,
				f = c.originalSize,
				g = c.originalPosition,
				h = c.axis,
				i = "number" == typeof d.grid ? [d.grid, d.grid] : d.grid,
				j = i[0] || 1,
				k = i[1] || 1,
				l = Math.round((e.width - f.width) / j) * j,
				m = Math.round((e.height - f.height) / k) * k,
				n = f.width + l,
				o = f.height + m,
				p = d.maxWidth && d.maxWidth < n,
				q = d.maxHeight && d.maxHeight < o,
				r = d.minWidth && d.minWidth > n,
				s = d.minHeight && d.minHeight > o;
			d.grid = i, r && (n += j), s && (o += k), p && (n -= j), q && (o -= k), /^(se|s|e)$/.test(h) ? (c.size.width = n, c.size.height = o) : /^(ne)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.top = g.top - m) : /^(sw)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.left = g.left - l) : ((o - k <= 0 || n - j <= 0) && (b = c._getPaddingPlusBorderDimensions(this)), o - k > 0 ? (c.size.height = o, c.position.top = g.top - m) : (o = k - b.height, c.size.height = o, c.position.top = g.top + f.height - o), n - j > 0 ? (c.size.width = n, c.position.left = g.left - l) : (n = j - b.width, c.size.width = n, c.position.left = g.left + f.width - n))
		}
	});
	a.ui.resizable;
	a.widget("ui.dialog", {
		version: "1.12.1",
		options: {
			appendTo: "body",
			autoOpen: !0,
			buttons: [],
			classes: {
				"ui-dialog": "ui-corner-all",
				"ui-dialog-titlebar": "ui-corner-all"
			},
			closeOnEscape: !0,
			closeText: "Close",
			draggable: !0,
			hide: null,
			height: "auto",
			maxHeight: null,
			maxWidth: null,
			minHeight: 150,
			minWidth: 150,
			modal: !1,
			position: {
				my: "center",
				at: "center",
				of: window,
				collision: "fit",
				using: function (b) {
					var c = a(this).css(b).offset().top;
					c < 0 && a(this).css("top", b.top - c)
				}
			},
			resizable: !0,
			show: null,
			title: null,
			width: 300,
			beforeClose: null,
			close: null,
			drag: null,
			dragStart: null,
			dragStop: null,
			focus: null,
			open: null,
			resize: null,
			resizeStart: null,
			resizeStop: null
		},
		sizeRelatedOptions: {
			buttons: !0,
			height: !0,
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0,
			width: !0
		},
		resizableRelatedOptions: {
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0
		},
		_create: function () {
			this.originalCss = {
				display: this.element[0].style.display,
				width: this.element[0].style.width,
				minHeight: this.element[0].style.minHeight,
				maxHeight: this.element[0].style.maxHeight,
				height: this.element[0].style.height
			}, this.originalPosition = {
				parent: this.element.parent(),
				index: this.element.parent().children().index(this.element)
			}, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle), this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog), this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(), this._createButtonPane(), this.options.draggable && a.fn.draggable && this._makeDraggable(), this.options.resizable && a.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus();
		},
		_init: function () {
			this.options.autoOpen && this.open()
		},
		_appendTo: function () {
			var b = this.options.appendTo;
			return b && (b.jquery || b.nodeType) ? a(b) : this.document.find(b || "body").eq(0)
		},
		_destroy: function () {
			var a, b = this.originalPosition;
			this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), a = b.parent.children().eq(b.index), a.length && a[0] !== this.element[0] ? a.before(this.element) : b.parent.append(this.element)
		},
		widget: function () {
			return this.uiDialog
		},
		disable: a.noop,
		enable: a.noop,
		close: function (b) {
			var c = this;
			this._isOpen && this._trigger("beforeClose", b) !== !1 && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || a.ui.safeBlur(a.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function () {
				c._trigger("close", b)
			}))
		},
		isOpen: function () {
			return this._isOpen
		},
		moveToTop: function () {
			this._moveToTop()
		},
		_moveToTop: function (b, c) {
			var d = !1,
				e = this.uiDialog.siblings(".ui-front:visible").map(function () {
					return +a(this).css("z-index")
				}).get(),
				f = Math.max.apply(null, e);
			return f >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", f + 1), d = !0), d && !c && this._trigger("focus", b), d
		},
		open: function () {
			var b = this;
			return this._isOpen ? void(this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, this.opener = a(a.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function () {
				b._focusTabbable(), b._trigger("focus")
			}), this._makeFocusTarget(), void this._trigger("open"))
		},
		_focusTabbable: function () {
			var a = this._focusedElement;
			a || (a = this.element.find("[autofocus]")), a.length || (a = this.element.find(":tabbable")), a.length || (a = this.uiDialogButtonPane.find(":tabbable")), a.length || (a = this.uiDialogTitlebarClose.filter(":tabbable")), a.length || (a = this.uiDialog), a.eq(0).trigger("focus")
		},
		_keepFocus: function (b) {
			function c() {
				var b = a.ui.safeActiveElement(this.document[0]),
					c = this.uiDialog[0] === b || a.contains(this.uiDialog[0], b);
				c || this._focusTabbable()
			}
			b.preventDefault(), c.call(this), this._delay(c)
		},
		_createWrapper: function () {
			this.uiDialog = a("<div>").hide().attr({
				tabIndex: -1,
				role: "dialog"
			}).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"), this._on(this.uiDialog, {
				keydown: function (b) {
					if (this.options.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === a.ui.keyCode.ESCAPE) return b.preventDefault(), void this.close(b);
					if (b.keyCode === a.ui.keyCode.TAB && !b.isDefaultPrevented()) {
						var c = this.uiDialog.find(":tabbable"),
							d = c.filter(":first"),
							e = c.filter(":last");
						b.target !== e[0] && b.target !== this.uiDialog[0] || b.shiftKey ? b.target !== d[0] && b.target !== this.uiDialog[0] || !b.shiftKey || (this._delay(function () {
							e.trigger("focus")
						}), b.preventDefault()) : (this._delay(function () {
							d.trigger("focus")
						}), b.preventDefault())
					}
				},
				mousedown: function (a) {
					this._moveToTop(a) && this._focusTabbable()
				}
			}), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
				"aria-describedby": this.element.uniqueId().attr("id")
			})
		},
		_createTitlebar: function () {
			var b;
			this.uiDialogTitlebar = a("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"), this._on(this.uiDialogTitlebar, {
				mousedown: function (b) {
					a(b.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
				}
			}), this.uiDialogTitlebarClose = a("<button type='button'></button>").button({
				label: a("<a>").text(this.options.closeText).html(),
				icon: "ui-icon-closethick",
				showLabel: !1
			}).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"), this._on(this.uiDialogTitlebarClose, {
				click: function (a) {
					a.preventDefault(), this.close(a)
				}
			}), b = a("<span>").uniqueId().prependTo(this.uiDialogTitlebar), this._addClass(b, "ui-dialog-title"), this._title(b), this.uiDialogTitlebar.prependTo(this.uiDialog), this.uiDialog.attr({
				"aria-labelledby": b.attr("id")
			})
		},
		_title: function (a) {
			this.options.title ? a.text(this.options.title) : a.html("&#160;")
		},
		_createButtonPane: function () {
			this.uiDialogButtonPane = a("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"), this.uiButtonSet = a("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"), this._createButtons()
		},
		_createButtons: function () {
			var b = this,
				c = this.options.buttons;
			return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), a.isEmptyObject(c) || a.isArray(c) && !c.length ? void this._removeClass(this.uiDialog, "ui-dialog-buttons") : (a.each(c, function (c, d) {
				var e, f;
				d = a.isFunction(d) ? {
					click: d,
					text: c
				} : d, d = a.extend({
					type: "button"
				}, d), e = d.click, f = {
					icon: d.icon,
					iconPosition: d.iconPosition,
					showLabel: d.showLabel,
					icons: d.icons,
					text: d.text
				}, delete d.click, delete d.icon, delete d.iconPosition, delete d.showLabel, delete d.icons, "boolean" == typeof d.text && delete d.text, a("<button></button>", d).button(f).appendTo(b.uiButtonSet).on("click", function () {
					e.apply(b.element[0], arguments)
				})
			}), this._addClass(this.uiDialog, "ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog))
		},
		_makeDraggable: function () {
			function d(a) {
				return {
					position: a.position,
					offset: a.offset
				}
			}
			var b = this,
				c = this.options;
			this.uiDialog.draggable({
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function (c, e) {
					b._addClass(a(this), "ui-dialog-dragging"), b._blockFrames(), b._trigger("dragStart", c, d(e))
				},
				drag: function (a, c) {
					b._trigger("drag", a, d(c))
				},
				stop: function (e, f) {
					var g = f.offset.left - b.document.scrollLeft(),
						h = f.offset.top - b.document.scrollTop();
					c.position = {
						my: "left top",
						at: "left" + (g >= 0 ? "+" : "") + g + " top" + (h >= 0 ? "+" : "") + h,
						of: b.window
					}, b._removeClass(a(this), "ui-dialog-dragging"), b._unblockFrames(), b._trigger("dragStop", e, d(f))
				}
			})
		},
		_makeResizable: function () {
			function g(a) {
				return {
					originalPosition: a.originalPosition,
					originalSize: a.originalSize,
					position: a.position,
					size: a.size
				}
			}
			var b = this,
				c = this.options,
				d = c.resizable,
				e = this.uiDialog.css("position"),
				f = "string" == typeof d ? d : "n,e,s,w,se,sw,ne,nw";
			this.uiDialog.resizable({
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: this.element,
				maxWidth: c.maxWidth,
				maxHeight: c.maxHeight,
				minWidth: c.minWidth,
				minHeight: this._minHeight(),
				handles: f,
				start: function (c, d) {
					b._addClass(a(this), "ui-dialog-resizing"), b._blockFrames(), b._trigger("resizeStart", c, g(d))
				},
				resize: function (a, c) {
					b._trigger("resize", a, g(c))
				},
				stop: function (d, e) {
					var f = b.uiDialog.offset(),
						h = f.left - b.document.scrollLeft(),
						i = f.top - b.document.scrollTop();
					c.height = b.uiDialog.height(), c.width = b.uiDialog.width(), c.position = {
						my: "left top",
						at: "left" + (h >= 0 ? "+" : "") + h + " top" + (i >= 0 ? "+" : "") + i,
						of: b.window
					}, b._removeClass(a(this), "ui-dialog-resizing"), b._unblockFrames(), b._trigger("resizeStop", d, g(e))
				}
			}).css("position", e)
		},
		_trackFocus: function () {
			this._on(this.widget(), {
				focusin: function (b) {
					this._makeFocusTarget(), this._focusedElement = a(b.target)
				}
			})
		},
		_makeFocusTarget: function () {
			this._untrackInstance(), this._trackingInstances().unshift(this)
		},
		_untrackInstance: function () {
			var b = this._trackingInstances(),
				c = a.inArray(this, b);
			c !== -1 && b.splice(c, 1)
		},
		_trackingInstances: function () {
			var a = this.document.data("ui-dialog-instances");
			return a || (a = [], this.document.data("ui-dialog-instances", a)), a
		},
		_minHeight: function () {
			var a = this.options;
			return "auto" === a.height ? a.minHeight : Math.min(a.minHeight, a.height)
		},
		_position: function () {
			var a = this.uiDialog.is(":visible");
			a || this.uiDialog.show(), this.uiDialog.position(this.options.position), a || this.uiDialog.hide()
		},
		_setOptions: function (b) {
			var c = this,
				d = !1,
				e = {};
			a.each(b, function (a, b) {
				c._setOption(a, b), a in c.sizeRelatedOptions && (d = !0), a in c.resizableRelatedOptions && (e[a] = b)
			}), d && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", e)
		},
		_setOption: function (b, c) {
			var d, e, f = this.uiDialog;
			"disabled" !== b && (this._super(b, c), "appendTo" === b && this.uiDialog.appendTo(this._appendTo()), "buttons" === b && this._createButtons(), "closeText" === b && this.uiDialogTitlebarClose.button({
				label: a("<a>").text("" + this.options.closeText).html()
			}), "draggable" === b && (d = f.is(":data(ui-draggable)"), d && !c && f.draggable("destroy"), !d && c && this._makeDraggable()), "position" === b && this._position(), "resizable" === b && (e = f.is(":data(ui-resizable)"), e && !c && f.resizable("destroy"), e && "string" == typeof c && f.resizable("option", "handles", c), e || c === !1 || this._makeResizable()), "title" === b && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
		},
		_size: function () {
			var a, b, c, d = this.options;
			this.element.show().css({
				width: "auto",
				minHeight: 0,
				maxHeight: "none",
				height: 0
			}), d.minWidth > d.width && (d.width = d.minWidth), a = this.uiDialog.css({
				height: "auto",
				width: d.width
			}).outerHeight(), b = Math.max(0, d.minHeight - a), c = "number" == typeof d.maxHeight ? Math.max(0, d.maxHeight - a) : "none", "auto" === d.height ? this.element.css({
				minHeight: b,
				maxHeight: c,
				height: "auto"
			}) : this.element.height(Math.max(0, d.height - a)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
		},
		_blockFrames: function () {
			this.iframeBlocks = this.document.find("iframe").map(function () {
				var b = a(this);
				return a("<div>").css({
					position: "absolute",
					width: b.outerWidth(),
					height: b.outerHeight()
				}).appendTo(b.parent()).offset(b.offset())[0]
			})
		},
		_unblockFrames: function () {
			this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
		},
		_allowInteraction: function (b) {
			return !!a(b.target).closest(".ui-dialog").length || !!a(b.target).closest(".ui-datepicker").length
		},
		_createOverlay: function () {
			if (this.options.modal) {
				var b = !0;
				this._delay(function () {
					b = !1
				}), this.document.data("ui-dialog-overlays") || this._on(this.document, {
					focusin: function (a) {
						b || this._allowInteraction(a) || (a.preventDefault(), this._trackingInstances()[0]._focusTabbable())
					}
				}), this.overlay = a("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"), this._on(this.overlay, {
					mousedown: "_keepFocus"
				}), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
			}
		},
		_destroyOverlay: function () {
			if (this.options.modal && this.overlay) {
				var a = this.document.data("ui-dialog-overlays") - 1;
				a ? this.document.data("ui-dialog-overlays", a) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null
			}
		}
	}), a.uiBackCompat !== !1 && a.widget("ui.dialog", a.ui.dialog, {
		options: {
			dialogClass: ""
		},
		_createWrapper: function () {
			this._super(), this.uiDialog.addClass(this.options.dialogClass)
		},
		_setOption: function (a, b) {
			"dialogClass" === a && this.uiDialog.removeClass(this.options.dialogClass).addClass(b), this._superApply(arguments)
		}
	});
	a.ui.dialog;
	a.widget("ui.droppable", {
		version: "1.12.1",
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			addClasses: !0,
			greedy: !1,
			scope: "default",
			tolerance: "intersect",
			activate: null,
			deactivate: null,
			drop: null,
			out: null,
			over: null
		},
		_create: function () {
			var b, c = this.options,
				d = c.accept;
			this.isover = !1, this.isout = !0, this.accept = a.isFunction(d) ? d : function (a) {
				return a.is(d)
			}, this.proportions = function () {
				return arguments.length ? void(b = arguments[0]) : b ? b : b = {
					width: this.element[0].offsetWidth,
					height: this.element[0].offsetHeight
				}
			}, this._addToManager(c.scope), c.addClasses && this._addClass("ui-droppable")
		},
		_addToManager: function (b) {
			a.ui.ddmanager.droppables[b] = a.ui.ddmanager.droppables[b] || [], a.ui.ddmanager.droppables[b].push(this)
		},
		_splice: function (a) {
			for (var b = 0; b < a.length; b++) a[b] === this && a.splice(b, 1)
		},
		_destroy: function () {
			var b = a.ui.ddmanager.droppables[this.options.scope];
			this._splice(b)
		},
		_setOption: function (b, c) {
			if ("accept" === b) this.accept = a.isFunction(c) ? c : function (a) {
				return a.is(c)
			};
			else if ("scope" === b) {
				var d = a.ui.ddmanager.droppables[this.options.scope];
				this._splice(d), this._addToManager(c)
			}
			this._super(b, c)
		},
		_activate: function (b) {
			var c = a.ui.ddmanager.current;
			this._addActiveClass(), c && this._trigger("activate", b, this.ui(c))
		},
		_deactivate: function (b) {
			var c = a.ui.ddmanager.current;
			this._removeActiveClass(), c && this._trigger("deactivate", b, this.ui(c))
		},
		_over: function (b) {
			var c = a.ui.ddmanager.current;
			c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this._addHoverClass(), this._trigger("over", b, this.ui(c)))
		},
		_out: function (b) {
			var c = a.ui.ddmanager.current;
			c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this._removeHoverClass(), this._trigger("out", b, this.ui(c)))
		},
		_drop: function (b, c) {
			var d = c || a.ui.ddmanager.current,
				e = !1;
			return !(!d || (d.currentItem || d.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
				var c = a(this).droppable("instance");
				if (c.options.greedy && !c.options.disabled && c.options.scope === d.options.scope && c.accept.call(c.element[0], d.currentItem || d.element) && ha(d, a.extend(c, {
						offset: c.element.offset()
					}), c.options.tolerance, b)) return e = !0, !1
			}), !e && (!!this.accept.call(this.element[0], d.currentItem || d.element) && (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", b, this.ui(d)), this.element)))
		},
		ui: function (a) {
			return {
				draggable: a.currentItem || a.element,
				helper: a.helper,
				position: a.position,
				offset: a.positionAbs
			}
		},
		_addHoverClass: function () {
			this._addClass("ui-droppable-hover")
		},
		_removeHoverClass: function () {
			this._removeClass("ui-droppable-hover")
		},
		_addActiveClass: function () {
			this._addClass("ui-droppable-active")
		},
		_removeActiveClass: function () {
			this._removeClass("ui-droppable-active")
		}
	});
	var ha = a.ui.intersect = function () {
		function a(a, b, c) {
			return a >= b && a < b + c
		}
		return function (b, c, d, e) {
			if (!c.offset) return !1;
			var f = (b.positionAbs || b.position.absolute).left + b.margins.left,
				g = (b.positionAbs || b.position.absolute).top + b.margins.top,
				h = f + b.helperProportions.width,
				i = g + b.helperProportions.height,
				j = c.offset.left,
				k = c.offset.top,
				l = j + c.proportions().width,
				m = k + c.proportions().height;
			switch (d) {
				case "fit":
					return j <= f && h <= l && k <= g && i <= m;
				case "intersect":
					return j < f + b.helperProportions.width / 2 && h - b.helperProportions.width / 2 < l && k < g + b.helperProportions.height / 2 && i - b.helperProportions.height / 2 < m;
				case "pointer":
					return a(e.pageY, k, c.proportions().height) && a(e.pageX, j, c.proportions().width);
				case "touch":
					return (g >= k && g <= m || i >= k && i <= m || g < k && i > m) && (f >= j && f <= l || h >= j && h <= l || f < j && h > l);
				default:
					return !1
			}
		}
	}();
	a.ui.ddmanager = {
		current: null,
		droppables: {
			default: []
		},
		prepareOffsets: function (b, c) {
			var d, e, f = a.ui.ddmanager.droppables[b.options.scope] || [],
				g = c ? c.type : null,
				h = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
			a: for (d = 0; d < f.length; d++)
				if (!(f[d].options.disabled || b && !f[d].accept.call(f[d].element[0], b.currentItem || b.element))) {
					for (e = 0; e < h.length; e++)
						if (h[e] === f[d].element[0]) {
							f[d].proportions().height = 0;
							continue a
						}
					f[d].visible = "none" !== f[d].element.css("display"), f[d].visible && ("mousedown" === g && f[d]._activate.call(f[d], c), f[d].offset = f[d].element.offset(), f[d].proportions({
						width: f[d].element[0].offsetWidth,
						height: f[d].element[0].offsetHeight
					}))
				}
		},
		drop: function (b, c) {
			var d = !1;
			return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function () {
				this.options && (!this.options.disabled && this.visible && ha(b, this, this.options.tolerance, c) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, c)))
			}), d
		},
		dragStart: function (b, c) {
			b.element.parentsUntil("body").on("scroll.droppable", function () {
				b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
			})
		},
		drag: function (b, c) {
			b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
				if (!this.options.disabled && !this.greedyChild && this.visible) {
					var d, e, f, g = ha(b, this, this.options.tolerance, c),
						h = !g && this.isover ? "isout" : g && !this.isover ? "isover" : null;
					h && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function () {
						return a(this).droppable("instance").options.scope === e
					}), f.length && (d = a(f[0]).droppable("instance"), d.greedyChild = "isover" === h)), d && "isover" === h && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[h] = !0, this["isout" === h ? "isover" : "isout"] = !1, this["isover" === h ? "_over" : "_out"].call(this, c), d && "isout" === h && (d.isout = !1, d.isover = !0, d._over.call(d, c)))
				}
			})
		},
		dragStop: function (b, c) {
			b.element.parentsUntil("body").off("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
		}
	}, a.uiBackCompat !== !1 && a.widget("ui.droppable", a.ui.droppable, {
		options: {
			hoverClass: !1,
			activeClass: !1
		},
		_addActiveClass: function () {
			this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass)
		},
		_removeActiveClass: function () {
			this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass)
		},
		_addHoverClass: function () {
			this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass)
		},
		_removeHoverClass: function () {
			this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
		}
	});
	a.ui.droppable, a.widget("ui.progressbar", {
		version: "1.12.1",
		options: {
			classes: {
				"ui-progressbar": "ui-corner-all",
				"ui-progressbar-value": "ui-corner-left",
				"ui-progressbar-complete": "ui-corner-right"
			},
			max: 100,
			value: 0,
			change: null,
			complete: null
		},
		min: 0,
		_create: function () {
			this.oldValue = this.options.value = this._constrainedValue(), this.element.attr({
				role: "progressbar",
				"aria-valuemin": this.min
			}), this._addClass("ui-progressbar", "ui-widget ui-widget-content"), this.valueDiv = a("<div>").appendTo(this.element), this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"), this._refreshValue()
		},
		_destroy: function () {
			this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove()
		},
		value: function (a) {
			return void 0 === a ? this.options.value : (this.options.value = this._constrainedValue(a), void this._refreshValue())
		},
		_constrainedValue: function (a) {
			return void 0 === a && (a = this.options.value), this.indeterminate = a === !1, "number" != typeof a && (a = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, a))
		},
		_setOptions: function (a) {
			var b = a.value;
			delete a.value, this._super(a), this.options.value = this._constrainedValue(b), this._refreshValue()
		},
		_setOption: function (a, b) {
			"max" === a && (b = Math.max(this.min, b)), this._super(a, b)
		},
		_setOptionDisabled: function (a) {
			this._super(a), this.element.attr("aria-disabled", a), this._toggleClass(null, "ui-state-disabled", !!a)
		},
		_percentage: function () {
			return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
		},
		_refreshValue: function () {
			var b = this.options.value,
				c = this._percentage();
			this.valueDiv.toggle(this.indeterminate || b > this.min).width(c.toFixed(0) + "%"), this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, b === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = a("<div>").appendTo(this.valueDiv), this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
				"aria-valuemax": this.options.max,
				"aria-valuenow": b
			}), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== b && (this.oldValue = b, this._trigger("change")), b === this.options.max && this._trigger("complete")
		}
	}), a.widget("ui.selectable", a.ui.mouse, {
		version: "1.12.1",
		options: {
			appendTo: "body",
			autoRefresh: !0,
			distance: 0,
			filter: "*",
			tolerance: "touch",
			selected: null,
			selecting: null,
			start: null,
			stop: null,
			unselected: null,
			unselecting: null
		},
		_create: function () {
			var b = this;
			this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
				b.elementPos = a(b.element[0]).offset(), b.selectees = a(b.options.filter, b.element[0]), b._addClass(b.selectees, "ui-selectee"), b.selectees.each(function () {
					var c = a(this),
						d = c.offset(),
						e = {
							left: d.left - b.elementPos.left,
							top: d.top - b.elementPos.top
						};
					a.data(this, "selectable-item", {
						element: this,
						$element: c,
						left: e.left,
						top: e.top,
						right: e.left + c.outerWidth(),
						bottom: e.top + c.outerHeight(),
						startselected: !1,
						selected: c.hasClass("ui-selected"),
						selecting: c.hasClass("ui-selecting"),
						unselecting: c.hasClass("ui-unselecting")
					})
				})
			}, this.refresh(), this._mouseInit(), this.helper = a("<div>"), this._addClass(this.helper, "ui-selectable-helper")
		},
		_destroy: function () {
			this.selectees.removeData("selectable-item"), this._mouseDestroy()
		},
		_mouseStart: function (b) {
			var c = this,
				d = this.options;
			this.opos = [b.pageX, b.pageY], this.elementPos = a(this.element[0]).offset(), this.options.disabled || (this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({
				left: b.pageX,
				top: b.pageY,
				width: 0,
				height: 0
			}), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
				var d = a.data(this, "selectable-item");
				d.startselected = !0, b.metaKey || b.ctrlKey || (c._removeClass(d.$element, "ui-selected"), d.selected = !1, c._addClass(d.$element, "ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {
					unselecting: d.element
				}))
			}), a(b.target).parents().addBack().each(function () {
				var d, e = a.data(this, "selectable-item");
				if (e) return d = !b.metaKey && !b.ctrlKey || !e.$element.hasClass("ui-selected"), c._removeClass(e.$element, d ? "ui-unselecting" : "ui-selected")._addClass(e.$element, d ? "ui-selecting" : "ui-unselecting"), e.unselecting = !d, e.selecting = d, e.selected = d, d ? c._trigger("selecting", b, {
					selecting: e.element
				}) : c._trigger("unselecting", b, {
					unselecting: e.element
				}), !1
			}))
		},
		_mouseDrag: function (b) {
			if (this.dragged = !0, !this.options.disabled) {
				var c, d = this,
					e = this.options,
					f = this.opos[0],
					g = this.opos[1],
					h = b.pageX,
					i = b.pageY;
				return f > h && (c = h, h = f, f = c), g > i && (c = i, i = g, g = c), this.helper.css({
					left: f,
					top: g,
					width: h - f,
					height: i - g
				}), this.selectees.each(function () {
					var c = a.data(this, "selectable-item"),
						j = !1,
						k = {};
					c && c.element !== d.element[0] && (k.left = c.left + d.elementPos.left, k.right = c.right + d.elementPos.left, k.top = c.top + d.elementPos.top, k.bottom = c.bottom + d.elementPos.top, "touch" === e.tolerance ? j = !(k.left > h || k.right < f || k.top > i || k.bottom < g) : "fit" === e.tolerance && (j = k.left > f && k.right < h && k.top > g && k.bottom < i), j ? (c.selected && (d._removeClass(c.$element, "ui-selected"), c.selected = !1), c.unselecting && (d._removeClass(c.$element, "ui-unselecting"), c.unselecting = !1), c.selecting || (d._addClass(c.$element, "ui-selecting"), c.selecting = !0, d._trigger("selecting", b, {
						selecting: c.element
					}))) : (c.selecting && ((b.metaKey || b.ctrlKey) && c.startselected ? (d._removeClass(c.$element, "ui-selecting"), c.selecting = !1, d._addClass(c.$element, "ui-selected"), c.selected = !0) : (d._removeClass(c.$element, "ui-selecting"), c.selecting = !1, c.startselected && (d._addClass(c.$element, "ui-unselecting"), c.unselecting = !0), d._trigger("unselecting", b, {
						unselecting: c.element
					}))), c.selected && (b.metaKey || b.ctrlKey || c.startselected || (d._removeClass(c.$element, "ui-selected"), c.selected = !1, d._addClass(c.$element, "ui-unselecting"), c.unselecting = !0, d._trigger("unselecting", b, {
						unselecting: c.element
					})))))
				}), !1
			}
		},
		_mouseStop: function (b) {
			var c = this;
			return this.dragged = !1, a(".ui-unselecting", this.element[0]).each(function () {
				var d = a.data(this, "selectable-item");
				c._removeClass(d.$element, "ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {
					unselected: d.element
				})
			}), a(".ui-selecting", this.element[0]).each(function () {
				var d = a.data(this, "selectable-item");
				c._removeClass(d.$element, "ui-selecting")._addClass(d.$element, "ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {
					selected: d.element
				})
			}), this._trigger("stop", b), this.helper.remove(), !1
		}
	}), a.widget("ui.selectmenu", [a.ui.formResetMixin, {
		version: "1.12.1",
		defaultElement: "<select>",
		options: {
			appendTo: null,
			classes: {
				"ui-selectmenu-button-open": "ui-corner-top",
				"ui-selectmenu-button-closed": "ui-corner-all"
			},
			disabled: null,
			icons: {
				button: "ui-icon-triangle-1-s"
			},
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			width: !1,
			change: null,
			close: null,
			focus: null,
			open: null,
			select: null
		},
		_create: function () {
			var b = this.element.uniqueId().attr("id");
			this.ids = {
				element: b,
				button: b + "-button",
				menu: b + "-menu"
			}, this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), this._rendered = !1, this.menuItems = a()
		},
		_drawButton: function () {
			var b, c = this,
				d = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
			this.labels = this.element.labels().attr("for", this.ids.button), this._on(this.labels, {
				click: function (a) {
					this.button.focus(), a.preventDefault()
				}
			}), this.element.hide(), this.button = a("<span>", {
				tabindex: this.options.disabled ? -1 : 0,
				id: this.ids.button,
				role: "combobox",
				"aria-expanded": "false",
				"aria-autocomplete": "list",
				"aria-owns": this.ids.menu,
				"aria-haspopup": "true",
				title: this.element.attr("title")
			}).insertAfter(this.element), this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"), b = a("<span>").appendTo(this.button), this._addClass(b, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button), this.buttonItem = this._renderButtonItem(d).appendTo(this.button), this.options.width !== !1 && this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function () {
				c._rendered || c._refreshMenu()
			})
		},
		_drawMenu: function () {
			var b = this;
			this.menu = a("<ul>", {
				"aria-hidden": "true",
				"aria-labelledby": this.ids.button,
				id: this.ids.menu
			}), this.menuWrap = a("<div>").append(this.menu), this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"), this.menuWrap.appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
				classes: {
					"ui-menu": "ui-corner-bottom"
				},
				role: "listbox",
				select: function (a, c) {
					a.preventDefault(), b._setSelection(), b._select(c.item.data("ui-selectmenu-item"), a)
				},
				focus: function (a, c) {
					var d = c.item.data("ui-selectmenu-item");
					null != b.focusIndex && d.index !== b.focusIndex && (b._trigger("focus", a, {
						item: d
					}), b.isOpen || b._select(d, a)), b.focusIndex = d.index, b.button.attr("aria-activedescendant", b.menuItems.eq(d.index).attr("id"))
				}
			}).menu("instance"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function () {
				return !1
			}, this.menuInstance._isDivider = function () {
				return !1
			}
		},
		refresh: function () {
			this._refreshMenu(), this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})), null === this.options.width && this._resizeButton()
		},
		_refreshMenu: function () {
			var a, b = this.element.find("option");
			this.menu.empty(), this._parseOptions(b), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"), this._rendered = !0, b.length && (a = this._getSelectedItem(), this.menuInstance.focus(null, a), this._setAria(a.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
		},
		open: function (a) {
			this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", a)))
		},
		_position: function () {
			this.menuWrap.position(a.extend({ of: this.button
			}, this.options.position))
		},
		close: function (a) {
			this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", a))
		},
		widget: function () {
			return this.button
		},
		menuWidget: function () {
			return this.menu
		},
		_renderButtonItem: function (b) {
			var c = a("<span>");
			return this._setText(c, b.label), this._addClass(c, "ui-selectmenu-text"), c
		},
		_renderMenu: function (b, c) {
			var d = this,
				e = "";
			a.each(c, function (c, f) {
				var g;
				f.optgroup !== e && (g = a("<li>", {
					text: f.optgroup
				}), d._addClass(g, "ui-selectmenu-optgroup", "ui-menu-divider" + (f.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), g.appendTo(b), e = f.optgroup), d._renderItemData(b, f)
			})
		},
		_renderItemData: function (a, b) {
			return this._renderItem(a, b).data("ui-selectmenu-item", b)
		},
		_renderItem: function (b, c) {
			var d = a("<li>"),
				e = a("<div>", {
					title: c.element.attr("title")
				});
			return c.disabled && this._addClass(d, null, "ui-state-disabled"), this._setText(e, c.label), d.append(e).appendTo(b)
		},
		_setText: function (a, b) {
			b ? a.text(b) : a.html("&#160;")
		},
		_move: function (a, b) {
			var c, d, e = ".ui-menu-item";
			this.isOpen ? c = this.menuItems.eq(this.focusIndex).parent("li") : (c = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), e += ":not(.ui-state-disabled)"), d = "first" === a || "last" === a ? c["first" === a ? "prevAll" : "nextAll"](e).eq(-1) : c[a + "All"](e).eq(0), d.length && this.menuInstance.focus(b, d)
		},
		_getSelectedItem: function () {
			return this.menuItems.eq(this.element[0].selectedIndex).parent("li")
		},
		_toggle: function (a) {
			this[this.isOpen ? "close" : "open"](a)
		},
		_setSelection: function () {
			var a;
			this.range && (window.getSelection ? (a = window.getSelection(), a.removeAllRanges(), a.addRange(this.range)) : this.range.select(), this.button.focus())
		},
		_documentClick: {
			mousedown: function (b) {
				this.isOpen && (a(b.target).closest(".ui-selectmenu-menu, #" + a.ui.escapeSelector(this.ids.button)).length || this.close(b))
			}
		},
		_buttonEvents: {
			mousedown: function () {
				var a;
				window.getSelection ? (a = window.getSelection(), a.rangeCount && (this.range = a.getRangeAt(0))) : this.range = document.selection.createRange()
			},
			click: function (a) {
				this._setSelection(), this._toggle(a)
			},
			keydown: function (b) {
				var c = !0;
				switch (b.keyCode) {
					case a.ui.keyCode.TAB:
					case a.ui.keyCode.ESCAPE:
						this.close(b), c = !1;
						break;
					case a.ui.keyCode.ENTER:
						this.isOpen && this._selectFocusedItem(b);
						break;
					case a.ui.keyCode.UP:
						b.altKey ? this._toggle(b) : this._move("prev", b);
						break;
					case a.ui.keyCode.DOWN:
						b.altKey ? this._toggle(b) : this._move("next", b);
						break;
					case a.ui.keyCode.SPACE:
						this.isOpen ? this._selectFocusedItem(b) : this._toggle(b);
						break;
					case a.ui.keyCode.LEFT:
						this._move("prev", b);
						break;
					case a.ui.keyCode.RIGHT:
						this._move("next", b);
						break;
					case a.ui.keyCode.HOME:
					case a.ui.keyCode.PAGE_UP:
						this._move("first", b);
						break;
					case a.ui.keyCode.END:
					case a.ui.keyCode.PAGE_DOWN:
						this._move("last", b);
						break;
					default:
						this.menu.trigger(b), c = !1
				}
				c && b.preventDefault()
			}
		},
		_selectFocusedItem: function (a) {
			var b = this.menuItems.eq(this.focusIndex).parent("li");
			b.hasClass("ui-state-disabled") || this._select(b.data("ui-selectmenu-item"), a)
		},
		_select: function (a, b) {
			var c = this.element[0].selectedIndex;
			this.element[0].selectedIndex = a.index, this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(a)), this._setAria(a), this._trigger("select", b, {
				item: a
			}), a.index !== c && this._trigger("change", b, {
				item: a
			}), this.close(b)
		},
		_setAria: function (a) {
			var b = this.menuItems.eq(a.index).attr("id");
			this.button.attr({
				"aria-labelledby": b,
				"aria-activedescendant": b
			}), this.menu.attr("aria-activedescendant", b)
		},
		_setOption: function (a, b) {
			if ("icons" === a) {
				var c = this.button.find("span.ui-icon");
				this._removeClass(c, null, this.options.icons.button)._addClass(c, null, b.button)
			}
			this._super(a, b), "appendTo" === a && this.menuWrap.appendTo(this._appendTo()), "width" === a && this._resizeButton()
		},
		_setOptionDisabled: function (a) {
			this._super(a), this.menuInstance.option("disabled", a), this.button.attr("aria-disabled", a), this._toggleClass(this.button, null, "ui-state-disabled", a), this.element.prop("disabled", a), a ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)
		},
		_appendTo: function () {
			var b = this.options.appendTo;
			return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), b && b[0] || (b = this.element.closest(".ui-front, dialog")), b.length || (b = this.document[0].body), b
		},
		_toggleAttr: function () {
			this.button.attr("aria-expanded", this.isOpen), this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
		},
		_resizeButton: function () {
			var a = this.options.width;
			return a === !1 ? void this.button.css("width", "") : (null === a && (a = this.element.show().outerWidth(), this.element.hide()), void this.button.outerWidth(a))
		},
		_resizeMenu: function () {
			this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
		},
		_getCreateOptions: function () {
			var a = this._super();
			return a.disabled = this.element.prop("disabled"),
				a
		},
		_parseOptions: function (b) {
			var c = this,
				d = [];
			b.each(function (b, e) {
				d.push(c._parseOption(a(e), b))
			}), this.items = d
		},
		_parseOption: function (a, b) {
			var c = a.parent("optgroup");
			return {
				element: a,
				index: b,
				value: a.val(),
				label: a.text(),
				optgroup: c.attr("label") || "",
				disabled: c.prop("disabled") || a.prop("disabled")
			}
		},
		_destroy: function () {
			this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.labels.attr("for", this.ids.element)
		}
    }]), a.widget("ui.slider", a.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "slide",
		options: {
			animate: !1,
			classes: {
				"ui-slider": "ui-corner-all",
				"ui-slider-handle": "ui-corner-all",
				"ui-slider-range": "ui-corner-all ui-widget-header"
			},
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: !1,
			step: 1,
			value: 0,
			values: null,
			change: null,
			slide: null,
			start: null,
			stop: null
		},
		numPages: 5,
		_create: function () {
			this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1
		},
		_refresh: function () {
			this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
		},
		_createHandles: function () {
			var b, c, d = this.options,
				e = this.element.find(".ui-slider-handle"),
				f = "<span tabindex='0'></span>",
				g = [];
			for (c = d.values && d.values.length || 1, e.length > c && (e.slice(c).remove(), e = e.slice(0, c)), b = e.length; b < c; b++) g.push(f);
			this.handles = e.add(a(g.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function (b) {
				a(this).data("ui-slider-handle-index", b).attr("tabIndex", 0)
			})
		},
		_createRange: function () {
			var b = this.options;
			b.range ? (b.range === !0 && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [b.values[0], b.values[0]] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({
				left: "",
				bottom: ""
			})) : (this.range = a("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), "min" !== b.range && "max" !== b.range || this._addClass(this.range, "ui-slider-range-" + b.range)) : (this.range && this.range.remove(), this.range = null)
		},
		_setupEvents: function () {
			this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
		},
		_destroy: function () {
			this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy()
		},
		_mouseCapture: function (b) {
			var c, d, e, f, g, h, i, j, k = this,
				l = this.options;
			return !l.disabled && (this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			}, this.elementOffset = this.element.offset(), c = {
				x: b.pageX,
				y: b.pageY
			}, d = this._normValueFromMouse(c), e = this._valueMax() - this._valueMin() + 1, this.handles.each(function (b) {
				var c = Math.abs(d - k.values(b));
				(e > c || e === c && (b === k._lastChangedValue || k.values(b) === l.min)) && (e = c, f = a(this), g = b)
			}), h = this._start(b, g), h !== !1 && (this._mouseSliding = !0, this._handleIndex = g, this._addClass(f, null, "ui-state-active"), f.trigger("focus"), i = f.offset(), j = !a(b.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = j ? {
				left: 0,
				top: 0
			} : {
				left: b.pageX - i.left - f.width() / 2,
				top: b.pageY - i.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
			}, this.handles.hasClass("ui-state-hover") || this._slide(b, g, d), this._animateOff = !0, !0))
		},
		_mouseStart: function () {
			return !0
		},
		_mouseDrag: function (a) {
			var b = {
					x: a.pageX,
					y: a.pageY
				},
				c = this._normValueFromMouse(b);
			return this._slide(a, this._handleIndex, c), !1
		},
		_mouseStop: function (a) {
			return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
		},
		_detectOrientation: function () {
			this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
		},
		_normValueFromMouse: function (a) {
			var b, c, d, e, f;
			return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), d < 0 && (d = 0), "vertical" === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f)
		},
		_uiHash: function (a, b, c) {
			var d = {
				handle: this.handles[a],
				handleIndex: a,
				value: void 0 !== b ? b : this.value()
			};
			return this._hasMultipleValues() && (d.value = void 0 !== b ? b : this.values(a), d.values = c || this.values()), d
		},
		_hasMultipleValues: function () {
			return this.options.values && this.options.values.length
		},
		_start: function (a, b) {
			return this._trigger("start", a, this._uiHash(b))
		},
		_slide: function (a, b, c) {
			var d, e, f = this.value(),
				g = this.values();
			this._hasMultipleValues() && (e = this.values(b ? 0 : 1), f = this.values(b), 2 === this.options.values.length && this.options.range === !0 && (c = 0 === b ? Math.min(e, c) : Math.max(e, c)), g[b] = c), c !== f && (d = this._trigger("slide", a, this._uiHash(b, c, g)), d !== !1 && (this._hasMultipleValues() ? this.values(b, c) : this.value(c)))
		},
		_stop: function (a, b) {
			this._trigger("stop", a, this._uiHash(b))
		},
		_change: function (a, b) {
			this._keySliding || this._mouseSliding || (this._lastChangedValue = b, this._trigger("change", a, this._uiHash(b)))
		},
		value: function (a) {
			return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), void this._change(null, 0)) : this._value()
		},
		values: function (b, c) {
			var d, e, f;
			if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), void this._change(null, b);
			if (!arguments.length) return this._values();
			if (!a.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(b) : this.value();
			for (d = this.options.values, e = arguments[0], f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]), this._change(null, f);
			this._refreshValue()
		},
		_setOption: function (b, c) {
			var d, e = 0;
			switch ("range" === b && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), a.isArray(this.options.values) && (e = this.options.values.length), this._super(b, c), b) {
				case "orientation":
					this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(c), this.handles.css("horizontal" === c ? "bottom" : "left", "");
					break;
				case "value":
					this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
					break;
				case "values":
					for (this._animateOff = !0, this._refreshValue(), d = e - 1; d >= 0; d--) this._change(null, d);
					this._animateOff = !1;
					break;
				case "step":
				case "min":
				case "max":
					this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
					break;
				case "range":
					this._animateOff = !0, this._refresh(), this._animateOff = !1
			}
		},
		_setOptionDisabled: function (a) {
			this._super(a), this._toggleClass(null, "ui-state-disabled", !!a)
		},
		_value: function () {
			var a = this.options.value;
			return a = this._trimAlignValue(a)
		},
		_values: function (a) {
			var b, c, d;
			if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b);
			if (this._hasMultipleValues()) {
				for (c = this.options.values.slice(), d = 0; d < c.length; d += 1) c[d] = this._trimAlignValue(c[d]);
				return c
			}
			return []
		},
		_trimAlignValue: function (a) {
			if (a <= this._valueMin()) return this._valueMin();
			if (a >= this._valueMax()) return this._valueMax();
			var b = this.options.step > 0 ? this.options.step : 1,
				c = (a - this._valueMin()) % b,
				d = a - c;
			return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5))
		},
		_calculateNewMax: function () {
			var a = this.options.max,
				b = this._valueMin(),
				c = this.options.step,
				d = Math.round((a - b) / c) * c;
			a = d + b, a > this.options.max && (a -= c), this.max = parseFloat(a.toFixed(this._precision()))
		},
		_precision: function () {
			var a = this._precisionOf(this.options.step);
			return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), a
		},
		_precisionOf: function (a) {
			var b = a.toString(),
				c = b.indexOf(".");
			return c === -1 ? 0 : b.length - c - 1
		},
		_valueMin: function () {
			return this.options.min
		},
		_valueMax: function () {
			return this.max
		},
		_refreshRange: function (a) {
			"vertical" === a && this.range.css({
				width: "",
				left: ""
			}), "horizontal" === a && this.range.css({
				height: "",
				bottom: ""
			})
		},
		_refreshValue: function () {
			var b, c, d, e, f, g = this.options.range,
				h = this.options,
				i = this,
				j = !this._animateOff && h.animate,
				k = {};
			this._hasMultipleValues() ? this.handles.each(function (d) {
				c = (i.values(d) - i._valueMin()) / (i._valueMax() - i._valueMin()) * 100, k["horizontal" === i.orientation ? "left" : "bottom"] = c + "%", a(this).stop(1, 1)[j ? "animate" : "css"](k, h.animate), i.options.range === !0 && ("horizontal" === i.orientation ? (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
					left: c + "%"
				}, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
					width: c - b + "%"
				}, {
					queue: !1,
					duration: h.animate
				})) : (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
					bottom: c + "%"
				}, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
					height: c - b + "%"
				}, {
					queue: !1,
					duration: h.animate
				}))), b = c
			}) : (d = this.value(), e = this._valueMin(), f = this._valueMax(), c = f !== e ? (d - e) / (f - e) * 100 : 0, k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[j ? "animate" : "css"](k, h.animate), "min" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
				width: c + "%"
			}, h.animate), "max" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
				width: 100 - c + "%"
			}, h.animate), "min" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
				height: c + "%"
			}, h.animate), "max" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
				height: 100 - c + "%"
			}, h.animate))
		},
		_handleEvents: {
			keydown: function (b) {
				var c, d, e, f, g = a(b.target).data("ui-slider-handle-index");
				switch (b.keyCode) {
					case a.ui.keyCode.HOME:
					case a.ui.keyCode.END:
					case a.ui.keyCode.PAGE_UP:
					case a.ui.keyCode.PAGE_DOWN:
					case a.ui.keyCode.UP:
					case a.ui.keyCode.RIGHT:
					case a.ui.keyCode.DOWN:
					case a.ui.keyCode.LEFT:
						if (b.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(a(b.target), null, "ui-state-active"), c = this._start(b, g), c === !1)) return
				}
				switch (f = this.options.step, d = e = this._hasMultipleValues() ? this.values(g) : this.value(), b.keyCode) {
					case a.ui.keyCode.HOME:
						e = this._valueMin();
						break;
					case a.ui.keyCode.END:
						e = this._valueMax();
						break;
					case a.ui.keyCode.PAGE_UP:
						e = this._trimAlignValue(d + (this._valueMax() - this._valueMin()) / this.numPages);
						break;
					case a.ui.keyCode.PAGE_DOWN:
						e = this._trimAlignValue(d - (this._valueMax() - this._valueMin()) / this.numPages);
						break;
					case a.ui.keyCode.UP:
					case a.ui.keyCode.RIGHT:
						if (d === this._valueMax()) return;
						e = this._trimAlignValue(d + f);
						break;
					case a.ui.keyCode.DOWN:
					case a.ui.keyCode.LEFT:
						if (d === this._valueMin()) return;
						e = this._trimAlignValue(d - f)
				}
				this._slide(b, g, e)
			},
			keyup: function (b) {
				var c = a(b.target).data("ui-slider-handle-index");
				this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), this._removeClass(a(b.target), null, "ui-state-active"))
			}
		}
	}), a.widget("ui.sortable", a.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "sort",
		ready: !1,
		options: {
			appendTo: "parent",
			axis: !1,
			connectWith: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			dropOnEmpty: !0,
			forcePlaceholderSize: !1,
			forceHelperSize: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			items: "> *",
			opacity: !1,
			placeholder: !1,
			revert: !1,
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1e3,
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},
		_isOverAxis: function (a, b, c) {
			return a >= b && a < b + c
		},
		_isFloating: function (a) {
			return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
		},
		_create: function () {
			this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
		},
		_setOption: function (a, b) {
			this._super(a, b), "handle" === a && this._setHandleClassName()
		},
		_setHandleClassName: function () {
			var b = this;
			this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), a.each(this.items, function () {
				b._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
			})
		},
		_destroy: function () {
			this._mouseDestroy();
			for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData(this.widgetName + "-item");
			return this
		},
		_mouseCapture: function (b, c) {
			var d = null,
				e = !1,
				f = this;
			return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(b), a(b.target).parents().each(function () {
				if (a.data(this, f.widgetName + "-item") === f) return d = a(this), !1
			}), a.data(b.target, f.widgetName + "-item") === f && (d = a(b.target)), !!d && (!(this.options.handle && !c && (a(this.options.handle, d).find("*").addBack().each(function () {
				this === b.target && (e = !0)
			}), !e)) && (this.currentItem = d, this._removeCurrentsFromItems(), !0))))
		},
		_mouseStart: function (b, c, d) {
			var e, f, g = this.options;
			if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
					top: this.offset.top - this.margins.top,
					left: this.offset.left - this.margins.left
				}, a.extend(this.offset, {
					click: {
						left: b.pageX - this.offset.left,
						top: b.pageY - this.offset.top
					},
					parent: this._getParentOffset(),
					relative: this._getRelativeOffset()
				}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt), this.domPosition = {
					prev: this.currentItem.prev()[0],
					parent: this.currentItem.parent()[0]
				}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), g.containment && this._setContainment(), g.cursor && "auto" !== g.cursor && (f = this.document.find("body"), this.storedCursor = f.css("cursor"), f.css("cursor", g.cursor), this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)), g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", g.opacity)), g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", g.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d)
				for (e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("activate", b, this._uiHash(this));
			return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(b), !0
		},
		_mouseDrag: function (b) {
			var c, d, e, f, g = this.options,
				h = !1;
			for (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < g.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + g.scrollSpeed : b.pageY - this.overflowOffset.top < g.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - g.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < g.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + g.scrollSpeed : b.pageX - this.overflowOffset.left < g.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - g.scrollSpeed)) : (b.pageY - this.document.scrollTop() < g.scrollSensitivity ? h = this.document.scrollTop(this.document.scrollTop() - g.scrollSpeed) : this.window.height() - (b.pageY - this.document.scrollTop()) < g.scrollSensitivity && (h = this.document.scrollTop(this.document.scrollTop() + g.scrollSpeed)), b.pageX - this.document.scrollLeft() < g.scrollSensitivity ? h = this.document.scrollLeft(this.document.scrollLeft() - g.scrollSpeed) : this.window.width() - (b.pageX - this.document.scrollLeft()) < g.scrollSensitivity && (h = this.document.scrollLeft(this.document.scrollLeft() + g.scrollSpeed))), h !== !1 && a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), c = this.items.length - 1; c >= 0; c--)
				if (d = this.items[c], e = d.item[0], f = this._intersectsWithPointer(d), f && d.instance === this.currentContainer && !(e === this.currentItem[0] || this.placeholder[1 === f ? "next" : "prev"]()[0] === e || a.contains(this.placeholder[0], e) || "semi-dynamic" === this.options.type && a.contains(this.element[0], e))) {
					if (this.direction = 1 === f ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(d)) break;
					this._rearrange(b, d), this._trigger("change", b, this._uiHash());
					break
				}
			return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
		},
		_mouseStop: function (b, c) {
			if (b) {
				if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) {
					var d = this,
						e = this.placeholder.offset(),
						f = this.options.axis,
						g = {};
					f && "x" !== f || (g.left = e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), f && "y" !== f || (g.top = e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function () {
						d._clear(b)
					})
				} else this._clear(b, c);
				return !1
			}
		},
		cancel: function () {
			if (this.dragging) {
				this._mouseUp(new a.Event("mouseup", {
					target: null
				})), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
				for (var b = this.containers.length - 1; b >= 0; b--) this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0)
			}
			return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
				helper: null,
				dragging: !1,
				reverting: !1,
				_noFinalSort: null
			}), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
		},
		serialize: function (b) {
			var c = this._getItemsAsjQuery(b && b.connected),
				d = [];
			return b = b || {}, a(c).each(function () {
				var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
				c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
			}), !d.length && b.key && d.push(b.key + "="), d.join("&")
		},
		toArray: function (b) {
			var c = this._getItemsAsjQuery(b && b.connected),
				d = [];
			return b = b || {}, c.each(function () {
				d.push(a(b.item || this).attr(b.attribute || "id") || "")
			}), d
		},
		_intersectsWith: function (a) {
			var b = this.positionAbs.left,
				c = b + this.helperProportions.width,
				d = this.positionAbs.top,
				e = d + this.helperProportions.height,
				f = a.left,
				g = f + a.width,
				h = a.top,
				i = h + a.height,
				j = this.offset.click.top,
				k = this.offset.click.left,
				l = "x" === this.options.axis || d + j > h && d + j < i,
				m = "y" === this.options.axis || b + k > f && b + k < g,
				n = l && m;
			return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
		},
		_intersectsWithPointer: function (a) {
			var b, c, d = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height),
				e = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width),
				f = d && e;
			return !!f && (b = this._getDragVerticalDirection(), c = this._getDragHorizontalDirection(), this.floating ? "right" === c || "down" === b ? 2 : 1 : b && ("down" === b ? 2 : 1))
		},
		_intersectsWithSides: function (a) {
			var b = this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height),
				c = this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width),
				d = this._getDragVerticalDirection(),
				e = this._getDragHorizontalDirection();
			return this.floating && e ? "right" === e && c || "left" === e && !c : d && ("down" === d && b || "up" === d && !b)
		},
		_getDragVerticalDirection: function () {
			var a = this.positionAbs.top - this.lastPositionAbs.top;
			return 0 !== a && (a > 0 ? "down" : "up")
		},
		_getDragHorizontalDirection: function () {
			var a = this.positionAbs.left - this.lastPositionAbs.left;
			return 0 !== a && (a > 0 ? "right" : "left")
		},
		refresh: function (a) {
			return this._refreshItems(a), this._setHandleClassName(), this.refreshPositions(), this
		},
		_connectWith: function () {
			var a = this.options;
			return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
		},
		_getItemsAsjQuery: function (b) {
			function j() {
				g.push(this)
			}
			var c, d, e, f, g = [],
				h = [],
				i = this._connectWith();
			if (i && b)
				for (c = i.length - 1; c >= 0; c--)
					for (e = a(i[c], this.document[0]), d = e.length - 1; d >= 0; d--) f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && h.push([a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), f]);
			for (h.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
					options: this.options,
					item: this.currentItem
				}) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), c = h.length - 1; c >= 0; c--) h[c][0].each(j);
			return a(g)
		},
		_removeCurrentsFromItems: function () {
			var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
			this.items = a.grep(this.items, function (a) {
				for (var c = 0; c < b.length; c++)
					if (b[c] === a.item[0]) return !1;
				return !0
			})
		},
		_refreshItems: function (b) {
			this.items = [], this.containers = [this];
			var c, d, e, f, g, h, i, j, k = this.items,
				l = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
					item: this.currentItem
				}) : a(this.options.items, this.element), this]],
				m = this._connectWith();
			if (m && this.ready)
				for (c = m.length - 1; c >= 0; c--)
					for (e = a(m[c], this.document[0]), d = e.length - 1; d >= 0; d--) f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && (l.push([a.isFunction(f.options.items) ? f.options.items.call(f.element[0], b, {
						item: this.currentItem
					}) : a(f.options.items, f.element), f]), this.containers.push(f));
			for (c = l.length - 1; c >= 0; c--)
				for (g = l[c][1], h = l[c][0], d = 0, j = h.length; d < j; d++) i = a(h[d]), i.data(this.widgetName + "-item", g), k.push({
					item: i,
					instance: g,
					width: 0,
					height: 0,
					left: 0,
					top: 0
				})
		},
		refreshPositions: function (b) {
			this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)), this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
			var c, d, e, f;
			for (c = this.items.length - 1; c >= 0; c--) d = this.items[c], d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item, b || (d.width = e.outerWidth(), d.height = e.outerHeight()), f = e.offset(), d.left = f.left, d.top = f.top);
			if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
			else
				for (c = this.containers.length - 1; c >= 0; c--) f = this.containers[c].element.offset(), this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
			return this
		},
		_createPlaceholder: function (b) {
			b = b || this;
			var c, d = b.options;
			d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder, d.placeholder = {
				element: function () {
					var d = b.currentItem[0].nodeName.toLowerCase(),
						e = a("<" + d + ">", b.document[0]);
					return b._addClass(e, "ui-sortable-placeholder", c || b.currentItem[0].className)._removeClass(e, "ui-sortable-helper"), "tbody" === d ? b._createTrPlaceholder(b.currentItem.find("tr").eq(0), a("<tr>", b.document[0]).appendTo(e)) : "tr" === d ? b._createTrPlaceholder(b.currentItem, e) : "img" === d && e.attr("src", b.currentItem.attr("src")), c || e.css("visibility", "hidden"), e
				},
				update: function (a, e) {
					c && !d.forcePlaceholderSize || (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)))
				}
			}), b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), d.placeholder.update(b, b.placeholder)
		},
		_createTrPlaceholder: function (b, c) {
			var d = this;
			b.children().each(function () {
				a("<td>&#160;</td>", d.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(c)
			})
		},
		_contactContainers: function (b) {
			var c, d, e, f, g, h, i, j, k, l, m = null,
				n = null;
			for (c = this.containers.length - 1; c >= 0; c--)
				if (!a.contains(this.currentItem[0], this.containers[c].element[0]))
					if (this._intersectsWith(this.containers[c].containerCache)) {
						if (m && a.contains(this.containers[c].element[0], m.element[0])) continue;
						m = this.containers[c], n = c
					} else this.containers[c].containerCache.over && (this.containers[c]._trigger("out", b, this._uiHash(this)), this.containers[c].containerCache.over = 0);
			if (m)
				if (1 === this.containers.length) this.containers[n].containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash(this)), this.containers[n].containerCache.over = 1);
				else {
					for (e = 1e4, f = null, k = m.floating || this._isFloating(this.currentItem), g = k ? "left" : "top", h = k ? "width" : "height", l = k ? "pageX" : "pageY", d = this.items.length - 1; d >= 0; d--) a.contains(this.containers[n].element[0], this.items[d].item[0]) && this.items[d].item[0] !== this.currentItem[0] && (i = this.items[d].item.offset()[g], j = !1, b[l] - i > this.items[d][h] / 2 && (j = !0), Math.abs(b[l] - i) < e && (e = Math.abs(b[l] - i), f = this.items[d], this.direction = j ? "up" : "down"));
					if (!f && !this.options.dropOnEmpty) return;
					if (this.currentContainer === this.containers[n]) return void(this.currentContainer.containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash()), this.currentContainer.containerCache.over = 1));
					f ? this._rearrange(b, f, null, !0) : this._rearrange(b, null, this.containers[n].element, !0), this._trigger("change", b, this._uiHash()), this.containers[n]._trigger("change", b, this._uiHash(this)), this.currentContainer = this.containers[n], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[n]._trigger("over", b, this._uiHash(this)), this.containers[n].containerCache.over = 1
				}
		},
		_createHelper: function (b) {
			var c = this.options,
				d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem;
			return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] === this.currentItem[0] && (this._storedCSS = {
				width: this.currentItem[0].style.width,
				height: this.currentItem[0].style.height,
				position: this.currentItem.css("position"),
				top: this.currentItem.css("top"),
				left: this.currentItem.css("left")
			}), d[0].style.width && !c.forceHelperSize || d.width(this.currentItem.width()), d[0].style.height && !c.forceHelperSize || d.height(this.currentItem.height()), d
		},
		_adjustOffsetFromHelper: function (b) {
			"string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
				left: +b[0],
				top: +b[1] || 0
			}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
		},
		_getParentOffset: function () {
			this.offsetParent = this.helper.offsetParent();
			var b = this.offsetParent.offset();
			return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
				top: 0,
				left: 0
			}), {
				top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function () {
			if ("relative" === this.cssPosition) {
				var a = this.currentItem.position();
				return {
					top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function () {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			}
		},
		_cacheHelperProportions: function () {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function () {
			var b, c, d, e = this.options;
			"parent" === e.containment && (e.containment = this.helper[0].parentNode), "document" !== e.containment && "window" !== e.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === e.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === e.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(e.containment) || (b = a(e.containment)[0], c = a(e.containment).offset(), d = "hidden" !== a(b).css("overflow"), this.containment = [c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
		},
		_convertPositionTo: function (b, c) {
			c || (c = this.position);
			var d = "absolute" === b ? 1 : -1,
				e = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				f = /(html|body)/i.test(e[0].tagName);
			return {
				top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d,
				left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d
			}
		},
		_generatePosition: function (b) {
			var c, d, e = this.options,
				f = b.pageX,
				g = b.pageY,
				h = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				i = /(html|body)/i.test(h[0].tagName);
			return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)),
				e.grid && (c = this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1], g = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - e.grid[1] : c + e.grid[1] : c, d = this.originalPageX + Math.round((f - this.originalPageX) / e.grid[0]) * e.grid[0], f = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - e.grid[0] : d + e.grid[0] : d)), {
				top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : i ? 0 : h.scrollTop()),
				left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : i ? 0 : h.scrollLeft())
			}
		},
		_rearrange: function (a, b, c, d) {
			c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
			var e = this.counter;
			this._delay(function () {
				e === this.counter && this.refreshPositions(!d)
			})
		},
		_clear: function (a, b) {
			function e(a, b, c) {
				return function (d) {
					c._trigger(a, d, b._uiHash(b))
				}
			}
			this.reverting = !1;
			var c, d = [];
			if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
				for (c in this._storedCSS) "auto" !== this._storedCSS[c] && "static" !== this._storedCSS[c] || (this._storedCSS[c] = "");
				this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")
			} else this.currentItem.show();
			for (this.fromOutside && !b && d.push(function (a) {
					this._trigger("receive", a, this._uiHash(this.fromOutside))
				}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || d.push(function (a) {
					this._trigger("update", a, this._uiHash())
				}), this !== this.currentContainer && (b || (d.push(function (a) {
					this._trigger("remove", a, this._uiHash())
				}), d.push(function (a) {
					return function (b) {
						a._trigger("receive", b, this._uiHash(this))
					}
				}.call(this, this.currentContainer)), d.push(function (a) {
					return function (b) {
						a._trigger("update", b, this._uiHash(this))
					}
				}.call(this, this.currentContainer)))), c = this.containers.length - 1; c >= 0; c--) b || d.push(e("deactivate", this, this.containers[c])), this.containers[c].containerCache.over && (d.push(e("out", this, this.containers[c])), this.containers[c].containerCache.over = 0);
			if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, b || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !b) {
				for (c = 0; c < d.length; c++) d[c].call(this, a);
				this._trigger("stop", a, this._uiHash())
			}
			return this.fromOutside = !1, !this.cancelHelperRemoval
		},
		_trigger: function () {
			a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
		},
		_uiHash: function (b) {
			var c = b || this;
			return {
				helper: c.helper,
				placeholder: c.placeholder || a([]),
				position: c.position,
				originalPosition: c.originalPosition,
				offset: c.positionAbs,
				item: c.currentItem,
				sender: b ? b.element : null
			}
		}
	});
	a.widget("ui.spinner", {
		version: "1.12.1",
		defaultElement: "<input>",
		widgetEventPrefix: "spin",
		options: {
			classes: {
				"ui-spinner": "ui-corner-all",
				"ui-spinner-down": "ui-corner-br",
				"ui-spinner-up": "ui-corner-tr"
			},
			culture: null,
			icons: {
				down: "ui-icon-triangle-1-s",
				up: "ui-icon-triangle-1-n"
			},
			incremental: !0,
			max: null,
			min: null,
			numberFormat: null,
			page: 10,
			step: 1,
			change: null,
			spin: null,
			start: null,
			stop: null
		},
		_create: function () {
			this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
				beforeunload: function () {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_getCreateOptions: function () {
			var b = this._super(),
				c = this.element;
			return a.each(["min", "max", "step"], function (a, d) {
				var e = c.attr(d);
				null != e && e.length && (b[d] = e)
			}), b
		},
		_events: {
			keydown: function (a) {
				this._start(a) && this._keydown(a) && a.preventDefault()
			},
			keyup: "_stop",
			focus: function () {
				this.previous = this.element.val()
			},
			blur: function (a) {
				return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", a)))
			},
			mousewheel: function (a, b) {
				if (b) {
					if (!this.spinning && !this._start(a)) return !1;
					this._spin((b > 0 ? 1 : -1) * this.options.step, a), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () {
						this.spinning && this._stop(a)
					}, 100), a.preventDefault()
				}
			},
			"mousedown .ui-spinner-button": function (b) {
				function d() {
					var b = this.element[0] === a.ui.safeActiveElement(this.document[0]);
					b || (this.element.trigger("focus"), this.previous = c, this._delay(function () {
						this.previous = c
					}))
				}
				var c;
				c = this.element[0] === a.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(), b.preventDefault(), d.call(this), this.cancelBlur = !0, this._delay(function () {
					delete this.cancelBlur, d.call(this)
				}), this._start(b) !== !1 && this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
			},
			"mouseup .ui-spinner-button": "_stop",
			"mouseenter .ui-spinner-button": function (b) {
				if (a(b.currentTarget).hasClass("ui-state-active")) return this._start(b) !== !1 && void this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
			},
			"mouseleave .ui-spinner-button": "_stop"
		},
		_enhance: function () {
			this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>")
		},
		_draw: function () {
			this._enhance(), this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"), this._addClass("ui-spinner-input"), this.element.attr("role", "spinbutton"), this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({
				classes: {
					"ui-button": ""
				}
			}), this._removeClass(this.buttons, "ui-corner-all"), this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"), this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"), this.buttons.first().button({
				icon: this.options.icons.up,
				showLabel: !1
			}), this.buttons.last().button({
				icon: this.options.icons.down,
				showLabel: !1
			}), this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height())
		},
		_keydown: function (b) {
			var c = this.options,
				d = a.ui.keyCode;
			switch (b.keyCode) {
				case d.UP:
					return this._repeat(null, 1, b), !0;
				case d.DOWN:
					return this._repeat(null, -1, b), !0;
				case d.PAGE_UP:
					return this._repeat(null, c.page, b), !0;
				case d.PAGE_DOWN:
					return this._repeat(null, -c.page, b), !0
			}
			return !1
		},
		_start: function (a) {
			return !(!this.spinning && this._trigger("start", a) === !1) && (this.counter || (this.counter = 1), this.spinning = !0, !0)
		},
		_repeat: function (a, b, c) {
			a = a || 500, clearTimeout(this.timer), this.timer = this._delay(function () {
				this._repeat(40, b, c)
			}, a), this._spin(b * this.options.step, c)
		},
		_spin: function (a, b) {
			var c = this.value() || 0;
			this.counter || (this.counter = 1), c = this._adjustValue(c + a * this._increment(this.counter)), this.spinning && this._trigger("spin", b, {
				value: c
			}) === !1 || (this._value(c), this.counter++)
		},
		_increment: function (b) {
			var c = this.options.incremental;
			return c ? a.isFunction(c) ? c(b) : Math.floor(b * b * b / 5e4 - b * b / 500 + 17 * b / 200 + 1) : 1
		},
		_precision: function () {
			var a = this._precisionOf(this.options.step);
			return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), a
		},
		_precisionOf: function (a) {
			var b = a.toString(),
				c = b.indexOf(".");
			return c === -1 ? 0 : b.length - c - 1
		},
		_adjustValue: function (a) {
			var b, c, d = this.options;
			return b = null !== d.min ? d.min : 0, c = a - b, c = Math.round(c / d.step) * d.step, a = b + c, a = parseFloat(a.toFixed(this._precision())), null !== d.max && a > d.max ? d.max : null !== d.min && a < d.min ? d.min : a
		},
		_stop: function (a) {
			this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", a))
		},
		_setOption: function (a, b) {
			var c, d, e;
			return "culture" === a || "numberFormat" === a ? (c = this._parse(this.element.val()), this.options[a] = b, void this.element.val(this._format(c))) : ("max" !== a && "min" !== a && "step" !== a || "string" == typeof b && (b = this._parse(b)), "icons" === a && (d = this.buttons.first().find(".ui-icon"), this._removeClass(d, null, this.options.icons.up), this._addClass(d, null, b.up), e = this.buttons.last().find(".ui-icon"), this._removeClass(e, null, this.options.icons.down), this._addClass(e, null, b.down)), void this._super(a, b))
		},
		_setOptionDisabled: function (a) {
			this._super(a), this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!a), this.element.prop("disabled", !!a), this.buttons.button(a ? "disable" : "enable")
		},
		_setOptions: oa(function (a) {
			this._super(a)
		}),
		_parse: function (a) {
			return "string" == typeof a && "" !== a && (a = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(a, 10, this.options.culture) : +a), "" === a || isNaN(a) ? null : a
		},
		_format: function (a) {
			return "" === a ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(a, this.options.numberFormat, this.options.culture) : a
		},
		_refresh: function () {
			this.element.attr({
				"aria-valuemin": this.options.min,
				"aria-valuemax": this.options.max,
				"aria-valuenow": this._parse(this.element.val())
			})
		},
		isValid: function () {
			var a = this.value();
			return null !== a && a === this._adjustValue(a)
		},
		_value: function (a, b) {
			var c;
			"" !== a && (c = this._parse(a), null !== c && (b || (c = this._adjustValue(c)), a = this._format(c))), this.element.val(a), this._refresh()
		},
		_destroy: function () {
			this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"), this.uiSpinner.replaceWith(this.element)
		},
		stepUp: oa(function (a) {
			this._stepUp(a)
		}),
		_stepUp: function (a) {
			this._start() && (this._spin((a || 1) * this.options.step), this._stop())
		},
		stepDown: oa(function (a) {
			this._stepDown(a)
		}),
		_stepDown: function (a) {
			this._start() && (this._spin((a || 1) * -this.options.step), this._stop())
		},
		pageUp: oa(function (a) {
			this._stepUp((a || 1) * this.options.page)
		}),
		pageDown: oa(function (a) {
			this._stepDown((a || 1) * this.options.page)
		}),
		value: function (a) {
			return arguments.length ? void oa(this._value).call(this, a) : this._parse(this.element.val())
		},
		widget: function () {
			return this.uiSpinner
		}
	}), a.uiBackCompat !== !1 && a.widget("ui.spinner", a.ui.spinner, {
		_enhance: function () {
			this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())
		},
		_uiSpinnerHtml: function () {
			return "<span>"
		},
		_buttonHtml: function () {
			return "<a></a><a></a>"
		}
	});
	a.ui.spinner;
	a.widget("ui.tabs", {
		version: "1.12.1",
		delay: 300,
		options: {
			active: null,
			classes: {
				"ui-tabs": "ui-corner-all",
				"ui-tabs-nav": "ui-corner-all",
				"ui-tabs-panel": "ui-corner-bottom",
				"ui-tabs-tab": "ui-corner-top"
			},
			collapsible: !1,
			event: "click",
			heightStyle: "content",
			hide: null,
			show: null,
			activate: null,
			beforeActivate: null,
			beforeLoad: null,
			load: null
		},
		_isLocal: function () {
			var a = /#.*$/;
			return function (b) {
				var c, d;
				c = b.href.replace(a, ""), d = location.href.replace(a, "");
				try {
					c = decodeURIComponent(c)
				} catch (a) {}
				try {
					d = decodeURIComponent(d)
				} catch (a) {}
				return b.hash.length > 1 && c === d
			}
		}(),
		_create: function () {
			var b = this,
				c = this.options;
			this.running = !1, this._addClass("ui-tabs", "ui-widget ui-widget-content"), this._toggleClass("ui-tabs-collapsible", null, c.collapsible), this._processTabs(), c.active = this._initialActive(), a.isArray(c.disabled) && (c.disabled = a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"), function (a) {
				return b.tabs.index(a)
			}))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(c.active) : this.active = a(), this._refresh(), this.active.length && this.load(c.active)
		},
		_initialActive: function () {
			var b = this.options.active,
				c = this.options.collapsible,
				d = location.hash.substring(1);
			return null === b && (d && this.tabs.each(function (c, e) {
				if (a(e).attr("aria-controls") === d) return b = c, !1
			}), null === b && (b = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null !== b && b !== -1 || (b = !!this.tabs.length && 0)), b !== !1 && (b = this.tabs.index(this.tabs.eq(b)), b === -1 && (b = !c && 0)), !c && b === !1 && this.anchors.length && (b = 0), b
		},
		_getCreateEventData: function () {
			return {
				tab: this.active,
				panel: this.active.length ? this._getPanelForTab(this.active) : a()
			}
		},
		_tabKeydown: function (b) {
			var c = a(a.ui.safeActiveElement(this.document[0])).closest("li"),
				d = this.tabs.index(c),
				e = !0;
			if (!this._handlePageNav(b)) {
				switch (b.keyCode) {
					case a.ui.keyCode.RIGHT:
					case a.ui.keyCode.DOWN:
						d++;
						break;
					case a.ui.keyCode.UP:
					case a.ui.keyCode.LEFT:
						e = !1, d--;
						break;
					case a.ui.keyCode.END:
						d = this.anchors.length - 1;
						break;
					case a.ui.keyCode.HOME:
						d = 0;
						break;
					case a.ui.keyCode.SPACE:
						return b.preventDefault(), clearTimeout(this.activating), void this._activate(d);
					case a.ui.keyCode.ENTER:
						return b.preventDefault(), clearTimeout(this.activating), void this._activate(d !== this.options.active && d);
					default:
						return
				}
				b.preventDefault(), clearTimeout(this.activating), d = this._focusNextTab(d, e), b.ctrlKey || b.metaKey || (c.attr("aria-selected", "false"), this.tabs.eq(d).attr("aria-selected", "true"), this.activating = this._delay(function () {
					this.option("active", d)
				}, this.delay))
			}
		},
		_panelKeydown: function (b) {
			this._handlePageNav(b) || b.ctrlKey && b.keyCode === a.ui.keyCode.UP && (b.preventDefault(), this.active.trigger("focus"))
		},
		_handlePageNav: function (b) {
			return b.altKey && b.keyCode === a.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : b.altKey && b.keyCode === a.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
		},
		_findNextTab: function (b, c) {
			function e() {
				return b > d && (b = 0), b < 0 && (b = d), b
			}
			for (var d = this.tabs.length - 1; a.inArray(e(), this.options.disabled) !== -1;) b = c ? b + 1 : b - 1;
			return b
		},
		_focusNextTab: function (a, b) {
			return a = this._findNextTab(a, b), this.tabs.eq(a).trigger("focus"), a
		},
		_setOption: function (a, b) {
			return "active" === a ? void this._activate(b) : (this._super(a, b), "collapsible" === a && (this._toggleClass("ui-tabs-collapsible", null, b), b || this.options.active !== !1 || this._activate(0)), "event" === a && this._setupEvents(b), void("heightStyle" === a && this._setupHeightStyle(b)))
		},
		_sanitizeSelector: function (a) {
			return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
		},
		refresh: function () {
			var b = this.options,
				c = this.tablist.children(":has(a[href])");
			b.disabled = a.map(c.filter(".ui-state-disabled"), function (a) {
				return c.index(a)
			}), this._processTabs(), b.active !== !1 && this.anchors.length ? this.active.length && !a.contains(this.tablist[0], this.active[0]) ? this.tabs.length === b.disabled.length ? (b.active = !1, this.active = a()) : this._activate(this._findNextTab(Math.max(0, b.active - 1), !1)) : b.active = this.tabs.index(this.active) : (b.active = !1, this.active = a()), this._refresh()
		},
		_refresh: function () {
			this._setOptionDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			}), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
				"aria-hidden": "true"
			}), this.active.length ? (this.active.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			}), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({
				"aria-hidden": "false"
			})) : this.tabs.eq(0).attr("tabIndex", 0)
		},
		_processTabs: function () {
			var b = this,
				c = this.tabs,
				d = this.anchors,
				e = this.panels;
			this.tablist = this._getList().attr("role", "tablist"), this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"), this.tablist.on("mousedown" + this.eventNamespace, "> li", function (b) {
				a(this).is(".ui-state-disabled") && b.preventDefault()
			}).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function () {
				a(this).closest("li").is(".ui-state-disabled") && this.blur()
			}), this.tabs = this.tablist.find("> li:has(a[href])").attr({
				role: "tab",
				tabIndex: -1
			}), this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"), this.anchors = this.tabs.map(function () {
				return a("a", this)[0]
			}).attr({
				role: "presentation",
				tabIndex: -1
			}), this._addClass(this.anchors, "ui-tabs-anchor"), this.panels = a(), this.anchors.each(function (c, d) {
				var e, f, g, h = a(d).uniqueId().attr("id"),
					i = a(d).closest("li"),
					j = i.attr("aria-controls");
				b._isLocal(d) ? (e = d.hash, g = e.substring(1), f = b.element.find(b._sanitizeSelector(e))) : (g = i.attr("aria-controls") || a({}).uniqueId()[0].id, e = "#" + g, f = b.element.find(e), f.length || (f = b._createPanel(g), f.insertAfter(b.panels[c - 1] || b.tablist)), f.attr("aria-live", "polite")), f.length && (b.panels = b.panels.add(f)), j && i.data("ui-tabs-aria-controls", j), i.attr({
					"aria-controls": g,
					"aria-labelledby": h
				}), f.attr("aria-labelledby", h)
			}), this.panels.attr("role", "tabpanel"), this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"), c && (this._off(c.not(this.tabs)), this._off(d.not(this.anchors)), this._off(e.not(this.panels)))
		},
		_getList: function () {
			return this.tablist || this.element.find("ol, ul").eq(0)
		},
		_createPanel: function (b) {
			return a("<div>").attr("id", b).data("ui-tabs-destroy", !0)
		},
		_setOptionDisabled: function (b) {
			var c, d, e;
			for (a.isArray(b) && (b.length ? b.length === this.anchors.length && (b = !0) : b = !1), e = 0; d = this.tabs[e]; e++) c = a(d), b === !0 || a.inArray(e, b) !== -1 ? (c.attr("aria-disabled", "true"), this._addClass(c, null, "ui-state-disabled")) : (c.removeAttr("aria-disabled"), this._removeClass(c, null, "ui-state-disabled"));
			this.options.disabled = b, this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, b === !0)
		},
		_setupEvents: function (b) {
			var c = {};
			b && a.each(b.split(" "), function (a, b) {
				c[b] = "_eventHandler"
			}), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
				click: function (a) {
					a.preventDefault()
				}
			}), this._on(this.anchors, c), this._on(this.tabs, {
				keydown: "_tabKeydown"
			}), this._on(this.panels, {
				keydown: "_panelKeydown"
			}), this._focusable(this.tabs), this._hoverable(this.tabs)
		},
		_setupHeightStyle: function (b) {
			var c, d = this.element.parent();
			"fill" === b ? (c = d.height(), c -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () {
				var b = a(this),
					d = b.css("position");
				"absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0))
			}), this.element.children().not(this.panels).each(function () {
				c -= a(this).outerHeight(!0)
			}), this.panels.each(function () {
				a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
			}).css("overflow", "auto")) : "auto" === b && (c = 0, this.panels.each(function () {
				c = Math.max(c, a(this).height("").height())
			}).height(c))
		},
		_eventHandler: function (b) {
			var c = this.options,
				d = this.active,
				e = a(b.currentTarget),
				f = e.closest("li"),
				g = f[0] === d[0],
				h = g && c.collapsible,
				i = h ? a() : this._getPanelForTab(f),
				j = d.length ? this._getPanelForTab(d) : a(),
				k = {
					oldTab: d,
					oldPanel: j,
					newTab: h ? a() : f,
					newPanel: i
				};
			b.preventDefault(), f.hasClass("ui-state-disabled") || f.hasClass("ui-tabs-loading") || this.running || g && !c.collapsible || this._trigger("beforeActivate", b, k) === !1 || (c.active = !h && this.tabs.index(f), this.active = g ? a() : f, this.xhr && this.xhr.abort(), j.length || i.length || a.error("jQuery UI Tabs: Mismatching fragment identifier."), i.length && this.load(this.tabs.index(f), b), this._toggle(b, k))
		},
		_toggle: function (b, c) {
			function g() {
				d.running = !1, d._trigger("activate", b, c)
			}

			function h() {
				d._addClass(c.newTab.closest("li"), "ui-tabs-active", "ui-state-active"), e.length && d.options.show ? d._show(e, d.options.show, g) : (e.show(), g())
			}
			var d = this,
				e = c.newPanel,
				f = c.oldPanel;
			this.running = !0, f.length && this.options.hide ? this._hide(f, this.options.hide, function () {
				d._removeClass(c.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), h()
			}) : (this._removeClass(c.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), f.hide(), h()), f.attr("aria-hidden", "true"), c.oldTab.attr({
				"aria-selected": "false",
				"aria-expanded": "false"
			}), e.length && f.length ? c.oldTab.attr("tabIndex", -1) : e.length && this.tabs.filter(function () {
				return 0 === a(this).attr("tabIndex")
			}).attr("tabIndex", -1), e.attr("aria-hidden", "false"), c.newTab.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			})
		},
		_activate: function (b) {
			var c, d = this._findActive(b);
			d[0] !== this.active[0] && (d.length || (d = this.active), c = d.find(".ui-tabs-anchor")[0], this._eventHandler({
				target: c,
				currentTarget: c,
				preventDefault: a.noop
			}))
		},
		_findActive: function (b) {
			return b === !1 ? a() : this.tabs.eq(b)
		},
		_getIndex: function (b) {
			return "string" == typeof b && (b = this.anchors.index(this.anchors.filter("[href$='" + a.ui.escapeSelector(b) + "']"))), b
		},
		_destroy: function () {
			this.xhr && this.xhr.abort(), this.tablist.removeAttr("role").off(this.eventNamespace), this.anchors.removeAttr("role tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function () {
				a.data(this, "ui-tabs-destroy") ? a(this).remove() : a(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")
			}), this.tabs.each(function () {
				var b = a(this),
					c = b.data("ui-tabs-aria-controls");
				c ? b.attr("aria-controls", c).removeData("ui-tabs-aria-controls") : b.removeAttr("aria-controls")
			}), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
		},
		enable: function (b) {
			var c = this.options.disabled;
			c !== !1 && (void 0 === b ? c = !1 : (b = this._getIndex(b), c = a.isArray(c) ? a.map(c, function (a) {
				return a !== b ? a : null
			}) : a.map(this.tabs, function (a, c) {
				return c !== b ? c : null
			})), this._setOptionDisabled(c))
		},
		disable: function (b) {
			var c = this.options.disabled;
			if (c !== !0) {
				if (void 0 === b) c = !0;
				else {
					if (b = this._getIndex(b), a.inArray(b, c) !== -1) return;
					c = a.isArray(c) ? a.merge([b], c).sort() : [b]
				}
				this._setOptionDisabled(c)
			}
		},
		load: function (b, c) {
			b = this._getIndex(b);
			var d = this,
				e = this.tabs.eq(b),
				f = e.find(".ui-tabs-anchor"),
				g = this._getPanelForTab(e),
				h = {
					tab: e,
					panel: g
				},
				i = function (a, b) {
					"abort" === b && d.panels.stop(!1, !0), d._removeClass(e, "ui-tabs-loading"), g.removeAttr("aria-busy"), a === d.xhr && delete d.xhr
				};
			this._isLocal(f[0]) || (this.xhr = a.ajax(this._ajaxSettings(f, c, h)), this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(e, "ui-tabs-loading"), g.attr("aria-busy", "true"), this.xhr.done(function (a, b, e) {
				setTimeout(function () {
					g.html(a), d._trigger("load", c, h), i(e, b)
				}, 1)
			}).fail(function (a, b) {
				setTimeout(function () {
					i(a, b)
				}, 1)
			})))
		},
		_ajaxSettings: function (b, c, d) {
			var e = this;
			return {
				url: b.attr("href").replace(/#.*$/, ""),
				beforeSend: function (b, f) {
					return e._trigger("beforeLoad", c, a.extend({
						jqXHR: b,
						ajaxSettings: f
					}, d))
				}
			}
		},
		_getPanelForTab: function (b) {
			var c = a(b).attr("aria-controls");
			return this.element.find(this._sanitizeSelector("#" + c))
		}
	}), a.uiBackCompat !== !1 && a.widget("ui.tabs", a.ui.tabs, {
		_processTabs: function () {
			this._superApply(arguments), this._addClass(this.tabs, "ui-tab")
		}
	});
	a.ui.tabs;
	a.widget("ui.tooltip", {
		version: "1.12.1",
		options: {
			classes: {
				"ui-tooltip": "ui-corner-all ui-widget-shadow"
			},
			content: function () {
				var b = a(this).attr("title") || "";
				return a("<a>").text(b).html()
			},
			hide: !0,
			items: "[title]:not([disabled])",
			position: {
				my: "left top+15",
				at: "left bottom",
				collision: "flipfit flip"
			},
			show: !0,
			track: !1,
			close: null,
			open: null
		},
		_addDescribedBy: function (b, c) {
			var d = (b.attr("aria-describedby") || "").split(/\s+/);
			d.push(c), b.data("ui-tooltip-id", c).attr("aria-describedby", a.trim(d.join(" ")))
		},
		_removeDescribedBy: function (b) {
			var c = b.data("ui-tooltip-id"),
				d = (b.attr("aria-describedby") || "").split(/\s+/),
				e = a.inArray(c, d);
			e !== -1 && d.splice(e, 1), b.removeData("ui-tooltip-id"), d = a.trim(d.join(" ")), d ? b.attr("aria-describedby", d) : b.removeAttr("aria-describedby")
		},
		_create: function () {
			this._on({
				mouseover: "open",
				focusin: "open"
			}), this.tooltips = {}, this.parents = {}, this.liveRegion = a("<div>").attr({
				role: "log",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			}).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this.disabledTitles = a([])
		},
		_setOption: function (b, c) {
			var d = this;
			this._super(b, c), "content" === b && a.each(this.tooltips, function (a, b) {
				d._updateContent(b.element)
			})
		},
		_setOptionDisabled: function (a) {
			this[a ? "_disable" : "_enable"]()
		},
		_disable: function () {
			var b = this;
			a.each(this.tooltips, function (c, d) {
				var e = a.Event("blur");
				e.target = e.currentTarget = d.element[0], b.close(e, !0)
			}), this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function () {
				var b = a(this);
				if (b.is("[title]")) return b.data("ui-tooltip-title", b.attr("title")).removeAttr("title")
			}))
		},
		_enable: function () {
			this.disabledTitles.each(function () {
				var b = a(this);
				b.data("ui-tooltip-title") && b.attr("title", b.data("ui-tooltip-title"))
			}), this.disabledTitles = a([])
		},
		open: function (b) {
			var c = this,
				d = a(b ? b.target : this.element).closest(this.options.items);
			d.length && !d.data("ui-tooltip-id") && (d.attr("title") && d.data("ui-tooltip-title", d.attr("title")), d.data("ui-tooltip-open", !0), b && "mouseover" === b.type && d.parents().each(function () {
				var d, b = a(this);
				b.data("ui-tooltip-open") && (d = a.Event("blur"), d.target = d.currentTarget = this, c.close(d, !0)), b.attr("title") && (b.uniqueId(), c.parents[this.id] = {
					element: this,
					title: b.attr("title")
				}, b.attr("title", ""))
			}), this._registerCloseHandlers(b, d), this._updateContent(d, b))
		},
		_updateContent: function (a, b) {
			var c, d = this.options.content,
				e = this,
				f = b ? b.type : null;
			return "string" == typeof d || d.nodeType || d.jquery ? this._open(b, a, d) : (c = d.call(a[0], function (c) {
				e._delay(function () {
					a.data("ui-tooltip-open") && (b && (b.type = f), this._open(b, a, c))
				})
			}), void(c && this._open(b, a, c)))
		},
		_open: function (b, c, d) {
			function j(a) {
				i.of = a, f.is(":hidden") || f.position(i)
			}
			var e, f, g, h, i = a.extend({}, this.options.position);
			if (d) {
				if (e = this._find(c)) return void e.tooltip.find(".ui-tooltip-content").html(d);
				c.is("[title]") && (b && "mouseover" === b.type ? c.attr("title", "") : c.removeAttr("title")), e = this._tooltip(c), f = e.tooltip, this._addDescribedBy(c, f.attr("id")), f.find(".ui-tooltip-content").html(d), this.liveRegion.children().hide(), h = a("<div>").html(f.find(".ui-tooltip-content").html()), h.removeAttr("name").find("[name]").removeAttr("name"), h.removeAttr("id").find("[id]").removeAttr("id"), h.appendTo(this.liveRegion), this.options.track && b && /^mouse/.test(b.type) ? (this._on(this.document, {
					mousemove: j
				}), j(b)) : f.position(a.extend({ of: c
				}, this.options.position)), f.hide(), this._show(f, this.options.show), this.options.track && this.options.show && this.options.show.delay && (g = this.delayedShow = setInterval(function () {
					f.is(":visible") && (j(i.of), clearInterval(g))
				}, a.fx.interval)), this._trigger("open", b, {
					tooltip: f
				})
			}
		},
		_registerCloseHandlers: function (b, c) {
			var d = {
				keyup: function (b) {
					if (b.keyCode === a.ui.keyCode.ESCAPE) {
						var d = a.Event(b);
						d.currentTarget = c[0], this.close(d, !0)
					}
				}
			};
			c[0] !== this.element[0] && (d.remove = function () {
				this._removeTooltip(this._find(c).tooltip)
			}), b && "mouseover" !== b.type || (d.mouseleave = "close"), b && "focusin" !== b.type || (d.focusout = "close"), this._on(!0, c, d)
		},
		close: function (b) {
			var c, d = this,
				e = a(b ? b.currentTarget : this.element),
				f = this._find(e);
			return f ? (c = f.tooltip, void(f.closing || (clearInterval(this.delayedShow), e.data("ui-tooltip-title") && !e.attr("title") && e.attr("title", e.data("ui-tooltip-title")), this._removeDescribedBy(e), f.hiding = !0, c.stop(!0), this._hide(c, this.options.hide, function () {
				d._removeTooltip(a(this))
			}), e.removeData("ui-tooltip-open"), this._off(e, "mouseleave focusout keyup"), e[0] !== this.element[0] && this._off(e, "remove"), this._off(this.document, "mousemove"), b && "mouseleave" === b.type && a.each(this.parents, function (b, c) {
				a(c.element).attr("title", c.title), delete d.parents[b]
			}), f.closing = !0, this._trigger("close", b, {
				tooltip: c
			}), f.hiding || (f.closing = !1)))) : void e.removeData("ui-tooltip-open")
		},
		_tooltip: function (b) {
			var c = a("<div>").attr("role", "tooltip"),
				d = a("<div>").appendTo(c),
				e = c.uniqueId().attr("id");
			return this._addClass(d, "ui-tooltip-content"), this._addClass(c, "ui-tooltip", "ui-widget ui-widget-content"), c.appendTo(this._appendTo(b)), this.tooltips[e] = {
				element: b,
				tooltip: c
			}
		},
		_find: function (a) {
			var b = a.data("ui-tooltip-id");
			return b ? this.tooltips[b] : null
		},
		_removeTooltip: function (a) {
			a.remove(), delete this.tooltips[a.attr("id")]
		},
		_appendTo: function (a) {
			var b = a.closest(".ui-front, dialog");
			return b.length || (b = this.document[0].body), b
		},
		_destroy: function () {
			var b = this;
			a.each(this.tooltips, function (c, d) {
				var e = a.Event("blur"),
					f = d.element;
				e.target = e.currentTarget = f[0], b.close(e, !0), a("#" + c).remove(), f.data("ui-tooltip-title") && (f.attr("title") || f.attr("title", f.data("ui-tooltip-title")), f.removeData("ui-tooltip-title"))
			}), this.liveRegion.remove()
		}
	}), a.uiBackCompat !== !1 && a.widget("ui.tooltip", a.ui.tooltip, {
		options: {
			tooltipClass: null
		},
		_tooltip: function () {
			var a = this._superApply(arguments);
			return this.options.tooltipClass && a.tooltip.addClass(this.options.tooltipClass), a
		}
	});
	a.ui.tooltip
});
