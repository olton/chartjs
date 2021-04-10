import {Chart} from "../base"
import {defaultPieChartOptions} from "../../defaults/pie-chart"
import {merge} from "../../helpers/merge"

export class PieChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultPieChartOptions, options), 'pie')

        this.resize()
    }

    drawData(){

    }

    drawLegend() {
        return this.options.legend.vertical === true
            ? super.drawLegendVertical()
            : super.drawLegend()
    }

    // drawAxisX() {}
    // drawAxisY() {}
    drawCross() {}
    drawArrowX() {}
    drawArrowY() {}

    draw(){
        super.draw()
        this.drawData()
        this.drawLegend()
    }
}

export const pieChart = (el, data, options) => new PieChart(el, data, options)