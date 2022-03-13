import SearchBar from "../Components/SearchBar/SearchBar";

let token;
const CLIENT_ID = "b9fee6a6be9d4e30aa818a7294e7c704";
const REDIRECT_URI = "http://localhost:3000/";

const Spotify = {
    
    getAccessToken(){
        if (token) {
            return token;
        } else {
            const url = window.location.href;
            const accessTokenRegex = /access_token=([^&]*)/;
            const expirationRegex = /expires_in=([^&]*)/;
            let accessTokenMatch = url.match(accessTokenRegex);
            let expirationTimeMatch = url.match(expirationRegex);
            if (accessTokenMatch && expirationTimeMatch) {
                token = accessTokenMatch[1];
                let expirationTime = Number(expirationTimeMatch[1]);
                window.setTimeout(() => token='', expirationTime * 1000);
                window.history.pushState('Access Token', null, '/');
                return token;
            } else {
                window.location.href = `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(CLIENT_ID)}&response_type=token&scope=playlist-modify-public&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
            }
        }
    },

    search(parameter){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${parameter}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then((response) => {
	        if(response.ok){
		        return response.json();
	        }

	        throw new Error(`Request failed: `, response.status, " ", response.errors);
        }, (networkError) => {
            console.log(networkError.message);
        }).then((jsonResponse) => {
            if (!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(playlistName, uris){
        if (!playlistName || !uris){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};

        return fetch(`https://api.spotify.com/v1/me`, {
            headers: headers
        }).then((response) => {
	        if(response.ok){
                console.log("got user ID for playlist");
		        return response.json();
	        }

	        throw new Error(`Request failed: `, response.status, " ", response.errors);
        }, (networkError) => {
            console.log(networkError.message);
        }).then((jsonResponse) => {
            if (!jsonResponse.id){
                return '';
            }
            console.log("setting userID...")
            const userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
            ({headers: headers, method: 'POST', body: JSON.stringify({name: playlistName})}))
            .then((response) => {
                if(response.ok){
                    console.log("created new playlist!");
                    return response.json();
                }
                throw new Error('Request failed!');
            }, (networkError) => {
                console.log(networkError.message);
            }).then((jsonResponse) => {
                const playlistID = jsonResponse.id;
                console.log("adding tracks for ", playlistID);
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, 
                ({headers: headers, method: 'POST', body: JSON.stringify({uris: uris})}));
            });
        });
    }
}

export default Spotify;

// Get the hash of the url
// const hash = window.location.hash
// .substring(1)
// .split('&')
// .reduce(function (initial, item) {
//     if (item) {
//         var parts = item.split('=');
//         initial[parts[0]] = decodeURIComponent(parts[1]);
// }
//     return initial;
// }, {});

// window.location.hash = '';

// // Set token
// let _token = hash.access_token;

// const authEndpoint = 'https://accounts.spotify.com/authorize';

// // Replace with your app's client ID, redirect URI and desired scopes
// const clientId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
// const redirectUri = 'http://localhost:8888';
// const scopes = [
//     'playlist-modify-private',
// ];

// // If there is no token, redirect to Spotify authorization
// if (!_token) {
//     window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
// }

