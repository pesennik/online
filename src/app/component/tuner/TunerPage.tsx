import * as React from "react"
import * as ReactRedux from "react-redux"
import {Dispatch} from "redux"
import {AppState} from "../../AppReducer"
import {GuitarString, TunerSoundType, TunerState} from "../../UiState"
import {changeTunerRepeatMode, changeTunerSoundType, changeTunerString, toggleTunerPlayState} from "../../UiStateReducer"
import {getGuitarStringByNumber, getNextGuitarString, getPrevGuitarString, TunerStringButton} from "./TunerStringButton"

export const tunerPageMount = "/tuner"

type OwnProps = {}

type StateProps = {
    ui: TunerState
}

type DispatchProps = {
    changeString: (string: GuitarString) => void,
    changeSoundType: (type: TunerSoundType) => void
    changeRepeatMode: (flag: boolean) => void
    toggleTunerPlayState: () => void
}

type AllProps = OwnProps & StateProps & DispatchProps;

class TunerPage extends React.Component<AllProps, {}> {

    constructor(props: AllProps) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    render(): React.ReactNode {
        const guitarStringButtons = Object.keys(GuitarString).map(gs =>
            <TunerStringButton key={gs} guitarString={gs as GuitarString}/>)
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

    componentDidMount(): void {
        document.addEventListener("keydown", this.onKeyDown);
    }

    componentWillUnmount(): void {
        document.removeEventListener("keydown", this.onKeyDown)
    }

    onKeyDown(event: KeyboardEvent) {
        if ("123456".includes(event.key)) {
            const gs = getGuitarStringByNumber(event.key)
            if (gs) {
                this.props.changeString(gs)
            }
        } else if (event.key === "ArrowRight" || event.key.toUpperCase() === "X") {
            const nextString = getNextGuitarString(this.props.ui.currentString) || GuitarString.e;
            this.props.changeString(nextString)
        } else if (event.key === "ArrowLeft" || event.key.toUpperCase() === "Z") {
            const prevString = getPrevGuitarString(this.props.ui.currentString) || GuitarString.E;
            this.props.changeString(prevString)
        } else if (event.key === " " || event.key.toUpperCase() === "C") {
            this.props.toggleTunerPlayState()
        } else if (event.key === "0" || event.key === "Insert" /*numpad 0*/ || event.key.toUpperCase() === "V") {
            this.props.changeRepeatMode(!this.props.ui.repeat);
        } else if (event.key == "ArrowUp" || event.key == "ArrowDown" || event.key.toUpperCase() === "B") {
            const newSoundType = this.props.ui.soundType == TunerSoundType.Classic ? TunerSoundType.Electro : TunerSoundType.Classic
            this.props.changeSoundType(newSoundType)
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        changeString: guitarString => dispatch(changeTunerString(guitarString)),
        changeSoundType: soundType => dispatch(changeTunerSoundType(soundType)),
        changeRepeatMode: flag => dispatch(changeTunerRepeatMode(flag)),
        toggleTunerPlayState: () => dispatch(toggleTunerPlayState())
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
