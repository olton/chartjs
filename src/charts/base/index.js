import {defaultOptions} from "../../defaults/chart"
import {isObject, merge} from "../../helpers/merge";
import {drawText} from "../../draw/text";
import {drawSquare} from "../../draw/square";
import {getTextboxWidth} from "../../helpers/get-textbox-width";
import {drawTextBox} from "../../draw/text-box";

export class Chart {
    constructor(el, data, options = {}, type = 'unknown') {
        this.options = merge({}, defaultOptions, options)
        this.data = data
        this.el = document.querySelector(el)
        this.canvas = null
        this.ctx = null
        this.raf = null
        this.tooltip = null
        this.minX = 0
        this.maxX = 0
        this.minY = 0
        this.maxY = 0
        this.legendItems = []
        this.chartType = type

        const that = this

        this.proxy = new Proxy({}, {
            set(...args) {
                const result = Reflect.set(...args)
                that.raf = requestAnimationFrame(that.draw.bind(that))
                return result
            }
        })

        if (!this.el) {
            throw new Error("You must define a selector for chart wrapper element!")
        }

        if (this.options.border) {
            this.el.style.border = `${this.options.border.width}px ${this.options.border.lineType} ${this.options.border.color}`
        }

        this.calcInternalValues()
        this.createCanvas()
        this.addEvents()
    }

    createCanvas(){
        this.canvas = document.createElement("canvas")
        this.el.innerHTML = ""
        this.el.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        this.setCanvasSize()
    }

    setCanvasSize(){
        const o = this.options

        this.canvas.style.height = this.height + 'px'
        this.canvas.style.width = this.width + 'px'
        this.canvas.width = o.dpi * this.width
        this.canvas.height = o.dpi * this.height
    }

    calcInternalValues(){
        let width, height
        const o = this.options
        const rect = this.el.getBoundingClientRect();
        const {width: elWidth, height: elHeight} = rect

        width = o.width.toString().includes('%') ? elWidth / 100 * parseInt(o.width) : +o.width
        height = o.height.toString().includes('%') ? elHeight / 100 * parseInt(o.height) : +o.height

        this.width = width
        this.height = height
        this.dpiHeight = o.dpi * height
        this.dpiWidth = o.dpi * width
        this.viewHeight = this.dpiHeight - (o.padding.top + o.padding.bottom)
        this.viewWidth = this.dpiWidth - (o.padding.left + o.padding.right)
    }

    calcRatio(){
        this.ratioX = this.viewWidth / (this.maxX - this.minX)
        this.ratioY = this.viewHeight / (this.maxY - this.minY)
    }

    drawArrowX(){
        const o = this.options, ctx = this.ctx
        const top = o.padding.top, left = o.padding.left
        const x = this.viewWidth + left, y = this.viewHeight + top

        ctx.beginPath()
        ctx.strokeStyle = o.axis.arrowX.color

        ctx.moveTo(left, y)
        ctx.lineTo(x, y)

        ctx.moveTo(x, y)
        ctx.lineTo(x - 15, y - 5)
        ctx.moveTo(x, y)
        ctx.lineTo(x - 15, y + 5)

        ctx.stroke()
        ctx.closePath()
    }

    drawArrowY(){
        const o = this.options, ctx = this.ctx
        const top = o.padding.top, left = o.padding.left
        const x = left, y = this.viewHeight + top

        ctx.beginPath()
        ctx.strokeStyle = o.axis.arrowY.color

        ctx.moveTo(x, top)
        ctx.lineTo(x, y)

        ctx.moveTo(x, top)
        ctx.lineTo(x - 5, top + 15)
        ctx.moveTo(x, top)
        ctx.lineTo(x + 5, top + 15)

        ctx.stroke()
        ctx.closePath()
    }

    drawAxisY(){
        const o = this.options, {fixed = 0} = o.value.fixed
        const step = this.viewHeight / o.axis.linesY
        const textStep = (this.maxY - this.minY) / o.axis.linesY
        const ctx = this.ctx

        ctx.strokeStyle = o.axis.lineColor
        ctx.textAlign = 'end'
        ctx.beginPath()

        for (let i = 0; i <= o.axis.linesY; i++) {
            const y = step * i + o.padding.top
            const x = this.viewWidth + o.padding.left
            let printY = this.maxY - textStep * i

            if (typeof o.axis.onDrawLabelY === "function") {
                printY = o.axis.onDrawLabelY.apply(null, [printY])
            }

            printY = printY.toFixed(fixed)

            if (o.axis.showYLines) {
                ctx.moveTo(o.padding.left, y)
                ctx.lineTo(x, y)
            }

            if (o.axis.showYLabel) {
                if (o.axis.showMinMax) {
                    if (i === 0  || i === o.axis.linesY)
                        ctx.fillText(printY.toString(), o.padding.left - 5, y - 5)
                } else {
                    if (i !== 0)
                        ctx.fillText(printY.toString(), o.padding.left - 5, y - 5)
                }
            }
        }

        ctx.stroke()
        ctx.closePath()
    }

    drawAxisX(){
        const o = this.options
        const step = this.viewWidth / o.axis.linesX
        const textStep = (this.maxX - this.minX) / o.axis.linesX
        const ctx = this.ctx
        const font = (o.axis && o.axis.font) ?? o.font

        ctx.strokeStyle = o.axis.lineColor
        ctx.textAlign = 'start'
        ctx.beginPath()

        for (let i = 0; i <= o.axis.linesX; i++) {
            const x = step * i + o.padding.left
            let printX = this.minX + textStep * i

            if (typeof o.axis.onDrawLabelX === "function") {
                printX = o.axis.onDrawLabelX.apply(null, [printX])
            }

            if (o.axis.showXLines) {
                ctx.moveTo(x, o.padding.top)
                ctx.lineTo(x, this.viewHeight + o.padding.top)
            }

            if (i < o.axis.linesX && o.axis.showXLabel)
                ctx.fillText(printX.toString(), x, this.viewHeight + o.padding.top + font.size + 5)
        }

        ctx.stroke()
        ctx.closePath()
    }

    drawAxis(){
        const o = this.options
        const ctx = this.ctx

        if (!o.axis) return

        const font = o.axis.font ?? o.font

        ctx.font = `${font.style} ${font.weight} ${font.size}px ${font.family}`
        ctx.fillStyle = o.axis.labelColor
        ctx.lineWidth = 1
        ctx.setLineDash([])

        if (o.axis.showYAxis && o.axis.linesY) this.drawAxisY()
        if (o.axis.arrowY) this.drawArrowY()
        if (o.axis.showXAxis && o.axis.linesX) this.drawAxisX()
        if (o.axis.arrowX) this.drawArrowX()

        return this
    }

    drawCross(){
        const o = this.options, cross = o.cross
        const ctx = this.ctx
        const rect = this.canvas.getBoundingClientRect()

        if (!o.cross || (o.cross && !this.proxy.mouse)) return

        let {x, y} = this.proxy.mouse

        x -= rect.left
        y -= rect.top

        if ((x - o.padding.left + 1 < 0) || (x > this.viewWidth + o.padding.left + 1)) return
        if ((y - o.padding.top + 1 < 0) || (y > this.viewHeight + o.padding.top + 1)) return

        ctx.beginPath()
        ctx.setLineDash(o.cross.dash)
        ctx.lineWidth = cross.size
        ctx.strokeStyle = cross.color

        // vertical line
        ctx.moveTo(x, o.padding.top)
        ctx.lineTo(x, this.viewHeight + o.padding.top)

        // Horizontal line
        ctx.moveTo(o.padding.left, y)
        ctx.lineTo(this.viewWidth + o.padding.left, y)

        ctx.arc(x, y, 10, 0, 2 * Math.PI)

        ctx.stroke()
        ctx.closePath()
    }

    drawTitle(){
        const title = this.options.title
        const ctx = this.ctx
        const magic = 5
        let x

        if (!title || !title.text) {
            return
        }

        const {text, align, color, font} = title

        switch (align) {
            case 'center':
                x = this.dpiWidth / 2
                break
            case 'right':
                x = this.dpiWidth - magic
                break
            default: x = magic
        }

        drawText(ctx, text, [x, font.size + magic], {
            align: title.align,
            color: title.color,
            stroke: title.color,
            font: title.font
        })

        return this
    }

    drawLegend(){
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

            const nameWidth = ctx.measureText(name).width

            if (x + nameWidth > this.viewWidth) {
                x = o.padding.left + legend.padding.left + legend.margin.left
                y += lh
            }

            drawSquare(ctx, [x, y], {color, fill: color, radius: box})
            drawText(ctx, name, [x + box +magic, y + box / 2], {color: o.font.color, stroke: o.font.color, font: o.font})

            x += box + nameWidth + 20
        }

        return this
    }

    drawLegendVertical(){
        const o = this.options, legend = o.legend
        let lh, x, y, magic = 5, legendSysPadding = 15 * o.dpi, box = o.legend.font.size / 2
        const ctx = this.ctx
        const items = this.legendItems
        let textBoxWidth, textBoxHeight

        if (!legend || !isObject(legend)) return
        if (!items || !Array.isArray(items) || !items.length) return

        lh = legend.font.size * legend.font.lineHeight
        y = o.padding.top + legend.font.size + legend.padding.top + legend.margin.top
        x = o.padding.left + legend.padding.left + legend.margin.left

        textBoxWidth = getTextboxWidth(ctx, items, legend.font) + box * 2 + magic + legend.padding.left + legend.padding.right
        textBoxHeight = items.length * lh + legend.padding.top + legend.padding.bottom

        drawTextBox(ctx, [x - box - legend.padding.left, y - box - legend.padding.top, textBoxWidth, textBoxHeight], {
            color: legend.color,
            dash: legend.dash,
            size: legend.border.width,
            borderColor: legend.border.color
        })

        for (let i = 0; i < items.length; i++) {
            let [name, color] = items[i]

            drawSquare(ctx, [x, y], {color, fill: color, radius: box})
            drawText(ctx, name, [x + box +magic, y + box / 2 + 2], {color: o.font.color, stroke: o.font.color, font: o.font})

            y += lh
        }

        return this
    }


    draw(){
        this.clear()
        this.calcRatio()
        this.drawTitle()
        this.drawAxis()
    }

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

        tooltip.style.top = `${y - tooltip.clientHeight - 5}px`
        tooltip.style.left = `${x - tooltip.clientWidth / 2 - 5}px`

        this.tooltip = tooltip
    }

    clear(){
        this.ctx.clearRect(0, 0, this.dpiWidth, this.dpiHeight)
    }

    mouseMove(e){
        const onHover = this.options.onHover
        const {clientX: x, clientY: y} = e

        if (typeof onHover === "function") onHover(x, y)

        this.proxy.mouse = {
            x: x,
            y: y
        }
    }

    mouseLeave(){
        const fn = this.options.onLeave

        if (typeof fn === "function") fn()

        this.proxy.mouse = null
    }

    resize(){
        this.calcInternalValues()
        this.setCanvasSize()
        this.draw()
    }

    addEvents(){
        const canvas = this.canvas

        canvas.addEventListener("mousemove", this.mouseMove.bind(this))
        canvas.addEventListener("mouseleave", this.mouseLeave.bind(this))
        window.addEventListener("resize", this.resize.bind(this))
    }

    destroy(){
        const canvas = this.canvas

        cancelAnimationFrame(this.raf)

        canvas.removeEventListener("mousemove", this.mouseMove.bind(this))
        canvas.removeEventListener("mouseleave", this.mouseLeave.bind(this))
        window.removeEventListener("resize", this.resize.bind(this))
    }
}
