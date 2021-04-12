export const expandMargin = margin => {
    if (typeof margin === "number") {
        return {
            top: margin,
            left: margin,
            right: margin,
            bottom: margin
        }
    }

    return margin
}