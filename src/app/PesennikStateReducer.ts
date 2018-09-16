import {Pesennik} from "./PesennikModel"
import {PAction} from "./Actions"

function buildInitialState(): Pesennik {
    return {} as Pesennik //todo
}

const initialState = buildInitialState()

export function pesennikReducer(state: Pesennik = initialState, action: PAction<any>): Pesennik {
    return state
}
