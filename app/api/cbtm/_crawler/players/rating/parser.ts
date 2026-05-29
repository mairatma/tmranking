import parse from 'node-html-parser';

const FLAG_IMAGE_STATE_REGEX = /.*([a-zA-Z][a-zA-Z]).jpg$/;
const UNKNOWN = '?';

const INITIAL_SCORE_REGEX = /inicial: (\d+)/;
const POINTS_REGEX = /Pts:: (.+)/;
const AFTER_SCORE_REGEX = /final: (.+)/;

function parseScoreString(input: string) {
  const leftMatch = input.match(/^\(([^)]+)\)/);
  const rightMatch = input.match(/(\d*)\(([^)]+)\)$/);
  const middleMatch = input.match(/\)\s+(.+?)\s+\d*\(/);

  const parseArray = (str: string) => str.split(',').map(Number);

  const middleRaw = middleMatch ? middleMatch[1].trim() : '';
  const rightPrefix = rightMatch?.[1] ? [Number(rightMatch[1])] : [];

  const middleIntegers = [
    ...middleRaw.split(/\s+/).map(Number),
    ...rightPrefix,
  ].filter((n) => !isNaN(n));

  const setsCount = middleIntegers[0] + middleIntegers[1];

  return {
    playerSets: leftMatch ? parseArray(leftMatch[1]).slice(0, setsCount) : [],
    totalScores: middleIntegers,
    opponentSets: rightMatch
      ? parseArray(rightMatch[2]).slice(0, setsCount)
      : [],
  };
}

// Example
const input = '(11,3,12,0,0,0,0) 0 X 3(13,11,14,0,0,0,0)';
console.log(parseScoreString(input));

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
  const rawAge = root.querySelector('#mainContent_lblIdade')?.text.trim();
  const age = rawAge ? Number(rawAge) : null;

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

      const scoresAsString = cellElements[5]?.text.trim();

      return {
        date: cellElements[0]?.text.trim() ?? UNKNOWN,
        eventName: cellElements[1]?.text.trim() ?? UNKNOWN,
        scoreBefore:
          Number(cellElements[2]?.text.match(INITIAL_SCORE_REGEX)?.[1]) ?? 0,
        points: Number(cellElements[3]?.text.match(POINTS_REGEX)?.[1]) ?? 0,
        scoreAfter:
          Number(cellElements[4]?.text.match(AFTER_SCORE_REGEX)?.[1]) ?? 0,
        scores: scoresAsString ? parseScoreString(scoresAsString) : UNKNOWN,
        opponentName: cellElements[6]?.text.trim() ?? UNKNOWN,
      };
    })
    .filter((event) => Boolean(event));

  return { name, state, team, gender, age, scoresPerTournament, scoresPerGame };
};
