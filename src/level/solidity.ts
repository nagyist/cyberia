/* Solidity types:
 * EMPTY:               SOLID:
 * OOOO                 XXXX
 * OOOO                 XXXX
 * OOOO                 XXXX
 * OOOO                 XXXX
 * 
 * SLOPE_LEFT_LOW:      SLOPE_RIGHT_LOW:
 * OOOO                 OOOO
 * OOOO                 OOOO
 * XXOO                 OOXX
 * XXXX                 XXXX
 * 
 * SLOPE_LEFT_HIGH:     SLOPE_RIGHT_HIGH:
 * XXOO                 OOXX
 * XXXX                 XXXX
 * XXXX                 XXXX
 * XXXX                 XXXX
 * 
 * OPEN_TOP: Solid but you can jump through it (because we need a directional dependence)
 * */

enum SolidityType {
    EMPTY,
    SOLID,
    SLOPE_LEFT_LOW,
    SLOPE_LEFT_HIGH,
    SLOPE_RIGHT_LOW,
    SLOPE_RIGHT_HIGH,
    OPEN_TOP
}

const Solidity = {
    isSolid(solid : SolidityType, pt : Point) : boolean {
        function slopeSolid(m : number, b : number, point: Point) : boolean {
            return point.y > (m * point.x + b)
        }
        switch (solid) {
            case SolidityType.EMPTY:
                return false;
            case SolidityType.SOLID:
                return true;
            case SolidityType.SLOPE_LEFT_LOW:
                return slopeSolid(0.5, 8, pt);
            case SolidityType.SLOPE_LEFT_HIGH:
                return slopeSolid(0.5, 0, pt);
            case SolidityType.SLOPE_RIGHT_LOW:
                return slopeSolid(-0.5, 16, pt);
            case SolidityType.SLOPE_RIGHT_HIGH:
                return slopeSolid(-0.5, 8, pt);
            case SolidityType.OPEN_TOP:
                return true;
            default:
                throw "Not implemented / Unknown type"
        }
    },

    getSlope(solid: SolidityType) : number {
        switch (solid) {
            case SolidityType.EMPTY:
            case SolidityType.SOLID:
            case SolidityType.OPEN_TOP:
                return 0;
            case SolidityType.SLOPE_LEFT_LOW:
            case SolidityType.SLOPE_LEFT_HIGH:
                return 0.5;
            case SolidityType.SLOPE_RIGHT_LOW:
            case SolidityType.SLOPE_RIGHT_HIGH:
                return -0.5;
        }
    }
}
