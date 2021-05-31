import {Chart} from "../base"
import {defaultHistogramOptions} from "../../defaults/histogram"
import {minMax} from "../../helpers/min-max"
import {merge} from "../../helpers/merge"
import {expandPadding} from "../../helpers/expand-padding"
import {drawRect} from "../../draw/rect"
import {MixinCross} from "../../mixins/cross"
import {MixinAxis} from "../../mixins/axis"
import {MixinAddPoint} from "../../mixins/add-point";

export class HistogramChart extends Chart {
    constructor(el, data = [], options = {}) {
        super(el, data, merge({}, defaultHistogramOptions, options), 'histogram')

        this.coords = {}
        this.minX = 0
        this.maxX = 0
        this.minY = 0
        this.maxY = 0

        this.legendItems = []
        const legend = this.options.legend
        const bars = this.options.bars
        const colors = this.options.colors
        if (legend) {
            for (let i = 0; i < this.data.length; i++) {
                this.legendItems.push([bars[i].name, colors[i]])
            }
        }

        this.calcMinMax()
        this.resize()
    }

    calcMinMax(){
        const o = this.options
        let a = []

        for (let _data of this.data) {
            if (!Array.isArray(_data)) continue

            for( const [x1, x2, y] of _data) {
                a.push([x1, x2, y])
            }
        }

        const [minX1, maxX1] = minMax(a, 0);
        const [minX2, maxX2] = minMax(a, 1);
        const [minY, maxY]   = minMax(a, 2);

        this.minX = o.boundaries && !isNaN(o.boundaries.minX) ? o.boundaries.minX : Math.min(minX1, minX2)
        this.maxX = o.boundaries && !isNaN(o.boundaries.maxX) ? o.boundaries.maxX : Math.max(maxX1, maxX2)
        this.minY = o.boundaries && !isNaN(o.boundaries.minY) ? o.boundaries.minY : minY
        this.maxY = o.boundaries && !isNaN(o.boundaries.maxY) ? o.boundaries.maxY : maxY

        if (isNaN(this.minX)) this.minX = 0
        if (isNaN(this.maxX)) this.maxX = 100
        if (isNaN(this.minY)) this.minX = 0
        if (isNaN(this.maxY)) this.maxX = 100
    }

    calcRatio(){
        this.ratioX = this.viewWidth / (this.maxX === this.minX ? this.maxX : this.maxX - this.minX)
        this.ratioY = this.viewHeight / (this.maxY === this.minY ? this.maxY : this.maxY - this.minY)
    }

    bars(){
        const o = this.options, padding = expandPadding(o.padding)
        const ctx = this.ctx
        let bars

        if (!this.data || ! this.data.length) return

        for (let i = 0; i < this.data.length; i++) {
            const bar = o.bars[i]
            const data = this.data[i]
            const color = bar.color || o.colors[i] || "#000"
            const stroke = bar.stroke || '#fff'

            bars = []

            for (const [x1, x2, y] of data) {
                let _x = Math.floor((x1 - this.minX) * this.ratioX + padding.left)
                let _w = Math.floor((x2 - this.minX) * this.ratioX + padding.left) - _x
                let _h = (y - this.minY) * this.ratioY
                let _y = Math.floor(this.viewHeight + padding.top - _h)

                drawRect(ctx, [_x, _y, _w, _h], {fill: color, color: stroke})
            }
        }
    }

    add(index, [x1, x2, y], shift = false){
        this.addPoint(index, [x1, x2, y], shift)

        this.minX = this.data[index][0][0]
        this.maxX = x2

        if (y < this.minY) this.minY = y
        if (y > this.maxY) this.maxY = y

        this.resize()
    }

    draw(){
        super.draw()
        this.calcRatio()
        this.axisXY()
        this.bars()
        this.cross()
        this.legend()
    }
}

Object.assign(HistogramChart.prototype, MixinCross)
Object.assign(HistogramChart.prototype, MixinAxis)
Object.assign(HistogramChart.prototype, MixinAddPoint)

export const histogramChart = (el, data, options) => new HistogramChart(el, data, options)