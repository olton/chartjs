import {defaultFont} from "./font";
import {defaultBorder} from "./border";
import {defaultPadding} from "./padding";

export const defaultTooltip = {
    width: "auto",
    background: "#fffcd5",
    color: "#000",
    font: defaultFont,
    border: defaultBorder,
    padding: defaultPadding,
    timeout: 3000,
    onShow: null
}