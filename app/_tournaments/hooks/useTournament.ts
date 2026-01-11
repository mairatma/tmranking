import { useQuery } from '@tanstack/react-query';

interface GetTournamentResponse {
  title: string;
  categories: {
    value: string;
    label: string;
    registeredCount: number;
    preRegisteredCount: number;
  }[];
  crawledAt: string;
}

const fetchTournament = async (id: string) => {
  const response = await fetch(`/api/cbtm/tournaments/${id}`, {});
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as GetTournamentResponse;
};

export const useTournament = (id: string) => {
  return useQuery({
    queryKey: ['tournament', id],
    queryFn: () => fetchTournament(id),
  });
};
