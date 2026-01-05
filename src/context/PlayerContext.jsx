// src/context/PlayerContext.jsx
import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';
import songs from '../data/songs';

const PlayerContext = createContext();
export function usePlayer(){ return useContext(PlayerContext); }

export function PlayerProvider({ children }){
  const audioRef = useRef(new Audio());
  const [currentId, setCurrentId] = useState(songs[0]?.id || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [queue, setQueue] = useState(songs.map(s => s.id));
  const [liked, setLiked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('likedSongs')) || []; } catch { return []; }
  });

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('none'); // none | all | one
  const [toast, setToast] = useState(null);

  useEffect(()=>{
    const audio = audioRef.current;
    function onTime(){ setProgress(audio.currentTime || 0); }
    function onLoaded(){ setDuration(audio.duration || 0); }
    function onEnded(){ handleEnded(); }
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    return ()=> {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentId, queue, shuffle, repeat]);

  useEffect(()=>{
    const s = songs.find(x => x.id === currentId);
    if(s){
      const audio = audioRef.current;
      if(!audio.src || !audio.src.endsWith(s.src)) audio.src = s.src;
      if(isPlaying) audio.play().catch(()=>{});
    }
  }, [currentId]);

  useEffect(()=> { audioRef.current.volume = volume; }, [volume]);

  useEffect(()=> { localStorage.setItem('likedSongs', JSON.stringify(liked)); }, [liked]);

  const showToast = useCallback((msg)=>{
    setToast(msg);
    setTimeout(()=> setToast(null), 1800);
  }, []);

  function playSong(id){
    setCurrentId(id);
    setIsPlaying(true);
    setTimeout(()=> audioRef.current.play().catch(()=>{}), 40);
  }

  function togglePlay(){
    const audio = audioRef.current;
    if(isPlaying){ audio.pause(); setIsPlaying(false); }
    else { audio.play().then(()=>setIsPlaying(true)).catch(()=>setIsPlaying(false)); }
  }

  function handleSeek(time){ try { audioRef.current.currentTime = time; setProgress(time); } catch(e){} }

  function toggleLike(id){
    setLiked(prev => {
      const next = prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id];
      showToast(next.includes(id) ? 'Added to Liked' : 'Removed from Liked');
      return next;
    });
  }

  function addToQueue(id){
    setQueue(prev => [...prev, id]);
    showToast('Added to queue');
  }

  function handleNext(){
    const idx = queue.indexOf(currentId);
    let next;
    if(shuffle){
      const pool = queue.filter(x => x !== currentId);
      next = pool[Math.floor(Math.random() * pool.length)];
    } else {
      next = queue[idx + 1];
    }
    if(!next){
      if(repeat === 'all') next = queue[0];
      else { setIsPlaying(false); return; }
    }
    setCurrentId(next);
    setIsPlaying(true);
  }

  function handlePrev(){
    const idx = queue.indexOf(currentId);
    const prev = queue[idx - 1] || queue[queue.length - 1];
    setCurrentId(prev);
    setIsPlaying(true);
  }

  function handleEnded(){
    if(repeat === 'one'){
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(()=>{});
      return;
    }
    handleNext();
  }

  function toggleShuffle(){ setShuffle(s => { const n = !s; showToast(n ? 'Shuffle On' : 'Shuffle Off'); return n; }); }
  function cycleRepeat(){ setRepeat(r => { const next = r === 'none' ? 'all' : r === 'all' ? 'one' : 'none'; showToast(next === 'none' ? 'Repeat Off' : next === 'all' ? 'Repeat All' : 'Repeat One'); return next; }); }
  function stop(){ const a = audioRef.current; a.pause(); a.currentTime = 0; setIsPlaying(false); setProgress(0); }

  return (
    <PlayerContext.Provider value={{
      audioRef, songs, currentId, isPlaying, progress, duration, volume, setVolume,
      playSong, togglePlay, handleSeek, handleNext, handlePrev, stop,
      queue, setQueue, addToQueue, liked, toggleLike, shuffle, toggleShuffle, repeat, cycleRepeat,
      toast, showToast
    }}>
      {children}
    </PlayerContext.Provider>
  );
}
