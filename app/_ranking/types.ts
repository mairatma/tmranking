export enum RankingRegion {
  Brasil = 'Brasil',
}

export interface RankingOptions {
  category: string;
  year?: number;
  region?: RankingRegion;
}

export interface RankingEntry {
  id: string;
  rank: number;
  name: string;
  club: string;
  state: string;
  points: number;
}
