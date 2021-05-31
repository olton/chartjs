import {lineChart} from "../../src"
import {genData} from "../helpers";

const lines = [
    {
        name: "Line 1",
        size: 1,
        data: [[0,95]].concat(genData(50, 70, 95)),
        dots: {
            type: 'circle',
        }
    },
    {
        name: "Line 2",
        size: 1,
        data: [[0,65]].concat(genData(50, 50, 65)),
        dots: {
            type: 'square',
        }
    },
    {
        name: "Line 3",
        size: 1,
        data: [[0,45]].concat(genData(50, 30, 45)),
        dots: {
            type: 'triangle',
        }
    },
    {
        name: "Line 4",
        size: 1,
        data: [[0,25]].concat(genData(50, 0, 25)),
        dots: {
            type: 'diamond',
        }
    },
]


let line = lineChart('#line2', lines, {
    height: 600,
    // border: {
    //     color: "none"
    // },
    colors: ["aqua", "blueViolet", "cornflowerBlue", "orangeRed"],
    boundaries: {
        minX: 0,
        minY: 0,
        maxY: 100
    },
    title: {
        text: "Line chart"
    },
    padding: {
        bottom: 30,
        top: 60,
        left: 10,
        right: 10
    },
    legend: {
        margin: 0,
        padding: 0
    },
    axis: {
        y: {
            label: {
                opposite: false,
                step: 10,
                align: 'left',
                shift: {
                    x: 20
                },
                showMin: false
            }
        },
        x: {
            label: {
                angle: -90,
                count: 10,
                shift: {
                    y: -40
                },
                showMin: false
            }
        }
    }
})