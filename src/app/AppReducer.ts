import {combineReducers, Store} from "redux"
import {uiStateReducer} from "./UiStateReducer"
import {Pesennik} from "./PesennikState"
import {UiState} from "./UiState"
import {pesennikStateReducer} from "./PesennikStateReducer"
import {PAction} from "./Actions"

export interface AppState {
    ui: UiState;
    pesennik: Pesennik
}

export interface AppStore extends Store<AppState, PAction<any>> {
}

export const rootReducer = combineReducers({
    ui: uiStateReducer,
    pesennik: pesennikStateReducer
})
