import {Chart} from "../../core"
import {minMax} from "../../helpers/min-max"

export class LineChart extends Chart {
    constructor(el, data = [], options = {}) {
        super(el, data, options)

        this.coords = {}
        this.calcMinMax()
        this.draw()
    }

    calcMinMax(){
        let a = [], b = 0

        for (let k in this.data) {
            let _data = this.data[k].data

            if (!Array.isArray(_data)) continue

            if (b < _data.length) b = _data.length

            for( const [x, y] of _data) {
                a.push([x, y])
            }
        }

        const [minX, maxX] = minMax(a, 'x')
        const [minY, maxY] = minMax(a, 'y')

        this.minX = minX
        this.maxX = maxX
        this.minY = minY
        this.maxY = maxY
        this.count = b

        this.ratioX = this.viewWidth / (this.maxX - this.minX)
        this.ratioY = this.viewHeight / (this.maxY - this.minY)

        return this
    }

    drawData(){
        const o = this.options
        const ctx = this.ctx
        let coords

        for (const line of this.data) {

            coords = []

            for (const [x, y] of line.data) {
                let _x = Math.floor((x - this.minX) * this.ratioX + o.padding.left)
                let _y = Math.floor(this.viewHeight + o.padding.top - (y - this.minY) * this.ratioY)

                coords.push([_x, _y])
            }

            this.coords[line.color] = coords

            ctx.lineWidth = line.size
            ctx.strokeStyle = line.color
            ctx.fillStyle = line.color
            ctx.setLineDash([])

            if (o.showLines) {
                ctx.beginPath()

                coords.map( ([x, y]) => {
                    ctx.lineTo(x, y)
                })

                ctx.stroke()
                ctx.closePath()
            }

            if (o.dots) {
                coords.map(([x, y]) => {
                    ctx.beginPath()
                    ctx.setLineDash([])

                    ctx.arc(x, y, o.dots.size, 0, 2 * Math.PI)

                    ctx.fill()
                    ctx.stroke()
                    ctx.closePath()
                })
            }
        }

    }

    draw(){
        this.clear()
        this.drawTitle()
        this.drawAxis()
        this.drawData()
        this.drawCross()
        this.drawPoints()
    }

    drawPoints(){
        const ctx = this.ctx

        if (!this.proxy.mouse) return

        const {x, y} = this.proxy.mouse
    }
}

export const lineChart = (el, data, options) => new LineChart(el, data, options)