/* Level is a Runner that represents a level in-game.
 * The level is responsible for all coordination of objects within the level.
 * No LevelObject should exist outside of the Level.
 * */
class Level extends Runner implements Master {
    private objects : LevelObject[] = []
    private stage : Stage
    private player : Player
    private camera : Point
    //private delta : Point = new Point(0,0);

    constructor(master : Master) {
        super(master);
        this.addRunner(new Terrain(this, worldfile.levels[0]));
        this.stage = new Stage(worldfile.levels[0]);
        this.player = new Player(this.stage);
        this.addObject(this.player);
        this.camera = this.player.point;
    }

    respond(controls : Controls) : void {
        this.player.respond(controls);
    }

    update() : void {
        const delta = this.camera.subtract(this.player.point);
        /*if (delta.x !== 0) {
            const minx = 3;
            if (Math.abs(delta.x) < minx)
                this.camera = new Point(this.player.point.x, this.camera.y);
            this.camera = this.camera.subtract(new Point(Math.sign(delta.x)*minx, 0))
        }*/
        console.log(this.camera);
        this.camera = new Point(this.player.point.x, this.camera.y);
        if (delta.y !== 0) {
            const miny = 0.5;
            if (Math.abs(delta.y) < miny)
                this.camera = new Point(this.camera.x, this.player.point.y);
            this.camera = this.camera.subtract(new Point(0, Math.sign(delta.y)*miny))
        }
        const truecamera = this.camera.round();
        this.drawables.position = new PIXI.Point(
            Math.min(200 - truecamera.x,0),
            160 - truecamera.y
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