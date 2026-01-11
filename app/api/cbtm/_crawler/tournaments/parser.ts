import parse from 'node-html-parser';

export const parseTournamentNameAndCategories = (html: string) => {
  const root = parse(html);

  const titleRaw = root
    .querySelector('#MainContent_MainContent_Titulo')!
    .text.trim();
  const title = titleRaw.slice(titleRaw.indexOf('-') + 1).trim();

  return { title };
};
