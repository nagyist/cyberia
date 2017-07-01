class Player implements LevelObject {
    active = true
    public sprite : PIXI.Sprite
    private stage : Stage
    point : Point

    constructor(stage : Stage) {
        this.stage = stage;
        this.sprite = PIXI.Sprite.fromImage('images/test.gif');

        this.sprite.anchor.set(0.5);
        this.sprite.x = 200;
        this.sprite.y = 0;

        this.point = new Point(200, 0);
    }

    respond(controls : Controls) {
        if (controls.Left)
            this.point.x -= 2;
        if (controls.Right)
            this.point.x += 2;
    }

    update() {
        const rnd = this.point.round();
        this.sprite.x = rnd.x;
        this.sprite.y = rnd.y;
    }
}