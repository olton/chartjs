import {pieChart} from "../../src"

const data = [
    {
        name: "Classic",
        data: 10
    },
    {
        name: "Rock",
        data: 14
    },
    {
        name: "Pop",
        data: 2
    },
    {
        name: "Jazz",
        data: 12
    },
]

pieChart("#pie-chart-1", data, {
    height: 600,
    colors: ['#fde23e', '#f16e23', '#57d9ff', '#937e88'],
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

pieChart("#pie-chart-2", data, {
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
            size: 16
        }
    },
    showValue: true,
    onDrawValue: (name, value, percent) => {
        return `${name} ${percent}%`
    }
})
