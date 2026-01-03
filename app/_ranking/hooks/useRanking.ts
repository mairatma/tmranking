import { useQuery } from '@tanstack/react-query';
import { RankingEntry, RankingOptions, RankingRegion } from '../types';

const DEFAULT_YEAR = new Date().getFullYear();
const DEFAULT_REGION = RankingRegion.Brasil;

interface GetRankingResponse {
  rankings: [RankingEntry];
  crawledAt: string;
}

const fetchRanking = async (options: Required<RankingOptions>) => {
  const baseUrl = '/api/cbtm/ranking';

  const queryString = new URLSearchParams({
    category: options.category,
    year: options.year.toString(),
    region: options.region,
  }).toString();

  const response = await fetch(`${baseUrl}?${queryString}`, {});
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as GetRankingResponse;
};

export const useRanking = (options: RankingOptions) => {
  const requestOptions = {
    year: DEFAULT_YEAR,
    region: DEFAULT_REGION,
    ...options,
  };

  return useQuery({
    queryKey: ['ranking', requestOptions],
    queryFn: () => fetchRanking(requestOptions),
  });
};
