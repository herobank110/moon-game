import { updateCommaList } from "typescript";
import { ex } from "./imports.js";

const game = new ex.Engine({
    antialiasing: false,
    backgroundColor: ex.Color.Azure
});

game.start();
