import React from "react";
import TrackList from "../TrackList/Tracklist";

export default function SearchResults({ soundtracks, youtubeLink }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>

      <TrackList tracks={soundtracks} youtubeLink={youtubeLink} />
    </div>
  );
}
