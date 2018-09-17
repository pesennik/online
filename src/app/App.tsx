import * as React from "react"
import * as ReactRedux from "react-redux"

import {AppState} from "./AppReducer"
import {Dispatch} from "redux"
import {UiState} from "./UiState"
import {PesennikPage, pesennikPageMount} from "./component/PesennikPage"
import {Page404} from "./component/Page404"
import {TunerPage, tunerPageMount} from "./component/tuner/TunerPage"
import {PageWithSidebar} from "./component/PageWithSidebar"

type OwnProps = {}

type StateProps = { ui: UiState }

type DispatchProps = {}

type AllProps = OwnProps & StateProps & DispatchProps;

class App extends React.Component<AllProps, {}> {

    render(): React.ReactNode {
        const page = getPageFromMount(this.props.ui.mount)
        if (page === undefined) {
            return <Page404/>
        }
        return <PageWithSidebar children={page}/>
    }
}

function getPageFromMount(mount: string): React.ReactNode | undefined {
    switch (mount) {
        case pesennikPageMount:
            return <PesennikPage/>
        case tunerPageMount:
            return <TunerPage/>
    }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {}
}

function mapStateToProps(state: AppState): StateProps {
    return {
        ui: state.ui
    }
}

const app = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App) as React.ComponentClass<OwnProps>
export {
    app as App
}
