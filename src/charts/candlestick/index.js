import {Chart} from "../base"
import {merge} from "../../helpers/merge"
import {defaultCandlestickOptions} from "../../defaults/сandlestick"
import {minMax} from "../../helpers/min-max"
import {MixinAxis} from "../../mixins/axis"
import {drawCandle} from "../../draw/candle"
import {expandPadding} from "../../helpers/expand-padding";
import {drawVector} from "../../draw/vector";
import {drawText} from "../../draw/text";
import {drawRect} from "../../draw/rect";
import {MixinTooltip} from "../../mixins/tooltip";
import {MixinArrows} from "../../mixins/arrows";

export class CandlestickChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultCandlestickOptions, options), 'candlesticks')

        this.minY = 0
        this.maxY = 0
        this.labels = []
        this.coords = []

        this.calcMinMax()
        this.resize()
    }

    calcMinMax(){
        const o = this.options
        let a = []

        this.labels.length = 0

        for (let k in this.data) {
            const [x, hi, low] = this.data[k]
            a.push([0, hi])
            a.push([0, low])
            this.labels.push(x)
        }

        const [minY, maxY] = minMax(a, 'y')

        this.minY = o.boundaries && !isNaN(o.boundaries.minY) ? o.boundaries.minY : minY
        this.maxY = o.boundaries && !isNaN(o.boundaries.maxY) ? o.boundaries.maxY : maxY
    }

    calcRatio(){
        this.ratioY = this.viewHeight / (this.maxY === this.minY ? this.maxY : this.maxY - this.minY)
    }

    getCandleSize(){
        const candle = this.options.candle
        const dataLength = this.data.length

        return candle.width === 'auto'
            ? (this.viewWidth - (candle.distance * 2) - (candle.distance * (dataLength - 1))) / dataLength
            : candle.width
    }

    candlesticks(){
        // data [x, hi, low, open, close]
        const ctx = this.ctx, o = this.options, candle = o.candle, ghost = o.ghost
        const padding = expandPadding(o.padding)
        const dataLength = this.data.length
        const rect = this.canvas.getBoundingClientRect()
        let candleSize = this.getCandleSize()
        let mx, my, px, py, tooltip = false

        if (this.proxy.mouse) {
            mx = this.proxy.mouse.x - rect.left
            my = this.proxy.mouse.y - rect.top
        }

        let x = padding.left + candleSize / 2 + candle.distance
        this.coords.length = 0

        for(let i = 0; i < dataLength; i++) {
            let y, y2, o1, c1, [xv, hi, low, open, close] = this.data[i]
            const whiteCandle = close > open
            let candleColor = whiteCandle ? candle.white : candle.black
            let bx1 = x - candleSize / 2 - candle.distance / 2, bx2 = x + candleSize / 2 + candle.distance / 2

            y = padding.top + this.viewHeight - (hi - this.minY) * this.ratioY
            y2 = padding.top + this.viewHeight - (low - this.minY) * this.ratioY
            o1 = padding.top + this.viewHeight - (open - this.minY) * this.ratioY
            c1 = padding.top + this.viewHeight - (close - this.minY) * this.ratioY

            if (mx >= bx1 && mx <= bx2) {
                drawRect(
                    ctx,
                    [bx1, padding.top, candleSize + candle.distance, this.viewHeight],
                    {
                        color: ghost.stroke,
                        fill: ghost.fill
                    }
                )
            }

            drawCandle(ctx, [x, y, y2 - y, o1, candleSize, c1 - o1], {color: candleColor, size: candle.size, leg: candle.leg})

            if ((mx >= bx1 && mx <= bx2) && (my >= y && my <= y2)) {
                if (o.tooltip) {
                    this.showTooltip(this.data[i], {
                        type: whiteCandle
                    })
                    tooltip = true
                }
            }

            this.coords.push(x)

            x += candleSize + candle.distance
        }

        if (!tooltip && this.tooltip) {
            this.tooltip.remove()
            this.tooltip = null
        }
    }

    axis(){
        // draw default axis Y
        this.axisY()

        // draw axis X
        const ctx = this.ctx, o = this.options, candle = o.candle
        const padding = expandPadding(o.padding)

        const axis = o.axis.x, label = axis.label, line = axis.line, arrow = axis.arrow
        const font = (label && label.font) ?? o.font
        let shortLineSize = line.shortLineSize ?? 0
        const candleSize = this.getCandleSize()
        let x = padding.left + candleSize / 2 + candle.distance, y = padding.top + this.viewHeight
        let k = 0

        for (let i = 0; i < this.labels.length; i++) {
            let value = this.labels[i]
            let labelValue = value

            if (typeof o.onDrawLabelX === "function") {
                labelValue = o.onDrawLabelX.apply(null, [value])
            }

            if (i !== 0 && label.skip && k !== label.skip) {
                k++
            } else {
                k = 1
                // short line
                drawVector(
                    ctx,
                    [x, y - shortLineSize, x, y + shortLineSize],
                    {
                        color: (arrow && arrow.color) ? arrow.color : line.color,
                    }
                )

                // label
                drawText(
                    ctx,
                    labelValue.toString(),
                    [0, 0],
                    {
                        color: label.color ?? o.color,
                        align: label.align,
                        font,
                        translate: [x + (label.shift.x ?? 0), y + font.size + 5 + (label.shift.y ?? 0)],
                        angle: label.angle
                    }
                )
            }

            x += candleSize + candle.distance
        }
    }

    add([x, hi, low, open, close], shift = false){
        const o = this.options
        let data

        if (!this.data) {
            this.data = []
        }

        data = this.data

        if (shift && data.length) {
            if (!o.graphSize) {
                data = data.slice(1)
            } else {
                if (data.length >= o.graphSize) {
                    data = data.slice(1)
                }
            }
        }

        this.data = data
        this.data.push([x, hi, low, open, close])

        this.calcMinMax()
        this.resize()
    }

    draw(){
        super.draw()
        this.calcRatio()
        this.axis()
        this.arrows()
        this.candlesticks()
    }
}

Object.assign(CandlestickChart.prototype, MixinAxis)
Object.assign(CandlestickChart.prototype, MixinTooltip)
Object.assign(CandlestickChart.prototype, MixinArrows)

export const candlestickChart = (el, data, options) => new CandlestickChart(el, data, options)