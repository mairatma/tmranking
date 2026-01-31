export interface TournamentBrackets {
  teams: string[][];
  results: string[][][];
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
