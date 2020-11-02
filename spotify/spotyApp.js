const fetch = require("node-fetch");
var btoa = require('btoa');

// This is the function that contains the three functions to fetch data from the Spotify api

const APPController = (function() {

    // The client Id and the client Secret are two codes that are used to request
    // the token. The token is necessary to make requests to the Spotify api
    
    const clientId = 'INSERT CLIENT ID HERE';
    const clientSecret = 'INSERT CLIENT SECRET HERE';

    // This is the function to ask for the access token

    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();

        // The token is returned
        return data.access_token; 
    } 


    // This function serves to get the list of the releases

    const _getReleases = async (token, countryInput) => {
        let country = countryInput;
        console.log(country + "   input:   " + countryInput);
        let url = `https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=15`;
        const result = await fetch(url, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        console.log(url);

        const data = await result.json();

        // The list is returned
        return data.albums.items;
    }


    // To know the genre of the release, we need to see the artist's data
    // therefore, with this function a new request is sent to the api,
    // this time to get the artist data

    const _getArtist = async (token, url) => {

        const result = await fetch(url, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();

        // The list of the genres is returned
        return data.genres;
    }


    // The external function return the three above functions
    return {
        getToken() {
            return _getToken();
        }, 

        // I need to pass the country whose list i want
        getReleases(token, countryInput) {
            return _getReleases(token, countryInput);
        },

        // I need to pass the url of the singole artist
        getArtist(token, url) {
            return _getArtist(token, url);
        }
    }
})();

module.exports.APPController = APPController;