// src/components/Sidebar.jsx
import React from "react";

export default function Sidebar({ artists = [], onArtistClick, onOpenQueue }) {
  const onImgErr = (e) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; };

  return (
    <div style={{display:'flex', flexDirection:'column', gap:18}}>
      <div style={{fontWeight:900, fontSize:20}}>TA</div>

      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        <button className="btn" onClick={()=> window.location.hash = "#home"}>🏠</button>
        <button className="btn" onClick={()=> window.location.hash = "#liked"}>❤️</button>
        <button className="btn" onClick={onOpenQueue}>≡</button>
      </div>

      <div style={{marginTop:10}}>
        <div style={{fontSize:13, color:'#9b8fc7'}}>Artists</div>
        <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:8}}>
          {artists.map(a => (
            <button key={a.id} onClick={()=> onArtistClick && onArtistClick(a)} style={{border:'none', background:'transparent', padding:0, cursor:'pointer'}}>
              <img src={a.cover} alt={a.name} style={{width:56, height:56, borderRadius:'50%', objectFit:'cover', border:'2px solid transparent'}} onError={onImgErr} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
