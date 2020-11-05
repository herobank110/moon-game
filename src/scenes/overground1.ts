import { ex } from "../imports.js";
import { Player1Pawn, Player2Pawn } from "../core/pawns.js";
import { resources } from "../resources.js";

export class Overground1Scene extends ex.Scene {
    p1 = new Player1Pawn();
    p2 = new Player2Pawn();

    public onInitialize(engine: ex.Engine) {
        const spr = resources.spaceBg.asSprite();
        spr.scale.setTo(0.1, 0.1);
        this.makeSpaceBg(spr, -100);
        this.makeSpaceBg(spr, 134);
        this.makeSpaceBg(spr, 368);

        this.add(this.p1);
        this.add(this.p2);
        this.p1.pos.setTo(0, 0);
        this.p2.pos.setTo(50, 0);
        this.camera.pos.setTo(0, -20);
        this.camera.zoom(5);
    }

    private makeSpaceBg(spr: ex.Sprite, offset: number) {
        const bg = new ex.Actor();
        bg.addDrawing(spr);
        bg.pos.setTo(offset, -50);
        this.add(bg);
    }
}