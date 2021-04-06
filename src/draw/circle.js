export const circle = (ctx, [x, y], {color = '#000', fill = '#fff', radius = 4, size = 1}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash([])
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    ctx.arc(x, y, radius, 0, 2 * Math.PI)

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}