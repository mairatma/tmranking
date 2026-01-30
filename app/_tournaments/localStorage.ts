export const LOCAL_STORAGE_TOURNAMENTS_KEY = 'tournaments';

export interface SavedTournament {
  id: string;
  name: string;
}

export const getTournamentsFromLocalStorage = (): SavedTournament[] => {
  if (typeof window === 'undefined') return [];

  const tournamentsStr = window.localStorage.getItem(
    LOCAL_STORAGE_TOURNAMENTS_KEY,
  );
  return tournamentsStr ? JSON.parse(tournamentsStr) : [];
};
