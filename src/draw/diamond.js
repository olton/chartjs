export const diamond = (ctx, [x, y], {color = '#000', fill = '#fff', radius = 4, size = 1}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash([])
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    ctx.moveTo(x, y - radius);
    ctx.lineTo(x + radius, y);
    ctx.lineTo(x, y + radius);
    ctx.lineTo(x - radius, y);

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}