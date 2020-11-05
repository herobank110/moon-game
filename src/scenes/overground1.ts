import { ex } from "../imports.js";
import { Player1Pawn, Player2Pawn } from "../core/pawns.js";

export class Overground1Scene extends ex.Scene {
    p1: Player1Pawn = new Player1Pawn();
    p2: Player2Pawn = new Player2Pawn();

    public onInitialize(engine: ex.Engine) {
        console.log("entered overground1");
        this.add(this.p1);
        this.add(this.p2);
        this.p1.pos.setTo(300, 20);
        this.p2.pos.setTo(300, 120);
    }
}