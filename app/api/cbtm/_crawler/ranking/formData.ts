import { CbtmSessionData } from '../session';
import { RankingOptions } from './types';

export const buildRankingFormData = (
  sessionData: CbtmSessionData,
  { category, year, region, athlete }: RankingOptions,
  isRating: boolean,
) => {
  const params = new URLSearchParams();

  const categoryFieldName = isRating ? 'cmbRating' : 'cmbRANKING';

  // Event target and ViewState
  params.append('__EVENTTARGET', `ctl00$mainContent$${categoryFieldName}`);
  params.append('__EVENTARGUMENT', '');
  params.append('__VIEWSTATE', sessionData.viewState);
  params.append('__VIEWSTATEGENERATOR', sessionData.viewStateGenerator);
  params.append('__VIEWSTATEENCRYPTED', '');
  params.append('__EVENTVALIDATION', sessionData.eventValidation);

  const categoryFieldValue = isRating ? category.substring(2) : category;
  console.log('categoryFieldValue', categoryFieldValue);
  // Ranking dropdown
  params.append(
    `ctl00$mainContent$${categoryFieldName}$State`,
    `{ "rawValue": "${categoryFieldValue}" }`,
  );
  params.append(`ctl00$mainContent$${categoryFieldName}`, categoryFieldValue);
  params.append(`ctl00$mainContent$${categoryFieldName}$L`, categoryFieldValue);
  params.append(`mainContent_${categoryFieldName}_VI`, categoryFieldValue);

  // Year dropdown
  params.append('ctl00$mainContent$cmbAno$State', `{ "rawValue": "${year}" }`);
  params.append('ctl00$mainContent$cmbAno', String(year));
  params.append('ctl00$mainContent$cmbAno$L', String(year));
  params.append('mainContent_cmbAno_VI', String(year));

  // Region dropdown
  params.append(
    'ctl00$mainContent$cmbRegiao$State',
    `{ "rawValue": "${region}" }`,
  );
  params.append('ctl00$mainContent$cmbRegiao', region);
  params.append('ctl00$mainContent$cmbRegiao$L', region);
  params.append('mainContent_cmbRegiao_VI', region);

  // Athlete dropdown
  params.append(
    'ctl00$mainContent$cmbAtleta$State',
    `{ "rawValue": "${athlete ?? ''}" }`,
  );
  params.append('ctl00$mainContent$cmbAtleta', athlete ?? '');
  params.append('ctl00$mainContent$cmbAtleta$L', athlete ?? '');
  params.append('mainContent_cmbAtleta_VI', athlete ?? '');

  // Grid state
  params.append(
    'ctl00$mainContent$grid',
    JSON.stringify({
      keys: [],
      callbackState: sessionData.gridCallbackState,
      groupLevelState: {},
      selection: '',
      toolbar: null,
    }),
  );

  return params;
};
