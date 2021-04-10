import {pieChart} from "../../src/charts/pie"

const sectors = [
    {
        name: "Red",
        color: 'red',
        data: [80]
    },
    {
        name: "Blue",
        color: 'blue',
        data: [20]
    },
    {
        name: "Green",
        color: 'green',
        data: [120]
    },
    {
        name: "Yellow",
        color: 'yellow',
        data: [40]
    },
    {
        name: "Pink",
        color: 'pink',
        data: [100]
    },
]

pieChart("#pie-chart-1", sectors, {
    height: 600,
    title: {
        text: 'The PieChart',
        align: 'center',
        font: {
            lineHeight: 1
        }
    }
})

pieChart("#pie-chart-2", sectors, {
    height: 600,
    title: {
        text: 'The PieChart',
        align: 'center',
        font: {
            lineHeight: 1
        }
    }
})
