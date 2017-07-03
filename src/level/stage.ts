/* Stage represents the level, but solely as far as game logic is concerned;
 * actually drawing the level is the responsibility of the Terrain object.
 * */
class Stage {
    private level : number[];
    private bigtiles : number[][];
    private width : number;

    constructor(level : any) {
        this.level = level.grid;
        this.bigtiles = worldfile.bigtiles[0];
        this.width = level.width;
    }

    isSolid(pt : Point) {
        const bigtilept = pt.floor(64);
        const bigtile = this.level[bigtilept.x+this.width*bigtilept.y];
        if (bigtile == 0)
            return false;
        const offsetpt = pt.modulo(64).floor(16);
        return this.bigtiles[bigtile][offsetpt.x + 4*offsetpt.y] !== 0;
    }
}