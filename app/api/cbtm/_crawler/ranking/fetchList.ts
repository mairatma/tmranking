import { extractHtmlFromCallbackResponse } from '../helpers';
import { extractSessionData, parseRankingTable } from './parser';
import { CbtmSessionData, RANKING_INITIAL_SESSION_DATA } from '../session';
import { buildRankingFormData } from './formData';
import { RankingOptions } from './types';
import { buildCrawlerResponse } from '../response';

const BASE_URL = 'https://app.cbtm.org.br/iUI/Site/RankingResultado';

const fetchRankingPage = async (
  sessionData: CbtmSessionData,
  formData: URLSearchParams,
) => {
  const response = await fetch(`${BASE_URL}?Tipo=O`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
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

  const html = await fetchRankingPage(RANKING_INITIAL_SESSION_DATA, formData);

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

  const callbackData = await fetchRankingPage(newSessionData, formData);
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

  return buildCrawlerResponse(data);
};
