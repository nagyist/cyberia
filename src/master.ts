interface Master {
    addRunner(runner : Runner) : void
    removeRunner(runner : Runner) : void
}

class Master {
    private gamescreen: PIXI.Application;
    private runners: Runner[];
    private controls: Controls;

    constructor() {
        this.gamescreen = new PIXI.Application(400, 300, {
            "backgroundColor": 0x444444,
            "resolution": 1,
        });
        this.gamescreen.view.id = "gamecanvas";
        document.getElementById("holderdiv").appendChild(this.gamescreen.view);
        this.runners = [];
        this.controls = new KeyboardControls();

        this.addRunner(new Level(this));
    }

    update() {
        setTimeout(() => {this.update()}, 1000/60);
        this.runners.forEach((e) => {
            e.respond(this.controls);
            e.update();
        })
        this.controls.release();
    }

    addRunner(runner : Runner) {
        this.runners.push(runner);
        this.gamescreen.stage.addChild(runner.drawables);
    }

    removeRunner(runner : Runner) {
        const index = this.runners.indexOf(runner);
        if (index !== -1)
            this.runners.splice(index, 1);
        this.gamescreen.stage.removeChild(runner.drawables);
    }
}

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

    release() {
        this.ButtonA = false;
        this.ButtonB = false;
        this.Start = false;
    }

    keyDown(event) {
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

    keyUp(event : KeyboardEvent) {
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

class Point {
    x : number = 0
    y : number = 0
    constructor(x? : number, y? : number) {
        if (x)
            this.x = x;
        if (y)
            this.y = y;
    }
    round() {
        return new Point(
            this.x >> 0,
            this.y >> 0
        )
    }
}

const master = new Master();
master.update();