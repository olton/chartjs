export const drawVector = (ctx, [x1, y1, x2, y2], {color = '#000', size = 1, dash = []} = {}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash(dash)
    ctx.lineWidth = size
    ctx.strokeStyle = color

    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)

    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}