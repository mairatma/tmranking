import { useQuery } from '@tanstack/react-query';

import { TournamentGroup } from '../types';

interface GetTournamentGroupsResponse {
  groups: TournamentGroup[];
  crawledAt: string;
}

const fetchTournamentGroups = async (
  tournamentId: string,
  categoryId: string,
) => {
  const response = await fetch(
    `/api/cbtm/tournaments/${tournamentId}/categories/${categoryId}/groups`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as GetTournamentGroupsResponse;
};

export const useTournamentGroups = (
  tournamentId: string,
  categoryId: string,
) => {
  return useQuery({
    queryKey: ['tournament', tournamentId, 'category', categoryId, 'groups'],
    queryFn: () => fetchTournamentGroups(tournamentId, categoryId),
  });
};
