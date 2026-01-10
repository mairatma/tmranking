import { extractHtmlFromCallbackResponse } from '../helpers';
import { parseRankingTable } from '../parser';
import {
  CbtmSessionData,
  extractSessionData,
  RANKING_INITIAL_SESSION_DATA,
} from '../session';
import { buildRankingFormData } from './formData';
import { RankingOptions } from './types';

const BASE_URL = 'https://app.cbtm.org.br/iUI/Site/RankingResultado';

const fetchRanking = async (
  sessionData: CbtmSessionData,
  formData: URLSearchParams,
) => {
  const response = await fetch(`${BASE_URL}?Tipo=O`, {
    method: 'POST',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      Cookie: sessionData.cookies,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.text();
};

const fetchRankingFirstPageHtml = async (options: RankingOptions) => {
  const formData = buildRankingFormData(RANKING_INITIAL_SESSION_DATA, options);

  const html = await fetchRanking(RANKING_INITIAL_SESSION_DATA, formData);

  // Update ViewState for potential next request
  const newSessionData = {
    ...RANKING_INITIAL_SESSION_DATA,
    ...extractSessionData(html),
  };

  return { html, newSessionData };
};

const fetchRankingPageHtml = async (options: RankingOptions, page: number) => {
  const { newSessionData } = await fetchRankingFirstPageHtml(options);

  const formData = buildRankingFormData(newSessionData, options);
  formData.set('__EVENTTARGET', '');
  formData.append('__CALLBACKID', 'ctl00$mainContent$grid');
  formData.append(
    '__CALLBACKPARAM',
    `c0:KV|2;[];GB|20;12|PAGERONCLICK3|PN${page - 1};`,
  );

  const callbackData = await fetchRanking(newSessionData, formData);
  return extractHtmlFromCallbackResponse(callbackData);
};

const fetchRankingHtml = async (options: RankingOptions, page = 1) => {
  if (page === 1) {
    const { html } = await fetchRankingFirstPageHtml(options);
    return html;
  }

  return await fetchRankingPageHtml(options, page);
};

export const fetchRankingList = async (options: RankingOptions, page = 1) => {
  const html = await fetchRankingHtml(options, page);
  const data = parseRankingTable(html);

  return {
    ...data,
    crawledAt: new Date().toISOString(),
  };
};
