import {defaultAxis} from "./elements/axis";
import {defaultCross} from "./elements/cross";
import {defaultArrows} from "./elements/arrow";

export const defaultLineChartOptions = {
    hoverMode: 'default', // default, advanced
    axis: defaultAxis,
    cross: defaultCross,
    showDots: true,
    type: 'line', // line, curve
    accuracy: 2,
    lines: [],
    arrows: defaultArrows
}