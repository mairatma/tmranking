import { useQuery } from '@tanstack/react-query';

import { PlayerRatingInfo } from '../types';

interface GetPlayerResponse {
  player: PlayerRatingInfo;
  crawledAt: string;
}

const fetchPlayerRatingInfo = async (playerId: string) => {
  const response = await fetch(`/api/cbtm/players/${playerId}/rating`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as GetPlayerResponse;
};

export const usePlayerRatingInfo = (playerId: string) => {
  return useQuery({
    queryKey: ['players', playerId],
    queryFn: () => fetchPlayerRatingInfo(playerId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
