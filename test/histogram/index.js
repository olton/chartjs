import {genTriplet, rand} from "../helpers"
import {histogramChart} from "../../src/charts/histogram";
import {MetroColorPalette, StandardColorPalette} from "../../src/defaults/elements/colors";

const bars = [
    {
        name: "Line 1",
        data: genTriplet(50, 0, 100)
    },
]

const bars2 = [
    {
        name: "Line 1",
        data: genTriplet(40, 0, 100)
    },
]

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

histogramChart("#histogram-1", bars, {
    height: 150,
    accuracy: 4,
    colors: [StandardColorPalette.aquamarine],
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

const histogram = histogramChart("#histogram-2", bars2, {
    height: 150,
    accuracy: 4,
    colors: [StandardColorPalette.cornflowerBlue],
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
    histogram.addTriplet(0, [x - 10, x, y])
}, 1000)
