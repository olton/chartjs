export const drawTriangle = (ctx, [x, y], {color = '#000', fill = '#fff', radius = 4, size = 1}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash([])
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    const d = radius

    ctx.moveTo(x, y - d);
    ctx.lineTo(x + d, y + d);
    ctx.lineTo(x - d, y + d);
    ctx.lineTo(x, y - d);

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}