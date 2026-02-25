import { isRatingCategory } from '@/app/_ranking/categories';

import { extractHtmlFromCallbackResponse } from '../helpers';
import { extractSessionData, parseRankingTable } from './parser';
import {
  CbtmSessionData,
  RANKING_INITIAL_SESSION_DATA,
  RATING_INITIAL_SESSION_DATA,
} from '../session';
import { buildRankingFormData } from './formData';
import { RankingOptions } from './types';
import { buildCrawlerResponse } from '../response';

const BASE_URL_RANKING = 'https://app.cbtm.org.br/iUI/Site/RankingResultado';
const BASE_URL_RATING = 'https://app.cbtm.org.br/iUI/Site/RatingResultado';

const fetchRankingPage = async (
  sessionData: CbtmSessionData,
  formData: URLSearchParams,
  isRating: boolean,
) => {
  const baseUrl = isRating ? BASE_URL_RATING : BASE_URL_RANKING;
  const response = await fetch(`${baseUrl}?Tipo=O`, {
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
  const isRating = isRatingCategory(options.category);
  const initialSessionData = isRating
    ? RATING_INITIAL_SESSION_DATA
    : RANKING_INITIAL_SESSION_DATA;

  const formData = buildRankingFormData(initialSessionData, options, isRating);

  const html = await fetchRankingPage(initialSessionData, formData, isRating);

  // Update ViewState for potential next request
  const newSessionData = {
    ...initialSessionData,
    ...extractSessionData(html),
  };

  return { html, newSessionData };
};

const fetchRankingPageHtml = async (options: RankingOptions, page: number) => {
  const { newSessionData } = await fetchRankingFirstPageHtml(options);

  const isRating = isRatingCategory(options.category);
  const formData = buildRankingFormData(newSessionData, options, isRating);
  formData.set('__EVENTTARGET', '');
  formData.append('__CALLBACKID', 'ctl00$mainContent$grid');
  formData.append(
    '__CALLBACKPARAM',
    `c0:KV|2;[];GB|20;12|PAGERONCLICK3|PN${page - 1};`,
  );

  const callbackData = await fetchRankingPage(
    newSessionData,
    formData,
    isRating,
  );
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
