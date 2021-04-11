export const drawText = (ctx, text, [x, y], {align = 'left', color = '#000', stroke = '#000', font}) => {
    const {
        style = 'normal',
        weight = 'normal',
        size = 12,
        lineHeight = 1,
        family = 'sans-serif'
    } = font

    ctx.save()
    ctx.beginPath()
    ctx.textAlign = align
    ctx.fillStyle = color
    ctx.strokeStyle = stroke
    ctx.font = `${style} ${weight} ${size}px/${lineHeight} ${family}`

    const lines = text.toString().split('\n')

    lines.map( (str, i) => {
        ctx.fillText(str, x, y + (y * i * lineHeight))
    })

    ctx.closePath()
    ctx.restore()
}