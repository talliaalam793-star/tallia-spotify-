// src/components/Playlist.jsx
import React from "react";
import AlbumTile from "./AlbumTile";
import albumsData from "../data/albums"; // fallback data if parent didn't pass

export default function Playlist({ albums = null, onPlay = () => {}, onAddQueue = () => {}, onArtistClick = () => {} }) {
  const list = Array.isArray(albums) && albums.length ? albums : albumsData;
  // ensure we show exactly first 18 items (3 cols x 6 rows)
  const visible = list.slice(0, 18);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, padding: 12 }}>
      {visible.map((album, idx) => (
        <AlbumTile
          key={album.id ?? idx}
          album={album}
          index={idx}
          onPlay={() => onPlay(idx)}
          onAddQueue={() => onAddQueue(idx)}
          onArtistClick={() => onArtistClick(album.artist)}
        />
      ))}
    </div>
  );
}
