// Shared type definitions for mcbRCtx and mcbRCrx modules
namespace mcbRCTypes {
    export type PinMapItem = {
        key: string
        pin: DigitalPin
    }

    export type ButtonStateItem = {
        key: string
        value: boolean
    }

    export type JoyStateItem = {
        dirArrow: number,
        strength: number,
        deg: number
    }

    export type CenterPoint = {
        x: number
        y: number
    }
}