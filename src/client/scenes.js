import { Scene, Actor, SpriteSheet } from 'excalibur';
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
        const pl = new Actor({ x: 0, y: 0, width: 100, height: 100 });
        const spr = new SpriteSheet(resources.character1, 4, 6, 16, 16);
        pl.addDrawing('idle', spr.getAnimationBetween(engine, 0, 6, 125));
        pl.addDrawing('walk', spr.getAnimationBetween(engine, 6, 12, 125));
        pl.setDrawing('idle');
        this.add(pl);

        this.p1 = pl;
        return this.p1;
    }

    makeP2(engine) {
        const pl = new Actor({ x: 10, y: 0, width: 100, height: 100 });
        const spr = new SpriteSheet(resources.character2, 4, 6, 20, 16);
        pl.addDrawing('idle', spr.getAnimationBetween(engine, 0, 6, 125));
        pl.addDrawing('walk', spr.getAnimationBetween(engine, 6, 12, 125));
        pl.setDrawing('idle');
        this.add(pl);

        this.p2 = pl;
        return this.p2;
    }

    makeSpaceBg(spr, offset) {
        const bg = new Actor();
        bg.addDrawing(spr);
        bg.pos.setTo(offset, -50);
        this.add(bg);
        return bg;
    }
}