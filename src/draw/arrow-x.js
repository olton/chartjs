export const drawArrowX = (ctx, [x1, y1, x2, y2, factorX, factorY], {color = '#000', dash = [], size = 1} = {}) => {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = size
    ctx.setLineDash(dash)

    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)

    ctx.moveTo(x2, y2)
    ctx.lineTo(x2 - factorX, y2 - factorY)
    ctx.moveTo(x2, y2)
    ctx.lineTo(x2 - factorX, y2 + factorY)

    ctx.stroke()
    ctx.closePath()
}