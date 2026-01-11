import { Spinner } from '@chakra-ui/react';
import { Bracket, IRoundProps } from 'react-brackets';

import { useTournamentBrackets } from '@/app/_ranking/hooks/useTournamentBrackets';

interface Props {
  id: string;
  categoryId: string;
}

const rounds: IRoundProps[] = [
  {
    title: 'Round one',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
    ],
  },
  {
    title: 'Round two',
    seeds: [
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
];

export const Brackets = ({ id, categoryId }: Props) => {
  const { data } = useTournamentBrackets(id, categoryId);

  console.log('Brackets DATA', data);

  if (!data) {
    return <Spinner />;
  }

  return <Bracket mobileBreakpoint={0} rounds={rounds} />;
};
