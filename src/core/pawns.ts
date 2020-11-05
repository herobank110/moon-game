import {ex} from "../imports.js";
import { resources } from "../resources.js";

class Pawn extends ex.Actor {
    onInitialize(engine: ex.Engine) {
        this.width = 160;
        this.height = 160;
    }
}

export class Player1Pawn extends Pawn {
    onInitialize(engine: ex.Engine) {
        super.onInitialize(engine);
        const spriteSheet = new ex.SpriteSheet(resources.character1, 4, 6, 16, 16);
        const idleAnim = spriteSheet.getAnimationBetween(engine, 0, 6, 100);
        const walkAnim = spriteSheet.getAnimationBetween(engine, 6, 12, 100);
        this.addDrawing("idle", idleAnim);
        this.addDrawing("walk", walkAnim);

        // Start in idle animation.
        this.setDrawing("idle");
    }
}

export class Player2Pawn extends Pawn {
    onInitialize(engine: ex.Engine) {
        super.onInitialize(engine);
        const spriteSheet = new ex.SpriteSheet(resources.character2, 4, 6, 16, 16);
        const idleAnim = spriteSheet.getAnimationBetween(engine, 0, 6, 100);
        const walkAnim = spriteSheet.getAnimationBetween(engine, 6, 12, 100);
        this.addDrawing("idle", idleAnim);
        this.addDrawing("walk", walkAnim);

        // Start in idle animation.
        this.setDrawing("idle");
    }
}
