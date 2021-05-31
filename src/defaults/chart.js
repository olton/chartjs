import {defaultBorder} from "./elements/border";
import {defaultFont} from "./elements/font";
import {defaultTitle} from "./elements/title";
import {defaultLegend} from "./elements/legend";
import {defaultTooltip} from "./elements/tooltip";
import {defaultPadding} from "./elements/padding";
import {defaultMargin} from "./elements/margin";
import {defaultColors} from "./elements/colors";

export const defaultOptions = {
    dpi: 1,
    height: 200,
    width: "100%",
    padding: {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    },
    margin: defaultMargin,
    background: '#fff',
    color: '#000',
    font: defaultFont,
    border: defaultBorder,
    title: defaultTitle,
    legend: defaultLegend,
    tooltip: defaultTooltip,
    boundaries: false,
    colors: Object.values(defaultColors),
    animate: false,

    onDrawLabelY: null,
    onDrawLabelX: null,
    onTooltipShow: null,
    onHover: null,
    onLeave: null
}

