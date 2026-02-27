'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { usePlayerRankingInfo } from '../hooks/usePlayerRankingInfo';
import {
  Flex,
  Heading,
  Separator,
  Stack,
  Stat,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { CATEGORY_ID_MAP } from '@/app/_ranking/categories';
import { ScoredEventsTable } from './ScoredEventsTable';
import { LoadingPage } from '@/app/_components/base/LoadingPage';
import { PlayerInfo } from './PlayerInfo';
import { HistoricPointsLineChart } from './HistoricPointsLineChart';
import { getCurrentYear } from '@/app/_ranking/helpers/years';
import { PlayerRankingFilters } from './PlayerRankingFilters';
import { ErrorAlert } from '@/app/_components/base/ErrorAlert';

enum TabTypes {
  ScoredEvents = 'scored',
  Chart = 'chart',
  UnscoredEvents = 'unscored',
}

enum PageSearchParams {
  Tab = 'tab',
  Year = 'year',
}

interface Props {
  id: string;
  categoryId: string;
}

export const PlayerRankingInfoPage = ({ id, categoryId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const year = searchParams.get(PageSearchParams.Year)
    ? Number(searchParams.get(PageSearchParams.Year))
    : getCurrentYear();

  const { data, isLoading } = usePlayerRankingInfo(id, categoryId, year);

  if (isLoading) {
    return <LoadingPage>Carregando dados do jogador..</LoadingPage>;
  }

  if (!data) {
    return <ErrorAlert />;
  }

  const currentTab =
    searchParams.get(PageSearchParams.Tab) ?? TabTypes.ScoredEvents;

  const { player } = data;
  const totalScore = player.scoredEvents.reduce(
    (acc, { score }) => acc + score,
    0,
  );

  const handleTabChange = (newTab: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(PageSearchParams.Tab, newTab);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Stack gap="2">
      <Flex flexDirection="column" gap="2">
        <Heading size="xl" color="text.primary">
          {player.name}
        </Heading>
        <PlayerInfo player={player} />
      </Flex>

      <Stack mt="4">
        <Heading size="xl" fontWeight="700" color="secondary.900">
          {CATEGORY_ID_MAP[categoryId].label} - {year}
        </Heading>
        <Flex
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Stat.Root>
            <Stat.ValueText alignItems="baseline">
              {totalScore} <Stat.ValueUnit>pontos</Stat.ValueUnit>
            </Stat.ValueText>
          </Stat.Root>
          <PlayerRankingFilters
            value={{ category: categoryId, year }}
            onChange={(newFilters) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set(PageSearchParams.Year, newFilters.year.toString());
              router.push(
                `/players/${id}/category/${newFilters.category}?${newParams.toString()}`,
              );
            }}
          />
        </Flex>
      </Stack>
      <Separator size="sm" my="2" />

      <Tabs.Root
        fitted
        lazyMount
        value={currentTab}
        onValueChange={(e) => handleTabChange(e.value)}
      >
        <Tabs.List borderColor="border.light">
          <Tabs.Trigger value={TabTypes.ScoredEvents}>
            Eventos pontuados
          </Tabs.Trigger>
          <Tabs.Trigger value={TabTypes.Chart}>Gráfico</Tabs.Trigger>
          <Tabs.Trigger value={TabTypes.UnscoredEvents}>
            Eventos não pontuados
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={TabTypes.ScoredEvents}>
          <ScoredEventsTable
            title="Eventos que pontuaram para o ranking"
            subtitle="Apenas os 8 eventos com maior pontuação contam para o ranking."
            events={player.scoredEvents}
            emptyState={{
              title: 'Nenhum evento com pontuação',
              description:
                'O jogador não participou de eventos que pontuaram para o ranking',
            }}
          />
        </Tabs.Content>
        <Tabs.Content value={TabTypes.Chart}>
          <Heading size="md">Pontuação no tempo</Heading>
          <Text textStyle="xs" color="fg.muted" mb="4">
            {year === getCurrentYear() ? 'Últimos 12 meses' : `Ano de ${year}`}
          </Text>
          {currentTab === TabTypes.Chart && (
            <HistoricPointsLineChart
              playerId={id}
              categoryId={categoryId}
              year={year}
            />
          )}
        </Tabs.Content>
        <Tabs.Content value={TabTypes.UnscoredEvents}>
          <ScoredEventsTable
            title="Eventos que não pontuaram para o ranking"
            subtitle="Apenas os 8 eventos com maior pontuação contam para o ranking."
            events={player.unscoredEvents}
            emptyState={{
              title: 'Nenhum evento sem pontuação',
              description: 'Todos os eventos pontuaram para o ranking.',
            }}
          />
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};
