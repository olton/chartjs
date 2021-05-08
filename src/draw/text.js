export const drawText = (ctx, text, [x, y], {align = 'left', baseLine = 'middle', color = '#000', stroke = '#000', font, angle = 0, translate = [0,0]} = {}) => {
    const {
        style = 'normal',
        weight = 'normal',
        size = 12,
        lineHeight = 1,
        family = 'sans-serif'
    } = font

    let tX = 0, tY = 0

    if (typeof translate === "number") {
        tX = tY = translate
    } else if (Array.isArray(translate)) {
        [tX, tY] = translate
    }

    ctx.save()
    ctx.beginPath()
    ctx.textAlign = align
    ctx.fillStyle = color
    ctx.strokeStyle = stroke
    ctx.font = `${style} ${weight} ${size}px/${lineHeight} ${family}`
    ctx.translate(tX, tY)
    ctx.rotate(angle)
    ctx.textBaseline = baseLine

    const lines = text.toString().split('\n')

    lines.map( (str, i) => {
        ctx.fillText(str, x, y + (y * i * lineHeight))
    })

    ctx.closePath()
    ctx.restore()
}