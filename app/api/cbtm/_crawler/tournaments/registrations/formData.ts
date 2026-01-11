import { CbtmSessionData } from '../../session';

export const buildTournamentRegistrationsFormData = (
  sessionData: Omit<CbtmSessionData, 'gridCallbackState'>,
  categoryId: string,
) => {
  const params = new URLSearchParams();

  // Event target and ViewState
  params.append('__EVENTTARGET', '');
  params.append('__EVENTARGUMENT', '');
  params.append('__EVENTVALIDATION', sessionData.eventValidation);

  params.append('__VIEWSTATE', sessionData.viewState);
  params.append('__VIEWSTATEGENERATOR', sessionData.viewStateGenerator);
  params.append('__VIEWSTATEENCRYPTED', '');

  // Ranking dropdown
  params.append(
    'ctl00$ctl00$MainContent$MainContent$cmbCategoria$State',
    `{ "rawValue": "${categoryId}" }`,
  );
  params.append('MainContent_MainContent_cmbCategoria_VI', categoryId);
  params.append('ctl00$ctl00$MainContent$MainContent$cmbCategoria', categoryId);

  params.append(
    '__CALLBACKID',
    'ctl00$ctl00$MainContent$MainContent$EventoTabPage$Inscricoes$CardViewInscricoes',
  );
  params.append(
    '__CALLBACKPARAM',
    `c0:KV|2;[];GB|21;14|CUSTOMCALLBACK2|${categoryId};`,
  );

  return params;
};
