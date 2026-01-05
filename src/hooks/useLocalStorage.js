import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) {}
  }, [key, state]);

  return [state, setState];
}
