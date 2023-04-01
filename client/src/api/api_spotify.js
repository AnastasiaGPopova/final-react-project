// import { useEffect } from "react";

// export function SportifyInit(){

// const baseUrl = `https://accounts.spotify.com/api/token`
// const client_ID= 'bec8e94459364f46b241c54a02dc7727'
// const client_Secret = "16dfb099cf584eeca7bd081e0fe16138"

// useEffect(()=> {
//   let authParameters = {
//     method: "POST",
//     headers: {
//         'Content-Type': "application/x-www-form-urlencoded"
//     },
//     body: 'grant_type=client_credentials&client_id=' + client_ID + "&client_secret=" + client_Secret 
// }
// fetch(baseUrl, authParameters)
//     .then(result=> result.json())
//     .then(data => {
//       localStorage.setItem('spotifyToken', data.access_token)
//     })
// }, [baseUrl])
    
// }





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