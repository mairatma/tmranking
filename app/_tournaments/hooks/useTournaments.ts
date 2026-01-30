import { getTournamentsFromLocalStorage } from '../localStorage';

export const useTournaments = () => {
  const tournaments = getTournamentsFromLocalStorage();

  return { tournaments };
};
