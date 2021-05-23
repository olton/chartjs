import {lineChart} from "../../src";
import {genData, rand} from "../helpers";
import {areaChart} from "../../src";

const lineChartAddPoint = lineChart("#line-add-point", [
    {
        name: "Line 1",
        size: 1,
        data: genData(100, 30, 60),
    },
    {
        name: "Line 2",
        size: 1,
        data: genData(100, 10, 25),
        type: 'curve',
    },
], {
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
    }
})

const areaChartAddPoint = areaChart("#area-add-point", [
    {
        name: "Line 1",
        size: 1,
        data: genData(100, 30, 60),
    },
], {
    height: 200,
    boundaries: {
        minY: 0,
        maxY: 80
    },
    colors: ['green'],
    title: {
        text: "The AreaChart :: Live data"
    }
})

let x = 1000
setInterval( () => {
    let y = rand(30, 60)
    x += 10
    lineChartAddPoint.addPoint(0, [x, rand(30, 60)])
    lineChartAddPoint.addPoint(1, [x, rand(10, 25)])
    areaChartAddPoint.setBoundaries({
        maxY: 100
    })
    areaChartAddPoint.addPoint(0, [x, y])
}, 1000)
