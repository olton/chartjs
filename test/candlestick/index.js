import {candlestickChart} from "../../src"
import {rand, getOne} from "../helpers"

const genData = (count) => {
    let a  = []
    let year = new Date().getFullYear() - count
    let hi = rand(60, 80), low = hi - rand(0, 20)
    let open, close, one, next

    for (let i = 0; i < count; i++){
        open = rand(low, hi)
        close = rand(low, hi)

        a.push([++year, hi, low, open, close])

        one = getOne()
        hi = rand(low, hi)
        if (one > 0) {
            hi += rand(0, 20)
        }
        low = hi - rand(0, rand(0, 20))
        if (low < 0) {
            low *= -1
        }
    }

    return a
}

// [x, hi, low, open, close]
const data = genData(100)

const candle = candlestickChart("#candle1", data, {
    height: 600,
    candle: {
        distance: 4,
        leg: false,
        width: "auto"
    },
    axis: {
        x: {
            label: {
                angle: -90,
                align: 'right',
                skip: 2
            }
        },
        y: {
            label: {
                fixed: 2
            }
        }
    },
    padding: {
        bottom: 60,
        left: 60
    },
    onTooltipShow: (data, opt) => {
        return `
            <h4>Year: ${data[0]}</h4>
            <hr>
            <div>Hi: ${data[1]}</div>
            <div>Low: ${data[2]}</div>
            <div>Open: ${data[3]}</div>
            <div>Close: ${data[4]}</div>
        `
    }
})