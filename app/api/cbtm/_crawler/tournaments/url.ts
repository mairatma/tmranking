const BASE_URL = 'https://app.cbtm.org.br/IUI/App/Evento';
const ID_QUERY = 'EVE_Evento_ID';

export const getTournamentUrl = (id: string) => `${BASE_URL}?${ID_QUERY}=${id}`;
