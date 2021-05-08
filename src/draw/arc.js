export const drawArc = (ctx, [x, y, radius, startAngle, endAngle], {stroke = '#000', fill = '#fff', size = 1, dash = []} = {}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash(dash)
    ctx.lineWidth = size
    ctx.strokeStyle = stroke
    ctx.fillStyle = fill

    ctx.arc(x, y, radius , startAngle, endAngle)

    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}
