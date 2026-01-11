import { useQuery } from '@tanstack/react-query';

import { TournamentBrackets } from '../types';

const fetchTournamentBrackets = async (
  tournamentId: string,
  categoryId: string,
) => {
  const response = await fetch(
    `https://app.cbtm.org.br/api/GameResult/${tournamentId}/${categoryId}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseText = await response.text();
  const normalized = responseText
    .slice(1, responseText.length - 1)
    .replaceAll('\\"', '\"')
    .replaceAll('\\r\\n', '');

  return JSON.parse(normalized) as TournamentBrackets;
};

export const useTournamentBrackets = (
  tournamentId: string,
  categoryId: string,
) => {
  return useQuery({
    queryKey: ['tournament', tournamentId, 'category', categoryId, 'brackets'],
    queryFn: () => fetchTournamentBrackets(tournamentId, categoryId),
  });
};
