import { buildCrawlerResponse } from '../response';
import { parseTournamentNameAndCategories } from './parser';

const BASE_URL = 'https://app.cbtm.org.br/IUI/App/Evento';
const ID_QUERY = 'EVE_Evento_ID';

export const fetchTournamentPageById = async (id: string) => {
  const response = await fetch(`${BASE_URL}?${ID_QUERY}=${id}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.text();
};

export const fetchTournamentById = async (id: string) => {
  const html = await fetchTournamentPageById(id);

  return buildCrawlerResponse(parseTournamentNameAndCategories(html));
};
