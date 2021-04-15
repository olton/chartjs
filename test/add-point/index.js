import {lineChart} from "../../src";
import {genData, rand} from "../helpers";
import {areaChart} from "../../src/charts/area";

const lineChartAddPoint = lineChart("#line-chart-add-point", [
    {
        name: "Line 1",
        size: 1,
        data: genData(100, 30, 60),
        dots: {
            type: 'dot',
            fill: '#fff',
            size: 1
        }
    },
], {
    height: 200,
    boundaries: {
        minY: 0,
        maxY: 80
    },
    colors: ['red'],
    title: {
        text: "The LineChart :: Live data"
    }
})

const areaChartAddPoint = areaChart("#area-chart-add-point", [
    {
        name: "Line 1",
        size: 1,
        data: genData(100, 30, 60),
        dots: {
            type: 'dot',
            fill: '#fff',
            size: 1
        }
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
    areaChartAddPoint.addPoint(0, [x, rand(30, 60)])
}, 1000)
