import {areaChart} from "../../src/charts/area"
import {genData} from "../helpers"

const areas = [
    {
        name: "Area 1",
        size: 3,
        data: genData(50, 60, 100),
        dots: false
    },
    {
        name: "Area 2",
        size: 3,
        data: genData(50, 30, 55),
        dots: false
    },
    {
        name: "Area 3",
        size: 3,
        data: genData(50, 0, 25),
        dots: false
    },
]

areaChart("#area-1", areas, {
    height: 600,
    colors: ['rgba(255, 0, 0, .5)', 'rgba(0, 255,0, .5)', 'rgba(0,0,255,.5)', 'rgba(255,255,0,.5)', 'rgba(50,130,130,.5)', 'rgba(150,130,130,.5)'],
    title: {
        text: "The AreaChart"
    },
    padding: {
        top: 60
    },
    axis: {
        y: {
            label: {
                fixed: 0
            }
        }
    }
})