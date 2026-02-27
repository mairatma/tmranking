import { Player } from '../types';

export interface RatingScore {
  date: string;
  eventName: string;
  scoreBefore: number;
  points: number;
  scoreAfter: number;
}

export interface GameScore extends RatingScore {
  scores: string;
  opponentName: string;
}

export interface PlayerRatingInfo extends Player {
  scoresPerTournament: RatingScore[];
  scoresPerGame: GameScore[];
}
