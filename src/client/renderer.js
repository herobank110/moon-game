import { Renderer } from 'lance-gg';
import { Color, Engine, Vector } from 'excalibur';
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
        // Bind local input, before confirming with lance.
        this.exEngine.input.pointers.primary.on('move', (event) => {
            const player = this.getExPlayer();
            if (player) {
                player.pointLaser(event.worldPos);
            }
        });

        this.exEngine.input.pointers.primary.on('down', (event) => {
            if (this.lanceEngine) {
                const player = this.getExPlayer();
                if (player) {
                    this.lanceEngine.controls.clientEngine.sendInput('attack', {
                        // It's easier to pass components than get confused
                        // between lance and excalibur vectors.
                        aimX: player.laserPointingTo.x,
                        aimY: player.laserPointingTo.y
                    });
                }
            }
        });

        // This does some magic and returns a promise.
        return super.init();
    }

    /** 
     * Get player ID from 1, or null if invalid.
     * 
     * Lance uses 0 to mean invalid playerId, but can
     * assign incrementing indexes each time a player leaves
     * and joins despite still having the same player count. */
    whoAmI() {
        if (this.lanceEngine !== undefined) {
            const players = getLancePlayers(this.lanceEngine);
            if (players) {
                for (let i = 0; i < players.length; i++) {
                    const player = players[i];
                    if (player.playerId == this.lanceEngine.playerId) {
                        // Use 1 based index for lance compatibility.
                        return player.id + 1;
                    }
                }
            }
        }
        return null;
    }

    getLancePlayer() {
        const playerId = this.whoAmI();
        if (playerId !== null) {
            if (this.lanceEngine && this.lanceEngine.world) {
                const players = this.lanceEngine.world.queryObjects({ instanceType: Player });
                if (players.length > playerId - 1) {
                    // One based index so id 1 is player 1, id 2 is player 2.
                    return players[playerId - 1];
                }
            }
        }
        return null;
    }

    getExPlayer() {
        const playerId = this.whoAmI();
        if (playerId !== null) {
            switch (playerId) {
                case 1: return this.exEngine.currentScene.p1;
                case 2: return this.exEngine.currentScene.p2;
            }
        }
        return null;
    }

    initScenes() {
        const addScene_ = (name, cls) => {
            const obj = new cls(this.exEngine);
            obj.renderer = this;
            this.exEngine.addScene(name, obj);
        }

        // Add more scenes below.
        addScene_('menu', MenuScene);
        addScene_('overground', OvergroundScene);

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
        // Save last used lance GameEngine.
        this.lanceEngine = lanceEngine;

        const players = lanceEngine.world.queryObjects({ instanceType: Player });
        if (players.length == 0) {
            // Game not initialized yet (but draw is still called?!?!)
            return;
        }

        const p1 = players[0];
        const p2 = players[1];
        lancePosToExcalibur(p1.position, this.exEngine.currentScene.p1.pos);
        lancePosToExcalibur(p2.position, this.exEngine.currentScene.p2.pos);
    }
}

export function lancePosToExcalibur(position, excaliburPos) {
    if (excaliburPos === undefined) {
        excaliburPos = new Vector(0, 0);
    }
    // inverted y axis.
    excaliburPos.setTo(position.x, -position.y);
    return excaliburPos;
}

export function excaliburPosToLance(pos, lancePosition) {
    if (lancePosition === undefined) {
        lancePosition = new Vector(0, 0);
    }
    // inverted y axis.
    lancePosition.setTo(pos.x, -pos.y);
    return lancePosition;
}

/** 
 * @param {GameEngine} lanceEngine lance GameEngine.
 * @returns player list, possibly empty, or null if invalid. */
export function getLancePlayers(lanceEngine) {
    const world = lanceEngine.world;
    if (world) {
        return world.queryObjects({ instanceType: Player });
    }
    return null;
}