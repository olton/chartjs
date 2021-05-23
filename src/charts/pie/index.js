import {Chart} from "../base"
import {defaultPieChartOptions} from "../../defaults/pie"
import {merge} from "../../helpers/merge"
import {drawSector} from "../../draw/sector";
import {drawText} from "../../draw/text";
import {getTextBoxWidth} from "../../helpers/get-textbox-width";

export class PieChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultPieChartOptions, options), 'pie')
        this.total = this.data.reduce( (acc, curr) => acc + curr, 0)

        this.legendItems = []

        const legend = this.options.legend
        if (legend && legend.titles && legend.titles.length) {
            for(let i = 0; i < legend.titles.length; i++) {
                this.legendItems.push([legend.titles[i], this.options.colors[i], this.data[i]])
            }
        }

        this.resize()
    }

    sectors(){
        const ctx = this.ctx, o = this.options
        let [x, y] = this.center
        const radius = this.radius

        let startAngle = 0, endAngle = 360, offset = 0, val = '', textVal = ''
        let textX, textY

        if (!this.data || ! this.data.length) return

        for (let i = 0; i < this.data.length; i++) {
            let val = this.data[i]
            let color = o.colors[i]
            endAngle = 2 * Math.PI * val / this.total
            drawSector(ctx, [x, y, radius, startAngle, startAngle + endAngle], {fill: color, color: color})
            startAngle += endAngle
        }

        startAngle = 0
        for (let i = 0; i < this.data.length; i++) {
            let val = this.data[i], percent
            let name = (this.legendItems[i] && this.legendItems[i][0]) ?? ""

            endAngle = 2 * Math.PI * val / this.total
            offset = 0
            percent = Math.round(val * 100 / this.total)
            textVal = o.showValue ? val : percent+"%"

            if (typeof o.onDrawValue === 'function') {
                textVal = o.onDrawValue.apply(null, [name, val, percent])
            }

            textX = x + (radius / 2 + offset) * Math.cos(startAngle + endAngle / 2)
            textY = y + (radius / 2 + offset) * Math.sin(startAngle + endAngle / 2)

            let textW = getTextBoxWidth(ctx, [val+"%"], {font: o.labels.font})
            drawText(ctx, textVal, [textX - textW/2, textY+o.labels.font.size/2], {color: o.labels.color, font: o.labels.font})

            startAngle += endAngle
        }
    }

    draw(){
        super.draw()
        this.sectors()
        this.legend()
    }

    resize(){
        super.resize()
        this.center = [this.dpiWidth / 2, this.dpiHeight / 2]
    }
}

export const pieChart = (el, data, options) => new PieChart(el, data, options)