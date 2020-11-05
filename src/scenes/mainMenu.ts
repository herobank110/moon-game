import { ex } from "../imports.js";

export class MainMenuScene extends ex.Scene {
    public onInitialize(engine: ex.Engine) {
        console.log("started main menu");
        // todo add a start button or something
        engine.goToScene("overground1");
    }
}