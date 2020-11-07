import { Texture, Loader } from 'excalibur';

export const resources = {
    character1: new Texture('./character_animations.png'),
    character2: new Texture('./character2_animations.png'),
    spaceBg: new Texture('./SpaceBackground2.png')
}

export const loader = new Loader();
for (const res in resources) {
    loader.addResource(resources[res]);
}