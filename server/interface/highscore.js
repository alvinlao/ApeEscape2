var colors = require("colors");
var Score = require("../models/Score");
var apeDB = require("../apeDB");

/*
 * addHighscore
 * Add a highscore to the table.
 * @param score         The highscore to add (Score object)
 */
var addHighscore = function(score){
    apeDB.getConnection(function(err,connection){
        var highscoreData = [
            score.user,
            score.score,
            score.time
        ];

        var addHighScoreQuery = "INSERT INTO highscores (name,score,time) VALUES (?,?,?)";

        connection.execute(addHighScoreQuery,highscoreData,function(err,rows){
            if(err){
                console.log("Failed to post highscore.".red);
            } else {
                console.log(score.user + " just scored " + score.score + " points, with a time of " + score.time);
            }
        });
    });
};

/*
 * getHighscores
 * Returns the top ___ highscores.
 * @return          Error (null if no error)
 * @return          An array of Score objects (sorted)
 */
var getHighscores = function(callback) {
    apeDB.getConnection(function(err,connection){
        var getHighscoresQuery = "SELECT user,score,time FROM highscores LIMIT " + config.HIGHSCORE_SIZE;
        connection.query(getHighscoresQuery,function(err,rows){
            if(err){
                callback(err,null);
            } else {
                //Array of Score objects
                var highscores = [];

                for(var i=0;i<rows.length;i++){
                    var score = new Score();
                        score.user = rows[i].user;
                        score.score = rows[i].score;
                        score.time = rows[i].time;
                    highscores.push(score);
                }

                callback(null,highscores);
            }
        });
    })
}