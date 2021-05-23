import {Chart} from "../base";
import {merge} from "../../helpers/merge";
import {defaultGaugeOptions} from "../../defaults/gauge";
import {expandPadding} from "../../helpers/expand-padding";
import {drawText} from "../../draw/text";
import {drawArc} from "../../draw/arc";

export class Gauge extends Chart {
    constructor(el, data, options) {
        super(el, data, merge({}, defaultGaugeOptions, options), 'gauge')

        this.min = this.options.boundaries.min
        this.max = this.options.boundaries.max

        this.resize()
    }

    _getFillColor(p, colors) {
        let res = '#fff', min = 0

        for (let i = 0; i < colors.length; i++) {
            let c = colors[i][0]

            if (p> min && p <= c) {
                res = colors[i][1]
                min = colors[i][0]
            }
        }

        return res
    }

    gauge(){
        const ctx = this.ctx, o = this.options, padding = expandPadding(o.padding)
        let [x, y] = this.center

        x += padding.left
        y += padding.top

        const PI = Math.PI, min = PI * o.startFactor, max = PI * (2 + o.endFactor)
        const r = o.radius * this.radius / 100 - o.backWidth
        let v = this.data[0], p = Math.round(Math.abs(100 * (v - this.min) / (this.max - this.min)))
        const val = min+(max-min)*p/100
        let textVal = p
        let colors = []

        if (typeof o.onDrawValue === 'function') {
            textVal = o.onDrawValue.apply(null, [v, p])
        }

        drawArc(ctx, [x, y, r, min, max], {size: o.backWidth, stroke: o.backStyle})

        if (typeof o.fillStyle === "string") {
            colors.push([100, o.fillStyle])
        } else if (Array.isArray(o.fillStyle)) {
            for (let c of o.fillStyle) {
                colors.push(c)
            }
        }
        drawArc(ctx, [x, y, r, min, val], {size: o.valueWidth, stroke: this._getFillColor(p, colors)})

        drawText(ctx, textVal,[0, 0], {
            align: "center",
            baseLine: "middle",
            color: o.value.color,
            stroke: o.value.color,
            font: o.value.font || o.font,
            translate: [x + o.value.shift.x, y + o.value.shift.y],
            angle: o.value.angle
        })

        if (o.label.min) {
            drawText(ctx, o.boundaries.min, [0, 0], {
                align: "left",
                baseLine: "middle",
                color: o.label.min.color,
                stroke: o.label.min.color,
                font: o.label.min.font || o.font,
                translate: [x + r * Math.cos(min) + o.backWidth + o.label.min.shift.x, y + r * Math.sin(min) + o.label.min.shift.y],
                angle: 0
            })
        }

        if (o.label.max) {
            drawText(ctx, o.boundaries.max, [0, 0], {
                align: "right",
                baseLine: "middle",
                color: o.label.max.color,
                stroke: o.label.max.color,
                font: o.label.max.font || o.font,
                translate: [x + r * Math.cos(max) - o.backWidth + o.label.max.shift.x, y + r * Math.sin(max) + o.label.max.shift.y],
                angle: 0
            })
        }
    }

    draw(){
        super.draw()
        this.gauge()
    }
}

export const gauge = (el, data, options) => new Gauge(el, data, options)