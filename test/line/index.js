import {lineChart} from "../../src"
import {genData} from "../helpers"
import {defaultColors} from "../../src/defaults/elements/colors"

const data1 = [
    genData(50, 70, 95),
    genData(50, 50, 65),
    genData(50, 30, 45),
    genData(50, 0, 25),
]

const lines1 = [
    {
        name: "Line 1",
        size: 1,
        dots: {
            type: 'circle',
        }
    },
    {
        name: "Line 2",
        size: 1,
        dots: {
            type: 'square',
        }
    },
    {
        name: "Line 3",
        size: 1,
        dots: {
            type: 'triangle',
        }
    },
    {
        name: "Line 4",
        size: 1,
        dots: {
            type: 'diamond',
        }
    },
]

lineChart("#line-1", data1, {
    lines: lines1,
    height: 600,
    accuracy: 4,
    colors: [defaultColors.lime, defaultColors.blue, defaultColors.violet, defaultColors.orange],
    boundaries: {
        minY: -10,
        maxY: 110
    },
    dots: {
        fill: '#fff',
        size: 4
    },
    title: {
        text: 'The LineChart',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    axis: {
        x: {
            line: {
                count: 15
            },
            label: {
                count: 5,
                fixed: 0
            }
        },
        y: {
            line: {
                count: 20
            },
            label: {
                count: 10,
                fixed: 0
            }
        }
    },
    padding: {
        bottom: 60,
    },
    legend: {
        margin: {
            top: 30
        }
    }
})


const data2 = [
    genData(20, 0, 100),
    genData(20, 0, 70),
    genData(20, 0, 50),
]

const lines2 = [
    {
        name: "Line 1",
        size: 1,
        showLine: false,
        dots: {
            type: 'dot',
            fill: '#fff',
            size: 3
        }
    },
    {
        name: "Line 2",
        size: 1,
        showLine: false,
        dots: {
            type: 'square',
            fill: '#fff',
            size: 3
        }
    },
    {
        name: "Line 3",
        size: 1,
        dots: false
    },
]

lineChart("#line-2", data2, {
    background: "#000",
    lines: lines2,
    height: 600,
    accuracy: 4,
    colors: ['red', 'green', 'blue'],
    title: {
        text: 'The LineChart :: disabled lines',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    axis: {
        x: {
            line: {
                count: 10
            },
            label: {
                count: 5,
                fixed: 0
            }
        },
        y: {
            line: {
                count: 10
            },
            label: {
                count: 5,
                fixed: 0
            }
        }
    },
    legend: {
        color: '#fff4db',
        vertical: true,
        position: "top-right",
        margin: {
            top: 40,
            right: 10
        },
        padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        },
        border: {
            color: '#ffdc73'
        },
        dash: [],
    },
    drawType: 'curve',
})

