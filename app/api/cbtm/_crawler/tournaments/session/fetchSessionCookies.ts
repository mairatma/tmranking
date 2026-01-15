import parse from 'node-html-parser';

import { fetchTournamentPageById } from '../fetchById';
import { extractInputValue } from '../../helpers';
import { buildTournamentSessionFormData } from './formData';
import { getTournamentUrl } from '../url';
import { getCookiesFromResponse } from '../../../_helpers/cookies';

const postTournamentCbInfo = async (
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

  return { cookies: getCookiesFromResponse(response) };
};

export const fetchTournamentSessionCookies = async (
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
  };

  const formData = buildTournamentSessionFormData(sessionData, categoryId);
  const result = await postTournamentCbInfo(tournamentId, formData, cookies);

  return { ...sessionData, cookies: `${cookies}; ${result.cookies}` };
};
