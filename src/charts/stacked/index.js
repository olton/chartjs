import {merge} from "../../helpers/merge"
import {defaultStackedBarChartOptions} from "../../defaults/stacked-bar"
import {MixinAxis} from "../../mixins/axis"
import {minMaxLinear} from "../../helpers/min-max"
import {Chart} from "../base"
import {expandPadding} from "../../helpers/expand-padding";
import {drawRect} from "../../draw/rect";
import {drawText} from "../../draw/text";

export class StackedBarChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultStackedBarChartOptions, options), 'stacked-bar');

        this.barWidth = 0
        this.maxY = 0
        this.maxX = 0
        this.minY = 0
        this.minX = 0
        this.viewAxis = this.options.dataAxisX ? this.viewHeight : this.viewWidth
        this.ratioX = 0
        this.ratioY = 0

        this.legendItems = []
        const legend = this.options.legend
        if (legend && legend.titles && legend.titles.length) {
            for(let i = 0; i < legend.titles.length; i++) {
                this.legendItems.push([legend.titles[i], this.options.colors[i]])
            }
        }

        this.calcMinMax()
        this.resize()
    }

    calcMinMax(){
        const o = this.options
        let a = []

        for (let k in this.data) {
            let data = this.data[k].data
            a.push( data.reduce( (a, b) => a + b, 0) )
        }

        const [, max] = minMaxLinear(a)

        this.maxX = this.maxY = o.boundaries && !isNaN(o.boundaries.max) ? o.boundaries.maxY : max

        if (isNaN(this.maxX)) this.maxX = 100
        if (isNaN(this.maxY)) this.maxX = 100
    }

    calcRatio(){
        this.ratio = this.ratioY = this.ratioX = (this.options.dataAxisX ? this.viewWidth : this.viewHeight) / (this.maxY === this.minY ? this.maxY : this.maxY - this.minY)
    }

    calcBarWidth(){
        const o = this.options
        let bars = this.data.length

        let availableSpace =
            (o.dataAxisX ? this.viewHeight : this.viewWidth)
            - ((this.data.length + 1) * o.groupDistance) // space between groups

        this.barWidth = availableSpace / bars
    }

    barsX(){
        const o = this.options
        const padding = expandPadding(o.padding)
        const ctx = this.ctx
        let px, py
        const rect = this.canvas.getBoundingClientRect()
        let mx, my
        let tooltip = false

        if (!this.data || !this.data.length) return

        if (this.proxy.mouse) {
            mx = this.proxy.mouse.x - rect.left
            my = this.proxy.mouse.y - rect.top
        }

        px = padding.left
        py = padding.top + o.groupDistance

        let colors = Array.isArray(o.colors) ? o.colors : o.colors.split(",").map( c => c.trim() )

        for (const graph of this.data) {
            let data = graph.data
            let name = graph.name
            let labelColor = colors.length > 1 ? o.color : colors[0] // ???

            let sigma = 0
            for (let i = 0; i < data.length; i++) {
                let delta = data[i] * this.ratio
                let color = colors[i]
                let fill = colors[i]
                let valueTitle = o.values[i]

                drawRect(ctx, [px + sigma, py, delta, this.barWidth], {color, fill})

                if ((mx > px + sigma && mx < px + delta + sigma) && (my > py && my < py + this.barWidth )) {

                    drawRect(ctx, [px + sigma, py, delta, this.barWidth-1], {color: 'rgba(255,255,255,.3)', fill: 'rgba(255,255,255,.3)'})

                    if ( o.tooltip ) {
                        this.showTooltip([valueTitle, data[i]], graph)
                        tooltip = true
                    }

                }

                sigma += delta
            }

            py += o.groupDistance + this.barWidth

            if (typeof o.onDrawLabel === 'function') {
                name = o.onDrawLabel.apply(null, name)
            }

            drawText(ctx, name, [0, 0], {
                align: 'center', color: labelColor, stroke: labelColor, font: o.font,
                translate: [px - 20, py - this.barWidth / 2],
                angle: 90
            })

        }

        if (!tooltip && this.tooltip) {
            this.tooltip.remove()
            this.tooltip = null
        }
    }

    barsY(){
        const o = this.options
        const padding = expandPadding(o.padding)
        const ctx = this.ctx
        let px, py
        const rect = this.canvas.getBoundingClientRect()
        let mx, my
        let tooltip = false

        if (!this.data || !this.data.length) return

        if (this.proxy.mouse) {
            mx = this.proxy.mouse.x - rect.left
            my = this.proxy.mouse.y - rect.top
        }

        px = padding.left + o.groupDistance
        py = this.viewHeight + padding.top

        let colors = Array.isArray(o.colors) ? o.colors : o.colors.split(",").map( c => c.trim() )

        for (const graph of this.data) {
            let data = graph.data
            let name = graph.name
            let labelColor = colors.length > 1 ? o.color : colors[0]

            let sigma = 0
            for (let i = 0; i < data.length; i++) {
                let delta = data[i] * this.ratio
                let color = colors[i]
                let fill = colors[i]
                let valueTitle = o.values[i]

                drawRect(ctx, [px, py - delta - sigma, this.barWidth, delta], {color, fill})

                if ((mx > px && mx < px + this.barWidth - 1) && (my > py - delta - sigma && my < py - sigma )) {

                    drawRect(ctx, [px, py - delta - sigma, this.barWidth, delta], {color: 'rgba(255,255,255,.3)', fill: 'rgba(255,255,255,.3)'})

                    if ( o.tooltip ) {
                        this.showTooltip([valueTitle, data[i]], graph)
                        tooltip = true
                    }

                }

                sigma += delta
            }

            px += o.groupDistance + this.barWidth

            if (typeof o.onDrawLabel === 'function') {
                name = o.onDrawLabel.apply(null, name)
            }

            drawText(ctx, name, [0, 0], {
                align: 'center', color: labelColor, stroke: labelColor, font: o.font,
                translate: [px - o.groupDistance - this.barWidth / 2, py + 20],
                angle: 0
            })

        }

        if (!tooltip && this.tooltip) {
            this.tooltip.remove()
            this.tooltip = null
        }
    }

    draw(){
        const o = this.options

        super.draw()
        this.calcBarWidth()
        this.calcRatio()

        if (o.dataAxisX) {
            this.axisX()
            this.barsX()
        } else {
            this.axisY()
            this.barsY()
        }

        this.arrowY()
        this.arrowX()
        this.legend()
    }
}

Object.assign(StackedBarChart.prototype, MixinAxis)

export const stackedBarChart = (el, data, options) => new StackedBarChart(el, data, options)