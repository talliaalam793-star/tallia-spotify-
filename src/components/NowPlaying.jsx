// src/components/Playlist.jsx
import React from "react";
import AlbumTile from "./AlbumTile";

export default function Playlist({ albums, onPlay, onAddQueue, onArtistClick }) {
  // featured: first 6 as example
  const featured = albums.slice(0, 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Featured horizontal slider */}
      <div style={{ overflowX: "auto", whiteSpace: "nowrap", paddingBottom: 6 }}>
        <div style={{ display: "inline-flex", gap: 12, paddingLeft: 8 }}>
          {featured.map((a) => (
            <div key={a.id} style={{ minWidth: 220, display: "inline-block", cursor: "pointer" }} onClick={() => onPlay(albums.indexOf(a))}>
              <img src={a.cover} alt={a.title} style={{ width: 220, height: 140, borderRadius: 12, objectFit: "cover" }} />
              <div style={{ marginTop: 8, fontWeight: 700 }}>{a.title}</div>
              <div style={{ color: "#9b8fc7", fontSize: 13 }}>{a.artist}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Albums grid */}
      <div style={{
        display: "grid",
        gap: 18,
        gridTemplateColumns: "repeat(3, 1fr)",
      }}>
        {albums.map((album, idx) => (
          <AlbumTile
            key={album.id}
            album={album}
            index={idx}
            onPlay={() => onPlay(idx)}
            onAddQueue={() => onAddQueue(idx)}
            onArtistClick={() => onArtistClick(album.artist)}
          />
        ))}
      </div>

      {/* responsive CSS via inline style fallback for large screens (JS) */}
      <style>{`
        @media (min-width: 1200px) {
          .playlist-grid { grid-template-columns: repeat(6, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
