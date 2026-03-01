'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Flex, Heading, Separator, Stack, Stat, Tabs } from '@chakra-ui/react';
import { LoadingPage } from '@/app/_components/base/LoadingPage';
import { ErrorAlert } from '@/app/_components/base/ErrorAlert';
import { usePlayerRatingInfo } from '../hooks/usePlayerRatingInfo';
import { PlayerInfo } from '../../components/PlayerInfo';
import { RatingTable } from './RatingTable';
import { getRatingName } from '../categories';

enum TabTypes {
  TournamentScores = 'tournaments',
  GameScores = 'games',
}

enum PageSearchParams {
  Tab = 'tab',
}

interface Props {
  id: string;
}

export const PlayerRatingInfoPage = ({ id }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading } = usePlayerRatingInfo(id);

  if (isLoading) {
    return <LoadingPage>Carregando dados do jogador..</LoadingPage>;
  }

  if (!data) {
    return <ErrorAlert />;
  }

  const currentTab =
    searchParams.get(PageSearchParams.Tab) ?? TabTypes.TournamentScores;

  const { player } = data;
  const totalRating = player.scoresPerTournament[0]?.scoreAfter ?? 0;

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
        <Heading size="xl">
          Rating - {getRatingName(totalRating, player.gender)}
        </Heading>
        <Stat.Root>
          <Stat.ValueText alignItems="baseline">
            {totalRating} <Stat.ValueUnit>pontos</Stat.ValueUnit>
          </Stat.ValueText>
        </Stat.Root>
      </Stack>
      <Separator size="sm" my="2" />

      <Tabs.Root
        fitted
        lazyMount
        value={currentTab}
        onValueChange={(e) => handleTabChange(e.value)}
      >
        <Tabs.List borderColor="border.light">
          <Tabs.Trigger value={TabTypes.TournamentScores}>
            Torneios
          </Tabs.Trigger>
          <Tabs.Trigger value={TabTypes.GameScores}>Partidas</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={TabTypes.TournamentScores}>
          <RatingTable scores={player.scoresPerTournament} />
        </Tabs.Content>
        <Tabs.Content value={TabTypes.GameScores}>
          <RatingTable scores={player.scoresPerGame} />
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};
