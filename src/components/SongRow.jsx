// src/components/SongRow.jsx
import React from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function SongRow({ s, index }){
  const { playSong, toggleLike, liked, addToQueue } = usePlayer();
  const isLiked = liked.includes(s.id);

  // fallback handler for broken images
  function onImgError(e){
    e.target.onerror = null;
    e.target.src = '/images/placeholder.jpg'; // create placeholder.jpg in /public/images
  }

  return (
    <div className="song-row" style={{alignItems:'center'}}>
      <div className="cover">
        <img src={s.cover} alt={s.title} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={onImgError}/>
        <button
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={(ev)=>{ ev.stopPropagation(); toggleLike(s.id); }}
          aria-label={isLiked ? 'Unlike' : 'Like'}>
          {isLiked ? '♥' : '♡'}
        </button>
      </div>

      <div className="song-info">
        <div className="song-title">{s.title}</div>
        <div className="song-artist">{s.artist}</div>
      </div>

      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <div style={{fontSize:13}}>{s.duration}</div>
        <button className="btn" onClick={()=>playSong(s.id)} aria-label="Play song">
          {/* play SVG */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 3v18l15-9L5 3z" fill="currentColor"/></svg>
          Play
        </button>
        <button className="btn" onClick={()=>addToQueue(s.id)} aria-label="Add to queue">+</button>
      </div>
    </div>
  );
}
