/* Physics implements a platformer physics system. You provide the weight and
 * maximum y-velocity, along with a Stage object. Eventually it will require
 * the dimensions of the object as well; notice that Physics should not require
 * a reference to its "parent" object.
 * 
 * X-velocity (xvel) and Y-velocity (yvel) start at 0 and are expected to be
 * modified as needed. "ground" is not expected to be modified by an outside
 * observer; it tells whether the object is on the ground.
 * 
 * The only public function is "step", which takes a point, and then runs one
 * timestep (1/60 second) of physics on that point, returning it.
 * */

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
            /* This construct is a bit weird... essentially we're trying to
             * keep the scope of newxvel limited to the block, and we only
             * want to zero out the x-velocity if solidity is ever detected.
             * I would like to do this without repeating the loop condition,
             * though...
             * */
            if (this.stage.isSolid(new Point(newx, point.y))) {
                let newxvel = Math.abs(this.xvel);
                const signx = Math.sign(this.xvel);
                do {
                    if (newxvel > 0.1) {
                        newxvel -= 0.1;
                        newx = point.x + signx*newxvel;
                    } else {
                        newx = point.x;
                        break;
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
                let newyvel = Math.abs(this.yvel);
                const signy = Math.sign(this.yvel);
                do {
                    if (newyvel > 0.1) {
                        newyvel -= 0.1;
                        newy = point.y + signy*this.yvel;
                    } else {
                        newy = point.y;
                        break;
                    }
                } while (this.stage.isSolid(new Point(point.x, newy)))
                this.yvel = 0;
                this.ground = true;
            }
        }

        return new Point(newx, newy);
    }
}