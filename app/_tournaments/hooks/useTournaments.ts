import { useQuery } from '@tanstack/react-query';

import { Tournament } from '../types';

const fetchTournaments = async () => {
  const response = await fetch(`/api/cbtm/tournaments`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as Tournament[];
};

export const useTournaments = () => {
  return useQuery({
    queryKey: ['tournament', 'get'],
    queryFn: () => fetchTournaments(),
  });
};
