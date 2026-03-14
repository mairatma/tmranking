export interface TournamentBrackets {
  teams: string[][];
  results: [number, number, string][][];
}

export interface TournamentResults {
  name: string;
  gameNumber: string;
  tableNumber: string;
  date: string;
  time: string;
  finalScore: [number, number];
  scores: {
    name: string;
    sets: string[];
  }[];
}

export interface TournamentGroup {
  name: string;
  participants: {
    name: string;
    rankingPoints: number;
    ratingPoints: number;
    qualified: boolean;
  }[];
}
