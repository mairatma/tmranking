import { IRoundProps } from 'react-brackets';

import { TournamentBrackets } from '../types';

const UNKNOWN_SCORE = '?';
export const TBD_WINNER = 'TBD';

const ROUND_NAMES = [
  'Final',
  'Semi final',
  'Quartas de final',
  'Oitavas de final',
  'Rodada de 16',
  'Rodada de 32',
  'Rodada de 64',
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

export const buildBracketRounds = (data: TournamentBrackets) => {
  const rounds: IRoundProps[] = [];

  data.results.forEach((bracket, index) => {
    const roundIndex = data.results.length - index - 1;

    if (index === 0) {
      rounds.push({
        title: ROUND_NAMES[roundIndex],
        seeds: bracket.map((game, gameIndex) => {
          const player1 = data.teams[gameIndex][0];
          const player2 = data.teams[gameIndex][1];

          return {
            id: `${index}-${gameIndex}`,
            date: game[2],
            teams: [{ name: player1 }, { name: player2 }],
            score: [game[0] ?? UNKNOWN_SCORE, game[1] ?? UNKNOWN_SCORE],
            winner: calculateWinner(
              player1,
              player2,
              game[0],
              game[1],
              game[2],
            ),
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

        return {
          id: `${index}-${gameIndex}`,
          date: game[2],
          teams: [{ name: player1 }, { name: player2 }],
          score: [game[0] ?? UNKNOWN_SCORE, game[1] ?? UNKNOWN_SCORE],
          winner: calculateWinner(player1, player2, game[0], game[1], game[2]),
        };
      }),
    });
  });

  return rounds;
};
