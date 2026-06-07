import {
  getTournamentsFromLocalStorage,
  LOCAL_STORAGE_TOURNAMENTS_KEY,
} from '../localStorage';

const MAX_TOURNAMENTS = 50;

export const useAddFavoriteTournament = () => {
  return {
    addFavoriteTournament: (id: string, name: string) => {
      if (typeof window === 'undefined') return;

      const tournaments = getTournamentsFromLocalStorage();

      const newTournaments = [
        { id, name },
        ...tournaments.filter((entry) => entry.id !== id),
      ].slice(0, MAX_TOURNAMENTS);

      localStorage.setItem(
        LOCAL_STORAGE_TOURNAMENTS_KEY,
        JSON.stringify(newTournaments),
      );
    },
  };
};
