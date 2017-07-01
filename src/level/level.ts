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
        var index = this.objects.indexOf(obj);
        if (index !== -1)
            this.objects.splice(index, 1);
        this.drawables.removeChild(obj.sprite);
    }
}

// An object that lives in a level
interface LevelObject {
    active : boolean
    sprite : PIXI.Sprite
    point : Point

    update() : void
}