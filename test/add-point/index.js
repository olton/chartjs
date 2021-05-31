import {lineChart} from "../../src";
import {genData, rand} from "../helpers";
import {areaChart} from "../../src";

const lineData = [
    genData(100, 30, 60),
    genData(100, 10, 25),
]

const lineDesc = [
    {
        name: "Line 1",
        size: 1,
    },
    {
        name: "Line 2",
        size: 1,
        type: 'curve',
    },
]

const line = lineChart("#line-add-point", lineData, {
    lines: lineDesc,
    height: 200,
    boundaries: {
        minY: 0,
        maxY: 80
    },
    colors: ['red', 'blue'],
    title: {
        text: "The LineChart :: Live data"
    },
    tooltip: false,
    hoverMode: 'advanced',
    showDots: false,
    dots: {
        size: 4
    },
    legend: false
})

const areaData = [
    genData(100, 30, 60),
]

const areas = [
    {
        name: "Line 1",
        size: 1,
    },
]

const area = areaChart("#area-add-point", areaData, {
    areas,
    height: 200,
    boundaries: {
        minY: 0,
        maxY: 80
    },
    colors: ['green'],
    title: {
        text: "The AreaChart :: Live data"
    },
    axis: {
        x: {
            arrow: false
        },
        y: {
            arrow: false
        }
    },
    legend: false
})

let x = 1000
setInterval( () => {
    let y = rand(30, 60)
    x += 10

    line.add(0, [x, rand(30, 60)], true)
    line.add(1, [x, rand(10, 25)], true)
    area.add(0, [x, y], true)
}, 1000)
