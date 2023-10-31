import CanvasView from "@/app/play/canvas-view";

// @ts-ignore
import file from "@/public/assets/testlevel.txt";

// TODO: Create the render engine that takes in a game state and renders to the screen
    // TODO: Game state will consist of:
        // TODO: Where the cursor/ player is
        // TODO: What area of the map is currently visible
        // TODO: What area(s) of the map are "unlocked" (also a visibility thing)
        // TODO: What objects are _in_ the game
        // TODO: The player's inventory
        // TODO: The current level
        // TODO: Player attributes, if applicable (Health, etc.)

// TODO: Create a config that will be used to determine animation times (separate for movement and sprite animations)
    // TODO: Config should also contain key bindings; letters -> function calls on the interpreter
    // TODO: Should also contain sprite sheets? Assets may need to be separate
    // TODO: Should also contain sounds? Assets may need to be separate

// TODO: Flow will be:
    // TODO: Player initializes a game with:
        // TODO: Config (Optional -- A default will be provided for normal VIM config and other picked constraints)
        // TODO: Save State (Optional -- If none is loaded from local or from a file, the game will start from the beginning)
        // TODO: Assets (Optional -- If none are provided, the default assets will be provided)
    // TODO: Player presses a key or set of keys
    // TODO: That key or set of keys go into the command parser to identify if a command was entered
    // TODO: The command parser sends valid commands to the command interpreter
    // TODO: The command interpreter send updates to the state
    // TODO: The canvas updates with the new state


// TODO: Should provide an asset pack picker
    // TODO: Default asset packs could include:
        // TODO: Pure text on a black screen (like you're actually in VIM)
        // TODO: Basic sprite-based graphics

// TODO: Should provide a map builder dev tool
    // TODO: Can set width, height
    // TODO: Based on layer, can place background components, items, character starting position, etc.


export default async function Page() {
    // TODO: Assets should be loaded after the page is rendered and we show a loader
    // TODO: This way, the page load isn't impacted by the asset load
    return <CanvasView text={file}/>
}
