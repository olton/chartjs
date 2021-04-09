import {labelFont} from "./font";

export const defaultAxis = {
    lineColor: '#e3e3e3',
    labelColor: '#000',
    showXAxis: true,
    showYAxis: true,
    showXLines: true,
    showYLines: true,
    showXLabel: true,
    showYLabel: true,
    showMinMax: false,
    linesX: 5,
    linesY: 5,
    font: labelFont,
    arrowX: {
        color: '#000'
    },
    arrowY: {
        color: '#000'
    },
    onDrawLabelY: null,
    onDrawLabelX: null
}