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
 * */

enum Solidity {
    EMPTY = 0,
    SOLID,
    SLOPE_LEFT_LOW,
    SLOPE_LEFT_HIGH,
    SLOPE_RIGHT_LOW,
    SLOPE_RIGHT_HIGH,
}