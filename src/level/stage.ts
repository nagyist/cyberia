/* Stage represents the level, but solely as far as game logic is concerned;
 * actually drawing the level is the responsibility of the Terrain object.
 * */
class Stage {
    private level : number[];
    private bigtiles : number[][];
    private width : number;

    constructor(level : any) {
        this.level = level.grid;
        this.bigtiles = worldfile.bigtiles[0].bigtiles;
        this.width = level.width;
    }

    isSolid(pt : Point) : boolean {
        const bigtilept = pt.floor(64);
        const bigtile = this.level[bigtilept.x+this.width*bigtilept.y];
        if (bigtile == 0)
            return false;
        const offsetpt = pt.modulo(64).floor(16);
        // TODO: use a key or something
        const localtile = this.bigtiles[bigtile][offsetpt.x + 4*offsetpt.y] ? 1 : 0;
        return Solidity.isSolid(localtile, pt.modulo(16));
    }
}