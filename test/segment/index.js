import {segment} from "../../src/charts/segment"
import {rand} from "../helpers";

segment("#segment-1", 65, {
    colors: "green",
    segment: {
        count: 40,
        radius: 4
    }
})

let s2 = segment("#segment-2", [0,0,0], {
    segment: {
        radius: 0,
        count: 40
    }
})

setInterval( () => {
    s2.setData(rand(0, 100), 0)
    s2.setData(rand(0, 100), 1)
    s2.setData(rand(0, 100), 2)
}, 1000)
