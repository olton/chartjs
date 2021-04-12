import {expandPadding} from "../helpers/expand-padding";

export const MixinCross = {
    cross(){
        const o = this.options, cross = o.cross
        const padding = expandPadding(o.padding)
        const ctx = this.ctx
        const rect = this.canvas.getBoundingClientRect()

        if (!o.cross || (o.cross && !this.proxy.mouse)) return

        let {x, y} = this.proxy.mouse

        x -= rect.left
        y -= rect.top

        if ((x - padding.left + 1 < 0) || (x > this.viewWidth + padding.left + 1)) return
        if ((y - padding.top + 1 < 0) || (y > this.viewHeight + padding.top + 1)) return

        ctx.beginPath()
        ctx.setLineDash(o.cross.dash)
        ctx.lineWidth = cross.size
        ctx.strokeStyle = cross.color

        // vertical line
        ctx.moveTo(x, padding.top)
        ctx.lineTo(x, this.viewHeight + padding.top)

        // Horizontal line
        ctx.moveTo(padding.left, y)
        ctx.lineTo(this.viewWidth + padding.left, y)

        ctx.arc(x, y, 10, 0, 2 * Math.PI)

        ctx.stroke()
        ctx.closePath()
    }
}