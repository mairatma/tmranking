'use client';

import { useTournament } from '@/app/_ranking/hooks/useTournament';
import { Heading, Stack } from '@chakra-ui/react';

interface Props {
  id: string;
}

export const TournamentPage = ({ id }: Props) => {
  const { data } = useTournament(id);

  return (
    <Stack>
      <Heading size="xl">{data?.title}</Heading>
    </Stack>
  );
};
