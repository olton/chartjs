export const minMax = (data = [], by = 'x') => {
    let min, max, v
    let index

    if (typeof by === "number") {
        index = by
    } else {
        switch (by.toString().toLowerCase()) {
            case 'y':
                index = 1
                break
            case 'z':
                index = 2
                break
            default:
                index = 0
        }
    }

    for (const _ of data) {
        v = _[index]

        if (isNaN(min) || min > v) min = v
        if (isNaN(max) || max < v) max = v
    }

    return [min, max]
}

export const minMaxLinear = (data = []) => {
    let min, max

    min = Math.min.apply(null, data)
    max = Math.max.apply(null, data)

    return [min, max]
}