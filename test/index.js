import {lineChart} from "../src"
import {lines} from "./lines"

const chart = lineChart("#chart", lines, {
    dpi: 1,
    height: 600,
    showLines: true,
    accuracy: 4,
    boundaries: {
        minY: 3800,
        maxY: 7300
    },
    padding: {
        right: 10
    },
    title: {
        text: 'The LineChart Example',
        align: 'center',
        font: {
            lineHeight: 1
        }
    },
    axis: {
        linesX: 10,
        linesY: 10,

        onDrawLabelY: label => Math.round(label),
        onDrawLabelX: label => {
            //return label
            const d = new Date(label)
            return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/")
        },
    },
    legend: {
        width: 0
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
