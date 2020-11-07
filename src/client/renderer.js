import { Renderer } from 'lance-gg';
import { resources, loader } from './resources';
import { Color, Engine, Scene } from 'excalibur';

/**
 * Only exists on clients. Maps lance-gg world to excalibur for drawing.
 */
export class MoonRenderer extends Renderer {
    init() {
        super.init();
        // Create the excalibur engine.
        this.game = new Engine({
            antialiasing: false,
            backgroundColor: Color.Azure
        });
        this.initScenes();
        this.game.start(loader);
    }


    initScenes() {
        // Add more scenes below.
        this.game.addScene('menu', new Scene());

        // Set the starting scene.
        this.game.goToScene('menu');
    }

    draw(t, dt) {
        // TODO
    }
}