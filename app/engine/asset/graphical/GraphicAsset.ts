
interface GraphicAsset {
    // "Internal" values -- will be used to know the position in the virtual canvas
    draw: (context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => void;
}

abstract class BaseGraphicAsset implements GraphicAsset {
    protected virtualCanvas: HTMLCanvasElement;
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;

    protected constructor(canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number) {
        this.virtualCanvas = canvas;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    abstract draw: (context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => void;
}

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

// interface ImageAsset extends GraphicAsset {
//
// }
//
// interface SpriteSheet extends GraphicAsset {
//
//     // "Internal" values -- will be used to know the position in the virtual canvas
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//     gridSize: number; // TODO: Should have an excludes list
// }
//
// interface TextAsset extends GraphicAsset {
//     text: string;
// }
