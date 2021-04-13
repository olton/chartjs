import {barChart} from "../../src/charts/bar";

const bars1 = [
    {
        name: "Red",
        color: 'red',
        data: [8]
    },
    {
        name: "Blue",
        color: 'blue',
        data: [7]
    },
    {
        name: "Green",
        color: 'green',
        data: [5]
    },
    {
        name: "Yellow",
        color: 'yellow',
        data: [9]
    },
    {
        name: "Pink",
        color: 'pink',
        data: [6]
    },
]

const color = '#0d5, #07f, #fb0, #f08, #0cf, #064, #f50'

const bars2 = [
    {
        name: "Austin",
        color: color,
        data: [300, 350, 600, 840, 620, 950, 220],
    },
    {
        name: "Denver",
        color: color,
        data: [700, 730, 1400, 1450, 1420, 2100, 720],
    },
]

barChart("#bar-chart-1", bars1, {
    height: 600,
    title: {
        text: 'The BarChart',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    boundaries: {
        maxY: 10
    },
    barDistance: 5,
    groupDistance: 50,
})

barChart("#bar-chart-2", bars2, {
    height: 600,
    title: {
        text: 'The BarChart :: groups',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    barDistance: 5,
    groupDistance: 50,
    legend: {
        vertical: true,
        position: 'top-right',
        titles: ['paper', 'laptop', 'pens', 'envelopes', 'binder', 'notepad', 'backpack'],
        margin: {
            top: 10
        },
        padding: 10,
        color: '#fffee0'
    },
    axis:{
        x: {
            line: {
                count: 10
            },
            label: {
                count: 10
            }
        }
    },
    tooltip: {
        padding: 5
    },
    dataAxisX: true
})