import {Chart} from "../base"
import {isObject, merge} from "../../helpers/merge";
import {defaultBarChartOptions} from "../../defaults/bar-chart"
import {minMaxLinear} from "../../helpers/min-max";
import {drawText} from "../../draw/text";
import {drawSquare} from "../../draw/square";

export class BarChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultBarChartOptions, options))

        this.groups = 0
        this.barWidth = 0

        this.calcMinMax()
        this.draw()
    }

    calcMinMax(){
        const o = this.options, {fixed = 0} = o.value
        let a = [], length = 0

        for (let k in this.data) {
            let data = this.data[k].data
            a = [].concat(a, data)
        }

        for (let k in this.data) {
            length += this.data[k].data.length
            this.groups++
        }

        const [minX, maxX] = [0, length]
        const [minY, maxY] = minMaxLinear(a)

        this.minX = o.boundaries && !isNaN(o.boundaries.minX) ? o.boundaries.minX : minX
        this.maxX = o.boundaries && !isNaN(o.boundaries.maxX) ? o.boundaries.maxX : maxX
        this.minY = (o.boundaries && !isNaN(o.boundaries.minY) ? o.boundaries.minY : minY).toFixed(fixed)
        this.maxY = (o.boundaries && !isNaN(o.boundaries.maxY) ? o.boundaries.maxY : maxY).toFixed(fixed)

        return this
    }

    calcBarWidth(){
        const o = this.options
        let bars = 0, magic = 5

        for (const graph of this.data) {
            bars += graph.data.length
        }

        this.barWidth = Math.round((this.viewWidth - (this.data.length * +o.groupDistance) - (bars * +o.barDistance)) / bars) - magic
    }

    drawAxisX() {
    }

    drawData(){
        const o = this.options
        const ctx = this.ctx
        let x = o.padding.left + o.groupDistance
        let y = this.viewHeight + o.padding.top

        ctx.beginPath()

        for (const graph of this.data) {
            let colors = graph.color.split(",").map( c => c.trim() )
            let name = graph.name
            let data = graph.data
            let labelColor = colors.length > 1 ? o.color : colors[0]

            let barsWidth = 0
            for (let i = 0; i < data.length; i++) {
                let delta = data[i] * this.ratioY

                ctx.fillStyle = colors[i]
                ctx.fillRect(x, y - delta, this.barWidth, delta)

                barsWidth += this.barWidth

                x += o.barDistance + this.barWidth
            }

            if (typeof o.onDrawLabel === 'function') {
                name = o.onDrawLabel.apply(null, name)
            }

            drawText(ctx, name, [x - barsWidth / 2 - o.barDistance, y + 20], {
                align: 'center', color: labelColor, stroke: labelColor, font: o.font
            })

            x += o.groupDistance
        }

        ctx.closePath()

        return this
    }

    drawLegend(){
        const o = this.options, legend = o.legend
        let lh, x, y, magic = 5, box = o.legend.font.size / 2
        const ctx = this.ctx

        if (!legend || !isObject(legend)) return
        if (!legend.titles || !Array.isArray(legend.titles) || !legend.titles.length) return

        lh = legend.font.size * legend.font.lineHeight
        y = o.padding.top + this.viewHeight + legend.font.size + legend.padding.top + legend.margin.top
        x = o.padding.left + legend.padding.left + legend.margin.left

        ctx.save()
        ctx.beginPath()
        ctx.font = `${legend.font.style} ${legend.font.weight} ${legend.font.size}px ${legend.font.family}`
        ctx.setLineDash([])

        const colors = this.data[0].color.split(",").map( c => c.trim() )

        for (let i = 0; i < legend.titles.length; i++) {
            let color = colors[i]
            let name = legend.titles[i]

            ctx.lineWidth = 1
            ctx.strokeStyle = color
            ctx.fillStyle = color

            const nameWidth = ctx.measureText(name).width

            if (x + nameWidth > this.viewWidth) {
                x = o.padding.left + legend.padding.left + legend.margin.left
                y += lh
            }

            drawSquare(ctx, [x, y], {color, fill: color, radius: box})
            drawText(ctx, name, [x + box +magic, y + box / 2], {color: o.font.color, stroke: o.font.color, font: o.font})

            x += box + nameWidth + 20
        }

        ctx.closePath()
        ctx.restore()

        return this
    }

    drawFloatPoint(){
    }

    draw(){
        this.calcBarWidth()
        super.draw()
        this.drawData()
        this.drawFloatPoint()
        this.drawCross()
        this.drawLegend()
    }
}

export const barChart = (el, data, options) => new BarChart(el, data, options)