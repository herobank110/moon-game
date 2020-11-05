import { updateCommaList } from "typescript";
import { ex } from "./imports.js";
import { MainMenuScene } from "./scenes/mainMenu.js";

const game = new ex.Engine({
    antialiasing: false,
    backgroundColor: ex.Color.Azure
});

// Add scenes here.
game.addScene("mainMenu", new MainMenuScene(game));

// Start the actual game.
game.goToScene("mainMenu");
game.start();
