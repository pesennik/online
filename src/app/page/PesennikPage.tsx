import * as React from "react"
import * as ReactRedux from "react-redux"

import {AppState} from "../AppReducer"
import {Dispatch} from "redux"

type OwnProps = {}

type StateProps = {}

type DispatchProps = {}

type AllProps = OwnProps & StateProps & DispatchProps;

class PesennikPage extends React.Component<AllProps, {}> {

    render(): React.ReactNode {
        return <div>Pesennik Page</div>
    }

}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {}
}

function mapStateToProps(state: AppState): StateProps {
    return {}
}

const pesennikPage = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PesennikPage) as React.ComponentClass<OwnProps>
export {
    pesennikPage as PesennikPage
}
