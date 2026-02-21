'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { usePlayerRankingInfo } from '../hooks/usePlayerRankingInfo';
import { Flex, Heading, Separator, Stack, Stat } from '@chakra-ui/react';
import {
  AVAILABLE_CATEGORIES,
  CATEGORY_ID_MAP,
  CategoryType,
} from '@/app/_ranking/categories';
import { ScoredEventsTable } from './ScoredEventsTable';
import { CategoryChooserDrawer } from '@/app/_components/CategoryChooserDrawer';
import { LoadingPage } from '@/app/_components/base/LoadingPage';
import { PlayerInfo } from './PlayerInfo';
import { HistoricPointsLineChart } from './HistoricPointsLineChart';

const NON_RATING_CATEGORIES = AVAILABLE_CATEGORIES.filter(
  ({ type }) => type !== CategoryType.Rating,
);

interface Props {
  id: string;
  categoryId: string;
}

export const PlayerRankingInfoPage = ({ id, categoryId }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get('year')
    ? Number(searchParams.get('year'))
    : undefined;

  const { data, isLoading } = usePlayerRankingInfo(id, categoryId, year);

  if (isLoading || !data) {
    return <LoadingPage>Carregando dados do jogador..</LoadingPage>;
  }

  const { player } = data;
  const totalScore = player.scoredEvents.reduce(
    (acc, { score }) => acc + score,
    0,
  );

  const handleCategoryChange = (newCategory: string) => {
    router.push(`/players/${id}/category/${newCategory}`);
  };

  return (
    <Stack gap="2">
      <Flex flexDirection="column" gap="2">
        <Heading size="xl" color="text.primary">
          {player.name}
        </Heading>
        <PlayerInfo player={player} />
      </Flex>

      <Flex
        alignItems="center"
        direction="row"
        justifyContent={{ smDown: 'space-between' }}
        gap="8"
        mt="4"
      >
        <Stack>
          <Heading size="xl" fontWeight="700" color="secondary.900">
            {CATEGORY_ID_MAP[categoryId].label}
          </Heading>
          <Stat.Root>
            <Stat.ValueText alignItems="baseline">
              {totalScore} <Stat.ValueUnit>pontos</Stat.ValueUnit>
            </Stat.ValueText>
          </Stat.Root>
        </Stack>
        <CategoryChooserDrawer
          categories={NON_RATING_CATEGORIES}
          value={categoryId}
          onSelect={handleCategoryChange}
        />
      </Flex>
      <Separator size="sm" my="2" />

      <ScoredEventsTable
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

      <HistoricPointsLineChart
        playerId={id}
        categoryId={categoryId}
        year={year}
      />
    </Stack>
  );
};
