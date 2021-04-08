import {defaultMargin} from "./margin";
import {labelFont} from "./font";
import {defaultPadding} from "./padding";

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
    label: {
        color: '#000',
        font: labelFont,
        margin: defaultMargin,
        align: 'center'
    },
}