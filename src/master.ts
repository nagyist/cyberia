class Master {
    private gamescreen: PIXI.Application;
    private runners: Runner[];

    constructor() {
        this.gamescreen = new PIXI.Application(400, 300, {
            "backgroundColor": 0x444444,
            "resolution": 1,
        });
        this.gamescreen.view.id = "gamecanvas";
        document.getElementById("holderdiv").appendChild(this.gamescreen.view);
        this.runners = [];

        this.addRunner(new Test());
    }

    update() {
        setTimeout(() => {this.update()}, 1000/60);
        this.runners.forEach((e) => {e.update();})
    }

    private addRunner(runner : Runner) {
        this.runners.push(runner);
        this.gamescreen.stage.addChild(runner.drawables);
    }

    private removeRunner(runner : Runner) {
        var index = this.runners.indexOf(runner);
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
}

class Test extends Runner {
    constructor() {
        super();
        const test_sprite = PIXI.Sprite.fromImage('images/test.gif');

        test_sprite.anchor.set(0.5);
        test_sprite.x = 200;
        test_sprite.y = 150;

        this.drawables.addChild(test_sprite);
    }
    update() { ; }
}

const master = new Master();
master.update();