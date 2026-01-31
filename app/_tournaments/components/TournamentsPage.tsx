'use client';

import {
  Box,
  Button,
  EmptyState,
  Group,
  Input,
  Stack,
  Table,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import { useTournaments } from '../hooks/useTournaments';
import Link from 'next/link';

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
        <Group attached w="full">
          <Input
            placeholder="ID do torneio"
            name="tournamentId"
            value={tournamentId || ''}
            onChange={(e) => setTournamentId(e.target.value)}
          />
          <Button type="submit">Procurar</Button>
        </Group>
      </form>

      {tournaments.length > 0 ? (
        <Table.Root size="lg" interactive mt="4" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Tournaments</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tournaments.map(({ id, name }) => (
              <Table.Row key={id}>
                <Table.Cell p="0">
                  <Link href={`/tournaments/${id}`}>
                    <Box gap="2" p="2">
                      {name}
                    </Box>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <EmptyState.Root>
          <EmptyState.Content>
            <VStack textAlign="center">
              <EmptyState.Title>Nenhum torneio salvo</EmptyState.Title>
              <EmptyState.Description>
                Procure um torneio pelo seu id, e ele aparecerá nesta lista no
                futuro.
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
    </Stack>
  );
};
