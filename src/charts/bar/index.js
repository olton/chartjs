import {Chart} from "../base"
import {merge} from "../../helpers/merge";
import {defaultBarChartOptions} from "../../defaults/bar-chart"
import {minMaxLinear} from "../../helpers/min-max";
import {drawText} from "../../draw/text";
import {drawRect} from "../../draw/rect";

export class BarChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultBarChartOptions, options))

        this.groups = 0
        this.barWidth = 0

        this.legendItems = []
        const legend = this.options.legend
        if (legend && legend.titles && legend.titles.length) {
            for(let i = 0; i < legend.titles.length; i++) {
                this.legendItems.push([legend.titles[i], this.data[0].color.split(",").map( c => c.trim() )[i]])
            }
        }

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

        const [, maxY] = minMaxLinear(a)

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

    drawAxisX() {}

    drawData(){
        const o = this.options
        const ctx = this.ctx
        let px = o.padding.left + o.groupDistance
        let py = this.viewHeight + o.padding.top
        const rect = this.canvas.getBoundingClientRect()
        let mx, my
        let tooltip = false

        if (this.proxy.mouse) {
            mx = this.proxy.mouse.x - rect.left
            my = this.proxy.mouse.y - rect.top
        }

        for (const graph of this.data) {
            let colors = graph.color.split(",").map( c => c.trim() )
            let name = graph.name
            let data = graph.data
            let labelColor = colors.length > 1 ? o.color : colors[0]

            let barsWidth = 0
            for (let i = 0; i < data.length; i++) {
                let delta = data[i] * this.ratioY
                let color = colors[i]
                let fill = colors[i]

                drawRect(ctx, [px, py - delta, this.barWidth-1, delta], {color, fill})
                if ((mx > px && mx < px + this.barWidth - 1) && (my > py - delta && my < py )) {
                    drawRect(ctx, [px, py - delta, this.barWidth-1, delta], {color, fill: 'rgba(255,255,255,.3)'})
                    if ( o.tooltip ) {
                        this.showTooltip([(o.legend.titles ? o.legend.titles[i] : ''), data[i]], graph)
                        tooltip = true
                    }
                }

                barsWidth += this.barWidth

                px += o.barDistance + this.barWidth
            }

            if (typeof o.onDrawLabel === 'function') {
                name = o.onDrawLabel.apply(null, name)
            }

            drawText(ctx, name, [px - barsWidth / 2 - o.barDistance, py + 20], {
                align: 'center', color: labelColor, stroke: labelColor, font: o.font
            })

            px += o.groupDistance
        }

        if (!tooltip && this.tooltip) {
            this.tooltip.remove()
            this.tooltip = null
        }

        return this
    }

    drawFloatPoint(){
    }

    draw(){
        const o = this.options

        this.calcBarWidth()
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

export const barChart = (el, data, options) => new BarChart(el, data, options)