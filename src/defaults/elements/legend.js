import {labelFont} from "./font";
import {defaultBorder} from "./border";

export const defaultLegend = {
    rtl: false,
    margin: {
        top: 20,
        left: 0,
        right: 0,
        bottom: 0
    },
    padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    font: labelFont,
    border: defaultBorder,
    dash: [],
    background: '#fff',
    vertical: false,
    position: 'top-left', // top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
}