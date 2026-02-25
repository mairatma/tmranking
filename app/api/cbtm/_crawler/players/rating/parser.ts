import parse from 'node-html-parser';

const FLAG_IMAGE_STATE_REGEX = /.*([a-zA-Z][a-zA-Z]).jpg$/;
const UNKNOWN = '?';

const INITIAL_SCORE_REGEX = /inicial: (\d+)/;
const AFTER_SCORE_REGEX = /Pts:: (.+)/;

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

  const tableRows = root.querySelectorAll(
    '#mainContent_grideventos_DXMainTable tr',
  );

  const ratingScores = tableRows
    .map((row) => {
      const cellElements = row.querySelectorAll('.dxeBase_PlasticBlue');
      const date = cellElements[0]?.text.trim() ?? UNKNOWN;
      if (date === UNKNOWN) return null;

      return {
        date: cellElements[0]?.text.trim() ?? UNKNOWN,
        eventName: cellElements[1]?.text.trim() ?? UNKNOWN,
        scoreBefore:
          Number(cellElements[2]?.text.match(INITIAL_SCORE_REGEX)?.[1]) ?? 0,
        scoreAfter:
          Number(cellElements[3]?.text.match(AFTER_SCORE_REGEX)?.[1]) ?? 0,
      };
    })
    .filter((event) => Boolean(event));

  return { name, state, team, gender, age, ratingScores };
};
