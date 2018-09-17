import * as React from "react"
import * as ReactRedux from "react-redux"
import {Dispatch} from "redux"
import {AppState} from "../AppReducer"

type OwnProps = {}

type StateProps = {}

type DispatchProps = {}

type AllProps = OwnProps & StateProps & DispatchProps;

class SongPanel extends React.Component<AllProps, {}> {

}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {}
}

function mapStateToProps(state: AppState): StateProps {
    return {}
}

const songPanel = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SongPanel) as React.ComponentClass<OwnProps>
export {
    songPanel as SongPanel
}
