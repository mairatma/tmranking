'use client';

import { ReactNode } from 'react';

import { Flex, Heading, Stack } from '@chakra-ui/react';

import { PlayerInfo } from '@/app/_players/components/PlayerInfo';
import { usePlayerRatingInfo } from '@/app/_players/rating/hooks/usePlayerRatingInfo';
import { LoadingPage } from '@/app/_components/base/LoadingPage';
import { ErrorAlert } from '@/app/_components/base/ErrorAlert';

export const PlayerPageLayout = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const { data, isLoading } = usePlayerRatingInfo(id);

  if (isLoading) {
    return <LoadingPage>Carregando dados do jogador..</LoadingPage>;
  }

  if (!data) {
    console.log('error');
    return <ErrorAlert />;
  }

  const { player } = data;

  return (
    <Stack gap="2">
      <Flex flexDirection="column" gap="2">
        <Heading size="xl" color="text.primary">
          {player.name}
        </Heading>
        <PlayerInfo player={player} />
      </Flex>

      {children}
    </Stack>
  );
};
