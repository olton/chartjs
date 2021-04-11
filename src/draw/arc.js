import {deg2rad} from "../helpers/deg-to-rad";

export const drawArc = (ctx, [x, y, radius = 4, startAngle, endAngle], {color = '#000', fill = '#fff', size = 1}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash([])
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.fillStyle = fill

    ctx.arc(x, y, radius , deg2rad(startAngle), deg2rad(endAngle))
    ctx.lineTo(x, y)

    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}