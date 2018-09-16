import * as React from "react"
import * as ReactRedux from "react-redux"

import {AppState} from "../AppReducer"
import {Dispatch} from "redux"

type OwnProps = {}

type StateProps = {}

type DispatchProps = {}

type AllProps = OwnProps & StateProps & DispatchProps;

class TunerPage extends React.Component<AllProps, {}> {

    render(): React.ReactNode {
        return <div>Tuner Page</div>
    }

}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {}
}

function mapStateToProps(state: AppState): StateProps {
    return {}
}

const tunerPage = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TunerPage) as React.ComponentClass<OwnProps>
export {
    tunerPage as TunerPage
}
