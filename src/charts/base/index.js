import {defaultOptions} from "../../defaults/chart"
import {merge} from "../../helpers/merge";
import {drawText} from "../../draw/text";

import {MixinLegend} from "../../mixins/legend"
import {MixinTooltip} from "../../mixins/tooltip"
import {expandPadding} from "../../helpers/expand-padding";

export class Chart {
    constructor(el, data = [], options = {}, type = 'unknown') {
        if (typeof el === "string") {
            this.el = document.querySelector(el)
        } else if (el instanceof HTMLElement) {
            this.el = el
        }

        if (!this.el) {
            throw new Error("You must define an element or a selector of element for chart container!")
        }

        this.options = merge({}, defaultOptions, options)

        this.data = data

        this.canvas = null
        this.ctx = null
        this.raf = null
        this.tooltip = null
        this.legendItems = []
        this.chartType = type
        this.rect = this.el.getBoundingClientRect()
        this.canvasRect = null
        this.static = false

        const that = this

        this.proxy = new Proxy({}, {
            set(...args) {
                const result = Reflect.set(...args)
                that.raf = requestAnimationFrame(that.draw.bind(that))
                return result
            }
        })

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
        this.el.style.overflow = 'hidden'
        this.el.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        this.setCanvasSize()
        this.canvasRect = this.canvas.getBoundingClientRect()
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
        const o = this.options, padding = expandPadding(o.padding)
        const rect = this.el.getBoundingClientRect();
        const {width: elWidth, height: elHeight} = rect

        width = o.width.toString().includes('%') ? elWidth / 100 * parseInt(o.width) : +o.width
        height = o.height.toString().includes('%') ? elHeight / 100 * parseInt(o.height) : +o.height

        this.width = width
        this.height = height
        this.dpi = o.dpi
        this.dpiHeight = this.dpi * height
        this.dpiWidth = this.dpi * width
        this.viewHeight = this.dpiHeight - (padding.top + padding.bottom)
        this.viewWidth = this.dpiWidth - (padding.left + padding.right)
        this.center = [this.dpiWidth / 2, this.dpiHeight / 2]
        this.radius = Math.min(this.viewHeight, this.viewWidth) / 2
    }

    title(){
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
    }

    setBackground(bg){
        if (bg) {
            this.options.background = bg
        }

        this.ctx.fillStyle = this.options.background
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height)
    }

    draw(){
        this.clear()
        this.setBackground()
        this.title()
    }

    clear(){
        this.ctx.clearRect(0, 0, this.dpiWidth, this.dpiHeight)
    }

    setData(data, index, redraw = true){
        if (typeof index !== "undefined") {
            this.data[index].data = data
        } else {
            this.data = data
        }

        if (redraw) this.resize()
    }

    setBoundaries(obj, redraw = true){
        const grantedKeys = ["minX", "minY", "minZ", "maxX", "maxY", "maxZ", "min", "max"]

        for (let k in obj) {
            if (grantedKeys.includes(k)) {
                this[k] = obj[k]
                this.options.boundaries[k] = obj[k]
            }
        }

        if (redraw) {
            this.draw()
        }
    }

    mouseMove(e){
        const onHover = this.options.onHover
        const {clientX: x, clientY: y} = e.changedTouches ? e.touches[0] : e

        if (typeof onHover === "function")
            onHover.apply(null, [x, y])

        this.proxy.mouse = {
            x: x,
            y: y
        }

        if (e.cancelable) e.preventDefault()
    }

    mouseLeave(){
        const fn = this.options.onLeave

        if (typeof fn === "function")
            fn.apply(null, [])

        this.proxy.mouse = null
    }

    resize(){
        this.calcInternalValues()
        this.setCanvasSize()
        this.rect = this.el.getBoundingClientRect()
        this.canvasRect = this.canvas.getBoundingClientRect()

        this.draw()
    }

    addEvents(){
        const canvas = this.canvas

        canvas.addEventListener("mousemove", this.mouseMove.bind(this))
        canvas.addEventListener("touchmove", this.mouseMove.bind(this), {passive: false})
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

Object.assign(Chart.prototype, MixinLegend)
Object.assign(Chart.prototype, MixinTooltip)
