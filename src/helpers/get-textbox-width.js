export const getTextboxWidth = (ctx, items, {font = null}) => {
    let size = 0, w

    ctx.save()

    if (font) {
        const {style = 'normal', weight = 'normal', size = 12, lineHeight = 1.2, family = 'sans-serif'} = font
        ctx.font = `${style} ${weight} ${size}px/${lineHeight} ${family}`
    }

    for(let i = 0; i < items.length; i++) {
        w = ctx.measureText(items[i][0]).width
        if (w > size) size = w
    }

    ctx.restore()

    return size
}