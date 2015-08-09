// State
var STATE_LOBBY = 0;
var STATE_GAME = 1;
var STATE_GAME_OVER =2;

// Player states
var PLAYER_STATE_UNNAMED = 0;
var PLAYER_STATE_WAITING = 1;
var PLAYER_STATE_READY = 2;
var PLAYER_STATE_ALIVE = 3;
var PLAYER_STATE_DEAD = 4;

var state = STATE_LOBBY;

var playerState = PLAYER_STATE_UNNAMED;

// Identity
var myID;
