import {labelFont} from "./font";

const arrow = {
    color: '#000',
    size: 1,
    dash: [],
    factorX: 5,
    factorY: 5
}

const line = {
    color: '#e3e3e3',
    size: 1,
    dash: [],
    count: 5,
    show: true
}

const label = {
    color: '#000',
    font: labelFont,
    count: 5, // odd, even, num
    show: true,
    first: true,
    last: true,
    fixed: false,
}

const axis = {
    arrow,
    line,
    label,
}

export const defaultAxis = {
    x: axis,
    y: axis
}