import {areaChart} from "../../src/index.js";
import {genData} from "../helpers/index.js";

const areas = [
    {
        name: "Area 1",
        size: 3,
        dots: true
    },
    {
        name: "Area 2",
        size: 3,
        dots: false
    },
    {
        name: "Area 3",
        size: 3,
        dots: false
    },
]

const data = [
    genData(50, 60, 100),
    genData(50, 30, 55),
    genData(50, 0, 25),
]

areaChart("#chart", data, {
    areas,
    height: 600,
    colors: ['rgba(255, 0, 0, .5)', 'rgba(0, 255,0, .5)', 'rgba(0,0,255,.5)', 'rgba(255,255,0,.5)', 'rgba(50,130,130,.5)', 'rgba(150,130,130,.5)'],
    title: {
        text: "The AreaChart"
    },
    boundaries: {
        minY: 0
    },
    padding: {
        top: 60,
        left: 100
    },
    axis: {
        y: {
            label: {
                fixed: 0,
                count: 10,
                step: "auto"
            }
        },
        x: {
            label: {
                fixed: 0,
                count: 10,
                step: "auto"
            }
        },
    }
})