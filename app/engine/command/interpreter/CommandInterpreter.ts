export interface CommandInterpreter {
    // TODO: Note: the booleans here represent if the command was able to be executed or not
    moveHorizontally: (amount: number) => boolean;
    moveVertically: (amount: number) => boolean;
}
