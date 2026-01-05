// src/components/QueuePanel.jsx
import React from "react";

export default function QueuePanel({ queue = [], albums = [], onPlayIndex = () => {}, onClose = () => {} }) {
  return (
    <div style={{ background: "#050405", borderRadius: 12, padding: 12, height: "100%", boxShadow: "0 8px 30px rgba(0,0,0,0.6)", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: 800 }}>Up Next</div>
        <button className="btn" onClick={onClose}>✕</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {queue.length === 0 && <div style={{ color: "#9b8fc7" }}>Queue is empty</div>}
        {queue.map((idx, i) => {
          const album = albums[idx];
          if (!album) return null;
          return (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", padding: 8, borderRadius: 8, background: "rgba(255,255,255,0.01)" }}>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <img src={album.cover} alt={album.title} style={{width:48,height:48,objectFit:'cover',borderRadius:6}}/>
                <div>
                  <div style={{fontWeight:700}}>{album.title}</div>
                  <div style={{color:'#9b8fc7',fontSize:12}}>{album.artist}</div>
                </div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn" onClick={() => onPlayIndex(idx)}>Play</button>
                <div style={{fontSize:12,color:'#9b8fc7'}}>{/* optional duration */}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
