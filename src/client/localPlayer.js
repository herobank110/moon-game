import { Actor, Color, SpriteSheet, Vector } from 'excalibur';
import { resources } from './resources';


class LocalPlayer extends Actor {
    onInitialize(engine) {
        this.laserPointingTo = null;
    }

    pointLaser(pointTo) {
        // TODO: Check if the laser gun is equipped.
        // if (!this.isLaserEquipped()) {
        //     this.laserPointingTo = null;
        //     return;
        // }
        this.laserPointingTo = pointTo;
    }

    draw(ctx, delta) {
        super.draw(ctx, delta);

        if (this.laserPointingTo) {
            // Draw aiming laser beam.
            ctx.setLineDash([5, 15]);
            ctx.strokeStyle = Color.Yellow.toHex();
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.laserPointingTo.x, this.laserPointingTo.y);
            ctx.stroke();
        }
    }
}

export class Player1 extends LocalPlayer {
    onInitialize(engine) {
        super.onInitialize(engine);
        const spr = new SpriteSheet(resources.character1, 4, 6, 16, 16);
        this.addDrawing('idle', spr.getAnimationBetween(engine, 0, 6, 125));
        this.addDrawing('walk', spr.getAnimationBetween(engine, 6, 12, 125));
        this.setDrawing('idle');
    }
}

export class Player2 extends LocalPlayer {
    onInitialize(engine) {
        super.onInitialize(engine);
        const spr = new SpriteSheet(resources.character2, 4, 6, 20, 16);
        this.addDrawing('idle', spr.getAnimationBetween(engine, 0, 6, 125));
        this.addDrawing('walk', spr.getAnimationBetween(engine, 6, 12, 125));
        this.setDrawing('idle');
    }
}