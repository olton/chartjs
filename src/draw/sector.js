export const drawSector = (ctx, [x, y, radius = 4, startAngle, endAngle], {color = '#000', fill = '#fff', size = 1} = {}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash([])
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    ctx.arc(x, y, radius , startAngle, endAngle)
    ctx.lineTo(x, y)

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}