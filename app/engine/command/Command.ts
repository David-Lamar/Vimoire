import {CommandInterpreter} from "@/app/engine/command/interpreter/CommandInterpreter";
import {Config} from "@/app/engine/config/Config";

export interface Command {
    key: string;
    levelUnlock: number;
    action?: ((commandInterpreter: CommandInterpreter) => boolean) | undefined; // Returns true if successful
    chain: { [key: string]: Command };
}

export const Commands = (config: Config) => {
    return [
        {
            key: config.keyBindings['h'],
            levelUnlock: 0,
            action: (interpreter: CommandInterpreter) => interpreter.moveHorizontally(-1)
        } as Command,
        {
            key: config.keyBindings['j'],
            levelUnlock: 0,
            action: (interpreter: CommandInterpreter) => interpreter.moveVertically(1)
        } as Command,
        {
            key: config.keyBindings['k'],
            levelUnlock: 0,
            action: (interpreter: CommandInterpreter) => interpreter.moveVertically(-1)
        } as Command,
        {
            key: config.keyBindings['l'],
            levelUnlock: 0,
            action: (interpreter: CommandInterpreter) => interpreter.moveHorizontally(1)
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
}
