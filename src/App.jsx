import { useState } from "react";

import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { getFilm } from "./util/Omdb";
import { getYoutubeLink } from "./util/Youtube";
import { makeCall } from "./util/Spotify";
import SearchResults from "./components/SearchBar/SearchResults/SearchResults";
import Film from "./components/SearchBar/Film/Film";

function App() {
  const [soundtracks, setSoundtracks] = useState([]);
  const [film, setFilm] = useState({});

  const searchYoutube = (name, artist) => {
    getYoutubeLink(name, artist);
  };

  const searchSpotify = (search) => {
    console.log(search);
    makeCall(search).then((soundtracks) => {
      setSoundtracks(soundtracks);
    });
  };

  const searchOmdb = (search) => {
    getFilm(search).then((filmDetail) => {
      console.log(filmDetail);
      setFilm(filmDetail);
    });
    console.log(film);
  };
  return (
    <>
      <div>
        <h1>Get That Song</h1>
        {
          <div className="App">
            <SearchBar searchSpotify={searchSpotify} searchOmdb={searchOmdb} />
          </div>
        }
        <div className="App-playlist">
          <SearchResults
            soundtracks={soundtracks}
            youtubeLink={searchYoutube}
          />
          <div>
            <Film film={film} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
