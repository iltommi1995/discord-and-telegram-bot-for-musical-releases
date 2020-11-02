// The datasets are imported

var jsonAmerican = require('../../storage/americanReleases.json');
var jsonItalian = require('../../storage/italianReleases.json');
var jsonEnglish = require('../../storage/englishReleases.json');
var jsonAll = require('../../storage/allReleases.json');

// The function to check i data are present in the dataset is imported

const {insert} = require('../../storage/saveData')

// The function that allows to make requests to the Spotify api is imported

const APPController = require('../../spotify/spotyApp');

// This is the function to get the data
function release4Country(country, condition1, condition2, receivedMessage, path, json) {
    
    // First we call the function to get the Spotify token
    APPController.APPController.getToken().then(spotifyToken => {
        console.log(spotifyToken);
        
        // Then we call the function to get the list of the releases
        APPController.APPController.getReleases(spotifyToken, country).then(releasesData => {
            
            //This is a function to check the genre of the artist of each release
            async function forLoop(releasesData) {
                let names = "";
                let count = 1;
                console.log(condition1 + "   " + condition2);
                for(i = 0; i < releasesData.length; i++) {

                    let artistUri = releasesData[i].artists[0].href;

                    console.log(i);
                    
                    // Here we call the function to get the data of the single artists
                    let singleArtistGenre = await APPController.APPController.getArtist(spotifyToken, artistUri);
                    console.log(singleArtistGenre[0]);

                    // We are checking only the first element of the array of genres and it's possible that
                    // the array is empty (so that the first element doasn't exist). 
                    // In this case this part of code is executed
                    if(singleArtistGenre[0] == undefined) {
                        console.log("Questa è la releasesData " + singleArtistGenre[0] );
                        artist = releasesData[i].artists != undefined? releasesData[i].artists[0].name : "Unknown";
                    
                        names =     
                            count + "- "            + releasesData[i].name                  + "\n"      +
                            "---- Artist: "         + artist                                + "\n"      +
                            "---- Release date: "   + releasesData[i].release_date          + "\n"      +
                            "\n"                    + releasesData[i].external_urls.spotify             ;

                        count ++;

                        let toAdd = {
                            albumName : releasesData[i].name,
                            artistName : artist,
                            genre : "Unknown",
                            releaseDate : releasesData[i].release_date,
                            urlSpoty : releasesData[i].external_urls.spotify
                        }
                        
                        // Here is called to function to check if the data are already present in the
                        // dataset and, in case the aren't, insert them

                        insert(json, toAdd, path);
                    
                        console.log(releasesData[i].name);

                        // This is the answer of the bot to the user message
                        receivedMessage.channel.send(names);
                    } else {
                        let genresCondition = [];
                        for(e=0; e < singleArtistGenre.length; e++) {
                            if( singleArtistGenre[e].toLowerCase().includes(condition1) || singleArtistGenre[e].includes(condition2) ) {
                                genresCondition.push(singleArtistGenre[e]);
                            }
                        }
                        if(genresCondition[0]) {
                            names =  
                                count + "- "            + releasesData[i].name                  + "\n"      +
                                "---- Artist: "         + releasesData[i].artists[0].name       + "\n"      +
                                "---- Release date: "   + releasesData[i].release_date          + "\n"      +
                                "\n"                    + releasesData[i].external_urls.spotify             ;

                            count ++;
    
                            let toAdd = {
                                albumName : releasesData[i].name,
                                artistName : releasesData[i].artists[0].name,
                                genre : singleArtistGenre,
                                releaseDate : releasesData[i].release_date,
                                urlSpoty : releasesData[i].external_urls.spotify
                            }   
                            
                            // Here is called to function to check if the data are already present in the
                            // dataset and, in case the aren't, insert them
                            await insert(json, toAdd, path);
                        
                            console.log(releasesData[i].name);
                            
                            // This is the answer of the bot to the user message
                            receivedMessage.channel.send(names);
                        }
                    }
                }
            }
            forLoop(releasesData);
        })
    })
}

// Resolver of the command '/m [topic]'

// The variable that contains the message without the first word and the receivedMessage are passed

const musicCommand = function (arguments, receivedMessage) {
    // Case where the elaboratedCommand variable is empty (the user only wrote '!help')

    if (arguments.length == 0) {
        receivedMessage.channel.send("I don't know what you asked. Try with '!help music'");
    } else {

        // Case where the elaboratedCommand variable contains something:
        // First of all, in the variable arg we need to insert the first 4 words of the processed
        // command, as all commands are made up of 4 words

        let arg = arguments[0] + " " + arguments[1] + " " + arguments[2] + " " + arguments[3];

        // These are the possible responses to the user

        switch(arg) {
            // For each case we need to pass the abbreviation of the country (which will
            // be used to create the URL of the Spotify api to make the request), the two
            // conditions to check the genre of the releases, the path of the dataset 
            // (which will be used to read and save the data) and the json (which contains the
            // data already stored to read and compare with those to be inserted) 

            case "all new rap releases":
                country = "IT";
                condition1 = "hip hop";
                condition2 = "italian alternative";
                receivedMessage = receivedMessage;
                path = "./storage/allReleases.json";
                json = jsonAll;
                release4Country(country, condition1, condition2, receivedMessage, path, json);
            break;

            case "new italian rap releases":
                country = "IT";
                condition1 = "italian hip hop";
                condition2 = "italian alternative";
                receivedMessage = receivedMessage;
                path = "./storage/italianReleases.json";
                json = jsonItalian;
                release4Country(country, condition1, condition2, receivedMessage, path, json);
            break;

            case "new american rap releases":
                country = "US";
                condition1 = "hip hop";
                condition2 = "rap";
                receivedMessage = receivedMessage;
                path = "./storage/americanReleases.json";
                json = jsonAmerican;
                release4Country(country, condition1, condition2, receivedMessage, path, json);
            break;

            case "new english rap releases":
                country = "GB";
                condition1 = "uk alternative hip hop";
                condition2 = "uk hip hop";
                receivedMessage = receivedMessage;
                path = "./storage/englishReleases.json";
                json = jsonEnglish;
                release4Country(country, condition1, condition2, receivedMessage, path, json);
            break;
            default:
                receivedMessage.channel.send("Mi dispiace ma non capisco cosa hai chiesto, se vuoi che ti ridica la lista delle cose che puoi chiedermi, scrivi '!help recap'");
            break;
        }
    }
}

module.exports.musicCommand = musicCommand;