export const drawCandle = (ctx, [x, y, h, by, bw, bh], {color = 'red', size = 1, leg = false} = {}) => {

    ctx.beginPath()
    ctx.save()
    ctx.setLineDash([])
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = color

    ctx.moveTo(x, y)
    ctx.lineTo(x, y + h)

    if (leg) {
        ctx.moveTo(x - bw / 2, y)
        ctx.lineTo(x + bw / 2, y)

        ctx.moveTo(x - bw / 2, y + h)
        ctx.lineTo(x + bw / 2, y + h)
    }

    ctx.rect(x - bw / 2, by, bw, bh)

    ctx.stroke()
    ctx.fill()
    ctx.restore()
    ctx.closePath()
}