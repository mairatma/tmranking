import { useEffect, useState } from 'react';
import {
  getTournamentsFromLocalStorage,
  SavedTournament,
} from '../localStorage';

export const useFavoriteTournaments = () => {
  const [favorites, setFavorites] = useState<SavedTournament[]>([]);

  useEffect(() => {
    setFavorites(getTournamentsFromLocalStorage());
  }, []);

  return favorites;
};
