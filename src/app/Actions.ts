import {Action} from "redux"

export interface PAction<T> extends Action<string> {
    payload: T,
}

export function newAction(type: string, payload?: any): PAction<any> {
    return {type, payload}
}
