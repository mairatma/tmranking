import { getCookiesFromResponse } from '../../../_helpers/cookies';
import { buildCrawlerResponse } from '../../response';
import { parsePlayerRatingInfo } from './parser';

const BASE_URL = 'https://app.cbtm.org.br/iUI/Site/RatingResultadoDetalhe';

export const fetchPlayerRatingPageById = async (id: string) => {
  const queryString = new URLSearchParams({
    Associado: id,
    Rating: '-',
    Colocacao: '-',
    Pontos: '-',
  }).toString();

  const response = await fetch(`${BASE_URL}?${queryString}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const responseText = await response.text();
  const cookies = getCookiesFromResponse(response);

  return { responseText, cookies };
};

export const fetchPlayerRatingById = async (id: string) => {
  const { responseText } = await fetchPlayerRatingPageById(id);

  const playerData = parsePlayerRatingInfo(responseText);

  return buildCrawlerResponse({ player: playerData });
};
