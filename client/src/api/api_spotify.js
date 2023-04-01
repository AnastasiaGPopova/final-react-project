export async function getRequestSpotify(albumName) {

const spotifyToken = localStorage.getItem('spotifyToken')
console.log(spotifyToken)
const albumParameters = {
    method: "GET",
    headers: {
        'Content-Type': "application/json",
        "Authorization": "Bearer " + spotifyToken
    }
}

const resp= await fetch('https://api.spotify.com/v1/search?q=' + albumName + "&type=album", albumParameters)
const data = await resp.json()

return data
}