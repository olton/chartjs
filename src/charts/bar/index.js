import {Chart} from "../base"
import {merge} from "../../helpers/merge";
import {defaultBarChartOptions} from "../../defaults/bar-chart"
import {minMaxLinear} from "../../helpers/min-max";

export class BarChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultBarChartOptions, options))

        this.groups = 0
        this.barWidth = 0

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

        const [minX, maxX] = [0, length]
        const [minY, maxY] = minMaxLinear(a)

        this.minX = o.boundaries && !isNaN(o.boundaries.minX) ? o.boundaries.minX : minX
        this.maxX = o.boundaries && !isNaN(o.boundaries.maxX) ? o.boundaries.maxX : maxX
        this.minY = (o.boundaries && !isNaN(o.boundaries.minY) ? o.boundaries.minY : minY).toFixed(fixed)
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

    drawAxisX() {
    }

    drawLegend(){
    }

    drawData(){
        const o = this.options
        const ctx = this.ctx
        let x = o.padding.left + o.groupDistance
        let y = this.viewHeight + o.padding.top

        ctx.beginPath()

        for (const graph of this.data) {
            let colors = graph.color.split(",").map( c => c.trim() )
            let name = graph.name
            let data = graph.data

            let barsWidth = 0
            for (let i = 0; i < data.length; i++) {
                let delta = data[i] * this.ratioY

                ctx.fillStyle = colors[i]
                ctx.fillRect(x, y - delta, this.barWidth, delta)

                barsWidth += this.barWidth

                x += o.barDistance + this.barWidth
            }

            ctx.textAlign = 'center'
            ctx.fillText(name, x - barsWidth / 2 , y + 20)

            x += o.groupDistance
        }

        ctx.closePath()

        return this
    }

    draw(){
        this.calcBarWidth()
        super.draw()
        this.drawData()
    }
}

export const barChart = (el, data, options) => new BarChart(el, data, options)