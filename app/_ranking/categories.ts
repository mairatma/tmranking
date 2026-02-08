export enum Gender {
  Female = 'Female',
  Male = 'Male',
}

export enum CategoryType {
  Absolute = 'Absolute',
  Ranking = 'Ranking',
  Rating = 'Rating',
}

export interface Category {
  value: string;
  label: string;
  gender: Gender;
  type: CategoryType;
}

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
    value: '266',
    label: 'SUB-07 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '52',
    label: 'SUB-09 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '120',
    label: 'SUB-11 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '53',
    label: 'SUB-13 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '54',
    label: 'SUB-15 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '270',
    label: 'SUB-17 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '55',
    label: 'SUB-19 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '56',
    label: 'SUB-21 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '64',
    label: 'ADULTO (MAS)',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '256',
    label: 'SÊNIOR 30',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '257',
    label: 'SÊNIOR 35',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '258',
    label: 'VETERANO 40 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '259',
    label: 'VETERANO 45 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '260',
    label: 'VETERANO 50 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '261',
    label: 'VETERANO 55 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '262',
    label: 'VETERANO 60 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '263',
    label: 'VETERANO 65 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '264',
    label: 'VETERANO 70 MAS',
    gender: Gender.Male,
    type: CategoryType.Ranking,
  },
  {
    value: '265',
    label: 'VETERANO 75 MAS',
    gender: Gender.Male,
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
    value: '267',
    label: 'SUB-07 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '65',
    label: 'SUB-09 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '113',
    label: 'SUB-11 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '66',
    label: 'SUB-13 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '67',
    label: 'SUB-15 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '271',
    label: 'SUB-17 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '68',
    label: 'SUB-19 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '69',
    label: 'SUB-21 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '77',
    label: 'ADULTO (FEM)',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '246',
    label: 'LADY 30',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '247',
    label: 'LADY 35',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '248',
    label: 'VETERANO 40 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '249',
    label: 'VETERANO 45 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '250',
    label: 'VETERANO 50 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '251',
    label: 'VETERANO 55 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '252',
    label: 'VETERANO 60 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '253',
    label: 'VETERANO 65 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '254',
    label: 'VETERANO 70 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
  {
    value: '255',
    label: 'VETERANO 75 FEM',
    gender: Gender.Female,
    type: CategoryType.Ranking,
  },
];

export const CATEGORY_ID_MAP = AVAILABLE_CATEGORIES.reduce<
  Record<string, Category>
>((acc, category) => {
  return { ...acc, [category.value]: category };
}, {});
