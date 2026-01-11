import { Spinner } from '@chakra-ui/react';

import { useTournamentBrackets } from '@/app/_ranking/hooks/useTournamentBrackets';

interface Props {
  id: string;
  categoryId: string;
}

export const Brackets = ({ id, categoryId }: Props) => {
  const { data, error } = useTournamentBrackets(id, categoryId);

  console.log('Brackets DATA', data, error);

  if (!data) {
    return <Spinner />;
  }

  return <div>WIP</div>;
};
