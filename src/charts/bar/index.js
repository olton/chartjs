import {Chart} from "../base"
import {merge} from "../../helpers/merge";
import {defaultBarChartOptions} from "../../defaults/bar"
import {minMaxLinear} from "../../helpers/min-max";
import {drawText} from "../../draw/text";
import {drawRect} from "../../draw/rect";
import {expandPadding} from "../../helpers/expand-padding";

import {MixinAxis} from "../../mixins/axis"

export class BarChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultBarChartOptions, options), 'bar')

        this.groups = 0
        this.barWidth = 0
        this.maxY = 0
        this.maxX = 0
        this.minY = 0
        this.minX = 0
        this.viewAxis = this.options.dataAxisX ? this.viewHeight : this.viewWidth

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
        let a = [], length = 0

        for (let k in this.data) {
            let data = this.data[k].data
            a = [].concat(a, data)
        }

        for (let k in this.data) {
            length += this.data[k].data.length
            this.groups++
        }

        const [, max] = minMaxLinear(a)

        this.maxX = this.maxY = o.boundaries && !isNaN(o.boundaries.max) ? o.boundaries.max : max
    }

    calcRatio(){
        this.ratio = (this.options.dataAxisX ? this.viewWidth : this.viewHeight) / (this.maxY - this.minY)
    }

    calcBarWidth(){
        const o = this.options
        let bars = 0

        for (const g of this.data) {
            bars += g.data.length
        }

        let availableSpace =
            (o.dataAxisX ? this.viewHeight : this.viewWidth)
            - ((this.data.length + 1) * o.groupDistance) // space between groups
            - ((bars - this.data.length) * o.barDistance) // space between bars

        this.barWidth = availableSpace / bars
    }

    barsY(){
        const o = this.options
        const padding = expandPadding(o.padding)
        const ctx = this.ctx
        let px = padding.left + o.groupDistance
        let py = this.viewHeight + padding.top
        const rect = this.canvas.getBoundingClientRect()
        let mx, my
        let tooltip = false

        if (this.proxy.mouse) {
            mx = this.proxy.mouse.x - rect.left
            my = this.proxy.mouse.y - rect.top
        }

        for (let g = 0; g < this.data.length; g++) {
            // let colors = graph.color.split(",").map( c => c.trim() )
            const graph = this.data[g]
            const data = graph.data
            const labelColor = o.labels.color
            let name = graph.name

            let groupWidth = 0

            for (let i = 0; i < data.length; i++) {
                let delta = data[i] * this.ratio
                let color = data.length === 1 ? o.colors[g] : o.colors[i]
                let fill = color

                drawRect(ctx, [px, py - delta, this.barWidth-1, delta], {color, fill})
                if ((mx > px && mx < px + this.barWidth - 1) && (my > py - delta && my < py )) {
                    drawRect(ctx, [px, py - delta, this.barWidth-1, delta], {color, fill: 'rgba(255,255,255,.3)'})
                    if ( o.tooltip ) {
                        this.showTooltip([(o.legend.titles ? o.legend.titles[i] : name), data[i]], graph)
                        tooltip = true
                    }
                }

                groupWidth += this.barWidth + o.barDistance

                px += o.barDistance + this.barWidth
            }

            px -= o.barDistance
            groupWidth -= o.barDistance

            if (typeof o.onDrawLabel === 'function') {
                name = o.onDrawLabel.apply(null, name)
            }

            drawText(ctx, name, [px - groupWidth / 2, py + 20], {
                align: 'center', color: labelColor, stroke: labelColor, font: o.font
            })

            px += o.groupDistance
        }

        if (!tooltip && this.tooltip) {
            this.tooltip.remove()
            this.tooltip = null
        }
    }

    barsX(){
        const o = this.options
        const padding = expandPadding(o.padding)
        const ctx = this.ctx
        let px, py
        const rect = this.canvas.getBoundingClientRect()
        let mx, my
        let tooltip = false

        if (this.proxy.mouse) {
            mx = this.proxy.mouse.x - rect.left
            my = this.proxy.mouse.y - rect.top
        }

        px = padding.left
        py = padding.top + o.groupDistance

        for (let g = 0; g < this.data.length; g++) {
            // let colors = graph.color.split(",").map( c => c.trim() )
            const graph = this.data[g]
            const data = graph.data
            const labelColor = o.labels.color
            let name = graph.name

            let groupWidth = 0

            for (let i = 0; i < data.length; i++) {
                let delta = data[i] * this.ratio
                let color = data.length === 1 ? o.colors[g] : o.colors[i]
                let fill = color

                drawRect(ctx, [px, py, px + delta - padding.right, this.barWidth], {color, fill})

                if ((mx > px && mx < px + delta) && (my > py && my < py + this.barWidth )) {

                    drawRect(ctx, [px, py, px + delta - padding.right, this.barWidth], {color, fill: 'rgba(255,255,255,.3)'})

                    if ( o.tooltip ) {
                        this.showTooltip([(o.legend.titles ? o.legend.titles[i] : name), data[i]], graph)
                        tooltip = true
                    }
                }

                groupWidth += this.barWidth + o.barDistance

                py += o.barDistance + this.barWidth
            }

            py -= o.barDistance
            groupWidth -= o.barDistance

            if (typeof o.onDrawLabel === 'function') {
                name = o.onDrawLabel.apply(null, name)
            }

            drawText(ctx, name, [0, 0], {
                align: 'center',
                color: labelColor,
                stroke: labelColor,
                font: o.font,
                angle: Math.PI / 2,
                translate: [px - 20, py - groupWidth / 2]
            })

            py += o.groupDistance
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

Object.assign(BarChart.prototype, MixinAxis)

export const barChart = (el, data, options) => new BarChart(el, data, options)