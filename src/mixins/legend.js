import {isObject} from "../helpers/merge";
import {getTextBoxWidth} from "../helpers/get-textbox-width";
import {drawSquare} from "../draw/square";
import {drawText} from "../draw/text";
import {drawBox} from "../draw/box";

export const MixinLegend = {
    legend(){
        const o = this.options, legend = o.legend
        let lh, x, y, magic = 5, box = o.legend.font.size / 2
        const ctx = this.ctx
        const items = this.legendItems

        if (!legend || !isObject(legend)) return
        if (!items || !Array.isArray(items) || !items.length) return

        lh = legend.font.size * legend.font.lineHeight
        y = o.padding.top + this.viewHeight + legend.font.size + legend.padding.top + legend.margin.top
        x = o.padding.left + legend.padding.left + legend.margin.left

        for (let i = 0; i < items.length; i++) {
            let [name, color] = items[i]

            const nameWidth = getTextBoxWidth(ctx,[[name]], {font: legend.font})

            if (x + nameWidth > this.viewWidth) {
                x = o.padding.left + legend.padding.left + legend.margin.left
                y += lh
            }

            drawSquare(ctx, [x, y], {color, fill: color, radius: box})
            drawText(ctx, name, [x + box +magic, y + box / 2], {color: o.font.color, stroke: o.font.color, font: o.font})

            x += box + nameWidth + 20
        }
    },

    legendVertical(){
        const o = this.options, legend = o.legend, font = legend.font ?? o.font
        let lh, x, y, magic = 5, box = font.size / 2
        const ctx = this.ctx
        const items = this.legendItems
        let textBoxWidth, textBoxHeight

        if (!legend || !isObject(legend)) return
        if (!items || !Array.isArray(items) || !items.length) return

        lh = font.size * font.lineHeight
        x = o.padding.left + legend.margin.left
        y = o.padding.top + legend.margin.top

        textBoxWidth = getTextBoxWidth(ctx, items, {font}) + legend.padding.left + legend.padding.right + box * 3 + magic
        textBoxHeight = items.length * lh + legend.padding.top + legend.padding.bottom + magic

        drawBox(ctx, [x, y, textBoxWidth, textBoxHeight], {
            color: legend.color,
            dash: legend.dash,
            size: legend.border.width,
            borderColor: legend.border.color
        })

        x += box + magic + legend.padding.left
        y += box + magic + legend.padding.top

        for (let i = 0; i < items.length; i++) {
            let [name, color] = items[i]

            drawSquare(ctx, [x, y, box], {color, fill: color})
            drawText(ctx, name, [x + box +magic, y + box / 2 + 2], {color: o.font.color, stroke: o.font.color, font: legend.font})

            y += lh
        }
    }
}