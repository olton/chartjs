import {labelFont} from "./font";

const arrow = {
    color: '#000',
    size: 1,
    dash: [],
    factorX: 5,
    factorY: 5
}

export const defaultAxis = {
    showXAxis: true,
    showXLabels: true,

    showYAxis: true,
    showYLabels: true,

    showMinMax: false,

    linesX: 5,
    linesY: 5,
    labelsX: 5,
    labelsY: 5,
    labels: {
        x: true,
        y: true,
        color: '#000',
        font: labelFont,
    },
    lines: {
        color: '#e3e3e3',
        size: 1,
        dash: []
    },
    arrowX: arrow,
    arrowY: arrow,
    onDrawLabelY: null,
    onDrawLabelX: null
}