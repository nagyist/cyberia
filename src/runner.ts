abstract class Runner {
    public drawables: PIXI.Container;

    constructor() {
        this.drawables = new PIXI.Container();
    }
    
    respond(controls : Controls) {;}
    abstract update(): void;
}