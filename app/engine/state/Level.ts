import {Layer} from "@/app/engine/render/Layer";
import {CanvasController} from "@/app/engine/render/CanvasController";
import {Config} from "@/app/engine/config/Config";
import {Position} from "@/app/engine/render/Animation";
import {CommandInterpreter} from "@/app/engine/command/interpreter/CommandInterpreter";

export class Level implements CommandInterpreter {

    readonly id: number
    private readonly gridSize: number
    private readonly textOffset: number
    private readonly width: number
    private readonly gridWidth: number
    private readonly height: number
    private readonly gridHeight: number
    private readonly horizontalScrollThreshold: number
    private readonly verticalScrollThreshold: number

    private map: string[][]
    private readonly mapWidth: number
    private readonly mapHeight: number

    private controller: CanvasController
    private layer: Layer

    // TODO: Will need these for future optimization
    // private lastLevelXOffset = -1
    // private lastLevelYOffset = -1
    private levelOffset: Position = {
        x: 0,
        y: 0
    }

    private playerPosition: Position = {
        x: 32,
        y: 7 * 32,
    }

    constructor(
        id: number,
        map: string,
        controller: CanvasController,
        config: Config,
    ) {
        this.id = id
        this.controller = controller
        this.gridSize = config.gridSize
        this.textOffset = config.gridSize / 2
        this.width = config.resolution.width
        this.height = config.resolution.height
        this.gridWidth = Math.ceil(this.width / this.gridSize)
        this.gridHeight = Math.ceil(this.height / this.gridSize)

        // Note: These are in raw pixels -- not grid chunks
        this.horizontalScrollThreshold = Math.floor(this.width * .1)
        this.verticalScrollThreshold = Math.floor(this.height * .1)

        const split = map.split("\n").filter((s) => s.length > 0)
        let lastSize = split[0].length

        this.map = new Array(lastSize).fill(new Array(split.length))

        this.mapWidth = lastSize * config.gridSize
        this.mapHeight = split.length * config.gridSize

        for (let x = 0, xl = lastSize; x < xl; x++) {
            this.map[x] = new Array(split.length)
            for (let y = 0, yl = split.length; y < yl; y++) {
                if (split[y].length != lastSize) throw new Error(`A map must be a uniform width. Row ${y} was only ${split[y].length} characters. Expected ${lastSize}`)
                this.map[x][y] = split[y][x]
            }
        }

        this.layer = {
            render: this.render
        } as Layer

        this.controller.addLayer(this.layer)
    }

    // TODO: it may be good to abstract some of this logic into _strategies_

    moveHorizontally = (amount: number) => {
        const newX = this.playerPosition.x + amount * 32
        if (newX >= 0 && newX < this.mapWidth) {
            this.playerPosition.x = newX
            this.updateLevelOffset()
            return true
        }

        return false
    }

    moveVertically = (amount: number) => {
        // TODO: Should take into account the current x position;
        //  If moving directly vertical isn't possible, then:
        //      - If possible, move to the closest space to the left that we can get to on the subsequent vertical line
        //      - Note: There must be a _direct_ path to that space. If moving left + vertical cannot get to that space, then it's not valid
        //      - If no space is possible, the command will result in failure and the cursor will not be moved

        const newY = this.playerPosition.y + amount * 32
        if (newY >= 0 && newY < this.mapHeight) {
            this.playerPosition.y = newY
            this.updateLevelOffset()
            return true
        }

        return false
    }

    private updateLevelOffset = () => {
        // X axis
        const minX = this.horizontalScrollThreshold - this.levelOffset.x
        const maxX = (this.width - this.horizontalScrollThreshold) - this.levelOffset.x

        if (this.playerPosition.x < minX && this.levelOffset.x < 0) {
            this.levelOffset.x += 32
        }

        if (this.playerPosition.x > maxX && -this.levelOffset.x < (this.mapWidth - this.width)) {
            this.levelOffset.x -= 32
        }

        // Y axis
        const minY = this.verticalScrollThreshold - this.levelOffset.y
        const maxY = (this.height - this.verticalScrollThreshold) - this.levelOffset.y

        if (this.playerPosition.y < minY && this.levelOffset.y < 0) {
            this.levelOffset.y += 32
        }

        if (this.playerPosition.y > maxY && -this.levelOffset.y < (this.mapHeight - this.height)) {
            this.levelOffset.y -= 32
        }
    }

    // TODO: this may be moved out of this file at a later time into its own abstraction
    private render = (context: CanvasRenderingContext2D) => {
        // TODO: Once optimized with drawing only needed areas, should only check for state changes and render as-needed

        context.font = "32px arial"
        context.textBaseline = "middle"
        context.textAlign = "center"
        context.fillStyle = "#FFF"

        for (let x = this.minimumValidX(), xl = this.maximumValidX(); x < xl; x++) {
            for (let y = this.minimumValidY(), yl = this.maximumValidY(); y < yl; y++) {
                context.fillText(
                    this.map[x][y],
                    (x * this.gridSize) + this.textOffset + this.levelOffset.x,
                    (y * this.gridSize) + this.textOffset + this.levelOffset.y,
                    this.gridSize)
            }
        }

        context.fillStyle = "#FFFFFF88"
        context.fillRect(this.playerPosition.x + this.levelOffset.x, this.playerPosition.y + this.levelOffset.y, 32, 32)
    }

    private cap = (x: number, min: number, max: number) => {
        if (x < min) return min
        if (x > max) return max
        return x
    }

    private minimumValidX = () => {
        return this.cap(-Math.floor(this.levelOffset.x / this.gridSize), 0, this.map.length)
    }

    private minimumValidY = () => {
        return this.cap(-Math.floor(this.levelOffset.y / this.gridSize), 0, this.map[0].length)
    }

    private maximumValidX = () => {
        return this.cap(this.gridWidth - Math.ceil(this.levelOffset.x / this.gridSize), 0, this.map.length)
    }

    private maximumValidY = () => {
        return this.cap(this.gridHeight - Math.ceil(this.levelOffset.y / this.gridSize), 0, this.map[0].length)
    }
}
