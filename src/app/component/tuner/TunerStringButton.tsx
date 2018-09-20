import * as React from "react"
import * as ReactRedux from "react-redux"
import {Dispatch} from "redux"
import {AppState} from "../../AppReducer"
import {GuitarString} from "../../UiState"
import {changeTunerString} from "../../UiStateReducer"

type OwnProps = {
    guitarString: GuitarString
}

type StateProps = {
    selected: boolean
}

type DispatchProps = {
    selectGuitarString: (gs: GuitarString) => void
}

type AllProps = OwnProps & StateProps & DispatchProps;

class TunerStringButton extends React.Component<AllProps, {}> {

    render(): React.ReactNode {
        const {guitarString, selected} = this.props
        const idx = Object.keys(GuitarString).indexOf(guitarString) + 1
        const classes = "tuner-string-button" + (selected ? " tuner-string-button-active" : "")
        return (
            <a
                onClick={() => this.props.selectGuitarString(guitarString)}
                className={classes}
                title={"Переключиться на струну " + idx + ": " + guitarString}>
                {idx}
            </a>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        selectGuitarString: (gs: GuitarString) => dispatch(changeTunerString(gs))
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        selected: state.ui.tuner.currentString == ownProps.guitarString
    }
}

const tunerStringButton = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TunerStringButton) as React.ComponentClass<OwnProps>
export {
    tunerStringButton as TunerStringButton
}
