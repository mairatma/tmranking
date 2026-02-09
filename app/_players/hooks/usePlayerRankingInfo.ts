import { useQuery } from '@tanstack/react-query';

import { PlayerRankingInfo } from '../types';

interface GetPlayerResponse {
  player: PlayerRankingInfo;
  crawledAt: string;
}

const fetchPlayerRankingInfo = async (playerId: string, categoryId: string) => {
  const response = await fetch(
    `/api/cbtm/players/${playerId}/categories/${categoryId}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as GetPlayerResponse;
};

export const usePlayerRankingInfo = (playerId: string, categoryId: string) => {
  return useQuery({
    queryKey: ['players', playerId, 'categories', categoryId],
    queryFn: () => fetchPlayerRankingInfo(playerId, categoryId),
  });
};
