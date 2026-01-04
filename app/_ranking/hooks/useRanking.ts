import { useQuery } from '@tanstack/react-query';
import { RankingEntry, RankingOptions } from '../types';

const DEFAULT_YEAR = new Date().getFullYear();
const DEFAULT_PAGE = 1;

interface GetRankingResponse {
  rankings: [RankingEntry];
  totalItems: number;
  crawledAt: string;
}

const fetchRanking = async (options: Required<RankingOptions>) => {
  const baseUrl = '/api/cbtm/ranking';

  const queryString = new URLSearchParams({
    category: options.category,
    year: options.year.toString(),
    region: options.region,
    page: options.page.toString(),
  }).toString();

  const response = await fetch(`${baseUrl}?${queryString}`, {});
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as GetRankingResponse;
};

export const useRanking = (options: RankingOptions | null) => {
  const requestOptions = options
    ? {
        year: DEFAULT_YEAR,
        page: DEFAULT_PAGE,
        ...options,
      }
    : null;

  return useQuery({
    queryKey: ['ranking', requestOptions],
    queryFn: requestOptions ? () => fetchRanking(requestOptions) : () => null,
    enabled: Boolean(requestOptions),
  });
};
