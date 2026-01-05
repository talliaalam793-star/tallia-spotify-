// src/components/Topbar.jsx
import React from 'react';

export default function Topbar({ query, setQuery }){
  return (
    <div className="topbar">
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div style={{fontSize:18, fontWeight:700}}>Your Playlist</div>
        <div className="search">
          <svg width="16" height="16" viewBox="0 0 24 24" style={{opacity:0.7}}><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16a6.471 6.471 0 004.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14z" fill="currentColor"/></svg>
          <input
            placeholder="Search songs, artists or albums..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:12}}>
        {/* profile icon only (no volume here) */}
        <div style={{width:36, height:36, borderRadius:18, background:'rgba(255,255,255,0.06)', display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4S8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/></svg>
        </div>
      </div>
    </div>
  );
}
