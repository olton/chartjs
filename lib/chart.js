/*! 
 * MetroUI :: ChartJS - Create different charts in js
 * https://pimenov.com.ua
 *
 * Copyright 2021 Serhii Pimenov
 * Released under the MIT license
 */

(function () {
    'use strict';

    var defaultBorder = {
      width: 1,
      lineType: 'solid',
      color: '#e3e3e3',
      radius: 0
    };

    var defaultFont = {
      style: 'normal',
      family: "Helvetica, sans-serif",
      size: 12,
      weight: 'normal',
      lineHeight: 1.2
    };
    var labelFont = Object.assign({}, defaultFont, {
      weight: 'bold'
    });
    var titleFont = Object.assign({}, defaultFont, {
      weight: 'bold',
      size: 24
    });

    var defaultTitle = {
      display: true,
      align: 'center',
      // start, center, end
      rtl: false,
      color: '#000',
      text: '',
      font: titleFont,
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    };

    var defaultLegend = {
      rtl: false,
      margin: {
        top: 20,
        left: 0,
        right: 0,
        bottom: 0
      },
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      font: labelFont,
      border: defaultBorder,
      dash: [],
      color: '#fff',
      vertical: false,
      position: 'top-left' // top-left, top-right, bottom-left, bottom-right, top-center, bottom-center

    };

    var defaultTooltip = {
      width: "auto",
      background: "#fff",
      color: "#000",
      font: defaultFont,
      border: defaultBorder,
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      },
      shadow: {
        shiftX: 2,
        shiftY: 2,
        blur: 4,
        stretch: 0,
        color: 'rgba(0,0,0,.5)'
      }
    };

    var defaultPadding = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    };

    var defaultMargin = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    var StandardColorPalette = {
      aliceBlue: "#f0f8ff",
      antiqueWhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedAlmond: "#ffebcd",
      blue: "#0000ff",
      blueViolet: "#8a2be2",
      brown: "#a52a2a",
      burlyWood: "#deb887",
      cadetBlue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerBlue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkBlue: "#00008b",
      darkCyan: "#008b8b",
      darkGoldenRod: "#b8860b",
      darkGray: "#a9a9a9",
      darkGreen: "#006400",
      darkKhaki: "#bdb76b",
      darkMagenta: "#8b008b",
      darkOliveGreen: "#556b2f",
      darkOrange: "#ff8c00",
      darkOrchid: "#9932cc",
      darkRed: "#8b0000",
      darkSalmon: "#e9967a",
      darkSeaGreen: "#8fbc8f",
      darkSlateBlue: "#483d8b",
      darkSlateGray: "#2f4f4f",
      darkTurquoise: "#00ced1",
      darkViolet: "#9400d3",
      deepPink: "#ff1493",
      deepSkyBlue: "#00bfff",
      dimGray: "#696969",
      dodgerBlue: "#1e90ff",
      fireBrick: "#b22222",
      floralWhite: "#fffaf0",
      forestGreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#DCDCDC",
      ghostWhite: "#F8F8FF",
      gold: "#ffd700",
      goldenRod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenYellow: "#adff2f",
      honeyDew: "#f0fff0",
      hotPink: "#ff69b4",
      indianRed: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderBlush: "#fff0f5",
      lawnGreen: "#7cfc00",
      lemonChiffon: "#fffacd",
      lightBlue: "#add8e6",
      lightCoral: "#f08080",
      lightCyan: "#e0ffff",
      lightGoldenRodYellow: "#fafad2",
      lightGray: "#d3d3d3",
      lightGreen: "#90ee90",
      lightPink: "#ffb6c1",
      lightSalmon: "#ffa07a",
      lightSeaGreen: "#20b2aa",
      lightSkyBlue: "#87cefa",
      lightSlateGray: "#778899",
      lightSteelBlue: "#b0c4de",
      lightYellow: "#ffffe0",
      lime: "#00ff00",
      limeGreen: "#32dc32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumAquaMarine: "#66cdaa",
      mediumBlue: "#0000cd",
      mediumOrchid: "#ba55d3",
      mediumPurple: "#9370db",
      mediumSeaGreen: "#3cb371",
      mediumSlateBlue: "#7b68ee",
      mediumSpringGreen: "#00fa9a",
      mediumTurquoise: "#48d1cc",
      mediumVioletRed: "#c71585",
      midnightBlue: "#191970",
      mintCream: "#f5fffa",
      mistyRose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajoWhite: "#ffdead",
      navy: "#000080",
      oldLace: "#fdd5e6",
      olive: "#808000",
      oliveDrab: "#6b8e23",
      orange: "#ffa500",
      orangeRed: "#ff4500",
      orchid: "#da70d6",
      paleGoldenRod: "#eee8aa",
      paleGreen: "#98fb98",
      paleTurquoise: "#afeeee",
      paleVioletRed: "#db7093",
      papayaWhip: "#ffefd5",
      peachPuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderBlue: "#b0e0e6",
      purple: "#800080",
      rebeccaPurple: "#663399",
      red: "#ff0000",
      rosyBrown: "#bc8f8f",
      royalBlue: "#4169e1",
      saddleBrown: "#8b4513",
      salmon: "#fa8072",
      sandyBrown: "#f4a460",
      seaGreen: "#2e8b57",
      seaShell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      slyBlue: "#87ceeb",
      slateBlue: "#6a5acd",
      slateGray: "#708090",
      snow: "#fffafa",
      springGreen: "#00ff7f",
      steelBlue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whiteSmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowGreen: "#9acd32"
    };

    var defaultOptions = {
      dpi: 1,
      height: 200,
      width: "100%",
      padding: defaultPadding,
      margin: defaultMargin,
      background: '#fff',
      color: '#000',
      font: defaultFont,
      border: defaultBorder,
      title: defaultTitle,
      legend: defaultLegend,
      tooltip: defaultTooltip,
      boundaries: false,
      accuracy: 10,
      colors: Object.values(StandardColorPalette),
      onDrawLabelY: null,
      onDrawLabelX: null,
      onTooltipShow: null,
      onHover: null,
      onLeave: null
    };

    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    function isObject(item) {
      return item && typeof item === 'object' && !Array.isArray(item);
    }
    /**
     * Deep merge two objects.
     * @param target
     * @param ...sources
     */

    function merge(target) {
      for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
      }

      if (!sources.length) return target;
      var source = sources.shift();

      if (isObject(target) && isObject(source)) {
        for (var key in source) {
          if (isObject(source[key])) {
            if (!target[key]) Object.assign(target, {
              [key]: {}
            });
            merge(target[key], source[key]);
          } else {
            Object.assign(target, {
              [key]: source[key]
            });
          }
        }
      }

      return merge(target, ...sources);
    }

    var drawText = (ctx, text, _ref, _ref2) => {
      var [x, y] = _ref;
      var {
        align = 'left',
        color = '#000',
        stroke = '#000',
        font,
        angle = 0,
        translate = [0, 0]
      } = _ref2;
      var {
        style = 'normal',
        weight = 'normal',
        size = 12,
        lineHeight = 1,
        family = 'sans-serif'
      } = font;
      var tX = 0,
          tY = 0;

      if (typeof translate === "number") {
        tX = tY = translate;
      } else if (Array.isArray(translate)) {
        [tX, tY] = translate;
      }

      ctx.save();
      ctx.beginPath();
      ctx.textAlign = align;
      ctx.fillStyle = color;
      ctx.strokeStyle = stroke;
      ctx.font = "".concat(style, " ").concat(weight, " ").concat(size, "px/").concat(lineHeight, " ").concat(family);
      ctx.translate(tX, tY);
      ctx.rotate(angle);
      ctx.textBaseline = "middle";
      var lines = text.toString().split('\n');
      lines.map((str, i) => {
        ctx.fillText(str, x, y + y * i * lineHeight);
      });
      ctx.closePath();
      ctx.restore();
    };

    var getTextBoxWidth = (ctx, items, _ref) => {
      var {
        font = null
      } = _ref;
      var size = 0,
          w;
      ctx.save();

      if (font) {
        var {
          style = 'normal',
          weight = 'normal',
          size: _size = 12,
          lineHeight = 1.2,
          family = 'sans-serif'
        } = font;
        ctx.font = "".concat(style, " ").concat(weight, " ").concat(_size, "px/").concat(lineHeight, " ").concat(family);
      }

      for (var i = 0; i < items.length; i++) {
        w = ctx.measureText(items[i][0]).width;
        if (w > size) size = w;
      }

      ctx.restore();
      return size;
    };

    var drawSquare = (ctx, _ref, _ref2) => {
      var [x, y, r] = _ref;
      var {
        color = '#000',
        fill = '#fff',
        size = 1,
        dash = []
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash(dash);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      ctx.rect(x - r, y - r, r * 2, r * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    };

    var drawBox = (ctx, _ref, _ref2) => {
      var [x, y, w, h] = _ref;
      var {
        color = '#fff',
        borderColor = '#000',
        dash = [],
        size = 1
      } = _ref2;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = borderColor;
      ctx.fillStyle = color;
      ctx.setLineDash(dash);
      ctx.lineWidth = size;
      ctx.clearRect(x, y, w, h);
      ctx.fillRect(x, y, w, h);
      if (size) ctx.strokeRect(x, y, w, h);
      ctx.closePath();
      ctx.restore();
    };

    var expandPadding = padding => {
      if (typeof padding === "number") {
        return {
          top: padding,
          left: padding,
          right: padding,
          bottom: padding
        };
      }

      return padding;
    };

    var expandMargin = margin => {
      if (typeof margin === "number") {
        return {
          top: margin,
          left: margin,
          right: margin,
          bottom: margin
        };
      }

      return margin;
    };

    var MixinLegend = {
      legend() {
        var o = this.options;
        return o.legend.vertical === true ? this.legendVertical() : this.legendHorizontal();
      },

      legendHorizontal() {
        var o = this.options,
            padding = expandPadding(o.padding),
            legend = o.legend,
            legendPadding = expandPadding(legend.padding),
            legendMargin = expandMargin(legend.margin);
        var lh,
            x,
            y,
            magic = 5,
            box;
        var ctx = this.ctx;
        var items = this.legendItems;
        var offset = 0;
        if (!legend || !isObject(legend)) return;
        if (!items || !Array.isArray(items) || !items.length) return;
        box = legend.font.size / 2;
        lh = legend.font.size * legend.font.lineHeight;
        y = padding.top + this.viewHeight + legend.font.size + legendPadding.top + legendMargin.top;
        x = padding.left + legendPadding.left + legendMargin.left;

        for (var i = 0; i < items.length; i++) {
          var [name] = items[i];
          offset += getTextBoxWidth(ctx, [[name]], {
            font: legend.font
          }) + box * 2 + magic;
        }

        offset = (this.viewWidth - offset) / 2;

        for (var _i = 0; _i < items.length; _i++) {
          var [_name, color] = items[_i];
          var nameWidth = getTextBoxWidth(ctx, [[_name]], {
            font: legend.font
          });

          if (x + nameWidth > this.viewWidth) {
            x = padding.left + legendPadding.left + legendMargin.left;
            y += lh;
          }

          drawSquare(ctx, [offset + x, y, box], {
            color,
            fill: color
          });
          drawText(ctx, _name, [offset + x + box + magic, y + box / 2], {
            color: o.font.color,
            stroke: o.font.color,
            font: o.font
          });
          x += box + nameWidth + 20;
        }
      },

      legendVertical() {
        var _legend$font;

        var o = this.options,
            legend = o.legend,
            font = (_legend$font = legend.font) !== null && _legend$font !== void 0 ? _legend$font : o.font;
        var lh,
            x,
            y,
            magic = 5,
            box = font.size / 2;
        var ctx = this.ctx;
        var items = this.legendItems;
        var textBoxWidth, textBoxHeight;
        var legendPadding = expandPadding(legend.padding),
            legendMargin = expandMargin(legend.margin);
        var padding = expandPadding(o.padding);
        if (!legend || !isObject(legend)) return;
        if (!items || !Array.isArray(items) || !items.length) return;
        lh = font.size * font.lineHeight;
        textBoxWidth = getTextBoxWidth(ctx, items, {
          font
        }) + legendPadding.left + legendPadding.right + box * 3 + magic;
        textBoxHeight = items.length * lh + legendPadding.top + legendPadding.bottom + magic;

        if (legend.position === 'top-left') {
          x = padding.left + legendMargin.left;
          y = padding.top + legendMargin.top;
        } else if (legend.position === 'top-right') {
          x = this.dpiWidth - textBoxWidth - legendMargin.right - padding.right;
          y = padding.top + legendMargin.top;
        } else if (legend.position === 'bottom-left') {
          x = padding.left + legendMargin.left;
          y = this.dpiHeight - textBoxHeight - padding.bottom + legendMargin.bottom;
        } else {
          x = this.dpiWidth - textBoxWidth - legendMargin.right - padding.right;
          y = this.dpiHeight - textBoxHeight - padding.bottom + legendMargin.bottom;
        }

        drawBox(ctx, [x, y, textBoxWidth, textBoxHeight], {
          color: legend.color,
          dash: legend.dash,
          size: legend.border.width,
          borderColor: legend.border.color
        });
        x += box + magic + legendPadding.left;
        y += box + magic + legendPadding.top;

        for (var i = 0; i < items.length; i++) {
          var [name, color] = items[i];
          drawSquare(ctx, [x, y, box], {
            color,
            fill: color
          });
          drawText(ctx, name, [x + box + magic, y + 1], {
            color: o.font.color,
            stroke: o.font.color,
            font: legend.font
          });
          y += lh;
        }
      }

    };

    var MixinTooltip = {
      showTooltip(data, graph) {
        var o = this.options;

        if (this.tooltip) {
          this.tooltip.remove();
          this.tooltip = null;
        }

        if (!o.tooltip) return;
        var {
          x,
          y
        } = this.proxy.mouse;
        var tooltip = document.createElement("div");
        var onShow = o.onTooltipShow;
        var font = o.tooltip.font;
        var shadow = o.tooltip.shadow;
        var border = o.tooltip.border;
        var padding = expandPadding(o.tooltip.padding);
        tooltip.style.position = 'fixed';
        tooltip.style.border = "".concat(border.width, "px ").concat(border.lineType, " ").concat(border.color);
        tooltip.style.borderRadius = "".concat(border.radius);
        tooltip.style.padding = "".concat(padding.top, "px ").concat(padding.right, "px ").concat(padding.bottom, "px ").concat(padding.left, "px");
        tooltip.style.background = "".concat(o.tooltip.background);
        tooltip.style.font = "".concat(font.style, " ").concat(font.weight, " ").concat(font.size, "px/").concat(font.lineHeight, " ").concat(font.family);
        tooltip.style.boxShadow = "".concat(shadow.shiftX, "px ").concat(shadow.shiftY, "px ").concat(shadow.blur, "px ").concat(shadow.color);
        tooltip.innerHTML = onShow && typeof onShow === 'function' ? onShow.apply(null, [data, graph]) : data;
        document.querySelector('body').appendChild(tooltip);
        tooltip.style.top = "".concat(y - tooltip.clientHeight - 15, "px");
        tooltip.style.left = "".concat(x - tooltip.clientWidth / 2 - 5, "px");
        this.tooltip = tooltip;
      }

    };

    class Chart {
      constructor(el, data) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'unknown';
        this.el = document.querySelector(el);

        if (!this.el) {
          throw new Error("You must define a selector for chart wrapper element!");
        }

        this.options = merge({}, defaultOptions, options);
        this.data = data;
        this.canvas = null;
        this.ctx = null;
        this.raf = null;
        this.tooltip = null;
        this.legendItems = [];
        this.chartType = type;
        this.rect = this.el.getBoundingClientRect();
        this.canvasRect = null;
        var that = this;
        this.proxy = new Proxy({}, {
          set() {
            var result = Reflect.set(...arguments);
            that.raf = requestAnimationFrame(that.draw.bind(that));
            return result;
          }

        });

        if (this.options.border) {
          this.el.style.border = "".concat(this.options.border.width, "px ").concat(this.options.border.lineType, " ").concat(this.options.border.color);
        }

        this.calcInternalValues();
        this.createCanvas();
        this.addEvents();
      }

      createCanvas() {
        this.canvas = document.createElement("canvas");
        this.el.innerHTML = "";
        this.el.style.overflow = 'hidden';
        this.el.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();
        this.canvasRect = this.canvas.getBoundingClientRect();
      }

      setCanvasSize() {
        var o = this.options;
        this.canvas.style.height = this.height + 'px';
        this.canvas.style.width = this.width + 'px';
        this.canvas.width = o.dpi * this.width;
        this.canvas.height = o.dpi * this.height;
      }

      calcInternalValues() {
        var width, height;
        var o = this.options,
            padding = expandPadding(o.padding);
        var rect = this.el.getBoundingClientRect();
        var {
          width: elWidth,
          height: elHeight
        } = rect;
        width = o.width.toString().includes('%') ? elWidth / 100 * parseInt(o.width) : +o.width;
        height = o.height.toString().includes('%') ? elHeight / 100 * parseInt(o.height) : +o.height;
        this.width = width;
        this.height = height;
        this.dpiHeight = o.dpi * height;
        this.dpiWidth = o.dpi * width;
        this.viewHeight = this.dpiHeight - (padding.top + padding.bottom);
        this.viewWidth = this.dpiWidth - (padding.left + padding.right);
      }

      title() {
        var title = this.options.title;
        var ctx = this.ctx;
        var magic = 5;
        var x;

        if (!title || !title.text) {
          return;
        }

        var {
          text,
          align,
          color,
          font
        } = title;

        switch (align) {
          case 'center':
            x = this.dpiWidth / 2;
            break;

          case 'right':
            x = this.dpiWidth - magic;
            break;

          default:
            x = magic;
        }

        drawText(ctx, text, [x, font.size + magic], {
          align: title.align,
          color: title.color,
          stroke: title.color,
          font: title.font
        });
      }

      draw() {
        this.clear();
        this.title();
      }

      clear() {
        this.ctx.clearRect(0, 0, this.dpiWidth, this.dpiHeight);
      }

      setData(graphIndex, data) {
        this.data[graphIndex].data = data;
        this.draw();
      }

      mouseMove(e) {
        var onHover = this.options.onHover;
        var {
          clientX: x,
          clientY: y
        } = e;
        if (typeof onHover === "function") onHover.apply(null, [x, y]);
        this.proxy.mouse = {
          x: x,
          y: y
        };
      }

      mouseLeave() {
        var fn = this.options.onLeave;
        if (typeof fn === "function") fn.apply(null, []);
        this.proxy.mouse = null;
      }

      resize() {
        this.calcInternalValues();
        this.setCanvasSize();
        this.rect = this.el.getBoundingClientRect();
        this.canvasRect = this.canvas.getBoundingClientRect();
        this.draw();
      }

      addEvents() {
        var canvas = this.canvas;
        canvas.addEventListener("mousemove", this.mouseMove.bind(this));
        canvas.addEventListener("mouseleave", this.mouseLeave.bind(this));
        window.addEventListener("resize", this.resize.bind(this));
      }

      destroy() {
        var canvas = this.canvas;
        cancelAnimationFrame(this.raf);
        canvas.removeEventListener("mousemove", this.mouseMove.bind(this));
        canvas.removeEventListener("mouseleave", this.mouseLeave.bind(this));
        window.removeEventListener("resize", this.resize.bind(this));
      }

    }
    Object.assign(Chart.prototype, MixinLegend);
    Object.assign(Chart.prototype, MixinTooltip);

    var minMax = function minMax() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var by = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';
      var min, max, v;
      var index;

      if (typeof by === "number") {
        index = by;
      } else {
        switch (by.toString().toLowerCase()) {
          case 'y':
            index = 1;
            break;

          case 'z':
            index = 2;
            break;

          default:
            index = 0;
        }
      }

      for (var _ of data) {
        v = _[index];
        if (isNaN(min) || min > v) min = v;
        if (isNaN(max) || max < v) max = v;
      }

      return [min, max];
    };
    var minMaxLinear = function minMaxLinear() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var min, max;
      min = Math.min.apply(null, data);
      max = Math.max.apply(null, data);
      return [min, max];
    };

    var drawCircle = (ctx, _ref, _ref2) => {
      var [x, y, r] = _ref;
      var {
        color = '#000',
        fill = '#fff',
        size = 1
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash([]);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    };

    var drawLine = function drawLine(ctx) {
      var coords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var {
        color = '#000',
        size = 1,
        dash = []
      } = arguments.length > 2 ? arguments[2] : undefined;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash(dash);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      coords.map((_ref) => {
        var [x, y] = _ref;
        ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    };

    var drawTriangle = (ctx, _ref, _ref2) => {
      var [x, y, r] = _ref;
      var {
        color = '#000',
        fill = '#fff',
        size = 1
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash([]);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      ctx.moveTo(x, y - r);
      ctx.lineTo(x + r, y + r);
      ctx.lineTo(x - r, y + r);
      ctx.lineTo(x, y - r);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    };

    var drawDiamond = (ctx, _ref, _ref2) => {
      var [x, y, r] = _ref;
      var {
        color = '#000',
        fill = '#fff',
        size = 1
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash([]);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      ctx.moveTo(x, y - r);
      ctx.lineTo(x + r, y);
      ctx.lineTo(x, y + r);
      ctx.lineTo(x - r, y);
      ctx.lineTo(x, y - r);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    };

    var arrow = {
      color: '#000',
      size: 1,
      dash: [],
      factorX: 5,
      factorY: 5
    };
    var line = {
      color: '#e3e3e3',
      size: 1,
      dash: [],
      count: 5,
      show: true
    };
    var label = {
      color: '#000',
      font: labelFont,
      count: 5,
      // odd, even, num
      show: true,
      min: true,
      max: true,
      fixed: false
    };
    var axis = {
      arrow,
      line,
      label
    };
    var defaultAxis = {
      x: axis,
      y: axis
    };

    var defaultCross = {
      size: 1,
      color: '#bbb',
      dash: [5, 3]
    };

    var defaultLineChartOptions = {
      axis: defaultAxis,
      cross: defaultCross
    };

    var MixinCross = {
      cross() {
        var o = this.options,
            cross = o.cross;
        var padding = expandPadding(o.padding);
        var ctx = this.ctx;
        var rect = this.canvas.getBoundingClientRect();
        if (!o.cross || o.cross && !this.proxy.mouse) return;
        var {
          x,
          y
        } = this.proxy.mouse;
        x -= rect.left;
        y -= rect.top;
        if (x - padding.left + 1 < 0 || x > this.viewWidth + padding.left + 1) return;
        if (y - padding.top + 1 < 0 || y > this.viewHeight + padding.top + 1) return;
        ctx.beginPath();
        ctx.setLineDash(o.cross.dash);
        ctx.lineWidth = cross.size;
        ctx.strokeStyle = cross.color; // vertical line

        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, this.viewHeight + padding.top); // Horizontal line

        ctx.moveTo(padding.left, y);
        ctx.lineTo(this.viewWidth + padding.left, y);
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
      }

    };

    var drawArrowX = (ctx, _ref, _ref2) => {
      var [x1, y1, x2, y2, factorX, factorY] = _ref;
      var {
        color = '#000',
        dash = [],
        size = 1
      } = _ref2;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.setLineDash(dash);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - factorX, y2 - factorY);
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - factorX, y2 + factorY);
      ctx.stroke();
      ctx.closePath();
    };

    var drawVector = (ctx, _ref, _ref2) => {
      var [x1, y1, x2, y2] = _ref;
      var {
        color = '#000',
        size = 1,
        dash = []
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash(dash);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    };

    var drawArrowY = (ctx, _ref, _ref2) => {
      var [x1, y1, x2, y2, factorX, factorY] = _ref;
      var {
        color = '#000',
        dash = [],
        size = 1
      } = _ref2;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.setLineDash(dash);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - factorX, y2 + factorY);
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 + factorX, y2 + factorY);
      ctx.stroke();
      ctx.closePath();
    };

    var MixinAxis = {
      arrowX() {
        var o = this.options,
            ctx = this.ctx;
        var padding = expandPadding(o.padding);
        var x1 = padding.left,
            y1 = this.viewHeight + padding.top;
        var x2 = x1 + this.viewWidth,
            y2 = y1;
        if (!o.axis.x.arrow) return;
        var arrow = o.axis.x.arrow;
        drawArrowX(ctx, [x1, y1, x2, y2, arrow.factorX, arrow.factorY], {
          color: arrow.color,
          size: arrow.size,
          dash: arrow.dash
        });
      },

      axisX() {
        var _ref;

        var ctx = this.ctx,
            o = this.options;
        var padding = expandPadding(o.padding);
        if (!o.axis.x) return;
        var axis = o.axis.x;
        var font = (_ref = axis && axis.label && axis.label.font) !== null && _ref !== void 0 ? _ref : o.font;
        var step = this.viewWidth / axis.line.count;
        var textStep = (this.maxX - this.minX) / axis.line.count;
        var skipLabels = Math.round(axis.line.count / axis.label.count);

        for (var i = 0; i <= axis.line.count; i++) {
          var x = step * i + padding.left;
          var labelXValue = this.minX + textStep * i;

          if (typeof axis.label.fixed === "number") {
            labelXValue = labelXValue.toFixed(axis.label.fixed);
          }

          if (axis.line.show) {
            drawVector(ctx, [x, padding.top, x, this.viewHeight + padding.top], {
              color: axis.line.color,
              size: axis.line.size,
              dash: axis.line.dash
            });
          }

          if (!axis.label.show) continue;
          if (skipLabels && i && i % skipLabels !== 0) continue;
          if (!axis.label.min && labelXValue === this.minX) continue;

          if (typeof o.onDrawLabelX === "function") {
            labelXValue = o.onDrawLabelX.apply(null, [labelXValue]);
          } // if (x + ctx.measureText(labelXValue.toString()).width > this.viewWidth) continue


          drawVector(ctx, [x, this.viewHeight + padding.top, x, this.viewHeight + padding.top + 5], {});
          drawText(ctx, labelXValue.toString(), [x, this.viewHeight + padding.top + font.size + 5], {
            align: 'center',
            font
          });
        }
      },

      arrowY() {
        var o = this.options,
            ctx = this.ctx;
        var padding = expandPadding(o.padding);
        var x1 = padding.left,
            y1 = this.viewHeight + padding.top;
        var x2 = x1,
            y2 = padding.top;
        if (!o.axis.y.arrow) return;
        var arrow = o.axis.y.arrow;
        drawArrowY(ctx, [x1, y1, x2, y2, arrow.factorX, arrow.factorY], {
          color: arrow.color,
          size: arrow.size,
          dash: arrow.dash
        });
      },

      axisY() {
        var _ref2;

        var ctx = this.ctx,
            o = this.options;
        var padding = expandPadding(o.padding);
        if (!o.axis.y) return;
        var axis = o.axis.y;
        var font = (_ref2 = axis && axis.label && axis.label.font) !== null && _ref2 !== void 0 ? _ref2 : o.font;
        var step = this.viewHeight / axis.line.count;
        var textStep = (this.maxY - this.minY) / axis.line.count;
        var skipLabels = Math.floor(axis.line.count / axis.label.count);

        for (var i = 0; i < axis.line.count + 1; i++) {
          var y = this.viewHeight + padding.top - step * i;
          var x = padding.left;
          var labelYValue = this.minY + textStep * i;

          if (typeof axis.label.fixed === "number") {
            labelYValue = labelYValue.toFixed(axis.label.fixed);
          }

          if (axis.line.show) {
            drawVector(ctx, [x, y, this.viewWidth + padding.left, y], {
              color: axis.line.color,
              size: axis.line.size,
              dash: axis.line.dash
            });
          }

          if (!axis.label.show) continue;
          if (skipLabels && i && i % skipLabels !== 0) continue;
          if (!axis.label.min && labelYValue === this.minY) continue;

          if (typeof o.onDrawLabelY === "function") {
            labelYValue = o.onDrawLabelY.apply(null, [labelYValue]);
          }

          drawVector(ctx, [x - 5, y, x, y], {});
          drawText(ctx, labelYValue.toString(), [padding.left - 10, y + 1], {
            align: 'right',
            font
          });
        }
      },

      axisXY() {
        var o = this.options;
        if (!o.axis) return;
        this.axisX();
        this.arrowX();
        this.axisY();
        this.arrowY();
        return this;
      }

    };

    class LineChart extends Chart {
      constructor(el) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        super(el, data, merge({}, defaultLineChartOptions, options), 'line');
        this.coords = {};
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.legendItems = [];
        var legend = this.options.legend;

        if (legend) {
          for (var i = 0; i < this.data.length; i++) {
            this.legendItems.push([this.data[i].name, this.options.colors[i]]);
          }
        }

        this.calcMinMax();
        this.resize();
      }

      calcMinMax() {
        var o = this.options;
        var a = [];

        for (var k in this.data) {
          var _data = this.data[k].data;
          if (!Array.isArray(_data)) continue;

          for (var [x, y] of _data) {
            a.push([x, y]);
          }
        }

        var [minX, maxX] = minMax(a, 'x');
        var [minY, maxY] = minMax(a, 'y');
        this.minX = o.boundaries && !isNaN(o.boundaries.minX) ? o.boundaries.minX : minX;
        this.maxX = o.boundaries && !isNaN(o.boundaries.maxX) ? o.boundaries.maxX : maxX;
        this.minY = o.boundaries && !isNaN(o.boundaries.minY) ? o.boundaries.minY : minY;
        this.maxY = o.boundaries && !isNaN(o.boundaries.maxY) ? o.boundaries.maxY : maxY;
        return this;
      }

      calcRatio() {
        this.ratioX = this.viewWidth / (this.maxX - this.minX);
        this.ratioY = this.viewHeight / (this.maxY - this.minY);
      }

      lines() {
        var _this = this;

        var o = this.options,
            padding = expandPadding(o.padding);
        var ctx = this.ctx;
        var coords;

        var _loop = function _loop(i) {
          var _dots$color, _dots$fill;

          var graph = _this.data[i];
          var color = o.colors[i];
          coords = [];

          for (var [x, y] of graph.data) {
            var _x = Math.floor((x - _this.minX) * _this.ratioX + padding.left);

            var _y = Math.floor(_this.viewHeight + padding.top - (y - _this.minY) * _this.ratioY);

            coords.push([_x, _y, x, y]);
          }

          if (graph.showLines !== false) {
            drawLine(ctx, coords, {
              color: color,
              size: graph.size
            });
          }

          var dots = graph.dots ? graph.dots : {
            type: 'dot' // dot, square, triangle

          };
          var opt = {
            color: (_dots$color = dots.color) !== null && _dots$color !== void 0 ? _dots$color : color,
            fill: (_dots$fill = dots.fill) !== null && _dots$fill !== void 0 ? _dots$fill : color,
            radius: dots.size || 4
          };
          var drawPointFn = void 0;

          switch (dots.type) {
            case 'square':
              drawPointFn = drawSquare;
              break;

            case 'triangle':
              drawPointFn = drawTriangle;
              break;

            case 'diamond':
              drawPointFn = drawDiamond;
              break;

            default:
              drawPointFn = drawCircle;
          }

          if (graph.dots) {
            coords.map((_ref) => {
              var [x, y] = _ref;
              drawPointFn(ctx, [x, y, opt.radius], opt);
            });
          }

          _this.coords[graph.name] = {
            graph,
            coords,
            drawPointFn,
            opt
          };
        };

        for (var i = 0; i < this.data.length; i++) {
          _loop(i);
        }
      }

      floatPoint() {
        var o = this.options;
        var ctx = this.ctx;
        var rect = this.canvas.getBoundingClientRect();
        var tooltip = false;
        if (!this.proxy.mouse) return;
        var {
          x,
          y
        } = this.proxy.mouse;
        var mx = x - rect.left;
        var my = y - rect.top;

        for (var name in this.coords) {
          var item = this.coords[name];
          var drawPointFn = item.drawPointFn;
          var opt = item.opt;

          for (var [px, py, _x, _y] of item.coords) {
            var accuracy = +(o.accuracy || opt.radius);
            var lx = px - accuracy,
                rx = px + accuracy;
            var ly = py - accuracy,
                ry = py + accuracy;

            if (mx > lx && mx < rx && my > ly && my < ry) {
              drawPointFn(ctx, [px, py, opt.radius * 2], {
                color: opt.color,
                fill: opt.fill
              });

              if (o.tooltip) {
                this.showTooltip([_x, _y], item.graph);
                tooltip = true;
              }

              break;
            }
          }

          if (!tooltip && this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
          }
        }
      }

      draw() {
        super.draw();
        this.calcRatio();
        this.axisXY();
        this.lines();
        this.floatPoint();
        this.cross();
        this.legend();
      }

    }
    Object.assign(LineChart.prototype, MixinCross);
    Object.assign(LineChart.prototype, MixinAxis);
    var lineChart = (el, data, options) => new LineChart(el, data, options);

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    }

    var defaultBarChartOptions = {
      groupDistance: 0,
      barDistance: 0,
      axis: _objectSpread2({}, defaultAxis),
      dataAxisX: false,
      labels: {
        font: labelFont,
        color: '#000'
      },
      onDrawLabel: null
    };

    var drawRect = (ctx, _ref, _ref2) => {
      var [x, y, w, h] = _ref;
      var {
        color = '#000',
        fill = '#fff',
        size = 1,
        dash = []
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash(dash);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      ctx.rect(x, y, w, h);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    };

    class BarChart extends Chart {
      constructor(el, data, options) {
        super(el, data, merge({}, defaultBarChartOptions, options), 'bar');
        this.groups = 0;
        this.barWidth = 0;
        this.maxY = 0;
        this.maxX = 0;
        this.minY = 0;
        this.minX = 0;
        this.viewAxis = this.options.dataAxisX ? this.viewHeight : this.viewWidth;
        this.legendItems = [];
        var legend = this.options.legend;

        if (legend && legend.titles && legend.titles.length) {
          for (var i = 0; i < legend.titles.length; i++) {
            this.legendItems.push([legend.titles[i], this.options.colors[i]]);
          }
        }

        this.calcMinMax();
        this.resize();
      }

      calcMinMax() {
        var o = this.options;
        var a = [],
            length = 0;

        for (var k in this.data) {
          var data = this.data[k].data;
          a = [].concat(a, data);
        }

        for (var _k in this.data) {
          length += this.data[_k].data.length;
          this.groups++;
        }

        var [, max] = minMaxLinear(a);
        this.maxX = this.maxY = o.boundaries && !isNaN(o.boundaries.max) ? o.boundaries.max : max;
      }

      calcRatio() {
        this.ratio = (this.options.dataAxisX ? this.viewWidth : this.viewHeight) / (this.maxY - this.minY);
      }

      calcBarWidth() {
        var o = this.options;
        var bars = 0;

        for (var g of this.data) {
          bars += g.data.length;
        }

        var availableSpace = (o.dataAxisX ? this.viewHeight : this.viewWidth) - (this.data.length + 1) * o.groupDistance // space between groups
        - (bars - this.data.length) * o.barDistance; // space between bars

        this.barWidth = availableSpace / bars;
      }

      barsY() {
        var o = this.options;
        var padding = expandPadding(o.padding);
        var ctx = this.ctx;
        var px = padding.left + o.groupDistance;
        var py = this.viewHeight + padding.top;
        var rect = this.canvas.getBoundingClientRect();
        var mx, my;
        var tooltip = false;

        if (this.proxy.mouse) {
          mx = this.proxy.mouse.x - rect.left;
          my = this.proxy.mouse.y - rect.top;
        }

        for (var g = 0; g < this.data.length; g++) {
          // let colors = graph.color.split(",").map( c => c.trim() )
          var graph = this.data[g];
          var data = graph.data;
          var labelColor = o.labels.color;
          var name = graph.name;
          var groupWidth = 0;

          for (var i = 0; i < data.length; i++) {
            var delta = data[i] * this.ratio;
            var color = data.length === 1 ? o.colors[g] : o.colors[i];
            var fill = color;
            drawRect(ctx, [px, py - delta, this.barWidth - 1, delta], {
              color,
              fill
            });

            if (mx > px && mx < px + this.barWidth - 1 && my > py - delta && my < py) {
              drawRect(ctx, [px, py - delta, this.barWidth - 1, delta], {
                color,
                fill: 'rgba(255,255,255,.3)'
              });

              if (o.tooltip) {
                this.showTooltip([o.legend.titles ? o.legend.titles[i] : name, data[i]], graph);
                tooltip = true;
              }
            }

            groupWidth += this.barWidth + o.barDistance;
            px += o.barDistance + this.barWidth;
          }

          px -= o.barDistance;
          groupWidth -= o.barDistance;

          if (typeof o.onDrawLabel === 'function') {
            name = o.onDrawLabel.apply(null, name);
          }

          drawText(ctx, name, [px - groupWidth / 2, py + 20], {
            align: 'center',
            color: labelColor,
            stroke: labelColor,
            font: o.font
          });
          px += o.groupDistance;
        }

        if (!tooltip && this.tooltip) {
          this.tooltip.remove();
          this.tooltip = null;
        }
      }

      barsX() {
        var o = this.options;
        var padding = expandPadding(o.padding);
        var ctx = this.ctx;
        var px, py;
        var rect = this.canvas.getBoundingClientRect();
        var mx, my;
        var tooltip = false;

        if (this.proxy.mouse) {
          mx = this.proxy.mouse.x - rect.left;
          my = this.proxy.mouse.y - rect.top;
        }

        px = padding.left;
        py = padding.top + o.groupDistance;

        for (var g = 0; g < this.data.length; g++) {
          // let colors = graph.color.split(",").map( c => c.trim() )
          var graph = this.data[g];
          var data = graph.data;
          var labelColor = o.labels.color;
          var name = graph.name;
          var groupWidth = 0;

          for (var i = 0; i < data.length; i++) {
            var delta = data[i] * this.ratio;
            var color = data.length === 1 ? o.colors[g] : o.colors[i];
            var fill = color;
            drawRect(ctx, [px, py, px + delta - padding.right, this.barWidth], {
              color,
              fill
            });

            if (mx > px && mx < px + delta && my > py && my < py + this.barWidth) {
              drawRect(ctx, [px, py, px + delta - padding.right, this.barWidth], {
                color,
                fill: 'rgba(255,255,255,.3)'
              });

              if (o.tooltip) {
                this.showTooltip([o.legend.titles ? o.legend.titles[i] : name, data[i]], graph);
                tooltip = true;
              }
            }

            groupWidth += this.barWidth + o.barDistance;
            py += o.barDistance + this.barWidth;
          }

          py -= o.barDistance;
          groupWidth -= o.barDistance;

          if (typeof o.onDrawLabel === 'function') {
            name = o.onDrawLabel.apply(null, name);
          }

          drawText(ctx, name, [0, 0], {
            align: 'center',
            color: labelColor,
            stroke: labelColor,
            font: o.font,
            angle: Math.PI / 2,
            translate: [px - 20, py - groupWidth / 2]
          });
          py += o.groupDistance;
        }

        if (!tooltip && this.tooltip) {
          this.tooltip.remove();
          this.tooltip = null;
        }
      }

      draw() {
        var o = this.options;
        super.draw();
        this.calcBarWidth();
        this.calcRatio();

        if (o.dataAxisX) {
          this.axisX();
          this.barsX();
        } else {
          this.axisY();
          this.barsY();
        }

        this.arrowY();
        this.arrowX();
        this.legend();
      }

    }
    Object.assign(BarChart.prototype, MixinAxis);
    var barChart = (el, data, options) => new BarChart(el, data, options);

    var defaultPieChartOptions = {
      other: {
        color: '#eaeaea'
      },
      labels: {
        font: labelFont,
        color: '#fff'
      },
      showValue: false,
      holeSize: 0,
      legend: {
        vertical: true
      },
      onDrawValue: null
    };

    var drawArc = (ctx, _ref, _ref2) => {
      var [x, y, radius = 4, startAngle, endAngle] = _ref;
      var {
        color = '#000',
        fill = '#fff',
        size = 1
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash([]);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.lineTo(x, y);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    };

    class PieChart extends Chart {
      constructor(el, data, options) {
        super(el, data, merge({}, defaultPieChartOptions, options), 'pie');
        this.center = [this.dpiWidth / 2, this.dpiHeight / 2];
        this.total = this.data.reduce((acc, curr) => acc + curr.data, 0);
        this.legendItems = [];

        if (this.options.legend && this.data.length) {
          for (var i = 0; i < this.data.length; i++) {
            this.legendItems.push([this.data[i].name, this.options.colors[i]]);
          }
        }

        this.resize();
      }

      sectors() {
        var ctx = this.ctx,
            o = this.options,
            padding = expandPadding(o.padding);
        var [x, y] = this.center;
        var radius = this.viewHeight > this.viewWidth ? this.viewWidth / 2 - (padding.left + padding.right) : this.viewHeight / 2 - (padding.top + padding.bottom);
        var startAngle = 0,
            endAngle = 360,
            offset = 0,
            val = '',
            textVal = '';
        var textX, textY;

        for (var i = 0; i < this.data.length; i++) {
          var sector = this.data[i];
          var color = o.colors[i];
          endAngle = 2 * Math.PI * sector.data / this.total;
          drawArc(ctx, [x, y, radius, startAngle, startAngle + endAngle], {
            fill: color,
            color: color
          });
          startAngle += endAngle;
        }

        if (o.holeSize) {
          drawCircle(ctx, [x, y, o.holeSize], {
            color: '#fff'
          });
        }

        startAngle = 0;

        for (var _i = 0; _i < this.data.length; _i++) {
          var _sector = this.data[_i],
              percent = void 0;
          endAngle = 2 * Math.PI * _sector.data / this.total;
          offset = o.holeSize / 2;
          percent = Math.round(_sector.data * 100 / this.total);
          textVal = o.showValue ? _sector.data : percent + "%";

          if (typeof o.onDrawValue === 'function') {
            textVal = o.onDrawValue.apply(null, [_sector.name, _sector.data, percent]);
          }

          textX = x + (radius / 2 + offset) * Math.cos(startAngle + endAngle / 2);
          textY = y + (radius / 2 + offset) * Math.sin(startAngle + endAngle / 2);
          var textW = getTextBoxWidth(ctx, [val + "%"], {
            font: o.labels.font
          });
          drawText(ctx, textVal, [textX - textW / 2, textY + o.labels.font.size / 2], {
            color: o.labels.color,
            font: o.labels.font
          });
          startAngle += endAngle;
        }
      }

      draw() {
        super.draw();
        this.sectors();
        this.legend();
      }

      resize() {
        super.resize();
        this.center = [this.dpiWidth / 2, this.dpiHeight / 2];
      }

    }
    var pieChart = (el, data, options) => new PieChart(el, data, options);

    var defaultBubbleChartOptions = {
      axis: defaultAxis,
      cross: defaultCross
    };

    class BubbleChart extends Chart {
      constructor(el, data, options) {
        super(el, data, merge({}, defaultBubbleChartOptions, options));
        this.coords = {};
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.minZ = 0;
        this.maxZ = 0;
        this.legendItems = [];
        var legend = this.options.legend;

        if (legend) {
          for (var i = 0; i < this.data.length; i++) {
            this.legendItems.push([this.data[i].name, this.options.colors[i]]);
          }
        }

        this.calcMinMax();
        this.resize();
      }

      calcMinMax() {
        var o = this.options;
        var a = [];

        for (var k in this.data) {
          var _data = this.data[k].data;
          if (!Array.isArray(_data)) continue;
          a.push(_data);
        }

        var [minX, maxX] = minMax(a, 'x');
        var [minY, maxY] = minMax(a, 'y');
        var [minZ, maxZ] = minMax(a, 'z');
        this.minX = o.boundaries && !isNaN(o.boundaries.minX) ? o.boundaries.minX : minX;
        this.maxX = o.boundaries && !isNaN(o.boundaries.maxX) ? o.boundaries.maxX : maxX;
        this.minY = o.boundaries && !isNaN(o.boundaries.minY) ? o.boundaries.minY : minY;
        this.maxY = o.boundaries && !isNaN(o.boundaries.maxY) ? o.boundaries.maxY : maxY;
        this.minZ = o.boundaries && !isNaN(o.boundaries.minZ) ? o.boundaries.minZ : minZ;
        this.maxZ = o.boundaries && !isNaN(o.boundaries.maxZ) ? o.boundaries.maxZ : maxZ;
      }

      calcRatio() {
        this.ratioX = this.viewWidth / (this.maxX - this.minX);
        this.ratioY = this.viewHeight / (this.maxY - this.minY);
        this.ratioZ = this.maxZ / (this.maxZ - this.minZ);
      }

      lines() {
        var o = this.options,
            padding = expandPadding(o.padding);
        var ctx = this.ctx;

        for (var i = 0; i < this.data.length; i++) {
          var graph = this.data[i];
          var color = o.colors[i];
          var [x, y, z] = graph.data;

          var _x = Math.floor((x - this.minX) * this.ratioX + padding.left);

          var _y = Math.floor(this.viewHeight + padding.top - (y - this.minY) * this.ratioY);

          var _z = Math.floor(z * this.ratioZ);

          drawCircle(ctx, [_x, _y, _z], {
            fill: color,
            color: color
          });
        }
      }

      floatPoint() {}

      draw() {
        super.draw();
        this.calcRatio();
        this.axisXY();
        this.lines();
        this.floatPoint();
        this.cross();
        this.legend();
      }

    }
    Object.assign(BubbleChart.prototype, MixinCross);
    Object.assign(BubbleChart.prototype, MixinAxis);

    globalThis.chart = {
      lineChart,
      barChart,
      pieChart
    };

}());
