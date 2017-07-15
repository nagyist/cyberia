declare var worldfile : any; // The worldfile is handled separately, but we
                             // need to convince tsc it exists

/* Master interface
 * All classes that implement "Runner" must have a reference to a class that
 * implements "Master". This allows themselves to add or remove their own reference
 * from their parent as is necessary.
 * */

interface Master {
    addRunner(runner : Runner) : void
    removeRunner(runner : Runner) : void
}

/* LocalMaster is the parent of everything.
 * A single local master is created at the time the game loads,
 * which in turn sets the whole game in motion.
 * 
 * Any runner that holds LocalMaster as its parent is a runner that is
 * currently displayed on screen.
 * */
class LocalMaster implements Master {
    private gamescreen: PIXI.Application;
    private runners: Runner[];
    private controls: Controls;

    constructor() {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
        this.gamescreen = new PIXI.Application(400, 225, {
            "backgroundColor": 0x444444,
            "resolution": 2,
        });
        this.gamescreen.view.id = "gamecanvas";
        document.getElementById("holderdiv").appendChild(this.gamescreen.view);
        this.runners = [];
        this.controls = new KeyboardControls();
    }

    initialize() : void {
        // Everything that needs to go after resources have loaded
        this.addRunner(new Level(this));
        this.update();
    }

    update() : void {
        setTimeout(() => {this.update()}, 1000/60);
        this.runners.forEach((e) => {
            e.respond(this.controls);
            e.update();
        })
        this.controls.release();
    }

    addRunner(runner : Runner) : void {
        this.runners.push(runner);
        this.gamescreen.stage.addChild(runner.drawables);
    }

    removeRunner(runner : Runner) : void {
        const index = this.runners.indexOf(runner);
        if (index !== -1)
            this.runners.splice(index, 1);
        this.gamescreen.stage.removeChild(runner.drawables);
    }
}

/* A standardized control interface.
 *
 * The "release" function is called to make sure that certain buttons do not
 * remain constantly pressed, whether they do in "reality" or not.
 * */

interface Controls {
    Up: boolean,
    Down: boolean,
    Left: boolean,
    Right: boolean,
    ButtonA: boolean,
    ButtonB: boolean,
    Start: boolean

    release() : void
}

/* An implementation of the control interface.
 *
 * Derived from Space Ava (and thus Aspect Star W, eventually)
 * */

class KeyboardControls implements Controls {
    Up = false
    Down = false
    Left = false
    Right = false
    ButtonA = false
    ButtonB = false
    Start = false

    constructor() {
        window.addEventListener("keydown", (e) => this.keyDown(e), false);
        window.addEventListener("keyup", (e) => this.keyUp(e), false);
    }

    release() : void {
        this.ButtonA = false;
        this.ButtonB = false;
        this.Start = false;
    }

    keyDown(event) : void {
        if (event.keyCode == 32 || event.keyCode == 90) { // SPACE
            this.ButtonA = true;
        }
        if (event.keyCode == 38 || event.keyCode == 87) {
            this.Up = true;
        }
        if (event.keyCode == 40 || event.keyCode == 83) {
            this.Down = true;
        }
        if (event.keyCode == 37 || event.keyCode == 65) {
            this.Left = true;
        }
        if (event.keyCode == 39 || event.keyCode == 68) {
            this.Right = true;
        }
        if (event.keyCode == 8) {
            // TODO: Change this from backspace maybe
            this.ButtonB = true;
        }
        if (event.keyCode == 13) {
            this.Start = true;
        }
    }

    keyUp(event : KeyboardEvent) : void {
        if (event.keyCode == 32 || event.keyCode == 90) { // SPACE
            this.ButtonA = false;
        }
        if (event.keyCode == 38 || event.keyCode == 87) {
            this.Up = false;
        }
        if (event.keyCode == 40 || event.keyCode == 83) {
            this.Down = false;
        }
        if (event.keyCode == 37 || event.keyCode == 65) {
            this.Left = false;
        }
        if (event.keyCode == 39 || event.keyCode == 68) {
            this.Right = false;
        }
        if (event.keyCode == 13) {
            this.Start = false;
        }
        if (event.keyCode == 8) {
            this.ButtonB = false;
        }
    }
};

/* A Point is a standard 2d vector. The point should be immutable.
 * 
 * Method round() returns a new point whose children are integers. 
 * */

class Point {
    x : number = 0
    y : number = 0
    
    constructor(x : number, y : number) {
        if (x)
            this.x = x;
        if (y)
            this.y = y;
        Object.freeze(this);
    }

    equals(p : Point) : boolean {
        return (this.x == p.x) && (this.y == p.y)
    }

    round() : Point {
        return new Point(
            this.x >> 0,
            this.y >> 0
        )
    }

    multiply(j : number) : Point {
        return new Point(
            this.x * j,
            this.y * j
        )
    }

    modulo(j : number) : Point {
        return new Point(
            this.x % j,
            this.y % j
        )
    }

    floor(j : number) : Point {
        return new Point(
            (this.x / j) >> 0,
            (this.y / j) >> 0
        )
    }

    subtract(p : Point) : Point {
        return new Point(
            this.x - p.x,
            this.y - p.y
        )
    }
}

function loadResources() : void {
    PIXI.loader
        .add('player', 'images/player.gif')
        .add('level1', 'images/level1.gif')
        .load(function() {master.initialize()})
}

const master = new LocalMaster();
loadResources();