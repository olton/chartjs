import {defaultMargin} from "./margin";
import {labelFont} from "./font";
import {defaultPadding} from "./padding";

export const defaultLegend = {
    display: true,
    position: 'top', // top, left, bottom, right
    align: 'center', // start, center, end
    height: 0, // maxHeight in px
    width: 0, // maxWidth in px
    rtl: false,
    margin: defaultMargin,

    labels: {
        color: '#000',
        font: labelFont,
        padding: defaultPadding,
        align: 'center'
    },
}