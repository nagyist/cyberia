/* The terrain object is in charge of drawing the level. */

class Terrain extends Runner {
    constructor(master : Master, level : any) {
        super(master);
        const text = PIXI.loader.resources['level1'].texture.baseTexture;
        const drawables = this.drawables;

        function getTile(i : number) : PIXI.Texture {
            const rect = new PIXI.Rectangle(16*i, 0, 16, 16);
            return new PIXI.Texture(text, rect);
        }
        function renderSprite(i, x, y) : void {
            if (i == 0) return;
            const sprite = new PIXI.Sprite(getTile(i));
            sprite.x = x;
            sprite.y = y;
            drawables.addChild(sprite);
        }

        const bigtileset : any = worldfile.bigtiles[0];
        function drawBigtile(i, x, y) : void {
            const bigtile = bigtileset[i];
            if (bigtile == -1) {
                throw new Error("Can't load bigtile");
            }
            // Cartesian coordinates
            const cartx = x * 64;
            const carty = y * 64;
            for (let i = 0; i < bigtile.length; i++) {
                const localx = i % 4;
                const localy = (i / 4) >> 0;
                renderSprite(bigtile[i], cartx + localx*16, carty + localy*16)
            }
        }

        for (let i = 0; i < level.grid.length; i++) {
            const x = i % level.width;
            const y = (i / level.width) >> 0;
            if (level.grid[i] === 0)
                continue
            drawBigtile(level.grid[i], x, y);
        }
    }
    update() : void {;}
}

