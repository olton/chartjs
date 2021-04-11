import {Chart} from "../base"
import {defaultPieChartOptions} from "../../defaults/pie-chart"
import {merge} from "../../helpers/merge"
import {drawArc} from "../../draw/arc";
import {drawText} from "../../draw/text";
import {drawCircle} from "../../draw/circle";

export class PieChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultPieChartOptions, options), 'pie')
        this.center = [this.dpiWidth / 2, this.dpiHeight / 2]
        this.total = this.data.reduce( (acc, curr) => acc + curr.data, 0)

        this.legendItems = []

        if (this.options.legend && this.data.length) {
            for(let i = 0; i < this.data.length; i++) {
                this.legendItems.push([this.data[i].name, this.data[i].color])
            }
        }

        console.log(this.legendItems)

        this.resize()
    }

    sectors(){
        const ctx = this.ctx, o = this.options
        const [x, y] = this.center
        const radius = (this.viewHeight > this.viewWidth)
            ? this.viewWidth / 2 - (o.padding.left + o.padding.right)
            : this.viewHeight / 2 - (o.padding.top + o.padding.bottom)
        let textX, textY

        let startAngle = 0
        for (const sector of this.data) {
            let endAngle = 2 * Math.PI * sector.data / this.total

            drawArc(ctx, [x, y, radius, startAngle, startAngle + endAngle], {fill: sector.color, color: sector.color})
            // drawText(ctx, sector.data, [textX, textY], {color: sector.color, font: o.labels.font})

            startAngle += endAngle
        }

        if (o.holeSize) {
            drawCircle(ctx, [x, y, o.holeSize], {color: '#fff'})
        }
    }

    legend() {
        return this.options.legend.vertical === true
            ? super.legendVertical()
            : super.legend()
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