import React from "react";
import "./Film.css";

export default function Film({ film }) {
  return (
    <div className="Film-locate">
      <img src={film.poster} />
      <h3>
        {film.title}
        <span> ({film.year})</span>
      </h3>
    </div>
  );
}
