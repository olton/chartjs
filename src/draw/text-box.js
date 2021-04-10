export const drawTextBox = (ctx, [x, y, w, h], {color = '#fff', borderColor = '#000', dash = [], size = 1}) => {
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = borderColor
    ctx.fillStyle = color
    ctx.setLineDash(dash)
    ctx.lineWidth = size
    ctx.clearRect(x, y, w, h)
    ctx.fillRect(x, y, w, h)
    if (size) ctx.strokeRect(x, y, w, h)
    ctx.closePath()
    ctx.restore()
}