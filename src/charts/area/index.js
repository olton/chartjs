import {defaultAreaChartOptions} from "../../defaults/area"
import {Chart} from "../base"
import {minMax} from "../../helpers/min-max"
import {drawCircle} from "../../draw/circle"
import {drawSquare} from "../../draw/square"
import {drawTriangle} from "../../draw/triangle"
import {drawDiamond} from "../../draw/diamond"
import {merge} from "../../helpers/merge"
import {expandPadding} from "../../helpers/expand-padding"
import {drawArea} from "../../draw/area";

import {MixinCross} from "../../mixins/cross"
import {MixinAxis} from "../../mixins/axis"
import {MixinAddPoint} from "../../mixins/add-point";
import {drawLine} from "../../draw/line";
import {MixinArrows} from "../../mixins/arrows";

export class AreaChart extends Chart {
    constructor(el, data = [], options = {}) {
        super(el, data, merge({}, defaultAreaChartOptions, options), 'area')

        this.coords = {}
        this.minX = 0
        this.maxX = 0
        this.minY = 0
        this.maxY = 0

        this.legendItems = []
        const legend = this.options.legend
        const areas = this.options.areas
        const colors = this.options.colors
        if (legend) {
            for (let i = 0; i < this.data.length; i++) {
                this.legendItems.push([areas[i].name, colors[i]])
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

            for( const [x, y] of _data) {
                a.push([x, y])
            }
        }

        const [minX, maxX] = minMax(a, 'x');
        const [minY, maxY] = minMax(a, 'y');

        this.minX = o.boundaries && !isNaN(o.boundaries.minX) ? o.boundaries.minX : minX
        this.maxX = o.boundaries && !isNaN(o.boundaries.maxX) ? o.boundaries.maxX : maxX
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

    areas(){
        const o = this.options, padding = expandPadding(o.padding)
        const ctx = this.ctx
        let coords

        if (!this.data || !this.data.length) return

        for (let i = 0; i < this.data.length; i++) {
            const area = o.areas[i]
            const data = this.data[i]
            const color = area.color ?? o.colors[i]
            const fill = area.fill ?? color

            coords = []

            coords.push([padding.left, this.viewHeight + padding.top, 0, 0])

            for (const [x, y] of data) {
                let _x = Math.floor((x - this.minX) * this.ratioX + padding.left)
                let _y = Math.floor(this.viewHeight + padding.top - (y - this.minY) * this.ratioY)

                coords.push([_x, _y, x, y])
            }

            coords.push([coords[coords.length - 1][0], this.viewHeight + padding.top, 0, 0])

            drawArea(ctx, coords, {color, fill, size: area.size})

            let dots = area.dots ? area.dots : {
                type: 'dot', // dot, square, triangle
            }
            let opt = {
                color: dots.color ?? color,
                fill: dots.fill ?? color,
                radius: dots.size ?? 4
            }

            let drawPointFn

            switch (dots.type) {
                case 'square':
                    drawPointFn = drawSquare
                    break
                case 'triangle':
                    drawPointFn = drawTriangle
                    break
                case 'diamond':
                    drawPointFn = drawDiamond
                    break
                default: drawPointFn = drawCircle
            }

            if (area.dots && o.showDots !== false) {
                coords.map(([x, y]) => {
                    drawPointFn(ctx, [x, y, opt.radius], opt)
                })
            }

            this.coords[area.name] = {
                area,
                coords,
                drawPointFn,
                opt
            }

            coords.shift()
            coords.pop()

            if (area.showLines !== false) {
                drawLine(ctx, coords, {color, fill, size: area.size})
            }
        }
    }

    floatPoint(){
        const o = this.options
        const ctx = this.ctx
        const rect = this.canvas.getBoundingClientRect()
        let tooltip = false

        if (!this.data || !this.data.length) return
        if (!this.proxy.mouse) return

        let {x, y} = this.proxy.mouse

        const mx = x - rect.left
        const my = y - rect.top

        for (const name in this.coords) {
            const item = this.coords[name]
            const drawPointFn = item.drawPointFn
            const opt = item.opt

            for (const [px, py, _x, _y] of item.coords) {
                const accuracy = +(o.accuracy || opt.radius)
                const lx = px - accuracy, rx = px + accuracy
                const ly = py - accuracy, ry = py + accuracy

                if ((mx > lx && mx < rx) && (o.hoverMode !== 'default')) {
                    drawPointFn(ctx, [px, py, opt.radius], {color: opt.color, fill: opt.fill})
                }

                if ((mx > lx && mx < rx) && (my > ly && my < ry)) {
                    if (o.hoverMode === 'default') drawPointFn(ctx, [px, py, opt.radius * 2], {color: opt.color, fill: opt.fill})
                    if ( o.tooltip ) {
                        this.showTooltip([_x, _y], item.graph)
                        tooltip = true
                    }
                    break
                }
            }

            if (!tooltip && this.tooltip) {
                this.tooltip.remove()
                this.tooltip = null
            }
        }
    }

    add(index, [x, y], shift){
        this.addPoint(index, [x, y], shift)

        this.minX = this.data[index][0][0]
        this.maxX = x

        if (y < this.minY) this.minY = y
        if (y > this.maxY) this.maxY = y

        this.resize()
    }

    draw(){
        super.draw()
        this.calcRatio()
        this.axisXY()
        this.arrows()
        this.areas()
        this.floatPoint()
        this.cross()
        this.legend()
    }
}

Object.assign(AreaChart.prototype, MixinCross)
Object.assign(AreaChart.prototype, MixinAxis)
Object.assign(AreaChart.prototype, MixinAddPoint)
Object.assign(AreaChart.prototype, MixinArrows)

export const areaChart = (el, data, options) => new AreaChart(el, data, options)