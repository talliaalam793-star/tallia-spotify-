// src/components/NowPlayingPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import artists from '../data/artists';

export default function NowPlayingPage({ onBack }) {
  const { currentId, songs, togglePlay, isPlaying, handleNext, handlePrev, shuffle, toggleShuffle, repeat, cycleRepeat, stop } = usePlayer();
  const current = songs.find(s => s.id === currentId);
  const imgRef = useRef(null);
  const [ambient, setAmbient] = useState('rgba(80,50,200,0.18)');

  // sample dominant-ish color from the cover using canvas
  useEffect(() => {
    if (!current) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = current.cover;
    img.onload = () => {
      try {
        const c = document.createElement('canvas');
        c.width = 40; c.height = 40;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, 40, 40);
        const data = ctx.getImageData(0, 0, 40, 40).data;
        let r=0,g=0,b=0,count=0;
        for(let i=0;i<data.length;i+=4){
          const alpha = data[i+3];
          if(alpha < 125) continue;
          r += data[i]; g += data[i+1]; b += data[i+2]; count++;
        }
        if(count>0){
          r=Math.round(r/count); g=Math.round(g/count); b=Math.round(b/count);
          setAmbient(`rgba(${r},${g},${b},0.18)`);
          document.documentElement.style.setProperty('--ambient', `rgba(${r},${g},${b},0.18)`);
        }
      } catch(e){ /* ignore sampling errors */ }
    }
  }, [current]);

  return (
    <div style={{minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24}}>
      <div className="flower-frame ambient" style={{width:'80%', maxWidth:1000, borderRadius:16, overflow:'hidden', background:'linear-gradient(180deg,#001836, #000)', padding:28, position:'relative'}}>
        <button onClick={onBack} style={{position:'absolute', left:16, top:16, background:'transparent', border:'none', color:'#fff', cursor:'pointer'}}>← Back</button>

        <div style={{display:'flex', gap:24, alignItems:'center'}}>
          <div style={{width:360, height:360, borderRadius:12, overflow:'hidden', boxShadow:'0 12px 40px rgba(0,0,0,0.6)', border:'4px solid rgba(255,255,255,0.03)'}}>
            {current && <img ref={imgRef} src={current.cover} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}} />}
          </div>

          <div style={{flex:1}}>
            <div style={{color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, fontSize:13}}>Now Playing</div>
            <h2 style={{margin:'8px 0 6px', fontSize:40}}>{current ? current.title : 'No song'}</h2>
            <div style={{color:'var(--muted)', marginBottom:18}}>{current ? (artists.find(a=>a.id===current.artistId)?.name || '') : ''}</div>

            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <button onClick={handlePrev} className="btn">⏮</button>
              <button onClick={togglePlay} className="btn">{isPlaying ? '⏸' : '▶'}</button>
              <button onClick={handleNext} className="btn">⏭</button>

              <div style={{width:12}}/>
              <button onClick={()=>{ toggleShuffle(); }} className="btn" style={{border: shuffle ? '1px solid var(--accent)' : '1px solid transparent'}}>Shuffle</button>
              <button onClick={()=>{ cycleRepeat(); }} className="btn" style={{border: repeat !== 'none' ? '1px solid var(--accent)' : '1px solid transparent'}}>{repeat === 'none' ? 'Repeat' : repeat === 'all' ? 'Repeat All' : 'Repeat 1'}</button>

              <button onClick={()=>stop()} className="btn">Stop</button>
            </div>

            <div style={{marginTop:20}}>
              <p style={{color:'var(--muted)'}}>Album: {current ? current.album : '-'}</p>
              <p style={{color:'var(--muted)'}}>Date added: {current ? current.dateAdded : '-'}</p>
            </div>
          </div>
        </div>

        {/* ambient background glow */}
        <div style={{
          position:'absolute', left:0, top:0, right:0, bottom:0,
          pointerEvents:'none',
          background: `radial-gradient(600px 300px at 20% 30%, ${ambient}, transparent 20%),
                       radial-gradient(400px 200px at 80% 70%, rgba(20,120,255,0.06), transparent 30%)`,
          mixBlendMode: 'screen',
          opacity:0.9
        }} />
      </div>
    </div>
  );
}
