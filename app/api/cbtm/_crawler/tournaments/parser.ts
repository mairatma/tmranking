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

export const parseTournamentGroups = (html: string) => {
  const root = parse(html);

  const tableElement = root.querySelector(
    '#MainContent_MainContent_EventoTabPage_Grupos_CardViewGrupo_DXMainTable td',
  );
  const groupElements = tableElement?.childNodes as unknown as HTMLElement[];

  const groups = groupElements?.map((element) => {
    const dataElements = element.querySelectorAll(
      '.dxflNestedControlCell_MaterialCompact',
    );
    const name = dataElements[0].textContent.trim() ?? '';

    const participants = [];
    let startIndex = 6;
    while (
      dataElements.length > startIndex &&
      dataElements[startIndex + 1].textContent.trim() !== ''
    ) {
      participants.push({
        name: dataElements[startIndex + 1].textContent.trim(),
        rankingPoints:
          dataElements[startIndex + 2].textContent.match(INTEGER_REGEX)?.[1] ??
          0,
        ratingPoints:
          dataElements[startIndex + 3].textContent.match(INTEGER_REGEX)?.[1] ??
          0,
        qualified: dataElements[startIndex + 4].textContent.trim() !== '',
      });

      startIndex += 5;
    }

    return { name, participants };
  });

  return groups;
};

const parseSetScores = (
  elements: NodeListOf<Element>,
  from: number,
  to: number,
) => {
  const setScores = [];
  let index = from;
  while (index <= to) {
    const matches = elements[index].textContent.match(INTEGER_REGEX);
    if (!matches) {
      break;
    }
    setScores.push(matches[1] ?? 0);
    index++;
  }

  return setScores;
};

const SCORE_REGEX = /(\d+)-(\d+)/;
const DESCRIPTION_REGEX = /Jogo\s*(\d+)\s*-\s*Mesa\s*(\d+)\s*-(.+)$/;

export const parseTournamentResults = (html: string) => {
  const root = parse(html);

  const tableElement = root.querySelector(
    '#MainContent_MainContent_EventoTabPage_Resultados_CardViewResultado_DXMainTable td',
  );
  const gameElements = tableElement?.childNodes as unknown as HTMLElement[];

  const games = gameElements?.map((element) => {
    const dataElements = element.querySelectorAll(
      '.dxflNestedControlCell_MaterialCompact',
    );
    const splitName = dataElements[0].textContent.split('-');
    const name = splitName[splitName.length - 1].trim();

    const scoreStr = dataElements[1].textContent;
    const score1 = scoreStr.match(SCORE_REGEX)?.[1];
    const score2 = scoreStr.match(SCORE_REGEX)?.[2];

    const description = dataElements[2].textContent.trim();
    const matches = description.match(DESCRIPTION_REGEX);
    const gameNumber = matches?.[1];
    const tableNumber = matches?.[2];
    const time = matches?.[3];

    const date = dataElements[3].textContent.trim();

    const scores = [
      {
        name: dataElements[4].textContent.trim(),
        sets: parseSetScores(dataElements, 6, 10),
      },
      {
        name: dataElements[11].textContent.trim(),
        sets: parseSetScores(dataElements, 13, 17),
      },
    ];

    return {
      name,
      gameNumber,
      tableNumber,
      date,
      time,
      finalScore: [
        score1 ? Number(score1) : '?',
        score2 ? Number(score2) : '?',
      ],
      scores,
    };
  });

  return games;
};
