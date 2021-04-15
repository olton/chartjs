import {Chart} from "../base"
import {defaultPieChartOptions} from "../../defaults/pie"
import {merge} from "../../helpers/merge"
import {drawArc} from "../../draw/arc";
import {drawText} from "../../draw/text";
import {drawCircle} from "../../draw/circle";
import {getTextBoxWidth} from "../../helpers/get-textbox-width";
import {expandPadding} from "../../helpers/expand-padding";

export class PieChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultPieChartOptions, options), 'pie')
        this.center = [this.dpiWidth / 2, this.dpiHeight / 2]
        this.total = this.data.reduce( (acc, curr) => acc + curr.data, 0)

        this.legendItems = []

        if (this.options.legend && this.data.length) {
            for(let i = 0; i < this.data.length; i++) {
                this.legendItems.push([this.data[i].name, this.options.colors[i]])
            }
        }

        this.resize()
    }

    sectors(){
        const ctx = this.ctx, o = this.options, padding = expandPadding(o.padding)
        const [x, y] = this.center
        const radius = (this.viewHeight > this.viewWidth)
            ? this.viewWidth / 2 - (padding.left + padding.right)
            : this.viewHeight / 2 - (padding.top + padding.bottom)

        let startAngle = 0, endAngle = 360, offset = 0, val = '', textVal = ''
        let textX, textY

        for (let i = 0; i < this.data.length; i++) {
            let sector = this.data[i]
            let color = o.colors[i]
            endAngle = 2 * Math.PI * sector.data / this.total
            drawArc(ctx, [x, y, radius, startAngle, startAngle + endAngle], {fill: color, color: color})
            startAngle += endAngle
        }

        if (o.holeSize) {
            drawCircle(ctx, [x, y, o.holeSize], {color: '#fff'})
        }

        startAngle = 0
        for (let i = 0; i < this.data.length; i++) {
            let sector = this.data[i], percent

            endAngle = 2 * Math.PI * sector.data / this.total
            offset = o.holeSize / 2
            percent = Math.round(sector.data * 100 / this.total)
            textVal = o.showValue ? sector.data : percent+"%"

            if (typeof o.onDrawValue === 'function') {
                textVal = o.onDrawValue.apply(null, [sector.name, sector.data, percent])
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