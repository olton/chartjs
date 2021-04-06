import {defaultOptions} from "../defaults/options"
import {merge} from "../helpers/merge";

export class Chart {
    constructor(el, data, options = {}) {
        this.options = merge({}, defaultOptions, options)
        this.data = data
        this.el = document.querySelector(el)
        this.canvas = null
        this.ctx = null
        this.raf = null

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

        this.calcInternalValues()
        this.createCanvas()
        this.addEvents()
    }

    calcInternalValues(){
        let width, height
        const o = this.options

        width = o.width.toString().includes('%') ? this.el.clientWidth : o.width
        height = o.height.toString().includes('%') ? this.el.clientHeight : o.height

        this.width = width
        this.height = height
        this.dpiHeight = o.dpi * height
        this.dpiWidth = o.dpi * width
        this.viewHeight = this.dpiHeight - (o.padding.top + o.padding.bottom)
        this.viewWidth = this.dpiWidth - (o.padding.left + o.padding.right)
        this.minX = 0
        this.maxX = 0
        this.minY = 0
        this.maxY = 0
        this.count = 0

        if (o.legend && o.legend.width) {
            this.viewWidth -= o.legend.width + o.legend.margin.left + o.legend.margin.right
        }

        return this
    }

    setCanvasStyle(){
        const o = this.options

        this.canvas.style.height = this.height + 'px'
        this.canvas.style.width = this.width + 'px'
        if (o.border) {
            this.canvas.style.border = `${o.border.width}px ${o.border.lineType} ${o.border.color}`
        }
        this.canvas.width = o.dpi * this.width
        this.canvas.height = o.dpi * this.height
    }

    createCanvas(){
        const o = this.options

        this.canvas = document.createElement("canvas")
        this.el.innerHTML = ""
        this.el.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')

        this.setCanvasStyle()

        this.ctx.font = `${o.font.style} ${o.font.weight} ${o.font.size}px ${o.font.family}`
        this.ctx.fillStyle = o.color

        return this
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
        const x = this.viewWidth + left, y = this.viewHeight + top

        ctx.beginPath()
        ctx.strokeStyle = o.axis.arrowY.color

        ctx.moveTo(left, top)
        ctx.lineTo(left, y)

        ctx.moveTo(left, top)
        ctx.lineTo(left - 5, top + 15)
        ctx.moveTo(left, top)
        ctx.lineTo(left + 5, top + 15)

        ctx.stroke()
        ctx.closePath()
    }

    drawAxisY(){
        const o = this.options
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

            if (o.axis.showYLines) {
                ctx.moveTo(o.padding.left, y)
                ctx.lineTo(x, y)
            }
            if (i !== 0) ctx.fillText(printY.toString(), o.padding.left - 5, y)
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
            if (i < o.axis.linesX)
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

        if (!o.cross || (o.cross && !this.proxy.mouse)) return

        const {x, y} = this.proxy.mouse

        if ((x - o.padding.left + 1 < 0) || (x > this.viewWidth + o.padding.left + 1)) return
        if ((y - o.padding.top + 1 < 0) || (y > this.viewHeight + o.padding.top + 1)) return

        ctx.beginPath()
        ctx.setLineDash([5, 3])
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
        let text, y

        if (!title || !title.text) {
            return
        }

        ctx.beginPath()
        ctx.textAlign = title.align
        ctx.fillStyle = title.color
        ctx.strokeStyle = title.color
        ctx.font = `${title.font.style} ${title.font.weight} ${title.font.size}px/${title.font.lineHeight} ${title.font.family}`

        text = title.text.split('\n')

        y = title.font.size + 5

        text.map( (v, i) => {
            ctx.fillText(v, (this.width) / 2, y + (y * i * title.font.lineHeight))
        })

        ctx.closePath()

        return this
    }

    draw(){}

    clear(){
        this.ctx.clearRect(0, 0, this.dpiWidth, this.dpiHeight)
    }

    mouseMove(e){
        const onHover = this.options.onHover
        const {offsetX: x, offsetY: y} = e

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

    addEvents(){
        this.canvas.addEventListener("mousemove", this.mouseMove.bind(this))
        this.canvas.addEventListener("mouseleave", this.mouseLeave.bind(this))
    }

    destroy(){
        cancelAnimationFrame(this.raf)

        this.canvas.removeEventListener("mousemove", this.mouseMove.bind(this))
        this.canvas.removeEventListener("mouseleave", this.mouseLeave.bind(this))
    }
}
