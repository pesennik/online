import * as React from "react"
import * as ReactRedux from "react-redux"
import {Dispatch} from "redux"
import {AppState} from "../../AppReducer"
import {GuitarString, TunerSoundType, TunerState} from "../../UiState"
import {changeTunerRepeatMode, changeTunerSoundType, changeTunerString} from "../../UiStateReducer"
import {GuitarStringButton} from "./GuitarStringButton"

export const tunerPageMount = "/tuner"

type OwnProps = {}

type StateProps = {
    ui: TunerState
}

type DispatchProps = {
    changeString: (string: GuitarString) => void,
    changeSoundType: (type: TunerSoundType) => void
    changeRepeatMode: (flag: boolean) => void
}

type AllProps = OwnProps & StateProps & DispatchProps;

class TunerPage extends React.Component<AllProps, {}> {

    render(): React.ReactNode {
        const guitarStringButtons = Object.keys(GuitarString).map(gs =>
            <GuitarStringButton key={gs} guitarString={gs as GuitarString}/>)
        return (
            <div>
                <h2>Тюнер для гитары</h2>
                <div>
                    <div>
                        <table className="tuner-table">
                            <tbody>
                            <tr>
                                <td className="bld">Тон:</td>
                                <td>
                                    <select value={this.props.ui.soundType}
                                            onChange={(event) => this.props.changeSoundType(event.target.value as TunerSoundType)}>
                                        <option value={TunerSoundType.Classic}>Классика</option>
                                        <option value={TunerSoundType.Electro}>Электро</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="bld">Повтор:</td>
                                <td>
                                    <input type="checkbox"
                                           checked={this.props.ui.repeat}
                                           onChange={() => this.props.changeRepeatMode(!this.props.ui.repeat)}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="mt20">
                            {guitarStringButtons}
                        </div>
                    </div>
                </div>

                <div className="center-block" style={{maxWidth: 425, minWidth: 330}}>
                    <div className="well mt50">
                        <h3 className="txtc mt10">Горячие клавиши</h3>
                        <table className="mt20 pr10_td pb10_td table-nw table-vat">
                            <tbody>
                            <tr>
                                <td><b>1</b>, <b>2</b>, <b>3</b>, <b>4</b>, <b>5</b>, <b>6</b></td>
                                <td>соотвествующая струна</td>
                            </tr>
                            <tr>
                                <td><b>Space</b></td>
                                <td>пауза/старт</td>
                            </tr>
                            <tr>
                                <td><b>⇦</b> и <b>⇨</b></td>
                                <td>выбор струны: пред./след.</td>
                            </tr>
                            <tr>
                                <td><b>⇧</b> и <b>⇩</b></td>
                                <td style={{whiteSpace: "nowrap"}}>выбор тона: Классика/Электро</td>
                            </tr>
                            <tr>
                                <td><b>0</b></td>
                                <td>режим повтора: вкл./выкл.</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        changeString: guitarString => dispatch(changeTunerString(guitarString)),
        changeSoundType: soundType => dispatch(changeTunerSoundType(soundType)),
        changeRepeatMode: flag => dispatch(changeTunerRepeatMode(flag))
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        ui: state.ui.tuner
    }
}

const tunerPage = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TunerPage) as React.ComponentClass<OwnProps>
export {
    tunerPage as TunerPage
}
