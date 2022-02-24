import {rand} from "../helpers"
import {gauge} from "../../src/"

gauge("#gauge-1", [55], {
    height: 600,
    fillStyle: [
        [30, '#60a917'],
        [60, '#6495ed'],
        [80, '#f0a30a'],
        [90, '#ff6347'],
        [100, '#a20025']
    ],
    value: {
        font: {
            size: 48,
        },
        color: "#585858"
    },
    label: {
        font: {
            size: 24
        }
    }
})

let gauge2 = gauge("#gauge-2", [-10], {
    height: 600,
    fillStyle: "tomato",
    showValue: true,
    boundaries: {
        min: -20,
        max: 20,
    },
    startFactor: 1,
    endFactor: .5,
    backWidth: 64,
    title: {
        text: "Simple Gauge"
    },
    value: {
        font: {
            size: 48,
        },
        color: "#585858",
        angle: 0,
        shift: {
            x: -100,
            y: 100
        }
    },
    label: {
        font: {
            size: 32
        }
    },
    onDrawValue: (v, p) => {
        return `${v} ℃`
    }
})

setInterval(()=>{
    gauge2.update(rand(-20, 20))
}, 3000)