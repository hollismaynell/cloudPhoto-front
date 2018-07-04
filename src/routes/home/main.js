
window.onload=function(){
  var dat = dat || {}; dat.gui = dat.gui || {}; dat.utils = dat.utils || {}; dat.controllers = dat.controllers || {}; dat.dom = dat.dom || {}; dat.color = dat.color || {}; dat.utils.css = (function () { return { load: function (f, a) { a = a || document; let d = a.createElement('link'); d.type = 'text/css'; d.rel = 'stylesheet'; d.href = f; a.getElementsByTagName('head')[0].appendChild(d) }, inject: function (f, a) { a = a || document; let d = document.createElement('style'); d.type = 'text/css'; d.innerHTML = f; a.getElementsByTagName('head')[0].appendChild(d) } } }())
dat.utils.common = (function () {
  let f = Array.prototype.forEach,
    a = Array.prototype.slice; return { BREAK: {}, extend: function (d) { this.each(a.call(arguments, 1), function (a) { for (let c in a) this.isUndefined(a[c]) || (d[c] = a[c]) }, this); return d }, defaults: function (d) { this.each(a.call(arguments, 1), function (a) { for (let c in a) this.isUndefined(d[c]) && (d[c] = a[c]) }, this); return d }, compose: function () { let d = a.call(arguments); return function () { for (var e = a.call(arguments), c = d.length - 1; c >= 0; c--)e = [d[c].apply(this, e)]; return e[0] } },
    each: function (a, e, c) { if (a) if (f && a.forEach && a.forEach === f)a.forEach(e, c); else if (a.length === a.length + 0) for (var b = 0, p = a.length; b < p && !(b in a && e.call(c, a[b], b) === this.BREAK); b++);else for (b in a) if (e.call(c, a[b], b) === this.BREAK) break }, defer: function (a) { setTimeout(a, 0) }, toArray: function (d) { return d.toArray ? d.toArray() : a.call(d) }, isUndefined: function (a) { return void 0 === a }, isNull: function (a) { return a === null }, isNaN: function (a) { return a !== a }, isArray: Array.isArray || function (a) { return a.constructor === Array },
    isObject: function (a) { return a === Object(a) }, isNumber: function (a) { return a === a + 0 }, isString: function (a) { return a === `${a}` }, isBoolean: function (a) { return !1 === a || !0 === a }, isFunction: function (a) { return Object.prototype.toString.call(a) === '[object Function]' } }
}())
dat.controllers.Controller = (function (f) {
  let a = function (a, e) { this.initialValue = a[e]; this.domElement = document.createElement('div'); this.object = a; this.property = e; this.__onFinishChange = this.__onChange = void 0 }; f.extend(a.prototype, { onChange: function (a) { this.__onChange = a; return this }, onFinishChange: function (a) { this.__onFinishChange = a; return this }, setValue: function (a) { this.object[this.property] = a; this.__onChange && this.__onChange.call(this, a); this.updateDisplay(); return this }, getValue: function () { return this.object[this.property] },
    updateDisplay: function () { return this }, isModified: function () { return this.initialValue !== this.getValue() } }); return a
}(dat.utils.common))
dat.dom.dom = (function (f) {
  function a (b) { if (b === '0' || f.isUndefined(b)) return 0; b = b.match(e); return f.isNull(b) ? 0 : parseFloat(b[1]) } let d = {}; f.each({ HTMLEvents: ['change'], MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'], KeyboardEvents: ['keydown'] }, (b, a) => { f.each(b, (b) => { d[b] = a }) }); var e = /(\d+(\.\d+)?)px/,
    c = { makeSelectable: function (b, a) {
      void 0 !== b && void 0 !== b.style && (b.onselectstart = a ? function () { return !1 } : function () {}, b.style.MozUserSelect = a ? 'auto' : 'none', b.style.KhtmlUserSelect =
        a ? 'auto' : 'none', b.unselectable = a ? 'on' : 'off')
    }, makeFullscreen: function (b, a, c) { f.isUndefined(a) && (a = !0); f.isUndefined(c) && (c = !0); b.style.position = 'absolute'; a && (b.style.left = 0, b.style.right = 0); c && (b.style.top = 0, b.style.bottom = 0) }, fakeEvent: function (b, a, c, e) {
      c = c || {}; let r = d[a]; if (!r) throw Error(`Event type ${a} not supported.`); let n = document.createEvent(r); switch (r) {
        case 'MouseEvents':n.initMouseEvent(a, c.bubbles || !1, c.cancelable || !0, window, c.clickCount || 1, 0, 0, c.x || c.clientX || 0, c.y || c.clientY || 0, !1,
          !1, !1, !1, 0, null); break; case 'KeyboardEvents':r = n.initKeyboardEvent || n.initKeyEvent; f.defaults(c, { cancelable: !0, ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1, keyCode: void 0, charCode: void 0 }); r(a, c.bubbles || !1, c.cancelable, window, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.keyCode, c.charCode); break; default:n.initEvent(a, c.bubbles || !1, c.cancelable || !0)
      }f.defaults(n, e); b.dispatchEvent(n)
    }, bind: function (a, e, d, f) { a.addEventListener ? a.addEventListener(e, d, f || !1) : a.attachEvent && a.attachEvent(`on${e}`, d); return c },
      unbind: function (a, e, d, f) { a.removeEventListener ? a.removeEventListener(e, d, f || !1) : a.detachEvent && a.detachEvent(`on${e}`, d); return c }, addClass: function (a, e) { if (void 0 === a.className)a.className = e; else if (a.className !== e) { let d = a.className.split(/ +/); d.indexOf(e) == -1 && (d.push(e), a.className = d.join(' ').replace(/^\s+/, '').replace(/\s+$/, '')) } return c }, removeClass: function (a, e) {
        if (e) {
          if (void 0 !== a.className) {
            if (a.className === e)a.removeAttribute('class'); else {
              let d = a.className.split(/ +/),
                f = d.indexOf(e); f !=
              -1 && (d.splice(f, 1), a.className = d.join(' '))
            }
          }
        } else a.className = void 0; return c
      }, hasClass: function (a, c) { return (new RegExp(`(?:^|\\s+)${c}(?:\\s+|$)`)).test(a.className) || !1 }, getWidth: function (b) { b = getComputedStyle(b); return a(b['border-left-width']) + a(b['border-right-width']) + a(b['padding-left']) + a(b['padding-right']) + a(b.width) }, getHeight: function (b) { b = getComputedStyle(b); return a(b['border-top-width']) + a(b['border-bottom-width']) + a(b['padding-top']) + a(b['padding-bottom']) + a(b.height) }, getOffset: function (a) {
        let c =
          { left: 0, top: 0 }; if (a.offsetParent) { do c.left += a.offsetLeft, c.top += a.offsetTop; while (a = a.offsetParent) } return c
      }, isActive: function (a) { return a === document.activeElement && (a.type || a.href) } }; return c
}(dat.utils.common))
dat.controllers.OptionController = (function (f, a, d) {
  var e = function (c, b, f) { e.superclass.call(this, c, b); let q = this; this.__select = document.createElement('select'); if (d.isArray(f)) { let l = {}; d.each(f, (a) => { l[a] = a }); f = l }d.each(f, (a, b) => { let c = document.createElement('option'); c.innerHTML = b; c.setAttribute('value', a); q.__select.appendChild(c) }); this.updateDisplay(); a.bind(this.__select, 'change', function () { q.setValue(this.options[this.selectedIndex].value) }); this.domElement.appendChild(this.__select) }
  e.superclass = f; d.extend(e.prototype, f.prototype, { setValue: function (a) { a = e.superclass.prototype.setValue.call(this, a); this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()); return a }, updateDisplay: function () { this.__select.value = this.getValue(); return e.superclass.prototype.updateDisplay.call(this) } }); return e
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common))
dat.controllers.NumberController = (function (f, a) {
  function d (a) { a = a.toString(); return a.indexOf('.') > -1 ? a.length - a.indexOf('.') - 1 : 0 } var e = function (c, b, f) { e.superclass.call(this, c, b); f = f || {}; this.__min = f.min; this.__max = f.max; this.__step = f.step; a.isUndefined(this.__step) ? this.__impliedStep = this.initialValue == 0 ? 1 : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__impliedStep = this.__step; this.__precision = d(this.__impliedStep) }; e.superclass = f; a.extend(e.prototype, f.prototype, { setValue: function (a) {
    void 0 !==
    this.__min && a < this.__min ? a = this.__min : void 0 !== this.__max && a > this.__max && (a = this.__max); void 0 !== this.__step && a % this.__step != 0 && (a = Math.round(a / this.__step) * this.__step); return e.superclass.prototype.setValue.call(this, a)
  }, min: function (a) { this.__min = a; return this }, max: function (a) { this.__max = a; return this }, step: function (a) { this.__impliedStep = this.__step = a; this.__precision = d(a); return this } }); return e
}(dat.controllers.Controller, dat.utils.common))
dat.controllers.NumberControllerBox = (function (f, a, d) {
  var e = function (c, b, f) {
    function q () { let a = parseFloat(n.__input.value); d.isNaN(a) || n.setValue(a) } function l (a) { let b = u - a.clientY; n.setValue(n.getValue() + b * n.__impliedStep); u = a.clientY } function r () { a.unbind(window, 'mousemove', l); a.unbind(window, 'mouseup', r) } this.__truncationSuspended = !1; e.superclass.call(this, c, b, f); var n = this,
      u; this.__input = document.createElement('input'); this.__input.setAttribute('type', 'text'); a.bind(this.__input, 'change', q); a.bind(this.__input,
      'blur', () => { q(); n.__onFinishChange && n.__onFinishChange.call(n, n.getValue()) }); a.bind(this.__input, 'mousedown', (b) => { a.bind(window, 'mousemove', l); a.bind(window, 'mouseup', r); u = b.clientY }); a.bind(this.__input, 'keydown', function (a) { a.keyCode === 13 && (n.__truncationSuspended = !0, this.blur(), n.__truncationSuspended = !1) }); this.updateDisplay(); this.domElement.appendChild(this.__input)
  }; e.superclass = f; d.extend(e.prototype, f.prototype, { updateDisplay: function () {
    let a = this.__input,
      b; if (this.__truncationSuspended) {
      b =
        this.getValue()
    } else { b = this.getValue(); let d = Math.pow(10, this.__precision); b = Math.round(b * d) / d }a.value = b; return e.superclass.prototype.updateDisplay.call(this)
  } }); return e
}(dat.controllers.NumberController, dat.dom.dom, dat.utils.common))
dat.controllers.NumberControllerSlider = (function (f, a, d, e, c) {
  function b (a, b, c, e, d) { return e + (a - b) / (c - b) * (d - e) } var p = function (c, e, d, f, u) {
    function A (c) {
      c.preventDefault(); let e = a.getOffset(k.__background),
        d = a.getWidth(k.__background); k.setValue(b(c.clientX, e.left, e.left + d, k.__min, k.__max)); return !1
    } function g () { a.unbind(window, 'mousemove', A); a.unbind(window, 'mouseup', g); k.__onFinishChange && k.__onFinishChange.call(k, k.getValue()) }p.superclass.call(this, c, e, { min: d, max: f, step: u }); var k = this; this.__background =
      document.createElement('div'); this.__foreground = document.createElement('div'); a.bind(this.__background, 'mousedown', (b) => { a.bind(window, 'mousemove', A); a.bind(window, 'mouseup', g); A(b) }); a.addClass(this.__background, 'slider'); a.addClass(this.__foreground, 'slider-fg'); this.updateDisplay(); this.__background.appendChild(this.__foreground); this.domElement.appendChild(this.__background)
  }; p.superclass = f; p.useDefaultStyles = function () { d.inject(c) }; e.extend(p.prototype, f.prototype, { updateDisplay: function () {
    let a =
      (this.getValue() - this.__min) / (this.__max - this.__min); this.__foreground.style.width = `${100 * a}%`; return p.superclass.prototype.updateDisplay.call(this)
  } }); return p
}(dat.controllers.NumberController, dat.dom.dom, dat.utils.css, dat.utils.common, "/**\n * dat-gui JavaScript Controller Library\n * http://code.google.com/p/dat-gui\n *\n * Copyright 2011 Data Arts Team, Google Creative Lab\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n */\n\n.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}"))
dat.controllers.FunctionController = (function (f, a, d) {
  var e = function (c, b, d) { e.superclass.call(this, c, b); let f = this; this.__button = document.createElement('div'); this.__button.innerHTML = void 0 === d ? 'Fire' : d; a.bind(this.__button, 'click', (a) => { a.preventDefault(); f.fire(); return !1 }); a.addClass(this.__button, 'button'); this.domElement.appendChild(this.__button) }; e.superclass = f; d.extend(e.prototype, f.prototype, { fire: function () {
    this.__onChange && this.__onChange.call(this); this.getValue().call(this.object)
    this.__onFinishChange && this.__onFinishChange.call(this, this.getValue())
  } }); return e
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common))
dat.controllers.BooleanController = (function (f, a, d) {
  var e = function (c, b) { e.superclass.call(this, c, b); let d = this; this.__prev = this.getValue(); this.__checkbox = document.createElement('input'); this.__checkbox.setAttribute('type', 'checkbox'); a.bind(this.__checkbox, 'change', () => { d.setValue(!d.__prev) }, !1); this.domElement.appendChild(this.__checkbox); this.updateDisplay() }; e.superclass = f; d.extend(e.prototype, f.prototype, { setValue: function (a) {
    a = e.superclass.prototype.setValue.call(this, a); this.__onFinishChange &&
    this.__onFinishChange.call(this, this.getValue()); this.__prev = this.getValue(); return a
  }, updateDisplay: function () { !0 === this.getValue() ? (this.__checkbox.setAttribute('checked', 'checked'), this.__checkbox.checked = !0) : this.__checkbox.checked = !1; return e.superclass.prototype.updateDisplay.call(this) } }); return e
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common))
dat.color.toString = (function (f) { return function (a) { if (a.a == 1 || f.isUndefined(a.a)) { for (a = a.hex.toString(16); a.length < 6;)a = `0${a}`; return `#${a}` } return `rgba(${Math.round(a.r)},${Math.round(a.g)},${Math.round(a.b)},${a.a})` } }(dat.utils.common))
dat.color.interpret = (function (f, a) {
  let d,
    e,
    c = [{ litmus: a.isString, conversions: { THREE_CHAR_HEX: { read: function (a) { a = a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i); return a === null ? !1 : { space: 'HEX', hex: parseInt(`0x${a[1].toString()}${a[1].toString()}${a[2].toString()}${a[2].toString()}${a[3].toString()}${a[3].toString()}`) } }, write: f }, SIX_CHAR_HEX: { read: function (a) { a = a.match(/^#([A-F0-9]{6})$/i); return a === null ? !1 : { space: 'HEX', hex: parseInt(`0x${a[1].toString()}`) } }, write: f }, CSS_RGB: { read: function (a) {
      a = a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/)
      return a === null ? !1 : { space: 'RGB', r: parseFloat(a[1]), g: parseFloat(a[2]), b: parseFloat(a[3]) }
    }, write: f }, CSS_RGBA: { read: function (a) { a = a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/); return a === null ? !1 : { space: 'RGB', r: parseFloat(a[1]), g: parseFloat(a[2]), b: parseFloat(a[3]), a: parseFloat(a[4]) } }, write: f } } }, { litmus: a.isNumber, conversions: { HEX: { read: function (a) { return { space: 'HEX', hex: a, conversionName: 'HEX' } }, write: function (a) { return a.hex } } } }, { litmus: a.isArray, conversions: { RGB_ARRAY: { read: function (a) {
      return a.length !=
      3 ? !1 : { space: 'RGB', r: a[0], g: a[1], b: a[2] }
    }, write: function (a) { return [a.r, a.g, a.b] } }, RGBA_ARRAY: { read: function (a) { return a.length != 4 ? !1 : { space: 'RGB', r: a[0], g: a[1], b: a[2], a: a[3] } }, write: function (a) { return [a.r, a.g, a.b, a.a] } } } }, { litmus: a.isObject, conversions: { RGBA_OBJ: { read: function (b) { return a.isNumber(b.r) && a.isNumber(b.g) && a.isNumber(b.b) && a.isNumber(b.a) ? { space: 'RGB', r: b.r, g: b.g, b: b.b, a: b.a } : !1 }, write: function (a) { return { r: a.r, g: a.g, b: a.b, a: a.a } } }, RGB_OBJ: { read: function (b) {
      return a.isNumber(b.r) &&
      a.isNumber(b.g) && a.isNumber(b.b) ? { space: 'RGB', r: b.r, g: b.g, b: b.b } : !1
    }, write: function (a) { return { r: a.r, g: a.g, b: a.b } } }, HSVA_OBJ: { read: function (b) { return a.isNumber(b.h) && a.isNumber(b.s) && a.isNumber(b.v) && a.isNumber(b.a) ? { space: 'HSV', h: b.h, s: b.s, v: b.v, a: b.a } : !1 }, write: function (a) { return { h: a.h, s: a.s, v: a.v, a: a.a } } }, HSV_OBJ: { read: function (b) { return a.isNumber(b.h) && a.isNumber(b.s) && a.isNumber(b.v) ? { space: 'HSV', h: b.h, s: b.s, v: b.v } : !1 }, write: function (a) { return { h: a.h, s: a.s, v: a.v } } } } }]; return function () {
    e = !1
    let b = arguments.length > 1 ? a.toArray(arguments) : arguments[0]; a.each(c, (c) => { if (c.litmus(b)) return a.each(c.conversions, (c, f) => { d = c.read(b); if (!1 === e && !1 !== d) return e = d, d.conversionName = f, d.conversion = c, a.BREAK }), a.BREAK }); return e
  }
}(dat.color.toString, dat.utils.common))
dat.GUI = dat.gui.GUI = (function (f, a, d, e, c, b, p, q, l, r, n, u, A, g, k) {
  function v (a, b, h, d) {
    if (void 0 === b[h]) throw Error(`Object ${b} has no property "${h}"`); d.color ? b = new n(b, h) : (b = [b, h].concat(d.factoryArgs), b = e.apply(a, b)); d.before instanceof c && (d.before = d.before.__li); y(a, b); g.addClass(b.domElement, 'c'); h = document.createElement('span'); g.addClass(h, 'property-name'); h.innerHTML = b.property; let f = document.createElement('div'); f.appendChild(h); f.appendChild(b.domElement); d = w(a, f, d.before); g.addClass(d, m.CLASS_CONTROLLER_ROW)
    g.addClass(d, typeof b.getValue()); t(a, d, b); a.__controllers.push(b); return b
  } function w (a, b, h) { let c = document.createElement('li'); b && c.appendChild(b); h ? a.__ul.insertBefore(c, params.before) : a.__ul.appendChild(c); a.onResize(); return c } function t (a, c, h) {
    h.__li = c; h.__gui = a; k.extend(h, { options: function (b) {
      if (arguments.length > 1) return h.remove(), v(a, h.object, h.property, { before: h.__li.nextElementSibling, factoryArgs: [k.toArray(arguments)] }); if (k.isArray(b) || k.isObject(b)) {
        return h.remove(), v(a, h.object, h.property,
          { before: h.__li.nextElementSibling, factoryArgs: [b] })
      }
    }, name: function (a) { h.__li.firstElementChild.firstElementChild.innerHTML = a; return h }, listen: function () { h.__gui.listen(h); return h }, remove: function () { h.__gui.remove(h); return h } }); if (h instanceof l) {
      let d = new q(h.object, h.property, { min: h.__min, max: h.__max, step: h.__step }); k.each(['updateDisplay', 'onChange', 'onFinishChange'], (a) => {
        let K = h[a],
          b = d[a]; h[a] = d[a] = function () { let a = Array.prototype.slice.call(arguments); K.apply(h, a); return b.apply(d, a) }
      })
      g.addClass(c, 'has-slider'); h.domElement.insertBefore(d.domElement, h.domElement.firstElementChild)
    } else if (h instanceof q) { let e = function (b) { return k.isNumber(h.__min) && k.isNumber(h.__max) ? (h.remove(), v(a, h.object, h.property, { before: h.__li.nextElementSibling, factoryArgs: [h.__min, h.__max, h.__step] })) : b }; h.min = k.compose(e, h.min); h.max = k.compose(e, h.max) } else {
      h instanceof b ? (g.bind(c, 'click', () => { g.fakeEvent(h.__checkbox, 'click') }), g.bind(h.__checkbox, 'click', (a) => { a.stopPropagation() })) :
        h instanceof p ? (g.bind(c, 'click', () => { g.fakeEvent(h.__button, 'click') }), g.bind(c, 'mouseover', () => { g.addClass(h.__button, 'hover') }), g.bind(c, 'mouseout', () => { g.removeClass(h.__button, 'hover') })) : h instanceof n && (g.addClass(c, 'color'), h.updateDisplay = k.compose((a) => { c.style.borderLeftColor = h.__color.toString(); return a }, h.updateDisplay), h.updateDisplay())
    }h.setValue = k.compose((b) => { a.getRoot().__preset_select && h.isModified() && E(a.getRoot(), !0); return b }, h.setValue)
  } function y (a,
                b) {
    let c = a.getRoot(),
      d = c.__rememberedObjects.indexOf(b.object); if (d != -1) { let e = c.__rememberedObjectIndecesToControllers[d]; void 0 === e && (e = {}, c.__rememberedObjectIndecesToControllers[d] = e); e[b.property] = b; if (c.load && c.load.remembered) { c = c.load.remembered; if (c[a.preset])c = c[a.preset]; else if (c.Default)c = c.Default; else return; c[d] && void 0 !== c[d][b.property] && (d = c[d][b.property], b.initialValue = d, b.setValue(d)) } }
  } function L (a) {
    var b = a.__save_row = document.createElement('li'); g.addClass(a.domElement, 'has-save')
    a.__ul.insertBefore(b, a.__ul.firstChild); g.addClass(b, 'save-row'); let c = document.createElement('span'); c.innerHTML = '&nbsp;'; g.addClass(c, 'button gears'); let d = document.createElement('span'); d.innerHTML = 'Save'; g.addClass(d, 'button'); g.addClass(d, 'save'); let e = document.createElement('span'); e.innerHTML = 'New'; g.addClass(e, 'button'); g.addClass(e, 'save-as'); let f = document.createElement('span'); f.innerHTML = 'Revert'; g.addClass(f, 'button'); g.addClass(f, 'revert'); let r = a.__preset_select = document.createElement('select')
    a.load && a.load.remembered ? k.each(a.load.remembered, (b, c) => { F(a, c, c == a.preset) }) : F(a, 'Default', !1); g.bind(r, 'change', function () { for (let b = 0; b < a.__preset_select.length; b++)a.__preset_select[b].innerHTML = a.__preset_select[b].value; a.preset = this.value }); b.appendChild(r); b.appendChild(c); b.appendChild(d); b.appendChild(e); b.appendChild(f); if (x) {
      var n = function () { u.style.display = a.useLocalStorage ? 'block' : 'none' },
        b = document.getElementById('dg-save-locally'),
        u = document.getElementById('dg-local-explain')
      b.style.display = 'block'; b = document.getElementById('dg-local-storage'); localStorage.getItem(`${document.location.href}.isLocal`) === 'true' && b.setAttribute('checked', 'checked'); n(); g.bind(b, 'change', () => { a.useLocalStorage = !a.useLocalStorage; n() })
    } let m = document.getElementById('dg-new-constructor'); g.bind(m, 'keydown', (a) => { !a.metaKey || a.which !== 67 && a.keyCode != 67 || B.hide() }); g.bind(c, 'click', () => { m.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2); B.show(); m.focus(); m.select() }); g.bind(d,
      'click', () => { a.save() }); g.bind(e, 'click', () => { let b = prompt('Enter a new preset name.'); b && a.saveAs(b) }); g.bind(f, 'click', () => { a.revert() })
  } function M (a) {
    function b (f) { f.preventDefault(); e = f.clientX; g.addClass(a.__closeButton, m.CLASS_DRAG); g.bind(window, 'mousemove', c); g.bind(window, 'mouseup', d); return !1 } function c (b) { b.preventDefault(); a.width += e - b.clientX; a.onResize(); e = b.clientX; return !1 } function d () {
      g.removeClass(a.__closeButton, m.CLASS_DRAG); g.unbind(window, 'mousemove', c); g.unbind(window,
        'mouseup', d)
    }a.__resize_handle = document.createElement('div'); k.extend(a.__resize_handle.style, { width: '6px', marginLeft: '-3px', height: '200px', cursor: 'ew-resize', position: 'absolute' }); let e; g.bind(a.__resize_handle, 'mousedown', b); g.bind(a.__closeButton, 'mousedown', b); a.domElement.insertBefore(a.__resize_handle, a.domElement.firstElementChild)
  } function G (a, b) { a.domElement.style.width = `${b}px`; a.__save_row && a.autoPlace && (a.__save_row.style.width = `${b}px`); a.__closeButton && (a.__closeButton.style.width = `${b}px`) }
  function C (a, b) { let c = {}; k.each(a.__rememberedObjects, (d, e) => { let f = {}; k.each(a.__rememberedObjectIndecesToControllers[e], (a, c) => { f[c] = b ? a.initialValue : a.getValue() }); c[e] = f }); return c } function F (a, b, c) { let d = document.createElement('option'); d.innerHTML = b; d.value = b; a.__preset_select.appendChild(d); c && (a.__preset_select.selectedIndex = a.__preset_select.length - 1) } function E (a, b) { let c = a.__preset_select[a.__preset_select.selectedIndex]; c.innerHTML = b ? `${c.value}*` : c.value } function H (a) {
    a.length != 0 &&
    u(() => { H(a) }); k.each(a, (a) => { a.updateDisplay() })
  }f.inject(d); let x; try { x = 'localStorage' in window && window.localStorage !== null } catch (N) { x = !1 } var B,
    I = !0,
    z,
    D = !1,
    J = [],
    m = function (a) {
      function b () { let a = c.getRoot(); a.width += 1; k.defer(() => { --a.width }) } var c = this; this.domElement = document.createElement('div'); this.__ul = document.createElement('ul'); this.domElement.appendChild(this.__ul); g.addClass(this.domElement, 'dg'); this.__folders = {}; this.__controllers = []; this.__rememberedObjects = []; this.__rememberedObjectIndecesToControllers =
        []; this.__listening = []; a = a || {}; a = k.defaults(a, { autoPlace: !0, width: m.DEFAULT_WIDTH }); a = k.defaults(a, { resizable: a.autoPlace, hideable: a.autoPlace }); k.isUndefined(a.load) ? a.load = { preset: 'Default' } : a.preset && (a.load.preset = a.preset); k.isUndefined(a.parent) && a.hideable && J.push(this); a.resizable = k.isUndefined(a.parent) && a.resizable; a.autoPlace && k.isUndefined(a.scrollable) && (a.scrollable = !0); let d = x && localStorage.getItem(`${document.location.href}.isLocal`) === 'true',
        e; Object.defineProperties(this, { parent: { get: function () { return a.parent } },
        scrollable: { get: function () { return a.scrollable } }, autoPlace: { get: function () { return a.autoPlace } }, preset: { get: function () { return c.parent ? c.getRoot().preset : a.load.preset }, set: function (b) { c.parent ? c.getRoot().preset = b : a.load.preset = b; for (b = 0; b < this.__preset_select.length; b++) this.__preset_select[b].value == this.preset && (this.__preset_select.selectedIndex = b); c.revert() } }, width: { get: function () { return a.width }, set: function (b) { a.width = b; G(c, b) } }, name: { get: function () { return a.name }, set: function (b) {
          a.name =
            b; r && (r.innerHTML = a.name)
        } }, closed: { get: function () { return a.closed }, set: function (b) { a.closed = b; a.closed ? g.addClass(c.__ul, m.CLASS_CLOSED) : g.removeClass(c.__ul, m.CLASS_CLOSED); this.onResize(); c.__closeButton && (c.__closeButton.innerHTML = b ? m.TEXT_OPEN : m.TEXT_CLOSED) } }, load: { get: function () { return a.load } }, useLocalStorage: { get: function () { return d }, set: function (a) { x && ((d = a) ? g.bind(window, 'unload', e) : g.unbind(window, 'unload', e), localStorage.setItem(`${document.location.href}.isLocal`, a)) } } }); if (k.isUndefined(a.parent)) {
        a.closed =
          !1; g.addClass(this.domElement, m.CLASS_MAIN); g.makeSelectable(this.domElement, !1); if (x && d) { c.useLocalStorage = !0; var f = localStorage.getItem(`${document.location.href}.gui`); f && (a.load = JSON.parse(f)) } this.__closeButton = document.createElement('div'); this.__closeButton.innerHTML = m.TEXT_CLOSED; g.addClass(this.__closeButton, m.CLASS_CLOSE_BUTTON); this.domElement.appendChild(this.__closeButton); g.bind(this.__closeButton, 'click', () => { c.closed = !c.closed })
      } else {
        void 0 === a.closed && (a.closed = !0); var r = document.createTextNode(a.name)
        g.addClass(r, 'controller-name'); f = w(c, r); g.addClass(this.__ul, m.CLASS_CLOSED); g.addClass(f, 'title'); g.bind(f, 'click', (a) => { a.preventDefault(); c.closed = !c.closed; return !1 }); a.closed || (this.closed = !1)
      }a.autoPlace && (k.isUndefined(a.parent) && (I && (z = document.createElement('div'), g.addClass(z, 'dg'), g.addClass(z, m.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(z), I = !1), z.appendChild(this.domElement), g.addClass(this.domElement, m.CLASS_AUTO_PLACE)), this.parent || G(c, a.width)); g.bind(window, 'resize',
        () => { c.onResize() }); g.bind(this.__ul, 'webkitTransitionEnd', () => { c.onResize() }); g.bind(this.__ul, 'transitionend', () => { c.onResize() }); g.bind(this.__ul, 'oTransitionEnd', () => { c.onResize() }); this.onResize(); a.resizable && M(this); this.saveToLocalStorageIfPossible = e = function () { x && localStorage.getItem(`${document.location.href}.isLocal`) === 'true' && localStorage.setItem(`${document.location.href}.gui`, JSON.stringify(c.getSaveObject())) }; c.getRoot(); a.parent || b()
    }; m.toggleHide = function () {
    D =
      !D; k.each(J, (a) => { a.domElement.style.zIndex = D ? -999 : 999; a.domElement.style.opacity = D ? 0 : 1 })
  }; m.CLASS_AUTO_PLACE = 'a'; m.CLASS_AUTO_PLACE_CONTAINER = 'ac'; m.CLASS_MAIN = 'main'; m.CLASS_CONTROLLER_ROW = 'cr'; m.CLASS_TOO_TALL = 'taller-than-window'; m.CLASS_CLOSED = 'closed'; m.CLASS_CLOSE_BUTTON = 'close-button'; m.CLASS_DRAG = 'drag'; m.DEFAULT_WIDTH = 245; m.TEXT_CLOSED = 'Close Controls'; m.TEXT_OPEN = 'Open Controls'; g.bind(window, 'keydown', (a) => {
    document.activeElement.type === 'text' || a.which !== 72 && a.keyCode != 72 ||
    m.toggleHide()
  }, !1); k.extend(m.prototype, { add: function (a, b) { return v(this, a, b, { factoryArgs: Array.prototype.slice.call(arguments, 2) }) }, addColor: function (a, b) { return v(this, a, b, { color: !0 }) }, remove: function (a) { this.__ul.removeChild(a.__li); this.__controllers.splice(this.__controllers.indexOf(a), 1); let b = this; k.defer(() => { b.onResize() }) }, destroy: function () { this.autoPlace && z.removeChild(this.domElement) }, addFolder: function (a) {
    if (void 0 !== this.__folders[a]) {
      throw Error(`You already have a folder in this GUI by the name "${
        a}"`)
    } let b = { name: a, parent: this }; b.autoPlace = this.autoPlace; this.load && this.load.folders && this.load.folders[a] && (b.closed = this.load.folders[a].closed, b.load = this.load.folders[a]); b = new m(b); this.__folders[a] = b; a = w(this, b.domElement); g.addClass(a, 'folder'); return b
  }, open: function () { this.closed = !1 }, close: function () { this.closed = !0 }, onResize: function () {
    let a = this.getRoot(); if (a.scrollable) {
      let b = g.getOffset(a.__ul).top,
        c = 0; k.each(a.__ul.childNodes, (b) => { a.autoPlace && b === a.__save_row || (c += g.getHeight(b)) })
      window.innerHeight - b - 20 < c ? (g.addClass(a.domElement, m.CLASS_TOO_TALL), a.__ul.style.height = `${window.innerHeight - b - 20}px`) : (g.removeClass(a.domElement, m.CLASS_TOO_TALL), a.__ul.style.height = 'auto')
    }a.__resize_handle && k.defer(() => { a.__resize_handle.style.height = `${a.__ul.offsetHeight}px` }); a.__closeButton && (a.__closeButton.style.width = `${a.width}px`)
  }, remember: function () {
    k.isUndefined(B) && (B = new A, B.domElement.innerHTML = a); if (this.parent) throw Error('You can only call remember on a top level GUI.'); let b =
      this; k.each(Array.prototype.slice.call(arguments), (a) => { b.__rememberedObjects.length == 0 && L(b); b.__rememberedObjects.indexOf(a) == -1 && b.__rememberedObjects.push(a) }); this.autoPlace && G(this, this.width)
  }, getRoot: function () { for (var a = this; a.parent;)a = a.parent; return a }, getSaveObject: function () {
    let a = this.load; a.closed = this.closed; this.__rememberedObjects.length > 0 && (a.preset = this.preset, a.remembered || (a.remembered = {}), a.remembered[this.preset] = C(this)); a.folders = {}; k.each(this.__folders, (b,
                                                                                                                                                                                                                                  c) => { a.folders[c] = b.getSaveObject() }); return a
  }, save: function () { this.load.remembered || (this.load.remembered = {}); this.load.remembered[this.preset] = C(this); E(this, !1); this.saveToLocalStorageIfPossible() }, saveAs: function (a) { this.load.remembered || (this.load.remembered = {}, this.load.remembered.Default = C(this, !0)); this.load.remembered[a] = C(this); this.preset = a; F(this, a, !0); this.saveToLocalStorageIfPossible() }, revert: function (a) {
    k.each(this.__controllers, function (b) {
      this.getRoot().load.remembered ? y(a || this.getRoot(),
        b) : b.setValue(b.initialValue)
    }, this); k.each(this.__folders, (a) => { a.revert(a) }); a || E(this.getRoot(), !1)
  }, listen: function (a) { let b = this.__listening.length == 0; this.__listening.push(a); b && H(this.__listening) } }); return m
}(dat.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>',
  ".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    display: none;\n    right: 0;\n    height: 0;\n    z-index: 0; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save > ul {\n      margin-top: 27px; }\n      .dg.a.has-save > ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid rgba(0, 0, 0, 0); }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2fa1d6; }\n    .dg .cr.number input[type=text] {\n      color: #2fa1d6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2fa1d6; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n",
  dat.controllers.factory = (function (f, a, d, e, c, b, p) { return function (q, l, r, n) { let u = q[l]; if (p.isArray(r) || p.isObject(r)) return new f(q, l, r); if (p.isNumber(u)) return p.isNumber(r) && p.isNumber(n) ? new d(q, l, r, n) : new a(q, l, { min: r, max: n }); if (p.isString(u)) return new e(q, l); if (p.isFunction(u)) return new c(q, l, ''); if (p.isBoolean(u)) return new b(q, l) } }(dat.controllers.OptionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.StringController = (function (f, a, d) {
    var e =
      function (c, b) { function d () { f.setValue(f.__input.value) }e.superclass.call(this, c, b); var f = this; this.__input = document.createElement('input'); this.__input.setAttribute('type', 'text'); a.bind(this.__input, 'keyup', d); a.bind(this.__input, 'change', d); a.bind(this.__input, 'blur', () => { f.__onFinishChange && f.__onFinishChange.call(f, f.getValue()) }); a.bind(this.__input, 'keydown', function (a) { a.keyCode === 13 && this.blur() }); this.updateDisplay(); this.domElement.appendChild(this.__input) }; e.superclass = f; d.extend(e.prototype,
      f.prototype, { updateDisplay: function () { a.isActive(this.__input) || (this.__input.value = this.getValue()); return e.superclass.prototype.updateDisplay.call(this) } }); return e
  }(dat.controllers.Controller, dat.dom.dom, dat.utils.common)), dat.controllers.FunctionController, dat.controllers.BooleanController, dat.utils.common)), dat.controllers.Controller, dat.controllers.BooleanController, dat.controllers.FunctionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.OptionController,
  dat.controllers.ColorController = (function (f, a, d, e, c) {
    function b (a, b, d, e) { a.style.background = ''; c.each(l, (c) => { a.style.cssText += `background: ${c}linear-gradient(${b}, ${d} 0%, ${e} 100%); ` }) } function p (a) {
      a.style.background = ''; a.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'; a.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
      a.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'; a.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'; a.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    } var q = function (f, n) {
      function u (b) {
        v(b); a.bind(window, 'mousemove', v); a.bind(window,
          'mouseup', l)
      } function l () { a.unbind(window, 'mousemove', v); a.unbind(window, 'mouseup', l) } function g () { let a = e(this.value); !1 !== a ? (t.__color.__state = a, t.setValue(t.__color.toOriginal())) : this.value = t.__color.toString() } function k () { a.unbind(window, 'mousemove', w); a.unbind(window, 'mouseup', k) } function v (b) {
        b.preventDefault(); let c = a.getWidth(t.__saturation_field),
          d = a.getOffset(t.__saturation_field),
          e = (b.clientX - d.left + document.body.scrollLeft) / c; b = 1 - (b.clientY - d.top + document.body.scrollTop) / c; b > 1 ? b = 1 : b <
          0 && (b = 0); e > 1 ? e = 1 : e < 0 && (e = 0); t.__color.v = b; t.__color.s = e; t.setValue(t.__color.toOriginal()); return !1
      } function w (b) {
        b.preventDefault(); let c = a.getHeight(t.__hue_field),
          d = a.getOffset(t.__hue_field); b = 1 - (b.clientY - d.top + document.body.scrollTop) / c; b > 1 ? b = 1 : b < 0 && (b = 0); t.__color.h = 360 * b; t.setValue(t.__color.toOriginal()); return !1
      }q.superclass.call(this, f, n); this.__color = new d(this.getValue()); this.__temp = new d(0); var t = this; this.domElement = document.createElement('div'); a.makeSelectable(this.domElement, !1)
      this.__selector = document.createElement('div'); this.__selector.className = 'selector'; this.__saturation_field = document.createElement('div'); this.__saturation_field.className = 'saturation-field'; this.__field_knob = document.createElement('div'); this.__field_knob.className = 'field-knob'; this.__field_knob_border = '2px solid '; this.__hue_knob = document.createElement('div'); this.__hue_knob.className = 'hue-knob'; this.__hue_field = document.createElement('div'); this.__hue_field.className = 'hue-field'; this.__input = document.createElement('input')
      this.__input.type = 'text'; this.__input_textShadow = '0 1px 1px '; a.bind(this.__input, 'keydown', function (a) { a.keyCode === 13 && g.call(this) }); a.bind(this.__input, 'blur', g); a.bind(this.__selector, 'mousedown', function (b) { a.addClass(this, 'drag').bind(window, 'mouseup', (b) => { a.removeClass(t.__selector, 'drag') }) }); let y = document.createElement('div'); c.extend(this.__selector.style, { width: '122px', height: '102px', padding: '3px', backgroundColor: '#222', boxShadow: '0px 1px 3px rgba(0,0,0,0.3)' }); c.extend(this.__field_knob.style,
        { position: 'absolute', width: '12px', height: '12px', border: this.__field_knob_border + (this.__color.v < 0.5 ? '#fff' : '#000'), boxShadow: '0px 1px 3px rgba(0,0,0,0.5)', borderRadius: '12px', zIndex: 1 }); c.extend(this.__hue_knob.style, { position: 'absolute', width: '15px', height: '2px', borderRight: '4px solid #fff', zIndex: 1 }); c.extend(this.__saturation_field.style, { width: '100px', height: '100px', border: '1px solid #555', marginRight: '3px', display: 'inline-block', cursor: 'pointer' }); c.extend(y.style, { width: '100%', height: '100%',
        background: 'none' }); b(y, 'top', 'rgba(0,0,0,0)', '#000'); c.extend(this.__hue_field.style, { width: '15px', height: '100px', display: 'inline-block', border: '1px solid #555', cursor: 'ns-resize' }); p(this.__hue_field); c.extend(this.__input.style, { outline: 'none', textAlign: 'center', color: '#fff', border: 0, fontWeight: 'bold', textShadow: `${this.__input_textShadow}rgba(0,0,0,0.7)` }); a.bind(this.__saturation_field, 'mousedown', u); a.bind(this.__field_knob, 'mousedown', u); a.bind(this.__hue_field, 'mousedown', (b) => {
        w(b); a.bind(window,
          'mousemove', w); a.bind(window, 'mouseup', k)
      }); this.__saturation_field.appendChild(y); this.__selector.appendChild(this.__field_knob); this.__selector.appendChild(this.__saturation_field); this.__selector.appendChild(this.__hue_field); this.__hue_field.appendChild(this.__hue_knob); this.domElement.appendChild(this.__input); this.domElement.appendChild(this.__selector); this.updateDisplay()
    }; q.superclass = f; c.extend(q.prototype, f.prototype, { updateDisplay: function () {
      let a = e(this.getValue()); if (!1 !== a) {
        let f = !1
        c.each(d.COMPONENTS, function (b) { if (!c.isUndefined(a[b]) && !c.isUndefined(this.__color.__state[b]) && a[b] !== this.__color.__state[b]) return f = !0, {} }, this); f && c.extend(this.__color.__state, a)
      }c.extend(this.__temp.__state, this.__color.__state); this.__temp.a = 1; let l = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0,
        p = 255 - l; c.extend(this.__field_knob.style, { marginLeft: `${100 * this.__color.s - 7}px`, marginTop: `${100 * (1 - this.__color.v) - 7}px`, backgroundColor: this.__temp.toString(), border: `${this.__field_knob_border}rgb(${l
        },${l},${l})` }); this.__hue_knob.style.marginTop = `${100 * (1 - this.__color.h / 360)}px`; this.__temp.s = 1; this.__temp.v = 1; b(this.__saturation_field, 'left', '#fff', this.__temp.toString()); c.extend(this.__input.style, { backgroundColor: this.__input.value = this.__color.toString(), color: `rgb(${l},${l},${l})`, textShadow: `${this.__input_textShadow}rgba(${p},${p},${p},.7)` })
    } }); var l = ['-moz-', '-o-', '-webkit-', '-ms-', '']; return q
  }(dat.controllers.Controller, dat.dom.dom, dat.color.Color = (function (f, a, d, e) {
    function c (a,
                b, c) { Object.defineProperty(a, b, { get: function () { if (this.__state.space === 'RGB') return this.__state[b]; p(this, b, c); return this.__state[b] }, set: function (a) { this.__state.space !== 'RGB' && (p(this, b, c), this.__state.space = 'RGB'); this.__state[b] = a } }) } function b (a, b) { Object.defineProperty(a, b, { get: function () { if (this.__state.space === 'HSV') return this.__state[b]; q(this); return this.__state[b] }, set: function (a) { this.__state.space !== 'HSV' && (q(this), this.__state.space = 'HSV'); this.__state[b] = a } }) } function p (b, c, d) {
      if (b.__state.space ===
        'HEX')b.__state[c] = a.component_from_hex(b.__state.hex, d); else if (b.__state.space === 'HSV')e.extend(b.__state, a.hsv_to_rgb(b.__state.h, b.__state.s, b.__state.v)); else throw 'Corrupted color state'
    } function q (b) { let c = a.rgb_to_hsv(b.r, b.g, b.b); e.extend(b.__state, { s: c.s, v: c.v }); e.isNaN(c.h) ? e.isUndefined(b.__state.h) && (b.__state.h = 0) : b.__state.h = c.h } let l = function () {
      this.__state = f.apply(this, arguments); if (!1 === this.__state) throw 'Failed to interpret color arguments'; this.__state.a = this.__state.a ||
        1
    }; l.COMPONENTS = 'r g b h s v hex a'.split(' '); e.extend(l.prototype, { toString: function () { return d(this) }, toOriginal: function () { return this.__state.conversion.write(this) } }); c(l.prototype, 'r', 2); c(l.prototype, 'g', 1); c(l.prototype, 'b', 0); b(l.prototype, 'h'); b(l.prototype, 's'); b(l.prototype, 'v'); Object.defineProperty(l.prototype, 'a', { get: function () { return this.__state.a }, set: function (a) { this.__state.a = a } }); Object.defineProperty(l.prototype, 'hex', { get: function () {
      !this.__state.space !== 'HEX' && (this.__state.hex =
        a.rgb_to_hex(this.r, this.g, this.b)); return this.__state.hex
    }, set: function (a) { this.__state.space = 'HEX'; this.__state.hex = a } }); return l
  }(dat.color.interpret, dat.color.math = (function () {
    let f; return { hsv_to_rgb: function (a, d, e) {
      let c = a / 60 - Math.floor(a / 60),
        b = e * (1 - d),
        f = e * (1 - c * d); d = e * (1 - (1 - c) * d); a = [[e, d, b], [f, e, b], [b, e, d], [b, f, e], [d, b, e], [e, b, f]][Math.floor(a / 60) % 6]; return { r: 255 * a[0], g: 255 * a[1], b: 255 * a[2] }
    }, rgb_to_hsv: function (a, d, e) {
      var c = Math.min(a, d, e),
        b = Math.max(a, d, e),
        c = b - c; if (b == 0) return { h: NaN, s: 0, v: 0 }
      a = (a == b ? (d - e) / c : d == b ? 2 + (e - a) / c : 4 + (a - d) / c) / 6; a < 0 && (a += 1); return { h: 360 * a, s: c / b, v: b / 255 }
    }, rgb_to_hex: function (a, d, e) { a = this.hex_with_component(0, 2, a); a = this.hex_with_component(a, 1, d); return a = this.hex_with_component(a, 0, e) }, component_from_hex: function (a, d) { return a >> 8 * d & 255 }, hex_with_component: function (a, d, e) { return e << (f = 8 * d) | a & ~(255 << f) } }
  }()), dat.color.toString, dat.utils.common)), dat.color.interpret, dat.utils.common)), dat.utils.requestAnimationFrame = (function () {
    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (f, a) { window.setTimeout(f, 1E3 / 60) }
  }()), dat.dom.CenteredDiv = (function (f, a) {
    let d = function () {
      this.backgroundElement = document.createElement('div'); a.extend(this.backgroundElement.style, { backgroundColor: 'rgba(0,0,0,0.8)', top: 0, left: 0, display: 'none', zIndex: '1000', opacity: 0, WebkitTransition: 'opacity 0.2s linear', transition: 'opacity 0.2s linear' }); f.makeFullscreen(this.backgroundElement); this.backgroundElement.style.position =
        'fixed'; this.domElement = document.createElement('div'); a.extend(this.domElement.style, { position: 'fixed', display: 'none', zIndex: '1001', opacity: 0, WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear', transition: 'transform 0.2s ease-out, opacity 0.2s linear' }); document.body.appendChild(this.backgroundElement); document.body.appendChild(this.domElement); let d = this; f.bind(this.backgroundElement, 'click', () => { d.hide() })
    }; d.prototype.show = function () {
      let d = this; this.backgroundElement.style.display =
        'block'; this.domElement.style.display = 'block'; this.domElement.style.opacity = 0; this.domElement.style.webkitTransform = 'scale(1.1)'; this.layout(); a.defer(() => { d.backgroundElement.style.opacity = 1; d.domElement.style.opacity = 1; d.domElement.style.webkitTransform = 'scale(1)' })
    }; d.prototype.hide = function () {
      var a = this,
        c = function () {
          a.domElement.style.display = 'none'; a.backgroundElement.style.display = 'none'; f.unbind(a.domElement, 'webkitTransitionEnd', c); f.unbind(a.domElement, 'transitionend', c); f.unbind(a.domElement,
            'oTransitionEnd', c)
        }; f.bind(this.domElement, 'webkitTransitionEnd', c); f.bind(this.domElement, 'transitionend', c); f.bind(this.domElement, 'oTransitionEnd', c); this.backgroundElement.style.opacity = 0; this.domElement.style.opacity = 0; this.domElement.style.webkitTransform = 'scale(1.1)'
    }; d.prototype.layout = function () { this.domElement.style.left = `${window.innerWidth / 2 - f.getWidth(this.domElement) / 2}px`; this.domElement.style.top = `${window.innerHeight / 2 - f.getHeight(this.domElement) / 2}px` }; return d
  }(dat.dom.dom, dat.utils.common)),
  dat.dom.dom, dat.utils.common))
/*   main.js  */
var c = document.getElementById('c'),
  w = c.width = window.innerWidth,
  h = c.height = window.innerHeight,
  ctx = c.getContext( '2d' ),

  opts = {

    lineCount: 149,
    starCount: 182,

    radVel: .01,
    lineBaseVel: .13,
    lineAddedVel: .1,
    lineBaseLife: .2,
    lineAddedLife: .01,

    starBaseLife: 68,
    starAddedLife: 12,

    ellipseTilt: -.3,
    ellipseBaseRadius: .11,
    ellipseAddedRadius: .3,
    ellipseAxisMultiplierX: 1.2,
    ellipseAxisMultiplierY: 0.7,
    ellipseCX: w/2,
    ellipseCY: h/2,

    repaintAlpha: .015
  },
  /*   初始值
   opts = {

   lineCount: 100,
   starCount: 30,

   radVel: .01,
   lineBaseVel: .1,
   lineAddedVel: .1,
   lineBaseLife: .4,
   lineAddedLife: .01,

   starBaseLife: 10,
   starAddedLife: 10,

   ellipseTilt: -.3,
   ellipseBaseRadius: .15,
   ellipseAddedRadius: .02,
   ellipseAxisMultiplierX: 2,
   ellipseAxisMultiplierY: 1,
   ellipseCX: w / 2,
   ellipseCY: h / 2,

   repaintAlpha: .015
   },*/
  gui = new dat.GUI,

  lines = [],
  stars = [],
  tick = 0,
  first = true;

function init() {

  lines.length = stars.length = 0;
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#333';
  ctx.fillRect( 0, 0, w, h );

  if( first ) {
    var f = gui.addFolder( 'logics' );
    f.add( opts, 'lineCount', 1, 300 );
    f.add( opts, 'starCount', 1, 300 );
    f.add( opts, 'radVel', 0, 1 );
    f.add( opts, 'lineBaseVel', .01, 1 );
    f.add( opts, 'lineAddedVel', 0, 1 );
    f.add( opts, 'lineBaseLife', 0, 1 );
    f.add( opts, 'lineAddedLife', 0, 1 );
    f.add( opts, 'starBaseLife', 0, 100 );
    f.add( opts, 'starAddedLife', 0, 100 );
    f = gui.addFolder( 'graphics' );
    // f.add( opts, 'ellipseTilt', -Math.PI, Math.PI ).step( .1 );
    f.add( opts, 'ellipseBaseRadius', 0, .5 );
    f.add( opts, 'ellipseAddedRadius', 0, .5 );
    f.add( opts, 'ellipseAxisMultiplierX', 0, 3 );
    f.add( opts, 'ellipseAxisMultiplierY', 0, 3 );
    f.add( opts, 'ellipseCX', 0, w );
    f.add( opts, 'ellipseCY', 0, h );
    f.add( opts, 'repaintAlpha', 0, 1 );
    // gui.add( window, 'init' ).name( 'reset animation' );
    // gui.add( window, 'LuukLamers' );

    loop();
    first = false;
  }
}

function loop() {

  window.requestAnimationFrame( loop );
  step();
  draw();
}

function step() {

  tick += .5;

  if( lines.length < opts.lineCount && Math.random() < .5 )
    lines.push( new Line );

  if( stars.length < opts.starCount )
    stars.push( new Star );

  lines.map( function( line ) { line.step(); } );
  stars.map( function( star ) { star.step(); } );
}

function draw() {

  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', opts.repaintAlpha );
  ctx.fillRect( 0, 0, w, h );

  ctx.globalCompositeOperation = 'lighter';

  ctx.translate( opts.ellipseCX, opts.ellipseCY );
  ctx.rotate( opts.ellipseTilt );
  ctx.scale( opts.ellipseAxisMultiplierX, opts.ellipseAxisMultiplierY );

  // ctx.shadowBlur here almost does nothing
  lines.map( function( line ) { line.draw(); } );

  ctx.scale( 1/opts.ellipseAxisMultiplierX, 1/opts.ellipseAxisMultiplierY );
  ctx.rotate( -opts.ellipseTilt );
  ctx.translate( -opts.ellipseCX, -opts.ellipseCY );

  stars.map( function( star ) { star.draw(); } );
}

function Line() {

  this.reset();
}
Line.prototype.reset = function() {

  this.rad = Math.random() * Math.PI * 2,
    this.len = w * ( opts.ellipseBaseRadius + Math.random() * opts.ellipseAddedRadius );
  this.lenVel = opts.lineBaseVel + Math.random() * opts.lineAddedVel;

  this.x = this.px = Math.cos( this.rad ) * this.len;
  this.y = this.py = Math.sin( this.rad ) * this.len;

  this.life = this.originalLife = w * ( opts.lineBaseLife + Math.random() * opts.lineAddedLife );

  this.alpha = .2 + Math.random() * .8;
}
Line.prototype.step = function() {

  --this.life;

  var ratio = 1 - .1 *  this.life / this.originalLife;

  this.px = this.x;
  this.py = this.y;

  this.rad += opts.radVel;
  this.len -= this.lenVel;

  this.x = Math.cos( this.rad ) * this.len;
  this.y = Math.sin( this.rad ) * this.len;

  if( this.life <= 0 )
    this.reset();
}
Line.prototype.draw = function() {

  var ratio = Math.abs( this.life / this.originalLife - 1/2 );

  ctx.lineWidth = ratio * 5;
  ctx.strokeStyle = ctx.shadowColor = 'hsla(hue, 80%, light%, alp)'
    .replace( 'hue', tick + this.x / ( w * ( opts.ellipseBaseRadius + opts.ellipseAddedRadius ) ) * 100 )
    .replace( 'light', 75 - ratio * 150 )
    .replace( 'alp', this.alpha );
  ctx.beginPath();
  ctx.moveTo( this.px, this.py );
  ctx.lineTo( this.x, this.y );

  ctx.stroke();
}

function Star() {

  this.reset();
};
Star.prototype.reset = function() {

  this.x = Math.random() * w;
  this.y = Math.random() * h;
  this.life = opts.starBaseLife + Math.random() * opts.starAddedLife;
}
Star.prototype.step = function() {

  --this.life;

  if( this.life <= 0 )
    this.reset();
}
Star.prototype.draw = function(){

  ctx.fillStyle = ctx.shadowColor = 'hsla(hue, 80%, 50%, .2)'
    .replace( 'hue', tick + this.x / w * 100 );
  ctx.shadowBlur = this.life;
  ctx.fillRect( this.x, this.y, 1, 1 );
};

window.addEventListener( 'resize', function() {

  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  // var x = w >1000 ? ((w-800) / 2) : 160
  //
  opts.ellipseCX =  w/2,
  opts.ellipseCY = h / 2;
  init();
} );

function LuukLamers() {

  var i = 0,
    array = [ 300, 74, 0.04, 0.1, 0.1, .55, 10, 100, 10, -.15, .18, .01, 3, 1, w / 2, h / 2, 0.02 ];

  for( var key in opts ) {

    opts[ key ] = array[ i ];
    ++i;
  }

  init();
}

init();
}
