export interface UiState {
    fontSize: number
    offsetTop: number
    sidebar: SidebarState
    tuner: TunerState,
    mount: string,
}

export interface SidebarState {
    visible: boolean
    width: number
}

export interface TunerState {
    currentString: GuitarString,
    soundType: TunerSoundType
    repeat: boolean;
}


export enum GuitarString {
    e = "e",
    H = "H",
    G = "G",
    D = "D",
    A = "A",
    E = "E"
}

export enum TunerSoundType {
    Classic = "Classic",
    Electro = "Electro",
}