import {pieChart} from "../../src/charts/pie"

const sectors = [
    {
        name: "Classic",
        color: '#fde23e',
        data: 10
    },
    {
        name: "Rock",
        color: '#f16e23',
        data: 14
    },
    {
        name: "Pop",
        color: '#57d9ff',
        data: 2
    },
    {
        name: "Jazz",
        color: '#937e88',
        data: 12
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
    },
    legend: {
        border: {
            color: '#fff'
        },
        vertical: false,
        margin: 0,
        padding: 0
    },
    labels: {
        font: {
            size: 20
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
    },
    holeSize: 80,
    legend: {
        padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        }
    },
    labels: {
        color: '#000',
        font: {
            size: 24
        }
    },
    showValue: true
})
