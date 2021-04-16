export const drawCurve = (ctx, coords = [], {color = '#000', size = 1, dash = [], tension = 0.25}) => {
    ctx.beginPath()
    ctx.save()
    ctx.setLineDash(dash)
    ctx.lineWidth = size
    ctx.strokeStyle = color

    ctx.moveTo(coords[0][0], coords[0][1])
    for(let i = 0; i < coords.length-1; i ++) {
        let x_mid = (coords[i][0] + coords[i + 1][0]) / 2;
        let y_mid = (coords[i][1] + coords[i + 1][1]) / 2;
        let cp_x1 = (x_mid + coords[i][0]) / 2;
        //let cp_y1 = (y_mid + coords[i][1]) / 2;
        let cp_x2 = (x_mid + coords[i + 1][0]) / 2;
        //let cp_y2 = (y_mid + coords[i + 1][1]) / 2;

        ctx.quadraticCurveTo(cp_x1, coords[i][1], x_mid, y_mid);
        ctx.quadraticCurveTo(cp_x2, coords[i + 1][1], coords[i + 1][0], coords[i + 1][1]);
    }

    ctx.stroke()
    ctx.restore()
    ctx.closePath()
}