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
        data: buildData(chartData.columns, 1)
    },
    {
        name: "Line 2",
        color: chartData.colors.y1,
        size: 1,
        data: buildData(chartData.columns, 2)
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
        top: 80
    },
    title: {
        text: 'When toasting nutty tofus,\nbe sure they are room temperature.',
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
    //onHover: (x, y) => console.log(x, y)
})