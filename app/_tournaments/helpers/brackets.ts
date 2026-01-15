import { IRoundProps } from 'react-brackets';

import { TournamentBrackets } from '../types';

const BYE_TEXT = 'BYE';

const ROUND_NAMES = [
  'Final',
  'Semi final',
  'Quartas de final',
  'Oitavas de final',
  'Rodada de 16',
  'Rodada de 32',
  'Rodada de 64',
];

export const buildBracketRounds = (data: TournamentBrackets) => {
  const rounds: IRoundProps[] = [];

  data.results.forEach((bracket, index) => {
    const roundIndex = data.results.length - index - 1;

    if (index === 0) {
      rounds.push({
        title: ROUND_NAMES[roundIndex],
        seeds: bracket.map((game, gameIndex) => {
          const player1 = data.teams[gameIndex][0] ?? BYE_TEXT;
          const player2 = data.teams[gameIndex][1] ?? BYE_TEXT;

          return {
            id: `${index}-${gameIndex}`,
            date: game[2],
            teams: [{ name: player1 }, { name: player2 }],
            score: [game[0], game[1]],
            winner:
              typeof game[0] === 'number'
                ? Number(game[0]) > Number(game[1])
                  ? player1
                  : player2
                : player1,
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
          score: [game[0], game[1]],
          winner:
            typeof game[0] === 'number'
              ? Number(game[0]) > Number(game[1])
                ? player1
                : player2
              : player1,
        };
      }),
    });
  });

  return rounds;
};
