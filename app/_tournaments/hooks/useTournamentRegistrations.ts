import { useQuery } from '@tanstack/react-query';
import { TournamentRegistration } from '../registrations/types';

interface GetTournamentRegistrationsResponse {
  registrations: TournamentRegistration[];
  crawledAt: string;
}

const fetchTournamentRegistrations = async (
  tournamentId: string,
  categoryId: string,
) => {
  const response = await fetch(
    `/api/cbtm/tournaments/${tournamentId}/categories/${categoryId}/registrations`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as GetTournamentRegistrationsResponse;
};

export const useTournamentRegistrations = (
  tournamentId: string,
  categoryId: string,
) => {
  return useQuery({
    queryKey: [
      'tournament',
      tournamentId,
      'category',
      categoryId,
      'registrations',
    ],
    queryFn: () => fetchTournamentRegistrations(tournamentId, categoryId),
  });
};
