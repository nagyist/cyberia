abstract class Runner {
    public drawables : PIXI.Container;
    private master : Master;

    constructor(master : Master) {
        this.drawables = new PIXI.Container();
        this.master = master;
    }
    
    respond(controls : Controls) {;}
    abstract update(): void;
}