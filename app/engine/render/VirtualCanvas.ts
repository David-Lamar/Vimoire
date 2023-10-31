
class VirtualCanvas {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.canvas.width = 1440
        this.canvas.height = 1080
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D
    }

    // TODO:
    //  - Should expose functions that let us save in files
    //  - Internally, we should have some way to optimally assign locations within the canvas to use as little space as possible
    //  -

}
