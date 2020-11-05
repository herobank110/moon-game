import { ex } from "./imports.js";

export const resources = {
    character1: new ex.Texture("../res/character_animations.png"),
    character2: new ex.Texture("../res/character2_animations.png")
}

export const loader = new ex.Loader();
for (const res in resources) {
    loader.addResource((resources as any)[res]);
}