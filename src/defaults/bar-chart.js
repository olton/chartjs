import {defaultAxis} from "./elements/axis";

export const defaultBarChartOptions = {
    groupDistance: 0,
    barDistance: 0,
    axis: {
        ...defaultAxis,
    },
    dataAxisX: false,

    onDrawLabel: null,
}