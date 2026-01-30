import {
  getTournamentsFromLocalStorage,
  LOCAL_STORAGE_TOURNAMENTS_KEY,
  SavedTournament,
} from '../localStorage';

export const useSaveTournament = () => {
  return {
    saveTournament: (id: string, name: string) => {
      const tournaments = getTournamentsFromLocalStorage();

      const newTournaments = [
        { id, name },
        ...tournaments.filter((entry) => entry.id !== id),
      ];
      localStorage.setItem(
        LOCAL_STORAGE_TOURNAMENTS_KEY,
        JSON.stringify(newTournaments),
      );
    },
  };
};
