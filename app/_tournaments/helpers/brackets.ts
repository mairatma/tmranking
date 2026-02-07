import { IRoundProps } from 'react-brackets';

import { TournamentBrackets } from '../types';

const UNKNOWN_SCORE = '?';
const NO_SCORE = '';
export const TBD_WINNER = 'TBD';

const ROUND_NAMES = [
  'Final',
  'Semi final',
  'Quartas de final',
  'Oitavas de final',
  'Fase 16',
  'Fase 32',
  'Fase 64',
];

const calculateWinner = (
  player1: string,
  player2: string,
  score1: number | null,
  score2: number | null,
  gameInfo: string | null,
) => {
  if (!gameInfo) {
    return player1 || player2;
  }

  const hasScores = typeof score1 === 'number' && typeof score2 === 'number';
  if (hasScores) {
    return score1 > score2 ? player1 : player2;
  }

  return TBD_WINNER;
};

const normalizeScore = (score: number | null, gameInfo: string | null) => {
  if (!gameInfo) return NO_SCORE;

  return score ?? UNKNOWN_SCORE;
};

export const buildBracketRounds = (data: TournamentBrackets) => {
  const rounds: IRoundProps[] = [];

  data.results.forEach((bracket, index) => {
    const roundIndex = data.results.length - index - 1;

    if (index === 0) {
      rounds.push({
        title: ROUND_NAMES[roundIndex],
        seeds: bracket.map((game, gameIndex) => {
          const [player1, player2] = data.teams[gameIndex];
          const [score1, score2, gameInfo] = game;

          return {
            id: `${index}-${gameIndex}`,
            date: gameInfo,
            teams: [{ name: player1 }, { name: player2 }],
            score: [
              normalizeScore(score1, gameInfo),
              normalizeScore(score2, gameInfo),
            ],
            winner: calculateWinner(player1, player2, score1, score2, gameInfo),
          };
        }),
      });

      return;
    }

    const lastRound = rounds[index - 1];
    rounds.push({
      title: ROUND_NAMES[roundIndex],
      seeds: bracket.map((game, gameIndex) => {
        const game1 = lastRound.seeds[gameIndex * 2];
        const game2 = lastRound.seeds[gameIndex * 2 + 1];

        const player1 = game1.winner;
        const player2 = game2.winner;

        const [score1, score2, gameInfo] = game;

        return {
          id: `${index}-${gameIndex}`,
          date: gameInfo,
          teams: [{ name: player1 }, { name: player2 }],
          score: [
            normalizeScore(score1, gameInfo),
            normalizeScore(score2, gameInfo),
          ],
          winner: calculateWinner(player1, player2, score1, score2, gameInfo),
        };
      }),
    });
  });

  return rounds;
};
