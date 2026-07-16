import { REGIONAL_CATEGORIES } from './regional';
import { Category, CategoryType, Gender } from './types';

export { CategoryType, Gender };
export type { Category };

export const AVAILABLE_CATEGORIES: Category[] = [
  {
    value: '57',
    label: 'ABSOLUTO A (MAS)',
    gender: Gender.Male,
    type: CategoryType.Absolute,
  },
  {
    value: '58',
    label: 'ABSOLUTO B (MAS)',
    gender: Gender.Male,
    type: CategoryType.Absolute,
  },
  {
    value: '59',
    label: 'ABSOLUTO C (MAS)',
    gender: Gender.Male,
    type: CategoryType.Absolute,
  },
  {
    value: '110',
    label: 'ABSOLUTO D (MAS)',
    gender: Gender.Male,
    type: CategoryType.Absolute,
  },
  {
    value: '111',
    label: 'ABSOLUTO E (MAS)',
    gender: Gender.Male,
    type: CategoryType.Absolute,
  },
  {
    value: '125',
    label: 'ABSOLUTO F (MAS)',
    gender: Gender.Male,
    type: CategoryType.Absolute,
  },
  {
    value: '310',
    label: 'ABSOLUTO G (MAS)',
    gender: Gender.Male,
    type: CategoryType.Absolute,
  },
  {
    value: '266',
    label: 'SUB-07 MAS',
    gender: Gender.Male,
    maxAge: 7,
    type: CategoryType.Ranking,
  },
  {
    value: '52',
    label: 'SUB-09 MAS',
    gender: Gender.Male,
    maxAge: 9,
    type: CategoryType.Ranking,
  },
  {
    value: '120',
    label: 'SUB-11 MAS',
    gender: Gender.Male,
    maxAge: 11,
    type: CategoryType.Ranking,
  },
  {
    value: '53',
    label: 'SUB-13 MAS',
    gender: Gender.Male,
    maxAge: 13,
    type: CategoryType.Ranking,
  },
  {
    value: '54',
    label: 'SUB-15 MAS',
    gender: Gender.Male,
    maxAge: 15,
    type: CategoryType.Ranking,
  },
  {
    value: '270',
    label: 'SUB-17 MAS',
    gender: Gender.Male,
    maxAge: 17,
    type: CategoryType.Ranking,
  },
  {
    value: '55',
    label: 'SUB-19 MAS',
    gender: Gender.Male,
    maxAge: 19,
    type: CategoryType.Ranking,
  },
  {
    value: '56',
    label: 'SUB-21 MAS',
    gender: Gender.Male,
    maxAge: 21,
    type: CategoryType.Ranking,
  },
  {
    value: '64',
    label: 'ADULTO (MAS)',
    gender: Gender.Male,
    maxAge: 29,
    type: CategoryType.Ranking,
  },
  {
    value: '256',
    label: 'MASTER 30 MAS',
    gender: Gender.Male,
    maxAge: 34,
    type: CategoryType.Ranking,
  },
  {
    value: '257',
    label: 'MASTER 35 MAS',
    gender: Gender.Male,
    maxAge: 39,
    type: CategoryType.Ranking,
  },
  {
    value: '258',
    label: 'MASTER 40 MAS',
    gender: Gender.Male,
    maxAge: 44,
    type: CategoryType.Ranking,
  },
  {
    value: '259',
    label: 'MASTER 45 MAS',
    gender: Gender.Male,
    maxAge: 49,
    type: CategoryType.Ranking,
  },
  {
    value: '260',
    label: 'MASTER 50 MAS',
    gender: Gender.Male,
    maxAge: 54,
    type: CategoryType.Ranking,
  },
  {
    value: '261',
    label: 'MASTER 55 MAS',
    gender: Gender.Male,
    maxAge: 59,
    type: CategoryType.Ranking,
  },
  {
    value: '262',
    label: 'MASTER 60 MAS',
    gender: Gender.Male,
    maxAge: 64,
    type: CategoryType.Ranking,
  },
  {
    value: '263',
    label: 'MASTER 65 MAS',
    gender: Gender.Male,
    maxAge: 69,
    type: CategoryType.Ranking,
  },
  {
    value: '264',
    label: 'MASTER 70 MAS',
    gender: Gender.Male,
    maxAge: 74,
    type: CategoryType.Ranking,
  },
  {
    value: '265',
    label: 'MASTER 75 MAS',
    gender: Gender.Male,
    maxAge: Infinity,
    type: CategoryType.Ranking,
  },
  {
    value: '70',
    label: 'ABSOLUTO A (FEM)',
    gender: Gender.Female,
    type: CategoryType.Absolute,
  },
  {
    value: '71',
    label: 'ABSOLUTO B (FEM)',
    gender: Gender.Female,
    type: CategoryType.Absolute,
  },
  {
    value: '72',
    label: 'ABSOLUTO C (FEM)',
    gender: Gender.Female,
    type: CategoryType.Absolute,
  },
  {
    value: '112',
    label: 'ABSOLUTO D (FEM)',
    gender: Gender.Female,
    type: CategoryType.Absolute,
  },
  {
    value: '309',
    label: 'ABSOLUTO E (FEM)',
    gender: Gender.Female,
    type: CategoryType.Absolute,
  },
  {
    value: '267',
    label: 'SUB-07 FEM',
    gender: Gender.Female,
    maxAge: 7,
    type: CategoryType.Ranking,
  },
  {
    value: '65',
    label: 'SUB-09 FEM',
    gender: Gender.Female,
    maxAge: 9,
    type: CategoryType.Ranking,
  },
  {
    value: '113',
    label: 'SUB-11 FEM',
    gender: Gender.Female,
    maxAge: 11,
    type: CategoryType.Ranking,
  },
  {
    value: '66',
    label: 'SUB-13 FEM',
    gender: Gender.Female,
    maxAge: 13,
    type: CategoryType.Ranking,
  },
  {
    value: '67',
    label: 'SUB-15 FEM',
    gender: Gender.Female,
    maxAge: 15,
    type: CategoryType.Ranking,
  },
  {
    value: '271',
    label: 'SUB-17 FEM',
    gender: Gender.Female,
    maxAge: 17,
    type: CategoryType.Ranking,
  },
  {
    value: '68',
    label: 'SUB-19 FEM',
    gender: Gender.Female,
    maxAge: 19,
    type: CategoryType.Ranking,
  },
  {
    value: '69',
    label: 'SUB-21 FEM',
    gender: Gender.Female,
    maxAge: 21,
    type: CategoryType.Ranking,
  },
  {
    value: '77',
    label: 'ADULTO (FEM)',
    gender: Gender.Female,
    maxAge: 29,
    type: CategoryType.Ranking,
  },
  {
    value: '246',
    label: 'MASTER 30 FEM',
    gender: Gender.Female,
    maxAge: 34,
    type: CategoryType.Ranking,
  },
  {
    value: '247',
    label: 'MASTER 35 FEM',
    gender: Gender.Female,
    maxAge: 39,
    type: CategoryType.Ranking,
  },
  {
    value: '248',
    label: 'MASTER 40 FEM',
    gender: Gender.Female,
    maxAge: 44,
    type: CategoryType.Ranking,
  },
  {
    value: '249',
    label: 'MASTER 45 FEM',
    gender: Gender.Female,
    maxAge: 49,
    type: CategoryType.Ranking,
  },
  {
    value: '250',
    label: 'MASTER 50 FEM',
    gender: Gender.Female,
    maxAge: 54,
    type: CategoryType.Ranking,
  },
  {
    value: '251',
    label: 'MASTER 55 FEM',
    gender: Gender.Female,
    maxAge: 59,
    type: CategoryType.Ranking,
  },
  {
    value: '252',
    label: 'MASTER 60 FEM',
    gender: Gender.Female,
    maxAge: 64,
    type: CategoryType.Ranking,
  },
  {
    value: '253',
    label: 'MASTER 65 FEM',
    gender: Gender.Female,
    maxAge: 69,
    type: CategoryType.Ranking,
  },
  {
    value: '254',
    label: 'MASTER 70 FEM',
    gender: Gender.Female,
    maxAge: 74,
    type: CategoryType.Ranking,
  },
  {
    value: '255',
    label: 'MASTER 75 FEM',
    gender: Gender.Female,
    maxAge: Infinity,
    type: CategoryType.Ranking,
  },
  {
    value: '1057',
    label: 'Rating A FEM',
    gender: Gender.Female,
    type: CategoryType.Rating,
  },
  {
    value: '1058',
    label: 'Rating B FEM',
    gender: Gender.Female,
    type: CategoryType.Rating,
  },
  {
    value: '1059',
    label: 'Rating C FEM',
    gender: Gender.Female,
    type: CategoryType.Rating,
  },
  {
    value: '1060',
    label: 'Rating D FEM',
    gender: Gender.Female,
    type: CategoryType.Rating,
  },
  {
    value: '1061',
    label: 'Rating E FEM',
    gender: Gender.Female,
    type: CategoryType.Rating,
  },
  {
    value: '1062',
    label: 'Rating F FEM',
    gender: Gender.Female,
    type: CategoryType.Rating,
  },
  {
    value: '1063',
    label: 'Rating G FEM',
    gender: Gender.Female,
    type: CategoryType.Rating,
  },
  {
    value: '1064',
    label: 'Rating H FEM',
    gender: Gender.Female,
    type: CategoryType.Rating,
  },
  {
    value: '1065',
    label: 'Rating I FEM',
    gender: Gender.Female,
    type: CategoryType.Rating,
  },
  {
    value: '1066',
    label: 'Rating J FEM',
    gender: Gender.Female,
    type: CategoryType.Rating,
  },
  {
    value: '1043',
    label: 'Rating A MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1044',
    label: 'Rating B MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1045',
    label: 'Rating C MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1046',
    label: 'Rating D MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1047',
    label: 'Rating E MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1048',
    label: 'Rating F MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1049',
    label: 'Rating G MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1050',
    label: 'Rating H MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1051',
    label: 'Rating I MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1052',
    label: 'Rating J MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1053',
    label: 'Rating L MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1054',
    label: 'Rating M MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1055',
    label: 'Rating N MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
  {
    value: '1056',
    label: 'Rating O MAS',
    gender: Gender.Male,
    type: CategoryType.Rating,
  },
];

const AVAILABLE_CATEGORIES_WITH_REGIONAL = [
  ...AVAILABLE_CATEGORIES,
  ...REGIONAL_CATEGORIES,
];

export const CATEGORY_ID_MAP = AVAILABLE_CATEGORIES_WITH_REGIONAL.reduce<
  Record<string, Category>
>((acc, category) => {
  return { ...acc, [category.value]: category };
}, {});

export const isRatingCategory = (categoryId: string) => {
  return CATEGORY_ID_MAP[categoryId]?.type === CategoryType.Rating;
};

export const getAvailableCategories = (includeRegional = false) => {
  if (!includeRegional) return AVAILABLE_CATEGORIES;

  return [...AVAILABLE_CATEGORIES, ...REGIONAL_CATEGORIES];
};

export const getCategoryById = (id: string) => CATEGORY_ID_MAP[id];
