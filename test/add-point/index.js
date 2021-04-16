import {lineChart} from "../../src";
import {genData, rand} from "../helpers";
import {areaChart} from "../../src/charts/area";

const lineChartAddPoint = lineChart("#line-add-point", [
    {
        name: "Line 1",
        size: 1,
        data: genData(100, 30, 60),
        dots: false
    },
    {
        name: "Line 2",
        size: 1,
        data: genData(100, 10, 25),
        dots: false,
        drawType: 'curve'
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
    }
})

const areaChartAddPoint = areaChart("#area-add-point", [
    {
        name: "Line 1",
        size: 1,
        data: genData(100, 30, 60),
        dots: false
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
    x += 10
    lineChartAddPoint.addPoint(0, [x, rand(30, 60)])
    lineChartAddPoint.addPoint(1, [x, rand(10, 25)])
    areaChartAddPoint.addPoint(0, [x, rand(30, 60)])
}, 1000)
