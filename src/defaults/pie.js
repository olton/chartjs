import {labelFont} from "./elements/font";

export const defaultPieChartOptions = {
    other: {
        color: '#eaeaea'
    },
    labels: {
        font: labelFont,
        color: '#fff'
    },
    showValue: false,
    holeSize: 0,
    legend: {
        vertical: true,
    },

    onDrawValue: null
}