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

const INTEGER_REGEX = /(\d+)/;

export const parseTournamentRegistrations = (html: string) => {
  const root = parse(html);

  const tableElement = root.querySelector(
    '#MainContent_MainContent_EventoTabPage_Inscricoes_CardViewInscricoes_DXMainTable td',
  );
  const registrationElements =
    tableElement?.childNodes as unknown as HTMLElement[];

  const registrations = registrationElements?.map((element) => {
    const dataElements = element.querySelectorAll(
      '.dxflNestedControlCell_MaterialCompact',
    );
    const name = dataElements[0].textContent.trim() ?? '';
    const team = dataElements[1].textContent.trim() ?? '';
    const registrationType = dataElements[3].textContent.trim() ?? '';
    const rankingPoints = Number(
      dataElements[4].textContent.match(INTEGER_REGEX)?.[1] ?? 0,
    );
    const ratingPoints = Number(
      dataElements[5].textContent.match(INTEGER_REGEX)?.[1] ?? 0,
    );

    return { name, team, registrationType, rankingPoints, ratingPoints };
  });

  return registrations;
};
