/* Class Player is a LevelObject that additionally implements the method 
 * respond() in order to respond to player input. 
 * 
 * Eventually some of this will need to be separated out into a "standard
 * LevelObject"
 * */
class Player implements LevelObject {
    active = true
    point : Point = new Point(200, 0);
    public sprite : PIXI.Sprite
    private stage : Stage
    private physics : Physics
    private facingLeft : boolean = false;
    private frame : number = 0
    private timer : number = 0
    private speedTimer : number = 0

    constructor(stage : Stage) {
        const text = PIXI.loader.resources['player'].texture;
        let rect = new PIXI.Rectangle(0, 0, 16, 32);
        text.frame = rect;
        this.sprite = new PIXI.Sprite(text);

        this.sprite.anchor.set(0.5, 1);
        this.sprite.x = 200;
        this.sprite.y = 0;

        this.physics = new Physics(stage, 1, 7);
    }

    respond(controls : Controls) {
        const speedBoost = this.speedTimer < 100 ? 2 :
                           this.speedTimer < 300 ? 3 : 4;
        if (controls.Left)
            this.physics.xvel = -speedBoost;
        else if (controls.Right)
            this.physics.xvel = speedBoost;
        else
            this.physics.xvel = 0;
        
        if (controls.Left && !this.facingLeft) {
            this.speedTimer = 0;
            this.facingLeft = true;
        }
        if (controls.Right && this.facingLeft) {
            this.speedTimer = 0;
            this.facingLeft = false;
        }
        
        if (controls.ButtonA && this.physics.ground) {
            this.physics.yvel = -7;
        }
    }

    update() {
        this.timer++;
        if (this.timer > 40)
            this.timer = 0;
        this.point = this.physics.step(this.point);
        if (this.physics.xvel !== 0)
            this.speedTimer++
        else
            this.speedTimer = 0;
        const rnd = this.point.round();
        this.sprite.x = rnd.x;
        this.sprite.y = rnd.y+1;
        this.determineFrame();
    }

    private determineFrame() {
        //TODO: Do animations better than this
        const text = PIXI.loader.resources['player'].texture;
        let rect;
        if (!this.physics.ground) {
            rect = new PIXI.Rectangle(16*7, 0, 16, 32);
        } else if (this.speedTimer > 100) {
            const boost = this.speedTimer < 300 ? 0 : 1;
            rect = new PIXI.Rectangle(16*5 + boost, 0, 16, 32);
        } else if (this.physics.xvel !== 0) {
            const frame = (this.timer < 10) ? 1 :
                          (this.timer < 20) ? 2 :
                          (this.timer < 30) ? 3 : 4;
            rect = new PIXI.Rectangle(16*frame, 0, 16, 32);
        } else {
            rect = new PIXI.Rectangle(16*0, 0, 16, 32);
        }
        text.frame = rect;
        if (this.facingLeft)
            this.sprite.scale.x = -1;
        else
            this.sprite.scale.x = 1;
        this.sprite.texture = text;
    }
}