import { buildCrawlerResponse } from '../response';
import { parseTournamentNameAndCategories } from './parser';
import { getTournamentUrl } from './url';

export const fetchTournamentPageById = async (id: string) => {
  const response = await fetch(getTournamentUrl(id));

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const responseText = await response.text();
  const cookies = response.headers.getSetCookie().join(';');

  return { responseText, cookies };
};

export const fetchTournamentById = async (id: string) => {
  const { responseText } = await fetchTournamentPageById(id);

  return buildCrawlerResponse(parseTournamentNameAndCategories(responseText));
};
