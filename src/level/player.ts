class Player implements LevelObject {
    active = true
    point : Point
    public sprite : PIXI.Sprite
    private stage : Stage
    private physics : Physics

    constructor(stage : Stage) {
        this.sprite = PIXI.Sprite.fromImage('images/test.gif');

        this.sprite.anchor.set(0.5);
        this.sprite.x = 200;
        this.sprite.y = 0;

        this.point = new Point(200, 0);
        this.physics = new Physics(stage, 1, 7);
    }

    respond(controls : Controls) {
        if (controls.Left)
            this.physics.xvel = -2;
        else if (controls.Right)
            this.physics.xvel = 2;
        else
            this.physics.xvel = 0;
        
        if (controls.ButtonA && this.physics.ground) {
            this.physics.yvel = -7;
        }
    }

    update() {
        this.point = this.physics.step(this.point);
        const rnd = this.point.round();
        this.sprite.x = rnd.x;
        this.sprite.y = rnd.y;
    }
}