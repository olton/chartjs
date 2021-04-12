import {defaultFont} from "./font";
import {defaultBorder} from "./border";

export const defaultTooltip = {
    width: "auto",
    background: "#fff",
    color: "#000",
    font: defaultFont,
    border: defaultBorder,
    padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    },
    shadow: {
        shiftX: 2,
        shiftY: 2,
        blur: 4,
        stretch: 0,
        color: 'rgba(0,0,0,.5)'
    },
}