'use client';

import { Button, Card, Grid, Group, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import { useTournaments } from '../hooks/useTournaments';

export const TournamentsPage = () => {
  const router = useRouter();

  const { tournaments } = useTournaments();

  const [tournamentId, setTournamentId] = useState<string | null>(null);
  const handleSearch: FormEventHandler = (e) => {
    e.preventDefault();

    if (!tournamentId) return;

    goToTournament(tournamentId);
  };

  const goToTournament = (tournamentId: string) => {
    router.push(`/tournaments/${tournamentId}`);
  };

  return (
    <Stack gap="3">
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

      <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap="2">
        {tournaments.map(({ id, name }) => (
          <Card.Root
            key={id}
            flex="1"
            cursor="pointer"
            onClick={() => goToTournament(id)}
          >
            <Card.Body>
              <Card.Title>{name}</Card.Title>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </Stack>
  );
};
