const clientId = "c759abba6e264fa99fd4a9bb306f6ad3";
// const redirectUri = "http://localhost:3000";
const clientSecret = "dd60a68fb0504ae6a7ccbb82b0ab3924";

let token, tokenType, expires;

function getOAuth() {
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body:
      "grant_type=client_credentials&client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (resp) {
      // Return the response as JSON
      return resp.json();
    })
    .then(function (data) {
      // Log the API data
      console.log("token", data);

      // Store token data
      token = data.access_token;
      tokenType = data.token_type;
      expires = new Date().getTime() + data.expires_in * 1000;
    })
    .catch(function (err) {
      // Log any errors
      console.log("something went wrong", err);
    });
}

function getSongs(search) {
  console.log(tokenType);
  console.log(token);
  return fetch(
    `https://api.spotify.com/v1/search?q=${search}%20soundtrack&type=playlist`,
    {
      headers: {
        Authorization: tokenType + " " + token,
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
      let tracks = data.playlists.items[0].href;

      return fetch(
        `${tracks}/tracks?fields=items(track(name,artists(name),album(name,href),id))`,
        {
          headers: {
            Authorization: tokenType + " " + token,
            "Content-Type": "application/json",
          },
        }
      );
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.items.map((info) => ({
        name: info.track.name,
        artist: info.track.artists[0].name,
        album: info.track.album.name,
        id: info.track.id,
      }));
      // console.log(data);
    });
}

// If current token is invalid, get a new one
export function makeCall(search) {
  if (!expires || expires - new Date().getTime() < 1) {
    console.log("new call");
    return getOAuth().then(function () {
      return getSongs(search);
    });
  }
  // Otherwise, get songs
  console.log("from cache");
  console.log(search);
  return getSongs(search);
}
