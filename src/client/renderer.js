import { Renderer } from 'lance-gg';
import { Color, Engine } from 'excalibur';
import { loader } from './resources';
import { MenuScene, OvergroundScene } from './scenes';
import { Player } from '../common/Game';

/**
 * Only exists on clients. Maps lance-gg world to excalibur for drawing.
 */
export class MoonRenderer extends Renderer {
    init() {
        // Create the excalibur engine.
        this.exEngine = new Engine({
            antialiasing: false,
            backgroundColor: Color.Azure
        });
        this.initScenes();
        this.exEngine.start(loader);

        // This does some magic and returns a promise.
        return super.init();
    }

    initScenes() {
        // Add more scenes below.
        this.exEngine.addScene('menu', new MenuScene(this.exEngine));
        this.exEngine.addScene('overground', new OvergroundScene(this.exEngine));

        // Set the starting scene.
        this.exEngine.goToScene('overground');
    }

    draw(t, dt) {
        // The entire world from lance-gg is probably not valid at this point.
        // See: Game#clientSideDraw()

        // This causes the gameEngine to emit client__draw events.
        return super.draw(t, dt);
    }

    syncToLance(lanceEngine) {
        const players = lanceEngine.world.queryObjects({ instanceType: Player });
        if (players.length == 0) {
            // Game not initialized yet (but draw is still called?!?!)
            return;
        }

        const p1 = players[0];
        const p2 = players[1];
        this.exEngine.currentScene.p1.pos.x = p1.position.x;
        this.exEngine.currentScene.p1.pos.y = p1.position.y;
        this.exEngine.currentScene.p2.pos.x = p2.position.x;
        this.exEngine.currentScene.p2.pos.y = p2.position.y;
    }
}