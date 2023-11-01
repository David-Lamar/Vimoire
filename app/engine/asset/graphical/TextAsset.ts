import {BaseGraphicAsset} from "./BaseGraphicAsset";

class TextAsset extends BaseGraphicAsset {

    private readonly text: string

    constructor(canvas: HTMLCanvasElement, text: string) {
        super(canvas, 0, 0, 0, 0)
        this.text = text
    }

    draw = (context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
        // TODO: This should be abstracted out into a config and done within the canvas
        //  so that these don't need to be part of the primary render for _every_ text asset
        context.font = "32px arial"
        context.textBaseline = "middle"
        context.textAlign = "center"

        context.fillStyle = "#FFF"
        context.fillText(this.text, x, y, width)
        context.drawImage(this.virtualCanvas, this.x, this.y, this.width, this.height, x, y, width, height)
    }
}
