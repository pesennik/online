import * as React from "react"
import * as ReactRedux from "react-redux"

import {AppState} from "../AppReducer"
import {Dispatch} from "redux"

type OwnProps = {}

type StateProps = {}

type DispatchProps = {}

type AllProps = OwnProps & StateProps & DispatchProps;

class Page404 extends React.Component<AllProps, {}> {

    render(): React.ReactNode {
        return <div>Page not found</div>
    }

}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {}
}

function mapStateToProps(state: AppState): StateProps {
    return {}
}

const page404 = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Page404) as React.ComponentClass<OwnProps>
export {
    page404 as Page404
}
