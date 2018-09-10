import * as React from "react"
import {render} from "react-dom"

export interface InitContext {
    appElementId: string,
}

function init(ctx: InitContext) {
    render(
        <div>Hello React!</div>,
        document.getElementById(ctx.appElementId)
    )
}

export const app = {
    init
}