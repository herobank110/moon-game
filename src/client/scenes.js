import { Scene, Actor } from 'excalibur';
import { LaserBeams } from './laserBeam';
import { Player1, Player2 } from './localPlayer';
import { resources } from './resources';

class MySceneBase extends Scene {
    onInitialize(engine) {
        super.onInitialize(engine);

        this.players = [];
        this.laserBeams = this.spawn(LaserBeams);
        this.camera.zoom(5);
    }

    makeP1() {
        const pl = this.spawn(Player1, { x: 0, y: 0, width: 100, height: 100 });
        this.players.push(pl);
        this.p1 = pl;
        return this.p1;
    }

    makeP2() {
        const pl = this.spawn(Player2, { x: 10, y: 0, width: 100, height: 100 });
        this.players.push(pl);
        this.p2 = pl;
        return this.p2;
    }

    /** Utility to spawn an actor and add to the scene. */
    spawn(actorClass, ...args) {
        const obj = new actorClass(...args);
        this.add(obj);
        return obj;
    }
}

export class MenuScene extends Scene {
    // TODO
}

export class OvergroundScene extends MySceneBase {
    onInitialize(engine) {
        super.onInitialize(engine);

        const spr = resources.spaceBg.asSprite();
        spr.scale.setTo(0.1, 0.1);
        this.makeSpaceBg(spr, -100);
        this.makeSpaceBg(spr, 134);
        this.makeSpaceBg(spr, 368);

        this.makeP1();
        this.makeP2();

        this.camera.pos.setTo(0, -20);
    }

    makeSpaceBg(spr, offset, height) {
        const bg = new Actor();
        bg.addDrawing(spr);
        bg.pos.setTo(offset, (height === undefined ? -50 : height));
        this.add(bg);
        return bg;
    }
}