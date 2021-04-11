export const MixinTooltip = {
    showTooltip(data, graph){
        const o = this.options

        if (this.tooltip) {
            this.tooltip.remove()
            this.tooltip = null
        }

        if (!o.tooltip) return

        let {x, y} = this.proxy.mouse
        const tooltip = document.createElement("div")
        const onShow = o.tooltip.onShow
        const font = o.tooltip.font
        const shadow = o.tooltip.shadow
        const border = o.tooltip.border
        const padding = o.tooltip.padding

        tooltip.style.position = 'fixed'
        tooltip.style.border = `${border.width}px ${border.lineType} ${border.color}`
        tooltip.style.borderRadius = `${border.radius}`
        tooltip.style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
        tooltip.style.background = `${o.tooltip.background}`
        tooltip.style.font = `${font.style} ${font.weight} ${font.size}px/${font.lineHeight} ${font.family}`
        tooltip.style.boxShadow = `${shadow.shiftX}px ${shadow.shiftY}px ${shadow.blur}px ${shadow.color}`

        tooltip.innerHTML = onShow && typeof onShow === 'function' ? onShow.apply(null, [data, graph]) : data

        document.querySelector('body').appendChild(tooltip)

        tooltip.style.top = `${y - tooltip.clientHeight - 15}px`
        tooltip.style.left = `${x - tooltip.clientWidth / 2 - 5}px`

        this.tooltip = tooltip
    }
}