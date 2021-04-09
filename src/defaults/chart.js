import {defaultBorder} from "./elements/border";
import {defaultFont} from "./elements/font";
import {defaultAxis} from "./elements/axis";
import {defaultTitle} from "./elements/title";
import {defaultLegend} from "./elements/legend";
import {defaultTooltip} from "./elements/tooltip";
import {defaultCross} from "./elements/cross";
import {defaultPadding} from "./elements/padding";
import {defaultMargin} from "./elements/margin";

export const defaultOptions = {
    dpi: 1,
    height: 200,
    width: "100%",
    padding: defaultPadding,
    margin: defaultMargin,
    background: '#fff',
    color: '#000',
    font: defaultFont,
    border: defaultBorder,
    cross: defaultCross,
    showLines: true,
    axis: defaultAxis,
    title: defaultTitle,
    legend: defaultLegend,
    tooltip: defaultTooltip,
    boundaries: false,
    accuracy: 10,
    value: {
        fixed: 0
    },

    onClick: null,
    onHover: null,
    onEnter: null,
    onLeave: null
}

