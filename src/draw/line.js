export const drawLine = (ctx, coords = [], {color = '#000', size = 1, dash = []}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash(dash)
    ctx.lineWidth = size
    ctx.strokeStyle = color

    coords.map(([x, y]) => {
        ctx.lineTo(x, y)
    })

    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}