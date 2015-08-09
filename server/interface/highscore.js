var colors = require("colors");
var Score = require("../models/Score");
var apeDB = require("../apeDB");

/*
 * addHighscore
 * Add a highscore to the table.
 * @param score         The highscore to add (Score object)
 */
var addHighscore = function(req, res){
    var score = req.body.score;
    apeDB.getConnection(function(err,connection){
        var highscoreData = [
            score.player,
            score.score,
            score.time
        ];

        var addHighScoreQuery = "INSERT INTO highscores (name,score,time) VALUES (?,?,?)";

        connection.execute(addHighScoreQuery,highscoreData,function(err,rows){
            if(err){
                console.log("Failed to post highscore.".red);
            } else {
                console.log(score.player + " just scored " + score.score + " points, with a time of " + score.time);
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
var getHighscores = function(req, res) {
    apeDB.getConnection(function(err,connection){
        var getHighscoresQuery = "SELECT player,score,time FROM highscores LIMIT " + config.HIGHSCORE_SIZE;
        connection.query(getHighscoresQuery,function(err,rows){
            if(err){
                res.send();
            } else {
                //Array of Score objects
                var highscores = [];

                for(var i=0;i<rows.length;i++){
                    var score = new Score();
                        score.player = rows[i].player;
                        score.score = rows[i].score;
                        score.time = rows[i].time;
                    highscores.push(score);
                }

                res.send(highscores);
            }
        });
    })
}

exports.getHighscores = getHighscores;
exports.addHighscore = addHighscore;