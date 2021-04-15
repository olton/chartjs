import {lineChart} from "../../src"
import {genData, rand} from "../helpers"

const lines = [
    {
        name: "Line 1",
        size: 1,
        data: genData(50, 0, 100),
        dots: {
            type: 'dot',
            fill: '#fff',
            size: 3
        }
    },
    {
        name: "Line 2",
        size: 1,
        data: genData(50, 0, 70),
        dots: {
            type: 'square',
            fill: '#fff',
            size: 3
        }
    },
    {
        name: "Line 3",
        size: 1,
        data: genData(50, 0, 50),
        dots: {
            type: 'triangle',
            fill: '#fff',
            size: 3
        }
    },
]

const lines2 = [
    {
        name: "Line 1",
        size: 1,
        data: genData(50, 0, 100),
        showLines: false,
        dots: {
            type: 'dot',
            fill: '#fff',
            size: 3
        }
    },
    {
        name: "Line 2",
        size: 1,
        data: genData(50, 0, 70),
        showLines: false,
        dots: {
            type: 'square',
            fill: '#fff',
            size: 3
        }
    },
    {
        name: "Line 3",
        size: 1,
        data: genData(50, 0, 50),
        dots: {
            type: 'triangle',
            fill: '#fff',
            size: 3
        }
    },
]

lineChart("#line-chart-1", lines, {
    height: 600,
    accuracy: 4,
    colors: ['red', 'green', 'blue'],
    boundaries: {
        minY: -10,
        maxY: 110
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
    }
})

lineChart("#line-chart-2", lines2, {
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
        margin: {
            left: 20
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
        dash: []
    },
})

