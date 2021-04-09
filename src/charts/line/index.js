import {Chart} from "../base"
import {minMax} from "../../helpers/min-max"
import {drawCircle} from "../../draw/circle"
import {drawLine} from "../../draw/line"
import {drawSquare} from "../../draw/square"
import {drawTriangle} from "../../draw/triangle"
import {drawDiamond} from "../../draw/diamond"
import {defaultLineChartOptions} from "../../defaults/line-chart"
import {isObject, merge} from "../../helpers/merge"
import {drawText} from "../../draw/text";

export class LineChart extends Chart {
    constructor(el, data = [], options = {}) {
        super(el, data, merge({}, defaultLineChartOptions, options))

        this.coords = {}

        this.legendItems = []
        const legend = this.options.legend
        if (legend) {
            for (const graph of this.data) {
                this.legendItems.push([graph.name, graph.color])
            }
        }

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

        return this
    }

    drawData(){
        const o = this.options
        const ctx = this.ctx
        let coords

        for (const graph of this.data) {

            coords = []

            for (const [x, y] of graph.data) {
                let _x = Math.floor((x - this.minX) * this.ratioX + o.padding.left)
                let _y = Math.floor(this.viewHeight + o.padding.top - (y - this.minY) * this.ratioY)

                coords.push([_x, _y, x, y])
            }

            if (o.showLines && graph.showLines !== false) {
                drawLine(ctx, coords, {color: graph.color, size: graph.size})
            }

            let dots = graph.dots ? graph.dots : {
                type: 'dot', // dot, square, triangle
            }
            let opt = {
                color: dots.color ?? graph.color,
                fill: dots.fill ?? graph.color,
                radius: dots.size || 4,
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

            if (graph.dots) {
                coords.map(([x, y]) => {
                    // console.log(x, y)
                    drawPointFn(ctx, [x, y], opt)
                })
            }

            this.coords[graph.name] = {
                graph,
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

                if ((mx > lx && mx < rx) && (my > ly && my < ry)) {
                    drawPointFn(ctx, [px, py], {color: opt.color, radius: opt.radius * 2, fill: opt.fill})
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

    draw(){
        const o = this.options

        super.draw()
        this.drawData()
        this.drawFloatPoint()
        this.drawCross()
        if (o.legend.vertical === true)
            this.drawLegendVertical()
        else
            this.drawLegend()
    }
}

export const lineChart = (el, data, options) => new LineChart(el, data, options)