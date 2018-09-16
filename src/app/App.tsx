import * as React from "react"
import {render} from "react-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import {AppState, rootReducer} from "./AppReducer"
import {PesennikPage} from "./page/PesennikPage"
import {TunerPage} from "./page/TunerPage"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {Page404} from "./page/Page404"

export interface InitContext {
    appElementId: string,
}

function getStoreEnhancer() {
    return window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]()
}

const store: AppState = createStore(rootReducer as any, getStoreEnhancer())

function init(ctx: InitContext) {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={PesennikPage}/>
                        <Route path="/tuner" component={TunerPage}/>
                        <Route component={Page404}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById(ctx.appElementId)
    )
}

export const app = {
    init
}