import { useQuery } from '@tanstack/react-query';

import { PlayerRankingInfo } from '../types';
import { getCurrentYear } from '@/app/_ranking/helpers/years';

const DEFAULT_YEAR_VALUE = getCurrentYear();

interface GetPlayerResponse {
  player: PlayerRankingInfo;
  crawledAt: string;
}

const fetchPlayerRankingInfo = async (
  playerId: string,
  categoryId: string,
  year?: number,
) => {
  const response = await fetch(
    `/api/cbtm/players/${playerId}/categories/${categoryId}?year=${year ?? DEFAULT_YEAR_VALUE}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as GetPlayerResponse;
};

export const usePlayerRankingInfo = (
  playerId: string,
  categoryId: string,
  year?: number,
) => {
  return useQuery({
    queryKey: ['players', playerId, 'categories', categoryId, 'year', year],
    queryFn: () => fetchPlayerRankingInfo(playerId, categoryId, year),
  });
};
