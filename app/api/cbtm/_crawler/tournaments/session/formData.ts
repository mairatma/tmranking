import { CbtmSessionData } from '../../session';

export const buildTournamentSessionFormData = (
  sessionData: Omit<CbtmSessionData, 'gridCallbackState' | 'cookies'>,
  categoryId: string,
) => {
  const params = new URLSearchParams();

  params.append('__EVENTTARGET', '');
  params.append('__EVENTARGUMENT', '');
  params.append('__EVENTVALIDATION', sessionData.eventValidation);

  params.append('__VIEWSTATE', sessionData.viewState);
  params.append('__VIEWSTATEGENERATOR', sessionData.viewStateGenerator);
  params.append('__VIEWSTATEENCRYPTED', '');

  params.append('MainContent_MainContent_cmbCategoria_VI', categoryId);
  params.append('ctl00$ctl00$MainContent$MainContent$cmbCategoria', categoryId);

  params.append('__CALLBACKID', 'ctl00$ctl00$MainContent$MainContent$cbInfo');
  params.append('__CALLBACKPARAM', `c0:${categoryId}`);

  return params;
};
