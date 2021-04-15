import {stackedBarChart} from "../../src/charts/stacked";

const data1 = [
    {
        name: 'Twitter',
        data: [38, 47, 11, 81]
    },
    {
        name: 'Pinterest',
        data: [17, 43, 23, 54]
    },
    {
        name: 'Instagram',
        data: [38, 62, 32, 76]
    },
    {
        name: 'Tumblr',
        data: [45, 30, 16, 32]
    },
    {
        name: 'Facebook',
        data: [16, 24, 75, 12]
    },
]

stackedBarChart("#stacked-chart-1", data1, {
    height: 600,
    padding: {
        top: 60
    },
    colors: ['#f54', '#fc1', "#5b2822", "#2c98e2"],
    values: ['He', 'She', 'It', 'GN'],
    title: {
        text: 'The StackedBarChart'
    },
    axis: {
        y: {
            label: {
                fixed: 0
            }
        }
    },
    groupDistance: 10
})

stackedBarChart("#stacked-chart-2", data1, {
    height: 600,
    padding: {
        top: 60
    },
    colors: ['#f54', '#fc1', "#5b2822", "#2c98e2"],
    values: ['He', 'She', 'It', 'GN'],
    title: {
        text: 'The StackedBarChart'
    },
    axis: {
        x: {
            label: {
                fixed: 0
            }
        }
    },
    dataAxisX: true,
    groupDistance: 10
})
