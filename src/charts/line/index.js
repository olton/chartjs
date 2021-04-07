import {Chart} from "../../core"
import {minMax} from "../../helpers/min-max"
import {circle} from "../../draw/circle"
import {lineTo} from "../../draw/line"
import {square} from "../../draw/square"
import {triangle} from "../../draw/triangle"
import {diamond} from "../../draw/diamond"
import {defaultLineChartOptions} from "../../defaults/line-chart"
import {merge} from "../../helpers/merge"

export class LineChart extends Chart {
    constructor(el, data = [], options = {}) {
        super(el, data, merge({}, defaultLineChartOptions, options))

        this.calcMinMax()
        this.draw()
    }

    calcMinMax(){
        const o = this.options
        let a = []

        for (let k in this.data) {
            let _data = this.data[k].data

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

        this.ratioX = this.viewWidth / (this.maxX - this.minX)
        this.ratioY = this.viewHeight / (this.maxY - this.minY)

        return this
    }

    drawData(){
        const o = this.options
        const ctx = this.ctx
        let coords

        for (const line of this.data) {

            coords = []

            for (const [x, y] of line.data) {
                let _x = Math.floor((x - this.minX) * this.ratioX + o.padding.left)
                let _y = Math.floor(this.viewHeight + o.padding.top - (y - this.minY) * this.ratioY)

                coords.push([_x, _y, x, y])
            }

            if (o.showLines) {
                lineTo(ctx, coords, {color: line.color, size: line.size})
            }

            let dots = line.dots ? line.dots : {
                type: 'dot', // dot, square, triangle
            }
            let opt = {
                color: dots.color ?? line.color,
                fill: dots.fill ?? line.color,
                radius: dots.size || 4,
            }

            let drawPointFn

            switch (dots.type) {
                case 'square':
                    drawPointFn = square
                    break
                case 'triangle':
                    drawPointFn = triangle
                    break
                case 'diamond':
                    drawPointFn = diamond
                    break
                default: drawPointFn = circle
            }

            if (line.dots) {
                coords.map(([x, y]) => {
                    // console.log(x, y)
                    drawPointFn(ctx, [x, y], opt)
                })
            }

            this.coords[line.name] = {
                line,
                coords,
                drawPointFn,
                opt
            }
        }
    }

    drawFloatPoint(){
        const o = this.options
        const ctx = this.ctx
        const rect = this.canvas.getBoundingClientRect()
        let tooltip = false

        if (!this.proxy.mouse) return

        for (const name in this.coords) {
            const item = this.coords[name]
            const drawPointFn = item.drawPointFn
            const opt = item.opt

            let {x, y} = this.proxy.mouse

            const mx = x - rect.left
            const my = y - rect.top

            for (const [px, py, _x, _y] of item.coords) {
                const accuracy = +(o.accuracy || opt.radius)
                const lx = px - accuracy, rx = px + accuracy
                const ly = py - accuracy, ry = py + accuracy

                if ((mx > lx && mx < rx) && (my > ly && my < ry)) {
                    drawPointFn(ctx, [px, py], {color: opt.color, radius: opt.radius * 2, fill: opt.fill})
                    this.showTooltip([_x, _y])
                    tooltip = true
                    break
                }
            }

            if (!tooltip && this.tooltip) {
                this.tooltip.remove()
                this.tooltip = null
            }
        }
    }

    draw(){
        this.calcMinMax()

        super.draw()

        this.drawData()
        this.drawCross()
        this.drawFloatPoint()
    }
}

export const lineChart = (el, data, options) => new LineChart(el, data, options)