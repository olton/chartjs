import {defaultFont} from "./elements/font";

const gaugeLabel = {
    font: defaultFont,
    fixed: false,
    color: "#000",
    angle: 0,
    shift: {
        x: 0,
        y: 0
    }
}

export const defaultDonutOptions = {
    backStyle: "#a7a7a7",
    fillStyle: "#8f8",
    backWidth: 32,
    valueWidth: 32,
    radius: 100,
    boundaries: {
        min: 0,
        max: 100,
    },
    value: gaugeLabel,
    padding: {
        left: 0,
        right: 0
    }
}