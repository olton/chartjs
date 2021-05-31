import {drawArrowX} from "../draw/arrow-x";
import {drawVector} from "../draw/vector";
import {drawText} from "../draw/text";
import {drawArrowY} from "../draw/arrow-y";
import {expandPadding} from "../helpers/expand-padding";

export const MixinAxis = {
    arrowX(){
        const o = this.options, ctx = this.ctx
        const padding = expandPadding(o.padding)

        if (!o.axis.x.arrow) return

        const arrow = o.axis.x.arrow
        const x1 = padding.left, y1 = this.viewHeight + padding.top
        const x2 = padding.left + this.viewWidth + arrow.outside, y2 = y1

        drawArrowX(
            ctx,
            [x1, y1, x2, y2, arrow.factorX, arrow.factorY],
            {
                color: arrow.color,
                size: arrow.size,
                dash: arrow.dash
            }
        )
    },

    axisX(){
        const ctx = this.ctx, o = this.options
        const padding = expandPadding(o.padding)

        if (!o.axis.x) return

        const axis = o.axis.x, label = axis.label, line = axis.line, arrow = axis.arrow
        const font = (label && label.font) ?? o.font
        const labelStep = label.count ? (this.maxX - this.minX) / label.count : 0
        let labelValue, value, k, x, y, labelY, shortLineSize = line.shortLineSize ?? 0

        x = padding.left
        y = padding.top
        labelY = padding.top + this.viewHeight + font.size + 5
        value = this.minX
        k = 0
        for (let i = 0; i <= label.count; i++) {
            labelValue = typeof label.fixed === "number" ? value.toFixed(label.fixed) : value
            if (typeof o.onDrawLabelX === "function") {
                labelValue = o.onDrawLabelX.apply(null, [value])
            }

            if (label.showLine) {
                drawVector(
                    ctx,
                    [x, y, x, y + this.viewHeight],
                    {
                        color: line.color,
                        size: line.size,
                        dash: line.dash
                    }
                )
            }

            if (label.skip && k !== label.skip) {
                k++
            } else {
                k = 1

                if (label.showLabel && !(!i && !label.showMin)) {
                    // short line
                    drawVector(
                        ctx,
                        [x, this.viewHeight + padding.top - shortLineSize, x, this.viewHeight + padding.top + shortLineSize],
                        {
                            color: (arrow && arrow.color) ? arrow.color : line.color,
                        }
                    )

                    // label
                    drawText(
                        ctx,
                        labelValue.toString(),
                        [0, 0],
                        {
                            color: label.color ?? o.color,
                            align: label.align,
                            font,
                            translate: [x + (label.shift.x ?? 0), labelY + (label.shift.y ?? 0)],
                            angle: label.angle
                        }
                    )
                }
            }

            value += labelStep
            x = padding.left + (value - this.minX) * this.ratioX
        }
    },

    arrowY(){
        const o = this.options, ctx = this.ctx
        const padding = expandPadding(o.padding)

        if (!o.axis.y.arrow) return

        const arrow = o.axis.y.arrow
        const x = padding.left, y1 = this.viewHeight + padding.top
        const y2 = padding.top - arrow.outside

        drawArrowY(
            ctx,
            [x, y1, x, y2, arrow.factorX, arrow.factorY],
            {
                color: arrow.color,
                size: arrow.size,
                dash: arrow.dash
            }
        )
    },

    axisY(){
        const ctx = this.ctx, o = this.options
        const padding = expandPadding(o.padding)

        if (!o.axis.y) return

        const axis = o.axis.y, label = axis.label, line = axis.line, arrow = axis.arrow
        const font = (label && label.font) ?? o.font
        const labelStep = label.count ? (this.maxY - this.minY) / label.count : 0
        let labelValue, value, k, x, y, labelX, shortLineX
        const shortLineSize = line.shortLineSize ?? 0

        x = padding.left
        labelX = padding.left
        y = this.viewHeight + padding.top
        value = this.minY
        k = 0

        if (label.opposite) {
            labelX += this.viewWidth + 10 + shortLineSize
            shortLineX = padding.left + this.viewWidth
            label.align = 'left'
        } else {
            labelX -= 10
            shortLineX = x - shortLineSize
        }

        for (let i = 0; i < label.count + 1; i++) {
            labelValue = typeof label.fixed === "number" ? value.toFixed(label.fixed) : value
            if (typeof o.onDrawLabelY === "function") {
                labelValue = o.onDrawLabelY.apply(null, [value])
            }

            if (label.showLine) {
                drawVector(ctx, [x, y, this.viewWidth + padding.left, y], {
                    color: line.color,
                    size: line.size,
                    dash: line.dash
                })
            }

            if (i !== 0 && label.skip && k !== label.skip) {
                k++
            } else {
                k = 1

                if (label.showLabel && !(!i && !label.showMin)) {

                    // short line
                    drawVector(
                        ctx,
                        [shortLineX, y, shortLineX + shortLineSize * 2, y],
                        {
                            color: (arrow && arrow.color) ? arrow.color : line.color,
                        }
                    )

                    drawText(
                        ctx,
                        labelValue.toString(),
                        [0, 0],
                        {
                            color: (label && label.color) ?? o.color,
                            align: label.align,
                            font,
                            translate: [labelX + (label.shift.x ?? 0), y + 1 + (label.shift.y ?? 0)],
                            angle: label.angle
                        }
                    )
                }
            }

            value += labelStep
            y = padding.top + this.viewHeight - (value - this.minY) * this.ratioY
        }
    },

    axisXY(){
        if (!this.options.axis) return

        this.axisX()
        this.arrowX()

        this.axisY()
        this.arrowY()

        return this
    }
}