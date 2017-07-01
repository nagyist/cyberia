interface Stage {
    constructor()
    isSolid(pt : Point) : boolean
}

class Stage {
    constructor() {

    }

    isSolid(pt : Point) {
        return pt.x < 100 ? pt.y > 132 : pt.y > 100;
    }
}