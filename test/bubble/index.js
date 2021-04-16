import {bubbleChart} from "../../src"

const lines = [
    {
        name: "iPhone",
        data: [5, 5500, 3],
    },
    {
        name: "Nokia",
        data: [14, 12200, 12],
    },
    {
        name: "Sony",
        data: [20, 60000, 33],
    },
    {
        name: "OnuPlus",
        data: [18, 24400, 10],
    },
    {
        name: "Xiaomi",
        data: [22, 32000, 42],
    },
    {
        name: "Samsung",
        data: [23, 32000, 62],
    },
]

bubbleChart("#bubble-1", lines, {
    height: 600,
    accuracy: 4,
    colors: ['rgba(255, 0, 0, .5)', 'rgba(0, 255,0, .5)', 'rgba(0,0,255,.5)', 'rgba(255,255,0,.5)', 'rgba(50,130,130,.5)', 'rgba(150,130,130,.5)'],
    boundaries: {
        minX: 0,
        minY: 0,
        maxX: 30,
        maxY: 65000
    },
    padding: 80,
    title: {
        text: 'The BubbleChart',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    axis: {
        x: {
            line: {
                count: 15
            },
            label: {
                count: 5,
                fixed: 0
            }
        },
        y: {
            line: {
                count: 20
            },
            label: {
                fixed: 0
            }
        }
    },
    legend: {
        margin: {
            top: 40
        }
    }
})
