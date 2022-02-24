import {genTriplet, rand} from "../helpers"
import {histogramChart} from "../../src"
import {defaultColors} from "../../src/defaults/elements/colors"

const axis = {
    x: {
        label: {
            fixed: 0
        }
    },
    y: {
        label: {
            fixed: 0
        }
    }
}

const data1 = [
    genTriplet(50, 0, 100)
]

const bars1 = [
    {
        name: "Line 1",
    },
]

histogramChart("#histogram-1", data1, {
    bars: bars1,
    height: 150,
    accuracy: 4,
    colors: [defaultColors.cornflowerBlue],
    boundaries: {
        minY: 0,
        maxY: 100
    },
    title: {
        text: 'The HistogramChart',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    axis,
    padding: {
        top: 60,
        bottom: 20
    },
    legend: false
})

const data2 = [
    genTriplet(40, 0, 100)
]

console.log(data2)

const bars2 = [
    {
        name: "Line 1",
        color: defaultColors.bisque,
        stroke: 'transparent'
    },
]

const histogram = histogramChart("#histogram-2", data2, {
    bars: bars2,
    height: 150,
    accuracy: 4,
    boundaries: {
        minY: 0,
        maxY: 100
    },
    title: {
        text: 'The HistogramChart :: Live data',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    axis,
    padding: {
        top: 60,
        bottom: 20
    },
    legend: false,
})

let x = 400
setInterval( () => {
    let y = rand(0, 100)
    x += 10
    histogram.add(0, [x - 10, x, y], true)
}, 1000)
