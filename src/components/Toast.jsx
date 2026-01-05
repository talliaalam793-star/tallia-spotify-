// src/components/Toast.jsx
import React from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function Toast(){
  const { toast } = usePlayer();
  if(!toast) return null;
  return <div className="toast">{toast}</div>;
}
