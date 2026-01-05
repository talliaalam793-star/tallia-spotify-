// src/components/Albumpopup.jsx
import React from "react";

export default function Albumpopup({ album, artists = [] }) {
  if (!album) return null;

  const artistObj = (artists || []).find(a => (a.name || "").toLowerCase() === (album.artist || "").toLowerCase());
  const onImgErr = (e) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; };

  return (
    <div style={{padding:12, width:"100%"}}>
      <div style={{
        background: "#050405",
        borderRadius: 12,
        padding: 14,
        boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <img src={album.cover} alt={album.title}
             style={{ width: 260, height: 260, objectFit: "cover", borderRadius: 12 }}
             onError={onImgErr} />
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{album.title}</div>
          <div style={{ color: "#9b8fc7", marginTop: 6 }}>{album.artist}</div>
        </div>

        { artistObj ? (
          <div style={{ display: "flex", gap: 12, marginTop: 18, alignItems: "center", width: "100%", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.03)" }}>
            <img src={artistObj.cover} alt={artistObj.name}
                 style={{ width: 120, height: 120, borderRadius: 12, objectFit: "cover" }}
                 onError={onImgErr} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{artistObj.name}</div>
              <div style={{ color: "#9b8fc7", marginTop: 6, fontSize: 13, lineHeight:1.3 }}>{artistObj.bio}</div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 18, color: "#9b8fc7" }}>Artist info not available</div>
        )}
      </div>
    </div>
  );
}
