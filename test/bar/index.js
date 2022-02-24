import {barChart} from "../../src";
import {defaultAnimate} from "../../src/defaults/elements/animate";

const bars1 = [8,7,5,9,6]
const bars2 = [
    [300, 350, 600, 840, 620, 950, 220],
    [700, 730, 1400, 1450, 1420, 2100, 720]
]

barChart("#bar-1", bars1, {
    bars: ["Red", "Blue", "Green", "Yellow", "Pink"],
    height: 600,
    colors: ['red', 'green', 'blue', 'yellow', 'pink'],
    title: {
        text: 'The BarChart',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    boundaries: {
        max: 10
    },
    barDistance: 5,
    groupDistance: 50,
    animate: {...defaultAnimate, duration: 500}
})

barChart("#bar-2", bars2, {
    bars: ["Austin", "Denver"],
    height: 600,
    colors: ['#0d5', '#07f', '#fb0', '#f08', '#0cf', '#064', '#f50'],
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
            top: 40
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
