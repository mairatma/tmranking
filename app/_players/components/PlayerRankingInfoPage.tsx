'use client';

import { useSearchParams } from 'next/navigation';
import { usePlayerRankingInfo } from '../hooks/usePlayerRankingInfo';
import {
  Center,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Stat,
} from '@chakra-ui/react';
import { CATEGORY_ID_MAP } from '@/app/_ranking/categories';
import { ScoredEventsTable } from './ScoredEventsTable';

interface Props {
  id: string;
  categoryId: string;
}

export const PlayerRankingInfoPage = ({ id, categoryId }: Props) => {
  const searchParams = useSearchParams();
  const year = searchParams.get('year')
    ? Number(searchParams.get('year'))
    : undefined;

  const { data, isLoading } = usePlayerRankingInfo(id, categoryId, year);

  if (isLoading || !data) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const { player } = data;
  const totalScore = player.scoredEvents.reduce(
    (acc, { score }) => acc + score,
    0,
  );

  return (
    <Stack gap="2">
      <Flex flexDirection="column" gap="2">
        <Heading size="lg" color="text.primary">
          {player.name}
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="2">
          <Stat.Root borderWidth="1px" p="4" rounded="md">
            <Stat.Label color="secondary.900" fontWeight="700">
              {CATEGORY_ID_MAP[categoryId].label}
            </Stat.Label>
            <Stat.ValueText alignItems="baseline">
              {totalScore} <Stat.ValueUnit>pontos</Stat.ValueUnit>
            </Stat.ValueText>
          </Stat.Root>

          <Stat.Root borderWidth="1px" p="4" rounded="md">
            <Stat.Label color="secondary.900" fontWeight="700">
              Idade (até o fim do ano)
            </Stat.Label>
            <Stat.ValueText alignItems="baseline">
              {player.age || '-'} <Stat.ValueUnit>anos</Stat.ValueUnit>
            </Stat.ValueText>
          </Stat.Root>

          <Stat.Root borderWidth="1px" p="4" rounded="md">
            <Stat.Label color="secondary.900" fontWeight="700">
              Clube
            </Stat.Label>
            <Stat.ValueText alignItems="baseline">
              {player.team || '-'}
            </Stat.ValueText>
          </Stat.Root>

          <Stat.Root borderWidth="1px" p="4" rounded="md">
            <Stat.Label color="secondary.900" fontWeight="700">
              Estado
            </Stat.Label>
            <Stat.ValueText alignItems="baseline">
              {player.state || '-'}
            </Stat.ValueText>
          </Stat.Root>
        </Grid>
      </Flex>

      <ScoredEventsTable
        mt="4"
        title="Eventos que pontuaram para o ranking"
        events={player.scoredEvents}
        emptyState={{
          title: 'Nenhum evento com pontuação',
          description:
            'O jogador não participou de eventos que pontuaram para o ranking',
        }}
      />

      <ScoredEventsTable
        mt="4"
        title="Eventos que não pontuaram para o ranking"
        events={player.unscoredEvents}
        emptyState={{
          title: 'Nenhum evento sem pontuação',
          description: 'Todos os eventos pontuaram para o ranking.',
        }}
      />
    </Stack>
  );
};
