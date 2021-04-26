export const MixinAddTriplet = {
    addTriplet(index, [a, b, c], shift = true){
        const o = this.options
        let data

        if (!this.data || !this.data.length) return

        data = this.data[index].data

        if (shift) {
            if (o.graphSize && data.length === o.graphSize) {
                data = data.slice(1)
            } else {
                data = data.slice(1)
            }
        }

        this.data[index].data = data
        this.data[index].data.push([a, b, c])

        this.calcMinMax()
        this.calcRatio()
        this.resize()
    }
}