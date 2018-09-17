import * as React from "react"
import {render} from "react-dom"
import {applyMiddleware, compose, createStore} from "redux"
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import {AppStore, rootReducer} from "./AppReducer"
import {App} from "./App"

export interface InitContext {
    appElementId: string,
}

const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose

const store: AppStore = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            thunk
        )
    )
)

function init(ctx: InitContext) {
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById(ctx.appElementId)
    )
    console.info("Pesennik app initialized")
}

export const appInit = {
    init
}
