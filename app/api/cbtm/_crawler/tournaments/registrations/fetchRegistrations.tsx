import parse from 'node-html-parser';

import { fetchTournamentPageById } from '../fetchById';
import {
  extractHtmlFromCallbackResponse,
  extractInputValue,
} from '../../helpers';
import { buildCrawlerResponse } from '../../response';
import { buildTournamentRegistrationsFormData } from './formData';
import { getTournamentUrl } from '../url';
import { parseTournamentRegistrations } from '../parser';

const postTournamentRegistrations = async (
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

export const fetchTournamentRegistrations = async (
  tournamentId: string,
  categoryId: string,
) => {
  const { responseText, cookies } = await fetchTournamentPageById(tournamentId);

  const root = parse(responseText);
  const viewState = extractInputValue(root, '__VIEWSTATE')!;
  const viewStateGenerator = extractInputValue(root, '__VIEWSTATEGENERATOR')!;
  const eventValidation = extractInputValue(root, '__EVENTVALIDATION')!;
  const sessionData = {
    viewState,
    eventValidation,
    viewStateGenerator,
    cookies,
  };

  const formData = buildTournamentRegistrationsFormData(
    sessionData,
    categoryId,
  );
  const result = await postTournamentRegistrations(
    tournamentId,
    formData,
    sessionData.cookies,
  );
  const html = extractHtmlFromCallbackResponse(result);
  const normalizedHtml = html
    .replaceAll('\\r', '')
    .replaceAll('\\n', '')
    .replaceAll('\\t', '')
    .replaceAll('\\/', '/');

  const registrations = parseTournamentRegistrations(normalizedHtml);

  return buildCrawlerResponse({ registrations });
};
