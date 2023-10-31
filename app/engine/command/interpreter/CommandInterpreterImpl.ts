import {CommandInterpreter} from "@/app/engine/command/interpreter/CommandInterpreter";

export class CommandInterpreterImpl implements CommandInterpreter {

    moveHorizontally(): boolean {
        console.log("Move horizontally")
        return true
    }

    moveVertically(): boolean {
        console.log("Move vertically")
        return true
    }

}
