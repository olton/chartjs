export const getFillColor = (p, colors) => {
    let res = '#fff', min = 0

    for (let i = 0; i < colors.length; i++) {
        let c = colors[i][0]

        if (p>= min && p <= c) {
            res = colors[i][1]
            min = colors[i][0]
        }
    }

    return res
}
