export interface RankingOptions {
  category: string;
  region: string;
  year?: number;
  page?: number;
}

export interface RankingEntry {
  id: string;
  rank: number;
  name: string;
  club: string;
  state: string;
  points: number;
}
