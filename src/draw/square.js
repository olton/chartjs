export const drawSquare = (ctx, [x, y], {color = '#000', fill = '#fff', radius = 4, size = 1, dash = []}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash(dash)
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    ctx.rect(x - radius, y - radius, radius * 2, radius * 2)

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}