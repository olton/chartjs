import {isObject} from "./is-object"

export const mergeProps = (...args) => {
    let result = {}

    args.forEach( v => {
        if (v && isObject(v)) Object.assign(result, v)
    })

    return result
}