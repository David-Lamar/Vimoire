import {GraphicAsset} from "./GraphicAsset";

export abstract class BaseGraphicAsset implements GraphicAsset {
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
