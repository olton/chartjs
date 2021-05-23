import {Chart} from "../base";
import {merge} from "../../helpers/merge";
import {defaultDonutOptions} from "../../defaults/donut";
import {expandPadding} from "../../helpers/expand-padding";
import {drawText} from "../../draw/text";
import {drawArc} from "../../draw/arc";

export class Donut extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultDonutOptions, options), 'donut')

        this.total = this.data.reduce( (acc, curr) => acc + curr, 0)
        this.min = this.options.boundaries.min
        this.max = this.options.boundaries.max

        this.legendItems = []

        const legend = this.options.legend
        if (legend && legend.titles && legend.titles.length) {
            for(let i = 0; i < legend.titles.length; i++) {
                this.legendItems.push([legend.titles[i], this.options.colors[i], this.data[i]])
            }
        }

        this.resize()
    }

    gauge(){
        const ctx = this.ctx, o = this.options
        let [x, y] = this.center

        const PI = Math.PI, min = 0, max = 360
        const radius = this.radius - o.backWidth / 2

        drawArc(ctx, [x, y, radius, 0, 2*PI], {size: o.backWidth, stroke: o.backStyle})

        let startAngle = 0, endAngle = 0
        for(let i = 0; i < this.data.length; i++) {
            const color = o.colors[i]
            let val = this.data[i]

            endAngle = 2 * Math.PI * val / this.total
            drawArc(ctx, [x, y, radius, startAngle, startAngle + endAngle], {size: o.valueWidth, stroke: color})

            if (o.label) {
                let name = (this.legendItems[i] && this.legendItems[i][0]) ?? ""
                const percent = Math.round(val * 100 / this.total)
                let textVal = o.showValue ? val : percent+"%"
                let textX, textY

                if (typeof o.onDrawValue === 'function') {
                    textVal = o.onDrawValue.apply(null, [name, val, percent])
                }

                textX = x + (radius) * Math.cos(startAngle + endAngle / 2)
                textY = y + (radius) * Math.sin(startAngle + endAngle / 2)

                drawText(ctx, textVal, [textX, textY], {color: o.label.color, font: o.label.font})
            }

            startAngle += endAngle
        }
    }

    draw(){
        super.draw()
        this.gauge()
        this.legend()
    }

    resize(){
        super.resize()
        this.center = [this.dpiWidth / 2, this.dpiHeight / 2]
    }

}

export const donut = (el, data, options) => new Donut(el, data, options)