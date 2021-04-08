import {DPI} from "../defaults/const";

export const diamond = (ctx, [x, y], {color = '#000', fill = '#fff', radius = 1, size = 1}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash([])
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    let r = radius

    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - r, y);
    ctx.lineTo(x, y - r);

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}