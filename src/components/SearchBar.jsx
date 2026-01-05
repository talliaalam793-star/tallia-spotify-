// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:10}}>
      <svg width="18" height="18" viewBox="0 0 24 24" style={{opacity:0.8}}><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16a6.471 6.471 0 004.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14z" fill="currentColor"/></svg>
      <input
        value={query}
        onChange={(e)=> setQuery(e.target.value)}
        placeholder="Search songs, artists or albums..."
        style={{
          padding:10,
          borderRadius:12,
          background:'rgba(255,255,255,0.03)',
          border:'1px solid rgba(255,255,255,0.03)',
          color:'#fff',
          width:420,
          outline:'none'
        }}
      />
    </div>
  );
}
