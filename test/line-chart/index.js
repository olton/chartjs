import {lineChart} from "../../src"

const lpad = v => v.toString().length < 2 ? '0' + v : v
const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))
const genData = (count, min, max) => {
    let y = 0, x = 0, a = []

    for(let i = 0; i < count; i++) {
        y = rand(rand(0, min), rand(0, max))
        x+=10
        a.push([x, y])
    }

    return a
}

const lines = [
    {
        name: "Line number 1",
        color: 'red',
        size: 1,
        data: genData(50, 0, 100),
        dots: {
            type: 'dot',
            fill: '#fff',
            size: 3
        }
    },
    {
        name: "Line number 2",
        color: 'green',
        size: 1,
        data: genData(50, 0, 70),
        dots: {
            type: 'square',
            fill: '#fff',
            size: 3
        }
    },
    {
        name: "Line number 3",
        color: 'blue',
        size: 1,
        data: genData(50, 0, 50),
        dots: {
            type: 'triangle',
            fill: '#fff',
            size: 3
        }
    },
]

lineChart("#line-chart-1", lines, {
    height: 600,
    accuracy: 4,
    boundaries: {
        minY: -10,
        maxY: 110
    },
    title: {
        text: 'The LineChart',
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
                count: 10,
                fixed: 0
            }
        }
    },
    padding: {
        bottom: 80,
    },
    legend: {
        margin: {
            top: 40
        }
    }
})

lineChart("#line-chart-2", lines, {
    height: 600,
    accuracy: 4,
    title: {
        text: 'The LineChart :: disabled lines',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    axis: {
        x: {
            line: {
                count: 10
            },
            label: {
                count: 5,
                fixed: 0
            }
        },
        y: {
            line: {
                count: 10
            },
            label: {
                count: 5,
                fixed: 0
            }
        }
    },
    legend: {
        color: '#fff4db',
        vertical: true,
        margin: {
            left: 20
        },
        padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        },
        border: {
            color: '#ffdc73'
        },
        dash: []
    },
})
