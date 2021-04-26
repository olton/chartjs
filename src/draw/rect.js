import {animate} from "../animation";

export const drawRect = (ctx, [x, y, w, h], {color = '#000', fill = '#fff', size = 1, dash = []} = {}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash(dash)
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    ctx.rect(x, y, w, h)

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}

export const drawRectAnimate = (ctx, [x, y, w, h], options, {duration = 1000, ease} = {}) => {
    animate({
        draw(progress){
            drawRect(ctx, [x, y, w, h * progress], options)
        },
        duration,
        ease
    })
}