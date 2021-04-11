import {Chart} from "../base"
import {defaultPieChartOptions} from "../../defaults/pie-chart"
import {merge} from "../../helpers/merge"
import {drawArc} from "../../draw/arc";

export class PieChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultPieChartOptions, options), 'pie')
        this.center = [this.dpiWidth / 2, this.dpiHeight / 2]
        this.total = this.options.total || this.data.reduce( (acc, curr) => acc + curr.data, 0)
        this.resize()
    }

    sectors(){
        const ctx = this.ctx, o = this.options
        const [x, y] = this.center
        const radius = (this.viewHeight > this.viewWidth) ? this.viewWidth / 2 - (o.padding.left + o.padding.right) : this.viewHeight / 2 - (o.padding.top + o.padding.bottom)

        let a = 0, b = 0
        for (const sector of this.data) {
            b = sector.data * 360 / this.total
            drawArc(ctx, [x, y, radius, a, a + b], {fill: sector.color, color: sector.color})
            a += b
        }
        if (a < 360) {
            drawArc(ctx, [x, y, radius, a, 360], {fill: o.other.color, color: o.other.color})
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