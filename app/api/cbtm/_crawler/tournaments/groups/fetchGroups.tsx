import { extractHtmlFromCallbackResponse } from '../../helpers';
import { buildCrawlerResponse } from '../../response';
import { buildTournamentGroupsFormData } from './formData';
import { getTournamentUrl } from '../url';
import { parseTournamentGroups } from '../parser';
import { fetchTournamentSessionCookies } from '../session/fetchSessionCookies';

const postTournamentGroups = async (
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

export const fetchTournamentGroups = async (
  tournamentId: string,
  categoryId: string,
) => {
  const { cookies, ...sessionData } = await fetchTournamentSessionCookies(
    tournamentId,
    categoryId,
  );

  const formData = buildTournamentGroupsFormData(sessionData, categoryId);
  const result = await postTournamentGroups(tournamentId, formData, cookies);
  const html = extractHtmlFromCallbackResponse(result);
  const normalizedHtml = html
    .replaceAll('\\r', '')
    .replaceAll('\\n', '')
    .replaceAll('\\t', '')
    .replaceAll('\\/', '/');

  const groups = parseTournamentGroups(normalizedHtml);

  return buildCrawlerResponse({ groups });
};
