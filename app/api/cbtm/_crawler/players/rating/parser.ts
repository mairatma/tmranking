import parse from 'node-html-parser';

const FLAG_IMAGE_STATE_REGEX = /.*([a-zA-Z][a-zA-Z]).jpg$/;
const UNKNOWN = '?';

const INITIAL_SCORE_REGEX = /inicial: (\d+)/;
const POINTS_REGEX = /Pts:: (.+)/;
const AFTER_SCORE_REGEX = /final: (.+)/;

export const parsePlayerRatingInfo = (html: string) => {
  const root = parse(html);

  const name =
    root.querySelector('#mainContent_lblNome')?.text.trim() ?? UNKNOWN;

  const stateRaw = root
    .querySelector('#mainContent_imgBandeiraUF')
    ?.getAttribute('src');
  const state = stateRaw
    ? stateRaw.match(FLAG_IMAGE_STATE_REGEX)?.[1] || null
    : null;

  const teamWithState =
    root.querySelector('#mainContent_lblClube')?.text.trim() ?? UNKNOWN;
  const team = teamWithState
    .replace(new RegExp(`(- ${state})|(-${state})$`), '')
    .trim();

  const gender = root.querySelector('#mainContent_divhomem')
    ? 'Male'
    : 'Female';
  const age =
    root.querySelector('#mainContent_lblIdade')?.text.trim() ?? UNKNOWN;

  const tournamentScoresTable = root.querySelectorAll(
    '#mainContent_grideventos_DXMainTable tr',
  );
  const scoresPerTournament = tournamentScoresTable
    .map((row) => {
      const cellElements = row.querySelectorAll('.dxeBase_PlasticBlue');
      const date = cellElements[0]?.text.trim() ?? UNKNOWN;
      if (date === UNKNOWN) return null;

      return {
        date: cellElements[0]?.text.trim() ?? UNKNOWN,
        eventName: cellElements[1]?.text.trim() ?? UNKNOWN,
        scoreBefore:
          Number(cellElements[2]?.text.match(INITIAL_SCORE_REGEX)?.[1]) ?? 0,
        points: Number(cellElements[3]?.text.match(POINTS_REGEX)?.[1]) ?? 0,
        scoreAfter:
          Number(cellElements[4]?.text.match(AFTER_SCORE_REGEX)?.[1]) ?? 0,
      };
    })
    .filter((event) => Boolean(event));

  const gameScoresTable = root.querySelectorAll(
    '#mainContent_ASPxGridView1_DXMainTable tr',
  );
  const scoresPerGame = gameScoresTable
    .map((row) => {
      const cellElements = row.querySelectorAll('.dxeBase_PlasticBlue');
      const date = cellElements[0]?.text.trim() ?? UNKNOWN;
      if (date === UNKNOWN) return null;

      return {
        date: cellElements[0]?.text.trim() ?? UNKNOWN,
        eventName: cellElements[1]?.text.trim() ?? UNKNOWN,
        scoreBefore:
          Number(cellElements[2]?.text.match(INITIAL_SCORE_REGEX)?.[1]) ?? 0,
        points: Number(cellElements[3]?.text.match(POINTS_REGEX)?.[1]) ?? 0,
        scoreAfter:
          Number(cellElements[4]?.text.match(AFTER_SCORE_REGEX)?.[1]) ?? 0,
        scores: cellElements[5]?.text.trim() ?? UNKNOWN,
        opponentName: cellElements[6]?.text.trim() ?? UNKNOWN,
      };
    })
    .filter((event) => Boolean(event));

  return { name, state, team, gender, age, scoresPerTournament, scoresPerGame };
};
