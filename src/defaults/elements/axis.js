import {labelFont} from "./font";

const line = {
    color: '#e3e3e3',
    size: 1,
    dash: [],
    shortLineSize: 5
}

const label = {
    color: '#000',
    font: labelFont,
    count: 5,
    fixed: false,
    opposite: false,
    angle: 0,
    align: 'center',
    shift: {
        x: 0,
        y: 0
    },
    skip: 0,
    showLine: true,
    showLabel: true,
    showMin: true,
    step: "auto"
}

const axis = {
    line,
    label,
}

export const defaultAxis = {
    x: axis,
    y: {
        ...axis,
        label: {
            ...label,
            align: 'right'
        }
    }
}