import {Chart} from "../../core"
import {minMax} from "../../helpers/min-max"
import {circle} from "../../draw/circle";
import {lineTo} from "../../draw/line";
import {square} from "../../draw/square";
import {triangle} from "../../draw/triangle";
import {diamond} from "../../draw/diamond";

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

            if (o.showLines) {
                lineTo(ctx, coords, {color: line.color, size: line.size})
            }

            let dots = line.dots ? line.dots : {
                type: 'dot', // dot, square, triangle
            }
            let opt = {
                color: dots.color ?? line.color,
                fill: dots.fill ?? line.color,
                radius: dots.size || 4,
            }

            let drawPointFn

            switch (dots.type) {
                case 'square':
                    drawPointFn = square
                    break
                case 'triangle':
                    drawPointFn = triangle
                    break
                case 'diamond':
                    drawPointFn = diamond
                    break
                default: drawPointFn = circle
            }

            if (line.dots) {
                coords.map(([x, y]) => {
                    drawPointFn(ctx, [x, y], opt)
                })

                if (this.proxy.mouse) {
                    const {x: mx, y: my} = this.proxy.mouse

                    for (const [x, y] of coords) {
                        const lx = x - 10, rx = x + 10
                        const ly = y - 10, ry = y + 10

                        if ((mx > lx && mx < rx) && (my > ly && my < ry)) {
                            drawPointFn(ctx, [x, y], {color: opt.color, radius: opt.radius * 2})
                            break
                        }
                    }
                }
            }
        }
    }

    draw(){
        this.clear()
        this.drawTitle()
        this.drawAxis()
        this.drawData()
        this.drawCross()
    }
}

export const lineChart = (el, data, options) => new LineChart(el, data, options)