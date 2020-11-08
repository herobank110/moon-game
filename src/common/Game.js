import { GameEngine, DynamicObject, SimplePhysicsEngine, TwoVector, KeyboardControls, BaseTypes } from 'lance-gg';

// /////////////////////////////////////////////////////////
//
// GAME OBJECTS
//
// /////////////////////////////////////////////////////////

const WIDTH = 800;
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 50;
const HEIGHT = 600;
const FALL_SPEED = 1.5;
const JUMP_SPEED = 0.05;
const JUMP_TIME = 2;
const MOVE_SPEED = 1.6;
const MOVE_SPEED_IN_AIR = 0.02;
/** Movement tends to go right faster. Differ left speed to compensate. */
const MOVE_LEFT_SPEED_MULT = 2;

export class Player extends DynamicObject {
    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        this.inAir = 0;
        this.jumpTime = 0;
    }

    static get netScheme() {
        return Object.assign({
            inAir: { type: BaseTypes.TYPES.UINT8 },
            jumpTime: { type: BaseTypes.TYPES.UINT8 },
        }, super.netScheme)
    }

    syncTo(other) {
        super.syncTo(other);
        this.inAir = other.inAir;
        this.jumpTime = other.jumpTime;
    }
}

// /////////////////////////////////////////////////////////
//
// GAME ENGINE
//
// /////////////////////////////////////////////////////////
export default class Game extends GameEngine {

    constructor(options) {
        super(options);
        this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this });

        // common code
        this.on('postStep', this.gameLogic.bind(this));

        // server-only code
        this.on('server__init', this.serverSideInit.bind(this));
        this.on('server__playerJoined', this.serverSidePlayerJoined.bind(this));
        this.on('server__playerDisconnected', this.serverSidePlayerDisconnected.bind(this));

        // client-only code
        this.on('client__rendererReady', this.clientSideInit.bind(this));
        this.on('client__draw', this.clientSideDraw.bind(this));
    }

    registerClasses(serializer) {
        serializer.registerClass(Player);
    }

    gameLogic() {
        const players = this.world.queryObjects({ instanceType: Player });

        players.forEach((player) => {
            if (player.jumpTime > 0) {
                player.velocity.y += JUMP_SPEED;
                player.jumpTime--;
            } else if (player.position.y > 0) {
                player.velocity.y = -FALL_SPEED;
            } else {
                player.velocity.y = 0;
                player.position.y = 0;
                player.inAir = 0;
            }

            // Don't limit play area.
            // if (player.position.x <= 0) {
            //     player.velocity.x = 0;
            //     player.position.x = 1;
            // } else if (player.position.x + PLAYER_WIDTH >= WIDTH) {
            //     player.velocity.x = 0;
            //     player.position.x = WIDTH - PLAYER_WIDTH - 1;
            // }
        });
    }

    processInput(inputData, playerId) {
        super.processInput(inputData, playerId);

        let player = this.world.queryObject({ playerId: playerId });
        if (player) {
            if (inputData.input === "up") {
                if (!player.inAir) {
                    player.jumpTime = JUMP_TIME;
                    player.position.y += 0.2;
                    player.inAir = 1;
                }
            } else if (inputData.input === "left") {
                player.position.x -= MOVE_LEFT_SPEED_MULT * (player.inAir ? MOVE_SPEED_IN_AIR : MOVE_SPEED);
            } else if (inputData.input === "right") {
                player.position.x += player.inAir ? MOVE_SPEED_IN_AIR : MOVE_SPEED;;
            }
        }
    }


    // /////////////////////////////////////////////////////////
    //
    // SERVER ONLY CODE
    //
    // /////////////////////////////////////////////////////////
    serverSideInit() {
        this.addObjectToWorld(new Player(this, null, {
            position: new TwoVector(10, 0),
        }));
        this.addObjectToWorld(new Player(this, null, {
            position: new TwoVector(10, 0),
        }));
    }

    serverSidePlayerJoined(ev) {
        let players = this.world.queryObjects({ instanceType: Player });
        if (players[0].playerId === 0) {
            players[0].playerId = ev.playerId;
        } else if (players[1].playerId === 0) {
            players[1].playerId = ev.playerId;
        }
    }

    serverSidePlayerDisconnected(ev) {
        let players = this.world.queryObjects({ instanceType: Player });
        if (players[0].playerId === ev.playerId) {
            players[0].playerId = 0;
        } else if (players[1].playerId === ev.playerId) {
            players[1].playerId = 0;
        }
    }


    // /////////////////////////////////////////////////////////
    //
    // CLIENT ONLY CODE
    //
    // /////////////////////////////////////////////////////////
    clientSideInit() {
        this.controls = new KeyboardControls(this.renderer.clientEngine);
        this.controls.bindKey("up", "up", { repeat: true });
        this.controls.bindKey("left", "left", { repeat: true });
        this.controls.bindKey("right", "right", { repeat: true });
    }

    clientSideDraw() {
        // Sync to the network replicated game engine.
        this.renderer.syncToLance(this);
    }
}
