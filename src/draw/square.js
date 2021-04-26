export const drawSquare = (ctx, [x, y, r], {color = '#000', fill = '#fff', size = 1, dash = []} = {}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash(dash)
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    ctx.rect(x - r, y - r, r * 2, r * 2)

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}