import {drawArrowX} from "../draw/arrow-x";
import {drawVector} from "../draw/vector";
import {drawText} from "../draw/text";
import {drawArrowY} from "../draw/arrow-y";

export const MixinAxis = {
    arrowX(){
        const o = this.options, ctx = this.ctx
        const x1 = o.padding.left, y1 = this.viewHeight + o.padding.top
        const x2 = x1 + this.viewWidth, y2 = y1

        if (!o.axis.arrowX) return

        drawArrowX(ctx,[x1, y1, x2, y2, o.axis.arrowX.factorX, o.axis.arrowX.factorY], {
            color: o.axis.arrowX.color,
            size: o.axis.arrowX.size,
            dash: o.axis.arrowX.dash
        })
    },

    axisX(){
        const ctx = this.ctx, o = this.options, axis = o.axis, lines = axis.lines
        const step = this.viewWidth / axis.linesX
        const textStep = (this.maxX - this.minX) / axis.linesX
        const font = (axis && axis.font) ?? o.font
        const skipLabels = Math.round(axis.linesX / axis.labelsX)

        if (!axis.showXAxis) return

        for (let i = 0; i < o.axis.linesX + 1; i++) {
            let x = step * i + o.padding.left
            let labelXValue = this.minX + textStep * i

            if (axis.linesX) {
                drawVector(
                    ctx,
                    [x, o.padding.top, x, this.viewHeight + o.padding.top],
                    {
                        color: lines.color,
                        size: lines.size,
                        dash: lines.dash
                    }
                )
            }

            if (!axis.showXLabels) continue
            if (skipLabels && i && i % skipLabels !== 0) continue

            if (typeof o.axis.onDrawLabelX === "function") {
                labelXValue = o.axis.onDrawLabelX.apply(null, [labelXValue])
            }

            if (x + ctx.measureText(labelXValue.toString()).width > this.viewWidth) continue

            drawText(
                ctx,
                labelXValue.toString(),
                [x, this.viewHeight + o.padding.top + font.size + 5],
                {
                    align: 'start',
                    font
                }
            )

        }
    },

    arrowY(){
        const o = this.options, ctx = this.ctx
        const x1 = o.padding.left, y1 = this.viewHeight + o.padding.top
        const x2 = x1, y2 = o.padding.top

        if (!o.axis.arrowY) return

        drawArrowY(ctx, [x1, y1, x2, y2, o.axis.arrowX.factorX, o.axis.arrowX.factorY], {
            color: o.axis.arrowY.color,
            size: o.axis.arrowY.size,
            dash: o.axis.arrowY.dash
        })
    },

    axisY(){
        const ctx = this.ctx, o = this.options, axis = o.axis, lines = axis.lines
        const {fixed = 0} = o.value.fixed
        const step = this.viewHeight / o.axis.linesY
        const textStep = (this.maxY - this.minY) / o.axis.linesY
        const font = (axis && axis.font) ?? o.font
        const skipLabels = Math.floor(axis.linesY / axis.labelsY)

        if (!axis.showYAxis) return

        for (let i = 0; i < o.axis.linesY + 1; i++) {
            const y = this.viewHeight + o.padding.top - step * i
            const x = o.padding.left
            let labelYValue = this.minY + textStep * i

            if (axis.linesY) {
                drawVector(ctx, [x, y, this.viewWidth + o.padding.left, y], {
                    color: lines.color,
                    size: lines.size,
                    dash: lines.dash
                })
            }

            if (!axis.showYLabels) continue
            if (skipLabels && i && i % skipLabels !== 0) continue

            if (typeof o.axis.onDrawLabelY === "function") {
                labelYValue = o.axis.onDrawLabelY.apply(null, [labelYValue])
            }

            drawText(
                ctx,
                labelYValue.toString(),
                [o.padding.left - 5, y],
                {
                    align: 'right',
                    font
                }
            )
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