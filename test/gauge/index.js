import {gauge} from "../../src/"
import {deg2rad} from "../../src/helpers/deg-to-rad";

gauge("#gauge-1", [50], {
    height: 600,
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

gauge("#gauge-2", [-10], {
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
