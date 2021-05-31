import {Chart} from "../base"
import {merge} from "../../helpers/merge"
import {defaultSegmentOptions} from "../../defaults/segment"
import {drawRoundedRect} from "../../draw/rounded-rect"
import {expandPadding} from "../../helpers/expand-padding";
import {getFillColor} from "../../helpers/get-fill-colors";
import {defaultOptions} from "../../defaults/chart";

export class Segment extends Chart {
    constructor(el, data, options) {
        const values = Array.isArray(data) ? data : [data]
        const opt = merge({}, defaultOptions, defaultSegmentOptions, options)
        const padding = expandPadding(opt.padding)
        const {height, distance, rowDistance} = opt.segment
        let canvasHeight = (((height + rowDistance) * values.length - rowDistance) + (padding.top + padding.bottom)) * opt.dpi + rowDistance

        super(el, data, {...opt, height: canvasHeight}, 'segment')

        this.min = 0
        this.max = 100
        this.values = values

        this.resize()
    }

    segments(){
        const ctx = this.ctx, o = this.options, s = o.segment
        const count = s.count ? s.count : 20
        const distance = s.distance * o.dpi
        const rowDistance = s.rowDistance * o.dpi
        const width = this.viewWidth / count - (distance)
        const height = s.height
        const colors = []
        const padding = expandPadding(o.padding)
        let x, y = padding.top + distance

        if (typeof o.colors === "string") {
            colors.push([100, o.colors])
        } else if (Array.isArray(o.colors)) {
            for (let c of o.colors) {
                colors.push(c)
            }
        }

        for(let k = 0; k < this.values.length; k++) {
            const value = this.values[k]
            const limit = (count * value / 100)

            x = padding.left + 1

            for (let i = 0; i < count; i++) {
                const color = getFillColor(i * 100 / count, colors)
                if (i <= limit) {
                    drawRoundedRect(ctx, [x, y, width, height], {
                        color,
                        fill: color,
                        radius: s.radius
                    })
                } else {
                    if (o.ghost) {
                        drawRoundedRect(ctx, [x, y, width, height], {
                            color: o.ghost.color,
                            fill: o.ghost.color,
                            radius: s.radius
                        })
                    }
                }

                x += width + distance
            }

            y += height + rowDistance
        }
    }

    setData(data, index = 0, redraw = true){
        this.values[index] = data
        if (redraw) this.resize()
    }

    draw(){
        super.draw()
        this.segments()
    }
}

export const segment = (el, data, options) => new Segment(el, data, options)