import {defaultAxis} from "./elements/axis";
import {StandardColorPalette} from "./elements/colors";

export const defaultStackedBarChartOptions = {
    groupDistance: 0,
    axis: {
        ...defaultAxis,
    },
    dataAxisX: false,

    onDrawLabel: null,
}