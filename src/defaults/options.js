import {DPI} from "./const";
import {defaultBorder} from "./border";
import {defaultFont, labelFont, titleFont} from "./font";
import {defaultEvent} from "./event";
import {defaultAxis} from "./axis";
import {defaultTitle} from "./title";
import {defaultLegend} from "./legend";
import {defaultTooltip} from "./tooltip";
import {defaultCross} from "./cross";
import {defaultPadding} from "./padding";
import {defaultMargin} from "./margin";

export const defaultOptions = {
    dpi: DPI,
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

    onClick: defaultEvent,
    onHover: defaultEvent,
    onEnter: defaultEvent,
    onLeave: defaultEvent
}

