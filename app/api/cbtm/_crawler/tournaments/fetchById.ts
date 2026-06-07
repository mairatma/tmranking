import { addTournament } from '../../_features/tournaments/add';
import { getCookiesFromResponse } from '../../_helpers/cookies';
import { buildCrawlerResponse } from '../response';
import { parseTournamentNameAndCategories } from './parser';
import { getTournamentUrl } from './url';

export const fetchTournamentPageById = async (id: string) => {
  const response = await fetch(getTournamentUrl(id));

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const responseText = await response.text();
  const cookies = getCookiesFromResponse(response);

  return { responseText, cookies };
};

export const fetchTournamentById = async (id: string) => {
  const { responseText } = await fetchTournamentPageById(id);

  const tournament = buildCrawlerResponse(
    parseTournamentNameAndCategories(responseText),
  );

  // Store the tournament in the backround so we start storing references organically.
  addTournament(Number(id), tournament.title);

  return tournament;
};
