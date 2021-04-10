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

    var defaultAxis = {
      lineColor: '#e3e3e3',
      labelColor: '#000',
      showXAxis: true,
      showYAxis: true,
      showXLines: true,
      showYLines: true,
      showXLabel: true,
      showYLabel: true,
      showMinMax: false,
      linesX: 5,
      linesY: 5,
      font: labelFont,
      arrowX: {
        color: '#000'
      },
      arrowY: {
        color: '#000'
      },
      onDrawLabelY: null,
      onDrawLabelX: null
    };

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
      color: '#fff'
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
        blur: 2,
        stretch: 0,
        color: '#bbb'
      },
      onShow: null
    };

    var defaultCross = {
      size: 1,
      color: '#bbb',
      dash: [5, 3]
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
      cross: defaultCross,
      showLines: true,
      axis: defaultAxis,
      title: defaultTitle,
      legend: defaultLegend,
      tooltip: defaultTooltip,
      boundaries: false,
      accuracy: 10,
      value: {
        fixed: 0
      },
      onClick: null,
      onHover: null,
      onEnter: null,
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
        font
      } = _ref2;
      var {
        style = 'normal',
        weight = 'normal',
        size = 12,
        lineHeight = 1,
        family = 'sans-serif'
      } = font;
      ctx.save();
      ctx.beginPath();
      ctx.textAlign = align;
      ctx.fillStyle = color;
      ctx.strokeStyle = stroke;
      ctx.font = "".concat(style, " ").concat(weight, " ").concat(size, "px/").concat(lineHeight, " ").concat(family);
      var lines = text.split('\n');
      lines.map((str, i) => {
        ctx.fillText(str, x, y + y * i * lineHeight);
      });
      ctx.closePath();
      ctx.restore();
    };

    var drawSquare = (ctx, _ref, _ref2) => {
      var [x, y] = _ref;
      var {
        color = '#000',
        fill = '#fff',
        radius = 4,
        size = 1,
        dash = []
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash(dash);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      ctx.rect(x - radius, y - radius, radius * 2, radius * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    };

    var getTextboxWidth = (ctx, items, _ref) => {
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

    var drawTextBox = (ctx, _ref, _ref2) => {
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

    class Chart {
      constructor(el, data) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'unknown';
        this.options = merge({}, defaultOptions, options);
        this.data = data;
        this.el = document.querySelector(el);
        this.canvas = null;
        this.ctx = null;
        this.raf = null;
        this.tooltip = null;
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.legendItems = [];
        this.chartType = type;
        var that = this;
        this.proxy = new Proxy({}, {
          set() {
            var result = Reflect.set(...arguments);
            that.raf = requestAnimationFrame(that.draw.bind(that));
            return result;
          }

        });

        if (!this.el) {
          throw new Error("You must define a selector for chart wrapper element!");
        }

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
        this.el.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();
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
        var o = this.options;
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
        this.viewHeight = this.dpiHeight - (o.padding.top + o.padding.bottom);
        this.viewWidth = this.dpiWidth - (o.padding.left + o.padding.right);
      }

      calcRatio() {
        this.ratioX = this.viewWidth / (this.maxX - this.minX);
        this.ratioY = this.viewHeight / (this.maxY - this.minY);
      }

      drawArrowX() {
        var o = this.options,
            ctx = this.ctx;
        var top = o.padding.top,
            left = o.padding.left;
        var x = this.viewWidth + left,
            y = this.viewHeight + top;
        ctx.beginPath();
        ctx.strokeStyle = o.axis.arrowX.color;
        ctx.moveTo(left, y);
        ctx.lineTo(x, y);
        ctx.moveTo(x, y);
        ctx.lineTo(x - 15, y - 5);
        ctx.moveTo(x, y);
        ctx.lineTo(x - 15, y + 5);
        ctx.stroke();
        ctx.closePath();
      }

      drawArrowY() {
        var o = this.options,
            ctx = this.ctx;
        var top = o.padding.top,
            left = o.padding.left;
        var x = left,
            y = this.viewHeight + top;
        ctx.beginPath();
        ctx.strokeStyle = o.axis.arrowY.color;
        ctx.moveTo(x, top);
        ctx.lineTo(x, y);
        ctx.moveTo(x, top);
        ctx.lineTo(x - 5, top + 15);
        ctx.moveTo(x, top);
        ctx.lineTo(x + 5, top + 15);
        ctx.stroke();
        ctx.closePath();
      }

      drawAxisY() {
        var o = this.options,
            {
          fixed = 0
        } = o.value.fixed;
        var step = this.viewHeight / o.axis.linesY;
        var textStep = (this.maxY - this.minY) / o.axis.linesY;
        var ctx = this.ctx;
        ctx.strokeStyle = o.axis.lineColor;
        ctx.textAlign = 'end';
        ctx.beginPath();

        for (var i = 0; i <= o.axis.linesY; i++) {
          var y = step * i + o.padding.top;
          var x = this.viewWidth + o.padding.left;
          var printY = this.maxY - textStep * i;

          if (typeof o.axis.onDrawLabelY === "function") {
            printY = o.axis.onDrawLabelY.apply(null, [printY]);
          }

          printY = printY.toFixed(fixed);

          if (o.axis.showYLines) {
            ctx.moveTo(o.padding.left, y);
            ctx.lineTo(x, y);
          }

          if (o.axis.showYLabel) {
            if (o.axis.showMinMax) {
              if (i === 0 || i === o.axis.linesY) ctx.fillText(printY.toString(), o.padding.left - 5, y - 5);
            } else {
              if (i !== 0) ctx.fillText(printY.toString(), o.padding.left - 5, y - 5);
            }
          }
        }

        ctx.stroke();
        ctx.closePath();
      }

      drawAxisX() {
        var _ref;

        var o = this.options;
        var step = this.viewWidth / o.axis.linesX;
        var textStep = (this.maxX - this.minX) / o.axis.linesX;
        var ctx = this.ctx;
        var font = (_ref = o.axis && o.axis.font) !== null && _ref !== void 0 ? _ref : o.font;
        ctx.strokeStyle = o.axis.lineColor;
        ctx.textAlign = 'start';
        ctx.beginPath();

        for (var i = 0; i <= o.axis.linesX; i++) {
          var x = step * i + o.padding.left;
          var printX = this.minX + textStep * i;

          if (typeof o.axis.onDrawLabelX === "function") {
            printX = o.axis.onDrawLabelX.apply(null, [printX]);
          }

          if (o.axis.showXLines) {
            ctx.moveTo(x, o.padding.top);
            ctx.lineTo(x, this.viewHeight + o.padding.top);
          }

          if (i < o.axis.linesX && o.axis.showXLabel) ctx.fillText(printX.toString(), x, this.viewHeight + o.padding.top + font.size + 5);
        }

        ctx.stroke();
        ctx.closePath();
      }

      drawAxis() {
        var _o$axis$font;

        var o = this.options;
        var ctx = this.ctx;
        if (!o.axis) return;
        var font = (_o$axis$font = o.axis.font) !== null && _o$axis$font !== void 0 ? _o$axis$font : o.font;
        ctx.font = "".concat(font.style, " ").concat(font.weight, " ").concat(font.size, "px ").concat(font.family);
        ctx.fillStyle = o.axis.labelColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        if (o.axis.showYAxis && o.axis.linesY) this.drawAxisY();
        if (o.axis.arrowY) this.drawArrowY();
        if (o.axis.showXAxis && o.axis.linesX) this.drawAxisX();
        if (o.axis.arrowX) this.drawArrowX();
        return this;
      }

      drawCross() {
        var o = this.options,
            cross = o.cross;
        var ctx = this.ctx;
        var rect = this.canvas.getBoundingClientRect();
        if (!o.cross || o.cross && !this.proxy.mouse) return;
        var {
          x,
          y
        } = this.proxy.mouse;
        x -= rect.left;
        y -= rect.top;
        if (x - o.padding.left + 1 < 0 || x > this.viewWidth + o.padding.left + 1) return;
        if (y - o.padding.top + 1 < 0 || y > this.viewHeight + o.padding.top + 1) return;
        ctx.beginPath();
        ctx.setLineDash(o.cross.dash);
        ctx.lineWidth = cross.size;
        ctx.strokeStyle = cross.color; // vertical line

        ctx.moveTo(x, o.padding.top);
        ctx.lineTo(x, this.viewHeight + o.padding.top); // Horizontal line

        ctx.moveTo(o.padding.left, y);
        ctx.lineTo(this.viewWidth + o.padding.left, y);
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
      }

      drawTitle() {
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
        return this;
      }

      drawLegend() {
        var o = this.options,
            legend = o.legend;
        var lh,
            x,
            y,
            magic = 5,
            box = o.legend.font.size / 2;
        var ctx = this.ctx;
        var items = this.legendItems;
        if (!legend || !isObject(legend)) return;
        if (!items || !Array.isArray(items) || !items.length) return;
        lh = legend.font.size * legend.font.lineHeight;
        y = o.padding.top + this.viewHeight + legend.font.size + legend.padding.top + legend.margin.top;
        x = o.padding.left + legend.padding.left + legend.margin.left;

        for (var i = 0; i < items.length; i++) {
          var [name, color] = items[i];
          var nameWidth = ctx.measureText(name).width;

          if (x + nameWidth > this.viewWidth) {
            x = o.padding.left + legend.padding.left + legend.margin.left;
            y += lh;
          }

          drawSquare(ctx, [x, y], {
            color,
            fill: color,
            radius: box
          });
          drawText(ctx, name, [x + box + magic, y + box / 2], {
            color: o.font.color,
            stroke: o.font.color,
            font: o.font
          });
          x += box + nameWidth + 20;
        }

        return this;
      }

      drawLegendVertical() {
        var o = this.options,
            legend = o.legend;
        var lh,
            x,
            y,
            magic = 5;
            15 * o.dpi;
            var box = o.legend.font.size / 2;
        var ctx = this.ctx;
        var items = this.legendItems;
        var textBoxWidth, textBoxHeight;
        if (!legend || !isObject(legend)) return;
        if (!items || !Array.isArray(items) || !items.length) return;
        lh = legend.font.size * legend.font.lineHeight;
        y = o.padding.top + legend.font.size + legend.padding.top + legend.margin.top;
        x = o.padding.left + legend.padding.left + legend.margin.left;
        textBoxWidth = getTextboxWidth(ctx, items, legend.font) + box * 2 + magic + legend.padding.left + legend.padding.right;
        textBoxHeight = items.length * lh + legend.padding.top + legend.padding.bottom;
        drawTextBox(ctx, [x - box - legend.padding.left, y - box - legend.padding.top, textBoxWidth, textBoxHeight], {
          color: legend.color,
          dash: legend.dash,
          size: legend.border.width,
          borderColor: legend.border.color
        });

        for (var i = 0; i < items.length; i++) {
          var [name, color] = items[i];
          drawSquare(ctx, [x, y], {
            color,
            fill: color,
            radius: box
          });
          drawText(ctx, name, [x + box + magic, y + box / 2 + 2], {
            color: o.font.color,
            stroke: o.font.color,
            font: o.font
          });
          y += lh;
        }

        return this;
      }

      draw() {
        this.clear();
        this.calcRatio();
        this.drawTitle();
        this.drawAxis();
      }

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
        var onShow = o.tooltip.onShow;
        var font = o.tooltip.font;
        var shadow = o.tooltip.shadow;
        var border = o.tooltip.border;
        var padding = o.tooltip.padding;
        tooltip.style.position = 'fixed';
        tooltip.style.border = "".concat(border.width, "px ").concat(border.lineType, " ").concat(border.color);
        tooltip.style.borderRadius = "".concat(border.radius);
        tooltip.style.padding = "".concat(padding.top, "px ").concat(padding.right, "px ").concat(padding.bottom, "px ").concat(padding.left, "px");
        tooltip.style.background = "".concat(o.tooltip.background);
        tooltip.style.font = "".concat(font.style, " ").concat(font.weight, " ").concat(font.size, "px/").concat(font.lineHeight, " ").concat(font.family);
        tooltip.style.boxShadow = "".concat(shadow.shiftX, "px ").concat(shadow.shiftY, "px ").concat(shadow.blur, "px ").concat(shadow.color);
        tooltip.innerHTML = onShow && typeof onShow === 'function' ? onShow.apply(null, [data, graph]) : data;
        document.querySelector('body').appendChild(tooltip);
        tooltip.style.top = "".concat(y - tooltip.clientHeight - 5, "px");
        tooltip.style.left = "".concat(x - tooltip.clientWidth / 2 - 5, "px");
        this.tooltip = tooltip;
      }

      clear() {
        this.ctx.clearRect(0, 0, this.dpiWidth, this.dpiHeight);
      }

      mouseMove(e) {
        var onHover = this.options.onHover;
        var {
          clientX: x,
          clientY: y
        } = e;
        if (typeof onHover === "function") onHover(x, y);
        this.proxy.mouse = {
          x: x,
          y: y
        };
      }

      mouseLeave() {
        var fn = this.options.onLeave;
        if (typeof fn === "function") fn();
        this.proxy.mouse = null;
      }

      resize() {
        this.calcInternalValues();
        this.setCanvasSize();
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

    var minMax = function minMax() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var by = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';
      var min, max, v;

      for (var _ of data) {
        v = by.toLowerCase() === 'x' ? _[0] : _[1];
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
      var [x, y] = _ref;
      var {
        color = '#000',
        fill = '#fff',
        radius = 4,
        size = 1
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash([]);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
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
      var [x, y] = _ref;
      var {
        color = '#000',
        fill = '#fff',
        radius = 4,
        size = 1
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash([]);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      var d = radius;
      ctx.moveTo(x, y - d);
      ctx.lineTo(x + d, y + d);
      ctx.lineTo(x - d, y + d);
      ctx.lineTo(x, y - d);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    };

    var drawDiamond = (ctx, _ref, _ref2) => {
      var [x, y] = _ref;
      var {
        color = '#000',
        fill = '#fff',
        radius = 1,
        size = 1
      } = _ref2;
      ctx.beginPath();
      ctx.save();
      ctx.setLineDash([]);
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.fillStyle = fill;
      var r = radius;
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

    var defaultLineChartOptions = {};

    class LineChart extends Chart {
      constructor(el) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        super(el, data, merge({}, defaultLineChartOptions, options), 'line');
        this.coords = {};
        this.legendItems = [];
        var legend = this.options.legend;

        if (legend) {
          for (var graph of this.data) {
            this.legendItems.push([graph.name, graph.color]);
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

      drawData() {
        var _this = this;

        var o = this.options;
        var ctx = this.ctx;
        var coords;

        var _loop = function _loop(graph) {
          var _dots$color, _dots$fill;

          coords = [];

          for (var [x, y] of graph.data) {
            var _x = Math.floor((x - _this.minX) * _this.ratioX + o.padding.left);

            var _y = Math.floor(_this.viewHeight + o.padding.top - (y - _this.minY) * _this.ratioY);

            coords.push([_x, _y, x, y]);
          }

          if (o.showLines && graph.showLines !== false) {
            drawLine(ctx, coords, {
              color: graph.color,
              size: graph.size
            });
          }

          var dots = graph.dots ? graph.dots : {
            type: 'dot' // dot, square, triangle

          };
          var opt = {
            color: (_dots$color = dots.color) !== null && _dots$color !== void 0 ? _dots$color : graph.color,
            fill: (_dots$fill = dots.fill) !== null && _dots$fill !== void 0 ? _dots$fill : graph.color,
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
              // console.log(x, y)
              drawPointFn(ctx, [x, y], opt);
            });
          }

          _this.coords[graph.name] = {
            graph,
            coords,
            drawPointFn,
            opt
          };
        };

        for (var graph of this.data) {
          _loop(graph);
        }
      }

      drawFloatPoint() {
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
              drawPointFn(ctx, [px, py], {
                color: opt.color,
                radius: opt.radius * 2,
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

      drawLegend() {
        return this.options.legend.vertical === true ? super.drawLegendVertical() : super.drawLegend();
      }

      draw() {
        super.draw();
        this.drawData();
        this.drawFloatPoint();
        this.drawCross();
        this.drawLegend();
      }

    }
    var lineChart = (el, data, options) => new LineChart(el, data, options);

    var defaultBarChartOptions = {
      groupDistance: 20,
      barDistance: 10,
      legend: {
        titles: null
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
        this.legendItems = [];
        var legend = this.options.legend;

        if (legend && legend.titles && legend.titles.length) {
          for (var i = 0; i < legend.titles.length; i++) {
            this.legendItems.push([legend.titles[i], this.data[0].color.split(",").map(c => c.trim())[i]]);
          }
        }

        this.calcMinMax();
        this.resize();
      }

      calcMinMax() {
        var o = this.options,
            {
          fixed = 0
        } = o.value;
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

        var [, maxY] = minMaxLinear(a);
        this.maxY = (o.boundaries && !isNaN(o.boundaries.maxY) ? o.boundaries.maxY : maxY).toFixed(fixed);
        return this;
      }

      calcBarWidth() {
        var o = this.options;
        var bars = 0,
            magic = 5;

        for (var graph of this.data) {
          bars += graph.data.length;
        }

        this.barWidth = Math.round((this.viewWidth - this.data.length * +o.groupDistance - bars * +o.barDistance) / bars) - magic;
      }

      drawAxisX() {}

      drawData() {
        var o = this.options;
        var ctx = this.ctx;
        var px = o.padding.left + o.groupDistance;
        var py = this.viewHeight + o.padding.top;
        var rect = this.canvas.getBoundingClientRect();
        var mx, my;
        var tooltip = false;

        if (this.proxy.mouse) {
          mx = this.proxy.mouse.x - rect.left;
          my = this.proxy.mouse.y - rect.top;
        }

        for (var graph of this.data) {
          var colors = graph.color.split(",").map(c => c.trim());
          var name = graph.name;
          var data = graph.data;
          var labelColor = colors.length > 1 ? o.color : colors[0];
          var barsWidth = 0;

          for (var i = 0; i < data.length; i++) {
            var delta = data[i] * this.ratioY;
            var color = colors[i];
            var fill = colors[i];
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

            barsWidth += this.barWidth;
            px += o.barDistance + this.barWidth;
          }

          if (typeof o.onDrawLabel === 'function') {
            name = o.onDrawLabel.apply(null, name);
          }

          drawText(ctx, name, [px - barsWidth / 2 - o.barDistance, py + 20], {
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

        return this;
      }

      drawLegend() {
        return this.options.legend.vertical === true ? super.drawLegendVertical() : super.drawLegend();
      }

      draw() {
        this.calcBarWidth();
        super.draw();
        this.drawData();
        this.drawCross();
        this.drawLegend();
      }

    }
    var barChart = (el, data, options) => new BarChart(el, data, options);

    var defaultPieChartOptions = {
      axis: {
        showXLabel: false,
        showYLabel: false
      }
    };

    class PieChart extends Chart {
      constructor(el, data, options) {
        super(el, data, merge({}, defaultPieChartOptions, options), 'pie');
        this.resize();
      }

      drawData() {}

      drawLegend() {
        return this.options.legend.vertical === true ? super.drawLegendVertical() : super.drawLegend();
      } // drawAxisX() {}
      // drawAxisY() {}


      drawCross() {}

      drawArrowX() {}

      drawArrowY() {}

      draw() {
        super.draw();
        this.drawData();
        this.drawLegend();
      }

    }
    var pieChart = (el, data, options) => new PieChart(el, data, options);

    globalThis.chart = {
      lineChart,
      barChart,
      pieChart
    };

}());
