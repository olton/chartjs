import {lineChart} from "../../src"
import {genData} from "../helpers"
import {MetroColorPalette} from "../../src/defaults/elements/colors"

const lines = [
    {
        name: "Line 1",
        size: 1,
        data: genData(50, 70, 95),
        dots: {
            type: 'circle',
        }
    },
    {
        name: "Line 2",
        size: 1,
        data: genData(50, 50, 65),
        dots: {
            type: 'square',
        }
    },
    {
        name: "Line 3",
        size: 1,
        data: genData(50, 30, 45),
        dots: {
            type: 'triangle',
        }
    },
    {
        name: "Line 4",
        size: 1,
        data: genData(50, 0, 25),
        dots: {
            type: 'diamond',
        }
    },
]

const lines2 = [
    {
        name: "Line 1",
        size: 1,
        data: genData(20, 0, 100),
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
        data: genData(20, 0, 70),
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
        data: genData(20, 0, 50),
        dots: false
    },
]

lineChart("#line-1", lines, {
    height: 600,
    accuracy: 4,
    colors: [MetroColorPalette.lime, MetroColorPalette.blue, MetroColorPalette.violet, MetroColorPalette.orange],
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
        bottom: 80,
    },
    legend: {
        margin: {
            top: 40
        }
    },
})

lineChart("#line-2", lines2, {
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
        margin: 60,
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

