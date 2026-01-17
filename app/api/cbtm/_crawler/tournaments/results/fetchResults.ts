import { extractHtmlFromCallbackResponse } from '../../helpers';
import { buildCrawlerResponse } from '../../response';
import { buildTournamentResultsFormData } from './formData';
import { getTournamentUrl } from '../url';
import { parseTournamentResults } from '../parser';
import { fetchTournamentSessionCookies } from '../session/fetchSessionCookies';

const postTournamentResults = async (
  tournamentId: string,
  formData: URLSearchParams,
  cookies: string,
) => {
  const response = await fetch(getTournamentUrl(tournamentId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: cookies,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.text();
};

export const fetchTournamentResults = async (
  tournamentId: string,
  categoryId: string,
) => {
  const { cookies, ...sessionData } = await fetchTournamentSessionCookies(
    tournamentId,
    categoryId,
  );

  const formData = buildTournamentResultsFormData(sessionData, categoryId);
  const result = await postTournamentResults(tournamentId, formData, cookies);
  const html = extractHtmlFromCallbackResponse(result);
  const normalizedHtml = html
    .replaceAll('\\r', '')
    .replaceAll('\\n', '')
    .replaceAll('\\t', '')
    .replaceAll('\\/', '/');

  const results = parseTournamentResults(normalizedHtml);

  return buildCrawlerResponse({ results });
};
