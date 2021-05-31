import {defaultAxis} from "./elements/axis";
import {defaultCross} from "./elements/cross";

export const defaultHistogramOptions = {
    barWidth: 10,
    axis: {
        ...defaultAxis,
        x: {
            ...defaultAxis.x,
            arrow: false
        },
        y: {
            ...defaultAxis.y,
            arrow: false
        }
    },
    cross: defaultCross,
    graphSize: 40,
    bars: {
        stroke: '#fff'
    }
}