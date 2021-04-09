export const drawRect = (ctx, [x, y, w, h], {color = '#000', fill = '#fff', size = 1, dash = []}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash(dash)
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    ctx.rect(x, y, w, h)

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}