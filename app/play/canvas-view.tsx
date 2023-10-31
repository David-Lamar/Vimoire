"use client"

import {useEffect, useRef, useState} from "react";
import {CommandParserImpl} from "@/app/engine/command/parser/CommandParserImpl";
import {CanvasController} from "@/app/engine/render/CanvasController";
import {Level} from "@/app/engine/state/Level";
import {DefaultConfig} from "@/app/engine/config/Config";
import {CommandParser} from "@/app/engine/command/parser/CommandParser";
import {Commands} from "@/app/engine/command/Command";

export default function CanvasView(props: {
    text: string,
}) {
    const canvas = useRef<HTMLCanvasElement>(null)
    const virtualCanvas = useRef<HTMLCanvasElement>(null)

    const [commandParser, setCommandParser] = useState<CommandParser>()
    const [canvasController, setCanvasController] = useState<CanvasController>()

    useEffect(() => {
        if (commandParser != null) {
            window.addEventListener("keypress", commandParser.onKeyPress)

            return () => {
                window.removeEventListener("keypress", commandParser.onKeyPress)
            }
        }
    }, [commandParser])

    useEffect(() => {

        if (canvas.current != null) {
            const config = DefaultConfig

            const controller = new CanvasController(canvas.current)
            setCanvasController(controller)

            const levelTest = new Level(0, props.text, controller, config)

            setCommandParser(new CommandParserImpl(Commands(config), levelTest))

            controller.start()

            return () => {
                controller.stop()
            }
        }
    }, [canvas, props.text]);

    return <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", background: "#000"}}>
        <canvas ref={canvas} style={{width: "1440px", height: "1080px", background: "#000", border: "1px solid white"}}/>
        <canvas hidden ref={virtualCanvas} width={3200} height={3200}/>
    </div>
}
