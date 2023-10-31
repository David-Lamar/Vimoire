import {Layer} from "@/app/engine/render/Layer";

export class CanvasController {

    private readonly context: CanvasRenderingContext2D

    private canvas: HTMLCanvasElement

    private running: boolean = false
    private renderCount: number = 0
    private nextInterval: number = 0

    private layers: Layer[] = []

    fps: number = 0

    constructor(
        canvas: HTMLCanvasElement
    ) {
        this.canvas = canvas
        this.canvas.width = 1440
        this.canvas.height = 1080
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D
    }

    addLayer(layer: Layer) {
        this.layers.push(layer)
    }

    removeLayer(layer: Layer) {
        this.layers = this.layers.slice(this.layers.indexOf(layer), 1)
    }

    start = () => {
        this.running = true
        window.requestAnimationFrame(this.render)
    }

    stop = () => {
        this.running = false
    }

    render = () => {
        const now = Date.now()
        this.renderCount++
        if (now > this.nextInterval) {
            this.nextInterval = now + 1000
            this.fps = this.renderCount
            this.renderCount = 0
            // console.log("FPS:", this.fps)
        }

        // TODO: Should optimize so that only parts of the screen that need to be redrawn, are
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (let i = 0, l = this.layers.length; i < l; i++) {
            this.layers[i].render(this.context)
        }

        if (this.running) window.requestAnimationFrame(this.render)
    }

}
