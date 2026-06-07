import { useQuery } from '@tanstack/react-query';

import { Tournament } from '../types';

const fetchTournaments = async (search?: string) => {
  const url = new URL('/api/cbtm/tournaments', window.location.origin);
  if (search) url.searchParams.set('search', search);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as Tournament[];
};

export const useTournaments = (search?: string) => {
  return useQuery({
    queryKey: ['tournament', 'list', search ?? ''],
    queryFn: () => fetchTournaments(search),
  });
};
