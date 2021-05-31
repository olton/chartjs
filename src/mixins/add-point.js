export const MixinAddPoint = {
    addPoint(index, point, shift = false){
        const o = this.options
        let data

        if (!this.data) {
            this.data = []
            for(let i = 0; i < index + 1; i++) {
                this.data[i] = []
            }
        }

        data = this.data[index]

        if (shift && data.length) {
            if (!o.graphSize) {
                data = data.slice(1)
            } else {
                if (data.length >= o.graphSize) {
                    data = data.slice(1)
                }
            }
        }

        this.data[index] = data
        this.data[index].push(point)
    }
}