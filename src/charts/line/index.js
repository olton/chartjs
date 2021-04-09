import {Chart} from "../base"
import {minMax} from "../../helpers/min-max"
import {drawCircle} from "../../draw/circle"
import {drawLine} from "../../draw/line"
import {drawSquare} from "../../draw/square"
import {drawTriangle} from "../../draw/triangle"
import {drawDiamond} from "../../draw/diamond"
import {defaultLineChartOptions} from "../../defaults/line-chart"
import {isObject, merge} from "../../helpers/merge"

export class LineChart extends Chart {
    constructor(el, data = [], options = {}) {
        super(el, data, merge({}, defaultLineChartOptions, options))

        this.coords = {}

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

    drawLegend(){
        const o = this.options, legend = o.legend
        let lh, x, y, magic = 5, box = o.legend.font.size
        const ctx = this.ctx

        if (!legend || !isObject(legend)) return

        lh = legend.font.size * legend.font.lineHeight
        y = o.padding.top + this.viewHeight + legend.font.size + legend.padding.top + legend.margin.top
        x = o.padding.left + legend.padding.left + legend.margin.left

        ctx.save()
        ctx.beginPath()
        ctx.font = `${legend.font.style} ${legend.font.weight} ${legend.font.size}px ${legend.font.family}`
        ctx.setLineDash([])

        for (const graph of this.data) {
            ctx.lineWidth = 1
            ctx.strokeStyle = graph.color
            ctx.fillStyle = graph.color

            const nameWidth = ctx.measureText(graph.name).width

            if (x + nameWidth > this.viewWidth) {
                x = o.padding.left + legend.padding.left + legend.margin.left
                y += lh
            }

            ctx.fillRect(x, y, box, box)
            ctx.fillText(graph.name, x + box + magic, y + legend.font.size - 2)

            x += box + nameWidth + 20
        }

        ctx.closePath()
        ctx.restore()

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
        super.draw()
        this.drawData()
        this.drawFloatPoint()
        this.drawCross()
        this.drawLegend()
    }
}

export const lineChart = (el, data, options) => new LineChart(el, data, options)