
export interface GraphicAsset {
    // "Internal" values -- will be used to know the position in the virtual canvas
    draw: (context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => void;
}
