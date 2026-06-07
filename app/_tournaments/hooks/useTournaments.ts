import { useQuery } from '@tanstack/react-query';

import { Tournament } from '../types';

interface TournamentList {
  data: Tournament[];
  total: number;
}

export const PAGE_SIZE = 20;

const fetchTournaments = async (
  search?: string,
  page = 1,
): Promise<TournamentList> => {
  const url = new URL('/api/cbtm/tournaments', window.location.origin);
  if (search) url.searchParams.set('search', search);
  if (page > 1) url.searchParams.set('page', String(page));

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const useTournaments = (search?: string, page = 1) => {
  return useQuery({
    queryKey: ['tournament', 'list', search ?? '', page],
    queryFn: () => fetchTournaments(search, page),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
