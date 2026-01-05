// src/App.jsx
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar"; // top search only
import Playlist from "./components/Playlist";
import Playerbar from "./components/Playerbar";
import QueuePanel from "./components/QueuePanel";
import ArtistModal from "./components/ArtistModal";
import Albumpopup from "./components/Albumpopup";

import albumsData from "./data/albums";
import artistsData from "./data/artists";

export default function App() {
  const [query, setQuery] = useState("");
  const [queueOpen, setQueueOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const [albums] = useState(albumsData || []);
  const [artists] = useState(artistsData || []);
  const [queue, setQueue] = useState(albums.map((_, i) => i));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  useEffect(() => {
    audioRef.current = new Audio(albums[currentIndex]?.src || "");
    audioRef.current.onended = () => handleNext();
    return () => {
      if (audioRef.current) { audioRef.current.onended = null; audioRef.current.pause(); }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const src = albums[currentIndex]?.src || "";
    if (audioRef.current.src !== src) audioRef.current.src = src;
    if (isPlaying) audioRef.current.play().catch(()=>setIsPlaying(false));
  }, [currentIndex, isPlaying, albums]);

  function playIndex(i){
    if (typeof i !== "number") return;
    setCurrentIndex(i);
    setIsPlaying(true);
  }
  function togglePlay(){
    if (!audioRef.current) return;
    if (isPlaying){ audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play().then(()=>setIsPlaying(true)).catch(()=>setIsPlaying(false)); }
  }
  function handleNext(){
    const pos = queue.indexOf(currentIndex);
    const next = queue[pos+1] ?? queue[0];
    setCurrentIndex(next); setIsPlaying(true);
  }
  function handlePrev(){
    const pos = queue.indexOf(currentIndex);
    const prev = queue[pos-1] ?? queue[queue.length-1];
    setCurrentIndex(prev); setIsPlaying(true);
  }
  function addToQueue(idx){ if (typeof idx === "number") setQueue(q => [...q, idx]); }

  // search handling (top bar only)
  const q = (query||"").trim().toLowerCase();
  const filteredAlbums = albums.filter(a => {
    if (!q) return true;
    return (a.title||"").toLowerCase().includes(q) || (a.artist||"").toLowerCase().includes(q);
  });

  // open artist modal by artist object or name
  function openArtist(a){
    if (!a) return;
    let found = null;
    if (typeof a === "object" && a.name) {
      found = artists.find(x => (x.id && x.id === a.id) || (x.name && x.name.toLowerCase() === a.name.toLowerCase()));
      setSelectedArtist(found || a);
      return;
    }
    if (typeof a === "string"){
      found = artists.find(x => x.name.toLowerCase() === a.toLowerCase());
      setSelectedArtist(found || { name: a });
    }
  }

  // show album popup when playing AND queue closed
  const showAlbumPopup = !queueOpen && isPlaying && albums[currentIndex];

  return (
    <div style={{display:'flex', minHeight:'100vh', background:'linear-gradient(180deg,#07020a,#000)', color:'#fff'}}>
      {/* LEFT: Sidebar (no search) */}
      <div style={{width:120, minWidth:110, padding:12}}>
        <Sidebar artists={artists} onArtistClick={openArtist} onOpenQueue={()=>setQueueOpen(true)} />
      </div>

      {/* CENTER: main */}
      <div style={{flex:1, display:'flex', flexDirection:'column'}}>
        <div style={{padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontWeight:800, fontSize:20}}>Your Playlist</div>
          <SearchBar query={query} setQuery={setQuery} /> {/* TOP search only */}
        </div>

        <div style={{padding:18, flex:1, overflow:'auto'}}>
          <Playlist
            albums={filteredAlbums}
            onPlay={(i)=>playIndex(i)}
            onAddQueue={(i)=>addToQueue(i)}
            onArtistClick={(a)=>openArtist(a)}
          />
        </div>
      </div>

      {/* RIGHT: queue or album popup */}
      <div style={{width:340, padding:12}}>
        { queueOpen ? (
          <QueuePanel
            queue={queue}
            albums={albums}
            onPlayIndex={(i)=>{ setCurrentIndex(i); setIsPlaying(true); }}
            onClose={()=>setQueueOpen(false)}
          />
        ) : (
          showAlbumPopup ? <Albumpopup album={albums[currentIndex]} artists={artists} /> : null
        )}
      </div>

      {/* ARTIST MODAL */}
      { selectedArtist && (
        <ArtistModal
          artist={selectedArtist}
          albums={albums}
          onClose={() => setSelectedArtist(null)}
          onPlayTitle={(title) => {
            const idx = albums.findIndex(a=> (a.title||"").toLowerCase().trim() === (title||"").toLowerCase().trim());
            if (idx>=0) playIndex(idx);
          }}
          onAddQueueTitle={(title) => {
            const idx = albums.findIndex(a=> (a.title||"").toLowerCase().trim() === (title||"").toLowerCase().trim());
            if (idx>=0) addToQueue(idx);
          }}
        />
      )}

      {/* BOTTOM: player */}
      <div style={{position:'fixed', left:12, right:12, bottom:12}}>
        <Playerbar
          current={albums[currentIndex]}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          next={handleNext}
          prev={handlePrev}
          openQueue={()=>setQueueOpen(true)}
        />
      </div>
    </div>
  );
}
