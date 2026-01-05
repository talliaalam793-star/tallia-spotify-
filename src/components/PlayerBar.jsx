// src/components/PlayerBar.jsx
import React, { useState, useEffect } from "react";

export default function PlayerBar({ current, isPlaying, togglePlay, next, prev, audioRef }) {
  const [vol, setVol] = useState(1);
  useEffect(()=> { if (audioRef && audioRef.current) audioRef.current.volume = vol; }, [vol, audioRef]);

  function onImgError(e){ e.target.onerror=null; e.target.src='/images/placeholder.jpg'; }

  return (
    <div className="playerbar">
      <div style={{display:'flex',gap:12,alignItems:'center',cursor:'pointer'}}>
        <div style={{width:56,height:56,overflow:'hidden',borderRadius:8}}>
          {current ? <img src={current.cover} alt={current.title} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={onImgError} /> : <div style={{width:56,height:56,background:'#111'}} />}
        </div>
        <div>
          <div style={{fontWeight:700}}>{current ? current.title : 'Not playing'}</div>
          <div style={{fontSize:12,color:'var(--muted)'}}>{current ? current.artist : ''}</div>
        </div>
      </div>

      <div style={{flex:1,display:'flex',flexDirection:'column',gap:8}}>
        <div className="player-controls" style={{justifyContent:'center'}}>
          <button className="btn" onClick={prev} aria-label="Prev">
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M6 18V6l8.5 6L6 18zM18 6v12h-2V6h2z" fill="currentColor"/></svg>
          </button>

          <button className="btn" onClick={togglePlay} aria-label="Play/Pause">
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
            )}
          </button>

          <button className="btn" onClick={next} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M16 6v12l-8-6 8-6zM20 6v12h-2V6h2z" fill="currentColor"/></svg>
          </button>

          <button className="btn" aria-label="Repeat">
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M7 7h9v3l4-4-4-4v3H6c-1.1 0-2 .9-2 2v10h2V7zM17 17H8v-3l-4 4 4 4v-3h10c1.1 0 2-.9 2-2V7h-2v10z" fill="currentColor"/></svg>
          </button>
        </div>

        <div className="progress">
          <input type="range" min={0} max={100} defaultValue={0} />
        </div>
      </div>

      <div style={{width:180,display:'flex',alignItems:'center',justifyContent:'flex-end',gap:8}}>
        <svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 10v4h4l5 5V5L7 10H3z" fill="currentColor"/></svg>
        <input type="range" min={0} max={1} step="0.01" value={vol} onChange={(e)=>setVol(Number(e.target.value))} />
      </div>
    </div>
  );
}
