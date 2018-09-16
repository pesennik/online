import {Action} from "redux"

export enum ActionType {
}

export interface PAction<T> extends Action<ActionType> {
    payload: T,
}

