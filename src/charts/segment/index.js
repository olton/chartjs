import {Chart} from "../base"
import {merge} from "../../helpers/merge"
import {defaultSegmentOptions} from "../../defaults/segment"
import {drawRoundedRect} from "../../draw/rounded-rect"
import {expandPadding} from "../../helpers/expand-padding";
import {getFillColor} from "../../helpers/get-fill-colors";

export class Segment extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultSegmentOptions, options), 'segment')

        this.min = 0
        this.max = 100

        if (this.options.segment.height !== "auto") {
            const o = this.options
            const s = o.segment
            const rowDistance = s.rowDistance * o.dpi

            this.options.height = this.data.length * (rowDistance + 1 + s.height)
        }

        this.resize()
    }

    segments(){
        const ctx = this.ctx, o = this.options, s = o.segment
        const count = s.count ? s.count : 20
        const distance = s.distance * o.dpi
        const rowDistance = s.rowDistance * o.dpi
        const width = this.viewWidth / count - (distance)
        const colors = []
        const padding = expandPadding(o.padding)
        let x, y = padding.top + distance
        let height

        if (s.height === 'auto') {
            height = (o.height - rowDistance * (this.data.length)) / this.data.length
        } else {
            height = s.height
        }

        if (typeof o.colors === "string") {
            colors.push([100, o.colors])
        } else if (Array.isArray(o.colors)) {
            for (let c of o.colors) {
                colors.push(c)
            }
        }

        for(let k = 0; k < this.data.length; k++) {
            const value = this.data[k]
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
        this.data[index] = data
        if (redraw) this.resize()
    }

    draw(){
        super.draw()
        this.segments()
    }
}

export const segment = (el, data, options) => new Segment(el, data, options)