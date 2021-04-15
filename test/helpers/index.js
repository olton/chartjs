export const lpad = v => v.toString().length < 2 ? '0' + v : v

export const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))

export const genData = (count, min, max) => {
    let y = 0, x = 0, a = []

    for(let i = 0; i < count; i++) {
        y = rand(min, max)
        x+=10
        a.push([x, y])
    }

    return a
}
