export const drawArea = (ctx, coords = [], {color = '#000', size = 1, dash = []}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash(dash)
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = color

    coords.map(([x, y]) => {
        ctx.lineTo(x, y)
    })
    ctx.lineTo(coords[0][0], coords[0][1])

    ctx.fill()
    ctx.restore()
    ctx.closePath()
}