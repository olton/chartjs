import {donut} from "../../src"

donut("#donut-1", [15, 20, 5, 60], {
    height: 600,
    colors: ['#60a917', '#6495ed', '#f0a30a', '#ff6347', '#a20025'],
    legend: {
        titles: ['Classic', 'Rock', 'Pop', 'Jazz'],
        showValue: true
    },
    title: {
        text: "Donut"
    },
    padding: 60,
    label: false
})

donut("#donut-2", [10, 14, 2, 12], {
    height: 600,
    colors: ['#60a917', '#6495ed', '#f0a30a', '#ff6347', '#a20025'],
    legend: {
        vertical: true,
        titles: ['Classic', 'Rock', 'Pop', 'Jazz'],
        padding: 10,
        margin: 10,
        border: {
            color: "transparent"
        },
        showValue: true
    },
    title: {
        text: "Donut"
    },
    padding: 60,
    label: {
        color: "#fff"
    }
})
