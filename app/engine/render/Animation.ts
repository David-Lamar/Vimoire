
export interface Position {
    x: number;
    y: number;
}

export interface PositionAnimation {
    start: Position;
    end: Position;
    duration: number;
    onFinish?: (() => void) | undefined;
}
