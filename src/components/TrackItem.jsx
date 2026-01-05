import React from "react";
import "./TrackItem.css";

const TrackItem = ({ track, onClick }) => {
  return (
    <div className="track-item" onClick={onClick}>
      <img src={track.cover} alt={track.title} className="track-cover" />
      <div className="track-info">
        <p className="track-title">{track.title}</p>
        <p className="track-artist">{track.artist}</p>
      </div>
    </div>
  );
};

export default TrackItem;
