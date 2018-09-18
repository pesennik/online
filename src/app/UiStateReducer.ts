import {newAction, PAction} from "./Actions"
import {GuitarString, TunerSoundType, UiState} from "./UiState"
import {pesennikPageMount} from "./component/PesennikPage"
import {tunerPageMount} from "./component/tuner/TunerPage"
import merge from "deepmerge"
import {AppStore} from "./AppReducer"

enum UiAction {
    OpenPesennikPage = "OpenPesennikPage",
    OpenTunerPage = "OpenTunerPage",
    ChangeTunerString = "ChangeTunerString",
    ChangeTunerSoundType = "ChangeTunerSoundType",
    ChangeTunerRepeatMode = "ChangeTunerRepeatMode",
    SyncWithMount = "SyncWithMount"
}

export const openPesennikPageAction = () => newAction(UiAction.OpenPesennikPage)
export const openTunerPageAction = () => newAction(UiAction.OpenTunerPage)
export const changeTunerString = (guitarString: GuitarString) => newAction(UiAction.ChangeTunerString, guitarString)
export const changeTunerSoundType = (soundType: TunerSoundType) => newAction(UiAction.ChangeTunerSoundType, soundType)
export const changeTunerRepeatMode = (flag: boolean) => newAction(UiAction.ChangeTunerRepeatMode, flag)

const UI_STATE_LOCAL_STORAGE_KEY = "pesennik-ui-state"

function getCurrentMount() {
    return window.location.pathname.toLocaleLowerCase()
}

function buildInitialState(): UiState {
    const localStorageStateJson = localStorage.getItem(UI_STATE_LOCAL_STORAGE_KEY)
    const localStorageState = localStorageStateJson ? JSON.parse(localStorageStateJson) : undefined
    const defaultState = {
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
        mount: ""
    }
    const state = localStorageState ? merge(defaultState, localStorageState) : defaultState
    state.mount = getCurrentMount()
    // console.log("default: " + defaultState.mount + ", ls: " + localStorageState.mount + ", result: " + state.mount)
    return state
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
        case UiAction.SyncWithMount:
            return {...state, mount: getCurrentMount()}
    }
    return state
}

export function uiMountMiddleware(store: AppStore) {
    window.onpopstate = window.onpopstate = function () {
        // console.log("Pop state: " + getCurrentMount())
        store.dispatch(newAction(UiAction.SyncWithMount))
    }
    return function (next) {
        return function (action: PAction<any>) {
            const mountBefore = store.getState().ui.mount
            const result = next(action)
            const mountAfter = store.getState().ui.mount
            if (mountBefore !== mountAfter && action.type !== UiAction.SyncWithMount) {
                const data = undefined
                const title = undefined
                // console.log("Push state: " + mountBefore + " -> " + mountAfter)
                window.history.pushState(data, title, mountAfter)
            }
            return result
        }
    }
}