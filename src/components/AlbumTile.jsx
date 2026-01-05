// src/components/AlbumTile.jsx
import React, { useState, useEffect } from "react";

export default function AlbumTile({ album, index, onPlay = () => {}, onAddQueue = () => {}, onArtistClick = () => {} }) {
  const onImgErr = (e) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; };

  const STORAGE_KEY = "liked_albums_final";
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    try {
      const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setLiked(arr.includes(album.title));
    } catch { setLiked(false); }
  }, [album.title]);

  function toggleLike(e) {
    e.stopPropagation();
    try {
      const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (arr.includes(album.title)) {
        const newArr = arr.filter(x => x !== album.title);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newArr));
        setLiked(false);
      } else {
        arr.push(album.title);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
        setLiked(true);
      }
    } catch {
      setLiked(s => !s);
    }
  }

  return (
    <div onClick={onPlay} style={{ cursor: "pointer", borderRadius: 12, padding: 8, background: "#050405", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ position: "relative" }}>
        <img src={album.cover} alt={album.title} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10 }} onError={onImgErr} />
        <button onClick={toggleLike} style={{ position: "absolute", right: 8, top: 8, background: "rgba(0,0,0,0.5)", border: "none", padding: 6, borderRadius: 8, color: liked ? "#ff5b6a" : "#fff", cursor: "pointer" }}>
          {liked ? "♥" : "♡"}
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 700 }}>{album.title}</div>
          <div style={{ color: "#9b8fc7", fontSize: 13, cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); onArtistClick(album.artist); }}>
            {album.artist}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={(e) => { e.stopPropagation(); onAddQueue(index); }} className="btn">+Queue</button>
        </div>
      </div>
    </div>
  );
}
