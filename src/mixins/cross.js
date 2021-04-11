export const MixinCross = {
    cross(){
        const o = this.options, cross = o.cross
        const ctx = this.ctx
        const rect = this.canvas.getBoundingClientRect()

        if (!o.cross || (o.cross && !this.proxy.mouse)) return

        let {x, y} = this.proxy.mouse

        x -= rect.left
        y -= rect.top

        if ((x - o.padding.left + 1 < 0) || (x > this.viewWidth + o.padding.left + 1)) return
        if ((y - o.padding.top + 1 < 0) || (y > this.viewHeight + o.padding.top + 1)) return

        ctx.beginPath()
        ctx.setLineDash(o.cross.dash)
        ctx.lineWidth = cross.size
        ctx.strokeStyle = cross.color

        // vertical line
        ctx.moveTo(x, o.padding.top)
        ctx.lineTo(x, this.viewHeight + o.padding.top)

        // Horizontal line
        ctx.moveTo(o.padding.left, y)
        ctx.lineTo(this.viewWidth + o.padding.left, y)

        ctx.arc(x, y, 10, 0, 2 * Math.PI)

        ctx.stroke()
        ctx.closePath()
    }
}