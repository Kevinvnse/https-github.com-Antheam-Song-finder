import React from "react";

export default function Tracklist({ tracks }) {
  return (
    <div className="TrackList">
      {tracks.map((song) => {
        return (
          <Track
            key={song.id}
            song={song}
            youtubeLink={this.props.youtubeLink}
          />
        );
      })}
    </div>
  );
}
