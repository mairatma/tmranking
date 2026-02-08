import parse from 'node-html-parser';

const FLAG_IMAGE_STATE_REGEX = /.*([a-zA-Z][a-zA-Z]).jpg$/;
const UNKNOWN = '?';

export const parsePlayerInfo = (html: string) => {
  const root = parse(html);

  const name =
    root.querySelector('#mainContent_lblNome')?.text.trim() ?? UNKNOWN;

  const stateRaw = root
    .querySelector('#mainContent_imgBandeiraUF')
    ?.getAttribute('src');
  const state = stateRaw
    ? stateRaw.match(FLAG_IMAGE_STATE_REGEX)?.[1] || null
    : null;

  const team =
    root.querySelector('#mainContent_lblClube')?.text.trim() ?? UNKNOWN;
  const gender = root.querySelector('#mainContent_divhomem')
    ? 'Male'
    : 'Female';
  const age =
    root.querySelector('#mainContent_lblIdade')?.text.trim() ?? UNKNOWN;

  const [, ...scoredTableRows] = root.querySelectorAll(
    '#mainContent_grideventos_DXMainTable tbody tr',
  );

  const scoredEvents = scoredTableRows
    .map((row) => {
      const cellElements = row.querySelectorAll('td');
      const rank = cellElements[0]?.text.trim() ?? UNKNOWN;
      if (rank === 'No data to display') return null;

      return {
        rank: cellElements[0]?.text.trim() ?? UNKNOWN,
        date: cellElements[1]?.text.trim() ?? UNKNOWN,
        eventName: cellElements[2]?.text.trim() ?? UNKNOWN,
        score: Number(cellElements[3]?.text.trim()) ?? 0,
      };
    })
    .filter((event) => Boolean(event));

  const [, ...unscoredTableRows] = root.querySelectorAll(
    '#mainContent_BootstrapGridView1_DXMainTable tbody tr',
  );
  const unscoredEvents = unscoredTableRows
    .map((row) => {
      const cellElements = row.querySelectorAll('td');
      const rank = cellElements[0]?.text.trim() ?? UNKNOWN;
      if (rank === 'No data to display') return null;

      return {
        rank: cellElements[0]?.text.trim() ?? UNKNOWN,
        date: cellElements[1]?.text.trim() ?? UNKNOWN,
        eventName: cellElements[2]?.text.trim() ?? UNKNOWN,
        score: Number(cellElements[3]?.text.trim()) ?? 0,
      };
    })
    .filter((event) => Boolean(event));

  return { name, state, team, gender, age, scoredEvents, unscoredEvents };
};
