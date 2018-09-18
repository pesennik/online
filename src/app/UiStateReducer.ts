import {newAction, PAction} from "./Actions"
import {GuitarString, TunerSoundType, UiState} from "./UiState"
import {pesennikPageMount} from "./component/PesennikPage"
import {tunerPageMount} from "./component/tuner/TunerPage"
import merge from "deepmerge"

enum UiAction {
    OpenPesennikPage = "OpenPesennikPage",
    OpenTunerPage = "OpenTunerPage",
    ChangeTunerString = "ChangeTunerString",
    ChangeTunerSoundType = "ChangeTunerSoundType",
    ChangeTunerRepeatMode = "ChangeTunerRepeatMode"
}

export const openPesennikPageAction = () => newAction(UiAction.OpenPesennikPage)
export const openTunerPageAction = () => newAction(UiAction.OpenTunerPage)
export const changeTunerString = (guitarString: GuitarString) => newAction(UiAction.ChangeTunerString, guitarString)
export const changeTunerSoundType = (soundType: TunerSoundType) => newAction(UiAction.ChangeTunerSoundType, soundType)
export const changeTunerRepeatMode = (flag: boolean) => newAction(UiAction.ChangeTunerRepeatMode, flag)

const UI_STATE_LOCAL_STORAGE_KEY = "pesennik-ui-state"

function buildInitialState(): UiState {
    const localStorageStateJson = localStorage.getItem(UI_STATE_LOCAL_STORAGE_KEY)
    const localStorageState = localStorageStateJson ? JSON.parse(localStorageStateJson) : undefined
    const initialState = {
        fontSize: 14,
        offsetTop: 0,
        sidebar: {
            visible: true,
            width: 100
        },
        tuner: {
            repeat: false,
            soundType: TunerSoundType.Classic,
            currentString: GuitarString.e
        },
        mount: window.location.pathname.toLocaleLowerCase()
    }
    return localStorageState ? merge(initialState, localStorageState) : initialState
}

const initialUiState: UiState = buildInitialState()

export function uiStateReducer(state: UiState = initialUiState, action: PAction<any>): UiState {
    const newState = reduce(state, action)
    localStorage.setItem(UI_STATE_LOCAL_STORAGE_KEY, JSON.stringify(newState))
    return newState
}

function reduce(state: UiState, action: PAction<any>): UiState {
    switch (action.type) {
        case UiAction.OpenPesennikPage:
            return {...state, mount: pesennikPageMount}
        case UiAction.OpenTunerPage:
            return {...state, mount: tunerPageMount}
        case UiAction.ChangeTunerString:
            return {...state, tuner: {...state.tuner, currentString: action.payload}}
        case UiAction.ChangeTunerSoundType:
            return {...state, tuner: {...state.tuner, soundType: action.payload}}
        case UiAction.ChangeTunerRepeatMode:
            return {...state, tuner: {...state.tuner, repeat: action.payload}}
    }
    return state
}

export const uiMountMiddleware = store => next => action => {
    const mountBefore = store.getState().ui.mount
    const result = next(action)
    const mountAfter = store.getState().ui.mount
    if (mountBefore !== mountAfter) {
        console.log("mount before: " + mountBefore + ", mount after: " + mountAfter)
        const data = undefined
        const title = undefined
        window.history.pushState(data, title, mountAfter)
    }
    return result
}