import * as React from "react"
import * as ReactRedux from "react-redux"
import {Sidebar} from "./Sidebar"
import {AppState} from "../AppReducer"
import {UiState} from "../UiState"
import {Dispatch} from "redux"

type OwnProps = {}

type StateProps = {
    ui: UiState
}

type DispatchProps = {}

type AllProps = OwnProps & StateProps & DispatchProps;

class PageWithSidebar extends React.Component<AllProps, {}> {

    render(): React.ReactNode {
        const sidebar = this.props.ui.sidebar
        return (
            <div>
                <Sidebar/>
                <div style={{
                    marginLeft: sidebar.visible ? sidebar.width : 0
                }}>
                    {this.props.children}
                </div>
            </div>
        )
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

const pageWithSidebar = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PageWithSidebar) as React.ComponentClass<OwnProps>
export {
    pageWithSidebar as PageWithSidebar
}
