export enum Gender {
  Female = 'Female',
  Male = 'Male',
}

export enum CategoryType {
  Absolute = 'Absolute',
  Ranking = 'Ranking',
  Rating = 'Rating',
}

export enum CategoryRegionType {
  National = 'National',
  Regional = 'Regional',
}

export interface Category {
  value: string;
  label: string;
  gender: Gender;
  maxAge?: number;
  type: CategoryType;
  regionType?: CategoryRegionType;
}
