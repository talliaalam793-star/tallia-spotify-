// src/components/ArtistModal.jsx
import React from "react";
import albums from "../data/albums";

export default function ArtistModal({ artist, onClose, onPlayTitle, onAddQueueTitle }) {
  if (!artist) return null;

  // match by name (case-insensitive) or id mapping
  const artistName = (artist.name || "").toLowerCase();
  const list = albums.filter(a => (a.artist || "").toLowerCase().includes(artistName));

  function handleImgErr(e){ e.target.onerror = null; e.target.src = '/images/placeholder.jpg'; }

  return (
    <div style={{position:'fixed', left:0, right:0, top:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:400}}>
      <div style={{width:720, maxHeight:'80vh', overflow:'auto', borderRadius:12, background:'#050405', padding:20}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <img src={artist.cover} alt={artist.name} style={{width:84,height:84,objectFit:'cover',borderRadius:8}} onError={handleImgErr} />
            <div>
              <div style={{fontSize:20, fontWeight:700}}>{artist.name}</div>
              <div style={{color:'#9b8fc7'}}>{artist.bio}</div>
            </div>
          </div>
          <div>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>

        <div style={{display:'grid', gap:10}}>
          {list.length === 0 && <div style={{color:'#9b8fc7'}}>No songs found for this artist.</div>}
          {list.map((s) => (
            <div key={s.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.02)'}}>
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                <img src={s.cover} alt={s.title} style={{width:56,height:56,objectFit:'cover',borderRadius:6}} onError={handleImgErr}/>
                <div>
                  <div style={{fontWeight:700}}>{s.title}</div>
                  <div style={{fontSize:12, color:'#9b8fc7'}}>{s.artist}</div>
                </div>
              </div>

              <div style={{display:'flex', gap:8}}>
                <button className="btn" onClick={()=> onPlayTitle ? onPlayTitle(s.title) : null}>Play</button>
                <button className="btn" onClick={()=> onAddQueueTitle ? onAddQueueTitle(s.title) : null}>+ Queue</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
