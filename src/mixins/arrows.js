import {expandPadding} from "../helpers/expand-padding";
import {drawArrowX} from "../draw/arrow-x";
import {drawArrowY} from "../draw/arrow-y";

export const MixinArrows = {
    arrowX(){
        const o = this.options, ctx = this.ctx
        const padding = expandPadding(o.padding)

        if (!o.arrows.x) return

        const arrow = o.arrows.x
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

    arrowY(){
        const o = this.options, ctx = this.ctx
        const padding = expandPadding(o.padding)

        if (!o.arrows.y) return

        const arrow = o.arrows.y
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

    arrows(){
        if (!this.options.arrows) return

        this.arrowX()
        this.arrowY()

        return this
    }
}