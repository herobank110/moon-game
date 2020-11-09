import { Scene, Actor } from 'excalibur';
import { Player1, Player2 } from './localPlayer';
import { resources } from './resources';

export class MenuScene extends Scene {
    // TODO
}

export class OvergroundScene extends Scene {
    onInitialize(engine) {
        const spr = resources.spaceBg.asSprite();
        spr.scale.setTo(0.1, 0.1);
        this.makeSpaceBg(spr, -100);
        this.makeSpaceBg(spr, 134);
        this.makeSpaceBg(spr, 368);

        this.makeP1(engine);
        this.makeP2(engine);

        this.camera.pos.setTo(0, -20);
        this.camera.zoom(5);
    }

    makeP1(engine) {
        const pl = new Player1({ x: 0, y: 0, width: 100, height: 100 });
        this.add(pl);
        this.p1 = pl;
        return this.p1;
    }

    makeP2(engine) {
        const pl = new Player2({ x: 10, y: 0, width: 100, height: 100 });
        this.add(pl);
        this.p2 = pl;
        return this.p2;
    }

    makeSpaceBg(spr, offset, height) {
        const bg = new Actor();
        bg.addDrawing(spr);
        bg.pos.setTo(offset, (height === undefined ? -50 : height));
        this.add(bg);
        return bg;
    }
}