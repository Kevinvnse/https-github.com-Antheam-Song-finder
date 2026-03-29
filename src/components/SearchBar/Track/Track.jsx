import React from "react";

export default function Track({ song }) {
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{song.name}</h3>
        <p>
          {this.props.song.artist} | {song.album}
          <span className="Track-playbutton" onClick={this.youtubeCall}>
            <i className="fa fa-play-circle" style={{ fontSize: "20px" }} />
          </span>
        </p>
      </div>
    </div>
  );
}
