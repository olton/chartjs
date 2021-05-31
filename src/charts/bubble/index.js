import {Chart} from "../base"
import {defaultBubbleChartOptions} from "../../defaults/bubble"
import {MixinCross} from "../../mixins/cross"
import {MixinAxis} from "../../mixins/axis"
import {minMax} from "../../helpers/min-max"
import {expandPadding} from "../../helpers/expand-padding"
import {drawCircle} from "../../draw/circle"
import {merge} from "../../helpers/merge"

export class BubbleChart extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultBubbleChartOptions, options), 'bubble')

        this.coords = {}

        this.minX = 0
        this.maxX = 0
        this.minY = 0
        this.maxY = 0
        this.minZ = 0
        this.maxZ = 0

        this.legendItems = []
        const legend = this.options.legend
        if (legend) {
            for (let i = 0; i < this.data.length; i++) {
                this.legendItems.push([this.data[i].name, this.options.colors[i]])
            }
        }

        this.calcMinMax()
        this.resize()
    }

    calcMinMax(){
        const o = this.options
        let a = []

        for (let k in this.data) {
            let _data = this.data[k].data

            if (!Array.isArray(_data)) continue

            a.push(_data)
        }

        const [minX, maxX] = minMax(a, 'x')
        const [minY, maxY] = minMax(a, 'y')
        const [minZ, maxZ] = minMax(a, 'z')

        this.minX = o.boundaries && !isNaN(o.boundaries.minX) ? o.boundaries.minX : minX
        this.maxX = o.boundaries && !isNaN(o.boundaries.maxX) ? o.boundaries.maxX : maxX
        this.minY = o.boundaries && !isNaN(o.boundaries.minY) ? o.boundaries.minY : minY
        this.maxY = o.boundaries && !isNaN(o.boundaries.maxY) ? o.boundaries.maxY : maxY
        this.minZ = o.boundaries && !isNaN(o.boundaries.minZ) ? o.boundaries.minZ : minZ
        this.maxZ = o.boundaries && !isNaN(o.boundaries.maxZ) ? o.boundaries.maxZ : maxZ

        if (isNaN(this.minX)) this.minX = 0
        if (isNaN(this.maxX)) this.maxX = 100
        if (isNaN(this.minY)) this.minX = 0
        if (isNaN(this.maxY)) this.maxX = 100
        if (isNaN(this.minZ)) this.minX = 0
        if (isNaN(this.maxZ)) this.maxX = 100
    }

    calcRatio(){
        this.ratioX = this.viewWidth / (this.maxX === this.minX ? this.maxX : this.maxX - this.minX)
        this.ratioY = this.viewHeight / (this.maxY === this.minY ? this.maxY : this.maxY - this.minY)
        this.ratioZ = this.maxZ / (this.maxZ === this.minZ ? this.maxZ : this.maxZ - this.minZ)
    }

    lines(){
        const o = this.options, padding = expandPadding(o.padding)
        const ctx = this.ctx

        if (!this.data || ! this.data.length) return

        for (let i = 0; i < this.data.length; i++) {
            const graph = this.data[i]
            const color = o.colors[i]
            const [x, y, z] = graph.data
            let _x = Math.floor((x - this.minX) * this.ratioX + padding.left)
            let _y = Math.floor(this.viewHeight + padding.top - (y - this.minY) * this.ratioY)
            let _z = Math.floor(z * this.ratioZ)

            drawCircle(ctx,[_x, _y, _z], {fill: color, color: color})
        }
    }

    floatPoint(){
        if (!this.data || ! this.data.length) return
    }

    add(index, [x, y, z], shift = false){
        this.addPoint(index, [x, y, z], shift)

        if (x < this.minX) this.minX = x
        if (x > this.maxX) this.maxX = x

        if (y < this.minY) this.minY = y
        if (y > this.maxY) this.maxY = y

        if (z < this.minZ) this.minZ = z
        if (z > this.maxZ) this.maxZ = z

        this.resize()
    }

    draw(){
        super.draw()
        this.calcRatio()
        this.axisXY()
        this.lines()
        this.floatPoint()
        this.cross()
        this.legend()
    }
}

Object.assign(BubbleChart.prototype, MixinCross)
Object.assign(BubbleChart.prototype, MixinAxis)

export const bubbleChart = (el, data, options) => new BubbleChart(el, data, options)