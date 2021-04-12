export const expandPadding = padding => {
    if (typeof padding === "number") {
        return {
            top: padding,
            left: padding,
            right: padding,
            bottom: padding
        }
    }

    return padding
}