import {lineChart} from "../../src"

const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))

const getFakeData = (len, inc = 2000, init = 0) => {
    const a = []
    let d = new Date().getTime()

    for (let i = len; i > 0; i--) {
        d -= inc
        a.push([d, init])
    }
    return a.reverse()
}

const lines = [
    {
        name: "Used",
        data: getFakeData(10, 2000, 10)
    }
]

const chart = lineChart("#line1", lines, {
    height: 600,
    colors: ['red'],
    graphSize: 10,
    boundaries: {
        minY: 0
    },
    padding: {
        bottom: 100
    },
    axis: {
        y: {
            label: {
                fixed: 0,
                opposite: false
            }
        },
        x: {
            line: {
                color: '#272b31'
            },
            label: {
                angle: 0
            },
            arrow: {
                color: '#000'
            }
        }
    },
    onDrawLabelX: (v) => {
        const d = new Date(v)
        return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    }
})

setInterval( () => {
    chart.addPoint(0, [new Date().getTime(), rand(10, 15)])
}, 2000)