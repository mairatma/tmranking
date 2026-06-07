import { useEffect, useState } from 'react';
import {
  getTournamentsFromLocalStorage,
  LOCAL_STORAGE_TOURNAMENTS_KEY,
} from '../localStorage';

const MAX_TOURNAMENTS = 50;

export const useFavoriteTournament = (id: string) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const tournaments = getTournamentsFromLocalStorage();
    setIsFavorite(tournaments.some((t) => t.id === id));
  }, [id]);

  const toggleFavorite = (name: string) => {
    if (typeof window === 'undefined') return;

    const tournaments = getTournamentsFromLocalStorage();
    const newTournaments = isFavorite
      ? tournaments.filter((t) => t.id !== id)
      : [{ id, name }, ...tournaments].slice(0, MAX_TOURNAMENTS);

    localStorage.setItem(
      LOCAL_STORAGE_TOURNAMENTS_KEY,
      JSON.stringify(newTournaments),
    );
    setIsFavorite(!isFavorite);
  };

  return { isFavorite, toggleFavorite };
};
