import {defaultAxis} from "./elements/axis";
import {labelFont} from "./elements/font";

export const defaultBarChartOptions = {
    groupDistance: 0,
    barDistance: 0,
    axis: {
        ...defaultAxis,
    },
    dataAxisX: false,
    labels: {
        font: labelFont,
        color: '#000'
    },

    onDrawLabel: null,
}