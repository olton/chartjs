export const lpad = v => v.toString().length < 2 ? '0' + v : v

export const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))

export const genData = (count, min, max) => {
    let y = 0, x = 0, a = []

    for(let i = 0; i < count; i++) {
        y = rand(min, max)
        a.push([x, y])
        x+=10
    }

    return a
}

export const genTriplet = (count, min, max) => {
    let y = 0, x = 0, a = [], d = 10

    for(let i = 0; i < count; i++) {
        y = rand(min, max)
        x += d
        a.push([x - d, x, y])
    }

    return a
}

export const getOne = () => rand(-1, 1) > 0 ? 1 : -1
