export const MixinAddPoint = {
    addPoint(index, [x, y], shift = true){
        if (shift) this.data[index].data = this.data[index].data.slice(1)
        this.data[index].data.push([x, y])

        this.calcMinMax()
        this.resize()
    }
}