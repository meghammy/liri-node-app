//Requesting NPM Package

var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

//file system
var fs = require('fs');
//Referencing keys from our files
var keys = require('./keys.js');

//arguments
//first function being called
var action = process.argv[2];
// what you want the function to process (song, movie, etc)
var value = process.argv[3];

//Directs which function is being called
switch (action) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doWhat();
        break;
}
//Twitter function
function tweets() {
    //do I have to put this in twice?. calling the keys object
    var keys = require('./keys.js');

    //don't know why this works.... but the one below doesn't???
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    //var client = new Twitter(exports.twitterKeys); 
    // when I run the one above it gives me an error 89, expired token :(

    //Want my twitter handle and only last 20 tweets
    var params = {
        screen_name: 'meghammy_',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(error);
        } else {
            console.log(tweets);
        }
        //for loop for tweets to be generated
        for (var i = 0; i < tweets.length; i++) {
            //what does the tweet say
            console.log(tweets[i].text);
            //when did I send these tweets
            console.log(tweets[i].created_at);
        }
    });
}
//Spotify function
function spotifySong() {
    //if no song is provided then your program will default to
    //"The Sign" ... it's bringing up the wrong artist for the default song
    query = "The sign";

    if (value != undefined || null) {
        query = value;
    }
    //Search spoitfy for queried value
    spotify.search({
        type: 'track',
        query: query,
    }, function(err, data) {
        if (err) {
            //Are there errors
            console.log('Error occurred: ' + err);
            return;
        } else {
            //less typing below
            var songInfo = data.tracks.items[0];

            // Show information about selected song
            console.log("Artist(s): " + songInfo.artists[0].name);
            console.log("Song name: " + songInfo.name);
            console.log("Preview link: " + songInfo.preview_url);
            console.log("Album: " + songInfo.album.name)
        };
    });
}
//Movie function
function movie() {
    //if no movie entered, "Mr. Nobody" will apear
    query = "Mr. Nobody";

    if (value !== undefined || null) {
        query = value;
    }
    //Get movie information
    request('http://www.omdbapi.com/?t=' + query + "&tomatoes=true", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieData = JSON.parse(body);
            //Supply movie information: title, year, IMDB rating, country, language, plot, actors, RT ratings, and RT URL
            console.log("Title: " + movieData.Title);
            console.log("Year: " + movieData.Year);
            console.log("IMDB Rating: " + movieData.imdbRating);
            console.log("Country: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
            console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
            console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);

        };

    });
}

//Do what it says function
function doWhat() {
    //read random.txt file
    fs.readFile('random.txt', 'utf8', function(error, data) {
                if (error) {
                    console.log(error);
                }
            });
        }
       
//The end!
