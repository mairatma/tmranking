import { TournamentResults } from '../types';

export const getAllAtheletesFromResults = (results: TournamentResults[]) => {
  const athletesSet = new Set<string>();
  results.forEach((result) => {
    result.scores.forEach((score) => {
      athletesSet.add(score.name);
    });
  });
  return athletesSet.keys().toArray();
};

export const filterResultsByAthelete = (
  results: TournamentResults[],
  athleteName: string,
) => {
  return results.filter((result) =>
    result.scores.some((score) => score.name === athleteName),
  );
};
