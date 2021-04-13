import {defaultAxis} from "./elements/axis";

export const defaultBarChartOptions = {
    groupDistance: 20,
    barDistance: 10,
    axis: {
        ...defaultAxis,
        showMinY: true,
        showMinX: true,
    },
    dataAxisX: false,

    onDrawLabel: null,
}