import {lineChart} from "../../src"
import {lines, lines2} from "./lines"

lineChart("#line-chart-1", lines, {
    height: 600,
    accuracy: 4,
    // border: false,
    boundaries: {
        minY: 3800,
        maxY: 7300
    },
    padding: {
        right: 20
    },
    title: {
        text: 'The LineChart',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    axis: {
        linesX: 6,
        linesY: 10,

        onDrawLabelY: label => Math.round(label),
        onDrawLabelX: label => {
            //return label
            const d = new Date(label)
            return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/")
        },
    },
    tooltip: {
        onShow: ([x, y], graph) => {
            const d = new Date(x)
            const date = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/")
            return `
                <h3 style="margin: 0 0 5px 0">${graph.name}</h3>
                <table>
                    <tr>
                        <td>Date:</td><td><b>${date}</b></td>     
                    </tr>                   
                    <tr>                   
                        <td>Count:</td><td><b>${y}</b></td>                        
                    </tr>                
                </table>
            `
        }
    }
    //onHover: (x, y) => console.log(x, y)
})

lineChart("#line-chart-2", lines2, {
    height: 600,
    accuracy: 4,
    boundaries: {
        minY: 3800,
        maxY: 7300
    },
    padding: {
        right: 20
    },
    title: {
        text: 'The LineChart :: disabled lines',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    axis: {
        linesX: 6,
        linesY: 10,

        onDrawLabelY: label => Math.round(label),
        onDrawLabelX: label => {
            //return label
            const d = new Date(label)
            return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/")
        },
    },
    tooltip: {
        onShow: ([x, y], graph) => {
            const d = new Date(x)
            const date = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/")
            return `
                <h3 style="margin: 0 0 5px 0">${graph.name}</h3>
                <table>
                    <tr>
                        <td>Date:</td><td><b>${date}</b></td>     
                    </tr>                   
                    <tr>                   
                        <td>Count:</td><td><b>${y}</b></td>                        
                    </tr>                
                </table>
            `
        }
    },
    legend: {
        vertical: true,
        margin: {
            left: 20
        },
        padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        },
        border: {
            color: '#000'
        },
        dash: [5, 3]
    }
    //onHover: (x, y) => console.log(x, y)
})
