import * as React from "react"
import * as ReactRedux from "react-redux"
import {Dispatch} from "redux"
import {AppState} from "../AppReducer"
import {openPesennikPageAction, openTunerPageAction} from "../UiStateReducer"
import {SidebarState} from "../UiState"

type OwnProps = {}

type StateProps = {
    ui: SidebarState
}

type DispatchProps = {
    openPesennik: () => void
    openTuner: () => void
}

type AllProps = OwnProps & StateProps & DispatchProps;

class Sidebar extends React.Component<AllProps, {}> {

    render(): React.ReactNode {
        const {width, visible} = this.props.ui
        if (!visible) {
            return <div/>
        }
        return (
            <div style={{right: 0, width}} className="sidebar">
                <div>
                    <a onClick={() => this.props.openPesennik()}>Pesennik</a>
                </div>
                <div>
                    <a onClick={() => this.props.openTuner()}>Tuner</a>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        openPesennik: () => dispatch(openPesennikPageAction()),
        openTuner: () => dispatch(openTunerPageAction())
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {ui: state.ui.sidebar}
}

const sidebar = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Sidebar) as React.ComponentClass<OwnProps>
export {
    sidebar as Sidebar
}
