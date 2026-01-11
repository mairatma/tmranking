import { Spinner } from '@chakra-ui/react';
import { Bracket } from 'react-brackets';

import { useTournamentBrackets } from '@/app/_tournaments/hooks/useTournamentBrackets';
import { buildBracketRounds } from '../helpers/brackets';

interface Props {
  id: string;
  categoryId: string;
}

export const Brackets = ({ id, categoryId }: Props) => {
  const { data } = useTournamentBrackets(id, categoryId);

  console.log('Brackets DATA', data);

  if (!data) {
    return <Spinner />;
  }

  const rounds = buildBracketRounds(data);
  return <Bracket mobileBreakpoint={0} rounds={rounds} />;
};
