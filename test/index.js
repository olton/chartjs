import {lineChart} from "../src"
import {getChartData} from "./data"

const logContainer = document.querySelector("#log")

const log = (...args) => {
    logContainer.innerHTML = args[0]
}

const chartData = getChartData()
const buildData = (columns, col) => {
    let a = []

    for (let i = 1; i < columns[0].length; i++) {
        a.push([columns[0][i], columns[col][i]])
    }

    return a
}
const lines = [
    {
        name: "Line 1",
        color: chartData.colors.y0,
        size: 1,
        data: buildData(chartData.columns, 1),
        dots: {
            type: 'dot', // dot, square, triangle, diamond
            fill: '#fff',
            size: 2
        }
    },
    {
        name: "Line 2",
        color: chartData.colors.y1,
        size: 1,
        data: buildData(chartData.columns, 2),
        dots: {
            type: 'square',
            size: 2
        }
    },
]

const line = [
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

const chart = lineChart("#chart", lines, {
    height: 600,
    showLines: true,
    padding: {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
    },
    accuracy: 4,
    boundaries: {
        maxY: 300,
        minY: 0
    },
    title: {
        text: 'Line Chart',
        font: {
            lineHeight: 1
        }
    },
    axis: {
        linesX: 10,
        linesY: 10,

        onDrawLabelY: label => Math.round(label),
        onDrawLabelX: label => {
            //return label
            const d = new Date(label)
            return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/")
        },
    },
    legend: {
        width: 0
    },
    tooltip: {
        onShow: ([x, y]) => {
            const d = new Date(x)
            const date = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/")
            return `
                <h3 style="margin: 0 0 5px 0">Clients</h3>
                <table>
                    <tr>
                        <td>Date:</td><td><b>${date}</b></td>     
                    </tr>                   
                    <tr>                   
                        <td>Count:</td><td><b>${y}</b></td>                        
                    </tr>                
                </table>
            `
        }
    }
    //onHover: (x, y) => console.log(x, y)
})