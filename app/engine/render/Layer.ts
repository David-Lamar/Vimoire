
export interface Layer {
    // TODO: needsRender
    // TODO: return re-rendered portion(s) of screen?
    render: (context: CanvasRenderingContext2D) => void
}
