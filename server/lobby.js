var colors	= require("colors");
var User 	= require("./models/User");


//Array of User objects
var mainLobby = [];

/*
 * Upon connecting to the lobby, add the user
 * @param user		User object to add to the lobby
 */
var addUser = function(user){
	mainLobby.push(user);
	console.log(user.name + " has joined the lobby. [".magenta + mainLobby.length + "]".magenta);
}

/*
 * Upon dropping connection, remove a user from the lobby
 * @param user 		User object to remove from the lobby
 */
var removeUser = function(removeUser){
	for(var i=0;i<mainLobby.length;i++){
		if(mainLobby[i].name === removeUser.name){
			mainLobby.splice(i,1);
			break;
		}
	}
	console.log(removeUser.name + " has left the lobby. [".magenta + mainLobby.length + "]".magenta);
}

/*
 * Get a list of users currently in the lobby
 * @return lobby 	Array of User objects
 */
 var getLobby = function() {
 	return mainLobby;
 }

 exports.addUser = addUser;
 exports.removeUser = removeUser;
 exports.getLobby = getLobby;