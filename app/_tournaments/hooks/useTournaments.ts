import { useQuery } from '@tanstack/react-query';

import { Tournament } from '../types';

interface TournamentList {
  data: Tournament[];
  total: number;
}

const fetchTournaments = async (search?: string): Promise<TournamentList> => {
  const url = new URL('/api/cbtm/tournaments', window.location.origin);
  if (search) url.searchParams.set('search', search);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const useTournaments = (search?: string) => {
  return useQuery({
    queryKey: ['tournament', 'list', search ?? ''],
    queryFn: () => fetchTournaments(search),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
