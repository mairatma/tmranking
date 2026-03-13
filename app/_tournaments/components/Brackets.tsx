import { Box, EmptyState, Spinner, VStack } from '@chakra-ui/react';
import { Bracket } from 'react-brackets';

import { useTournamentBrackets } from '@/app/_tournaments/hooks/useTournamentBrackets';
import { useTournamentResults } from '@/app/_tournaments/hooks/useTournamentResults';

import { buildBracketRounds } from '../helpers/brackets';
import { BracketSeed } from './BracketSeed';
import { BracketRoundTitle } from './BracketsRoundTitle';

interface Props {
  id: string;
  categoryId: string;
}

export const Brackets = ({ id, categoryId }: Props) => {
  const { data } = useTournamentBrackets(id, categoryId);
  const { data: results } = useTournamentResults(id, categoryId);

  if (!data) {
    return <Spinner />;
  }

  if (data.results.length === 0) {
    return (
      <EmptyState.Root size="sm" borderWidth="1px" p="4" rounded="md">
        <EmptyState.Content>
          <VStack textAlign="center">
            <EmptyState.Title>Nenhum jogo encontrado</EmptyState.Title>
            <EmptyState.Description>
              Não foram encontrados jogos. O torneio ainda está sendo preparado.
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

  const rounds = buildBracketRounds(data);
  return (
    <Box style={{ overflowX: 'auto' }}>
      <Bracket
        mobileBreakpoint={0}
        rounds={rounds}
        roundTitleComponent={(title) => <BracketRoundTitle title={title} />}
        renderSeedComponent={(seedProps) => (
          <BracketSeed {...seedProps} results={results?.results} />
        )}
      />
    </Box>
  );
};
