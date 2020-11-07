import { Renderer } from 'lance-gg';
import { loader } from './resources';
import { Color, Engine } from 'excalibur';
import { MenuScene, OvergroundScene } from './scenes';

/**
 * Only exists on clients. Maps lance-gg world to excalibur for drawing.
 */
export class MoonRenderer extends Renderer {
    init() {
        // Create the excalibur engine.
        this.game = new Engine({
            antialiasing: false,
            backgroundColor: Color.Azure
        });
        this.initScenes();
        this.game.start(loader);

        // This does some magic and returns a promise.
        return super.init();
    }

    initScenes() {
        // Add more scenes below.
        this.game.addScene('menu', new MenuScene(this.game));
        this.game.addScene('overground', new OvergroundScene(this.game));

        // Set the starting scene.
        this.game.goToScene('overground');
    }

    draw(t, dt) {
        // TODO
    }
}