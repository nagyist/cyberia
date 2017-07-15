/* Stage represents the level, but solely as far as game logic is concerned;
 * actually drawing the level is the responsibility of the Terrain object.
 * */
class Stage {
    private level : number[];
    private bigtiles : number[][];
    private width : number;
    private key : SolidityType[]

    constructor(level : any) {
        this.level = level.grid;
        this.bigtiles = worldfile.bigtiles[0].bigtiles;
        this.key = worldfile.bigtiles[0].key;
        this.width = level.width;
    }

    public isSolid(pt : Point) : boolean {
        const bigtilept = pt.floor(64);
        const bigtile = this.level[bigtilept.x+this.width*bigtilept.y];
        if (bigtile == 0)
            return false;
        const offsetpt = pt.modulo(64).floor(16);
        const localtile = this.key[this.bigtiles[bigtile][offsetpt.x + 4*offsetpt.y]];
        return Solidity.isSolid(localtile, pt.modulo(16));
    }

    public getSlope(pt: Point) : number {
        for (var i = 4; i >= -4; i--) {
            let test = this.getPointSlope(new Point(pt.x, pt.y + i));
            if (test !== 0)
                return test;
        }
        return 0;
    }

    private getPointSlope(pt: Point) : number {
        const bigtilept = pt.floor(64);
        const bigtile = this.level[bigtilept.x+this.width*bigtilept.y];
        if (bigtile == 0)
            return 0;
        const offsetpt = pt.modulo(64).floor(16);
        const localtile = this.key[this.bigtiles[bigtile][offsetpt.x + 4*offsetpt.y]];
        return Solidity.getSlope(localtile);
    }
}