import { parsePlayerInfo } from './parser';
import { getCookiesFromResponse } from '../../_helpers/cookies';
import { buildCrawlerResponse } from '../response';

const BASE_URL = 'https://app.cbtm.org.br/iUI/Site/RankingResultadoDetalhe';

interface PlayerParams {
  year?: string | null;
  ranking?: number | null;
}

export const fetchPlayerPageById = async (
  id: string,
  categoryId: string,
  params: PlayerParams = {},
) => {
  const queryString = new URLSearchParams({
    Tipo: 'O',
    UF: 'BR',
    Associado: id,
    Categoria: categoryId,
    Ano: (params.year || new Date().getFullYear()).toString(),
    Colocacao: params.ranking ? params.ranking.toString() : '-',
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

export const fetchPlayerById = async (
  id: string,
  categoryId: string,
  params?: PlayerParams,
) => {
  const { responseText } = await fetchPlayerPageById(id, categoryId, params);

  const playerData = parsePlayerInfo(responseText);

  return buildCrawlerResponse({ player: playerData });
};
