export const drawCircle = (ctx, [x, y, r], {color = '#000', fill = '#fff', size = 1} = {}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash([])
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    ctx.arc(x, y, r, 0, 2 * Math.PI)

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}