/* Level is a Runner that represents a level in-game.
 * The level is responsible for all coordination of objects within the level.
 * No LevelObject should exist outside of the Level.
 * */
class Level extends Runner implements Master {
    private objects : LevelObject[] = []
    private stage : Stage
    private player : Player

    constructor(master : Master) {
        super(master);
        this.addRunner(new Terrain(this, worldfile.levels[0]));
        this.stage = new Stage(worldfile.levels[0]);
        this.player = new Player(this.stage);
        this.addObject(this.player);
    }

    respond(controls : Controls) : void {
        this.player.respond(controls);
    }

    update() : void {
        this.drawables.position = new PIXI.Point(
            Math.min(200 - this.player.point.x,0),
            160 - this.player.point.y
            )
        this.player.update();
    }

    private addObject(obj : LevelObject) : void {
        this.objects.push(obj);
        this.drawables.addChild(obj.sprite);
    }

    private removeObject(obj : LevelObject) : void {
        const index = this.objects.indexOf(obj);
        if (index !== -1)
            this.objects.splice(index, 1);
        this.drawables.removeChild(obj.sprite);
    }

    /* Implements Master interface */
    addRunner(runner : Runner) : void {
        this.drawables.addChild(runner.drawables);
    }

    removeRunner(runner : Runner) : void {
        this.drawables.removeChild(runner.drawables);
    }
}

// An object that lives in a level must implement this interface
interface LevelObject {
    active : boolean
    sprite : PIXI.Sprite
    point : Point

    update() : void
}