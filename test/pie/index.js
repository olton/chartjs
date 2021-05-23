import {pieChart} from "../../src"

pieChart("#pie-1", [10, 14, 2, 12], {
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
        titles: ['Classic', 'Rock', 'Pop', 'Jazz'],
        showValue: true
    },
    labels: {
        font: {
            size: 20
        }
    },
    padding: 60
})

pieChart("#pie-2", [10, 14, 2, 12], {
    height: 600,
    title: {
        text: 'The PieChart',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    legend: {
        vertical: true,
        titles: ['Classic', 'Rock', 'Pop', 'Jazz'],
        margin: 0,
        padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        },
        border: {
            color: "transparent"
        }
    },
    labels: {
        color: '#000',
        font: {
            size: 16
        }
    },
    padding: 60,
    showValue: true,
    onDrawValue: (name, value, percent) => {
        return `${name} ${percent}%`
    }
})
