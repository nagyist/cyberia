interface Stage {
    constructor()
    isSolid(pt : Point)
}

class Stage {
    constructor() {

    }

    isSolid(pt : Point) {
        return pt.y > 150;
    }
}