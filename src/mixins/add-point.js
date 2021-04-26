export const MixinAddPoint = {
    addPoint(index, [x, y], shift = true){
        const o = this.options
        let data

        if (!this.data || !this.data.length) return

        data = this.data[index].data

        if (shift) {
            if (!o.graphSize) {
                data = data.slice(1)
            } else {
                if (data.length === o.graphSize) {
                    data = data.slice(1)
                }
            }
        }

        this.data[index].data = data
        this.data[index].data.push([x, y])

        this.calcMinMax()
        this.calcRatio()
        this.resize()
    }
}