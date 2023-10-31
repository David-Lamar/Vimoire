import {CommandParser} from "@/app/engine/command/parser/CommandParser";
import {Command} from "@/app/engine/command/Command";
import {CommandInterpreter} from "@/app/engine/command/interpreter/CommandInterpreter";


export class CommandParserImpl implements CommandParser {
    commands: { [key: string]: Command}
    interpreter: CommandInterpreter

    inProgress: Command[] | undefined = undefined

    constructor(
        commands: Command[],
        interpreter: CommandInterpreter,
    ) {
        this.interpreter = interpreter
        this.commands = {}
        for (let i = 0, l = commands.length; i < l; i++) {
            this.commands[commands[i].key] = commands[i]
        }
    }

    private onCommandSuccess = (commandStr: string) => {
        console.log("Command success!", commandStr)
    }

    private onCommandFailure = (commandStr: string) => {
        console.log("Command failed", commandStr)
    }

    onKeyPress = (key: KeyboardEvent) => {
        const inProg = this.inProgress != undefined && this.inProgress[this.inProgress.length - 1].chain
        const comm = (inProg || this.commands)[key.key]
        const commandStr = this.inProgress != undefined ? this.inProgress?.reduce((acc, i) => acc + i.key, "") : key.key

        if (comm != undefined) {
            if (comm.action != undefined) {

                if (comm.action(this.interpreter)) {
                    this.onCommandSuccess(commandStr)
                } else {
                    this.onCommandFailure(commandStr)
                }

                this.inProgress = undefined
            } else {
                this.inProgress = this.inProgress || []
                this.inProgress.push(comm)
            }
        } else {
            this.onCommandFailure(commandStr)
        }
    }
}
