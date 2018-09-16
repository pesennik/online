import {UiState} from "./UiStateModel"
import {PAction} from "./Actions"

function buildInitialState(): UiState {
    return {
        fontSize: 14,
        offsetTop: 0,
        sidebar: {
            visible: true
        },
        tuner: {
            visible: false,
            repeat: false
        }
    }
}

const initialState = buildInitialState()

export function uiStateReducer(state: UiState = initialState, action: PAction<any>): UiState {
    return state
}
