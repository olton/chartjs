const DPI = window.devicePixelRatio

const defaultFont = {
    style: 'normal',
    family: "Helvetica, sans-serif",
    size: 12,
    weight: 'normal',
    lineHeight: 1.2,
}

const labelFont = Object.assign({}, defaultFont, {weight: 'bold'})
const titleFont = Object.assign({}, defaultFont, {weight: 'bold', size: 24})

export const defaultOptions = {
    dpi: DPI,
    height: 200,
    width: "100%",
    padding: {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40,
    },
    background: '#fff',
    color: '#000',
    font: defaultFont,
    border: {
        width: 1,
        lineType: 'solid',
        color: '#e3e3e3'
    },
    cross: {
        size: 1,
        color: '#bbb'
    },
    showLines: true,
    accuracy: 10,

    axis: {
        lineColor: '#e3e3e3',
        labelColor: '#000',
        showXAxis: true,
        showYAxis: true,
        showXLines: true,
        showYLines: true,
        linesX: 5,
        linesY: 5,
        labelsX: 5,
        labelsY: 5,
        font: labelFont,
        arrowX: {
            color: '#000'
        },
        arrowY: {
            color: '#000'
        },
        onDrawLabelY: null,
        onDrawLabelX: null
    },

    title: {
        display: true,
        position: 'top', // top, left, bottom, right
        align: 'center', // start, center, end
        rtl: false,
        color: '#000',
        text: '',
        font: titleFont,
        padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
        },

        onClick: () => {},
        onHover: () => {},
        onEnter: () => {},
        onLeave: () => {}
    },

    legend: {
        display: true,
        position: 'top', // top, left, bottom, right
        align: 'center', // start, center, end
        height: 0, // maxHeight in px
        width: 0, // maxWidth in px
        rtl: false,
        margin: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
        },

        labels: {
            color: '#000',
            font: {
                family: "Helvetica, Arial, sans-serif",
                size: 12, // px
                style: 'normal', // CSS font-style option
                weight: 'boldness',
                lineHeight: 1.2, // number or string
            },
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
            align: 'center'
        },

        onClick: () => {},
        onHover: () => {},
        onEnter: () => {},
        onLeave: () => {}
    },

    tooltip: {

    },

    onClick: () => {},
    onHover: () => {},
    onEnter: () => {},
    onLeave: () => {}
}

