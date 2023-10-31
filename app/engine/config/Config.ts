import {CommandInterpreter} from "@/app/engine/command/interpreter/CommandInterpreter";

export interface Config {
    gridSize: number;
    movementAnimationSpeed: number; // Milliseconds
    resolution: Resolution;
    keyBindings: KeyBindings;
}

export interface Resolution {
    width: number;
    height: number;
}

export interface KeyBindings {
    [key: string]: string
}

export const DefaultConfig = {
    gridSize: 32,
    movementAnimationSpeed: 300,
    resolution: {
        width: 1440,
        height: 1080,
    } as Resolution,
    keyBindings: {
        "h": "h",
        "j": "j",
        "k": "k",
        "l": "l",
    } as KeyBindings
} as Config



/*
const BaseCommands = [
    {
        key: "h",
        levelUnlock: 0,
        action: (interpreter: CommandInterpreter) => { return interpreter.moveHorizontally(-1) }
    } as Command,
    {
        key: "j",
        levelUnlock: 0,
        action: (interpreter: CommandInterpreter) => { return interpreter.moveVertically(1) }
    } as Command,
    {
        key: "k",
        levelUnlock: 0,
        action: (interpreter: CommandInterpreter) => { return interpreter.moveVertically(-1) }
    } as Command,
    {
        key: "l",
        levelUnlock: 0,
        action: (interpreter: CommandInterpreter) => { return interpreter.moveHorizontally(1) }
    } as Command,

    {
        key: "H",
        levelUnlock: 0,
        action: (interpreter: CommandInterpreter) => { console.log("Move to top of screen") }
    } as Command,
    {
        key: "L",
        levelUnlock: 0,
        action: (interpreter: CommandInterpreter) => { console.log("Move to bottom of screen") }
    } as Command,
]
 */
