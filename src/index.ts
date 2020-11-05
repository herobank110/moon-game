import { ex } from "./imports.js";
import { loader } from "./resources.js";
import { MainMenuScene } from "./scenes/mainMenu.js";
import { Overground1Scene } from "./scenes/overground1.js";

const game = new ex.Engine({
    antialiasing: false,
    backgroundColor: ex.Color.Azure
});

// Add scenes here.
game.addScene("mainMenu", new MainMenuScene(game));
game.addScene("overground1", new Overground1Scene(game));

// Start the actual game.
game.goToScene("mainMenu");
game.start(loader);
