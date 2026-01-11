'use client';

import { Button, Group, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';

export const TournamentsPage = () => {
  const router = useRouter();

  const [tournamentId, setTournamentId] = useState<string | null>(null);
  const handleSearch: FormEventHandler = (e) => {
    e.preventDefault();

    router.push(`/tournaments/${tournamentId}`);
  };

  return (
    <Stack>
      <form onSubmit={handleSearch}>
        <Group attached w="full" maxW="sm">
          <Input
            placeholder="ID do torneio"
            name="tournamentId"
            value={tournamentId || ''}
            onChange={(e) => setTournamentId(e.target.value)}
          />
          <Button type="submit">Procurar</Button>
        </Group>
      </form>
    </Stack>
  );
};
