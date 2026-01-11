import parse from 'node-html-parser';

const CATEGORIES_REGEX =
  /MainContent_MainContent_cmbCategoria_DDD_L.*'itemsInfo':(.+)},{'SelectedIndexChanged'/;
const CATEGORY_LABEL_REGEX =
  /(.+) (\d+) Inscrito\(s\) e (\d+) Pré-inscrito\(s\)/;

export const parseTournamentNameAndCategories = (html: string) => {
  const root = parse(html);

  const titleRaw = root
    .querySelector('#MainContent_MainContent_Titulo')!
    .text.trim();
  const title = titleRaw.slice(titleRaw.indexOf('-') + 1).trim();

  const categoriesRaw = html.match(CATEGORIES_REGEX)![1];
  const categories = JSON.parse(categoriesRaw.replace(/'/g, '"')) as {
    value: string;
    text: string;
  }[];
  const normalizedCategories = categories.map(({ value, text }) => {
    const matches = text.match(CATEGORY_LABEL_REGEX);
    if (!matches) {
      return { value, label: text };
    }

    const [, label, registeredCount, preRegisteredCount] =
      text.match(CATEGORY_LABEL_REGEX)!;
    return {
      value,
      label,
      registeredCount,
      preRegisteredCount,
    };
  });
  normalizedCategories.sort((a, b) =>
    a.label < b.label ? -1 : a.label === b.label ? 0 : 1,
  );

  return { title, categories: normalizedCategories };
};
