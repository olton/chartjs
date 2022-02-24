import {Chart} from "../base"
import {merge} from "../../helpers/merge";
import {defaultBarChartOptions} from "../../defaults/bar"
import {minMaxLinear} from "../../helpers/min-max";
import {drawText} from "../../draw/text";
import {drawRect, drawRectAnimate} from "../../draw/rect";
import {expandPadding} from "../../helpers/expand-padding";

import {MixinAxis} from "../../mixins/axis"
import {MixinArrows} from "../../mixins/arrows";

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
            a = [].concat(a, this.data[k])
        }

        this.groups = this.data.length

        const [, max] = minMaxLinear(a)

        this.maxX = this.maxY = o.boundaries && !isNaN(o.boundaries.max) ? o.boundaries.max : max

        if (isNaN(this.maxX)) this.maxX = 100
        if (isNaN(this.maxY)) this.maxX = 100
    }

    calcRatio(){
        this.ratioX = this.ratioY = this.ratio = (this.options.dataAxisX ? this.viewWidth : this.viewHeight) / (this.maxY === this.minY ? this.maxY : this.maxY - this.minY)
    }

    calcBarWidth(){
        const o = this.options
        let bars = 0

        for (let i = 0; i < this.data.length; i++) {
            bars += Array.isArray(this.data[i]) ? this.data[i].length : 1
        }

        let availableSpace =
            (o.dataAxisX ? this.viewHeight : this.viewWidth)
            - ((this.data.length + 1) * o.groupDistance) // space between groups
            - ((bars - this.data.length) * o.barDistance) // space between bars

        this.barWidth = availableSpace / bars
    }

    bars(axisX = false){
        const o = this.options, bars = o.bars
        const padding = expandPadding(o.padding)
        const ctx = this.ctx
        const rect = this.canvas.getBoundingClientRect()
        let px, py, mx, my, tooltip = false

        if (!this.data || !this.data.length) return

        if (this.proxy.mouse) {
            mx = this.proxy.mouse.x - rect.left
            my = this.proxy.mouse.y - rect.top
        }

        px = axisX ? padding.left : padding.left + o.groupDistance
        py = axisX ? padding.top + o.groupDistance : this.viewHeight + padding.top

        for (let g = 0; g < this.data.length; g++) {
            const graph = this.data[g]
            const data = Array.isArray(graph) ? graph : [graph]
            const labelColor = o.labels.color
            let name = bars[g]

            let groupWidth = 0

            for (let i = 0; i < data.length; i++) {
                let delta = data[i] * this.ratio
                let color = data.length === 1 ? o.colors[g] : o.colors[i]
                const options = {
                    color,
                    fill: color
                }
                const coords = axisX
                    ? [px, py, px + delta - padding.right, this.barWidth]
                    : [px, py - delta, this.barWidth-1, delta]

                drawRect(ctx, coords, options)

                const borderX = axisX
                    ? [px, px + delta]
                    : [px, px + this.barWidth - 1]

                const borderY = axisX
                    ? [py, py + this.barWidth - 1]
                    : [py - delta, py]

                if ((mx > borderX[0] && mx < borderX[1]) && (my > borderY[0] && my < borderY[1] )) {
                    drawRect(ctx, coords, {...options, fill: 'rgba(255,255,255,.3)'})
                    if ( o.tooltip ) {
                        this.showTooltip([(o.legend.titles ? o.legend.titles[i] : name), data[i]], graph)
                        tooltip = true
                    }
                }

                groupWidth += this.barWidth + o.barDistance

                if (axisX) {
                    py += o.barDistance + this.barWidth
                } else {
                    px += o.barDistance + this.barWidth
                }
            }

            if (axisX) {
                py -= o.barDistance
            } else {
                px -= o.barDistance
            }

            groupWidth -= o.barDistance

            if (typeof o.onDrawLabel === 'function') {
                name = o.onDrawLabel.apply(null, name)
            }

            drawText(ctx, name, [0, 0], {
                align: 'center',
                color: labelColor,
                stroke: labelColor,
                font: o.font,
                angle: axisX ? 90 : 0,
                translate: axisX ? [px - 20, py - groupWidth / 2] : [px - groupWidth / 2, py + 20]
            })

            if (axisX) {
                py += o.groupDistance
            } else {
                px += o.groupDistance
            }
        }

        if (!tooltip && this.tooltip) {
            this.tooltip.remove()
            this.tooltip = null
        }

        this.static = true
    }

    draw(){
        const o = this.options

        super.draw()
        this.calcBarWidth()
        this.calcRatio()

        if (o.dataAxisX) {
            this.axisX()
        } else {
            this.axisY()
        }
        this.bars(o.dataAxisX)

        this.arrows()

        this.legend()
    }
}

Object.assign(BarChart.prototype, MixinAxis)
Object.assign(BarChart.prototype, MixinArrows)

export const barChart = (el, data, options) => new BarChart(el, data, options)