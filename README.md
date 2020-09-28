# tile-game

Tile game that procedurally generates maps where there is a guaranteed random route from the player start location (currently top left) to the exit point (currently marked as x).

First steps:
-Refine/test algorithm for finding route (when backtracking store potential moves as part of the xybeen object for the location so they do not need to be worked out again. Use logic to jump back to last point where xybeen[position].validMoves > 1).
-After generating route, go through map and add in random tiles with percentage chances of occurance. Do not overwrite any tiles that are required as part of the "steps" array that stores the route to x.
-Use html/css to display the map on screen
-Make it so that the route is displayed on the map.
