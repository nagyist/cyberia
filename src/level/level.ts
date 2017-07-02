/* Level is a Runner that represents a level in-game.
 * The level is responsible for all coordination of objects within the level.
 * No LevelObject should exist outside of the Level.
 * */
class Level extends Runner {
    private objects : LevelObject[] = []
    private stage : Stage = new Stage()
    private player : Player

    constructor(master : Master) {
        super(master);
        this.player = new Player(this.stage);
        this.addObject(this.player);
    }

    respond(controls : Controls) {
        this.player.respond(controls);
    }

    update() {
        this.player.update();
    }

    private addObject(obj : LevelObject) {
        this.objects.push(obj);
        this.drawables.addChild(obj.sprite);
    }

    private removeObject(obj : LevelObject) {
        const index = this.objects.indexOf(obj);
        if (index !== -1)
            this.objects.splice(index, 1);
        this.drawables.removeChild(obj.sprite);
    }
}

// An object that lives in a level must implement this interface
interface LevelObject {
    active : boolean
    sprite : PIXI.Sprite
    point : Point

    update() : void
}