class Physics {
    private static g : number = 0.5

    public xvel : number = 0
    public yvel : number = 0
    public ground : boolean = false

    constructor(public stage : Stage,
                private weight: number,
                private maxyvel : number) {;}

    public step(point : Point) : Point {
        let newx = point.x + this.xvel;
        if (this.xvel !== 0) {
            if (this.stage.isSolid(new Point(newx, point.y))) {
                let newxvel = this.xvel;
                do {
                    if (Math.abs(newxvel) > 0.1) {
                        newxvel -= 0.1;
                        newx = point.x + newxvel;
                    } else {
                        newx = point.x;
                    }
                } while (this.stage.isSolid(new Point(newx, point.y)))
                this.xvel = 0;
            }
        }

        this.yvel = this.yvel + this.weight * Physics.g;
        if (this.yvel > this.maxyvel)
            this.yvel = this.maxyvel;
        let newy = point.y + this.yvel;
        this.ground = false;
        if (this.yvel !== 0) {
            if (this.stage.isSolid(new Point(point.x, newy))) {
                let newyvel = this.yvel;
                do {
                    if (Math.abs(newyvel) > 0.1) {
                        newyvel -= 0.1;
                        newy = point.y + this.yvel;
                    } else {
                        newy = point.y;
                    }
                } while (this.stage.isSolid(new Point(point.x, newy)))
                this.yvel = 0;
                this.ground = true;
            }
        }

        return new Point(newx, newy);
    }
}