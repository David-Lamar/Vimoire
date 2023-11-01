import {BaseGraphicAsset} from "./BaseGraphicAsset";

/**
 * This class should not be manually instantiated; it should be automatically created within the AssetLoader.
 */
class ImageAsset extends BaseGraphicAsset {
    constructor(canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number) {
        super(canvas, x, y, width, height)
    }

    draw = (context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
        context.drawImage(this.virtualCanvas, this.x, this.y, this.width, this.height, x, y, width, height)
    }
}
