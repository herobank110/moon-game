import { Actor } from 'excalibur';

// interface LaserLine {
    // start: Vector;
    // end: Vector;
    // duration: number;
    // color: Color;
// }

export class LaserBeams extends Actor {
    onInitialize(engine) {
        super.onInitialize(engine);
        /** @see LaserLine */
        this.lines = [];

        this.z = 1000;
    }

    draw(ctx, delta) {
        super.draw(ctx, delta);
        delta *= 0.001;  // milliseconds to seconds

        const dead = [];
        let i = 0;
        for (const line of this.lines) {
            // Draw aiming laser beam.
            ctx.strokeStyle = line.color.toHex();
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.stroke();

            line.duration -= delta;
            if (line.duration <= 0) {
                dead.push(i);
            }
            i++;
        }

        for (const i of dead) {
            this.lines.splice(i, 1);
        }
    }

}