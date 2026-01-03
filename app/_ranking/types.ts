export enum RankingCategory {
  Sub9 = '52',
}

export enum RankingRegion {
  Brasil = 'Brasil',
}

export interface RankingOptions {
  category: RankingCategory;
  year?: number;
  region?: RankingRegion;
}

export interface RankingEntry {
  rank: number;
  name: string;
  club: string;
  state: string;
  points: number;
}
