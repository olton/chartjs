import {defaultAxis} from "./elements/axis";

export const defaultCandlestickOptions = {
    axis: defaultAxis,
    boundaries: {
        minY: 0,
    },
    candle: {
        size: 1,
        width: 'auto',
        white: 'green',
        black: 'red',
        distance: 4,
        cutoff: false
    },
    ghost: {
        stroke: "#e3e3e3",
        fill: "#e3e3e3"
    }
}