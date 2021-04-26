import {defaultAxis} from "./elements/axis";
import {defaultCross} from "./elements/cross";

export const defaultLineChartOptions = {
    hoverMode: 'default', // default, advanced
    axis: defaultAxis,
    cross: defaultCross,
    showDots: true,
    type: 'line', // line, curve
}