export const minMax = (data = [], by = 'x') => {
    let min, max, v

    for (const _ of data) {
        v = by.toLowerCase() === 'x' ? _[0] : _[1]

        if (isNaN(min) || min > v) min = v
        if (isNaN(max) || max < v) max = v
    }

    return [min, max]
}

