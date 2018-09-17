import {Pesennik} from "./PesennikState"
import {PAction} from "./Actions"

function buildInitialState(): Pesennik {
    return {} as Pesennik //todo
}

const initialPesennikState: Pesennik = buildInitialState()

export function pesennikStateReducer(state: Pesennik = initialPesennikState, action: PAction<any>): Pesennik {
    return state
}
