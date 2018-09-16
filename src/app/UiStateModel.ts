export interface UiState {
    fontSize: number
    offsetTop: number
    sidebar: SidebarState
    tuner: TunerState
}

export interface SidebarState {
    visible: boolean
}

export interface TunerState {
    visible: boolean;
    repeat: boolean;
}
