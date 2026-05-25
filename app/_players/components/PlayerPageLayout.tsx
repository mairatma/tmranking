'use client';

import { ReactNode } from 'react';

import { Flex, Heading, Stack, Tabs } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';

import { PlayerInfo } from '@/app/_players/components/PlayerInfo';
import { usePlayerRatingInfo } from '@/app/_players/rating/hooks/usePlayerRatingInfo';
import { LoadingPage } from '@/app/_components/base/LoadingPage';
import { ErrorAlert } from '@/app/_components/base/ErrorAlert';
import { getPlayerRankingAgedCategories } from '@/app/_ranking/categories/helpers';
import { AVAILABLE_CATEGORIES } from '@/app/_ranking/categories';

enum TabTypes {
  Rating = 'rating',
  Ranking = 'ranking',
}

export const PlayerPageLayout = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const { data, isLoading } = usePlayerRatingInfo(id);

  const router = useRouter();
  const pathname = usePathname();

  if (isLoading) {
    return <LoadingPage>Carregando dados do jogador..</LoadingPage>;
  }

  if (!data) {
    console.log('error');
    return <ErrorAlert />;
  }

  const { player } = data;
  const currentTab = pathname.includes('/rating')
    ? TabTypes.Rating
    : TabTypes.Ranking;

  const agedCategories = getPlayerRankingAgedCategories(
    player.gender,
    player.age,
  );

  const handleTabChange = (newTab: string) => {
    let path = `/players/${id}`;

    if (newTab === TabTypes.Ranking) {
      path += `/category/${(agedCategories[0] ?? AVAILABLE_CATEGORIES[0]).value}`;
    } else {
      path += '/rating';
    }

    router.push(path);
  };

  return (
    <Stack gap="2">
      <Flex flexDirection="column" gap="2">
        <Heading size="xl" color="text.primary">
          {player.name}
        </Heading>
        <PlayerInfo player={player} />
      </Flex>

      <Tabs.Root
        fitted
        lazyMount
        value={currentTab}
        onValueChange={(e) => handleTabChange(e.value)}
      >
        <Tabs.List borderColor="border.light">
          <Tabs.Trigger value={TabTypes.Rating}>Rating</Tabs.Trigger>
          <Tabs.Trigger value={TabTypes.Ranking}>Ranking</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={currentTab}>{children}</Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};
