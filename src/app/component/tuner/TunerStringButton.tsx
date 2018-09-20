import * as React from "react"
import * as ReactRedux from "react-redux"
import {Dispatch} from "redux"
import {AppState} from "../../AppReducer"
import {GuitarString, TunerSoundType} from "../../UiState"
import {changeTunerString, restartTunerPlayState} from "../../UiStateReducer"

type OwnProps = {
    guitarString: GuitarString
}

type StateProps = {
    repeat: boolean
    selected: boolean,
    soundType: TunerSoundType,
    playRequestNum: number
}

type DispatchProps = {
    changeString: (gs: GuitarString) => void,
    restartTunerPlayState: () => void
}

type AllProps = OwnProps & StateProps & DispatchProps;

type State = {
    audio?: HTMLAudioElement,
    playing?: boolean,
}

class TunerStringButton extends React.Component<AllProps, State> {

    constructor(props: AllProps) {
        super(props);
        this.state = {}
        this.onClick = this.onClick.bind(this)
    }

    render(): React.ReactNode {
        const {guitarString, selected} = this.props
        const idx = Object.keys(GuitarString).indexOf(guitarString) + 1
        const classes = "tuner-string-button" + (selected ? " tuner-string-button-active" : "")
        return (
            <a onClick={this.onClick} className={classes} title={"Переключиться на струну " + idx + ": " + guitarString}>
                {idx}
            </a>
        )
    }

    onClick() {
        if (this.props.selected) {
            this.props.restartTunerPlayState()
            return;
        }
        this.props.changeString(this.props.guitarString)
    }

    componentDidUpdate(prevProps: Readonly<AllProps>, prevState: Readonly<State>): void {
        //TODO: move sound start/stop away to some form of reducer. Question: where to keep audio element? In Redux we can keep 'playing' flag.
        if (!this.props.selected) {
            this.pause();
            return;
        }
        if (this.props.playRequestNum != prevProps.playRequestNum) {
            this.pause();
            if (this.props.playRequestNum > 0) {
                this.play();
            }
        }
    }

    private play() {
        // TODO: do not recreate audio element.
        const audio: HTMLAudioElement = new Audio(getSoundFileUrl(this.props.guitarString, this.props.soundType));
        const promise = audio.play();
        this.setState({audio: audio})
        if (promise) {
            promise.then(() => {
                this.setState({...this.state, playing: true});
                audio.addEventListener("ended", () => this.setState({...this.state, playing: false}))
            })
        }
    }

    private pause() {
        if (this.state.audio && this.state.playing) {
            this.state.audio.pause();
            this.setState({...this.state, playing: false})
        }
    }
}

export function getGuitarStringNumber(guitarString: GuitarString): number {
    switch (guitarString) {
        case GuitarString.e:
            return 1
        case GuitarString.H:
            return 2
        case GuitarString.G:
            return 3
        case GuitarString.D:
            return 4
        case GuitarString.A:
            return 5
        case GuitarString.E:
            return 6
    }
    console.error("Unreachable state: " + guitarString);
    return 1
}

export function getGuitarStringByNumber(number: string | number): GuitarString | undefined {
    switch (number.toString()) {
        case "1":
            return GuitarString.e
        case "2":
            return GuitarString.H
        case "3":
            return GuitarString.G
        case "4":
            return GuitarString.D
        case "5":
            return GuitarString.A
        case "6":
            return GuitarString.E
    }
}

export function getNextGuitarString(guitarString: GuitarString): GuitarString | undefined {
    const number = getGuitarStringNumber(guitarString);
    return getGuitarStringByNumber(number + 1);
}

export function getPrevGuitarString(guitarString: GuitarString): GuitarString | undefined {
    const number = getGuitarStringNumber(guitarString);
    return getGuitarStringByNumber(number - 1);
}


function getSoundFileUrl(guitarString: GuitarString, soundType: TunerSoundType): string {
    const stringIdx = getGuitarStringNumber(guitarString)
    const soundPrefix = soundType.substring(0, 1).toLowerCase()
    return "/media/tuner/string/" + soundPrefix + stringIdx + ".mp3"
}


function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        changeString: (gs: GuitarString) => dispatch(changeTunerString(gs)),
        restartTunerPlayState: () => dispatch(restartTunerPlayState())
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        repeat: state.ui.tuner.repeat,
        selected: state.ui.tuner.currentString === ownProps.guitarString,
        soundType: state.ui.tuner.soundType,
        playRequestNum: state.ui.tuner.playRequest
    }
}

const tunerStringButton = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TunerStringButton) as React.ComponentClass<OwnProps>
export {
    tunerStringButton as TunerStringButton
}
