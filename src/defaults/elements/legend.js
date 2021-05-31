import {labelFont} from "./font";
import {defaultBorder} from "./border";
import {defaultMargin} from "./margin";
import {defaultPadding} from "./padding";

export const defaultLegend = {
    rtl: false,
    margin: defaultMargin,
    padding: defaultPadding,
    font: labelFont,
    border: defaultBorder,
    dash: [],
    background: '#fff',
    vertical: false,
    position: 'top-left', // top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
}