class Physics {
    private static g : number = 0.5

    constructor(public stage : Stage,
                public xvel : number, 
                public yvel : number,
                public weight: number) {;}

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
        let newy = point.y + this.yvel;
        if (this.yvel !== 0) {
            if (this.stage.isSolid(new Point(newx, newy))) {
                let newyvel = this.yvel;
                do {
                    if (Math.abs(newyvel) > 0.1) {
                        newyvel -= 0.1;
                        newy = point.y + this.yvel;
                    } else {
                        newy = point.y;
                    }
                } while (this.stage.isSolid(new Point(newx, newy)))
                this.yvel = 0;
            }
        }

        return new Point(newx, newy);
    }
}