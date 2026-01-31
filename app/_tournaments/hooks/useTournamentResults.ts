import { useQuery } from '@tanstack/react-query';

import { TournamentResults } from '../types';

interface GetTournamentResultsResponse {
  results: TournamentResults[];
  crawledAt: string;
}

const fetchTournamentResults = async (
  tournamentId: string,
  categoryId: string,
) => {
  const response = await fetch(
    `/api/cbtm/tournaments/${tournamentId}/categories/${categoryId}/results`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as GetTournamentResultsResponse;
};

export const useTournamentResults = (
  tournamentId: string,
  categoryId: string,
) => {
  return useQuery({
    queryKey: ['tournament', tournamentId, 'category', categoryId, 'results'],
    queryFn: () => fetchTournamentResults(tournamentId, categoryId),
  });
};
