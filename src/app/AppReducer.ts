import {AnyAction, combineReducers, Store} from "redux"
import {uiStateReducer} from "./UiStateReducer"
import {Pesennik} from "./PesennikModel"
import {UiState} from "./UiStateModel"
import {pesennikReducer} from "./PesennikStateReducer"

export interface AppState extends Store<any, AnyAction> {
    uiState: UiState;
    pesennik: Pesennik
}

export const rootReducer = combineReducers({
    uiState: uiStateReducer,
    pesennik: pesennikReducer
})
