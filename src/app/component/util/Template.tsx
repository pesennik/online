import * as React from "react"
import * as ReactRedux from "react-redux"
import {Dispatch} from "redux"
import {AppState} from "../../AppReducer"
import {GuitarString} from "../../UiState"

type OwnProps = {}

type StateProps = {}

type DispatchProps = {}

type AllProps = OwnProps & StateProps & DispatchProps;

class Template extends React.Component<AllProps, {}> {

    render(): React.ReactNode {
        return null
    }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {}
}

function mapStateToProps(state: AppState): StateProps {
    return {}
}

const component = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Template) as React.ComponentClass<OwnProps>
export {
    component as Template
}
