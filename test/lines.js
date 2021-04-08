import data from "./data.json"

const buildData = (columns, col) => {
    let a = []

    for (let i = 1; i < columns[0].length; i++) {
        a.push([columns[0][i], columns[col][i]])
    }

    return a
}

const DATA_INDEX = 2

export const lines = [
    {
        name: "Clients who visit a site",
        color: data[DATA_INDEX].colors.y0,
        size: 2,
        data: buildData(data[DATA_INDEX].columns, 1),
        dots: {
            type: 'dot', // dot, square, triangle, diamond
            fill: '#fff',
            size: 4
        }
    },
    {
        name: "Clients who visit a forum",
        color: data[DATA_INDEX].colors.y1,
        size: 2,
        data: buildData(data[DATA_INDEX].columns, 2),
        dots: {
            type: 'triangle', // dot, square, triangle, diamond
            fill: '#fff',
            size: 4
        }
    },
    // {
    //     name: "Line 3",
    //     color: data[4].colors.y2,
    //     size: 1,
    //     data: buildData(data[4].columns, 3),
    //     dots: {
    //         type: 'dot', // dot, square, triangle, diamond
    //         fill: '#fff',
    //         size: 2
    //     }
    // },
    // {
    //     name: "Line 4",
    //     color: data[4].colors.y3,
    //     size: 1,
    //     data: buildData(data[4].columns, 4),
    //     dots: {
    //         type: 'dot', // dot, square, triangle, diamond
    //         fill: '#fff',
    //         size: 2
    //     }
    // },
]

export const line = [
    {
        name: "Line 3",
        color: '#000',
        size: 1,
        data: [
            [10, 10],
            [20, 20],
            [30, 30],
        ]
    },
]
