import React from 'react';

export default function HeaderPlaylist({title, count}){
  return (
    <div style={styles.header}>
      <div style={styles.art}></div>
      <div style={{marginLeft:18}}>
        <div style={{fontSize:12, textTransform:'uppercase', color:'var(--muted)', letterSpacing:1}}>Playlist</div>
        <h1 style={{margin:'6px 0', fontSize:44}}>{title}</h1>
        <div style={{color:'var(--muted)'}}>{count} songs</div>
      </div>
    </div>
  );
}

const styles = {
  header: {display:'flex', alignItems:'center', gap:18, padding:20, borderRadius:12, background:'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', marginBottom:18},
  art: {width:140,height:140, background:'linear-gradient(180deg,var(--lavender), var(--purple))', borderRadius:8}
}
