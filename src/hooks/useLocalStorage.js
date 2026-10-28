import { useEffect, useState } from "react";

// State React synchronisé avec le localStorage (favoris, jeu sélectionné…)
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // stockage indisponible (navigation privée) : on garde l'état en mémoire
    }
  }, [key, value]);

  return [value, setValue];
}
