import {drawArrowX} from "../draw/arrow-x";
import {drawVector} from "../draw/vector";
import {drawText} from "../draw/text";
import {drawArrowY} from "../draw/arrow-y";
import {expandPadding} from "../helpers/expand-padding";

export const MixinAxis = {
    arrowX(){
        const o = this.options, ctx = this.ctx
        const padding = expandPadding(o.padding)
        const x1 = padding.left, y1 = this.viewHeight + padding.top
        const x2 = x1 + this.viewWidth, y2 = y1

        if (!o.axis.x.arrow) return

        const arrow = o.axis.x.arrow

        drawArrowX(ctx,[x1, y1, x2, y2, arrow.factorX, arrow.factorY], {
            color: arrow.color,
            size: arrow.size,
            dash: arrow.dash
        })
    },

    axisX(){
        const ctx = this.ctx, o = this.options
        const padding = expandPadding(o.padding)

        if (!o.axis.x) return

        console.log(this.maxX, this.minX)

        const axis = o.axis.x
        const font = (axis && axis.label && axis.label.font) ?? o.font
        const step = this.viewWidth / axis.line.count
        const textStep = (this.maxX - this.minX) / axis.line.count
        const skipLabels = Math.round(axis.line.count / axis.label.count)

        for (let i = 0; i <= axis.line.count; i++) {
            let x = step * i + padding.left
            let labelXValue = this.minX + textStep * i

            if (typeof axis.label.fixed === "number") {
                labelXValue = labelXValue.toFixed(axis.label.fixed)
            }

            if (axis.line.show) {
                drawVector(ctx,[x, padding.top, x, this.viewHeight + padding.top], {
                    color: axis.line.color,
                    size: axis.line.size,
                    dash: axis.line.dash
                })
            }

            if (!axis.label.show) continue
            if (skipLabels && i && i % skipLabels !== 0) continue
            if (!axis.label.min && labelXValue === this.minX) continue

            if (typeof o.onDrawLabelX === "function") {
                labelXValue = o.onDrawLabelX.apply(null, [labelXValue])
            }


            // if (x + ctx.measureText(labelXValue.toString()).width > this.viewWidth) continue

            drawVector(ctx,[x, this.viewHeight + padding.top, x, this.viewHeight + padding.top + 5], {})
            drawText(
                ctx,
                labelXValue.toString(),
                [x, this.viewHeight + padding.top + font.size + 5],
                {
                    align: 'center',
                    font
                }
            )

        }
    },

    arrowY(){
        const o = this.options, ctx = this.ctx
        const padding = expandPadding(o.padding)
        const x1 = padding.left, y1 = this.viewHeight + padding.top
        const x2 = x1, y2 = padding.top

        if (!o.axis.y.arrow) return

        const arrow = o.axis.y.arrow

        drawArrowY(ctx, [x1, y1, x2, y2, arrow.factorX, arrow.factorY], {
            color: arrow.color,
            size: arrow.size,
            dash: arrow.dash
        })
    },

    axisY(){
        const ctx = this.ctx, o = this.options
        const padding = expandPadding(o.padding)

        if (!o.axis.y) return

        const axis = o.axis.y
        const font = (axis && axis.label && axis.label.font) ?? o.font
        const step = this.viewHeight / axis.line.count
        const textStep = (this.maxY - this.minY) / axis.line.count
        const skipLabels = Math.floor(axis.line.count / axis.label.count)

        for (let i = 0; i < axis.line.count + 1; i++) {
            const y = this.viewHeight + padding.top - step * i
            const x = padding.left
            let labelYValue = this.minY + textStep * i

            if (typeof axis.label.fixed === "number") {
                labelYValue = labelYValue.toFixed(axis.label.fixed)
            }

            if (axis.line.show) {
                drawVector(ctx, [x, y, this.viewWidth + padding.left, y], {
                    color: axis.line.color,
                    size: axis.line.size,
                    dash: axis.line.dash
                })
            }

            if (!axis.label.show) continue
            if (skipLabels && i && i % skipLabels !== 0) continue
            if (!axis.label.min && labelYValue === this.minY) continue

            if (typeof o.onDrawLabelY === "function") {
                labelYValue = o.onDrawLabelY.apply(null, [labelYValue])
            }

            drawVector(ctx, [x-5, y, x, y], {})
            drawText(ctx, labelYValue.toString(),[padding.left - 10, y + font.size / 2 - 2], {
                align: 'right',
                font
            })
        }
    },

    axisXY(){
        const o = this.options

        if (!o.axis) return

        this.axisX()
        this.arrowX()

        this.axisY()
        this.arrowY()

        return this
    }
}