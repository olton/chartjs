import {segment} from "../../src"
import {rand} from "../helpers";

segment("#segment-1", [65], {
    colors: "green",
    segment: {
        count: 40,
        radius: 4,
        height: 10
    }
})

let s2 = segment("#segment-2", [0,0,0,0,0,0,0,0,0,0,0,0], {
    height: 100,
    segment: {
        radius: 0,
        count: 40,
        rowDistance: 4
    }
})

setInterval( () => {
    s2.setData(rand(0, 100), 0)
    s2.setData(rand(0, 100), 1)
    s2.setData(rand(0, 100), 2)
    s2.setData(rand(0, 100), 3)
    s2.setData(rand(0, 100), 4)
    s2.setData(rand(0, 100), 5)
    s2.setData(rand(0, 100), 6)
    s2.setData(rand(0, 100), 7)
    s2.setData(rand(0, 100), 8)
    s2.setData(rand(0, 100), 9)
    s2.setData(rand(0, 100), 10)
    s2.setData(rand(0, 100), 11)
}, 1000)
